'use client';

// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';
import { useState } from 'react';

/** In mixed review the pattern stays hidden until the learner has decided for themselves. */
export function RevealPattern({ patterns }: { patterns: { id: string; name: string }[] }) {
  const [shown, setShown] = useState(false);
  if (!shown) {
    return (
      <button type="button" className="btn btn-small btn-quiet" onClick={() => setShown(true)}>
        Reveal pattern
      </button>
    );
  }
  return (
    <span aria-live="polite">
      {patterns.map((p, i) => (
        <span key={p.id}>
          {i > 0 && ', '}
          <Link href={`/patterns/${p.id}/`}>{p.name}</Link>
        </span>
      ))}
    </span>
  );
}
