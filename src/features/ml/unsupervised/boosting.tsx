'use client';

import { useMemo, useState } from 'react';
import { gaussian, rng, type Point } from '../data';
import { Plot, scales, type Domain } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import { pathOf } from './common';
import styles from '../ml.module.css';

/** A depth-1 regression tree: one split, a constant on each side. */
export type Stump = { split: number; left: number; right: number };
export const stumpAt = (s: Stump, x: number) => (x < s.split ? s.left : s.right);

/** The stump with the lowest squared error on (xs, r). Leaves predict the mean of their side. */
export function fitStump(xs: number[], r: number[]): Stump {
  const order = xs.map((_, i) => i).sort((a, b) => xs[a]! - xs[b]!);
  const n = order.length;
  const total = r.reduce((s, v) => s + v, 0);
  let best: Stump = { split: Infinity, left: total / n, right: 0 };
  let bestScore = -Infinity;
  let sumL = 0;
  for (let k = 0; k < n - 1; k++) {
    const i = order[k]!;
    const j = order[k + 1]!;
    sumL += r[i]!;
    if (xs[i] === xs[j]) continue;
    const nL = k + 1;
    const sumR = total - sumL;
    // Minimising the squared error is the same as maximising sumL²/nL + sumR²/nR.
    const score = (sumL * sumL) / nL + (sumR * sumR) / (n - nL);
    if (score > bestScore) {
      bestScore = score;
      best = { split: (xs[i]! + xs[j]!) / 2, left: sumL / nL, right: sumR / (n - nL) };
    }
  }
  return best;
}

export type Boosted = { base: number; rate: number; stumps: Stump[]; mse: number[] };

/** Gradient boosting with squared error: start at the mean, then each stump fits the residuals and is added times `rate`. */
export function gradientBoost(points: Point[], rate: number, rounds: number): Boosted {
  const xs = points.map((p) => p.x);
  const base = points.reduce((s, p) => s + p.y, 0) / points.length;
  const pred = points.map(() => base);
  const mseOf = () => points.reduce((s, p, i) => s + (p.y - pred[i]!) ** 2, 0) / points.length;
  const mse = [mseOf()];
  const stumps: Stump[] = [];
  for (let t = 0; t < rounds; t++) {
    const stump = fitStump(
      xs,
      points.map((p, i) => p.y - pred[i]!),
    );
    stumps.push(stump);
    points.forEach((p, i) => (pred[i] = pred[i]! + rate * stumpAt(stump, p.x)));
    mse.push(mseOf());
  }
  return { base, rate, stumps, mse };
}

/** Prediction of the first `trees` trees. */
export const boostPredict = (m: Boosted, trees: number, x: number) =>
  m.stumps.slice(0, trees).reduce((f, s) => f + m.rate * stumpAt(s, x), m.base);

const DATA: Point[] = (() => {
  const rand = rng(11);
  return Array.from({ length: 40 }, (_, i) => {
    const x = 0.25 + (i * 9.5) / 39 + (rand() - 0.5) * 0.2;
    return { x, y: Math.sin(x * 0.9) * 1.8 + 0.15 * x + gaussian(rand) * 0.35 };
  });
})();
const ROUNDS = 40;
const W = 560;
const H = 360;
const DOMAIN: Domain = { x: [0, 10], y: [-4, 4] };
const XS = Array.from({ length: 201 }, (_, i) => (i * 10) / 200);
const s = scales(DOMAIN, W, H);

function Visual() {
  const [rate, setRate] = useState(0.3);
  const model = useMemo(() => gradientBoost(DATA, rate, ROUNDS), [rate]);
  // One curve per frame: the ensemble after 0, 1, ..., ROUNDS trees, sampled on a fixed grid so `d` can animate.
  const curves = useMemo(() => {
    const f = XS.map(() => model.base);
    const out = [f.slice()];
    for (const stump of model.stumps) {
      XS.forEach((x, i) => (f[i] = f[i]! + model.rate * stumpAt(stump, x)));
      out.push(f.slice());
    }
    return out.map((ys) => pathOf(XS.map((x, i) => [s.sx(x), s.sy(ys[i]!)])));
  }, [model]);
  const st = useStepper(ROUNDS + 1, 450);
  const k = st.frame;
  const newest = k > 0 ? model.stumps[k - 1]! : null;
  const mse = model.mse[k]!;

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Learning rate" value={rate} min={0.05} max={1} step={0.05} onChange={setRate} format={(v) => v.toFixed(2)} />
      </div>
      <Plot
        domain={DOMAIN}
        width={W}
        height={H}
        xLabel="x"
        yLabel="y"
        label={`Gradient boosting with ${k} trees at learning rate ${rate.toFixed(2)}. Training MSE ${mse.toFixed(3)}.`}
      >
        {DATA.map((p, i) => (
          <path
            key={`r${i}`}
            className={styles.line}
            data-tone="muted"
            strokeWidth={1}
            opacity={0.45}
            d={`M${s.sx(p.x).toFixed(1)} ${s.sy(p.y).toFixed(1)} L${s.sx(p.x).toFixed(1)} ${s.sy(boostPredict(model, k, p.x)).toFixed(1)}`}
          />
        ))}
        {newest ? (
          <path
            className={`${styles.line} ${styles.dashed}`}
            data-tone="accent"
            strokeWidth={2}
            d={pathOf(XS.map((x) => [s.sx(x), s.sy(model.rate * stumpAt(newest, x))]))}
          />
        ) : null}
        <path className={styles.line} data-tone="primary" d={curves[k]} />
        {DATA.map((p, i) => (
          <circle key={i} className={styles.point} data-tone="muted" cx={s.sx(p.x)} cy={s.sy(p.y)} r={4} />
        ))}
      </Plot>
      <Readout
        items={[
          ['trees', k],
          ['training MSE', mse.toFixed(3)],
        ]}
      />
      <StepperControls stepper={st} label="Tree" />
      <p className={styles.caption}>
        {newest
          ? `Tree ${k} splits at x = ${newest.split.toFixed(2)} to fit the residuals. The ensemble adds ${rate.toFixed(2)} times its output (dashed).`
          : 'Start from the mean of y. The grey lines are the residuals the first tree will fit.'}
      </p>
    </>
  );
}

export const gradientBoosting: MlAlgorithm = {
  id: 'gradient-boosting',
  name: 'Gradient boosting',
  group: 'Ensembles',
  summary: 'Builds a strong model by adding many small trees, each one trained to fix the errors the ensemble still makes.',
  steps: [
    'Start with a constant prediction: the mean of the targets.',
    'Compute the residuals, the gap between each target and the current prediction.',
    'Fit a small tree (here a single split) to those residuals.',
    'Add the tree to the ensemble, scaled down by the learning rate.',
    'Repeat. Each new tree corrects what the previous ones missed.',
  ],
  formula: 'F0(x) = mean(y)\nr_i = y_i - F_{m-1}(x_i)\nh_m = tree fitted to (x_i, r_i)\nF_m(x) = F_{m-1}(x) + lr * h_m(x)',
  notes: [
    'For squared error the residuals are exactly the negative gradient of the loss, which is where the name comes from. Other losses fit other gradients.',
    'A small learning rate needs more trees but usually generalises better. Too many trees overfit, so stop early on a validation set.',
    'XGBoost and LightGBM are optimised implementations of this idea, adding regularisation, second-order gradients and fast histogram-based splits.',
    'Boosting reduces bias by adding trees in sequence; a random forest reduces variance by averaging independent trees.',
  ],
  Visual,
};
