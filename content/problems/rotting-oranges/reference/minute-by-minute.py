def minutes_to_rot(grid):
    grid = [row[:] for row in grid]
    minutes = 0
    while True:
        rot = [(r, c) for r, row in enumerate(grid) for c, v in enumerate(row) if v == 1 and any(
            0 <= r + dr < len(grid) and 0 <= c + dc < len(row) and grid[r + dr][c + dc] == 2
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)))]
        if not rot:
            break
        for r, c in rot:
            grid[r][c] = 2
        minutes += 1
    return -1 if any(1 in row for row in grid) else minutes
