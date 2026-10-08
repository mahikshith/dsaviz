function tidyShelf(nums: number[]): number[] {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write += 1;
    }
  }
  return nums;
}
