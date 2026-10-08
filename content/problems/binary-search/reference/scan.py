def find_page(nums, target):
    for i, value in enumerate(nums):
        if value == target:
            return i
    return -1
