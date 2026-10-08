def can_split(s, words):
    if s == "":
        return True
    return any(s.startswith(w) and can_split(s[len(w):], words) for w in words)
