'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';
import styles from './shell.module.css';

type Theme = 'light' | 'dark' | 'terminal';
const KEY = `${SITE.storagePrefix}:theme`;

const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
  {
    id: 'light',
    label: 'Light',
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1 1M17.4 17.4l1 1M5.6 18.4l1-1M17.4 6.6l1-1" />
      </g>
    ),
  },
  {
    id: 'dark',
    label: 'Dark',
    icon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: <path d="M5 7l5 5-5 5M12 18h7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

export function ThemeToggle() {
  // The inline script in layout.tsx has already set data-theme; read it after mount.
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => setTheme((document.documentElement.dataset.theme as Theme) ?? 'light'), []);

  const pick = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* the choice simply won't persist */
    }
    setTheme(next);
  };

  return (
    <div role="group" aria-label="Theme" className={styles.themes}>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={styles.themeBtn}
          aria-pressed={theme === t.id}
          aria-label={`${t.label} theme`}
          title={`${t.label} theme`}
          onClick={() => pick(t.id)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            {t.icon}
          </svg>
        </button>
      ))}
    </div>
  );
}
