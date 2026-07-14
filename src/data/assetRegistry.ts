export const assetRegistry = {
  logoPrimary: '/assets/logos/logo-primary.svg',
  logoMark: '/assets/logos/logo-mark.svg',
  logoDark: '/assets/logos/logo-dark.svg',
  founderProfileSide: '/assets/images/artwork-curated/founder-profile-side.png',
  founderEditorialBw: '/assets/images/artwork-curated/founder-editorial-bw.jpg',
  imedLabPrecision: '/assets/images/imed-lab-precision.webp',
  gtr3LoadingHero: '/assets/images/artwork-curated/gtr3-loading-hero.jpg',
  eliteTechnologiesArchive: '/assets/images/artwork-curated/elite-technologies-archive.jpg',
  isikoloAiCoverEducationVisual: '/assets/images/artwork-curated/isikolo-ai-cover-education-visual.png',
  os3DashCommandDashboard: '/assets/images/artwork-curated/os3-dash-command-dashboard.jpg',
  jb3aiSuperAgentOsArchitecture: '/assets/images/artwork-curated/jb3ai-super-agent-os-architecture.jpg',
  clipboardAiPrivateWorkspace: '/assets/images/artwork-curated/clipboard-ai-private-workspace.jpg',
  gtr3CinematicBanner: '/assets/images/artwork-curated/gtr3-cinematic-banner.png',
  evidenceTrustVisual: '/assets/images/artwork-curated/evidence-trust-visual.jpg',
  dukeboxProject: '/assets/images/artwork-curated/dukebox-project.jpg',
  voicegridProject: '/assets/images/artwork-curated/voicegrid-project.png',
  viewgridProject: '/assets/images/artwork-curated/viewgrid-project.jpg',
  investigatorAiProduct: '/assets/images/artwork-curated/investigator-ai-product.jpg',
  founderHeroPlaceholder: '/assets/placeholders/founder-hero-placeholder.svg',
  founderPortraitPlaceholder: '/assets/placeholders/founder-placeholder.svg',
  gtr3HeroPlaceholder: '/assets/placeholders/gtr3-hero-placeholder.svg',
  projectPlaceholder: '/assets/placeholders/project-placeholder.svg',
  videoPlaceholder: '/assets/placeholders/video-placeholder.svg',
  evidencePlaceholder: '/assets/placeholders/evidence-placeholder.svg',
  investorPlaceholder: '/assets/placeholders/investor-placeholder.svg',
  gtr3Placeholder: '/assets/placeholders/gtr3-placeholder.svg',
  dailyShowPlaceholder: '/assets/placeholders/daily-show-placeholder.svg',
  pdfPlaceholder: '/assets/placeholders/pdf-placeholder.svg'
} as const

export function resolveAssetPath(assetPath: string | null | undefined, fallbackPath: string) {
  if (!assetPath) {
    return fallbackPath
  }

  const trimmedPath = assetPath.trim()

  return trimmedPath.length > 0 ? trimmedPath : fallbackPath
}
