import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { sendLeadEmail } from '@/lib/notify';

const SHOWN_KEY = 'jb-exit-intent-shown';
const MIN_DWELL_MS = 12000;

/**
 * Exit-intent capture. Fires once per session when the pointer leaves the
 * top edge of the viewport after a minimum dwell time. Posts the lead to
 * the existing cPanel mailer so the owner receives email + phone.
 */
export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SHOWN_KEY)) return;
    const armedAt = Date.now() + MIN_DWELL_MS;

    const onLeave = (e: MouseEvent) => {
      if (Date.now() < armedAt) return;
      if (e.clientY > 8) return; // only when exiting toward the top chrome
      sessionStorage.setItem(SHOWN_KEY, '1');
      setOpen(true);
    };

    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => document.documentElement.removeEventListener('mouseleave', onLeave);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    await sendLeadEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      intent: 'exit-see-more',
      mode: 'access',
      newsletter: true,
    });
    setSending(false);
    setDone(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0c0e13]/90 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#1b1e27] to-[#101218] p-8 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-40"
              style={{ background: 'radial-gradient(70% 100% at 50% 0%, rgba(240,200,120,0.14), transparent 75%)' }}
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10">
              <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0c878]">
                Before you go
              </span>
              <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white">
                Want to see more?
              </h3>

              {done ? (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#f0c878]/25 bg-[#f0c878]/[0.06] p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f0c878] to-[#c98f3d]">
                    <Check className="h-3.5 w-3.5 text-[#241708]" strokeWidth={3} />
                  </span>
                  <p className="text-sm leading-relaxed text-white/70">
                    Request received. Access details and JB³Ai updates are on their way to your inbox.
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-5 text-sm leading-relaxed text-white/55">
                    Subscribe for JB³Ai updates and request verified access to the Private OS portal: gated intelligence tools, briefings, and the GTR³ archive.
                  </p>
                  <form onSubmit={submit} className="space-y-3">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#f0c878]/50"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#f0c878]/50"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp (optional)"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#f0c878]/50"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f0c878] to-[#c98f3d] px-4 py-2.5 text-sm font-semibold text-[#241708] shadow-[0_10px_24px_-8px_rgba(201,143,61,0.7)] transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {sending ? 'Sending...' : 'Subscribe and Request Access'}
                      {!sending && <ArrowUpRight className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="w-full pt-1 text-center text-xs text-white/35 transition-colors hover:text-white/60"
                    >
                      Maybe later
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
