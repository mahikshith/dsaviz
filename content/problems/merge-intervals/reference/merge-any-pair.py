def tidy_diary(meetings):
    blocks = [list(m) for m in meetings]
    merged = True
    while merged:
        merged = False
        for i in range(len(blocks)):
            for j in range(i + 1, len(blocks)):
                a, b = blocks[i], blocks[j]
                if a[0] <= b[1] and b[0] <= a[1]:
                    blocks[i] = [min(a[0], b[0]), max(a[1], b[1])]
                    del blocks[j]
                    merged = True
                    break
            if merged:
                break
    return sorted(blocks)
