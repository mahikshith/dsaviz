const OPENER_FOR: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

function crateIsCorrect(log: string): boolean { // @anchor signature
  const stack: string[] = []; // @anchor initialize
  for (const symbol of log) {
    const opener = OPENER_FOR[symbol];
    if (opener === undefined) stack.push(symbol); // @anchor push
    else if (stack.length === 0) return false; // @anchor empty-close
    else if (stack[stack.length - 1] !== opener) return false; // @anchor mismatch
    else stack.pop(); // @anchor pop-match
  }
  if (stack.length > 0) return false; // @anchor leftover
  return true; // @anchor return-valid
}
