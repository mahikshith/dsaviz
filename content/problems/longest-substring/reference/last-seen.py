def longest_unique(s):  # @anchor signature
    last, left, best = {}, 0, 0  # @anchor initialize
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:  # @anchor read
            left = last[ch] + 1  # @anchor jump
        last[ch] = right  # @anchor measure
        best = max(best, right - left + 1)  # @anchor measure
    return best  # @anchor return
