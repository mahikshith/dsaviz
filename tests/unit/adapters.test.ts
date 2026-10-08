/**
 * Algorithm correctness: every adapter is compared with a simple, obviously
 * correct baseline on small exhaustive or generated inputs.
 */
import { describe, expect, it } from 'vitest';
import { ADAPTERS } from '@/engine/registry/all';
import { checkOutput } from '@/engine/checkers';
import type { RuntimeAdapter } from '@/engine/contracts/trace';

function run(adapter: RuntimeAdapter, raw: unknown) {
  const parsed = adapter.parseInput(raw);
  if (!parsed.ok) throw new Error(JSON.stringify(parsed.errors));
  return adapter.trace(parsed.value).output;
}

/** Deterministic pseudo-random numbers so failures are reproducible. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function* sortedArrays(maxLen: number, maxValue: number): Generator<number[]> {
  function* rec(prefix: number[], min: number): Generator<number[]> {
    yield prefix;
    if (prefix.length === maxLen) return;
    for (let v = min; v <= maxValue; v++) yield* rec([...prefix, v], v);
  }
  yield* rec([], 0);
}

const pairExists = (a: number[], t: number) => a.some((x, i) => a.some((y, j) => i < j && x + y === t));

describe('target pair adapters', () => {
  for (const id of ['sorted-target-pair-v1', 'pair-enumeration-v1'] as const) {
    it(`${id} matches brute force on every sorted array up to length 5 (values 0–5)`, () => {
      let cases = 0;
      for (const prices of sortedArrays(5, 5)) {
        for (let target = 0; target <= 11; target++) {
          const out = run(ADAPTERS[id], { prices, target });
          const expected = pairExists(prices, target) ? [0, 0] : null;
          // Any valid pair is acceptable, so check semantically.
          if (expected === null) expect(out).toBeNull();
          else expect(checkOutput('target-pair', { prices, target }, out, expected)).toEqual({ ok: true });
          cases++;
        }
      }
      expect(cases).toBeGreaterThan(5000);
    });
  }

  it('opposite pointers rejects unsorted prices with an actionable message instead of sorting', () => {
    const r = ADAPTERS['sorted-target-pair-v1'].parseInput({ prices: [2, 7, 1, 3], target: 9 });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors[0]!.field).toBe('prices');
      expect(r.errors[0]!.message).toMatch(/lowest to highest/);
    }
  });

  it('check every pair accepts unsorted prices', () => {
    expect(run(ADAPTERS['pair-enumeration-v1'], { prices: [2, 7, 1, 3], target: 9 })).toEqual([0, 1]);
  });

  it('handles empty, single, duplicate and half-target cases', () => {
    const a = ADAPTERS['sorted-target-pair-v1'];
    expect(run(a, { prices: [], target: 0 })).toBeNull();
    expect(run(a, { prices: [9], target: 18 })).toBeNull();
    expect(run(a, { prices: [3, 3, 6, 8], target: 6 })).toEqual([0, 1]);
    expect(run(a, { prices: [0, 0], target: 0 })).toEqual([0, 1]);
  });

  it('rejects out-of-range values', () => {
    const a = ADAPTERS['sorted-target-pair-v1'];
    expect(a.parseInput({ prices: [1, 2, 1000], target: 3 }).ok).toBe(false);
    expect(a.parseInput({ prices: [1, 2], target: -1 }).ok).toBe(false);
    expect(a.parseInput({ prices: [1, 2.5], target: 3 }).ok).toBe(false);
    expect(a.parseInput({ prices: new Array(13).fill(1), target: 2 }).ok).toBe(false);
  });
});

describe('window adapters', () => {
  const naive = (v: number[], k: number) => {
    let best = -Infinity;
    let start = 0;
    for (let s = 0; s + k <= v.length; s++) {
      const t = v.slice(s, s + k).reduce((a, b) => a + b, 0);
      if (t > best) {
        best = t;
        start = s;
      }
    }
    return { start, total: best };
  };
  for (const id of ['fixed-window-max-v1', 'prefix-window-max-v1'] as const) {
    it(`${id} matches recomputing every window (200 generated inputs, ties included)`, () => {
      const r = rng(7);
      for (let c = 0; c < 200; c++) {
        const n = 1 + Math.floor(r() * 10);
        const visitors = Array.from({ length: n }, () => Math.floor(r() * 4));
        const k = 1 + Math.floor(r() * n);
        expect(run(ADAPTERS[id], { visitors, k })).toEqual(naive(visitors, k));
      }
    });
  }
  it('covers k = 1, k = n and rejects invalid k', () => {
    const a = ADAPTERS['fixed-window-max-v1'];
    expect(run(a, { visitors: [3, 9, 9, 2], k: 1 })).toEqual({ start: 1, total: 9 });
    expect(run(a, { visitors: [5, 0, 6], k: 3 })).toEqual({ start: 0, total: 11 });
    expect(a.parseInput({ visitors: [1, 2], k: 3 }).ok).toBe(false);
    expect(a.parseInput({ visitors: [1, 2], k: 0 }).ok).toBe(false);
  });
});

describe('bracket matching', () => {
  const baseline = (s: string) => {
    let prev = '';
    while (prev !== s) {
      prev = s;
      s = s.replace(/\(\)|\[\]|\{\}/g, '');
    }
    return s.length === 0;
  };
  it('matches pair-deletion on every string of length ≤ 5 over ()[]{}', { timeout: 60_000 }, () => {
    const symbols = ['(', ')', '[', ']', '{', '}'];
    let strings = [''];
    let count = 0;
    for (let len = 0; len <= 5; len++) {
      for (const s of strings) {
        expect(run(ADAPTERS['bracket-match-v1'], { log: s })).toBe(baseline(s));
        count++;
      }
      strings = strings.flatMap((s) => symbols.map((c) => s + c));
    }
    expect(count).toBe(9331);
  });
  it('rejects other characters with the position', () => {
    const r = ADAPTERS['bracket-match-v1'].parseInput({ log: '(a)' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors[0]!.message).toMatch(/position 1/);
  });
});

describe('breadth-first search', () => {
  const baselineDistance = (edges: [string, string][], start: string, goal: string) => {
    // Bellman-Ford style relaxation with unit weights: simple and independent of BFS.
    const nodes = [...new Set(edges.flat())];
    const d: Record<string, number> = Object.fromEntries(nodes.map((v) => [v, Infinity]));
    d[start] = 0;
    for (let i = 0; i < nodes.length; i++)
      for (const [a, b] of edges) {
        d[b] = Math.min(d[b]!, d[a]! + 1);
        d[a] = Math.min(d[a]!, d[b]! + 1);
      }
    return d[goal] === Infinity ? null : d[goal]!;
  };
  it('finds a valid shortest route on 300 random graphs, including cycles, duplicates and unreachable goals', () => {
    const r = rng(11);
    const letters = 'ABCDEFGH';
    for (let c = 0; c < 300; c++) {
      const n = 2 + Math.floor(r() * 6);
      const m = 1 + Math.floor(r() * 10);
      const edges: [string, string][] = [];
      for (let i = 0; i < m; i++) {
        const a = letters[Math.floor(r() * n)]!;
        let b = letters[Math.floor(r() * n)]!;
        if (a === b) b = letters[(letters.indexOf(a) + 1) % n]!;
        edges.push([a, b]);
      }
      const nodes = [...new Set(edges.flat())];
      const start = nodes[Math.floor(r() * nodes.length)]!;
      const goal = nodes[Math.floor(r() * nodes.length)]!;
      const out = run(ADAPTERS['bfs-shortest-path-v1'], { edges, start, goal });
      const dist = baselineDistance(edges, start, goal);
      const expected = dist === null ? null : { distance: dist };
      expect(checkOutput('shortest-route', { edges, start, goal }, out, expected)).toEqual({ ok: true });
    }
  });
  it('rejects self-loops and unknown corners', () => {
    const a = ADAPTERS['bfs-shortest-path-v1'];
    expect(a.parseInput({ edges: [['A', 'A']], start: 'A', goal: 'A' }).ok).toBe(false);
    expect(a.parseInput({ edges: [['A', 'B']], start: 'A', goal: 'Z' }).ok).toBe(false);
  });
});

describe('palindrome pointers', () => {
  const baseline = (t: string) => {
    const clean = t.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === [...clean].reverse().join('');
  };
  it('matches clean-and-reverse on 400 generated strings', () => {
    const r = rng(3);
    const alphabet = 'aAbB1 ,!';
    for (let c = 0; c < 400; c++) {
      const len = Math.floor(r() * 9);
      let text = Array.from({ length: len }, () => alphabet[Math.floor(r() * alphabet.length)]).join('');
      if (r() < 0.4) text = text + [...text].reverse().join('');
      text = text.slice(0, 16);
      expect(run(ADAPTERS['palindrome-pointers-v1'], { text })).toBe(baseline(text));
    }
  });
});
