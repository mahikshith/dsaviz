function bookLate(intervals: number[][], newInterval: number[]): number[][] {
  const out: number[][] = [];
  let [start, end] = newInterval;
  let i = 0;
  while (i < intervals.length && intervals[i][1] < start) out.push(intervals[i++]);
  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i += 1;
  }
  out.push([start, end]);
  return out.concat(intervals.slice(i));
}
