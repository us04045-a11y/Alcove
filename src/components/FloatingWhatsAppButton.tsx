import React, { useState } from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  phoneInternational?: string; // e.g. "923001407991"
  displayNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneInternational = '923001407991',
  defaultMessage = 'Hello Alcove, I would like to inquire about workspace memberships and spatial availability.',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneInternational}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <aside
      aria-label="Contact us via WhatsApp for more inquiry"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center justify-end pointer-events-auto select-none"
    >
      <a
        id="alcove-floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-3 pl-3.5 pr-4 py-3 sm:py-3.5 rounded-full bg-[#25D366] text-[#0A2614] shadow-2xl shadow-[#25D366]/40 hover:bg-[#20bd5a] hover:shadow-[#25D366]/60 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/60 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      >
        {/* Subtle Pulse Radar Animation */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* WhatsApp Icon with Counter/Badge Indicator */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-[#072111] group-hover:bg-white/30 transition-colors">
          <MessageSquare className="w-5 h-5 fill-current" />
          {/* Online green indicator */}
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#25D366]"
            title="Available Online"
          />
        </div>

        {/* Label & Micro-Action */}
        <div className="flex flex-col items-start text-left leading-tight">
          <span className="font-mono-custom text-[10px] uppercase tracking-wider text-[#0F351E]/80 font-bold">
            For More Inquiry
          </span>
          <span className="font-cinzel text-xs sm:text-sm font-black tracking-wide text-[#072111] flex items-center gap-1">
            WhatsApp Us
            <ArrowUpRight className="w-3.5 h-3.5 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>

        {/* Floating Tooltip preview on hover (without phone number) */}
        {isHovered && (
          <div className="hidden sm:block absolute bottom-full right-0 mb-3 px-3.5 py-1.5 rounded-xl bg-[#0D2416] text-[#C4E894] text-[11px] font-mono-custom shadow-xl border border-[#1C452B] whitespace-nowrap pointer-events-none transition-opacity">
            <span>Direct Concierge Chat</span>
          </div>
        )}
      </a>
    </aside>
  );
};
