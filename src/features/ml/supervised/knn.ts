import { blobs, dist, type Labeled, type Point } from '../data';

/** Three classes: A bottom left, B bottom right, C on top. */
export const KNN_DATA: Labeled[] = blobs(5, [{ x: -2.3, y: -1.1 }, { x: 2.2, y: -1 }, { x: 0, y: 1.5 }], 14, 0.85);

export type Neighbour = { point: Labeled; index: number; d: number };

/** The k points closest to q, nearest first. */
export function nearest(data: Labeled[], q: Point, k: number): Neighbour[] {
  return data
    .map((point, index) => ({ point, index, d: dist(point, q) }))
    .sort((a, b) => a.d - b.d || a.index - b.index)
    .slice(0, k);
}

/** Majority vote over the neighbours. A tie goes to the tied class whose member is nearest. */
export function vote(neighbours: Neighbour[], classes: number) {
  const counts = Array.from({ length: classes }, () => 0);
  for (const n of neighbours) counts[n.point.label]! += 1;
  const top = Math.max(...counts);
  const winner = neighbours.find((n) => counts[n.point.label] === top)?.point.label ?? 0;
  return { counts, winner };
}
