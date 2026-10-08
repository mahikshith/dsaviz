/**
 * Problem-specific output checkers. Tasks that accept any valid answer are
 * checked semantically rather than against one stored answer.
 */
export const CHECKER_IDS = ['exact', 'unordered', 'unordered-nested', 'target-pair', 'window-max', 'shortest-route'] as const;
export type CheckerId = (typeof CHECKER_IDS)[number];

export type CheckResult = { ok: true } | { ok: false; reason: string };

const ok: CheckResult = { ok: true };
const cmp = (a: unknown, b: unknown) => {
  const x = JSON.stringify(a);
  const y = JSON.stringify(b);
  return x < y ? -1 : x > y ? 1 : 0;
};
const fail = (reason: string): CheckResult => ({ ok: false, reason });

export function checkOutput(checker: CheckerId, input: unknown, output: unknown, expected: unknown): CheckResult {
  switch (checker) {
    case 'exact':
      return JSON.stringify(output) === JSON.stringify(expected)
        ? ok
        : fail(`expected ${JSON.stringify(expected)}, got ${JSON.stringify(output)}`);
    case 'unordered':
    case 'unordered-nested': {
      // Any order of the outer list is accepted; with "nested", the order inside each item is ignored too.
      const norm = (v: unknown) => {
        if (!Array.isArray(v)) return JSON.stringify(v);
        const items = v.map((x) => (checker === 'unordered-nested' && Array.isArray(x) ? [...x].sort(cmp) : x));
        return JSON.stringify(items.map((x) => JSON.stringify(x)).sort());
      };
      return norm(output) === norm(expected) ? ok : fail(`expected ${JSON.stringify(expected)} in any order, got ${JSON.stringify(output)}`);
    }
    case 'target-pair': {
      const { target } = input as { target: number };
      const prices = ((input as { prices?: number[] }).prices ?? (input as { nums?: number[] }).nums)!;
      if (expected === null) return output === null ? ok : fail(`expected no pair, got ${JSON.stringify(output)}`);
      if (!Array.isArray(output) || output.length !== 2) return fail(`expected a pair of indices, got ${JSON.stringify(output)}`);
      const [i, j] = output as [number, number];
      if (!Number.isInteger(i) || !Number.isInteger(j) || i < 0 || j >= prices.length) return fail('indices out of bounds');
      if (!(i < j)) return fail('indices must be distinct and increasing');
      if (prices[i]! + prices[j]! !== target) return fail(`values at ${i} and ${j} do not add up to ${target}`);
      return ok;
    }
    case 'window-max': {
      const { visitors, k } = input as { visitors: number[]; k: number };
      const o = output as { start: number; total: number };
      let best = -Infinity;
      let bestStart = 0;
      for (let s = 0; s + k <= visitors.length; s++) {
        const total = visitors.slice(s, s + k).reduce((a, b) => a + b, 0);
        if (total > best) {
          best = total;
          bestStart = s;
        }
      }
      if (o.total !== best) return fail(`best total is ${best}, got ${o.total}`);
      if (o.start !== bestStart) return fail(`earliest best start is ${bestStart}, got ${o.start}`);
      return ok;
    }
    case 'shortest-route': {
      const { edges, start, goal } = input as { edges: [string, string][]; start: string; goal: string };
      const exp = expected as { distance: number } | null;
      const out = output as { distance: number; path: string[] } | null;
      if (exp === null) return out === null ? ok : fail('expected unreachable');
      if (!out) return fail('expected a route');
      if (out.distance !== exp.distance) return fail(`expected distance ${exp.distance}, got ${out.distance}`);
      if (out.path.length !== out.distance + 1) return fail('route length does not match distance');
      if (out.path[0] !== start || out.path[out.path.length - 1] !== goal) return fail('route must run from start to goal');
      const adjacent = new Set(edges.flatMap(([a, b]) => [`${a}-${b}`, `${b}-${a}`]));
      for (let i = 1; i < out.path.length; i++) {
        if (!adjacent.has(`${out.path[i - 1]}-${out.path[i]}`)) return fail(`no street between ${out.path[i - 1]} and ${out.path[i]}`);
      }
      return ok;
    }
  }
}
