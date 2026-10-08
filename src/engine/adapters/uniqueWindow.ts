/**
 * Variable sliding window with a last-seen map: the longest stretch with no
 * repeated character. When a repeat appears inside the window, the left edge
 * jumps just past its previous position. Story: faces through a train window.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, Band, CellState, TableRow } from '@/visuals/scenes/model';
import { readObject, readText, result } from './validate';

export type UniqueInput = { s: string };

type State = {
  left: number;
  right: number | null;
  last: { char: string; index: number }[];
  best: number;
  bestStart: number;
  jumpedFrom: number | null;
  finished: boolean;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number }
  | { kind: 'initialize'; anchor: 'initialize' }
  | { kind: 'read'; anchor: 'read'; variant: 'new' | 'outside' | 'repeat'; right: number; char: string; lastIndex: number }
  | { kind: 'jump'; anchor: 'jump'; char: string; from: number; to: number; lastIndex: number }
  | { kind: 'measure'; anchor: 'measure'; variant: 'record' | 'keep'; left: number; right: number; length: number; best: number }
  | { kind: 'done'; anchor: 'return'; best: number; start: number; end: number };

const TEXT = { maxLength: 12, allowed: /^[a-z]$/, allowedText: 'Use lowercase letters a to z only.' };

export const adapter = defineAdapter<UniqueInput, State, Ev, number>({
  id: 'unique-window-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n'] },
    initialize: { anchor: 'initialize', fields: [] },
    read: { anchor: 'read', fields: ['right', 'char', 'lastIndex'], variants: ['new', 'outside', 'repeat'] },
    jump: { anchor: 'jump', fields: ['char', 'from', 'to', 'lastIndex'] },
    measure: { anchor: 'measure', fields: ['left', 'right', 'length', 'best'], variants: ['record', 'keep'] },
    done: { anchor: 'return', fields: ['best', 'start', 'end'] },
  },
  inputFields: [{ name: 's', label: 'Badges in boarding order', kind: 'text', help: 'Up to 12 lowercase letters.', maxLength: 12 }],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const s = readText(readObject(raw, errors).s, 's', 'Badges', TEXT, errors);
    return result(s === null ? null : { s }, errors);
  },

  trace({ s }) {
    const t = createTracer<State, Ev>('unique-window-v1', '1.0.0');
    const st: State = { left: 0, right: null, last: [], best: 0, bestStart: 0, jumpedFrom: null, finished: false };
    t.emit(st, { kind: 'present', anchor: 'signature', n: s.length });
    t.emit(st, { kind: 'initialize', anchor: 'initialize' });
    for (let right = 0; right < s.length; right++) {
      const char = s[right]!;
      st.right = right;
      st.jumpedFrom = null;
      const prev = st.last.find((e) => e.char === char);
      t.compare();
      const variant = !prev ? 'new' : prev.index >= st.left ? 'repeat' : 'outside';
      t.emit(st, { kind: 'read', anchor: 'read', variant, right, char, lastIndex: prev ? prev.index : -1 });
      if (variant === 'repeat') {
        const from = st.left;
        st.left = prev!.index + 1;
        st.jumpedFrom = from;
        t.emit(st, { kind: 'jump', anchor: 'jump', char, from, to: st.left, lastIndex: prev!.index });
      }
      st.last = prev ? st.last.map((e) => (e.char === char ? { char, index: right } : e)) : [...st.last, { char, index: right }];
      t.write();
      const length = right - st.left + 1;
      const record = length > st.best;
      if (record) {
        st.best = length;
        st.bestStart = st.left;
      }
      st.jumpedFrom = null;
      t.emit(st, { kind: 'measure', anchor: 'measure', variant: record ? 'record' : 'keep', left: st.left, right, length, best: st.best });
    }
    st.finished = true;
    t.emit(st, { kind: 'done', anchor: 'return', best: st.best, start: st.bestStart, end: st.bestStart + st.best - 1 });
    return t.finish(st.best);
  },

  view(frame, { input, frames }) {
    const st = frame.state;
    const ev = frame.event;
    const inWindow = (k: number) => st.right !== null && k >= st.left && k <= st.right;
    const cells: ArrayCell[] = [...input.s].map((ch, k) => {
      let state: CellState = 'idle';
      if (st.finished && k >= st.bestStart && k < st.bestStart + st.best) state = 'success';
      else if (k === st.right && ev.kind === 'read' && ev.variant === 'repeat') state = 'danger';
      else if (k === st.right) state = 'entering';
      else if (st.jumpedFrom !== null && k >= st.jumpedFrom && k < st.left) state = 'leaving';
      else if (inWindow(k)) state = 'window';
      else if (st.right !== null && k < st.left) state = 'muted';
      return { id: `c${k}`, label: ch, sub: String(k), state };
    });
    const bands: Band[] = [];
    if (st.right !== null && !st.finished) {
      bands.push({ id: 'window', from: st.left, to: st.right, label: `window · ${st.right - st.left + 1}`, tone: 'primary', side: 'above' });
    }
    if (st.best > 0) bands.push({ id: 'best', from: st.bestStart, to: st.bestStart + st.best - 1, label: `best · ${st.best}`, tone: 'success', side: 'below' });
    const rows: TableRow[] = st.last.map((e) => ({
      id: e.char,
      key: e.char,
      value: String(e.index),
      state:
        ev.kind === 'read' && ev.char === e.char && ev.variant !== 'new'
          ? ev.variant === 'repeat'
            ? 'danger'
            : 'comparison'
          : ev.kind === 'measure' && st.right !== null && input.s[st.right] === e.char
            ? 'entering'
            : e.index < st.left
              ? 'muted'
              : 'idle',
    }));
    return {
      scene: {
        arrays: [{ id: 's', label: 'badges', cells, pointers: [], bands }],
        table: {
          label: 'last seen: badge → position',
          columns: ['badge', 'last at'],
          rows,
          capacity: Math.max(1, ...frames.map((f) => (f.state as State).last.length)),
          emptyText: 'nothing yet',
        },
        legend: [
          { label: 'Window, no repeats', swatch: 'window' },
          { label: 'Just boarded', swatch: 'accent' },
          { label: 'Repeat inside the window', swatch: 'danger' },
          { label: 'Longest so far', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'left', value: String(st.left) },
        { name: 'right', value: st.right === null ? '—' : String(st.right) },
        { name: 'length', value: st.right === null ? '0' : String(st.right - st.left + 1) },
        { name: 'best', value: String(st.best) },
      ],
      facts: [{ name: 'badges', value: String(input.s.length) }],
      summary:
        (st.right !== null ? `Window from ${st.left} to ${st.right}. ` : '') + `Longest without repeats so far: ${st.best}.`,
    };
  },

  formatOutput: (o) => String(o),
  toRaw: (i) => ({ s: (i as UniqueInput).s }),
});
