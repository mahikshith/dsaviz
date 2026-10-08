/**
 * Counting letters: add one for each letter of the first word, subtract one for
 * each letter of the second. Anagrams leave every count at zero.
 * Story: two bags of letter tiles.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, TableRow } from '@/visuals/scenes/model';
import { readObject, readText, result } from './validate';

export type AnagramInput = { s: string; t: string };

type State = { i: number | null; counts: { letter: string; count: number }[]; touched: string[]; checking: string | null; result: boolean | null };

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; m: number }
  | { kind: 'length-mismatch'; anchor: 'length'; n: number; m: number }
  | { kind: 'initialize'; anchor: 'initialize' }
  | { kind: 'tally'; anchor: 'tally'; i: number; add: string; sub: string; addCount: number; subCount: number }
  | { kind: 'nonzero'; anchor: 'return-false'; letter: string; count: number }
  | { kind: 'all-zero'; anchor: 'return-true'; letters: number };

const LETTERS = { maxLength: 10, allowed: /^[a-z]$/, allowedText: 'Use lowercase letters a to z only.' };

export const adapter = defineAdapter<AnagramInput, State, Ev, boolean>({
  id: 'anagram-count-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'm'] },
    'length-mismatch': { anchor: 'length', fields: ['n', 'm'] },
    initialize: { anchor: 'initialize', fields: [] },
    tally: { anchor: 'tally', fields: ['i', 'add', 'sub', 'addCount', 'subCount'] },
    nonzero: { anchor: 'return-false', fields: ['letter', 'count'] },
    'all-zero': { anchor: 'return-true', fields: ['letters'] },
  },
  inputFields: [
    { name: 's', label: 'First bag', kind: 'text', help: 'Up to 10 lowercase letters.', maxLength: 10 },
    { name: 't', label: 'Second bag', kind: 'text', help: 'Up to 10 lowercase letters.', maxLength: 10 },
  ],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const s = readText(obj.s, 's', 'First bag', LETTERS, errors);
    const t = readText(obj.t, 't', 'Second bag', LETTERS, errors);
    return result(s !== null && t !== null ? { s, t } : null, errors);
  },

  trace({ s: a, t: b }) {
    const t = createTracer<State, Ev>('anagram-count-v1', '1.0.0');
    const st: State = { i: null, counts: [], touched: [], checking: null, result: null };
    t.emit(st, { kind: 'present', anchor: 'signature', n: a.length, m: b.length });
    if (a.length !== b.length) {
      st.result = false;
      t.emit(st, { kind: 'length-mismatch', anchor: 'length', n: a.length, m: b.length });
      return t.finish(false);
    }
    t.emit(st, { kind: 'initialize', anchor: 'initialize' });
    const bump = (letter: string, d: number) => {
      const e = st.counts.find((x) => x.letter === letter);
      st.counts = e
        ? st.counts.map((x) => (x.letter === letter ? { letter, count: x.count + d } : x))
        : [...st.counts, { letter, count: d }].sort((p, q) => p.letter.localeCompare(q.letter));
      t.write();
      return st.counts.find((x) => x.letter === letter)!.count;
    };
    for (let i = 0; i < a.length; i++) {
      st.i = i;
      const addCount = bump(a[i]!, 1);
      const subCount = bump(b[i]!, -1);
      st.touched = [a[i]!, b[i]!];
      t.emit(st, { kind: 'tally', anchor: 'tally', i, add: a[i]!, sub: b[i]!, addCount: a[i] === b[i] ? subCount : addCount, subCount });
    }
    st.i = null;
    st.touched = [];
    for (const e of st.counts) {
      t.compare();
      if (e.count !== 0) {
        st.checking = e.letter;
        st.result = false;
        t.emit(st, { kind: 'nonzero', anchor: 'return-false', letter: e.letter, count: e.count });
        return t.finish(false);
      }
    }
    st.result = true;
    t.emit(st, { kind: 'all-zero', anchor: 'return-true', letters: st.counts.length });
    return t.finish(true);
  },

  view(frame, { input, frames }) {
    const st = frame.state;
    // Letters already tallied are muted; after the loop, all of them are.
    const doneUpTo = st.i !== null ? st.i : st.counts.length > 0 ? Infinity : 0;
    const row = (id: string, label: string, text: string, tone: CellState): { id: string; label: string; cells: ArrayCell[] } => ({
      id,
      label,
      cells: [...text].map((ch, k) => ({
        id: `${id}${k}`,
        label: ch,
        sub: String(k),
        state: st.i === k ? tone : k < doneUpTo ? 'muted' : 'idle',
      })),
    });
    const s = row('s', 'first bag  (+1)', input.s, 'primary');
    const t = row('t', 'second bag (−1)', input.t, 'comparison');
    const rows: TableRow[] = st.counts.map((e) => {
      let state: CellState = 'idle';
      if (st.result === true) state = 'success';
      else if (st.checking === e.letter) state = 'danger';
      else if (st.touched.includes(e.letter)) state = 'entering';
      return { id: e.letter, key: e.letter, value: e.count > 0 ? `+${e.count}` : String(e.count), state };
    });
    const capacity = Math.max(1, ...frames.map((f) => (f.state as State).counts.length));
    return {
      scene: {
        arrays: [
          { ...s, pointers: st.i === null ? [] : [{ id: 'i', label: 'i', index: st.i, tone: 'primary', side: 'above' }], bands: [] },
          { ...t, pointers: st.i === null ? [] : [{ id: 'j', label: 'i', index: st.i, tone: 'comparison', side: 'below' }], bands: [] },
        ],
        table: { label: 'tally: letter → count', columns: ['letter', 'count'], rows, capacity, emptyText: 'no letters yet' },
        legend: [
          { label: 'Adding (+1)', swatch: 'primary' },
          { label: 'Taking away (−1)', swatch: 'comparison' },
          { label: 'Count just changed', swatch: 'accent' },
          { label: 'Count not zero', swatch: 'danger' },
        ],
      },
      variables: [
        { name: 'i', value: st.i === null ? '—' : String(st.i) },
        { name: 'letters tracked', value: String(st.counts.length) },
        { name: 'result', value: st.result === null ? '…' : st.result ? 'True' : 'False' },
      ],
      facts: [
        { name: 'first', value: `"${input.s}"` },
        { name: 'second', value: `"${input.t}"` },
      ],
      summary:
        `Tally: ${st.counts.length ? st.counts.map((e) => `${e.letter} ${e.count}`).join(', ') : 'empty'}.` +
        (st.result === null ? '' : st.result ? ' Every count is zero: anagrams.' : ' Not anagrams.'),
    };
  },

  formatOutput: (o) => ((o as boolean) ? 'True' : 'False'),
  toRaw: (i) => ({ s: (i as AnagramInput).s, t: (i as AnagramInput).t }),
});
