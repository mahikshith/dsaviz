function chooseBooks(prices: number[], target: number): [number, number] | null { // @anchor signature
  let left = 0; // @anchor initialize
  let right = prices.length - 1; // @anchor initialize
  while (left < right) {
    const total = prices[left] + prices[right]; // @anchor compare
    if (total === target) return [left, right]; // @anchor compare, return-found
    if (total < target) left += 1; // @anchor move-left
    else right -= 1; // @anchor move-right
  }
  return null; // @anchor return-none
}
