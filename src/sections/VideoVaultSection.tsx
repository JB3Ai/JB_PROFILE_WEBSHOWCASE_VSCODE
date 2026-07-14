import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, PremiumButton, GlassPanel } from '../components/primitives'
import { videos } from '../content/videos.content'
import VideoCard from '../components/cards/VideoCard'
import { scrollToSection } from '../utils/scrollToSection'
import AssetThumbnail from '../components/media/AssetThumbnail'
import { assetRegistry } from '../data/assetRegistry'

const featured = videos[0]

export default function VideoVaultSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <section id="video-vault" className="section section-anchor text-white">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Video Layer"
          title="Video Vault"
          subtitle="Founder briefings, product demos, project walkthroughs, media clips, and GTR³ teasers."
        />

        <motion.div
          className="grid gap-6 lg:grid-cols-[1.4fr_1fr] mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <GlassPanel size="lg" animate={true} hover={true} className="section-frame">
            <AssetThumbnail
              src={featured.thumbnail}
              fallbackSrc={assetRegistry.videoPlaceholder}
              alt={`${featured.title} featured video preview`}
              className="h-72 rounded-[1.25rem]"
              overlay={
                <div className="flex items-end justify-between gap-3">
                  <span className="badge-primary">Featured Video</span>
                  <span className="badge-neutral">{featured.duration}</span>
                </div>
              }
            />
            <div className="mt-5 text-caption text-[color:var(--accent-cyan)]">{featured.category}</div>
            <h3 className="mt-3 text-heading text-white">{featured.title}</h3>
            <p className="mt-4 text-body">{featured.summary}</p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <PremiumButton variant="primary" size="md">Watch Video</PremiumButton>
              <PremiumButton variant="secondary" size="md" onClick={() => scrollToSection('projects')}>View Project</PremiumButton>
            </div>
          </GlassPanel>
          
          <motion.div className="grid gap-4" variants={containerVariants}>
            {videos.slice(1, 4).map((video) => (
              <motion.div key={video.id} variants={itemVariants} className="glass-panel-md">
                <p className="text-caption">Quick Brief</p>
                <h4 className="mt-3 font-semibold text-white">{video.title}</h4>
                <p className="mt-3 text-body-sm">{video.summary}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {videos.map((video, idx) => (
            <motion.div key={video.id} variants={itemVariants}>
              <VideoCard video={video} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
