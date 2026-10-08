function bestProfit(prices: number[]): number { // @anchor signature
  let buy = 0; // @anchor initialize
  let best = 0; // @anchor initialize
  for (let day = 1; day < prices.length; day++) {
    if (prices[day] < prices[buy]) buy = day; // @anchor cheaper
    else best = Math.max(best, prices[day] - prices[buy]); // @anchor profit
  }
  return best; // @anchor return
}
