def same_letters(s, t):
    remaining = list(t)
    for letter in s:
        if letter not in remaining:
            return False
        remaining.remove(letter)
    return not remaining
