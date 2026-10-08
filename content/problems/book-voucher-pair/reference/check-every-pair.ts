function chooseBooks(prices: number[], target: number): [number, number] | null { // @anchor signature
  const n = prices.length;
  for (let i = 0; i < n - 1; i++) { // @anchor outer-loop
    for (let j = i + 1; j < n; j++) {
      if (prices[i] + prices[j] === target) return [i, j]; // @anchor compare, return-found
    }
  }
  return null; // @anchor return-none
}
