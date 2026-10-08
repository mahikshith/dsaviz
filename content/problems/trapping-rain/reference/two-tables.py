def trapped_water(heights):
    n = len(heights)
    if n == 0:
        return 0
    left, right = [0] * n, [0] * n
    left[0], right[-1] = heights[0], heights[-1]
    for i in range(1, n):
        left[i] = max(left[i - 1], heights[i])
    for i in range(n - 2, -1, -1):
        right[i] = max(right[i + 1], heights[i])
    return sum(min(left[i], right[i]) - heights[i] for i in range(n))
