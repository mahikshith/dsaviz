/**
 * Runtime schemas for repository-authored content. Everything under content/
 * is parsed through these before any page or validation uses it.
 */
import { z } from 'zod';
import { CHECKER_IDS } from '@/engine/checkers';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'use lowercase words joined by dashes');
export const statusSchema = z.enum(['published', 'draft']);
export const difficultySchema = z.enum(['introductory', 'easy', 'medium', 'hard']);
export const languageSchema = z.enum(['python', 'typescript']);
export type Language = z.infer<typeof languageSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;

export const topicSchema = z.object({ id: slug, name: z.string().min(1), summary: z.string().min(1) });
export const familySchema = z.object({ id: slug, name: z.string().min(1), summary: z.string().min(1), order: z.number().int() });
export const glossarySchema = z.object({
  id: slug,
  term: z.string().min(1),
  definition: z.string().min(10).max(320),
});

// ---- Static scene models used for small pattern illustrations ----
const tone = z.enum(['primary', 'comparison', 'success', 'danger', 'accent', 'neutral']);
const cellState = z.enum(['idle', 'primary', 'comparison', 'success', 'danger', 'window', 'entering', 'leaving', 'discarded', 'muted', 'pending']);
const swatch = z.enum(['primary', 'comparison', 'success', 'danger', 'discarded', 'window', 'accent', 'neutral']);
export const sceneSchema = z.object({
  arrays: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        cells: z.array(z.object({ id: z.string(), label: z.string(), sub: z.string(), state: cellState, bar: z.number().optional() })),
        pointers: z.array(z.object({ id: z.string(), label: z.string(), index: z.number().int(), tone, side: z.enum(['above', 'below']) })),
        bands: z.array(
          z.object({ id: z.string(), from: z.number().int(), to: z.number().int(), label: z.string(), tone, side: z.enum(['above', 'below']) }),
        ),
        offset: z.number().optional(),
        bars: z.object({ max: z.number().positive() }).optional(),
      }),
    )
    .optional(),
  graph: z
    .object({
      nodes: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          caption: z.string().optional(),
          x: z.number(),
          y: z.number(),
          state: z.enum(['idle', 'queued', 'current', 'visited', 'success']),
          badge: z.string().optional(),
          goal: z.boolean().optional(),
        }),
      ),
      edges: z.array(z.object({ id: z.string(), from: z.string(), to: z.string(), state: z.enum(['idle', 'checking', 'tree', 'success']) })),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  stack: z
    .object({
      label: z.string(),
      items: z.array(z.object({ id: z.string(), label: z.string(), sub: z.string(), state: cellState })),
      capacity: z.number().int(),
      emptyText: z.string(),
    })
    .optional(),
  table: z
    .object({
      label: z.string(),
      columns: z.tuple([z.string(), z.string()]),
      rows: z.array(z.object({ id: z.string(), key: z.string(), value: z.string(), state: cellState })),
      capacity: z.number().int(),
      emptyText: z.string(),
    })
    .optional(),
  legend: z.array(z.object({ label: z.string(), swatch })),
});

/** Identity colours for patterns; see docs/DESIGN_TOKENS.md. */
export const HUES = ['indigo', 'teal', 'ocean', 'rose', 'copper', 'moss', 'olive', 'gold', 'violet', 'slate'] as const;
export type Hue = (typeof HUES)[number];

export const patternSchema = z.object({
  schemaVersion: z.literal(1),
  id: slug,
  status: statusSchema,
  name: z.string().min(1),
  /** Two-letter monogram shown in the pattern's colour badge. */
  short: z.string().min(1).max(3),
  hue: z.enum(HUES),
  family: slug,
  order: z.number().int(),
  intuition: z.string().min(10).max(200),
  aliases: z.array(z.string()).default([]),
  topics: z.array(slug).min(1),
  prerequisites: z.array(slug).default([]),
  variants: z
    .array(
      z.object({
        id: slug,
        name: z.string().min(1),
        summary: z.string().min(1),
        requires: z.string().min(1),
      }),
    )
    .min(1),
  visual: z.object({ caption: z.string().min(1), scene: sceneSchema }),
});
export type PatternMeta = z.infer<typeof patternSchema>;

export const problemSchema = z.object({
  schemaVersion: z.literal(1),
  id: slug,
  slug,
  contentVersion: z.number().int().positive(),
  status: statusSchema,
  title: z.string().min(1),
  storyTitle: z.string().min(1),
  summary: z.string().min(10).max(220),
  difficulty: difficultySchema,
  /** Companies learners report meeting this problem at, most common first. */
  companies: z.array(z.string().min(1)).default([]),
  topics: z.array(slug).min(1),
  patternMemberships: z.array(z.object({ patternId: slug, variantId: slug, order: z.number().int() })).min(1),
  prerequisites: z.array(slug).default([]),
  checker: z.enum(CHECKER_IDS),
  goal: z.string().min(1).max(120),
  mapping: z.array(z.object({ story: z.string().min(1), formal: z.string().min(1) })).min(2),
  examples: z
    .array(
      z.object({
        id: slug,
        label: z.string().min(1),
        input: z.record(z.string(), z.unknown()),
        expectedOutput: z.unknown(),
        explanation: z.string().min(1),
        display: z.record(z.string(), z.unknown()).optional(),
      }),
    )
    .min(1),
  /**
   * How the solution is built up, from the first idea a beginner would try to the
   * best known one. Each rung explains what it does, what it costs, and the
   * observation that leads to it. A rung with approachId links to a walkthrough.
   */
  ladder: z
    .array(
      z.object({
        id: slug,
        level: z.enum(['brute-force', 'better', 'optimal']),
        name: z.string().min(1).max(60),
        idea: z.string().min(20).max(480),
        insight: z.string().min(20).max(400).optional(),
        time: z.string().min(1),
        space: z.string().min(1),
        approachId: slug.optional(),
      }),
    )
    .min(2),
  /** Walkthrough approaches backed by a reviewed adapter. A reading lesson may have none. */
  approaches: z
    .array(
      z.object({
        id: slug,
        name: z.string().min(1),
        adapterId: z.string().min(1),
        summary: z.string().min(1),
        timeComplexity: z.string().min(1),
        auxiliarySpaceComplexity: z.string().min(1),
        languages: z.array(languageSchema).min(1),
      }),
    )
    .default([]),
  defaultApproach: slug.optional(),
  /** Reference solver used to check example outputs when no walkthrough adapter exists. */
  solver: slug.optional(),
  /** An external judge where learners can run their own code, such as the matching LeetCode problem. */
  practiceLink: z.object({ label: z.string().min(1), url: z.string().url().startsWith('https://') }).optional(),
  /** Another well-known name for the same problem. */
  aka: z.string().min(1).optional(),
  transfer: z.object({
    problem: z.string().min(10),
    answerPatternId: slug,
    explanation: z.string().min(10),
  }),
  practice: z.object({ selfCheck: z.array(z.string().min(5)).min(2) }),
  provenance: z.object({
    kind: z.enum(['original', 'adapted']),
    author: z.string().min(1),
    sourceUrls: z.array(z.string().url()).default([]),
  }),
});
export type ProblemMeta = z.infer<typeof problemSchema>;

export const narrationSchema = z.record(
  z.string(),
  z.record(z.string(), z.object({ label: z.string().min(1).max(32), story: z.string().min(1), formal: z.string().min(1) })),
);

export const checkpointsSchema = z.array(
  z.object({
    id: slug,
    approachId: slug,
    exampleId: slug,
    frameId: z.string().min(1),
    question: z.string().min(5),
    context: z.string().min(5),
    choices: z
      .array(z.object({ id: slug, label: z.string().min(1), correct: z.boolean(), feedback: z.string().min(10) }))
      .min(2)
      .refine((c) => c.filter((x) => x.correct).length === 1, 'exactly one choice must be correct'),
  }),
);
export type Checkpoint = z.infer<typeof checkpointsSchema>[number];

export const pathSchema = z.object({
  schemaVersion: z.literal(1),
  id: slug,
  status: statusSchema,
  title: z.string().min(1),
  summary: z.string().min(10),
  sections: z
    .array(
      z.object({
        title: z.string().min(1),
        kind: z.enum(['guided', 'supported', 'independent', 'mixed-review']),
        summary: z.string().min(1),
        problems: z.array(slug).min(1),
      }),
    )
    .min(1),
});
export type PathMeta = z.infer<typeof pathSchema>;

/** Markdown sections every published record must contain, in reading order. */
export const REQUIRED_SECTIONS = {
  story: ['Situation', 'Goal', 'Rules', 'Worked example'],
  explanation: ['Why it works', 'Edge cases'],
  pattern: ['Intuition', 'Recognition clues', 'Template', 'Preconditions', 'When it fails'],
} as const;
