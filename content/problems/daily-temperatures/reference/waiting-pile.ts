function daysToWarmer(temps: number[]): number[] {
  const answer = new Array<number>(temps.length).fill(0);
  const waiting: number[] = [];
  for (let day = 0; day < temps.length; day++) {
    while (waiting.length && temps[waiting[waiting.length - 1]] < temps[day]) {
      const cold = waiting.pop()!;
      answer[cold] = day - cold;
    }
    waiting.push(day);
  }
  return answer;
}
