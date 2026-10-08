import { blobs, type Labeled } from '../data';

/** Two classes that overlap slightly at the edges, A (label 0) bottom left and B (label 1) top right. */
export const LOGISTIC_DATA: Labeled[] = blobs(16, [{ x: -1.6, y: -0.7 }, { x: 1.4, y: 0.8 }], 22, 1.05);

export const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

export type LogisticFrame = { w1: number; w2: number; b: number; loss: number; accuracy: number };

/** Probability of class 1 at (x, y). */
export const probability = (m: Pick<LogisticFrame, 'w1' | 'w2' | 'b'>, x: number, y: number) => sigmoid(m.w1 * x + m.w2 * y + m.b);

function evaluate(data: Labeled[], w1: number, w2: number, b: number): LogisticFrame {
  let loss = 0;
  let correct = 0;
  for (const p of data) {
    const q = Math.min(1 - 1e-12, Math.max(1e-12, sigmoid(w1 * p.x + w2 * p.y + b)));
    loss -= p.label ? Math.log(q) : Math.log(1 - q);
    if ((q >= 0.5 ? 1 : 0) === p.label) correct++;
  }
  return { w1, w2, b, loss: loss / data.length, accuracy: correct / data.length };
}

/**
 * Batch gradient descent on mean log-loss. Starts from a deliberately poor boundary so the movement is visible.
 * The gradient of log-loss is simply (p − y) times the input.
 */
export function trainLogistic(data: Labeled[], rate: number, epochs = 80, init = { w1: 0.2, w2: -0.6, b: 0 }) {
  let { w1, w2, b } = init;
  const frames = [evaluate(data, w1, w2, b)];
  for (let e = 0; e < epochs; e++) {
    let g1 = 0;
    let g2 = 0;
    let gb = 0;
    for (const p of data) {
      const err = sigmoid(w1 * p.x + w2 * p.y + b) - p.label;
      g1 += (err * p.x) / data.length;
      g2 += (err * p.y) / data.length;
      gb += err / data.length;
    }
    w1 -= rate * g1;
    w2 -= rate * g2;
    b -= rate * gb;
    frames.push(evaluate(data, w1, w2, b));
  }
  return frames;
}
