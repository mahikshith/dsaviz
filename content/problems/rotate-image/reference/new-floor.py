def quarter_turn(matrix):
    n = len(matrix)
    turned = [[0] * n for _ in range(n)]
    for r in range(n):
        for c in range(n):
            turned[c][n - 1 - r] = matrix[r][c]
    matrix[:] = turned
    return matrix
