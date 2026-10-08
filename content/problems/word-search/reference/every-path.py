def can_trace(board, word):
    rows, cols = len(board), len(board[0])
    def paths(r, c, length, used):
        if length == 1:
            yield [(r, c)]
            return
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in used:
                for rest in paths(nr, nc, length - 1, used | {(nr, nc)}):
                    yield [(r, c)] + rest
    for r in range(rows):
        for c in range(cols):
            for path in paths(r, c, len(word), {(r, c)}):
                if "".join(board[pr][pc] for pr, pc in path) == word:
                    return True
    return False
