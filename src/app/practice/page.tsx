import type { Metadata } from 'next';
import { getSite } from '@/lib/content/load';
import { buildCatalog } from '@/lib/content/catalog';
import { PracticeCatalog } from '@/features/catalog/PracticeCatalog';
import styles from '@/features/catalog/catalog.module.css';

export const metadata: Metadata = {
  title: 'Practice',
  description: 'Every problem, grouped by pattern or by the companies that ask it.',
};

export default function PracticePage() {
  const catalog = buildCatalog(getSite());
  return (
    <div className="page">
      <header className={styles.pageHead}>
        <h1>Practice</h1>
        <p className="lede">Every problem, grouped by pattern or by the companies that ask it.</p>
      </header>
      <PracticeCatalog catalog={catalog} />
    </div>
  );
}
