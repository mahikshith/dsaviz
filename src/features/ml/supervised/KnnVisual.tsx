'use client';

import { useMemo, useState } from 'react';
import type { Point } from '../data';
import { CLASS_TONE, Plot } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import styles from '../ml.module.css';
import s from './supervised.module.css';
import { CLASSIFY_DOMAIN as DOMAIN } from './geometry';
import { KNN_DATA, nearest, vote } from './knn';
import { CLASS_NAME, ClassMark, num, plotScales } from './shared';

const CLASSES = 3;
const clamp = (v: number, [lo, hi]: [number, number]) => Math.max(lo, Math.min(hi, v));

function KnnVisual() {
  const [k, setK] = useState(5);
  const [query, setQuery] = useState<Point>({ x: 0.5, y: -0.3 });
  const ranked = useMemo(() => nearest(KNN_DATA, query, k), [query, k]);
  // Frame 0: the query alone. Frames 1..k: one more neighbour each. Frame k + 1: the vote.
  const stepper = useStepper(k + 2, 700);
  const shown = Math.min(stepper.frame, k);
  const done = stepper.frame > k;
  const { counts, winner } = vote(ranked.slice(0, shown), CLASSES);
  const newest = ranked[shown - 1];
  const tied = counts.filter((c) => c === counts[winner]).length > 1;

  const { sx, sy } = plotScales(DOMAIN);
  const q = { x: sx(query.x), y: sy(query.y) };
  const reach = newest?.d ?? 0;

  const caption = done
    ? `Majority vote: class ${CLASS_NAME[winner]} with ${counts[winner]} of ${k} votes${tied ? ', a tie broken by the nearest neighbour' : ''}.`
    : newest
      ? `Neighbour ${shown} of ${k}: class ${CLASS_NAME[newest.point.label]} at distance ${num(newest.d)}.`
      : 'Click anywhere on the plot to move the query point, then step to find its nearest neighbours.';

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Neighbours k" value={k} min={1} max={15} onChange={setK} />
      </div>
      <Plot
        domain={DOMAIN}
        xLabel="feature 1"
        yLabel="feature 2"
        label={`Classes A (circles), B (squares) and C (triangles). Query point at ${num(query.x, 1)}, ${num(query.y, 1)}. ${shown} of ${k} nearest neighbours shown${done ? `; predicted class ${CLASS_NAME[winner]}` : ''}.`}
        onPointer={(x, y) => setQuery({ x: clamp(x, DOMAIN.x), y: clamp(y, DOMAIN.y) })}
      >
        <ellipse className={s.guide} cx={q.x} cy={q.y} rx={sx(reach) - sx(0)} ry={sy(0) - sy(reach)} />
        {ranked.slice(0, shown).map((n) => (
          <path key={n.index} className={s.link} data-tone={CLASS_TONE[n.point.label]} d={`M${q.x} ${q.y}L${sx(n.point.x)} ${sy(n.point.y)}`} />
        ))}
        {KNN_DATA.map((p, i) => (
          <ClassMark key={i} cx={sx(p.x)} cy={sy(p.y)} label={p.label} />
        ))}
        <circle className={s.ring} cx={q.x} cy={q.y} r={10} />
        {done ? <ClassMark cx={q.x} cy={q.y} label={winner} r={6} /> : <circle className={styles.point} data-tone="muted" cx={q.x} cy={q.y} r={4} />}
      </Plot>
      <Readout
        items={[
          ['neighbours', `${shown} of ${k}`],
          ['votes', counts.map((c, i) => `${CLASS_NAME[i]} ${c}`).join(' · ')],
          ['prediction', done ? `class ${CLASS_NAME[winner]}` : '–'],
        ]}
      />
      <StepperControls stepper={stepper} />
      <p className={styles.caption}>{caption}</p>
    </>
  );
}

export const knn: MlAlgorithm = {
  id: 'knn',
  name: 'K-nearest neighbours',
  group: 'Supervised learning',
  summary: 'K-nearest neighbours labels a new point with the most common class among the k training points closest to it.',
  steps: [
    'Store the training points; there is no other training step.',
    'For a new query point, compute its distance to every training point.',
    'Keep the k closest points.',
    'Predict the class that most of those k neighbours have.',
  ],
  formula: 'd(q, xᵢ) = ‖q − xᵢ‖\nŷ = most common label among the k smallest d(q, xᵢ)',
  notes: [
    'Small k follows noise (high variance); large k smooths too much (high bias). With two classes, an odd k avoids ties.',
    'Scale features first, or the feature with the largest range dominates the distance.',
    'Prediction compares the query with every stored point, so it is slow on large datasets; KD-trees or approximate search help.',
    'In many dimensions all distances look alike, so neighbours stop being meaningful.',
  ],
  Visual: KnnVisual,
};
