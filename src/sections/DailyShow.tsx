import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { Play, Youtube, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';

export function DailyShow() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="daily-show" className="relative min-h-[300px] w-full py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />

      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <SectionHeader
            label="Content"
            title="JB³ The Daily Logic Show."
            align="left"
            light
          />

          <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Show visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/assets/images/artwork-curated/daily-show-cover.jpg"
                  alt="JB³ The Daily Logic Show"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-md bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-none md:animate-pulse" />
                      Live
                    </span>
                    <span className="px-2 py-1 rounded-md bg-white/10 text-white/70 text-[10px] font-medium">
                      @JB3DAILYSHOW
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-white tracking-tight">
                    Late Night Logic
                  </h3>
                  <p className="text-sm text-white/50 mt-1">
                    Episode 01: Welcome to the Blueprint
                  </p>
                </div>
                <a 
                  href="https://www.youtube.com/@JB3AiTheDailyLogicShow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/25 md:bg-white/20 backdrop-blur-none md:backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors group"
                >
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </a>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-copper-600/20 border border-copper-500/30 text-copper-400 text-xs font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                New Episodes Weekly
              </div>

              <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight mb-4">
                Systems, stories, and the unfiltered truth about building under pressure.
              </h2>
              
              <p className="text-lg text-white/60 leading-relaxed mb-8 text-balance">
                The Daily Logic Show is where raw founder experience meets practical systems thinking. 
                No pitch decks. No motivational fluff. Just the truth about what it takes to build 
                companies, survive collapse, and keep climbing. Hosted by Jonathan Blackburn.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Youtube className="w-5 h-5 text-red-400 mx-auto mb-2" />
                  <span className="block text-xl font-semibold text-white">YouTube</span>
                  <span className="text-xs text-white/50">Primary Channel</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Calendar className="w-5 h-5 text-copper-400 mx-auto mb-2" />
                  <span className="block text-xl font-semibold text-white">Weekly</span>
                  <span className="text-xs text-white/50">New Episodes</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Play className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <span className="block text-xl font-semibold text-white">Live</span>
                  <span className="text-xs text-white/50">Late Night Logic</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.youtube.com/@JB3AiTheDailyLogicShow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-accent"
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  Watch on YouTube
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
                <a 
                  href="https://www.youtube.com/@JonoBlackburn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                >
                  Personal Channel
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
                <a 
                  href="https://www.youtube.com/@JB3Ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  JB³ Channel
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
