import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Grid,
  Coffee,
  Wifi,
  Headphones,
  Video,
  Sun,
  Wind,
} from 'lucide-react';
import {
  PROJECTS,
  PHOTO_003,
  PHOTO_017,
  PHOTO_021,
  PHOTO_022,
  PHOTO_029,
  PHOTO_030,
  PHOTO_033,
  PHOTO_036,
  PHOTO_039,
  PHOTO_040,
  PHOTO_051,
  PHOTO_073,
  PHOTO_076,
  PHOTO_077,
  PHOTO_082,
  PHOTO_085,
  PHOTO_086,
  PHOTO_098,
  PHOTO_0103,
  PHOTO_0111,
  PHOTO_0113,
  PHOTO_0120,
  PHOTO_0121,
  PHOTO_0122,
  PHOTO_0123,
} from '../data/alcoveData';
import { ProjectItem } from '../types';
import {
  EditorialSpaceItem,
  EditorialSpaceData,
} from './EditorialSpaceItem';
import { EditorialGallery } from './EditorialGallery';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

interface AmenityItem {
  id: string;
  category: string;
  title: string;
  specs: string;
  description: string;
  icon: React.ElementType;
}

const CAMPUS_AMENITIES: AmenityItem[] = [
  {
    id: 'artisan-barista',
    category: 'Hospitality',
    title: 'Artisan Barista & Botanical Bar',
    specs: 'La Marzocco • Organic Teas',
    description: 'Complimentary single-origin espresso roasts and botanical infusions.',
    icon: Coffee,
  },
  {
    id: 'symmetrical-fiber',
    category: 'Connectivity',
    title: '10 Gbps Symmetrical Dark Fiber',
    specs: 'Wi-Fi 6E • Dedicated VLANs',
    description: 'Hardware-isolated enterprise connections with dual-carrier failover.',
    icon: Wifi,
  },
  {
    id: 'acoustic-focus-pods',
    category: 'Acoustic Privacy',
    title: 'Micro-Architectural Phone Pods',
    specs: 'STC 54 Rating • Whisper Fan',
    description: 'Soundproof micro-booths lined with fluted oak and recycled felt.',
    icon: Headphones,
  },
  {
    id: 'ai-telepresence',
    category: 'Presentation',
    title: '4K AI Beamforming Telepresence',
    specs: 'Neat Board Pro • Shure MXA920',
    description: 'Cinema-grade hybrid conference rooms with intelligent tracking.',
    icon: Video,
  },
  {
    id: 'circadian-lighting',
    category: 'Circadian Biology',
    title: 'Circadian Luminescence',
    specs: '2200K–4000K Spectrum',
    description: 'Automated solar-tracking spectrum to eliminate eye fatigue.',
    icon: Sun,
  },
  {
    id: 'hepa-air-purification',
    category: 'Indoor Climate',
    title: 'HEPA H14 & Botanical Moss',
    specs: '4x Air Exchange/Hr',
    description: 'Hospital-grade filtration sustaining oxygen-rich campus air.',
    icon: Wind,
  },
];

// Curated 25-Photo Architectural Collection from Proton Drive
const CAMPUS_LOOKBOOK_PHOTOS = [
  {
    id: 'photo-003',
    src: PHOTO_003,
    title: 'Outdoor Patio Lounge',
    space: 'Outdoor Patio Lounge',
    category: 'Outdoor Terrace',
    specs: 'Open-air courtyard with wooden benches, black metal tables, green plants, and a metal staircase under an open sky.',
  },
  {
    id: 'photo-017',
    src: PHOTO_017,
    title: 'Open Plan Office Workstation Bay',
    space: 'Open Plan Office Workstation Bay',
    category: 'Coworking Bay',
    specs: 'Shared office setup with white desks, dark privacy screens, ergonomic mesh chairs, and overhead LED lights.',
  },
  {
    id: 'photo-021',
    src: PHOTO_021,
    title: 'Monumental Entrance Threshold & Concierge Portal',
    space: 'The Fluted Timber Reception Atrium',
    category: 'Hot Desk Alcove',
    specs: 'Curved CNC Timber Slats & Continuous Ground Lighting',
  },
  {
    id: 'photo-022',
    src: PHOTO_022,
    title: 'Arrival Gallery & Spatial Perspective',
    space: 'The Fluted Timber Reception Atrium',
    category: 'Hot Desk Alcove',
    specs: 'Natural Stone Flooring & Architectural Light Tunnel',
  },
  {
    id: 'photo-029',
    src: PHOTO_029,
    title: 'Bespoke Collaborative Seating Alcove',
    space: 'Aethel Biophilic Member Lounge',
    category: 'Acoustic Lounge',
    specs: 'Low-Stimulus Seclusion & Bouclé Banquettes',
  },
  {
    id: 'photo-030',
    src: PHOTO_030,
    title: 'Architectural Timber Ribs & Natural Shadows',
    space: 'The Fluted Timber Reception Atrium',
    category: 'Hot Desk Alcove',
    specs: 'Organic Textures & Precision Woodworking',
  },
  {
    id: 'photo-033',
    src: PHOTO_033,
    title: 'Spacious Shared Office Layout',
    space: 'Spacious Shared Office Layout',
    category: 'Coworking Space',
    specs: 'Wide office space featuring rows of workstations with wooden drawers, ergonomic chairs, carpet flooring, and natural light.',
  },
  {
    id: 'photo-036',
    src: PHOTO_036,
    title: 'Row Workstations with Storage',
    space: 'Row Workstations with Storage',
    category: 'Dedicated Desks',
    specs: 'Line of dedicated wall desks equipped with privacy dividers, lockable side drawers, and ergonomic rolling chairs.',
  },
  {
    id: 'photo-039',
    src: PHOTO_039,
    title: 'Shared Coworking Desks & Felt Canopies',
    space: 'The Monolith Central Hub',
    category: 'Hot Desk Alcove',
    specs: 'Recycled Wool Felt Grid & Concealed Task Spotlights',
  },
  {
    id: 'photo-040',
    src: PHOTO_040,
    title: 'Whisper-Quiet Workstation Alignment',
    space: 'The Monolith Central Hub',
    category: 'Hot Desk Alcove',
    specs: 'Under-desk Cable Management & Flush Qi Induction',
  },
  {
    id: 'photo-051',
    src: PHOTO_051,
    title: 'Acoustic Micro-Pod Sound Isolation',
    space: 'The Acoustic Focus Atelier',
    category: 'Executive Suite',
    specs: 'Zero Vocal Bleed & High-Privacy Enclosure',
  },
  {
    id: 'photo-073',
    src: PHOTO_073,
    title: 'Deep Work Sanctum Timber Interior',
    space: 'The Acoustic Focus Atelier',
    category: 'Executive Suite',
    specs: 'Motorized Sit-Stand Oak Desk & Brass Task Lamp',
  },
  {
    id: 'photo-076',
    src: PHOTO_076,
    title: 'Private Team Room Workspaces',
    space: 'Private Team Room Workspaces',
    category: 'Private Offices',
    specs: 'Multi-desk team room featuring a green accent wall, split ACs, carpeted floors, and individual storage cabinets.',
  },
  {
    id: 'photo-077',
    src: PHOTO_077,
    title: 'Collaborative Office Pods',
    space: 'Collaborative Office Pods',
    category: 'Team Pods',
    specs: 'Four-person desk pods with dark privacy partitions, black metal legs, lockable drawers, and mesh chairs.',
  },
  {
    id: 'photo-082',
    src: PHOTO_082,
    title: 'The Obsidian Executive Boardroom Suite',
    space: 'The Obsidian Boardroom Suite',
    category: 'Executive Suite',
    specs: 'Smoked Black Travertine & 4K AI Telepresence Arrays',
  },
  {
    id: 'photo-085',
    src: PHOTO_085,
    title: 'Travertine Conference Monolith & Executive Chairs',
    space: 'The Obsidian Boardroom Suite',
    category: 'Executive Suite',
    specs: '24 Leather Executive Seats & Shure MXA920 Microphones',
  },
  {
    id: 'photo-086',
    src: PHOTO_086,
    title: 'Hybrid Telepresence & Privacy Electrochromic Glass',
    space: 'The Obsidian Boardroom Suite',
    category: 'Executive Suite',
    specs: 'Neat Board Pro Displays & Instant Smart Frosted Glass',
  },
  {
    id: 'photo-098',
    src: PHOTO_098,
    title: 'Acoustic Chamber Ceiling & Lighting Grid',
    space: 'The Obsidian Boardroom Suite',
    category: 'Executive Suite',
    specs: 'Micro-Perforated Charcoal Oak & Low-Glare Downlights',
  },
  {
    id: 'photo-0103',
    src: PHOTO_0103,
    title: 'Private Executive / Manager Office',
    space: 'Private Executive / Manager Office',
    category: 'Executive Suite',
    specs: 'Private office featuring a dark-wood desk, dual monitors, executive seating, and two client guest chairs.',
  },
  {
    id: 'photo-0111',
    src: PHOTO_0111,
    title: 'Breakroom & Lounge Area',
    space: 'Breakroom & Lounge Area',
    category: 'Lounge Area',
    specs: 'Cafeteria area with a high bar counter and white barstools, colorful dining seating, and a full-body massage chair.',
  },
  {
    id: 'photo-0113',
    src: PHOTO_0113,
    title: 'Artisan Barista Counter & Espresso Lounge',
    space: 'Aethel Biophilic Member Lounge',
    category: 'Acoustic Lounge',
    specs: 'La Marzocco Espresso Station & Handcrafted Bar',
  },
  {
    id: 'photo-0120',
    src: PHOTO_0120,
    title: 'The Glasshouse Team Studio Wing Overview',
    space: 'The Glasshouse Team Studio Wing',
    category: 'Hot Desk Alcove',
    specs: 'Double-Height Acoustic Glass & Dedicated 16-Desk Wing',
  },
  {
    id: 'photo-0121',
    src: PHOTO_0121,
    title: 'Team Workstation Atrium & Private Server Rack',
    space: 'The Glasshouse Team Studio Wing',
    category: 'Hot Desk Alcove',
    specs: 'Motorized Sit-Stand Desks & Encrypted Enterprise VLAN',
  },
  {
    id: 'photo-0122',
    src: PHOTO_0122,
    title: 'Dedicated Suite Collaboration Hub',
    space: 'The Glasshouse Team Studio Wing',
    category: 'Hot Desk Alcove',
    specs: 'Acoustic Sound Partition & Private Meeting Pod',
  },
  {
    id: 'photo-0123',
    src: PHOTO_0123,
    title: 'Reception Accent Wall & Branding Signage',
    space: 'Reception Accent Wall & Branding Signage',
    category: 'Reception Area',
    specs: 'Dark gray textured grid reception wall displaying raised white "Alcove" 3D lettering and geometric logo.',
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [viewMode, setViewMode] = useState<'editorial' | 'lookbook'>('editorial');
  
  // Lightbox State
  const [activeLightbox, setActiveLightbox] = useState<{
    src: string;
    title: string;
    caption: string;
  } | null>(null);

  // Define the 4 Curated Visual Spaces inspired by NeueHouse
  const EDITORIAL_SPACES: EditorialSpaceData[] = [
    {
      id: 'private-offices',
      number: '01',
      title: 'PRIVATE OFFICES',
      subtitle: 'Dedicated Suites & Focus Sanctums',
      description:
        'Fully enclosed, acoustic-sealed executive suites and dedicated team studios. Engineered with motorized European white oak sit-stand desks, private server racks, and double-glazed fluted acoustic partitions.',
      specifications: [
        '2 to 24 Members',
        'STC 54+ Sound Isolation',
        'Dedicated Enterprise VLAN',
      ],
      dominantPhoto: {
        src: PHOTO_0121,
        alt: 'The Glasshouse Team Studio Wing Workstations',
        caption: 'The Glasshouse Dedicated Team Studio Wing',
        specs: 'Motorized Sit-Stand Desks • Double-Height Glass Atrium',
      },
      supportingPhoto: {
        src: PHOTO_073,
        alt: 'Acoustic Deep Work Focus Pod Interior',
        caption: 'Deep Work Sanctum & Motorized Oak Desk',
        figureLabel: 'FIG. 01 — FLUTED OAK FOCUS POD',
      },
      layoutVariant: 'dominant-left',
      project: PROJECTS.find((p) => p.id === 'alcove-team-pavilion') || PROJECTS[0],
    },
    {
      id: 'meeting-rooms',
      number: '02',
      title: 'MEETING ROOMS',
      subtitle: 'Executive Conference & Presentation Suites',
      description:
        'High-stakes conference chambers carved in smoked black travertine, surrounded by switchable electrochromic privacy glass and integrated 4K beamforming telepresence arrays.',
      specifications: [
        'Up to 24 Executive Seats',
        'Shure MXA920 Ceiling Arrays',
        'Neat Board Pro 4K AI',
      ],
      dominantPhoto: {
        src: PHOTO_082,
        alt: 'The Obsidian Executive Boardroom Suite',
        caption: 'The Obsidian Executive Boardroom Suite',
        specs: 'Smoked Black Travertine • 4K AI Telepresence Monolith',
      },
      supportingPhoto: {
        src: PHOTO_086,
        alt: 'Switchable Electrochromic Privacy Glass',
        caption: 'Instant Smart Frosted Glass Privacy',
        figureLabel: 'FIG. 02 — SMART PRIVACY GLASS',
      },
      layoutVariant: 'dominant-right',
      project: PROJECTS.find((p) => p.id === 'alcove-executive-boardroom') || PROJECTS[1],
    },
    {
      id: 'open-workspace',
      number: '03',
      title: 'OPEN WORKSPACE',
      subtitle: 'Hot Desks & Acoustic Phone Pods',
      description:
        'Fluid, natural daylight-filled coworking desks crowned by custom wool felt acoustic waffle canopies, ergonomic task seating, and whisper-quiet perimeter call enclosures.',
      specifications: [
        '180 Ergonomic Hot Desks',
        'NRC 0.88 Acoustic Canopy',
        'Circadian 2200K–4000K',
      ],
      dominantPhoto: {
        src: PHOTO_033,
        alt: 'The Monolith Central Hub Workstation Suite',
        caption: 'The Monolith Central Hub Workstation Atrium',
        specs: 'Fluted Oak Atrium • Acoustic Wool Felt Grid',
      },
      supportingPhoto: {
        src: PHOTO_036,
        alt: 'Integrated Workstation Pods & Phone Enclosure',
        caption: 'Dual-Monitor Arm Rigs & Acoustic Sound-Masking',
        figureLabel: 'FIG. 03 — WORKSTATION POD',
      },
      layoutVariant: 'panoramic-left',
      project: PROJECTS.find((p) => p.id === 'alcove-monolith-cowork') || PROJECTS[2],
    },
    {
      id: 'lounge-common-areas',
      number: '04',
      title: 'LOUNGE / COMMON AREAS',
      subtitle: 'Member Lounges & Rooftop Solarium',
      description:
        'Tactile bouclé banquettes, an artisan espresso bar, and living botanical moss walls that spill outward onto the open-air rooftop sky terrace.',
      specifications: [
        'La Marzocco Espresso Station',
        'Rooftop Solarium Deck',
        'Living Botanical Moss Wall',
      ],
      dominantPhoto: {
        src: PHOTO_0111,
        alt: 'Aethel Biophilic Member Lounge & Botanical Bar',
        caption: 'Aethel Biophilic Member Lounge & Botanical Bar',
        specs: 'Living Botanical Moss • Bouclé Banquettes',
      },
      supportingPhoto: {
        src: PHOTO_003,
        alt: 'Open-Air Sky Terrace & Work Garden',
        caption: 'Teak Workstations & Solarium Deck',
        figureLabel: 'FIG. 04 — SKY TERRACE',
      },
      layoutVariant: 'dominant-right',
      project: PROJECTS.find((p) => p.id === 'alcove-biophilic-lounge') || PROJECTS[3],
    },
  ];

  const handleOpenPhotoLightbox = (src: string, title: string, caption: string) => {
    setActiveLightbox({ src, title, caption });
  };

  return (
    <section
      id="projets"
      className="py-20 sm:py-28 lg:py-36 bg-[#F5F8F5] text-[#0F2A1A] relative border-t border-[#E1EDE3]"
    >
      <div id="spaces" className="absolute -top-20" />

      {/* Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,232,148,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1EDE3_1px,transparent_1px),linear-gradient(to_bottom,#E1EDE3_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-35 pointer-events-none" />

      <div className="relative z-10">
        {/* SECTION HEADER: EDITORIAL AESTHETIC */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#DCE9DF]">
            <div>
              <span className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-[0.25em] font-semibold block mb-3">
                SPATIAL PORTFOLIO // CLIFTON CAMPUS
              </span>
              <h2 className="font-cinzel font-light text-5xl sm:text-7xl lg:text-8xl text-[#0F2A1A] tracking-tight uppercase leading-[0.95]">
                SPACES
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#3E6548] max-w-2xl font-normal leading-relaxed">
                Curated work environments calibrated for solitary focus, team synergy, and effortless collaboration.
              </p>
            </div>

            {/* View Mode Switcher & Tools */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center p-1 bg-white border border-[#DCE8DE] shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('editorial')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'editorial'
                      ? 'bg-[#122E1C] text-white font-bold shadow-xs'
                      : 'text-[#4A7255] hover:text-[#0F2A1A]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Curated Gallery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('lookbook')}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'lookbook'
                      ? 'bg-[#122E1C] text-white font-bold shadow-xs'
                      : 'text-[#4A7255] hover:text-[#0F2A1A]'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Archive (25 Photos)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTINUOUS REFINED AMENITIES TICKER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="bg-white border border-[#DCE8DE] shadow-2xs overflow-hidden flex items-center">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#122E1C] text-white text-xs font-mono-custom font-bold uppercase tracking-wider shrink-0 border-r border-[#1E4D2B]">
              <Sparkles className="w-3.5 h-3.5 text-[#C4E894]" />
              <span>CAMPUS STANDARDS</span>
            </div>

            <div className="relative flex-1 overflow-hidden py-2.5">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee items-center gap-6 sm:gap-8 will-change-transform">
                {[...CAMPUS_AMENITIES, ...CAMPUS_AMENITIES].map((amenity, idx) => {
                  const IconComponent = amenity.icon;
                  return (
                    <div
                      key={`${amenity.id}-${idx}`}
                      className="flex items-center gap-2.5 text-xs font-mono-custom text-[#0F2A1A] shrink-0"
                    >
                      <div className="w-5 h-5 bg-[#EDF6EF] text-[#2E6F40] flex items-center justify-center shrink-0">
                        <IconComponent className="w-3 h-3" />
                      </div>
                      <span className="font-cinzel font-bold text-[#0F2A1A]">
                        {amenity.title}
                      </span>
                      <span className="text-[10px] text-[#558061] px-1.5 py-0.5 bg-[#F4F8F4] border border-[#E1ECE3]">
                        {amenity.specs}
                      </span>
                      <span className="text-[#98BEA1] ml-2 text-xs select-none">•</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* VIEW MODE 1: ASYMMETRIC EDITORIAL GALLERY (INDUSTRIOUS STYLE) */}
        {viewMode === 'editorial' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EditorialGallery
              onSelectProject={onSelectProject}
              onOpenLightbox={handleOpenPhotoLightbox}
            />
          </div>
        )}

        {/* VIEW MODE 2: COMPLETE 25-PHOTO ARCHITECTURAL LOOKBOOK */}
        {viewMode === 'lookbook' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#DCE9DF]">
              <p className="text-xs sm:text-sm font-mono-custom text-[#486E53] uppercase tracking-wider">
                Showing all {CAMPUS_LOOKBOOK_PHOTOS.length} authentic campus architectural photographs • Click to inspect
              </p>
              <button
                type="button"
                onClick={() =>
                  setActiveLightbox({
                    src: CAMPUS_LOOKBOOK_PHOTOS[0].src,
                    title: CAMPUS_LOOKBOOK_PHOTOS[0].title,
                    caption: CAMPUS_LOOKBOOK_PHOTOS[0].specs,
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCE8DE] hover:border-[#2E6F40] text-xs font-mono-custom text-[#1E522C] font-semibold transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open First Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAMPUS_LOOKBOOK_PHOTOS.map((photo, pIdx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (pIdx % 6) * 0.05 }}
                  onClick={() =>
                    setActiveLightbox({
                      src: photo.src,
                      title: photo.title,
                      caption: photo.specs,
                    })
                  }
                  className="group relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#0C1F13] border border-[#DCE8DE] hover:border-[#2E6F40] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#C4E894] text-[#0F2A1A] text-[10px] font-mono-custom font-bold uppercase tracking-wider shadow-sm">
                      {photo.category}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-cinzel text-sm sm:text-base font-bold leading-tight drop-shadow-sm group-hover:text-[#C4E894] transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-[10px] font-mono-custom text-[#D4F3AA] mt-0.5">
                      {photo.specs}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightbox !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightbox(null)}
              className="fixed inset-0 bg-[#0C1F13]/90 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#0A160E] rounded-3xl overflow-hidden border border-[#2E6F40]/40 shadow-2xl flex flex-col z-10 text-white"
            >
              {/* Lightbox Header Bar */}
              <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-custom text-[#C4E894] uppercase tracking-wider block">
                    ALCOVE ARCHITECTURAL PHOTOGRAPHY
                  </span>
                  <h3 className="font-cinzel font-bold text-base sm:text-lg text-white">
                    {activeLightbox.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Main Image Area */}
              <div className="relative flex-1 min-h-[350px] sm:min-h-[500px] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeLightbox.src}
                  alt={activeLightbox.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Lightbox Footer Info */}
              <div className="p-4 px-6 bg-[#0E2416] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-custom">
                <div className="text-[#C4E894]">
                  {activeLightbox.caption}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/60">Press Esc or click outside to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
