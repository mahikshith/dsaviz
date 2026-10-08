def busiest_stretch(visitors, k):  # @anchor signature
    prefix = [0]  # @anchor initialize
    for v in visitors:
        prefix.append(prefix[-1] + v)  # @anchor build
    best, best_start = None, 0
    for start in range(len(visitors) - k + 1):
        total = prefix[start + k] - prefix[start]  # @anchor range
        if best is None or total > best:  # @anchor compare, update-best
            best, best_start = total, start  # @anchor update-best
    return best_start, best  # @anchor return
