import type { Point } from '../data';
import type { Domain } from '../Plot';

/**
 * The part of the line a·x + b·y + c = 0 that lies inside the domain box, as two endpoints
 * ordered left to right (so animated paths never flip), or null when the line misses the box.
 */
export function boxLine(a: number, b: number, c: number, d: Domain): [Point, Point] | null {
  const [x0, x1] = d.x;
  const [y0, y1] = d.y;
  const hits: Point[] = [];
  if (Math.abs(b) > 1e-12) {
    for (const x of [x0, x1]) {
      const y = -(a * x + c) / b;
      if (y >= y0 && y <= y1) hits.push({ x, y });
    }
  }
  if (Math.abs(a) > 1e-12) {
    for (const y of [y0, y1]) {
      const x = -(b * y + c) / a;
      if (x >= x0 && x <= x1) hits.push({ x, y });
    }
  }
  const [p] = hits;
  if (!p) return null;
  let q = p;
  for (const h of hits) if (Math.hypot(h.x - p.x, h.y - p.y) > Math.hypot(q.x - p.x, q.y - p.y)) q = h;
  if (q === p) return null;
  return p.x < q.x || (p.x === q.x && p.y < q.y) ? [p, q] : [q, p];
}

/** Equal units on both axes in the default 560 by 360 plot, so distances and right angles look true. */
export const CLASSIFY_DOMAIN: Domain = { x: [-5, 5], y: [-3, 3] };
