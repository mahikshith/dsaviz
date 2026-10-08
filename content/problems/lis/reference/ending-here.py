def tallest_staircase(nums):
    length = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                length[i] = max(length[i], length[j] + 1)
    return max(length, default=0)
