import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Menu, X, ArrowUpRight, Sparkles, MapPin } from 'lucide-react';
import { AlcoveLogo } from './AlcoveLogo';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{
        y: isScrolled ? 0 : -80,
        opacity: isScrolled ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-2xl border-b border-[#DFEAE1] py-3.5 shadow-lg shadow-black/5 pointer-events-auto'
          : 'pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand: Logo Next to Name ALCOVE */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#hero-story-container"
            className="flex items-center gap-2.5 sm:gap-3 group select-none cursor-pointer"
          >
            {/* Architectural Vector Logo Mark in White & Green Theme */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EDF6EE] border border-[#CDE3D0] group-hover:border-[#2E6F40] group-hover:bg-[#E2F0E4] p-1 flex items-center justify-center transition-all duration-300 shadow-sm shadow-[#0F2A1A]/5 group-hover:shadow-md group-hover:shadow-[#2E6F40]/15">
              <AlcoveLogo
                size={22}
                color="#1E4D2B"
                strokeWidth={3}
                showWordmark={false}
              />
            </div>

            {/* Typography Wordmark + Descriptor */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-cinzel font-black text-xl sm:text-2xl tracking-wider text-[#0D2616] group-hover:text-[#256138] transition-colors leading-none">
                  ALCOVE
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono-custom text-[#3B7049] uppercase tracking-widest font-semibold">
                  ATRIUMS
                </span>
              </div>
            </div>
          </a>

          {/* Campus Location Tag */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF6ED] border border-[#D3E7D5] text-[10px] font-mono-custom text-[#225732] font-medium">
            <MapPin className="w-3 h-3 text-[#2E6F40]" />
            <span>Block 9 Clifton • Karachi</span>
          </div>
        </div>

        {/* Center Nav Links in High-Contrast Forest Green */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono-custom uppercase tracking-wider text-[#244A32] font-semibold">
          <a
            href="#projets"
            className="hover:text-[#184425] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#2E6F40] hover:after:w-full after:transition-all"
          >
            SPACES
          </a>
          <a
            href="#why-us"
            className="hover:text-[#184425] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#2E6F40] hover:after:w-full after:transition-all"
          >
            WHY US
          </a>
          <a
            href="#reviews"
            className="hover:text-[#184425] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#2E6F40] hover:after:w-full after:transition-all"
          >
            REVIEWS
          </a>
          <a
            href="#contact"
            className="hover:text-[#184425] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#2E6F40] hover:after:w-full after:transition-all"
          >
            BOOK TOUR / SESSION
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#122E1C] hover:bg-[#1D4A2E] text-white font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md shadow-[#122E1C]/20 flex items-center gap-1.5"
          >
            <span>BOOK TOUR / SESSION</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C4E894]" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#EDF5EE] text-[#122E1C] border border-[#D1E5D4] hover:text-[#2E6F40] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation in White & Green */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-[#D8E6DA] px-6 py-6 space-y-4 text-sm font-mono-custom uppercase tracking-wider overflow-hidden shadow-xl"
          >
            <a
              href="#projets"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#0F2A1A] hover:text-[#2E6F40] py-1.5 border-b border-[#EEF4EF] font-semibold"
            >
              SPACES & ATRIUMS
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#0F2A1A] hover:text-[#2E6F40] py-1.5 border-b border-[#EEF4EF] font-semibold"
            >
              WHY ALCOVE
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#0F2A1A] hover:text-[#2E6F40] py-1.5 border-b border-[#EEF4EF] font-semibold"
            >
              MEMBER REVIEWS (4.9★)
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#0F2A1A] hover:text-[#2E6F40] py-1.5 font-semibold"
            >
              BOOK A TOUR / SESSION
            </a>
            <div className="pt-2 border-t border-[#EEF4EF]">
              <div className="text-[10px] text-[#557F60] mb-1 font-semibold">FLAGSHIP LOCATION</div>
              <div className="text-xs text-[#1E4D2B] font-bold">Plot # G, 25 Khayaban-e-Jami, Block 9 Clifton, Karachi, 75500</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
