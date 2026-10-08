def tidy_shelf(nums):
    changed = True
    while changed:
        changed = False
        for i in range(len(nums) - 1):
            if nums[i] == 0 and nums[i + 1] != 0:
                nums[i], nums[i + 1] = nums[i + 1], nums[i]
                changed = True
    return nums
