function lowestStep(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] > nums[high]) low = mid + 1;
    else high = mid;
  }
  return nums[low];
}
