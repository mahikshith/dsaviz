def can_cross(nums):
    reach = 0
    for i, leap in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + leap)
    return True
