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
//   meta      for problems without a story in the catalog: [title, difficulty, sheet group]
//   io        how arguments and the result travel when they are not plain JSON (see below)
//   drive     optional: a function (f, args, H) that runs one case itself and returns the JSON answer or a
//             Promise of it (shared/runner.js explains H). Used for concurrency problems and round trips.
//   langs     optional: the languages that can run this spec here (default: every RUNNABLE language);
//   langNote  what the page says in the other languages.
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
//   'joined' a list that runs into the first list argument, written [values, pos]: after its own values it
//            continues at node pos of the first list (-1: it does not join). [[7], 2] is 7 then node 2 of it.
//   'rlist'  a list whose nodes also have a random pointer: [[val, index of the random node or null], ...].
//   'ntree'  (result) a tree read level by level along each node's next pointer, '#' ending each level.
//   'trees'  (result) a list of trees.
//   'tnode'  a value: the argument is the node holding that value in the tree argument before it.
//   'listpos' (result) a node of the first list argument, read as its index there (-1 for null).
//   'guess', 'badver', 'mountain': the hidden answer behind a function or object the learner asks, which
//            stops after too many questions (see __ioMake in shared/runner.js).
//   io.keepFirst: k means the function returns a count n; the answer is [n, the first n items of argument k].
//   io.ctorArgs: kinds for the constructor's arguments of a design class.
//   io.pydrive: Python source defining _ds_drive(cls, args), the Python twin of drive.
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
      const ok = (c) => /[a-z0-9]/i.test(c);
      let l = 0, r = s.length - 1;
      while (l < r) {
        if (!ok(s[l])) { l++; continue; }
        if (!ok(s[r])) { r--; continue; }
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++; r--;
      }
      return true;
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
    fn: 'reverseString', params: ['s'], cmp: 'exact', io: { inplace: 0 }, meta: ['Reverse String', 'Easy', 'Two Pointers'],
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
    fn: 'sortedSquares', params: ['nums'], cmp: 'exact', meta: ['Squares of a Sorted Array', 'Easy', 'Two Pointers'],
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
    fn: 'merge', params: ['nums1', 'm', 'nums2', 'n'], cmp: 'exact', io: { inplace: 0 }, meta: ['Merge Sorted Array', 'Easy', 'Two Pointers'],
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
    fn: 'sortColors', params: ['nums'], cmp: 'exact', io: { inplace: 0 }, meta: ['Sort Colors', 'Medium', 'Two Pointers'],
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
    fn: 'isSubsequence', params: ['s', 't'], cmp: 'exact', meta: ['Is Subsequence', 'Easy', 'Two Pointers'],
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
    fn: 'checkInclusion', params: ['s1', 's2'], cmp: 'exact', meta: ['Permutation in String', 'Medium', 'Sliding Window'],
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
    fn: 'minSubArrayLen', params: ['target', 'nums'], cmp: 'exact', meta: ['Minimum Size Subarray Sum', 'Medium', 'Sliding Window'],
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
    fn: 'findAnagrams', params: ['s', 'p'], cmp: 'exact', meta: ['Find All Anagrams in a String', 'Medium', 'Sliding Window'],
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
    fn: 'canConstruct', params: ['ransomNote', 'magazine'], cmp: 'exact', meta: ['Ransom Note', 'Easy', 'Hash Map'],
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
    fn: 'isIsomorphic', params: ['s', 't'], cmp: 'exact', meta: ['Isomorphic Strings', 'Easy', 'Hash Map'],
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
    fn: 'LRUCache', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['LRU Cache', 'Medium', 'Hash Map'],
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
    fn: 'pivotIndex', params: ['nums'], cmp: 'exact', meta: ['Find Pivot Index', 'Easy', 'Prefix Sum'],
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
    fn: 'searchInsert', params: ['nums', 'target'], cmp: 'exact', meta: ['Search Insert Position', 'Easy', 'Binary Search'],
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
    fn: 'minEatingSpeed', params: ['piles', 'h'], cmp: 'exact', meta: ['Koko Eating Bananas', 'Medium', 'Binary Search'],
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
    fn: 'searchMatrix', params: ['matrix', 'target'], cmp: 'exact', meta: ['Search a 2D Matrix', 'Medium', 'Binary Search'],
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
    fn: 'spiralOrder', params: ['matrix'], cmp: 'exact', meta: ['Spiral Matrix', 'Medium', 'Matrix'],
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
    fn: 'setZeroes', params: ['matrix'], cmp: 'exact', io: { inplace: 0 }, meta: ['Set Matrix Zeroes', 'Medium', 'Matrix'],
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
    fn: 'eraseOverlapIntervals', params: ['intervals'], cmp: 'exact', meta: ['Non-overlapping Intervals', 'Medium', 'Intervals'],
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
    fn: 'jump', params: ['nums'], cmp: 'exact', meta: ['Jump Game II', 'Medium', 'Greedy'],
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
    fn: 'canCompleteCircuit', params: ['gas', 'cost'], cmp: 'exact', meta: ['Gas Station', 'Medium', 'Greedy'],
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
    fn: 'partitionLabels', params: ['s'], cmp: 'exact', meta: ['Partition Labels', 'Medium', 'Greedy'],
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
    fn: 'evalRPN', params: ['tokens'], cmp: 'exact', meta: ['Evaluate Reverse Polish Notation', 'Medium', 'Stack'],
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
    fn: 'largestRectangleArea', params: ['heights'], cmp: 'exact', meta: ['Largest Rectangle in Histogram', 'Hard', 'Stack'],
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
    fn: 'lastStoneWeight', params: ['stones'], cmp: 'exact', meta: ['Last Stone Weight', 'Easy', 'Heap'],
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
    fn: 'kClosest', params: ['points', 'k'], cmp: 'unordered', meta: ['K Closest Points to Origin', 'Medium', 'Heap'],
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
    fn: 'isPalindrome', params: ['head'], cmp: 'exact', io: { args: ['list'] }, meta: ['Palindrome Linked List', 'Easy', 'In-place Reversal'],
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
    fn: 'reorderList', params: ['head'], cmp: 'exact', io: { args: ['list'], inplace: 0 }, meta: ['Reorder List', 'Medium', 'In-place Reversal'],
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
    fn: 'isHappy', params: ['n'], cmp: 'exact', meta: ['Happy Number', 'Easy', 'Fast & Slow Pointers'],
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
    fn: 'findDuplicate', params: ['nums'], cmp: 'exact', meta: ['Find the Duplicate Number', 'Medium', 'Fast & Slow Pointers'],
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
    fn: 'isSameTree', params: ['p', 'q'], cmp: 'exact', io: { args: ['tree', 'tree'] }, meta: ['Same Tree', 'Easy', 'Depth-First Search'],
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
    fn: 'maxAreaOfIsland', params: ['grid'], cmp: 'exact', meta: ['Max Area of Island', 'Medium', 'Depth-First Search'],
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
    fn: 'findOrder', params: ['numCourses', 'prerequisites'], cmp: 'any', meta: ['Course Schedule II', 'Medium', 'Breadth-First Search'],
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
    fn: 'letterCombinations', params: ['digits'], cmp: 'unordered', meta: ['Letter Combinations of a Phone Number', 'Medium', 'Backtracking'],
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
    fn: 'minCostClimbingStairs', params: ['cost'], cmp: 'exact', meta: ['Min Cost Climbing Stairs', 'Easy', 'Dynamic Programming'],
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
    fn: 'longestCommonSubsequence', params: ['text1', 'text2'], cmp: 'exact', meta: ['Longest Common Subsequence', 'Medium', 'Dynamic Programming'],
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
    fn: 'numDecodings', params: ['s'], cmp: 'exact', meta: ['Decode Ways', 'Medium', 'Dynamic Programming'],
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
    fn: 'minDistance', params: ['word1', 'word2'], cmp: 'exact', meta: ['Edit Distance', 'Medium', 'Dynamic Programming'],
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
    fn: 'canPartition', params: ['nums'], cmp: 'exact', meta: ['Partition Equal Subset Sum', 'Medium', 'Dynamic Programming'],
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
    fn: 'diameterOfBinaryTree', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Diameter of Binary Tree', 'Easy', 'Trees'],
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
    fn: 'isBalanced', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Balanced Binary Tree', 'Easy', 'Trees'],
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
    fn: 'kthSmallest', params: ['root', 'k'], cmp: 'exact', io: { args: ['tree', null] }, meta: ['Kth Smallest Element in a BST', 'Medium', 'Trees'],
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
    fn: 'Trie', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['Implement Trie (Prefix Tree)', 'Medium', 'Tries'],
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
    fn: 'singleNumber', params: ['nums'], cmp: 'exact', meta: ['Single Number', 'Easy', 'Bit Manipulation'],
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
    fn: 'missingNumber', params: ['nums'], cmp: 'exact', meta: ['Missing Number', 'Easy', 'Bit Manipulation'],
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
    fn: 'countBits', params: ['n'], cmp: 'exact', meta: ['Counting Bits', 'Easy', 'Bit Manipulation'],
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
    fn: 'isPalindrome', params: ['x'], cmp: 'exact', meta: ['Palindrome Number', 'Easy', 'Math'],
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
    fn: 'myPow', params: ['x', 'n'], cmp: 'float', meta: ['Pow(x, n)', 'Medium', 'Math'],
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
  // Sheet problems without a story: meta gives the title, difficulty and sheet group.
  'reverse-vowels-of-a-string': {
    fn: 'reverseVowels', params: ['s'], cmp: 'exact', meta: ['Reverse Vowels of a String', 'Easy', 'Two Pointers'],
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
    fn: 'sortArrayByParity', params: ['nums'], cmp: 'any', meta: ['Sort Array By Parity', 'Easy', 'Two Pointers'],
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
    fn: 'mergeAlternately', params: ['word1', 'word2'], cmp: 'exact', meta: ['Merge Strings Alternately', 'Easy', 'Two Pointers'],
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
    fn: 'validPalindrome', params: ['s'], cmp: 'exact', meta: ['Valid Palindrome II', 'Easy', 'Two Pointers'],
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
    fn: 'backspaceCompare', params: ['s', 't'], cmp: 'exact', meta: ['Backspace String Compare', 'Easy', 'Two Pointers'],
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
    fn: 'numRescueBoats', params: ['people', 'limit'], cmp: 'exact', meta: ['Boats to Save People', 'Medium', 'Two Pointers'],
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
    fn: 'threeSumClosest', params: ['nums', 'target'], cmp: 'exact', meta: ['3Sum Closest', 'Medium', 'Two Pointers'],
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
    fn: 'nextPermutation', params: ['nums'], cmp: 'exact', io: { inplace: 0 }, meta: ['Next Permutation', 'Medium', 'Two Pointers'],
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
    fn: 'findMaxAverage', params: ['nums', 'k'], cmp: 'float', meta: ['Maximum Average Subarray I', 'Easy', 'Sliding Window'],
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
    fn: 'containsNearbyDuplicate', params: ['nums', 'k'], cmp: 'exact', meta: ['Contains Duplicate II', 'Easy', 'Sliding Window'],
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
    fn: 'minimumDifference', params: ['nums', 'k'], cmp: 'exact', meta: ['Minimum Difference Between Highest and Lowest of K Scores', 'Easy', 'Sliding Window'],
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
    fn: 'maxVowels', params: ['s', 'k'], cmp: 'exact', meta: ['Maximum Number of Vowels in a Substring of Given Length', 'Medium', 'Sliding Window'],
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
    fn: 'maxScore', params: ['cardPoints', 'k'], cmp: 'exact', meta: ['Maximum Points You Can Obtain from Cards', 'Medium', 'Sliding Window'],
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
    fn: 'numSubarrayProductLessThanK', params: ['nums', 'k'], cmp: 'exact', meta: ['Subarray Product Less Than K', 'Medium', 'Sliding Window'],
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
    fn: 'longestOnes', params: ['nums', 'k'], cmp: 'exact', meta: ['Max Consecutive Ones III', 'Medium', 'Sliding Window'],
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
    fn: 'longestSubarray', params: ['nums'], cmp: 'exact', meta: ['Longest Subarray of 1\'s After Deleting One Element', 'Medium', 'Sliding Window'],
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
    fn: 'totalFruit', params: ['fruits'], cmp: 'exact', meta: ['Fruit Into Baskets', 'Medium', 'Sliding Window'],
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
    fn: 'subarraysWithKDistinct', params: ['nums', 'k'], cmp: 'exact', meta: ['Subarrays with K Different Integers', 'Hard', 'Sliding Window'],
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
    fn: 'findDifference', params: ['nums1', 'nums2'], cmp: 'any', meta: ['Find the Difference of Two Arrays', 'Easy', 'Hash Map'],
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
    fn: 'firstUniqChar', params: ['s'], cmp: 'exact', meta: ['First Unique Character in a String', 'Easy', 'Hash Map'],
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
    fn: 'maxNumberOfBalloons', params: ['text'], cmp: 'exact', meta: ['Maximum Number of Balloons', 'Easy', 'Hash Map'],
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
    fn: 'intersection', params: ['nums1', 'nums2'], cmp: 'unordered', meta: ['Intersection of Two Arrays', 'Easy', 'Hash Map'],
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
    fn: 'numIdenticalPairs', params: ['nums'], cmp: 'exact', meta: ['Number of Good Pairs', 'Easy', 'Hash Map'],
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
    fn: 'uniqueOccurrences', params: ['arr'], cmp: 'exact', meta: ['Unique Number of Occurrences', 'Easy', 'Hash Map'],
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
    fn: 'wordPattern', params: ['pattern', 's'], cmp: 'exact', meta: ['Word Pattern', 'Easy', 'Hash Map'],
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
    fn: 'majorityElement', params: ['nums'], cmp: 'exact', meta: ['Majority Element', 'Easy', 'Hash Map'],
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
    fn: 'closeStrings', params: ['word1', 'word2'], cmp: 'exact', meta: ['Determine if Two Strings Are Close', 'Medium', 'Hash Map'],
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
    fn: 'isValidSudoku', params: ['board'], cmp: 'exact', meta: ['Valid Sudoku', 'Medium', 'Hash Map'],
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
    fn: 'firstMissingPositive', params: ['nums'], cmp: 'exact', meta: ['First Missing Positive', 'Hard', 'Hash Map'],
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
    fn: 'equalPairs', params: ['grid'], cmp: 'exact', meta: ['Equal Row and Column Pairs', 'Medium', 'Hash Map'],
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
    fn: 'fourSumCount', params: ['nums1', 'nums2', 'nums3', 'nums4'], cmp: 'exact', meta: ['4Sum II', 'Medium', 'Hash Map'],
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
    fn: 'runningSum', params: ['nums'], cmp: 'exact', meta: ['Running Sum of 1d Array', 'Easy', 'Prefix Sum'],
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
    fn: 'largestAltitude', params: ['gain'], cmp: 'exact', meta: ['Find the Highest Altitude', 'Easy', 'Prefix Sum'],
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
    fn: 'findMiddleIndex', params: ['nums'], cmp: 'exact', meta: ['Find the Middle Index in Array', 'Easy', 'Prefix Sum'],
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
    fn: 'NumArray', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Range Sum Query - Immutable', 'Easy', 'Prefix Sum'],
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
    fn: 'findMaxLength', params: ['nums'], cmp: 'exact', meta: ['Contiguous Array', 'Medium', 'Prefix Sum'],
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
    fn: 'checkSubarraySum', params: ['nums', 'k'], cmp: 'exact', meta: ['Continuous Subarray Sum', 'Medium', 'Prefix Sum'],
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
    fn: 'subarraysDivByK', params: ['nums', 'k'], cmp: 'exact', meta: ['Subarray Sums Divisible by K', 'Medium', 'Prefix Sum'],
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
    fn: 'corpFlightBookings', params: ['bookings', 'n'], cmp: 'exact', meta: ['Corporate Flight Bookings', 'Medium', 'Prefix Sum'],
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
    fn: 'mySqrt', params: ['x'], cmp: 'exact', meta: ['Sqrt(x)', 'Easy', 'Binary Search'],
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
    fn: 'nextGreatestLetter', params: ['letters', 'target'], cmp: 'exact', meta: ['Find Smallest Letter Greater Than Target', 'Easy', 'Binary Search'],
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
    fn: 'searchRange', params: ['nums', 'target'], cmp: 'exact', meta: ['Find First and Last Position of Element in Sorted Array', 'Medium', 'Binary Search'],
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
    fn: 'peakIndexInMountainArray', params: ['arr'], cmp: 'exact', meta: ['Peak Index in a Mountain Array', 'Medium', 'Binary Search'],
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
    fn: 'findPeakElement', params: ['nums'], cmp: 'any', meta: ['Find Peak Element', 'Medium', 'Binary Search'],
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
    fn: 'singleNonDuplicate', params: ['nums'], cmp: 'exact', meta: ['Single Element in a Sorted Array', 'Medium', 'Binary Search'],
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
    fn: 'shipWithinDays', params: ['weights', 'days'], cmp: 'exact', meta: ['Capacity To Ship Packages Within D Days', 'Medium', 'Binary Search'],
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
    fn: 'minDays', params: ['bloomDay', 'm', 'k'], cmp: 'exact', meta: ['Minimum Number of Days to Make m Bouquets', 'Medium', 'Binary Search'],
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
    fn: 'TimeMap', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Time Based Key-Value Store', 'Medium', 'Binary Search'],
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
    fn: 'splitArray', params: ['nums', 'k'], cmp: 'exact', meta: ['Split Array Largest Sum', 'Hard', 'Binary Search'],
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
    fn: 'findMedianSortedArrays', params: ['nums1', 'nums2'], cmp: 'float', meta: ['Median of Two Sorted Arrays', 'Hard', 'Binary Search'],
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
    fn: 'transpose', params: ['matrix'], cmp: 'exact', meta: ['Transpose Matrix', 'Easy', 'Matrix'],
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
    fn: 'matrixReshape', params: ['mat', 'r', 'c'], cmp: 'exact', meta: ['Reshape the Matrix', 'Easy', 'Matrix'],
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
    fn: 'diagonalSum', params: ['mat'], cmp: 'exact', meta: ['Matrix Diagonal Sum', 'Easy', 'Matrix'],
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
    fn: 'generate', params: ['numRows'], cmp: 'exact', meta: ['Pascal\'s Triangle', 'Easy', 'Matrix'],
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
    fn: 'countNegatives', params: ['grid'], cmp: 'exact', meta: ['Count Negative Numbers in a Sorted Matrix', 'Easy', 'Matrix'],
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
    fn: 'generateMatrix', params: ['n'], cmp: 'exact', meta: ['Spiral Matrix II', 'Medium', 'Matrix'],
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
    fn: 'gameOfLife', params: ['board'], cmp: 'exact', io: { inplace: 0 }, meta: ['Game of Life', 'Medium', 'Matrix'],
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
    fn: 'summaryRanges', params: ['nums'], cmp: 'exact', meta: ['Summary Ranges', 'Easy', 'Intervals'],
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
    fn: 'findMinArrowShots', params: ['points'], cmp: 'exact', meta: ['Minimum Number of Arrows to Burst Balloons', 'Medium', 'Intervals'],
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
    fn: 'intervalIntersection', params: ['firstList', 'secondList'], cmp: 'exact', meta: ['Interval List Intersections', 'Medium', 'Intervals'],
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
    fn: 'carPooling', params: ['trips', 'capacity'], cmp: 'exact', meta: ['Car Pooling', 'Medium', 'Intervals'],
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
    fn: 'MyCalendar', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['My Calendar I', 'Medium', 'Intervals'],
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
    fn: 'removeCoveredIntervals', params: ['intervals'], cmp: 'exact', meta: ['Remove Covered Intervals', 'Medium', 'Intervals'],
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
    fn: 'findContentChildren', params: ['g', 's'], cmp: 'exact', meta: ['Assign Cookies', 'Easy', 'Greedy'],
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
    fn: 'lemonadeChange', params: ['bills'], cmp: 'exact', meta: ['Lemonade Change', 'Easy', 'Greedy'],
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
    fn: 'canPlaceFlowers', params: ['flowerbed', 'n'], cmp: 'exact', meta: ['Can Place Flowers', 'Easy', 'Greedy'],
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
    fn: 'balancedStringSplit', params: ['s'], cmp: 'exact', meta: ['Split a String in Balanced Strings', 'Easy', 'Greedy'],
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
    fn: 'maximumUnits', params: ['boxTypes', 'truckSize'], cmp: 'exact', meta: ['Maximum Units on a Truck', 'Easy', 'Greedy'],
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
    fn: 'maxProfit', params: ['prices'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock II', 'Medium', 'Greedy'],
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
    fn: 'minAddToMakeValid', params: ['s'], cmp: 'exact', meta: ['Minimum Add to Make Parentheses Valid', 'Medium', 'Greedy'],
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
    fn: 'increasingTriplet', params: ['nums'], cmp: 'exact', meta: ['Increasing Triplet Subsequence', 'Medium', 'Greedy'],
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
    fn: 'isNStraightHand', params: ['hand', 'groupSize'], cmp: 'exact', meta: ['Hand of Straights', 'Medium', 'Greedy'],
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
    fn: 'checkValidString', params: ['s'], cmp: 'exact', meta: ['Valid Parenthesis String', 'Medium', 'Greedy'],
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
    fn: 'leastInterval', params: ['tasks', 'n'], cmp: 'exact', meta: ['Task Scheduler', 'Medium', 'Greedy'],
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
    fn: 'candy', params: ['ratings'], cmp: 'exact', meta: ['Candy', 'Hard', 'Greedy'],
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
    fn: 'mergeTriplets', params: ['triplets', 'target'], cmp: 'exact', meta: ['Merge Triplets to Form Target Triplet', 'Medium', 'Greedy'],
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
    fn: 'calPoints', params: ['operations'], cmp: 'exact', meta: ['Baseball Game', 'Easy', 'Stack'],
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
    fn: 'removeDuplicates', params: ['s'], cmp: 'exact', meta: ['Remove All Adjacent Duplicates In String', 'Easy', 'Stack'],
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
    fn: 'makeGood', params: ['s'], cmp: 'exact', meta: ['Make The String Great', 'Easy', 'Stack'],
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
    fn: 'nextGreaterElement', params: ['nums1', 'nums2'], cmp: 'exact', meta: ['Next Greater Element I', 'Easy', 'Stack'],
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
    fn: 'MyQueue', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Implement Queue using Stacks', 'Easy', 'Stack'],
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
    fn: 'removeStars', params: ['s'], cmp: 'exact', meta: ['Removing Stars From a String', 'Medium', 'Stack'],
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
    fn: 'simplifyPath', params: ['path'], cmp: 'exact', meta: ['Simplify Path', 'Medium', 'Stack'],
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
    fn: 'decodeString', params: ['s'], cmp: 'exact', meta: ['Decode String', 'Medium', 'Stack'],
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
    fn: 'asteroidCollision', params: ['asteroids'], cmp: 'exact', meta: ['Asteroid Collision', 'Medium', 'Stack'],
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
    fn: 'carFleet', params: ['target', 'position', 'speed'], cmp: 'exact', meta: ['Car Fleet', 'Medium', 'Stack'],
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
    fn: 'calculate', params: ['s'], cmp: 'exact', meta: ['Basic Calculator II', 'Medium', 'Stack'],
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
    fn: 'longestValidParentheses', params: ['s'], cmp: 'exact', meta: ['Longest Valid Parentheses', 'Hard', 'Stack'],
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
    fn: 'StockSpanner', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Online Stock Span', 'Medium', 'Stack'],
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
    fn: 'nextGreaterElements', params: ['nums'], cmp: 'exact', meta: ['Next Greater Element II', 'Medium', 'Monotonic Stack & Queue'],
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
    fn: 'removeKdigits', params: ['num', 'k'], cmp: 'exact', meta: ['Remove K Digits', 'Medium', 'Monotonic Stack & Queue'],
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
    fn: 'finalPrices', params: ['prices'], cmp: 'exact', meta: ['Final Prices With a Special Discount in a Shop', 'Easy', 'Monotonic Stack & Queue'],
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
    fn: 'find132pattern', params: ['nums'], cmp: 'exact', meta: ['132 Pattern', 'Medium', 'Monotonic Stack & Queue'],
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
    fn: 'sumSubarrayMins', params: ['arr'], cmp: 'exact', meta: ['Sum of Subarray Minimums', 'Medium', 'Monotonic Stack & Queue'],
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
    fn: 'KthLargest', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Kth Largest Element in a Stream', 'Easy', 'Heap'],
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
    fn: 'kWeakestRows', params: ['mat', 'k'], cmp: 'exact', meta: ['The K Weakest Rows in a Matrix', 'Easy', 'Heap'],
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
    fn: 'pickGifts', params: ['gifts', 'k'], cmp: 'exact', meta: ['Take Gifts From the Richest Pile', 'Easy', 'Heap'],
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
    fn: 'topKFrequent', params: ['words', 'k'], cmp: 'exact', meta: ['Top K Frequent Words', 'Medium', 'Heap'],
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
    fn: 'frequencySort', params: ['s'], cmp: 'any', meta: ['Sort Characters By Frequency', 'Medium', 'Heap'],
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
    fn: 'MedianFinder', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Find Median from Data Stream', 'Hard', 'Heap'],
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
    fn: 'reorganizeString', params: ['s'], cmp: 'any', meta: ['Reorganize String', 'Medium', 'Heap'],
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
    fn: 'deleteDuplicates', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Remove Duplicates from Sorted List', 'Easy', 'Linked Lists'],
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
    fn: 'getDecimalValue', params: ['head'], cmp: 'exact', io: { args: ['list'] }, meta: ['Convert Binary Number in a Linked List to Integer', 'Easy', 'Linked Lists'],
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
    fn: 'removeElements', params: ['head', 'val'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Remove Linked List Elements', 'Easy', 'Linked Lists'],
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
    fn: 'addTwoNumbers', params: ['l1', 'l2'], cmp: 'exact', io: { args: ['list', 'list'], ret: 'list' }, meta: ['Add Two Numbers', 'Medium', 'Linked Lists'],
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
    fn: 'oddEvenList', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Odd Even Linked List', 'Medium', 'Linked Lists'],
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
    fn: 'partition', params: ['head', 'x'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Partition List', 'Medium', 'Linked Lists'],
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
    fn: 'sortList', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Sort List', 'Medium', 'Linked Lists'],
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
    fn: 'swapPairs', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Swap Nodes in Pairs', 'Medium', 'In-place Reversal'],
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
    fn: 'reverseBetween', params: ['head', 'left', 'right'], cmp: 'exact', io: { args: ['list', null, null], ret: 'list' }, meta: ['Reverse Linked List II', 'Medium', 'In-place Reversal'],
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
    fn: 'rotateRight', params: ['head', 'k'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Rotate List', 'Medium', 'In-place Reversal'],
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
    fn: 'reverseKGroup', params: ['head', 'k'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Reverse Nodes in k-Group', 'Hard', 'In-place Reversal'],
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
    fn: 'pairSum', params: ['head'], cmp: 'exact', io: { args: ['list'] }, meta: ['Maximum Twin Sum of a Linked List', 'Medium', 'In-place Reversal'],
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
    fn: 'deleteMiddle', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Delete the Middle Node of a Linked List', 'Medium', 'Fast & Slow Pointers'],
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
    fn: 'inorderTraversal', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Inorder Traversal', 'Easy', 'Trees'],
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
    fn: 'preorderTraversal', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Preorder Traversal', 'Easy', 'Trees'],
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
    fn: 'postorderTraversal', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Postorder Traversal', 'Easy', 'Trees'],
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
    fn: 'mergeTrees', params: ['root1', 'root2'], cmp: 'exact', io: { args: ['tree', 'tree'], ret: 'tree' }, meta: ['Merge Two Binary Trees', 'Easy', 'Trees'],
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
    fn: 'isUnivalTree', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Univalued Binary Tree', 'Easy', 'Trees'],
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
    fn: 'isSymmetric', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Symmetric Tree', 'Easy', 'Trees'],
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
    fn: 'hasPathSum', params: ['root', 'targetSum'], cmp: 'exact', io: { args: ['tree', null] }, meta: ['Path Sum', 'Easy', 'Trees'],
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
    fn: 'isSubtree', params: ['root', 'subRoot'], cmp: 'exact', io: { args: ['tree', 'tree'] }, meta: ['Subtree of Another Tree', 'Easy', 'Trees'],
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
    fn: 'leafSimilar', params: ['root1', 'root2'], cmp: 'exact', io: { args: ['tree', 'tree'] }, meta: ['Leaf-Similar Trees', 'Easy', 'Trees'],
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
    fn: 'sumOfLeftLeaves', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Sum of Left Leaves', 'Easy', 'Trees'],
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
    fn: 'binaryTreePaths', params: ['root'], cmp: 'unordered', io: { args: ['tree'] }, meta: ['Binary Tree Paths', 'Easy', 'Trees'],
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
    fn: 'searchBST', params: ['root', 'val'], cmp: 'exact', io: { args: ['tree', null], ret: 'tree' }, meta: ['Search in a Binary Search Tree', 'Easy', 'Trees'],
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
    fn: 'rangeSumBST', params: ['root', 'low', 'high'], cmp: 'exact', io: { args: ['tree', null, null] }, meta: ['Range Sum of BST', 'Easy', 'Trees'],
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
    fn: 'getMinimumDifference', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Minimum Absolute Difference in BST', 'Easy', 'Trees'],
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
    fn: 'pathSum', params: ['root', 'targetSum'], cmp: 'unordered', io: { args: ['tree', null] }, meta: ['Path Sum II', 'Medium', 'Trees'],
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
    fn: 'sumNumbers', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Sum Root to Leaf Numbers', 'Medium', 'Trees'],
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
    fn: 'goodNodes', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Count Good Nodes in Binary Tree', 'Medium', 'Trees'],
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
    fn: 'pathSum', params: ['root', 'targetSum'], cmp: 'exact', io: { args: ['tree', null] }, meta: ['Path Sum III', 'Medium', 'Trees'],
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
    fn: 'lowestCommonAncestor', params: ['root', 'p', 'q'], cmp: 'exact', io: { args: ['tree', null, null] }, meta: ['Lowest Common Ancestor of a Binary Search Tree', 'Medium', 'Trees'],
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
    fn: 'lowestCommonAncestor', params: ['root', 'p', 'q'], cmp: 'exact', io: { args: ['tree', null, null] }, meta: ['Lowest Common Ancestor of a Binary Tree', 'Medium', 'Trees'],
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
    fn: 'insertIntoBST', params: ['root', 'val'], cmp: 'any', io: { args: ['tree', null], ret: 'tree' }, meta: ['Insert into a Binary Search Tree', 'Medium', 'Trees'],
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
    fn: 'flatten', params: ['root'], cmp: 'exact', io: { args: ['tree'], inplace: 0 }, meta: ['Flatten Binary Tree to Linked List', 'Medium', 'Trees'],
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
    fn: 'buildTree', params: ['preorder', 'inorder'], cmp: 'exact', io: { ret: 'tree' }, meta: ['Construct Binary Tree from Preorder and Inorder Traversal', 'Medium', 'Trees'],
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
    fn: 'rob', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['House Robber III', 'Medium', 'Trees'],
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
    fn: 'maxPathSum', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Maximum Path Sum', 'Hard', 'Trees'],
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
    fn: 'sortedArrayToBST', params: ['nums'], cmp: 'any', io: { ret: 'tree' }, meta: ['Convert Sorted Array to Binary Search Tree', 'Easy', 'Trees'],
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
    fn: 'minDepth', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Minimum Depth of Binary Tree', 'Easy', 'Breadth-First Search'],
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
    fn: 'averageOfLevels', params: ['root'], cmp: 'float', io: { args: ['tree'] }, meta: ['Average of Levels in Binary Tree', 'Easy', 'Breadth-First Search'],
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
    fn: 'zigzagLevelOrder', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Zigzag Level Order Traversal', 'Medium', 'Breadth-First Search'],
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
    fn: 'maxLevelSum', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Maximum Level Sum of a Binary Tree', 'Medium', 'Breadth-First Search'],
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
    fn: 'floodFill', params: ['image', 'sr', 'sc', 'color'], cmp: 'exact', meta: ['Flood Fill', 'Easy', 'Depth-First Search'],
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
    fn: 'islandPerimeter', params: ['grid'], cmp: 'exact', meta: ['Island Perimeter', 'Easy', 'Depth-First Search'],
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
    fn: 'validPath', params: ['n', 'edges', 'source', 'destination'], cmp: 'exact', meta: ['Find if Path Exists in Graph', 'Easy', 'Depth-First Search'],
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
    fn: 'canVisitAllRooms', params: ['rooms'], cmp: 'exact', meta: ['Keys and Rooms', 'Medium', 'Depth-First Search'],
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
    fn: 'findCircleNum', params: ['isConnected'], cmp: 'exact', meta: ['Number of Provinces', 'Medium', 'Depth-First Search'],
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
    fn: 'closedIsland', params: ['grid'], cmp: 'exact', meta: ['Number of Closed Islands', 'Medium', 'Depth-First Search'],
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
    fn: 'numEnclaves', params: ['grid'], cmp: 'exact', meta: ['Number of Enclaves', 'Medium', 'Depth-First Search'],
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
    fn: 'solve', params: ['board'], cmp: 'exact', io: { inplace: 0 }, meta: ['Surrounded Regions', 'Medium', 'Depth-First Search'],
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
    fn: 'pacificAtlantic', params: ['heights'], cmp: 'unordered', meta: ['Pacific Atlantic Water Flow', 'Medium', 'Depth-First Search'],
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
    fn: 'longestIncreasingPath', params: ['matrix'], cmp: 'exact', meta: ['Longest Increasing Path in a Matrix', 'Hard', 'Depth-First Search'],
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
    fn: 'shortestPathBinaryMatrix', params: ['grid'], cmp: 'exact', meta: ['Shortest Path in Binary Matrix', 'Medium', 'Breadth-First Search'],
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
    fn: 'nearestExit', params: ['maze', 'entrance'], cmp: 'exact', meta: ['Nearest Exit from Entrance in Maze', 'Medium', 'Breadth-First Search'],
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
    fn: 'updateMatrix', params: ['mat'], cmp: 'exact', meta: ['01 Matrix', 'Medium', 'Breadth-First Search'],
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
    fn: 'openLock', params: ['deadends', 'target'], cmp: 'exact', meta: ['Open the Lock', 'Medium', 'Breadth-First Search'],
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
    fn: 'ladderLength', params: ['beginWord', 'endWord', 'wordList'], cmp: 'exact', meta: ['Word Ladder', 'Hard', 'Breadth-First Search'],
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
    fn: 'subsetsWithDup', params: ['nums'], cmp: 'unordered-deep', meta: ['Subsets II', 'Medium', 'Backtracking'],
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
    fn: 'combine', params: ['n', 'k'], cmp: 'unordered-deep', meta: ['Combinations', 'Medium', 'Backtracking'],
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
    fn: 'combinationSum3', params: ['k', 'n'], cmp: 'unordered-deep', meta: ['Combination Sum III', 'Medium', 'Backtracking'],
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
    fn: 'permuteUnique', params: ['nums'], cmp: 'unordered', meta: ['Permutations II', 'Medium', 'Backtracking'],
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
    fn: 'combinationSum2', params: ['candidates', 'target'], cmp: 'unordered-deep', meta: ['Combination Sum II', 'Medium', 'Backtracking'],
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
    fn: 'generateParenthesis', params: ['n'], cmp: 'unordered', meta: ['Generate Parentheses', 'Medium', 'Backtracking'],
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
    fn: 'partition', params: ['s'], cmp: 'unordered', meta: ['Palindrome Partitioning', 'Medium', 'Backtracking'],
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
    fn: 'solveNQueens', params: ['n'], cmp: 'unordered', meta: ['N-Queens', 'Hard', 'Backtracking'],
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
    fn: 'totalNQueens', params: ['n'], cmp: 'exact', meta: ['N-Queens II', 'Hard', 'Backtracking'],
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
    fn: 'findJudge', params: ['n', 'trust'], cmp: 'exact', meta: ['Find the Town Judge', 'Easy', 'Graphs'],
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
    fn: 'findCenter', params: ['edges'], cmp: 'exact', meta: ['Find Center of Star Graph', 'Easy', 'Graphs'],
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
    fn: 'isBipartite', params: ['graph'], cmp: 'exact', meta: ['Is Graph Bipartite?', 'Medium', 'Graphs'],
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
    fn: 'findRedundantConnection', params: ['edges'], cmp: 'exact', meta: ['Redundant Connection', 'Medium', 'Graphs'],
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
    fn: 'makeConnected', params: ['n', 'connections'], cmp: 'exact', meta: ['Number of Operations to Make Network Connected', 'Medium', 'Graphs'],
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
    fn: 'networkDelayTime', params: ['times', 'n', 'k'], cmp: 'exact', meta: ['Network Delay Time', 'Medium', 'Graphs'],
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
    fn: 'minCostConnectPoints', params: ['points'], cmp: 'exact', meta: ['Min Cost to Connect All Points', 'Medium', 'Graphs'],
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
    fn: 'findCheapestPrice', params: ['n', 'flights', 'src', 'dst', 'k'], cmp: 'exact', meta: ['Cheapest Flights Within K Stops', 'Medium', 'Graphs'],
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
    fn: 'minimumEffortPath', params: ['heights'], cmp: 'exact', meta: ['Path With Minimum Effort', 'Medium', 'Graphs'],
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
    fn: 'longestCommonPrefix', params: ['strs'], cmp: 'exact', meta: ['Longest Common Prefix', 'Easy', 'Tries'],
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
    fn: 'WordDictionary', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Add and Search Words Data Structure', 'Medium', 'Tries'],
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
    fn: 'replaceWords', params: ['dictionary', 'sentence'], cmp: 'exact', meta: ['Replace Words', 'Medium', 'Tries'],
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
    fn: 'suggestedProducts', params: ['products', 'searchWord'], cmp: 'exact', meta: ['Search Suggestions System', 'Medium', 'Tries'],
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
    fn: 'MapSum', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Map Sum Pairs', 'Medium', 'Tries'],
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
    fn: 'findWords', params: ['board', 'words'], cmp: 'unordered', meta: ['Word Search II', 'Hard', 'Tries'],
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
    fn: 'findMaximumXOR', params: ['nums'], cmp: 'exact', meta: ['Maximum XOR of Two Numbers in an Array', 'Medium', 'Tries'],
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
    fn: 'fib', params: ['n'], cmp: 'exact', meta: ['Fibonacci Number', 'Easy', 'Dynamic Programming'],
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
    fn: 'tribonacci', params: ['n'], cmp: 'exact', meta: ['N-th Tribonacci Number', 'Easy', 'Dynamic Programming'],
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
    fn: 'rob', params: ['nums'], cmp: 'exact', meta: ['House Robber II', 'Medium', 'Dynamic Programming'],
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
    fn: 'deleteAndEarn', params: ['nums'], cmp: 'exact', meta: ['Delete and Earn', 'Medium', 'Dynamic Programming'],
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
    fn: 'maxProduct', params: ['nums'], cmp: 'exact', meta: ['Maximum Product Subarray', 'Medium', 'Dynamic Programming'],
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
    fn: 'maxProfit', params: ['prices'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock with Cooldown', 'Medium', 'Dynamic Programming'],
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
    fn: 'maxProfit', params: ['prices', 'fee'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock with Transaction Fee', 'Medium', 'Dynamic Programming'],
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
    fn: 'minPathSum', params: ['grid'], cmp: 'exact', meta: ['Minimum Path Sum', 'Medium', 'Dynamic Programming'],
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
    fn: 'numSquares', params: ['n'], cmp: 'exact', meta: ['Perfect Squares', 'Medium', 'Dynamic Programming'],
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
    fn: 'change', params: ['amount', 'coins'], cmp: 'exact', meta: ['Coin Change II', 'Medium', 'Dynamic Programming'],
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
    fn: 'combinationSum4', params: ['nums', 'target'], cmp: 'exact', meta: ['Combination Sum IV', 'Medium', 'Dynamic Programming'],
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
    fn: 'mincostTickets', params: ['days', 'costs'], cmp: 'exact', meta: ['Minimum Cost For Tickets', 'Medium', 'Dynamic Programming'],
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
    fn: 'maxProfit', params: ['prices'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock III', 'Hard', 'Dynamic Programming'],
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
    fn: 'uniquePathsWithObstacles', params: ['obstacleGrid'], cmp: 'exact', meta: ['Unique Paths II', 'Medium', 'Dynamic Programming'],
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
    fn: 'minimumTotal', params: ['triangle'], cmp: 'exact', meta: ['Triangle', 'Medium', 'Dynamic Programming'],
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
    fn: 'maximalSquare', params: ['matrix'], cmp: 'exact', meta: ['Maximal Square', 'Medium', 'Dynamic Programming'],
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
    fn: 'countSubstrings', params: ['s'], cmp: 'exact', meta: ['Palindromic Substrings', 'Medium', 'Dynamic Programming'],
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
    fn: 'longestPalindromeSubseq', params: ['s'], cmp: 'exact', meta: ['Longest Palindromic Subsequence', 'Medium', 'Dynamic Programming'],
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
    fn: 'minDistance', params: ['word1', 'word2'], cmp: 'exact', meta: ['Delete Operation for Two Strings', 'Medium', 'Dynamic Programming'],
    ask: 'One step deletes one letter from either word. Return the fewest steps that make the two words equal.',
    sig: {
      py: 'def minDistance(word1: str, word2: str) -> int:',
      js: 'function minDistance(word1, word2) {',
      java: 'public int minDistance(String word1, String word2) {',
      cpp: 'int minDistance(string word1, string word2) {',
      go: 'func minDistance(word1 string, word2 string) int {'
    },
    examples: [[['eat', 'tea'], 2], [['abc', 'abc'], 0], [['a', 'b'], 2]],
    hidden: [[['', 'abc'], 3], [['sea', 'eat'], 2], [['dsamaxxing', 'maxi'], 6], [['abcdef', 'fedcba'], 10], [['park', 'spake'], 3]],
    ref: function (word1, word2) {
      const m = word1.length, n = word2.length, d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = word1[i - 1] === word2[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);
      return m + n - 2 * d[m][n];
    }
  },
  'interleaving-string': {
    fn: 'isInterleave', params: ['s1', 's2', 's3'], cmp: 'exact', meta: ['Interleaving String', 'Medium', 'Dynamic Programming'],
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
    fn: 'findTargetSumWays', params: ['nums', 'target'], cmp: 'exact', meta: ['Target Sum', 'Medium', 'Dynamic Programming'],
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
    fn: 'lastStoneWeightII', params: ['stones'], cmp: 'exact', meta: ['Last Stone Weight II', 'Medium', 'Dynamic Programming'],
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
    fn: 'findLongestChain', params: ['pairs'], cmp: 'exact', meta: ['Maximum Length of Pair Chain', 'Medium', 'Dynamic Programming'],
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
    fn: 'longestStrChain', params: ['words'], cmp: 'exact', meta: ['Longest String Chain', 'Medium', 'Dynamic Programming'],
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
    fn: 'findNumberOfLIS', params: ['nums'], cmp: 'exact', meta: ['Number of Longest Increasing Subsequence', 'Medium', 'Dynamic Programming'],
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
    fn: 'maxEnvelopes', params: ['envelopes'], cmp: 'exact', meta: ['Russian Doll Envelopes', 'Hard', 'Dynamic Programming'],
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
    fn: 'numDistinct', params: ['s', 't'], cmp: 'exact', meta: ['Distinct Subsequences', 'Hard', 'Dynamic Programming'],
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
    fn: 'lengthOfLastWord', params: ['s'], cmp: 'exact', meta: ['Length of Last Word', 'Easy', 'String Algorithms'],
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
    fn: 'strStr', params: ['haystack', 'needle'], cmp: 'exact', meta: ['Find the Index of the First Occurrence in a String', 'Easy', 'String Algorithms'],
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
    fn: 'reverseWords', params: ['s'], cmp: 'exact', meta: ['Reverse Words in a String', 'Medium', 'String Algorithms'],
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
    fn: 'myAtoi', params: ['s'], cmp: 'exact', meta: ['String to Integer (atoi)', 'Medium', 'String Algorithms'],
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
    fn: 'convert', params: ['s', 'numRows'], cmp: 'exact', meta: ['Zigzag Conversion', 'Medium', 'String Algorithms'],
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
    fn: 'rotateString', params: ['s', 'goal'], cmp: 'exact', meta: ['Rotate String', 'Easy', 'String Algorithms'],
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
    fn: 'repeatedSubstringPattern', params: ['s'], cmp: 'exact', meta: ['Repeated Substring Pattern', 'Easy', 'String Algorithms'],
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
    fn: 'fizzBuzz', params: ['n'], cmp: 'exact', meta: ['Fizz Buzz', 'Easy', 'Math'],
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
    fn: 'plusOne', params: ['digits'], cmp: 'exact', meta: ['Plus One', 'Easy', 'Math'],
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
    fn: 'romanToInt', params: ['s'], cmp: 'exact', meta: ['Roman to Integer', 'Easy', 'Math'],
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
    fn: 'intToRoman', params: ['num'], cmp: 'exact', meta: ['Integer to Roman', 'Medium', 'Math'],
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
    fn: 'reverse', params: ['x'], cmp: 'exact', meta: ['Reverse Integer', 'Medium', 'Math'],
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
    fn: 'titleToNumber', params: ['columnTitle'], cmp: 'exact', meta: ['Excel Sheet Column Number', 'Easy', 'Math'],
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
    fn: 'convertToTitle', params: ['columnNumber'], cmp: 'exact', meta: ['Excel Sheet Column Title', 'Easy', 'Math'],
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
    fn: 'countPrimes', params: ['n'], cmp: 'exact', meta: ['Count Primes', 'Medium', 'Math'],
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
    fn: 'multiply', params: ['num1', 'num2'], cmp: 'exact', meta: ['Multiply Strings', 'Medium', 'Math'],
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
    fn: 'addDigits', params: ['num'], cmp: 'exact', meta: ['Add Digits', 'Easy', 'Math'],
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
    fn: 'gcdOfStrings', params: ['str1', 'str2'], cmp: 'exact', meta: ['Greatest Common Divisor of Strings', 'Easy', 'Math'],
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
    fn: 'hammingWeight', params: ['n'], cmp: 'exact', meta: ['Number of 1 Bits', 'Easy', 'Bit Manipulation'],
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
    fn: 'isPowerOfTwo', params: ['n'], cmp: 'exact', meta: ['Power of Two', 'Easy', 'Bit Manipulation'],
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
    fn: 'hammingDistance', params: ['x', 'y'], cmp: 'exact', meta: ['Hamming Distance', 'Easy', 'Bit Manipulation'],
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
    fn: 'findTheDifference', params: ['s', 't'], cmp: 'exact', meta: ['Find the Difference', 'Easy', 'Bit Manipulation'],
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
    fn: 'reverseBits', params: ['n'], cmp: 'exact', meta: ['Reverse Bits', 'Easy', 'Bit Manipulation'],
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
    fn: 'singleNumber', params: ['nums'], cmp: 'exact', meta: ['Single Number II', 'Medium', 'Bit Manipulation'],
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
    fn: 'heightChecker', params: ['heights'], cmp: 'exact', meta: ['Height Checker', 'Easy', 'Sorting'],
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
    fn: 'relativeSortArray', params: ['arr1', 'arr2'], cmp: 'exact', meta: ['Relative Sort Array', 'Easy', 'Sorting'],
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
    fn: 'sortByBits', params: ['arr'], cmp: 'exact', meta: ['Sort Integers by The Number of 1 Bits', 'Easy', 'Sorting'],
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
    fn: 'customSortString', params: ['order', 's'], cmp: 'any', meta: ['Custom Sort String', 'Medium', 'Sorting'],
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
    fn: 'hIndex', params: ['citations'], cmp: 'exact', meta: ['H-Index', 'Medium', 'Sorting'],
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
    fn: 'largestNumber', params: ['nums'], cmp: 'exact', meta: ['Largest Number', 'Medium', 'Sorting'],
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
    fn: 'sortArray', params: ['nums'], cmp: 'exact', meta: ['Sort an Array', 'Medium', 'Sorting'],
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
    fn: 'ParkingSystem', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Parking System', 'Easy', 'Design'],
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
    fn: 'RecentCounter', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Number of Recent Calls', 'Easy', 'Design'],
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
    fn: 'MyHashMap', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design HashMap', 'Easy', 'Design'],
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
    fn: 'BrowserHistory', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Browser History', 'Medium', 'Design'],
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
    fn: 'MyCircularQueue', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Circular Queue', 'Medium', 'Design'],
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
  },
  'remove-duplicates-from-sorted-array': {
    fn: 'removeDuplicates', params: ['nums'], cmp: 'exact', io: { keepFirst: 0 }, meta: ['Remove Duplicates from Sorted Array', 'Easy', 'Two Pointers'],
    ask: 'nums is sorted, smallest first. Move one copy of each different value to the front of nums, keeping their order, and return k, how many different values there are. The tests read k and the first k slots of nums; whatever you leave after them does not matter.',
    sig: {
      py: 'def removeDuplicates(nums: List[int]) -> int:',
      js: 'function removeDuplicates(nums) {',
      java: 'public int removeDuplicates(int[] nums) {',
      cpp: 'int removeDuplicates(vector<int>& nums) {',
      go: 'func removeDuplicates(nums []int) int {'
    },
    examples: [[[[1, 1, 2, 5, 5, 5, 8]], [4, [1, 2, 5, 8]]], [[[-3, -3, -3]], [1, [-3]]], [[[0, 4, 9]], [3, [0, 4, 9]]]],
    hidden: [[[[]], [0, []]], [[[7]], [1, [7]]], [[[1, 1, 1, 2, 2, 3]], [3, [1, 2, 3]]], [[[-5, -1, -1, 0, 0, 0, 3]], [4, [-5, -1, 0, 3]]], [[[2, 2, 2, 2, 2, 2, 2, 9]], [2, [2, 9]]]],
    ref: function (nums) {
      let k = 0;
      for (let i = 0; i < nums.length; i++) if (k === 0 || nums[i] !== nums[k - 1]) nums[k++] = nums[i];
      return k;
    }
  },
  'remove-element': {
    fn: 'removeElement', params: ['nums', 'val'], cmp: 'any', io: { keepFirst: 0 }, meta: ['Remove Element', 'Easy', 'Two Pointers'],
    ask: 'Take every copy of val out of nums without a second array. Return k, how many values are not val, and leave those k values in the first k slots of nums, in any order.',
    sig: {
      py: 'def removeElement(nums: List[int], val: int) -> int:',
      js: 'function removeElement(nums, val) {',
      java: 'public int removeElement(int[] nums, int val) {',
      cpp: 'int removeElement(vector<int>& nums, int val) {',
      go: 'func removeElement(nums []int, val int) int {'
    },
    examples: [[[[3, 1, 3, 4, 3], 3], [2, [1, 4]]], [[[5, 5], 5], [0, []]], [[[2, 7, 9], 4], [3, [2, 7, 9]]]],
    hidden: [[[[], 1], [0, []]], [[[1], 1], [0, []]], [[[0, 1, 2, 2, 3, 0, 4, 2], 2], [5, [0, 1, 3, 0, 4]]], [[[4, 4, 1, 4], 1], [3, [4, 4, 4]]], [[[6, 6, 6, 7, 6], 6], [1, [7]]]],
    check: function (args, got, want) {
      if (!Array.isArray(got) || got[0] !== want[0] || !Array.isArray(got[1])) return false;
      const key = (a) => JSON.stringify(a.slice().sort((x, y) => x - y));
      return key(got[1]) === key(want[1]);
    },
    ref: function (nums, val) {
      let k = 0;
      for (const x of nums) if (x !== val) nums[k++] = x;
      return k;
    }
  },
  'remove-duplicates-from-sorted-array-ii': {
    fn: 'removeDuplicates', params: ['nums'], cmp: 'exact', io: { keepFirst: 0 }, meta: ['Remove Duplicates from Sorted Array II', 'Medium', 'Two Pointers'],
    ask: 'nums is sorted, smallest first. Keep at most two copies of each value at the front of nums, in order, and return k, how many values you kept. The tests read k and the first k slots of nums.',
    sig: {
      py: 'def removeDuplicates(nums: List[int]) -> int:',
      js: 'function removeDuplicates(nums) {',
      java: 'public int removeDuplicates(int[] nums) {',
      cpp: 'int removeDuplicates(vector<int>& nums) {',
      go: 'func removeDuplicates(nums []int) int {'
    },
    examples: [[[[1, 1, 1, 2, 3, 3, 3, 3]], [5, [1, 1, 2, 3, 3]]], [[[4, 4]], [2, [4, 4]]], [[[0, 1, 2]], [3, [0, 1, 2]]]],
    hidden: [[[[]], [0, []]], [[[9]], [1, [9]]], [[[1, 1, 1, 1]], [2, [1, 1]]], [[[-2, -2, -2, 0, 0, 5, 5, 5]], [6, [-2, -2, 0, 0, 5, 5]]], [[[1, 2, 2, 2, 3, 4, 4, 4, 4]], [6, [1, 2, 2, 3, 4, 4]]]],
    ref: function (nums) {
      let k = 0;
      for (const x of nums) if (k < 2 || x !== nums[k - 2]) nums[k++] = x;
      return k;
    }
  },
  'binary-subarrays-with-sum': {
    fn: 'numSubarraysWithSum', params: ['nums', 'goal'], cmp: 'exact', meta: ['Binary Subarrays With Sum', 'Medium', 'Sliding Window'],
    ask: 'nums holds only 0s and 1s. Count the non-empty stretches of neighbouring values whose sum is exactly goal.',
    sig: {
      py: 'def numSubarraysWithSum(nums: List[int], goal: int) -> int:',
      js: 'function numSubarraysWithSum(nums, goal) {',
      java: 'public int numSubarraysWithSum(int[] nums, int goal) {',
      cpp: 'int numSubarraysWithSum(vector<int>& nums, int goal) {',
      go: 'func numSubarraysWithSum(nums []int, goal int) int {'
    },
    examples: [[[[1, 0, 1, 0, 1], 2], 4], [[[0, 0, 0], 0], 6], [[[1, 1, 0, 1], 3], 1]],
    hidden: [[[[1], 1], 1], [[[0], 1], 0], [[[1, 0, 0, 1, 0, 1, 1], 2], 7], [[[0, 1, 0, 0, 1], 0], 4], [[[1, 1, 1, 1], 2], 3], [[[0, 0, 1, 0, 0], 1], 9]],
    ref: function (nums, goal) {
      const seen = new Map([[0, 1]]);
      let sum = 0, count = 0;
      for (const x of nums) { sum += x; count += seen.get(sum - goal) || 0; seen.set(sum, (seen.get(sum) || 0) + 1); }
      return count;
    }
  },
  'count-number-of-nice-subarrays': {
    fn: 'numberOfSubarrays', params: ['nums', 'k'], cmp: 'exact', meta: ['Count Number of Nice Subarrays', 'Medium', 'Sliding Window'],
    ask: 'Count the stretches of neighbouring values in nums that hold exactly k odd numbers.',
    sig: {
      py: 'def numberOfSubarrays(nums: List[int], k: int) -> int:',
      js: 'function numberOfSubarrays(nums, k) {',
      java: 'public int numberOfSubarrays(int[] nums, int k) {',
      cpp: 'int numberOfSubarrays(vector<int>& nums, int k) {',
      go: 'func numberOfSubarrays(nums []int, k int) int {'
    },
    examples: [[[[2, 1, 4, 3, 6], 2], 4], [[[2, 4, 6], 1], 0], [[[1, 3, 5], 1], 3]],
    hidden: [[[[1], 1], 1], [[[2], 1], 0], [[[1, 2, 1, 2, 1], 2], 4], [[[2, 2, 1, 2, 2, 1, 2], 1], 15], [[[5, 7, 9, 11], 4], 1], [[[8, 8, 8, 3], 1], 4]],
    ref: function (nums, k) {
      const seen = new Map([[0, 1]]);
      let odd = 0, count = 0;
      for (const x of nums) { odd += Math.abs(x) % 2; count += seen.get(odd - k) || 0; seen.set(odd, (seen.get(odd) || 0) + 1); }
      return count;
    }
  },
  'number-of-substrings-containing-all-three-characters': {
    fn: 'numberOfSubstrings', params: ['s'], cmp: 'exact', meta: ['Number of Substrings Containing All Three Characters', 'Medium', 'Sliding Window'],
    ask: 's uses only the letters a, b and c. Count its substrings (neighbouring letters) that hold at least one a, one b and one c.',
    sig: {
      py: 'def numberOfSubstrings(s: str) -> int:',
      js: 'function numberOfSubstrings(s) {',
      java: 'public int numberOfSubstrings(String s) {',
      cpp: 'int numberOfSubstrings(string s) {',
      go: 'func numberOfSubstrings(s string) int {'
    },
    examples: [[['abc'], 1], [['aaacb'], 3], [['bbcca'], 2]],
    hidden: [[['a'], 0], [['abcabc'], 10], [['ccbaa'], 4], [['aabbcc'], 4], [['abacbcab'], 19], [['cba'], 1]],
    ref: function (s) {
      const last = { a: -1, b: -1, c: -1 };
      let count = 0;
      for (let i = 0; i < s.length; i++) { last[s[i]] = i; count += Math.min(last.a, last.b, last.c) + 1; }
      return count;
    }
  },
  'substring-with-concatenation-of-all-words': {
    fn: 'findSubstring', params: ['s', 'words'], cmp: 'unordered', meta: ['Substring with Concatenation of All Words', 'Hard', 'Sliding Window'],
    ask: 'All words have the same length. Find every index in s where a stretch begins that is all of the words joined in some order, each used exactly as many times as it appears in the list. Return those indexes in any order.',
    sig: {
      py: 'def findSubstring(s: str, words: List[str]) -> List[int]:',
      js: 'function findSubstring(s, words) {',
      java: 'public int[] findSubstring(String s, String[] words) {',
      cpp: 'vector<int> findSubstring(string s, vector<string>& words) {',
      go: 'func findSubstring(s string, words []string) []int {'
    },
    examples: [[['dogcatcatdog', ['cat', 'dog']], [0, 6]], [['aaaa', ['aa', 'aa']], [0]], [['xyz', ['ab']], []]],
    hidden: [[['abcbcaabcab', ['ab', 'bc']], [7]], [['ababab', ['ab', 'ba']], []], [['', ['a']], []], [['aaa', ['a', 'a', 'a', 'a']], []], [['onetwoonetwo', ['one', 'two']], [0, 3, 6]], [['qqqq', ['q']], [0, 1, 2, 3]]],
    ref: function (s, words) {
      const w = words[0].length, total = w * words.length, need = new Map(), out = [];
      for (const x of words) need.set(x, (need.get(x) || 0) + 1);
      for (let i = 0; i + total <= s.length; i++) {
        const got = new Map();
        let ok = true;
        for (let j = 0; j < words.length; j++) {
          const part = s.slice(i + j * w, i + (j + 1) * w);
          got.set(part, (got.get(part) || 0) + 1);
          if (!need.has(part) || got.get(part) > need.get(part)) { ok = false; break; }
        }
        if (ok) out.push(i);
      }
      return out;
    }
  },
  'insert-delete-getrandom-o1': {
    fn: 'RandomizedSet', params: ['ops', 'args'], cmp: 'any', io: { design: true }, meta: ['Insert Delete GetRandom O(1)', 'Medium', 'Hash Map'],
    ask: 'Build a set of numbers with three calls that each take O(1) on average: insert(val) adds val and returns true if it was missing, remove(val) takes it out and returns true if it was there, and getRandom() returns one of the values in the set, each equally likely. getRandom is only called when the set is not empty. The tests check that each getRandom answer is in the set at that moment.',
    sig: {
      py: 'class RandomizedSet:',
      js: 'class RandomizedSet {',
      java: 'class RandomizedSet {',
      cpp: 'class RandomizedSet {',
      go: 'type RandomizedSet struct {'
    },
    starter: {
      py: 'class RandomizedSet:\n    def __init__(self):\n        pass\n\n    def insert(self, val: int) -> bool:\n        pass\n\n    def remove(self, val: int) -> bool:\n        pass\n\n    def getRandom(self) -> int:\n        pass\n',
      js: 'class RandomizedSet {\n  constructor() {\n  }\n  insert(val) {\n  }\n  remove(val) {\n  }\n  getRandom() {\n  }\n}\n',
      java: 'class RandomizedSet {\n    public RandomizedSet() {\n    }\n    public boolean insert(int val) {\n        return false;\n    }\n    public boolean remove(int val) {\n        return false;\n    }\n    public int getRandom() {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass RandomizedSet {\npublic:\n    RandomizedSet() {\n    }\n    bool insert(int val) {\n        return {};\n    }\n    bool remove(int val) {\n        return {};\n    }\n    int getRandom() {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype RandomizedSet struct {\n}\n\nfunc Constructor() RandomizedSet {\n    return RandomizedSet{}\n}\n\nfunc (this *RandomizedSet) Insert(val int) bool {\n    return false\n}\n\nfunc (this *RandomizedSet) Remove(val int) bool {\n    return false\n}\n\nfunc (this *RandomizedSet) GetRandom() int {\n    return 0\n}\n'
    },
    examples: [[[['insert', 'insert', 'remove', 'getRandom', 'insert'], [[4], [9], [4], [], [9]]], [true, true, true, 9, false]], [[['remove', 'insert', 'getRandom'], [[1], [1], []]], [false, true, 1]], [[['insert', 'insert', 'insert', 'remove', 'remove', 'getRandom'], [[2], [2], [3], [2], [2], []]], [true, false, true, true, false, 3]]],
    hidden: [[[['insert', 'getRandom', 'insert', 'getRandom', 'remove', 'getRandom'], [[10], [], [20], [], [10], []]], [true, 10, true, 20, true, 20]], [[['insert', 'remove', 'insert', 'remove', 'insert', 'getRandom'], [[5], [5], [5], [5], [6], []]], [true, true, true, true, true, 6]], [[['insert', 'insert', 'insert', 'insert', 'remove', 'remove', 'getRandom', 'getRandom'], [[1], [2], [3], [4], [1], [3], [], []]], [true, true, true, true, true, true, 4, 4]], [[['remove', 'remove'], [[0], [0]]], [false, false]], [[['insert', 'insert', 'remove', 'insert', 'getRandom'], [[-1], [-2], [-1], [-1], []]], [true, true, true, true, -1]]],
    check: function (args, got) {
      const ops = args[0], vals = args[1], s = new Set();
      if (!Array.isArray(got) || got.length !== ops.length) return false;
      for (let i = 0; i < ops.length; i++) {
        const v = vals[i][0];
        if (ops[i] === 'insert') { const r = !s.has(v); s.add(v); if (got[i] !== r) return false; }
        else if (ops[i] === 'remove') { const r = s.has(v); s.delete(v); if (got[i] !== r) return false; }
        else if (!s.has(got[i])) return false;
      }
      return true;
    },
    ref: class {
      constructor() { this.a = []; this.at = new Map(); }
      insert(val) { if (this.at.has(val)) return false; this.at.set(val, this.a.length); this.a.push(val); return true; }
      remove(val) {
        if (!this.at.has(val)) return false;
        const i = this.at.get(val), last = this.a.pop();
        if (last !== val) { this.a[i] = last; this.at.set(last, i); }
        this.at.delete(val);
        return true;
      }
      getRandom() { return this.a[Math.floor(Math.random() * this.a.length)]; }
    }
  },
  'number-of-ways-to-split-array': {
    fn: 'waysToSplitArray', params: ['nums'], cmp: 'exact', meta: ['Number of Ways to Split Array', 'Medium', 'Prefix Sum'],
    ask: 'Cut nums into a non-empty left part and a non-empty right part. Count the cut points where the left part sums to at least as much as the right part.',
    sig: {
      py: 'def waysToSplitArray(nums: List[int]) -> int:',
      js: 'function waysToSplitArray(nums) {',
      java: 'public int waysToSplitArray(int[] nums) {',
      cpp: 'int waysToSplitArray(vector<int>& nums) {',
      go: 'func waysToSplitArray(nums []int) int {'
    },
    examples: [[[[5, -2, 3, 1]], 2], [[[1, 1]], 1], [[[-4, 1, 1]], 0]],
    hidden: [[[[0, 0, 0]], 2], [[[10, -10, 10, -10]], 3], [[[1, 2, 3, 4, 5]], 1], [[[-1, -1, -1, -1]], 2], [[[100000, 100000, -300000, 5]], 2]],
    ref: function (nums) {
      const total = nums.reduce((a, b) => a + b, 0);
      let left = 0, count = 0;
      for (let i = 0; i + 1 < nums.length; i++) { left += nums[i]; if (left >= total - left) count++; }
      return count;
    }
  },
  'xor-queries-of-a-subarray': {
    fn: 'xorQueries', params: ['arr', 'queries'], cmp: 'exact', meta: ['XOR Queries of a Subarray', 'Medium', 'Prefix Sum'],
    ask: 'Each query [l, r] asks for the XOR of arr[l] through arr[r], both ends included. Return the answers in query order.',
    sig: {
      py: 'def xorQueries(arr: List[int], queries: List[List[int]]) -> List[int]:',
      js: 'function xorQueries(arr, queries) {',
      java: 'public int[] xorQueries(int[] arr, int[][] queries) {',
      cpp: 'vector<int> xorQueries(vector<int>& arr, vector<vector<int>>& queries) {',
      go: 'func xorQueries(arr []int, queries [][]int) []int {'
    },
    examples: [[[[3, 6, 1], [[0, 1], [1, 2], [0, 2]]], [5, 7, 4]], [[[8], [[0, 0]]], [8]], [[[1, 2, 4, 8], [[1, 3], [2, 2]]], [14, 4]]],
    hidden: [[[[5, 5, 5, 5], [[0, 3], [1, 3], [2, 2]]], [0, 5, 5]], [[[0, 0, 0], [[0, 2]]], [0]], [[[7, 3, 9, 12, 1], [[0, 4], [2, 3], [4, 4], [1, 1]]], [0, 5, 1, 3]], [[[1023, 512, 256], [[0, 1], [0, 2], [1, 2]]], [511, 255, 768]], [[[2, 4, 6, 8, 10, 12], [[3, 5], [0, 0], [1, 4]]], [14, 2, 0]]],
    ref: function (arr, queries) {
      const pre = [0];
      for (const x of arr) pre.push(pre[pre.length - 1] ^ x);
      return queries.map(([l, r]) => pre[r + 1] ^ pre[l]);
    }
  },
  'range-sum-query-2d-immutable': {
    fn: 'NumMatrix', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Range Sum Query 2D - Immutable', 'Medium', 'Prefix Sum'],
    ask: 'Build NumMatrix(matrix) once. Then sumRegion(row1, col1, row2, col2) returns the sum of the rectangle with those corners, both included, in O(1). The first op names the class and its argument is the matrix.',
    sig: {
      py: 'class NumMatrix:',
      js: 'class NumMatrix {',
      java: 'class NumMatrix {',
      cpp: 'class NumMatrix {',
      go: 'type NumMatrix struct {'
    },
    starter: {
      py: 'class NumMatrix:\n    def __init__(self, matrix: List[List[int]]):\n        pass\n\n    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:\n        pass\n',
      js: 'class NumMatrix {\n  constructor(matrix) {\n  }\n  sumRegion(row1, col1, row2, col2) {\n  }\n}\n',
      java: 'class NumMatrix {\n    public NumMatrix(int[][] matrix) {\n    }\n    public int sumRegion(int row1, int col1, int row2, int col2) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass NumMatrix {\npublic:\n    NumMatrix(vector<vector<int>>& matrix) {\n    }\n    int sumRegion(int row1, int col1, int row2, int col2) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype NumMatrix struct {\n}\n\nfunc Constructor(matrix [][]int) NumMatrix {\n    return NumMatrix{}\n}\n\nfunc (this *NumMatrix) SumRegion(row1 int, col1 int, row2 int, col2 int) int {\n    return 0\n}\n'
    },
    examples: [[[['NumMatrix', 'sumRegion', 'sumRegion'], [[[[1, 2], [3, 4]]], [0, 0, 1, 1], [1, 0, 1, 1]]], [null, 10, 7]], [[['NumMatrix', 'sumRegion'], [[[[5]]], [0, 0, 0, 0]]], [null, 5]], [[['NumMatrix', 'sumRegion', 'sumRegion', 'sumRegion'], [[[[2, 0, -1], [4, 1, 3], [0, 5, 6]]], [0, 1, 2, 2], [1, 0, 1, 2], [2, 2, 2, 2]]], [null, 14, 8, 6]]],
    hidden: [[[['NumMatrix', 'sumRegion', 'sumRegion'], [[[[-1, -2, -3]]], [0, 0, 0, 2], [0, 1, 0, 1]]], [null, -6, -2]], [[['NumMatrix', 'sumRegion'], [[[[1], [2], [3], [4]]], [1, 0, 3, 0]]], [null, 9]], [[['NumMatrix', 'sumRegion', 'sumRegion', 'sumRegion'], [[[[3, 0, 1, 4], [5, 6, 3, 2], [1, 2, 0, 1], [4, 1, 0, 1]]], [1, 1, 2, 2], [0, 0, 3, 3], [2, 0, 3, 1]]], [null, 11, 34, 8]], [[['NumMatrix', 'sumRegion', 'sumRegion'], [[[[0, 0], [0, 0]]], [0, 0, 1, 1], [1, 1, 1, 1]]], [null, 0, 0]], [[['NumMatrix', 'sumRegion', 'sumRegion'], [[[[10, -10], [-10, 10]]], [0, 0, 0, 1], [0, 1, 1, 1]]], [null, 0, 0]]],
    ref: class {
      constructor(matrix) {
        const m = matrix.length, n = m ? matrix[0].length : 0;
        this.p = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) this.p[i + 1][j + 1] = matrix[i][j] + this.p[i][j + 1] + this.p[i + 1][j] - this.p[i][j];
      }
      sumRegion(r1, c1, r2, c2) { const p = this.p; return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1]; }
    }
  },
  'make-sum-divisible-by-p': {
    fn: 'minSubarray', params: ['nums', 'p'], cmp: 'exact', meta: ['Make Sum Divisible by P', 'Medium', 'Prefix Sum'],
    ask: 'Remove the shortest stretch of neighbouring values (possibly none, but never the whole array) so that what is left sums to a multiple of p. Return that stretch\'s length, or -1 if no such stretch exists.',
    sig: {
      py: 'def minSubarray(nums: List[int], p: int) -> int:',
      js: 'function minSubarray(nums, p) {',
      java: 'public int minSubarray(int[] nums, int p) {',
      cpp: 'int minSubarray(vector<int>& nums, int p) {',
      go: 'func minSubarray(nums []int, p int) int {'
    },
    examples: [[[[4, 1, 6, 2], 5], 2], [[[2, 3, 5], 5], 0], [[[3], 2], -1]],
    hidden: [[[[1, 2, 3], 7], -1], [[[8, 8, 8], 4], 0], [[[1, 1, 1, 1, 1, 3], 3], 2], [[[5, 2, 9, 4, 6], 6], 1], [[[1000000000, 1000000000, 1000000000], 3], 0], [[[2, 2, 2], 3], 0]],
    ref: function (nums, p) {
      let need = 0;
      for (const x of nums) need = (need + x) % p;
      if (need === 0) return 0;
      const last = new Map([[0, -1]]);
      let cur = 0, best = nums.length;
      for (let i = 0; i < nums.length; i++) {
        cur = (cur + nums[i]) % p;
        const want = (cur - need + p) % p;
        if (last.has(want)) best = Math.min(best, i - last.get(want));
        last.set(cur, i);
      }
      return best === nums.length ? -1 : best;
    }
  },
  'matrix-block-sum': {
    fn: 'matrixBlockSum', params: ['mat', 'k'], cmp: 'exact', meta: ['Matrix Block Sum', 'Medium', 'Prefix Sum'],
    ask: 'Return a grid the same size as mat where each cell holds the sum of every mat cell at most k rows and at most k columns away from it (inside the grid).',
    sig: {
      py: 'def matrixBlockSum(mat: List[List[int]], k: int) -> List[List[int]]:',
      js: 'function matrixBlockSum(mat, k) {',
      java: 'public int[][] matrixBlockSum(int[][] mat, int k) {',
      cpp: 'vector<vector<int>> matrixBlockSum(vector<vector<int>>& mat, int k) {',
      go: 'func matrixBlockSum(mat [][]int, k int) [][]int {'
    },
    examples: [[[[[1, 2], [3, 4]], 1], [[10, 10], [10, 10]]], [[[[5]], 2], [[5]]], [[[[1, 0, 2]], 0], [[1, 0, 2]]]],
    hidden: [[[[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1], [[12, 21, 16], [27, 45, 33], [24, 39, 28]]], [[[[1, 1, 1, 1]], 1], [[2, 3, 3, 2]]], [[[[2], [4], [6]], 1], [[6], [12], [10]]], [[[[0, -1], [-2, 3]], 0], [[0, -1], [-2, 3]]], [[[[1, 2, 3], [4, 5, 6]], 2], [[21, 21, 21], [21, 21, 21]]]],
    ref: function (mat, k) {
      const m = mat.length, n = mat[0].length;
      return mat.map((row, i) => row.map((_, j) => {
        let s = 0;
        for (let a = Math.max(0, i - k); a <= Math.min(m - 1, i + k); a++) for (let b = Math.max(0, j - k); b <= Math.min(n - 1, j + k); b++) s += mat[a][b];
        return s;
      }));
    }
  },
  'number-of-submatrices-that-sum-to-target': {
    fn: 'numSubmatrixSumTarget', params: ['matrix', 'target'], cmp: 'exact', meta: ['Number of Submatrices That Sum to Target', 'Hard', 'Prefix Sum'],
    ask: 'Count the rectangles of cells in matrix (any size, at least one cell) whose values add up to target.',
    sig: {
      py: 'def numSubmatrixSumTarget(matrix: List[List[int]], target: int) -> int:',
      js: 'function numSubmatrixSumTarget(matrix, target) {',
      java: 'public int numSubmatrixSumTarget(int[][] matrix, int target) {',
      cpp: 'int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {',
      go: 'func numSubmatrixSumTarget(matrix [][]int, target int) int {'
    },
    examples: [[[[[2, -2], [0, 1]], 0], 2], [[[[1]], 1], 1], [[[[1, 2, 3]], 3], 2]],
    hidden: [[[[[0, 0], [0, 0]], 0], 9], [[[[1, 1], [1, 1]], 2], 4], [[[[5]], 0], 0], [[[[1, -1, 1], [-1, 1, -1]], 1], 4], [[[[3, 1, 2], [1, 2, 3], [2, 3, 1]], 6], 6]],
    ref: function (matrix, target) {
      const m = matrix.length, n = matrix[0].length;
      let count = 0;
      for (let top = 0; top < m; top++) {
        const col = new Array(n).fill(0);
        for (let bot = top; bot < m; bot++) {
          for (let j = 0; j < n; j++) col[j] += matrix[bot][j];
          const seen = new Map([[0, 1]]);
          let s = 0;
          for (let j = 0; j < n; j++) { s += col[j]; count += seen.get(s - target) || 0; seen.set(s, (seen.get(s) || 0) + 1); }
        }
      }
      return count;
    }
  },
  'guess-number-higher-or-lower': {
    fn: 'guessNumber', params: ['n', 'guess'], cmp: 'exact', io: { args: [null, 'guess'] }, meta: ['Guess Number Higher or Lower', 'Easy', 'Binary Search'],
    ask: 'A number between 1 and n is hidden. Ask guess(x): it returns 0 when x is the number, -1 when the number is lower than x, and 1 when it is higher. Return the number, asking at most 64 times. (In the tests, the second input is the hidden number; your code only ever sees the guess function.)',
    sig: {
      py: 'def guessNumber(n: int, guess: Callable[[int], int]) -> int:',
      js: 'function guessNumber(n, guess) {',
      java: 'public int guessNumber(int n, IntUnaryOperator guess) {',
      cpp: 'int guessNumber(int n, function<int(int)> guess) {',
      go: 'func guessNumber(n int, guess func(int) int) int {'
    },
    examples: [[[10, 6], 6], [[1, 1], 1], [[100, 100], 100]],
    hidden: [[[50, 1], 1], [[2, 2], 2], [[1000, 999], 999], [[2147483647, 1702766719], 1702766719], [[7, 4], 4]],
    ref: function (n, guess) {
      let lo = 1, hi = n;
      while (lo <= hi) { const m = Math.floor((lo + hi) / 2), r = guess(m); if (r === 0) return m; if (r < 0) hi = m - 1; else lo = m + 1; }
      return -1;
    }
  },
  'first-bad-version': {
    fn: 'firstBadVersion', params: ['n', 'isBadVersion'], cmp: 'exact', io: { args: [null, 'badver'] }, meta: ['First Bad Version', 'Easy', 'Binary Search'],
    ask: 'Builds 1 to n were released in order, and from some build on every build is broken. isBadVersion(v) tells you whether build v is broken. Return the first broken build, asking at most 64 times. (In the tests, the second input is that first broken build; your code only sees the function.)',
    sig: {
      py: 'def firstBadVersion(n: int, isBadVersion: Callable[[int], bool]) -> int:',
      js: 'function firstBadVersion(n, isBadVersion) {',
      java: 'public int firstBadVersion(int n, IntPredicate isBadVersion) {',
      cpp: 'int firstBadVersion(int n, function<bool(int)> isBadVersion) {',
      go: 'func firstBadVersion(n int, isBadVersion func(int) bool) int {'
    },
    examples: [[[5, 4], 4], [[1, 1], 1], [[9, 1], 1]],
    hidden: [[[100, 100], 100], [[2, 2], 2], [[2147483647, 2147483647], 2147483647], [[64, 33], 33], [[3, 2], 2]],
    ref: function (n, isBadVersion) {
      let lo = 1, hi = n;
      while (lo < hi) { const m = Math.floor((lo + hi) / 2); if (isBadVersion(m)) hi = m; else lo = m + 1; }
      return lo;
    }
  },
  'find-k-closest-elements': {
    fn: 'findClosestElements', params: ['arr', 'k', 'x'], cmp: 'exact', meta: ['Find K Closest Elements', 'Medium', 'Binary Search'],
    ask: 'arr is sorted. Return the k values of arr closest to x, sorted. When two values are equally close, the smaller one is closer.',
    sig: {
      py: 'def findClosestElements(arr: List[int], k: int, x: int) -> List[int]:',
      js: 'function findClosestElements(arr, k, x) {',
      java: 'public int[] findClosestElements(int[] arr, int k, int x) {',
      cpp: 'vector<int> findClosestElements(vector<int>& arr, int k, int x) {',
      go: 'func findClosestElements(arr []int, k int, x int) []int {'
    },
    examples: [[[[1, 3, 5, 7, 9], 2, 6], [5, 7]], [[[2, 4, 4, 8], 3, 4], [2, 4, 4]], [[[1, 2], 1, 10], [2]]],
    hidden: [[[[1, 2, 3, 4, 5], 4, -1], [1, 2, 3, 4]], [[[1, 1, 1, 10, 10, 10], 1, 9], [10]], [[[0, 0, 1, 2, 3, 3, 4, 7, 7, 8], 3, 5], [3, 3, 4]], [[[-5, -2, 0, 3], 2, -1], [-2, 0]], [[[10, 20, 30], 3, 15], [10, 20, 30]], [[[1, 5, 10], 1, 3], [1]]],
    ref: function (arr, k, x) {
      let lo = 0, hi = arr.length - k;
      while (lo < hi) { const m = (lo + hi) >> 1; if (x - arr[m] > arr[m + k] - x) lo = m + 1; else hi = m; }
      return arr.slice(lo, lo + k);
    }
  },
  'find-minimum-in-rotated-sorted-array-ii': {
    fn: 'findMin', params: ['nums'], cmp: 'exact', meta: ['Find Minimum in Rotated Sorted Array II', 'Hard', 'Binary Search'],
    ask: 'nums was sorted, smallest first, then rotated: some front part was moved to the back. Values may repeat. Return the smallest value.',
    sig: {
      py: 'def findMin(nums: List[int]) -> int:',
      js: 'function findMin(nums) {',
      java: 'public int findMin(int[] nums) {',
      cpp: 'int findMin(vector<int>& nums) {',
      go: 'func findMin(nums []int) int {'
    },
    examples: [[[[4, 4, 5, 1, 2, 4]], 1], [[[3, 3, 3]], 3], [[[2, 2, 0, 1, 2]], 0]],
    hidden: [[[[1]], 1], [[[1, 1, 1, 0, 1]], 0], [[[1, 0, 1, 1, 1]], 0], [[[5, 6, 7, 1, 2, 3, 4]], 1], [[[2, 2, 2, 2, 2, 1, 2]], 1], [[[-3, -1, 0, 4]], -3]],
    ref: function (nums) {
      let lo = 0, hi = nums.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (nums[m] > nums[hi]) lo = m + 1; else if (nums[m] < nums[hi]) hi = m; else hi--; }
      return nums[lo];
    }
  },
  'find-in-mountain-array': {
    fn: 'findInMountainArray', params: ['target', 'mountainArr'], cmp: 'exact', io: { args: [null, 'mountain'] }, meta: ['Find in Mountain Array', 'Hard', 'Binary Search'],
    ask: 'A mountain array rises strictly to one peak and then falls strictly. You can only read it through mountainArr.get(i) and mountainArr.length(), and get may be called at most 100 times. Return the smallest index holding target, or -1.',
    sig: {
      py: 'def findInMountainArray(target: int, mountainArr) -> int:',
      js: 'function findInMountainArray(target, mountainArr) {',
      java: 'public int findInMountainArray(int target, MountainArray mountainArr) {',
      cpp: 'int findInMountainArray(int target, MountainArray &mountainArr) {',
      go: 'func findInMountainArray(target int, mountainArr *MountainArray) int {'
    },
    examples: [[[3, [1, 3, 6, 4, 3]], 1], [[9, [0, 2, 1]], -1], [[1, [1, 5, 1]], 0]],
    hidden: [[[4, [1, 3, 6, 4, 3]], 3], [[6, [1, 3, 6, 4, 3]], 2], [[0, [0, 5, 3, 1]], 0], [[2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2]], 1], [[10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8]], 9], [[7, [3, 5, 3, 2, 0]], -1]],
    ref: function (target, arr) {
      const n = arr.length();
      let lo = 0, hi = n - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (arr.get(m) < arr.get(m + 1)) lo = m + 1; else hi = m; }
      const peak = lo;
      lo = 0; hi = peak;
      while (lo <= hi) { const m = (lo + hi) >> 1, v = arr.get(m); if (v === target) return m; if (v < target) lo = m + 1; else hi = m - 1; }
      lo = peak + 1; hi = n - 1;
      while (lo <= hi) { const m = (lo + hi) >> 1, v = arr.get(m); if (v === target) return m; if (v > target) lo = m + 1; else hi = m - 1; }
      return -1;
    }
  },
  'determine-whether-matrix-can-be-obtained-by-rotation': {
    fn: 'findRotation', params: ['mat', 'target'], cmp: 'exact', meta: ['Determine Whether Matrix Can Be Obtained By Rotation', 'Easy', 'Matrix'],
    ask: 'Both grids are square and the same size. Return true if turning mat by quarter turns (zero to three of them) can make it equal to target.',
    sig: {
      py: 'def findRotation(mat: List[List[int]], target: List[List[int]]) -> bool:',
      js: 'function findRotation(mat, target) {',
      java: 'public boolean findRotation(int[][] mat, int[][] target) {',
      cpp: 'bool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {',
      go: 'func findRotation(mat [][]int, target [][]int) bool {'
    },
    examples: [[[[[1, 0], [0, 0]], [[0, 1], [0, 0]]], true], [[[[1, 0], [0, 1]], [[1, 1], [0, 0]]], false], [[[[0, 1, 0], [1, 1, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 1], [0, 1, 0]]], true]],
    hidden: [[[[[5]], [[5]]], true], [[[[5]], [[6]]], false], [[[[1, 2], [3, 4]], [[3, 1], [4, 2]]], true], [[[[1, 2], [3, 4]], [[2, 1], [4, 3]]], false], [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[3, 6, 9], [2, 5, 8], [1, 4, 7]]], true]],
    ref: function (mat, target) {
      let g = mat;
      for (let t = 0; t < 4; t++) {
        if (JSON.stringify(g) === JSON.stringify(target)) return true;
        const n = g.length;
        g = g.map((_, i) => g.map((__, j) => g[n - 1 - j][i]));
      }
      return false;
    }
  },
  'diagonal-traverse': {
    fn: 'findDiagonalOrder', params: ['mat'], cmp: 'exact', meta: ['Diagonal Traverse', 'Medium', 'Matrix'],
    ask: 'Read mat along its anti-diagonals (cells where row plus column is the same), starting at the top-left cell. The first diagonal is read going up and to the right, the next going down and to the left, and so on, switching each time. Return the values in that order.',
    sig: {
      py: 'def findDiagonalOrder(mat: List[List[int]]) -> List[int]:',
      js: 'function findDiagonalOrder(mat) {',
      java: 'public int[] findDiagonalOrder(int[][] mat) {',
      cpp: 'vector<int> findDiagonalOrder(vector<vector<int>>& mat) {',
      go: 'func findDiagonalOrder(mat [][]int) []int {'
    },
    examples: [[[[[1, 2], [3, 4]]], [1, 2, 3, 4]], [[[[1, 2, 3], [4, 5, 6]]], [1, 2, 4, 5, 3, 6]], [[[[1], [2], [3]]], [1, 2, 3]]],
    hidden: [[[[[7]]], [7]], [[[[1, 2, 3, 4]]], [1, 2, 3, 4]], [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [1, 2, 4, 7, 5, 3, 6, 8, 9]], [[[[1, 2], [3, 4], [5, 6]]], [1, 2, 3, 5, 4, 6]], [[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], [1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12]]],
    ref: function (mat) {
      const m = mat.length, n = mat[0].length, out = [];
      for (let d = 0; d < m + n - 1; d++) {
        const cells = [];
        for (let i = Math.max(0, d - n + 1); i <= Math.min(m - 1, d); i++) cells.push(mat[i][d - i]);
        if (d % 2 === 0) cells.reverse();
        out.push(...cells);
      }
      return out;
    }
  },
  'sort-the-matrix-diagonally': {
    fn: 'diagonalSort', params: ['mat'], cmp: 'exact', meta: ['Sort the Matrix Diagonally', 'Medium', 'Matrix'],
    ask: 'Sort each diagonal of mat that runs down and to the right, smallest at its top-left end, and return the grid.',
    sig: {
      py: 'def diagonalSort(mat: List[List[int]]) -> List[List[int]]:',
      js: 'function diagonalSort(mat) {',
      java: 'public int[][] diagonalSort(int[][] mat) {',
      cpp: 'vector<vector<int>> diagonalSort(vector<vector<int>>& mat) {',
      go: 'func diagonalSort(mat [][]int) [][]int {'
    },
    examples: [[[[[3, 1], [2, 1]]], [[1, 1], [2, 3]]], [[[[9]]], [[9]]], [[[[5, 4, 3], [2, 1, 0]]], [[1, 0, 3], [2, 5, 4]]]],
    hidden: [[[[[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]], [[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]], [[[[1, 2, 3]]], [[1, 2, 3]]], [[[[3], [2], [1]]], [[3], [2], [1]]], [[[[9, 8, 7], [6, 5, 4], [3, 2, 1]]], [[1, 4, 7], [2, 5, 8], [3, 6, 9]]], [[[[4, 4], [4, 4], [1, 9]]], [[4, 4], [4, 4], [1, 9]]]],
    ref: function (mat) {
      const m = mat.length, n = mat[0].length, out = mat.map((r) => r.slice()), groups = new Map();
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) { const k = i - j; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(mat[i][j]); }
      groups.forEach((v) => v.sort((a, b) => b - a));
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) out[i][j] = groups.get(i - j).pop();
      return out;
    }
  },
  'search-a-2d-matrix-ii': {
    fn: 'searchMatrix', params: ['matrix', 'target'], cmp: 'exact', meta: ['Search a 2D Matrix II', 'Medium', 'Matrix'],
    ask: 'Every row of matrix rises from left to right and every column rises from top to bottom. Return true if target is somewhere in it. Aim for better than reading every cell.',
    sig: {
      py: 'def searchMatrix(matrix: List[List[int]], target: int) -> bool:',
      js: 'function searchMatrix(matrix, target) {',
      java: 'public boolean searchMatrix(int[][] matrix, int target) {',
      cpp: 'bool searchMatrix(vector<vector<int>>& matrix, int target) {',
      go: 'func searchMatrix(matrix [][]int, target int) bool {'
    },
    examples: [[[[[1, 4], [2, 5]], 5], true], [[[[1, 4], [2, 5]], 3], false], [[[[-5]], -5], true]],
    hidden: [[[[[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]], 9], true], [[[[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]], 10], false], [[[[1, 2, 3]], 0], false], [[[[1], [3], [5]], 5], true], [[[[2, 3], [4, 6]], 7], false]],
    ref: function (matrix, target) {
      let r = 0, c = matrix[0].length - 1;
      while (r < matrix.length && c >= 0) { const v = matrix[r][c]; if (v === target) return true; if (v > target) c--; else r++; }
      return false;
    }
  },
  'meeting-rooms': {
    fn: 'canAttendMeetings', params: ['intervals'], cmp: 'exact', meta: ['Meeting Rooms', 'Easy', 'Intervals'],
    ask: 'Each meeting is [start, end]. Return true if one person can go to all of them: no two meetings overlap. A meeting may start the moment another ends.',
    sig: {
      py: 'def canAttendMeetings(intervals: List[List[int]]) -> bool:',
      js: 'function canAttendMeetings(intervals) {',
      java: 'public boolean canAttendMeetings(int[][] intervals) {',
      cpp: 'bool canAttendMeetings(vector<vector<int>>& intervals) {',
      go: 'func canAttendMeetings(intervals [][]int) bool {'
    },
    examples: [[[[[0, 5], [5, 9]]], true], [[[[1, 4], [2, 3]]], false], [[[]], true]],
    hidden: [[[[[7, 10], [2, 4]]], true], [[[[1, 2], [2, 3], [1, 3]]], false], [[[[5, 8], [9, 15], [8, 9]]], true], [[[[0, 1]]], true], [[[[3, 6], [0, 4]]], false]],
    ref: function (intervals) {
      const a = intervals.slice().sort((x, y) => x[0] - y[0]);
      for (let i = 1; i < a.length; i++) if (a[i][0] < a[i - 1][1]) return false;
      return true;
    }
  },
  'meeting-rooms-ii': {
    fn: 'minMeetingRooms', params: ['intervals'], cmp: 'exact', meta: ['Meeting Rooms II', 'Medium', 'Intervals'],
    ask: 'Each meeting is [start, end]. Return the fewest rooms that fit every meeting, when a room is free again the moment its meeting ends.',
    sig: {
      py: 'def minMeetingRooms(intervals: List[List[int]]) -> int:',
      js: 'function minMeetingRooms(intervals) {',
      java: 'public int minMeetingRooms(int[][] intervals) {',
      cpp: 'int minMeetingRooms(vector<vector<int>>& intervals) {',
      go: 'func minMeetingRooms(intervals [][]int) int {'
    },
    examples: [[[[[1, 5], [2, 6], [8, 9]]], 2], [[[[4, 7], [7, 9]]], 1], [[[[1, 10], [2, 9], [3, 8]]], 3]],
    hidden: [[[[]], 0], [[[[0, 1]]], 1], [[[[1, 3], [3, 5], [2, 4], [4, 6]]], 2], [[[[9, 10], [4, 9], [4, 17]]], 2], [[[[1, 2], [1, 2], [1, 2], [2, 3]]], 3]],
    ref: function (intervals) {
      const s = intervals.map((x) => x[0]).sort((a, b) => a - b), e = intervals.map((x) => x[1]).sort((a, b) => a - b);
      let rooms = 0, j = 0;
      for (let i = 0; i < s.length; i++) { if (s[i] < e[j]) rooms++; else j++; }
      return rooms;
    }
  },
  'my-calendar-ii': {
    fn: 'MyCalendarTwo', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['My Calendar II', 'Medium', 'Intervals'],
    ask: 'Keep a calendar where any moment may be double booked but never triple booked. book(start, end) covers the time from start up to, not including, end. Add it and return true if no moment would then have three bookings; otherwise leave the calendar unchanged and return false.',
    sig: {
      py: 'class MyCalendarTwo:',
      js: 'class MyCalendarTwo {',
      java: 'class MyCalendarTwo {',
      cpp: 'class MyCalendarTwo {',
      go: 'type MyCalendarTwo struct {'
    },
    starter: {
      py: 'class MyCalendarTwo:\n    def __init__(self):\n        pass\n\n    def book(self, start: int, end: int) -> bool:\n        pass\n',
      js: 'class MyCalendarTwo {\n  constructor() {\n  }\n  book(start, end) {\n  }\n}\n',
      java: 'class MyCalendarTwo {\n    public MyCalendarTwo() {\n    }\n    public boolean book(int start, int end) {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyCalendarTwo {\npublic:\n    MyCalendarTwo() {\n    }\n    bool book(int start, int end) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype MyCalendarTwo struct {\n}\n\nfunc Constructor() MyCalendarTwo {\n    return MyCalendarTwo{}\n}\n\nfunc (this *MyCalendarTwo) Book(start int, end int) bool {\n    return false\n}\n'
    },
    examples: [[[['book', 'book', 'book', 'book'], [[1, 5], [3, 7], [4, 6], [7, 9]]], [true, true, false, true]], [[['book'], [[0, 1]]], [true]], [[['book', 'book', 'book'], [[5, 10], [5, 10], [9, 11]]], [true, true, false]]],
    hidden: [[[['book', 'book', 'book', 'book', 'book'], [[10, 20], [50, 60], [10, 40], [5, 15], [5, 10]]], [true, true, true, false, true]], [[['book', 'book', 'book'], [[1, 2], [1, 2], [2, 3]]], [true, true, true]], [[['book', 'book', 'book', 'book'], [[0, 10], [10, 20], [5, 15], [9, 11]]], [true, true, true, false]], [[['book', 'book', 'book'], [[3, 4], [3, 4], [3, 4]]], [true, true, false]], [[['book', 'book', 'book', 'book'], [[1, 100], [20, 30], [29, 31], [30, 40]]], [true, true, false, true]]],
    ref: class {
      constructor() { this.one = []; this.two = []; }
      book(s, e) {
        if (this.two.some(([a, b]) => s < b && a < e)) return false;
        this.one.forEach(([a, b]) => { if (s < b && a < e) this.two.push([Math.max(a, s), Math.min(b, e)]); });
        this.one.push([s, e]);
        return true;
      }
    }
  },
  'maximum-number-of-events-that-can-be-attended': {
    fn: 'maxEvents', params: ['events'], cmp: 'exact', meta: ['Maximum Number of Events That Can Be Attended', 'Medium', 'Intervals'],
    ask: 'Event [start, end] can be attended on any one day from start to end, both included. You attend at most one event per day. Return the most events you can attend.',
    sig: {
      py: 'def maxEvents(events: List[List[int]]) -> int:',
      js: 'function maxEvents(events) {',
      java: 'public int maxEvents(int[][] events) {',
      cpp: 'int maxEvents(vector<vector<int>>& events) {',
      go: 'func maxEvents(events [][]int) int {'
    },
    examples: [[[[[1, 2], [2, 3], [3, 4]]], 3], [[[[1, 1], [1, 1], [1, 1]]], 1], [[[[1, 5], [1, 1], [2, 2]]], 3]],
    hidden: [[[[[1, 2], [1, 2], [1, 2], [3, 3]]], 3], [[[[1, 10]]], 1], [[[[1, 2], [2, 2], [3, 3], [3, 4], [3, 4]]], 4], [[[[5, 5], [1, 5], [1, 5], [1, 5], [1, 5], [1, 5]]], 5], [[[[2, 3], [1, 1], [1, 2]]], 3]],
    ref: function (events) {
      const ev = events.slice().sort((a, b) => a[0] - b[0]);
      const heap = [];
      const push = (x) => { heap.push(x); let i = heap.length - 1; while (i && heap[(i - 1) >> 1] > heap[i]) { [heap[i], heap[(i - 1) >> 1]] = [heap[(i - 1) >> 1], heap[i]]; i = (i - 1) >> 1; } };
      const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < heap.length && heap[l] < heap[m]) m = l; if (r < heap.length && heap[r] < heap[m]) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } } return top; };
      let i = 0, day = 0, count = 0;
      while (i < ev.length || heap.length) {
        if (!heap.length) day = Math.max(day, ev[i][0]);
        while (i < ev.length && ev[i][0] <= day) push(ev[i++][1]);
        while (heap.length && heap[0] < day) pop();
        if (heap.length) { pop(); count++; day++; }
      }
      return count;
    }
  },
  'my-calendar-iii': {
    fn: 'MyCalendarThree', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['My Calendar III', 'Hard', 'Intervals'],
    ask: 'Every booking is kept. book(start, end) adds the time from start up to, not including, end, then returns the largest number of bookings that overlap at any one moment so far.',
    sig: {
      py: 'class MyCalendarThree:',
      js: 'class MyCalendarThree {',
      java: 'class MyCalendarThree {',
      cpp: 'class MyCalendarThree {',
      go: 'type MyCalendarThree struct {'
    },
    starter: {
      py: 'class MyCalendarThree:\n    def __init__(self):\n        pass\n\n    def book(self, start: int, end: int) -> int:\n        pass\n',
      js: 'class MyCalendarThree {\n  constructor() {\n  }\n  book(start, end) {\n  }\n}\n',
      java: 'class MyCalendarThree {\n    public MyCalendarThree() {\n    }\n    public int book(int start, int end) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyCalendarThree {\npublic:\n    MyCalendarThree() {\n    }\n    int book(int start, int end) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype MyCalendarThree struct {\n}\n\nfunc Constructor() MyCalendarThree {\n    return MyCalendarThree{}\n}\n\nfunc (this *MyCalendarThree) Book(start int, end int) int {\n    return 0\n}\n'
    },
    examples: [[[['book', 'book', 'book'], [[2, 6], [4, 9], [5, 7]]], [1, 2, 3]], [[['book', 'book'], [[1, 2], [2, 3]]], [1, 1]], [[['book', 'book', 'book'], [[0, 10], [20, 30], [5, 25]]], [1, 1, 2]]],
    hidden: [[[['book', 'book', 'book', 'book'], [[1, 2], [1, 2], [1, 2], [5, 6]]], [1, 2, 3, 3]], [[['book'], [[0, 1000000000]]], [1]], [[['book', 'book', 'book', 'book', 'book'], [[10, 20], [50, 60], [10, 40], [5, 15], [5, 10]]], [1, 1, 2, 3, 3]], [[['book', 'book', 'book'], [[1, 4], [4, 8], [3, 5]]], [1, 1, 2]], [[['book', 'book', 'book', 'book'], [[0, 5], [1, 4], [2, 3], [3, 10]]], [1, 2, 3, 3]]],
    ref: class {
      constructor() { this.d = new Map(); }
      book(s, e) {
        this.d.set(s, (this.d.get(s) || 0) + 1);
        this.d.set(e, (this.d.get(e) || 0) - 1);
        let cur = 0, best = 0;
        [...this.d.keys()].sort((a, b) => a - b).forEach((k) => { cur += this.d.get(k); best = Math.max(best, cur); });
        return best;
      }
    }
  },
  'minimum-interval-to-include-each-query': {
    fn: 'minInterval', params: ['intervals', 'queries'], cmp: 'exact', meta: ['Minimum Interval to Include Each Query', 'Hard', 'Intervals'],
    ask: 'Interval [l, r] covers every whole number from l to r and has size r - l + 1. For each query q, return the size of the smallest interval that covers q, or -1 if none does. Answers go in query order.',
    sig: {
      py: 'def minInterval(intervals: List[List[int]], queries: List[int]) -> List[int]:',
      js: 'function minInterval(intervals, queries) {',
      java: 'public int[] minInterval(int[][] intervals, int[] queries) {',
      cpp: 'vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {',
      go: 'func minInterval(intervals [][]int, queries []int) []int {'
    },
    examples: [[[[[1, 3], [2, 8]], [2, 5, 9]], [3, 7, -1]], [[[[5, 5]], [5, 4]], [1, -1]], [[[[1, 10], [3, 4]], [4, 1, 10]], [2, 10, 10]]],
    hidden: [[[[[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]], [3, 3, 1, 4]], [[[[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]], [2, -1, 4, 6]], [[[[1, 1]], [1, 1, 2]], [1, 1, -1]], [[[[4, 8], [6, 7]], [6, 8, 3]], [2, 5, -1]], [[[[1, 100000]], [50000]], [100000]]],
    ref: function (intervals, queries) {
      return queries.map((q) => {
        let best = -1;
        for (const [l, r] of intervals) if (l <= q && q <= r && (best < 0 || r - l + 1 < best)) best = r - l + 1;
        return best;
      });
    }
  },
  'maximize-sum-of-array-after-k-negations': {
    fn: 'largestSumAfterKNegations', params: ['nums', 'k'], cmp: 'exact', meta: ['Maximize Sum Of Array After K Negations', 'Easy', 'Greedy'],
    ask: 'Do exactly k flips; each flip changes the sign of one value (the same value may be flipped again). Return the largest total nums can have afterwards.',
    sig: {
      py: 'def largestSumAfterKNegations(nums: List[int], k: int) -> int:',
      js: 'function largestSumAfterKNegations(nums, k) {',
      java: 'public int largestSumAfterKNegations(int[] nums, int k) {',
      cpp: 'int largestSumAfterKNegations(vector<int>& nums, int k) {',
      go: 'func largestSumAfterKNegations(nums []int, k int) int {'
    },
    examples: [[[[3, -1, 2], 1], 6], [[[-4, -3, 1], 3], 6], [[[2, 5], 2], 7]],
    hidden: [[[[0], 5], 0], [[[-1], 2], -1], [[[-8, -5, -5, -3, -2, 3], 6], 22], [[[1, 2, 3], 3], 4], [[[-2, 9, 9, 8, 4], 5], 32]],
    ref: function (nums, k) {
      const a = nums.slice().sort((x, y) => x - y);
      for (let i = 0; i < a.length && k > 0 && a[i] < 0; i++, k--) a[i] = -a[i];
      const sum = a.reduce((x, y) => x + y, 0), min = Math.min(...a);
      return k % 2 ? sum - 2 * min : sum;
    }
  },
  'dota2-senate': {
    fn: 'predictPartyVictory', params: ['senate'], cmp: 'exact', meta: ['Dota2 Senate', 'Medium', 'Greedy'],
    ask: 'Each letter of senate is a senator of party R (Radiant) or D (Dire). Senators act in order, round after round; a senator who acts removes the next opposing senator still in the game. Return "Radiant" or "Dire": the party left when the other is gone.',
    sig: {
      py: 'def predictPartyVictory(senate: str) -> str:',
      js: 'function predictPartyVictory(senate) {',
      java: 'public String predictPartyVictory(String senate) {',
      cpp: 'string predictPartyVictory(string senate) {',
      go: 'func predictPartyVictory(senate string) string {'
    },
    examples: [[['RD'], 'Radiant'], [['DRR'], 'Radiant'], [['DDRRR'], 'Dire']],
    hidden: [[['R'], 'Radiant'], [['D'], 'Dire'], [['RDD'], 'Dire'], [['DRDRDR'], 'Dire'], [['RRDDD'], 'Radiant'], [['DRRDRDRDRDDRDRDR'], 'Radiant']],
    ref: function (senate) {
      const n = senate.length, r = [], d = [];
      for (let i = 0; i < n; i++) (senate[i] === 'R' ? r : d).push(i);
      let a = 0, b = 0;
      while (a < r.length && b < d.length) { if (r[a] < d[b]) r.push(r[a] + n); else d.push(d[b] + n); a++; b++; }
      return a < r.length ? 'Radiant' : 'Dire';
    }
  },
  'minimum-number-of-taps-to-open-to-water-a-garden': {
    fn: 'minTaps', params: ['n', 'ranges'], cmp: 'exact', meta: ['Minimum Number of Taps to Open to Water a Garden', 'Hard', 'Greedy'],
    ask: 'A garden runs from 0 to n with a tap at each whole point i from 0 to n. Tap i waters from i - ranges[i] to i + ranges[i]. Return the fewest taps that water the whole garden from 0 to n, or -1 if that cannot be done.',
    sig: {
      py: 'def minTaps(n: int, ranges: List[int]) -> int:',
      js: 'function minTaps(n, ranges) {',
      java: 'public int minTaps(int n, int[] ranges) {',
      cpp: 'int minTaps(int n, vector<int>& ranges) {',
      go: 'func minTaps(n int, ranges []int) int {'
    },
    examples: [[[3, [1, 0, 1, 0]], 2], [[2, [0, 0, 0]], -1], [[4, [0, 0, 4, 0, 0]], 1]],
    hidden: [[[5, [3, 4, 1, 1, 0, 0]], 1], [[1, [1, 0]], 1], [[7, [1, 2, 1, 0, 2, 1, 0, 1]], 3], [[8, [4, 0, 0, 0, 0, 0, 0, 0, 4]], 2], [[8, [4, 0, 0, 0, 4, 0, 0, 0, 4]], 1], [[3, [0, 0, 0, 3]], 1]],
    ref: function (n, ranges) {
      const reach = new Array(n + 1).fill(0);
      ranges.forEach((r, i) => { const l = Math.max(0, i - r); reach[l] = Math.max(reach[l], Math.min(n, i + r)); });
      let taps = 0, end = 0, far = 0;
      for (let i = 0; i < n; i++) {
        far = Math.max(far, reach[i]);
        if (i === end) { if (far <= i) return -1; taps++; end = far; }
      }
      return taps;
    }
  },
  'minimum-remove-to-make-valid-parentheses': {
    fn: 'minRemoveToMakeValid', params: ['s'], cmp: 'any', meta: ['Minimum Remove to Make Valid Parentheses', 'Medium', 'Stack'],
    ask: 's has letters and the brackets ( and ). Delete as few brackets as possible so every bracket is matched, and return the result. When several results are possible, any of them is accepted.',
    sig: {
      py: 'def minRemoveToMakeValid(s: str) -> str:',
      js: 'function minRemoveToMakeValid(s) {',
      java: 'public String minRemoveToMakeValid(String s) {',
      cpp: 'string minRemoveToMakeValid(string s) {',
      go: 'func minRemoveToMakeValid(s string) string {'
    },
    examples: [[['a)b(c)d'], 'ab(c)d'], [['))(('], ''], [['(x(y)'], 'x(y)']],
    hidden: [[[''], ''], [['abc'], 'abc'], [['(a(b(c)d)'], 'a(b(c)d)'], [['())()((('], '()()'], [['x)(y)(z'], 'x(y)z'], [['((()))'], '((()))']],
    check: function (args, got, want) {
      if (typeof got !== 'string' || got.length !== want.length) return false;
      let bal = 0;
      for (const ch of got) { if (ch === '(') bal++; else if (ch === ')' && --bal < 0) return false; }
      if (bal) return false;
      let i = 0;
      for (const ch of args[0]) if (i < got.length && got[i] === ch) i++;
      return i === got.length;
    },
    ref: function (s) {
      const a = s.split(''), open = [];
      a.forEach((ch, i) => { if (ch === '(') open.push(i); else if (ch === ')') { if (open.length) open.pop(); else a[i] = ''; } });
      open.forEach((i) => { a[i] = ''; });
      return a.join('');
    }
  },
  'basic-calculator': {
    fn: 'calculate', params: ['s'], cmp: 'exact', meta: ['Basic Calculator', 'Hard', 'Stack'],
    ask: 'Evaluate s, which holds whole numbers, +, -, brackets and spaces. A minus may also stand before a number or a bracket to negate it. Do not use a built-in expression evaluator.',
    sig: {
      py: 'def calculate(s: str) -> int:',
      js: 'function calculate(s) {',
      java: 'public int calculate(String s) {',
      cpp: 'int calculate(string s) {',
      go: 'func calculate(s string) int {'
    },
    examples: [[['2-(5-1)'], -2], [['-(2+3)'], -5], [[' 10 + 20 - 3 '], 27]],
    hidden: [[['7'], 7], [['(1+(4+5+2)-3)+(6+8)'], 23], [['- (3 - (-2 + 4))'], -1], [['1-(     -2)'], 3], [['2147483647'], 2147483647], [['((12)) - 2 - (3 - (4 - 5))'], 6]],
    ref: function (s) {
      let res = 0, sign = 1, num = 0;
      const st = [];
      for (const ch of s) {
        if (ch >= '0' && ch <= '9') num = num * 10 + (ch.charCodeAt(0) - 48);
        else if (ch === '+' || ch === '-') { res += sign * num; num = 0; sign = ch === '+' ? 1 : -1; }
        else if (ch === '(') { st.push(res, sign); res = 0; sign = 1; }
        else if (ch === ')') { res += sign * num; num = 0; const sg = st.pop(), prev = st.pop(); res = prev + sg * res; }
      }
      return res + sign * num;
    }
  },
  'furthest-building-you-can-reach': {
    fn: 'furthestBuilding', params: ['heights', 'bricks', 'ladders'], cmp: 'exact', meta: ['Furthest Building You Can Reach', 'Medium', 'Heap'],
    ask: 'You walk from building 0 to the next, and the next. Stepping down or level is free. Stepping up by d needs d bricks or one ladder. Return the index of the furthest building you can reach.',
    sig: {
      py: 'def furthestBuilding(heights: List[int], bricks: int, ladders: int) -> int:',
      js: 'function furthestBuilding(heights, bricks, ladders) {',
      java: 'public int furthestBuilding(int[] heights, int bricks, int ladders) {',
      cpp: 'int furthestBuilding(vector<int>& heights, int bricks, int ladders) {',
      go: 'func furthestBuilding(heights []int, bricks int, ladders int) int {'
    },
    examples: [[[[1, 5, 2, 6], 4, 1], 3], [[[3, 2, 1], 0, 0], 2], [[[1, 3, 6], 1, 0], 0]],
    hidden: [[[[4, 2, 7, 6, 9, 14, 12], 5, 1], 4], [[[4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2], 7], [[[14, 3, 19, 3], 17, 0], 3], [[[1, 2, 3, 4, 5], 0, 4], 4], [[[1, 13, 1, 1, 13, 5, 11], 6, 1], 3]],
    ref: function (heights, bricks, ladders) {
      const ups = [];
      for (let i = 0; i + 1 < heights.length; i++) {
        const d = heights[i + 1] - heights[i];
        if (d <= 0) continue;
        ups.push(d); ups.sort((a, b) => b - a);
        const paid = ups.slice(ladders).reduce((a, b) => a + b, 0);
        if (paid > bricks) return i;
      }
      return heights.length - 1;
    }
  },
  'single-threaded-cpu': {
    fn: 'getOrder', params: ['tasks'], cmp: 'exact', meta: ['Single-Threaded CPU', 'Medium', 'Heap'],
    ask: 'Task i is [enqueueTime, processingTime]. One processor runs one task at a time to the end. Whenever it is free, it starts the waiting task with the shortest processing time (the smaller index on a tie); if nothing is waiting, it idles until the next task arrives. Return the task indexes in the order they run.',
    sig: {
      py: 'def getOrder(tasks: List[List[int]]) -> List[int]:',
      js: 'function getOrder(tasks) {',
      java: 'public int[] getOrder(int[][] tasks) {',
      cpp: 'vector<int> getOrder(vector<vector<int>>& tasks) {',
      go: 'func getOrder(tasks [][]int) []int {'
    },
    examples: [[[[[1, 3], [2, 1], [2, 2]]], [0, 1, 2]], [[[[5, 2], [5, 1], [5, 1]]], [1, 2, 0]], [[[[0, 4], [10, 1]]], [0, 1]]],
    hidden: [[[[[1, 2], [2, 4], [3, 2], [4, 1]]], [0, 2, 3, 1]], [[[[7, 10], [7, 12], [7, 5], [7, 4], [7, 2]]], [4, 3, 2, 0, 1]], [[[[3, 1]]], [0]], [[[[1, 9], [2, 1], [2, 1], [20, 1]]], [0, 1, 2, 3]], [[[[0, 1], [0, 1], [5, 1], [5, 1]]], [0, 1, 2, 3]]],
    ref: function (tasks) {
      const idx = tasks.map((_, i) => i).sort((a, b) => tasks[a][0] - tasks[b][0] || a - b);
      const wait = [], out = [];
      let t = 0, p = 0;
      while (out.length < tasks.length) {
        if (!wait.length && t < tasks[idx[p]][0]) t = tasks[idx[p]][0];
        while (p < idx.length && tasks[idx[p]][0] <= t) wait.push(idx[p++]);
        wait.sort((a, b) => tasks[a][1] - tasks[b][1] || a - b);
        const i = wait.shift();
        out.push(i); t += tasks[i][1];
      }
      return out;
    }
  },
  'maximum-subsequence-score': {
    fn: 'maxScore', params: ['nums1', 'nums2', 'k'], cmp: 'exact', meta: ['Maximum Subsequence Score', 'Medium', 'Heap'],
    ask: 'Pick k indexes. Their score is the sum of nums1 at those indexes times the smallest nums2 at those indexes. Return the best score.',
    sig: {
      py: 'def maxScore(nums1: List[int], nums2: List[int], k: int) -> int:',
      js: 'function maxScore(nums1, nums2, k) {',
      java: 'public long maxScore(int[] nums1, int[] nums2, int k) {',
      cpp: 'long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {',
      go: 'func maxScore(nums1 []int, nums2 []int, k int) int64 {'
    },
    examples: [[[[2, 1, 3], [3, 1, 2], 2], 10], [[[5], [7], 1], 35], [[[1, 1, 1], [9, 9, 9], 3], 27]],
    hidden: [[[[4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1], 30], [[[1, 3, 3, 2], [2, 1, 3, 4], 3], 12], [[[0, 0, 0], [5, 5, 5], 2], 0], [[[10, 1, 1, 10], [1, 10, 10, 1], 2], 20], [[[3, 8, 2, 7, 6], [9, 2, 6, 3, 5], 3], 55]],
    ref: function (nums1, nums2, k) {
      const idx = nums1.map((_, i) => i).sort((a, b) => nums2[b] - nums2[a]);
      const chosen = [];
      let sum = 0, best = 0;
      for (const i of idx) {
        chosen.push(nums1[i]); sum += nums1[i];
        chosen.sort((a, b) => a - b);
        if (chosen.length > k) sum -= chosen.shift();
        if (chosen.length === k) best = Math.max(best, sum * nums2[i]);
      }
      return best;
    }
  },
  'minimum-cost-to-hire-k-workers': {
    fn: 'mincostToHireWorkers', params: ['quality', 'wage', 'k'], cmp: 'float', meta: ['Minimum Cost to Hire K Workers', 'Hard', 'Heap'],
    ask: 'Hire exactly k workers. In the group, pay must be in proportion to quality, and every worker must get at least their minimum wage. Return the least total pay.',
    sig: {
      py: 'def mincostToHireWorkers(quality: List[int], wage: List[int], k: int) -> float:',
      js: 'function mincostToHireWorkers(quality, wage, k) {',
      java: 'public double mincostToHireWorkers(int[] quality, int[] wage, int k) {',
      cpp: 'double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {',
      go: 'func mincostToHireWorkers(quality []int, wage []int, k int) float64 {'
    },
    examples: [[[[10, 20], [50, 40], 1], 40], [[[3, 1, 2], [6, 2, 4], 2], 6], [[[4, 4], [8, 12], 2], 24]],
    hidden: [[[[10, 20, 5], [70, 50, 30], 2], 105], [[[3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3], 30.666666666666664], [[[5], [9], 1], 9], [[[1, 2, 3, 4], [4, 3, 2, 1], 2], 4.666666666666666], [[[6, 6, 6, 6], [12, 6, 18, 6], 3], 36]],
    ref: function (quality, wage, k) {
      const w = quality.map((q, i) => [wage[i] / q, q]).sort((a, b) => a[0] - b[0]);
      const qs = [];
      let sum = 0, best = Infinity;
      for (const [r, q] of w) {
        qs.push(q); sum += q; qs.sort((a, b) => b - a);
        if (qs.length > k) sum -= qs.shift();
        if (qs.length === k) best = Math.min(best, sum * r);
      }
      return best;
    }
  },
  'ipo': {
    fn: 'findMaximizedCapital', params: ['k', 'w', 'profits', 'capital'], cmp: 'exact', meta: ['IPO', 'Hard', 'Heap'],
    ask: 'You start with w capital and may finish at most k projects, one after another. Project i needs at least capital[i] to start and adds profits[i] to your capital when done (the capital is not spent). Return the most capital you can end with.',
    sig: {
      py: 'def findMaximizedCapital(k: int, w: int, profits: List[int], capital: List[int]) -> int:',
      js: 'function findMaximizedCapital(k, w, profits, capital) {',
      java: 'public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {',
      cpp: 'int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {',
      go: 'func findMaximizedCapital(k int, w int, profits []int, capital []int) int {'
    },
    examples: [[[1, 0, [2, 5], [0, 1]], 2], [[2, 1, [1, 2, 3], [1, 1, 2]], 6], [[3, 0, [1, 1], [1, 1]], 0]],
    hidden: [[[3, 0, [1, 2, 3], [0, 1, 2]], 6], [[10, 0, [1, 2, 3], [0, 1, 1]], 6], [[1, 2, [1, 2, 3], [1, 1, 2]], 5], [[2, 0, [5, 1, 4], [0, 0, 6]], 6], [[0, 7, [9], [0]], 7]],
    ref: function (k, w, profits, capital) {
      const p = profits.map((x, i) => [capital[i], x]).sort((a, b) => a[0] - b[0]);
      const ready = [];
      let i = 0;
      while (k-- > 0) {
        while (i < p.length && p[i][0] <= w) ready.push(p[i++][1]);
        if (!ready.length) break;
        ready.sort((a, b) => a - b);
        w += ready.pop();
      }
      return w;
    }
  },
  'minimum-number-of-refueling-stops': {
    fn: 'minRefuelStops', params: ['target', 'startFuel', 'stations'], cmp: 'exact', meta: ['Minimum Number of Refueling Stops', 'Hard', 'Heap'],
    ask: 'A car drives toward a place target miles away, burning one litre a mile, with startFuel litres. Station [position, litres] lies on the way; stopping there adds all its litres. Return the fewest stops needed to arrive, or -1. Arriving at a station or the target with zero litres still counts.',
    sig: {
      py: 'def minRefuelStops(target: int, startFuel: int, stations: List[List[int]]) -> int:',
      js: 'function minRefuelStops(target, startFuel, stations) {',
      java: 'public int minRefuelStops(int target, int startFuel, int[][] stations) {',
      cpp: 'int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {',
      go: 'func minRefuelStops(target int, startFuel int, stations [][]int) int {'
    },
    examples: [[[10, 10, []], 0], [[50, 5, [[10, 40]]], -1], [[30, 10, [[10, 25], [20, 5]]], 1]],
    hidden: [[[100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]]], 2], [[100, 50, [[25, 25], [50, 50]]], 1], [[1, 1, []], 0], [[100, 1, [[10, 100]]], -1], [[1000, 83, [[25, 27], [36, 187], [140, 186], [378, 6], [492, 202], [517, 89], [579, 234], [673, 86], [808, 53], [954, 49]]], -1]],
    ref: function (target, fuel, stations) {
      const tank = [];
      let i = 0, stops = 0;
      while (fuel < target) {
        while (i < stations.length && stations[i][0] <= fuel) tank.push(stations[i++][1]);
        if (!tank.length) return -1;
        tank.sort((a, b) => a - b);
        fuel += tank.pop(); stops++;
      }
      return stops;
    }
  },
  'sliding-window-median': {
    fn: 'medianSlidingWindow', params: ['nums', 'k'], cmp: 'float', meta: ['Sliding Window Median', 'Hard', 'Heap'],
    ask: 'Slide a window of k neighbouring values across nums, one step at a time. Return the median of each window: the middle value when k is odd, the mean of the two middle values when k is even.',
    sig: {
      py: 'def medianSlidingWindow(nums: List[int], k: int) -> List[float]:',
      js: 'function medianSlidingWindow(nums, k) {',
      java: 'public double[] medianSlidingWindow(int[] nums, int k) {',
      cpp: 'vector<double> medianSlidingWindow(vector<int>& nums, int k) {',
      go: 'func medianSlidingWindow(nums []int, k int) []float64 {'
    },
    examples: [[[[1, 4, 2, 3], 2], [2.5, 3, 2.5]], [[[5], 1], [5]], [[[2, 2, 2, 2], 3], [2, 2]]],
    hidden: [[[[1, 3, -1, -3, 5, 3, 6, 7], 3], [1, -1, -1, 3, 5, 6]], [[[1, 2, 3, 4, 2, 3, 1, 4, 2], 3], [2, 3, 3, 3, 2, 3, 2]], [[[2147483647, 2147483647], 2], [2147483647]], [[[-1, -2, -3, -4], 4], [-2.5]], [[[9, 1, 8, 2, 7, 3], 2], [5, 4.5, 5, 4.5, 5]]],
    ref: function (nums, k) {
      const out = [];
      for (let i = 0; i + k <= nums.length; i++) {
        const w = nums.slice(i, i + k).sort((a, b) => a - b);
        out.push(k % 2 ? w[(k - 1) / 2] : (w[k / 2 - 1] + w[k / 2]) / 2);
      }
      return out;
    }
  },
  'swapping-nodes-in-a-linked-list': {
    fn: 'swapNodes', params: ['head', 'k'], cmp: 'exact', io: { args: ['list', null], ret: 'list' }, meta: ['Swapping Nodes in a Linked List', 'Medium', 'In-place Reversal'],
    ask: 'Swap the values of the k-th node from the front and the k-th node from the back (both counted from 1), and return the head.',
    sig: {
      py: 'def swapNodes(head: Optional[ListNode], k: int) -> Optional[ListNode]:',
      js: 'function swapNodes(head, k) {',
      java: 'public ListNode swapNodes(ListNode head, int k) {',
      cpp: 'ListNode* swapNodes(ListNode* head, int k) {',
      go: 'func swapNodes(head *ListNode, k int) *ListNode {'
    },
    examples: [[[[1, 2, 3, 4], 1], [4, 2, 3, 1]], [[[7], 1], [7]], [[[5, 6, 7, 8, 9], 2], [5, 8, 7, 6, 9]]],
    hidden: [[[[1, 2], 2], [2, 1]], [[[1, 2, 3], 2], [1, 2, 3]], [[[10, 20, 30, 40, 50, 60], 3], [10, 20, 40, 30, 50, 60]], [[[9, 8, 7, 6], 4], [6, 8, 7, 9]], [[[1, 1, 2, 2], 1], [2, 1, 2, 1]]],
    ref: function (head, k) {
      let a = head;
      for (let i = 1; i < k; i++) a = a.next;
      let b = head, fast = a;
      while (fast.next) { fast = fast.next; b = b.next; }
      [a.val, b.val] = [b.val, a.val];
      return head;
    }
  },
  'add-two-numbers-ii': {
    fn: 'addTwoNumbers', params: ['l1', 'l2'], cmp: 'exact', io: { args: ['list', 'list'], ret: 'list' }, meta: ['Add Two Numbers II', 'Medium', 'In-place Reversal'],
    ask: 'Each list holds the digits of a whole number, most significant digit first, with no leading zeros (except the number 0 itself). Return their sum as a list in the same form.',
    sig: {
      py: 'def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function addTwoNumbers(l1, l2) {',
      java: 'public ListNode addTwoNumbers(ListNode l1, ListNode l2) {',
      cpp: 'ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {',
      go: 'func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {'
    },
    examples: [[[[9, 9], [1]], [1, 0, 0]], [[[0], [0]], [0]], [[[3, 4, 2], [4, 6]], [3, 8, 8]]],
    hidden: [[[[5], [5]], [1, 0]], [[[1, 0, 0, 0], [9, 9, 9]], [1, 9, 9, 9]], [[[2, 4, 3], [5, 6, 4]], [8, 0, 7]], [[[9, 9, 9, 9, 9], [9, 9]], [1, 0, 0, 0, 9, 8]], [[[1], [9, 9, 9, 9]], [1, 0, 0, 0, 0]]],
    ref: function (l1, l2) {
      const a = [], b = [];
      for (let n = l1; n; n = n.next) a.push(n.val);
      for (let n = l2; n; n = n.next) b.push(n.val);
      let carry = 0, head = null;
      while (a.length || b.length || carry) {
        const s = (a.pop() || 0) + (b.pop() || 0) + carry;
        carry = Math.floor(s / 10);
        head = new l1.constructor(s % 10, head);
      }
      return head;
    }
  },
  'intersection-of-two-linked-lists': {
    fn: 'getIntersectionNode', params: ['headA', 'headB'], cmp: 'exact', io: { args: ['list', 'joined'], ret: 'listpos' }, meta: ['Intersection of Two Linked Lists', 'Easy', 'Fast & Slow Pointers'],
    ask: 'Two lists may merge: from some node on they share the very same nodes. Return that first shared node, or null if they never meet. Do not change the lists. In the tests, list B is written [its own values, the index in list A where it joins] (-1: it never joins), and your answer is shown as that node\'s index in list A (-1 for null).',
    sig: {
      py: 'def getIntersectionNode(headA: Optional[ListNode], headB: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function getIntersectionNode(headA, headB) {',
      java: 'public ListNode getIntersectionNode(ListNode headA, ListNode headB) {',
      cpp: 'ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {',
      go: 'func getIntersectionNode(headA, headB *ListNode) *ListNode {'
    },
    examples: [[[[4, 1, 8, 4, 5], [[5, 6, 1], 2]], 2], [[[1, 2], [[3], -1]], -1], [[[7, 9], [[], 0]], 0]],
    hidden: [[[[1, 2, 3, 4, 5, 6], [[10, 11], 5]], 5], [[[1], [[2, 3], -1]], -1], [[[1, 2, 3], [[], 2]], 2], [[[2, 2, 2], [[2], 1]], 1], [[[8, 8], [[8, 8, 8], -1]], -1]],
    ref: function (a, b) {
      let p = a, q = b;
      while (p !== q) { p = p ? p.next : b; q = q ? q.next : a; }
      return p;
    }
  },
  'linked-list-cycle-ii': {
    fn: 'detectCycle', params: ['head'], cmp: 'exact', io: { args: ['cycle'], ret: 'listpos' }, meta: ['Linked List Cycle II', 'Medium', 'Fast & Slow Pointers'],
    ask: 'If the list loops, return the node where the loop begins; otherwise return null. Use O(1) extra memory if you can. The tests write a list as [values, pos]: the last node points back to index pos, or nowhere for -1. Your answer is shown as the node\'s index (-1 for null).',
    sig: {
      py: 'def detectCycle(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function detectCycle(head) {',
      java: 'public ListNode detectCycle(ListNode head) {',
      cpp: 'ListNode* detectCycle(ListNode* head) {',
      go: 'func detectCycle(head *ListNode) *ListNode {'
    },
    examples: [[[[[6, 1, 8, 3], 2]], 2], [[[[1, 2], 0]], 0], [[[[1], -1]], -1]],
    hidden: [[[[[1], 0]], 0], [[[[1, 2, 3, 4, 5], 4]], 4], [[[[9, 9, 9], 1]], 1], [[[[], -1]], -1], [[[[1, 2, 3], -1]], -1], [[[[4, 5, 6, 7, 8, 9], 3]], 3]],
    ref: function (head) {
      let s = head, f = head;
      while (f && f.next) {
        s = s.next; f = f.next.next;
        if (s === f) { let p = head; while (p !== s) { p = p.next; s = s.next; } return p; }
      }
      return null;
    }
  },
  'convert-sorted-list-to-binary-search-tree': {
    fn: 'sortedListToBST', params: ['head'], cmp: 'any', io: { args: ['list'], ret: 'tree' }, meta: ['Convert Sorted List to Binary Search Tree', 'Medium', 'Fast & Slow Pointers'],
    ask: 'The list is sorted, smallest first. Build a height-balanced binary search tree from its values: at every node, the two subtrees differ in height by at most one. Any such tree is accepted.',
    sig: {
      py: 'def sortedListToBST(head: Optional[ListNode]) -> Optional[TreeNode]:',
      js: 'function sortedListToBST(head) {',
      java: 'public TreeNode sortedListToBST(ListNode head) {',
      cpp: 'TreeNode* sortedListToBST(ListNode* head) {',
      go: 'func sortedListToBST(head *ListNode) *TreeNode {'
    },
    examples: [[[[1, 2, 3]], [2, 1, 3]], [[[]], []], [[[-3, 0, 4, 8]], [0, -3, 4, null, null, null, 8]]],
    hidden: [[[[5]], [5]], [[[1, 2]], [1, null, 2]], [[[-10, -3, 0, 5, 9]], [0, -10, 5, null, -3, null, 9]], [[[1, 2, 3, 4, 5, 6, 7]], [4, 2, 6, 1, 3, 5, 7]], [[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], [4, 1, 7, 0, 2, 5, 8, null, null, null, 3, null, 6, null, 9]]],
    check: function (args, got) {
      if (!Array.isArray(got)) return false;
      const nodes = [];
      if (got.length && got[0] !== null) {
        const root = { v: got[0], l: null, r: null }, q = [root];
        let k = 1;
        for (let h = 0; h < q.length && k < got.length; h++) {
          if (k < got.length && got[k] !== null) { q[h].l = { v: got[k], l: null, r: null }; q.push(q[h].l); } k++;
          if (k < got.length && got[k] !== null) { q[h].r = { v: got[k], l: null, r: null }; q.push(q[h].r); } k++;
        }
        nodes.push(root);
      }
      const order = [];
      let ok = true;
      const walk = (n) => { if (!n) return 0; const a = walk(n.l); order.push(n.v); const b = walk(n.r); if (Math.abs(a - b) > 1) ok = false; return 1 + Math.max(a, b); };
      walk(nodes[0] || null);
      return ok && JSON.stringify(order) === JSON.stringify(args[0]);
    },
    ref: function (head) {
      const vals = [];
      for (let n = head; n; n = n.next) vals.push(n.val);
      const T = head ? head.constructor : null;
      const build = (lo, hi) => {
        if (lo > hi) return null;
        const m = (lo + hi) >> 1;
        return { val: vals[m], left: build(lo, m - 1), right: build(m + 1, hi) };
      };
      return T ? build(0, vals.length - 1) : null;
    }
  },
  'circular-array-loop': {
    fn: 'circularArrayLoop', params: ['nums'], cmp: 'exact', meta: ['Circular Array Loop', 'Medium', 'Fast & Slow Pointers'],
    ask: 'nums is circular and holds no zeros. From index i you jump nums[i] steps (forward when positive, backward when negative, wrapping around). Return true if some loop exists that visits more than one index and moves in only one direction.',
    sig: {
      py: 'def circularArrayLoop(nums: List[int]) -> bool:',
      js: 'function circularArrayLoop(nums) {',
      java: 'public boolean circularArrayLoop(int[] nums) {',
      cpp: 'bool circularArrayLoop(vector<int>& nums) {',
      go: 'func circularArrayLoop(nums []int) bool {'
    },
    examples: [[[[1, 1, 1]], true], [[[-1, 2]], false], [[[3, 1, 2]], true]],
    hidden: [[[[2, -1, 1, -2, -2]], false], [[[-2, 1, -1, -2, -2]], false], [[[1]], false], [[[-1, -1, -1]], true], [[[2, 2, 2, 2, 2, 4, 7]], false], [[[1, -1, 5, 1, 4]], true]],
    ref: function (nums) {
      const n = nums.length, next = (i) => (((i + nums[i]) % n) + n) % n;
      for (let i = 0; i < n; i++) {
        const dir = nums[i] > 0;
        const seen = new Set();
        let j = i;
        while (!seen.has(j) && (nums[j] > 0) === dir) {
          seen.add(j);
          const k = next(j);
          if (k === j) break;
          j = k;
        }
        if (seen.has(j) && (nums[j] > 0) === dir && next(j) !== j) {
          let len = 1, x = next(j), okDir = true;
          while (x !== j) { if ((nums[x] > 0) !== dir) okDir = false; x = next(x); len++; }
          if (okDir && len > 1) return true;
        }
      }
      return false;
    }
  },
  'count-sub-islands': {
    fn: 'countSubIslands', params: ['grid1', 'grid2'], cmp: 'exact', meta: ['Count Sub Islands', 'Medium', 'Depth-First Search'],
    ask: 'Both grids are the same size; 1 is land and 0 is water, and an island is land joined up, down, left or right. Count the islands of grid2 whose every cell is also land in grid1.',
    sig: {
      py: 'def countSubIslands(grid1: List[List[int]], grid2: List[List[int]]) -> int:',
      js: 'function countSubIslands(grid1, grid2) {',
      java: 'public int countSubIslands(int[][] grid1, int[][] grid2) {',
      cpp: 'int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {',
      go: 'func countSubIslands(grid1 [][]int, grid2 [][]int) int {'
    },
    examples: [[[[[1, 1], [0, 1]], [[1, 0], [0, 1]]], 2], [[[[1, 0], [0, 0]], [[1, 1], [0, 0]]], 0], [[[[0]], [[0]]], 0]],
    hidden: [[[[[1, 1, 1], [1, 1, 1]], [[1, 0, 1], [1, 0, 1]]], 2], [[[[1, 0, 1, 0, 1], [1, 1, 1, 1, 1]], [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1]]], 1], [[[[1, 1, 0], [0, 1, 1], [1, 0, 1]], [[1, 1, 0], [0, 0, 1], [1, 1, 1]]], 1], [[[[1]], [[1]]], 1], [[[[0, 1], [1, 0]], [[1, 1], [1, 1]]], 0]],
    ref: function (grid1, grid2) {
      const m = grid2.length, n = grid2[0].length, g = grid2.map((r) => r.slice());
      let count = 0;
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
        if (!g[i][j]) continue;
        let ok = true;
        const st = [[i, j]]; g[i][j] = 0;
        while (st.length) {
          const [a, b] = st.pop();
          if (!grid1[a][b]) ok = false;
          for (const [x, y] of [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]]) if (x >= 0 && y >= 0 && x < m && y < n && g[x][y]) { g[x][y] = 0; st.push([x, y]); }
        }
        if (ok) count++;
      }
      return count;
    }
  },
  'find-eventual-safe-states': {
    fn: 'eventualSafeNodes', params: ['graph'], cmp: 'exact', meta: ['Find Eventual Safe States', 'Medium', 'Depth-First Search'],
    ask: 'graph[i] lists the nodes node i has arrows to. A node is safe if every path from it ends at a node with no arrows out (so no path from it can loop forever). Return all safe nodes, smallest first.',
    sig: {
      py: 'def eventualSafeNodes(graph: List[List[int]]) -> List[int]:',
      js: 'function eventualSafeNodes(graph) {',
      java: 'public int[] eventualSafeNodes(int[][] graph) {',
      cpp: 'vector<int> eventualSafeNodes(vector<vector<int>>& graph) {',
      go: 'func eventualSafeNodes(graph [][]int) []int {'
    },
    examples: [[[[[1], [2], []]], [0, 1, 2]], [[[[1], [0]]], []], [[[[], [0, 2], [2]]], [0]]],
    hidden: [[[[[1, 2], [2, 3], [5], [0], [5], [], []]], [2, 4, 5, 6]], [[[[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]], [4]], [[[[]]], [0]], [[[[0]]], []], [[[[1], [2], [3], [1], []]], [4]]],
    ref: function (graph) {
      const state = new Array(graph.length).fill(0);
      const safe = (u) => {
        if (state[u]) return state[u] === 2;
        state[u] = 1;
        for (const v of graph[u]) if (!safe(v)) return false;
        state[u] = 2;
        return true;
      };
      return graph.map((_, i) => i).filter(safe);
    }
  },
  'evaluate-division': {
    fn: 'calcEquation', params: ['equations', 'values', 'queries'], cmp: 'float', meta: ['Evaluate Division', 'Medium', 'Depth-First Search'],
    ask: 'equations[i] = [a, b] with values[i] = k means a / b = k (all values are positive). For each query [c, d], return c / d worked out from those facts, or -1 when it cannot be worked out (including any name never seen).',
    sig: {
      py: 'def calcEquation(equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:',
      js: 'function calcEquation(equations, values, queries) {',
      java: 'public double[] calcEquation(List<String[]> equations, double[] values, List<String[]> queries) {',
      cpp: 'vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {',
      go: 'func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {'
    },
    examples: [[[[['x', 'y']], [3], [['x', 'y'], ['y', 'x'], ['x', 'z']]], [3, 0.3333333333333333, -1]], [[[['a', 'b'], ['b', 'c']], [2, 5], [['a', 'c'], ['c', 'a'], ['a', 'a']]], [10, 0.1, 1]], [[[['p', 'q']], [1.5], [['q', 'q'], ['r', 'r']]], [1, -1]]],
    hidden: [[[[['a', 'b'], ['c', 'd']], [2, 4], [['a', 'd'], ['b', 'a'], ['d', 'c']]], [-1, 0.5, 0.25]], [[[['m', 'n'], ['n', 'o'], ['o', 'p']], [0.5, 4, 2], [['m', 'p'], ['p', 'm'], ['n', 'p']]], [4, 0.25, 8]], [[[['u', 'v']], [1], [['v', 'u'], ['u', 'w']]], [1, -1]], [[[['ab', 'cd'], ['cd', 'ef']], [3, 0.25], [['ab', 'ef'], ['ef', 'cd']]], [0.75, 4]], [[[['x1', 'x2'], ['x2', 'x3'], ['x3', 'x4']], [3, 3, 3], [['x1', 'x4'], ['x4', 'x1'], ['x2', 'x2']]], [27, 0.037037037037037035, 1]]],
    ref: function (equations, values, queries) {
      const g = new Map();
      const add = (a, b, k) => { if (!g.has(a)) g.set(a, []); g.get(a).push([b, k]); };
      equations.forEach(([a, b], i) => { add(a, b, values[i]); add(b, a, 1 / values[i]); });
      return queries.map(([c, d]) => {
        if (!g.has(c) || !g.has(d)) return -1;
        const seen = new Set([c]), st = [[c, 1]];
        while (st.length) {
          const [u, w] = st.pop();
          if (u === d) return w;
          for (const [v, k] of g.get(u)) if (!seen.has(v)) { seen.add(v); st.push([v, w * k]); }
        }
        return -1;
      });
    }
  },
  'populating-next-right-pointers-in-each-node': {
    fn: 'connect', params: ['root'], cmp: 'exact', io: { args: ['ntree'], ret: 'ntree' }, meta: ['Populating Next Right Pointers in Each Node', 'Medium', 'Breadth-First Search'],
    ask: 'The tree is perfect: every level is full. Each node has a next field, set to null. Point every node\'s next at the node to its right on the same level (null for the last one) and return the root. The tests read each level along the next pointers, writing # at the end of a level.',
    sig: {
      py: 'def connect(root: Optional[TreeNode]) -> Optional[TreeNode]:',
      js: 'function connect(root) {',
      java: 'public TreeNode connect(TreeNode root) {',
      cpp: 'TreeNode* connect(TreeNode* root) {',
      go: 'func connect(root *TreeNode) *TreeNode {'
    },
    examples: [[[[1, 2, 3]], [1, '#', 2, 3, '#']], [[[]], []], [[[5, 6, 7, 8, 9, 10, 11]], [5, '#', 6, 7, '#', 8, 9, 10, 11, '#']]],
    hidden: [[[[1]], [1, '#']], [[[1, 2, 3, 4, 5, 6, 7]], [1, '#', 2, 3, '#', 4, 5, 6, 7, '#']], [[[0, -1, 1]], [0, '#', -1, 1, '#']], [[[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]], [2, '#', 3, 4, '#', 5, 6, 7, 8, '#', 9, 10, 11, 12, 13, 14, 15, 16, '#']], [[[9, 9, 9]], [9, '#', 9, 9, '#']]],
    ref: function (root) {
      let lead = root;
      while (lead && lead.left) {
        for (let n = lead; n; n = n.next) { n.left.next = n.right; n.right.next = n.next ? n.next.left : null; }
        lead = lead.left;
      }
      return root;
    }
  },
  'all-nodes-distance-k-in-binary-tree': {
    fn: 'distanceK', params: ['root', 'target', 'k'], cmp: 'unordered', io: { args: ['tree', 'tnode', null] }, meta: ['All Nodes Distance K in Binary Tree', 'Medium', 'Breadth-First Search'],
    ask: 'All values in the tree are different. target is one of its nodes (the tests write it by its value). Return the values of every node exactly k edges away from target, in any order.',
    sig: {
      py: 'def distanceK(root: Optional[TreeNode], target: TreeNode, k: int) -> List[int]:',
      js: 'function distanceK(root, target, k) {',
      java: 'public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {',
      cpp: 'vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {',
      go: 'func distanceK(root *TreeNode, target *TreeNode, k int) []int {'
    },
    examples: [[[[1, 2, 3, 4, 5], 2, 1], [1, 4, 5]], [[[1], 1, 0], [1]], [[[1, 2, 3, null, 4], 4, 3], [3]]],
    hidden: [[[[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 2], [7, 4, 1]], [[[1, 2, 3], 1, 5], []], [[[0, 1, null, 3, 2], 2, 1], [1]], [[[0, 2, 1, null, null, 3], 3, 3], [2]], [[[7, 3, 9, 1, 5, 8, 10], 7, 2], [1, 5, 8, 10]]],
    ref: function (root, target, k) {
      const parent = new Map(), st = [root];
      while (st.length) { const n = st.pop(); for (const c of [n.left, n.right]) if (c) { parent.set(c, n); st.push(c); } }
      const seen = new Set([target]);
      let level = [target];
      for (let d = 0; d < k; d++) {
        const next = [];
        for (const n of level) for (const x of [n.left, n.right, parent.get(n)]) if (x && !seen.has(x)) { seen.add(x); next.push(x); }
        level = next;
      }
      return level.map((n) => n.val);
    }
  },
  'shortest-bridge': {
    fn: 'shortestBridge', params: ['grid'], cmp: 'exact', meta: ['Shortest Bridge', 'Medium', 'Breadth-First Search'],
    ask: 'The grid has exactly two islands of 1s (joined up, down, left or right). Return the fewest 0s you must turn into 1s to join them into one island.',
    sig: {
      py: 'def shortestBridge(grid: List[List[int]]) -> int:',
      js: 'function shortestBridge(grid) {',
      java: 'public int shortestBridge(int[][] grid) {',
      cpp: 'int shortestBridge(vector<vector<int>>& grid) {',
      go: 'func shortestBridge(grid [][]int) int {'
    },
    examples: [[[[[1, 0], [0, 1]]], 1], [[[[1, 0, 1]]], 1], [[[[1, 1, 0, 0, 1]]], 2]],
    hidden: [[[[[0, 1, 0], [0, 0, 0], [0, 0, 1]]], 2], [[[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]]], 1], [[[[1, 0, 0, 0, 0, 0, 1]]], 5], [[[[1], [0], [0], [1]]], 2], [[[[1, 1, 0], [0, 0, 0], [0, 1, 1]]], 1]],
    ref: function (grid) {
      const m = grid.length, n = grid[0].length, g = grid.map((r) => r.slice());
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      let q = [];
      outer: for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (g[i][j]) {
        const st = [[i, j]]; g[i][j] = 2;
        while (st.length) { const [a, b] = st.pop(); q.push([a, b]); for (const [dx, dy] of dirs) { const x = a + dx, y = b + dy; if (x >= 0 && y >= 0 && x < m && y < n && g[x][y] === 1) { g[x][y] = 2; st.push([x, y]); } } }
        break outer;
      }
      for (let d = 0; q.length; d++) {
        const next = [];
        for (const [a, b] of q) for (const [dx, dy] of dirs) {
          const x = a + dx, y = b + dy;
          if (x < 0 || y < 0 || x >= m || y >= n || g[x][y] === 2) continue;
          if (g[x][y] === 1) return d;
          g[x][y] = 2; next.push([x, y]);
        }
        q = next;
      }
      return -1;
    }
  },
  'snakes-and-ladders': {
    fn: 'snakesAndLadders', params: ['board'], cmp: 'exact', meta: ['Snakes and Ladders', 'Medium', 'Breadth-First Search'],
    ask: 'The n by n board is numbered 1 to n squared starting at the bottom-left, running left to right along the bottom row, then right to left along the row above, and so on, switching direction each row. From square s a move picks a square s+1 to s+6 (not past the last). If that square holds a value other than -1, you then jump to the square with that number (once only, even if it lands on another jump). Start on square 1. Return the fewest moves to reach the last square, or -1.',
    sig: {
      py: 'def snakesAndLadders(board: List[List[int]]) -> int:',
      js: 'function snakesAndLadders(board) {',
      java: 'public int snakesAndLadders(int[][] board) {',
      cpp: 'int snakesAndLadders(vector<vector<int>>& board) {',
      go: 'func snakesAndLadders(board [][]int) int {'
    },
    examples: [[[[[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]], 2], [[[[-1, -1], [-1, -1]]], 1], [[[[-1, -1, -1], [-1, -1, -1], [-1, 9, -1]]], 1]],
    hidden: [[[[[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, 35, -1, -1, 13, -1], [-1, -1, -1, -1, -1, -1], [-1, 15, -1, -1, -1, -1]]], 4], [[[[-1, -1], [-1, 3]]], 1], [[[[1, 1, -1], [1, 1, 1], [-1, 1, 1]]], -1], [[[[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, 2, 2, 2]]], 3], [[[[-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1]]], 4]],
    ref: function (board) {
      const n = board.length, last = n * n;
      const cell = (s) => { const r = Math.floor((s - 1) / n), c = (s - 1) % n; const row = n - 1 - r; return board[row][r % 2 ? n - 1 - c : c]; };
      const dist = new Map([[1, 0]]), q = [1];
      while (q.length) {
        const s = q.shift();
        if (s === last) return dist.get(s);
        for (let d = 1; d <= 6 && s + d <= last; d++) {
          let t = s + d;
          const v = cell(t);
          if (v !== -1) t = v;
          if (!dist.has(t)) { dist.set(t, dist.get(s) + 1); q.push(t); }
        }
      }
      return -1;
    }
  },
  'shortest-path-in-a-grid-with-obstacles-elimination': {
    fn: 'shortestPath', params: ['grid', 'k'], cmp: 'exact', meta: ['Shortest Path in a Grid with Obstacles Elimination', 'Hard', 'Breadth-First Search'],
    ask: 'Walk from the top-left cell to the bottom-right cell, one step up, down, left or right at a time. Cells with 1 are walls, and you may break through at most k of them. Return the fewest steps, or -1.',
    sig: {
      py: 'def shortestPath(grid: List[List[int]], k: int) -> int:',
      js: 'function shortestPath(grid, k) {',
      java: 'public int shortestPath(int[][] grid, int k) {',
      cpp: 'int shortestPath(vector<vector<int>>& grid, int k) {',
      go: 'func shortestPath(grid [][]int, k int) int {'
    },
    examples: [[[[[0, 1], [1, 0]], 0], -1], [[[[0, 1], [1, 0]], 1], 2], [[[[0]], 0], 0]],
    hidden: [[[[[0, 0, 0], [1, 1, 0], [0, 0, 0], [0, 1, 1], [0, 0, 0]], 1], 6], [[[[0, 1, 1], [1, 1, 1], [1, 0, 0]], 1], -1], [[[[0, 1, 1], [1, 1, 1], [1, 0, 0]], 3], 4], [[[[0, 0, 0, 0, 0]], 0], 4], [[[[0, 1, 0, 0], [0, 1, 0, 1], [0, 0, 0, 1], [1, 1, 1, 0]], 1], 6]],
    ref: function (grid, k) {
      const m = grid.length, n = grid[0].length;
      const seen = new Set(['0,0,' + k]);
      let q = [[0, 0, k]];
      for (let d = 0; q.length; d++) {
        const next = [];
        for (const [a, b, r] of q) {
          if (a === m - 1 && b === n - 1) return d;
          for (const [x, y] of [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]]) {
            if (x < 0 || y < 0 || x >= m || y >= n) continue;
            const left = r - grid[x][y];
            const key = x + ',' + y + ',' + left;
            if (left >= 0 && !seen.has(key)) { seen.add(key); next.push([x, y, left]); }
          }
        }
        q = next;
      }
      return -1;
    }
  },
  'bus-routes': {
    fn: 'numBusesToDestination', params: ['routes', 'source', 'target'], cmp: 'exact', meta: ['Bus Routes', 'Hard', 'Breadth-First Search'],
    ask: 'routes[i] lists the stops bus i loops through forever. You start at stop source, not on any bus. Return the fewest buses you must ride to reach stop target, or -1.',
    sig: {
      py: 'def numBusesToDestination(routes: List[List[int]], source: int, target: int) -> int:',
      js: 'function numBusesToDestination(routes, source, target) {',
      java: 'public int numBusesToDestination(int[][] routes, int source, int target) {',
      cpp: 'int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {',
      go: 'func numBusesToDestination(routes [][]int, source int, target int) int {'
    },
    examples: [[[[[1, 2, 3], [3, 4]], 1, 4], 2], [[[[5, 6]], 5, 5], 0], [[[[1, 2], [3, 4]], 1, 4], -1]],
    hidden: [[[[[1, 2, 7], [3, 6, 7]], 1, 6], 2], [[[[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], 15, 12], -1], [[[[1, 7], [3, 5]], 5, 5], 0], [[[[1, 2, 3, 4, 5]], 1, 5], 1], [[[[1, 2], [2, 3], [3, 4], [4, 5]], 1, 5], 4]],
    ref: function (routes, source, target) {
      if (source === target) return 0;
      const at = new Map();
      routes.forEach((r, i) => r.forEach((s) => { if (!at.has(s)) at.set(s, []); at.get(s).push(i); }));
      const usedBus = new Set(), seenStop = new Set([source]);
      let q = [source];
      for (let rides = 1; q.length; rides++) {
        const next = [];
        for (const s of q) for (const b of at.get(s) || []) {
          if (usedBus.has(b)) continue;
          usedBus.add(b);
          for (const t of routes[b]) { if (t === target) return rides; if (!seenStop.has(t)) { seenStop.add(t); next.push(t); } }
        }
        q = next;
      }
      return -1;
    }
  },
  'binary-watch': {
    fn: 'readBinaryWatch', params: ['turnedOn'], cmp: 'unordered', meta: ['Binary Watch', 'Easy', 'Backtracking'],
    ask: 'A watch shows the hour (0 to 11) with 4 lights and the minutes (0 to 59) with 6 lights, each light a binary digit. Given how many lights are on, return every time it could show, written like "3:05" (no leading zero on the hour, always two digits for minutes), in any order.',
    sig: {
      py: 'def readBinaryWatch(turnedOn: int) -> List[str]:',
      js: 'function readBinaryWatch(turnedOn) {',
      java: 'public String[] readBinaryWatch(int turnedOn) {',
      cpp: 'vector<string> readBinaryWatch(int turnedOn) {',
      go: 'func readBinaryWatch(turnedOn int) []string {'
    },
    examples: [[[0], ['0:00']], [[9], []], [[1], ['1:00', '2:00', '4:00', '8:00', '0:01', '0:02', '0:04', '0:08', '0:16', '0:32']]],
    hidden: [[[2], ['0:03', '0:05', '0:06', '0:09', '0:10', '0:12', '0:17', '0:18', '0:20', '0:24', '0:33', '0:34', '0:36', '0:40', '0:48', '1:01', '1:02', '1:04', '1:08', '1:16', '1:32', '2:01', '2:02', '2:04', '2:08', '2:16', '2:32', '3:00', '4:01', '4:02', '4:04', '4:08', '4:16', '4:32', '5:00', '6:00', '8:01', '8:02', '8:04', '8:08', '8:16', '8:32', '9:00', '10:00']], [[3], ['0:07', '0:11', '0:13', '0:14', '0:19', '0:21', '0:22', '0:25', '0:26', '0:28', '0:35', '0:37', '0:38', '0:41', '0:42', '0:44', '0:49', '0:50', '0:52', '0:56', '1:03', '1:05', '1:06', '1:09', '1:10', '1:12', '1:17', '1:18', '1:20', '1:24', '1:33', '1:34', '1:36', '1:40', '1:48', '2:03', '2:05', '2:06', '2:09', '2:10', '2:12', '2:17', '2:18', '2:20', '2:24', '2:33', '2:34', '2:36', '2:40', '2:48', '3:01', '3:02', '3:04', '3:08', '3:16', '3:32', '4:03', '4:05', '4:06', '4:09', '4:10', '4:12', '4:17', '4:18', '4:20', '4:24', '4:33', '4:34', '4:36', '4:40', '4:48', '5:01', '5:02', '5:04', '5:08', '5:16', '5:32', '6:01', '6:02', '6:04', '6:08', '6:16', '6:32', '7:00', '8:03', '8:05', '8:06', '8:09', '8:10', '8:12', '8:17', '8:18', '8:20', '8:24', '8:33', '8:34', '8:36', '8:40', '8:48', '9:01', '9:02', '9:04', '9:08', '9:16', '9:32', '10:01', '10:02', '10:04', '10:08', '10:16', '10:32', '11:00']], [[5], ['0:31', '0:47', '0:55', '0:59', '1:15', '1:23', '1:27', '1:29', '1:30', '1:39', '1:43', '1:45', '1:46', '1:51', '1:53', '1:54', '1:57', '1:58', '2:15', '2:23', '2:27', '2:29', '2:30', '2:39', '2:43', '2:45', '2:46', '2:51', '2:53', '2:54', '2:57', '2:58', '3:07', '3:11', '3:13', '3:14', '3:19', '3:21', '3:22', '3:25', '3:26', '3:28', '3:35', '3:37', '3:38', '3:41', '3:42', '3:44', '3:49', '3:50', '3:52', '3:56', '4:15', '4:23', '4:27', '4:29', '4:30', '4:39', '4:43', '4:45', '4:46', '4:51', '4:53', '4:54', '4:57', '4:58', '5:07', '5:11', '5:13', '5:14', '5:19', '5:21', '5:22', '5:25', '5:26', '5:28', '5:35', '5:37', '5:38', '5:41', '5:42', '5:44', '5:49', '5:50', '5:52', '5:56', '6:07', '6:11', '6:13', '6:14', '6:19', '6:21', '6:22', '6:25', '6:26', '6:28', '6:35', '6:37', '6:38', '6:41', '6:42', '6:44', '6:49', '6:50', '6:52', '6:56', '7:03', '7:05', '7:06', '7:09', '7:10', '7:12', '7:17', '7:18', '7:20', '7:24', '7:33', '7:34', '7:36', '7:40', '7:48', '8:15', '8:23', '8:27', '8:29', '8:30', '8:39', '8:43', '8:45', '8:46', '8:51', '8:53', '8:54', '8:57', '8:58', '9:07', '9:11', '9:13', '9:14', '9:19', '9:21', '9:22', '9:25', '9:26', '9:28', '9:35', '9:37', '9:38', '9:41', '9:42', '9:44', '9:49', '9:50', '9:52', '9:56', '10:07', '10:11', '10:13', '10:14', '10:19', '10:21', '10:22', '10:25', '10:26', '10:28', '10:35', '10:37', '10:38', '10:41', '10:42', '10:44', '10:49', '10:50', '10:52', '10:56', '11:03', '11:05', '11:06', '11:09', '11:10', '11:12', '11:17', '11:18', '11:20', '11:24', '11:33', '11:34', '11:36', '11:40', '11:48']], [[8], ['7:31', '7:47', '7:55', '7:59', '11:31', '11:47', '11:55', '11:59']], [[7], ['3:31', '3:47', '3:55', '3:59', '5:31', '5:47', '5:55', '5:59', '6:31', '6:47', '6:55', '6:59', '7:15', '7:23', '7:27', '7:29', '7:30', '7:39', '7:43', '7:45', '7:46', '7:51', '7:53', '7:54', '7:57', '7:58', '9:31', '9:47', '9:55', '9:59', '10:31', '10:47', '10:55', '10:59', '11:15', '11:23', '11:27', '11:29', '11:30', '11:39', '11:43', '11:45', '11:46', '11:51', '11:53', '11:54', '11:57', '11:58']]],
    ref: function (turnedOn) {
      const bits = (x) => x.toString(2).split('').filter((c) => c === '1').length, out = [];
      for (let h = 0; h < 12; h++) for (let m = 0; m < 60; m++) if (bits(h) + bits(m) === turnedOn) out.push(h + ':' + String(m).padStart(2, '0'));
      return out;
    }
  },
  'restore-ip-addresses': {
    fn: 'restoreIpAddresses', params: ['s'], cmp: 'unordered', meta: ['Restore IP Addresses', 'Medium', 'Backtracking'],
    ask: 's holds only digits. Put three dots into it to make a valid address of four numbers, each 0 to 255 with no leading zero (0 itself is fine). Return every possible address, in any order.',
    sig: {
      py: 'def restoreIpAddresses(s: str) -> List[str]:',
      js: 'function restoreIpAddresses(s) {',
      java: 'public String[] restoreIpAddresses(String s) {',
      cpp: 'vector<string> restoreIpAddresses(string s) {',
      go: 'func restoreIpAddresses(s string) []string {'
    },
    examples: [[['1111'], ['1.1.1.1']], [['010010'], ['0.10.0.10', '0.100.1.0']], [['123'], []]],
    hidden: [[['0000'], ['0.0.0.0']], [['25525511135'], ['255.255.11.135', '255.255.111.35']], [['101023'], ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3']], [['255255255255'], ['255.255.255.255']], [['1234567890123'], []], [['192168011'], ['19.216.80.11', '192.16.80.11', '192.168.0.11']]],
    ref: function (s) {
      const out = [], ok = (p) => p.length > 0 && p.length <= 3 && (p === '0' || p[0] !== '0') && Number(p) <= 255;
      for (let a = 1; a <= 3; a++) for (let b = 1; b <= 3; b++) for (let c = 1; c <= 3; c++) {
        const d = s.length - a - b - c;
        if (d < 1 || d > 3) continue;
        const parts = [s.slice(0, a), s.slice(a, a + b), s.slice(a + b, a + b + c), s.slice(a + b + c)];
        if (parts.every(ok)) out.push(parts.join('.'));
      }
      return out;
    }
  },
  'maximum-length-of-a-concatenated-string-with-unique-characters': {
    fn: 'maxLength', params: ['arr'], cmp: 'exact', meta: ['Maximum Length of a Concatenated String with Unique Characters', 'Medium', 'Backtracking'],
    ask: 'Choose some of the words in arr (keeping their order) and join them. The result may not repeat any letter. Return the longest length you can make.',
    sig: {
      py: 'def maxLength(arr: List[str]) -> int:',
      js: 'function maxLength(arr) {',
      java: 'public int maxLength(String[] arr) {',
      cpp: 'int maxLength(vector<string>& arr) {',
      go: 'func maxLength(arr []string) int {'
    },
    examples: [[[['ab', 'cd', 'a']], 4], [[['aa', 'b']], 1], [[['xyz', 'zw', 'w']], 4]],
    hidden: [[[['abcdefghijklmnopqrstuvwxyz']], 26], [[['a', 'b', 'c', 'ab', 'bc']], 3], [[['aa', 'bb']], 0], [[['un', 'iq', 'ue']], 4], [[['cha', 'r', 'act', 'ers']], 6], [[['abc', 'def', 'ghi', 'adg', 'beh', 'cfi']], 9]],
    ref: function (arr) {
      const masks = [];
      for (const w of arr) { let m = 0, ok = true; for (const ch of w) { const b = 1 << (ch.charCodeAt(0) - 97); if (m & b) ok = false; m |= b; } if (ok) masks.push(m); }
      const pop = (m) => { let c = 0; while (m) { m &= m - 1; c++; } return c; };
      let best = 0;
      const go = (i, m) => { best = Math.max(best, pop(m)); for (let j = i; j < masks.length; j++) if (!(m & masks[j])) go(j + 1, m | masks[j]); };
      go(0, 0);
      return best;
    }
  },
  'matchsticks-to-square': {
    fn: 'makesquare', params: ['matchsticks'], cmp: 'exact', meta: ['Matchsticks to Square', 'Medium', 'Backtracking'],
    ask: 'Use every matchstick exactly once, without breaking any, to form the four sides of a square. Return true if you can.',
    sig: {
      py: 'def makesquare(matchsticks: List[int]) -> bool:',
      js: 'function makesquare(matchsticks) {',
      java: 'public boolean makesquare(int[] matchsticks) {',
      cpp: 'bool makesquare(vector<int>& matchsticks) {',
      go: 'func makesquare(matchsticks []int) bool {'
    },
    examples: [[[[1, 1, 1, 1]], true], [[[2, 2, 2, 1]], false], [[[3, 1, 2, 2, 1, 3]], true]],
    hidden: [[[[5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3]], true], [[[1, 2, 3]], false], [[[10, 6, 5, 5, 5, 3, 3, 3, 2, 2, 2, 2]], true], [[[4, 4, 4, 4, 4]], false], [[[2, 2, 2, 2, 2, 2, 2, 2]], true], [[[6, 2, 2, 2, 2, 2, 2]], false]],
    ref: function (sticks) {
      const sum = sticks.reduce((a, b) => a + b, 0);
      if (sticks.length < 4 || sum % 4) return false;
      const side = sum / 4, a = sticks.slice().sort((x, y) => y - x), sides = [0, 0, 0, 0];
      const go = (i) => {
        if (i === a.length) return true;
        for (let s = 0; s < 4; s++) {
          if (sides[s] + a[i] > side) continue;
          if (s && sides.slice(0, s).includes(sides[s])) continue;
          sides[s] += a[i];
          if (go(i + 1)) return true;
          sides[s] -= a[i];
        }
        return false;
      };
      return go(0);
    }
  },
  'partition-to-k-equal-sum-subsets': {
    fn: 'canPartitionKSubsets', params: ['nums', 'k'], cmp: 'exact', meta: ['Partition to K Equal Sum Subsets', 'Medium', 'Backtracking'],
    ask: 'Return true if nums can be split into k non-empty groups that all have the same sum, using every value exactly once.',
    sig: {
      py: 'def canPartitionKSubsets(nums: List[int], k: int) -> bool:',
      js: 'function canPartitionKSubsets(nums, k) {',
      java: 'public boolean canPartitionKSubsets(int[] nums, int k) {',
      cpp: 'bool canPartitionKSubsets(vector<int>& nums, int k) {',
      go: 'func canPartitionKSubsets(nums []int, k int) bool {'
    },
    examples: [[[[2, 2, 4], 2], true], [[[1, 2, 3, 5], 2], false], [[[5, 5, 5], 3], true]],
    hidden: [[[[4, 3, 2, 3, 5, 2, 1], 4], true], [[[1, 1, 1, 1, 2, 2, 2, 2], 4], true], [[[2, 2, 2, 2, 3, 4, 5], 4], false], [[[10], 1], true], [[[1, 2, 3, 4], 3], false], [[[3, 3, 10, 2, 6, 5, 10, 6, 8, 3, 2, 1, 6, 10, 7, 2], 6], false]],
    ref: function (nums, k) {
      const sum = nums.reduce((a, b) => a + b, 0);
      if (sum % k) return false;
      const t = sum / k, a = nums.slice().sort((x, y) => y - x), bins = new Array(k).fill(0);
      if (a[0] > t) return false;
      const go = (i) => {
        if (i === a.length) return true;
        for (let b = 0; b < k; b++) {
          if (bins[b] + a[i] > t) continue;
          if (b && bins.slice(0, b).includes(bins[b])) continue;
          bins[b] += a[i];
          if (go(i + 1)) return true;
          bins[b] -= a[i];
        }
        return false;
      };
      return go(0);
    }
  },
  'sudoku-solver': {
    fn: 'solveSudoku', params: ['board'], cmp: 'any', io: { inplace: 0 }, meta: ['Sudoku Solver', 'Hard', 'Backtracking'],
    ask: 'Fill the empty cells (".") of the 9 by 9 board so every row, every column and every 3 by 3 box holds the digits 1 to 9 once each. Change board in place; the tests read it afterwards. Every puzzle here can be solved; any correct filling is accepted.',
    sig: {
      py: 'def solveSudoku(board: List[List[str]]) -> None:',
      js: 'function solveSudoku(board) {',
      java: 'public void solveSudoku(char[][] board) {',
      cpp: 'void solveSudoku(vector<vector<char>>& board) {',
      go: 'func solveSudoku(board [][]byte) {'
    },
    examples: [[[[['1', '2', '5', '.', '7', '9', '.', '.', '.'], ['.', '.', '9', '4', '.', '.', '1', '.', '.'], ['.', '3', '6', '1', '2', '5', '8', '.', '9'], ['.', '5', '.', '7', '9', '.', '3', '6', '1'], ['.', '9', '.', '3', '6', '1', '2', '5', '8'], ['3', '6', '1', '.', '.', '.', '7', '9', '4'], ['.', '.', '7', '9', '4', '.', '.', '1', '2'], ['9', '4', '.', '6', '1', '.', '.', '.', '7'], ['.', '1', '2', '5', '8', '7', '9', '.', '3']]], [['1', '2', '5', '8', '7', '9', '4', '3', '6'], ['8', '7', '9', '4', '3', '6', '1', '2', '5'], ['4', '3', '6', '1', '2', '5', '8', '7', '9'], ['2', '5', '8', '7', '9', '4', '3', '6', '1'], ['7', '9', '4', '3', '6', '1', '2', '5', '8'], ['3', '6', '1', '2', '5', '8', '7', '9', '4'], ['5', '8', '7', '9', '4', '3', '6', '1', '2'], ['9', '4', '3', '6', '1', '2', '5', '8', '7'], ['6', '1', '2', '5', '8', '7', '9', '4', '3']]], [[[['1', '.', '8', '3', '.', '.', '.', '4', '.'], ['.', '7', '2', '9', '4', '6', '.', '5', '8'], ['.', '4', '.', '1', '5', '.', '3', '.', '2'], ['.', '.', '.', '.', '2', '9', '4', '6', '.'], ['.', '.', '.', '4', '.', '.', '5', '8', '3'], ['4', '.', '.', '5', '.', '3', '.', '2', '.'], ['8', '.', '.', '2', '9', '.', '6', '.', '5'], ['.', '9', '.', '.', '1', '.', '8', '.', '.'], ['6', '1', '.', '.', '3', '.', '.', '9', '4']]], [['1', '5', '8', '3', '7', '2', '9', '4', '6'], ['3', '7', '2', '9', '4', '6', '1', '5', '8'], ['9', '4', '6', '1', '5', '8', '3', '7', '2'], ['5', '8', '3', '7', '2', '9', '4', '6', '1'], ['7', '2', '9', '4', '6', '1', '5', '8', '3'], ['4', '6', '1', '5', '8', '3', '7', '2', '9'], ['8', '3', '4', '2', '9', '7', '6', '1', '5'], ['2', '9', '5', '6', '1', '4', '8', '3', '7'], ['6', '1', '7', '8', '3', '5', '2', '9', '4']]], [[[['7', '.', '5', '4', '3', '.', '.', '.', '.'], ['.', '3', '1', '2', '6', '8', '.', '9', '.'], ['2', '6', '8', '7', '.', '.', '.', '.', '.'], ['9', '.', '.', '.', '.', '2', '.', '.', '7'], ['.', '.', '2', '.', '8', '.', '.', '.', '4'], ['.', '8', '7', '.', '5', '.', '3', '1', '.'], ['.', '.', '3', '1', '2', '6', '.', '.', '.'], ['.', '.', '6', '8', '7', '9', '5', '.', '3'], ['.', '.', '.', '.', '.', '.', '1', '.', '.']]], [['7', '9', '5', '4', '3', '1', '2', '6', '8'], ['4', '3', '1', '2', '6', '8', '7', '9', '5'], ['2', '6', '8', '7', '9', '5', '4', '3', '1'], ['9', '5', '4', '3', '1', '2', '6', '8', '7'], ['3', '1', '2', '6', '8', '7', '9', '5', '4'], ['6', '8', '7', '9', '5', '4', '3', '1', '2'], ['5', '4', '3', '1', '2', '6', '8', '7', '9'], ['1', '2', '6', '8', '7', '9', '5', '4', '3'], ['8', '7', '9', '5', '4', '3', '1', '2', '6']]]],
    hidden: [[[[['.', '8', '.', '6', '5', '3', '2', '7', '9'], ['.', '5', '.', '2', '7', '.', '4', '8', '.'], ['.', '.', '9', '.', '8', '.', '6', '5', '3'], ['8', '.', '6', '.', '.', '2', '7', '9', '.'], ['.', '.', '.', '.', '9', '4', '8', '1', '6'], ['7', '.', '.', '8', '.', '.', '.', '.', '.'], ['.', '6', '.', '3', '.', '7', '9', '4', '.'], ['.', '.', '.', '9', '4', '8', '.', '6', '5'], ['9', '4', '.', '1', '6', '.', '3', '2', '7']]], [['4', '8', '1', '6', '5', '3', '2', '7', '9'], ['6', '5', '3', '2', '7', '9', '4', '8', '1'], ['2', '7', '9', '4', '8', '1', '6', '5', '3'], ['8', '1', '6', '5', '3', '2', '7', '9', '4'], ['5', '3', '2', '7', '9', '4', '8', '1', '6'], ['7', '9', '4', '8', '1', '6', '5', '3', '2'], ['1', '6', '5', '3', '2', '7', '9', '4', '8'], ['3', '2', '7', '9', '4', '8', '1', '6', '5'], ['9', '4', '8', '1', '6', '5', '3', '2', '7']]], [[[['.', '.', '.', '.', '5', '8', '.', '1', '.'], ['.', '.', '.', '7', '.', '2', '.', '.', '9'], ['.', '1', '2', '.', '.', '9', '4', '.', '8'], ['6', '.', '.', '.', '.', '7', '.', '2', '3'], ['.', '.', '.', '.', '2', '3', '.', '.', '.'], ['.', '2', '3', '.', '.', '.', '.', '.', '.'], ['9', '.', '5', '.', '7', '1', '2', '3', '6'], ['.', '7', '.', '.', '.', '.', '.', '.', '5'], ['.', '.', '.', '9', '.', '5', '.', '7', '.']]], [['3', '6', '9', '4', '5', '8', '7', '1', '2'], ['4', '5', '8', '7', '1', '2', '3', '6', '9'], ['7', '1', '2', '3', '6', '9', '4', '5', '8'], ['6', '8', '4', '1', '9', '7', '5', '2', '3'], ['1', '9', '7', '5', '2', '3', '6', '8', '4'], ['5', '2', '3', '6', '8', '4', '1', '9', '7'], ['9', '4', '5', '8', '7', '1', '2', '3', '6'], ['8', '7', '1', '2', '3', '6', '9', '4', '5'], ['2', '3', '6', '9', '4', '5', '8', '7', '1']]], [[[['.', '5', '.', '9', '.', '.', '1', '.', '3'], ['.', '.', '4', '1', '2', '.', '.', '.', '.'], ['1', '.', '3', '7', '.', '.', '.', '8', '.'], ['5', '6', '.', '8', '.', '.', '2', '.', '7'], ['8', '4', '.', '.', '.', '7', '.', '6', '.'], ['.', '3', '7', '.', '6', '.', '8', '.', '1'], ['.', '.', '.', '.', '.', '.', '3', '.', '5'], ['4', '1', '.', '3', '7', '5', '6', '9', '.'], ['.', '7', '5', '.', '9', '8', '.', '1', '.']]], [['7', '5', '6', '9', '8', '4', '1', '2', '3'], ['9', '8', '4', '1', '2', '3', '7', '5', '6'], ['1', '2', '3', '7', '5', '6', '9', '8', '4'], ['5', '6', '9', '8', '4', '1', '2', '3', '7'], ['8', '4', '1', '2', '3', '7', '5', '6', '9'], ['2', '3', '7', '5', '6', '9', '8', '4', '1'], ['6', '9', '8', '4', '1', '2', '3', '7', '5'], ['4', '1', '2', '3', '7', '5', '6', '9', '8'], ['3', '7', '5', '6', '9', '8', '4', '1', '2']]], [[[['8', '.', '5', '.', '1', '2', '7', '.', '4'], ['6', '.', '.', '7', '.', '4', '.', '.', '5'], ['.', '.', '.', '8', '.', '5', '6', '.', '.'], ['3', '.', '.', '.', '.', '.', '.', '.', '8'], ['.', '.', '.', '.', '4', '.', '3', '5', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '6', '.', '2', '7', '9', '4', '.', '3'], ['.', '.', '.', '4', '8', '3', '5', '6', '1'], ['.', '.', '.', '5', '.', '.', '.', '7', '9']]], [['8', '3', '5', '6', '1', '2', '7', '9', '4'], ['6', '1', '2', '7', '9', '4', '8', '3', '5'], ['7', '4', '9', '8', '3', '5', '6', '1', '2'], ['3', '5', '6', '1', '2', '7', '9', '4', '8'], ['1', '2', '8', '9', '4', '6', '3', '5', '7'], ['9', '7', '4', '3', '5', '8', '1', '2', '6'], ['5', '6', '1', '2', '7', '9', '4', '8', '3'], ['2', '9', '7', '4', '8', '3', '5', '6', '1'], ['4', '8', '3', '5', '6', '1', '2', '7', '9']]], [[[['5', '.', '9', '2', '8', '3', '4', '7', '6'], ['2', '8', '.', '4', '7', '.', '5', '.', '9'], ['.', '7', '6', '5', '1', '.', '.', '.', '.'], ['1', '9', '2', '.', '3', '.', '7', '6', '5'], ['8', '.', '4', '7', '.', '5', '1', '.', '.'], ['7', '6', '5', '1', '9', '2', '8', '3', '4'], ['9', '.', '8', '3', '.', '7', '6', '.', '1'], ['.', '4', '7', '6', '5', '.', '9', '2', '8'], ['.', '.', '1', '9', '.', '8', '.', '4', '.']]], [['5', '1', '9', '2', '8', '3', '4', '7', '6'], ['2', '8', '3', '4', '7', '6', '5', '1', '9'], ['4', '7', '6', '5', '1', '9', '2', '8', '3'], ['1', '9', '2', '8', '3', '4', '7', '6', '5'], ['8', '3', '4', '7', '6', '5', '1', '9', '2'], ['7', '6', '5', '1', '9', '2', '8', '3', '4'], ['9', '2', '8', '3', '4', '7', '6', '5', '1'], ['3', '4', '7', '6', '5', '1', '9', '2', '8'], ['6', '5', '1', '9', '2', '8', '3', '4', '7']]]],
    check: function (args, got) {
      const clue = args[0];
      if (!Array.isArray(got) || got.length !== 9) return false;
      const ok = (cells) => cells.slice().sort().join('') === '123456789';
      for (let i = 0; i < 9; i++) {
        if (!Array.isArray(got[i]) || got[i].length !== 9) return false;
        if (!ok(got[i]) || !ok(got.map((r) => r[i]))) return false;
        const box = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box.push(got[3 * Math.floor(i / 3) + r][3 * (i % 3) + c]);
        if (!ok(box)) return false;
        for (let j = 0; j < 9; j++) if (clue[i][j] !== '.' && clue[i][j] !== got[i][j]) return false;
      }
      return true;
    },
    ref: function (board) {
      const rows = Array.from({ length: 9 }, () => new Set()), cols = Array.from({ length: 9 }, () => new Set()), boxes = Array.from({ length: 9 }, () => new Set());
      const empty = [];
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        const v = board[r][c];
        if (v === '.') empty.push([r, c]);
        else { rows[r].add(v); cols[c].add(v); boxes[3 * Math.floor(r / 3) + Math.floor(c / 3)].add(v); }
      }
      const go = (i) => {
        if (i === empty.length) return true;
        const [r, c] = empty[i], b = 3 * Math.floor(r / 3) + Math.floor(c / 3);
        for (let d = 1; d <= 9; d++) {
          const v = String(d);
          if (rows[r].has(v) || cols[c].has(v) || boxes[b].has(v)) continue;
          board[r][c] = v; rows[r].add(v); cols[c].add(v); boxes[b].add(v);
          if (go(i + 1)) return true;
          rows[r].delete(v); cols[c].delete(v); boxes[b].delete(v); board[r][c] = '.';
        }
        return false;
      };
      go(0);
    }
  },
  'permutation-sequence': {
    fn: 'getPermutation', params: ['n', 'k'], cmp: 'exact', meta: ['Permutation Sequence', 'Hard', 'Backtracking'],
    ask: 'List every ordering of the digits 1 to n in increasing order, as numbers. Return the k-th one (counting from 1) as a string.',
    sig: {
      py: 'def getPermutation(n: int, k: int) -> str:',
      js: 'function getPermutation(n, k) {',
      java: 'public String getPermutation(int n, int k) {',
      cpp: 'string getPermutation(int n, int k) {',
      go: 'func getPermutation(n int, k int) string {'
    },
    examples: [[[3, 2], '132'], [[1, 1], '1'], [[4, 24], '4321']],
    hidden: [[[3, 1], '123'], [[3, 5], '312'], [[4, 9], '2314'], [[9, 1], '123456789'], [[9, 362880], '987654321'], [[7, 2021], '3671524']],
    ref: function (n, k) {
      const digits = Array.from({ length: n }, (_, i) => i + 1), fact = [1];
      for (let i = 1; i <= n; i++) fact.push(fact[i - 1] * i);
      let out = '';
      k--;
      for (let i = n; i >= 1; i--) { const j = Math.floor(k / fact[i - 1]); out += digits.splice(j, 1)[0]; k %= fact[i - 1]; }
      return out;
    }
  },
  'unique-paths-iii': {
    fn: 'uniquePathsIII', params: ['grid'], cmp: 'exact', meta: ['Unique Paths III', 'Hard', 'Backtracking'],
    ask: 'In the grid, 1 is the start, 2 is the end, 0 is open and -1 is a wall. Count the walks from start to end, moving up, down, left or right, that step on every open cell exactly once.',
    sig: {
      py: 'def uniquePathsIII(grid: List[List[int]]) -> int:',
      js: 'function uniquePathsIII(grid) {',
      java: 'public int uniquePathsIII(int[][] grid) {',
      cpp: 'int uniquePathsIII(vector<vector<int>>& grid) {',
      go: 'func uniquePathsIII(grid [][]int) int {'
    },
    examples: [[[[[1, 2]]], 1], [[[[1, 0, 2]]], 1], [[[[1, 0], [0, 2]]], 0]],
    hidden: [[[[[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, -1]]], 2], [[[[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]]], 4], [[[[0, 1], [2, 0]]], 0], [[[[1, -1], [0, 2]]], 1], [[[[1, 0, 0], [0, -1, 0], [0, 0, 2]]], 0]],
    ref: function (grid) {
      const m = grid.length, n = grid[0].length;
      let sr = 0, sc = 0, open = 0;
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) { if (grid[i][j] !== -1) open++; if (grid[i][j] === 1) { sr = i; sc = j; } }
      const g = grid.map((r) => r.slice());
      const go = (r, c, left) => {
        if (r < 0 || c < 0 || r >= m || c >= n || g[r][c] === -1) return 0;
        if (g[r][c] === 2) return left === 1 ? 1 : 0;
        const keep = g[r][c];
        g[r][c] = -1;
        const total = go(r + 1, c, left - 1) + go(r - 1, c, left - 1) + go(r, c + 1, left - 1) + go(r, c - 1, left - 1);
        g[r][c] = keep;
        return total;
      };
      return go(sr, sc, open);
    }
  },
  'remove-invalid-parentheses': {
    fn: 'removeInvalidParentheses', params: ['s'], cmp: 'unordered', meta: ['Remove Invalid Parentheses', 'Hard', 'Backtracking'],
    ask: 's has letters and the brackets ( and ). Delete the fewest brackets so the brackets are all matched. Return every different result of that size, in any order.',
    sig: {
      py: 'def removeInvalidParentheses(s: str) -> List[str]:',
      js: 'function removeInvalidParentheses(s) {',
      java: 'public String[] removeInvalidParentheses(String s) {',
      cpp: 'vector<string> removeInvalidParentheses(string s) {',
      go: 'func removeInvalidParentheses(s string) []string {'
    },
    examples: [[['(a)())'], ['(a())', '(a)()']], [[')('], ['']], [['x'], ['x']]],
    hidden: [[['()())()'], ['(())()', '()()()']], [['(((k()(('], ['k()', '(k)']], [['n'], ['n']], [['()'], ['()']], [[')a)b(c)d('], ['ab(c)d']], [['(()'], ['()']]],
    ref: function (s) {
      const valid = (t) => { let b = 0; for (const ch of t) { if (ch === '(') b++; else if (ch === ')' && --b < 0) return false; } return b === 0; };
      let level = new Set([s]);
      while (level.size) {
        const good = [...level].filter(valid);
        if (good.length) return good;
        const next = new Set();
        for (const t of level) for (let i = 0; i < t.length; i++) if (t[i] === '(' || t[i] === ')') next.add(t.slice(0, i) + t.slice(i + 1));
        level = next;
      }
      return [''];
    }
  },
  'solving-questions-with-brainpower': {
    fn: 'mostPoints', params: ['questions'], cmp: 'exact', meta: ['Solving Questions With Brainpower', 'Medium', 'Dynamic Programming'],
    ask: 'Go through questions in order. Question i = [points, brainpower]: solve it to earn points and skip the next brainpower questions, or skip it and move on. Return the most points you can earn.',
    sig: {
      py: 'def mostPoints(questions: List[List[int]]) -> int:',
      js: 'function mostPoints(questions) {',
      java: 'public long mostPoints(int[][] questions) {',
      cpp: 'long long mostPoints(vector<vector<int>>& questions) {',
      go: 'func mostPoints(questions [][]int) int64 {'
    },
    examples: [[[[[5, 1], [3, 0], [4, 2]]], 9], [[[[1, 0]]], 1], [[[[2, 5], [3, 0], [3, 0]]], 6]],
    hidden: [[[[[3, 2], [4, 3], [4, 4], [2, 5]]], 5], [[[[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]], 7], [[[[10, 0], [10, 0], [10, 0]]], 30], [[[[100, 100]]], 100], [[[[1, 0], [50, 1], [1, 0], [50, 0]]], 101]],
    ref: function (q) {
      const dp = new Array(q.length + 1).fill(0);
      for (let i = q.length - 1; i >= 0; i--) dp[i] = Math.max(dp[i + 1], q[i][0] + dp[Math.min(q.length, i + q[i][1] + 1)]);
      return dp[0];
    }
  },
  'best-time-to-buy-and-sell-stock-iv': {
    fn: 'maxProfit', params: ['k', 'prices'], cmp: 'exact', meta: ['Best Time to Buy and Sell Stock IV', 'Hard', 'Dynamic Programming'],
    ask: 'prices[i] is a share\'s price on day i. Make at most k trades, each a buy then a later sell, holding one share at most at a time. Return the best total profit.',
    sig: {
      py: 'def maxProfit(k: int, prices: List[int]) -> int:',
      js: 'function maxProfit(k, prices) {',
      java: 'public int maxProfit(int k, int[] prices) {',
      cpp: 'int maxProfit(int k, vector<int>& prices) {',
      go: 'func maxProfit(k int, prices []int) int {'
    },
    examples: [[[1, [3, 1, 4]], 3], [[2, [1, 5, 2, 8]], 10], [[2, [9, 7, 4]], 0]],
    hidden: [[[2, [3, 2, 6, 5, 0, 3]], 7], [[0, [1, 3]], 0], [[3, [1, 2, 4, 2, 5, 7, 2, 4, 9, 0]], 15], [[1, [5]], 0], [[100, [1, 9, 2, 8, 3, 7]], 18], [[2, [6, 1, 3, 2, 4, 7]], 7]],
    ref: function (k, prices) {
      const buy = new Array(k + 1).fill(-Infinity), sell = new Array(k + 1).fill(0);
      for (const p of prices) for (let j = 1; j <= k; j++) { buy[j] = Math.max(buy[j], sell[j - 1] - p); sell[j] = Math.max(sell[j], buy[j] + p); }
      return sell[k];
    }
  },
  'maximum-profit-in-job-scheduling': {
    fn: 'jobScheduling', params: ['startTime', 'endTime', 'profit'], cmp: 'exact', meta: ['Maximum Profit in Job Scheduling', 'Hard', 'Dynamic Programming'],
    ask: 'Job i runs from startTime[i] to endTime[i] and pays profit[i]. Pick jobs that do not overlap (one may start at the very time another ends) to earn the most. Return that most.',
    sig: {
      py: 'def jobScheduling(startTime: List[int], endTime: List[int], profit: List[int]) -> int:',
      js: 'function jobScheduling(startTime, endTime, profit) {',
      java: 'public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {',
      cpp: 'int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {',
      go: 'func jobScheduling(startTime []int, endTime []int, profit []int) int {'
    },
    examples: [[[[1, 2], [3, 4], [5, 6]], 6], [[[1, 3], [3, 5], [4, 2]], 6], [[[1], [2], [7]], 7]],
    hidden: [[[[1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]], 120], [[[1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60]], 150], [[[1, 1, 1], [2, 3, 4], [5, 6, 4]], 6], [[[4, 2, 4, 8, 2], [5, 5, 5, 10, 8], [1, 2, 8, 10, 4]], 18], [[[1, 5, 10], [5, 10, 15], [1, 1, 1]], 3]],
    ref: function (s, e, p) {
      const jobs = s.map((x, i) => [x, e[i], p[i]]).sort((a, b) => a[1] - b[1]);
      const ends = [0], best = [0];
      for (const [a, b, c] of jobs) {
        let lo = 0, hi = ends.length - 1;
        while (lo < hi) { const m = (lo + hi + 1) >> 1; if (ends[m] <= a) lo = m; else hi = m - 1; }
        const take = best[lo] + c;
        if (take > best[best.length - 1]) { ends.push(b); best.push(take); }
      }
      return best[best.length - 1];
    }
  },
  'burst-balloons': {
    fn: 'maxCoins', params: ['nums'], cmp: 'exact', meta: ['Burst Balloons', 'Hard', 'Dynamic Programming'],
    ask: 'Balloons stand in a row with the numbers in nums. Bursting one earns its number times the numbers of its current left and right neighbours (a missing neighbour counts as 1); then the neighbours close the gap. Burst them all, earning the most. Return that most.',
    sig: {
      py: 'def maxCoins(nums: List[int]) -> int:',
      js: 'function maxCoins(nums) {',
      java: 'public int maxCoins(int[] nums) {',
      cpp: 'int maxCoins(vector<int>& nums) {',
      go: 'func maxCoins(nums []int) int {'
    },
    examples: [[[[5]], 5], [[[1, 5]], 10], [[[2, 3, 4]], 36]],
    hidden: [[[[3, 1, 5, 8]], 167], [[[0, 0]], 0], [[[9, 76, 64, 21]], 116718], [[[1, 1, 1, 1]], 4], [[[7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]], 1654]],
    ref: function (nums) {
      const a = [1, ...nums, 1], n = a.length, dp = Array.from({ length: n }, () => new Array(n).fill(0));
      for (let len = 2; len < n; len++) for (let l = 0; l + len < n; l++) {
        const r = l + len;
        for (let i = l + 1; i < r; i++) dp[l][r] = Math.max(dp[l][r], dp[l][i] + dp[i][r] + a[l] * a[i] * a[r]);
      }
      return dp[0][n - 1];
    }
  },
  'regular-expression-matching': {
    fn: 'isMatch', params: ['s', 'p'], cmp: 'exact', meta: ['Regular Expression Matching', 'Hard', 'Dynamic Programming'],
    ask: 'The pattern p has letters, "." which matches any one letter, and "*" which means zero or more of the letter (or ".") just before it. Return true if p matches the whole of s.',
    sig: {
      py: 'def isMatch(s: str, p: str) -> bool:',
      js: 'function isMatch(s, p) {',
      java: 'public boolean isMatch(String s, String p) {',
      cpp: 'bool isMatch(string s, string p) {',
      go: 'func isMatch(s string, p string) bool {'
    },
    examples: [[['abc', 'a.c'], true], [['aaa', 'a*'], true], [['ab', '.*c'], false]],
    hidden: [[['', 'x*y*'], true], [['', '.'], false], [['mississippi', 'mis*is*p*.'], false], [['aab', 'c*a*b'], true], [['ab', '.*'], true], [['aaa', 'ab*a*c*a'], true], [['abcd', 'd*'], false]],
    ref: function (s, p) {
      const dp = Array.from({ length: s.length + 1 }, () => new Array(p.length + 1).fill(false));
      dp[s.length][p.length] = true;
      for (let i = s.length; i >= 0; i--) for (let j = p.length - 1; j >= 0; j--) {
        const first = i < s.length && (p[j] === s[i] || p[j] === '.');
        dp[i][j] = j + 1 < p.length && p[j + 1] === '*' ? dp[i][j + 2] || (first && dp[i + 1][j]) : first && dp[i + 1][j + 1];
      }
      return dp[0][0];
    }
  },
  'design-linked-list': {
    fn: 'MyLinkedList', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['Design Linked List', 'Medium', 'Linked Lists'],
    ask: 'Build a linked list class (no built-in list types for the nodes). get(index) returns the value at index, or -1 if there is none. addAtHead(val) and addAtTail(val) add a node at either end. addAtIndex(index, val) puts val before the node at index; when index equals the length it adds at the tail, and when it is larger nothing happens. deleteAtIndex(index) removes that node if it exists. Indexes count from 0.',
    sig: {
      py: 'class MyLinkedList:',
      js: 'class MyLinkedList {',
      java: 'class MyLinkedList {',
      cpp: 'class MyLinkedList {',
      go: 'type MyLinkedList struct {'
    },
    starter: {
      py: 'class MyLinkedList:\n    def __init__(self):\n        pass\n\n    def get(self, index: int) -> int:\n        pass\n\n    def addAtHead(self, val: int) -> None:\n        pass\n\n    def addAtTail(self, val: int) -> None:\n        pass\n\n    def addAtIndex(self, index: int, val: int) -> None:\n        pass\n\n    def deleteAtIndex(self, index: int) -> None:\n        pass\n',
      js: 'class MyLinkedList {\n  constructor() {\n  }\n  get(index) {\n  }\n  addAtHead(val) {\n  }\n  addAtTail(val) {\n  }\n  addAtIndex(index, val) {\n  }\n  deleteAtIndex(index) {\n  }\n}\n',
      java: 'class MyLinkedList {\n    public MyLinkedList() {\n    }\n    public int get(int index) {\n        return 0;\n    }\n    public void addAtHead(int val) {\n    }\n    public void addAtTail(int val) {\n    }\n    public void addAtIndex(int index, int val) {\n    }\n    public void deleteAtIndex(int index) {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyLinkedList {\npublic:\n    MyLinkedList() {\n    }\n    int get(int index) {\n        return {};\n    }\n    void addAtHead(int val) {\n    }\n    void addAtTail(int val) {\n    }\n    void addAtIndex(int index, int val) {\n    }\n    void deleteAtIndex(int index) {\n    }\n};\n',
      go: 'package main\n\ntype MyLinkedList struct {\n}\n\nfunc Constructor() MyLinkedList {\n    return MyLinkedList{}\n}\n\nfunc (this *MyLinkedList) Get(index int) int {\n    return 0\n}\n\nfunc (this *MyLinkedList) AddAtHead(val int) {\n}\n\nfunc (this *MyLinkedList) AddAtTail(val int) {\n}\n\nfunc (this *MyLinkedList) AddAtIndex(index int, val int) {\n}\n\nfunc (this *MyLinkedList) DeleteAtIndex(index int) {\n}\n'
    },
    examples: [[[['addAtHead', 'addAtTail', 'addAtIndex', 'get', 'deleteAtIndex', 'get'], [[4], [8], [1, 6], [1], [0], [0]]], [null, null, null, 6, null, 6]], [[['get', 'addAtTail', 'get'], [[0], [3], [0]]], [-1, null, 3]], [[['addAtIndex', 'addAtIndex', 'get', 'get'], [[1, 5], [0, 7], [0], [1]]], [null, null, 7, -1]]],
    hidden: [[[['addAtHead', 'addAtHead', 'addAtHead', 'deleteAtIndex', 'get', 'get', 'get'], [[1], [2], [3], [1], [0], [1], [2]]], [null, null, null, null, 3, 1, -1]], [[['addAtTail', 'addAtTail', 'addAtIndex', 'get', 'get', 'get'], [[1], [3], [2, 9], [0], [1], [2]]], [null, null, null, 1, 3, 9]], [[['addAtHead', 'deleteAtIndex', 'get', 'deleteAtIndex'], [[5], [0], [0], [0]]], [null, null, -1, null]], [[['addAtHead', 'addAtTail', 'addAtTail', 'deleteAtIndex', 'deleteAtIndex', 'get', 'addAtIndex', 'get'], [[1], [2], [3], [2], [5], [1], [1, 4], [1]]], [null, null, null, null, null, 2, null, 4]], [[['addAtIndex', 'get', 'addAtIndex', 'addAtIndex', 'get', 'get', 'get'], [[0, 10], [0], [1, 30], [1, 20], [0], [1], [2]]], [null, 10, null, null, 10, 20, 30]]],
    ref: class {
      constructor() { this.head = { next: null }; this.size = 0; }
      at(i) { let n = this.head; for (let k = 0; k <= i; k++) n = n.next; return n; }
      get(index) { return index >= 0 && index < this.size ? this.at(index).val : -1; }
      addAtHead(val) { this.addAtIndex(0, val); }
      addAtTail(val) { this.addAtIndex(this.size, val); }
      addAtIndex(index, val) {
        if (index < 0 || index > this.size) return;
        const prev = index === 0 ? this.head : this.at(index - 1);
        prev.next = { val, next: prev.next }; this.size++;
      }
      deleteAtIndex(index) {
        if (index < 0 || index >= this.size) return;
        const prev = index === 0 ? this.head : this.at(index - 1);
        prev.next = prev.next.next; this.size--;
      }
    }
  },
  'remove-duplicates-from-sorted-list-ii': {
    fn: 'deleteDuplicates', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Remove Duplicates from Sorted List II', 'Medium', 'Linked Lists'],
    ask: 'The list is sorted. Remove every value that appears more than once, keeping only the values that appear exactly once, and return the head.',
    sig: {
      py: 'def deleteDuplicates(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function deleteDuplicates(head) {',
      java: 'public ListNode deleteDuplicates(ListNode head) {',
      cpp: 'ListNode* deleteDuplicates(ListNode* head) {',
      go: 'func deleteDuplicates(head *ListNode) *ListNode {'
    },
    examples: [[[[1, 2, 2, 3]], [1, 3]], [[[4, 4]], []], [[[1, 1, 2]], [2]]],
    hidden: [[[[]], []], [[[5]], [5]], [[[1, 1, 1, 2, 3, 3, 4]], [2, 4]], [[[-3, -3, -1, 0, 0, 7, 8, 8]], [-1, 7]], [[[1, 2, 3, 4]], [1, 2, 3, 4]]],
    ref: function (head) {
      const dummy = { next: head };
      let prev = dummy, cur = head;
      while (cur) {
        if (cur.next && cur.next.val === cur.val) { const v = cur.val; while (cur && cur.val === v) cur = cur.next; prev.next = cur; }
        else { prev = cur; cur = cur.next; }
      }
      return dummy.next;
    }
  },
  'copy-list-with-random-pointer': {
    fn: 'copyRandomList', params: ['head'], cmp: 'exact', io: { args: ['rlist'], ret: 'rlist' }, meta: ['Copy List with Random Pointer', 'Medium', 'Linked Lists'],
    ask: 'Each node has val, next and random, where random points at any node of the list or is null. Return a deep copy: brand new nodes (make them with ListNode and set random yourself) with the same values, next order and random links, none pointing into the original. The tests write a list as [[val, index of the random node or null], ...].',
    sig: {
      py: 'def copyRandomList(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function copyRandomList(head) {',
      java: 'public ListNode copyRandomList(ListNode head) {',
      cpp: 'ListNode* copyRandomList(ListNode* head) {',
      go: 'func copyRandomList(head *ListNode) *ListNode {'
    },
    examples: [[[[[3, null], [4, 0]]], [[3, null], [4, 0]]], [[[]], []], [[[[1, 1], [2, 1]]], [[1, 1], [2, 1]]]],
    hidden: [[[[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]], [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]], [[[[5, 0]]], [[5, 0]]], [[[[1, 2], [2, 0], [3, 1]]], [[1, 2], [2, 0], [3, 1]]], [[[[9, null], [9, null]]], [[9, null], [9, null]]], [[[[0, 3], [1, 3], [2, 3], [3, 3]]], [[0, 3], [1, 3], [2, 3], [3, 3]]]],
    ref: function (head) {
      if (!head) return null;
      const copy = new Map();
      for (let n = head; n; n = n.next) copy.set(n, new head.constructor(n.val));
      for (let n = head; n; n = n.next) { const c = copy.get(n); c.next = n.next ? copy.get(n.next) : null; c.random = n.random ? copy.get(n.random) : null; }
      return copy.get(head);
    }
  },
  'remove-duplicate-letters': {
    fn: 'removeDuplicateLetters', params: ['s'], cmp: 'exact', meta: ['Remove Duplicate Letters', 'Medium', 'Monotonic Stack & Queue'],
    ask: 'Delete letters from s so each different letter stays exactly once, keeping the remaining letters in their order. Of all the possible results, return the one that comes first alphabetically.',
    sig: {
      py: 'def removeDuplicateLetters(s: str) -> str:',
      js: 'function removeDuplicateLetters(s) {',
      java: 'public String removeDuplicateLetters(String s) {',
      cpp: 'string removeDuplicateLetters(string s) {',
      go: 'func removeDuplicateLetters(s string) string {'
    },
    examples: [[['bab'], 'ab'], [['zyxz'], 'yxz'], [['aaa'], 'a']],
    hidden: [[['bcabc'], 'abc'], [['abacb'], 'abc'], [['thequickbrownz'], 'thequickbrownz'], [['ecbacba'], 'eacb'], [['z'], 'z'], [['dcbadcba'], 'adcb']],
    ref: function (s) {
      const last = {}, used = new Set(), st = [];
      for (let i = 0; i < s.length; i++) last[s[i]] = i;
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (used.has(ch)) continue;
        while (st.length && st[st.length - 1] > ch && last[st[st.length - 1]] > i) used.delete(st.pop());
        st.push(ch); used.add(ch);
      }
      return st.join('');
    }
  },
  'longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit': {
    fn: 'longestSubarray', params: ['nums', 'limit'], cmp: 'exact', meta: ['Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit', 'Medium', 'Monotonic Stack & Queue'],
    ask: 'Return the length of the longest stretch of neighbouring values in nums where the largest and smallest values differ by at most limit.',
    sig: {
      py: 'def longestSubarray(nums: List[int], limit: int) -> int:',
      js: 'function longestSubarray(nums, limit) {',
      java: 'public int longestSubarray(int[] nums, int limit) {',
      cpp: 'int longestSubarray(vector<int>& nums, int limit) {',
      go: 'func longestSubarray(nums []int, limit int) int {'
    },
    examples: [[[[1, 3, 6], 2], 2], [[[5, 5, 5], 0], 3], [[[1, 9, 2, 8], 0], 1]],
    hidden: [[[[8, 2, 4, 7], 4], 2], [[[10, 1, 2, 4, 7, 2], 5], 4], [[[4, 2, 2, 2, 4, 4, 2, 2], 0], 3], [[[1], 10], 1], [[[1, 5, 6, 7, 8, 10, 6, 5, 6], 4], 5]],
    ref: function (nums, limit) {
      const mx = [], mn = [];
      let l = 0, best = 0;
      for (let r = 0; r < nums.length; r++) {
        while (mx.length && mx[mx.length - 1] < nums[r]) mx.pop();
        while (mn.length && mn[mn.length - 1] > nums[r]) mn.pop();
        mx.push(nums[r]); mn.push(nums[r]);
        while (mx[0] - mn[0] > limit) { if (mx[0] === nums[l]) mx.shift(); if (mn[0] === nums[l]) mn.shift(); l++; }
        best = Math.max(best, r - l + 1);
      }
      return best;
    }
  },
  'maximal-rectangle': {
    fn: 'maximalRectangle', params: ['matrix'], cmp: 'exact', meta: ['Maximal Rectangle', 'Hard', 'Monotonic Stack & Queue'],
    ask: 'matrix holds "0" and "1". Return the area of the largest rectangle that holds only "1"s.',
    sig: {
      py: 'def maximalRectangle(matrix: List[List[str]]) -> int:',
      js: 'function maximalRectangle(matrix) {',
      java: 'public int maximalRectangle(char[][] matrix) {',
      cpp: 'int maximalRectangle(vector<vector<char>>& matrix) {',
      go: 'func maximalRectangle(matrix [][]byte) int {'
    },
    examples: [[[[['1', '1'], ['1', '1']]], 4], [[[['0']]], 0], [[[['1', '0', '1'], ['1', '1', '1']]], 3]],
    hidden: [[[[['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]], 6], [[[['1']]], 1], [[[['0', '1'], ['1', '0']]], 1], [[[['1', '1', '1', '1']]], 4], [[[['0', '1', '1', '0'], ['1', '1', '1', '1'], ['1', '1', '1', '1'], ['0', '1', '1', '0']]], 8]],
    ref: function (matrix) {
      const n = matrix[0].length, h = new Array(n).fill(0);
      let best = 0;
      for (const row of matrix) {
        for (let j = 0; j < n; j++) h[j] = row[j] === '1' ? h[j] + 1 : 0;
        const st = [];
        for (let j = 0; j <= n; j++) {
          const cur = j === n ? 0 : h[j];
          while (st.length && h[st[st.length - 1]] >= cur) { const top = st.pop(), left = st.length ? st[st.length - 1] : -1; best = Math.max(best, h[top] * (j - left - 1)); }
          st.push(j);
        }
      }
      return best;
    }
  },
  'shortest-subarray-with-sum-at-least-k': {
    fn: 'shortestSubarray', params: ['nums', 'k'], cmp: 'exact', meta: ['Shortest Subarray with Sum at Least K', 'Hard', 'Monotonic Stack & Queue'],
    ask: 'Values may be negative. Return the length of the shortest non-empty stretch of neighbouring values whose sum is at least k, or -1 if none exists.',
    sig: {
      py: 'def shortestSubarray(nums: List[int], k: int) -> int:',
      js: 'function shortestSubarray(nums, k) {',
      java: 'public int shortestSubarray(int[] nums, int k) {',
      cpp: 'int shortestSubarray(vector<int>& nums, int k) {',
      go: 'func shortestSubarray(nums []int, k int) int {'
    },
    examples: [[[[2, -1, 2], 3], 3], [[[1], 2], -1], [[[5, 1, 1], 5], 1]],
    hidden: [[[[1, 2], 4], -1], [[[84, -37, 32, 40, 95], 167], 3], [[[-28, 81, -20, 28, -29], 89], 3], [[[17, 85, 93, -45, -21], 150], 2], [[[1, 1, 1, 1, 1], 5], 5]],
    ref: function (nums, k) {
      const pre = [0];
      for (const x of nums) pre.push(pre[pre.length - 1] + x);
      const dq = [];
      let best = Infinity;
      for (let i = 0; i < pre.length; i++) {
        while (dq.length && pre[i] - pre[dq[0]] >= k) best = Math.min(best, i - dq.shift());
        while (dq.length && pre[dq[dq.length - 1]] >= pre[i]) dq.pop();
        dq.push(i);
      }
      return best === Infinity ? -1 : best;
    }
  },
  'number-of-visible-people-in-a-queue': {
    fn: 'canSeePersonsCount', params: ['heights'], cmp: 'exact', meta: ['Number of Visible People in a Queue', 'Hard', 'Monotonic Stack & Queue'],
    ask: 'People stand in a line facing right, all with different heights. Person i can see person j further right when everyone between them is shorter than both. Return, for each person, how many people they can see.',
    sig: {
      py: 'def canSeePersonsCount(heights: List[int]) -> List[int]:',
      js: 'function canSeePersonsCount(heights) {',
      java: 'public int[] canSeePersonsCount(int[] heights) {',
      cpp: 'vector<int> canSeePersonsCount(vector<int>& heights) {',
      go: 'func canSeePersonsCount(heights []int) []int {'
    },
    examples: [[[[3, 1, 2]], [2, 1, 0]], [[[5]], [0]], [[[1, 2, 3]], [1, 1, 0]]],
    hidden: [[[[10, 6, 8, 5, 11, 9]], [3, 1, 2, 1, 1, 0]], [[[5, 1, 2, 3, 10]], [4, 1, 1, 1, 0]], [[[4, 3, 2, 1]], [1, 1, 1, 0]], [[[2, 9, 1, 8, 3, 7]], [1, 2, 1, 2, 1, 0]], [[[1, 5, 2, 4, 3]], [1, 2, 1, 1, 0]]],
    ref: function (heights) {
      const out = new Array(heights.length).fill(0), st = [];
      for (let i = heights.length - 1; i >= 0; i--) {
        while (st.length && st[st.length - 1] < heights[i]) { st.pop(); out[i]++; }
        if (st.length) out[i]++;
        st.push(heights[i]);
      }
      return out;
    }
  },
  'delete-node-in-a-bst': {
    fn: 'deleteNode', params: ['root', 'key'], cmp: 'any', io: { args: ['tree', null], ret: 'tree' }, meta: ['Delete Node in a BST', 'Medium', 'Trees'],
    ask: 'Remove the node holding key from the binary search tree, if it is there, and return the root. The result must still be a binary search tree; any valid shape is accepted.',
    sig: {
      py: 'def deleteNode(root: Optional[TreeNode], key: int) -> Optional[TreeNode]:',
      js: 'function deleteNode(root, key) {',
      java: 'public TreeNode deleteNode(TreeNode root, int key) {',
      cpp: 'TreeNode* deleteNode(TreeNode* root, int key) {',
      go: 'func deleteNode(root *TreeNode, key int) *TreeNode {'
    },
    examples: [[[[5, 3, 6], 3], [5, null, 6]], [[[1], 1], []], [[[2, 1, 3], 9], [2, 1, 3]]],
    hidden: [[[[5, 3, 6, 2, 4, null, 7], 3], [5, 4, 6, 2, null, null, 7]], [[[5, 3, 6, 2, 4, null, 7], 5], [6, 3, 7, 2, 4]], [[[], 0], []], [[[8, 4, 12, 2, 6, 10, 14], 12], [8, 4, 14, 2, 6, 10]], [[[1, null, 2, null, 3], 1], [2, null, 3]]],
    check: function (args, got) {
      if (!Array.isArray(got)) return false;
      const build = (a) => {
        if (!a.length || a[0] === null) return null;
        const root = { v: a[0], l: null, r: null }, q = [root];
        let k = 1;
        for (let h = 0; h < q.length && k < a.length; h++) {
          if (k < a.length && a[k] !== null) { q[h].l = { v: a[k], l: null, r: null }; q.push(q[h].l); } k++;
          if (k < a.length && a[k] !== null) { q[h].r = { v: a[k], l: null, r: null }; q.push(q[h].r); } k++;
        }
        return root;
      };
      const ino = (n, out) => { if (n) { ino(n.l, out); out.push(n.v); ino(n.r, out); } return out; };
      const before = ino(build(args[0]), []).filter((v) => v !== args[1]);
      const after = ino(build(got), []);
      return JSON.stringify(before) === JSON.stringify(after);
    },
    ref: function (root, key) {
      const del = (n) => {
        if (!n) return null;
        if (key < n.val) { n.left = del(n.left); return n; }
        if (key > n.val) { n.right = del(n.right); return n; }
        if (!n.left) return n.right;
        if (!n.right) return n.left;
        let m = n.right;
        while (m.left) m = m.left;
        n.val = m.val;
        const k2 = m.val;
        const del2 = (x) => { if (!x) return null; if (k2 < x.val) { x.left = del2(x.left); return x; } if (k2 > x.val) { x.right = del2(x.right); return x; } return x.right; };
        n.right = del2(n.right);
        return n;
      };
      return del(root);
    }
  },
  'binary-search-tree-iterator': {
    fn: 'BSTIterator', params: ['ops', 'args'], cmp: 'exact', io: { ctorArgs: ['tree'], design: true, ctor: true }, meta: ['Binary Search Tree Iterator', 'Medium', 'Trees'],
    ask: 'BSTIterator(root) walks a binary search tree in sorted order. next() returns the next smallest value; hasNext() says whether one is left. next is only called when a value is left. Try to use memory in proportion to the tree height. The first op names the class; its argument is the tree.',
    sig: {
      py: 'class BSTIterator:',
      js: 'class BSTIterator {',
      java: 'class BSTIterator {',
      cpp: 'class BSTIterator {',
      go: 'type BSTIterator struct {'
    },
    starter: {
      py: 'class BSTIterator:\n    def __init__(self, root: Optional[TreeNode]):\n        pass\n\n    def next(self) -> int:\n        pass\n\n    def hasNext(self) -> bool:\n        pass\n',
      js: 'class BSTIterator {\n  constructor(root) {\n  }\n  next() {\n  }\n  hasNext() {\n  }\n}\n',
      java: 'class BSTIterator {\n    public BSTIterator(TreeNode root) {\n    }\n    public int next() {\n        return 0;\n    }\n    public boolean hasNext() {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass BSTIterator {\npublic:\n    BSTIterator(TreeNode* root) {\n    }\n    int next() {\n        return {};\n    }\n    bool hasNext() {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype BSTIterator struct {\n}\n\nfunc Constructor(root *TreeNode) BSTIterator {\n    return BSTIterator{}\n}\n\nfunc (this *BSTIterator) Next() int {\n    return 0\n}\n\nfunc (this *BSTIterator) HasNext() bool {\n    return false\n}\n'
    },
    examples: [[[['BSTIterator', 'next', 'next', 'hasNext', 'next', 'hasNext'], [[[5, 2, 8]], [], [], [], [], []]], [null, 2, 5, true, 8, false]], [[['BSTIterator', 'hasNext', 'next', 'hasNext'], [[[1]], [], [], []]], [null, true, 1, false]], [[['BSTIterator', 'next', 'next', 'next'], [[[3, 1, null, null, 2]], [], [], []]], [null, 1, 2, 3]]],
    hidden: [[[['BSTIterator', 'next', 'next', 'next', 'next', 'hasNext'], [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], []]], [null, 3, 7, 9, 15, true]], [[['BSTIterator', 'hasNext', 'next', 'next', 'hasNext', 'next', 'hasNext'], [[[2, 1, 3]], [], [], [], [], [], []]], [null, true, 1, 2, true, 3, false]], [[['BSTIterator', 'next', 'hasNext'], [[[-4]], [], []]], [null, -4, false]], [[['BSTIterator', 'next', 'next', 'next', 'next', 'next'], [[[1, null, 2, null, 3, null, 4, null, 5]], [], [], [], [], []]], [null, 1, 2, 3, 4, 5]], [[['BSTIterator', 'next', 'next', 'hasNext', 'next', 'next', 'hasNext'], [[[10, 5, 15, 3, 7, 12, 18]], [], [], [], [], [], []]], [null, 3, 5, true, 7, 10, true]]],
    ref: class {
      constructor(root) { this.st = []; this.push(root); }
      push(n) { while (n) { this.st.push(n); n = n.left; } }
      next() { const n = this.st.pop(); this.push(n.right); return n.val; }
      hasNext() { return this.st.length > 0; }
    }
  },
  'construct-binary-tree-from-inorder-and-postorder-traversal': {
    fn: 'buildTree', params: ['inorder', 'postorder'], cmp: 'exact', io: { ret: 'tree' }, meta: ['Construct Binary Tree from Inorder and Postorder Traversal', 'Medium', 'Trees'],
    ask: 'All values are different. inorder and postorder are two walks of the same binary tree. Rebuild the tree and return its root.',
    sig: {
      py: 'def buildTree(inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:',
      js: 'function buildTree(inorder, postorder) {',
      java: 'public TreeNode buildTree(int[] inorder, int[] postorder) {',
      cpp: 'TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {',
      go: 'func buildTree(inorder []int, postorder []int) *TreeNode {'
    },
    examples: [[[[2, 1, 3], [2, 3, 1]], [1, 2, 3]], [[[7], [7]], [7]], [[[1, 2], [2, 1]], [1, null, 2]]],
    hidden: [[[[9, 3, 15, 20, 7], [9, 15, 7, 20, 3]], [3, 9, 20, null, null, 15, 7]], [[[], []], []], [[[1, 2, 3, 4], [1, 2, 3, 4]], [4, 3, null, 2, null, 1]], [[[4, 3, 2, 1], [4, 3, 2, 1]], [1, 2, null, 3, null, 4]], [[[4, 2, 5, 1, 6, 3, 7], [4, 5, 2, 6, 7, 3, 1]], [1, 2, 3, 4, 5, 6, 7]]],
    ref: function (inorder, postorder) {
      const at = new Map(inorder.map((v, i) => [v, i]));
      let p = postorder.length - 1;
      const build = (lo, hi) => {
        if (lo > hi) return null;
        const v = postorder[p--], i = at.get(v);
        const right = build(i + 1, hi), left = build(lo, i - 1);
        return { val: v, left, right };
      };
      return build(0, inorder.length - 1);
    }
  },
  'construct-binary-search-tree-from-preorder-traversal': {
    fn: 'bstFromPreorder', params: ['preorder'], cmp: 'exact', io: { ret: 'tree' }, meta: ['Construct Binary Search Tree from Preorder Traversal', 'Medium', 'Trees'],
    ask: 'preorder is the root-first walk of a binary search tree with different values. Rebuild the tree and return its root.',
    sig: {
      py: 'def bstFromPreorder(preorder: List[int]) -> Optional[TreeNode]:',
      js: 'function bstFromPreorder(preorder) {',
      java: 'public TreeNode bstFromPreorder(int[] preorder) {',
      cpp: 'TreeNode* bstFromPreorder(vector<int>& preorder) {',
      go: 'func bstFromPreorder(preorder []int) *TreeNode {'
    },
    examples: [[[[4, 2, 6]], [4, 2, 6]], [[[1, 3]], [1, null, 3]], [[[5, 4, 3]], [5, 4, null, 3]]],
    hidden: [[[[8, 5, 1, 7, 10, 12]], [8, 5, 10, 1, 7, null, 12]], [[[1]], [1]], [[[10, 20, 30]], [10, null, 20, null, 30]], [[[6, 3, 1, 4, 9, 7, 12]], [6, 3, 9, 1, 4, 7, 12]], [[[50, 30, 40, 35, 70, 60, 80]], [50, 30, 70, null, 40, 60, 80, 35]]],
    ref: function (preorder) {
      let i = 0;
      const build = (hi) => {
        if (i === preorder.length || preorder[i] > hi) return null;
        const v = preorder[i++];
        return { val: v, left: build(v), right: build(hi) };
      };
      return build(Infinity);
    }
  },
  'longest-zigzag-path-in-a-binary-tree': {
    fn: 'longestZigZag', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Longest ZigZag Path in a Binary Tree', 'Medium', 'Trees'],
    ask: 'A zigzag path starts at any node, takes one step to a child, then keeps switching between left and right steps. Its length is its number of steps. Return the longest zigzag length in the tree.',
    sig: {
      py: 'def longestZigZag(root: Optional[TreeNode]) -> int:',
      js: 'function longestZigZag(root) {',
      java: 'public int longestZigZag(TreeNode root) {',
      cpp: 'int longestZigZag(TreeNode* root) {',
      go: 'func longestZigZag(root *TreeNode) int {'
    },
    examples: [[[[1, 2]], 1], [[[1]], 0], [[[1, null, 2, 3, null, null, 4]], 3]],
    hidden: [[[[1, null, 1, 1, 1, null, null, 1, 1, null, 1, null, null, null, 1]], 3], [[[1, 1, 1, null, 1, null, null, 1, 1, null, 1]], 4], [[[1, 2, 3, 4, 5, 6, 7]], 2], [[[1, 2, null, 3, null, 4]], 1], [[[1, null, 2, 3, null, null, 4, 5, null, null, 6]], 5]],
    ref: function (root) {
      let best = 0;
      const go = (n, l, r) => { if (!n) return; best = Math.max(best, l, r); go(n.left, r + 1, 0); go(n.right, 0, l + 1); };
      go(root, 0, 0);
      return best;
    }
  },
  'delete-nodes-and-return-forest': {
    fn: 'delNodes', params: ['root', 'to_delete'], cmp: 'unordered', io: { args: ['tree', null], ret: 'trees' }, meta: ['Delete Nodes And Return Forest', 'Medium', 'Trees'],
    ask: 'All values are different. Delete every node whose value is in to_delete. The tree falls apart into a forest; return the roots of the trees that remain, in any order.',
    sig: {
      py: 'def delNodes(root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:',
      js: 'function delNodes(root, to_delete) {',
      java: 'public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {',
      cpp: 'vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {',
      go: 'func delNodes(root *TreeNode, to_delete []int) []*TreeNode {'
    },
    examples: [[[[1, 2, 3], [1]], [[2], [3]]], [[[1, 2], [2]], [[1]]], [[[1], [1]], []]],
    hidden: [[[[1, 2, 3, 4, 5, 6, 7], [3, 5]], [[1, 2, null, 4], [6], [7]]], [[[1, 2, 4, null, 3], [3]], [[1, 2, 4]]], [[[1, 2, 3, 4], [2, 1]], [[4], [3]]], [[[5, 4, 6], []], [[5, 4, 6]]], [[[1, null, 2, null, 3, null, 4], [2, 4]], [[1], [3]]]],
    ref: function (root, to_delete) {
      const del = new Set(to_delete), out = [];
      const go = (n, isRoot) => {
        if (!n) return null;
        const gone = del.has(n.val);
        if (isRoot && !gone) out.push(n);
        n.left = go(n.left, gone);
        n.right = go(n.right, gone);
        return gone ? null : n;
      };
      go(root, true);
      return out;
    }
  },
  'unique-binary-search-trees': {
    fn: 'numTrees', params: ['n'], cmp: 'exact', meta: ['Unique Binary Search Trees', 'Medium', 'Trees'],
    ask: 'Count the differently shaped binary search trees that hold exactly the values 1 to n.',
    sig: {
      py: 'def numTrees(n: int) -> int:',
      js: 'function numTrees(n) {',
      java: 'public int numTrees(int n) {',
      cpp: 'int numTrees(int n) {',
      go: 'func numTrees(n int) int {'
    },
    examples: [[[1], 1], [[3], 5], [[4], 14]],
    hidden: [[[2], 2], [[5], 42], [[8], 1430], [[12], 208012], [[19], 1767263190]],
    ref: function (n) {
      const dp = [1];
      for (let i = 1; i <= n; i++) { dp[i] = 0; for (let r = 1; r <= i; r++) dp[i] += dp[r - 1] * dp[i - r]; }
      return dp[n];
    }
  },
  'serialize-and-deserialize-binary-tree': {
    fn: 'Codec', params: ['root'], cmp: 'exact', io: { pydrive: 'def _ds_drive(cls, args):\n    root = _ds_make("tree", args[0], {})\n    data = cls().serialize(root)\n    if not isinstance(data, str):\n        raise TypeError("serialize must return a string")\n    return _ds_read("tree", cls().deserialize(data), {})\n' }, meta: ['Serialize and Deserialize Binary Tree', 'Hard', 'Trees'],
    ask: 'Write a Codec class. serialize(root) turns a binary tree into a string, in any format you like, and deserialize(data) builds the same tree back from that string. The tests serialize with one Codec and deserialize with a fresh one, then compare the trees.',
    sig: {
      py: 'class Codec:',
      js: 'class Codec {',
      java: 'class Codec {',
      cpp: 'class Codec {',
      go: 'type Codec struct {'
    },
    starter: {
      py: 'class Codec:\n    def __init__(self):\n        pass\n\n    def serialize(self, root: Optional[TreeNode]) -> str:\n        pass\n\n    def deserialize(self, data: str) -> Optional[TreeNode]:\n        pass\n',
      js: 'class Codec {\n  constructor() {\n  }\n  serialize(root) {\n  }\n  deserialize(data) {\n  }\n}\n',
      java: 'class Codec {\n    public Codec() {\n    }\n    public String serialize(TreeNode root) {\n        return "";\n    }\n    public TreeNode deserialize(String data) {\n        return null;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Codec {\npublic:\n    Codec() {\n    }\n    string serialize(TreeNode* root) {\n        return {};\n    }\n    TreeNode* deserialize(string data) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype Codec struct {\n}\n\nfunc Constructor() Codec {\n    return Codec{}\n}\n\nfunc (this *Codec) Serialize(root *TreeNode) string {\n    return ""\n}\n\nfunc (this *Codec) Deserialize(data string) *TreeNode {\n    return nil\n}\n'
    },
    examples: [[[[1, 2, 3, null, null, 4, 5]], [1, 2, 3, null, null, 4, 5]], [[[]], []], [[[-7]], [-7]]],
    hidden: [[[[1, null, 2, null, 3]], [1, null, 2, null, 3]], [[[5, 4, 7, 3, null, 2, null, -1, null, 9]], [5, 4, 7, 3, null, 2, null, -1, null, 9]], [[[0, 0, 0, 0, null, null, 0]], [0, 0, 0, 0, null, null, 0]], [[[1000, -1000]], [1000, -1000]], [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]]],
    drive: function (Codec, args, H) {
      const root = H.make('tree', args[0]);
      const data = new Codec().serialize(root);
      if (typeof data !== 'string') throw new Error('serialize must return a string');
      return H.read('tree', new Codec().deserialize(data));
    },
    ref: class {
      serialize(root) {
        const out = [];
        const go = (n) => { if (!n) { out.push('#'); return; } out.push(String(n.val)); go(n.left); go(n.right); };
        go(root);
        return out.join(',');
      }
      deserialize(data) {
        const parts = data.split(',');
        let i = 0;
        const go = () => { const p = parts[i++]; if (p === '#') return null; const n = { val: Number(p), left: null, right: null }; n.left = go(); n.right = go(); return n; };
        return go();
      }
    }
  },
  'binary-tree-cameras': {
    fn: 'minCameraCover', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Binary Tree Cameras', 'Hard', 'Trees'],
    ask: 'A camera on a node watches that node, its parent and its children. Return the fewest cameras that watch every node of the tree.',
    sig: {
      py: 'def minCameraCover(root: Optional[TreeNode]) -> int:',
      js: 'function minCameraCover(root) {',
      java: 'public int minCameraCover(TreeNode root) {',
      cpp: 'int minCameraCover(TreeNode* root) {',
      go: 'func minCameraCover(root *TreeNode) int {'
    },
    examples: [[[[0]], 1], [[[0, 0, 0]], 1], [[[0, 0, null, 0, null, 0]], 2]],
    hidden: [[[[0, 0, null, 0, 0]], 1], [[[0, 0, null, 0, null, 0, null, null, 0]], 2], [[[0, 0, 0, 0, 0, 0, 0]], 2], [[[0, null, 0, null, 0, null, 0, null, 0]], 2], [[[0, 0, 0, null, 0, 0, null, 0, null, null, 0]], 3]],
    ref: function (root) {
      let cams = 0;
      const go = (n) => {
        if (!n) return 2;
        const l = go(n.left), r = go(n.right);
        if (l === 0 || r === 0) { cams++; return 1; }
        return l === 1 || r === 1 ? 2 : 0;
      };
      return go(root) === 0 ? cams + 1 : cams;
    }
  },
  'vertical-order-traversal-of-a-binary-tree': {
    fn: 'verticalTraversal', params: ['root'], cmp: 'exact', io: { args: ['tree'] }, meta: ['Vertical Order Traversal of a Binary Tree', 'Hard', 'Trees'],
    ask: 'Put the root at row 0, column 0; a left child is one row down and one column left, a right child one row down and one column right. Return the columns from left to right, each listing its values from top to bottom, with values in the same row and column sorted smallest first.',
    sig: {
      py: 'def verticalTraversal(root: Optional[TreeNode]) -> List[List[int]]:',
      js: 'function verticalTraversal(root) {',
      java: 'public int[][] verticalTraversal(TreeNode root) {',
      cpp: 'vector<vector<int>> verticalTraversal(TreeNode* root) {',
      go: 'func verticalTraversal(root *TreeNode) [][]int {'
    },
    examples: [[[[1, 2, 3]], [[2], [1], [3]]], [[[5]], [[5]]], [[[1, 2, 3, 4, 6, 5, 7]], [[4], [2], [1, 5, 6], [3], [7]]]],
    hidden: [[[[3, 9, 20, null, null, 15, 7]], [[9], [3, 15], [20], [7]]], [[[1, 2, 3, 4, 5, 6, 7, 8, 9]], [[8], [4], [2, 9], [1, 5, 6], [3], [7]]], [[[0, 8, 1, null, null, 3, 2, null, 4, 5, null, null, 7, 6]], [[8], [0, 3, 6], [1, 4, 5], [2, 7]]], [[[1, null, 2, null, 3]], [[1], [2], [3]]], [[[3, 1, 4, 0, 2, 2]], [[0], [1], [3, 2, 2], [4]]]],
    ref: function (root) {
      const cells = [];
      const go = (n, r, c) => { if (!n) return; cells.push([c, r, n.val]); go(n.left, r + 1, c - 1); go(n.right, r + 1, c + 1); };
      go(root, 0, 0);
      cells.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
      const out = [];
      let last = null;
      for (const [c, , v] of cells) { if (c !== last) { out.push([]); last = c; } out[out.length - 1].push(v); }
      return out;
    }
  },
  'possible-bipartition': {
    fn: 'possibleBipartition', params: ['n', 'dislikes'], cmp: 'exact', meta: ['Possible Bipartition', 'Medium', 'Graphs'],
    ask: 'People 1 to n must be split into two groups (a group may be empty). dislikes[i] = [a, b] means a and b may not share a group. Return true if such a split exists.',
    sig: {
      py: 'def possibleBipartition(n: int, dislikes: List[List[int]]) -> bool:',
      js: 'function possibleBipartition(n, dislikes) {',
      java: 'public boolean possibleBipartition(int n, int[][] dislikes) {',
      cpp: 'bool possibleBipartition(int n, vector<vector<int>>& dislikes) {',
      go: 'func possibleBipartition(n int, dislikes [][]int) bool {'
    },
    examples: [[[3, [[1, 2]]], true], [[3, [[1, 2], [2, 3], [1, 3]]], false], [[4, []], true]],
    hidden: [[[4, [[1, 2], [1, 3], [2, 4]]], true], [[5, [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]]], false], [[1, []], true], [[6, [[1, 2], [3, 4], [5, 6], [2, 3]]], true], [[4, [[1, 2], [2, 3], [3, 4], [4, 1]]], true]],
    ref: function (n, dislikes) {
      const g = Array.from({ length: n + 1 }, () => []), color = new Array(n + 1).fill(0);
      dislikes.forEach(([a, b]) => { g[a].push(b); g[b].push(a); });
      for (let s = 1; s <= n; s++) {
        if (color[s]) continue;
        color[s] = 1;
        const st = [s];
        while (st.length) { const u = st.pop(); for (const v of g[u]) { if (!color[v]) { color[v] = -color[u]; st.push(v); } else if (color[v] === color[u]) return false; } }
      }
      return true;
    }
  },
  'satisfiability-of-equality-equations': {
    fn: 'equationsPossible', params: ['equations'], cmp: 'exact', meta: ['Satisfiability of Equality Equations', 'Medium', 'Graphs'],
    ask: 'Each equation is four characters, like "a==b" or "a!=b", naming one-letter variables. Return true if whole numbers can be given to the variables so every equation holds.',
    sig: {
      py: 'def equationsPossible(equations: List[str]) -> bool:',
      js: 'function equationsPossible(equations) {',
      java: 'public boolean equationsPossible(String[] equations) {',
      cpp: 'bool equationsPossible(vector<string>& equations) {',
      go: 'func equationsPossible(equations []string) bool {'
    },
    examples: [[[['a==b', 'b==c', 'a!=c']], false], [[['x!=y']], true], [[['q==q']], true]],
    hidden: [[[['a!=a']], false], [[['a==b', 'b!=a']], false], [[['c==c', 'b==d', 'x!=z']], true], [[['a==b', 'e==c', 'b==c', 'a!=e']], false], [[['a==b', 'c==d', 'a!=c']], true]],
    ref: function (equations) {
      const p = Array.from({ length: 26 }, (_, i) => i);
      const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
      const id = (ch) => ch.charCodeAt(0) - 97;
      equations.forEach((e) => { if (e[1] === '=') p[find(id(e[0]))] = find(id(e[3])); });
      return equations.every((e) => e[1] === '=' || find(id(e[0])) !== find(id(e[3])));
    }
  },
  'accounts-merge': {
    fn: 'accountsMerge', params: ['accounts'], cmp: 'unordered', meta: ['Accounts Merge', 'Medium', 'Graphs'],
    ask: 'Each account is [name, email, email, ...]. Two accounts belong to the same person when they share any email (the same person always has the same name). Merge each person\'s accounts into [name, then all their emails sorted]. Return the merged accounts in any order.',
    sig: {
      py: 'def accountsMerge(accounts: List[List[str]]) -> List[List[str]]:',
      js: 'function accountsMerge(accounts) {',
      java: 'public List<String[]> accountsMerge(List<String[]> accounts) {',
      cpp: 'vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {',
      go: 'func accountsMerge(accounts [][]string) [][]string {'
    },
    examples: [[[[['Ann', 'a@x', 'b@x'], ['Ann', 'c@x'], ['Ann', 'b@x', 'd@x']]], [['Ann', 'a@x', 'b@x', 'd@x'], ['Ann', 'c@x']]], [[[['Bo', 'z@y']]], [['Bo', 'z@y']]], [[[['Cy', 'm@q'], ['Cy', 'm@q']]], [['Cy', 'm@q']]]],
    hidden: [[[[['Ivy', 'i1@m', 'i2@m'], ['Jo', 'j@m'], ['Ivy', 'i3@m', 'i2@m'], ['Ivy', 'i9@m']]], [['Ivy', 'i1@m', 'i2@m', 'i3@m'], ['Jo', 'j@m'], ['Ivy', 'i9@m']]], [[[['Al', 'e1@k', 'e2@k'], ['Al', 'e3@k', 'e4@k'], ['Al', 'e2@k', 'e3@k']]], [['Al', 'e1@k', 'e2@k', 'e3@k', 'e4@k']]], [[[['Mo', 'b@z', 'a@z']]], [['Mo', 'a@z', 'b@z']]], [[[['Ed', 'x@w'], ['Fay', 'y@w'], ['Ed', 'z@w']]], [['Ed', 'x@w'], ['Fay', 'y@w'], ['Ed', 'z@w']]], [[[['Gil', 'p@r', 'q@r'], ['Gil', 'q@r', 'r@r'], ['Hal', 's@r'], ['Gil', 'r@r', 'p@r']]], [['Gil', 'p@r', 'q@r', 'r@r'], ['Hal', 's@r']]]],
    ref: function (accounts) {
      const p = new Map(), name = new Map();
      const find = (x) => { while (p.get(x) !== x) { p.set(x, p.get(p.get(x))); x = p.get(x); } return x; };
      accounts.forEach(([nm, ...emails]) => emails.forEach((e) => { if (!p.has(e)) p.set(e, e); name.set(e, nm); p.set(find(e), find(emails[0])); }));
      const groups = new Map();
      for (const e of p.keys()) { const r = find(e); if (!groups.has(r)) groups.set(r, []); groups.get(r).push(e); }
      return [...groups.values()].map((list) => [name.get(list[0]), ...list.sort()]);
    }
  },
  'most-stones-removed-with-same-row-or-column': {
    fn: 'removeStones', params: ['stones'], cmp: 'exact', meta: ['Most Stones Removed with Same Row or Column', 'Medium', 'Graphs'],
    ask: 'Stones sit at different grid points [x, y]. A stone may be removed while another remaining stone shares its row or its column. Return the most stones you can remove.',
    sig: {
      py: 'def removeStones(stones: List[List[int]]) -> int:',
      js: 'function removeStones(stones) {',
      java: 'public int removeStones(int[][] stones) {',
      cpp: 'int removeStones(vector<vector<int>>& stones) {',
      go: 'func removeStones(stones [][]int) int {'
    },
    examples: [[[[[0, 0], [0, 1], [1, 1]]], 2], [[[[0, 0]]], 0], [[[[0, 0], [2, 2]]], 0]],
    hidden: [[[[[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]]], 5], [[[[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]], 3], [[[[3, 3], [3, 7], [9, 7], [9, 1]]], 3], [[[[0, 1], [1, 0]]], 0], [[[[5, 5], [5, 6], [5, 7], [5, 8]]], 3]],
    ref: function (stones) {
      const p = new Map();
      const find = (x) => { if (!p.has(x)) p.set(x, x); while (p.get(x) !== x) x = p.get(x); return x; };
      stones.forEach(([x, y]) => { p.set(find('r' + x), find('c' + y)); });
      const roots = new Set(stones.map(([x]) => find('r' + x)));
      return stones.length - roots.size;
    }
  },
  'minimum-height-trees': {
    fn: 'findMinHeightTrees', params: ['n', 'edges'], cmp: 'unordered', meta: ['Minimum Height Trees', 'Medium', 'Graphs'],
    ask: 'The n nodes (0 to n - 1) and edges form a tree. Picking a node as the root gives the tree a height. Return every node whose choice as root gives the smallest height, in any order.',
    sig: {
      py: 'def findMinHeightTrees(n: int, edges: List[List[int]]) -> List[int]:',
      js: 'function findMinHeightTrees(n, edges) {',
      java: 'public int[] findMinHeightTrees(int n, int[][] edges) {',
      cpp: 'vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {',
      go: 'func findMinHeightTrees(n int, edges [][]int) []int {'
    },
    examples: [[[1, []], [0]], [[3, [[0, 1], [1, 2]]], [1]], [[4, [[0, 1], [1, 2], [2, 3]]], [1, 2]]],
    hidden: [[[4, [[1, 0], [1, 2], [1, 3]]], [1]], [[6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]], [3, 4]], [[2, [[0, 1]]], [0, 1]], [[7, [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6]]], [1, 2]], [[5, [[0, 1], [0, 2], [0, 3], [3, 4]]], [0, 3]]],
    ref: function (n, edges) {
      if (n === 1) return [0];
      const g = Array.from({ length: n }, () => new Set());
      edges.forEach(([a, b]) => { g[a].add(b); g[b].add(a); });
      let leaves = [], left = n;
      for (let i = 0; i < n; i++) if (g[i].size === 1) leaves.push(i);
      while (left > 2) {
        left -= leaves.length;
        const next = [];
        for (const l of leaves) for (const v of g[l]) { g[v].delete(l); if (g[v].size === 1) next.push(v); }
        leaves = next;
      }
      return leaves;
    }
  },
  'find-all-possible-recipes-from-given-supplies': {
    fn: 'findAllRecipes', params: ['recipes', 'ingredients', 'supplies'], cmp: 'unordered', meta: ['Find All Possible Recipes from Given Supplies', 'Medium', 'Graphs'],
    ask: 'recipes[i] needs every item in ingredients[i]. You have unlimited supplies, and anything you can make becomes an ingredient too. Return every recipe you can make, in any order.',
    sig: {
      py: 'def findAllRecipes(recipes: List[str], ingredients: List[List[str]], supplies: List[str]) -> List[str]:',
      js: 'function findAllRecipes(recipes, ingredients, supplies) {',
      java: 'public String[] findAllRecipes(String[] recipes, List<String[]> ingredients, String[] supplies) {',
      cpp: 'vector<string> findAllRecipes(vector<string>& recipes, vector<vector<string>>& ingredients, vector<string>& supplies) {',
      go: 'func findAllRecipes(recipes []string, ingredients [][]string, supplies []string) []string {'
    },
    examples: [[[['bread'], [['flour', 'water']], ['flour', 'water']], ['bread']], [[['tea'], [['leaf']], []], []], [[['a', 'b'], [['b'], ['a']], []], []]],
    hidden: [[[['bread', 'sandwich'], [['yeast', 'flour'], ['bread', 'meat']], ['yeast', 'flour', 'meat']], ['bread', 'sandwich']], [[['bread', 'sandwich', 'burger'], [['yeast', 'flour'], ['bread', 'meat'], ['sandwich', 'meat', 'bread']], ['yeast', 'flour', 'meat']], ['bread', 'sandwich', 'burger']], [[['x'], [['y']], ['z']], []], [[['jam', 'toast'], [['fruit', 'sugar'], ['bread', 'jam']], ['fruit', 'sugar']], ['jam']], [[['p', 'q', 'r'], [['q'], ['r'], ['s']], ['s']], ['r', 'q', 'p']]],
    ref: function (recipes, ingredients, supplies) {
      const have = new Set(supplies), out = [];
      let grew = true;
      while (grew) {
        grew = false;
        recipes.forEach((r, i) => { if (!have.has(r) && ingredients[i].every((x) => have.has(x))) { have.add(r); out.push(r); grew = true; } });
      }
      return out;
    }
  },
  'course-schedule-iv': {
    fn: 'checkIfPrerequisite', params: ['numCourses', 'prerequisites', 'queries'], cmp: 'exact', meta: ['Course Schedule IV', 'Medium', 'Graphs'],
    ask: 'prerequisites[i] = [a, b] means course a must come before course b, and "before" carries through chains. For each query [u, v], answer whether u must come before v. Return the answers in order.',
    sig: {
      py: 'def checkIfPrerequisite(numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:',
      js: 'function checkIfPrerequisite(numCourses, prerequisites, queries) {',
      java: 'public boolean[] checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {',
      cpp: 'vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {',
      go: 'func checkIfPrerequisite(numCourses int, prerequisites [][]int, queries [][]int) []bool {'
    },
    examples: [[[3, [[0, 1], [1, 2]], [[0, 2], [2, 0]]], [true, false]], [[2, [], [[0, 1]]], [false]], [[4, [[0, 1], [0, 2]], [[1, 2], [0, 2]]], [false, true]]],
    hidden: [[[3, [[1, 2], [1, 0], [2, 0]], [[1, 0], [1, 2]]], [true, true]], [[5, [[0, 1], [1, 2], [2, 3], [3, 4]], [[0, 4], [4, 0], [1, 3], [3, 1]]], [true, false, true, false]], [[2, [[1, 0]], [[0, 1], [1, 0]]], [false, true]], [[4, [[2, 3], [2, 1], [0, 3], [0, 1]], [[0, 1], [0, 3], [2, 3], [3, 0], [2, 0], [0, 2]]], [true, true, true, false, false, false]], [[3, [], [[0, 1], [2, 1]]], [false, false]]],
    ref: function (n, pre, queries) {
      const r = Array.from({ length: n }, () => new Array(n).fill(false));
      pre.forEach(([a, b]) => { r[a][b] = true; });
      for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (r[i][k] && r[k][j]) r[i][j] = true;
      return queries.map(([u, v]) => r[u][v]);
    }
  },
  'path-with-maximum-probability': {
    fn: 'maxProbability', params: ['n', 'edges', 'succProb', 'start_node', 'end_node'], cmp: 'float', meta: ['Path with Maximum Probability', 'Medium', 'Graphs'],
    ask: 'Undirected edge i joins edges[i][0] and edges[i][1] and is crossed safely with chance succProb[i]. A path is safe with the product of its edges\' chances. Return the best chance of getting from start_node to end_node, or 0 if there is no path.',
    sig: {
      py: 'def maxProbability(n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:',
      js: 'function maxProbability(n, edges, succProb, start_node, end_node) {',
      java: 'public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {',
      cpp: 'double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {',
      go: 'func maxProbability(n int, edges [][]int, succProb []float64, start_node int, end_node int) float64 {'
    },
    examples: [[[3, [[0, 1], [1, 2]], [0.5, 0.5], 0, 2], 0.25], [[2, [], [], 0, 1], 0], [[3, [[0, 1], [1, 2], [0, 2]], [0.9, 0.9, 0.5], 0, 2], 0.81]],
    hidden: [[[3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2], 0.25], [[3, [[0, 1]], [0.5], 0, 2], 0], [[5, [[1, 4], [2, 4], [0, 4], [0, 3], [0, 2], [2, 3]], [0.37, 0.17, 0.93, 0.23, 0.39, 0.04], 3, 4], 0.2139], [[4, [[0, 1], [1, 3], [0, 2], [2, 3]], [1, 1, 0.5, 0.5], 0, 3], 1], [[2, [[0, 1]], [0.3], 1, 0], 0.3]],
    ref: function (n, edges, succProb, start, end) {
      const best = new Array(n).fill(0);
      best[start] = 1;
      for (let round = 0; round < n; round++) {
        let changed = false;
        edges.forEach(([a, b], i) => {
          const p = succProb[i];
          if (best[a] * p > best[b]) { best[b] = best[a] * p; changed = true; }
          if (best[b] * p > best[a]) { best[a] = best[b] * p; changed = true; }
        });
        if (!changed) break;
      }
      return best[end];
    }
  },
  'number-of-ways-to-arrive-at-destination': {
    fn: 'countPaths', params: ['n', 'roads'], cmp: 'exact', meta: ['Number of Ways to Arrive at Destination', 'Medium', 'Graphs'],
    ask: 'Towns 0 to n - 1 are joined by two-way roads [u, v, minutes]. Count the different routes from town 0 to town n - 1 that take the least total time. The count can be large: return it modulo 1000000007.',
    sig: {
      py: 'def countPaths(n: int, roads: List[List[int]]) -> int:',
      js: 'function countPaths(n, roads) {',
      java: 'public int countPaths(int n, int[][] roads) {',
      cpp: 'int countPaths(int n, vector<vector<int>>& roads) {',
      go: 'func countPaths(n int, roads [][]int) int {'
    },
    examples: [[[2, [[0, 1, 5]]], 1], [[3, [[0, 1, 1], [1, 2, 1], [0, 2, 2]]], 2], [[1, []], 1]],
    hidden: [[[7, [[0, 6, 7], [0, 1, 2], [1, 2, 3], [1, 3, 3], [6, 3, 3], [3, 5, 1], [6, 5, 1], [2, 5, 1], [0, 4, 5], [4, 6, 2]]], 4], [[4, [[0, 1, 1], [0, 2, 1], [1, 3, 1], [2, 3, 1]]], 2], [[3, [[0, 1, 1], [1, 2, 5], [0, 2, 9]]], 1], [[5, [[0, 1, 1], [1, 4, 1], [0, 2, 1], [2, 4, 1], [0, 3, 1], [3, 4, 1]]], 3], [[4, [[0, 1, 1000000000], [1, 3, 1000000000], [0, 2, 1000000000], [2, 3, 1000000000]]], 2]],
    ref: function (n, roads) {
      const MOD = 1000000007n, g = Array.from({ length: n }, () => []);
      roads.forEach(([u, v, t]) => { g[u].push([v, t]); g[v].push([u, t]); });
      const dist = new Array(n).fill(Infinity), ways = new Array(n).fill(0n), done = new Array(n).fill(false);
      dist[0] = 0; ways[0] = 1n;
      for (let it = 0; it < n; it++) {
        let u = -1;
        for (let i = 0; i < n; i++) if (!done[i] && (u < 0 || dist[i] < dist[u])) u = i;
        if (u < 0 || dist[u] === Infinity) break;
        done[u] = true;
        for (const [v, t] of g[u]) {
          if (dist[u] + t < dist[v]) { dist[v] = dist[u] + t; ways[v] = ways[u]; }
          else if (dist[u] + t === dist[v]) ways[v] = (ways[v] + ways[u]) % MOD;
        }
      }
      return Number(ways[n - 1] % MOD);
    }
  },
  'build-a-matrix-with-conditions': {
    fn: 'buildMatrix', params: ['k', 'rowConditions', 'colConditions'], cmp: 'any', meta: ['Build a Matrix With Conditions', 'Hard', 'Graphs'],
    ask: 'Build a k by k grid holding each number 1 to k exactly once and 0 everywhere else. rowConditions[i] = [a, b] means a must sit in a row strictly above b; colConditions[i] = [a, b] means a must sit in a column strictly left of b. Return any grid that works, or an empty list if none does.',
    sig: {
      py: 'def buildMatrix(k: int, rowConditions: List[List[int]], colConditions: List[List[int]]) -> List[List[int]]:',
      js: 'function buildMatrix(k, rowConditions, colConditions) {',
      java: 'public int[][] buildMatrix(int k, int[][] rowConditions, int[][] colConditions) {',
      cpp: 'vector<vector<int>> buildMatrix(int k, vector<vector<int>>& rowConditions, vector<vector<int>>& colConditions) {',
      go: 'func buildMatrix(k int, rowConditions [][]int, colConditions [][]int) [][]int {'
    },
    examples: [[[2, [[1, 2]], [[2, 1]]], [[0, 1], [2, 0]]], [[3, [[1, 2], [2, 3], [3, 1]], [[1, 2]]], []], [[1, [], []], [[1]]]],
    hidden: [[[3, [[1, 2], [3, 2]], [[2, 1], [3, 2]]], [[0, 0, 1], [3, 0, 0], [0, 2, 0]]], [[3, [[1, 2]], [[2, 3], [3, 2]]], []], [[4, [[4, 3], [3, 2], [2, 1]], [[1, 2], [2, 3], [3, 4]]], [[0, 0, 0, 4], [0, 0, 3, 0], [0, 2, 0, 0], [1, 0, 0, 0]]], [[2, [], []], [[1, 0], [0, 2]]], [[4, [[1, 2], [1, 3]], [[4, 1], [4, 2]]], [[0, 0, 1, 0], [0, 4, 0, 0], [0, 0, 0, 2], [3, 0, 0, 0]]]],
    check: function (args, got, want) {
      const [k, rc, cc] = args;
      if (!want.length) return Array.isArray(got) && got.length === 0;
      if (!Array.isArray(got) || got.length !== k) return false;
      const pos = {};
      for (let i = 0; i < k; i++) {
        if (!Array.isArray(got[i]) || got[i].length !== k) return false;
        for (let j = 0; j < k; j++) { const v = got[i][j]; if (v === 0) continue; if (!(v >= 1 && v <= k) || pos[v]) return false; pos[v] = [i, j]; }
      }
      for (let v = 1; v <= k; v++) if (!pos[v]) return false;
      return rc.every(([a, b]) => pos[a][0] < pos[b][0]) && cc.every(([a, b]) => pos[a][1] < pos[b][1]);
    },
    ref: function (k, rowConditions, colConditions) {
      const order = (conds) => {
        const g = Array.from({ length: k + 1 }, () => []), indeg = new Array(k + 1).fill(0);
        conds.forEach(([a, b]) => { g[a].push(b); indeg[b]++; });
        const q = [], out = [];
        for (let v = 1; v <= k; v++) if (!indeg[v]) q.push(v);
        while (q.length) { const u = q.shift(); out.push(u); for (const v of g[u]) if (--indeg[v] === 0) q.push(v); }
        return out.length === k ? out : null;
      };
      const r = order(rowConditions), c = order(colConditions);
      if (!r || !c) return [];
      const out = Array.from({ length: k }, () => new Array(k).fill(0));
      for (let v = 1; v <= k; v++) out[r.indexOf(v)][c.indexOf(v)] = v;
      return out;
    }
  },
  'reconstruct-itinerary': {
    fn: 'findItinerary', params: ['tickets'], cmp: 'exact', meta: ['Reconstruct Itinerary', 'Hard', 'Graphs'],
    ask: 'Each ticket [from, to] is one flight. Starting at the airport "HUB", use every ticket exactly once (at least one full trip is always possible). If several trips work, return the one that comes first when the airport names are compared in order, alphabetically.',
    sig: {
      py: 'def findItinerary(tickets: List[List[str]]) -> List[str]:',
      js: 'function findItinerary(tickets) {',
      java: 'public String[] findItinerary(List<String[]> tickets) {',
      cpp: 'vector<string> findItinerary(vector<vector<string>>& tickets) {',
      go: 'func findItinerary(tickets [][]string) []string {'
    },
    examples: [[[[['HUB', 'CAT'], ['CAT', 'DOG']]], ['HUB', 'CAT', 'DOG']], [[[['HUB', 'B'], ['HUB', 'A'], ['A', 'HUB']]], ['HUB', 'A', 'HUB', 'B']], [[[['HUB', 'HUB']]], ['HUB', 'HUB']]],
    hidden: [[[[['HUB', 'K'], ['HUB', 'N'], ['N', 'HUB']]], ['HUB', 'N', 'HUB', 'K']], [[[['HUB', 'X'], ['X', 'HUB'], ['HUB', 'Y'], ['Y', 'HUB']]], ['HUB', 'X', 'HUB', 'Y', 'HUB']], [[[['P', 'Q'], ['HUB', 'P'], ['Q', 'R']]], ['HUB', 'P', 'Q', 'R']], [[[['HUB', 'A'], ['A', 'B'], ['B', 'A'], ['A', 'C']]], ['HUB', 'A', 'B', 'A', 'C']], [[[['HUB', 'Z'], ['Z', 'HUB'], ['HUB', 'A'], ['A', 'B'], ['B', 'HUB']]], ['HUB', 'A', 'B', 'HUB', 'Z', 'HUB']]],
    ref: function (tickets) {
      const g = new Map();
      tickets.forEach(([a, b]) => { if (!g.has(a)) g.set(a, []); g.get(a).push(b); });
      g.forEach((v) => v.sort().reverse());
      const out = [];
      const go = (a) => { const list = g.get(a) || []; while (list.length) go(list.pop()); out.push(a); };
      go('HUB');
      return out.reverse();
    }
  },
  'swim-in-rising-water': {
    fn: 'swimInWater', params: ['grid'], cmp: 'exact', meta: ['Swim in Rising Water', 'Hard', 'Graphs'],
    ask: 'grid holds each number 0 to n squared minus 1 once: the height of that square. At time t the water stands at height t, and you may swim between neighbouring squares (up, down, left, right) when both are at most t high, taking no time. Return the earliest time you can get from the top-left square to the bottom-right one.',
    sig: {
      py: 'def swimInWater(grid: List[List[int]]) -> int:',
      js: 'function swimInWater(grid) {',
      java: 'public int swimInWater(int[][] grid) {',
      cpp: 'int swimInWater(vector<vector<int>>& grid) {',
      go: 'func swimInWater(grid [][]int) int {'
    },
    examples: [[[[[0, 2], [1, 3]]], 3], [[[[0]]], 0], [[[[0, 1, 2], [5, 4, 3], [6, 7, 8]]], 8]],
    hidden: [[[[[3, 2], [0, 1]]], 3], [[[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]], 16], [[[[0, 8, 7], [1, 6, 5], [2, 3, 4]]], 4], [[[[10, 12, 4, 6], [9, 11, 3, 5], [1, 7, 13, 8], [2, 0, 15, 14]]], 14], [[[[0, 3], [2, 1]]], 2]],
    ref: function (grid) {
      const n = grid.length;
      const can = (t) => {
        if (grid[0][0] > t) return false;
        const seen = new Set(['0,0']), st = [[0, 0]];
        while (st.length) {
          const [a, b] = st.pop();
          if (a === n - 1 && b === n - 1) return true;
          for (const [x, y] of [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]]) if (x >= 0 && y >= 0 && x < n && y < n && grid[x][y] <= t && !seen.has(x + ',' + y)) { seen.add(x + ',' + y); st.push([x, y]); }
        }
        return false;
      };
      let lo = 0, hi = n * n - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (can(m)) hi = m; else lo = m + 1; }
      return lo;
    }
  },
  'critical-connections-in-a-network': {
    fn: 'criticalConnections', params: ['n', 'connections'], cmp: 'unordered-deep', meta: ['Critical Connections in a Network', 'Hard', 'Graphs'],
    ask: 'Servers 0 to n - 1 are joined by two-way links. A link is critical if removing it cuts some server off from another. Return every critical link, in any order (each link\'s two ends in any order too).',
    sig: {
      py: 'def criticalConnections(n: int, connections: List[List[int]]) -> List[List[int]]:',
      js: 'function criticalConnections(n, connections) {',
      java: 'public int[][] criticalConnections(int n, int[][] connections) {',
      cpp: 'vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {',
      go: 'func criticalConnections(n int, connections [][]int) [][]int {'
    },
    examples: [[[2, [[0, 1]]], [[0, 1]]], [[3, [[0, 1], [1, 2], [2, 0]]], []], [[4, [[0, 1], [1, 2], [2, 0], [2, 3]]], [[2, 3]]]],
    hidden: [[[6, [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [4, 5], [5, 3]]], [[1, 3]]], [[5, [[0, 1], [1, 2], [2, 3], [3, 4]]], [[3, 4], [2, 3], [1, 2], [0, 1]]], [[4, [[0, 1], [0, 2], [0, 3]]], [[0, 1], [0, 2], [0, 3]]], [[6, [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [2, 3]]], [[2, 3]]], [[3, [[0, 1], [1, 2]]], [[1, 2], [0, 1]]]],
    ref: function (n, connections) {
      const g = Array.from({ length: n }, () => []);
      connections.forEach(([a, b], i) => { g[a].push([b, i]); g[b].push([a, i]); });
      const tin = new Array(n).fill(-1), low = new Array(n).fill(0), out = [];
      let time = 0;
      const dfs = (u, edge) => {
        tin[u] = low[u] = time++;
        for (const [v, id] of g[u]) {
          if (id === edge) continue;
          if (tin[v] >= 0) low[u] = Math.min(low[u], tin[v]);
          else { dfs(v, id); low[u] = Math.min(low[u], low[v]); if (low[v] > tin[u]) out.push([u, v]); }
        }
      };
      for (let i = 0; i < n; i++) if (tin[i] < 0) dfs(i, -1);
      return out;
    }
  },
  'find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree': {
    fn: 'findCriticalAndPseudoCriticalEdges', params: ['n', 'edges'], cmp: 'exact', meta: ['Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', 'Hard', 'Graphs'],
    ask: 'The graph is connected; edge i is [a, b, weight]. An edge is critical if every cheapest spanning tree uses it, and pseudo-critical if some cheapest spanning trees use it and some do not. Return [critical edge indexes, pseudo-critical edge indexes], each list smallest first.',
    sig: {
      py: 'def findCriticalAndPseudoCriticalEdges(n: int, edges: List[List[int]]) -> List[List[int]]:',
      js: 'function findCriticalAndPseudoCriticalEdges(n, edges) {',
      java: 'public int[][] findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {',
      cpp: 'vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {',
      go: 'func findCriticalAndPseudoCriticalEdges(n int, edges [][]int) [][]int {'
    },
    examples: [[[3, [[0, 1, 1], [1, 2, 1], [0, 2, 1]]], [[], [0, 1, 2]]], [[2, [[0, 1, 5]]], [[0], []]], [[3, [[0, 1, 1], [1, 2, 2], [0, 2, 3]]], [[0, 1], []]]],
    hidden: [[[5, [[0, 1, 1], [1, 2, 1], [2, 3, 2], [0, 3, 2], [0, 4, 3], [3, 4, 3], [1, 4, 6]]], [[0, 1], [2, 3, 4, 5]]], [[4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 1]]], [[], [0, 1, 2, 3]]], [[4, [[0, 1, 1], [0, 2, 2], [0, 3, 3], [1, 2, 4], [2, 3, 5]]], [[0, 1, 2], []]], [[3, [[0, 1, 2], [0, 1, 2], [1, 2, 3]]], [[2], [0, 1]]], [[6, [[0, 1, 1], [1, 2, 1], [0, 2, 1], [2, 3, 4], [3, 4, 2], [3, 5, 2], [4, 5, 2]]], [[3], [0, 1, 2, 4, 5, 6]]]],
    ref: function (n, edges) {
      const order = edges.map((_, i) => i).sort((a, b) => edges[a][2] - edges[b][2]);
      const mst = (skip, force) => {
        const p = Array.from({ length: n }, (_, i) => i);
        const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
        let w = 0, used = 0;
        if (force >= 0) { const [a, b, c] = edges[force]; p[find(a)] = find(b); w += c; used++; }
        for (const i of order) {
          if (i === skip || i === force) continue;
          const [a, b, c] = edges[i];
          if (find(a) !== find(b)) { p[find(a)] = find(b); w += c; used++; }
        }
        return used === n - 1 ? w : Infinity;
      };
      const best = mst(-1, -1), crit = [], pseudo = [];
      edges.forEach((_, i) => { if (mst(i, -1) > best) crit.push(i); else if (mst(-1, i) === best) pseudo.push(i); });
      return [crit, pseudo];
    }
  },
  'minimum-cost-to-make-at-least-one-valid-path-in-a-grid': {
    fn: 'minCost', params: ['grid'], cmp: 'exact', meta: ['Minimum Cost to Make at Least One Valid Path in a Grid', 'Hard', 'Graphs'],
    ask: 'Each cell holds an arrow: 1 right, 2 left, 3 down, 4 up. From the top-left cell you follow arrows (you may walk off the grid by following one). Changing a cell\'s arrow costs 1, once per cell. Return the least cost that makes the arrows lead from the top-left cell to the bottom-right one.',
    sig: {
      py: 'def minCost(grid: List[List[int]]) -> int:',
      js: 'function minCost(grid) {',
      java: 'public int minCost(int[][] grid) {',
      cpp: 'int minCost(vector<vector<int>>& grid) {',
      go: 'func minCost(grid [][]int) int {'
    },
    examples: [[[[[1]]], 0], [[[[1, 3], [4, 1]]], 0], [[[[2, 2], [2, 2]]], 2]],
    hidden: [[[[[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]]], 3], [[[[1, 1, 3], [3, 2, 2], [1, 1, 4]]], 0], [[[[1, 2], [4, 3]]], 1], [[[[4]]], 0], [[[[3, 4, 3], [2, 2, 2], [2, 1, 1], [4, 3, 2], [2, 1, 4], [2, 4, 1], [3, 3, 3], [1, 4, 2], [2, 2, 1], [2, 1, 1], [3, 3, 1], [4, 1, 4], [2, 1, 4], [3, 2, 2], [3, 3, 1], [4, 4, 1], [1, 2, 2], [1, 1, 1], [1, 3, 4], [1, 2, 1], [2, 2, 4], [2, 1, 3], [1, 2, 1], [4, 3, 2], [3, 3, 4], [2, 2, 1], [3, 4, 3], [4, 2, 3], [4, 4, 4]]], 18]],
    ref: function (grid) {
      const m = grid.length, n = grid[0].length, dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      const dist = Array.from({ length: m }, () => new Array(n).fill(Infinity));
      dist[0][0] = 0;
      const dq = [[0, 0]];
      while (dq.length) {
        const [a, b] = dq.shift();
        dirs.forEach(([dx, dy], k) => {
          const x = a + dx, y = b + dy;
          if (x < 0 || y < 0 || x >= m || y >= n) return;
          const c = dist[a][b] + (grid[a][b] === k + 1 ? 0 : 1);
          if (c < dist[x][y]) { dist[x][y] = c; if (grid[a][b] === k + 1) dq.unshift([x, y]); else dq.push([x, y]); }
        });
      }
      return dist[m - 1][n - 1];
    }
  },
  'find-the-length-of-the-longest-common-prefix': {
    fn: 'longestCommonPrefix', params: ['arr1', 'arr2'], cmp: 'exact', meta: ['Find the Length of the Longest Common Prefix', 'Medium', 'Tries'],
    ask: 'Read each positive number as its digits. For every pair with one number from arr1 and one from arr2, find how many leading digits they share. Return the largest such count over all pairs.',
    sig: {
      py: 'def longestCommonPrefix(arr1: List[int], arr2: List[int]) -> int:',
      js: 'function longestCommonPrefix(arr1, arr2) {',
      java: 'public int longestCommonPrefix(int[] arr1, int[] arr2) {',
      cpp: 'int longestCommonPrefix(vector<int>& arr1, vector<int>& arr2) {',
      go: 'func longestCommonPrefix(arr1 []int, arr2 []int) int {'
    },
    examples: [[[[12, 345], [123]], 2], [[[5], [67]], 0], [[[1000], [1001, 9]], 3]],
    hidden: [[[[1, 10, 100], [1000]], 3], [[[1, 2, 3], [4, 4, 4]], 0], [[[987654321], [987654320, 98]], 8], [[[55, 555, 5555], [5]], 1], [[[13, 27, 450], [4501, 271]], 3]],
    ref: function (arr1, arr2) {
      const pre = new Set();
      arr1.forEach((x) => { const s = String(x); for (let i = 1; i <= s.length; i++) pre.add(s.slice(0, i)); });
      let best = 0;
      arr2.forEach((x) => { const s = String(x); for (let i = s.length; i > best; i--) if (pre.has(s.slice(0, i))) { best = i; break; } });
      return best;
    }
  },
  'sum-of-prefix-scores-of-strings': {
    fn: 'sumPrefixScores', params: ['words'], cmp: 'exact', meta: ['Sum of Prefix Scores of Strings', 'Hard', 'Tries'],
    ask: 'The score of a string p is how many words start with p. For each word, add up the scores of all its non-empty prefixes (the word itself included). Return those sums in order.',
    sig: {
      py: 'def sumPrefixScores(words: List[str]) -> List[int]:',
      js: 'function sumPrefixScores(words) {',
      java: 'public int[] sumPrefixScores(String[] words) {',
      cpp: 'vector<int> sumPrefixScores(vector<string>& words) {',
      go: 'func sumPrefixScores(words []string) []int {'
    },
    examples: [[[['ab', 'a']], [3, 2]], [[['x']], [1]], [[['ab', 'ab']], [4, 4]]],
    hidden: [[[['abc', 'ab', 'bc', 'b']], [5, 4, 3, 2]], [[['abcd']], [4]], [[['car', 'cart', 'cat', 'dog']], [8, 9, 7, 3]], [[['a', 'aa', 'aaa', 'aaaa']], [4, 7, 9, 10]], [[['zz', 'zy', 'yz']], [3, 3, 2]]],
    ref: function (words) {
      const root = { n: 0, k: {} };
      words.forEach((w) => { let t = root; for (const ch of w) { t = t.k[ch] = t.k[ch] || { n: 0, k: {} }; t.n++; } });
      return words.map((w) => { let t = root, s = 0; for (const ch of w) { t = t.k[ch]; s += t.n; } return s; });
    }
  },
  'prefix-and-suffix-search': {
    fn: 'WordFilter', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Prefix and Suffix Search', 'Hard', 'Tries'],
    ask: 'WordFilter(words) stores a list of words. f(pref, suff) returns the largest index of a word that starts with pref and ends with suff, or -1 if none does. The first op names the class and its argument is the word list.',
    sig: {
      py: 'class WordFilter:',
      js: 'class WordFilter {',
      java: 'class WordFilter {',
      cpp: 'class WordFilter {',
      go: 'type WordFilter struct {'
    },
    starter: {
      py: 'class WordFilter:\n    def __init__(self, words: List[str]):\n        pass\n\n    def f(self, pref: str, suff: str) -> int:\n        pass\n',
      js: 'class WordFilter {\n  constructor(words) {\n  }\n  f(pref, suff) {\n  }\n}\n',
      java: 'class WordFilter {\n    public WordFilter(String[] words) {\n    }\n    public int f(String pref, String suff) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass WordFilter {\npublic:\n    WordFilter(vector<string>& words) {\n    }\n    int f(string pref, string suff) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype WordFilter struct {\n}\n\nfunc Constructor(words []string) WordFilter {\n    return WordFilter{}\n}\n\nfunc (this *WordFilter) F(pref string, suff string) int {\n    return 0\n}\n'
    },
    examples: [[[['WordFilter', 'f', 'f'], [[['apple', 'ample']], ['a', 'e'], ['ap', 'le']]], [null, 1, 0]], [[['WordFilter', 'f'], [[['tea']], ['b', 'a']]], [null, -1]], [[['WordFilter', 'f', 'f'], [[['abc', 'abc']], ['', ''], ['abc', 'abc']]], [null, 1, 1]]],
    hidden: [[[['WordFilter', 'f', 'f', 'f'], [[['cabaabaaaa', 'ccbcababac', 'bacaabccba']], ['bccbacbcba', 'a'], ['ab', 'abcaccbcaa'], ['a', 'aa']]], [null, -1, -1, -1]], [[['WordFilter', 'f', 'f', 'f'], [[['pop', 'top', 'pot']], ['p', 'p'], ['', 'op'], ['t', 't']]], [null, 0, 1, -1]], [[['WordFilter', 'f'], [[['x']], ['x', 'x']]], [null, 0]], [[['WordFilter', 'f', 'f'], [[['sun', 'son', 'sin']], ['s', 'n'], ['so', '']]], [null, 2, 1]], [[['WordFilter', 'f', 'f'], [[['aa', 'a', 'aaa']], ['a', 'a'], ['aa', 'aa']]], [null, 2, 2]]],
    ref: class {
      constructor(words) { this.m = new Map(); words.forEach((w, i) => { for (let a = 0; a <= w.length; a++) for (let b = 0; b <= w.length; b++) this.m.set(w.slice(0, a) + '#' + w.slice(w.length - b), i); }); }
      f(pref, suff) { const k = pref + '#' + suff; return this.m.has(k) ? this.m.get(k) : -1; }
    }
  },
  'relative-ranks': {
    fn: 'findRelativeRanks', params: ['score'], cmp: 'exact', meta: ['Relative Ranks', 'Easy', 'Sorting'],
    ask: 'Scores are all different. The highest gets "Gold Medal", the second "Silver Medal", the third "Bronze Medal", and everyone else their place as a string ("4", "5", ...). Return each athlete\'s label, in the input order.',
    sig: {
      py: 'def findRelativeRanks(score: List[int]) -> List[str]:',
      js: 'function findRelativeRanks(score) {',
      java: 'public String[] findRelativeRanks(int[] score) {',
      cpp: 'vector<string> findRelativeRanks(vector<int>& score) {',
      go: 'func findRelativeRanks(score []int) []string {'
    },
    examples: [[[[10, 30, 20]], ['Bronze Medal', 'Gold Medal', 'Silver Medal']], [[[7]], ['Gold Medal']], [[[1, 2, 3, 4, 5]], ['5', '4', 'Bronze Medal', 'Silver Medal', 'Gold Medal']]],
    hidden: [[[[10, 3, 8, 9, 4]], ['Gold Medal', '5', 'Bronze Medal', 'Silver Medal', '4']], [[[0, 1000000]], ['Silver Medal', 'Gold Medal']], [[[42, 7, 99, 13, 58, 1]], ['Bronze Medal', '5', 'Gold Medal', '4', 'Silver Medal', '6']], [[[5, 4, 3, 2, 1]], ['Gold Medal', 'Silver Medal', 'Bronze Medal', '4', '5']], [[[100, 90]], ['Gold Medal', 'Silver Medal']]],
    ref: function (score) {
      const order = score.map((_, i) => i).sort((a, b) => score[b] - score[a]), out = new Array(score.length);
      const top = ['Gold Medal', 'Silver Medal', 'Bronze Medal'];
      order.forEach((i, r) => { out[i] = r < 3 ? top[r] : String(r + 1); });
      return out;
    }
  },
  'sort-array-by-increasing-frequency': {
    fn: 'frequencySort', params: ['nums'], cmp: 'exact', meta: ['Sort Array by Increasing Frequency', 'Easy', 'Sorting'],
    ask: 'Sort nums so values that appear fewer times come first. Values that appear equally often go from largest to smallest.',
    sig: {
      py: 'def frequencySort(nums: List[int]) -> List[int]:',
      js: 'function frequencySort(nums) {',
      java: 'public int[] frequencySort(int[] nums) {',
      cpp: 'vector<int> frequencySort(vector<int>& nums) {',
      go: 'func frequencySort(nums []int) []int {'
    },
    examples: [[[[4, 4, 1, 2, 2, 2]], [1, 4, 4, 2, 2, 2]], [[[3, 1]], [3, 1]], [[[5]], [5]]],
    hidden: [[[[2, 3, 1, 3, 2]], [1, 3, 3, 2, 2]], [[[-1, 1, -6, 4, 5, -6, 1, 4, 1]], [5, -1, 4, 4, -6, -6, 1, 1, 1]], [[[7, 7, 7]], [7, 7, 7]], [[[0, -1, 0, -1, 9]], [9, 0, 0, -1, -1]], [[[10, 20, 30, 20]], [30, 10, 20, 20]]],
    ref: function (nums) {
      const c = new Map();
      nums.forEach((x) => c.set(x, (c.get(x) || 0) + 1));
      return nums.slice().sort((a, b) => c.get(a) - c.get(b) || b - a);
    }
  },
  'insertion-sort-list': {
    fn: 'insertionSortList', params: ['head'], cmp: 'exact', io: { args: ['list'], ret: 'list' }, meta: ['Insertion Sort List', 'Medium', 'Sorting'],
    ask: 'Sort the linked list, smallest first, by insertion sort: take nodes one at a time and insert each into its place in a growing sorted list. Return the new head.',
    sig: {
      py: 'def insertionSortList(head: Optional[ListNode]) -> Optional[ListNode]:',
      js: 'function insertionSortList(head) {',
      java: 'public ListNode insertionSortList(ListNode head) {',
      cpp: 'ListNode* insertionSortList(ListNode* head) {',
      go: 'func insertionSortList(head *ListNode) *ListNode {'
    },
    examples: [[[[3, 1, 2]], [1, 2, 3]], [[[]], []], [[[-1, 5, -1]], [-1, -1, 5]]],
    hidden: [[[[1]], [1]], [[[5, 4, 3, 2, 1]], [1, 2, 3, 4, 5]], [[[1, 2, 3, 4]], [1, 2, 3, 4]], [[[0, 0, -3, 7, 2, 2]], [-3, 0, 0, 2, 2, 7]], [[[100, -100, 50, -50]], [-100, -50, 50, 100]]],
    ref: function (head) {
      const dummy = { next: null };
      let cur = head;
      while (cur) {
        const nxt = cur.next;
        let p = dummy;
        while (p.next && p.next.val <= cur.val) p = p.next;
        cur.next = p.next; p.next = cur;
        cur = nxt;
      }
      return dummy.next;
    }
  },
  'design-hashset': {
    fn: 'MyHashSet', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['Design HashSet', 'Easy', 'Design'],
    ask: 'Build a set of whole numbers 0 to 1000000 without a built-in set or map: add(key) puts key in, remove(key) takes it out if present, contains(key) says whether it is in.',
    sig: {
      py: 'class MyHashSet:',
      js: 'class MyHashSet {',
      java: 'class MyHashSet {',
      cpp: 'class MyHashSet {',
      go: 'type MyHashSet struct {'
    },
    starter: {
      py: 'class MyHashSet:\n    def __init__(self):\n        pass\n\n    def add(self, key: int) -> None:\n        pass\n\n    def remove(self, key: int) -> None:\n        pass\n\n    def contains(self, key: int) -> bool:\n        pass\n',
      js: 'class MyHashSet {\n  constructor() {\n  }\n  add(key) {\n  }\n  remove(key) {\n  }\n  contains(key) {\n  }\n}\n',
      java: 'class MyHashSet {\n    public MyHashSet() {\n    }\n    public void add(int key) {\n    }\n    public void remove(int key) {\n    }\n    public boolean contains(int key) {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyHashSet {\npublic:\n    MyHashSet() {\n    }\n    void add(int key) {\n    }\n    void remove(int key) {\n    }\n    bool contains(int key) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype MyHashSet struct {\n}\n\nfunc Constructor() MyHashSet {\n    return MyHashSet{}\n}\n\nfunc (this *MyHashSet) Add(key int) {\n}\n\nfunc (this *MyHashSet) Remove(key int) {\n}\n\nfunc (this *MyHashSet) Contains(key int) bool {\n    return false\n}\n'
    },
    examples: [[[['add', 'add', 'contains', 'contains', 'remove', 'contains'], [[3], [8], [3], [5], [3], [3]]], [null, null, true, false, null, false]], [[['contains'], [[0]]], [false]], [[['add', 'add', 'remove', 'contains'], [[7], [7], [7], [7]]], [null, null, null, false]]],
    hidden: [[[['add', 'add', 'add', 'contains', 'contains', 'contains'], [[1000000], [0], [999], [1000000], [0], [998]]], [null, null, null, true, true, false]], [[['remove', 'add', 'contains'], [[5], [5], [5]]], [null, null, true]], [[['add', 'add', 'remove', 'contains', 'contains'], [[1], [1001], [1], [1001], [1]]], [null, null, null, true, false]], [[['add', 'remove', 'remove', 'add', 'contains'], [[42], [42], [42], [42], [42]]], [null, null, null, null, true]], [[['add', 'add', 'add', 'add', 'remove', 'remove', 'contains', 'contains'], [[2], [4], [6], [8], [4], [6], [2], [6]]], [null, null, null, null, null, null, true, false]]],
    ref: class {
      constructor() { this.b = Array.from({ length: 1009 }, () => []); }
      add(key) { const r = this.b[key % 1009]; if (!r.includes(key)) r.push(key); }
      remove(key) { const r = this.b[key % 1009], i = r.indexOf(key); if (i >= 0) r.splice(i, 1); }
      contains(key) { return this.b[key % 1009].includes(key); }
    }
  },
  'design-circular-deque': {
    fn: 'MyCircularDeque', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Design Circular Deque', 'Medium', 'Design'],
    ask: 'Build a double-ended queue that holds at most k values in a fixed ring of slots. insertFront and insertLast add a value and return true, or return false when full; deleteFront and deleteLast remove one and return true, or false when empty. getFront and getRear return the end values, or -1 when empty. isEmpty and isFull say what they mean. The first op names the class with k.',
    sig: {
      py: 'class MyCircularDeque:',
      js: 'class MyCircularDeque {',
      java: 'class MyCircularDeque {',
      cpp: 'class MyCircularDeque {',
      go: 'type MyCircularDeque struct {'
    },
    starter: {
      py: 'class MyCircularDeque:\n    def __init__(self, k: int):\n        pass\n\n    def insertFront(self, value: int) -> bool:\n        pass\n\n    def insertLast(self, value: int) -> bool:\n        pass\n\n    def deleteFront(self) -> bool:\n        pass\n\n    def deleteLast(self) -> bool:\n        pass\n\n    def getFront(self) -> int:\n        pass\n\n    def getRear(self) -> int:\n        pass\n\n    def isEmpty(self) -> bool:\n        pass\n\n    def isFull(self) -> bool:\n        pass\n',
      js: 'class MyCircularDeque {\n  constructor(k) {\n  }\n  insertFront(value) {\n  }\n  insertLast(value) {\n  }\n  deleteFront() {\n  }\n  deleteLast() {\n  }\n  getFront() {\n  }\n  getRear() {\n  }\n  isEmpty() {\n  }\n  isFull() {\n  }\n}\n',
      java: 'class MyCircularDeque {\n    public MyCircularDeque(int k) {\n    }\n    public boolean insertFront(int value) {\n        return false;\n    }\n    public boolean insertLast(int value) {\n        return false;\n    }\n    public boolean deleteFront() {\n        return false;\n    }\n    public boolean deleteLast() {\n        return false;\n    }\n    public int getFront() {\n        return 0;\n    }\n    public int getRear() {\n        return 0;\n    }\n    public boolean isEmpty() {\n        return false;\n    }\n    public boolean isFull() {\n        return false;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass MyCircularDeque {\npublic:\n    MyCircularDeque(int k) {\n    }\n    bool insertFront(int value) {\n        return {};\n    }\n    bool insertLast(int value) {\n        return {};\n    }\n    bool deleteFront() {\n        return {};\n    }\n    bool deleteLast() {\n        return {};\n    }\n    int getFront() {\n        return {};\n    }\n    int getRear() {\n        return {};\n    }\n    bool isEmpty() {\n        return {};\n    }\n    bool isFull() {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype MyCircularDeque struct {\n}\n\nfunc Constructor(k int) MyCircularDeque {\n    return MyCircularDeque{}\n}\n\nfunc (this *MyCircularDeque) InsertFront(value int) bool {\n    return false\n}\n\nfunc (this *MyCircularDeque) InsertLast(value int) bool {\n    return false\n}\n\nfunc (this *MyCircularDeque) DeleteFront() bool {\n    return false\n}\n\nfunc (this *MyCircularDeque) DeleteLast() bool {\n    return false\n}\n\nfunc (this *MyCircularDeque) GetFront() int {\n    return 0\n}\n\nfunc (this *MyCircularDeque) GetRear() int {\n    return 0\n}\n\nfunc (this *MyCircularDeque) IsEmpty() bool {\n    return false\n}\n\nfunc (this *MyCircularDeque) IsFull() bool {\n    return false\n}\n'
    },
    examples: [[[['MyCircularDeque', 'insertLast', 'insertFront', 'insertFront', 'getRear', 'isFull', 'deleteLast', 'getRear'], [[2], [1], [2], [3], [], [], [], []]], [null, true, true, false, 1, true, true, 2]], [[['MyCircularDeque', 'getFront', 'isEmpty'], [[1], [], []]], [null, -1, true]], [[['MyCircularDeque', 'insertFront', 'deleteFront', 'deleteLast'], [[3], [9], [], []]], [null, true, true, false]]],
    hidden: [[[['MyCircularDeque', 'insertLast', 'insertLast', 'insertLast', 'getFront', 'getRear', 'deleteFront', 'insertLast', 'getRear', 'getFront'], [[3], [1], [2], [3], [], [], [], [4], [], []]], [null, true, true, true, 1, 3, true, true, 4, 2]], [[['MyCircularDeque', 'insertFront', 'insertFront', 'getFront', 'getRear', 'deleteLast', 'getRear'], [[2], [5], [6], [], [], [], []]], [null, true, true, 6, 5, true, 6]], [[['MyCircularDeque', 'isFull', 'insertLast', 'isFull', 'insertFront'], [[1], [], [7], [], [8]]], [null, false, true, true, false]], [[['MyCircularDeque', 'insertFront', 'insertLast', 'deleteFront', 'deleteFront', 'isEmpty', 'getRear'], [[4], [1], [2], [], [], [], []]], [null, true, true, true, true, true, -1]], [[['MyCircularDeque', 'insertLast', 'insertFront', 'insertLast', 'insertFront', 'getFront', 'getRear', 'deleteLast', 'deleteFront', 'getFront', 'getRear'], [[4], [1], [2], [3], [4], [], [], [], [], [], []]], [null, true, true, true, true, 4, 3, true, true, 2, 1]]],
    ref: class {
      constructor(k) { this.k = k; this.a = new Array(k); this.h = 0; this.n = 0; }
      insertFront(v) { if (this.n === this.k) return false; this.h = (this.h - 1 + this.k) % this.k; this.a[this.h] = v; this.n++; return true; }
      insertLast(v) { if (this.n === this.k) return false; this.a[(this.h + this.n) % this.k] = v; this.n++; return true; }
      deleteFront() { if (!this.n) return false; this.h = (this.h + 1) % this.k; this.n--; return true; }
      deleteLast() { if (!this.n) return false; this.n--; return true; }
      getFront() { return this.n ? this.a[this.h] : -1; }
      getRear() { return this.n ? this.a[(this.h + this.n - 1) % this.k] : -1; }
      isEmpty() { return this.n === 0; }
      isFull() { return this.n === this.k; }
    }
  },
  'snapshot-array': {
    fn: 'SnapshotArray', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Snapshot Array', 'Medium', 'Design'],
    ask: 'SnapshotArray(length) starts with every slot 0. set(index, val) changes a slot. snap() takes a snapshot and returns its id (0, 1, 2, ...). get(index, snap_id) returns the slot\'s value when that snapshot was taken. Keep memory low: do not copy the whole array on each snap. The first op names the class with the length.',
    sig: {
      py: 'class SnapshotArray:',
      js: 'class SnapshotArray {',
      java: 'class SnapshotArray {',
      cpp: 'class SnapshotArray {',
      go: 'type SnapshotArray struct {'
    },
    starter: {
      py: 'class SnapshotArray:\n    def __init__(self, length: int):\n        pass\n\n    def set(self, index: int, val: int) -> None:\n        pass\n\n    def snap(self) -> int:\n        pass\n\n    def get(self, index: int, snap_id: int) -> int:\n        pass\n',
      js: 'class SnapshotArray {\n  constructor(length) {\n  }\n  set(index, val) {\n  }\n  snap() {\n  }\n  get(index, snap_id) {\n  }\n}\n',
      java: 'class SnapshotArray {\n    public SnapshotArray(int length) {\n    }\n    public void set(int index, int val) {\n    }\n    public int snap() {\n        return 0;\n    }\n    public int get(int index, int snap_id) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass SnapshotArray {\npublic:\n    SnapshotArray(int length) {\n    }\n    void set(int index, int val) {\n    }\n    int snap() {\n        return {};\n    }\n    int get(int index, int snap_id) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype SnapshotArray struct {\n}\n\nfunc Constructor(length int) SnapshotArray {\n    return SnapshotArray{}\n}\n\nfunc (this *SnapshotArray) Set(index int, val int) {\n}\n\nfunc (this *SnapshotArray) Snap() int {\n    return 0\n}\n\nfunc (this *SnapshotArray) Get(index int, snap_id int) int {\n    return 0\n}\n'
    },
    examples: [[[['SnapshotArray', 'set', 'snap', 'set', 'get', 'get'], [[2], [0, 4], [], [0, 9], [0, 0], [1, 0]]], [null, null, 0, null, 4, 0]], [[['SnapshotArray', 'snap', 'snap', 'get'], [[1], [], [], [0, 1]]], [null, 0, 1, 0]], [[['SnapshotArray', 'set', 'set', 'snap', 'get'], [[3], [2, 5], [2, 6], [], [2, 0]]], [null, null, null, 0, 6]]],
    hidden: [[[['SnapshotArray', 'set', 'snap', 'snap', 'set', 'snap', 'get', 'get', 'get'], [[4], [1, 10], [], [], [1, 20], [], [1, 0], [1, 1], [1, 2]]], [null, null, 0, 1, null, 2, 10, 10, 20]], [[['SnapshotArray', 'snap', 'set', 'get'], [[1], [], [0, 3], [0, 0]]], [null, 0, null, 0]], [[['SnapshotArray', 'set', 'set', 'set', 'snap', 'get', 'get', 'get'], [[3], [0, 1], [1, 2], [2, 3], [], [0, 0], [1, 0], [2, 0]]], [null, null, null, null, 0, 1, 2, 3]], [[['SnapshotArray', 'set', 'snap', 'set', 'snap', 'set', 'snap', 'get', 'get', 'get'], [[1], [0, 1], [], [0, 2], [], [0, 3], [], [0, 0], [0, 1], [0, 2]]], [null, null, 0, null, 1, null, 2, 1, 2, 3]], [[['SnapshotArray', 'snap', 'snap', 'snap', 'set', 'snap', 'get', 'get'], [[2], [], [], [], [1, 7], [], [1, 2], [1, 3]]], [null, 0, 1, 2, null, 3, 0, 7]]],
    ref: class {
      constructor(length) { this.h = Array.from({ length }, () => [[-1, 0]]); this.id = 0; }
      set(i, v) { const h = this.h[i]; if (h[h.length - 1][0] === this.id) h[h.length - 1][1] = v; else h.push([this.id, v]); }
      snap() { return this.id++; }
      get(i, s) {
        const h = this.h[i];
        let lo = 0, hi = h.length - 1;
        while (lo < hi) { const m = (lo + hi + 1) >> 1; if (h[m][0] <= s) lo = m; else hi = m - 1; }
        return h[lo][1];
      }
    }
  },
  'design-underground-system': {
    fn: 'UndergroundSystem', params: ['ops', 'args'], cmp: 'any', io: { design: true }, meta: ['Design Underground System', 'Medium', 'Design'],
    ask: 'Track a train system. checkIn(id, station, t) and checkOut(id, station, t) record a rider entering and leaving (a rider is in at most one trip at a time). getAverageTime(start, end) returns the average time of all finished trips that went from start to end; at least one such trip exists when it is asked. Averages are checked to within 1e-6.',
    sig: {
      py: 'class UndergroundSystem:',
      js: 'class UndergroundSystem {',
      java: 'class UndergroundSystem {',
      cpp: 'class UndergroundSystem {',
      go: 'type UndergroundSystem struct {'
    },
    starter: {
      py: 'class UndergroundSystem:\n    def __init__(self):\n        pass\n\n    def checkIn(self, id: int, stationName: str, t: int) -> None:\n        pass\n\n    def checkOut(self, id: int, stationName: str, t: int) -> None:\n        pass\n\n    def getAverageTime(self, startStation: str, endStation: str) -> float:\n        pass\n',
      js: 'class UndergroundSystem {\n  constructor() {\n  }\n  checkIn(id, stationName, t) {\n  }\n  checkOut(id, stationName, t) {\n  }\n  getAverageTime(startStation, endStation) {\n  }\n}\n',
      java: 'class UndergroundSystem {\n    public UndergroundSystem() {\n    }\n    public void checkIn(int id, String stationName, int t) {\n    }\n    public void checkOut(int id, String stationName, int t) {\n    }\n    public double getAverageTime(String startStation, String endStation) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass UndergroundSystem {\npublic:\n    UndergroundSystem() {\n    }\n    void checkIn(int id, string stationName, int t) {\n    }\n    void checkOut(int id, string stationName, int t) {\n    }\n    double getAverageTime(string startStation, string endStation) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype UndergroundSystem struct {\n}\n\nfunc Constructor() UndergroundSystem {\n    return UndergroundSystem{}\n}\n\nfunc (this *UndergroundSystem) CheckIn(id int, stationName string, t int) {\n}\n\nfunc (this *UndergroundSystem) CheckOut(id int, stationName string, t int) {\n}\n\nfunc (this *UndergroundSystem) GetAverageTime(startStation string, endStation string) float64 {\n    return 0\n}\n'
    },
    examples: [[[['checkIn', 'checkOut', 'getAverageTime'], [[1, 'Oak', 3], [1, 'Elm', 10], ['Oak', 'Elm']]], [null, null, 7]], [[['checkIn', 'checkIn', 'checkOut', 'checkOut', 'getAverageTime'], [[1, 'A', 0], [2, 'A', 5], [1, 'B', 4], [2, 'B', 10], ['A', 'B']]], [null, null, null, null, 4.5]], [[['checkIn', 'checkOut', 'checkIn', 'checkOut', 'getAverageTime', 'getAverageTime'], [[7, 'X', 1], [7, 'Y', 2], [7, 'Y', 3], [7, 'X', 13], ['X', 'Y'], ['Y', 'X']]], [null, null, null, null, 1, 10]]],
    hidden: [[[['checkIn', 'checkIn', 'checkIn', 'checkOut', 'checkOut', 'checkOut', 'getAverageTime'], [[1, 'P', 1], [2, 'P', 2], [3, 'P', 3], [1, 'Q', 5], [2, 'Q', 7], [3, 'Q', 10], ['P', 'Q']]], [null, null, null, null, null, null, 5.333333333333333]], [[['checkIn', 'checkOut', 'getAverageTime', 'checkIn', 'checkOut', 'getAverageTime'], [[10, 'Lee', 3], [10, 'Mid', 8], ['Lee', 'Mid'], [5, 'Lee', 10], [5, 'Mid', 16], ['Lee', 'Mid']]], [null, null, 5, null, null, 5.5]], [[['checkIn', 'checkOut', 'checkIn', 'checkOut', 'getAverageTime'], [[1, 'A', 0], [1, 'B', 1], [1, 'B', 2], [1, 'A', 3], ['B', 'A']]], [null, null, null, null, 1]], [[['checkIn', 'checkIn', 'checkOut', 'checkOut', 'getAverageTime', 'getAverageTime'], [[1, 'S', 1], [2, 'T', 1], [1, 'T', 4], [2, 'S', 2], ['S', 'T'], ['T', 'S']]], [null, null, null, null, 3, 1]], [[['checkIn', 'checkOut', 'checkIn', 'checkOut', 'checkIn', 'checkOut', 'getAverageTime'], [[1, 'M', 0], [1, 'N', 1], [2, 'M', 0], [2, 'N', 1], [3, 'M', 0], [3, 'N', 2], ['M', 'N']]], [null, null, null, null, null, null, 1.3333333333333333]]],
    check: function (args, got, want) {
      if (!Array.isArray(got) || got.length !== want.length) return false;
      return want.every((w, i) => (typeof w === 'number' ? typeof got[i] === 'number' && Math.abs(got[i] - w) <= 1e-6 : got[i] === w));
    },
    ref: class {
      constructor() { this.in = new Map(); this.trips = new Map(); }
      checkIn(id, s, t) { this.in.set(id, [s, t]); }
      checkOut(id, s, t) { const [a, t0] = this.in.get(id); this.in.delete(id); const k = a + '>' + s, v = this.trips.get(k) || [0, 0]; this.trips.set(k, [v[0] + t - t0, v[1] + 1]); }
      getAverageTime(a, b) { const v = this.trips.get(a + '>' + b); return v[0] / v[1]; }
    }
  },
  'design-twitter': {
    fn: 'Twitter', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['Design Twitter', 'Medium', 'Design'],
    ask: 'Build a small social feed. postTweet(userId, tweetId) posts a new message (ids are unique). getNewsFeed(userId) returns the ids of the 10 newest messages posted by that user or anyone they follow, newest first. follow(a, b) and unfollow(a, b) start and stop a following b; following yourself changes nothing.',
    sig: {
      py: 'class Twitter:',
      js: 'class Twitter {',
      java: 'class Twitter {',
      cpp: 'class Twitter {',
      go: 'type Twitter struct {'
    },
    starter: {
      py: 'class Twitter:\n    def __init__(self):\n        pass\n\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        pass\n\n    def getNewsFeed(self, userId: int) -> List[int]:\n        pass\n\n    def follow(self, followerId: int, followeeId: int) -> None:\n        pass\n\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        pass\n',
      js: 'class Twitter {\n  constructor() {\n  }\n  postTweet(userId, tweetId) {\n  }\n  getNewsFeed(userId) {\n  }\n  follow(followerId, followeeId) {\n  }\n  unfollow(followerId, followeeId) {\n  }\n}\n',
      java: 'class Twitter {\n    public Twitter() {\n    }\n    public void postTweet(int userId, int tweetId) {\n    }\n    public int[] getNewsFeed(int userId) {\n        return null;\n    }\n    public void follow(int followerId, int followeeId) {\n    }\n    public void unfollow(int followerId, int followeeId) {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass Twitter {\npublic:\n    Twitter() {\n    }\n    void postTweet(int userId, int tweetId) {\n    }\n    vector<int> getNewsFeed(int userId) {\n        return {};\n    }\n    void follow(int followerId, int followeeId) {\n    }\n    void unfollow(int followerId, int followeeId) {\n    }\n};\n',
      go: 'package main\n\ntype Twitter struct {\n}\n\nfunc Constructor() Twitter {\n    return Twitter{}\n}\n\nfunc (this *Twitter) PostTweet(userId int, tweetId int) {\n}\n\nfunc (this *Twitter) GetNewsFeed(userId int) []int {\n    return nil\n}\n\nfunc (this *Twitter) Follow(followerId int, followeeId int) {\n}\n\nfunc (this *Twitter) Unfollow(followerId int, followeeId int) {\n}\n'
    },
    examples: [[[['postTweet', 'follow', 'postTweet', 'getNewsFeed', 'unfollow', 'getNewsFeed'], [[1, 11], [2, 1], [2, 22], [2], [2, 1], [2]]], [null, null, null, [22, 11], null, [22]]], [[['getNewsFeed'], [[9]]], [[]]], [[['postTweet', 'postTweet', 'getNewsFeed'], [[3, 5], [3, 4], [3]]], [null, null, [4, 5]]]],
    hidden: [[[['postTweet', 'postTweet', 'postTweet', 'postTweet', 'postTweet', 'postTweet', 'postTweet', 'postTweet', 'postTweet', 'postTweet', 'postTweet', 'getNewsFeed'], [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1]]], [null, null, null, null, null, null, null, null, null, null, null, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]]], [[['follow', 'follow', 'postTweet', 'postTweet', 'postTweet', 'getNewsFeed', 'getNewsFeed'], [[1, 2], [1, 3], [3, 30], [2, 20], [1, 10], [1], [2]]], [null, null, null, null, null, [10, 20, 30], [20]]], [[['follow', 'postTweet', 'getNewsFeed', 'unfollow', 'getNewsFeed'], [[1, 1], [1, 7], [1], [1, 1], [1]]], [null, null, [7], null, [7]]], [[['postTweet', 'unfollow', 'getNewsFeed'], [[1, 4], [1, 2], [1]]], [null, null, [4]]], [[['postTweet', 'follow', 'follow', 'postTweet', 'unfollow', 'postTweet', 'getNewsFeed'], [[2, 100], [1, 2], [1, 2], [2, 101], [1, 2], [1, 102], [1]]], [null, null, null, null, null, null, [102]]]],
    ref: class {
      constructor() { this.t = []; this.f = new Map(); }
      postTweet(u, id) { this.t.push([u, id]); }
      getNewsFeed(u) { const fs = this.f.get(u) || new Set(), out = []; for (let i = this.t.length - 1; i >= 0 && out.length < 10; i--) if (this.t[i][0] === u || fs.has(this.t[i][0])) out.push(this.t[i][1]); return out; }
      follow(a, b) { if (a === b) return; if (!this.f.has(a)) this.f.set(a, new Set()); this.f.get(a).add(b); }
      unfollow(a, b) { if (this.f.has(a)) this.f.get(a).delete(b); }
    }
  },
  'lfu-cache': {
    fn: 'LFUCache', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['LFU Cache', 'Hard', 'Design'],
    ask: 'Build a cache holding at most capacity keys. get(key) returns the value or -1. put(key, value) sets it; when a new key arrives and the cache is full, first throw out the key used the fewest times (get and put both count as uses), breaking ties by the key used longest ago. Aim for O(1) per call. The first op names the class with the capacity.',
    sig: {
      py: 'class LFUCache:',
      js: 'class LFUCache {',
      java: 'class LFUCache {',
      cpp: 'class LFUCache {',
      go: 'type LFUCache struct {'
    },
    starter: {
      py: 'class LFUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n',
      js: 'class LFUCache {\n  constructor(capacity) {\n  }\n  get(key) {\n  }\n  put(key, value) {\n  }\n}\n',
      java: 'class LFUCache {\n    public LFUCache(int capacity) {\n    }\n    public int get(int key) {\n        return 0;\n    }\n    public void put(int key, int value) {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass LFUCache {\npublic:\n    LFUCache(int capacity) {\n    }\n    int get(int key) {\n        return {};\n    }\n    void put(int key, int value) {\n    }\n};\n',
      go: 'package main\n\ntype LFUCache struct {\n}\n\nfunc Constructor(capacity int) LFUCache {\n    return LFUCache{}\n}\n\nfunc (this *LFUCache) Get(key int) int {\n    return 0\n}\n\nfunc (this *LFUCache) Put(key int, value int) {\n}\n'
    },
    examples: [[[['LFUCache', 'put', 'put', 'get', 'put', 'get', 'get'], [[2], [1, 10], [2, 20], [1], [3, 30], [2], [3]]], [null, null, null, 10, null, -1, 30]], [[['LFUCache', 'get'], [[1], [5]]], [null, -1]], [[['LFUCache', 'put', 'put', 'get'], [[1], [1, 1], [2, 2], [1]]], [null, null, null, -1]]],
    hidden: [[[['LFUCache', 'put', 'put', 'get', 'put', 'get', 'get', 'put', 'get', 'get', 'get'], [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]], [null, null, null, 1, null, -1, 3, null, -1, 3, 4]], [[['LFUCache', 'put', 'get'], [[0], [0, 0], [0]]], [null, null, -1]], [[['LFUCache', 'put', 'put', 'put', 'get', 'get', 'put', 'get', 'get', 'get'], [[3], [1, 1], [2, 2], [3, 3], [1], [2], [4, 4], [3], [1], [4]]], [null, null, null, null, 1, 2, null, -1, 1, 4]], [[['LFUCache', 'put', 'put', 'get', 'get', 'put', 'get'], [[1], [7, 70], [7, 71], [7], [8], [8, 80], [7]]], [null, null, null, 71, -1, null, -1]], [[['LFUCache', 'put', 'put', 'put', 'put', 'get', 'get'], [[2], [2, 1], [1, 1], [2, 3], [4, 1], [1], [2]]], [null, null, null, null, null, -1, 3]]],
    ref: class {
      constructor(capacity) { this.cap = capacity; this.m = new Map(); this.tick = 0; }
      get(key) { const e = this.m.get(key); if (!e) return -1; e.n++; e.t = ++this.tick; return e.v; }
      put(key, value) {
        if (this.cap <= 0) return;
        const e = this.m.get(key);
        if (e) { e.v = value; e.n++; e.t = ++this.tick; return; }
        if (this.m.size >= this.cap) {
          let worst = null;
          for (const [k, x] of this.m) if (!worst || x.n < worst[1].n || (x.n === worst[1].n && x.t < worst[1].t)) worst = [k, x];
          this.m.delete(worst[0]);
        }
        this.m.set(key, { v: value, n: 1, t: ++this.tick });
      }
    }
  },
  'all-oone-data-structure': {
    fn: 'AllOne', params: ['ops', 'args'], cmp: 'any', io: { design: true }, meta: ['All O`one Data Structure', 'Hard', 'Design'],
    ask: 'Count strings. inc(key) adds one to key\'s count (starting from 0). dec(key) takes one away and forgets key at 0 (dec is only called on a key that is there). getMaxKey() and getMinKey() return a key with the highest or lowest count, or "" when nothing is counted; any key on a tie is accepted. Aim for O(1) per call.',
    sig: {
      py: 'class AllOne:',
      js: 'class AllOne {',
      java: 'class AllOne {',
      cpp: 'class AllOne {',
      go: 'type AllOne struct {'
    },
    starter: {
      py: 'class AllOne:\n    def __init__(self):\n        pass\n\n    def inc(self, key: str) -> None:\n        pass\n\n    def dec(self, key: str) -> None:\n        pass\n\n    def getMaxKey(self) -> str:\n        pass\n\n    def getMinKey(self) -> str:\n        pass\n',
      js: 'class AllOne {\n  constructor() {\n  }\n  inc(key) {\n  }\n  dec(key) {\n  }\n  getMaxKey() {\n  }\n  getMinKey() {\n  }\n}\n',
      java: 'class AllOne {\n    public AllOne() {\n    }\n    public void inc(String key) {\n    }\n    public void dec(String key) {\n    }\n    public String getMaxKey() {\n        return "";\n    }\n    public String getMinKey() {\n        return "";\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass AllOne {\npublic:\n    AllOne() {\n    }\n    void inc(string key) {\n    }\n    void dec(string key) {\n    }\n    string getMaxKey() {\n        return {};\n    }\n    string getMinKey() {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype AllOne struct {\n}\n\nfunc Constructor() AllOne {\n    return AllOne{}\n}\n\nfunc (this *AllOne) Inc(key string) {\n}\n\nfunc (this *AllOne) Dec(key string) {\n}\n\nfunc (this *AllOne) GetMaxKey() string {\n    return ""\n}\n\nfunc (this *AllOne) GetMinKey() string {\n    return ""\n}\n'
    },
    examples: [[[['inc', 'inc', 'inc', 'getMaxKey', 'getMinKey'], [['a'], ['b'], ['b'], [], []]], [null, null, null, 'b', 'a']], [[['getMaxKey', 'getMinKey'], [[], []]], ['', '']], [[['inc', 'dec', 'getMaxKey'], [['z'], ['z'], []]], [null, null, '']]],
    hidden: [[[['inc', 'inc', 'inc', 'inc', 'dec', 'getMaxKey', 'getMinKey'], [['x'], ['y'], ['x'], ['x'], ['y'], [], []]], [null, null, null, null, null, 'x', 'x']], [[['inc', 'inc', 'getMaxKey', 'getMinKey'], [['p'], ['q'], [], []]], [null, null, 'p', 'p']], [[['inc', 'inc', 'inc', 'dec', 'dec', 'getMinKey', 'getMaxKey'], [['m'], ['m'], ['n'], ['m'], ['n'], [], []]], [null, null, null, null, null, 'm', 'm']], [[['inc', 'inc', 'inc', 'inc', 'inc', 'inc', 'getMaxKey', 'getMinKey', 'dec', 'dec', 'getMaxKey'], [['a'], ['b'], ['b'], ['c'], ['c'], ['c'], [], [], ['c'], ['c'], []]], [null, null, null, null, null, null, 'c', 'a', null, null, 'b']], [[['inc', 'dec', 'inc', 'inc', 'getMinKey'], [['k'], ['k'], ['j'], ['j'], []]], [null, null, null, null, 'j']]],
    check: function (args, got) {
      const [ops, vals] = args, c = new Map();
      if (!Array.isArray(got) || got.length !== ops.length) return false;
      for (let i = 0; i < ops.length; i++) {
        const k = vals[i][0];
        if (ops[i] === 'inc') { c.set(k, (c.get(k) || 0) + 1); if (got[i] !== null) return false; }
        else if (ops[i] === 'dec') { const n = c.get(k) - 1; if (n) c.set(k, n); else c.delete(k); if (got[i] !== null) return false; }
        else {
          if (!c.size) { if (got[i] !== '') return false; continue; }
          const counts = [...c.values()], want = ops[i] === 'getMaxKey' ? Math.max(...counts) : Math.min(...counts);
          if (c.get(got[i]) !== want) return false;
        }
      }
      return true;
    },
    ref: class {
      constructor() { this.c = new Map(); }
      inc(k) { this.c.set(k, (this.c.get(k) || 0) + 1); }
      dec(k) { const n = this.c.get(k) - 1; if (n) this.c.set(k, n); else this.c.delete(k); }
      getMaxKey() { let best = ''; for (const [k, n] of this.c) if (best === '' || n > this.c.get(best)) best = k; return best; }
      getMinKey() { let best = ''; for (const [k, n] of this.c) if (best === '' || n < this.c.get(best)) best = k; return best; }
    }
  },
  'maximum-frequency-stack': {
    fn: 'FreqStack', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['Maximum Frequency Stack', 'Hard', 'Design'],
    ask: 'Build a stack where pop() removes and returns the value that appears most often in the stack; on a tie, the one pushed most recently. push(val) adds a value. pop is only called on a non-empty stack.',
    sig: {
      py: 'class FreqStack:',
      js: 'class FreqStack {',
      java: 'class FreqStack {',
      cpp: 'class FreqStack {',
      go: 'type FreqStack struct {'
    },
    starter: {
      py: 'class FreqStack:\n    def __init__(self):\n        pass\n\n    def push(self, val: int) -> None:\n        pass\n\n    def pop(self) -> int:\n        pass\n',
      js: 'class FreqStack {\n  constructor() {\n  }\n  push(val) {\n  }\n  pop() {\n  }\n}\n',
      java: 'class FreqStack {\n    public FreqStack() {\n    }\n    public void push(int val) {\n    }\n    public int pop() {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass FreqStack {\npublic:\n    FreqStack() {\n    }\n    void push(int val) {\n    }\n    int pop() {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype FreqStack struct {\n}\n\nfunc Constructor() FreqStack {\n    return FreqStack{}\n}\n\nfunc (this *FreqStack) Push(val int) {\n}\n\nfunc (this *FreqStack) Pop() int {\n    return 0\n}\n'
    },
    examples: [[[['push', 'push', 'push', 'pop', 'pop'], [[1], [2], [1], [], []]], [null, null, null, 1, 2]], [[['push', 'pop'], [[9], []]], [null, 9]], [[['push', 'push', 'push', 'pop', 'pop', 'pop'], [[3], [4], [5], [], [], []]], [null, null, null, 5, 4, 3]]],
    hidden: [[[['push', 'push', 'push', 'push', 'push', 'push', 'pop', 'pop', 'pop', 'pop'], [[5], [7], [5], [7], [4], [5], [], [], [], []]], [null, null, null, null, null, null, 5, 7, 5, 4]], [[['push', 'push', 'pop', 'push', 'pop', 'pop'], [[1], [1], [], [2], [], []]], [null, null, 1, null, 2, 1]], [[['push', 'push', 'push', 'push', 'pop', 'pop', 'pop', 'pop'], [[8], [8], [8], [8], [], [], [], []]], [null, null, null, null, 8, 8, 8, 8]], [[['push', 'push', 'push', 'pop', 'push', 'pop', 'pop'], [[2], [3], [2], [], [3], [], []]], [null, null, null, 2, null, 3, 3]], [[['push', 'push', 'push', 'push', 'pop', 'pop'], [[-1], [0], [-1], [0], [], []]], [null, null, null, null, 0, -1]]],
    ref: class {
      constructor() { this.c = new Map(); this.g = []; }
      push(v) { const f = (this.c.get(v) || 0) + 1; this.c.set(v, f); if (!this.g[f]) this.g[f] = []; this.g[f].push(v); }
      pop() { const top = this.g[this.g.length - 1], v = top.pop(); if (!top.length) this.g.pop(); this.c.set(v, this.c.get(v) - 1); return v; }
    }
  },
  'longest-palindrome-build': {
    fn: 'longestPalindrome', params: ['s'], cmp: 'exact', meta: ['Longest Palindrome', 'Easy', 'Greedy'],
    ask: 'You may rearrange the letters of s however you like, using each letter at most once. Return the length of the longest palindrome you can build. Upper and lower case count as different letters.',
    sig: {
      py: 'def longestPalindrome(s: str) -> int:',
      js: 'function longestPalindrome(s) {',
      java: 'public int longestPalindrome(String s) {',
      cpp: 'int longestPalindrome(string s) {',
      go: 'func longestPalindrome(s string) int {'
    },
    examples: [[['aab'], 3], [['xy'], 1], [['ccccdd'], 6]],
    hidden: [[['a'], 1], [['Aa'], 1], [['abccccdd'], 7], [['zzzzzzz'], 7], [['abcABCabc'], 7], [['bananas'], 5]],
    ref: function (s) {
      const c = new Map();
      for (const ch of s) c.set(ch, (c.get(ch) || 0) + 1);
      let len = 0, odd = false;
      for (const n of c.values()) { len += n - (n % 2); if (n % 2) odd = true; }
      return len + (odd ? 1 : 0);
    }
  },
  'defanging-an-ip-address': {
    fn: 'defangIPaddr', params: ['address'], cmp: 'exact', meta: ['Defanging an IP Address', 'Easy', 'String Algorithms'],
    ask: 'Return the address with every "." replaced by "[.]".',
    sig: {
      py: 'def defangIPaddr(address: str) -> str:',
      js: 'function defangIPaddr(address) {',
      java: 'public String defangIPaddr(String address) {',
      cpp: 'string defangIPaddr(string address) {',
      go: 'func defangIPaddr(address string) string {'
    },
    examples: [[['1.2.3.4'], '1[.]2[.]3[.]4'], [['10.0.0.255'], '10[.]0[.]0[.]255'], [['255.255.255.0'], '255[.]255[.]255[.]0']],
    hidden: [[['0.0.0.0'], '0[.]0[.]0[.]0'], [['192.168.1.1'], '192[.]168[.]1[.]1'], [['127.0.0.1'], '127[.]0[.]0[.]1'], [['8.8.4.4'], '8[.]8[.]4[.]4'], [['100.200.10.20'], '100[.]200[.]10[.]20']],
    ref: function (address) { return address.split('.').join('[.]'); }
  },
  'string-matching-in-an-array': {
    fn: 'stringMatching', params: ['words'], cmp: 'unordered', meta: ['String Matching in an Array', 'Easy', 'String Algorithms'],
    ask: 'All words are different. Return every word that appears inside some other word of the list, in any order.',
    sig: {
      py: 'def stringMatching(words: List[str]) -> List[str]:',
      js: 'function stringMatching(words) {',
      java: 'public String[] stringMatching(String[] words) {',
      cpp: 'vector<string> stringMatching(vector<string>& words) {',
      go: 'func stringMatching(words []string) []string {'
    },
    examples: [[[['cat', 'concat', 'at']], ['cat', 'at']], [[['a', 'b']], []], [[['ab', 'abc', 'abcd']], ['ab', 'abc']]],
    hidden: [[[['blue', 'green', 'bu']], []], [[['x', 'xx', 'xxx', 'y']], ['x', 'xx']], [[['hero', 'superhero', 'super', 'er']], ['hero', 'super', 'er']], [[['one']], []], [[['ana', 'banana', 'nan', 'ban']], ['ana', 'nan', 'ban']]],
    ref: function (words) { return words.filter((w, i) => words.some((v, j) => i !== j && v.includes(w))); }
  },
  'string-compression': {
    fn: 'compress', params: ['chars'], cmp: 'exact', io: { keepFirst: 0 }, meta: ['String Compression', 'Medium', 'String Algorithms'],
    ask: 'Compress chars in place: each run of the same character becomes the character, followed by the run length when it is more than 1 (a length of 10 or more takes several slots, one digit each). Return the new length k; the tests read k and the first k slots.',
    sig: {
      py: 'def compress(chars: List[str]) -> int:',
      js: 'function compress(chars) {',
      java: 'public int compress(char[] chars) {',
      cpp: 'int compress(vector<char>& chars) {',
      go: 'func compress(chars []byte) int {'
    },
    examples: [[[['a', 'a', 'b']], [3, ['a', '2', 'b']]], [[['x']], [1, ['x']]], [[['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z']], [3, ['z', '1', '2']]]],
    hidden: [[[['a', 'b', 'c']], [3, ['a', 'b', 'c']]], [[['a', 'a', 'a', 'b', 'b', 'a', 'a']], [6, ['a', '3', 'b', '2', 'a', '2']]], [[['q', 'q']], [2, ['q', '2']]], [[['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r']], [4, ['p', '1', '0', 'r']]], [[['1', '1', '1', '2']], [3, ['1', '3', '2']]]],
    ref: function (chars) {
      let w = 0, i = 0;
      while (i < chars.length) {
        let j = i;
        while (j < chars.length && chars[j] === chars[i]) j++;
        chars[w++] = chars[i];
        if (j - i > 1) for (const d of String(j - i)) chars[w++] = d;
        i = j;
      }
      return w;
    }
  },
  'longest-happy-prefix': {
    fn: 'longestPrefix', params: ['s'], cmp: 'exact', meta: ['Longest Happy Prefix', 'Hard', 'String Algorithms'],
    ask: 'Return the longest string that is both a prefix and a suffix of s but is not s itself (it may be empty).',
    sig: {
      py: 'def longestPrefix(s: str) -> str:',
      js: 'function longestPrefix(s) {',
      java: 'public String longestPrefix(String s) {',
      cpp: 'string longestPrefix(string s) {',
      go: 'func longestPrefix(s string) string {'
    },
    examples: [[['abab'], 'ab'], [['abc'], ''], [['aaaa'], 'aaa']],
    hidden: [[['a'], ''], [['abcab'], 'ab'], [['ababab'], 'abab'], [['xyzxyzxy'], 'xyzxy'], [['aabaaab'], 'aab']],
    ref: function (s) {
      const pi = new Array(s.length).fill(0);
      for (let i = 1; i < s.length; i++) { let k = pi[i - 1]; while (k && s[i] !== s[k]) k = pi[k - 1]; if (s[i] === s[k]) k++; pi[i] = k; }
      return s.slice(0, pi[s.length - 1] || 0);
    }
  },
  'shortest-palindrome': {
    fn: 'shortestPalindrome', params: ['s'], cmp: 'exact', meta: ['Shortest Palindrome', 'Hard', 'String Algorithms'],
    ask: 'Add as few letters as possible to the front of s to make a palindrome. Return it.',
    sig: {
      py: 'def shortestPalindrome(s: str) -> str:',
      js: 'function shortestPalindrome(s) {',
      java: 'public String shortestPalindrome(String s) {',
      cpp: 'string shortestPalindrome(string s) {',
      go: 'func shortestPalindrome(s string) string {'
    },
    examples: [[['ab'], 'bab'], [[''], ''], [['aab'], 'baab']],
    hidden: [[['a'], 'a'], [['abcd'], 'dcbabcd'], [['aacecaaa'], 'aaacecaaa'], [['racecar'], 'racecar'], [['abab'], 'babab']],
    ref: function (s) {
      const t = s + '#' + s.split('').reverse().join(''), pi = new Array(t.length).fill(0);
      for (let i = 1; i < t.length; i++) { let k = pi[i - 1]; while (k && t[i] !== t[k]) k = pi[k - 1]; if (t[i] === t[k]) k++; pi[i] = k; }
      return s.slice(pi[t.length - 1]).split('').reverse().join('') + s;
    }
  },
  'longest-duplicate-substring': {
    fn: 'longestDupSubstring', params: ['s'], cmp: 'any', meta: ['Longest Duplicate Substring', 'Hard', 'String Algorithms'],
    ask: 'Return a longest substring of s that appears at least twice (the copies may overlap), or "" if none does. When several tie, any of them is accepted.',
    sig: {
      py: 'def longestDupSubstring(s: str) -> str:',
      js: 'function longestDupSubstring(s) {',
      java: 'public String longestDupSubstring(String s) {',
      cpp: 'string longestDupSubstring(string s) {',
      go: 'func longestDupSubstring(s string) string {'
    },
    examples: [[['abcabc'], 'abc'], [['xyz'], ''], [['aaaa'], 'aaa']],
    hidden: [[['mississippi'], 'issi'], [['abcdabcxabcd'], 'abcd'], [['zz'], 'z'], [['qwertyqwertz'], 'qwert'], [['abababab'], 'ababab']],
    check: function (args, got, want) {
      if (typeof got !== 'string' || got.length !== want.length) return false;
      const s = args[0];
      return got === '' || (s.indexOf(got) >= 0 && s.indexOf(got, s.indexOf(got) + 1) >= 0);
    },
    ref: function (s) {
      const dup = (len) => { const seen = new Set(); for (let i = 0; i + len <= s.length; i++) { const t = s.slice(i, i + len); if (seen.has(t)) return t; seen.add(t); } return null; };
      let lo = 1, hi = s.length - 1, best = '';
      while (lo <= hi) { const m = (lo + hi) >> 1, d = dup(m); if (d !== null) { best = d; lo = m + 1; } else hi = m - 1; }
      return best;
    }
  },
  'text-justification': {
    fn: 'fullJustify', params: ['words', 'maxWidth'], cmp: 'exact', meta: ['Text Justification', 'Hard', 'String Algorithms'],
    ask: 'Lay the words out in lines exactly maxWidth wide, fitting as many words on each line as possible with at least one space between words. Spread the spaces of a line evenly between its words, giving the extra ones to the leftmost gaps. A line with one word, and the last line, are left aligned: single spaces between words and padding at the end.',
    sig: {
      py: 'def fullJustify(words: List[str], maxWidth: int) -> List[str]:',
      js: 'function fullJustify(words, maxWidth) {',
      java: 'public String[] fullJustify(String[] words, int maxWidth) {',
      cpp: 'vector<string> fullJustify(vector<string>& words, int maxWidth) {',
      go: 'func fullJustify(words []string, maxWidth int) []string {'
    },
    examples: [[[['the', 'big', 'cat'], 7], ['the big', 'cat    ']], [[['hi'], 4], ['hi  ']], [[['a', 'b', 'c', 'd'], 5], ['a b c', 'd    ']]],
    hidden: [[[['owls', 'fly', 'at', 'night', 'over', 'the', 'quiet', 'barn.'], 14], ['owls   fly  at', 'night over the', 'quiet barn.   ']], [[['one', 'two', 'three', 'four'], 9], ['one   two', 'three    ', 'four     ']], [[['supercalifragilistic'], 20], ['supercalifragilistic']], [[['a', 'bb', 'ccc', 'dddd', 'e'], 6], ['a   bb', 'ccc   ', 'dddd e']], [[['go', 'to', 'it', 'now', 'or', 'later', 'today'], 10], ['go  to  it', 'now     or', 'later     ', 'today     ']]],
    ref: function (words, maxWidth) {
      const out = [];
      let i = 0;
      while (i < words.length) {
        let j = i, len = 0;
        while (j < words.length && len + words[j].length + (j - i) <= maxWidth) len += words[j++].length;
        const gaps = j - i - 1;
        if (j === words.length || gaps === 0) { const line = words.slice(i, j).join(' '); out.push(line + ' '.repeat(maxWidth - line.length)); }
        else {
          const spaces = maxWidth - len, each = Math.floor(spaces / gaps), extra = spaces % gaps;
          let line = '';
          for (let k = i; k < j; k++) { line += words[k]; if (k < j - 1) line += ' '.repeat(each + (k - i < extra ? 1 : 0)); }
          out.push(line);
        }
        i = j;
      }
      return out;
    }
  },
  'pascals-triangle-ii': {
    fn: 'getRow', params: ['rowIndex'], cmp: 'exact', meta: ['Pascal\'s Triangle II', 'Easy', 'DP on Grids & Strings'],
    ask: 'In the number triangle that starts with [1] and builds each row from the sums of neighbouring pairs of the row above (with a 1 at each end), return row rowIndex, counting the top row as 0. Try to use only O(rowIndex) extra memory.',
    sig: {
      py: 'def getRow(rowIndex: int) -> List[int]:',
      js: 'function getRow(rowIndex) {',
      java: 'public int[] getRow(int rowIndex) {',
      cpp: 'vector<int> getRow(int rowIndex) {',
      go: 'func getRow(rowIndex int) []int {'
    },
    examples: [[[0], [1]], [[3], [1, 3, 3, 1]], [[5], [1, 5, 10, 10, 5, 1]]],
    hidden: [[[1], [1, 1]], [[2], [1, 2, 1]], [[8], [1, 8, 28, 56, 70, 56, 28, 8, 1]], [[13], [1, 13, 78, 286, 715, 1287, 1716, 1716, 1287, 715, 286, 78, 13, 1]], [[20], [1, 20, 190, 1140, 4845, 15504, 38760, 77520, 125970, 167960, 184756, 167960, 125970, 77520, 38760, 15504, 4845, 1140, 190, 20, 1]]],
    ref: function (rowIndex) {
      const row = [1];
      for (let i = 1; i <= rowIndex; i++) { for (let j = i - 1; j > 0; j--) row[j] += row[j - 1]; row.push(1); }
      return row;
    }
  },
  'minimum-insertion-steps-to-make-a-string-palindrome': {
    fn: 'minInsertions', params: ['s'], cmp: 'exact', meta: ['Minimum Insertion Steps to Make a String Palindrome', 'Hard', 'DP on Grids & Strings'],
    ask: 'One step inserts any letter anywhere in s. Return the fewest steps that make s a palindrome.',
    sig: {
      py: 'def minInsertions(s: str) -> int:',
      js: 'function minInsertions(s) {',
      java: 'public int minInsertions(String s) {',
      cpp: 'int minInsertions(string s) {',
      go: 'func minInsertions(s string) int {'
    },
    examples: [[['ab'], 1], [['aba'], 0], [['abcd'], 3]],
    hidden: [[['a'], 0], [['zzazz'], 0], [['mbadm'], 2], [['abcba'], 0], [['abcdeedcbx'], 2], [['qwerty'], 5]],
    ref: function (s) {
      const n = s.length, dp = Array.from({ length: n }, () => new Array(n).fill(0));
      for (let len = 2; len <= n; len++) for (let i = 0; i + len - 1 < n; i++) {
        const j = i + len - 1;
        dp[i][j] = s[i] === s[j] ? (len === 2 ? 0 : dp[i + 1][j - 1]) : 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
      }
      return n ? dp[0][n - 1] : 0;
    }
  },
  'wildcard-matching': {
    fn: 'isMatch', params: ['s', 'p'], cmp: 'exact', meta: ['Wildcard Matching', 'Hard', 'DP on Grids & Strings'],
    ask: 'The pattern p has letters, "?" which matches any one letter, and "*" which matches any run of letters, even an empty one. Return true if p matches the whole of s.',
    sig: {
      py: 'def isMatch(s: str, p: str) -> bool:',
      js: 'function isMatch(s, p) {',
      java: 'public boolean isMatch(String s, String p) {',
      cpp: 'bool isMatch(string s, string p) {',
      go: 'func isMatch(s string, p string) bool {'
    },
    examples: [[['abc', 'a?c'], true], [['abc', '*'], true], [['ab', '*c'], false]],
    hidden: [[['', ''], true], [['', '***'], true], [['aa', 'a'], false], [['adceb', '*a*b'], true], [['acdcb', 'a*c?b'], false], [['mississippi', 'm??*ss*?i*pi'], false]],
    ref: function (s, p) {
      const dp = Array.from({ length: s.length + 1 }, () => new Array(p.length + 1).fill(false));
      dp[0][0] = true;
      for (let j = 1; j <= p.length; j++) dp[0][j] = dp[0][j - 1] && p[j - 1] === '*';
      for (let i = 1; i <= s.length; i++) for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
        else dp[i][j] = dp[i - 1][j - 1] && (p[j - 1] === '?' || p[j - 1] === s[i - 1]);
      }
      return dp[s.length][p.length];
    }
  },
  'dungeon-game': {
    fn: 'calculateMinimumHP', params: ['dungeon'], cmp: 'exact', meta: ['Dungeon Game', 'Hard', 'DP on Grids & Strings'],
    ask: 'A knight starts at the top-left room and must reach the bottom-right room, moving only right or down. Each room\'s number is added to his health (negative numbers hurt). If his health ever drops to 0 or below, he fails. Return the smallest starting health that lets him get through.',
    sig: {
      py: 'def calculateMinimumHP(dungeon: List[List[int]]) -> int:',
      js: 'function calculateMinimumHP(dungeon) {',
      java: 'public int calculateMinimumHP(int[][] dungeon) {',
      cpp: 'int calculateMinimumHP(vector<vector<int>>& dungeon) {',
      go: 'func calculateMinimumHP(dungeon [][]int) int {'
    },
    examples: [[[[[0]]], 1], [[[[-5]]], 6], [[[[2, -3], [-1, 4]]], 1]],
    hidden: [[[[[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]], 7], [[[[1, -3, 3], [0, -2, 0], [-3, -3, -3]]], 3], [[[[100]]], 1], [[[[0, 0, 0], [-1, 0, 0], [2, 0, -2]]], 2], [[[[-1, -1, -1, -1]]], 5]],
    ref: function (d) {
      const m = d.length, n = d[0].length, need = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(Infinity));
      need[m][n - 1] = need[m - 1][n] = 1;
      for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) need[i][j] = Math.max(1, Math.min(need[i + 1][j], need[i][j + 1]) - d[i][j]);
      return need[0][0];
    }
  },
  'ones-and-zeroes': {
    fn: 'findMaxForm', params: ['strs', 'm', 'n'], cmp: 'exact', meta: ['Ones and Zeroes', 'Medium', 'Knapsack & LIS'],
    ask: 'Each string holds only 0s and 1s. Pick as many strings as you can so the picked ones hold at most m zeros and at most n ones in total. Return how many you can pick.',
    sig: {
      py: 'def findMaxForm(strs: List[str], m: int, n: int) -> int:',
      js: 'function findMaxForm(strs, m, n) {',
      java: 'public int findMaxForm(String[] strs, int m, int n) {',
      cpp: 'int findMaxForm(vector<string>& strs, int m, int n) {',
      go: 'func findMaxForm(strs []string, m int, n int) int {'
    },
    examples: [[[['10', '0', '1'], 1, 1], 2], [[['00'], 1, 5], 0], [[['1', '1', '1'], 0, 2], 2]],
    hidden: [[[['10', '0001', '111001', '1', '0'], 5, 3], 4], [[['10', '0', '1'], 2, 2], 3], [[['0', '0', '0', '1'], 2, 0], 2], [[['111', '1000', '1000', '1000'], 9, 3], 3], [[['01', '10', '0110', '1'], 3, 3], 3]],
    ref: function (strs, m, n) {
      const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (const s of strs) {
        const z = s.split('').filter((c) => c === '0').length, o = s.length - z;
        for (let i = m; i >= z; i--) for (let j = n; j >= o; j--) dp[i][j] = Math.max(dp[i][j], dp[i - z][j - o] + 1);
      }
      return dp[m][n];
    }
  },
  'largest-divisible-subset': {
    fn: 'largestDivisibleSubset', params: ['nums'], cmp: 'any', meta: ['Largest Divisible Subset', 'Medium', 'Knapsack & LIS'],
    ask: 'nums holds different positive numbers. Return a largest group of them in which, for every pair, the larger is a multiple of the smaller. Any order, and any largest group, is accepted.',
    sig: {
      py: 'def largestDivisibleSubset(nums: List[int]) -> List[int]:',
      js: 'function largestDivisibleSubset(nums) {',
      java: 'public int[] largestDivisibleSubset(int[] nums) {',
      cpp: 'vector<int> largestDivisibleSubset(vector<int>& nums) {',
      go: 'func largestDivisibleSubset(nums []int) []int {'
    },
    examples: [[[[1, 2, 3]], [1, 2]], [[[4]], [4]], [[[1, 2, 4, 8]], [1, 2, 4, 8]]],
    hidden: [[[[3, 4, 16, 8]], [4, 8, 16]], [[[5, 9, 18, 54, 108, 540, 90, 180, 360, 720]], [9, 18, 90, 180, 360, 720]], [[[2, 3, 5, 7]], [2]], [[[1, 3, 9, 2, 4, 6]], [1, 2, 4]], [[[10, 20, 40, 7, 14, 28, 56]], [7, 14, 28, 56]]],
    check: function (args, got, want) {
      if (!Array.isArray(got) || got.length !== want.length || new Set(got).size !== got.length) return false;
      if (!got.every((x) => args[0].includes(x))) return false;
      const a = got.slice().sort((x, y) => x - y);
      for (let i = 1; i < a.length; i++) if (a[i] % a[i - 1]) return false;
      return true;
    },
    ref: function (nums) {
      const a = nums.slice().sort((x, y) => x - y), len = a.map(() => 1), prev = a.map(() => -1);
      let best = 0;
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < i; j++) if (a[i] % a[j] === 0 && len[j] + 1 > len[i]) { len[i] = len[j] + 1; prev[i] = j; }
        if (len[i] > len[best]) best = i;
      }
      const out = [];
      for (let i = best; i >= 0; i = prev[i]) out.push(a[i]);
      return out.reverse();
    }
  },
  'profitable-schemes': {
    fn: 'profitableSchemes', params: ['n', 'minProfit', 'group', 'profit'], cmp: 'exact', meta: ['Profitable Schemes', 'Hard', 'Knapsack & LIS'],
    ask: 'A club has n members. Job i needs group[i] members and earns profit[i]; a member can work on one job at most. A scheme is any set of jobs needing at most n members in total and earning at least minProfit. Count the schemes, modulo 1000000007.',
    sig: {
      py: 'def profitableSchemes(n: int, minProfit: int, group: List[int], profit: List[int]) -> int:',
      js: 'function profitableSchemes(n, minProfit, group, profit) {',
      java: 'public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {',
      cpp: 'int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {',
      go: 'func profitableSchemes(n int, minProfit int, group []int, profit []int) int {'
    },
    examples: [[[2, 1, [1, 1], [1, 0]], 2], [[1, 0, [2], [5]], 1], [[3, 3, [1, 2], [2, 1]], 1]],
    hidden: [[[5, 3, [2, 2], [2, 3]], 2], [[10, 5, [2, 3, 5], [6, 7, 8]], 7], [[1, 1, [1, 1, 1], [1, 1, 1]], 3], [[64, 0, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 511620083], [[4, 2, [2, 2, 2], [1, 1, 1]], 3]],
    ref: function (n, minProfit, group, profit) {
      const MOD = 1000000007, dp = Array.from({ length: n + 1 }, () => new Array(minProfit + 1).fill(0));
      dp[0][0] = 1;
      group.forEach((g, k) => {
        for (let i = n; i >= g; i--) for (let p = minProfit; p >= 0; p--) {
          const q = Math.min(minProfit, p + profit[k]);
          dp[i][q] = (dp[i][q] + dp[i - g][p]) % MOD;
        }
      });
      let total = 0;
      for (let i = 0; i <= n; i++) total = (total + dp[i][minProfit]) % MOD;
      return total;
    }
  },
  'minimum-score-triangulation-of-polygon': {
    fn: 'minScoreTriangulation', params: ['values'], cmp: 'exact', meta: ['Minimum Score Triangulation of Polygon', 'Medium', 'Interval & Bitmask DP'],
    ask: 'A convex polygon has a value at each corner, listed in order around it. Cut it into triangles using its corners; each triangle scores the product of its three corner values. Return the lowest total score.',
    sig: {
      py: 'def minScoreTriangulation(values: List[int]) -> int:',
      js: 'function minScoreTriangulation(values) {',
      java: 'public int minScoreTriangulation(int[] values) {',
      cpp: 'int minScoreTriangulation(vector<int>& values) {',
      go: 'func minScoreTriangulation(values []int) int {'
    },
    examples: [[[[1, 2, 3]], 6], [[[2, 2, 2, 2]], 16], [[[1, 4, 2, 3]], 14]],
    hidden: [[[[3, 7, 4, 5]], 144], [[[1, 1, 1, 1, 1]], 3], [[[5, 1, 5, 1, 5]], 35], [[[2, 9, 3, 8, 4, 7]], 222], [[[10, 1, 10, 1]], 20]],
    ref: function (v) {
      const n = v.length, dp = Array.from({ length: n }, () => new Array(n).fill(0));
      for (let len = 2; len < n; len++) for (let i = 0; i + len < n; i++) {
        const j = i + len;
        dp[i][j] = Infinity;
        for (let k = i + 1; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + v[i] * v[k] * v[j]);
      }
      return dp[0][n - 1];
    }
  },
  'beautiful-arrangement': {
    fn: 'countArrangement', params: ['n'], cmp: 'exact', meta: ['Beautiful Arrangement', 'Medium', 'Interval & Bitmask DP'],
    ask: 'Arrange the numbers 1 to n in positions 1 to n. An arrangement is good when at every position i, the number there divides i or i divides it. Count the good arrangements.',
    sig: {
      py: 'def countArrangement(n: int) -> int:',
      js: 'function countArrangement(n) {',
      java: 'public int countArrangement(int n) {',
      cpp: 'int countArrangement(int n) {',
      go: 'func countArrangement(n int) int {'
    },
    examples: [[[1], 1], [[2], 2], [[3], 3]],
    hidden: [[[4], 8], [[5], 10], [[6], 36], [[8], 132], [[11], 750]],
    ref: function (n) {
      const used = new Array(n + 1).fill(false);
      const go = (i) => {
        if (i > n) return 1;
        let c = 0;
        for (let v = 1; v <= n; v++) if (!used[v] && (v % i === 0 || i % v === 0)) { used[v] = true; c += go(i + 1); used[v] = false; }
        return c;
      };
      return go(1);
    }
  },
  'minimum-number-of-work-sessions-to-finish-the-tasks': {
    fn: 'minSessions', params: ['tasks', 'sessionTime'], cmp: 'exact', meta: ['Minimum Number of Work Sessions to Finish the Tasks', 'Medium', 'Interval & Bitmask DP'],
    ask: 'Task i takes tasks[i] hours. A work session lasts at most sessionTime hours, and a task, once started, is finished in the same session. No task is longer than a session. Return the fewest sessions that finish every task.',
    sig: {
      py: 'def minSessions(tasks: List[int], sessionTime: int) -> int:',
      js: 'function minSessions(tasks, sessionTime) {',
      java: 'public int minSessions(int[] tasks, int sessionTime) {',
      cpp: 'int minSessions(vector<int>& tasks, int sessionTime) {',
      go: 'func minSessions(tasks []int, sessionTime int) int {'
    },
    examples: [[[[1, 2, 3], 3], 2], [[[5], 5], 1], [[[2, 2, 2, 2], 4], 2]],
    hidden: [[[[3, 1, 3, 1, 1], 8], 2], [[[1, 2, 3, 4, 5], 15], 1], [[[9, 8, 7, 6, 5, 4, 3, 2, 1], 10], 5], [[[2, 3, 3, 4, 4, 4, 5, 6, 7, 10], 12], 4], [[[1, 1, 1, 1, 1, 1], 1], 6]],
    ref: function (tasks, sessionTime) {
      const n = tasks.length, full = 1 << n, sum = new Array(full).fill(0);
      for (let m = 1; m < full; m++) { const b = m & -m; sum[m] = sum[m ^ b] + tasks[31 - Math.clz32(b)]; }
      const dp = new Array(full).fill(Infinity);
      dp[0] = 0;
      for (let m = 1; m < full; m++) for (let s = m; s; s = (s - 1) & m) if (sum[s] <= sessionTime && dp[m ^ s] + 1 < dp[m]) dp[m] = dp[m ^ s] + 1;
      return dp[full - 1];
    }
  },
  'palindrome-partitioning-ii': {
    fn: 'minCut', params: ['s'], cmp: 'exact', meta: ['Palindrome Partitioning II', 'Hard', 'Interval & Bitmask DP'],
    ask: 'Cut s into pieces that are each palindromes. Return the fewest cuts needed.',
    sig: {
      py: 'def minCut(s: str) -> int:',
      js: 'function minCut(s) {',
      java: 'public int minCut(String s) {',
      cpp: 'int minCut(string s) {',
      go: 'func minCut(s string) int {'
    },
    examples: [[['ab'], 1], [['a'], 0], [['aabcc'], 2]],
    hidden: [[['racecar'], 0], [['abcde'], 4], [['aab'], 1], [['ababbbabbababa'], 3], [['noonabbad'], 2]],
    ref: function (s) {
      const n = s.length, pal = Array.from({ length: n }, () => new Array(n).fill(false)), cut = new Array(n).fill(0);
      for (let j = 0; j < n; j++) {
        cut[j] = j;
        for (let i = 0; i <= j; i++) if (s[i] === s[j] && (j - i < 2 || pal[i + 1][j - 1])) { pal[i][j] = true; cut[j] = i === 0 ? 0 : Math.min(cut[j], cut[i - 1] + 1); }
      }
      return cut[n - 1];
    }
  },
  'minimum-cost-to-cut-a-stick': {
    fn: 'minCost', params: ['n', 'cuts'], cmp: 'exact', meta: ['Minimum Cost to Cut a Stick', 'Hard', 'Interval & Bitmask DP'],
    ask: 'A stick runs from 0 to n. You must cut it at every position in cuts, in an order you choose. Each cut costs the length of the piece being cut. Return the lowest total cost.',
    sig: {
      py: 'def minCost(n: int, cuts: List[int]) -> int:',
      js: 'function minCost(n, cuts) {',
      java: 'public int minCost(int n, int[] cuts) {',
      cpp: 'int minCost(int n, vector<int>& cuts) {',
      go: 'func minCost(n int, cuts []int) int {'
    },
    examples: [[[4, [2]], 4], [[5, [1, 4]], 9], [[6, [3, 1]], 9]],
    hidden: [[[7, [1, 3, 4, 5]], 16], [[9, [5, 6, 1, 4, 2]], 22], [[10, [5]], 10], [[30, [1, 2, 3, 4, 5, 25]], 67], [[100, [10, 20, 30, 40, 50, 60, 70, 80, 90]], 340]],
    ref: function (n, cuts) {
      const c = [0, ...cuts.slice().sort((a, b) => a - b), n], m = c.length, dp = Array.from({ length: m }, () => new Array(m).fill(0));
      for (let len = 2; len < m; len++) for (let i = 0; i + len < m; i++) {
        const j = i + len;
        dp[i][j] = Infinity;
        for (let k = i + 1; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + c[j] - c[i]);
      }
      return dp[0][m - 1];
    }
  },
  'strange-printer': {
    fn: 'strangePrinter', params: ['s'], cmp: 'exact', meta: ['Strange Printer', 'Hard', 'Interval & Bitmask DP'],
    ask: 'A printer can only print a run of one repeated letter at a time, over any stretch of positions, covering what was there. Starting from a blank line, return the fewest print runs that produce s.',
    sig: {
      py: 'def strangePrinter(s: str) -> int:',
      js: 'function strangePrinter(s) {',
      java: 'public int strangePrinter(String s) {',
      cpp: 'int strangePrinter(string s) {',
      go: 'func strangePrinter(s string) int {'
    },
    examples: [[['ab'], 2], [['aaa'], 1], [['aba'], 2]],
    hidden: [[['a'], 1], [['aaabbb'], 2], [['abcabc'], 5], [['tbgtgb'], 4], [['abababab'], 5]],
    ref: function (s) {
      const n = s.length, dp = Array.from({ length: n }, () => new Array(n).fill(0));
      for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {
          dp[i][j] = dp[i][j - 1] + 1;
          for (let k = i; k < j; k++) if (s[k] === s[j]) dp[i][j] = Math.min(dp[i][j], dp[i][k] + (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0));
        }
      }
      return dp[0][n - 1];
    }
  },
  'shortest-path-visiting-all-nodes': {
    fn: 'shortestPathLength', params: ['graph'], cmp: 'exact', meta: ['Shortest Path Visiting All Nodes', 'Hard', 'Interval & Bitmask DP'],
    ask: 'graph[i] lists the neighbours of node i in a connected undirected graph. Return the length of the shortest walk that visits every node. You may start and end anywhere and reuse nodes and edges.',
    sig: {
      py: 'def shortestPathLength(graph: List[List[int]]) -> int:',
      js: 'function shortestPathLength(graph) {',
      java: 'public int shortestPathLength(int[][] graph) {',
      cpp: 'int shortestPathLength(vector<vector<int>>& graph) {',
      go: 'func shortestPathLength(graph [][]int) int {'
    },
    examples: [[[[[]]], 0], [[[[1], [0]]], 1], [[[[1, 2], [0], [0]]], 2]],
    hidden: [[[[[1, 2, 3], [0], [0], [0]]], 4], [[[[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]]], 4], [[[[1], [0, 2], [1, 3], [2]]], 3], [[[[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]]], 3], [[[[1], [0, 2, 6], [1, 3], [2], [5], [4, 6], [1, 5, 7], [6]]], 9]],
    ref: function (graph) {
      const n = graph.length, full = (1 << n) - 1, seen = new Set();
      let q = [];
      for (let i = 0; i < n; i++) { q.push([i, 1 << i]); seen.add(i + ',' + (1 << i)); }
      for (let d = 0; q.length; d++) {
        const next = [];
        for (const [u, m] of q) {
          if (m === full) return d;
          for (const v of graph[u]) { const mm = m | (1 << v), k = v + ',' + mm; if (!seen.has(k)) { seen.add(k); next.push([v, mm]); } }
        }
        q = next;
      }
      return -1;
    }
  },
  'binary-number-with-alternating-bits': {
    fn: 'hasAlternatingBits', params: ['n'], cmp: 'exact', meta: ['Binary Number with Alternating Bits', 'Easy', 'Bit Manipulation'],
    ask: 'n is positive. Return true if every pair of neighbouring bits in n\'s binary form is different.',
    sig: {
      py: 'def hasAlternatingBits(n: int) -> bool:',
      js: 'function hasAlternatingBits(n) {',
      java: 'public boolean hasAlternatingBits(int n) {',
      cpp: 'bool hasAlternatingBits(int n) {',
      go: 'func hasAlternatingBits(n int) bool {'
    },
    examples: [[[5], true], [[6], false], [[10], true]],
    hidden: [[[1], true], [[2], true], [[3], false], [[21], true], [[1431655765], true], [[11], false]],
    ref: function (n) { const x = n ^ (n >> 1); return (x & (x + 1)) === 0; }
  },
  'minimum-flips-to-make-a-or-b-equal-to-c': {
    fn: 'minFlips', params: ['a', 'b', 'c'], cmp: 'exact', meta: ['Minimum Flips to Make a OR b Equal to c', 'Medium', 'Bit Manipulation'],
    ask: 'A flip changes one bit of a or b. Return the fewest flips that make (a OR b) equal to c.',
    sig: {
      py: 'def minFlips(a: int, b: int, c: int) -> int:',
      js: 'function minFlips(a, b, c) {',
      java: 'public int minFlips(int a, int b, int c) {',
      cpp: 'int minFlips(int a, int b, int c) {',
      go: 'func minFlips(a int, b int, c int) int {'
    },
    examples: [[[1, 2, 3], 0], [[0, 0, 1], 1], [[4, 2, 7], 1]],
    hidden: [[[2, 6, 5], 3], [[7, 7, 0], 6], [[8, 3, 5], 3], [[0, 0, 0], 0], [[1000000000, 1, 999999999], 9]],
    ref: function (a, b, c) {
      let flips = 0;
      for (let i = 0; i < 31; i++) {
        const x = (a >> i) & 1, y = (b >> i) & 1, z = (c >> i) & 1;
        flips += z ? (x | y ? 0 : 1) : x + y;
      }
      return flips;
    }
  },
  'find-the-original-array-of-prefix-xor': {
    fn: 'findArray', params: ['pref'], cmp: 'exact', meta: ['Find The Original Array of Prefix Xor', 'Medium', 'Bit Manipulation'],
    ask: 'pref[i] is the XOR of arr[0] through arr[i] for some hidden array arr. Return arr.',
    sig: {
      py: 'def findArray(pref: List[int]) -> List[int]:',
      js: 'function findArray(pref) {',
      java: 'public int[] findArray(int[] pref) {',
      cpp: 'vector<int> findArray(vector<int>& pref) {',
      go: 'func findArray(pref []int) []int {'
    },
    examples: [[[[5]], [5]], [[[1, 3]], [1, 2]], [[[0, 0, 7]], [0, 0, 7]]],
    hidden: [[[[13]], [13]], [[[5, 2, 0, 3, 1]], [5, 7, 2, 3, 2]], [[[1, 1, 1, 1]], [1, 0, 0, 0]], [[[1000000, 0, 1000000]], [1000000, 1000000, 1000000]], [[[7, 6, 5, 4, 3, 2, 1]], [7, 1, 3, 1, 7, 1, 3]]],
    ref: function (pref) { return pref.map((x, i) => (i ? x ^ pref[i - 1] : x)); }
  },
  'sum-of-two-integers': {
    fn: 'getSum', params: ['a', 'b'], cmp: 'exact', meta: ['Sum of Two Integers', 'Medium', 'Bit Manipulation'],
    ask: 'Return a + b without using the + or - operators. Both are between -1000 and 1000.',
    sig: {
      py: 'def getSum(a: int, b: int) -> int:',
      js: 'function getSum(a, b) {',
      java: 'public int getSum(int a, int b) {',
      cpp: 'int getSum(int a, int b) {',
      go: 'func getSum(a int, b int) int {'
    },
    examples: [[[2, 3], 5], [[-4, 1], -3], [[0, 0], 0]],
    hidden: [[[-1, 1], 0], [[1000, 1000], 2000], [[-1000, -1000], -2000], [[7, -9], -2], [[123, 456], 579]],
    ref: function (a, b) {
      while (b !== 0) { const carry = (a & b) << 1; a = a ^ b; b = carry; }
      return a;
    }
  },
  'single-number-iii': {
    fn: 'singleNumber', params: ['nums'], cmp: 'unordered', meta: ['Single Number III', 'Medium', 'Bit Manipulation'],
    ask: 'Every value in nums appears exactly twice except two values, which appear once. Return those two, in any order, using O(1) extra memory if you can.',
    sig: {
      py: 'def singleNumber(nums: List[int]) -> List[int]:',
      js: 'function singleNumber(nums) {',
      java: 'public int[] singleNumber(int[] nums) {',
      cpp: 'vector<int> singleNumber(vector<int>& nums) {',
      go: 'func singleNumber(nums []int) []int {'
    },
    examples: [[[[1, 1, 2, 3]], [2, 3]], [[[5, 9]], [5, 9]], [[[-1, 4, 4, 0]], [-1, 0]]],
    hidden: [[[[1, 2, 1, 3, 2, 5]], [3, 5]], [[[0, 1]], [1, 0]], [[[7, 7, 8, 8, 9, 10]], [9, 10]], [[[-5, -5, 2147483647, -2147483648]], [2147483647, -2147483648]], [[[6, 3, 6, 3, 12, 21]], [21, 12]]],
    ref: function (nums) {
      const x = nums.reduce((a, b) => a ^ b, 0), bit = x & -x;
      let a = 0;
      for (const n of nums) if (n & bit) a ^= n;
      return [a, x ^ a];
    }
  },
  'bitwise-and-of-numbers-range': {
    fn: 'rangeBitwiseAnd', params: ['left', 'right'], cmp: 'exact', meta: ['Bitwise AND of Numbers Range', 'Medium', 'Bit Manipulation'],
    ask: 'Return the bitwise AND of every whole number from left to right, both included.',
    sig: {
      py: 'def rangeBitwiseAnd(left: int, right: int) -> int:',
      js: 'function rangeBitwiseAnd(left, right) {',
      java: 'public int rangeBitwiseAnd(int left, int right) {',
      cpp: 'int rangeBitwiseAnd(int left, int right) {',
      go: 'func rangeBitwiseAnd(left int, right int) int {'
    },
    examples: [[[4, 7], 4], [[0, 0], 0], [[6, 9], 0]],
    hidden: [[[5, 5], 5], [[1, 2147483647], 0], [[12, 15], 12], [[1024, 2047], 1024], [[600000000, 2147483645], 0]],
    ref: function (left, right) {
      let shift = 0;
      while (left !== right) { left >>>= 1; right >>>= 1; shift++; }
      return left * Math.pow(2, shift);
    }
  },
  'gray-code': {
    fn: 'grayCode', params: ['n'], cmp: 'any', meta: ['Gray Code', 'Medium', 'Bit Manipulation'],
    ask: 'Return an ordering of every number from 0 to 2^n - 1 that starts at 0 and where each number differs from the next in exactly one bit, the last and the first included. Any such ordering is accepted.',
    sig: {
      py: 'def grayCode(n: int) -> List[int]:',
      js: 'function grayCode(n) {',
      java: 'public int[] grayCode(int n) {',
      cpp: 'vector<int> grayCode(int n) {',
      go: 'func grayCode(n int) []int {'
    },
    examples: [[[1], [0, 1]], [[2], [0, 1, 3, 2]], [[3], [0, 1, 3, 2, 6, 7, 5, 4]]],
    hidden: [[[4], [0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8]], [[5], [0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8, 24, 25, 27, 26, 30, 31, 29, 28, 20, 21, 23, 22, 18, 19, 17, 16]], [[6], [0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8, 24, 25, 27, 26, 30, 31, 29, 28, 20, 21, 23, 22, 18, 19, 17, 16, 48, 49, 51, 50, 54, 55, 53, 52, 60, 61, 63, 62, 58, 59, 57, 56, 40, 41, 43, 42, 46, 47, 45, 44, 36, 37, 39, 38, 34, 35, 33, 32]], [[8], [0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8, 24, 25, 27, 26, 30, 31, 29, 28, 20, 21, 23, 22, 18, 19, 17, 16, 48, 49, 51, 50, 54, 55, 53, 52, 60, 61, 63, 62, 58, 59, 57, 56, 40, 41, 43, 42, 46, 47, 45, 44, 36, 37, 39, 38, 34, 35, 33, 32, 96, 97, 99, 98, 102, 103, 101, 100, 108, 109, 111, 110, 106, 107, 105, 104, 120, 121, 123, 122, 126, 127, 125, 124, 116, 117, 119, 118, 114, 115, 113, 112, 80, 81, 83, 82, 86, 87, 85, 84, 92, 93, 95, 94, 90, 91, 89, 88, 72, 73, 75, 74, 78, 79, 77, 76, 68, 69, 71, 70, 66, 67, 65, 64, 192, 193, 195, 194, 198, 199, 197, 196, 204, 205, 207, 206, 202, 203, 201, 200, 216, 217, 219, 218, 222, 223, 221, 220, 212, 213, 215, 214, 210, 211, 209, 208, 240, 241, 243, 242, 246, 247, 245, 244, 252, 253, 255, 254, 250, 251, 249, 248, 232, 233, 235, 234, 238, 239, 237, 236, 228, 229, 231, 230, 226, 227, 225, 224, 160, 161, 163, 162, 166, 167, 165, 164, 172, 173, 175, 174, 170, 171, 169, 168, 184, 185, 187, 186, 190, 191, 189, 188, 180, 181, 183, 182, 178, 179, 177, 176, 144, 145, 147, 146, 150, 151, 149, 148, 156, 157, 159, 158, 154, 155, 153, 152, 136, 137, 139, 138, 142, 143, 141, 140, 132, 133, 135, 134, 130, 131, 129, 128]], [[10], [0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8, 24, 25, 27, 26, 30, 31, 29, 28, 20, 21, 23, 22, 18, 19, 17, 16, 48, 49, 51, 50, 54, 55, 53, 52, 60, 61, 63, 62, 58, 59, 57, 56, 40, 41, 43, 42, 46, 47, 45, 44, 36, 37, 39, 38, 34, 35, 33, 32, 96, 97, 99, 98, 102, 103, 101, 100, 108, 109, 111, 110, 106, 107, 105, 104, 120, 121, 123, 122, 126, 127, 125, 124, 116, 117, 119, 118, 114, 115, 113, 112, 80, 81, 83, 82, 86, 87, 85, 84, 92, 93, 95, 94, 90, 91, 89, 88, 72, 73, 75, 74, 78, 79, 77, 76, 68, 69, 71, 70, 66, 67, 65, 64, 192, 193, 195, 194, 198, 199, 197, 196, 204, 205, 207, 206, 202, 203, 201, 200, 216, 217, 219, 218, 222, 223, 221, 220, 212, 213, 215, 214, 210, 211, 209, 208, 240, 241, 243, 242, 246, 247, 245, 244, 252, 253, 255, 254, 250, 251, 249, 248, 232, 233, 235, 234, 238, 239, 237, 236, 228, 229, 231, 230, 226, 227, 225, 224, 160, 161, 163, 162, 166, 167, 165, 164, 172, 173, 175, 174, 170, 171, 169, 168, 184, 185, 187, 186, 190, 191, 189, 188, 180, 181, 183, 182, 178, 179, 177, 176, 144, 145, 147, 146, 150, 151, 149, 148, 156, 157, 159, 158, 154, 155, 153, 152, 136, 137, 139, 138, 142, 143, 141, 140, 132, 133, 135, 134, 130, 131, 129, 128, 384, 385, 387, 386, 390, 391, 389, 388, 396, 397, 399, 398, 394, 395, 393, 392, 408, 409, 411, 410, 414, 415, 413, 412, 404, 405, 407, 406, 402, 403, 401, 400, 432, 433, 435, 434, 438, 439, 437, 436, 444, 445, 447, 446, 442, 443, 441, 440, 424, 425, 427, 426, 430, 431, 429, 428, 420, 421, 423, 422, 418, 419, 417, 416, 480, 481, 483, 482, 486, 487, 485, 484, 492, 493, 495, 494, 490, 491, 489, 488, 504, 505, 507, 506, 510, 511, 509, 508, 500, 501, 503, 502, 498, 499, 497, 496, 464, 465, 467, 466, 470, 471, 469, 468, 476, 477, 479, 478, 474, 475, 473, 472, 456, 457, 459, 458, 462, 463, 461, 460, 452, 453, 455, 454, 450, 451, 449, 448, 320, 321, 323, 322, 326, 327, 325, 324, 332, 333, 335, 334, 330, 331, 329, 328, 344, 345, 347, 346, 350, 351, 349, 348, 340, 341, 343, 342, 338, 339, 337, 336, 368, 369, 371, 370, 374, 375, 373, 372, 380, 381, 383, 382, 378, 379, 377, 376, 360, 361, 363, 362, 366, 367, 365, 364, 356, 357, 359, 358, 354, 355, 353, 352, 288, 289, 291, 290, 294, 295, 293, 292, 300, 301, 303, 302, 298, 299, 297, 296, 312, 313, 315, 314, 318, 319, 317, 316, 308, 309, 311, 310, 306, 307, 305, 304, 272, 273, 275, 274, 278, 279, 277, 276, 284, 285, 287, 286, 282, 283, 281, 280, 264, 265, 267, 266, 270, 271, 269, 268, 260, 261, 263, 262, 258, 259, 257, 256, 768, 769, 771, 770, 774, 775, 773, 772, 780, 781, 783, 782, 778, 779, 777, 776, 792, 793, 795, 794, 798, 799, 797, 796, 788, 789, 791, 790, 786, 787, 785, 784, 816, 817, 819, 818, 822, 823, 821, 820, 828, 829, 831, 830, 826, 827, 825, 824, 808, 809, 811, 810, 814, 815, 813, 812, 804, 805, 807, 806, 802, 803, 801, 800, 864, 865, 867, 866, 870, 871, 869, 868, 876, 877, 879, 878, 874, 875, 873, 872, 888, 889, 891, 890, 894, 895, 893, 892, 884, 885, 887, 886, 882, 883, 881, 880, 848, 849, 851, 850, 854, 855, 853, 852, 860, 861, 863, 862, 858, 859, 857, 856, 840, 841, 843, 842, 846, 847, 845, 844, 836, 837, 839, 838, 834, 835, 833, 832, 960, 961, 963, 962, 966, 967, 965, 964, 972, 973, 975, 974, 970, 971, 969, 968, 984, 985, 987, 986, 990, 991, 989, 988, 980, 981, 983, 982, 978, 979, 977, 976, 1008, 1009, 1011, 1010, 1014, 1015, 1013, 1012, 1020, 1021, 1023, 1022, 1018, 1019, 1017, 1016, 1000, 1001, 1003, 1002, 1006, 1007, 1005, 1004, 996, 997, 999, 998, 994, 995, 993, 992, 928, 929, 931, 930, 934, 935, 933, 932, 940, 941, 943, 942, 938, 939, 937, 936, 952, 953, 955, 954, 958, 959, 957, 956, 948, 949, 951, 950, 946, 947, 945, 944, 912, 913, 915, 914, 918, 919, 917, 916, 924, 925, 927, 926, 922, 923, 921, 920, 904, 905, 907, 906, 910, 911, 909, 908, 900, 901, 903, 902, 898, 899, 897, 896, 640, 641, 643, 642, 646, 647, 645, 644, 652, 653, 655, 654, 650, 651, 649, 648, 664, 665, 667, 666, 670, 671, 669, 668, 660, 661, 663, 662, 658, 659, 657, 656, 688, 689, 691, 690, 694, 695, 693, 692, 700, 701, 703, 702, 698, 699, 697, 696, 680, 681, 683, 682, 686, 687, 685, 684, 676, 677, 679, 678, 674, 675, 673, 672, 736, 737, 739, 738, 742, 743, 741, 740, 748, 749, 751, 750, 746, 747, 745, 744, 760, 761, 763, 762, 766, 767, 765, 764, 756, 757, 759, 758, 754, 755, 753, 752, 720, 721, 723, 722, 726, 727, 725, 724, 732, 733, 735, 734, 730, 731, 729, 728, 712, 713, 715, 714, 718, 719, 717, 716, 708, 709, 711, 710, 706, 707, 705, 704, 576, 577, 579, 578, 582, 583, 581, 580, 588, 589, 591, 590, 586, 587, 585, 584, 600, 601, 603, 602, 606, 607, 605, 604, 596, 597, 599, 598, 594, 595, 593, 592, 624, 625, 627, 626, 630, 631, 629, 628, 636, 637, 639, 638, 634, 635, 633, 632, 616, 617, 619, 618, 622, 623, 621, 620, 612, 613, 615, 614, 610, 611, 609, 608, 544, 545, 547, 546, 550, 551, 549, 548, 556, 557, 559, 558, 554, 555, 553, 552, 568, 569, 571, 570, 574, 575, 573, 572, 564, 565, 567, 566, 562, 563, 561, 560, 528, 529, 531, 530, 534, 535, 533, 532, 540, 541, 543, 542, 538, 539, 537, 536, 520, 521, 523, 522, 526, 527, 525, 524, 516, 517, 519, 518, 514, 515, 513, 512]]],
    check: function (args, got) {
      const size = 1 << args[0];
      if (!Array.isArray(got) || got.length !== size || got[0] !== 0 || new Set(got).size !== size) return false;
      const one = (x) => x && !(x & (x - 1));
      return got.every((v, i) => Number.isInteger(v) && v >= 0 && v < size && one(v ^ got[(i + 1) % size]));
    },
    ref: function (n) { return Array.from({ length: 1 << n }, (_, i) => i ^ (i >> 1)); }
  },
  'subtract-the-product-and-sum-of-digits-of-an-integer': {
    fn: 'subtractProductAndSum', params: ['n'], cmp: 'exact', meta: ['Subtract the Product and Sum of Digits of an Integer', 'Easy', 'Math & Geometry'],
    ask: 'Return the product of n\'s digits minus the sum of its digits.',
    sig: {
      py: 'def subtractProductAndSum(n: int) -> int:',
      js: 'function subtractProductAndSum(n) {',
      java: 'public int subtractProductAndSum(int n) {',
      cpp: 'int subtractProductAndSum(int n) {',
      go: 'func subtractProductAndSum(n int) int {'
    },
    examples: [[[123], 0], [[7], 0], [[405], -9]],
    hidden: [[[1], 0], [[99], 63], [[100000], -1], [[4421], 21], [[987654321], 362835]],
    ref: function (n) { const d = String(n).split('').map(Number); return d.reduce((a, b) => a * b, 1) - d.reduce((a, b) => a + b, 0); }
  },
  'ugly-number': {
    fn: 'isUgly', params: ['n'], cmp: 'exact', meta: ['Ugly Number', 'Easy', 'Math & Geometry'],
    ask: 'A number is ugly when it is positive and has no prime factors other than 2, 3 and 5. Return true if n is ugly (1 counts as ugly).',
    sig: {
      py: 'def isUgly(n: int) -> bool:',
      js: 'function isUgly(n) {',
      java: 'public boolean isUgly(int n) {',
      cpp: 'bool isUgly(int n) {',
      go: 'func isUgly(n int) bool {'
    },
    examples: [[[30], true], [[14], false], [[1], true]],
    hidden: [[[0], false], [[-6], false], [[2147483647], false], [[1024], true], [[7], false]],
    ref: function (n) {
      if (n <= 0) return false;
      for (const p of [2, 3, 5]) while (n % p === 0) n /= p;
      return n === 1;
    }
  },
  'check-if-it-is-a-straight-line': {
    fn: 'checkStraightLine', params: ['coordinates'], cmp: 'exact', meta: ['Check If It Is a Straight Line', 'Easy', 'Math & Geometry'],
    ask: 'Return true if all the points [x, y] lie on one straight line.',
    sig: {
      py: 'def checkStraightLine(coordinates: List[List[int]]) -> bool:',
      js: 'function checkStraightLine(coordinates) {',
      java: 'public boolean checkStraightLine(int[][] coordinates) {',
      cpp: 'bool checkStraightLine(vector<vector<int>>& coordinates) {',
      go: 'func checkStraightLine(coordinates [][]int) bool {'
    },
    examples: [[[[[0, 0], [1, 1], [2, 2]]], true], [[[[0, 0], [1, 2], [2, 3]]], false], [[[[3, 4], [3, 9]]], true]],
    hidden: [[[[[0, 0], [0, 1], [0, -1]]], true], [[[[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]], true], [[[[1, 1], [2, 2], [3, 4], [4, 5]]], false], [[[[-3, 7], [0, 1], [3, -5]]], true], [[[[2, 4], [2, 5], [3, 6]]], false]],
    ref: function (c) {
      const [x0, y0] = c[0], [x1, y1] = c[1];
      return c.every(([x, y]) => (x - x0) * (y1 - y0) === (y - y0) * (x1 - x0));
    }
  },
  'rectangle-overlap': {
    fn: 'isRectangleOverlap', params: ['rec1', 'rec2'], cmp: 'exact', meta: ['Rectangle Overlap', 'Easy', 'Math & Geometry'],
    ask: 'Each rectangle is [x1, y1, x2, y2]: its bottom-left and top-right corners, with sides parallel to the axes. Return true if they overlap with positive area (touching edges or corners does not count).',
    sig: {
      py: 'def isRectangleOverlap(rec1: List[int], rec2: List[int]) -> bool:',
      js: 'function isRectangleOverlap(rec1, rec2) {',
      java: 'public boolean isRectangleOverlap(int[] rec1, int[] rec2) {',
      cpp: 'bool isRectangleOverlap(vector<int>& rec1, vector<int>& rec2) {',
      go: 'func isRectangleOverlap(rec1 []int, rec2 []int) bool {'
    },
    examples: [[[[0, 0, 2, 2], [1, 1, 3, 3]], true], [[[0, 0, 1, 1], [1, 0, 2, 1]], false], [[[0, 0, 4, 4], [1, 1, 2, 2]], true]],
    hidden: [[[[0, 0, 1, 1], [2, 2, 3, 3]], false], [[[-5, -5, 5, 5], [-1, -10, 1, 10]], true], [[[0, 0, 2, 2], [2, 2, 3, 3]], false], [[[7, 8, 13, 15], [10, 8, 12, 20]], true], [[[0, 0, 1, 1], [0, 0, 1, 1]], true]],
    ref: function (a, b) { return Math.min(a[2], b[2]) > Math.max(a[0], b[0]) && Math.min(a[3], b[3]) > Math.max(a[1], b[1]); }
  },
  'factorial-trailing-zeroes': {
    fn: 'trailingZeroes', params: ['n'], cmp: 'exact', meta: ['Factorial Trailing Zeroes', 'Medium', 'Math & Geometry'],
    ask: 'Return how many zeros n! (1 times 2 times ... times n) ends with, without computing n!.',
    sig: {
      py: 'def trailingZeroes(n: int) -> int:',
      js: 'function trailingZeroes(n) {',
      java: 'public int trailingZeroes(int n) {',
      cpp: 'int trailingZeroes(int n) {',
      go: 'func trailingZeroes(n int) int {'
    },
    examples: [[[4], 0], [[10], 2], [[25], 6]],
    hidden: [[[0], 0], [[5], 1], [[100], 24], [[625], 156], [[10000], 2499]],
    ref: function (n) { let c = 0; while (n) { n = Math.floor(n / 5); c += n; } return c; }
  },
  'ugly-number-ii': {
    fn: 'nthUglyNumber', params: ['n'], cmp: 'exact', meta: ['Ugly Number II', 'Medium', 'Math & Geometry'],
    ask: 'Ugly numbers are the positive numbers whose only prime factors are 2, 3 and 5, starting 1, 2, 3, 4, 5, 6, 8. Return the n-th one.',
    sig: {
      py: 'def nthUglyNumber(n: int) -> int:',
      js: 'function nthUglyNumber(n) {',
      java: 'public int nthUglyNumber(int n) {',
      cpp: 'int nthUglyNumber(int n) {',
      go: 'func nthUglyNumber(n int) int {'
    },
    examples: [[[1], 1], [[7], 8], [[11], 15]],
    hidden: [[[2], 2], [[10], 12], [[100], 1536], [[1000], 51200000], [[1690], 2123366400]],
    ref: function (n) {
      const u = [1];
      let a = 0, b = 0, c = 0;
      while (u.length < n) {
        const next = Math.min(u[a] * 2, u[b] * 3, u[c] * 5);
        u.push(next);
        if (next === u[a] * 2) a++;
        if (next === u[b] * 3) b++;
        if (next === u[c] * 5) c++;
      }
      return u[n - 1];
    }
  },
  'find-the-winner-of-the-circular-game': {
    fn: 'findTheWinner', params: ['n', 'k'], cmp: 'exact', meta: ['Find the Winner of the Circular Game', 'Medium', 'Math & Geometry'],
    ask: 'Friends 1 to n stand in a circle. Starting from friend 1, count k friends clockwise (counting the one you start on); the last one counted leaves, and counting starts again from the next friend. Return the friend who is left at the end.',
    sig: {
      py: 'def findTheWinner(n: int, k: int) -> int:',
      js: 'function findTheWinner(n, k) {',
      java: 'public int findTheWinner(int n, int k) {',
      cpp: 'int findTheWinner(int n, int k) {',
      go: 'func findTheWinner(n int, k int) int {'
    },
    examples: [[[1, 5], 1], [[3, 1], 3], [[4, 2], 1]],
    hidden: [[[5, 2], 3], [[6, 5], 1], [[7, 3], 4], [[10, 10], 8], [[500, 499], 121]],
    ref: function (n, k) { let w = 0; for (let i = 2; i <= n; i++) w = (w + k) % i; return w + 1; }
  },
  'rectangle-area': {
    fn: 'computeArea', params: ['ax1', 'ay1', 'ax2', 'ay2', 'bx1', 'by1', 'bx2', 'by2'], cmp: 'exact', meta: ['Rectangle Area', 'Medium', 'Math & Geometry'],
    ask: 'Two rectangles have sides parallel to the axes: the first from (ax1, ay1) to (ax2, ay2), the second from (bx1, by1) to (bx2, by2), bottom-left to top-right. Return the total area they cover together.',
    sig: {
      py: 'def computeArea(ax1: int, ay1: int, ax2: int, ay2: int, bx1: int, by1: int, bx2: int, by2: int) -> int:',
      js: 'function computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {',
      java: 'public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {',
      cpp: 'int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {',
      go: 'func computeArea(ax1 int, ay1 int, ax2 int, ay2 int, bx1 int, by1 int, bx2 int, by2 int) int {'
    },
    examples: [[[0, 0, 2, 2, 1, 1, 3, 3], 7], [[0, 0, 1, 1, 2, 2, 3, 3], 2], [[-1, -1, 1, 1, -1, -1, 1, 1], 4]],
    hidden: [[[-3, 0, 3, 4, 0, -1, 9, 2], 45], [[-2, -2, 2, 2, -1, -1, 1, 1], 16], [[0, 0, 0, 0, -1, -1, 1, 1], 4], [[0, 0, 5, 5, 5, 0, 10, 5], 50], [[-10000, -10000, 10000, 10000, -10000, -10000, 10000, 10000], 400000000]],
    ref: function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
      const w = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1)), h = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
      return (ax2 - ax1) * (ay2 - ay1) + (bx2 - bx1) * (by2 - by1) - w * h;
    }
  },
  'valid-square': {
    fn: 'validSquare', params: ['p1', 'p2', 'p3', 'p4'], cmp: 'exact', meta: ['Valid Square', 'Medium', 'Math & Geometry'],
    ask: 'Given four points in any order, return true if they are the corners of a square with positive area (the square may be tilted).',
    sig: {
      py: 'def validSquare(p1: List[int], p2: List[int], p3: List[int], p4: List[int]) -> bool:',
      js: 'function validSquare(p1, p2, p3, p4) {',
      java: 'public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {',
      cpp: 'bool validSquare(vector<int>& p1, vector<int>& p2, vector<int>& p3, vector<int>& p4) {',
      go: 'func validSquare(p1 []int, p2 []int, p3 []int, p4 []int) bool {'
    },
    examples: [[[[0, 0], [1, 1], [1, 0], [0, 1]], true], [[[0, 0], [2, 0], [2, 1], [0, 1]], false], [[[0, 0], [0, 0], [0, 0], [0, 0]], false]],
    hidden: [[[[1, 0], [-1, 0], [0, 1], [0, -1]], true], [[[0, 0], [1, 1], [0, 0], [1, 1]], false], [[[0, 0], [5, 0], [5, 5], [0, 5]], true], [[[0, 0], [2, 1], [3, 3], [1, 2]], false], [[[0, 0], [2, 1], [3, 3], [1, 3]], false]],
    ref: function (p1, p2, p3, p4) {
      const p = [p1, p2, p3, p4], d = [];
      for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) d.push((p[i][0] - p[j][0]) ** 2 + (p[i][1] - p[j][1]) ** 2);
      d.sort((a, b) => a - b);
      return d[0] > 0 && d[0] === d[3] && d[4] === d[5] && d[4] === 2 * d[0];
    }
  },
  'max-points-on-a-line': {
    fn: 'maxPoints', params: ['points'], cmp: 'exact', meta: ['Max Points on a Line', 'Hard', 'Math & Geometry'],
    ask: 'All points are different. Return the largest number of them that lie on one straight line.',
    sig: {
      py: 'def maxPoints(points: List[List[int]]) -> int:',
      js: 'function maxPoints(points) {',
      java: 'public int maxPoints(int[][] points) {',
      cpp: 'int maxPoints(vector<vector<int>>& points) {',
      go: 'func maxPoints(points [][]int) int {'
    },
    examples: [[[[[0, 0]]], 1], [[[[0, 0], [1, 1], [2, 2], [3, 5]]], 3], [[[[1, 0], [1, 4], [2, 2]]], 2]],
    hidden: [[[[[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]]], 4], [[[[0, 0], [0, 1], [0, 2], [1, 0]]], 3], [[[[-1, -1], [1, 1], [2, 2], [-3, 4]]], 3], [[[[0, 0], [94911151, 94911150], [94911152, 94911151]]], 2], [[[[2, 3], [3, 3], [-5, 3], [0, 0]]], 3]],
    ref: function (points) {
      const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
      let best = Math.min(points.length, 1);
      for (let i = 0; i < points.length; i++) {
        const m = new Map();
        for (let j = i + 1; j < points.length; j++) {
          let dx = points[j][0] - points[i][0], dy = points[j][1] - points[i][1];
          const g = gcd(dx, dy) || 1;
          dx /= g; dy /= g;
          if (dx < 0 || (dx === 0 && dy < 0)) { dx = -dx; dy = -dy; }
          const k = dx + '/' + dy;
          m.set(k, (m.get(k) || 1) + 1);
          best = Math.max(best, m.get(k));
        }
      }
      return best;
    }
  },
  'number-of-digit-one': {
    fn: 'countDigitOne', params: ['n'], cmp: 'exact', meta: ['Number of Digit One', 'Hard', 'Math & Geometry'],
    ask: 'Count how many times the digit 1 is written when you write every whole number from 0 to n.',
    sig: {
      py: 'def countDigitOne(n: int) -> int:',
      js: 'function countDigitOne(n) {',
      java: 'public int countDigitOne(int n) {',
      cpp: 'int countDigitOne(int n) {',
      go: 'func countDigitOne(n int) int {'
    },
    examples: [[[0], 0], [[12], 5], [[100], 21]],
    hidden: [[[1], 1], [[9], 1], [[99], 20], [[1000000000], 900000001], [[314159], 260456]],
    ref: function (n) {
      let count = 0;
      for (let p = 1; p <= n; p *= 10) {
        const high = Math.floor(n / (p * 10)), cur = Math.floor(n / p) % 10, low = n % p;
        count += high * p + (cur > 1 ? p : cur === 1 ? low + 1 : 0);
      }
      return count;
    }
  },
  'erect-the-fence': {
    fn: 'outerTrees', params: ['trees'], cmp: 'unordered', meta: ['Erect the Fence', 'Hard', 'Math & Geometry'],
    ask: 'Trees stand at different points [x, y]. Fence them in with the shortest rope. Return every tree that lies on the fence, including trees on a straight part of it, in any order.',
    sig: {
      py: 'def outerTrees(trees: List[List[int]]) -> List[List[int]]:',
      js: 'function outerTrees(trees) {',
      java: 'public int[][] outerTrees(int[][] trees) {',
      cpp: 'vector<vector<int>> outerTrees(vector<vector<int>>& trees) {',
      go: 'func outerTrees(trees [][]int) [][]int {'
    },
    examples: [[[[[0, 0], [2, 0], [1, 1], [2, 2], [0, 2]]], [[0, 0], [2, 0], [2, 2], [0, 2]]], [[[[1, 1]]], [[1, 1]]], [[[[0, 0], [1, 0], [2, 0]]], [[0, 0], [1, 0], [2, 0]]]],
    hidden: [[[[[1, 1], [2, 2], [2, 0], [2, 4], [3, 3], [4, 2]]], [[1, 1], [2, 0], [4, 2], [3, 3], [2, 4]]], [[[[1, 2], [2, 2], [4, 2]]], [[1, 2], [2, 2], [4, 2]]], [[[[0, 0], [0, 4], [4, 4], [4, 0], [2, 2], [2, 0], [0, 2]]], [[0, 0], [2, 0], [4, 0], [4, 4], [0, 4], [0, 2]]], [[[[3, 0], [4, 0], [5, 0], [6, 1], [7, 2], [7, 3], [7, 4], [6, 5], [5, 5], [4, 5], [3, 5], [2, 5], [1, 4], [1, 3], [1, 2], [2, 1], [4, 2], [0, 3]]], [[0, 3], [1, 2], [2, 1], [3, 0], [4, 0], [5, 0], [6, 1], [7, 2], [7, 3], [7, 4], [6, 5], [5, 5], [4, 5], [3, 5], [2, 5], [1, 4]]], [[[[0, 0], [1, 1]]], [[0, 0], [1, 1]]]],
    ref: function (trees) {
      const p = trees.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      if (p.length < 3) return p;
      const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const half = (pts) => { const h = []; for (const q of pts) { while (h.length >= 2 && cross(h[h.length - 2], h[h.length - 1], q) < 0) h.pop(); h.push(q); } return h; };
      const all = half(p).concat(half(p.slice().reverse()));
      const seen = new Set(), out = [];
      for (const q of all) { const k = q.join(','); if (!seen.has(k)) { seen.add(k); out.push(q); } }
      return out;
    }
  },
  'range-sum-query-mutable': {
    fn: 'NumArray', params: ['ops', 'args'], cmp: 'exact', io: { design: true, ctor: true }, meta: ['Range Sum Query - Mutable', 'Medium', 'Segment Tree & BIT'],
    ask: 'NumArray(nums) keeps an array. update(index, val) sets nums[index] to val, and sumRange(left, right) returns the sum from left to right, both included. Both should take O(log n). The first op names the class with the array.',
    sig: {
      py: 'class NumArray:',
      js: 'class NumArray {',
      java: 'class NumArray {',
      cpp: 'class NumArray {',
      go: 'type NumArray struct {'
    },
    starter: {
      py: 'class NumArray:\n    def __init__(self, nums: List[int]):\n        pass\n\n    def update(self, index: int, val: int) -> None:\n        pass\n\n    def sumRange(self, left: int, right: int) -> int:\n        pass\n',
      js: 'class NumArray {\n  constructor(nums) {\n  }\n  update(index, val) {\n  }\n  sumRange(left, right) {\n  }\n}\n',
      java: 'class NumArray {\n    public NumArray(int[] nums) {\n    }\n    public void update(int index, int val) {\n    }\n    public int sumRange(int left, int right) {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass NumArray {\npublic:\n    NumArray(vector<int>& nums) {\n    }\n    void update(int index, int val) {\n    }\n    int sumRange(int left, int right) {\n        return {};\n    }\n};\n',
      go: 'package main\n\ntype NumArray struct {\n}\n\nfunc Constructor(nums []int) NumArray {\n    return NumArray{}\n}\n\nfunc (this *NumArray) Update(index int, val int) {\n}\n\nfunc (this *NumArray) SumRange(left int, right int) int {\n    return 0\n}\n'
    },
    examples: [[[['NumArray', 'sumRange', 'update', 'sumRange'], [[[2, 4, 6]], [0, 2], [1, 1], [0, 2]]], [null, 12, null, 9]], [[['NumArray', 'sumRange'], [[[5]], [0, 0]]], [null, 5]], [[['NumArray', 'update', 'update', 'sumRange', 'sumRange'], [[[0, 0, 0, 0]], [0, 3], [3, -2], [0, 3], [1, 2]]], [null, null, null, 1, 0]]],
    hidden: [[[['NumArray', 'sumRange', 'sumRange', 'update', 'sumRange'], [[[1, 3, 5]], [0, 2], [1, 1], [1, 2], [0, 2]]], [null, 9, 3, null, 8]], [[['NumArray', 'update', 'sumRange', 'update', 'sumRange'], [[[-1]], [0, 1], [0, 0], [0, -1], [0, 0]]], [null, null, 1, null, -1]], [[['NumArray', 'sumRange', 'update', 'update', 'sumRange', 'sumRange'], [[[9, -8, 7, -6, 5]], [1, 3], [2, 0], [4, 10], [0, 4], [2, 4]]], [null, -7, null, null, 5, 4]], [[['NumArray', 'update', 'update', 'update', 'sumRange'], [[[1, 1, 1, 1, 1, 1]], [0, 2], [5, 2], [2, 2], [0, 5]]], [null, null, null, null, 9]], [[['NumArray', 'sumRange', 'sumRange', 'sumRange'], [[[100, 200, 300, 400]], [0, 0], [3, 3], [1, 2]]], [null, 100, 400, 500]]],
    ref: class {
      constructor(nums) { this.n = nums.length; this.a = nums.slice(); this.t = new Array(this.n + 1).fill(0); nums.forEach((v, i) => this.add(i, v)); }
      add(i, d) { for (i++; i <= this.n; i += i & -i) this.t[i] += d; }
      pre(i) { let s = 0; for (; i > 0; i -= i & -i) s += this.t[i]; return s; }
      update(i, v) { this.add(i, v - this.a[i]); this.a[i] = v; }
      sumRange(l, r) { return this.pre(r + 1) - this.pre(l); }
    }
  },
  'count-of-smaller-numbers-after-self': {
    fn: 'countSmaller', params: ['nums'], cmp: 'exact', meta: ['Count of Smaller Numbers After Self', 'Hard', 'Segment Tree & BIT'],
    ask: 'For each value in nums, count how many values to its right are strictly smaller. Return the counts in order. Aim for better than checking every pair.',
    sig: {
      py: 'def countSmaller(nums: List[int]) -> List[int]:',
      js: 'function countSmaller(nums) {',
      java: 'public int[] countSmaller(int[] nums) {',
      cpp: 'vector<int> countSmaller(vector<int>& nums) {',
      go: 'func countSmaller(nums []int) []int {'
    },
    examples: [[[[3, 1, 2]], [2, 0, 0]], [[[1]], [0]], [[[2, 2]], [0, 0]]],
    hidden: [[[[5, 2, 6, 1]], [2, 1, 1, 0]], [[[-1, -1]], [0, 0]], [[[1, 2, 3, 4]], [0, 0, 0, 0]], [[[4, 3, 2, 1]], [3, 2, 1, 0]], [[[26, 78, 27, 100, 33, 67, 90, 23, 66, 5, 38, 7, 35, 23, 52, 22, 83, 51, 98, 69]], [5, 14, 5, 16, 5, 10, 12, 3, 8, 0, 4, 0, 2, 1, 2, 0, 2, 0, 1, 0]]],
    ref: function (nums) {
      const sorted = [...new Set(nums)].sort((a, b) => a - b), rank = new Map(sorted.map((v, i) => [v, i + 1]));
      const t = new Array(sorted.length + 1).fill(0), out = new Array(nums.length);
      for (let i = nums.length - 1; i >= 0; i--) {
        const r = rank.get(nums[i]);
        let s = 0;
        for (let k = r - 1; k > 0; k -= k & -k) s += t[k];
        out[i] = s;
        for (let k = r; k < t.length; k += k & -k) t[k]++;
      }
      return out;
    }
  },
  'reverse-pairs': {
    fn: 'reversePairs', params: ['nums'], cmp: 'exact', meta: ['Reverse Pairs', 'Hard', 'Segment Tree & BIT'],
    ask: 'Count the pairs of indexes i < j where nums[i] is more than twice nums[j]. Aim for better than checking every pair.',
    sig: {
      py: 'def reversePairs(nums: List[int]) -> int:',
      js: 'function reversePairs(nums) {',
      java: 'public int reversePairs(int[] nums) {',
      cpp: 'int reversePairs(vector<int>& nums) {',
      go: 'func reversePairs(nums []int) int {'
    },
    examples: [[[[5, 2]], 1], [[[1, 2, 3]], 0], [[[6, 1, 2, 3]], 2]],
    hidden: [[[[1, 3, 2, 3, 1]], 2], [[[2, 4, 3, 5, 1]], 3], [[[-5, -5]], 1], [[[2147483647, 2147483647, 2147483647]], 0], [[[10, 1, 9, 2, 8, 3, 7, 4]], 8]],
    ref: function (nums) {
      const a = nums.slice();
      const sort = (lo, hi) => {
        if (hi - lo <= 1) return 0;
        const mid = (lo + hi) >> 1;
        let c = sort(lo, mid) + sort(mid, hi);
        for (let i = lo, j = mid; i < mid; i++) { while (j < hi && a[i] > 2 * a[j]) j++; c += j - mid; }
        const merged = a.slice(lo, hi).sort((x, y) => x - y);
        for (let k = 0; k < merged.length; k++) a[lo + k] = merged[k];
        return c;
      };
      return sort(0, a.length);
    }
  },
  'create-sorted-array-through-instructions': {
    fn: 'createSortedArray', params: ['instructions'], cmp: 'exact', meta: ['Create Sorted Array through Instructions', 'Hard', 'Segment Tree & BIT'],
    ask: 'Insert the values of instructions one by one into a sorted list that starts empty. Each insert costs the smaller of: how many values already in the list are strictly smaller, and how many are strictly larger. Return the total cost modulo 1000000007.',
    sig: {
      py: 'def createSortedArray(instructions: List[int]) -> int:',
      js: 'function createSortedArray(instructions) {',
      java: 'public int createSortedArray(int[] instructions) {',
      cpp: 'int createSortedArray(vector<int>& instructions) {',
      go: 'func createSortedArray(instructions []int) int {'
    },
    examples: [[[[1, 2, 3]], 0], [[[3, 1, 2]], 1], [[[2, 2, 1]], 0]],
    hidden: [[[[1, 5, 6, 2]], 1], [[[1, 2, 3, 6, 5, 4]], 3], [[[1, 3, 3, 3, 2, 4, 2, 1, 2]], 4], [[[7]], 0], [[[5, 5, 5, 1, 9, 1, 9, 5]], 2]],
    ref: function (instructions) {
      const max = Math.max(...instructions), t = new Array(max + 1).fill(0);
      const q = (i) => { let s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; };
      let cost = 0;
      instructions.forEach((v, i) => {
        const less = q(v - 1), more = i - q(v);
        cost = (cost + Math.min(less, more)) % 1000000007;
        for (let k = v; k <= max; k += k & -k) t[k]++;
      });
      return cost;
    }
  },
  'the-skyline-problem': {
    fn: 'getSkyline', params: ['buildings'], cmp: 'exact', meta: ['The Skyline Problem', 'Hard', 'Segment Tree & BIT'],
    ask: 'Each building is [left, right, height], a rectangle standing on flat ground. Return the outline seen from far away as key points [x, height], left to right: each point is where the outline\'s height changes to a new value. The last point has height 0, and no two neighbouring points share a height.',
    sig: {
      py: 'def getSkyline(buildings: List[List[int]]) -> List[List[int]]:',
      js: 'function getSkyline(buildings) {',
      java: 'public int[][] getSkyline(int[][] buildings) {',
      cpp: 'vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {',
      go: 'func getSkyline(buildings [][]int) [][]int {'
    },
    examples: [[[[[0, 2, 3]]], [[0, 3], [2, 0]]], [[[[1, 3, 2], [2, 4, 2]]], [[1, 2], [4, 0]]], [[[[0, 4, 5], [1, 2, 3]]], [[0, 5], [4, 0]]]],
    hidden: [[[[[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]]], [[2, 10], [3, 15], [7, 12], [12, 0], [15, 10], [20, 8], [24, 0]]], [[[[0, 2, 3], [2, 5, 3]]], [[0, 3], [5, 0]]], [[[[1, 2, 1], [1, 2, 2], [1, 2, 3]]], [[1, 3], [2, 0]]], [[[[0, 3, 2], [4, 6, 2]]], [[0, 2], [3, 0], [4, 2], [6, 0]]], [[[[1, 10, 4], [2, 3, 6], [5, 6, 6], [7, 12, 4]]], [[1, 4], [2, 6], [3, 4], [5, 6], [6, 4], [12, 0]]]],
    ref: function (buildings) {
      const xs = [...new Set(buildings.flatMap(([l, r]) => [l, r]))].sort((a, b) => a - b), out = [];
      for (const x of xs) {
        let h = 0;
        for (const [l, r, hh] of buildings) if (l <= x && x < r) h = Math.max(h, hh);
        if (!out.length || out[out.length - 1][1] !== h) out.push([x, h]);
      }
      return out;
    }
  },
  'range-module': {
    fn: 'RangeModule', params: ['ops', 'args'], cmp: 'exact', io: { design: true }, meta: ['Range Module', 'Hard', 'Segment Tree & BIT'],
    ask: 'Track which numbers are covered. A range [left, right) covers every real number from left up to, not including, right. addRange starts covering a range, removeRange stops covering one, and queryRange(left, right) returns true if every number in that range is covered right now.',
    sig: {
      py: 'class RangeModule:',
      js: 'class RangeModule {',
      java: 'class RangeModule {',
      cpp: 'class RangeModule {',
      go: 'type RangeModule struct {'
    },
    starter: {
      py: 'class RangeModule:\n    def __init__(self):\n        pass\n\n    def addRange(self, left: int, right: int) -> None:\n        pass\n\n    def queryRange(self, left: int, right: int) -> bool:\n        pass\n\n    def removeRange(self, left: int, right: int) -> None:\n        pass\n',
      js: 'class RangeModule {\n  constructor() {\n  }\n  addRange(left, right) {\n  }\n  queryRange(left, right) {\n  }\n  removeRange(left, right) {\n  }\n}\n',
      java: 'class RangeModule {\n    public RangeModule() {\n    }\n    public void addRange(int left, int right) {\n    }\n    public boolean queryRange(int left, int right) {\n        return false;\n    }\n    public void removeRange(int left, int right) {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass RangeModule {\npublic:\n    RangeModule() {\n    }\n    void addRange(int left, int right) {\n    }\n    bool queryRange(int left, int right) {\n        return {};\n    }\n    void removeRange(int left, int right) {\n    }\n};\n',
      go: 'package main\n\ntype RangeModule struct {\n}\n\nfunc Constructor() RangeModule {\n    return RangeModule{}\n}\n\nfunc (this *RangeModule) AddRange(left int, right int) {\n}\n\nfunc (this *RangeModule) QueryRange(left int, right int) bool {\n    return false\n}\n\nfunc (this *RangeModule) RemoveRange(left int, right int) {\n}\n'
    },
    examples: [[[['addRange', 'queryRange', 'removeRange', 'queryRange', 'queryRange'], [[5, 10], [6, 9], [7, 8], [5, 7], [6, 9]]], [null, true, null, true, false]], [[['queryRange'], [[1, 2]]], [false]], [[['addRange', 'addRange', 'queryRange'], [[1, 3], [3, 6], [2, 5]]], [null, null, true]]],
    hidden: [[[['addRange', 'removeRange', 'queryRange', 'queryRange', 'queryRange'], [[10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]], [null, null, true, false, true]], [[['addRange', 'addRange', 'removeRange', 'queryRange', 'queryRange'], [[1, 100], [200, 300], [50, 250], [1, 50], [250, 300]]], [null, null, null, true, true]], [[['addRange', 'queryRange', 'removeRange', 'queryRange'], [[0, 1000000000], [999999999, 1000000000], [0, 1000000000], [5, 6]]], [null, true, null, false]], [[['addRange', 'addRange', 'addRange', 'queryRange', 'removeRange', 'queryRange'], [[1, 2], [3, 4], [2, 3], [1, 4], [2, 3], [1, 2]]], [null, null, null, true, null, true]], [[['removeRange', 'addRange', 'queryRange', 'addRange', 'queryRange'], [[1, 5], [4, 8], [3, 5], [1, 4], [1, 8]]], [null, null, false, null, true]]],
    ref: class {
      constructor() { this.r = []; }
      addRange(l, r) {
        const out = [];
        for (const [a, b] of this.r) { if (b < l || a > r) out.push([a, b]); else { l = Math.min(l, a); r = Math.max(r, b); } }
        out.push([l, r]); out.sort((x, y) => x[0] - y[0]); this.r = out;
      }
      queryRange(l, r) { return this.r.some(([a, b]) => a <= l && r <= b); }
      removeRange(l, r) {
        const out = [];
        for (const [a, b] of this.r) {
          if (b <= l || a >= r) { out.push([a, b]); continue; }
          if (a < l) out.push([a, l]);
          if (b > r) out.push([r, b]);
        }
        this.r = out;
      }
    }
  },
  'print-in-order': {
    fn: 'InOrder', params: ['starts'], cmp: 'exact', meta: ['Print in Order', 'Easy', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'Three tasks share one InOrder object. One calls first(print), one second(print), one third(print), but they may start in any order and at any time. Make the words always come out as first, second, third: each method gets a print function that writes its own word. Use promises to make a method wait (an async method can await one); do not spin in a loop, because the tasks share one thread. The tests start the calls at the times listed as [method, delay in ms] and read the words printed.',
    sig: {
      py: 'class InOrder:',
      js: 'class InOrder {',
      java: 'class InOrder {',
      cpp: 'class InOrder {',
      go: 'type InOrder struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass InOrder:\n    def __init__(self):\n        pass\n\n    async def first(self, print):\n        pass\n\n    async def second(self, print):\n        pass\n\n    async def third(self, print):\n        pass\n',
      js: 'class InOrder {\n  constructor() {\n  }\n  async first(print) {\n  }\n  async second(print) {\n  }\n  async third(print) {\n  }\n}\n',
      java: 'class InOrder {\n    public InOrder() {\n    }\n    public void first(Runnable print) throws InterruptedException {\n    }\n    public void second(Runnable print) throws InterruptedException {\n    }\n    public void third(Runnable print) throws InterruptedException {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass InOrder {\npublic:\n    InOrder() {\n    }\n    void first(function<void()> print) {\n    }\n    void second(function<void()> print) {\n    }\n    void third(function<void()> print) {\n    }\n};\n',
      go: 'package main\n\ntype InOrder struct {\n}\n\nfunc NewInOrder() *InOrder {\n    return &InOrder{}\n}\n\nfunc (x *InOrder) First(print func()) {\n}\n\nfunc (x *InOrder) Second(print func()) {\n}\n\nfunc (x *InOrder) Third(print func()) {\n}\n'
    },
    examples: [[[[['third', 0], ['second', 0], ['first', 0]]], 'first second third'], [[[['first', 0], ['second', 0], ['third', 0]]], 'first second third'], [[[['second', 0], ['first', 8], ['third', 3]]], 'first second third']],
    hidden: [[[[['third', 5], ['first', 5], ['second', 5]]], 'first second third'], [[[['first', 10], ['third', 0], ['second', 2]]], 'first second third'], [[[['second', 0], ['third', 0], ['first', 4]]], 'first second third'], [[[['third', 12], ['second', 6], ['first', 0]]], 'first second third'], [[[['first', 0], ['third', 1], ['second', 9]]], 'first second third']],
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const obj = new Cls(), out = [];
      await Promise.all(args[0].map(([name, ms]) => later(ms).then(() => obj[name](() => out.push(name)))));
      await later(5);
      return out.join(' ');
    },
    ref: class {
      constructor() { this.oneDone = new Promise((ok) => { this.one = ok; }); this.twoDone = new Promise((ok) => { this.two = ok; }); }
      async first(print) { print(); this.one(); }
      async second(print) { await this.oneDone; print(); this.two(); }
      async third(print) { await this.twoDone; print(); }
    }
  },
  'print-foobar-alternately': {
    fn: 'FooBar', params: ['n', 'delays'], cmp: 'exact', meta: ['Print FooBar Alternately', 'Medium', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'FooBar(n) is shared by two tasks: one calls foo(printFoo), which should print "foo" n times, and the other calls bar(printBar), which should print "bar" n times. Make the output alternate, foobarfoobar..., always starting with foo, whichever task starts first. Coordinate with promises, not spin loops. The tests start foo and bar after the delays given (in ms) and read the output.',
    sig: {
      py: 'class FooBar:',
      js: 'class FooBar {',
      java: 'class FooBar {',
      cpp: 'class FooBar {',
      go: 'type FooBar struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass FooBar:\n    def __init__(self, n):\n        pass\n\n    async def foo(self, printFoo):\n        pass\n\n    async def bar(self, printBar):\n        pass\n',
      js: 'class FooBar {\n  constructor(n) {\n  }\n  async foo(printFoo) {\n  }\n  async bar(printBar) {\n  }\n}\n',
      java: 'class FooBar {\n    public FooBar(int n) {\n    }\n    public void foo(Runnable printFoo) throws InterruptedException {\n    }\n    public void bar(Runnable printBar) throws InterruptedException {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass FooBar {\npublic:\n    FooBar(int n) {\n    }\n    void foo(function<void()> printFoo) {\n    }\n    void bar(function<void()> printBar) {\n    }\n};\n',
      go: 'package main\n\ntype FooBar struct {\n}\n\nfunc NewFooBar(n int) *FooBar {\n    return &FooBar{}\n}\n\nfunc (x *FooBar) Foo(printFoo func()) {\n}\n\nfunc (x *FooBar) Bar(printBar func()) {\n}\n'
    },
    examples: [[[1, [0, 0]], 'foobar'], [[3, [5, 0]], 'foobarfoobarfoobar'], [[2, [0, 6]], 'foobarfoobar']],
    hidden: [[[4, [0, 0]], 'foobarfoobarfoobarfoobar'], [[5, [3, 0]], 'foobarfoobarfoobarfoobarfoobar'], [[1, [9, 0]], 'foobar'], [[6, [0, 2]], 'foobarfoobarfoobarfoobarfoobarfoobar'], [[3, [1, 1]], 'foobarfoobarfoobar']],
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const [n, [df, db]] = args, obj = new Cls(n), out = [];
      await Promise.all([later(df).then(() => obj.foo(() => out.push('foo'))), later(db).then(() => obj.bar(() => out.push('bar')))]);
      await later(5);
      return out.join('');
    },
    ref: class {
      constructor(n) { this.n = n; this.fooGo = Promise.resolve(); this.barGo = new Promise((ok) => { this.letBar = ok; }); }
      async foo(printFoo) { for (let i = 0; i < this.n; i++) { await this.fooGo; this.fooGo = new Promise((ok) => { this.letFoo = ok; }); printFoo(); this.letBar(); } }
      async bar(printBar) { for (let i = 0; i < this.n; i++) { await this.barGo; this.barGo = new Promise((ok) => { this.letBar = ok; }); printBar(); this.letFoo(); } }
    }
  },
  'print-zero-even-odd': {
    fn: 'ZeroEvenOdd', params: ['n', 'delays'], cmp: 'exact', meta: ['Print Zero Even Odd', 'Medium', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'ZeroEvenOdd(n) is shared by three tasks calling zero(printNumber), even(printNumber) and odd(printNumber). Together they must print 0 1 0 2 0 3 ... 0 n: zero prints only zeros, odd only odd numbers and even only even numbers, each with printNumber(x). Coordinate with promises. The tests start zero, even and odd after the delays given (in ms) and join what was printed.',
    sig: {
      py: 'class ZeroEvenOdd:',
      js: 'class ZeroEvenOdd {',
      java: 'class ZeroEvenOdd {',
      cpp: 'class ZeroEvenOdd {',
      go: 'type ZeroEvenOdd struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass ZeroEvenOdd:\n    def __init__(self, n):\n        pass\n\n    async def zero(self, printNumber):\n        pass\n\n    async def even(self, printNumber):\n        pass\n\n    async def odd(self, printNumber):\n        pass\n',
      js: 'class ZeroEvenOdd {\n  constructor(n) {\n  }\n  async zero(printNumber) {\n  }\n  async even(printNumber) {\n  }\n  async odd(printNumber) {\n  }\n}\n',
      java: 'class ZeroEvenOdd {\n    public ZeroEvenOdd(int n) {\n    }\n    public void zero(Runnable printNumber) throws InterruptedException {\n    }\n    public void even(Runnable printNumber) throws InterruptedException {\n    }\n    public void odd(Runnable printNumber) throws InterruptedException {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass ZeroEvenOdd {\npublic:\n    ZeroEvenOdd(int n) {\n    }\n    void zero(function<void()> printNumber) {\n    }\n    void even(function<void()> printNumber) {\n    }\n    void odd(function<void()> printNumber) {\n    }\n};\n',
      go: 'package main\n\ntype ZeroEvenOdd struct {\n}\n\nfunc NewZeroEvenOdd(n int) *ZeroEvenOdd {\n    return &ZeroEvenOdd{}\n}\n\nfunc (x *ZeroEvenOdd) Zero(printNumber func()) {\n}\n\nfunc (x *ZeroEvenOdd) Even(printNumber func()) {\n}\n\nfunc (x *ZeroEvenOdd) Odd(printNumber func()) {\n}\n'
    },
    examples: [[[2, [0, 0, 0]], '0102'], [[5, [4, 0, 2]], '0102030405'], [[1, [0, 3, 0]], '01']],
    hidden: [[[3, [0, 0, 0]], '010203'], [[6, [2, 1, 0]], '010203040506'], [[4, [0, 7, 7]], '01020304'], [[7, [9, 0, 3]], '01020304050607'], [[8, [1, 2, 3]], '0102030405060708']],
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const [n, [dz, de, dd]] = args, obj = new Cls(n), out = [], print = (x) => out.push(String(x));
      await Promise.all([later(dz).then(() => obj.zero(print)), later(de).then(() => obj.even(print)), later(dd).then(() => obj.odd(print))]);
      await later(5);
      return out.join('');
    },
    ref: class {
      constructor(n) { this.n = n; this.open = {}; this.ready = { zero: Promise.resolve() }; this.shut('odd'); this.shut('even'); }
      shut(k) { this.ready[k] = new Promise((ok) => { this.open[k] = ok; }); }
      async zero(print) { for (let i = 1; i <= this.n; i++) { await this.ready.zero; this.shut('zero'); print(0); this.open[i % 2 ? 'odd' : 'even'](); } }
      async odd(print) { for (let i = 1; i <= this.n; i += 2) { await this.ready.odd; this.shut('odd'); print(i); this.open.zero(); } }
      async even(print) { for (let i = 2; i <= this.n; i += 2) { await this.ready.even; this.shut('even'); print(i); this.open.zero(); } }
    }
  },
  'building-h2o': {
    fn: 'H2O', params: ['atoms', 'gap'], cmp: 'any', meta: ['Building H2O', 'Medium', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'Each call to hydrogen(releaseHydrogen) or oxygen(releaseOxygen) is one atom waiting at a gate. Atoms may only leave in groups of three that make water: two hydrogens and one oxygen. Make each call wait until its group is complete, then call its release function. Within a group the order does not matter. The tests start one call per letter of atoms, in that order, gap ms apart, and read the letters released; any valid grouping passes.',
    sig: {
      py: 'class H2O:',
      js: 'class H2O {',
      java: 'class H2O {',
      cpp: 'class H2O {',
      go: 'type H2O struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass H2O:\n    def __init__(self):\n        pass\n\n    async def hydrogen(self, releaseHydrogen):\n        pass\n\n    async def oxygen(self, releaseOxygen):\n        pass\n',
      js: 'class H2O {\n  constructor() {\n  }\n  async hydrogen(releaseHydrogen) {\n  }\n  async oxygen(releaseOxygen) {\n  }\n}\n',
      java: 'class H2O {\n    public H2O() {\n    }\n    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n    }\n    public void oxygen(Runnable releaseOxygen) throws InterruptedException {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass H2O {\npublic:\n    H2O() {\n    }\n    void hydrogen(function<void()> releaseHydrogen) {\n    }\n    void oxygen(function<void()> releaseOxygen) {\n    }\n};\n',
      go: 'package main\n\ntype H2O struct {\n}\n\nfunc NewH2O() *H2O {\n    return &H2O{}\n}\n\nfunc (x *H2O) Hydrogen(releaseHydrogen func()) {\n}\n\nfunc (x *H2O) Oxygen(releaseOxygen func()) {\n}\n'
    },
    examples: [[['HHO', 0], 'HHO'], [['OOHHHH', 0], 'HHOHHO'], [['OHHHOH', 2], 'HHOHHO']],
    hidden: [[['HOH', 1], 'HHO'], [['OOOHHHHHH', 0], 'HHOHHOHHO'], [['HHHHHHOOO', 1], 'HHOHHOHHO'], [['HOHHOHOHH', 0], 'HHOHHOHHO'], [['OHOHHHOHH', 2], 'HHOHHOHHO']],
    check: function (args, got) {
      const atoms = args[0];
      if (typeof got !== 'string' || got.length !== atoms.length) return false;
      if (got.split('').sort().join('') !== atoms.split('').sort().join('')) return false;
      for (let i = 0; i < got.length; i += 3) { const g = got.slice(i, i + 3).split('').sort().join(''); if (g !== 'HHO') return false; }
      return true;
    },
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const [atoms, gap] = args, obj = new Cls(), out = [];
      await Promise.all(atoms.split('').map((a, i) => later(i * gap).then(() => (a === 'H' ? obj.hydrogen(() => out.push('H')) : obj.oxygen(() => out.push('O'))))));
      await later(5);
      return out.join('');
    },
    ref: class {
      constructor() { this.h = []; this.o = []; }
      hydrogen(release) { return new Promise((done) => { this.h.push(() => { release(); done(); }); this.bond(); }); }
      oxygen(release) { return new Promise((done) => { this.o.push(() => { release(); done(); }); this.bond(); }); }
      bond() { while (this.h.length >= 2 && this.o.length >= 1) { this.h.shift()(); this.h.shift()(); this.o.shift()(); } }
    }
  },
  'fizz-buzz-multithreaded': {
    fn: 'FizzBuzz', params: ['n', 'delays'], cmp: 'exact', meta: ['Fizz Buzz Multithreaded', 'Medium', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'FizzBuzz(n) is shared by four tasks calling fizz(printFizz), buzz(printBuzz), fizzbuzz(printFizzBuzz) and number(printNumber). Together they must go through 1 to n in order: for a multiple of 15 the fizzbuzz task calls printFizzBuzz(), for other multiples of 3 the fizz task calls printFizz(), for other multiples of 5 the buzz task calls printBuzz(), and every other number is printed by the number task with printNumber(i). Coordinate with promises. The tests start the four calls after the delays given (in ms, in the order fizz, buzz, fizzbuzz, number) and join what was printed.',
    sig: {
      py: 'class FizzBuzz:',
      js: 'class FizzBuzz {',
      java: 'class FizzBuzz {',
      cpp: 'class FizzBuzz {',
      go: 'type FizzBuzz struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass FizzBuzz:\n    def __init__(self, n):\n        pass\n\n    async def fizz(self, printFizz):\n        pass\n\n    async def buzz(self, printBuzz):\n        pass\n\n    async def fizzbuzz(self, printFizzBuzz):\n        pass\n\n    async def number(self, printNumber):\n        pass\n',
      js: 'class FizzBuzz {\n  constructor(n) {\n  }\n  async fizz(printFizz) {\n  }\n  async buzz(printBuzz) {\n  }\n  async fizzbuzz(printFizzBuzz) {\n  }\n  async number(printNumber) {\n  }\n}\n',
      java: 'class FizzBuzz {\n    public FizzBuzz(int n) {\n    }\n    public void fizz(Runnable printFizz) throws InterruptedException {\n    }\n    public void buzz(Runnable printBuzz) throws InterruptedException {\n    }\n    public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n    }\n    public void number(Runnable printNumber) throws InterruptedException {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass FizzBuzz {\npublic:\n    FizzBuzz(int n) {\n    }\n    void fizz(function<void()> printFizz) {\n    }\n    void buzz(function<void()> printBuzz) {\n    }\n    void fizzbuzz(function<void()> printFizzBuzz) {\n    }\n    void number(function<void()> printNumber) {\n    }\n};\n',
      go: 'package main\n\ntype FizzBuzz struct {\n}\n\nfunc NewFizzBuzz(n int) *FizzBuzz {\n    return &FizzBuzz{}\n}\n\nfunc (x *FizzBuzz) Fizz(printFizz func()) {\n}\n\nfunc (x *FizzBuzz) Buzz(printBuzz func()) {\n}\n\nfunc (x *FizzBuzz) Fizzbuzz(printFizzBuzz func()) {\n}\n\nfunc (x *FizzBuzz) Number(printNumber func()) {\n}\n'
    },
    examples: [[[5, [0, 0, 0, 0]], '1 2 fizz 4 buzz'], [[15, [3, 2, 1, 0]], '1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz'], [[1, [0, 0, 0, 5]], '1']],
    hidden: [[[3, [5, 0, 0, 0]], '1 2 fizz'], [[16, [0, 4, 8, 2]], '1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz 16'], [[10, [1, 1, 1, 1]], '1 2 fizz 4 buzz fizz 7 8 fizz buzz'], [[30, [0, 0, 6, 0]], '1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz 16 17 fizz 19 buzz fizz 22 23 fizz buzz 26 fizz 28 29 fizzbuzz'], [[2, [0, 0, 0, 0]], '1 2']],
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const [n, d] = args, obj = new Cls(n), out = [];
      await Promise.all([
        later(d[0]).then(() => obj.fizz(() => out.push('fizz'))),
        later(d[1]).then(() => obj.buzz(() => out.push('buzz'))),
        later(d[2]).then(() => obj.fizzbuzz(() => out.push('fizzbuzz'))),
        later(d[3]).then(() => obj.number((x) => out.push(String(x))))
      ]);
      await later(5);
      return out.join(' ');
    },
    ref: class {
      constructor(n) { this.n = n; this.i = 1; this.waiting = []; }
      kind(i) { return i % 15 === 0 ? 'fizzbuzz' : i % 3 === 0 ? 'fizz' : i % 5 === 0 ? 'buzz' : 'number'; }
      async run(k, act) {
        for (;;) {
          while (this.i <= this.n && this.kind(this.i) !== k) await new Promise((ok) => this.waiting.push(ok));
          if (this.i > this.n) return;
          act(this.i);
          this.i++;
          this.waiting.splice(0).forEach((wake) => wake());
        }
      }
      fizz(printFizz) { return this.run('fizz', () => printFizz()); }
      buzz(printBuzz) { return this.run('buzz', () => printBuzz()); }
      fizzbuzz(printFizzBuzz) { return this.run('fizzbuzz', () => printFizzBuzz()); }
      number(printNumber) { return this.run('number', (i) => printNumber(i)); }
    }
  },
  'the-dining-philosophers': {
    fn: 'DiningPhilosophers', params: ['meals', 'delays'], cmp: 'exact', meta: ['The Dining Philosophers', 'Medium', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'Five philosophers (0 to 4) sit around a table with one fork between each pair: philosopher p\'s left fork is fork p and the right fork is fork (p + 1) mod 5. Each meal is a call to wantsToEat(philosopher, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork): pick up both forks, call eat() (it returns a promise; wait for it), then put both forks down. A fork can be held by one philosopher at a time, and nobody may wait forever. The tests run each philosopher\'s meals one after another, starting philosopher p after delays[p] ms, and report the meals eaten and any clashes (a fork picked up while someone holds it, eating without both forks, or putting down a fork not held).',
    sig: {
      py: 'class DiningPhilosophers:',
      js: 'class DiningPhilosophers {',
      java: 'class DiningPhilosophers {',
      cpp: 'class DiningPhilosophers {',
      go: 'type DiningPhilosophers struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass DiningPhilosophers:\n    async def wantsToEat(self, philosopher, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork):\n        pass\n',
      js: 'class DiningPhilosophers {\n  constructor() {\n  }\n  async wantsToEat(philosopher, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork) {\n  }\n}\n',
      java: 'class DiningPhilosophers {\n    public DiningPhilosophers() {\n    }\n    public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork, Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass DiningPhilosophers {\npublic:\n    void wantsToEat(int philosopher, function<void()> pickLeftFork, function<void()> pickRightFork, function<void()> eat, function<void()> putLeftFork, function<void()> putRightFork) {\n    }\n};\n',
      go: 'package main\n\ntype DiningPhilosophers struct {\n}\n\nfunc (d *DiningPhilosophers) WantsToEat(philosopher int, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork func()) {\n}\n'
    },
    examples: [[[1, [0, 0, 0, 0, 0]], { meals: [1, 1, 1, 1, 1], clashes: 0 }], [[2, [4, 3, 2, 1, 0]], { meals: [2, 2, 2, 2, 2], clashes: 0 }], [[1, [0, 5, 0, 5, 0]], { meals: [1, 1, 1, 1, 1], clashes: 0 }]],
    hidden: [[[3, [0, 0, 0, 0, 0]], { meals: [3, 3, 3, 3, 3], clashes: 0 }], [[2, [0, 1, 2, 3, 4]], { meals: [2, 2, 2, 2, 2], clashes: 0 }], [[1, [6, 0, 6, 0, 6]], { meals: [1, 1, 1, 1, 1], clashes: 0 }], [[3, [2, 0, 1, 0, 2]], { meals: [3, 3, 3, 3, 3], clashes: 0 }], [[2, [0, 0, 9, 0, 0]], { meals: [2, 2, 2, 2, 2], clashes: 0 }]],
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const [meals, delays] = args, obj = new Cls(), holder = [null, null, null, null, null], eaten = [0, 0, 0, 0, 0];
      let clashes = 0;
      const pick = (p, f) => () => { if (holder[f] !== null) clashes++; else holder[f] = p; };
      const put = (p, f) => () => { if (holder[f] !== p) clashes++; else holder[f] = null; };
      const eat = (p) => () => { if (holder[p] !== p || holder[(p + 1) % 5] !== p) clashes++; eaten[p]++; return later(1); };
      await Promise.all(delays.map((ms, p) => later(ms).then(async () => {
        for (let k = 0; k < meals; k++) await obj.wantsToEat(p, pick(p, p), pick(p, (p + 1) % 5), eat(p), put(p, p), put(p, (p + 1) % 5));
      })));
      return { meals: eaten, clashes };
    },
    ref: class {
      constructor() { this.turn = Promise.resolve(); }
      wantsToEat(p, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork) {
        const meal = this.turn.then(async () => { pickLeftFork(); pickRightFork(); await eat(); putLeftFork(); putRightFork(); });
        this.turn = meal.catch(() => {});
        return meal;
      }
    }
  },
  'traffic-light-controlled-intersection': {
    fn: 'TrafficLight', params: ['cars'], cmp: 'exact', meta: ['Traffic Light Controlled Intersection', 'Easy', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'Two roads, 1 and 2, cross at one light, which starts green for road 1. Each car calls carArrived(carId, roadId, direction, turnGreen, crossCar). A car may only cross while its own road is green; turnGreen() makes the light green for the calling car\'s road and must not be called when it already is. crossCar() returns a promise; the car is in the crossing until it settles. Cars from different roads must never be in the crossing at the same time. The tests start each car [carId, roadId, delay in ms] and report how many crossed and how many mistakes were made.',
    sig: {
      py: 'class TrafficLight:',
      js: 'class TrafficLight {',
      java: 'class TrafficLight {',
      cpp: 'class TrafficLight {',
      go: 'type TrafficLight struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass TrafficLight:\n    def __init__(self):\n        pass\n\n    async def carArrived(self, carId, roadId, direction, turnGreen, crossCar):\n        pass\n',
      js: 'class TrafficLight {\n  constructor() {\n  }\n  async carArrived(carId, roadId, direction, turnGreen, crossCar) {\n  }\n}\n',
      java: 'class TrafficLight {\n    public TrafficLight() {\n    }\n    public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) {\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass TrafficLight {\npublic:\n    void carArrived(int carId, int roadId, int direction, function<void()> turnGreen, function<void()> crossCar) {\n    }\n};\n',
      go: 'package main\n\ntype TrafficLight struct {\n}\n\nfunc (t *TrafficLight) CarArrived(carId, roadId, direction int, turnGreen, crossCar func()) {\n}\n'
    },
    examples: [[[[[1, 1, 0], [2, 2, 0]]], { crossed: 2, mistakes: 0 }], [[[[1, 2, 0], [2, 2, 1], [3, 1, 1]]], { crossed: 3, mistakes: 0 }], [[[[1, 1, 0], [2, 1, 0], [3, 2, 0], [4, 1, 3]]], { crossed: 4, mistakes: 0 }]],
    hidden: [[[[[1, 2, 0], [2, 1, 0], [3, 2, 0], [4, 1, 0]]], { crossed: 4, mistakes: 0 }], [[[[1, 1, 5]]], { crossed: 1, mistakes: 0 }], [[[[1, 2, 0], [2, 2, 0], [3, 2, 0]]], { crossed: 3, mistakes: 0 }], [[[[1, 1, 0], [2, 2, 2], [3, 1, 4], [4, 2, 6], [5, 1, 8]]], { crossed: 5, mistakes: 0 }], [[[[1, 2, 3], [2, 1, 3], [3, 2, 3], [4, 1, 0], [5, 2, 0]]], { crossed: 5, mistakes: 0 }]],
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const obj = new Cls(), inside = { 1: 0, 2: 0 };
      let light = 1, crossed = 0, mistakes = 0;
      await Promise.all(args[0].map(([id, road, ms]) => later(ms).then(() => obj.carArrived(id, road, road === 1 ? 1 + (id % 2) : 3 + (id % 2),
        () => { if (light === road || inside[light]) mistakes++; light = road; },
        () => {
          if (light !== road || inside[road === 1 ? 2 : 1]) mistakes++;
          inside[road]++; crossed++;
          return later(2).then(() => { inside[road]--; });
        }))));
      await later(5);
      return { crossed, mistakes };
    },
    ref: class {
      constructor() { this.green = 1; this.turn = Promise.resolve(); }
      carArrived(carId, roadId, direction, turnGreen, crossCar) {
        const go = this.turn.then(async () => { if (this.green !== roadId) { turnGreen(); this.green = roadId; } await crossCar(); });
        this.turn = go.catch(() => {});
        return go;
      }
    }
  },
  'design-bounded-blocking-queue': {
    fn: 'BoundedBlockingQueue', params: ['capacity', 'producers', 'consumers'], cmp: 'exact', meta: ['Design Bounded Blocking Queue', 'Medium', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'Build a first-in, first-out queue holding at most capacity items, shared by producer and consumer tasks. enqueue(x) adds x, but if the queue is full it waits (its promise stays pending) until there is room. dequeue() removes and returns the oldest item, waiting while the queue is empty. size() returns how many items are in it now. The tests run each producer\'s items one by one and each consumer\'s count of dequeues, all at once. They report what was consumed (in order when there is one producer and one consumer, otherwise sorted), whether the queue ever held more than capacity, and the final size.',
    sig: {
      py: 'class BoundedBlockingQueue:',
      js: 'class BoundedBlockingQueue {',
      java: 'class BoundedBlockingQueue {',
      cpp: 'class BoundedBlockingQueue {',
      go: 'type BoundedBlockingQueue struct {'
    },
    starter: {
      py: 'import asyncio\n\nclass BoundedBlockingQueue:\n    def __init__(self, capacity: int):\n        pass\n\n    async def enqueue(self, element: int) -> None:\n        pass\n\n    async def dequeue(self) -> int:\n        pass\n\n    def size(self) -> int:\n        pass\n',
      js: 'class BoundedBlockingQueue {\n  constructor(capacity) {\n  }\n  async enqueue(element) {\n  }\n  async dequeue() {\n  }\n  size() {\n  }\n}\n',
      java: 'class BoundedBlockingQueue {\n    public BoundedBlockingQueue(int capacity) {\n    }\n    public void enqueue(int element) throws InterruptedException {\n    }\n    public int dequeue() throws InterruptedException {\n        return 0;\n    }\n    public int size() {\n        return 0;\n    }\n}\n',
      cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nclass BoundedBlockingQueue {\npublic:\n    BoundedBlockingQueue(int capacity) {\n    }\n    void enqueue(int element) {\n    }\n    int dequeue() {\n        return 0;\n    }\n    int size() {\n        return 0;\n    }\n};\n',
      go: 'package main\n\ntype BoundedBlockingQueue struct {\n}\n\nfunc NewBoundedBlockingQueue(capacity int) *BoundedBlockingQueue {\n    return &BoundedBlockingQueue{}\n}\n\nfunc (q *BoundedBlockingQueue) Enqueue(element int) {\n}\n\nfunc (q *BoundedBlockingQueue) Dequeue() int {\n    return 0\n}\n\nfunc (q *BoundedBlockingQueue) Size() int {\n    return 0\n}\n'
    },
    examples: [[[1, [[1, 2, 3]], [3]], { consumed: [1, 2, 3], overfull: false, left: 0 }], [[2, [[5, 6], [7, 8]], [1, 2]], { consumed: [5, 6, 7], overfull: false, left: 1 }], [[3, [[9]], [1]], { consumed: [9], overfull: false, left: 0 }]],
    hidden: [[[2, [[1, 2, 3, 4, 5, 6]], [6]], { consumed: [1, 2, 3, 4, 5, 6], overfull: false, left: 0 }], [[1, [[1, 2], [3, 4], [5, 6]], [3, 3]], { consumed: [1, 2, 3, 4, 5, 6], overfull: false, left: 0 }], [[4, [[10, 20, 30]], [1]], { consumed: [10], overfull: false, left: 2 }], [[2, [[]], []], { consumed: [], overfull: false, left: 0 }], [[3, [[1, 2, 3, 4], [5, 6, 7, 8]], [2, 2, 2, 2]], { consumed: [1, 2, 3, 4, 5, 6, 7, 8], overfull: false, left: 0 }]],
    drive: async function (Cls, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const [capacity, producers, consumers] = args, q = new Cls(capacity), got = [];
      let overfull = false;
      const look = () => { if (q.size() > capacity) overfull = true; };
      const tasks = [];
      consumers.forEach((count) => tasks.push((async () => { for (let i = 0; i < count; i++) { await later(1); const x = await q.dequeue(); got.push(x === undefined ? null : x); look(); } })()));
      producers.forEach((items, k) => tasks.push(later(k).then(async () => { for (const x of items) { await q.enqueue(x); look(); } })));
      await Promise.all(tasks.slice(consumers.length));
      await Promise.race([Promise.all(tasks), later(300)]);
      const single = producers.length === 1 && consumers.length === 1;
      return { consumed: single ? got : got.slice().sort((a, b) => a - b), overfull, left: q.size() };
    },
    ref: class {
      constructor(capacity) { this.cap = capacity; this.q = []; this.putters = []; this.takers = []; }
      async enqueue(x) { while (this.q.length >= this.cap) await new Promise((ok) => this.putters.push(ok)); this.q.push(x); const t = this.takers.shift(); if (t) t(); }
      async dequeue() { while (!this.q.length) await new Promise((ok) => this.takers.push(ok)); const x = this.q.shift(); const p = this.putters.shift(); if (p) p(); return x; }
      size() { return this.q.length; }
    }
  },
  'web-crawler-multithreaded': {
    fn: 'crawl', params: ['pages', 'links', 'start'], cmp: 'exact', meta: ['Web Crawler Multithreaded', 'Medium', 'Concurrency'],
    langs: ['js'], langNote: 'This one is about tasks taking turns, and here the tasks are JavaScript promises, so it runs in JavaScript. Switch to JS to run it. The other starters are for reading, or for running in your own IDE with real threads.',
    ask: 'Write crawl(startUrl, htmlParser). htmlParser.getUrls(url) returns a promise of the links on that page, and each fetch takes a moment, so fetch several pages at once instead of one after another. Return every page reachable from startUrl by following links that stay on the same host name as startUrl (the part between "http://" and the next "/"), startUrl included, in any order, fetching each page once. The tests describe the web as a list of pages, links [from, to] between page indexes and the start page\'s index, and report the pages found (sorted), whether more than one fetch was ever running at once, and how many pages were fetched twice.',
    sig: {
      py: 'async def crawl(startUrl: str, htmlParser) -> List[str]:',
      js: 'async function crawl(startUrl, htmlParser) {',
      java: 'public List<String> crawl(String startUrl, HtmlParser htmlParser) {',
      cpp: 'vector<string> crawl(string startUrl, HtmlParser htmlParser) {',
      go: 'func crawl(startUrl string, htmlParser HtmlParser) []string {'
    },
    examples: [[[['http://owl.dev/a', 'http://owl.dev/b', 'http://owl.dev/c'], [[0, 1], [0, 2]], 0], { found: ['http://owl.dev/a', 'http://owl.dev/b', 'http://owl.dev/c'], parallel: true, twice: 0 }], [[['http://owl.dev/home', 'http://elsewhere.org/x'], [[0, 1]], 0], { found: ['http://owl.dev/home'], parallel: false, twice: 0 }], [[['http://a.io/1', 'http://a.io/2', 'http://a.io/3'], [[0, 1], [1, 2], [2, 0]], 1], { found: ['http://a.io/1', 'http://a.io/2', 'http://a.io/3'], parallel: false, twice: 0 }]],
    hidden: [[[['http://x.org/', 'http://x.org/p1', 'http://x.org/p2', 'http://x.org/p3', 'http://y.org/', 'http://x.org/p4'], [[0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [3, 5], [5, 0]], 0], { found: ['http://x.org/', 'http://x.org/p1', 'http://x.org/p2', 'http://x.org/p3', 'http://x.org/p4'], parallel: true, twice: 0 }], [[['http://solo.net/only'], [], 0], { found: ['http://solo.net/only'], parallel: false, twice: 0 }], [[['http://m.co/a', 'http://m.co/b', 'http://n.co/c', 'http://m.co/d'], [[0, 1], [1, 2], [2, 3]], 0], { found: ['http://m.co/a', 'http://m.co/b'], parallel: false, twice: 0 }], [[['http://w.dev/1', 'http://w.dev/2', 'http://w.dev/3', 'http://w.dev/4', 'http://w.dev/5'], [[1, 0], [1, 2], [1, 3], [1, 4], [4, 1], [3, 0]], 1], { found: ['http://w.dev/1', 'http://w.dev/2', 'http://w.dev/3', 'http://w.dev/4', 'http://w.dev/5'], parallel: true, twice: 0 }], [[['http://q.ai/a', 'http://q.ai/b', 'http://q.ai/c', 'http://q.ai/d'], [[0, 1], [0, 2], [1, 3], [2, 3]], 0], { found: ['http://q.ai/a', 'http://q.ai/b', 'http://q.ai/c', 'http://q.ai/d'], parallel: true, twice: 0 }]],
    drive: async function (f, args) {
      const later = (ms) => new Promise((ok) => setTimeout(ok, ms));
      const [pages, links, start] = args, count = new Map();
      let running = 0, most = 0;
      const parser = {
        getUrls: (url) => {
          count.set(url, (count.get(url) || 0) + 1);
          running++; most = Math.max(most, running);
          const i = pages.indexOf(url), out = links.filter(([a]) => a === i).map(([, b]) => pages[b]);
          return later(3).then(() => { running--; return out; });
        }
      };
      const found = await f(pages[start], parser);
      if (!Array.isArray(found)) throw new Error('crawl must return a list of pages');
      return { found: [...new Set(found)].sort(), parallel: most > 1, twice: [...count.values()].filter((c) => c > 1).length };
    },
    ref: async function (startUrl, htmlParser) {
      const host = (u) => u.split('/')[2], seen = new Set([startUrl]);
      let level = [startUrl];
      while (level.length) {
        const lists = await Promise.all(level.map((u) => htmlParser.getUrls(u)));
        const next = [];
        for (const list of lists) for (const v of list) if (host(v) === host(startUrl) && !seen.has(v)) { seen.add(v); next.push(v); }
        level = next;
      }
      return [...seen];
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
// Specs with a driver may answer later: runRefAsync always returns a Promise.
function refRunner() { return typeof __ioCall === 'function' ? { __ioCall, __ioMake, __ioRead, IO_NODES } : require('./runner.js'); }
function runRef(spec, args) {
  if (spec.drive) throw new Error('This problem is checked by a driver: use runRefAsync.');
  const R = refRunner();
  const out = R.__ioCall(spec.ref, JSON.parse(JSON.stringify(args)), spec.io, R.IO_NODES);
  return out === undefined ? undefined : JSON.parse(JSON.stringify(out));
}
function runRefAsync(spec, args) {
  if (!spec.drive) { try { return Promise.resolve(runRef(spec, args)); } catch (e) { return Promise.reject(e); } }
  const R = refRunner();
  const H = { make: (k, v, c) => R.__ioMake(k, v, c || {}, R.IO_NODES), read: (k, r, c) => R.__ioRead(k, r, c || {}) };
  return Promise.resolve(spec.drive(spec.ref, JSON.parse(JSON.stringify(args)), H)).then((out) => (out === undefined ? undefined : JSON.parse(JSON.stringify(out))));
}
// Can this spec run in lang here?
function specRuns(spec, lang) { return !!spec && !!RUNNABLE[lang] && (!spec.langs || spec.langs.includes(lang)); }
// Problems without a story carry their own title, number, difficulty and pattern.
function specInfo(id) {
  const spec = TEST_SPECS[id];
  const P = typeof PROBLEMS !== 'undefined' ? PROBLEMS.find((p) => p.id === id) : null;
  if (P) return { id, title: P.title, diff: P.diff, pattern: P.pattern, story: P.story, time: P.time };
  const m = spec.meta || [];
  return { id, title: m[0], diff: m[1], pattern: m[2], story: null, time: null };
}
if (typeof module !== 'undefined' && module.exports) module.exports = { TEST_SPECS, CODE_LANGS, RUNNABLE, starterCode, showValue, showArgs, sameResult, judge, runRef, runRefAsync, specRuns, specInfo };
// @@END-TESTS-SPEC@@
