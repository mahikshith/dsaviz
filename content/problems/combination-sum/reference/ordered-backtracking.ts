function exactBaskets(candidates: number[], target: number): number[][] {
  const items = [...candidates].sort((a, b) => a - b);
  const baskets: number[][] = [];
  const basket: number[] = [];
  const fill = (start: number, left: number): void => {
    if (left === 0) {
      baskets.push([...basket]);
      return;
    }
    for (let i = start; i < items.length && items[i] <= left; i++) {
      basket.push(items[i]);
      fill(i, left - items[i]);
      basket.pop();
    }
  };
  fill(0, target);
  return baskets;
}
