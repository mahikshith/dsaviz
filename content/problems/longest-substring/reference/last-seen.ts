function longestUnique(s: string): number { // @anchor signature
  const last = new Map<string, number>(); // @anchor initialize
  let left = 0; // @anchor initialize
  let best = 0; // @anchor initialize
  for (let right = 0; right < s.length; right++) {
    const prev = last.get(s[right]); // @anchor read
    if (prev !== undefined && prev >= left) left = prev + 1; // @anchor read, jump
    last.set(s[right], right); // @anchor measure
    best = Math.max(best, right - left + 1); // @anchor measure
  }
  return best; // @anchor return
}
