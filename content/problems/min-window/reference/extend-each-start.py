from collections import Counter

def shortest_cover(s, t):
    best = ""
    for i in range(len(s)):
        need, missing = Counter(t), len(t)
        for j in range(i, len(s)):
            if need[s[j]] > 0:
                missing -= 1
            need[s[j]] -= 1
            if missing == 0:
                if not best or j - i + 1 < len(best):
                    best = s[i:j + 1]
                break
    return best
