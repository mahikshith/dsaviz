import type { Solver } from './index';

type N = number[];
type Tree = { val: number; left: Tree | null; right: Tree | null } | null;

/** Builds a binary tree from level order with nulls for missing children. */
export function buildTree(values: (number | null)[]): Tree {
  if (!values.length || values[0] === null || values[0] === undefined) return null;
  const root: NonNullable<Tree> = { val: values[0], left: null, right: null };
  const queue: NonNullable<Tree>[] = [root];
  let i = 1;
  while (queue.length && i < values.length) {
    const node = queue.shift()!;
    for (const side of ['left', 'right'] as const) {
      const v = values[i++];
      if (v !== null && v !== undefined) {
        node[side] = { val: v, left: null, right: null };
        queue.push(node[side]!);
      }
    }
  }
  return root;
}

/** Level order with nulls, trailing nulls removed. */
export function serializeTree(root: Tree): (number | null)[] {
  const out: (number | null)[] = [];
  const queue: Tree[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (!node) {
      out.push(null);
      continue;
    }
    out.push(node.val);
    queue.push(node.left, node.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

const levels = (root: Tree): N[] => {
  const out: N[] = [];
  let level: Tree[] = root ? [root] : [];
  while (level.length) {
    out.push(level.map((n) => n!.val));
    level = level.flatMap((n) => [n!.left, n!.right]).filter((n) => n);
  }
  return out;
};

export const GRAPH_SOLVERS: Record<string, Solver> = {
  'invert-tree': ({ root }) => {
    const flip = (n: Tree): Tree => (n ? { val: n.val, left: flip(n.right), right: flip(n.left) } : null);
    return serializeTree(flip(buildTree(root as (number | null)[])));
  },

  'max-depth': ({ root }) => levels(buildTree(root as (number | null)[])).length,

  'validate-bst': ({ root }) => {
    const order: N = [];
    const walk = (n: Tree) => {
      if (!n) return;
      walk(n.left);
      order.push(n.val);
      walk(n.right);
    };
    walk(buildTree(root as (number | null)[]));
    return order.every((v, i) => i === 0 || v > order[i - 1]!);
  },

  'level-order': ({ root }) => levels(buildTree(root as (number | null)[])),

  'right-side-view': ({ root }) => levels(buildTree(root as (number | null)[])).map((l) => l[l.length - 1]),

  'count-islands': ({ grid }) => {
    const g = (grid as string[]).map((r) => [...r]);
    let count = 0;
    const sink = (r: number, c: number) => {
      if (r < 0 || c < 0 || r >= g.length || c >= g[0]!.length || g[r]![c] !== '1') return;
      g[r]![c] = '0';
      sink(r + 1, c);
      sink(r - 1, c);
      sink(r, c + 1);
      sink(r, c - 1);
    };
    for (let r = 0; r < g.length; r++)
      for (let c = 0; c < g[0]!.length; c++)
        if (g[r]![c] === '1') {
          count++;
          sink(r, c);
        }
    return count;
  },

  'rotting-oranges': ({ grid }) => {
    let g = (grid as N[]).map((r) => [...r]);
    let minutes = 0;
    for (;;) {
      const next = g.map((r) => [...r]);
      let changed = false;
      g.forEach((row, r) =>
        row.forEach((v, c) => {
          if (v !== 1) return;
          const near = [g[r - 1]?.[c], g[r + 1]?.[c], g[r]?.[c - 1], g[r]?.[c + 1]];
          if (near.includes(2)) {
            next[r]![c] = 2;
            changed = true;
          }
        }),
      );
      if (!changed) break;
      g = next;
      minutes++;
    }
    return g.some((r) => r.includes(1)) ? -1 : minutes;
  },

  'clone-graph': ({ adj }) => (adj as N[]).map((list) => [...list]),

  'course-order': ({ numCourses, prerequisites }) => {
    const n = numCourses as number;
    const done = new Set<number>();
    const pre = prerequisites as [number, number][];
    let progress = true;
    while (progress) {
      progress = false;
      for (let c = 0; c < n; c++)
        if (!done.has(c) && pre.every(([a, b]) => a !== c || done.has(b))) {
          done.add(c);
          progress = true;
        }
    }
    return done.size === n;
  },

  subsets: ({ nums }) => {
    const a = nums as N;
    const out: N[] = [];
    for (let mask = 0; mask < 1 << a.length; mask++) out.push(a.filter((_, i) => mask & (1 << i)));
    return out;
  },

  permutations: ({ nums }) => {
    const a = nums as N;
    if (a.length <= 1) return [a];
    return a.flatMap((x, i) =>
      (GRAPH_SOLVERS.permutations!({ nums: [...a.slice(0, i), ...a.slice(i + 1)] }) as N[]).map((p) => [x, ...p]),
    );
  },

  'combination-sum': ({ candidates, target }) => {
    const c = [...(candidates as N)].sort((a, b) => a - b);
    const out: N[] = [];
    const go = (start: number, left: number, picked: N) => {
      if (left === 0) out.push([...picked]);
      for (let i = start; i < c.length && c[i]! <= left; i++) go(i, left - c[i]!, [...picked, c[i]!]);
    };
    go(0, target as number, []);
    return out;
  },

  'word-search': ({ board, word }) => {
    const b = (board as string[]).map((r) => [...r]);
    const w = word as string;
    const find = (r: number, c: number, k: number): boolean => {
      if (k === w.length) return true;
      if (r < 0 || c < 0 || r >= b.length || c >= b[0]!.length || b[r]![c] !== w[k]) return false;
      const keep = b[r]![c]!;
      b[r]![c] = '#';
      const ok = find(r + 1, c, k + 1) || find(r - 1, c, k + 1) || find(r, c + 1, k + 1) || find(r, c - 1, k + 1);
      b[r]![c] = keep;
      return ok;
    };
    return b.some((row, r) => row.some((_, c) => find(r, c, 0)));
  },
};
