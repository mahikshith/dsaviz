'use client';

import { useProgress } from '@/features/progress/ProgressProvider';
import { patternProgress } from '@/lib/progress/model';
import { ProgressBar } from '@/components/ui/ProgressBar';
import styles from './pattern.module.css';

/** The learner's progress through one pattern, derived from canonical problem records. */
export function PatternProgress({ problemIds, label }: { problemIds: string[]; label: string }) {
  const { doc } = useProgress();
  const p = patternProgress(doc, problemIds);
  return (
    <div className={styles.progressBox}>
      <p>
        <strong>{p.practiced}</strong> of {p.total} practised
        {p.started > p.practiced ? `, ${p.started - p.practiced} in progress` : ''}
      </p>
      <ProgressBar done={p.practiced} started={p.started} total={p.total} label={label} />
    </div>
  );
}
