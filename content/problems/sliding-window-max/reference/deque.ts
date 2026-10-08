function tallestInWindow(nums: number[], k: number): number[] {
  const line: number[] = [];
  let head = 0;
  const out: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    while (line.length > head && nums[line[line.length - 1]] <= nums[i]) line.pop();
    line.push(i);
    if (line[head] <= i - k) head += 1;
    if (i >= k - 1) out.push(nums[line[head]]);
  }
  return out;
}
