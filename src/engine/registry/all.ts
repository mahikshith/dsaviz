/**
 * Eager registry for build-time work (page preparation, validation, tests).
 * Client components must use `loadAdapter` from ./client instead, so a page
 * only downloads the adapter it actually needs.
 */
import type { RuntimeAdapter } from '@/engine/contracts/trace';
import { adapter as sortedTargetPair } from '@/engine/adapters/sortedTargetPair';
import { adapter as pairEnumeration } from '@/engine/adapters/pairEnumeration';
import { adapter as fixedWindowMax } from '@/engine/adapters/fixedWindowMax';
import { adapter as prefixWindowMax } from '@/engine/adapters/prefixWindowMax';
import { adapter as bracketMatch } from '@/engine/adapters/bracketMatch';
import { adapter as bfsShortestPath } from '@/engine/adapters/bfsShortestPath';
import { adapter as palindromePointers } from '@/engine/adapters/palindromePointers';
import { adapter as hashPair } from '@/engine/adapters/hashPair';
import { adapter as setDuplicate } from '@/engine/adapters/setDuplicate';
import { adapter as anagramCount } from '@/engine/adapters/anagramCount';
import { adapter as uniqueWindow } from '@/engine/adapters/uniqueWindow';
import { adapter as replacementWindow } from '@/engine/adapters/replacementWindow';
import { adapter as containerArea } from '@/engine/adapters/containerArea';
import { adapter as stockProfit } from '@/engine/adapters/stockProfit';
import { adapter as binarySearch } from '@/engine/adapters/binarySearch';
import { adapter as climbingStairs } from '@/engine/adapters/climbingStairs';
import type { AdapterId } from './ids';

export const ADAPTERS: Record<AdapterId, RuntimeAdapter> = {
  'sorted-target-pair-v1': sortedTargetPair,
  'pair-enumeration-v1': pairEnumeration,
  'fixed-window-max-v1': fixedWindowMax,
  'prefix-window-max-v1': prefixWindowMax,
  'bracket-match-v1': bracketMatch,
  'bfs-shortest-path-v1': bfsShortestPath,
  'palindrome-pointers-v1': palindromePointers,
  'hash-pair-v1': hashPair,
  'set-duplicate-v1': setDuplicate,
  'anagram-count-v1': anagramCount,
  'unique-window-v1': uniqueWindow,
  'replacement-window-v1': replacementWindow,
  'container-area-v1': containerArea,
  'stock-profit-v1': stockProfit,
  'binary-search-v1': binarySearch,
  'climbing-stairs-v1': climbingStairs,
};
