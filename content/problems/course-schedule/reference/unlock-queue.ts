function canFinish(numCourses: number, prerequisites: [number, number][]): boolean {
  const unlocks: number[][] = Array.from({ length: numCourses }, () => []);
  const missing = new Array<number>(numCourses).fill(0);
  for (const [course, before] of prerequisites) {
    unlocks[before].push(course);
    missing[course] += 1;
  }
  const ready = [...missing.keys()].filter((c) => missing[c] === 0);
  let taken = 0;
  for (let head = 0; head < ready.length; head++) {
    taken += 1;
    for (const next of unlocks[ready[head]]) {
      missing[next] -= 1;
      if (missing[next] === 0) ready.push(next);
    }
  }
  return taken === numCourses;
}
