def routes(rows, cols):
    if rows == 1 or cols == 1:
        return 1
    return routes(rows - 1, cols) + routes(rows, cols - 1)
