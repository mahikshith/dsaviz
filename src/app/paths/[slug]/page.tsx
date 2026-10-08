import type { Metadata } from 'next';
// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';
import { notFound } from 'next/navigation';
import { getSite } from '@/lib/content/load';
import { DIFFICULTY_LABEL } from '@/lib/site';
import { LessonStatus } from '@/features/catalog/LessonStatus';
import { RevealPattern } from '@/features/catalog/RevealPattern';
import styles from '@/features/catalog/path.module.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getSite().paths.map((p) => ({ slug: p.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getSite().paths.find((x) => x.id === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

const KIND_LABEL = {
  guided: 'Guided introduction',
  supported: 'Supported practice',
  independent: 'Independent practice',
  'mixed-review': 'Mixed review',
} as const;

export default async function PathPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const site = getSite();
  const path = site.paths.find((p) => p.id === slug);
  if (!path) notFound();

  return (
    <div className="page">
      <header className={styles.head}>
        <span className="eyebrow">Learning path</span>
        <h1>{path.title}</h1>
        <p className="lede">{path.summary}</p>
      </header>
      <ol className={styles.sections}>
        {path.sections.map((section, s) => {
          const mixed = section.kind === 'mixed-review';
          return (
            <li key={section.title} className={styles.section}>
              <div className={styles.sectionHead}>
                <span className={styles.stepNo} aria-hidden>
                  {s + 1}
                </span>
                <div>
                  <p className={styles.kind}>{KIND_LABEL[section.kind]}</p>
                  <h2>{section.title}</h2>
                  <p className={styles.summary}>{section.summary}</p>
                </div>
              </div>
              <ul className={styles.problems}>
                {section.problems.map((id) => {
                  const problem = site.problemById.get(id)!;
                  const patterns = problem.meta.patternMemberships
                    .map((m) => site.patternById.get(m.patternId))
                    .filter((p) => p !== undefined)
                    .map((p) => ({ id: p.meta.id, name: p.meta.name }));
                  return (
                    <li key={id}>
                      <div className={styles.problemMain}>
                        <Link href={`/problems/${problem.meta.slug}/`} className={styles.problemLink}>
                          {mixed ? problem.meta.title : problem.meta.storyTitle}
                        </Link>
                        <span className={styles.meta}>
                          {mixed ? problem.meta.summary : `${problem.meta.title} · ${DIFFICULTY_LABEL[problem.meta.difficulty]}`}
                        </span>
                      </div>
                      <div className={styles.problemSide}>
                        {mixed ? (
                          <RevealPattern patterns={patterns} />
                        ) : (
                          <span className={styles.meta}>{patterns.map((p) => p.name).join(', ')}</span>
                        )}
                        <LessonStatus problemId={id} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
