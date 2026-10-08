def best_stretch(nums):
    best = best_here = nums[0]
    for x in nums[1:]:
        best_here = max(x, best_here + x)
        best = max(best, best_here)
    return best
