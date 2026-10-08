function canSplit(s: string, words: string[]): boolean {
  const dictionary = new Set(words);
  const can = [true, ...new Array<boolean>(s.length).fill(false)];
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (can[j] && dictionary.has(s.slice(j, i))) {
        can[i] = true;
        break;
      }
    }
  }
  return can[s.length];
}
