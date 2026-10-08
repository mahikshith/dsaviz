function findPage(nums: number[], target: number): number { // @anchor signature
  let low = 0; // @anchor initialize
  let high = nums.length - 1; // @anchor initialize
  while (low <= high) {
    const mid = Math.floor((low + high) / 2); // @anchor probe
    if (nums[mid] === target) return mid; // @anchor return-found
    if (nums[mid] < target) low = mid + 1; // @anchor go-right
    else high = mid - 1; // @anchor go-left
  }
  return -1; // @anchor return-none
}
