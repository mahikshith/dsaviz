import type { Point } from '../data';
import { CLASS_TONE, scales, type Domain } from '../Plot';
import styles from '../ml.module.css';

export const CLASS_NAME = ['A', 'B', 'C'];

/** Scales for the default 560 by 360 Plot. */
export const plotScales = (d: Domain) => scales(d, 560, 360);

/** SVG path through points that are already in pixels. */
export const pathOf = (pts: Point[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

/** A number for readouts: no "-0.00", and very large values switch to exponent form. */
export const num = (v: number, digits = 2) =>
  !Number.isFinite(v) ? '∞' : Math.abs(v) >= 1e4 ? v.toExponential(1) : (Math.abs(v) < 0.5 * 10 ** -digits ? 0 : v).toFixed(digits);

/** A data point. Shape and colour both show the class: A is a circle, B a square, C a triangle. */
export function ClassMark({ cx, cy, label, r = 5 }: { cx: number; cy: number; label: number; r?: number }) {
  const tone = CLASS_TONE[label % CLASS_TONE.length];
  if (label === 1) {
    const h = r * 0.9;
    return <rect className={styles.point} data-tone={tone} x={cx - h} y={cy - h} width={2 * h} height={2 * h} />;
  }
  if (label === 2) {
    const d = `M${cx} ${cy - r * 1.25}L${cx + r * 1.15} ${cy + r * 0.8}L${cx - r * 1.15} ${cy + r * 0.8}Z`;
    return <path className={styles.point} data-tone={tone} d={d} />;
  }
  return <circle className={styles.point} data-tone={tone} cx={cx} cy={cy} r={r} />;
}
