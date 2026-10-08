'use client';

import { useMemo, useState } from 'react';
import { blobs, rng, type Labeled, type Point } from '../data';
import { CLASS_TONE, Plot, scales, type Domain } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import { gridCenters, Shade } from './common';
import styles from '../ml.module.css';

/** A classification tree. Leaves store the share of class 1 among their training points. */
export type TreeNode = { leaf: true; p: number } | { leaf: false; f: 0 | 1; t: number; lo: TreeNode; hi: TreeNode };

const feat = (p: Point, f: 0 | 1) => (f === 0 ? p.x : p.y);
const gini = (p: number) => 2 * p * (1 - p);

/** Grows a tree to `depth`. At every node only one randomly chosen feature is considered for the split. */
export function growTree(pts: Labeled[], depth: number, rand: () => number): TreeNode {
  const n = pts.length;
  const n1 = pts.filter((p) => p.label === 1).length;
  const leaf: TreeNode = { leaf: true, p: n1 / n };
  if (depth === 0 || n1 === 0 || n1 === n || n < 4) return leaf;
  const f: 0 | 1 = rand() < 0.5 ? 0 : 1;
  const sorted = [...pts].sort((a, b) => feat(a, f) - feat(b, f));
  let best = -1;
  let bestImpurity = n * gini(n1 / n);
  let left1 = 0;
  for (let i = 0; i < n - 1; i++) {
    left1 += sorted[i]!.label;
    if (feat(sorted[i]!, f) === feat(sorted[i + 1]!, f)) continue;
    const nl = i + 1;
    const impurity = nl * gini(left1 / nl) + (n - nl) * gini((n1 - left1) / (n - nl));
    if (impurity < bestImpurity) {
      bestImpurity = impurity;
      best = i;
    }
  }
  if (best < 0) return leaf;
  return {
    leaf: false,
    f,
    t: (feat(sorted[best]!, f) + feat(sorted[best + 1]!, f)) / 2,
    lo: growTree(sorted.slice(0, best + 1), depth - 1, rand),
    hi: growTree(sorted.slice(best + 1), depth - 1, rand),
  };
}

export const treeProb = (node: TreeNode, p: Point): number =>
  node.leaf ? node.p : treeProb(feat(p, node.f) < node.t ? node.lo : node.hi, p);

export type ForestTree = { inBag: number[]; root: TreeNode };

/** Each tree is trained on a bootstrap sample: n points drawn with replacement. */
export function randomForest(data: Labeled[], trees: number, depth: number, seed: number): ForestTree[] {
  const rand = rng(seed);
  return Array.from({ length: trees }, () => {
    const inBag = data.map(() => Math.floor(rand() * data.length));
    return { inBag, root: growTree(inBag.map((i) => data[i]!), depth, rand) };
  });
}

/** Average of the trees' class-1 probabilities. */
export const forestProb = (forest: ForestTree[], p: Point) => forest.reduce((s, t) => s + treeProb(t.root, p), 0) / forest.length;

export const forestAccuracy = (forest: ForestTree[], data: Labeled[]) =>
  data.filter((p) => (forestProb(forest, p) >= 0.5 ? 1 : 0) === p.label).length / data.length;

const DATA = blobs(21, [{ x: 3.6, y: 2.1 }, { x: 6.4, y: 3.7 }], 45, 0.8);
const TREES = 30;
const W = 560;
const H = 360;
const DOMAIN: Domain = { x: [0, 10], y: [0, 6] };
const CELLS = gridCenters(DOMAIN);
const s = scales(DOMAIN, W, H);

function Visual() {
  const [depth, setDepth] = useState(3);
  const forest = useMemo(() => randomForest(DATA, TREES, depth, 5), [depth]);
  // Running sums over trees, so frame k is the average of the first k trees.
  const frames = useMemo(() => {
    const cellSum = CELLS.map(() => 0);
    const dataSum = DATA.map(() => 0);
    const out = [{ probs: [] as number[], accuracy: 0 }];
    forest.forEach((tree, k) => {
      CELLS.forEach((c, i) => (cellSum[i] = cellSum[i]! + treeProb(tree.root, c)));
      DATA.forEach((p, i) => (dataSum[i] = dataSum[i]! + treeProb(tree.root, p)));
      const n = k + 1;
      const right = DATA.filter((p, i) => (dataSum[i]! / n >= 0.5 ? 1 : 0) === p.label).length;
      out.push({ probs: cellSum.map((v) => v / n), accuracy: right / DATA.length });
    });
    return out;
  }, [forest]);
  const st = useStepper(TREES + 1, 450);
  const k = st.frame;
  const newest = k > 0 ? forest[k - 1]! : null;
  const inBag = new Set(newest?.inBag);
  const frame = frames[k]!;
  const share = Math.round((inBag.size / DATA.length) * 100);

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Tree depth" value={depth} min={1} max={4} onChange={setDepth} />
      </div>
      <Plot
        domain={DOMAIN}
        width={W}
        height={H}
        xLabel="x1"
        yLabel="x2"
        label={
          newest
            ? `Random forest of ${k} trees of depth ${depth}. Training accuracy ${(frame.accuracy * 100).toFixed(0)} percent.`
            : 'Two classes of points before any tree is trained.'
        }
      >
        {newest ? <Shade domain={DOMAIN} width={W} height={H} probs={frame.probs} /> : null}
        {DATA.map((p, i) => (
          <circle
            key={i}
            className={styles.point}
            data-tone={CLASS_TONE[p.label]}
            cx={s.sx(p.x)}
            cy={s.sy(p.y)}
            r={4.5}
            opacity={!newest || inBag.has(i) ? 1 : 0.25}
          />
        ))}
      </Plot>
      <Readout
        items={[
          ['trees', k],
          ['training accuracy', newest ? `${(frame.accuracy * 100).toFixed(1)}%` : '-'],
        ]}
      />
      <StepperControls stepper={st} label="Tree" />
      <p className={styles.caption}>
        {newest
          ? `Tree ${k} was trained on a bootstrap sample holding ${share}% of the points (solid). The shading is the average vote of ${k} tree${k === 1 ? '' : 's'}.`
          : 'Each tree will see its own bootstrap sample and choose split features at random.'}
      </p>
    </>
  );
}

export const randomForestAlgorithm: MlAlgorithm = {
  id: 'random-forest',
  name: 'Random forest',
  group: 'Ensembles',
  summary: 'Trains many decision trees on random resamples of the data and averages their votes.',
  steps: [
    'Draw a bootstrap sample: n points picked with replacement, so some repeat and about a third are left out.',
    'Grow a shallow decision tree on that sample, considering only a random subset of features at each split.',
    'Repeat for many trees, each with its own sample and its own random choices.',
    'To predict, average the trees: the class with the most votes (or highest mean probability) wins.',
  ],
  formula: 'p(x) = (1 / T) * sum of p_t(x) over trees\nclass = argmax p(x)\nP(left out of a sample) = (1 - 1/n)^n ≈ 37%',
  notes: [
    'Averaging many noisy, decorrelated trees reduces variance; that is why one tree overfits but a forest rarely does.',
    'Random feature choice (max_features) keeps trees different from each other. Without it, bagged trees all make the same first split.',
    'Points left out of a tree’s sample give a free validation score, the out-of-bag error.',
    'Strong default for tabular data with little tuning; it needs no feature scaling but is slower to predict than one tree.',
  ],
  Visual,
};
