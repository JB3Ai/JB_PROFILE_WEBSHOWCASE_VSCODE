import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, X, Check, Shield, Newspaper } from 'lucide-react';

interface GateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequest: (data: { email: string; intent: 'investor' | 'client' | 'collaborator' | 'press'; name: string; mode: 'access' | 'news'; newsletter: boolean }) => void;
  onSubmitLead?: (data: { name: string; email: string; intent: string; mode: string; newsletter: boolean }) => Promise<{ success: boolean; error?: string }>;
  context: 'investor' | 'client' | 'collaborator' | 'press';
}

const contextConfig = {
  investor: { title: 'Investor Access', subtitle: 'Instant entry to the private due diligence portal.', cta: 'Request Investor Access' },
  client: { title: 'Advisory Access', subtitle: 'Instant entry to the private portal.', cta: 'Request Access' },
  collaborator: { title: 'Collaboration Portal', subtitle: 'Partner access to JB³Ai systems and roadmap.', cta: 'Request Collaboration Access' },
  press: { title: 'Press Inquiries', subtitle: 'Media kit, founder briefs, and press assets.', cta: 'Request Press Kit' },
};

export function GateModal({ isOpen, onClose, onRequest, onSubmitLead, context }: GateModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'access' | 'news'>('access');
  const [intent, setIntent] = useState(context);
  const [newsletter, setNewsletter] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [submitting, setSubmitting] = useState(false);

  const config = contextConfig[context];

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);

    // Submit to Supabase if handler provided (non-blocking)
    if (onSubmitLead) {
      const result = await onSubmitLead({
        name: name.trim(),
        email: email.trim(),
        intent,
        mode,
        newsletter,
      });
      if (!result.success) {
        console.warn('Lead submission failed:', result.error);
        // Don't block the flow
      }
    }

    onRequest({ email: email.trim(), intent, name: name.trim(), mode, newsletter });
    setSubmitting(false);
    setStep('success');
    setTimeout(() => {
      setStep('form');
      setName('');
      setEmail('');
      setNewsletter(false);
      onClose();
    }, mode === 'access' ? 1000 : 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/90 md:bg-ink-950/60 backdrop-blur-none md:backdrop-blur-xl" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-white border border-ink-100 shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-copper-50 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-copper-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">{config.title}</h3>
                    <p className="text-xs text-ink-500">{config.subtitle}</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-warm-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {step === 'success' && (
                <motion.div className="py-8 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-ink-900 mb-1">
                    {mode === 'news' ? 'Intelligence Received' : 'Access Granted'}
                  </h4>
                  <p className="text-sm text-ink-500">
                    {mode === 'news' ? 'Welcome to the JB³Ai network.' : 'Entering the private portal...'}
                  </p>
                </motion.div>
              )}

              {step === 'form' && (
                <form onSubmit={handleRequest} className="space-y-4">
                  {/* Mode Toggle */}
                  <div className="flex rounded-xl bg-warm-100 p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setMode('access')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${mode === 'access' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'}`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Member Access
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('news')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${mode === 'news' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'}`}
                    >
                      <Newspaper className="w-3.5 h-3.5" />
                      Strategic Intelligence
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 mb-1.5">Legal Name</label>
                    <input
                      type="text" required
                      value={name} onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-100 transition-all bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 mb-1.5">Contact Address</label>
                    <input
                      type="email" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-100 transition-all bg-white"
                    />
                    <p className="text-[11px] text-ink-400 mt-1.5">Access is granted instantly. Your details go directly to Jonathan.</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setNewsletter(!newsletter)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${newsletter ? 'bg-copper-600 border-copper-600' : 'border-ink-300 bg-white hover:border-copper-400'}`}
                    >
                      {newsletter && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <label className="text-sm text-ink-600 leading-relaxed cursor-pointer" onClick={() => setNewsletter(!newsletter)}>
                      Keep me updated with JB³Ai news and product developments
                    </label>
                  </div>

                  {mode === 'access' && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 mb-1.5">Access Type</label>
                      <select
                        value={intent} onChange={e => setIntent(e.target.value as any)}
                        className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-100 transition-all bg-white"
                      >
                        <option value="client">Advisory / Client</option>
                        <option value="investor">Investor</option>
                        <option value="collaborator">Collaborator</option>
                        <option value="press">Press / Media</option>
                      </select>
                    </div>
                  )}

                  <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-2 disabled:opacity-50">
                    {submitting ? 'Submitting...' : mode === 'news' ? 'Initialize Access' : config.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
