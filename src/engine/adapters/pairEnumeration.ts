/**
 * The straightforward approach to the target-pair problem: try every pair of
 * distinct indices. Works on any order; costs O(n²) comparisons.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, Pointer } from '@/visuals/scenes/model';
import { readInt, readIntList, readObject, result } from './validate';
import { PAIR_FIELDS, PAIR_LIMITS, formatPair, pairToRaw, type PairInput, type PairOutput } from './pairShared';

type State = { i: number | null; j: number | null; sum: number | null; found: [number, number] | null; finished: boolean };

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; target: number }
  | { kind: 'pick-first'; anchor: 'outer-loop'; i: number; value: number; partners: number }
  | {
      kind: 'compare-pair';
      anchor: 'compare';
      variant: 'match' | 'miss';
      i: number;
      j: number;
      firstValue: number;
      secondValue: number;
      sum: number;
      target: number;
    }
  | { kind: 'found'; anchor: 'return-found'; i: number; j: number; firstValue: number; secondValue: number; target: number }
  | { kind: 'not-found'; anchor: 'return-none'; target: number; pairs: number };

export const adapter = defineAdapter<PairInput, State, Ev, PairOutput>({
  id: 'pair-enumeration-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'target'] },
    'pick-first': { anchor: 'outer-loop', fields: ['i', 'value', 'partners'] },
    'compare-pair': {
      anchor: 'compare',
      fields: ['i', 'j', 'firstValue', 'secondValue', 'sum', 'target'],
      variants: ['match', 'miss'],
    },
    found: { anchor: 'return-found', fields: ['i', 'j', 'firstValue', 'secondValue', 'target'] },
    'not-found': { anchor: 'return-none', fields: ['target', 'pairs'] },
  },
  inputFields: PAIR_FIELDS,

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const prices = readIntList(obj.prices, 'prices', 'Prices', PAIR_LIMITS.prices, errors);
    const target = readInt(obj.target, 'target', 'Target', PAIR_LIMITS.target, errors);
    return result(prices && target !== null ? { prices, target } : null, errors);
  },

  trace({ prices, target }) {
    const t = createTracer<State, Ev>('pair-enumeration-v1', '1.0.0');
    const n = prices.length;
    const s: State = { i: null, j: null, sum: null, found: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n, target });
    for (let i = 0; i < n - 1; i++) {
      s.i = i;
      s.j = null;
      s.sum = null;
      t.emit(s, { kind: 'pick-first', anchor: 'outer-loop', i, value: prices[i]!, partners: n - 1 - i });
      for (let j = i + 1; j < n; j++) {
        const sum = prices[i]! + prices[j]!;
        t.compare();
        s.j = j;
        s.sum = sum;
        const variant = sum === target ? 'match' : 'miss';
        t.emit(s, {
          kind: 'compare-pair',
          anchor: 'compare',
          variant,
          i,
          j,
          firstValue: prices[i]!,
          secondValue: prices[j]!,
          sum,
          target,
        });
        if (variant === 'match') {
          s.found = [i, j];
          s.finished = true;
          t.emit(s, { kind: 'found', anchor: 'return-found', i, j, firstValue: prices[i]!, secondValue: prices[j]!, target });
          return t.finish<PairOutput>([i, j]);
        }
      }
    }
    s.i = null;
    s.j = null;
    s.sum = null;
    s.finished = true;
    t.emit(s, { kind: 'not-found', anchor: 'return-none', target, pairs: (n * (n - 1)) / 2 });
    return t.finish<PairOutput>(null);
  },

  view(frame, { input }) {
    const { prices, target } = input;
    const { i, j, found, sum } = frame.state;
    const cells: ArrayCell[] = prices.map((v, k) => {
      let state: CellState = 'idle';
      if (found && (k === found[0] || k === found[1])) state = 'success';
      else if (k === i) state = 'primary';
      else if (k === j) state = 'comparison';
      else if (i !== null && k < i) state = 'muted';
      return { id: `c${k}`, label: String(v), sub: String(k), state };
    });
    const pointers: Pointer[] = [];
    if (i !== null) pointers.push({ id: 'i', label: 'i · first', index: i, tone: 'primary', side: 'above' });
    if (j !== null) pointers.push({ id: 'j', label: 'j · second', index: j, tone: 'comparison', side: 'below' });
    return {
      scene: {
        arrays: [{ id: 'prices', label: 'prices', cells, pointers, bands: [] }],
        legend: [
          { label: 'First book (i)', swatch: 'primary' },
          { label: 'Second book (j)', swatch: 'comparison' },
          { label: 'Already tried as first', swatch: 'neutral' },
          { label: 'Answer', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'i', value: i === null ? '—' : String(i) },
        { name: 'j', value: j === null ? '—' : String(j) },
        { name: 'sum', value: sum === null ? '—' : String(sum) },
        { name: 'comparisons', value: String(frame.counters.comparisons) },
      ],
      facts: [{ name: 'target', value: String(target) }],
      summary:
        i === null
          ? found
            ? `Answer: positions ${found[0]} and ${found[1]}.`
            : `Prices ${prices.join(', ')}. Target ${target}.`
          : `First book at position ${i}` + (j === null ? '.' : `, second at position ${j}, sum ${sum}.`) +
            (found ? ` Answer: positions ${found[0]} and ${found[1]}.` : ''),
    };
  },

  formatOutput: formatPair,
  toRaw: pairToRaw,
});
