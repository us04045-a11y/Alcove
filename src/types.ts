export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  category: 'Dedicated Studio' | 'Executive Suite' | 'Hot Desk Alcove' | 'Acoustic Lounge' | 'Event Atrium' | 'Outdoor Terrace';
  year: string;
  location: string;
  area: string;
  acousticRating: string;
  heroImage: string;
  galleryImages: string[];
  description: string;
  architecturalConcept: string;
  materials: {
    name: string;
    description: string;
    finish: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  awards?: string[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  idealFor: string;
  features: string[];
  specs: {
    access: string;
    credits: string;
    privacy: string;
    guests: string;
  };
  popular?: boolean;
}

export interface MaterialSpec {
  id: string;
  name: string;
  category: string;
  origin: string;
  acousticAbsorption: string;
  fireRating: string;
  sustainability: string;
  colorHex: string;
  texturePattern: string;
  description: string;
}

export interface SpatialPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  metrics: string;
  metricLabel: string;
}

export interface LayerState {
  background: boolean;
  typography: boolean;
  foreground: boolean;
  webglDistortion: boolean;
  exploded3D: boolean;
}
