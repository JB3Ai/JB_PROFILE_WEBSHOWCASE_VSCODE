import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { gtr3Content } from '@/data/gtr3';
import { BookOpen, ArrowUpRight } from 'lucide-react';

export function GTR3() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="gtr3" className="relative min-h-[300px] w-full py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-copper-50/50 via-white to-warm-50/50" />
      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              className="inline-block text-caption uppercase tracking-[0.15em] text-copper-600 mb-4"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
            >
              Forthcoming Publication
            </motion.span>
            <motion.h2
              className="text-display-md text-ink-900 text-balance mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              GTR³: The Journey of Breaking, Building, and Becoming
            </motion.h2>
            <motion.p
              className="text-body-lg text-ink-500 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Three decades, three industries, three extraordinary periods of rebuilding.
              Fall. Rise. Rebuild. Evolve. Not once, but three times.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {gtr3Content.chapters.map((chapter, i) => (
              <motion.div
                key={chapter.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl bg-white border border-ink-100 hover:border-copper-300 transition-all duration-300 hover:shadow-lg"
              >
                <span className="text-4xl font-light text-copper-300 mb-4 block">0{i + 1}</span>
                <h3 className="text-lg font-semibold text-ink-900 tracking-tight mb-3">{chapter.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{chapter.summary}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {gtr3Content.themes.map((theme, i) => (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 rounded-xl bg-warm-50 border border-ink-100"
              >
                <h4 className="text-sm font-semibold text-ink-900 mb-1">{theme.title}</h4>
                <p className="text-xs text-ink-500 leading-relaxed">{theme.summary}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-950 p-8 lg:p-10 text-white overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-copper-600/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
              {/* Book cover visual */}
              <div className="shrink-0 mx-auto lg:mx-0">
                <div className="relative w-44 lg:w-52">
                  <img
                    src="/assets/images/gtr3-book-coming-soon.jpg"
                    alt="GTR³ - Coming Soon. The Rebuild Journey, written by Jono Blackburn"
                    loading="lazy"
                    decoding="async"
                    width={784}
                    height={1120}
                    className="w-full rounded-xl shadow-2xl border border-white/10 -rotate-2 hover:rotate-0 transition-transform duration-500"
                  />
                  <span className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-copper-500 text-white text-[11px] font-semibold shadow-lg">
                    Coming Soon
                  </span>
                </div>
              </div>
              <div className="flex-1 max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-copper-400" />
                  <span className="text-xs uppercase tracking-[0.15em] text-copper-400">Coming Soon</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Reserve GTR³ Limited Edition</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Sponsor my build time and reserve a limited edition physical copy of the GTR³ manuscript. 
                  The third GT-R has not yet arrived. Unlike most memoirs, this story is being written during 
                  the climb, while the outcome remains uncertain and the final chapter is still unfolding.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://paypal.me/jonoblackburnza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                >
                  Reserve Now - R900 / $50
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
                <a href="/contact/" className="btn-secondary">
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
