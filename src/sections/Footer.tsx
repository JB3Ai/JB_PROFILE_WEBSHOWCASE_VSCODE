import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowUpRight, Mail, MapPin, Coffee, Globe, Heart, Linkedin, Youtube, Instagram, MessageCircle, Twitter, Facebook, Send, BookOpen, ExternalLink, Github } from 'lucide-react';

interface FooterProps {
  onOpenGate: (context: 'investor' | 'client' | 'collaborator' | 'press') => void;
}

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jonathanblackburn0793120688/', icon: Linkedin },
  { name: 'LinkedIn Company', url: 'https://www.linkedin.com/company/jb%C2%B3ai/', icon: Linkedin },
  { name: 'X / Twitter', url: 'https://x.com/JonoBlackburn7', icon: Twitter },
  { name: 'GitHub', url: 'https://github.com/JB3Ai/', icon: Github },
  { name: 'Instagram', url: 'https://www.instagram.com/jb3a.i', icon: Instagram },
  { name: 'Instagram (Personal)', url: 'https://www.instagram.com/jonoblackburn5/', icon: Instagram },
  { name: 'YouTube', url: 'https://www.youtube.com/@JB3Ai', icon: Youtube },
  { name: 'YouTube (Personal)', url: 'https://www.youtube.com/@JonoBlackburn', icon: Youtube },
  { name: 'TikTok', url: 'https://www.tiktok.com/@jb3ai2', icon: MessageCircle },
  { name: 'TikTok (Personal)', url: 'https://www.tiktok.com/@jonoblackburn', icon: MessageCircle },
  { name: 'Reddit', url: 'https://www.reddit.com/user/jonoelite_jb3ai/', icon: Globe },
  { name: 'Threads', url: 'https://www.threads.com/@jonoblackburn5', icon: MessageCircle },
  { name: 'Facebook', url: 'https://www.facebook.com/jono.blackburn.5', icon: Facebook },
  { name: 'Facebook Page', url: 'https://www.facebook.com/profile.php?id=61582817213519', icon: Facebook },
  { name: 'Medium', url: 'https://medium.com/@jono_12764', icon: BookOpen },
  { name: 'Telegram', url: 'https://t.me/jonoelitesa', icon: Send },
  { name: 'Discord', url: 'https://discord.com/users/jonoelite2491', icon: MessageCircle },
];

const contactLinks = [
  { name: 'hi@jb3ai.com', url: 'mailto:hi@jb3ai.com', icon: Mail },
  { name: 'jono@jb3ai.com', url: 'mailto:jono@jb3ai.com', icon: Mail },
  { name: 'jono@jonoblackburn.com', url: 'mailto:jono@jonoblackburn.com', icon: Mail },
  { name: 'WhatsApp', url: 'https://wa.me/27719691848', icon: MessageCircle },
  { name: 'WhatsApp Channel', url: 'https://lnkd.in/dPizUzb9', icon: MessageCircle },
];

export function Footer({ onOpenGate }: FooterProps) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <footer id="connect" className="relative pt-24 lg:pt-32 pb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-50/50 to-ink-950" />
      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-ink-900 to-ink-950 overflow-hidden p-10 lg:p-16">
              <div className="absolute top-0 right-0 w-96 h-96 bg-copper-600/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-copper-800/10 rounded-full blur-3xl" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-display-md text-white text-balance mb-4">
                    Strategic Availability.
                    <br />
                    <span className="text-copper-400">Focused Impact.</span>
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed max-w-md text-balance">
                    Selectively partnering with founders, executives, and leadership teams navigating high-pressure systems architecture. Limited quarterly engagements to ensure absolute depth.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <button onClick={() => onOpenGate('client')} className="btn-accent">
                    Request Advisory Access
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </button>
                  <a href="mailto:hi@jb3ai.com" className="btn-secondary">
                    <Mail className="w-4 h-4 mr-2" />
                    Direct Email
                  </a>
                  <a href="/contact/" className="btn-secondary">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-copper-600 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">JB</span>
                </div>
                <span className="text-sm font-semibold text-white tracking-tight">Jonathan Blackburn</span>
              </Link>
              <p className="text-sm text-zinc-200 leading-relaxed max-w-md mb-5">
                South African entrepreneur and systems builder.
                Turning operational complexity into structure, clarity, and practical AI for good.
              </p>
              <div className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>South Africa · Global</span>
              </div>
              <div className="mt-4">
                <a href="https://www.jb3ai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-copper-400 hover:text-copper-300 transition-colors inline-flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit JB³Ai Company
                </a>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.1em] mb-4">Products</h4>
              <ul className="space-y-2.5">
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">DukeBox of London</a></li>
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">Isikulo AI</a></li>
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">ClipboardAI</a></li>
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">VoiceGrid AI</a></li>
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">SuperAgents</a></li>
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">InvestigatorAi</a></li>
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">NewsroomAi</a></li>
                <li><a href="#products" className="text-sm text-white/40 hover:text-white transition-colors">ViewGrid</a></li>
              </ul>
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.1em] mb-4">Content</h4>
              <ul className="space-y-2.5">
                <li><a href="#founder" className="text-sm text-white/40 hover:text-white transition-colors">Founder Story</a></li>
                <li><a href="#gtr3" className="text-sm text-white/40 hover:text-white transition-colors">GTR³ Book</a></li>
                <li><a href="#evidence" className="text-sm text-white/40 hover:text-white transition-colors">Evidence</a></li>
                <li><a href="#timeline" className="text-sm text-white/40 hover:text-white transition-colors">Timeline</a></li>
                <li><a href="#insights" className="text-sm text-white/40 hover:text-white transition-colors">Insights</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.1em] mb-4">Support</h4>
              <ul className="space-y-2.5">
                <li><a href="https://buymeacoffee.com/jb3ai" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-1.5"><Coffee className="w-3 h-3" /> Buy Me a Coffee</a></li>
                <li><a href="https://paybru.co.za/communities/the-proof-is-built-now-we-need-launch-fuel" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-1.5"><Heart className="w-3 h-3" /> PayBru (SA)</a></li>
                <li><a href="https://paypal.me/jonoblackburnza" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-1.5"><Globe className="w-3 h-3" /> PayPal</a></li>
                <li><a href="https://ko-fi.com/D0K721OP8E" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-1.5"><Coffee className="w-3 h-3" /> Ko-fi</a></li>
                <li><button onClick={() => onOpenGate('investor')} className="text-sm text-white/40 hover:text-white transition-colors">OS³ Portal</button></li>
                <li><a href="https://www.jb3ai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-1.5"><ExternalLink className="w-3 h-3" /> JB³Ai Company</a></li>
              </ul>
            </div>

            {/* Social Grid */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.1em] mb-4">Connect</h4>
              <div className="grid grid-cols-4 gap-2">
                {socialLinks.slice(0, 12).map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                      title={link.name}
                    >
                      <Icon className="w-4 h-4 text-white/50 hover:text-white" />
                    </a>
                  );
                })}
              </div>
              <div className="mt-4 space-y-2">
                {contactLinks.slice(0, 3).map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="text-sm text-white/40 hover:text-white transition-colors block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Jonathan Blackburn. JB³Ai. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.slice(0, 6).map((link) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/30 hover:text-white transition-colors"
                    title={link.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/os" className="inline-flex items-center gap-2 text-xs text-white/20 hover:text-copper-400 transition-colors duration-300">
              <ArrowUpRight className="w-3 h-3" />
              Private OS³ Portal
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <a
              href={`https://github.com/JB3Ai/JB_PROFILE_WEBSHOWCASE/commit/${__COMMIT_HASH__}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-wider text-white/20 hover:text-copper-400 transition-colors"
              title="View this build on GitHub"
            >
              build {__COMMIT_HASH__}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
