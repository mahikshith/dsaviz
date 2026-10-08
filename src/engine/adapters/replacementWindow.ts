/**
 * Sliding window with a letter tally: the longest stretch that can become one
 * colour with at most k repaints. Repaints needed = window size − count of its
 * most common letter. The window never shrinks; it slides when too many repaints
 * would be needed, because only a longer window could beat the best.
 * Story: a painter touching up a row of tiles.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, Band, CellState, TableRow } from '@/visuals/scenes/model';
import { readInt, readObject, readText, result } from './validate';

export type ReplacementInput = { s: string; k: number };

type State = {
  left: number;
  right: number | null;
  counts: { letter: string; count: number }[];
  top: number;
  best: number;
  leaving: number | null;
  finished: boolean;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; k: number }
  | { kind: 'initialize'; anchor: 'initialize' }
  | { kind: 'grow'; anchor: 'grow'; right: number; char: string; count: number; top: number; size: number; repaints: number }
  | { kind: 'slide'; anchor: 'slide'; char: string; from: number; to: number; size: number; repaints: number; k: number }
  | { kind: 'measure'; anchor: 'measure'; variant: 'record' | 'keep'; size: number; best: number }
  | { kind: 'done'; anchor: 'return'; best: number };

const TEXT = { maxLength: 12, allowed: /^[A-Z]$/, allowedText: 'Use capital letters A to Z only.' };

export const adapter = defineAdapter<ReplacementInput, State, Ev, number>({
  id: 'replacement-window-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'k'] },
    initialize: { anchor: 'initialize', fields: [] },
    grow: { anchor: 'grow', fields: ['right', 'char', 'count', 'top', 'size', 'repaints'] },
    slide: { anchor: 'slide', fields: ['char', 'from', 'to', 'size', 'repaints', 'k'] },
    measure: { anchor: 'measure', fields: ['size', 'best'], variants: ['record', 'keep'] },
    done: { anchor: 'return', fields: ['best'] },
  },
  inputFields: [
    { name: 's', label: 'Tile colours', kind: 'text', help: 'Up to 12 capital letters, one per tile.', maxLength: 12 },
    { name: 'k', label: 'Repaints allowed (k)', kind: 'int', help: 'A whole number from 0 to 12.', min: 0, max: 12 },
  ],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const s = readText(obj.s, 's', 'Tile colours', TEXT, errors);
    const k = readInt(obj.k, 'k', 'k', { min: 0, max: 12 }, errors);
    return result(s !== null && k !== null ? { s, k } : null, errors);
  },

  trace({ s, k }) {
    const t = createTracer<State, Ev>('replacement-window-v1', '1.0.0');
    const st: State = { left: 0, right: null, counts: [], top: 0, best: 0, leaving: null, finished: false };
    t.emit(st, { kind: 'present', anchor: 'signature', n: s.length, k });
    t.emit(st, { kind: 'initialize', anchor: 'initialize' });
    const bump = (letter: string, d: number) => {
      const e = st.counts.find((x) => x.letter === letter);
      st.counts = e
        ? st.counts.map((x) => (x.letter === letter ? { letter, count: x.count + d } : x))
        : [...st.counts, { letter, count: d }].sort((p, q) => p.letter.localeCompare(q.letter));
      t.write();
      return st.counts.find((x) => x.letter === letter)!.count;
    };
    for (let right = 0; right < s.length; right++) {
      const char = s[right]!;
      st.right = right;
      st.leaving = null;
      const count = bump(char, 1);
      st.top = Math.max(st.top, count);
      const size = right - st.left + 1;
      t.emit(st, { kind: 'grow', anchor: 'grow', right, char, count, top: st.top, size, repaints: size - st.top });
      t.compare();
      if (size - st.top > k) {
        const out = s[st.left]!;
        bump(out, -1);
        st.leaving = st.left;
        st.left += 1;
        t.emit(st, { kind: 'slide', anchor: 'slide', char: out, from: st.left - 1, to: st.left, size: size - 1, repaints: size - st.top, k });
      }
      const now = right - st.left + 1;
      const record = now > st.best;
      if (record) st.best = now;
      st.leaving = null;
      t.emit(st, { kind: 'measure', anchor: 'measure', variant: record ? 'record' : 'keep', size: now, best: st.best });
    }
    st.finished = true;
    t.emit(st, { kind: 'done', anchor: 'return', best: st.best });
    return t.finish(st.best);
  },

  view(frame, { input, frames }) {
    const st = frame.state;
    const ev = frame.event;
    const cells: ArrayCell[] = [...input.s].map((ch, i) => {
      let state: CellState = 'idle';
      if (i === st.leaving) state = 'leaving';
      else if (i === st.right && ev.kind === 'grow') state = 'entering';
      else if (st.right !== null && i >= st.left && i <= st.right) state = 'window';
      else if (st.right !== null && i < st.left) state = 'muted';
      return { id: `c${i}`, label: ch, sub: String(i), state };
    });
    const size = st.right === null ? 0 : st.right - st.left + 1;
    const bands: Band[] =
      st.right !== null && !st.finished
        ? [{ id: 'w', from: st.left, to: st.right, label: `size ${size} · repaints ${Math.max(0, size - st.top)}`, tone: 'primary', side: 'above' }]
        : [];
    const rows: TableRow[] = st.counts.map((e) => ({
      id: e.letter,
      key: e.letter,
      value: String(e.count),
      state: ev.kind === 'grow' && ev.char === e.letter ? 'entering' : ev.kind === 'slide' && ev.char === e.letter ? 'comparison' : e.count === st.top && e.count > 0 ? 'success' : 'idle',
    }));
    return {
      scene: {
        arrays: [{ id: 's', label: 'tiles', cells, pointers: [], bands }],
        table: {
          label: 'tally inside the window',
          columns: ['colour', 'count'],
          rows,
          capacity: Math.max(1, ...frames.map((f) => (f.state as State).counts.length)),
          emptyText: 'nothing yet',
        },
        legend: [
          { label: 'Window', swatch: 'window' },
          { label: 'Tile entering', swatch: 'accent' },
          { label: 'Tile leaving', swatch: 'discarded' },
          { label: 'Most common colour', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'left', value: String(st.left) },
        { name: 'right', value: st.right === null ? '—' : String(st.right) },
        { name: 'top count', value: String(st.top) },
        { name: 'best', value: String(st.best) },
      ],
      facts: [{ name: 'k', value: String(input.k) }],
      summary:
        (st.right !== null ? `Window ${st.left} to ${st.right}, size ${size}, most common count ${st.top}. ` : '') + `Best so far ${st.best}.`,
    };
  },

  formatOutput: (o) => String(o),
  toRaw: (i) => ({ s: (i as ReplacementInput).s, k: String((i as ReplacementInput).k) }),
});
