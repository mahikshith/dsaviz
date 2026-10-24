// @@TESTS-SPEC@@ — generated block (from shared/tests_spec.js), used by the Code page and tests/specs.js.
// One spec per problem with a story. Every input here was written for DSAMaxxing.
//   fn        function name the runner calls (same in every language)
//   params    argument names, in order (used to label inputs)
//   sig       first line of the function in each language
//   cmp       how a result is checked: 'exact', 'unordered' (any order) or 'float' (within 1e-6)
//   examples  shown on the page and run by Run: [args, expected]
//   hidden    only run by Submit
//   ref       a JavaScript reference solution; tests/specs.js runs it on every case
const CODE_LANGS = [['py', 'Python'], ['js', 'JavaScript'], ['java', 'Java'], ['cpp', 'C++'], ['go', 'Go']];
const RUNNABLE = { py: true, js: true };
const TEST_SPECS = {
  'two-sum-ii': {
    fn: 'twoSum', params: ['numbers', 'target'], cmp: 'exact',
    ask: 'The lanterns are sorted from dimmest to brightest. Return the 1-based positions of the two lanterns whose glow adds up to target, smaller position first. There is always exactly one answer.',
    sig: {
      py: 'def twoSum(numbers: List[int], target: int) -> List[int]:',
      js: 'function twoSum(numbers, target) {',
      java: 'public int[] twoSum(int[] numbers, int target) {',
      cpp: 'vector<int> twoSum(vector<int>& numbers, int target) {',
      go: 'func twoSum(numbers []int, target int) []int {'
    },
    examples: [[[[1, 3, 4, 6, 8, 11], 10], [3, 4]], [[[-3, 0, 2, 5], -1], [1, 3]], [[[5, 5], 10], [1, 2]]],
    hidden: [[[[2, 7, 11, 15, 20], 35], [4, 5]], [[[-10, -4, -1, 0, 3, 9], -14], [1, 2]], [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19], [9, 10]], [[[0, 0, 3, 4], 0], [1, 2]], [[[1, 6, 9, 14, 22, 30], 20], [2, 4]]],
    ref: function (numbers, target) {
      let l = 0, r = numbers.length - 1;
      while (l < r) { const s = numbers[l] + numbers[r]; if (s === target) return [l + 1, r + 1]; if (s > target) r--; else l++; }
      return [];
    }
  },
  'valid-palindrome': {
    fn: 'isPalindrome', params: ['s'], cmp: 'exact',
    ask: 'Ignore everything that is not a letter or a digit, and ignore upper and lower case. Return true if what is left reads the same both ways.',
    sig: {
      py: 'def isPalindrome(s: str) -> bool:',
      js: 'function isPalindrome(s) {',
      java: 'public boolean isPalindrome(String s) {',
      cpp: 'bool isPalindrome(string s) {',
      go: 'func isPalindrome(s string) bool {'
    },
    examples: [[['Step on no pets!'], true], [['race a car'], false], [[' '], true]],
    hidden: [[['No lemon, no melon'], true], [['0P'], false], [['ab_a'], true], [['Was it a car or a cat I saw?'], true], [['abca'], false]],
    ref: function (s) {
      const t = s.toLowerCase().replace(/[^a-z0-9]/g, '');
      return t === t.split('').reverse().join('');
    }
  },
  container: {
    fn: 'maxArea', params: ['height'], cmp: 'exact',
    ask: 'Each number is a plank height. Pick two planks; the water between them is the shorter height times the distance between them. Return the most water any pair can hold.',
    sig: {
      py: 'def maxArea(height: List[int]) -> int:',
      js: 'function maxArea(height) {',
      java: 'public int maxArea(int[] height) {',
      cpp: 'int maxArea(vector<int>& height) {',
      go: 'func maxArea(height []int) int {'
    },
    examples: [[[[2, 5, 4, 8, 3]], 10], [[[1, 1]], 1], [[[4, 3, 2, 1, 4]], 16]],
    hidden: [[[[1, 2, 1]], 2], [[[6, 1, 1, 1, 1, 1, 1, 6]], 42], [[[3, 9, 3, 4, 7, 2, 12, 6]], 45], [[[0, 0, 0]], 0], [[[10, 2, 2, 2, 2, 2, 2, 2, 2, 10]], 90]],
    ref: function (height) {
      let l = 0, r = height.length - 1, best = 0;
      while (l < r) { best = Math.max(best, Math.min(height[l], height[r]) * (r - l)); if (height[l] < height[r]) l++; else r--; }
      return best;
    }
  },
  'longest-substring': {
    fn: 'lengthOfLongestSubstring', params: ['s'], cmp: 'exact',
    ask: 'Return the length of the longest stretch of s in which no character appears twice.',
    sig: {
      py: 'def lengthOfLongestSubstring(s: str) -> int:',
      js: 'function lengthOfLongestSubstring(s) {',
      java: 'public int lengthOfLongestSubstring(String s) {',
      cpp: 'int lengthOfLongestSubstring(string s) {',
      go: 'func lengthOfLongestSubstring(s string) int {'
    },
    examples: [[['lanterns'], 6], [['zzzz'], 1], [[''], 0]],
    hidden: [[['abcadefa'], 6], [['abba'], 2], [['a b c'], 3], [['pqrstuvwxyzp'], 11], [['aab'], 2]],
    ref: function (s) {
      const last = new Map(); let left = 0, best = 0;
      for (let r = 0; r < s.length; r++) { if (last.has(s[r]) && last.get(s[r]) >= left) left = last.get(s[r]) + 1; last.set(s[r], r); best = Math.max(best, r - left + 1); }
      return best;
    }
  },
  'char-replacement': {
    fn: 'characterReplacement', params: ['s', 'k'], cmp: 'exact',
    ask: 's holds only capital letters. You may repaint at most k of them to any other letter. Return the length of the longest stretch that can end up all one letter.',
    sig: {
      py: 'def characterReplacement(s: str, k: int) -> int:',
      js: 'function characterReplacement(s, k) {',
      java: 'public int characterReplacement(String s, int k) {',
      cpp: 'int characterReplacement(string s, int k) {',
      go: 'func characterReplacement(s string, k int) int {'
    },
    examples: [[['AABA', 0], 2], [['ABBB', 2], 4], [['ABCD', 1], 2]],
    hidden: [[['AAAA', 2], 4], [['ABABBA', 1], 4], [['BAAAB', 2], 5], [['XYZ', 0], 1], [['AABBBCCCC', 3], 7]],
    ref: function (s, k) {
      const count = {}; let left = 0, top = 0, best = 0;
      for (let r = 0; r < s.length; r++) {
        count[s[r]] = (count[s[r]] || 0) + 1; top = Math.max(top, count[s[r]]);
        if (r - left + 1 - top > k) { count[s[left]]--; left++; }
        best = Math.max(best, r - left + 1);
      }
      return best;
    }
  },
  'best-time-stock': {
    fn: 'maxProfit', params: ['prices'], cmp: 'exact',
    ask: 'prices[i] is the price of mangoes on day i. Buy on one day and sell on a later day. Return the biggest profit you can make, or 0 if every sale would lose money.',
    sig: {
      py: 'def maxProfit(prices: List[int]) -> int:',
      js: 'function maxProfit(prices) {',
      java: 'public int maxProfit(int[] prices) {',
      cpp: 'int maxProfit(vector<int>& prices) {',
      go: 'func maxProfit(prices []int) int {'
    },
    examples: [[[[9, 4, 6, 2, 7, 3]], 5], [[[8, 6, 4, 2]], 0], [[[3]], 0]],
    hidden: [[[[1, 2, 3, 4, 5, 6]], 5], [[[2, 9, 1, 3]], 7], [[[5, 5, 5]], 0], [[[4, 1, 8, 0, 6]], 7], [[[10, 30, 5, 25, 1, 15]], 20]],
    ref: function (prices) {
      let low = Infinity, best = 0;
      for (const p of prices) { low = Math.min(low, p); best = Math.max(best, p - low); }
      return best;
    }
  },
  'contains-duplicate': {
    fn: 'containsDuplicate', params: ['nums'], cmp: 'exact',
    ask: 'Return true if any value appears at least twice in nums, and false if every value is different.',
    sig: {
      py: 'def containsDuplicate(nums: List[int]) -> bool:',
      js: 'function containsDuplicate(nums) {',
      java: 'public boolean containsDuplicate(int[] nums) {',
      cpp: 'bool containsDuplicate(vector<int>& nums) {',
      go: 'func containsDuplicate(nums []int) bool {'
    },
    examples: [[[[4, 9, 2, 9]], true], [[[3, 1, 4, 5]], false], [[[]], false]],
    hidden: [[[[0, -1, 0]], true], [[[7]], false], [[[-5, -4, -3, -2, -1]], false], [[[1, 1]], true], [[[100, 200, 300, 400, 500, 100]], true]],
    ref: function (nums) { return new Set(nums).size !== nums.length; }
  },
  'two-sum': {
    fn: 'twoSum', params: ['nums', 'target'], cmp: 'unordered',
    ask: 'Return the two indexes (0-based) of the numbers in nums that add up to target. Each input has exactly one answer; you may return the two indexes in either order.',
    sig: {
      py: 'def twoSum(nums: List[int], target: int) -> List[int]:',
      js: 'function twoSum(nums, target) {',
      java: 'public int[] twoSum(int[] nums, int target) {',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {',
      go: 'func twoSum(nums []int, target int) []int {'
    },
    examples: [[[[5, 9, 13, 2], 11], [1, 3]], [[[4, 4, 1], 8], [0, 1]], [[[-2, 6, 3], 1], [0, 2]]],
    hidden: [[[[0, 4, 3, 0], 0], [0, 3]], [[[10, 20, 30, 40], 70], [2, 3]], [[[-1, -2, -3, -4, -5], -8], [2, 4]], [[[1, 5, 9], 14], [1, 2]], [[[7, 2, 8, 11, 5], 19], [2, 3]]],
    ref: function (nums, target) {
      const seen = new Map();
      for (let i = 0; i < nums.length; i++) { if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i]; seen.set(nums[i], i); }
      return [];
    }
  },
  'valid-anagram': {
    fn: 'isAnagram', params: ['s', 't'], cmp: 'exact',
    ask: 's and t hold lowercase letters. Return true if t uses exactly the same letters as s, each the same number of times.',
    sig: {
      py: 'def isAnagram(s: str, t: str) -> bool:',
      js: 'function isAnagram(s, t) {',
      java: 'public boolean isAnagram(String s, String t) {',
      cpp: 'bool isAnagram(string s, string t) {',
      go: 'func isAnagram(s string, t string) bool {'
    },
    examples: [[['listen', 'silent'], true], [['tile', 'tide'], false], [['a', 'ab'], false]],
    hidden: [[['', ''], true], [['aabbcc', 'abcabc'], true], [['aabb', 'abbb'], false], [['dusty', 'study'], true], [['abc', 'abd'], false]],
    ref: function (s, t) { return s.length === t.length && s.split('').sort().join('') === t.split('').sort().join(''); }
  }
};

// Starter code for a spec in one language: the signature plus an empty body.
function starterCode(spec, lang) {
  const sig = spec.sig[lang];
  if (lang === 'py') return 'from typing import List\n\n' + sig + '\n    # Write your solution here.\n    pass\n';
  if (lang === 'js') return sig + '\n  // Write your solution here.\n}\n';
  if (lang === 'java') return 'class Solution {\n    ' + sig + '\n        // Write your solution here.\n    }\n}\n';
  if (lang === 'cpp') return '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    ' + sig + '\n        // Write your solution here.\n    }\n};\n';
  return 'package main\n\n' + sig + '\n    // Write your solution here.\n}\n';
}

// Canonical JSON for comparing and printing results.
function showValue(v) {
  if (v === undefined) return 'undefined';
  try { const s = JSON.stringify(v); return s === undefined ? String(v) : s; } catch (e) { return String(v); }
}
function showArgs(spec, args) { return spec.params.map((p, i) => p + ' = ' + showValue(args[i])).join(', '); }
function sameResult(cmp, got, want) {
  if (cmp === 'unordered' && Array.isArray(got) && Array.isArray(want)) {
    const key = (a) => a.map(showValue).sort().join('|');
    return got.length === want.length && key(got) === key(want);
  }
  if (cmp === 'float') {
    const close = (a, b) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) <= 1e-6;
    if (Array.isArray(got) && Array.isArray(want)) return got.length === want.length && got.every((x, i) => close(x, want[i]));
    return close(got, want);
  }
  return showValue(got) === showValue(want);
}
if (typeof module !== 'undefined' && module.exports) module.exports = { TEST_SPECS, CODE_LANGS, RUNNABLE, starterCode, showValue, showArgs, sameResult };
// @@END-TESTS-SPEC@@
