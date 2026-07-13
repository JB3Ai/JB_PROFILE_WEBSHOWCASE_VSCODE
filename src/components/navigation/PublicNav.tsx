import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PremiumButton } from '../primitives'
import { scrollToSection } from '../../utils/scrollToSection'
import { assetRegistry } from '../../data/assetRegistry'

const navLinks = [
  { id: 'founder', label: 'Founder' },
  { id: 'product-architecture', label: 'Projects' },
  { id: 'gtr3', label: 'GTR³' },
  { id: 'connect', label: 'Connect' }
] as const

const sectionIds = [
  'hero',
  'founder',
  'product-architecture',
  'gtr3',
  'connect'
] as const

export default function PublicNav() {
  const nav = useNavigate()
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky z-40 px-4 transition-all duration-300 ${scrolled ? 'top-2 pt-2 md:top-3 md:pt-3' : 'top-3 pt-4 md:top-4'}`}>
      <div className="container-shell-wide">
        <div className={`public-nav-shell transition-all duration-300 ${scrolled ? 'md:px-4 md:py-2.5 shadow-[0_14px_34px_rgba(44,33,20,0.14)]' : ''}`}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="public-nav-brand">
              <img
                src={assetRegistry.logoMark}
                alt="Jonathan Blackburn OS logo mark"
                className="h-8 w-8 rounded-full border border-[rgba(140,108,70,0.24)] bg-white/80 p-1.5"
              />
              <div>
                <div className="text-sm font-semibold tracking-[-0.01em] text-[var(--text-primary)]">Jonathan Blackburn OS</div>
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
                Enter Exclusive Portal
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
