import type { Domain } from '../Plot';

export type LossCurve = {
  name: string;
  f: (w: number) => number;
  df: (w: number) => number;
  start: number;
  domain: Domain;
};

/** Two 1D loss curves: a convex bowl, and a tilted curve with a shallow local valley and a deeper global one. */
export const CURVES = {
  bowl: { name: 'Bowl', f: (w) => w * w, df: (w) => 2 * w, start: 3.5, domain: { x: [-4, 4], y: [-1, 17] } },
  valleys: {
    name: 'Two valleys',
    f: (w) => 0.05 * w ** 4 - 0.5 * w * w + 0.3 * w + 2,
    df: (w) => 0.2 * w ** 3 - w + 0.3,
    start: 3.5,
    domain: { x: [-4, 4], y: [-0.5, 8.5] },
  },
} satisfies Record<string, LossCurve>;

export type GdFrame = { w: number; loss: number; grad: number };
export type GdOutcome = 'converged' | 'diverged' | 'unfinished';

/**
 * Plain gradient descent on a 1D function: w ← w − rate · f'(w).
 * Stops when the gradient is almost zero (converged), when |w| passes `limit` (diverged),
 * or after `maxSteps` steps (unfinished). Frame 0 is the starting point.
 */
export function descend(curve: Pick<LossCurve, 'f' | 'df'>, w0: number, rate: number, maxSteps = 60, limit = 1e6) {
  const at = (w: number): GdFrame => ({ w, loss: curve.f(w), grad: curve.df(w) });
  const frames = [at(w0)];
  let outcome: GdOutcome = 'unfinished';
  for (let i = 0; i < maxSteps; i++) {
    const cur = frames[frames.length - 1]!;
    if (Math.abs(cur.grad) < 1e-3) {
      outcome = 'converged';
      break;
    }
    const next = at(cur.w - rate * cur.grad);
    frames.push(next);
    if (!Number.isFinite(next.w) || Math.abs(next.w) > limit) {
      outcome = 'diverged';
      break;
    }
  }
  if (outcome === 'unfinished' && Math.abs(frames[frames.length - 1]!.grad) < 1e-3) outcome = 'converged';
  return { frames, outcome };
}
