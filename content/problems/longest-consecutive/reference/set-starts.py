def longest_run(nums):
    pages = set(nums)
    best = 0
    for x in pages:
        if x - 1 not in pages:
            length = 1
            while x + length in pages:
                length += 1
            best = max(best, length)
    return best
