def can_cross(nums):
    reachable = [False] * len(nums)
    reachable[0] = True
    for i in range(len(nums)):
        if reachable[i]:
            for step in range(1, nums[i] + 1):
                if i + step < len(nums):
                    reachable[i + step] = True
    return reachable[-1]
