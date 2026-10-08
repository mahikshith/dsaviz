def best_profit(prices):  # @anchor signature
    buy, best = 0, 0  # @anchor initialize
    for day in range(1, len(prices)):
        if prices[day] < prices[buy]:
            buy = day  # @anchor cheaper
        else:
            best = max(best, prices[day] - prices[buy])  # @anchor profit
    return best  # @anchor return
