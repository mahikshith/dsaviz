function tallestStaircase(nums: number[]): number {
  const tails: number[] = [];
  for (const h of nums) {
    let low = 0;
    let high = tails.length;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (tails[mid] < h) low = mid + 1;
      else high = mid;
    }
    tails[low] = h;
  }
  return tails.length;
}
