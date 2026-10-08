'use client';

import { useMemo, useState } from 'react';
import { Segmented } from '@/features/player/Segmented';
import { blobs, rng, type Point } from '../data';
import { Plot, scales, type Domain } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import { pathOf, toneOf } from './common';
import styles from '../ml.module.css';
import local from './local.module.css';

export type KFrame = {
  phase: 'init' | 'assign' | 'move' | 'done';
  iteration: number;
  centroids: Point[];
  /** Cluster index per point, or null before the first assignment. */
  assign: number[] | null;
  /** Sum of squared distances from each point to its centroid. */
  inertia: number | null;
};

const d2 = (a: Point, b: Point) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
const nearest = (p: Point, cs: Point[]) => cs.reduce((best, c, j) => (d2(p, c) < d2(p, cs[best]!) ? j : best), 0);
export const inertia = (points: Point[], cs: Point[], assign: number[]) =>
  points.reduce((s, p, i) => s + d2(p, cs[assign[i]!]!), 0);

/** Random: k distinct data points. k-means++: each next centroid is picked with probability proportional to D(x)². */
export function initCentroids(points: Point[], k: number, seed: number, plusPlus: boolean): Point[] {
  const rand = rng(seed);
  if (!plusPlus) {
    const idx = points.map((_, i) => i);
    for (let i = 0; i < k; i++) {
      const j = i + Math.floor(rand() * (idx.length - i));
      [idx[i], idx[j]] = [idx[j]!, idx[i]!];
    }
    return idx.slice(0, k).map((i) => ({ ...points[i]! }));
  }
  const cs = [{ ...points[Math.floor(rand() * points.length)]! }];
  while (cs.length < k) {
    const w = points.map((p) => Math.min(...cs.map((c) => d2(p, c))));
    let r = rand() * w.reduce((a, b) => a + b, 0);
    const i = w.findIndex((v) => (r -= v) <= 0);
    cs.push({ ...points[i < 0 ? points.length - 1 : i]! });
  }
  return cs;
}

/** Lloyd's algorithm, recorded as alternating assign and move frames until no point changes cluster. */
export function kmeans(points: Point[], k: number, seed: number, plusPlus = false, maxIter = 20): KFrame[] {
  let cs = initCentroids(points, k, seed, plusPlus);
  const frames: KFrame[] = [{ phase: 'init', iteration: 0, centroids: cs, assign: null, inertia: null }];
  let assign: number[] | null = null;
  for (let it = 1; it <= maxIter; it++) {
    const next = points.map((p) => nearest(p, cs));
    if (assign && next.every((a, i) => a === assign![i])) {
      frames.push({ phase: 'done', iteration: it - 1, centroids: cs, assign, inertia: inertia(points, cs, assign) });
      break;
    }
    const a = (assign = next);
    frames.push({ phase: 'assign', iteration: it, centroids: cs, assign: a, inertia: inertia(points, cs, a) });
    cs = cs.map((c, j) => {
      const members = points.filter((_, i) => a[i] === j);
      if (!members.length) return c; // an empty cluster keeps its centroid
      return { x: members.reduce((s, p) => s + p.x, 0) / members.length, y: members.reduce((s, p) => s + p.y, 0) / members.length };
    });
    frames.push({ phase: 'move', iteration: it, centroids: cs, assign: a, inertia: inertia(points, cs, a) });
  }
  return frames;
}

const DATA = blobs(
  4,
  [
    { x: 2.2, y: 4.4 },
    { x: 7.6, y: 4.6 },
    { x: 3.2, y: 1.5 },
    { x: 7.2, y: 1.4 },
  ],
  30,
  0.55,
);
const W = 560;
const H = 360;
const DOMAIN: Domain = { x: [0, 10], y: [0, 6] };
const s = scales(DOMAIN, W, H);
const CAPTION = {
  assign: 'Assign: each point joins its nearest centroid.',
  move: 'Update: each centroid moves to the mean of its points.',
  done: 'Converged: no point changed cluster, so the centroids stay where they are.',
};

function Visual() {
  const [k, setK] = useState(4);
  const [init, setInit] = useState('random');
  const frames = useMemo(() => kmeans(DATA, k, 30, init === 'plusplus'), [k, init]);
  const st = useStepper(frames.length, 700);
  const f = frames[Math.min(st.frame, frames.length - 1)]!;
  const history = frames.slice(0, st.frame + 1);

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Clusters k" value={k} min={2} max={5} onChange={setK} />
        <Segmented
          label="Initialisation"
          small
          value={init}
          onChange={setInit}
          options={[
            { value: 'random', label: 'Random points' },
            { value: 'plusplus', label: 'k-means++' },
          ]}
        />
      </div>
      <Plot
        domain={DOMAIN}
        width={W}
        height={H}
        xLabel="x1"
        yLabel="x2"
        label={`K-means with k = ${k}, iteration ${f.iteration}, ${f.phase} step${f.inertia === null ? '' : `, inertia ${f.inertia.toFixed(1)}`}.`}
      >
        {DATA.map((p, i) => (
          <circle
            key={i}
            className={styles.point}
            data-tone={f.assign ? toneOf(f.assign[i]!) : 'muted'}
            cx={s.sx(p.x)}
            cy={s.sy(p.y)}
            r={4}
            opacity={f.assign ? 0.85 : 0.5}
          />
        ))}
        {f.centroids.map((c, j) => (
          <g key={j}>
            <path
              className={`${styles.line} ${styles.dashed}`}
              data-tone={toneOf(j)}
              strokeWidth={1.5}
              d={pathOf(history.map((h) => [s.sx(h.centroids[j]!.x), s.sy(h.centroids[j]!.y)]))}
            />
            <circle className={styles.point} data-tone={toneOf(j)} cx={s.sx(c.x)} cy={s.sy(c.y)} r={7} />
            <circle className={local.ring} cx={s.sx(c.x)} cy={s.sy(c.y)} r={10} />
          </g>
        ))}
      </Plot>
      <Readout
        items={[
          ['iteration', f.iteration],
          ['inertia', f.inertia === null ? '-' : f.inertia.toFixed(1)],
        ]}
      />
      <StepperControls stepper={st} />
      <p className={styles.caption}>
        {f.phase === 'init'
          ? init === 'plusplus'
            ? `${k} centroids placed by k-means++: each new one is likely to land far from the others.`
            : `${k} centroids placed on random data points.`
          : CAPTION[f.phase]}
      </p>
    </>
  );
}

export const kMeans: MlAlgorithm = {
  id: 'k-means',
  name: 'K-means clustering',
  group: 'Unsupervised learning',
  summary: 'Splits unlabelled points into k groups by repeatedly moving k centres to the middle of their nearest points.',
  steps: [
    'Choose k and place k centroids, for example on random data points.',
    'Assign every point to its nearest centroid.',
    'Move each centroid to the mean of the points assigned to it.',
    'Repeat the two steps until no point changes cluster.',
  ],
  formula: 'assign:  c_i = argmin_j ||x_i - mu_j||²\nupdate:  mu_j = mean of { x_i : c_i = j }\ninertia = sum_i ||x_i - mu_{c_i}||²',
  notes: [
    'Both steps can only lower the inertia, so it always converges, but only to a local minimum. Run it several times or use k-means++ starts.',
    'You must choose k. Plot inertia against k and look for the elbow, or use the silhouette score.',
    'It assumes round clusters of similar size and is sensitive to feature scale and outliers. For odd shapes use DBSCAN or a Gaussian mixture.',
  ],
  Visual,
};
