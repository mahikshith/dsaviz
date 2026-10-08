import type { ReactNode } from 'react';
import styles from './docs.module.css';

/**
 * Page shell for the Git, ML and Resources pages: a title, then a sticky side
 * panel next to the main area. On narrow screens the side panel folds into a
 * disclosure above the main area.
 */
export function DocsLayout({
  title,
  lede,
  sideLabel,
  side,
  children,
}: {
  title: string;
  lede?: ReactNode;
  /** Accessible name for the side panel, e.g. "Git commands". */
  sideLabel: string;
  side: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page page-wide">
      <header className={styles.head}>
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
      </header>
      <div className={styles.layout}>
        <aside className={styles.side} aria-label={sideLabel}>
          <details className={styles.sideFold} open>
            <summary>{sideLabel}</summary>
            <div className={styles.sideInner}>{side}</div>
          </details>
        </aside>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}

/** A grouped list of links or buttons for the side panel. */
export function SideNav({
  groups,
  current,
  onSelect,
}: {
  groups: { title: string; items: { id: string; label: string; hint?: string }[] }[];
  /** The selected item, highlighted with aria-current. */
  current?: string;
  /** When given, items are buttons that call this; otherwise they are #id anchor links. */
  onSelect?: (id: string) => void;
}) {
  return (
    <nav className={styles.nav}>
      {groups.map((g) => (
        <div key={g.title} className={styles.navGroup}>
          <p className={styles.navTitle}>{g.title}</p>
          <ul>
            {g.items.map((it) => {
              const body = (
                <>
                  <span className={styles.navLabel}>{it.label}</span>
                  {it.hint ? <span className={styles.navHint}>{it.hint}</span> : null}
                </>
              );
              return (
                <li key={it.id}>
                  {onSelect ? (
                    <button type="button" className={styles.navItem} aria-current={current === it.id || undefined} onClick={() => onSelect(it.id)}>
                      {body}
                    </button>
                  ) : (
                    <a href={`#${it.id}`} className={styles.navItem} aria-current={current === it.id || undefined}>
                      {body}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** A plain card in the shared style: neutral surface, 1px border, rounded. */
export function Panel({ title, children, id }: { title?: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section className={styles.panel} id={id} aria-label={typeof title === 'string' ? title : undefined}>
      {title ? <h2 className={styles.panelTitle}>{title}</h2> : null}
      {children}
    </section>
  );
}
