function allBaskets(nums: number[]): number[][] {
  const baskets: number[][] = [];
  const basket: number[] = [];
  const explore = (i: number): void => {
    if (i === nums.length) {
      baskets.push([...basket]);
      return;
    }
    basket.push(nums[i]);
    explore(i + 1);
    basket.pop();
    explore(i + 1);
  };
  explore(0);
  return baskets;
}
