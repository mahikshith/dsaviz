'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './shell.module.css';

const LINKS = [
  { href: '/patterns/', label: 'Patterns', match: ['/patterns', '/problems', '/paths'] },
  { href: '/practice/', label: 'Practice', match: ['/practice'] },
  { href: '/my-learning/', label: 'My learning', match: ['/my-learning'] },
];

export function NavLinks() {
  const path = usePathname() ?? '/';
  return (
    <nav aria-label="Main" className={styles.nav}>
      {LINKS.map((l) => {
        const current = l.match.some((m) => path.startsWith(m));
        return (
          <Link key={l.href} href={l.href} aria-current={current ? 'page' : undefined} className={styles.navLink}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
