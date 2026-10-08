/**
 * Turns an adapter and a validated input into a run the player can show.
 * Pure: used at build time for the default run and in the browser for any
 * other example, approach or custom input.
 */
import type { BaseEvent, RuntimeAdapter, TraceFrame } from '@/engine/contracts/trace';
import type { FrameView } from '@/visuals/scenes/model';

export type CheckpointRef = { id: string; approachId: string; exampleId: string; frameId: string };

export type PreparedRun = {
  key: string;
  approachId: string;
  /** A content example id, or `custom` for learner input. */
  exampleId: string;
  adapterId: string;
  adapterVersion: string;
  input: unknown;
  frames: readonly TraceFrame<unknown, BaseEvent>[];
  views: FrameView[];
  outputText: string;
  output: unknown;
};

export function prepareRun(
  adapter: RuntimeAdapter,
  input: unknown,
  opts: { approachId: string; exampleId: string; display?: unknown; checkpoints?: readonly CheckpointRef[] },
): PreparedRun {
  const result = adapter.trace(input);
  const marks = new Map(
    (opts.checkpoints ?? [])
      .filter((c) => c.approachId === opts.approachId && c.exampleId === opts.exampleId)
      .map((c) => [c.frameId, c.id]),
  );
  const frames = result.frames.map((f) => (marks.has(f.id) ? { ...f, checkpointId: marks.get(f.id) } : f));
  const ctx = { input, frames: result.frames, display: opts.display };
  return {
    key: `${opts.approachId}:${opts.exampleId}:${adapter.id}@${adapter.version}:${JSON.stringify(input)}`,
    approachId: opts.approachId,
    exampleId: opts.exampleId,
    adapterId: adapter.id,
    adapterVersion: adapter.version,
    input,
    frames,
    views: result.frames.map((f) => adapter.view(f, ctx)),
    output: result.output,
    outputText: adapter.formatOutput(result.output),
  };
}
