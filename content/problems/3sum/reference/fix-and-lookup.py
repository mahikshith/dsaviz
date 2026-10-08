def zero_trios(nums):
    found = set()
    for i in range(len(nums)):
        seen = set()
        for j in range(i + 1, len(nums)):
            third = -nums[i] - nums[j]
            if third in seen:
                found.add(tuple(sorted((nums[i], nums[j], third))))
            seen.add(nums[j])
    return [list(t) for t in found]
