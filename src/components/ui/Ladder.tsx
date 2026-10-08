'use client';

import { useId, useState } from 'react';
import { LADDER_LABEL } from '@/lib/site';
import styles from './ui.module.css';

export type LadderRungView = {
  id: string;
  level: 'brute-force' | 'better' | 'optimal';
  name: string;
  ideaHtml: string;
  insightHtml: string | null;
  time: string;
  space: string;
  approachId?: string;
};

/**
 * "From brute force to optimal": one rung shown at a time, so the reasoning
 * reads as a sequence of small steps without taking much room.
 */
export function Ladder({
  rungs,
  onWatch,
  watchLabel = 'Watch this approach',
  initial,
}: {
  rungs: LadderRungView[];
  /** Called with an approach id when a rung has a walkthrough. */
  onWatch?: (approachId: string) => void;
  watchLabel?: string;
  initial?: string;
}) {
  const [active, setActive] = useState(initial ?? rungs[0]?.id);
  const base = useId();
  const i = Math.max(0, rungs.findIndex((r) => r.id === active));
  const rung = rungs[i]!;
  return (
    <div className={styles.ladder}>
      <ol className={styles.rungs} aria-label="Approaches, from brute force to optimal">
        {rungs.map((r, k) => (
          <li key={r.id} className={styles.rungItem}>
            <button
              type="button"
              className={styles.rung}
              data-level={r.level}
              aria-pressed={k === i}
              aria-controls={`${base}-detail`}
              onClick={() => setActive(r.id)}
            >
              <span className={styles.rungStep}>{k + 1}</span>
              <span className={styles.rungText}>
                <span className={styles.rungLevel}>{LADDER_LABEL[r.level]}</span>
                <span className={styles.rungTime}>{r.time}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div id={`${base}-detail`} className={styles.rungDetail} aria-live="polite">
        <p className={styles.rungName}>
          <span className={styles.rungLevelTag} data-level={rung.level}>
            {LADDER_LABEL[rung.level]}
          </span>
          {rung.name}
        </p>
        {rung.insightHtml && (
          <p className={styles.insight}>
            <strong>What leads here: </strong>
            <span dangerouslySetInnerHTML={{ __html: rung.insightHtml }} />
          </p>
        )}
        <p className={styles.idea} dangerouslySetInnerHTML={{ __html: rung.ideaHtml }} />
        <p className={styles.cost}>
          <span>
            Time <span className="complexity">{rung.time}</span>
          </span>
          <span>
            Extra space <span className="complexity">{rung.space}</span>
          </span>
        </p>
        <div className={styles.rungActions}>
          {i > 0 && (
            <button type="button" className="btn btn-quiet btn-small" onClick={() => setActive(rungs[i - 1]!.id)}>
              ← {LADDER_LABEL[rungs[i - 1]!.level]}
            </button>
          )}
          {i < rungs.length - 1 && (
            <button type="button" className="btn btn-small" onClick={() => setActive(rungs[i + 1]!.id)}>
              Next idea: {LADDER_LABEL[rungs[i + 1]!.level]} →
            </button>
          )}
          {rung.approachId && onWatch && (
            <button type="button" className="btn btn-primary btn-small" onClick={() => onWatch(rung.approachId!)}>
              {watchLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** A compact, non-interactive summary such as "Brute force O(n²) → Optimal O(n)". */
export function LadderSummary({ rungs }: { rungs: { level: LadderRungView['level']; name: string; time: string }[] }) {
  return (
    <ol className={styles.summary} aria-label="Approach ladder">
      {rungs.map((r, k) => (
        <li key={k} data-level={r.level}>
          <span className={styles.summaryName}>{r.name}</span> <span className="complexity">{r.time}</span>
        </li>
      ))}
    </ol>
  );
}
