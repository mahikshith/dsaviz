'use client';

import { useMemo, useState } from 'react';
import { CLASS_TONE, Plot } from '../Plot';
import { Readout, Slider, StepperControls, useStepper } from '../Stepper';
import type { MlAlgorithm } from '../types';
import styles from '../ml.module.css';
import s from './supervised.module.css';
import { TREE_DATA, growTree, leavesAt, outline } from './decisionTree';
import { CLASSIFY_DOMAIN as DOMAIN } from './geometry';
import { CLASS_NAME, ClassMark, num, plotScales } from './shared';

function DecisionTreeVisual() {
  const [depth, setDepth] = useState(3);
  const { root, splits } = useMemo(() => growTree(TREE_DATA, depth, DOMAIN), [depth]);
  const stepper = useStepper(splits.length + 1, 1000);
  const applied = Math.min(stepper.frame, splits.length);
  const leaves = leavesAt(root, applied);
  const newest = splits[applied - 1];
  const correct = leaves.reduce((n, leaf) => n + leaf.counts[leaf.majority]!, 0);

  const { sx, sy } = plotScales(DOMAIN);
  const cut = newest?.split;
  const caption =
    newest && cut
      ? `Cut ${applied}: ${cut.axis} ≤ ${num(cut.t)} lowers Gini from ${num(newest.gini)} to ${num(cut.giniAfter)} (yes side ${num(cut.left.gini)}, no side ${num(cut.right.gini)}).`
      : `The root holds all ${TREE_DATA.length} points with Gini ${num(root.gini)}. Each step adds the cut that lowers impurity the most.`;

  return (
    <>
      <div className={styles.settings}>
        <Slider label="Max depth" value={depth} min={1} max={6} onChange={setDepth} />
      </div>
      <Plot
        domain={DOMAIN}
        xLabel="x"
        yLabel="y"
        label={`Class A (circles) and class B (squares). ${applied} cuts so far make ${leaves.length} regions, each shaded by its majority class.`}
      >
        {leaves.map(({ box, majority }) => (
          <rect
            key={`${box.x0} ${box.y0} ${box.x1} ${box.y1}`}
            className={styles.area}
            data-tone={CLASS_TONE[majority]}
            x={sx(box.x0)}
            y={sy(box.y1)}
            width={sx(box.x1) - sx(box.x0)}
            height={sy(box.y0) - sy(box.y1)}
          />
        ))}
        {splits.slice(0, applied).map(({ box, split }, k) =>
          split ? (
            <line
              key={k}
              className={s.split}
              data-new={k === applied - 1 || undefined}
              x1={sx(split.axis === 'x' ? split.t : box.x0)}
              x2={sx(split.axis === 'x' ? split.t : box.x1)}
              y1={sy(split.axis === 'y' ? split.t : box.y0)}
              y2={sy(split.axis === 'y' ? split.t : box.y1)}
            />
          ) : null,
        )}
        {TREE_DATA.map((p, k) => (
          <ClassMark key={k} cx={sx(p.x)} cy={sy(p.y)} label={p.label} />
        ))}
      </Plot>
      <Readout
        items={[
          ['cuts', applied],
          ['leaves', leaves.length],
          ['last cut', cut ? `${cut.axis} ≤ ${num(cut.t)}` : '–'],
          ['training accuracy', `${Math.round((correct / TREE_DATA.length) * 100)}%`],
        ]}
      />
      <StepperControls stepper={stepper} label="Cut" />
      <p className={styles.caption}>{caption}</p>
      <pre className={s.rules} aria-label="Rules so far">
        {outline(root, applied, CLASS_NAME).join('\n')}
      </pre>
    </>
  );
}

export const decisionTree: MlAlgorithm = {
  id: 'decision-tree',
  name: 'Decision tree',
  group: 'Supervised learning',
  summary: 'A decision tree classifies a point by asking a short series of yes-or-no questions about its features.',
  steps: [
    'Start with all training points in one node, the root.',
    'For every feature and threshold, measure the weighted Gini impurity of the two groups the cut would make.',
    'Keep the cut that lowers impurity the most and split the node into two children.',
    'Repeat on each child until it is pure or the tree reaches its maximum depth.',
    'Each leaf predicts the majority class of the training points that reach it.',
  ],
  formula: 'Gini = 1 − Σₖ pₖ²\ncost = (nL/n)·Gini(L) + (nR/n)·Gini(R)',
  notes: [
    'Trees need no feature scaling and are easy to explain, but every boundary is parallel to an axis.',
    'A deep tree can memorise the training data: training accuracy reaches 100% while new data suffers. Limit depth or leaf size, or prune.',
    'Splitting is greedy: each cut is the best one now, not necessarily part of the best tree.',
    'Random forests and gradient boosting combine many trees to reduce this variance.',
  ],
  Visual: DecisionTreeVisual,
};
