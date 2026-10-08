'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { FieldError, RuntimeAdapter } from '@/engine/contracts/trace';
import { TraceLimitError } from '@/engine/contracts/trace';
import { loadAdapter } from '@/engine/registry/client';
import { DWELL_MS, initialPlayerState, playerReducer, type PlayerAction, type PlayerState } from './reducer';
import { prepareRun, type PreparedRun } from './prepare';
import type { LessonData } from './types';
import { readPref, writePref } from './prefs';

type LoadRequest = { approachId: string; exampleId: string; input?: unknown };
type LoadResult = { ok: true } | { ok: false; errors: FieldError[] };

type PlayerApi = {
  state: PlayerState;
  dispatch: (a: PlayerAction) => void;
  lesson: LessonData;
  /** Loads another approach, example or custom input. Stale replies are ignored. */
  load: (req: LoadRequest) => Promise<LoadResult>;
  getAdapter: (approachId: string) => Promise<RuntimeAdapter>;
  loading: boolean;
};

const PlayerContext = createContext<PlayerApi | null>(null);
const CACHE_LIMIT = 16;

export function PlayerProvider({ lesson, children }: { lesson: LessonData; children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, lesson.initialRun, (run) => initialPlayerState(run));
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);
  const cache = useRef(new Map<string, PreparedRun>([[lesson.initialRun.key, lesson.initialRun]]));

  // Restore per-browser preferences after hydration (never during the server render).
  useEffect(() => {
    const speed = readPref('speed');
    const mode = readPref('mode');
    const language = readPref('language');
    if (speed === 'slow' || speed === 'normal' || speed === 'fast') dispatch({ type: 'speed', speed });
    if (mode === 'story' || mode === 'formal') dispatch({ type: 'mode', mode });
    if (language === 'python' || language === 'typescript') dispatch({ type: 'language', language });
  }, []);
  useEffect(() => writePref('speed', state.speed), [state.speed]);
  useEffect(() => writePref('mode', state.mode), [state.mode]);
  useEffect(() => writePref('language', state.language), [state.language]);

  // The one autoplay scheduler. Each change of cursor, speed, run or play state
  // cancels the pending timer before a new one is set, so loops never stack.
  useEffect(() => {
    if (!state.playing) return;
    const t = setTimeout(() => dispatch({ type: 'tick' }), DWELL_MS[state.speed]);
    return () => clearTimeout(t);
  }, [state.playing, state.cursor, state.speed, state.runId]);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden) dispatch({ type: 'pause' });
    };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, []);

  const getAdapter = useCallback(
    (approachId: string) => {
      const approach = lesson.approaches.find((a) => a.id === approachId);
      if (!approach) return Promise.reject(new Error(`Unknown approach ${approachId}`));
      return loadAdapter(approach.adapterId);
    },
    [lesson.approaches],
  );

  const load = useCallback(
    async ({ approachId, exampleId, input }: LoadRequest): Promise<LoadResult> => {
      const id = ++requestId.current;
      dispatch({ type: 'pause' });
      const example = lesson.examples.find((e) => e.id === exampleId);
      const raw = input ?? example?.input;
      setLoading(true);
      try {
        const adapter = await getAdapter(approachId);
        if (id !== requestId.current) return { ok: true };
        const parsed = adapter.parseInput(raw);
        if (!parsed.ok) return { ok: false, errors: parsed.errors };
        const display = example?.display ?? lesson.examples.find((e) => e.id === state.run.exampleId)?.display ?? lesson.examples[0]?.display;
        const key = `${approachId}:${exampleId}:${adapter.id}@${adapter.version}:${JSON.stringify(parsed.value)}`;
        let run = cache.current.get(key);
        if (!run) {
          run = prepareRun(adapter, parsed.value, { approachId, exampleId, display, checkpoints: lesson.checkpoints });
          cache.current.set(key, run);
          if (cache.current.size > CACHE_LIMIT) cache.current.delete(cache.current.keys().next().value!);
        }
        if (id !== requestId.current) return { ok: true };
        dispatch({ type: 'load', run });
        return { ok: true };
      } catch (e) {
        const message =
          e instanceof TraceLimitError ? e.message : 'This walkthrough could not be loaded. Check your connection and try again.';
        return { ok: false, errors: [{ field: 'input', message }] };
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    },
    [getAdapter, lesson.checkpoints, lesson.examples, state.run.exampleId],
  );

  const api = useMemo(() => ({ state, dispatch, lesson, load, getAdapter, loading }), [state, lesson, load, getAdapter, loading]);
  return <PlayerContext.Provider value={api}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerApi {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
