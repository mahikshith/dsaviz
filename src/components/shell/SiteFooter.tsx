import Link from 'next/link';
import { SITE } from '@/lib/site';
import styles from './shell.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p>{SITE.name}. Free, no account. Progress stays in this browser.</p>
        <nav aria-label="Footer" className={styles.footerNav}>
          <Link href="/patterns/">Patterns</Link>
          <Link href="/practice/">Practice</Link>
          <Link href="/my-learning/">My learning</Link>
        </nav>
      </div>
    </footer>
  );
}
