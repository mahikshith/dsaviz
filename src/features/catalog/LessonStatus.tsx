'use client';

import { useProgress } from '@/features/progress/ProgressProvider';
import { STATUS_LABEL, statusOf } from '@/lib/progress/model';
import styles from './catalog.module.css';

/** The learner's status for one canonical problem, wherever it is listed. Nothing until they start, to keep lists quiet. */
export function LessonStatus({ problemId }: { problemId: string }) {
  const { doc } = useProgress();
  const p = doc.problems[problemId];
  const status = statusOf(p);
  if (status === 'not-started' && !p?.reviewRequested) return null;
  return (
    <span className={styles.status} data-status={status}>
      <span className={styles.statusDot} aria-hidden />
      {STATUS_LABEL[status]}
      {p?.reviewRequested && <span className={styles.reviewTag}>· review</span>}
    </span>
  );
}
