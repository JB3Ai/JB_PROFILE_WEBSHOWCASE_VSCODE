import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { timelineEvents } from '@/data/timeline';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  foundation: 'bg-stone-100 text-stone-600 border-stone-200',
  enterprise: 'bg-copper-100 text-copper-600 border-copper-200',
  recovery: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  healthcare: 'bg-blue-50 text-blue-600 border-blue-200',
  crisis: 'bg-red-50 text-red-600 border-red-200',
  forensics: 'bg-purple-50 text-purple-600 border-purple-200',
  ai: 'bg-amber-50 text-amber-600 border-amber-200',
  future: 'bg-ink-100 text-ink-600 border-ink-200',
};

export function Timeline() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="timeline" className="relative min-h-[300px] w-full py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-100 via-copper-50/60 to-warm-100 texture-weave" />
      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <SectionHeader
            label="Timeline"
            title="The founder path behind the systems."
            description="After the platform and Isikulo mission are clear, the public journey returns to the 
                         chapters that shaped the work: engineering, recovery, care, diagnostics, rebuilding."
          />

          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ink-200 via-ink-200 to-transparent" />
            <div className="space-y-12">
              {timelineEvents.map((event, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={event.id}
                    className={cn('relative flex items-start gap-6 lg:gap-0', isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse')}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={cn('flex-1 lg:w-1/2', isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12')}>
                      <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-3', categoryColors[event.category] || 'bg-warm-100 text-ink-600')}>
                        {event.category}
                      </div>
                      <span className="block text-sm font-semibold text-copper-600 mb-1">{event.year}</span>
                      <h4 className="text-lg font-semibold text-ink-900 tracking-tight mb-2">{event.title}</h4>
                      <p className="text-sm text-ink-500 leading-relaxed max-w-sm">{event.description}</p>
                      {event.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-3 justify-start lg:justify-end">
                          {event.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-warm-100 text-ink-500 text-[10px] font-medium">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="absolute left-6 lg:left-1/2 w-3 h-3 rounded-full bg-copper-500 border-2 border-white shadow-md -translate-x-1/2 mt-2 z-10" />
                    <div className="hidden lg:block lg:w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
