/**
 * The trace contract. An algorithm adapter turns a validated input into an
 * immutable list of frames. Every visible part of a lesson (diagram,
 * explanation, variables, code highlight) is derived from the current frame.
 */
import type { FrameView } from '@/visuals/scenes/model';

/** Algorithm work done so far. The number of frames is not an operation count. */
export type Counters = Readonly<{ comparisons: number; writes: number }>;

/** Every semantic event names its kind and the code anchor it corresponds to. */
export type BaseEvent = Readonly<{ kind: string; anchor: string; variant?: string }>;

export type TraceFrame<S, E extends BaseEvent> = Readonly<{
  /** Stable, deterministic id such as `4-compare-sum`, used by checkpoints. */
  id: string;
  index: number;
  state: Readonly<S>;
  event: E;
  counters: Counters;
  /** Attached when lesson content places a prediction checkpoint on this frame. */
  checkpointId?: string;
}>;

export type TraceResult<S, E extends BaseEvent, O> = Readonly<{
  schemaVersion: 1;
  adapterId: string;
  algorithmVersion: string;
  frames: readonly TraceFrame<S, E>[];
  output: O;
}>;

export type FieldError = { field: string; message: string };
export type ParseResult<I> = { ok: true; value: I } | { ok: false; errors: FieldError[] };

/** Describes one custom-input field. The form is generated from these. */
export type InputField =
  | { name: string; label: string; kind: 'int-list'; help: string; minItems: number; maxItems: number; min: number; max: number }
  | { name: string; label: string; kind: 'int'; help: string; min: number; max: number }
  | { name: string; label: string; kind: 'text'; help: string; maxLength: number }
  | { name: string; label: string; kind: 'edge-list'; help: string; maxEdges: number }
  | { name: string; label: string; kind: 'node'; help: string; nodesFrom: string };

/** Declares what an event carries so narration templates can be validated. */
export type EventSpec = Readonly<{ anchor: string; fields: readonly string[]; variants?: readonly string[] }>;

export type SceneKind = 'array' | 'array-stack' | 'graph';

export type ViewContext<I> = Readonly<{
  input: I;
  frames: readonly TraceFrame<unknown, BaseEvent>[];
  /** Optional presentation data from lesson content, such as graph coordinates. */
  display?: unknown;
}>;

export type AlgorithmAdapter<I, S, E extends BaseEvent, O> = {
  id: string;
  version: string;
  scene: SceneKind;
  events: Readonly<Record<E['kind'], EventSpec>>;
  inputFields: readonly InputField[];
  /** Validates an already typed raw object. Must never throw for bad input. */
  parseInput: (raw: unknown) => ParseResult<I>;
  /** Pure and deterministic. No DOM, timers or shared mutable state. */
  trace: (input: I) => TraceResult<S, E, O>;
  /** Pure projection of one frame onto a reusable scene model. */
  view: (frame: TraceFrame<S, E>, ctx: ViewContext<I>) => FrameView;
  formatOutput: (output: O) => string;
  /** Turns a validated input back into form strings for the custom input form. */
  toRaw: (input: I) => Record<string, string>;
};

/** Type-erased adapter used by registries, the player and validation. */
export type RuntimeAdapter = {
  id: string;
  version: string;
  scene: SceneKind;
  events: Readonly<Record<string, EventSpec>>;
  inputFields: readonly InputField[];
  parseInput: (raw: unknown) => ParseResult<unknown>;
  trace: (input: unknown) => TraceResult<unknown, BaseEvent, unknown>;
  view: (frame: TraceFrame<unknown, BaseEvent>, ctx: ViewContext<unknown>) => FrameView;
  formatOutput: (output: unknown) => string;
  toRaw: (input: unknown) => Record<string, string>;
};

export function defineAdapter<I, S, E extends BaseEvent, O>(adapter: AlgorithmAdapter<I, S, E, O>): RuntimeAdapter {
  return adapter as unknown as RuntimeAdapter;
}

/** The anchors an adapter can emit, collected from its event declarations. */
export function adapterAnchors(adapter: RuntimeAdapter): string[] {
  return [...new Set(Object.values(adapter.events).map((e) => e.anchor))];
}

/** A global cap so a trace can never grow without bound. */
export const FRAME_CAP = 2000;

export class TraceLimitError extends Error {
  constructor(limit: number) {
    super(`This input needs more than ${limit} steps to show. Try a smaller input.`);
    this.name = 'TraceLimitError';
  }
}
