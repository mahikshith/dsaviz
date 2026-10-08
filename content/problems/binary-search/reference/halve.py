def find_page(nums, target):  # @anchor signature
    low, high = 0, len(nums) - 1  # @anchor initialize
    while low <= high:
        mid = (low + high) // 2  # @anchor probe
        if nums[mid] == target:
            return mid  # @anchor return-found
        if nums[mid] < target:
            low = mid + 1  # @anchor go-right
        else:
            high = mid - 1  # @anchor go-left
    return -1  # @anchor return-none
