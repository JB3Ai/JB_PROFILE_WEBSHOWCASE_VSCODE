import type { VideoItem } from '../types/content.types'
import { assetRegistry } from '../data/assetRegistry'

export const videos: VideoItem[] = [
  {
    id: 'jonathan-blackburn-os-intro',
    title: 'Jonathan Blackburn OS Intro',
    category: 'Founder Briefing',
    status: 'Public Preview',
    duration: '01:30',
    summary:
      'A short introduction to Jonathan Blackburn OS, the founder-profile platform connecting story, evidence, projects, media, and systems thinking.',
    relatedProjectId: null,
    thumbnail: assetRegistry.videoPlaceholder,
    videoUrl: '/assets/videos/jonathan-blackburn-os-intro.mp4',
    access: 'public',
    tags: ['founder', 'os', 'intro']
  },
  {
    id: 'os3-dash-overview',
    title: 'OS³ Dash Overview',
    category: 'Product Demo',
    status: 'Demo Cut',
    duration: '01:15',
    summary:
      'A product overview showing OS³ Dash as a managed AI operating layer for business workflows, dashboards, and modular intelligence tools.',
    relatedProjectId: 'os3-dash',
    thumbnail: '/assets/images/video-os3-dash.jpg',
    videoUrl: '/assets/videos/os3-dash-overview.mp4',
    access: 'public',
    tags: ['os3', 'dashboard', 'ai', 'business']
  },
  {
    id: 'dukebox-london-preview',
    title: 'The DukeBox of London Preview',
    category: 'Project Walkthrough',
    status: 'Public Preview',
    duration: '00:45',
    summary:
      'A visual preview of The DukeBox of London as a creative web and media experience exploring music culture and digital storytelling.',
    relatedProjectId: 'dukebox-london',
    thumbnail: '/assets/images/video-dukebox.jpg',
    videoUrl: '/assets/videos/dukebox-preview.mp4',
    access: 'public',
    tags: ['creative', 'music', 'web']
  },
  {
    id: 'clipboard-os3-lite-walkthrough',
    title: 'Clipboard OS³ Lite Walkthrough',
    category: 'Project Walkthrough',
    status: 'Demo Cut',
    duration: '01:00',
    summary:
      'A walkthrough of Clipboard OS³ Lite as a lightweight shared workspace for notes, tabs, pinned information, coordination, and real-time visibility.',
    relatedProjectId: 'clipboard-os3-lite',
    thumbnail: '/assets/images/video-clipboard.jpg',
    videoUrl: '/assets/videos/clipboard-os3-lite.mp4',
    access: 'public',
    tags: ['workspace', 'clipboard', 'os3', 'prototype']
  },
  {
    id: 'jb3-voicegrid-product-profile',
    title: 'JB³ VoiceGrid OS³ Product Profile',
    category: 'Product Profile',
    status: 'Product Profile',
    duration: '01:10',
    summary:
      'A product profile for JB³ VoiceGrid OS³, an intelligent voice and communication layer for workflows, routing, support, and AI-assisted response systems.',
    relatedProjectId: 'jb3-voicegrid-os3',
    thumbnail: '/assets/images/video-voicegrid.jpg',
    videoUrl: '/assets/videos/jb3-voicegrid-os3.mp4',
    access: 'public',
    tags: ['voice', 'communication', 'ai', 'os3']
  },
  {
    id: 'jb3-viewgrid-concept-preview',
    title: 'JB³ ViewGrid Concept Preview',
    category: 'Product Profile',
    status: 'Coming Soon',
    duration: '00:50',
    summary:
      'A concept preview for JB³ ViewGrid, a visual command layer for organising projects, evidence, dashboards, media, and operational views.',
    relatedProjectId: 'jb3-viewgrid',
    thumbnail: '/assets/images/video-viewgrid.jpg',
    videoUrl: '/assets/videos/jb3-viewgrid-preview.mp4',
    access: 'public',
    tags: ['visual', 'grid', 'dashboard', 'concept']
  },
  {
    id: 'gtr3-coming-soon-teaser',
    title: 'GTR³ Coming Soon Teaser',
    category: 'GTR³',
    status: 'Coming Soon',
    duration: '00:40',
    summary:
      'A teaser for the GTR³ book and third-rise story layer inside Jonathan Blackburn OS.',
    relatedProjectId: null,
    thumbnail: '/assets/images/artwork-curated/gtr3-cinematic-banner.png',
    videoUrl: '/assets/videos/gtr3-coming-soon.mp4',
    access: 'public',
    tags: ['gtr3', 'book', 'story', 'coming-soon']
  }
]
