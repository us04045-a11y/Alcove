import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LiquidDistortionCanvasProps {
  scrollVelocity?: number;
  isActive?: boolean;
  interactive?: boolean;
}

export const LiquidDistortionCanvas: React.FC<LiquidDistortionCanvasProps> = ({
  scrollVelocity = 0,
  isActive = true,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, speed: 0 });
  const timeRef = useRef(0);
  const scrollIntensityRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // WebGL Renderer with alpha transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Custom Fluid & Chromatic Aberration Liquid Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScrollSpeed;
      varying vec2 vUv;

      // Simplex noise approximation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        
        // Mouse distance ripple
        float dist = distance(uv, uMouse);
        float mouseWave = sin(dist * 20.0 - uTime * 3.5) * exp(-dist * 4.0) * 0.035;

        // Scroll momentum wave
        float scrollWave = sin(uv.y * 12.0 + uTime * 2.0) * uScrollSpeed * 0.06;

        // Ambient fluid noise
        float noise = snoise(uv * 3.5 + vec2(uTime * 0.15, uTime * 0.1));
        
        // Combined displacement vector
        vec2 displacedUv = uv + vec2(
          mouseWave + noise * 0.02 + scrollWave * 0.5,
          mouseWave * 0.5 + noise * 0.02 + scrollWave
        );

        // Chromatic Aberration (RGB split)
        float rOffset = 0.008 * (1.0 + uScrollSpeed * 3.0);
        float bOffset = -0.008 * (1.0 + uScrollSpeed * 3.0);

        float rVal = sin((displacedUv.x + rOffset) * 10.0 + uTime) * 0.5 + 0.5;
        float gVal = sin(displacedUv.x * 10.0 + uTime) * 0.5 + 0.5;
        float bVal = sin((displacedUv.x + bOffset) * 10.0 + uTime) * 0.5 + 0.5;

        // Subtle architectural pistachio luminescence wave
        vec3 pistachioColor = vec3(0.77, 0.91, 0.58); // #C4E894 Pistachio Lime
        vec3 darkTone = vec3(0.035, 0.055, 0.038);

        float rippleHighlight = pow(abs(noise + mouseWave * 10.0), 2.5);
        vec3 finalColor = mix(darkTone, pistachioColor, rippleHighlight * 0.35 * (0.4 + uScrollSpeed * 2.0));

        // Alpha mask
        float alpha = clamp(rippleHighlight * 0.45 + (mouseWave * 4.0) + (uScrollSpeed * 0.4), 0.0, 0.55);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScrollSpeed: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const currentX = (e.clientX - rect.left) / rect.width;
      const currentY = 1.0 - (e.clientY - rect.top) / rect.height;

      const deltaX = currentX - mouseRef.current.x;
      const deltaY = currentY - mouseRef.current.y;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      mouseRef.current.targetX = currentX;
      mouseRef.current.targetY = currentY;
      mouseRef.current.speed = Math.min(speed * 5.0, 1.0);
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      timeRef.current += 0.016;
      uniforms.uTime.value = timeRef.current;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Scroll speed decay
      scrollIntensityRef.current += (scrollVelocity - scrollIntensityRef.current) * 0.1;
      uniforms.uScrollSpeed.value = Math.min(Math.abs(scrollIntensityRef.current) * 0.05, 1.5);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isActive, interactive, scrollVelocity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden mix-blend-screen opacity-70 transition-opacity duration-500"
    />
  );
};
