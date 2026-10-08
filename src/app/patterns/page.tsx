import type { Metadata } from 'next';
// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';
import { getSite } from '@/lib/content/load';
import { buildCatalog } from '@/lib/content/catalog';
import { PatternCatalog } from '@/features/catalog/PatternCatalog';
import styles from '@/features/catalog/catalog.module.css';

export const metadata: Metadata = {
  title: 'Patterns',
  description: 'Reusable ways of reasoning about problems, grouped into families.',
};

export default function PatternsPage() {
  const catalog = buildCatalog(getSite());
  return (
    <div className="page">
      <header className={styles.pageHead}>
        <h1>Patterns</h1>
        <p className="lede">
          Learn the idea once, use it many times. New here? Start with the <Link href="/paths/first-steps/">first steps path</Link>.
        </p>
      </header>
      <PatternCatalog catalog={catalog} />
    </div>
  );
}
