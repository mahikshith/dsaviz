def can_split(s, words):
    dictionary = set(words)
    can = [True] + [False] * len(s)
    for i in range(1, len(s) + 1):
        for j in range(i):
            if can[j] and s[j:i] in dictionary:
                can[i] = True
                break
    return can[len(s)]
