import type { Solver } from './index';

type N = number[];

export const STRUCTURE_SOLVERS: Record<string, Solver> = {
  'group-anagrams': ({ words }) => {
    const groups = new Map<string, string[]>();
    for (const w of words as string[]) {
      const key = [...w].sort().join('');
      groups.set(key, [...(groups.get(key) ?? []), w]);
    }
    return [...groups.values()];
  },

  'longest-consecutive': ({ nums }) => {
    const set = new Set(nums as N);
    let best = 0;
    for (const x of set) {
      let len = 1;
      while (set.has(x + len)) len++;
      best = Math.max(best, len);
    }
    return best;
  },

  'min-stack': ({ ops, args }) => {
    const stack: N = [];
    return (ops as string[]).map((op, i) => {
      const a = (args as N[])[i]!;
      if (op === 'push') {
        stack.push(a[0]!);
        return null;
      }
      if (op === 'pop') {
        stack.pop();
        return null;
      }
      if (op === 'top') return stack[stack.length - 1];
      return Math.min(...stack);
    });
  },

  'daily-temperatures': ({ temps }) => {
    const t = temps as N;
    return t.map((x, i) => {
      for (let j = i + 1; j < t.length; j++) if (t[j]! > x) return j - i;
      return 0;
    });
  },

  'kth-largest': ({ nums, k }) => [...(nums as N)].sort((a, b) => b - a)[(k as number) - 1],

  'top-k-frequent': ({ nums, k }) => {
    const c = new Map<number, number>();
    for (const x of nums as N) c.set(x, (c.get(x) ?? 0) + 1);
    return [...c.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, k as number)
      .map(([x]) => x);
  },

  'merge-k-sorted': ({ lists }) => (lists as N[]).flat().sort((a, b) => a - b),

  'reverse-list': ({ head }) => [...(head as N)].reverse(),

  'list-middle': ({ head }) => {
    const a = head as N;
    return a.slice(Math.floor(a.length / 2));
  },

  'list-cycle': ({ pos }) => (pos as number) >= 0,
};
