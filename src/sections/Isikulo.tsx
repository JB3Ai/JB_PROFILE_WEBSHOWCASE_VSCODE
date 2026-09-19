import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { supportTiers, supportLinks, sponsorActions } from '@/data/fundraising';
import { Zap, BookOpen, GraduationCap, Cpu, Heart, Globe, Coffee, ArrowUpRight, ArrowRight, ChevronDown, ChevronUp, Video, HeartHandshake, Award, Download, Youtube } from 'lucide-react';
import { SponsorPay } from '@/components/SponsorPay';

const iconMap: Record<string, any> = { Zap, BookOpen, GraduationCap, Cpu };

// Ndebele colour rotation for the sponsor tier icons
const tierIconStyles = [
  { chip: 'bg-ndebele-teal/10 group-hover:bg-ndebele-teal/20', icon: 'text-ndebele-teal' },
  { chip: 'bg-ndebele-red/10 group-hover:bg-ndebele-red/20', icon: 'text-ndebele-red' },
  { chip: 'bg-ndebele-gold/15 group-hover:bg-ndebele-gold/25', icon: 'text-ndebele-gold' },
  { chip: 'bg-ndebele-blue/10 group-hover:bg-ndebele-blue/20', icon: 'text-ndebele-blue' },
];

// Quick action icons (payment gateways / sponsor actions)
const actionIcons: Record<string, any> = { GraduationCap, HeartHandshake, Zap, Coffee, Award, BookOpen };

const actionIconStyles = [
  'bg-ndebele-teal/10 text-ndebele-teal',
  'bg-ndebele-gold/15 text-ndebele-gold',
  'bg-ndebele-red/10 text-ndebele-red',
  'bg-ndebele-blue/10 text-ndebele-blue',
  'bg-ndebele-orange/10 text-ndebele-orange',
  'bg-copper-50 text-copper-600',
];

const platformIcons: Record<string, any> = {
  buymeacoffee: Coffee,
  paypal: Globe,
  paybru: Heart,
  'ko-fi': Coffee,
  other: Globe,
};

interface IsikuloProps {
  onOpenGate?: (context?: 'investor' | 'client' | 'collaborator' | 'press') => void;
}

export function Isikulo({ onOpenGate }: IsikuloProps) {
  const { ref, isVisible } = useScrollReveal();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="isikulo" className="relative min-h-[300px] w-full py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-copper-50/40 via-warm-50 to-white texture-grain" />
      {/* Ndebele pattern band */}
      <div className="absolute top-0 left-0 right-0 h-5 ndebele-band" />
      <div className="absolute top-5 left-0 right-0 h-px bg-ink-900/10" />
      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <SectionHeader
            label="Fundraising"
            title="The Proof Is Built. Now We Need Launch Fuel."
          />

          {/* Fundraising copy paragraph */}
          <motion.div
            className="max-w-3xl mx-auto text-center mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-body-lg text-ink-600 leading-relaxed text-balance mb-4">
              Five working products are at the final-launch stage. Your support goes directly into the final 
              5%: the server time, AI tokens, and development hours needed to bring the full OS³ ecosystem online.
            </p>
            <p className="text-body-lg text-ink-600 leading-relaxed text-balance">
              While keeping Isikulo AI free for South African learners remains our core educational mission, 
              your contributions also directly fund JB³ infrastructure, hardware recovery, and my continued 
              build time. This is not charity. It is an investment in practical, proven technology that is 
              ready to scale.
            </p>
          </motion.div>

          {/* Isikulo Mission Card */}
          <motion.div
            className="isikulo-mission-card mt-12 rounded-2xl bg-gradient-to-br from-ink-900 to-ink-950 p-8 lg:p-12 text-white overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-copper-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-copper-800/10 rounded-full blur-3xl" />
            {/* Ndebele pattern band across the top of the mission card */}
            <div className="absolute top-0 left-0 right-0 h-6 ndebele-band" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ndebele-gold/15 text-ndebele-gold text-xs font-medium border border-ndebele-gold/30 mb-5">
                  <Heart className="w-3 h-3" />
                  Free for South African Learners
                </div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4">
                  JB³ Isikulo AI
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  A free AI-powered education platform built to support South African learners with schoolwork, 
                  revision, explanations, and practical learning support. 11 languages, text and speech, 
                  preloaded with the full free South African school curriculum.
                </p>
                <p className="text-white/50 text-sm">
                  The mission is simple: keep quality AI education support free for every learner in South Africa.
                </p>

                {/* Expandable content */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        <p className="text-sm text-white/60 leading-relaxed">
                          Isikulo was built from the ground up to address a specific gap: learners in South Africa 
                          who need help with homework, revision, and understanding concepts - but cannot afford 
                          private tutors or paid AI subscriptions. The platform runs on donated AI credits and 
                          community funding. Every rand or dollar contributed goes directly to keeping the 
                          service online, expanding the curriculum coverage, and adding voice support in more 
                          local languages.
                        </p>
                        <p className="text-sm text-white/60 leading-relaxed">
                          Current roadmap includes: Grade 12 matric prep modules, voice tutoring in Xhosa and 
                          Zulu, offline mode for low-connectivity areas, and a teacher dashboard for classroom 
                          integration. These features are 95% built. The remaining 5% is what this fundraising 
                          campaign will unlock.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                          <Video className="w-4 h-4 text-copper-400" />
                          <a href="https://www.youtube.com/@JB3Ai" target="_blank" rel="noopener noreferrer" className="text-sm text-copper-400 hover:text-copper-300 transition-colors">
                            Watch the Isikulo story on YouTube
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="https://www.youtube.com/@JB3Ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-copper-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-copper-500"
                  >
                    <Youtube className="w-4 h-4" />
                    Watch Now
                  </a>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300 transition-colors"
                  >
                    {expanded ? (
                      <>Less details <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Read more about the mission <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                  <a
                    href="/assets/pdfs/isikoloaiforlearners.pdf"
                    download
                    className="inline-flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Isikulo Overview
                  </a>
                  <a
                    href="/assets/pdfs/the-bridge-of-voices-the-story-of-isikolo-ai.pdf"
                    download
                    className="inline-flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    The Bridge of Voices: The Isikulo AI Story
                  </a>
                  <a
                    href="/contact/"
                    className="inline-flex items-center gap-2 rounded-full border border-copper-400/50 px-4 py-1.5 text-sm font-medium text-copper-300 transition-colors hover:bg-copper-400/10 hover:border-copper-400"
                  >
                    Get in Touch
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-t-2 border-t-ndebele-teal">
                  <span className="block text-2xl font-semibold text-ndebele-teal">11</span>
                  <span className="text-xs text-white/50">Languages Supported</span>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-t-2 border-t-ndebele-gold">
                  <span className="block text-2xl font-semibold text-ndebele-gold">R0</span>
                  <span className="text-xs text-white/50">Cost to Learners</span>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-t-2 border-t-ndebele-red">
                  <span className="block text-2xl font-semibold text-ndebele-red">SA</span>
                  <span className="text-xs text-white/50">Full Curriculum</span>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-t-2 border-t-ndebele-blue">
                  <span className="block text-2xl font-semibold text-ndebele-blue">95%</span>
                  <span className="text-xs text-white/50">Build Complete</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sponsor the Final 5% */}
          <div className="mt-16">
            <div className="relative mb-8">
              <h3 className="text-display-md text-ink-900 text-balance text-center">
                Sponsor the Final 5%
              </h3>
              <Link
                to="/wishlist"
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:inline-flex text-sm font-medium text-copper-600 hover:text-copper-700 transition-colors items-center gap-2"
              >
                View Full Wishlist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {supportTiers.map((tier, i) => {
                const Icon = iconMap[tier.icon] || Zap;
                const style = tierIconStyles[i % tierIconStyles.length];
                return (
                  <motion.a
                    key={tier.id}
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                    className="group block p-6 rounded-2xl bg-white border border-ink-100 hover:border-copper-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${style.chip}`}>
                      <Icon className={`w-5 h-5 ${style.icon}`} />
                    </div>
                    <h4 className="text-base font-semibold text-ink-900 mb-1">{tier.label}</h4>
                    <p className="text-sm text-copper-600 font-medium mb-2">
                      R{tier.amountZAR.toLocaleString()} / ${tier.amountUSD}
                    </p>
                    <p className="text-sm text-ink-500 leading-relaxed">{tier.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-copper-600">
                      Contribute
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </div>
                    {tier.id === 'gtr3-reserve' && onOpenGate && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onOpenGate('client');
                        }}
                        className="mt-3 pt-3 w-full flex items-center gap-2 border-t border-ink-100 text-sm font-medium text-copper-600 hover:text-copper-700 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        GTR³ Publishing Sneak Peek
                        <span className="ml-auto text-[10px] uppercase tracking-wider text-ink-400">Portal</span>
                      </button>
                    )}
                  </motion.a>
                );
              })}
            </div>
            <SponsorPay />
            <div className="mt-6 text-center sm:hidden">
              <Link
                to="/wishlist"
                className="inline-flex items-center gap-2 text-sm font-medium text-copper-600 hover:text-copper-700 transition-colors"
              >
                View Full Wishlist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Support Links with proper icons */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportLinks.map((link) => {
              const Icon = platformIcons[link.platform] || Globe;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-white border border-ink-100 hover:border-copper-300 transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-warm-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-ink-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900">{link.label}</h4>
                    <p className="text-xs text-ink-500 mt-0.5">{link.description}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Sponsor Action Grid */}
          <div className="mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-500 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {sponsorActions.map((action, i) => {
                const ActionIcon = actionIcons[action.icon] || Zap;
                const style = actionIconStyles[i % actionIconStyles.length];
                return (
                  <a
                    key={action.id}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center p-4 rounded-xl bg-white border border-ink-100 hover:border-copper-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 ${style}`}>
                      <ActionIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-ink-700">{action.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
