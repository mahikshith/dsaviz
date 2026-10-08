def find_on_spun_shelf(nums, target):
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1
