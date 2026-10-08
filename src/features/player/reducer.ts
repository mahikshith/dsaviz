/**
 * Playback state. The frame index is the only cursor; everything on screen is
 * derived from the frame it points at. Pure, so it is tested without a browser.
 */
import type { ViewMode } from '@/engine/narrate';
import type { Language } from '@/lib/content/schema';
import type { PreparedRun } from './prepare';

export type Speed = 'slow' | 'normal' | 'fast';
export const DWELL_MS: Record<Speed, number> = { slow: 3200, normal: 2000, fast: 1100 };

export type PlayerState = {
  run: PreparedRun;
  runId: number;
  cursor: number;
  /** Cursor before the last change. A jump of more than one frame is shown without animation. */
  previous: number;
  playing: boolean;
  speed: Speed;
  mode: ViewMode;
  language: Language;
  /** Checkpoint currently waiting for an answer or an explicit skip. */
  gate: string | null;
  /** Checkpoints answered or skipped, which no longer block. */
  cleared: readonly string[];
  /** Whether the last cursor change came from the learner (announced) or autoplay (not announced). */
  source: 'manual' | 'auto';
};

export type PlayerAction =
  | { type: 'next' }
  | { type: 'tick' }
  | { type: 'prev' }
  | { type: 'seek'; index: number }
  | { type: 'restart' }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'speed'; speed: Speed }
  | { type: 'mode'; mode: ViewMode }
  | { type: 'language'; language: Language }
  | { type: 'load'; run: PreparedRun }
  | { type: 'clear-checkpoint'; id: string };

export function initialPlayerState(run: PreparedRun, opts: Partial<Pick<PlayerState, 'speed' | 'mode' | 'language'>> = {}): PlayerState {
  return {
    run,
    runId: 1,
    cursor: 0,
    previous: 0,
    playing: false,
    speed: opts.speed ?? 'normal',
    mode: opts.mode ?? 'story',
    language: opts.language ?? 'python',
    gate: null,
    cleared: [],
    source: 'manual',
  };
}

const last = (s: PlayerState) => s.run.frames.length - 1;
const clamp = (s: PlayerState, i: number) => Math.max(0, Math.min(last(s), Math.trunc(i)));

/** The checkpoint on the current frame that must be answered before moving on, if any. */
export function blockingCheckpoint(s: PlayerState): string | null {
  const id = s.run.frames[s.cursor]?.checkpointId;
  return id && !s.cleared.includes(id) ? id : null;
}

function advance(s: PlayerState, source: 'manual' | 'auto'): PlayerState {
  if (s.cursor >= last(s)) return { ...s, playing: false };
  const blocked = blockingCheckpoint(s);
  if (blocked) return { ...s, playing: false, gate: blocked };
  const cursor = s.cursor + 1;
  return { ...s, previous: s.cursor, cursor, source, gate: null, playing: source === 'auto' ? cursor < last(s) && s.playing : false };
}

export function playerReducer(s: PlayerState, a: PlayerAction): PlayerState {
  switch (a.type) {
    case 'next':
      return advance({ ...s, playing: false }, 'manual');
    case 'tick':
      return s.playing ? advance(s, 'auto') : s;
    case 'prev':
      if (s.cursor === 0) return { ...s, playing: false };
      return { ...s, previous: s.cursor, cursor: s.cursor - 1, playing: false, gate: null, source: 'manual' };
    case 'seek': {
      const cursor = clamp(s, a.index);
      return { ...s, previous: s.cursor, cursor, playing: false, gate: null, source: 'manual' };
    }
    case 'restart':
      return { ...s, previous: s.cursor, cursor: 0, playing: false, gate: null, source: 'manual' };
    case 'play': {
      if (s.cursor >= last(s)) return s;
      const blocked = blockingCheckpoint(s);
      if (blocked) return { ...s, playing: false, gate: blocked };
      return { ...s, playing: true };
    }
    case 'pause':
      return s.playing ? { ...s, playing: false } : s;
    case 'speed':
      return { ...s, speed: a.speed };
    case 'mode':
      return { ...s, mode: a.mode };
    case 'language':
      // Switching reference language keeps the cursor: it is the same trace.
      return { ...s, language: a.language };
    case 'load':
      // A new input or approach is a new run: the old trace and cursor are discarded.
      return { ...s, run: a.run, runId: s.runId + 1, cursor: 0, previous: 0, playing: false, gate: null, source: 'manual' };
    case 'clear-checkpoint':
      if (s.cleared.includes(a.id)) return s.gate === a.id ? { ...s, gate: null } : s;
      return { ...s, cleared: [...s.cleared, a.id], gate: s.gate === a.id ? null : s.gate };
  }
}
