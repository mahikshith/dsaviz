def reads_both_ways(text):  # @anchor signature
    left, right = 0, len(text) - 1  # @anchor initialize
    while left < right:
        if not text[left].isalnum():
            left += 1  # @anchor skip-left
        elif not text[right].isalnum():
            right -= 1  # @anchor skip-right
        elif text[left].lower() != text[right].lower():  # @anchor compare, mismatch
            return False  # @anchor mismatch
        else:
            left, right = left + 1, right - 1  # @anchor step-inward
    return True  # @anchor return-true
