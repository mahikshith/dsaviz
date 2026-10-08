'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import styles from './ui.module.css';

export type InnerTab = { id: string; label: string; content: ReactNode };

/**
 * Tabs inside a card, so related short sections share one panel instead of
 * stacking into a long column. Arrow keys move between tabs (WAI-ARIA tabs pattern).
 */
export function InnerTabs({ tabs, label, initial, onChange }: { tabs: InnerTab[]; label: string; initial?: string; onChange?: (id: string) => void }) {
  const [active, setActive] = useState(initial ?? tabs[0]?.id);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, tabs.findIndex((t) => t.id === active));
  const select = (i: number, focus = false) => {
    const t = tabs[i];
    if (!t) return;
    setActive(t.id);
    onChange?.(t.id);
    if (focus) refs.current[i]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = tabs.length;
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i + n - 1) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next, true);
  };
  const current = tabs[index];
  return (
    <div className={styles.innerTabs}>
      <div role="tablist" aria-label={label} className={styles.tabList}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-${t.id}`}
            aria-selected={i === index}
            aria-controls={`${base}-panel`}
            tabIndex={i === index ? 0 : -1}
            className={styles.tabButton}
            onClick={() => select(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-${current?.id}`} tabIndex={0} className={styles.tabPanel}>
        {current?.content}
      </div>
    </div>
  );
}
