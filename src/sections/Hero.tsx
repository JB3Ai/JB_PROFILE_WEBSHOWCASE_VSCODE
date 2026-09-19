import { motion } from 'framer-motion';
import { ArrowDown, Play, Lock } from 'lucide-react';

interface HeroProps {
  onOpenGate: () => void;
}

export function Hero({ onOpenGate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background: dark gradient only */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-900/70 to-ink-950/50" />

      {/* Subtle ambient light */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-copper-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-copper-800/10 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full section-padding pt-32 pb-20">
        <div className="content-max-width">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 md:bg-white/10 backdrop-blur-none md:backdrop-blur-md border border-white/20 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-none md:animate-pulse" />
                <span className="text-caption uppercase tracking-[0.12em] text-white/80">
                  Founder. Systems Architect. Builder under pressure.
                </span>
              </motion.div>

              <motion.h1 
                className="text-display-xl text-white text-balance mb-6"
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Jono
                <br />
                <span className="text-copper-400">Blackburn</span>
              </motion.h1>

              <motion.p 
                className="text-xl lg:text-2xl font-light text-white/70 tracking-tight text-balance mb-4"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <em className="text-copper-400 font-normal">Chaos is not solved by hope.</em>
                <br />
                <span className="text-white/90">Chaos is solved by systems.</span>
              </motion.p>

              <motion.p 
                className="text-body-lg text-white/50 max-w-lg text-balance mb-10"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                A South African entrepreneur and systems builder turning operational complexity into clarity 
                through smart-home automation, recovery architectures, diagnostics platforms, and practical AI.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="#founder" className="btn-primary">View Founder Story</a>
                <a href="#products" className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                  <Play className="w-4 h-4 mr-2" />
                  Explore Products
                </a>
                <button onClick={onOpenGate} className="btn-accent !bg-copper-600/80 !border-copper-500/30 hover:!bg-copper-600">
                  <Lock className="w-4 h-4 mr-2" />
                  Request Access
                </button>
              </motion.div>
            </div>

            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.95, x: 40 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative max-w-md mx-auto lg:ml-auto">
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src="/assets/images/artwork-curated/founder-profile-side.jpg" 
                      alt="Jonathan Blackburn"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                    <motion.div 
                      className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/90"
                      animate={{ y: [0, -5, 0] }} 
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      Systems Architect
                    </motion.div>
                    <motion.div 
                      className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-copper-600/80 backdrop-blur-md border border-copper-400/20 text-xs text-white"
                      animate={{ y: [0, 5, 0] }} 
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      Available for Advisory
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <span className="text-caption uppercase tracking-[0.12em] text-copper-400 mb-2 block">Founder Profile</span>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Jonathan Blackburn is a South African entrepreneur and systems builder whose work spans 
                      smart-home automation, recovery service structures, diagnostics, laboratory systems, and JB³.
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex gap-4">
                        <div><span className="block text-lg font-semibold text-white">20+</span><span className="text-xs text-white/50">Years Building</span></div>
                        <div><span className="block text-lg font-semibold text-white">6</span><span className="text-xs text-white/50">Companies</span></div>
                        <div><span className="block text-lg font-semibold text-white">4</span><span className="text-xs text-white/50">Industries</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-copper-500/20 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-copper-600/10 blur-2xl" />
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.a 
              href="#founder" 
              className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
              animate={{ y: [0, 8, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-xs uppercase tracking-[0.15em]">Scroll</span>
              <ArrowDown className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
