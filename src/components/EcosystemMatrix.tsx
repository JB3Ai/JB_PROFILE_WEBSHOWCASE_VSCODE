import { useState } from 'react';
import { apps } from '@/data/apps';
import { Download, FileText, ExternalLink, Play, Lock, ChevronDown, X } from 'lucide-react';

/**
 * Cutsheets that exist in /assets/pdfs/ but are intentionally served only
 * inside the Private OS (gated intelligence tools). Listed here so the
 * matrix documents their location without exposing a public download.
 */
const GATED_CUTSHEETS: Record<string, string> = {
  'investigator-ai': '/assets/pdfs/os3-investigatorai-cutsheet.pdf',
  'newsroom-ai': '/assets/pdfs/os3-newsroomai-cutsheet.pdf',
};

function PathText({ path }: { path: string }) {
  return (
    <span className="block mt-1 font-mono text-[10px] leading-snug text-ink-400 break-all">
      {path}
    </span>
  );
}

export function EcosystemMatrix() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="mt-16 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-600 shadow-sm transition-colors hover:border-copper-400 hover:text-copper-600"
        >
          Asset Matrix: Ecosystem Downloads and Links
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="relative text-center mb-6">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close Asset Matrix"
          className="absolute right-0 top-0 inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-500 shadow-sm transition-colors hover:border-copper-400 hover:text-copper-600"
        >
          <X className="w-3.5 h-3.5" /> Close
        </button>
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-copper-600 mb-2">
          Asset Matrix
        </span>
        <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-ink-900 mb-2">
          Ecosystem Downloads and Links
        </h3>
        <p className="text-sm text-ink-500 max-w-2xl mx-auto">
          Full directory listing for every product asset. Base directory:{' '}
          <span className="font-mono text-xs">/assets/pdfs/</span> (repo{' '}
          <span className="font-mono text-xs">public/</span> mirrors cPanel{' '}
          <span className="font-mono text-xs">public_html/assets/pdfs/</span>).
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-200 bg-white shadow-sm">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-warm-50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Product</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Download Cutsheet</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Download Brochure</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Open App</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Video (YouTube)</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => {
              const gatedSheet = GATED_CUTSHEETS[app.id];
              return (
                <tr
                  key={app.id}
                  className="border-b border-ink-100 last:border-0 hover:bg-warm-50/60 transition-colors align-top"
                >
                  {/* Product */}
                  <td className="px-4 py-4">
                    <span className="block font-medium text-ink-900">{app.title}</span>
                    {app.category === 'gated' && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-ink-400 uppercase tracking-wider">
                        <Lock className="w-3 h-3" /> Portal Only
                      </span>
                    )}
                  </td>

                  {/* Cutsheet */}
                  <td className="px-4 py-4">
                    {app.externalLink ? (
                      <>
                        <a
                          href={app.externalLink}
                          download
                          className="inline-flex items-center gap-1.5 text-copper-600 hover:text-copper-700 font-medium transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" /> Cutsheet
                        </a>
                        <PathText path={app.externalLink} />
                      </>
                    ) : gatedSheet ? (
                      <>
                        <span className="inline-flex items-center gap-1.5 text-ink-400 font-medium">
                          <Lock className="w-3.5 h-3.5" /> Private OS
                        </span>
                        <PathText path={gatedSheet} />
                      </>
                    ) : (
                      <span className="text-ink-300">TBD</span>
                    )}
                  </td>

                  {/* Brochure */}
                  <td className="px-4 py-4">
                    {app.brochureUrl ? (
                      <>
                        <a
                          href={app.brochureUrl}
                          download
                          className="inline-flex items-center gap-1.5 text-copper-600 hover:text-copper-700 font-medium transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" /> Brochure
                        </a>
                        <PathText path={app.brochureUrl} />
                      </>
                    ) : (
                      <span className="text-ink-300">TBD</span>
                    )}
                  </td>

                  {/* Open App */}
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-ink-400 font-medium">
                      <ExternalLink className="w-3.5 h-3.5" /> Link TBD
                    </span>
                    <span className="block mt-1 font-mono text-[10px] leading-snug text-ink-300">
                      signup URL to be added
                    </span>
                  </td>

                  {/* Video */}
                  <td className="px-4 py-4">
                    {app.videoUrl ? (
                      <>
                        <a
                          href={app.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-copper-600 hover:text-copper-700 font-medium transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" /> Watch
                        </a>
                        <PathText path={app.videoUrl} />
                      </>
                    ) : (
                      <span className="text-ink-300">TBD</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-medium text-ink-500 shadow-sm transition-colors hover:border-copper-400 hover:text-copper-600"
        >
          <X className="w-3.5 h-3.5" /> Close Asset Matrix
        </button>
      </div>
    </div>
  );
}
