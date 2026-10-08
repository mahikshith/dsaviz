import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSite, problemsInPattern } from '@/lib/content/load';
import { LADDER_LABEL } from '@/lib/site';
import { Prose } from '@/features/lesson/Prose';
import { GlossaryLayer } from '@/features/lesson/GlossaryLayer';
import { LessonStatus } from '@/features/catalog/LessonStatus';
import { PatternProgress } from '@/features/catalog/PatternProgress';
import { InnerTabs } from '@/components/ui/InnerTabs';
import { DifficultyBadge, PatternBadge } from '@/components/ui/Badges';
import { LadderSummary } from '@/components/ui/Ladder';
import { SceneView } from '@/visuals/scenes/SceneView';
import type { SceneModel } from '@/visuals/scenes/model';
import styles from '@/features/catalog/pattern.module.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getSite().patterns.map((p) => ({ slug: p.meta.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getSite().patternById.get(slug);
  return p ? { title: p.meta.name, description: p.meta.intuition } : {};
}

const TABS: { key: string; label: string }[] = [
  { key: 'Intuition', label: 'The idea' },
  { key: 'Recognition clues', label: 'Spot it' },
  { key: 'Template', label: 'Template' },
  { key: 'Preconditions', label: 'What it needs' },
  { key: 'When it fails', label: 'When it fails' },
];

const BANDS = [
  { id: 'start', title: 'Start here', note: 'Introductory and easy: the pattern in its plainest form.', levels: ['introductory', 'easy'] },
  { id: 'build', title: 'Build up', note: 'Medium: the same idea with one more twist.', levels: ['medium'] },
  { id: 'stretch', title: 'Stretch', note: 'Hard: combine the pattern with another idea.', levels: ['hard'] },
] as const;

export default async function PatternPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const site = getSite();
  const pattern = site.patternById.get(slug);
  if (!pattern) notFound();
  const { meta } = pattern;
  const family = site.families.find((f) => f.id === meta.family);
  const lessons = problemsInPattern(site, meta.id);
  const terms = new Set([...pattern.terms, ...meta.prerequisites]);
  const glossary = site.glossary.filter((g) => terms.has(g.id));
  const tabs = TABS.filter((t) => pattern.sections[t.key]).map((t) => ({
    id: t.key.toLowerCase().replace(/\s+/g, '-'),
    label: t.label,
    content: <Prose html={pattern.sections[t.key]!} />,
  }));
  tabs.push({
    id: 'variants',
    label: `Variants (${meta.variants.length})`,
    content: (
      <ul className={styles.variants}>
        {meta.variants.map((v) => {
          const count = lessons.filter((l) => l.membership.variantId === v.id).length;
          return (
            <li key={v.id}>
              <p className={styles.variantName}>
                {v.name} <span>{count === 0 ? 'no problems yet' : `${count} ${count === 1 ? 'problem' : 'problems'}`}</span>
              </p>
              <p>{v.summary}</p>
              <p className={styles.requires}>
                <strong>Needs:</strong> {v.requires}
              </p>
            </li>
          );
        })}
      </ul>
    ),
  });

  return (
    <div className="page" data-hue={meta.hue}>
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/patterns/">Patterns</Link>
        <span aria-hidden>/</span>
        <span>{family?.name}</span>
      </nav>
      <header className={styles.head}>
        <PatternBadge hue={meta.hue} short={meta.short} />
        <div className={styles.headText}>
          <h1>{meta.name}</h1>
          <p className="lede">{meta.intuition}</p>
          {meta.prerequisites.length > 0 && (
            <p className={styles.prereq}>
              Comfortable with first:{' '}
              {meta.prerequisites.map((id, i) => (
                <span key={id}>
                  {i > 0 && ', '}
                  <button type="button" className="term" data-term={id} aria-expanded="false">
                    {site.glossary.find((g) => g.id === id)?.term ?? id}
                  </button>
                </span>
              ))}
            </p>
          )}
        </div>
        {lessons.length > 0 && (
          <PatternProgress problemIds={lessons.map((l) => l.problem.meta.id)} label={meta.name} />
        )}
      </header>

      <div className={styles.layout}>
        <section className={styles.paper} aria-label={`${meta.name}: the idea`}>
          <InnerTabs label={`About ${meta.name}`} tabs={tabs} />
        </section>
        <figure className={styles.visual}>
          <SceneView scene={meta.visual.scene as SceneModel} />
          <figcaption>{meta.visual.caption}</figcaption>
        </figure>
      </div>

      <section className={styles.problems} aria-labelledby="problems-heading">
        <div className={styles.problemsHead}>
          <h2 id="problems-heading">Problems, easiest first</h2>
        </div>
        {lessons.length === 0 && (
          <div className={styles.emptyLessons}>
            <p>No problems are published for this pattern yet. The idea and template above are ready to read.</p>
            <Link href="/patterns/" className="btn btn-small">
              Browse other patterns
            </Link>
          </div>
        )}
        {BANDS.map((band) => {
          const items = lessons.filter((l) => (band.levels as readonly string[]).includes(l.problem.meta.difficulty));
          if (items.length === 0) return null;
          return (
            <div key={band.id} className={styles.band}>
              <div className={styles.bandHead}>
                <h3>{band.title}</h3>
                <p>{band.note}</p>
              </div>
              <ol className={styles.problemList}>
                {items.map(({ problem, membership }) => {
                  const pm = problem.meta;
                  return (
                    <li key={pm.id} className={styles.problemCard}>
                      <div className={styles.problemTop}>
                        <div className={styles.problemTitles}>
                          <Link href={`/problems/${pm.slug}/`} className={styles.problemLink}>
                            {pm.storyTitle}
                          </Link>
                          <span className={styles.problemMeta}>
                            {pm.title}
                            {pm.aka ? ` · ${pm.aka}` : ''} · {meta.variants.find((v) => v.id === membership.variantId)?.name}
                          </span>
                        </div>
                        <div className={styles.problemBadges}>
                          <DifficultyBadge level={pm.difficulty} />
                          {pm.approaches.length ? (
                            <span className={styles.kind} title="Has a step-by-step visual walkthrough">
                              ▶ Visual
                            </span>
                          ) : null}
                          <LessonStatus problemId={pm.id} />
                        </div>
                      </div>
                      <LadderSummary rungs={pm.ladder.map((r) => ({ level: r.level, name: r.name, time: r.time }))} />
                      <details className={styles.builds}>
                        <summary>How the solution builds</summary>
                        <ol>
                          {problem.ladder.map((r) => (
                            <li key={r.id} data-level={r.level}>
                              <p className={styles.buildName}>
                                <span className={styles.buildLevel}>{LADDER_LABEL[r.level]}</span> {r.name}{' '}
                                <span className="complexity">{r.time}</span>
                              </p>
                              {r.insightHtml && (
                                <p className={styles.buildInsight}>
                                  <strong>Noticed: </strong>
                                  <span dangerouslySetInnerHTML={{ __html: r.insightHtml }} />
                                </p>
                              )}
                              <p dangerouslySetInnerHTML={{ __html: r.ideaHtml }} />
                            </li>
                          ))}
                        </ol>
                      </details>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </section>
      <GlossaryLayer entries={glossary.map((g) => ({ id: g.id, term: g.term, definition: g.definition }))} />
    </div>
  );
}
