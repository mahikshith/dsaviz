import { blobs, type Labeled } from '../data';
import type { Domain } from '../Plot';

/** Two classes in three small clusters each, so no single cut separates them. */
export const TREE_DATA: Labeled[] = [
  ...blobs(3, [{ x: -2, y: -0.8 }, { x: 2.6, y: -1.9 }, { x: -3.4, y: 2 }], 9, 0.6).map((p) => ({ ...p, label: 0 })),
  ...blobs(53, [{ x: 1.6, y: 1.1 }, { x: -0.6, y: 2 }, { x: 0.2, y: -2 }], 9, 0.6).map((p) => ({ ...p, label: 1 })),
];

export type Box = { x0: number; x1: number; y0: number; y1: number };
export type Split = { axis: 'x' | 'y'; t: number; giniAfter: number };
export type TreeNode = {
  depth: number;
  box: Box;
  /** Points per class in this node. */
  counts: number[];
  gini: number;
  majority: number;
  split?: Split & { order: number; left: TreeNode; right: TreeNode };
};

/** Gini impurity: the chance two random picks from the node disagree. 0 means pure. */
export function gini(counts: number[]) {
  const n = counts.reduce((a, b) => a + b, 0);
  return n ? 1 - counts.reduce((s, c) => s + (c / n) ** 2, 0) : 0;
}

const countLabels = (pts: Labeled[]) => pts.reduce((c, p) => ((c[p.label]! += 1), c), [0, 0]);

/** The axis-aligned cut (x ≤ t or y ≤ t, t halfway between neighbouring values) with the lowest weighted Gini. */
export function bestSplit(pts: Labeled[]): Split | null {
  let best: Split | null = null;
  for (const axis of ['x', 'y'] as const) {
    const sorted = [...pts].sort((a, b) => a[axis] - b[axis]);
    const left = [0, 0];
    const right = countLabels(sorted);
    for (let i = 0; i < sorted.length - 1; i++) {
      const p = sorted[i]!;
      left[p.label]! += 1;
      right[p.label]! -= 1;
      const next = sorted[i + 1]![axis];
      if (next === p[axis]) continue;
      const giniAfter = ((i + 1) * gini(left) + (sorted.length - i - 1) * gini(right)) / sorted.length;
      if (!best || giniAfter < best.giniAfter - 1e-12) best = { axis, t: (p[axis] + next) / 2, giniAfter };
    }
  }
  return best;
}

/**
 * Grows the tree greedily, level by level, so split number k is always the same split whatever the max depth.
 * A node is split only if it is impure, above max depth, and the cut lowers the impurity.
 */
export function growTree(pts: Labeled[], maxDepth: number, domain: Domain) {
  const make = (p: Labeled[], depth: number, box: Box): TreeNode => {
    const counts = countLabels(p);
    return { depth, box, counts, gini: gini(counts), majority: counts[1]! > counts[0]! ? 1 : 0 };
  };
  const root = make(pts, 0, { x0: domain.x[0], x1: domain.x[1], y0: domain.y[0], y1: domain.y[1] });
  const members = new Map<TreeNode, Labeled[]>([[root, pts]]);
  const order: TreeNode[] = [];
  const queue = [root];
  for (let node = queue.shift(); node; node = queue.shift()) {
    const p = members.get(node)!;
    const s = node.depth < maxDepth && node.gini > 0 ? bestSplit(p) : null;
    if (!s || s.giniAfter >= node.gini - 1e-12) continue;
    const { box, depth } = node;
    const lo = p.filter((q) => q[s.axis] <= s.t);
    const hi = p.filter((q) => q[s.axis] > s.t);
    const left = make(lo, depth + 1, s.axis === 'x' ? { ...box, x1: s.t } : { ...box, y1: s.t });
    const right = make(hi, depth + 1, s.axis === 'x' ? { ...box, x0: s.t } : { ...box, y0: s.t });
    members.set(left, lo).set(right, hi);
    node.split = { ...s, order: order.length, left, right };
    order.push(node);
    queue.push(left, right);
  }
  return { root, splits: order };
}

/** The leaves of the tree after the first `applied` splits. */
export function leavesAt(node: TreeNode, applied: number): TreeNode[] {
  return node.split && node.split.order < applied ? [...leavesAt(node.split.left, applied), ...leavesAt(node.split.right, applied)] : [node];
}

/** The rules after the first `applied` splits, as an indented outline. */
export function outline(node: TreeNode, applied: number, names: string[], indent = ''): string[] {
  const s = node.split;
  if (!s || s.order >= applied) {
    return [`${indent}predict ${names[node.majority]}   (${node.counts.map((c, i) => `${names[i]} ${c}`).join(', ')})`];
  }
  return [
    `${indent}if ${s.axis} ≤ ${s.t.toFixed(2)}:`,
    ...outline(s.left, applied, names, indent + '  '),
    `${indent}else:`,
    ...outline(s.right, applied, names, indent + '  '),
  ];
}
