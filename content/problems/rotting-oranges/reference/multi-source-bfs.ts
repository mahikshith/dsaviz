function minutesToRot(input: number[][]): number {
  const grid = input.map((row) => [...row]);
  let queue: [number, number][] = [];
  let fresh = 0;
  grid.forEach((row, r) => row.forEach((v, c) => {
    if (v === 2) queue.push([r, c]);
    if (v === 1) fresh += 1;
  }));
  let minutes = 0;
  while (queue.length && fresh) {
    const next: [number, number][] = [];
    for (const [r, c] of queue) {
      for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
        if (grid[nr]?.[nc] === 1) {
          grid[nr][nc] = 2;
          fresh -= 1;
          next.push([nr, nc]);
        }
      }
    }
    queue = next;
    minutes += 1;
  }
  return fresh ? -1 : minutes;
}
