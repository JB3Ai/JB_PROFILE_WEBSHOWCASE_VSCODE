import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { ArrowUpRight } from 'lucide-react';

export function Founder() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="founder" className="relative pt-24 pb-6 lg:pt-32 lg:pb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-warm-50/50 texture-grain" />
      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <SectionHeader
            label="Founder"
            title="Twenty-five years of building."
            description="From electronics and automation to recovery systems, iMED, JB³, and OS³. 
                         Built through collapse, rebuilt through discipline, and still climbing."
          />

          <a
            href="https://web4-new-launch.jono-18a.workers.dev/"
            className="group relative mt-16 flex min-h-[360px] items-end overflow-hidden rounded-2xl border border-white/20 bg-slate-950 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-teal-400 sm:min-h-[400px]"
          >
            <img
              src="/assets/images/analogbanner.png"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-30 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/35 to-transparent" />
            <div className="relative max-w-2xl p-7 sm:p-12 lg:p-14">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">Inside the workshop</p>
              <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">Latest projects<br />&amp; demos.</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white">Explore what I’m building. Discover the projects, watch the demos, and take a closer look.</p>
              <span className="mt-8 inline-flex items-center gap-3 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950">
                Explore projects <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
              </span>
            </div>
          </a>

          <motion.div
            className="mt-6 sm:mt-8 rounded-2xl bg-gradient-to-br from-ink-900 to-ink-950 p-8 lg:p-12 text-white overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-copper-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-copper-800/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <blockquote className="text-xl lg:text-2xl font-light leading-relaxed text-white/90 max-w-3xl text-balance">
                "The knowledge gathered across addiction, recovery, electronics, engineering, laboratories, 
                compliance, leadership, fatherhood, and failure now converges in JB³. The foundation is a 
                philosophy shaped by lived experience: people are often broken by complexity long before 
                the systems around them fail."
              </blockquote>
              <footer className="mt-6 text-sm text-white/50">
                - Jonathan Blackburn, from the GTR³ manuscript
              </footer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
