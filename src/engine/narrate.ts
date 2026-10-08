/**
 * Explanation presenter. Reviewed templates from lesson content are chosen by
 * the frame's semantic event and filled with that frame's values. It never
 * recomputes algorithm state.
 */
import type { BaseEvent } from '@/engine/contracts/trace';

export type NarrationTemplate = { label: string; story: string; formal: string };
export type NarrationSet = Record<string, NarrationTemplate>;
export type ViewMode = 'story' | 'formal';

const PLACEHOLDER = /\{([A-Za-z][A-Za-z0-9]*)\}/g;

export function templateKey(event: BaseEvent) {
  return event.variant ? `${event.kind}:${event.variant}` : event.kind;
}

export function pickTemplate(set: NarrationSet, event: BaseEvent): NarrationTemplate | undefined {
  return set[templateKey(event)] ?? set[event.kind];
}

function show(value: unknown): string {
  if (value === null || value === undefined) return 'none';
  if (Array.isArray(value)) return `[${value.map(show).join(', ')}]`;
  return String(value);
}

export function fill(template: string, event: BaseEvent): string {
  const fields = event as unknown as Record<string, unknown>;
  return template.replace(PLACEHOLDER, (_, name: string) => show(fields[name]));
}

export function narrate(set: NarrationSet, event: BaseEvent, mode: ViewMode) {
  const t = pickTemplate(set, event);
  if (!t) return { label: event.kind.replace(/-/g, ' '), text: '' };
  return { label: t.label, text: fill(mode === 'story' ? t.story : t.formal, event) };
}

/** Placeholder names used in a template, for validation. */
export function placeholders(template: string): string[] {
  return [...template.matchAll(PLACEHOLDER)].map((m) => m[1]!);
}
