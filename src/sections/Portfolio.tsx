import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { apps, publicApps, gatedApps } from '@/data/apps';
import { EcosystemMatrix } from '@/components/EcosystemMatrix';
import { Lock, Download, ExternalLink, FileText, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterTab = 'all' | 'public' | 'gated' | 'featured';

const tabs: { key: FilterTab; label: string; count: number }[] = [
  { key: 'all', label: 'All Products', count: apps.length },
  { key: 'public', label: 'Public', count: publicApps.length },
  { key: 'gated', label: 'Portal Only', count: gatedApps.length },
  { key: 'featured', label: 'Featured', count: apps.filter(a => a.featured).length },
];

interface PortfolioProps {
  onOpenGate: (context?: 'investor' | 'client' | 'collaborator' | 'press') => void;
}

export function Portfolio({ onOpenGate }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filtered = activeTab === 'all' ? apps
    : activeTab === 'public' ? publicApps
    : activeTab === 'gated' ? gatedApps
    : apps.filter(a => a.featured);

  return (
    <section id="products" className="relative min-h-[300px] w-full pt-6 pb-24 lg:pt-8 lg:pb-32">
      <div className="absolute inset-0 bg-white texture-grain" />
      <div className="relative z-10 section-padding">
        <div className="content-max-width">
          <SectionHeader
            label="Projects"
            title="The OS³ Ecosystem: Live Architecture"
            description="Eight working systems. Five public. Three gated. 
                         The platform layer before the deeper founder history and proof sections."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                  activeTab === tab.key ? 'text-white' : 'text-ink-500 hover:text-ink-700 hover:bg-warm-100'
                )}
              >
                {activeTab === tab.key && (
                  <motion.div className="absolute inset-0 bg-ink-900 rounded-xl" layoutId="portfolioTab" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.label}
                  <span className={cn('text-xs px-1.5 py-0.5 rounded-md', activeTab === tab.key ? 'bg-white/20 text-white/80' : 'bg-warm-100 text-ink-400')}>
                    {tab.count}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Restricted clearance notice: shows only on the Portal Only tab */}
          <AnimatePresence>
            {activeTab === 'gated' && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mx-auto max-w-3xl mt-8 overflow-hidden"
              >
                <div className="rounded border border-primary/30 bg-primary/5 p-4 text-center shadow-sm">
                  <p className="text-xs sm:text-sm text-foreground/80 tracking-wide">
                    <strong className="text-primary font-medium tracking-widest uppercase mr-2">
                      Restricted Clearance:
                    </strong>
                    Due to the sensitive and confidential nature of these intelligence tools, public deployment is strictly prohibited. Live demonstration and architecture review require verified clearance via the Private OS.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {filtered.map((app, i) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                      app.category === 'gated'
                        ? 'border-ink-200 bg-gradient-to-br from-ink-50 to-warm-50'
                        : 'border-ink-100 bg-white'
                    )}
                  >
                    <div className="relative aspect-[16/10] bg-ink-900 overflow-hidden flex items-center justify-center">
                      <img
                        src={app.thumbnail}
                        alt={app.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      {app.category === 'gated' && (
                        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-ink-900/80 text-white text-xs font-medium flex items-center gap-1.5">
                          <Lock className="w-3 h-3" />
                          Portal
                        </div>
                      )}
                      {app.status === 'live' && (
                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                          Live
                        </div>
                      )}
                      {app.status === 'beta' && (
                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                          Beta
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {app.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-warm-100 text-ink-500 text-[11px] font-medium">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-ink-900 tracking-tight mb-1">{app.title}</h3>
                      <p className="text-sm text-ink-500 leading-relaxed mb-4">{app.description}</p>
                      {app.metrics && (
                        <div className="flex gap-4 mb-4">
                          {app.metrics.map(m => (
                            <div key={m.label}>
                              <span className="block text-sm font-semibold text-ink-900">{m.value}</span>
                              <span className="text-[11px] text-ink-400">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {app.videoUrl && (
                          <a 
                            href={app.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-copper-600 hover:text-copper-700 transition-colors"
                          >
                            <Play className="w-4 h-4 mr-1.5 fill-current" />
                            Watch Demo
                          </a>
                        )}
                        {app.externalLink && app.externalLink !== '#' && (
                          <a 
                            href={app.externalLink}
                            download
                            className="inline-flex items-center text-sm font-medium text-copper-600 hover:text-copper-700 transition-colors"
                          >
                            <Download className="w-4 h-4 mr-1.5" />
                            {app.id === 'consulting-accelerator' ? 'Download JB³ Consulting Brief' : 'Download Cutsheet'}
                          </a>
                        )}
                        {app.brochureUrl && (
                          <a 
                            href={app.brochureUrl}
                            download
                            className="inline-flex items-center text-sm font-medium text-copper-600 hover:text-copper-700 transition-colors"
                          >
                            <FileText className="w-4 h-4 mr-1.5" />
                            Download Brochure
                          </a>
                        )}
                        <button
                          onClick={() => onOpenGate('client')}
                          className="inline-flex items-center text-sm font-medium text-copper-600 hover:text-copper-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1.5" />
                          Open App
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <EcosystemMatrix />
        </div>
      </div>
    </section>
  );
}
