import React from 'react'
import { gtr3Content } from '../content/gtr3.content'
import { GlassPanel, PremiumButton, SectionHeader, StatusBadge } from '../components/primitives'
import AssetThumbnail from '../components/media/AssetThumbnail'
import { assetRegistry } from '../data/assetRegistry'

export default function GTR3Section() {
  return (
    <section id="gtr3" className="section section-anchor text-white">
      <div className="container-shell">
        <GlassPanel size="lg" className="section-frame">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <StatusBadge variant="warning">{gtr3Content.status}</StatusBadge>
              <SectionHeader
                title={gtr3Content.title}
                subtitle={gtr3Content.shortTeaser}
                eyebrow="Coming Soon Story Layer"
                className="mt-5"
              />
              <p className="mt-4 max-w-3xl text-body-lg">{gtr3Content.headline}</p>
            </div>
            <div className="glass-panel-md max-w-xl">
              <AssetThumbnail
                src={assetRegistry.gtr3Placeholder}
                fallbackSrc={assetRegistry.gtr3Placeholder}
                alt="GTR³ preview placeholder artwork"
                className="mb-5 h-48"
              />
              <p className="text-caption text-amber-200">Story Preview</p>
              <p className="mt-4 text-body">{gtr3Content.longTeaser}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gtr3Content.themes.map((theme) => (
              <div key={theme.title} className="card h-full">
                <h3 className="text-heading-sm text-white">{theme.title}</h3>
                <p className="mt-3 text-body-sm">{theme.summary}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <PremiumButton variant="ghost">{gtr3Content.ctaLabels.primary}</PremiumButton>
            <PremiumButton variant="accent">{gtr3Content.ctaLabels.secondary}</PremiumButton>
          </div>
        </GlassPanel>
      </div>
    </section>
  )
}
