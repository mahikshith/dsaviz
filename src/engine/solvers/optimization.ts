import type { Solver } from './index';

type N = number[];

export const OPTIMIZATION_SOLVERS: Record<string, Solver> = {
  'jump-game': ({ nums }) => {
    const a = nums as N;
    const can = Array(a.length).fill(false) as boolean[];
    can[0] = true;
    for (let i = 0; i < a.length; i++) if (can[i]) for (let j = 1; j <= a[i]! && i + j < a.length; j++) can[i + j] = true;
    return can[a.length - 1];
  },

  'house-robber': ({ money }) => {
    const a = money as N;
    let best = 0;
    for (let mask = 0; mask < 1 << a.length; mask++) {
      if (mask & (mask >> 1)) continue;
      best = Math.max(best, a.reduce((s, x, i) => (mask & (1 << i) ? s + x : s), 0));
    }
    return best;
  },

  'max-subarray': ({ nums }) => {
    const a = nums as N;
    let best = -Infinity;
    for (let i = 0; i < a.length; i++) {
      let sum = 0;
      for (let j = i; j < a.length; j++) {
        sum += a[j]!;
        best = Math.max(best, sum);
      }
    }
    return best;
  },

  'coin-change': ({ coins, amount }) => {
    const target = amount as number;
    const best = Array(target + 1).fill(Infinity) as number[];
    best[0] = 0;
    for (let a = 1; a <= target; a++) for (const c of coins as N) if (c <= a) best[a] = Math.min(best[a]!, best[a - c]! + 1);
    return best[target] === Infinity ? -1 : best[target];
  },

  lis: ({ nums }) => {
    const a = nums as N;
    let best = 0;
    for (let mask = 1; mask < 1 << a.length; mask++) {
      const picked = a.filter((_, i) => mask & (1 << i));
      if (picked.every((x, i) => i === 0 || x > picked[i - 1]!)) best = Math.max(best, picked.length);
    }
    return best;
  },

  'word-break': ({ s, words }) => {
    const str = s as string;
    const dict = words as string[];
    const can = (from: number): boolean => from === str.length || dict.some((w) => str.startsWith(w, from) && can(from + w.length));
    return can(0);
  },

  'unique-paths': ({ rows, cols }) => {
    const count = (r: number, c: number): number => (r === 1 || c === 1 ? 1 : count(r - 1, c) + count(r, c - 1));
    return count(rows as number, cols as number);
  },
};
