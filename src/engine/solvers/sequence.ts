import type { Solver } from './index';

type N = number[];

export const SEQUENCE_SOLVERS: Record<string, Solver> = {
  'move-zeroes': ({ nums }) => {
    const a = nums as N;
    const kept = a.filter((x) => x !== 0);
    return [...kept, ...a.filter((x) => x === 0)];
  },

  'merge-sorted': ({ first, second }) => {
    const a = first as N;
    const b = second as N;
    const out: N = [];
    let i = 0;
    let j = 0;
    while (i < a.length || j < b.length) {
      if (j >= b.length || (i < a.length && a[i]! <= b[j]!)) out.push(a[i++]!);
      else out.push(b[j++]!);
    }
    return out;
  },

  'three-sum': ({ nums }) => {
    const a = [...(nums as N)].sort((x, y) => x - y);
    const seen = new Set<string>();
    const out: N[] = [];
    for (let i = 0; i < a.length; i++)
      for (let j = i + 1; j < a.length; j++)
        for (let k = j + 1; k < a.length; k++)
          if (a[i]! + a[j]! + a[k]! === 0) {
            const key = `${a[i]},${a[j]},${a[k]}`;
            if (!seen.has(key)) {
              seen.add(key);
              out.push([a[i]!, a[j]!, a[k]!]);
            }
          }
    return out;
  },

  'longest-palindrome': ({ s }) => {
    const t = s as string;
    let best = '';
    for (let i = 0; i < t.length; i++)
      for (let j = i; j < t.length; j++) {
        const sub = t.slice(i, j + 1);
        if (sub.length > best.length && sub === [...sub].reverse().join('')) best = sub;
      }
    return best;
  },

  'remove-nth': ({ head, n }) => {
    const a = [...(head as N)];
    a.splice(a.length - (n as number), 1);
    return a;
  },

  'trapping-rain': ({ heights }) => {
    const h = heights as N;
    let water = 0;
    for (let i = 0; i < h.length; i++) {
      const left = Math.max(...h.slice(0, i + 1));
      const right = Math.max(...h.slice(i));
      water += Math.min(left, right) - h[i]!;
    }
    return water;
  },

  'min-window': ({ s, t }) => {
    const str = s as string;
    const need = t as string;
    const covers = (w: string) => {
      const c = new Map<string, number>();
      for (const ch of w) c.set(ch, (c.get(ch) ?? 0) + 1);
      for (const ch of need) {
        const v = c.get(ch) ?? 0;
        if (v === 0) return false;
        c.set(ch, v - 1);
      }
      return true;
    };
    let best = '';
    for (let i = 0; i < str.length; i++)
      for (let j = i + 1; j <= str.length; j++) {
        const w = str.slice(i, j);
        if ((best === '' || w.length < best.length) && covers(w)) best = w;
      }
    return best;
  },

  'window-max': ({ nums, k }) => {
    const a = nums as N;
    const size = k as number;
    const out: N = [];
    for (let i = 0; i + size <= a.length; i++) out.push(Math.max(...a.slice(i, i + size)));
    return out;
  },

  'product-except-self': ({ nums }) => {
    const a = nums as N;
    return a.map((_, i) => a.reduce((p, x, j) => (j === i ? p : p * x), 1));
  },

  'subarray-sum-count': ({ nums, k }) => {
    const a = nums as N;
    let count = 0;
    for (let i = 0; i < a.length; i++) {
      let sum = 0;
      for (let j = i; j < a.length; j++) {
        sum += a[j]!;
        if (sum === k) count++;
      }
    }
    return count;
  },

  'rotated-min': ({ nums }) => Math.min(...(nums as N)),

  'rotated-search': ({ nums, target }) => (nums as N).indexOf(target as number),

  'merge-intervals': ({ intervals }) => {
    const iv = [...(intervals as N[])].map((x) => [...x]).sort((a, b) => a[0]! - b[0]!);
    const out: N[] = [];
    for (const cur of iv) {
      const last = out[out.length - 1];
      if (last && cur[0]! <= last[1]!) last[1] = Math.max(last[1]!, cur[1]!);
      else out.push(cur);
    }
    return out;
  },

  'insert-interval': ({ intervals, newInterval }) => {
    const all = [...(intervals as N[]), newInterval as N].map((x) => [...x]).sort((a, b) => a[0]! - b[0]!);
    const out: N[] = [];
    for (const cur of all) {
      const last = out[out.length - 1];
      if (last && cur[0]! <= last[1]!) last[1] = Math.max(last[1]!, cur[1]!);
      else out.push(cur);
    }
    return out;
  },

  'rotate-matrix': ({ matrix }) => {
    const m = matrix as N[];
    const n = m.length;
    return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => m[n - 1 - c]![r]!));
  },
};
