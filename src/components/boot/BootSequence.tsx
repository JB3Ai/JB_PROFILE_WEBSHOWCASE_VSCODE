import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const BOOT_SESSION_KEY = 'jonathan-blackburn-os-boot-seen'

const bootLines = [
  'Founder profile loaded',
  'Systems history loaded',
  'Evidence vault standing by',
  'Project showcase online',
  'Investor room secured',
  'GTR³ preview loading'
] as const

type BootSequenceProps = {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const prefersReducedMotion = useReducedMotion()
  const durationMs = prefersReducedMotion ? 2600 : 3000
  const fadeOutMs = prefersReducedMotion ? 200 : 800
  const [isFadingOut, setIsFadingOut] = useState(false)
  const completionRequestedRef = useRef(false)

  const startFadeOut = useCallback(() => {
    if (completionRequestedRef.current) return
    completionRequestedRef.current = true
    setIsFadingOut(true)

    window.setTimeout(() => {
      onComplete()
    }, fadeOutMs)
  }, [fadeOutMs, onComplete])

  useEffect(() => {
    const timer = window.setTimeout(startFadeOut, durationMs)

    return () => window.clearTimeout(timer)
  }, [durationMs, startFadeOut])

  return (
    <motion.div
      className="boot-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: fadeOutMs / 1000, ease: 'easeOut' } }}
      transition={{
        duration: isFadingOut ? fadeOutMs / 1000 : prefersReducedMotion ? 0.2 : 0.55,
        ease: 'easeOut'
      }}
    >
      <div className="boot-orb left-[12%] top-[10%] h-44 w-44 bg-cyan-300/18" />
      <div className="boot-orb right-[10%] top-[18%] h-36 w-36 bg-emerald-300/14" />
      <div className="boot-orb bottom-[12%] left-[30%] h-32 w-32 bg-amber-200/10" />

      <div className="boot-backdrop-grid" />

      <div className="container-shell-wide relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <motion.div
          className="boot-panel"
          initial={prefersReducedMotion ? { opacity: 0.98 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease: 'easeOut' }}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Founder Profile Layer</p>
              <h1 className="mt-5 text-display boot-title">INITIALISING JONATHAN BLACKBURN OS</h1>
            </div>

            <button type="button" onClick={startFadeOut} className="boot-skip">
              Skip
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {bootLines.map((line, index) => (
              <motion.div
                key={line}
                className="boot-line"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0.05 * index : 0.28 + index * 0.24,
                  duration: prefersReducedMotion ? 0.15 : 0.38,
                  ease: 'easeOut'
                }}
              >
                <span className="status-dot status-dot-cyan mt-1 shrink-0" />
                <span className="text-body">{line}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0.15 : 1.55,
              duration: prefersReducedMotion ? 0.18 : 0.45
            }}
          >
            <p className="boot-quote">Chaos is not solved by hope. Chaos is solved by systems.</p>
          </motion.div>

          <div className="mt-10 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-caption">Preview Layer</p>
              <p className="text-body-sm">Preparing public profile surface</p>
            </div>

            <div className="boot-progress-track">
              <motion.div
                className="boot-progress-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: durationMs / 1000, ease: 'easeInOut' }}
                style={{ transformOrigin: 'left center' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
