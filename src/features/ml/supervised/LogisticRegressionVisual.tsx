'use client';

import { useMemo, useState } from 'react';
import { CLASS_TONE, Plot } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import styles from '../ml.module.css';
import s from './supervised.module.css';
import { CLASSIFY_DOMAIN as DOMAIN, boxLine } from './geometry';
import { LOGISTIC_DATA, probability, trainLogistic } from './logisticRegression';
import { ClassMark, num, plotScales } from './shared';

const COLS = 24;
const ROWS = 14;

function LogisticRegressionVisual() {
  const [rate, setRate] = useState(0.5);
  const frames = useMemo(() => trainLogistic(LOGISTIC_DATA, rate), [rate]);
  const stepper = useStepper(frames.length, 200);
  const i = Math.min(stepper.frame, frames.length - 1);
  const f = frames[i]!;

  const { sx, sy, pad, width, height } = plotScales(DOMAIN);
  const cw = (width - 2 * pad) / COLS;
  const ch = (height - 2 * pad) / ROWS;
  const boundary = boxLine(f.w1, f.w2, f.b, DOMAIN);
  const wrong = Math.round((1 - f.accuracy) * LOGISTIC_DATA.length);

  const caption =
    i === 0
      ? 'Start from a poor boundary. Shading is the predicted chance of class B; stronger means more confident.'
      : wrong === 0
        ? 'Every point is on its correct side; the weights keep growing to make the predictions more confident.'
        : `${wrong} ${wrong === 1 ? 'point is' : 'points are'} on the wrong side. Each epoch moves the boundary to lower the log-loss.`;

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Learning rate η" value={rate} min={0.05} max={3} step={0.05} onChange={setRate} format={(v) => v.toFixed(2)} />
      </div>
      <Plot
        domain={DOMAIN}
        xLabel="feature 1"
        yLabel="feature 2"
        label={`Class A (circles) and class B (squares). After ${i} epochs the boundary classifies ${Math.round(f.accuracy * 100)}% of points correctly.`}
      >
        <g className={s.shade}>
          {Array.from({ length: COLS * ROWS }, (_, k) => {
            const c = k % COLS;
            const r = Math.floor(k / COLS);
            const x = pad + c * cw;
            const y = pad + r * ch;
            const p = probability(f, DOMAIN.x[0] + ((c + 0.5) / COLS) * (DOMAIN.x[1] - DOMAIN.x[0]), DOMAIN.y[1] - ((r + 0.5) / ROWS) * (DOMAIN.y[1] - DOMAIN.y[0]));
            return <rect key={k} x={x} y={y} width={cw} height={ch} data-tone={CLASS_TONE[p >= 0.5 ? 1 : 0]} style={{ fillOpacity: Math.abs(p - 0.5) * 0.5 }} />;
          })}
        </g>
        {boundary ? <path className={s.boundary} d={`M${sx(boundary[0].x)} ${sy(boundary[0].y)}L${sx(boundary[1].x)} ${sy(boundary[1].y)}`} /> : null}
        {LOGISTIC_DATA.map((p, k) => (
          <ClassMark key={k} cx={sx(p.x)} cy={sy(p.y)} label={p.label} />
        ))}
      </Plot>
      <Readout
        items={[
          ['epoch', i],
          ['log-loss', num(f.loss, 3)],
          ['accuracy', `${Math.round(f.accuracy * 100)}%`],
        ]}
      />
      <StepperControls stepper={stepper} label="Epoch" />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

export const logisticRegression: MlAlgorithm = {
  id: 'logistic-regression',
  name: 'Logistic regression',
  group: 'Supervised learning',
  summary: 'Logistic regression predicts the probability that a point belongs to a class by passing a weighted sum through the sigmoid function.',
  steps: [
    'Compute a score z = w₁·x₁ + w₂·x₂ + b for each point.',
    'Turn the score into a probability with the sigmoid, p = 1 / (1 + e^(−z)).',
    'Measure the log-loss: confident wrong answers cost the most.',
    'Step the weights against the gradient, which is simply (p − y) times the input.',
    'Predict class B where p ≥ 0.5; the line z = 0 is the decision boundary.',
  ],
  formula: 'p = σ(w·x + b),  σ(z) = 1 / (1 + e^(−z))\nL = −(1/n) Σ [yᵢ log pᵢ + (1 − yᵢ) log(1 − pᵢ)]\nw ← w − η · (1/n) Σ (pᵢ − yᵢ) · xᵢ',
  notes: [
    'Despite the name it is a classifier, and its boundary is always a straight line (a flat plane in more dimensions).',
    'The log-loss is convex, so gradient descent cannot get stuck in a local minimum.',
    'On perfectly separable data the weights grow without limit; L2 regularisation keeps them finite.',
    'Moving the 0.5 threshold trades precision against recall.',
  ],
  Visual: LogisticRegressionVisual,
};
