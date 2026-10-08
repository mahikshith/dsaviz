from itertools import combinations

def tallest_staircase(nums):
    for size in range(len(nums), 0, -1):
        for picked in combinations(nums, size):
            if all(a < b for a, b in zip(picked, picked[1:])):
                return size
    return 0
