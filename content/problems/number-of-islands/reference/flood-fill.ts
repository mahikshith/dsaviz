function countIslands(map: string[]): number {
  const grid = map.map((row) => [...row]);
  const chalk = (r: number, c: number): void => {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '#';
    chalk(r + 1, c);
    chalk(r - 1, c);
    chalk(r, c + 1);
    chalk(r, c - 1);
  };
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count += 1;
        chalk(r, c);
      }
    }
  }
  return count;
}
