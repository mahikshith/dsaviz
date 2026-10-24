// @@TESTS-SPEC@@ — generated block (from shared/tests_spec.js), used by the Code page and tests/specs.js.
// One spec per problem. Every input here was written for DSAMaxxing.
//   fn        function name the runner calls (same in every language); for a design problem, the class name
//   params    argument names, in order (used to label inputs)
//   sig       first line of the function in each language
//   starter   optional full starter code per language (design problems)
//   cmp       how a result is checked:
//               'exact'           same JSON
//               'unordered'       same items in any order (items themselves compared exactly)
//               'unordered-deep'  same items in any order, and each item that is a list may be in any order too
//               'float'           numbers within 1e-6
//               'any'             several answers are allowed: check(args, got, want) decides; want is one valid answer
//   examples  shown on the page and run by Run: [args, expected]
//   hidden    only run by Submit (5 or more, with edge cases)
//   ref       a JavaScript reference solution; tests/specs.js runs it on every case
//   meta      for problems without a story in the catalog: [title, LeetCode number, difficulty, pattern]
//   io        how arguments and the result travel when they are not plain JSON (see below)
//
// Encodings. Tests are plain JSON; the runner harness (shared/runner.js, in JS and Python) turns them
// into nodes before the call and back into JSON after it. io.args gives a kind per parameter (null =
// plain JSON), io.ret the kind of the result.
//   'list'   a linked list as its values, head first: [1, 2, 3]. [] is an empty list (null).
//   'lists'  a list of such lists: [[1, 4], [2], []].
//   'cycle'  a list that may loop, written [values, pos]: the last node points back to the node at
//            index pos, or nowhere when pos is -1. [[3, 1, 4], 0] loops from 4 back to 3.
//   'tree'   a binary tree in level order, null for a missing child, trailing nulls dropped:
//            [4, 2, 7, null, 3] is 4 with children 2 and 7, and 3 as the right child of 2. [] is empty.
//   'graph'  a connected undirected graph as an adjacency list: row i lists the neighbours of the node
//            with value i + 1. The function receives node 1 (null for []). A returned graph is read
//            back the same way, and returning one of the original nodes is an error.
//   io.inplace: k means the function changes argument k and returns nothing; the answer is argument k
//            afterwards (read with its kind).
//   io.design: the problem is a class. args are [ops, vals]: the harness builds the class (with
//            io.ctor, ops[0] is the class name and vals[0] go to the constructor), calls ops[i](...vals[i])
//            in order, and the answer is what each call returned (null for nothing).
// The learner gets ListNode(val, next), TreeNode(val, left, right) and Node(val, neighbors) in JS and
// Python. JS references never name those classes (the page has a DOM Node): they reuse the nodes they
// are given, use a plain { next } object as a dummy head, or call node.constructor.
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
  },
  'min-window': {
    fn: 'minWindow', params: ['s', 't'], cmp: 'exact',
    ask: 'Return the shortest stretch of s that contains every character of t, counting repeats (case matters). If no stretch works, return an empty string. When an answer exists it is the only shortest one.',
    sig: {
      py: 'def minWindow(s: str, t: str) -> str:',
      js: 'function minWindow(s, t) {',
      java: 'public String minWindow(String s, String t) {',
      cpp: 'string minWindow(string s, string t) {',
      go: 'func minWindow(s string, t string) string {'
    },
    examples: [[['hellotheworld', 'owl'], 'worl'], [['abc', 'd'], ''], [['aa', 'aa'], 'aa']],
    hidden: [[['a', 'a'], 'a'], [['a', 'b'], ''], [['bba', 'ab'], 'ba'], [['zzqpzzzq', 'pqq'], 'qpzzzq'], [['xyz', 'zyx'], 'xyz'], [['aabdec', 'abc'], 'abdec'], [['ab', 'A'], '']],
    ref: function (s, t) {
      const need = {}; for (const c of t) need[c] = (need[c] || 0) + 1;
      let missing = t.length, left = 0, bestL = 0, bestLen = Infinity;
      for (let r = 0; r < s.length; r++) {
        if ((need[s[r]] = (need[s[r]] || 0) - 1) >= 0) missing--;
        while (missing === 0) {
          if (r - left + 1 < bestLen) { bestLen = r - left + 1; bestL = left; }
          if (++need[s[left]] > 0) missing++;
          left++;
        }
      }
      return bestLen === Infinity ? '' : s.slice(bestL, bestL + bestLen);
    }
  },
  'longest-palindrome': {
    fn: 'longestPalindrome', params: ['s'], cmp: 'any',
    ask: 'Return the longest stretch of s that reads the same both ways. If several stretches tie for longest, any of them is accepted.',
    sig: {
      py: 'def longestPalindrome(s: str) -> str:',
      js: 'function longestPalindrome(s) {',
      java: 'public String longestPalindrome(String s) {',
      cpp: 'string longestPalindrome(string s) {',
      go: 'func longestPalindrome(s string) string {'
    },
    examples: [[['racecars'], 'racecar'], [['abbc'], 'bb'], [['q'], 'q']],
    hidden: [[['abcd'], 'a'], [['noonmadam'], 'madam'], [['aaaa'], 'aaaa'], [['xabacabay'], 'abacaba'], [['abcbaxyz'], 'abcba'], [['zz'], 'zz']],
    check: function (args, got, want) {
      const s = args[0];
      return typeof got === 'string' && got.length === want.length && s.includes(got) && got === got.split('').reverse().join('');
    },
    ref: function (s) {
      let best = s.slice(0, 1);
      for (let c = 0; c < s.length; c++) for (const [l0, r0] of [[c, c], [c, c + 1]]) {
        let l = l0, r = r0;
        while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
        if (r - l - 1 > best.length) best = s.slice(l + 1, r);
      }
      return best;
    }
  },
  '3sum': {
    fn: 'threeSum', params: ['nums'], cmp: 'unordered-deep',
    ask: 'Return every different trio of values from nums (three different positions) that adds up to 0. No trio may appear twice. The trios, and the values inside each trio, may come in any order.',
    sig: {
      py: 'def threeSum(nums: List[int]) -> List[List[int]]:',
      js: 'function threeSum(nums) {',
      java: 'public List<List<Integer>> threeSum(int[] nums) {',
      cpp: 'vector<vector<int>> threeSum(vector<int>& nums) {',
      go: 'func threeSum(nums []int) [][]int {'
    },
    examples: [[[[-2, 0, 1, 1, 2]], [[-2, 0, 2], [-2, 1, 1]]], [[[1, 2, 3]], []], [[[0, 0, 0, 0]], [[0, 0, 0]]]],
    hidden: [[[[]], []], [[[-1, 0, 1]], [[-1, 0, 1]]], [[[3, -3, 0, -1, 1, 2, -2]], [[-3, 0, 3], [-3, 1, 2], [-2, -1, 3], [-2, 0, 2], [-1, 0, 1]]], [[[-4, -4, 8, 0, 4, -4]], [[-4, -4, 8], [-4, 0, 4]]], [[[5, -5, -5, 10, 0]], [[-5, -5, 10], [-5, 0, 5]]], [[[1, 1, -2]], [[-2, 1, 1]]]],
    ref: function (nums) {
      const a = nums.slice().sort((x, y) => x - y), out = [];
      for (let i = 0; i < a.length - 2; i++) {
        if (i > 0 && a[i] === a[i - 1]) continue;
        let l = i + 1, r = a.length - 1;
        while (l < r) {
          const s = a[i] + a[l] + a[r];
          if (s < 0) l++; else if (s > 0) r--;
          else { out.push([a[i], a[l], a[r]]); l++; r--; while (l < r && a[l] === a[l - 1]) l++; }
        }
      }
      return out;
    }
  },
  'trapping-rain': {
    fn: 'trap', params: ['height'], cmp: 'exact',
    ask: 'Each number is the height of a rock in a row, all one unit wide. After the rain, how many units of water sit between the rocks?',
    sig: {
      py: 'def trap(height: List[int]) -> int:',
      js: 'function trap(height) {',
      java: 'public int trap(int[] height) {',
      cpp: 'int trap(vector<int>& height) {',
      go: 'func trap(height []int) int {'
    },
    examples: [[[[3, 0, 2, 0, 4]], 7], [[[1, 2, 3]], 0], [[[5, 1, 5]], 4]],
    hidden: [[[[]], 0], [[[4]], 0], [[[2, 0, 2, 0, 2]], 4], [[[0, 3, 1, 2, 0, 4, 1]], 6], [[[6, 5, 4, 3, 2, 1]], 0], [[[5, 2, 1, 2, 1, 5]], 14]],
    ref: function (height) {
      let l = 0, r = height.length - 1, lm = 0, rm = 0, w = 0;
      while (l < r) {
        if (height[l] < height[r]) { lm = Math.max(lm, height[l]); w += lm - height[l]; l++; }
        else { rm = Math.max(rm, height[r]); w += rm - height[r]; r--; }
      }
      return w;
    }
  },
  'move-zeroes': {
    fn: 'moveZeroes', params: ['nums'], cmp: 'exact', io: { inplace: 0 },
    ask: 'Move every 0 in nums to the end while keeping the other numbers in their order. Change nums itself and return nothing; the tests read nums afterwards.',
    sig: {
      py: 'def moveZeroes(nums: List[int]) -> None:',
      js: 'function moveZeroes(nums) {',
      java: 'public void moveZeroes(int[] nums) {',
      cpp: 'void moveZeroes(vector<int>& nums) {',
      go: 'func moveZeroes(nums []int) {'
    },
    examples: [[[[0, 3, 0, 7, 9]], [3, 7, 9, 0, 0]], [[[0, 4]], [4, 0]], [[[0, 0, 1]], [1, 0, 0]]],
    hidden: [[[[]], []], [[[0]], [0]], [[[5]], [5]], [[[1, 0, 2, 0, 3, 0]], [1, 2, 3, 0, 0, 0]], [[[-1, 0, -2]], [-1, -2, 0]], [[[0, 0, 0, 9]], [9, 0, 0, 0]]],
    ref: function (nums) {
      let w = 0;
      for (let r = 0; r < nums.length; r++) if (nums[r] !== 0) { const t = nums[w]; nums[w] = nums[r]; nums[r] = t; w++; }
    }
  },
  'product-except-self': {
    fn: 'productExceptSelf', params: ['nums'], cmp: 'exact',
    ask: 'Return a list where position i holds the product of every number in nums except nums[i]. Try it without division.',
    sig: {
      py: 'def productExceptSelf(nums: List[int]) -> List[int]:',
      js: 'function productExceptSelf(nums) {',
      java: 'public int[] productExceptSelf(int[] nums) {',
      cpp: 'vector<int> productExceptSelf(vector<int>& nums) {',
      go: 'func productExceptSelf(nums []int) []int {'
    },
    examples: [[[[2, 3, 4]], [12, 8, 6]], [[[1, 0, 5]], [0, 5, 0]], [[[-1, 2, -3, 4]], [-24, 12, -8, 6]]],
    hidden: [[[[0, 0]], [0, 0]], [[[7, 1]], [1, 7]], [[[1, 1, 1, 1]], [1, 1, 1, 1]], [[[0, 4, 0]], [0, 0, 0]], [[[10, 10, 10]], [100, 100, 100]], [[[3, -2, 0, 5]], [0, 0, -30, 0]]],
    ref: function (nums) {
      const out = new Array(nums.length).fill(1);
      let p = 1; for (let i = 0; i < nums.length; i++) { out[i] = p; p *= nums[i]; }
      p = 1; for (let i = nums.length - 1; i >= 0; i--) { out[i] *= p; p *= nums[i]; }
      return out.map((x) => x + 0);
    }
  },
  'subarray-sum-k': {
    fn: 'subarraySum', params: ['nums', 'k'], cmp: 'exact',
    ask: 'Count the unbroken stretches of nums (at least one number long) whose numbers add up to exactly k.',
    sig: {
      py: 'def subarraySum(nums: List[int], k: int) -> int:',
      js: 'function subarraySum(nums, k) {',
      java: 'public int subarraySum(int[] nums, int k) {',
      cpp: 'int subarraySum(vector<int>& nums, int k) {',
      go: 'func subarraySum(nums []int, k int) int {'
    },
    examples: [[[[1, 2, 1, 2, 1], 3], 4], [[[1, -1, 0], 0], 3], [[[5], 5], 1]],
    hidden: [[[[1, 2, 3], 7], 0], [[[0, 0, 0], 0], 6], [[[-2, 2, -2, 2], 0], 4], [[[3, 4, 7, 2, -3, 1, 4, 2], 7], 4], [[[1000, -1000, 1000], 1000], 3], [[[], 0], 0]],
    ref: function (nums, k) {
      const seen = new Map([[0, 1]]); let sum = 0, n = 0;
      for (const x of nums) { sum += x; n += seen.get(sum - k) || 0; seen.set(sum, (seen.get(sum) || 0) + 1); }
      return n;
    }
  },
  'binary-search': {
    fn: 'search', params: ['nums', 'target'], cmp: 'exact',
    ask: 'nums is sorted from small to large and has no repeats. Return the index of target, or -1 if it is not there. Aim for O(log n).',
    sig: {
      py: 'def search(nums: List[int], target: int) -> int:',
      js: 'function search(nums, target) {',
      java: 'public int search(int[] nums, int target) {',
      cpp: 'int search(vector<int>& nums, int target) {',
      go: 'func search(nums []int, target int) int {'
    },
    examples: [[[[-3, 0, 4, 8, 15], 8], 3], [[[2, 6, 9], 5], -1], [[[7], 7], 0]],
    hidden: [[[[], 1], -1], [[[1, 3], 3], 1], [[[1, 3], 1], 0], [[[-10, -5, 0, 5, 10, 15, 20, 25], 25], 7], [[[4, 5, 6], 10], -1], [[[100], -100], -1]],
    ref: function (nums, target) {
      let lo = 0, hi = nums.length - 1;
      while (lo <= hi) { const m = (lo + hi) >> 1; if (nums[m] === target) return m; if (nums[m] < target) lo = m + 1; else hi = m - 1; }
      return -1;
    }
  },
  'search-rotated': {
    fn: 'search', params: ['nums', 'target'], cmp: 'exact',
    ask: 'nums was sorted with no repeats, then cut at some point and the two pieces swapped. Return the index of target, or -1 if it is missing. Aim for O(log n).',
    sig: {
      py: 'def search(nums: List[int], target: int) -> int:',
      js: 'function search(nums, target) {',
      java: 'public int search(int[] nums, int target) {',
      cpp: 'int search(vector<int>& nums, int target) {',
      go: 'func search(nums []int, target int) int {'
    },
    examples: [[[[6, 7, 9, 1, 3, 4], 3], 4], [[[6, 7, 9, 1, 3, 4], 8], -1], [[[2], 2], 0]],
    hidden: [[[[5, 1, 3], 5], 0], [[[5, 1, 3], 3], 2], [[[1, 2, 3, 4, 5], 4], 3], [[[30, 40, 50, 10, 20], 10], 3], [[[8, 9, 2, 3, 4], 9], 1], [[[3, 1], 0], -1]],
    ref: function (nums, target) {
      let lo = 0, hi = nums.length - 1;
      while (lo <= hi) {
        const m = (lo + hi) >> 1;
        if (nums[m] === target) return m;
        if (nums[lo] <= nums[m]) { if (nums[lo] <= target && target < nums[m]) hi = m - 1; else lo = m + 1; }
        else { if (nums[m] < target && target <= nums[hi]) lo = m + 1; else hi = m - 1; }
      }
      return -1;
    }
  },
  'find-min-rotated': {
    fn: 'findMin', params: ['nums'], cmp: 'exact',
    ask: 'nums was sorted with no repeats, then cut at some point and the two pieces swapped. Return its smallest value in O(log n).',
    sig: {
      py: 'def findMin(nums: List[int]) -> int:',
      js: 'function findMin(nums) {',
      java: 'public int findMin(int[] nums) {',
      cpp: 'int findMin(vector<int>& nums) {',
      go: 'func findMin(nums []int) int {'
    },
    examples: [[[[5, 6, 1, 2, 3]], 1], [[[2, 3, 4, 5]], 2], [[[9]], 9]],
    hidden: [[[[2, 1]], 1], [[[3, 4, 5, 1, 2]], 1], [[[-5, -3, -10, -8]], -10], [[[11, 13, 15, 17]], 11], [[[20, 30, 40, 50, 10]], 10], [[[1000, -1000]], -1000]],
    ref: function (nums) {
      let lo = 0, hi = nums.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] > nums[hi]) lo = m + 1; else hi = m; }
      return nums[lo];
    }
  },
  'rotate-image': {
    fn: 'rotate', params: ['matrix'], cmp: 'exact', io: { inplace: 0 },
    ask: 'matrix is a square grid. Turn it a quarter-turn clockwise by changing matrix itself, and return nothing; the tests read matrix afterwards.',
    sig: {
      py: 'def rotate(matrix: List[List[int]]) -> None:',
      js: 'function rotate(matrix) {',
      java: 'public void rotate(int[][] matrix) {',
      cpp: 'void rotate(vector<vector<int>>& matrix) {',
      go: 'func rotate(matrix [][]int) {'
    },
    examples: [[[[[1, 2], [3, 4]]], [[3, 1], [4, 2]]], [[[[0, 1, 2], [3, 4, 5], [6, 7, 8]]], [[6, 3, 0], [7, 4, 1], [8, 5, 2]]], [[[[-1, -2], [-3, -4]]], [[-3, -1], [-4, -2]]]],
    hidden: [[[[[5]]], [[5]]], [[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]], [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]], [[[[1, 1], [2, 2]]], [[2, 1], [2, 1]]], [[[[9, 8, 7], [6, 5, 4], [3, 2, 1]]], [[3, 6, 9], [2, 5, 8], [1, 4, 7]]], [[[[0, 0], [0, 1]]], [[0, 0], [1, 0]]]],
    ref: function (matrix) {
      const n = matrix.length;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const t = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = t; }
      for (const row of matrix) row.reverse();
    }
  },
  'merge-intervals': {
    fn: 'merge', params: ['intervals'], cmp: 'unordered',
    ask: 'Each pair [start, end] is a meeting. Merge every group of meetings that overlap or touch, and return the merged meetings in any order.',
    sig: {
      py: 'def merge(intervals: List[List[int]]) -> List[List[int]]:',
      js: 'function merge(intervals) {',
      java: 'public int[][] merge(int[][] intervals) {',
      cpp: 'vector<vector<int>> merge(vector<vector<int>>& intervals) {',
      go: 'func merge(intervals [][]int) [][]int {'
    },
    examples: [[[[[1, 4], [2, 6], [8, 9]]], [[1, 6], [8, 9]]], [[[[5, 7], [1, 2]]], [[1, 2], [5, 7]]], [[[[1, 3], [3, 5]]], [[1, 5]]]],
    hidden: [[[[[4, 4]]], [[4, 4]]], [[[[1, 10], [2, 3], [4, 5]]], [[1, 10]]], [[[[6, 8], [1, 9], [2, 4], [4, 7]]], [[1, 9]]], [[[[1, 2], [3, 4], [5, 6]]], [[1, 2], [3, 4], [5, 6]]], [[[[0, 0], [0, 0]]], [[0, 0]]], [[[[-5, -1], [-2, 3], [10, 12]]], [[-5, 3], [10, 12]]]],
    ref: function (intervals) {
      const a = intervals.slice().sort((x, y) => x[0] - y[0]), out = [];
      for (const [s, e] of a) { if (out.length && s <= out[out.length - 1][1]) out[out.length - 1][1] = Math.max(out[out.length - 1][1], e); else out.push([s, e]); }
      return out;
    }
  },
  'insert-interval': {
    fn: 'insert', params: ['intervals', 'newInterval'], cmp: 'exact',
    ask: 'intervals is sorted by start and has no overlaps. Add newInterval, merge anything it overlaps or touches, and return the list still sorted by start.',
    sig: {
      py: 'def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:',
      js: 'function insert(intervals, newInterval) {',
      java: 'public int[][] insert(int[][] intervals, int[] newInterval) {',
      cpp: 'vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {',
      go: 'func insert(intervals [][]int, newInterval []int) [][]int {'
    },
    examples: [[[[[1, 2], [5, 7]], [3, 4]], [[1, 2], [3, 4], [5, 7]]], [[[[1, 3], [4, 6], [8, 10]], [2, 5]], [[1, 6], [8, 10]]], [[[], [2, 3]], [[2, 3]]]],
    hidden: [[[[[3, 5]], [1, 2]], [[1, 2], [3, 5]]], [[[[3, 5]], [6, 9]], [[3, 5], [6, 9]]], [[[[1, 2], [3, 4], [5, 6], [7, 8]], [0, 10]], [[0, 10]]], [[[[1, 5]], [2, 3]], [[1, 5]]], [[[[1, 2], [6, 7]], [2, 6]], [[1, 7]]], [[[[2, 4]], [4, 4]], [[2, 4]]]],
    ref: function (intervals, newInterval) {
      const out = []; let [s, e] = newInterval, i = 0;
      while (i < intervals.length && intervals[i][1] < s) out.push(intervals[i++]);
      while (i < intervals.length && intervals[i][0] <= e) { s = Math.min(s, intervals[i][0]); e = Math.max(e, intervals[i][1]); i++; }
      out.push([s, e]);
      while (i < intervals.length) out.push(intervals[i++]);
      return out;
    }
  },
  'jump-game': {
    fn: 'canJump', params: ['nums'], cmp: 'exact',
    ask: 'You start on the first stone. nums[i] is the longest jump you can make from stone i. Return true if you can reach the last stone.',
    sig: {
      py: 'def canJump(nums: List[int]) -> bool:',
      js: 'function canJump(nums) {',
      java: 'public boolean canJump(int[] nums) {',
      cpp: 'bool canJump(vector<int>& nums) {',
      go: 'func canJump(nums []int) bool {'
    },
    examples: [[[[2, 0, 1, 0]], true], [[[1, 0, 2]], false], [[[0]], true]],
    hidden: [[[[2, 1, 0, 0, 5]], false], [[[1, 1, 1, 1]], true], [[[5, 0, 0, 0, 0, 0]], true], [[[0, 1]], false], [[[1, 2, 0, 0, 1]], false], [[[4, 0, 0, 0, 0]], true]],
    ref: function (nums) {
      let far = 0;
      for (let i = 0; i < nums.length; i++) { if (i > far) return false; far = Math.max(far, i + nums[i]); }
      return true;
    }
  },
  subsets: {
    fn: 'subsets', params: ['nums'], cmp: 'unordered-deep',
    ask: 'The numbers in nums are all different. Return every possible subset, including the empty one, each exactly once, in any order.',
    sig: {
      py: 'def subsets(nums: List[int]) -> List[List[int]]:',
      js: 'function subsets(nums) {',
      java: 'public List<List<Integer>> subsets(int[] nums) {',
      cpp: 'vector<vector<int>> subsets(vector<int>& nums) {',
      go: 'func subsets(nums []int) [][]int {'
    },
    examples: [[[[5, 6]], [[], [5], [6], [5, 6]]], [[[0]], [[], [0]]], [[[7, 8, 9]], [[], [7], [8], [9], [7, 8], [7, 9], [8, 9], [7, 8, 9]]]],
    hidden: [[[[]], [[]]], [[[-1, 1]], [[], [-1], [1], [-1, 1]]], [[[10]], [[], [10]]], [[[1, 2, 3, 4]], [[], [1], [2], [3], [4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4], [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]]], [[[3, -3, 0]], [[], [3], [-3], [0], [3, -3], [3, 0], [-3, 0], [3, -3, 0]]]],
    ref: function (nums) {
      const out = [[]];
      for (const x of nums) { const n = out.length; for (let i = 0; i < n; i++) out.push(out[i].concat([x])); }
      return out;
    }
  },
  permutations: {
    fn: 'permute', params: ['nums'], cmp: 'unordered',
    ask: 'The numbers in nums are all different. Return every ordering of them, each exactly once. The orderings may come in any order.',
    sig: {
      py: 'def permute(nums: List[int]) -> List[List[int]]:',
      js: 'function permute(nums) {',
      java: 'public List<List<Integer>> permute(int[] nums) {',
      cpp: 'vector<vector<int>> permute(vector<int>& nums) {',
      go: 'func permute(nums []int) [][]int {'
    },
    examples: [[[[4, 5]], [[4, 5], [5, 4]]], [[[9]], [[9]]], [[[0, 1, 2]], [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]]],
    hidden: [[[[5]], [[5]]], [[[-1, 2]], [[-1, 2], [2, -1]]], [[[10, 20, 30]], [[10, 20, 30], [10, 30, 20], [20, 10, 30], [20, 30, 10], [30, 10, 20], [30, 20, 10]]], [[[0, -5, 5]], [[0, -5, 5], [0, 5, -5], [-5, 0, 5], [-5, 5, 0], [5, 0, -5], [5, -5, 0]]], [[[1, 2, 3, 4]], [[1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2], [1, 4, 2, 3], [1, 4, 3, 2], [2, 1, 3, 4], [2, 1, 4, 3], [2, 3, 1, 4], [2, 3, 4, 1], [2, 4, 1, 3], [2, 4, 3, 1], [3, 1, 2, 4], [3, 1, 4, 2], [3, 2, 1, 4], [3, 2, 4, 1], [3, 4, 1, 2], [3, 4, 2, 1], [4, 1, 2, 3], [4, 1, 3, 2], [4, 2, 1, 3], [4, 2, 3, 1], [4, 3, 1, 2], [4, 3, 2, 1]]]],
    ref: function (nums) {
      const out = [], cur = [], used = nums.map(() => false);
      const go = () => {
        if (cur.length === nums.length) { out.push(cur.slice()); return; }
        for (let i = 0; i < nums.length; i++) if (!used[i]) { used[i] = true; cur.push(nums[i]); go(); cur.pop(); used[i] = false; }
      };
      go();
      return out;
    }
  },
  'combination-sum': {
    fn: 'combinationSum', params: ['candidates', 'target'], cmp: 'unordered-deep',
    ask: 'candidates holds different positive numbers, and each may be used any number of times. Return every different combination that adds up to target, in any order.',
    sig: {
      py: 'def combinationSum(candidates: List[int], target: int) -> List[List[int]]:',
      js: 'function combinationSum(candidates, target) {',
      java: 'public List<List<Integer>> combinationSum(int[] candidates, int target) {',
      cpp: 'vector<vector<int>> combinationSum(vector<int>& candidates, int target) {',
      go: 'func combinationSum(candidates []int, target int) [][]int {'
    },
    examples: [[[[3, 4, 5], 8], [[4, 4], [3, 5]]], [[[2], 1], []], [[[1], 3], [[1, 1, 1]]]],
    hidden: [[[[2, 3], 6], [[2, 2, 2], [3, 3]]], [[[5, 10], 15], [[5, 5, 5], [5, 10]]], [[[4, 6, 9], 12], [[4, 4, 4], [6, 6]]], [[[2, 4], 7], []], [[[6, 8, 3], 9], [[3, 3, 3], [3, 6]]], [[[10], 10], [[10]]]],
    ref: function (candidates, target) {
      const out = [], cur = [];
      const go = (start, left) => {
        if (left === 0) { out.push(cur.slice()); return; }
        for (let i = start; i < candidates.length; i++) if (candidates[i] <= left) { cur.push(candidates[i]); go(i, left - candidates[i]); cur.pop(); }
      };
      go(0, target);
      return out;
    }
  },
  'group-anagrams': {
    fn: 'groupAnagrams', params: ['strs'], cmp: 'unordered-deep',
    ask: 'Put the words into groups, where every word in a group uses exactly the same letters. Return the groups; the groups and the words inside them may be in any order.',
    sig: {
      py: 'def groupAnagrams(strs: List[str]) -> List[List[str]]:',
      js: 'function groupAnagrams(strs) {',
      java: 'public List<List<String>> groupAnagrams(String[] strs) {',
      cpp: 'vector<vector<string>> groupAnagrams(vector<string>& strs) {',
      go: 'func groupAnagrams(strs []string) [][]string {'
    },
    examples: [[[['listen', 'silent', 'enlist', 'google', 'gogole', 'cat']], [['listen', 'silent', 'enlist'], ['google', 'gogole'], ['cat']]], [[['']], [['']]], [[['ab', 'ba', 'abc']], [['ab', 'ba'], ['abc']]]],
    hidden: [[[[]], []], [[['x', 'y', 'x']], [['x', 'x'], ['y']]], [[['', '', 'a']], [['', ''], ['a']]], [[['stop', 'pots', 'tops', 'opts', 'post']], [['stop', 'pots', 'tops', 'opts', 'post']]], [[['abc', 'bca', 'cab', 'xyz', 'zyx', 'q']], [['abc', 'bca', 'cab'], ['xyz', 'zyx'], ['q']]], [[['aab', 'aba', 'abb']], [['aab', 'aba'], ['abb']]]],
    ref: function (strs) {
      const m = new Map();
      for (const s of strs) { const k = s.split('').sort().join(''); if (!m.has(k)) m.set(k, []); m.get(k).push(s); }
      return Array.from(m.values());
    }
  },
  'longest-consecutive': {
    fn: 'longestConsecutive', params: ['nums'], cmp: 'exact',
    ask: 'Return the length of the longest run of consecutive whole numbers (like 4, 5, 6, 7) that can be made from the values in nums. Order in nums does not matter. Aim for O(n).',
    sig: {
      py: 'def longestConsecutive(nums: List[int]) -> int:',
      js: 'function longestConsecutive(nums) {',
      java: 'public int longestConsecutive(int[] nums) {',
      cpp: 'int longestConsecutive(vector<int>& nums) {',
      go: 'func longestConsecutive(nums []int) int {'
    },
    examples: [[[[10, 4, 20, 1, 3, 2]], 4], [[[]], 0], [[[5, 5, 6]], 2]],
    hidden: [[[[7]], 1], [[[-3, -1, -2, 0]], 4], [[[1, 3, 5, 7]], 1], [[[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], 7], [[[1000000000, -1000000000]], 1], [[[2, 2, 2, 3, 3, 4]], 3]],
    ref: function (nums) {
      const set = new Set(nums); let best = 0;
      for (const x of set) if (!set.has(x - 1)) { let y = x; while (set.has(y + 1)) y++; best = Math.max(best, y - x + 1); }
      return best;
    }
  },
  'valid-parentheses': {
    fn: 'isValid', params: ['s'], cmp: 'exact',
    ask: 's holds only the brackets ( ) [ ] { }. Return true if every opening bracket is closed by the same kind, in the right order.',
    sig: {
      py: 'def isValid(s: str) -> bool:',
      js: 'function isValid(s) {',
      java: 'public boolean isValid(String s) {',
      cpp: 'bool isValid(string s) {',
      go: 'func isValid(s string) bool {'
    },
    examples: [[['([]{})'], true], [['{[}]'], false], [['(('], false]],
    hidden: [[[''], true], [[']'], false], [['[({})]()'], true], [['(((())))'], true], [['({)}'], false], [['()['], false]],
    ref: function (s) {
      const st = [], pair = { ')': '(', ']': '[', '}': '{' };
      for (const c of s) { if (pair[c]) { if (st.pop() !== pair[c]) return false; } else st.push(c); }
      return st.length === 0;
    }
  },
  'daily-temperatures': {
    fn: 'dailyTemperatures', params: ['temperatures'], cmp: 'exact',
    ask: 'For each day, return how many days you wait until a strictly warmer day. Use 0 if no warmer day comes.',
    sig: {
      py: 'def dailyTemperatures(temperatures: List[int]) -> List[int]:',
      js: 'function dailyTemperatures(temperatures) {',
      java: 'public int[] dailyTemperatures(int[] temperatures) {',
      cpp: 'vector<int> dailyTemperatures(vector<int>& temperatures) {',
      go: 'func dailyTemperatures(temperatures []int) []int {'
    },
    examples: [[[[30, 32, 31, 35]], [1, 2, 1, 0]], [[[50, 40, 30]], [0, 0, 0]], [[[20, 20, 21]], [2, 1, 0]]],
    hidden: [[[[42]], [0]], [[[1, 2, 3, 4]], [1, 1, 1, 0]], [[[70, 60, 65, 62, 75]], [4, 1, 2, 1, 0]], [[[-5, -10, 0]], [2, 1, 0]], [[[90, 90, 90, 91]], [3, 2, 1, 0]], [[[]], []]],
    ref: function (temperatures) {
      const out = temperatures.map(() => 0), st = [];
      temperatures.forEach((t, i) => { while (st.length && temperatures[st[st.length - 1]] < t) { const j = st.pop(); out[j] = i - j; } st.push(i); });
      return out;
    }
  },
  'min-stack': {
    fn: 'MinStack', params: ['ops', 'args'], cmp: 'exact', io: { design: true },
    ask: 'Build a stack class with push(val), pop(), top() and getMin(), each in O(1). pop removes the top and returns nothing. The tests create one MinStack, call ops[i] with args[i] in order, and compare the list of what each call returned (null for nothing).',
    sig: { py: 'class MinStack:', js: 'class MinStack {', java: 'class MinStack {', cpp: 'class MinStack {', go: 'type MinStack struct {' },
    starter: {
      py: 'class MinStack:\n    def __init__(self):\n        pass\n\n    def push(self, val: int) -> None:\n        pass\n\n    def pop(self) -> None:\n        pass\n\n    def top(self) -> int:\n        pass\n\n    def getMin(self) -> int:\n        pass\n',
      js: 'class MinStack {\n  constructor() {\n  }\n  push(val) {\n  }\n  pop() {\n  }\n  top() {\n  }\n  getMin() {\n  }\n}\n',
      java: 'class MinStack {\n    public MinStack() {\n    }\n    public void push(int val) {\n    }\n    public void pop() {\n    }\n    public int top() {\n        return 0;\n    }\n    public int getMin() {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MinStack {\npublic:\n    MinStack() {\n    }\n    void push(int val) {\n    }\n    void pop() {\n    }\n    int top() {\n        return 0;\n    }\n    int getMin() {\n        return 0;\n    }\n};\n',
      go: 'package main\n\ntype MinStack struct {\n}\n\nfunc Constructor() MinStack {\n    return MinStack{}\n}\n\nfunc (s *MinStack) Push(val int) {\n}\n\nfunc (s *MinStack) Pop() {\n}\n\nfunc (s *MinStack) Top() int {\n    return 0\n}\n\nfunc (s *MinStack) GetMin() int {\n    return 0\n}\n'
    },
    examples: [[[['push', 'push', 'getMin', 'push', 'getMin', 'pop', 'getMin', 'top'], [[5], [3], [], [7], [], [], [], []]], [null, null, 3, null, 3, null, 3, 3]], [[['push', 'getMin', 'top'], [[-2], [], []]], [null, -2, -2]], [[['push', 'push', 'pop', 'getMin'], [[1], [0], [], []]], [null, null, null, 1]]],
    hidden: [[[['push', 'push', 'push', 'getMin', 'pop', 'getMin', 'pop', 'getMin'], [[2], [2], [1], [], [], [], [], []]], [null, null, null, 1, null, 2, null, 2]], [[['push', 'push', 'getMin', 'pop', 'getMin'], [[-1], [-1], [], [], []]], [null, null, -1, null, -1]], [[['push', 'top', 'push', 'top', 'getMin'], [[10], [], [20], [], []]], [null, 10, null, 20, 10]], [[['push', 'push', 'push', 'getMin', 'pop', 'pop', 'getMin'], [[3], [1], [2], [], [], [], []]], [null, null, null, 1, null, null, 3]], [[['push', 'getMin'], [[2147483647], []]], [null, 2147483647]], [[['push', 'push', 'pop', 'pop', 'push', 'getMin'], [[4], [1], [], [], [9], []]], [null, null, null, null, null, 9]]],
    ref: class {
      constructor() { this.st = []; }
      push(val) { const m = this.st.length ? Math.min(val, this.st[this.st.length - 1][1]) : val; this.st.push([val, m]); }
      pop() { this.st.pop(); }
      top() { return this.st[this.st.length - 1][0]; }
      getMin() { return this.st[this.st.length - 1][1]; }
    }
  },
  'kth-largest': {
    fn: 'findKthLargest', params: ['nums', 'k'], cmp: 'exact',
    ask: 'Return the k-th largest value in nums, counting repeats (so in [9, 9, 1] the 2nd largest is 9). Try a heap of size k instead of a full sort.',
    sig: {
      py: 'def findKthLargest(nums: List[int], k: int) -> int:',
      js: 'function findKthLargest(nums, k) {',
      java: 'public int findKthLargest(int[] nums, int k) {',
      cpp: 'int findKthLargest(vector<int>& nums, int k) {',
      go: 'func findKthLargest(nums []int, k int) int {'
    },
    examples: [[[[3, 1, 5, 2, 4], 2], 4], [[[7, 7, 7], 2], 7], [[[-1], 1], -1]],
    hidden: [[[[9, 3, 9, 1], 1], 9], [[[9, 3, 9, 1], 2], 9], [[[9, 3, 9, 1], 4], 1], [[[5, -2, 0, 8, -7, 3], 3], 3], [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7], 4]],
    ref: function (nums, k) { return nums.slice().sort((a, b) => b - a)[k - 1]; }
  },
  'top-k-frequent': {
    fn: 'topKFrequent', params: ['nums', 'k'], cmp: 'unordered',
    ask: 'Return the k values that appear most often in nums, in any order. The answer is always unique.',
    sig: {
      py: 'def topKFrequent(nums: List[int], k: int) -> List[int]:',
      js: 'function topKFrequent(nums, k) {',
      java: 'public int[] topKFrequent(int[] nums, int k) {',
      cpp: 'vector<int> topKFrequent(vector<int>& nums, int k) {',
      go: 'func topKFrequent(nums []int, k int) []int {'
    },
    examples: [[[[4, 4, 4, 6, 6, 9], 2], [4, 6]], [[[8], 1], [8]], [[[1, 2, 2, 3, 3, 3], 1], [3]]],
    hidden: [[[[5, 5, -1, -1, -1, 2], 2], [-1, 5]], [[[0, 0, 0, 1, 2, 3, 4], 1], [0]], [[[7, 8, 9], 3], [7, 8, 9]], [[[1, 1, 2, 2, 2, 3, 3, 3, 3, 4], 3], [3, 2, 1]], [[[-4, -4, -4, -4, 10, 10, 10], 2], [-4, 10]]],
    ref: function (nums, k) {
      const c = new Map(); for (const x of nums) c.set(x, (c.get(x) || 0) + 1);
      return Array.from(c.keys()).sort((a, b) => c.get(b) - c.get(a)).slice(0, k);
    }
  },
  'sliding-window-max': {
    fn: 'maxSlidingWindow', params: ['nums', 'k'], cmp: 'exact',
    ask: 'A window of size k slides over nums one step at a time. Return the largest value in the window at each position, left to right.',
    sig: {
      py: 'def maxSlidingWindow(nums: List[int], k: int) -> List[int]:',
      js: 'function maxSlidingWindow(nums, k) {',
      java: 'public int[] maxSlidingWindow(int[] nums, int k) {',
      cpp: 'vector<int> maxSlidingWindow(vector<int>& nums, int k) {',
      go: 'func maxSlidingWindow(nums []int, k int) []int {'
    },
    examples: [[[[2, 1, 5, 3, 4], 3], [5, 5, 5]], [[[4, 2], 1], [4, 2]], [[[9, 8, 7, 6], 2], [9, 8, 7]]],
    hidden: [[[[1], 1], [1]], [[[1, 3, 1, 2, 0, 5], 3], [3, 3, 2, 5]], [[[-7, -8, -6, -9], 2], [-7, -6, -6]], [[[5, 5, 5, 5], 4], [5]], [[[1, 2, 3, 4, 5, 6], 2], [2, 3, 4, 5, 6]], [[[10, -10, 10, -10, 10], 3], [10, 10, 10]]],
    ref: function (nums, k) {
      const dq = [], out = [];
      for (let i = 0; i < nums.length; i++) {
        while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
        dq.push(i);
        if (dq[0] <= i - k) dq.shift();
        if (i >= k - 1) out.push(nums[dq[0]]);
      }
      return out;
    }
  },
  'reverse-linked-list': {
    fn: 'reverseList', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' },
    ask: 'Turn the linked list around so the last node comes first, and return the new head.',
    sig: {
      py: 'def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function reverseList(head) {',
      java: 'public ListNode reverseList(ListNode head) {',
      cpp: 'ListNode* reverseList(ListNode* head) {',
      go: 'func reverseList(head *ListNode) *ListNode {'
    },
    examples: [[[[7, 8, 9]], [9, 8, 7]], [[[1, 2]], [2, 1]], [[[]], []]],
    hidden: [[[[5]], [5]], [[[1, 2, 3, 4, 5, 6]], [6, 5, 4, 3, 2, 1]], [[[-1, 0, -1]], [-1, 0, -1]], [[[3, 3, 4]], [4, 3, 3]], [[[100, 200]], [200, 100]]],
    ref: function (head) {
      let prev = null, cur = head;
      while (cur) { const nx = cur.next; cur.next = prev; prev = cur; cur = nx; }
      return prev;
    }
  },
  'linked-list-cycle': {
    fn: 'hasCycle', params: ['head'], cmp: 'exact', io: { args: ['cycle'] },
    ask: 'Return true if following next pointers from head ever comes back to a node already visited. In the tests, head is written as [values, pos]: the last node points back to the node at index pos, or nowhere when pos is -1. Your function only receives the head node.',
    sig: {
      py: 'def hasCycle(head: Optional[ListNode]) -> bool:',
      js: 'function hasCycle(head) {',
      java: 'public boolean hasCycle(ListNode head) {',
      cpp: 'bool hasCycle(ListNode *head) {',
      go: 'func hasCycle(head *ListNode) bool {'
    },
    examples: [[[[[4, 8, 1, 6], 1]], true], [[[[1, 2], -1]], false], [[[[9], 0]], true]],
    hidden: [[[[[], -1]], false], [[[[5], -1]], false], [[[[1, 2, 3, 4, 5], 4]], true], [[[[1, 2, 3, 4, 5], 0]], true], [[[[2, 2, 2], -1]], false], [[[[0, 1], 1]], true]],
    ref: function (head) {
      let slow = head, fast = head;
      while (fast && fast.next) { slow = slow.next; fast = fast.next.next; if (slow === fast) return true; }
      return false;
    }
  },
  'middle-of-list': {
    fn: 'middleNode', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' },
    ask: 'Return the middle node of the linked list. With an even number of nodes, return the second of the two middle nodes. The tests read the list from the node you return.',
    sig: {
      py: 'def middleNode(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function middleNode(head) {',
      java: 'public ListNode middleNode(ListNode head) {',
      cpp: 'ListNode* middleNode(ListNode* head) {',
      go: 'func middleNode(head *ListNode) *ListNode {'
    },
    examples: [[[[10, 20, 30]], [20, 30]], [[[1, 2, 3, 4]], [3, 4]], [[[6]], [6]]],
    hidden: [[[[1, 2]], [2]], [[[5, 4, 3, 2, 1, 0]], [2, 1, 0]], [[[9, 8, 7, 6, 5]], [7, 6, 5]], [[[1, 1, 1, 1]], [1, 1]], [[[-3, -2, -1]], [-2, -1]]],
    ref: function (head) {
      let slow = head, fast = head;
      while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
      return slow;
    }
  },
  'merge-two-lists': {
    fn: 'mergeTwoLists', params: ['list1', 'list2'], cmp: 'exact', io: { args: ['list', 'list'], ret: 'list' },
    ask: 'Both linked lists are sorted from small to large. Join their nodes into one sorted list and return its head.',
    sig: {
      py: 'def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function mergeTwoLists(list1, list2) {',
      java: 'public ListNode mergeTwoLists(ListNode list1, ListNode list2) {',
      cpp: 'ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {',
      go: 'func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {'
    },
    examples: [[[[1, 3, 5], [2, 4]], [1, 2, 3, 4, 5]], [[[], [0]], [0]], [[[2, 2], [1, 2]], [1, 2, 2, 2]]],
    hidden: [[[[], []], []], [[[5], []], [5]], [[[1, 2, 3], [4, 5, 6]], [1, 2, 3, 4, 5, 6]], [[[-3, 0, 7], [-5, 0, 8]], [-5, -3, 0, 0, 7, 8]], [[[1, 1, 1], [1]], [1, 1, 1, 1]]],
    ref: function (list1, list2) {
      const dummy = { next: null }; let t = dummy, a = list1, b = list2;
      while (a && b) { if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; } t = t.next; }
      t.next = a || b;
      return dummy.next;
    }
  },
  'remove-nth': {
    fn: 'removeNthFromEnd', params: ['head', 'n'], cmp: 'exact', io: { args: ['list', null], ret: 'list' },
    ask: 'Remove the n-th node counting from the end of the linked list (n = 1 is the last node) and return the head. n is never longer than the list.',
    sig: {
      py: 'def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:',
      js: 'function removeNthFromEnd(head, n) {',
      java: 'public ListNode removeNthFromEnd(ListNode head, int n) {',
      cpp: 'ListNode* removeNthFromEnd(ListNode* head, int n) {',
      go: 'func removeNthFromEnd(head *ListNode, n int) *ListNode {'
    },
    examples: [[[[10, 20, 30, 40], 2], [10, 20, 40]], [[[1], 1], []], [[[1, 2], 1], [1]]],
    hidden: [[[[1, 2], 2], [2]], [[[1, 2, 3, 4, 5], 5], [2, 3, 4, 5]], [[[1, 2, 3, 4, 5], 1], [1, 2, 3, 4]], [[[7, 7, 7], 2], [7, 7]], [[[4, 5, 6], 3], [5, 6]]],
    ref: function (head, n) {
      const dummy = { next: head }; let lead = dummy, trail = dummy;
      for (let i = 0; i < n; i++) lead = lead.next;
      while (lead.next) { lead = lead.next; trail = trail.next; }
      trail.next = trail.next.next;
      return dummy.next;
    }
  },
  'merge-k-lists': {
    fn: 'mergeKLists', params: ['lists'], cmp: 'exact', io: { args: ['lists'], ret: 'list' },
    ask: 'lists holds k linked lists, each sorted from small to large. Merge them all into one sorted list and return its head.',
    sig: {
      py: 'def mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:',
      js: 'function mergeKLists(lists) {',
      java: 'public ListNode mergeKLists(ListNode[] lists) {',
      cpp: 'ListNode* mergeKLists(vector<ListNode*>& lists) {',
      go: 'func mergeKLists(lists []*ListNode) *ListNode {'
    },
    examples: [[[[[1, 5, 9], [2, 3], [4, 10]]], [1, 2, 3, 4, 5, 9, 10]], [[[]], []], [[[[], [3]]], [3]]],
    hidden: [[[[[1]]], [1]], [[[[2, 2], [2], [1, 3]]], [1, 2, 2, 2, 3]], [[[[-10, -5], [-7, 0, 1], []]], [-10, -7, -5, 0, 1]], [[[[5], [4], [3], [2], [1]]], [1, 2, 3, 4, 5]], [[[[]]], []]],
    ref: function (lists) {
      const nodes = [];
      for (const l of lists) for (let n = l; n; n = n.next) nodes.push(n);
      nodes.sort((a, b) => a.val - b.val);
      for (let i = 0; i < nodes.length; i++) nodes[i].next = nodes[i + 1] || null;
      return nodes[0] || null;
    }
  },
  'invert-tree': {
    fn: 'invertTree', params: ['root'], cmp: 'exact', io: { args: ['tree'], ret: 'tree' },
    ask: 'Mirror the binary tree: swap the left and right child of every node. Return the root.',
    sig: {
      py: 'def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:',
      js: 'function invertTree(root) {',
      java: 'public TreeNode invertTree(TreeNode root) {',
      cpp: 'TreeNode* invertTree(TreeNode* root) {',
      go: 'func invertTree(root *TreeNode) *TreeNode {'
    },
    examples: [[[[5, 3, 8, 1, 4]], [5, 8, 3, null, null, 4, 1]], [[[2, 1]], [2, null, 1]], [[[]], []]],
    hidden: [[[[1]], [1]], [[[1, 2, 3, 4, 5, 6, 7]], [1, 3, 2, 7, 6, 5, 4]], [[[1, null, 2, null, 3]], [1, 2, null, 3]], [[[6, 2, null, 1]], [6, null, 2, null, 1]], [[[-1, -2, -3]], [-1, -3, -2]]],
    ref: function (root) {
      const go = (n) => { if (!n) return; const t = n.left; n.left = n.right; n.right = t; go(n.left); go(n.right); };
      go(root);
      return root;
    }
  },
  'max-depth': {
    fn: 'maxDepth', params: ['root'], cmp: 'exact', io: { args: ['tree'] },
    ask: 'Return how many nodes lie on the longest path from the root down to a leaf. An empty tree has depth 0.',
    sig: {
      py: 'def maxDepth(root: Optional[TreeNode]) -> int:',
      js: 'function maxDepth(root) {',
      java: 'public int maxDepth(TreeNode root) {',
      cpp: 'int maxDepth(TreeNode* root) {',
      go: 'func maxDepth(root *TreeNode) int {'
    },
    examples: [[[[8, 4, 12, null, 6]], 3], [[[]], 0], [[[1, null, 2]], 2]],
    hidden: [[[[7]], 1], [[[1, 2, 3, 4, 5, 6, 7]], 3], [[[1, 2, null, 3, null, 4, null, 5]], 5], [[[0, 0, 0, null, 0, null, 0]], 3], [[[-5, -6, null, null, -7]], 3]],
    ref: function (root) {
      const d = (n) => (n ? 1 + Math.max(d(n.left), d(n.right)) : 0);
      return d(root);
    }
  },
  'validate-bst': {
    fn: 'isValidBST', params: ['root'], cmp: 'exact', io: { args: ['tree'] },
    ask: 'Return true if the tree is a binary search tree: every value in a left subtree is strictly smaller than its ancestor, and every value in a right subtree is strictly larger.',
    sig: {
      py: 'def isValidBST(root: Optional[TreeNode]) -> bool:',
      js: 'function isValidBST(root) {',
      java: 'public boolean isValidBST(TreeNode root) {',
      cpp: 'bool isValidBST(TreeNode* root) {',
      go: 'func isValidBST(root *TreeNode) bool {'
    },
    examples: [[[[5, 3, 8]], true], [[[5, 3, 8, 1, 6]], false], [[[1, 1]], false]],
    hidden: [[[[7]], true], [[[10, 5, 15, null, null, 6, 20]], false], [[[2147483647]], true], [[[-2147483648, null, 2147483647]], true], [[[4, 2, 6, 1, 3, 5, 7]], true], [[[3, null, 30, 10, null, null, 15, null, 45]], false], [[[]], true]],
    ref: function (root) {
      const ok = (n, lo, hi) => !n || (n.val > lo && n.val < hi && ok(n.left, lo, n.val) && ok(n.right, n.val, hi));
      return ok(root, -Infinity, Infinity);
    }
  },
  'level-order': {
    fn: 'levelOrder', params: ['root'], cmp: 'exact', io: { args: ['tree'] },
    ask: 'Return the values of the tree floor by floor, top to bottom, each floor from left to right, as a list of lists.',
    sig: {
      py: 'def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:',
      js: 'function levelOrder(root) {',
      java: 'public List<List<Integer>> levelOrder(TreeNode root) {',
      cpp: 'vector<vector<int>> levelOrder(TreeNode* root) {',
      go: 'func levelOrder(root *TreeNode) [][]int {'
    },
    examples: [[[[1, 2, 3, null, 4]], [[1], [2, 3], [4]]], [[[]], []], [[[9]], [[9]]]],
    hidden: [[[[1, 2, 3, 4, 5, 6, 7]], [[1], [2, 3], [4, 5, 6, 7]]], [[[1, null, 2, null, 3]], [[1], [2], [3]]], [[[0, -1, 1, -2]], [[0], [-1, 1], [-2]]], [[[5, 4, null, 3, null, 2]], [[5], [4], [3], [2]]], [[[10, 20, 30, null, 40, 50]], [[10], [20, 30], [40, 50]]]],
    ref: function (root) {
      const out = []; let row = root ? [root] : [];
      while (row.length) { out.push(row.map((n) => n.val)); const next = []; for (const n of row) { if (n.left) next.push(n.left); if (n.right) next.push(n.right); } row = next; }
      return out;
    }
  },
  'right-side-view': {
    fn: 'rightSideView', params: ['root'], cmp: 'exact', io: { args: ['tree'] },
    ask: 'Stand to the right of the tree. Return the value you see on each floor (the rightmost node), from top to bottom.',
    sig: {
      py: 'def rightSideView(root: Optional[TreeNode]) -> List[int]:',
      js: 'function rightSideView(root) {',
      java: 'public List<Integer> rightSideView(TreeNode root) {',
      cpp: 'vector<int> rightSideView(TreeNode* root) {',
      go: 'func rightSideView(root *TreeNode) []int {'
    },
    examples: [[[[1, 2, 3, 4]], [1, 3, 4]], [[[]], []], [[[6, null, 7]], [6, 7]]],
    hidden: [[[[1]], [1]], [[[1, 2, 3, 4, 5, 6, 7]], [1, 3, 7]], [[[1, 2, null, 3, null, 4]], [1, 2, 3, 4]], [[[3, 9, null, 8, 10]], [3, 9, 10]], [[[-1, -2, -3, -4, null, null, null, -5]], [-1, -3, -4, -5]], [[[2, 3, 4, null, null, 5]], [2, 4, 5]]],
    ref: function (root) {
      const out = []; let row = root ? [root] : [];
      while (row.length) { out.push(row[row.length - 1].val); const next = []; for (const n of row) { if (n.left) next.push(n.left); if (n.right) next.push(n.right); } row = next; }
      return out;
    }
  },
  'number-of-islands': {
    fn: 'numIslands', params: ['grid'], cmp: 'exact',
    ask: 'grid is a map of "1" (land) and "0" (water). Land cells touching up, down, left or right belong to the same island. Return how many islands there are.',
    sig: {
      py: 'def numIslands(grid: List[List[str]]) -> int:',
      js: 'function numIslands(grid) {',
      java: 'public int numIslands(char[][] grid) {',
      cpp: 'int numIslands(vector<vector<char>>& grid) {',
      go: 'func numIslands(grid [][]byte) int {'
    },
    examples: [[[[['1', '1', '0'], ['0', '1', '0'], ['0', '0', '1']]], 2], [[[['0']]], 0], [[[['1', '0', '1', '0', '1']]], 3]],
    hidden: [[[[['1']]], 1], [[[['1', '1'], ['1', '1']]], 1], [[[['1', '0'], ['0', '1']]], 2], [[[['1', '0', '1'], ['0', '1', '0'], ['1', '0', '1']]], 5], [[[['1', '1', '1'], ['1', '0', '1'], ['1', '1', '1']]], 1], [[[['0', '0'], ['0', '0']]], 0]],
    ref: function (grid) {
      const g = grid.map((r) => r.slice()); let n = 0;
      const sink = (i, j) => { if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] !== '1') return; g[i][j] = '0'; sink(i + 1, j); sink(i - 1, j); sink(i, j + 1); sink(i, j - 1); };
      for (let i = 0; i < g.length; i++) for (let j = 0; j < g[i].length; j++) if (g[i][j] === '1') { n++; sink(i, j); }
      return n;
    }
  },
  'rotting-oranges': {
    fn: 'orangesRotting', params: ['grid'], cmp: 'exact',
    ask: 'Each cell is 0 (empty), 1 (fresh orange) or 2 (rotten orange). Every minute, fresh oranges next to a rotten one (up, down, left, right) turn rotten. Return the minutes until no fresh orange is left, or -1 if some never rot.',
    sig: {
      py: 'def orangesRotting(grid: List[List[int]]) -> int:',
      js: 'function orangesRotting(grid) {',
      java: 'public int orangesRotting(int[][] grid) {',
      cpp: 'int orangesRotting(vector<vector<int>>& grid) {',
      go: 'func orangesRotting(grid [][]int) int {'
    },
    examples: [[[[[2, 1, 0], [0, 1, 1]]], 3], [[[[0, 2]]], 0], [[[[1, 0, 2]]], -1]],
    hidden: [[[[[1]]], -1], [[[[2]]], 0], [[[[0]]], 0], [[[[2, 1, 1, 1, 1]]], 4], [[[[2, 1], [1, 2]]], 1], [[[[1, 1, 1], [1, 2, 1], [1, 1, 1]]], 2], [[[[2, 0, 1]]], -1]],
    ref: function (grid) {
      const g = grid.map((r) => r.slice()); let q = [], fresh = 0, mins = 0;
      g.forEach((r, i) => r.forEach((v, j) => { if (v === 2) q.push([i, j]); if (v === 1) fresh++; }));
      while (q.length && fresh) {
        const next = [];
        for (const [i, j] of q) for (const [a, b] of [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]) if (g[a] && g[a][b] === 1) { g[a][b] = 2; fresh--; next.push([a, b]); }
        q = next; mins++;
      }
      return fresh ? -1 : mins;
    }
  },
  'clone-graph': {
    fn: 'cloneGraph', params: ['node'], cmp: 'exact', io: { args: ['graph'], ret: 'graph' },
    ask: 'Return a deep copy of a connected undirected graph: new nodes with the same values and the same neighbours. In the tests the graph is an adjacency list where row i lists the neighbours of the node with value i + 1, and your function receives node 1 (or nothing for an empty graph). Returning an original node fails.',
    sig: {
      py: 'def cloneGraph(node: Optional[Node]) -> Optional[Node]:',
      js: 'function cloneGraph(node) {',
      java: 'public Node cloneGraph(Node node) {',
      cpp: 'Node* cloneGraph(Node* node) {',
      go: 'func cloneGraph(node *Node) *Node {'
    },
    examples: [[[[[2, 3], [1, 3], [1, 2]]], [[2, 3], [1, 3], [1, 2]]], [[[[]]], [[]]], [[[]], []]],
    hidden: [[[[[2], [1]]], [[2], [1]]], [[[[2], [1, 3], [2, 4], [3]]], [[2], [1, 3], [2, 4], [3]]], [[[[2, 3, 4], [1], [1], [1]]], [[2, 3, 4], [1], [1], [1]]], [[[[2, 3], [1, 4], [1, 4], [2, 3, 5], [4]]], [[2, 3], [1, 4], [1, 4], [2, 3, 5], [4]]], [[[[2, 3, 4, 5], [1, 3, 4, 5], [1, 2, 4, 5], [1, 2, 3, 5], [1, 2, 3, 4]]], [[2, 3, 4, 5], [1, 3, 4, 5], [1, 2, 4, 5], [1, 2, 3, 5], [1, 2, 3, 4]]]],
    ref: function (node) {
      const copies = new Map();
      const copy = (n) => {
        if (copies.has(n)) return copies.get(n);
        const c = new n.constructor(n.val, []); copies.set(n, c);
        for (const nb of n.neighbors) c.neighbors.push(copy(nb));
        return c;
      };
      return node ? copy(node) : null;
    }
  },
  'course-schedule': {
    fn: 'canFinish', params: ['numCourses', 'prerequisites'], cmp: 'exact',
    ask: 'Courses are numbered 0 to numCourses - 1. A pair [a, b] means you must take b before a. Return true if you can take every course.',
    sig: {
      py: 'def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:',
      js: 'function canFinish(numCourses, prerequisites) {',
      java: 'public boolean canFinish(int numCourses, int[][] prerequisites) {',
      cpp: 'bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {',
      go: 'func canFinish(numCourses int, prerequisites [][]int) bool {'
    },
    examples: [[[3, [[1, 0], [2, 1]]], true], [[3, [[0, 1], [1, 2], [2, 0]]], false], [[1, []], true]],
    hidden: [[[2, []], true], [[4, [[1, 0], [2, 0], [3, 1], [3, 2]]], true], [[2, [[1, 1]]], false], [[5, [[1, 0], [2, 1], [3, 2], [1, 3]]], false], [[3, [[0, 1], [0, 2], [1, 2]]], true], [[6, [[5, 4], [4, 3], [3, 2], [2, 1], [1, 0]]], true]],
    ref: function (numCourses, prerequisites) {
      const indeg = new Array(numCourses).fill(0), out = Array.from({ length: numCourses }, () => []);
      for (const [a, b] of prerequisites) { out[b].push(a); indeg[a]++; }
      const q = []; indeg.forEach((d, i) => { if (!d) q.push(i); });
      let done = 0;
      while (q.length) { const c = q.pop(); done++; for (const n of out[c]) if (--indeg[n] === 0) q.push(n); }
      return done === numCourses;
    }
  },
  'word-search': {
    fn: 'exist', params: ['board', 'word'], cmp: 'exact',
    ask: 'Return true if word can be traced on the letter board by stepping up, down, left or right, using each cell at most once.',
    sig: {
      py: 'def exist(board: List[List[str]], word: str) -> bool:',
      js: 'function exist(board, word) {',
      java: 'public boolean exist(char[][] board, String word) {',
      cpp: 'bool exist(vector<vector<char>>& board, string word) {',
      go: 'func exist(board [][]byte, word string) bool {'
    },
    examples: [[[[['C', 'A', 'T'], ['X', 'R', 'S'], ['D', 'O', 'G']], 'CAR'], true], [[[['C', 'A', 'T'], ['X', 'R', 'S'], ['D', 'O', 'G']], 'COG'], false], [[[['A']], 'A'], true]],
    hidden: [[[[['A']], 'B'], false], [[[['A', 'A']], 'AAA'], false], [[[['A', 'B'], ['C', 'D']], 'ABDC'], true], [[[['A', 'B'], ['C', 'D']], 'ABCD'], false], [[[['C', 'A', 'T'], ['X', 'R', 'S'], ['D', 'O', 'G']], 'SRAC'], true], [[[['C', 'A', 'T'], ['X', 'R', 'S'], ['D', 'O', 'G']], 'GOD'], true], [[[['C', 'A', 'T'], ['X', 'R', 'S'], ['D', 'O', 'G']], 'XRSTX'], false]],
    ref: function (board, word) {
      const b = board.map((r) => r.slice());
      const go = (i, j, k) => {
        if (k === word.length) return true;
        if (i < 0 || j < 0 || i >= b.length || j >= b[0].length || b[i][j] !== word[k]) return false;
        const c = b[i][j]; b[i][j] = '#';
        const ok = go(i + 1, j, k + 1) || go(i - 1, j, k + 1) || go(i, j + 1, k + 1) || go(i, j - 1, k + 1);
        b[i][j] = c;
        return ok;
      };
      for (let i = 0; i < b.length; i++) for (let j = 0; j < b[0].length; j++) if (go(i, j, 0)) return true;
      return false;
    }
  },
  'climbing-stairs': {
    fn: 'climbStairs', params: ['n'], cmp: 'exact',
    ask: 'A staircase has n steps and you climb 1 or 2 steps at a time. Return how many different ways reach the top.',
    sig: {
      py: 'def climbStairs(n: int) -> int:',
      js: 'function climbStairs(n) {',
      java: 'public int climbStairs(int n) {',
      cpp: 'int climbStairs(int n) {',
      go: 'func climbStairs(n int) int {'
    },
    examples: [[[4], 5], [[1], 1], [[6], 13]],
    hidden: [[[2], 2], [[3], 3], [[10], 89], [[20], 10946], [[45], 1836311903]],
    ref: function (n) { let a = 1, b = 1; for (let i = 1; i < n; i++) [a, b] = [b, a + b]; return b; }
  },
  'house-robber': {
    fn: 'rob', params: ['nums'], cmp: 'exact',
    ask: 'nums[i] is the money in house i along a street. You cannot take from two houses next to each other. Return the most money you can take.',
    sig: {
      py: 'def rob(nums: List[int]) -> int:',
      js: 'function rob(nums) {',
      java: 'public int rob(int[] nums) {',
      cpp: 'int rob(vector<int>& nums) {',
      go: 'func rob(nums []int) int {'
    },
    examples: [[[[3, 1, 4, 1, 5]], 12], [[[2, 9, 2]], 9], [[[6]], 6]],
    hidden: [[[[]], 0], [[[5, 5]], 5], [[[4, 1, 1, 4]], 8], [[[10, 1, 1, 10, 1]], 20], [[[0, 0, 0]], 0], [[[6, 7, 1, 30, 8, 2, 4]], 41]],
    ref: function (nums) { let take = 0, skip = 0; for (const x of nums) [take, skip] = [skip + x, Math.max(take, skip)]; return Math.max(take, skip); }
  },
  'max-subarray': {
    fn: 'maxSubArray', params: ['nums'], cmp: 'exact',
    ask: 'Return the largest sum of any unbroken stretch of nums. The stretch holds at least one number.',
    sig: {
      py: 'def maxSubArray(nums: List[int]) -> int:',
      js: 'function maxSubArray(nums) {',
      java: 'public int maxSubArray(int[] nums) {',
      cpp: 'int maxSubArray(vector<int>& nums) {',
      go: 'func maxSubArray(nums []int) int {'
    },
    examples: [[[[-1, 3, -2, 4, -5]], 5], [[[-4, -2, -7]], -2], [[[8]], 8]],
    hidden: [[[[1, 2, 3]], 6], [[[5, -10, 5]], 5], [[[-1, -1, 2, -1, 2, -10]], 3], [[[0, 0]], 0], [[[10000, -1, 10000]], 19999], [[[-3]], -3]],
    ref: function (nums) { let best = -Infinity, cur = 0; for (const x of nums) { cur = Math.max(x, cur + x); best = Math.max(best, cur); } return best; }
  },
  'coin-change': {
    fn: 'coinChange', params: ['coins', 'amount'], cmp: 'exact',
    ask: 'You have unlimited coins of each value in coins. Return the fewest coins that add up to amount, or -1 if it cannot be done.',
    sig: {
      py: 'def coinChange(coins: List[int], amount: int) -> int:',
      js: 'function coinChange(coins, amount) {',
      java: 'public int coinChange(int[] coins, int amount) {',
      cpp: 'int coinChange(vector<int>& coins, int amount) {',
      go: 'func coinChange(coins []int, amount int) int {'
    },
    examples: [[[[1, 4, 5], 8], 2], [[[3], 2], -1], [[[2], 0], 0]],
    hidden: [[[[1], 7], 7], [[[2, 5, 10], 27], 4], [[[5, 7], 1], -1], [[[1, 3, 4], 6], 2], [[[9, 6, 5, 1], 11], 2], [[[7], 21], 3], [[[2, 4], 7], -1]],
    ref: function (coins, amount) {
      const dp = new Array(amount + 1).fill(Infinity); dp[0] = 0;
      for (let a = 1; a <= amount; a++) for (const c of coins) if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
      return dp[amount] === Infinity ? -1 : dp[amount];
    }
  },
  lis: {
    fn: 'lengthOfLIS', params: ['nums'], cmp: 'exact',
    ask: 'Return the length of the longest strictly increasing subsequence of nums (values in order, gaps allowed).',
    sig: {
      py: 'def lengthOfLIS(nums: List[int]) -> int:',
      js: 'function lengthOfLIS(nums) {',
      java: 'public int lengthOfLIS(int[] nums) {',
      cpp: 'int lengthOfLIS(vector<int>& nums) {',
      go: 'func lengthOfLIS(nums []int) int {'
    },
    examples: [[[[3, 1, 4, 1, 5, 9, 2, 6]], 4], [[[5, 4, 3]], 1], [[[2, 2, 2]], 1]],
    hidden: [[[[]], 0], [[[7]], 1], [[[1, 2, 3, 4, 5]], 5], [[[0, 8, 4, 12, 2, 10, 6, 14, 1, 9]], 4], [[[-2, -1, -3, 0]], 3], [[[4, 10, 4, 3, 8, 9]], 3]],
    ref: function (nums) {
      const tails = [];
      for (const x of nums) { let lo = 0, hi = tails.length; while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; } tails[lo] = x; }
      return tails.length;
    }
  },
  'word-break': {
    fn: 'wordBreak', params: ['s', 'wordDict'], cmp: 'exact',
    ask: 'Return true if s can be cut into pieces that are all words from wordDict. A word may be used more than once.',
    sig: {
      py: 'def wordBreak(s: str, wordDict: List[str]) -> bool:',
      js: 'function wordBreak(s, wordDict) {',
      java: 'public boolean wordBreak(String s, List<String> wordDict) {',
      cpp: 'bool wordBreak(string s, vector<string>& wordDict) {',
      go: 'func wordBreak(s string, wordDict []string) bool {'
    },
    examples: [[['icecream', ['ice', 'cream']], true], [['hello', ['hell', 'lo']], false], [['dogsled', ['dog', 'dogs', 'led', 'sled']], true]],
    hidden: [[['a', ['a']], true], [['ab', ['a']], false], [['aaaaaaa', ['aaa', 'aaaa']], true], [['carsandcats', ['car', 'cars', 'and', 'sand', 'cat', 'cats']], true], [['abcd', ['a', 'abc', 'b', 'cd']], true], [['aaaab', ['a', 'aa', 'aaa']], false]],
    ref: function (s, wordDict) {
      const words = new Set(wordDict), ok = [true];
      for (let i = 1; i <= s.length; i++) { ok[i] = false; for (let j = 0; j < i; j++) if (ok[j] && words.has(s.slice(j, i))) { ok[i] = true; break; } }
      return ok[s.length];
    }
  },
  'unique-paths': {
    fn: 'uniquePaths', params: ['m', 'n'], cmp: 'exact',
    ask: 'A robot starts at the top-left of an m by n grid and may only move right or down. Return how many different paths reach the bottom-right corner.',
    sig: {
      py: 'def uniquePaths(m: int, n: int) -> int:',
      js: 'function uniquePaths(m, n) {',
      java: 'public int uniquePaths(int m, int n) {',
      cpp: 'int uniquePaths(int m, int n) {',
      go: 'func uniquePaths(m int, n int) int {'
    },
    examples: [[[2, 3], 3], [[1, 1], 1], [[4, 4], 20]],
    hidden: [[[1, 10], 1], [[10, 1], 1], [[3, 3], 6], [[5, 5], 70], [[10, 10], 48620], [[16, 16], 155117520]],
    ref: function (m, n) { const row = new Array(n).fill(1); for (let i = 1; i < m; i++) for (let j = 1; j < n; j++) row[j] += row[j - 1]; return row[n - 1]; }
  },
  'reverse-string': {
    fn: 'reverseString', params: ['s'], cmp: 'exact', io: { inplace: 0 }, meta: ['Reverse String', 344, 'Easy', 'Two Pointers'],
    ask: 's is a list of single characters. Reverse it by changing s itself and return nothing; the tests read s afterwards.',
    sig: {
      py: 'def reverseString(s: List[str]) -> None:',
      js: 'function reverseString(s) {',
      java: 'public void reverseString(char[] s) {',
      cpp: 'void reverseString(vector<char>& s) {',
      go: 'func reverseString(s []byte) {'
    },
    examples: [[[['h', 'o', 'p']], ['p', 'o', 'h']], [[['a', 'b']], ['b', 'a']], [[['x', 'y', 'y']], ['y', 'y', 'x']]],
    hidden: [[[[]], []], [[['z']], ['z']], [[['A', 'b', 'C', 'd']], ['d', 'C', 'b', 'A']], [[['1', ' ', '2']], ['2', ' ', '1']], [[['r', 'a', 'c', 'e', 'c', 'a', 'r']], ['r', 'a', 'c', 'e', 'c', 'a', 'r']]],
    ref: function (s) { for (let l = 0, r = s.length - 1; l < r; l++, r--) { const t = s[l]; s[l] = s[r]; s[r] = t; } }
  },
  'squares-of-a-sorted-array': {
    fn: 'sortedSquares', params: ['nums'], cmp: 'exact', meta: ['Squares of a Sorted Array', 977, 'Easy', 'Two Pointers'],
    ask: 'nums is sorted from small to large and may hold negatives. Return the square of every number, also sorted from small to large.',
    sig: {
      py: 'def sortedSquares(nums: List[int]) -> List[int]:',
      js: 'function sortedSquares(nums) {',
      java: 'public int[] sortedSquares(int[] nums) {',
      cpp: 'vector<int> sortedSquares(vector<int>& nums) {',
      go: 'func sortedSquares(nums []int) []int {'
    },
    examples: [[[[-3, -1, 0, 2]], [0, 1, 4, 9]], [[[1, 2, 3]], [1, 4, 9]], [[[-5, -4]], [16, 25]]],
    hidden: [[[[]], []], [[[0]], [0]], [[[-2, -2, 2, 2]], [4, 4, 4, 4]], [[[-7, -3, 2, 3, 11]], [4, 9, 9, 49, 121]], [[[-10000, 10000]], [100000000, 100000000]]],
    ref: function (nums) {
      const out = new Array(nums.length); let l = 0, r = nums.length - 1;
      for (let k = nums.length - 1; k >= 0; k--) { if (Math.abs(nums[l]) > Math.abs(nums[r])) { out[k] = nums[l] * nums[l]; l++; } else { out[k] = nums[r] * nums[r]; r--; } }
      return out;
    }
  },
  'merge-sorted-array': {
    fn: 'merge', params: ['nums1', 'm', 'nums2', 'n'], cmp: 'exact', io: { inplace: 0 }, meta: ['Merge Sorted Array', 88, 'Easy', 'Two Pointers'],
    ask: 'nums1 holds m sorted numbers followed by n spare zeros; nums2 holds n sorted numbers. Merge nums2 into nums1 so nums1 is fully sorted. Change nums1 itself and return nothing.',
    sig: {
      py: 'def merge(nums1: List[int], m: int, nums2: List[int], n: int) -> None:',
      js: 'function merge(nums1, m, nums2, n) {',
      java: 'public void merge(int[] nums1, int m, int[] nums2, int n) {',
      cpp: 'void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {',
      go: 'func merge(nums1 []int, m int, nums2 []int, n int) {'
    },
    examples: [[[[1, 4, 7, 0, 0], 3, [2, 5], 2], [1, 2, 4, 5, 7]], [[[0], 0, [3], 1], [3]], [[[5], 1, [], 0], [5]]],
    hidden: [[[[2, 2, 0, 0], 2, [1, 2], 2], [1, 2, 2, 2]], [[[-1, 0, 0, 0], 1, [-3, -2, 5], 3], [-3, -2, -1, 5]], [[[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3], [1, 2, 3, 4, 5, 6]], [[[1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3], [1, 2, 3, 4, 5, 6]], [[[0, 0], 0, [7, 8], 2], [7, 8]]],
    ref: function (nums1, m, nums2, n) {
      let i = m - 1, j = n - 1, k = m + n - 1;
      while (j >= 0) nums1[k--] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
    }
  },
  'sort-colors': {
    fn: 'sortColors', params: ['nums'], cmp: 'exact', io: { inplace: 0 }, meta: ['Sort Colors', 75, 'Medium', 'Two Pointers'],
    ask: 'nums holds only 0, 1 and 2. Sort it in one pass without a library sort, changing nums itself and returning nothing.',
    sig: {
      py: 'def sortColors(nums: List[int]) -> None:',
      js: 'function sortColors(nums) {',
      java: 'public void sortColors(int[] nums) {',
      cpp: 'void sortColors(vector<int>& nums) {',
      go: 'func sortColors(nums []int) {'
    },
    examples: [[[[2, 0, 1, 0]], [0, 0, 1, 2]], [[[2, 1]], [1, 2]], [[[1, 0]], [0, 1]]],
    hidden: [[[[]], []], [[[2, 2, 2]], [2, 2, 2]], [[[1, 0, 2, 1, 0, 2]], [0, 0, 1, 1, 2, 2]], [[[2, 1, 0]], [0, 1, 2]], [[[0, 1, 2, 0, 1, 2, 0]], [0, 0, 0, 1, 1, 2, 2]]],
    ref: function (nums) {
      let lo = 0, mid = 0, hi = nums.length - 1;
      const sw = (a, b) => { const t = nums[a]; nums[a] = nums[b]; nums[b] = t; };
      while (mid <= hi) { if (nums[mid] === 0) sw(lo++, mid++); else if (nums[mid] === 2) sw(mid, hi--); else mid++; }
    }
  },
  'is-subsequence': {
    fn: 'isSubsequence', params: ['s', 't'], cmp: 'exact', meta: ['Is Subsequence', 392, 'Easy', 'Two Pointers'],
    ask: 'Return true if the letters of s appear in t in the same order (other letters may sit between them).',
    sig: {
      py: 'def isSubsequence(s: str, t: str) -> bool:',
      js: 'function isSubsequence(s, t) {',
      java: 'public boolean isSubsequence(String s, String t) {',
      cpp: 'bool isSubsequence(string s, string t) {',
      go: 'func isSubsequence(s string, t string) bool {'
    },
    examples: [[['ace', 'abcde'], true], [['aec', 'abcde'], false], [['', 'xyz'], true]],
    hidden: [[['a', ''], false], [['', ''], true], [['aaa', 'aa'], false], [['bb', 'abab'], true], [['xyz', 'xaybzc'], true], [['abc', 'cba'], false]],
    ref: function (s, t) { let i = 0; for (const c of t) if (c === s[i]) i++; return i === s.length; }
  },
  'permutation-in-string': {
    fn: 'checkInclusion', params: ['s1', 's2'], cmp: 'exact', meta: ['Permutation in String', 567, 'Medium', 'Sliding Window'],
    ask: 'Return true if some stretch of s2 uses exactly the letters of s1, each the same number of times, in any order.',
    sig: {
      py: 'def checkInclusion(s1: str, s2: str) -> bool:',
      js: 'function checkInclusion(s1, s2) {',
      java: 'public boolean checkInclusion(String s1, String s2) {',
      cpp: 'bool checkInclusion(string s1, string s2) {',
      go: 'func checkInclusion(s1 string, s2 string) bool {'
    },
    examples: [[['ab', 'xbay'], true], [['ab', 'axyb'], false], [['abc', 'cab'], true]],
    hidden: [[['a', 'a'], true], [['abc', 'ab'], false], [['aab', 'abab'], true], [['hello', 'ooolleoooleh'], false], [['xyz', 'zzzyx'], true]],
    ref: function (s1, s2) {
      const k = s1.length, need = s1.split('').sort().join('');
      for (let i = 0; i + k <= s2.length; i++) if (s2.slice(i, i + k).split('').sort().join('') === need) return true;
      return false;
    }
  },
  'minimum-size-subarray-sum': {
    fn: 'minSubArrayLen', params: ['target', 'nums'], cmp: 'exact', meta: ['Minimum Size Subarray Sum', 209, 'Medium', 'Sliding Window'],
    ask: 'nums holds positive numbers. Return the length of the shortest unbroken stretch whose sum is at least target, or 0 if none is.',
    sig: {
      py: 'def minSubArrayLen(target: int, nums: List[int]) -> int:',
      js: 'function minSubArrayLen(target, nums) {',
      java: 'public int minSubArrayLen(int target, int[] nums) {',
      cpp: 'int minSubArrayLen(int target, vector<int>& nums) {',
      go: 'func minSubArrayLen(target int, nums []int) int {'
    },
    examples: [[[8, [3, 1, 4, 4, 2]], 2], [[100, [1, 2, 3]], 0], [[5, [5]], 1]],
    hidden: [[[3, [1, 1, 1]], 3], [[1, []], 0], [[10, [2, 3, 1, 2, 4, 3]], 4], [[6, [6, 1, 6]], 1], [[15, [1, 2, 3, 4, 5]], 5], [[11, [1, 10, 1]], 2]],
    ref: function (target, nums) {
      let l = 0, sum = 0, best = Infinity;
      for (let r = 0; r < nums.length; r++) { sum += nums[r]; while (sum >= target) { best = Math.min(best, r - l + 1); sum -= nums[l++]; } }
      return best === Infinity ? 0 : best;
    }
  },
  'find-all-anagrams-in-a-string': {
    fn: 'findAnagrams', params: ['s', 'p'], cmp: 'exact', meta: ['Find All Anagrams in a String', 438, 'Medium', 'Sliding Window'],
    ask: 'Return, from smallest to largest, every start index in s where a stretch uses exactly the letters of p in some order.',
    sig: {
      py: 'def findAnagrams(s: str, p: str) -> List[int]:',
      js: 'function findAnagrams(s, p) {',
      java: 'public List<Integer> findAnagrams(String s, String p) {',
      cpp: 'vector<int> findAnagrams(string s, string p) {',
      go: 'func findAnagrams(s string, p string) []int {'
    },
    examples: [[['cbaxabc', 'abc'], [0, 4]], [['aaaa', 'aa'], [0, 1, 2]], [['ab', 'abc'], []]],
    hidden: [[['a', 'a'], [0]], [['xyz', 'a'], []], [['abab', 'ab'], [0, 1, 2]], [['baab', 'ab'], [0, 2]], [['listensilent', 'enlist'], [0, 3, 6]]],
    ref: function (s, p) {
      const k = p.length, need = p.split('').sort().join(''), out = [];
      for (let i = 0; i + k <= s.length; i++) if (s.slice(i, i + k).split('').sort().join('') === need) out.push(i);
      return out;
    }
  },
  'ransom-note': {
    fn: 'canConstruct', params: ['ransomNote', 'magazine'], cmp: 'exact', meta: ['Ransom Note', 383, 'Easy', 'Hash Map'],
    ask: 'Return true if ransomNote can be built from the letters of magazine, using each magazine letter at most once.',
    sig: {
      py: 'def canConstruct(ransomNote: str, magazine: str) -> bool:',
      js: 'function canConstruct(ransomNote, magazine) {',
      java: 'public boolean canConstruct(String ransomNote, String magazine) {',
      cpp: 'bool canConstruct(string ransomNote, string magazine) {',
      go: 'func canConstruct(ransomNote string, magazine string) bool {'
    },
    examples: [[['hat', 'that'], true], [['zoo', 'zo'], false], [['', 'abc'], true]],
    hidden: [[['a', ''], false], [['aab', 'baa'], true], [['abc', 'aabbc'], true], [['bbb', 'abab'], false], [['note', 'tone'], true], [['x', 'y'], false]],
    ref: function (ransomNote, magazine) {
      const c = {}; for (const ch of magazine) c[ch] = (c[ch] || 0) + 1;
      for (const ch of ransomNote) { if (!c[ch]) return false; c[ch]--; }
      return true;
    }
  },
  'isomorphic-strings': {
    fn: 'isIsomorphic', params: ['s', 't'], cmp: 'exact', meta: ['Isomorphic Strings', 205, 'Easy', 'Hash Map'],
    ask: 's and t have the same length. Return true if you can swap each letter of s for a letter of t, the same swap every time and no two letters onto one, to turn s into t.',
    sig: {
      py: 'def isIsomorphic(s: str, t: str) -> bool:',
      js: 'function isIsomorphic(s, t) {',
      java: 'public boolean isIsomorphic(String s, String t) {',
      cpp: 'bool isIsomorphic(string s, string t) {',
      go: 'func isIsomorphic(s string, t string) bool {'
    },
    examples: [[['abb', 'cdd'], true], [['abc', 'xxy'], false], [['ab', 'ca'], true]],
    hidden: [[['', ''], true], [['a', 'a'], true], [['ab', 'aa'], false], [['badc', 'baba'], false], [['13', '42'], true], [['abab', 'cdcd'], true]],
    ref: function (s, t) {
      const a = new Map(), b = new Map();
      for (let i = 0; i < s.length; i++) {
        if ((a.has(s[i]) && a.get(s[i]) !== t[i]) || (b.has(t[i]) && b.get(t[i]) !== s[i])) return false;
        a.set(s[i], t[i]); b.set(t[i], s[i]);
      }
      return true;
    }
  },
  'lru-cache': {
    fn: 'LRUCache', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['LRU Cache', 146, 'Medium', 'Hash Map'],
    ask: 'Build a cache that holds at most capacity keys. get(key) returns the value or -1. put(key, value) adds or updates a key; when the cache is over capacity it drops the key used least recently. Both in O(1). The first op creates the cache with its capacity; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class LRUCache:', js: 'class LRUCache {', java: 'class LRUCache {', cpp: 'class LRUCache {', go: 'type LRUCache struct {' },
    starter: {
      py: 'class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n',
      js: 'class LRUCache {\n  constructor(capacity) {\n  }\n  get(key) {\n  }\n  put(key, value) {\n  }\n}\n',
      java: 'class LRUCache {\n    public LRUCache(int capacity) {\n    }\n    public int get(int key) {\n        return -1;\n    }\n    public void put(int key, int value) {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass LRUCache {\npublic:\n    LRUCache(int capacity) {\n    }\n    int get(int key) {\n        return -1;\n    }\n    void put(int key, int value) {\n    }\n};\n',
      go: 'package main\n\ntype LRUCache struct {\n}\n\nfunc Constructor(capacity int) LRUCache {\n    return LRUCache{}\n}\n\nfunc (c *LRUCache) Get(key int) int {\n    return -1\n}\n\nfunc (c *LRUCache) Put(key int, value int) {\n}\n'
    },
    examples: [[[['LRUCache', 'put', 'put', 'get', 'put', 'get', 'get'], [[2], [1, 10], [2, 20], [1], [3, 30], [2], [3]]], [null, null, null, 10, null, -1, 30]], [[['LRUCache', 'put', 'get', 'put', 'get', 'get'], [[1], [5, 50], [5], [6, 60], [5], [6]]], [null, null, 50, null, -1, 60]], [[['LRUCache', 'get'], [[3], [9]]], [null, -1]]],
    hidden: [[[['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get'], [[2], [1, 1], [2, 2], [1, 100], [3, 3], [1], [2]]], [null, null, null, null, null, 100, -1]], [[['LRUCache', 'put', 'put', 'put', 'get', 'put', 'get', 'get', 'get'], [[3], [1, 1], [2, 2], [3, 3], [1], [4, 4], [2], [1], [4]]], [null, null, null, null, 1, null, -1, 1, 4]], [[['LRUCache', 'put', 'put', 'get', 'get'], [[2], [7, 0], [7, 5], [7], [8]]], [null, null, null, 5, -1]], [[['LRUCache', 'put', 'put', 'put', 'get', 'get'], [[1], [1, 1], [2, 2], [3, 3], [2], [3]]], [null, null, null, null, -1, 3]], [[['LRUCache', 'put', 'get', 'put', 'get', 'put', 'get', 'get'], [[2], [1, 5], [1], [2, 6], [2], [3, 7], [1], [3]]], [null, null, 5, null, 6, null, -1, 7]]],
    ref: class {
      constructor(capacity) { this.cap = capacity; this.m = new Map(); }
      get(key) { if (!this.m.has(key)) return -1; const v = this.m.get(key); this.m.delete(key); this.m.set(key, v); return v; }
      put(key, value) { this.m.delete(key); this.m.set(key, value); if (this.m.size > this.cap) this.m.delete(this.m.keys().next().value); }
    }
  },
  'find-pivot-index': {
    fn: 'pivotIndex', params: ['nums'], cmp: 'exact', meta: ['Find Pivot Index', 724, 'Easy', 'Prefix Sum'],
    ask: 'Return the leftmost index where the sum of everything to its left equals the sum of everything to its right (an empty side sums to 0), or -1 if there is none.',
    sig: {
      py: 'def pivotIndex(nums: List[int]) -> int:',
      js: 'function pivotIndex(nums) {',
      java: 'public int pivotIndex(int[] nums) {',
      cpp: 'int pivotIndex(vector<int>& nums) {',
      go: 'func pivotIndex(nums []int) int {'
    },
    examples: [[[[1, 2, 6, 3]], 2], [[[1, 2, 3]], -1], [[[7]], 0]],
    hidden: [[[[0, 0, 0]], 0], [[[2, -1, 1]], 0], [[[-1, -1, -1, -1, -1, 0]], 2], [[[1, 1]], -1], [[[10, 5, -5, 3, 7]], -1], [[[3, 0, 3]], 1]],
    ref: function (nums) {
      const total = nums.reduce((a, b) => a + b, 0); let left = 0;
      for (let i = 0; i < nums.length; i++) { if (left === total - left - nums[i]) return i; left += nums[i]; }
      return -1;
    }
  },
  'search-insert-position': {
    fn: 'searchInsert', params: ['nums', 'target'], cmp: 'exact', meta: ['Search Insert Position', 35, 'Easy', 'Binary Search'],
    ask: 'nums is sorted with no repeats. Return the index of target, or the index where it would go to keep nums sorted. Aim for O(log n).',
    sig: {
      py: 'def searchInsert(nums: List[int], target: int) -> int:',
      js: 'function searchInsert(nums, target) {',
      java: 'public int searchInsert(int[] nums, int target) {',
      cpp: 'int searchInsert(vector<int>& nums, int target) {',
      go: 'func searchInsert(nums []int, target int) int {'
    },
    examples: [[[[2, 4, 6, 8], 6], 2], [[[2, 4, 6, 8], 5], 2], [[[2, 4, 6, 8], 9], 4]],
    hidden: [[[[1], 0], 0], [[[1], 2], 1], [[[-5, -2, 0], -3], 1], [[[10, 20, 30, 40, 50], 10], 0], [[[3, 5], 4], 1], [[[1, 3, 5, 7, 9, 11], 12], 6]],
    ref: function (nums, target) { let lo = 0, hi = nums.length; while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] < target) lo = m + 1; else hi = m; } return lo; }
  },
  'koko-eating-bananas': {
    fn: 'minEatingSpeed', params: ['piles', 'h'], cmp: 'exact', meta: ['Koko Eating Bananas', 875, 'Medium', 'Binary Search'],
    ask: 'Each hour Koko eats up to k bananas from one pile (if the pile has fewer, she finishes it and waits). Return the smallest whole k that finishes every pile within h hours. h is at least the number of piles.',
    sig: {
      py: 'def minEatingSpeed(piles: List[int], h: int) -> int:',
      js: 'function minEatingSpeed(piles, h) {',
      java: 'public int minEatingSpeed(int[] piles, int h) {',
      cpp: 'int minEatingSpeed(vector<int>& piles, int h) {',
      go: 'func minEatingSpeed(piles []int, h int) int {'
    },
    examples: [[[[4, 9, 6], 5], 5], [[[10], 2], 5], [[[1, 1, 1], 3], 1]],
    hidden: [[[[5, 5, 5, 5], 4], 5], [[[5, 5, 5, 5], 8], 3], [[[1000000000], 2], 500000000], [[[2, 7], 9], 1], [[[12, 7, 3], 5], 6], [[[1, 2, 3, 4, 5], 5], 5]],
    ref: function (piles, h) {
      let lo = 1, hi = Math.max(...piles);
      while (lo < hi) { const k = Math.floor((lo + hi) / 2); let t = 0; for (const p of piles) t += Math.ceil(p / k); if (t <= h) hi = k; else lo = k + 1; }
      return lo;
    }
  },
  'search-a-2d-matrix': {
    fn: 'searchMatrix', params: ['matrix', 'target'], cmp: 'exact', meta: ['Search a 2D Matrix', 74, 'Medium', 'Binary Search'],
    ask: 'Each row of matrix is sorted, and each row starts above the last value of the row before it. Return true if target is in matrix, in O(log(rows × columns)).',
    sig: {
      py: 'def searchMatrix(matrix: List[List[int]], target: int) -> bool:',
      js: 'function searchMatrix(matrix, target) {',
      java: 'public boolean searchMatrix(int[][] matrix, int target) {',
      cpp: 'bool searchMatrix(vector<vector<int>>& matrix, int target) {',
      go: 'func searchMatrix(matrix [][]int, target int) bool {'
    },
    examples: [[[[[1, 4, 6], [8, 10, 13]], 10], true], [[[[1, 4, 6], [8, 10, 13]], 7], false], [[[[5]], 5], true]],
    hidden: [[[[[5]], 1], false], [[[[1, 2, 3, 4]], 4], true], [[[[1], [3], [5]], 3], true], [[[[-10, -5], [0, 5], [10, 15]], 12], false], [[[[2, 4], [6, 8]], 2], true], [[[[2, 4], [6, 8]], 9], false]],
    ref: function (matrix, target) {
      const w = matrix[0].length; let lo = 0, hi = matrix.length * w - 1;
      while (lo <= hi) { const m = (lo + hi) >> 1, v = matrix[Math.floor(m / w)][m % w]; if (v === target) return true; if (v < target) lo = m + 1; else hi = m - 1; }
      return false;
    }
  },
  'spiral-matrix': {
    fn: 'spiralOrder', params: ['matrix'], cmp: 'exact', meta: ['Spiral Matrix', 54, 'Medium', 'Matrix'],
    ask: 'Return every value of matrix in spiral order: along the top row, down the right side, back along the bottom, up the left side, then inward.',
    sig: {
      py: 'def spiralOrder(matrix: List[List[int]]) -> List[int]:',
      js: 'function spiralOrder(matrix) {',
      java: 'public List<Integer> spiralOrder(int[][] matrix) {',
      cpp: 'vector<int> spiralOrder(vector<vector<int>>& matrix) {',
      go: 'func spiralOrder(matrix [][]int) []int {'
    },
    examples: [[[[[1, 2], [3, 4]]], [1, 2, 4, 3]], [[[[1, 2, 3]]], [1, 2, 3]], [[[[1], [2], [3]]], [1, 2, 3]]],
    hidden: [[[[[7]]], [7]], [[[[9, 8, 7], [6, 5, 4], [3, 2, 1]]], [9, 8, 7, 4, 1, 2, 3, 6, 5]], [[[[1, 2, 3, 4], [5, 6, 7, 8]]], [1, 2, 3, 4, 8, 7, 6, 5]], [[[[1, 2], [3, 4], [5, 6]]], [1, 2, 4, 6, 5, 3]], [[[[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]], [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4, 5, 6, 10, 9]], [[[[-1, -2], [-3, -4]]], [-1, -2, -4, -3]]],
    ref: function (matrix) {
      const out = []; let top = 0, bot = matrix.length - 1, left = 0, right = matrix[0].length - 1;
      while (top <= bot && left <= right) {
        for (let j = left; j <= right; j++) out.push(matrix[top][j]);
        for (let i = top + 1; i <= bot; i++) out.push(matrix[i][right]);
        if (top < bot) for (let j = right - 1; j >= left; j--) out.push(matrix[bot][j]);
        if (left < right) for (let i = bot - 1; i > top; i--) out.push(matrix[i][left]);
        top++; bot--; left++; right--;
      }
      return out;
    }
  },
  'set-matrix-zeroes': {
    fn: 'setZeroes', params: ['matrix'], cmp: 'exact', io: { inplace: 0 }, meta: ['Set Matrix Zeroes', 73, 'Medium', 'Matrix'],
    ask: 'Wherever matrix has a 0, set that whole row and that whole column to 0. Change matrix itself and return nothing.',
    sig: {
      py: 'def setZeroes(matrix: List[List[int]]) -> None:',
      js: 'function setZeroes(matrix) {',
      java: 'public void setZeroes(int[][] matrix) {',
      cpp: 'void setZeroes(vector<vector<int>>& matrix) {',
      go: 'func setZeroes(matrix [][]int) {'
    },
    examples: [[[[[1, 2], [0, 3]]], [[0, 2], [0, 0]]], [[[[1, 0, 1], [1, 1, 1]]], [[0, 0, 0], [1, 0, 1]]], [[[[5, 0], [0, 5]]], [[0, 0], [0, 0]]]],
    hidden: [[[[[1]]], [[1]]], [[[[1, 2, 3], [4, 5, 6]]], [[1, 2, 3], [4, 5, 6]]], [[[[1, 2, 3, 4], [5, 0, 7, 8], [9, 10, 11, 0]]], [[1, 0, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0]]], [[[[0, 0], [1, 1]]], [[0, 0], [0, 0]]], [[[[1], [0], [2]]], [[0], [0], [0]]], [[[[-1, 2, 0]]], [[0, 0, 0]]]],
    ref: function (matrix) {
      const rows = new Set(), cols = new Set();
      matrix.forEach((r, i) => r.forEach((v, j) => { if (v === 0) { rows.add(i); cols.add(j); } }));
      matrix.forEach((r, i) => r.forEach((v, j) => { if (rows.has(i) || cols.has(j)) r[j] = 0; }));
    }
  },
  'non-overlapping-intervals': {
    fn: 'eraseOverlapIntervals', params: ['intervals'], cmp: 'exact', meta: ['Non-overlapping Intervals', 435, 'Medium', 'Intervals'],
    ask: 'Return the fewest intervals to remove so that the rest do not overlap. Intervals that only touch at an end, like [1, 2] and [2, 3], do not overlap.',
    sig: {
      py: 'def eraseOverlapIntervals(intervals: List[List[int]]) -> int:',
      js: 'function eraseOverlapIntervals(intervals) {',
      java: 'public int eraseOverlapIntervals(int[][] intervals) {',
      cpp: 'int eraseOverlapIntervals(vector<vector<int>>& intervals) {',
      go: 'func eraseOverlapIntervals(intervals [][]int) int {'
    },
    examples: [[[[[1, 3], [2, 4], [3, 5]]], 1], [[[[0, 5], [0, 5]]], 1], [[[[1, 2], [2, 3], [0, 4]]], 1]],
    hidden: [[[[[5, 6]]], 0], [[[]], 0], [[[[1, 100], [2, 3], [4, 5], [6, 7]]], 1], [[[[1, 4], [2, 5], [3, 6], [4, 7]]], 2], [[[[-3, -1], [-2, 0], [0, 2]]], 1], [[[[0, 1], [0, 1], [0, 1], [1, 2]]], 2]],
    ref: function (intervals) {
      const a = intervals.slice().sort((x, y) => x[1] - y[1]); let end = -Infinity, keep = 0;
      for (const [s, e] of a) if (s >= end) { keep++; end = e; }
      return a.length - keep;
    }
  },
  'jump-game-ii': {
    fn: 'jump', params: ['nums'], cmp: 'exact', meta: ['Jump Game II', 45, 'Medium', 'Greedy'],
    ask: 'You start on the first stone and nums[i] is the longest jump from stone i. The last stone can always be reached. Return the fewest jumps to get there.',
    sig: {
      py: 'def jump(nums: List[int]) -> int:',
      js: 'function jump(nums) {',
      java: 'public int jump(int[] nums) {',
      cpp: 'int jump(vector<int>& nums) {',
      go: 'func jump(nums []int) int {'
    },
    examples: [[[[2, 1, 3, 1, 1]], 2], [[[0]], 0], [[[1, 1, 1]], 2]],
    hidden: [[[[5, 1, 1, 1, 1]], 1], [[[1, 2]], 1], [[[1, 2, 1, 1, 1]], 3], [[[2, 3, 0, 1, 4]], 2], [[[1, 1, 1, 1, 1, 1]], 5], [[[4, 1, 1, 3, 1, 1, 1]], 2]],
    ref: function (nums) {
      let jumps = 0, end = 0, far = 0;
      for (let i = 0; i < nums.length - 1; i++) { far = Math.max(far, i + nums[i]); if (i === end) { jumps++; end = far; } }
      return jumps;
    }
  },
  'gas-station': {
    fn: 'canCompleteCircuit', params: ['gas', 'cost'], cmp: 'exact', meta: ['Gas Station', 134, 'Medium', 'Greedy'],
    ask: 'Stations sit on a loop. At station i you fill up gas[i], and driving to the next station uses cost[i]. Starting with an empty tank, return the station from which you can drive all the way round, or -1. When a start exists it is the only one.',
    sig: {
      py: 'def canCompleteCircuit(gas: List[int], cost: List[int]) -> int:',
      js: 'function canCompleteCircuit(gas, cost) {',
      java: 'public int canCompleteCircuit(int[] gas, int[] cost) {',
      cpp: 'int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {',
      go: 'func canCompleteCircuit(gas []int, cost []int) int {'
    },
    examples: [[[[1, 4, 2], [3, 1, 2]], 1], [[[2, 2], [3, 2]], -1], [[[5], [4]], 0]],
    hidden: [[[[4], [5]], -1], [[[0, 0, 5], [1, 1, 1]], 2], [[[3, 3, 4], [3, 4, 4]], -1], [[[6, 1, 1, 1], [2, 2, 2, 2]], 0], [[[2, 0, 0, 3], [1, 1, 1, 1]], 3], [[[0, 0, 0, 9], [2, 2, 2, 2]], 3]],
    ref: function (gas, cost) {
      let total = 0, tank = 0, start = 0;
      for (let i = 0; i < gas.length; i++) { total += gas[i] - cost[i]; tank += gas[i] - cost[i]; if (tank < 0) { start = i + 1; tank = 0; } }
      return total < 0 ? -1 : start;
    }
  },
  'partition-labels': {
    fn: 'partitionLabels', params: ['s'], cmp: 'exact', meta: ['Partition Labels', 763, 'Medium', 'Greedy'],
    ask: 'Cut s into as many pieces as possible so that each letter appears in only one piece. Return the piece lengths, left to right.',
    sig: {
      py: 'def partitionLabels(s: str) -> List[int]:',
      js: 'function partitionLabels(s) {',
      java: 'public List<Integer> partitionLabels(String s) {',
      cpp: 'vector<int> partitionLabels(string s) {',
      go: 'func partitionLabels(s string) []int {'
    },
    examples: [[['abacdd'], [3, 1, 2]], [['zzz'], [3]], [['abc'], [1, 1, 1]]],
    hidden: [[['a'], [1]], [['abca'], [4]], [['abcdabefgfh'], [6, 1, 3, 1]], [['xyxzz'], [3, 2]], [['aabbccaa'], [8]]],
    ref: function (s) {
      const last = {}; for (let i = 0; i < s.length; i++) last[s[i]] = i;
      const out = []; let start = 0, end = 0;
      for (let i = 0; i < s.length; i++) { end = Math.max(end, last[s[i]]); if (i === end) { out.push(end - start + 1); start = i + 1; } }
      return out;
    }
  },
  'evaluate-reverse-polish-notation': {
    fn: 'evalRPN', params: ['tokens'], cmp: 'exact', meta: ['Evaluate Reverse Polish Notation', 150, 'Medium', 'Stack'],
    ask: 'tokens is a sum written in postfix: each operator (+, -, *, /) applies to the two values before it. Division drops the fraction toward zero. Return the result.',
    sig: {
      py: 'def evalRPN(tokens: List[str]) -> int:',
      js: 'function evalRPN(tokens) {',
      java: 'public int evalRPN(String[] tokens) {',
      cpp: 'int evalRPN(vector<string>& tokens) {',
      go: 'func evalRPN(tokens []string) int {'
    },
    examples: [[[['3', '4', '+', '2', '*']], 14], [[['7', '2', '/']], 3], [[['-7', '2', '/']], -3]],
    hidden: [[[['42']], 42], [[['1', '2', '-']], -1], [[['6', '-3', '*', '2', '+']], -16], [[['10', '3', '-', '4', '/']], 1], [[['2', '3', '4', '*', '+', '5', '-']], 9], [[['-1', '3', '/']], 0]],
    ref: function (tokens) {
      const st = [];
      for (const t of tokens) {
        if (!['+', '-', '*', '/'].includes(t)) { st.push(Number(t)); continue; }
        const b = st.pop(), a = st.pop();
        st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : Math.trunc(a / b) + 0);
      }
      return st[0];
    }
  },
  'largest-rectangle-in-histogram': {
    fn: 'largestRectangleArea', params: ['heights'], cmp: 'exact', meta: ['Largest Rectangle in Histogram', 84, 'Hard', 'Stack'],
    ask: 'heights are bars of width 1 standing side by side. Return the area of the largest rectangle that fits inside the bars.',
    sig: {
      py: 'def largestRectangleArea(heights: List[int]) -> int:',
      js: 'function largestRectangleArea(heights) {',
      java: 'public int largestRectangleArea(int[] heights) {',
      cpp: 'int largestRectangleArea(vector<int>& heights) {',
      go: 'func largestRectangleArea(heights []int) int {'
    },
    examples: [[[[2, 4, 3]], 6], [[[5]], 5], [[[1, 1, 1, 1]], 4]],
    hidden: [[[[0]], 0], [[[6, 2, 5, 4, 5, 1, 6]], 12], [[[3, 6, 5, 7, 4, 8, 1, 0]], 20], [[[2, 1, 2]], 3], [[[4, 4, 4, 1]], 12], [[[1, 2, 3, 4, 5]], 9]],
    ref: function (heights) {
      const st = []; let best = 0;
      for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        while (st.length && heights[st[st.length - 1]] >= h) { const top = heights[st.pop()]; const left = st.length ? st[st.length - 1] + 1 : 0; best = Math.max(best, top * (i - left)); }
        st.push(i);
      }
      return best;
    }
  },
  'last-stone-weight': {
    fn: 'lastStoneWeight', params: ['stones'], cmp: 'exact', meta: ['Last Stone Weight', 1046, 'Easy', 'Heap'],
    ask: 'Each turn, smash the two heaviest stones together. Equal stones both break; otherwise the lighter breaks and the heavier keeps the difference. Return the weight of the last stone left, or 0 if none is.',
    sig: {
      py: 'def lastStoneWeight(stones: List[int]) -> int:',
      js: 'function lastStoneWeight(stones) {',
      java: 'public int lastStoneWeight(int[] stones) {',
      cpp: 'int lastStoneWeight(vector<int>& stones) {',
      go: 'func lastStoneWeight(stones []int) int {'
    },
    examples: [[[[3, 7, 2]], 2], [[[5, 5]], 0], [[[9]], 9]],
    hidden: [[[[1, 1, 1]], 1], [[[10, 4, 4]], 2], [[[6, 4]], 2], [[[2, 2, 2, 2]], 0], [[[8, 3, 3, 1]], 1], [[[20, 1]], 19]],
    ref: function (stones) {
      const a = stones.slice();
      while (a.length > 1) { a.sort((x, y) => y - x); const x = a.shift(), y = a.shift(); if (x !== y) a.push(x - y); }
      return a.length ? a[0] : 0;
    }
  },
  'k-closest-points-to-origin': {
    fn: 'kClosest', params: ['points', 'k'], cmp: 'unordered', meta: ['K Closest Points to Origin', 973, 'Medium', 'Heap'],
    ask: 'Return the k points closest to (0, 0), measured by straight-line distance, in any order. The answer is always unique.',
    sig: {
      py: 'def kClosest(points: List[List[int]], k: int) -> List[List[int]]:',
      js: 'function kClosest(points, k) {',
      java: 'public int[][] kClosest(int[][] points, int k) {',
      cpp: 'vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {',
      go: 'func kClosest(points [][]int, k int) [][]int {'
    },
    examples: [[[[[1, 2], [3, 3], [-1, 0]], 2], [[-1, 0], [1, 2]]], [[[[5, 5]], 1], [[5, 5]]], [[[[2, 2], [-3, 0], [1, -1]], 1], [[1, -1]]]],
    hidden: [[[[[0, 0], [1, 1], [2, 2]], 2], [[0, 0], [1, 1]]], [[[[-4, -4], [4, 4], [0, 6]], 2], [[-4, -4], [4, 4]]], [[[[3, 4], [0, 5], [1, 1]], 1], [[1, 1]]], [[[[10, 0], [0, -9], [-8, 0], [7, 7]], 3], [[-8, 0], [0, -9], [7, 7]]], [[[[1, 3], [-2, 2]], 2], [[1, 3], [-2, 2]]]],
    ref: function (points, k) { return points.slice().sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k); }
  },
  'palindrome-linked-list': {
    fn: 'isPalindrome', params: ['head'], cmp: 'exact', io: { args: ['list'] }, meta: ['Palindrome Linked List', 234, 'Easy', 'In-place Reversal'],
    ask: 'Return true if the values of the linked list read the same from both ends. Try O(1) extra space by reversing half of it.',
    sig: {
      py: 'def isPalindrome(head: Optional[ListNode]) -> bool:',
      js: 'function isPalindrome(head) {',
      java: 'public boolean isPalindrome(ListNode head) {',
      cpp: 'bool isPalindrome(ListNode* head) {',
      go: 'func isPalindrome(head *ListNode) bool {'
    },
    examples: [[[[4, 5, 4]], true], [[[1, 2]], false], [[[7]], true]],
    hidden: [[[[]], true], [[[1, 1]], true], [[[1, 2, 3, 2, 1]], true], [[[1, 2, 3, 1]], false], [[[-1, -1, 2]], false], [[[9, 8, 8, 9, 9]], false]],
    ref: function (head) { const v = []; for (let n = head; n; n = n.next) v.push(n.val); return v.join(',') === v.slice().reverse().join(','); }
  },
  'reorder-list': {
    fn: 'reorderList', params: ['head'], cmp: 'exact', io: { args: ['list'], inplace: 0 }, meta: ['Reorder List', 143, 'Medium', 'In-place Reversal'],
    ask: 'Relink the list as first, last, second, second-to-last, and so on, by changing next pointers (not values). Return nothing; the tests read the list from head afterwards.',
    sig: {
      py: 'def reorderList(head: Optional[ListNode]) -> None:',
      js: 'function reorderList(head) {',
      java: 'public void reorderList(ListNode head) {',
      cpp: 'void reorderList(ListNode* head) {',
      go: 'func reorderList(head *ListNode) {'
    },
    examples: [[[[10, 20, 30, 40, 50]], [10, 50, 20, 40, 30]], [[[5, 6, 7]], [5, 7, 6]], [[[1, 2, 3, 4, 5, 6]], [1, 6, 2, 5, 3, 4]]],
    hidden: [[[[]], []], [[[1]], [1]], [[[1, 2]], [1, 2]], [[[1, 2, 3, 4]], [1, 4, 2, 3]], [[[9, 9, 1, 1]], [9, 1, 9, 1]], [[[-3, -2, -1, 0, 1, 2, 3]], [-3, 3, -2, 2, -1, 1, 0]]],
    ref: function (head) {
      const nodes = []; for (let n = head; n; n = n.next) nodes.push(n);
      let l = 0, r = nodes.length - 1, prev = null;
      while (l <= r) { const pair = l === r ? [nodes[l]] : [nodes[l], nodes[r]]; for (const n of pair) { if (prev) prev.next = n; prev = n; } l++; r--; }
      if (prev) prev.next = null;
    }
  },
  'happy-number': {
    fn: 'isHappy', params: ['n'], cmp: 'exact', meta: ['Happy Number', 202, 'Easy', 'Fast & Slow Pointers'],
    ask: 'Replace n by the sum of the squares of its digits, again and again. Return true if this reaches 1, and false if it loops forever without reaching 1.',
    sig: {
      py: 'def isHappy(n: int) -> bool:',
      js: 'function isHappy(n) {',
      java: 'public boolean isHappy(int n) {',
      cpp: 'bool isHappy(int n) {',
      go: 'func isHappy(n int) bool {'
    },
    examples: [[[7], true], [[4], false], [[1], true]],
    hidden: [[[2], false], [[10], true], [[100], true], [[23], true], [[11], false], [[1111111], true]],
    ref: function (n) {
      const next = (x) => String(x).split('').reduce((s, d) => s + d * d, 0);
      let slow = n, fast = next(n);
      while (fast !== 1 && slow !== fast) { slow = next(slow); fast = next(next(fast)); }
      return fast === 1;
    }
  },
  'find-the-duplicate-number': {
    fn: 'findDuplicate', params: ['nums'], cmp: 'exact', meta: ['Find the Duplicate Number', 287, 'Medium', 'Fast & Slow Pointers'],
    ask: 'nums has n + 1 values, each between 1 and n, so at least one repeats. Exactly one value repeats (possibly many times). Return it without changing nums and with O(1) extra space.',
    sig: {
      py: 'def findDuplicate(nums: List[int]) -> int:',
      js: 'function findDuplicate(nums) {',
      java: 'public int findDuplicate(int[] nums) {',
      cpp: 'int findDuplicate(vector<int>& nums) {',
      go: 'func findDuplicate(nums []int) int {'
    },
    examples: [[[[1, 4, 2, 3, 4]], 4], [[[2, 2, 2]], 2], [[[1, 1]], 1]],
    hidden: [[[[5, 1, 2, 3, 4, 5]], 5], [[[2, 5, 9, 6, 9, 3, 8, 9, 7, 1]], 9], [[[1, 3, 4, 2, 1]], 1], [[[4, 3, 1, 4, 2]], 4], [[[2, 1, 2]], 2], [[[6, 6, 6, 6, 6, 6, 6]], 6]],
    ref: function (nums) {
      let slow = nums[0], fast = nums[nums[0]];
      while (slow !== fast) { slow = nums[slow]; fast = nums[nums[fast]]; }
      slow = 0; while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
      return slow;
    }
  },
  'same-tree': {
    fn: 'isSameTree', params: ['p', 'q'], cmp: 'exact', io: { args: ['tree', 'tree'] }, meta: ['Same Tree', 100, 'Easy', 'Depth-First Search'],
    ask: 'Return true if the two binary trees have the same shape and the same value in every node.',
    sig: {
      py: 'def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:',
      js: 'function isSameTree(p, q) {',
      java: 'public boolean isSameTree(TreeNode p, TreeNode q) {',
      cpp: 'bool isSameTree(TreeNode* p, TreeNode* q) {',
      go: 'func isSameTree(p *TreeNode, q *TreeNode) bool {'
    },
    examples: [[[[1, 2], [1, 2]], true], [[[1, 2], [1, null, 2]], false], [[[], []], true]],
    hidden: [[[[5], [6]], false], [[[1, 2, 3], [1, 2, 3]], true], [[[1, 2, 3], [1, 3, 2]], false], [[[0, null, -1], [0, null, -1]], true], [[[], [1]], false], [[[4, 2, 6, 1, 3, 5, 7], [4, 2, 6, 1, 3, 5, 8]], false]],
    ref: function (p, q) {
      const same = (a, b) => (!a || !b ? a === b : a.val === b.val && same(a.left, b.left) && same(a.right, b.right));
      return same(p, q);
    }
  },
  'max-area-of-island': {
    fn: 'maxAreaOfIsland', params: ['grid'], cmp: 'exact', meta: ['Max Area of Island', 695, 'Medium', 'Depth-First Search'],
    ask: 'grid is a map of 1 (land) and 0 (water). Land cells touching up, down, left or right form an island. Return the number of cells in the biggest island, or 0 if there is no land.',
    sig: {
      py: 'def maxAreaOfIsland(grid: List[List[int]]) -> int:',
      js: 'function maxAreaOfIsland(grid) {',
      java: 'public int maxAreaOfIsland(int[][] grid) {',
      cpp: 'int maxAreaOfIsland(vector<vector<int>>& grid) {',
      go: 'func maxAreaOfIsland(grid [][]int) int {'
    },
    examples: [[[[[1, 1, 0], [0, 1, 0], [1, 0, 1]]], 3], [[[[0, 0]]], 0], [[[[1]]], 1]],
    hidden: [[[[[1, 1], [1, 1]]], 4], [[[[1, 0, 1, 0, 1]]], 1], [[[[1, 1, 0, 0], [0, 0, 0, 1], [0, 1, 1, 1]]], 4], [[[[0, 1, 0], [1, 1, 1], [0, 1, 0]]], 5], [[[[1, 0], [0, 1]]], 1]],
    ref: function (grid) {
      const g = grid.map((r) => r.slice()); let best = 0;
      const area = (i, j) => { if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] !== 1) return 0; g[i][j] = 0; return 1 + area(i + 1, j) + area(i - 1, j) + area(i, j + 1) + area(i, j - 1); };
      for (let i = 0; i < g.length; i++) for (let j = 0; j < g[i].length; j++) best = Math.max(best, area(i, j));
      return best;
    }
  },
  'course-schedule-ii': {
    fn: 'findOrder', params: ['numCourses', 'prerequisites'], cmp: 'any', meta: ['Course Schedule II', 210, 'Medium', 'Breadth-First Search'],
    ask: 'Courses are numbered 0 to numCourses - 1, and [a, b] means b must come before a. Return any order that takes every course, or an empty list if no order works.',
    sig: {
      py: 'def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:',
      js: 'function findOrder(numCourses, prerequisites) {',
      java: 'public int[] findOrder(int numCourses, int[][] prerequisites) {',
      cpp: 'vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {',
      go: 'func findOrder(numCourses int, prerequisites [][]int) []int {'
    },
    examples: [[[2, [[1, 0]]], [0, 1]], [[3, [[0, 1], [1, 2], [2, 0]]], []], [[1, []], [0]]],
    hidden: [[[3, []], [0, 1, 2]], [[4, [[1, 0], [2, 0], [3, 1], [3, 2]]], [0, 1, 2, 3]], [[2, [[0, 1], [1, 0]]], []], [[5, [[4, 3], [3, 2], [2, 1], [1, 0]]], [0, 1, 2, 3, 4]], [[3, [[0, 2], [1, 2]]], [2, 0, 1]], [[4, [[1, 0], [2, 1], [0, 2], [3, 0]]], []]],
    check: function (args, got, want) {
      const [n, pre] = args;
      if (!Array.isArray(got)) return false;
      if (!want.length) return got.length === 0;
      if (got.length !== n || new Set(got).size !== n || got.some((c) => !(c >= 0 && c < n))) return false;
      const pos = {}; got.forEach((c, i) => { pos[c] = i; });
      return pre.every(([a, b]) => pos[b] < pos[a]);
    },
    ref: function (numCourses, prerequisites) {
      const indeg = new Array(numCourses).fill(0), out = Array.from({ length: numCourses }, () => []);
      for (const [a, b] of prerequisites) { out[b].push(a); indeg[a]++; }
      const q = [], order = []; indeg.forEach((d, i) => { if (!d) q.push(i); });
      while (q.length) { const c = q.shift(); order.push(c); for (const n of out[c]) if (--indeg[n] === 0) q.push(n); }
      return order.length === numCourses ? order : [];
    }
  },
  'letter-combinations-of-a-phone-number': {
    fn: 'letterCombinations', params: ['digits'], cmp: 'unordered', meta: ['Letter Combinations of a Phone Number', 17, 'Medium', 'Backtracking'],
    ask: 'On a phone keypad 2 is abc, 3 def, 4 ghi, 5 jkl, 6 mno, 7 pqrs, 8 tuv and 9 wxyz. Return every letter string the digits could spell, in any order. No digits means an empty list.',
    sig: {
      py: 'def letterCombinations(digits: str) -> List[str]:',
      js: 'function letterCombinations(digits) {',
      java: 'public List<String> letterCombinations(String digits) {',
      cpp: 'vector<string> letterCombinations(string digits) {',
      go: 'func letterCombinations(digits string) []string {'
    },
    examples: [[['2'], ['a', 'b', 'c']], [[''], []], [['79'], ['pw', 'px', 'py', 'pz', 'qw', 'qx', 'qy', 'qz', 'rw', 'rx', 'ry', 'rz', 'sw', 'sx', 'sy', 'sz']]],
    hidden: [[['9'], ['w', 'x', 'y', 'z']], [['7'], ['p', 'q', 'r', 's']], [['22'], ['aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc']], [['34'], ['dg', 'dh', 'di', 'eg', 'eh', 'ei', 'fg', 'fh', 'fi']], [['56'], ['jm', 'jn', 'jo', 'km', 'kn', 'ko', 'lm', 'ln', 'lo']], [['234'], ['adg', 'adh', 'adi', 'aeg', 'aeh', 'aei', 'afg', 'afh', 'afi', 'bdg', 'bdh', 'bdi', 'beg', 'beh', 'bei', 'bfg', 'bfh', 'bfi', 'cdg', 'cdh', 'cdi', 'ceg', 'ceh', 'cei', 'cfg', 'cfh', 'cfi']]],
    ref: function (digits) {
      if (!digits) return [];
      const keys = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };
      let out = [''];
      for (const d of digits) out = out.flatMap((p) => keys[d].split('').map((c) => p + c));
      return out;
    }
  },
  'min-cost-climbing-stairs': {
    fn: 'minCostClimbingStairs', params: ['cost'], cmp: 'exact', meta: ['Min Cost Climbing Stairs', 746, 'Easy', 'Dynamic Programming'],
    ask: 'cost[i] is the price of standing on step i. You may start on step 0 or step 1 and climb 1 or 2 steps at a time. Return the cheapest way to get past the last step.',
    sig: {
      py: 'def minCostClimbingStairs(cost: List[int]) -> int:',
      js: 'function minCostClimbingStairs(cost) {',
      java: 'public int minCostClimbingStairs(int[] cost) {',
      cpp: 'int minCostClimbingStairs(vector<int>& cost) {',
      go: 'func minCostClimbingStairs(cost []int) int {'
    },
    examples: [[[[5, 10, 20]], 10], [[[0, 0]], 0], [[[3, 2, 4, 1]], 3]],
    hidden: [[[[1, 100]], 1], [[[10, 1, 10, 1, 10]], 2], [[[7, 7, 7, 7]], 14], [[[0, 5, 0, 5, 0]], 0], [[[100, 1, 1, 100]], 2]],
    ref: function (cost) { let a = 0, b = 0; for (let i = 2; i <= cost.length; i++) [a, b] = [b, Math.min(b + cost[i - 1], a + cost[i - 2])]; return b; }
  },
  'longest-common-subsequence': {
    fn: 'longestCommonSubsequence', params: ['text1', 'text2'], cmp: 'exact', meta: ['Longest Common Subsequence', 1143, 'Medium', 'Dynamic Programming'],
    ask: 'Return the length of the longest string whose letters appear, in order (gaps allowed), in both text1 and text2.',
    sig: {
      py: 'def longestCommonSubsequence(text1: str, text2: str) -> int:',
      js: 'function longestCommonSubsequence(text1, text2) {',
      java: 'public int longestCommonSubsequence(String text1, String text2) {',
      cpp: 'int longestCommonSubsequence(string text1, string text2) {',
      go: 'func longestCommonSubsequence(text1 string, text2 string) int {'
    },
    examples: [[['kitten', 'sitting'], 4], [['abc', 'xyz'], 0], [['same', 'same'], 4]],
    hidden: [[['a', 'a'], 1], [['', 'abc'], 0], [['abcbdab', 'bdcaba'], 4], [['aaaa', 'aa'], 2], [['xyzabc', 'abcxyz'], 3], [['banana', 'atana'], 4]],
    ref: function (text1, text2) {
      const dp = Array.from({ length: text1.length + 1 }, () => new Array(text2.length + 1).fill(0));
      for (let i = 1; i <= text1.length; i++) for (let j = 1; j <= text2.length; j++) dp[i][j] = text1[i - 1] === text2[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      return dp[text1.length][text2.length];
    }
  },
  'decode-ways': {
    fn: 'numDecodings', params: ['s'], cmp: 'exact', meta: ['Decode Ways', 91, 'Medium', 'Dynamic Programming'],
    ask: 'Letters are coded as numbers: A = 1, B = 2, up to Z = 26. Return how many ways the digit string s can be read back into letters. A piece may not start with 0.',
    sig: {
      py: 'def numDecodings(s: str) -> int:',
      js: 'function numDecodings(s) {',
      java: 'public int numDecodings(String s) {',
      cpp: 'int numDecodings(string s) {',
      go: 'func numDecodings(s string) int {'
    },
    examples: [[['11'], 2], [['27'], 1], [['30'], 0]],
    hidden: [[['1'], 1], [['10'], 1], [['101'], 1], [['1111'], 5], [['123123'], 9], [['100'], 0], [['0'], 0]],
    ref: function (s) {
      let a = 1, b = s[0] === '0' ? 0 : 1;
      for (let i = 1; i < s.length; i++) { const two = Number(s.slice(i - 1, i + 1)); const c = (s[i] !== '0' ? b : 0) + (two >= 10 && two <= 26 ? a : 0); a = b; b = c; }
      return s.length ? b : 0;
    }
  },
  'edit-distance': {
    fn: 'minDistance', params: ['word1', 'word2'], cmp: 'exact', meta: ['Edit Distance', 72, 'Medium', 'Dynamic Programming'],
    ask: 'One step inserts, deletes or replaces a single letter. Return the fewest steps that turn word1 into word2.',
    sig: {
      py: 'def minDistance(word1: str, word2: str) -> int:',
      js: 'function minDistance(word1, word2) {',
      java: 'public int minDistance(String word1, String word2) {',
      cpp: 'int minDistance(string word1, string word2) {',
      go: 'func minDistance(word1 string, word2 string) int {'
    },
    examples: [[['kitten', 'sitting'], 3], [['', 'abc'], 3], [['same', 'same'], 0]],
    hidden: [[['a', ''], 1], [['ab', 'ba'], 2], [['sunday', 'saturday'], 3], [['abc', 'yabd'], 2], [['flaw', 'lawn'], 2], [['aaaa', 'b'], 4]],
    ref: function (word1, word2) {
      let prev = Array.from({ length: word2.length + 1 }, (_, j) => j);
      for (let i = 1; i <= word1.length; i++) {
        const cur = [i];
        for (let j = 1; j <= word2.length; j++) cur[j] = word1[i - 1] === word2[j - 1] ? prev[j - 1] : 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
        prev = cur;
      }
      return prev[word2.length];
    }
  },
  'partition-equal-subset-sum': {
    fn: 'canPartition', params: ['nums'], cmp: 'exact', meta: ['Partition Equal Subset Sum', 416, 'Medium', 'Dynamic Programming'],
    ask: 'nums holds positive numbers. Return true if they can be split into two groups with equal sums.',
    sig: {
      py: 'def canPartition(nums: List[int]) -> bool:',
      js: 'function canPartition(nums) {',
      java: 'public boolean canPartition(int[] nums) {',
      cpp: 'bool canPartition(vector<int>& nums) {',
      go: 'func canPartition(nums []int) bool {'
    },
    examples: [[[[3, 1, 4, 2]], true], [[[1, 2, 5]], false], [[[2, 2]], true]],
    hidden: [[[[1]], false], [[[1, 1, 1, 1]], true], [[[3, 3, 3, 4, 5]], true], [[[2, 4, 8]], false], [[[100, 100, 100, 100, 100, 100, 100, 100]], true], [[[1, 2, 3, 8]], false]],
    ref: function (nums) {
      const total = nums.reduce((a, b) => a + b, 0); if (total % 2) return false;
      const can = new Array(total / 2 + 1).fill(false); can[0] = true;
      for (const x of nums) for (let s = total / 2; s >= x; s--) if (can[s - x]) can[s] = true;
      return can[total / 2];
    }
  },
  'diameter-of-binary-tree': {
    fn: 'diameterOfBinaryTree', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Diameter of Binary Tree', 543, 'Easy', 'Trees'],
    ask: 'Return the number of edges on the longest path between any two nodes of the tree. The path does not have to pass through the root.',
    sig: {
      py: 'def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:',
      js: 'function diameterOfBinaryTree(root) {',
      java: 'public int diameterOfBinaryTree(TreeNode root) {',
      cpp: 'int diameterOfBinaryTree(TreeNode* root) {',
      go: 'func diameterOfBinaryTree(root *TreeNode) int {'
    },
    examples: [[[[3, 1, 4, null, 2]], 3], [[[1]], 0], [[[1, 2]], 1]],
    hidden: [[[[1, 2, 3]], 2], [[[1, 2, null, 3, 4, 5, null, null, 6]], 4], [[[1, null, 2, null, 3, null, 4]], 3], [[[5, 4, 6, 3, null, null, 7]], 4], [[[0, 0, 0, 0, 0, 0, 0]], 4]],
    ref: function (root) {
      let best = 0;
      const h = (n) => { if (!n) return 0; const l = h(n.left), r = h(n.right); best = Math.max(best, l + r); return 1 + Math.max(l, r); };
      h(root);
      return best;
    }
  },
  'balanced-binary-tree': {
    fn: 'isBalanced', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Balanced Binary Tree', 110, 'Easy', 'Trees'],
    ask: 'Return true if, at every node, the heights of the left and right subtrees differ by at most 1.',
    sig: {
      py: 'def isBalanced(root: Optional[TreeNode]) -> bool:',
      js: 'function isBalanced(root) {',
      java: 'public boolean isBalanced(TreeNode root) {',
      cpp: 'bool isBalanced(TreeNode* root) {',
      go: 'func isBalanced(root *TreeNode) bool {'
    },
    examples: [[[[3, 1, 5]], true], [[[1, 2, null, 3]], false], [[[]], true]],
    hidden: [[[[1]], true], [[[1, 2, 3, 4, null, null, null, 5]], false], [[[1, 2, 3, 4, 5, 6, 7]], true], [[[1, 2, 3, null, 4, 5]], true], [[[2, 1]], true], [[[1, null, 2, null, 3]], false]],
    ref: function (root) {
      const h = (n) => { if (!n) return 0; const l = h(n.left), r = h(n.right); if (l < 0 || r < 0 || Math.abs(l - r) > 1) return -1; return 1 + Math.max(l, r); };
      return h(root) >= 0;
    }
  },
  'kth-smallest-element-in-a-bst': {
    fn: 'kthSmallest', params: ['root', 'k'], cmp: 'exact', io: { args: ['tree', null] }, meta: ['Kth Smallest Element in a BST', 230, 'Medium', 'Trees'],
    ask: 'root is a binary search tree. Return its k-th smallest value (k = 1 is the smallest).',
    sig: {
      py: 'def kthSmallest(root: Optional[TreeNode], k: int) -> int:',
      js: 'function kthSmallest(root, k) {',
      java: 'public int kthSmallest(TreeNode root, int k) {',
      cpp: 'int kthSmallest(TreeNode* root, int k) {',
      go: 'func kthSmallest(root *TreeNode, k int) int {'
    },
    examples: [[[[5, 3, 7, 2, 4], 3], 4], [[[1], 1], 1], [[[2, 1, 3], 3], 3]],
    hidden: [[[[8, 4, 12, 2, 6, 10, 14], 1], 2], [[[8, 4, 12, 2, 6, 10, 14], 7], 14], [[[8, 4, 12, 2, 6, 10, 14], 4], 8], [[[3, 1, null, null, 2], 2], 2], [[[-5, -10, 0], 2], -5]],
    ref: function (root, k) {
      const vals = []; const walk = (n) => { if (!n) return; walk(n.left); vals.push(n.val); walk(n.right); };
      walk(root);
      return vals[k - 1];
    }
  },
  'implement-trie-prefix-tree': {
    fn: 'Trie', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['Implement Trie (Prefix Tree)', 208, 'Medium', 'Tries'],
    ask: 'Build a letter tree with insert(word), search(word) (true only for a whole inserted word) and startsWith(prefix) (true if any inserted word begins with prefix). The tests create one Trie and compare what each call returned (null for nothing).',
    sig: { py: 'class Trie:', js: 'class Trie {', java: 'class Trie {', cpp: 'class Trie {', go: 'type Trie struct {' },
    starter: {
      py: 'class Trie:\n    def __init__(self):\n        pass\n\n    def insert(self, word: str) -> None:\n        pass\n\n    def search(self, word: str) -> bool:\n        pass\n\n    def startsWith(self, prefix: str) -> bool:\n        pass\n',
      js: 'class Trie {\n  constructor() {\n  }\n  insert(word) {\n  }\n  search(word) {\n  }\n  startsWith(prefix) {\n  }\n}\n',
      java: 'class Trie {\n    public Trie() {\n    }\n    public void insert(String word) {\n    }\n    public boolean search(String word) {\n        return false;\n    }\n    public boolean startsWith(String prefix) {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Trie {\npublic:\n    Trie() {\n    }\n    void insert(string word) {\n    }\n    bool search(string word) {\n        return false;\n    }\n    bool startsWith(string prefix) {\n        return false;\n    }\n};\n',
      go: 'package main\n\ntype Trie struct {\n}\n\nfunc Constructor() Trie {\n    return Trie{}\n}\n\nfunc (t *Trie) Insert(word string) {\n}\n\nfunc (t *Trie) Search(word string) bool {\n    return false\n}\n\nfunc (t *Trie) StartsWith(prefix string) bool {\n    return false\n}\n'
    },
    examples: [[[['insert', 'search', 'search', 'startsWith'], [['cart'], ['cart'], ['car'], ['car']]], [null, true, false, true]], [[['search'], [['a']]], [false]], [[['insert', 'insert', 'search', 'startsWith', 'startsWith'], [['to'], ['tea'], ['tea'], ['te'], ['tx']]], [null, null, true, true, false]]],
    hidden: [[[['insert', 'search', 'insert', 'search'], [['plum'], ['plu'], ['plu'], ['plu']]], [null, false, null, true]], [[['insert', 'startsWith', 'search'], [['a'], ['a'], ['a']]], [null, true, true]], [[['insert', 'insert', 'search', 'search', 'startsWith'], [['dog'], ['dot'], ['do'], ['dot'], ['dox']]], [null, null, false, true, false]], [[['insert', 'insert', 'search'], [['abc'], ['abc'], ['abc']]], [null, null, true]], [[['insert', 'search', 'startsWith'], [['hello'], ['hell'], ['hello']]], [null, false, true]]],
    ref: class {
      constructor() { this.root = {}; }
      insert(word) { let n = this.root; for (const c of word) n = n[c] = n[c] || {}; n.end = true; }
      find(s) { let n = this.root; for (const c of s) { if (!n[c]) return null; n = n[c]; } return n; }
      search(word) { const n = this.find(word); return !!(n && n.end); }
      startsWith(prefix) { return !!this.find(prefix); }
    }
  },
  'single-number': {
    fn: 'singleNumber', params: ['nums'], cmp: 'exact', meta: ['Single Number', 136, 'Easy', 'Bit Manipulation'],
    ask: 'Every value in nums appears twice except one, which appears once. Return that one, using O(1) extra space.',
    sig: {
      py: 'def singleNumber(nums: List[int]) -> int:',
      js: 'function singleNumber(nums) {',
      java: 'public int singleNumber(int[] nums) {',
      cpp: 'int singleNumber(vector<int>& nums) {',
      go: 'func singleNumber(nums []int) int {'
    },
    examples: [[[[4, 7, 4]], 7], [[[-1]], -1], [[[3, 9, 3, 5, 9]], 5]],
    hidden: [[[[0, 1, 0]], 1], [[[2, 2, 0]], 0], [[[-3, -3, -8]], -8], [[[100000, 7, 100000]], 7], [[[1, 2, 3, 4, 1, 2, 3]], 4]],
    ref: function (nums) { return nums.reduce((a, b) => a ^ b, 0); }
  },
  'missing-number': {
    fn: 'missingNumber', params: ['nums'], cmp: 'exact', meta: ['Missing Number', 268, 'Easy', 'Bit Manipulation'],
    ask: 'nums holds n different numbers from 0 to n, so exactly one number in that range is missing. Return it.',
    sig: {
      py: 'def missingNumber(nums: List[int]) -> int:',
      js: 'function missingNumber(nums) {',
      java: 'public int missingNumber(int[] nums) {',
      cpp: 'int missingNumber(vector<int>& nums) {',
      go: 'func missingNumber(nums []int) int {'
    },
    examples: [[[[0, 1, 3]], 2], [[[1]], 0], [[[2, 0, 1]], 3]],
    hidden: [[[[0]], 1], [[[]], 0], [[[1, 2]], 0], [[[5, 3, 0, 1, 2]], 4], [[[0, 1, 2, 3, 4, 5, 6, 7, 8]], 9], [[[7, 6, 5, 4, 3, 2, 1]], 0]],
    ref: function (nums) { let x = nums.length; nums.forEach((v, i) => { x ^= v ^ i; }); return x; }
  },
  'counting-bits': {
    fn: 'countBits', params: ['n'], cmp: 'exact', meta: ['Counting Bits', 338, 'Easy', 'Bit Manipulation'],
    ask: 'Return a list of n + 1 numbers where position i holds how many 1 bits i has in binary.',
    sig: {
      py: 'def countBits(n: int) -> List[int]:',
      js: 'function countBits(n) {',
      java: 'public int[] countBits(int n) {',
      cpp: 'vector<int> countBits(int n) {',
      go: 'func countBits(n int) []int {'
    },
    examples: [[[3], [0, 1, 1, 2]], [[0], [0]], [[6], [0, 1, 1, 2, 1, 2, 2]]],
    hidden: [[[1], [0, 1]], [[2], [0, 1, 1]], [[8], [0, 1, 1, 2, 1, 2, 2, 3, 1]], [[15], [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]], [[16], [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1]]],
    ref: function (n) { const out = [0]; for (let i = 1; i <= n; i++) out.push(out[i >> 1] + (i & 1)); return out; }
  },
  'palindrome-number': {
    fn: 'isPalindrome', params: ['x'], cmp: 'exact', meta: ['Palindrome Number', 9, 'Easy', 'Math'],
    ask: 'Return true if the whole number x reads the same forwards and backwards. Negative numbers never do. Try it without turning x into a string.',
    sig: {
      py: 'def isPalindrome(x: int) -> bool:',
      js: 'function isPalindrome(x) {',
      java: 'public boolean isPalindrome(int x) {',
      cpp: 'bool isPalindrome(int x) {',
      go: 'func isPalindrome(x int) bool {'
    },
    examples: [[[1221], true], [[-7], false], [[10], false]],
    hidden: [[[0], true], [[7], true], [[12321], true], [[123], false], [[1000021], false], [[2147447412], true]],
    ref: function (x) { if (x < 0) return false; let r = 0, y = x; while (y > 0) { r = r * 10 + (y % 10); y = Math.floor(y / 10); } return r === x; }
  },
  'powx-n': {
    fn: 'myPow', params: ['x', 'n'], cmp: 'float', meta: ['Pow(x, n)', 50, 'Medium', 'Math'],
    ask: 'Return x raised to the whole-number power n (n may be negative) without a library power function. Answers within 0.000001 are accepted. Aim for O(log n) multiplications.',
    sig: {
      py: 'def myPow(x: float, n: int) -> float:',
      js: 'function myPow(x, n) {',
      java: 'public double myPow(double x, int n) {',
      cpp: 'double myPow(double x, int n) {',
      go: 'func myPow(x float64, n int) float64 {'
    },
    examples: [[[2, 5], 32], [[3, -2], 0.1111111111111111], [[1.5, 2], 2.25]],
    hidden: [[[5, 0], 1], [[0, 3], 0], [[-2, 3], -8], [[2, -3], 0.125], [[1.0001, 10000], 2.7181459268249255], [[-1, 2147483647], -1], [[2, 30], 1073741824]],
    ref: function (x, n) {
      let e = Math.abs(n), b = x, r = 1;
      while (e > 0) { if (e % 2) r *= b; b *= b; e = Math.floor(e / 2); }
      return n < 0 ? 1 / r : r;
    }
  },
  // Sheet problems without a story: meta gives the title, LeetCode number, difficulty and sheet group.
  'reverse-vowels-of-a-string': {
    fn: 'reverseVowels', params: ['s'], cmp: 'exact', meta: ['Reverse Vowels of a String', 345, 'Easy', 'Two Pointers'],
    ask: 'Reverse the order of only the vowels in s (a, e, i, o, u in either case). Every other character stays where it is. Return the new string.',
    sig: {
      py: 'def reverseVowels(s: str) -> str:',
      js: 'function reverseVowels(s) {',
      java: 'public String reverseVowels(String s) {',
      cpp: 'string reverseVowels(string s) {',
      go: 'func reverseVowels(s string) string {'
    },
    examples: [[['lantern'], 'lentarn'], [['sky'], 'sky'], [['AbcE'], 'EbcA']],
    hidden: [[['aeiou'], 'uoiea'], [[''], ''], [['Mississippi'], 'Mississippi'], [['xyz'], 'xyz'], [['hello world'], 'hollo werld'], [['UuO'], 'OuU']],
    ref: function (s) {
      const a = s.split(''), V = 'aeiouAEIOU'; let l = 0, r = a.length - 1;
      while (l < r) {
        if (!V.includes(a[l])) l++;
        else if (!V.includes(a[r])) r--;
        else { const t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
      }
      return a.join('');
    }
  },
  'sort-array-by-parity': {
    fn: 'sortArrayByParity', params: ['nums'], cmp: 'any', meta: ['Sort Array By Parity', 905, 'Easy', 'Two Pointers'],
    ask: 'nums holds non-negative integers. Return them with every even number before every odd number. Any order inside the evens and inside the odds is accepted.',
    sig: {
      py: 'def sortArrayByParity(nums: List[int]) -> List[int]:',
      js: 'function sortArrayByParity(nums) {',
      java: 'public int[] sortArrayByParity(int[] nums) {',
      cpp: 'vector<int> sortArrayByParity(vector<int>& nums) {',
      go: 'func sortArrayByParity(nums []int) []int {'
    },
    examples: [[[[3, 8, 5, 2]], [8, 2, 3, 5]], [[[1, 3]], [1, 3]], [[[0]], [0]]],
    hidden: [[[[2, 4, 6]], [2, 4, 6]], [[[7, 7, 6]], [6, 7, 7]], [[[]], []], [[[1, 2, 3, 4, 5, 6]], [2, 4, 6, 1, 3, 5]], [[[11, 10, 0, 9]], [10, 0, 11, 9]]],
    check: function (args, got, want) {
      if (!Array.isArray(got) || got.length !== want.length) return false;
      const key = (a) => a.slice().sort((x, y) => x - y).join(',');
      if (key(got) !== key(want)) return false;
      let seenOdd = false;
      for (const x of got) { if (x % 2) seenOdd = true; else if (seenOdd) return false; }
      return true;
    },
    ref: function (nums) {
      return nums.filter((x) => x % 2 === 0).concat(nums.filter((x) => x % 2 !== 0));
    }
  },
  'merge-strings-alternately': {
    fn: 'mergeAlternately', params: ['word1', 'word2'], cmp: 'exact', meta: ['Merge Strings Alternately', 1768, 'Easy', 'Two Pointers'],
    ask: 'Build a new string by taking one letter from word1, then one from word2, and so on, starting with word1. When one word runs out, add the rest of the other.',
    sig: {
      py: 'def mergeAlternately(word1: str, word2: str) -> str:',
      js: 'function mergeAlternately(word1, word2) {',
      java: 'public String mergeAlternately(String word1, String word2) {',
      cpp: 'string mergeAlternately(string word1, string word2) {',
      go: 'func mergeAlternately(word1 string, word2 string) string {'
    },
    examples: [[['abc', 'xy'], 'axbyc'], [['p', 'qrs'], 'pqrs'], [['ab', 'cd'], 'acbd']],
    hidden: [[['a', 'b'], 'ab'], [['hello', '12'], 'h1e2llo'], [['x', 'yz'], 'xyz'], [['abcd', 'pq'], 'apbqcd'], [['zz', 'zzzz'], 'zzzzzz']],
    ref: function (word1, word2) {
      let out = '';
      for (let i = 0; i < Math.max(word1.length, word2.length); i++) out += (word1[i] || '') + (word2[i] || '');
      return out;
    }
  },
  'valid-palindrome-ii': {
    fn: 'validPalindrome', params: ['s'], cmp: 'exact', meta: ['Valid Palindrome II', 680, 'Easy', 'Two Pointers'],
    ask: 's holds lowercase letters. Return true if s reads the same both ways after deleting at most one character.',
    sig: {
      py: 'def validPalindrome(s: str) -> bool:',
      js: 'function validPalindrome(s) {',
      java: 'public boolean validPalindrome(String s) {',
      cpp: 'bool validPalindrome(string s) {',
      go: 'func validPalindrome(s string) bool {'
    },
    examples: [[['racexcar'], true], [['abcdef'], false], [['level'], true]],
    hidden: [[['a'], true], [['ab'], true], [['abcbxa'], true], [['deeee'], true], [['abccbxa'], true], [['tebbem'], false]],
    ref: function (s) {
      const pal = (l, r) => { while (l < r) { if (s[l] !== s[r]) return false; l++; r--; } return true; };
      let l = 0, r = s.length - 1;
      while (l < r) { if (s[l] !== s[r]) return pal(l + 1, r) || pal(l, r - 1); l++; r--; }
      return true;
    }
  },
  'backspace-string-compare': {
    fn: 'backspaceCompare', params: ['s', 't'], cmp: 'exact', meta: ['Backspace String Compare', 844, 'Easy', 'Two Pointers'],
    ask: 'Both strings are typed into a text box, where # is the backspace key (backspace on an empty box does nothing). Return true if both end up as the same text.',
    sig: {
      py: 'def backspaceCompare(s: str, t: str) -> bool:',
      js: 'function backspaceCompare(s, t) {',
      java: 'public boolean backspaceCompare(String s, String t) {',
      cpp: 'bool backspaceCompare(string s, string t) {',
      go: 'func backspaceCompare(s string, t string) bool {'
    },
    examples: [[['xy#z', 'xz'], true], [['a##b', 'c#d'], false], [['###', ''], true]],
    hidden: [[['ab#c', 'ad#c'], true], [['a#c', 'b'], false], [['bxj##tw', 'bxo#j##tw'], true], [['abc', 'abc#'], false], [['#a#b', 'b'], true]],
    ref: function (s, t) {
      const type = (x) => { const out = []; for (const c of x) { if (c === '#') out.pop(); else out.push(c); } return out.join(''); };
      return type(s) === type(t);
    }
  },
  'boats-to-save-people': {
    fn: 'numRescueBoats', params: ['people', 'limit'], cmp: 'exact', meta: ['Boats to Save People', 881, 'Medium', 'Two Pointers'],
    ask: 'people[i] is a weight, and nobody weighs more than limit. A boat carries at most two people whose weights add up to at most limit. Return the fewest boats that carry everyone.',
    sig: {
      py: 'def numRescueBoats(people: List[int], limit: int) -> int:',
      js: 'function numRescueBoats(people, limit) {',
      java: 'public int numRescueBoats(int[] people, int limit) {',
      cpp: 'int numRescueBoats(vector<int>& people, int limit) {',
      go: 'func numRescueBoats(people []int, limit int) int {'
    },
    examples: [[[[2, 4, 3, 1], 5], 2], [[[5, 5, 5], 5], 3], [[[1, 2], 6], 1]],
    hidden: [[[[4], 4], 1], [[[3, 2, 2, 1], 3], 3], [[[1, 1, 1, 1], 2], 2], [[[6, 1, 5, 2, 4, 3], 7], 3], [[[2, 9, 8, 1], 10], 2]],
    ref: function (people, limit) {
      const p = people.slice().sort((a, b) => a - b); let l = 0, r = p.length - 1, boats = 0;
      while (l <= r) { if (p[l] + p[r] <= limit) l++; r--; boats++; }
      return boats;
    }
  },
  '3sum-closest': {
    fn: 'threeSumClosest', params: ['nums', 'target'], cmp: 'exact', meta: ['3Sum Closest', 16, 'Medium', 'Two Pointers'],
    ask: 'Pick three numbers at different positions in nums so that their sum is as close to target as possible, and return that sum. Each test has exactly one closest sum.',
    sig: {
      py: 'def threeSumClosest(nums: List[int], target: int) -> int:',
      js: 'function threeSumClosest(nums, target) {',
      java: 'public int threeSumClosest(int[] nums, int target) {',
      cpp: 'int threeSumClosest(vector<int>& nums, int target) {',
      go: 'func threeSumClosest(nums []int, target int) int {'
    },
    examples: [[[[2, -1, 4, 0], 3], 3], [[[1, 1, 1], 10], 3], [[[-5, 10, 2, 7], 0], 4]],
    hidden: [[[[0, 0, 0, 0], 1], 0], [[[1, 2, 3, 4, 5], 100], 12], [[[-4, -1, 1, 2], 1], 2], [[[5, -8, 3, 9, -2], -20], -7], [[[1, 6, 9, 14, 16, 70], 81], 80]],
    ref: function (nums, target) {
      const a = nums.slice().sort((x, y) => x - y); let best = a[0] + a[1] + a[2];
      for (let i = 0; i < a.length - 2; i++) {
        let l = i + 1, r = a.length - 1;
        while (l < r) {
          const s = a[i] + a[l] + a[r];
          if (Math.abs(s - target) < Math.abs(best - target)) best = s;
          if (s < target) l++; else if (s > target) r--; else return s;
        }
      }
      return best;
    }
  },
  'next-permutation': {
    fn: 'nextPermutation', params: ['nums'], cmp: 'exact', io: { inplace: 0 }, meta: ['Next Permutation', 31, 'Medium', 'Two Pointers'],
    ask: 'Rearrange nums into the next larger ordering of its numbers, in dictionary order. If it is already the largest, wrap around to the smallest (sorted). Change nums in place and return nothing.',
    sig: {
      py: 'def nextPermutation(nums: List[int]) -> None:',
      js: 'function nextPermutation(nums) {',
      java: 'public void nextPermutation(int[] nums) {',
      cpp: 'void nextPermutation(vector<int>& nums) {',
      go: 'func nextPermutation(nums []int) {'
    },
    examples: [[[[1, 3, 2]], [2, 1, 3]], [[[5, 4, 1]], [1, 4, 5]], [[[2, 2, 7]], [2, 7, 2]]],
    hidden: [[[[1]], [1]], [[[1, 5, 1]], [5, 1, 1]], [[[1, 2, 3, 4]], [1, 2, 4, 3]], [[[4, 3, 5, 2, 1]], [4, 5, 1, 2, 3]], [[[2, 3, 3, 1]], [3, 1, 2, 3]], [[[9, 9]], [9, 9]]],
    ref: function (nums) {
      let i = nums.length - 2;
      while (i >= 0 && nums[i] >= nums[i + 1]) i--;
      if (i >= 0) { let j = nums.length - 1; while (nums[j] <= nums[i]) j--; const t = nums[i]; nums[i] = nums[j]; nums[j] = t; }
      for (let l = i + 1, r = nums.length - 1; l < r; l++, r--) { const t = nums[l]; nums[l] = nums[r]; nums[r] = t; }
    }
  },
  'maximum-average-subarray-i': {
    fn: 'findMaxAverage', params: ['nums', 'k'], cmp: 'float', meta: ['Maximum Average Subarray I', 643, 'Easy', 'Sliding Window'],
    ask: 'Look at every run of exactly k neighbouring numbers in nums. Return the largest average among them.',
    sig: {
      py: 'def findMaxAverage(nums: List[int], k: int) -> float:',
      js: 'function findMaxAverage(nums, k) {',
      java: 'public double findMaxAverage(int[] nums, int k) {',
      cpp: 'double findMaxAverage(vector<int>& nums, int k) {',
      go: 'func findMaxAverage(nums []int, k int) float64 {'
    },
    examples: [[[[4, 0, 6, 2], 2], 4], [[[-3, -1], 1], -1], [[[5], 1], 5]],
    hidden: [[[[1, 2, 3, 4, 5], 5], 3], [[[7, -7, 7, -7], 3], 2.3333333333333335], [[[0, 0, 0], 2], 0], [[[10, 1, 1, 1, 10], 2], 5.5], [[[3, 3, 4], 2], 3.5]],
    ref: function (nums, k) {
      let s = 0; for (let i = 0; i < k; i++) s += nums[i];
      let best = s;
      for (let i = k; i < nums.length; i++) { s += nums[i] - nums[i - k]; best = Math.max(best, s); }
      return best / k;
    }
  },
  'contains-duplicate-ii': {
    fn: 'containsNearbyDuplicate', params: ['nums', 'k'], cmp: 'exact', meta: ['Contains Duplicate II', 219, 'Easy', 'Sliding Window'],
    ask: 'Return true if two different positions i and j hold the same value and are at most k apart (|i - j| <= k).',
    sig: {
      py: 'def containsNearbyDuplicate(nums: List[int], k: int) -> bool:',
      js: 'function containsNearbyDuplicate(nums, k) {',
      java: 'public boolean containsNearbyDuplicate(int[] nums, int k) {',
      cpp: 'bool containsNearbyDuplicate(vector<int>& nums, int k) {',
      go: 'func containsNearbyDuplicate(nums []int, k int) bool {'
    },
    examples: [[[[4, 1, 4], 2], true], [[[4, 1, 4], 1], false], [[[9, 9], 0], false]],
    hidden: [[[[1, 2, 3, 1, 2, 3], 2], false], [[[1, 2, 3, 1, 2, 3], 3], true], [[[5], 5], false], [[[7, 8, 7, 7], 1], true], [[[], 1], false]],
    ref: function (nums, k) {
      const last = new Map();
      for (let i = 0; i < nums.length; i++) { if (last.has(nums[i]) && i - last.get(nums[i]) <= k) return true; last.set(nums[i], i); }
      return false;
    }
  },
  'minimum-difference-between-highest-and-lowest-of-k-scores': {
    fn: 'minimumDifference', params: ['nums', 'k'], cmp: 'exact', meta: ['Minimum Difference Between Highest and Lowest of K Scores', 1984, 'Easy', 'Sliding Window'],
    ask: 'Choose k of the scores in nums. Return the smallest possible gap between the highest and the lowest score you chose.',
    sig: {
      py: 'def minimumDifference(nums: List[int], k: int) -> int:',
      js: 'function minimumDifference(nums, k) {',
      java: 'public int minimumDifference(int[] nums, int k) {',
      cpp: 'int minimumDifference(vector<int>& nums, int k) {',
      go: 'func minimumDifference(nums []int, k int) int {'
    },
    examples: [[[[12, 3, 8, 20], 2], 4], [[[6], 1], 0], [[[1, 100, 50], 3], 99]],
    hidden: [[[[5, 5, 5], 2], 0], [[[9, 4, 1, 7], 3], 5], [[[10, 2, 8, 4], 1], 0], [[[1, 3, 6, 10, 15], 4], 9], [[[40, 10, 30, 20], 2], 10]],
    ref: function (nums, k) {
      const a = nums.slice().sort((x, y) => x - y); let best = Infinity;
      for (let i = 0; i + k - 1 < a.length; i++) best = Math.min(best, a[i + k - 1] - a[i]);
      return best;
    }
  },
  'maximum-number-of-vowels-in-a-substring-of-given-length': {
    fn: 'maxVowels', params: ['s', 'k'], cmp: 'exact', meta: ['Maximum Number of Vowels in a Substring of Given Length', 1456, 'Medium', 'Sliding Window'],
    ask: 's holds lowercase letters. Return the most vowels (a, e, i, o, u) found in any stretch of exactly k letters.',
    sig: {
      py: 'def maxVowels(s: str, k: int) -> int:',
      js: 'function maxVowels(s, k) {',
      java: 'public int maxVowels(String s, int k) {',
      cpp: 'int maxVowels(string s, int k) {',
      go: 'func maxVowels(s string, k int) int {'
    },
    examples: [[['strengthen', 3], 1], [['aeixyz', 2], 2], [['bcd', 2], 0]],
    hidden: [[['aaaa', 4], 4], [['oxoxo', 3], 2], [['quiet', 2], 2], [['rhythm', 1], 0], [['education', 5], 3], [['zzzzue', 3], 2]],
    ref: function (s, k) {
      const v = (c) => 'aeiou'.includes(c) ? 1 : 0; let n = 0, best = 0;
      for (let i = 0; i < s.length; i++) { n += v(s[i]); if (i >= k) n -= v(s[i - k]); best = Math.max(best, n); }
      return best;
    }
  },
  'maximum-points-you-can-obtain-from-cards': {
    fn: 'maxScore', params: ['cardPoints', 'k'], cmp: 'exact', meta: ['Maximum Points You Can Obtain from Cards', 1423, 'Medium', 'Sliding Window'],
    ask: 'Cards lie in a row. Take exactly k cards, each time from the left end or the right end. Return the highest total points you can collect.',
    sig: {
      py: 'def maxScore(cardPoints: List[int], k: int) -> int:',
      js: 'function maxScore(cardPoints, k) {',
      java: 'public int maxScore(int[] cardPoints, int k) {',
      cpp: 'int maxScore(vector<int>& cardPoints, int k) {',
      go: 'func maxScore(cardPoints []int, k int) int {'
    },
    examples: [[[[5, 1, 1, 9], 2], 14], [[[3, 3, 3], 3], 9], [[[1, 8, 2, 7], 1], 7]],
    hidden: [[[[4, 2, 9, 1, 6], 2], 10], [[[1], 1], 1], [[[10, 1, 1, 1, 10], 4], 22], [[[2, 4, 6, 8, 10], 3], 24], [[[7, 3, 5, 1, 1, 9], 3], 19]],
    ref: function (cardPoints, k) {
      const n = cardPoints.length; let s = 0;
      for (let i = 0; i < k; i++) s += cardPoints[i];
      let best = s;
      for (let i = 1; i <= k; i++) { s += cardPoints[n - i] - cardPoints[k - i]; best = Math.max(best, s); }
      return best;
    }
  },
  'subarray-product-less-than-k': {
    fn: 'numSubarrayProductLessThanK', params: ['nums', 'k'], cmp: 'exact', meta: ['Subarray Product Less Than K', 713, 'Medium', 'Sliding Window'],
    ask: 'nums holds positive integers. Count the runs of neighbouring numbers whose product is strictly less than k.',
    sig: {
      py: 'def numSubarrayProductLessThanK(nums: List[int], k: int) -> int:',
      js: 'function numSubarrayProductLessThanK(nums, k) {',
      java: 'public int numSubarrayProductLessThanK(int[] nums, int k) {',
      cpp: 'int numSubarrayProductLessThanK(vector<int>& nums, int k) {',
      go: 'func numSubarrayProductLessThanK(nums []int, k int) int {'
    },
    examples: [[[[2, 3, 4], 10], 4], [[[1, 1, 1], 1], 0], [[[5], 6], 1]],
    hidden: [[[[1, 2, 3], 0], 0], [[[1, 1, 1], 2], 6], [[[10, 2, 2, 5], 50], 9], [[[3, 7, 1], 22], 6], [[[4, 1, 1, 1, 4], 5], 14]],
    ref: function (nums, k) {
      if (k <= 1) return 0;
      let p = 1, l = 0, count = 0;
      for (let r = 0; r < nums.length; r++) { p *= nums[r]; while (p >= k) p /= nums[l++]; count += r - l + 1; }
      return count;
    }
  },
  'max-consecutive-ones-iii': {
    fn: 'longestOnes', params: ['nums', 'k'], cmp: 'exact', meta: ['Max Consecutive Ones III', 1004, 'Medium', 'Sliding Window'],
    ask: 'nums holds 0s and 1s. You may flip at most k zeros into ones. Return the longest run of ones you can make.',
    sig: {
      py: 'def longestOnes(nums: List[int], k: int) -> int:',
      js: 'function longestOnes(nums, k) {',
      java: 'public int longestOnes(int[] nums, int k) {',
      cpp: 'int longestOnes(vector<int>& nums, int k) {',
      go: 'func longestOnes(nums []int, k int) int {'
    },
    examples: [[[[1, 0, 1, 1, 0, 1], 1], 4], [[[0, 0, 0], 0], 0], [[[0, 0, 1], 5], 3]],
    hidden: [[[[1, 1, 1], 0], 3], [[[0, 1, 0, 1, 0, 1], 2], 5], [[[1, 0, 0, 1, 1, 0, 1, 1, 1], 1], 6], [[[0], 1], 1], [[[1, 0, 1, 0, 1, 0, 0, 1], 2], 5]],
    ref: function (nums, k) {
      let l = 0, zeros = 0, best = 0;
      for (let r = 0; r < nums.length; r++) { if (!nums[r]) zeros++; while (zeros > k) { if (!nums[l]) zeros--; l++; } best = Math.max(best, r - l + 1); }
      return best;
    }
  },
  'longest-subarray-of-1s-after-deleting-one-element': {
    fn: 'longestSubarray', params: ['nums'], cmp: 'exact', meta: ['Longest Subarray of 1\'s After Deleting One Element', 1493, 'Medium', 'Sliding Window'],
    ask: 'nums holds 0s and 1s. You must delete exactly one element. Return the length of the longest run of only ones left afterwards.',
    sig: {
      py: 'def longestSubarray(nums: List[int]) -> int:',
      js: 'function longestSubarray(nums) {',
      java: 'public int longestSubarray(int[] nums) {',
      cpp: 'int longestSubarray(vector<int>& nums) {',
      go: 'func longestSubarray(nums []int) int {'
    },
    examples: [[[[1, 1, 0, 1, 1, 1]], 5], [[[1, 1, 1, 1]], 3], [[[0, 0]], 0]],
    hidden: [[[[1]], 0], [[[0]], 0], [[[1, 0, 0, 1]], 1], [[[0, 1, 1, 0, 1, 1, 1, 0]], 5], [[[1, 0, 1, 0, 1]], 2]],
    ref: function (nums) {
      let l = 0, zeros = 0, best = 0;
      for (let r = 0; r < nums.length; r++) { if (!nums[r]) zeros++; while (zeros > 1) { if (!nums[l]) zeros--; l++; } best = Math.max(best, r - l); }
      return best;
    }
  },
  'fruit-into-baskets': {
    fn: 'totalFruit', params: ['fruits'], cmp: 'exact', meta: ['Fruit Into Baskets', 904, 'Medium', 'Sliding Window'],
    ask: 'fruits[i] is the kind of fruit on tree i. You have two baskets, each holding one kind. Walk right from any tree, picking one fruit per tree, and stop at the first tree whose kind fits no basket. Return the most fruit you can pick.',
    sig: {
      py: 'def totalFruit(fruits: List[int]) -> int:',
      js: 'function totalFruit(fruits) {',
      java: 'public int totalFruit(int[] fruits) {',
      cpp: 'int totalFruit(vector<int>& fruits) {',
      go: 'func totalFruit(fruits []int) int {'
    },
    examples: [[[[3, 3, 1, 3, 2, 2]], 4], [[[5]], 1], [[[1, 2, 3, 4]], 2]],
    hidden: [[[[0, 0, 0]], 3], [[[1, 2, 1, 2, 3, 3, 3]], 4], [[[4, 4, 5, 6, 6, 6, 5]], 5], [[[1, 2]], 2], [[[7, 8, 7, 9, 9, 8, 8, 9]], 5]],
    ref: function (fruits) {
      const c = new Map(); let l = 0, best = 0;
      for (let r = 0; r < fruits.length; r++) {
        c.set(fruits[r], (c.get(fruits[r]) || 0) + 1);
        while (c.size > 2) { c.set(fruits[l], c.get(fruits[l]) - 1); if (!c.get(fruits[l])) c.delete(fruits[l]); l++; }
        best = Math.max(best, r - l + 1);
      }
      return best;
    }
  },
  'subarrays-with-k-different-integers': {
    fn: 'subarraysWithKDistinct', params: ['nums', 'k'], cmp: 'exact', meta: ['Subarrays with K Different Integers', 992, 'Hard', 'Sliding Window'],
    ask: 'Count the runs of neighbouring numbers in nums that contain exactly k different values.',
    sig: {
      py: 'def subarraysWithKDistinct(nums: List[int], k: int) -> int:',
      js: 'function subarraysWithKDistinct(nums, k) {',
      java: 'public int subarraysWithKDistinct(int[] nums, int k) {',
      cpp: 'int subarraysWithKDistinct(vector<int>& nums, int k) {',
      go: 'func subarraysWithKDistinct(nums []int, k int) int {'
    },
    examples: [[[[1, 2, 1], 2], 3], [[[4, 4, 4], 1], 6], [[[1, 2, 3], 3], 1]],
    hidden: [[[[1, 2, 1, 3, 4], 3], 3], [[[5], 1], 1], [[[1, 1, 2, 2], 2], 4], [[[1, 2, 3, 4], 2], 3], [[[2, 1, 2, 1, 2], 2], 10], [[[1, 2], 3], 0]],
    ref: function (nums, k) {
      const atMost = (m) => {
        const c = new Map(); let l = 0, n = 0;
        for (let r = 0; r < nums.length; r++) {
          c.set(nums[r], (c.get(nums[r]) || 0) + 1);
          while (c.size > m) { c.set(nums[l], c.get(nums[l]) - 1); if (!c.get(nums[l])) c.delete(nums[l]); l++; }
          n += r - l + 1;
        }
        return n;
      };
      return atMost(k) - atMost(k - 1);
    }
  },
  'find-the-difference-of-two-arrays': {
    fn: 'findDifference', params: ['nums1', 'nums2'], cmp: 'any', meta: ['Find the Difference of Two Arrays', 2215, 'Easy', 'Hash Map'],
    ask: 'Return two lists: the distinct values of nums1 that are not in nums2, and the distinct values of nums2 that are not in nums1. Each list may be in any order.',
    sig: {
      py: 'def findDifference(nums1: List[int], nums2: List[int]) -> List[List[int]]:',
      js: 'function findDifference(nums1, nums2) {',
      java: 'public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {',
      cpp: 'vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {',
      go: 'func findDifference(nums1 []int, nums2 []int) [][]int {'
    },
    examples: [[[[1, 4, 6], [4, 5]], [[1, 6], [5]]], [[[2, 2], [2]], [[], []]], [[[7, 8], []], [[7, 8], []]]],
    hidden: [[[[1, 2, 3], [3, 2, 1]], [[], []]], [[[1, 1, 2, 3], [3, 3, 4, 4]], [[1, 2], [4]]], [[[-1, 0], [0, 1]], [[-1], [1]]], [[[], [9]], [[], [9]]], [[[5, 6, 7], [8, 9]], [[5, 6, 7], [8, 9]]]],
    check: function (args, got, want) {
      const key = (a) => (Array.isArray(a) ? a.slice().sort((x, y) => x - y).join(',') + '/' + a.length : '?');
      return Array.isArray(got) && got.length === 2 && key(got[0]) === key(want[0]) && key(got[1]) === key(want[1]);
    },
    ref: function (nums1, nums2) {
      const a = new Set(nums1), b = new Set(nums2);
      return [[...a].filter((x) => !b.has(x)), [...b].filter((x) => !a.has(x))];
    }
  },
  'first-unique-character-in-a-string': {
    fn: 'firstUniqChar', params: ['s'], cmp: 'exact', meta: ['First Unique Character in a String', 387, 'Easy', 'Hash Map'],
    ask: 'Return the index of the first character in s that appears only once, or -1 if every character repeats.',
    sig: {
      py: 'def firstUniqChar(s: str) -> int:',
      js: 'function firstUniqChar(s) {',
      java: 'public int firstUniqChar(String s) {',
      cpp: 'int firstUniqChar(string s) {',
      go: 'func firstUniqChar(s string) int {'
    },
    examples: [[['swiss'], 1], [['aabb'], -1], [['z'], 0]],
    hidden: [[['abcabd'], 2], [[''], -1], [['racecar'], 3], [['xxyz'], 2], [['qwq'], 1]],
    ref: function (s) {
      const c = {}; for (const ch of s) c[ch] = (c[ch] || 0) + 1;
      for (let i = 0; i < s.length; i++) if (c[s[i]] === 1) return i;
      return -1;
    }
  },
  'maximum-number-of-balloons': {
    fn: 'maxNumberOfBalloons', params: ['text'], cmp: 'exact', meta: ['Maximum Number of Balloons', 1189, 'Easy', 'Hash Map'],
    ask: 'Each letter of text can be used once. Return how many copies of the word "balloon" you can spell.',
    sig: {
      py: 'def maxNumberOfBalloons(text: str) -> int:',
      js: 'function maxNumberOfBalloons(text) {',
      java: 'public int maxNumberOfBalloons(String text) {',
      cpp: 'int maxNumberOfBalloons(string text) {',
      go: 'func maxNumberOfBalloons(text string) int {'
    },
    examples: [[['balloonballoon'], 2], [['balon'], 0], [['xlabolon'], 1]],
    hidden: [[['bbaallloooonn'], 1], [['nooblal'], 1], [[''], 0], [['balloonsballoonsballoons'], 3], [['bbbaaalllooonnn'], 1], [['aabbnnllllooooo'], 2]],
    ref: function (text) {
      const c = {}; for (const ch of text) c[ch] = (c[ch] || 0) + 1;
      const g = (ch) => c[ch] || 0;
      return Math.min(g('b'), g('a'), Math.floor(g('l') / 2), Math.floor(g('o') / 2), g('n'));
    }
  },
  'intersection-of-two-arrays': {
    fn: 'intersection', params: ['nums1', 'nums2'], cmp: 'unordered', meta: ['Intersection of Two Arrays', 349, 'Easy', 'Hash Map'],
    ask: 'Return every value that appears in both arrays, each value once, in any order.',
    sig: {
      py: 'def intersection(nums1: List[int], nums2: List[int]) -> List[int]:',
      js: 'function intersection(nums1, nums2) {',
      java: 'public int[] intersection(int[] nums1, int[] nums2) {',
      cpp: 'vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {',
      go: 'func intersection(nums1 []int, nums2 []int) []int {'
    },
    examples: [[[[3, 1, 3, 5], [5, 3, 3]], [3, 5]], [[[1, 2], [3, 4]], []], [[[7], [7, 7]], [7]]],
    hidden: [[[[], [1]], []], [[[1, 2, 3, 4], [4, 3, 2, 1]], [1, 2, 3, 4]], [[[0, 0, 1], [0]], [0]], [[[9, 8, 7], [7, 10, 9]], [9, 7]], [[[2, 2, 2], [2, 2]], [2]]],
    ref: function (nums1, nums2) { const b = new Set(nums2); return [...new Set(nums1)].filter((x) => b.has(x)); }
  },
  'number-of-good-pairs': {
    fn: 'numIdenticalPairs', params: ['nums'], cmp: 'exact', meta: ['Number of Good Pairs', 1512, 'Easy', 'Hash Map'],
    ask: 'A good pair is two positions i < j with nums[i] == nums[j]. Return how many good pairs there are.',
    sig: {
      py: 'def numIdenticalPairs(nums: List[int]) -> int:',
      js: 'function numIdenticalPairs(nums) {',
      java: 'public int numIdenticalPairs(int[] nums) {',
      cpp: 'int numIdenticalPairs(vector<int>& nums) {',
      go: 'func numIdenticalPairs(nums []int) int {'
    },
    examples: [[[[2, 2, 3, 2]], 3], [[[5, 6, 7]], 0], [[[4, 4, 4, 4, 4]], 10]],
    hidden: [[[[1]], 0], [[[1, 1]], 1], [[[1, 2, 1, 2, 1, 2]], 6], [[[9, 8, 9, 8, 8]], 4], [[[3, 1, 3, 3, 1, 3]], 7]],
    ref: function (nums) { const c = {}; let n = 0; for (const x of nums) { n += c[x] || 0; c[x] = (c[x] || 0) + 1; } return n; }
  },
  'unique-number-of-occurrences': {
    fn: 'uniqueOccurrences', params: ['arr'], cmp: 'exact', meta: ['Unique Number of Occurrences', 1207, 'Easy', 'Hash Map'],
    ask: 'Count how often each value appears in arr. Return true if no two values appear the same number of times.',
    sig: {
      py: 'def uniqueOccurrences(arr: List[int]) -> bool:',
      js: 'function uniqueOccurrences(arr) {',
      java: 'public boolean uniqueOccurrences(int[] arr) {',
      cpp: 'bool uniqueOccurrences(vector<int>& arr) {',
      go: 'func uniqueOccurrences(arr []int) bool {'
    },
    examples: [[[[5, 5, 6, 7, 7, 7]], true], [[[1, 2]], false], [[[0]], true]],
    hidden: [[[[4, 4, 4, 2, 2, 9]], true], [[[1, 1, 2, 2]], false], [[[-3, -3, 0, 1, 1, 1]], true], [[[8, 8, 8, 8]], true], [[[1, 2, 2, 3, 3, 3, 4, 4]], false]],
    ref: function (arr) { const c = new Map(); for (const x of arr) c.set(x, (c.get(x) || 0) + 1); return new Set(c.values()).size === c.size; }
  },
  'word-pattern': {
    fn: 'wordPattern', params: ['pattern', 's'], cmp: 'exact', meta: ['Word Pattern', 290, 'Easy', 'Hash Map'],
    ask: 's is words separated by single spaces. Return true if s follows pattern: each letter stands for exactly one word, and different letters stand for different words.',
    sig: {
      py: 'def wordPattern(pattern: str, s: str) -> bool:',
      js: 'function wordPattern(pattern, s) {',
      java: 'public boolean wordPattern(String pattern, String s) {',
      cpp: 'bool wordPattern(string pattern, string s) {',
      go: 'func wordPattern(pattern string, s string) bool {'
    },
    examples: [[['xyyx', 'sun moon moon sun'], true], [['xyyx', 'sun moon moon star'], false], [['xx', 'cat dog'], false]],
    hidden: [[['ab', 'cat cat'], false], [['a', 'word'], true], [['abc', 'one two'], false], [['aaa', 'go go go'], true], [['abab', 'red blue red blue'], true], [['abcd', 'w x y w'], false]],
    ref: function (pattern, s) {
      const w = s.split(' ');
      if (w.length !== pattern.length) return false;
      const a = new Map(), b = new Map();
      for (let i = 0; i < w.length; i++) {
        if (a.has(pattern[i]) && a.get(pattern[i]) !== w[i]) return false;
        if (b.has(w[i]) && b.get(w[i]) !== pattern[i]) return false;
        a.set(pattern[i], w[i]); b.set(w[i], pattern[i]);
      }
      return true;
    }
  },
  'majority-element': {
    fn: 'majorityElement', params: ['nums'], cmp: 'exact', meta: ['Majority Element', 169, 'Easy', 'Hash Map'],
    ask: 'One value appears in more than half of the positions of nums. Return it.',
    sig: {
      py: 'def majorityElement(nums: List[int]) -> int:',
      js: 'function majorityElement(nums) {',
      java: 'public int majorityElement(int[] nums) {',
      cpp: 'int majorityElement(vector<int>& nums) {',
      go: 'func majorityElement(nums []int) int {'
    },
    examples: [[[[4, 7, 4]], 4], [[[9]], 9], [[[1, 8, 8, 1, 8]], 8]],
    hidden: [[[[0, 0, 0, 5, 5]], 0], [[[-2, -2, 3]], -2], [[[6, 6, 6, 6, 1, 2, 3]], 6], [[[2, 1, 2]], 2], [[[5, 5]], 5]],
    ref: function (nums) { let cand = 0, n = 0; for (const x of nums) { if (!n) cand = x; n += x === cand ? 1 : -1; } return cand; }
  },
  'determine-if-two-strings-are-close': {
    fn: 'closeStrings', params: ['word1', 'word2'], cmp: 'exact', meta: ['Determine if Two Strings Are Close', 1657, 'Medium', 'Hash Map'],
    ask: 'Two moves are allowed on a word: swap any two letters, or turn every copy of one letter into another letter and the other way round at once. Return true if word1 can become word2.',
    sig: {
      py: 'def closeStrings(word1: str, word2: str) -> bool:',
      js: 'function closeStrings(word1, word2) {',
      java: 'public boolean closeStrings(String word1, String word2) {',
      cpp: 'bool closeStrings(string word1, string word2) {',
      go: 'func closeStrings(word1 string, word2 string) bool {'
    },
    examples: [[['abbc', 'bcca'], true], [['ab', 'aab'], false], [['xy', 'xz'], false]],
    hidden: [[['aaab', 'bbba'], true], [['a', 'a'], true], [['abc', 'abd'], false], [['aabbcc', 'abcabc'], true], [['aacc', 'abcc'], false], [['uau', 'ssx'], false]],
    ref: function (word1, word2) {
      if (word1.length !== word2.length) return false;
      const count = (w) => { const c = {}; for (const ch of w) c[ch] = (c[ch] || 0) + 1; return c; };
      const a = count(word1), b = count(word2);
      const keys = (c) => Object.keys(c).sort().join('');
      const vals = (c) => Object.values(c).sort((x, y) => x - y).join(',');
      return keys(a) === keys(b) && vals(a) === vals(b);
    }
  },
  'valid-sudoku': {
    fn: 'isValidSudoku', params: ['board'], cmp: 'exact', meta: ['Valid Sudoku', 36, 'Medium', 'Hash Map'],
    ask: 'board is a 9 x 9 Sudoku grid, with "." for an empty cell. Return true if no digit repeats in any row, any column, or any of the nine 3 x 3 boxes. The grid does not need to be solvable.',
    sig: {
      py: 'def isValidSudoku(board: List[List[str]]) -> bool:',
      js: 'function isValidSudoku(board) {',
      java: 'public boolean isValidSudoku(char[][] board) {',
      cpp: 'bool isValidSudoku(vector<vector<char>>& board) {',
      go: 'func isValidSudoku(board [][]byte) bool {'
    },
    examples: [[[[['1', '.', '.', '.', '.', '6', '.', '.', '.'], ['.', '.', '.', '7', '.', '.', '.', '2', '.'], ['.', '.', '9', '.', '.', '.', '.', '.', '6'], ['.', '3', '.', '.', '.', '7', '.', '.', '.'], ['5', '.', '.', '.', '.', '.', '2', '.', '.'], ['.', '.', '.', '2', '.', '.', '.', '.', '.'], ['3', '.', '.', '.', '.', '.', '9', '.', '.'], ['.', '.', '.', '.', '1', '.', '.', '.', '5'], ['.', '1', '.', '.', '.', '.', '.', '7', '.']]], true], [[[['1', '.', '.', '.', '.', '6', '.', '.', '1'], ['.', '.', '.', '7', '.', '.', '.', '2', '.'], ['.', '.', '9', '.', '.', '.', '.', '.', '6'], ['.', '3', '.', '.', '.', '7', '.', '.', '.'], ['5', '.', '.', '.', '.', '.', '2', '.', '.'], ['.', '.', '.', '2', '.', '.', '.', '.', '.'], ['3', '.', '.', '.', '.', '.', '9', '.', '.'], ['.', '.', '.', '.', '1', '.', '.', '.', '5'], ['.', '1', '.', '.', '.', '.', '.', '7', '.']]], false], [[[['1', '.', '.', '.', '.', '6', '.', '.', '.'], ['.', '.', '1', '7', '.', '.', '.', '2', '.'], ['.', '.', '9', '.', '.', '.', '.', '.', '6'], ['.', '3', '.', '.', '.', '7', '.', '.', '.'], ['5', '.', '.', '.', '.', '.', '2', '.', '.'], ['.', '.', '.', '2', '.', '.', '.', '.', '.'], ['3', '.', '.', '.', '.', '.', '9', '.', '.'], ['.', '.', '.', '.', '1', '.', '.', '.', '5'], ['.', '1', '.', '.', '.', '.', '.', '7', '.']]], false]],
    hidden: [[[[['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.']]], true], [[[['1', '2', '3', '4', '5', '6', '7', '8', '9'], ['4', '5', '6', '7', '8', '9', '1', '2', '3'], ['7', '8', '9', '1', '2', '3', '4', '5', '6'], ['2', '3', '4', '5', '6', '7', '8', '9', '1'], ['5', '6', '7', '8', '9', '1', '2', '3', '4'], ['8', '9', '1', '2', '3', '4', '5', '6', '7'], ['3', '4', '5', '6', '7', '8', '9', '1', '2'], ['6', '7', '8', '9', '1', '2', '3', '4', '5'], ['9', '1', '2', '3', '4', '5', '6', '7', '8']]], true], [[[['2', '1', '3', '4', '5', '6', '7', '8', '9'], ['4', '5', '6', '7', '8', '9', '1', '2', '3'], ['7', '8', '9', '1', '2', '3', '4', '5', '6'], ['2', '3', '4', '5', '6', '7', '8', '9', '1'], ['5', '6', '7', '8', '9', '1', '2', '3', '4'], ['8', '9', '1', '2', '3', '4', '5', '6', '7'], ['3', '4', '5', '6', '7', '8', '9', '1', '2'], ['6', '7', '8', '9', '1', '2', '3', '4', '5'], ['9', '1', '2', '3', '4', '5', '6', '7', '8']]], false], [[[['1', '.', '.', '.', '.', '6', '.', '.', '.'], ['.', '.', '.', '7', '.', '.', '.', '2', '.'], ['.', '.', '9', '.', '.', '.', '.', '.', '6'], ['.', '3', '.', '.', '.', '7', '.', '.', '.'], ['5', '.', '.', '.', '.', '.', '2', '.', '.'], ['.', '.', '.', '2', '.', '.', '.', '.', '.'], ['3', '.', '.', '.', '.', '.', '9', '.', '.'], ['.', '.', '.', '.', '1', '.', '.', '.', '5'], ['5', '1', '.', '.', '.', '.', '.', '7', '.']]], false], [[[['1', '.', '.', '8', '.', '6', '.', '.', '.'], ['.', '.', '.', '7', '.', '.', '.', '2', '.'], ['.', '.', '9', '.', '.', '.', '.', '.', '6'], ['.', '3', '.', '.', '.', '7', '.', '.', '.'], ['5', '.', '.', '.', '8', '.', '2', '.', '.'], ['.', '.', '.', '2', '.', '.', '.', '.', '.'], ['3', '.', '.', '.', '.', '.', '9', '.', '.'], ['.', '.', '.', '.', '1', '.', '.', '.', '5'], ['.', '1', '.', '.', '.', '.', '.', '7', '.']]], true], [[[['1', '.', '.', '.', '.', '6', '.', '.', '.'], ['.', '.', '.', '7', '.', '.', '.', '2', '.'], ['.', '.', '9', '.', '.', '.', '.', '.', '6'], ['.', '3', '.', '.', '.', '7', '.', '.', '.'], ['5', '.', '.', '.', '.', '.', '2', '.', '.'], ['.', '.', '.', '2', '.', '.', '.', '.', '.'], ['3', '.', '.', '.', '.', '.', '9', '9', '.'], ['.', '.', '.', '.', '1', '.', '.', '.', '5'], ['.', '1', '.', '.', '.', '.', '.', '7', '.']]], false]],
    ref: function (board) {
      const seen = new Set();
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        const d = board[r][c]; if (d === '.') continue;
        const keys = ['r' + r + d, 'c' + c + d, 'b' + Math.floor(r / 3) + Math.floor(c / 3) + d];
        if (keys.some((k) => seen.has(k))) return false;
        keys.forEach((k) => seen.add(k));
      }
      return true;
    }
  },
  'first-missing-positive': {
    fn: 'firstMissingPositive', params: ['nums'], cmp: 'exact', meta: ['First Missing Positive', 41, 'Hard', 'Hash Map'],
    ask: 'Return the smallest positive integer that does not appear in nums. Aim for O(n) time and O(1) extra space.',
    sig: {
      py: 'def firstMissingPositive(nums: List[int]) -> int:',
      js: 'function firstMissingPositive(nums) {',
      java: 'public int firstMissingPositive(int[] nums) {',
      cpp: 'int firstMissingPositive(vector<int>& nums) {',
      go: 'func firstMissingPositive(nums []int) int {'
    },
    examples: [[[[2, 3, -1, 1]], 4], [[[5, 6, 7]], 1], [[[1, 1, 3]], 2]],
    hidden: [[[[1]], 2], [[[]], 1], [[[2]], 1], [[[0, -5, 1, 2, 3, 5]], 4], [[[4, 1, 2, 3]], 5], [[[100, 1, 2]], 3]],
    ref: function (nums) {
      const a = nums.slice(), n = a.length;
      for (let i = 0; i < n; i++) while (a[i] > 0 && a[i] <= n && a[a[i] - 1] !== a[i]) { const j = a[i] - 1; const t = a[j]; a[j] = a[i]; a[i] = t; }
      for (let i = 0; i < n; i++) if (a[i] !== i + 1) return i + 1;
      return n + 1;
    }
  },
  'equal-row-and-column-pairs': {
    fn: 'equalPairs', params: ['grid'], cmp: 'exact', meta: ['Equal Row and Column Pairs', 2352, 'Medium', 'Hash Map'],
    ask: 'grid is n x n. Count the pairs (row r, column c) where row r and column c hold the same values in the same order.',
    sig: {
      py: 'def equalPairs(grid: List[List[int]]) -> int:',
      js: 'function equalPairs(grid) {',
      java: 'public int equalPairs(int[][] grid) {',
      cpp: 'int equalPairs(vector<vector<int>>& grid) {',
      go: 'func equalPairs(grid [][]int) int {'
    },
    examples: [[[[[1, 2], [2, 1]]], 2], [[[[5]]], 1], [[[[1, 2], [3, 4]]], 0]],
    hidden: [[[[[1, 1], [1, 1]]], 4], [[[[2, 7, 7], [7, 2, 2], [7, 2, 2]]], 5], [[[[3, 1, 2], [1, 5, 1], [2, 1, 4]]], 3], [[[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], 3], [[[[4, 4, 4], [1, 2, 3], [4, 4, 4]]], 0]],
    ref: function (grid) {
      const rows = new Map(); for (const r of grid) { const k = r.join(','); rows.set(k, (rows.get(k) || 0) + 1); }
      let n = 0;
      for (let c = 0; c < grid.length; c++) n += rows.get(grid.map((r) => r[c]).join(',')) || 0;
      return n;
    }
  },
  '4sum-ii': {
    fn: 'fourSumCount', params: ['nums1', 'nums2', 'nums3', 'nums4'], cmp: 'exact', meta: ['4Sum II', 454, 'Medium', 'Hash Map'],
    ask: 'The four arrays have the same length. Count the ways to pick one position from each array so that the four picked values add up to 0.',
    sig: {
      py: 'def fourSumCount(nums1: List[int], nums2: List[int], nums3: List[int], nums4: List[int]) -> int:',
      js: 'function fourSumCount(nums1, nums2, nums3, nums4) {',
      java: 'public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {',
      cpp: 'int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {',
      go: 'func fourSumCount(nums1 []int, nums2 []int, nums3 []int, nums4 []int) int {'
    },
    examples: [[[[1, -1], [0, 0], [1, 2], [-1, -2]], 4], [[[0], [0], [0], [0]], 1], [[[1], [1], [1], [1]], 0]],
    hidden: [[[[1, 2], [-2, -1], [-1, 2], [0, 2]], 2], [[[0, 0], [0, 0], [0, 0], [0, 0]], 16], [[[-3, 3], [1, -1], [2, 0], [0, -2]], 2], [[[5], [-5], [2], [-2]], 1], [[[1, 1, 1], [-1, 0, 2], [0, 3, -3], [0, 0, 1]], 12]],
    ref: function (nums1, nums2, nums3, nums4) {
      const m = new Map(); for (const a of nums1) for (const b of nums2) m.set(a + b, (m.get(a + b) || 0) + 1);
      let n = 0; for (const c of nums3) for (const d of nums4) n += m.get(-c - d) || 0;
      return n;
    }
  },
  'running-sum-of-1d-array': {
    fn: 'runningSum', params: ['nums'], cmp: 'exact', meta: ['Running Sum of 1d Array', 1480, 'Easy', 'Prefix Sum'],
    ask: 'Return a list where position i holds nums[0] + nums[1] + ... + nums[i].',
    sig: {
      py: 'def runningSum(nums: List[int]) -> List[int]:',
      js: 'function runningSum(nums) {',
      java: 'public int[] runningSum(int[] nums) {',
      cpp: 'vector<int> runningSum(vector<int>& nums) {',
      go: 'func runningSum(nums []int) []int {'
    },
    examples: [[[[3, 1, 4]], [3, 4, 8]], [[[-2, 2]], [-2, 0]], [[[0]], [0]]],
    hidden: [[[[1, 1, 1, 1]], [1, 2, 3, 4]], [[[5, -5, 5, -5]], [5, 0, 5, 0]], [[[10]], [10]], [[[1, 2, 3, 4, 5, 6]], [1, 3, 6, 10, 15, 21]], [[[-1, -2, -3]], [-1, -3, -6]]],
    ref: function (nums) { let s = 0; return nums.map((x) => (s += x)); }
  },
  'find-the-highest-altitude': {
    fn: 'largestAltitude', params: ['gain'], cmp: 'exact', meta: ['Find the Highest Altitude', 1732, 'Easy', 'Prefix Sum'],
    ask: 'A hiker starts at altitude 0, and gain[i] is the change in altitude on leg i. Return the highest altitude reached, counting the start.',
    sig: {
      py: 'def largestAltitude(gain: List[int]) -> int:',
      js: 'function largestAltitude(gain) {',
      java: 'public int largestAltitude(int[] gain) {',
      cpp: 'int largestAltitude(vector<int>& gain) {',
      go: 'func largestAltitude(gain []int) int {'
    },
    examples: [[[[2, -1, 3]], 4], [[[-3, -2]], 0], [[[0, 0]], 0]],
    hidden: [[[[5]], 5], [[[-1, 4, -2, 6]], 7], [[[-5, 1, 1, 1, 1, 1, 1]], 1], [[[3, -10, 8]], 3], [[[1, 2, -1, -2, 4]], 4]],
    ref: function (gain) { let h = 0, best = 0; for (const g of gain) { h += g; best = Math.max(best, h); } return best; }
  },
  'find-the-middle-index-in-array': {
    fn: 'findMiddleIndex', params: ['nums'], cmp: 'exact', meta: ['Find the Middle Index in Array', 1991, 'Easy', 'Prefix Sum'],
    ask: 'Return the leftmost index where everything to its left adds up to the same as everything to its right (an empty side counts as 0), or -1 if there is none.',
    sig: {
      py: 'def findMiddleIndex(nums: List[int]) -> int:',
      js: 'function findMiddleIndex(nums) {',
      java: 'public int findMiddleIndex(int[] nums) {',
      cpp: 'int findMiddleIndex(vector<int>& nums) {',
      go: 'func findMiddleIndex(nums []int) int {'
    },
    examples: [[[[3, 5, 1, 2]], 1], [[[2, -2, 9]], 2], [[[1, 2]], -1]],
    hidden: [[[[0]], 0], [[[1, -1, 4]], 2], [[[0, 0, 0, 0]], 0], [[[5, 1, 1, 1, 1, 1]], -1], [[[-3, 3, 7]], 2]],
    ref: function (nums) {
      const total = nums.reduce((a, b) => a + b, 0); let left = 0;
      for (let i = 0; i < nums.length; i++) { if (left === total - left - nums[i]) return i; left += nums[i]; }
      return -1;
    }
  },
  'range-sum-query-immutable': {
    fn: 'NumArray', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Range Sum Query - Immutable', 303, 'Easy', 'Prefix Sum'],
    ask: 'Build a class that is given nums once. sumRange(left, right) returns nums[left] + ... + nums[right], with both ends included, and should be fast however often it is called. The first op creates the class; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class NumArray:', js: 'class NumArray {', java: 'class NumArray {', cpp: 'class NumArray {', go: 'type NumArray struct {' },
    starter: {
      py: 'class NumArray:\n    def __init__(self, nums: List[int]):\n        pass\n\n    def sumRange(self, left: int, right: int) -> int:\n        pass\n',
      js: 'class NumArray {\n  constructor(nums) {\n  }\n  sumRange(left, right) {\n  }\n}\n',
      java: 'class NumArray {\n    public NumArray(int[] nums) {\n    }\n    public int sumRange(int left, int right) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass NumArray {\npublic:\n    NumArray(vector<int>& nums) {\n    }\n    int sumRange(int left, int right) {\n        return 0;\n    }\n};\n',
      go: 'package main\n\ntype NumArray struct {\n}\n\nfunc Constructor(nums []int) NumArray {\n    return NumArray{}\n}\n\nfunc (this *NumArray) SumRange(left int, right int) int {\n    return 0\n}\n'
    },
    examples: [[[['NumArray', 'sumRange', 'sumRange', 'sumRange'], [[[4, -1, 2, 7]], [0, 1], [1, 3], [2, 2]]], [null, 3, 8, 2]], [[['NumArray', 'sumRange'], [[[5]], [0, 0]]], [null, 5]], [[['NumArray', 'sumRange', 'sumRange'], [[[0, 0, 3, -3]], [0, 3], [2, 3]]], [null, 0, 0]]],
    hidden: [[[['NumArray', 'sumRange', 'sumRange'], [[[1, 2, 3, 4, 5]], [0, 4], [4, 4]]], [null, 15, 5]], [[['NumArray', 'sumRange', 'sumRange', 'sumRange'], [[[-5, -5, 10]], [0, 0], [0, 1], [1, 2]]], [null, -5, -10, 5]], [[['NumArray', 'sumRange'], [[[100, 200]], [0, 1]]], [null, 300]], [[['NumArray', 'sumRange', 'sumRange'], [[[3, 0, 0, 3]], [1, 2], [0, 3]]], [null, 0, 6]], [[['NumArray', 'sumRange', 'sumRange', 'sumRange', 'sumRange'], [[[2, 4, 6, 8, 10, 12]], [2, 5], [0, 2], [3, 3], [1, 4]]], [null, 36, 12, 8, 28]]],
    ref: class {
      constructor(nums) { this.p = [0]; for (const x of nums) this.p.push(this.p[this.p.length - 1] + x); }
      sumRange(left, right) { return this.p[right + 1] - this.p[left]; }
    }
  },
  'contiguous-array': {
    fn: 'findMaxLength', params: ['nums'], cmp: 'exact', meta: ['Contiguous Array', 525, 'Medium', 'Prefix Sum'],
    ask: 'nums holds 0s and 1s. Return the length of the longest run of neighbouring elements with as many 0s as 1s.',
    sig: {
      py: 'def findMaxLength(nums: List[int]) -> int:',
      js: 'function findMaxLength(nums) {',
      java: 'public int findMaxLength(int[] nums) {',
      cpp: 'int findMaxLength(vector<int>& nums) {',
      go: 'func findMaxLength(nums []int) int {'
    },
    examples: [[[[0, 0, 1, 0, 1, 1]], 6], [[[1, 1, 1]], 0], [[[1, 0, 0]], 2]],
    hidden: [[[[0, 1]], 2], [[[0]], 0], [[[1, 1, 0, 0, 1]], 4], [[[0, 0, 0, 1, 1, 1, 0]], 6], [[[1, 0, 1, 1, 1, 0, 0]], 6]],
    ref: function (nums) {
      const first = new Map([[0, -1]]); let s = 0, best = 0;
      for (let i = 0; i < nums.length; i++) { s += nums[i] ? 1 : -1; if (first.has(s)) best = Math.max(best, i - first.get(s)); else first.set(s, i); }
      return best;
    }
  },
  'continuous-subarray-sum': {
    fn: 'checkSubarraySum', params: ['nums', 'k'], cmp: 'exact', meta: ['Continuous Subarray Sum', 523, 'Medium', 'Prefix Sum'],
    ask: 'nums holds non-negative integers. Return true if some run of at least two neighbouring numbers adds up to a multiple of k (0 counts as a multiple).',
    sig: {
      py: 'def checkSubarraySum(nums: List[int], k: int) -> bool:',
      js: 'function checkSubarraySum(nums, k) {',
      java: 'public boolean checkSubarraySum(int[] nums, int k) {',
      cpp: 'bool checkSubarraySum(vector<int>& nums, int k) {',
      go: 'func checkSubarraySum(nums []int, k int) bool {'
    },
    examples: [[[[5, 2, 4], 6], true], [[[1, 2, 4], 5], false], [[[0, 0], 3], true]],
    hidden: [[[[3], 3], false], [[[1, 0], 2], false], [[[2, 4, 3], 6], true], [[[1, 1, 1], 4], false], [[[4, 1, 2, 3], 7], true], [[[5, 0, 5], 10], true]],
    ref: function (nums, k) {
      const first = new Map([[0, -1]]); let s = 0;
      for (let i = 0; i < nums.length; i++) {
        s = (s + nums[i]) % k;
        if (first.has(s)) { if (i - first.get(s) >= 2) return true; } else first.set(s, i);
      }
      return false;
    }
  },
  'subarray-sums-divisible-by-k': {
    fn: 'subarraysDivByK', params: ['nums', 'k'], cmp: 'exact', meta: ['Subarray Sums Divisible by K', 974, 'Medium', 'Prefix Sum'],
    ask: 'Count the runs of neighbouring numbers in nums whose sum is divisible by k. Watch out for negative numbers.',
    sig: {
      py: 'def subarraysDivByK(nums: List[int], k: int) -> int:',
      js: 'function subarraysDivByK(nums, k) {',
      java: 'public int subarraysDivByK(int[] nums, int k) {',
      cpp: 'int subarraysDivByK(vector<int>& nums, int k) {',
      go: 'func subarraysDivByK(nums []int, k int) int {'
    },
    examples: [[[[2, 3, 1], 3], 2], [[[5], 5], 1], [[[-1, 1], 2], 1]],
    hidden: [[[[1, 2, 3], 1], 6], [[[0, 0], 7], 3], [[[4, -4, 4], 4], 6], [[[7, -3, 2, 5], 5], 1], [[[1, 1, 1], 2], 2], [[[-2, -3, 1], 3], 1]],
    ref: function (nums, k) {
      const c = new Map([[0, 1]]); let s = 0, n = 0;
      for (const x of nums) { s = ((s + x) % k + k) % k; n += c.get(s) || 0; c.set(s, (c.get(s) || 0) + 1); }
      return n;
    }
  },
  'corporate-flight-bookings': {
    fn: 'corpFlightBookings', params: ['bookings', 'n'], cmp: 'exact', meta: ['Corporate Flight Bookings', 1109, 'Medium', 'Prefix Sum'],
    ask: 'Flights are numbered 1 to n. Booking [first, last, seats] reserves seats on every flight from first to last. Return the total seats reserved on each flight.',
    sig: {
      py: 'def corpFlightBookings(bookings: List[List[int]], n: int) -> List[int]:',
      js: 'function corpFlightBookings(bookings, n) {',
      java: 'public int[] corpFlightBookings(int[][] bookings, int n) {',
      cpp: 'vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {',
      go: 'func corpFlightBookings(bookings [][]int, n int) []int {'
    },
    examples: [[[[[1, 2, 5], [2, 3, 10]], 3], [5, 15, 10]], [[[[1, 1, 7]], 1], [7]], [[[[2, 2, 4]], 3], [0, 4, 0]]],
    hidden: [[[[], 2], [0, 0]], [[[[1, 4, 1], [1, 4, 2]], 4], [3, 3, 3, 3]], [[[[3, 5, 6], [1, 2, 1]], 5], [1, 1, 6, 6, 6]], [[[[2, 3, 8], [3, 3, 2], [1, 1, 9]], 3], [9, 8, 10]], [[[[1, 5, 3], [2, 4, 3], [3, 3, 3]], 5], [3, 6, 9, 6, 3]]],
    ref: function (bookings, n) {
      const d = new Array(n + 1).fill(0);
      for (const [a, b, s] of bookings) { d[a - 1] += s; d[b] -= s; }
      const out = []; let run = 0;
      for (let i = 0; i < n; i++) { run += d[i]; out.push(run); }
      return out;
    }
  },
  'sqrtx': {
    fn: 'mySqrt', params: ['x'], cmp: 'exact', meta: ['Sqrt(x)', 69, 'Easy', 'Binary Search'],
    ask: 'x is a non-negative integer. Return its square root rounded down, without a built-in power or square-root function.',
    sig: {
      py: 'def mySqrt(x: int) -> int:',
      js: 'function mySqrt(x) {',
      java: 'public int mySqrt(int x) {',
      cpp: 'int mySqrt(int x) {',
      go: 'func mySqrt(x int) int {'
    },
    examples: [[[15], 3], [[16], 4], [[0], 0]],
    hidden: [[[1], 1], [[2], 1], [[99], 9], [[2147395599], 46339], [[1000000], 1000], [[2147483647], 46340]],
    ref: function (x) {
      let lo = 0, hi = x;
      while (lo < hi) { const mid = Math.floor((lo + hi + 1) / 2); if (mid * mid <= x) lo = mid; else hi = mid - 1; }
      return lo;
    }
  },
  'find-smallest-letter-greater-than-target': {
    fn: 'nextGreatestLetter', params: ['letters', 'target'], cmp: 'exact', meta: ['Find Smallest Letter Greater Than Target', 744, 'Easy', 'Binary Search'],
    ask: 'letters is sorted and holds at least two different letters. Return the first letter that comes after target in the alphabet; if there is none, return letters[0].',
    sig: {
      py: 'def nextGreatestLetter(letters: List[str], target: str) -> str:',
      js: 'function nextGreatestLetter(letters, target) {',
      java: 'public char nextGreatestLetter(char[] letters, char target) {',
      cpp: 'char nextGreatestLetter(vector<char>& letters, char target) {',
      go: 'func nextGreatestLetter(letters []byte, target byte) byte {'
    },
    examples: [[[['b', 'e', 'k'], 'e'], 'k'], [[['b', 'e', 'k'], 'z'], 'b'], [[['a', 'a', 'm'], 'a'], 'm']],
    hidden: [[[['c', 'f', 'j'], 'a'], 'c'], [[['c', 'f', 'j'], 'j'], 'c'], [[['d', 'd', 'e', 'e'], 'd'], 'e'], [[['a', 'b'], 'b'], 'a'], [[['e', 'g', 'n', 'x'], 'm'], 'n']],
    ref: function (letters, target) {
      let lo = 0, hi = letters.length;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (letters[mid] <= target) lo = mid + 1; else hi = mid; }
      return letters[lo % letters.length];
    }
  },
  'find-first-and-last-position-of-element-in-sorted-array': {
    fn: 'searchRange', params: ['nums', 'target'], cmp: 'exact', meta: ['Find First and Last Position of Element in Sorted Array', 34, 'Medium', 'Binary Search'],
    ask: 'nums is sorted. Return [first, last]: the first and last index holding target, or [-1, -1] if it is missing. Aim for O(log n).',
    sig: {
      py: 'def searchRange(nums: List[int], target: int) -> List[int]:',
      js: 'function searchRange(nums, target) {',
      java: 'public int[] searchRange(int[] nums, int target) {',
      cpp: 'vector<int> searchRange(vector<int>& nums, int target) {',
      go: 'func searchRange(nums []int, target int) []int {'
    },
    examples: [[[[1, 3, 3, 3, 6], 3], [1, 3]], [[[2, 4], 5], [-1, -1]], [[[], 0], [-1, -1]]],
    hidden: [[[[7], 7], [0, 0]], [[[1, 1, 1, 1], 1], [0, 3]], [[[1, 2, 3, 4, 5], 1], [0, 0]], [[[1, 2, 3, 4, 5], 5], [4, 4]], [[[-4, -2, -2, 0, 3], -2], [1, 2]], [[[2, 2, 4, 4], 3], [-1, -1]]],
    ref: function (nums, target) {
      const lower = (t) => { let lo = 0, hi = nums.length; while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] < t) lo = m + 1; else hi = m; } return lo; };
      const a = lower(target);
      if (a === nums.length || nums[a] !== target) return [-1, -1];
      return [a, lower(target + 1) - 1];
    }
  },
  'peak-index-in-a-mountain-array': {
    fn: 'peakIndexInMountainArray', params: ['arr'], cmp: 'exact', meta: ['Peak Index in a Mountain Array', 852, 'Medium', 'Binary Search'],
    ask: 'arr strictly rises and then strictly falls. Return the index of its highest value in O(log n).',
    sig: {
      py: 'def peakIndexInMountainArray(arr: List[int]) -> int:',
      js: 'function peakIndexInMountainArray(arr) {',
      java: 'public int peakIndexInMountainArray(int[] arr) {',
      cpp: 'int peakIndexInMountainArray(vector<int>& arr) {',
      go: 'func peakIndexInMountainArray(arr []int) int {'
    },
    examples: [[[[1, 4, 2]], 1], [[[0, 2, 5, 9, 3]], 3], [[[3, 7, 6, 5, 4, 1]], 1]],
    hidden: [[[[0, 1, 0]], 1], [[[1, 2, 3, 4, 5, 4]], 4], [[[10, 20, 15, 5, 2]], 1], [[[-5, 0, 5, 10, 8, 6, 4]], 3], [[[2, 9, 8, 7, 6, 5, 4, 3]], 1]],
    ref: function (arr) {
      let lo = 0, hi = arr.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] < arr[m + 1]) lo = m + 1; else hi = m; }
      return lo;
    }
  },
  'find-peak-element': {
    fn: 'findPeakElement', params: ['nums'], cmp: 'any', meta: ['Find Peak Element', 162, 'Medium', 'Binary Search'],
    ask: 'Neighbouring values in nums always differ. A peak is a value bigger than both its neighbours (outside the array counts as minus infinity). Return the index of any peak, in O(log n).',
    sig: {
      py: 'def findPeakElement(nums: List[int]) -> int:',
      js: 'function findPeakElement(nums) {',
      java: 'public int findPeakElement(int[] nums) {',
      cpp: 'int findPeakElement(vector<int>& nums) {',
      go: 'func findPeakElement(nums []int) int {'
    },
    examples: [[[[1, 5, 2]], 1], [[[6, 4, 3]], 0], [[[2, 3, 9, 1, 8, 0]], 2]],
    hidden: [[[[1]], 0], [[[1, 2]], 1], [[[5, 4, 3, 2, 1]], 0], [[[1, 2, 3, 4, 5]], 4], [[[3, 1, 3, 1, 3]], 2], [[[0, 10, 5, 7, 6]], 3]],
    check: function (args, got) {
      const a = args[0], at = (i) => (i < 0 || i >= a.length ? -Infinity : a[i]);
      return Number.isInteger(got) && got >= 0 && got < a.length && a[got] > at(got - 1) && a[got] > at(got + 1);
    },
    ref: function (nums) {
      let lo = 0, hi = nums.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] < nums[m + 1]) lo = m + 1; else hi = m; }
      return lo;
    }
  },
  'single-element-in-a-sorted-array': {
    fn: 'singleNonDuplicate', params: ['nums'], cmp: 'exact', meta: ['Single Element in a Sorted Array', 540, 'Medium', 'Binary Search'],
    ask: 'nums is sorted, and every value appears exactly twice except one, which appears once. Return that value in O(log n).',
    sig: {
      py: 'def singleNonDuplicate(nums: List[int]) -> int:',
      js: 'function singleNonDuplicate(nums) {',
      java: 'public int singleNonDuplicate(int[] nums) {',
      cpp: 'int singleNonDuplicate(vector<int>& nums) {',
      go: 'func singleNonDuplicate(nums []int) int {'
    },
    examples: [[[[2, 2, 5, 7, 7]], 5], [[[4]], 4], [[[1, 1, 3, 3, 8]], 8]],
    hidden: [[[[0, 1, 1]], 0], [[[1, 1, 2, 2, 3, 3, 4]], 4], [[[-3, -3, -1, 5, 5]], -1], [[[6, 6, 7, 7, 9, 10, 10]], 9], [[[1, 2, 2]], 1]],
    ref: function (nums) {
      let lo = 0, hi = nums.length - 1;
      while (lo < hi) { let m = (lo + hi) >> 1; if (m % 2) m--; if (nums[m] === nums[m + 1]) lo = m + 2; else hi = m; }
      return nums[lo];
    }
  },
  'capacity-to-ship-packages-within-d-days': {
    fn: 'shipWithinDays', params: ['weights', 'days'], cmp: 'exact', meta: ['Capacity To Ship Packages Within D Days', 1011, 'Medium', 'Binary Search'],
    ask: 'Packages must ship in the given order, one day at a time; each day the ship takes packages from the front until the next one would go over its capacity. Return the smallest capacity that ships everything within days days.',
    sig: {
      py: 'def shipWithinDays(weights: List[int], days: int) -> int:',
      js: 'function shipWithinDays(weights, days) {',
      java: 'public int shipWithinDays(int[] weights, int days) {',
      cpp: 'int shipWithinDays(vector<int>& weights, int days) {',
      go: 'func shipWithinDays(weights []int, days int) int {'
    },
    examples: [[[[4, 2, 5, 1], 2], 6], [[[3, 3, 3], 3], 3], [[[1, 2, 3], 1], 6]],
    hidden: [[[[10], 5], 10], [[[1, 1, 1, 1, 1, 1], 4], 2], [[[7, 2, 5, 10, 8], 2], 18], [[[2, 2, 2, 9], 2], 9], [[[5, 1, 1, 1, 5, 1], 3], 6]],
    ref: function (weights, days) {
      const need = (cap) => { let d = 1, load = 0; for (const w of weights) { if (load + w > cap) { d++; load = 0; } load += w; } return d; };
      let lo = Math.max(...weights), hi = weights.reduce((a, b) => a + b, 0);
      while (lo < hi) { const m = Math.floor((lo + hi) / 2); if (need(m) <= days) hi = m; else lo = m + 1; }
      return lo;
    }
  },
  'minimum-number-of-days-to-make-m-bouquets': {
    fn: 'minDays', params: ['bloomDay', 'm', 'k'], cmp: 'exact', meta: ['Minimum Number of Days to Make m Bouquets', 1482, 'Medium', 'Binary Search'],
    ask: 'Flower i blooms on day bloomDay[i]. A bouquet takes k bloomed flowers that stand next to each other, and each flower goes in one bouquet. Return the first day you can make m bouquets, or -1 if you never can.',
    sig: {
      py: 'def minDays(bloomDay: List[int], m: int, k: int) -> int:',
      js: 'function minDays(bloomDay, m, k) {',
      java: 'public int minDays(int[] bloomDay, int m, int k) {',
      cpp: 'int minDays(vector<int>& bloomDay, int m, int k) {',
      go: 'func minDays(bloomDay []int, m int, k int) int {'
    },
    examples: [[[[5, 1, 3, 2], 2, 1], 2], [[[5, 1, 3, 2], 2, 2], 5], [[[4, 4], 2, 2], -1]],
    hidden: [[[[1], 1, 1], 1], [[[7, 7, 7, 7, 12, 7, 7], 2, 3], 12], [[[1, 10, 3, 10, 2], 3, 1], 3], [[[9, 1, 9, 1, 9], 1, 2], 9], [[[3, 3, 3], 1, 3], 3], [[[2, 8, 1, 6, 4, 5], 2, 2], 6]],
    ref: function (bloomDay, m, k) {
      if (m * k > bloomDay.length) return -1;
      const ok = (day) => { let run = 0, made = 0; for (const b of bloomDay) { if (b <= day) { if (++run === k) { made++; run = 0; } } else run = 0; } return made >= m; };
      let lo = Math.min(...bloomDay), hi = Math.max(...bloomDay);
      while (lo < hi) { const mid = Math.floor((lo + hi) / 2); if (ok(mid)) hi = mid; else lo = mid + 1; }
      return lo;
    }
  },
  'time-based-key-value-store': {
    fn: 'TimeMap', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Time Based Key-Value Store', 981, 'Medium', 'Binary Search'],
    ask: 'Build a store where set(key, value, timestamp) saves a value at a time, and get(key, timestamp) returns the value saved for key at the latest time at or before timestamp, or "" if there is none. Timestamps passed to set only grow. The first op creates the store; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class TimeMap:', js: 'class TimeMap {', java: 'class TimeMap {', cpp: 'class TimeMap {', go: 'type TimeMap struct {' },
    starter: {
      py: 'class TimeMap:\n    def __init__(self):\n        pass\n\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        pass\n\n    def get(self, key: str, timestamp: int) -> str:\n        pass\n',
      js: 'class TimeMap {\n  constructor() {\n  }\n  set(key, value, timestamp) {\n  }\n  get(key, timestamp) {\n  }\n}\n',
      java: 'class TimeMap {\n    public TimeMap() {\n    }\n    public void set(String key, String value, int timestamp) {\n    }\n    public String get(String key, int timestamp) {\n        return "";\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass TimeMap {\npublic:\n    TimeMap() {\n    }\n    void set(string key, string value, int timestamp) {\n    }\n    string get(string key, int timestamp) {\n        return "";\n    }\n};\n',
      go: 'package main\n\ntype TimeMap struct {\n}\n\nfunc Constructor() TimeMap {\n    return TimeMap{}\n}\n\nfunc (this *TimeMap) Set(key string, value string, timestamp int) {\n}\n\nfunc (this *TimeMap) Get(key string, timestamp int) string {\n    return ""\n}\n'
    },
    examples: [[[['TimeMap', 'set', 'set', 'get', 'get', 'get'], [[], ['mood', 'calm', 2], ['mood', 'busy', 6], ['mood', 1], ['mood', 4], ['mood', 9]]], [null, null, null, '', 'calm', 'busy']], [[['TimeMap', 'get'], [[], ['x', 5]]], [null, '']], [[['TimeMap', 'set', 'get', 'get'], [[], ['a', 'one', 3], ['a', 3], ['b', 3]]], [null, null, 'one', '']]],
    hidden: [[[['TimeMap', 'set', 'set', 'set', 'get', 'get', 'get'], [[], ['k', 'v1', 1], ['k', 'v2', 5], ['k', 'v3', 10], ['k', 5], ['k', 7], ['k', 100]]], [null, null, null, null, 'v2', 'v2', 'v3']], [[['TimeMap', 'set', 'set', 'get', 'get'], [[], ['a', 'x', 2], ['b', 'y', 3], ['a', 3], ['b', 2]]], [null, null, null, 'x', '']], [[['TimeMap', 'set', 'get'], [[], ['p', 'q', 1000], ['p', 999]]], [null, null, '']], [[['TimeMap', 'set', 'set', 'get'], [[], ['n', 'first', 1], ['n', 'second', 2], ['n', 2]]], [null, null, null, 'second']], [[['TimeMap', 'set', 'set', 'set', 'set', 'get', 'get'], [[], ['c', 'a', 1], ['c', 'b', 3], ['c', 'c', 5], ['c', 'd', 7], ['c', 4], ['c', 6]]], [null, null, null, null, null, 'b', 'c']]],
    ref: class {
      constructor() { this.m = new Map(); }
      set(key, value, timestamp) { if (!this.m.has(key)) this.m.set(key, []); this.m.get(key).push([timestamp, value]); }
      get(key, timestamp) {
        const a = this.m.get(key) || []; let lo = 0, hi = a.length;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (a[mid][0] <= timestamp) lo = mid + 1; else hi = mid; }
        return lo ? a[lo - 1][1] : '';
      }
    }
  },
  'split-array-largest-sum': {
    fn: 'splitArray', params: ['nums', 'k'], cmp: 'exact', meta: ['Split Array Largest Sum', 410, 'Hard', 'Binary Search'],
    ask: 'Cut nums into k non-empty runs of neighbouring numbers. Return the smallest possible value of the largest run sum.',
    sig: {
      py: 'def splitArray(nums: List[int], k: int) -> int:',
      js: 'function splitArray(nums, k) {',
      java: 'public int splitArray(int[] nums, int k) {',
      cpp: 'int splitArray(vector<int>& nums, int k) {',
      go: 'func splitArray(nums []int, k int) int {'
    },
    examples: [[[[3, 1, 4, 2], 2], 6], [[[5, 5, 5], 3], 5], [[[1, 2, 3], 1], 6]],
    hidden: [[[[0], 1], 0], [[[1, 4, 4], 3], 4], [[[2, 3, 1, 2, 4, 3], 3], 6], [[[10, 5, 13, 4, 8, 4, 5, 11, 14, 9, 16, 10, 20, 8], 8], 25], [[[1, 1, 1, 1, 10], 2], 10]],
    ref: function (nums, k) {
      const parts = (cap) => { let p = 1, s = 0; for (const x of nums) { if (s + x > cap) { p++; s = 0; } s += x; } return p; };
      let lo = Math.max(...nums), hi = nums.reduce((a, b) => a + b, 0);
      while (lo < hi) { const m = Math.floor((lo + hi) / 2); if (parts(m) <= k) hi = m; else lo = m + 1; }
      return lo;
    }
  },
  'median-of-two-sorted-arrays': {
    fn: 'findMedianSortedArrays', params: ['nums1', 'nums2'], cmp: 'float', meta: ['Median of Two Sorted Arrays', 4, 'Hard', 'Binary Search'],
    ask: 'Both arrays are sorted and at least one is non-empty. Return the median of all their numbers together (the mean of the middle two when the count is even). Aim for O(log(m + n)).',
    sig: {
      py: 'def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:',
      js: 'function findMedianSortedArrays(nums1, nums2) {',
      java: 'public double findMedianSortedArrays(int[] nums1, int[] nums2) {',
      cpp: 'double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {',
      go: 'func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {'
    },
    examples: [[[[1, 4], [2]], 2], [[[1, 2], [3, 10]], 2.5], [[[], [7]], 7]],
    hidden: [[[[1, 3, 5], [2, 4, 6]], 3.5], [[[0, 0], [0, 0]], 0], [[[-5, 3, 6, 12, 15], [-12, -10, -6, -3, 4, 10]], 3], [[[2], []], 2], [[[1, 2, 3, 4], [100]], 3], [[[5, 6], [1, 2, 3, 4]], 3.5]],
    ref: function (nums1, nums2) {
      let a = nums1, b = nums2;
      if (a.length > b.length) [a, b] = [b, a];
      const m = a.length, n = b.length, half = (m + n + 1) >> 1; let lo = 0, hi = m;
      while (lo <= hi) {
        const i = (lo + hi) >> 1, j = half - i;
        const aL = i ? a[i - 1] : -Infinity, aR = i < m ? a[i] : Infinity, bL = j ? b[j - 1] : -Infinity, bR = j < n ? b[j] : Infinity;
        if (aL <= bR && bL <= aR) return (m + n) % 2 ? Math.max(aL, bL) : (Math.max(aL, bL) + Math.min(aR, bR)) / 2;
        if (aL > bR) hi = i - 1; else lo = i + 1;
      }
      return 0;
    }
  },
  'transpose-matrix': {
    fn: 'transpose', params: ['matrix'], cmp: 'exact', meta: ['Transpose Matrix', 867, 'Easy', 'Matrix'],
    ask: 'Return the matrix flipped over its main diagonal: row i of the answer is column i of matrix.',
    sig: {
      py: 'def transpose(matrix: List[List[int]]) -> List[List[int]]:',
      js: 'function transpose(matrix) {',
      java: 'public int[][] transpose(int[][] matrix) {',
      cpp: 'vector<vector<int>> transpose(vector<vector<int>>& matrix) {',
      go: 'func transpose(matrix [][]int) [][]int {'
    },
    examples: [[[[[1, 2], [3, 4]]], [[1, 3], [2, 4]]], [[[[5, 6, 7]]], [[5], [6], [7]]], [[[[9]]], [[9]]]],
    hidden: [[[[[1], [2], [3]]], [[1, 2, 3]]], [[[[1, 2, 3], [4, 5, 6]]], [[1, 4], [2, 5], [3, 6]]], [[[[0, 0], [0, 0]]], [[0, 0], [0, 0]]], [[[[-1, 2], [3, -4], [5, 6]]], [[-1, 3, 5], [2, -4, 6]]], [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [[1, 4, 7], [2, 5, 8], [3, 6, 9]]]],
    ref: function (matrix) { return matrix[0].map((_, c) => matrix.map((row) => row[c])); }
  },
  'reshape-the-matrix': {
    fn: 'matrixReshape', params: ['mat', 'r', 'c'], cmp: 'exact', meta: ['Reshape the Matrix', 566, 'Easy', 'Matrix'],
    ask: 'Read mat row by row and pour the values into a new r x c matrix, row by row. If r x c does not match the number of values, return mat unchanged.',
    sig: {
      py: 'def matrixReshape(mat: List[List[int]], r: int, c: int) -> List[List[int]]:',
      js: 'function matrixReshape(mat, r, c) {',
      java: 'public int[][] matrixReshape(int[][] mat, int r, int c) {',
      cpp: 'vector<vector<int>> matrixReshape(vector<vector<int>>& mat, int r, int c) {',
      go: 'func matrixReshape(mat [][]int, r int, c int) [][]int {'
    },
    examples: [[[[[1, 2, 3, 4]], 2, 2], [[1, 2], [3, 4]]], [[[[1, 2], [3, 4]], 3, 1], [[1, 2], [3, 4]]], [[[[1, 2], [3, 4], [5, 6]], 1, 6], [[1, 2, 3, 4, 5, 6]]]],
    hidden: [[[[[7]], 1, 1], [[7]]], [[[[1, 2], [3, 4]], 4, 1], [[1], [2], [3], [4]]], [[[[1, 2, 3], [4, 5, 6]], 3, 2], [[1, 2], [3, 4], [5, 6]]], [[[[1, 2, 3], [4, 5, 6]], 2, 2], [[1, 2, 3], [4, 5, 6]]], [[[[0, 9, 8, 7]], 1, 4], [[0, 9, 8, 7]]]],
    ref: function (mat, r, c) {
      const flat = [].concat(...mat);
      if (flat.length !== r * c) return mat;
      const out = []; for (let i = 0; i < r; i++) out.push(flat.slice(i * c, i * c + c));
      return out;
    }
  },
  'matrix-diagonal-sum': {
    fn: 'diagonalSum', params: ['mat'], cmp: 'exact', meta: ['Matrix Diagonal Sum', 1572, 'Easy', 'Matrix'],
    ask: 'mat is square. Return the sum of both diagonals, counting the centre cell only once when the size is odd.',
    sig: {
      py: 'def diagonalSum(mat: List[List[int]]) -> int:',
      js: 'function diagonalSum(mat) {',
      java: 'public int diagonalSum(int[][] mat) {',
      cpp: 'int diagonalSum(vector<vector<int>>& mat) {',
      go: 'func diagonalSum(mat [][]int) int {'
    },
    examples: [[[[[1, 2], [3, 4]]], 10], [[[[7]]], 7], [[[[1, 0, 2], [0, 5, 0], [3, 0, 4]]], 15]],
    hidden: [[[[[1, 1, 1], [1, 1, 1], [1, 1, 1]]], 5], [[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]], 68], [[[[0, 0], [0, 0]]], 0], [[[[-1, 2, 3], [4, -5, 6], [7, 8, -9]]], -5], [[[[2, 0, 0, 0, 2], [0, 2, 0, 2, 0], [0, 0, 2, 0, 0], [0, 2, 0, 2, 0], [2, 0, 0, 0, 2]]], 18]],
    ref: function (mat) {
      const n = mat.length; let s = 0;
      for (let i = 0; i < n; i++) { s += mat[i][i]; if (i !== n - 1 - i) s += mat[i][n - 1 - i]; }
      return s;
    }
  },
  'pascals-triangle': {
    fn: 'generate', params: ['numRows'], cmp: 'exact', meta: ['Pascal\'s Triangle', 118, 'Easy', 'Matrix'],
    ask: 'Return the first numRows rows of Pascal\'s triangle: each row starts and ends with 1, and every other value is the sum of the two values above it.',
    sig: {
      py: 'def generate(numRows: int) -> List[List[int]]:',
      js: 'function generate(numRows) {',
      java: 'public List<List<Integer>> generate(int numRows) {',
      cpp: 'vector<vector<int>> generate(int numRows) {',
      go: 'func generate(numRows int) [][]int {'
    },
    examples: [[[1], [[1]]], [[3], [[1], [1, 1], [1, 2, 1]]], [[4], [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]]],
    hidden: [[[2], [[1], [1, 1]]], [[5], [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]], [[6], [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]]], [[8], [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1]]], [[10], [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1], [1, 8, 28, 56, 70, 56, 28, 8, 1], [1, 9, 36, 84, 126, 126, 84, 36, 9, 1]]]],
    ref: function (numRows) {
      const out = [[1]];
      for (let i = 1; i < numRows; i++) { const p = out[i - 1], row = [1]; for (let j = 1; j < i; j++) row.push(p[j - 1] + p[j]); row.push(1); out.push(row); }
      return out;
    }
  },
  'count-negative-numbers-in-a-sorted-matrix': {
    fn: 'countNegatives', params: ['grid'], cmp: 'exact', meta: ['Count Negative Numbers in a Sorted Matrix', 1351, 'Easy', 'Matrix'],
    ask: 'Every row and every column of grid is sorted from large to small. Return how many values are negative. O(rows + columns) is possible.',
    sig: {
      py: 'def countNegatives(grid: List[List[int]]) -> int:',
      js: 'function countNegatives(grid) {',
      java: 'public int countNegatives(int[][] grid) {',
      cpp: 'int countNegatives(vector<vector<int>>& grid) {',
      go: 'func countNegatives(grid [][]int) int {'
    },
    examples: [[[[[3, -1], [-2, -5]]], 3], [[[[1, 2]]], 0], [[[[-1]]], 1]],
    hidden: [[[[[5, 4, 3], [2, 1, 0]]], 0], [[[[-1, -2], [-3, -4]]], 4], [[[[4, 2, -1], [3, 1, -2], [1, -1, -3], [-2, -3, -4]]], 7], [[[[0]]], 0], [[[[7, -7, -8, -9]]], 3]],
    ref: function (grid) { let n = 0; for (const row of grid) for (const x of row) if (x < 0) n++; return n; }
  },
  'spiral-matrix-ii': {
    fn: 'generateMatrix', params: ['n'], cmp: 'exact', meta: ['Spiral Matrix II', 59, 'Medium', 'Matrix'],
    ask: 'Return an n x n matrix filled with 1 to n * n in spiral order: along the top row, down the right side, back along the bottom, up the left, and inward.',
    sig: {
      py: 'def generateMatrix(n: int) -> List[List[int]]:',
      js: 'function generateMatrix(n) {',
      java: 'public int[][] generateMatrix(int n) {',
      cpp: 'vector<vector<int>> generateMatrix(int n) {',
      go: 'func generateMatrix(n int) [][]int {'
    },
    examples: [[[1], [[1]]], [[2], [[1, 2], [4, 3]]], [[4], [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]]],
    hidden: [[[3], [[1, 2, 3], [8, 9, 4], [7, 6, 5]]], [[5], [[1, 2, 3, 4, 5], [16, 17, 18, 19, 6], [15, 24, 25, 20, 7], [14, 23, 22, 21, 8], [13, 12, 11, 10, 9]]], [[6], [[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]], [[7], [[1, 2, 3, 4, 5, 6, 7], [24, 25, 26, 27, 28, 29, 8], [23, 40, 41, 42, 43, 30, 9], [22, 39, 48, 49, 44, 31, 10], [21, 38, 47, 46, 45, 32, 11], [20, 37, 36, 35, 34, 33, 12], [19, 18, 17, 16, 15, 14, 13]]], [[8], [[1, 2, 3, 4, 5, 6, 7, 8], [28, 29, 30, 31, 32, 33, 34, 9], [27, 48, 49, 50, 51, 52, 35, 10], [26, 47, 60, 61, 62, 53, 36, 11], [25, 46, 59, 64, 63, 54, 37, 12], [24, 45, 58, 57, 56, 55, 38, 13], [23, 44, 43, 42, 41, 40, 39, 14], [22, 21, 20, 19, 18, 17, 16, 15]]]],
    ref: function (n) {
      const m = Array.from({ length: n }, () => new Array(n).fill(0));
      let top = 0, bot = n - 1, left = 0, right = n - 1, k = 1;
      while (k <= n * n) {
        for (let c = left; c <= right; c++) m[top][c] = k++;
        top++;
        for (let r = top; r <= bot; r++) m[r][right] = k++;
        right--;
        for (let c = right; c >= left && top <= bot; c--) m[bot][c] = k++;
        bot--;
        for (let r = bot; r >= top && left <= right; r--) m[r][left] = k++;
        left++;
      }
      return m;
    }
  },
  'game-of-life': {
    fn: 'gameOfLife', params: ['board'], cmp: 'exact', io: { inplace: 0 }, meta: ['Game of Life', 289, 'Medium', 'Matrix'],
    ask: 'Each cell is alive (1) or dead (0) and has up to eight neighbours. A live cell with two or three live neighbours lives on; any other live cell dies. A dead cell with exactly three live neighbours comes alive. Update board in place to the next step, with every cell changing at the same time.',
    sig: {
      py: 'def gameOfLife(board: List[List[int]]) -> None:',
      js: 'function gameOfLife(board) {',
      java: 'public void gameOfLife(int[][] board) {',
      cpp: 'void gameOfLife(vector<vector<int>>& board) {',
      go: 'func gameOfLife(board [][]int) {'
    },
    examples: [[[[[0, 1, 0], [0, 1, 0], [0, 1, 0]]], [[0, 0, 0], [1, 1, 1], [0, 0, 0]]], [[[[1, 1], [1, 1]]], [[1, 1], [1, 1]]], [[[[1]]], [[0]]]],
    hidden: [[[[[0]]], [[0]]], [[[[1, 1, 1], [1, 1, 1], [1, 1, 1]]], [[1, 0, 1], [0, 0, 0], [1, 0, 1]]], [[[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]]], [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]], [[[[1, 0, 1], [0, 0, 0], [1, 0, 1]]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]], [[[[0, 1, 0, 0], [0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0]]], [[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0]]]],
    ref: function (board) {
      const R = board.length, C = board[0].length, old = board.map((r) => r.slice());
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
        let n = 0;
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) if ((dr || dc) && old[r + dr] && old[r + dr][c + dc]) n++;
        board[r][c] = n === 3 || (old[r][c] && n === 2) ? 1 : 0;
      }
    }
  },
  'summary-ranges': {
    fn: 'summaryRanges', params: ['nums'], cmp: 'exact', meta: ['Summary Ranges', 228, 'Easy', 'Intervals'],
    ask: 'nums is sorted with no repeats. Cover it with the fewest ranges of consecutive numbers, written "a->b", or just "a" for a range of one number, in order.',
    sig: {
      py: 'def summaryRanges(nums: List[int]) -> List[str]:',
      js: 'function summaryRanges(nums) {',
      java: 'public List<String> summaryRanges(int[] nums) {',
      cpp: 'vector<string> summaryRanges(vector<int>& nums) {',
      go: 'func summaryRanges(nums []int) []string {'
    },
    examples: [[[[0, 1, 2, 5, 7, 8]], ['0->2', '5', '7->8']], [[[]], []], [[[-3]], ['-3']]],
    hidden: [[[[1, 2, 3, 4]], ['1->4']], [[[1, 3, 5, 7]], ['1', '3', '5', '7']], [[[-2, -1, 1, 2]], ['-2->-1', '1->2']], [[[10, 11, 20]], ['10->11', '20']], [[[0, 2, 3, 4, 6, 8, 9]], ['0', '2->4', '6', '8->9']]],
    ref: function (nums) {
      const out = [];
      for (let i = 0; i < nums.length; i++) {
        const a = nums[i]; while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) i++;
        out.push(a === nums[i] ? String(a) : a + '->' + nums[i]);
      }
      return out;
    }
  },
  'minimum-number-of-arrows-to-burst-balloons': {
    fn: 'findMinArrowShots', params: ['points'], cmp: 'exact', meta: ['Minimum Number of Arrows to Burst Balloons', 452, 'Medium', 'Intervals'],
    ask: 'Each balloon spans [start, end] along a line. An arrow shot at x bursts every balloon with start <= x <= end. Return the fewest arrows that burst them all.',
    sig: {
      py: 'def findMinArrowShots(points: List[List[int]]) -> int:',
      js: 'function findMinArrowShots(points) {',
      java: 'public int findMinArrowShots(int[][] points) {',
      cpp: 'int findMinArrowShots(vector<vector<int>>& points) {',
      go: 'func findMinArrowShots(points [][]int) int {'
    },
    examples: [[[[[1, 4], [2, 5], [6, 8]]], 2], [[[[1, 2], [2, 3]]], 1], [[[[1, 1], [3, 3], [5, 5]]], 3]],
    hidden: [[[[[0, 10]]], 1], [[[[1, 10], [2, 3], [4, 5], [6, 7]]], 3], [[[[-5, -1], [-3, 0], [0, 4]]], 2], [[[[3, 9], [7, 12], [3, 8], [6, 8], [9, 10], [2, 9], [0, 9], [3, 9], [0, 6], [2, 8]]], 2], [[[[1, 2], [3, 4], [5, 6], [7, 8]]], 4]],
    ref: function (points) {
      const p = points.slice().sort((a, b) => a[1] - b[1]); let n = 0, at = -Infinity;
      for (const [s, e] of p) if (s > at) { n++; at = e; }
      return n;
    }
  },
  'interval-list-intersections': {
    fn: 'intervalIntersection', params: ['firstList', 'secondList'], cmp: 'exact', meta: ['Interval List Intersections', 986, 'Medium', 'Intervals'],
    ask: 'Each list holds closed intervals that are sorted and do not overlap each other. Return every intersection between an interval of the first list and one of the second, in order.',
    sig: {
      py: 'def intervalIntersection(firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:',
      js: 'function intervalIntersection(firstList, secondList) {',
      java: 'public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {',
      cpp: 'vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {',
      go: 'func intervalIntersection(firstList [][]int, secondList [][]int) [][]int {'
    },
    examples: [[[[[1, 4], [6, 9]], [[3, 7]]], [[3, 4], [6, 7]]], [[[[1, 2]], []], []], [[[[5, 5]], [[5, 8]]], [[5, 5]]]],
    hidden: [[[[], []], []], [[[[0, 10]], [[1, 2], [4, 5], [9, 12]]], [[1, 2], [4, 5], [9, 10]]], [[[[1, 3], [5, 7]], [[3, 5]]], [[3, 3], [5, 5]]], [[[[1, 2], [8, 9]], [[3, 7]]], []], [[[[2, 6], [8, 12], [15, 20]], [[1, 3], [5, 9], [11, 16], [19, 25]]], [[2, 3], [5, 6], [8, 9], [11, 12], [15, 16], [19, 20]]]],
    ref: function (firstList, secondList) {
      const out = []; let i = 0, j = 0;
      while (i < firstList.length && j < secondList.length) {
        const lo = Math.max(firstList[i][0], secondList[j][0]), hi = Math.min(firstList[i][1], secondList[j][1]);
        if (lo <= hi) out.push([lo, hi]);
        if (firstList[i][1] < secondList[j][1]) i++; else j++;
      }
      return out;
    }
  },
  'car-pooling': {
    fn: 'carPooling', params: ['trips', 'capacity'], cmp: 'exact', meta: ['Car Pooling', 1094, 'Medium', 'Intervals'],
    ask: 'A car drives east only. trips[i] = [passengers, from, to]: pick them up at km from and drop them at km to. Return true if the car never carries more than capacity people at once.',
    sig: {
      py: 'def carPooling(trips: List[List[int]], capacity: int) -> bool:',
      js: 'function carPooling(trips, capacity) {',
      java: 'public boolean carPooling(int[][] trips, int capacity) {',
      cpp: 'bool carPooling(vector<vector<int>>& trips, int capacity) {',
      go: 'func carPooling(trips [][]int, capacity int) bool {'
    },
    examples: [[[[[2, 0, 3], [3, 2, 5]], 4], false], [[[[2, 0, 3], [3, 3, 5]], 3], true], [[[[1, 1, 2]], 1], true]],
    hidden: [[[[[5, 0, 1]], 4], false], [[[[1, 0, 10], [1, 1, 9], [1, 2, 8]], 3], true], [[[[1, 0, 10], [1, 1, 9], [1, 2, 8]], 2], false], [[[[3, 5, 9], [2, 1, 5], [4, 9, 12]], 4], true], [[[[2, 1, 4], [2, 3, 6], [2, 5, 8]], 4], true]],
    ref: function (trips, capacity) {
      const ev = [];
      for (const [p, a, b] of trips) { ev.push([a, p]); ev.push([b, -p]); }
      ev.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
      let load = 0; for (const [, d] of ev) { load += d; if (load > capacity) return false; }
      return true;
    }
  },
  'my-calendar-i': {
    fn: 'MyCalendar', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['My Calendar I', 729, 'Medium', 'Intervals'],
    ask: 'Build a calendar. book(startTime, endTime) adds the half-open event [startTime, endTime) and returns true, unless it would overlap an event already booked; then it returns false and adds nothing. The first op creates the calendar; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class MyCalendar:', js: 'class MyCalendar {', java: 'class MyCalendar {', cpp: 'class MyCalendar {', go: 'type MyCalendar struct {' },
    starter: {
      py: 'class MyCalendar:\n    def __init__(self):\n        pass\n\n    def book(self, startTime: int, endTime: int) -> bool:\n        pass\n',
      js: 'class MyCalendar {\n  constructor() {\n  }\n  book(startTime, endTime) {\n  }\n}\n',
      java: 'class MyCalendar {\n    public MyCalendar() {\n    }\n    public boolean book(int startTime, int endTime) {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyCalendar {\npublic:\n    MyCalendar() {\n    }\n    bool book(int startTime, int endTime) {\n        return false;\n    }\n};\n',
      go: 'package main\n\ntype MyCalendar struct {\n}\n\nfunc Constructor() MyCalendar {\n    return MyCalendar{}\n}\n\nfunc (this *MyCalendar) Book(startTime int, endTime int) bool {\n    return false\n}\n'
    },
    examples: [[[['MyCalendar', 'book', 'book', 'book'], [[], [5, 10], [8, 12], [10, 15]]], [null, true, false, true]], [[['MyCalendar', 'book', 'book'], [[], [0, 1], [0, 1]]], [null, true, false]], [[['MyCalendar', 'book', 'book', 'book'], [[], [20, 30], [10, 20], [15, 25]]], [null, true, true, false]]],
    hidden: [[[['MyCalendar', 'book'], [[], [3, 4]]], [null, true]], [[['MyCalendar', 'book', 'book', 'book', 'book'], [[], [10, 20], [1, 5], [5, 10], [4, 6]]], [null, true, true, true, false]], [[['MyCalendar', 'book', 'book'], [[], [0, 100], [50, 51]]], [null, true, false]], [[['MyCalendar', 'book', 'book', 'book'], [[], [50, 60], [40, 51], [59, 70]]], [null, true, false, false]], [[['MyCalendar', 'book', 'book', 'book', 'book'], [[], [1, 2], [2, 3], [3, 4], [0, 5]]], [null, true, true, true, false]]],
    ref: class {
      constructor() { this.ev = []; }
      book(startTime, endTime) {
        for (const [s, e] of this.ev) if (startTime < e && s < endTime) return false;
        this.ev.push([startTime, endTime]);
        return true;
      }
    }
  },
  'remove-covered-intervals': {
    fn: 'removeCoveredIntervals', params: ['intervals'], cmp: 'exact', meta: ['Remove Covered Intervals', 1288, 'Medium', 'Intervals'],
    ask: 'An interval [a, b] is covered by [c, d] when c <= a and b <= d. Remove every interval covered by another one and return how many are left. No two intervals are identical.',
    sig: {
      py: 'def removeCoveredIntervals(intervals: List[List[int]]) -> int:',
      js: 'function removeCoveredIntervals(intervals) {',
      java: 'public int removeCoveredIntervals(int[][] intervals) {',
      cpp: 'int removeCoveredIntervals(vector<vector<int>>& intervals) {',
      go: 'func removeCoveredIntervals(intervals [][]int) int {'
    },
    examples: [[[[[1, 5], [2, 4], [6, 8]]], 2], [[[[1, 3], [1, 6]]], 1], [[[[1, 2], [3, 4]]], 2]],
    hidden: [[[[[0, 10]]], 1], [[[[1, 10], [2, 9], [3, 8], [4, 7]]], 1], [[[[1, 4], [2, 5], [3, 6]]], 3], [[[[3, 10], [4, 10], [5, 11]]], 2], [[[[1, 2], [1, 4], [3, 4]]], 1]],
    ref: function (intervals) {
      const a = intervals.slice().sort((x, y) => x[0] - y[0] || y[1] - x[1]); let n = 0, end = -Infinity;
      for (const [, e] of a) if (e > end) { n++; end = e; }
      return n;
    }
  },
  'assign-cookies': {
    fn: 'findContentChildren', params: ['g', 's'], cmp: 'exact', meta: ['Assign Cookies', 455, 'Easy', 'Greedy'],
    ask: 'Child i is happy with a cookie of size at least g[i], and s[j] is the size of cookie j. Each child gets at most one cookie. Return the most children you can make happy.',
    sig: {
      py: 'def findContentChildren(g: List[int], s: List[int]) -> int:',
      js: 'function findContentChildren(g, s) {',
      java: 'public int findContentChildren(int[] g, int[] s) {',
      cpp: 'int findContentChildren(vector<int>& g, vector<int>& s) {',
      go: 'func findContentChildren(g []int, s []int) int {'
    },
    examples: [[[[1, 3], [2]], 1], [[[2, 2], [1, 1]], 0], [[[1, 2, 3], [3, 2, 1]], 3]],
    hidden: [[[[], [1, 2]], 0], [[[5], []], 0], [[[1, 1, 1], [1]], 1], [[[4, 2, 7], [3, 3, 8, 1]], 2], [[[10, 9, 8, 7], [5, 6, 7, 8]], 2]],
    ref: function (g, s) {
      const a = g.slice().sort((x, y) => x - y), b = s.slice().sort((x, y) => x - y); let i = 0;
      for (let j = 0; j < b.length && i < a.length; j++) if (b[j] >= a[i]) i++;
      return i;
    }
  },
  'lemonade-change': {
    fn: 'lemonadeChange', params: ['bills'], cmp: 'exact', meta: ['Lemonade Change', 860, 'Easy', 'Greedy'],
    ask: 'Lemonade costs 5. Customers pay in order with a 5, 10 or 20 bill, and you start with no change. Return true if you can give every customer the right change.',
    sig: {
      py: 'def lemonadeChange(bills: List[int]) -> bool:',
      js: 'function lemonadeChange(bills) {',
      java: 'public boolean lemonadeChange(int[] bills) {',
      cpp: 'bool lemonadeChange(vector<int>& bills) {',
      go: 'func lemonadeChange(bills []int) bool {'
    },
    examples: [[[[5, 10, 5, 20]], true], [[[10]], false], [[[5, 5, 10, 10, 20]], false]],
    hidden: [[[[5]], true], [[[5, 5, 5, 20]], true], [[[5, 20]], false], [[[5, 5, 10, 20, 5, 5, 5, 5, 20, 10]], true], [[[5, 10, 10]], false]],
    ref: function (bills) {
      let five = 0, ten = 0;
      for (const b of bills) {
        if (b === 5) five++;
        else if (b === 10) { if (!five) return false; five--; ten++; }
        else if (ten && five) { ten--; five--; }
        else if (five >= 3) five -= 3;
        else return false;
      }
      return true;
    }
  },
  'can-place-flowers': {
    fn: 'canPlaceFlowers', params: ['flowerbed', 'n'], cmp: 'exact', meta: ['Can Place Flowers', 605, 'Easy', 'Greedy'],
    ask: 'flowerbed holds 0 (empty) and 1 (planted), and no two planted plots touch. Return true if n more flowers can be planted without any two flowers in neighbouring plots.',
    sig: {
      py: 'def canPlaceFlowers(flowerbed: List[int], n: int) -> bool:',
      js: 'function canPlaceFlowers(flowerbed, n) {',
      java: 'public boolean canPlaceFlowers(int[] flowerbed, int n) {',
      cpp: 'bool canPlaceFlowers(vector<int>& flowerbed, int n) {',
      go: 'func canPlaceFlowers(flowerbed []int, n int) bool {'
    },
    examples: [[[[0, 0, 1, 0, 0], 1], true], [[[0, 0, 1, 0, 0], 3], false], [[[1, 0, 1], 1], false]],
    hidden: [[[[0], 1], true], [[[1], 0], true], [[[0, 0], 2], false], [[[0, 0, 0, 0, 0], 3], true], [[[1, 0, 0, 0, 1, 0, 0], 2], true]],
    ref: function (flowerbed, n) {
      const f = flowerbed.slice(); let c = 0;
      for (let i = 0; i < f.length; i++) if (!f[i] && !f[i - 1] && !f[i + 1]) { f[i] = 1; c++; }
      return c >= n;
    }
  },
  'split-a-string-in-balanced-strings': {
    fn: 'balancedStringSplit', params: ['s'], cmp: 'exact', meta: ['Split a String in Balanced Strings', 1221, 'Easy', 'Greedy'],
    ask: 's holds as many L as R letters. Cut it into the most pieces where every piece also holds as many L as R. Return that number.',
    sig: {
      py: 'def balancedStringSplit(s: str) -> int:',
      js: 'function balancedStringSplit(s) {',
      java: 'public int balancedStringSplit(String s) {',
      cpp: 'int balancedStringSplit(string s) {',
      go: 'func balancedStringSplit(s string) int {'
    },
    examples: [[['RLLR'], 2], [['RRLL'], 1], [['LRLRRL'], 3]],
    hidden: [[['LR'], 1], [['LLLRRR'], 1], [['RLRLRLRL'], 4], [['LLRRLR'], 2], [['RRLRLL'], 1]],
    ref: function (s) { let b = 0, n = 0; for (const c of s) { b += c === 'L' ? 1 : -1; if (!b) n++; } return n; }
  },
  'maximum-units-on-a-truck': {
    fn: 'maximumUnits', params: ['boxTypes', 'truckSize'], cmp: 'exact', meta: ['Maximum Units on a Truck', 1710, 'Easy', 'Greedy'],
    ask: 'boxTypes[i] = [count, units]: there are count boxes of this kind, each holding units units. The truck takes at most truckSize boxes. Return the most units it can carry.',
    sig: {
      py: 'def maximumUnits(boxTypes: List[List[int]], truckSize: int) -> int:',
      js: 'function maximumUnits(boxTypes, truckSize) {',
      java: 'public int maximumUnits(int[][] boxTypes, int truckSize) {',
      cpp: 'int maximumUnits(vector<vector<int>>& boxTypes, int truckSize) {',
      go: 'func maximumUnits(boxTypes [][]int, truckSize int) int {'
    },
    examples: [[[[[2, 5], [3, 1]], 3], 11], [[[[1, 9]], 5], 9], [[[[4, 2], [2, 7]], 4], 18]],
    hidden: [[[[[1, 1]], 1], 1], [[[[3, 3], [3, 3]], 4], 12], [[[[5, 10], [2, 5], [4, 7], [3, 9]], 10], 91], [[[[2, 1], [1, 100]], 2], 101], [[[[10, 1]], 3], 3]],
    ref: function (boxTypes, truckSize) {
      const b = boxTypes.slice().sort((x, y) => y[1] - x[1]); let left = truckSize, total = 0;
      for (const [c, u] of b) { const t = Math.min(c, left); total += t * u; left -= t; }
      return total;
    }
  },
  'best-time-to-buy-and-sell-stock-ii': {
    fn: 'maxProfit', params: ['prices'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock II', 122, 'Medium', 'Greedy'],
    ask: 'prices[i] is a share price on day i. You may hold at most one share at a time but may buy and sell as often as you like (even sell and buy on the same day). Return the most profit possible.',
    sig: {
      py: 'def maxProfit(prices: List[int]) -> int:',
      js: 'function maxProfit(prices) {',
      java: 'public int maxProfit(int[] prices) {',
      cpp: 'int maxProfit(vector<int>& prices) {',
      go: 'func maxProfit(prices []int) int {'
    },
    examples: [[[[3, 6, 2, 8]], 9], [[[9, 7, 1]], 0], [[[1, 2, 3, 4]], 3]],
    hidden: [[[[5]], 0], [[[1, 5, 1, 5, 1, 5]], 12], [[[2, 2, 2]], 0], [[[6, 1, 3, 2, 4, 7]], 7], [[[10, 1, 10]], 9]],
    ref: function (prices) { let p = 0; for (let i = 1; i < prices.length; i++) p += Math.max(0, prices[i] - prices[i - 1]); return p; }
  },
  'minimum-add-to-make-parentheses-valid': {
    fn: 'minAddToMakeValid', params: ['s'], cmp: 'exact', meta: ['Minimum Add to Make Parentheses Valid', 921, 'Medium', 'Greedy'],
    ask: 's holds only ( and ). Return the fewest brackets you must insert anywhere to make it balanced.',
    sig: {
      py: 'def minAddToMakeValid(s: str) -> int:',
      js: 'function minAddToMakeValid(s) {',
      java: 'public int minAddToMakeValid(String s) {',
      cpp: 'int minAddToMakeValid(string s) {',
      go: 'func minAddToMakeValid(s string) int {'
    },
    examples: [[['(()'], 1], [['))(('], 4], [['()()'], 0]],
    hidden: [[[''], 0], [[')'], 1], [['((('], 3], [['())('], 2], [['(()))('], 2]],
    ref: function (s) { let open = 0, add = 0; for (const c of s) { if (c === '(') open++; else if (open) open--; else add++; } return add + open; }
  },
  'increasing-triplet-subsequence': {
    fn: 'increasingTriplet', params: ['nums'], cmp: 'exact', meta: ['Increasing Triplet Subsequence', 334, 'Medium', 'Greedy'],
    ask: 'Return true if there are positions i < j < k with nums[i] < nums[j] < nums[k]. O(n) time and O(1) space is possible.',
    sig: {
      py: 'def increasingTriplet(nums: List[int]) -> bool:',
      js: 'function increasingTriplet(nums) {',
      java: 'public boolean increasingTriplet(int[] nums) {',
      cpp: 'bool increasingTriplet(vector<int>& nums) {',
      go: 'func increasingTriplet(nums []int) bool {'
    },
    examples: [[[[5, 1, 6, 2, 7]], true], [[[4, 3, 2, 1]], false], [[[2, 4, 1, 3]], false]],
    hidden: [[[[1, 2]], false], [[[1, 1, 1, 1]], false], [[[1, 2, 3]], true], [[[6, 7, 1, 2, 0, 3]], true], [[[3, 1, 2, 1, 1]], false], [[[9, 10, 5, 11]], true]],
    ref: function (nums) {
      let a = Infinity, b = Infinity;
      for (const x of nums) { if (x <= a) a = x; else if (x <= b) b = x; else return true; }
      return false;
    }
  },
  'hand-of-straights': {
    fn: 'isNStraightHand', params: ['hand', 'groupSize'], cmp: 'exact', meta: ['Hand of Straights', 846, 'Medium', 'Greedy'],
    ask: 'Return true if the cards in hand can be split into groups of groupSize cards, where each group is groupSize consecutive numbers.',
    sig: {
      py: 'def isNStraightHand(hand: List[int], groupSize: int) -> bool:',
      js: 'function isNStraightHand(hand, groupSize) {',
      java: 'public boolean isNStraightHand(int[] hand, int groupSize) {',
      cpp: 'bool isNStraightHand(vector<int>& hand, int groupSize) {',
      go: 'func isNStraightHand(hand []int, groupSize int) bool {'
    },
    examples: [[[[1, 2, 3, 3, 4, 5], 3], true], [[[1, 2, 4], 3], false], [[[5, 6], 1], true]],
    hidden: [[[[1, 2, 3, 4], 3], false], [[[8, 10, 9, 7, 11, 12], 2], true], [[[1, 1, 2, 2, 3, 3], 3], true], [[[1, 1, 2, 3], 2], false], [[[4, 5, 6, 6, 7, 8], 3], true]],
    ref: function (hand, groupSize) {
      if (hand.length % groupSize) return false;
      const c = new Map(); for (const x of hand) c.set(x, (c.get(x) || 0) + 1);
      for (const x of [...c.keys()].sort((a, b) => a - b)) {
        const n = c.get(x); if (!n) continue;
        for (let k = 0; k < groupSize; k++) { if ((c.get(x + k) || 0) < n) return false; c.set(x + k, c.get(x + k) - n); }
      }
      return true;
    }
  },
  'valid-parenthesis-string': {
    fn: 'checkValidString', params: ['s'], cmp: 'exact', meta: ['Valid Parenthesis String', 678, 'Medium', 'Greedy'],
    ask: 's holds (, ) and *. Each * may stand for (, for ), or for nothing. Return true if some choice makes the brackets balanced.',
    sig: {
      py: 'def checkValidString(s: str) -> bool:',
      js: 'function checkValidString(s) {',
      java: 'public boolean checkValidString(String s) {',
      cpp: 'bool checkValidString(string s) {',
      go: 'func checkValidString(s string) bool {'
    },
    examples: [[['(*'], true], [['*)('], false], [['((*)'], true]],
    hidden: [[[''], true], [['*'], true], [['(()'], false], [['(*))'], true], [['((*'], false], [[')*'], false], [['*(**)*)'], true]],
    ref: function (s) {
      let lo = 0, hi = 0;
      for (const c of s) {
        if (c === '(') { lo++; hi++; } else if (c === ')') { lo--; hi--; } else { lo--; hi++; }
        if (hi < 0) return false;
        if (lo < 0) lo = 0;
      }
      return lo === 0;
    }
  },
  'task-scheduler': {
    fn: 'leastInterval', params: ['tasks', 'n'], cmp: 'exact', meta: ['Task Scheduler', 621, 'Medium', 'Greedy'],
    ask: 'Each task takes one time unit, and two runs of the same letter must be at least n units apart (idle units are allowed). Return the fewest units needed to run every task.',
    sig: {
      py: 'def leastInterval(tasks: List[str], n: int) -> int:',
      js: 'function leastInterval(tasks, n) {',
      java: 'public int leastInterval(char[] tasks, int n) {',
      cpp: 'int leastInterval(vector<char>& tasks, int n) {',
      go: 'func leastInterval(tasks []byte, n int) int {'
    },
    examples: [[[['A', 'A', 'B'], 2], 4], [[['A', 'B', 'C'], 3], 3], [[['A', 'A', 'A'], 1], 5]],
    hidden: [[[['X'], 5], 1], [[['A', 'A', 'B', 'B'], 0], 4], [[['A', 'A', 'A', 'B', 'B', 'B', 'C', 'D'], 2], 8], [[['Q', 'Q', 'Q', 'Q', 'R'], 3], 13], [[['A', 'B', 'A', 'B', 'C', 'C', 'D', 'E', 'F'], 1], 9]],
    ref: function (tasks, n) {
      const c = {}; for (const t of tasks) c[t] = (c[t] || 0) + 1;
      const v = Object.values(c), top = Math.max(...v), ties = v.filter((x) => x === top).length;
      return Math.max(tasks.length, (top - 1) * (n + 1) + ties);
    }
  },
  'candy': {
    fn: 'candy', params: ['ratings'], cmp: 'exact', meta: ['Candy', 135, 'Hard', 'Greedy'],
    ask: 'Children stand in a line with ratings. Each child gets at least one candy, and a child with a higher rating than a neighbour gets more candy than that neighbour. Return the fewest candies needed.',
    sig: {
      py: 'def candy(ratings: List[int]) -> int:',
      js: 'function candy(ratings) {',
      java: 'public int candy(int[] ratings) {',
      cpp: 'int candy(vector<int>& ratings) {',
      go: 'func candy(ratings []int) int {'
    },
    examples: [[[[1, 3, 2]], 4], [[[2, 2, 2]], 3], [[[5, 4, 3]], 6]],
    hidden: [[[[7]], 1], [[[1, 2, 3, 4]], 10], [[[1, 3, 4, 5, 2]], 11], [[[1, 2, 2]], 4], [[[3, 1, 3, 1, 3]], 8], [[[1, 6, 10, 8, 7, 3, 2]], 18]],
    ref: function (ratings) {
      const n = ratings.length, c = new Array(n).fill(1);
      for (let i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;
      for (let i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
      return c.reduce((a, b) => a + b, 0);
    }
  },
  'merge-triplets-to-form-target-triplet': {
    fn: 'mergeTriplets', params: ['triplets', 'target'], cmp: 'exact', meta: ['Merge Triplets to Form Target Triplet', 1899, 'Medium', 'Greedy'],
    ask: 'Merging two triplets keeps the larger value in each of the three places. Return true if merging some of the triplets (any number of times) can produce exactly target.',
    sig: {
      py: 'def mergeTriplets(triplets: List[List[int]], target: List[int]) -> bool:',
      js: 'function mergeTriplets(triplets, target) {',
      java: 'public boolean mergeTriplets(int[][] triplets, int[] target) {',
      cpp: 'bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {',
      go: 'func mergeTriplets(triplets [][]int, target []int) bool {'
    },
    examples: [[[[[1, 2, 3], [3, 1, 2]], [3, 2, 3]], true], [[[[4, 1, 1]], [3, 1, 1]], false], [[[[1, 1, 1], [1, 5, 1]], [1, 5, 1]], true]],
    hidden: [[[[[2, 2, 2]], [2, 2, 2]], true], [[[[1, 2, 1], [2, 1, 2]], [2, 2, 1]], false], [[[[5, 1, 1], [1, 5, 1], [1, 1, 5]], [5, 5, 5]], true], [[[[3, 4, 5], [4, 5, 6]], [3, 2, 5]], false], [[[[1, 3, 1], [1, 1, 3], [9, 9, 9]], [1, 3, 3]], true]],
    ref: function (triplets, target) {
      const got = [false, false, false];
      for (const t of triplets) if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) t.forEach((x, i) => { if (x === target[i]) got[i] = true; });
      return got.every(Boolean);
    }
  },
  'baseball-game': {
    fn: 'calPoints', params: ['operations'], cmp: 'exact', meta: ['Baseball Game', 682, 'Easy', 'Stack'],
    ask: 'Keep a score list. An integer adds that score, "+" adds the sum of the last two scores, "D" adds double the last score, and "C" removes the last score. Return the sum of the final list.',
    sig: {
      py: 'def calPoints(operations: List[str]) -> int:',
      js: 'function calPoints(operations) {',
      java: 'public int calPoints(String[] operations) {',
      cpp: 'int calPoints(vector<string>& operations) {',
      go: 'func calPoints(operations []string) int {'
    },
    examples: [[[['4', 'C', '7']], 7], [[['2', '3', '+', 'D']], 20], [[['1', 'C']], 0]],
    hidden: [[[['-5']], -5], [[['1', '2', '+', '+', '+']], 19], [[['3', 'D', 'D', 'C']], 9], [[['10', '-3', '+', 'C', 'D']], 1], [[['0', '0', '+', 'D']], 0]],
    ref: function (operations) {
      const s = [];
      for (const op of operations) {
        if (op === '+') s.push(s[s.length - 1] + s[s.length - 2]);
        else if (op === 'D') s.push(2 * s[s.length - 1]);
        else if (op === 'C') s.pop();
        else s.push(Number(op));
      }
      return s.reduce((a, b) => a + b, 0);
    }
  },
  'remove-all-adjacent-duplicates-in-string': {
    fn: 'removeDuplicates', params: ['s'], cmp: 'exact', meta: ['Remove All Adjacent Duplicates In String', 1047, 'Easy', 'Stack'],
    ask: 'While s has two equal letters side by side, delete that pair. Return what is left (the result is unique).',
    sig: {
      py: 'def removeDuplicates(s: str) -> str:',
      js: 'function removeDuplicates(s) {',
      java: 'public String removeDuplicates(String s) {',
      cpp: 'string removeDuplicates(string s) {',
      go: 'func removeDuplicates(s string) string {'
    },
    examples: [[['abba'], ''], [['xyyxz'], 'z'], [['abc'], 'abc']],
    hidden: [[['a'], 'a'], [['aa'], ''], [['aabbcc'], ''], [['abccbad'], 'd'], [['mississippi'], 'm']],
    ref: function (s) { const st = []; for (const c of s) { if (st[st.length - 1] === c) st.pop(); else st.push(c); } return st.join(''); }
  },
  'make-the-string-great': {
    fn: 'makeGood', params: ['s'], cmp: 'exact', meta: ['Make The String Great', 1544, 'Easy', 'Stack'],
    ask: 'While s has two neighbouring characters that are the same letter in different case (like "aA" or "Bb"), delete them. Return what is left.',
    sig: {
      py: 'def makeGood(s: str) -> str:',
      js: 'function makeGood(s) {',
      java: 'public String makeGood(String s) {',
      cpp: 'string makeGood(string s) {',
      go: 'func makeGood(s string) string {'
    },
    examples: [[['aAb'], 'b'], [['XxYyz'], 'z'], [['ab'], 'ab']],
    hidden: [[[''], ''], [['Aa'], ''], [['abBA'], ''], [['aa'], 'aa'], [['cCdDeEfF'], ''], [['xYyXz'], 'z']],
    ref: function (s) {
      const st = [];
      for (const c of s) { const t = st[st.length - 1]; if (t && t !== c && t.toLowerCase() === c.toLowerCase()) st.pop(); else st.push(c); }
      return st.join('');
    }
  },
  'next-greater-element-i': {
    fn: 'nextGreaterElement', params: ['nums1', 'nums2'], cmp: 'exact', meta: ['Next Greater Element I', 496, 'Easy', 'Stack'],
    ask: 'nums1 is a subset of nums2, and all values are distinct. For each value x in nums1, find x in nums2 and return the first bigger value to its right, or -1 if there is none.',
    sig: {
      py: 'def nextGreaterElement(nums1: List[int], nums2: List[int]) -> List[int]:',
      js: 'function nextGreaterElement(nums1, nums2) {',
      java: 'public int[] nextGreaterElement(int[] nums1, int[] nums2) {',
      cpp: 'vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {',
      go: 'func nextGreaterElement(nums1 []int, nums2 []int) []int {'
    },
    examples: [[[[2, 5], [5, 2, 7]], [7, 7]], [[[3], [3, 1]], [-1]], [[[4, 1], [1, 4, 2]], [-1, 4]]],
    hidden: [[[[], [1]], []], [[[1, 2, 3], [1, 2, 3]], [2, 3, -1]], [[[3, 2, 1], [3, 2, 1]], [-1, -1, -1]], [[[6, 0], [0, 9, 6, 8]], [8, 9]], [[[5, 8, 2], [8, 2, 5, 1, 9]], [9, 9, 5]]],
    ref: function (nums1, nums2) {
      const next = new Map(), st = [];
      for (const x of nums2) { while (st.length && st[st.length - 1] < x) next.set(st.pop(), x); st.push(x); }
      return nums1.map((x) => (next.has(x) ? next.get(x) : -1));
    }
  },
  'implement-queue-using-stacks': {
    fn: 'MyQueue', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Implement Queue using Stacks', 232, 'Easy', 'Stack'],
    ask: 'Build a first-in, first-out queue using only stack moves (push to top, pop from top, look at top, size). push(x) adds to the back, pop() removes and returns the front, peek() returns the front, empty() says whether it is empty. The first op creates the queue; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class MyQueue:', js: 'class MyQueue {', java: 'class MyQueue {', cpp: 'class MyQueue {', go: 'type MyQueue struct {' },
    starter: {
      py: 'class MyQueue:\n    def __init__(self):\n        pass\n\n    def push(self, x: int) -> None:\n        pass\n\n    def pop(self) -> int:\n        pass\n\n    def peek(self) -> int:\n        pass\n\n    def empty(self) -> bool:\n        pass\n',
      js: 'class MyQueue {\n  constructor() {\n  }\n  push(x) {\n  }\n  pop() {\n  }\n  peek() {\n  }\n  empty() {\n  }\n}\n',
      java: 'class MyQueue {\n    public MyQueue() {\n    }\n    public void push(int x) {\n    }\n    public int pop() {\n        return 0;\n    }\n    public int peek() {\n        return 0;\n    }\n    public boolean empty() {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyQueue {\npublic:\n    MyQueue() {\n    }\n    void push(int x) {\n    }\n    int pop() {\n        return 0;\n    }\n    int peek() {\n        return 0;\n    }\n    bool empty() {\n        return false;\n    }\n};\n',
      go: 'package main\n\ntype MyQueue struct {\n}\n\nfunc Constructor() MyQueue {\n    return MyQueue{}\n}\n\nfunc (this *MyQueue) Push(x int) {\n}\n\nfunc (this *MyQueue) Pop() int {\n    return 0\n}\n\nfunc (this *MyQueue) Peek() int {\n    return 0\n}\n\nfunc (this *MyQueue) Empty() bool {\n    return false\n}\n'
    },
    examples: [[[['MyQueue', 'push', 'push', 'peek', 'pop', 'empty'], [[], [7], [9], [], [], []]], [null, null, null, 7, 7, false]], [[['MyQueue', 'empty'], [[], []]], [null, true]], [[['MyQueue', 'push', 'pop', 'push', 'push', 'pop', 'pop', 'empty'], [[], [1], [], [2], [3], [], [], []]], [null, null, 1, null, null, 2, 3, true]]],
    hidden: [[[['MyQueue', 'push', 'peek', 'peek'], [[], [4], [], []]], [null, null, 4, 4]], [[['MyQueue', 'push', 'push', 'push', 'pop', 'push', 'pop', 'pop', 'pop'], [[], [1], [2], [3], [], [4], [], [], []]], [null, null, null, null, 1, null, 2, 3, 4]], [[['MyQueue', 'push', 'empty', 'pop', 'empty'], [[], [-8], [], [], []]], [null, null, false, -8, true]], [[['MyQueue', 'push', 'push', 'pop', 'peek'], [[], [5], [6], [], []]], [null, null, null, 5, 6]], [[['MyQueue', 'push', 'pop', 'push', 'peek', 'push', 'pop', 'peek'], [[], [10], [], [20], [], [30], [], []]], [null, null, 10, null, 20, null, 20, 30]]],
    ref: class {
      constructor() { this.a = []; this.b = []; }
      move() { if (!this.b.length) while (this.a.length) this.b.push(this.a.pop()); }
      push(x) { this.a.push(x); }
      pop() { this.move(); return this.b.pop(); }
      peek() { this.move(); return this.b[this.b.length - 1]; }
      empty() { return !this.a.length && !this.b.length; }
    }
  },
  'removing-stars-from-a-string': {
    fn: 'removeStars', params: ['s'], cmp: 'exact', meta: ['Removing Stars From a String', 2390, 'Medium', 'Stack'],
    ask: 'Each * in s deletes itself and the closest letter to its left that is still there. There is always such a letter. Return the string after every star is used.',
    sig: {
      py: 'def removeStars(s: str) -> str:',
      js: 'function removeStars(s) {',
      java: 'public String removeStars(String s) {',
      cpp: 'string removeStars(string s) {',
      go: 'func removeStars(s string) string {'
    },
    examples: [[['ab*c'], 'ac'], [['xy**'], ''], [['a*b*c'], 'c']],
    hidden: [[['abc'], 'abc'], [['a*'], ''], [['abc*de**f'], 'abf'], [['zz*z*z'], 'zz'], [['hello**p*w'], 'helw']],
    ref: function (s) { const st = []; for (const c of s) { if (c === '*') st.pop(); else st.push(c); } return st.join(''); }
  },
  'simplify-path': {
    fn: 'simplifyPath', params: ['path'], cmp: 'exact', meta: ['Simplify Path', 71, 'Medium', 'Stack'],
    ask: 'path is an absolute Unix path. "." means this folder, ".." means the parent (staying at the root if already there), and repeated slashes count as one. Return the simplest path: it starts with one slash, has single slashes between names, and no slash at the end.',
    sig: {
      py: 'def simplifyPath(path: str) -> str:',
      js: 'function simplifyPath(path) {',
      java: 'public String simplifyPath(String path) {',
      cpp: 'string simplifyPath(string path) {',
      go: 'func simplifyPath(path string) string {'
    },
    examples: [[['/docs//notes/'], '/docs/notes'], [['/a/./b/../c'], '/a/c'], [['/../'], '/']],
    hidden: [[['/'], '/'], [['/x/y/z/../../w'], '/x/w'], [['/.../a'], '/.../a'], [['//home//user///'], '/home/user'], [['/a/../../b/./c/..'], '/b'], [['/..hidden/.'], '/..hidden']],
    ref: function (path) {
      const st = [];
      for (const p of path.split('/')) { if (p === '..') st.pop(); else if (p && p !== '.') st.push(p); }
      return '/' + st.join('/');
    }
  },
  'decode-string': {
    fn: 'decodeString', params: ['s'], cmp: 'exact', meta: ['Decode String', 394, 'Medium', 'Stack'],
    ask: 'k[text] means text repeated k times, and brackets can nest. Return the fully decoded string.',
    sig: {
      py: 'def decodeString(s: str) -> str:',
      js: 'function decodeString(s) {',
      java: 'public String decodeString(String s) {',
      cpp: 'string decodeString(string s) {',
      go: 'func decodeString(s string) string {'
    },
    examples: [[['2[ab]c'], 'ababc'], [['3[x2[y]]'], 'xyyxyyxyy'], [['k'], 'k']],
    hidden: [[['10[a]'], 'aaaaaaaaaa'], [['ab2[c]d3[e]'], 'abccdeee'], [['2[2[2[z]]]'], 'zzzzzzzz'], [['1[pq]r'], 'pqr'], [['x3[]y'], 'xy']],
    ref: function (s) {
      const st = []; let cur = '', num = 0;
      for (const c of s) {
        if (c >= '0' && c <= '9') num = num * 10 + Number(c);
        else if (c === '[') { st.push([cur, num]); cur = ''; num = 0; }
        else if (c === ']') { const [prev, k] = st.pop(); cur = prev + cur.repeat(k); }
        else cur += c;
      }
      return cur;
    }
  },
  'asteroid-collision': {
    fn: 'asteroidCollision', params: ['asteroids'], cmp: 'exact', meta: ['Asteroid Collision', 735, 'Medium', 'Stack'],
    ask: 'Each asteroid moves at the same speed: positive to the right, negative to the left, and its absolute value is its size. When two meet, the smaller explodes; equal sizes both explode. Return the asteroids left at the end, in order.',
    sig: {
      py: 'def asteroidCollision(asteroids: List[int]) -> List[int]:',
      js: 'function asteroidCollision(asteroids) {',
      java: 'public int[] asteroidCollision(int[] asteroids) {',
      cpp: 'vector<int> asteroidCollision(vector<int>& asteroids) {',
      go: 'func asteroidCollision(asteroids []int) []int {'
    },
    examples: [[[[4, -2, 3]], [4, 3]], [[[6, -6]], []], [[[-3, 2, 5, -7]], [-3, -7]]],
    hidden: [[[[1, 2, 3]], [1, 2, 3]], [[[-1, -2, 1, 2]], [-1, -2, 1, 2]], [[[5, -1, -1, -5]], []], [[[3, 4, -4, -3, 2]], [2]], [[[2, -3, 4, -1]], [-3, 4]]],
    ref: function (asteroids) {
      const st = [];
      for (const a of asteroids) {
        let alive = true;
        while (alive && a < 0 && st.length && st[st.length - 1] > 0) {
          const t = st[st.length - 1];
          if (t < -a) st.pop(); else { if (t === -a) st.pop(); alive = false; }
        }
        if (alive) st.push(a);
      }
      return st;
    }
  },
  'car-fleet': {
    fn: 'carFleet', params: ['target', 'position', 'speed'], cmp: 'exact', meta: ['Car Fleet', 853, 'Medium', 'Stack'],
    ask: 'Cars drive toward target on a one-lane road, each from a different start. A car that catches up with a slower one ahead joins it and drives at its speed as one fleet (catching up exactly at target counts). Return how many fleets arrive.',
    sig: {
      py: 'def carFleet(target: int, position: List[int], speed: List[int]) -> int:',
      js: 'function carFleet(target, position, speed) {',
      java: 'public int carFleet(int target, int[] position, int[] speed) {',
      cpp: 'int carFleet(int target, vector<int>& position, vector<int>& speed) {',
      go: 'func carFleet(target int, position []int, speed []int) int {'
    },
    examples: [[[10, [0, 4], [2, 1]], 1], [[10, [6, 2], [1, 1]], 2], [[5, [1], [3]], 1]],
    hidden: [[[12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], 3], [[100, [0, 2, 4], [4, 2, 1]], 1], [[10, [0, 1, 2, 3], [1, 1, 1, 1]], 4], [[20, [5, 10], [3, 1]], 1], [[10, [8, 3, 7, 4, 6, 5], [4, 4, 4, 4, 4, 4]], 6]],
    ref: function (target, position, speed) {
      const cars = position.map((p, i) => [p, (target - p) / speed[i]]).sort((a, b) => b[0] - a[0]);
      let fleets = 0, slow = -1;
      for (const [, t] of cars) if (t > slow) { fleets++; slow = t; }
      return fleets;
    }
  },
  'basic-calculator-ii': {
    fn: 'calculate', params: ['s'], cmp: 'exact', meta: ['Basic Calculator II', 227, 'Medium', 'Stack'],
    ask: 's is a valid expression of non-negative integers, +, -, *, / and spaces, with no brackets. * and / go before + and -, and division rounds toward zero. Return the value without using eval.',
    sig: {
      py: 'def calculate(s: str) -> int:',
      js: 'function calculate(s) {',
      java: 'public int calculate(String s) {',
      cpp: 'int calculate(string s) {',
      go: 'func calculate(s string) int {'
    },
    examples: [[['2+3*4'], 14], [[' 8/3 - 1 '], 1], [['10-2-3'], 5]],
    hidden: [[['7'], 7], [['100 / 10 / 3'], 3], [['1+2*3-4/2'], 5], [['0*5+6'], 6], [['14-3/2*4'], 10], [['  42  '], 42]],
    ref: function (s) {
      const st = []; let num = 0, op = '+';
      for (let i = 0; i <= s.length; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') { num = num * 10 + Number(c); continue; }
        if (c === ' ') continue;
        if (op === '+') st.push(num); else if (op === '-') st.push(-num); else if (op === '*') st.push(st.pop() * num); else st.push(Math.trunc(st.pop() / num));
        op = c; num = 0;
      }
      return st.reduce((a, b) => a + b, 0);
    }
  },
  'longest-valid-parentheses': {
    fn: 'longestValidParentheses', params: ['s'], cmp: 'exact', meta: ['Longest Valid Parentheses', 32, 'Hard', 'Stack'],
    ask: 's holds only ( and ). Return the length of the longest stretch of s that is balanced.',
    sig: {
      py: 'def longestValidParentheses(s: str) -> int:',
      js: 'function longestValidParentheses(s) {',
      java: 'public int longestValidParentheses(String s) {',
      cpp: 'int longestValidParentheses(string s) {',
      go: 'func longestValidParentheses(s string) int {'
    },
    examples: [[['(()())('], 6], [['))'], 0], [['()(()'], 2]],
    hidden: [[[''], 0], [['()'], 2], [['(()'], 2], [['()()()'], 6], [[')()())()()('], 4], [['((())))'], 6]],
    ref: function (s) {
      const st = [-1]; let best = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') st.push(i);
        else { st.pop(); if (!st.length) st.push(i); else best = Math.max(best, i - st[st.length - 1]); }
      }
      return best;
    }
  },
  'online-stock-span': {
    fn: 'StockSpanner', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Online Stock Span', 901, 'Medium', 'Stack'],
    ask: 'Prices arrive one day at a time. next(price) returns the span for today: how many days in a row, ending today and counting back, had a price at most today\'s. The first op creates the class; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class StockSpanner:', js: 'class StockSpanner {', java: 'class StockSpanner {', cpp: 'class StockSpanner {', go: 'type StockSpanner struct {' },
    starter: {
      py: 'class StockSpanner:\n    def __init__(self):\n        pass\n\n    def next(self, price: int) -> int:\n        pass\n',
      js: 'class StockSpanner {\n  constructor() {\n  }\n  next(price) {\n  }\n}\n',
      java: 'class StockSpanner {\n    public StockSpanner() {\n    }\n    public int next(int price) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass StockSpanner {\npublic:\n    StockSpanner() {\n    }\n    int next(int price) {\n        return 0;\n    }\n};\n',
      go: 'package main\n\ntype StockSpanner struct {\n}\n\nfunc Constructor() StockSpanner {\n    return StockSpanner{}\n}\n\nfunc (this *StockSpanner) Next(price int) int {\n    return 0\n}\n'
    },
    examples: [[[['StockSpanner', 'next', 'next', 'next', 'next'], [[], [30], [20], [25], [40]]], [null, 1, 1, 2, 4]], [[['StockSpanner', 'next'], [[], [5]]], [null, 1]], [[['StockSpanner', 'next', 'next', 'next'], [[], [7], [7], [7]]], [null, 1, 2, 3]]],
    hidden: [[[['StockSpanner', 'next', 'next', 'next'], [[], [9], [8], [7]]], [null, 1, 1, 1]], [[['StockSpanner', 'next', 'next', 'next', 'next'], [[], [1], [2], [3], [4]]], [null, 1, 2, 3, 4]], [[['StockSpanner', 'next', 'next', 'next', 'next', 'next', 'next'], [[], [50], [10], [40], [20], [30], [60]]], [null, 1, 1, 2, 1, 2, 6]], [[['StockSpanner', 'next', 'next', 'next'], [[], [3], [1], [2]]], [null, 1, 1, 2]], [[['StockSpanner', 'next', 'next', 'next', 'next', 'next'], [[], [10], [4], [5], [90], [120]]], [null, 1, 1, 2, 4, 5]]],
    ref: class {
      constructor() { this.st = []; }
      next(price) {
        let span = 1;
        while (this.st.length && this.st[this.st.length - 1][0] <= price) span += this.st.pop()[1];
        this.st.push([price, span]);
        return span;
      }
    }
  },
  'next-greater-element-ii': {
    fn: 'nextGreaterElements', params: ['nums'], cmp: 'exact', meta: ['Next Greater Element II', 503, 'Medium', 'Monotonic Stack & Queue'],
    ask: 'nums is circular: after the last value you wrap to the first. For each position, return the first bigger value met when walking forward, or -1 if there is none.',
    sig: {
      py: 'def nextGreaterElements(nums: List[int]) -> List[int]:',
      js: 'function nextGreaterElements(nums) {',
      java: 'public int[] nextGreaterElements(int[] nums) {',
      cpp: 'vector<int> nextGreaterElements(vector<int>& nums) {',
      go: 'func nextGreaterElements(nums []int) []int {'
    },
    examples: [[[[2, 1, 3]], [3, 3, -1]], [[[5, 4, 3]], [-1, 5, 5]], [[[7]], [-1]]],
    hidden: [[[[1, 1, 1]], [-1, -1, -1]], [[[1, 2, 3, 4]], [2, 3, 4, -1]], [[[3, 8, 4, 1, 2]], [8, -1, 8, 2, 3]], [[[-1, 0, -2]], [0, -1, -1]], [[[6, 2, 6, 2]], [-1, 6, -1, 6]]],
    ref: function (nums) {
      const n = nums.length, out = new Array(n).fill(-1), st = [];
      for (let i = 0; i < 2 * n; i++) { const x = nums[i % n]; while (st.length && nums[st[st.length - 1]] < x) out[st.pop()] = x; if (i < n) st.push(i); }
      return out;
    }
  },
  'remove-k-digits': {
    fn: 'removeKdigits', params: ['num', 'k'], cmp: 'exact', meta: ['Remove K Digits', 402, 'Medium', 'Monotonic Stack & Queue'],
    ask: 'num is a non-negative integer written as a string. Remove exactly k digits so the number left is as small as possible. Return it with no leading zeros, or "0" if nothing is left.',
    sig: {
      py: 'def removeKdigits(num: str, k: int) -> str:',
      js: 'function removeKdigits(num, k) {',
      java: 'public String removeKdigits(String num, int k) {',
      cpp: 'string removeKdigits(string num, int k) {',
      go: 'func removeKdigits(num string, k int) string {'
    },
    examples: [[['4321', 2], '21'], [['10', 1], '0'], [['123', 3], '0']],
    hidden: [[['9', 0], '9'], [['112', 1], '11'], [['10200', 1], '200'], [['7654321', 3], '4321'], [['13579', 2], '135'], [['100002', 1], '2']],
    ref: function (num, k) {
      const st = [];
      for (const d of num) { while (k && st.length && st[st.length - 1] > d) { st.pop(); k--; } st.push(d); }
      while (k--) st.pop();
      const s = st.join('').replace(/^0+/, '');
      return s || '0';
    }
  },
  'final-prices-with-a-special-discount-in-a-shop': {
    fn: 'finalPrices', params: ['prices'], cmp: 'exact', meta: ['Final Prices With a Special Discount in a Shop', 1475, 'Easy', 'Monotonic Stack & Queue'],
    ask: 'Buying item i, you get a discount equal to the price of the first later item j with prices[j] <= prices[i] (no discount if there is none). Return what you pay for each item.',
    sig: {
      py: 'def finalPrices(prices: List[int]) -> List[int]:',
      js: 'function finalPrices(prices) {',
      java: 'public int[] finalPrices(int[] prices) {',
      cpp: 'vector<int> finalPrices(vector<int>& prices) {',
      go: 'func finalPrices(prices []int) []int {'
    },
    examples: [[[[5, 3, 4]], [2, 3, 4]], [[[2, 2]], [0, 2]], [[[1, 5, 9]], [1, 5, 9]]],
    hidden: [[[[7]], [7]], [[[9, 8, 7, 6]], [1, 1, 1, 6]], [[[4, 6, 2, 8, 1]], [2, 4, 1, 7, 1]], [[[3, 3, 3]], [0, 0, 3]], [[[10, 1, 1, 6]], [9, 0, 1, 6]]],
    ref: function (prices) {
      const out = prices.slice(), st = [];
      for (let i = 0; i < prices.length; i++) { while (st.length && prices[st[st.length - 1]] >= prices[i]) out[st.pop()] -= prices[i]; st.push(i); }
      return out;
    }
  },
  '132-pattern': {
    fn: 'find132pattern', params: ['nums'], cmp: 'exact', meta: ['132 Pattern', 456, 'Medium', 'Monotonic Stack & Queue'],
    ask: 'Return true if there are positions i < j < k with nums[i] < nums[k] < nums[j].',
    sig: {
      py: 'def find132pattern(nums: List[int]) -> bool:',
      js: 'function find132pattern(nums) {',
      java: 'public boolean find132pattern(int[] nums) {',
      cpp: 'bool find132pattern(vector<int>& nums) {',
      go: 'func find132pattern(nums []int) bool {'
    },
    examples: [[[[1, 4, 2]], true], [[[4, 3, 2, 1]], false], [[[3, 5, 0, 3, 4]], true]],
    hidden: [[[[1, 2]], false], [[[1, 2, 3, 4]], false], [[[-2, 1, -1]], true], [[[1, 0, 1, -4, -3]], false], [[[3, 1, 4, 2]], true], [[[6, 12, 3, 4, 6, 11, 20]], true]],
    ref: function (nums) {
      const st = []; let third = -Infinity;
      for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] < third) return true;
        while (st.length && st[st.length - 1] < nums[i]) third = st.pop();
        st.push(nums[i]);
      }
      return false;
    }
  },
  'sum-of-subarray-minimums': {
    fn: 'sumSubarrayMins', params: ['arr'], cmp: 'exact', meta: ['Sum of Subarray Minimums', 907, 'Medium', 'Monotonic Stack & Queue'],
    ask: 'Add up the minimum of every run of neighbouring numbers in arr. Return the total modulo 1000000007.',
    sig: {
      py: 'def sumSubarrayMins(arr: List[int]) -> int:',
      js: 'function sumSubarrayMins(arr) {',
      java: 'public int sumSubarrayMins(int[] arr) {',
      cpp: 'int sumSubarrayMins(vector<int>& arr) {',
      go: 'func sumSubarrayMins(arr []int) int {'
    },
    examples: [[[[2, 1]], 4], [[[3, 3]], 9], [[[1, 2, 3]], 10]],
    hidden: [[[[5]], 5], [[[3, 1, 2, 4]], 17], [[[4, 3, 2, 1]], 20], [[[2, 9, 7, 8, 3, 4, 6, 1]], 117], [[[30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000]], 1650000]],
    ref: function (arr) {
      const n = arr.length, left = new Array(n), right = new Array(n), st = [];
      for (let i = 0; i < n; i++) { while (st.length && arr[st[st.length - 1]] > arr[i]) st.pop(); left[i] = st.length ? i - st[st.length - 1] : i + 1; st.push(i); }
      st.length = 0;
      for (let i = n - 1; i >= 0; i--) { while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop(); right[i] = st.length ? st[st.length - 1] - i : n - i; st.push(i); }
      let total = 0;
      for (let i = 0; i < n; i++) total = (total + arr[i] * left[i] * right[i]) % 1000000007;
      return total;
    }
  },
  'kth-largest-element-in-a-stream': {
    fn: 'KthLargest', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Kth Largest Element in a Stream', 703, 'Easy', 'Heap'],
    ask: 'Build a class that starts with k and some scores in nums. add(val) adds a score and returns the k-th largest score so far. There are always at least k scores when you need to answer. The first op creates the class; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class KthLargest:', js: 'class KthLargest {', java: 'class KthLargest {', cpp: 'class KthLargest {', go: 'type KthLargest struct {' },
    starter: {
      py: 'class KthLargest:\n    def __init__(self, k: int, nums: List[int]):\n        pass\n\n    def add(self, val: int) -> int:\n        pass\n',
      js: 'class KthLargest {\n  constructor(k, nums) {\n  }\n  add(val) {\n  }\n}\n',
      java: 'class KthLargest {\n    public KthLargest(int k, int[] nums) {\n    }\n    public int add(int val) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass KthLargest {\npublic:\n    KthLargest(int k, vector<int>& nums) {\n    }\n    int add(int val) {\n        return 0;\n    }\n};\n',
      go: 'package main\n\ntype KthLargest struct {\n}\n\nfunc Constructor(k int, nums []int) KthLargest {\n    return KthLargest{}\n}\n\nfunc (this *KthLargest) Add(val int) int {\n    return 0\n}\n'
    },
    examples: [[[['KthLargest', 'add', 'add', 'add'], [[2, [5, 1]], [3], [6], [0]]], [null, 3, 5, 5]], [[['KthLargest', 'add'], [[1, []], [-4]]], [null, -4]], [[['KthLargest', 'add', 'add'], [[3, [9, 9]], [1], [10]]], [null, 1, 9]]],
    hidden: [[[['KthLargest', 'add', 'add', 'add'], [[1, [2]], [1], [3], [3]]], [null, 2, 3, 3]], [[['KthLargest', 'add', 'add', 'add', 'add'], [[3, [4, 5, 8, 2]], [3], [5], [10], [9]]], [null, 4, 5, 5, 8]], [[['KthLargest', 'add', 'add'], [[2, [0]], [-1], [1]]], [null, -1, 0]], [[['KthLargest', 'add'], [[4, [7, 7, 7]], [7]]], [null, 7]], [[['KthLargest', 'add', 'add', 'add'], [[2, [100, 50]], [75], [200], [10]]], [null, 75, 100, 100]]],
    ref: class {
      constructor(k, nums) { this.k = k; this.a = nums.slice().sort((x, y) => y - x).slice(0, k); }
      add(val) {
        let i = 0; while (i < this.a.length && this.a[i] > val) i++;
        this.a.splice(i, 0, val);
        if (this.a.length > this.k) this.a.pop();
        return this.a[this.k - 1];
      }
    }
  },
  'the-k-weakest-rows-in-a-matrix': {
    fn: 'kWeakestRows', params: ['mat', 'k'], cmp: 'exact', meta: ['The K Weakest Rows in a Matrix', 1337, 'Easy', 'Heap'],
    ask: 'Each row of mat is soldiers (1s) followed by civilians (0s). A row is weaker if it has fewer soldiers, or the same number and a smaller index. Return the indexes of the k weakest rows, weakest first.',
    sig: {
      py: 'def kWeakestRows(mat: List[List[int]], k: int) -> List[int]:',
      js: 'function kWeakestRows(mat, k) {',
      java: 'public int[] kWeakestRows(int[][] mat, int k) {',
      cpp: 'vector<int> kWeakestRows(vector<vector<int>>& mat, int k) {',
      go: 'func kWeakestRows(mat [][]int, k int) []int {'
    },
    examples: [[[[[1, 0], [1, 1], [0, 0]], 2], [2, 0]], [[[[1, 1, 0], [1, 1, 0]], 1], [0]], [[[[1], [0], [1], [0]], 3], [1, 3, 0]]],
    hidden: [[[[[0]], 1], [0]], [[[[1, 1, 1], [1, 0, 0], [1, 1, 0], [0, 0, 0]], 4], [3, 1, 2, 0]], [[[[1, 1], [1, 1], [1, 1]], 2], [0, 1]], [[[[1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 0, 0]], 3], [0, 2, 3]], [[[[0, 0], [1, 0], [0, 0]], 1], [0]]],
    ref: function (mat, k) {
      return mat.map((row, i) => [row.reduce((a, b) => a + b, 0), i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).slice(0, k).map((x) => x[1]);
    }
  },
  'take-gifts-from-the-richest-pile': {
    fn: 'pickGifts', params: ['gifts', 'k'], cmp: 'exact', meta: ['Take Gifts From the Richest Pile', 2558, 'Easy', 'Heap'],
    ask: 'Each second, pick the pile with the most gifts and leave behind the square root of its size, rounded down. After k seconds, return how many gifts remain in all piles.',
    sig: {
      py: 'def pickGifts(gifts: List[int], k: int) -> int:',
      js: 'function pickGifts(gifts, k) {',
      java: 'public int pickGifts(int[] gifts, int k) {',
      cpp: 'int pickGifts(vector<int>& gifts, int k) {',
      go: 'func pickGifts(gifts []int, k int) int {'
    },
    examples: [[[[16, 4], 1], 8], [[[1, 1], 5], 2], [[[10, 9, 2], 2], 8]],
    hidden: [[[[100], 1], 10], [[[100], 3], 1], [[[25, 64, 9, 4, 100], 4], 29], [[[1000000000], 2], 177], [[[7, 7, 7], 3], 6]],
    ref: function (gifts, k) {
      const a = gifts.slice();
      for (let t = 0; t < k; t++) { let m = 0; for (let i = 1; i < a.length; i++) if (a[i] > a[m]) m = i; a[m] = Math.floor(Math.sqrt(a[m])); }
      return a.reduce((x, y) => x + y, 0);
    }
  },
  'top-k-frequent-words': {
    fn: 'topKFrequent', params: ['words', 'k'], cmp: 'exact', meta: ['Top K Frequent Words', 692, 'Medium', 'Heap'],
    ask: 'Return the k most frequent words, most frequent first. Words with the same count go in alphabetical order.',
    sig: {
      py: 'def topKFrequent(words: List[str], k: int) -> List[str]:',
      js: 'function topKFrequent(words, k) {',
      java: 'public List<String> topKFrequent(String[] words, int k) {',
      cpp: 'vector<string> topKFrequent(vector<string>& words, int k) {',
      go: 'func topKFrequent(words []string, k int) []string {'
    },
    examples: [[[['ox', 'cat', 'ox', 'ant', 'cat', 'ox'], 2], ['ox', 'cat']], [[['b', 'a'], 2], ['a', 'b']], [[['dog'], 1], ['dog']]],
    hidden: [[[['x', 'y', 'z', 'x'], 1], ['x']], [[['pear', 'fig', 'pear', 'fig', 'apple'], 3], ['fig', 'pear', 'apple']], [[['aa', 'a', 'aaa', 'a'], 2], ['a', 'aa']], [[['red', 'blue', 'red', 'green', 'blue', 'red'], 3], ['red', 'blue', 'green']], [[['m', 'n', 'o', 'p'], 2], ['m', 'n']]],
    ref: function (words, k) {
      const c = new Map(); for (const w of words) c.set(w, (c.get(w) || 0) + 1);
      return [...c.keys()].sort((a, b) => c.get(b) - c.get(a) || (a < b ? -1 : 1)).slice(0, k);
    }
  },
  'sort-characters-by-frequency': {
    fn: 'frequencySort', params: ['s'], cmp: 'any', meta: ['Sort Characters By Frequency', 451, 'Medium', 'Heap'],
    ask: 'Rearrange s so that characters come in order of how often they appear, most frequent first, with all copies of a character together. Characters that tie may come in any order. Upper and lower case are different characters.',
    sig: {
      py: 'def frequencySort(s: str) -> str:',
      js: 'function frequencySort(s) {',
      java: 'public String frequencySort(String s) {',
      cpp: 'string frequencySort(string s) {',
      go: 'func frequencySort(s string) string {'
    },
    examples: [[['abb'], 'bba'], [['zzaa'], 'aazz'], [['x'], 'x']],
    hidden: [[[''], ''], [['Aabb'], 'bbAa'], [['mississippi'], 'iiiissssppm'], [['112233'], '112233'], [['zyxzyz'], 'zzzyyx']],
    check: function (args, got) {
      const s = args[0];
      if (typeof got !== 'string' || got.split('').sort().join('') !== s.split('').sort().join('')) return false;
      const runs = [], seen = new Set();
      for (let i = 0; i < got.length; i++) {
        if (i && got[i] === got[i - 1]) { runs[runs.length - 1]++; continue; }
        if (seen.has(got[i])) return false;
        seen.add(got[i]); runs.push(1);
      }
      return runs.every((r, i) => !i || runs[i - 1] >= r);
    },
    ref: function (s) {
      const c = new Map(); for (const ch of s) c.set(ch, (c.get(ch) || 0) + 1);
      return [...c.keys()].sort((a, b) => c.get(b) - c.get(a)).map((ch) => ch.repeat(c.get(ch))).join('');
    }
  },
  'find-median-from-data-stream': {
    fn: 'MedianFinder', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Find Median from Data Stream', 295, 'Hard', 'Heap'],
    ask: 'Build a class that takes numbers one at a time with addNum(num). findMedian() returns the median of everything added so far (the mean of the middle two when the count is even). Aim for O(log n) per add. The first op creates the class; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class MedianFinder:', js: 'class MedianFinder {', java: 'class MedianFinder {', cpp: 'class MedianFinder {', go: 'type MedianFinder struct {' },
    starter: {
      py: 'class MedianFinder:\n    def __init__(self):\n        pass\n\n    def addNum(self, num: int) -> None:\n        pass\n\n    def findMedian(self) -> float:\n        pass\n',
      js: 'class MedianFinder {\n  constructor() {\n  }\n  addNum(num) {\n  }\n  findMedian() {\n  }\n}\n',
      java: 'class MedianFinder {\n    public MedianFinder() {\n    }\n    public void addNum(int num) {\n    }\n    public double findMedian() {\n        return 0.0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MedianFinder {\npublic:\n    MedianFinder() {\n    }\n    void addNum(int num) {\n    }\n    double findMedian() {\n        return 0.0;\n    }\n};\n',
      go: 'package main\n\ntype MedianFinder struct {\n}\n\nfunc Constructor() MedianFinder {\n    return MedianFinder{}\n}\n\nfunc (this *MedianFinder) AddNum(num int) {\n}\n\nfunc (this *MedianFinder) FindMedian() float64 {\n    return 0\n}\n'
    },
    examples: [[[['MedianFinder', 'addNum', 'findMedian', 'addNum', 'findMedian'], [[], [4], [], [10], []]], [null, null, 4, null, 7]], [[['MedianFinder', 'addNum', 'addNum', 'addNum', 'findMedian'], [[], [5], [-1], [3], []]], [null, null, null, null, 3]], [[['MedianFinder', 'addNum', 'addNum', 'findMedian'], [[], [1], [2], []]], [null, null, null, 1.5]]],
    hidden: [[[['MedianFinder', 'addNum', 'findMedian'], [[], [-7], []]], [null, null, -7]], [[['MedianFinder', 'addNum', 'addNum', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'], [[], [6], [10], [2], [6], [], [5], []]], [null, null, null, null, null, 6, null, 6]], [[['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'], [[], [0], [0], [], [0], []]], [null, null, null, 0, null, 0]], [[['MedianFinder', 'addNum', 'addNum', 'addNum', 'addNum', 'findMedian'], [[], [9], [8], [7], [6], []]], [null, null, null, null, null, 7.5]], [[['MedianFinder', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'], [[], [1], [], [100], [], [50], []]], [null, null, 1, null, 50.5, null, 50]]],
    ref: class {
      constructor() { this.a = []; }
      addNum(num) { let i = 0; while (i < this.a.length && this.a[i] < num) i++; this.a.splice(i, 0, num); }
      findMedian() { const a = this.a, n = a.length; return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2; }
    }
  },
  'reorganize-string': {
    fn: 'reorganizeString', params: ['s'], cmp: 'any', meta: ['Reorganize String', 767, 'Medium', 'Heap'],
    ask: 'Rearrange the letters of s so that no two neighbours are the same letter. Return any such arrangement, or "" if none exists.',
    sig: {
      py: 'def reorganizeString(s: str) -> str:',
      js: 'function reorganizeString(s) {',
      java: 'public String reorganizeString(String s) {',
      cpp: 'string reorganizeString(string s) {',
      go: 'func reorganizeString(s string) string {'
    },
    examples: [[['aab'], 'aba'], [['aaab'], ''], [['xy'], 'xy']],
    hidden: [[['a'], 'a'], [['aa'], ''], [['aabbcc'], 'abacbc'], [['vvvlo'], 'vlvov'], [['zzzzyyx'], 'zyzyzxz'], [['abbbbc'], '']],
    check: function (args, got, want) {
      const s = args[0];
      if (want === '') return got === '';
      if (typeof got !== 'string' || got.split('').sort().join('') !== s.split('').sort().join('')) return false;
      for (let i = 1; i < got.length; i++) if (got[i] === got[i - 1]) return false;
      return true;
    },
    ref: function (s) {
      const c = new Map(); for (const ch of s) c.set(ch, (c.get(ch) || 0) + 1);
      const order = [...c.keys()].sort((a, b) => c.get(b) - c.get(a));
      if (c.get(order[0]) > Math.ceil(s.length / 2)) return '';
      const out = new Array(s.length); let i = 0;
      for (const ch of order) for (let k = 0; k < c.get(ch); k++) { if (i >= s.length) i = 1; out[i] = ch; i += 2; }
      return out.join('');
    }
  },
  'remove-duplicates-from-sorted-list': {
    fn: 'deleteDuplicates', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Remove Duplicates from Sorted List', 83, 'Easy', 'Linked Lists'],
    ask: 'The linked list is sorted. Remove nodes so that each value appears once, and return the head.',
    sig: {
      py: 'def deleteDuplicates(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function deleteDuplicates(head) {',
      java: 'public ListNode deleteDuplicates(ListNode head) {',
      cpp: 'ListNode* deleteDuplicates(ListNode* head) {',
      go: 'func deleteDuplicates(head *ListNode) *ListNode {'
    },
    examples: [[[[1, 1, 2, 3, 3]], [1, 2, 3]], [[[]], []], [[[4, 4, 4]], [4]]],
    hidden: [[[[1]], [1]], [[[1, 2, 3]], [1, 2, 3]], [[[-2, -2, 0, 0, 0, 5]], [-2, 0, 5]], [[[7, 7, 8, 9, 9]], [7, 8, 9]], [[[1, 1, 1, 2]], [1, 2]]],
    ref: function (head) {
      for (let n = head; n && n.next;) { if (n.next.val === n.val) n.next = n.next.next; else n = n.next; }
      return head;
    }
  },
  'convert-binary-number-in-a-linked-list-to-integer': {
    fn: 'getDecimalValue', params: ['head'], cmp: 'exact', io: { args: ['list'] }, meta: ['Convert Binary Number in a Linked List to Integer', 1290, 'Easy', 'Linked Lists'],
    ask: 'Each node holds a 0 or a 1, and the list read from the head is a binary number, most significant bit first. Return its value.',
    sig: {
      py: 'def getDecimalValue(head: Optional[ListNode]) -> int:',
      js: 'function getDecimalValue(head) {',
      java: 'public int getDecimalValue(ListNode head) {',
      cpp: 'int getDecimalValue(ListNode* head) {',
      go: 'func getDecimalValue(head *ListNode) int {'
    },
    examples: [[[[1, 1, 0]], 6], [[[0]], 0], [[[1, 0, 0, 1]], 9]],
    hidden: [[[[1]], 1], [[[0, 0, 1]], 1], [[[1, 1, 1, 1, 1, 1, 1, 1]], 255], [[[1, 0, 1, 0, 1, 0]], 42], [[[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 1024]],
    ref: function (head) { let v = 0; for (let n = head; n; n = n.next) v = v * 2 + n.val; return v; }
  },
  'remove-linked-list-elements': {
    fn: 'removeElements', params: ['head', 'val'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Remove Linked List Elements', 203, 'Easy', 'Linked Lists'],
    ask: 'Remove every node whose value equals val and return the new head.',
    sig: {
      py: 'def removeElements(head: Optional[ListNode], val: int) -> Optional[ListNode]:',
      js: 'function removeElements(head, val) {',
      java: 'public ListNode removeElements(ListNode head, int val) {',
      cpp: 'ListNode* removeElements(ListNode* head, int val) {',
      go: 'func removeElements(head *ListNode, val int) *ListNode {'
    },
    examples: [[[[3, 1, 3, 2], 3], [1, 2]], [[[], 1], []], [[[5, 5], 5], []]],
    hidden: [[[[1, 2, 3], 4], [1, 2, 3]], [[[1, 2, 3], 3], [1, 2]], [[[6, 1, 6, 6, 2, 6], 6], [1, 2]], [[[0], 0], []], [[[2, 1, 2, 1], 1], [2, 2]]],
    ref: function (head, val) {
      const dummy = { next: head };
      for (let n = dummy; n.next;) { if (n.next.val === val) n.next = n.next.next; else n = n.next; }
      return dummy.next;
    }
  },
  'add-two-numbers': {
    fn: 'addTwoNumbers', params: ['l1', 'l2'], cmp: 'exact', io: { args: ['list', 'list'], ret: 'list' }, meta: ['Add Two Numbers', 2, 'Medium', 'Linked Lists'],
    ask: 'Each list holds the digits of a non-negative number in reverse order (ones digit first), with no leading zeros except the number 0 itself. Return their sum as a list in the same form.',
    sig: {
      py: 'def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function addTwoNumbers(l1, l2) {',
      java: 'public ListNode addTwoNumbers(ListNode l1, ListNode l2) {',
      cpp: 'ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {',
      go: 'func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {'
    },
    examples: [[[[3, 4], [8, 1]], [1, 6]], [[[0], [0]], [0]], [[[9, 9], [1]], [0, 0, 1]]],
    hidden: [[[[5], [5]], [0, 1]], [[[1, 2, 3], [4, 5, 6]], [5, 7, 9]], [[[9, 9, 9, 9], [9, 9]], [8, 9, 0, 0, 1]], [[[0], [7, 3]], [7, 3]], [[[2, 4, 6, 8], [8, 6, 4, 2]], [0, 1, 1, 1, 1]]],
    ref: function (l1, l2) {
      const dummy = { next: null }; let t = dummy, carry = 0, a = l1, b = l2;
      while (a || b || carry) {
        const s = (a ? a.val : 0) + (b ? b.val : 0) + carry; carry = Math.floor(s / 10);
        t.next = { val: s % 10, next: null }; t = t.next;
        if (a) a = a.next;
        if (b) b = b.next;
      }
      return dummy.next;
    }
  },
  'odd-even-linked-list': {
    fn: 'oddEvenList', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Odd Even Linked List', 328, 'Medium', 'Linked Lists'],
    ask: 'Put the 1st, 3rd, 5th... nodes first, then the 2nd, 4th, 6th... nodes, keeping the order inside each group. Positions count from 1, not values. Use O(1) extra space.',
    sig: {
      py: 'def oddEvenList(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function oddEvenList(head) {',
      java: 'public ListNode oddEvenList(ListNode head) {',
      cpp: 'ListNode* oddEvenList(ListNode* head) {',
      go: 'func oddEvenList(head *ListNode) *ListNode {'
    },
    examples: [[[[10, 20, 30, 40, 50]], [10, 30, 50, 20, 40]], [[[]], []], [[[7, 8]], [7, 8]]],
    hidden: [[[[1]], [1]], [[[1, 2, 3]], [1, 3, 2]], [[[2, 1, 3, 5, 6, 4, 7]], [2, 3, 6, 7, 1, 5, 4]], [[[9, 9, 8, 8]], [9, 8, 9, 8]], [[[1, 2, 3, 4, 5, 6]], [1, 3, 5, 2, 4, 6]]],
    ref: function (head) {
      if (!head) return null;
      let odd = head, even = head.next; const evenHead = even;
      while (even && even.next) { odd.next = even.next; odd = odd.next; even.next = odd.next; even = even.next; }
      odd.next = evenHead;
      return head;
    }
  },
  'partition-list': {
    fn: 'partition', params: ['head', 'x'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Partition List', 86, 'Medium', 'Linked Lists'],
    ask: 'Move every node with a value less than x before every node with a value of x or more, keeping the original order inside both groups. Return the head.',
    sig: {
      py: 'def partition(head: Optional[ListNode], x: int) -> Optional[ListNode]:',
      js: 'function partition(head, x) {',
      java: 'public ListNode partition(ListNode head, int x) {',
      cpp: 'ListNode* partition(ListNode* head, int x) {',
      go: 'func partition(head *ListNode, x int) *ListNode {'
    },
    examples: [[[[5, 1, 4, 2], 3], [1, 2, 5, 4]], [[[2, 1], 2], [1, 2]], [[[1, 2, 3], 0], [1, 2, 3]]],
    hidden: [[[[], 5], []], [[[3, 3, 3], 3], [3, 3, 3]], [[[4, 3, 2, 5, 2], 3], [2, 2, 4, 3, 5]], [[[1, 9, 2, 8, 3, 7], 5], [1, 2, 3, 9, 8, 7]], [[[6, 5, 4, 3], 10], [6, 5, 4, 3]]],
    ref: function (head, x) {
      const lo = { next: null }, hi = { next: null }; let a = lo, b = hi;
      for (let n = head; n; n = n.next) { if (n.val < x) { a.next = n; a = n; } else { b.next = n; b = n; } }
      b.next = null; a.next = hi.next;
      return lo.next;
    }
  },
  'sort-list': {
    fn: 'sortList', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Sort List', 148, 'Medium', 'Linked Lists'],
    ask: 'Sort the linked list from small to large and return its head. Aim for O(n log n) time.',
    sig: {
      py: 'def sortList(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function sortList(head) {',
      java: 'public ListNode sortList(ListNode head) {',
      cpp: 'ListNode* sortList(ListNode* head) {',
      go: 'func sortList(head *ListNode) *ListNode {'
    },
    examples: [[[[3, 1, 2]], [1, 2, 3]], [[[]], []], [[[5, -1, 5, 0]], [-1, 0, 5, 5]]],
    hidden: [[[[1]], [1]], [[[2, 1]], [1, 2]], [[[1, 2, 3, 4, 5]], [1, 2, 3, 4, 5]], [[[9, 8, 7, 6, 5, 4]], [4, 5, 6, 7, 8, 9]], [[[4, 19, 14, 5, -3, 1, 8, 5, 11, 15]], [-3, 1, 4, 5, 5, 8, 11, 14, 15, 19]]],
    ref: function (head) {
      const sort = (h) => {
        if (!h || !h.next) return h;
        let slow = h, fast = h.next;
        while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
        const right = slow.next; slow.next = null;
        let a = sort(h), b = sort(right); const dummy = { next: null }; let t = dummy;
        while (a && b) { if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; } t = t.next; }
        t.next = a || b;
        return dummy.next;
      };
      return sort(head);
    }
  },
  'swap-nodes-in-pairs': {
    fn: 'swapPairs', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Swap Nodes in Pairs', 24, 'Medium', 'In-place Reversal'],
    ask: 'Swap every two neighbouring nodes (1st with 2nd, 3rd with 4th, and so on) by moving the nodes, not their values. Return the new head.',
    sig: {
      py: 'def swapPairs(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function swapPairs(head) {',
      java: 'public ListNode swapPairs(ListNode head) {',
      cpp: 'ListNode* swapPairs(ListNode* head) {',
      go: 'func swapPairs(head *ListNode) *ListNode {'
    },
    examples: [[[[1, 2, 3]], [2, 1, 3]], [[[]], []], [[[6, 7, 8, 9]], [7, 6, 9, 8]]],
    hidden: [[[[1]], [1]], [[[1, 2]], [2, 1]], [[[1, 2, 3, 4, 5]], [2, 1, 4, 3, 5]], [[[5, 5, 6, 6]], [5, 5, 6, 6]], [[[10, 20, 30, 40, 50, 60]], [20, 10, 40, 30, 60, 50]]],
    ref: function (head) {
      const dummy = { next: head }; let p = dummy;
      while (p.next && p.next.next) { const a = p.next, b = a.next; a.next = b.next; b.next = a; p.next = b; p = a; }
      return dummy.next;
    }
  },
  'reverse-linked-list-ii': {
    fn: 'reverseBetween', params: ['head', 'left', 'right'], cmp: 'exact', io: { args: ['list', null, null], ret: 'list' }, meta: ['Reverse Linked List II', 92, 'Medium', 'In-place Reversal'],
    ask: 'Reverse the nodes from position left to position right (counting from 1, both included) and return the head. 1 <= left <= right <= length.',
    sig: {
      py: 'def reverseBetween(head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:',
      js: 'function reverseBetween(head, left, right) {',
      java: 'public ListNode reverseBetween(ListNode head, int left, int right) {',
      cpp: 'ListNode* reverseBetween(ListNode* head, int left, int right) {',
      go: 'func reverseBetween(head *ListNode, left int, right int) *ListNode {'
    },
    examples: [[[[10, 20, 30, 40], 2, 3], [10, 30, 20, 40]], [[[5], 1, 1], [5]], [[[1, 2, 3], 1, 3], [3, 2, 1]]],
    hidden: [[[[1, 2], 1, 2], [2, 1]], [[[1, 2, 3, 4, 5], 2, 5], [1, 5, 4, 3, 2]], [[[1, 2, 3, 4, 5], 1, 2], [2, 1, 3, 4, 5]], [[[1, 2, 3, 4, 5], 3, 3], [1, 2, 3, 4, 5]], [[[9, 8, 7, 6, 5, 4], 2, 5], [9, 5, 6, 7, 8, 4]]],
    ref: function (head, left, right) {
      const dummy = { next: head }; let p = dummy;
      for (let i = 1; i < left; i++) p = p.next;
      const start = p.next;
      for (let i = 0; i < right - left; i++) { const m = start.next; start.next = m.next; m.next = p.next; p.next = m; }
      return dummy.next;
    }
  },
  'rotate-list': {
    fn: 'rotateRight', params: ['head', 'k'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Rotate List', 61, 'Medium', 'In-place Reversal'],
    ask: 'Rotate the list to the right by k places: the last node moves to the front, k times. Return the new head. k can be larger than the length.',
    sig: {
      py: 'def rotateRight(head: Optional[ListNode], k: int) -> Optional[ListNode]:',
      js: 'function rotateRight(head, k) {',
      java: 'public ListNode rotateRight(ListNode head, int k) {',
      cpp: 'ListNode* rotateRight(ListNode* head, int k) {',
      go: 'func rotateRight(head *ListNode, k int) *ListNode {'
    },
    examples: [[[[1, 2, 3, 4], 1], [4, 1, 2, 3]], [[[1, 2], 5], [2, 1]], [[[], 3], []]],
    hidden: [[[[1], 99], [1]], [[[1, 2, 3], 0], [1, 2, 3]], [[[1, 2, 3], 3], [1, 2, 3]], [[[1, 2, 3, 4, 5], 2], [4, 5, 1, 2, 3]], [[[0, 1, 2], 4], [2, 0, 1]]],
    ref: function (head, k) {
      if (!head) return null;
      let n = 1, tail = head;
      while (tail.next) { tail = tail.next; n++; }
      k %= n; if (!k) return head;
      let p = head; for (let i = 1; i < n - k; i++) p = p.next;
      const nh = p.next; p.next = null; tail.next = head;
      return nh;
    }
  },
  'reverse-nodes-in-k-group': {
    fn: 'reverseKGroup', params: ['head', 'k'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Reverse Nodes in k-Group', 25, 'Hard', 'In-place Reversal'],
    ask: 'Reverse the nodes k at a time and return the head. If fewer than k nodes are left at the end, leave them as they are. Move nodes, not values.',
    sig: {
      py: 'def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:',
      js: 'function reverseKGroup(head, k) {',
      java: 'public ListNode reverseKGroup(ListNode head, int k) {',
      cpp: 'ListNode* reverseKGroup(ListNode* head, int k) {',
      go: 'func reverseKGroup(head *ListNode, k int) *ListNode {'
    },
    examples: [[[[1, 2, 3, 4, 5, 6, 7], 3], [3, 2, 1, 6, 5, 4, 7]], [[[1, 2], 1], [1, 2]], [[[4, 3], 2], [3, 4]]],
    hidden: [[[[1], 1], [1]], [[[1, 2, 3], 4], [1, 2, 3]], [[[1, 2, 3, 4], 2], [2, 1, 4, 3]], [[[1, 2, 3, 4, 5, 6], 3], [3, 2, 1, 6, 5, 4]], [[[5, 6, 7, 8, 9], 5], [9, 8, 7, 6, 5]]],
    ref: function (head, k) {
      const dummy = { next: head }; let p = dummy;
      while (true) {
        let q = p; for (let i = 0; i < k && q; i++) q = q.next;
        if (!q) break;
        const start = p.next;
        for (let i = 0; i < k - 1; i++) { const m = start.next; start.next = m.next; m.next = p.next; p.next = m; }
        p = start;
      }
      return dummy.next;
    }
  },
  'maximum-twin-sum-of-a-linked-list': {
    fn: 'pairSum', params: ['head'], cmp: 'exact', io: { args: ['list'] }, meta: ['Maximum Twin Sum of a Linked List', 2130, 'Medium', 'In-place Reversal'],
    ask: 'The list has an even length n. Node i and node n - 1 - i are twins (counting from 0). Return the largest sum of a pair of twins.',
    sig: {
      py: 'def pairSum(head: Optional[ListNode]) -> int:',
      js: 'function pairSum(head) {',
      java: 'public int pairSum(ListNode head) {',
      cpp: 'int pairSum(ListNode* head) {',
      go: 'func pairSum(head *ListNode) int {'
    },
    examples: [[[[1, 7]], 8], [[[3, 1, 2, 6]], 9], [[[4, 4, 4, 4]], 8]],
    hidden: [[[[1, 100000]], 100001], [[[5, 1, 1, 5]], 10], [[[1, 2, 3, 4, 5, 6]], 7], [[[9, 1, 8, 2, 7, 3]], 12], [[[0, 0]], 0]],
    ref: function (head) {
      const v = []; for (let n = head; n; n = n.next) v.push(n.val);
      let best = 0; for (let i = 0; i < v.length / 2; i++) best = Math.max(best, v[i] + v[v.length - 1 - i]);
      return best;
    }
  },
  'delete-the-middle-node-of-a-linked-list': {
    fn: 'deleteMiddle', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Delete the Middle Node of a Linked List', 2095, 'Medium', 'Fast & Slow Pointers'],
    ask: 'Delete the middle node and return the head. For a list of n nodes the middle is at index floor(n / 2), counting from 0.',
    sig: {
      py: 'def deleteMiddle(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function deleteMiddle(head) {',
      java: 'public ListNode deleteMiddle(ListNode head) {',
      cpp: 'ListNode* deleteMiddle(ListNode* head) {',
      go: 'func deleteMiddle(head *ListNode) *ListNode {'
    },
    examples: [[[[1, 2, 3]], [1, 3]], [[[9]], []], [[[1, 2, 3, 4]], [1, 2, 4]]],
    hidden: [[[[1, 2]], [1]], [[[5, 6, 7, 8, 9]], [5, 6, 8, 9]], [[[2, 2, 2, 2, 2, 2]], [2, 2, 2, 2, 2]], [[[10, 20, 30, 40, 50, 60, 70]], [10, 20, 30, 50, 60, 70]], [[[3, 1]], [3]]],
    ref: function (head) {
      if (!head.next) return null;
      let slow = head, fast = head.next.next;
      while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
      slow.next = slow.next.next;
      return head;
    }
  },
  'binary-tree-inorder-traversal': {
    fn: 'inorderTraversal', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Inorder Traversal', 94, 'Easy', 'Trees'],
    ask: 'Return the values of the tree in inorder: the left subtree, then the node, then the right subtree.',
    sig: {
      py: 'def inorderTraversal(root: Optional[TreeNode]) -> List[int]:',
      js: 'function inorderTraversal(root) {',
      java: 'public List<Integer> inorderTraversal(TreeNode root) {',
      cpp: 'vector<int> inorderTraversal(TreeNode* root) {',
      go: 'func inorderTraversal(root *TreeNode) []int {'
    },
    examples: [[[[2, 1, 3]], [1, 2, 3]], [[[]], []], [[[5, null, 8, 7]], [5, 7, 8]]],
    hidden: [[[[1]], [1]], [[[4, 2, 6, 1, 3, 5, 7]], [1, 2, 3, 4, 5, 6, 7]], [[[3, 2, null, 1]], [1, 2, 3]], [[[1, null, 2, null, 3]], [1, 2, 3]], [[[8, 3, 10, null, 6, null, 14, 4, 7, 13]], [3, 4, 6, 7, 8, 10, 13, 14]]],
    ref: function (root) { const out = []; const go = (n) => { if (!n) return; go(n.left); out.push(n.val); go(n.right); }; go(root); return out; }
  },
  'binary-tree-preorder-traversal': {
    fn: 'preorderTraversal', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Preorder Traversal', 144, 'Easy', 'Trees'],
    ask: 'Return the values of the tree in preorder: the node, then its left subtree, then its right subtree.',
    sig: {
      py: 'def preorderTraversal(root: Optional[TreeNode]) -> List[int]:',
      js: 'function preorderTraversal(root) {',
      java: 'public List<Integer> preorderTraversal(TreeNode root) {',
      cpp: 'vector<int> preorderTraversal(TreeNode* root) {',
      go: 'func preorderTraversal(root *TreeNode) []int {'
    },
    examples: [[[[2, 1, 3]], [2, 1, 3]], [[[]], []], [[[4, 9, null, 1, 2]], [4, 9, 1, 2]]],
    hidden: [[[[1]], [1]], [[[4, 2, 6, 1, 3, 5, 7]], [4, 2, 1, 3, 6, 5, 7]], [[[3, 2, null, 1]], [3, 2, 1]], [[[1, null, 2, null, 3]], [1, 2, 3]], [[[8, 3, 10, null, 6, null, 14, 4, 7, 13]], [8, 3, 6, 4, 7, 10, 14, 13]]],
    ref: function (root) { const out = []; const go = (n) => { if (!n) return; out.push(n.val); go(n.left); go(n.right); }; go(root); return out; }
  },
  'binary-tree-postorder-traversal': {
    fn: 'postorderTraversal', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Postorder Traversal', 145, 'Easy', 'Trees'],
    ask: 'Return the values of the tree in postorder: the left subtree, then the right subtree, then the node.',
    sig: {
      py: 'def postorderTraversal(root: Optional[TreeNode]) -> List[int]:',
      js: 'function postorderTraversal(root) {',
      java: 'public List<Integer> postorderTraversal(TreeNode root) {',
      cpp: 'vector<int> postorderTraversal(TreeNode* root) {',
      go: 'func postorderTraversal(root *TreeNode) []int {'
    },
    examples: [[[[2, 1, 3]], [1, 3, 2]], [[[7]], [7]], [[[4, 9, null, 1, 2]], [1, 2, 9, 4]]],
    hidden: [[[[]], []], [[[4, 2, 6, 1, 3, 5, 7]], [1, 3, 2, 5, 7, 6, 4]], [[[3, 2, null, 1]], [1, 2, 3]], [[[1, null, 2, null, 3]], [3, 2, 1]], [[[8, 3, 10, null, 6, null, 14, 4, 7, 13]], [4, 7, 6, 3, 13, 14, 10, 8]]],
    ref: function (root) { const out = []; const go = (n) => { if (!n) return; go(n.left); go(n.right); out.push(n.val); }; go(root); return out; }
  },
  'merge-two-binary-trees': {
    fn: 'mergeTrees', params: ['root1', 'root2'], cmp: 'exact', io: { args: ['tree', 'tree'], ret: 'tree' }, meta: ['Merge Two Binary Trees', 617, 'Easy', 'Trees'],
    ask: 'Lay one tree over the other. Where both have a node, the merged node holds the sum of the two values; where only one has a node, use that node. Return the merged tree.',
    sig: {
      py: 'def mergeTrees(root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:',
      js: 'function mergeTrees(root1, root2) {',
      java: 'public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {',
      cpp: 'TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {',
      go: 'func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {'
    },
    examples: [[[[1, 2], [3, null, 4]], [4, 2, 4]], [[[], [5]], [5]], [[[1, 2, 3], [1, 2, 3]], [2, 4, 6]]],
    hidden: [[[[], []], []], [[[7], []], [7]], [[[1, 2, null, 3], [1, null, 2, null, 3]], [2, 2, 2, 3, null, null, 3]], [[[5, 3, 2, 1], [2, 1, 3, null, 4, null, 7]], [7, 4, 5, 1, 4, null, 7]], [[[-1, -2], [1, 2]], [0, 0]]],
    ref: function (root1, root2) {
      const go = (a, b) => { if (!a) return b; if (!b) return a; a.val += b.val; a.left = go(a.left, b.left); a.right = go(a.right, b.right); return a; };
      return go(root1, root2);
    }
  },
  'univalued-binary-tree': {
    fn: 'isUnivalTree', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Univalued Binary Tree', 965, 'Easy', 'Trees'],
    ask: 'The tree has at least one node. Return true if every node holds the same value.',
    sig: {
      py: 'def isUnivalTree(root: Optional[TreeNode]) -> bool:',
      js: 'function isUnivalTree(root) {',
      java: 'public boolean isUnivalTree(TreeNode root) {',
      cpp: 'bool isUnivalTree(TreeNode* root) {',
      go: 'func isUnivalTree(root *TreeNode) bool {'
    },
    examples: [[[[3, 3, 3, null, 3]], true], [[[3, 3, 4]], false], [[[0]], true]],
    hidden: [[[[1, 1]], true], [[[1, null, 2]], false], [[[5, 5, 5, 5, 5, 5, 5]], true], [[[2, 2, 2, 2, null, null, 3]], false], [[[9, 9, null, 9, null, 9]], true]],
    ref: function (root) { const v = root.val; const go = (n) => !n || (n.val === v && go(n.left) && go(n.right)); return go(root); }
  },
  'symmetric-tree': {
    fn: 'isSymmetric', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Symmetric Tree', 101, 'Easy', 'Trees'],
    ask: 'Return true if the tree is a mirror image of itself around its centre.',
    sig: {
      py: 'def isSymmetric(root: Optional[TreeNode]) -> bool:',
      js: 'function isSymmetric(root) {',
      java: 'public boolean isSymmetric(TreeNode root) {',
      cpp: 'bool isSymmetric(TreeNode* root) {',
      go: 'func isSymmetric(root *TreeNode) bool {'
    },
    examples: [[[[5, 2, 2, 1, null, null, 1]], true], [[[5, 2, 2, null, 1, null, 1]], false], [[[8]], true]],
    hidden: [[[[]], true], [[[1, 2, 3]], false], [[[1, 2, 2, 3, 4, 4, 3]], true], [[[1, 2, 2, 3, null, 3]], false], [[[0, -1, -1, -2, null, null, -2]], true]],
    ref: function (root) {
      const mirror = (a, b) => (!a || !b ? a === b : a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left));
      return !root || mirror(root.left, root.right);
    }
  },
  'path-sum': {
    fn: 'hasPathSum', params: ['root', 'targetSum'], cmp: 'exact', io: { args: ['tree', null] }, meta: ['Path Sum', 112, 'Easy', 'Trees'],
    ask: 'Return true if some path from the root down to a leaf has values adding up to targetSum. An empty tree has no paths.',
    sig: {
      py: 'def hasPathSum(root: Optional[TreeNode], targetSum: int) -> bool:',
      js: 'function hasPathSum(root, targetSum) {',
      java: 'public boolean hasPathSum(TreeNode root, int targetSum) {',
      cpp: 'bool hasPathSum(TreeNode* root, int targetSum) {',
      go: 'func hasPathSum(root *TreeNode, targetSum int) bool {'
    },
    examples: [[[[3, 4, 5, null, 1], 8], true], [[[3, 4, 5, null, 1], 7], false], [[[], 0], false]],
    hidden: [[[[1], 1], true], [[[1, 2], 1], false], [[[-2, null, -3], -5], true], [[[5, 4, 8, 11, null, 13, 4, 7, 2], 22], true], [[[1, 2, 3], 3], true]],
    ref: function (root, targetSum) {
      const go = (n, s) => { if (!n) return false; s -= n.val; if (!n.left && !n.right) return s === 0; return go(n.left, s) || go(n.right, s); };
      return go(root, targetSum);
    }
  },
  'subtree-of-another-tree': {
    fn: 'isSubtree', params: ['root', 'subRoot'], cmp: 'exact', io: { args: ['tree', 'tree'] }, meta: ['Subtree of Another Tree', 572, 'Easy', 'Trees'],
    ask: 'Return true if root has a node whose whole subtree (the node and all its descendants) is identical to subRoot.',
    sig: {
      py: 'def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:',
      js: 'function isSubtree(root, subRoot) {',
      java: 'public boolean isSubtree(TreeNode root, TreeNode subRoot) {',
      cpp: 'bool isSubtree(TreeNode* root, TreeNode* subRoot) {',
      go: 'func isSubtree(root *TreeNode, subRoot *TreeNode) bool {'
    },
    examples: [[[[1, 2, 3, 4], [2, 4]], true], [[[1, 2, 3, 4], [2]], false], [[[6], [6]], true]],
    hidden: [[[[1, 1], [1]], true], [[[3, 4, 5, 1, 2], [4, 1, 2]], true], [[[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], false], [[[1, 2, 3], [1, 2]], false], [[[2, 2, 2, 2], [2, 2]], true]],
    ref: function (root, subRoot) {
      const same = (a, b) => (!a || !b ? a === b : a.val === b.val && same(a.left, b.left) && same(a.right, b.right));
      const go = (n) => !!n && (same(n, subRoot) || go(n.left) || go(n.right));
      return go(root);
    }
  },
  'leaf-similar-trees': {
    fn: 'leafSimilar', params: ['root1', 'root2'], cmp: 'exact', io: { args: ['tree', 'tree'] }, meta: ['Leaf-Similar Trees', 872, 'Easy', 'Trees'],
    ask: 'Read the leaves of a tree from left to right. Return true if both trees give the same sequence of leaf values.',
    sig: {
      py: 'def leafSimilar(root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:',
      js: 'function leafSimilar(root1, root2) {',
      java: 'public boolean leafSimilar(TreeNode root1, TreeNode root2) {',
      cpp: 'bool leafSimilar(TreeNode* root1, TreeNode* root2) {',
      go: 'func leafSimilar(root1 *TreeNode, root2 *TreeNode) bool {'
    },
    examples: [[[[1, 2, 3], [5, 2, 3]], true], [[[1, 2, 3], [1, 3, 2]], false], [[[4, 1], [4, null, 1]], true]],
    hidden: [[[[1], [1]], true], [[[1], [2]], false], [[[3, 5, 1, 6, 2, 9, 8, null, null, 7, 4], [3, 5, 1, 6, 7, 4, 2, null, null, null, null, null, null, 9, 8]], true], [[[1, 2], [2, 2]], true], [[[1, 2, 3, 4], [1, 4, 3]], true]],
    ref: function (root1, root2) {
      const leaves = (n, out) => { if (!n) return out; if (!n.left && !n.right) out.push(n.val); leaves(n.left, out); leaves(n.right, out); return out; };
      return leaves(root1, []).join(',') === leaves(root2, []).join(',');
    }
  },
  'sum-of-left-leaves': {
    fn: 'sumOfLeftLeaves', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Sum of Left Leaves', 404, 'Easy', 'Trees'],
    ask: 'A left leaf is a leaf that is the left child of its parent. Return the sum of all left leaves.',
    sig: {
      py: 'def sumOfLeftLeaves(root: Optional[TreeNode]) -> int:',
      js: 'function sumOfLeftLeaves(root) {',
      java: 'public int sumOfLeftLeaves(TreeNode root) {',
      cpp: 'int sumOfLeftLeaves(TreeNode* root) {',
      go: 'func sumOfLeftLeaves(root *TreeNode) int {'
    },
    examples: [[[[1, 2, 3, 4, 5]], 4], [[[7]], 0], [[[1, 2, 3, null, null, 6]], 8]],
    hidden: [[[[]], 0], [[[1, 2]], 2], [[[1, null, 2]], 0], [[[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]], 20], [[[0, -3, 9, -10, null, 5]], -5]],
    ref: function (root) {
      const go = (n, left) => { if (!n) return 0; if (!n.left && !n.right) return left ? n.val : 0; return go(n.left, true) + go(n.right, false); };
      return go(root, false);
    }
  },
  'binary-tree-paths': {
    fn: 'binaryTreePaths', params: ['root'], cmp: 'unordered', io: { args: ['tree'] }, meta: ['Binary Tree Paths', 257, 'Easy', 'Trees'],
    ask: 'Return every path from the root down to a leaf, written as values joined by "->", in any order.',
    sig: {
      py: 'def binaryTreePaths(root: Optional[TreeNode]) -> List[str]:',
      js: 'function binaryTreePaths(root) {',
      java: 'public List<String> binaryTreePaths(TreeNode root) {',
      cpp: 'vector<string> binaryTreePaths(TreeNode* root) {',
      go: 'func binaryTreePaths(root *TreeNode) []string {'
    },
    examples: [[[[1, 2, 3]], ['1->2', '1->3']], [[[9]], ['9']], [[[1, null, 2, null, 3]], ['1->2->3']]],
    hidden: [[[[1, 2, 3, null, 5]], ['1->2->5', '1->3']], [[[-1, -2]], ['-1->-2']], [[[4, 2, 6, 1, 3, 5, 7]], ['4->2->1', '4->2->3', '4->6->5', '4->6->7']], [[[10, 5, null, 3, 7]], ['10->5->3', '10->5->7']], [[[0, 0, 0]], ['0->0', '0->0']]],
    ref: function (root) {
      const out = [];
      const go = (n, path) => { if (!n) return; const p = path ? path + '->' + n.val : String(n.val); if (!n.left && !n.right) out.push(p); go(n.left, p); go(n.right, p); };
      go(root, '');
      return out;
    }
  },
  'search-in-a-binary-search-tree': {
    fn: 'searchBST', params: ['root', 'val'], cmp: 'exact', io: { args: ['tree', null], ret: 'tree' }, meta: ['Search in a Binary Search Tree', 700, 'Easy', 'Trees'],
    ask: 'root is a binary search tree. Return the subtree rooted at the node holding val, or an empty tree if there is no such node.',
    sig: {
      py: 'def searchBST(root: Optional[TreeNode], val: int) -> Optional[TreeNode]:',
      js: 'function searchBST(root, val) {',
      java: 'public TreeNode searchBST(TreeNode root, int val) {',
      cpp: 'TreeNode* searchBST(TreeNode* root, int val) {',
      go: 'func searchBST(root *TreeNode, val int) *TreeNode {'
    },
    examples: [[[[6, 3, 9, 1, 4], 3], [3, 1, 4]], [[[6, 3, 9], 7], []], [[[2], 2], [2]]],
    hidden: [[[[], 1], []], [[[6, 3, 9, 1, 4], 6], [6, 3, 9, 1, 4]], [[[6, 3, 9, 1, 4], 4], [4]], [[[8, 4, 12, 2, 6, 10, 14], 12], [12, 10, 14]], [[[5, 3, 7, 2, 4, 6, 8], 1], []]],
    ref: function (root, val) { let n = root; while (n && n.val !== val) n = val < n.val ? n.left : n.right; return n; }
  },
  'range-sum-of-bst': {
    fn: 'rangeSumBST', params: ['root', 'low', 'high'], cmp: 'exact', io: { args: ['tree', null, null] }, meta: ['Range Sum of BST', 938, 'Easy', 'Trees'],
    ask: 'root is a binary search tree. Return the sum of every value between low and high, both included.',
    sig: {
      py: 'def rangeSumBST(root: Optional[TreeNode], low: int, high: int) -> int:',
      js: 'function rangeSumBST(root, low, high) {',
      java: 'public int rangeSumBST(TreeNode root, int low, int high) {',
      cpp: 'int rangeSumBST(TreeNode* root, int low, int high) {',
      go: 'func rangeSumBST(root *TreeNode, low int, high int) int {'
    },
    examples: [[[[8, 4, 12, 2, 6], 4, 8], 18], [[[5], 1, 4], 0], [[[10, 5, 15], 5, 15], 30]],
    hidden: [[[[10, 5, 15, 3, 7, null, 18], 7, 15], 32], [[[1], 1, 1], 1], [[[20, 10, 30, 5, 15, 25, 35], 12, 27], 60], [[[4, 2, 6, 1, 3, 5, 7], 0, 100], 28], [[[50, 25, 75], 26, 74], 50]],
    ref: function (root, low, high) {
      const go = (n) => { if (!n) return 0; if (n.val < low) return go(n.right); if (n.val > high) return go(n.left); return n.val + go(n.left) + go(n.right); };
      return go(root);
    }
  },
  'minimum-absolute-difference-in-bst': {
    fn: 'getMinimumDifference', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Minimum Absolute Difference in BST', 530, 'Easy', 'Trees'],
    ask: 'root is a binary search tree with at least two nodes. Return the smallest difference between the values of any two different nodes.',
    sig: {
      py: 'def getMinimumDifference(root: Optional[TreeNode]) -> int:',
      js: 'function getMinimumDifference(root) {',
      java: 'public int getMinimumDifference(TreeNode root) {',
      cpp: 'int getMinimumDifference(TreeNode* root) {',
      go: 'func getMinimumDifference(root *TreeNode) int {'
    },
    examples: [[[[10, 4, 15]], 5], [[[5, 1, 48, null, 3]], 2], [[[9, null, 12]], 3]],
    hidden: [[[[1, 0]], 1], [[[236, 104, 701, null, 227, null, 911]], 9], [[[50, 20, 80, 10, 30, 70, 90]], 10], [[[5, 4, 7]], 1], [[[100, 50, null, 49]], 1]],
    ref: function (root) {
      let prev = null, best = Infinity;
      const go = (n) => { if (!n) return; go(n.left); if (prev !== null) best = Math.min(best, n.val - prev); prev = n.val; go(n.right); };
      go(root);
      return best;
    }
  },
  'path-sum-ii': {
    fn: 'pathSum', params: ['root', 'targetSum'], cmp: 'unordered', io: { args: ['tree', null] }, meta: ['Path Sum II', 113, 'Medium', 'Trees'],
    ask: 'Return every root-to-leaf path whose values add up to targetSum, each as a list of values from the root down. The paths may come in any order.',
    sig: {
      py: 'def pathSum(root: Optional[TreeNode], targetSum: int) -> List[List[int]]:',
      js: 'function pathSum(root, targetSum) {',
      java: 'public List<List<Integer>> pathSum(TreeNode root, int targetSum) {',
      cpp: 'vector<vector<int>> pathSum(TreeNode* root, int targetSum) {',
      go: 'func pathSum(root *TreeNode, targetSum int) [][]int {'
    },
    examples: [[[[3, 4, 5, null, 1, 2], 8], [[3, 4, 1]]], [[[1, 2, 2], 3], [[1, 2], [1, 2]]], [[[], 5], []]],
    hidden: [[[[1], 1], [[1]]], [[[1, 2], 1], []], [[[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22], [[5, 4, 11, 2], [5, 8, 4, 5]]], [[[-1, -2, -3], -3], [[-1, -2]]], [[[0, 1, 1], 1], [[0, 1], [0, 1]]]],
    ref: function (root, targetSum) {
      const out = [], path = [];
      const go = (n, s) => {
        if (!n) return; path.push(n.val); s -= n.val;
        if (!n.left && !n.right && s === 0) out.push(path.slice());
        go(n.left, s); go(n.right, s); path.pop();
      };
      go(root, targetSum);
      return out;
    }
  },
  'sum-root-to-leaf-numbers': {
    fn: 'sumNumbers', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Sum Root to Leaf Numbers', 129, 'Medium', 'Trees'],
    ask: 'Each node holds a digit 0 to 9, and each root-to-leaf path spells a number (the root is the first digit). Return the sum of all these numbers.',
    sig: {
      py: 'def sumNumbers(root: Optional[TreeNode]) -> int:',
      js: 'function sumNumbers(root) {',
      java: 'public int sumNumbers(TreeNode root) {',
      cpp: 'int sumNumbers(TreeNode* root) {',
      go: 'func sumNumbers(root *TreeNode) int {'
    },
    examples: [[[[4, 1, 2]], 83], [[[7]], 7], [[[1, 0, null, 5, 6]], 211]],
    hidden: [[[[0]], 0], [[[9, 9, 9]], 198], [[[1, 2, 3, 4, 5, 6, 7]], 522], [[[2, null, 3, null, 4]], 234], [[[5, 0, 8, null, 1]], 559]],
    ref: function (root) {
      const go = (n, v) => { if (!n) return 0; v = v * 10 + n.val; if (!n.left && !n.right) return v; return go(n.left, v) + go(n.right, v); };
      return go(root, 0);
    }
  },
  'count-good-nodes-in-binary-tree': {
    fn: 'goodNodes', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Count Good Nodes in Binary Tree', 1448, 'Medium', 'Trees'],
    ask: 'A node is good if no node on the path from the root to it has a bigger value. Return how many good nodes the tree has.',
    sig: {
      py: 'def goodNodes(root: Optional[TreeNode]) -> int:',
      js: 'function goodNodes(root) {',
      java: 'public int goodNodes(TreeNode root) {',
      cpp: 'int goodNodes(TreeNode* root) {',
      go: 'func goodNodes(root *TreeNode) int {'
    },
    examples: [[[[2, 1, 4]], 2], [[[5]], 1], [[[6, 6, null, 8, 1]], 3]],
    hidden: [[[[1, 2, 3, 4, 5, 6, 7]], 7], [[[7, 6, 5, 4, 3, 2, 1]], 1], [[[3, 1, 4, 3, null, 1, 5]], 4], [[[-1, -2, 0]], 2], [[[2, null, 4, 10, 8, null, null, 4]], 4]],
    ref: function (root) {
      const go = (n, m) => { if (!n) return 0; const good = n.val >= m ? 1 : 0; m = Math.max(m, n.val); return good + go(n.left, m) + go(n.right, m); };
      return go(root, -Infinity);
    }
  },
  'path-sum-iii': {
    fn: 'pathSum', params: ['root', 'targetSum'], cmp: 'exact', io: { args: ['tree', null] }, meta: ['Path Sum III', 437, 'Medium', 'Trees'],
    ask: 'Count the downward paths (starting at any node and going only from parent to child, ending anywhere) whose values add up to targetSum.',
    sig: {
      py: 'def pathSum(root: Optional[TreeNode], targetSum: int) -> int:',
      js: 'function pathSum(root, targetSum) {',
      java: 'public int pathSum(TreeNode root, int targetSum) {',
      cpp: 'int pathSum(TreeNode* root, int targetSum) {',
      go: 'func pathSum(root *TreeNode, targetSum int) int {'
    },
    examples: [[[[2, 1, 3], 3], 2], [[[1], 2], 0], [[[0, 0, 0], 0], 5]],
    hidden: [[[[], 0], 0], [[[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8], 3], [[[1, -1, 1, null, 1, -1], 0], 3], [[[3, 3, 3, 3], 6], 3], [[[1, 2, 3, 4, 5], 7], 2]],
    ref: function (root, targetSum) {
      const seen = new Map([[0, 1]]);
      const go = (n, s) => {
        if (!n) return 0; s += n.val;
        let c = seen.get(s - targetSum) || 0;
        seen.set(s, (seen.get(s) || 0) + 1);
        c += go(n.left, s) + go(n.right, s);
        seen.set(s, seen.get(s) - 1);
        return c;
      };
      return go(root, 0);
    }
  },
  'lowest-common-ancestor-of-a-binary-search-tree': {
    fn: 'lowestCommonAncestor', params: ['root', 'p', 'q'], cmp: 'exact', io: { args: ['tree', null, null] }, meta: ['Lowest Common Ancestor of a Binary Search Tree', 235, 'Medium', 'Trees'],
    ask: 'root is a binary search tree with distinct values, and p and q are the values of two of its nodes. Return the value of their lowest common ancestor: the deepest node that has both below it (a node counts as below itself).',
    sig: {
      py: 'def lowestCommonAncestor(root: Optional[TreeNode], p: int, q: int) -> int:',
      js: 'function lowestCommonAncestor(root, p, q) {',
      java: 'public int lowestCommonAncestor(TreeNode root, int p, int q) {',
      cpp: 'int lowestCommonAncestor(TreeNode* root, int p, int q) {',
      go: 'func lowestCommonAncestor(root *TreeNode, p int, q int) int {'
    },
    examples: [[[[6, 3, 9, 1, 4, 7, 10], 1, 4], 3], [[[6, 3, 9, 1, 4, 7, 10], 4, 7], 6], [[[2, 1], 2, 1], 2]],
    hidden: [[[[5, 3, 8], 3, 8], 5], [[[20, 10, 30, 5, 15, 25, 35, 2], 2, 15], 10], [[[20, 10, 30, 5, 15, 25, 35], 25, 35], 30], [[[4, 2, 6, 1, 3, 5, 7], 7, 7], 7], [[[1, null, 2, null, 3, null, 4], 3, 4], 3]],
    ref: function (root, p, q) {
      let n = root;
      while (n) { if (p < n.val && q < n.val) n = n.left; else if (p > n.val && q > n.val) n = n.right; else return n.val; }
      return null;
    }
  },
  'lowest-common-ancestor-of-a-binary-tree': {
    fn: 'lowestCommonAncestor', params: ['root', 'p', 'q'], cmp: 'exact', io: { args: ['tree', null, null] }, meta: ['Lowest Common Ancestor of a Binary Tree', 236, 'Medium', 'Trees'],
    ask: 'The tree has distinct values, and p and q are the values of two of its nodes. Return the value of their lowest common ancestor: the deepest node that has both below it (a node counts as below itself).',
    sig: {
      py: 'def lowestCommonAncestor(root: Optional[TreeNode], p: int, q: int) -> int:',
      js: 'function lowestCommonAncestor(root, p, q) {',
      java: 'public int lowestCommonAncestor(TreeNode root, int p, int q) {',
      cpp: 'int lowestCommonAncestor(TreeNode* root, int p, int q) {',
      go: 'func lowestCommonAncestor(root *TreeNode, p int, q int) int {'
    },
    examples: [[[[7, 2, 9, 4, 1, null, 5], 4, 1], 2], [[[7, 2, 9, 4, 1, null, 5], 4, 5], 7], [[[7, 2, 9, 4, 1, null, 5], 2, 1], 2]],
    hidden: [[[[1, 2], 1, 2], 1], [[[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7, 8], 3], [[[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 6, 4], 5], [[[1, null, 2, null, 3], 3, 2], 2], [[[10, 20, 30, 40, 50, 60, 70], 40, 50], 20]],
    ref: function (root, p, q) {
      const go = (n) => {
        if (!n || n.val === p || n.val === q) return n;
        const a = go(n.left), b = go(n.right);
        return a && b ? n : a || b;
      };
      const r = go(root);
      return r ? r.val : null;
    }
  },
  'insert-into-a-binary-search-tree': {
    fn: 'insertIntoBST', params: ['root', 'val'], cmp: 'any', io: { args: ['tree', null], ret: 'tree' }, meta: ['Insert into a Binary Search Tree', 701, 'Medium', 'Trees'],
    ask: 'root is a binary search tree, and val is not in it yet. Insert val and return the root. Any result that is a valid binary search tree holding the old values plus val is accepted.',
    sig: {
      py: 'def insertIntoBST(root: Optional[TreeNode], val: int) -> Optional[TreeNode]:',
      js: 'function insertIntoBST(root, val) {',
      java: 'public TreeNode insertIntoBST(TreeNode root, int val) {',
      cpp: 'TreeNode* insertIntoBST(TreeNode* root, int val) {',
      go: 'func insertIntoBST(root *TreeNode, val int) *TreeNode {'
    },
    examples: [[[[5, 2, 8], 6], [5, 2, 8, null, null, 6]], [[[], 3], [3]], [[[10, 5], 1], [10, 5, null, 1]]],
    hidden: [[[[1], 2], [1, null, 2]], [[[8, 4, 12, 2, 6, 10, 14], 7], [8, 4, 12, 2, 6, 10, 14, null, null, null, 7]], [[[8, 4, 12, 2, 6, 10, 14], 15], [8, 4, 12, 2, 6, 10, 14, null, null, null, null, null, null, null, 15]], [[[50, 30, 70, null, 40], 35], [50, 30, 70, null, 40, null, null, 35]], [[[3, 1, null, null, 2], 0], [3, 1, null, 0, 2]]],
    check: function (args, got) {
      if (!Array.isArray(got)) return false;
      const build = (a) => {
        if (!a.length || a[0] === null) return null;
        const root = { v: a[0], l: null, r: null }, q = [root]; let k = 1;
        for (let h = 0; h < q.length && k < a.length; h++) {
          if (k < a.length && a[k] !== null) { q[h].l = { v: a[k], l: null, r: null }; q.push(q[h].l); } k++;
          if (k < a.length && a[k] !== null) { q[h].r = { v: a[k], l: null, r: null }; q.push(q[h].r); } k++;
        }
        return root;
      };
      const vals = [];
      const walk = (n) => { if (!n) return; walk(n.l); vals.push(n.v); walk(n.r); };
      walk(build(got));
      const want = args[0].filter((x) => x !== null).concat([args[1]]).sort((x, y) => x - y);
      return vals.length === want.length && vals.every((x, i) => x === want[i]);
    },
    ref: function (root, val) {
      const node = { val, left: null, right: null };
      if (!root) return node;
      let n = root;
      while (true) {
        if (val < n.val) { if (!n.left) { n.left = node; break; } n = n.left; } else { if (!n.right) { n.right = node; break; } n = n.right; }
      }
      return root;
    }
  },
  'flatten-binary-tree-to-linked-list': {
    fn: 'flatten', params: ['root'], cmp: 'exact', io: { args: ['tree'], inplace: 0 }, meta: ['Flatten Binary Tree to Linked List', 114, 'Medium', 'Trees'],
    ask: 'Flatten the tree in place into a chain that follows preorder: every node\'s left child becomes null and its right child is the next node in preorder. Return nothing.',
    sig: {
      py: 'def flatten(root: Optional[TreeNode]) -> None:',
      js: 'function flatten(root) {',
      java: 'public void flatten(TreeNode root) {',
      cpp: 'void flatten(TreeNode* root) {',
      go: 'func flatten(root *TreeNode) {'
    },
    examples: [[[[1, 2, 5, 3, 4]], [1, null, 2, null, 3, null, 4, null, 5]], [[[]], []], [[[3, null, 4]], [3, null, 4]]],
    hidden: [[[[1]], [1]], [[[1, 2]], [1, null, 2]], [[[1, 2, 3, 4, 5, 6, 7]], [1, null, 2, null, 4, null, 5, null, 3, null, 6, null, 7]], [[[4, null, 2, 1]], [4, null, 2, null, 1]], [[[9, 8, null, 7, null, 6]], [9, null, 8, null, 7, null, 6]]],
    ref: function (root) {
      for (let n = root; n; n = n.right) {
        if (n.left) { let p = n.left; while (p.right) p = p.right; p.right = n.right; n.right = n.left; n.left = null; }
      }
    }
  },
  'construct-binary-tree-from-preorder-and-inorder-traversal': {
    fn: 'buildTree', params: ['preorder', 'inorder'], cmp: 'exact', io: { ret: 'tree' }, meta: ['Construct Binary Tree from Preorder and Inorder Traversal', 105, 'Medium', 'Trees'],
    ask: 'preorder and inorder are two walks of the same binary tree, whose values are all different. Rebuild the tree and return its root.',
    sig: {
      py: 'def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:',
      js: 'function buildTree(preorder, inorder) {',
      java: 'public TreeNode buildTree(int[] preorder, int[] inorder) {',
      cpp: 'TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {',
      go: 'func buildTree(preorder []int, inorder []int) *TreeNode {'
    },
    examples: [[[[2, 1, 3], [1, 2, 3]], [2, 1, 3]], [[[5], [5]], [5]], [[[1, 2, 4, 3], [4, 2, 1, 3]], [1, 2, 3, 4]]],
    hidden: [[[[], []], []], [[[1, 2, 3], [3, 2, 1]], [1, 2, null, 3]], [[[1, 2, 3], [1, 2, 3]], [1, null, 2, null, 3]], [[[4, 2, 1, 3, 6, 5, 7], [1, 2, 3, 4, 5, 6, 7]], [4, 2, 6, 1, 3, 5, 7]], [[[8, 5, 9, 7, 1, 12, 2, 4, 11, 3], [9, 5, 1, 7, 2, 12, 8, 4, 3, 11]], [8, 5, 4, 9, 7, null, 11, null, null, 1, 12, 3, null, null, null, 2]]],
    ref: function (preorder, inorder) {
      const at = new Map(inorder.map((v, i) => [v, i])); let p = 0;
      const build = (lo, hi) => {
        if (lo > hi) return null;
        const v = preorder[p++], node = { val: v, left: null, right: null }, m = at.get(v);
        node.left = build(lo, m - 1); node.right = build(m + 1, hi);
        return node;
      };
      return build(0, inorder.length - 1);
    }
  },
  'house-robber-iii': {
    fn: 'rob', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['House Robber III', 337, 'Medium', 'Trees'],
    ask: 'Houses form a binary tree, each holding some money. Robbing two houses joined directly (parent and child) sets off the alarm. Return the most money you can take.',
    sig: {
      py: 'def rob(root: Optional[TreeNode]) -> int:',
      js: 'function rob(root) {',
      java: 'public int rob(TreeNode root) {',
      cpp: 'int rob(TreeNode* root) {',
      go: 'func rob(root *TreeNode) int {'
    },
    examples: [[[[4, 1, 1]], 4], [[[1, 5, 6]], 11], [[[2, 1, 3, null, 4]], 7]],
    hidden: [[[[]], 0], [[[10]], 10], [[[3, 4, 5, 1, 3, null, 1]], 9], [[[1, 2, 3, 4, 5, 6, 7]], 23], [[[5, 1, 1, 9, null, null, 9]], 23]],
    ref: function (root) {
      const go = (n) => { if (!n) return [0, 0]; const l = go(n.left), r = go(n.right); return [n.val + l[1] + r[1], Math.max(...l) + Math.max(...r)]; };
      return Math.max(...go(root));
    }
  },
  'binary-tree-maximum-path-sum': {
    fn: 'maxPathSum', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Maximum Path Sum', 124, 'Hard', 'Trees'],
    ask: 'A path is a chain of nodes joined by edges, using each node at most once; it need not pass through the root. Return the largest sum of values along any non-empty path.',
    sig: {
      py: 'def maxPathSum(root: Optional[TreeNode]) -> int:',
      js: 'function maxPathSum(root) {',
      java: 'public int maxPathSum(TreeNode root) {',
      cpp: 'int maxPathSum(TreeNode* root) {',
      go: 'func maxPathSum(root *TreeNode) int {'
    },
    examples: [[[[2, -1, 3]], 5], [[[-4]], -4], [[[1, 8, 2, 4, -9]], 15]],
    hidden: [[[[-3, -2, -1]], -1], [[[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]], 48], [[[1, 2]], 3], [[[-10, 9, 20, null, null, 15, 7]], 42], [[[2, -5, -6, 10]], 10]],
    ref: function (root) {
      let best = -Infinity;
      const go = (n) => { if (!n) return 0; const l = Math.max(0, go(n.left)), r = Math.max(0, go(n.right)); best = Math.max(best, n.val + l + r); return n.val + Math.max(l, r); };
      go(root);
      return best;
    }
  },
  'convert-sorted-array-to-binary-search-tree': {
    fn: 'sortedArrayToBST', params: ['nums'], cmp: 'any', io: { ret: 'tree' }, meta: ['Convert Sorted Array to Binary Search Tree', 108, 'Easy', 'Trees'],
    ask: 'nums is sorted with no repeats. Build a height-balanced binary search tree from it (the two subtrees of every node differ in height by at most one) and return its root. Any such tree is accepted.',
    sig: {
      py: 'def sortedArrayToBST(nums: List[int]) -> Optional[TreeNode]:',
      js: 'function sortedArrayToBST(nums) {',
      java: 'public TreeNode sortedArrayToBST(int[] nums) {',
      cpp: 'TreeNode* sortedArrayToBST(vector<int>& nums) {',
      go: 'func sortedArrayToBST(nums []int) *TreeNode {'
    },
    examples: [[[[1, 2, 3]], [2, 1, 3]], [[[4]], [4]], [[[1, 5]], [1, null, 5]]],
    hidden: [[[[]], []], [[[-3, -1, 0, 2, 7]], [0, -3, 2, null, -1, null, 7]], [[[1, 2, 3, 4, 5, 6, 7]], [4, 2, 6, 1, 3, 5, 7]], [[[10, 20, 30, 40]], [20, 10, 30, null, null, null, 40]], [[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]], [5, 2, 8, 0, 3, 6, 10, null, 1, null, 4, null, 7, 9, 11]]],
    check: function (args, got) {
      if (!Array.isArray(got)) return false;
      const a = got;
      let root = null;
      if (a.length && a[0] !== null) {
        root = { v: a[0], l: null, r: null }; const q = [root]; let k = 1;
        for (let h = 0; h < q.length && k < a.length; h++) {
          if (k < a.length && a[k] !== null) { q[h].l = { v: a[k], l: null, r: null }; q.push(q[h].l); } k++;
          if (k < a.length && a[k] !== null) { q[h].r = { v: a[k], l: null, r: null }; q.push(q[h].r); } k++;
        }
      }
      const vals = []; let ok = true;
      const h = (n) => { if (!n) return 0; const l = h(n.l); vals.push(n.v); const r = h(n.r); if (Math.abs(l - r) > 1) ok = false; return 1 + Math.max(l, r); };
      h(root);
      return ok && vals.length === args[0].length && vals.every((x, i) => x === args[0][i]);
    },
    ref: function (nums) {
      const build = (lo, hi) => { if (lo > hi) return null; const m = (lo + hi) >> 1; return { val: nums[m], left: build(lo, m - 1), right: build(m + 1, hi) }; };
      return build(0, nums.length - 1);
    }
  },
  'minimum-depth-of-binary-tree': {
    fn: 'minDepth', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Minimum Depth of Binary Tree', 111, 'Easy', 'Breadth-First Search'],
    ask: 'Return how many nodes lie on the shortest path from the root down to a leaf. An empty tree has depth 0.',
    sig: {
      py: 'def minDepth(root: Optional[TreeNode]) -> int:',
      js: 'function minDepth(root) {',
      java: 'public int minDepth(TreeNode root) {',
      cpp: 'int minDepth(TreeNode* root) {',
      go: 'func minDepth(root *TreeNode) int {'
    },
    examples: [[[[5, 4, 8]], 2], [[[]], 0], [[[1, null, 2, null, 3]], 3]],
    hidden: [[[[1]], 1], [[[1, 2]], 2], [[[1, 2, 3, 4, null, null, 5]], 3], [[[3, 9, 20, null, null, 15, 7]], 2], [[[1, 2, 3, 4, 5, 6, 7, 8]], 3]],
    ref: function (root) {
      if (!root) return 0;
      let level = [root], d = 1;
      while (true) {
        const next = [];
        for (const n of level) { if (!n.left && !n.right) return d; if (n.left) next.push(n.left); if (n.right) next.push(n.right); }
        level = next; d++;
      }
    }
  },
  'average-of-levels-in-binary-tree': {
    fn: 'averageOfLevels', params: ['root'], cmp: 'float', io: { args: ['tree'] }, meta: ['Average of Levels in Binary Tree', 637, 'Easy', 'Breadth-First Search'],
    ask: 'The tree has at least one node. Return the average value of the nodes on each level, from the root level down.',
    sig: {
      py: 'def averageOfLevels(root: Optional[TreeNode]) -> List[float]:',
      js: 'function averageOfLevels(root) {',
      java: 'public List<Double> averageOfLevels(TreeNode root) {',
      cpp: 'vector<double> averageOfLevels(TreeNode* root) {',
      go: 'func averageOfLevels(root *TreeNode) []float64 {'
    },
    examples: [[[[4, 2, 7]], [4, 4.5]], [[[1]], [1]], [[[6, 1, null, 2, 3]], [6, 1, 2.5]]],
    hidden: [[[[1, 2, 3, 4, 5, 6, 7]], [1, 2.5, 5.5]], [[[-5, -2, 1]], [-5, -0.5]], [[[2147483647, 2147483647, 2147483647]], [2147483647, 2147483647]], [[[0, null, 7, 3]], [0, 7, 3]], [[[10, 1, 2, 3, null, null, 4]], [10, 1.5, 3.5]]],
    ref: function (root) {
      const out = []; let level = [root];
      while (level.length) {
        out.push(level.reduce((s, n) => s + n.val, 0) / level.length);
        const next = []; for (const n of level) { if (n.left) next.push(n.left); if (n.right) next.push(n.right); }
        level = next;
      }
      return out;
    }
  },
  'binary-tree-zigzag-level-order-traversal': {
    fn: 'zigzagLevelOrder', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Zigzag Level Order Traversal', 103, 'Medium', 'Breadth-First Search'],
    ask: 'Return the values level by level, reading the first level left to right, the next right to left, and switching direction on every level.',
    sig: {
      py: 'def zigzagLevelOrder(root: Optional[TreeNode]) -> List[List[int]]:',
      js: 'function zigzagLevelOrder(root) {',
      java: 'public List<List<Integer>> zigzagLevelOrder(TreeNode root) {',
      cpp: 'vector<vector<int>> zigzagLevelOrder(TreeNode* root) {',
      go: 'func zigzagLevelOrder(root *TreeNode) [][]int {'
    },
    examples: [[[[1, 2, 3, 4, 5, 6, 7]], [[1], [3, 2], [4, 5, 6, 7]]], [[[]], []], [[[8, null, 9]], [[8], [9]]]],
    hidden: [[[[1]], [[1]]], [[[1, 2, 3]], [[1], [3, 2]]], [[[3, 9, 20, null, null, 15, 7]], [[3], [20, 9], [15, 7]]], [[[1, 2, 3, 4, null, null, 5, 6, null, null, 7]], [[1], [3, 2], [4, 5], [7, 6]]], [[[5, 4, 3, 2, 1]], [[5], [3, 4], [2, 1]]]],
    ref: function (root) {
      const out = []; let level = root ? [root] : [];
      while (level.length) {
        const vals = level.map((n) => n.val); out.push(out.length % 2 ? vals.reverse() : vals);
        const next = []; for (const n of level) { if (n.left) next.push(n.left); if (n.right) next.push(n.right); }
        level = next;
      }
      return out;
    }
  },
  'maximum-level-sum-of-a-binary-tree': {
    fn: 'maxLevelSum', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Maximum Level Sum of a Binary Tree', 1161, 'Medium', 'Breadth-First Search'],
    ask: 'The root is on level 1, its children on level 2, and so on. Return the level whose values add up to the most; on a tie, the smallest such level.',
    sig: {
      py: 'def maxLevelSum(root: Optional[TreeNode]) -> int:',
      js: 'function maxLevelSum(root) {',
      java: 'public int maxLevelSum(TreeNode root) {',
      cpp: 'int maxLevelSum(TreeNode* root) {',
      go: 'func maxLevelSum(root *TreeNode) int {'
    },
    examples: [[[[1, 5, -2]], 2], [[[9, 1, 2]], 1], [[[-1, -2, -3]], 1]],
    hidden: [[[[0]], 1], [[[1, 7, 0, 7, -8, null, null]], 2], [[[2, 1, 1]], 1], [[[-10, 3, 4, -1, -1, 9]], 2], [[[1, 2, 3, 4, 5, 6, 7]], 3]],
    ref: function (root) {
      let level = [root], d = 1, best = -Infinity, at = 1;
      while (level.length) {
        const s = level.reduce((a, n) => a + n.val, 0); if (s > best) { best = s; at = d; }
        const next = []; for (const n of level) { if (n.left) next.push(n.left); if (n.right) next.push(n.right); }
        level = next; d++;
      }
      return at;
    }
  },
  'flood-fill': {
    fn: 'floodFill', params: ['image', 'sr', 'sc', 'color'], cmp: 'exact', meta: ['Flood Fill', 733, 'Easy', 'Depth-First Search'],
    ask: 'Start at pixel (sr, sc). Repaint it and every pixel of the same original colour joined to it up, down, left or right (through such pixels) with color. Return the image.',
    sig: {
      py: 'def floodFill(image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:',
      js: 'function floodFill(image, sr, sc, color) {',
      java: 'public int[][] floodFill(int[][] image, int sr, int sc, int color) {',
      cpp: 'vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {',
      go: 'func floodFill(image [][]int, sr int, sc int, color int) [][]int {'
    },
    examples: [[[[[1, 1, 0], [1, 0, 0], [0, 0, 1]], 0, 0, 5], [[5, 5, 0], [5, 0, 0], [0, 0, 1]]], [[[[3]], 0, 0, 3], [[3]]], [[[[0, 0], [0, 0]], 1, 1, 4], [[4, 4], [4, 4]]]],
    hidden: [[[[[1, 2, 1]], 0, 1, 7], [[1, 7, 1]]], [[[[2, 2, 2], [2, 0, 2], [2, 2, 2]], 1, 1, 9], [[2, 2, 2], [2, 9, 2], [2, 2, 2]]], [[[[2, 2, 2], [2, 0, 2], [2, 2, 2]], 0, 0, 1], [[1, 1, 1], [1, 0, 1], [1, 1, 1]]], [[[[1, 0, 1], [0, 1, 0], [1, 0, 1]], 1, 1, 3], [[1, 0, 1], [0, 3, 0], [1, 0, 1]]], [[[[6, 6], [6, 6]], 0, 1, 6], [[6, 6], [6, 6]]]],
    ref: function (image, sr, sc, color) {
      const img = image.map((r) => r.slice()), old = img[sr][sc];
      if (old === color) return img;
      const st = [[sr, sc]];
      while (st.length) {
        const [r, c] = st.pop();
        if (r < 0 || c < 0 || r >= img.length || c >= img[0].length || img[r][c] !== old) continue;
        img[r][c] = color; st.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
      }
      return img;
    }
  },
  'island-perimeter': {
    fn: 'islandPerimeter', params: ['grid'], cmp: 'exact', meta: ['Island Perimeter', 463, 'Easy', 'Depth-First Search'],
    ask: 'grid holds 1 for land and 0 for water, with exactly one island (land joined up, down, left or right) and no lakes inside it. Return the length of the island\'s coastline, where each cell side is 1.',
    sig: {
      py: 'def islandPerimeter(grid: List[List[int]]) -> int:',
      js: 'function islandPerimeter(grid) {',
      java: 'public int islandPerimeter(int[][] grid) {',
      cpp: 'int islandPerimeter(vector<vector<int>>& grid) {',
      go: 'func islandPerimeter(grid [][]int) int {'
    },
    examples: [[[[[1]]], 4], [[[[1, 1]]], 6], [[[[0, 1, 0], [1, 1, 1]]], 10]],
    hidden: [[[[[1], [1], [1]]], 8], [[[[1, 1], [1, 1]]], 8], [[[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], 4], [[[[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]], 16], [[[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], 16]],
    ref: function (grid) {
      let p = 0;
      for (let r = 0; r < grid.length; r++) for (let c = 0; c < grid[0].length; c++) if (grid[r][c]) {
        p += 4;
        if (r && grid[r - 1][c]) p -= 2;
        if (c && grid[r][c - 1]) p -= 2;
      }
      return p;
    }
  },
  'find-if-path-exists-in-graph': {
    fn: 'validPath', params: ['n', 'edges', 'source', 'destination'], cmp: 'exact', meta: ['Find if Path Exists in Graph', 1971, 'Easy', 'Depth-First Search'],
    ask: 'Vertices are numbered 0 to n - 1 and edges are two-way. Return true if you can walk from source to destination.',
    sig: {
      py: 'def validPath(n: int, edges: List[List[int]], source: int, destination: int) -> bool:',
      js: 'function validPath(n, edges, source, destination) {',
      java: 'public boolean validPath(int n, int[][] edges, int source, int destination) {',
      cpp: 'bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {',
      go: 'func validPath(n int, edges [][]int, source int, destination int) bool {'
    },
    examples: [[[3, [[0, 1], [1, 2]], 0, 2], true], [[4, [[0, 1], [2, 3]], 0, 3], false], [[1, [], 0, 0], true]],
    hidden: [[[2, [], 0, 1], false], [[5, [[0, 4], [4, 3], [3, 2], [2, 1]], 1, 0], true], [[6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5], false], [[3, [[2, 1]], 1, 2], true], [[4, [[0, 1], [1, 2], [2, 0]], 3, 0], false]],
    ref: function (n, edges, source, destination) {
      const p = Array.from({ length: n }, (_, i) => i);
      const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
      for (const [a, b] of edges) p[find(a)] = find(b);
      return find(source) === find(destination);
    }
  },
  'keys-and-rooms': {
    fn: 'canVisitAllRooms', params: ['rooms'], cmp: 'exact', meta: ['Keys and Rooms', 841, 'Medium', 'Depth-First Search'],
    ask: 'Room 0 is open and every other room is locked. rooms[i] lists the keys you find in room i (a key k opens room k). Return true if you can get into every room.',
    sig: {
      py: 'def canVisitAllRooms(rooms: List[List[int]]) -> bool:',
      js: 'function canVisitAllRooms(rooms) {',
      java: 'public boolean canVisitAllRooms(List<List<Integer>> rooms) {',
      cpp: 'bool canVisitAllRooms(vector<vector<int>>& rooms) {',
      go: 'func canVisitAllRooms(rooms [][]int) bool {'
    },
    examples: [[[[[1], [2], []]], true], [[[[2], [], [0]]], false], [[[[1, 2], [], []]], true]],
    hidden: [[[[[]]], true], [[[[], [0]]], false], [[[[3], [0], [1], [2]]], true], [[[[1, 3], [3, 0, 1], [2], [0]]], false], [[[[2, 3], [], [1], []]], true]],
    ref: function (rooms) {
      const seen = new Set([0]), st = [0];
      while (st.length) for (const k of rooms[st.pop()]) if (!seen.has(k)) { seen.add(k); st.push(k); }
      return seen.size === rooms.length;
    }
  },
  'number-of-provinces': {
    fn: 'findCircleNum', params: ['isConnected'], cmp: 'exact', meta: ['Number of Provinces', 547, 'Medium', 'Depth-First Search'],
    ask: 'isConnected[i][j] is 1 when cities i and j are directly linked. A province is a group of cities linked directly or through other cities. Return how many provinces there are.',
    sig: {
      py: 'def findCircleNum(isConnected: List[List[int]]) -> int:',
      js: 'function findCircleNum(isConnected) {',
      java: 'public int findCircleNum(int[][] isConnected) {',
      cpp: 'int findCircleNum(vector<vector<int>>& isConnected) {',
      go: 'func findCircleNum(isConnected [][]int) int {'
    },
    examples: [[[[[1, 0], [0, 1]]], 2], [[[[1, 0, 1], [0, 1, 0], [1, 0, 1]]], 2], [[[[1]]], 1]],
    hidden: [[[[[1, 1, 1], [1, 1, 1], [1, 1, 1]]], 1], [[[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]], 4], [[[[1, 1, 0, 0], [1, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 1]]], 2], [[[[1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1]]], 2], [[[[1, 1], [1, 1]]], 1]],
    ref: function (isConnected) {
      const n = isConnected.length, seen = new Array(n).fill(false); let count = 0;
      const go = (i) => { seen[i] = true; for (let j = 0; j < n; j++) if (isConnected[i][j] && !seen[j]) go(j); };
      for (let i = 0; i < n; i++) if (!seen[i]) { count++; go(i); }
      return count;
    }
  },
  'number-of-closed-islands': {
    fn: 'closedIsland', params: ['grid'], cmp: 'exact', meta: ['Number of Closed Islands', 1254, 'Medium', 'Depth-First Search'],
    ask: 'Here 0 is land and 1 is water. An island is land joined up, down, left or right. A closed island is one that is surrounded by water on all sides, so it does not touch the edge of the grid. Return how many closed islands there are.',
    sig: {
      py: 'def closedIsland(grid: List[List[int]]) -> int:',
      js: 'function closedIsland(grid) {',
      java: 'public int closedIsland(int[][] grid) {',
      cpp: 'int closedIsland(vector<vector<int>>& grid) {',
      go: 'func closedIsland(grid [][]int) int {'
    },
    examples: [[[[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], 1], [[[[0, 1], [1, 1]]], 0], [[[[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 1, 1, 1, 1]]], 2]],
    hidden: [[[[[0]]], 0], [[[[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]]], 1], [[[[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 0], [1, 1, 1, 1]]], 0], [[[[1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1], [1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1]]], 4], [[[[1, 1, 1], [1, 1, 1]]], 0]],
    ref: function (grid) {
      const g = grid.map((r) => r.slice()), R = g.length, C = g[0].length;
      const sink = (r, c) => { if (r < 0 || c < 0 || r >= R || c >= C || g[r][c]) return true; g[r][c] = 1; const edge = r === 0 || c === 0 || r === R - 1 || c === C - 1; const a = sink(r + 1, c), b = sink(r - 1, c), d = sink(r, c + 1), e = sink(r, c - 1); return !edge && a && b && d && e; };
      let n = 0;
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (!g[r][c] && sink(r, c)) n++;
      return n;
    }
  },
  'number-of-enclaves': {
    fn: 'numEnclaves', params: ['grid'], cmp: 'exact', meta: ['Number of Enclaves', 1020, 'Medium', 'Depth-First Search'],
    ask: 'grid holds 1 for land and 0 for sea. From a land cell you may step to a neighbouring land cell (up, down, left, right) or off the edge of the grid. Return how many land cells can never walk off the grid.',
    sig: {
      py: 'def numEnclaves(grid: List[List[int]]) -> int:',
      js: 'function numEnclaves(grid) {',
      java: 'public int numEnclaves(int[][] grid) {',
      cpp: 'int numEnclaves(vector<vector<int>>& grid) {',
      go: 'func numEnclaves(grid [][]int) int {'
    },
    examples: [[[[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], 1], [[[[1, 0], [0, 0]]], 0], [[[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]]], 3]],
    hidden: [[[[[1]]], 0], [[[[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]], 3], [[[[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]]], 0], [[[[0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0]]], 2], [[[[1, 1, 1], [1, 1, 1], [1, 1, 1]]], 0]],
    ref: function (grid) {
      const g = grid.map((r) => r.slice()), R = g.length, C = g[0].length;
      const sink = (r, c) => { if (r < 0 || c < 0 || r >= R || c >= C || !g[r][c]) return; g[r][c] = 0; sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1); };
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (r === 0 || c === 0 || r === R - 1 || c === C - 1) sink(r, c);
      return g.reduce((s, row) => s + row.reduce((a, b) => a + b, 0), 0);
    }
  },
  'surrounded-regions': {
    fn: 'solve', params: ['board'], cmp: 'exact', io: { inplace: 0 }, meta: ['Surrounded Regions', 130, 'Medium', 'Depth-First Search'],
    ask: 'board holds "X" and "O". A group of "O" cells joined up, down, left or right is captured when none of its cells is on the edge of the board. Change every captured "O" to "X" in place and return nothing.',
    sig: {
      py: 'def solve(board: List[List[str]]) -> None:',
      js: 'function solve(board) {',
      java: 'public void solve(char[][] board) {',
      cpp: 'void solve(vector<vector<char>>& board) {',
      go: 'func solve(board [][]byte) {'
    },
    examples: [[[[['X', 'X', 'X'], ['X', 'O', 'X'], ['X', 'X', 'X']]], [['X', 'X', 'X'], ['X', 'X', 'X'], ['X', 'X', 'X']]], [[[['O', 'X'], ['X', 'X']]], [['O', 'X'], ['X', 'X']]], [[[['X', 'X', 'X', 'X'], ['X', 'O', 'X', 'X'], ['X', 'X', 'O', 'X'], ['X', 'X', 'O', 'O']]], [['X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X'], ['X', 'X', 'O', 'X'], ['X', 'X', 'O', 'O']]]],
    hidden: [[[[['O']]], [['O']]], [[[['X', 'X', 'X', 'X', 'X'], ['X', 'O', 'O', 'O', 'X'], ['X', 'O', 'X', 'O', 'X'], ['X', 'O', 'O', 'O', 'X'], ['X', 'X', 'X', 'X', 'X']]], [['X', 'X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X', 'X']]], [[[['O', 'O', 'O'], ['O', 'X', 'O'], ['O', 'O', 'O']]], [['O', 'O', 'O'], ['O', 'X', 'O'], ['O', 'O', 'O']]], [[[['X', 'O', 'X', 'X'], ['O', 'X', 'O', 'X'], ['X', 'O', 'X', 'O'], ['O', 'X', 'O', 'X']]], [['X', 'O', 'X', 'X'], ['O', 'X', 'X', 'X'], ['X', 'X', 'X', 'O'], ['O', 'X', 'O', 'X']]], [[[['X', 'X', 'X', 'X'], ['X', 'O', 'O', 'X'], ['X', 'X', 'O', 'X'], ['X', 'X', 'O', 'X']]], [['X', 'X', 'X', 'X'], ['X', 'O', 'O', 'X'], ['X', 'X', 'O', 'X'], ['X', 'X', 'O', 'X']]]],
    ref: function (board) {
      const R = board.length, C = board[0].length;
      const keep = (r, c) => { if (r < 0 || c < 0 || r >= R || c >= C || board[r][c] !== 'O') return; board[r][c] = 'S'; keep(r + 1, c); keep(r - 1, c); keep(r, c + 1); keep(r, c - 1); };
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (r === 0 || c === 0 || r === R - 1 || c === C - 1) keep(r, c);
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) board[r][c] = board[r][c] === 'S' ? 'O' : 'X';
    }
  },
  'pacific-atlantic-water-flow': {
    fn: 'pacificAtlantic', params: ['heights'], cmp: 'unordered', meta: ['Pacific Atlantic Water Flow', 417, 'Medium', 'Depth-First Search'],
    ask: 'heights is an island map. The Pacific touches the top and left edges, the Atlantic the bottom and right edges. Rain flows to a neighbouring cell (up, down, left, right) that is not higher. Return every cell [r, c] whose rain can reach both oceans, in any order.',
    sig: {
      py: 'def pacificAtlantic(heights: List[List[int]]) -> List[List[int]]:',
      js: 'function pacificAtlantic(heights) {',
      java: 'public List<List<Integer>> pacificAtlantic(int[][] heights) {',
      cpp: 'vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {',
      go: 'func pacificAtlantic(heights [][]int) [][]int {'
    },
    examples: [[[[[1]]], [[0, 0]]], [[[[1, 2], [2, 1]]], [[0, 1], [1, 0]]], [[[[3, 3, 3], [3, 1, 3], [3, 3, 3]]], [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]]],
    hidden: [[[[[1, 2, 3]]], [[0, 0], [0, 1], [0, 2]]], [[[[5, 4], [4, 5]]], [[0, 0], [0, 1], [1, 0], [1, 1]]], [[[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]], [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]], [[[[2, 2], [2, 2]]], [[0, 0], [0, 1], [1, 0], [1, 1]]], [[[[9, 1, 9], [1, 1, 1], [9, 1, 9]]], [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]]],
    ref: function (heights) {
      const R = heights.length, C = heights[0].length;
      const flood = (starts) => {
        const seen = new Set(), st = starts.slice();
        starts.forEach(([r, c]) => seen.add(r * C + c));
        while (st.length) {
          const [r, c] = st.pop();
          for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
            if (nr < 0 || nc < 0 || nr >= R || nc >= C || seen.has(nr * C + nc) || heights[nr][nc] < heights[r][c]) continue;
            seen.add(nr * C + nc); st.push([nr, nc]);
          }
        }
        return seen;
      };
      const pac = [], atl = [];
      for (let r = 0; r < R; r++) { pac.push([r, 0]); atl.push([r, C - 1]); }
      for (let c = 0; c < C; c++) { pac.push([0, c]); atl.push([R - 1, c]); }
      const a = flood(pac), b = flood(atl), out = [];
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (a.has(r * C + c) && b.has(r * C + c)) out.push([r, c]);
      return out;
    }
  },
  'longest-increasing-path-in-a-matrix': {
    fn: 'longestIncreasingPath', params: ['matrix'], cmp: 'exact', meta: ['Longest Increasing Path in a Matrix', 329, 'Hard', 'Depth-First Search'],
    ask: 'From each cell you may move up, down, left or right to a cell with a strictly bigger value. Return the length (in cells) of the longest such path.',
    sig: {
      py: 'def longestIncreasingPath(matrix: List[List[int]]) -> int:',
      js: 'function longestIncreasingPath(matrix) {',
      java: 'public int longestIncreasingPath(int[][] matrix) {',
      cpp: 'int longestIncreasingPath(vector<vector<int>>& matrix) {',
      go: 'func longestIncreasingPath(matrix [][]int) int {'
    },
    examples: [[[[[1, 2], [4, 3]]], 4], [[[[7]]], 1], [[[[5, 5], [5, 5]]], 1]],
    hidden: [[[[[1, 2, 3, 4, 5]]], 5], [[[[9, 9, 4], [6, 6, 8], [2, 1, 1]]], 4], [[[[3, 4, 5], [3, 2, 6], [2, 2, 1]]], 4], [[[[1, 2, 3], [8, 9, 4], [7, 6, 5]]], 9], [[[[0, 1], [1, 0]]], 2]],
    ref: function (matrix) {
      const R = matrix.length, C = matrix[0].length, memo = new Map();
      const go = (r, c) => {
        const k = r * C + c; if (memo.has(k)) return memo.get(k);
        let best = 1;
        for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) if (nr >= 0 && nc >= 0 && nr < R && nc < C && matrix[nr][nc] > matrix[r][c]) best = Math.max(best, 1 + go(nr, nc));
        memo.set(k, best); return best;
      };
      let best = 0;
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) best = Math.max(best, go(r, c));
      return best;
    }
  },
  'shortest-path-in-binary-matrix': {
    fn: 'shortestPathBinaryMatrix', params: ['grid'], cmp: 'exact', meta: ['Shortest Path in Binary Matrix', 1091, 'Medium', 'Breadth-First Search'],
    ask: 'grid is n x n with 0 for open and 1 for blocked. Moving to any of the 8 neighbouring cells, return the number of cells on the shortest open path from the top-left to the bottom-right corner, or -1 if there is none.',
    sig: {
      py: 'def shortestPathBinaryMatrix(grid: List[List[int]]) -> int:',
      js: 'function shortestPathBinaryMatrix(grid) {',
      java: 'public int shortestPathBinaryMatrix(int[][] grid) {',
      cpp: 'int shortestPathBinaryMatrix(vector<vector<int>>& grid) {',
      go: 'func shortestPathBinaryMatrix(grid [][]int) int {'
    },
    examples: [[[[[0, 0], [0, 0]]], 2], [[[[1, 0], [0, 0]]], -1], [[[[0, 1, 1], [1, 0, 1], [1, 1, 0]]], 3]],
    hidden: [[[[[0]]], 1], [[[[1]]], -1], [[[[0, 0, 0], [1, 1, 0], [1, 1, 0]]], 4], [[[[0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 0, 1], [0, 0, 1, 0]]], 6], [[[[0, 0, 0], [0, 1, 0], [0, 0, 1]]], -1]],
    ref: function (grid) {
      const n = grid.length;
      if (grid[0][0] || grid[n - 1][n - 1]) return -1;
      const dist = grid.map((r) => r.map(() => 0)); dist[0][0] = 1; const q = [[0, 0]];
      for (let h = 0; h < q.length; h++) {
        const [r, c] = q[h]; if (r === n - 1 && c === n - 1) return dist[r][c];
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] || dist[nr][nc]) continue;
          dist[nr][nc] = dist[r][c] + 1; q.push([nr, nc]);
        }
      }
      return -1;
    }
  },
  'nearest-exit-from-entrance-in-maze': {
    fn: 'nearestExit', params: ['maze', 'entrance'], cmp: 'exact', meta: ['Nearest Exit from Entrance in Maze', 1926, 'Medium', 'Breadth-First Search'],
    ask: 'maze holds "." for open cells and "+" for walls. From entrance [row, col], step up, down, left or right through open cells. An exit is an open cell on the border that is not the entrance. Return the fewest steps to an exit, or -1 if there is none.',
    sig: {
      py: 'def nearestExit(maze: List[List[str]], entrance: List[int]) -> int:',
      js: 'function nearestExit(maze, entrance) {',
      java: 'public int nearestExit(char[][] maze, int[] entrance) {',
      cpp: 'int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {',
      go: 'func nearestExit(maze [][]byte, entrance []int) int {'
    },
    examples: [[[[['+', '.', '+'], ['.', '.', '+'], ['+', '+', '+']], [1, 1]], 1], [[[['.', '.', '.']], [0, 1]], 1], [[[['+', '+', '+'], ['+', '.', '+'], ['+', '+', '+']], [1, 1]], -1]],
    hidden: [[[[['.']], [0, 0]], -1], [[[['.', '+'], ['+', '+']], [0, 0]], -1], [[[['+', '+', '+', '+', '+'], ['+', '.', '.', '.', '+'], ['+', '.', '+', '.', '+'], ['+', '.', '.', '.', '+'], ['+', '+', '+', '.', '+']], [1, 1]], 5], [[[['.', '.'], ['.', '.']], [0, 0]], 1], [[[['+', '.', '+', '+'], ['+', '.', '.', '+'], ['+', '+', '.', '.'], ['+', '+', '+', '+']], [1, 1]], 1]],
    ref: function (maze, entrance) {
      const R = maze.length, C = maze[0].length, seen = maze.map((r) => r.map(() => false));
      const q = [[entrance[0], entrance[1], 0]]; seen[entrance[0]][entrance[1]] = true;
      for (let h = 0; h < q.length; h++) {
        const [r, c, d] = q[h];
        if (d && (r === 0 || c === 0 || r === R - 1 || c === C - 1)) return d;
        for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
          if (nr < 0 || nc < 0 || nr >= R || nc >= C || seen[nr][nc] || maze[nr][nc] !== '.') continue;
          seen[nr][nc] = true; q.push([nr, nc, d + 1]);
        }
      }
      return -1;
    }
  },
  '01-matrix': {
    fn: 'updateMatrix', params: ['mat'], cmp: 'exact', meta: ['01 Matrix', 542, 'Medium', 'Breadth-First Search'],
    ask: 'mat holds 0s and 1s, with at least one 0. Return a matrix where each cell holds the number of up, down, left or right steps to the nearest 0.',
    sig: {
      py: 'def updateMatrix(mat: List[List[int]]) -> List[List[int]]:',
      js: 'function updateMatrix(mat) {',
      java: 'public int[][] updateMatrix(int[][] mat) {',
      cpp: 'vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {',
      go: 'func updateMatrix(mat [][]int) [][]int {'
    },
    examples: [[[[[0, 1], [1, 1]]], [[0, 1], [1, 2]]], [[[[0]]], [[0]]], [[[[1, 0, 1]]], [[1, 0, 1]]]],
    hidden: [[[[[1], [1], [0]]], [[2], [1], [0]]], [[[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], [[2, 1, 2], [1, 0, 1], [2, 1, 2]]], [[[[0, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]]], [[0, 1, 2, 2], [1, 2, 2, 1], [2, 2, 1, 0]]], [[[[0, 0], [0, 0]]], [[0, 0], [0, 0]]], [[[[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 1]]], [[4, 3, 2, 3, 4], [3, 2, 1, 2, 3], [2, 1, 0, 1, 2]]]],
    ref: function (mat) {
      const R = mat.length, C = mat[0].length, d = mat.map((r) => r.map((x) => (x ? -1 : 0))), q = [];
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (!mat[r][c]) q.push([r, c]);
      for (let h = 0; h < q.length; h++) {
        const [r, c] = q[h];
        for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) if (nr >= 0 && nc >= 0 && nr < R && nc < C && d[nr][nc] < 0) { d[nr][nc] = d[r][c] + 1; q.push([nr, nc]); }
      }
      return d;
    }
  },
  'open-the-lock': {
    fn: 'openLock', params: ['deadends', 'target'], cmp: 'exact', meta: ['Open the Lock', 752, 'Medium', 'Breadth-First Search'],
    ask: 'A lock has four wheels showing 0 to 9 that wrap around, starting at "0000". One move turns one wheel by one step either way. The lock jams if it ever shows a code in deadends. Return the fewest moves to show target, or -1 if it cannot be done.',
    sig: {
      py: 'def openLock(deadends: List[str], target: str) -> int:',
      js: 'function openLock(deadends, target) {',
      java: 'public int openLock(String[] deadends, String target) {',
      cpp: 'int openLock(vector<string>& deadends, string target) {',
      go: 'func openLock(deadends []string, target string) int {'
    },
    examples: [[[[], '0001'], 1], [[['0000'], '1111'], -1], [[['0009', '0001'], '0002'], 4]],
    hidden: [[[[], '0000'], 0], [[[], '5555'], 20], [[['1000', '0100', '0010', '0001', '9000', '0900', '0090', '0009'], '1111'], -1], [[['0201', '0101', '0102', '1212', '2002'], '0202'], 6], [[['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'], '8888'], -1]],
    ref: function (deadends, target) {
      const dead = new Set(deadends);
      if (dead.has('0000')) return -1;
      const seen = new Set(['0000']), q = [['0000', 0]];
      for (let h = 0; h < q.length; h++) {
        const [s, d] = q[h]; if (s === target) return d;
        for (let i = 0; i < 4; i++) for (const step of [1, 9]) {
          const t = s.slice(0, i) + ((Number(s[i]) + step) % 10) + s.slice(i + 1);
          if (!seen.has(t) && !dead.has(t)) { seen.add(t); q.push([t, d + 1]); }
        }
      }
      return -1;
    }
  },
  'word-ladder': {
    fn: 'ladderLength', params: ['beginWord', 'endWord', 'wordList'], cmp: 'exact', meta: ['Word Ladder', 127, 'Hard', 'Breadth-First Search'],
    ask: 'Change beginWord into endWord one letter at a time, where every word after the first must be in wordList. Return the number of words in the shortest such chain (counting both ends), or 0 if there is none.',
    sig: {
      py: 'def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:',
      js: 'function ladderLength(beginWord, endWord, wordList) {',
      java: 'public int ladderLength(String beginWord, String endWord, List<String> wordList) {',
      cpp: 'int ladderLength(string beginWord, string endWord, vector<string>& wordList) {',
      go: 'func ladderLength(beginWord string, endWord string, wordList []string) int {'
    },
    examples: [[['cat', 'dog', ['cot', 'cog', 'dog']], 4], [['cat', 'dog', ['cot', 'cog']], 0], [['a', 'c', ['b', 'c']], 2]],
    hidden: [[['hot', 'hot', ['hot']], 1], [['lead', 'gold', ['load', 'goad', 'gold', 'lead']], 4], [['abc', 'xyz', ['xbc', 'xyc', 'xyz', 'abz']], 4], [['red', 'tax', ['ted', 'tex', 'red', 'tax', 'tad', 'den', 'rex', 'pee']], 4], [['aa', 'bb', ['ab', 'ba']], 0]],
    ref: function (beginWord, endWord, wordList) {
      const words = new Set(wordList);
      if (!words.has(endWord)) return 0;
      const q = [[beginWord, 1]], seen = new Set([beginWord]);
      for (let h = 0; h < q.length; h++) {
        const [w, d] = q[h]; if (w === endWord) return d;
        for (let i = 0; i < w.length; i++) for (let c = 97; c < 123; c++) {
          const t = w.slice(0, i) + String.fromCharCode(c) + w.slice(i + 1);
          if (words.has(t) && !seen.has(t)) { seen.add(t); q.push([t, d + 1]); }
        }
      }
      return 0;
    }
  },
  'subsets-ii': {
    fn: 'subsetsWithDup', params: ['nums'], cmp: 'unordered-deep', meta: ['Subsets II', 90, 'Medium', 'Backtracking'],
    ask: 'nums may contain repeats. Return every different subset (as a multiset, so [1, 2] and [2, 1] are the same), including the empty one, in any order.',
    sig: {
      py: 'def subsetsWithDup(nums: List[int]) -> List[List[int]]:',
      js: 'function subsetsWithDup(nums) {',
      java: 'public List<List<Integer>> subsetsWithDup(int[] nums) {',
      cpp: 'vector<vector<int>> subsetsWithDup(vector<int>& nums) {',
      go: 'func subsetsWithDup(nums []int) [][]int {'
    },
    examples: [[[[3, 3, 1]], [[], [1], [3], [3, 3], [1, 3], [1, 3, 3]]], [[[0]], [[], [0]]], [[[5, 5]], [[], [5], [5, 5]]]],
    hidden: [[[[1, 2, 3]], [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]], [[[4, 4, 4, 1, 4]], [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]]], [[[-1, 1, 2]], [[], [-1], [-1, 1], [-1, 1, 2], [-1, 2], [1], [1, 2], [2]]], [[[2, 1, 2, 1]], [[], [1], [1, 1], [1, 1, 2], [1, 1, 2, 2], [1, 2], [1, 2, 2], [2], [2, 2]]], [[[7, 7, 7]], [[], [7], [7, 7], [7, 7, 7]]]],
    ref: function (nums) {
      const a = nums.slice().sort((x, y) => x - y), out = [], cur = [];
      const go = (i) => { out.push(cur.slice()); for (let j = i; j < a.length; j++) { if (j > i && a[j] === a[j - 1]) continue; cur.push(a[j]); go(j + 1); cur.pop(); } };
      go(0);
      return out;
    }
  },
  'combinations': {
    fn: 'combine', params: ['n', 'k'], cmp: 'unordered-deep', meta: ['Combinations', 77, 'Medium', 'Backtracking'],
    ask: 'Return every way to choose k different numbers from 1 to n, in any order.',
    sig: {
      py: 'def combine(n: int, k: int) -> List[List[int]]:',
      js: 'function combine(n, k) {',
      java: 'public List<List<Integer>> combine(int n, int k) {',
      cpp: 'vector<vector<int>> combine(int n, int k) {',
      go: 'func combine(n int, k int) [][]int {'
    },
    examples: [[[3, 2], [[1, 2], [1, 3], [2, 3]]], [[1, 1], [[1]]], [[4, 4], [[1, 2, 3, 4]]]],
    hidden: [[[5, 1], [[1], [2], [3], [4], [5]]], [[5, 3], [[1, 2, 3], [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5], [1, 4, 5], [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5]]], [[6, 2], [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 3], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6], [4, 5], [4, 6], [5, 6]]], [[4, 3], [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]], [[7, 6], [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 6, 7], [1, 2, 3, 5, 6, 7], [1, 2, 4, 5, 6, 7], [1, 3, 4, 5, 6, 7], [2, 3, 4, 5, 6, 7]]]],
    ref: function (n, k) {
      const out = [], cur = [];
      const go = (s) => { if (cur.length === k) { out.push(cur.slice()); return; } for (let i = s; i <= n; i++) { cur.push(i); go(i + 1); cur.pop(); } };
      go(1);
      return out;
    }
  },
  'combination-sum-iii': {
    fn: 'combinationSum3', params: ['k', 'n'], cmp: 'unordered-deep', meta: ['Combination Sum III', 216, 'Medium', 'Backtracking'],
    ask: 'Return every set of k different digits from 1 to 9 that add up to n, in any order.',
    sig: {
      py: 'def combinationSum3(k: int, n: int) -> List[List[int]]:',
      js: 'function combinationSum3(k, n) {',
      java: 'public List<List<Integer>> combinationSum3(int k, int n) {',
      cpp: 'vector<vector<int>> combinationSum3(int k, int n) {',
      go: 'func combinationSum3(k int, n int) [][]int {'
    },
    examples: [[[2, 5], [[1, 4], [2, 3]]], [[3, 6], [[1, 2, 3]]], [[4, 1], []]],
    hidden: [[[3, 9], [[1, 2, 6], [1, 3, 5], [2, 3, 4]]], [[2, 17], [[8, 9]]], [[9, 45], [[1, 2, 3, 4, 5, 6, 7, 8, 9]]], [[3, 15], [[1, 5, 9], [1, 6, 8], [2, 4, 9], [2, 5, 8], [2, 6, 7], [3, 4, 8], [3, 5, 7], [4, 5, 6]]], [[5, 20], [[1, 2, 3, 5, 9], [1, 2, 3, 6, 8], [1, 2, 4, 5, 8], [1, 2, 4, 6, 7], [1, 3, 4, 5, 7], [2, 3, 4, 5, 6]]]],
    ref: function (k, n) {
      const out = [], cur = [];
      const go = (s, left) => { if (cur.length === k) { if (!left) out.push(cur.slice()); return; } for (let d = s; d <= 9 && d <= left; d++) { cur.push(d); go(d + 1, left - d); cur.pop(); } };
      go(1, n);
      return out;
    }
  },
  'permutations-ii': {
    fn: 'permuteUnique', params: ['nums'], cmp: 'unordered', meta: ['Permutations II', 47, 'Medium', 'Backtracking'],
    ask: 'nums may contain repeats. Return every different ordering of nums, each once, in any order.',
    sig: {
      py: 'def permuteUnique(nums: List[int]) -> List[List[int]]:',
      js: 'function permuteUnique(nums) {',
      java: 'public List<List<Integer>> permuteUnique(int[] nums) {',
      cpp: 'vector<vector<int>> permuteUnique(vector<int>& nums) {',
      go: 'func permuteUnique(nums []int) [][]int {'
    },
    examples: [[[[2, 2, 3]], [[2, 2, 3], [2, 3, 2], [3, 2, 2]]], [[[4]], [[4]]], [[[1, 1]], [[1, 1]]]],
    hidden: [[[[1, 2, 3]], [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]], [[[0, 0, 0, 1]], [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]]], [[[3, 1, 3, 1]], [[1, 1, 3, 3], [1, 3, 1, 3], [1, 3, 3, 1], [3, 1, 1, 3], [3, 1, 3, 1], [3, 3, 1, 1]]], [[[-1, 2, -1]], [[-1, -1, 2], [-1, 2, -1], [2, -1, -1]]], [[[5, 6]], [[5, 6], [6, 5]]]],
    ref: function (nums) {
      const a = nums.slice().sort((x, y) => x - y), used = a.map(() => false), out = [], cur = [];
      const go = () => {
        if (cur.length === a.length) { out.push(cur.slice()); return; }
        for (let i = 0; i < a.length; i++) {
          if (used[i] || (i && a[i] === a[i - 1] && !used[i - 1])) continue;
          used[i] = true; cur.push(a[i]); go(); cur.pop(); used[i] = false;
        }
      };
      go();
      return out;
    }
  },
  'combination-sum-ii': {
    fn: 'combinationSum2', params: ['candidates', 'target'], cmp: 'unordered-deep', meta: ['Combination Sum II', 40, 'Medium', 'Backtracking'],
    ask: 'Each number in candidates may be used once (repeats in candidates are separate numbers). Return every different combination that adds up to target, in any order, with no duplicate combinations.',
    sig: {
      py: 'def combinationSum2(candidates: List[int], target: int) -> List[List[int]]:',
      js: 'function combinationSum2(candidates, target) {',
      java: 'public List<List<Integer>> combinationSum2(int[] candidates, int target) {',
      cpp: 'vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {',
      go: 'func combinationSum2(candidates []int, target int) [][]int {'
    },
    examples: [[[[2, 3, 2, 5], 7], [[2, 5], [2, 2, 3]]], [[[1, 1, 1], 2], [[1, 1]]], [[[4, 6], 3], []]],
    hidden: [[[[1], 1], [[1]]], [[[10, 1, 2, 7, 6, 1, 5], 8], [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]], [[[3, 3, 3, 3], 6], [[3, 3]]], [[[1, 2, 3, 4, 5], 10], [[1, 2, 3, 4], [1, 4, 5], [2, 3, 5]]], [[[9, 8, 7], 1], []]],
    ref: function (candidates, target) {
      const a = candidates.slice().sort((x, y) => x - y), out = [], cur = [];
      const go = (s, left) => {
        if (!left) { out.push(cur.slice()); return; }
        for (let i = s; i < a.length && a[i] <= left; i++) { if (i > s && a[i] === a[i - 1]) continue; cur.push(a[i]); go(i + 1, left - a[i]); cur.pop(); }
      };
      go(0, target);
      return out;
    }
  },
  'generate-parentheses': {
    fn: 'generateParenthesis', params: ['n'], cmp: 'unordered', meta: ['Generate Parentheses', 22, 'Medium', 'Backtracking'],
    ask: 'Return every balanced string made of n pairs of brackets, in any order.',
    sig: {
      py: 'def generateParenthesis(n: int) -> List[str]:',
      js: 'function generateParenthesis(n) {',
      java: 'public List<String> generateParenthesis(int n) {',
      cpp: 'vector<string> generateParenthesis(int n) {',
      go: 'func generateParenthesis(n int) []string {'
    },
    examples: [[[2], ['(())', '()()']], [[4], ['(((())))', '((()()))', '((())())', '((()))()', '(()(()))', '(()()())', '(()())()', '(())(())', '(())()()', '()((()))', '()(()())', '()(())()', '()()(())', '()()()()']], [[1], ['()']]],
    hidden: [[[3], ['((()))', '(()())', '(())()', '()(())', '()()()']], [[5], ['((((()))))', '(((()())))', '(((())()))', '(((()))())', '(((())))()', '((()(())))', '((()()()))', '((()())())', '((()()))()', '((())(()))', '((())()())', '((())())()', '((()))(())', '((()))()()', '(()((())))', '(()(()()))', '(()(())())', '(()(()))()', '(()()(()))', '(()()()())', '(()()())()', '(()())(())', '(()())()()', '(())((()))', '(())(()())', '(())(())()', '(())()(())', '(())()()()', '()(((())))', '()((()()))', '()((())())', '()((()))()', '()(()(()))', '()(()()())', '()(()())()', '()(())(())', '()(())()()', '()()((()))', '()()(()())', '()()(())()', '()()()(())', '()()()()()']], [[6], ['(((((())))))', '((((()()))))', '((((())())))', '((((()))()))', '((((())))())', '((((()))))()', '(((()(()))))', '(((()()())))', '(((()())()))', '(((()()))())', '(((()())))()', '(((())(())))', '(((())()()))', '(((())())())', '(((())()))()', '(((()))(()))', '(((()))()())', '(((()))())()', '(((())))(())', '(((())))()()', '((()((()))))', '((()(()())))', '((()(())()))', '((()(()))())', '((()(())))()', '((()()(())))', '((()()()()))', '((()()())())', '((()()()))()', '((()())(()))', '((()())()())', '((()())())()', '((()()))(())', '((()()))()()', '((())((())))', '((())(()()))', '((())(())())', '((())(()))()', '((())()(()))', '((())()()())', '((())()())()', '((())())(())', '((())())()()', '((()))((()))', '((()))(()())', '((()))(())()', '((()))()(())', '((()))()()()', '(()(((()))))', '(()((()())))', '(()((())()))', '(()((()))())', '(()((())))()', '(()(()(())))', '(()(()()()))', '(()(()())())', '(()(()()))()', '(()(())(()))', '(()(())()())', '(()(())())()', '(()(()))(())', '(()(()))()()', '(()()((())))', '(()()(()()))', '(()()(())())', '(()()(()))()', '(()()()(()))', '(()()()()())', '(()()()())()', '(()()())(())', '(()()())()()', '(()())((()))', '(()())(()())', '(()())(())()', '(()())()(())', '(()())()()()', '(())(((())))', '(())((()()))', '(())((())())', '(())((()))()', '(())(()(()))', '(())(()()())', '(())(()())()', '(())(())(())', '(())(())()()', '(())()((()))', '(())()(()())', '(())()(())()', '(())()()(())', '(())()()()()', '()((((()))))', '()(((()())))', '()(((())()))', '()(((()))())', '()(((())))()', '()((()(())))', '()((()()()))', '()((()())())', '()((()()))()', '()((())(()))', '()((())()())', '()((())())()', '()((()))(())', '()((()))()()', '()(()((())))', '()(()(()()))', '()(()(())())', '()(()(()))()', '()(()()(()))', '()(()()()())', '()(()()())()', '()(()())(())', '()(()())()()', '()(())((()))', '()(())(()())', '()(())(())()', '()(())()(())', '()(())()()()', '()()(((())))', '()()((()()))', '()()((())())', '()()((()))()', '()()(()(()))', '()()(()()())', '()()(()())()', '()()(())(())', '()()(())()()', '()()()((()))', '()()()(()())', '()()()(())()', '()()()()(())', '()()()()()()']], [[7], ['((((((()))))))', '(((((()())))))', '(((((())()))))', '(((((()))())))', '(((((())))()))', '(((((()))))())', '(((((())))))()', '((((()(())))))', '((((()()()))))', '((((()())())))', '((((()()))()))', '((((()())))())', '((((()()))))()', '((((())(()))))', '((((())()())))', '((((())())()))', '((((())()))())', '((((())())))()', '((((()))(())))', '((((()))()()))', '((((()))())())', '((((()))()))()', '((((())))(()))', '((((())))()())', '((((())))())()', '((((()))))(())', '((((()))))()()', '(((()((())))))', '(((()(()()))))', '(((()(())())))', '(((()(()))()))', '(((()(())))())', '(((()(()))))()', '(((()()(()))))', '(((()()()())))', '(((()()())()))', '(((()()()))())', '(((()()())))()', '(((()())(())))', '(((()())()()))', '(((()())())())', '(((()())()))()', '(((()()))(()))', '(((()()))()())', '(((()()))())()', '(((()())))(())', '(((()())))()()', '(((())((()))))', '(((())(()())))', '(((())(())()))', '(((())(()))())', '(((())(())))()', '(((())()(())))', '(((())()()()))', '(((())()())())', '(((())()()))()', '(((())())(()))', '(((())())()())', '(((())())())()', '(((())()))(())', '(((())()))()()', '(((()))((())))', '(((()))(()()))', '(((()))(())())', '(((()))(()))()', '(((()))()(()))', '(((()))()()())', '(((()))()())()', '(((()))())(())', '(((()))())()()', '(((())))((()))', '(((())))(()())', '(((())))(())()', '(((())))()(())', '(((())))()()()', '((()(((())))))', '((()((()()))))', '((()((())())))', '((()((()))()))', '((()((())))())', '((()((()))))()', '((()(()(()))))', '((()(()()())))', '((()(()())()))', '((()(()()))())', '((()(()())))()', '((()(())(())))', '((()(())()()))', '((()(())())())', '((()(())()))()', '((()(()))(()))', '((()(()))()())', '((()(()))())()', '((()(())))(())', '((()(())))()()', '((()()((()))))', '((()()(()())))', '((()()(())()))', '((()()(()))())', '((()()(())))()', '((()()()(())))', '((()()()()()))', '((()()()())())', '((()()()()))()', '((()()())(()))', '((()()())()())', '((()()())())()', '((()()()))(())', '((()()()))()()', '((()())((())))', '((()())(()()))', '((()())(())())', '((()())(()))()', '((()())()(()))', '((()())()()())', '((()())()())()', '((()())())(())', '((()())())()()', '((()()))((()))', '((()()))(()())', '((()()))(())()', '((()()))()(())', '((()()))()()()', '((())(((()))))', '((())((()())))', '((())((())()))', '((())((()))())', '((())((())))()', '((())(()(())))', '((())(()()()))', '((())(()())())', '((())(()()))()', '((())(())(()))', '((())(())()())', '((())(())())()', '((())(()))(())', '((())(()))()()', '((())()((())))', '((())()(()()))', '((())()(())())', '((())()(()))()', '((())()()(()))', '((())()()()())', '((())()()())()', '((())()())(())', '((())()())()()', '((())())((()))', '((())())(()())', '((())())(())()', '((())())()(())', '((())())()()()', '((()))(((())))', '((()))((()()))', '((()))((())())', '((()))((()))()', '((()))(()(()))', '((()))(()()())', '((()))(()())()', '((()))(())(())', '((()))(())()()', '((()))()((()))', '((()))()(()())', '((()))()(())()', '((()))()()(())', '((()))()()()()', '(()((((())))))', '(()(((()()))))', '(()(((())())))', '(()(((()))()))', '(()(((())))())', '(()(((()))))()', '(()((()(()))))', '(()((()()())))', '(()((()())()))', '(()((()()))())', '(()((()())))()', '(()((())(())))', '(()((())()()))', '(()((())())())', '(()((())()))()', '(()((()))(()))', '(()((()))()())', '(()((()))())()', '(()((())))(())', '(()((())))()()', '(()(()((()))))', '(()(()(()())))', '(()(()(())()))', '(()(()(()))())', '(()(()(())))()', '(()(()()(())))', '(()(()()()()))', '(()(()()())())', '(()(()()()))()', '(()(()())(()))', '(()(()())()())', '(()(()())())()', '(()(()()))(())', '(()(()()))()()', '(()(())((())))', '(()(())(()()))', '(()(())(())())', '(()(())(()))()', '(()(())()(()))', '(()(())()()())', '(()(())()())()', '(()(())())(())', '(()(())())()()', '(()(()))((()))', '(()(()))(()())', '(()(()))(())()', '(()(()))()(())', '(()(()))()()()', '(()()(((()))))', '(()()((()())))', '(()()((())()))', '(()()((()))())', '(()()((())))()', '(()()(()(())))', '(()()(()()()))', '(()()(()())())', '(()()(()()))()', '(()()(())(()))', '(()()(())()())', '(()()(())())()', '(()()(()))(())', '(()()(()))()()', '(()()()((())))', '(()()()(()()))', '(()()()(())())', '(()()()(()))()', '(()()()()(()))', '(()()()()()())', '(()()()()())()', '(()()()())(())', '(()()()())()()', '(()()())((()))', '(()()())(()())', '(()()())(())()', '(()()())()(())', '(()()())()()()', '(()())(((())))', '(()())((()()))', '(()())((())())', '(()())((()))()', '(()())(()(()))', '(()())(()()())', '(()())(()())()', '(()())(())(())', '(()())(())()()', '(()())()((()))', '(()())()(()())', '(()())()(())()', '(()())()()(())', '(()())()()()()', '(())((((()))))', '(())(((()())))', '(())(((())()))', '(())(((()))())', '(())(((())))()', '(())((()(())))', '(())((()()()))', '(())((()())())', '(())((()()))()', '(())((())(()))', '(())((())()())', '(())((())())()', '(())((()))(())', '(())((()))()()', '(())(()((())))', '(())(()(()()))', '(())(()(())())', '(())(()(()))()', '(())(()()(()))', '(())(()()()())', '(())(()()())()', '(())(()())(())', '(())(()())()()', '(())(())((()))', '(())(())(()())', '(())(())(())()', '(())(())()(())', '(())(())()()()', '(())()(((())))', '(())()((()()))', '(())()((())())', '(())()((()))()', '(())()(()(()))', '(())()(()()())', '(())()(()())()', '(())()(())(())', '(())()(())()()', '(())()()((()))', '(())()()(()())', '(())()()(())()', '(())()()()(())', '(())()()()()()', '()(((((())))))', '()((((()()))))', '()((((())())))', '()((((()))()))', '()((((())))())', '()((((()))))()', '()(((()(()))))', '()(((()()())))', '()(((()())()))', '()(((()()))())', '()(((()())))()', '()(((())(())))', '()(((())()()))', '()(((())())())', '()(((())()))()', '()(((()))(()))', '()(((()))()())', '()(((()))())()', '()(((())))(())', '()(((())))()()', '()((()((()))))', '()((()(()())))', '()((()(())()))', '()((()(()))())', '()((()(())))()', '()((()()(())))', '()((()()()()))', '()((()()())())', '()((()()()))()', '()((()())(()))', '()((()())()())', '()((()())())()', '()((()()))(())', '()((()()))()()', '()((())((())))', '()((())(()()))', '()((())(())())', '()((())(()))()', '()((())()(()))', '()((())()()())', '()((())()())()', '()((())())(())', '()((())())()()', '()((()))((()))', '()((()))(()())', '()((()))(())()', '()((()))()(())', '()((()))()()()', '()(()(((()))))', '()(()((()())))', '()(()((())()))', '()(()((()))())', '()(()((())))()', '()(()(()(())))', '()(()(()()()))', '()(()(()())())', '()(()(()()))()', '()(()(())(()))', '()(()(())()())', '()(()(())())()', '()(()(()))(())', '()(()(()))()()', '()(()()((())))', '()(()()(()()))', '()(()()(())())', '()(()()(()))()', '()(()()()(()))', '()(()()()()())', '()(()()()())()', '()(()()())(())', '()(()()())()()', '()(()())((()))', '()(()())(()())', '()(()())(())()', '()(()())()(())', '()(()())()()()', '()(())(((())))', '()(())((()()))', '()(())((())())', '()(())((()))()', '()(())(()(()))', '()(())(()()())', '()(())(()())()', '()(())(())(())', '()(())(())()()', '()(())()((()))', '()(())()(()())', '()(())()(())()', '()(())()()(())', '()(())()()()()', '()()((((()))))', '()()(((()())))', '()()(((())()))', '()()(((()))())', '()()(((())))()', '()()((()(())))', '()()((()()()))', '()()((()())())', '()()((()()))()', '()()((())(()))', '()()((())()())', '()()((())())()', '()()((()))(())', '()()((()))()()', '()()(()((())))', '()()(()(()()))', '()()(()(())())', '()()(()(()))()', '()()(()()(()))', '()()(()()()())', '()()(()()())()', '()()(()())(())', '()()(()())()()', '()()(())((()))', '()()(())(()())', '()()(())(())()', '()()(())()(())', '()()(())()()()', '()()()(((())))', '()()()((()()))', '()()()((())())', '()()()((()))()', '()()()(()(()))', '()()()(()()())', '()()()(()())()', '()()()(())(())', '()()()(())()()', '()()()()((()))', '()()()()(()())', '()()()()(())()', '()()()()()(())', '()()()()()()()']], [[8], ['(((((((())))))))', '((((((()()))))))', '((((((())())))))', '((((((()))()))))', '((((((())))())))', '((((((()))))()))', '((((((())))))())', '((((((()))))))()', '(((((()(()))))))', '(((((()()())))))', '(((((()())()))))', '(((((()()))())))', '(((((()())))()))', '(((((()()))))())', '(((((()())))))()', '(((((())(())))))', '(((((())()()))))', '(((((())())())))', '(((((())()))()))', '(((((())())))())', '(((((())()))))()', '(((((()))(()))))', '(((((()))()())))', '(((((()))())()))', '(((((()))()))())', '(((((()))())))()', '(((((())))(())))', '(((((())))()()))', '(((((())))())())', '(((((())))()))()', '(((((()))))(()))', '(((((()))))()())', '(((((()))))())()', '(((((())))))(())', '(((((())))))()()', '((((()((()))))))', '((((()(()())))))', '((((()(())()))))', '((((()(()))())))', '((((()(())))()))', '((((()(()))))())', '((((()(())))))()', '((((()()(())))))', '((((()()()()))))', '((((()()())())))', '((((()()()))()))', '((((()()())))())', '((((()()()))))()', '((((()())(()))))', '((((()())()())))', '((((()())())()))', '((((()())()))())', '((((()())())))()', '((((()()))(())))', '((((()()))()()))', '((((()()))())())', '((((()()))()))()', '((((()())))(()))', '((((()())))()())', '((((()())))())()', '((((()()))))(())', '((((()()))))()()', '((((())((())))))', '((((())(()()))))', '((((())(())())))', '((((())(()))()))', '((((())(())))())', '((((())(()))))()', '((((())()(()))))', '((((())()()())))', '((((())()())()))', '((((())()()))())', '((((())()())))()', '((((())())(())))', '((((())())()()))', '((((())())())())', '((((())())()))()', '((((())()))(()))', '((((())()))()())', '((((())()))())()', '((((())())))(())', '((((())())))()()', '((((()))((()))))', '((((()))(()())))', '((((()))(())()))', '((((()))(()))())', '((((()))(())))()', '((((()))()(())))', '((((()))()()()))', '((((()))()())())', '((((()))()()))()', '((((()))())(()))', '((((()))())()())', '((((()))())())()', '((((()))()))(())', '((((()))()))()()', '((((())))((())))', '((((())))(()()))', '((((())))(())())', '((((())))(()))()', '((((())))()(()))', '((((())))()()())', '((((())))()())()', '((((())))())(())', '((((())))())()()', '((((()))))((()))', '((((()))))(()())', '((((()))))(())()', '((((()))))()(())', '((((()))))()()()', '(((()(((()))))))', '(((()((()())))))', '(((()((())()))))', '(((()((()))())))', '(((()((())))()))', '(((()((()))))())', '(((()((())))))()', '(((()(()(())))))', '(((()(()()()))))', '(((()(()())())))', '(((()(()()))()))', '(((()(()())))())', '(((()(()()))))()', '(((()(())(()))))', '(((()(())()())))', '(((()(())())()))', '(((()(())()))())', '(((()(())())))()', '(((()(()))(())))', '(((()(()))()()))', '(((()(()))())())', '(((()(()))()))()', '(((()(())))(()))', '(((()(())))()())', '(((()(())))())()', '(((()(()))))(())', '(((()(()))))()()', '(((()()((())))))', '(((()()(()()))))', '(((()()(())())))', '(((()()(()))()))', '(((()()(())))())', '(((()()(()))))()', '(((()()()(()))))', '(((()()()()())))', '(((()()()())()))', '(((()()()()))())', '(((()()()())))()', '(((()()())(())))', '(((()()())()()))', '(((()()())())())', '(((()()())()))()', '(((()()()))(()))', '(((()()()))()())', '(((()()()))())()', '(((()()())))(())', '(((()()())))()()', '(((()())((()))))', '(((()())(()())))', '(((()())(())()))', '(((()())(()))())', '(((()())(())))()', '(((()())()(())))', '(((()())()()()))', '(((()())()())())', '(((()())()()))()', '(((()())())(()))', '(((()())())()())', '(((()())())())()', '(((()())()))(())', '(((()())()))()()', '(((()()))((())))', '(((()()))(()()))', '(((()()))(())())', '(((()()))(()))()', '(((()()))()(()))', '(((()()))()()())', '(((()()))()())()', '(((()()))())(())', '(((()()))())()()', '(((()())))((()))', '(((()())))(()())', '(((()())))(())()', '(((()())))()(())', '(((()())))()()()', '(((())(((())))))', '(((())((()()))))', '(((())((())())))', '(((())((()))()))', '(((())((())))())', '(((())((()))))()', '(((())(()(()))))', '(((())(()()())))', '(((())(()())()))', '(((())(()()))())', '(((())(()())))()', '(((())(())(())))', '(((())(())()()))', '(((())(())())())', '(((())(())()))()', '(((())(()))(()))', '(((())(()))()())', '(((())(()))())()', '(((())(())))(())', '(((())(())))()()', '(((())()((()))))', '(((())()(()())))', '(((())()(())()))', '(((())()(()))())', '(((())()(())))()', '(((())()()(())))', '(((())()()()()))', '(((())()()())())', '(((())()()()))()', '(((())()())(()))', '(((())()())()())', '(((())()())())()', '(((())()()))(())', '(((())()()))()()', '(((())())((())))', '(((())())(()()))', '(((())())(())())', '(((())())(()))()', '(((())())()(()))', '(((())())()()())', '(((())())()())()', '(((())())())(())', '(((())())())()()', '(((())()))((()))', '(((())()))(()())', '(((())()))(())()', '(((())()))()(())', '(((())()))()()()', '(((()))(((()))))', '(((()))((()())))', '(((()))((())()))', '(((()))((()))())', '(((()))((())))()', '(((()))(()(())))', '(((()))(()()()))', '(((()))(()())())', '(((()))(()()))()', '(((()))(())(()))', '(((()))(())()())', '(((()))(())())()', '(((()))(()))(())', '(((()))(()))()()', '(((()))()((())))', '(((()))()(()()))', '(((()))()(())())', '(((()))()(()))()', '(((()))()()(()))', '(((()))()()()())', '(((()))()()())()', '(((()))()())(())', '(((()))()())()()', '(((()))())((()))', '(((()))())(()())', '(((()))())(())()', '(((()))())()(())', '(((()))())()()()', '(((())))(((())))', '(((())))((()()))', '(((())))((())())', '(((())))((()))()', '(((())))(()(()))', '(((())))(()()())', '(((())))(()())()', '(((())))(())(())', '(((())))(())()()', '(((())))()((()))', '(((())))()(()())', '(((())))()(())()', '(((())))()()(())', '(((())))()()()()', '((()((((()))))))', '((()(((()())))))', '((()(((())()))))', '((()(((()))())))', '((()(((())))()))', '((()(((()))))())', '((()(((())))))()', '((()((()(())))))', '((()((()()()))))', '((()((()())())))', '((()((()()))()))', '((()((()())))())', '((()((()()))))()', '((()((())(()))))', '((()((())()())))', '((()((())())()))', '((()((())()))())', '((()((())())))()', '((()((()))(())))', '((()((()))()()))', '((()((()))())())', '((()((()))()))()', '((()((())))(()))', '((()((())))()())', '((()((())))())()', '((()((()))))(())', '((()((()))))()()', '((()(()((())))))', '((()(()(()()))))', '((()(()(())())))', '((()(()(()))()))', '((()(()(())))())', '((()(()(()))))()', '((()(()()(()))))', '((()(()()()())))', '((()(()()())()))', '((()(()()()))())', '((()(()()())))()', '((()(()())(())))', '((()(()())()()))', '((()(()())())())', '((()(()())()))()', '((()(()()))(()))', '((()(()()))()())', '((()(()()))())()', '((()(()())))(())', '((()(()())))()()', '((()(())((()))))', '((()(())(()())))', '((()(())(())()))', '((()(())(()))())', '((()(())(())))()', '((()(())()(())))', '((()(())()()()))', '((()(())()())())', '((()(())()()))()', '((()(())())(()))', '((()(())())()())', '((()(())())())()', '((()(())()))(())', '((()(())()))()()', '((()(()))((())))', '((()(()))(()()))', '((()(()))(())())', '((()(()))(()))()', '((()(()))()(()))', '((()(()))()()())', '((()(()))()())()', '((()(()))())(())', '((()(()))())()()', '((()(())))((()))', '((()(())))(()())', '((()(())))(())()', '((()(())))()(())', '((()(())))()()()', '((()()(((())))))', '((()()((()()))))', '((()()((())())))', '((()()((()))()))', '((()()((())))())', '((()()((()))))()', '((()()(()(()))))', '((()()(()()())))', '((()()(()())()))', '((()()(()()))())', '((()()(()())))()', '((()()(())(())))', '((()()(())()()))', '((()()(())())())', '((()()(())()))()', '((()()(()))(()))', '((()()(()))()())', '((()()(()))())()', '((()()(())))(())', '((()()(())))()()', '((()()()((()))))', '((()()()(()())))', '((()()()(())()))', '((()()()(()))())', '((()()()(())))()', '((()()()()(())))', '((()()()()()()))', '((()()()()())())', '((()()()()()))()', '((()()()())(()))', '((()()()())()())', '((()()()())())()', '((()()()()))(())', '((()()()()))()()', '((()()())((())))', '((()()())(()()))', '((()()())(())())', '((()()())(()))()', '((()()())()(()))', '((()()())()()())', '((()()())()())()', '((()()())())(())', '((()()())())()()', '((()()()))((()))', '((()()()))(()())', '((()()()))(())()', '((()()()))()(())', '((()()()))()()()', '((()())(((()))))', '((()())((()())))', '((()())((())()))', '((()())((()))())', '((()())((())))()', '((()())(()(())))', '((()())(()()()))', '((()())(()())())', '((()())(()()))()', '((()())(())(()))', '((()())(())()())', '((()())(())())()', '((()())(()))(())', '((()())(()))()()', '((()())()((())))', '((()())()(()()))', '((()())()(())())', '((()())()(()))()', '((()())()()(()))', '((()())()()()())', '((()())()()())()', '((()())()())(())', '((()())()())()()', '((()())())((()))', '((()())())(()())', '((()())())(())()', '((()())())()(())', '((()())())()()()', '((()()))(((())))', '((()()))((()()))', '((()()))((())())', '((()()))((()))()', '((()()))(()(()))', '((()()))(()()())', '((()()))(()())()', '((()()))(())(())', '((()()))(())()()', '((()()))()((()))', '((()()))()(()())', '((()()))()(())()', '((()()))()()(())', '((()()))()()()()', '((())((((())))))', '((())(((()()))))', '((())(((())())))', '((())(((()))()))', '((())(((())))())', '((())(((()))))()', '((())((()(()))))', '((())((()()())))', '((())((()())()))', '((())((()()))())', '((())((()())))()', '((())((())(())))', '((())((())()()))', '((())((())())())', '((())((())()))()', '((())((()))(()))', '((())((()))()())', '((())((()))())()', '((())((())))(())', '((())((())))()()', '((())(()((()))))', '((())(()(()())))', '((())(()(())()))', '((())(()(()))())', '((())(()(())))()', '((())(()()(())))', '((())(()()()()))', '((())(()()())())', '((())(()()()))()', '((())(()())(()))', '((())(()())()())', '((())(()())())()', '((())(()()))(())', '((())(()()))()()', '((())(())((())))', '((())(())(()()))', '((())(())(())())', '((())(())(()))()', '((())(())()(()))', '((())(())()()())', '((())(())()())()', '((())(())())(())', '((())(())())()()', '((())(()))((()))', '((())(()))(()())', '((())(()))(())()', '((())(()))()(())', '((())(()))()()()', '((())()(((()))))', '((())()((()())))', '((())()((())()))', '((())()((()))())', '((())()((())))()', '((())()(()(())))', '((())()(()()()))', '((())()(()())())', '((())()(()()))()', '((())()(())(()))', '((())()(())()())', '((())()(())())()', '((())()(()))(())', '((())()(()))()()', '((())()()((())))', '((())()()(()()))', '((())()()(())())', '((())()()(()))()', '((())()()()(()))', '((())()()()()())', '((())()()()())()', '((())()()())(())', '((())()()())()()', '((())()())((()))', '((())()())(()())', '((())()())(())()', '((())()())()(())', '((())()())()()()', '((())())(((())))', '((())())((()()))', '((())())((())())', '((())())((()))()', '((())())(()(()))', '((())())(()()())', '((())())(()())()', '((())())(())(())', '((())())(())()()', '((())())()((()))', '((())())()(()())', '((())())()(())()', '((())())()()(())', '((())())()()()()', '((()))((((()))))', '((()))(((()())))', '((()))(((())()))', '((()))(((()))())', '((()))(((())))()', '((()))((()(())))', '((()))((()()()))', '((()))((()())())', '((()))((()()))()', '((()))((())(()))', '((()))((())()())', '((()))((())())()', '((()))((()))(())', '((()))((()))()()', '((()))(()((())))', '((()))(()(()()))', '((()))(()(())())', '((()))(()(()))()', '((()))(()()(()))', '((()))(()()()())', '((()))(()()())()', '((()))(()())(())', '((()))(()())()()', '((()))(())((()))', '((()))(())(()())', '((()))(())(())()', '((()))(())()(())', '((()))(())()()()', '((()))()(((())))', '((()))()((()()))', '((()))()((())())', '((()))()((()))()', '((()))()(()(()))', '((()))()(()()())', '((()))()(()())()', '((()))()(())(())', '((()))()(())()()', '((()))()()((()))', '((()))()()(()())', '((()))()()(())()', '((()))()()()(())', '((()))()()()()()', '(()(((((()))))))', '(()((((()())))))', '(()((((())()))))', '(()((((()))())))', '(()((((())))()))', '(()((((()))))())', '(()((((())))))()', '(()(((()(())))))', '(()(((()()()))))', '(()(((()())())))', '(()(((()()))()))', '(()(((()())))())', '(()(((()()))))()', '(()(((())(()))))', '(()(((())()())))', '(()(((())())()))', '(()(((())()))())', '(()(((())())))()', '(()(((()))(())))', '(()(((()))()()))', '(()(((()))())())', '(()(((()))()))()', '(()(((())))(()))', '(()(((())))()())', '(()(((())))())()', '(()(((()))))(())', '(()(((()))))()()', '(()((()((())))))', '(()((()(()()))))', '(()((()(())())))', '(()((()(()))()))', '(()((()(())))())', '(()((()(()))))()', '(()((()()(()))))', '(()((()()()())))', '(()((()()())()))', '(()((()()()))())', '(()((()()())))()', '(()((()())(())))', '(()((()())()()))', '(()((()())())())', '(()((()())()))()', '(()((()()))(()))', '(()((()()))()())', '(()((()()))())()', '(()((()())))(())', '(()((()())))()()', '(()((())((()))))', '(()((())(()())))', '(()((())(())()))', '(()((())(()))())', '(()((())(())))()', '(()((())()(())))', '(()((())()()()))', '(()((())()())())', '(()((())()()))()', '(()((())())(()))', '(()((())())()())', '(()((())())())()', '(()((())()))(())', '(()((())()))()()', '(()((()))((())))', '(()((()))(()()))', '(()((()))(())())', '(()((()))(()))()', '(()((()))()(()))', '(()((()))()()())', '(()((()))()())()', '(()((()))())(())', '(()((()))())()()', '(()((())))((()))', '(()((())))(()())', '(()((())))(())()', '(()((())))()(())', '(()((())))()()()', '(()(()(((())))))', '(()(()((()()))))', '(()(()((())())))', '(()(()((()))()))', '(()(()((())))())', '(()(()((()))))()', '(()(()(()(()))))', '(()(()(()()())))', '(()(()(()())()))', '(()(()(()()))())', '(()(()(()())))()', '(()(()(())(())))', '(()(()(())()()))', '(()(()(())())())', '(()(()(())()))()', '(()(()(()))(()))', '(()(()(()))()())', '(()(()(()))())()', '(()(()(())))(())', '(()(()(())))()()', '(()(()()((()))))', '(()(()()(()())))', '(()(()()(())()))', '(()(()()(()))())', '(()(()()(())))()', '(()(()()()(())))', '(()(()()()()()))', '(()(()()()())())', '(()(()()()()))()', '(()(()()())(()))', '(()(()()())()())', '(()(()()())())()', '(()(()()()))(())', '(()(()()()))()()', '(()(()())((())))', '(()(()())(()()))', '(()(()())(())())', '(()(()())(()))()', '(()(()())()(()))', '(()(()())()()())', '(()(()())()())()', '(()(()())())(())', '(()(()())())()()', '(()(()()))((()))', '(()(()()))(()())', '(()(()()))(())()', '(()(()()))()(())', '(()(()()))()()()', '(()(())(((()))))', '(()(())((()())))', '(()(())((())()))', '(()(())((()))())', '(()(())((())))()', '(()(())(()(())))', '(()(())(()()()))', '(()(())(()())())', '(()(())(()()))()', '(()(())(())(()))', '(()(())(())()())', '(()(())(())())()', '(()(())(()))(())', '(()(())(()))()()', '(()(())()((())))', '(()(())()(()()))', '(()(())()(())())', '(()(())()(()))()', '(()(())()()(()))', '(()(())()()()())', '(()(())()()())()', '(()(())()())(())', '(()(())()())()()', '(()(())())((()))', '(()(())())(()())', '(()(())())(())()', '(()(())())()(())', '(()(())())()()()', '(()(()))(((())))', '(()(()))((()()))', '(()(()))((())())', '(()(()))((()))()', '(()(()))(()(()))', '(()(()))(()()())', '(()(()))(()())()', '(()(()))(())(())', '(()(()))(())()()', '(()(()))()((()))', '(()(()))()(()())', '(()(()))()(())()', '(()(()))()()(())', '(()(()))()()()()', '(()()((((())))))', '(()()(((()()))))', '(()()(((())())))', '(()()(((()))()))', '(()()(((())))())', '(()()(((()))))()', '(()()((()(()))))', '(()()((()()())))', '(()()((()())()))', '(()()((()()))())', '(()()((()())))()', '(()()((())(())))', '(()()((())()()))', '(()()((())())())', '(()()((())()))()', '(()()((()))(()))', '(()()((()))()())', '(()()((()))())()', '(()()((())))(())', '(()()((())))()()', '(()()(()((()))))', '(()()(()(()())))', '(()()(()(())()))', '(()()(()(()))())', '(()()(()(())))()', '(()()(()()(())))', '(()()(()()()()))', '(()()(()()())())', '(()()(()()()))()', '(()()(()())(()))', '(()()(()())()())', '(()()(()())())()', '(()()(()()))(())', '(()()(()()))()()', '(()()(())((())))', '(()()(())(()()))', '(()()(())(())())', '(()()(())(()))()', '(()()(())()(()))', '(()()(())()()())', '(()()(())()())()', '(()()(())())(())', '(()()(())())()()', '(()()(()))((()))', '(()()(()))(()())', '(()()(()))(())()', '(()()(()))()(())', '(()()(()))()()()', '(()()()(((()))))', '(()()()((()())))', '(()()()((())()))', '(()()()((()))())', '(()()()((())))()', '(()()()(()(())))', '(()()()(()()()))', '(()()()(()())())', '(()()()(()()))()', '(()()()(())(()))', '(()()()(())()())', '(()()()(())())()', '(()()()(()))(())', '(()()()(()))()()', '(()()()()((())))', '(()()()()(()()))', '(()()()()(())())', '(()()()()(()))()', '(()()()()()(()))', '(()()()()()()())', '(()()()()()())()', '(()()()()())(())', '(()()()()())()()', '(()()()())((()))', '(()()()())(()())', '(()()()())(())()', '(()()()())()(())', '(()()()())()()()', '(()()())(((())))', '(()()())((()()))', '(()()())((())())', '(()()())((()))()', '(()()())(()(()))', '(()()())(()()())', '(()()())(()())()', '(()()())(())(())', '(()()())(())()()', '(()()())()((()))', '(()()())()(()())', '(()()())()(())()', '(()()())()()(())', '(()()())()()()()', '(()())((((()))))', '(()())(((()())))', '(()())(((())()))', '(()())(((()))())', '(()())(((())))()', '(()())((()(())))', '(()())((()()()))', '(()())((()())())', '(()())((()()))()', '(()())((())(()))', '(()())((())()())', '(()())((())())()', '(()())((()))(())', '(()())((()))()()', '(()())(()((())))', '(()())(()(()()))', '(()())(()(())())', '(()())(()(()))()', '(()())(()()(()))', '(()())(()()()())', '(()())(()()())()', '(()())(()())(())', '(()())(()())()()', '(()())(())((()))', '(()())(())(()())', '(()())(())(())()', '(()())(())()(())', '(()())(())()()()', '(()())()(((())))', '(()())()((()()))', '(()())()((())())', '(()())()((()))()', '(()())()(()(()))', '(()())()(()()())', '(()())()(()())()', '(()())()(())(())', '(()())()(())()()', '(()())()()((()))', '(()())()()(()())', '(()())()()(())()', '(()())()()()(())', '(()())()()()()()', '(())(((((())))))', '(())((((()()))))', '(())((((())())))', '(())((((()))()))', '(())((((())))())', '(())((((()))))()', '(())(((()(()))))', '(())(((()()())))', '(())(((()())()))', '(())(((()()))())', '(())(((()())))()', '(())(((())(())))', '(())(((())()()))', '(())(((())())())', '(())(((())()))()', '(())(((()))(()))', '(())(((()))()())', '(())(((()))())()', '(())(((())))(())', '(())(((())))()()', '(())((()((()))))', '(())((()(()())))', '(())((()(())()))', '(())((()(()))())', '(())((()(())))()', '(())((()()(())))', '(())((()()()()))', '(())((()()())())', '(())((()()()))()', '(())((()())(()))', '(())((()())()())', '(())((()())())()', '(())((()()))(())', '(())((()()))()()', '(())((())((())))', '(())((())(()()))', '(())((())(())())', '(())((())(()))()', '(())((())()(()))', '(())((())()()())', '(())((())()())()', '(())((())())(())', '(())((())())()()', '(())((()))((()))', '(())((()))(()())', '(())((()))(())()', '(())((()))()(())', '(())((()))()()()', '(())(()(((()))))', '(())(()((()())))', '(())(()((())()))', '(())(()((()))())', '(())(()((())))()', '(())(()(()(())))', '(())(()(()()()))', '(())(()(()())())', '(())(()(()()))()', '(())(()(())(()))', '(())(()(())()())', '(())(()(())())()', '(())(()(()))(())', '(())(()(()))()()', '(())(()()((())))', '(())(()()(()()))', '(())(()()(())())', '(())(()()(()))()', '(())(()()()(()))', '(())(()()()()())', '(())(()()()())()', '(())(()()())(())', '(())(()()())()()', '(())(()())((()))', '(())(()())(()())', '(())(()())(())()', '(())(()())()(())', '(())(()())()()()', '(())(())(((())))', '(())(())((()()))', '(())(())((())())', '(())(())((()))()', '(())(())(()(()))', '(())(())(()()())', '(())(())(()())()', '(())(())(())(())', '(())(())(())()()', '(())(())()((()))', '(())(())()(()())', '(())(())()(())()', '(())(())()()(())', '(())(())()()()()', '(())()((((()))))', '(())()(((()())))', '(())()(((())()))', '(())()(((()))())', '(())()(((())))()', '(())()((()(())))', '(())()((()()()))', '(())()((()())())', '(())()((()()))()', '(())()((())(()))', '(())()((())()())', '(())()((())())()', '(())()((()))(())', '(())()((()))()()', '(())()(()((())))', '(())()(()(()()))', '(())()(()(())())', '(())()(()(()))()', '(())()(()()(()))', '(())()(()()()())', '(())()(()()())()', '(())()(()())(())', '(())()(()())()()', '(())()(())((()))', '(())()(())(()())', '(())()(())(())()', '(())()(())()(())', '(())()(())()()()', '(())()()(((())))', '(())()()((()()))', '(())()()((())())', '(())()()((()))()', '(())()()(()(()))', '(())()()(()()())', '(())()()(()())()', '(())()()(())(())', '(())()()(())()()', '(())()()()((()))', '(())()()()(()())', '(())()()()(())()', '(())()()()()(())', '(())()()()()()()', '()((((((()))))))', '()(((((()())))))', '()(((((())()))))', '()(((((()))())))', '()(((((())))()))', '()(((((()))))())', '()(((((())))))()', '()((((()(())))))', '()((((()()()))))', '()((((()())())))', '()((((()()))()))', '()((((()())))())', '()((((()()))))()', '()((((())(()))))', '()((((())()())))', '()((((())())()))', '()((((())()))())', '()((((())())))()', '()((((()))(())))', '()((((()))()()))', '()((((()))())())', '()((((()))()))()', '()((((())))(()))', '()((((())))()())', '()((((())))())()', '()((((()))))(())', '()((((()))))()()', '()(((()((())))))', '()(((()(()()))))', '()(((()(())())))', '()(((()(()))()))', '()(((()(())))())', '()(((()(()))))()', '()(((()()(()))))', '()(((()()()())))', '()(((()()())()))', '()(((()()()))())', '()(((()()())))()', '()(((()())(())))', '()(((()())()()))', '()(((()())())())', '()(((()())()))()', '()(((()()))(()))', '()(((()()))()())', '()(((()()))())()', '()(((()())))(())', '()(((()())))()()', '()(((())((()))))', '()(((())(()())))', '()(((())(())()))', '()(((())(()))())', '()(((())(())))()', '()(((())()(())))', '()(((())()()()))', '()(((())()())())', '()(((())()()))()', '()(((())())(()))', '()(((())())()())', '()(((())())())()', '()(((())()))(())', '()(((())()))()()', '()(((()))((())))', '()(((()))(()()))', '()(((()))(())())', '()(((()))(()))()', '()(((()))()(()))', '()(((()))()()())', '()(((()))()())()', '()(((()))())(())', '()(((()))())()()', '()(((())))((()))', '()(((())))(()())', '()(((())))(())()', '()(((())))()(())', '()(((())))()()()', '()((()(((())))))', '()((()((()()))))', '()((()((())())))', '()((()((()))()))', '()((()((())))())', '()((()((()))))()', '()((()(()(()))))', '()((()(()()())))', '()((()(()())()))', '()((()(()()))())', '()((()(()())))()', '()((()(())(())))', '()((()(())()()))', '()((()(())())())', '()((()(())()))()', '()((()(()))(()))', '()((()(()))()())', '()((()(()))())()', '()((()(())))(())', '()((()(())))()()', '()((()()((()))))', '()((()()(()())))', '()((()()(())()))', '()((()()(()))())', '()((()()(())))()', '()((()()()(())))', '()((()()()()()))', '()((()()()())())', '()((()()()()))()', '()((()()())(()))', '()((()()())()())', '()((()()())())()', '()((()()()))(())', '()((()()()))()()', '()((()())((())))', '()((()())(()()))', '()((()())(())())', '()((()())(()))()', '()((()())()(()))', '()((()())()()())', '()((()())()())()', '()((()())())(())', '()((()())())()()', '()((()()))((()))', '()((()()))(()())', '()((()()))(())()', '()((()()))()(())', '()((()()))()()()', '()((())(((()))))', '()((())((()())))', '()((())((())()))', '()((())((()))())', '()((())((())))()', '()((())(()(())))', '()((())(()()()))', '()((())(()())())', '()((())(()()))()', '()((())(())(()))', '()((())(())()())', '()((())(())())()', '()((())(()))(())', '()((())(()))()()', '()((())()((())))', '()((())()(()()))', '()((())()(())())', '()((())()(()))()', '()((())()()(()))', '()((())()()()())', '()((())()()())()', '()((())()())(())', '()((())()())()()', '()((())())((()))', '()((())())(()())', '()((())())(())()', '()((())())()(())', '()((())())()()()', '()((()))(((())))', '()((()))((()()))', '()((()))((())())', '()((()))((()))()', '()((()))(()(()))', '()((()))(()()())', '()((()))(()())()', '()((()))(())(())', '()((()))(())()()', '()((()))()((()))', '()((()))()(()())', '()((()))()(())()', '()((()))()()(())', '()((()))()()()()', '()(()((((())))))', '()(()(((()()))))', '()(()(((())())))', '()(()(((()))()))', '()(()(((())))())', '()(()(((()))))()', '()(()((()(()))))', '()(()((()()())))', '()(()((()())()))', '()(()((()()))())', '()(()((()())))()', '()(()((())(())))', '()(()((())()()))', '()(()((())())())', '()(()((())()))()', '()(()((()))(()))', '()(()((()))()())', '()(()((()))())()', '()(()((())))(())', '()(()((())))()()', '()(()(()((()))))', '()(()(()(()())))', '()(()(()(())()))', '()(()(()(()))())', '()(()(()(())))()', '()(()(()()(())))', '()(()(()()()()))', '()(()(()()())())', '()(()(()()()))()', '()(()(()())(()))', '()(()(()())()())', '()(()(()())())()', '()(()(()()))(())', '()(()(()()))()()', '()(()(())((())))', '()(()(())(()()))', '()(()(())(())())', '()(()(())(()))()', '()(()(())()(()))', '()(()(())()()())', '()(()(())()())()', '()(()(())())(())', '()(()(())())()()', '()(()(()))((()))', '()(()(()))(()())', '()(()(()))(())()', '()(()(()))()(())', '()(()(()))()()()', '()(()()(((()))))', '()(()()((()())))', '()(()()((())()))', '()(()()((()))())', '()(()()((())))()', '()(()()(()(())))', '()(()()(()()()))', '()(()()(()())())', '()(()()(()()))()', '()(()()(())(()))', '()(()()(())()())', '()(()()(())())()', '()(()()(()))(())', '()(()()(()))()()', '()(()()()((())))', '()(()()()(()()))', '()(()()()(())())', '()(()()()(()))()', '()(()()()()(()))', '()(()()()()()())', '()(()()()()())()', '()(()()()())(())', '()(()()()())()()', '()(()()())((()))', '()(()()())(()())', '()(()()())(())()', '()(()()())()(())', '()(()()())()()()', '()(()())(((())))', '()(()())((()()))', '()(()())((())())', '()(()())((()))()', '()(()())(()(()))', '()(()())(()()())', '()(()())(()())()', '()(()())(())(())', '()(()())(())()()', '()(()())()((()))', '()(()())()(()())', '()(()())()(())()', '()(()())()()(())', '()(()())()()()()', '()(())((((()))))', '()(())(((()())))', '()(())(((())()))', '()(())(((()))())', '()(())(((())))()', '()(())((()(())))', '()(())((()()()))', '()(())((()())())', '()(())((()()))()', '()(())((())(()))', '()(())((())()())', '()(())((())())()', '()(())((()))(())', '()(())((()))()()', '()(())(()((())))', '()(())(()(()()))', '()(())(()(())())', '()(())(()(()))()', '()(())(()()(()))', '()(())(()()()())', '()(())(()()())()', '()(())(()())(())', '()(())(()())()()', '()(())(())((()))', '()(())(())(()())', '()(())(())(())()', '()(())(())()(())', '()(())(())()()()', '()(())()(((())))', '()(())()((()()))', '()(())()((())())', '()(())()((()))()', '()(())()(()(()))', '()(())()(()()())', '()(())()(()())()', '()(())()(())(())', '()(())()(())()()', '()(())()()((()))', '()(())()()(()())', '()(())()()(())()', '()(())()()()(())', '()(())()()()()()', '()()(((((())))))', '()()((((()()))))', '()()((((())())))', '()()((((()))()))', '()()((((())))())', '()()((((()))))()', '()()(((()(()))))', '()()(((()()())))', '()()(((()())()))', '()()(((()()))())', '()()(((()())))()', '()()(((())(())))', '()()(((())()()))', '()()(((())())())', '()()(((())()))()', '()()(((()))(()))', '()()(((()))()())', '()()(((()))())()', '()()(((())))(())', '()()(((())))()()', '()()((()((()))))', '()()((()(()())))', '()()((()(())()))', '()()((()(()))())', '()()((()(())))()', '()()((()()(())))', '()()((()()()()))', '()()((()()())())', '()()((()()()))()', '()()((()())(()))', '()()((()())()())', '()()((()())())()', '()()((()()))(())', '()()((()()))()()', '()()((())((())))', '()()((())(()()))', '()()((())(())())', '()()((())(()))()', '()()((())()(()))', '()()((())()()())', '()()((())()())()', '()()((())())(())', '()()((())())()()', '()()((()))((()))', '()()((()))(()())', '()()((()))(())()', '()()((()))()(())', '()()((()))()()()', '()()(()(((()))))', '()()(()((()())))', '()()(()((())()))', '()()(()((()))())', '()()(()((())))()', '()()(()(()(())))', '()()(()(()()()))', '()()(()(()())())', '()()(()(()()))()', '()()(()(())(()))', '()()(()(())()())', '()()(()(())())()', '()()(()(()))(())', '()()(()(()))()()', '()()(()()((())))', '()()(()()(()()))', '()()(()()(())())', '()()(()()(()))()', '()()(()()()(()))', '()()(()()()()())', '()()(()()()())()', '()()(()()())(())', '()()(()()())()()', '()()(()())((()))', '()()(()())(()())', '()()(()())(())()', '()()(()())()(())', '()()(()())()()()', '()()(())(((())))', '()()(())((()()))', '()()(())((())())', '()()(())((()))()', '()()(())(()(()))', '()()(())(()()())', '()()(())(()())()', '()()(())(())(())', '()()(())(())()()', '()()(())()((()))', '()()(())()(()())', '()()(())()(())()', '()()(())()()(())', '()()(())()()()()', '()()()((((()))))', '()()()(((()())))', '()()()(((())()))', '()()()(((()))())', '()()()(((())))()', '()()()((()(())))', '()()()((()()()))', '()()()((()())())', '()()()((()()))()', '()()()((())(()))', '()()()((())()())', '()()()((())())()', '()()()((()))(())', '()()()((()))()()', '()()()(()((())))', '()()()(()(()()))', '()()()(()(())())', '()()()(()(()))()', '()()()(()()(()))', '()()()(()()()())', '()()()(()()())()', '()()()(()())(())', '()()()(()())()()', '()()()(())((()))', '()()()(())(()())', '()()()(())(())()', '()()()(())()(())', '()()()(())()()()', '()()()()(((())))', '()()()()((()()))', '()()()()((())())', '()()()()((()))()', '()()()()(()(()))', '()()()()(()()())', '()()()()(()())()', '()()()()(())(())', '()()()()(())()()', '()()()()()((()))', '()()()()()(()())', '()()()()()(())()', '()()()()()()(())', '()()()()()()()()']]],
    ref: function (n) {
      const out = [];
      const go = (s, open, close) => { if (s.length === 2 * n) { out.push(s); return; } if (open < n) go(s + '(', open + 1, close); if (close < open) go(s + ')', open, close + 1); };
      go('', 0, 0);
      return out;
    }
  },
  'palindrome-partitioning': {
    fn: 'partition', params: ['s'], cmp: 'unordered', meta: ['Palindrome Partitioning', 131, 'Medium', 'Backtracking'],
    ask: 'Cut s into pieces so that every piece reads the same both ways. Return every such way to cut it, each as the list of pieces in order. The ways may come in any order.',
    sig: {
      py: 'def partition(s: str) -> List[List[str]]:',
      js: 'function partition(s) {',
      java: 'public List<List<String>> partition(String s) {',
      cpp: 'vector<vector<string>> partition(string s) {',
      go: 'func partition(s string) [][]string {'
    },
    examples: [[['aba'], [['a', 'b', 'a'], ['aba']]], [['xy'], [['x', 'y']]], [['zzz'], [['z', 'z', 'z'], ['z', 'zz'], ['zz', 'z'], ['zzz']]]],
    hidden: [[['a'], [['a']]], [['abba'], [['a', 'b', 'b', 'a'], ['a', 'bb', 'a'], ['abba']]], [['noon'], [['n', 'o', 'o', 'n'], ['n', 'oo', 'n'], ['noon']]], [['abcba'], [['a', 'b', 'c', 'b', 'a'], ['a', 'bcb', 'a'], ['abcba']]], [['aabaa'], [['a', 'a', 'b', 'a', 'a'], ['a', 'a', 'b', 'aa'], ['a', 'aba', 'a'], ['aa', 'b', 'a', 'a'], ['aa', 'b', 'aa'], ['aabaa']]]],
    ref: function (s) {
      const out = [], cur = [];
      const pal = (t) => t === t.split('').reverse().join('');
      const go = (i) => { if (i === s.length) { out.push(cur.slice()); return; } for (let j = i + 1; j <= s.length; j++) { const t = s.slice(i, j); if (pal(t)) { cur.push(t); go(j); cur.pop(); } } };
      go(0);
      return out;
    }
  },
  'n-queens': {
    fn: 'solveNQueens', params: ['n'], cmp: 'unordered', meta: ['N-Queens', 51, 'Hard', 'Backtracking'],
    ask: 'Place n queens on an n x n board so that no two share a row, a column or a diagonal. Return every solution, each as n strings (row by row, "Q" for a queen and "." for an empty square). Solutions may come in any order.',
    sig: {
      py: 'def solveNQueens(n: int) -> List[List[str]]:',
      js: 'function solveNQueens(n) {',
      java: 'public List<List<String>> solveNQueens(int n) {',
      cpp: 'vector<vector<string>> solveNQueens(int n) {',
      go: 'func solveNQueens(n int) [][]string {'
    },
    examples: [[[6], [['.Q....', '...Q..', '.....Q', 'Q.....', '..Q...', '....Q.'], ['..Q...', '.....Q', '.Q....', '....Q.', 'Q.....', '...Q..'], ['...Q..', 'Q.....', '....Q.', '.Q....', '.....Q', '..Q...'], ['....Q.', '..Q...', 'Q.....', '.....Q', '...Q..', '.Q....']]], [[2], []], [[3], []]],
    hidden: [[[1], [['Q']]], [[4], [['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']]], [[5], [['Q....', '..Q..', '....Q', '.Q...', '...Q.'], ['Q....', '...Q.', '.Q...', '....Q', '..Q..'], ['.Q...', '...Q.', 'Q....', '..Q..', '....Q'], ['.Q...', '....Q', '..Q..', 'Q....', '...Q.'], ['..Q..', 'Q....', '...Q.', '.Q...', '....Q'], ['..Q..', '....Q', '.Q...', '...Q.', 'Q....'], ['...Q.', 'Q....', '..Q..', '....Q', '.Q...'], ['...Q.', '.Q...', '....Q', '..Q..', 'Q....'], ['....Q', '.Q...', '...Q.', 'Q....', '..Q..'], ['....Q', '..Q..', 'Q....', '...Q.', '.Q...']]], [[7], [['Q......', '..Q....', '....Q..', '......Q', '.Q.....', '...Q...', '.....Q.'], ['Q......', '...Q...', '......Q', '..Q....', '.....Q.', '.Q.....', '....Q..'], ['Q......', '....Q..', '.Q.....', '.....Q.', '..Q....', '......Q', '...Q...'], ['Q......', '.....Q.', '...Q...', '.Q.....', '......Q', '....Q..', '..Q....'], ['.Q.....', '...Q...', 'Q......', '......Q', '....Q..', '..Q....', '.....Q.'], ['.Q.....', '...Q...', '.....Q.', 'Q......', '..Q....', '....Q..', '......Q'], ['.Q.....', '....Q..', 'Q......', '...Q...', '......Q', '..Q....', '.....Q.'], ['.Q.....', '....Q..', '..Q....', 'Q......', '......Q', '...Q...', '.....Q.'], ['.Q.....', '....Q..', '......Q', '...Q...', 'Q......', '..Q....', '.....Q.'], ['.Q.....', '.....Q.', '..Q....', '......Q', '...Q...', 'Q......', '....Q..'], ['.Q.....', '......Q', '....Q..', '..Q....', 'Q......', '.....Q.', '...Q...'], ['..Q....', 'Q......', '.....Q.', '.Q.....', '....Q..', '......Q', '...Q...'], ['..Q....', 'Q......', '.....Q.', '...Q...', '.Q.....', '......Q', '....Q..'], ['..Q....', '....Q..', '......Q', '.Q.....', '...Q...', '.....Q.', 'Q......'], ['..Q....', '.....Q.', '.Q.....', '....Q..', 'Q......', '...Q...', '......Q'], ['..Q....', '......Q', '.Q.....', '...Q...', '.....Q.', 'Q......', '....Q..'], ['..Q....', '......Q', '...Q...', 'Q......', '....Q..', '.Q.....', '.....Q.'], ['...Q...', 'Q......', '..Q....', '.....Q.', '.Q.....', '......Q', '....Q..'], ['...Q...', 'Q......', '....Q..', '.Q.....', '.....Q.', '..Q....', '......Q'], ['...Q...', '.Q.....', '......Q', '....Q..', '..Q....', 'Q......', '.....Q.'], ['...Q...', '.....Q.', 'Q......', '..Q....', '....Q..', '......Q', '.Q.....'], ['...Q...', '......Q', '..Q....', '.....Q.', '.Q.....', '....Q..', 'Q......'], ['...Q...', '......Q', '....Q..', '.Q.....', '.....Q.', 'Q......', '..Q....'], ['....Q..', 'Q......', '...Q...', '......Q', '..Q....', '.....Q.', '.Q.....'], ['....Q..', 'Q......', '.....Q.', '...Q...', '.Q.....', '......Q', '..Q....'], ['....Q..', '.Q.....', '.....Q.', '..Q....', '......Q', '...Q...', 'Q......'], ['....Q..', '..Q....', 'Q......', '.....Q.', '...Q...', '.Q.....', '......Q'], ['....Q..', '......Q', '.Q.....', '...Q...', '.....Q.', 'Q......', '..Q....'], ['....Q..', '......Q', '.Q.....', '.....Q.', '..Q....', 'Q......', '...Q...'], ['.....Q.', 'Q......', '..Q....', '....Q..', '......Q', '.Q.....', '...Q...'], ['.....Q.', '.Q.....', '....Q..', 'Q......', '...Q...', '......Q', '..Q....'], ['.....Q.', '..Q....', 'Q......', '...Q...', '......Q', '....Q..', '.Q.....'], ['.....Q.', '..Q....', '....Q..', '......Q', 'Q......', '...Q...', '.Q.....'], ['.....Q.', '..Q....', '......Q', '...Q...', 'Q......', '....Q..', '.Q.....'], ['.....Q.', '...Q...', '.Q.....', '......Q', '....Q..', '..Q....', 'Q......'], ['.....Q.', '...Q...', '......Q', 'Q......', '..Q....', '....Q..', '.Q.....'], ['......Q', '.Q.....', '...Q...', '.....Q.', 'Q......', '..Q....', '....Q..'], ['......Q', '..Q....', '.....Q.', '.Q.....', '....Q..', 'Q......', '...Q...'], ['......Q', '...Q...', 'Q......', '....Q..', '.Q.....', '.....Q.', '..Q....'], ['......Q', '....Q..', '..Q....', 'Q......', '.....Q.', '...Q...', '.Q.....']]], [[8], [['Q.......', '....Q...', '.......Q', '.....Q..', '..Q.....', '......Q.', '.Q......', '...Q....'], ['Q.......', '.....Q..', '.......Q', '..Q.....', '......Q.', '...Q....', '.Q......', '....Q...'], ['Q.......', '......Q.', '...Q....', '.....Q..', '.......Q', '.Q......', '....Q...', '..Q.....'], ['Q.......', '......Q.', '....Q...', '.......Q', '.Q......', '...Q....', '.....Q..', '..Q.....'], ['.Q......', '...Q....', '.....Q..', '.......Q', '..Q.....', 'Q.......', '......Q.', '....Q...'], ['.Q......', '....Q...', '......Q.', 'Q.......', '..Q.....', '.......Q', '.....Q..', '...Q....'], ['.Q......', '....Q...', '......Q.', '...Q....', 'Q.......', '.......Q', '.....Q..', '..Q.....'], ['.Q......', '.....Q..', 'Q.......', '......Q.', '...Q....', '.......Q', '..Q.....', '....Q...'], ['.Q......', '.....Q..', '.......Q', '..Q.....', 'Q.......', '...Q....', '......Q.', '....Q...'], ['.Q......', '......Q.', '..Q.....', '.....Q..', '.......Q', '....Q...', 'Q.......', '...Q....'], ['.Q......', '......Q.', '....Q...', '.......Q', 'Q.......', '...Q....', '.....Q..', '..Q.....'], ['.Q......', '.......Q', '.....Q..', 'Q.......', '..Q.....', '....Q...', '......Q.', '...Q....'], ['..Q.....', 'Q.......', '......Q.', '....Q...', '.......Q', '.Q......', '...Q....', '.....Q..'], ['..Q.....', '....Q...', '.Q......', '.......Q', 'Q.......', '......Q.', '...Q....', '.....Q..'], ['..Q.....', '....Q...', '.Q......', '.......Q', '.....Q..', '...Q....', '......Q.', 'Q.......'], ['..Q.....', '....Q...', '......Q.', 'Q.......', '...Q....', '.Q......', '.......Q', '.....Q..'], ['..Q.....', '....Q...', '.......Q', '...Q....', 'Q.......', '......Q.', '.Q......', '.....Q..'], ['..Q.....', '.....Q..', '.Q......', '....Q...', '.......Q', 'Q.......', '......Q.', '...Q....'], ['..Q.....', '.....Q..', '.Q......', '......Q.', 'Q.......', '...Q....', '.......Q', '....Q...'], ['..Q.....', '.....Q..', '.Q......', '......Q.', '....Q...', 'Q.......', '.......Q', '...Q....'], ['..Q.....', '.....Q..', '...Q....', 'Q.......', '.......Q', '....Q...', '......Q.', '.Q......'], ['..Q.....', '.....Q..', '...Q....', '.Q......', '.......Q', '....Q...', '......Q.', 'Q.......'], ['..Q.....', '.....Q..', '.......Q', 'Q.......', '...Q....', '......Q.', '....Q...', '.Q......'], ['..Q.....', '.....Q..', '.......Q', 'Q.......', '....Q...', '......Q.', '.Q......', '...Q....'], ['..Q.....', '.....Q..', '.......Q', '.Q......', '...Q....', 'Q.......', '......Q.', '....Q...'], ['..Q.....', '......Q.', '.Q......', '.......Q', '....Q...', 'Q.......', '...Q....', '.....Q..'], ['..Q.....', '......Q.', '.Q......', '.......Q', '.....Q..', '...Q....', 'Q.......', '....Q...'], ['..Q.....', '.......Q', '...Q....', '......Q.', 'Q.......', '.....Q..', '.Q......', '....Q...'], ['...Q....', 'Q.......', '....Q...', '.......Q', '.Q......', '......Q.', '..Q.....', '.....Q..'], ['...Q....', 'Q.......', '....Q...', '.......Q', '.....Q..', '..Q.....', '......Q.', '.Q......'], ['...Q....', '.Q......', '....Q...', '.......Q', '.....Q..', 'Q.......', '..Q.....', '......Q.'], ['...Q....', '.Q......', '......Q.', '..Q.....', '.....Q..', '.......Q', 'Q.......', '....Q...'], ['...Q....', '.Q......', '......Q.', '..Q.....', '.....Q..', '.......Q', '....Q...', 'Q.......'], ['...Q....', '.Q......', '......Q.', '....Q...', 'Q.......', '.......Q', '.....Q..', '..Q.....'], ['...Q....', '.Q......', '.......Q', '....Q...', '......Q.', 'Q.......', '..Q.....', '.....Q..'], ['...Q....', '.Q......', '.......Q', '.....Q..', 'Q.......', '..Q.....', '....Q...', '......Q.'], ['...Q....', '.....Q..', 'Q.......', '....Q...', '.Q......', '.......Q', '..Q.....', '......Q.'], ['...Q....', '.....Q..', '.......Q', '.Q......', '......Q.', 'Q.......', '..Q.....', '....Q...'], ['...Q....', '.....Q..', '.......Q', '..Q.....', 'Q.......', '......Q.', '....Q...', '.Q......'], ['...Q....', '......Q.', 'Q.......', '.......Q', '....Q...', '.Q......', '.....Q..', '..Q.....'], ['...Q....', '......Q.', '..Q.....', '.......Q', '.Q......', '....Q...', 'Q.......', '.....Q..'], ['...Q....', '......Q.', '....Q...', '.Q......', '.....Q..', 'Q.......', '..Q.....', '.......Q'], ['...Q....', '......Q.', '....Q...', '..Q.....', 'Q.......', '.....Q..', '.......Q', '.Q......'], ['...Q....', '.......Q', 'Q.......', '..Q.....', '.....Q..', '.Q......', '......Q.', '....Q...'], ['...Q....', '.......Q', 'Q.......', '....Q...', '......Q.', '.Q......', '.....Q..', '..Q.....'], ['...Q....', '.......Q', '....Q...', '..Q.....', 'Q.......', '......Q.', '.Q......', '.....Q..'], ['....Q...', 'Q.......', '...Q....', '.....Q..', '.......Q', '.Q......', '......Q.', '..Q.....'], ['....Q...', 'Q.......', '.......Q', '...Q....', '.Q......', '......Q.', '..Q.....', '.....Q..'], ['....Q...', 'Q.......', '.......Q', '.....Q..', '..Q.....', '......Q.', '.Q......', '...Q....'], ['....Q...', '.Q......', '...Q....', '.....Q..', '.......Q', '..Q.....', 'Q.......', '......Q.'], ['....Q...', '.Q......', '...Q....', '......Q.', '..Q.....', '.......Q', '.....Q..', 'Q.......'], ['....Q...', '.Q......', '.....Q..', 'Q.......', '......Q.', '...Q....', '.......Q', '..Q.....'], ['....Q...', '.Q......', '.......Q', 'Q.......', '...Q....', '......Q.', '..Q.....', '.....Q..'], ['....Q...', '..Q.....', 'Q.......', '.....Q..', '.......Q', '.Q......', '...Q....', '......Q.'], ['....Q...', '..Q.....', 'Q.......', '......Q.', '.Q......', '.......Q', '.....Q..', '...Q....'], ['....Q...', '..Q.....', '.......Q', '...Q....', '......Q.', 'Q.......', '.....Q..', '.Q......'], ['....Q...', '......Q.', 'Q.......', '..Q.....', '.......Q', '.....Q..', '...Q....', '.Q......'], ['....Q...', '......Q.', 'Q.......', '...Q....', '.Q......', '.......Q', '.....Q..', '..Q.....'], ['....Q...', '......Q.', '.Q......', '...Q....', '.......Q', 'Q.......', '..Q.....', '.....Q..'], ['....Q...', '......Q.', '.Q......', '.....Q..', '..Q.....', 'Q.......', '...Q....', '.......Q'], ['....Q...', '......Q.', '.Q......', '.....Q..', '..Q.....', 'Q.......', '.......Q', '...Q....'], ['....Q...', '......Q.', '...Q....', 'Q.......', '..Q.....', '.......Q', '.....Q..', '.Q......'], ['....Q...', '.......Q', '...Q....', 'Q.......', '..Q.....', '.....Q..', '.Q......', '......Q.'], ['....Q...', '.......Q', '...Q....', 'Q.......', '......Q.', '.Q......', '.....Q..', '..Q.....'], ['.....Q..', 'Q.......', '....Q...', '.Q......', '.......Q', '..Q.....', '......Q.', '...Q....'], ['.....Q..', '.Q......', '......Q.', 'Q.......', '..Q.....', '....Q...', '.......Q', '...Q....'], ['.....Q..', '.Q......', '......Q.', 'Q.......', '...Q....', '.......Q', '....Q...', '..Q.....'], ['.....Q..', '..Q.....', 'Q.......', '......Q.', '....Q...', '.......Q', '.Q......', '...Q....'], ['.....Q..', '..Q.....', 'Q.......', '.......Q', '...Q....', '.Q......', '......Q.', '....Q...'], ['.....Q..', '..Q.....', 'Q.......', '.......Q', '....Q...', '.Q......', '...Q....', '......Q.'], ['.....Q..', '..Q.....', '....Q...', '......Q.', 'Q.......', '...Q....', '.Q......', '.......Q'], ['.....Q..', '..Q.....', '....Q...', '.......Q', 'Q.......', '...Q....', '.Q......', '......Q.'], ['.....Q..', '..Q.....', '......Q.', '.Q......', '...Q....', '.......Q', 'Q.......', '....Q...'], ['.....Q..', '..Q.....', '......Q.', '.Q......', '.......Q', '....Q...', 'Q.......', '...Q....'], ['.....Q..', '..Q.....', '......Q.', '...Q....', 'Q.......', '.......Q', '.Q......', '....Q...'], ['.....Q..', '...Q....', 'Q.......', '....Q...', '.......Q', '.Q......', '......Q.', '..Q.....'], ['.....Q..', '...Q....', '.Q......', '.......Q', '....Q...', '......Q.', 'Q.......', '..Q.....'], ['.....Q..', '...Q....', '......Q.', 'Q.......', '..Q.....', '....Q...', '.Q......', '.......Q'], ['.....Q..', '...Q....', '......Q.', 'Q.......', '.......Q', '.Q......', '....Q...', '..Q.....'], ['.....Q..', '.......Q', '.Q......', '...Q....', 'Q.......', '......Q.', '....Q...', '..Q.....'], ['......Q.', 'Q.......', '..Q.....', '.......Q', '.....Q..', '...Q....', '.Q......', '....Q...'], ['......Q.', '.Q......', '...Q....', 'Q.......', '.......Q', '....Q...', '..Q.....', '.....Q..'], ['......Q.', '.Q......', '.....Q..', '..Q.....', 'Q.......', '...Q....', '.......Q', '....Q...'], ['......Q.', '..Q.....', 'Q.......', '.....Q..', '.......Q', '....Q...', '.Q......', '...Q....'], ['......Q.', '..Q.....', '.......Q', '.Q......', '....Q...', 'Q.......', '.....Q..', '...Q....'], ['......Q.', '...Q....', '.Q......', '....Q...', '.......Q', 'Q.......', '..Q.....', '.....Q..'], ['......Q.', '...Q....', '.Q......', '.......Q', '.....Q..', 'Q.......', '..Q.....', '....Q...'], ['......Q.', '....Q...', '..Q.....', 'Q.......', '.....Q..', '.......Q', '.Q......', '...Q....'], ['.......Q', '.Q......', '...Q....', 'Q.......', '......Q.', '....Q...', '..Q.....', '.....Q..'], ['.......Q', '.Q......', '....Q...', '..Q.....', 'Q.......', '......Q.', '...Q....', '.....Q..'], ['.......Q', '..Q.....', 'Q.......', '.....Q..', '.Q......', '....Q...', '......Q.', '...Q....'], ['.......Q', '...Q....', 'Q.......', '..Q.....', '.....Q..', '.Q......', '......Q.', '....Q...']]]],
    ref: function (n) {
      const out = [], cols = [];
      const go = (r) => {
        if (r === n) { out.push(cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c))); return; }
        for (let c = 0; c < n; c++) if (cols.every((cc, rr) => cc !== c && Math.abs(cc - c) !== r - rr)) { cols.push(c); go(r + 1); cols.pop(); }
      };
      go(0);
      return out;
    }
  },
  'n-queens-ii': {
    fn: 'totalNQueens', params: ['n'], cmp: 'exact', meta: ['N-Queens II', 52, 'Hard', 'Backtracking'],
    ask: 'Return how many ways there are to place n queens on an n x n board so that no two share a row, a column or a diagonal.',
    sig: {
      py: 'def totalNQueens(n: int) -> int:',
      js: 'function totalNQueens(n) {',
      java: 'public int totalNQueens(int n) {',
      cpp: 'int totalNQueens(int n) {',
      go: 'func totalNQueens(n int) int {'
    },
    examples: [[[5], 10], [[2], 0], [[6], 4]],
    hidden: [[[1], 1], [[3], 0], [[4], 2], [[7], 40], [[8], 92]],
    ref: function (n) {
      let count = 0; const cols = [];
      const go = (r) => {
        if (r === n) { count++; return; }
        for (let c = 0; c < n; c++) if (cols.every((cc, rr) => cc !== c && Math.abs(cc - c) !== r - rr)) { cols.push(c); go(r + 1); cols.pop(); }
      };
      go(0);
      return count;
    }
  },
  'find-the-town-judge': {
    fn: 'findJudge', params: ['n', 'trust'], cmp: 'exact', meta: ['Find the Town Judge', 997, 'Easy', 'Graphs'],
    ask: 'People are labelled 1 to n, and [a, b] means a trusts b. The judge trusts nobody and is trusted by everybody else. Return the judge\'s label, or -1 if there is no judge.',
    sig: {
      py: 'def findJudge(n: int, trust: List[List[int]]) -> int:',
      js: 'function findJudge(n, trust) {',
      java: 'public int findJudge(int n, int[][] trust) {',
      cpp: 'int findJudge(int n, vector<vector<int>>& trust) {',
      go: 'func findJudge(n int, trust [][]int) int {'
    },
    examples: [[[4, [[1, 2], [3, 2], [4, 2]]], 2], [[4, [[1, 2], [3, 2]]], -1], [[1, []], 1]],
    hidden: [[[2, []], -1], [[2, [[2, 1]]], 1], [[3, [[1, 2], [2, 3], [1, 3]]], 3], [[3, [[1, 3], [2, 3], [3, 1]]], -1], [[5, [[1, 5], [2, 5], [3, 5], [4, 5], [5, 4]]], -1]],
    ref: function (n, trust) {
      const score = new Array(n + 1).fill(0);
      for (const [a, b] of trust) { score[a]--; score[b]++; }
      for (let i = 1; i <= n; i++) if (score[i] === n - 1) return i;
      return -1;
    }
  },
  'find-center-of-star-graph': {
    fn: 'findCenter', params: ['edges'], cmp: 'exact', meta: ['Find Center of Star Graph', 1791, 'Easy', 'Graphs'],
    ask: 'edges describe a star: one centre node joined to every other node, and no other edges. Return the centre.',
    sig: {
      py: 'def findCenter(edges: List[List[int]]) -> int:',
      js: 'function findCenter(edges) {',
      java: 'public int findCenter(int[][] edges) {',
      cpp: 'int findCenter(vector<vector<int>>& edges) {',
      go: 'func findCenter(edges [][]int) int {'
    },
    examples: [[[[[4, 1], [1, 2], [3, 1]]], 1], [[[[2, 1], [2, 3]]], 2], [[[[7, 6], [6, 1], [2, 6], [6, 3], [4, 6], [6, 5]]], 6]],
    hidden: [[[[[1, 2], [3, 2]]], 2], [[[[3, 1], [1, 2]]], 1], [[[[5, 4], [4, 1], [4, 2], [3, 4]]], 4], [[[[10, 9], [9, 8]]], 9], [[[[1, 3], [3, 2], [4, 3]]], 3]],
    ref: function (edges) { const [a, b] = edges[0]; return a === edges[1][0] || a === edges[1][1] ? a : b; }
  },
  'is-graph-bipartite': {
    fn: 'isBipartite', params: ['graph'], cmp: 'exact', meta: ['Is Graph Bipartite?', 785, 'Medium', 'Graphs'],
    ask: 'graph[i] lists the neighbours of node i in an undirected graph (it may have several parts). Return true if the nodes can be split into two groups so that every edge joins the two groups.',
    sig: {
      py: 'def isBipartite(graph: List[List[int]]) -> bool:',
      js: 'function isBipartite(graph) {',
      java: 'public boolean isBipartite(int[][] graph) {',
      cpp: 'bool isBipartite(vector<vector<int>>& graph) {',
      go: 'func isBipartite(graph [][]int) bool {'
    },
    examples: [[[[[1], [0]]], true], [[[[1, 2], [0, 2], [0, 1]]], false], [[[[], [2], [1]]], true]],
    hidden: [[[[[]]], true], [[[[1, 3], [0, 2], [1, 3], [0, 2]]], true], [[[[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]], false], [[[[1], [0], [3], [2, 4], [3]]], true], [[[[1], [0, 2], [1, 3], [2, 4], [3, 0]]], false]],
    ref: function (graph) {
      const color = graph.map(() => -1);
      for (let s = 0; s < graph.length; s++) {
        if (color[s] >= 0) continue;
        color[s] = 0; const q = [s];
        for (let h = 0; h < q.length; h++) for (const v of graph[q[h]]) {
          if (color[v] < 0) { color[v] = 1 - color[q[h]]; q.push(v); } else if (color[v] === color[q[h]]) return false;
        }
      }
      return true;
    }
  },
  'redundant-connection': {
    fn: 'findRedundantConnection', params: ['edges'], cmp: 'exact', meta: ['Redundant Connection', 684, 'Medium', 'Graphs'],
    ask: 'A tree with nodes 1 to n got one extra edge, so edges has n edges. Return an edge whose removal leaves a tree; if several work, return the one that appears last in edges.',
    sig: {
      py: 'def findRedundantConnection(edges: List[List[int]]) -> List[int]:',
      js: 'function findRedundantConnection(edges) {',
      java: 'public int[] findRedundantConnection(int[][] edges) {',
      cpp: 'vector<int> findRedundantConnection(vector<vector<int>>& edges) {',
      go: 'func findRedundantConnection(edges [][]int) []int {'
    },
    examples: [[[[[1, 2], [2, 3], [1, 3]]], [1, 3]], [[[[1, 2], [1, 3], [1, 4], [3, 4]]], [3, 4]], [[[[2, 3], [1, 2], [1, 3]]], [1, 3]]],
    hidden: [[[[[1, 2], [2, 1]]], [2, 1]], [[[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], [1, 4]], [[[[3, 4], [1, 2], [2, 4], [3, 5], [2, 5]]], [2, 5]], [[[[1, 5], [3, 4], [3, 5], [4, 5], [2, 4]]], [4, 5]], [[[[1, 2], [1, 3], [2, 3]]], [2, 3]]],
    ref: function (edges) {
      const p = Array.from({ length: edges.length + 1 }, (_, i) => i);
      const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
      for (const [a, b] of edges) { const ra = find(a), rb = find(b); if (ra === rb) return [a, b]; p[ra] = rb; }
      return [];
    }
  },
  'number-of-operations-to-make-network-connected': {
    fn: 'makeConnected', params: ['n', 'connections'], cmp: 'exact', meta: ['Number of Operations to Make Network Connected', 1319, 'Medium', 'Graphs'],
    ask: 'n computers (0 to n - 1) are joined by cables in connections. One move unplugs a cable and plugs it between two other computers. Return the fewest moves to connect every computer, or -1 if there are not enough cables.',
    sig: {
      py: 'def makeConnected(n: int, connections: List[List[int]]) -> int:',
      js: 'function makeConnected(n, connections) {',
      java: 'public int makeConnected(int n, int[][] connections) {',
      cpp: 'int makeConnected(int n, vector<vector<int>>& connections) {',
      go: 'func makeConnected(n int, connections [][]int) int {'
    },
    examples: [[[3, [[0, 1], [1, 2]]], 0], [[4, [[0, 1]]], -1], [[4, [[0, 1], [0, 2], [1, 2]]], 1]],
    hidden: [[[1, []], 0], [[2, []], -1], [[5, [[0, 1], [0, 2], [3, 4], [2, 3]]], 0], [[6, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]]], 2], [[6, [[0, 1], [0, 2], [0, 3], [1, 2]]], -1]],
    ref: function (n, connections) {
      if (connections.length < n - 1) return -1;
      const p = Array.from({ length: n }, (_, i) => i);
      const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
      let parts = n;
      for (const [a, b] of connections) { const ra = find(a), rb = find(b); if (ra !== rb) { p[ra] = rb; parts--; } }
      return parts - 1;
    }
  },
  'network-delay-time': {
    fn: 'networkDelayTime', params: ['times', 'n', 'k'], cmp: 'exact', meta: ['Network Delay Time', 743, 'Medium', 'Graphs'],
    ask: 'Nodes are 1 to n, and [u, v, w] means a signal takes w time to travel from u to v (one way). A signal starts at k. Return how long until every node has it, or -1 if some node never gets it.',
    sig: {
      py: 'def networkDelayTime(times: List[List[int]], n: int, k: int) -> int:',
      js: 'function networkDelayTime(times, n, k) {',
      java: 'public int networkDelayTime(int[][] times, int n, int k) {',
      cpp: 'int networkDelayTime(vector<vector<int>>& times, int n, int k) {',
      go: 'func networkDelayTime(times [][]int, n int, k int) int {'
    },
    examples: [[[[[1, 2, 4], [1, 3, 1], [3, 2, 2]], 3, 1], 3], [[[[1, 2, 1]], 2, 2], -1], [[[], 1, 1], 0]],
    hidden: [[[[[1, 2, 1], [2, 1, 3]], 2, 2], 3], [[[[1, 2, 5], [1, 3, 2], [3, 4, 1], [4, 2, 1]], 4, 1], 4], [[[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2], 2], [[[[1, 2, 7], [2, 3, 7]], 4, 1], -1], [[[[3, 1, 9], [3, 2, 4], [2, 1, 4]], 3, 3], 8]],
    ref: function (times, n, k) {
      const dist = new Array(n + 1).fill(Infinity); dist[k] = 0;
      for (let i = 0; i < n; i++) for (const [u, v, w] of times) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
      const worst = Math.max(...dist.slice(1));
      return worst === Infinity ? -1 : worst;
    }
  },
  'min-cost-to-connect-all-points': {
    fn: 'minCostConnectPoints', params: ['points'], cmp: 'exact', meta: ['Min Cost to Connect All Points', 1584, 'Medium', 'Graphs'],
    ask: 'Joining two points costs their Manhattan distance |x1 - x2| + |y1 - y2|. Return the least total cost to join all points so that every point can reach every other.',
    sig: {
      py: 'def minCostConnectPoints(points: List[List[int]]) -> int:',
      js: 'function minCostConnectPoints(points) {',
      java: 'public int minCostConnectPoints(int[][] points) {',
      cpp: 'int minCostConnectPoints(vector<vector<int>>& points) {',
      go: 'func minCostConnectPoints(points [][]int) int {'
    },
    examples: [[[[[0, 0], [1, 1]]], 2], [[[[5, 5]]], 0], [[[[0, 0], [2, 0], [2, 3]]], 5]],
    hidden: [[[[[0, 0], [0, 0]]], 0], [[[[-1, -1], [1, 1], [-1, 1], [1, -1]]], 6], [[[[3, 12], [-2, 5], [-4, 1]]], 18], [[[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], 20], [[[[1, 1], [10, 10], [1, 10], [10, 1], [5, 5]]], 35]],
    ref: function (points) {
      const n = points.length, best = new Array(n).fill(Infinity), used = new Array(n).fill(false); best[0] = 0; let total = 0;
      for (let k = 0; k < n; k++) {
        let u = -1; for (let i = 0; i < n; i++) if (!used[i] && (u < 0 || best[i] < best[u])) u = i;
        used[u] = true; total += best[u];
        for (let v = 0; v < n; v++) if (!used[v]) best[v] = Math.min(best[v], Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]));
      }
      return total;
    }
  },
  'cheapest-flights-within-k-stops': {
    fn: 'findCheapestPrice', params: ['n', 'flights', 'src', 'dst', 'k'], cmp: 'exact', meta: ['Cheapest Flights Within K Stops', 787, 'Medium', 'Graphs'],
    ask: 'Cities are 0 to n - 1, and [from, to, price] is a one-way flight. Return the cheapest price from src to dst using at most k stops in between, or -1 if there is no such route.',
    sig: {
      py: 'def findCheapestPrice(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:',
      js: 'function findCheapestPrice(n, flights, src, dst, k) {',
      java: 'public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {',
      cpp: 'int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {',
      go: 'func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {'
    },
    examples: [[[3, [[0, 1, 5], [1, 2, 5], [0, 2, 20]], 0, 2, 1], 10], [[3, [[0, 1, 5], [1, 2, 5], [0, 2, 20]], 0, 2, 0], 20], [[2, [[1, 0, 3]], 0, 1, 1], -1]],
    hidden: [[[4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 10]], 0, 3, 2], 3], [[4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 10]], 0, 3, 1], 10], [[5, [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 1], [4, 2, 1]], 0, 2, 2], 7], [[3, [[0, 1, 2], [1, 0, 2]], 0, 2, 5], -1], [[4, [[0, 1, 100], [0, 2, 50], [2, 1, 20], [1, 3, 10]], 0, 3, 1], 110]],
    ref: function (n, flights, src, dst, k) {
      let cost = new Array(n).fill(Infinity); cost[src] = 0;
      for (let i = 0; i <= k; i++) {
        const next = cost.slice();
        for (const [a, b, p] of flights) if (cost[a] + p < next[b]) next[b] = cost[a] + p;
        cost = next;
      }
      return cost[dst] === Infinity ? -1 : cost[dst];
    }
  },
  'path-with-minimum-effort': {
    fn: 'minimumEffortPath', params: ['heights'], cmp: 'exact', meta: ['Path With Minimum Effort', 1631, 'Medium', 'Graphs'],
    ask: 'Walk from the top-left to the bottom-right cell, moving up, down, left or right. The effort of a route is the biggest height difference between two cells next to each other on it. Return the smallest effort possible.',
    sig: {
      py: 'def minimumEffortPath(heights: List[List[int]]) -> int:',
      js: 'function minimumEffortPath(heights) {',
      java: 'public int minimumEffortPath(int[][] heights) {',
      cpp: 'int minimumEffortPath(vector<vector<int>>& heights) {',
      go: 'func minimumEffortPath(heights [][]int) int {'
    },
    examples: [[[[[1, 3], [2, 8]]], 5], [[[[4]]], 0], [[[[1, 1, 1], [9, 9, 1], [1, 1, 1]]], 0]],
    hidden: [[[[[1, 10, 6, 7, 9, 10, 4, 9]]], 9], [[[[1, 2, 2], [3, 8, 2], [5, 3, 5]]], 2], [[[[3, 3, 9], [9, 3, 9], [9, 3, 3]]], 0], [[[[10, 8], [10, 8], [1, 2], [10, 3], [1, 3]]], 6], [[[[5, 1], [1, 5]]], 4]],
    ref: function (heights) {
      const R = heights.length, C = heights[0].length;
      const ok = (lim) => {
        const seen = new Set([0]), st = [[0, 0]];
        while (st.length) {
          const [r, c] = st.pop(); if (r === R - 1 && c === C - 1) return true;
          for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
            if (nr < 0 || nc < 0 || nr >= R || nc >= C || seen.has(nr * C + nc) || Math.abs(heights[nr][nc] - heights[r][c]) > lim) continue;
            seen.add(nr * C + nc); st.push([nr, nc]);
          }
        }
        return false;
      };
      let lo = 0, hi = 1000000;
      while (lo < hi) { const m = Math.floor((lo + hi) / 2); if (ok(m)) hi = m; else lo = m + 1; }
      return lo;
    }
  },
  'longest-common-prefix': {
    fn: 'longestCommonPrefix', params: ['strs'], cmp: 'exact', meta: ['Longest Common Prefix', 14, 'Easy', 'Tries'],
    ask: 'Return the longest string that every word in strs starts with ("" if there is none).',
    sig: {
      py: 'def longestCommonPrefix(strs: List[str]) -> str:',
      js: 'function longestCommonPrefix(strs) {',
      java: 'public String longestCommonPrefix(String[] strs) {',
      cpp: 'string longestCommonPrefix(vector<string>& strs) {',
      go: 'func longestCommonPrefix(strs []string) string {'
    },
    examples: [[[['flame', 'flash', 'flat']], 'fla'], [[['a', 'b']], ''], [[['same', 'same']], 'same']],
    hidden: [[[['solo']], 'solo'], [[['', 'abc']], ''], [[['interview', 'internet', 'interval', 'intern']], 'inter'], [[['ab', 'a']], 'a'], [[['prefix', 'prefixes', 'pre']], 'pre']],
    ref: function (strs) {
      let p = strs[0];
      for (const s of strs) while (!s.startsWith(p)) p = p.slice(0, -1);
      return p;
    }
  },
  'design-add-and-search-words-data-structure': {
    fn: 'WordDictionary', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Add and Search Words Data Structure', 211, 'Medium', 'Tries'],
    ask: 'Build a word store. addWord(word) saves a lowercase word. search(word) returns true if a saved word matches, where "." in the search matches any one letter. The first op creates the store; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class WordDictionary:', js: 'class WordDictionary {', java: 'class WordDictionary {', cpp: 'class WordDictionary {', go: 'type WordDictionary struct {' },
    starter: {
      py: 'class WordDictionary:\n    def __init__(self):\n        pass\n\n    def addWord(self, word: str) -> None:\n        pass\n\n    def search(self, word: str) -> bool:\n        pass\n',
      js: 'class WordDictionary {\n  constructor() {\n  }\n  addWord(word) {\n  }\n  search(word) {\n  }\n}\n',
      java: 'class WordDictionary {\n    public WordDictionary() {\n    }\n    public void addWord(String word) {\n    }\n    public boolean search(String word) {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass WordDictionary {\npublic:\n    WordDictionary() {\n    }\n    void addWord(string word) {\n    }\n    bool search(string word) {\n        return false;\n    }\n};\n',
      go: 'package main\n\ntype WordDictionary struct {\n}\n\nfunc Constructor() WordDictionary {\n    return WordDictionary{}\n}\n\nfunc (this *WordDictionary) AddWord(word string) {\n}\n\nfunc (this *WordDictionary) Search(word string) bool {\n    return false\n}\n'
    },
    examples: [[[['WordDictionary', 'addWord', 'addWord', 'search', 'search', 'search'], [[], ['cat'], ['car'], ['ca.'], ['c.t'], ['b..']]], [null, null, null, true, true, false]], [[['WordDictionary', 'search'], [[], ['a']]], [null, false]], [[['WordDictionary', 'addWord', 'search', 'search'], [[], ['go'], ['g'], ['..']]], [null, null, false, true]]],
    hidden: [[[['WordDictionary', 'addWord', 'search', 'search', 'search'], [[], ['a'], ['a'], ['.'], ['..']]], [null, null, true, true, false]], [[['WordDictionary', 'addWord', 'addWord', 'search', 'search', 'search'], [[], ['bad'], ['dad'], ['pad'], ['.ad'], ['b..']]], [null, null, null, false, true, true]], [[['WordDictionary', 'addWord', 'search', 'search'], [[], ['apple'], ['app'], ['apple.']]], [null, null, false, false]], [[['WordDictionary', 'addWord', 'addWord', 'search'], [[], ['xy'], ['xyz'], ['x.z']]], [null, null, null, true]], [[['WordDictionary', 'addWord', 'search', 'addWord', 'search'], [[], ['ab'], ['a.c'], ['abc'], ['a.c']]], [null, null, false, null, true]]],
    ref: class {
      constructor() { this.root = {}; }
      addWord(word) { let n = this.root; for (const c of word) n = n[c] || (n[c] = {}); n.end = true; }
      search(word) {
        const go = (n, i) => {
          if (i === word.length) return !!n.end;
          if (word[i] === '.') return Object.keys(n).some((k) => k !== 'end' && go(n[k], i + 1));
          return !!n[word[i]] && go(n[word[i]], i + 1);
        };
        return go(this.root, 0);
      }
    }
  },
  'replace-words': {
    fn: 'replaceWords', params: ['dictionary', 'sentence'], cmp: 'exact', meta: ['Replace Words', 648, 'Medium', 'Tries'],
    ask: 'dictionary holds word roots. In sentence (words split by single spaces), replace each word that starts with a root by the shortest such root. Return the new sentence.',
    sig: {
      py: 'def replaceWords(dictionary: List[str], sentence: str) -> str:',
      js: 'function replaceWords(dictionary, sentence) {',
      java: 'public String replaceWords(List<String> dictionary, String sentence) {',
      cpp: 'string replaceWords(vector<string>& dictionary, string sentence) {',
      go: 'func replaceWords(dictionary []string, sentence string) string {'
    },
    examples: [[[['sun', 'moon'], 'sunlight moonbeam stars'], 'sun moon stars'], [[['a', 'ab'], 'abc bca'], 'a bca'], [[[], 'hello there'], 'hello there']],
    hidden: [[[['cat', 'bat', 'rat'], 'the cattle was rattled by the battery'], 'the cat was rat by the bat'], [[['re', 'rep', 'repl'], 'replace repeat read'], 're re re'], [[['x'], 'x xx xy yx'], 'x x x yx'], [[['long', 'lo'], 'long lorry'], 'lo lo'], [[['abc'], 'ab abc abcd'], 'ab abc abc']],
    ref: function (dictionary, sentence) {
      const roots = new Set(dictionary);
      return sentence.split(' ').map((w) => { for (let i = 1; i <= w.length; i++) if (roots.has(w.slice(0, i))) return w.slice(0, i); return w; }).join(' ');
    }
  },
  'search-suggestions-system': {
    fn: 'suggestedProducts', params: ['products', 'searchWord'], cmp: 'exact', meta: ['Search Suggestions System', 1268, 'Medium', 'Tries'],
    ask: 'After each letter of searchWord is typed, suggest up to three products that start with what has been typed so far, picking the alphabetically smallest ones. Return the list of suggestions after each letter.',
    sig: {
      py: 'def suggestedProducts(products: List[str], searchWord: str) -> List[List[str]]:',
      js: 'function suggestedProducts(products, searchWord) {',
      java: 'public List<List<String>> suggestedProducts(String[] products, String searchWord) {',
      cpp: 'vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {',
      go: 'func suggestedProducts(products []string, searchWord string) [][]string {'
    },
    examples: [[[['pen', 'pencil', 'pear', 'apple'], 'pe'], [['pear', 'pen', 'pencil'], ['pear', 'pen', 'pencil']]], [[['dog'], 'cat'], [[], [], []]], [[['ab', 'abc', 'abd', 'abe'], 'ab'], [['ab', 'abc', 'abd'], ['ab', 'abc', 'abd']]]],
    hidden: [[[['a'], 'a'], [['a']]], [[['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad'], 'mouse'], [['mobile', 'moneypot', 'monitor'], ['mobile', 'moneypot', 'monitor'], ['mouse', 'mousepad'], ['mouse', 'mousepad'], ['mouse', 'mousepad']]], [[['bags', 'baggage', 'banner', 'box', 'cloths'], 'bags'], [['baggage', 'bags', 'banner'], ['baggage', 'bags', 'banner'], ['baggage', 'bags'], ['bags']]], [[['zz', 'zy', 'zx', 'zw'], 'zq'], [['zw', 'zx', 'zy'], []]], [[['tea', 'ten', 'tent', 'test', 'team'], 'te'], [['tea', 'team', 'ten'], ['tea', 'team', 'ten']]]],
    ref: function (products, searchWord) {
      const p = products.slice().sort(), out = [];
      for (let i = 1; i <= searchWord.length; i++) { const pre = searchWord.slice(0, i); out.push(p.filter((w) => w.startsWith(pre)).slice(0, 3)); }
      return out;
    }
  },
  'map-sum-pairs': {
    fn: 'MapSum', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Map Sum Pairs', 677, 'Medium', 'Tries'],
    ask: 'Build a map from words to numbers. insert(key, val) sets key to val (replacing any old value). sum(prefix) returns the total of the values of all keys that start with prefix. The first op creates the map; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class MapSum:', js: 'class MapSum {', java: 'class MapSum {', cpp: 'class MapSum {', go: 'type MapSum struct {' },
    starter: {
      py: 'class MapSum:\n    def __init__(self):\n        pass\n\n    def insert(self, key: str, val: int) -> None:\n        pass\n\n    def sum(self, prefix: str) -> int:\n        pass\n',
      js: 'class MapSum {\n  constructor() {\n  }\n  insert(key, val) {\n  }\n  sum(prefix) {\n  }\n}\n',
      java: 'class MapSum {\n    public MapSum() {\n    }\n    public void insert(String key, int val) {\n    }\n    public int sum(String prefix) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MapSum {\npublic:\n    MapSum() {\n    }\n    void insert(string key, int val) {\n    }\n    int sum(string prefix) {\n        return 0;\n    }\n};\n',
      go: 'package main\n\ntype MapSum struct {\n}\n\nfunc Constructor() MapSum {\n    return MapSum{}\n}\n\nfunc (this *MapSum) Insert(key string, val int) {\n}\n\nfunc (this *MapSum) Sum(prefix string) int {\n    return 0\n}\n'
    },
    examples: [[[['MapSum', 'insert', 'insert', 'sum', 'sum'], [[], ['tree', 3], ['trek', 4], ['tre'], ['trees']]], [null, null, null, 7, 0]], [[['MapSum', 'insert', 'insert', 'sum'], [[], ['a', 1], ['a', 5], ['a']]], [null, null, null, 5]], [[['MapSum', 'sum'], [[], ['x']]], [null, 0]]],
    hidden: [[[['MapSum', 'insert', 'sum', 'insert', 'sum'], [[], ['apple', 3], ['ap'], ['app', 2], ['ap']]], [null, null, 3, null, 5]], [[['MapSum', 'insert', 'insert', 'insert', 'sum', 'sum'], [[], ['b', 1], ['bb', 2], ['bbb', 3], ['b'], ['bb']]], [null, null, null, null, 6, 5]], [[['MapSum', 'insert', 'sum'], [[], ['key', 10], ['key']]], [null, null, 10]], [[['MapSum', 'insert', 'insert', 'sum', 'sum'], [[], ['cat', 2], ['car', 3], ['c'], ['cab']]], [null, null, null, 5, 0]], [[['MapSum', 'insert', 'insert', 'insert', 'sum'], [[], ['z', 1], ['z', 2], ['zz', 3], ['z']]], [null, null, null, null, 5]]],
    ref: class {
      constructor() { this.m = new Map(); }
      insert(key, val) { this.m.set(key, val); }
      sum(prefix) { let s = 0; for (const [k, v] of this.m) if (k.startsWith(prefix)) s += v; return s; }
    }
  },
  'word-search-ii': {
    fn: 'findWords', params: ['board', 'words'], cmp: 'unordered', meta: ['Word Search II', 212, 'Hard', 'Tries'],
    ask: 'A word is on the board if it can be spelled by a path of cells joined up, down, left or right, using each cell at most once per word. Return every word from words that is on the board, in any order.',
    sig: {
      py: 'def findWords(board: List[List[str]], words: List[str]) -> List[str]:',
      js: 'function findWords(board, words) {',
      java: 'public List<String> findWords(char[][] board, String[] words) {',
      cpp: 'vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {',
      go: 'func findWords(board [][]byte, words []string) []string {'
    },
    examples: [[[[['a', 'b'], ['c', 'd']], ['ab', 'abdc', 'ac', 'bd', 'x']], ['ab', 'abdc', 'ac', 'bd']], [[[['a']], ['a', 'aa']], ['a']], [[[['c', 'a', 't'], ['o', 'x', 'o']], ['cat', 'cot', 'tot']], ['cat']]],
    hidden: [[[[['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']], ['oath', 'pea', 'eat', 'rain']], ['oath', 'eat']], [[[['a', 'b']], ['ba', 'ab', 'aba']], ['ba', 'ab']], [[[['a', 'a', 'a'], ['a', 'a', 'a']], ['aaaaaa', 'aaaaaaa']], ['aaaaaa']], [[[['x', 'y', 'z'], ['w', 'v', 'u']], ['xyzuvw', 'xw', 'zu', 'xz']], ['xyzuvw', 'xw', 'zu']], [[[['a', 'b'], ['b', 'a']], ['abab', 'abba', 'aa']], ['abab']]],
    ref: function (board, words) {
      const R = board.length, C = board[0].length;
      const has = (w) => {
        const go = (r, c, i) => {
          if (i === w.length) return true;
          if (r < 0 || c < 0 || r >= R || c >= C || board[r][c] !== w[i]) return false;
          const t = board[r][c]; board[r][c] = '#';
          const ok = go(r + 1, c, i + 1) || go(r - 1, c, i + 1) || go(r, c + 1, i + 1) || go(r, c - 1, i + 1);
          board[r][c] = t; return ok;
        };
        for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (go(r, c, 0)) return true;
        return false;
      };
      return [...new Set(words)].filter(has);
    }
  },
  'maximum-xor-of-two-numbers-in-an-array': {
    fn: 'findMaximumXOR', params: ['nums'], cmp: 'exact', meta: ['Maximum XOR of Two Numbers in an Array', 421, 'Medium', 'Tries'],
    ask: 'nums holds non-negative integers. Return the largest value of nums[i] XOR nums[j] over all i and j (i may equal j). O(n) with a bit trie is possible.',
    sig: {
      py: 'def findMaximumXOR(nums: List[int]) -> int:',
      js: 'function findMaximumXOR(nums) {',
      java: 'public int findMaximumXOR(int[] nums) {',
      cpp: 'int findMaximumXOR(vector<int>& nums) {',
      go: 'func findMaximumXOR(nums []int) int {'
    },
    examples: [[[[1, 2, 4]], 6], [[[0]], 0], [[[8, 10, 2]], 10]],
    hidden: [[[[7, 7]], 0], [[[3, 10, 5, 25, 2, 8]], 28], [[[1, 2, 3, 4, 5, 6, 7]], 7], [[[2147483647, 0]], 2147483647], [[[14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]], 127]],
    ref: function (nums) {
      let best = 0, mask = 0;
      for (let b = 30; b >= 0; b--) {
        mask |= 1 << b;
        const pre = new Set(nums.map((x) => x & mask)), want = best | (1 << b);
        for (const p of pre) if (pre.has(p ^ want)) { best = want; break; }
      }
      return best;
    }
  },
  'fibonacci-number': {
    fn: 'fib', params: ['n'], cmp: 'exact', meta: ['Fibonacci Number', 509, 'Easy', 'Dynamic Programming'],
    ask: 'F(0) = 0, F(1) = 1, and every later number is the sum of the two before it. Return F(n) for 0 <= n <= 30.',
    sig: {
      py: 'def fib(n: int) -> int:',
      js: 'function fib(n) {',
      java: 'public int fib(int n) {',
      cpp: 'int fib(int n) {',
      go: 'func fib(n int) int {'
    },
    examples: [[[5], 5], [[0], 0], [[10], 55]],
    hidden: [[[1], 1], [[2], 1], [[20], 6765], [[25], 75025], [[30], 832040]],
    ref: function (n) { let a = 0, b = 1; for (let i = 0; i < n; i++) [a, b] = [b, a + b]; return a; }
  },
  'n-th-tribonacci-number': {
    fn: 'tribonacci', params: ['n'], cmp: 'exact', meta: ['N-th Tribonacci Number', 1137, 'Easy', 'Dynamic Programming'],
    ask: 'T(0) = 0, T(1) = 1, T(2) = 1, and every later number is the sum of the three before it. Return T(n) for 0 <= n <= 37.',
    sig: {
      py: 'def tribonacci(n: int) -> int:',
      js: 'function tribonacci(n) {',
      java: 'public int tribonacci(int n) {',
      cpp: 'int tribonacci(int n) {',
      go: 'func tribonacci(n int) int {'
    },
    examples: [[[3], 2], [[0], 0], [[6], 13]],
    hidden: [[[1], 1], [[2], 1], [[10], 149], [[30], 29249425], [[37], 2082876103]],
    ref: function (n) { const t = [0, 1, 1]; for (let i = 3; i <= n; i++) t.push(t[i - 1] + t[i - 2] + t[i - 3]); return t[n]; }
  },
  'house-robber-ii': {
    fn: 'rob', params: ['nums'], cmp: 'exact', meta: ['House Robber II', 213, 'Medium', 'Dynamic Programming'],
    ask: 'The houses stand in a circle, so the first and the last are neighbours. Robbing two neighbouring houses sets off the alarm. Return the most money you can take.',
    sig: {
      py: 'def rob(nums: List[int]) -> int:',
      js: 'function rob(nums) {',
      java: 'public int rob(int[] nums) {',
      cpp: 'int rob(vector<int>& nums) {',
      go: 'func rob(nums []int) int {'
    },
    examples: [[[[3, 5, 3]], 5], [[[4]], 4], [[[6, 1, 1, 6]], 7]],
    hidden: [[[[1, 2]], 2], [[[2, 3, 2]], 3], [[[1, 2, 3, 1]], 4], [[[5, 1, 1, 5, 1]], 10], [[[200, 3, 140, 20, 10]], 340]],
    ref: function (nums) {
      if (nums.length === 1) return nums[0];
      const line = (a) => { let take = 0, skip = 0; for (const x of a) [take, skip] = [skip + x, Math.max(take, skip)]; return Math.max(take, skip); };
      return Math.max(line(nums.slice(1)), line(nums.slice(0, -1)));
    }
  },
  'delete-and-earn': {
    fn: 'deleteAndEarn', params: ['nums'], cmp: 'exact', meta: ['Delete and Earn', 740, 'Medium', 'Dynamic Programming'],
    ask: 'Pick a number x from nums to earn x points; then every x - 1 and x + 1 left in nums is deleted. Repeat as long as you like. Return the most points you can earn.',
    sig: {
      py: 'def deleteAndEarn(nums: List[int]) -> int:',
      js: 'function deleteAndEarn(nums) {',
      java: 'public int deleteAndEarn(int[] nums) {',
      cpp: 'int deleteAndEarn(vector<int>& nums) {',
      go: 'func deleteAndEarn(nums []int) int {'
    },
    examples: [[[[2, 3, 4]], 6], [[[5, 5, 5]], 15], [[[1, 2, 2, 3]], 4]],
    hidden: [[[[1]], 1], [[[3, 4, 2]], 6], [[[2, 2, 3, 3, 3, 4]], 9], [[[1, 1, 1, 2, 4, 5, 5, 5, 6]], 18], [[[8, 10, 4, 9, 1, 3, 5, 9, 4, 10]], 37]],
    ref: function (nums) {
      const pts = new Array(Math.max(...nums) + 1).fill(0);
      for (const x of nums) pts[x] += x;
      let take = 0, skip = 0;
      for (const p of pts) [take, skip] = [skip + p, Math.max(take, skip)];
      return Math.max(take, skip);
    }
  },
  'maximum-product-subarray': {
    fn: 'maxProduct', params: ['nums'], cmp: 'exact', meta: ['Maximum Product Subarray', 152, 'Medium', 'Dynamic Programming'],
    ask: 'Return the largest product of a non-empty run of neighbouring numbers in nums.',
    sig: {
      py: 'def maxProduct(nums: List[int]) -> int:',
      js: 'function maxProduct(nums) {',
      java: 'public int maxProduct(int[] nums) {',
      cpp: 'int maxProduct(vector<int>& nums) {',
      go: 'func maxProduct(nums []int) int {'
    },
    examples: [[[[2, -3, 4]], 4], [[[-2, -3]], 6], [[[0, -1]], 0]],
    hidden: [[[[-5]], -5], [[[2, 3, -2, 4]], 6], [[[-2, 0, -1]], 0], [[[-1, -2, -3, 0, 2, 5]], 10], [[[3, -1, 4, -2]], 24]],
    ref: function (nums) {
      let hi = nums[0], lo = nums[0], best = nums[0];
      for (let i = 1; i < nums.length; i++) {
        const x = nums[i], a = hi * x, b = lo * x;
        hi = Math.max(x, a, b); lo = Math.min(x, a, b); best = Math.max(best, hi);
      }
      return best;
    }
  },
  'best-time-to-buy-and-sell-stock-with-cooldown': {
    fn: 'maxProfit', params: ['prices'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock with Cooldown', 309, 'Medium', 'Dynamic Programming'],
    ask: 'prices[i] is a share price on day i. Hold at most one share, trade as often as you like, but after selling you must wait one full day before buying again. Return the most profit possible.',
    sig: {
      py: 'def maxProfit(prices: List[int]) -> int:',
      js: 'function maxProfit(prices) {',
      java: 'public int maxProfit(int[] prices) {',
      cpp: 'int maxProfit(vector<int>& prices) {',
      go: 'func maxProfit(prices []int) int {'
    },
    examples: [[[[1, 4, 2, 6]], 5], [[[5]], 0], [[[1, 3, 1, 3]], 2]],
    hidden: [[[[1, 2, 3, 0, 2]], 3], [[[6, 5, 4]], 0], [[[1, 5, 1, 1, 5]], 8], [[[2, 1, 4, 5, 2, 9, 7]], 10], [[[3, 3, 5, 0, 0, 3, 1, 4]], 6]],
    ref: function (prices) {
      let hold = -Infinity, sold = 0, rest = 0;
      for (const p of prices) [hold, sold, rest] = [Math.max(hold, rest - p), hold + p, Math.max(rest, sold)];
      return Math.max(sold, rest);
    }
  },
  'best-time-to-buy-and-sell-stock-with-transaction-fee': {
    fn: 'maxProfit', params: ['prices', 'fee'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock with Transaction Fee', 714, 'Medium', 'Dynamic Programming'],
    ask: 'prices[i] is a share price on day i. Hold at most one share and trade as often as you like, but every sale costs fee. Return the most profit possible.',
    sig: {
      py: 'def maxProfit(prices: List[int], fee: int) -> int:',
      js: 'function maxProfit(prices, fee) {',
      java: 'public int maxProfit(int[] prices, int fee) {',
      cpp: 'int maxProfit(vector<int>& prices, int fee) {',
      go: 'func maxProfit(prices []int, fee int) int {'
    },
    examples: [[[[1, 5, 2, 8], 2], 6], [[[3, 3], 1], 0], [[[1, 10], 9], 0]],
    hidden: [[[[7], 1], 0], [[[1, 3, 2, 8, 4, 9], 2], 8], [[[1, 3, 7, 5, 10, 3], 3], 6], [[[5, 4, 3, 2, 1], 0], 0], [[[2, 6, 2, 6, 2, 6], 1], 9]],
    ref: function (prices, fee) {
      let hold = -prices[0], free = 0;
      for (const p of prices) [hold, free] = [Math.max(hold, free - p), Math.max(free, hold + p - fee)];
      return free;
    }
  },
  'minimum-path-sum': {
    fn: 'minPathSum', params: ['grid'], cmp: 'exact', meta: ['Minimum Path Sum', 64, 'Medium', 'Dynamic Programming'],
    ask: 'Walk from the top-left to the bottom-right cell of grid, moving only right or down. Return the smallest possible sum of the cells you step on.',
    sig: {
      py: 'def minPathSum(grid: List[List[int]]) -> int:',
      js: 'function minPathSum(grid) {',
      java: 'public int minPathSum(int[][] grid) {',
      cpp: 'int minPathSum(vector<vector<int>>& grid) {',
      go: 'func minPathSum(grid [][]int) int {'
    },
    examples: [[[[[1, 2], [3, 4]]], 7], [[[[5]]], 5], [[[[1, 9, 1], [1, 1, 1]]], 4]],
    hidden: [[[[[1, 2, 3]]], 6], [[[[1], [2], [3]]], 6], [[[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], 7], [[[[0, 0, 0], [0, 9, 0], [9, 9, 0]]], 0], [[[[5, 1, 8], [2, 7, 3], [6, 4, 9]]], 25]],
    ref: function (grid) {
      const R = grid.length, C = grid[0].length, d = new Array(C).fill(Infinity); d[0] = 0;
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) d[c] = grid[r][c] + (c ? Math.min(d[c], d[c - 1]) : d[c]);
      return d[C - 1];
    }
  },
  'perfect-squares': {
    fn: 'numSquares', params: ['n'], cmp: 'exact', meta: ['Perfect Squares', 279, 'Medium', 'Dynamic Programming'],
    ask: 'Return the fewest perfect squares (1, 4, 9, 16, ...) that add up to n.',
    sig: {
      py: 'def numSquares(n: int) -> int:',
      js: 'function numSquares(n) {',
      java: 'public int numSquares(int n) {',
      cpp: 'int numSquares(int n) {',
      go: 'func numSquares(n int) int {'
    },
    examples: [[[7], 4], [[16], 1], [[5], 2]],
    hidden: [[[1], 1], [[2], 2], [[43], 3], [[99], 3], [[1000], 2]],
    ref: function (n) {
      const d = new Array(n + 1).fill(Infinity); d[0] = 0;
      for (let i = 1; i <= n; i++) for (let j = 1; j * j <= i; j++) d[i] = Math.min(d[i], d[i - j * j] + 1);
      return d[n];
    }
  },
  'coin-change-ii': {
    fn: 'change', params: ['amount', 'coins'], cmp: 'exact', meta: ['Coin Change II', 518, 'Medium', 'Dynamic Programming'],
    ask: 'You have unlimited coins of each value in coins. Return how many different combinations of coins make up amount (order does not matter).',
    sig: {
      py: 'def change(amount: int, coins: List[int]) -> int:',
      js: 'function change(amount, coins) {',
      java: 'public int change(int amount, int[] coins) {',
      cpp: 'int change(int amount, vector<int>& coins) {',
      go: 'func change(amount int, coins []int) int {'
    },
    examples: [[[4, [1, 2]], 3], [[0, [7]], 1], [[3, [2]], 0]],
    hidden: [[[10, [10]], 1], [[10, [1, 5, 10]], 4], [[12, [2, 3, 5]], 5], [[100, [3, 7, 11]], 26], [[6, [4, 5]], 0]],
    ref: function (amount, coins) {
      const d = new Array(amount + 1).fill(0); d[0] = 1;
      for (const c of coins) for (let a = c; a <= amount; a++) d[a] += d[a - c];
      return d[amount];
    }
  },
  'combination-sum-iv': {
    fn: 'combinationSum4', params: ['nums', 'target'], cmp: 'exact', meta: ['Combination Sum IV', 377, 'Medium', 'Dynamic Programming'],
    ask: 'nums holds different positive integers, each usable any number of times. Return how many ordered sequences of them add up to target (different orders count as different).',
    sig: {
      py: 'def combinationSum4(nums: List[int], target: int) -> int:',
      js: 'function combinationSum4(nums, target) {',
      java: 'public int combinationSum4(int[] nums, int target) {',
      cpp: 'int combinationSum4(vector<int>& nums, int target) {',
      go: 'func combinationSum4(nums []int, target int) int {'
    },
    examples: [[[[1, 2], 3], 3], [[[5], 3], 0], [[[1], 4], 1]],
    hidden: [[[[2, 3], 7], 3], [[[1, 2, 3], 4], 7], [[[4, 2, 1], 10], 169], [[[9], 9], 1], [[[3, 5, 7], 20], 25]],
    ref: function (nums, target) {
      const d = new Array(target + 1).fill(0); d[0] = 1;
      for (let t = 1; t <= target; t++) for (const x of nums) if (x <= t) d[t] += d[t - x];
      return d[target];
    }
  },
  'minimum-cost-for-tickets': {
    fn: 'mincostTickets', params: ['days', 'costs'], cmp: 'exact', meta: ['Minimum Cost For Tickets', 983, 'Medium', 'Dynamic Programming'],
    ask: 'days lists the days of the year (1 to 365, sorted) you will travel. A 1-day pass costs costs[0], a 7-day pass costs[1], and a 30-day pass costs[2]; each covers that many days in a row. Return the least you can spend to cover every travel day.',
    sig: {
      py: 'def mincostTickets(days: List[int], costs: List[int]) -> int:',
      js: 'function mincostTickets(days, costs) {',
      java: 'public int mincostTickets(int[] days, int[] costs) {',
      cpp: 'int mincostTickets(vector<int>& days, vector<int>& costs) {',
      go: 'func mincostTickets(days []int, costs []int) int {'
    },
    examples: [[[[1, 2, 3], [2, 5, 20]], 5], [[[1, 30], [3, 8, 20]], 6], [[[5], [4, 2, 10]], 2]],
    hidden: [[[[1, 4, 6, 7, 8, 20], [2, 7, 15]], 11], [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]], 17], [[[100], [1, 1, 1]], 1], [[[1, 8, 15, 22, 29], [5, 9, 30]], 25], [[[3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 360], [3, 10, 25]], 23]],
    ref: function (days, costs) {
      const travel = new Set(days), d = new Array(366).fill(0);
      for (let i = 1; i <= 365; i++) d[i] = !travel.has(i) ? d[i - 1] : Math.min(d[i - 1] + costs[0], d[Math.max(0, i - 7)] + costs[1], d[Math.max(0, i - 30)] + costs[2]);
      return d[365];
    }
  },
  'best-time-to-buy-and-sell-stock-iii': {
    fn: 'maxProfit', params: ['prices'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock III', 123, 'Hard', 'Dynamic Programming'],
    ask: 'prices[i] is a share price on day i. Make at most two complete buy-then-sell trades, holding at most one share at a time. Return the most profit possible.',
    sig: {
      py: 'def maxProfit(prices: List[int]) -> int:',
      js: 'function maxProfit(prices) {',
      java: 'public int maxProfit(int[] prices) {',
      cpp: 'int maxProfit(vector<int>& prices) {',
      go: 'func maxProfit(prices []int) int {'
    },
    examples: [[[[1, 4, 2, 7]], 8], [[[7, 6, 5]], 0], [[[2, 9]], 7]],
    hidden: [[[[3]], 0], [[[3, 3, 5, 0, 0, 3, 1, 4]], 6], [[[1, 2, 3, 4, 5]], 4], [[[1, 5, 2, 6, 3, 7]], 9], [[[6, 1, 3, 2, 4, 7, 0, 9]], 15]],
    ref: function (prices) {
      let b1 = -Infinity, s1 = 0, b2 = -Infinity, s2 = 0;
      for (const p of prices) { b1 = Math.max(b1, -p); s1 = Math.max(s1, b1 + p); b2 = Math.max(b2, s1 - p); s2 = Math.max(s2, b2 + p); }
      return s2;
    }
  },
  'unique-paths-ii': {
    fn: 'uniquePathsWithObstacles', params: ['obstacleGrid'], cmp: 'exact', meta: ['Unique Paths II', 63, 'Medium', 'Dynamic Programming'],
    ask: 'A robot starts at the top-left cell and moves only right or down to the bottom-right cell. Cells with 1 are rocks it cannot enter. Return how many different routes there are.',
    sig: {
      py: 'def uniquePathsWithObstacles(obstacleGrid: List[List[int]]) -> int:',
      js: 'function uniquePathsWithObstacles(obstacleGrid) {',
      java: 'public int uniquePathsWithObstacles(int[][] obstacleGrid) {',
      cpp: 'int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {',
      go: 'func uniquePathsWithObstacles(obstacleGrid [][]int) int {'
    },
    examples: [[[[[0, 0], [0, 0]]], 2], [[[[0, 1], [0, 0]]], 1], [[[[1]]], 0]],
    hidden: [[[[[0]]], 1], [[[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], 2], [[[[0, 0], [1, 1], [0, 0]]], 0], [[[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]], 10], [[[[0, 0, 0], [0, 0, 0], [0, 0, 1]]], 0]],
    ref: function (obstacleGrid) {
      const C = obstacleGrid[0].length, d = new Array(C).fill(0); d[0] = 1;
      for (const row of obstacleGrid) for (let c = 0; c < C; c++) d[c] = row[c] ? 0 : d[c] + (c ? d[c - 1] : 0);
      return d[C - 1];
    }
  },
  'triangle': {
    fn: 'minimumTotal', params: ['triangle'], cmp: 'exact', meta: ['Triangle', 120, 'Medium', 'Dynamic Programming'],
    ask: 'Row i of triangle has i + 1 numbers. Walk from the top to the bottom row; from position j you may step to position j or j + 1 of the next row. Return the smallest possible sum of the numbers on your path.',
    sig: {
      py: 'def minimumTotal(triangle: List[List[int]]) -> int:',
      js: 'function minimumTotal(triangle) {',
      java: 'public int minimumTotal(List<List<Integer>> triangle) {',
      cpp: 'int minimumTotal(vector<vector<int>>& triangle) {',
      go: 'func minimumTotal(triangle [][]int) int {'
    },
    examples: [[[[[1], [2, 3]]], 3], [[[[-5]]], -5], [[[[1], [5, 2], [1, 9, 9]]], 7]],
    hidden: [[[[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], 11], [[[[0], [0, 0], [0, 0, 0]]], 0], [[[[-1], [2, 3], [1, -1, -3]]], -1], [[[[5], [9, 6], [4, 6, 8], [0, 7, 1, 5]]], 18], [[[[1], [1, 1], [1, 1, 1], [1, 1, 1, 1]]], 4]],
    ref: function (triangle) {
      const d = triangle[triangle.length - 1].slice();
      for (let r = triangle.length - 2; r >= 0; r--) for (let j = 0; j <= r; j++) d[j] = triangle[r][j] + Math.min(d[j], d[j + 1]);
      return d[0];
    }
  },
  'maximal-square': {
    fn: 'maximalSquare', params: ['matrix'], cmp: 'exact', meta: ['Maximal Square', 221, 'Medium', 'Dynamic Programming'],
    ask: 'matrix holds "0" and "1". Return the area of the largest square made only of "1" cells.',
    sig: {
      py: 'def maximalSquare(matrix: List[List[str]]) -> int:',
      js: 'function maximalSquare(matrix) {',
      java: 'public int maximalSquare(char[][] matrix) {',
      cpp: 'int maximalSquare(vector<vector<char>>& matrix) {',
      go: 'func maximalSquare(matrix [][]byte) int {'
    },
    examples: [[[[['1', '1'], ['1', '1']]], 4], [[[['0']]], 0], [[[['1', '0', '1'], ['1', '1', '1'], ['0', '1', '1']]], 4]],
    hidden: [[[[['1']]], 1], [[[['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]], 4], [[[['1', '1', '1'], ['1', '1', '1'], ['1', '1', '1']]], 9], [[[['0', '1', '1', '0'], ['1', '1', '1', '1'], ['1', '1', '1', '1'], ['0', '1', '1', '0']]], 4], [[[['1', '0', '1', '0'], ['0', '1', '0', '1']]], 1]],
    ref: function (matrix) {
      const C = matrix[0].length, d = new Array(C + 1).fill(0); let best = 0;
      for (const row of matrix) {
        let diag = 0;
        for (let c = 1; c <= C; c++) {
          const up = d[c];
          d[c] = row[c - 1] === '1' ? Math.min(d[c], d[c - 1], diag) + 1 : 0;
          diag = up; best = Math.max(best, d[c]);
        }
      }
      return best * best;
    }
  },
  'palindromic-substrings': {
    fn: 'countSubstrings', params: ['s'], cmp: 'exact', meta: ['Palindromic Substrings', 647, 'Medium', 'Dynamic Programming'],
    ask: 'Count the stretches of s that read the same both ways. Stretches at different positions count separately, even if they hold the same letters.',
    sig: {
      py: 'def countSubstrings(s: str) -> int:',
      js: 'function countSubstrings(s) {',
      java: 'public int countSubstrings(String s) {',
      cpp: 'int countSubstrings(string s) {',
      go: 'func countSubstrings(s string) int {'
    },
    examples: [[['aa'], 3], [['xyz'], 3], [['aba'], 4]],
    hidden: [[['a'], 1], [['aaaa'], 10], [['abba'], 6], [['racecar'], 10], [['abcbaab'], 11]],
    ref: function (s) {
      let n = 0;
      for (let c = 0; c < s.length; c++) for (const [l0, r0] of [[c, c], [c, c + 1]]) { let l = l0, r = r0; while (l >= 0 && r < s.length && s[l] === s[r]) { n++; l--; r++; } }
      return n;
    }
  },
  'longest-palindromic-subsequence': {
    fn: 'longestPalindromeSubseq', params: ['s'], cmp: 'exact', meta: ['Longest Palindromic Subsequence', 516, 'Medium', 'Dynamic Programming'],
    ask: 'Delete any letters of s (keeping the order of the rest) so that what is left reads the same both ways. Return the longest length you can keep.',
    sig: {
      py: 'def longestPalindromeSubseq(s: str) -> int:',
      js: 'function longestPalindromeSubseq(s) {',
      java: 'public int longestPalindromeSubseq(String s) {',
      cpp: 'int longestPalindromeSubseq(string s) {',
      go: 'func longestPalindromeSubseq(s string) int {'
    },
    examples: [[['character'], 5], [['ab'], 1], [['bbbb'], 4]],
    hidden: [[['a'], 1], [['agbdba'], 5], [['abcdef'], 1], [['rotavatorbanana'], 9], [['aabaa'], 5]],
    ref: function (s) {
      const n = s.length, d = Array.from({ length: n }, () => new Array(n).fill(0));
      for (let i = n - 1; i >= 0; i--) { d[i][i] = 1; for (let j = i + 1; j < n; j++) d[i][j] = s[i] === s[j] ? d[i + 1][j - 1] + 2 : Math.max(d[i + 1][j], d[i][j - 1]); }
      return d[0][n - 1];
    }
  },
  'delete-operation-for-two-strings': {
    fn: 'minDistance', params: ['word1', 'word2'], cmp: 'exact', meta: ['Delete Operation for Two Strings', 583, 'Medium', 'Dynamic Programming'],
    ask: 'One step deletes one letter from either word. Return the fewest steps that make the two words equal.',
    sig: {
      py: 'def minDistance(word1: str, word2: str) -> int:',
      js: 'function minDistance(word1, word2) {',
      java: 'public int minDistance(String word1, String word2) {',
      cpp: 'int minDistance(string word1, string word2) {',
      go: 'func minDistance(word1 string, word2 string) int {'
    },
    examples: [[['eat', 'tea'], 2], [['abc', 'abc'], 0], [['a', 'b'], 2]],
    hidden: [[['', 'abc'], 3], [['sea', 'eat'], 2], [['leetcode', 'etco'], 4], [['abcdef', 'fedcba'], 10], [['park', 'spake'], 3]],
    ref: function (word1, word2) {
      const m = word1.length, n = word2.length, d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = word1[i - 1] === word2[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);
      return m + n - 2 * d[m][n];
    }
  },
  'interleaving-string': {
    fn: 'isInterleave', params: ['s1', 's2', 's3'], cmp: 'exact', meta: ['Interleaving String', 97, 'Medium', 'Dynamic Programming'],
    ask: 'Return true if s3 can be made by weaving s1 and s2 together: every letter of both is used once, and each keeps its own order.',
    sig: {
      py: 'def isInterleave(s1: str, s2: str, s3: str) -> bool:',
      js: 'function isInterleave(s1, s2, s3) {',
      java: 'public boolean isInterleave(String s1, String s2, String s3) {',
      cpp: 'bool isInterleave(string s1, string s2, string s3) {',
      go: 'func isInterleave(s1 string, s2 string, s3 string) bool {'
    },
    examples: [[['ab', 'cd', 'acbd'], true], [['ab', 'cd', 'abdc'], false], [['', '', ''], true]],
    hidden: [[['a', '', 'a'], true], [['abc', 'abc', 'aabbcc'], true], [['aa', 'ab', 'abaa'], true], [['ab', 'ba', 'abba'], true], [['xyz', 'w', 'xyzwq'], false]],
    ref: function (s1, s2, s3) {
      const m = s1.length, n = s2.length;
      if (m + n !== s3.length) return false;
      const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false)); d[0][0] = true;
      for (let i = 0; i <= m; i++) for (let j = 0; j <= n; j++) {
        if (i && s1[i - 1] === s3[i + j - 1] && d[i - 1][j]) d[i][j] = true;
        if (j && s2[j - 1] === s3[i + j - 1] && d[i][j - 1]) d[i][j] = true;
      }
      return d[m][n];
    }
  },
  'target-sum': {
    fn: 'findTargetSumWays', params: ['nums', 'target'], cmp: 'exact', meta: ['Target Sum', 494, 'Medium', 'Dynamic Programming'],
    ask: 'Put a + or a - in front of every number in nums and add them all up. Return how many sign choices give exactly target.',
    sig: {
      py: 'def findTargetSumWays(nums: List[int], target: int) -> int:',
      js: 'function findTargetSumWays(nums, target) {',
      java: 'public int findTargetSumWays(int[] nums, int target) {',
      cpp: 'int findTargetSumWays(vector<int>& nums, int target) {',
      go: 'func findTargetSumWays(nums []int, target int) int {'
    },
    examples: [[[[1, 2], 1], 1], [[[1, 1, 1], 1], 3], [[[3], 2], 0]],
    hidden: [[[[0], 0], 2], [[[0, 0, 1], 1], 4], [[[2, 3, 5, 7], 1], 1], [[[1, 2, 3, 4, 5], 3], 3], [[[10, 20], -30], 1]],
    ref: function (nums, target) {
      let ways = new Map([[0, 1]]);
      for (const x of nums) {
        const next = new Map();
        for (const [s, c] of ways) for (const t of [s + x, s - x]) next.set(t, (next.get(t) || 0) + c);
        ways = next;
      }
      return ways.get(target) || 0;
    }
  },
  'last-stone-weight-ii': {
    fn: 'lastStoneWeightII', params: ['stones'], cmp: 'exact', meta: ['Last Stone Weight II', 1049, 'Medium', 'Dynamic Programming'],
    ask: 'Smash any two stones x <= y: both vanish if equal, otherwise one stone of weight y - x remains. Keep going until at most one stone is left. Return the smallest weight that can be left (0 if none).',
    sig: {
      py: 'def lastStoneWeightII(stones: List[int]) -> int:',
      js: 'function lastStoneWeightII(stones) {',
      java: 'public int lastStoneWeightII(int[] stones) {',
      cpp: 'int lastStoneWeightII(vector<int>& stones) {',
      go: 'func lastStoneWeightII(stones []int) int {'
    },
    examples: [[[[3, 5]], 2], [[[4, 4]], 0], [[[1, 2, 4]], 1]],
    hidden: [[[[7]], 7], [[[2, 7, 4, 1, 8, 1]], 1], [[[31, 26, 33, 21, 40]], 5], [[[1, 1, 1, 1]], 0], [[[10, 3, 3]], 4]],
    ref: function (stones) {
      const total = stones.reduce((a, b) => a + b, 0), can = new Array((total >> 1) + 1).fill(false); can[0] = true;
      for (const s of stones) for (let w = can.length - 1; w >= s; w--) if (can[w - s]) can[w] = true;
      for (let w = can.length - 1; w >= 0; w--) if (can[w]) return total - 2 * w;
      return total;
    }
  },
  'maximum-length-of-pair-chain': {
    fn: 'findLongestChain', params: ['pairs'], cmp: 'exact', meta: ['Maximum Length of Pair Chain', 646, 'Medium', 'Dynamic Programming'],
    ask: 'Pair [c, d] can follow pair [a, b] when b < c. Using pairs in any order, return the length of the longest chain you can build.',
    sig: {
      py: 'def findLongestChain(pairs: List[List[int]]) -> int:',
      js: 'function findLongestChain(pairs) {',
      java: 'public int findLongestChain(int[][] pairs) {',
      cpp: 'int findLongestChain(vector<vector<int>>& pairs) {',
      go: 'func findLongestChain(pairs [][]int) int {'
    },
    examples: [[[[[1, 2], [3, 4], [5, 6]]], 3], [[[[1, 5], [2, 3], [4, 6]]], 2], [[[[0, 1]]], 1]],
    hidden: [[[[[1, 2], [2, 3]]], 1], [[[[-10, -8], [8, 9], [-5, 0], [6, 10], [-6, -4], [1, 7], [9, 10], [-4, 7]]], 4], [[[[1, 10], [2, 3], [4, 5], [6, 7]]], 3], [[[[5, 6], [1, 2], [3, 4]]], 3], [[[[1, 1], [1, 1]]], 1]],
    ref: function (pairs) {
      const p = pairs.slice().sort((a, b) => a[1] - b[1]); let end = -Infinity, n = 0;
      for (const [a, b] of p) if (a > end) { n++; end = b; }
      return n;
    }
  },
  'longest-string-chain': {
    fn: 'longestStrChain', params: ['words'], cmp: 'exact', meta: ['Longest String Chain', 1048, 'Medium', 'Dynamic Programming'],
    ask: 'Word a comes before word b in a chain if adding exactly one letter anywhere in a gives b. Return the length of the longest chain you can build from words.',
    sig: {
      py: 'def longestStrChain(words: List[str]) -> int:',
      js: 'function longestStrChain(words) {',
      java: 'public int longestStrChain(String[] words) {',
      cpp: 'int longestStrChain(vector<string>& words) {',
      go: 'func longestStrChain(words []string) int {'
    },
    examples: [[[['a', 'ab', 'abc']], 3], [[['x', 'yz']], 1], [[['ba', 'a', 'bca', 'b']], 3]],
    hidden: [[[['solo']], 1], [[['xbc', 'pcxbcf', 'xb', 'cxbc', 'pcxbc']], 5], [[['a', 'b', 'ab', 'bac', 'bacd', 'z']], 2], [[['abcd', 'dbqca']], 1], [[['k', 'ka', 'kab', 'kabc', 'akabc', 'qq']], 5]],
    ref: function (words) {
      const w = words.slice().sort((a, b) => a.length - b.length), best = new Map(); let top = 0;
      for (const x of w) {
        let b = 1;
        for (let i = 0; i < x.length; i++) { const p = x.slice(0, i) + x.slice(i + 1); if (best.has(p)) b = Math.max(b, best.get(p) + 1); }
        best.set(x, b); top = Math.max(top, b);
      }
      return top;
    }
  },
  'number-of-longest-increasing-subsequence': {
    fn: 'findNumberOfLIS', params: ['nums'], cmp: 'exact', meta: ['Number of Longest Increasing Subsequence', 673, 'Medium', 'Dynamic Programming'],
    ask: 'Return how many strictly increasing subsequences of nums have the greatest possible length.',
    sig: {
      py: 'def findNumberOfLIS(nums: List[int]) -> int:',
      js: 'function findNumberOfLIS(nums) {',
      java: 'public int findNumberOfLIS(int[] nums) {',
      cpp: 'int findNumberOfLIS(vector<int>& nums) {',
      go: 'func findNumberOfLIS(nums []int) int {'
    },
    examples: [[[[1, 2, 4, 3]], 2], [[[5, 5]], 2], [[[3]], 1]],
    hidden: [[[[1, 3, 5, 4, 7]], 2], [[[2, 2, 2, 2, 2]], 5], [[[1, 2, 3, 1, 2, 3]], 4], [[[5, 4, 3, 2, 1]], 5], [[[1, 1, 2, 2, 3]], 4]],
    ref: function (nums) {
      const n = nums.length, len = new Array(n).fill(1), cnt = new Array(n).fill(1);
      for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) if (nums[j] < nums[i]) {
        if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; } else if (len[j] + 1 === len[i]) cnt[i] += cnt[j];
      }
      const top = Math.max(...len);
      return cnt.reduce((s, c, i) => s + (len[i] === top ? c : 0), 0);
    }
  },
  'russian-doll-envelopes': {
    fn: 'maxEnvelopes', params: ['envelopes'], cmp: 'exact', meta: ['Russian Doll Envelopes', 354, 'Hard', 'Dynamic Programming'],
    ask: 'An envelope [w, h] fits inside another if both its width and its height are strictly smaller. No rotating. Return the most envelopes you can nest one inside another. O(n log n) is possible.',
    sig: {
      py: 'def maxEnvelopes(envelopes: List[List[int]]) -> int:',
      js: 'function maxEnvelopes(envelopes) {',
      java: 'public int maxEnvelopes(int[][] envelopes) {',
      cpp: 'int maxEnvelopes(vector<vector<int>>& envelopes) {',
      go: 'func maxEnvelopes(envelopes [][]int) int {'
    },
    examples: [[[[[1, 1], [2, 2], [3, 3]]], 3], [[[[2, 3], [2, 4]]], 1], [[[[4, 5], [6, 7], [2, 3], [5, 4]]], 3]],
    hidden: [[[[[1, 1]]], 1], [[[[5, 4], [6, 4], [6, 7], [2, 3]]], 3], [[[[1, 1], [1, 1], [1, 1]]], 1], [[[[4, 5], [4, 6], [6, 7], [2, 3], [1, 1]]], 4], [[[[10, 8], [1, 12], [6, 15], [2, 18]]], 2]],
    ref: function (envelopes) {
      const e = envelopes.slice().sort((a, b) => a[0] - b[0] || b[1] - a[1]), tails = [];
      for (const [, h] of e) {
        let lo = 0, hi = tails.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < h) lo = m + 1; else hi = m; }
        tails[lo] = h;
      }
      return tails.length;
    }
  },
  'distinct-subsequences': {
    fn: 'numDistinct', params: ['s', 't'], cmp: 'exact', meta: ['Distinct Subsequences', 115, 'Hard', 'Dynamic Programming'],
    ask: 'Return how many different ways you can delete letters from s so that what is left equals t (ways differ when they keep different positions).',
    sig: {
      py: 'def numDistinct(s: str, t: str) -> int:',
      js: 'function numDistinct(s, t) {',
      java: 'public int numDistinct(String s, String t) {',
      cpp: 'int numDistinct(string s, string t) {',
      go: 'func numDistinct(s string, t string) int {'
    },
    examples: [[['aab', 'ab'], 2], [['abc', 'd'], 0], [['xx', 'x'], 2]],
    hidden: [[['a', 'a'], 1], [['rabbbit', 'rabbit'], 3], [['babgbag', 'bag'], 5], [['aaaa', 'aa'], 6], [['abc', 'abcd'], 0]],
    ref: function (s, t) {
      const d = new Array(t.length + 1).fill(0); d[0] = 1;
      for (const c of s) for (let j = t.length; j >= 1; j--) if (t[j - 1] === c) d[j] += d[j - 1];
      return d[t.length];
    }
  },
  'length-of-last-word': {
    fn: 'lengthOfLastWord', params: ['s'], cmp: 'exact', meta: ['Length of Last Word', 58, 'Easy', 'String Algorithms'],
    ask: 's holds words and spaces, with at least one word. Return the length of the last word.',
    sig: {
      py: 'def lengthOfLastWord(s: str) -> int:',
      js: 'function lengthOfLastWord(s) {',
      java: 'public int lengthOfLastWord(String s) {',
      cpp: 'int lengthOfLastWord(string s) {',
      go: 'func lengthOfLastWord(s string) int {'
    },
    examples: [[['hi there'], 5], [['  moon   '], 4], [['a'], 1]],
    hidden: [[['word'], 4], [['ends with space '], 5], [['   x'], 1], [['many   spaces   between'], 7], [['ab cd ef ghi'], 3]],
    ref: function (s) { const w = s.trim().split(' '); return w[w.length - 1].length; }
  },
  'find-the-index-of-the-first-occurrence-in-a-string': {
    fn: 'strStr', params: ['haystack', 'needle'], cmp: 'exact', meta: ['Find the Index of the First Occurrence in a String', 28, 'Easy', 'String Algorithms'],
    ask: 'Return the index where needle first appears inside haystack, or -1 if it never does.',
    sig: {
      py: 'def strStr(haystack: str, needle: str) -> int:',
      js: 'function strStr(haystack, needle) {',
      java: 'public int strStr(String haystack, String needle) {',
      cpp: 'int strStr(string haystack, string needle) {',
      go: 'func strStr(haystack string, needle string) int {'
    },
    examples: [[['banana', 'nan'], 2], [['abc', 'd'], -1], [['aaa', 'aaa'], 0]],
    hidden: [[['a', 'a'], 0], [['short', 'longer'], -1], [['mississippi', 'issip'], 4], [['aaaab', 'aab'], 2], [['abcabc', 'cab'], 2]],
    ref: function (haystack, needle) { return haystack.indexOf(needle); }
  },
  'reverse-words-in-a-string': {
    fn: 'reverseWords', params: ['s'], cmp: 'exact', meta: ['Reverse Words in a String', 151, 'Medium', 'String Algorithms'],
    ask: 'Return the words of s in reverse order, joined by single spaces, with no spaces at the start or end. s may have extra spaces anywhere.',
    sig: {
      py: 'def reverseWords(s: str) -> str:',
      js: 'function reverseWords(s) {',
      java: 'public String reverseWords(String s) {',
      cpp: 'string reverseWords(string s) {',
      go: 'func reverseWords(s string) string {'
    },
    examples: [[['one two'], 'two one'], [['  a   b  '], 'b a'], [['solo'], 'solo']],
    hidden: [[['the sky is blue'], 'blue is sky the'], [['  lead  '], 'lead'], [['x y z'], 'z y x'], [['Hello,  World!'], 'World! Hello,'], [['  1 22 333 '], '333 22 1']],
    ref: function (s) { return s.trim().split(/ +/).reverse().join(' '); }
  },
  'string-to-integer-atoi': {
    fn: 'myAtoi', params: ['s'], cmp: 'exact', meta: ['String to Integer (atoi)', 8, 'Medium', 'String Algorithms'],
    ask: 'Skip leading spaces, read an optional + or - sign, then read digits until the first non-digit. Return the number, clamped to the 32-bit range [-2147483648, 2147483647], or 0 if no digits were read.',
    sig: {
      py: 'def myAtoi(s: str) -> int:',
      js: 'function myAtoi(s) {',
      java: 'public int myAtoi(String s) {',
      cpp: 'int myAtoi(string s) {',
      go: 'func myAtoi(s string) int {'
    },
    examples: [[['  -17x'], -17], [['words 9'], 0], [['99999999999'], 2147483647]],
    hidden: [[[''], 0], [['+'], 0], [['+0042'], 42], [['-2147483649'], -2147483648], [['   -0012a42'], -12], [['3.99'], 3], [['- 5'], 0]],
    ref: function (s) {
      let i = 0, sign = 1, n = 0;
      while (s[i] === ' ') i++;
      if (s[i] === '+' || s[i] === '-') { if (s[i] === '-') sign = -1; i++; }
      while (i < s.length && s[i] >= '0' && s[i] <= '9') { n = n * 10 + Number(s[i]); if (n > 2147483648) break; i++; }
      return Math.max(-2147483648, Math.min(2147483647, sign * n)) || 0;
    }
  },
  'zigzag-conversion': {
    fn: 'convert', params: ['s', 'numRows'], cmp: 'exact', meta: ['Zigzag Conversion', 6, 'Medium', 'String Algorithms'],
    ask: 'Write s in a zigzag over numRows rows: down the rows, then diagonally back up, and repeat. Return the rows read one after another.',
    sig: {
      py: 'def convert(s: str, numRows: int) -> str:',
      js: 'function convert(s, numRows) {',
      java: 'public String convert(String s, int numRows) {',
      cpp: 'string convert(string s, int numRows) {',
      go: 'func convert(s string, numRows int) string {'
    },
    examples: [[['ABCDE', 2], 'ACEBD'], [['XY', 1], 'XY'], [['ABCDEFG', 3], 'AEBDFCG']],
    hidden: [[['A', 3], 'A'], [['ABCD', 4], 'ABCD'], [['ABCD', 9], 'ABCD'], [['PAYPALISHIRING', 4], 'PINALSIGYAHRPI'], [['ABCDEFGHIJ', 3], 'AEIBDFHJCG']],
    ref: function (s, numRows) {
      if (numRows === 1) return s;
      const rows = new Array(numRows).fill(''); let r = 0, step = 1;
      for (const c of s) { rows[r] += c; if (r === 0) step = 1; else if (r === numRows - 1) step = -1; r += step; }
      return rows.join('');
    }
  },
  'rotate-string': {
    fn: 'rotateString', params: ['s', 'goal'], cmp: 'exact', meta: ['Rotate String', 796, 'Easy', 'String Algorithms'],
    ask: 'A shift moves the first letter of s to the end. Return true if some number of shifts turns s into goal.',
    sig: {
      py: 'def rotateString(s: str, goal: str) -> bool:',
      js: 'function rotateString(s, goal) {',
      java: 'public boolean rotateString(String s, String goal) {',
      cpp: 'bool rotateString(string s, string goal) {',
      go: 'func rotateString(s string, goal string) bool {'
    },
    examples: [[['abcd', 'cdab'], true], [['abc', 'acb'], false], [['a', 'a'], true]],
    hidden: [[['ab', 'abc'], false], [['aa', 'aa'], true], [['waterbottle', 'erbottlewat'], true], [['abab', 'baba'], true], [['abcde', 'abced'], false]],
    ref: function (s, goal) { return s.length === goal.length && (s + s).includes(goal); }
  },
  'repeated-substring-pattern': {
    fn: 'repeatedSubstringPattern', params: ['s'], cmp: 'exact', meta: ['Repeated Substring Pattern', 459, 'Easy', 'String Algorithms'],
    ask: 'Return true if s is some shorter piece repeated two or more times.',
    sig: {
      py: 'def repeatedSubstringPattern(s: str) -> bool:',
      js: 'function repeatedSubstringPattern(s) {',
      java: 'public boolean repeatedSubstringPattern(String s) {',
      cpp: 'bool repeatedSubstringPattern(string s) {',
      go: 'func repeatedSubstringPattern(s string) bool {'
    },
    examples: [[['xyxy'], true], [['xyx'], false], [['zzzz'], true]],
    hidden: [[['a'], false], [['ab'], false], [['abcabcabc'], true], [['abcab'], false], [['abaababaab'], true]],
    ref: function (s) { return (s + s).slice(1, -1).includes(s); }
  },
  'fizz-buzz': {
    fn: 'fizzBuzz', params: ['n'], cmp: 'exact', meta: ['Fizz Buzz', 412, 'Easy', 'Math'],
    ask: 'Return the numbers 1 to n as strings, but write "Fizz" for multiples of 3, "Buzz" for multiples of 5 and "FizzBuzz" for multiples of both.',
    sig: {
      py: 'def fizzBuzz(n: int) -> List[str]:',
      js: 'function fizzBuzz(n) {',
      java: 'public List<String> fizzBuzz(int n) {',
      cpp: 'vector<string> fizzBuzz(int n) {',
      go: 'func fizzBuzz(n int) []string {'
    },
    examples: [[[3], ['1', '2', 'Fizz']], [[5], ['1', '2', 'Fizz', '4', 'Buzz']], [[1], ['1']]],
    hidden: [[[2], ['1', '2']], [[15], ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']], [[16], ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16']], [[30], ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16', '17', 'Fizz', '19', 'Buzz', 'Fizz', '22', '23', 'Fizz', 'Buzz', '26', 'Fizz', '28', '29', 'FizzBuzz']], [[10], ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz']]],
    ref: function (n) { const out = []; for (let i = 1; i <= n; i++) out.push(i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : String(i)); return out; }
  },
  'plus-one': {
    fn: 'plusOne', params: ['digits'], cmp: 'exact', meta: ['Plus One', 66, 'Easy', 'Math'],
    ask: 'digits is a non-negative number written one digit per element, most significant first, with no leading zeros. Return the digits of that number plus one.',
    sig: {
      py: 'def plusOne(digits: List[int]) -> List[int]:',
      js: 'function plusOne(digits) {',
      java: 'public int[] plusOne(int[] digits) {',
      cpp: 'vector<int> plusOne(vector<int>& digits) {',
      go: 'func plusOne(digits []int) []int {'
    },
    examples: [[[[1, 9]], [2, 0]], [[[9]], [1, 0]], [[[4, 0, 4]], [4, 0, 5]]],
    hidden: [[[[0]], [1]], [[[9, 9, 9]], [1, 0, 0, 0]], [[[1, 2, 3]], [1, 2, 4]], [[[8, 9, 9, 9]], [9, 0, 0, 0]], [[[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]]],
    ref: function (digits) {
      const d = digits.slice();
      for (let i = d.length - 1; i >= 0; i--) { if (d[i] < 9) { d[i]++; return d; } d[i] = 0; }
      return [1].concat(d);
    }
  },
  'roman-to-integer': {
    fn: 'romanToInt', params: ['s'], cmp: 'exact', meta: ['Roman to Integer', 13, 'Easy', 'Math'],
    ask: 's is a Roman numeral (I 1, V 5, X 10, L 50, C 100, D 500, M 1000; a smaller symbol before a bigger one is subtracted, as in IV or CM). Return its value.',
    sig: {
      py: 'def romanToInt(s: str) -> int:',
      js: 'function romanToInt(s) {',
      java: 'public int romanToInt(String s) {',
      cpp: 'int romanToInt(string s) {',
      go: 'func romanToInt(s string) int {'
    },
    examples: [[['XIV'], 14], [['CDXLIV'], 444], [['MMXXVI'], 2026]],
    hidden: [[['I'], 1], [['III'], 3], [['XCIX'], 99], [['MCMLXXXIV'], 1984], [['MMMCMXCIX'], 3999]],
    ref: function (s) {
      const v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }; let n = 0;
      for (let i = 0; i < s.length; i++) n += v[s[i]] < (v[s[i + 1]] || 0) ? -v[s[i]] : v[s[i]];
      return n;
    }
  },
  'integer-to-roman': {
    fn: 'intToRoman', params: ['num'], cmp: 'exact', meta: ['Integer to Roman', 12, 'Medium', 'Math'],
    ask: 'Write num (1 to 3999) as a Roman numeral, using the subtractive forms IV, IX, XL, XC, CD and CM.',
    sig: {
      py: 'def intToRoman(num: int) -> str:',
      js: 'function intToRoman(num) {',
      java: 'public String intToRoman(int num) {',
      cpp: 'string intToRoman(int num) {',
      go: 'func intToRoman(num int) string {'
    },
    examples: [[[14], 'XIV'], [[444], 'CDXLIV'], [[2026], 'MMXXVI']],
    hidden: [[[1], 'I'], [[9], 'IX'], [[40], 'XL'], [[1994], 'MCMXCIV'], [[3999], 'MMMCMXCIX'], [[888], 'DCCCLXXXVIII']],
    ref: function (num) {
      const t = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
      let out = '';
      for (const [v, r] of t) while (num >= v) { out += r; num -= v; }
      return out;
    }
  },
  'reverse-integer': {
    fn: 'reverse', params: ['x'], cmp: 'exact', meta: ['Reverse Integer', 7, 'Medium', 'Math'],
    ask: 'Return x with its digits reversed, keeping the sign. If the result falls outside the 32-bit range [-2147483648, 2147483647], return 0.',
    sig: {
      py: 'def reverse(x: int) -> int:',
      js: 'function reverse(x) {',
      java: 'public int reverse(int x) {',
      cpp: 'int reverse(int x) {',
      go: 'func reverse(x int) int {'
    },
    examples: [[[-305], -503], [[1200], 21], [[1563847412], 0]],
    hidden: [[[0], 0], [[7], 7], [[-2147483648], 0], [[1463847412], 2147483641], [[-120], -21]],
    ref: function (x) {
      const r = Number(String(Math.abs(x)).split('').reverse().join('')) * Math.sign(x);
      return r < -2147483648 || r > 2147483647 ? 0 : r || 0;
    }
  },
  'excel-sheet-column-number': {
    fn: 'titleToNumber', params: ['columnTitle'], cmp: 'exact', meta: ['Excel Sheet Column Number', 171, 'Easy', 'Math'],
    ask: 'Spreadsheet columns are named A, B, ..., Z, AA, AB, ..., AZ, BA, and so on. Return the column number (A is 1) for columnTitle.',
    sig: {
      py: 'def titleToNumber(columnTitle: str) -> int:',
      js: 'function titleToNumber(columnTitle) {',
      java: 'public int titleToNumber(String columnTitle) {',
      cpp: 'int titleToNumber(string columnTitle) {',
      go: 'func titleToNumber(columnTitle string) int {'
    },
    examples: [[['C'], 3], [['AB'], 28], [['ZZ'], 702]],
    hidden: [[['A'], 1], [['Z'], 26], [['AA'], 27], [['AAA'], 703], [['FXSHRXW'], 2147483647]],
    ref: function (columnTitle) { let n = 0; for (const c of columnTitle) n = n * 26 + c.charCodeAt(0) - 64; return n; }
  },
  'excel-sheet-column-title': {
    fn: 'convertToTitle', params: ['columnNumber'], cmp: 'exact', meta: ['Excel Sheet Column Title', 168, 'Easy', 'Math'],
    ask: 'Spreadsheet columns are named A, B, ..., Z, AA, AB, ..., AZ, BA, and so on, with A as column 1. Return the name of column columnNumber.',
    sig: {
      py: 'def convertToTitle(columnNumber: int) -> str:',
      js: 'function convertToTitle(columnNumber) {',
      java: 'public String convertToTitle(int columnNumber) {',
      cpp: 'string convertToTitle(int columnNumber) {',
      go: 'func convertToTitle(columnNumber int) string {'
    },
    examples: [[[3], 'C'], [[52], 'AZ'], [[702], 'ZZ']],
    hidden: [[[1], 'A'], [[26], 'Z'], [[27], 'AA'], [[703], 'AAA'], [[2147483647], 'FXSHRXW']],
    ref: function (columnNumber) {
      let s = '', n = columnNumber;
      while (n > 0) { n--; s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26); }
      return s;
    }
  },
  'count-primes': {
    fn: 'countPrimes', params: ['n'], cmp: 'exact', meta: ['Count Primes', 204, 'Medium', 'Math'],
    ask: 'Return how many prime numbers are strictly less than n.',
    sig: {
      py: 'def countPrimes(n: int) -> int:',
      js: 'function countPrimes(n) {',
      java: 'public int countPrimes(int n) {',
      cpp: 'int countPrimes(int n) {',
      go: 'func countPrimes(n int) int {'
    },
    examples: [[[12], 5], [[2], 0], [[3], 1]],
    hidden: [[[0], 0], [[1], 0], [[100], 25], [[1000], 168], [[100000], 9592]],
    ref: function (n) {
      if (n < 3) return 0;
      const comp = new Uint8Array(n); let c = 0;
      for (let i = 2; i < n; i++) { if (comp[i]) continue; c++; for (let j = i * i; j < n; j += i) comp[j] = 1; }
      return c;
    }
  },
  'multiply-strings': {
    fn: 'multiply', params: ['num1', 'num2'], cmp: 'exact', meta: ['Multiply Strings', 43, 'Medium', 'Math'],
    ask: 'num1 and num2 are non-negative integers written as strings, possibly very long. Return their product as a string, without turning them into built-in big numbers.',
    sig: {
      py: 'def multiply(num1: str, num2: str) -> str:',
      js: 'function multiply(num1, num2) {',
      java: 'public String multiply(String num1, String num2) {',
      cpp: 'string multiply(string num1, string num2) {',
      go: 'func multiply(num1 string, num2 string) string {'
    },
    examples: [[['12', '34'], '408'], [['0', '999'], '0'], [['99', '99'], '9801']],
    hidden: [[['1', '1'], '1'], [['123456789', '987654321'], '121932631112635269'], [['10', '10'], '100'], [['999999999999', '999999999999'], '999999999998000000000001'], [['7', '0'], '0']],
    ref: function (num1, num2) {
      const out = new Array(num1.length + num2.length).fill(0);
      for (let i = num1.length - 1; i >= 0; i--) for (let j = num2.length - 1; j >= 0; j--) {
        const p = Number(num1[i]) * Number(num2[j]) + out[i + j + 1];
        out[i + j + 1] = p % 10; out[i + j] += Math.floor(p / 10);
      }
      const s = out.join('').replace(/^0+/, '');
      return s || '0';
    }
  },
  'add-digits': {
    fn: 'addDigits', params: ['num'], cmp: 'exact', meta: ['Add Digits', 258, 'Easy', 'Math'],
    ask: 'Keep adding up the digits of num until a single digit is left, and return it. O(1) is possible.',
    sig: {
      py: 'def addDigits(num: int) -> int:',
      js: 'function addDigits(num) {',
      java: 'public int addDigits(int num) {',
      cpp: 'int addDigits(int num) {',
      go: 'func addDigits(num int) int {'
    },
    examples: [[[47], 2], [[0], 0], [[9], 9]],
    hidden: [[[10], 1], [[18], 9], [[99999], 9], [[123456789], 9], [[2147483647], 1]],
    ref: function (num) { return num === 0 ? 0 : 1 + ((num - 1) % 9); }
  },
  'greatest-common-divisor-of-strings': {
    fn: 'gcdOfStrings', params: ['str1', 'str2'], cmp: 'exact', meta: ['Greatest Common Divisor of Strings', 1071, 'Easy', 'Math'],
    ask: 'A string x divides s when s is x repeated one or more times. Return the longest string that divides both str1 and str2, or "" if there is none.',
    sig: {
      py: 'def gcdOfStrings(str1: str, str2: str) -> str:',
      js: 'function gcdOfStrings(str1, str2) {',
      java: 'public String gcdOfStrings(String str1, String str2) {',
      cpp: 'string gcdOfStrings(string str1, string str2) {',
      go: 'func gcdOfStrings(str1 string, str2 string) string {'
    },
    examples: [[['xyxy', 'xy'], 'xy'], [['ab', 'ba'], ''], [['aaaa', 'aa'], 'aa']],
    hidden: [[['a', 'a'], 'a'], [['abcabc', 'abc'], 'abc'], [['abababab', 'abab'], 'abab'], [['aaa', 'aa'], 'a'], [['xyz', 'xyzxy'], '']],
    ref: function (str1, str2) {
      if (str1 + str2 !== str2 + str1) return '';
      let a = str1.length, b = str2.length; while (b) [a, b] = [b, a % b];
      return str1.slice(0, a);
    }
  },
  'number-of-1-bits': {
    fn: 'hammingWeight', params: ['n'], cmp: 'exact', meta: ['Number of 1 Bits', 191, 'Easy', 'Bit Manipulation'],
    ask: 'n is a positive integer. Return how many 1 bits its binary form has.',
    sig: {
      py: 'def hammingWeight(n: int) -> int:',
      js: 'function hammingWeight(n) {',
      java: 'public int hammingWeight(int n) {',
      cpp: 'int hammingWeight(int n) {',
      go: 'func hammingWeight(n int) int {'
    },
    examples: [[[7], 3], [[8], 1], [[255], 8]],
    hidden: [[[1], 1], [[1023], 10], [[1024], 1], [[2147483645], 30], [[43690], 8]],
    ref: function (n) { let c = 0; while (n) { c += n & 1; n = Math.floor(n / 2); } return c; }
  },
  'power-of-two': {
    fn: 'isPowerOfTwo', params: ['n'], cmp: 'exact', meta: ['Power of Two', 231, 'Easy', 'Bit Manipulation'],
    ask: 'Return true if n equals 2 to the power of some whole number x >= 0.',
    sig: {
      py: 'def isPowerOfTwo(n: int) -> bool:',
      js: 'function isPowerOfTwo(n) {',
      java: 'public boolean isPowerOfTwo(int n) {',
      cpp: 'bool isPowerOfTwo(int n) {',
      go: 'func isPowerOfTwo(n int) bool {'
    },
    examples: [[[64], true], [[6], false], [[0], false]],
    hidden: [[[1], true], [[-8], false], [[1073741824], true], [[1073741825], false], [[3], false]],
    ref: function (n) { return n > 0 && (n & (n - 1)) === 0; }
  },
  'hamming-distance': {
    fn: 'hammingDistance', params: ['x', 'y'], cmp: 'exact', meta: ['Hamming Distance', 461, 'Easy', 'Bit Manipulation'],
    ask: 'Return how many bit positions differ between the non-negative integers x and y.',
    sig: {
      py: 'def hammingDistance(x: int, y: int) -> int:',
      js: 'function hammingDistance(x, y) {',
      java: 'public int hammingDistance(int x, int y) {',
      cpp: 'int hammingDistance(int x, int y) {',
      go: 'func hammingDistance(x int, y int) int {'
    },
    examples: [[[5, 2], 3], [[7, 7], 0], [[0, 8], 1]],
    hidden: [[[0, 0], 0], [[1, 4], 2], [[2147483647, 0], 31], [[12, 10], 2], [[255, 256], 9]],
    ref: function (x, y) { let v = x ^ y, c = 0; while (v) { c += v & 1; v >>>= 1; } return c; }
  },
  'find-the-difference': {
    fn: 'findTheDifference', params: ['s', 't'], cmp: 'exact', meta: ['Find the Difference', 389, 'Easy', 'Bit Manipulation'],
    ask: 't is s shuffled with one extra lowercase letter added somewhere. Return the extra letter.',
    sig: {
      py: 'def findTheDifference(s: str, t: str) -> str:',
      js: 'function findTheDifference(s, t) {',
      java: 'public char findTheDifference(String s, String t) {',
      cpp: 'char findTheDifference(string s, string t) {',
      go: 'func findTheDifference(s string, t string) byte {'
    },
    examples: [[['ab', 'bca'], 'c'], [['', 'z'], 'z'], [['aa', 'aaa'], 'a']],
    hidden: [[['xyz', 'zxyw'], 'w'], [['q', 'qq'], 'q'], [['hello', 'ohlelx'], 'x'], [['abcd', 'dcbae'], 'e'], [['mm', 'mnm'], 'n']],
    ref: function (s, t) { let x = 0; for (const c of s + t) x ^= c.charCodeAt(0); return String.fromCharCode(x); }
  },
  'reverse-bits': {
    fn: 'reverseBits', params: ['n'], cmp: 'exact', meta: ['Reverse Bits', 190, 'Easy', 'Bit Manipulation'],
    ask: 'Treat n as an unsigned 32-bit number. Return the unsigned number you get by reversing the order of its 32 bits.',
    sig: {
      py: 'def reverseBits(n: int) -> int:',
      js: 'function reverseBits(n) {',
      java: 'public int reverseBits(int n) {',
      cpp: 'int reverseBits(int n) {',
      go: 'func reverseBits(n int) int {'
    },
    examples: [[[1], 2147483648], [[0], 0], [[6], 1610612736]],
    hidden: [[[2147483648], 1], [[4294967295], 4294967295], [[43261596], 964176192], [[3], 3221225472], [[255], 4278190080]],
    ref: function (n) { let r = 0; for (let i = 0; i < 32; i++) { r = r * 2 + (n % 2); n = Math.floor(n / 2); } return r; }
  },
  'single-number-ii': {
    fn: 'singleNumber', params: ['nums'], cmp: 'exact', meta: ['Single Number II', 137, 'Medium', 'Bit Manipulation'],
    ask: 'Every value in nums appears three times except one, which appears once. Return that one, using O(1) extra space.',
    sig: {
      py: 'def singleNumber(nums: List[int]) -> int:',
      js: 'function singleNumber(nums) {',
      java: 'public int singleNumber(int[] nums) {',
      cpp: 'int singleNumber(vector<int>& nums) {',
      go: 'func singleNumber(nums []int) int {'
    },
    examples: [[[[5, 5, 5, 2]], 2], [[[-1, -1, -1, 7]], 7], [[[9]], 9]],
    hidden: [[[[0, 1, 0, 0]], 1], [[[3, 4, 3, 3, 4, 4, -6]], -6], [[[-2, -2, 1, -2]], 1], [[[2147483647, 1, 1, 1]], 2147483647], [[[8, 6, 8, 6, 8, 6, -2147483648]], -2147483648]],
    ref: function (nums) { let ones = 0, twos = 0; for (const x of nums) { ones = (ones ^ x) & ~twos; twos = (twos ^ x) & ~ones; } return ones; }
  },
  'height-checker': {
    fn: 'heightChecker', params: ['heights'], cmp: 'exact', meta: ['Height Checker', 1051, 'Easy', 'Sorting'],
    ask: 'Students should stand in order of height, shortest first. Return how many positions hold a different height from the sorted line.',
    sig: {
      py: 'def heightChecker(heights: List[int]) -> int:',
      js: 'function heightChecker(heights) {',
      java: 'public int heightChecker(int[] heights) {',
      cpp: 'int heightChecker(vector<int>& heights) {',
      go: 'func heightChecker(heights []int) int {'
    },
    examples: [[[[1, 2, 3]], 0], [[[3, 1, 2]], 3], [[[2, 1, 2]], 2]],
    hidden: [[[[5]], 0], [[[5, 5, 5]], 0], [[[1, 1, 4, 2, 1, 3]], 3], [[[9, 8, 7, 6]], 4], [[[2, 2, 1, 1]], 4]],
    ref: function (heights) { const s = heights.slice().sort((a, b) => a - b); return heights.filter((h, i) => h !== s[i]).length; }
  },
  'relative-sort-array': {
    fn: 'relativeSortArray', params: ['arr1', 'arr2'], cmp: 'exact', meta: ['Relative Sort Array', 1122, 'Easy', 'Sorting'],
    ask: 'arr2 has distinct values, all found in arr1. Sort arr1 so its values follow the order of arr2, and put the values missing from arr2 at the end from small to large.',
    sig: {
      py: 'def relativeSortArray(arr1: List[int], arr2: List[int]) -> List[int]:',
      js: 'function relativeSortArray(arr1, arr2) {',
      java: 'public int[] relativeSortArray(int[] arr1, int[] arr2) {',
      cpp: 'vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {',
      go: 'func relativeSortArray(arr1 []int, arr2 []int) []int {'
    },
    examples: [[[[3, 1, 2, 3, 9, 5], [3, 2]], [3, 3, 2, 1, 5, 9]], [[[4, 4], [4]], [4, 4]], [[[8, 6, 7], [7]], [7, 6, 8]]],
    hidden: [[[[1], [1]], [1]], [[[2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6]], [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19]], [[[10, 9, 8], []], [8, 9, 10]], [[[5, 1, 5, 1], [1, 5]], [1, 1, 5, 5]], [[[0, 7, 0, 3], [3]], [3, 0, 0, 7]]],
    ref: function (arr1, arr2) {
      const rank = new Map(arr2.map((v, i) => [v, i]));
      return arr1.slice().sort((a, b) => {
        const ra = rank.has(a) ? rank.get(a) : Infinity, rb = rank.has(b) ? rank.get(b) : Infinity;
        return ra !== rb ? (ra < rb ? -1 : 1) : a - b;
      });
    }
  },
  'sort-integers-by-the-number-of-1-bits': {
    fn: 'sortByBits', params: ['arr'], cmp: 'exact', meta: ['Sort Integers by The Number of 1 Bits', 1356, 'Easy', 'Sorting'],
    ask: 'Sort arr by how many 1 bits each number has, fewest first; numbers with the same count go from small to large.',
    sig: {
      py: 'def sortByBits(arr: List[int]) -> List[int]:',
      js: 'function sortByBits(arr) {',
      java: 'public int[] sortByBits(int[] arr) {',
      cpp: 'vector<int> sortByBits(vector<int>& arr) {',
      go: 'func sortByBits(arr []int) []int {'
    },
    examples: [[[[3, 4, 1]], [1, 4, 3]], [[[0]], [0]], [[[7, 8, 5]], [8, 5, 7]]],
    hidden: [[[[1, 2, 4, 8]], [1, 2, 4, 8]], [[[10, 100, 1000, 10000]], [10, 100, 10000, 1000]], [[[15, 7, 3, 1, 0]], [0, 1, 3, 7, 15]], [[[2, 3, 5, 6, 9]], [2, 3, 5, 6, 9]], [[[1023, 511, 1024]], [1024, 511, 1023]]],
    ref: function (arr) {
      const bits = (x) => { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
      return arr.slice().sort((a, b) => bits(a) - bits(b) || a - b);
    }
  },
  'custom-sort-string': {
    fn: 'customSortString', params: ['order', 's'], cmp: 'any', meta: ['Custom Sort String', 791, 'Medium', 'Sorting'],
    ask: 'order lists distinct letters. Rearrange s so that letters that appear in order keep that order (x before y in order means every x comes before every y). Letters not in order may go anywhere.',
    sig: {
      py: 'def customSortString(order: str, s: str) -> str:',
      js: 'function customSortString(order, s) {',
      java: 'public String customSortString(String order, String s) {',
      cpp: 'string customSortString(string order, string s) {',
      go: 'func customSortString(order string, s string) string {'
    },
    examples: [[['zyx', 'xyz'], 'zyx'], [['ab', 'bca'], 'abc'], [['q', 'aaa'], 'aaa']],
    hidden: [[['cba', 'abcd'], 'cbad'], [['kqep', 'pekeq'], 'kqeep'], [['a', ''], ''], [['xy', 'yxyx'], 'xxyy'], [['hucw', 'thequickbrownfoxjumpsoverchurchwalls'], 'hhhuuucccwwteqikbronfoxjmpsoverralls']],
    check: function (args, got) {
      const [order, s] = args;
      if (typeof got !== 'string' || got.split('').sort().join('') !== s.split('').sort().join('')) return false;
      let last = -1;
      for (const c of got) { const r = order.indexOf(c); if (r < 0) continue; if (r < last) return false; last = r; }
      return true;
    },
    ref: function (order, s) {
      const rank = (c) => { const r = order.indexOf(c); return r < 0 ? order.length : r; };
      return s.split('').sort((a, b) => rank(a) - rank(b)).join('');
    }
  },
  'h-index': {
    fn: 'hIndex', params: ['citations'], cmp: 'exact', meta: ['H-Index', 274, 'Medium', 'Sorting'],
    ask: 'citations[i] is how often paper i was cited. Return the h-index: the largest h such that at least h papers have h or more citations each.',
    sig: {
      py: 'def hIndex(citations: List[int]) -> int:',
      js: 'function hIndex(citations) {',
      java: 'public int hIndex(int[] citations) {',
      cpp: 'int hIndex(vector<int>& citations) {',
      go: 'func hIndex(citations []int) int {'
    },
    examples: [[[[5, 5, 1]], 2], [[[0, 0]], 0], [[[10]], 1]],
    hidden: [[[[0]], 0], [[[3, 0, 6, 1, 5]], 3], [[[1, 3, 1]], 1], [[[100, 100, 100]], 3], [[[4, 4, 4, 4, 4, 4]], 4]],
    ref: function (citations) {
      const c = citations.slice().sort((a, b) => b - a); let h = 0;
      while (h < c.length && c[h] > h) h++;
      return h;
    }
  },
  'largest-number': {
    fn: 'largestNumber', params: ['nums'], cmp: 'exact', meta: ['Largest Number', 179, 'Medium', 'Sorting'],
    ask: 'Arrange the non-negative integers in nums side by side to form the biggest possible number, and return it as a string (with no leading zeros).',
    sig: {
      py: 'def largestNumber(nums: List[int]) -> str:',
      js: 'function largestNumber(nums) {',
      java: 'public String largestNumber(int[] nums) {',
      cpp: 'string largestNumber(vector<int>& nums) {',
      go: 'func largestNumber(nums []int) string {'
    },
    examples: [[[[5, 50, 56]], '56550'], [[[0, 0]], '0'], [[[12, 121]], '12121']],
    hidden: [[[[1]], '1'], [[[10, 2]], '210'], [[[3, 30, 34, 5, 9]], '9534330'], [[[0, 9, 0]], '900'], [[[824, 938, 1399, 5607, 6973, 5703, 9609, 4398, 8247]], '9609938824824769735703560743981399']],
    ref: function (nums) {
      const s = nums.map(String).sort((a, b) => (b + a > a + b ? 1 : b + a < a + b ? -1 : 0)).join('');
      return s[0] === '0' ? '0' : s;
    }
  },
  'sort-an-array': {
    fn: 'sortArray', params: ['nums'], cmp: 'exact', meta: ['Sort an Array', 912, 'Medium', 'Sorting'],
    ask: 'Return nums sorted from small to large without the language\'s built-in sort, in O(n log n) time.',
    sig: {
      py: 'def sortArray(nums: List[int]) -> List[int]:',
      js: 'function sortArray(nums) {',
      java: 'public int[] sortArray(int[] nums) {',
      cpp: 'vector<int> sortArray(vector<int>& nums) {',
      go: 'func sortArray(nums []int) []int {'
    },
    examples: [[[[3, -1, 2]], [-1, 2, 3]], [[[1]], [1]], [[[4, 4, 0, 4]], [0, 4, 4, 4]]],
    hidden: [[[[2, 1]], [1, 2]], [[[5, 4, 3, 2, 1, 0, -1]], [-1, 0, 1, 2, 3, 4, 5]], [[[7, 7, 7, 7]], [7, 7, 7, 7]], [[[50000, -50000, 0, 1, -1]], [-50000, -1, 0, 1, 50000]], [[[9, 3, 7, 1, 8, 2, 6, 4, 5, 0]], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]],
    ref: function (nums) {
      const sort = (a) => {
        if (a.length < 2) return a;
        const m = a.length >> 1, l = sort(a.slice(0, m)), r = sort(a.slice(m)), out = [];
        let i = 0, j = 0;
        while (i < l.length || j < r.length) out.push(j >= r.length || (i < l.length && l[i] <= r[j]) ? l[i++] : r[j++]);
        return out;
      };
      return sort(nums);
    }
  },
  'design-parking-system': {
    fn: 'ParkingSystem', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Parking System', 1603, 'Easy', 'Design'],
    ask: 'A car park has big, medium and small spaces, given to the constructor. addCar(carType) parks a car of type 1 (big), 2 (medium) or 3 (small) in a space of its own size and returns true, or returns false if that size is full. The first op creates the car park; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class ParkingSystem:', js: 'class ParkingSystem {', java: 'class ParkingSystem {', cpp: 'class ParkingSystem {', go: 'type ParkingSystem struct {' },
    starter: {
      py: 'class ParkingSystem:\n    def __init__(self, big: int, medium: int, small: int):\n        pass\n\n    def addCar(self, carType: int) -> bool:\n        pass\n',
      js: 'class ParkingSystem {\n  constructor(big, medium, small) {\n  }\n  addCar(carType) {\n  }\n}\n',
      java: 'class ParkingSystem {\n    public ParkingSystem(int big, int medium, int small) {\n    }\n    public boolean addCar(int carType) {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass ParkingSystem {\npublic:\n    ParkingSystem(int big, int medium, int small) {\n    }\n    bool addCar(int carType) {\n        return false;\n    }\n};\n',
      go: 'package main\n\ntype ParkingSystem struct {\n}\n\nfunc Constructor(big int, medium int, small int) ParkingSystem {\n    return ParkingSystem{}\n}\n\nfunc (this *ParkingSystem) AddCar(carType int) bool {\n    return false\n}\n'
    },
    examples: [[[['ParkingSystem', 'addCar', 'addCar', 'addCar'], [[1, 0, 2], [1], [1], [3]]], [null, true, false, true]], [[['ParkingSystem', 'addCar'], [[0, 0, 0], [2]]], [null, false]], [[['ParkingSystem', 'addCar', 'addCar', 'addCar'], [[0, 2, 0], [2], [2], [2]]], [null, true, true, false]]],
    hidden: [[[['ParkingSystem', 'addCar', 'addCar', 'addCar'], [[1, 1, 1], [3], [2], [1]]], [null, true, true, true]], [[['ParkingSystem', 'addCar', 'addCar'], [[0, 0, 1], [1], [3]]], [null, false, true]], [[['ParkingSystem', 'addCar', 'addCar', 'addCar', 'addCar'], [[2, 0, 0], [1], [1], [1], [2]]], [null, true, true, false, false]], [[['ParkingSystem', 'addCar'], [[5, 5, 5], [2]]], [null, true]], [[['ParkingSystem', 'addCar', 'addCar', 'addCar'], [[0, 1, 2], [3], [3], [3]]], [null, true, true, false]]],
    ref: class {
      constructor(big, medium, small) { this.left = [0, big, medium, small]; }
      addCar(carType) { if (!this.left[carType]) return false; this.left[carType]--; return true; }
    }
  },
  'number-of-recent-calls': {
    fn: 'RecentCounter', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Number of Recent Calls', 933, 'Easy', 'Design'],
    ask: 'ping(t) records a request at time t (in milliseconds; t only grows) and returns how many requests happened in the window [t - 3000, t], including this one. The first op creates the counter; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class RecentCounter:', js: 'class RecentCounter {', java: 'class RecentCounter {', cpp: 'class RecentCounter {', go: 'type RecentCounter struct {' },
    starter: {
      py: 'class RecentCounter:\n    def __init__(self):\n        pass\n\n    def ping(self, t: int) -> int:\n        pass\n',
      js: 'class RecentCounter {\n  constructor() {\n  }\n  ping(t) {\n  }\n}\n',
      java: 'class RecentCounter {\n    public RecentCounter() {\n    }\n    public int ping(int t) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass RecentCounter {\npublic:\n    RecentCounter() {\n    }\n    int ping(int t) {\n        return 0;\n    }\n};\n',
      go: 'package main\n\ntype RecentCounter struct {\n}\n\nfunc Constructor() RecentCounter {\n    return RecentCounter{}\n}\n\nfunc (this *RecentCounter) Ping(t int) int {\n    return 0\n}\n'
    },
    examples: [[[['RecentCounter', 'ping', 'ping', 'ping'], [[], [10], [2000], [3011]]], [null, 1, 2, 2]], [[['RecentCounter', 'ping'], [[], [5]]], [null, 1]], [[['RecentCounter', 'ping', 'ping', 'ping'], [[], [1], [3001], [6002]]], [null, 1, 2, 1]]],
    hidden: [[[['RecentCounter', 'ping', 'ping', 'ping', 'ping'], [[], [1], [100], [3001], [3002]]], [null, 1, 2, 3, 3]], [[['RecentCounter', 'ping', 'ping'], [[], [1000], [10000]]], [null, 1, 1]], [[['RecentCounter', 'ping', 'ping', 'ping'], [[], [1], [2], [3]]], [null, 1, 2, 3]], [[['RecentCounter', 'ping', 'ping', 'ping', 'ping'], [[], [3000], [6000], [6001], [9001]]], [null, 1, 2, 2, 2]], [[['RecentCounter', 'ping', 'ping'], [[], [0], [3000]]], [null, 1, 2]]],
    ref: class {
      constructor() { this.q = []; }
      ping(t) { this.q.push(t); while (this.q[0] < t - 3000) this.q.shift(); return this.q.length; }
    }
  },
  'design-hashmap': {
    fn: 'MyHashMap', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design HashMap', 706, 'Easy', 'Design'],
    ask: 'Build a hash map from integer keys to integer values without a built-in map. put(key, value) adds or updates, get(key) returns the value or -1, remove(key) deletes the key if present. The first op creates the map; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class MyHashMap:', js: 'class MyHashMap {', java: 'class MyHashMap {', cpp: 'class MyHashMap {', go: 'type MyHashMap struct {' },
    starter: {
      py: 'class MyHashMap:\n    def __init__(self):\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def remove(self, key: int) -> None:\n        pass\n',
      js: 'class MyHashMap {\n  constructor() {\n  }\n  put(key, value) {\n  }\n  get(key) {\n  }\n  remove(key) {\n  }\n}\n',
      java: 'class MyHashMap {\n    public MyHashMap() {\n    }\n    public void put(int key, int value) {\n    }\n    public int get(int key) {\n        return 0;\n    }\n    public void remove(int key) {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyHashMap {\npublic:\n    MyHashMap() {\n    }\n    void put(int key, int value) {\n    }\n    int get(int key) {\n        return 0;\n    }\n    void remove(int key) {\n    }\n};\n',
      go: 'package main\n\ntype MyHashMap struct {\n}\n\nfunc Constructor() MyHashMap {\n    return MyHashMap{}\n}\n\nfunc (this *MyHashMap) Put(key int, value int) {\n}\n\nfunc (this *MyHashMap) Get(key int) int {\n    return 0\n}\n\nfunc (this *MyHashMap) Remove(key int) {\n}\n'
    },
    examples: [[[['MyHashMap', 'put', 'get', 'get'], [[], [3, 30], [3], [4]]], [null, null, 30, -1]], [[['MyHashMap', 'put', 'put', 'get'], [[], [1, 1], [1, 9], [1]]], [null, null, null, 9]], [[['MyHashMap', 'put', 'remove', 'get'], [[], [7, 70], [7], [7]]], [null, null, null, -1]]],
    hidden: [[[['MyHashMap', 'get'], [[], [0]]], [null, -1]], [[['MyHashMap', 'put', 'put', 'remove', 'get', 'get'], [[], [0, 5], [1000000, 6], [0], [0], [1000000]]], [null, null, null, null, -1, 6]], [[['MyHashMap', 'remove', 'put', 'get'], [[], [9], [9, 0], [9]]], [null, null, null, 0]], [[['MyHashMap', 'put', 'put', 'put', 'get', 'get', 'get'], [[], [1, 10], [2, 20], [1001, 30], [1], [2], [1001]]], [null, null, null, null, 10, 20, 30]], [[['MyHashMap', 'put', 'remove', 'put', 'get'], [[], [4, 1], [4], [4, 2], [4]]], [null, null, null, null, 2]]],
    ref: class {
      constructor() { this.m = {}; }
      put(key, value) { this.m['k' + key] = value; }
      get(key) { return 'k' + key in this.m ? this.m['k' + key] : -1; }
      remove(key) { delete this.m['k' + key]; }
    }
  },
  'design-browser-history': {
    fn: 'BrowserHistory', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Browser History', 1472, 'Medium', 'Design'],
    ask: 'A browser tab starts on homepage. visit(url) opens url and clears the forward history. back(steps) and forward(steps) move up to steps pages (stopping at the ends) and return the page you land on. The first op creates the tab; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class BrowserHistory:', js: 'class BrowserHistory {', java: 'class BrowserHistory {', cpp: 'class BrowserHistory {', go: 'type BrowserHistory struct {' },
    starter: {
      py: 'class BrowserHistory:\n    def __init__(self, homepage: str):\n        pass\n\n    def visit(self, url: str) -> None:\n        pass\n\n    def back(self, steps: int) -> str:\n        pass\n\n    def forward(self, steps: int) -> str:\n        pass\n',
      js: 'class BrowserHistory {\n  constructor(homepage) {\n  }\n  visit(url) {\n  }\n  back(steps) {\n  }\n  forward(steps) {\n  }\n}\n',
      java: 'class BrowserHistory {\n    public BrowserHistory(String homepage) {\n    }\n    public void visit(String url) {\n    }\n    public String back(int steps) {\n        return "";\n    }\n    public String forward(int steps) {\n        return "";\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass BrowserHistory {\npublic:\n    BrowserHistory(string homepage) {\n    }\n    void visit(string url) {\n    }\n    string back(int steps) {\n        return "";\n    }\n    string forward(int steps) {\n        return "";\n    }\n};\n',
      go: 'package main\n\ntype BrowserHistory struct {\n}\n\nfunc Constructor(homepage string) BrowserHistory {\n    return BrowserHistory{}\n}\n\nfunc (this *BrowserHistory) Visit(url string) {\n}\n\nfunc (this *BrowserHistory) Back(steps int) string {\n    return ""\n}\n\nfunc (this *BrowserHistory) Forward(steps int) string {\n    return ""\n}\n'
    },
    examples: [[[['BrowserHistory', 'visit', 'visit', 'back', 'forward'], [['home.com'], ['a.com'], ['b.com'], [1], [1]]], [null, null, null, 'a.com', 'b.com']], [[['BrowserHistory', 'back'], [['x.org'], [3]]], [null, 'x.org']], [[['BrowserHistory', 'visit', 'back', 'visit', 'forward'], [['h'], ['p'], [1], ['q'], [1]]], [null, null, 'h', null, 'q']]],
    hidden: [[[['BrowserHistory', 'forward'], [['start'], [2]]], [null, 'start']], [[['BrowserHistory', 'visit', 'visit', 'visit', 'back', 'back', 'forward', 'visit', 'forward', 'back', 'back'], [['lc'], ['g'], ['f'], ['y'], [1], [1], [1], ['li'], [2], [2], [7]]], [null, null, null, null, 'f', 'g', 'f', null, 'li', 'g', 'lc']], [[['BrowserHistory', 'visit', 'visit', 'back', 'forward'], [['a'], ['b'], ['c'], [5], [5]]], [null, null, null, 'a', 'c']], [[['BrowserHistory', 'visit', 'back', 'forward', 'forward'], [['one'], ['two'], [1], [1], [1]]], [null, null, 'one', 'two', 'two']], [[['BrowserHistory', 'visit', 'visit', 'back', 'visit', 'back', 'forward'], [['s'], ['t'], ['u'], [2], ['v'], [1], [9]]], [null, null, null, 's', null, 's', 'v']]],
    ref: class {
      constructor(homepage) { this.pages = [homepage]; this.at = 0; }
      visit(url) { this.pages.length = this.at + 1; this.pages.push(url); this.at++; }
      back(steps) { this.at = Math.max(0, this.at - steps); return this.pages[this.at]; }
      forward(steps) { this.at = Math.min(this.pages.length - 1, this.at + steps); return this.pages[this.at]; }
    }
  },
  'design-circular-queue': {
    fn: 'MyCircularQueue', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Circular Queue', 622, 'Medium', 'Design'],
    ask: 'Build a ring-buffer queue that holds at most k values. enQueue(value) and deQueue() return whether they worked; Front() and Rear() return the first and last value, or -1 when empty; isEmpty() and isFull() report the state. The first op creates the queue; the tests compare what each call returned (null for nothing).',
    sig: { py: 'class MyCircularQueue:', js: 'class MyCircularQueue {', java: 'class MyCircularQueue {', cpp: 'class MyCircularQueue {', go: 'type MyCircularQueue struct {' },
    starter: {
      py: 'class MyCircularQueue:\n    def __init__(self, k: int):\n        pass\n\n    def enQueue(self, value: int) -> bool:\n        pass\n\n    def deQueue(self) -> bool:\n        pass\n\n    def Front(self) -> int:\n        pass\n\n    def Rear(self) -> int:\n        pass\n\n    def isEmpty(self) -> bool:\n        pass\n\n    def isFull(self) -> bool:\n        pass\n',
      js: 'class MyCircularQueue {\n  constructor(k) {\n  }\n  enQueue(value) {\n  }\n  deQueue() {\n  }\n  Front() {\n  }\n  Rear() {\n  }\n  isEmpty() {\n  }\n  isFull() {\n  }\n}\n',
      java: 'class MyCircularQueue {\n    public MyCircularQueue(int k) {\n    }\n    public boolean enQueue(int value) {\n        return false;\n    }\n    public boolean deQueue() {\n        return false;\n    }\n    public int Front() {\n        return 0;\n    }\n    public int Rear() {\n        return 0;\n    }\n    public boolean isEmpty() {\n        return false;\n    }\n    public boolean isFull() {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyCircularQueue {\npublic:\n    MyCircularQueue(int k) {\n    }\n    bool enQueue(int value) {\n        return false;\n    }\n    bool deQueue() {\n        return false;\n    }\n    int Front() {\n        return 0;\n    }\n    int Rear() {\n        return 0;\n    }\n    bool isEmpty() {\n        return false;\n    }\n    bool isFull() {\n        return false;\n    }\n};\n',
      go: 'package main\n\ntype MyCircularQueue struct {\n}\n\nfunc Constructor(k int) MyCircularQueue {\n    return MyCircularQueue{}\n}\n\nfunc (this *MyCircularQueue) EnQueue(value int) bool {\n    return false\n}\n\nfunc (this *MyCircularQueue) DeQueue() bool {\n    return false\n}\n\nfunc (this *MyCircularQueue) Front() int {\n    return 0\n}\n\nfunc (this *MyCircularQueue) Rear() int {\n    return 0\n}\n\nfunc (this *MyCircularQueue) IsEmpty() bool {\n    return false\n}\n\nfunc (this *MyCircularQueue) IsFull() bool {\n    return false\n}\n'
    },
    examples: [[[['MyCircularQueue', 'enQueue', 'enQueue', 'enQueue', 'Rear', 'isFull', 'deQueue', 'enQueue', 'Rear'], [[2], [1], [2], [3], [], [], [], [4], []]], [null, true, true, false, 2, true, true, true, 4]], [[['MyCircularQueue', 'Front', 'Rear', 'isEmpty'], [[1], [], [], []]], [null, -1, -1, true]], [[['MyCircularQueue', 'enQueue', 'deQueue', 'deQueue', 'isEmpty'], [[3], [5], [], [], []]], [null, true, true, false, true]]],
    hidden: [[[['MyCircularQueue', 'enQueue', 'Front', 'Rear', 'isFull'], [[1], [9], [], [], []]], [null, true, 9, 9, true]], [[['MyCircularQueue', 'enQueue', 'enQueue', 'deQueue', 'enQueue', 'enQueue', 'Front', 'Rear', 'isFull'], [[3], [1], [2], [], [3], [4], [], [], []]], [null, true, true, true, true, true, 2, 4, true]], [[['MyCircularQueue', 'deQueue', 'enQueue', 'Front'], [[2], [], [7], []]], [null, false, true, 7]], [[['MyCircularQueue', 'enQueue', 'enQueue', 'deQueue', 'deQueue', 'enQueue', 'enQueue', 'Front', 'Rear'], [[2], [1], [2], [], [], [3], [4], [], []]], [null, true, true, true, true, true, true, 3, 4]], [[['MyCircularQueue', 'enQueue', 'enQueue', 'enQueue', 'enQueue', 'deQueue', 'Front'], [[3], [6], [7], [8], [9], [], []]], [null, true, true, true, false, true, 7]]],
    ref: class {
      constructor(k) { this.a = new Array(k); this.k = k; this.head = 0; this.n = 0; }
      enQueue(value) { if (this.n === this.k) return false; this.a[(this.head + this.n) % this.k] = value; this.n++; return true; }
      deQueue() { if (!this.n) return false; this.head = (this.head + 1) % this.k; this.n--; return true; }
      Front() { return this.n ? this.a[this.head] : -1; }
      Rear() { return this.n ? this.a[(this.head + this.n - 1) % this.k] : -1; }
      isEmpty() { return this.n === 0; }
      isFull() { return this.n === this.k; }
    }
  }
};

// Node classes the harness provides, shown as comments at the top of the starter code.
const NODE_NOTES = {
  list: {
    py: '# class ListNode:  (provided)\n#     def __init__(self, val=0, next=None): self.val = val; self.next = next\n',
    js: '// function ListNode(val, next) { this.val = val; this.next = next; }  (provided)\n',
    java: '// class ListNode { int val; ListNode next; ListNode(int val) { this.val = val; } }\n',
    cpp: '// struct ListNode { int val; ListNode *next; ListNode(int x) : val(x), next(nullptr) {} };\n',
    go: '// type ListNode struct { Val int; Next *ListNode }\n'
  },
  tree: {
    py: '# class TreeNode:  (provided)\n#     def __init__(self, val=0, left=None, right=None): self.val = val; self.left = left; self.right = right\n',
    js: '// function TreeNode(val, left, right) { this.val = val; this.left = left; this.right = right; }  (provided)\n',
    java: '// class TreeNode { int val; TreeNode left, right; TreeNode(int val) { this.val = val; } }\n',
    cpp: '// struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\n',
    go: '// type TreeNode struct { Val int; Left, Right *TreeNode }\n'
  },
  graph: {
    py: '# class Node:  (provided)\n#     def __init__(self, val=0, neighbors=None): self.val = val; self.neighbors = neighbors or []\n',
    js: '// function Node(val, neighbors) { this.val = val; this.neighbors = neighbors || []; }  (provided)\n',
    java: '// class Node { int val; List<Node> neighbors; Node(int val) { this.val = val; neighbors = new ArrayList<>(); } }\n',
    cpp: '// struct Node { int val; vector<Node*> neighbors; Node(int x) : val(x) {} };\n',
    go: '// type Node struct { Val int; Neighbors []*Node }\n'
  }
};
NODE_NOTES.lists = NODE_NOTES.cycle = NODE_NOTES.list;
function nodeNotes(spec, lang) {
  const io = spec.io || {}, kinds = (io.args || []).concat([io.ret]);
  const seen = [];
  kinds.forEach((k) => { const n = NODE_NOTES[k]; if (n && seen.indexOf(n) < 0) seen.push(n); });
  return seen.map((n) => n[lang]).join('');
}

// Starter code for a spec in one language: the signature plus an empty body.
function starterCode(spec, lang) {
  if (spec.starter && spec.starter[lang]) return spec.starter[lang];
  const sig = spec.sig[lang], notes = nodeNotes(spec, lang);
  if (lang === 'py') return 'from typing import List, Optional\n\n' + notes + (notes ? '\n' : '') + sig + '\n    # Write your solution here.\n    pass\n';
  if (lang === 'js') return notes + (notes ? '\n' : '') + sig + '\n  // Write your solution here.\n}\n';
  if (lang === 'java') return notes + (notes ? '\n' : '') + 'class Solution {\n    ' + sig + '\n        // Write your solution here.\n    }\n}\n';
  if (lang === 'cpp') return '#include <bits/stdc++.h>\nusing namespace std;\n\n' + notes + (notes ? '\n' : '') + 'class Solution {\npublic:\n    ' + sig + '\n        // Write your solution here.\n    }\n};\n';
  return 'package main\n\n' + notes + (notes ? '\n' : '') + sig + '\n    // Write your solution here.\n}\n';
}

// Canonical JSON for comparing and printing results.
function showValue(v) {
  if (v === undefined) return 'undefined';
  try { const s = JSON.stringify(v); return s === undefined ? String(v) : s; } catch (e) { return String(v); }
}
function showArgs(spec, args) { return spec.params.map((p, i) => p + ' = ' + showValue(args[i])).join(', '); }
function sameResult(cmp, got, want) {
  if ((cmp === 'unordered' || cmp === 'unordered-deep') && Array.isArray(got) && Array.isArray(want)) {
    const item = (x) => (cmp === 'unordered-deep' && Array.isArray(x) ? x.map(showValue).sort().join(',') : showValue(x));
    const key = (a) => a.map(item).sort().join('|');
    return got.length === want.length && key(got) === key(want);
  }
  if (cmp === 'float') {
    const close = (a, b) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) <= 1e-6;
    if (Array.isArray(got) && Array.isArray(want)) return got.length === want.length && got.every((x, i) => close(x, want[i]));
    return close(got, want);
  }
  return showValue(got) === showValue(want);
}
// Is got a right answer for this case? For cmp 'any' the spec's own check decides.
function judge(spec, args, got, want) {
  if (spec.cmp === 'any') { try { return !!spec.check(JSON.parse(JSON.stringify(args)), got, want); } catch (e) { return false; } }
  return sameResult(spec.cmp, got, want);
}
// Run the JS reference on JSON args through the same encodings the worker uses; returns JSON.
function runRef(spec, args) {
  const R = typeof __ioCall === 'function' ? { __ioCall, IO_NODES } : require('./runner.js');
  const out = R.__ioCall(spec.ref, JSON.parse(JSON.stringify(args)), spec.io, R.IO_NODES);
  return out === undefined ? undefined : JSON.parse(JSON.stringify(out));
}
// Problems without a story carry their own title, number, difficulty and pattern.
function specInfo(id) {
  const spec = TEST_SPECS[id];
  const P = typeof PROBLEMS !== 'undefined' ? PROBLEMS.find((p) => p.id === id) : null;
  if (P) return { id, title: P.title, n: P.n, diff: P.diff, pattern: P.pattern, story: P.story, time: P.time };
  const m = spec.meta || [];
  return { id, title: m[0], n: m[1], diff: m[2], pattern: m[3], story: null, time: null };
}
if (typeof module !== 'undefined' && module.exports) module.exports = { TEST_SPECS, CODE_LANGS, RUNNABLE, starterCode, showValue, showArgs, sameResult, judge, runRef, specInfo };
// @@END-TESTS-SPEC@@
