def same_letters(s, t):  # @anchor signature
    if len(s) != len(t):
        return False  # @anchor length
    count = {}  # @anchor initialize
    for a, b in zip(s, t):
        count[a] = count.get(a, 0) + 1  # @anchor tally
        count[b] = count.get(b, 0) - 1  # @anchor tally
    for letter, c in count.items():
        if c != 0:
            return False  # @anchor return-false
    return True  # @anchor return-true
