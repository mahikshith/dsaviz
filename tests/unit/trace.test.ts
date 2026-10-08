/**
 * Teaching-trace correctness, separate from output correctness: the answer can
 * be right while the frames that explain it are wrong.
 */
import { describe, expect, it } from 'vitest';
import { ADAPTERS } from '@/engine/registry/all';
import { adapterAnchors, type RuntimeAdapter } from '@/engine/contracts/trace';
import { prepareRun } from '@/features/player/prepare';

const SAMPLES: Record<string, unknown[]> = {
  'sorted-target-pair-v1': [
    { prices: [2, 4, 7, 11, 15], target: 18 },
    { prices: [1, 3, 5, 9], target: 7 },
    { prices: [], target: 0 },
    { prices: [4], target: 8 },
  ],
  'pair-enumeration-v1': [
    { prices: [2, 4, 7, 11, 15], target: 18 },
    { prices: [1, 3], target: 9 },
  ],
  'fixed-window-max-v1': [
    { visitors: [4, 2, 7, 1, 8, 3, 5], k: 3 },
    { visitors: [5], k: 1 },
  ],
  'prefix-window-max-v1': [
    { visitors: [4, 2, 7, 1, 8, 3, 5], k: 3 },
    { visitors: [5, 0, 6], k: 3 },
  ],
  'bracket-match-v1': [{ log: '{[()]()}' }, { log: '([)]' }, { log: '(()' }, { log: '())' }, { log: '' }],
  'bfs-shortest-path-v1': [
    {
      edges: [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['C', 'E'], ['D', 'F'], ['E', 'G'], ['F', 'H'], ['G', 'H']],
      start: 'A',
      goal: 'H',
    },
    { edges: [['A', 'B'], ['D', 'E']], start: 'A', goal: 'E' },
    { edges: [['A', 'B']], start: 'B', goal: 'B' },
  ],
  'palindrome-pointers-v1': [{ text: 'Top spot' }, { text: 'Top shop' }, { text: '' }, { text: '!?' }],
  'hash-pair-v1': [{ nums: [4, 9, 2, 7, 5], target: 12 }, { nums: [1, 2], target: 9 }],
  'set-duplicate-v1': [{ nums: [3, 8, 4, 6, 8] }, { nums: [] }],
  'anagram-count-v1': [{ s: 'listen', t: 'silent' }, { s: 'rat', t: 'car' }, { s: 'ab', t: 'abc' }],
  'unique-window-v1': [{ s: 'abcabcbb' }, { s: 'abba' }, { s: '' }],
  'replacement-window-v1': [{ s: 'AABABBA', k: 1 }, { s: 'AAAA', k: 0 }],
  'container-area-v1': [{ heights: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, { heights: [1, 1] }],
  'stock-profit-v1': [{ prices: [7, 1, 5, 3, 6, 4] }, { prices: [7, 6, 4, 3, 1] }],
  'binary-search-v1': [{ nums: [3, 8, 12, 17, 21, 30, 34], target: 21 }, { nums: [3, 8], target: 5 }, { nums: [], target: 1 }],
  'climbing-stairs-v1': [{ n: 5 }, { n: 1 }],
};

function trace(adapter: RuntimeAdapter, raw: unknown) {
  const p = adapter.parseInput(raw);
  if (!p.ok) throw new Error(JSON.stringify(p.errors));
  return { input: p.value, result: adapter.trace(p.value) };
}

describe.each(Object.keys(ADAPTERS))('%s trace', (id) => {
  const adapter = ADAPTERS[id as keyof typeof ADAPTERS];
  const samples = SAMPLES[id]!;

  it('has sample inputs in this test', () => expect(samples.length).toBeGreaterThan(0));

  it.each(samples.map((s, i) => [i, s] as const))('sample %i: starts by presenting the input and ends on a terminal event', (_, raw) => {
    const { result } = trace(adapter, raw);
    const frames = result.frames;
    expect(frames[0]!.event.kind).toBe('present');
    const terminal = new Set(['found', 'not-found', 'done', 'valid', 'mismatch', 'unmatched-close', 'leftover', 'palindrome', 'same-node', 'duplicate', 'all-unique', 'length-mismatch', 'nonzero', 'all-zero']);
    expect(terminal.has(frames[frames.length - 1]!.event.kind)).toBe(true);
  });

  it.each(samples.map((s, i) => [i, s] as const))('sample %i: ids are unique and sequential, events are declared, anchors are known', (_, raw) => {
    const { result } = trace(adapter, raw);
    const anchors = adapterAnchors(adapter);
    result.frames.forEach((f, i) => {
      expect(f.index).toBe(i);
      expect(f.id).toBe(`${i}-${f.event.kind}`);
      const spec = adapter.events[f.event.kind];
      expect(spec, `undeclared event ${f.event.kind}`).toBeDefined();
      expect(f.event.anchor).toBe(spec!.anchor);
      expect(anchors).toContain(f.event.anchor);
      if (spec!.variants) expect(spec!.variants).toContain(f.event.variant);
      for (const field of spec!.fields) expect(f.event as Record<string, unknown>).toHaveProperty(field);
    });
  });

  it.each(samples.map((s, i) => [i, s] as const))('sample %i: counters never decrease', (_, raw) => {
    const { result } = trace(adapter, raw);
    for (let i = 1; i < result.frames.length; i++) {
      expect(result.frames[i]!.counters.comparisons).toBeGreaterThanOrEqual(result.frames[i - 1]!.counters.comparisons);
      expect(result.frames[i]!.counters.writes).toBeGreaterThanOrEqual(result.frames[i - 1]!.counters.writes);
    }
  });

  it.each(samples.map((s, i) => [i, s] as const))('sample %i: history is immutable and frames do not share state', (_, raw) => {
    const { result } = trace(adapter, raw);
    const snapshot = JSON.stringify(result.frames);
    for (const f of result.frames) {
      expect(Object.isFrozen(f)).toBe(true);
      expect(Object.isFrozen(f.state)).toBe(true);
      expect(() => {
        (f.state as Record<string, unknown>).tampered = 1;
      }).toThrow();
    }
    for (let i = 1; i < result.frames.length; i++) expect(result.frames[i]!.state).not.toBe(result.frames[i - 1]!.state);
    expect(JSON.stringify(result.frames)).toBe(snapshot);
  });

  it.each(samples.map((s, i) => [i, s] as const))('sample %i: is deterministic and every frame has a view', (_, raw) => {
    const a = trace(adapter, raw);
    const b = trace(adapter, raw);
    expect(JSON.stringify(a.result)).toBe(JSON.stringify(b.result));
    const run = prepareRun(adapter, a.input, { approachId: 'x', exampleId: 'y' });
    expect(run.views).toHaveLength(run.frames.length);
    for (const v of run.views) {
      expect(v.summary.length).toBeGreaterThan(0);
      expect(v.scene.legend.length).toBeGreaterThan(0);
    }
  });

  it.each(samples.map((s, i) => [i, s] as const))('sample %i: pointers and bands stay inside their rows', (_, raw) => {
    const { input } = trace(adapter, raw);
    const run = prepareRun(adapter, input, { approachId: 'x', exampleId: 'y' });
    for (const v of run.views) {
      for (const row of v.scene.arrays ?? []) {
        for (const p of row.pointers) {
          expect(p.index).toBeGreaterThanOrEqual(0);
          expect(p.index).toBeLessThan(row.cells.length);
        }
        for (const b of row.bands) {
          expect(b.from).toBeGreaterThanOrEqual(0);
          expect(b.to).toBeLessThan(row.cells.length);
          expect(b.from).toBeLessThanOrEqual(b.to);
        }
      }
    }
  });
});

describe('event and state consistency', () => {
  it('opposite pointers: each move updates exactly the pointer it names, by one', () => {
    const { result } = trace(ADAPTERS['sorted-target-pair-v1'], { prices: [2, 4, 7, 11, 15], target: 18 });
    for (let i = 1; i < result.frames.length; i++) {
      const prev = result.frames[i - 1]!.state as { left: number; right: number };
      const f = result.frames[i]!;
      const s = f.state as { left: number; right: number };
      if (f.event.kind === 'move-left') {
        expect(s.left).toBe(prev.left + 1);
        expect(s.right).toBe(prev.right);
      } else if (f.event.kind === 'move-right') {
        expect(s.right).toBe(prev.right - 1);
        expect(s.left).toBe(prev.left);
      } else if (i > 1) {
        expect([s.left, s.right]).toEqual([prev.left, prev.right]);
      }
    }
  });

  it('opposite pointers: the brief’s ten frames for the voucher example', () => {
    const { result } = trace(ADAPTERS['sorted-target-pair-v1'], { prices: [2, 4, 7, 11, 15], target: 18 });
    expect(result.frames.map((f) => f.event.kind)).toEqual([
      'present',
      'initialize',
      'compare-sum',
      'move-left',
      'compare-sum',
      'move-right',
      'compare-sum',
      'move-left',
      'compare-sum',
      'found',
    ]);
    expect(result.frames.filter((f) => f.event.kind === 'compare-sum').map((f) => (f.event as unknown as { sum: number }).sum)).toEqual([
      17, 19, 15, 18,
    ]);
  });

  it('fixed window: window_sum always equals the sum of the current window', () => {
    const visitors = [4, 2, 7, 1, 8, 3, 5];
    const { result } = trace(ADAPTERS['fixed-window-max-v1'], { visitors, k: 3 });
    for (const f of result.frames) {
      const s = f.state as { start: number | null; windowSum: number | null };
      if (s.start !== null) expect(s.windowSum).toBe(visitors.slice(s.start, s.start + 3).reduce((a, b) => a + b, 0));
    }
  });

  it('bracket matching: the stack only ever holds opening symbols', () => {
    const { result } = trace(ADAPTERS['bracket-match-v1'], { log: '{[()]()}' });
    for (const f of result.frames) for (const e of (f.state as { stack: { char: string }[] }).stack) expect('([{').toContain(e.char);
  });

  it('BFS: queued distances never decrease from front to back', () => {
    const { result } = trace(ADAPTERS['bfs-shortest-path-v1'], SAMPLES['bfs-shortest-path-v1']![0]);
    for (const f of result.frames) {
      const s = f.state as { queue: string[]; dist: Record<string, number | null> };
      const ds = s.queue.map((v) => s.dist[v]!);
      for (let i = 1; i < ds.length; i++) expect(ds[i]).toBeGreaterThanOrEqual(ds[i - 1]!);
      if (ds.length) expect(ds[ds.length - 1]! - ds[0]!).toBeLessThanOrEqual(1);
    }
  });
});
