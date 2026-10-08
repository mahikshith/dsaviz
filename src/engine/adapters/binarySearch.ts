/**
 * Classic binary search on a sorted array with inclusive bounds.
 * Story: guessing a page number in a sorted catalogue.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, Band, CellState, Pointer } from '@/visuals/scenes/model';
import { readInt, readIntList, readObject, result } from './validate';

export type SearchInput = { nums: number[]; target: number };

type State = { low: number; high: number; mid: number | null; found: number | null; finished: boolean; started: boolean };

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; target: number }
  | { kind: 'initialize'; anchor: 'initialize'; low: number; high: number }
  | { kind: 'probe'; anchor: 'probe'; variant: 'equal' | 'less' | 'greater'; mid: number; value: number; target: number; low: number; high: number }
  | { kind: 'go-right'; anchor: 'go-right'; from: number; to: number; ruledOut: number }
  | { kind: 'go-left'; anchor: 'go-left'; from: number; to: number; ruledOut: number }
  | { kind: 'found'; anchor: 'return-found'; mid: number; target: number; probes: number }
  | { kind: 'not-found'; anchor: 'return-none'; target: number; probes: number };

const LIMITS = { nums: { minItems: 0, maxItems: 12, min: -99, max: 99 }, target: { min: -99, max: 99 } };

export const adapter = defineAdapter<SearchInput, State, Ev, number>({
  id: 'binary-search-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'target'] },
    initialize: { anchor: 'initialize', fields: ['low', 'high'] },
    probe: { anchor: 'probe', fields: ['mid', 'value', 'target', 'low', 'high'], variants: ['equal', 'less', 'greater'] },
    'go-right': { anchor: 'go-right', fields: ['from', 'to', 'ruledOut'] },
    'go-left': { anchor: 'go-left', fields: ['from', 'to', 'ruledOut'] },
    found: { anchor: 'return-found', fields: ['mid', 'target', 'probes'] },
    'not-found': { anchor: 'return-none', fields: ['target', 'probes'] },
  },
  inputFields: [
    { name: 'nums', label: 'Sorted numbers', kind: 'int-list', help: 'Up to 12 whole numbers from −99 to 99, in increasing order with no repeats.', ...LIMITS.nums },
    { name: 'target', label: 'Target', kind: 'int', help: 'A whole number from −99 to 99.', ...LIMITS.target },
  ],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const nums = readIntList(obj.nums, 'nums', 'Sorted numbers', LIMITS.nums, errors);
    const target = readInt(obj.target, 'target', 'Target', LIMITS.target, errors);
    if (nums) {
      for (let i = 1; i < nums.length; i++) {
        if (nums[i]! <= nums[i - 1]!) {
          errors.push({
            field: 'nums',
            message: `Binary search needs strictly increasing numbers, but position ${i} (${nums[i]}) is not larger than position ${i - 1} (${nums[i - 1]}).`,
          });
          break;
        }
      }
    }
    return result(nums && target !== null ? { nums, target } : null, errors);
  },

  trace({ nums, target }) {
    const t = createTracer<State, Ev>('binary-search-v1', '1.0.0');
    const s: State = { low: 0, high: nums.length - 1, mid: null, found: null, finished: false, started: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n: nums.length, target });
    s.started = true;
    t.emit(s, { kind: 'initialize', anchor: 'initialize', low: s.low, high: s.high });
    let probes = 0;
    while (s.low <= s.high) {
      const mid = Math.floor((s.low + s.high) / 2);
      s.mid = mid;
      probes += 1;
      t.compare();
      const value = nums[mid]!;
      const variant = value === target ? 'equal' : value < target ? 'less' : 'greater';
      t.emit(s, { kind: 'probe', anchor: 'probe', variant, mid, value, target, low: s.low, high: s.high });
      if (variant === 'equal') {
        s.found = mid;
        s.finished = true;
        t.emit(s, { kind: 'found', anchor: 'return-found', mid, target, probes });
        return t.finish(mid);
      }
      if (variant === 'less') {
        const from = s.low;
        s.low = mid + 1;
        s.mid = null;
        t.emit(s, { kind: 'go-right', anchor: 'go-right', from, to: s.low, ruledOut: s.low - from });
      } else {
        const from = s.high;
        s.high = mid - 1;
        s.mid = null;
        t.emit(s, { kind: 'go-left', anchor: 'go-left', from, to: s.high, ruledOut: from - s.high });
      }
    }
    s.finished = true;
    t.emit(s, { kind: 'not-found', anchor: 'return-none', target, probes });
    return t.finish(-1);
  },

  view(frame, { input }) {
    const { nums, target } = input;
    const st = frame.state;
    const cells: ArrayCell[] = nums.map((v, i) => {
      let state: CellState = 'idle';
      if (i === st.found) state = 'success';
      else if (i === st.mid) state = 'comparison';
      else if (st.started && (i < st.low || i > st.high)) state = 'discarded';
      else if (st.started) state = 'window';
      return { id: `c${i}`, label: String(v), sub: String(i), state };
    });
    const pointers: Pointer[] = [];
    const bands: Band[] = [];
    if (st.started && !st.finished && st.low <= st.high) {
      pointers.push({ id: 'low', label: 'low', index: st.low, tone: 'primary', side: 'above' });
      pointers.push({ id: 'high', label: 'high', index: st.high, tone: 'primary', side: 'above' });
    }
    if (st.mid !== null && st.found === null) pointers.push({ id: 'mid', label: 'mid', index: st.mid, tone: 'comparison', side: 'below' });
    if (st.started && st.low <= st.high && st.found === null) {
      bands.push({ id: 'range', from: st.low, to: st.high, label: `${st.high - st.low + 1} left`, tone: 'primary', side: 'below' });
    }
    return {
      scene: {
        arrays: [{ id: 'nums', label: 'sorted numbers', cells, pointers, bands }],
        legend: [
          { label: 'Still possible', swatch: 'window' },
          { label: 'Middle being checked', swatch: 'comparison' },
          { label: 'Ruled out', swatch: 'discarded' },
          { label: 'Found', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'low', value: st.started ? String(st.low) : '—' },
        { name: 'high', value: st.started ? String(st.high) : '—' },
        { name: 'mid', value: st.mid === null ? '—' : String(st.mid) },
        { name: 'probes', value: String(frame.counters.comparisons) },
      ],
      facts: [{ name: 'target', value: String(target) }],
      summary: st.found !== null ? `Found at ${st.found}.` : `Searching positions ${st.low} to ${st.high}.`,
    };
  },

  formatOutput: (o) => String(o),
  toRaw: (i) => ({ nums: (i as SearchInput).nums.join(', '), target: String((i as SearchInput).target) }),
});
