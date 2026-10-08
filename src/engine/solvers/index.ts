/**
 * Reference solvers for lessons that have no walkthrough adapter yet. They are
 * reviewed code used only by content validation, so every example's expected
 * output is checked by a real computation before a lesson can be published.
 * They never run in the browser.
 */
import { SEQUENCE_SOLVERS } from './sequence';
import { STRUCTURE_SOLVERS } from './structure';
import { GRAPH_SOLVERS } from './graph';
import { OPTIMIZATION_SOLVERS } from './optimization';

export type Solver = (input: Record<string, unknown>) => unknown;

export const SOLVERS: Record<string, Solver> = {
  ...SEQUENCE_SOLVERS,
  ...STRUCTURE_SOLVERS,
  ...GRAPH_SOLVERS,
  ...OPTIMIZATION_SOLVERS,
};
