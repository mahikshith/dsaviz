/**
 * Stack matching: every closing symbol must match the most recent unmatched
 * opening symbol of the same type. Story: compartments in a packing crate.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, StackItem } from '@/visuals/scenes/model';
import { readObject, readText, result } from './validate';

export type BracketInput = { log: string };

const OPEN_FOR: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
const CLOSE_FOR: Record<string, string> = { '(': ')', '[': ']', '{': '}' };

type Entry = { id: string; char: string; index: number };
type State = {
  cursor: number | null;
  stack: Entry[];
  matched: number[];
  failedAt: number | null;
  result: boolean | null;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number }
  | { kind: 'initialize'; anchor: 'initialize' }
  | { kind: 'push'; anchor: 'push'; index: number; char: string; closer: string; depth: number }
  | { kind: 'pop-match'; anchor: 'pop-match'; index: number; char: string; opener: string; openerIndex: number; depth: number }
  | { kind: 'mismatch'; anchor: 'mismatch'; index: number; char: string; top: string; topIndex: number; expected: string }
  | { kind: 'unmatched-close'; anchor: 'empty-close'; index: number; char: string }
  | { kind: 'leftover'; anchor: 'leftover'; count: number; top: string; topIndex: number }
  | { kind: 'valid'; anchor: 'return-valid'; n: number };

export const adapter = defineAdapter<BracketInput, State, Ev, boolean>({
  id: 'bracket-match-v1',
  version: '1.0.0',
  scene: 'array-stack',
  events: {
    present: { anchor: 'signature', fields: ['n'] },
    initialize: { anchor: 'initialize', fields: [] },
    push: { anchor: 'push', fields: ['index', 'char', 'closer', 'depth'] },
    'pop-match': { anchor: 'pop-match', fields: ['index', 'char', 'opener', 'openerIndex', 'depth'] },
    mismatch: { anchor: 'mismatch', fields: ['index', 'char', 'top', 'topIndex', 'expected'] },
    'unmatched-close': { anchor: 'empty-close', fields: ['index', 'char'] },
    leftover: { anchor: 'leftover', fields: ['count', 'top', 'topIndex'] },
    valid: { anchor: 'return-valid', fields: ['n'] },
  },
  inputFields: [
    {
      name: 'log',
      label: 'Compartment log',
      kind: 'text',
      help: 'Up to 16 symbols, using only ( ) [ ] { } with no spaces.',
      maxLength: 16,
    },
  ],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const log = readText(
      obj.log,
      'log',
      'Compartment log',
      { maxLength: 16, allowed: /^[()[\]{}]$/, allowedText: 'Use only ( ) [ ] { } with no spaces.' },
      errors,
    );
    return result(log === null ? null : { log }, errors);
  },

  trace({ log }) {
    const t = createTracer<State, Ev>('bracket-match-v1', '1.0.0');
    const s: State = { cursor: null, stack: [], matched: [], failedAt: null, result: null };
    t.emit(s, { kind: 'present', anchor: 'signature', n: log.length });
    t.emit(s, { kind: 'initialize', anchor: 'initialize' });
    for (let i = 0; i < log.length; i++) {
      const ch = log[i]!;
      s.cursor = i;
      const opener = OPEN_FOR[ch];
      if (opener === undefined) {
        s.stack = [...s.stack, { id: `s${i}`, char: ch, index: i }];
        t.write();
        t.emit(s, { kind: 'push', anchor: 'push', index: i, char: ch, closer: CLOSE_FOR[ch]!, depth: s.stack.length });
        continue;
      }
      const top = s.stack[s.stack.length - 1];
      if (!top) {
        s.failedAt = i;
        s.result = false;
        t.emit(s, { kind: 'unmatched-close', anchor: 'empty-close', index: i, char: ch });
        return t.finish(false);
      }
      t.compare();
      if (top.char !== opener) {
        s.failedAt = i;
        s.result = false;
        t.emit(s, { kind: 'mismatch', anchor: 'mismatch', index: i, char: ch, top: top.char, topIndex: top.index, expected: CLOSE_FOR[top.char]! });
        return t.finish(false);
      }
      s.stack = s.stack.slice(0, -1);
      s.matched = [...s.matched, top.index, i];
      t.write();
      t.emit(s, { kind: 'pop-match', anchor: 'pop-match', index: i, char: ch, opener: top.char, openerIndex: top.index, depth: s.stack.length });
    }
    s.cursor = null;
    const top = s.stack[s.stack.length - 1];
    if (top) {
      s.result = false;
      t.emit(s, { kind: 'leftover', anchor: 'leftover', count: s.stack.length, top: top.char, topIndex: top.index });
      return t.finish(false);
    }
    s.result = true;
    t.emit(s, { kind: 'valid', anchor: 'return-valid', n: log.length });
    return t.finish(true);
  },

  view(frame, { input, frames }) {
    const { log } = input;
    const st = frame.state;
    const ev = frame.event;
    const inStack = new Set(st.stack.map((e) => e.index));
    const matched = new Set(st.matched);
    const cells: ArrayCell[] = [...log].map((ch, i) => {
      let state: CellState = 'idle';
      if (i === st.failedAt) state = 'danger';
      else if (matched.has(i)) state = 'success';
      else if (i === st.cursor) state = 'comparison';
      else if (inStack.has(i)) state = 'primary';
      else if (st.cursor !== null && i > st.cursor) state = 'idle';
      return { id: `c${i}`, label: ch, sub: String(i), state };
    });
    const capacity = Math.max(1, ...frames.map((f) => (f.state as State).stack.length));
    const topIndex = st.stack.length - 1;
    const items: StackItem[] = st.stack.map((e, k) => {
      let state: CellState = 'primary';
      if (k === topIndex && (ev.kind === 'mismatch' || ev.kind === 'leftover')) state = 'danger';
      else if (k === topIndex && ev.kind === 'push') state = 'entering';
      return { id: e.id, label: e.char, sub: `from position ${e.index}`, state };
    });
    const top = st.stack[topIndex];
    return {
      scene: {
        arrays: [
          {
            id: 'log',
            label: 'log',
            cells,
            pointers: st.cursor === null ? [] : [{ id: 'i', label: 'i', index: st.cursor, tone: 'comparison', side: 'above' }],
            bands: [],
          },
        ],
        stack: { label: 'stack (top at the top)', items, capacity, emptyText: 'empty' },
        legend: [
          { label: 'Reading now', swatch: 'comparison' },
          { label: 'Waiting on the stack', swatch: 'primary' },
          { label: 'Matched', swatch: 'success' },
          { label: 'Problem', swatch: 'danger' },
        ],
      },
      variables: [
        { name: 'i', value: st.cursor === null ? '—' : String(st.cursor) },
        { name: 'symbol', value: st.cursor === null ? '—' : log[st.cursor]! },
        { name: 'top', value: top ? top.char : 'empty' },
        { name: 'stack size', value: String(st.stack.length) },
        { name: 'result', value: st.result === null ? '…' : st.result ? 'True' : 'False' },
      ],
      facts: [{ name: 'symbols', value: String(log.length) }],
      summary:
        `Log ${log || '(empty)'}.` +
        (st.cursor !== null ? ` Reading position ${st.cursor}, ${log[st.cursor]}.` : '') +
        ` Stack from bottom to top: ${st.stack.length ? st.stack.map((e) => e.char).join(' ') : 'empty'}.` +
        (st.result === null ? '' : st.result ? ' Every compartment matched.' : ' Not matched.'),
    };
  },

  formatOutput: (o) => ((o as boolean) ? 'True' : 'False'),
  toRaw: (i) => ({ log: (i as BracketInput).log }),
});
