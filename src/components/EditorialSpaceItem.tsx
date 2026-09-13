import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { ProjectItem } from '../types';

export interface EditorialSpaceData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specifications: string[];
  dominantPhoto: {
    src: string;
    alt: string;
    caption: string;
    specs: string;
  };
  supportingPhoto?: {
    src: string;
    alt: string;
    caption: string;
    figureLabel: string;
  };
  layoutVariant: 'dominant-left' | 'dominant-right' | 'panoramic-left' | 'balanced-split';
  project: ProjectItem;
}

interface EditorialSpaceItemProps {
  space: EditorialSpaceData;
  index: number;
  onSelectProject: (project: ProjectItem) => void;
  onOpenPhotoLightbox: (photoSrc: string, title: string, caption: string) => void;
}

export const EditorialSpaceItem: React.FC<EditorialSpaceItemProps> = ({
  space,
  onSelectProject,
  onOpenPhotoLightbox,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking for the supporting image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle natural architectural parallax
  const parallaxY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  const isDominantRight = space.layoutVariant === 'dominant-right';
  const isPanoramic = space.layoutVariant === 'panoramic-left';

  return (
    <article
      ref={containerRef}
      id={`space-${space.id}`}
      className="relative py-16 sm:py-24 lg:py-32 border-b border-[#E3ECE5] last:border-b-0 scroll-mt-24"
    >
      {/* Background Architectural Watermark Index */}
      <div className="absolute right-4 sm:right-12 top-6 select-none pointer-events-none opacity-[0.035] font-cinzel font-black text-7xl sm:text-9xl text-[#0F2A1A]">
        {space.number}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Space Bar: Number & Category Meta */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-[#E6EFE8]">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#245C35]">
              {space.number}
            </span>
            <span className="text-[#98BEA1] select-none text-xs">—</span>
            <span className="font-mono-custom text-[11px] sm:text-xs text-[#52775E] uppercase tracking-widest">
              {space.subtitle}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono-custom text-[#5E836A]">
            <span>ALCOVE KARACHI</span>
            <span>•</span>
            <span>{space.project.location.split('•')[0].trim()}</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
            isDominantRight ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* DOMINANT LARGE PHOTOGRAPH COLUMN */}
          <div
            className={`${
              isPanoramic
                ? 'lg:col-span-7 xl:col-span-8'
                : isDominantRight
                ? 'lg:col-span-7 lg:order-2'
                : 'lg:col-span-7'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden bg-[#0C1F13] shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer border border-[#DCE8DE]"
              onClick={() =>
                onOpenPhotoLightbox(
                  space.dominantPhoto.src,
                  space.title,
                  space.dominantPhoto.caption
                )
              }
            >
              {/* Oversized Dominant Photograph */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden">
                <img
                  src={space.dominantPhoto.src}
                  alt={space.dominantPhoto.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Minimalist Dark Gradient Scrim on bottom for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Top Subtle Expand Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono-custom opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3 h-3 text-[#C4E894]" />
                  <span>Expand Photo</span>
                </div>

                {/* In-Image Minimal Caption & Specs */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono-custom uppercase tracking-wider text-[#C4E894] block mb-0.5">
                      {space.number} / ARCHITECTURAL VIEW
                    </span>
                    <p className="font-cinzel text-sm sm:text-base font-bold text-white drop-shadow-sm">
                      {space.dominantPhoto.caption}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono-custom text-white/80 self-start sm:self-end bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                    {space.dominantPhoto.specs}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* EDITORIAL TEXT & SUPPORTING IMAGE COLUMN */}
          <div
            className={`${
              isPanoramic
                ? 'lg:col-span-5 xl:col-span-4'
                : isDominantRight
                ? 'lg:col-span-5 lg:order-1'
                : 'lg:col-span-5'
            } flex flex-col justify-between`}
          >
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Space Name in Monumental Large Typography */}
              <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-light text-[#0F2A1A] tracking-[-0.015em] uppercase leading-[1.05]">
                {space.title}
              </h3>

              {/* Refined Short Description */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#3A5E44] font-normal leading-relaxed">
                {space.description}
              </p>

              {/* Spatial Specifications Micro-Tags */}
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                {space.specifications.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg bg-white border border-[#D8E6DA] text-[#245C35] text-xs font-mono-custom uppercase tracking-wider shadow-2xs"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Editorial CTA: EXPLORE SPACE */}
              <div className="mt-7 sm:mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onSelectProject(space.project)}
                  className="group/cta inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#122E1C] hover:bg-[#1C422A] text-white text-xs font-mono-custom uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-98"
                >
                  <span>Explore Space</span>
                  <div className="w-5 h-5 rounded-full bg-white/10 group-hover/cta:bg-[#C4E894] group-hover/cta:text-[#0F2A1A] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3 h-3 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                  </div>
                </button>

                <span className="text-xs font-mono-custom text-[#6B8E75]">
                  Full 3D Specs & Dossier
                </span>
              </div>
            </motion.div>

            {/* SMALLER SUPPORTING PHOTOGRAPH (ASYMMETRICAL PAIRING) */}
            {space.supportingPhoto && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: parallaxY }}
                className="mt-8 lg:mt-12 group relative rounded-xl overflow-hidden bg-[#0C1F13] border border-[#DCE8DE] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer max-w-sm"
                onClick={() =>
                  onOpenPhotoLightbox(
                    space.supportingPhoto!.src,
                    space.title,
                    space.supportingPhoto!.caption
                  )
                }
              >
                <div className="relative aspect-[4/3] sm:aspect-[3/2] w-full overflow-hidden">
                  <img
                    src={space.supportingPhoto.src}
                    alt={space.supportingPhoto.alt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Supporting Photo Figure Label */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono-custom">
                    <span className="text-[#C4E894] uppercase tracking-wider">
                      {space.supportingPhoto.figureLabel}
                    </span>
                    <span className="text-white/80 truncate ml-2 max-w-[180px]">
                      {space.supportingPhoto.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
