def trapped_water(heights):
    water = 0
    for i, h in enumerate(heights):
        left = max(heights[:i + 1])
        right = max(heights[i:])
        water += min(left, right) - h
    return water
