'use client';

import { useMemo, useState } from 'react';
import { Plot } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import styles from '../ml.module.css';
import s from './supervised.module.css';
import { CLASSIFY_DOMAIN as DOMAIN, boxLine } from './geometry';
import { ClassMark, num, plotScales } from './shared';
import { SVM_DATA, marginWidth, trainSvm } from './svm';

const formatC = (logC: number) => {
  const c = 10 ** logC;
  return c < 10 ? c.toPrecision(2) : String(Math.round(c));
};

function SvmVisual() {
  // The slider moves C on a log scale, from about 0.3 to 100.
  const [logC, setLogC] = useState(1);
  const frames = useMemo(() => trainSvm(SVM_DATA, 10 ** logC), [logC]);
  const stepper = useStepper(frames.length, 150);
  const i = Math.min(stepper.frame, frames.length - 1);
  const f = frames[i]!;
  const last = i === frames.length - 1;

  const { sx, sy } = plotScales(DOMAIN);
  // w·x + b = level  ⇔  w·x + (b − level) = 0
  const linePath = (level: number) => {
    const ends = boxLine(f.w1, f.w2, f.b - level, DOMAIN);
    return ends ? `M${sx(ends[0].x)} ${sy(ends[0].y)}L${sx(ends[1].x)} ${sy(ends[1].y)}` : undefined;
  };
  const margin = marginWidth(f);
  const support = f.support.length;

  const caption =
    i === 0
      ? 'Start from a poor boundary. Points inside the dashed margin, or on the wrong side, push it.'
      : last
        ? `Finished: margin ${num(margin)} wide at C = ${formatC(logC)}. A larger C gives a narrower margin.`
        : `${support} support vectors (ringed) sit on or inside the margin; only they move the boundary.`;

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Penalty C" value={logC} min={-0.5} max={2} step={0.25} onChange={setLogC} format={formatC} />
      </div>
      <Plot
        domain={DOMAIN}
        xLabel="feature 1"
        yLabel="feature 2"
        label={`Class A (circles) and class B (squares). After ${i} epochs the margin is ${num(margin)} wide with ${support} support vectors.`}
      >
        {[-1, 1].map((level) => {
          const d = linePath(level);
          return d ? <path key={level} className={s.guide} d={d} /> : null;
        })}
        {linePath(0) ? <path className={s.boundary} d={linePath(0)} /> : null}
        {SVM_DATA.map((p, k) => (
          <ClassMark key={k} cx={sx(p.x)} cy={sy(p.y)} label={p.label} />
        ))}
        {f.support.map((k) => (
          <circle key={k} className={s.ring} cx={sx(SVM_DATA[k]!.x)} cy={sy(SVM_DATA[k]!.y)} r={9} />
        ))}
      </Plot>
      <Readout
        items={[
          ['epoch', i],
          ['margin', num(margin)],
          ['support vectors', support],
          ['accuracy', `${Math.round(f.accuracy * 100)}%`],
        ]}
      />
      <StepperControls stepper={stepper} label="Epoch" />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

export const svm: MlAlgorithm = {
  id: 'svm',
  name: 'Support vector machine',
  group: 'Supervised learning',
  summary: 'A linear support vector machine separates two classes with the line that leaves the widest margin to the nearest points.',
  steps: [
    'Label the classes +1 and −1 and score each point with f(x) = w·x + b.',
    'A point is safe when y·f(x) ≥ 1: on its own side and outside the margin.',
    'Points with y·f(x) < 1 pay hinge loss 1 − y·f(x) and pull the boundary toward them.',
    'The ½‖w‖² term keeps w small, which keeps the margin 2 / ‖w‖ wide.',
    'In the end only the points on or inside the margin, the support vectors, decide where the boundary sits.',
  ],
  formula: 'f(x) = w·x + b\nJ = ½‖w‖² + C·(1/n)·Σ max(0, 1 − yᵢ·f(xᵢ))\n∂J/∂w = w − C·(1/n)·Σ yᵢxᵢ  (only yᵢ·f(xᵢ) < 1)\nmargin width = 2 / ‖w‖',
  notes: [
    'C trades margin width against violations: a large C fits the training points tightly, a small C allows a wider margin with some points inside.',
    'Scale features first, because the margin is measured as a plain distance.',
    'For curved boundaries, the kernel trick lets the same method find a linear separator in a richer feature space.',
    'The output is a score, not a probability; calibrate it if you need probabilities.',
  ],
  Visual: SvmVisual,
};
