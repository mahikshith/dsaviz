/**
 * Learning progress, keyed by canonical problem id. A problem that appears in
 * several patterns has exactly one record, so finishing it anywhere counts everywhere.
 */

export const MILESTONES = ['storyRead', 'walkthroughExplored', 'checkpointAnswered', 'solutionStudied', 'practiced', 'reviewRequested'] as const;
export type Milestone = (typeof MILESTONES)[number];

export const MILESTONE_LABEL: Record<Milestone, string> = {
  storyRead: 'Story read',
  walkthroughExplored: 'Walkthrough explored',
  checkpointAnswered: 'Prediction answered',
  solutionStudied: 'Solution studied',
  practiced: 'Practised (self-checked)',
  reviewRequested: 'Marked for review',
};

export type ProblemProgress = {
  /** Lesson content version when this record was last updated, to spot changed lessons. */
  contentVersion: number;
  lastViewed?: string;
} & Partial<Record<Milestone, string>>;

export type CheckpointAnswer = { choiceId: string; correct: boolean; at: string; contentVersion: number };

export type ProgressDoc = {
  version: 1;
  problems: Record<string, ProblemProgress>;
  bookmarks: Record<string, string>;
  checkpoints: Record<string, CheckpointAnswer>;
};

export const emptyProgress = (): ProgressDoc => ({ version: 1, problems: {}, bookmarks: {}, checkpoints: {} });

export type LearningStatus = 'not-started' | 'in-progress' | 'practiced';

export const STATUS_LABEL: Record<LearningStatus, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  practiced: 'Practised',
};

export function statusOf(p: ProblemProgress | undefined): LearningStatus {
  if (!p) return 'not-started';
  if (p.practiced) return 'practiced';
  if (p.storyRead || p.walkthroughExplored || p.checkpointAnswered || p.solutionStudied) return 'in-progress';
  return 'not-started';
}

/** Accepts anything read from storage and returns a well-formed document, dropping what doesn't fit. */
export function normalize(raw: unknown): ProgressDoc {
  const doc = emptyProgress();
  if (!raw || typeof raw !== 'object') return doc;
  const r = raw as Record<string, unknown>;
  if (r.version !== 1) return doc;
  const isRecord = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
  if (isRecord(r.problems)) {
    for (const [id, p] of Object.entries(r.problems)) {
      if (!isRecord(p)) continue;
      const rec: ProblemProgress = { contentVersion: typeof p.contentVersion === 'number' ? p.contentVersion : 0 };
      if (typeof p.lastViewed === 'string') rec.lastViewed = p.lastViewed;
      for (const m of MILESTONES) if (typeof p[m] === 'string') rec[m] = p[m] as string;
      doc.problems[id] = rec;
    }
  }
  if (isRecord(r.bookmarks)) for (const [id, at] of Object.entries(r.bookmarks)) if (typeof at === 'string') doc.bookmarks[id] = at;
  if (isRecord(r.checkpoints)) {
    for (const [id, a] of Object.entries(r.checkpoints)) {
      if (isRecord(a) && typeof a.choiceId === 'string' && typeof a.correct === 'boolean' && typeof a.at === 'string') {
        doc.checkpoints[id] = {
          choiceId: a.choiceId,
          correct: a.correct,
          at: a.at,
          contentVersion: typeof a.contentVersion === 'number' ? a.contentVersion : 0,
        };
      }
    }
  }
  return doc;
}

// ---- Pure updates ----

export function setMilestone(doc: ProgressDoc, problemId: string, contentVersion: number, m: Milestone, on: boolean, now: string): ProgressDoc {
  const prev = doc.problems[problemId] ?? { contentVersion };
  if (Boolean(prev[m]) === on && prev.contentVersion === contentVersion) return doc;
  const next: ProblemProgress = { ...prev, contentVersion };
  if (on) next[m] = prev[m] ?? now;
  else delete next[m];
  return { ...doc, problems: { ...doc.problems, [problemId]: next } };
}

export function touch(doc: ProgressDoc, problemId: string, contentVersion: number, now: string): ProgressDoc {
  const prev = doc.problems[problemId] ?? { contentVersion };
  return { ...doc, problems: { ...doc.problems, [problemId]: { ...prev, lastViewed: now } } };
}

export function setBookmark(doc: ProgressDoc, problemId: string, on: boolean, now: string): ProgressDoc {
  if (Boolean(doc.bookmarks[problemId]) === on) return doc;
  const bookmarks = { ...doc.bookmarks };
  if (on) bookmarks[problemId] = now;
  else delete bookmarks[problemId];
  return { ...doc, bookmarks };
}

export function recordCheckpoint(
  doc: ProgressDoc,
  problemId: string,
  checkpointId: string,
  contentVersion: number,
  choiceId: string,
  correct: boolean,
  now: string,
): ProgressDoc {
  const withAnswer: ProgressDoc = {
    ...doc,
    checkpoints: { ...doc.checkpoints, [`${problemId}/${checkpointId}`]: { choiceId, correct, at: now, contentVersion } },
  };
  return setMilestone(withAnswer, problemId, contentVersion, 'checkpointAnswered', true, now);
}

/** Progress across the published problems of one pattern, derived from canonical records. */
export function patternProgress(doc: ProgressDoc, problemIds: readonly string[]) {
  let practiced = 0;
  let started = 0;
  for (const id of problemIds) {
    const s = statusOf(doc.problems[id]);
    if (s === 'practiced') practiced++;
    if (s !== 'not-started') started++;
  }
  return { total: problemIds.length, practiced, started };
}
