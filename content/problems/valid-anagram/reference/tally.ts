function sameLetters(s: string, t: string): boolean { // @anchor signature
  if (s.length !== t.length) return false; // @anchor length
  const count = new Map<string, number>(); // @anchor initialize
  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) ?? 0) + 1); // @anchor tally
    count.set(t[i], (count.get(t[i]) ?? 0) - 1); // @anchor tally
  }
  for (const c of count.values()) {
    if (c !== 0) return false; // @anchor return-false
  }
  return true; // @anchor return-true
}
