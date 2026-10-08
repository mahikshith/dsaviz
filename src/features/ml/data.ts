/** Seeded randomness and small 2D datasets, so every visualization is the same on every load. */

export type Point = { x: number; y: number };
export type Labeled = Point & { label: number };

/** mulberry32: a tiny seeded PRNG returning floats in [0, 1). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal sample (Box-Muller). */
export function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-12);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Gaussian blobs: one cluster per center, labelled by center index. */
export function blobs(seed: number, centers: Point[], perCluster: number, spread: number): Labeled[] {
  const rand = rng(seed);
  const out: Labeled[] = [];
  centers.forEach((c, label) => {
    for (let i = 0; i < perCluster; i++) out.push({ x: c.x + gaussian(rand) * spread, y: c.y + gaussian(rand) * spread, label });
  });
  return out;
}

/** Points along y = slope * x + intercept with Gaussian noise, x uniform in [x0, x1]. */
export function linePoints(seed: number, n: number, slope: number, intercept: number, noise: number, x0 = 0, x1 = 10): Point[] {
  const rand = rng(seed);
  return Array.from({ length: n }, () => {
    const x = x0 + rand() * (x1 - x0);
    return { x, y: slope * x + intercept + gaussian(rand) * noise };
  });
}

export const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
