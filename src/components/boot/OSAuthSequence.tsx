import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OSAuthSequenceProps {
  onComplete: () => void
  userEmail?: string
}

export default function OSAuthSequence({ onComplete, userEmail = 'Guest' }: OSAuthSequenceProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    // A slightly faster, more clinical sequence for the secure entry
    const timer1 = setTimeout(() => setStep(1), 400)   // Auth Ring appears
    const timer2 = setTimeout(() => setStep(2), 1500)  // Verifying
    const timer3 = setTimeout(() => setStep(3), 2600)  // Decrypting
    const timer4 = setTimeout(() => setStep(4), 3800)  // Access Granted
    const timer5 = setTimeout(() => onComplete(), 4800) // Route to dashboard

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] text-[#F4EEDC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-center h-48 w-full max-w-md">

        {/* The Authentication Ring */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex items-center justify-center h-16 w-16 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-t-[#B48A4A] border-r-transparent border-b-[#B48A4A]/20 border-l-transparent"
              />
              <div className="h-2 w-2 bg-[#D1AC74] rounded-full shadow-[0_0_10px_rgba(209,172,116,0.8)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clinical Security Readout */}
        <div className="h-8 overflow-hidden flex items-center justify-center text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#F4EEDC]/60 font-sans">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.span
                key="auth1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                Establishing Secure Connection
              </motion.span>
            )}
            {step === 2 && (
              <motion.span
                key="auth2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                Verifying Clearance: {userEmail}
              </motion.span>
            )}
            {step === 3 && (
              <motion.span
                key="auth3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                Decrypting Intelligence Modules
              </motion.span>
            )}
            {step === 4 && (
              <motion.span
                key="auth4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, filter: "drop-shadow(0 0 8px rgba(209,172,116,0.5))" }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute text-[#D1AC74] font-bold tracking-[0.3em]"
              >
                ACCESS GRANTED
              </motion.span>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  )
}
