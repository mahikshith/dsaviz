import { linePoints, type Point } from '../data';

/** Noisy points around y = 1.2x + 2, with x centred on zero so slope and intercept learn at similar speeds. */
export const LINE_DATA: Point[] = linePoints(7, 30, 1.2, 2, 1, -4, 4);

export type LineFrame = { w: number; b: number; mse: number };

export const mse = (pts: Point[], w: number, b: number) => pts.reduce((s, p) => s + (w * p.x + b - p.y) ** 2, 0) / pts.length;

/**
 * Batch gradient descent on mean squared error for y ≈ w·x + b, starting from w = b = 0.
 * Frame i holds the parameters after i epochs. Stops early if the error blows up.
 */
export function fitLine(pts: Point[], rate: number, epochs = 60) {
  let w = 0;
  let b = 0;
  const frames: LineFrame[] = [{ w, b, mse: mse(pts, w, b) }];
  let diverged = false;
  for (let e = 0; e < epochs; e++) {
    let gw = 0;
    let gb = 0;
    for (const p of pts) {
      const err = w * p.x + b - p.y;
      gw += (2 * err * p.x) / pts.length;
      gb += (2 * err) / pts.length;
    }
    w -= rate * gw;
    b -= rate * gb;
    const loss = mse(pts, w, b);
    frames.push({ w, b, mse: loss });
    if (!Number.isFinite(loss) || loss > 1e6) {
      diverged = true;
      break;
    }
  }
  return { frames, diverged };
}
