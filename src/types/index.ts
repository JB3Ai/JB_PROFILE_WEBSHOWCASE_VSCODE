export interface App {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: 'public' | 'gated' | 'portal-only';
  status: 'live' | 'beta' | 'coming-soon';
  thumbnail: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  externalLink?: string;
  videoUrl?: string;
  brochureUrl?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'milestone' | 'project' | 'recognition' | 'pivot' | 'foundation' | 'enterprise' | 'recovery' | 'healthcare' | 'crisis' | 'forensics' | 'ai' | 'future';
  tags?: string[];
}

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  type: 'testimonial' | 'metric' | 'award' | 'publication' | 'certificate' | 'recommendation';
  value?: string;
  source?: string;
  thumbnail?: string;
  visibility?: 'Public' | 'Public Preview' | 'Investor Only' | 'Historical';
  fileUrl?: string;
  videoUrl?: string;
  tags?: string[];
  cautionNote?: string;
}

export interface SponsorTier {
  id: string;
  label: string;
  amountZAR: number;
  amountUSD: number;
  description: string;
  icon: string;
  href: string;
}

export interface FundraisingLink {
  id: string;
  label: string;
  href: string;
  platform: 'buymeacoffee' | 'paypal' | 'paybru' | 'other';
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  coverImage?: string;
  link?: string;
}

export interface GTR3Chapter {
  id: string;
  title: string;
  summary: string;
  themes: { title: string; summary: string }[];
  chapterPreviewItems: string[];
  visibilityNote?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  hasAccess: boolean;
  phoneNumber: string | null;
  email: string | null;
  accessLevel: 'public' | 'investor' | 'client' | 'collaborator' | 'press' | 'admin';
}

export interface LeadCaptureForm {
  email: string;
  intent: 'investor' | 'client' | 'collaborator' | 'press';
  name: string;
  mode: 'access' | 'news';
}

export interface OSApp {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'intelligence' | 'profile' | 'investment' | 'content' | 'downloads';
  gated: boolean;
  content?: string;
  pdfUrl?: string;
  imageUrl?: string;
  externalUrl?: string;
  files?: { label: string; url: string }[];
  width?: number;
  height?: number;
}
