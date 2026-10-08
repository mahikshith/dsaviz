def biggest_barrel(heights):  # @anchor signature
    left, right = 0, len(heights) - 1  # @anchor initialize
    best = 0  # @anchor initialize
    while left < right:
        area = min(heights[left], heights[right]) * (right - left)  # @anchor measure
        best = max(best, area)  # @anchor measure
        if heights[left] < heights[right]:
            left += 1  # @anchor move-left
        else:
            right -= 1  # @anchor move-right
    return best  # @anchor return
