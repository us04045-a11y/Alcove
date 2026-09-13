import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalArchRef = useRef<SVGGElement>(null);
  const logoEmblemRef = useRef<SVGGElement>(null);
  const logoWordmarkRef = useRef<HTMLDivElement>(null);
  
  // Elements that transform
  const lampGroupRef = useRef<SVGGElement>(null);
  const sunDiscRef = useRef<SVGCircleElement>(null);
  const sunGlowRef = useRef<SVGCircleElement>(null);
  const sunRaysRef = useRef<SVGGElement>(null);
  const gableRoofRef = useRef<SVGGElement>(null);
  const botanicalLogoRef = useRef<SVGGElement>(null);
  const furnitureGroupRef = useRef<SVGGElement>(null);

  // Landscape layers
  const skyLayerRef = useRef<SVGGElement>(null);
  const cloudsGroupRef = useRef<SVGGElement>(null);
  const mountainsFarRef = useRef<SVGGElement>(null);
  const mountainsMidRef = useRef<SVGGElement>(null);
  const mountainsNearRef = useRef<SVGGElement>(null);
  const mistFarRef = useRef<SVGGElement>(null);
  const mistNearRef = useRef<SVGGElement>(null);
  const waterPlaneRef = useRef<SVGGElement>(null);
  const foregroundTerrainRef = useRef<SVGGElement>(null);
  const foregroundFloraRef = useRef<SVGGElement>(null);
  const atmosphericMotesRef = useRef<SVGGElement>(null);

  // Overlays
  const captionRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // -------------------------------------------------------------
      // Initial Static Setup (GPU-accelerated defaults)
      // -------------------------------------------------------------
      gsap.set(containerRef.current, { opacity: 1 });
      
      // Logo initial state
      gsap.set(logoEmblemRef.current, {
        opacity: 0,
        scale: 0.9,
        transformOrigin: 'center center',
      });
      gsap.set(logoWordmarkRef.current, {
        opacity: 0,
        y: 18,
        letterSpacing: '0.04em',
      });

      // Landscape elements hidden initially
      gsap.set(skyLayerRef.current, { opacity: 0 });
      gsap.set(cloudsGroupRef.current, { opacity: 0, x: -30 });
      gsap.set(sunDiscRef.current, { scale: 0.3, opacity: 0, transformOrigin: 'center center' });
      gsap.set(sunGlowRef.current, { scale: 0.2, opacity: 0, transformOrigin: 'center center' });
      gsap.set(sunRaysRef.current, { opacity: 0, scale: 0.8, transformOrigin: 'center center' });
      gsap.set(mountainsFarRef.current, { opacity: 0, y: 70 });
      gsap.set(mountainsMidRef.current, { opacity: 0, y: 90 });
      gsap.set(mountainsNearRef.current, { opacity: 0, y: 110 });
      gsap.set([mistFarRef.current, mistNearRef.current], { opacity: 0 });
      gsap.set(waterPlaneRef.current, { opacity: 0, y: 40 });
      gsap.set(foregroundTerrainRef.current, { opacity: 0, y: 80 });
      gsap.set(foregroundFloraRef.current, { opacity: 0, scale: 0.9, transformOrigin: 'bottom right' });
      gsap.set(atmosphericMotesRef.current, { opacity: 0 });
      gsap.set(captionRef.current, { opacity: 0, y: 10 });
      gsap.set(skipButtonRef.current, { opacity: 0 });

      // -------------------------------------------------------------
      // PHASE 1: OPENING (0.0s - 1.2s)
      // Clean sage screen, logo emerges in center with subtle scale
      // -------------------------------------------------------------
      tl.to(logoEmblemRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
      }, 0.2);

      tl.to(logoWordmarkRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.12em',
        duration: 0.9,
        ease: 'power2.out',
      }, 0.45);

      tl.to(skipButtonRef.current, {
        opacity: 0.65,
        duration: 0.6,
        ease: 'power1.out',
      }, 0.8);

      // -------------------------------------------------------------
      // PHASE 2: LOGO INTEGRATION & PROGRESSIVE LANDSCAPE FORMATION (1.2s - 3.8s)
      // The logo elements organically transform into the landscape!
      // -------------------------------------------------------------
      
      // A. The pendant lamp transforms into the morning rising sun!
      tl.to(lampGroupRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: 'power2.in',
      }, 1.3);

      tl.to(sunGlowRef.current, {
        opacity: 0.9,
        scale: 1,
        duration: 1.4,
        ease: 'power2.out',
      }, 1.4);

      tl.to(sunDiscRef.current, {
        opacity: 1,
        scale: 1,
        y: -10,
        duration: 1.5,
        ease: 'power3.out',
      }, 1.4);

      tl.to(sunRaysRef.current, {
        opacity: 0.45,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out',
      }, 1.6);

      // B. Sky and atmospheric depth expand
      tl.to(skyLayerRef.current, {
        opacity: 1,
        duration: 1.6,
        ease: 'power2.inOut',
      }, 1.3);

      // C. Distant mountains rise, echoing the triangular gable "A"
      tl.to(mountainsFarRef.current, {
        opacity: 0.7,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      }, 1.5);

      tl.to(gableRoofRef.current, {
        opacity: 0.25,
        duration: 0.8,
        ease: 'power2.out',
      }, 1.6);

      // D. Mid-ground mountain ridges and valley mist
      tl.to(mountainsMidRef.current, {
        opacity: 0.9,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      }, 1.7);

      tl.to(mistFarRef.current, {
        opacity: 0.75,
        duration: 1.4,
        ease: 'power1.inOut',
      }, 1.8);

      // E. Water reflection & Near mountain ridges
      tl.to(waterPlaneRef.current, {
        opacity: 0.85,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
      }, 1.9);

      tl.to(mountainsNearRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      }, 2.0);

      // F. Botanical branch blossoms outward into lush foreground flora
      tl.to(botanicalLogoRef.current, {
        opacity: 0.3,
        scale: 1.2,
        duration: 0.9,
        ease: 'power2.out',
      }, 2.0);

      tl.to(foregroundFloraRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      }, 2.1);

      // G. Foreground architectural terrace / plateau emerges
      tl.to(foregroundTerrainRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
      }, 2.2);

      tl.to(mistNearRef.current, {
        opacity: 0.6,
        duration: 1.4,
        ease: 'power1.inOut',
      }, 2.3);

      tl.to(atmosphericMotesRef.current, {
        opacity: 0.8,
        duration: 1.2,
      }, 2.4);

      // H. Arch transforms into panoramic architectural portal
      tl.to(portalArchRef.current, {
        scale: 1.06,
        strokeWidth: 2,
        opacity: 0.85,
        duration: 1.6,
        ease: 'power2.out',
      }, 1.8);

      // I. Wordmark dissolves smoothly
      tl.to(logoWordmarkRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.7,
        ease: 'power2.in',
      }, 2.0);

      // -------------------------------------------------------------
      // PHASE 3: ENVIRONMENTAL DRIFT & CINEMATIC SPLENDOR (2.4s - 4.4s)
      // Gentle cloud drift, sunlight breathing, atmospheric float
      // -------------------------------------------------------------
      tl.to(cloudsGroupRef.current, {
        opacity: 0.8,
        x: 40,
        duration: 2.8,
        ease: 'none',
      }, 1.6);

      tl.to(mistFarRef.current, {
        x: -25,
        duration: 2.6,
        ease: 'none',
      }, 2.0);

      tl.to(mistNearRef.current, {
        x: 35,
        duration: 2.6,
        ease: 'none',
      }, 2.0);

      // Subtle editorial caption reveal
      tl.to(captionRef.current, {
        opacity: 0.9,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 2.8);

      // -------------------------------------------------------------
      // PHASE 4: PORTAL REVEAL TO HOMEPAGE (4.4s - 5.4s)
      // Camera pushes through the central arch portal into the homepage
      // -------------------------------------------------------------
      tl.to(captionRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power2.in',
      }, 4.2);

      tl.to(skipButtonRef.current, {
        opacity: 0,
        duration: 0.3,
      }, 4.3);

      // Smooth camera push through the arch
      tl.to(portalArchRef.current, {
        scale: 3.8,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.inOut',
        transformOrigin: '50% 45%',
      }, 4.3);

      tl.to(
        [
          skyLayerRef.current,
          sunDiscRef.current,
          sunGlowRef.current,
          sunRaysRef.current,
          cloudsGroupRef.current,
          mountainsFarRef.current,
          mountainsMidRef.current,
          mountainsNearRef.current,
          waterPlaneRef.current,
          foregroundTerrainRef.current,
          foregroundFloraRef.current,
          mistFarRef.current,
          mistNearRef.current,
          atmosphericMotesRef.current,
          furnitureGroupRef.current,
          gableRoofRef.current,
        ],
        {
          scale: 1.45,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.inOut',
          transformOrigin: '50% 50%',
        },
        4.35
      );

      // Reveal homepage canvas seamlessly
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      }, 4.7);
    }, containerRef);

    // Hard failsafe in case anything takes too long
    const failsafeTimeout = setTimeout(() => {
      onComplete();
    }, 6200);

    // Listen for ESC key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      clearTimeout(failsafeTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const skipIntro = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          onComplete();
        },
      });
    } else {
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      id="cinematic-brand-intro"
      className="fixed inset-0 z-[99999] w-full h-full bg-[#D8E6B8] flex items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: '#D8E6B8' }}
      aria-label="Alcove Cinematic Brand Sequence"
    >
      {/* 
        Full-Screen High-Resolution SVG Canvas 
        Coordinates: 0 0 1920 1080 (16:9 cinematic widescreen view)
        Designed with high-precision architectural vector curves
      */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient: Morning Atmosphere transitioning to sage horizon */}
          <linearGradient id="introSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C9DEAB" />
            <stop offset="35%" stopColor="#DDECC2" />
            <stop offset="68%" stopColor="#F5EDD6" />
            <stop offset="85%" stopColor="#EAD8BE" />
            <stop offset="100%" stopColor="#D8E6B8" />
          </linearGradient>

          {/* Morning Sun Radial Flare */}
          <radialGradient id="introSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FEE4A6" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#F5CE7B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D8E6B8" stopOpacity="0" />
          </radialGradient>

          {/* Sun Rays Radial */}
          <radialGradient id="introSunRays" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#F9E2A8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D8E6B8" stopOpacity="0" />
          </radialGradient>

          {/* Mountain Far Gradient (Hazy sage/slate) */}
          <linearGradient id="introMtnFarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7E9F78" />
            <stop offset="65%" stopColor="#96B491" />
            <stop offset="100%" stopColor="#BED2B2" />
          </linearGradient>

          {/* Mountain Mid Gradient (Noble forest jade) */}
          <linearGradient id="introMtnMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3F6E4C" />
            <stop offset="60%" stopColor="#558363" />
            <stop offset="100%" stopColor="#87A98D" />
          </linearGradient>

          {/* Mountain Near Gradient (Deep pine/obsidian green) */}
          <linearGradient id="introMtnNearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#204A2F" />
            <stop offset="70%" stopColor="#153621" />
            <stop offset="100%" stopColor="#2A5338" />
          </linearGradient>

          {/* Water Lagoon Gradient */}
          <linearGradient id="introWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A4C2A1" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#8CAE88" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6C9368" stopOpacity="0.95" />
          </linearGradient>

          {/* Architectural Plateau Foreground */}
          <linearGradient id="introForegroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#153320" />
            <stop offset="45%" stopColor="#0F2819" />
            <stop offset="100%" stopColor="#081A0F" />
          </linearGradient>

          {/* Soft Mist Gradient */}
          <linearGradient id="introMistGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="25%" stopColor="#F7FAF5" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#EDF5EA" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#F7FAF5" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Portal Arch Clipping Mask for Framed View */}
          <clipPath id="archPortalClip">
            <path d="M720 180 C720 70 1200 70 1200 180 V720 C1200 840 720 840 720 720 Z" />
          </clipPath>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 1: SKY & ATMOSPHERE                           */}
        {/* ------------------------------------------------------------- */}
        <g ref={skyLayerRef} className="sky-atmosphere">
          <rect x="0" y="0" width="1920" height="1080" fill="url(#introSkyGrad)" />
          
          {/* Subtle Ambient Light Wash */}
          <circle cx="960" cy="460" r="700" fill="url(#introSunGlow)" opacity="0.35" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 2: DRIFTING STYLIZED CLOUDS                   */}
        {/* ------------------------------------------------------------- */}
        <g ref={cloudsGroupRef} className="clouds-layer" fill="#FFFFFF" opacity="0.4">
          <path d="M200 240 Q280 220 360 240 Q420 200 500 230 Q560 250 620 240 Q660 260 620 280 L220 280 Z" opacity="0.5" />
          <path d="M1250 190 Q1330 165 1410 185 Q1480 150 1560 175 Q1630 195 1700 180 L1680 230 L1260 230 Z" opacity="0.4" />
          <path d="M780 280 Q840 260 920 275 Q980 250 1040 270 Q1100 285 1160 275 L1140 310 L800 310 Z" opacity="0.3" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 3: RISING MORNING SUN & GOD RAYS              */}
        {/* Positioned right above the central mountain apex             */}
        {/* ------------------------------------------------------------- */}
        <g className="sun-assembly">
          {/* Radial Expanding Sun Rays */}
          <g ref={sunRaysRef}>
            <circle cx="960" cy="460" r="450" fill="url(#introSunRays)" />
            {/* Subtle Geometrical Sun Ray Spokes */}
            <g stroke="#FFF0C2" strokeWidth="1.5" opacity="0.4">
              <line x1="960" y1="460" x2="600" y2="220" />
              <line x1="960" y1="460" x2="740" y2="160" />
              <line x1="960" y1="460" x2="960" y2="100" />
              <line x1="960" y1="460" x2="1180" y2="160" />
              <line x1="960" y1="460" x2="1320" y2="220" />
              <line x1="960" y1="460" x2="1420" y2="340" />
              <line x1="960" y1="460" x2="500" y2="340" />
            </g>
          </g>

          {/* Soft Luminous Outer Corona */}
          <circle ref={sunGlowRef} cx="960" cy="460" r="180" fill="url(#introSunGlow)" />

          {/* Crisp Radiant Sun Core Disc */}
          <circle
            ref={sunDiscRef}
            cx="960"
            cy="460"
            r="38"
            fill="#FFFCEE"
            stroke="#FDECB8"
            strokeWidth="3"
            filter="drop-shadow(0 0 25px rgba(255,235,170,0.85))"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 4: DISTANT MOUNTAIN RIDGES (Far Peaks)        */}
        {/* Note the central 45° peak mirroring the 'A' in the Alcove logo */}
        {/* ------------------------------------------------------------- */}
        <g ref={mountainsFarRef} className="mountains-far">
          <path
            d="M-40 680 L220 540 L440 620 L680 490 L960 390 L1240 500 L1500 580 L1720 520 L1980 660 L1980 950 L-40 950 Z"
            fill="url(#introMtnFarGrad)"
            opacity="0.85"
          />
        </g>

        {/* Distant Valley Mist Layer */}
        <g ref={mistFarRef} className="mist-far">
          <path
            d="M-100 590 C300 560 600 620 960 580 C1320 540 1620 610 2020 570 L2020 660 L-100 660 Z"
            fill="url(#introMistGrad)"
            opacity="0.75"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 5: MID-RANGE MOUNTAINS & TOPOGRAPHIC RIDGES   */}
        {/* Rich alpine green contours with geometric razor ridges        */}
        {/* ------------------------------------------------------------- */}
        <g ref={mountainsMidRef} className="mountains-mid">
          {/* Main Central Majestic Ridge */}
          <path
            d="M100 750 L380 590 L580 660 L820 510 L960 435 L1120 530 L1360 620 L1600 550 L1880 730 L1960 880 L0 880 Z"
            fill="url(#introMtnMidGrad)"
          />
          {/* Ridge Facet Shading for 3D Geological Depth */}
          <path
            d="M960 435 L1120 530 L1360 620 L1600 550 L1880 730 L1960 880 L960 880 Z"
            fill="#325A3D"
            opacity="0.25"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 6: TRANQUIL COASTAL / ALPINE WATER PLANE     */}
        {/* Reflecting the dawn sky and distant mountain silhouettes      */}
        {/* ------------------------------------------------------------- */}
        <g ref={waterPlaneRef} className="water-plane">
          <path
            d="M280 710 Q960 685 1640 710 L1760 790 Q960 760 160 790 Z"
            fill="url(#introWaterGrad)"
          />
          {/* Luminous Sun Reflection Shimmer on Water */}
          <ellipse cx="960" cy="735" rx="140" ry="12" fill="#FFF8E0" opacity="0.6" />
          <ellipse cx="960" cy="742" rx="90" ry="6" fill="#FFFFFF" opacity="0.75" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 7: NEAR PINE & ROCK RIDGES                    */}
        {/* ------------------------------------------------------------- */}
        <g ref={mountainsNearRef} className="mountains-near">
          <path
            d="M-50 820 L180 690 L420 740 L700 630 L880 710 L1060 670 L1320 730 L1560 660 L1820 750 L2000 840 L2000 980 L-50 980 Z"
            fill="url(#introMtnNearGrad)"
          />
          {/* Silhouetted Alpine Pine Trees on the ridge */}
          <g fill="#143621" opacity="0.95">
            {/* Left Ridge Pines */}
            <polygon points="180,670 174,692 186,692" />
            <polygon points="195,675 190,695 200,695" />
            <polygon points="215,665 209,692 221,692" />
            <polygon points="410,720 405,742 415,742" />
            <polygon points="425,715 420,742 430,742" />
            {/* Right Ridge Pines */}
            <polygon points="1545,640 1539,663 1551,663" />
            <polygon points="1565,635 1558,665 1572,665" />
            <polygon points="1585,645 1579,667 1591,667" />
          </g>
        </g>

        {/* Near Valley Mist Floating Above Water */}
        <g ref={mistNearRef} className="mist-near">
          <path
            d="M0 720 C400 680 800 740 1200 700 C1600 660 1800 730 2000 710 L2000 780 L0 780 Z"
            fill="url(#introMistGrad)"
            opacity="0.65"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 8: FOREGROUND ARCHITECTURAL PLATEAU & LOUNGE  */}
        {/* The clean stone terrace framing the vista                      */}
        {/* ------------------------------------------------------------- */}
        <g ref={foregroundTerrainRef} className="foreground-plateau">
          {/* Architectural Terrace Floor Slab */}
          <path
            d="M0 830 L650 810 L960 800 L1270 810 L1920 830 L1920 1080 L0 1080 Z"
            fill="url(#introForegroundGrad)"
          />
          {/* Minimalist Stone Edge Highlight */}
          <path
            d="M0 830 L650 810 L960 800 L1270 810 L1920 830"
            stroke="#2F5C3B"
            strokeWidth="3"
            fill="none"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 9: FOREGROUND BOTANICALS                      */}
        {/* Expanding gracefully from the logo's delicate branch design   */}
        {/* ------------------------------------------------------------- */}
        <g ref={foregroundFloraRef} className="foreground-flora" stroke="#0F2A1A" fill="#0F2A1A">
          {/* Right Side Botanical Silhouette (Delicate Olive & Botanical Branch) */}
          <g transform="translate(1320, 560)">
            <path d="M400 480 Q280 340 160 280 Q80 240 0 200" fill="none" strokeWidth="6" strokeLinecap="round" />
            <path d="M160 280 Q220 210 260 140" fill="none" strokeWidth="4" strokeLinecap="round" />
            <path d="M90 245 Q130 180 160 120" fill="none" strokeWidth="3" strokeLinecap="round" />
            <path d="M30 215 Q50 150 70 90" fill="none" strokeWidth="3" strokeLinecap="round" />
            
            {/* Stylized Leaves echoing the Alcove logo branch */}
            <ellipse cx="260" cy="140" rx="22" ry="12" transform="rotate(-30 260 140)" />
            <ellipse cx="220" cy="160" rx="19" ry="10" transform="rotate(25 220 160)" />
            <ellipse cx="180" cy="200" rx="20" ry="11" transform="rotate(-40 180 200)" />
            <ellipse cx="160" cy="120" rx="18" ry="9" transform="rotate(-15 160 120)" />
            <ellipse cx="130" cy="150" rx="17" ry="9" transform="rotate(35 130 150)" />
            <ellipse cx="105" cy="190" rx="18" ry="10" transform="rotate(-30 105 190)" />
            <ellipse cx="70" cy="90" rx="17" ry="8" transform="rotate(-20 70 90)" />
            <ellipse cx="50" cy="130" rx="16" ry="9" transform="rotate(40 50 130)" />
            <ellipse cx="0" cy="200" rx="18" ry="9" transform="rotate(-10 0 200)" />
          </g>

          {/* Left Side Balanced Botanical Silhouette */}
          <g transform="translate(240, 680)">
            <path d="M-100 380 Q0 240 120 200 Q200 170 260 150" fill="none" strokeWidth="5" strokeLinecap="round" />
            <path d="M120 200 Q150 130 180 80" fill="none" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="260" cy="150" rx="20" ry="10" transform="rotate(15 260 150)" />
            <ellipse cx="210" cy="170" rx="18" ry="9" transform="rotate(-30 210 170)" />
            <ellipse cx="180" cy="80" rx="17" ry="8" transform="rotate(10 180 80)" />
            <ellipse cx="150" cy="120" rx="16" ry="8" transform="rotate(-25 150 120)" />
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* LANDSCAPE LAYER 10: ATMOSPHERIC PARTICLES & MOTES             */}
        {/* ------------------------------------------------------------- */}
        <g ref={atmosphericMotesRef} className="atmospheric-motes" fill="#FFFFFF" opacity="0.6">
          <circle cx="820" cy="420" r="2.5" opacity="0.7" />
          <circle cx="910" cy="380" r="3" opacity="0.8" />
          <circle cx="1020" cy="410" r="2" opacity="0.6" />
          <circle cx="1120" cy="460" r="3.5" opacity="0.5" />
          <circle cx="750" cy="490" r="2" opacity="0.6" />
          <circle cx="880" cy="540" r="2.5" opacity="0.5" />
          <circle cx="980" cy="510" r="3" opacity="0.7" />
          <circle cx="1060" cy="530" r="2" opacity="0.8" />
          <circle cx="930" cy="620" r="2" opacity="0.4" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* THE ALCOVE EMBLEM & ARCHITECTURAL PORTAL WINDOW               */}
        {/* This SVG structure starts as the exact Alcove Logo!           */}
        {/* Then, each line morphs and unrolls into the landscape layers  */}
        {/* ------------------------------------------------------------- */}
        <g
          id="logo-portal-assembly"
          stroke="#0F2A1A"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 
            1. The Central Capsule / Arch Window 
            Original logo viewBox: 0 0 160 220, scaled to center (960, 480)
            Capsule coordinates centered at x=960, y=460, height ~580, width ~360
          */}
          <g ref={portalArchRef} className="portal-arch-group">
            <path
              d="M780 340 C780 180 1140 180 1140 340 V620 C1140 780 780 780 780 620 Z"
              fill="none"
              stroke="#0F2A1A"
              strokeWidth="9"
              className="transition-all"
            />
          </g>

          {/* Core Emblem Interior Group */}
          <g ref={logoEmblemRef} className="emblem-interior">
            {/* 2. Hanging Pendant Lamp from Top of Capsule */}
            <g ref={lampGroupRef} className="lamp-group">
              {/* Stem */}
              <line x1="960" y1="190" x2="960" y2="330" strokeWidth="6" />
              {/* Trapezoid Lamp Shade */}
              <path d="M925 370 L995 370 L980 330 L940 330 Z" fill="#0F2A1A" stroke="none" />
              {/* Lamp Bulb with gentle warm ambient glow */}
              <circle cx="960" cy="382" r="8" fill="#F8E5A1" stroke="#0F2A1A" strokeWidth="2.5" />
            </g>

            {/* 3. The Prominent Triangular "A" Apex Frame extending outward */}
            <g ref={gableRoofRef} className="gable-apex-group">
              {/* Left leg extending down past capsule bottom-left */}
              <line x1="960" y1="385" x2="665" y2="780" strokeWidth="9" />
              {/* Right leg extending down past capsule bottom-right */}
              <line x1="960" y1="385" x2="1255" y2="780" strokeWidth="9" />
              {/* Small detached structural tick on lower-left leg */}
              <line x1="645" y1="810" x2="710" y2="725" strokeWidth="8" />
            </g>

            {/* 4. Delicate Botanical Branch in Upper-Right Inside Area */}
            <g ref={botanicalLogoRef} strokeWidth="3.5" opacity="0.95" className="logo-botanical-branch">
              {/* Main stem curving right */}
              <path d="M950 480 Q1015 465 1105 450" fill="none" />
              <path d="M1025 465 Q1060 420 1115 415" fill="none" />
              <path d="M985 470 Q1005 510 1060 520" fill="none" />
              
              {/* Small stylized leaves */}
              <ellipse cx="1060" cy="425" rx="14" ry="8" transform="rotate(-20 1060 425)" fill="#0F2A1A" />
              <ellipse cx="1105" cy="415" rx="14" ry="8" transform="rotate(10 1105 415)" fill="#0F2A1A" />
              <ellipse cx="1090" cy="455" rx="11" ry="6.5" transform="rotate(-35 1090 455)" fill="#0F2A1A" />
              <ellipse cx="1025" cy="500" rx="11" ry="6.5" transform="rotate(40 1025 500)" fill="#0F2A1A" />
              <ellipse cx="1055" cy="515" rx="11" ry="6.5" transform="rotate(15 1055 515)" fill="#0F2A1A" />
              <ellipse cx="1005" cy="450" rx="10" ry="5.5" transform="rotate(-45 1005 450)" fill="#0F2A1A" />
            </g>

            {/* 5. Minimalist Dining / Workspace Table & Chairs */}
            <g ref={furnitureGroupRef} className="furniture-group">
              {/* Table Top Horizontal Bar */}
              <line x1="860" y1="675" x2="1060" y2="675" strokeWidth="8" />
              {/* Table Center Pedestal Leg & Base */}
              <line x1="960" y1="675" x2="960" y2="760" strokeWidth="8" />
              <line x1="915" y1="760" x2="1005" y2="760" strokeWidth="8" />

              {/* Left Chair: Backrest & Seat */}
              <line x1="825" y1="655" x2="825" y2="735" strokeWidth="7" />
              <line x1="825" y1="710" x2="890" y2="710" strokeWidth="7" />
              <line x1="890" y1="710" x2="890" y2="760" strokeWidth="7" />

              {/* Right Chair: Backrest & Seat */}
              <line x1="1095" y1="655" x2="1095" y2="735" strokeWidth="7" />
              <line x1="1095" y1="710" x2="1030" y2="710" strokeWidth="7" />
              <line x1="1030" y1="710" x2="1030" y2="760" strokeWidth="7" />
            </g>
          </g>
        </g>
      </svg>

      {/* 
        High-Contrast Serif Wordmark 
        Placed precisely below the central arch during the opening 
      */}
      <div
        ref={logoWordmarkRef}
        className="absolute z-20 pointer-events-none flex flex-col items-center justify-center text-center"
        style={{ top: 'calc(50% + 220px)' }}
      >
        <span className="font-cinzel font-black text-4xl sm:text-5xl lg:text-6xl text-[#0F2A1A] tracking-[0.14em] uppercase">
          ALCOVE
        </span>
        <span className="font-mono-custom text-[11px] sm:text-xs text-[#1D4A2A] tracking-[0.28em] uppercase font-bold mt-2">
          ARCHITECTURAL WORKSPACES • SILENCE
        </span>
      </div>

      {/* 
        Phase 3 Ambient Editorial Caption 
        Appears softly as the landscape reaches full grandeur 
      */}
      <div
        ref={captionRef}
        className="absolute bottom-8 sm:bottom-12 z-20 pointer-events-none text-center px-4"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0F2A1A]/10 backdrop-blur-md border border-[#0F2A1A]/15 text-[10px] sm:text-[11px] font-mono-custom text-[#0F2A1A] uppercase tracking-[0.2em] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D522F] animate-ping" />
          <span>ALCOVE // SPATIAL ARCHITECTURE & SILENCE</span>
        </div>
      </div>

      {/* 
        Minimalist Awwwards-style Skip Button 
        Elegant, unobtrusive, fully functional 
      */}
      <button
        ref={skipButtonRef}
        type="button"
        onClick={skipIntro}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 px-3.5 py-1.5 rounded-full bg-[#0F2A1A]/10 hover:bg-[#0F2A1A] text-[#0F2A1A] hover:text-[#D8E6B8] border border-[#0F2A1A]/20 font-mono-custom text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm cursor-pointer"
        aria-label="Skip website cinematic intro"
      >
        <span>SKIP [ESC]</span>
      </button>
    </div>
  );
};
