def can_trace(board, word):
    grid = [list(row) for row in board]
    rows, cols = len(grid), len(grid[0])

    def trace(r, c, k):
        if k == len(word):
            return True
        if not (0 <= r < rows and 0 <= c < cols) or grid[r][c] != word[k]:
            return False
        letter, grid[r][c] = grid[r][c], "#"  # chalk
        found = any(trace(r + dr, c + dc, k + 1) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)))
        grid[r][c] = letter  # rub out
        return found

    return any(trace(r, c, 0) for r in range(rows) for c in range(cols))
