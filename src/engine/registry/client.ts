/** Lazy registry: each adapter is its own chunk, fetched only when a learner needs it. */
import type { RuntimeAdapter } from '@/engine/contracts/trace';
import type { AdapterId } from './ids';

const loaders: Record<AdapterId, () => Promise<RuntimeAdapter>> = {
  'sorted-target-pair-v1': () => import('@/engine/adapters/sortedTargetPair').then((m) => m.adapter),
  'pair-enumeration-v1': () => import('@/engine/adapters/pairEnumeration').then((m) => m.adapter),
  'fixed-window-max-v1': () => import('@/engine/adapters/fixedWindowMax').then((m) => m.adapter),
  'prefix-window-max-v1': () => import('@/engine/adapters/prefixWindowMax').then((m) => m.adapter),
  'bracket-match-v1': () => import('@/engine/adapters/bracketMatch').then((m) => m.adapter),
  'bfs-shortest-path-v1': () => import('@/engine/adapters/bfsShortestPath').then((m) => m.adapter),
  'palindrome-pointers-v1': () => import('@/engine/adapters/palindromePointers').then((m) => m.adapter),
  'hash-pair-v1': () => import('@/engine/adapters/hashPair').then((m) => m.adapter),
  'set-duplicate-v1': () => import('@/engine/adapters/setDuplicate').then((m) => m.adapter),
  'anagram-count-v1': () => import('@/engine/adapters/anagramCount').then((m) => m.adapter),
  'unique-window-v1': () => import('@/engine/adapters/uniqueWindow').then((m) => m.adapter),
  'replacement-window-v1': () => import('@/engine/adapters/replacementWindow').then((m) => m.adapter),
  'container-area-v1': () => import('@/engine/adapters/containerArea').then((m) => m.adapter),
  'stock-profit-v1': () => import('@/engine/adapters/stockProfit').then((m) => m.adapter),
  'binary-search-v1': () => import('@/engine/adapters/binarySearch').then((m) => m.adapter),
  'climbing-stairs-v1': () => import('@/engine/adapters/climbingStairs').then((m) => m.adapter),
};

export function loadAdapter(id: string): Promise<RuntimeAdapter> {
  const load = loaders[id as AdapterId];
  if (!load) return Promise.reject(new Error(`Unknown adapter ${id}`));
  return load();
}
