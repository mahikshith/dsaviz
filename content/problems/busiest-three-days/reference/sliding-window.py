def busiest_stretch(visitors, k):  # @anchor signature
    window_sum = 0  # @anchor initialize
    for i in range(k):
        window_sum += visitors[i]  # @anchor build
    best, best_start = window_sum, 0  # @anchor record-first
    for start in range(1, len(visitors) - k + 1):
        window_sum += visitors[start + k - 1] - visitors[start - 1]  # @anchor slide
        if window_sum > best:  # @anchor compare, update-best
            best, best_start = window_sum, start  # @anchor update-best
    return best_start, best  # @anchor return
