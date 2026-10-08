from collections import deque

def tallest_in_window(nums, k):
    line, out = deque(), []
    for i, x in enumerate(nums):
        while line and nums[line[-1]] <= x:
            line.pop()
        line.append(i)
        if line[0] <= i - k:
            line.popleft()
        if i >= k - 1:
            out.append(nums[line[0]])
    return out
