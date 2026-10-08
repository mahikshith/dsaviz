'use client';

import { useState } from 'react';
import { LANGUAGE_LABEL } from '@/lib/site';
import type { CodeListing } from '@/lib/content/code';
import type { Language } from '@/lib/content/schema';
import { Segmented } from '@/features/player/Segmented';
import styles from '@/features/player/player.module.css';

export type SolutionCode = { id: string; name: string; code: Partial<Record<Language, CodeListing>> };

/** Read-only reference solutions for lessons without a walkthrough. */
export function StaticCodePanel({ solutions, initial }: { solutions: SolutionCode[]; initial?: string }) {
  const [active, setActive] = useState(initial ?? solutions[solutions.length - 1]?.id);
  const [language, setLanguage] = useState<Language>('python');
  const solution = solutions.find((s) => s.id === active) ?? solutions[0];
  if (!solution) return null;
  const languages = Object.keys(solution.code) as Language[];
  const lang = languages.includes(language) ? language : languages[0]!;
  const listing = solution.code[lang]!;
  return (
    <section className={styles.codePanel} aria-label={`Reference solution: ${solution.name}, ${LANGUAGE_LABEL[lang]}`}>
      <div className={styles.codeHead}>
        <p className={styles.codeTitle}>
          Reference solution <span>· read-only</span>
        </p>
        {languages.length > 1 && (
          <Segmented
            label="Code language"
            small
            value={lang}
            options={languages.map((l) => ({ value: l, label: LANGUAGE_LABEL[l] }))}
            onChange={(l) => setLanguage(l as Language)}
          />
        )}
      </div>
      {solutions.length > 1 && (
        <div className={styles.codeHead}>
          <Segmented
            label="Approach"
            small
            value={solution.id}
            options={solutions.map((s) => ({ value: s.id, label: s.name }))}
            onChange={setActive}
          />
        </div>
      )}
      <div className={styles.codeScroll} style={{ maxHeight: 560 }}>
        <pre className={styles.code}>
          <code>
            {listing.lines.map((tokens, i) => (
              <span key={i} className={styles.codeLine}>
                <span className={styles.lineNo} aria-hidden>
                  {i + 1}
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
                {'\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </section>
  );
}
