function fewestCoins(coins: number[], amount: number): number {
  const fewest = [0, ...new Array<number>(amount).fill(Infinity)];
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) fewest[a] = Math.min(fewest[a], fewest[a - c] + 1);
    }
  }
  return fewest[amount] === Infinity ? -1 : fewest[amount];
}
