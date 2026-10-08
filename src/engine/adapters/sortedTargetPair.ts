/**
 * Opposite pointers on a nondecreasing array: find two distinct indices whose
 * values add up to a target. Story: two books for one gift voucher.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, Pointer } from '@/visuals/scenes/model';
import { readInt, readIntList, readObject, result } from './validate';
import { PAIR_FIELDS, PAIR_LIMITS, formatPair, pairToRaw, type PairInput, type PairOutput } from './pairShared';

export type PairState = {
  left: number | null;
  right: number | null;
  sum: number | null;
  found: [number, number] | null;
  finished: boolean;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; target: number }
  | { kind: 'initialize'; anchor: 'initialize'; variant: 'normal' | 'too-few'; left: number; right: number; n: number }
  | {
      kind: 'compare-sum';
      anchor: 'compare';
      variant: 'less' | 'greater' | 'equal';
      left: number;
      right: number;
      leftValue: number;
      rightValue: number;
      sum: number;
      target: number;
    }
  | { kind: 'move-left'; anchor: 'move-left'; from: number; to: number; droppedValue: number; newValue: number }
  | { kind: 'move-right'; anchor: 'move-right'; from: number; to: number; droppedValue: number; newValue: number }
  | { kind: 'found'; anchor: 'return-found'; left: number; right: number; leftValue: number; rightValue: number; target: number }
  | { kind: 'not-found'; anchor: 'return-none'; target: number };

export const adapter = defineAdapter<PairInput, PairState, Ev, PairOutput>({
  id: 'sorted-target-pair-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'target'] },
    initialize: { anchor: 'initialize', fields: ['left', 'right', 'n'], variants: ['normal', 'too-few'] },
    'compare-sum': {
      anchor: 'compare',
      fields: ['left', 'right', 'leftValue', 'rightValue', 'sum', 'target'],
      variants: ['less', 'greater', 'equal'],
    },
    'move-left': { anchor: 'move-left', fields: ['from', 'to', 'droppedValue', 'newValue'] },
    'move-right': { anchor: 'move-right', fields: ['from', 'to', 'droppedValue', 'newValue'] },
    found: { anchor: 'return-found', fields: ['left', 'right', 'leftValue', 'rightValue', 'target'] },
    'not-found': { anchor: 'return-none', fields: ['target'] },
  },
  inputFields: PAIR_FIELDS,

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const prices = readIntList(obj.prices, 'prices', 'Prices', PAIR_LIMITS.prices, errors);
    const target = readInt(obj.target, 'target', 'Target', PAIR_LIMITS.target, errors);
    if (prices) {
      for (let i = 1; i < prices.length; i++) {
        if (prices[i]! < prices[i - 1]!) {
          errors.push({
            field: 'prices',
            message: `Opposite pointers needs prices from lowest to highest, but position ${i} (${prices[i]}) is lower than position ${i - 1} (${prices[i - 1]}). Sorting would change the positions, so enter them in order or use “Check every pair”, which works on any order.`,
          });
          break;
        }
      }
    }
    return result(prices && target !== null ? { prices, target } : null, errors);
  },

  trace({ prices, target }) {
    const t = createTracer<PairState, Ev>('sorted-target-pair-v1', '1.0.0');
    const n = prices.length;
    const s: PairState = { left: null, right: null, sum: null, found: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n, target });

    let left = 0;
    let right = n - 1;
    s.left = left;
    s.right = right;
    t.emit(s, { kind: 'initialize', anchor: 'initialize', variant: n < 2 ? 'too-few' : 'normal', left, right, n });

    while (left < right) {
      const leftValue = prices[left]!;
      const rightValue = prices[right]!;
      const sum = leftValue + rightValue;
      t.compare();
      s.sum = sum;
      const variant = sum < target ? 'less' : sum > target ? 'greater' : 'equal';
      t.emit(s, { kind: 'compare-sum', anchor: 'compare', variant, left, right, leftValue, rightValue, sum, target });
      if (variant === 'equal') {
        s.found = [left, right];
        s.finished = true;
        t.emit(s, { kind: 'found', anchor: 'return-found', left, right, leftValue, rightValue, target });
        return t.finish<PairOutput>([left, right]);
      }
      if (variant === 'less') {
        left += 1;
        s.left = left;
        s.sum = null;
        t.emit(s, { kind: 'move-left', anchor: 'move-left', from: left - 1, to: left, droppedValue: leftValue, newValue: prices[left]! });
      } else {
        right -= 1;
        s.right = right;
        s.sum = null;
        t.emit(s, { kind: 'move-right', anchor: 'move-right', from: right + 1, to: right, droppedValue: rightValue, newValue: prices[right]! });
      }
    }
    s.finished = true;
    t.emit(s, { kind: 'not-found', anchor: 'return-none', target });
    return t.finish<PairOutput>(null);
  },

  view(frame, { input }) {
    const { prices, target } = input;
    const { left, right, found, sum } = frame.state;
    const started = frame.event.kind !== 'present';
    const cells: ArrayCell[] = prices.map((v, i) => {
      let state: CellState = 'idle';
      if (started && left !== null && right !== null) {
        if (i < left || i > right) state = 'discarded';
        if (found && (i === found[0] || i === found[1])) state = 'success';
        else if (i === left && left <= right) state = 'primary';
        else if (i === right && left <= right) state = 'comparison';
      }
      return { id: `c${i}`, label: String(v), sub: String(i), state };
    });
    const pointers: Pointer[] = [];
    if (started && left !== null && right !== null) {
      if (left < prices.length) pointers.push({ id: 'left', label: 'L · left', index: left, tone: 'primary', side: 'above' });
      if (right >= 0) pointers.push({ id: 'right', label: 'R · right', index: right, tone: 'comparison', side: 'below' });
    }
    const ruledOut = started && left !== null && right !== null ? prices.map((_, i) => i).filter((i) => i < left || i > right) : [];
    return {
      scene: {
        arrays: [{ id: 'prices', label: 'prices', cells, pointers, bands: [] }],
        legend: [
          { label: 'Left pointer', swatch: 'primary' },
          { label: 'Right pointer', swatch: 'comparison' },
          { label: 'Ruled out', swatch: 'discarded' },
          { label: 'Answer', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'left', value: started && left !== null ? String(left) : '—' },
        { name: 'right', value: started && right !== null ? String(right) : '—' },
        { name: 'sum', value: sum === null ? '—' : String(sum) },
        { name: 'comparisons', value: String(frame.counters.comparisons) },
      ],
      facts: [{ name: 'target', value: String(target) }],
      summary: !started
        ? `Prices ${prices.join(', ')}. Target ${target}.`
        : `Left at position ${left}, right at position ${right}.` +
          (ruledOut.length ? ` Ruled out: positions ${ruledOut.join(', ')}.` : '') +
          (found ? ` Answer: positions ${found[0]} and ${found[1]}.` : ''),
    };
  },

  formatOutput: formatPair,
  toRaw: pairToRaw,
});
