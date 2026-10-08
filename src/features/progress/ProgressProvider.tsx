'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import {
  emptyProgress,
  recordCheckpoint,
  setBookmark,
  setMilestone,
  touch,
  type Milestone,
  type ProgressDoc,
} from '@/lib/progress/model';
import { browserStorage, createLocalRepository, type ProgressRepository } from '@/lib/progress/localRepository';

type Store = {
  get: () => ProgressDoc;
  set: (doc: ProgressDoc) => void;
  subscribe: (cb: () => void) => () => void;
  repo: ProgressRepository | null;
  ready: boolean;
};

type ProgressApi = {
  doc: ProgressDoc;
  /** False until the browser's saved progress has been read. */
  ready: boolean;
  persistent: boolean;
  mark: (problemId: string, contentVersion: number, m: Milestone, on?: boolean) => void;
  view: (problemId: string, contentVersion: number) => void;
  bookmark: (problemId: string, on: boolean) => void;
  answer: (problemId: string, checkpointId: string, contentVersion: number, choiceId: string, correct: boolean) => void;
  replace: (doc: ProgressDoc) => void;
  clear: () => void;
};

const ProgressContext = createContext<ProgressApi | null>(null);
const SERVER_DOC = emptyProgress();

function createStore(): Store {
  let doc = SERVER_DOC;
  const listeners = new Set<() => void>();
  const store: Store = {
    repo: null,
    ready: false,
    get: () => doc,
    set: (next) => {
      if (next === doc) return;
      doc = next;
      listeners.forEach((l) => l());
    },
    subscribe: (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
  };
  return store;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<Store | null>(null);
  storeRef.current ??= createStore();
  const store = storeRef.current;

  useEffect(() => {
    const repo = createLocalRepository(browserStorage());
    store.repo = repo;
    store.ready = true;
    store.set(repo.load());
    return repo.onExternalChange((doc) => store.set(doc));
  }, [store]);

  const doc = useSyncExternalStore(store.subscribe, store.get, () => SERVER_DOC);

  const update = useCallback(
    (fn: (d: ProgressDoc, now: string) => ProgressDoc) => {
      const next = fn(store.get(), new Date().toISOString());
      store.set(next);
      store.repo?.save(next);
    },
    [store],
  );

  const api = useMemo<ProgressApi>(
    () => ({
      doc,
      ready: store.ready,
      persistent: store.repo?.persistent ?? true,
      mark: (id, v, m, on = true) => update((d, now) => setMilestone(d, id, v, m, on, now)),
      view: (id, v) => update((d, now) => touch(d, id, v, now)),
      bookmark: (id, on) => update((d, now) => setBookmark(d, id, on, now)),
      answer: (id, cp, v, choice, correct) => update((d, now) => recordCheckpoint(d, id, cp, v, choice, correct, now)),
      replace: (next) => update(() => next),
      clear: () => {
        store.repo?.clear();
        store.set(emptyProgress());
      },
    }),
    [doc, store, update],
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
