import Link from 'next/link';
import { SITE } from '@/lib/site';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import styles from './shell.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand}>
          <span aria-hidden className={styles.mark}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M6 18V6M18 18V6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M9.5 12h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1.5 2.5" />
            </svg>
          </span>
          {SITE.name}
        </Link>
        <NavLinks />
        <ThemeToggle />
      </div>
    </header>
  );
}
