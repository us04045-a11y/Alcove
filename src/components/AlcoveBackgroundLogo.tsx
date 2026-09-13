import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AlcoveBackgroundLogoProps {
  mouseX?: number;
  mouseY?: number;
  className?: string;
}

export const AlcoveBackgroundLogo: React.FC<AlcoveBackgroundLogoProps> = ({
  mouseX = 0,
  mouseY = 0,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const lampGlowRef = useRef<SVGCircleElement>(null);
  const lightConeRef = useRef<SVGPolygonElement>(null);
  const capsuleStrokeRef = useRef<SVGPathElement>(null);
  const aFrameRef = useRef<SVGGElement>(null);
  const plantRef = useRef<SVGGElement>(null);
  const tableRef = useRef<SVGGElement>(null);
  const auraRingsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Continuous organic breathing light from the pendant lamp
      if (lampGlowRef.current && lightConeRef.current) {
        gsap.to(lampGlowRef.current, {
          attr: { r: 26 },
          opacity: 0.85,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to(lightConeRef.current, {
          opacity: 0.22,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 2. Subtle organic sway of the botanical branch
      if (plantRef.current) {
        gsap.to(plantRef.current, {
          rotation: 2.5,
          transformOrigin: '195px 190px',
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 3. Gentle pulsing aura rings
      if (auraRingsRef.current) {
        gsap.to(auraRingsRef.current, {
          scale: 1.04,
          opacity: 0.4,
          transformOrigin: 'center center',
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 4. Initial SVG line drawing effect
      const allPaths = svgRef.current?.querySelectorAll('.draw-path');
      if (allPaths && allPaths.length > 0) {
        allPaths.forEach((path) => {
          const length = (path as SVGGeometryElement).getTotalLength ? (path as SVGGeometryElement).getTotalLength() : 400;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 2.4,
            ease: 'power3.out',
            stagger: 0.1,
          });
        });
      }
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{
        transform: `translate3d(${mouseX * 0.4}px, ${mouseY * 0.4}px, 0)`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Ambient Botanical Green Luminous Aura */}
      <div className="absolute w-[750px] h-[750px] sm:w-[1050px] sm:h-[1050px] bg-[radial-gradient(circle_at_50%_45%,rgba(196,232,148,0.32)_0%,rgba(215,242,185,0.18)_35%,rgba(235,247,236,0.06)_55%,transparent_75%)] rounded-full blur-[80px] pointer-events-none animate-pulse" />

      {/* Massive Monumental Vector Emblem in Forest & Pistachio Green */}
      <svg
        ref={svgRef}
        viewBox="0 0 400 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[90vw] max-w-[650px] sm:max-w-[780px] lg:max-w-[900px] h-auto max-h-[85vh] opacity-90 transition-all duration-700 filter drop-shadow-[0_10px_35px_rgba(20,54,30,0.08)]"
      >
        <defs>
          {/* Forest & Pistachio Green Stroke Gradients */}
          <linearGradient id="logoStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B4D2A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#2A6F3F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5CA86D" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="glowLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#205831" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8CCB78" stopOpacity="0.4" />
          </linearGradient>

          {/* Translucent Soft Celadon Fill Gradient */}
          <linearGradient id="glassFillGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#C4E894" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#E5F3E7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F2F9F3" stopOpacity="0.6" />
          </linearGradient>

          {/* Light Beam Downward Cone Gradient in Pistachio Green */}
          <linearGradient id="lampConeGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7EBA4D" stopOpacity="0.38" />
            <stop offset="40%" stopColor="#C4E894" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C4E894" stopOpacity="0" />
          </linearGradient>

          {/* Soft Blur Filter */}
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="highGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 0: Ambient Concentric Aura Rings in Soft Forest Green */}
        {/* ------------------------------------------------------------- */}
        <g ref={auraRingsRef} opacity="0.45">
          <ellipse
            cx="200"
            cy="210"
            rx="180"
            ry="190"
            stroke="#2E6F40"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            fill="none"
          />
          <ellipse
            cx="200"
            cy="210"
            rx="155"
            ry="165"
            stroke="#5CA86D"
            strokeWidth="0.6"
            strokeDasharray="2 4"
            fill="none"
          />
          <circle
            cx="200"
            cy="110"
            r="80"
            stroke="#C4E894"
            strokeWidth="0.8"
            strokeDasharray="2 8"
            fill="none"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 1: Translucent Filled Outer Capsule Arch */}
        {/* ------------------------------------------------------------- */}
        <g opacity="0.95">
          {/* Frosted Mint Glass Backdrop */}
          <path
            d="M120 130 C120 60 280 60 280 130 V260 C280 330 120 330 120 260 Z"
            fill="url(#glassFillGrad)"
            className="filter drop-shadow-sm"
          />

          {/* Capsule Ambient Inner Highlight */}
          <path
            d="M126 132 C126 68 274 68 274 132 V258 C274 322 126 322 126 258 Z"
            stroke="#C4E894"
            strokeWidth="1"
            strokeOpacity="0.45"
            fill="none"
          />

          {/* Outer Capsule Contour Lines */}
          <path
            ref={capsuleStrokeRef}
            d="M120 130 C120 60 280 60 280 130 V260 C280 330 120 330 120 260 Z"
            stroke="url(#logoStrokeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="draw-path"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 2: Hanging Pendant Lamp & Ambient Downward Cone */}
        {/* ------------------------------------------------------------- */}
        <g id="lamp-system">
          {/* Light Cone projecting downward */}
          <polygon
            ref={lightConeRef}
            points="200,145 130,340 270,340"
            fill="url(#lampConeGrad)"
            opacity="0.18"
            className="transition-opacity duration-500"
          />

          {/* Vertical Cord */}
          <line
            x1="200"
            y1="64"
            x2="200"
            y2="128"
            stroke="#1B4D2A"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Trapezoid Lamp Shade */}
          <path
            d="M185 142 L215 142 L208 128 L192 128 Z"
            fill="#1B4D2A"
            stroke="#123B1E"
            strokeWidth="1"
            className="draw-path"
          />

          {/* Glowing Bulb Element */}
          <circle
            cx="200"
            cy="146"
            r="3.5"
            fill="#3B7D4E"
            className="filter drop-shadow-sm"
          />

          {/* Animated Soft Light Glow Aura */}
          <circle
            ref={lampGlowRef}
            cx="200"
            cy="146"
            r="16"
            fill="#C4E894"
            opacity="0.6"
            filter="url(#highGlow)"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 3: Monumental Triangular 'A' Apex Architectural Legs */}
        {/* ------------------------------------------------------------- */}
        <g ref={aFrameRef} id="a-frame">
          {/* Left Leg: Apex extending down past bottom-left */}
          <line
            x1="200"
            y1="148"
            x2="70"
            y2="335"
            stroke="url(#logoStrokeGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Right Leg: Apex extending down past bottom-right */}
          <line
            x1="200"
            y1="148"
            x2="330"
            y2="335"
            stroke="url(#logoStrokeGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Lower Detached Structural Tick Mark */}
          <line
            x1="60"
            y1="348"
            x2="90"
            y2="308"
            stroke="#1E4D2B"
            strokeWidth="4.5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Small Symmetric Tick Mark on Right for Optical Balance */}
          <line
            x1="340"
            y1="348"
            x2="310"
            y2="308"
            stroke="#1E4D2B"
            strokeWidth="2.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 4: Botanical Foliage / Organic Branch in Forest Green */}
        {/* ------------------------------------------------------------- */}
        <g ref={plantRef} id="botanical-branch">
          {/* Main Stem sweeping gracefully to the right */}
          <path
            d="M195 190 Q225 184 265 178"
            stroke="#235A34"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="draw-path"
          />
          {/* Secondary upper twig */}
          <path
            d="M230 184 Q245 168 270 166"
            stroke="#235A34"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            className="draw-path"
          />
          {/* Secondary lower twig */}
          <path
            d="M212 186 Q220 202 245 206"
            stroke="#235A34"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            className="draw-path"
          />

          {/* Stylized Leaves in Fresh Green with Dark Green Contour */}
          <g>
            <ellipse
              cx="245"
              cy="170"
              rx="6"
              ry="3.5"
              transform="rotate(-20 245 170)"
              fill="#C4E894"
              stroke="#1B4D2A"
              strokeWidth="1.2"
            />
            <ellipse
              cx="265"
              cy="166"
              rx="6"
              ry="3.5"
              transform="rotate(10 265 166)"
              fill="#C4E894"
              stroke="#1B4D2A"
              strokeWidth="1.2"
            />
            <ellipse
              cx="258"
              cy="180"
              rx="5"
              ry="3"
              transform="rotate(-35 258 180)"
              fill="#3B7D4E"
              stroke="#123B1E"
              strokeWidth="1"
            />
            <ellipse
              cx="230"
              cy="200"
              rx="5"
              ry="3"
              transform="rotate(40 230 200)"
              fill="#C4E894"
              stroke="#1B4D2A"
              strokeWidth="1.2"
            />
            <ellipse
              cx="242"
              cy="206"
              rx="5"
              ry="3"
              transform="rotate(15 242 206)"
              fill="#3B7D4E"
              stroke="#123B1E"
              strokeWidth="1"
            />
            <ellipse
              cx="220"
              cy="178"
              rx="4.5"
              ry="2.5"
              transform="rotate(-45 220 178)"
              fill="#C4E894"
              stroke="#1B4D2A"
              strokeWidth="1"
            />
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LAYER 5: Minimalist Table & Chairs Spatial Joinery */}
        {/* ------------------------------------------------------------- */}
        <g ref={tableRef} id="furniture-suite">
          {/* Table Top Surface Beam */}
          <line
            x1="155"
            y1="285"
            x2="245"
            y2="285"
            stroke="#1B4D2A"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Table Central Pedestal Post */}
          <line
            x1="200"
            y1="285"
            x2="200"
            y2="325"
            stroke="#1B4D2A"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Table Ground Footing Base */}
          <line
            x1="180"
            y1="325"
            x2="220"
            y2="325"
            stroke="#1B4D2A"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Left Chair Silhouette */}
          <line
            x1="140"
            y1="276"
            x2="140"
            y2="312"
            stroke="#235A34"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
          />
          <line
            x1="140"
            y1="300"
            x2="170"
            y2="300"
            stroke="#235A34"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
          />
          <line
            x1="170"
            y1="300"
            x2="170"
            y2="325"
            stroke="#235A34"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
          />

          {/* Right Chair Silhouette */}
          <line
            x1="260"
            y1="276"
            x2="260"
            y2="312"
            stroke="#235A34"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
          />
          <line
            x1="260"
            y1="300"
            x2="230"
            y2="300"
            stroke="#235A34"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
          />
          <line
            x1="230"
            y1="300"
            x2="230"
            y2="325"
            stroke="#235A34"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="draw-path"
          />
        </g>
      </svg>
    </div>
  );
};
