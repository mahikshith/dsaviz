/**
 * Fixed-size sliding window: the maximum total of any k consecutive values.
 * Story: the busiest three-day stretch at a library. Ties keep the earliest window.
 */
import { defineAdapter } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, Band, CellState } from '@/visuals/scenes/model';
import { WINDOW_FIELDS, formatWindow, parseWindowInput, windowToRaw, type WindowInput, type WindowOutput } from './windowShared';

type State = {
  /** First index of the current window, or null while the first window is being built. */
  start: number | null;
  /** Number of values currently inside the window. */
  size: number;
  windowSum: number | null;
  best: number | null;
  bestStart: number | null;
  leaving: number | null;
  entering: number | null;
  finished: boolean;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; k: number }
  | { kind: 'initialize'; anchor: 'initialize'; k: number }
  | { kind: 'add-initial'; anchor: 'build'; index: number; value: number; windowSum: number; remaining: number }
  | { kind: 'record-first'; anchor: 'record-first'; total: number; k: number; end: number }
  | {
      kind: 'slide';
      anchor: 'slide';
      start: number;
      end: number;
      leaveIndex: number;
      leaveValue: number;
      enterIndex: number;
      enterValue: number;
      before: number;
      after: number;
    }
  | { kind: 'new-best'; anchor: 'update-best'; start: number; total: number; previousBest: number; previousStart: number }
  | { kind: 'keep-best'; anchor: 'compare'; variant: 'lower' | 'tie'; start: number; total: number; best: number; bestStart: number }
  | { kind: 'done'; anchor: 'return'; start: number; total: number; end: number };

export const adapter = defineAdapter<WindowInput, State, Ev, WindowOutput>({
  id: 'fixed-window-max-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'k'] },
    initialize: { anchor: 'initialize', fields: ['k'] },
    'add-initial': { anchor: 'build', fields: ['index', 'value', 'windowSum', 'remaining'] },
    'record-first': { anchor: 'record-first', fields: ['total', 'k', 'end'] },
    slide: {
      anchor: 'slide',
      fields: ['start', 'end', 'leaveIndex', 'leaveValue', 'enterIndex', 'enterValue', 'before', 'after'],
    },
    'new-best': { anchor: 'update-best', fields: ['start', 'total', 'previousBest', 'previousStart'] },
    'keep-best': { anchor: 'compare', fields: ['start', 'total', 'best', 'bestStart'], variants: ['lower', 'tie'] },
    done: { anchor: 'return', fields: ['start', 'total', 'end'] },
  },
  inputFields: WINDOW_FIELDS,
  parseInput: parseWindowInput,

  trace({ visitors, k }) {
    const t = createTracer<State, Ev>('fixed-window-max-v1', '1.0.0');
    const n = visitors.length;
    const s: State = { start: null, size: 0, windowSum: null, best: null, bestStart: null, leaving: null, entering: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n, k });

    let windowSum = 0;
    s.windowSum = 0;
    t.emit(s, { kind: 'initialize', anchor: 'initialize', k });
    for (let i = 0; i < k; i++) {
      windowSum += visitors[i]!;
      t.write();
      s.size = i + 1;
      s.windowSum = windowSum;
      s.entering = i;
      t.emit(s, { kind: 'add-initial', anchor: 'build', index: i, value: visitors[i]!, windowSum, remaining: k - i - 1 });
    }
    let best = windowSum;
    let bestStart = 0;
    s.start = 0;
    s.entering = null;
    s.best = best;
    s.bestStart = 0;
    t.emit(s, { kind: 'record-first', anchor: 'record-first', total: best, k, end: k - 1 });

    for (let start = 1; start + k <= n; start++) {
      const leaveIndex = start - 1;
      const enterIndex = start + k - 1;
      const before = windowSum;
      windowSum += visitors[enterIndex]! - visitors[leaveIndex]!;
      t.write();
      s.start = start;
      s.windowSum = windowSum;
      s.leaving = leaveIndex;
      s.entering = enterIndex;
      t.emit(s, {
        kind: 'slide',
        anchor: 'slide',
        start,
        end: enterIndex,
        leaveIndex,
        leaveValue: visitors[leaveIndex]!,
        enterIndex,
        enterValue: visitors[enterIndex]!,
        before,
        after: windowSum,
      });
      t.compare();
      s.leaving = null;
      s.entering = null;
      if (windowSum > best) {
        const previousBest = best;
        const previousStart = bestStart;
        best = windowSum;
        bestStart = start;
        s.best = best;
        s.bestStart = bestStart;
        t.emit(s, { kind: 'new-best', anchor: 'update-best', start, total: windowSum, previousBest, previousStart });
      } else {
        t.emit(s, {
          kind: 'keep-best',
          anchor: 'compare',
          variant: windowSum === best ? 'tie' : 'lower',
          start,
          total: windowSum,
          best,
          bestStart,
        });
      }
    }
    s.finished = true;
    t.emit(s, { kind: 'done', anchor: 'return', start: bestStart, total: best, end: bestStart + k - 1 });
    return t.finish<WindowOutput>({ start: bestStart, total: best });
  },

  view(frame, { input }) {
    const { visitors, k } = input;
    const st = frame.state;
    const started = frame.event.kind !== 'present';
    const winFrom = st.start ?? 0;
    const winTo = st.start === null ? st.size - 1 : st.start + k - 1;
    const cells: ArrayCell[] = visitors.map((v, i) => {
      let state: CellState = 'idle';
      const inWindow = started && st.size > 0 && i >= winFrom && i <= winTo;
      if (st.finished && st.bestStart !== null && i >= st.bestStart && i < st.bestStart + k) state = 'success';
      else if (i === st.leaving) state = 'leaving';
      else if (i === st.entering) state = 'entering';
      else if (inWindow) state = 'window';
      return { id: `c${i}`, label: String(v), sub: String(i), state };
    });
    const bands: Band[] = [];
    if (started && st.size > 0 && !st.finished) {
      bands.push({
        id: 'window',
        from: winFrom,
        to: winTo,
        label: `window · ${st.windowSum}`,
        tone: 'primary',
        side: 'above',
      });
    }
    if (st.bestStart !== null && st.best !== null) {
      bands.push({ id: 'best', from: st.bestStart, to: st.bestStart + k - 1, label: `best · ${st.best}`, tone: 'success', side: 'below' });
    }
    return {
      scene: {
        arrays: [{ id: 'visitors', label: 'visitors', cells, pointers: [], bands }],
        legend: [
          { label: 'Current window', swatch: 'window' },
          { label: 'Entering', swatch: 'accent' },
          { label: 'Leaving', swatch: 'discarded' },
          { label: 'Best so far', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'start', value: st.start === null ? '—' : String(st.start) },
        { name: 'window_sum', value: st.windowSum === null ? '—' : String(st.windowSum) },
        { name: 'best', value: st.best === null ? '—' : String(st.best) },
        { name: 'best_start', value: st.bestStart === null ? '—' : String(st.bestStart) },
      ],
      facts: [{ name: 'k', value: String(k) }],
      summary: !started
        ? `Visitors ${visitors.join(', ')}. Window length ${k}.`
        : `Window covers positions ${winFrom} to ${Math.max(winFrom, winTo)} with total ${st.windowSum}.` +
          (st.best !== null ? ` Best so far ${st.best}, starting at ${st.bestStart}.` : ''),
    };
  },

  formatOutput: formatWindow,
  toRaw: windowToRaw,
});
