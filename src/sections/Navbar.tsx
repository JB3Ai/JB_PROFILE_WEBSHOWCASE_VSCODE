import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavbarProps {
  onOpenGate: (context: 'investor' | 'client' | 'collaborator' | 'press') => void;
}

const navLinks = [
  { label: 'Founder', href: '#founder' },
  { label: 'Products', href: '#products' },
  { label: 'Isikulo', href: '#isikulo' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'GTR³', href: '#gtr3' },
  { label: 'Timeline', href: '#timeline' },
];

export function Navbar({ onOpenGate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-warm-50/95 backdrop-blur-none md:bg-warm-50/90 md:backdrop-blur-2xl border-b border-ink-200/20 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="content-max-width flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-primary/50 bg-transparent text-sm font-bold text-primary shadow-sm transition-colors hover:border-primary hover:bg-primary/5">
                JB³
              </div>
              <span className="text-sm font-medium tracking-wide nav-brand-name hidden sm:block">
                Jonathan Blackburn
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-warm-100 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <a
                href="/contact/"
                className="p-2.5 rounded-xl text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-warm-100 transition-all duration-200"
                aria-label="Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={() => onOpenGate('client')}
                className="btn-primary text-sm py-2.5 px-4"
              >
                Member Portal
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                className="p-2 rounded-xl text-ink-700 hover:bg-warm-100"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-warm-50 md:bg-warm-50/98 backdrop-blur-none md:backdrop-blur-2xl flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-padding pt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-900">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-ink-700 hover:bg-warm-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium text-ink-800 hover:text-copper-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6 flex flex-col gap-3 w-64">
                <button onClick={() => { setMobileOpen(false); onOpenGate('client'); }} className="btn-primary w-full justify-center">
                  Member Portal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
