function mostRequested(nums: number[], k: number): number[] {
  const count = new Map<number, number>();
  for (const x of nums) count.set(x, (count.get(x) ?? 0) + 1);
  const shelves: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [song, c] of count) shelves[c].push(song);
  const top: number[] = [];
  for (let c = nums.length; c > 0 && top.length < k; c--) {
    for (const song of shelves[c]) {
      top.push(song);
      if (top.length === k) break;
    }
  }
  return top;
}
