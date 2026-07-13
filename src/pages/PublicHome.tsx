import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BootSequence, { BOOT_SESSION_KEY } from '../components/boot/BootSequence'
import PublicNav from '../components/navigation/PublicNav'
import { PremiumButton } from '../components/primitives'
import AssetThumbnail from '../components/media/AssetThumbnail'
import AppPortfolioCard, { type AppPortfolioCardProps } from '../components/public/AppPortfolioCard'
import ConnectStrip from '../components/public/ConnectStrip'
import EditorialSection from '../components/public/EditorialSection'
import FounderManualSection from '../components/public/FounderManualSection'
import FounderPhaseStrip from '../components/public/FounderPhaseStrip'
import GTR3Spotlight from '../components/public/GTR3Spotlight'
import ManifestoPanel from '../components/public/ManifestoPanel'
import ProofBand, { type ProofBandItem } from '../components/public/ProofBand'
import SupportWorkStrip from '../components/public/SupportWorkStrip'
import { dailyShowEpisodes } from '../content/dailyShow.content'
import { evidenceItems } from '../content/evidence.content'
import { feedPosts } from '../content/feed.content'
import { founderProfile } from '../content/founder.content'
import { gtr3Content } from '../content/gtr3.content'
import { investorRecords } from '../content/investor.content'
import { homepageContactLinks } from '../content/social.content'
import { timelineEvents } from '../content/timeline.content'
import { videos } from '../content/videos.content'
import { assetRegistry } from '../data/assetRegistry'
import { buildRequestAccessRoute } from '../data/contactConfig'
import { pageMetadata } from '../data/siteMetadata'
import { usePageMetadata } from '../hooks/usePageMetadata'
import { scrollToSection } from '../utils/scrollToSection'

const batch01SelectedCards: AppPortfolioCardProps[] = [
  {
    name: 'OS³ Dash',
    category: 'Founder OS³ / Operating Dashboard',
    status: 'Command Dashboard',
    shortDescription: 'Structure, visibility, and daily command for complex work.',
    detail:
      'OS³ Dash is a founder operating dashboard concept for organising priorities, approvals, workflows, and execution signals into one clearer command layer.',
    imageSrc: assetRegistry.os3DashCommandDashboard,
    imageAlt: 'OS³ Dash command dashboard concept showing structured workflow visibility.',
    primaryCtaLabel: 'Preview OS³ Dash',
    secondaryCtaLabel: 'Request Access',
    riskNote: 'Private OS³ access, backend workflows, and operational dashboards remain gated.'
  },
  {
    name: 'JB³Ai Super Agent OS',
    category: 'AI Workforce Architecture',
    status: 'Command Architecture',
    shortDescription: 'A managed AI workforce architecture for structured execution.',
    detail:
      'JB³Ai Super Agent OS coordinates specialist AI-assisted roles across operations, research, development, creative work, growth, finance, legal support, voice, and founder workflows while keeping human approval and oversight central.',
    imageSrc: assetRegistry.jb3aiSuperAgentOsArchitecture,
    imageAlt: 'JB³Ai Super Agent OS architecture concept showing coordinated specialist workflows.',
    primaryCtaLabel: 'Preview Super Agent OS',
    secondaryCtaLabel: 'View Architecture',
    riskNote: 'Human oversight remains central; no autonomous replacement or private workflow claims are approved.'
  },
  {
    name: 'ClipboardAi',
    category: 'Private Workspace',
    status: 'Controlled Collaboration',
    shortDescription: 'A structured workspace for communication, documents, and coordinated action.',
    detail:
      'ClipboardAi is a private workspace concept for organising communication, document sharing, team coordination, and follow-through in one controlled collaboration environment.',
    imageSrc: assetRegistry.clipboardAiPrivateWorkspace,
    imageAlt: 'ClipboardAi private workspace concept for structured communication and document coordination.',
    primaryCtaLabel: 'Preview ClipboardAi',
    secondaryCtaLabel: 'Request Workspace Review',
    resourceLinks: [
      {
        label: 'View cut sheet',
        href: '/assets/pdfs/OS³ ClipboardAi CUTSHEET.pdf',
        ariaLabel: 'View ClipboardAi cut sheet'
      }
    ],
    riskNote: 'Privacy and controlled collaboration language remains general until technical security claims are verified.'
  }
]

export default function PublicHome() {
  const EXCLUSIVE_PORTAL_EMAIL_KEY = 'jb-exclusive-portal-email'
  usePageMetadata(pageMetadata.home)
  const nav = useNavigate()
  const [bootStatus, setBootStatus] = useState<'checking' | 'booting' | 'ready'>('checking')
  const [revealedFromBoot, setRevealedFromBoot] = useState(false)
  const [portalEmail, setPortalEmail] = useState('')
  const [portalMessage, setPortalMessage] = useState<string | null>(null)
  const sectionReveal = (index: number) => ({
    duration: 0.72,
    delay: index * 0.055,
    ease: [0.16, 1, 0.3, 1] as const
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      setBootStatus('ready')
      return
    }

    const hasSeenBoot = window.sessionStorage.getItem(BOOT_SESSION_KEY) === 'true'

    if (hasSeenBoot) {
      setBootStatus('ready')
      return
    }

    setBootStatus('booting')
  }, [])

  const completeBoot = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(BOOT_SESSION_KEY, 'true')
    }

    setRevealedFromBoot(true)
    setBootStatus('ready')
  }, [])

  const handleFounderBriefClick = useCallback(() => {
    scrollToSection('founder', {
      fallback: () =>
        nav(
          buildRequestAccessRoute({
            track: 'founder-story',
            reason: 'Founder story or profile review',
            next: 'Request a conversation'
          })
        )
    })
  }, [nav])

  const handleProjectsClick = useCallback(() => {
    scrollToSection('product-architecture', {
      fallback: () =>
        nav(
          buildRequestAccessRoute({
            track: 'projects',
            reason: 'Project walkthrough or case-study review',
            next: 'Request project walkthrough'
          })
        )
    })
  }, [nav])

  const handleTimelineClick = useCallback(() => {
    scrollToSection('founder-timeline')
  }, [])

  const handlePortalGateSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      const normalizedEmail = portalEmail.trim().toLowerCase()

      if (!normalizedEmail || !normalizedEmail.includes('@') || !normalizedEmail.includes('.')) {
        setPortalMessage('Enter a valid email so we can prepare your exclusive portal preview.')
        return
      }

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(EXCLUSIVE_PORTAL_EMAIL_KEY, normalizedEmail)
      }

      setPortalMessage('Welcome. Routing you to the Exclusive Portal entry layer...')
      nav('/os')
    },
    [nav, portalEmail]
  )

  const mediaSignalItems: ProofBandItem[] = [
    {
      id: videos[0].id,
      title: videos[0].title,
      summary: videos[0].summary,
      meta: `${videos[0].category} • ${videos[0].status}`,
      image: videos[0].thumbnail,
      fallbackImage: assetRegistry.videoPlaceholder
    },
    {
      id: dailyShowEpisodes[0].id,
      anchorId: 'jb3-daily-show',
      title: dailyShowEpisodes[0].title,
      summary: dailyShowEpisodes[0].summary,
      meta: `${dailyShowEpisodes[0].category} • ${dailyShowEpisodes[0].status}`,
      image: dailyShowEpisodes[0].thumbnail,
      fallbackImage: assetRegistry.dailyShowPlaceholder
    },
    {
      id: feedPosts[0].id,
      anchorId: 'public-feed',
      title: feedPosts[0].title,
      summary: feedPosts[0].summary,
      meta: `${feedPosts[0].category} • ${feedPosts[0].readTime}`,
      fallbackImage: assetRegistry.videoPlaceholder
    },
    {
      id: videos[1].id,
      title: videos[1].title,
      summary: videos[1].summary,
      meta: `${videos[1].category} • ${videos[1].status}`,
      image: videos[1].thumbnail,
      fallbackImage: assetRegistry.videoPlaceholder
    }
  ]

  const trustPreviewItems: ProofBandItem[] = evidenceItems
    .filter((item) => item.visibility !== 'Investor Only')
    .slice(0, 4)
    .map((item, index) => ({
      id: item.id,
      anchorId: index === 0 ? 'evidence-vault' : undefined,
      title: item.title,
      summary: item.summary,
      meta: `${item.category} • ${item.visibility}`,
      image: item.thumbnail,
      fallbackImage: assetRegistry.evidencePlaceholder
    }))

  if (bootStatus === 'checking') {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {bootStatus === 'booting' ? (
        <BootSequence key="boot-sequence" onComplete={completeBoot} />
      ) : (
        <motion.div
          key="public-home"
          className="page-shell"
          initial={revealedFromBoot ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: revealedFromBoot ? 0.55 : 0, ease: 'easeOut' }}
        >
          <PublicNav />
          <div className="hero-orb left-[-10rem] top-[4rem] h-72 w-72 bg-amber-300/24" />
          <div className="hero-orb right-[-8rem] top-[14rem] h-72 w-72 bg-orange-300/16" />
          <div className="hero-orb bottom-[22rem] right-[8%] h-60 w-60 bg-amber-200/10" />

          <section id="hero" className="public-hero section-anchor">
            <div className="container-shell-wide">
              <div className="public-hero-grid">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.92, ease: [0.16, 1, 0.3, 1] }}
                  className="public-hero-copy"
                >
                  <p className="public-pretitle">{founderProfile.positioningLine}</p>
                  <h1 className="public-hero-title">
                    <span className="public-hero-title-line">Jonathan Blackburn</span>
                    <span className="public-hero-title-os accent-green">OS</span>
                  </h1>
                  <p className="public-hero-quote">{founderProfile.coreQuote}</p>
                  <p className="public-hero-body">{founderProfile.shortBio}</p>
                  <div className="public-hero-actions">
                    <PremiumButton
                      variant="primary"
                      size="lg"
                      className="public-hero-cta public-hero-cta-primary"
                      onClick={handleFounderBriefClick}
                    >
                      View Founder Story
                    </PremiumButton>
                    <PremiumButton
                      variant="secondary"
                      size="lg"
                      className="public-hero-cta public-hero-cta-secondary"
                      onClick={handleProjectsClick}
                    >
                      Explore Projects
                    </PremiumButton>
                  </div>
                  <button type="button" onClick={() => nav('/login')} className="public-link-button">
                    Preview Private OS
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.96, ease: [0.16, 1, 0.3, 1] }}
                  className="public-hero-stage"
                >
                  <div className="public-stage-copy-panel">
                    <p className="public-stage-label">Founder Profile Plate</p>
                    <p className="public-stage-line">{founderProfile.shortBio}</p>
                  </div>
                  <AssetThumbnail
                    src={assetRegistry.founderProfileSide}
                    fallbackSrc={assetRegistry.founderPortraitPlaceholder}
                    alt="Black-and-white side-profile portrait of Jonathan Blackburn."
                    className="public-stage-asset"
                    imageClassName="object-cover object-[center_28%]"
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                  <div className="public-stage-detail">
                    <p className="public-stage-detail-title">Founder portrait</p>
                    <p className="public-stage-detail-copy">
                      An editorial profile treatment for the founder story behind Jonathan Blackburn OS.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(0)}
          >
            <ManifestoPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(1)}
          >
            <FounderManualSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(2)}
          >
            <EditorialSection
              id="product-architecture"
              lead="Product Architecture"
              title="A controlled public preview of the OS³ product architecture."
              intro="The platform layer now appears before the deeper founder-history and proof sections, giving visitors a clearer view of the systems being built: OS³ Dash, JB³Ai Super Agent OS, and ClipboardAi. Held products remain out of view until separate reviews clear them."
            >
              <div className="projects-media-widget">
                <p className="public-meta-line">
                  <span>Applications Showcase</span>
                  <span>Scrolling Screenshot Widget</span>
                </p>
                <div className="projects-media-track">
                  {batch01SelectedCards.map((card) => (
                    <article key={`${card.name}-media`} className="projects-media-item">
                      <AssetThumbnail
                        src={card.imageSrc}
                        fallbackSrc={assetRegistry.projectPlaceholder}
                        alt={card.imageAlt ?? `${card.name} preview`}
                        className="projects-media-asset"
                        imageClassName="product-media-image"
                        sizes="(max-width: 1024px) 80vw, 28vw"
                      />
                      <div className="projects-media-copy">
                        <h3>{card.name}</h3>
                        <p>{card.shortDescription}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="projects-stack-deck">
                {batch01SelectedCards.map((card, index) => (
                  <div key={card.name} className="projects-stack-layer">
                    <div
                      className="projects-stack-sticky"
                      style={{
                        top: `calc(5.2rem + ${index * 0.4}rem)`,
                        zIndex: 40 + index
                      }}
                    >
                      <AppPortfolioCard {...card} className="projects-stack-card" />
                    </div>
                  </div>
                ))}
              </div>
            </EditorialSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(3)}
          >
            <SupportWorkStrip />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(4)}
          >
            <GTR3Spotlight
              content={gtr3Content}
              onPrimaryAction={() =>
                nav(
                  buildRequestAccessRoute({
                    track: 'gtr3',
                    reason: 'GTR³ preview request',
                    next: 'Request a conversation'
                  })
                )
              }
              onSecondaryAction={handleTimelineClick}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(5)}
          >
            <ProofBand
              id="projects-media"
              lead="Media and Signals"
              title="A curated signal layer for briefings, previews, and public notes."
              intro="After the product, mission, and founder arc are established, this band keeps media lightweight: selected briefings, JB³ Daily Show entries, and public feed signals without overfilling the homepage."
              items={mediaSignalItems}
              ctaLabel="Preview Private OS"
              onCta={() => nav('/login')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(6)}
          >
            <ProofBand
              id="founder-evidence"
              lead="Evidence and Trust"
              title="Proof stays contextual, permission-aware, and restrained."
              intro="The trust layer remains deliberately minimal: enough public signal to establish credibility, without exposing private packs, investor files, or sensitive operating material."
              items={trustPreviewItems}
              ctaLabel="Request Evidence Access"
              onCta={() =>
                nav(
                  buildRequestAccessRoute({
                    track: 'evidence',
                    reason: 'Evidence or trust layer review',
                    next: 'Request evidence review'
                  })
                )
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(7)}
          >
            <EditorialSection
              id="founder-timeline"
              lead="Founder Journey"
              title="The founder path behind the systems."
              intro="After the platform and Isikolo mission are clear, the public journey returns to the chapters that shaped the work: engineering, recovery, care, diagnostics, rebuilding, and the discipline of turning pressure into structure."
            >
              <div className="journey-track">
                {timelineEvents.map((event, index) => (
                  <motion.article
                    key={event.id}
                    className="journey-item"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.08 + index * 0.045, duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="journey-period">{event.period}</div>
                    <div className="journey-content">
                      <p className="public-meta-line">
                        <span>{event.category}</span>
                        <span>{event.visibility}</span>
                      </p>
                      <h3 className="selected-work-row-title">{event.title}</h3>
                      <p className="public-copy">{event.summary}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </EditorialSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(8)}
          >
            <FounderPhaseStrip />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={sectionReveal(9)}
          >
            <EditorialSection
              id="intelligence-tools"
              lead="Investigative and Intelligence Tools"
              title="Exclusive intelligence access for serious operators, investigators, and partners."
              intro="This is a private layer. Share your details to unlock the portal preview and receive guided access to deeper tools, briefings, and protected intelligence modules."
            >
              <div className="intel-teaser-grid">
                <div className="intel-teaser-copy">
                  <p className="public-meta-line">
                    <span>OSINT and Investigation Desk</span>
                    <span>Exclusive Portal</span>
                  </p>
                  <p className="public-copy">
                    Inside the portal, trusted users can navigate structured intelligence modules, investigative toolsets,
                    protected workflow previews, and founder briefings that are intentionally held back from the public layer.
                  </p>
                  <ul className="intel-teaser-list">
                    <li>Investigation workflows and case structures</li>
                    <li>Intelligence analysis and briefing modules</li>
                    <li>Secure document vault and CV access zone</li>
                  </ul>
                </div>

                <form className="intel-teaser-gate" onSubmit={handlePortalGateSubmit}>
                  <label htmlFor="portal-email" className="conversion-label">
                    Enter your email to request portal entry
                  </label>
                  <input
                    id="portal-email"
                    type="email"
                    className="input-shell"
                    autoComplete="email"
                    value={portalEmail}
                    onChange={(event) => setPortalEmail(event.target.value)}
                    placeholder="you@company.com"
                  />
                  <div className="intel-teaser-actions">
                    <PremiumButton type="submit" variant="accent" size="lg">
                      Request Portal Invite
                    </PremiumButton>
                    <PremiumButton type="button" variant="ghost" size="lg" onClick={() => nav('/login')}>
                      View Entry Requirements
                    </PremiumButton>
                  </div>
                  {portalMessage ? (
                    <p className="conversion-status" role="status" aria-live="polite">
                      {portalMessage}
                    </p>
                  ) : null}
                </form>
              </div>
            </EditorialSection>
          </motion.div>

          <EditorialSection
            id="founder-investor"
            lead="Investor Access"
            title="Verified review access for serious partners."
            intro={founderProfile.investorSummary}
            actions={
              <PremiumButton
                variant="accent"
                onClick={() =>
                  nav(
                    buildRequestAccessRoute({
                      track: 'investor',
                      reason: 'Investor review request',
                      next: 'Request investor review'
                    })
                  )
                }
              >
                Request Investor Access
              </PremiumButton>
            }
          >
            <motion.div
              className="investor-room-preview"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <div className="investor-room-copy">
                <p className="public-copy">
                  Public previews acknowledge due diligence, strategy, and commercial material without exposing private content or overstating what belongs behind verified review.
                </p>
              </div>
              <div className="investor-room-list">
                {investorRecords.slice(0, 4).map((record) => (
                  <div key={record.id} className="investor-room-item">
                    <div>
                      <p className="public-meta-line">
                        <span>{record.category}</span>
                        <span>{record.visibility}</span>
                      </p>
                      <h3 className="selected-work-row-title">{record.title}</h3>
                    </div>
                    <p className="public-copy-sm">{record.summary}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </EditorialSection>

          <ConnectStrip
            links={homepageContactLinks}
            onRequestAccess={() =>
              nav(
                buildRequestAccessRoute({
                  track: 'connect',
                  reason: 'General contact or access request',
                  next: 'Request a conversation'
                })
              )
            }
            onEnterPrivateOS={() => nav('/login')}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
