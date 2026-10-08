from collections import deque

def minutes_to_rot(grid):
    grid = [row[:] for row in grid]
    queue = deque((r, c) for r, row in enumerate(grid) for c, v in enumerate(row) if v == 2)
    fresh = sum(row.count(1) for row in grid)
    minutes = 0
    while queue and fresh:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
        minutes += 1
    return -1 if fresh else minutes
