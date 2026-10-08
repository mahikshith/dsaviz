function routes(rows: number, cols: number): number {
  const row = new Array<number>(cols).fill(1);
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) row[c] += row[c - 1];
  }
  return row[cols - 1];
}
