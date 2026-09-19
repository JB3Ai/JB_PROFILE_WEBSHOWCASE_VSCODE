import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const BOOT_SESSION_KEY = 'jb-boot-seen'

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    // Cinematic timing sequence
    const timer1 = setTimeout(() => setStep(1), 600)  // Logo appears
    const timer2 = setTimeout(() => setStep(2), 2000) // Secondary text
    const timer3 = setTimeout(() => setStep(3), 3200) // System Ready
    const timer4 = setTimeout(() => onComplete(), 4200) // Trigger exit

    // Use the boot window as a buffer: warm the cache with the first
    // below-the-fold images so they are ready before the user scrolls.
    const preload = [
      '/assets/images/artwork-curated/dukebox-project.jpg',
      '/assets/images/artwork-curated/isikolo-web.jpg',
      '/assets/images/artwork-curated/clipboard-product.jpg',
      '/assets/images/artwork-curated/voicegrid-interface.jpg',
      '/assets/images/artwork-curated/superagents-registry.jpg',
      '/assets/images/ndebele-pattern.jpg',
    ];
    preload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] text-[#F4EEDC]"
      exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex flex-col items-center justify-center h-40">

        {/* Phase 1: The JB3 Monogram */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, letterSpacing: "0px", filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "4px", filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="text-6xl md:text-7xl font-serif font-bold text-[#B48A4A] mb-8"
            >
              JB³
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: The Precision Gold Line */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "240px", opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
              className="h-[1px] bg-[#B48A4A]/20 mb-6 overflow-hidden relative"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "240px" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute top-0 bottom-0 w-1/3 bg-[#D1AC74] shadow-[0_0_8px_rgba(209,172,116,0.8)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Minimalist Architecture Text */}
        <div className="h-6 overflow-hidden flex items-center justify-center text-xs tracking-[0.2em] uppercase text-[#F4EEDC]/50 font-sans">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.span
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="absolute"
              >
                Initiating OS³ Architecture
              </motion.span>
            )}
            {step === 2 && (
              <motion.span
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="absolute"
              >
                Loading Intelligence Modules
              </motion.span>
            )}
            {step === 3 && (
              <motion.span
                key="step3"
                initial={{ opacity: 0, y: 15, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="absolute text-[#D1AC74] font-medium"
              >
                System Ready
              </motion.span>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  )
}
