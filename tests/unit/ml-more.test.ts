/** The math behind the ensemble, unsupervised and neural-network visualizations. */
import { describe, expect, it } from 'vitest';
import { blobs, gaussian, rng, type Labeled } from '@/features/ml/data';
import { moreAlgorithms } from '@/features/ml/unsupervised';
import { gradientBoost } from '@/features/ml/unsupervised/boosting';
import { forestAccuracy, randomForest } from '@/features/ml/unsupervised/randomForest';
import { kmeans } from '@/features/ml/unsupervised/kmeans';
import { dbscan, NOISE } from '@/features/ml/unsupervised/dbscan';
import { ANGLE, cloud, pca } from '@/features/ml/unsupervised/pca';
import { perceptron } from '@/features/ml/unsupervised/perceptron';
import { evaluate, trainNet, XOR_DATA } from '@/features/ml/unsupervised/mlp';

const three = blobs(
  1,
  [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 5, y: 9 },
  ],
  25,
  0.6,
);

/** Every blob ends up in a single cluster and different blobs in different clusters. */
function recovers(points: Labeled[], labels: number[]) {
  const perBlob = [0, 1, 2].map((b) => new Set(labels.filter((_, i) => points[i]!.label === b)));
  return perBlob.every((s) => s.size === 1) && new Set(perBlob.map((s) => [...s][0])).size === 3;
}

describe('ml: ensembles, unsupervised, neural networks', () => {
  it('registers unique ids with complete text', () => {
    const ids = moreAlgorithms.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of moreAlgorithms) {
      expect(a.steps.length).toBeGreaterThanOrEqual(3);
      expect(a.steps.length).toBeLessThanOrEqual(5);
      expect(a.notes?.length ?? 0).toBeGreaterThanOrEqual(2);
    }
  });

  it('gradient boosting: training MSE never rises with a small learning rate', () => {
    const rand = rng(2);
    const pts = Array.from({ length: 50 }, () => {
      const x = rand() * 10;
      return { x, y: Math.sin(x) + gaussian(rand) * 0.3 };
    });
    const { mse } = gradientBoost(pts, 0.1, 60);
    mse.slice(1).forEach((m, i) => expect(m).toBeLessThanOrEqual(mse[i]! + 1e-12));
    expect(mse.at(-1)!).toBeLessThan(mse[0]! / 2);
  });

  it('random forest: more than 85% accuracy on separable blobs', () => {
    const data = blobs(3, [{ x: 2, y: 2 }, { x: 7, y: 6 }], 40, 0.9);
    expect(forestAccuracy(randomForest(data, 25, 3, 1), data)).toBeGreaterThan(0.85);
  });

  it('k-means: inertia never increases and three blobs give three clusters', () => {
    for (const plusPlus of [false, true]) {
      const frames = kmeans(three, 3, 4, plusPlus);
      const inertias = frames.flatMap((f) => (f.inertia === null ? [] : [f.inertia]));
      inertias.slice(1).forEach((v, i) => expect(v).toBeLessThanOrEqual(inertias[i]! + 1e-9));
      const last = frames.at(-1)!;
      expect(last.phase).toBe('done');
      expect(recovers(three, last.assign!)).toBe(true);
    }
  });

  it('dbscan: finds the blobs and calls far-away points noise', () => {
    const far = [
      { x: 30, y: 30, label: 9 },
      { x: -20, y: 15, label: 9 },
    ];
    const pts = [...three, ...far];
    const { labels, clusters } = dbscan(pts, 1.5, 4);
    expect(clusters).toBe(3);
    expect(labels.slice(-2)).toEqual([NOISE, NOISE]);
    expect(recovers(three, labels.slice(0, three.length))).toBe(true);
  });

  it('pca: PC1 follows the generating direction and explained variance sums to 1', () => {
    const r = pca(cloud(0.4, 400));
    const [v1] = r.components;
    expect(Math.abs(v1.x * Math.cos(ANGLE) + v1.y * Math.sin(ANGLE))).toBeGreaterThan(0.99);
    expect(r.explained[0] + r.explained[1]).toBeCloseTo(1, 12);
    expect(r.explained[0]).toBeGreaterThan(0.8);
  });

  it('perceptron converges on separable data; the two-layer network solves XOR', () => {
    const data = blobs(5, [{ x: -2, y: -1 }, { x: 2, y: 1 }], 30, 0.6);
    const { frames, converged } = perceptron(data);
    expect(converged).toBe(true);
    expect(frames.at(-1)!.mistakes).toBe(0);
    expect(evaluate(trainNet(XOR_DATA).at(-1)!, XOR_DATA).accuracy).toBeGreaterThan(0.95);
  });
});
