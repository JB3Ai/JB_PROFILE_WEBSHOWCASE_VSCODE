import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { usePageMeta } from '@/hooks/usePageMeta';
import { sendLeadEmail } from '@/lib/notify';
import { osApps } from '@/data/osApps';
import OSFiles from '@/components/os/OSFiles';
import OSNotepad from '@/components/os/OSNotepad';
import OSCalculator from '@/components/os/OSCalculator';
import OSInvestment from '@/components/os/OSInvestment';
import OSGTR3Preview from '@/components/os/OSGTR3Preview';
import OSNews from '@/components/os/OSNews';
import OSPhotos from '@/components/os/OSPhotos';
import {
  Search, Newspaper, Satellite, User, TrendingUp, Download, BookOpen,
  X, Minus, Square, LogOut, Lock, Mail, ArrowRight,
  Phone, FileText, ExternalLink, Menu, ChevronRight,
  FolderLock, SquarePen, Calculator, Rss, Images, ShieldAlert,
  Power, Contact, CalendarClock, Globe
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Search, Newspaper, Satellite, User, TrendingUp, Download, BookOpen, FileText,
  FolderLock, SquarePen, Calculator, Rss, Images, Contact, CalendarClock, Globe,
};

interface WindowState {
  id: string;
  title: string;
  content: string;
  pdfUrl?: string;
  files?: { label: string; url: string }[];
  category: string;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DesktopIcon {
  id: string;
  appId: string;
  label: string;
  x: number;
  y: number;
}

const desktopIcons: DesktopIcon[] = [
  { id: 'desk-1', appId: 'investigator-ai', label: 'InvestigatorAi', x: 20, y: 20 },
  { id: 'desk-2', appId: 'newsroom-ai', label: 'NewsroomAi', x: 20, y: 110 },
  { id: 'desk-3', appId: 'viewgrid', label: 'ViewGrid', x: 20, y: 200 },
  { id: 'desk-4', appId: 'cv-profile', label: 'CV Profile', x: 20, y: 290 },
  { id: 'desk-5', appId: 'investment-deck', label: 'Investment', x: 20, y: 380 },
  { id: 'desk-6', appId: 'gtr3-sneak-peek', label: 'GTR³ Book', x: 20, y: 470 },
  { id: 'desk-7', appId: 'files', label: 'Files', x: 20, y: 560 },
  { id: 'desk-8', appId: 'notepad', label: 'Notepad', x: 116, y: 20 },
  { id: 'desk-9', appId: 'calculator', label: 'Calculator', x: 116, y: 110 },
  { id: 'desk-10', appId: 'news', label: 'News', x: 116, y: 200 },
  { id: 'desk-11', appId: 'photos', label: 'Photos', x: 116, y: 290 },
  { id: 'desk-12', appId: 'contacts', label: 'Contacts', x: 116, y: 380 },
  { id: 'desk-13', appId: 'book-session', label: 'Book 30min', x: 116, y: 470 },
  { id: 'desk-14', appId: 'jb3-website', label: 'JB³ Site', x: 116, y: 560 },
];

export default function OS() {
  usePageMeta({
    title: 'JB³ Private OS | Secure Intelligence Portal',
    description: 'Restricted JB³ intelligence portal. Verified clearance required to access live architecture and confidential briefings.',
    canonical: '/os',
  });
  const { auth, logout, authenticate, submitLead } = useAuth();
  const nav = useNavigate();
  const [time, setTime] = useState(new Date());
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(!auth.isAuthenticated);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const [showDock, setShowDock] = useState(true);
  const [dockHover, setDockHover] = useState<number | null>(null);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
    try { return sessionStorage.getItem('jb_os_disclaimer') === '1'; } catch { return false; }
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setShowLogin(true);
    }
  }, [auth.isAuthenticated]);

  // Welcome notepad opens by default on OS entry (once per session)
  const notepadAutoOpened = useRef(false);
  useEffect(() => {
    if (!showLogin && auth.isAuthenticated && !notepadAutoOpened.current) {
      notepadAutoOpened.current = true;
      openApp('notepad');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLogin, auth.isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginName.trim()) return;
    authenticate(loginEmail.trim(), 'client');
    // Capture the lead and notify the owner (fire and forget)
    submitLead({ name: loginName.trim(), email: loginEmail.trim(), intent: 'client', mode: 'access', newsletter: false });
    sendLeadEmail({ name: loginName.trim(), email: loginEmail.trim(), intent: 'client', mode: 'access', newsletter: false });
    setShowLogin(false);
  };

  const acceptDisclaimer = () => {
    try { sessionStorage.setItem('jb_os_disclaimer', '1'); } catch {}
    setDisclaimerAccepted(true);
  };

  const openApp = useCallback((appId: string) => {
    const existing = windows.find(w => w.id === appId && !w.isMinimized);
    if (existing) {
      bringToFront(appId);
      return;
    }
    const app = osApps.find(a => a.id === appId);
    if (!app) return;
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const offset = windows.length * 30;
    const newWindow: WindowState = {
      id: appId,
      title: app.title,
      content: app.content || '',
      pdfUrl: app.pdfUrl,
      files: app.files,
      category: app.category,
      isMaximized: false,
      isMinimized: false,
      zIndex: zIndexCounter + 1,
      x: 280 + offset,
      y: 40 + offset,
      width: app.width ?? 640,
      height: app.height ?? 480,
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(appId);
    setZIndexCounter(prev => prev + 1);
  }, [windows, zIndexCounter]);

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindow === id) setActiveWindow(null);
  };

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
    bringToFront(id);
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    bringToFront(id);
  };

  const bringToFront = (id: string) => {
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w));
    setActiveWindow(id);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-[#05080F] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#05080F] to-[#0B0F19]" />
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/images/os-wallpaper.jpg')` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(196,102,58,0.10),transparent_55%)]" />
        <motion.div
          className="relative w-full max-w-md rounded-2xl bg-[#0B0F19]/85 border border-white/10 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(180,138,74,0.12)]"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-copper-600/20 border border-copper-500/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_rgba(180,138,74,0.18)]">
              <Lock className="w-7 h-7 text-copper-400" />
            </div>
            <h1 className="text-xl font-semibold text-white mb-1">OS³ Portal</h1>
            <p className="text-sm text-white/50">Private access to intelligence tools and founder assets.</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono tracking-[0.18em] text-emerald-400/80">SECURE CHANNEL READY</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text" required
                value={loginName} onChange={e => setLoginName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-copper-500/50 focus:shadow-[0_0_18px_rgba(180,138,74,0.12)] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email" required
                value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-copper-500/50 focus:shadow-[0_0_18px_rgba(180,138,74,0.12)] transition-all"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-copper-600 text-white text-sm font-medium hover:bg-copper-500 hover:shadow-[0_0_24px_rgba(196,102,58,0.35)] transition-all flex items-center justify-center gap-2">
              Enter Private OS
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-4">
            Don't have access? <button onClick={() => nav('/')} className="text-copper-400 hover:text-copper-300">Request access</button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080F] text-white relative overflow-hidden select-none">
      {/* Desktop Background: deep slate + hex texture + gold ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#05080F] to-[#0B0F19]" />
      <div
        className="absolute inset-0 opacity-45 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/images/os-wallpaper.jpg')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,102,58,0.07),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(180,138,74,0.05),transparent_45%)]" />
      <div className="absolute inset-0 bg-[#05080F]/35" />

      {/* Top Bar */}
      <div className="relative z-50 h-10 flex items-center justify-between px-4 bg-[#0B0F19]/70 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-copper-600 flex items-center justify-center shadow-[0_0_14px_rgba(196,102,58,0.45)]">
            <span className="text-white text-[10px] font-bold">JB</span>
          </div>
          <span className="text-xs font-medium text-white/70">OS³</span>
          <div className="hidden sm:flex items-center gap-2 ml-4">
            <button onClick={() => setShowDock(!showDock)} className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/5 transition-colors">
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] font-mono tracking-[0.18em] text-emerald-400/80 hidden xs:block sm:block">SYSTEMS NOMINAL</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/50 font-mono">
            {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-xs text-white/40 hidden sm:block">{auth.email || 'Guest'}</span>
          <button onClick={() => { logout(); nav('/'); }} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Shutdown: exit to jonoblackburn.com">
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="relative z-10 p-6 h-[calc(100vh-40px-48px)]">
        <div className="relative w-full h-full">
          {desktopIcons.map((icon) => {
            const app = osApps.find(a => a.id === icon.appId);
            const Icon = iconMap[app?.icon || ''] || FileText;
            return (
              <motion.button
                key={icon.id}
                className="absolute flex flex-col items-center gap-2 w-20 group"
                style={{ left: icon.x, top: icon.y }}
                onClick={() => openApp(icon.appId)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-white/15 group-hover:border-copper-500/30 group-hover:shadow-[0_0_24px_rgba(180,138,74,0.25)] transition-all shadow-lg">
                  <Icon className="w-7 h-7 text-copper-400" />
                </div>
                <span className="text-[11px] text-white/80 font-medium text-center leading-tight drop-shadow-lg px-1 py-0.5 rounded bg-black/20 backdrop-blur-sm">
                  {icon.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.filter(w => !w.isMinimized).map((win) => (
          <motion.div
            key={win.id}
            drag
            dragMomentum={false}
            onDragStart={() => bringToFront(win.id)}
            onClick={() => bringToFront(win.id)}
            className={`fixed z-[60] rounded-xl overflow-hidden border transition-shadow duration-300 ${
              win.isMaximized ? 'inset-4' : ''
            } ${activeWindow === win.id
              ? 'border-copper-500/30 shadow-[0_0_50px_rgba(180,138,74,0.16)]'
              : 'border-white/10 shadow-2xl'
            }`}
            style={{
              zIndex: win.zIndex,
              ...(win.isMaximized ? {} : { left: win.x, top: win.y, width: win.width, height: win.height }),
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Window Title Bar: traffic lights + centered mono title */}
            <div className="h-10 flex items-center px-4 bg-[#15181E]/95 backdrop-blur-xl border-b border-white/5 cursor-move relative">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => closeWindow(win.id)}
                  className="group w-3 h-3 rounded-full bg-[#E63946]/70 hover:bg-[#E63946] transition-colors flex items-center justify-center"
                  title="Close"
                >
                  <X className="w-2 h-2 text-transparent group-hover:text-white/90 transition-colors" />
                </button>
                <button
                  onClick={() => minimizeWindow(win.id)}
                  className="group w-3 h-3 rounded-full bg-[#FACC15]/70 hover:bg-[#FACC15] transition-colors flex items-center justify-center"
                  title="Minimize"
                >
                  <Minus className="w-2 h-2 text-transparent group-hover:text-black/70 transition-colors" />
                </button>
                <button
                  onClick={() => maximizeWindow(win.id)}
                  className="group w-3 h-3 rounded-full bg-[#4ADE80]/70 hover:bg-[#4ADE80] transition-colors flex items-center justify-center"
                  title="Maximize"
                >
                  <Square className="w-1.5 h-1.5 text-transparent group-hover:text-black/70 transition-colors" />
                </button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">{win.title}</span>
                {win.category === 'intelligence' && (
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-medium">INTEL</span>
                )}
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 bg-[#0B0F19]/95 overflow-y-auto" style={{ height: win.isMaximized ? 'calc(100% - 40px)' : `${win.height - 40}px` }}>
              {win.content && (
                <p className="text-sm text-white/70 leading-relaxed mb-6 whitespace-pre-line">{win.content}</p>
              )}

              {win.id === 'files' && <OSFiles />}
              {win.id === 'notepad' && <OSNotepad />}
              {win.id === 'calculator' && <OSCalculator />}
              {win.id === 'investment-deck' && <OSInvestment />}
              {win.id === 'gtr3-sneak-peek' && <OSGTR3Preview />}
              {win.id === 'news' && <OSNews />}
              {win.id === 'photos' && <OSPhotos />}
              {win.id === 'contacts' && (
                <div className="space-y-3">
                  <iframe
                    src="https://jonoblackburncontact.kimi.page"
                    title="All My Contacts"
                    className="w-full h-[430px] rounded-lg bg-white border border-white/10"
                  />
                  <a
                    href="https://jonoblackburncontact.kimi.page"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-copper-400 hover:text-copper-300 transition-colors"
                  >
                    Open full directory in a new tab
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {win.files && win.files.length > 0 && (
                <div className="space-y-2 mb-6">
                  {win.files.map((file) => (
                    <a
                      key={file.url}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-copper-500/40 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(180,138,74,0.10)] transition-all group"
                    >
                      <Download className="w-4 h-4 text-copper-400 shrink-0" />
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors">{file.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {win.pdfUrl && (
                <div className="space-y-3">
                  <a
                    href={win.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-600/20 text-copper-400 text-sm font-medium hover:bg-copper-600/30 hover:shadow-[0_0_20px_rgba(180,138,74,0.15)] transition-all border border-copper-500/20"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                  <div className="mt-3 rounded-lg bg-ink-800/50 border border-white/5 overflow-hidden">
                    <iframe
                      src={win.pdfUrl}
                      className="w-full h-80 bg-white"
                      title={win.title}
                    />
                  </div>
                </div>
              )}

              {/* Contact info for profile */}
              {win.id === 'cv-profile' && (
                <div className="mt-6 space-y-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Contact Details</h4>
                    <div className="space-y-2">
                      <a href="mailto:hi@jb3ai.com" className="flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300">
                        <Mail className="w-4 h-4" /> hi@jb3ai.com
                      </a>
                      <a href="mailto:jono@jb3ai.com" className="flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300">
                        <Mail className="w-4 h-4" /> jono@jb3ai.com
                      </a>
                      <a href="https://wa.me/27719691848" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300">
                        <Phone className="w-4 h-4" /> WhatsApp
                      </a>
                      <a href="https://www.linkedin.com/in/jonathanblackburn0793120688/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300">
                        <ExternalLink className="w-4 h-4" /> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Investment-specific */}
              {win.id === 'investment-deck' && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/60 mb-3">
                    For direct investment inquiries and due diligence discussions, please contact:
                  </p>
                  <a href="mailto:jono@jb3ai.com" className="inline-flex items-center gap-2 text-sm text-copper-400 hover:text-copper-300">
                    <Mail className="w-4 h-4" /> jono@jb3ai.com
                  </a>
                </div>
              )}

              {win.category === 'intelligence' && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Intelligence Module</p>
                  <p className="text-sm text-white/60">This tool requires additional verification. Contact hi@jb3ai.com for full deployment access.</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dock with magnification physics */}
      <AnimatePresence>
        {showDock && (
          <motion.div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[150] flex items-end gap-1.5 px-3 py-2 rounded-2xl bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.55)] max-w-[calc(100vw-2rem)] overflow-x-auto"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {osApps.map((app, index) => {
              const Icon = iconMap[app.icon] || FileText;
              const isOpen = windows.some(w => w.id === app.id && !w.isMinimized);
              const isMinimized = windows.some(w => w.id === app.id && w.isMinimized);
              const dist = dockHover === null ? null : Math.abs(index - dockHover);
              const scale = dist === null ? 1 : dist === 0 ? 1.3 : dist === 1 ? 1.12 : dist === 2 ? 1.04 : 1;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    if (isMinimized) restoreWindow(app.id);
                    else if (isOpen) bringToFront(app.id);
                    else openApp(app.id);
                  }}
                  onMouseEnter={() => setDockHover(index)}
                  onMouseLeave={() => setDockHover(null)}
                  className="group relative flex flex-col items-center transition-transform duration-200 ease-out"
                  style={{ transform: `scale(${scale}) translateY(${dist === 0 ? -6 : 0}px)` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isOpen
                      ? 'bg-white/15 shadow-[0_0_18px_rgba(180,138,74,0.20)]'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${isOpen ? 'text-copper-400' : 'text-white/70'}`} />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 px-2 py-1 rounded-md bg-[#15181E] border border-white/10 text-white text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {app.title}
                  </div>
                  {/* Active dot */}
                  {(isOpen || isMinimized) && (
                    <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  )}
                </button>
              );
            })}
            <div className="w-px h-8 bg-white/10 mx-1 self-center" />
            <button
              onClick={() => { logout(); nav('/'); }}
              onMouseEnter={() => setDockHover(osApps.length)}
              onMouseLeave={() => setDockHover(null)}
              className="group relative flex flex-col items-center transition-transform duration-200 ease-out"
              style={{ transform: `scale(${dockHover === osApps.length ? 1.3 : 1}) translateY(${dockHover === osApps.length ? -6 : 0}px)` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all">
                <LogOut className="w-6 h-6 text-white/70" />
              </div>
              <div className="absolute bottom-full mb-2 px-2 py-1 rounded-md bg-[#15181E] border border-white/10 text-white text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Exit OS
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Windows Bar */}
      {windows.some(w => w.isMinimized) && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[140] flex items-center gap-2">
          {windows.filter(w => w.isMinimized).map(win => {
            const app = osApps.find(a => a.id === win.id);
            const Icon = iconMap[app?.icon || ''] || FileText;
            return (
              <button
                key={win.id}
                onClick={() => restoreWindow(win.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#15181E]/85 backdrop-blur-md border border-white/10 text-xs text-white/70 hover:text-white hover:border-copper-500/30 transition-colors"
              >
                <Icon className="w-4 h-4 text-copper-400" />
                {win.title}
                <ChevronRight className="w-3 h-3" />
              </button>
            );
          })}
        </div>
      )}

      {/* Portal Disclaimer: shown once per session on OS entry */}
      <AnimatePresence>
        {!disclaimerAccepted && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#05080F]/85 backdrop-blur-md" />
            <motion.div
              className="relative w-full max-w-lg rounded-2xl bg-[#0B0F19]/95 border border-copper-500/20 p-8 shadow-[0_0_60px_rgba(180,138,74,0.12)]"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-copper-600/20 border border-copper-500/20 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-copper-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Portal Disclaimer</h2>
                  <p className="text-xs text-white/40">Review before continuing</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-white/60 leading-relaxed mb-6">
                <p>This private portal contains preview material, concept demonstrations, and confidential documentation relating to Jonathan Blackburn and JB³Ai. Content is provided for review purposes only.</p>
                <p>Nothing in this portal constitutes an offer of securities, investment advice, or a solicitation of any kind. Product demonstrations may display simulated data.</p>
                <p>Do not distribute, reproduce, or share portal content without written permission.</p>
              </div>
              <button
                onClick={acceptDisclaimer}
                className="w-full py-3 rounded-xl bg-copper-600 text-white text-sm font-medium hover:bg-copper-500 hover:shadow-[0_0_24px_rgba(196,102,58,0.35)] transition-all"
              >
                Accept and Enter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
