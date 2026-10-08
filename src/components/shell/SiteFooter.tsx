// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';
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
          <Link href="/git/">Git</Link>
          <Link href="/ml/">ML</Link>
          <Link href="/resources/">Resources</Link>
          <Link href="/my-learning/">My learning</Link>
        </nav>
      </div>
    </footer>
  );
}
