'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './lesson.module.css';

type Entry = { id: string; term: string; definition: string };

/**
 * Explains glossary terms in place. Term buttons are rendered into lesson prose
 * at build time; one listener here opens a short definition next to the term.
 */
export function GlossaryLayer({ entries }: { entries: Entry[] }) {
  const [open, setOpen] = useState<{ entry: Entry; button: HTMLButtonElement; top: number; left: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((refocus: boolean) => {
    setOpen((cur) => {
      if (cur) {
        cur.button.setAttribute('aria-expanded', 'false');
        if (refocus) cur.button.focus();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    const byId = new Map(entries.map((e) => [e.id, e]));
    const onClick = (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest<HTMLButtonElement>('button.term');
      if (button) {
        const entry = byId.get(button.dataset.term ?? '');
        if (!entry) return;
        e.preventDefault();
        setOpen((cur) => {
          cur?.button.setAttribute('aria-expanded', 'false');
          if (cur?.button === button) return null;
          const r = button.getBoundingClientRect();
          button.setAttribute('aria-expanded', 'true');
          const width = Math.min(320, window.innerWidth - 32);
          return {
            entry,
            button,
            top: r.bottom + window.scrollY + 8,
            left: Math.max(16, Math.min(r.left + window.scrollX, window.scrollX + window.innerWidth - width - 16)),
          };
        });
        return;
      }
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) close(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [entries, close]);

  if (!open) return null;
  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={`Definition: ${open.entry.term}`}
      className={styles.glossary}
      style={{ top: open.top, left: open.left }}
    >
      <p className={styles.glossaryTerm}>{open.entry.term}</p>
      <p>{open.entry.definition}</p>
      <button type="button" className={styles.glossaryClose} onClick={() => close(true)}>
        Close
      </button>
    </div>
  );
}
