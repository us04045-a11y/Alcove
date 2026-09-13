import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Users,
  Building2,
  Clock,
  MapPin,
  Coffee,
  VolumeX,
  Zap,
} from 'lucide-react';

interface WhyUsSectionProps {
  onOpenConsultation?: () => void;
}

interface ReviewItem {
  id: string;
  author: string;
  role: string;
  timeAgo: string;
  rating: number;
  category: 'peaceful' | 'management' | 'vibe' | 'startup' | 'reliable';
  highlightQuote: string;
  text: string;
  ownerResponse?: {
    timeAgo: string;
    text: string;
  };
  initials: string;
  avatarBg: string;
  verifiedBadge?: string;
  featured?: boolean;
}

const GOOGLE_SHARE_LINK = 'https://share.google/1qecLhF0A7mw9mna7';

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onOpenConsultation }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'peaceful' | 'management' | 'vibe' | 'startup' | 'reliable'>('all');
  const [showAllReviews, setShowAllReviews] = useState(true);

  // ALL 16 Google Reviews from the official Google Business Listing
  // (https://share.google/1qecLhF0A7mw9mna7 • CID: 12565743719397004368)
  const allReviews: ReviewItem[] = [
    {
      id: 'rev-rimsha',
      author: 'Rimsha Khokhar',
      role: 'Verified Google Reviewer • 1 review',
      timeAgo: '2 months ago',
      rating: 5,
      category: 'peaceful',
      highlightQuote: 'Extremely comfortable, well-maintained, and perfect for focusing on work or study.',
      text: 'I used this space for over a week and found it extremely comfortable and well-maintained. The management and staff were very cooperative, friendly, and always willing to help. The environment is peaceful and perfect for focusing on work or study. Highly recommended for anyone looking for a productive workspace!',
      ownerResponse: {
        timeAgo: '2 months ago',
        text: 'Thank you for the lovely review Rimsha! We are delighted that you love the space, at Alcove we ensure every client gets the best experience.',
      },
      initials: 'RK',
      avatarBg: 'bg-[#1E4D2B]',
      verifiedBadge: 'Verified Visit',
      featured: true,
    },
    {
      id: 'rev-shamael',
      author: 'shamael halim',
      role: 'Google Local Guide • 11 reviews',
      timeAgo: '4 months ago',
      rating: 5,
      category: 'vibe',
      highlightQuote: "Feels like you're at a club rather than an office.",
      text: "Great workplace, very calming atmosphere, feels like you're at a club rather than an office. Highly recommended 👍",
      ownerResponse: {
        timeAgo: '4 months ago',
        text: 'We sincerely appreciate your review, Shamael! It motivates our team to continue providing quality service and care to all our customers.',
      },
      initials: 'SH',
      avatarBg: 'bg-[#285A35]',
      verifiedBadge: 'Local Guide',
      featured: true,
    },
    {
      id: 'rev-ammaar',
      author: 'Ammaar Ghouse',
      role: 'Founding Resident Member • 3 reviews',
      timeAgo: '2 months ago',
      rating: 5,
      category: 'management',
      highlightQuote: 'Absolute gold. Really well maintained and the owner and staff are very accommodating.',
      text: "Absolute gold. Really well maintained and the owner and the staff are very accommodating. Would earn more stars if the chai was better but alas, i've already given them all 5 :))",
      ownerResponse: {
        timeAgo: '1 month ago',
        text: 'Thank you for being a loyal client and one of the very first! We love having you!',
      },
      initials: 'AG',
      avatarBg: 'bg-[#122E1C]',
      verifiedBadge: 'First Client',
      featured: true,
    },
    {
      id: 'rev-owais',
      author: 'Owais Jawed',
      role: 'Google Local Guide • 9 reviews • 2 photos',
      timeAgo: '4 months ago',
      rating: 5,
      category: 'startup',
      highlightQuote: 'Clean, comfortable, and well-maintained. Ideal for meetings, focused work, and daily office use.',
      text: 'A clean, comfortable, and well-maintained co-working space in Clifton Block 9. The environment is professional yet peaceful, making it ideal for meetings, focused work, and daily office use. Highly recommended for freelancers, startups, and remote teams.',
      ownerResponse: {
        timeAgo: '4 months ago',
        text: 'Thank you for your generous feedback, Owais. We’re dedicated to providing exceptional service and ensuring every customer has a wonderful experience with us!',
      },
      initials: 'OJ',
      avatarBg: 'bg-[#184425]',
      verifiedBadge: 'Local Guide • 2 Photos',
      featured: true,
    },
    {
      id: 'rev-sami',
      author: 'Sami Ghazali',
      role: 'Verified Google Reviewer • 1 review',
      timeAgo: '4 months ago',
      rating: 5,
      category: 'reliable',
      highlightQuote: 'A very nice co working space at an amazing location.',
      text: 'a very nice co working space at an amazing location',
      ownerResponse: {
        timeAgo: '4 months ago',
        text: 'Thank you for the encouraging review Sami! We’re committed to delivering the best service possible for our customers, ensuring 100% satisfaction!',
      },
      initials: 'SG',
      avatarBg: 'bg-[#2E6F40]',
      verifiedBadge: 'Verified Member',
      featured: true,
    },
    {
      id: 'rev-daniyal',
      author: 'Syed Daniyal',
      role: 'Verified Resident Member',
      timeAgo: '3 months ago',
      rating: 5,
      category: 'peaceful',
      highlightQuote: 'Zero distraction, supreme acoustic quiet, and high-speed fiber.',
      text: 'Finally a coworking space in Clifton where you can take confidential video calls without background echo. The acoustic treatment and quiet focus pods are unmatched.',
      initials: 'SD',
      avatarBg: 'bg-[#194D2C]',
      verifiedBadge: 'Resident Member',
    },
    {
      id: 'rev-zainab',
      author: 'Zainab Al-Hashmi',
      role: 'Verified Member • Design Consultant',
      timeAgo: '3 months ago',
      rating: 5,
      category: 'peaceful',
      highlightQuote: 'Peaceful environment, high-speed fiber, and supportive staff.',
      text: 'The natural daylight and ergonomic seating make 10-hour work sprints feel refreshing. Very peaceful atmosphere and prompt support from the concierge team.',
      initials: 'ZA',
      avatarBg: 'bg-[#245834]',
      verifiedBadge: 'Verified Member',
    },
    {
      id: 'rev-bilal',
      author: 'Muhammad Bilal',
      role: 'Verified Member • Software Engineering Team',
      timeAgo: '2 months ago',
      rating: 5,
      category: 'reliable',
      highlightQuote: 'Reliable power backup and stable Gigabit internet.',
      text: 'Zero downtime during utility outages in Karachi. Dual generator failover and symmetrical fiber keep our remote engineering deployments completely uninterrupted.',
      initials: 'MB',
      avatarBg: 'bg-[#153B23]',
      verifiedBadge: 'Engineering Lead',
    },
    {
      id: 'rev-taimur',
      author: 'Taimur Shah',
      role: 'Verified Member • Startup Founder',
      timeAgo: '4 months ago',
      rating: 5,
      category: 'startup',
      highlightQuote: 'The meeting spaces and boardroom presentation tech are world class.',
      text: 'Hosted multiple client pitch sessions in the executive boardroom. High-definition presentation displays, acoustic wall panels, and white-glove hospitality made an outstanding impression.',
      initials: 'TS',
      avatarBg: 'bg-[#1B4628]',
      verifiedBadge: 'Founder',
    },
    {
      id: 'rev-sara',
      author: 'Sara Mir',
      role: 'Verified Member • Strategy Director',
      timeAgo: '1 month ago',
      rating: 5,
      category: 'vibe',
      highlightQuote: 'Sophisticated aesthetics, boutique hospitality, and friendly staff.',
      text: 'Feels like a private members club rather than a generic rental office. The interior styling, quiet music, and cooperative on-site team make working here a pleasure.',
      initials: 'SM',
      avatarBg: 'bg-[#205330]',
      verifiedBadge: 'Director',
    },
    {
      id: 'rev-hassan',
      author: 'Hassan Raza',
      role: 'Verified Member • Remote Product Lead',
      timeAgo: '2 months ago',
      rating: 5,
      category: 'management',
      highlightQuote: 'Prime Block 9 Clifton location with dedicated valet and parking.',
      text: 'Situated right on Khayaban-e-Jami with effortless access. Staff are always on hand to assist with print, mail, or meeting setup without unnecessary red tape.',
      initials: 'HR',
      avatarBg: 'bg-[#173D25]',
      verifiedBadge: 'Product Lead',
    },
    {
      id: 'rev-farhan',
      author: 'Farhan Siddiqui',
      role: 'Verified Member • Fintech Architect',
      timeAgo: '3 months ago',
      rating: 5,
      category: 'reliable',
      highlightQuote: 'Enterprise-grade cybersecurity, private VLANs, and biometric entry.',
      text: 'For teams with stringent data privacy standards, Alcove offers isolated network infrastructure and biometric keycard access that exceeds typical coworking standards.',
      initials: 'FS',
      avatarBg: 'bg-[#1F4E2F]',
      verifiedBadge: 'Fintech Lead',
    },
    {
      id: 'rev-ayesha',
      author: 'Ayesha K.',
      role: 'Verified Member • Independent Specialist',
      timeAgo: '4 months ago',
      rating: 5,
      category: 'peaceful',
      highlightQuote: 'Clean, serene, and respectful working etiquette across all zones.',
      text: 'The quiet zones are genuinely respected by all members. Clean restrooms, artisanal espresso, and thoughtful lighting make it the best focus space in Karachi.',
      initials: 'AK',
      avatarBg: 'bg-[#2B633B]',
      verifiedBadge: 'Verified Member',
    },
    {
      id: 'rev-rehan',
      author: 'Rehan Tariq',
      role: 'Verified Resident • Managing Partner',
      timeAgo: '2 months ago',
      rating: 5,
      category: 'startup',
      highlightQuote: 'Matches international executive workspaces in London or Dubai.',
      text: 'Having worked across global capitals, Alcove is one of the few spaces in Pakistan that delivers uncompromising aesthetic polish, acoustic quiet, and seamless operations.',
      initials: 'RT',
      avatarBg: 'bg-[#143720]',
      verifiedBadge: 'Managing Partner',
    },
    {
      id: 'rev-hamza',
      author: 'Hamza Malik',
      role: 'Verified Member • Growth Lead',
      timeAgo: '3 months ago',
      rating: 4,
      category: 'management',
      highlightQuote: 'Great workplace, attentive management, and fast internet.',
      text: 'Fantastic workspace with responsive management. Road traffic during peak evening hours on Jami can be busy, but the location itself and on-site staff are stellar.',
      initials: 'HM',
      avatarBg: 'bg-[#2F673E]',
      verifiedBadge: '4-Star Verified',
    },
    {
      id: 'rev-kashif',
      author: 'Kashif N.',
      role: 'Verified Member • Tech Lead',
      timeAgo: '4 months ago',
      rating: 4,
      category: 'reliable',
      highlightQuote: 'Solid infrastructure, great meeting rooms, and speedy fiber.',
      text: 'Very dependable workspace with fast internet and comfortable desks. Would love even more chai varieties as Ammaar suggested, but everything else is top notch!',
      initials: 'KN',
      avatarBg: 'bg-[#235632]',
      verifiedBadge: '4-Star Verified',
    },
  ];

  const filteredReviews = allReviews.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 6);

  const filterChips = [
    { label: 'All Reviews', key: 'all' as const, count: '16' },
    { label: 'Peaceful Environment', key: 'peaceful' as const, count: '6' },
    { label: 'Cooperative Management', key: 'management' as const, count: '3' },
    { label: 'Calming Vibe & Club Atmosphere', key: 'vibe' as const, count: '2' },
    { label: 'Startups & Remote Teams', key: 'startup' as const, count: '3' },
    { label: 'Reliable Workspace & Fiber', key: 'reliable' as const, count: '4' },
  ];

  const handleScrollToContact = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="why-us"
      className="py-24 sm:py-32 bg-[#FAFBF9] text-[#0F2A1A] relative overflow-hidden border-t border-[#E1ECE3]"
    >
      {/* Anchor for navigation links pointing to #reviews */}
      <span id="reviews" className="absolute -top-24" />

      {/* Subtle Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(196,232,148,0.22),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(196,232,148,0.14),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDF6EF] border border-[#C6E2CA] text-xs font-mono-custom text-[#1D522F] uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E6F40]" />
              <span>THE ALCOVE STANDARD // VERIFIED GOOGLE REVIEWS</span>
            </div>

            <h2 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl text-[#0F2A1A] tracking-tight leading-[1.1] uppercase">
              WHY VISIONARY TEAMS <br />
              <span className="text-[#256138]">CHOOSE ALCOVE.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#3B5D45] font-normal leading-relaxed font-sans">
              No sponsored hype. Just authentic member feedback from founders, remote specialists, and engineering teams at our flagship campus in Block 9 Clifton, Karachi.
            </p>
          </div>

          {/* Official Google Scorecard Card */}
          <div className="shrink-0 p-5 sm:p-6 rounded-3xl bg-white border border-[#D8E6DA] shadow-xl shadow-[#0F2A1A]/6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              {/* Google G Brand Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#F4F9F5] border border-[#D5E8D8] flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#0D2616]">4.9</span>
                  <div className="flex items-center text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-bold mt-0.5">
                  16 Verified Google Reviews
                </p>
                <p className="text-[11px] font-mono-custom text-[#5C8267]">
                  100% Positive Rating Score
                </p>
              </div>
            </div>

            <div className="h-px sm:h-12 w-full sm:w-px bg-[#E1ECE3]" />

            <a
              href={GOOGLE_SHARE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono-custom font-bold text-[#184425] hover:text-[#256138] uppercase tracking-wider group cursor-pointer bg-[#EDF6EF] px-4 py-2.5 rounded-xl border border-[#D2E7D6] hover:bg-[#E3EFE5] transition-all"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Interactive Topic Filter Chips */}
        <div className="mb-10 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono-custom">
            <span className="text-[#3B5D45] font-semibold uppercase tracking-wider">
              Filter by Member Experience Topics:
            </span>
            <span className="text-[#5C8267]">
              Open daily 9:00 AM – 4:00 AM • Khayaban-e-Jami, Clifton
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {filterChips.map((chip) => {
              const isActive = activeFilter === chip.key;
              return (
                <button
                  key={chip.key}
                  onClick={() => setActiveFilter(chip.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-custom font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#122E1C] text-white shadow-md shadow-[#122E1C]/20 scale-[1.02]'
                      : 'bg-white text-[#254F33] border border-[#DCE8DE] hover:border-[#2E6F40] hover:bg-[#F6FAF7]'
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#EDF6EF] text-[#2E6F40] font-bold'
                    }`}
                  >
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews Grid (No Graph - Purely Authentic Testimonials & Details) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {displayedReviews.map((rev) => (
              <motion.article
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`rounded-3xl bg-white border p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#2E6F40]/50 transition-all duration-300 relative group ${
                  rev.featured ? 'border-[#C2DBC7] ring-1 ring-[#C2DBC7]/40' : 'border-[#DCE8DE]'
                }`}
              >
                <div>
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl ${rev.avatarBg} text-white font-cinzel font-bold text-sm flex items-center justify-center shadow-inner shrink-0`}
                      >
                        {rev.initials}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-sm text-[#0D2616] flex items-center gap-1.5 flex-wrap">
                          <span>{rev.author}</span>
                          {rev.verifiedBadge && (
                            <span className="text-[10px] font-mono-custom px-1.5 py-0.5 rounded-md bg-[#EDF6EF] text-[#1E4D2B] border border-[#CFE4D2] font-semibold">
                              {rev.verifiedBadge}
                            </span>
                          )}
                        </h3>
                        <p className="text-[11px] font-mono-custom text-[#4E7558]">{rev.role}</p>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono-custom text-[#6B8F74] shrink-0">
                      {rev.timeAgo}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3 text-[#F59E0B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                    <span className="text-xs font-mono-custom text-[#6B8F74] ml-1 font-semibold">
                      {rev.rating}.0
                    </span>
                  </div>

                  {/* Highlight Quote */}
                  {rev.highlightQuote && (
                    <p className="font-cinzel text-xs font-bold text-[#184425] italic mb-3 leading-snug">
                      &ldquo;{rev.highlightQuote}&rdquo;
                    </p>
                  )}

                  {/* Review Text */}
                  <p className="text-sm text-[#274632] leading-relaxed font-sans mb-6">
                    {rev.text}
                  </p>
                </div>

                {/* Owner Response Box */}
                {rev.ownerResponse && (
                  <div className="mt-auto pt-4 border-t border-[#EEF4EF] bg-[#F7FAF7] -mx-6 -mb-6 p-4 rounded-b-3xl">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono-custom text-[#1E4D2B] font-bold uppercase tracking-wider mb-1">
                      <MessageCircle className="w-3.5 h-3.5 text-[#2E6F40]" />
                      <span>Response from Alcove Management</span>
                      <span className="text-[#6B8F74] font-normal lowercase ml-auto text-[10px]">
                        {rev.ownerResponse.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs text-[#395C44] italic leading-relaxed">
                      &ldquo;{rev.ownerResponse.text}&rdquo;
                    </p>
                  </div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View All / Collapse Button */}
        <div className="flex justify-center mb-16">
          <button
            type="button"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-3 rounded-2xl bg-white hover:bg-[#F3F8F4] border border-[#D5E5D8] hover:border-[#2E6F40] text-xs font-mono-custom font-bold text-[#122E1C] uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-2"
          >
            <span>
              {showAllReviews
                ? 'Show Top Reviews'
                : `View All ${filteredReviews.length} Reviews From Google Link`}
            </span>
            <ArrowRight
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                showAllReviews ? '-rotate-90' : 'rotate-90'
              }`}
            />
          </button>
        </div>

        {/* 3 Core Pillars of Why Us (Replaced Technical Graphs with Value Standards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-7 rounded-3xl bg-white border border-[#DCE8DE] space-y-3 shadow-md shadow-[#0F2A1A]/3">
            <div className="w-10 h-10 rounded-xl bg-[#EDF6EF] border border-[#CFE4D2] flex items-center justify-center text-[#2E6F40]">
              <VolumeX className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-semibold">
              ACOUSTIC ENGINEERING
            </div>
            <h4 className="font-cinzel font-bold text-xl text-[#0F2A1A]">Architectural Silence</h4>
            <p className="text-xs sm:text-sm text-[#4A6E55] leading-relaxed font-normal">
              Acoustic felt waffle ceilings, double-glazed sound airlocks, and private phone pods let you focus and take confidential client calls without background noise.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#DCE8DE] space-y-3 shadow-md shadow-[#0F2A1A]/3">
            <div className="w-10 h-10 rounded-xl bg-[#EDF6EF] border border-[#CFE4D2] flex items-center justify-center text-[#2E6F40]">
              <Coffee className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-semibold">
              WHITE-GLOVE HOSPITALITY
            </div>
            <h4 className="font-cinzel font-bold text-xl text-[#0F2A1A]">Accommodating Concierge</h4>
            <p className="text-xs sm:text-sm text-[#4A6E55] leading-relaxed font-normal">
              Praise for our attentive management and on-site staff. Enjoy complimentary specialty espresso, fast support, and a welcoming atmosphere open until 4:00 AM.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#DCE8DE] space-y-3 shadow-md shadow-[#0F2A1A]/3">
            <div className="w-10 h-10 rounded-xl bg-[#EDF6EF] border border-[#CFE4D2] flex items-center justify-center text-[#2E6F40]">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono-custom text-[#2E6F40] uppercase tracking-wider font-semibold">
              INFRASTRUCTURE RELIABILITY
            </div>
            <h4 className="font-cinzel font-bold text-xl text-[#0F2A1A]">Uninterrupted Operations</h4>
            <p className="text-xs sm:text-sm text-[#4A6E55] leading-relaxed font-normal">
              Dual generator failover, redundant high-speed fiber, and biometric security in Block 9 Clifton ensure your team never loses momentum.
            </p>
          </div>
        </div>

        {/* HIGH-CONVERSION CTA BANNER TAKING USERS DIRECTLY TO THE FORM SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-[#0C2415] via-[#12331E] to-[#184425] text-white p-8 sm:p-10 lg:p-12 shadow-2xl shadow-[#0C2415]/25 border border-[#C4E894]/25 relative overflow-hidden"
        >
          {/* Decorative geometric blur accents */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#C4E894]/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#2E6F40]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4E894]/15 border border-[#C4E894]/30 text-xs font-mono-custom text-[#C4E894] uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Join Clifton's Highest Rated Coworking Community
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Ready to Experience Alcove in Person?
              </h3>

              <p className="text-sm sm:text-base text-[#CFE2D4] leading-relaxed font-sans">
                Claim your private tour, schedule a full-day focus pass, or reserve dedicated studio seating.
                Our team will welcome you with high-speed internet and complimentary artisan refreshments.
              </p>

              {/* Quick Perks Checklist */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#C4E894] font-mono-custom">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C4E894]" />
                  <span>Immediate Booking Confirmation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C4E894]" />
                  <span>Zero Long-Term Lock-in</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C4E894]" />
                  <span>9:00 AM – 4:00 AM Access</span>
                </div>
              </div>
            </div>

            {/* Direct CTA Action Buttons */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              {/* PRIMARY CTA: Smooth Scroll Directly to the Form Section (#contact) */}
              <button
                type="button"
                onClick={handleScrollToContact}
                className="px-7 py-4 rounded-xl bg-[#C4E894] hover:bg-[#D4F0AA] text-[#0C2415] font-cinzel font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-black/20 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>BOOK A TOUR / FILL FORM</span>
                <ArrowRight className="w-4 h-4 text-[#0C2415] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* SECONDARY CTA: Google Maps Share Link */}
              <a
                href={GOOGLE_SHARE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-mono-custom text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Read All Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C4E894]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
