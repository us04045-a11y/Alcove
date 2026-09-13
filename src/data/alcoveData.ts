import { ProjectItem, MaterialSpec, SpatialPillar, MembershipPlan } from '../types';

// Authentic photographs downloaded directly from the official Proton Drive archive
export const PHOTO_003 = '/images/003.jpg';   // Open-Air Sky Terrace & Work Garden
export const PHOTO_017 = '/images/017.jpg';   // Fluted Reception Atrium
export const PHOTO_021 = '/images/021.jpg';   // Reception & Curved Portals
export const PHOTO_022 = '/images/022.jpg';   // Concierge Threshold & Warm Timber
export const PHOTO_029 = '/images/029.jpg';   // Member Lounge Seating Corner
export const PHOTO_030 = '/images/030.jpg';   // Architectural Details & Framing
export const PHOTO_033 = '/images/033.jpg';   // The Monolith Central Coworking Atrium
export const PHOTO_036 = '/images/036.jpg';   // Ergonomic Workstations & Phone Pods
export const PHOTO_039 = '/images/039.jpg';   // Shared Desks & Acoustic Canopies
export const PHOTO_040 = '/images/040.jpg';   // Deep Work Hot Desks
export const PHOTO_051 = '/images/051.jpg';   // Focus Atelier Acoustic Micro-Pods
export const PHOTO_073 = '/images/073.jpg';   // Timber Acoustic Pod Interior
export const PHOTO_076 = '/images/076.jpg';   // Acoustic Focus Atelier & Task Lighting
export const PHOTO_077 = '/images/077.jpg';   // Deep Work Sanctum & Oak Finishes
export const PHOTO_082 = '/images/082.jpg';   // Obsidian Boardroom Telepresence Suite
export const PHOTO_085 = '/images/085.jpg';   // Executive Boardroom Conference Table
export const PHOTO_086 = '/images/086.jpg';   // Presentation Suite & Privacy Glass
export const PHOTO_098 = '/images/098.jpg';   // Boardroom Acoustic Chamber
export const PHOTO_0103 = '/images/0103.jpg'; // Biophilic Member Lounge & Botanical Wall
export const PHOTO_0111 = '/images/0111.jpg'; // Aethel Biophilic Lounge & Coffee Bar
export const PHOTO_0113 = '/images/0113.jpg'; // Artisan Bar & Bouclé Banquettes
export const PHOTO_0120 = '/images/0120.jpg'; // Glasshouse Team Studio Wing
export const PHOTO_0121 = '/images/0121.jpg'; // Team Atrium & Sit-Stand Pods
export const PHOTO_0122 = '/images/0122.jpg'; // Private Dedicated Team Suite
export const PHOTO_0123 = '/images/0123.jpg'; // Team Pavilion Acoustic Partition

// Legacy aliases for backwards compatibility
export const IMAGE_003 = PHOTO_003;
export const IMAGE_033 = PHOTO_033;
export const IMAGE_076 = PHOTO_076;
export const IMAGE_0111 = PHOTO_0111;

export const HERO_IMAGE = PHOTO_033;
export const BOARDROOM_IMAGE = PHOTO_082;
export const LOUNGE_IMAGE = PHOTO_0111;
export const FOCUS_IMAGE = PHOTO_076;
export const STUDIO_IMAGE = PHOTO_0121;
export const TERRACE_IMAGE = PHOTO_003;
export const RECEPTION_IMAGE = PHOTO_017;

export const PROJECTS: ProjectItem[] = [
  {
    id: 'alcove-outdoor-patio',
    title: 'Outdoor Patio Lounge',
    subtitle: 'Open-Air Courtyard with Wooden Benches & Metal Tables',
    client: 'Alcove Members Sky Deck',
    category: 'Outdoor Terrace',
    year: '2025 — 2026',
    location: 'Rooftop Level • Plot # G, 25 Khayaban-e-Jami, Clifton',
    area: '1,150 m²',
    acousticRating: 'Fresh Air Acoustic Ambience',
    heroImage: PHOTO_003,
    galleryImages: [PHOTO_003, PHOTO_030, PHOTO_0113, PHOTO_036],
    description:
      'Open-air courtyard with wooden benches, black metal tables, green plants, and a metal staircase under an open sky.',
    architecturalConcept:
      'Harmonizing open-air cognitive rejuvenation with weather-resistant outdoor productivity and alfresco collaborative energy.',
    materials: [
      {
        name: 'Weather-Treated Natural Teak & White Oak',
        finish: 'Matte Exterior UV-Resistant Seal',
        description: 'Solid timber bench seating and low collaborative work tables designed for outdoor ergonomics.',
      },
      {
        name: 'Living Planter Boxes & Climbing Greenery',
        finish: 'Self-Irrigating Biophilic System',
        description: 'Air-filtering lush greenery providing natural wind-buffering, acoustic softening, and biophilic comfort.',
      },
    ],
    specifications: [
      { label: 'Setting', value: 'Open-Air Sky Terrace & Alfresco Deck' },
      { label: 'Connectivity', value: 'High-Speed Weatherproof Outdoor Wi-Fi 6' },
      { label: 'Seating', value: 'Wooden Benches & Black Metal Tables' },
      { label: 'Capacity', value: '45 Open-Air Workstations & Event Capacity 120' },
    ],
    awards: ['Urban Landscape Design Award 2025', 'Biophilic Rooftop of the Year'],
  },
  {
    id: 'alcove-workstation-bay',
    title: 'Open Plan Office Workstation Bay',
    subtitle: 'Shared Office Setup with Privacy Screens & Overhead LED Lights',
    client: 'Alcove Shared Workspaces',
    category: 'Hot Desk Alcove',
    year: '2025',
    location: 'Plot # G, 25 Khayaban-e-Jami • Clifton, Karachi',
    area: '1,200 m²',
    acousticRating: 'NRC 0.86 Sound Seclusion',
    heroImage: PHOTO_017,
    galleryImages: [PHOTO_017, PHOTO_021, PHOTO_022, PHOTO_030],
    description:
      'Shared office setup with white desks, dark privacy screens, ergonomic mesh chairs, and overhead LED lights.',
    architecturalConcept:
      'Choreographing a high-focus open plan environment with visual privacy and glare-free task lighting.',
    materials: [
      {
        name: 'High-Pressure Matte White Laminate',
        finish: 'Anti-Glare Smooth Touch',
        description: 'Durable workstation work surfaces with integrated wire troughs.',
      },
      {
        name: 'Charcoal Acoustic Privacy Screens',
        finish: 'Tackable Recycled Felt',
        description: 'Sound-dampening desk dividers ensuring individual visual and acoustic comfort.',
      },
    ],
    specifications: [
      { label: 'Desking', value: 'White Desks with Integrated Wire Management' },
      { label: 'Seating', value: 'Ergonomic Mesh Rolling Chairs' },
      { label: 'Acoustics', value: 'Dark Felt Privacy Divider Screens' },
      { label: 'Lighting', value: 'Continuous Overhead LED Light Fixtures' },
    ],
    awards: ['Architectural Digest Workspace Selection 2025'],
  },
  {
    id: 'alcove-monolith-cowork',
    title: 'Spacious Shared Office Layout',
    subtitle: 'Rows of Workstations with Wooden Drawers & Natural Light',
    client: 'Alcove Flagship Campus',
    category: 'Hot Desk Alcove',
    year: '2025 — 2026',
    location: 'Khayaban-e-Jami • Block 9 Clifton, Karachi',
    area: '3,800 m²',
    acousticRating: 'NRC 0.88 Sound Seclusion',
    heroImage: PHOTO_033,
    galleryImages: [PHOTO_033, PHOTO_036, PHOTO_039, PHOTO_040],
    description:
      'Wide office space featuring rows of workstations with wooden drawers, ergonomic chairs, carpet flooring, and natural light.',
    architecturalConcept:
      'Balancing high-density shared productivity with acoustic seclusion, carpeted quiet zones, and expansive daylight.',
    materials: [
      {
        name: 'Natural Finish Solid & Veneer Wood',
        finish: 'Warm Satin Seal',
        description: 'Dedicated lockable under-desk drawer pedestals.',
      },
      {
        name: 'Acoustic Tufted Carpet Flooring',
        finish: 'Heavy-Traffic Sound Absorbent',
        description: 'Reduces footsteps, ambient murmur, and reverberation across expansive floorplates.',
      },
    ],
    specifications: [
      { label: 'Layout', value: 'Wide Linear Workstation Rows' },
      { label: 'Storage', value: 'Individual Lockable Wooden Drawers' },
      { label: 'Flooring', value: 'Acoustic Sound-Dampening Carpet' },
      { label: 'Natural Light', value: 'Expansive Perimeter Glazing & Skylights' },
    ],
    awards: ['Awwwards Site of the Day (SOTD)', 'Frame Awards Winner'],
  },
  {
    id: 'alcove-row-workstations',
    title: 'Row Workstations with Storage',
    subtitle: 'Dedicated Wall Desks with Privacy Dividers & Side Drawers',
    client: 'Alcove Focus Suites',
    category: 'Hot Desk Alcove',
    year: '2025',
    location: 'Khayaban-e-Jami, Block 9 Clifton • Karachi',
    area: '1,450 m²',
    acousticRating: 'NRC 0.87 Focused Work',
    heroImage: PHOTO_036,
    galleryImages: [PHOTO_036, PHOTO_033, PHOTO_039, PHOTO_040],
    description:
      'Line of dedicated wall desks equipped with privacy dividers, lockable side drawers, and ergonomic rolling chairs.',
    architecturalConcept:
      'Linear focused workspace alignment offering individual territorial ownership with maximum storage utility.',
    materials: [
      {
        name: 'Engineered Oak Pedestal & Top',
        finish: 'Durable Matte Seal',
        description: 'Spacious desk top with flush cable grommets and 3-tier lockable drawers.',
      },
      {
        name: 'Dense Acoustic Fabric Partition',
        finish: 'Heather Charcoal Texture',
        description: 'Mid-height privacy divider providing acoustic separation between adjacent desks.',
      },
    ],
    specifications: [
      { label: 'Desk Configuration', value: 'Dedicated Perimeter Wall Desks' },
      { label: 'Storage', value: 'Lockable Side Drawer Mobile Pedestals' },
      { label: 'Dividers', value: 'Sound-Dampening Fabric Privacy Partitions' },
      { label: 'Ergonomics', value: 'Full-Adjustment Rolling Mesh Chairs' },
    ],
    awards: ['Workspace Design Prize Nominee'],
  },
  {
    id: 'alcove-team-pavilion',
    title: 'Private Team Room Workspaces',
    subtitle: 'Multi-Desk Team Room with Green Accent Wall & Storage Cabinets',
    client: 'Alcove Enterprise Suites',
    category: 'Dedicated Studio',
    year: '2025',
    location: 'Khayaban-e-Jami, Block 9 Clifton • Karachi',
    area: '1,600 m²',
    acousticRating: 'STC 50+ Private Partition',
    heroImage: PHOTO_076,
    galleryImages: [PHOTO_076, PHOTO_077, PHOTO_073, PHOTO_051],
    description:
      'Multi-desk team room featuring a green accent wall, split ACs, carpeted floors, and individual storage cabinets.',
    architecturalConcept:
      'Enclosed team sanctum engineered for autonomous collaboration, personalized climate control, and confidential work.',
    materials: [
      {
        name: 'Sage Botanical Acoustic Accent Wall',
        finish: 'Micro-Perforated Timber Finish',
        description: 'Vibrant calming green feature wall providing acoustic dampening and biophilic warmth.',
      },
      {
        name: 'Individual Lockable Storage Cabinets',
        finish: 'White Matte Laminate',
        description: 'Tall secure storage units allocated to each team workstation.',
      },
    ],
    specifications: [
      { label: 'Capacity', value: '4 to 12 Dedicated Team Desks' },
      { label: 'Climate Control', value: 'Dedicated In-Room Split AC Units' },
      { label: 'Flooring', value: 'High-Density Carpeted Floors' },
      { label: 'Storage', value: 'Individual Lockable Cabinets & Pedestals' },
    ],
    awards: ['Dezeen Workplace Interior Selection'],
  },
  {
    id: 'alcove-collaborative-pods',
    title: 'Collaborative Office Pods',
    subtitle: 'Four-Person Desk Pods with Dark Privacy Partitions',
    client: 'Alcove Agile Squads',
    category: 'Dedicated Studio',
    year: '2025',
    location: 'Plot # G, 25 Khayaban-e-Jami • Clifton, Karachi',
    area: '1,100 m²',
    acousticRating: 'NRC 0.89 Sound Diffusion',
    heroImage: PHOTO_077,
    galleryImages: [PHOTO_077, PHOTO_076, PHOTO_082, PHOTO_086],
    description:
      'Four-person desk pods with dark privacy partitions, black metal legs, lockable drawers, and mesh chairs.',
    architecturalConcept:
      'Modular quadruple desk clusters configured to balance intimate team synergy with focused task boundaries.',
    materials: [
      {
        name: 'Powder-Coated Steel Frame',
        finish: 'Matte Black Industrial Finish',
        description: 'Rigid architectural steel legs engineered for wobble-free stability.',
      },
      {
        name: 'Dark Grey Sound-Absorptive Partitions',
        finish: 'Dense Acoustic Felt Core',
        description: 'Cruciform divider array dampening conversational spillover.',
      },
    ],
    specifications: [
      { label: 'Formation', value: '4-Person Collaborative Desk Pods' },
      { label: 'Framing', value: 'Industrial Black Metal Legs & Understructure' },
      { label: 'Dividers', value: 'Dark Textured Acoustic Privacy Partitions' },
      { label: 'Seating', value: 'Breathable Mesh Ergonomic Swivel Chairs' },
    ],
    awards: ['Frame Awards Workspace Cluster of the Year'],
  },
  {
    id: 'alcove-private-executive',
    title: 'Private Executive / Manager Office',
    subtitle: 'Private Office with Dark-Wood Desk, Dual Monitors & Guest Chairs',
    client: 'Alcove Leadership Suites',
    category: 'Executive Suite',
    year: '2025',
    location: 'Plot # G, 25 Khayaban-e-Jami • Clifton, Karachi',
    area: '920 m²',
    acousticRating: 'STC 54 Speech Privacy',
    heroImage: PHOTO_0103,
    galleryImages: [PHOTO_0103, PHOTO_076, PHOTO_077, PHOTO_073],
    description:
      'Private office featuring a dark-wood desk, dual monitors, executive seating, and two client guest chairs.',
    architecturalConcept:
      'A refined managerial retreat combining powerful executive workstations with an intimate consultation setting.',
    materials: [
      {
        name: 'Smoked Walnut Executive Desk',
        finish: 'Hand-Polished Satin Wax',
        description: 'Expansive dark-wood desk with concealed cable management and leather pad inlay.',
      },
      {
        name: 'Italian Leather Executive & Guest Seating',
        finish: 'Cognac Saddle Leather',
        description: 'High-back ergonomic executive armchair paired with two comfortable visitor armchairs.',
      },
    ],
    specifications: [
      { label: 'Desk Setup', value: 'Dark-Wood Executive Desk with Dual 4K Monitors' },
      { label: 'Seating', value: 'Executive Chair & Two Dedicated Client Guest Chairs' },
      { label: 'Privacy', value: 'Acoustic Sound-Sealed Enclosure & Door' },
      { label: 'Storage', value: 'Matching Dark-Wood Credenza & Bookcase' },
    ],
    awards: ['Red Dot Best of the Best 2025'],
  },
  {
    id: 'alcove-biophilic-lounge',
    title: 'Breakroom & Lounge Area',
    subtitle: 'Cafeteria Area with High Bar Counter, Dining Seating & Massage Chair',
    client: 'Alcove Community Network',
    category: 'Acoustic Lounge',
    year: '2025',
    location: 'Block 9 Clifton • Karachi 75500',
    area: '1,400 m²',
    acousticRating: 'NRC 0.85 Social Comfort',
    heroImage: PHOTO_0111,
    galleryImages: [PHOTO_0111, PHOTO_003, PHOTO_0113, PHOTO_029],
    description:
      'Cafeteria area with a high bar counter and white barstools, colorful dining seating, and a full-body massage chair.',
    architecturalConcept:
      'A multi-sensory social respite combining informal nourishment, community dining, and physical wellness recovery.',
    materials: [
      {
        name: 'High Bar Countertop & Bistro Tables',
        finish: 'Seamless Solid Surface & White Stools',
        description: 'Elevated communal breakfast bar with ergonomic white high barstools.',
      },
      {
        name: 'Full-Body Zero-Gravity Massage Chair',
        finish: 'Premium Perforated Black Leather',
        description: 'Robotic therapeutic recovery station for spinal decompression and deep relaxation.',
      },
    ],
    specifications: [
      { label: 'Bar & Dining', value: 'High Bar Counter with White Barstools' },
      { label: 'Cafeteria', value: 'Colorful Dining Tables & Mixed Seating' },
      { label: 'Wellness', value: 'Dedicated Full-Body Reclining Massage Chair' },
      { label: 'Refreshment', value: 'Espresso Machines, Cold Brew Tap & Microwaves' },
    ],
    awards: ['Frame Awards Workspace Lounge of the Year', 'WELL Certified Platinum'],
  },
  {
    id: 'alcove-reception-atrium',
    title: 'Reception Accent Wall & Branding Signage',
    subtitle: 'Dark Gray Textured Grid Wall & Raised White 3D Alcove Logo',
    client: 'Alcove Flagship Campus',
    category: 'Event Atrium',
    year: '2025',
    location: 'Plot # G, 25 Khayaban-e-Jami • Karachi',
    area: '1,200 m²',
    acousticRating: 'NRC 0.90 Sound Absorption',
    heroImage: PHOTO_0123,
    galleryImages: [PHOTO_0123, PHOTO_017, PHOTO_021, PHOTO_022],
    description:
      'Dark gray textured grid reception wall displaying raised white "Alcove" 3D lettering and geometric logo.',
    architecturalConcept:
      'Establishing a bold, tactile brand statement upon arrival with volumetric typography and modular grid texture.',
    materials: [
      {
        name: 'Textured Charcoal Acoustic Grid Modules',
        finish: 'Matte Architectural Bas-Relief',
        description: 'Modular textured wall panels forming a dramatic sculptural backdrop.',
      },
      {
        name: 'Precision-Milled 3D White Acrylic Letters',
        finish: 'Satin White with Halo Illumination',
        description: 'Dimensional Alcove emblem and wordmark raised off the grid paneling.',
      },
    ],
    specifications: [
      { label: 'Feature Wall', value: 'Dark Gray Textured Modular Grid Panel Wall' },
      { label: 'Signage', value: 'Raised White 3D "Alcove" Lettering & Logo' },
      { label: 'Lighting', value: 'Precision Directional LED Surface Grazers' },
      { label: 'Location', value: 'Central Campus Arrival & Concierge Threshold' },
    ],
    awards: ['Architectural Digest Workspace Award 2025'],
  },
  {
    id: 'alcove-executive-boardroom',
    title: 'The Obsidian Boardroom Suite',
    subtitle: 'High-Stakes Presentation & Hybrid Telepresence Suite',
    client: 'Alcove Private Enterprise',
    category: 'Executive Suite',
    year: '2025',
    location: 'Plot # G, 25 Khayaban-e-Jami • Clifton, Karachi',
    area: '850 m²',
    acousticRating: 'STC 54 Speech Privacy',
    heroImage: PHOTO_082,
    galleryImages: [PHOTO_082, PHOTO_085, PHOTO_086, PHOTO_098],
    description:
      '4K AI beamforming telepresence arrays, black travertine conference monoliths, and switchable smart electrochromic glass.',
    architecturalConcept:
      'Zero-reverberation acoustic chamber design disguised within warm, luxurious minimalism.',
    materials: [
      {
        name: 'Smoked Black Travertine',
        finish: 'Honed Leather Finish',
        description: 'Natural stone conference monolith with integrated pop-up power nodes.',
      },
      {
        name: 'Micro-Perforated Charcoal Oak',
        finish: 'Acoustic Absorption Finish',
        description: 'Calibrated for vocal clarity and zero sound leakage.',
      },
    ],
    specifications: [
      { label: 'Capacity', value: '24 Executive Seats' },
      { label: 'Telepresence Tech', value: 'Neat Board Pro & Shure MXA920' },
      { label: 'Privacy Glass', value: 'Switchable Electrochromic' },
      { label: 'Acoustic Rating', value: 'STC 54 Speech Privacy' },
    ],
    awards: ['Red Dot Best of the Best 2025', 'German Design Award Gold'],
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-hot-desk',
    name: 'Atelier Nomad',
    tagline: 'Flexible Hot Desk Access in Inspiring Common Atriums',
    price: '€380',
    period: '/ month',
    idealFor: 'Independent founders, remote leaders & creative consultants',
    features: [
      'Access to all open alcoves & ergonomic hot-desks',
      'High-speed 10 Gbps redundant fiber Wi-Fi',
      'Artisan specialty roast coffee, matcha & herbal bar',
      'Soundproof one-touch phone booths (unlimited)',
      'Community member events & networking salons',
      '€80 monthly meeting room & studio credits included',
    ],
    specs: {
      access: 'Mon–Fri 8:00 AM – 8:00 PM',
      credits: '4 Hours Meeting Room / Mo',
      privacy: 'Acoustic Phone Pods',
      guests: '2 Guest Passes / Mo',
    },
  },
  {
    id: 'plan-dedicated-desk',
    name: 'Dedicated Alcove',
    tagline: 'Your Permanent Personal Workstation with Fluted Oak Privacy',
    price: '€690',
    period: '/ month',
    popular: true,
    idealFor: 'Full-time professionals requiring a permanent, tuned setup',
    features: [
      'Reserved electric sit-stand desk & Herman Miller Embody chair',
      'Lockable fluted oak pedestal with charging safe',
      '24/7 keycard & biometric app campus access',
      'Registered business address & mail concierge handling',
      '€160 monthly conference & podcast studio credits',
      'Multi-city campus roaming (Paris, Geneva, Zurich)',
      'High-resolution multi-monitor display on request',
    ],
    specs: {
      access: '24/7 Unlimited Keyless Access',
      credits: '10 Hours Meeting Room / Mo',
      privacy: 'Dedicated Semi-Private Pod',
      guests: '6 Guest Passes / Mo',
    },
  },
  {
    id: 'plan-private-studio',
    name: 'Private Team Studio',
    tagline: 'Sound-Isolated Enclosed Office Suites for Teams of 4–24',
    price: '€2,400',
    period: '/ mo (from 4 desks)',
    idealFor: 'High-growth tech teams, venture firms & executive consultancies',
    features: [
      'Fully furnished custom acoustic suite with lockable glass entry',
      'Bespoke fluted wood branding & private collaboration table',
      'Private dedicated 1 Gbps VLAN & enterprise firewall',
      '24/7 secure access with custom company door plaques',
      'Priority booking on Obsidian Boardroom & Event Atrium',
      'Daily dedicated architectural housekeeping & plant care',
      'Dedicated Alcove Community Manager & concierge',
    ],
    specs: {
      access: '24/7 Unlimited + Custom Keying',
      credits: '25 Hours Boardroom / Mo',
      privacy: 'STC 50+ Private Enclosed',
      guests: 'Unlimited Client Reception',
    },
  },
];

export const SPATIAL_PILLARS: SpatialPillar[] = [
  {
    id: 'fluted-geometry',
    number: '01',
    title: 'Acoustic Fluted Micro-Alcoves',
    tagline: 'Whisper-Quiet Focus in the Heart of a Vibrant Coworking Campus',
    description:
      'Our signature vertical fluted panels are mathematically tuned acoustic diffusers that break flutter echoes and disperse vocal frequencies, allowing collaborative conversations and deep focus to coexist without noise friction.',
    metrics: '0.88 NRC',
    metricLabel: 'Sound Absorption Coefficient for Zero Distraction',
  },
  {
    id: 'circadian-light',
    number: '02',
    title: 'Circadian Luminescence',
    tagline: 'Sculptural Warm Halos & Glare-Free Ambient Ergonomics',
    description:
      'We treat light as a productivity stimulant. Hidden LED troughs, curved baseboard under-glow, and indirect ceiling washes shift automatically from 4000K crisp morning alertness to 2200K warm evening intimacy.',
    metrics: 'UGR < 16',
    metricLabel: 'Unified Glare Rating for Zero Eye Fatigue',
  },
  {
    id: 'tactile-materiality',
    number: '03',
    title: 'Tactile Noble Materials',
    tagline: 'Quarter-Sawn Oak, Honed Stone & Acoustic Felt Textures',
    description:
      'In an era of generic plastic shared spaces, ALCOVE grounds your workday with authentic, enduring materials: quarter-sawn oak, honed travertine, vegetable-tanned leather, and charcoal wool felt.',
    metrics: '100%',
    metricLabel: 'FSC-Certified & Low-VOC Non-Toxic Workspace',
  },
  {
    id: 'spatial-flow',
    number: '04',
    title: 'Fluid Spatial Choreography',
    tagline: 'From Monumental Arrival Atrium to Deep Focus Pods',
    description:
      'Floor plans are composed like architectural symphonies. Monumental reception desks with gentle curved sweeps naturally steer guests toward espresso bars while shielding focus zones from peripheral foot traffic.',
    metrics: '40%+',
    metricLabel: 'Measured Increase in Member Deep-Work Flow',
  },
];

export const MATERIALS: MaterialSpec[] = [
  {
    id: 'fluted-oak',
    name: 'Fluted European White Oak',
    category: 'Timber & Wall Surfaces',
    origin: 'Black Forest, Germany (FSC Certified)',
    acousticAbsorption: 'NRC 0.85 with Felt Backing',
    fireRating: 'Euroclass B-s1, d0 (Flame Retardant)',
    sustainability: '100% Recyclable, Carbon Negative Harvest',
    colorHex: '#C8A878',
    texturePattern: 'Vertical CNC Milled 18mm Flutes',
    description: 'Precision-milled linear fluted timber delivering rhythmic shadow lines and optimal acoustic diffusion in reception counters and feature walls.',
  },
  {
    id: 'acoustic-waffle',
    name: 'Basalt Charcoal Waffle Felt',
    category: 'Acoustic Wall & Ceiling',
    origin: 'Prato, Italy',
    acousticAbsorption: 'NRC 0.94 (Class A Sound Absorber)',
    fireRating: 'Class 1 / ASTM E84 Class A',
    sustainability: '70% Post-Consumer Recycled PET & Virgin Wool',
    colorHex: '#1E1E22',
    texturePattern: 'Geometric 80mm Square Waffle Grid',
    description: 'Monolithic grid structure engineered to trap low-to-mid frequency resonance behind executive reception desks and conference halls.',
  },
  {
    id: 'champagne-brass',
    name: 'Brushed Champagne Satin Brass',
    category: 'Architectural Hardware & Trims',
    origin: 'Brescia, Italy',
    acousticAbsorption: 'Reflective Accent',
    fireRating: 'Non-combustible (Class A1)',
    sustainability: '100% Infinitely Recyclable Alloy',
    colorHex: '#D4AF37',
    texturePattern: 'Directional Satin Hairline Polish with Wax Seal',
    description: 'Hand-finished warm metallic accents for signage, baseboard insets, flush door pulls, and concealed cove lighting transitions.',
  },
  {
    id: 'honed-terrazzo',
    name: 'Micro-Terrazzo Alabaster',
    category: 'Floor & Counter Surfaces',
    origin: 'Verona, Italy',
    acousticAbsorption: 'Resilient Underlayment Layered',
    fireRating: 'Class A1 Fireproof',
    sustainability: 'Zero VOC, Made from Reclaimed Marble Chips',
    colorHex: '#D8D4CC',
    texturePattern: 'Extra-Fine 2-4mm Dolomite Aggregate',
    description: 'Seamless cast-in-place floor surface offering silky tactile coolness and seamless transitions into warm parquet zones.',
  },
];
