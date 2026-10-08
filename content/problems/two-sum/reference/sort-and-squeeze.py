def find_partners(nums, target):
    order = sorted(range(len(nums)), key=lambda k: nums[k])
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[order[left]] + nums[order[right]]
        if total == target:
            return sorted([order[left], order[right]])
        if total < target:
            left += 1
        else:
            right -= 1
    return None
