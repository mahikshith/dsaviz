'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { useProgress } from '@/features/progress/ProgressProvider';
import { patternProgress, statusOf } from '@/lib/progress/model';
import { DIFFICULTY_ORDER, matches, type Catalog } from '@/lib/content/catalogShared';
import type { Hue } from '@/lib/content/schema';
import { DIFFICULTY_LABEL } from '@/lib/site';
import { DifficultyBadge, PatternBadge } from '@/components/ui/Badges';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LessonStatus } from './LessonStatus';
import { useUrlState } from './useUrlState';
import styles from './practice.module.css';

const DEFAULTS = { view: 'pattern', company: '', q: '', difficulty: 'all', status: 'all', saved: '' };

type Group = { id: string; name: string; short: string; hue: Hue; sub: string; items: { id: string; note: string }[] };

/** Two letters for a company monogram: "Goldman Sachs" -> "GS", "Amazon" -> "AM". */
function monogram(name: string) {
  const words = name.split(' ');
  return (words.length > 1 ? `${words[0]![0]}${words[1]![0]}` : name.slice(0, 2)).toUpperCase();
}

export function PracticeCatalog({ catalog }: { catalog: Catalog }) {
  const [f, set] = useUrlState(DEFAULTS);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const progress = useProgress();
  const { doc } = progress;
  const id = useId();
  const byId = new Map(catalog.problems.map((p) => [p.id, p]));
  const patternName = new Map(catalog.patterns.map((p) => [p.id, p.name]));
  const byCompany = f.view === 'company';
  const filtered = Boolean(f.q || f.saved || f.company) || f.difficulty !== 'all' || f.status !== 'all';
  const clear = () => set({ ...DEFAULTS, view: f.view });

  const keep = (problemId: string) => {
    const p = byId.get(problemId)!;
    if (!matches(f.q, p.title, p.storyTitle, p.summary, p.aka ?? '', p.companies)) return false;
    if (f.difficulty !== 'all' && p.difficulty !== f.difficulty) return false;
    const rec = doc.problems[problemId];
    if (f.status === 'review') {
      if (!rec?.reviewRequested) return false;
    } else if (f.status !== 'all' && statusOf(rec) !== f.status) return false;
    if (f.saved === '1' && !doc.bookmarks[problemId]) return false;
    return true;
  };

  // Companies, most problems first. A problem appears under every company that asks it.
  const companies = [...new Set(catalog.problems.flatMap((p) => p.companies))]
    .map((name) => ({ name, ids: catalog.problems.filter((p) => p.companies.includes(name)).map((p) => p.id) }))
    .sort((a, b) => b.ids.length - a.ids.length || a.name.localeCompare(b.name));

  const allGroups: Group[] = byCompany
    ? companies
        .filter((c) => !f.company || c.name === f.company)
        .map((c) => ({
          id: `co-${c.name.toLowerCase().replaceAll(' ', '-')}`,
          name: c.name,
          short: monogram(c.name),
          hue: 'slate',
          sub: `${c.ids.length} ${c.ids.length === 1 ? 'problem' : 'problems'} reported in interviews`,
          items: c.ids.map((pid) => ({ id: pid, note: byId.get(pid)!.patternIds.map((x) => patternName.get(x)).join(', ') })),
        }))
    : catalog.patterns
        .filter((pattern) => pattern.problems.length > 0)
        .map((pattern) => ({
          id: pattern.id,
          name: pattern.name,
          short: pattern.short,
          hue: pattern.hue,
          sub: pattern.intuition,
          items: pattern.problems.map((x) => ({ id: x.id, note: x.variant })),
        }));
  const groups = allGroups.map((group) => ({ group, rows: group.items.filter((x) => keep(x.id)) }));
  const shown = groups.filter((g) => g.rows.length > 0);
  const uniqueShown = new Set(shown.flatMap((g) => g.rows.map((r) => r.id))).size;
  const isOpen = (gid: string) => filtered || open.has(gid);
  const toggle = (gid: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(gid)) next.delete(gid);
      else next.add(gid);
      return next;
    });
  const allOpen = shown.every((g) => isOpen(g.group.id));

  return (
    <>
      <div className={styles.viewBar}>
        <div role="group" aria-label="Group problems" className={styles.segmented}>
          <button type="button" aria-pressed={!byCompany} onClick={() => set({ view: 'pattern', company: '' })}>
            By pattern
          </button>
          <button type="button" aria-pressed={byCompany} onClick={() => set({ view: 'company', company: '' })}>
            By company
          </button>
        </div>
        {byCompany && (
          <div role="group" aria-label="Company" className={styles.companies}>
            <button type="button" aria-pressed={!f.company} onClick={() => set({ company: '' })}>
              All companies
            </button>
            {companies.map((c) => (
              <button key={c.name} type="button" aria-pressed={f.company === c.name} onClick={() => set({ company: c.name })}>
                {c.name} <span>{c.ids.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <form className={styles.filters} role="search" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.search}>
          <label htmlFor={`${id}-q`}>Search problems</label>
          <input
            id={`${id}-q`}
            type="search"
            value={f.q}
            placeholder="Title, story, known name or company…"
            autoComplete="off"
            onChange={(e) => set({ q: e.target.value })}
          />
        </div>
        <fieldset className={styles.chips}>
          <legend>Difficulty</legend>
          {['all', ...DIFFICULTY_ORDER].map((d) => (
            <label key={d} className={styles.chip} data-checked={f.difficulty === d || undefined}>
              <input type="radio" name={`${id}-d`} value={d} checked={f.difficulty === d} onChange={() => set({ difficulty: d })} className="sr-only" />
              {d === 'all' ? 'All' : DIFFICULTY_LABEL[d as keyof typeof DIFFICULTY_LABEL]}
            </label>
          ))}
        </fieldset>
        <div className={styles.select}>
          <label htmlFor={`${id}-s`}>Status</label>
          <select id={`${id}-s`} value={f.status} onChange={(e) => set({ status: e.target.value })}>
            <option value="all">Any</option>
            <option value="not-started">Not started</option>
            <option value="in-progress">In progress</option>
            <option value="practiced">Practised</option>
            <option value="review">Marked for review</option>
          </select>
        </div>
        <label className={styles.chip} data-checked={f.saved === '1' || undefined}>
          <input type="checkbox" checked={f.saved === '1'} onChange={(e) => set({ saved: e.target.checked ? '1' : '' })} className="sr-only" />
          Bookmarked only
        </label>
      </form>

      <div className={styles.summaryRow}>
        <p aria-live="polite">
          {filtered
            ? `${uniqueShown} of ${catalog.problems.length} problems match`
            : byCompany
              ? `${catalog.problems.filter((p) => p.companies.length > 0).length} problems across ${companies.length} companies`
              : `${catalog.problems.length} problems in ${groups.length} patterns, easiest first in each`}
        </p>
        <div className={styles.summaryActions}>
          {filtered ? (
            <button type="button" className="btn btn-quiet btn-small" onClick={clear}>
              Clear filters
            </button>
          ) : (
            <button type="button" className="btn btn-small" onClick={() => setOpen(allOpen ? new Set() : new Set(shown.map((g) => g.group.id)))}>
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          )}
        </div>
      </div>

      <div className={styles.layout} data-single={byCompany || undefined}>
        <nav className={styles.index} aria-label={byCompany ? 'Companies' : 'Patterns'}>
          <ul>
            {groups.map(({ group, rows }) => {
              const prog = patternProgress(doc, group.items.map((x) => x.id));
              return (
                <li key={group.id} data-hue={group.hue} data-empty={rows.length === 0 || undefined}>
                  <a
                    href={`#group-${group.id}`}
                    onClick={() =>
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.add(group.id);
                        return next;
                      })
                    }
                  >
                    <PatternBadge hue={group.hue} short={group.short} size="small" />
                    <span className={styles.indexName}>{group.name}</span>
                    <span className={styles.indexCount}>
                      {prog.practiced}/{prog.total}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.groups}>
          {uniqueShown === 0 && (
            <div className={styles.empty}>
              <p>No problem matches these filters.</p>
              <button type="button" className="btn btn-small" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
          {shown.map(({ group, rows }) => {
            const expanded = isOpen(group.id);
            const prog = patternProgress(doc, group.items.map((x) => x.id));
            return (
              <section key={group.id} id={`group-${group.id}`} className={styles.group} data-hue={group.hue} aria-labelledby={`${id}-${group.id}`}>
                <h2 className={styles.groupHeading}>
                  <button
                    type="button"
                    className={styles.groupToggle}
                    aria-expanded={expanded}
                    aria-controls={`${id}-${group.id}-rows`}
                    id={`${id}-${group.id}`}
                    aria-label={`${group.name}: ${group.items.length} problems, ${prog.practiced} practised`}
                    onClick={() => toggle(group.id)}
                    disabled={filtered}
                  >
                    <PatternBadge hue={group.hue} short={group.short} />
                    <span className={styles.groupText}>
                      <span className={styles.groupName}>{group.name}</span>
                      <span className={styles.groupIntuition}>{group.sub}</span>
                    </span>
                    <span className={styles.groupStats}>
                      <span className={styles.groupProgress}>
                        <ProgressBar done={prog.practiced} started={prog.started} total={prog.total} label={group.name} />
                        <span>
                          {prog.practiced}/{prog.total} practised
                        </span>
                      </span>
                    </span>
                    <svg className={styles.chevron} width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                      <path d="M9 5.5 15.5 12 9 18.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </h2>
                {expanded && (
                  <ol className={styles.rows} id={`${id}-${group.id}-rows`}>
                    {rows.map(({ id: problemId, note }) => {
                      const p = byId.get(problemId)!;
                      const saved = Boolean(doc.bookmarks[problemId]);
                      return (
                        <li key={problemId} className={styles.row}>
                          <div className={styles.rowMain}>
                            <Link href={`/problems/${p.slug}/`} className={styles.rowTitle}>
                              {p.storyTitle}
                            </Link>
                            <span className={styles.rowSub}>
                              {p.title}
                              {p.aka ? ` · ${p.aka}` : ''} · {note}
                            </span>
                          </div>
                          <div className={styles.rowMeta}>
                            <DifficultyBadge level={p.difficulty} />
                            {p.hasWalkthrough ? (
                              <span className={styles.kind} title="Has a step-by-step visual walkthrough">
                                ▶ Visual
                              </span>
                            ) : null}
                            <LessonStatus problemId={problemId} />
                            <button
                              type="button"
                              className={styles.bookmark}
                              aria-pressed={saved}
                              aria-label={saved ? `Remove bookmark: ${p.storyTitle}` : `Bookmark: ${p.storyTitle}`}
                              onClick={() => progress.bookmark(problemId, !saved)}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                                <path d="M6 3.5h12v17l-6-4-6 4z" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
