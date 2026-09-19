import { Rss, ExternalLink } from 'lucide-react';

interface NewsItem {
  date: string;
  tag: string;
  tagClass: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

const newsItems: NewsItem[] = [
  {
    date: '24 Jul 2026',
    tag: 'Platform',
    tagClass: 'bg-copper-500/15 text-copper-400 border-copper-500/25',
    title: 'Founder platform relaunch deployed',
    body: 'The new cinematic build is live on jonoblackburn.com: SEO architecture, evidence lightboxes, the iMED profile film, and the standalone contact directory.',
    link: { label: 'Visit public site', href: 'https://www.jonoblackburn.com' },
  },
  {
    date: 'Jul 2026',
    tag: 'Portal',
    tagClass: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    title: 'Private OS expanded',
    body: 'New modules inside this portal: Intelligence Files, Investment node, GTR³ Archive, secure Notepad, and the operations Calculator.',
  },
  {
    date: 'Jul 2026',
    tag: 'Funding',
    tagClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    title: 'Wishlist 2026 published',
    body: 'The final 5% mission funding page is live: 16 items across AI tools, hardware, and software, with local and global support channels.',
    link: { label: 'View wishlist', href: '/wishlist' },
  },
  {
    date: 'Jun 2026',
    tag: 'Media',
    tagClass: 'bg-red-500/15 text-red-400 border-red-500/25',
    title: 'The Daily Logic Show on YouTube',
    body: 'Systems, stories, and the unfiltered truth about building under pressure. Late Night Logic episodes streaming now.',
    link: { label: 'Watch on YouTube', href: 'https://www.youtube.com/@JB3AiTheDailyLogicShow' },
  },
  {
    date: '2026',
    tag: 'Media',
    tagClass: 'bg-red-500/15 text-red-400 border-red-500/25',
    title: 'JB³Ai official channel',
    body: 'Product demos, system overviews, and release updates from the JB³Ai build floor.',
    link: { label: 'Subscribe', href: 'https://www.youtube.com/@JB3Ai' },
  },
  {
    date: '2026',
    tag: 'Writing',
    tagClass: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
    title: 'Practical AI: Building Tools That Actually Work',
    body: 'Field notes on shipping AI products that survive contact with reality.',
    link: { label: 'Read on Medium', href: 'https://medium.com/@jono_12764/practical-ai-building-tools-that-actually-work-bdb2606df060' },
  },
  {
    date: '2026',
    tag: 'Writing',
    tagClass: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
    title: 'Building Under Pressure: Lessons from the Trenches',
    body: 'What four companies and three rebuilds teach you about systems, teams, and stamina.',
    link: { label: 'Read on Medium', href: 'https://medium.com/@jono_12764/building-under-pressure-lessons-from-the-trenches-20e49e1434f9' },
  },
  {
    date: '2026',
    tag: 'Writing',
    tagClass: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
    title: 'The Future of Smart Homes Is Not Voice Control',
    body: 'Why the next chapter of home automation is invisible, predictive, and quiet.',
    link: { label: 'Read on Medium', href: 'https://medium.com/@jono_12764/the-future-of-smart-homes-is-not-voice-control-6e217b2f623b' },
  },
  {
    date: '2026',
    tag: 'Writing',
    tagClass: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
    title: 'Why Africa Will Build the Next Generation of Infrastructure',
    body: 'Constraint breeds architecture. The case for African-built systems leapfrogging legacy stacks.',
    link: { label: 'Read on Medium', href: 'https://medium.com/@jono_12764/why-africa-will-build-the-next-generation-of-infrastructure-4345ac7dd220' },
  },
];

export default function OSNews() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-1">
        <div className="w-9 h-9 rounded-lg bg-copper-600/20 flex items-center justify-center shrink-0">
          <Rss className="w-4.5 h-4.5 text-copper-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">JB³Ai News Feed</h3>
          <p className="text-xs text-white/40">Platform updates, media, and founder writing</p>
        </div>
      </div>

      <div className="space-y-3">
        {newsItems.map((item) => (
          <div
            key={item.title}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-copper-500/30 hover:bg-white/[0.07] transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-white/35">{item.date}</span>
              <span className={`px-1.5 py-0.5 rounded border text-[10px] font-medium ${item.tagClass}`}>
                {item.tag}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-white/90 mb-1">{item.title}</h4>
            <p className="text-xs text-white/50 leading-relaxed">{item.body}</p>
            {item.link && (
              <a
                href={item.link.href}
                target={item.link.href.startsWith('http') ? '_blank' : undefined}
                rel={item.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-copper-400 hover:text-copper-300 transition-colors"
              >
                {item.link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
