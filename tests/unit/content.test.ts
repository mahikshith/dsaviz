/**
 * Publication rules. Each failure case copies the real content to a temporary
 * folder, breaks one thing, and checks that validation names it.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { loadContent, problemsInPattern, publishedOnly } from '@/lib/content/load';
import { parseReference } from '@/lib/content/code';
import { renderMarkdown } from '@/lib/content/markdown';

const CONTENT = path.join(process.cwd(), 'content');
const temps: string[] = [];

function copyContent(mutate: (root: string) => void) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pattern-atlas-'));
  temps.push(root);
  fs.cpSync(CONTENT, root, { recursive: true });
  mutate(root);
  return loadContent(root);
}
const errors = (r: ReturnType<typeof loadContent>) => r.issues.filter((i) => i.level === 'error').map((i) => `${i.where}: ${i.message}`);
const editJson = (file: string, fn: (j: Record<string, unknown>) => void) => {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  fn(j);
  fs.writeFileSync(file, JSON.stringify(j, null, 2));
};

afterAll(() => {
  for (const t of temps) fs.rmSync(t, { recursive: true, force: true });
});

describe('the shipped content', () => {
  const { content, issues } = loadContent(CONTENT);

  it('has no validation errors', () => {
    expect(issues.filter((i) => i.level === 'error')).toEqual([]);
  });

  it('includes the seed lessons from the brief among the published lessons', () => {
    const ids = publishedOnly(content).problems.map((p) => p.meta.id);
    for (const id of ['book-voucher-pair', 'busiest-three-days', 'chalkboard-slogan', 'neighborhood-route', 'parcel-compartments']) expect(ids).toContain(id);
    expect(ids.length).toBe(59);
  });

  it('excludes drafts from published patterns and counts', () => {
    // Every shipped pattern is published, so mark one as a draft in memory.
    const withDraft = {
      ...content,
      patterns: content.patterns.map((p) => (p.meta.id === 'depth-first-search' ? { ...p, meta: { ...p.meta, status: 'draft' as const } } : p)),
    };
    const published = publishedOnly(withDraft);
    expect(published.patterns.every((p) => p.meta.status === 'published')).toBe(true);
    expect(published.patterns.map((p) => p.meta.id)).not.toContain('depth-first-search');
  });

  it('lists one canonical problem under several patterns without duplicating it', () => {
    const published = publishedOnly(content);
    const inWindow = problemsInPattern(published, 'sliding-window').map((x) => x.problem.meta.id);
    const inPrefix = problemsInPattern(published, 'prefix-sums').map((x) => x.problem.meta.id);
    expect(inWindow).toContain('busiest-three-days');
    expect(inPrefix).toContain('busiest-three-days');
    expect(published.problems.filter((p) => p.meta.id === 'busiest-three-days')).toHaveLength(1);
  });

  it('every story is short enough to read before the walkthrough (≤ 180 words of situation)', () => {
    for (const p of content.problems) {
      const words = (p.story.Situation ?? '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      expect(words, p.meta.id).toBeLessThanOrEqual(180);
    }
  });
});

// Each case copies and reloads the whole content folder, which takes several seconds.
describe('validation catches broken content', { timeout: 30_000 }, () => {
  it('a missing story section', () => {
    const r = copyContent((root) => {
      const f = path.join(root, 'problems/book-voucher-pair/story.md');
      fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('## Rules', '## Notes'));
    });
    expect(errors(r).join('\n')).toMatch(/missing section "## Rules"/);
  });

  it('an unknown adapter', () => {
    const r = copyContent((root) =>
      editJson(path.join(root, 'problems/book-voucher-pair/meta.json'), (j) => {
        (j.approaches as { adapterId: string }[])[0]!.adapterId = 'made-up-v1';
      }),
    );
    expect(errors(r).join('\n')).toMatch(/unknown adapter "made-up-v1"/);
  });

  it('an invalid pattern reference', () => {
    const r = copyContent((root) =>
      editJson(path.join(root, 'problems/parcel-compartments/meta.json'), (j) => {
        (j.patternMemberships as { patternId: string }[])[0]!.patternId = 'queue-magic';
      }),
    );
    expect(errors(r).join('\n')).toMatch(/unknown pattern "queue-magic"/);
  });

  it('a duplicate slug', () => {
    const r = copyContent((root) => {
      fs.cpSync(path.join(root, 'problems/chalkboard-slogan'), path.join(root, 'problems/chalkboard-copy'), { recursive: true });
    });
    expect(errors(r).join('\n')).toMatch(/duplicate id "chalkboard-slogan"/);
  });

  it('a malformed example input', () => {
    const r = copyContent((root) =>
      editJson(path.join(root, 'problems/busiest-three-days/meta.json'), (j) => {
        (j.examples as { input: { k: number } }[])[0]!.input.k = 99;
      }),
    );
    expect(errors(r).join('\n')).toMatch(/example "week" is not valid/);
  });

  it('a wrong expected output', () => {
    const r = copyContent((root) =>
      editJson(path.join(root, 'problems/parcel-compartments/meta.json'), (j) => {
        (j.examples as { expectedOutput: unknown }[])[1]!.expectedOutput = true;
      }),
    );
    expect(errors(r).join('\n')).toMatch(/example "crossed" with stack: wrong output/);
  });

  it('a code anchor missing from one language', () => {
    const r = copyContent((root) => {
      const f = path.join(root, 'problems/book-voucher-pair/reference/opposite-pointers.ts');
      fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(' // @anchor move-right', ''));
    });
    expect(errors(r).join('\n')).toMatch(/opposite-pointers\.typescript: no line is marked with anchor "move-right"/);
  });

  it('a checkpoint that points at a frame not in the trace', () => {
    const r = copyContent((root) => {
      const f = path.join(root, 'problems/book-voucher-pair/checkpoints.json');
      fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('4-compare-sum', '40-compare-sum'));
    });
    expect(errors(r).join('\n')).toMatch(/references frame "40-compare-sum"/);
  });

  it('a narration template that uses a field the event does not have', () => {
    const r = copyContent((root) =>
      editJson(path.join(root, 'problems/book-voucher-pair/narration.json'), (j) => {
        (j['opposite-pointers'] as Record<string, { story: string }>)['move-left']!.story = 'Moved to {nowhere}.';
      }),
    );
    expect(errors(r).join('\n')).toMatch(/uses \{nowhere\}/);
  });

  it('an unsafe Markdown link and raw HTML', () => {
    const r = copyContent((root) => {
      const f = path.join(root, 'problems/book-voucher-pair/story.md');
      fs.writeFileSync(f, fs.readFileSync(f, 'utf8') + '\n[click](javascript:alert(1)) <script>x</script>\n');
    });
    const text = errors(r).join('\n');
    expect(text).toMatch(/unsafe or unsupported link/);
    expect(text).toMatch(/raw HTML is not allowed/);
  });

  it('a published path that references a draft problem', () => {
    const r = copyContent((root) =>
      editJson(path.join(root, 'problems/chalkboard-slogan/meta.json'), (j) => {
        j.status = 'draft';
      }),
    );
    expect(errors(r).join('\n')).toMatch(/published path references draft problem "chalkboard-slogan"/);
    expect(publishedOnly(r.content).problems.map((p) => p.meta.id)).not.toContain('chalkboard-slogan');
  });
});

describe('markdown and code helpers', () => {
  it('escapes HTML and turns glossary references into buttons', () => {
    const { html, terms, issues } = renderMarkdown('A [[invariant]] and [[zero-based-index|zero-based]] index & <b>', new Set(['invariant', 'zero-based-index']));
    expect(html).toContain('data-term="invariant"');
    expect(html).toContain('>zero-based</button>');
    expect(html).toContain('&amp;');
    expect(html).not.toContain('<b>');
    expect(terms).toEqual(['invariant', 'zero-based-index']);
    expect(issues).toHaveLength(1);
  });

  it('strips anchor markers and maps them to 1-based lines', () => {
    const listing = parseReference('def f(x):  # @anchor signature\n    return x  # @anchor a, b\n', 'python');
    expect(listing.plain).toEqual(['def f(x):', '    return x']);
    expect(listing.anchors).toEqual({ signature: [1], a: [2], b: [2] });
  });
});
