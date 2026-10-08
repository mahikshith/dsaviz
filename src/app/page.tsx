import Link from 'next/link';
import { getSite, problemsInPattern } from '@/lib/content/load';
import { lessonData } from '@/lib/content/lessonData';
import { LessonPreview } from '@/features/lesson/LessonPreview';
import { PatternBadge } from '@/components/ui/Badges';
import { SceneView } from '@/visuals/scenes/SceneView';
import type { SceneModel } from '@/visuals/scenes/model';
import styles from './home.module.css';

const PREVIEW_PROBLEM = 'book-voucher-pair';
const LADDER_PROBLEM = 'two-sum';

const PROMISE = [
  ['Short stories', 'Each problem told as an everyday scene', 'M5 4.5h9a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3zM17 7.5h2V20M9 9h4M9 12.5h4'],
  ['Step-by-step visuals', 'Watch every decision the algorithm makes', 'M7 5l11 7-11 7z'],
  ['Brute force → optimal', 'Every solution, from the slow idea to the best one', 'M4 19h5v-5h5V9h5V4'],
] as const;

const STEPS = [
  ['Read a short story', 'The problem as an everyday scene, mapped word by word to the code.'],
  ['Watch it run', 'Step through every decision. Picture, explanation and code line stay in sync.'],
  ['Climb to optimal', 'Brute force first, then what makes it faster, until the best solution.'],
  ['Solve it yourself', 'Write it in the scratchpad, check the examples, mark it done.'],
] as const;

export default function HomePage() {
  const site = getSite();
  const preview = site.problemById.get(PREVIEW_PROBLEM);
  const previewLesson = preview ? lessonData(preview) : null;
  const ladder = site.problemById.get(LADDER_PROBLEM)?.meta.ladder ?? [];
  const firstPath = site.paths[0];
  const familyOrder = new Map(site.families.map((f) => [f.id, f.order]));
  const patterns = [...site.patterns].sort(
    (a, b) => (familyOrder.get(a.meta.family) ?? 0) - (familyOrder.get(b.meta.family) ?? 0) || a.meta.order - b.meta.order,
  );

  return (
    <div className="page">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <p className={styles.pill}>
          {patterns.length} patterns · {site.problems.length} interview problems<span className={styles.pillExtra}> · free, no sign-up</span>
        </p>
        <h1 id="hero-heading">
          Learn DSA patterns by <span className={styles.hl}>watching them run</span>
        </h1>
        <ul className={styles.promise} aria-label="What every lesson gives you">
          {PROMISE.map(([title, body, icon]) => (
            <li key={title}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                <path d={icon} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                <strong>{title}</strong>
                {body}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link href={firstPath ? `/paths/${firstPath.id}/` : '/patterns/'} className="btn btn-primary">
            Start learning <span aria-hidden>→</span>
          </Link>
          <Link href="/practice/" className="btn">
            Browse problems
          </Link>
          <Link href="/practice/?view=company" className="btn">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
              <path d="M4 20V6l7-3v17M11 20V9l9 3v8M3 20h18M7 8v.01M7 12v.01M7 16v.01M15 14v.01M15 17v.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Company mode
          </Link>
        </div>
      </section>

      <section aria-label="Patterns">
        <ul className={styles.grid}>
          {patterns.map((p) => {
            const n = problemsInPattern(site, p.meta.id).length;
            const s = p.meta.visual.scene as SceneModel;
            return (
              <li key={p.meta.id} data-hue={p.meta.hue}>
                <Link href={`/patterns/${p.meta.id}/`} className={styles.card}>
                  <span className={styles.thumb} aria-hidden>
                    <SceneView scene={{ arrays: s.arrays?.slice(0, 1), graph: s.graph, legend: [] }} instant showLegend={false} />
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>
                      <PatternBadge hue={p.meta.hue} short={p.meta.short} size="small" />
                      <span className={styles.name}>{p.meta.name}</span>
                      <span className={styles.count}>{n}</span>
                    </span>
                    <span className={styles.cardText}>{p.meta.intuition}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.how} aria-labelledby="how-heading">
        <div className={styles.howText}>
          <h2 id="how-heading">
            From story to <span className={styles.hl}>optimal</span>, in four steps
          </h2>
          <ol className={styles.steps}>
            {STEPS.map(([title, body], i) => (
              <li key={title}>
                <span className={styles.stepNo}>0{i + 1}</span>
                <span>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </span>
              </li>
            ))}
          </ol>
          {ladder.length > 0 ? (
            <p className={styles.ladder} aria-label="Two Sum, from brute force to optimal">
              <span className={styles.ladderLabel}>Two Sum:</span>
              {ladder.map((r, i) => (
                <span key={r.id} className={styles.rung} data-level={r.level}>
                  {i > 0 ? <span aria-hidden>→ </span> : null}
                  <code>{r.time}</code>
                </span>
              ))}
            </p>
          ) : null}
        </div>
        {preview && previewLesson ? (
          <div className={styles.demo}>
            <div className={styles.demoBar}>
              <span className={styles.live} aria-hidden />
              Live: press Play or step through
              <Link href={`/problems/${preview.meta.slug}/`}>Open lesson →</Link>
            </div>
            <LessonPreview lesson={previewLesson} />
          </div>
        ) : null}
      </section>
    </div>
  );
}
