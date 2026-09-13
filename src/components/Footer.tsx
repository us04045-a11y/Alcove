import React from 'react';
import { ArrowUp, Award, MapPin, Sparkles, Play, Shield, Compass, Instagram, Star, ExternalLink, Cookie } from 'lucide-react';
import { AlcoveLogo } from './AlcoveLogo';

interface FooterProps {
  onReplayIntro?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenCookieSettings?: () => void;
  onTrigger404?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onReplayIntro,
  onOpenPrivacyPolicy,
  onOpenCookieSettings,
  onTrigger404,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D2416] text-[#A6C4AE] border-t border-[#1C452B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Giant Monolith Typography Banner */}
        <div className="pb-16 border-b border-[#1C452B]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="p-3.5 sm:p-4 rounded-3xl bg-[#C4E894] shadow-xl shadow-[#C4E894]/20 hidden sm:block">
                <AlcoveLogo size={56} color="#0D2416" strokeWidth={3.2} showWordmark={false} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-custom text-[#C4E894] mb-2 uppercase font-bold tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Crafted Coworking & Shared Spatial Architecture
                </div>
                <h2 className="font-cinzel font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tighter leading-none select-none">
                  ALCOVE
                </h2>
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="p-4 rounded-full bg-[#153823] border border-[#2A6540] text-white hover:text-[#0D2416] hover:bg-[#C4E894] hover:border-[#C4E894] transition-all self-start md:self-auto group cursor-pointer shadow-lg shadow-black/30"
              title="Return to top"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono-custom">
            {/* Col 1: Studio */}
            <div className="space-y-2">
              <span className="text-white uppercase font-bold block font-cinzel">
                Alcove Coworking Network
              </span>
              <p className="text-[#A6C4AE] leading-relaxed font-normal font-sans">
                Next-generation shared workspace architecture combining acoustic silence, curved fluted timber joinery, and private executive suites.
              </p>
              <span className="text-[11px] text-[#78A182] block pt-1">
                Awwwards Site of the Day (SOTD) • WELL Certified Platinum
              </span>
            </div>

            {/* Col 2: Karachi Flagship Campus */}
            <div className="space-y-2 md:col-span-2">
              <span className="text-[#C4E894] uppercase font-bold flex items-center gap-1.5 font-cinzel">
                <MapPin className="w-3.5 h-3.5" />
                Karachi Flagship Campus
              </span>
              <div className="text-[#A6C4AE] leading-relaxed font-sans font-normal">
                <p>
                  Plot # G, 25 Khayaban-e-Jami<br />
                  Block 9 Clifton, Karachi, 75500<br />
                  Pakistan
                </p>
                <span className="text-[#C4E894] font-medium font-mono-custom text-[11px] block mt-1">
                  karachi@alcove-spaces.com • info@alcove-spaces.com
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2.5">
                  <a
                    href="https://www.instagram.com/alcove.pk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#C4E894] hover:underline font-mono-custom text-[11px] font-semibold"
                  >
                    <Instagram className="w-3 h-3 text-[#E1306C]" />
                    <span>Instagram: @alcove.pk</span>
                  </a>
                  <a
                    href="https://share.google/1qecLhF0A7mw9mna7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#C4E894] hover:underline font-mono-custom text-[11px] font-semibold"
                  >
                    <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>Google Reviews: 4.9★ (16 Reviews)</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#C4E894]/70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Col 3: Space Inquiries & Concierge */}
            <div className="space-y-2">
              <span className="text-[#C4E894] uppercase font-bold flex items-center gap-1.5 font-cinzel">
                <Sparkles className="w-3.5 h-3.5" />
                Residency Hours & Access
              </span>
              <p className="text-[#A6C4AE] leading-relaxed font-sans font-normal">
                24/7 Biometric Access for Resident Teams<br />
                Mon–Sat Concierge & Artisan Barista<br />
                Valet & Dedicated Secure Parking
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-custom text-[#78A182]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} ALCOVE CRAFTED SPACES. All rights reserved.</span>

            <a
              href="https://www.instagram.com/alcove.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#153823] hover:bg-[#E1306C] hover:text-white text-[#C4E894] text-[11px] font-mono-custom font-semibold transition-colors cursor-pointer"
              title="Alcove Pakistan Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@alcove.pk</span>
            </a>
            
            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="inline-flex items-center gap-1 text-[#C4E894] hover:underline cursor-pointer font-medium"
              >
                <Shield className="w-3 h-3 text-[#C4E894]" />
                <span>Privacy Policy</span>
              </button>
            )}

            {onOpenCookieSettings && (
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="inline-flex items-center gap-1 text-[#A6C4AE] hover:text-[#C4E894] transition-colors cursor-pointer font-medium"
              >
                <Cookie className="w-3 h-3 text-[#C4E894]" />
                <span>Cookie Preferences</span>
              </button>
            )}

            {onTrigger404 && (
              <button
                type="button"
                onClick={onTrigger404}
                className="inline-flex items-center gap-1 text-[#8AB896] hover:text-[#C4E894] transition-colors cursor-pointer"
                title="Preview Custom 404 Architectural Void"
              >
                <Compass className="w-3 h-3" />
                <span>404 Void</span>
              </button>
            )}

            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#153823] hover:bg-[#C4E894] hover:text-[#0D2416] text-[#C4E894] text-[10px] font-mono-custom font-bold uppercase transition-colors cursor-pointer"
                title="Replay Brand Opening Sequence"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>REPLAY INTRO</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>
              Design & Spatial Experience by{' '}
              <strong className="text-[#C4E894]">Alcove Atelier</strong>
            </span>
            <span className="text-[#204F31]">•</span>
            <span>Awwwards SOTD</span>
            <span className="text-[#204F31]">•</span>
            <span>FSC & WELL Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
