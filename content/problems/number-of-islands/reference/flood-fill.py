def count_islands(grid):
    grid = [list(row) for row in grid]
    rows, cols = len(grid), len(grid[0])

    def chalk(r, c):
        if 0 <= r < rows and 0 <= c < cols and grid[r][c] == "1":
            grid[r][c] = "#"
            chalk(r + 1, c)
            chalk(r - 1, c)
            chalk(r, c + 1)
            chalk(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                chalk(r, c)
    return count
