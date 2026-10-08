const counts = (c: string) => /^[a-z0-9]$/i.test(c);

function readsBothWays(text: string): boolean { // @anchor signature
  let left = 0; // @anchor initialize
  let right = text.length - 1; // @anchor initialize
  while (left < right) {
    if (!counts(text[left])) left += 1; // @anchor skip-left
    else if (!counts(text[right])) right -= 1; // @anchor skip-right
    else if (text[left].toLowerCase() !== text[right].toLowerCase()) // @anchor compare, mismatch
      return false; // @anchor mismatch
    else {
      left += 1; // @anchor step-inward
      right -= 1; // @anchor step-inward
    }
  }
  return true; // @anchor return-true
}
