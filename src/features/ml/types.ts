import type { ComponentType } from 'react';

export type MlGroup = 'Foundations' | 'Supervised learning' | 'Ensembles' | 'Unsupervised learning' | 'Neural networks';

/** One algorithm on the ML page. The page lists these in the side panel and shows one at a time. */
export type MlAlgorithm = {
  /** URL-safe id, used in ?algo= */
  id: string;
  name: string;
  group: MlGroup;
  /** One plain sentence: what it does. */
  summary: string;
  /** 3 to 5 short sentences, in order: how it works. */
  steps: string[];
  /** The key update rule or formula, plain text (monospace). */
  formula?: string;
  /** When to use it and what to watch out for: 2 to 4 short sentences. */
  notes?: string[];
  /** The interactive visualization. Must be a client component with no required props. */
  Visual: ComponentType;
};
