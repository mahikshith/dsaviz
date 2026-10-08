function shortestCover(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
  let missing = t.length;
  let left = 0;
  let best = '';
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if ((need.get(ch) ?? 0) > 0) missing -= 1;
    need.set(ch, (need.get(ch) ?? 0) - 1);
    while (missing === 0) {
      if (!best || right - left + 1 < best.length) best = s.slice(left, right + 1);
      need.set(s[left], need.get(s[left])! + 1);
      if (need.get(s[left])! > 0) missing += 1;
      left += 1;
    }
  }
  return best;
}
