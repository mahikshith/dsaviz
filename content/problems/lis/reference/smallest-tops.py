from bisect import bisect_left

def tallest_staircase(nums):
    tails = []
    for h in nums:
        k = bisect_left(tails, h)
        if k == len(tails):
            tails.append(h)
        else:
            tails[k] = h
    return len(tails)
