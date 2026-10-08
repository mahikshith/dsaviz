import { ADAPTERS } from '@/engine/registry/all';
import type { AdapterId } from '@/engine/registry/ids';
import type { LessonData } from '@/features/player/types';
import { runFor, type LoadedProblem } from './load';

/**
 * Plain data for the interactive lesson, or null for a reading lesson without a
 * walkthrough. Only the default run is traced ahead of time.
 */
export function lessonData(p: LoadedProblem, opts: { approachId?: string; exampleId?: string } = {}): LessonData | null {
  if (p.meta.approaches.length === 0 || !p.meta.defaultApproach) return null;
  const approachId = opts.approachId ?? p.meta.defaultApproach;
  const exampleId = opts.exampleId ?? p.meta.examples[0]!.id;
  const inputFields: LessonData['inputFields'] = {};
  for (const a of p.meta.approaches) inputFields[a.adapterId] = ADAPTERS[a.adapterId as AdapterId].inputFields;
  return {
    problemId: p.meta.id,
    contentVersion: p.meta.contentVersion,
    goal: p.meta.goal,
    approaches: p.meta.approaches.map((a) => ({ ...a })),
    examples: p.meta.examples.map((e) => ({ id: e.id, label: e.label, input: e.input, display: e.display, explanation: e.explanation })),
    narration: p.narration,
    checkpoints: p.checkpoints,
    code: p.code,
    inputFields,
    initialRun: runFor(p, approachId, exampleId),
  };
}

/** Formats an example's input as short readable text, such as `prices = [2, 4], target = 18`. */
export function formatInput(input: Record<string, unknown>): string {
  return Object.entries(input)
    .map(([k, v]) => `${k} = ${JSON.stringify(v).replace(/,/g, ', ').replace(/"/g, "'")}`)
    .join(', ');
}

export function formatValue(v: unknown): string {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return v ? 'True' : 'False';
  return JSON.stringify(v).replace(/,/g, ', ').replace(/"/g, "'").replace(/:/g, ': ');
}
