def longest_one_colour(s, k):
    best = 0
    for start in range(len(s)):
        count, top = {}, 0
        for end in range(start, len(s)):
            count[s[end]] = count.get(s[end], 0) + 1
            top = max(top, count[s[end]])
            if (end - start + 1) - top > k:
                break
            best = max(best, end - start + 1)
    return best
