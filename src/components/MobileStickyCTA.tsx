import React from 'react';
import { Calendar, Phone } from 'lucide-react';

interface MobileStickyCTAProps {
  onBookTour: () => void;
  phoneDisplay?: string;
  phoneInternational?: string;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  onBookTour,
  phoneDisplay = '0300-1407991',
  phoneInternational = '923001407991',
}) => {
  return (
    <div
      id="mobile-sticky-cta"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#091D11]/95 backdrop-blur-md border-t border-[#194025] px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] safe-area-pb"
      role="region"
      aria-label="Quick mobile booking actions"
    >
      {/* Studio Location & Status Indicator */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C4E894] animate-pulse" />
          <span className="font-cinzel text-[11px] font-bold text-white tracking-wider uppercase truncate">
            Alcove Clifton
          </span>
        </div>
        <span className="text-[10px] font-mono-custom text-[#8BB594] truncate">
          Flagship Suites & Day Passes
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Quick Dial button */}
        <a
          href={`tel:+${phoneInternational}`}
          className="p-2.5 rounded-full bg-[#143B22] border border-[#235835] text-[#C4E894] hover:bg-[#1E5230] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C4E894]"
          aria-label={`Call Concierge at ${phoneDisplay}`}
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Primary Book Tour CTA Button */}
        <button
          type="button"
          onClick={onBookTour}
          className="px-4 py-2.5 rounded-full bg-[#C4E894] hover:bg-[#B3DB7F] active:scale-95 text-[#0A2614] font-cinzel font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#C4E894]/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book a Tour</span>
        </button>
      </div>
    </div>
  );
};
