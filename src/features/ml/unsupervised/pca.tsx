'use client';

import { useMemo, useState } from 'react';
import { gaussian, rng, type Point } from '../data';
import { Plot, scales, type Domain } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import { pathOf } from './common';
import styles from '../ml.module.css';
import local from './local.module.css';

/** PCA in 2D: covariance matrix [[a, b], [b, c]] and its eigenvectors, largest variance first. */
export function pca(points: Point[]) {
  const n = points.length;
  const mean = { x: points.reduce((s, p) => s + p.x, 0) / n, y: points.reduce((s, p) => s + p.y, 0) / n };
  let a = 0;
  let b = 0;
  let c = 0;
  for (const p of points) {
    a += (p.x - mean.x) ** 2;
    b += (p.x - mean.x) * (p.y - mean.y);
    c += (p.y - mean.y) ** 2;
  }
  [a, b, c] = [a / (n - 1), b / (n - 1), c / (n - 1)];
  const half = Math.hypot((a - c) / 2, b);
  const l1 = (a + c) / 2 + half;
  const l2 = (a + c) / 2 - half;
  // (C - l1 I) v = 0 gives v = (l1 - c, b); when b = 0 the axes are already the components.
  const raw = Math.abs(b) > 1e-12 ? { x: l1 - c, y: b } : a >= c ? { x: 1, y: 0 } : { x: 0, y: 1 };
  const len = Math.hypot(raw.x, raw.y);
  const v1 = { x: raw.x / len, y: raw.y / len };
  return {
    mean,
    cov: [a, b, c] as const,
    variances: [l1, l2] as const,
    explained: [l1 / (l1 + l2), l2 / (l1 + l2)] as const,
    components: [v1, { x: -v1.y, y: v1.x }] as const,
  };
}

/** Variance of the points projected on the unit direction at angle theta: u' C u. */
export const varianceAlong = ([a, b, c]: readonly [number, number, number], theta: number) =>
  a * Math.cos(theta) ** 2 + 2 * b * Math.cos(theta) * Math.sin(theta) + c * Math.sin(theta) ** 2;

export const ANGLE = (28 * Math.PI) / 180;

/** A cloud stretched along ANGLE: spread 1.5 along it, `minor` across it, centred away from the origin. */
export function cloud(minor: number, n = 80, seed = 5): Point[] {
  const rand = rng(seed);
  return Array.from({ length: n }, () => {
    const t = gaussian(rand) * 1.5;
    const u = gaussian(rand) * minor;
    return { x: 0.8 + t * Math.cos(ANGLE) - u * Math.sin(ANGLE), y: 0.5 + t * Math.sin(ANGLE) + u * Math.cos(ANGLE) };
  });
}

const W = 560;
const H = 360;
const DOMAIN: Domain = { x: [-5, 5], y: [-3, 3] };
const s = scales(DOMAIN, W, H);
const SWEEP = 12; // candidate directions, 15 degrees apart
const FRAMES = SWEEP + 5; // raw, centred, sweep..., components, projection lines, projected
const px = (p: Point): [number, number] => [s.sx(p.x), s.sy(p.y)];
const along = (u: Point, t: number): Point => ({ x: u.x * t, y: u.y * t });
/** The full line through the origin along u, clipped to the plot. */
const axisLine = (u: Point) => {
  const t = Math.min(DOMAIN.x[1] / Math.max(Math.abs(u.x), 1e-9), DOMAIN.y[1] / Math.max(Math.abs(u.y), 1e-9));
  return pathOf([px(along(u, -t)), px(along(u, t))]);
};

/** A line with an open arrowhead, as one path. */
function arrow(to: Point) {
  const [x1, y1] = px({ x: 0, y: 0 });
  const [x2, y2] = px(to);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const head = (d: number): [number, number] => [x2 - 10 * Math.cos(ang + d), y2 - 10 * Math.sin(ang + d)];
  return `${pathOf([[x1, y1], [x2, y2]])} ${pathOf([head(0.45), [x2, y2], head(-0.45)])}`;
}

function Visual() {
  const [minor, setMinor] = useState(0.5);
  const data = useMemo(() => cloud(minor), [minor]);
  const r = useMemo(() => pca(data), [data]);
  const st = useStepper(FRAMES, 650);
  const f = st.frame;
  const [v1, v2] = r.components;
  // Arrows reach 1.5 standard deviations along each component.
  const [len1, len2] = [1.5 * Math.sqrt(r.variances[0]), 1.5 * Math.sqrt(r.variances[1])];
  const centred = data.map((p) => ({ x: p.x - r.mean.x, y: p.y - r.mean.y }));
  const onPc1 = centred.map((p) => along(v1, p.x * v1.x + p.y * v1.y));
  const shown = f === 0 ? data : f === FRAMES - 1 ? onPc1 : centred;
  const mark = f === 0 ? r.mean : { x: 0, y: 0 };
  const theta = ((f - 2) * Math.PI) / SWEEP;
  const sweeping = f >= 2 && f < 2 + SWEEP;
  const u = { x: Math.cos(theta), y: Math.sin(theta) };
  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

  let caption = 'Raw data. The cross marks the mean.';
  if (f === 1) caption = 'Centre the data: subtract the mean so the cloud sits on the origin.';
  if (sweeping) caption = 'Try directions: the variance of the points projected onto the dashed line changes with its angle.';
  if (f === FRAMES - 3) caption = 'The eigenvectors of the covariance matrix: PC1 has the largest variance, PC2 is perpendicular.';
  if (f === FRAMES - 2) caption = 'Project each point straight onto PC1.';
  if (f === FRAMES - 1) caption = `Each point is now one number, its position along PC1, keeping ${pct(r.explained[0])} of the variance.`;

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Spread across the main axis" value={minor} min={0.2} max={1.2} step={0.1} onChange={setMinor} format={(v) => v.toFixed(1)} />
      </div>
      <Plot
        domain={DOMAIN}
        width={W}
        height={H}
        xLabel="x1"
        yLabel="x2"
        label={`PCA, step ${f} of ${FRAMES - 1}. PC1 explains ${pct(r.explained[0])} of the variance.`}
      >
        {f >= FRAMES - 2 ? (
          <path
            className={`${styles.line} ${styles.dashed}`}
            data-tone="muted"
            strokeWidth={1.5}
            d={axisLine(v1)}
          />
        ) : null}
        {f >= FRAMES - 2
          ? onPc1.map((q, i) => (
              <path key={`p${i}`} className={styles.line} data-tone="muted" strokeWidth={1} opacity={0.5} d={pathOf([px(shown[i]!), px(q)])} />
            ))
          : null}
        {shown.map((p, i) => (
          <circle key={i} className={styles.point} data-tone="primary" cx={s.sx(p.x)} cy={s.sy(p.y)} r={4} opacity={0.8} />
        ))}
        {sweeping ? (
          <path className={`${styles.line} ${styles.dashed}`} data-tone="accent" d={axisLine(u)} />
        ) : null}
        {f >= FRAMES - 3 ? (
          <>
            <path className={styles.line} data-tone="accent" d={arrow(along(v1, len1))} />
            <path className={styles.line} data-tone="success" d={arrow(along(v2, len2))} />
            {/* PC1's label sits beside its tip, off the line the points will land on. */}
            <text className={styles.markLabel} {...labelAt({ x: v1.x * len1 + v2.x * 0.4, y: v1.y * len1 + v2.y * 0.4 })}>
              PC1
            </text>
            <text className={styles.markLabel} {...labelAt(along(v2, len2 + 0.35))}>
              PC2
            </text>
          </>
        ) : null}
        {f < FRAMES - 3 ? (
          <path
            className={local.mark}
            d={`M${s.sx(mark.x) - 6} ${s.sy(mark.y)} L${s.sx(mark.x) + 6} ${s.sy(mark.y)} M${s.sx(mark.x)} ${s.sy(mark.y) - 6} L${s.sx(mark.x)} ${s.sy(mark.y) + 6}`}
          />
        ) : null}
      </Plot>
      <Readout
        items={
          sweeping
            ? [
                ['angle', `${Math.round((theta * 180) / Math.PI)}°`],
                ['variance along line', varianceAlong(r.cov, theta).toFixed(2)],
                ['largest possible', r.variances[0].toFixed(2)],
              ]
            : [
                ['PC1 explained', pct(r.explained[0])],
                ['PC2 explained', pct(r.explained[1])],
              ]
        }
      />
      <StepperControls stepper={st} />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

const labelAt = (p: Point) => ({ x: s.sx(p.x), y: s.sy(p.y) + 4, textAnchor: 'middle' as const });

export const pcaAlgorithm: MlAlgorithm = {
  id: 'pca',
  name: 'Principal component analysis',
  group: 'Unsupervised learning',
  summary: 'Finds the directions along which the data varies most, so it can be described with fewer numbers.',
  steps: [
    'Centre the data by subtracting the mean of each feature (and usually scale each feature too).',
    'Compute the covariance matrix of the features.',
    'Its eigenvectors are the principal components; each eigenvalue is the variance along that direction.',
    'Keep the top components and project the data onto them to reduce the dimension.',
  ],
  formula: 'C = (1 / (n - 1)) * Xc^T Xc\nC v_k = lambda_k v_k\nexplained_k = lambda_k / sum of lambdas\nz = Xc v_1',
  notes: [
    'Standardise features first, or the feature with the largest units dominates the first component.',
    'Choose how many components to keep from the cumulative explained variance, for example 95%.',
    'PCA only finds linear structure, and components are not guaranteed to be meaningful features. In practice it is computed with the SVD of the centred data.',
  ],
  Visual,
};
