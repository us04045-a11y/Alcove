import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';
import {
  PHOTO_003,
  PHOTO_017,
  PHOTO_033,
  PHOTO_036,
  PHOTO_076,
  PHOTO_077,
  PHOTO_082,
  PHOTO_0103,
  PHOTO_0111,
  PHOTO_0121,
  PHOTO_0123,
  PROJECTS,
} from '../data/alcoveData';

export interface GallerySpaceItem {
  id: string;
  projectId: string;
  photo: string;
  photoRef: string;
  label: string; // Understated label: e.g. "COWORKING", "PRIVATE OFFICES", "MEETING ROOMS", "LOUNGE", "RECEPTION"
  title: string;
  description: string;
  categoryKey: 'all' | 'coworking' | 'private-offices' | 'meeting-rooms' | 'lounge' | 'reception' | 'details';
  isDominant?: boolean;
  colSpan: string;
  aspectRatio: string;
}

interface EditorialGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenLightbox: (src: string, title: string, caption: string) => void;
}

// Exact items requested with authentic photography and descriptions
const DOMINANT_HERO_SPACE: GallerySpaceItem = {
  id: 'dominant-monolith-cowork',
  projectId: 'alcove-monolith-cowork',
  photo: PHOTO_033,
  photoRef: '033.jpg',
  label: 'COWORKING',
  title: 'Spacious Shared Office Layout',
  description:
    'Wide office space featuring rows of workstations with wooden drawers, ergonomic chairs, carpet flooring, and natural light.',
  categoryKey: 'coworking',
  isDominant: true,
  colSpan: 'col-span-12',
  aspectRatio: 'aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.35/1]',
};

const EDITORIAL_GALLERY_SPACES: GallerySpaceItem[] = [
  // Pair 1: Wide Landscape (003.jpg) + Vertical Portrait (0103.jpg)
  {
    id: 'space-patio-lounge',
    projectId: 'alcove-outdoor-patio',
    photo: PHOTO_003,
    photoRef: '003.jpg',
    label: 'LOUNGE',
    title: 'Outdoor Patio Lounge',
    description:
      'Open-air courtyard with wooden benches, black metal tables, green plants, and a metal staircase under an open sky.',
    categoryKey: 'lounge',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'space-private-executive',
    projectId: 'alcove-private-executive',
    photo: PHOTO_0103,
    photoRef: '0103.jpg',
    label: 'PRIVATE OFFICES',
    title: 'Private Executive / Manager Office',
    description:
      'Private office featuring a dark-wood desk, dual monitors, executive seating, and two client guest chairs.',
    categoryKey: 'private-offices',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },

  // Pair 2: Square Reception Detail (0123.jpg) + Wide Landscape Lounge (0111.jpg)
  {
    id: 'space-reception-signage',
    projectId: 'alcove-reception-atrium',
    photo: PHOTO_0123,
    photoRef: '0123.jpg',
    label: 'RECEPTION',
    title: 'Reception Accent Wall & Branding Signage',
    description:
      'Dark gray textured grid reception wall displaying raised white "Alcove" 3D lettering and geometric logo.',
    categoryKey: 'reception',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'space-breakroom-lounge',
    projectId: 'alcove-biophilic-lounge',
    photo: PHOTO_0111,
    photoRef: '0111.jpg',
    label: 'LOUNGE',
    title: 'Breakroom & Lounge Area',
    description:
      'Cafeteria area with a high bar counter and white barstools, colorful dining seating, and a full-body massage chair.',
    categoryKey: 'lounge',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },

  // Pair 3: Medium Landscape Private Team (076.jpg) + Medium Landscape Pods (077.jpg)
  {
    id: 'space-team-room',
    projectId: 'alcove-team-pavilion',
    photo: PHOTO_076,
    photoRef: '076.jpg',
    label: 'PRIVATE OFFICES',
    title: 'Private Team Room Workspaces',
    description:
      'Multi-desk team room featuring a green accent wall, split ACs, carpeted floors, and individual storage cabinets.',
    categoryKey: 'private-offices',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'space-collab-pods',
    projectId: 'alcove-collaborative-pods',
    photo: PHOTO_077,
    photoRef: '077.jpg',
    label: 'PRIVATE OFFICES',
    title: 'Collaborative Office Pods',
    description:
      'Four-person desk pods with dark privacy partitions, black metal legs, lockable drawers, and mesh chairs.',
    categoryKey: 'private-offices',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },

  // Pair 4: Wide Coworking Bay (017.jpg) + Vertical Row Workstations (036.jpg)
  {
    id: 'space-workstation-bay',
    projectId: 'alcove-workstation-bay',
    photo: PHOTO_017,
    photoRef: '017.jpg',
    label: 'COWORKING',
    title: 'Open Plan Office Workstation Bay',
    description:
      'Shared office setup with white desks, dark privacy screens, ergonomic mesh chairs, and overhead LED lights.',
    categoryKey: 'coworking',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'space-row-workstations',
    projectId: 'alcove-row-workstations',
    photo: PHOTO_036,
    photoRef: '036.jpg',
    label: 'COWORKING',
    title: 'Row Workstations with Storage',
    description:
      'Line of dedicated wall desks equipped with privacy dividers, lockable side drawers, and ergonomic rolling chairs.',
    categoryKey: 'coworking',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },

  // Pair 5: Executive Meeting Chamber (082.jpg) + Glasshouse Architecture Detail (0121.jpg)
  {
    id: 'space-boardroom-suite',
    projectId: 'alcove-executive-boardroom',
    photo: PHOTO_082,
    photoRef: '082.jpg',
    label: 'MEETING ROOMS',
    title: 'The Obsidian Boardroom Suite',
    description:
      '4K AI beamforming telepresence arrays, black travertine conference monoliths, and switchable smart electrochromic glass.',
    categoryKey: 'meeting-rooms',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'space-glasshouse-detail',
    projectId: 'alcove-team-pavilion',
    photo: PHOTO_0121,
    photoRef: '0121.jpg',
    label: 'DETAILS & ARCHITECTURE',
    title: 'Glasshouse Double-Height Atrium & Detail',
    description:
      'Natural timber sit-stand pods, double-height acoustic glazing, and circadian daylight optimization.',
    categoryKey: 'details',
    colSpan: 'col-span-12 lg:col-span-6',
    aspectRatio: 'aspect-[16/10]',
  },
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Spaces' },
  { id: 'coworking', label: 'Coworking' },
  { id: 'private-offices', label: 'Private Offices' },
  { id: 'meeting-rooms', label: 'Meeting Rooms' },
  { id: 'lounge', label: 'Lounge & Patio' },
  { id: 'reception', label: 'Reception' },
] as const;

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({
  onSelectProject,
  onOpenLightbox,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Filter items if user selects specific space types
  const filteredGridItems = EDITORIAL_GALLERY_SPACES.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.categoryKey === activeCategory;
  });

  const showDominantHero = activeCategory === 'all' || activeCategory === 'coworking';

  const handleCardClick = (item: GallerySpaceItem) => {
    const project = PROJECTS.find((p) => p.id === item.projectId) || PROJECTS[0];
    onSelectProject(project);
  };

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-14 no-scrollbar">
        {CATEGORY_FILTERS.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 py-2.5 text-xs font-mono-custom uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap rounded-lg ${
                isActive
                  ? 'bg-[#122E1C] text-white font-bold shadow-md shadow-[#122E1C]/25 ring-2 ring-[#122E1C] ring-offset-2 ring-offset-[#FAFBF9]'
                  : 'bg-white text-[#254F31] border border-[#CDE1D1] hover:border-[#1E522C] hover:text-[#0F2A1A] hover:bg-[#F4F8F4]'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C4E894] inline-block animate-pulse" />}
                {cat.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#C4E894] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 1. DOMINANT LANDSCAPE PHOTOGRAPH */}
      {showDominantHero && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20"
        >
          <article
            className="group relative bg-white border border-[#DCE8DE] hover:border-[#1E522C] transition-colors duration-500 overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(DOMINANT_HERO_SPACE)}
          >
            {/* Large Hero Image */}
            <div className={`relative w-full ${DOMINANT_HERO_SPACE.aspectRatio} overflow-hidden bg-[#0C1F13]`}>
              {!loadedImages[DOMINANT_HERO_SPACE.id] && (
                <div className="absolute inset-0 bg-[#0E2617] animate-pulse flex items-center justify-center">
                  <span className="text-[10px] font-mono-custom text-[#C4E894]/40 uppercase tracking-widest">
                    CALIBRATING ATELIER FRAME...
                  </span>
                </div>
              )}
              <img
                src={DOMINANT_HERO_SPACE.photo}
                alt={DOMINANT_HERO_SPACE.title}
                onLoad={() => handleImageLoad(DOMINANT_HERO_SPACE.id)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  loadedImages[DOMINANT_HERO_SPACE.id] ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Minimalist Top Tag */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2">
                <span className="px-3 py-1.5 bg-[#0F2A1A]/85 backdrop-blur-md text-white border border-white/10 text-[10px] sm:text-xs font-mono-custom tracking-[0.25em] uppercase font-bold">
                  {DOMINANT_HERO_SPACE.label}
                </span>
                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#1E522C] text-[10px] font-mono-custom tracking-wider">
                  ARCHITECTURAL REFERENCE: {DOMINANT_HERO_SPACE.photoRef}
                </span>
              </div>

              {/* Inspect Lightbox Icon Button */}
              <button
                type="button"
                aria-label="Inspect high resolution image"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(
                    DOMINANT_HERO_SPACE.photo,
                    DOMINANT_HERO_SPACE.title,
                    DOMINANT_HERO_SPACE.description
                  );
                }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 z-10 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Editorial Caption Bar */}
            <div className="p-6 sm:p-8 bg-white border-t border-[#E8F0EA] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-[10px] font-mono-custom text-[#346241] uppercase tracking-[0.2em]">
                  <span>FEATURED WORKSPACE</span>
                  <span>•</span>
                  <span>PLOT # G, 25 KHAYABAN-E-JAMI</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-light text-[#0F2A1A] mt-1.5 tracking-tight">
                  {DOMINANT_HERO_SPACE.title}
                </h3>
                <p className="text-sm sm:text-base text-[#466B50] mt-2 font-normal leading-relaxed">
                  {DOMINANT_HERO_SPACE.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                <span className="text-xs font-mono-custom text-[#1E522C] font-semibold tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>EXPLORE SPATIAL SPECIFICATIONS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </article>
        </motion.div>
      )}

      {/* 2. ASYMMETRIC / MASONRY-STYLE STAGGERED WORKSPACE PHOTOGRAPHS */}
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        <AnimatePresence>
          {filteredGridItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              className={`${item.colSpan}`}
            >
              <article
                className="group flex flex-col h-full bg-white border border-[#DCE8DE] hover:border-[#1E522C] transition-colors duration-500 overflow-hidden cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                {/* Photo Frame */}
                <div className={`relative w-full ${item.aspectRatio} overflow-hidden bg-[#0C1F13]`}>
                  {!loadedImages[item.id] && (
                    <div className="absolute inset-0 bg-[#0E2617] animate-pulse flex items-center justify-center">
                      <span className="text-[9px] font-mono-custom text-[#C4E894]/40 uppercase tracking-widest">
                        LOADING ARCHITECTURAL FRAME...
                      </span>
                    </div>
                  )}
                  <img
                    src={item.photo}
                    alt={item.title}
                    onLoad={() => handleImageLoad(item.id)}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
                      loadedImages[item.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Understated Category Label */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-[#0F2A1A]/85 backdrop-blur-md text-white border border-white/10 text-[9px] sm:text-[10px] font-mono-custom tracking-[0.25em] uppercase font-bold">
                      {item.label}
                    </span>
                    <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-[#1E522C] text-[9px] font-mono-custom tracking-wider">
                      {item.photoRef}
                    </span>
                  </div>

                  {/* Quick Expand Icon */}
                  <button
                    type="button"
                    aria-label="Inspect photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(item.photo, item.title, item.description);
                    }}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Minimal Architectural Caption */}
                <div className="p-5 sm:p-6 bg-white border-t border-[#E8F0EA] flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-cinzel text-lg sm:text-xl font-normal text-[#0F2A1A] tracking-tight group-hover:text-[#1D522F] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#466B50] mt-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0F5F1] flex items-center justify-between text-xs font-mono-custom text-[#346241]">
                    <span className="text-[10px] uppercase tracking-wider text-[#638C6E]">
                      REF: {item.photoRef}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#1E522C] group-hover:translate-x-0.5 transition-transform">
                      <span>DETAILS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
