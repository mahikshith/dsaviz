function tidyDiary(meetings: number[][]): number[][] {
  const merged: number[][] = [];
  for (const [start, end] of [...meetings].sort((a, b) => a[0] - b[0])) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}
