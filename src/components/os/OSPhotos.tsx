import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, X } from 'lucide-react';

interface Photo {
  src: string;
  caption: string;
}

const photos: Photo[] = [
  { src: '/assets/images/foundersmall.jpg', caption: 'Jonathan Blackburn, founder portrait' },
  { src: '/assets/images/artwork-curated/founder-profile-side.jpg', caption: 'Founder profile' },
  { src: '/assets/images/artwork-curated/founder-studio.jpg', caption: 'Studio session' },
  { src: '/assets/images/artwork-curated/founder-editorial-bw.jpg', caption: 'Editorial series' },
  { src: '/assets/images/founder-imed-team.jpg', caption: 'The iMED chapter, with the team' },
  { src: '/assets/images/evidence-top-empowerment.jpg', caption: 'Top Empowerment Awards 2022, finalist' },
  { src: '/assets/images/evidence-jewish-achiever.jpg', caption: 'Absa Jewish Achiever Awards 2022, finalist' },
  { src: '/assets/images/cediaaward.JPG', caption: 'CEDIA recognition, Elite Technologies' },
  { src: '/assets/images/evidence-topco-magazine.jpg', caption: 'Impumelelo magazine feature, Topco Media' },
];

export default function OSPhotos() {
  const [active, setActive] = useState<Photo | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-1">
        <div className="w-9 h-9 rounded-lg bg-copper-600/20 flex items-center justify-center shrink-0">
          <Images className="w-4.5 h-4.5 text-copper-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Photo Album</h3>
          <p className="text-xs text-white/40">Founder, press, and the journey so far</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {photos.map((photo) => (
          <button
            key={photo.src}
            onClick={() => setActive(photo)}
            className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-copper-500/40 transition-colors"
            title={photo.caption}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
      <p className="text-[11px] text-white/30">Select any image to view it full size.</p>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[250] flex items-center justify-center bg-ink-950/85 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
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
                onClick={() => setActive(null)}
                aria-label="Close photo"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-lg border border-white/20 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={active.src}
                alt={active.caption}
                className="w-full max-h-[75vh] object-contain rounded-xl bg-ink-900 shadow-2xl border border-white/10"
              />
              <p className="mt-3 text-center text-xs text-white/50">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
