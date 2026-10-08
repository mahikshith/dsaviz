def crate_is_correct(log):  # @anchor signature
    opener_for = {")": "(", "]": "[", "}": "{"}
    stack = []  # @anchor initialize
    for symbol in log:
        if symbol not in opener_for:
            stack.append(symbol)  # @anchor push
        elif not stack:
            return False  # @anchor empty-close
        elif stack[-1] != opener_for[symbol]:
            return False  # @anchor mismatch
        else:
            stack.pop()  # @anchor pop-match
    if stack:
        return False  # @anchor leftover
    return True  # @anchor return-valid
