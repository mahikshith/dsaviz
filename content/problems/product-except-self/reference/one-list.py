def everyone_else(nums):
    out = [1] * len(nums)
    left = 1
    for i in range(len(nums)):
        out[i] = left
        left *= nums[i]
    right = 1
    for i in range(len(nums) - 1, -1, -1):
        out[i] *= right
        right *= nums[i]
    return out
