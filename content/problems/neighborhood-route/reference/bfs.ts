function fewestStreets(streets: [string, string][], start: string, goal: string): [number, string[]] | null { // @anchor signature
  if (start === goal) return [0, [start]]; // @anchor return-same
  const neighbours = new Map<string, string[]>();
  for (const [a, b] of streets) {
    neighbours.set(a, [...(neighbours.get(a) ?? []), b]);
    neighbours.set(b, [...(neighbours.get(b) ?? []), a]);
  }
  const distance = new Map<string, number>([[start, 0]]); // @anchor initialize
  const parent = new Map<string, string | null>([[start, null]]); // @anchor initialize
  const queue = [start]; // @anchor initialize
  let head = 0;
  while (head < queue.length) {
    const corner = queue[head++]; // @anchor dequeue
    for (const next of neighbours.get(corner) ?? []) {
      if (distance.has(next)) continue; // @anchor skip-seen
      distance.set(next, distance.get(corner)! + 1); // @anchor discover, reach-goal
      parent.set(next, corner); // @anchor discover, reach-goal
      if (next === goal) { // @anchor reach-goal
        const route = [goal]; // @anchor return-found
        while (parent.get(route[0])) route.unshift(parent.get(route[0])!); // @anchor return-found
        return [distance.get(goal)!, route]; // @anchor return-found
      }
      queue.push(next); // @anchor discover
    }
  }
  return null; // @anchor return-none
}
