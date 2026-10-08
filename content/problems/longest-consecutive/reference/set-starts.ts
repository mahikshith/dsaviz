function longestRun(nums: number[]): number {
  const pages = new Set(nums);
  let best = 0;
  for (const x of pages) {
    if (!pages.has(x - 1)) {
      let length = 1;
      while (pages.has(x + length)) length += 1;
      best = Math.max(best, length);
    }
  }
  return best;
}
