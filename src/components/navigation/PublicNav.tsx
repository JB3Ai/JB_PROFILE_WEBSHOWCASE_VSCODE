import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PremiumButton } from '../primitives'
import { scrollToSection } from '../../utils/scrollToSection'
import { assetRegistry } from '../../data/assetRegistry'
import { buildRequestAccessRoute } from '../../data/contactConfig'

const navLinks = [
  { id: 'founder-brief', label: 'Founder' },
  { id: 'projects', label: 'Projects' },
  { id: 'video-vault', label: 'Media' },
  { id: 'evidence-vault', label: 'Evidence' },
  { id: 'investor-room', label: 'Investor' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'gtr3', label: 'GTR³' },
  { id: 'connect', label: 'Connect' }
] as const

const sectionIds = [
  'hero',
  'founder-brief',
  'projects',
  'video-vault',
  'jb3-daily-show',
  'public-feed',
  'evidence-vault',
  'investor-room',
  'timeline',
  'gtr3',
  'connect'
] as const

export default function PublicNav() {
  const nav = useNavigate()
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) return undefined

    if (typeof IntersectionObserver !== 'undefined') {
      const visibleSections = new Set<string>()
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.add(entry.target.id)
            } else {
              visibleSections.delete(entry.target.id)
            }
          })

          const currentSection = [...sectionIds].reverse().find((sectionId) => visibleSections.has(sectionId)) ?? 'hero'
          setActiveSection((prev) => (prev === currentSection ? prev : currentSection))
        },
        {
          rootMargin: '-28% 0px -52% 0px',
          threshold: [0.1, 0.25, 0.5, 0.75]
        }
      )

      sections.forEach((section) => observer.observe(section))
      return () => observer.disconnect()
    }

    let frame: number | null = null
    const updateActiveSection = () => {
      frame = null
      let currentSection = 'hero'

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 160) {
          currentSection = section.id
        }
      }

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection))
    }

    const handleScroll = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <div className="sticky top-3 z-40 px-4 pt-4 md:top-4 md:px-6">
      <div className="container-shell-wide">
        <div className="public-nav-shell">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="public-nav-brand">
              <img
                src={assetRegistry.logoMark}
                alt="Jonathan Blackburn OS logo mark"
                className="h-8 w-8 rounded-full border border-white/10 bg-white/5 p-1.5"
              />
              <div>
                <div className="text-sm font-semibold tracking-[-0.01em] text-white">Jonathan Blackburn OS</div>
                <div className="public-nav-caption">Founder platform</div>
              </div>
            </div>

            <div className="public-nav-links">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`public-nav-link ${activeSection === link.id ? 'public-nav-link-active' : ''}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="public-nav-actions">
              <PremiumButton variant="secondary" size="sm" onClick={() => nav('/login')}>
                Preview Private OS
              </PremiumButton>
              <PremiumButton
                variant="accent"
                size="sm"
                onClick={() =>
                  nav(
                    buildRequestAccessRoute({
                      track: 'public-nav',
                      reason: 'General access request',
                      next: 'Request a conversation'
                    })
                  )
                }
              >
                Request Access
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
