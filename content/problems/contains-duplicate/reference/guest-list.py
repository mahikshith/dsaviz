def came_twice(nums):  # @anchor signature
    seen = set()  # @anchor initialize
    for x in nums:
        if x in seen:
            return True  # @anchor return-true
        seen.add(x)  # @anchor add
    return False  # @anchor return-false
