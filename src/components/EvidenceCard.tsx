import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { FileText, Award, FileCheck, MessageSquare, Lock, Maximize2, Play } from 'lucide-react';
import type { EvidenceItem } from '@/types';

const IMAGE_RE = /\.(png|jpe?g|webp|gif)$/i;

const typeIcons: Record<string, any> = {
  publication: FileText,
  certificate: FileCheck,
  award: Award,
  recommendation: MessageSquare,
};

/**
 * Warm-metallic accent per evidence type. Tonal variety inside the
 * Heritage Gold / copper family, never rainbow neon.
 */
const ACCENTS: Record<string, { glow: string; chip: string; scrim: string; text: string }> = {
  award: {
    glow: 'rgba(240, 184, 90, 0.28)',
    chip: 'from-[#f0c878] to-[#c98f3d]',
    scrim: 'rgba(201, 143, 61, 0.35)',
    text: 'text-[#f0c878]',
  },
  certificate: {
    glow: 'rgba(200, 127, 74, 0.26)',
    chip: 'from-[#e0a06a] to-[#a8632f]',
    scrim: 'rgba(168, 99, 47, 0.35)',
    text: 'text-[#e0a06a]',
  },
  publication: {
    glow: 'rgba(209, 104, 60, 0.24)',
    chip: 'from-[#e8855a] to-[#b04a28]',
    scrim: 'rgba(176, 74, 40, 0.35)',
    text: 'text-[#e8855a]',
  },
  recommendation: {
    glow: 'rgba(228, 200, 143, 0.24)',
    chip: 'from-[#ecd9a8] to-[#c2a05e]',
    scrim: 'rgba(194, 160, 94, 0.35)',
    text: 'text-[#ecd9a8]',
  },
};

interface EvidenceCardProps {
  item: EvidenceItem;
  onViewDocument: (url: string) => void;
  onViewVideo: (url: string) => void;
}

export function EvidenceCard({ item, onViewDocument, onViewVideo }: EvidenceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = typeIcons[item.type] || FileText;
  const accent = ACCENTS[item.type] || ACCENTS.publication;

  // Pointer position as 0..100 percentages
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const sx = useSpring(px, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 260, damping: 26, mass: 0.6 });

  const rotateX = useTransform(sy, [0, 100], [7, -7]);
  const rotateY = useTransform(sx, [0, 100], [-9, 9]);
  const glare = useMotionTemplate`radial-gradient(460px circle at ${sx}% ${sy}%, rgba(255, 240, 214, 0.09), transparent 62%)`;

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width) * 100);
    py.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const resetPointer = () => {
    px.set(50);
    py.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      className="group relative h-full"
    >
      {/* Accent glow bloom behind the card */}
      <div
        aria-hidden
        className="absolute -inset-1 rounded-[20px] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${accent.glow}, transparent 75%)` }}
      />

      {/* Card body */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#1b1e27] to-[#101218] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition-[border-color,box-shadow] duration-500 group-hover:border-white/[0.14] group-hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.85)]">

        {/* Thumbnail header */}
        {item.thumbnail && (
          <div className="relative h-36 overflow-hidden">
            <img
              src={item.thumbnail}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-80 saturate-[0.85] transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-95 group-hover:saturate-100"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${accent.scrim} 0%, rgba(16,18,24,0.35) 45%, #101218 100%)`,
              }}
            />
            {/* Floating icon chip, raised on the Z axis */}
            <div
              style={{ transform: 'translateZ(34px)' }}
              className={`absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${accent.chip} shadow-[0_8px_20px_-6px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.35)]`}
            >
              <Icon className="h-5 w-5 text-[#1d1409]" strokeWidth={2.2} />
            </div>
            {item.visibility === 'Investor Only' && (
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/75 backdrop-blur-sm">
                <Lock className="h-3 w-3" />
                Private
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative p-5" style={{ transform: 'translateZ(18px)' }}>
          <h4 className="mb-1.5 text-[15px] font-semibold tracking-tight text-white">
            {item.title}
          </h4>
          <p className="mb-3 text-[13px] leading-relaxed text-white/55">
            {item.description}
          </p>

          {item.value && (
            <span className="mb-3 inline-block rounded-md bg-gradient-to-r from-[#f0c878] to-[#c98f3d] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#241708] shadow-[0_4px_12px_-4px_rgba(201,143,61,0.7)]">
              {item.value}
            </span>
          )}

          <div className="flex items-center gap-4">
            {item.fileUrl && (
              IMAGE_RE.test(item.fileUrl) ? (
                <button
                  onClick={() => onViewDocument(item.fileUrl!)}
                  className={`inline-flex items-center text-[13px] font-medium ${accent.text} transition-opacity hover:opacity-80`}
                >
                  View Document
                  <Maximize2 className="ml-1 h-3.5 w-3.5" />
                </button>
              ) : (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center text-[13px] font-medium ${accent.text} transition-opacity hover:opacity-80`}
                >
                  View Document
                  <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              )
            )}
            {item.videoUrl && (
              <button
                onClick={() => onViewVideo(item.videoUrl!)}
                className={`inline-flex items-center text-[13px] font-medium ${accent.text} transition-opacity hover:opacity-80`}
              >
                View Video
                <Play className="ml-1 h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Specular highlight tracking the pointer */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
      </div>
    </motion.div>
  );
}
