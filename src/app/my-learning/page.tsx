import type { Metadata } from 'next';
import { getSite } from '@/lib/content/load';
import { buildCatalog } from '@/lib/content/catalog';
import { MyLearning } from '@/features/progress/MyLearning';
import styles from '@/features/catalog/catalog.module.css';

export const metadata: Metadata = { title: 'My learning' };

export default function MyLearningPage() {
  const site = getSite();
  const catalog = buildCatalog(site);
  const problems = catalog.problems.map((p) => ({ ...p, contentVersion: site.problemById.get(p.id)!.meta.contentVersion }));
  return (
    <div className="page">
      <header className={styles.pageHead}>
        <h1>My learning</h1>
      </header>
      <MyLearning problems={problems} patterns={catalog.patterns} />
    </div>
  );
}
