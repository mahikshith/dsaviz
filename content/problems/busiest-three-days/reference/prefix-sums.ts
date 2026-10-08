function busiestStretch(visitors: number[], k: number): [number, number] { // @anchor signature
  const prefix = [0]; // @anchor initialize
  for (const v of visitors) prefix.push(prefix[prefix.length - 1] + v); // @anchor build
  let best: number | null = null;
  let bestStart = 0;
  for (let start = 0; start + k <= visitors.length; start++) {
    const total = prefix[start + k] - prefix[start]; // @anchor range
    if (best === null || total > best) { // @anchor compare, update-best
      best = total; // @anchor update-best
      bestStart = start; // @anchor update-best
    }
  }
  return [bestStart, best ?? 0]; // @anchor return
}
