'use client';

import { useMemo, useState } from 'react';
import { Segmented } from '@/features/player/Segmented';
import { Plot } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import styles from '../ml.module.css';
import s from './supervised.module.css';
import { CURVES, descend } from './gradientDescent';
import { num, pathOf, plotScales } from './shared';

type CurveId = keyof typeof CURVES;
const MAX_STEPS = 60;

function GradientDescentVisual() {
  const [curveId, setCurveId] = useState<CurveId>('bowl');
  const [rate, setRate] = useState(0.1);
  const curve = CURVES[curveId];
  const { domain } = curve;
  // Stop as soon as w leaves the plot: on these curves that only happens when the steps keep growing.
  const { frames, outcome } = useMemo(() => descend(curve, curve.start, rate, MAX_STEPS, domain.x[1]), [curve, rate, domain]);
  const stepper = useStepper(frames.length, 350);
  const i = Math.min(stepper.frame, frames.length - 1);
  const cur = frames[i]!;
  const prev = frames[i - 1];
  const last = i === frames.length - 1;

  const { sx, sy } = plotScales(domain);
  const clamp = (v: number, [lo, hi]: [number, number]) => Math.max(lo, Math.min(hi, v));
  const px = (w: number) => ({ x: sx(clamp(w, domain.x)), y: sy(clamp(curve.f(w), domain.y)) });
  const [x0, x1] = domain.x;
  const curvePath = pathOf(Array.from({ length: 121 }, (_, k) => px(x0 + ((x1 - x0) * k) / 120)));
  const ball = px(cur.w);
  const offPlot = Math.abs(cur.w) > x1;

  // Tangent through the ball, a fixed 72 px long, so the slope is visible at any steepness.
  const dx = sx(1) - sx(0);
  const dy = (sy(0) - sy(1)) * cur.grad;
  const len = Math.hypot(dx, dy) || 1;
  const tx = (dx / len) * 36;
  const ty = (dy / len) * 36;

  let caption: string;
  if (i === 0) caption = `Start at w = ${num(cur.w)}. Each step moves w against the slope, scaled by the learning rate.`;
  else if (last && outcome === 'diverged') caption = 'The weight jumped off the plot: each step overshoots further, so the learning rate is too large.';
  else if (last && outcome === 'converged')
    caption =
      curveId === 'valleys' && cur.w > 0
        ? `Stopped at w = ${num(cur.w)}, a local minimum. The deeper valley on the left was never reached.`
        : `Converged at w = ${num(cur.w)}: the slope is almost zero, so the steps stop.`;
  else if (prev && Math.sign(prev.grad) !== Math.sign(cur.grad))
    caption = last ? `Still bouncing across the valley after ${MAX_STEPS} steps: lower the learning rate.` : 'This step jumped past the bottom, so the slope changed sign.';
  else if (last) caption = `Not at the bottom after ${MAX_STEPS} steps: the learning rate is too small.`;
  else caption = `Downhill: the slope is ${num(prev?.grad ?? 0)}, so w moved by ${num(cur.w - (prev?.w ?? cur.w))}.`;

  return (
    <>
      <div className={styles.settings}>
        <Segmented
          label="Loss curve"
          value={curveId}
          options={(Object.keys(CURVES) as CurveId[]).map((id) => ({ value: id, label: CURVES[id].name }))}
          onChange={(v) => setCurveId(v as CurveId)}
          small
        />
        <Slider label="Learning rate η" value={rate} min={0.01} max={1.2} step={0.01} onChange={setRate} format={(v) => v.toFixed(2)} />
      </div>
      <Plot
        domain={domain}
        xLabel="weight w"
        yLabel="loss L(w)"
        label={`${curve.name} loss curve. After ${i} steps w is ${num(cur.w)} and the loss is ${num(cur.loss)}.`}
      >
        <path className={styles.line} data-tone="muted" d={curvePath} />
        <path className={s.guide} d={pathOf(frames.slice(0, i + 1).map((f) => px(f.w)))} />
        {frames.slice(0, i).map((f, k) => (
          <circle key={k} className={styles.point} data-tone="muted" cx={px(f.w).x} cy={px(f.w).y} r={3} />
        ))}
        {offPlot ? null : <path className={s.link} data-tone="accent" d={`M${ball.x - tx} ${ball.y - ty}L${ball.x + tx} ${ball.y + ty}`} />}
        <circle className={styles.point} data-tone={offPlot ? 'danger' : 'primary'} cx={ball.x} cy={ball.y} r={7} />
      </Plot>
      <Readout
        items={[
          ['step', i],
          ['w', num(cur.w)],
          ['loss', num(cur.loss)],
          ['gradient', num(cur.grad)],
        ]}
      />
      <StepperControls stepper={stepper} />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

export const gradientDescent: MlAlgorithm = {
  id: 'gradient-descent',
  name: 'Gradient descent',
  group: 'Foundations',
  summary: 'Gradient descent lowers a loss by repeatedly moving the weights a small step downhill along the slope.',
  steps: [
    'Start from some value of the weight w.',
    'Compute the gradient: the slope of the loss at w.',
    'Move w a step in the opposite direction, scaled by the learning rate η.',
    'Repeat until the gradient is close to zero or the step budget runs out.',
  ],
  formula: 'w ← w − η · dL/dw',
  notes: [
    'The learning rate is the main setting: too small is slow, too large overshoots and can diverge.',
    'On a non-convex loss it stops in whichever valley is downhill from the start, which may be a local minimum.',
    'Real training uses mini-batches (stochastic gradient descent), often with momentum or Adam, but each step is the same idea.',
  ],
  Visual: GradientDescentVisual,
};
