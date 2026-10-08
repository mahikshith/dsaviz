def count_islands(grid):
    def island(r, c, seen):
        if 0 <= r < len(grid) and 0 <= c < len(grid[0]) and grid[r][c] == "1" and (r, c) not in seen:
            seen.add((r, c))
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                island(r + dr, c + dc, seen)
        return seen
    islands = set()
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == "1":
                islands.add(frozenset(island(r, c, set())))
    return len(islands)
