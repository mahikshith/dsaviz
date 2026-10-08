def choose_books(prices, target):  # @anchor signature
    n = len(prices)
    for i in range(n - 1):  # @anchor outer-loop
        for j in range(i + 1, n):
            if prices[i] + prices[j] == target:  # @anchor compare
                return [i, j]  # @anchor return-found
    return None  # @anchor return-none
