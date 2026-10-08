import Link from 'next/link';
import type { Block, Rich, Term } from './content';
import styles from './resources.module.css';

function A({ href, children }: { href: string; children: string }) {
  if (href.startsWith('/')) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Text({ value }: { value: Rich }) {
  const parts = Array.isArray(value) ? value : [value];
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? part : 'code' in part ? <code key={i}>{part.code}</code> : <A key={i} href={part.href}>{part.text}</A>,
      )}
    </>
  );
}

function TermBody({ item }: { item: Term }) {
  return (
    <>
      <Text value={item.text} />
      {item.say ? <span className={styles.say}>Say: “{item.say}”</span> : null}
    </>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((b, i) => {
    switch (b.kind) {
      case 'p':
        return (
          <p key={i} className={styles.p}>
            <Text value={b.text} />
          </p>
        );
      case 'h3':
        return (
          <h3 key={i} className={styles.h3}>
            {b.text}
          </h3>
        );
      case 'list': {
        const L = b.ordered ? 'ol' : 'ul';
        return (
          <L key={i} className={styles.list}>
            {b.items.map((it, j) => (
              <li key={j}>
                <Text value={it} />
              </li>
            ))}
          </L>
        );
      }
      case 'terms':
        return (
          <dl key={i} className={styles.terms} data-quiet={b.quiet || undefined}>
            {b.items.map((it) => (
              <div key={it.term}>
                <dt>{it.term}</dt>
                <dd>
                  <TermBody item={it} />
                </dd>
              </div>
            ))}
          </dl>
        );
      case 'steps':
        return (
          <ol key={i} className={styles.steps}>
            {b.items.map((it) => (
              <li key={it.term}>
                <strong>{it.term}</strong>
                <span>
                  <TermBody item={it} />
                </span>
              </li>
            ))}
          </ol>
        );
      case 'table':
        return (
          <div key={i} className={styles.tableWrap}>
            <table className={styles.table} data-cols={b.head.length}>
              <caption className="sr-only">{b.caption}</caption>
              <thead>
                <tr>
                  {b.head.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row">
                          <Text value={cell} />
                        </th>
                      ) : (
                        <td key={c}>
                          <Text value={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'links':
        return (
          <ul key={i} className={styles.links}>
            {b.items.map((it) => (
              <li key={it.label}>
                {it.href ? <A href={it.href}>{it.label}</A> : <span className={styles.book}>{it.label}</span>}
                <span className={styles.note}>{it.note}</span>
              </li>
            ))}
          </ul>
        );
    }
  });
}
