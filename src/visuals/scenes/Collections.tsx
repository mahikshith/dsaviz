import type { QueueModel, StackModel, TableModel } from './model';
import styles from './scene.module.css';

/** A stack drawn bottom-up. Its height is fixed by the run's largest stack so nothing jumps. */
export function StackView({ stack }: { stack: StackModel }) {
  const top = stack.items.length - 1;
  return (
    <div className={styles.collection}>
      <p className={styles.collectionLabel}>{stack.label}</p>
      <ol className={styles.stack} style={{ minHeight: stack.capacity * 46 + 8 }} aria-label={stack.label}>
        {stack.items.length === 0 && <li className={styles.empty}>{stack.emptyText}</li>}
        {stack.items.map((item, i) => (
          <li key={item.id} className={styles.stackItem} data-state={item.state}>
            <span className={styles.itemLabel}>{item.label}</span>
            <span className={styles.itemSub}>{item.sub}</span>
            {i === top && <span className={styles.topTag}>top</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function QueueView({ queue }: { queue: QueueModel }) {
  return (
    <div className={styles.collection}>
      <p className={styles.collectionLabel}>{queue.label}</p>
      <ol className={styles.queue} aria-label={queue.label}>
        {queue.items.length === 0 && <li className={styles.empty}>{queue.emptyText}</li>}
        {queue.items.map((item, i) => (
          <li key={item.id} className={styles.queueItem}>
            <span className={styles.itemLabel}>{item.label}</span>
            <span className={styles.itemSub}>{item.sub}</span>
            {i === 0 && <span className={styles.topTag}>front</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A key → value table. Its height is reserved for `capacity` rows so the stage never jumps. */
export function TableView({ table }: { table: TableModel }) {
  return (
    <div className={styles.collection}>
      <p className={styles.collectionLabel}>{table.label}</p>
      <div className={styles.tableBox} style={{ minHeight: 30 + Math.min(table.capacity, 8) * 40, maxHeight: 30 + 8 * 40 }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{table.columns[0]}</th>
              <th scope="col">{table.columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.length === 0 && (
              <tr>
                <td colSpan={2} className={styles.empty}>
                  {table.emptyText}
                </td>
              </tr>
            )}
            {table.rows.map((r) => (
              <tr key={r.id} data-state={r.state}>
                <td>{r.key}</td>
                <td>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
