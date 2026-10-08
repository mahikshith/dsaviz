'use client';

// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';
import { useId } from 'react';
import { useProgress } from '@/features/progress/ProgressProvider';
import { patternProgress } from '@/lib/progress/model';
import { matches, type Catalog } from '@/lib/content/catalogShared';
import { PatternBadge } from '@/components/ui/Badges';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useUrlState } from './useUrlState';
import styles from './catalog.module.css';

const DEFAULTS = { q: '', topic: 'all', status: 'all' };

export function PatternCatalog({ catalog }: { catalog: Catalog }) {
  const [f, set] = useUrlState(DEFAULTS);
  const { doc } = useProgress();
  const id = useId();
  const byId = new Map(catalog.problems.map((p) => [p.id, p]));

  const visible = catalog.patterns.filter((p) => {
    if (!matches(f.q, p.name, p.intuition, p.aliases)) return false;
    if (f.topic !== 'all' && !p.topics.includes(f.topic)) return false;
    if (f.status !== 'all') {
      const prog = patternProgress(doc, p.problems.map((x) => x.id));
      if (f.status === 'started' && prog.started === 0) return false;
      if (f.status === 'not-started' && prog.started > 0) return false;
    }
    return true;
  });
  const usedTopics = catalog.topics.filter((t) => catalog.patterns.some((p) => p.topics.includes(t.id)));

  return (
    <>
      <form className={styles.filters} role="search" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.searchField}>
          <label htmlFor={`${id}-q`}>Search patterns</label>
          <input
            id={`${id}-q`}
            type="search"
            value={f.q}
            placeholder="Try “moving range” or “fewest steps”"
            onChange={(e) => set({ q: e.target.value })}
          />
        </div>
        {usedTopics.length > 1 && (
          <div className={styles.selectField}>
            <label htmlFor={`${id}-topic`}>Topic</label>
            <select id={`${id}-topic`} value={f.topic} onChange={(e) => set({ topic: e.target.value })}>
              <option value="all">All topics</option>
              {usedTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={styles.selectField}>
          <label htmlFor={`${id}-status`}>Your progress</label>
          <select id={`${id}-status`} value={f.status} onChange={(e) => set({ status: e.target.value })}>
            <option value="all">Any</option>
            <option value="started">Started</option>
            <option value="not-started">Not started</option>
          </select>
        </div>
      </form>

      <p className={styles.resultCount} aria-live="polite">
        {visible.length === catalog.patterns.length
          ? `${catalog.patterns.length} patterns`
          : `${visible.length} of ${catalog.patterns.length} patterns`}
      </p>

      {visible.length === 0 && (
        <div className={styles.empty}>
          <p>No pattern matches these filters.</p>
          <button type="button" className="btn btn-small" onClick={() => set(DEFAULTS)}>
            Clear filters
          </button>
        </div>
      )}

      {catalog.families.map((fam) => {
        const items = visible.filter((p) => p.family === fam.id);
        if (items.length === 0) return null;
        return (
          <section key={fam.id} className={styles.family} aria-labelledby={`${id}-${fam.id}`}>
            <div className={styles.familyHead}>
              <h2 id={`${id}-${fam.id}`}>{fam.name}</h2>
              <p>{fam.summary}</p>
            </div>
            <ul className={styles.patternList}>
              {items.map((p) => {
                const prog = patternProgress(doc, p.problems.map((x) => x.id));
                return (
                  <li key={p.id} className={styles.patternCard} data-hue={p.hue}>
                    <div className={styles.cardTop}>
                      <PatternBadge hue={p.hue} short={p.short} />
                      <h3>
                        <Link href={`/patterns/${p.id}/`} className={styles.cardLink}>
                          {p.name}
                        </Link>
                      </h3>
                    </div>
                    <p className={styles.intuition}>{p.intuition}</p>
                    <div className={styles.cardFoot}>
                      <p className={styles.cardMeta}>
                        {p.problems.length === 0 ? (
                          <span>Lessons in progress</span>
                        ) : (
                          <>
                            <span>
                              {p.problems.length} {p.problems.length === 1 ? 'problem' : 'problems'}
                            </span>
                          </>
                        )}
                      </p>
                      {p.problems.length > 0 && (
                        <div className={styles.cardProgress}>
                          <ProgressBar done={prog.practiced} started={prog.started} total={prog.total} label={p.name} />
                          <span>
                            {prog.practiced}/{prog.total}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
