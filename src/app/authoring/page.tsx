import type { Metadata } from 'next';
import { getAllContent, runFor } from '@/lib/content/load';
import { lessonData } from '@/lib/content/lessonData';
import { AuthoringPreview, type AuthoringProblem } from '@/features/authoring/AuthoringPreview';

export const metadata: Metadata = { title: 'Authoring preview', robots: { index: false } };

/** Drafts are only loaded in development, or when explicitly enabled for an editors-only build. */
const enabled = process.env.NODE_ENV !== 'production' || process.env.PATTERN_ATLAS_AUTHORING === '1';

export default function AuthoringPage() {
  if (!enabled) {
    return (
      <div className="page">
        <h1 style={{ fontSize: 36 }}>Authoring preview</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          The authoring preview runs in development. Start it with <code>npm run dev</code> and open <code>/authoring/</code>.
          Drafts are never included in a production build.
        </p>
      </div>
    );
  }

  const all = getAllContent();
  const problems: AuthoringProblem[] = all.problems.map((p) => {
    let lesson: AuthoringProblem['lesson'] = null;
    let error: string | null = null;
    try {
      if (p.meta.defaultApproach) runFor(p, p.meta.defaultApproach, p.meta.examples[0]!.id);
      lesson = lessonData(p);
      if (!lesson) error = 'Reading lesson: no walkthrough adapter. Open the lesson page to preview it.';
    } catch (e) {
      error = (e as Error).message;
    }
    return {
      id: p.meta.id,
      slug: p.meta.slug,
      title: p.meta.storyTitle,
      status: p.meta.status,
      lesson,
      error,
    };
  });

  return (
    <div className="page">
      <span className="eyebrow">Development only</span>
      <h1 style={{ fontSize: 36, margin: '6px 0 10px' }}>Authoring preview</h1>
      <p className="lede">
        Every record, drafts included, with validation results. Pick a lesson to see its raw trace beside the public player.
        Run <code>npm run validate</code> for the same checks in a terminal.
      </p>
      <AuthoringPreview
        problems={problems}
        patterns={all.patterns.map((p) => ({ id: p.meta.id, name: p.meta.name, status: p.meta.status }))}
        issues={all.issues}
      />
    </div>
  );
}
