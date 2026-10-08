function sortLetters(words: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const word of words) {
    const counts = new Array<number>(26).fill(0);
    for (const ch of word) counts[ch.charCodeAt(0) - 97] += 1;
    const key = counts.join(',');
    groups.set(key, [...(groups.get(key) ?? []), word]);
  }
  return [...groups.values()];
}
