import { useEffect, useState } from 'react';
import { Sun, Moon, CircleDot } from 'lucide-react';

type Theme = 'day' | 'default' | 'dark';

const STATES: { key: Theme; label: string; icon: typeof Sun }[] = [
  { key: 'day', label: 'Day theme', icon: Sun },
  { key: 'default', label: 'Default theme', icon: CircleDot },
  { key: 'dark', label: 'Dark theme', icon: Moon },
];

const STORAGE_KEY = 'jb-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'day' || saved === 'dark') setTheme(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const apply = (t: Theme) => {
    setTheme(t);
    try {
      if (t === 'default') {
        delete document.documentElement.dataset.theme;
        localStorage.removeItem(STORAGE_KEY);
      } else {
        document.documentElement.dataset.theme = t;
        localStorage.setItem(STORAGE_KEY, t);
      }
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <div
      role="group"
      aria-label="Theme switch"
      className="flex items-center rounded-full border border-ink-200/60 bg-white/95 md:bg-white/70 backdrop-blur-none md:backdrop-blur-md p-0.5 shadow-xs"
    >
      {STATES.map(({ key, label, icon: Icon }) => {
        const active = theme === key;
        return (
          <button
            key={key}
            onClick={() => apply(key)}
            title={label}
            aria-label={label}
            aria-pressed={active}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              active
                ? 'bg-copper-600 text-white shadow-sm scale-105'
                : 'text-ink-500 hover:text-ink-900 hover:bg-warm-100'
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}
