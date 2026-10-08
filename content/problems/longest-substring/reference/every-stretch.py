def longest_unique(s):
    best = 0
    for start in range(len(s)):
        for end in range(start, len(s)):
            stretch = s[start:end + 1]
            if len(set(stretch)) == len(stretch):
                best = max(best, len(stretch))
    return best
