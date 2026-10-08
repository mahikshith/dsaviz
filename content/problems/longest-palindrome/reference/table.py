def longest_echo(s):
    n = len(s)
    if n == 0:
        return ""
    is_pal = [[False] * n for _ in range(n)]
    best = s[0]
    for length in range(1, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            is_pal[i][j] = s[i] == s[j] and (length < 3 or is_pal[i + 1][j - 1])
            if is_pal[i][j] and length > len(best):
                best = s[i:j + 1]
    return best
