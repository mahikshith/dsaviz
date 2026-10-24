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
