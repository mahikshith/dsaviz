def count_stretches(nums, k):
    seen = {0: 1}
    running = count = 0
    for x in nums:
        running += x
        count += seen.get(running - k, 0)
        seen[running] = seen.get(running, 0) + 1
    return count
