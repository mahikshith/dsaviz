import { FRAME_CAP, TraceLimitError, type BaseEvent, type TraceFrame, type TraceResult } from './trace';

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value)) deepFreeze((value as Record<string, unknown>)[key]);
  }
  return value;
}

/**
 * Collects frames for one run. Each emitted state and event is deep-copied and
 * frozen, so a frame owns its arrays and can never change after it is recorded.
 * (Pushing one mutable object repeatedly would make every frame show the final state.)
 */
export function createTracer<S, E extends BaseEvent>(adapterId: string, version: string) {
  const frames: TraceFrame<S, E>[] = [];
  let comparisons = 0;
  let writes = 0;
  return {
    compare(n = 1) {
      comparisons += n;
    },
    write(n = 1) {
      writes += n;
    },
    emit(state: S, event: E) {
      if (frames.length >= FRAME_CAP) throw new TraceLimitError(FRAME_CAP);
      const index = frames.length;
      frames.push(
        deepFreeze({
          id: `${index}-${event.kind}`,
          index,
          state: structuredClone(state),
          event: structuredClone(event),
          counters: { comparisons, writes },
        }),
      );
    },
    finish<O>(output: O): TraceResult<S, E, O> {
      return deepFreeze({
        schemaVersion: 1 as const,
        adapterId,
        algorithmVersion: version,
        frames: frames.slice(),
        output: structuredClone(output),
      });
    },
  };
}
