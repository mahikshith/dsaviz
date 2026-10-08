def shortest_cover(s, t):
    need = {}
    for ch in t:
        need[ch] = need.get(ch, 0) + 1
    missing, left, best = len(t), 0, ""
    for right, ch in enumerate(s):
        if need.get(ch, 0) > 0:
            missing -= 1
        need[ch] = need.get(ch, 0) - 1
        while missing == 0:
            if not best or right - left + 1 < len(best):
                best = s[left:right + 1]
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1
    return best
