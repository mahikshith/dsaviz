/** The maths behind the supervised-learning visualizations: each one must actually learn what it claims to. */
import { describe, expect, it } from 'vitest';
import { blobs, linePoints } from '@/features/ml/data';
import { CURVES, descend } from '@/features/ml/supervised/gradientDescent';
import { fitLine, LINE_DATA } from '@/features/ml/supervised/linearRegression';
import { LOGISTIC_DATA, trainLogistic } from '@/features/ml/supervised/logisticRegression';
import { nearest, vote } from '@/features/ml/supervised/knn';
import { bestSplit, gini, growTree, leavesAt, TREE_DATA } from '@/features/ml/supervised/decisionTree';
import { marginWidth, SVM_DATA, trainSvm } from '@/features/ml/supervised/svm';
import { boxLine, CLASSIFY_DOMAIN } from '@/features/ml/supervised/geometry';

describe('gradient descent', () => {
  it('converges on a convex bowl with a good rate', () => {
    const { frames, outcome } = descend(CURVES.bowl, 3.5, 0.1);
    expect(outcome).toBe('converged');
    expect(Math.abs(frames.at(-1)!.w)).toBeLessThan(1e-3);
    expect(frames.length).toBeLessThanOrEqual(61);
  });

  it('is slow with a tiny rate and diverges with a huge one', () => {
    expect(descend(CURVES.bowl, 3.5, 0.01).outcome).toBe('unfinished');
    const { frames, outcome } = descend(CURVES.bowl, 3.5, 1.5, 60, 1e3);
    expect(outcome).toBe('diverged');
    expect(Math.abs(frames.at(-1)!.w)).toBeGreaterThan(1e3);
  });

  it('stops in the nearer, local valley on the non-convex curve', () => {
    const { frames, outcome } = descend(CURVES.valleys, CURVES.valleys.start, 0.1);
    expect(outcome).toBe('converged');
    expect(frames.at(-1)!.w).toBeGreaterThan(0);
  });
});

describe('linear regression', () => {
  it('recovers slope and intercept from clean-ish data', () => {
    const pts = linePoints(1, 200, 1.5, -0.5, 0.2, -3, 3);
    const { frames, diverged } = fitLine(pts, 0.05, 300);
    expect(diverged).toBe(false);
    expect(frames.at(-1)!.w).toBeCloseTo(1.5, 1);
    expect(frames.at(-1)!.b).toBeCloseTo(-0.5, 1);
  });

  it('lowers the error on the demo data and diverges with a large rate', () => {
    const { frames } = fitLine(LINE_DATA, 0.05);
    expect(frames.at(-1)!.mse).toBeLessThan(frames[0]!.mse / 5);
    expect(fitLine(LINE_DATA, 0.3).diverged).toBe(true);
  });
});

describe('logistic regression', () => {
  it('reaches over 90% accuracy and lowers the log-loss', () => {
    const frames = trainLogistic(LOGISTIC_DATA, 0.5);
    expect(frames.at(-1)!.accuracy).toBeGreaterThan(0.9);
    expect(frames.at(-1)!.loss).toBeLessThan(frames[0]!.loss);
  });
});

describe('k-nearest neighbours', () => {
  it('returns neighbours nearest first and votes for the obvious class', () => {
    const data = blobs(2, [{ x: -3, y: 0 }, { x: 3, y: 0 }], 10, 0.3);
    const ns = nearest(data, { x: 2.8, y: 0.1 }, 5);
    expect(ns.map((n) => n.d)).toEqual([...ns.map((n) => n.d)].sort((a, b) => a - b));
    expect(vote(ns, 2)).toMatchObject({ winner: 1, counts: [0, 5] });
  });

  it('breaks a tie in favour of the nearest neighbour', () => {
    const data = [
      { x: 0, y: 0, label: 1 },
      { x: 2, y: 0, label: 0 },
    ];
    expect(vote(nearest(data, { x: 0.5, y: 0 }, 2), 2).winner).toBe(1);
  });
});

describe('decision tree', () => {
  it('measures Gini impurity', () => {
    expect(gini([5, 5])).toBeCloseTo(0.5);
    expect(gini([7, 0])).toBe(0);
  });

  it('first split lowers the impurity and deeper trees fit better', () => {
    const split = bestSplit(TREE_DATA)!;
    expect(split.giniAfter).toBeLessThan(gini([0, 1].map((c) => TREE_DATA.filter((p) => p.label === c).length)));
    const accuracy = (depth: number) => {
      const { root, splits } = growTree(TREE_DATA, depth, CLASSIFY_DOMAIN);
      return leavesAt(root, splits.length).reduce((n, l) => n + l.counts[l.majority]!, 0) / TREE_DATA.length;
    };
    expect(accuracy(3)).toBeGreaterThan(accuracy(1));
    expect(accuracy(6)).toBe(1);
  });

  it('keeps split order stable as max depth grows', () => {
    const short = growTree(TREE_DATA, 2, CLASSIFY_DOMAIN).splits.map((n) => n.split!.t);
    const long = growTree(TREE_DATA, 5, CLASSIFY_DOMAIN).splits.map((n) => n.split!.t);
    expect(long.slice(0, short.length)).toEqual(short);
  });
});

describe('linear SVM', () => {
  it('separates separable data with a margin', () => {
    const data = blobs(4, [{ x: -2, y: -1 }, { x: 2, y: 1 }], 20, 0.5);
    const f = trainSvm(data, 10).at(-1)!;
    expect(f.accuracy).toBe(1);
    expect(f.support.length).toBeGreaterThan(0);
  });

  it('widens the margin as C shrinks', () => {
    const wide = trainSvm(SVM_DATA, 0.5).at(-1)!;
    const narrow = trainSvm(SVM_DATA, 30).at(-1)!;
    expect(marginWidth(wide)).toBeGreaterThan(marginWidth(narrow));
    expect(wide.support.length).toBeGreaterThan(narrow.support.length);
  });
});

describe('boxLine', () => {
  it('clips a line to the plot box', () => {
    expect(boxLine(1, -1, 0, CLASSIFY_DOMAIN)).toEqual([
      { x: -3, y: -3 },
      { x: 3, y: 3 },
    ]);
    expect(boxLine(0, 1, -10, CLASSIFY_DOMAIN)).toBeNull();
  });
});
