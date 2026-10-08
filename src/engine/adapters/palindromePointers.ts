/**
 * Opposite pointers on a string: does it read the same in both directions when
 * only letters and digits count and capitals are ignored?
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, CellState, Pointer } from '@/visuals/scenes/model';
import { readObject, readText, result } from './validate';

export type PalindromeInput = { text: string };

const isAlnum = (c: string) => /^[A-Za-z0-9]$/.test(c);
const shown = (c: string) => (c === ' ' ? 'a space' : `“${c}”`);

type State = {
  left: number | null;
  right: number | null;
  matched: number[];
  skipped: number[];
  mismatch: [number, number] | null;
  comparing: boolean;
  result: boolean | null;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number; text: string }
  | { kind: 'initialize'; anchor: 'initialize'; left: number; right: number }
  | { kind: 'skip-left'; anchor: 'skip-left'; index: number; char: string }
  | { kind: 'skip-right'; anchor: 'skip-right'; index: number; char: string }
  | { kind: 'match'; anchor: 'compare'; left: number; right: number; leftChar: string; rightChar: string }
  | { kind: 'step-inward'; anchor: 'step-inward'; left: number; right: number }
  | { kind: 'mismatch'; anchor: 'mismatch'; left: number; right: number; leftChar: string; rightChar: string }
  | { kind: 'palindrome'; anchor: 'return-true'; pairs: number };

export const adapter = defineAdapter<PalindromeInput, State, Ev, boolean>({
  id: 'palindrome-pointers-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n', 'text'] },
    initialize: { anchor: 'initialize', fields: ['left', 'right'] },
    'skip-left': { anchor: 'skip-left', fields: ['index', 'char'] },
    'skip-right': { anchor: 'skip-right', fields: ['index', 'char'] },
    match: { anchor: 'compare', fields: ['left', 'right', 'leftChar', 'rightChar'] },
    'step-inward': { anchor: 'step-inward', fields: ['left', 'right'] },
    mismatch: { anchor: 'mismatch', fields: ['left', 'right', 'leftChar', 'rightChar'] },
    palindrome: { anchor: 'return-true', fields: ['pairs'] },
  },
  inputFields: [
    {
      name: 'text',
      label: 'Slogan',
      kind: 'text',
      help: 'Up to 16 characters: letters, digits, spaces and simple punctuation.',
      maxLength: 16,
    },
  ],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    const text = readText(
      obj.text,
      'text',
      'Slogan',
      { maxLength: 16, allowed: /^[ -~]$/, allowedText: 'Use plain letters, digits, spaces and punctuation.' },
      errors,
    );
    return result(text === null ? null : { text }, errors);
  },

  trace({ text }) {
    const t = createTracer<State, Ev>('palindrome-pointers-v1', '1.0.0');
    const s: State = { left: null, right: null, matched: [], skipped: [], mismatch: null, comparing: false, result: null };
    t.emit(s, { kind: 'present', anchor: 'signature', n: text.length, text });
    let left = 0;
    let right = text.length - 1;
    s.left = left;
    s.right = right;
    t.emit(s, { kind: 'initialize', anchor: 'initialize', left, right });
    let pairs = 0;
    while (left < right) {
      const a = text[left]!;
      const b = text[right]!;
      s.comparing = false;
      if (!isAlnum(a)) {
        s.skipped = [...s.skipped, left];
        t.emit(s, { kind: 'skip-left', anchor: 'skip-left', index: left, char: shown(a) });
        left += 1;
        s.left = left;
        continue;
      }
      if (!isAlnum(b)) {
        s.skipped = [...s.skipped, right];
        t.emit(s, { kind: 'skip-right', anchor: 'skip-right', index: right, char: shown(b) });
        right -= 1;
        s.right = right;
        continue;
      }
      t.compare();
      s.comparing = true;
      if (a.toLowerCase() !== b.toLowerCase()) {
        s.mismatch = [left, right];
        s.result = false;
        t.emit(s, { kind: 'mismatch', anchor: 'mismatch', left, right, leftChar: shown(a), rightChar: shown(b) });
        return t.finish(false);
      }
      pairs += 1;
      s.matched = [...s.matched, left, right];
      t.emit(s, { kind: 'match', anchor: 'compare', left, right, leftChar: shown(a), rightChar: shown(b) });
      left += 1;
      right -= 1;
      s.left = left;
      s.right = right;
      s.comparing = false;
      t.emit(s, { kind: 'step-inward', anchor: 'step-inward', left, right });
    }
    s.result = true;
    t.emit(s, { kind: 'palindrome', anchor: 'return-true', pairs });
    return t.finish(true);
  },

  view(frame, { input }) {
    const { text } = input;
    const st = frame.state;
    const started = frame.event.kind !== 'present';
    const matched = new Set(st.matched);
    const skipped = new Set(st.skipped);
    const cells: ArrayCell[] = [...text].map((ch, i) => {
      let state: CellState = 'idle';
      if (st.mismatch && (i === st.mismatch[0] || i === st.mismatch[1])) state = 'danger';
      else if (matched.has(i)) state = 'success';
      else if (skipped.has(i)) state = 'discarded';
      else if (started && i === st.left && st.left !== null && st.right !== null && st.left <= st.right) state = 'primary';
      else if (started && i === st.right && st.left !== null && st.right !== null && st.left <= st.right) state = 'comparison';
      return { id: `c${i}`, label: ch === ' ' ? '␣' : ch, sub: String(i), state };
    });
    const pointers: Pointer[] = [];
    if (started && st.left !== null && st.right !== null && st.result === null) {
      if (st.left < text.length) pointers.push({ id: 'left', label: 'L · left', index: st.left, tone: 'primary', side: 'above' });
      if (st.right >= 0) pointers.push({ id: 'right', label: 'R · right', index: st.right, tone: 'comparison', side: 'below' });
    }
    return {
      scene: {
        arrays: [{ id: 'text', label: 'text', cells, pointers, bands: [] }],
        legend: [
          { label: 'Left pointer', swatch: 'primary' },
          { label: 'Right pointer', swatch: 'comparison' },
          { label: 'Skipped (not a letter or digit)', swatch: 'discarded' },
          { label: 'Matched pair', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'left', value: started && st.left !== null ? String(st.left) : '—' },
        { name: 'right', value: started && st.right !== null ? String(st.right) : '—' },
        { name: 'pairs matched', value: String(st.matched.length / 2) },
        { name: 'result', value: st.result === null ? '…' : st.result ? 'True' : 'False' },
      ],
      facts: [{ name: 'length', value: String(text.length) }],
      summary:
        `Text “${text}”.` +
        (started && st.left !== null ? ` Left at ${st.left}, right at ${st.right}.` : '') +
        ` ${st.matched.length / 2} pairs matched.` +
        (st.result === null ? '' : st.result ? ' It reads the same both ways.' : ' It does not read the same both ways.'),
    };
  },

  formatOutput: (o) => ((o as boolean) ? 'True' : 'False'),
  toRaw: (i) => ({ text: (i as PalindromeInput).text }),
});
