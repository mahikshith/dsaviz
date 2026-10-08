function longestOneColour(s: string, k: number): number { // @anchor signature
  const count = new Map<string, number>(); // @anchor initialize
  let left = 0, top = 0, best = 0; // @anchor initialize
  for (let right = 0; right < s.length; right++) {
    count.set(s[right], (count.get(s[right]) ?? 0) + 1); // @anchor grow
    top = Math.max(top, count.get(s[right])!); // @anchor grow
    if (right - left + 1 - top > k) {
      count.set(s[left], count.get(s[left])! - 1); // @anchor slide
      left += 1; // @anchor slide
    }
    best = Math.max(best, right - left + 1); // @anchor measure
  }
  return best; // @anchor return
}
