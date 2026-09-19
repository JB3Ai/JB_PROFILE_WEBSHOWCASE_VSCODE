import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Calendar, Users, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { GlassCard } from '@/components/GlassCard';

export function BookLaunch() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800" />
      
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Book visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative max-w-sm mx-auto lg:mx-0">
                {/* Book cover mockup */}
                <div className="relative aspect-[3/4] rounded-2xl bg-gradient-to-br from-copper-600 via-copper-700 to-ink-900 
                                shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <BookOpen className="w-12 h-12 text-copper-200/40 mb-6" strokeWidth={1} />
                    <h3 className="text-3xl lg:text-4xl font-light text-white/90 tracking-tight leading-tight">
                      Chaos Is Solved
                      <br />
                      <span className="text-copper-300">by Systems</span>
                    </h3>
                    <div className="mt-6 w-16 h-px bg-copper-400/30" />
                    <p className="mt-6 text-sm text-white/50 uppercase tracking-[0.2em]">
                      Jonathan Blackburn
                    </p>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 px-4 py-2 bg-copper-500 text-white text-xs font-semibold 
                             rounded-full shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Coming Q3 2026
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-copper-400 text-caption uppercase tracking-[0.15em] mb-4">
                <Sparkles className="w-4 h-4" />
                Forthcoming Publication
              </span>
              
              <h2 className="text-display-md text-white text-balance mb-6">
                The founder's operating manual for building under pressure.
              </h2>
              
              <p className="text-lg text-white/60 leading-relaxed mb-8 text-balance">
                A practical framework for transforming operational chaos into structured, 
                scalable systems. For founders who need results, not rhetoric.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <GlassCard className="p-4 !bg-white/5 !border-white/10 !shadow-none">
                  <Users className="w-5 h-5 text-copper-400 mb-2" />
                  <span className="block text-2xl font-semibold text-white">1,200+</span>
                  <span className="text-xs text-white/50">Pre-orders</span>
                </GlassCard>
                <GlassCard className="p-4 !bg-white/5 !border-white/10 !shadow-none">
                  <Calendar className="w-5 h-5 text-copper-400 mb-2" />
                  <span className="block text-2xl font-semibold text-white">Q3</span>
                  <span className="text-xs text-white/50">2026 Launch</span>
                </GlassCard>
                <GlassCard className="p-4 !bg-white/5 !border-white/10 !shadow-none">
                  <BookOpen className="w-5 h-5 text-copper-400 mb-2" />
                  <span className="block text-2xl font-semibold text-white">12</span>
                  <span className="text-xs text-white/50">Chapters</span>
                </GlassCard>
              </div>

              {/* CTA */}
              <button className="btn-accent">
                Reserve Your Copy
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
