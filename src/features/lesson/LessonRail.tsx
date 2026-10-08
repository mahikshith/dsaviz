'use client';

import Link from 'next/link';
import { useProgress } from '@/features/progress/ProgressProvider';
import { statusOf, type Milestone } from '@/lib/progress/model';
import type { Mode } from './Workspace';
import type { Difficulty, Hue } from '@/lib/content/schema';
import { PatternBadge } from '@/components/ui/Badges';
import { DIFFICULTY_LABEL } from '@/lib/site';
import styles from './lesson.module.css';

export type RelatedGroup = {
  hue: Hue;
  short: string;
  patternName: string;
  patternHref: string;
  variantName: string;
  items: { id: string; slug: string; storyTitle: string; difficulty: Difficulty }[];
};

const WALKTHROUGH_STEPS: { mode: Mode; label: string; milestone: Milestone }[] = [
  { mode: 'understand', label: 'Understand the story', milestone: 'storyRead' },
  { mode: 'visualize', label: 'Watch the reasoning', milestone: 'walkthroughExplored' },
  { mode: 'visualize', label: 'Predict a step', milestone: 'checkpointAnswered' },
  { mode: 'practice', label: 'Practise it yourself', milestone: 'practiced' },
];
const READING_STEPS: { mode: Mode; label: string; milestone: Milestone }[] = [
  { mode: 'understand', label: 'Understand the story', milestone: 'storyRead' },
  { mode: 'visualize', label: 'Study the solution', milestone: 'solutionStudied' },
  { mode: 'practice', label: 'Practise it yourself', milestone: 'practiced' },
];

export function LessonRail({
  mode,
  onMode,
  problemId,
  groups,
  walkthrough,
}: {
  mode: Mode;
  onMode: (m: Mode) => void;
  problemId: string;
  groups: RelatedGroup[];
  walkthrough: boolean;
}) {
  const STEPS = walkthrough ? WALKTHROUGH_STEPS : READING_STEPS;
  const { doc } = useProgress();
  const mine = doc.problems[problemId];
  return (
    <div className={styles.railInner}>
      <p className={styles.railHeading}>In this lesson</p>
      <ol className={styles.steps}>
        {STEPS.map((s) => {
          const done = Boolean(mine?.[s.milestone]);
          return (
            <li key={s.label}>
              <button type="button" className={styles.step} data-current={mode === s.mode || undefined} onClick={() => onMode(s.mode)}>
                <span className={styles.check} data-done={done || undefined} aria-hidden>
                  {done ? '✓' : ''}
                </span>
                {s.label}
                <span className="sr-only">{done ? ' (done)' : ''}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {groups.map((g) => (
        <div key={g.patternHref} className={styles.related} data-hue={g.hue}>
          <p className={styles.railPattern}>
            <PatternBadge hue={g.hue} short={g.short} size="small" />
            <Link href={g.patternHref}>{g.patternName}</Link>
          </p>
          <ol className={styles.relatedList}>
            {g.items.map((it) => {
              const status = statusOf(doc.problems[it.id]);
              return (
                <li key={it.id}>
                  <Link
                    href={`/problems/${it.slug}/`}
                    aria-current={it.id === problemId ? 'page' : undefined}
                    className={styles.relatedLink}
                  >
                    <span className={styles.dot} data-status={status} aria-hidden />
                    <span className={styles.relatedTitle}>
                      {it.storyTitle}
                      <span className={styles.relatedMeta}>{DIFFICULTY_LABEL[it.difficulty]}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
