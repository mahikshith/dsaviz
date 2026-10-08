import type { SceneModel } from './model';
import { ArrayScene } from './ArrayScene';
import { GraphScene } from './GraphScene';
import { QueueView, StackView, TableView } from './Collections';
import styles from './scene.module.css';

/**
 * Draws any combination of arrays, a graph, a stack and a queue. Purely a
 * function of the scene model: it never decides what the algorithm does next.
 */
export function SceneView({ scene, instant = false, showLegend = true }: { scene: SceneModel; instant?: boolean; showLegend?: boolean }) {
  return (
    <div className={styles.scene} data-instant={instant || undefined}>
      {scene.arrays && scene.arrays.length > 0 && (
        <div className={styles.scroll}>
          <ArrayScene rows={scene.arrays} />
        </div>
      )}
      {scene.graph && (
        <div className={styles.scroll}>
          <GraphScene graph={scene.graph} />
        </div>
      )}
      {(scene.stack || scene.queue || scene.table) && (
        <div className={styles.collections}>
          {scene.stack && <StackView stack={scene.stack} />}
          {scene.queue && <QueueView queue={scene.queue} />}
          {scene.table && <TableView table={scene.table} />}
        </div>
      )}
      {showLegend && scene.legend.length > 0 && (
        <ul className={styles.legend} aria-label="Legend">
          {scene.legend.map((l) => (
            <li key={l.label}>
              <span className={styles.swatch} data-swatch={l.swatch} aria-hidden />
              {l.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
