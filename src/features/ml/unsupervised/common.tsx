/** Small helpers shared by the visualizations in this folder. */
import { rng, type Point } from '../data';
import { CLASS_TONE, scales, type Domain } from '../Plot';

/** Five theme tones for clusters, most distinct first. */
export const TONES = ['primary', 'accent', 'comparison', 'success', 'danger'] as const;
export const toneOf = (cluster: number) => TONES[cluster % TONES.length]!;

/** SVG path through pixel points; the same number of points on every frame lets CSS animate `d`. */
export const pathOf = (pts: [number, number][]) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');

/** Seeded Fisher-Yates shuffle (returns a copy). */
export function shuffle<T>(items: T[], seed: number): T[] {
  const rand = rng(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

const COLS = 30;
const ROWS = 20;

/** Centres of a coarse 30 x 20 grid over the domain, row by row from the top. */
export function gridCenters(domain: Domain): Point[] {
  const [x0, x1] = domain.x;
  const [y0, y1] = domain.y;
  const out: Point[] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) out.push({ x: x0 + ((c + 0.5) * (x1 - x0)) / COLS, y: y1 - ((r + 0.5) * (y1 - y0)) / ROWS });
  return out;
}

/**
 * Decision regions: each grid cell takes the colour of the predicted class, stronger where the model is more confident.
 * Cells are opaque mixes with the plot background and overlap slightly, so no seams show between them.
 */
export function Shade({ domain, width, height, probs }: { domain: Domain; width: number; height: number; probs: number[] }) {
  const { pad } = scales(domain, width, height);
  const cw = (width - 2 * pad) / COLS;
  const ch = (height - 2 * pad) / ROWS;
  return (
    <g aria-hidden="true">
      {probs.map((p, i) => (
        <rect
          key={i}
          x={pad + (i % COLS) * cw}
          y={pad + Math.floor(i / COLS) * ch}
          width={cw + 0.6}
          height={ch + 0.6}
          style={{
            fill: `color-mix(in srgb, var(--${p >= 0.5 ? CLASS_TONE[1] : CLASS_TONE[0]}) ${Math.round(6 + 32 * Math.abs(p - 0.5))}%, var(--surface-sunk))`,
          }}
        />
      ))}
    </g>
  );
}
