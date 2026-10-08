function countStretches(nums: number[], k: number): number {
  const seen = new Map<number, number>([[0, 1]]);
  let running = 0;
  let count = 0;
  for (const x of nums) {
    running += x;
    count += seen.get(running - k) ?? 0;
    seen.set(running, (seen.get(running) ?? 0) + 1);
  }
  return count;
}
