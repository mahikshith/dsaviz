function longestEcho(s: string): string {
  let best = '';
  for (let centre = 0; centre < s.length; centre++) {
    for (const [l, r] of [[centre, centre], [centre, centre + 1]]) {
      let left = l;
      let right = r;
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        left -= 1;
        right += 1;
      }
      if (right - left - 1 > best.length) best = s.slice(left + 1, right);
    }
  }
  return best;
}
