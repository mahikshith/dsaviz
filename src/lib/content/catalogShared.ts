/** Catalog types and search helpers that are safe to use in the browser (no file system access). */
import type { Difficulty, Hue } from './schema';

export type CatalogProblem = {
  id: string;
  slug: string;
  title: string;
  storyTitle: string;
  summary: string;
  difficulty: Difficulty;
  companies: string[];
  topics: string[];
  hasWalkthrough: boolean;
  patternIds: string[];
  aka?: string;
  ladder: { level: 'brute-force' | 'better' | 'optimal'; name: string; time: string }[];
};

export type CatalogPattern = {
  id: string;
  name: string;
  short: string;
  hue: Hue;
  family: string;
  familyName: string;
  intuition: string;
  aliases: string[];
  topics: string[];
  prerequisites: { id: string; term: string }[];
  problems: { id: string; variant: string }[];
};

export type Catalog = {
  families: { id: string; name: string; summary: string }[];
  topics: { id: string; name: string }[];
  patterns: CatalogPattern[];
  problems: CatalogProblem[];
};

/** Case-insensitive match against names, aliases and summaries, so "moving range" finds sliding window. */
export function matches(query: string, ...fields: (string | string[])[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.flat().some((f) => f.toLowerCase().includes(q));
}

export const DIFFICULTY_ORDER: Difficulty[] = ['introductory', 'easy', 'medium', 'hard'];

