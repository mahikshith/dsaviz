'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { Checkpoint } from '@/lib/content/schema';
import { useProgress } from '@/features/progress/ProgressProvider';
import { usePlayer } from './PlayerProvider';
import styles from './player.module.css';

/**
 * A reviewed prediction question on one frame. While unanswered it stops
 * autoplay and Next; the learner can answer or explicitly skip it.
 */
export function CheckpointCard({ checkpoint, gated }: { checkpoint: Checkpoint; gated: boolean }) {
  const { lesson, dispatch } = usePlayer();
  const progress = useProgress();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingId = useId();
  const key = `${lesson.problemId}/${checkpoint.id}`;
  const previous = progress.doc.checkpoints[key];
  const [choice, setChoice] = useState<string | null>(null);
  const picked = checkpoint.choices.find((c) => c.id === choice);

  useEffect(() => {
    if (gated) headingRef.current?.focus();
  }, [gated]);

  const answer = (id: string) => {
    const c = checkpoint.choices.find((x) => x.id === id)!;
    setChoice(id);
    progress.answer(lesson.problemId, checkpoint.id, lesson.contentVersion, id, c.correct);
    dispatch({ type: 'clear-checkpoint', id: checkpoint.id });
  };

  return (
    <section className={styles.checkpoint} aria-labelledby={headingId} data-gated={gated || undefined}>
      <span className="eyebrow">Predict the next step</span>
      <h3 id={headingId} ref={headingRef} tabIndex={-1} className={styles.checkpointQuestion}>
        {checkpoint.question}
      </h3>
      <p className={styles.checkpointContext}>{checkpoint.context}</p>
      <div className={styles.choices} role="group" aria-label="Your prediction">
        {checkpoint.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            className="btn btn-small"
            aria-pressed={choice === c.id}
            data-result={choice === c.id ? (c.correct ? 'right' : 'wrong') : undefined}
            onClick={() => answer(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {picked && (
          <p className={styles.feedback} data-correct={picked.correct || undefined}>
            <strong>{picked.correct ? 'Correct. ' : 'Not quite. '}</strong>
            {picked.feedback}
          </p>
        )}
        {!picked && previous && <p className={styles.feedbackMuted}>You answered this before. Answer again or keep going.</p>}
      </div>
      <div className={styles.checkpointActions}>
        {picked ? (
          <button type="button" className="btn btn-primary btn-small" onClick={() => dispatch({ type: 'next' })}>
            Continue
          </button>
        ) : (
          gated && (
            <button type="button" className="btn btn-quiet btn-small" onClick={() => dispatch({ type: 'clear-checkpoint', id: checkpoint.id })}>
              Skip this question
            </button>
          )
        )}
      </div>
    </section>
  );
}
