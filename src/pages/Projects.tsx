import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, FileText, Play } from 'lucide-react';
import { publicApps } from '@/data/apps';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Projects() {
  const [demosOnly, setDemosOnly] = useState(false);
  usePageMeta({ title: 'Latest projects & demos | Jonathan Blackburn', description: 'Explore Jonathan Blackburn’s public projects, demo videos and project briefs.', canonical: '/projects' });
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const projects = demosOnly ? publicApps.filter(app => app.videoUrl) : publicApps;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/30 section-padding py-6">
        <div className="content-max-width flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="font-semibold">Jonathan Blackburn</Link>
          <Link to="/#founder" className="inline-flex items-center gap-2 text-sm hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home</Link>
        </div>
      </header>
      <main className="section-padding py-14 sm:py-20">
        <div className="content-max-width">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Inside the workshop</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Latest projects &amp; demos.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">A closer look at what I’m building. Browse the public projects, watch a demo, or explore a project brief.</p>
          <div className="my-10 flex flex-wrap gap-3" aria-label="Filter projects">
            {[false, true].map(demos => <button key={String(demos)} type="button" aria-pressed={demosOnly === demos} onClick={() => setDemosOnly(demos)} className={`rounded-full border px-5 py-2.5 text-sm font-medium ${demosOnly === demos ? 'border-primary bg-primary text-primary-foreground' : 'border-border/40 hover:bg-muted'}`}>{demos ? 'Watch demos' : 'All projects'}</button>)}
          </div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(app => (
              <article key={app.id} className="overflow-hidden rounded-2xl border border-border/30 bg-card">
                <img src={app.thumbnail} alt={app.title} loading="lazy" className="aspect-[16/10] w-full bg-slate-950 object-contain" />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground">{app.tags.slice(0, 3).join(' / ')}</p>
                  <h2 className="mt-3 text-xl font-semibold">{app.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{app.description}</p>
                  <div className="mt-6 flex flex-wrap gap-5 text-sm font-medium">
                    {app.videoUrl && <a href={app.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline"><Play aria-hidden="true" className="h-4 w-4" /> Watch demo<ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a>}
                    {app.externalLink && app.externalLink !== '#' && <a href={app.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><FileText aria-hidden="true" className="h-4 w-4" /> Project brief</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
