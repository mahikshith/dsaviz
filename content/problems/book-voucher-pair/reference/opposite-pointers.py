def choose_books(prices, target):  # @anchor signature
    left, right = 0, len(prices) - 1  # @anchor initialize
    while left < right:
        total = prices[left] + prices[right]  # @anchor compare
        if total == target:  # @anchor compare
            return [left, right]  # @anchor return-found
        if total < target:
            left += 1  # @anchor move-left
        else:
            right -= 1  # @anchor move-right
    return None  # @anchor return-none
