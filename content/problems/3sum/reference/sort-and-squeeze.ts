function zeroTrios(input: number[]): number[][] {
  const nums = [...input].sort((a, b) => a - b);
  const trios: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total < 0) left += 1;
      else if (total > 0) right -= 1;
      else {
        trios.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left += 1;
        while (left < right && nums[right] === nums[right - 1]) right -= 1;
        left += 1;
        right -= 1;
      }
    }
  }
  return trios;
}
