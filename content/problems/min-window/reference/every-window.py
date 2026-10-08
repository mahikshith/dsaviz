from collections import Counter

def shortest_cover(s, t):
    need = Counter(t)
    best = ""
    for i in range(len(s)):
        for j in range(i + 1, len(s) + 1):
            window = Counter(s[i:j])
            if all(window[c] >= k for c, k in need.items()):
                if not best or j - i < len(best):
                    best = s[i:j]
    return best
