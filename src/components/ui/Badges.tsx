// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';
import { DIFFICULTY_HUE, DIFFICULTY_LABEL } from '@/lib/site';
import type { Difficulty, Hue } from '@/lib/content/schema';

/** The pattern's two-letter monogram in its identity colour. Decorative: the name is always next to it. */
export function PatternBadge({ hue, short, size }: { hue: Hue; short: string; size?: 'small' }) {
  return (
    <span className="pattern-badge" data-hue={hue} data-size={size} aria-hidden>
      {short}
    </span>
  );
}

export function PatternChip({ id, name, hue, short }: { id: string; name: string; hue: Hue; short: string }) {
  return (
    <Link href={`/patterns/${id}/`} className="pattern-chip" data-hue={hue}>
      <PatternBadge hue={hue} short={short} size="small" />
      {name}
    </Link>
  );
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span className="diff" data-hue={DIFFICULTY_HUE[level]}>
      {DIFFICULTY_LABEL[level]}
    </span>
  );
}
