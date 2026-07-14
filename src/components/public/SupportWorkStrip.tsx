import { motion } from 'framer-motion'

const sponsorActions = [
  {
    id: 'sponsor-isikolo',
    label: 'Sponsor Isikolo',
    mark: 'SI',
    href: 'https://paybru.co.za/communities/jonoblackburn-become-a-founding-sponsor'
  },
  {
    id: 'sponsor-learner',
    label: 'Sponsor a Learner',
    mark: 'SL',
    href: 'https://paybru.co.za/communities/jonoblackburn-become-a-founding-sponsor'
  },
  {
    id: 'fund-ai-credits',
    label: 'Fund AI Credits',
    mark: 'AI',
    href: 'https://paypal.me/jonoblackburnza'
  },
  {
    id: 'support-free-education',
    label: 'Support Free Education',
    mark: 'FE',
    href: 'https://ko-fi.com/D0K721OP8E'
  },
  {
    id: 'founding-sponsor',
    label: 'Become a Founding Sponsor',
    mark: 'FS',
    href: 'https://paybru.co.za/communities/jonoblackburn-become-a-founding-sponsor'
  },
  {
    id: 'gtr3-limited-edition',
    label: 'Reserve GTR³ Limited Edition',
    mark: 'G3',
    href: 'https://paypal.me/jonoblackburnza'
  }
]

const isikoloCutSheetHref = '/resources/product-cutsheets/os3-core-isikoloai-cutsheet-v01.pdf'

export default function SupportWorkStrip() {
  return (
    <section id="support-the-work" className="public-section section-anchor">
      <div className="container-shell-wide">
        <motion.div
          className="rounded-[1rem] border p-5 md:p-7"
          style={{
            borderColor: 'rgba(173, 198, 220, 0.12)',
            background:
              'linear-gradient(135deg, rgba(116,211,164,0.045), rgba(255,255,255,0.012) 38%, rgba(233,201,143,0.028)), linear-gradient(180deg, rgba(9,17,26,0.94), rgba(5,11,17,0.98))',
            boxShadow: '0 14px 32px rgba(1, 6, 12, 0.16)'
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)] lg:items-center">
            <div>
              <p className="public-kicker">Support</p>
              <h2 className="public-title" style={{ color: '#ffffff' }}>Sponsor Isikolo</h2>
              <div className="mt-4 space-y-3">
                <p className="public-intro" style={{ color: 'rgba(220, 220, 220, 0.95)' }}>Isikolo is built.</p>
                <p className="public-copy" style={{ color: 'rgba(180, 188, 196, 0.9)' }}>
                  It is a free AI-powered education app created to support South African learners with
                  schoolwork, study help, revision, explanations, and practical learning support.
                </p>
                <p className="public-copy" style={{ color: 'rgba(180, 188, 196, 0.9)' }}>
                  The mission is simple: keep Isikolo free for learners in South Africa.
                </p>
                <p className="public-copy" style={{ color: 'rgba(180, 188, 196, 0.9)' }}>
                  We are opening founding support to help fund the next phase: AI credits, hosting,
                  platform infrastructure, curriculum content, local language support, learner access,
                  and continued development.
                </p>
                <p className="public-copy" style={{ color: 'rgba(180, 188, 196, 0.9)' }}>
                  International supporters, sponsors, and partners can help make free access possible.
                </p>
                <p className="public-copy" style={{ color: 'rgba(180, 188, 196, 0.9)' }}>
                  Isikolo is built.
                  <br />
                  Now help keep it free.
                </p>
              </div>
              <p className="mt-5 text-xs leading-6" style={{ color: 'rgba(148, 168, 186, 0.82)' }}>
                Support payments are not charitable donations and are not tax-deductible. Support
                contributes to independent education technology, learner access, AI credits, hosting,
                content, and platform development.
              </p>
              <a
                href={isikoloCutSheetHref}
                target="_blank"
                rel="noopener noreferrer"
                className="public-link-button"
                aria-label="View IsikoloAI cut sheet"
              >
                View IsikoloAI cut sheet
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {sponsorActions.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[0.85rem] border px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/25"
                  style={{
                    borderColor: 'rgba(173, 198, 220, 0.12)',
                    background: 'rgba(255, 255, 255, 0.035)'
                  }}
                  aria-label={`${action.label} using a simple external support link`}
                >
                  <span
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-[0.7rem] text-[11px] font-semibold tracking-[0.16em]"
                    style={{
                      color: '#071018',
                      background: 'linear-gradient(135deg, rgba(233,201,143,0.94), rgba(116,211,164,0.86))'
                    }}
                    aria-hidden="true"
                  >
                    {action.mark}
                  </span>
                  <span className="block text-sm font-semibold text-white">{action.label}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    External link
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
