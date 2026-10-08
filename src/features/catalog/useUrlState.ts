'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Filter state mirrored into the URL query string so a filtered list can be
 * shared and survives reload. Uses replaceState, so typing does not flood history.
 */
export function useUrlState<T extends Record<string, string>>(defaults: T) {
  const [state, setState] = useState<T>(defaults);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const v = params.get(key);
      if (v !== null) (next as Record<string, string>)[key] = v;
    }
    setState(next);
    // Read once on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback(
    (patch: Partial<T>) => {
      setState((prev) => {
        const next = { ...prev, ...patch } as T;
        const url = new URL(window.location.href);
        for (const [k, v] of Object.entries(next)) {
          if (v === defaults[k]) url.searchParams.delete(k);
          else url.searchParams.set(k, v);
        }
        window.history.replaceState(window.history.state, '', url);
        return next;
      });
    },
    [defaults],
  );

  return [state, update] as const;
}
