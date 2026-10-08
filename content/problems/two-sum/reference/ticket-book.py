def find_partners(nums, target):  # @anchor signature
    seen = {}  # @anchor initialize
    for i, value in enumerate(nums):
        need = target - value  # @anchor need
        if need in seen:  # @anchor lookup
            return [seen[need], i]  # @anchor return-found
        seen[value] = i  # @anchor store
    return None  # @anchor return-none
