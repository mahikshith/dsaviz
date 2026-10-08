import type { Metadata } from 'next';
import { DocsLayout, Panel, SideNav } from '@/components/docs/DocsLayout';
import { Blocks } from '@/features/resources/Blocks';
import { GROUPS, NAV } from '@/features/resources/content';
import styles from '@/features/resources/resources.module.css';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'An interview preparation guide: an eight-week study plan, a problem-solving framework, behavioural answers, system design basics, machine learning and Git questions.',
};

export default function ResourcesPage() {
  return (
    <DocsLayout
      title="Resources"
      lede="A study plan and reference notes for coding, behavioural, system design, machine learning and Git interviews. Read it once from top to bottom, then come back to the tables."
      sideLabel="On this page"
      side={<SideNav groups={NAV} />}
    >
      <div className={styles.stack}>
        {GROUPS.flatMap((g) =>
          g.sections.map((s) => (
            <Panel key={s.id} id={s.id} title={s.title}>
              <Blocks blocks={s.blocks} />
            </Panel>
          )),
        )}
      </div>
    </DocsLayout>
  );
}
