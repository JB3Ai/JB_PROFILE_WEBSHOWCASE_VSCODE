import type { SponsorTier, FundraisingLink } from '@/types';

export const supportTiers: SponsorTier[] = [
  {
    id: 'ai-tokens',
    label: 'AI Tokens',
    amountZAR: 200,
    amountUSD: 10,
    description: 'Helps buy AI tokens to keep Isikulo free and running.',
    icon: 'Zap',
    href: 'https://paypal.me/jonoblackburnza',
  },
  {
    id: 'gtr3-reserve',
    label: 'Reserve GTR³ Limited Edition',
    amountZAR: 900,
    amountUSD: 50,
    description: 'Sponsor my build time and reserve a limited edition physical copy of the GTR³ manuscript.',
    icon: 'BookOpen',
    href: 'https://paypal.me/jonoblackburnza',
  },
  {
    id: 'learner-access',
    label: 'Sponsor Learner Access',
    amountZAR: 1800,
    amountUSD: 100,
    description: 'Help sponsor learner access and platform expansion for South African students.',
    icon: 'GraduationCap',
    href: 'https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel',
  },
  {
    id: 'hardware-recovery',
    label: 'Hardware Recovery & Ecosystem',
    amountZAR: 4500,
    amountUSD: 250,
    description: 'Direct support toward hardware recovery, development tools, and core OS³ infrastructure.',
    icon: 'Cpu',
    href: 'https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel',
  },
];

export const supportLinks: FundraisingLink[] = [
  {
    id: 'buymeacoffee',
    label: 'Platform Support (Buy Me a Coffee)',
    href: 'https://buymeacoffee.com/jb3ai',
    platform: 'buymeacoffee',
    description: 'Once-off or monthly support for ongoing platform development, updates, and community access.',
  },
  {
    id: 'paybru',
    label: 'PayBru (South Africa)',
    href: 'https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel',
    platform: 'paybru',
    description: 'Local support in ZAR. Bank payouts, founding sponsor tiers, and community memberships.',
  },
  {
    id: 'paypal',
    label: 'PayPal',
    href: 'https://paypal.me/jonoblackburnza',
    platform: 'paypal',
    description: 'Global trust. International supporters, higher-value contributions, GTR³ reservations, and business sponsor payments.',
  },
  {
    id: 'ko-fi',
    label: 'Ko-fi',
    href: 'https://ko-fi.com/D0K721OP8E',
    platform: 'other',
    description: 'Once-off or monthly support for ongoing platform development, updates, and community access.',
  },
];

export const sponsorActions = [
  {
    id: 'sponsor-isikulo',
    label: 'Sponsor Isikulo',
    mark: 'SI',
    icon: 'GraduationCap',
    href: 'https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel',
  },
  {
    id: 'sponsor-learner',
    label: 'Sponsor a Learner',
    mark: 'SL',
    icon: 'HeartHandshake',
    href: 'https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel',
  },
  {
    id: 'fund-ai-credits',
    label: 'Fund AI Credits',
    mark: 'AI',
    icon: 'Zap',
    href: 'https://paypal.me/jonoblackburnza',
  },
  {
    id: 'support-free-education',
    label: 'Support Free Education',
    mark: 'FE',
    icon: 'Coffee',
    href: 'https://ko-fi.com/D0K721OP8E',
  },
  {
    id: 'founding-sponsor',
    label: 'Become a Founding Sponsor',
    mark: 'FS',
    icon: 'Award',
    href: 'https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel',
  },
  {
    id: 'gtr3-limited-edition',
    label: 'Reserve GTR³ Limited Edition',
    mark: 'G3',
    icon: 'BookOpen',
    href: 'https://paypal.me/jonoblackburnza',
  },
];
