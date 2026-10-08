def longest_one_colour(s, k):  # @anchor signature
    count, left, top, best = {}, 0, 0, 0  # @anchor initialize
    for right, ch in enumerate(s):
        count[ch] = count.get(ch, 0) + 1  # @anchor grow
        top = max(top, count[ch])  # @anchor grow
        if (right - left + 1) - top > k:
            count[s[left]] -= 1  # @anchor slide
            left += 1  # @anchor slide
        best = max(best, right - left + 1)  # @anchor measure
    return best  # @anchor return
