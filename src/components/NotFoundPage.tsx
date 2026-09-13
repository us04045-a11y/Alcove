import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  ArrowLeft,
  Search,
  Home,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building,
  RefreshCw,
} from 'lucide-react';
import { AlcoveLogo } from './AlcoveLogo';
import { PROJECTS } from '../data/alcoveData';
import { ProjectItem } from '../types';
import { sanitizeInput } from '../utils/security';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onSelectSpace?: (project: ProjectItem) => void;
  onOpenConsultation?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onSelectSpace,
  onOpenConsultation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reported, setReported] = useState(false);

  const filteredSpaces = PROJECTS.filter(
    (space) =>
      space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReport = () => {
    setReported(true);
    setTimeout(() => setReported(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-[#0F2A1A] flex flex-col justify-between selection:bg-[#C4E894] selection:text-[#0F2A1A]">
      {/* Blueprint Grid Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E0EBE2 1px, transparent 1px),
            linear-gradient(to bottom, #E0EBE2 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top Architecture Navigation Bar */}
      <header className="relative z-10 border-b border-[#D8E6DA] bg-white/90 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
              title="Return to Main Campus"
            >
              <div className="w-8 h-8 rounded-xl bg-[#EDF6EE] border border-[#CDE3D0] group-hover:border-[#2E6F40] group-hover:bg-[#E2F0E4] p-1 flex items-center justify-center transition-all">
                <AlcoveLogo size={22} color="#1E4D2B" strokeWidth={3} showWordmark={false} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-cinzel font-black text-lg tracking-wider text-[#0D2616] group-hover:text-[#256138] leading-none transition-colors">
                  ALCOVE
                </span>
                <span className="text-[9px] font-mono-custom text-[#3B7049] uppercase tracking-widest">
                  CAMPUS DIRECTORY
                </span>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF5EE] border border-[#D5E7D7] text-[10px] font-mono-custom text-[#275D37]">
              <MapPin className="w-3 h-3 text-[#2E6F40]" />
              <span>Plot # G, 25 Khayaban-e-Jami, Clifton, Karachi</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono-custom font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>STATUS: UNMAPPED COORDINATE (404)</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="px-4 py-2 rounded-xl bg-[#122E1C] hover:bg-[#1D4A2E] text-white font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-black/10"
            >
              <Home className="w-3.5 h-3.5 text-[#C4E894]" />
              <span className="hidden sm:inline">RETURN TO CAMPUS</span>
              <span className="sm:hidden">HOME</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 404 Spatial Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Spatial Blueprint Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDF6EE] border border-[#CDE3D0] text-[#1E4D2B] text-xs font-mono-custom mb-6 uppercase tracking-wider font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#2E6F40] animate-spin-slow" />
            <span>ARCHITECTURAL VOID // LEVEL UNVERIFIED</span>
          </div>

          {/* Large Architectural 404 Headline */}
          <div className="relative inline-block my-2">
            <span className="font-cinzel font-black text-8xl sm:text-9xl md:text-[11rem] tracking-tight text-[#0F2A1A] select-none block leading-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs sm:text-sm font-mono-custom tracking-[0.3em] uppercase text-[#3D784D] bg-white/95 px-4 py-1 rounded-full border border-[#D5E7D7] shadow-sm">
                SPATIAL ZONE NOT FOUND
              </span>
            </div>
          </div>

          {/* Descriptive Clarification */}
          <h1 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-[#0F2A1A] font-bold max-w-2xl mx-auto mt-4 mb-3">
            The Blueprint Coordinates You Requested Do Not Exist
          </h1>
          <p className="text-sm sm:text-base text-[#375440] font-sans max-w-xl mx-auto leading-relaxed mb-8">
            The architectural wing, suite code, or page route you attempted to navigate is outside
            our active layout at Alcove Coworking Flagship. Let us guide you back to our verified campus spaces.
          </p>

          {/* Primary Recovery Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            <button
              onClick={onNavigateHome}
              className="px-6 py-3.5 rounded-xl bg-[#122E1C] hover:bg-[#1D4A2E] text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-200 shadow-md shadow-[#122E1C]/20 hover:scale-[1.02] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#C4E894]" />
              <span>RETURN TO MAIN DIRECTORY</span>
            </button>

            {onOpenConsultation && (
              <button
                onClick={() => {
                  onNavigateHome();
                  setTimeout(() => onOpenConsultation(), 150);
                }}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#EDF6EE] border border-[#CCDED0] text-[#122E1C] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-200 hover:border-[#2E6F40] cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#2E6F40]" />
                <span>BOOK CAMPUS TOUR</span>
              </button>
            )}

            <button
              onClick={handleReport}
              className="px-4 py-3.5 rounded-xl bg-[#FAFBF9] hover:bg-[#EEF5EF] border border-[#DDE7DF] text-[#4A6E53] font-mono-custom text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${reported ? 'text-emerald-600' : ''}`} />
              <span>{reported ? 'COORDINATES LOGGED' : 'REPORT INVALID PATH'}</span>
            </button>
          </div>
        </motion.div>

        {/* Verified Spatial Directory Card */}
        <div className="rounded-2xl bg-white border border-[#D8E6DA] p-6 sm:p-8 shadow-xl shadow-black/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAF1EC]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-custom text-[#2E6F40] font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>VERIFIED SPATIAL INVENTORY // ALL 7 SPACES</span>
              </div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#0F2A1A] mt-1">
                Select an Active Architectural Space
              </h2>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#578564]" />
              <input
                type="text"
                maxLength={60}
                value={searchQuery}
                onChange={(e) => setSearchQuery(sanitizeInput(e.target.value, 60))}
                placeholder="Filter spaces by name or wing..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#F8FAF8] border border-[#D1E2D4] text-xs font-sans text-[#0F2A1A] placeholder:text-[#7A9C83] focus:outline-none focus:border-[#2E6F40] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Grid of Verified Campus Spaces */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-6">
            {filteredSpaces.map((space, idx) => (
              <button
                key={space.id}
                onClick={() => {
                  if (onSelectSpace) {
                    onSelectSpace(space);
                  } else {
                    onNavigateHome();
                  }
                }}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#FAFBF9] hover:bg-[#EDF6EE] border border-[#E3EDE5] hover:border-[#2E6F40] text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F2A1A] border border-[#2E6F40] flex flex-col items-center justify-center shrink-0 text-[#C4E894] group-hover:scale-105 transition-transform shadow-xs">
                  <span className="text-[10px] font-mono-custom font-bold">SP-0{idx + 1}</span>
                  <span className="text-[8px] font-mono-custom text-[#78A182] uppercase">SPACE</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-custom text-[#3B7049] uppercase tracking-wider font-semibold">
                      {space.category}
                    </span>
                    <span className="text-[10px] text-[#7A9C83]">•</span>
                    <span className="text-[10px] font-mono-custom text-[#578564] truncate">
                      {space.area}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-xs sm:text-sm font-bold text-[#0F2A1A] group-hover:text-[#256138] transition-colors truncate">
                    {space.title}
                  </h3>
                  <p className="text-[11px] text-[#4A6E53] font-sans truncate mt-0.5">
                    {space.subtitle}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-[#7A9C83] group-hover:text-[#2E6F40] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}

            {filteredSpaces.length === 0 && (
              <div className="col-span-2 py-8 text-center text-xs font-mono-custom text-[#578564]">
                No matching spaces found. Use the buttons above to return to the campus directory.
              </div>
            )}
          </div>
        </div>

        {/* Security & System Info Footer Callout */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-custom text-[#578564] border-t border-[#DDE7DF] pt-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2E6F40]" />
            <span>ALCOVE CORE ENGINE • HTTP 404 SPATIAL RECOVERY PROTOCOL</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5" />
            <span>CLIFTON CAMPUS • KARACHI, PAKISTAN</span>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-[#D8E6DA] bg-white py-4 px-4 sm:px-8 text-center text-xs font-mono-custom text-[#578564]">
        © {new Date().getFullYear()} ALCOVE CRAFTED SPACES. All rights reserved.
      </footer>
    </div>
  );
};
