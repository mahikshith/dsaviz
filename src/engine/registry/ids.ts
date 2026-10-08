/** The allowlist of reviewed algorithm adapters. Content may only reference these ids. */
export const ADAPTER_IDS = [
  'sorted-target-pair-v1',
  'pair-enumeration-v1',
  'fixed-window-max-v1',
  'prefix-window-max-v1',
  'bracket-match-v1',
  'bfs-shortest-path-v1',
  'palindrome-pointers-v1',
  'hash-pair-v1',
  'set-duplicate-v1',
  'anagram-count-v1',
  'unique-window-v1',
  'replacement-window-v1',
  'container-area-v1',
  'stock-profit-v1',
  'binary-search-v1',
  'climbing-stairs-v1',
] as const;

export type AdapterId = (typeof ADAPTER_IDS)[number];

export function isAdapterId(id: string): id is AdapterId {
  return (ADAPTER_IDS as readonly string[]).includes(id);
}
