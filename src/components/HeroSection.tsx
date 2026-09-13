import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { AlcoveLogo } from './AlcoveLogo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onExploreInteriors: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreInteriors,
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLDivElement>(null);
  const headlineLine2Ref = useRef<HTMLDivElement>(null);
  const headlineLine3Ref = useRef<HTMLDivElement>(null);

  // Parallax Layer Refs
  const bgArchRef = useRef<HTMLDivElement>(null);
  const object3DRef = useRef<HTMLDivElement>(null);
  const torusRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLDivElement>(null);
  const metadataLayerRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates for mouse parallax
  const mouseCoords = useRef({ x: 0, y: 0 });
  const currentCoords = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // -----------------------------------------------------------------
    // Mouse Move Parallax Handler (Normalized -1 to +1)
    // -----------------------------------------------------------------
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      mouseCoords.current = { x: nx, y: ny };
    };

    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // -----------------------------------------------------------------
    // RequestAnimationFrame Smooth LERP Loop
    // Subtle, controlled displacement so cards never drift into text
    // -----------------------------------------------------------------
    const renderParallax = () => {
      if (!prefersReducedMotion) {
        const lerp = 0.08;
        currentCoords.current.x += (mouseCoords.current.x - currentCoords.current.x) * lerp;
        currentCoords.current.y += (mouseCoords.current.y - currentCoords.current.y) * lerp;

        const cx = currentCoords.current.x;
        const cy = currentCoords.current.y;

        // Controlled translation offsets keeping elements strictly in perimeter zones
        if (bgArchRef.current) {
          bgArchRef.current.style.transform = `translate3d(${cx * -10}px, ${cy * -10}px, 0) scale(1.02)`;
        }

        if (object3DRef.current) {
          object3DRef.current.style.transform = `translate3d(${cx * -15}px, ${cy * -12}px, 0) rotateX(${
            cy * 15
          }deg) rotateY(${cx * 18}deg)`;
        }

        if (torusRef.current) {
          torusRef.current.style.transform = `translate3d(${cx * 18}px, ${cy * -14}px, 0) rotate(${
            cx * 12
          }deg)`;
        }

        if (stampRef.current) {
          stampRef.current.style.transform = `translate3d(${cx * -12}px, ${cy * 14}px, 0)`;
        }

        if (barcodeRef.current) {
          barcodeRef.current.style.transform = `translate3d(${cx * 8}px, ${cy * 8}px, 0)`;
        }

        if (metadataLayerRef.current) {
          metadataLayerRef.current.style.transform = `translate3d(${cx * 6}px, ${cy * 6}px, 0)`;
        }
      }

      animFrameId.current = requestAnimationFrame(renderParallax);
    };

    animFrameId.current = requestAnimationFrame(renderParallax);

    // -----------------------------------------------------------------
    // GSAP Context: Kinetic Entrance & Outward Scroll Separation
    // -----------------------------------------------------------------
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Initial setup
        gsap.set([headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current], {
          yPercent: 120,
          opacity: 0,
        });

        gsap.set([object3DRef.current, torusRef.current, stampRef.current], {
          scale: 0.7,
          opacity: 0,
          rotation: -20,
        });

        gsap.set(metadataLayerRef.current, {
          opacity: 0,
        });

        // 1. Kinetic Entrance Timeline
        const introTl = gsap.timeline({
          defaults: { ease: 'power4.out' },
          delay: 0.1,
        });

        introTl
          // Headline Lines Reveal with crisp staggered mask slide-ups
          .to(
            headlineLine1Ref.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
            },
            0.08
          )
          .to(
            headlineLine2Ref.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
            },
            0.22
          )
          .to(
            headlineLine3Ref.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
            },
            0.36
          )
          // 3D Objects & Badges Reveal
          .to(
            [object3DRef.current, torusRef.current, stampRef.current],
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: 'back.out(1.4)',
            },
            0.45
          )
          // Metadata Overlays
          .to(
            metadataLayerRef.current,
            {
              opacity: 1,
              duration: 0.8,
            },
            0.6
          );

        // 2. GSAP ScrollTrigger: Outward Divergence (Opening Curtains Effect)
        if (containerRef.current) {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          });

          scrollTl
            // Headline lines glide smoothly and fade gently
            .to(
              headlineLine1Ref.current,
              {
                xPercent: -8,
                opacity: 0.2,
                ease: 'none',
              },
              0
            )
            .to(
              headlineLine2Ref.current,
              {
                xPercent: 6,
                opacity: 0.2,
                ease: 'none',
              },
              0
            )
            .to(
              headlineLine3Ref.current,
              {
                xPercent: -10,
                opacity: 0.2,
                ease: 'none',
              },
              0
            )
            .to(
              object3DRef.current,
              {
                rotation: 60,
                scale: 1.3,
                opacity: 0.15,
                ease: 'none',
              },
              0
            );
        }
      }
    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-story-container"
      className="relative w-full min-h-screen h-screen bg-[#D8E6B8] text-[#0F2A1A] overflow-hidden select-none flex flex-col justify-between"
      style={{ backgroundColor: '#D8E6B8' }}
    >
      {/* ------------------------------------------------------------- */}
      {/* BACKGROUND GRAIN / NOISE TEXTURE OVERLAY                      */}
      {/* ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* ARCHITECTURAL DELICATE GRID CROSSHAIRS                        */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-10 font-mono-custom text-[#183B25] text-[10px] font-semibold">
        {/* Top-left crosshair */}
        <div className="absolute top-24 left-8 sm:left-14 flex items-center gap-1.5">
          <span className="text-[#183B25] font-bold">+</span>
          <span className="tracking-widest hidden sm:inline">[01 // SPATIAL_ATELIER]</span>
        </div>
        {/* Top-right crosshair */}
        <div className="absolute top-24 right-10 sm:right-24 flex items-center gap-1.5">
          <span className="text-[#183B25] font-bold">+</span>
          <span className="tracking-widest hidden md:inline">REF: 24.8139°N</span>
        </div>
        {/* Mid-left coordinates */}
        <div className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 flex items-center gap-2 -rotate-90 origin-left">
          <span className="text-[#183B25] font-bold">+</span>
          <span className="tracking-wider text-[9px] uppercase">GRID SPEC 1800 x 900</span>
        </div>
        {/* Bottom-right crosshair */}
        <div className="absolute bottom-24 right-8 sm:right-16 flex items-center gap-1.5">
          <span className="text-[#183B25] font-bold">+</span>
          <span className="tracking-widest">NRC 0.88</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* LAYER -2: MONUMENTAL WATERMARK ALCOVE ARCH EMBLEM             */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={bgArchRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center will-change-transform opacity-[0.09]"
      >
        <svg
          viewBox="0 0 160 220"
          className="w-[80vw] max-w-[800px] h-auto text-[#0F2A1A]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Arch Capsule */}
          <path d="M48 60 C48 30 112 30 112 60 V120 C112 150 48 150 48 120 Z" />
          {/* Pendant Lamp */}
          <line x1="80" y1="32" x2="80" y2="58" strokeWidth="2.5" />
          <path d="M74 65 L86 65 L83 58 L77 58 Z" fill="currentColor" stroke="none" />
          <circle cx="80" cy="67" r="1.5" fill="currentColor" stroke="none" />
          {/* Triangular Gable Apex Frame */}
          <line x1="80" y1="68" x2="28" y2="152" strokeWidth="3.5" />
          <line x1="80" y1="68" x2="132" y2="152" strokeWidth="3.5" />
          <line x1="24" y1="158" x2="36" y2="140" strokeWidth="3" />
          {/* Furniture */}
          <line x1="60" y1="126" x2="100" y2="126" strokeWidth="3" />
          <line x1="80" y1="126" x2="80" y2="140" strokeWidth="3" />
          <line x1="72" y1="140" x2="88" y2="140" strokeWidth="3" />
        </svg>
      </div>

      {/* ============================================================= */}
      {/* 1. TOP MINIMAL NAVIGATION HEADER                              */}
      {/* ============================================================= */}
      <header className="relative z-40 w-full px-5 sm:px-8 lg:px-12 pt-5 sm:pt-6 flex items-center justify-between font-mono-custom text-xs text-[#0F2A1A]">
        {/* Top-Left: Logo & Edition Stamp */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#hero-story-container"
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* Minimal Vector Logo Stamp */}
            <div className="w-8 h-8 rounded-lg bg-[#0F2A1A] text-[#D8E6B8] flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              <AlcoveLogo
                size={20}
                color="#D8E6B8"
                strokeWidth={3}
                showWordmark={false}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-base sm:text-lg tracking-tight uppercase leading-none">
                ALCOVE
              </span>
              <span className="text-[9px] font-mono-custom tracking-widest text-[#1D522F] font-bold mt-0.5">
                SPATIAL STUDIO // ED. 26
              </span>
            </div>
          </a>

          {/* Micro Telemetry Pill */}
          <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2A1A]/8 border border-[#0F2A1A]/15 text-[10px] tracking-wider text-[#0F2A1A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D522F] animate-pulse" />
            <span>CLIFTON, KARACHI • ACTIVE</span>
          </div>
        </div>

        {/* Top-Right: Small Editorial Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden md:flex items-center gap-7 text-[11px] font-bold tracking-widest uppercase text-[#0F2A1A]/80">
            <a
              href="#projets"
              className="hover:text-[#0F2A1A] transition-colors relative py-1 group cursor-pointer"
            >
              <span>SPACES</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0F2A1A] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#why-us"
              className="hover:text-[#0F2A1A] transition-colors relative py-1 group cursor-pointer"
            >
              <span>WHY US</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0F2A1A] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#contact"
              className="hover:text-[#0F2A1A] transition-colors relative py-1 group cursor-pointer"
            >
              <span>CONTACT</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0F2A1A] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Compact Primary Call to Action */}
          <button
            type="button"
            onClick={onOpenConsultation}
            className="px-4 sm:px-5 py-2 rounded-xl bg-[#0F2A1A] hover:bg-[#1E4D30] text-[#D8E6B8] font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer group"
          >
            <span>BOOK ATELIER</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D8E6B8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </header>

      {/* ============================================================= */}
      {/* 2. CENTER COMPOSITION: PRISTINE UNINTERRUPTED TYPOGRAPHY      */}
      {/* ============================================================= */}
      <main className="relative flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-16 my-auto z-20 pointer-events-none">
        {/* ----------------------------------------------------------- */}
        {/* A. MONUMENTAL HEADLINE (100% CLEAN & UNOBSTRUCTED)          */}
        {/* ----------------------------------------------------------- */}
        <div className="relative z-30 max-w-5xl lg:max-w-6xl w-full select-none text-left">
          {/* LINE 1: WE BUILD */}
          <div className="overflow-hidden py-0.5">
            <div
              ref={headlineLine1Ref}
              className="font-syne font-black text-[11vw] sm:text-[9.5vw] lg:text-[7.8vw] leading-[0.86] tracking-[-0.04em] uppercase text-[#0F2A1A] will-change-transform flex items-center gap-3 sm:gap-5"
            >
              <span>WE BUILD</span>
              <span className="hidden sm:inline-block text-[10px] font-mono-custom tracking-[0.2em] font-semibold text-[#1E4D30] border border-[#0F2A1A]/20 px-3 py-1 rounded-full align-middle mb-1">
                [ 01 // BESPOKE ]
              </span>
            </div>
          </div>

          {/* LINE 2: SPATIAL */}
          <div className="overflow-hidden py-0.5">
            <div
              ref={headlineLine2Ref}
              className="font-syne font-black text-[11vw] sm:text-[9.5vw] lg:text-[7.8vw] leading-[0.86] tracking-[-0.04em] uppercase text-[#0F2A1A] will-change-transform flex items-baseline justify-between"
            >
              <span>SPATIAL</span>
              <span className="hidden md:inline-block font-mono-custom text-[10px] tracking-widest text-[#245433] uppercase font-bold pr-4">
                ACOUSTIC SANCTUARIES &bull; KHAYABAN-E-JAMI
              </span>
            </div>
          </div>

          {/* LINE 3: EXPERIENCES. */}
          <div className="overflow-hidden py-0.5">
            <div
              ref={headlineLine3Ref}
              className="font-syne font-black text-[11vw] sm:text-[9.5vw] lg:text-[7.8vw] leading-[0.86] tracking-[-0.04em] uppercase text-[#0F2A1A] will-change-transform flex items-center"
            >
              <span>EXPERIENCES.</span>
              <span className="w-2.5 sm:w-4 h-2.5 sm:h-4 rounded-full bg-[#0F2A1A] inline-block ml-2 sm:ml-3" />
            </div>
          </div>

          {/* Editorial lead and Atelier exploration */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-4xl pointer-events-auto">
            <p className="font-mono-custom text-xs sm:text-[13px] text-[#0F2A1A] leading-relaxed uppercase tracking-wider max-w-lg font-medium">
              Karachi’s premier private spatial atelier. Dedicated suites calibrated with acoustic isolation, honest natural timber, and architectural stillness.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onExploreInteriors}
                className="px-6 py-3 rounded-xl bg-[#0F2A1A] hover:bg-[#1E4D30] text-[#D8E6B8] font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#0F2A1A]/15 hover:shadow-lg flex items-center gap-2 cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE SUITES</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D8E6B8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* --- OBJECT 4: 3D Interactive Wireframe Geodesic Icosahedron --- */}
        {/* Tucked in the upper-left open corner above Line 1 */}
        <div
          ref={object3DRef}
          className="absolute z-10 top-[6%] sm:top-[8%] left-[2%] sm:left-[4%] w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 pointer-events-none will-change-transform opacity-75"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full stroke-[#0F2A1A] fill-none"
            strokeWidth="1.2"
            strokeLinejoin="round"
          >
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
            <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="3 3" />
            <line x1="10" y1="25" x2="90" y2="75" />
            <line x1="10" y1="75" x2="90" y2="25" />
            <polygon points="50,22 75,37 75,63 50,78 25,63 25,37" strokeWidth="1" />
            <circle cx="50" cy="5" r="2" fill="#0F2A1A" />
            <circle cx="90" cy="25" r="2" fill="#0F2A1A" />
            <circle cx="90" cy="75" r="2" fill="#0F2A1A" />
            <circle cx="50" cy="95" r="2" fill="#0F2A1A" />
            <circle cx="10" cy="75" r="2" fill="#0F2A1A" />
            <circle cx="10" cy="25" r="2" fill="#0F2A1A" />
            <circle cx="50" cy="50" r="2.5" fill="#1E4D30" />
          </svg>
        </div>

        {/* --- OBJECT 5: 3D Floating Chrome Emerald Torus Ring --- */}
        {/* Right edge spacer */}
        <div
          ref={torusRef}
          className="hidden lg:block absolute z-10 top-[48%] -translate-y-1/2 right-[1%] w-16 lg:w-20 h-16 lg:h-20 pointer-events-none will-change-transform opacity-50"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs>
              <linearGradient id="torusGradClean" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E4D30" />
                <stop offset="40%" stopColor="#88AF82" />
                <stop offset="70%" stopColor="#D8E6B8" />
                <stop offset="100%" stopColor="#0F2A1A" />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke="url(#torusGradClean)"
              strokeWidth="14"
              strokeDasharray="260 20"
              strokeLinecap="round"
            />
            <circle cx="60" cy="60" r="28" fill="none" stroke="#0F2A1A" strokeWidth="1.2" opacity="0.35" />
          </svg>
        </div>

        {/* --- OBJECT 6: Rotating Creative Agency Circular Stamp --- */}
        {/* Tucked neatly in lower-left corner below the text */}
        <div
          ref={stampRef}
          className="absolute z-10 bottom-[4%] sm:bottom-[6%] left-[2%] sm:left-[4%] w-20 sm:w-24 h-20 sm:h-24 pointer-events-none will-change-transform opacity-85"
        >
          <div className="relative w-full h-full flex items-center justify-center animate-[spin_24s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#0F2A1A]">
              <path
                id="stampPathClean"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[8.5px] font-mono-custom tracking-[0.24em] uppercase font-bold">
                <textPath href="#stampPathClean">
                  &bull; ALCOVE CRAFTED SPACES &bull; VERIFIED 2026
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-syne font-black text-xs text-[#0F2A1A]">A</span>
            </div>
          </div>
        </div>

        {/* --- OBJECT 8: Barcode Spec Label --- */}
        {/* Tucked cleanly below Line 3 */}
        <div
          ref={barcodeRef}
          className="hidden sm:flex absolute z-10 bottom-[8%] left-[26%] sm:left-[30%] items-center gap-2 px-2.5 py-1 rounded bg-white/70 backdrop-blur-xs border border-[#0F2A1A]/15 font-mono-custom text-[8.5px] text-[#0F2A1A] pointer-events-auto will-change-transform shadow-2xs"
        >
          <div className="flex items-center gap-[2px] h-3.5">
            <span className="w-[1.5px] h-full bg-[#0F2A1A]" />
            <span className="w-[3px] h-full bg-[#0F2A1A]" />
            <span className="w-[1px] h-full bg-[#0F2A1A]" />
            <span className="w-[2px] h-full bg-[#0F2A1A]" />
            <span className="w-[1px] h-full bg-[#0F2A1A]" />
            <span className="w-[3px] h-full bg-[#0F2A1A]" />
          </div>
          <span className="font-bold tracking-widest">ALC-2026-X88</span>
        </div>
      </main>

      {/* ============================================================= */}
      {/* 3. BOTTOM FOOTER TELEMETRY & SUBTLE SCROLL INDICATOR          */}
      {/* ============================================================= */}
      <footer
        ref={metadataLayerRef}
        className="relative z-40 w-full px-5 sm:px-8 lg:px-12 pb-4 sm:pb-5 flex items-end justify-between font-mono-custom text-[10px] sm:text-[11px] text-[#0F2A1A] border-t border-[#0F2A1A]/10 pt-2.5 select-none"
      >
        {/* Bottom Left: Spatial Telemetry */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#1E4D30]" />
            <span className="font-bold uppercase tracking-wider">
              BLOCK 9 CLIFTON, KARACHI
            </span>
          </div>
          <span className="hidden lg:inline text-[#0F2A1A]/40">&bull;</span>
          <span className="hidden lg:inline text-[#1E4D30] font-medium tracking-wide">
            STC 54 / NRC 0.88 CALIBRATION
          </span>
        </div>

        {/* Center: Standardized Awwwards Scroll Indicator */}
        <button
          type="button"
          onClick={onExploreInteriors}
          className="flex flex-col items-center gap-1.5 cursor-pointer group bg-transparent border-0 p-0 focus:outline-none"
          aria-label="Scroll to explore workspaces"
        >
          <span className="font-bold tracking-[0.2em] uppercase text-[10px] text-[#0F2A1A] group-hover:text-[#1E4D30] transition-colors flex items-center gap-1">
            [ SCROLL TO EXPLORE ↓ ]
          </span>
          <div className="w-4 h-6 rounded-full border border-[#0F2A1A]/50 group-hover:border-[#0F2A1A] transition-colors flex items-start justify-center p-0.5">
            <div className="w-1 h-1.5 bg-[#0F2A1A] rounded-full animate-bounce" />
          </div>
        </button>

        {/* Bottom Right: Digital Time & Atelier Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#1E4D30]" />
            <span className="font-bold">PKT UTC+5</span>
          </div>
          <span className="text-[#0F2A1A]/40">&bull;</span>
          <span className="font-bold uppercase tracking-wider text-[#1E4D30]">
            RESIDENCY OPEN
          </span>
        </div>
      </footer>
    </div>
  );
};
