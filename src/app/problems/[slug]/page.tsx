import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSite, problemsInPattern } from '@/lib/content/load';
import { formatInput, formatValue, lessonData } from '@/lib/content/lessonData';
import { Prose } from '@/features/lesson/Prose';
import { Workspace } from '@/features/lesson/Workspace';
import { BookmarkButton } from '@/features/lesson/BookmarkButton';
import { DifficultyBadge, PatternChip } from '@/components/ui/Badges';
import styles from '@/features/lesson/lesson.module.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getSite().problems.map((p) => ({ slug: p.meta.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getSite().problemBySlug.get(slug);
  return p ? { title: p.meta.storyTitle, description: p.meta.summary } : {};
}

function Section({ title, html }: { title?: string; html?: string }) {
  if (!html) return null;
  return (
    <section className={styles.section}>
      {title && <h3>{title}</h3>}
      <Prose html={html} />
    </section>
  );
}

export default async function ProblemPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const site = getSite();
  const p = site.problemBySlug.get(slug);
  if (!p) notFound();
  const { meta } = p;

  const memberships = meta.patternMemberships.flatMap((m) => {
    const pattern = site.patternById.get(m.patternId);
    return pattern ? [{ m, pattern }] : [];
  });
  const primary = memberships[0];
  const primaryVariant = primary?.pattern.meta.variants.find((v) => v.id === primary.m.variantId);
  const transferPattern = site.patternById.get(meta.transfer.answerPatternId);

  const related = memberships.map(({ m, pattern }) => ({
    hue: pattern.meta.hue,
    short: pattern.meta.short,
    patternName: pattern.meta.name,
    patternHref: `/patterns/${pattern.meta.id}/`,
    variantName: pattern.meta.variants.find((v) => v.id === m.variantId)?.name ?? '',
    items: problemsInPattern(site, pattern.meta.id).map(({ problem }) => ({
      id: problem.meta.id,
      slug: problem.meta.slug,
      storyTitle: problem.meta.storyTitle,
      difficulty: problem.meta.difficulty,
    })),
  }));

  const glossaryIds = new Set([...p.terms, ...meta.prerequisites]);
  const glossary = site.glossary.filter((g) => glossaryIds.has(g.id));

  const examples = (
    <ul className={styles.examples}>
      {meta.examples.map((e) => (
        <li key={e.id}>
          <code>{formatInput(e.input)}</code>
          <span>
            Output: <code>{formatValue(e.expectedOutput)}</code>
          </span>
          <span className={styles.sampleNote}>{e.explanation}</span>
        </li>
      ))}
    </ul>
  );

  const brief = [
    {
      id: 'story',
      label: 'Story',
      content: (
        <div className={styles.briefPanel}>
          <Prose html={p.story.Situation ?? ''} />
          <div className={styles.goalBox}>
            <span className="eyebrow">Goal</span>
            <Prose html={p.story.Goal ?? ''} />
          </div>
        </div>
      ),
    },
    { id: 'rules', label: 'Rules', content: <Prose html={p.story.Rules ?? ''} /> },
    {
      id: 'mapping',
      label: 'Mapping',
      content: (
        <table className={styles.mapping}>
          <caption className="sr-only">From the story to the data</caption>
          <thead>
            <tr>
              <th scope="col">In the story</th>
              <th scope="col">In the problem</th>
            </tr>
          </thead>
          <tbody>
            {meta.mapping.map((m) => (
              <tr key={m.story}>
                <td>{m.story}</td>
                <td>{m.formal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      id: 'example',
      label: 'Examples',
      content: (
        <div className={styles.briefPanel}>
          <Prose html={p.story['Worked example'] ?? ''} />
          {examples}
        </div>
      ),
    },
    {
      id: 'formal',
      label: 'Formal',
      content: (
        <div className={styles.briefPanel}>
          <p className={styles.formalTitle}>{meta.title}</p>
          <Prose html={p.statementHtml} />
        </div>
      ),
    },
  ];

  const solutions = meta.ladder
    .filter((r) => p.code[r.id] && Object.keys(p.code[r.id]!).length > 0)
    .map((r) => ({ id: r.id, name: r.name, code: p.code[r.id]! }));

  return (
    <div className="page page-wide">
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/patterns/">Patterns</Link>
        {primary && (
          <>
            <span aria-hidden>/</span>
            <Link href={`/patterns/${primary.pattern.meta.id}/`}>{primary.pattern.meta.name}</Link>
            {primaryVariant && (
              <>
                <span aria-hidden>/</span>
                <span>{primaryVariant.name}</span>
              </>
            )}
          </>
        )}
      </nav>
      <header className={styles.head}>
        <div className={styles.headText}>
          <h1 className={styles.title}>{meta.storyTitle}</h1>
          <div className={styles.headMeta}>
            <DifficultyBadge level={meta.difficulty} />
            {memberships.map(({ pattern }) => (
              <PatternChip key={pattern.meta.id} id={pattern.meta.id} name={pattern.meta.name} hue={pattern.meta.hue} short={pattern.meta.short} />
            ))}
            <span className={styles.canonical}>
              {meta.title}
              {meta.aka && <span className={styles.aka}> · {meta.aka}</span>}
            </span>
          </div>
        </div>
        <BookmarkButton problemId={meta.id} />
      </header>

      <Workspace
        problemId={meta.id}
        contentVersion={meta.contentVersion}
        lesson={lessonData(p)}
        brief={brief}
        ladder={p.ladder.map((r) => ({
          id: r.id,
          level: r.level,
          name: r.name,
          ideaHtml: r.ideaHtml,
          insightHtml: r.insightHtml,
          time: r.time,
          space: r.space,
          approachId: r.approachId,
        }))}
        why={<Section title="Why it works" html={p.explanation['Why it works']} />}
        complexity={<Section title="Complexity" html={p.explanation.Complexity} />}
        edgeCases={<Prose html={p.explanation['Edge cases'] ?? ''} />}
        transfer={{
          problem: meta.transfer.problem,
          answer: transferPattern?.meta.name ?? meta.transfer.answerPatternId,
          answerHref: `/patterns/${meta.transfer.answerPatternId}/`,
          explanation: meta.transfer.explanation,
        }}
        statement={
          <>
            <h2>{meta.title}</h2>
            <Prose html={p.statementHtml} />
          </>
        }
        samples={meta.examples.map((e) => ({
          label: e.label,
          input: formatInput(e.input),
          output: formatValue(e.expectedOutput),
          explanation: e.explanation,
        }))}
        selfCheck={meta.practice.selfCheck}
        starter={p.starter}
        solutions={solutions}
        practiceLink={meta.practiceLink}
        related={related}
        glossary={glossary.map((g) => ({ id: g.id, term: g.term, definition: g.definition }))}
      />
    </div>
  );
}
