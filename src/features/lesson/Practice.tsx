'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useProgress } from '@/features/progress/ProgressProvider';
import { LANGUAGE_LABEL, SITE } from '@/lib/site';
import type { Language } from '@/lib/content/schema';
import styles from './lesson.module.css';

export type Sample = { label: string; input: string; output: string; explanation: string };

const draftKey = (problemId: string, lang: Language) => `${SITE.storagePrefix}:draft:${problemId}:${lang}`;

/**
 * An honest scratchpad. There is no code runner yet, so nothing here claims a
 * result: the learner checks their own work against samples and a checklist.
 * Drafts stay in this browser and never go into URLs.
 */
export function PracticeEditor({ problemId, starter }: { problemId: string; starter: Partial<Record<Language, string>> }) {
  const languages = Object.keys(starter) as Language[];
  const [lang, setLang] = useState<Language>(languages[0] ?? 'python');
  const [text, setText] = useState(starter[lang] ?? '');
  const [saved, setSaved] = useState<'idle' | 'saved' | 'unsaved'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  useEffect(() => {
    try {
      setText(window.localStorage.getItem(draftKey(problemId, lang)) ?? starter[lang] ?? '');
    } catch {
      setText(starter[lang] ?? '');
    }
  }, [problemId, lang, starter]);

  const onChange = (value: string) => {
    setText(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(draftKey(problemId, lang), value);
        setSaved('saved');
      } catch {
        setSaved('unsaved');
      }
    }, 400);
  };

  const reset = () => {
    if (!window.confirm('Replace your draft with the starter code?')) return;
    try {
      window.localStorage.removeItem(draftKey(problemId, lang));
    } catch {
      /* nothing stored */
    }
    setText(starter[lang] ?? '');
  };

  // Tab inserts spaces; Escape then Tab leaves the editor, as with most code editors.
  const escaped = useRef(false);
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      escaped.current = true;
      return;
    }
    if (e.key === 'Tab' && !e.shiftKey && !escaped.current) {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: end } = el;
      const next = text.slice(0, s) + '    ' + text.slice(end);
      onChange(next);
      requestAnimationFrame(() => el.setSelectionRange(s + 4, s + 4));
    }
    escaped.current = false;
  };

  return (
    <section className={styles.editor} aria-labelledby={`${id}-title`}>
      <div className={styles.editorHead}>
        <h2 id={`${id}-title`} className={styles.editorTitle}>
          Your scratchpad
        </h2>
        <label className={styles.editorLang}>
          <span className="sr-only">Language</span>
          <select value={lang} onChange={(e) => setLang(e.target.value as Language)}>
            {languages.map((l) => (
              <option key={l} value={l}>
                {LANGUAGE_LABEL[l]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label htmlFor={`${id}-code`} className="sr-only">
        Your {LANGUAGE_LABEL[lang]} solution
      </label>
      <textarea
        id={`${id}-code`}
        className={styles.textarea}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        aria-describedby={`${id}-note`}
      />
      <div className={styles.editorFoot}>
        <p id={`${id}-note`} className={styles.editorNote}>
          Code does not run here yet. Trace your solution by hand on the samples, then use the checklist. Press Esc, then Tab, to
          leave the editor.
          {saved === 'saved' && ' Draft saved in this browser.'}
          {saved === 'unsaved' && ' This browser is not saving drafts.'}
        </p>
        <button type="button" className="btn btn-quiet btn-small" onClick={reset}>
          Reset to starter
        </button>
      </div>
    </section>
  );
}

export function PracticeChecklist({
  statement,
  samples,
  selfCheck,
  problemId,
  contentVersion,
  practiceLink,
}: {
  statement: ReactNode;
  samples: Sample[];
  selfCheck: string[];
  problemId: string;
  contentVersion: number;
  practiceLink?: { label: string; url: string };
}) {
  const progress = useProgress();
  const mine = progress.doc.problems[problemId];
  const practiced = Boolean(mine?.practiced);
  const review = Boolean(mine?.reviewRequested);
  return (
    <>
      <div className={styles.paper}>
        <span className="eyebrow">The task</span>
        {statement}
      </div>
      <div className={styles.paper}>
        <span className="eyebrow">Samples to check by hand</span>
        <ul className={styles.samples}>
          {samples.map((s) => (
            <li key={s.label}>
              <p className={styles.sampleLabel}>{s.label}</p>
              <p>
                <code>{s.input}</code>
              </p>
              <p>
                Expected: <code>{s.output}</code>
              </p>
              <p className={styles.sampleNote}>{s.explanation}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.paper}>
        <span className="eyebrow">Self-check</span>
        <ul className={styles.checklist}>
          {selfCheck.map((c) => (
            <li key={c}>
              <label>
                <input type="checkbox" /> {c}
              </label>
            </li>
          ))}
        </ul>
        <div className={styles.practiceActions}>
          <button
            type="button"
            className={`btn btn-done ${practiced ? '' : 'btn-primary'}`}
            aria-pressed={practiced}
            onClick={() => progress.mark(problemId, contentVersion, 'practiced', !practiced)}
          >
            {practiced ? '✓ Marked as practised' : 'Mark as practised'}
          </button>
          <button
            type="button"
            className="btn btn-quiet"
            aria-pressed={review}
            onClick={() => progress.mark(problemId, contentVersion, 'reviewRequested', !review)}
          >
            {review ? '✓ In your review list' : 'Review later'}
          </button>
        </div>
        <p className={styles.editorNote}>
          “Practised” is your own judgement, not a test result. You can undo it any time.
        </p>
      </div>
      {practiceLink && (
        <div className={styles.paper}>
          <span className="eyebrow">Run your code against tests</span>
          <p>
            This site does not run code yet. The same problem is on an online judge, where your solution runs against
            hidden tests.
          </p>
          <p>
            <a href={practiceLink.url} className="btn btn-small" target="_blank" rel="noreferrer">
              {practiceLink.label} ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      )}
    </>
  );
}
