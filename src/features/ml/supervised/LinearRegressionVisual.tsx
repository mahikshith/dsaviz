'use client';

import { useMemo, useState } from 'react';
import { Plot, type Domain } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import styles from '../ml.module.css';
import s from './supervised.module.css';
import { boxLine } from './geometry';
import { LINE_DATA, fitLine } from './linearRegression';
import { num, pathOf, plotScales } from './shared';

const DOMAIN: Domain = { x: [-4.5, 4.5], y: [-5, 9] };
const EPOCHS = 60;

function LinearRegressionVisual() {
  const [rate, setRate] = useState(0.05);
  const { frames, diverged } = useMemo(() => fitLine(LINE_DATA, rate, EPOCHS), [rate]);
  const stepper = useStepper(frames.length, 250);
  const i = Math.min(stepper.frame, frames.length - 1);
  const f = frames[i]!;
  const prev = frames[i - 1];
  const last = i === frames.length - 1;

  const { sx, sy, pad } = plotScales(DOMAIN);
  const clampY = (y: number) => Math.max(DOMAIN.y[0], Math.min(DOMAIN.y[1], y));
  const fit = boxLine(f.w, -1, f.b, DOMAIN);

  // Loss sparkline in the empty top-left corner: label on the left, curve on the right, scaled to the starting loss.
  const box = { x: pad + 8, y: pad + 8, w: 160, h: 40 };
  const top = frames[0]!.mse;
  const spark = frames.slice(0, i + 1).map((fr, k) => ({
    x: box.x + 44 + (k / EPOCHS) * (box.w - 54),
    y: box.y + box.h - 8 - (Math.min(fr.mse, top) / top) * (box.h - 16),
  }));

  let caption: string;
  if (i === 0) caption = 'Start with slope 0 and intercept 0. The dashed lines are the residuals that the loss squares and averages.';
  else if (diverged && last) caption = 'The learning rate is too large: every update overshoots and the error grows without limit.';
  else if (prev && f.mse > prev.mse) caption = 'The error went up: this step overshot. A smaller learning rate avoids that.';
  else if (last)
    caption =
      prev && prev.mse - f.mse < 1e-4
        ? `Settled at ŷ = ${num(f.w)}x + ${num(f.b)}: further epochs barely change the error.`
        : `After ${i} epochs the error is still falling: the learning rate is small.`;
  else caption = `Each epoch averages the gradient over all ${LINE_DATA.length} points, then moves slope and intercept one step.`;

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Learning rate η" value={rate} min={0.005} max={0.3} step={0.005} onChange={setRate} format={(v) => v.toFixed(3)} />
      </div>
      <Plot domain={DOMAIN} xLabel="x" yLabel="y" label={`${LINE_DATA.length} points and the line ŷ = ${num(f.w)}x + ${num(f.b)} after ${i} epochs, mean squared error ${num(f.mse)}.`}>
        {LINE_DATA.map((p, k) => (
          <path key={k} className={s.guide} d={`M${sx(p.x)} ${sy(p.y)}V${sy(clampY(f.w * p.x + f.b))}`} />
        ))}
        {LINE_DATA.map((p, k) => (
          <circle key={k} className={styles.point} data-tone="primary" cx={sx(p.x)} cy={sy(p.y)} r={4.5} />
        ))}
        {fit ? <path className={styles.line} data-tone="accent" d={`M${sx(fit[0].x)} ${sy(fit[0].y)}L${sx(fit[1].x)} ${sy(fit[1].y)}`} /> : null}
        <rect className={s.inset} x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
        <text className={styles.axisLabel} x={box.x + 8} y={box.y + box.h / 2 + 4}>
          MSE
        </text>
        <path className={s.spark} d={pathOf(spark)} />
      </Plot>
      <Readout
        items={[
          ['epoch', i],
          ['slope w', num(f.w)],
          ['intercept b', num(f.b)],
          ['MSE', num(f.mse)],
        ]}
      />
      <StepperControls stepper={stepper} label="Epoch" />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

export const linearRegression: MlAlgorithm = {
  id: 'linear-regression',
  name: 'Linear regression',
  group: 'Foundations',
  summary: 'Linear regression fits the straight line y = w·x + b that keeps the squared vertical errors as small as possible.',
  steps: [
    'Start with any slope w and intercept b; here both are zero.',
    'Predict ŷ = w·x + b for every point and measure the residuals y − ŷ.',
    'The loss is the mean of the squared residuals (MSE).',
    'Compute the gradient of the MSE with respect to w and b, and step both against it.',
    'One pass over all points is an epoch; repeat until the loss stops falling.',
  ],
  formula: 'MSE = (1/n) Σ (ŷᵢ − yᵢ)²\nw ← w − η · (2/n) Σ (ŷᵢ − yᵢ) · xᵢ\nb ← b − η · (2/n) Σ (ŷᵢ − yᵢ)',
  notes: [
    'There is also an exact answer (the normal equation); gradient descent matters when there are many features or rows.',
    'Scale features first. With very different ranges one weight learns much faster than the other and the safe learning rate shrinks.',
    'Squaring punishes large errors heavily, so a few outliers can tilt the line.',
  ],
  Visual: LinearRegressionVisual,
};
