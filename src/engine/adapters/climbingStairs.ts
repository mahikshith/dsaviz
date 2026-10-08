/**
 * A one-dimensional table: ways[i] = ways[i − 1] + ways[i − 2], because the
 * last move onto step i was either one step or two. Story: notes on a staircase.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, Pointer } from '@/visuals/scenes/model';
import { readInt, readObject, result } from './validate';

export type StairsInput = { n: number };

type State = { ways: (number | null)[]; i: number | null; finished: boolean };

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number }
  | { kind: 'base'; anchor: 'base' }
  | { kind: 'fill'; anchor: 'fill'; i: number; oneBack: number; twoBack: number; value: number; prev: number; prev2: number }
  | { kind: 'done'; anchor: 'return'; n: number; ways: number };

export const adapter = defineAdapter<StairsInput, State, Ev, number>({
  id: 'climbing-stairs-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n'] },
    base: { anchor: 'base', fields: [] },
    fill: { anchor: 'fill', fields: ['i', 'oneBack', 'twoBack', 'value', 'prev', 'prev2'] },
    done: { anchor: 'return', fields: ['n', 'ways'] },
  },
  inputFields: [{ name: 'n', label: 'Number of steps', kind: 'int', help: 'A whole number from 1 to 11.', min: 1, max: 11 }],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const n = readInt(readObject(raw, errors).n, 'n', 'Number of steps', { min: 1, max: 11 }, errors);
    return result(n === null ? null : { n }, errors);
  },

  trace({ n }) {
    const t = createTracer<State, Ev>('climbing-stairs-v1', '1.0.0');
    const s: State = { ways: Array.from({ length: n + 1 }, () => null), i: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n });
    s.ways = s.ways.map((v, k) => (k <= 1 ? 1 : v));
    t.write(2);
    t.emit(s, { kind: 'base', anchor: 'base' });
    for (let i = 2; i <= n; i++) {
      const a = s.ways[i - 1]!;
      const b = s.ways[i - 2]!;
      s.ways = s.ways.map((v, k) => (k === i ? a + b : v));
      s.i = i;
      t.write();
      t.emit(s, { kind: 'fill', anchor: 'fill', i, oneBack: a, twoBack: b, value: a + b, prev: i - 1, prev2: i - 2 });
    }
    s.i = null;
    s.finished = true;
    t.emit(s, { kind: 'done', anchor: 'return', n, ways: s.ways[n]! });
    return t.finish(s.ways[n]!);
  },

  view(frame, { input }) {
    const st = frame.state;
    const cells: ArrayCell[] = st.ways.map((v, k) => {
      let state: CellState = v === null ? 'pending' : 'idle';
      if (st.finished && k === input.n) state = 'success';
      else if (k === st.i) state = 'entering';
      else if (st.i !== null && (k === st.i - 1 || k === st.i - 2)) state = k === st.i - 1 ? 'primary' : 'comparison';
      else if (frame.event.kind === 'base' && k <= 1) state = 'entering';
      return { id: `w${k}`, label: v === null ? '·' : String(v), sub: `step ${k}`, state };
    });
    const pointers: Pointer[] =
      st.i === null
        ? []
        : [
            { id: 'one', label: 'one step back', index: st.i - 1, tone: 'primary', side: 'below' },
            { id: 'two', label: 'two back', index: st.i - 2, tone: 'comparison', side: 'below' },
          ];
    return {
      scene: {
        arrays: [{ id: 'ways', label: 'ways to reach each step', cells, pointers, bands: [] }],
        legend: [
          { label: 'Arrive with one step', swatch: 'primary' },
          { label: 'Arrive with two steps', swatch: 'comparison' },
          { label: 'Just written', swatch: 'accent' },
          { label: 'Answer', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'i', value: st.i === null ? '—' : String(st.i) },
        { name: 'ways[i]', value: st.i === null ? '—' : String(st.ways[st.i]) },
        { name: 'cells written', value: String(frame.counters.writes) },
      ],
      facts: [{ name: 'n', value: String(input.n) }],
      summary: `Ways so far: ${st.ways.map((v, k) => (v === null ? null : `step ${k}: ${v}`)).filter(Boolean).join(', ')}.`,
    };
  },

  formatOutput: (o) => String(o),
  toRaw: (i) => ({ n: String((i as StairsInput).n) }),
});
