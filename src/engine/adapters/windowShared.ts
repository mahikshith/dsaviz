import type { FieldError, InputField } from '@/engine/contracts/trace';
import { readInt, readIntList, readObject, result } from './validate';

/** Shared by the two approaches to the busiest-stretch problem. */
export type WindowInput = { visitors: number[]; k: number };
/** Start index of the best window (earliest on ties) and its total. */
export type WindowOutput = { start: number; total: number };

export const WINDOW_LIMITS = {
  visitors: { minItems: 1, maxItems: 12, min: 0, max: 999 },
} as const;

export const WINDOW_FIELDS: readonly InputField[] = [
  {
    name: 'visitors',
    label: 'Visitors per day',
    kind: 'int-list',
    help: '1 to 12 whole numbers from 0 to 999, separated by commas.',
    ...WINDOW_LIMITS.visitors,
  },
  { name: 'k', label: 'Stretch length k', kind: 'int', help: 'How many consecutive days, from 1 to the number of days.', min: 1, max: 12 },
];

export function parseWindowInput(raw: unknown) {
  const errors: FieldError[] = [];
  const obj = readObject(raw, errors);
  const visitors = readIntList(obj.visitors, 'visitors', 'Visitors', WINDOW_LIMITS.visitors, errors);
  const k = readInt(obj.k, 'k', 'k', { min: 1, max: WINDOW_LIMITS.visitors.maxItems }, errors);
  if (visitors && k !== null && k > visitors.length) {
    errors.push({ field: 'k', message: `k is ${k}, but there are only ${visitors.length} days. Use a k from 1 to ${visitors.length}.` });
  }
  return result(visitors && k !== null ? { visitors, k } : null, errors);
}

export function formatWindow(output: unknown) {
  const o = output as WindowOutput;
  return `start ${o.start}, total ${o.total}`;
}

export function windowToRaw(input: unknown) {
  const i = input as WindowInput;
  return { visitors: i.visitors.join(', '), k: String(i.k) };
}
