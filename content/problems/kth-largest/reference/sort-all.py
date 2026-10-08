def kth_best(nums, k):
    return sorted(nums, reverse=True)[k - 1]
