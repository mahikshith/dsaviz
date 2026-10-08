'use client';

// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';
import { useProgress } from './ProgressProvider';
import { patternProgress, statusOf, type ProblemProgress } from '@/lib/progress/model';
import type { CatalogPattern, CatalogProblem } from '@/lib/content/catalogShared';
import { DifficultyBadge, PatternBadge } from '@/components/ui/Badges';
import { InnerTabs } from '@/components/ui/InnerTabs';
import { ProgressBar } from '@/components/ui/ProgressBar';
import styles from './progress.module.css';

type Problem = CatalogProblem & { contentVersion: number };

function nextStep(p: Problem, rec: ProblemProgress | undefined): { label: string; mode: string } {
  if (!rec?.storyRead) return { label: 'Read the story', mode: '' };
  if (p.hasWalkthrough) {
    if (!rec.walkthroughExplored) return { label: 'Step through the walkthrough', mode: 'visualize' };
    if (!rec.checkpointAnswered) return { label: 'Answer the prediction', mode: 'visualize' };
  } else if (!rec.solutionStudied) return { label: 'Study the solution', mode: 'solution' };
  if (!rec.practiced) return { label: 'Practise it yourself', mode: 'practice' };
  return { label: 'Review it', mode: 'practice' };
}

const lessonHref = (p: Problem, mode: string) => `/problems/${p.slug}/${mode ? `?mode=${mode}` : ''}`;

export function MyLearning({ problems, patterns }: { problems: Problem[]; patterns: CatalogPattern[] }) {
  const progress = useProgress();
  const { doc } = progress;
  const byId = new Map(problems.map((p) => [p.id, p]));
  const recOf = (id: string) => doc.problems[id];
  const recent = (a: Problem, b: Problem) => (recOf(b.id)?.lastViewed ?? '').localeCompare(recOf(a.id)?.lastViewed ?? '');

  const inProgress = problems.filter((p) => statusOf(recOf(p.id)) === 'in-progress').sort(recent);
  const practiced = problems.filter((p) => statusOf(recOf(p.id)) === 'practiced').sort(recent);
  const review = problems.filter((p) => recOf(p.id)?.reviewRequested).sort(recent);
  const bookmarked = problems.filter((p) => doc.bookmarks[p.id]);
  const viewed = problems.filter((p) => recOf(p.id)?.lastViewed).sort(recent);
  const answers = Object.values(doc.checkpoints);
  const correct = answers.filter((a) => a.correct).length;
  const nothing = viewed.length === 0 && bookmarked.length === 0;

  // Continue: the most recent lesson that is not finished. Suggestion: the next unstarted problem in that pattern.
  const current = inProgress[0] ?? viewed.find((p) => statusOf(recOf(p.id)) !== 'practiced');
  const focusPattern = patterns.find((pat) => pat.problems.some((x) => x.id === (current ?? viewed[0])?.id)) ?? patterns[0];
  const suggestion =
    focusPattern?.problems.map((x) => byId.get(x.id)!).find((p) => statusOf(recOf(p.id)) === 'not-started' && p.id !== current?.id) ??
    patterns.flatMap((pat) => pat.problems.map((x) => byId.get(x.id)!)).find((p) => statusOf(recOf(p.id)) === 'not-started');

  const exportData = () => {
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pattern-atlas-progress.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const clearAll = () => {
    if (window.confirm('Clear all progress, bookmarks and prediction answers saved in this browser? This cannot be undone.')) progress.clear();
  };

  const total = problems.length;
  const pct = total ? practiced.length / total : 0;

  return (
    <>
      <p className={styles.storageNote}>
        {progress.persistent
          ? 'Saved in this browser only. Nothing is sent to a server, and it will not follow you to another device.'
          : 'This browser is not allowing storage, so progress lasts only until you close this tab.'}
      </p>

      {!progress.ready ? (
        <p className={styles.muted}>Reading your saved progress…</p>
      ) : (
        <>
          <section className={styles.overview} aria-label="Overview">
            <div className={styles.ringBox}>
              <svg viewBox="0 0 120 120" className={styles.ring} role="img" aria-label={`${practiced.length} of ${total} problems practised`}>
                <circle cx="60" cy="60" r="50" className={styles.ringTrack} />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className={styles.ringValue}
                  strokeDasharray={`${pct * 314.16} 314.16`}
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="58" textAnchor="middle" className={styles.ringNumber}>
                  {practiced.length}
                </text>
                <text x="60" y="78" textAnchor="middle" className={styles.ringLabel}>
                  of {total} practised
                </text>
              </svg>
            </div>
            <dl className={styles.tiles}>
              <div data-tone="progress">
                <dt>In progress</dt>
                <dd>{inProgress.length}</dd>
              </div>
              <div data-tone="predict">
                <dt>Predictions right</dt>
                <dd>
                  {correct}
                  <span> / {answers.length}</span>
                </dd>
              </div>
              <div data-tone="review">
                <dt>To review</dt>
                <dd>{review.length}</dd>
              </div>
              <div data-tone="saved">
                <dt>Bookmarked</dt>
                <dd>{bookmarked.length}</dd>
              </div>
            </dl>
            <div className={styles.next}>
              {current ? (
                <ContinueCard p={current} rec={recOf(current.id)} patterns={patterns} />
              ) : (
                <div className={styles.nextCard}>
                  <span className="eyebrow">{nothing ? 'Start here' : 'All caught up'}</span>
                  <p className={styles.nextTitle}>{nothing ? 'Your first lesson is waiting' : 'Nothing half-finished'}</p>
                  <Link href="/paths/first-steps/" className="btn btn-primary btn-small">
                    {nothing ? 'Start First steps' : 'Open First steps'}
                  </Link>
                </div>
              )}
              {suggestion && (
                <p className={styles.suggest}>
                  Up next:{' '}
                  <Link href={lessonHref(suggestion, '')}>{suggestion.storyTitle}</Link>{' '}
                  <DifficultyBadge level={suggestion.difficulty} />
                </p>
              )}
            </div>
          </section>

          <section className={styles.patterns} aria-labelledby="by-pattern">
            <h2 id="by-pattern">By pattern</h2>
            <ul>
              {patterns
                .filter((pat) => pat.problems.length > 0)
                .map((pat) => {
                  const prog = patternProgress(doc, pat.problems.map((x) => x.id));
                  return (
                    <li key={pat.id} data-hue={pat.hue} data-started={prog.started > 0 || undefined}>
                      <Link href={`/patterns/${pat.id}/`} className={styles.patternRow}>
                        <PatternBadge hue={pat.hue} short={pat.short} size="small" />
                        <span className={styles.patternName}>{pat.name}</span>
                        <span className={styles.patternBar}>
                          <ProgressBar done={prog.practiced} started={prog.started} total={prog.total} label={pat.name} />
                        </span>
                        <span className={styles.patternCount}>
                          {prog.practiced}/{prog.total}
                        </span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </section>

          <section className={styles.lists} aria-label="Your lessons">
            <InnerTabs
              label="Your lessons"
              tabs={[
                { id: 'progress', label: `In progress (${inProgress.length})`, content: <List items={inProgress} empty="No lessons in progress." recOf={recOf} /> },
                { id: 'review', label: `To review (${review.length})`, content: <List items={review} empty="Use “Review later” in a lesson's Practice tab." recOf={recOf} /> },
                { id: 'saved', label: `Bookmarked (${bookmarked.length})`, content: <List items={bookmarked} empty="No bookmarks yet." recOf={recOf} /> },
                { id: 'done', label: `Practised (${practiced.length})`, content: <List items={practiced} empty="Nothing marked as practised yet." recOf={recOf} /> },
              ]}
            />
          </section>
        </>
      )}

      <section className={styles.data} aria-labelledby="data-heading">
        <h2 id="data-heading">Your data</h2>
        <p className={styles.muted}>Download a copy of your progress, or remove it from this browser.</p>
        <div className={styles.dataActions}>
          <button type="button" className="btn btn-small" onClick={exportData}>
            Export as JSON
          </button>
          <button type="button" className="btn btn-small btn-danger" onClick={clearAll}>
            Clear all progress
          </button>
        </div>
      </section>
    </>
  );
}

function ContinueCard({ p, rec, patterns }: { p: Problem; rec: ProblemProgress | undefined; patterns: CatalogPattern[] }) {
  const step = nextStep(p, rec);
  const pat = patterns.find((x) => x.problems.some((y) => y.id === p.id));
  return (
    <div className={styles.nextCard} data-hue={pat?.hue}>
      <span className="eyebrow">Pick up where you left off</span>
      <p className={styles.nextTitle}>
        {pat && <PatternBadge hue={pat.hue} short={pat.short} size="small" />}
        {p.storyTitle}
      </p>
      <p className={styles.muted}>Next: {step.label.toLowerCase()}</p>
      <Link href={lessonHref(p, step.mode)} className="btn btn-primary btn-small">
        Continue: {step.label}
      </Link>
    </div>
  );
}

function List({ items, empty, recOf }: { items: Problem[]; empty: string; recOf: (id: string) => ProblemProgress | undefined }) {
  if (items.length === 0) return <p className={styles.muted}>{empty}</p>;
  return (
    <ul className={styles.list}>
      {items.map((p) => {
        const rec = recOf(p.id);
        const steps = p.hasWalkthrough
          ? (['storyRead', 'walkthroughExplored', 'checkpointAnswered', 'practiced'] as const)
          : (['storyRead', 'solutionStudied', 'practiced'] as const);
        const done = steps.filter((m) => rec?.[m]).length;
        return (
          <li key={p.id}>
            <Link href={lessonHref(p, '')} className={styles.title}>
              {p.storyTitle}
            </Link>
            <span className={styles.canonical}>{p.title}</span>
            <span className={styles.steps} aria-label={`${done} of ${steps.length} steps done`}>
              {steps.map((m) => (
                <span key={m} data-done={Boolean(rec?.[m]) || undefined} />
              ))}
            </span>
            {rec && rec.contentVersion < p.contentVersion && <span className={styles.updated}>Updated since your visit</span>}
          </li>
        );
      })}
    </ul>
  );
}
