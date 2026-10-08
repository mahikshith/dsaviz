import type { GraphModel } from './model';
import styles from './scene.module.css';

const R = 22;

export function GraphScene({ graph }: { graph: GraphModel }) {
  const at = new Map(graph.nodes.map((n) => [n.id, n]));
  return (
    <svg
      className={styles.graphSvg}
      viewBox={`0 0 ${graph.width} ${graph.height}`}
      width={graph.width}
      height={graph.height}
      style={{ ['--scene-w' as string]: `${graph.width}px` }}
      aria-hidden
      focusable="false"
    >
      {graph.edges.map((e) => {
        const a = at.get(e.from);
        const b = at.get(e.to);
        if (!a || !b) return null;
        return <line key={e.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={styles.edge} data-state={e.state} />;
      })}
      {graph.nodes.map((n) => (
        <g key={n.id} className={styles.node} data-state={n.state}>
          {n.goal && <circle cx={n.x} cy={n.y} r={R + 7} className={styles.goalRing} />}
          <circle cx={n.x} cy={n.y} r={R} className={styles.nodeCircle} />
          <text x={n.x} y={n.y + 6} textAnchor="middle" className={styles.nodeLabel}>
            {n.label}
          </text>
          {n.caption && (
            <text x={n.x} y={n.y + R + (n.goal ? 24 : 18)} textAnchor="middle" className={styles.nodeCaption}>
              {n.caption}
            </text>
          )}
          {n.badge !== undefined && (
            <g className={styles.badge}>
              <rect x={n.x + 12} y={n.y - R - 12} width={28} height={20} rx={10} className={styles.badgeBox} />
              <text x={n.x + 26} y={n.y - R + 3} textAnchor="middle" className={styles.badgeText}>
                {n.badge}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
