function findPartners(nums: number[], target: number): [number, number] | null { // @anchor signature
  const seen = new Map<number, number>(); // @anchor initialize
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]; // @anchor need
    if (seen.has(need)) { // @anchor lookup
      return [seen.get(need)!, i]; // @anchor return-found
    }
    seen.set(nums[i], i); // @anchor store
  }
  return null; // @anchor return-none
}
