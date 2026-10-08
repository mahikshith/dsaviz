import type { InputField } from '@/engine/contracts/trace';

/** Shared by the two approaches to the target-pair problem. */
export type PairInput = { prices: number[]; target: number };
export type PairOutput = [number, number] | null;

export const PAIR_LIMITS = {
  prices: { minItems: 0, maxItems: 12, min: 0, max: 999 },
  target: { min: 0, max: 1998 },
} as const;

export const PAIR_FIELDS: readonly InputField[] = [
  {
    name: 'prices',
    label: 'Prices',
    kind: 'int-list',
    help: 'Up to 12 whole numbers from 0 to 999, separated by commas.',
    ...PAIR_LIMITS.prices,
  },
  { name: 'target', label: 'Target', kind: 'int', help: 'A whole number from 0 to 1998.', ...PAIR_LIMITS.target },
];

export function formatPair(output: unknown) {
  const o = output as PairOutput;
  return o ? `[${o[0]}, ${o[1]}]` : 'null (no pair)';
}

export function pairToRaw(input: unknown) {
  const i = input as PairInput;
  return { prices: i.prices.join(', '), target: String(i.target) };
}
