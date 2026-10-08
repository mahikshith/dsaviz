/**
 * Opposite pointers for the largest area between two walls: water rises to the
 * shorter wall, so the shorter wall can never do better and is dropped.
 * Story: builders choosing two planks for a rain barrel.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, Band, CellState } from '@/visuals/scenes/model';
import { readIntList, readObject, result } from './validate';

export type ContainerInput = { heights: number[] };

type State = { left: number | null; right: number | null; area: number | null; best: number; bestPair: [number, number] | null; finished: boolean };

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number }
  | { kind: 'initialize'; anchor: 'initialize'; left: number; right: number }
  | {
      kind: 'measure';
      anchor: 'measure';
      variant: 'record' | 'keep';
      left: number;
      right: number;
      leftHeight: number;
      rightHeight: number;
      height: number;
      width: number;
      area: number;
      best: number;
    }
  | { kind: 'move-left'; anchor: 'move-left'; from: number; to: number; height: number; other: number }
  | { kind: 'move-right'; anchor: 'move-right'; from: number; to: number; height: number; other: number }
  | { kind: 'done'; anchor: 'return'; best: number; left: number; right: number };

const LIMITS = { minItems: 2, maxItems: 12, min: 0, max: 99 };

export const adapter = defineAdapter<ContainerInput, State, Ev, number>({
  id: 'container-area-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n'] },
    initialize: { anchor: 'initialize', fields: ['left', 'right'] },
    measure: {
      anchor: 'measure',
      fields: ['left', 'right', 'leftHeight', 'rightHeight', 'height', 'width', 'area', 'best'],
      variants: ['record', 'keep'],
    },
    'move-left': { anchor: 'move-left', fields: ['from', 'to', 'height', 'other'] },
    'move-right': { anchor: 'move-right', fields: ['from', 'to', 'height', 'other'] },
    done: { anchor: 'return', fields: ['best', 'left', 'right'] },
  },
  inputFields: [{ name: 'heights', label: 'Plank heights', kind: 'int-list', help: '2 to 12 whole numbers from 0 to 99.', ...LIMITS }],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const heights = readIntList(readObject(raw, errors).heights, 'heights', 'Plank heights', LIMITS, errors);
    return result(heights ? { heights } : null, errors);
  },

  trace({ heights: h }) {
    const t = createTracer<State, Ev>('container-area-v1', '1.0.0');
    const s: State = { left: null, right: null, area: null, best: 0, bestPair: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n: h.length });
    let left = 0;
    let right = h.length - 1;
    s.left = left;
    s.right = right;
    t.emit(s, { kind: 'initialize', anchor: 'initialize', left, right });
    while (left < right) {
      const height = Math.min(h[left]!, h[right]!);
      const width = right - left;
      const area = height * width;
      t.compare();
      const record = area > s.best;
      if (record) {
        s.best = area;
        s.bestPair = [left, right];
      }
      s.area = area;
      t.emit(s, {
        kind: 'measure',
        anchor: 'measure',
        variant: record ? 'record' : 'keep',
        left,
        right,
        leftHeight: h[left]!,
        rightHeight: h[right]!,
        height,
        width,
        area,
        best: s.best,
      });
      s.area = null;
      if (h[left]! < h[right]!) {
        left += 1;
        s.left = left;
        t.emit(s, { kind: 'move-left', anchor: 'move-left', from: left - 1, to: left, height: h[left - 1]!, other: h[right]! });
      } else {
        right -= 1;
        s.right = right;
        t.emit(s, { kind: 'move-right', anchor: 'move-right', from: right + 1, to: right, height: h[right + 1]!, other: h[left]! });
      }
    }
    s.finished = true;
    const [bl, br] = s.bestPair ?? [0, 0];
    t.emit(s, { kind: 'done', anchor: 'return', best: s.best, left: bl, right: br });
    return t.finish(s.best);
  },

  view(frame, { input }) {
    const h = input.heights;
    const st = frame.state;
    const max = Math.max(1, ...h);
    const cells: ArrayCell[] = h.map((v, i) => {
      let state: CellState = 'idle';
      if (st.finished && st.bestPair && (i === st.bestPair[0] || i === st.bestPair[1])) state = 'success';
      else if (!st.finished && i === st.left) state = 'primary';
      else if (!st.finished && i === st.right) state = 'comparison';
      else if (st.left !== null && st.right !== null && (i < st.left || i > st.right)) state = 'discarded';
      return { id: `c${i}`, label: String(v), sub: String(i), state, bar: v };
    });
    const bands: Band[] = [];
    if (st.area !== null && st.left !== null && st.right !== null) {
      bands.push({ id: 'area', from: st.left, to: st.right, label: `area ${st.area}`, tone: 'accent', side: 'below' });
    } else if (st.bestPair) {
      bands.push({ id: 'best', from: st.bestPair[0], to: st.bestPair[1], label: `best ${st.best}`, tone: 'success', side: 'below' });
    }
    const started = frame.event.kind !== 'present' && !st.finished;
    return {
      scene: {
        arrays: [
          {
            id: 'h',
            label: 'plank heights',
            cells,
            bars: { max },
            pointers: started && st.left !== null && st.right !== null
              ? [
                  { id: 'l', label: 'L', index: st.left, tone: 'primary', side: 'above' },
                  { id: 'r', label: 'R', index: st.right, tone: 'comparison', side: 'above' },
                ]
              : [],
            bands,
          },
        ],
        legend: [
          { label: 'Left wall', swatch: 'primary' },
          { label: 'Right wall', swatch: 'comparison' },
          { label: 'Dropped', swatch: 'discarded' },
          { label: 'Best barrel', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'left', value: st.left === null ? '—' : String(st.left) },
        { name: 'right', value: st.right === null ? '—' : String(st.right) },
        { name: 'area', value: st.area === null ? '—' : String(st.area) },
        { name: 'best', value: String(st.best) },
      ],
      facts: [{ name: 'planks', value: String(h.length) }],
      summary:
        (st.left !== null ? `Walls at ${st.left} and ${st.right}. ` : '') +
        `Best area so far ${st.best}` +
        (st.bestPair ? `, between ${st.bestPair[0]} and ${st.bestPair[1]}.` : '.'),
    };
  },

  formatOutput: (o) => String(o),
  toRaw: (i) => ({ heights: (i as ContainerInput).heights.join(', ') }),
});
