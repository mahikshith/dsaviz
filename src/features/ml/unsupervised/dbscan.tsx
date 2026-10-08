'use client';

import { useMemo, useState } from 'react';
import { blobs, dist, gaussian, rng, type Point } from '../data';
import { Plot, scales, type Domain } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import { shuffle, toneOf } from './common';
import styles from '../ml.module.css';
import local from './local.module.css';

export const NOISE = -1;
export const UNSEEN = -2;

export type DbFrame = {
  /** The point examined in this frame. */
  focus: number;
  kind: 'core' | 'border' | 'noise';
  /** Points within eps, counting the point itself. */
  neighbours: number;
  /** Cluster per point after this frame: index, NOISE or UNSEEN. */
  labels: number[];
  core: boolean[];
};

/** DBSCAN, recording one frame each time a point is examined. Neighbour counts include the point itself. */
export function dbscan(points: Point[], eps: number, minPts: number) {
  const labels = points.map(() => UNSEEN);
  const core = points.map(() => false);
  const frames: DbFrame[] = [];
  const near = (i: number) => points.flatMap((q, j) => (dist(points[i]!, q) <= eps ? [j] : []));
  const record = (focus: number, kind: DbFrame['kind'], neighbours: number) =>
    frames.push({ focus, kind, neighbours, labels: labels.slice(), core: core.slice() });
  let cluster = -1;
  points.forEach((_, i) => {
    if (labels[i] !== UNSEEN) return;
    const nb = near(i);
    if (nb.length < minPts) {
      labels[i] = NOISE; // may still become a border point of a later cluster
      return record(i, 'noise', nb.length);
    }
    cluster++;
    labels[i] = cluster;
    core[i] = true;
    record(i, 'core', nb.length);
    const queue = [...nb];
    while (queue.length) {
      const j = queue.shift()!;
      if (labels[j] === NOISE) {
        labels[j] = cluster;
        record(j, 'border', near(j).length);
      }
      if (labels[j] !== UNSEEN) continue;
      labels[j] = cluster;
      const nbj = near(j);
      if (nbj.length >= minPts) {
        core[j] = true;
        queue.push(...nbj);
      }
      record(j, core[j] ? 'core' : 'border', nbj.length);
    }
  });
  return { labels, core, clusters: cluster + 1, frames };
}

/** Two interleaved half moons, a round blob and scattered noise, in a seeded random order. */
const DATA: Point[] = (() => {
  const rand = rng(8);
  const moons = Array.from({ length: 60 }, (_, i) => {
    const t = (Math.PI * (i % 30)) / 29;
    const [x, y] = i < 30 ? [2 + 1.6 * Math.cos(t), 2.6 + 1.6 * Math.sin(t)] : [3.6 - 1.6 * Math.cos(t), 3.4 - 1.6 * Math.sin(t)];
    return { x: x + gaussian(rand) * 0.12, y: y + gaussian(rand) * 0.12 };
  });
  const blob = blobs(9, [{ x: 7.8, y: 3.6 }], 20, 0.4);
  const noise = Array.from({ length: 10 }, () => ({ x: 0.4 + rand() * 9.2, y: 0.4 + rand() * 5.2 }));
  return shuffle([...moons, ...blob.map(({ x, y }) => ({ x, y })), ...noise], 2);
})();
const W = 560;
const H = 360;
const DOMAIN: Domain = { x: [0, 10], y: [0, 6] };
const s = scales(DOMAIN, W, H);

function Visual() {
  const [eps, setEps] = useState(0.55);
  const [minPts, setMinPts] = useState(4);
  const run = useMemo(() => dbscan(DATA, eps, minPts), [eps, minPts]);
  const st = useStepper(run.frames.length + 1, 220);
  const f = st.frame > 0 ? run.frames[st.frame - 1] : undefined;
  const labels = f?.labels ?? DATA.map(() => UNSEEN);
  const counts = {
    clusters: new Set(labels.filter((l) => l >= 0)).size,
    core: f ? f.core.filter(Boolean).length : 0,
    noise: labels.filter((l) => l === NOISE).length,
  };
  const border = labels.filter((l) => l >= 0).length - counts.core;
  const focus = f ? DATA[f.focus]! : null;
  const cluster = f ? f.labels[f.focus]! + 1 : 0;

  let caption = 'Visit each point in turn and count its neighbours within eps (the point itself included).';
  if (f?.kind === 'noise') caption = `${f.neighbours} of ${minPts} neighbours within eps: noise for now.`;
  if (f?.kind === 'core') caption = `${f.neighbours} neighbours within eps: a core point, so cluster ${cluster} grows through all of them.`;
  if (f?.kind === 'border') caption = `Only ${f.neighbours} neighbours, but reachable from a core point: a border point of cluster ${cluster}.`;
  if (st.atEnd && f) caption = `Done: ${run.clusters} clusters and ${counts.noise} noise points.`;

  return (
    <>
      <div className={styles.settings}>
        <Slider label="eps" value={eps} min={0.25} max={1.2} step={0.05} onChange={setEps} format={(v) => v.toFixed(2)} />
        <Slider label="minPts" value={minPts} min={2} max={10} onChange={setMinPts} />
      </div>
      <Plot
        domain={DOMAIN}
        width={W}
        height={H}
        xLabel="x1"
        yLabel="x2"
        label={`DBSCAN with eps ${eps.toFixed(2)} and minPts ${minPts}: ${counts.clusters} clusters and ${counts.noise} noise points so far.`}
      >
        {DATA.map((p, i) => {
          const l = labels[i]!;
          if (l === NOISE) return <circle key={i} className={local.hollow} cx={s.sx(p.x)} cy={s.sy(p.y)} r={3.5} />;
          if (l === UNSEEN)
            return <circle key={i} className={styles.point} data-tone="muted" cx={s.sx(p.x)} cy={s.sy(p.y)} r={3} opacity={0.3} />;
          return (
            <circle key={i} className={styles.point} data-tone={toneOf(l)} cx={s.sx(p.x)} cy={s.sy(p.y)} r={f?.core[i] ? 5 : 3.5} />
          );
        })}
        {focus ? (
          <ellipse
            className={local.halo}
            cx={s.sx(focus.x)}
            cy={s.sy(focus.y)}
            rx={s.sx(eps) - s.sx(0)}
            ry={s.sy(0) - s.sy(eps)}
          />
        ) : null}
      </Plot>
      <Readout
        items={[
          ['clusters', counts.clusters],
          ['core', counts.core],
          ['border', border],
          ['noise', counts.noise],
        ]}
      />
      <StepperControls stepper={st} label="Visit" />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

export const dbscanAlgorithm: MlAlgorithm = {
  id: 'dbscan',
  name: 'DBSCAN',
  group: 'Unsupervised learning',
  summary: 'Finds clusters as dense regions of points and marks points in sparse regions as noise.',
  steps: [
    'For a point, count the neighbours within distance eps.',
    'If there are at least minPts, it is a core point and starts or joins a cluster.',
    'Grow the cluster: add every neighbour, and keep expanding from neighbours that are core points too.',
    'A non-core point reached from a core point is a border point; a point no cluster reaches is noise.',
  ],
  formula: 'N(p) = { q : dist(p, q) <= eps }\ncore if |N(p)| >= minPts\ncluster: all points reachable through\n         a chain of core points',
  notes: [
    'No need to choose the number of clusters, and clusters can have any shape, such as the two moons here.',
    'Sensitive to eps: too small and everything is noise, too large and clusters merge. A k-distance plot helps pick it.',
    'One eps for the whole dataset struggles when clusters have different densities; HDBSCAN handles that.',
  ],
  Visual,
};
