import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { Founder } from '@/sections/Founder';
import { Portfolio } from '@/sections/Portfolio';
import { Isikulo } from '@/sections/Isikulo';
import { Evidence } from '@/sections/Evidence';
import { GTR3 } from '@/sections/GTR3';
import { DailyShow } from '@/sections/DailyShow';
import { Timeline } from '@/sections/Timeline';
import { Blog } from '@/sections/Blog';
import { Footer } from '@/sections/Footer';
import { GateModal } from '@/components/GateModal';
import { ExitIntent } from '@/components/ExitIntent';
import BootSequence, { BOOT_SESSION_KEY } from '@/components/boot/BootSequence';
import OSAuthSequence from '@/components/boot/OSAuthSequence';
import { useAuth } from '@/hooks/useAuth';
import { usePageMeta } from '@/hooks/usePageMeta';
import { sendLeadEmail } from '@/lib/notify';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  usePageMeta({
    title: 'Jonathan Blackburn: Systems Architect & Entrepreneur | JB³ OS',
    description: 'South African entrepreneur building AI systems, smart-home automation, and recovery architectures. Founder of JB³, iMED, and the OS³ ecosystem.',
    canonical: '/',
  });
  const { submitLead, authenticate } = useAuth();
  const nav = useNavigate();
  const [gateOpen, setGateOpen] = useState(false);
  const [gateContext, setGateContext] = useState<'investor' | 'client' | 'collaborator' | 'press'>('client');
  const [pendingEmail, setPendingEmail] = useState('');
  // Cinematic boot: shown once per browser session before the homepage reveals
  const [booted, setBooted] = useState(() => {
    try { return sessionStorage.getItem(BOOT_SESSION_KEY) === '1'; } catch { return false; }
  });
  // Secure OS entry handshake: plays after access is granted, before routing to /os
  const [authing, setAuthing] = useState(false);

  const completeBoot = () => {
    try { sessionStorage.setItem(BOOT_SESSION_KEY, '1'); } catch {}
    setBooted(true);
  };

  const handleOpenGate = (context: 'investor' | 'client' | 'collaborator' | 'press' = 'client') => {
    setGateContext(context);
    setPendingEmail('');
    setGateOpen(true);
  };

  const handleRequest = (data: { email: string; intent: 'investor' | 'client' | 'collaborator' | 'press'; name: string; mode: 'access' | 'news'; newsletter: boolean }) => {
    setPendingEmail(data.email);
    // Notify the owner with the lead details. No visitor code required.
    sendLeadEmail({
      name: data.name,
      email: data.email,
      intent: data.intent,
      mode: data.mode,
      newsletter: data.newsletter,
    });
    if (data.mode === 'access') {
      authenticate(data.email, data.intent);
      // Play the secure-entry handshake, then route into the private OS
      setAuthing(true);
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 texture-grain">
      <Navbar onOpenGate={handleOpenGate} />
      <main>
        <Hero onOpenGate={() => handleOpenGate('client')} />
        <Founder />
        <Portfolio onOpenGate={handleOpenGate} />
        <Isikulo onOpenGate={handleOpenGate} />
        <Evidence />
        <GTR3 />
        <DailyShow />
        <Timeline />
        <Blog />
      </main>
      <Footer onOpenGate={handleOpenGate} />
      <ExitIntent />
      <GateModal
        isOpen={gateOpen}
        onClose={() => { setGateOpen(false); setPendingEmail(''); }}
        onRequest={handleRequest}
        onSubmitLead={submitLead}
        context={gateContext}
      />

      {/* Public landing boot: brand introduction, once per session */}
      <AnimatePresence>
        {!booted && <BootSequence onComplete={completeBoot} />}
      </AnimatePresence>

      {/* Private OS entry: secure handshake after access is granted */}
      <AnimatePresence>
        {authing && (
          <OSAuthSequence
            userEmail={pendingEmail || 'Guest'}
            onComplete={() => nav('/os')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
