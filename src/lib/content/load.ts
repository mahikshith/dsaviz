/**
 * Loads, validates and indexes every content record. Used by pages at build
 * time, by `npm run validate`, by the authoring preview and by tests.
 *
 * Published views exclude drafts everywhere: counts, catalogs, routes, search.
 */
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { adapterAnchors, type RuntimeAdapter } from '@/engine/contracts/trace';
import { checkOutput } from '@/engine/checkers';
import { placeholders, templateKey, type NarrationSet } from '@/engine/narrate';
import { ADAPTERS } from '@/engine/registry/all';
import { isAdapterId } from '@/engine/registry/ids';
import { prepareRun, type PreparedRun } from '@/features/player/prepare';
import { parseReference, type CodeListing } from './code';
import { renderInline, renderMarkdown, splitSections } from './markdown';
import { SOLVERS } from '@/engine/solvers';
import {
  REQUIRED_SECTIONS,
  checkpointsSchema,
  familySchema,
  glossarySchema,
  narrationSchema,
  pathSchema,
  patternSchema,
  problemSchema,
  topicSchema,
  type Checkpoint,
  type Language,
  type PathMeta,
  type PatternMeta,
  type ProblemMeta,
} from './schema';

export type Issue = { level: 'error' | 'warning'; where: string; message: string };

export type Topic = z.infer<typeof topicSchema>;
export type Family = z.infer<typeof familySchema>;
export type GlossaryEntry = z.infer<typeof glossarySchema>;

export type LoadedPattern = {
  meta: PatternMeta;
  sections: Record<string, string>;
  terms: string[];
};

export type LoadedProblem = {
  meta: ProblemMeta;
  story: Record<string, string>;
  statementHtml: string;
  explanation: Record<string, string>;
  ladder: LadderRung[];
  narration: Record<string, NarrationSet>;
  checkpoints: Checkpoint[];
  code: Record<string, Partial<Record<Language, CodeListing>>>;
  starter: Partial<Record<Language, string>>;
  terms: string[];
};

export type LadderRung = ProblemMeta['ladder'][number] & { ideaHtml: string; insightHtml: string | null };

export type ContentSet = {
  topics: Topic[];
  families: Family[];
  glossary: GlossaryEntry[];
  patterns: LoadedPattern[];
  problems: LoadedProblem[];
  paths: PathMeta[];
};

export type LoadResult = { content: ContentSet; issues: Issue[] };

const LANG_EXT: Record<Language, string> = { python: 'py', typescript: 'ts' };

function readJson(file: string, issues: Issue[]): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    issues.push({ level: 'error', where: file, message: `cannot read JSON: ${(e as Error).message}` });
    return undefined;
  }
}

function readText(file: string, issues: Issue[], required = true): string | null {
  if (!fs.existsSync(file)) {
    if (required) issues.push({ level: 'error', where: file, message: 'file is missing' });
    return null;
  }
  return fs.readFileSync(file, 'utf8');
}

function parseWith<T>(schema: z.ZodType<T>, value: unknown, where: string, issues: Issue[]): T | null {
  const r = schema.safeParse(value);
  if (r.success) return r.data;
  for (const e of r.error.issues) issues.push({ level: 'error', where, message: `${e.path.join('.') || '(root)'}: ${e.message}` });
  return null;
}

function listDirs(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();
}

function renderSections(
  source: string | null,
  required: readonly string[],
  where: string,
  glossaryIds: Set<string>,
  issues: Issue[],
  draft: boolean,
) {
  const out: Record<string, string> = {};
  const terms: string[] = [];
  if (source === null) return { out, terms };
  const sections = splitSections(source);
  for (const name of required) {
    if (!sections.get(name)) {
      issues.push({ level: draft ? 'warning' : 'error', where, message: `missing section "## ${name}"` });
    }
  }
  for (const [name, body] of sections) {
    const r = renderMarkdown(body, glossaryIds);
    out[name] = r.html;
    terms.push(...r.terms);
    for (const i of r.issues) issues.push({ level: 'error', where: `${where} § ${name}`, message: i.message });
  }
  return { out, terms };
}

export function loadContent(root = path.join(process.cwd(), 'content')): LoadResult {
  const issues: Issue[] = [];
  const topics = parseWith(z.array(topicSchema), readJson(path.join(root, 'topics.json'), issues), 'topics.json', issues) ?? [];
  const families = parseWith(z.array(familySchema), readJson(path.join(root, 'families.json'), issues), 'families.json', issues) ?? [];
  const glossary = parseWith(z.array(glossarySchema), readJson(path.join(root, 'glossary.json'), issues), 'glossary.json', issues) ?? [];
  const glossaryIds = new Set(glossary.map((g) => g.id));
  const topicIds = new Set(topics.map((t) => t.id));
  const familyIds = new Set(families.map((f) => f.id));

  // ---- Patterns ----
  const patterns: LoadedPattern[] = [];
  for (const dir of listDirs(path.join(root, 'patterns'))) {
    const where = `patterns/${dir}`;
    const meta = parseWith(patternSchema, readJson(path.join(root, 'patterns', dir, 'pattern.json'), issues), `${where}/pattern.json`, issues);
    if (!meta) continue;
    if (meta.id !== dir) issues.push({ level: 'error', where, message: `id "${meta.id}" must match its folder name` });
    if (!familyIds.has(meta.family)) issues.push({ level: 'error', where, message: `unknown family "${meta.family}"` });
    for (const t of meta.topics) if (!topicIds.has(t)) issues.push({ level: 'error', where, message: `unknown topic "${t}"` });
    for (const p of meta.prerequisites)
      if (!glossaryIds.has(p)) issues.push({ level: 'error', where, message: `prerequisite "${p}" is not a glossary concept` });
    const md = readText(path.join(root, 'patterns', dir, 'pattern.md'), issues);
    const { out, terms } = renderSections(md, REQUIRED_SECTIONS.pattern, `${where}/pattern.md`, glossaryIds, issues, meta.status === 'draft');
    patterns.push({ meta, sections: out, terms });
  }
  const patternById = new Map(patterns.map((p) => [p.meta.id, p]));

  // ---- Problems ----
  const problems: LoadedProblem[] = [];
  for (const dir of listDirs(path.join(root, 'problems'))) {
    const where = `problems/${dir}`;
    const base = path.join(root, 'problems', dir);
    const meta = parseWith(problemSchema, readJson(path.join(base, 'meta.json'), issues), `${where}/meta.json`, issues);
    if (!meta) continue;
    const draft = meta.status === 'draft';
    if (meta.slug !== dir) issues.push({ level: 'error', where, message: `slug "${meta.slug}" must match its folder name` });
    for (const t of meta.topics) if (!topicIds.has(t)) issues.push({ level: 'error', where, message: `unknown topic "${t}"` });
    for (const p of meta.prerequisites)
      if (!glossaryIds.has(p)) issues.push({ level: 'error', where, message: `prerequisite "${p}" is not a glossary concept` });
    for (const m of meta.patternMemberships) {
      const pattern = patternById.get(m.patternId);
      if (!pattern) issues.push({ level: 'error', where, message: `unknown pattern "${m.patternId}"` });
      else if (!pattern.meta.variants.some((v) => v.id === m.variantId))
        issues.push({ level: 'error', where, message: `pattern "${m.patternId}" has no variant "${m.variantId}"` });
    }
    if (!patternById.has(meta.transfer.answerPatternId))
      issues.push({ level: 'error', where, message: `transfer answer "${meta.transfer.answerPatternId}" is not a pattern` });
    const hasWalkthrough = meta.approaches.length > 0;
    if (hasWalkthrough && !meta.approaches.some((a) => a.id === meta.defaultApproach))
      issues.push({ level: 'error', where, message: `defaultApproach "${meta.defaultApproach ?? ''}" is not one of the approaches` });
    if (!hasWalkthrough && !meta.solver)
      issues.push({ level: 'error', where, message: 'a lesson without a walkthrough needs a "solver" so its examples can be checked' });
    if (meta.solver && !SOLVERS[meta.solver]) issues.push({ level: 'error', where, message: `unknown solver "${meta.solver}"` });
    dupes(meta.examples.map((e) => e.id), `${where} examples`, issues);
    dupes(meta.approaches.map((a) => a.id), `${where} approaches`, issues);
    dupes(meta.ladder.map((r) => r.id), `${where} ladder`, issues);
    validateLadder(meta, where, issues);

    const story = renderSections(readText(path.join(base, 'story.md'), issues), REQUIRED_SECTIONS.story, `${where}/story.md`, glossaryIds, issues, draft);
    const explanation = renderSections(
      readText(path.join(base, 'explanation.md'), issues),
      REQUIRED_SECTIONS.explanation,
      `${where}/explanation.md`,
      glossaryIds,
      issues,
      draft,
    );
    const statementSrc = readText(path.join(base, 'statement.md'), issues);
    const statement = statementSrc ? renderMarkdown(statementSrc, glossaryIds) : { html: '', terms: [], issues: [] };
    for (const i of statement.issues) issues.push({ level: 'error', where: `${where}/statement.md`, message: i.message });

    const ladderTerms: string[] = [];
    const ladder = meta.ladder.map((r) => {
      const idea = renderInline(r.idea, glossaryIds);
      const insight = r.insight ? renderInline(r.insight, glossaryIds) : null;
      for (const x of [idea, insight]) {
        if (!x) continue;
        ladderTerms.push(...x.terms);
        for (const i of x.issues) issues.push({ level: 'error', where: `${where}/meta.json ladder.${r.id}`, message: i.message });
      }
      return { ...r, ideaHtml: idea.html, insightHtml: insight?.html ?? null };
    });

    const narration = hasWalkthrough
      ? (parseWith(narrationSchema, readJson(path.join(base, 'narration.json'), issues), `${where}/narration.json`, issues) ?? {})
      : {};
    const checkpoints = hasWalkthrough
      ? (parseWith(checkpointsSchema, readJson(path.join(base, 'checkpoints.json'), issues), `${where}/checkpoints.json`, issues) ?? [])
      : [];
    if (!draft && hasWalkthrough && checkpoints.length === 0)
      issues.push({ level: 'error', where, message: 'a published walkthrough needs at least one prediction checkpoint' });
    dupes(checkpoints.map((c) => c.id), `${where} checkpoints`, issues);

    // Reference code: required for every walkthrough approach in its languages, optional for other rungs.
    const code: LoadedProblem['code'] = {};
    for (const approach of meta.approaches) {
      code[approach.id] = {};
      for (const lang of approach.languages) {
        const src = readText(path.join(base, 'reference', `${approach.id}.${LANG_EXT[lang]}`), issues);
        if (src !== null) code[approach.id]![lang] = parseReference(src, lang);
      }
    }
    for (const rung of meta.ladder) {
      if (code[rung.id]) continue;
      for (const lang of ['python', 'typescript'] as const) {
        const src = readText(path.join(base, 'reference', `${rung.id}.${LANG_EXT[lang]}`), issues, false);
        if (src !== null) (code[rung.id] ??= {})[lang] = parseReference(src, lang);
      }
    }
    const optimal = meta.ladder[meta.ladder.length - 1]!;
    if (!draft && !code[optimal.id]?.python)
      issues.push({ level: 'error', where, message: `the optimal rung "${optimal.id}" needs reference/${optimal.id}.py` });

    const starter: LoadedProblem['starter'] = {};
    for (const lang of ['python', 'typescript'] as const) {
      const src = readText(path.join(base, 'practice', `starter.${LANG_EXT[lang]}`), issues, false);
      if (src !== null) starter[lang] = src.replace(/\r\n/g, '\n');
      else {
        const derived = deriveStarter(code[optimal.id]?.[lang]);
        if (derived) starter[lang] = derived;
      }
    }
    if (!draft && Object.keys(starter).length === 0)
      issues.push({ level: 'error', where, message: 'a published lesson needs practice starters or reference code to derive them from' });

    problems.push({
      meta,
      story: story.out,
      statementHtml: statement.html,
      explanation: explanation.out,
      ladder,
      narration,
      checkpoints,
      code,
      starter,
      terms: [...new Set([...story.terms, ...explanation.terms, ...statement.terms, ...ladderTerms])],
    });
  }
  dupes(problems.map((p) => p.meta.id), 'problem ids', issues);
  dupes(problems.map((p) => p.meta.slug), 'problem slugs', issues);
  dupes(patterns.map((p) => p.meta.id), 'pattern ids', issues);

  // ---- Algorithm checks: run every approach on every example ----
  for (const p of problems) validateRuns(p, issues);

  // ---- Paths ----
  const paths: PathMeta[] = [];
  const problemIds = new Set(problems.map((p) => p.meta.id));
  const publishedProblemIds = new Set(problems.filter((p) => p.meta.status === 'published').map((p) => p.meta.id));
  for (const file of fs.existsSync(path.join(root, 'paths')) ? fs.readdirSync(path.join(root, 'paths')).filter((f) => f.endsWith('.json')).sort() : []) {
    const meta = parseWith(pathSchema, readJson(path.join(root, 'paths', file), issues), `paths/${file}`, issues);
    if (!meta) continue;
    for (const s of meta.sections)
      for (const id of s.problems) {
        if (!problemIds.has(id)) issues.push({ level: 'error', where: `paths/${file}`, message: `unknown problem "${id}"` });
        else if (meta.status === 'published' && !publishedProblemIds.has(id))
          issues.push({ level: 'error', where: `paths/${file}`, message: `published path references draft problem "${id}"` });
      }
    paths.push(meta);
  }

  return { content: { topics, families, glossary, patterns, problems, paths }, issues };
}

function validateLadder(meta: ProblemMeta, where: string, issues: Issue[]) {
  const rungs = meta.ladder;
  if (rungs[0]!.level !== 'brute-force')
    issues.push({ level: 'error', where, message: 'the ladder must start with a brute-force rung' });
  if (rungs[rungs.length - 1]!.level !== 'optimal')
    issues.push({ level: 'error', where, message: 'the ladder must end with an optimal rung' });
  rungs.forEach((r, i) => {
    if (i > 0 && !r.insight)
      issues.push({ level: 'error', where, message: `ladder rung "${r.id}" needs an "insight": what leads from the previous rung to this one` });
    if (r.approachId && !meta.approaches.some((a) => a.id === r.approachId))
      issues.push({ level: 'error', where, message: `ladder rung "${r.id}" links to unknown approach "${r.approachId}"` });
  });
  for (const a of meta.approaches)
    if (!rungs.some((r) => r.approachId === a.id))
      issues.push({ level: 'error', where, message: `walkthrough approach "${a.id}" is not on the ladder` });
}

/**
 * A practice starter from the reference solution: everything before its first
 * function (imports, helper classes), then the signature with an empty body.
 */
function deriveStarter(listing: CodeListing | undefined): string | null {
  if (!listing) return null;
  const python = listing.language === 'python';
  const i = listing.plain.findIndex((l) => (python ? l.startsWith('def ') : l.startsWith('function ')));
  if (i < 0) return null;
  const signature = listing.plain[i]!;
  if (!python && !signature.trimEnd().endsWith('{')) return null;
  const prefix = listing.plain.slice(0, i).join('\n').trim();
  const body = python ? '    # Write your approach here.\n    pass\n' : '  // Write your approach here.\n}\n';
  return `${prefix ? prefix + '\n\n' : ''}${signature}\n${body}`;
}

function dupes(ids: string[], where: string, issues: Issue[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) issues.push({ level: 'error', where, message: `duplicate id "${id}"` });
    seen.add(id);
  }
}

/** Builds the run for one approach and example, or reports why it cannot. */
export function runFor(p: LoadedProblem, approachId: string | undefined, exampleId: string): PreparedRun {
  const approach = p.meta.approaches.find((a) => a.id === approachId);
  const example = p.meta.examples.find((e) => e.id === exampleId);
  if (!approach || !example) throw new Error(`no approach ${approachId} or example ${exampleId} in ${p.meta.id}`);
  const adapter = adapterFor(approach.adapterId);
  const parsed = adapter.parseInput(example.input);
  if (!parsed.ok) throw new Error(parsed.errors.map((e) => e.message).join('; '));
  return prepareRun(adapter, parsed.value, { approachId: approach.id, exampleId, display: example.display, checkpoints: p.checkpoints });
}

function adapterFor(id: string): RuntimeAdapter {
  if (!isAdapterId(id)) throw new Error(`unknown adapter "${id}"`);
  return ADAPTERS[id];
}

function validateRuns(p: LoadedProblem, issues: Issue[]) {
  const where = `problems/${p.meta.slug}`;

  // Reference solver: every example's expected output must match what reviewed code computes.
  const solver = p.meta.solver ? SOLVERS[p.meta.solver] : undefined;
  if (solver) {
    for (const example of p.meta.examples) {
      let out: unknown;
      try {
        out = solver(structuredClone(example.input));
      } catch (e) {
        issues.push({ level: 'error', where, message: `solver failed on example "${example.id}": ${(e as Error).message}` });
        continue;
      }
      const check = checkOutput(p.meta.checker, example.input, out, example.expectedOutput);
      if (!check.ok) issues.push({ level: 'error', where, message: `example "${example.id}": wrong expected output, ${check.reason}` });
    }
  }
  const emittedByApproach = new Map<string, Set<string>>();
  for (const approach of p.meta.approaches) {
    if (!isAdapterId(approach.adapterId)) {
      issues.push({ level: 'error', where, message: `approach "${approach.id}" uses unknown adapter "${approach.adapterId}"` });
      continue;
    }
    const adapter = ADAPTERS[approach.adapterId];

    // Narration: every event kind and variant needs a story and formal template using known fields.
    const set = p.narration[approach.id];
    if (!set) issues.push({ level: 'error', where, message: `narration.json has no templates for approach "${approach.id}"` });
    for (const [kind, spec] of Object.entries(adapter.events)) {
      const keys = spec.variants?.length ? spec.variants.map((v) => templateKey({ kind, anchor: spec.anchor, variant: v })) : [kind];
      for (const key of keys) {
        const t = set?.[key] ?? set?.[kind];
        if (!t) {
          if (set) issues.push({ level: 'error', where, message: `approach "${approach.id}" has no narration for event "${key}"` });
          continue;
        }
        for (const text of [t.story, t.formal])
          for (const name of placeholders(text))
            if (!spec.fields.includes(name))
              issues.push({ level: 'error', where, message: `narration "${key}" uses {${name}}, which event "${kind}" does not provide` });
      }
    }
    if (set)
      for (const key of Object.keys(set))
        if (!adapter.events[key.split(':')[0]!])
          issues.push({ level: 'warning', where, message: `narration "${key}" matches no event of ${adapter.id}` });

    // Code anchors: every anchor the adapter can emit must exist in every reference language.
    const anchors = adapterAnchors(adapter);
    for (const lang of approach.languages) {
      const listing = p.code[approach.id]?.[lang];
      if (!listing) continue;
      for (const a of anchors)
        if (!listing.anchors[a]?.length)
          issues.push({ level: 'error', where, message: `${approach.id}.${lang}: no line is marked with anchor "${a}"` });
      for (const [a, lines] of Object.entries(listing.anchors)) {
        if (!anchors.includes(a)) issues.push({ level: 'error', where, message: `${approach.id}.${lang}: anchor "${a}" is not emitted by ${adapter.id}` });
        for (const n of lines)
          if (n < 1 || n > listing.plain.length) issues.push({ level: 'error', where, message: `${approach.id}.${lang}: anchor "${a}" points outside the source` });
      }
    }

    // Examples: input must parse, output must satisfy the problem's checker.
    const emitted = new Set<string>();
    emittedByApproach.set(approach.id, emitted);
    for (const example of p.meta.examples) {
      const parsed = adapter.parseInput(example.input);
      if (!parsed.ok) {
        issues.push({ level: 'error', where, message: `example "${example.id}" is not valid for ${approach.id}: ${parsed.errors.map((e) => e.message).join('; ')}` });
        continue;
      }
      let run: PreparedRun;
      try {
        run = prepareRun(adapter, parsed.value, { approachId: approach.id, exampleId: example.id, display: example.display, checkpoints: p.checkpoints });
      } catch (e) {
        issues.push({ level: 'error', where, message: `example "${example.id}" failed to trace with ${approach.id}: ${(e as Error).message}` });
        continue;
      }
      for (const f of run.frames) emitted.add(f.event.anchor);
      const check = checkOutput(p.meta.checker, parsed.value, run.output, example.expectedOutput);
      if (!check.ok) issues.push({ level: 'error', where, message: `example "${example.id}" with ${approach.id}: wrong output, ${check.reason}` });
    }
  }

  // Checkpoints must point at a frame that exists in that approach and example.
  for (const c of p.checkpoints) {
    const approach = p.meta.approaches.find((a) => a.id === c.approachId);
    const example = p.meta.examples.find((e) => e.id === c.exampleId);
    if (!approach || !example) {
      issues.push({ level: 'error', where, message: `checkpoint "${c.id}" references unknown approach or example` });
      continue;
    }
    if (!isAdapterId(approach.adapterId)) continue;
    try {
      const run = runFor(p, approach.id, example.id);
      if (!run.frames.some((f) => f.id === c.frameId))
        issues.push({ level: 'error', where, message: `checkpoint "${c.id}" references frame "${c.frameId}", which is not in the trace` });
      else if (run.frames[run.frames.length - 1]!.id === c.frameId)
        issues.push({ level: 'error', where, message: `checkpoint "${c.id}" is on the last frame, so there is no next step to predict` });
    } catch {
      /* already reported above */
    }
  }
}

// ---------- Published views ----------

export type Site = ContentSet & {
  issues: Issue[];
  patternById: Map<string, LoadedPattern>;
  problemById: Map<string, LoadedProblem>;
  problemBySlug: Map<string, LoadedProblem>;
};

function index(content: ContentSet, issues: Issue[]): Site {
  return {
    ...content,
    issues,
    patternById: new Map(content.patterns.map((p) => [p.meta.id, p])),
    problemById: new Map(content.problems.map((p) => [p.meta.id, p])),
    problemBySlug: new Map(content.problems.map((p) => [p.meta.slug, p])),
  };
}

/** Removes drafts and any membership pointing at a draft pattern. */
export function publishedOnly(content: ContentSet): ContentSet {
  const patterns = content.patterns.filter((p) => p.meta.status === 'published');
  const patternIds = new Set(patterns.map((p) => p.meta.id));
  const problems = content.problems
    .filter((p) => p.meta.status === 'published')
    .map((p) => ({
      ...p,
      meta: { ...p.meta, patternMemberships: p.meta.patternMemberships.filter((m) => patternIds.has(m.patternId)) },
    }));
  return { ...content, patterns, problems, paths: content.paths.filter((p) => p.status === 'published') };
}

let cached: { published: Site; all: Site } | null = null;

/** The content used by public pages. Throws on any validation error so a broken lesson never ships. */
export function getSite(): Site {
  if (!cached) {
    const { content, issues } = loadContent();
    const errors = issues.filter((i) => i.level === 'error');
    if (errors.length) {
      throw new Error(`Content validation failed:\n${errors.map((e) => `  ${e.where}: ${e.message}`).join('\n')}\nRun npm run validate for details.`);
    }
    cached = { published: index(publishedOnly(content), issues), all: index(content, issues) };
  }
  return cached.published;
}

/** Drafts included. Only for the development authoring preview. */
export function getAllContent(): Site {
  getSite();
  return cached!.all;
}

const DIFFICULTY_RANK = { introductory: 0, easy: 1, medium: 2, hard: 3 } as const;

/** Problems in a pattern, easiest first; within a difficulty, in the authored order. */
export function problemsInPattern(site: ContentSet, patternId: string) {
  return site.problems
    .flatMap((p) => p.meta.patternMemberships.filter((m) => m.patternId === patternId).map((m) => ({ problem: p, membership: m })))
    .sort(
      (a, b) =>
        DIFFICULTY_RANK[a.problem.meta.difficulty] - DIFFICULTY_RANK[b.problem.meta.difficulty] || a.membership.order - b.membership.order,
    );
}
