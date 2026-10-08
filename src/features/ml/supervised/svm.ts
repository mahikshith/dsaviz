import { blobs, type Labeled } from '../data';

/** Two classes with a clear gap and a couple of points near it. Label 0 is the −1 side, label 1 the +1 side. */
export const SVM_DATA: Labeled[] = blobs(21, [{ x: -1.7, y: -0.8 }, { x: 1.6, y: 0.9 }], 18, 0.75);

export type SvmFrame = {
  w1: number;
  w2: number;
  b: number;
  /** ½‖w‖²/C + mean hinge loss, the objective being minimised (scaled by 1/C). */
  objective: number;
  /** Indexes of points on or inside the margin: y·f(x) ≤ 1. */
  support: number[];
  accuracy: number;
};

const sign = (label: number) => (label ? 1 : -1);

function evaluate(data: Labeled[], w1: number, w2: number, b: number, c: number): SvmFrame {
  let hinge = 0;
  let correct = 0;
  const support: number[] = [];
  data.forEach((p, i) => {
    const m = sign(p.label) * (w1 * p.x + w2 * p.y + b);
    hinge += Math.max(0, 1 - m);
    if (m > 0) correct++;
    if (m <= 1 + 1e-3) support.push(i);
  });
  return { w1, w2, b, objective: (w1 * w1 + w2 * w2) / (2 * c) + hinge / data.length, support, accuracy: correct / data.length };
}

/**
 * Sub-gradient descent on ½‖w‖²/C + mean hinge loss (the usual ½‖w‖² + C·mean hinge, divided by C so one step
 * size works for every C). Only points with y·f(x) < 1 contribute to the gradient. The step shrinks as 1/√t.
 */
export function trainSvm(data: Labeled[], c: number, epochs = 100, rate = 0.5, init = { w1: 0.3, w2: -0.8, b: 0.4 }) {
  let { w1, w2, b } = init;
  const frames = [evaluate(data, w1, w2, b, c)];
  for (let t = 1; t <= epochs; t++) {
    let g1 = w1 / c;
    let g2 = w2 / c;
    let gb = 0;
    for (const p of data) {
      const y = sign(p.label);
      if (y * (w1 * p.x + w2 * p.y + b) < 1) {
        g1 -= (y * p.x) / data.length;
        g2 -= (y * p.y) / data.length;
        gb -= y / data.length;
      }
    }
    const eta = rate / Math.sqrt(t);
    w1 -= eta * g1;
    w2 -= eta * g2;
    b -= eta * gb;
    frames.push(evaluate(data, w1, w2, b, c));
  }
  return frames;
}

/** Distance between the two margin lines w·x + b = ±1. */
export const marginWidth = (f: Pick<SvmFrame, 'w1' | 'w2'>) => 2 / Math.hypot(f.w1, f.w2);
