function busiestStretch(visitors: number[], k: number): [number, number] { // @anchor signature
  let windowSum = 0; // @anchor initialize
  for (let i = 0; i < k; i++) windowSum += visitors[i]; // @anchor build
  let best = windowSum; // @anchor record-first
  let bestStart = 0; // @anchor record-first
  for (let start = 1; start + k <= visitors.length; start++) {
    windowSum += visitors[start + k - 1] - visitors[start - 1]; // @anchor slide
    if (windowSum > best) { // @anchor compare, update-best
      best = windowSum; // @anchor update-best
      bestStart = start; // @anchor update-best
    }
  }
  return [bestStart, best]; // @anchor return
}
