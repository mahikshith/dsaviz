function canTrace(board: string[], word: string): boolean {
  const grid = board.map((row) => [...row]);
  const trace = (r: number, c: number, k: number): boolean => {
    if (k === word.length) return true;
    if (grid[r]?.[c] !== word[k]) return false;
    const letter = grid[r][c];
    grid[r][c] = '#';
    const found = trace(r + 1, c, k + 1) || trace(r - 1, c, k + 1) || trace(r, c + 1, k + 1) || trace(r, c - 1, k + 1);
    grid[r][c] = letter;
    return found;
  };
  return grid.some((row, r) => row.some((_, c) => trace(r, c, 0)));
}
