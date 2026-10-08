/**
 * Builds serialisable catalog data for list pages (server only). Built from published content only,
 * so drafts never appear in counts, filters or search.
 */
import type { Catalog } from './catalogShared';
import { problemsInPattern, type Site } from './load';

export function buildCatalog(site: Site): Catalog {
  const families = [...site.families].sort((a, b) => a.order - b.order);
  const familyName = new Map(families.map((f) => [f.id, f.name]));
  const familyOrder = new Map(families.map((f) => [f.id, f.order]));
  const term = new Map(site.glossary.map((g) => [g.id, g.term]));
  const patterns = [...site.patterns]
    .sort((a, b) => (familyOrder.get(a.meta.family)! - familyOrder.get(b.meta.family)!) || a.meta.order - b.meta.order)
    .map((p) => ({
      id: p.meta.id,
      name: p.meta.name,
      short: p.meta.short,
      hue: p.meta.hue,
      family: p.meta.family,
      familyName: familyName.get(p.meta.family) ?? p.meta.family,
      intuition: p.meta.intuition,
      aliases: p.meta.aliases,
      topics: p.meta.topics,
      prerequisites: p.meta.prerequisites.map((id) => ({ id, term: term.get(id) ?? id })),
      problems: problemsInPattern(site, p.meta.id).map(({ problem, membership }) => ({
        id: problem.meta.id,
        variant: p.meta.variants.find((v) => v.id === membership.variantId)?.name ?? '',
      })),
    }));
  const problems = site.problems.map((p) => ({
    id: p.meta.id,
    slug: p.meta.slug,
    title: p.meta.title,
    storyTitle: p.meta.storyTitle,
    summary: p.meta.summary,
    difficulty: p.meta.difficulty,
    companies: p.meta.companies,
    topics: p.meta.topics,
    hasWalkthrough: p.meta.approaches.length > 0,
    patternIds: p.meta.patternMemberships.map((m) => m.patternId),
    aka: p.meta.aka,
    ladder: p.meta.ladder.map((r) => ({ level: r.level, name: r.name, time: r.time })),
  }));
  return {
    families: families.map((f) => ({ id: f.id, name: f.name, summary: f.summary })),
    topics: site.topics.map((t) => ({ id: t.id, name: t.name })),
    patterns,
    problems,
  };
}

export type { Catalog, CatalogPattern, CatalogProblem } from './catalogShared';
export { matches } from './catalogShared';
