import React from 'react';

interface AlcoveLogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  showWordmark?: boolean;
  animate?: boolean;
}

export const AlcoveLogo: React.FC<AlcoveLogoProps> = ({
  className = '',
  size = 120,
  color = 'currentColor',
  strokeWidth = 3,
  showWordmark = true,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Emblem SVG */}
      <svg
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: typeof size === 'number' ? (size * 220) / 160 : 'auto' }}
        className="overflow-visible"
      >
        <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* 1. Outer Pill / Capsule Arch */}
          <path
            d="M48 60 C48 30 112 30 112 60 V120 C112 150 48 150 48 120 Z"
            fill="none"
          />

          {/* 2. Hanging Pendant Lamp from Top of Capsule */}
          {/* Stem */}
          <line x1="80" y1="32" x2="80" y2="58" strokeWidth={strokeWidth * 0.8} />
          {/* Trapezoid Lamp Shade */}
          <path
            d="M74 65 L86 65 L83 58 L77 58 Z"
            fill={color}
            stroke="none"
          />
          {/* Lamp Bulb/Glow Accent */}
          <circle cx="80" cy="67" r="1.5" fill={color} stroke="none" />

          {/* 3. The Prominent Triangular "A" Apex Frame extending outward */}
          {/* Left leg extending down past capsule bottom-left */}
          <line x1="80" y1="68" x2="28" y2="152" strokeWidth={strokeWidth * 1.15} />
          {/* Right leg extending down past capsule bottom-right */}
          <line x1="80" y1="68" x2="132" y2="152" strokeWidth={strokeWidth * 1.15} />
          
          {/* Small detached structural tick on lower-left leg */}
          <line x1="24" y1="158" x2="36" y2="140" strokeWidth={strokeWidth * 1.1} />

          {/* 4. Delicate Botanical Branch in Upper-Right Inside Area */}
          <g strokeWidth={strokeWidth * 0.55} opacity="0.95">
            {/* Main stem curving right */}
            <path d="M78 88 Q90 85 106 82" />
            <path d="M92 85 Q98 77 108 76" />
            <path d="M85 86 Q88 94 98 96" />
            
            {/* Small stylized leaves */}
            <ellipse cx="98" cy="78" rx="2.5" ry="1.5" transform="rotate(-20 98 78)" fill={color} />
            <ellipse cx="106" cy="76" rx="2.5" ry="1.5" transform="rotate(10 106 76)" fill={color} />
            <ellipse cx="103" cy="83" rx="2" ry="1.2" transform="rotate(-35 103 83)" fill={color} />
            <ellipse cx="92" cy="92" rx="2" ry="1.2" transform="rotate(40 92 92)" fill={color} />
            <ellipse cx="97" cy="95" rx="2" ry="1.2" transform="rotate(15 97 95)" fill={color} />
            <ellipse cx="88" cy="82" rx="1.8" ry="1" transform="rotate(-45 88 82)" fill={color} />
          </g>

          {/* 5. Minimalist Dining/Workspace Table & Chairs */}
          {/* Table Top Horizontal Bar */}
          <line x1="62" y1="130" x2="98" y2="130" strokeWidth={strokeWidth * 1.05} />
          {/* Table Center Pedestal Leg & Base */}
          <line x1="80" y1="130" x2="80" y2="148" strokeWidth={strokeWidth * 1.05} />
          <line x1="72" y1="148" x2="88" y2="148" strokeWidth={strokeWidth * 1.05} />

          {/* Left Chair: Backrest & Seat */}
          <line x1="56" y1="126" x2="56" y2="142" strokeWidth={strokeWidth * 0.9} />
          <line x1="56" y1="137" x2="68" y2="137" strokeWidth={strokeWidth * 0.9} />
          <line x1="68" y1="137" x2="68" y2="148" strokeWidth={strokeWidth * 0.9} />

          {/* Right Chair: Backrest & Seat */}
          <line x1="104" y1="126" x2="104" y2="142" strokeWidth={strokeWidth * 0.9} />
          <line x1="104" y1="137" x2="92" y2="137" strokeWidth={strokeWidth * 0.9} />
          <line x1="92" y1="137" x2="92" y2="148" strokeWidth={strokeWidth * 0.9} />
        </g>
      </svg>

      {/* High-Contrast Editorial Wordmark */}
      {showWordmark && (
        <span
          style={{ color }}
          className="font-cinzel font-black tracking-tight text-3xl sm:text-4xl mt-2 select-none"
        >
          Alcove
        </span>
      )}
    </div>
  );
};
