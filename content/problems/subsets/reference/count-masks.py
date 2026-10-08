def all_baskets(nums):
    baskets = []
    for mask in range(1 << len(nums)):
        baskets.append([x for i, x in enumerate(nums) if mask & (1 << i)])
    return baskets
