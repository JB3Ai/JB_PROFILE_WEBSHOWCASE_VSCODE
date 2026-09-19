import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Copy, Check,
  Layers, Server, Cpu, Zap, Cloud, Github, Palette, Image, Video, Bot,
  LayoutGrid, Mail, Laptop, Code2, Star, Settings, Sparkles,
  Coffee, Shield, CreditCard, Heart,
  Twitter, Facebook, Linkedin, MessageCircle, Target,
} from 'lucide-react';
import {
  wishlistItems, wishlistPaymentMethods,
  WISHLIST_GOAL_ZAR, WISHLIST_GOAL_USD, WISHLIST_RAISED_ZAR, WISHLIST_SHARE_URL,
  type WishlistCategory,
} from '@/data/wishlist';
import { usePageMeta } from '@/hooks/usePageMeta';

const iconMap: Record<string, any> = {
  Layers, Server, Cpu, Zap, Cloud, Github, Palette, Image, Video, Bot,
  LayoutGrid, Mail, Laptop, Code2, Star, Settings, Sparkles,
  Coffee, Shield, CreditCard, Heart,
};

type FilterKey = 'all' | WishlistCategory;

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Items' },
  { key: 'ai', label: 'AI Tools & APIs' },
  { key: 'hardware', label: 'Hardware & VPS' },
  { key: 'software', label: 'Software & Services' },
];

const shareLinks = [
  {
    id: 'x',
    title: 'Share on X / Twitter',
    icon: Twitter,
    href: `https://twitter.com/intent/tweet?url=${WISHLIST_SHARE_URL}&text=Support%20Jono%27s%20Wishlist%20for%20AI%20tools,%20hardware%20and%20dev%20gear!`,
  },
  {
    id: 'facebook',
    title: 'Share on Facebook',
    icon: Facebook,
    href: `https://www.facebook.com/sharer/sharer.php?u=${WISHLIST_SHARE_URL}`,
  },
  {
    id: 'linkedin',
    title: 'Share on LinkedIn',
    icon: Linkedin,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${WISHLIST_SHARE_URL}`,
  },
  {
    id: 'whatsapp',
    title: 'Share on WhatsApp',
    icon: MessageCircle,
    href: `https://wa.me/?text=Support%20Jono%27s%20Wishlist%20${WISHLIST_SHARE_URL}`,
  },
];

const cardHover =
  'transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:bg-primary/5 hover:shadow-[0_16px_40px_-16px_rgba(180,138,74,0.25)]';

export default function Wishlist() {
  usePageMeta({
    title: 'Wishlist 2026 | JB³Ai Mission Funding',
    description: 'Fund the final 5% of the JB³Ai ecosystem. Sponsor AI tokens, hardware recovery, and learner access to keep Isikolo AI free for South African students.',
    canonical: '/wishlist',
  });
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [showToast, setShowToast] = useState(false);

  const fundedPct = Number(((WISHLIST_RAISED_ZAR / WISHLIST_GOAL_ZAR) * 100).toFixed(1));

  const copyWishlistLink = async () => {
    try {
      await navigator.clipboard.writeText(WISHLIST_SHARE_URL);
    } catch {
      /* clipboard unavailable: toast still confirms the intent */
    }
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2500);
  };

  const visible = activeFilter === 'all'
    ? wishlistItems
    : wishlistItems.filter(item => item.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-warm-50 text-ink-900 overflow-hidden">
      {/* Cinematic depth: gold radial glow over the adaptive base */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-warm-50 to-warm-50" />

      <div className="relative z-10">
        {/* Top navigation */}
        <div className="section-padding pt-6">
          <div className="content-max-width">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-copper-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Main Site
            </Link>
          </div>
        </div>

        <div className="section-padding pb-24 pt-10">
          <div className="content-max-width max-w-6xl">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-[0.08em] mb-4 shadow-[0_0_20px_rgba(180,138,74,0.12)]">
                Wishlist 2026
              </span>
              <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight text-ink-900 mb-4">
                Strategic Infrastructure &amp; Sponsorships
              </h1>
              <p className="text-base lg:text-lg text-ink-500 leading-relaxed max-w-2xl mx-auto">
                Empowering development, AI research, hardware investments, and production hosting.
              </p>
            </motion.header>

            {/* Progress tracker: frosted glass */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Donation Progress Tracker"
              className="rounded-xl backdrop-blur-none md:backdrop-blur-md bg-white/95 md:bg-white/60 border border-primary/20 shadow-[0_8px_32px_-8px_rgba(180,138,74,0.15)] p-6 lg:p-8 mb-10 max-w-3xl mx-auto"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 className="flex items-center gap-2 text-base font-semibold text-ink-900">
                  <Target className="w-4 h-4 text-primary" />
                  Sponsorship Goal
                </h2>
                <span className="text-sm text-ink-500">
                  Total Wishlist: <strong className="text-primary">R{WISHLIST_GOAL_ZAR.toLocaleString()} ZAR</strong> (~${WISHLIST_GOAL_USD.toLocaleString()} USD)
                </span>
              </div>
              <div
                className="h-3 rounded-full bg-primary/10 overflow-hidden mb-4"
                role="progressbar"
                aria-label="Donation Progress"
                aria-valuenow={fundedPct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="relative h-full rounded-full bg-primary shadow-[0_0_12px_rgba(180,138,74,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${fundedPct}%` }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-primary">
                  R{WISHLIST_RAISED_ZAR.toLocaleString()} Raised
                </span>
                <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold">
                  {fundedPct}% Funded
                </span>
              </div>
            </motion.section>

            {/* Filters */}
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Wishlist Filters"
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={
                    activeFilter === f.key
                      ? 'px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow-[0_0_15px_rgba(180,138,74,0.4)] transition-all duration-300'
                      : 'px-5 py-2.5 rounded-full text-sm font-medium border border-primary/20 bg-transparent text-ink-500 hover:border-primary/50 hover:text-primary transition-all duration-300'
                  }
                >
                  {f.label}{f.key === 'all' ? ` (${wishlistItems.length})` : ''}
                </button>
              ))}
            </motion.nav>

            {/* Wishlist grid: smooth shuffle on filter */}
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
              <AnimatePresence mode="popLayout">
                {visible.map((item, i) => {
                  const Icon = iconMap[item.icon] || Zap;
                  return (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.92, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -12 }}
                      transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative rounded-xl border border-primary/20 bg-background/95 md:bg-background/80 backdrop-blur-none md:backdrop-blur-sm p-6 flex flex-col items-center text-center ${cardHover}`}
                    >
                      <span className="absolute top-3.5 right-3.5 text-[10px] font-semibold uppercase tracking-wider text-ink-400 border border-ink-200 rounded-full px-2.5 py-0.5">
                        {item.badge}
                      </span>
                      <div className="w-14 h-14 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-primary/40">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold text-ink-900 mb-1">{item.title}</h3>
                      <p className="text-xs text-ink-500 leading-relaxed mb-4 min-h-[2.6em]">
                        {item.subtitle}
                      </p>
                      <div className="w-full rounded-lg border border-primary/20 bg-primary/5 py-2 px-3 mb-4">
                        <span className="text-base font-semibold text-copper-600">
                          {item.priceUSD} / {item.priceZAR}
                        </span>
                      </div>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-primary/50 bg-transparent text-primary text-sm font-medium hover:bg-primary/10 hover:shadow-[0_0_16px_rgba(180,138,74,0.25)] transition-all duration-300"
                      >
                        {item.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Estimated total banner */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl backdrop-blur-none md:backdrop-blur-md bg-white/95 md:bg-white/60 border border-primary/20 shadow-[0_8px_32px_-8px_rgba(180,138,74,0.15)] p-8 max-w-3xl mx-auto text-center mb-16"
            >
              <p className="text-xs uppercase tracking-[0.12em] text-ink-400 font-semibold mb-2">
                Estimated Total Wishlist Goal
              </p>
              <p className="text-2xl lg:text-3xl font-semibold text-copper-600">
                ≈ ${WISHLIST_GOAL_USD.toLocaleString()} USD / R{WISHLIST_GOAL_ZAR.toLocaleString()} ZAR
              </p>
            </motion.section>

            {/* Payment gateways */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-2">
                  Direct Contributions
                </span>
                <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-ink-900 mb-2">
                  Payment &amp; Support Gateways
                </h2>
                <p className="text-sm text-ink-500 max-w-xl mx-auto">
                  Prefer to contribute a custom amount or support directly? Select your preferred payment gateway below.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {wishlistPaymentMethods.map((method) => {
                  const Icon = iconMap[method.icon] || CreditCard;
                  return (
                    <article
                      key={method.id}
                      className={`rounded-xl border border-primary/20 bg-background/95 md:bg-background/80 backdrop-blur-none md:backdrop-blur-sm p-6 flex flex-col items-center text-center ${cardHover}`}
                    >
                      <div className="w-14 h-14 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold text-ink-900 mb-1">{method.label}</h3>
                      <p className="text-xs text-ink-500 leading-relaxed mb-4 min-h-[2.6em]">
                        {method.subtitle}
                      </p>
                      <div className="w-full rounded-lg border border-primary/20 bg-primary/5 py-2 px-3 mb-4">
                        <span className="text-sm font-semibold text-primary">{method.pill}</span>
                      </div>
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-primary/50 bg-transparent text-primary text-sm font-medium hover:bg-primary/10 hover:shadow-[0_0_16px_rgba(180,138,74,0.25)] transition-all duration-300"
                      >
                        {method.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </article>
                  );
                })}
              </div>
            </motion.section>

            {/* Share footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-sm text-ink-500 mb-4">Share this wishlist with your network</p>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                {shareLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.title}
                      className="w-11 h-11 rounded-xl border border-primary/30 bg-transparent text-primary flex items-center justify-center hover:bg-primary/10 hover:border-primary/60 hover:shadow-[0_0_16px_rgba(180,138,74,0.25)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </a>
                  );
                })}
                <button
                  onClick={copyWishlistLink}
                  title="Copy Wishlist Link"
                  className="w-11 h-11 rounded-xl border border-primary/30 bg-transparent text-primary flex items-center justify-center hover:bg-primary/10 hover:border-primary/60 hover:shadow-[0_0_16px_rgba(180,138,74,0.25)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Copy className="w-[18px] h-[18px]" />
                </button>
              </div>
            </motion.footer>
          </div>
        </div>
      </div>

      {/* Copy toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-7 right-7 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ink-900 text-white text-sm font-medium shadow-xl"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
