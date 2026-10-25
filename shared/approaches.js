// @@APPROACHES@@ — generated block (from shared/approaches.js): several ways to solve a problem, slow to fast.
// APPROACHES[problem id] = 2 or 3 approaches, from brute force to best. The page names them with approachTiers():
// two approaches read Brute force, Best; three read Brute force, Better, Best. Each approach has
//   name      a short name
//   idea      the idea in one plain sentence
//   time, space   its complexity, and why   one line on where both come from
//   slow      true when it is too slow for big inputs (tests/approachcheck.js then runs it on the visible examples only)
//   js        a full JavaScript solution, named as the starter code names it
//   py        the same in Python, where it is practical
//   pitfalls  1 to 3 common mistakes
// The best approach meets the problem's target in shared/facts.js. Every solution passes the problem's tests.
// Write code without backticks or dollar-brace, since each solution sits in a template string.
const APPROACHES = {
  'valid-palindrome': [
    { name: 'Clean copy and reverse', idea: 'Keep only letters and digits in lower case, then compare that string with its reverse.',
      time: 'O(n)', space: 'O(n)', why: 'One pass to clean, one to reverse; the cleaned copy is as long as s.',
      js: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}`,
      py: `def isPalindrome(s):
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]`,
      pitfalls: ['Forgetting digits count as characters to compare.', 'Comparing before lower-casing, so "A" and "a" look different.'] },
    { name: 'Two pointers from the ends', idea: 'Walk one pointer in from each end, skip anything that is not a letter or digit, and compare as you go.',
      time: 'O(n)', space: 'O(1)', why: 'Each character is passed once, and only two indexes are kept.',
      js: `function isPalindrome(s) {
  const ok = (c) => /[a-z0-9]/i.test(c);
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (!ok(s[l])) { l++; continue; }
    if (!ok(s[r])) { r--; continue; }
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}`,
      py: `def isPalindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        if not s[l].isalnum():
            l += 1
        elif not s[r].isalnum():
            r -= 1
        else:
            if s[l].lower() != s[r].lower():
                return False
            l += 1
            r -= 1
    return True`,
      pitfalls: ['Skipping on both sides in one step and running past each other.', 'Using l <= r is fine, but l < r saves comparing the middle letter with itself.'] }
  ],
  'move-zeroes': [
    { name: 'Copy the non-zeros out', idea: 'Collect the non-zero numbers in order, then write them back and fill the rest with zeros.',
      time: 'O(n)', space: 'O(n)', why: 'Two passes over nums, plus a second list of up to n numbers.',
      js: `function moveZeroes(nums) {
  const keep = nums.filter((x) => x !== 0);
  for (let i = 0; i < nums.length; i++) nums[i] = i < keep.length ? keep[i] : 0;
}`,
      py: `def moveZeroes(nums):
    keep = [x for x in nums if x != 0]
    for i in range(len(nums)):
        nums[i] = keep[i] if i < len(keep) else 0`,
      pitfalls: ['Returning a new list instead of changing nums itself.'] },
    { name: 'Writer and reader', idea: 'A writer index marks where the next non-zero goes. A reader walks ahead and swaps each non-zero back to the writer.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two indexes, and swaps in place.',
      js: `function moveZeroes(nums) {
  let w = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== 0) {
      [nums[w], nums[r]] = [nums[r], nums[w]];
      w++;
    }
  }
}`,
      py: `def moveZeroes(nums):
    w = 0
    for r in range(len(nums)):
        if nums[r] != 0:
            nums[w], nums[r] = nums[r], nums[w]
            w += 1`,
      pitfalls: ['Moving zeros to the back with splice, which shifts everything and costs O(n²).', 'Forgetting to move the writer only after a non-zero.'] }
  ],
  'remove-duplicates-from-sorted-array': [
    { name: 'Set, then copy back', idea: 'Put the values in a set to drop repeats, then write them back to the front in order.',
      time: 'O(n)', space: 'O(n)', why: 'One pass to build the set and one to copy; the set can hold every value.',
      js: `function removeDuplicates(nums) {
  const vals = [...new Set(nums)];
  vals.forEach((v, i) => { nums[i] = v; });
  return vals.length;
}`,
      py: `def removeDuplicates(nums):
    vals = list(dict.fromkeys(nums))
    nums[:len(vals)] = vals
    return len(vals)`,
      pitfalls: ['A plain Python set loses the order; dict.fromkeys keeps it.'] },
    { name: 'Write when it changes', idea: 'Sorted means repeats sit together. Keep a writer, and copy a value only when it differs from the last one written.',
      time: 'O(n)', space: 'O(1)', why: 'One pass with two indexes, no extra list.',
      js: `function removeDuplicates(nums) {
  let k = 0;
  for (const x of nums) if (k === 0 || x !== nums[k - 1]) nums[k++] = x;
  return k;
}`,
      py: `def removeDuplicates(nums):
    k = 0
    for x in nums:
        if k == 0 or x != nums[k - 1]:
            nums[k] = x
            k += 1
    return k`,
      pitfalls: ['Comparing with the reader neighbour after you overwrote it; compare with the last written value.', 'An empty list should give 0.'] }
  ],
  'squares-of-a-sorted-array': [
    { name: 'Square, then sort', idea: 'Square every number and sort the result.',
      time: 'O(n log n)', space: 'O(n)', why: 'The sort sets the time; the answer list is the only extra memory.',
      js: `function sortedSquares(nums) {
  return nums.map((x) => x * x).sort((a, b) => a - b);
}`,
      py: `def sortedSquares(nums):
    return sorted(x * x for x in nums)`,
      pitfalls: ['JavaScript sorts as text without a compare function: [1, 100, 4] stays in that order.'] },
    { name: 'Biggest squares from the ends', idea: 'The largest square is at one of the two ends. Compare the ends and fill the answer from the back.',
      time: 'O(n)', space: 'O(1)', why: 'Each number is placed once; besides the answer only two indexes are kept.',
      js: `function sortedSquares(nums) {
  const out = new Array(nums.length);
  let l = 0, r = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) { out[i] = nums[l] * nums[l]; l++; }
    else { out[i] = nums[r] * nums[r]; r--; }
  }
  return out;
}`,
      py: `def sortedSquares(nums):
    out = [0] * len(nums)
    l, r = 0, len(nums) - 1
    for i in range(len(nums) - 1, -1, -1):
        if abs(nums[l]) > abs(nums[r]):
            out[i] = nums[l] * nums[l]
            l += 1
        else:
            out[i] = nums[r] * nums[r]
            r -= 1
    return out`,
      pitfalls: ['Filling from the front: the smallest square can be in the middle.'] }
  ],
  'merge-sorted-array': [
    { name: 'Copy in and sort', idea: 'Put nums2 into the spare slots at the end of nums1, then sort nums1.',
      time: 'O((m + n) log(m + n))', space: 'O(1)', why: 'The sort costs the most; it works in place.',
      js: `function merge(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) nums1[m + i] = nums2[i];
  nums1.sort((a, b) => a - b);
}`,
      py: `def merge(nums1, m, nums2, n):
    nums1[m:] = nums2[:n]
    nums1.sort()`,
      pitfalls: ['nums1 = sorted(...) in Python makes a new list; the tests read the old one.'] },
    { name: 'Fill from the back', idea: 'Compare the last real values of both lists and put the bigger one in the last free slot, moving left.',
      time: 'O(m + n)', space: 'O(1)', why: 'Each slot is written once, and the spare zeros give room so nothing is overwritten too early.',
      js: `function merge(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, w = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[w--] = nums1[i--];
    else nums1[w--] = nums2[j--];
  }
}`,
      py: `def merge(nums1, m, nums2, n):
    i, j, w = m - 1, n - 1, m + n - 1
    while j >= 0:
        if i >= 0 and nums1[i] > nums2[j]:
            nums1[w] = nums1[i]
            i -= 1
        else:
            nums1[w] = nums2[j]
            j -= 1
        w -= 1`,
      pitfalls: ['Filling from the front overwrites nums1 values you still need.', 'Stopping when nums1 runs out leaves nums2 values behind; loop until nums2 is done.'] }
  ],
  'merge-two-lists': [
    { name: 'Collect, sort, rebuild', idea: 'Read every value from both lists, sort them, and build a new list.',
      time: 'O((n + m) log(n + m))', space: 'O(n + m)', why: 'The sort costs the most, and the values are copied into an array.',
      js: `function mergeTwoLists(list1, list2) {
  const vals = [];
  for (let n = list1; n; n = n.next) vals.push(n.val);
  for (let n = list2; n; n = n.next) vals.push(n.val);
  vals.sort((a, b) => a - b);
  let head = null;
  for (let i = vals.length - 1; i >= 0; i--) head = new ListNode(vals[i], head);
  return head;
}`,
      py: `def mergeTwoLists(list1, list2):
    vals = []
    for n in (list1, list2):
        while n:
            vals.append(n.val)
            n = n.next
    head = None
    for v in sorted(vals, reverse=True):
        head = ListNode(v, head)
    return head`,
      pitfalls: ['It ignores that both lists are already sorted, so it does extra work.'] },
    { name: 'Zip with a dummy head', idea: 'Start a dummy node. Each step, link the smaller of the two front nodes and move that list on. Link whatever is left at the end.',
      time: 'O(n + m)', space: 'O(1)', why: 'Every node is linked once, and no new nodes are made.',
      js: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) { tail.next = list1; list1 = list1.next; }
    else { tail.next = list2; list2 = list2.next; }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`,
      py: `def mergeTwoLists(list1, list2):
    dummy = tail = ListNode(0)
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next, list1 = list1, list1.next
        else:
            tail.next, list2 = list2, list2.next
        tail = tail.next
    tail.next = list1 or list2
    return dummy.next`,
      pitfalls: ['Forgetting to attach the leftover list after the loop.', 'Returning dummy instead of dummy.next.'] }
  ],
  'two-sum-ii': [
    { name: 'Try every pair', idea: 'Check each pair of positions until two values add up to target.',
      time: 'O(n²)', space: 'O(1)', why: 'There are about n²/2 pairs.', slow: true,
      js: `function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length; i++)
    for (let j = i + 1; j < numbers.length; j++)
      if (numbers[i] + numbers[j] === target) return [i + 1, j + 1];
  return [];
}`,
      py: `def twoSum(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]
    return []`,
      pitfalls: ['The answer is 1-based; returning 0-based indexes fails every test.'] },
    { name: 'Binary search the partner', idea: 'For each value, binary search the rest of the list for target minus that value.',
      time: 'O(n log n)', space: 'O(1)', why: 'n searches of O(log n) each.',
      js: `function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    const want = target - numbers[i];
    let lo = i + 1, hi = numbers.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (numbers[mid] === want) return [i + 1, mid + 1];
      if (numbers[mid] < want) lo = mid + 1; else hi = mid - 1;
    }
  }
  return [];
}`,
      py: `def twoSum(numbers, target):
    for i, x in enumerate(numbers):
        lo, hi = i + 1, len(numbers) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if numbers[mid] == target - x:
                return [i + 1, mid + 1]
            if numbers[mid] < target - x:
                lo = mid + 1
            else:
                hi = mid - 1
    return []`,
      pitfalls: ['Searching from 0 instead of i + 1 can pair a value with itself.'] },
    { name: 'Squeeze from both ends', idea: 'Start at both ends. If the sum is too small, move the left pointer right; if too big, move the right pointer left.',
      time: 'O(n)', space: 'O(1)', why: 'Each step moves one pointer inward, so there are at most n steps.',
      js: `function twoSum(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum < target) l++; else r--;
  }
  return [];
}`,
      py: `def twoSum(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        s = numbers[l] + numbers[r]
        if s == target:
            return [l + 1, r + 1]
        if s < target:
            l += 1
        else:
            r -= 1
    return []`,
      pitfalls: ['Moving the wrong pointer: a small sum needs a bigger left value, so move left.', 'Using a hash map works but wastes the sorted order and O(n) memory.'] }
  ],
  'sort-colors': [
    { name: 'Count, then rewrite', idea: 'Count the 0s, 1s and 2s, then write that many of each back in order.',
      time: 'O(n)', space: 'O(1)', why: 'Two passes and three counters.',
      js: `function sortColors(nums) {
  const c = [0, 0, 0];
  for (const x of nums) c[x]++;
  let i = 0;
  for (let v = 0; v < 3; v++) for (let k = 0; k < c[v]; k++) nums[i++] = v;
}`,
      py: `def sortColors(nums):
    c = [nums.count(v) for v in range(3)]
    nums[:] = [0] * c[0] + [1] * c[1] + [2] * c[2]`,
      pitfalls: ['It takes two passes; the one-pass version is a common follow-up.'] },
    { name: 'Three regions in one pass', idea: 'Keep everything before low as 0 and everything after high as 2. Walk mid: a 0 swaps to low, a 2 swaps to high, a 1 stays.',
      time: 'O(n)', space: 'O(1)', why: 'One pass; each swap settles at least one value.',
      js: `function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) { [nums[low], nums[mid]] = [nums[mid], nums[low]]; low++; mid++; }
    else if (nums[mid] === 2) { [nums[mid], nums[high]] = [nums[high], nums[mid]]; high--; }
    else mid++;
  }
}`,
      py: `def sortColors(nums):
    low = mid = 0
    high = len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 2:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
        else:
            mid += 1`,
      pitfalls: ['Moving mid after swapping with high: the value that came back is not checked yet.', 'Stopping at mid < high misses the last value.'] }
  ],
  'remove-nth': [
    { name: 'Count, then walk', idea: 'Count the nodes, then walk to the node just before the one to remove and skip it.',
      time: 'O(n)', space: 'O(1)', why: 'Two passes over the list.',
      js: `function removeNthFromEnd(head, n) {
  let len = 0;
  for (let x = head; x; x = x.next) len++;
  const dummy = new ListNode(0, head);
  let prev = dummy;
  for (let i = 0; i < len - n; i++) prev = prev.next;
  prev.next = prev.next.next;
  return dummy.next;
}`,
      py: `def removeNthFromEnd(head, n):
    length, x = 0, head
    while x:
        length += 1
        x = x.next
    dummy = prev = ListNode(0, head)
    for _ in range(length - n):
        prev = prev.next
    prev.next = prev.next.next
    return dummy.next`,
      pitfalls: ['Removing the head needs a dummy node, or a special case.'] },
    { name: 'Scout n ahead', idea: 'Send a fast pointer n nodes ahead of a slow one, then move both. When fast reaches the last node, slow is just before the one to remove.',
      time: 'O(n)', space: 'O(1)', why: 'One pass with two pointers.',
      js: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;
  for (let i = 0; i < n; i++) fast = fast.next;
  while (fast.next) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  return dummy.next;
}`,
      py: `def removeNthFromEnd(head, n):
    dummy = fast = slow = ListNode(0, head)
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast, slow = fast.next, slow.next
    slow.next = slow.next.next
    return dummy.next`,
      pitfalls: ['Starting both pointers at head instead of the dummy makes removing the first node fail.', 'Off by one: the gap must be n, and the loop stops when fast.next is null.'] }
  ],
  'container': [
    { name: 'Every pair of planks', idea: 'Try every pair and keep the most water.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 pairs.', slow: true,
      js: `function maxArea(height) {
  let best = 0;
  for (let i = 0; i < height.length; i++)
    for (let j = i + 1; j < height.length; j++)
      best = Math.max(best, Math.min(height[i], height[j]) * (j - i));
  return best;
}`,
      py: `def maxArea(height):
    best = 0
    for i in range(len(height)):
        for j in range(i + 1, len(height)):
            best = max(best, min(height[i], height[j]) * (j - i))
    return best`,
      pitfalls: ['Using the taller plank: water spills over the shorter one.'] },
    { name: 'Move the shorter plank', idea: 'Start with the widest pair. The shorter plank limits the water, so moving it inward is the only move that can help.',
      time: 'O(n)', space: 'O(1)', why: 'Each step moves one end inward.',
      js: `function maxArea(height) {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++; else r--;
  }
  return best;
}`,
      py: `def maxArea(height):
    l, r, best = 0, len(height) - 1, 0
    while l < r:
        best = max(best, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return best`,
      pitfalls: ['Moving the taller plank can never give more water, since the width shrinks and the height cannot grow.'] }
  ],
  '3sum': [
    { name: 'Every trio', idea: 'Try every three positions, sort each trio that sums to 0, and keep the different ones in a set.',
      time: 'O(n³)', space: 'O(n)', why: 'Three nested loops; the set of answers takes extra memory.', slow: true,
      js: `function threeSum(nums) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      for (let k = j + 1; k < nums.length; k++)
        if (nums[i] + nums[j] + nums[k] === 0) {
          const t = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          seen.set(t.join(','), t);
        }
  return [...seen.values()];
}`,
      py: `def threeSum(nums):
    seen = set()
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    seen.add(tuple(sorted((nums[i], nums[j], nums[k]))))
    return [list(t) for t in seen]`,
      pitfalls: ['Without sorting each trio, [0, 1, -1] and [1, 0, -1] count as different.'] },
    { name: 'Fix one, hash the rest', idea: 'Fix the first value, then find pairs in the rest that sum to its negative with a set, as in two sum.',
      time: 'O(n²)', space: 'O(n)', why: 'n fixed values times one pass each; the sets hold up to n values.',
      js: `function threeSum(nums) {
  const out = new Map();
  for (let i = 0; i < nums.length; i++) {
    const seen = new Set();
    for (let j = i + 1; j < nums.length; j++) {
      const need = -nums[i] - nums[j];
      if (seen.has(need)) {
        const t = [nums[i], nums[j], need].sort((a, b) => a - b);
        out.set(t.join(','), t);
      }
      seen.add(nums[j]);
    }
  }
  return [...out.values()];
}`,
      py: `def threeSum(nums):
    out = set()
    for i in range(len(nums)):
        seen = set()
        for j in range(i + 1, len(nums)):
            need = -nums[i] - nums[j]
            if need in seen:
                out.add(tuple(sorted((nums[i], nums[j], need))))
            seen.add(nums[j])
    return [list(t) for t in out]`,
      pitfalls: ['Clearing the seen set for each fixed value is easy to forget.'] },
    { name: 'Sort, fix one, squeeze two', idea: 'Sort. Fix each value in turn and squeeze two pointers over the values to its right. Skip repeats so no trio comes twice.',
      time: 'O(n²)', space: 'O(1)', why: 'For each fixed value the squeeze is one pass; no set is needed because skipping repeats keeps trios unique.',
      js: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r];
      if (s < 0) l++;
      else if (s > 0) r--;
      else {
        out.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      }
    }
  }
  return out;
}`,
      py: `def threeSum(nums):
    nums.sort()
    out = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s < 0:
                l += 1
            elif s > 0:
                r -= 1
            else:
                out.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]:
                    l += 1
                while l < r and nums[r] == nums[r - 1]:
                    r -= 1
                l += 1
                r -= 1
    return out`,
      pitfalls: ['Skipping repeats of the fixed value with nums[i] === nums[i + 1] drops trios like [-1, -1, 2].', 'After a match, move both pointers, or the loop never ends.'] }
  ],
  'longest-palindrome': [
    { name: 'Check every stretch', idea: 'Try every start and end, check whether that stretch is a palindrome, and keep the longest.',
      time: 'O(n³)', space: 'O(1)', why: 'n² stretches, each checked in up to n steps.', slow: true,
      js: `function longestPalindrome(s) {
  let best = s.slice(0, 1);
  const isPal = (l, r) => { while (l < r) if (s[l++] !== s[r--]) return false; return true; };
  for (let i = 0; i < s.length; i++)
    for (let j = i + best.length; j < s.length; j++)
      if (isPal(i, j)) best = s.slice(i, j + 1);
  return best;
}`,
      py: `def longestPalindrome(s):
    best = s[:1]
    for i in range(len(s)):
        for j in range(i + len(best), len(s)):
            t = s[i:j + 1]
            if t == t[::-1]:
                best = t
    return best`,
      pitfalls: ['Forgetting that a single letter is already a palindrome.'] },
    { name: 'Expand from every middle', idea: 'Every palindrome has a middle: a letter or the gap between two letters. Grow outward from each of the 2n - 1 middles while the ends match.',
      time: 'O(n²)', space: 'O(1)', why: '2n - 1 middles, each grown up to n steps; only indexes are kept.',
      js: `function longestPalindrome(s) {
  let start = 0, len = s.length ? 1 : 0;
  for (let c = 0; c < s.length; c++) {
    for (const [a, b] of [[c, c], [c, c + 1]]) {
      let l = a, r = b;
      while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
      if (r - l - 1 > len) { len = r - l - 1; start = l + 1; }
    }
  }
  return s.slice(start, start + len);
}`,
      py: `def longestPalindrome(s):
    start, length = 0, min(1, len(s))
    for c in range(len(s)):
        for l, r in ((c, c), (c, c + 1)):
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1
                r += 1
            if r - l - 1 > length:
                start, length = l + 1, r - l - 1
    return s[start:start + length]`,
      pitfalls: ['Forgetting even-length palindromes like "abba", whose middle is a gap.', 'After the loop l and r are one step too far, so the length is r - l - 1.'] }
  ],
  'trapping-rain': [
    { name: 'Look both ways from each rock', idea: 'For each position, find the tallest rock on its left and on its right. The water there is the lower of the two minus its own height.',
      time: 'O(n²)', space: 'O(1)', why: 'Each position scans the whole row.', slow: true,
      js: `function trap(height) {
  let water = 0;
  for (let i = 0; i < height.length; i++) {
    let left = 0, right = 0;
    for (let j = 0; j <= i; j++) left = Math.max(left, height[j]);
    for (let j = i; j < height.length; j++) right = Math.max(right, height[j]);
    water += Math.min(left, right) - height[i];
  }
  return water;
}`,
      py: `def trap(height):
    water = 0
    for i in range(len(height)):
        water += min(max(height[:i + 1]), max(height[i:])) - height[i]
    return water`,
      pitfalls: ['Leaving out the rock itself from the maxima can give negative water.'] },
    { name: 'Tallest-so-far lists', idea: 'Fill one list with the tallest rock up to each position from the left and one from the right, then add up the water.',
      time: 'O(n)', space: 'O(n)', why: 'Three passes, two extra lists.',
      js: `function trap(height) {
  const n = height.length, left = new Array(n), right = new Array(n);
  for (let i = 0; i < n; i++) left[i] = Math.max(height[i], i ? left[i - 1] : 0);
  for (let i = n - 1; i >= 0; i--) right[i] = Math.max(height[i], i < n - 1 ? right[i + 1] : 0);
  let water = 0;
  for (let i = 0; i < n; i++) water += Math.min(left[i], right[i]) - height[i];
  return water;
}`,
      py: `def trap(height):
    n = len(height)
    left, right = [0] * n, [0] * n
    for i in range(n):
        left[i] = max(height[i], left[i - 1] if i else 0)
    for i in range(n - 1, -1, -1):
        right[i] = max(height[i], right[i + 1] if i < n - 1 else 0)
    return sum(min(left[i], right[i]) - height[i] for i in range(n))`,
      pitfalls: ['An empty row has no water; make sure the loops handle n = 0.'] },
    { name: 'Two walkers', idea: 'Walk in from both ends, each remembering the tallest rock it has passed. The side with the lower tallest rock is settled: its water is that height minus the rock.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two indexes and two maxima.',
      js: `function trap(height) {
  let l = 0, r = height.length - 1, lMax = 0, rMax = 0, water = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      lMax = Math.max(lMax, height[l]);
      water += lMax - height[l];
      l++;
    } else {
      rMax = Math.max(rMax, height[r]);
      water += rMax - height[r];
      r--;
    }
  }
  return water;
}`,
      py: `def trap(height):
    l, r = 0, len(height) - 1
    l_max = r_max = water = 0
    while l < r:
        if height[l] < height[r]:
            l_max = max(l_max, height[l])
            water += l_max - height[l]
            l += 1
        else:
            r_max = max(r_max, height[r])
            water += r_max - height[r]
            r -= 1
    return water`,
      pitfalls: ['Moving the taller side: its water depends on the other side, which you have not seen yet.'] }
  ],
  'best-time-stock': [
    { name: 'Every buy and sell day', idea: 'Try each buy day with each later sell day and keep the best profit.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 pairs of days.', slow: true,
      js: `function maxProfit(prices) {
  let best = 0;
  for (let i = 0; i < prices.length; i++)
    for (let j = i + 1; j < prices.length; j++) best = Math.max(best, prices[j] - prices[i]);
  return best;
}`,
      py: `def maxProfit(prices):
    best = 0
    for i in range(len(prices)):
        for j in range(i + 1, len(prices)):
            best = max(best, prices[j] - prices[i])
    return best`,
      pitfalls: ['Selling before buying: the sell day must come later.'] },
    { name: 'Cheapest day so far', idea: 'Walk the days once. Remember the lowest price so far; today’s best profit is today’s price minus that.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two numbers.',
      js: `function maxProfit(prices) {
  let low = Infinity, best = 0;
  for (const p of prices) {
    low = Math.min(low, p);
    best = Math.max(best, p - low);
  }
  return best;
}`,
      py: `def maxProfit(prices):
    low, best = float('inf'), 0
    for p in prices:
        low = min(low, p)
        best = max(best, p - low)
    return best`,
      pitfalls: ['Taking the overall max minus the overall min ignores the order of the days.'] }
  ],
  'minimum-size-subarray-sum': [
    { name: 'Every start, grow until enough', idea: 'From each start, add numbers until the sum reaches target, and keep the shortest length.',
      time: 'O(n²)', space: 'O(1)', why: 'Each start may scan to the end.', slow: true,
      js: `function minSubArrayLen(target, nums) {
  let best = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) { best = Math.min(best, j - i + 1); break; }
    }
  }
  return best === Infinity ? 0 : best;
}`,
      py: `def minSubArrayLen(target, nums):
    best = float('inf')
    for i in range(len(nums)):
        s = 0
        for j in range(i, len(nums)):
            s += nums[j]
            if s >= target:
                best = min(best, j - i + 1)
                break
    return 0 if best == float('inf') else best`,
      pitfalls: ['Returning Infinity when nothing works; the answer is 0.'] },
    { name: 'Grow and shrink a window', idea: 'Add numbers on the right. While the sum is at least target, record the length and drop numbers from the left.',
      time: 'O(n)', space: 'O(1)', why: 'Each number enters and leaves the window once.',
      js: `function minSubArrayLen(target, nums) {
  let l = 0, sum = 0, best = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      best = Math.min(best, r - l + 1);
      sum -= nums[l++];
    }
  }
  return best === Infinity ? 0 : best;
}`,
      py: `def minSubArrayLen(target, nums):
    l = s = 0
    best = float('inf')
    for r, x in enumerate(nums):
        s += x
        while s >= target:
            best = min(best, r - l + 1)
            s -= nums[l]
            l += 1
    return 0 if best == float('inf') else best`,
      pitfalls: ['Using if instead of while: one new number can let the left side move several steps.', 'The window trick needs positive numbers; with negatives it breaks.'] }
  ],
  'longest-substring': [
    { name: 'Every start, extend until a repeat', idea: 'From each start, add characters to a set until one repeats, and keep the longest run.',
      time: 'O(n²)', space: 'O(n)', why: 'Each start scans ahead; the set holds the run.', slow: true,
      js: `function lengthOfLongestSubstring(s) {
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const seen = new Set();
    for (let j = i; j < s.length && !seen.has(s[j]); j++) seen.add(s[j]);
    best = Math.max(best, seen.size);
  }
  return best;
}`,
      py: `def lengthOfLongestSubstring(s):
    best = 0
    for i in range(len(s)):
        seen = set()
        for c in s[i:]:
            if c in seen:
                break
            seen.add(c)
        best = max(best, len(seen))
    return best`,
      pitfalls: ['A space is a character too and can repeat.'] },
    { name: 'Window with last positions', idea: 'Slide a window. Remember where each character was last seen; when a character repeats inside the window, jump the left edge just past its last position.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the map holds each different character once.',
      js: `function lengthOfLongestSubstring(s) {
  const last = new Map();
  let l = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    if (last.has(s[r]) && last.get(s[r]) >= l) l = last.get(s[r]) + 1;
    last.set(s[r], r);
    best = Math.max(best, r - l + 1);
  }
  return best;
}`,
      py: `def lengthOfLongestSubstring(s):
    last = {}
    l = best = 0
    for r, c in enumerate(s):
        if last.get(c, -1) >= l:
            l = last[c] + 1
        last[c] = r
        best = max(best, r - l + 1)
    return best`,
      pitfalls: ['Jumping the left edge backwards to an old position that is already outside the window.'] }
  ],
  'max-consecutive-ones-iii': [
    { name: 'Every start', idea: 'From each start, extend while you have flips left for the zeros, and keep the longest run.',
      time: 'O(n²)', space: 'O(1)', why: 'Each start may scan to the end.', slow: true,
      js: `function longestOnes(nums, k) {
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0, j = i;
    while (j < nums.length && zeros + (nums[j] === 0 ? 1 : 0) <= k) { zeros += nums[j] === 0 ? 1 : 0; j++; }
    best = Math.max(best, j - i);
  }
  return best;
}`,
      py: `def longestOnes(nums, k):
    best = 0
    for i in range(len(nums)):
        zeros, j = 0, i
        while j < len(nums) and zeros + (nums[j] == 0) <= k:
            zeros += nums[j] == 0
            j += 1
        best = max(best, j - i)
    return best`,
      pitfalls: ['k may be 0, so a run of plain ones must still count.'] },
    { name: 'Window with at most k zeros', idea: 'Grow the window on the right. When it holds more than k zeros, move the left edge until it holds k again.',
      time: 'O(n)', space: 'O(1)', why: 'Each index enters and leaves the window once.',
      js: `function longestOnes(nums, k) {
  let l = 0, zeros = 0, best = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeros++;
    while (zeros > k) if (nums[l++] === 0) zeros--;
    best = Math.max(best, r - l + 1);
  }
  return best;
}`,
      py: `def longestOnes(nums, k):
    l = zeros = best = 0
    for r, x in enumerate(nums):
        zeros += x == 0
        while zeros > k:
            zeros -= nums[l] == 0
            l += 1
        best = max(best, r - l + 1)
    return best`,
      pitfalls: ['Counting the flipped zeros instead of how many zeros are in the window.'] }
  ],
  'char-replacement': [
    { name: 'Every stretch', idea: 'For each stretch, count its letters. It works if its length minus its most common letter is at most k.',
      time: 'O(n²)', space: 'O(1)', why: 'n² stretches, each updated in O(1) with 26 counters as it grows.', slow: true,
      js: `function characterReplacement(s, k) {
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const c = new Array(26).fill(0);
    let top = 0;
    for (let j = i; j < s.length; j++) {
      top = Math.max(top, ++c[s.charCodeAt(j) - 65]);
      if (j - i + 1 - top <= k) best = Math.max(best, j - i + 1);
    }
  }
  return best;
}`,
      py: `def characterReplacement(s, k):
    best = 0
    for i in range(len(s)):
        c, top = {}, 0
        for j in range(i, len(s)):
            c[s[j]] = c.get(s[j], 0) + 1
            top = max(top, c[s[j]])
            if j - i + 1 - top <= k:
                best = max(best, j - i + 1)
    return best`,
      pitfalls: ['Trying each target letter separately works too, but costs 26 times as much.'] },
    { name: 'Window with a most-common count', idea: 'Grow the window. Keep the count of its most common letter. When length minus that count goes over k, slide the left edge one step.',
      time: 'O(n)', space: 'O(1)', why: 'One pass with 26 counters, whatever the length.',
      js: `function characterReplacement(s, k) {
  const c = new Array(26).fill(0);
  let l = 0, top = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    top = Math.max(top, ++c[s.charCodeAt(r) - 65]);
    if (r - l + 1 - top > k) c[s.charCodeAt(l++) - 65]--;
    best = Math.max(best, r - l + 1);
  }
  return best;
}`,
      py: `def characterReplacement(s, k):
    c = {}
    l = top = best = 0
    for r, ch in enumerate(s):
        c[ch] = c.get(ch, 0) + 1
        top = max(top, c[ch])
        if r - l + 1 - top > k:
            c[s[l]] -= 1
            l += 1
        best = max(best, r - l + 1)
    return best`,
      pitfalls: ['Lowering top when the left letter leaves is not needed: the window never grows past a size it could not reach.'] }
  ],
  'permutation-in-string': [
    { name: 'Sort every window', idea: 'Sort s1. Then sort every stretch of s2 with the same length and compare.',
      time: 'O(n · m log m)', space: 'O(m)', why: 'n windows, each sorted; m is the length of s1.', slow: true,
      js: `function checkInclusion(s1, s2) {
  const key = (t) => t.split('').sort().join('');
  const want = key(s1);
  for (let i = 0; i + s1.length <= s2.length; i++) if (key(s2.slice(i, i + s1.length)) === want) return true;
  return false;
}`,
      py: `def checkInclusion(s1, s2):
    want = sorted(s1)
    m = len(s1)
    return any(sorted(s2[i:i + m]) == want for i in range(len(s2) - m + 1))`,
      pitfalls: ['s1 longer than s2 can never fit.'] },
    { name: 'Sliding letter counts', idea: 'Count the letters of s1. Slide a window of the same length over s2, adding the new letter and removing the old, and compare the 26 counts.',
      time: 'O(n)', space: 'O(1)', why: 'Each step changes two counts and compares 26 numbers.',
      js: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const a = new Array(26).fill(0), b = new Array(26).fill(0);
  const at = (s, i) => s.charCodeAt(i) - 97;
  for (let i = 0; i < s1.length; i++) { a[at(s1, i)]++; b[at(s2, i)]++; }
  const same = () => a.every((x, i) => x === b[i]);
  for (let i = s1.length; i < s2.length; i++) {
    if (same()) return true;
    b[at(s2, i)]++;
    b[at(s2, i - s1.length)]--;
  }
  return same();
}`,
      py: `def checkInclusion(s1, s2):
    m = len(s1)
    if m > len(s2):
        return False
    a, b = [0] * 26, [0] * 26
    for i in range(m):
        a[ord(s1[i]) - 97] += 1
        b[ord(s2[i]) - 97] += 1
    for i in range(m, len(s2)):
        if a == b:
            return True
        b[ord(s2[i]) - 97] += 1
        b[ord(s2[i - m]) - 97] -= 1
    return a == b`,
      pitfalls: ['Forgetting to check the very last window after the loop.'] }
  ],
  'find-all-anagrams-in-a-string': [
    { name: 'Sort every window', idea: 'Sort p, then sort each stretch of s with p’s length and record the starts that match.',
      time: 'O(n · m log m)', space: 'O(m)', why: 'n windows, each sorted; m is the length of p.', slow: true,
      js: `function findAnagrams(s, p) {
  const key = (t) => t.split('').sort().join('');
  const want = key(p), out = [];
  for (let i = 0; i + p.length <= s.length; i++) if (key(s.slice(i, i + p.length)) === want) out.push(i);
  return out;
}`,
      py: `def findAnagrams(s, p):
    want, m = sorted(p), len(p)
    return [i for i in range(len(s) - m + 1) if sorted(s[i:i + m]) == want]`,
      pitfalls: ['The starts must come out smallest first.'] },
    { name: 'Sliding letter counts', idea: 'Keep 26 counts for p and for the current window of s. Slide one letter at a time and record each start where the counts match.',
      time: 'O(n)', space: 'O(1)', why: 'Each step changes two counts and compares 26 numbers.',
      js: `function findAnagrams(s, p) {
  const out = [], m = p.length;
  if (m > s.length) return out;
  const a = new Array(26).fill(0), b = new Array(26).fill(0);
  for (let i = 0; i < m; i++) { a[p.charCodeAt(i) - 97]++; b[s.charCodeAt(i) - 97]++; }
  for (let i = 0; ; i++) {
    if (a.every((x, j) => x === b[j])) out.push(i);
    if (i + m >= s.length) break;
    b[s.charCodeAt(i + m) - 97]++;
    b[s.charCodeAt(i) - 97]--;
  }
  return out;
}`,
      py: `def findAnagrams(s, p):
    m, out = len(p), []
    if m > len(s):
        return out
    a, b = [0] * 26, [0] * 26
    for i in range(m):
        a[ord(p[i]) - 97] += 1
        b[ord(s[i]) - 97] += 1
    for i in range(len(s) - m + 1):
        if a == b:
            out.append(i)
        if i + m < len(s):
            b[ord(s[i + m]) - 97] += 1
            b[ord(s[i]) - 97] -= 1
    return out`,
      pitfalls: ['Off by one at the end: the last start is len(s) - len(p).'] }
  ],
  'min-window': [
    { name: 'Every stretch', idea: 'Try every start and end, check whether the stretch covers t, and keep the shortest.',
      time: 'O(n² · m)', space: 'O(m)', why: 'n² stretches, each checked against t’s counts.', slow: true,
      js: `function minWindow(s, t) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let best = '';
  for (let i = 0; i < s.length; i++) {
    const have = {};
    for (let j = i; j < s.length; j++) {
      have[s[j]] = (have[s[j]] || 0) + 1;
      if (Object.keys(need).every((c) => (have[c] || 0) >= need[c])) {
        if (!best || j - i + 1 < best.length) best = s.slice(i, j + 1);
        break;
      }
    }
  }
  return best;
}`,
      py: `def minWindow(s, t):
    from collections import Counter
    need, best = Counter(t), ''
    for i in range(len(s)):
        have = Counter()
        for j in range(i, len(s)):
            have[s[j]] += 1
            if all(have[c] >= k for c, k in need.items()):
                if not best or j - i + 1 < len(best):
                    best = s[i:j + 1]
                break
    return best`,
      pitfalls: ['Repeats matter: t = "aa" needs two a’s in the window.'] },
    { name: 'Grow until covered, then squeeze', idea: 'Grow the window on the right until it covers every letter of t. Then shrink from the left while it still covers, recording the shortest.',
      time: 'O(n + m)', space: 'O(m)', why: 'Each index enters and leaves once; the counts cover t’s letters.',
      js: `function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let missing = t.length, l = 0, start = 0, len = Infinity;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (need.has(c)) { if (need.get(c) > 0) missing--; need.set(c, need.get(c) - 1); }
    while (missing === 0) {
      if (r - l + 1 < len) { len = r - l + 1; start = l; }
      const d = s[l++];
      if (need.has(d)) { need.set(d, need.get(d) + 1); if (need.get(d) > 0) missing++; }
    }
  }
  return len === Infinity ? '' : s.slice(start, start + len);
}`,
      py: `def minWindow(s, t):
    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1
    missing, l, start, length = len(t), 0, 0, float('inf')
    for r, c in enumerate(s):
        if c in need:
            if need[c] > 0:
                missing -= 1
            need[c] -= 1
        while missing == 0:
            if r - l + 1 < length:
                start, length = l, r - l + 1
            d = s[l]
            l += 1
            if d in need:
                need[d] += 1
                if need[d] > 0:
                    missing += 1
    return '' if length == float('inf') else s[start:start + length]`,
      pitfalls: ['Counts can go below zero for extra copies; only a count rising back above zero means a letter is missing again.'] }
  ],
  'sliding-window-max': [
    { name: 'Scan every window', idea: 'For each window position, scan its k values for the largest.',
      time: 'O(n · k)', space: 'O(1)', why: 'n windows, k values each.', slow: true,
      js: `function maxSlidingWindow(nums, k) {
  const out = [];
  for (let i = 0; i + k <= nums.length; i++) out.push(Math.max(...nums.slice(i, i + k)));
  return out;
}`,
      py: `def maxSlidingWindow(nums, k):
    return [max(nums[i:i + k]) for i in range(len(nums) - k + 1)]`,
      pitfalls: ['There are n - k + 1 windows, not n.'] },
    { name: 'Line of candidates', idea: 'Keep indexes in a line with values falling from front to back. A newcomer removes every smaller value at the back; the front leaves when it falls out of the window. The front is the maximum.',
      time: 'O(n)', space: 'O(k)', why: 'Each index joins and leaves the line once; the line holds at most k.',
      js: `function maxSlidingWindow(nums, k) {
  const q = [], out = [];
  let head = 0;
  for (let i = 0; i < nums.length; i++) {
    while (q.length > head && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);
    if (q[head] <= i - k) head++;
    if (i >= k - 1) out.push(nums[q[head]]);
  }
  return out;
}`,
      py: `def maxSlidingWindow(nums, k):
    from collections import deque
    q, out = deque(), []
    for i, x in enumerate(nums):
        while q and nums[q[-1]] <= x:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            out.append(nums[q[0]])
    return out`,
      pitfalls: ['Storing values instead of indexes, so you cannot tell when the front left the window.', 'Array.shift() is O(n) in JavaScript; move a head index instead.'] }
  ],
  'contains-duplicate': [
    { name: 'Compare every pair', idea: 'Check each pair of positions for equal values.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 pairs.', slow: true,
      js: `function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++) if (nums[i] === nums[j]) return true;
  return false;
}`,
      py: `def containsDuplicate(nums):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False`,
      pitfalls: ['Starting j at i compares a value with itself.'] },
    { name: 'Sort, then look at neighbours', idea: 'After sorting, equal values sit side by side.',
      time: 'O(n log n)', space: 'O(1)', why: 'The sort sets the time and works in place.',
      js: `function containsDuplicate(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) if (nums[i] === nums[i - 1]) return true;
  return false;
}`,
      py: `def containsDuplicate(nums):
    nums.sort()
    return any(nums[i] == nums[i - 1] for i in range(1, len(nums)))`,
      pitfalls: ['Sorting changes the caller’s list; copy it first if that matters.'] },
    { name: 'Guest list set', idea: 'Walk the list once with a set of values already seen. Seeing a value twice means a duplicate.',
      time: 'O(n)', space: 'O(n)', why: 'Set lookups take O(1) on average; the set may hold every value.',
      js: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}`,
      py: `def containsDuplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,
      pitfalls: ['Comparing sizes (new Set(nums).size < nums.length) is short and also O(n), but cannot stop early.'] }
  ],
  'valid-anagram': [
    { name: 'Sort both', idea: 'Two words are anagrams when their sorted letters match.',
      time: 'O(n log n)', space: 'O(n)', why: 'Sorting the letters; the sorted copies take memory.',
      js: `function isAnagram(s, t) {
  const key = (w) => w.split('').sort().join('');
  return key(s) === key(t);
}`,
      py: `def isAnagram(s, t):
    return sorted(s) == sorted(t)`,
      pitfalls: ['Different lengths can never match; checking that first saves time.'] },
    { name: '26 tallies', idea: 'Add one for each letter of s and take one away for each letter of t. Every tally must end at zero.',
      time: 'O(n)', space: 'O(1)', why: 'One pass over both words; 26 counters whatever the length.',
      js: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const c = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) { c[s.charCodeAt(i) - 97]++; c[t.charCodeAt(i) - 97]--; }
  return c.every((x) => x === 0);
}`,
      py: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    c = [0] * 26
    for a, b in zip(s, t):
        c[ord(a) - 97] += 1
        c[ord(b) - 97] -= 1
    return all(x == 0 for x in c)`,
      pitfalls: ['Only checking that t’s letters appear in s misses counts: "aab" and "abb".'] }
  ],
  'two-sum': [
    { name: 'Try every pair', idea: 'Check every pair of positions until two numbers add up to target.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 pairs.', slow: true,
      js: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++) if (nums[i] + nums[j] === target) return [i, j];
  return [];
}`,
      py: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
      pitfalls: ['Using the same position twice when target is double a value.'] },
    { name: 'Ticket book of partners', idea: 'Walk once. For each number, look up whether its partner (target minus it) was seen; if not, write this number and its index down.',
      time: 'O(n)', space: 'O(n)', why: 'One pass with O(1) map lookups; the map may hold every number.',
      js: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
      py: `def twoSum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return []`,
      pitfalls: ['Writing the number down before checking finds the number itself as its partner.', 'Sorting loses the original indexes.'] }
  ],
  'ransom-note': [
    { name: 'Cross letters out', idea: 'For each note letter, find an unused copy in the magazine and cross it out.',
      time: 'O(n · m)', space: 'O(m)', why: 'Each note letter may scan the whole magazine; m is the magazine length.', slow: true,
      js: `function canConstruct(ransomNote, magazine) {
  const mag = magazine.split('');
  for (const c of ransomNote) {
    const i = mag.indexOf(c);
    if (i < 0) return false;
    mag[i] = '';
  }
  return true;
}`,
      py: `def canConstruct(ransomNote, magazine):
    mag = list(magazine)
    for c in ransomNote:
        if c not in mag:
            return False
        mag.remove(c)
    return True`,
      pitfalls: ['Each magazine letter can only be used once.'] },
    { name: 'Letter counts', idea: 'Count the magazine’s letters, then spend one for each letter of the note.',
      time: 'O(n + m)', space: 'O(1)', why: 'One pass over each string; 26 counters.',
      js: `function canConstruct(ransomNote, magazine) {
  const c = new Array(26).fill(0);
  for (const ch of magazine) c[ch.charCodeAt(0) - 97]++;
  for (const ch of ransomNote) if (--c[ch.charCodeAt(0) - 97] < 0) return false;
  return true;
}`,
      py: `def canConstruct(ransomNote, magazine):
    c = [0] * 26
    for ch in magazine:
        c[ord(ch) - 97] += 1
    for ch in ransomNote:
        c[ord(ch) - 97] -= 1
        if c[ord(ch) - 97] < 0:
            return False
    return True`,
      pitfalls: ['Counting the note instead of the magazine first, then checking the wrong way round.'] }
  ],
  'first-unique-character-in-a-string': [
    { name: 'Count for each letter', idea: 'For each position, count how often its letter appears in the whole string.',
      time: 'O(n²)', space: 'O(1)', why: 'Each of n letters scans the string.', slow: true,
      js: `function firstUniqChar(s) {
  for (let i = 0; i < s.length; i++) if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) return i;
  return -1;
}`,
      py: `def firstUniqChar(s):
    for i, c in enumerate(s):
        if s.count(c) == 1:
            return i
    return -1`,
      pitfalls: ['Returning the letter instead of its index.'] },
    { name: 'Count, then find', idea: 'Count every letter in one pass, then return the first position whose letter has a count of one.',
      time: 'O(n)', space: 'O(1)', why: 'Two passes; 26 counters.',
      js: `function firstUniqChar(s) {
  const c = new Array(26).fill(0);
  for (const ch of s) c[ch.charCodeAt(0) - 97]++;
  for (let i = 0; i < s.length; i++) if (c[s.charCodeAt(i) - 97] === 1) return i;
  return -1;
}`,
      py: `def firstUniqChar(s):
    c = [0] * 26
    for ch in s:
        c[ord(ch) - 97] += 1
    for i, ch in enumerate(s):
        if c[ord(ch) - 97] == 1:
            return i
    return -1`,
      pitfalls: ['The second pass must go over s in order, not over the counts, to find the first one.'] }
  ],
  'majority-element': [
    { name: 'Count with a map', idea: 'Count every value and return the one whose count passes half.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the map holds each different value.',
      js: `function majorityElement(nums) {
  const c = new Map();
  for (const x of nums) {
    c.set(x, (c.get(x) || 0) + 1);
    if (c.get(x) > nums.length / 2) return x;
  }
}`,
      py: `def majorityElement(nums):
    c = {}
    for x in nums:
        c[x] = c.get(x, 0) + 1
        if c[x] > len(nums) // 2:
            return x`,
      pitfalls: ['More than half means strictly greater than n / 2.'] },
    { name: 'Sort and take the middle', idea: 'A value that fills more than half always covers the middle position after sorting.',
      time: 'O(n log n)', space: 'O(1)', why: 'The sort sets the time.',
      js: `function majorityElement(nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
}`,
      py: `def majorityElement(nums):
    nums.sort()
    return nums[len(nums) // 2]`,
      pitfalls: ['Without a compare function, JavaScript sorts as text, and negative numbers land in odd places.'] },
    { name: 'Vote and cancel', idea: 'Keep one candidate and a count. A different value cancels one vote; at zero, the next value becomes the candidate. The majority survives.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two variables.',
      js: `function majorityElement(nums) {
  let cand = null, count = 0;
  for (const x of nums) {
    if (count === 0) cand = x;
    count += x === cand ? 1 : -1;
  }
  return cand;
}`,
      py: `def majorityElement(nums):
    cand, count = None, 0
    for x in nums:
        if count == 0:
            cand = x
        count += 1 if x == cand else -1
    return cand`,
      pitfalls: ['The trick only works because a majority is promised; otherwise you must count the candidate again.'] }
  ],
  'group-anagrams': [
    { name: 'Compare with each group', idea: 'For each word, compare it with the first word of every group so far and join the matching group.',
      time: 'O(n² · k)', space: 'O(n · k)', why: 'Each word may be compared with every group; k is the longest word.', slow: true,
      js: `function groupAnagrams(strs) {
  const groups = [];
  const same = (a, b) => a.length === b.length && a.split('').sort().join('') === b.split('').sort().join('');
  for (const w of strs) {
    const g = groups.find((x) => same(x[0], w));
    if (g) g.push(w); else groups.push([w]);
  }
  return groups;
}`,
      py: `def groupAnagrams(strs):
    groups = []
    for w in strs:
        for g in groups:
            if sorted(g[0]) == sorted(w):
                g.append(w)
                break
        else:
            groups.append([w])
    return groups`,
      pitfalls: ['The empty word is a word too and gets its own group.'] },
    { name: 'Sorted letters as the label', idea: 'Sort each word’s letters to make its label, and put words with the same label in one pigeonhole.',
      time: 'O(n · k log k)', space: 'O(n · k)', why: 'Each word is sorted once; the map stores every word.',
      js: `function groupAnagrams(strs) {
  const m = new Map();
  for (const w of strs) {
    const key = w.split('').sort().join('');
    if (!m.has(key)) m.set(key, []);
    m.get(key).push(w);
  }
  return [...m.values()];
}`,
      py: `def groupAnagrams(strs):
    m = {}
    for w in strs:
        m.setdefault(''.join(sorted(w)), []).append(w)
    return list(m.values())`,
      pitfalls: ['Using the word’s letters as a set: "aab" and "abb" would share a label.'] },
    { name: 'Letter counts as the label', idea: 'Label each word with its 26 letter counts instead of sorting it.',
      time: 'O(n · k)', space: 'O(n · k)', why: 'Each word is read once to count; the label has a fixed 26 parts.',
      js: `function groupAnagrams(strs) {
  const m = new Map();
  for (const w of strs) {
    const c = new Array(26).fill(0);
    for (const ch of w) c[ch.charCodeAt(0) - 97]++;
    const key = c.join(',');
    if (!m.has(key)) m.set(key, []);
    m.get(key).push(w);
  }
  return [...m.values()];
}`,
      py: `def groupAnagrams(strs):
    m = {}
    for w in strs:
        c = [0] * 26
        for ch in w:
            c[ord(ch) - 97] += 1
        m.setdefault(tuple(c), []).append(w)
    return list(m.values())`,
      pitfalls: ['Joining counts without a separator makes [1, 11] and [11, 1] look the same.'] }
  ],
  'longest-consecutive': [
    { name: 'Sort and count runs', idea: 'Sort, then walk and count runs where each value is one more than the last, skipping repeats.',
      time: 'O(n log n)', space: 'O(1)', why: 'The sort sets the time.',
      js: `function longestConsecutive(nums) {
  if (!nums.length) return 0;
  nums.sort((a, b) => a - b);
  let best = 1, run = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue;
    run = nums[i] === nums[i - 1] + 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}`,
      py: `def longestConsecutive(nums):
    if not nums:
        return 0
    nums.sort()
    best = run = 1
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            continue
        run = run + 1 if nums[i] == nums[i - 1] + 1 else 1
        best = max(best, run)
    return best`,
      pitfalls: ['A repeat must not break the run: 1, 2, 2, 3 is a run of 3.'] },
    { name: 'Start only at run beginnings', idea: 'Put every value in a set. Count upward only from values whose previous value is missing, so each value is visited once.',
      time: 'O(n)', space: 'O(n)', why: 'Each value is counted in exactly one run; the set holds every value.',
      js: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue;
    let y = x;
    while (set.has(y + 1)) y++;
    best = Math.max(best, y - x + 1);
  }
  return best;
}`,
      py: `def longestConsecutive(nums):
    s = set(nums)
    best = 0
    for x in s:
        if x - 1 in s:
            continue
        y = x
        while y + 1 in s:
            y += 1
        best = max(best, y - x + 1)
    return best`,
      pitfalls: ['Counting from every value, not just run starts, makes it O(n²).', 'Looping over nums instead of the set repeats work for duplicates.'] }
  ],
  'valid-sudoku': [
    { name: 'Check each unit separately', idea: 'Check every row, every column and every 3 x 3 box on its own for a repeated digit.',
      time: 'O(1)', space: 'O(1)', why: 'The board is always 9 x 9, so it is a fixed 243 cell visits.',
      js: `function isValidSudoku(board) {
  const ok = (cells) => {
    const d = cells.filter((c) => c !== '.');
    return new Set(d).size === d.length;
  };
  for (let i = 0; i < 9; i++) {
    if (!ok(board[i])) return false;
    if (!ok(board.map((r) => r[i]))) return false;
    const box = [];
    for (let k = 0; k < 9; k++) box.push(board[3 * Math.floor(i / 3) + Math.floor(k / 3)][3 * (i % 3) + (k % 3)]);
    if (!ok(box)) return false;
  }
  return true;
}`,
      py: `def isValidSudoku(board):
    def ok(cells):
        d = [c for c in cells if c != '.']
        return len(d) == len(set(d))
    for i in range(9):
        box = [board[3 * (i // 3) + k // 3][3 * (i % 3) + k % 3] for k in range(9)]
        if not ok(board[i]) or not ok([r[i] for r in board]) or not ok(box):
            return False
    return True`,
      pitfalls: ['Treating "." as a digit that repeats.'] },
    { name: 'One pass with three seen-sets', idea: 'Visit each cell once, recording its digit for its row, its column and its box. A digit already recorded in any of them is a repeat.',
      time: 'O(1)', space: 'O(1)', why: 'Exactly 81 cells and 27 small sets.',
      js: `function isValidSudoku(board) {
  const seen = new Set();
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++) {
      const d = board[r][c];
      if (d === '.') continue;
      const keys = ['r' + r + d, 'c' + c + d, 'b' + Math.floor(r / 3) + Math.floor(c / 3) + d];
      if (keys.some((k) => seen.has(k))) return false;
      keys.forEach((k) => seen.add(k));
    }
  return true;
}`,
      py: `def isValidSudoku(board):
    seen = set()
    for r in range(9):
        for c in range(9):
            d = board[r][c]
            if d == '.':
                continue
            keys = (('r', r, d), ('c', c, d), ('b', r // 3, c // 3, d))
            if any(k in seen for k in keys):
                return False
            seen.update(keys)
    return True`,
      pitfalls: ['The box number is (r / 3, c / 3) rounded down, not r / 3 + c / 3.', 'The board does not have to be solvable, only free of repeats.'] }
  ],
  'lru-cache': [
    { name: 'List in use order', idea: 'Keep the keys in a list from least to most recently used. Each use moves a key to the back; the front one leaves when the cache is full.',
      time: 'O(n) per call', space: 'O(capacity)', why: 'Finding and moving a key in the list takes up to capacity steps.',
      js: `class LRUCache {
  constructor(capacity) { this.cap = capacity; this.keys = []; this.vals = {}; }
  touch(key) { this.keys.splice(this.keys.indexOf(key), 1); this.keys.push(key); }
  get(key) {
    if (!(key in this.vals)) return -1;
    this.touch(key);
    return this.vals[key];
  }
  put(key, value) {
    if (key in this.vals) this.touch(key);
    else {
      if (this.keys.length === this.cap) delete this.vals[this.keys.shift()];
      this.keys.push(key);
    }
    this.vals[key] = value;
  }
}`,
      py: `class LRUCache:
    def __init__(self, capacity):
        self.cap, self.keys, self.vals = capacity, [], {}

    def get(self, key):
        if key not in self.vals:
            return -1
        self.keys.remove(key)
        self.keys.append(key)
        return self.vals[key]

    def put(self, key, value):
        if key in self.vals:
            self.keys.remove(key)
        elif len(self.keys) == self.cap:
            del self.vals[self.keys.pop(0)]
        self.keys.append(key)
        self.vals[key] = value`,
      pitfalls: ['A put on an existing key is a use too and must move it to the back.'] },
    { name: 'Map plus linked order', idea: 'A map finds any key at once, and a doubly linked list keeps the use order, so moving a key or dropping the oldest is O(1). JavaScript’s Map already keeps insertion order, which does both jobs.',
      time: 'O(1) per call', space: 'O(capacity)', why: 'Each call does a fixed number of map and list steps.',
      js: `class LRUCache {
  constructor(capacity) { this.cap = capacity; this.m = new Map(); }
  get(key) {
    if (!this.m.has(key)) return -1;
    const v = this.m.get(key);
    this.m.delete(key);
    this.m.set(key, v);
    return v;
  }
  put(key, value) {
    this.m.delete(key);
    this.m.set(key, value);
    if (this.m.size > this.cap) this.m.delete(this.m.keys().next().value);
  }
}`,
      py: `class LRUCache:
    def __init__(self, capacity):
        from collections import OrderedDict
        self.cap, self.m = capacity, OrderedDict()

    def get(self, key):
        if key not in self.m:
            return -1
        self.m.move_to_end(key)
        return self.m[key]

    def put(self, key, value):
        self.m[key] = value
        self.m.move_to_end(key)
        if len(self.m) > self.cap:
            self.m.popitem(last=False)`,
      pitfalls: ['Evicting before inserting an existing key throws out the wrong key.', 'In an interview you may be asked to build the linked list yourself.'] }
  ],
  'running-sum-of-1d-array': [
    { name: 'Sum each prefix again', idea: 'For each position, add up everything from the start to there.',
      time: 'O(n²)', space: 'O(1)', why: 'Position i adds i + 1 numbers.', slow: true,
      js: `function runningSum(nums) {
  return nums.map((_, i) => nums.slice(0, i + 1).reduce((a, b) => a + b, 0));
}`,
      py: `def runningSum(nums):
    return [sum(nums[:i + 1]) for i in range(len(nums))]`,
      pitfalls: ['Redoing the whole sum each time is the slow part.'] },
    { name: 'Carry the total', idea: 'Keep a running total and write it at each position.',
      time: 'O(n)', space: 'O(1)', why: 'One pass; the answer list does not count.',
      js: `function runningSum(nums) {
  const out = [];
  let total = 0;
  for (const x of nums) out.push(total += x);
  return out;
}`,
      py: `def runningSum(nums):
    out, total = [], 0
    for x in nums:
        total += x
        out.append(total)
    return out`,
      pitfalls: ['Adding the new number after writing gives the sum before i, not up to i.'] }
  ],
  'range-sum-query-immutable': [
    { name: 'Add the range each time', idea: 'Keep nums and add up the asked range on every call.',
      time: 'O(n) per call', space: 'O(n)', why: 'A call may add the whole list.',
      js: `class NumArray {
  constructor(nums) { this.nums = nums; }
  sumRange(left, right) {
    let s = 0;
    for (let i = left; i <= right; i++) s += this.nums[i];
    return s;
  }
}`,
      py: `class NumArray:
    def __init__(self, nums):
        self.nums = nums

    def sumRange(self, left, right):
        return sum(self.nums[left:right + 1])`,
      pitfalls: ['Both ends are included.'] },
    { name: 'Prefix sums', idea: 'Store pre[i], the sum of the first i numbers. A range sum is pre[right + 1] - pre[left].',
      time: 'O(1) per call', space: 'O(n)', why: 'Setup is one pass; every call is one subtraction.',
      js: `class NumArray {
  constructor(nums) {
    this.pre = [0];
    for (const x of nums) this.pre.push(this.pre[this.pre.length - 1] + x);
  }
  sumRange(left, right) { return this.pre[right + 1] - this.pre[left]; }
}`,
      py: `class NumArray:
    def __init__(self, nums):
        self.pre = [0]
        for x in nums:
            self.pre.append(self.pre[-1] + x)

    def sumRange(self, left, right):
        return self.pre[right + 1] - self.pre[left]`,
      pitfalls: ['Without the extra 0 at the front, a range starting at 0 needs a special case.'] }
  ],
  'product-except-self': [
    { name: 'Multiply all the others', idea: 'For each position, multiply every other number.',
      time: 'O(n²)', space: 'O(1)', why: 'Each of n positions multiplies n - 1 numbers.', slow: true,
      js: `function productExceptSelf(nums) {
  return nums.map((_, i) => nums.reduce((p, x, j) => (j === i ? p : p * x), 1));
}`,
      py: `def productExceptSelf(nums):
    out = []
    for i in range(len(nums)):
        p = 1
        for j, x in enumerate(nums):
            if j != i:
                p *= x
        out.append(p)
    return out`,
      pitfalls: ['Dividing the total by nums[i] breaks when a value is 0.'] },
    { name: 'Left and right lists', idea: 'Store the product of everything left of each position and everything right of it, then multiply the two.',
      time: 'O(n)', space: 'O(n)', why: 'Three passes and two extra lists.',
      js: `function productExceptSelf(nums) {
  const n = nums.length, left = new Array(n).fill(1), right = new Array(n).fill(1);
  for (let i = 1; i < n; i++) left[i] = left[i - 1] * nums[i - 1];
  for (let i = n - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1];
  return left.map((x, i) => x * right[i]);
}`,
      py: `def productExceptSelf(nums):
    n = len(nums)
    left, right = [1] * n, [1] * n
    for i in range(1, n):
        left[i] = left[i - 1] * nums[i - 1]
    for i in range(n - 2, -1, -1):
        right[i] = right[i + 1] * nums[i + 1]
    return [a * b for a, b in zip(left, right)]`,
      pitfalls: ['Including nums[i] in its own left or right product.'] },
    { name: 'Two sweeps, one list', idea: 'Write the left products into the answer, then sweep from the right with a running product and multiply it in.',
      time: 'O(n)', space: 'O(1)', why: 'Two passes; only the answer list and one number.',
      js: `function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) out[i] = out[i - 1] * nums[i - 1];
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }
  return out;
}`,
      py: `def productExceptSelf(nums):
    out = [1] * len(nums)
    for i in range(1, len(nums)):
        out[i] = out[i - 1] * nums[i - 1]
    right = 1
    for i in range(len(nums) - 1, -1, -1):
        out[i] *= right
        right *= nums[i]
    return out`,
      pitfalls: ['Updating right before multiplying it in counts nums[i] itself.', 'JavaScript gives -0 for some products; the tests treat it as 0.'] }
  ],
  'subarray-sum-k': [
    { name: 'Every stretch', idea: 'Try every start, extend the end one at a time with a running sum, and count sums equal to k.',
      time: 'O(n²)', space: 'O(1)', why: 'n starts, each extended to the end.', slow: true,
      js: `function subarraySum(nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) if ((s += nums[j]) === k) count++;
  }
  return count;
}`,
      py: `def subarraySum(nums, k):
    count = 0
    for i in range(len(nums)):
        s = 0
        for j in range(i, len(nums)):
            s += nums[j]
            if s == k:
                count += 1
    return count`,
      pitfalls: ['Stopping when the sum passes k fails with negative numbers.'] },
    { name: 'Checkpoint totals in a map', idea: 'Keep the running total and how often each total has appeared. A stretch ending here sums to k when total minus k appeared before.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the map holds up to n totals.',
      js: `function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let total = 0, count = 0;
  for (const x of nums) {
    total += x;
    count += seen.get(total - k) || 0;
    seen.set(total, (seen.get(total) || 0) + 1);
  }
  return count;
}`,
      py: `def subarraySum(nums, k):
    seen = {0: 1}
    total = count = 0
    for x in nums:
        total += x
        count += seen.get(total - k, 0)
        seen[total] = seen.get(total, 0) + 1
    return count`,
      pitfalls: ['Forgetting the starting total 0, which counts stretches that begin at index 0.', 'Recording the total before counting, which pairs a stretch with itself when k is 0.'] }
  ],
  'subarray-sums-divisible-by-k': [
    { name: 'Every stretch', idea: 'Try every start and end with a running sum, and count sums divisible by k.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 stretches.', slow: true,
      js: `function subarraysDivByK(nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) if ((s += nums[j]) % k === 0) count++;
  }
  return count;
}`,
      py: `def subarraysDivByK(nums, k):
    count = 0
    for i in range(len(nums)):
        s = 0
        for j in range(i, len(nums)):
            s += nums[j]
            if s % k == 0:
                count += 1
    return count`,
      pitfalls: ['In JavaScript -3 % 3 is -0, which still equals 0, so this check is safe.'] },
    { name: 'Count remainders', idea: 'Two running totals with the same remainder mod k fence off a stretch divisible by k. Count how often each remainder appears.',
      time: 'O(n)', space: 'O(k)', why: 'One pass; at most k different remainders.',
      js: `function subarraysDivByK(nums, k) {
  const seen = new Array(k).fill(0);
  seen[0] = 1;
  let total = 0, count = 0;
  for (const x of nums) {
    total = (((total + x) % k) + k) % k;
    count += seen[total];
    seen[total]++;
  }
  return count;
}`,
      py: `def subarraysDivByK(nums, k):
    seen = [0] * k
    seen[0] = 1
    total = count = 0
    for x in nums:
        total = (total + x) % k
        count += seen[total]
        seen[total] += 1
    return count`,
      pitfalls: ['In JavaScript a negative total gives a negative remainder; add k and take % k again.'] }
  ],
  'binary-search': [
    { name: 'Walk the list', idea: 'Check every index from the left until you find target.',
      time: 'O(n)', space: 'O(1)', why: 'It may look at every number.',
      js: `function search(nums, target) {
  for (let i = 0; i < nums.length; i++) if (nums[i] === target) return i;
  return -1;
}`,
      py: `def search(nums, target):
    for i, x in enumerate(nums):
        if x == target:
            return i
    return -1`,
      pitfalls: ['It ignores the sorted order, which is the whole point.'] },
    { name: 'Halve the range', idea: 'Look at the middle of the range. If it is too small, the target can only be to the right; too big, to the left. Each guess halves the range.',
      time: 'O(log n)', space: 'O(1)', why: 'The range halves every step.',
      js: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}`,
      py: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
      pitfalls: ['Writing lo = mid instead of mid + 1 can loop forever.', 'Using lo < hi with hi = n - 1 skips checking the last remaining index.'] }
  ],
  'search-insert-position': [
    { name: 'Walk until not smaller', idea: 'Return the first index whose value is at least target, or the length.',
      time: 'O(n)', space: 'O(1)', why: 'It may look at every number.',
      js: `function searchInsert(nums, target) {
  let i = 0;
  while (i < nums.length && nums[i] < target) i++;
  return i;
}`,
      py: `def searchInsert(nums, target):
    i = 0
    while i < len(nums) and nums[i] < target:
        i += 1
    return i`,
      pitfalls: ['A target bigger than everything goes at the end, index n.'] },
    { name: 'Lower bound search', idea: 'Binary search for the first index whose value is at least target, keeping the answer range [lo, hi).',
      time: 'O(log n)', space: 'O(1)', why: 'The range halves every step.',
      js: `function searchInsert(nums, target) {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1; else hi = mid;
  }
  return lo;
}`,
      py: `def searchInsert(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
      pitfalls: ['Starting hi at n - 1 cannot return n.'] }
  ],
  'find-first-and-last-position-of-element-in-sorted-array': [
    { name: 'Scan for both ends', idea: 'Walk the list and record the first and last index holding target.',
      time: 'O(n)', space: 'O(1)', why: 'It may look at every number.',
      js: `function searchRange(nums, target) {
  return [nums.indexOf(target), nums.lastIndexOf(target)];
}`,
      py: `def searchRange(nums, target):
    if target not in nums:
        return [-1, -1]
    return [nums.index(target), len(nums) - 1 - nums[::-1].index(target)]`,
      pitfalls: ['Finding one copy and walking outward is O(n) when the whole list is target.'] },
    { name: 'Two lower bounds', idea: 'Binary search for the first index at least target and the first index at least target + 1. The answer sits between them.',
      time: 'O(log n)', space: 'O(1)', why: 'Two binary searches.',
      js: `function searchRange(nums, target) {
  const lower = (x) => {
    let lo = 0, hi = nums.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (nums[mid] < x) lo = mid + 1; else hi = mid; }
    return lo;
  };
  const a = lower(target), b = lower(target + 1) - 1;
  return a <= b ? [a, b] : [-1, -1];
}`,
      py: `def searchRange(nums, target):
    def lower(x):
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < x:
                lo = mid + 1
            else:
                hi = mid
        return lo
    a, b = lower(target), lower(target + 1) - 1
    return [a, b] if a <= b else [-1, -1]`,
      pitfalls: ['Checking nums[a] without checking a < n reads past the end.'] }
  ],
  'search-a-2d-matrix': [
    { name: 'Check every cell', idea: 'Look at every value.',
      time: 'O(m·n)', space: 'O(1)', why: 'Every cell may be read.',
      js: `function searchMatrix(matrix, target) {
  return matrix.some((row) => row.includes(target));
}`,
      py: `def searchMatrix(matrix, target):
    return any(target in row for row in matrix)`,
      pitfalls: ['It ignores that the rows chain into one sorted list.'] },
    { name: 'One binary search over all cells', idea: 'Read the rows one after another as a single sorted list. Index i sits at row i / n, column i % n.',
      time: 'O(log(m·n))', space: 'O(1)', why: 'Binary search over m·n positions.',
      js: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1, v = matrix[Math.floor(mid / n)][mid % n];
    if (v === target) return true;
    if (v < target) lo = mid + 1; else hi = mid - 1;
  }
  return false;
}`,
      py: `def searchMatrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    lo, hi = 0, m * n - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        v = matrix[mid // n][mid % n]
        if v == target:
            return True
        if v < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False`,
      pitfalls: ['Dividing by the number of rows instead of columns.'] }
  ],
  'find-min-rotated': [
    { name: 'Scan for the smallest', idea: 'Look at every value and keep the smallest.',
      time: 'O(n)', space: 'O(1)', why: 'Every value is read.',
      js: `function findMin(nums) {
  return Math.min(...nums);
}`,
      py: `def findMin(nums):
    return min(nums)`,
      pitfalls: ['Correct, but it ignores the order you were given.'] },
    { name: 'Compare the middle with the end', idea: 'If the middle is bigger than the last value, the drop is to its right; otherwise the minimum is the middle or to its left.',
      time: 'O(log n)', space: 'O(1)', why: 'The range halves every step.',
      js: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1; else hi = mid;
  }
  return nums[lo];
}`,
      py: `def findMin(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]`,
      pitfalls: ['Comparing with the first value instead of the last breaks when the list was not rotated at all.', 'hi = mid - 1 can skip the minimum itself.'] }
  ],
  'search-rotated': [
    { name: 'Scan', idea: 'Look at every index.',
      time: 'O(n)', space: 'O(1)', why: 'Every value may be read.',
      js: `function search(nums, target) {
  return nums.indexOf(target);
}`,
      py: `def search(nums, target):
    return nums.index(target) if target in nums else -1`,
      pitfalls: ['Correct, but not the O(log n) that is asked for.'] },
    { name: 'Find the sorted half', idea: 'At every split one half is in order. If target lies inside that half’s range, search it; otherwise search the other half.',
      time: 'O(log n)', space: 'O(1)', why: 'The range halves every step.',
      js: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1; else hi = mid - 1;
    }
  }
  return -1;
}`,
      py: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
      pitfalls: ['Using < instead of <= in nums[lo] <= nums[mid] fails when lo equals mid.'] }
  ],
  'koko-eating-bananas': [
    { name: 'Try every speed', idea: 'Try speeds 1, 2, 3, ... and return the first that finishes in h hours.',
      time: 'O(n · m)', space: 'O(1)', why: 'Up to m speeds, each checked over n piles; m is the biggest pile.', slow: true,
      js: `function minEatingSpeed(piles, h) {
  for (let k = 1; ; k++) {
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / k);
    if (hours <= h) return k;
  }
}`,
      py: `def minEatingSpeed(piles, h):
    k = 1
    while sum((p + k - 1) // k for p in piles) > h:
        k += 1
    return k`,
      pitfalls: ['Rounding the hours per pile down instead of up.'] },
    { name: 'Binary search the speed', idea: 'A faster speed never needs more hours, so binary search speeds from 1 to the biggest pile for the smallest that finishes in time.',
      time: 'O(n log m)', space: 'O(1)', why: 'log m candidate speeds, each checked in one pass over the piles.',
      js: `function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const k = Math.floor((lo + hi) / 2);
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / k);
    if (hours <= h) hi = k; else lo = k + 1;
  }
  return lo;
}`,
      py: `def minEatingSpeed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        k = (lo + hi) // 2
        if sum((p + k - 1) // k for p in piles) <= h:
            hi = k
        else:
            lo = k + 1
    return lo`,
      pitfalls: ['(lo + hi) >> 1 overflows in JavaScript once piles reach 10⁹; use Math.floor.'] }
  ],
  'time-based-key-value-store': [
    { name: 'Scan the history', idea: 'Store each key’s (time, value) pairs, and on get walk back from the newest until the time fits.',
      time: 'O(n) per call', space: 'O(n)', why: 'A get may walk a key’s whole history.',
      js: `class TimeMap {
  constructor() { this.m = new Map(); }
  set(key, value, timestamp) {
    if (!this.m.has(key)) this.m.set(key, []);
    this.m.get(key).push([timestamp, value]);
  }
  get(key, timestamp) {
    const a = this.m.get(key) || [];
    for (let i = a.length - 1; i >= 0; i--) if (a[i][0] <= timestamp) return a[i][1];
    return '';
  }
}`,
      py: `class TimeMap:
    def __init__(self):
        self.m = {}

    def set(self, key, value, timestamp):
        self.m.setdefault(key, []).append((timestamp, value))

    def get(self, key, timestamp):
        for t, v in reversed(self.m.get(key, [])):
            if t <= timestamp:
                return v
        return ''`,
      pitfalls: ['A key never set returns "", not undefined.'] },
    { name: 'Binary search the history', idea: 'Times passed to set only grow, so each key’s history is sorted. Binary search for the last time at or before the asked one.',
      time: 'O(log n) per call', space: 'O(n)', why: 'set appends in O(1); get is one binary search.',
      js: `class TimeMap {
  constructor() { this.m = new Map(); }
  set(key, value, timestamp) {
    if (!this.m.has(key)) this.m.set(key, []);
    this.m.get(key).push([timestamp, value]);
  }
  get(key, timestamp) {
    const a = this.m.get(key) || [];
    let lo = 0, hi = a.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (a[mid][0] <= timestamp) lo = mid + 1; else hi = mid;
    }
    return lo ? a[lo - 1][1] : '';
  }
}`,
      py: `class TimeMap:
    def __init__(self):
        self.m = {}

    def set(self, key, value, timestamp):
        self.m.setdefault(key, []).append((timestamp, value))

    def get(self, key, timestamp):
        a = self.m.get(key, [])
        lo, hi = 0, len(a)
        while lo < hi:
            mid = (lo + hi) // 2
            if a[mid][0] <= timestamp:
                lo = mid + 1
            else:
                hi = mid
        return a[lo - 1][1] if lo else ''`,
      pitfalls: ['Searching for the first time after the asked one and forgetting to step back one.'] }
  ],
  'rotate-image': [
    { name: 'Copy into a new grid', idea: 'Cell (r, c) moves to (c, n - 1 - r). Fill a copy that way, then write it back.',
      time: 'O(n²)', space: 'O(n²)', why: 'Every cell is moved once, through a full copy.',
      js: `function rotate(matrix) {
  const n = matrix.length, copy = matrix.map((row) => row.slice());
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) matrix[c][n - 1 - r] = copy[r][c];
}`,
      py: `def rotate(matrix):
    n = len(matrix)
    copy = [row[:] for row in matrix]
    for r in range(n):
        for c in range(n):
            matrix[c][n - 1 - r] = copy[r][c]`,
      pitfalls: ['Assigning matrix = copy only changes your local name; the tests read the original grid.'] },
    { name: 'Flip on the diagonal, then mirror', idea: 'Swap matrix[r][c] with matrix[c][r] above the diagonal, then reverse each row. Together that is a quarter turn clockwise.',
      time: 'O(n²)', space: 'O(1)', why: 'Each cell is swapped a fixed number of times, in place.',
      js: `function rotate(matrix) {
  const n = matrix.length;
  for (let r = 0; r < n; r++)
    for (let c = r + 1; c < n; c++) [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
  for (const row of matrix) row.reverse();
}`,
      py: `def rotate(matrix):
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()`,
      pitfalls: ['Swapping every (r, c), not just above the diagonal, swaps each pair twice and undoes it.', 'Reversing the columns instead of the rows turns it the other way.'] }
  ],
  'spiral-matrix': [
    { name: 'Walk and turn on visited cells', idea: 'Walk right, down, left, up, turning whenever the next cell is off the grid or already visited.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Each cell is visited once; a seen grid marks visits.',
      js: `function spiralOrder(matrix) {
  const m = matrix.length, n = matrix[0].length, seen = matrix.map((r) => r.map(() => false));
  const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0], out = [];
  let r = 0, c = 0, d = 0;
  for (let i = 0; i < m * n; i++) {
    out.push(matrix[r][c]);
    seen[r][c] = true;
    const nr = r + dr[d], nc = c + dc[d];
    if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) d = (d + 1) % 4;
    r += dr[d]; c += dc[d];
  }
  return out;
}`,
      py: `def spiralOrder(matrix):
    m, n = len(matrix), len(matrix[0])
    seen = [[False] * n for _ in range(m)]
    dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    r = c = d = 0
    out = []
    for _ in range(m * n):
        out.append(matrix[r][c])
        seen[r][c] = True
        nr, nc = r + dirs[d][0], c + dirs[d][1]
        if not (0 <= nr < m and 0 <= nc < n) or seen[nr][nc]:
            d = (d + 1) % 4
        r, c = r + dirs[d][0], c + dirs[d][1]
    return out`,
      pitfalls: ['Turning after moving instead of before steps off the grid.'] },
    { name: 'Shrink four walls', idea: 'Keep top, bottom, left and right walls. Read the top row, the right column, the bottom row and the left column, moving each wall inward after reading it.',
      time: 'O(m·n)', space: 'O(1)', why: 'Each cell is read once; only four walls are kept.',
      js: `function spiralOrder(matrix) {
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  const out = [];
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]);
    right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) out.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) out.push(matrix[r][left]); left++; }
  }
  return out;
}`,
      py: `def spiralOrder(matrix):
    top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1
    out = []
    while top <= bottom and left <= right:
        out += matrix[top][left:right + 1]
        top += 1
        for r in range(top, bottom + 1):
            out.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            out += matrix[bottom][left:right + 1][::-1]
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                out.append(matrix[r][left])
            left += 1
    return out`,
      pitfalls: ['A single leftover row or column is read twice without the two extra checks.'] }
  ],
  'set-matrix-zeroes': [
    { name: 'Remember rows and columns', idea: 'First note every row and column that holds a 0, then zero them.',
      time: 'O(m·n)', space: 'O(m + n)', why: 'Two passes over the grid; two small sets.',
      js: `function setZeroes(matrix) {
  const rows = new Set(), cols = new Set();
  matrix.forEach((row, r) => row.forEach((v, c) => { if (v === 0) { rows.add(r); cols.add(c); } }));
  matrix.forEach((row, r) => row.forEach((_, c) => { if (rows.has(r) || cols.has(c)) row[c] = 0; }));
}`,
      py: `def setZeroes(matrix):
    rows, cols = set(), set()
    for r, row in enumerate(matrix):
        for c, v in enumerate(row):
            if v == 0:
                rows.add(r)
                cols.add(c)
    for r, row in enumerate(matrix):
        for c in range(len(row)):
            if r in rows or c in cols:
                row[c] = 0`,
      pitfalls: ['Zeroing while you scan spreads the new zeros to rows that had none.'] },
    { name: 'Use the first row and column as notes', idea: 'Mark a zero at (r, c) by zeroing matrix[r][0] and matrix[0][c]. Two flags remember whether the first row and column held zeros themselves.',
      time: 'O(m·n)', space: 'O(1)', why: 'The notes live inside the grid.',
      js: `function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const row0 = matrix[0].includes(0), col0 = matrix.some((r) => r[0] === 0);
  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) if (matrix[r][c] === 0) { matrix[r][0] = 0; matrix[0][c] = 0; }
  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
  if (row0) for (let c = 0; c < n; c++) matrix[0][c] = 0;
  if (col0) for (let r = 0; r < m; r++) matrix[r][0] = 0;
}`,
      py: `def setZeroes(matrix):
    m, n = len(matrix), len(matrix[0])
    row0 = 0 in matrix[0]
    col0 = any(r[0] == 0 for r in matrix)
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][c] == 0:
                matrix[r][0] = matrix[0][c] = 0
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if row0:
        for c in range(n):
            matrix[0][c] = 0
    if col0:
        for r in range(m):
            matrix[r][0] = 0`,
      pitfalls: ['Zeroing the first row or column before using them as notes erases the notes.'] }
  ],
  'search-a-2d-matrix-ii': [
    { name: 'Binary search each row', idea: 'Every row is sorted, so binary search each one.',
      time: 'O(m log n)', space: 'O(1)', why: 'One binary search per row.',
      js: `function searchMatrix(matrix, target) {
  for (const row of matrix) {
    let lo = 0, hi = row.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (row[mid] === target) return true;
      if (row[mid] < target) lo = mid + 1; else hi = mid - 1;
    }
  }
  return false;
}`,
      py: `def searchMatrix(matrix, target):
    import bisect
    for row in matrix:
        i = bisect.bisect_left(row, target)
        if i < len(row) and row[i] == target:
            return True
    return False`,
      pitfalls: ['Treating the whole grid as one sorted list: here rows do not chain.'] },
    { name: 'Staircase from the top-right', idea: 'Start at the top-right corner. Too big: step left. Too small: step down. Each step rules out a row or a column.',
      time: 'O(m + n)', space: 'O(1)', why: 'At most m + n steps.',
      js: `function searchMatrix(matrix, target) {
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    const v = matrix[r][c];
    if (v === target) return true;
    if (v > target) c--; else r++;
  }
  return false;
}`,
      py: `def searchMatrix(matrix, target):
    r, c = 0, len(matrix[0]) - 1
    while r < len(matrix) and c >= 0:
        v = matrix[r][c]
        if v == target:
            return True
        if v > target:
            c -= 1
        else:
            r += 1
    return False`,
      pitfalls: ['Starting at the top-left: both moves make the value bigger, so you cannot decide which way to go.'] }
  ],
  'meeting-rooms': [
    { name: 'Check every pair', idea: 'Two meetings clash when each starts before the other ends.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 pairs.', slow: true,
      js: `function canAttendMeetings(intervals) {
  for (let i = 0; i < intervals.length; i++)
    for (let j = i + 1; j < intervals.length; j++) {
      const [a, b] = intervals[i], [c, d] = intervals[j];
      if (a < d && c < b) return false;
    }
  return true;
}`,
      py: `def canAttendMeetings(intervals):
    for i in range(len(intervals)):
        for j in range(i + 1, len(intervals)):
            a, b = intervals[i]
            c, d = intervals[j]
            if a < d and c < b:
                return False
    return True`,
      pitfalls: ['A meeting that starts the moment another ends is fine; use < not <=.'] },
    { name: 'Sort by start', idea: 'Sort by start time. Then a clash can only happen between neighbours: one starts before the previous ends.',
      time: 'O(n log n)', space: 'O(1)', why: 'The sort sets the time.',
      js: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) if (intervals[i][0] < intervals[i - 1][1]) return false;
  return true;
}`,
      py: `def canAttendMeetings(intervals):
    intervals.sort()
    return all(intervals[i][0] >= intervals[i - 1][1] for i in range(1, len(intervals)))`,
      pitfalls: ['No meetings at all is fine: return true.'] }
  ],
  'merge-intervals': [
    { name: 'Merge until nothing changes', idea: 'Repeatedly find two meetings that overlap or touch and replace them with one, until none do.',
      time: 'O(n³)', space: 'O(n)', why: 'Up to n merges, each found by checking pairs.', slow: true,
      js: `function merge(intervals) {
  const list = intervals.map((x) => x.slice());
  let changed = true;
  while (changed) {
    changed = false;
    outer: for (let i = 0; i < list.length; i++)
      for (let j = i + 1; j < list.length; j++)
        if (list[i][0] <= list[j][1] && list[j][0] <= list[i][1]) {
          list[i] = [Math.min(list[i][0], list[j][0]), Math.max(list[i][1], list[j][1])];
          list.splice(j, 1);
          changed = true;
          break outer;
        }
  }
  return list;
}`,
      py: `def merge(intervals):
    out = [list(x) for x in intervals]
    changed = True
    while changed:
        changed = False
        for i in range(len(out)):
            for j in range(i + 1, len(out)):
                if out[i][0] <= out[j][1] and out[j][0] <= out[i][1]:
                    out[i] = [min(out[i][0], out[j][0]), max(out[i][1], out[j][1])]
                    out.pop(j)
                    changed = True
                    break
            if changed:
                break
    return out`,
      pitfalls: ['Touching meetings like [1, 4] and [4, 5] merge too.'] },
    { name: 'Sort, then stretch the last one', idea: 'Sort by start. Walk the meetings: if one starts before the last merged one ends, stretch that end; otherwise start a new one.',
      time: 'O(n log n)', space: 'O(n)', why: 'The sort sets the time; the merged list can hold n meetings.',
      js: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [s, e] of intervals) {
    if (out.length && s <= out[out.length - 1][1]) out[out.length - 1][1] = Math.max(out[out.length - 1][1], e);
    else out.push([s, e]);
  }
  return out;
}`,
      py: `def merge(intervals):
    out = []
    for s, e in sorted(intervals):
        if out and s <= out[-1][1]:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return out`,
      pitfalls: ['Setting the end to e instead of the larger of the two: [1, 10] then [2, 3] must stay [1, 10].'] }
  ],
  'insert-interval': [
    { name: 'Add it and merge all', idea: 'Append the new meeting, sort, and merge everything as in merge intervals.',
      time: 'O(n log n)', space: 'O(n)', why: 'The sort sets the time.',
      js: `function insert(intervals, newInterval) {
  const all = intervals.concat([newInterval]).sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [s, e] of all) {
    if (out.length && s <= out[out.length - 1][1]) out[out.length - 1][1] = Math.max(out[out.length - 1][1], e);
    else out.push([s, e]);
  }
  return out;
}`,
      py: `def insert(intervals, newInterval):
    out = []
    for s, e in sorted(intervals + [newInterval]):
        if out and s <= out[-1][1]:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return out`,
      pitfalls: ['It does not use the fact that the list is already sorted.'] },
    { name: 'Before, overlap, after', idea: 'Copy every meeting that ends before the new one starts. Merge every meeting that overlaps it. Copy the rest.',
      time: 'O(n)', space: 'O(1)', why: 'One pass; only the answer list is built.',
      js: `function insert(intervals, newInterval) {
  const out = [];
  let [s, e] = newInterval, i = 0;
  while (i < intervals.length && intervals[i][1] < s) out.push(intervals[i++]);
  while (i < intervals.length && intervals[i][0] <= e) { s = Math.min(s, intervals[i][0]); e = Math.max(e, intervals[i][1]); i++; }
  out.push([s, e]);
  while (i < intervals.length) out.push(intervals[i++]);
  return out;
}`,
      py: `def insert(intervals, newInterval):
    out, i = [], 0
    s, e = newInterval
    while i < len(intervals) and intervals[i][1] < s:
        out.append(intervals[i])
        i += 1
    while i < len(intervals) and intervals[i][0] <= e:
        s, e = min(s, intervals[i][0]), max(e, intervals[i][1])
        i += 1
    out.append([s, e])
    return out + intervals[i:]`,
      pitfalls: ['Touching counts as overlap: [1, 3] and [3, 5] merge.'] }
  ],
  'non-overlapping-intervals': [
    { name: 'Try every subset', idea: 'Keep the largest set of intervals that do not overlap, by trying keep or drop for each one after sorting.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Each interval is kept or dropped.', slow: true,
      js: `function eraseOverlapIntervals(intervals) {
  const a = intervals.slice().sort((x, y) => x[0] - y[0]);
  const best = (i, end) => {
    if (i === a.length) return 0;
    let r = best(i + 1, end);
    if (a[i][0] >= end) r = Math.max(r, 1 + best(i + 1, a[i][1]));
    return r;
  };
  return a.length - best(0, -Infinity);
}`,
      py: `def eraseOverlapIntervals(intervals):
    a = sorted(intervals)
    def best(i, end):
        if i == len(a):
            return 0
        r = best(i + 1, end)
        if a[i][0] >= end:
            r = max(r, 1 + best(i + 1, a[i][1]))
        return r
    return len(a) - best(0, float('-inf'))`,
      pitfalls: ['Intervals that only touch do not overlap.'] },
    { name: 'Keep the earliest end', idea: 'Sort by end. Keep a meeting whenever it starts at or after the last kept end; every other one is removed. Ending early leaves the most room.',
      time: 'O(n log n)', space: 'O(1)', why: 'The sort sets the time; one pass after it.',
      js: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let end = -Infinity, removed = 0;
  for (const [s, e] of intervals) {
    if (s >= end) end = e; else removed++;
  }
  return removed;
}`,
      py: `def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x: x[1])
    end, removed = float('-inf'), 0
    for s, e in intervals:
        if s >= end:
            end = e
        else:
            removed += 1
    return removed`,
      pitfalls: ['Sorting by start and keeping the first is wrong: a long early meeting blocks many short ones.'] }
  ],
  'meeting-rooms-ii': [
    { name: 'Count at every start', idea: 'At each meeting’s start time, count how many meetings are running. The largest count is the rooms needed.',
      time: 'O(n²)', space: 'O(1)', why: 'Each start checks every meeting.', slow: true,
      js: `function minMeetingRooms(intervals) {
  let best = 0;
  for (const [t] of intervals) best = Math.max(best, intervals.filter(([s, e]) => s <= t && t < e).length);
  return best;
}`,
      py: `def minMeetingRooms(intervals):
    best = 0
    for t, _ in intervals:
        best = max(best, sum(1 for s, e in intervals if s <= t < e))
    return best`,
      pitfalls: ['A meeting ending at t frees its room for one starting at t.'] },
    { name: 'Rooms by earliest end', idea: 'Sort by start. Keep the end times of busy rooms in a min-heap; reuse the room that frees first if it is free by now, else open a new one.',
      time: 'O(n log n)', space: 'O(n)', why: 'Sorting plus one heap step per meeting.',
      js: `function minMeetingRooms(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const heap = [];
  const push = (x) => { heap.push(x); let i = heap.length - 1; while (i && heap[(i - 1) >> 1] > heap[i]) { [heap[i], heap[(i - 1) >> 1]] = [heap[(i - 1) >> 1], heap[i]]; i = (i - 1) >> 1; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < heap.length && heap[l] < heap[m]) m = l; if (r < heap.length && heap[r] < heap[m]) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } } return top; };
  for (const [s, e] of intervals) {
    if (heap.length && heap[0] <= s) pop();
    push(e);
  }
  return heap.length;
}`,
      py: `def minMeetingRooms(intervals):
    import heapq
    ends = []
    for s, e in sorted(intervals):
        if ends and ends[0] <= s:
            heapq.heappop(ends)
        heapq.heappush(ends, e)
    return len(ends)`,
      pitfalls: ['A separate sorted starts list and ends list with two pointers works too, in the same time.'] }
  ],
  'best-time-to-buy-and-sell-stock-ii': [
    { name: 'Try buy or skip each day', idea: 'Search every choice of holding or not holding on each day.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Two choices per day.', slow: true,
      js: `function maxProfit(prices) {
  const go = (i, holding) => {
    if (i === prices.length) return 0;
    const wait = go(i + 1, holding);
    return Math.max(wait, holding ? prices[i] + go(i + 1, false) : -prices[i] + go(i + 1, true));
  };
  return go(0, false);
}`,
      py: `def maxProfit(prices):
    def go(i, holding):
        if i == len(prices):
            return 0
        wait = go(i + 1, holding)
        if holding:
            return max(wait, prices[i] + go(i + 1, False))
        return max(wait, -prices[i] + go(i + 1, True))
    return go(0, False)`,
      pitfalls: ['Ending while still holding a share wastes its price.'] },
    { name: 'Take every rise', idea: 'Any profit is a sum of day-to-day rises, so add every rise from one day to the next.',
      time: 'O(n)', space: 'O(1)', why: 'One pass.',
      js: `function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) profit += Math.max(0, prices[i] - prices[i - 1]);
  return profit;
}`,
      py: `def maxProfit(prices):
    return sum(max(0, prices[i] - prices[i - 1]) for i in range(1, len(prices)))`,
      pitfalls: ['Looking for the single best trade answers a different question.'] }
  ],
  'jump-game': [
    { name: 'Mark every reachable stone', idea: 'From each stone you can reach, mark every stone it can jump to.',
      time: 'O(n²)', space: 'O(n)', why: 'Each stone may mark up to n others.', slow: true,
      js: `function canJump(nums) {
  const ok = new Array(nums.length).fill(false);
  ok[0] = true;
  for (let i = 0; i < nums.length; i++) {
    if (!ok[i]) continue;
    for (let j = i + 1; j <= i + nums[i] && j < nums.length; j++) ok[j] = true;
  }
  return ok[nums.length - 1];
}`,
      py: `def canJump(nums):
    ok = [False] * len(nums)
    ok[0] = True
    for i, x in enumerate(nums):
        if ok[i]:
            for j in range(i + 1, min(len(nums), i + x + 1)):
                ok[j] = True
    return ok[-1]`,
      pitfalls: ['A 0 on the last stone is fine; you only need to land there.'] },
    { name: 'Farthest reach', idea: 'Walk left to right keeping the farthest stone reachable so far. If you stand past it, you are stuck.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, one number.',
      js: `function canJump(nums) {
  let far = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > far) return false;
    far = Math.max(far, i + nums[i]);
  }
  return true;
}`,
      py: `def canJump(nums):
    far = 0
    for i, x in enumerate(nums):
        if i > far:
            return False
        far = max(far, i + x)
    return True`,
      pitfalls: ['Always taking the longest jump can land on a 0; track the reach instead.'] }
  ],
  'jump-game-ii': [
    { name: 'Fewest jumps to each stone', idea: 'For each stone, its fewest jumps is one more than the best earlier stone that can reach it.',
      time: 'O(n²)', space: 'O(n)', why: 'Each stone checks every earlier one.', slow: true,
      js: `function jump(nums) {
  const best = new Array(nums.length).fill(Infinity);
  best[0] = 0;
  for (let j = 1; j < nums.length; j++)
    for (let i = 0; i < j; i++) if (i + nums[i] >= j) best[j] = Math.min(best[j], best[i] + 1);
  return best[nums.length - 1];
}`,
      py: `def jump(nums):
    best = [0] + [float('inf')] * (len(nums) - 1)
    for j in range(1, len(nums)):
        for i in range(j):
            if i + nums[i] >= j:
                best[j] = min(best[j], best[i] + 1)
    return best[-1]`,
      pitfalls: ['With one stone the answer is 0 jumps.'] },
    { name: 'Jump by levels', idea: 'Think of stones reachable in one jump as one level, then two jumps as the next. Walk the current level, tracking how far the next level reaches.',
      time: 'O(n)', space: 'O(1)', why: 'One pass; each stone is in one level.',
      js: `function jump(nums) {
  let jumps = 0, end = 0, far = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]);
    if (i === end) { jumps++; end = far; }
  }
  return jumps;
}`,
      py: `def jump(nums):
    jumps = end = far = 0
    for i in range(len(nums) - 1):
        far = max(far, i + nums[i])
        if i == end:
            jumps += 1
            end = far
    return jumps`,
      pitfalls: ['Looping up to the last stone counts one jump too many.'] }
  ],
  'gas-station': [
    { name: 'Try every start', idea: 'Start at each station and drive round, giving up when the tank goes below zero.',
      time: 'O(n²)', space: 'O(1)', why: 'Each start may drive the whole loop.', slow: true,
      js: `function canCompleteCircuit(gas, cost) {
  const n = gas.length;
  for (let s = 0; s < n; s++) {
    let tank = 0, k = 0;
    for (; k < n; k++) {
      const i = (s + k) % n;
      tank += gas[i] - cost[i];
      if (tank < 0) break;
    }
    if (k === n) return s;
  }
  return -1;
}`,
      py: `def canCompleteCircuit(gas, cost):
    n = len(gas)
    for s in range(n):
        tank = 0
        for k in range(n):
            i = (s + k) % n
            tank += gas[i] - cost[i]
            if tank < 0:
                break
        else:
            return s
    return -1`,
      pitfalls: ['Forgetting to wrap around with % n.'] },
    { name: 'Restart after a dry stretch', idea: 'If the total gas is less than the total cost, no start works. Otherwise drive once; whenever the tank goes negative, the start must be after this station.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two sums.',
      js: `function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    total += gas[i] - cost[i];
    tank += gas[i] - cost[i];
    if (tank < 0) { start = i + 1; tank = 0; }
  }
  return total < 0 ? -1 : start;
}`,
      py: `def canCompleteCircuit(gas, cost):
    total = tank = start = 0
    for i in range(len(gas)):
        total += gas[i] - cost[i]
        tank += gas[i] - cost[i]
        if tank < 0:
            start, tank = i + 1, 0
    return -1 if total < 0 else start`,
      pitfalls: ['Restarting at the station where you ran dry instead of the next one.'] }
  ],
  'partition-labels': [
    { name: 'Grow each piece by scanning', idea: 'Start a piece, and keep extending it while some letter inside it appears again later.',
      time: 'O(n²)', space: 'O(1)', why: 'Each extension may scan the rest of the string.',
      js: `function partitionLabels(s) {
  const out = [];
  let start = 0;
  while (start < s.length) {
    let end = s.lastIndexOf(s[start]);
    for (let i = start; i <= end; i++) end = Math.max(end, s.lastIndexOf(s[i]));
    out.push(end - start + 1);
    start = end + 1;
  }
  return out;
}`,
      py: `def partitionLabels(s):
    out, start = [], 0
    while start < len(s):
        end = s.rfind(s[start])
        i = start
        while i <= end:
            end = max(end, s.rfind(s[i]))
            i += 1
        out.append(end - start + 1)
        start = end + 1
    return out`,
      pitfalls: ['The piece must grow while you scan it, not only from its first letter.'] },
    { name: 'Last position of each letter', idea: 'Record where each letter last appears. Walk the string, stretching the piece end to the last position of each letter you meet; cut when you reach the end.',
      time: 'O(n)', space: 'O(1)', why: 'Two passes; 26 last positions.',
      js: `function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const out = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) { out.push(end - start + 1); start = i + 1; }
  }
  return out;
}`,
      py: `def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}
    out, start, end = [], 0, 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            out.append(end - start + 1)
            start = i + 1
    return out`,
      pitfalls: ['Returning the cut positions instead of the piece lengths.'] }
  ],
  'task-scheduler': [
    { name: 'Run the clock', idea: 'Each time unit, run the most frequent task that is not cooling down, or stay idle.',
      time: 'O(n · 26)', space: 'O(1)', why: 'Each unit scans 26 letters; there are at most n · (gap + 1) units, kept small by the tests.', slow: true,
      js: `function leastInterval(tasks, n) {
  const left = new Array(26).fill(0), ready = new Array(26).fill(0);
  for (const t of tasks) left[t.charCodeAt(0) - 65]++;
  let time = 0, done = 0;
  while (done < tasks.length) {
    let pick = -1;
    for (let c = 0; c < 26; c++) if (left[c] && ready[c] <= time && (pick < 0 || left[c] > left[pick])) pick = c;
    if (pick >= 0) { left[pick]--; ready[pick] = time + n + 1; done++; }
    time++;
  }
  return time;
}`,
      py: `def leastInterval(tasks, n):
    left, ready = [0] * 26, [0] * 26
    for t in tasks:
        left[ord(t) - 65] += 1
    time = done = 0
    while done < len(tasks):
        pick = -1
        for c in range(26):
            if left[c] and ready[c] <= time and (pick < 0 or left[c] > left[pick]):
                pick = c
        if pick >= 0:
            left[pick] -= 1
            ready[pick] = time + n + 1
            done += 1
        time += 1
    return time`,
      pitfalls: ['Picking any ready task instead of the most frequent can waste idle units.'] },
    { name: 'Count the frames', idea: 'The most frequent task sets frames of n + 1 units. The answer is (top - 1) · (n + 1) plus the number of tasks tied for top, or the task count if that is bigger.',
      time: 'O(n)', space: 'O(1)', why: 'One pass to count; 26 counters.',
      js: `function leastInterval(tasks, n) {
  const c = new Array(26).fill(0);
  for (const t of tasks) c[t.charCodeAt(0) - 65]++;
  const top = Math.max(...c), ties = c.filter((x) => x === top).length;
  return Math.max(tasks.length, (top - 1) * (n + 1) + ties);
}`,
      py: `def leastInterval(tasks, n):
    c = [0] * 26
    for t in tasks:
        c[ord(t) - 65] += 1
    top = max(c)
    return max(len(tasks), (top - 1) * (n + 1) + c.count(top))`,
      pitfalls: ['Forgetting the max with the task count: with many kinds there are no idle units at all.'] }
  ],
  'valid-parentheses': [
    { name: 'Erase pairs until stuck', idea: 'Keep removing (), [] and {} wherever they appear. The string was valid if nothing is left.',
      time: 'O(n²)', space: 'O(n)', why: 'Up to n/2 rounds, each rebuilding the string.', slow: true,
      js: `function isValid(s) {
  let prev = null;
  while (prev !== s) { prev = s; s = s.replace('()', '').replace('[]', '').replace('{}', ''); }
  return s === '';
}`,
      py: `def isValid(s):
    prev = None
    while prev != s:
        prev = s
        s = s.replace('()', '').replace('[]', '').replace('{}', '')
    return s == ''`,
      pitfalls: ['Counting brackets of each kind is not enough: "([)]" has matching counts but is wrong.'] },
    { name: 'Stack of plates', idea: 'Push each opening bracket. A closing bracket must match the bracket on top, which is then popped. Valid when the stack ends empty.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the stack can hold every bracket.',
      js: `function isValid(s) {
  const pair = { ')': '(', ']': '[', '}': '{' }, st = [];
  for (const c of s) {
    if (!pair[c]) st.push(c);
    else if (st.pop() !== pair[c]) return false;
  }
  return st.length === 0;
}`,
      py: `def isValid(s):
    pair = {')': '(', ']': '[', '}': '{'}
    st = []
    for c in s:
        if c not in pair:
            st.append(c)
        elif not st or st.pop() != pair[c]:
            return False
    return not st`,
      pitfalls: ['Forgetting the final empty check passes "((".', 'Popping an empty stack in Python raises an error; check first.'] }
  ],
  'min-stack': [
    { name: 'Scan for the minimum', idea: 'Keep an ordinary stack and scan it whenever getMin is asked.',
      time: 'O(n) per call', space: 'O(n)', why: 'getMin reads the whole stack.',
      js: `class MinStack {
  constructor() { this.st = []; }
  push(val) { this.st.push(val); }
  pop() { this.st.pop(); }
  top() { return this.st[this.st.length - 1]; }
  getMin() { return Math.min(...this.st); }
}`,
      py: `class MinStack:
    def __init__(self):
        self.st = []

    def push(self, val):
        self.st.append(val)

    def pop(self):
        self.st.pop()

    def top(self):
        return self.st[-1]

    def getMin(self):
        return min(self.st)`,
      pitfalls: ['A single saved minimum breaks after you pop it.'] },
    { name: 'Write the minimum beside each plate', idea: 'Push each value together with the smallest value in the stack at that moment. The top pair always knows the current minimum.',
      time: 'O(1) per call', space: 'O(n)', why: 'Every call touches only the top pair.',
      js: `class MinStack {
  constructor() { this.st = []; }
  push(val) {
    const m = this.st.length ? Math.min(val, this.st[this.st.length - 1][1]) : val;
    this.st.push([val, m]);
  }
  pop() { this.st.pop(); }
  top() { return this.st[this.st.length - 1][0]; }
  getMin() { return this.st[this.st.length - 1][1]; }
}`,
      py: `class MinStack:
    def __init__(self):
        self.st = []

    def push(self, val):
        m = min(val, self.st[-1][1]) if self.st else val
        self.st.append((val, m))

    def pop(self):
        self.st.pop()

    def top(self):
        return self.st[-1][0]

    def getMin(self):
        return self.st[-1][1]`,
      pitfalls: ['pop returns nothing here; returning the value is harmless in JavaScript but the tests expect null.'] }
  ],
  'evaluate-reverse-polish-notation': [
    { name: 'Collapse the first operator', idea: 'Find the first operator, apply it to the two values before it, put the result in their place, and repeat.',
      time: 'O(n²)', space: 'O(n)', why: 'Each of up to n/2 steps rebuilds the list.', slow: true,
      js: `function evalRPN(tokens) {
  const t = tokens.slice();
  const ops = { '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => Math.trunc(a / b) };
  while (t.length > 1) {
    const i = t.findIndex((x) => x in ops);
    t.splice(i - 2, 3, String(ops[t[i]](Number(t[i - 2]), Number(t[i - 1]))));
  }
  return Number(t[0]);
}`,
      py: `def evalRPN(tokens):
    t = list(tokens)
    while len(t) > 1:
        i = next(k for k, x in enumerate(t) if x in '+-*/' and len(x) == 1)
        a, b = int(t[i - 2]), int(t[i - 1])
        v = a + b if t[i] == '+' else a - b if t[i] == '-' else a * b if t[i] == '*' else int(a / b)
        t[i - 2:i + 1] = [str(v)]
    return int(t[0])`,
      pitfalls: ['"-3" is a number, not the minus operator.'] },
    { name: 'Stack of values', idea: 'Push numbers. An operator pops the top two values, applies itself with the lower value first, and pushes the result.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the stack holds the waiting values.',
      js: `function evalRPN(tokens) {
  const st = [];
  for (const t of tokens) {
    if (!['+', '-', '*', '/'].includes(t)) { st.push(Number(t)); continue; }
    const b = st.pop(), a = st.pop();
    st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : Math.trunc(a / b));
  }
  return st[0];
}`,
      py: `def evalRPN(tokens):
    st = []
    for t in tokens:
        if t not in ('+', '-', '*', '/'):
            st.append(int(t))
            continue
        b, a = st.pop(), st.pop()
        if t == '+':
            st.append(a + b)
        elif t == '-':
            st.append(a - b)
        elif t == '*':
            st.append(a * b)
        else:
            st.append(int(a / b))
    return st[0]`,
      pitfalls: ['Python’s // rounds down, so -7 // 2 is -4; division here rounds toward zero.', 'Popping in the wrong order flips subtraction and division.'] }
  ],
  'decode-string': [
    { name: 'Expand the innermost bracket', idea: 'Find a bracket with no bracket inside it, replace k[text] with text repeated k times, and repeat until none are left.',
      time: 'O(L · n)', space: 'O(L)', why: 'Each expansion rebuilds the string; L is the decoded length.',
      js: `function decodeString(s) {
  const inner = /(\\d+)\\[([a-z]*)\\]/;
  while (inner.test(s)) s = s.replace(inner, (_, k, t) => t.repeat(Number(k)));
  return s;
}`,
      py: `def decodeString(s):
    import re
    inner = re.compile(r'(\\d+)\\[([a-z]*)\\]')
    while inner.search(s):
        s = inner.sub(lambda m: m.group(2) * int(m.group(1)), s, count=1)
    return s`,
      pitfalls: ['Counts can have several digits, like 12[a].'] },
    { name: 'Stack of unfinished strings', idea: 'On [, push the text so far and the count, then start fresh. On ], pop them and append the inner text repeated count times.',
      time: 'O(n + L)', space: 'O(n + L)', why: 'Each character is read once and each output letter is written once.',
      js: `function decodeString(s) {
  const st = [];
  let cur = '', k = 0;
  for (const c of s) {
    if (c >= '0' && c <= '9') k = k * 10 + Number(c);
    else if (c === '[') { st.push([cur, k]); cur = ''; k = 0; }
    else if (c === ']') { const [prev, times] = st.pop(); cur = prev + cur.repeat(times); }
    else cur += c;
  }
  return cur;
}`,
      py: `def decodeString(s):
    st, cur, k = [], '', 0
    for c in s:
        if c.isdigit():
            k = k * 10 + int(c)
        elif c == '[':
            st.append((cur, k))
            cur, k = '', 0
        elif c == ']':
            prev, times = st.pop()
            cur = prev + cur * times
        else:
            cur += c
    return cur`,
      pitfalls: ['Resetting the count after pushing it, so the next number starts from 0.'] }
  ],
  'daily-temperatures': [
    { name: 'Look ahead from each day', idea: 'From each day, scan forward until a warmer day.',
      time: 'O(n²)', space: 'O(1)', why: 'A cold spell makes each day scan far.', slow: true,
      js: `function dailyTemperatures(temperatures) {
  return temperatures.map((t, i) => {
    for (let j = i + 1; j < temperatures.length; j++) if (temperatures[j] > t) return j - i;
    return 0;
  });
}`,
      py: `def dailyTemperatures(temperatures):
    out = []
    for i, t in enumerate(temperatures):
        out.append(next((j - i for j in range(i + 1, len(temperatures)) if temperatures[j] > t), 0))
    return out`,
      pitfalls: ['Equal is not warmer.'] },
    { name: 'Stack of waiting days', idea: 'Keep the days still waiting, coldest on top. A warmer day answers every colder day on top and pops it.',
      time: 'O(n)', space: 'O(n)', why: 'Each day is pushed and popped once.',
      js: `function dailyTemperatures(temperatures) {
  const out = new Array(temperatures.length).fill(0), st = [];
  temperatures.forEach((t, i) => {
    while (st.length && temperatures[st[st.length - 1]] < t) { const j = st.pop(); out[j] = i - j; }
    st.push(i);
  });
  return out;
}`,
      py: `def dailyTemperatures(temperatures):
    out, st = [0] * len(temperatures), []
    for i, t in enumerate(temperatures):
        while st and temperatures[st[-1]] < t:
            j = st.pop()
            out[j] = i - j
        st.append(i)
    return out`,
      pitfalls: ['Storing temperatures on the stack loses the day index you need for the wait.'] }
  ],
  'asteroid-collision': [
    { name: 'Collide neighbours until calm', idea: 'Find a right-mover followed by a left-mover, resolve that crash, and repeat until no such pair is left.',
      time: 'O(n²)', space: 'O(n)', why: 'Each crash rescans the list.', slow: true,
      js: `function asteroidCollision(asteroids) {
  const a = asteroids.slice();
  for (let i = 0; i < a.length - 1; ) {
    if (a[i] > 0 && a[i + 1] < 0) {
      const l = a[i], r = -a[i + 1];
      if (l === r) a.splice(i, 2); else if (l > r) a.splice(i + 1, 1); else a.splice(i, 1);
      i = Math.max(0, i - 1);
    } else i++;
  }
  return a;
}`,
      py: `def asteroidCollision(asteroids):
    a, i = list(asteroids), 0
    while i < len(a) - 1:
        if a[i] > 0 and a[i + 1] < 0:
            l, r = a[i], -a[i + 1]
            if l == r:
                del a[i:i + 2]
            elif l > r:
                del a[i + 1]
            else:
                del a[i]
            i = max(0, i - 1)
        else:
            i += 1
    return a`,
      pitfalls: ['A left-mover followed by a right-mover never meet.'] },
    { name: 'Stack of survivors', idea: 'Push asteroids as you go. A left-mover crashes into right-movers on top of the stack until it explodes, ties, or nothing is left to hit.',
      time: 'O(n)', space: 'O(n)', why: 'Each asteroid is pushed and popped at most once.',
      js: `function asteroidCollision(asteroids) {
  const st = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && st.length && st[st.length - 1] > 0) {
      const top = st[st.length - 1];
      if (top < -a) st.pop();
      else { if (top === -a) st.pop(); alive = false; }
    }
    if (alive) st.push(a);
  }
  return st;
}`,
      py: `def asteroidCollision(asteroids):
    st = []
    for a in asteroids:
        alive = True
        while alive and a < 0 and st and st[-1] > 0:
            if st[-1] < -a:
                st.pop()
            else:
                if st[-1] == -a:
                    st.pop()
                alive = False
        if alive:
            st.append(a)
    return st`,
      pitfalls: ['Equal sizes destroy both, so pop and do not push.'] }
  ],
  'car-fleet': [
    { name: 'Simulate catching up', idea: 'Sort cars from nearest the target. Work out each car’s arrival time; a car behind that would arrive sooner joins the fleet ahead, which keeps its time. Compare each car with every fleet ahead.',
      time: 'O(n²)', space: 'O(n)', why: 'Each car may be compared with every fleet ahead.',
      js: `function carFleet(target, position, speed) {
  const cars = position.map((p, i) => [p, (target - p) / speed[i]]).sort((a, b) => b[0] - a[0]);
  const fleets = [];
  for (const [, t] of cars) if (!fleets.some((f) => t <= f)) fleets.push(t);
  return fleets.length;
}`,
      py: `def carFleet(target, position, speed):
    cars = sorted(zip(position, speed), reverse=True)
    fleets = []
    for p, s in cars:
        t = (target - p) / s
        if not any(t <= f for f in fleets):
            fleets.append(t)
    return len(fleets)`,
      pitfalls: ['Arriving at exactly the same time counts as joining.'] },
    { name: 'Arrival times from the front', idea: 'Sort by position, nearest the target first. Walk back: a car that would arrive later than the slowest fleet ahead starts a new fleet.',
      time: 'O(n log n)', space: 'O(n)', why: 'The sort sets the time; one pass after it.',
      js: `function carFleet(target, position, speed) {
  const cars = position.map((p, i) => [p, (target - p) / speed[i]]).sort((a, b) => b[0] - a[0]);
  let fleets = 0, slowest = 0;
  for (const [, t] of cars) if (t > slowest) { fleets++; slowest = t; }
  return fleets;
}`,
      py: `def carFleet(target, position, speed):
    fleets, slowest = 0, 0
    for p, s in sorted(zip(position, speed), reverse=True):
        t = (target - p) / s
        if t > slowest:
            fleets += 1
            slowest = t
    return fleets`,
      pitfalls: ['Sorting from the back car forward lets a car "join" a fleet it never meets.'] }
  ],
  'largest-rectangle-in-histogram': [
    { name: 'Every pair of bars', idea: 'For each start bar, extend right while tracking the lowest bar so far; the area is that height times the width.',
      time: 'O(n²)', space: 'O(1)', why: 'Each start extends to the end.', slow: true,
      js: `function largestRectangleArea(heights) {
  let best = 0;
  for (let i = 0; i < heights.length; i++) {
    let low = Infinity;
    for (let j = i; j < heights.length; j++) { low = Math.min(low, heights[j]); best = Math.max(best, low * (j - i + 1)); }
  }
  return best;
}`,
      py: `def largestRectangleArea(heights):
    best = 0
    for i in range(len(heights)):
        low = float('inf')
        for j in range(i, len(heights)):
            low = min(low, heights[j])
            best = max(best, low * (j - i + 1))
    return best`,
      pitfalls: ['The rectangle’s height is the lowest bar it covers.'] },
    { name: 'Stack of rising bars', idea: 'Keep bar indexes with rising heights. A lower bar pops taller ones; each popped bar’s rectangle reaches from the bar below it on the stack to the current bar.',
      time: 'O(n)', space: 'O(n)', why: 'Each bar is pushed and popped once.',
      js: `function largestRectangleArea(heights) {
  const st = [];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (st.length && heights[st[st.length - 1]] >= h) {
      const top = heights[st.pop()];
      const left = st.length ? st[st.length - 1] + 1 : 0;
      best = Math.max(best, top * (i - left));
    }
    st.push(i);
  }
  return best;
}`,
      py: `def largestRectangleArea(heights):
    st, best = [], 0
    for i in range(len(heights) + 1):
        h = heights[i] if i < len(heights) else 0
        while st and heights[st[-1]] >= h:
            top = heights[st.pop()]
            left = st[-1] + 1 if st else 0
            best = max(best, top * (i - left))
        st.append(i)
    return best`,
      pitfalls: ['Without the extra 0 at the end, bars still on the stack are never measured.'] }
  ],
  'last-stone-weight': [
    { name: 'Sort every turn', idea: 'Each turn, sort the stones, smash the two heaviest, and put back the difference.',
      time: 'O(n² log n)', space: 'O(n)', why: 'Up to n turns, each with a sort.', slow: true,
      js: `function lastStoneWeight(stones) {
  const s = stones.slice();
  while (s.length > 1) {
    s.sort((a, b) => a - b);
    const y = s.pop(), x = s.pop();
    if (y !== x) s.push(y - x);
  }
  return s.length ? s[0] : 0;
}`,
      py: `def lastStoneWeight(stones):
    s = list(stones)
    while len(s) > 1:
        s.sort()
        y, x = s.pop(), s.pop()
        if y != x:
            s.append(y - x)
    return s[0] if s else 0`,
      pitfalls: ['When the last two are equal nothing is left: return 0.'] },
    { name: 'Max-heap', idea: 'Keep the stones in a max-heap so the two heaviest come out in O(log n).',
      time: 'O(n log n)', space: 'O(n)', why: 'n turns, each a few heap steps.',
      js: `function lastStoneWeight(stones) {
  const h = [];
  const up = (i) => { while (i && h[(i - 1) >> 1] < h[i]) { [h[i], h[(i - 1) >> 1]] = [h[(i - 1) >> 1], h[i]]; i = (i - 1) >> 1; } };
  const down = (i) => { for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < h.length && h[l] > h[m]) m = l; if (r < h.length && h[r] > h[m]) m = r; if (m === i) return; [h[i], h[m]] = [h[m], h[i]]; i = m; } };
  const push = (x) => { h.push(x); up(h.length - 1); };
  const pop = () => { const top = h[0], last = h.pop(); if (h.length) { h[0] = last; down(0); } return top; };
  stones.forEach(push);
  while (h.length > 1) { const y = pop(), x = pop(); if (y !== x) push(y - x); }
  return h.length ? h[0] : 0;
}`,
      py: `def lastStoneWeight(stones):
    import heapq
    h = [-x for x in stones]
    heapq.heapify(h)
    while len(h) > 1:
        y, x = -heapq.heappop(h), -heapq.heappop(h)
        if y != x:
            heapq.heappush(h, -(y - x))
    return -h[0] if h else 0`,
      pitfalls: ['Python’s heapq is a min-heap; store negative weights to get the heaviest first.'] }
  ],
  'kth-largest': [
    { name: 'Sort', idea: 'Sort from largest to smallest and take position k - 1.',
      time: 'O(n log n)', space: 'O(1)', why: 'The sort sets the time.',
      js: `function findKthLargest(nums, k) {
  return nums.slice().sort((a, b) => b - a)[k - 1];
}`,
      py: `def findKthLargest(nums, k):
    return sorted(nums, reverse=True)[k - 1]`,
      pitfalls: ['Removing duplicates first is wrong: repeats count.'] },
    { name: 'Room for the k best', idea: 'Keep a min-heap of the k largest values seen. A new value gets in only if it beats the smallest, which then leaves. The smallest left is the answer.',
      time: 'O(n log k)', space: 'O(k)', why: 'Each value costs one heap step on a heap of size k.',
      js: `function findKthLargest(nums, k) {
  const h = [];
  const up = (i) => { while (i && h[(i - 1) >> 1] > h[i]) { [h[i], h[(i - 1) >> 1]] = [h[(i - 1) >> 1], h[i]]; i = (i - 1) >> 1; } };
  const down = (i) => { for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < h.length && h[l] < h[m]) m = l; if (r < h.length && h[r] < h[m]) m = r; if (m === i) return; [h[i], h[m]] = [h[m], h[i]]; i = m; } };
  for (const x of nums) {
    if (h.length < k) { h.push(x); up(h.length - 1); }
    else if (x > h[0]) { h[0] = x; down(0); }
  }
  return h[0];
}`,
      py: `def findKthLargest(nums, k):
    import heapq
    h = []
    for x in nums:
        if len(h) < k:
            heapq.heappush(h, x)
        elif x > h[0]:
            heapq.heapreplace(h, x)
    return h[0]`,
      pitfalls: ['A max-heap of everything works but needs O(n) memory.', 'Quickselect is O(n) on average, but its worst case is O(n²).'] }
  ],
  'top-k-frequent': [
    { name: 'Count, then sort by count', idea: 'Count each value, sort the values by count, and take the first k.',
      time: 'O(n log n)', space: 'O(n)', why: 'Sorting up to n different values.',
      js: `function topKFrequent(nums, k) {
  const c = new Map();
  for (const x of nums) c.set(x, (c.get(x) || 0) + 1);
  return [...c.keys()].sort((a, b) => c.get(b) - c.get(a)).slice(0, k);
}`,
      py: `def topKFrequent(nums, k):
    c = {}
    for x in nums:
        c[x] = c.get(x, 0) + 1
    return sorted(c, key=lambda x: -c[x])[:k]`,
      pitfalls: ['Sorting nums itself instead of the different values.'] },
    { name: 'Buckets by count', idea: 'A count is at most n, so put each value in bucket[count] and read the buckets from the top until you have k values.',
      time: 'O(n)', space: 'O(n)', why: 'Counting and the buckets are both linear.',
      js: `function topKFrequent(nums, k) {
  const c = new Map();
  for (const x of nums) c.set(x, (c.get(x) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [x, n] of c) buckets[n].push(x);
  const out = [];
  for (let n = nums.length; n > 0 && out.length < k; n--) out.push(...buckets[n]);
  return out.slice(0, k);
}`,
      py: `def topKFrequent(nums, k):
    c = {}
    for x in nums:
        c[x] = c.get(x, 0) + 1
    buckets = [[] for _ in range(len(nums) + 1)]
    for x, n in c.items():
        buckets[n].append(x)
    out = []
    for n in range(len(nums), 0, -1):
        out += buckets[n]
        if len(out) >= k:
            break
    return out[:k]`,
      pitfalls: ['A bucket can hold several values; stop at exactly k.'] }
  ],
  'k-closest-points-to-origin': [
    { name: 'Sort by distance', idea: 'Sort the points by x² + y² and take the first k.',
      time: 'O(n log n)', space: 'O(n)', why: 'The sort sets the time.',
      js: `function kClosest(points, k) {
  return points.slice().sort((a, b) => a[0] * a[0] + a[1] * a[1] - b[0] * b[0] - b[1] * b[1]).slice(0, k);
}`,
      py: `def kClosest(points, k):
    return sorted(points, key=lambda p: p[0] * p[0] + p[1] * p[1])[:k]`,
      pitfalls: ['There is no need for the square root: comparing squared distances gives the same order.'] },
    { name: 'Max-heap of the k closest', idea: 'Keep the k closest points so far in a max-heap by distance. A closer point replaces the farthest one.',
      time: 'O(n log k)', space: 'O(k)', why: 'One heap step per point on a heap of size k.',
      js: `function kClosest(points, k) {
  const d = (p) => p[0] * p[0] + p[1] * p[1], h = [];
  const up = (i) => { while (i && d(h[(i - 1) >> 1]) < d(h[i])) { [h[i], h[(i - 1) >> 1]] = [h[(i - 1) >> 1], h[i]]; i = (i - 1) >> 1; } };
  const down = (i) => { for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < h.length && d(h[l]) > d(h[m])) m = l; if (r < h.length && d(h[r]) > d(h[m])) m = r; if (m === i) return; [h[i], h[m]] = [h[m], h[i]]; i = m; } };
  for (const p of points) {
    if (h.length < k) { h.push(p); up(h.length - 1); }
    else if (d(p) < d(h[0])) { h[0] = p; down(0); }
  }
  return h;
}`,
      py: `def kClosest(points, k):
    import heapq
    h = []
    for x, y in points:
        item = (-(x * x + y * y), x, y)
        if len(h) < k:
            heapq.heappush(h, item)
        elif item > h[0]:
            heapq.heapreplace(h, item)
    return [[x, y] for _, x, y in h]`,
      pitfalls: ['Using a min-heap of all points keeps n points instead of k.'] }
  ],
  'merge-k-lists': [
    { name: 'Collect and sort', idea: 'Read every value from every list, sort them, and build one list.',
      time: 'O(N log N)', space: 'O(N)', why: 'Sorting all N values.',
      js: `function mergeKLists(lists) {
  const vals = [];
  for (let n of lists) for (; n; n = n.next) vals.push(n.val);
  vals.sort((a, b) => a - b);
  let head = null;
  for (let i = vals.length - 1; i >= 0; i--) head = new ListNode(vals[i], head);
  return head;
}`,
      py: `def mergeKLists(lists):
    vals = []
    for n in lists:
        while n:
            vals.append(n.val)
            n = n.next
    head = None
    for v in sorted(vals, reverse=True):
        head = ListNode(v, head)
    return head`,
      pitfalls: ['It ignores that each list is already sorted.'] },
    { name: 'Merge in pairs', idea: 'Merge list 1 with list 2, list 3 with list 4, and so on, then merge the results, halving the number of lists each round.',
      time: 'O(N log k)', space: 'O(1)', why: 'log k rounds, each touching all N nodes once.',
      js: `function mergeKLists(lists) {
  const two = (a, b) => {
    const dummy = new ListNode(0);
    let t = dummy;
    while (a && b) { if (a.val <= b.val) { t.next = a; a = a.next; } else { t.next = b; b = b.next; } t = t.next; }
    t.next = a || b;
    return dummy.next;
  };
  if (!lists.length) return null;
  while (lists.length > 1) {
    const next = [];
    for (let i = 0; i < lists.length; i += 2) next.push(i + 1 < lists.length ? two(lists[i], lists[i + 1]) : lists[i]);
    lists = next;
  }
  return lists[0];
}`,
      py: `def mergeKLists(lists):
    def two(a, b):
        dummy = t = ListNode(0)
        while a and b:
            if a.val <= b.val:
                t.next, a = a, a.next
            else:
                t.next, b = b, b.next
            t = t.next
        t.next = a or b
        return dummy.next
    if not lists:
        return None
    while len(lists) > 1:
        lists = [two(lists[i], lists[i + 1]) if i + 1 < len(lists) else lists[i] for i in range(0, len(lists), 2)]
    return lists[0]`,
      pitfalls: ['Merging one by one into a growing list costs O(N · k).'] },
    { name: 'Heap of front nodes', idea: 'Keep the front node of every list in a min-heap. Take the smallest, link it, and push its next node.',
      time: 'O(N log k)', space: 'O(k)', why: 'Each node is pushed and popped once on a heap of at most k nodes.',
      js: `function mergeKLists(lists) {
  const h = [];
  const up = (i) => { while (i && h[(i - 1) >> 1].val > h[i].val) { [h[i], h[(i - 1) >> 1]] = [h[(i - 1) >> 1], h[i]]; i = (i - 1) >> 1; } };
  const down = (i) => { for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < h.length && h[l].val < h[m].val) m = l; if (r < h.length && h[r].val < h[m].val) m = r; if (m === i) return; [h[i], h[m]] = [h[m], h[i]]; i = m; } };
  for (const n of lists) if (n) { h.push(n); up(h.length - 1); }
  const dummy = new ListNode(0);
  let t = dummy;
  while (h.length) {
    const n = h[0];
    t = t.next = n;
    if (n.next) { h[0] = n.next; down(0); }
    else { const last = h.pop(); if (h.length) { h[0] = last; down(0); } }
  }
  return dummy.next;
}`,
      py: `def mergeKLists(lists):
    import heapq
    h = [(n.val, i, n) for i, n in enumerate(lists) if n]
    heapq.heapify(h)
    dummy = t = ListNode(0)
    while h:
        _, i, n = heapq.heappop(h)
        t.next = t = n
        if n.next:
            heapq.heappush(h, (n.next.val, i, n.next))
    return dummy.next`,
      pitfalls: ['In Python, two nodes with the same value cannot be compared; the list index breaks the tie.'] }
  ],
  'find-median-from-data-stream': [
    { name: 'Sorted list', idea: 'Insert each number into its place in a sorted list; the median is in the middle.',
      time: 'O(n) per call', space: 'O(n)', why: 'Inserting shifts up to n numbers.',
      js: `class MedianFinder {
  constructor() { this.a = []; }
  addNum(num) {
    let lo = 0, hi = this.a.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (this.a[mid] < num) lo = mid + 1; else hi = mid; }
    this.a.splice(lo, 0, num);
  }
  findMedian() {
    const a = this.a, n = a.length;
    return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2;
  }
}`,
      py: `class MedianFinder:
    def __init__(self):
        self.a = []

    def addNum(self, num):
        import bisect
        bisect.insort(self.a, num)

    def findMedian(self):
        a, n = self.a, len(self.a)
        return a[n // 2] if n % 2 else (a[n // 2 - 1] + a[n // 2]) / 2`,
      pitfalls: ['With an even count, the median is the mean of the two middle numbers.'] },
    { name: 'Two heaps', idea: 'Keep the smaller half in a max-heap and the larger half in a min-heap, with sizes equal or the lower one bigger by one. The median is on their tops.',
      time: 'O(log n) per call', space: 'O(n)', why: 'Each add is a few heap steps; the median is read from the tops.',
      js: `class MedianFinder {
  constructor() { this.lo = []; this.hi = []; }
  static push(h, x, less) {
    h.push(x);
    let i = h.length - 1;
    while (i && less(h[i], h[(i - 1) >> 1])) { [h[i], h[(i - 1) >> 1]] = [h[(i - 1) >> 1], h[i]]; i = (i - 1) >> 1; }
  }
  static pop(h, less) {
    const top = h[0], last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < h.length && less(h[l], h[m])) m = l; if (r < h.length && less(h[r], h[m])) m = r; if (m === i) break; [h[i], h[m]] = [h[m], h[i]]; i = m; }
    }
    return top;
  }
  addNum(num) {
    const big = (a, b) => a > b, small = (a, b) => a < b;
    MedianFinder.push(this.lo, num, big);
    MedianFinder.push(this.hi, MedianFinder.pop(this.lo, big), small);
    if (this.hi.length > this.lo.length) MedianFinder.push(this.lo, MedianFinder.pop(this.hi, small), big);
  }
  findMedian() {
    return this.lo.length > this.hi.length ? this.lo[0] : (this.lo[0] + this.hi[0]) / 2;
  }
}`,
      py: `class MedianFinder:
    def __init__(self):
        self.lo, self.hi = [], []

    def addNum(self, num):
        import heapq
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`,
      pitfalls: ['Pushing straight into one heap without passing through the other can leave a big number in the lower half.'] }
  ],
  'reverse-linked-list': [
    { name: 'Copy the values backwards', idea: 'Read the values into an array, then build a new list from the back.',
      time: 'O(n)', space: 'O(n)', why: 'One pass to read, one to build, and a full copy.',
      js: `function reverseList(head) {
  let out = null;
  for (let n = head; n; n = n.next) out = new ListNode(n.val, out);
  return out;
}`,
      py: `def reverseList(head):
    out = None
    while head:
        out = ListNode(head.val, out)
        head = head.next
    return out`,
      pitfalls: ['It makes new nodes; asked to reverse in place, it is not the answer.'] },
    { name: 'Three hands', idea: 'Walk the list holding the node behind, the current node and the one ahead. Point each node back at the one behind it.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, three pointers.',
      js: `function reverseList(head) {
  let prev = null, cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}`,
      py: `def reverseList(head):
    prev, cur = None, head
    while cur:
        cur.next, prev, cur = prev, cur, cur.next
    return prev`,
      pitfalls: ['Changing cur.next before saving it loses the rest of the list.', 'Returning head, which is now the last node.'] }
  ],
  'palindrome-linked-list': [
    { name: 'Copy into an array', idea: 'Read the values into an array and compare it with its reverse.',
      time: 'O(n)', space: 'O(n)', why: 'One pass, plus a copy of every value.',
      js: `function isPalindrome(head) {
  const v = [];
  for (let n = head; n; n = n.next) v.push(n.val);
  for (let i = 0, j = v.length - 1; i < j; i++, j--) if (v[i] !== v[j]) return false;
  return true;
}`,
      py: `def isPalindrome(head):
    v = []
    while head:
        v.append(head.val)
        head = head.next
    return v == v[::-1]`,
      pitfalls: ['An empty list reads the same both ways.'] },
    { name: 'Reverse the back half', idea: 'Find the middle with a slow and a fast pointer, reverse the second half, and walk both halves together comparing values.',
      time: 'O(n)', space: 'O(1)', why: 'A few passes; only pointers are kept.',
      js: `function isPalindrome(head) {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null;
  while (slow) { const next = slow.next; slow.next = prev; prev = slow; slow = next; }
  for (let a = head, b = prev; b; a = a.next, b = b.next) if (a.val !== b.val) return false;
  return true;
}`,
      py: `def isPalindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    prev = None
    while slow:
        slow.next, prev, slow = prev, slow, slow.next
    a, b = head, prev
    while b:
        if a.val != b.val:
            return False
        a, b = a.next, b.next
    return True`,
      pitfalls: ['Compare until the reversed half runs out, not the front half, which still links into the middle.'] }
  ],
  'reverse-linked-list-ii': [
    { name: 'Reverse the values', idea: 'Copy the values into an array, reverse the slice from left to right, and write them back.',
      time: 'O(n)', space: 'O(n)', why: 'Two passes and a copy.',
      js: `function reverseBetween(head, left, right) {
  const nodes = [];
  for (let n = head; n; n = n.next) nodes.push(n);
  for (let i = left - 1, j = right - 1; i < j; i++, j--) [nodes[i].val, nodes[j].val] = [nodes[j].val, nodes[i].val];
  return head;
}`,
      py: `def reverseBetween(head, left, right):
    nodes = []
    n = head
    while n:
        nodes.append(n)
        n = n.next
    i, j = left - 1, right - 1
    while i < j:
        nodes[i].val, nodes[j].val = nodes[j].val, nodes[i].val
        i += 1
        j -= 1
    return head`,
      pitfalls: ['Positions count from 1.'] },
    { name: 'Move nodes to the front of the stretch', idea: 'Walk to the node before the stretch. Then, right - left times, take the node after the stretch’s first node and move it to the front.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, a few pointer changes per node.',
      js: `function reverseBetween(head, left, right) {
  const dummy = new ListNode(0, head);
  let before = dummy;
  for (let i = 1; i < left; i++) before = before.next;
  const first = before.next;
  for (let i = 0; i < right - left; i++) {
    const move = first.next;
    first.next = move.next;
    move.next = before.next;
    before.next = move;
  }
  return dummy.next;
}`,
      py: `def reverseBetween(head, left, right):
    dummy = before = ListNode(0, head)
    for _ in range(left - 1):
        before = before.next
    first = before.next
    for _ in range(right - left):
        move = first.next
        first.next = move.next
        move.next = before.next
        before.next = move
    return dummy.next`,
      pitfalls: ['When left is 1 the head changes, so return dummy.next.'] }
  ],
  'reorder-list': [
    { name: 'Array of nodes', idea: 'Put the nodes in an array and relink them by taking from the front and the back in turn.',
      time: 'O(n)', space: 'O(n)', why: 'One pass to collect, one to relink.',
      js: `function reorderList(head) {
  const a = [];
  for (let n = head; n; n = n.next) a.push(n);
  let i = 0, j = a.length - 1;
  while (i < j) {
    a[i].next = a[j];
    i++;
    if (i === j) break;
    a[j].next = a[i];
    j--;
  }
  if (a.length) a[i].next = null;
}`,
      py: `def reorderList(head):
    a = []
    while head:
        a.append(head)
        head = head.next
    i, j = 0, len(a) - 1
    while i < j:
        a[i].next = a[j]
        i += 1
        if i == j:
            break
        a[j].next = a[i]
        j -= 1
    if a:
        a[i].next = None`,
      pitfalls: ['Forgetting to end the list with null leaves a loop.'] },
    { name: 'Split, reverse, weave', idea: 'Find the middle, reverse the second half, then weave the two halves together node by node.',
      time: 'O(n)', space: 'O(1)', why: 'Three passes; only pointers.',
      js: `function reorderList(head) {
  if (!head) return;
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null, cur = slow.next;
  slow.next = null;
  while (cur) { const next = cur.next; cur.next = prev; prev = cur; cur = next; }
  for (let a = head, b = prev; b; ) {
    const an = a.next, bn = b.next;
    a.next = b;
    b.next = an;
    a = an;
    b = bn;
  }
}`,
      py: `def reorderList(head):
    if not head:
        return
    slow = fast = head
    while fast.next and fast.next.next:
        slow, fast = slow.next, fast.next.next
    prev, cur = None, slow.next
    slow.next = None
    while cur:
        cur.next, prev, cur = prev, cur, cur.next
    a, b = head, prev
    while b:
        an, bn = a.next, b.next
        a.next, b.next = b, an
        a, b = an, bn`,
      pitfalls: ['Not cutting the first half at the middle leaves a cycle.'] }
  ],
  'middle-of-list': [
    { name: 'Count, then walk half', idea: 'Count the nodes, then walk n / 2 steps.',
      time: 'O(n)', space: 'O(1)', why: 'Two passes.',
      js: `function middleNode(head) {
  let n = 0;
  for (let x = head; x; x = x.next) n++;
  let mid = head;
  for (let i = 0; i < Math.floor(n / 2); i++) mid = mid.next;
  return mid;
}`,
      py: `def middleNode(head):
    n, x = 0, head
    while x:
        n += 1
        x = x.next
    for _ in range(n // 2):
        head = head.next
    return head`,
      pitfalls: ['With an even count the second middle is asked for: n / 2 steps rounded down.'] },
    { name: 'Hare and tortoise', idea: 'Move one pointer two steps and another one step. When the fast one reaches the end, the slow one is in the middle.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two pointers.',
      js: `function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  return slow;
}`,
      py: `def middleNode(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow`,
      pitfalls: ['Testing fast.next.next in the loop gives the first middle, not the second.'] }
  ],
  'linked-list-cycle': [
    { name: 'Remember visited nodes', idea: 'Walk the list, keeping a set of nodes seen. Seeing one twice means a loop.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the set may hold every node.',
      js: `function hasCycle(head) {
  const seen = new Set();
  for (let n = head; n; n = n.next) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
      py: `def hasCycle(head):
    seen = set()
    while head:
        if head in seen:
            return True
        seen.add(head)
        head = head.next
    return False`,
      pitfalls: ['Storing values instead of nodes: two different nodes may hold the same value.'] },
    { name: 'Tortoise and hare', idea: 'Move one pointer one step and another two. On a loop the fast one laps the slow one and they meet; otherwise the fast one reaches the end.',
      time: 'O(n)', space: 'O(1)', why: 'The gap shrinks by one each step once both are in the loop.',
      js: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      py: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            return True
    return False`,
      pitfalls: ['Checking slow === fast before moving: they start equal.'] }
  ],
  'happy-number': [
    { name: 'Remember every number', idea: 'Keep replacing n by its digit-square sum, remembering every number seen. Reaching 1 is happy; seeing a number again is a loop.',
      time: 'O(log n)', space: 'O(log n)', why: 'The numbers shrink fast to under 243, and the set holds the few seen.',
      js: `function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = String(n).split('').reduce((s, d) => s + d * d, 0);
  }
  return n === 1;
}`,
      py: `def isHappy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1`,
      pitfalls: ['Without remembering, an unhappy number loops forever.'] },
    { name: 'Tortoise and hare on numbers', idea: 'Treat each number as a node pointing to its digit-square sum. Move one pointer one step and another two; they meet at 1 or inside a loop.',
      time: 'O(log n)', space: 'O(1)', why: 'Same walk as before, but only two numbers are kept.',
      js: `function isHappy(n) {
  const next = (x) => { let s = 0; while (x) { const d = x % 10; s += d * d; x = Math.floor(x / 10); } return s; };
  let slow = n, fast = next(n);
  while (fast !== 1 && slow !== fast) { slow = next(slow); fast = next(next(fast)); }
  return fast === 1;
}`,
      py: `def isHappy(n):
    def nxt(x):
        s = 0
        while x:
            x, d = divmod(x, 10)
            s += d * d
        return s
    slow, fast = n, nxt(n)
    while fast != 1 and slow != fast:
        slow, fast = nxt(slow), nxt(nxt(fast))
    return fast == 1`,
      pitfalls: ['Starting both pointers on n makes them equal before the first step.'] }
  ],
  'linked-list-cycle-ii': [
    { name: 'First node seen twice', idea: 'Walk the list with a set of visited nodes. The first node met again is where the loop starts.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the set may hold every node.',
      js: `function detectCycle(head) {
  const seen = new Set();
  for (let n = head; n; n = n.next) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return null;
}`,
      py: `def detectCycle(head):
    seen = set()
    while head:
        if head in seen:
            return head
        seen.add(head)
        head = head.next
    return None`,
      pitfalls: ['Return the node itself, not its value.'] },
    { name: 'Meet, then walk from the head', idea: 'Let a slow and a fast pointer meet inside the loop. A pointer from the head and one from the meeting point, both moving one step, meet at the loop’s start.',
      time: 'O(n)', space: 'O(1)', why: 'The distance from head to the start equals the distance from the meeting point to the start, around the loop.',
      js: `function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let a = head;
      while (a !== slow) { a = a.next; slow = slow.next; }
      return a;
    }
  }
  return null;
}`,
      py: `def detectCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            a = head
            while a is not slow:
                a, slow = a.next, slow.next
            return a
    return None`,
      pitfalls: ['Moving the second walk two steps at a time; both move one step.'] }
  ],
  'find-the-duplicate-number': [
    { name: 'Remember seen values', idea: 'Walk the list with a set; the first value seen twice is the answer.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the set may hold n values.',
      js: `function findDuplicate(nums) {
  const seen = new Set();
  for (const x of nums) { if (seen.has(x)) return x; seen.add(x); }
}`,
      py: `def findDuplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return x
        seen.add(x)`,
      pitfalls: ['The task asks for O(1) extra space, which a set does not meet.'] },
    { name: 'Count values at most mid', idea: 'Binary search on the value: if more than mid numbers are at most mid, the repeat is at most mid.',
      time: 'O(n log n)', space: 'O(1)', why: 'log n rounds, each counting over the list.',
      js: `function findDuplicate(nums) {
  let lo = 1, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const count = nums.filter((x) => x <= mid).length;
    if (count > mid) hi = mid; else lo = mid + 1;
  }
  return lo;
}`,
      py: `def findDuplicate(nums):
    lo, hi = 1, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if sum(1 for x in nums if x <= mid) > mid:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
      pitfalls: ['The search runs over values 1 to n, not over indexes.'] },
    { name: 'Loop in the index chain', idea: 'Treat i -> nums[i] as next pointers. The repeated value is where two arrows meet, which is the start of a loop. Find it with a slow and a fast pointer.',
      time: 'O(n)', space: 'O(1)', why: 'Two linear walks with two pointers; nums is not changed.',
      js: `function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
  let a = nums[0];
  while (a !== slow) { a = nums[a]; slow = nums[slow]; }
  return a;
}`,
      py: `def findDuplicate(nums):
    slow = fast = nums[0]
    while True:
        slow, fast = nums[slow], nums[nums[fast]]
        if slow == fast:
            break
    a = nums[0]
    while a != slow:
        a, slow = nums[a], nums[slow]
    return a`,
      pitfalls: ['Sorting or marking values by flipping signs changes nums, which is not allowed.'] }
  ],
  'invert-tree': [
    { name: 'Level by level with a queue', idea: 'Visit nodes level by level and swap each node’s two children.',
      time: 'O(n)', space: 'O(n)', why: 'Each node once; the queue can hold a whole level.',
      js: `function invertTree(root) {
  const q = root ? [root] : [];
  for (let i = 0; i < q.length; i++) {
    const n = q[i];
    [n.left, n.right] = [n.right, n.left];
    if (n.left) q.push(n.left);
    if (n.right) q.push(n.right);
  }
  return root;
}`,
      py: `def invertTree(root):
    q = [root] if root else []
    for n in q:
        n.left, n.right = n.right, n.left
        if n.left:
            q.append(n.left)
        if n.right:
            q.append(n.right)
    return root`,
      pitfalls: ['Swapping the values instead of the subtrees.'] },
    { name: 'Swap, then recurse', idea: 'Swap the left and right child of a node, then mirror each child the same way.',
      time: 'O(n)', space: 'O(h)', why: 'Each node once; the call stack is as deep as the tree.',
      js: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
      py: `def invertTree(root):
    if root:
        root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
      pitfalls: ['Assigning root.left first and then using it to fill root.right mirrors the same side twice.'] }
  ],
  'max-depth': [
    { name: 'Count levels with a queue', idea: 'Walk the tree level by level and count the levels.',
      time: 'O(n)', space: 'O(n)', why: 'Each node once; the queue holds a level.',
      js: `function maxDepth(root) {
  let level = root ? [root] : [], depth = 0;
  while (level.length) {
    depth++;
    level = level.flatMap((n) => [n.left, n.right].filter(Boolean));
  }
  return depth;
}`,
      py: `def maxDepth(root):
    level, depth = ([root] if root else []), 0
    while level:
        depth += 1
        level = [c for n in level for c in (n.left, n.right) if c]
    return depth`,
      pitfalls: ['An empty tree has depth 0.'] },
    { name: 'Ask both children', idea: 'A tree’s depth is one more than the deeper of its two subtrees.',
      time: 'O(n)', space: 'O(h)', why: 'Each node once; the call stack is as deep as the tree.',
      js: `function maxDepth(root) {
  return root ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0;
}`,
      py: `def maxDepth(root):
    return 1 + max(maxDepth(root.left), maxDepth(root.right)) if root else 0`,
      pitfalls: ['Counting edges instead of nodes gives one less.'] }
  ],
  'same-tree': [
    { name: 'Compare the walks', idea: 'Write both trees out in preorder with a mark for every missing child, and compare the two lists.',
      time: 'O(n)', space: 'O(n)', why: 'Each node is written once; the lists hold every node.',
      js: `function isSameTree(p, q) {
  const walk = (n, out) => { if (!n) { out.push('#'); return out; } out.push(n.val); walk(n.left, out); walk(n.right, out); return out; };
  return walk(p, []).join(',') === walk(q, []).join(',');
}`,
      py: `def isSameTree(p, q):
    def walk(n, out):
        if not n:
            out.append(None)
        else:
            out.append(n.val)
            walk(n.left, out)
            walk(n.right, out)
        return out
    return walk(p, []) == walk(q, [])`,
      pitfalls: ['Leaving out the missing-child marks makes different shapes look the same.'] },
    { name: 'Compare node by node', idea: 'Two trees match when both are empty, or both roots hold the same value and both pairs of children match.',
      time: 'O(n)', space: 'O(h)', why: 'Each pair of nodes once; the stack is as deep as the tree.',
      js: `function isSameTree(p, q) {
  if (!p || !q) return p === q;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      py: `def isSameTree(p, q):
    if not p or not q:
        return p is q
    return p.val == q.val and isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
      pitfalls: ['Checking only values and not that both children exist.'] }
  ],
  'validate-bst': [
    { name: 'Inorder must rise', idea: 'An inorder walk of a search tree visits values in rising order. Collect them and check.',
      time: 'O(n)', space: 'O(n)', why: 'Each node once; the list holds every value.',
      js: `function isValidBST(root) {
  const v = [];
  const walk = (n) => { if (!n) return; walk(n.left); v.push(n.val); walk(n.right); };
  walk(root);
  for (let i = 1; i < v.length; i++) if (v[i] <= v[i - 1]) return false;
  return true;
}`,
      py: `def isValidBST(root):
    v = []
    def walk(n):
        if n:
            walk(n.left)
            v.append(n.val)
            walk(n.right)
    walk(root)
    return all(v[i] > v[i - 1] for i in range(1, len(v)))`,
      pitfalls: ['Equal values break the rule: it must be strictly rising.'] },
    { name: 'Carry the allowed range', idea: 'Pass each node the range its value must sit in. Going left lowers the top of the range; going right raises the bottom.',
      time: 'O(n)', space: 'O(h)', why: 'Each node once; the call stack is as deep as the tree.',
      js: `function isValidBST(root) {
  const ok = (n, lo, hi) => !n || (n.val > lo && n.val < hi && ok(n.left, lo, n.val) && ok(n.right, n.val, hi));
  return ok(root, -Infinity, Infinity);
}`,
      py: `def isValidBST(root):
    def ok(n, lo, hi):
        return not n or (lo < n.val < hi and ok(n.left, lo, n.val) and ok(n.right, n.val, hi))
    return ok(root, float('-inf'), float('inf'))`,
      pitfalls: ['Checking only parent and child misses a grandchild that breaks an older ancestor’s rule.', 'Using the 32-bit limits as starting bounds fails when a node holds exactly that value.'] }
  ],
  'number-of-islands': [
    { name: 'Union-find on land', idea: 'Join every land cell with its land neighbours below and to the right. The number of separate groups is the number of islands.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Each cell is joined a few times; path compression keeps finds close to O(1).',
      js: `function numIslands(grid) {
  const m = grid.length, n = grid[0].length, parent = new Array(m * n).fill(-1);
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  let count = 0;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (grid[r][c] === '1') { parent[r * n + c] = r * n + c; count++; }
  const join = (a, b) => { const x = find(a), y = find(b); if (x !== y) { parent[x] = y; count--; } };
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== '1') continue;
      if (r + 1 < m && grid[r + 1][c] === '1') join(r * n + c, (r + 1) * n + c);
      if (c + 1 < n && grid[r][c + 1] === '1') join(r * n + c, r * n + c + 1);
    }
  return count;
}`,
      py: `def numIslands(grid):
    m, n = len(grid), len(grid[0])
    parent = {}
    for r in range(m):
        for c in range(n):
            if grid[r][c] == '1':
                parent[(r, c)] = (r, c)
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    count = len(parent)
    for r, c in list(parent):
        for nb in ((r + 1, c), (r, c + 1)):
            if nb in parent:
                a, b = find((r, c)), find(nb)
                if a != b:
                    parent[a] = b
                    count -= 1
    return count`,
      pitfalls: ['Diagonal neighbours do not join islands.'] },
    { name: 'Sink each island', idea: 'Scan the map. On land nobody has explored, count an island and sink every connected land cell with a flood fill so it is never counted again.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Each cell is sunk once; the fill stack can hold many cells.',
      js: `function numIslands(grid) {
  const m = grid.length, n = grid[0].length;
  let count = 0;
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== '1') continue;
      count++;
      const st = [[r, c]];
      grid[r][c] = '0';
      while (st.length) {
        const [y, x] = st.pop();
        for (const [dy, dx] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const a = y + dy, b = x + dx;
          if (a >= 0 && a < m && b >= 0 && b < n && grid[a][b] === '1') { grid[a][b] = '0'; st.push([a, b]); }
        }
      }
    }
  return count;
}`,
      py: `def numIslands(grid):
    m, n = len(grid), len(grid[0])
    count = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] != '1':
                continue
            count += 1
            st = [(r, c)]
            grid[r][c] = '0'
            while st:
                y, x = st.pop()
                for a, b in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= a < m and 0 <= b < n and grid[a][b] == '1':
                        grid[a][b] = '0'
                        st.append((a, b))
    return count`,
      pitfalls: ['Cells hold the strings "1" and "0", not numbers.', 'Marking a cell only when you pop it lets it be pushed many times.'] }
  ],
  'max-area-of-island': [
    { name: 'Count each island with a set', idea: 'For each unvisited land cell, explore its island with a queue and a visited set, counting cells.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Each cell is visited once.',
      js: `function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length, seen = new Set();
  let best = 0;
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      if (!grid[r][c] || seen.has(r * n + c)) continue;
      const q = [[r, c]];
      seen.add(r * n + c);
      for (let i = 0; i < q.length; i++) {
        const [y, x] = q[i];
        for (const [a, b] of [[y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]])
          if (a >= 0 && a < m && b >= 0 && b < n && grid[a][b] && !seen.has(a * n + b)) { seen.add(a * n + b); q.push([a, b]); }
      }
      best = Math.max(best, q.length);
    }
  return best;
}`,
      py: `def maxAreaOfIsland(grid):
    m, n = len(grid), len(grid[0])
    seen, best = set(), 0
    for r in range(m):
        for c in range(n):
            if not grid[r][c] or (r, c) in seen:
                continue
            q = [(r, c)]
            seen.add((r, c))
            for y, x in q:
                for a, b in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= a < m and 0 <= b < n and grid[a][b] and (a, b) not in seen:
                        seen.add((a, b))
                        q.append((a, b))
            best = max(best, len(q))
    return best`,
      pitfalls: ['A map with no land gives 0.'] },
    { name: 'Sink and count', idea: 'Flood fill each island, setting cells to 0 as you go and returning how many you sank.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Each cell is sunk once; the recursion can go m·n deep.',
      js: `function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length;
  const sink = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || !grid[r][c]) return 0;
    grid[r][c] = 0;
    return 1 + sink(r + 1, c) + sink(r - 1, c) + sink(r, c + 1) + sink(r, c - 1);
  };
  let best = 0;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) best = Math.max(best, sink(r, c));
  return best;
}`,
      py: `def maxAreaOfIsland(grid):
    m, n = len(grid), len(grid[0])
    def sink(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or not grid[r][c]:
            return 0
        grid[r][c] = 0
        return 1 + sink(r + 1, c) + sink(r - 1, c) + sink(r, c + 1) + sink(r, c - 1)
    return max(sink(r, c) for r in range(m) for c in range(n))`,
      pitfalls: ['Very large islands can overflow the call stack; switch to an explicit stack then.'] }
  ],
  'clone-graph': [
    { name: 'Copy every node first', idea: 'Collect all nodes with a search, make a copy of each, then wire every copy’s neighbours through a map.',
      time: 'O(V + E)', space: 'O(V)', why: 'Two passes over nodes and edges; the map holds one copy per node.',
      js: `function cloneGraph(node) {
  if (!node) return null;
  const all = [node], seen = new Set([node]);
  for (let i = 0; i < all.length; i++) for (const nb of all[i].neighbors) if (!seen.has(nb)) { seen.add(nb); all.push(nb); }
  const copy = new Map(all.map((n) => [n, new Node(n.val, [])]));
  for (const n of all) copy.get(n).neighbors = n.neighbors.map((nb) => copy.get(nb));
  return copy.get(node);
}`,
      py: `def cloneGraph(node):
    if not node:
        return None
    allnodes, seen = [node], {node}
    for n in allnodes:
        for nb in n.neighbors:
            if nb not in seen:
                seen.add(nb)
                allnodes.append(nb)
    copy = {n: Node(n.val, []) for n in allnodes}
    for n in allnodes:
        copy[n].neighbors = [copy[nb] for nb in n.neighbors]
    return copy[node]`,
      pitfalls: ['Pointing a copy at an original neighbour instead of its copy.'] },
    { name: 'Copy as you explore', idea: 'Search the graph once. The first time you meet a node, copy it and record the copy; every edge then links to the recorded copy.',
      time: 'O(V + E)', space: 'O(V)', why: 'Each node and edge is handled once.',
      js: `function cloneGraph(node) {
  const copies = new Map();
  const copy = (n) => {
    if (copies.has(n)) return copies.get(n);
    const c = new Node(n.val, []);
    copies.set(n, c);
    for (const nb of n.neighbors) c.neighbors.push(copy(nb));
    return c;
  };
  return node ? copy(node) : null;
}`,
      py: `def cloneGraph(node):
    copies = {}
    def copy(n):
        if n in copies:
            return copies[n]
        c = Node(n.val, [])
        copies[n] = c
        c.neighbors = [copy(nb) for nb in n.neighbors]
        return c
    return copy(node) if node else None`,
      pitfalls: ['Recording the copy after copying the neighbours loops forever on a cycle.'] }
  ],
  'pacific-atlantic-water-flow': [
    { name: 'Rain from every cell', idea: 'From each cell, search every cell its rain can flow to and check whether it reaches both oceans.',
      time: 'O((m·n)²)', space: 'O(m·n)', why: 'A full search from each of m·n cells.', slow: true,
      js: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length, out = [];
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      let pac = false, atl = false;
      const seen = new Set([r * n + c]), st = [[r, c]];
      while (st.length) {
        const [y, x] = st.pop();
        if (y === 0 || x === 0) pac = true;
        if (y === m - 1 || x === n - 1) atl = true;
        for (const [a, b] of [[y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]])
          if (a >= 0 && a < m && b >= 0 && b < n && !seen.has(a * n + b) && heights[a][b] <= heights[y][x]) { seen.add(a * n + b); st.push([a, b]); }
      }
      if (pac && atl) out.push([r, c]);
    }
  return out;
}`,
      py: `def pacificAtlantic(heights):
    m, n = len(heights), len(heights[0])
    out = []
    for r in range(m):
        for c in range(n):
            pac = atl = False
            seen, st = {(r, c)}, [(r, c)]
            while st:
                y, x = st.pop()
                pac |= y == 0 or x == 0
                atl |= y == m - 1 or x == n - 1
                for a, b in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= a < m and 0 <= b < n and (a, b) not in seen and heights[a][b] <= heights[y][x]:
                        seen.add((a, b))
                        st.append((a, b))
            if pac and atl:
                out.append([r, c])
    return out`,
      pitfalls: ['Water may flow to a cell of equal height.'] },
    { name: 'Climb up from each ocean', idea: 'Search inland from each ocean’s edge, stepping only to cells at least as high. Cells reached from both oceans are the answer.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Two searches, each visiting every cell at most once.',
      js: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const climb = (starts) => {
    const seen = new Set(starts.map(([r, c]) => r * n + c)), st = starts.slice();
    while (st.length) {
      const [y, x] = st.pop();
      for (const [a, b] of [[y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]])
        if (a >= 0 && a < m && b >= 0 && b < n && !seen.has(a * n + b) && heights[a][b] >= heights[y][x]) { seen.add(a * n + b); st.push([a, b]); }
    }
    return seen;
  };
  const pac = [], atl = [];
  for (let r = 0; r < m; r++) { pac.push([r, 0]); atl.push([r, n - 1]); }
  for (let c = 0; c < n; c++) { pac.push([0, c]); atl.push([m - 1, c]); }
  const a = climb(pac), b = climb(atl), out = [];
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (a.has(r * n + c) && b.has(r * n + c)) out.push([r, c]);
  return out;
}`,
      py: `def pacificAtlantic(heights):
    m, n = len(heights), len(heights[0])
    def climb(starts):
        seen, st = set(starts), list(starts)
        while st:
            y, x = st.pop()
            for a, b in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= a < m and 0 <= b < n and (a, b) not in seen and heights[a][b] >= heights[y][x]:
                    seen.add((a, b))
                    st.append((a, b))
        return seen
    pac = climb([(r, 0) for r in range(m)] + [(0, c) for c in range(n)])
    atl = climb([(r, n - 1) for r in range(m)] + [(m - 1, c) for c in range(n)])
    return [[r, c] for r, c in pac & atl]`,
      pitfalls: ['Climbing from the ocean the step goes to a cell that is not lower, the reverse of the rain.'] }
  ],
  'number-of-provinces': [
    { name: 'Search from each city', idea: 'For each city not yet visited, count a province and visit every city linked to it.',
      time: 'O(n²)', space: 'O(n)', why: 'Each city reads its whole row once.',
      js: `function findCircleNum(isConnected) {
  const n = isConnected.length, seen = new Array(n).fill(false);
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (seen[i]) continue;
    count++;
    const st = [i];
    seen[i] = true;
    while (st.length) {
      const a = st.pop();
      for (let b = 0; b < n; b++) if (isConnected[a][b] && !seen[b]) { seen[b] = true; st.push(b); }
    }
  }
  return count;
}`,
      py: `def findCircleNum(isConnected):
    n = len(isConnected)
    seen, count = [False] * n, 0
    for i in range(n):
        if seen[i]:
            continue
        count += 1
        st, seen[i] = [i], True
        while st:
            a = st.pop()
            for b in range(n):
                if isConnected[a][b] and not seen[b]:
                    seen[b] = True
                    st.append(b)
    return count`,
      pitfalls: ['A city with no links is a province on its own.'] },
    { name: 'Union-find', idea: 'Start with every city as its own group and join each linked pair. Each join that merges two groups lowers the count by one.',
      time: 'O(n²)', space: 'O(n)', why: 'n² cells are read; finds are nearly O(1) with path compression.',
      js: `function findCircleNum(isConnected) {
  const n = isConnected.length, parent = [...Array(n).keys()];
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  let count = n;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      if (isConnected[i][j]) { const a = find(i), b = find(j); if (a !== b) { parent[a] = b; count--; } }
  return count;
}`,
      py: `def findCircleNum(isConnected):
    n = len(isConnected)
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    count = n
    for i in range(n):
        for j in range(i + 1, n):
            if isConnected[i][j]:
                a, b = find(i), find(j)
                if a != b:
                    parent[a] = b
                    count -= 1
    return count`,
      pitfalls: ['Linking i to j directly instead of their group heads can split a group.'] }
  ],
  'level-order': [
    { name: 'Depth-first with a level number', idea: 'Walk the tree depth first, passing each node its level, and append its value to that level’s list.',
      time: 'O(n)', space: 'O(n)', why: 'Each node once; the answer lists hold every value and the stack is as deep as the tree.',
      js: `function levelOrder(root) {
  const out = [];
  const walk = (n, d) => {
    if (!n) return;
    if (out.length === d) out.push([]);
    out[d].push(n.val);
    walk(n.left, d + 1);
    walk(n.right, d + 1);
  };
  walk(root, 0);
  return out;
}`,
      py: `def levelOrder(root):
    out = []
    def walk(n, d):
        if not n:
            return
        if len(out) == d:
            out.append([])
        out[d].append(n.val)
        walk(n.left, d + 1)
        walk(n.right, d + 1)
    walk(root, 0)
    return out`,
      pitfalls: ['Visiting right before left puts each level in the wrong order.'] },
    { name: 'One floor at a time', idea: 'Keep the current floor’s nodes. Read their values, then gather their children, left to right, as the next floor.',
      time: 'O(n)', space: 'O(n)', why: 'Each node once; a floor can hold about half the nodes.',
      js: `function levelOrder(root) {
  const out = [];
  let floor = root ? [root] : [];
  while (floor.length) {
    out.push(floor.map((n) => n.val));
    floor = floor.flatMap((n) => [n.left, n.right].filter(Boolean));
  }
  return out;
}`,
      py: `def levelOrder(root):
    out, floor = [], ([root] if root else [])
    while floor:
        out.append([n.val for n in floor])
        floor = [c for n in floor for c in (n.left, n.right) if c]
    return out`,
      pitfalls: ['An empty tree gives an empty list, not [[]].'] }
  ],
  'right-side-view': [
    { name: 'All floors, keep the last', idea: 'Collect every floor left to right, then take the last value of each.',
      time: 'O(n)', space: 'O(n)', why: 'Each node once; all floors are stored.',
      js: `function rightSideView(root) {
  const floors = [];
  const walk = (n, d) => { if (!n) return; (floors[d] = floors[d] || []).push(n.val); walk(n.left, d + 1); walk(n.right, d + 1); };
  walk(root, 0);
  return floors.map((f) => f[f.length - 1]);
}`,
      py: `def rightSideView(root):
    floors = []
    def walk(n, d):
        if n:
            if len(floors) == d:
                floors.append([])
            floors[d].append(n.val)
            walk(n.left, d + 1)
            walk(n.right, d + 1)
    walk(root, 0)
    return [f[-1] for f in floors]`,
      pitfalls: ['The rightmost node of a floor may sit under a left branch.'] },
    { name: 'Last node of each floor', idea: 'Walk the tree floor by floor and record the last node of each floor.',
      time: 'O(n)', space: 'O(n)', why: 'Each node once; the queue holds a floor.',
      js: `function rightSideView(root) {
  const out = [];
  let floor = root ? [root] : [];
  while (floor.length) {
    out.push(floor[floor.length - 1].val);
    floor = floor.flatMap((n) => [n.left, n.right].filter(Boolean));
  }
  return out;
}`,
      py: `def rightSideView(root):
    out, floor = [], ([root] if root else [])
    while floor:
        out.append(floor[-1].val)
        floor = [c for n in floor for c in (n.left, n.right) if c]
    return out`,
      pitfalls: ['Only following right children misses floors that exist only on the left.'] }
  ],
  'shortest-path-in-binary-matrix': [
    { name: 'Depth-first search for every path', idea: 'Try every open path from the corner with backtracking and keep the shortest that reaches the far corner.',
      time: 'O(8^(n²))', space: 'O(n²)', why: 'The number of paths grows wildly; fine only for tiny grids.', slow: true,
      js: `function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] || grid[n - 1][n - 1]) return -1;
  let best = Infinity;
  const seen = grid.map((r) => r.map(() => false));
  const go = (r, c, len) => {
    if (len >= best) return;
    if (r === n - 1 && c === n - 1) { best = len; return; }
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      const a = r + dr, b = c + dc;
      if (a >= 0 && a < n && b >= 0 && b < n && !grid[a][b] && !seen[a][b]) { seen[a][b] = true; go(a, b, len + 1); seen[a][b] = false; }
    }
  };
  seen[0][0] = true;
  go(0, 0, 1);
  return best === Infinity ? -1 : best;
}`,
      py: `def shortestPathBinaryMatrix(grid):
    n = len(grid)
    if grid[0][0] or grid[n - 1][n - 1]:
        return -1
    best = [float('inf')]
    seen = [[False] * n for _ in range(n)]
    def go(r, c, length):
        if length >= best[0]:
            return
        if r == n - 1 and c == n - 1:
            best[0] = length
            return
        for a in range(r - 1, r + 2):
            for b in range(c - 1, c + 2):
                if 0 <= a < n and 0 <= b < n and not grid[a][b] and not seen[a][b]:
                    seen[a][b] = True
                    go(a, b, length + 1)
                    seen[a][b] = False
    seen[0][0] = True
    go(0, 0, 1)
    return -1 if best[0] == float('inf') else best[0]`,
      pitfalls: ['A blocked start or end means there is no path.'] },
    { name: 'Breadth-first ripple', idea: 'Spread out from the top-left one ring at a time over open cells in all 8 directions. The ring that first touches the far corner is the answer.',
      time: 'O(n²)', space: 'O(n²)', why: 'Each cell enters the queue once.',
      js: `function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] || grid[n - 1][n - 1]) return -1;
  const q = [[0, 0, 1]];
  grid[0][0] = 1;
  for (let i = 0; i < q.length; i++) {
    const [r, c, d] = q[i];
    if (r === n - 1 && c === n - 1) return d;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      const a = r + dr, b = c + dc;
      if (a >= 0 && a < n && b >= 0 && b < n && !grid[a][b]) { grid[a][b] = 1; q.push([a, b, d + 1]); }
    }
  }
  return -1;
}`,
      py: `def shortestPathBinaryMatrix(grid):
    n = len(grid)
    if grid[0][0] or grid[n - 1][n - 1]:
        return -1
    q = [(0, 0, 1)]
    grid[0][0] = 1
    for r, c, d in q:
        if r == n - 1 and c == n - 1:
            return d
        for a in range(r - 1, r + 2):
            for b in range(c - 1, c + 2):
                if 0 <= a < n and 0 <= b < n and not grid[a][b]:
                    grid[a][b] = 1
                    q.append((a, b, d + 1))
    return -1`,
      pitfalls: ['The answer counts cells, so a 1 x 1 open grid gives 1.', 'Mark cells when you queue them, not when you pop them.'] }
  ],
  'rotting-oranges': [
    { name: 'Rot one minute at a time', idea: 'Each minute, scan the grid and rot every fresh orange next to a rotten one, until nothing changes.',
      time: 'O((m·n)²)', space: 'O(m·n)', why: 'Up to m·n minutes, each scanning the grid.',
      js: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  let minutes = 0;
  for (;;) {
    const turn = [];
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++)
      if (grid[r][c] === 1 && [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]].some(([a, b]) => a >= 0 && a < m && b >= 0 && b < n && grid[a][b] === 2)) turn.push([r, c]);
    if (!turn.length) break;
    turn.forEach(([r, c]) => { grid[r][c] = 2; });
    minutes++;
  }
  return grid.some((row) => row.includes(1)) ? -1 : minutes;
}`,
      py: `def orangesRotting(grid):
    m, n = len(grid), len(grid[0])
    minutes = 0
    while True:
        turn = [(r, c) for r in range(m) for c in range(n) if grid[r][c] == 1 and any(
            0 <= a < m and 0 <= b < n and grid[a][b] == 2 for a, b in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)))]
        if not turn:
            break
        for r, c in turn:
            grid[r][c] = 2
        minutes += 1
    return -1 if any(1 in row for row in grid) else minutes`,
      pitfalls: ['Rotting oranges during the same scan lets the rot spread several steps in one minute.'] },
    { name: 'Ripple from every rotten orange', idea: 'Put every rotten orange in the queue at once and spread ring by ring. Count the rings, then check no fresh orange is left.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Each orange enters the queue at most once.',
      js: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  let q = [], fresh = 0, minutes = 0;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) { if (grid[r][c] === 2) q.push([r, c]); if (grid[r][c] === 1) fresh++; }
  while (q.length && fresh) {
    const next = [];
    for (const [r, c] of q)
      for (const [a, b] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]])
        if (a >= 0 && a < m && b >= 0 && b < n && grid[a][b] === 1) { grid[a][b] = 2; fresh--; next.push([a, b]); }
    q = next;
    minutes++;
  }
  return fresh ? -1 : minutes;
}`,
      py: `def orangesRotting(grid):
    m, n = len(grid), len(grid[0])
    q = [(r, c) for r in range(m) for c in range(n) if grid[r][c] == 2]
    fresh = sum(row.count(1) for row in grid)
    minutes = 0
    while q and fresh:
        nxt = []
        for r, c in q:
            for a, b in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= a < m and 0 <= b < n and grid[a][b] == 1:
                    grid[a][b] = 2
                    fresh -= 1
                    nxt.append((a, b))
        q = nxt
        minutes += 1
    return -1 if fresh else minutes`,
      pitfalls: ['No fresh oranges at the start means 0 minutes, even with no rotten ones.'] }
  ],
  '01-matrix': [
    { name: 'Search from each 1', idea: 'For each cell holding 1, spread out ring by ring until you meet a 0.',
      time: 'O((m·n)²)', space: 'O(m·n)', why: 'A search from every cell.', slow: true,
      js: `function updateMatrix(mat) {
  const m = mat.length, n = mat[0].length;
  return mat.map((row, r) => row.map((v, c) => {
    if (!v) return 0;
    const seen = new Set([r * n + c]), q = [[r, c, 0]];
    for (let i = 0; i < q.length; i++) {
      const [y, x, d] = q[i];
      if (!mat[y][x]) return d;
      for (const [a, b] of [[y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]])
        if (a >= 0 && a < m && b >= 0 && b < n && !seen.has(a * n + b)) { seen.add(a * n + b); q.push([a, b, d + 1]); }
    }
    return -1;
  }));
}`,
      py: `def updateMatrix(mat):
    m, n = len(mat), len(mat[0])
    def dist(r, c):
        seen, q = {(r, c)}, [(r, c, 0)]
        for y, x, d in q:
            if not mat[y][x]:
                return d
            for a, b in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= a < m and 0 <= b < n and (a, b) not in seen:
                    seen.add((a, b))
                    q.append((a, b, d + 1))
    return [[dist(r, c) if mat[r][c] else 0 for c in range(n)] for r in range(m)]`,
      pitfalls: ['Distance counts steps up, down, left and right only.'] },
    { name: 'Ripple from every 0', idea: 'Start a breadth-first search from all 0 cells at once. The first time a ring reaches a cell is its distance.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'Each cell is queued once.',
      js: `function updateMatrix(mat) {
  const m = mat.length, n = mat[0].length;
  const dist = mat.map((row) => row.map((v) => (v ? -1 : 0)));
  const q = [];
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (!mat[r][c]) q.push([r, c]);
  for (let i = 0; i < q.length; i++) {
    const [r, c] = q[i];
    for (const [a, b] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]])
      if (a >= 0 && a < m && b >= 0 && b < n && dist[a][b] < 0) { dist[a][b] = dist[r][c] + 1; q.push([a, b]); }
  }
  return dist;
}`,
      py: `def updateMatrix(mat):
    m, n = len(mat), len(mat[0])
    dist = [[0 if v == 0 else -1 for v in row] for row in mat]
    q = [(r, c) for r in range(m) for c in range(n) if mat[r][c] == 0]
    for r, c in q:
        for a, b in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= a < m and 0 <= b < n and dist[a][b] < 0:
                dist[a][b] = dist[r][c] + 1
                q.append((a, b))
    return dist`,
      pitfalls: ['Starting from the 1 cells instead of the 0 cells brings back the slow version.'] }
  ],
  'course-schedule': [
    { name: 'Look for a loop from each course', idea: 'Search the prerequisites from every course, marking the current path. Meeting a course already on the path is a loop.',
      time: 'O(V · (V + E))', space: 'O(V + E)', why: 'A fresh search from each course.',
      js: `function canFinish(numCourses, prerequisites) {
  const g = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) g[b].push(a);
  const loop = (x, path) => {
    if (path.has(x)) return true;
    path.add(x);
    const found = g[x].some((y) => loop(y, path));
    path.delete(x);
    return found;
  };
  for (let i = 0; i < numCourses; i++) if (loop(i, new Set())) return false;
  return true;
}`,
      py: `def canFinish(numCourses, prerequisites):
    g = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        g[b].append(a)
    def loop(x, path):
        if x in path:
            return True
        path.add(x)
        found = any(loop(y, path) for y in g[x])
        path.discard(x)
        return found
    return not any(loop(i, set()) for i in range(numCourses))`,
      pitfalls: ['Remembering finished courses across searches is what makes it fast; without it, work repeats.'] },
    { name: 'Unlock courses with no waiting', idea: 'Count each course’s unmet prerequisites. Start with the courses at zero; taking one lowers the count of the courses waiting on it. All courses taken means no loop.',
      time: 'O(V + E)', space: 'O(V + E)', why: 'Each course and each prerequisite is handled once.',
      js: `function canFinish(numCourses, prerequisites) {
  const g = Array.from({ length: numCourses }, () => []), need = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) { g[b].push(a); need[a]++; }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (!need[i]) q.push(i);
  for (let i = 0; i < q.length; i++) for (const y of g[q[i]]) if (--need[y] === 0) q.push(y);
  return q.length === numCourses;
}`,
      py: `def canFinish(numCourses, prerequisites):
    g = [[] for _ in range(numCourses)]
    need = [0] * numCourses
    for a, b in prerequisites:
        g[b].append(a)
        need[a] += 1
    q = [i for i in range(numCourses) if need[i] == 0]
    for x in q:
        for y in g[x]:
            need[y] -= 1
            if need[y] == 0:
                q.append(y)
    return len(q) == numCourses`,
      pitfalls: ['[a, b] means b comes before a, so the arrow goes from b to a.'] }
  ],
  'course-schedule-ii': [
    { name: 'Pick any free course, again and again', idea: 'Repeatedly scan for a course whose prerequisites are all taken and take it. If a scan finds none before all are taken, there is a loop.',
      time: 'O(V · (V + E))', space: 'O(V + E)', why: 'Up to V scans over every course and prerequisite.',
      js: `function findOrder(numCourses, prerequisites) {
  const taken = new Array(numCourses).fill(false), order = [];
  while (order.length < numCourses) {
    let picked = false;
    for (let c = 0; c < numCourses; c++) {
      if (taken[c]) continue;
      if (prerequisites.every(([a, b]) => a !== c || taken[b])) { taken[c] = true; order.push(c); picked = true; }
    }
    if (!picked) return [];
  }
  return order;
}`,
      py: `def findOrder(numCourses, prerequisites):
    taken, order = [False] * numCourses, []
    while len(order) < numCourses:
        picked = False
        for c in range(numCourses):
            if not taken[c] and all(a != c or taken[b] for a, b in prerequisites):
                taken[c] = True
                order.append(c)
                picked = True
        if not picked:
            return []
    return order`,
      pitfalls: ['With a loop the answer is an empty list, not a partial order.'] },
    { name: 'Order by unlocking', idea: 'Count unmet prerequisites per course, start with the courses at zero, and record each course as you take it. That record is a valid order.',
      time: 'O(V + E)', space: 'O(V + E)', why: 'Each course and prerequisite once.',
      js: `function findOrder(numCourses, prerequisites) {
  const g = Array.from({ length: numCourses }, () => []), need = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) { g[b].push(a); need[a]++; }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (!need[i]) q.push(i);
  for (let i = 0; i < q.length; i++) for (const y of g[q[i]]) if (--need[y] === 0) q.push(y);
  return q.length === numCourses ? q : [];
}`,
      py: `def findOrder(numCourses, prerequisites):
    g = [[] for _ in range(numCourses)]
    need = [0] * numCourses
    for a, b in prerequisites:
        g[b].append(a)
        need[a] += 1
    q = [i for i in range(numCourses) if need[i] == 0]
    for x in q:
        for y in g[x]:
            need[y] -= 1
            if need[y] == 0:
                q.append(y)
    return q if len(q) == numCourses else []`,
      pitfalls: ['A course with no prerequisites and no dependents still belongs in the order.'] }
  ],
  'word-ladder': [
    { name: 'Compare with every word', idea: 'Breadth-first search where the next words are the ones in the list that differ by one letter, found by comparing with every word.',
      time: 'O(N² · L)', space: 'O(N)', why: 'Each word is compared with all N words.',
      js: `function ladderLength(beginWord, endWord, wordList) {
  const near = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && ++d > 1) return false; return d === 1; };
  const left = new Set(wordList);
  if (!left.has(endWord)) return 0;
  let level = [beginWord], steps = 1;
  while (level.length) {
    const next = [];
    for (const w of level) {
      if (w === endWord) return steps;
      for (const x of [...left]) if (near(w, x)) { left.delete(x); next.push(x); }
    }
    level = next;
    steps++;
  }
  return 0;
}`,
      py: `def ladderLength(beginWord, endWord, wordList):
    def near(a, b):
        return sum(x != y for x, y in zip(a, b)) == 1
    left = set(wordList)
    if endWord not in left:
        return 0
    level, steps = [beginWord], 1
    while level:
        nxt = []
        for w in level:
            if w == endWord:
                return steps
            for x in list(left):
                if near(w, x):
                    left.discard(x)
                    nxt.append(x)
        level, steps = nxt, steps + 1
    return 0`,
      pitfalls: ['The answer counts words, so a one-step change is a chain of 2.'] },
    { name: 'Wildcard buckets', idea: 'Group words by patterns with one letter hidden, like c*t. Words in the same bucket are one change apart, so the search looks up buckets instead of comparing words.',
      time: 'O(N · L²)', space: 'O(N · L)', why: 'Each word makes L patterns of length L; each bucket is used once.',
      js: `function ladderLength(beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;
  const buckets = new Map();
  for (const w of wordList.concat([beginWord]))
    for (let i = 0; i < w.length; i++) {
      const key = w.slice(0, i) + '*' + w.slice(i + 1);
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(w);
    }
  const seen = new Set([beginWord]);
  let level = [beginWord], steps = 1;
  while (level.length) {
    const next = [];
    for (const w of level) {
      if (w === endWord) return steps;
      for (let i = 0; i < w.length; i++) {
        const key = w.slice(0, i) + '*' + w.slice(i + 1);
        for (const x of buckets.get(key) || []) if (!seen.has(x)) { seen.add(x); next.push(x); }
        buckets.delete(key);
      }
    }
    level = next;
    steps++;
  }
  return 0;
}`,
      py: `def ladderLength(beginWord, endWord, wordList):
    if endWord not in wordList:
        return 0
    buckets = {}
    for w in wordList + [beginWord]:
        for i in range(len(w)):
            buckets.setdefault(w[:i] + '*' + w[i + 1:], []).append(w)
    seen, level, steps = {beginWord}, [beginWord], 1
    while level:
        nxt = []
        for w in level:
            if w == endWord:
                return steps
            for i in range(len(w)):
                for x in buckets.pop(w[:i] + '*' + w[i + 1:], []):
                    if x not in seen:
                        seen.add(x)
                        nxt.append(x)
        level, steps = nxt, steps + 1
    return 0`,
      pitfalls: ['If endWord is not in the list there is no chain at all.', 'Emptying a bucket after its first use keeps the work linear.'] }
  ],
  'letter-combinations-of-a-phone-number': [
    { name: 'Grow a list of strings', idea: 'Start with one empty string. For each digit, extend every string so far with each of the digit’s letters.',
      time: 'O(4ⁿ · n)', space: 'O(4ⁿ · n)', why: 'The partial lists hold every string built so far.',
      js: `function letterCombinations(digits) {
  if (!digits) return [];
  const keys = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' };
  let out = [''];
  for (const d of digits) out = out.flatMap((s) => keys[d].split('').map((c) => s + c));
  return out;
}`,
      py: `def letterCombinations(digits):
    if not digits:
        return []
    keys = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}
    out = ['']
    for d in digits:
        out = [s + c for s in out for c in keys[d]]
    return out`,
      pitfalls: ['No digits means an empty list, not [""].'] },
    { name: 'Backtrack one digit at a time', idea: 'Pick a letter for the first digit, then recurse on the rest; when every digit has a letter, record the string.',
      time: 'O(4ⁿ · n)', space: 'O(n)', why: 'Up to 4ⁿ strings of length n; the path is n letters deep.',
      js: `function letterCombinations(digits) {
  if (!digits) return [];
  const keys = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' }, out = [], path = [];
  const go = (i) => {
    if (i === digits.length) { out.push(path.join('')); return; }
    for (const c of keys[digits[i]]) { path.push(c); go(i + 1); path.pop(); }
  };
  go(0);
  return out;
}`,
      py: `def letterCombinations(digits):
    if not digits:
        return []
    keys = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}
    out, path = [], []
    def go(i):
        if i == len(digits):
            out.append(''.join(path))
            return
        for c in keys[digits[i]]:
            path.append(c)
            go(i + 1)
            path.pop()
    go(0)
    return out`,
      pitfalls: ['7 and 9 have four letters, not three.'] }
  ],
  'subsets': [
    { name: 'Count in binary', idea: 'Each number from 0 to 2ⁿ - 1 is a subset: bit i says whether nums[i] is in it.',
      time: 'O(n · 2ⁿ)', space: 'O(n)', why: '2ⁿ masks, each read in n steps.',
      js: `function subsets(nums) {
  const out = [];
  for (let mask = 0; mask < 1 << nums.length; mask++) out.push(nums.filter((_, i) => mask & (1 << i)));
  return out;
}`,
      py: `def subsets(nums):
    n = len(nums)
    return [[nums[i] for i in range(n) if mask >> i & 1] for mask in range(1 << n)]`,
      pitfalls: ['Forgetting the empty subset (mask 0).'] },
    { name: 'In or out, for each item', idea: 'For each number, branch twice: leave it out, or put it in. Every path to the bottom is a subset.',
      time: 'O(n · 2ⁿ)', space: 'O(n)', why: '2ⁿ subsets, each copied in n steps; the path is n deep.',
      js: `function subsets(nums) {
  const out = [], path = [];
  const go = (i) => {
    if (i === nums.length) { out.push(path.slice()); return; }
    go(i + 1);
    path.push(nums[i]);
    go(i + 1);
    path.pop();
  };
  go(0);
  return out;
}`,
      py: `def subsets(nums):
    out, path = [], []
    def go(i):
        if i == len(nums):
            out.append(path[:])
            return
        go(i + 1)
        path.append(nums[i])
        go(i + 1)
        path.pop()
    go(0)
    return out`,
      pitfalls: ['Pushing path itself instead of a copy: every answer ends up the same empty list.'] }
  ],
  'combination-sum': [
    { name: 'Try every count of each item', idea: 'For each candidate, try using it 0, 1, 2, ... times while the total stays within target.',
      time: 'O(2^t)', space: 'O(t)', why: 'The tree of choices is at most target deep.',
      js: `function combinationSum(candidates, target) {
  const out = [], path = [];
  const go = (i, left) => {
    if (left === 0) { out.push(path.slice()); return; }
    if (i === candidates.length) return;
    let used = 0;
    for (let k = 0; k * candidates[i] <= left; k++) {
      go(i + 1, left - k * candidates[i]);
      path.push(candidates[i]);
      used++;
    }
    path.length -= used;
  };
  go(0, target);
  return out;
}`,
      py: `def combinationSum(candidates, target):
    out, path = [], []
    def go(i, left):
        if left == 0:
            out.append(path[:])
            return
        if i == len(candidates):
            return
        used = 0
        while used * candidates[i] <= left:
            go(i + 1, left - used * candidates[i])
            path.append(candidates[i])
            used += 1
        del path[len(path) - used:]
    go(0, target)
    return out`,
      pitfalls: ['Checking left === 0 only at the end of the list misses nothing here, but checking it first saves work.'] },
    { name: 'Reuse or move on, with pruning', idea: 'Sort. From index i, try each candidate at or after i (so no basket is counted twice) and stop as soon as one is too big.',
      time: 'O(2^t)', space: 'O(t)', why: 'Same tree, cut short once a candidate overshoots.',
      js: `function combinationSum(candidates, target) {
  const c = candidates.slice().sort((a, b) => a - b), out = [], path = [];
  const go = (start, left) => {
    if (left === 0) { out.push(path.slice()); return; }
    for (let i = start; i < c.length && c[i] <= left; i++) {
      path.push(c[i]);
      go(i, left - c[i]);
      path.pop();
    }
  };
  go(0, target);
  return out;
}`,
      py: `def combinationSum(candidates, target):
    c, out, path = sorted(candidates), [], []
    def go(start, left):
        if left == 0:
            out.append(path[:])
            return
        for i in range(start, len(c)):
            if c[i] > left:
                break
            path.append(c[i])
            go(i, left - c[i])
            path.pop()
    go(0, target)
    return out`,
      pitfalls: ['Starting each loop at 0 makes [2, 3] and [3, 2] both appear.'] }
  ],
  'combination-sum-ii': [
    { name: 'Every subset, then dedupe', idea: 'Try every subset, keep the ones that add up to target, and drop repeats by sorting each one.',
      time: 'O(n · 2ⁿ)', space: 'O(2ⁿ)', why: '2ⁿ subsets; the set of seen answers can grow large.', slow: true,
      js: `function combinationSum2(candidates, target) {
  const c = candidates.slice().sort((a, b) => a - b), seen = new Map();
  for (let mask = 0; mask < 1 << c.length; mask++) {
    const pick = c.filter((_, i) => mask & (1 << i));
    if (pick.reduce((s, x) => s + x, 0) === target) seen.set(pick.join(','), pick);
  }
  return [...seen.values()];
}`,
      py: `def combinationSum2(candidates, target):
    c = sorted(candidates)
    seen = set()
    for mask in range(1 << len(c)):
        pick = tuple(c[i] for i in range(len(c)) if mask >> i & 1)
        if sum(pick) == target:
            seen.add(pick)
    return [list(t) for t in seen]`,
      pitfalls: ['Repeated numbers make the same combination come up more than once.'] },
    { name: 'Sort and skip twins', idea: 'Sort. From each position try each next number once, but skip a number equal to the one just tried at the same level, and stop when a number is too big.',
      time: 'O(n · 2ⁿ)', space: 'O(n)', why: 'At most 2ⁿ subsets; pruning and skipping cut most of them.',
      js: `function combinationSum2(candidates, target) {
  const c = candidates.slice().sort((a, b) => a - b), out = [], path = [];
  const go = (start, left) => {
    if (left === 0) { out.push(path.slice()); return; }
    for (let i = start; i < c.length && c[i] <= left; i++) {
      if (i > start && c[i] === c[i - 1]) continue;
      path.push(c[i]);
      go(i + 1, left - c[i]);
      path.pop();
    }
  };
  go(0, target);
  return out;
}`,
      py: `def combinationSum2(candidates, target):
    c, out, path = sorted(candidates), [], []
    def go(start, left):
        if left == 0:
            out.append(path[:])
            return
        for i in range(start, len(c)):
            if c[i] > left:
                break
            if i > start and c[i] == c[i - 1]:
                continue
            path.append(c[i])
            go(i + 1, left - c[i])
            path.pop()
    go(0, target)
    return out`,
      pitfalls: ['Skipping with i > 0 instead of i > start throws away answers like [1, 1, 6].'] }
  ],
  'permutations': [
    { name: 'Insert into every gap', idea: 'Build orderings one number at a time: put the next number into every gap of every ordering so far.',
      time: 'O(n · n!)', space: 'O(n · n!)', why: 'All partial orderings are kept at each step.',
      js: `function permute(nums) {
  let out = [[]];
  for (const x of nums) out = out.flatMap((p) => Array.from({ length: p.length + 1 }, (_, i) => [...p.slice(0, i), x, ...p.slice(i)]));
  return out;
}`,
      py: `def permute(nums):
    out = [[]]
    for x in nums:
        out = [p[:i] + [x] + p[i:] for p in out for i in range(len(p) + 1)]
    return out`,
      pitfalls: ['A list of one number has one ordering.'] },
    { name: 'Seat guests one chair at a time', idea: 'Fill positions left to right. Try every unused number in the next position, recurse, then free it again.',
      time: 'O(n · n!)', space: 'O(n)', why: 'n! orderings of length n; the path and the used marks are n long.',
      js: `function permute(nums) {
  const out = [], path = [], used = new Array(nums.length).fill(false);
  const go = () => {
    if (path.length === nums.length) { out.push(path.slice()); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      go();
      path.pop();
      used[i] = false;
    }
  };
  go();
  return out;
}`,
      py: `def permute(nums):
    out, path, used = [], [], [False] * len(nums)
    def go():
        if len(path) == len(nums):
            out.append(path[:])
            return
        for i, x in enumerate(nums):
            if not used[i]:
                used[i] = True
                path.append(x)
                go()
                path.pop()
                used[i] = False
    go()
    return out`,
      pitfalls: ['Forgetting to free the number after the recursive call.'] }
  ],
  'generate-parentheses': [
    { name: 'Every string, then filter', idea: 'Build every string of 2n brackets and keep the balanced ones.',
      time: 'O(n · 4ⁿ)', space: 'O(n)', why: '2^(2n) strings, each checked in 2n steps.', slow: true,
      js: `function generateParenthesis(n) {
  const out = [];
  const go = (s) => {
    if (s.length === 2 * n) {
      let bal = 0;
      for (const c of s) { bal += c === '(' ? 1 : -1; if (bal < 0) return; }
      if (bal === 0) out.push(s);
      return;
    }
    go(s + '(');
    go(s + ')');
  };
  go('');
  return out;
}`,
      py: `def generateParenthesis(n):
    out = []
    def go(s):
        if len(s) == 2 * n:
            bal = 0
            for c in s:
                bal += 1 if c == '(' else -1
                if bal < 0:
                    return
            if bal == 0:
                out.append(s)
            return
        go(s + '(')
        go(s + ')')
    go('')
    return out`,
      pitfalls: ['Balanced means the running count never drops below zero, not only that it ends at zero.'] },
    { name: 'Open while you can, close when it is safe', idea: 'Add "(" while fewer than n are open, and ")" only while it closes an open one. Every finished string is balanced.',
      time: 'O(4ⁿ / √n)', space: 'O(n)', why: 'Only valid strings are built, and there are about 4ⁿ / √n of them.',
      js: `function generateParenthesis(n) {
  const out = [];
  const go = (s, open, close) => {
    if (s.length === 2 * n) { out.push(s); return; }
    if (open < n) go(s + '(', open + 1, close);
    if (close < open) go(s + ')', open, close + 1);
  };
  go('', 0, 0);
  return out;
}`,
      py: `def generateParenthesis(n):
    out = []
    def go(s, opened, closed):
        if len(s) == 2 * n:
            out.append(s)
            return
        if opened < n:
            go(s + '(', opened + 1, closed)
        if closed < opened:
            go(s + ')', opened, closed + 1)
    go('', 0, 0)
    return out`,
      pitfalls: ['Allowing ")" when closed equals open builds strings that cannot be fixed later.'] }
  ],
  'word-search': [
    { name: 'Trace from every cell', idea: 'Start from each cell with the first letter and trace the word through neighbours, marking cells on the path and unmarking them when a path fails.',
      time: 'O(m·n·4^L)', space: 'O(m·n)', why: 'Each start may branch four ways at every letter; a visited grid is kept.',
      js: `function exist(board, word) {
  const m = board.length, n = board[0].length, used = board.map((r) => r.map(() => false));
  const go = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || used[r][c] || board[r][c] !== word[i]) return false;
    used[r][c] = true;
    const ok = go(r + 1, c, i + 1) || go(r - 1, c, i + 1) || go(r, c + 1, i + 1) || go(r, c - 1, i + 1);
    used[r][c] = false;
    return ok;
  };
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (go(r, c, 0)) return true;
  return false;
}`,
      py: `def exist(board, word):
    m, n = len(board), len(board[0])
    used = [[False] * n for _ in range(m)]
    def go(r, c, i):
        if i == len(word):
            return True
        if r < 0 or r >= m or c < 0 or c >= n or used[r][c] or board[r][c] != word[i]:
            return False
        used[r][c] = True
        ok = go(r + 1, c, i + 1) or go(r - 1, c, i + 1) or go(r, c + 1, i + 1) or go(r, c - 1, i + 1)
        used[r][c] = False
        return ok
    return any(go(r, c, 0) for r in range(m) for c in range(n))`,
      pitfalls: ['Not unmarking a cell after a failed path blocks other paths through it.'] },
    { name: 'Mark on the board, skip impossible words', idea: 'Same trace, but mark cells by blanking them on the board itself, never come back the way you came, and give up at once if the board lacks enough of some letter.',
      time: 'O(m·n·3^L)', space: 'O(L)', why: 'After the first step each cell has at most 3 new ways to go; only the recursion stack is extra.',
      js: `function exist(board, word) {
  const m = board.length, n = board[0].length, have = {};
  for (const row of board) for (const ch of row) have[ch] = (have[ch] || 0) + 1;
  for (const ch of word) if (!have[ch]--) return false;
  const go = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[i]) return false;
    board[r][c] = '#';
    const ok = go(r + 1, c, i + 1) || go(r - 1, c, i + 1) || go(r, c + 1, i + 1) || go(r, c - 1, i + 1);
    board[r][c] = word[i];
    return ok;
  };
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (go(r, c, 0)) return true;
  return false;
}`,
      py: `def exist(board, word):
    from collections import Counter
    m, n = len(board), len(board[0])
    have = Counter(ch for row in board for ch in row)
    if any(have[ch] < k for ch, k in Counter(word).items()):
        return False
    def go(r, c, i):
        if i == len(word):
            return True
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[i]:
            return False
        board[r][c] = '#'
        ok = go(r + 1, c, i + 1) or go(r - 1, c, i + 1) or go(r, c + 1, i + 1) or go(r, c - 1, i + 1)
        board[r][c] = word[i]
        return ok
    return any(go(r, c, 0) for r in range(m) for c in range(n))`,
      pitfalls: ['Forgetting to put the letter back after blanking it changes the board for later starts.'] }
  ],
  'palindrome-partitioning': [
    { name: 'Every set of cuts', idea: 'Each of the n - 1 gaps is cut or not. Try every choice and keep the ones where every piece is a palindrome.',
      time: 'O(n · 2ⁿ)', space: 'O(n)', why: '2^(n - 1) ways to cut, each checked in O(n).',
      js: `function partition(s) {
  const out = [], isPal = (t) => t === t.split('').reverse().join('');
  for (let mask = 0; mask < 1 << Math.max(0, s.length - 1); mask++) {
    const pieces = [];
    let start = 0;
    for (let i = 1; i <= s.length; i++) if (i === s.length || mask & (1 << (i - 1))) { pieces.push(s.slice(start, i)); start = i; }
    if (pieces.every(isPal)) out.push(pieces);
  }
  return out;
}`,
      py: `def partition(s):
    out = []
    for mask in range(1 << max(0, len(s) - 1)):
        pieces, start = [], 0
        for i in range(1, len(s) + 1):
            if i == len(s) or mask >> (i - 1) & 1:
                pieces.append(s[start:i])
                start = i
        if all(p == p[::-1] for p in pieces):
            out.append(pieces)
    return out`,
      pitfalls: ['The pieces must stay in their order in s.'] },
    { name: 'Cut only after a palindrome', idea: 'From the current start, try each end that makes a palindrome piece, then cut the rest the same way.',
      time: 'O(n · 2ⁿ)', space: 'O(n)', why: 'At most 2^(n - 1) partitions, but dead ends are cut early.',
      js: `function partition(s) {
  const out = [], path = [];
  const isPal = (l, r) => { while (l < r) if (s[l++] !== s[r--]) return false; return true; };
  const go = (start) => {
    if (start === s.length) { out.push(path.slice()); return; }
    for (let end = start; end < s.length; end++) {
      if (!isPal(start, end)) continue;
      path.push(s.slice(start, end + 1));
      go(end + 1);
      path.pop();
    }
  };
  go(0);
  return out;
}`,
      py: `def partition(s):
    out, path = [], []
    def go(start):
        if start == len(s):
            out.append(path[:])
            return
        for end in range(start + 1, len(s) + 1):
            piece = s[start:end]
            if piece == piece[::-1]:
                path.append(piece)
                go(end)
                path.pop()
    go(0)
    return out`,
      pitfalls: ['A single letter is always a palindrome, so there is always at least one way.'] }
  ],
  'n-queens': [
    { name: 'Every column order, then check', idea: 'One queen per row and per column means the board is an ordering of columns. Try every ordering and keep those with no shared diagonal.',
      time: 'O(n · n!)', space: 'O(n)', why: 'n! orderings, each checked for diagonals.', slow: true,
      js: `function solveNQueens(n) {
  const out = [], cols = [], used = new Array(n).fill(false);
  const go = () => {
    if (cols.length === n) {
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (Math.abs(cols[a] - cols[b]) === b - a) return;
      out.push(cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));
      return;
    }
    for (let c = 0; c < n; c++) if (!used[c]) { used[c] = true; cols.push(c); go(); cols.pop(); used[c] = false; }
  };
  go();
  return out;
}`,
      py: `def solveNQueens(n):
    from itertools import permutations
    out = []
    for cols in permutations(range(n)):
        if all(abs(cols[a] - cols[b]) != b - a for a in range(n) for b in range(a + 1, n)):
            out.append(['.' * c + 'Q' + '.' * (n - c - 1) for c in cols])
    return out`,
      pitfalls: ['Two queens share a diagonal when their row gap equals their column gap.'] },
    { name: 'Place row by row, check as you go', idea: 'Put one queen per row. Keep the columns and both diagonals already taken, and only try squares that are free on all three.',
      time: 'O(n!)', space: 'O(n)', why: 'Each row has fewer free squares than the one before; three sets of size n.',
      js: `function solveNQueens(n) {
  const out = [], cols = [], col = new Set(), d1 = new Set(), d2 = new Set();
  const go = (r) => {
    if (r === n) { out.push(cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1))); return; }
    for (let c = 0; c < n; c++) {
      if (col.has(c) || d1.has(r - c) || d2.has(r + c)) continue;
      col.add(c); d1.add(r - c); d2.add(r + c); cols.push(c);
      go(r + 1);
      col.delete(c); d1.delete(r - c); d2.delete(r + c); cols.pop();
    }
  };
  go(0);
  return out;
}`,
      py: `def solveNQueens(n):
    out, cols = [], []
    col, d1, d2 = set(), set(), set()
    def go(r):
        if r == n:
            out.append(['.' * c + 'Q' + '.' * (n - c - 1) for c in cols])
            return
        for c in range(n):
            if c in col or r - c in d1 or r + c in d2:
                continue
            col.add(c); d1.add(r - c); d2.add(r + c); cols.append(c)
            go(r + 1)
            col.discard(c); d1.discard(r - c); d2.discard(r + c); cols.pop()
    go(0)
    return out`,
      pitfalls: ['A down-right diagonal keeps r - c the same; an up-right one keeps r + c the same.'] }
  ],
  'climbing-stairs': [
    { name: 'Plain recursion', idea: 'The ways to step n are the ways to step n - 1 plus the ways to step n - 2. Ask both, again and again.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'The same smaller questions are asked many times; the stack is n deep.', slow: true,
      js: `function climbStairs(n) {
  return n <= 2 ? n : climbStairs(n - 1) + climbStairs(n - 2);
}`,
      py: `def climbStairs(n):
    return n if n <= 2 else climbStairs(n - 1) + climbStairs(n - 2)`,
      pitfalls: ['n = 45 takes billions of calls this way.'] },
    { name: 'Notes for every step', idea: 'Fill a table from the bottom: ways[i] = ways[i - 1] + ways[i - 2].',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the table has n entries.',
      js: `function climbStairs(n) {
  const ways = [1, 1];
  for (let i = 2; i <= n; i++) ways[i] = ways[i - 1] + ways[i - 2];
  return ways[n];
}`,
      py: `def climbStairs(n):
    ways = [1, 1]
    for i in range(2, n + 1):
        ways.append(ways[-1] + ways[-2])
    return ways[n]`,
      pitfalls: ['ways[0] is 1: there is one way to stand still at the bottom.'] },
    { name: 'Keep only two notes', idea: 'Each step needs only the two before it, so keep just those two numbers.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two numbers.',
      js: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
      py: `def climbStairs(n):
    a = b = 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
      pitfalls: ['Updating a before computing a + b loses the old value; swap both at once.'] }
  ],
  'min-cost-climbing-stairs': [
    { name: 'Recursion over both choices', idea: 'The cheapest way to reach step i is its cost plus the cheaper of reaching i - 1 or i - 2.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Each call branches twice without notes.', slow: true,
      js: `function minCostClimbingStairs(cost) {
  const reach = (i) => (i < 2 ? cost[i] : cost[i] + Math.min(reach(i - 1), reach(i - 2)));
  const n = cost.length;
  return Math.min(reach(n - 1), reach(n - 2));
}`,
      py: `def minCostClimbingStairs(cost):
    def reach(i):
        return cost[i] if i < 2 else cost[i] + min(reach(i - 1), reach(i - 2))
    n = len(cost)
    return min(reach(n - 1), reach(n - 2))`,
      pitfalls: ['The top is past the last step, so you may finish from either of the last two.'] },
    { name: 'Two running totals', idea: 'Walk the steps keeping the cheapest cost to stand on the last two steps; each new step costs its price plus the cheaper of those.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two numbers.',
      js: `function minCostClimbingStairs(cost) {
  let a = 0, b = 0;
  for (let i = 2; i <= cost.length; i++) [a, b] = [b, Math.min(b + cost[i - 1], a + cost[i - 2])];
  return b;
}`,
      py: `def minCostClimbingStairs(cost):
    a = b = 0
    for i in range(2, len(cost) + 1):
        a, b = b, min(b + cost[i - 1], a + cost[i - 2])
    return b`,
      pitfalls: ['Starting on step 0 or step 1 is free; you pay for a step when you leave it.'] }
  ],
  'house-robber': [
    { name: 'Take or skip, recursively', idea: 'At each house, either take it and skip the next, or skip it. Try both.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Two branches per house without notes.', slow: true,
      js: `function rob(nums) {
  const go = (i) => (i >= nums.length ? 0 : Math.max(nums[i] + go(i + 2), go(i + 1)));
  return go(0);
}`,
      py: `def rob(nums):
    def go(i):
        return 0 if i >= len(nums) else max(nums[i] + go(i + 2), go(i + 1))
    return go(0)`,
      pitfalls: ['Taking every other house is not always best: [2, 1, 1, 9].'] },
    { name: 'Best so far, two notes', idea: 'Walk the street keeping the best total up to the house before and the one before that. At each house: take it plus the older note, or keep the newer note.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two numbers.',
      js: `function rob(nums) {
  let prev = 0, cur = 0;
  for (const x of nums) [prev, cur] = [cur, Math.max(cur, prev + x)];
  return cur;
}`,
      py: `def rob(nums):
    prev = cur = 0
    for x in nums:
        prev, cur = cur, max(cur, prev + x)
    return cur`,
      pitfalls: ['An empty street gives 0.'] }
  ],
  'house-robber-ii': [
    { name: 'Try every start choice', idea: 'Recurse over take or skip for each house, remembering whether the first house was taken so the last one is not.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Two branches per house without notes.', slow: true,
      js: `function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  const go = (i, tookFirst) => {
    if (i >= n) return 0;
    const skip = go(i + 1, tookFirst);
    if (i === n - 1 && tookFirst) return skip;
    return Math.max(skip, nums[i] + go(i + 2, tookFirst || i === 0));
  };
  return go(0, false);
}`,
      py: `def rob(nums):
    n = len(nums)
    if n == 1:
        return nums[0]
    def go(i, took_first):
        if i >= n:
            return 0
        skip = go(i + 1, took_first)
        if i == n - 1 and took_first:
            return skip
        return max(skip, nums[i] + go(i + 2, took_first or i == 0))
    return go(0, False)`,
      pitfalls: ['A single house can be robbed; it has no neighbours.'] },
    { name: 'Two straight streets', idea: 'The first and last houses cannot both be taken, so solve the street without the last house and the street without the first, and take the better one.',
      time: 'O(n)', space: 'O(1)', why: 'Two passes of the straight-street solution.',
      js: `function rob(nums) {
  if (nums.length === 1) return nums[0];
  const line = (a) => { let prev = 0, cur = 0; for (const x of a) [prev, cur] = [cur, Math.max(cur, prev + x)]; return cur; };
  return Math.max(line(nums.slice(1)), line(nums.slice(0, -1)));
}`,
      py: `def rob(nums):
    if len(nums) == 1:
        return nums[0]
    def line(a):
        prev = cur = 0
        for x in a:
            prev, cur = cur, max(cur, prev + x)
        return cur
    return max(line(nums[1:]), line(nums[:-1]))`,
      pitfalls: ['Slicing copies the list; loop over index ranges to stay at O(1) memory.'] }
  ],
  'max-subarray': [
    { name: 'Every stretch', idea: 'Try every start and extend the end with a running sum, keeping the largest.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 stretches.', slow: true,
      js: `function maxSubArray(nums) {
  let best = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) best = Math.max(best, (s += nums[j]));
  }
  return best;
}`,
      py: `def maxSubArray(nums):
    best = float('-inf')
    for i in range(len(nums)):
        s = 0
        for j in range(i, len(nums)):
            s += nums[j]
            best = max(best, s)
    return best`,
      pitfalls: ['Starting best at 0 fails when every number is negative.'] },
    { name: 'Restart when the stretch sinks', idea: 'Carry the best sum of a stretch ending here. If it drops below zero, a fresh start beats it.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two numbers.',
      js: `function maxSubArray(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,
      py: `def maxSubArray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`,
      pitfalls: ['The stretch must hold at least one number, so start from nums[0], not 0.'] }
  ],
  'maximum-product-subarray': [
    { name: 'Every stretch', idea: 'Try every start and multiply forward, keeping the largest product.',
      time: 'O(n²)', space: 'O(1)', why: 'About n²/2 stretches.', slow: true,
      js: `function maxProduct(nums) {
  let best = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let p = 1;
    for (let j = i; j < nums.length; j++) best = Math.max(best, (p *= nums[j]));
  }
  return best;
}`,
      py: `def maxProduct(nums):
    best = float('-inf')
    for i in range(len(nums)):
        p = 1
        for j in range(i, len(nums)):
            p *= nums[j]
            best = max(best, p)
    return best`,
      pitfalls: ['A zero wipes out a product, so a stretch may need to start right after it.'] },
    { name: 'Track the largest and smallest', idea: 'A negative number turns the smallest product into the largest. Carry both the largest and smallest product of a stretch ending here.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, three numbers.',
      js: `function maxProduct(nums) {
  let hi = nums[0], lo = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i], a = hi * x, b = lo * x;
    hi = Math.max(x, a, b);
    lo = Math.min(x, a, b);
    best = Math.max(best, hi);
  }
  return best;
}`,
      py: `def maxProduct(nums):
    hi = lo = best = nums[0]
    for x in nums[1:]:
        a, b = hi * x, lo * x
        hi, lo = max(x, a, b), min(x, a, b)
        best = max(best, hi)
    return best`,
      pitfalls: ['Updating hi before computing lo uses the new hi by mistake.', 'JavaScript can give -0; the tests treat it as 0.'] }
  ],
  'unique-paths': [
    { name: 'Count by recursion', idea: 'The ways into a square are the ways from above plus the ways from the left.',
      time: 'O(2^(m + n))', space: 'O(m + n)', why: 'Without notes the same squares are counted again and again.', slow: true,
      js: `function uniquePaths(m, n) {
  const go = (r, c) => (r === 1 || c === 1 ? 1 : go(r - 1, c) + go(r, c - 1));
  return go(m, n);
}`,
      py: `def uniquePaths(m, n):
    def go(r, c):
        return 1 if r == 1 or c == 1 else go(r - 1, c) + go(r, c - 1)
    return go(m, n)`,
      pitfalls: ['A single row or column has exactly one path.'] },
    { name: 'Fill the grid like a notebook', idea: 'Fill a table where each square is the square above plus the square to the left.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'One value per square.',
      js: `function uniquePaths(m, n) {
  const t = Array.from({ length: m }, () => new Array(n).fill(1));
  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) t[r][c] = t[r - 1][c] + t[r][c - 1];
  return t[m - 1][n - 1];
}`,
      py: `def uniquePaths(m, n):
    t = [[1] * n for _ in range(m)]
    for r in range(1, m):
        for c in range(1, n):
            t[r][c] = t[r - 1][c] + t[r][c - 1]
    return t[-1][-1]`,
      pitfalls: ['The first row and column are all 1.'] },
    { name: 'One row of notes', idea: 'Only the row above is needed, so keep one row and add the left neighbour into it as you move along.',
      time: 'O(m·n)', space: 'O(n)', why: 'One pass per row over a single row of n numbers.',
      js: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) row[c] += row[c - 1];
  return row[n - 1];
}`,
      py: `def uniquePaths(m, n):
    row = [1] * n
    for _ in range(1, m):
        for c in range(1, n):
            row[c] += row[c - 1]
    return row[-1]`,
      pitfalls: ['There is also a formula: choose m - 1 downs among m + n - 2 moves, but big numbers can lose precision.'] }
  ],
  'coin-change': [
    { name: 'Try every coin, recursively', idea: 'The fewest coins for an amount is one plus the fewest for the amount minus some coin. Try every coin.',
      time: 'O(c^a)', space: 'O(a)', why: 'Each call branches once per coin; the depth can reach the amount.', slow: true,
      js: `function coinChange(coins, amount) {
  const go = (left) => {
    if (left === 0) return 0;
    let best = Infinity;
    for (const c of coins) if (c <= left) best = Math.min(best, 1 + go(left - c));
    return best;
  };
  const r = go(amount);
  return r === Infinity ? -1 : r;
}`,
      py: `def coinChange(coins, amount):
    def go(left):
        if left == 0:
            return 0
        best = float('inf')
        for c in coins:
            if c <= left:
                best = min(best, 1 + go(left - c))
        return best
    r = go(amount)
    return -1 if r == float('inf') else r`,
      pitfalls: ['Always taking the biggest coin fails: coins [1, 3, 4] and amount 6 need 3 + 3.'] },
    { name: 'Notes for every smaller amount', idea: 'Fill best[x], the fewest coins for each amount x from 0 up: best[x] = 1 + the smallest best[x - coin].',
      time: 'O(a · c)', space: 'O(a)', why: 'Each amount tries every coin once.',
      js: `function coinChange(coins, amount) {
  const best = new Array(amount + 1).fill(Infinity);
  best[0] = 0;
  for (let x = 1; x <= amount; x++) for (const c of coins) if (c <= x && best[x - c] + 1 < best[x]) best[x] = best[x - c] + 1;
  return best[amount] === Infinity ? -1 : best[amount];
}`,
      py: `def coinChange(coins, amount):
    best = [0] + [float('inf')] * amount
    for x in range(1, amount + 1):
        for c in coins:
            if c <= x and best[x - c] + 1 < best[x]:
                best[x] = best[x - c] + 1
    return -1 if best[amount] == float('inf') else best[amount]`,
      pitfalls: ['Amount 0 needs 0 coins.'] }
  ],
  'partition-equal-subset-sum': [
    { name: 'Take or skip each number', idea: 'Look for a group that adds up to half the total by trying both choices for every number.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Two branches per number.', slow: true,
      js: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const go = (i, left) => left === 0 || (i < nums.length && left > 0 && (go(i + 1, left - nums[i]) || go(i + 1, left)));
  return go(0, total / 2);
}`,
      py: `def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False
    def go(i, left):
        return left == 0 or (i < len(nums) and left > 0 and (go(i + 1, left - nums[i]) or go(i + 1, left)))
    return go(0, total // 2)`,
      pitfalls: ['An odd total can never split evenly.'] },
    { name: 'Which sums are reachable', idea: 'Keep a row of flags: can[x] says some group adds to x. Add each number by walking x from high to low.',
      time: 'O(n · s)', space: 'O(s)', why: 'Each number updates up to s flags, where s is half the total.',
      js: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const half = total / 2, can = new Array(half + 1).fill(false);
  can[0] = true;
  for (const x of nums) for (let s = half; s >= x; s--) if (can[s - x]) can[s] = true;
  return can[half];
}`,
      py: `def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False
    half = total // 2
    can = [True] + [False] * half
    for x in nums:
        for s in range(half, x - 1, -1):
            if can[s - x]:
                can[s] = True
    return can[half]`,
      pitfalls: ['Walking x from low to high reuses the same number many times.'] }
  ],
  'word-break': [
    { name: 'Try every first word', idea: 'If s starts with a dictionary word, try to break the rest. Without notes, the same rest is tried many times.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Each position may branch for every word that fits.', slow: true,
      js: `function wordBreak(s, wordDict) {
  const go = (i) => i === s.length || wordDict.some((w) => s.startsWith(w, i) && go(i + w.length));
  return go(0);
}`,
      py: `def wordBreak(s, wordDict):
    def go(i):
        return i == len(s) or any(s.startswith(w, i) and go(i + len(w)) for w in wordDict)
    return go(0)`,
      pitfalls: ['A word may be used more than once.'] },
    { name: 'Mark every clean cut', idea: 'ok[i] says the first i letters can be cut into words. ok[i] is true when some earlier clean cut j leaves a dictionary word from j to i.',
      time: 'O(n² · L)', space: 'O(n)', why: 'n² pairs of cuts, each comparing a slice of up to L letters.',
      js: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict), ok = new Array(s.length + 1).fill(false);
  ok[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i && !ok[i]; j++) if (ok[j] && words.has(s.slice(j, i))) ok[i] = true;
  return ok[s.length];
}`,
      py: `def wordBreak(s, wordDict):
    words = set(wordDict)
    ok = [True] + [False] * len(s)
    for i in range(1, len(s) + 1):
        for j in range(i):
            if ok[j] and s[j:i] in words:
                ok[i] = True
                break
    return ok[-1]`,
      pitfalls: ['Greedy cutting at the first word that fits fails: "carsand" with ["car", "cars", "sand"].'] }
  ],
  'decode-ways': [
    { name: 'Read one or two digits, recursively', idea: 'From each position, read one digit (if it is not 0) or two digits (if they make 10 to 26), and count both ways.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Two branches per position without notes.', slow: true,
      js: `function numDecodings(s) {
  const go = (i) => {
    if (i === s.length) return 1;
    if (s[i] === '0') return 0;
    let ways = go(i + 1);
    if (i + 1 < s.length && Number(s.slice(i, i + 2)) <= 26) ways += go(i + 2);
    return ways;
  };
  return go(0);
}`,
      py: `def numDecodings(s):
    def go(i):
        if i == len(s):
            return 1
        if s[i] == '0':
            return 0
        ways = go(i + 1)
        if i + 1 < len(s) and int(s[i:i + 2]) <= 26:
            ways += go(i + 2)
        return ways
    return go(0)`,
      pitfalls: ['"06" is not 6: a piece cannot start with 0.'] },
    { name: 'Two notes from the right', idea: 'Walk from the end keeping the ways to decode from the next position and the one after; combine them the same way.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, two numbers.',
      js: `function numDecodings(s) {
  let next = 1, after = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    let cur = 0;
    if (s[i] !== '0') {
      cur = next;
      if (i + 1 < s.length && Number(s[i] + s[i + 1]) <= 26) cur += after;
    }
    [next, after] = [cur, next];
  }
  return next;
}`,
      py: `def numDecodings(s):
    nxt, after = 1, 0
    for i in range(len(s) - 1, -1, -1):
        cur = 0
        if s[i] != '0':
            cur = nxt
            if i + 1 < len(s) and int(s[i:i + 2]) <= 26:
                cur += after
        nxt, after = cur, nxt
    return nxt`,
      pitfalls: ['A string with a 0 that cannot pair, like "30", has 0 ways.'] }
  ],
  'lis': [
    { name: 'Take or skip each value', idea: 'Try building every rising subsequence: each value is taken if it is bigger than the last taken one, or skipped.',
      time: 'O(2ⁿ)', space: 'O(n)', why: 'Two branches per value.', slow: true,
      js: `function lengthOfLIS(nums) {
  const go = (i, last) => {
    if (i === nums.length) return 0;
    let best = go(i + 1, last);
    if (nums[i] > last) best = Math.max(best, 1 + go(i + 1, nums[i]));
    return best;
  };
  return go(0, -Infinity);
}`,
      py: `def lengthOfLIS(nums):
    def go(i, last):
        if i == len(nums):
            return 0
        best = go(i + 1, last)
        if nums[i] > last:
            best = max(best, 1 + go(i + 1, nums[i]))
        return best
    return go(0, float('-inf'))`,
      pitfalls: ['Strictly increasing: equal values do not extend a chain.'] },
    { name: 'Longest chain ending at each value', idea: 'For each value, its longest chain is one more than the longest chain of any smaller value before it.',
      time: 'O(n²)', space: 'O(n)', why: 'Each value looks at every earlier one.',
      js: `function lengthOfLIS(nums) {
  const len = nums.map(() => 1);
  for (let i = 1; i < nums.length; i++) for (let j = 0; j < i; j++) if (nums[j] < nums[i]) len[i] = Math.max(len[i], len[j] + 1);
  return nums.length ? Math.max(...len) : 0;
}`,
      py: `def lengthOfLIS(nums):
    length = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                length[i] = max(length[i], length[j] + 1)
    return max(length, default=0)`,
      pitfalls: ['The answer is the largest value in the table, not the last one.'] },
    { name: 'Smallest tails with binary search', idea: 'tails[k] is the smallest value that can end a rising chain of length k + 1. Each value replaces the first tail not smaller than it, or extends the list.',
      time: 'O(n log n)', space: 'O(n)', why: 'One binary search per value.',
      js: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (tails[mid] < x) lo = mid + 1; else hi = mid; }
    tails[lo] = x;
  }
  return tails.length;
}`,
      py: `def lengthOfLIS(nums):
    import bisect
    tails = []
    for x in nums:
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)`,
      pitfalls: ['tails is not itself a rising subsequence of nums; only its length is the answer.', 'bisect_right would let equal values extend the chain.'] }
  ],
  'longest-common-subsequence': [
    { name: 'Match or skip, recursively', idea: 'If the first letters match, count one and move both; otherwise skip a letter from one word or the other and keep the better.',
      time: 'O(2^(m + n))', space: 'O(m + n)', why: 'Two branches on every mismatch, without notes.', slow: true,
      js: `function longestCommonSubsequence(text1, text2) {
  const go = (i, j) => {
    if (i === text1.length || j === text2.length) return 0;
    if (text1[i] === text2[j]) return 1 + go(i + 1, j + 1);
    return Math.max(go(i + 1, j), go(i, j + 1));
  };
  return go(0, 0);
}`,
      py: `def longestCommonSubsequence(text1, text2):
    def go(i, j):
        if i == len(text1) or j == len(text2):
            return 0
        if text1[i] == text2[j]:
            return 1 + go(i + 1, j + 1)
        return max(go(i + 1, j), go(i, j + 1))
    return go(0, 0)`,
      pitfalls: ['A subsequence keeps order but may skip letters; it is not a substring.'] },
    { name: 'Two-index table', idea: 't[i][j] is the answer for the first i letters of one word and the first j of the other. A match adds one to the diagonal; otherwise take the better of up or left.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'One cell per pair of prefixes.',
      js: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const t = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) t[i][j] = text1[i - 1] === text2[j - 1] ? t[i - 1][j - 1] + 1 : Math.max(t[i - 1][j], t[i][j - 1]);
  return t[m][n];
}`,
      py: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    t = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            t[i][j] = t[i - 1][j - 1] + 1 if text1[i - 1] == text2[j - 1] else max(t[i - 1][j], t[i][j - 1])
    return t[m][n]`,
      pitfalls: ['The table is one bigger than each word, with row and column 0 for empty prefixes.'] },
    { name: 'One row, shorter word across', idea: 'Each row only needs the row above. Keep one row as long as the shorter word, plus the old diagonal value.',
      time: 'O(m·n)', space: 'O(min(m, n))', why: 'Same cells, but only one row is stored.',
      js: `function longestCommonSubsequence(text1, text2) {
  if (text2.length > text1.length) [text1, text2] = [text2, text1];
  const row = new Array(text2.length + 1).fill(0);
  for (let i = 1; i <= text1.length; i++) {
    let diag = 0;
    for (let j = 1; j <= text2.length; j++) {
      const up = row[j];
      row[j] = text1[i - 1] === text2[j - 1] ? diag + 1 : Math.max(row[j], row[j - 1]);
      diag = up;
    }
  }
  return row[text2.length];
}`,
      py: `def longestCommonSubsequence(text1, text2):
    if len(text2) > len(text1):
        text1, text2 = text2, text1
    row = [0] * (len(text2) + 1)
    for a in text1:
        diag = 0
        for j in range(1, len(text2) + 1):
            up = row[j]
            row[j] = diag + 1 if a == text2[j - 1] else max(row[j], row[j - 1])
            diag = up
    return row[-1]`,
      pitfalls: ['Overwriting row[j] before saving it loses the diagonal for the next cell.'] }
  ],
  'edit-distance': [
    { name: 'Three choices, recursively', idea: 'If the first letters match, move on. Otherwise try insert, delete and replace, each costing one step, and take the cheapest.',
      time: 'O(3^(m + n))', space: 'O(m + n)', why: 'Three branches per mismatch, without notes.', slow: true,
      js: `function minDistance(word1, word2) {
  const go = (i, j) => {
    if (i === word1.length) return word2.length - j;
    if (j === word2.length) return word1.length - i;
    if (word1[i] === word2[j]) return go(i + 1, j + 1);
    return 1 + Math.min(go(i + 1, j), go(i, j + 1), go(i + 1, j + 1));
  };
  return go(0, 0);
}`,
      py: `def minDistance(word1, word2):
    def go(i, j):
        if i == len(word1):
            return len(word2) - j
        if j == len(word2):
            return len(word1) - i
        if word1[i] == word2[j]:
            return go(i + 1, j + 1)
        return 1 + min(go(i + 1, j), go(i, j + 1), go(i + 1, j + 1))
    return go(0, 0)`,
      pitfalls: ['When one word runs out, the rest of the other costs one step per letter.'] },
    { name: 'Two-index table', idea: 't[i][j] is the cost to turn the first i letters into the first j. A match copies the diagonal; otherwise one plus the smallest of up, left and diagonal.',
      time: 'O(m·n)', space: 'O(m·n)', why: 'One cell per pair of prefixes.',
      js: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const t = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      t[i][j] = word1[i - 1] === word2[j - 1] ? t[i - 1][j - 1] : 1 + Math.min(t[i - 1][j], t[i][j - 1], t[i - 1][j - 1]);
  return t[m][n];
}`,
      py: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    t = [[j if i == 0 else i if j == 0 else 0 for j in range(n + 1)] for i in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                t[i][j] = t[i - 1][j - 1]
            else:
                t[i][j] = 1 + min(t[i - 1][j], t[i][j - 1], t[i - 1][j - 1])
    return t[m][n]`,
      pitfalls: ['Row 0 and column 0 are 0, 1, 2, ...: building from or to an empty word.'] },
    { name: 'One row, shorter word across', idea: 'Keep one row as long as the shorter word and the old diagonal, updating left to right.',
      time: 'O(m·n)', space: 'O(min(m, n))', why: 'Same cells, one row stored.',
      js: `function minDistance(word1, word2) {
  if (word2.length > word1.length) [word1, word2] = [word2, word1];
  const row = Array.from({ length: word2.length + 1 }, (_, j) => j);
  for (let i = 1; i <= word1.length; i++) {
    let diag = row[0];
    row[0] = i;
    for (let j = 1; j <= word2.length; j++) {
      const up = row[j];
      row[j] = word1[i - 1] === word2[j - 1] ? diag : 1 + Math.min(up, row[j - 1], diag);
      diag = up;
    }
  }
  return row[word2.length];
}`,
      py: `def minDistance(word1, word2):
    if len(word2) > len(word1):
        word1, word2 = word2, word1
    row = list(range(len(word2) + 1))
    for i in range(1, len(word1) + 1):
        diag, row[0] = row[0], i
        for j in range(1, len(word2) + 1):
            up = row[j]
            row[j] = diag if word1[i - 1] == word2[j - 1] else 1 + min(up, row[j - 1], diag)
            diag = up
    return row[-1]`,
      pitfalls: ['Swapping the words is fine: the distance is the same both ways.'] }
  ],
  'remove-duplicates-from-sorted-list': [
    { name: 'Rebuild from a set', idea: 'Collect the different values in order and build a new list from them.',
      time: 'O(n)', space: 'O(n)', why: 'One pass and a copy of the values.',
      js: `function deleteDuplicates(head) {
  const vals = [];
  for (let n = head; n; n = n.next) if (!vals.length || vals[vals.length - 1] !== n.val) vals.push(n.val);
  let out = null;
  for (let i = vals.length - 1; i >= 0; i--) out = new ListNode(vals[i], out);
  return out;
}`,
      py: `def deleteDuplicates(head):
    vals = []
    while head:
        if not vals or vals[-1] != head.val:
            vals.append(head.val)
        head = head.next
    out = None
    for v in reversed(vals):
        out = ListNode(v, out)
    return out`,
      pitfalls: ['It builds new nodes when relinking the old ones is enough.'] },
    { name: 'Skip equal neighbours', idea: 'Walk the list; while the next node holds the same value, link past it.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, one pointer.',
      js: `function deleteDuplicates(head) {
  for (let n = head; n && n.next; ) {
    if (n.next.val === n.val) n.next = n.next.next;
    else n = n.next;
  }
  return head;
}`,
      py: `def deleteDuplicates(head):
    n = head
    while n and n.next:
        if n.next.val == n.val:
            n.next = n.next.next
        else:
            n = n.next
    return head`,
      pitfalls: ['Moving on after a skip misses a third copy of the same value.'] }
  ],
  'add-two-numbers': [
    { name: 'Turn into numbers and back', idea: 'Read each list into a whole number, add them, and write the sum back as digits, ones first.',
      time: 'O(n + m)', space: 'O(n + m)', why: 'Each digit is read and written once; BigInt keeps long numbers exact.',
      js: `function addTwoNumbers(l1, l2) {
  const read = (l) => { let s = ''; for (; l; l = l.next) s = l.val + s; return BigInt(s); };
  const sum = String(read(l1) + read(l2));
  let head = null;
  for (const d of sum) head = new ListNode(Number(d), head);
  return head;
}`,
      py: `def addTwoNumbers(l1, l2):
    def read(l):
        s = ''
        while l:
            s = str(l.val) + s
            l = l.next
        return int(s)
    head = None
    for d in str(read(l1) + read(l2)):
        head = ListNode(int(d), head)
    return head`,
      pitfalls: ['Plain numbers lose digits past 2⁵³ in JavaScript; that is why it needs BigInt.'] },
    { name: 'Add digit by digit with a carry', idea: 'Walk both lists together, adding the two digits and the carry; write the ones digit and carry the rest.',
      time: 'O(n + m)', space: 'O(1)', why: 'One pass; only the answer list is built.',
      js: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let t = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const s = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    t = t.next = new ListNode(s % 10);
    carry = Math.floor(s / 10);
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
  }
  return dummy.next;
}`,
      py: `def addTwoNumbers(l1, l2):
    dummy = t = ListNode(0)
    carry = 0
    while l1 or l2 or carry:
        s = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry
        t.next = t = ListNode(s % 10)
        carry = s // 10
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`,
      pitfalls: ['A last carry needs one more node: 5 + 5 is [0, 1].'] }
  ],
  'diameter-of-binary-tree': [
    { name: 'Heights at every node', idea: 'At each node, the longest path through it is its left height plus its right height. Compute heights again for every node.',
      time: 'O(n²)', space: 'O(h)', why: 'A height walk from each of n nodes.',
      js: `function diameterOfBinaryTree(root) {
  const height = (n) => (n ? 1 + Math.max(height(n.left), height(n.right)) : 0);
  const best = (n) => (n ? Math.max(height(n.left) + height(n.right), best(n.left), best(n.right)) : 0);
  return best(root);
}`,
      py: `def diameterOfBinaryTree(root):
    def height(n):
        return 1 + max(height(n.left), height(n.right)) if n else 0
    def best(n):
        return max(height(n.left) + height(n.right), best(n.left), best(n.right)) if n else 0
    return best(root)`,
      pitfalls: ['The longest path need not pass through the root.'] },
    { name: 'One walk returns height, records the best', idea: 'One post-order walk returns each node’s height and, on the way, updates the best left-plus-right sum.',
      time: 'O(n)', space: 'O(h)', why: 'Each node once; the stack is as deep as the tree.',
      js: `function diameterOfBinaryTree(root) {
  let best = 0;
  const height = (n) => {
    if (!n) return 0;
    const l = height(n.left), r = height(n.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  };
  height(root);
  return best;
}`,
      py: `def diameterOfBinaryTree(root):
    best = 0
    def height(n):
        nonlocal best
        if not n:
            return 0
        l, r = height(n.left), height(n.right)
        best = max(best, l + r)
        return 1 + max(l, r)
    height(root)
    return best`,
      pitfalls: ['The answer counts edges, so it is l + r, not l + r + 1.'] }
  ],
  'balanced-binary-tree': [
    { name: 'Heights at every node', idea: 'At every node, compare the heights of its two subtrees, computing each height from scratch.',
      time: 'O(n²)', space: 'O(h)', why: 'A height walk from each node.',
      js: `function isBalanced(root) {
  const height = (n) => (n ? 1 + Math.max(height(n.left), height(n.right)) : 0);
  const ok = (n) => !n || (Math.abs(height(n.left) - height(n.right)) <= 1 && ok(n.left) && ok(n.right));
  return ok(root);
}`,
      py: `def isBalanced(root):
    def height(n):
        return 1 + max(height(n.left), height(n.right)) if n else 0
    def ok(n):
        return not n or (abs(height(n.left) - height(n.right)) <= 1 and ok(n.left) and ok(n.right))
    return ok(root)`,
      pitfalls: ['Checking only the root’s two subtrees misses an unbalanced node lower down.'] },
    { name: 'Height or a fail signal', idea: 'One post-order walk returns a node’s height, or -1 as soon as any subtree is unbalanced.',
      time: 'O(n)', space: 'O(h)', why: 'Each node once.',
      js: `function isBalanced(root) {
  const h = (n) => {
    if (!n) return 0;
    const l = h(n.left);
    if (l < 0) return -1;
    const r = h(n.right);
    if (r < 0 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return h(root) >= 0;
}`,
      py: `def isBalanced(root):
    def h(n):
        if not n:
            return 0
        l = h(n.left)
        if l < 0:
            return -1
        r = h(n.right)
        if r < 0 or abs(l - r) > 1:
            return -1
        return 1 + max(l, r)
    return h(root) >= 0`,
      pitfalls: ['An empty tree is balanced.'] }
  ],
  'symmetric-tree': [
    { name: 'Mirror a copy and compare', idea: 'Build a mirrored copy of the tree and check it equals the original.',
      time: 'O(n)', space: 'O(n)', why: 'The copy holds every node.',
      js: `function isSymmetric(root) {
  const mirror = (n) => (n ? new TreeNode(n.val, mirror(n.right), mirror(n.left)) : null);
  const same = (a, b) => (!a || !b ? a === b : a.val === b.val && same(a.left, b.left) && same(a.right, b.right));
  return same(root, mirror(root));
}`,
      py: `def isSymmetric(root):
    def mirror(n):
        return TreeNode(n.val, mirror(n.right), mirror(n.left)) if n else None
    def same(a, b):
        if not a or not b:
            return a is b
        return a.val == b.val and same(a.left, b.left) and same(a.right, b.right)
    return same(root, mirror(root))`,
      pitfalls: ['It works but builds a whole second tree for nothing.'] },
    { name: 'Compare the two sides inward', idea: 'Two subtrees mirror each other when their roots match, the left’s left mirrors the right’s right, and the left’s right mirrors the right’s left.',
      time: 'O(n)', space: 'O(h)', why: 'Each pair of nodes once; the stack is as deep as the tree.',
      js: `function isSymmetric(root) {
  const mir = (a, b) => (!a || !b ? a === b : a.val === b.val && mir(a.left, b.right) && mir(a.right, b.left));
  return !root || mir(root.left, root.right);
}`,
      py: `def isSymmetric(root):
    def mir(a, b):
        if not a or not b:
            return a is b
        return a.val == b.val and mir(a.left, b.right) and mir(a.right, b.left)
    return not root or mir(root.left, root.right)`,
      pitfalls: ['Comparing left with left checks for sameness, not a mirror.'] }
  ],
  'subtree-of-another-tree': [
    { name: 'Compare at every node', idea: 'At each node of root, check whether the tree starting there is identical to subRoot.',
      time: 'O(m·n)', space: 'O(h)', why: 'An identity check of up to n nodes at each of m nodes.',
      js: `function isSubtree(root, subRoot) {
  const same = (a, b) => (!a || !b ? a === b : a.val === b.val && same(a.left, b.left) && same(a.right, b.right));
  const go = (n) => !!n && (same(n, subRoot) || go(n.left) || go(n.right));
  return go(root);
}`,
      py: `def isSubtree(root, subRoot):
    def same(a, b):
        if not a or not b:
            return a is b
        return a.val == b.val and same(a.left, b.left) and same(a.right, b.right)
    def go(n):
        return bool(n) and (same(n, subRoot) or go(n.left) or go(n.right))
    return go(root)`,
      pitfalls: ['Matching values is not enough: the shapes below must match too.'] },
    { name: 'Compare the written-out trees', idea: 'Write both trees in preorder with markers for missing children and borders around values, then look for subRoot’s text inside root’s.',
      time: 'O(m·n)', space: 'O(h)', why: 'Writing is linear, and a plain text search is O(m·n) in the worst case; a prefix-table search would make it linear.',
      js: `function isSubtree(root, subRoot) {
  const out = [];
  const write = (n) => { if (!n) { out.push('#'); return; } out.push('(' + n.val + ')'); write(n.left); write(n.right); };
  write(root);
  const a = out.join(',');
  out.length = 0;
  write(subRoot);
  return (',' + a + ',').includes(',' + out.join(',') + ',');
}`,
      py: `def isSubtree(root, subRoot):
    def write(n, out):
        if not n:
            out.append('#')
        else:
            out.append('(' + str(n.val) + ')')
            write(n.left, out)
            write(n.right, out)
        return out
    a = ',' + ','.join(write(root, [])) + ','
    return ',' + ','.join(write(subRoot, [])) + ',' in a`,
      pitfalls: ['Without borders around values, 2 would match inside 12.'] }
  ],
  'lowest-common-ancestor-of-a-binary-search-tree': [
    { name: 'Paths from the root', idea: 'Find the path from the root to p and to q, then take the last node the two paths share.',
      time: 'O(h)', space: 'O(h)', why: 'Two walks down the tree; the paths are stored.',
      js: `function lowestCommonAncestor(root, p, q) {
  const path = (v) => { const out = []; for (let n = root; n; n = v < n.val ? n.left : n.right) { out.push(n.val); if (n.val === v) break; } return out; };
  const a = path(p), b = path(q);
  let i = 0;
  while (i + 1 < a.length && i + 1 < b.length && a[i + 1] === b[i + 1]) i++;
  return a[i];
}`,
      py: `def lowestCommonAncestor(root, p, q):
    def path(v):
        out, n = [], root
        while n:
            out.append(n.val)
            if n.val == v:
                break
            n = n.left if v < n.val else n.right
        return out
    a, b = path(p), path(q)
    i = 0
    while i + 1 < len(a) and i + 1 < len(b) and a[i + 1] == b[i + 1]:
        i += 1
    return a[i]`,
      pitfalls: ['A node counts as its own ancestor.'] },
    { name: 'Walk down until they split', idea: 'From the root, go left while both values are smaller and right while both are larger. The first node between them is the answer.',
      time: 'O(h)', space: 'O(1)', why: 'One walk down, one pointer.',
      js: `function lowestCommonAncestor(root, p, q) {
  let n = root;
  while (n) {
    if (p < n.val && q < n.val) n = n.left;
    else if (p > n.val && q > n.val) n = n.right;
    else return n.val;
  }
  return -1;
}`,
      py: `def lowestCommonAncestor(root, p, q):
    n = root
    while n:
        if p < n.val and q < n.val:
            n = n.left
        elif p > n.val and q > n.val:
            n = n.right
        else:
            return n.val
    return -1`,
      pitfalls: ['It relies on the search-tree order; a plain binary tree needs a full search.'] }
  ],
  'kth-smallest-element-in-a-bst': [
    { name: 'Collect all in order', idea: 'An inorder walk lists the values sorted; take the k-th.',
      time: 'O(n)', space: 'O(n)', why: 'Every node is listed.',
      js: `function kthSmallest(root, k) {
  const v = [];
  const walk = (n) => { if (!n) return; walk(n.left); v.push(n.val); walk(n.right); };
  walk(root);
  return v[k - 1];
}`,
      py: `def kthSmallest(root, k):
    v = []
    def walk(n):
        if n:
            walk(n.left)
            v.append(n.val)
            walk(n.right)
    walk(root)
    return v[k - 1]`,
      pitfalls: ['k counts from 1.'] },
    { name: 'Stop at the k-th', idea: 'Walk inorder with an explicit stack and stop as soon as k values have come out.',
      time: 'O(h + k)', space: 'O(h)', why: 'You go down one path and then pop k values; the stack holds one path.',
      js: `function kthSmallest(root, k) {
  const st = [];
  let n = root;
  for (;;) {
    while (n) { st.push(n); n = n.left; }
    n = st.pop();
    if (--k === 0) return n.val;
    n = n.right;
  }
}`,
      py: `def kthSmallest(root, k):
    st, n = [], root
    while True:
        while n:
            st.append(n)
            n = n.left
        n = st.pop()
        k -= 1
        if k == 0:
            return n.val
        n = n.right`,
      pitfalls: ['Collecting every value first wastes the early stop.'] }
  ],
  'construct-binary-tree-from-preorder-and-inorder-traversal': [
    { name: 'Split with slices', idea: 'The first preorder value is the root. Find it in inorder: left of it is the left subtree, right of it the right. Recurse on slices.',
      time: 'O(n²)', space: 'O(n²)', why: 'Each level searches and copies slices.',
      js: `function buildTree(preorder, inorder) {
  if (!preorder.length) return null;
  const v = preorder[0], i = inorder.indexOf(v);
  return new TreeNode(v, buildTree(preorder.slice(1, i + 1), inorder.slice(0, i)), buildTree(preorder.slice(i + 1), inorder.slice(i + 1)));
}`,
      py: `def buildTree(preorder, inorder):
    if not preorder:
        return None
    v = preorder[0]
    i = inorder.index(v)
    return TreeNode(v, buildTree(preorder[1:i + 1], inorder[:i]), buildTree(preorder[i + 1:], inorder[i + 1:]))`,
      pitfalls: ['The left subtree takes exactly i values from preorder after the root.'] },
    { name: 'Index map and a moving pointer', idea: 'Store each value’s inorder position in a map. Walk preorder with one pointer, building the left subtree before the right within inorder bounds.',
      time: 'O(n)', space: 'O(n)', why: 'Each value is placed once with an O(1) lookup.',
      js: `function buildTree(preorder, inorder) {
  const at = new Map(inorder.map((v, i) => [v, i]));
  let p = 0;
  const build = (lo, hi) => {
    if (lo > hi) return null;
    const v = preorder[p++], n = new TreeNode(v);
    n.left = build(lo, at.get(v) - 1);
    n.right = build(at.get(v) + 1, hi);
    return n;
  };
  return build(0, inorder.length - 1);
}`,
      py: `def buildTree(preorder, inorder):
    at = {v: i for i, v in enumerate(inorder)}
    p = 0
    def build(lo, hi):
        nonlocal p
        if lo > hi:
            return None
        v = preorder[p]
        p += 1
        n = TreeNode(v)
        n.left = build(lo, at[v] - 1)
        n.right = build(at[v] + 1, hi)
        return n
    return build(0, len(inorder) - 1)`,
      pitfalls: ['Building the right subtree first takes the wrong preorder values.'] }
  ],
  'binary-tree-maximum-path-sum': [
    { name: 'Best path through every node', idea: 'For each node, find the best downward path from its left and right child, and try the path that bends at this node.',
      time: 'O(n²)', space: 'O(h)', why: 'The downward best is recomputed below every node.',
      js: `function maxPathSum(root) {
  const down = (n) => (n ? n.val + Math.max(0, down(n.left), down(n.right)) : 0);
  const best = (n) => (n ? Math.max(n.val + Math.max(0, down(n.left)) + Math.max(0, down(n.right)), best(n.left), best(n.right)) : -Infinity);
  return best(root);
}`,
      py: `def maxPathSum(root):
    def down(n):
        return n.val + max(0, down(n.left), down(n.right)) if n else 0
    def best(n):
        if not n:
            return float('-inf')
        return max(n.val + max(0, down(n.left)) + max(0, down(n.right)), best(n.left), best(n.right))
    return best(root)`,
      pitfalls: ['A path may be a single node, even a negative one.'] },
    { name: 'One walk with gains', idea: 'One post-order walk returns each node’s best downward gain (ignoring negative branches) and records the best path that bends at the node.',
      time: 'O(n)', space: 'O(h)', why: 'Each node once.',
      js: `function maxPathSum(root) {
  let best = -Infinity;
  const gain = (n) => {
    if (!n) return 0;
    const l = Math.max(0, gain(n.left)), r = Math.max(0, gain(n.right));
    best = Math.max(best, n.val + l + r);
    return n.val + Math.max(l, r);
  };
  gain(root);
  return best;
}`,
      py: `def maxPathSum(root):
    best = float('-inf')
    def gain(n):
        nonlocal best
        if not n:
            return 0
        l, r = max(0, gain(n.left)), max(0, gain(n.right))
        best = max(best, n.val + l + r)
        return n.val + max(l, r)
    gain(root)
    return best`,
      pitfalls: ['A node can pass only one branch up to its parent; using both bends the path twice.'] }
  ],
  'find-the-town-judge': [
    { name: 'Check every person', idea: 'For each person, check that they trust nobody and that everyone else trusts them.',
      time: 'O(n · t)', space: 'O(1)', why: 'Each of n people scans all t trust pairs.',
      js: `function findJudge(n, trust) {
  for (let p = 1; p <= n; p++) {
    if (trust.some(([a]) => a === p)) continue;
    if (trust.filter(([a, b]) => b === p && a !== p).length === n - 1) return p;
  }
  return -1;
}`,
      py: `def findJudge(n, trust):
    for p in range(1, n + 1):
        if any(a == p for a, _ in trust):
            continue
        if sum(1 for a, b in trust if b == p) == n - 1:
            return p
    return -1`,
      pitfalls: ['With one person and no trust, that person is the judge.'] },
    { name: 'Trust score', idea: 'Give each person +1 for every person trusting them and -1 for every person they trust. Only the judge reaches n - 1.',
      time: 'O(n + t)', space: 'O(n)', why: 'One pass over the pairs and one over the people.',
      js: `function findJudge(n, trust) {
  const score = new Array(n + 1).fill(0);
  for (const [a, b] of trust) { score[a]--; score[b]++; }
  for (let p = 1; p <= n; p++) if (score[p] === n - 1) return p;
  return -1;
}`,
      py: `def findJudge(n, trust):
    score = [0] * (n + 1)
    for a, b in trust:
        score[a] -= 1
        score[b] += 1
    for p in range(1, n + 1):
        if score[p] == n - 1:
            return p
    return -1`,
      pitfalls: ['People are numbered from 1, so the array needs n + 1 slots.'] }
  ],
  'is-graph-bipartite': [
    { name: 'Try every two-colouring', idea: 'Give each node one of two colours in every possible way and check whether some way has no edge inside one colour.',
      time: 'O(2^V · E)', space: 'O(V)', why: '2^V colourings, each checked against every edge.', slow: true,
      js: `function isBipartite(graph) {
  const n = graph.length;
  for (let mask = 0; mask < 1 << n; mask++) {
    let ok = true;
    for (let a = 0; a < n && ok; a++) for (const b of graph[a]) if (((mask >> a) & 1) === ((mask >> b) & 1)) { ok = false; break; }
    if (ok) return true;
  }
  return false;
}`,
      py: `def isBipartite(graph):
    n = len(graph)
    for mask in range(1 << n):
        if all((mask >> a & 1) != (mask >> b & 1) for a in range(n) for b in graph[a]):
            return True
    return False`,
      pitfalls: ['A graph with no edges is bipartite.'] },
    { name: 'Colour as you search', idea: 'Search each part of the graph, giving every new node the opposite colour of the node it came from. An edge between two nodes of one colour means no split exists.',
      time: 'O(V + E)', space: 'O(V)', why: 'Each node and edge once; one colour per node.',
      js: `function isBipartite(graph) {
  const color = new Array(graph.length).fill(-1);
  for (let s = 0; s < graph.length; s++) {
    if (color[s] >= 0) continue;
    color[s] = 0;
    const q = [s];
    for (let i = 0; i < q.length; i++)
      for (const b of graph[q[i]]) {
        if (color[b] < 0) { color[b] = 1 - color[q[i]]; q.push(b); }
        else if (color[b] === color[q[i]]) return false;
      }
  }
  return true;
}`,
      py: `def isBipartite(graph):
    color = [-1] * len(graph)
    for s in range(len(graph)):
        if color[s] >= 0:
            continue
        color[s] = 0
        q = [s]
        for a in q:
            for b in graph[a]:
                if color[b] < 0:
                    color[b] = 1 - color[a]
                    q.append(b)
                elif color[b] == color[a]:
                    return False
    return True`,
      pitfalls: ['The graph may have several parts; start a search from every uncoloured node.'] }
  ],
  'redundant-connection': [
    { name: 'Remove each edge and test', idea: 'From the last edge backward, remove it and check whether the rest still connects every node; the first that does is the answer.',
      time: 'O(n²)', space: 'O(n)', why: 'For each of n edges, one search over the graph.',
      js: `function findRedundantConnection(edges) {
  const n = edges.length;
  for (let skip = n - 1; skip >= 0; skip--) {
    const g = Array.from({ length: n + 1 }, () => []);
    edges.forEach(([a, b], i) => { if (i !== skip) { g[a].push(b); g[b].push(a); } });
    const seen = new Set([1]), st = [1];
    while (st.length) for (const y of g[st.pop()]) if (!seen.has(y)) { seen.add(y); st.push(y); }
    if (seen.size === n) return edges[skip];
  }
  return [];
}`,
      py: `def findRedundantConnection(edges):
    n = len(edges)
    for skip in range(n - 1, -1, -1):
        g = [[] for _ in range(n + 1)]
        for i, (a, b) in enumerate(edges):
            if i != skip:
                g[a].append(b)
                g[b].append(a)
        seen, st = {1}, [1]
        while st:
            for y in g[st.pop()]:
                if y not in seen:
                    seen.add(y)
                    st.append(y)
        if len(seen) == n:
            return edges[skip]
    return []`,
      pitfalls: ['If several edges work, the last one in the list is wanted.'] },
    { name: 'Union-find, first edge inside a group', idea: 'Join the edges’ towns into groups in order. The first edge whose two towns already share a group closes a loop.',
      time: 'O(n)', space: 'O(n)', why: 'n joins; with path compression each find is close to O(1).',
      js: `function findRedundantConnection(edges) {
  const parent = [...Array(edges.length + 1).keys()];
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  for (const [a, b] of edges) {
    const x = find(a), y = find(b);
    if (x === y) return [a, b];
    parent[x] = y;
  }
  return [];
}`,
      py: `def findRedundantConnection(edges):
    parent = list(range(len(edges) + 1))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    for a, b in edges:
        x, y = find(a), find(b)
        if x == y:
            return [a, b]
        parent[x] = y
    return []`,
      pitfalls: ['The first loop-closing edge is also the last one that works, since a tree plus one edge has one loop.'] }
  ],
  'network-delay-time': [
    { name: 'Relax every road n times', idea: 'Start with time 0 at k and infinity elsewhere. Go over every road n - 1 times, lowering a town’s time when a road gets there sooner.',
      time: 'O(V · E)', space: 'O(V)', why: 'n - 1 rounds over every road.',
      js: `function networkDelayTime(times, n, k) {
  const d = new Array(n + 1).fill(Infinity);
  d[k] = 0;
  for (let r = 1; r < n; r++) for (const [u, v, w] of times) if (d[u] + w < d[v]) d[v] = d[u] + w;
  const worst = Math.max(...d.slice(1));
  return worst === Infinity ? -1 : worst;
}`,
      py: `def networkDelayTime(times, n, k):
    d = [float('inf')] * (n + 1)
    d[k] = 0
    for _ in range(n - 1):
        for u, v, w in times:
            if d[u] + w < d[v]:
                d[v] = d[u] + w
    worst = max(d[1:])
    return -1 if worst == float('inf') else worst`,
      pitfalls: ['Towns are numbered from 1; slot 0 must not count.'] },
    { name: 'Settle the nearest town first', idea: 'Keep a min-heap of (time, town). Pop the soonest town; the first pop is final. Push its roads’ arrival times. The answer is the last town settled.',
      time: 'O(E log V)', space: 'O(V + E)', why: 'Each road pushes once onto a heap.',
      js: `function networkDelayTime(times, n, k) {
  const g = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) g[u].push([v, w]);
  const h = [[0, k]], done = new Map();
  const up = (i) => { while (i && h[(i - 1) >> 1][0] > h[i][0]) { [h[i], h[(i - 1) >> 1]] = [h[(i - 1) >> 1], h[i]]; i = (i - 1) >> 1; } };
  const down = (i) => { for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < h.length && h[l][0] < h[m][0]) m = l; if (r < h.length && h[r][0] < h[m][0]) m = r; if (m === i) return; [h[i], h[m]] = [h[m], h[i]]; i = m; } };
  while (h.length) {
    const [t, u] = h[0], last = h.pop();
    if (h.length) { h[0] = last; down(0); }
    if (done.has(u)) continue;
    done.set(u, t);
    for (const [v, w] of g[u]) if (!done.has(v)) { h.push([t + w, v]); up(h.length - 1); }
  }
  return done.size === n ? Math.max(...done.values()) : -1;
}`,
      py: `def networkDelayTime(times, n, k):
    import heapq
    g = [[] for _ in range(n + 1)]
    for u, v, w in times:
        g[u].append((v, w))
    h, done = [(0, k)], {}
    while h:
        t, u = heapq.heappop(h)
        if u in done:
            continue
        done[u] = t
        for v, w in g[u]:
            if v not in done:
                heapq.heappush(h, (t + w, v))
    return max(done.values()) if len(done) == n else -1`,
      pitfalls: ['A town can be pushed several times; skip it if it was already settled.'] }
  ],
  'min-cost-to-connect-all-points': [
    { name: 'Sort every edge, join groups', idea: 'List every pair with its distance, sort, and join pairs from different groups with union-find until all are joined.',
      time: 'O(n² log n)', space: 'O(n²)', why: 'There are n² pairs to sort.',
      js: `function minCostConnectPoints(points) {
  const n = points.length, edges = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) edges.push([Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]), i, j]);
  edges.sort((a, b) => a[0] - b[0]);
  const parent = [...Array(n).keys()];
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  let cost = 0;
  for (const [w, i, j] of edges) { const a = find(i), b = find(j); if (a !== b) { parent[a] = b; cost += w; } }
  return cost;
}`,
      py: `def minCostConnectPoints(points):
    n = len(points)
    edges = sorted((abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]), i, j) for i in range(n) for j in range(i + 1, n))
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    cost = 0
    for w, i, j in edges:
        a, b = find(i), find(j)
        if a != b:
            parent[a] = b
            cost += w
    return cost`,
      pitfalls: ['One point needs no edges: cost 0.'] },
    { name: 'Grow one tree, cheapest link first', idea: 'Start the tree from point 0. Keep each outside point’s cheapest distance to the tree; add the cheapest point and update the others from it.',
      time: 'O(n²)', space: 'O(n)', why: 'n rounds, each scanning n points; no edge list is stored.',
      js: `function minCostConnectPoints(points) {
  const n = points.length, best = new Array(n).fill(Infinity), inTree = new Array(n).fill(false);
  best[0] = 0;
  let cost = 0;
  for (let k = 0; k < n; k++) {
    let u = -1;
    for (let i = 0; i < n; i++) if (!inTree[i] && (u < 0 || best[i] < best[u])) u = i;
    inTree[u] = true;
    cost += best[u];
    for (let v = 0; v < n; v++)
      if (!inTree[v]) best[v] = Math.min(best[v], Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]));
  }
  return cost;
}`,
      py: `def minCostConnectPoints(points):
    n = len(points)
    best, in_tree = [float('inf')] * n, [False] * n
    best[0], cost = 0, 0
    for _ in range(n):
        u = min((i for i in range(n) if not in_tree[i]), key=lambda i: best[i])
        in_tree[u] = True
        cost += best[u]
        for v in range(n):
            if not in_tree[v]:
                best[v] = min(best[v], abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1]))
    return cost`,
      pitfalls: ['A heap version is O(n² log n) here because every pair is an edge; the plain scan is faster.'] }
  ],
  'cheapest-flights-within-k-stops': [
    { name: 'Search every route', idea: 'Search from src, trying every flight, and stop a route when it uses more than k stops or already costs more than the best found.',
      time: 'O(n^k)', space: 'O(k)', why: 'Each stop can branch to many flights.', slow: true,
      js: `function findCheapestPrice(n, flights, src, dst, k) {
  const g = Array.from({ length: n }, () => []);
  for (const [a, b, p] of flights) g[a].push([b, p]);
  let best = Infinity;
  const go = (u, cost, stops) => {
    if (cost >= best) return;
    if (u === dst) { best = cost; return; }
    if (stops > k) return;
    for (const [v, p] of g[u]) go(v, cost + p, stops + 1);
  };
  go(src, 0, 0);
  return best === Infinity ? -1 : best;
}`,
      py: `def findCheapestPrice(n, flights, src, dst, k):
    g = [[] for _ in range(n)]
    for a, b, p in flights:
        g[a].append((b, p))
    best = [float('inf')]
    def go(u, cost, stops):
        if cost >= best[0]:
            return
        if u == dst:
            best[0] = cost
            return
        if stops > k:
            return
        for v, p in g[u]:
            go(v, cost + p, stops + 1)
    go(src, 0, 0)
    return -1 if best[0] == float('inf') else best[0]`,
      pitfalls: ['k stops means k + 1 flights.'] },
    { name: 'k + 1 rounds of cheaper prices', idea: 'Keep the cheapest price to each city. Do k + 1 rounds; in each, use only last round’s prices to try every flight, so each round adds at most one flight.',
      time: 'O(k · E)', space: 'O(n)', why: 'k + 1 rounds over every flight, with two price lists.',
      js: `function findCheapestPrice(n, flights, src, dst, k) {
  let price = new Array(n).fill(Infinity);
  price[src] = 0;
  for (let r = 0; r <= k; r++) {
    const next = price.slice();
    for (const [a, b, p] of flights) if (price[a] + p < next[b]) next[b] = price[a] + p;
    price = next;
  }
  return price[dst] === Infinity ? -1 : price[dst];
}`,
      py: `def findCheapestPrice(n, flights, src, dst, k):
    price = [float('inf')] * n
    price[src] = 0
    for _ in range(k + 1):
        nxt = price[:]
        for a, b, p in flights:
            if price[a] + p < nxt[b]:
                nxt[b] = price[a] + p
        price = nxt
    return -1 if price[dst] == float('inf') else price[dst]`,
      pitfalls: ['Updating prices in place lets one round chain several flights and break the stop limit.'] }
  ],
  'longest-common-prefix': [
    { name: 'Shrink a guess', idea: 'Start with the first word as the guess and cut letters off the end until every word starts with it.',
      time: 'O(S)', space: 'O(1)', why: 'Each letter is cut or compared a bounded number of times; S is all the letters.',
      js: `function longestCommonPrefix(strs) {
  let p = strs[0] || '';
  for (const w of strs) while (!w.startsWith(p)) p = p.slice(0, -1);
  return p;
}`,
      py: `def longestCommonPrefix(strs):
    p = strs[0] if strs else ''
    for w in strs:
        while not w.startswith(p):
            p = p[:-1]
    return p`,
      pitfalls: ['An empty word in the list makes the answer "".'] },
    { name: 'Column by column', idea: 'Compare the words one letter position at a time and stop at the first position where they differ or a word ends.',
      time: 'O(S)', space: 'O(1)', why: 'Each letter of the common prefix is read once per word.',
      js: `function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  for (let i = 0; i < strs[0].length; i++)
    for (const w of strs) if (i >= w.length || w[i] !== strs[0][i]) return strs[0].slice(0, i);
  return strs[0];
}`,
      py: `def longestCommonPrefix(strs):
    if not strs:
        return ''
    for i, c in enumerate(strs[0]):
        for w in strs:
            if i >= len(w) or w[i] != c:
                return strs[0][:i]
    return strs[0]`,
      pitfalls: ['Stop at the shortest word.'] }
  ],
  'implement-trie-prefix-tree': [
    { name: 'List of words', idea: 'Keep every inserted word in a list; search scans for an exact match and startsWith scans for a prefix.',
      time: 'O(n · L) per call', space: 'O(S)', why: 'Each call may compare with every stored word.',
      js: `class Trie {
  constructor() { this.words = []; }
  insert(word) { this.words.push(word); }
  search(word) { return this.words.includes(word); }
  startsWith(prefix) { return this.words.some((w) => w.startsWith(prefix)); }
}`,
      py: `class Trie:
    def __init__(self):
        self.words = []

    def insert(self, word):
        self.words.append(word)

    def search(self, word):
        return word in self.words

    def startsWith(self, prefix):
        return any(w.startswith(prefix) for w in self.words)`,
      pitfalls: ['search must match a whole word; a prefix is not enough.'] },
    { name: 'Letter tree', idea: 'Store words in a tree with one letter per step down. Words that start alike share branches, and a mark shows where a whole word ends.',
      time: 'O(L) per call', space: 'O(S)', why: 'Each call walks one step per letter; the tree holds every inserted letter at most once.',
      js: `class Trie {
  constructor() { this.root = {}; }
  insert(word) {
    let n = this.root;
    for (const c of word) n = n[c] || (n[c] = {});
    n.end = true;
  }
  find(s) {
    let n = this.root;
    for (const c of s) { n = n[c]; if (!n) return null; }
    return n;
  }
  search(word) { const n = this.find(word); return !!(n && n.end); }
  startsWith(prefix) { return !!this.find(prefix); }
}`,
      py: `class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        n = self.root
        for c in word:
            n = n.setdefault(c, {})
        n['$'] = True

    def _find(self, s):
        n = self.root
        for c in s:
            if c not in n:
                return None
            n = n[c]
        return n

    def search(self, word):
        n = self._find(word)
        return bool(n) and '$' in n

    def startsWith(self, prefix):
        return self._find(prefix) is not None`,
      pitfalls: ['Using a key like "end" that could also be a letter path; pick a key no word letter can be.'] }
  ],
  'design-add-and-search-words-data-structure': [
    { name: 'List of words', idea: 'Keep the words in a list; a search compares with each word of the same length, letting "." match anything.',
      time: 'O(n · L) per call', space: 'O(S)', why: 'A search may compare with every stored word.',
      js: `class WordDictionary {
  constructor() { this.words = []; }
  addWord(word) { this.words.push(word); }
  search(word) {
    return this.words.some((w) => w.length === word.length && [...word].every((c, i) => c === '.' || c === w[i]));
  }
}`,
      py: `class WordDictionary:
    def __init__(self):
        self.words = []

    def addWord(self, word):
        self.words.append(word)

    def search(self, word):
        return any(len(w) == len(word) and all(c == '.' or c == x for c, x in zip(word, w)) for w in self.words)`,
      pitfalls: ['A dot matches exactly one letter, so lengths must be equal.'] },
    { name: 'Letter tree with branching on dots', idea: 'Store words in a letter tree. A search walks it letter by letter; a "." tries every child at that step.',
      time: 'O(L) per call', space: 'O(S)', why: 'Adding and plain searching take one step per letter; only dots branch.',
      js: `class WordDictionary {
  constructor() { this.root = {}; }
  addWord(word) {
    let n = this.root;
    for (const c of word) n = n[c] || (n[c] = {});
    n.$ = true;
  }
  search(word) {
    const go = (n, i) => {
      if (i === word.length) return !!n.$;
      if (word[i] !== '.') return !!n[word[i]] && go(n[word[i]], i + 1);
      return Object.keys(n).some((k) => k !== '$' && go(n[k], i + 1));
    };
    return go(this.root, 0);
  }
}`,
      py: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word):
        n = self.root
        for c in word:
            n = n.setdefault(c, {})
        n['$'] = True

    def search(self, word):
        def go(n, i):
            if i == len(word):
                return '$' in n
            if word[i] != '.':
                return word[i] in n and go(n[word[i]], i + 1)
            return any(go(child, i + 1) for k, child in n.items() if k != '$')
        return go(self.root, 0)`,
      pitfalls: ['Letting a dot step into the end mark as if it were a letter.'] }
  ],
  'number-of-1-bits': [
    { name: 'Read the binary text', idea: 'Write n in binary and count the 1 characters.',
      time: 'O(1)', space: 'O(1)', why: 'At most 32 binary digits.',
      js: `function hammingWeight(n) {
  return n.toString(2).split('').filter((c) => c === '1').length;
}`,
      py: `def hammingWeight(n):
    return bin(n).count('1')`,
      pitfalls: ['It builds a string; a bit trick avoids that.'] },
    { name: 'Clear the lowest 1 bit', idea: 'n & (n - 1) clears the lowest 1 bit. Count how many times you can do it before n is 0.',
      time: 'O(1)', space: 'O(1)', why: 'One step per 1 bit, at most 32.',
      js: `function hammingWeight(n) {
  let count = 0;
  while (n) { n = (n & (n - 1)) >>> 0; count++; }
  return count;
}`,
      py: `def hammingWeight(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
      pitfalls: ['In JavaScript bit operators work on signed 32-bit numbers; >>> 0 keeps them unsigned.'] }
  ],
  'single-number': [
    { name: 'Count with a map', idea: 'Count every value and return the one seen once.',
      time: 'O(n)', space: 'O(n)', why: 'One pass; the map holds about n/2 values.',
      js: `function singleNumber(nums) {
  const c = new Map();
  for (const x of nums) c.set(x, (c.get(x) || 0) + 1);
  for (const [x, k] of c) if (k === 1) return x;
}`,
      py: `def singleNumber(nums):
    c = {}
    for x in nums:
        c[x] = c.get(x, 0) + 1
    return next(x for x, k in c.items() if k == 1)`,
      pitfalls: ['The task asks for O(1) extra space, which a map does not meet.'] },
    { name: 'XOR everything', idea: 'x ^ x is 0 and 0 ^ y is y, so XOR-ing every value cancels the pairs and leaves the single one.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, one number.',
      js: `function singleNumber(nums) {
  return nums.reduce((a, b) => a ^ b, 0);
}`,
      py: `def singleNumber(nums):
    r = 0
    for x in nums:
        r ^= x
    return r`,
      pitfalls: ['Summing and subtracting twice the pairs needs the pairs; XOR does not.'] }
  ],
  'counting-bits': [
    { name: 'Count each number', idea: 'For every number from 0 to n, count its 1 bits on its own.',
      time: 'O(n log n)', space: 'O(1)', why: 'Each number has up to log n bits to count.',
      js: `function countBits(n) {
  const out = [];
  for (let i = 0; i <= n; i++) { let c = 0; for (let x = i; x; x &= x - 1) c++; out.push(c); }
  return out;
}`,
      py: `def countBits(n):
    return [bin(i).count('1') for i in range(n + 1)]`,
      pitfalls: ['The list has n + 1 numbers, starting at 0.'] },
    { name: 'Reuse half the answer', idea: 'i has the same bits as i >> 1, plus its last bit. So bits[i] = bits[i >> 1] + (i & 1).',
      time: 'O(n)', space: 'O(1)', why: 'One step per number; only the answer list is built.',
      js: `function countBits(n) {
  const out = [0];
  for (let i = 1; i <= n; i++) out.push(out[i >> 1] + (i & 1));
  return out;
}`,
      py: `def countBits(n):
    out = [0] * (n + 1)
    for i in range(1, n + 1):
        out[i] = out[i >> 1] + (i & 1)
    return out`,
      pitfalls: ['out[i & (i - 1)] + 1 works too: drop the lowest 1 bit.'] }
  ],
  'missing-number': [
    { name: 'Sort and find the gap', idea: 'After sorting, the first position whose value is not its index is the missing number.',
      time: 'O(n log n)', space: 'O(1)', why: 'The sort sets the time.',
      js: `function missingNumber(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) if (nums[i] !== i) return i;
  return nums.length;
}`,
      py: `def missingNumber(nums):
    nums.sort()
    for i, x in enumerate(nums):
        if x != i:
            return i
    return len(nums)`,
      pitfalls: ['If 0 to n - 1 are all there, the missing one is n.'] },
    { name: 'Expected sum minus actual', idea: '0 + 1 + ... + n is n(n + 1)/2. Subtract the sum of nums to get the missing number.',
      time: 'O(n)', space: 'O(1)', why: 'One pass, one sum.',
      js: `function missingNumber(nums) {
  const n = nums.length;
  return (n * (n + 1)) / 2 - nums.reduce((a, b) => a + b, 0);
}`,
      py: `def missingNumber(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
      pitfalls: ['XOR of all indexes and values also works and never grows large.'] }
  ],
  'palindrome-number': [
    { name: 'Compare the text', idea: 'Write the number as text and compare it with its reverse.',
      time: 'O(log x)', space: 'O(log x)', why: 'The text has one character per digit.',
      js: `function isPalindrome(x) {
  const s = String(x);
  return s === s.split('').reverse().join('');
}`,
      py: `def isPalindrome(x):
    s = str(x)
    return s == s[::-1]`,
      pitfalls: ['A minus sign never matches at the other end, so negatives are false.'] },
    { name: 'Reverse half the digits', idea: 'Pop digits off the end into a reversed number until it is at least what is left. Then the two halves must match (dropping the middle digit for odd lengths).',
      time: 'O(log x)', space: 'O(1)', why: 'Half the digits are moved; two numbers are kept.',
      js: `function isPalindrome(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let rev = 0;
  while (x > rev) { rev = rev * 10 + (x % 10); x = Math.floor(x / 10); }
  return x === rev || x === Math.floor(rev / 10);
}`,
      py: `def isPalindrome(x):
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
    rev = 0
    while x > rev:
        rev = rev * 10 + x % 10
        x //= 10
    return x == rev or x == rev // 10`,
      pitfalls: ['A number ending in 0 (other than 0) can never be a palindrome; the half trick needs that check.'] }
  ],
  'plus-one': [
    { name: 'Through a big number', idea: 'Join the digits into a BigInt, add one, and split it back into digits.',
      time: 'O(n)', space: 'O(n)', why: 'Each digit is read and written once, through a string.',
      js: `function plusOne(digits) {
  return String(BigInt(digits.join('')) + 1n).split('').map(Number);
}`,
      py: `def plusOne(digits):
    return [int(c) for c in str(int(''.join(map(str, digits))) + 1)]`,
      pitfalls: ['Plain numbers lose digits past 2⁵³ in JavaScript.'] },
    { name: 'Carry from the end', idea: 'Walk from the last digit: a 9 turns into 0 and carries on; any other digit goes up by one and you are done. All nines need a new leading 1.',
      time: 'O(n)', space: 'O(1)', why: 'One pass at most; changes happen in place.',
      js: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) { digits[i]++; return digits; }
    digits[i] = 0;
  }
  return [1, ...digits];
}`,
      py: `def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
      pitfalls: ['[9, 9] becomes [1, 0, 0], one digit longer.'] }
  ],
  'roman-to-integer': [
    { name: 'Replace the pairs first', idea: 'Replace each two-letter form like IV or CM with its value, then add up the single letters.',
      time: 'O(n)', space: 'O(n)', why: 'A few passes over the string, with copies.',
      js: `function romanToInt(s) {
  const pairs = { CM: 900, CD: 400, XC: 90, XL: 40, IX: 9, IV: 4 }, one = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  let total = 0;
  for (const [p, v] of Object.entries(pairs)) while (s.includes(p)) { total += v; s = s.replace(p, ''); }
  for (const c of s) total += one[c];
  return total;
}`,
      py: `def romanToInt(s):
    pairs = {'CM': 900, 'CD': 400, 'XC': 90, 'XL': 40, 'IX': 9, 'IV': 4}
    one = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1}
    total = 0
    for p, v in pairs.items():
        total += v * s.count(p)
        s = s.replace(p, '')
    return total + sum(one[c] for c in s)`,
      pitfalls: ['Only the six pairs IV, IX, XL, XC, CD and CM subtract.'] },
    { name: 'Look one letter ahead', idea: 'Walk left to right. A letter smaller than the next one is subtracted; otherwise it is added.',
      time: 'O(n)', space: 'O(1)', why: 'One pass with a fixed table of seven letters.',
      js: `function romanToInt(s) {
  const v = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  let total = 0;
  for (let i = 0; i < s.length; i++) total += i + 1 < s.length && v[s[i]] < v[s[i + 1]] ? -v[s[i]] : v[s[i]];
  return total;
}`,
      py: `def romanToInt(s):
    v = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1}
    total = 0
    for i, c in enumerate(s):
        total += -v[c] if i + 1 < len(s) and v[c] < v[s[i + 1]] else v[c]
    return total`,
      pitfalls: ['Comparing with the previous letter instead of the next one needs a correction step.'] }
  ],
  'powx-n': [
    { name: 'Multiply n times', idea: 'Multiply x by itself |n| times; for a negative n, take one over the result.',
      time: 'O(n)', space: 'O(1)', why: 'One multiplication per unit of n.', slow: true,
      js: `function myPow(x, n) {
  let r = 1;
  for (let i = 0; i < Math.abs(n); i++) r *= x;
  return n < 0 ? 1 / r : r;
}`,
      py: `def myPow(x, n):
    r = 1.0
    for _ in range(abs(n)):
        r *= x
    return 1 / r if n < 0 else r`,
      pitfalls: ['n can be about two billion; this loop is far too slow then.'] },
    { name: 'Square and halve', idea: 'x to the n is (x²) to the n/2, times one more x when n is odd. Halve n each step.',
      time: 'O(log n)', space: 'O(1)', why: 'n halves every step; only a few numbers are kept.',
      js: `function myPow(x, n) {
  if (n < 0) { x = 1 / x; n = -n; }
  let r = 1;
  while (n > 0) {
    if (n % 2 === 1) r *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return r;
}`,
      py: `def myPow(x, n):
    if n < 0:
        x, n = 1 / x, -n
    r = 1.0
    while n:
        if n % 2:
            r *= x
        x *= x
        n //= 2
    return r`,
      pitfalls: ['In JavaScript, n >> 1 breaks for n beyond 32 bits; divide instead.', '-n overflows in languages with 32-bit ints when n is -2³¹.'] }
  ]
};
// Tab names for a list of n approaches.
function approachTiers(n) { return n === 3 ? ['Brute force', 'Better', 'Best'] : ['Brute force', 'Best']; }
if (typeof module !== 'undefined' && module.exports) module.exports = { APPROACHES, approachTiers };
// @@END-APPROACHES@@
