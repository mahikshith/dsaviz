import { useId } from 'react';
import type { ArrayRow, Band, Pointer } from './model';
import styles from './scene.module.css';

const CELL = 62;
const GAP = 12;
const PITCH = CELL + GAP;
const CELL_H = 58;
const PAD = 14;
// Fixed vertical zones per row so geometry never shifts between frames.
const LABEL_H = 20;
const ABOVE_H = 46;
const SUB_H = 22;
const BELOW_H = 48;
const BAR_H = 104;
const rowHeight = (row: ArrayRow) => LABEL_H + (row.bars ? BAR_H : 0) + ABOVE_H + CELL_H + SUB_H + BELOW_H;

export function arraySceneSize(rows: ArrayRow[]) {
  const minOffset = Math.min(0, ...rows.map((r) => r.offset ?? 0));
  const maxEnd = Math.max(1, ...rows.map((r) => (r.offset ?? 0) + r.cells.length));
  return {
    minOffset,
    width: PAD * 2 + (maxEnd - minOffset) * PITCH - GAP,
    height: rows.reduce((h, r) => h + rowHeight(r), 0),
  };
}

export function ArrayScene({ rows }: { rows: ArrayRow[] }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const { minOffset, width, height } = arraySceneSize(rows);
  const xOf = (row: ArrayRow, i: number) => PAD + (i + (row.offset ?? 0) - minOffset) * PITCH;
  let top = 0;

  return (
    <svg
      className={styles.arraySvg}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ ['--scene-w' as string]: `${width}px` }}
      aria-hidden
      focusable="false"
    >
      <defs>
        <pattern id={`hatch-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" className={styles.hatchBg} />
          <line x1="0" y1="0" x2="0" y2="7" className={styles.hatchLine} />
        </pattern>
      </defs>
      {rows.map((row) => {
        const rowTop = top;
        top += rowHeight(row);
        const barTop = rowTop + LABEL_H;
        const cellTop = rowTop + LABEL_H + (row.bars ? BAR_H : 0) + ABOVE_H;
        return (
          <g key={row.id}>
            <text x={PAD} y={rowTop + 14} className={styles.rowLabel}>
              {row.label}
            </text>
            {row.bars &&
              row.cells.map((c, i) => {
                const h = Math.max(2, ((c.bar ?? 0) / row.bars!.max) * (BAR_H - 8));
                return (
                  <rect
                    key={`bar-${c.id}`}
                    className={styles.bar}
                    data-state={c.state}
                    x={xOf(row, i) + 10}
                    width={CELL - 20}
                    y={barTop + BAR_H - h}
                    height={h}
                    style={{ y: barTop + BAR_H - h, height: h }}
                    rx={5}
                  />
                );
              })}
            {row.bands
              .filter((b) => b.side === 'above')
              .map((b) => (
                <BandOverlay key={b.id} band={b} x={xOf(row, b.from)} w={(b.to - b.from) * PITCH + CELL} top={cellTop} />
              ))}
            {row.cells.map((c, i) => {
              const x = xOf(row, i);
              const hatched = c.state === 'discarded' || c.state === 'leaving';
              return (
                <g key={c.id} className={styles.cell} data-state={c.state}>
                  <rect
                    x={x}
                    y={cellTop}
                    width={CELL}
                    height={CELL_H}
                    rx={10}
                    className={styles.cellBox}
                    style={hatched ? { fill: `url(#hatch-${uid})` } : undefined}
                  />
                  {/* Keyed by value so a new value remounts and fades in. */}
                  <text key={c.label} x={x + CELL / 2} y={cellTop + CELL_H / 2 + 8} textAnchor="middle" className={styles.cellValue}>
                    {c.label}
                  </text>
                  <text x={x + CELL / 2} y={cellTop + CELL_H + 16} textAnchor="middle" className={styles.cellSub}>
                    {c.sub}
                  </text>
                </g>
              );
            })}
            {row.bands
              .filter((b) => b.side === 'below')
              .map((b) => (
                <BandBracket key={b.id} band={b} x={xOf(row, b.from)} w={(b.to - b.from) * PITCH + CELL} y={cellTop + CELL_H + SUB_H + 6} />
              ))}
            {mergePointers(row.pointers).map((p) => (
              <PointerMark key={p.id} pointer={p} x={xOf(row, p.index) + CELL / 2} cellTop={cellTop} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Two pointers on the same cell and side share one label, such as "low = high". */
function mergePointers(pointers: Pointer[]): Pointer[] {
  const out: Pointer[] = [];
  for (const p of pointers) {
    const same = out.find((q) => q.index === p.index && q.side === p.side);
    if (same) same.label = `${same.label} = ${p.label}`;
    else out.push({ ...p });
  }
  return out;
}

function PointerMark({ pointer, x, cellTop }: { pointer: Pointer; x: number; cellTop: number }) {
  const above = pointer.side === 'above';
  const y = above ? cellTop - 6 : cellTop + CELL_H + SUB_H + 4;
  return (
    <g className={styles.pointer} data-tone={pointer.tone} style={{ transform: `translate(${x}px, ${y}px)` }}>
      {above ? (
        <>
          <text y={-18} textAnchor="middle" className={styles.pointerLabel}>
            {pointer.label}
          </text>
          <path d="M -7 -12 L 7 -12 L 0 -2 Z" className={styles.pointerArrow} />
        </>
      ) : (
        <>
          <path d="M -7 12 L 7 12 L 0 2 Z" className={styles.pointerArrow} />
          <text y={30} textAnchor="middle" className={styles.pointerLabel}>
            {pointer.label}
          </text>
        </>
      )}
    </g>
  );
}

function BandOverlay({ band, x, w, top }: { band: Band; x: number; w: number; top: number }) {
  return (
    <g className={styles.band} data-tone={band.tone}>
      <rect className={styles.bandRect} style={{ x: x - 6, width: w + 12 }} x={x - 6} width={w + 12} y={top - 8} height={CELL_H + 16} rx={14} />
      <text className={styles.bandLabel} style={{ transform: `translate(${x + w / 2}px, ${top - 16}px)` }} textAnchor="middle">
        {band.label}
      </text>
    </g>
  );
}

function BandBracket({ band, x, w, y }: { band: Band; x: number; w: number; y: number }) {
  return (
    <g className={styles.bracket} data-tone={band.tone} style={{ transform: `translate(${x}px, ${y}px)` }}>
      <path d={`M 0 0 V 8 H ${w} V 0`} className={styles.bracketLine} />
      <text x={w / 2} y={28} textAnchor="middle" className={styles.bracketLabel}>
        {band.label}
      </text>
    </g>
  );
}
