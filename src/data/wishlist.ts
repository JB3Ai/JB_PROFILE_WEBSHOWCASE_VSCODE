export type WishlistCategory = 'ai' | 'hardware' | 'software';

export interface WishlistItem {
  id: string;
  title: string;
  subtitle: string;
  category: WishlistCategory;
  badge: string;
  priceUSD: string;
  priceZAR: string;
  cta: string;
  icon: string;
  href: string;
}

export interface WishlistPaymentMethod {
  id: string;
  label: string;
  subtitle: string;
  pill: string;
  cta: string;
  icon: string;
  href: string;
}

export const WISHLIST_GOAL_ZAR = 179717;
export const WISHLIST_GOAL_USD = 10892;
export const WISHLIST_RAISED_ZAR = 15800;
export const WISHLIST_SHARE_URL = 'https://jonoblackburn.com/wishlist';

export const wishlistItems: WishlistItem[] = [
  {
    id: 'supergrok',
    title: 'SuperGrok',
    subtitle: 'Annual Subscription for AI Research & Automation',
    category: 'ai',
    badge: 'Annual Sub',
    priceUSD: '$300',
    priceZAR: 'R4,950',
    cta: 'Sponsor Now',
    icon: 'Layers',
    href: 'https://grok.com/plans',
  },
  {
    id: 'hostinger-vps',
    title: 'Hostinger KVM 8 VPS',
    subtitle: 'Annual Subscription for High-Performance Cloud Infrastructure',
    category: 'hardware',
    badge: 'Hosting',
    priceUSD: '$342',
    priceZAR: 'R5,643',
    cta: 'Sponsor Now',
    icon: 'Server',
    href: 'https://www.hostinger.com/vps-hosting',
  },
  {
    id: 'nvidia-gpus',
    title: '2x Nvidia Graphics Cards',
    subtitle: 'Hardware Investment for Local Model Training & Rendering',
    category: 'hardware',
    badge: 'Hardware',
    priceUSD: '$2,000',
    priceZAR: 'R33,000',
    cta: 'View Options',
    icon: 'Cpu',
    href: 'https://www.nvidia.com',
  },
  {
    id: 'chatgpt-plus',
    title: 'ChatGPT Plus',
    subtitle: 'Annual Subscription for Advanced AI Workflows',
    category: 'ai',
    badge: 'Annual Sub',
    priceUSD: '$240',
    priceZAR: 'R3,960',
    cta: 'Sponsor Now',
    icon: 'Zap',
    href: 'https://chatgpt.com/pricing',
  },
  {
    id: 'google-cloud',
    title: 'Google Cloud',
    subtitle: '3 Months Credits for Scalable Backend Services',
    category: 'software',
    badge: 'Cloud Credits',
    priceUSD: '$150',
    priceZAR: 'R2,475',
    cta: 'Sponsor Now',
    icon: 'Cloud',
    href: 'https://cloud.google.com',
  },
  {
    id: 'github-pro',
    title: 'GitHub Pro+',
    subtitle: 'GitHub Pro+ at $39 x 12 months for Code Management & Actions',
    category: 'software',
    badge: 'Annual Sub',
    priceUSD: '$468',
    priceZAR: 'R7,722',
    cta: 'Sponsor Now',
    icon: 'Github',
    href: 'https://github.com/pricing',
  },
  {
    id: 'canva-pro',
    title: 'Canva Pro',
    subtitle: 'Annual Subscription for Visual Content Assets',
    category: 'software',
    badge: 'Annual Sub',
    priceUSD: '$135',
    priceZAR: 'R2,228',
    cta: 'Sponsor Now',
    icon: 'Palette',
    href: 'https://www.canva.com/pro/',
  },
  {
    id: 'leonardo-ai',
    title: 'Leonardo AI',
    subtitle: 'Annual Subscription for AI Graphic Generation',
    category: 'ai',
    badge: 'Annual Sub',
    priceUSD: '$144',
    priceZAR: 'R2,376',
    cta: 'Sponsor Now',
    icon: 'Image',
    href: 'https://leonardo.ai/pricing',
  },
  {
    id: 'capcut-pro',
    title: 'CapCut Ultra',
    subtitle: 'CapCut Ultra 12 months for Video Editing & Production',
    category: 'software',
    badge: 'Annual Sub',
    priceUSD: '~$364',
    priceZAR: 'R5,999',
    cta: 'Sponsor Now',
    icon: 'Video',
    href: 'https://www.capcut.com/activities/subscribe',
  },
  {
    id: 'kimi-tokens',
    title: 'Kimi Tokens',
    subtitle: 'Variable AI token top-ups for Kimi assistant workflows',
    category: 'ai',
    badge: 'Variable',
    priceUSD: '$20 - $1,000',
    priceZAR: 'R330 - R16,500',
    cta: 'Sponsor Now',
    icon: 'Sparkles',
    href: 'https://www.kimi.com/',
  },
  {
    id: 'anthropic-api',
    title: 'Anthropic API Credits',
    subtitle: 'Annual Credits for Claude LLM API Integration',
    category: 'ai',
    badge: 'API Credits',
    priceUSD: '$300',
    priceZAR: 'R4,950',
    cta: 'Sponsor Now',
    icon: 'Bot',
    href: 'https://console.anthropic.com',
  },
  {
    id: 'microsoft-365',
    title: 'Microsoft 365',
    subtitle: 'Annual Subscription for Productivity & Office Suite',
    category: 'software',
    badge: 'Annual Sub',
    priceUSD: '$70',
    priceZAR: 'R1,155',
    cta: 'Sponsor Now',
    icon: 'LayoutGrid',
    href: 'https://www.microsoft.com/microsoft-365',
  },
  {
    id: 'google-workspace',
    title: 'Google Workspace',
    subtitle: 'Annual Subscription for Enterprise Email & Cloud Drive',
    category: 'software',
    badge: 'Annual Sub',
    priceUSD: '$100',
    priceZAR: 'R1,650',
    cta: 'Sponsor Now',
    icon: 'Mail',
    href: 'https://workspace.google.com/pricing',
  },
  {
    id: 'asus-zenbook-duo',
    title: 'ASUS Zenbook Duo',
    subtitle: 'Intel Ultra X9, 32GB RAM, 1TB Dual OLED Workstation Laptop',
    category: 'hardware',
    badge: 'Hardware',
    priceUSD: '~$3,939',
    priceZAR: 'R64,999',
    cta: 'Sponsor Now',
    icon: 'Laptop',
    href: 'https://www.asus.com/laptops/',
  },
  {
    id: 'openai-codex',
    title: 'OpenAI Codex / API',
    subtitle: 'Annual Subscription for AI Coding & Automation APIs',
    category: 'ai',
    badge: 'API Credits',
    priceUSD: '$240',
    priceZAR: 'R3,960',
    cta: 'Sponsor Now',
    icon: 'Code2',
    href: 'https://chatgpt.com/pricing',
  },
  {
    id: 'gemini-ultra',
    title: 'Gemini AI Ultra',
    subtitle: 'Annual Advanced AI Subscription & Cloud Workspace',
    category: 'ai',
    badge: 'Annual Sub',
    priceUSD: '$1,200',
    priceZAR: 'R19,800',
    cta: 'Sponsor Now',
    icon: 'Star',
    href: 'https://gemini.google/subscriptions/',
  },
  {
    id: 'base44',
    title: 'Base44',
    subtitle: 'Annual Tooling & Infrastructure Platform Subscription',
    category: 'software',
    badge: 'Annual Sub',
    priceUSD: '$600',
    priceZAR: 'R9,900',
    cta: 'Sponsor Now',
    icon: 'Settings',
    href: 'https://base44.com/pricing',
  },
];

export const wishlistPaymentMethods: WishlistPaymentMethod[] = [
  {
    id: 'buymeacoffee',
    label: 'Buy Me a Coffee',
    subtitle: 'Quick platform support: once-off or monthly',
    pill: 'Once-off / Monthly',
    cta: 'Support Now',
    icon: 'Coffee',
    href: 'https://buymeacoffee.com/jb3ai',
  },
  {
    id: 'paybru',
    label: 'PayBru (South Africa)',
    subtitle: 'Local ZAR payment: become a Founding Sponsor',
    pill: 'Founding Sponsor',
    cta: 'Founding Sponsor',
    icon: 'Shield',
    href: 'https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel',
  },
  {
    id: 'paypal',
    label: 'PayPal',
    subtitle: 'International direct contributions and payments',
    pill: 'Global Payments',
    cta: 'Donate via PayPal',
    icon: 'CreditCard',
    href: 'https://paypal.me/jonoblackburnza',
  },
  {
    id: 'ko-fi',
    label: 'Ko-fi',
    subtitle: 'Community support: monthly or once-off custom amount',
    pill: 'Community Support',
    cta: 'Support on Ko-fi',
    icon: 'Heart',
    href: 'https://ko-fi.com/D0K721OP8E',
  },
];
