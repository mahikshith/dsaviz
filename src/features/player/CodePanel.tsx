'use client';

import { useEffect, useRef } from 'react';
import { LANGUAGE_LABEL } from '@/lib/site';
import type { Language } from '@/lib/content/schema';
import { usePlayer } from './PlayerProvider';
import { Segmented } from './Segmented';
import styles from './player.module.css';

/** Read-only reference code. The highlighted lines come from the current frame's semantic anchor. */
export function CodePanel() {
  const { state, dispatch, lesson } = usePlayer();
  const listings = lesson.code[state.run.approachId] ?? {};
  const languages = Object.keys(listings) as Language[];
  const language = languages.includes(state.language) ? state.language : languages[0];
  const listing = language ? listings[language] : undefined;
  const anchor = state.run.frames[state.cursor]!.event.anchor;
  const active = new Set(listing?.anchors[anchor] ?? []);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the active line visible inside the panel without scrolling the page.
  useEffect(() => {
    const box = scrollRef.current;
    const line = box?.querySelector<HTMLElement>('[data-active]');
    if (!box || !line) return;
    const top = line.offsetTop - box.offsetTop;
    if (top < box.scrollTop || top + line.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTo({ top: Math.max(0, top - box.clientHeight / 3), behavior: 'smooth' });
    }
  }, [anchor, language]);

  if (!listing || !language) return null;
  const approach = lesson.approaches.find((a) => a.id === state.run.approachId)!;

  return (
    <section className={styles.codePanel} aria-label={`Reference code, ${LANGUAGE_LABEL[language]}`}>
      <div className={styles.codeHead}>
        <p className={styles.codeTitle}>
          Reference code <span>· {approach.name} · read-only</span>
        </p>
        {languages.length > 1 && (
          <Segmented
            label="Code language"
            small
            value={language}
            options={languages.map((l) => ({ value: l, label: LANGUAGE_LABEL[l] }))}
            onChange={(l) => dispatch({ type: 'language', language: l as Language })}
          />
        )}
      </div>
      <div ref={scrollRef} className={styles.codeScroll}>
        <pre className={styles.code}>
          <code>
            {listing.lines.map((tokens, i) => {
              const n = i + 1;
              const on = active.has(n);
              return (
                <span key={n} className={styles.codeLine} data-active={on || undefined}>
                  <span className={styles.lineNo} aria-hidden>
                    {n}
                  </span>
                  {tokens.length === 0
                    ? ' '
                    : tokens.map((t, k) =>
                        t.k === 'txt' ? (
                          <span key={k}>{t.v}</span>
                        ) : (
                          <span key={k} className={`tok-${t.k}`}>
                            {t.v}
                          </span>
                        ),
                      )}
                  {on && <span className="sr-only"> (current step)</span>}
                  {'\n'}
                </span>
              );
            })}
          </code>
        </pre>
      </div>
    </section>
  );
}
