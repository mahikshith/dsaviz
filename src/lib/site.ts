/** Product name in one place. "Pattern Atlas" is a working name; check availability before launch. */
export const SITE = {
  name: 'Pattern Atlas',
  description: 'Data structures and algorithms taught through short stories, step-by-step walkthroughs and practice grouped by pattern.',
  storagePrefix: 'pattern-atlas',
};

export const DIFFICULTY_LABEL = {
  introductory: 'Introductory',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const;

export const LANGUAGE_LABEL = { python: 'Python', typescript: 'TypeScript' } as const;

/** Difficulty colours reuse the identity hues; the label is always shown too. */
export const DIFFICULTY_HUE = {
  introductory: 'ocean',
  easy: 'moss',
  medium: 'gold',
  hard: 'rose',
} as const;

export const LADDER_LABEL = { 'brute-force': 'Brute force', better: 'Better', optimal: 'Optimal' } as const;
