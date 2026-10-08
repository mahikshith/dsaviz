def longest_echo(s):
    for length in range(len(s), 0, -1):
        for start in range(len(s) - length + 1):
            part = s[start:start + length]
            if part == part[::-1]:
                return part
    return ""
