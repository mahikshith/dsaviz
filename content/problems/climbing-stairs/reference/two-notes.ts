function waysUp(n: number): number {
  let twoBack = 1;
  let oneBack = 1;
  for (let i = 2; i <= n; i++) {
    [twoBack, oneBack] = [oneBack, oneBack + twoBack];
  }
  return oneBack;
}
