def can_cross(nums, i=0):
    if i >= len(nums) - 1:
        return True
    return any(can_cross(nums, i + step) for step in range(1, nums[i] + 1))
