from itertools import product

def seatings(nums):
    return [list(seq) for seq in product(nums, repeat=len(nums)) if len(set(seq)) == len(nums)]
