def routes(rows, cols):
    ways = [[1] * cols for _ in range(rows)]
    for r in range(1, rows):
        for c in range(1, cols):
            ways[r][c] = ways[r - 1][c] + ways[r][c - 1]
    return ways[-1][-1]
