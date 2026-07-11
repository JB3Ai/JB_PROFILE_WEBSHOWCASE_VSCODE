import React from 'react'
import { motion } from 'framer-motion'
import AssetThumbnail from '../media/AssetThumbnail'
import { PremiumButton } from '../primitives'
import { assetRegistry } from '../../data/assetRegistry'

export type AppPortfolioCardProps = {
  name: string
  category: string
  status: string
  shortDescription: string
  detail?: string
  imageSrc?: string | null
  imageAlt?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  resourceLinks?: Array<{
    label: string
    href: string
    ariaLabel?: string
  }>
  riskNote?: string
  disabled?: boolean
  comingSoon?: boolean
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  className?: string
}

export default function AppPortfolioCard({
  name,
  category,
  status,
  shortDescription,
  detail,
  imageSrc,
  imageAlt,
  primaryCtaLabel,
  secondaryCtaLabel,
  resourceLinks,
  riskNote,
  disabled = false,
  comingSoon = false,
  onPrimaryAction,
  onSecondaryAction,
  className = ''
}: AppPortfolioCardProps) {
  const isInactive = disabled || comingSoon
  const shouldRenderImage = Boolean(imageSrc && imageAlt)
  const primaryDisabled = isInactive || !onPrimaryAction
  const secondaryDisabled = isInactive || !onSecondaryAction
  const hasResourceLinks = Boolean(resourceLinks?.length)

  return (
    <motion.article
      className={`app-portfolio-card glass-panel-premium ${shouldRenderImage ? 'app-portfolio-card-with-image' : ''} ${
        isInactive ? 'app-portfolio-card-inactive' : ''
      } ${className}`.trim()}
      aria-disabled={isInactive || undefined}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="app-portfolio-card-copy">
        <div className="app-portfolio-card-meta">
          <span>{category}</span>
          <span>{status}</span>
        </div>
        <h3 className="app-portfolio-card-title">{name}</h3>
        <p className="app-portfolio-card-summary">{shortDescription}</p>
        {detail ? <p className="app-portfolio-card-detail">{detail}</p> : null}
        {riskNote ? <p className="app-portfolio-card-risk">{riskNote}</p> : null}
        {primaryCtaLabel || secondaryCtaLabel || hasResourceLinks ? (
          <div className="app-portfolio-card-actions">
            {primaryCtaLabel ? (
              <PremiumButton
                variant="accent"
                size="sm"
                disabled={primaryDisabled}
                onClick={onPrimaryAction}
                ariaLabel={`${primaryCtaLabel}: ${name}`}
              >
                {primaryCtaLabel}
              </PremiumButton>
            ) : null}
            {secondaryCtaLabel ? (
              <PremiumButton
                variant="ghost"
                size="sm"
                disabled={secondaryDisabled}
                onClick={onSecondaryAction}
                ariaLabel={`${secondaryCtaLabel}: ${name}`}
              >
                {secondaryCtaLabel}
              </PremiumButton>
            ) : null}
            {resourceLinks?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
                aria-label={link.ariaLabel ?? `${link.label}: ${name}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {shouldRenderImage ? (
        <AssetThumbnail
          src={imageSrc}
          fallbackSrc={assetRegistry.projectPlaceholder}
          alt={imageAlt || `${name} preview`}
          className="app-portfolio-card-asset"
          sizes="(max-width: 768px) 100vw, 28vw"
        />
      ) : null}
    </motion.article>
  )
}
