import styles from './ui.module.css';

/** Practised (solid) and started (outlined) segments out of a total, coloured by the surrounding data-hue. */
export function ProgressBar({ done, started, total, label }: { done: number; started: number; total: number; label: string }) {
  const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100);
  return (
    <div
      className={styles.bar}
      role="img"
      aria-label={`${label}: ${done} of ${total} practised${started > done ? `, ${started - done} more started` : ''}`}
    >
      <span className={styles.barDone} style={{ width: `${pct(done)}%` }} />
      <span className={styles.barStarted} style={{ width: `${pct(Math.max(0, started - done))}%` }} />
    </div>
  );
}
