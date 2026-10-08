import { SITE } from '@/lib/site';

/** Small per-browser conveniences (speed, view mode, code language). Failure is harmless. */
export function readPref(name: string): string | null {
  try {
    return window.localStorage.getItem(`${SITE.storagePrefix}:pref:${name}`);
  } catch {
    return null;
  }
}

export function writePref(name: string, value: string) {
  try {
    window.localStorage.setItem(`${SITE.storagePrefix}:pref:${name}`, value);
  } catch {
    /* not persisted; still works for this visit */
  }
}
