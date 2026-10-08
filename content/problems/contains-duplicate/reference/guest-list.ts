function cameTwice(nums: number[]): boolean { // @anchor signature
  const seen = new Set<number>(); // @anchor initialize
  for (const x of nums) {
    if (seen.has(x)) return true; // @anchor return-true
    seen.add(x); // @anchor add
  }
  return false; // @anchor return-false
}
