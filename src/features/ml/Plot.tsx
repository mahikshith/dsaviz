import type { ReactNode } from 'react';
import styles from './ml.module.css';

export type Domain = { x: [number, number]; y: [number, number] };

/** Maps data coordinates to SVG pixels for a plot of the given size (y grows upwards). */
export function scales(domain: Domain, width: number, height: number, pad = 28) {
  const sx = (x: number) => pad + ((x - domain.x[0]) / (domain.x[1] - domain.x[0])) * (width - 2 * pad);
  const sy = (y: number) => height - pad - ((y - domain.y[0]) / (domain.y[1] - domain.y[0])) * (height - 2 * pad);
  const ix = (px: number) => domain.x[0] + ((px - pad) / (width - 2 * pad)) * (domain.x[1] - domain.x[0]);
  const iy = (py: number) => domain.y[0] + ((height - pad - py) / (height - 2 * pad)) * (domain.y[1] - domain.y[0]);
  return { sx, sy, ix, iy, pad, width, height };
}

/**
 * A responsive SVG plot frame with a light grid and axis labels.
 * Children draw in pixel space using the scales from `scales()`.
 */
export function Plot({
  width = 560,
  height = 360,
  domain,
  xLabel,
  yLabel,
  label,
  children,
  onPointer,
}: {
  width?: number;
  height?: number;
  domain: Domain;
  xLabel?: string;
  yLabel?: string;
  /** Accessible description of what the plot shows right now. */
  label: string;
  children: ReactNode;
  /** Called with data coordinates when the plot is clicked. */
  onPointer?: (x: number, y: number) => void;
}) {
  const s = scales(domain, width, height);
  const ticks = (lo: number, hi: number) => Array.from({ length: 5 }, (_, i) => lo + ((hi - lo) * i) / 4);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={styles.plot}
      role="img"
      aria-label={label}
      data-clickable={onPointer ? true : undefined}
      onClick={
        onPointer
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const px = ((e.clientX - r.left) / r.width) * width;
              const py = ((e.clientY - r.top) / r.height) * height;
              onPointer(s.ix(px), s.iy(py));
            }
          : undefined
      }
    >
      <g className={styles.grid}>
        {ticks(...domain.x).map((t) => (
          <line key={`x${t}`} x1={s.sx(t)} x2={s.sx(t)} y1={s.pad} y2={height - s.pad} />
        ))}
        {ticks(...domain.y).map((t) => (
          <line key={`y${t}`} x1={s.pad} x2={width - s.pad} y1={s.sy(t)} y2={s.sy(t)} />
        ))}
      </g>
      <rect x={s.pad} y={s.pad} width={width - 2 * s.pad} height={height - 2 * s.pad} className={styles.frame} />
      {xLabel ? (
        <text x={width / 2} y={height - 6} textAnchor="middle" className={styles.axisLabel}>
          {xLabel}
        </text>
      ) : null}
      {yLabel ? (
        <text x={10} y={height / 2} textAnchor="middle" transform={`rotate(-90 10 ${height / 2})`} className={styles.axisLabel}>
          {yLabel}
        </text>
      ) : null}
      {children}
    </svg>
  );
}

/** Class names for the two (or more) classes, so points use theme tokens, never hard-coded colours. */
export const CLASS_TONE = ['primary', 'accent', 'success', 'comparison'] as const;
