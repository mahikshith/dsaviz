def most_requested(nums, k):
    count = {}
    for x in nums:
        count[x] = count.get(x, 0) + 1
    return sorted(count, key=count.get, reverse=True)[:k]
