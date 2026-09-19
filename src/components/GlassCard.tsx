import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = true, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white/95 md:bg-white/60 backdrop-blur-none md:backdrop-blur-xl border border-ink-200/50',
        'shadow-elevated transition-shadow duration-500',
        hover && 'hover:shadow-glass-lg hover:border-ink-300/60',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={hover ? { y: -4, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } } : undefined}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-copper-50/20 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
