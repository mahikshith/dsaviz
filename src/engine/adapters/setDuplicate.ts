/**
 * A set of values seen so far answers "has this appeared before?" in one step.
 * Story: the guest list at the door.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, TableRow } from '@/visuals/scenes/model';
import { readIntList, readObject, result } from './validate';

export type DuplicateInput = { nums: number[] };

type State = { i: number | null; seen: { value: number; index: number }[]; repeat: [number, number] | null; result: boolean | null };

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number }
  | { kind: 'initialize'; anchor: 'initialize' }
  | { kind: 'add'; anchor: 'add'; i: number; value: number; size: number }
  | { kind: 'duplicate'; anchor: 'return-true'; i: number; value: number; first: number }
  | { kind: 'all-unique'; anchor: 'return-false'; n: number };

const LIMITS = { minItems: 0, maxItems: 12, min: -99, max: 99 };

export const adapter = defineAdapter<DuplicateInput, State, Ev, boolean>({
  id: 'set-duplicate-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n'] },
    initialize: { anchor: 'initialize', fields: [] },
    add: { anchor: 'add', fields: ['i', 'value', 'size'] },
    duplicate: { anchor: 'return-true', fields: ['i', 'value', 'first'] },
    'all-unique': { anchor: 'return-false', fields: ['n'] },
  },
  inputFields: [{ name: 'nums', label: 'Guest numbers', kind: 'int-list', help: 'Up to 12 whole numbers from −99 to 99.', ...LIMITS }],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const nums = readIntList(readObject(raw, errors).nums, 'nums', 'Guest numbers', LIMITS, errors);
    return result(nums ? { nums } : null, errors);
  },

  trace({ nums }) {
    const t = createTracer<State, Ev>('set-duplicate-v1', '1.0.0');
    const s: State = { i: null, seen: [], repeat: null, result: null };
    t.emit(s, { kind: 'present', anchor: 'signature', n: nums.length });
    t.emit(s, { kind: 'initialize', anchor: 'initialize' });
    for (let i = 0; i < nums.length; i++) {
      const value = nums[i]!;
      s.i = i;
      t.compare();
      const first = s.seen.find((e) => e.value === value);
      if (first) {
        s.repeat = [first.index, i];
        s.result = true;
        t.emit(s, { kind: 'duplicate', anchor: 'return-true', i, value, first: first.index });
        return t.finish(true);
      }
      s.seen = [...s.seen, { value, index: i }];
      t.write();
      t.emit(s, { kind: 'add', anchor: 'add', i, value, size: s.seen.length });
    }
    s.i = null;
    s.result = false;
    t.emit(s, { kind: 'all-unique', anchor: 'return-false', n: nums.length });
    return t.finish(false);
  },

  view(frame, { input, frames }) {
    const st = frame.state;
    const cells: ArrayCell[] = input.nums.map((v, k) => {
      let state: CellState = 'idle';
      if (st.repeat && (k === st.repeat[0] || k === st.repeat[1])) state = 'danger';
      else if (k === st.i) state = 'primary';
      else if (st.seen.some((e) => e.index === k)) state = 'muted';
      return { id: `c${k}`, label: String(v), sub: String(k), state };
    });
    const rows: TableRow[] = st.seen.map((e) => ({
      id: `v${e.value}`,
      key: String(e.value),
      value: `first at ${e.index}`,
      state: st.repeat && e.index === st.repeat[0] ? 'danger' : frame.event.kind === 'add' && e.index === st.i ? 'entering' : 'idle',
    }));
    return {
      scene: {
        arrays: [
          {
            id: 'nums',
            label: 'guests at the door',
            cells,
            pointers: st.i === null ? [] : [{ id: 'i', label: 'i', index: st.i, tone: 'primary', side: 'above' }],
            bands: [],
          },
        ],
        table: {
          label: 'guest list (a set)',
          columns: ['number', 'seen'],
          rows,
          capacity: Math.max(1, ...frames.map((f) => (f.state as State).seen.length)),
          emptyText: 'empty',
        },
        legend: [
          { label: 'Checking now', swatch: 'primary' },
          { label: 'Just added', swatch: 'accent' },
          { label: 'Came twice', swatch: 'danger' },
        ],
      },
      variables: [
        { name: 'i', value: st.i === null ? '—' : String(st.i) },
        { name: 'set size', value: String(st.seen.length) },
        { name: 'result', value: st.result === null ? '…' : st.result ? 'True' : 'False' },
      ],
      facts: [{ name: 'guests', value: String(input.nums.length) }],
      summary:
        `Set holds ${st.seen.length ? st.seen.map((e) => e.value).join(', ') : 'nothing'}.` +
        (st.repeat ? ` Value at ${st.repeat[1]} repeats position ${st.repeat[0]}.` : '') +
        (st.result === false ? ' No value repeats.' : ''),
    };
  },

  formatOutput: (o) => ((o as boolean) ? 'True' : 'False'),
  toRaw: (i) => ({ nums: (i as DuplicateInput).nums.join(', ') }),
});
