function bestRoute(money: number[]): number {
  let twoBack = 0;
  let oneBack = 0;
  for (const gift of money) {
    [twoBack, oneBack] = [oneBack, Math.max(oneBack, gift + twoBack)];
  }
  return oneBack;
}
