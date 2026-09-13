import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Layers,
  ShieldCheck,
  Award,
  ArrowRight,
  VolumeX,
  Compass,
  Cpu,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Sliders,
  MessageSquare,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { safeLocalStorage, getSafeImageUrl, isSafeImageUrl } from '../utils/security';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'specs'>('overview');
  const [activeImage, setActiveImage] = useState<string>(project?.heroImage || '');

  useEffect(() => {
    setActiveTab('overview');
    if (project) {
      let custom: string | null = null;
      if (project.id === 'alcove-sky-terrace') custom = safeLocalStorage.getItem('alcove_photo_003.jpg');
      else if (project.id === 'alcove-monolith-cowork') custom = safeLocalStorage.getItem('alcove_photo_033.jpg');
      else if (project.id === 'alcove-alpine-sanctuary') custom = safeLocalStorage.getItem('alcove_photo_076.jpg');
      else if (project.id === 'alcove-biophilic-lounge') custom = safeLocalStorage.getItem('alcove_photo_0111.jpg');

      const safeCustom = custom && isSafeImageUrl(custom) ? custom : null;
      const fallback = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop';
      const resolved = safeCustom || project.heroImage || fallback;
      setActiveImage(getSafeImageUrl(resolved, fallback));
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F2A1A]/70 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-[#DCE8DE] text-[#0F2A1A] shadow-2xl z-10 custom-scrollbar"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-[#122E1C] border border-white/15 text-white transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* High-Resolution Photography & Architectural Header */}
          <div className="relative aspect-16/10 sm:aspect-21/9 w-full overflow-hidden bg-[#0C1F13] text-white border-b border-[#1E4D2B]">
            {/* Space Active Photograph */}
            <img
              src={activeImage || project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('unsplash.com')) {
                  target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop';
                }
              }}
            />

            {/* Gradient Scrims for Readability */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-16 z-10 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#C4E894] text-[#0F2A1A] text-[10px] font-mono-custom uppercase font-bold tracking-wider shadow-sm">
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono-custom text-[#C4E894] border border-white/15 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>SPATIAL AREA // {project.area}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono-custom text-white border border-white/15 flex items-center gap-1.5">
                <VolumeX className="w-3.5 h-3.5 text-[#C4E894]" />
                <span>{project.acousticRating}</span>
              </span>
            </div>

            {/* Bottom Header Content */}
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
              <div className="text-xs font-mono-custom text-[#C4E894] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location} • {project.year}</span>
              </div>
              <h2 className="font-cinzel font-black text-2xl sm:text-4xl text-white leading-tight drop-shadow-md">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono-custom text-[#D4F3AA] max-w-2xl line-clamp-2 drop-shadow-sm">
                {project.subtitle}
              </p>

              {/* Gallery Thumbnails Selector */}
              {project.galleryImages && project.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
                  <span className="text-[10px] font-mono-custom text-white/70 uppercase tracking-wider mr-1">Views:</span>
                  {project.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-12 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        activeImage === img ? 'border-[#C4E894] scale-105 shadow-md shadow-[#C4E894]/30' : 'border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation Controls */}
          <div className="px-6 py-3 bg-[#F4F8F4] border-b border-[#DCE8DE] flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-custom uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#122E1C] text-white font-bold shadow-xs'
                  : 'text-[#385B43] hover:text-[#0F2A1A] hover:bg-[#E8F1E9]'
              }`}
            >
              Spatial Overview
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-custom uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'materials'
                  ? 'bg-[#122E1C] text-white font-bold shadow-xs'
                  : 'text-[#385B43] hover:text-[#0F2A1A] hover:bg-[#E8F1E9]'
              }`}
            >
              Materials & Finishes ({project.materials.length})
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-custom uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-[#122E1C] text-white font-bold shadow-xs'
                  : 'text-[#385B43] hover:text-[#0F2A1A] hover:bg-[#E8F1E9]'
              }`}
            >
              Technical Specifications
            </button>
          </div>

          {/* Modal Tab Bodies */}
          <div className="p-6 sm:p-8 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-semibold">
                    Architectural Concept
                  </h3>
                  <p className="text-base text-[#193B24] leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-sm text-[#4A7356] leading-relaxed pt-1">
                    {project.architecturalConcept}
                  </p>
                </div>

                {/* High-Resolution Spatial Photography Gallery */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Spatial Photography ({project.galleryImages.length} Angles & Views)</span>
                      </h3>
                      <span className="text-[10px] font-mono-custom text-[#558061]">Click any photo to enlarge in header</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {project.galleryImages.map((gImg, gIdx) => (
                        <div
                          key={gIdx}
                          onClick={() => setActiveImage(gImg)}
                          className={`group relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#0C1F13] ${
                            activeImage === gImg ? 'border-[#2E6F40] scale-102 shadow-md' : 'border-[#DCE8DE] hover:border-[#2E6F40]/60'
                          }`}
                        >
                          <img
                            src={gImg}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <span className="text-[9px] font-mono-custom text-white font-bold uppercase tracking-wider">
                              View Angle 0{gIdx + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F4F8F4] border border-[#DCE8DE]">
                  {project.specifications.map((spec, i) => (
                    <div key={i} className="space-y-0.5 text-xs font-mono-custom">
                      <span className="text-[10px] text-[#558061] uppercase block font-semibold">{spec.label}</span>
                      <span className="text-[#0F2A1A] font-bold text-xs block">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Awards if any */}
                {project.awards && project.awards.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#EDF6EF] border border-[#C6E2CA] flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#2E6F40] shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono-custom text-[#2E6F40] uppercase font-bold block">
                        Verified Accolades
                      </span>
                      <span className="text-xs font-mono-custom text-[#0F2A1A] font-medium">
                        {project.awards.join(' • ')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-semibold">
                  Material Palette & Surface Engineering
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.materials.map((mat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#DCE8DE] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-sm text-[#0F2A1A]">{mat.name}</span>
                        <span className="text-[10px] font-mono-custom px-2 py-0.5 rounded bg-[#EDF6EF] text-[#2E6F40] font-semibold">
                          {mat.finish}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A7356] leading-relaxed">
                        {mat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-semibold">
                  Technical Parameters & Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.specifications.map((spec, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#DCE8DE] flex items-center justify-between">
                      <span className="text-xs font-mono-custom text-[#558061]">{spec.label}</span>
                      <span className="text-xs font-mono-custom font-bold text-[#0F2A1A]">{spec.value}</span>
                    </div>
                  ))}
                  <div className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#DCE8DE] flex items-center justify-between">
                    <span className="text-xs font-mono-custom text-[#558061]">Acoustic Certification</span>
                    <span className="text-xs font-mono-custom font-bold text-[#1E522F]">{project.acousticRating}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#DCE8DE] flex items-center justify-between">
                    <span className="text-xs font-mono-custom text-[#558061]">Campus Location</span>
                    <span className="text-xs font-mono-custom font-bold text-[#0F2A1A]">Block 9 Clifton</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#DCE8DE] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-mono-custom text-[#558061]">
                Acoustic Standard: <strong className="text-[#1E522F]">{project.acousticRating}</strong>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#DCE8DE] hover:bg-[#F4F8F4] text-[#385B43] font-cinzel font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close Dossier
                </button>
                <a
                  href={`https://wa.me/923001407991?text=${encodeURIComponent(
                    `Hi, I would like to inquire about ${project.title} (${project.category}) at Alcove Clifton, Karachi.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5C] text-[#0A2612] font-mono-custom font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp (0300-1407991)</span>
                </a>
                <button
                  onClick={() => {
                    onClose();
                    onInquire();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#122E1C] hover:bg-[#1D4A2E] text-white font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#122E1C]/20"
                >
                  <span>Book Tour</span>
                  <ArrowRight className="w-4 h-4 text-[#C4E894]" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
