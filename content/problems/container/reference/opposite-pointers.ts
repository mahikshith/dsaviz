function biggestBarrel(heights: number[]): number { // @anchor signature
  let left = 0; // @anchor initialize
  let right = heights.length - 1; // @anchor initialize
  let best = 0; // @anchor initialize
  while (left < right) {
    const area = Math.min(heights[left], heights[right]) * (right - left); // @anchor measure
    best = Math.max(best, area); // @anchor measure
    if (heights[left] < heights[right]) left += 1; // @anchor move-left
    else right -= 1; // @anchor move-right
  }
  return best; // @anchor return
}
