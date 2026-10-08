function waysUp(n: number): number { // @anchor signature
  const ways = [1, 1]; // @anchor base
  for (let i = 2; i <= n; i++) {
    ways[i] = ways[i - 1] + ways[i - 2]; // @anchor fill
  }
  return ways[n]; // @anchor return
}
