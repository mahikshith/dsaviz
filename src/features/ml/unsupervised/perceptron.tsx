'use client';

import { useMemo, useState } from 'react';
import { Segmented } from '@/features/player/Segmented';
import { rng, type Labeled, type Point } from '../data';
import { CLASS_TONE, Plot, scales, type Domain } from '../Plot';
import { Readout, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import { gridCenters, pathOf, Shade } from './common';
import { XorView } from './mlp';
import styles from '../ml.module.css';
import local from './local.module.css';

export type PFrame = { w: [number, number]; b: number; picked: number | null; epoch: number; mistakes: number };

const score = (f: { w: [number, number]; b: number }, p: Point) => f.w[0] * p.x + f.w[1] * p.y + f.b;
const sign = (label: number) => (label === 1 ? 1 : -1);
const mistakesOf = (f: { w: [number, number]; b: number }, data: Labeled[]) => data.filter((p) => sign(p.label) * score(f, p) <= 0).length;

/** The perceptron rule: sweep the data; every misclassified point nudges w and b toward classifying it correctly. */
export function perceptron(data: Labeled[], { lr = 0.3, w0 = [0.3, -1] as [number, number], b0 = 0.6, maxUpdates = 120, maxEpochs = 50 } = {}) {
  let cur = { w: w0, b: b0 };
  const frames: PFrame[] = [{ ...cur, picked: null, epoch: 0, mistakes: mistakesOf(cur, data) }];
  let converged = false;
  for (let epoch = 1; epoch <= maxEpochs && !converged && frames.length <= maxUpdates; epoch++) {
    converged = true;
    for (let i = 0; i < data.length && frames.length <= maxUpdates; i++) {
      const p = data[i]!;
      const y = sign(p.label);
      if (y * score(cur, p) > 0) continue;
      converged = false;
      cur = { w: [cur.w[0] + lr * y * p.x, cur.w[1] + lr * y * p.y], b: cur.b + lr * y };
      frames.push({ ...cur, picked: i, epoch, mistakes: mistakesOf(cur, data) });
    }
  }
  return { frames, converged };
}

/** Points labelled by the side of a hidden line they fall on, with a thin empty margin so the data is separable. */
const DATA: Labeled[] = (() => {
  const rand = rng(2);
  const out: Labeled[] = [];
  while (out.length < 50) {
    const x = -4.5 + rand() * 9;
    const y = -2.6 + rand() * 5.2;
    const side = (0.45 * x + 0.89 * y - 0.2) / Math.hypot(0.45, 0.89);
    if (Math.abs(side) > 0.15) out.push({ x, y, label: side > 0 ? 1 : 0 });
  }
  return out;
})();
const W = 560;
const H = 360;
const DOMAIN: Domain = { x: [-5, 5], y: [-3, 3] };
const CELLS = gridCenters(DOMAIN);
const s = scales(DOMAIN, W, H);

/** The line w.x + b = 0 clipped to the plot, or null if it misses it. */
function boundary(f: PFrame) {
  const [[x0, x1], [y0, y1]] = [DOMAIN.x, DOMAIN.y];
  const [a, b] = f.w;
  const hits: Point[] = [];
  if (Math.abs(b) > 1e-9) for (const x of [x0, x1]) hits.push({ x, y: -(a * x + f.b) / b });
  if (Math.abs(a) > 1e-9) for (const y of [y0, y1]) hits.push({ x: -(b * y + f.b) / a, y });
  const inside = hits.filter((p) => p.x >= x0 - 1e-9 && p.x <= x1 + 1e-9 && p.y >= y0 - 1e-9 && p.y <= y1 + 1e-9);
  if (inside.length < 2) return null;
  inside.sort((p, q) => p.x - q.x || p.y - q.y);
  const [p, q] = [inside[0]!, inside[inside.length - 1]!];
  return pathOf([
    [s.sx(p.x), s.sy(p.y)],
    [s.sx(q.x), s.sy(q.y)],
  ]);
}

function PerceptronView() {
  const run = useMemo(() => perceptron(DATA), []);
  const st = useStepper(run.frames.length, 650);
  const f = run.frames[st.frame]!;
  const probs = useMemo(() => CELLS.map((c) => (score(f, c) > 0 ? 0.8 : 0.2)), [f]);
  const picked = f.picked === null ? null : DATA[f.picked]!;
  const d = boundary(f);

  let caption = 'Start from an arbitrary line. Points on the wrong side are mistakes.';
  if (picked) caption = 'The ringed point was on the wrong side, so w moves by lr × y × x and the line turns toward it.';
  if (st.atEnd && run.converged) caption = `Converged after ${st.frame} updates: every point is on the correct side.`;

  return (
    <>
      <Plot
        domain={DOMAIN}
        width={W}
        height={H}
        xLabel="x1"
        yLabel="x2"
        label={`Perceptron after ${st.frame} updates: ${f.mistakes} points misclassified.`}
      >
        <Shade domain={DOMAIN} width={W} height={H} probs={probs} />
        {d ? <path className={styles.line} data-tone="primary" d={d} /> : null}
        {DATA.map((p, i) => (
          <circle key={i} className={styles.point} data-tone={CLASS_TONE[p.label]} cx={s.sx(p.x)} cy={s.sy(p.y)} r={4.5} />
        ))}
        {picked ? <circle className={local.ring} cx={s.sx(picked.x)} cy={s.sy(picked.y)} r={9} /> : null}
      </Plot>
      <Readout
        items={[
          ['updates', st.frame],
          ['epoch', f.epoch],
          ['misclassified', f.mistakes],
        ]}
      />
      <StepperControls stepper={st} label="Update" />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

function Visual() {
  const [mode, setMode] = useState('linear');
  return (
    <>
      <div className={styles.settings}>
        <Segmented
          label="Model and data"
          small
          value={mode}
          onChange={setMode}
          options={[
            { value: 'linear', label: 'Perceptron, separable data' },
            { value: 'xor', label: 'Two-layer network, XOR' },
          ]}
        />
      </div>
      {mode === 'linear' ? <PerceptronView /> : <XorView />}
    </>
  );
}

export const perceptronAlgorithm: MlAlgorithm = {
  id: 'perceptron',
  name: 'Perceptron and a tiny network',
  group: 'Neural networks',
  summary: 'A single neuron that learns a straight-line boundary from its mistakes, and the hidden layer that lets a network bend it.',
  steps: [
    'The perceptron predicts the class from the sign of w · x + b.',
    'Go through the points; when one is misclassified, add lr × y × x to w and lr × y to b.',
    'On linearly separable data this stops after a finite number of updates.',
    'XOR is not linearly separable. A hidden layer with a non-linear activation, trained by backpropagation, can separate it.',
  ],
  formula:
    'predict:  sign(w · x + b)\nmistake:  w += lr * y * x,  b += lr * y\n\nnetwork:  h = tanh(W1 x + b1)\n          p = sigmoid(w2 · h + b2)\nbackprop: dL/dz = p - y, then chain rule',
  notes: [
    'The perceptron convergence theorem only holds for separable data; otherwise it keeps cycling. Logistic regression or an SVM is the usual fix.',
    'Stacking linear layers without an activation is still linear, so the non-linearity is what lets a network fit XOR.',
    'Backpropagation is the chain rule applied from the output back to each weight; gradient descent then takes a small step against the gradient.',
  ],
  Visual,
};
