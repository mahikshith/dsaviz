/**
 * Prefix sums for the same busiest-stretch problem: build running totals once,
 * then read any window total as a difference of two prefix values.
 */
import { defineAdapter } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, Band, CellState, Pointer } from '@/visuals/scenes/model';
import { WINDOW_FIELDS, formatWindow, parseWindowInput, windowToRaw, type WindowInput, type WindowOutput } from './windowShared';

type State = {
  prefix: number[];
  writing: number | null;
  start: number | null;
  total: number | null;
  best: number | null;
  bestStart: number | null;
  finished: boolean;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; k: number }
  | { kind: 'initialize'; anchor: 'initialize' }
  | { kind: 'build-prefix'; anchor: 'build'; day: number; value: number; before: number; after: number; position: number }
  | {
      kind: 'range-sum';
      anchor: 'range';
      start: number;
      end: number;
      endPosition: number;
      endPrefix: number;
      startPrefix: number;
      total: number;
    }
  | { kind: 'new-best'; anchor: 'update-best'; variant: 'first' | 'better'; start: number; total: number; previousBest: string }
  | { kind: 'keep-best'; anchor: 'compare'; variant: 'lower' | 'tie'; start: number; total: number; best: number; bestStart: number }
  | { kind: 'done'; anchor: 'return'; start: number; total: number; end: number };

export const adapter = defineAdapter<WindowInput, State, Ev, WindowOutput>({
  id: 'prefix-window-max-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'k'] },
    initialize: { anchor: 'initialize', fields: [] },
    'build-prefix': { anchor: 'build', fields: ['day', 'value', 'before', 'after', 'position'] },
    'range-sum': { anchor: 'range', fields: ['start', 'end', 'endPosition', 'endPrefix', 'startPrefix', 'total'] },
    'new-best': { anchor: 'update-best', fields: ['start', 'total', 'previousBest'], variants: ['first', 'better'] },
    'keep-best': { anchor: 'compare', fields: ['start', 'total', 'best', 'bestStart'], variants: ['lower', 'tie'] },
    done: { anchor: 'return', fields: ['start', 'total', 'end'] },
  },
  inputFields: WINDOW_FIELDS,
  parseInput: parseWindowInput,

  trace({ visitors, k }) {
    const t = createTracer<State, Ev>('prefix-window-max-v1', '1.0.0');
    const n = visitors.length;
    const s: State = { prefix: [], writing: null, start: null, total: null, best: null, bestStart: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n, k });

    s.prefix = [0];
    s.writing = 0;
    t.write();
    t.emit(s, { kind: 'initialize', anchor: 'initialize' });
    for (let i = 0; i < n; i++) {
      const before = s.prefix[i]!;
      const after = before + visitors[i]!;
      s.prefix = [...s.prefix, after];
      s.writing = i + 1;
      t.write();
      t.emit(s, { kind: 'build-prefix', anchor: 'build', day: i, value: visitors[i]!, before, after, position: i + 1 });
    }
    s.writing = null;

    let best: number | null = null;
    let bestStart = 0;
    for (let start = 0; start + k <= n; start++) {
      const endPrefix = s.prefix[start + k]!;
      const startPrefix = s.prefix[start]!;
      const total = endPrefix - startPrefix;
      s.start = start;
      s.total = total;
      t.emit(s, {
        kind: 'range-sum',
        anchor: 'range',
        start,
        end: start + k - 1,
        endPosition: start + k,
        endPrefix,
        startPrefix,
        total,
      });
      t.compare();
      if (best === null || total > best) {
        const previousBest = best === null ? 'none' : String(best);
        const variant = best === null ? 'first' : 'better';
        best = total;
        bestStart = start;
        s.best = best;
        s.bestStart = start;
        t.emit(s, { kind: 'new-best', anchor: 'update-best', variant, start, total, previousBest });
      } else {
        t.emit(s, { kind: 'keep-best', anchor: 'compare', variant: total === best ? 'tie' : 'lower', start, total, best, bestStart });
      }
    }
    s.finished = true;
    const finalBest = best ?? 0;
    t.emit(s, { kind: 'done', anchor: 'return', start: bestStart, total: finalBest, end: bestStart + k - 1 });
    return t.finish<WindowOutput>({ start: bestStart, total: finalBest });
  },

  view(frame, { input }) {
    const { visitors, k } = input;
    const st = frame.state;
    const cells: ArrayCell[] = visitors.map((v, i) => {
      let state: CellState = 'idle';
      if (st.finished && st.bestStart !== null && i >= st.bestStart && i < st.bestStart + k) state = 'success';
      else if (st.writing !== null && st.writing > 0 && i === st.writing - 1) state = 'entering';
      else if (st.start !== null && !st.finished && i >= st.start && i < st.start + k) state = 'window';
      return { id: `c${i}`, label: String(v), sub: String(i), state };
    });
    const prefixCells: ArrayCell[] = Array.from({ length: visitors.length + 1 }, (_, i) => {
      const value = st.prefix[i];
      let state: CellState = value === undefined ? 'pending' : 'idle';
      if (i === st.writing) state = 'entering';
      else if (st.start !== null && !st.finished && (i === st.start || i === st.start + k)) state = i === st.start ? 'comparison' : 'primary';
      return { id: `p${i}`, label: value === undefined ? '·' : String(value), sub: `P${i}`, state };
    });
    const bands: Band[] = [];
    if (st.start !== null && !st.finished) {
      bands.push({ id: 'range', from: st.start, to: st.start + k - 1, label: `range · ${st.total}`, tone: 'primary', side: 'above' });
    }
    if (st.bestStart !== null && st.best !== null) {
      bands.push({ id: 'best', from: st.bestStart, to: st.bestStart + k - 1, label: `best · ${st.best}`, tone: 'success', side: 'below' });
    }
    const pointers: Pointer[] = [];
    if (st.start !== null && !st.finished) {
      pointers.push({ id: 'pstart', label: 'P[start]', index: st.start, tone: 'comparison', side: 'below' });
      pointers.push({ id: 'pend', label: 'P[start+k]', index: st.start + k, tone: 'primary', side: 'below' });
    }
    return {
      scene: {
        arrays: [
          { id: 'visitors', label: 'visitors', cells, pointers: [], bands },
          { id: 'prefix', label: 'prefix   (P[i] = total of the first i days)', cells: prefixCells, pointers, bands: [], offset: -0.5 },
        ],
        legend: [
          { label: 'Range being read', swatch: 'window' },
          { label: 'Prefix value written', swatch: 'accent' },
          { label: 'Best so far', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'start', value: st.start === null ? '—' : String(st.start) },
        { name: 'total', value: st.total === null ? '—' : String(st.total) },
        { name: 'best', value: st.best === null ? '—' : String(st.best) },
        { name: 'best_start', value: st.bestStart === null ? '—' : String(st.bestStart) },
      ],
      facts: [{ name: 'k', value: String(k) }],
      summary:
        `Prefix so far: ${st.prefix.length ? st.prefix.join(', ') : 'empty'}.` +
        (st.start !== null ? ` Range ${st.start} to ${st.start + k - 1} totals ${st.total}.` : '') +
        (st.best !== null ? ` Best ${st.best} at ${st.bestStart}.` : ''),
    };
  },

  formatOutput: formatWindow,
  toRaw: windowToRaw,
});
