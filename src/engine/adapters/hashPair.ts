/**
 * Hash-map lookup for a pair with a target sum in an unsorted array: for each
 * value, ask whether the partner it needs has already been seen.
 * Story: the coat-check counter.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, TableRow } from '@/visuals/scenes/model';
import { readInt, readIntList, readObject, result } from './validate';

export type HashPairInput = { nums: number[]; target: number };
type Output = [number, number] | null;

type State = {
  i: number | null;
  need: number | null;
  /** Map of value → index, kept in insertion order for display. */
  seen: { value: number; index: number }[];
  hit: number | null;
  found: [number, number] | null;
  finished: boolean;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; target: number }
  | { kind: 'initialize'; anchor: 'initialize' }
  | { kind: 'need'; anchor: 'need'; i: number; value: number; need: number; target: number }
  | { kind: 'lookup'; anchor: 'lookup'; variant: 'miss' | 'hit'; i: number; need: number; partner: number }
  | { kind: 'store'; anchor: 'store'; i: number; value: number; replaced: string }
  | { kind: 'found'; anchor: 'return-found'; i: number; partner: number; value: number; need: number; target: number }
  | { kind: 'not-found'; anchor: 'return-none'; target: number };

const LIMITS = { nums: { minItems: 0, maxItems: 10, min: -99, max: 99 }, target: { min: -198, max: 198 } };

export const adapter = defineAdapter<HashPairInput, State, Ev, Output>({
  id: 'hash-pair-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'target'] },
    initialize: { anchor: 'initialize', fields: [] },
    need: { anchor: 'need', fields: ['i', 'value', 'need', 'target'] },
    lookup: { anchor: 'lookup', fields: ['i', 'need', 'partner'], variants: ['miss', 'hit'] },
    store: { anchor: 'store', fields: ['i', 'value', 'replaced'] },
    found: { anchor: 'return-found', fields: ['i', 'partner', 'value', 'need', 'target'] },
    'not-found': { anchor: 'return-none', fields: ['target'] },
  },
  inputFields: [
    { name: 'nums', label: 'Ticket numbers', kind: 'int-list', help: 'Up to 10 whole numbers from −99 to 99, in any order.', ...LIMITS.nums },
    { name: 'target', label: 'Target', kind: 'int', help: 'A whole number from −198 to 198.', ...LIMITS.target },
  ],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const nums = readIntList(obj.nums, 'nums', 'Ticket numbers', LIMITS.nums, errors);
    const target = readInt(obj.target, 'target', 'Target', LIMITS.target, errors);
    return result(nums && target !== null ? { nums, target } : null, errors);
  },

  trace({ nums, target }) {
    const t = createTracer<State, Ev>('hash-pair-v1', '1.0.0');
    const s: State = { i: null, need: null, seen: [], hit: null, found: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n: nums.length, target });
    t.emit(s, { kind: 'initialize', anchor: 'initialize' });
    for (let i = 0; i < nums.length; i++) {
      const value = nums[i]!;
      const need = target - value;
      s.i = i;
      s.need = need;
      s.hit = null;
      t.emit(s, { kind: 'need', anchor: 'need', i, value, need, target });
      t.compare();
      const partner = s.seen.find((e) => e.value === need);
      if (partner) {
        s.hit = partner.index;
        t.emit(s, { kind: 'lookup', anchor: 'lookup', variant: 'hit', i, need, partner: partner.index });
        s.found = [partner.index, i];
        s.finished = true;
        t.emit(s, { kind: 'found', anchor: 'return-found', i, partner: partner.index, value, need, target });
        return t.finish<Output>([partner.index, i]);
      }
      t.emit(s, { kind: 'lookup', anchor: 'lookup', variant: 'miss', i, need, partner: -1 });
      const existing = s.seen.find((e) => e.value === value);
      const replaced = existing ? `position ${existing.index}` : 'nothing';
      s.seen = existing ? s.seen.map((e) => (e.value === value ? { value, index: i } : e)) : [...s.seen, { value, index: i }];
      t.write();
      t.emit(s, { kind: 'store', anchor: 'store', i, value, replaced });
    }
    s.i = null;
    s.need = null;
    s.finished = true;
    t.emit(s, { kind: 'not-found', anchor: 'return-none', target });
    return t.finish<Output>(null);
  },

  view(frame, { input, frames }) {
    const { nums, target } = input;
    const st = frame.state;
    const ev = frame.event;
    const stored = new Set(st.seen.map((e) => e.index));
    const cells: ArrayCell[] = nums.map((v, k) => {
      let state: CellState = 'idle';
      if (st.found && (k === st.found[0] || k === st.found[1])) state = 'success';
      else if (k === st.i) state = 'primary';
      else if (k === st.hit) state = 'comparison';
      else if (stored.has(k)) state = 'muted';
      return { id: `c${k}`, label: String(v), sub: String(k), state };
    });
    const rows: TableRow[] = st.seen.map((e) => {
      let state: CellState = 'idle';
      if (st.found && e.index === st.found[0]) state = 'success';
      else if (ev.kind === 'store' && e.index === st.i) state = 'entering';
      else if (st.hit === e.index) state = 'comparison';
      return { id: `v${e.value}`, key: String(e.value), value: `at ${e.index}`, state };
    });
    const capacity = Math.max(1, ...frames.map((f) => (f.state as State).seen.length));
    return {
      scene: {
        arrays: [
          {
            id: 'nums',
            label: 'tickets',
            cells,
            pointers: st.i === null ? [] : [{ id: 'i', label: 'i', index: st.i, tone: 'primary', side: 'above' }],
            bands: [],
          },
        ],
        table: { label: 'seen: value → position', columns: ['value', 'position'], rows, capacity, emptyText: 'nothing yet' },
        legend: [
          { label: 'Current guest', swatch: 'primary' },
          { label: 'Partner found in the map', swatch: 'comparison' },
          { label: 'Just written down', swatch: 'accent' },
          { label: 'Answer', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'i', value: st.i === null ? '—' : String(st.i) },
        { name: 'need', value: st.need === null ? '—' : String(st.need) },
        { name: 'seen size', value: String(st.seen.length) },
        { name: 'lookups', value: String(frame.counters.comparisons) },
      ],
      facts: [{ name: 'target', value: String(target) }],
      summary:
        (st.i !== null ? `Position ${st.i}, value ${nums[st.i]}, needs ${st.need}. ` : '') +
        `Seen: ${st.seen.length ? st.seen.map((e) => `${e.value} at ${e.index}`).join(', ') : 'nothing'}.` +
        (st.found ? ` Answer: positions ${st.found[0]} and ${st.found[1]}.` : ''),
    };
  },

  formatOutput: (o) => {
    const out = o as Output;
    return out ? `[${out[0]}, ${out[1]}]` : 'null (no pair)';
  },
  toRaw: (i) => ({ nums: (i as HashPairInput).nums.join(', '), target: String((i as HashPairInput).target) }),
});
