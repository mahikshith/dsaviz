function bestStretch(nums: number[]): number {
  let best = nums[0];
  let bestHere = nums[0];
  for (let i = 1; i < nums.length; i++) {
    bestHere = Math.max(nums[i], bestHere + nums[i]);
    best = Math.max(best, bestHere);
  }
  return best;
}
