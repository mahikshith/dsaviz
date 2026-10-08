def longest_run(nums):
    if not nums:
        return 0
    pages = sorted(set(nums))
    best = length = 1
    for i in range(1, len(pages)):
        length = length + 1 if pages[i] == pages[i - 1] + 1 else 1
        best = max(best, length)
    return best
