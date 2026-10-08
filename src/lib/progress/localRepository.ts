/**
 * Anonymous progress in this browser's localStorage. A signed-in repository can
 * later implement the same interface without changing any page.
 */
import { SITE } from '@/lib/site';
import { emptyProgress, normalize, type ProgressDoc } from './model';

export interface ProgressRepository {
  load(): ProgressDoc;
  save(doc: ProgressDoc): void;
  clear(): void;
  /** False when the browser refuses storage; progress then lasts only for this tab. */
  readonly persistent: boolean;
  /** Calls back when another tab changes the stored progress. */
  onExternalChange(cb: (doc: ProgressDoc) => void): () => void;
}

export const PROGRESS_KEY = `${SITE.storagePrefix}:progress:v1`;

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function createLocalRepository(storage: StorageLike | null, debounceMs = 250): ProgressRepository {
  let persistent = storage !== null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: ProgressDoc | null = null;

  const flush = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    if (!pending || !storage) return;
    try {
      storage.setItem(PROGRESS_KEY, JSON.stringify(pending));
    } catch {
      persistent = false;
    }
    pending = null;
  };

  if (typeof window !== 'undefined') window.addEventListener('pagehide', flush);

  return {
    get persistent() {
      return persistent;
    },
    load() {
      if (!storage) return emptyProgress();
      try {
        const raw = storage.getItem(PROGRESS_KEY);
        return raw ? normalize(JSON.parse(raw)) : emptyProgress();
      } catch {
        persistent = false;
        return emptyProgress();
      }
    },
    save(doc) {
      pending = doc;
      if (debounceMs <= 0) return flush();
      if (timer) clearTimeout(timer);
      timer = setTimeout(flush, debounceMs);
    },
    clear() {
      pending = null;
      if (timer) clearTimeout(timer);
      timer = null;
      try {
        storage?.removeItem(PROGRESS_KEY);
      } catch {
        persistent = false;
      }
    },
    onExternalChange(cb) {
      if (typeof window === 'undefined') return () => {};
      const handler = (e: StorageEvent) => {
        if (e.key !== PROGRESS_KEY) return;
        try {
          cb(e.newValue ? normalize(JSON.parse(e.newValue)) : emptyProgress());
        } catch {
          /* ignore malformed external writes */
        }
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    },
  };
}

export function browserStorage(): StorageLike | null {
  try {
    const s = window.localStorage;
    const probe = `${SITE.storagePrefix}:probe`;
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}
