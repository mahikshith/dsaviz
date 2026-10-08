'use client';

import { useMemo } from 'react';
import { blobs, gaussian, rng, type Labeled, type Point } from '../data';
import { CLASS_TONE, Plot, scales, type Domain } from '../Plot';
import { Readout, StepperControls, useStepper } from '../Stepper';
import { gridCenters, Shade } from './common';
import styles from '../ml.module.css';

/** A 2-H-1 network: tanh hidden layer, sigmoid output. */
export type Net = { w1: [number, number][]; b1: number[]; w2: number[]; b2: number };

export function forward(net: Net, p: Point) {
  const h = net.w1.map(([a, b], j) => Math.tanh(a * p.x + b * p.y + net.b1[j]!));
  const z = h.reduce((s, v, j) => s + v * net.w2[j]!, net.b2);
  return { h, out: 1 / (1 + Math.exp(-z)) };
}

/** Full-batch gradient descent on cross-entropy loss; returns a snapshot of the network every `every` epochs. */
export function trainNet(data: Labeled[], { hidden = 4, epochs = 1500, every = 15, lr = 0.5, seed = 3 } = {}) {
  const rand = rng(seed);
  const net: Net = {
    w1: Array.from({ length: hidden }, () => [gaussian(rand) * 0.7, gaussian(rand) * 0.7]),
    b1: Array.from({ length: hidden }, () => gaussian(rand) * 0.1),
    w2: Array.from({ length: hidden }, () => gaussian(rand) * 0.7),
    b2: 0,
  };
  const copy = (): Net => ({ w1: net.w1.map(([a, b]) => [a, b]), b1: [...net.b1], w2: [...net.w2], b2: net.b2 });
  const snapshots = [copy()];
  const n = data.length;
  for (let e = 1; e <= epochs; e++) {
    const g = { w1: net.w1.map(() => [0, 0]), b1: net.b1.map(() => 0), w2: net.w2.map(() => 0), b2: 0 };
    for (const p of data) {
      const { h, out } = forward(net, p);
      const dz = out - p.label; // gradient of cross-entropy through the sigmoid
      g.b2 += dz;
      h.forEach((hj, j) => {
        g.w2[j]! += dz * hj;
        const dh = dz * net.w2[j]! * (1 - hj * hj); // back through tanh
        g.w1[j]![0]! += dh * p.x;
        g.w1[j]![1]! += dh * p.y;
        g.b1[j]! += dh;
      });
    }
    net.w1.forEach((w, j) => {
      w[0] -= (lr * g.w1[j]![0]!) / n;
      w[1] -= (lr * g.w1[j]![1]!) / n;
      net.b1[j]! -= (lr * g.b1[j]!) / n;
      net.w2[j]! -= (lr * g.w2[j]!) / n;
    });
    net.b2 -= (lr * g.b2) / n;
    if (e % every === 0) snapshots.push(copy());
  }
  return snapshots;
}

export function evaluate(net: Net, data: Labeled[]) {
  let loss = 0;
  let right = 0;
  for (const p of data) {
    const q = Math.min(Math.max(forward(net, p).out, 1e-9), 1 - 1e-9);
    loss -= p.label ? Math.log(q) : Math.log(1 - q);
    if ((q >= 0.5 ? 1 : 0) === p.label) right++;
  }
  return { loss: loss / data.length, accuracy: right / data.length };
}

/** XOR: opposite corners share a class, so no single straight line separates them. */
export const XOR_DATA: Labeled[] = blobs(
  13,
  [
    { x: -2.5, y: -1.3 },
    { x: 2.5, y: 1.3 },
    { x: -2.5, y: 1.3 },
    { x: 2.5, y: -1.3 },
  ],
  18,
  0.55,
).map((p) => ({ ...p, label: p.label < 2 ? 0 : 1 }));

const EVERY = 15;
const W = 560;
const H = 360;
const DOMAIN: Domain = { x: [-5, 5], y: [-3, 3] };
const CELLS = gridCenters(DOMAIN);
const s = scales(DOMAIN, W, H);

export function XorView() {
  const frames = useMemo(
    () =>
      trainNet(XOR_DATA, { every: EVERY }).map((net) => ({
        probs: CELLS.map((c) => forward(net, c).out),
        ...evaluate(net, XOR_DATA),
      })),
    [],
  );
  const st = useStepper(frames.length, 90);
  const f = frames[st.frame]!;
  const epoch = st.frame * EVERY;
  const acc = `${(f.accuracy * 100).toFixed(0)}%`;

  return (
    <>
      <Plot domain={DOMAIN} width={W} height={H} xLabel="x1" yLabel="x2" label={`Two-layer network on XOR data after ${epoch} epochs. Accuracy ${acc}.`}>
        <Shade domain={DOMAIN} width={W} height={H} probs={f.probs} />
        {XOR_DATA.map((p, i) => (
          <circle key={i} className={styles.point} data-tone={CLASS_TONE[p.label]} cx={s.sx(p.x)} cy={s.sy(p.y)} r={4.5} />
        ))}
      </Plot>
      <Readout
        items={[
          ['epoch', epoch],
          ['loss', f.loss.toFixed(3)],
          ['accuracy', acc],
        ]}
      />
      <StepperControls stepper={st} label="Snapshot" />
      <p className={styles.caption}>
        {st.frame === 0
          ? 'Random weights: the network is unsure everywhere.'
          : st.atEnd
            ? `${acc} correct. Four hidden units with tanh bend the boundary, which a single line cannot do.`
            : `Epoch ${epoch}: backpropagation nudges both layers downhill on the loss.`}
      </p>
    </>
  );
}
