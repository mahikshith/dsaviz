import { describe, expect, it } from 'vitest';
import {
  emptyProgress,
  normalize,
  patternProgress,
  recordCheckpoint,
  setBookmark,
  setMilestone,
  statusOf,
} from '@/lib/progress/model';
import { PROGRESS_KEY, createLocalRepository } from '@/lib/progress/localRepository';

const NOW = '2026-10-01T12:00:00.000Z';

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  };
}

describe('progress model', () => {
  it('tracks milestones separately and derives a status from them', () => {
    let d = emptyProgress();
    expect(statusOf(d.problems.x)).toBe('not-started');
    d = setMilestone(d, 'x', 1, 'walkthroughExplored', true, NOW);
    expect(statusOf(d.problems.x)).toBe('in-progress');
    d = setMilestone(d, 'x', 1, 'practiced', true, NOW);
    expect(statusOf(d.problems.x)).toBe('practiced');
    d = setMilestone(d, 'x', 1, 'practiced', false, NOW);
    expect(statusOf(d.problems.x)).toBe('in-progress');
  });

  it('watching the walkthrough alone never counts as practised', () => {
    const d = setMilestone(emptyProgress(), 'x', 1, 'walkthroughExplored', true, NOW);
    expect(patternProgress(d, ['x']).practiced).toBe(0);
  });

  it('one canonical record updates every pattern view that lists the problem', () => {
    const d = setMilestone(emptyProgress(), 'busiest-three-days', 1, 'practiced', true, NOW);
    const windowView = patternProgress(d, ['busiest-three-days']);
    const prefixView = patternProgress(d, ['busiest-three-days']);
    expect(windowView.practiced).toBe(1);
    expect(prefixView.practiced).toBe(1);
    expect(Object.keys(d.problems)).toEqual(['busiest-three-days']);
  });

  it('records checkpoint answers and marks the milestone', () => {
    const d = recordCheckpoint(emptyProgress(), 'p', 'cp', 2, 'right', true, NOW);
    expect(d.checkpoints['p/cp']).toEqual({ choiceId: 'right', correct: true, at: NOW, contentVersion: 2 });
    expect(d.problems.p?.checkpointAnswered).toBe(NOW);
  });

  it('bookmarks are reversible and unchanged updates return the same object', () => {
    const a = setBookmark(emptyProgress(), 'p', true, NOW);
    expect(a.bookmarks.p).toBe(NOW);
    expect(setBookmark(a, 'p', true, NOW)).toBe(a);
    expect(setBookmark(a, 'p', false, NOW).bookmarks.p).toBeUndefined();
  });

  it('normalises malformed or foreign data instead of crashing', () => {
    expect(normalize(null)).toEqual(emptyProgress());
    expect(normalize({ version: 99 })).toEqual(emptyProgress());
    const d = normalize({ version: 1, problems: { a: { contentVersion: 1, practiced: NOW, junk: 1 }, b: 'x' }, bookmarks: { a: 5 } });
    expect(d.problems).toEqual({ a: { contentVersion: 1, practiced: NOW } });
    expect(d.bookmarks).toEqual({});
  });
});

describe('local repository', () => {
  it('persists and reloads', () => {
    const storage = memoryStorage();
    const repo = createLocalRepository(storage, 0);
    const d = setMilestone(emptyProgress(), 'x', 1, 'storyRead', true, NOW);
    repo.save(d);
    expect(JSON.parse(storage.data.get(PROGRESS_KEY)!)).toEqual(d);
    expect(createLocalRepository(storage, 0).load()).toEqual(d);
  });

  it('keeps working in memory when storage throws', () => {
    const broken = {
      getItem: () => {
        throw new Error('denied');
      },
      setItem: () => {
        throw new Error('denied');
      },
      removeItem: () => {
        throw new Error('denied');
      },
    };
    const repo = createLocalRepository(broken, 0);
    expect(repo.load()).toEqual(emptyProgress());
    expect(() => repo.save(emptyProgress())).not.toThrow();
    expect(repo.persistent).toBe(false);
    expect(() => repo.clear()).not.toThrow();
  });

  it('works with no storage at all', () => {
    const repo = createLocalRepository(null, 0);
    expect(repo.persistent).toBe(false);
    expect(repo.load()).toEqual(emptyProgress());
  });

  it('clear removes saved progress', () => {
    const storage = memoryStorage();
    const repo = createLocalRepository(storage, 0);
    repo.save(setBookmark(emptyProgress(), 'p', true, NOW));
    repo.clear();
    expect(storage.data.has(PROGRESS_KEY)).toBe(false);
  });
});
