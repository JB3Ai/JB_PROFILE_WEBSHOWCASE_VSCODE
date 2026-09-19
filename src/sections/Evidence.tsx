import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { publicEvidence } from '@/data/evidence';
import { EvidenceCard } from '@/components/EvidenceCard';
import { X } from 'lucide-react';

export function Evidence() {
  const { ref, isVisible } = useScrollReveal();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox && !video) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setLightbox(null); setVideo(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, video]);
  return (
    <section id="evidence" className="relative min-h-[300px] w-full py-24 lg:py-32">
      {/* Dark proof vault backdrop with warm metallic glows */}
      <div className="absolute inset-0 bg-[#0c0e13]" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(52% 42% at 18% 8%, rgba(201,143,61,0.14), transparent 70%),' +
            'radial-gradient(46% 40% at 84% 20%, rgba(209,104,60,0.10), transparent 70%),' +
            'radial-gradient(60% 50% at 50% 100%, rgba(240,200,120,0.07), transparent 72%)',
        }}
      />
      <div className="absolute inset-0 texture-grain opacity-60" />
      <div className="relative z-10 section-padding" ref={ref}>
        <div className="content-max-width">
          <SectionHeader
            light
            label="Evidence"
            title="The Architecture of Proof"
            description="Verified documents, awards, certificates, recommendations, and historical proof layers. 
                         Not pitch-deck claims. Evidence that stands up."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
            {publicEvidence.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <EvidenceCard
                  item={item}
                  onViewDocument={setLightbox}
                  onViewVideo={setVideo}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 md:bg-ink-950/80 backdrop-blur-none md:backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close preview"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-ink-100 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={lightbox}
                alt="Evidence document preview"
                className="w-full max-h-[82vh] object-contain rounded-xl bg-white shadow-2xl border border-ink-100"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {video && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 md:bg-ink-950/85 backdrop-blur-none md:backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideo(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideo(null)}
                aria-label="Close video"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-ink-100 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <video
                src={video}
                controls
                autoPlay
                className="w-full max-h-[82vh] rounded-xl bg-black shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
