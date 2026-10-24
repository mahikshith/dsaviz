// @@PLANS@@ — generated block (from shared/plans.js), used by the Code and Story pages and tests/plancheck.js.
// "Plan it first": every runnable problem (each code spec and each SQL spec) has a short plan written for DSAMaxxing.
//   goal    one line: input → output
//   steps   4 to 8 plain-English steps, each [text, from, to, kinds?]
//             from, to  the line range of the reference solution this step maps to, as indexes into planRefLines()
//                       (the spec's JavaScript ref split into lines; for SQL, the reference query cut before each clause)
//             kinds     optional, story problems only: the story step kinds ('over|under') this step explains,
//                       so the Story page lights the plan line while the animation plays that step.
// SQL plans walk the clauses in the order the database runs them.
const PLANS = {
  "two-sum-ii": {
    goal: "sorted numbers and a target → the 1-based positions of the two that add up to target",
    steps: [
      ["Put a left marker on the first number and a right marker on the last.",1,1,"intro"],
      ["While the markers have not met, add the two numbers they point at.",2,2,"intro"],
      ["If the sum equals target, return both positions plus one.",2,2,"found"],
      ["If the sum is too big, move the right marker one step left.",2,2,"over"],
      ["If the sum is too small, move the left marker one step right.",2,2,"under"],
      ["If the markers meet with no match, return an empty list.",3,3]
    ]
  },
  "valid-palindrome": {
    goal: "a string → true if its letters and digits read the same both ways",
    steps: [
      ["Decide which characters count: letters and digits only.",1,1],
      ["Put one marker at the start and one at the end.",2,2,"intro"],
      ["Skip any character that does not count, on either side.",4,5,"skipR"],
      ["Compare the two characters, ignoring case; a mismatch means false.",6,6,"match"],
      ["On a match, move both markers inward.",7,7,"match"],
      ["If the markers meet without a mismatch, return true.",9,9,"found"]
    ]
  },
  "container": {
    goal: "plank heights → the most water any two planks can hold",
    steps: [
      ["Put markers on the first and last plank, best = 0.",1,1,"intro"],
      ["While the markers have not met, water = shorter plank x distance.",2,2,"intro"],
      ["Keep the biggest water seen so far.",2,2],
      ["Move the marker on the shorter plank inward; it cannot do better.",2,2,"moveL|moveR"],
      ["When the markers meet, return the best.",3,3,"found"]
    ]
  },
  "longest-substring": {
    goal: "a string → the length of the longest stretch with no repeated character",
    steps: [
      ["Keep a map of where each character was last seen, and a left edge.",1,1,"intro"],
      ["Walk a right edge across the string, one character at a time.",2,2,"grow"],
      ["If this character was seen inside the window, jump left past it.",2,2,"jump"],
      ["Record where this character was seen.",2,2],
      ["The window right - left + 1 is clean; keep the longest.",2,2,"grow"],
      ["Return the longest length.",3,3,"found"]
    ]
  },
  "char-replacement": {
    goal: "capital letters and k repaints → the longest stretch that can become one letter",
    steps: [
      ["Keep a count of letters in the window and the top count.",1,1,"intro"],
      ["Grow the window by one letter on the right.",2,2,"grow"],
      ["Add that letter to the counts and update the top count.",3,3,"grow"],
      ["If window size minus top count is more than k, drop the left letter.",4,4,"slide"],
      ["Keep the biggest window size seen.",5,5],
      ["Return the biggest size.",7,7,"found"]
    ]
  },
  "best-time-stock": {
    goal: "daily prices → the biggest profit from one buy and a later sale",
    steps: [
      ["Track the lowest price so far and the best profit, starting at 0.",1,1,"intro"],
      ["Walk through the prices one day at a time.",2,2],
      ["If today is cheaper than the lowest, it becomes the new lowest.",2,2,"cheaper"],
      ["Selling today earns price minus lowest; keep the best profit.",2,2,"profit"],
      ["Return the best profit.",3,3,"found"]
    ]
  },
  "contains-duplicate": {
    goal: "a list of numbers → true if any value appears twice",
    steps: [
      ["Make an empty set to remember values seen.",0,0,"intro"],
      ["Put every number into the set.",0,0,"add"],
      ["A set keeps one copy of each value, so repeats vanish.",0,0],
      ["If the set is smaller than the list, some value repeated.",0,0,"found"]
    ]
  },
  "two-sum": {
    goal: "numbers and a target → the two indexes whose values add up to target",
    steps: [
      ["Make an empty map from value to its index.",1,1,"intro"],
      ["Walk through the numbers one by one.",2,2],
      ["Work out the partner this number needs: target - number.",2,2],
      ["If the partner is already in the map, return both indexes.",2,2,"found"],
      ["Otherwise store this number and its index in the map.",2,2,"store"],
      ["Return an empty list if no pair is found.",3,3]
    ]
  },
  "valid-anagram": {
    goal: "two words → true if they use the same letters the same number of times",
    steps: [
      ["If the lengths differ, they cannot match.",0,0,"intro"],
      ["Sort the letters of the first word.",0,0,"tally"],
      ["Sort the letters of the second word.",0,0,"cancel"],
      ["Return true if both sorted strings are equal.",0,0,"found"]
    ]
  },
  "min-window": {
    goal: "s and t → the shortest stretch of s holding every letter of t",
    steps: [
      ["Count how many of each letter t needs.",1,1],
      ["Set missing to the length of t and the left edge to 0.",2,2],
      ["Move a right edge along s; a needed letter lowers missing.",3,4],
      ["While nothing is missing, the window covers t.",5,5],
      ["If this window is shorter than the best, remember it.",6,6],
      ["Give back the left letter and move the left edge right.",7,8],
      ["Return the best window, or an empty string if none.",11,11]
    ]
  },
  "longest-palindrome": {
    goal: "a string → its longest stretch that reads the same both ways",
    steps: [
      ["Start with the first letter as the best.",1,1],
      ["Try every position as a centre, both odd and even sized.",2,2],
      ["Spread out from the centre while both ends match.",3,4],
      ["If this palindrome is longer than the best, keep it.",5,5],
      ["Return the best stretch.",7,7]
    ]
  },
  "3sum": {
    goal: "numbers → every different trio that adds up to 0",
    steps: [
      ["Sort a copy of the numbers.",1,1],
      ["Fix each number in turn as the first, skipping repeats.",2,3],
      ["Put markers just after it and at the far end.",4,4],
      ["Add the three numbers.",5,6],
      ["Too small: move the left marker right. Too big: move the right left.",7,7],
      ["Exactly 0: save the trio, move both, skip repeated values.",8,8],
      ["Return all the trios.",11,11]
    ]
  },
  "trapping-rain": {
    goal: "rock heights → how much water sits between them",
    steps: [
      ["Put markers at both ends, track the tallest seen from each side.",1,1],
      ["While the markers have not met, look at the shorter side.",2,2],
      ["Left is shorter: update its tallest, add tallest - height, step in.",3,3],
      ["Right is shorter: do the same on the right, step in.",4,4],
      ["Return the total water.",6,6]
    ]
  },
  "move-zeroes": {
    goal: "a list → the same list with every 0 moved to the end, others in order",
    steps: [
      ["Keep a write spot starting at the front.",1,1],
      ["Read each number from left to right.",2,2],
      ["If it is not 0, swap it into the write spot.",2,2],
      ["Move the write spot one step right after each swap.",2,2],
      ["The zeros end up behind the write spot, at the end.",2,2]
    ]
  },
  "product-except-self": {
    goal: "numbers → for each spot, the product of every other number",
    steps: [
      ["Make an answer list filled with 1s.",1,1,"intro"],
      ["Walk left to right with a running product of everything before.",2,2,"left"],
      ["Store that running product, then multiply in the current number.",2,2,"left"],
      ["Walk right to left with a running product of everything after.",3,3,"right"],
      ["Multiply each answer by that running product.",3,3,"right"],
      ["Return the answers.",4,4,"found"]
    ]
  },
  "subarray-sum-k": {
    goal: "numbers and k → how many unbroken stretches add up to k",
    steps: [
      ["Count running sums seen so far; the empty start (sum 0) counts once.",1,1,"intro"],
      ["Walk through the numbers, adding each to the running sum.",2,2],
      ["A stretch ends here if sum - k was seen before; add how often.",2,2,"hit|miss"],
      ["Record the current running sum in the counts.",2,2],
      ["Return the total count.",3,3,"found"]
    ]
  },
  "binary-search": {
    goal: "sorted numbers and a target → the target's index, or -1",
    steps: [
      ["Set lo to the first index and hi to the last.",1,1,"intro"],
      ["While lo is not past hi, look at the middle.",2,2],
      ["If the middle is the target, return its index.",2,2,"found"],
      ["Middle too small: search the right half, lo = mid + 1.",2,2,"up"],
      ["Middle too big: search the left half, hi = mid - 1.",2,2,"down"],
      ["If the range empties, return -1.",3,3]
    ]
  },
  "search-rotated": {
    goal: "a sorted list cut and swapped, and a target → its index, or -1",
    steps: [
      ["Set lo and hi to the two ends.",1,1,"intro"],
      ["While lo is not past hi, look at the middle.",2,3],
      ["If the middle is the target, return it.",4,4,"found"],
      ["If the left half is in order, check if the target falls inside it.",5,5,"leftOut"],
      ["Inside: keep the left half. Outside: keep the right half.",5,5,"leftOut"],
      ["Otherwise the right half is in order; test it the same way.",6,6,"rightIn"],
      ["If the range empties, return -1.",8,8]
    ]
  },
  "find-min-rotated": {
    goal: "a sorted list cut and swapped → its smallest value",
    steps: [
      ["Set lo and hi to the two ends.",1,1,"intro"],
      ["While lo is before hi, look at the middle.",2,2],
      ["Middle bigger than the last value: the drop is to the right.",2,2,"goRight"],
      ["Otherwise the smallest is at the middle or to its left.",2,2,"goLeft"],
      ["When lo meets hi, that value is the smallest.",3,3,"found"]
    ]
  },
  "rotate-image": {
    goal: "a square grid → the same grid turned a quarter turn clockwise",
    steps: [
      ["Note the size of the grid.",1,1,"intro"],
      ["Swap each cell above the diagonal with its mirror below.",2,2,"swap"],
      ["That flips rows into columns.",2,2],
      ["Reverse every row to finish the clockwise turn.",3,3,"mirror"]
    ]
  },
  "merge-intervals": {
    goal: "meetings as [start, end] → the merged meetings",
    steps: [
      ["Sort the meetings by start time.",1,1,"intro"],
      ["Walk through them in that order.",2,2],
      ["If one starts before the last merged one ends, they overlap.",2,2,"extend|inside"],
      ["Overlap: stretch the last merged end to the later end.",2,2,"extend"],
      ["No overlap: add it as a new merged meeting.",2,2,"add"],
      ["Return the merged list.",3,3,"found"]
    ]
  },
  "insert-interval": {
    goal: "sorted meetings and a new one → the list with it merged in",
    steps: [
      ["Start an empty answer and a pointer at the first meeting.",1,1,"intro"],
      ["Copy every meeting that ends before the new one starts.",2,2,"before"],
      ["While meetings overlap the new one, widen it to cover them.",3,3,"merge"],
      ["Add the widened new meeting.",4,4,"place"],
      ["Copy every meeting that is left.",5,5,"after"],
      ["Return the answer.",6,6,"found"]
    ]
  },
  "jump-game": {
    goal: "jump lengths per stone → true if the last stone can be reached",
    steps: [
      ["Track the farthest stone reachable so far, starting at 0.",1,1,"intro"],
      ["Visit stones left to right.",2,2],
      ["If this stone is past the farthest reach, return false.",2,2,"hold"],
      ["Otherwise stretch the reach to stone + its jump length.",2,2,"grow"],
      ["If the loop ends, every stone was reachable: return true.",3,3,"found"]
    ]
  },
  "subsets": {
    goal: "different numbers → every subset",
    steps: [
      ["Start with a list holding just the empty subset.",1,1,"intro"],
      ["Take the numbers one at a time.",2,2],
      ["Count the subsets you have so far.",2,2],
      ["Copy each one with the new number added on.",2,2,"choose"],
      ["Return all the subsets.",3,3,"done"]
    ]
  },
  "permutations": {
    goal: "different numbers → every ordering of them",
    steps: [
      ["Keep the ordering being built and which numbers are used.",1,1,"intro"],
      ["If the ordering is full, save a copy and go back.",3,3,"done"],
      ["Otherwise try each unused number in the next seat.",4,4,"choose|seat"],
      ["Mark it used, add it, and fill the rest.",4,4,"seat"],
      ["Then take it out and unmark it, to try the next one.",4,4,"undo"],
      ["Start with an empty ordering and return every saved one.",6,7]
    ]
  },
  "combination-sum": {
    goal: "candidate numbers and a target → every combination that adds up to it",
    steps: [
      ["Keep the current combination being built.",1,1,"intro"],
      ["If nothing is left to reach, save a copy.",3,3,"found"],
      ["Try each candidate from the current one onward.",4,4,"choose"],
      ["Skip candidates bigger than what is left.",4,4,"prune"],
      ["Add it and reach for the rest; the same one may be used again.",4,4,"choose"],
      ["Take it back off to try the next candidate.",4,4,"undo"],
      ["Start with the whole target and return every combination.",6,7,"done"]
    ]
  },
  "group-anagrams": {
    goal: "words → groups of words that use the same letters",
    steps: [
      ["Make an empty map from a key to a group of words.",1,1],
      ["For each word, sort its letters to get its key.",2,2],
      ["Words with the same letters share the same key.",2,2],
      ["Add the word to the group for its key, making it if needed.",2,2],
      ["Return all the groups.",3,3]
    ]
  },
  "longest-consecutive": {
    goal: "numbers → the length of the longest run of consecutive values",
    steps: [
      ["Put every number into a set.",1,1],
      ["For each value, check if value - 1 is missing.",2,2],
      ["If it is missing, this value starts a run.",2,2],
      ["Count up while the next value is in the set.",2,2],
      ["Keep the longest run found.",2,2],
      ["Return the longest run.",3,3]
    ]
  },
  "valid-parentheses": {
    goal: "a string of brackets → true if every bracket is closed properly",
    steps: [
      ["Make an empty stack and a map from each closer to its opener.",1,1,"intro"],
      ["Read the brackets one by one.",2,2],
      ["An opening bracket goes on top of the stack.",2,2,"push"],
      ["A closer must match the opener on top; pop it or return false.",2,2,"pop"],
      ["At the end, the stack must be empty.",3,3,"found"]
    ]
  },
  "daily-temperatures": {
    goal: "daily temperatures → days to wait for a warmer one",
    steps: [
      ["Fill the answer with 0s and start an empty stack of days.",1,1,"intro"],
      ["Walk through the days in order.",2,2],
      ["While today is warmer than the day on top of the stack, pop it.",2,2,"pop"],
      ["For that popped day, the wait is today minus that day.",2,2,"pop"],
      ["Push today onto the stack.",2,2,"push"],
      ["Return the answers.",3,3,"found"]
    ]
  },
  "min-stack": {
    goal: "push, pop, top and getMin calls → each call's answer in O(1)",
    steps: [
      ["Keep one stack of pairs: a value and the smallest so far.",1,1],
      ["On push, store the value with the smaller of it and the current min.",2,2],
      ["On pop, remove the top pair.",3,3],
      ["top returns the value of the top pair.",4,4],
      ["getMin returns the min saved in the top pair.",5,5]
    ]
  },
  "kth-largest": {
    goal: "numbers and k → the k-th largest value",
    steps: [
      ["Copy the numbers so the input stays as it is.",0,0,"intro"],
      ["Sort the copy from biggest to smallest.",0,0],
      ["The k-th largest now sits at position k - 1.",0,0],
      ["Return that value.",0,0,"found"]
    ]
  },
  "top-k-frequent": {
    goal: "numbers and k → the k values that appear most often",
    steps: [
      ["Count how often each value appears.",1,1,"intro"],
      ["List the different values.",2,2],
      ["Sort them from most frequent to least.",2,2],
      ["Return the first k of them.",2,2,"found"]
    ]
  },
  "sliding-window-max": {
    goal: "numbers and a window size k → the largest value in each window",
    steps: [
      ["Keep a queue of indexes whose values go from big to small.",1,1],
      ["Walk through the numbers one at a time.",2,2],
      ["Drop indexes from the back whose values are not bigger than this one.",3,3],
      ["Add this index at the back.",4,4],
      ["Drop the front index if it has slid out of the window.",5,5],
      ["Once the window is full, the front holds the max; record it.",6,6],
      ["Return the recorded maximums.",8,8]
    ]
  },
  "reverse-linked-list": {
    goal: "a linked list → the same nodes in reverse order",
    steps: [
      ["Start with prev as nothing and cur at the head.",1,1,"intro"],
      ["While cur exists, save its next node.",2,2],
      ["Point cur back at prev.",2,2,"flip"],
      ["Step forward: prev becomes cur, cur becomes the saved next.",2,2,"flip"],
      ["When cur runs out, prev is the new head.",3,3,"tail|found"]
    ]
  },
  "linked-list-cycle": {
    goal: "the head of a linked list → true if it loops back on itself",
    steps: [
      ["Start a slow and a fast pointer at the head.",1,1,"intro"],
      ["While fast can still take two steps, move on.",2,2],
      ["Slow takes one step and fast takes two.",2,2,"stride"],
      ["If they land on the same node, there is a loop.",2,2,"wrap|found"],
      ["If fast reaches the end, there is no loop.",3,3]
    ]
  },
  "middle-of-list": {
    goal: "the head of a linked list → its middle node",
    steps: [
      ["Start a slow and a fast pointer at the head.",1,1,"intro"],
      ["While fast can take two more steps, keep going.",2,2],
      ["Slow moves one node and fast moves two.",2,2,"stride"],
      ["When fast runs out, slow has gone half as far.",2,2],
      ["Return slow, the middle node.",3,3,"found"]
    ]
  },
  "merge-two-lists": {
    goal: "two sorted linked lists → one sorted list made of their nodes",
    steps: [
      ["Make a dummy start node and a tail pointer on it.",1,1],
      ["While both lists have nodes, compare their fronts.",2,2],
      ["Attach the smaller front to the tail and move that list on.",2,2],
      ["Move the tail onto the node just attached.",2,2],
      ["Attach whatever is left of the other list.",3,3],
      ["Return the node after the dummy.",4,4]
    ]
  },
  "remove-nth": {
    goal: "a linked list and n → the list without its n-th node from the end",
    steps: [
      ["Put a dummy before the head; start lead and trail there.",1,1],
      ["Move lead n steps ahead.",2,2],
      ["Move both together until lead reaches the last node.",3,3],
      ["Now trail sits just before the node to remove.",3,3],
      ["Skip over that node.",4,4],
      ["Return the node after the dummy.",5,5]
    ]
  },
  "merge-k-lists": {
    goal: "k sorted linked lists → one sorted list of all their nodes",
    steps: [
      ["Collect every node from every list.",1,2,"intro|seed"],
      ["Sort the nodes by value.",3,3,"send"],
      ["Link each node to the next one in sorted order.",4,4,"send"],
      ["The last node points to nothing.",4,4,"empty"],
      ["Return the first node, or nothing if there were none.",5,5,"found"]
    ]
  },
  "invert-tree": {
    goal: "a binary tree → its mirror image",
    steps: [
      ["Visit a node; an empty spot means stop.",1,1,"intro|leaf"],
      ["Swap its left and right children.",1,1,"swap"],
      ["Do the same for the new left subtree.",1,1],
      ["Then do the same for the new right subtree.",1,1],
      ["Start at the root and return the root.",2,3,"done"]
    ]
  },
  "max-depth": {
    goal: "a binary tree → the number of nodes on its longest root-to-leaf path",
    steps: [
      ["An empty spot has depth 0.",1,1,"intro|leaf"],
      ["Ask the left child for its depth.",1,1,"ask"],
      ["Ask the right child for its depth.",1,1,"ask"],
      ["This node's depth is 1 + the bigger of the two.",1,1,"report"],
      ["Return the root's depth.",2,2,"done"]
    ]
  },
  "validate-bst": {
    goal: "a binary tree → true if it is a binary search tree",
    steps: [
      ["Give each node a range it must fall inside, open at first.",1,1,"intro"],
      ["An empty spot is always fine.",1,1],
      ["The node's value must sit strictly inside its range.",1,1,"check|fail"],
      ["Going left, the node's value becomes the new upper limit.",1,1,"check"],
      ["Going right, the node's value becomes the new lower limit.",1,1,"check"],
      ["Return the answer for the root with no limits.",2,2,"done"]
    ]
  },
  "level-order": {
    goal: "a binary tree → its values floor by floor",
    steps: [
      ["Start with a row holding just the root, if there is one.",1,1,"intro"],
      ["While the row has nodes, record their values.",2,2,"floor"],
      ["Build the next row from each node's left then right child.",2,2,"visit"],
      ["Move down to the next row.",2,2],
      ["Return the floors.",3,3,"done"]
    ]
  },
  "right-side-view": {
    goal: "a binary tree → the rightmost value on each floor",
    steps: [
      ["Start with a row holding just the root, if there is one.",1,1,"intro"],
      ["While the row has nodes, record the last node's value.",2,2,"seen"],
      ["Build the next row from each node's left then right child.",2,2,"visit"],
      ["Move down to the next row.",2,2],
      ["Return the values seen.",3,3,"done"]
    ]
  },
  "number-of-islands": {
    goal: "a grid of land and water → the number of islands",
    steps: [
      ["Copy the grid and start a count at 0.",1,1,"intro"],
      ["To sink a cell: stop if it is off the map or not land.",2,2],
      ["Otherwise turn it to water and sink its four neighbours.",2,2,"chalk"],
      ["Scan every cell of the grid.",3,3],
      ["On land, add one island and sink the whole island.",3,3,"found"],
      ["Return the count.",4,4,"done"]
    ]
  },
  "rotting-oranges": {
    goal: "a grid of oranges → minutes until none are fresh, or -1",
    steps: [
      ["Copy the grid.",1,1,"intro"],
      ["Queue every rotten orange and count the fresh ones.",2,2,"intro"],
      ["While there are rotten ones to spread from and fresh ones left:",3,3],
      ["Rot each fresh neighbour, count it off and queue it.",5,5,"spread"],
      ["The new rotten ones are next minute's queue; add a minute.",6,6,"spread"],
      ["If any fresh are left, return -1; else the minutes.",8,8,"done"]
    ]
  },
  "clone-graph": {
    goal: "a node of a graph → a deep copy of the whole graph",
    steps: [
      ["Keep a map from each original node to its copy.",1,1,"intro"],
      ["If a node is already copied, return its copy.",3,3,"reuse"],
      ["Otherwise make a new node with the same value and record it.",4,4,"copy"],
      ["Copy each neighbour and link it to the new node.",5,5,"link"],
      ["Copy the starting node, or return nothing for an empty graph.",8,8,"done"]
    ]
  },
  "course-schedule": {
    goal: "courses and prerequisite pairs → true if every course can be taken",
    steps: [
      ["For each course, count its prerequisites and list what it unlocks.",1,1,"intro"],
      ["Fill those from the pairs.",2,2,"intro"],
      ["Queue every course with no prerequisites.",3,3,"seed|free"],
      ["Take a course from the queue and count it as done.",5,5,"take"],
      ["Lower the count of each course it unlocks; at 0, queue it.",5,5,"unlock"],
      ["Return true if every course got done.",6,6,"done"]
    ]
  },
  "word-search": {
    goal: "a letter board and a word → true if the word can be traced",
    steps: [
      ["Copy the board.",1,1],
      ["If every letter is matched, return true.",3,3],
      ["Stop if off the board or the cell is not the next letter.",4,4],
      ["Mark the cell used so it is not reused.",5,5],
      ["Try the next letter up, down, left and right.",6,6],
      ["Put the letter back before going back.",7,7],
      ["Try starting from every cell.",10,10],
      ["If no start works, return false.",11,11]
    ]
  },
  "climbing-stairs": {
    goal: "n steps → how many ways to climb 1 or 2 at a time",
    steps: [
      ["Ways to reach step 0 and step 1 are both 1.",0,0,"intro|base"],
      ["Climb one step at a time up to n.",0,0,"fill"],
      ["Ways to reach a step = ways to the one below + the one two below.",0,0,"fill"],
      ["Keep only the last two counts as you go.",0,0],
      ["Return the count for the top step.",0,0,"done"]
    ]
  },
  "house-robber": {
    goal: "money in each house → the most you can take without two neighbours",
    steps: [
      ["Track two totals: taking the last house, and skipping it.",0,0,"intro"],
      ["Walk through the houses one at a time.",0,0,"first"],
      ["Take this house: the old skip total plus its money.",0,0,"take"],
      ["Skip this house: the better of the old two totals.",0,0,"skip"],
      ["Return the better of the two at the end.",0,0,"done"]
    ]
  },
  "max-subarray": {
    goal: "numbers → the largest sum of any unbroken stretch",
    steps: [
      ["Track the best sum so far and the current stretch sum.",0,0],
      ["Walk through the numbers one at a time.",0,0],
      ["Either extend the current stretch or start fresh at this number.",0,0],
      ["Keep the best current sum seen.",0,0],
      ["Return the best sum.",0,0]
    ]
  },
  "coin-change": {
    goal: "coin values and an amount → the fewest coins that make it, or -1",
    steps: [
      ["Make a table for every amount from 0 up; 0 needs no coins.",1,1,"intro"],
      ["Fill amounts from 1 up to the target.",2,2,"fill"],
      ["For each coin that fits, try 1 + the best for amount - coin.",2,2,"fill"],
      ["Keep the smallest count for each amount.",2,2],
      ["Return the count for the target, or -1 if it was never reached.",3,3,"done"]
    ]
  },
  "lis": {
    goal: "numbers → the length of the longest increasing subsequence",
    steps: [
      ["Keep a list of the smallest possible tail for each length.",1,1],
      ["Take the numbers one at a time.",2,2],
      ["Binary search for the first tail that is not smaller.",2,2],
      ["Replace that tail with this number, or add it at the end.",2,2],
      ["The list's length is the answer.",3,3]
    ]
  },
  "word-break": {
    goal: "a string and a word list → true if it splits into words",
    steps: [
      ["Put the words in a set; the empty start counts as splittable.",1,1],
      ["For each end position, assume it is not splittable yet.",2,2],
      ["Look for a cut point that is splittable before it.",2,2],
      ["The piece after that cut must be a word; if so, mark it true.",2,2],
      ["Return whether the whole string is splittable.",3,3]
    ]
  },
  "unique-paths": {
    goal: "grid height and width → how many right-and-down paths cross it",
    steps: [
      ["Make one row of 1s: the top row has one path per cell.",0,0,"intro|edge"],
      ["Go down one row at a time.",0,0,"side"],
      ["Each cell's paths = the cell above + the cell to its left.",0,0,"fill"],
      ["The row update reuses the same list.",0,0],
      ["Return the last cell of the last row.",0,0,"done"]
    ]
  },
  "reverse-string": {
    goal: "a list of characters → the same list reversed in place",
    steps: [
      ["Put a marker at each end.",0,0],
      ["Swap the two characters under the markers.",0,0],
      ["Move both markers inward.",0,0],
      ["Stop when they meet in the middle.",0,0]
    ]
  },
  "squares-of-a-sorted-array": {
    goal: "sorted numbers that may be negative → their squares, sorted",
    steps: [
      ["Make an answer list and put markers at both ends.",1,1],
      ["Fill the answer from the back, biggest square first.",2,2],
      ["Compare the sizes of the two end numbers, ignoring the sign.",2,2],
      ["Square the bigger one, write it, and move that marker inward.",2,2],
      ["Return the answer.",3,3]
    ]
  },
  "merge-sorted-array": {
    goal: "two sorted lists, the first with room → the first list fully merged",
    steps: [
      ["Point at the last real number of each list and the last slot.",1,1],
      ["While the second list still has numbers, fill the slot.",2,2],
      ["Write whichever of the two pointed numbers is bigger.",2,2],
      ["Move that list's pointer and the slot one step back.",2,2],
      ["Numbers left in the first list are already in place.",2,2]
    ]
  },
  "sort-colors": {
    goal: "a list of 0s, 1s and 2s → the same list sorted in one pass",
    steps: [
      ["Keep three markers: lo for 0s, mid to read, hi for 2s.",1,1],
      ["A small helper swaps two positions.",2,2],
      ["While mid has not passed hi, look at the number at mid.",3,3],
      ["A 0 swaps to lo; move lo and mid on.",3,3],
      ["A 2 swaps to hi; move hi back and check mid again.",3,3],
      ["A 1 is already fine; just move mid on.",3,3]
    ]
  },
  "is-subsequence": {
    goal: "two strings s and t → true if s's letters appear in t in order",
    steps: [
      ["Keep a pointer to the next letter of s to find.",0,0],
      ["Read t one letter at a time.",0,0],
      ["If it matches the next letter of s, move the pointer on.",0,0],
      ["Return true if the pointer reached the end of s.",0,0]
    ]
  },
  "permutation-in-string": {
    goal: "two strings → true if some stretch of s2 is a reshuffle of s1",
    steps: [
      ["Note the length of s1 and its letters in sorted order.",1,1],
      ["Slide a window of that length along s2.",2,2],
      ["Sort the letters inside the window.",2,2],
      ["If they match s1's sorted letters, return true.",2,2],
      ["If no window matches, return false.",3,3]
    ]
  },
  "minimum-size-subarray-sum": {
    goal: "positive numbers and a target → the shortest stretch with sum at least target",
    steps: [
      ["Start a left edge at 0, sum 0, best as infinity.",1,1],
      ["Move a right edge along, adding each number to the sum.",2,2],
      ["While the sum reaches the target, record the window length.",2,2],
      ["Then remove the left number and move the left edge right.",2,2],
      ["Return the best length, or 0 if none was found.",3,3]
    ]
  },
  "find-all-anagrams-in-a-string": {
    goal: "s and p → every start index where a reshuffle of p sits in s",
    steps: [
      ["Note p's length and its letters in sorted order.",1,1],
      ["Slide a window of that length along s.",2,2],
      ["Sort the letters inside the window.",2,2],
      ["If they match p's sorted letters, record the start index.",2,2],
      ["Return the recorded indexes.",3,3]
    ]
  },
  "ransom-note": {
    goal: "a note and a magazine → true if the note can be cut from it",
    steps: [
      ["Count every letter in the magazine.",1,1],
      ["Go through the letters of the note.",2,2],
      ["If the count for a letter is 0, return false.",2,2],
      ["Otherwise use one up.",2,2],
      ["If every letter was found, return true.",3,3]
    ]
  },
  "isomorphic-strings": {
    goal: "two strings → true if one maps letter for letter onto the other",
    steps: [
      ["Keep two maps: s letter to t letter, and t letter to s letter.",1,1],
      ["Walk both strings side by side.",2,2],
      ["If either map already pairs a letter differently, return false.",3,3],
      ["Record the pairing in both maps.",4,4],
      ["If no clash was found, return true.",6,6]
    ]
  },
  "lru-cache": {
    goal: "get and put calls → each answer, dropping the least recently used key",
    steps: [
      ["Keep the capacity and a map that remembers insertion order.",1,1,"intro"],
      ["get: if the key is missing, return -1.",2,2,"miss"],
      ["Otherwise move it to the newest end and return its value.",2,2,"hit"],
      ["put: remove the old entry, then add it at the newest end.",3,3,"put"],
      ["If the cache is too big, delete the oldest key.",3,3,"evict"]
    ]
  },
  "find-pivot-index": {
    goal: "numbers → the first index where left sum equals right sum, or -1",
    steps: [
      ["Add up all the numbers; start a left sum at 0.",1,1],
      ["Visit each index in order.",2,2],
      ["The right sum is total - left sum - this number.",2,2],
      ["If left and right sums match, return this index.",2,2],
      ["Otherwise add this number to the left sum.",2,2],
      ["If none matched, return -1.",3,3]
    ]
  },
  "search-insert-position": {
    goal: "sorted numbers and a target → its index, or where it would go",
    steps: [
      ["Search between lo = 0 and hi = the length.",0,0],
      ["Look at the middle of the range.",0,0],
      ["If the middle is smaller than target, the answer is to its right.",0,0],
      ["Otherwise the answer is at the middle or to its left.",0,0],
      ["When lo meets hi, that is the index.",0,0]
    ]
  },
  "koko-eating-bananas": {
    goal: "banana piles and h hours → the slowest eating speed that finishes",
    steps: [
      ["The speed is somewhere from 1 to the biggest pile.",1,1],
      ["Try the middle speed.",2,2],
      ["Add up the hours: each pile takes pile / speed, rounded up.",2,2],
      ["If that fits in h hours, try slower; otherwise go faster.",2,2],
      ["When the range closes, return that speed.",3,3]
    ]
  },
  "search-a-2d-matrix": {
    goal: "a sorted grid and a target → true if the target is in it",
    steps: [
      ["Treat the grid as one long sorted list of rows x columns.",1,1],
      ["Binary search that list from first to last position.",2,2],
      ["Turn the middle position back into a row and a column.",2,2],
      ["If the value matches, return true; else keep the correct half.",2,2],
      ["If the range empties, return false.",3,3]
    ]
  },
  "spiral-matrix": {
    goal: "a grid → its values in spiral order",
    steps: [
      ["Keep four borders: top, bottom, left and right.",1,1],
      ["While the borders have not crossed, walk one loop.",2,2],
      ["Go along the top row from left to right.",3,3],
      ["Go down the right column.",4,4],
      ["Go back along the bottom row, then up the left column, if any remain.",5,6],
      ["Pull all four borders one step inward.",7,7],
      ["Return the values in the order visited.",9,9]
    ]
  },
  "set-matrix-zeroes": {
    goal: "a grid → the grid with rows and columns of every 0 cleared",
    steps: [
      ["Make a set of rows and a set of columns to clear.",1,1],
      ["Scan every cell; for a 0, note its row and column.",2,2],
      ["Scan again and set any cell in a noted row or column to 0.",3,3],
      ["Doing it in two passes stops new zeros from spreading.",3,3]
    ]
  },
  "non-overlapping-intervals": {
    goal: "intervals → the fewest to remove so the rest do not overlap",
    steps: [
      ["Sort the intervals by end time.",1,1],
      ["Track the end of the last kept interval.",1,1],
      ["Keep an interval if it starts at or after that end.",2,2],
      ["When you keep one, its end becomes the new end.",2,2],
      ["Return how many were not kept.",3,3]
    ]
  },
  "jump-game-ii": {
    goal: "jump lengths per stone → the fewest jumps to the last stone",
    steps: [
      ["Track jumps, the end of the current jump's reach, and the farthest.",1,1],
      ["Visit each stone except the last.",2,2],
      ["Stretch the farthest reach from this stone.",2,2],
      ["When you reach the end of the current jump, take another jump.",2,2],
      ["The new jump reaches as far as the farthest seen.",2,2],
      ["Return the number of jumps.",3,3]
    ]
  },
  "gas-station": {
    goal: "gas and cost per station → the station to start a full loop, or -1",
    steps: [
      ["Track the total gas balance, the tank, and a candidate start.",1,1],
      ["Visit each station, adding gas minus cost to both.",2,2],
      ["If the tank goes negative, no start up to here works.",2,2],
      ["Then try the next station as the start, with an empty tank.",2,2],
      ["If the total is negative, return -1; else the candidate.",3,3]
    ]
  },
  "partition-labels": {
    goal: "a string → the lengths of the most pieces with no letter shared",
    steps: [
      ["Record the last position of every letter.",1,1],
      ["Track where the current piece starts and how far it must reach.",2,2],
      ["Walk the string; stretch the reach to this letter's last spot.",3,3],
      ["When you reach that spot, the piece can close.",3,3],
      ["Record its length and start the next piece after it.",3,3],
      ["Return the lengths.",4,4]
    ]
  },
  "evaluate-reverse-polish-notation": {
    goal: "tokens in postfix order → the value of the expression",
    steps: [
      ["Start an empty stack of numbers.",1,1],
      ["Read the tokens one by one.",2,2],
      ["A number goes onto the stack.",3,3],
      ["An operator takes the top two numbers off.",4,4],
      ["Apply it (division drops the fraction) and push the result.",5,5],
      ["The last number on the stack is the answer.",7,7]
    ]
  },
  "largest-rectangle-in-histogram": {
    goal: "bar heights → the largest rectangle that fits under them",
    steps: [
      ["Keep a stack of bar positions with rising heights.",1,1,"intro"],
      ["Walk the bars, with an extra 0 bar at the end.",2,3],
      ["While the stack top is at least as tall, pop it.",4,4,"pop"],
      ["The popped bar's rectangle spans back to the bar now on top.",4,4,"best"],
      ["Keep the biggest area seen.",4,4,"best"],
      ["Push the current position.",5,5,"push"],
      ["Return the biggest area.",7,7,"done"]
    ]
  },
  "last-stone-weight": {
    goal: "stone weights → the weight of the last stone, or 0",
    steps: [
      ["Copy the stones.",1,1],
      ["While two or more stones are left, sort heaviest first.",2,2],
      ["Take the two heaviest off.",2,2],
      ["If they differ, put back the difference.",2,2],
      ["Return the last stone, or 0 if none is left.",3,3]
    ]
  },
  "k-closest-points-to-origin": {
    goal: "points and k → the k points nearest to (0, 0)",
    steps: [
      ["Copy the points.",0,0],
      ["Work out each point's squared distance: x * x + y * y.",0,0],
      ["Sort the points by that distance.",0,0],
      ["Return the first k points.",0,0]
    ]
  },
  "palindrome-linked-list": {
    goal: "a linked list → true if its values read the same both ways",
    steps: [
      ["Walk the list and collect the values.",0,0],
      ["Make a reversed copy of the values.",0,0],
      ["Compare the two lists.",0,0],
      ["Return true if they are the same.",0,0]
    ]
  },
  "reorder-list": {
    goal: "a linked list → it relinked as first, last, second, second to last...",
    steps: [
      ["Put every node into a list so any one is easy to reach.",1,1],
      ["Put markers at the two ends and keep the last linked node.",2,2],
      ["Take the left node, then the right node, while markers have not crossed.",3,3],
      ["Link each one after the last linked node.",3,3],
      ["Move both markers inward.",3,3],
      ["End the list by pointing the last node to nothing.",4,4]
    ]
  },
  "happy-number": {
    goal: "a number → true if repeated digit squares reach 1",
    steps: [
      ["A helper adds up the squares of a number's digits.",1,1],
      ["Start a slow walker at n and a fast one a step ahead.",2,2],
      ["Until fast reaches 1 or meets slow, keep stepping.",3,3],
      ["Slow takes one step and fast takes two.",3,3],
      ["Return true if fast reached 1; meeting means a loop.",4,4]
    ]
  },
  "find-the-duplicate-number": {
    goal: "n + 1 values from 1 to n → the value that repeats",
    steps: [
      ["Treat each value as a pointer to the next index.",1,1],
      ["Move slow one step and fast two until they meet in the loop.",2,2],
      ["Start slow again from the beginning.",3,3],
      ["Move both one step at a time until they meet again.",3,3],
      ["That meeting point is the repeated value.",4,4]
    ]
  },
  "same-tree": {
    goal: "two binary trees → true if they match in shape and values",
    steps: [
      ["Compare two nodes at the same spot in each tree.",1,1],
      ["If either is empty, they match only if both are empty.",1,1],
      ["Their values must be equal.",1,1],
      ["Their left subtrees must match, and so must their right.",1,1],
      ["Start the check at the two roots.",2,2]
    ]
  },
  "max-area-of-island": {
    goal: "a grid of land and water → the size of the biggest island",
    steps: [
      ["Copy the grid and start the best at 0.",1,1],
      ["To measure a cell: off the map or water counts 0.",2,2],
      ["Otherwise sink it and add 1 plus its four neighbours' sizes.",2,2],
      ["Measure from every cell and keep the biggest result.",3,3],
      ["Return the biggest island.",4,4]
    ]
  },
  "course-schedule-ii": {
    goal: "courses and prerequisite pairs → an order that takes them all",
    steps: [
      ["For each course, count prerequisites and list what it unlocks.",1,1],
      ["Fill those from the pairs.",2,2],
      ["Queue every course with no prerequisites.",3,3],
      ["Take a course from the queue and add it to the order.",4,4],
      ["Lower the count of each course it unlocks; at 0, queue it.",4,4],
      ["Return the order if it holds every course, else an empty list.",5,5]
    ]
  },
  "letter-combinations-of-a-phone-number": {
    goal: "digits → every letter string they could spell",
    steps: [
      ["No digits means no strings.",1,1],
      ["Write down the letters for each digit key.",2,2],
      ["Start with one empty string.",3,3],
      ["For each digit, extend every string with each of its letters.",4,4],
      ["Return the strings.",5,5]
    ]
  },
  "min-cost-climbing-stairs": {
    goal: "cost per step → the cheapest way to get past the top",
    steps: [
      ["The cost to stand at step 0 or step 1 is 0.",0,0],
      ["Go up one step at a time to the top.",0,0],
      ["Reach a step from one below or two below, paying for that step.",0,0],
      ["Keep the cheaper of the two ways.",0,0],
      ["Return the cost for the top.",0,0]
    ]
  },
  "longest-common-subsequence": {
    goal: "two strings → the length of their longest common subsequence",
    steps: [
      ["Make a table with one extra row and column of 0s.",1,1],
      ["Fill it cell by cell for each pair of prefixes.",2,2],
      ["Same letters: one more than the cell up and to the left.",2,2],
      ["Different letters: the bigger of the cell above or to the left.",2,2],
      ["Return the bottom-right cell.",3,3]
    ]
  },
  "decode-ways": {
    goal: "a digit string → how many ways it reads back into letters",
    steps: [
      ["Keep counts for the last two positions; a leading 0 gives 0.",1,1],
      ["Visit each next digit.",2,2],
      ["It can stand alone if it is not 0: add the previous count.",2,2],
      ["With the digit before, 10 to 26 makes a letter: add the older count.",2,2],
      ["Shift the two counts along.",2,2],
      ["Return the last count.",3,3]
    ]
  },
  "edit-distance": {
    goal: "two words → the fewest single-letter edits from one to the other",
    steps: [
      ["The first row: turning nothing into each prefix costs its length.",1,1],
      ["Build each next row, starting with the cost of deleting i letters.",2,3],
      ["Same letters: copy the cost from up and to the left.",4,4],
      ["Different: 1 + the cheapest of replace, delete or insert.",4,4],
      ["The new row becomes the previous row.",5,5],
      ["Return the last cell.",7,7]
    ]
  },
  "partition-equal-subset-sum": {
    goal: "positive numbers → true if they split into two equal-sum groups",
    steps: [
      ["Add them up; an odd total cannot split.",1,1],
      ["Track which sums up to half the total can be made; 0 can.",2,2],
      ["For each number, go from half down to that number.",3,3],
      ["A sum is reachable if sum minus the number already was.",3,3],
      ["Return whether half the total is reachable.",4,4]
    ]
  },
  "diameter-of-binary-tree": {
    goal: "a binary tree → the most edges on any path between two nodes",
    steps: [
      ["Keep the best path length found.",1,1],
      ["A helper returns the height of each subtree.",2,2],
      ["At each node, left height + right height is a path through it.",2,2],
      ["Keep the biggest such path.",2,2],
      ["The node's own height is 1 + the taller side.",2,2],
      ["Run it from the root and return the best.",3,4]
    ]
  },
  "balanced-binary-tree": {
    goal: "a binary tree → true if every node's sides differ by at most 1",
    steps: [
      ["A helper returns a subtree's height, or -1 if it is unbalanced.",1,1],
      ["An empty spot has height 0.",1,1],
      ["Get the heights of both children.",1,1],
      ["If a child failed or they differ by more than 1, return -1.",1,1],
      ["Otherwise return 1 + the taller side.",1,1],
      ["The tree is balanced if the root did not fail.",2,2]
    ]
  },
  "kth-smallest-element-in-a-bst": {
    goal: "a search tree and k → its k-th smallest value",
    steps: [
      ["Walk the tree left, node, right: that visits values in order.",1,1],
      ["Write each value down as you visit it.",1,1],
      ["Start the walk at the root.",2,2],
      ["Return the value at position k - 1.",3,3]
    ]
  },
  "implement-trie-prefix-tree": {
    goal: "insert, search and startsWith calls → each call's answer",
    steps: [
      ["Start with an empty root node.",1,1,"intro"],
      ["insert: walk down letter by letter, making nodes as needed.",2,2,"grow"],
      ["Mark the last node as the end of a word.",2,2,"mark"],
      ["A helper walks down a string and returns its last node, or nothing.",3,3,"walk|look|miss"],
      ["search: true if the walk ends on a node marked as a word end.",4,4,"word"],
      ["startsWith: true if the walk did not fall off.",5,5,"prefix"]
    ]
  },
  "single-number": {
    goal: "numbers that all repeat except one → the one that appears once",
    steps: [
      ["Start with 0.",0,0],
      ["XOR every number into it.",0,0],
      ["A number XORed with itself cancels to 0.",0,0],
      ["What is left is the single number.",0,0]
    ]
  },
  "missing-number": {
    goal: "n different numbers from 0 to n → the missing one",
    steps: [
      ["Start with n.",0,0],
      ["XOR in every index.",0,0],
      ["XOR in every value.",0,0],
      ["Every number present cancels out; the missing one is left.",0,0]
    ]
  },
  "counting-bits": {
    goal: "n → how many 1 bits each number from 0 to n has",
    steps: [
      ["Start the list with 0 for the number 0.",0,0],
      ["Go from 1 up to n.",0,0],
      ["i has the bits of i / 2, plus 1 if i is odd.",0,0],
      ["Push that count.",0,0],
      ["Return the list.",0,0]
    ]
  },
  "palindrome-number": {
    goal: "a whole number → true if it reads the same both ways",
    steps: [
      ["Negative numbers are never palindromes.",0,0],
      ["Build the reverse by peeling off the last digit each time.",0,0],
      ["Add that digit to the reverse, then drop it from the number.",0,0],
      ["Compare the reverse with the original.",0,0]
    ]
  },
  "powx-n": {
    goal: "x and a whole power n → x to the power n",
    steps: [
      ["Work with the size of n and start the result at 1.",1,1],
      ["While the power is above 0, look at its lowest bit.",2,2],
      ["If the bit is 1, multiply the result by the current base.",2,2],
      ["Square the base and halve the power.",2,2],
      ["For a negative power, return 1 divided by the result.",3,3]
    ]
  },
  "reverse-vowels-of-a-string": {
    goal: "a string → it with only the vowels in reverse order",
    steps: [
      ["Split the string and put markers at both ends.",1,1],
      ["While the markers have not met:",2,2],
      ["If the left letter is not a vowel, move left on.",3,3],
      ["If the right letter is not a vowel, move right back.",4,4],
      ["Both are vowels: swap them and move both inward.",5,5],
      ["Join the letters back into a string.",7,7]
    ]
  },
  "sort-array-by-parity": {
    goal: "numbers → the evens first, then the odds",
    steps: [
      ["Pick out the even numbers.",1,1],
      ["Pick out the odd numbers.",1,1],
      ["Put the odd list after the even list.",1,1],
      ["Return the joined list.",1,1]
    ]
  },
  "merge-strings-alternately": {
    goal: "two words → their letters taken in turn",
    steps: [
      ["Start an empty answer.",1,1],
      ["Go up to the length of the longer word.",2,2],
      ["Add the next letter of word1, if it has one.",2,2],
      ["Then add the next letter of word2, if it has one.",2,2],
      ["Return the answer.",3,3]
    ]
  },
  "valid-palindrome-ii": {
    goal: "a string → true if deleting at most one letter makes a palindrome",
    steps: [
      ["A helper checks whether a range reads the same both ways.",1,1],
      ["Put markers at both ends.",2,2],
      ["Walk inward while the letters match.",3,3],
      ["At the first mismatch, try skipping the left or the right letter.",3,3],
      ["If there was no mismatch, return true.",4,4]
    ]
  },
  "backspace-string-compare": {
    goal: "two typed strings with # as backspace → true if they end up equal",
    steps: [
      ["A helper types a string into a stack.",1,1],
      ["A normal letter is pushed.",1,1],
      ["A # pops the last letter, if there is one.",1,1],
      ["Type both strings and compare the results.",2,2]
    ]
  },
  "boats-to-save-people": {
    goal: "weights and a limit → the fewest two-seat boats for everyone",
    steps: [
      ["Sort the weights; put markers on the lightest and heaviest.",1,1],
      ["While anyone is left, the heaviest gets a boat.",2,2],
      ["If the lightest fits too, they share it.",2,2],
      ["Count each boat.",2,2],
      ["Return the count.",3,3]
    ]
  },
  "3sum-closest": {
    goal: "numbers and a target → the sum of three closest to target",
    steps: [
      ["Sort a copy and start with the first three as the best.",1,1],
      ["Fix each number in turn as the first of the three.",2,2],
      ["Put markers after it and at the end; add the three.",3,5],
      ["If this sum is closer to target, keep it.",6,6],
      ["Too small: move left on. Too big: move right back. Exact: return it.",7,7],
      ["Return the closest sum.",10,10]
    ]
  },
  "next-permutation": {
    goal: "numbers → the next larger ordering, in place",
    steps: [
      ["From the right, find the first number smaller than the one after it.",1,2],
      ["If found, find the rightmost number bigger than it.",3,3],
      ["Swap those two numbers.",3,3],
      ["Reverse everything after the first spot.",4,4],
      ["With no such spot, the whole list reverses to the smallest.",4,4]
    ]
  },
  "maximum-average-subarray-i": {
    goal: "numbers and k → the largest average of k neighbours",
    steps: [
      ["Add up the first k numbers.",1,1],
      ["That sum is the best so far.",2,2],
      ["Slide the window right: add the new number, drop the old one.",3,3],
      ["Keep the biggest sum.",3,3],
      ["Return the best sum divided by k.",4,4]
    ]
  },
  "contains-duplicate-ii": {
    goal: "numbers and k → true if equal values sit at most k apart",
    steps: [
      ["Keep a map of where each value was last seen.",1,1],
      ["Walk through the numbers.",2,2],
      ["If this value was seen within k positions, return true.",2,2],
      ["Record this position as its last spot.",2,2],
      ["Return false if no pair was close enough.",3,3]
    ]
  },
  "minimum-difference-between-highest-and-lowest-of-k-scores": {
    goal: "scores and k → the smallest gap between the highest and lowest of k",
    steps: [
      ["Sort a copy of the scores.",1,1],
      ["Any k neighbours in sorted order are the tightest choice.",2,2],
      ["For each group, the gap is its last minus its first.",2,2],
      ["Keep the smallest gap.",2,2],
      ["Return it.",3,3]
    ]
  },
  "maximum-number-of-vowels-in-a-substring-of-given-length": {
    goal: "a string and k → the most vowels in any k letters in a row",
    steps: [
      ["A helper says 1 for a vowel, 0 otherwise.",1,1],
      ["Walk the string, adding each letter's vowel score.",2,2],
      ["Once past k letters, take off the letter leaving the window.",2,2],
      ["Keep the biggest count.",2,2],
      ["Return it.",3,3]
    ]
  },
  "maximum-points-you-can-obtain-from-cards": {
    goal: "card points and k → the best total of k cards from the two ends",
    steps: [
      ["Start by taking the first k cards from the left.",1,2],
      ["That total is the best so far.",3,3],
      ["One at a time, swap a left card for a card from the right end.",4,4],
      ["Keep the best total after each swap.",4,4],
      ["Return the best.",5,5]
    ]
  },
  "subarray-product-less-than-k": {
    goal: "positive numbers and k → how many stretches have product below k",
    steps: [
      ["If k is 1 or less, nothing can be below it.",1,1],
      ["Track the product, a left edge and the count.",2,2],
      ["Move a right edge along, multiplying in each number.",3,3],
      ["While the product is too big, divide out the left number.",3,3],
      ["Every stretch ending here and starting at or after left counts.",3,3],
      ["Return the count.",4,4]
    ]
  },
  "max-consecutive-ones-iii": {
    goal: "0s and 1s and k flips → the longest run of 1s you can make",
    steps: [
      ["Track the left edge, zeros in the window, and the best.",1,1],
      ["Move a right edge along; count a zero when you meet one.",2,2],
      ["While there are more than k zeros, move left and drop its zero.",2,2],
      ["Keep the longest window.",2,2],
      ["Return it.",3,3]
    ]
  },
  "longest-subarray-of-1s-after-deleting-one-element": {
    goal: "0s and 1s → the longest run of 1s after deleting one element",
    steps: [
      ["Track the left edge, zeros in the window, and the best.",1,1],
      ["Move a right edge along; count a zero when you meet one.",2,2],
      ["While there are two zeros, move left and drop its zero.",2,2],
      ["The window minus one deleted element is a run of 1s; keep the best.",2,2],
      ["Return it.",3,3]
    ]
  },
  "fruit-into-baskets": {
    goal: "fruit kinds per tree → the most fruit using two baskets",
    steps: [
      ["Count fruit kinds in the window, with a left edge.",1,1],
      ["Move a right edge along, adding its fruit kind.",2,3],
      ["While there are more than two kinds, drop fruit from the left.",4,4],
      ["Keep the biggest window.",5,5],
      ["Return it.",7,7]
    ]
  },
  "subarrays-with-k-different-integers": {
    goal: "numbers and k → how many stretches have exactly k different values",
    steps: [
      ["A helper counts stretches with at most m different values.",1,1],
      ["Move a right edge along, counting values in the window.",3,4],
      ["While too many different values, drop from the left.",5,5],
      ["Every stretch ending here from left onward counts.",6,6],
      ["Exactly k = at most k minus at most k - 1.",10,10]
    ]
  },
  "find-the-difference-of-two-arrays": {
    goal: "two lists → values only in the first, and values only in the second",
    steps: [
      ["Turn each list into a set of its values.",1,1],
      ["Keep values of the first set missing from the second.",2,2],
      ["Keep values of the second set missing from the first.",2,2],
      ["Return the two lists.",2,2]
    ]
  },
  "first-unique-character-in-a-string": {
    goal: "a string → the index of its first character that appears once",
    steps: [
      ["Count every character.",1,1],
      ["Walk the string again from the start.",2,2],
      ["Return the first index whose character has count 1.",2,2],
      ["If none, return -1.",3,3]
    ]
  },
  "maximum-number-of-balloons": {
    goal: "text → how many times \"balloon\" can be spelled",
    steps: [
      ["Count every letter in the text.",1,1],
      ["A helper reads a count, 0 if missing.",2,2],
      ["l and o are needed twice, so halve their counts.",3,3],
      ["The answer is the smallest of the b, a, l, o and n counts.",3,3]
    ]
  },
  "intersection-of-two-arrays": {
    goal: "two lists → the values found in both, once each",
    steps: [
      ["Put the second list's values in a set.",0,0],
      ["Take the different values of the first list.",0,0],
      ["Keep those that are in the set.",0,0],
      ["Return them.",0,0]
    ]
  },
  "number-of-good-pairs": {
    goal: "numbers → how many pairs of equal values there are",
    steps: [
      ["Count how often each value has appeared so far.",0,0],
      ["Walk through the numbers.",0,0],
      ["This number pairs with every earlier copy: add that count.",0,0],
      ["Then add one to its count.",0,0],
      ["Return the total.",0,0]
    ]
  },
  "unique-number-of-occurrences": {
    goal: "numbers → true if no two values appear equally often",
    steps: [
      ["Count how often each value appears.",0,0],
      ["Put those counts into a set.",0,0],
      ["Repeated counts collapse in the set.",0,0],
      ["True if the set is as big as the number of values.",0,0]
    ]
  },
  "word-pattern": {
    goal: "a pattern and words → true if letters and words pair one to one",
    steps: [
      ["Split the words.",1,1],
      ["Different lengths cannot match.",2,2],
      ["Keep maps both ways: letter to word and word to letter.",3,3],
      ["If either map clashes with this pair, return false.",5,6],
      ["Record the pair both ways.",7,7],
      ["If no clash was found, return true.",9,9]
    ]
  },
  "majority-element": {
    goal: "numbers with one value in more than half → that value",
    steps: [
      ["Keep a candidate and a vote count.",0,0],
      ["When the count is 0, the next number becomes the candidate.",0,0],
      ["Same as the candidate: add a vote. Different: take one away.",0,0],
      ["The majority value survives all the cancelling.",0,0],
      ["Return the candidate.",0,0]
    ]
  },
  "determine-if-two-strings-are-close": {
    goal: "two words → true if swaps and letter trades turn one into the other",
    steps: [
      ["Different lengths can never match.",1,1],
      ["Count the letters of each word.",2,3],
      ["Both words must use the same set of letters.",4,4],
      ["Their sorted counts must be the same list.",5,5],
      ["Return true only if both checks pass.",6,6]
    ]
  },
  "valid-sudoku": {
    goal: "a 9 x 9 board → true if no digit repeats in a row, column or box",
    steps: [
      ["Keep one set of everything seen.",1,1],
      ["Visit every filled cell.",2,3],
      ["Make three keys: its row, its column and its 3 x 3 box, with the digit.",4,4],
      ["If any key was seen before, return false.",5,5],
      ["Record all three keys.",6,6],
      ["If no repeat was found, return true.",8,8]
    ]
  },
  "first-missing-positive": {
    goal: "numbers → the smallest positive whole number not in them",
    steps: [
      ["Copy the list.",1,1],
      ["Swap each value from 1 to n into its own slot: value v at v - 1.",2,2],
      ["Walk the slots; the first one without its own value is the answer.",3,3],
      ["If every slot is right, the answer is n + 1.",4,4]
    ]
  },
  "equal-row-and-column-pairs": {
    goal: "a square grid → how many row and column pairs are identical",
    steps: [
      ["Count each row, written as a key.",1,1],
      ["Start the total at 0.",2,2],
      ["For each column, build the same kind of key.",3,3],
      ["Add how many rows share that key.",3,3],
      ["Return the total.",4,4]
    ]
  },
  "4sum-ii": {
    goal: "four lists → how many picks of one from each add up to 0",
    steps: [
      ["Count every sum of a value from list 1 and list 2.",1,1],
      ["For each value from list 3 and list 4, add them.",2,2],
      ["Add how many first-half sums cancel it out.",2,2],
      ["Return the total.",3,3]
    ]
  },
  "running-sum-of-1d-array": {
    goal: "numbers → the running total at each position",
    steps: [
      ["Start a total at 0.",0,0],
      ["Walk through the numbers.",0,0],
      ["Add each number to the total.",0,0],
      ["Write down the total at each step.",0,0]
    ]
  },
  "find-the-highest-altitude": {
    goal: "gains per leg → the highest altitude reached",
    steps: [
      ["Start at altitude 0, which is also the best so far.",0,0],
      ["Walk through the legs.",0,0],
      ["Add each gain to the altitude.",0,0],
      ["Keep the highest altitude.",0,0],
      ["Return it.",0,0]
    ]
  },
  "find-the-middle-index-in-array": {
    goal: "numbers → the first index with equal sums on both sides, or -1",
    steps: [
      ["Add up all the numbers; start a left sum at 0.",1,1],
      ["Visit each index in order.",2,2],
      ["The right sum is total - left sum - this number.",2,2],
      ["If both sides match, return this index.",2,2],
      ["Otherwise add this number to the left sum.",2,2],
      ["If none matched, return -1.",3,3]
    ]
  },
  "range-sum-query-immutable": {
    goal: "numbers, then sumRange calls → each range's sum, fast",
    steps: [
      ["Build running totals once, starting with 0.",1,1],
      ["Entry i holds the sum of the first i numbers.",1,1],
      ["A range sum is the total up to right + 1 minus the total up to left.",2,2],
      ["Each call is one subtraction.",2,2]
    ]
  },
  "contiguous-array": {
    goal: "0s and 1s → the longest stretch with as many 0s as 1s",
    steps: [
      ["Count 1 as +1 and 0 as -1; note where each sum first appeared.",1,1],
      ["Walk the list, updating the running sum.",2,2],
      ["If this sum appeared before, the part since then is balanced.",2,2],
      ["Keep the longest such part.",2,2],
      ["Otherwise record where this sum first appeared.",2,2],
      ["Return the longest.",3,3]
    ]
  },
  "continuous-subarray-sum": {
    goal: "numbers and k → true if some stretch of 2+ sums to a multiple of k",
    steps: [
      ["Record where each remainder first appeared; remainder 0 at -1.",1,1],
      ["Walk the list, keeping the running sum's remainder by k.",2,3],
      ["Same remainder seen before: the part between is a multiple of k.",4,4],
      ["If that part has at least 2 numbers, return true.",4,4],
      ["Otherwise record the first spot for a new remainder.",4,4],
      ["Return false if none was found.",6,6]
    ]
  },
  "subarray-sums-divisible-by-k": {
    goal: "numbers and k → how many stretches have a sum divisible by k",
    steps: [
      ["Count running-sum remainders; remainder 0 starts at 1.",1,1],
      ["Walk the list, keeping a remainder that is never negative.",2,2],
      ["Each earlier equal remainder makes one stretch: add the count.",2,2],
      ["Add one to this remainder's count.",2,2],
      ["Return the total.",3,3]
    ]
  },
  "corporate-flight-bookings": {
    goal: "bookings and n flights → total seats on each flight",
    steps: [
      ["Make a list of changes, one per flight plus one.",1,1],
      ["For each booking, add seats at its first flight.",2,2],
      ["Take them off again just after its last flight.",2,2],
      ["Walk the flights with a running total of the changes.",3,4],
      ["The running total at each flight is its seat count.",5,5]
    ]
  },
  "sqrtx": {
    goal: "a non-negative number → its square root rounded down",
    steps: [
      ["The answer is between 0 and x.",1,1],
      ["Try the middle, rounding up.",2,2],
      ["If middle x middle fits under x, the answer is at least middle.",2,2],
      ["Otherwise it is below middle.",2,2],
      ["When the range closes, return it.",3,3]
    ]
  },
  "find-smallest-letter-greater-than-target": {
    goal: "sorted letters and a target → the first letter after target",
    steps: [
      ["Search between the start and the end of the list.",1,1],
      ["If the middle letter is not after target, look right.",2,2],
      ["Otherwise the answer is at the middle or to its left.",2,2],
      ["If we ran off the end, wrap around to the first letter.",3,3]
    ]
  },
  "find-first-and-last-position-of-element-in-sorted-array": {
    goal: "sorted numbers and a target → its first and last index",
    steps: [
      ["A helper finds the first index with a value at least t.",1,1],
      ["Find the first spot for target.",2,2],
      ["If it is off the end or not target, return [-1, -1].",3,3],
      ["The last spot is one before the first spot for target + 1.",4,4]
    ]
  },
  "peak-index-in-a-mountain-array": {
    goal: "a list that rises then falls → the index of the top",
    steps: [
      ["Search the whole list.",1,1],
      ["Look at the middle and the one after it.",2,2],
      ["Still rising: the peak is to the right.",2,2],
      ["Falling: the peak is at the middle or to its left.",2,2],
      ["When the range closes, that is the peak.",3,3]
    ]
  },
  "find-peak-element": {
    goal: "numbers → the index of any value bigger than its neighbours",
    steps: [
      ["Search the whole list.",1,1],
      ["Look at the middle and the one after it.",2,2],
      ["Uphill to the right: a peak must lie to the right.",2,2],
      ["Downhill: a peak is at the middle or to its left.",2,2],
      ["When the range closes, return it.",3,3]
    ]
  },
  "single-element-in-a-sorted-array": {
    goal: "sorted pairs plus one single value → the single value",
    steps: [
      ["Search the whole list.",1,1],
      ["Pick the middle, moved back to an even index.",2,2],
      ["If it matches the next value, the pairs are intact: go right.",2,2],
      ["Otherwise the single one is at the middle or to its left.",2,2],
      ["When the range closes, return that value.",3,3]
    ]
  },
  "capacity-to-ship-packages-within-d-days": {
    goal: "package weights and days → the smallest ship that makes it in time",
    steps: [
      ["A helper counts the days a given capacity needs.",1,1],
      ["The capacity is between the heaviest package and the total.",2,2],
      ["Try the middle capacity.",3,3],
      ["If it fits in the days, try smaller; otherwise go bigger.",3,3],
      ["When the range closes, return it.",4,4]
    ]
  },
  "minimum-number-of-days-to-make-m-bouquets": {
    goal: "bloom days, m and k → the first day m bouquets can be made, or -1",
    steps: [
      ["If there are too few flowers, it is impossible.",1,1],
      ["A helper checks a day: count runs of k bloomed flowers in a row.",2,2],
      ["The answer is between the first and the last bloom day.",3,3],
      ["Try the middle day; if it works, try earlier, else later.",4,4],
      ["When the range closes, return that day.",5,5]
    ]
  },
  "time-based-key-value-store": {
    goal: "set and get calls with times → the latest value at or before a time",
    steps: [
      ["Keep a map from key to a list of [time, value] pairs.",1,1],
      ["set: add the pair to the end; times only grow, so it stays sorted.",2,2],
      ["get: take the list for the key.",4,4],
      ["Binary search for the first time after the asked time.",5,5],
      ["The pair just before it is the answer, or \"\" if there is none.",6,6]
    ]
  },
  "split-array-largest-sum": {
    goal: "numbers and k → the smallest possible largest part sum",
    steps: [
      ["A helper counts the parts needed if no part may pass a cap.",1,1],
      ["The cap is between the biggest number and the total.",2,2],
      ["Try the middle cap; if k parts are enough, try smaller.",3,3],
      ["Otherwise the cap must grow.",3,3],
      ["When the range closes, return it.",4,4]
    ]
  },
  "median-of-two-sorted-arrays": {
    goal: "two sorted lists → the median of all their numbers",
    steps: [
      ["Make sure the first list is the shorter one.",1,2],
      ["Search how many numbers to take from the shorter list.",3,3],
      ["Take the rest of the left half from the longer list.",5,5],
      ["Look at the values on each side of both cuts.",6,6],
      ["If the cuts are in order, the median comes from those edges.",7,7],
      ["Otherwise move the cut left or right.",8,8]
    ]
  },
  "transpose-matrix": {
    goal: "a grid → the grid flipped over its main diagonal",
    steps: [
      ["The answer has one row per column of the grid.",0,0],
      ["For each column index, walk down every row.",0,0],
      ["Collect that column's values into a new row.",0,0],
      ["Return the new rows.",0,0]
    ]
  },
  "reshape-the-matrix": {
    goal: "a grid and a new size r x c → the values poured into the new shape",
    steps: [
      ["Flatten the grid into one list, row by row.",1,1],
      ["If r x c does not match the count, return the grid as it is.",2,2],
      ["Cut the list into r rows of c values.",3,3],
      ["Return the new grid.",4,4]
    ]
  },
  "matrix-diagonal-sum": {
    goal: "a square grid → the sum of both diagonals",
    steps: [
      ["Start the sum at 0.",1,1],
      ["For each row i, add the cell at column i.",2,2],
      ["Also add the cell at column n - 1 - i.",2,2],
      ["Skip that second cell when it is the same centre cell.",2,2],
      ["Return the sum.",3,3]
    ]
  },
  "pascals-triangle": {
    goal: "a number of rows → the first rows of the triangle",
    steps: [
      ["Start with the row [1].",1,1],
      ["Build each new row from the row above.",2,2],
      ["It starts with 1.",2,2],
      ["Each middle value is the two values above it added together.",2,2],
      ["It ends with 1.",2,2],
      ["Return all the rows.",3,3]
    ]
  },
  "count-negative-numbers-in-a-sorted-matrix": {
    goal: "a grid sorted large to small → how many values are negative",
    steps: [
      ["Start a count at 0.",0,0],
      ["Visit every row.",0,0],
      ["Look at each value in the row.",0,0],
      ["Count it if it is below 0.",0,0],
      ["Return the count.",0,0]
    ]
  },
  "spiral-matrix-ii": {
    goal: "n → an n x n grid filled 1 to n x n in spiral order",
    steps: [
      ["Make an n x n grid of 0s.",1,1],
      ["Keep four borders and the next number to write.",2,2],
      ["Keep going until every number is written.",3,3],
      ["Fill the top row left to right, then drop the top border.",4,5],
      ["Fill the right column downward, then pull the right border in.",6,7],
      ["Fill the bottom row back, then the left column up, tightening both.",8,11],
      ["Return the grid.",13,13]
    ]
  },
  "game-of-life": {
    goal: "a board of live and dead cells → the next step, in place",
    steps: [
      ["Keep a copy of the old board so all cells change at once.",1,1],
      ["Visit every cell.",2,2],
      ["Count its live neighbours in the old board.",3,4],
      ["Exactly 3 neighbours: alive.",5,5],
      ["Alive with exactly 2: stays alive. Anything else: dead.",5,5]
    ]
  },
  "summary-ranges": {
    goal: "sorted numbers → the fewest ranges that cover them, as text",
    steps: [
      ["Start an empty list of ranges.",1,1],
      ["Take a start value, then walk on while the next number is one more.",2,3],
      ["One number writes just \"a\"; a run writes \"a->b\".",4,4],
      ["Continue from the number after the run.",2,2],
      ["Return the ranges.",6,6]
    ]
  },
  "minimum-number-of-arrows-to-burst-balloons": {
    goal: "balloon spans → the fewest arrows that burst them all",
    steps: [
      ["Sort the balloons by where they end.",1,1],
      ["Track where the last arrow was shot.",1,1],
      ["If a balloon starts after that spot, it needs a new arrow.",2,2],
      ["Shoot the new arrow at that balloon's end.",2,2],
      ["Return the arrow count.",3,3]
    ]
  },
  "interval-list-intersections": {
    goal: "two sorted lists of intervals → every overlap between them",
    steps: [
      ["Start a pointer in each list.",1,1],
      ["While both lists have intervals:",2,2],
      ["The overlap runs from the later start to the earlier end.",3,3],
      ["If that range is not empty, record it.",4,4],
      ["Move on in the list whose interval ends first.",5,5],
      ["Return the overlaps.",7,7]
    ]
  },
  "car-pooling": {
    goal: "trips and a capacity → true if the car is never too full",
    steps: [
      ["Turn each trip into a pick-up event and a drop-off event.",1,2],
      ["Sort the events by place, drop-offs before pick-ups.",3,3],
      ["Walk the events, adding and removing passengers.",4,4],
      ["If the load goes over capacity, return false.",4,4],
      ["Otherwise return true.",5,5]
    ]
  },
  "my-calendar-i": {
    goal: "book calls → true if each booking fits without overlap",
    steps: [
      ["Keep a list of booked events.",1,1],
      ["To book, look at every event already booked.",2,2],
      ["They overlap if each starts before the other ends; refuse it.",3,3],
      ["Otherwise add the new event.",4,4],
      ["Return true.",5,5]
    ]
  },
  "remove-covered-intervals": {
    goal: "intervals → how many are left after removing covered ones",
    steps: [
      ["Sort by start, and by end from long to short for equal starts.",1,1],
      ["Track the farthest end seen so far.",1,1],
      ["An interval ending beyond that is not covered: count it.",2,2],
      ["Stretch the farthest end to it.",2,2],
      ["Return the count.",3,3]
    ]
  },
  "assign-cookies": {
    goal: "greed of children and cookie sizes → the most happy children",
    steps: [
      ["Sort both lists from small to large.",1,1],
      ["Walk the cookies from smallest.",2,2],
      ["If a cookie satisfies the least greedy waiting child, give it.",2,2],
      ["Move on to the next child after each happy one.",2,2],
      ["Return how many children are happy.",3,3]
    ]
  },
  "lemonade-change": {
    goal: "bills paid in order → true if every customer gets correct change",
    steps: [
      ["Count the 5 and 10 bills you hold.",1,1],
      ["A 5 needs no change; keep it.",3,3],
      ["A 10 needs one 5 back.",4,4],
      ["A 20 prefers a 10 and a 5 back.",5,5],
      ["Otherwise it takes three 5s.",6,6],
      ["If you cannot make change, return false.",7,7],
      ["If everyone was served, return true.",9,9]
    ]
  },
  "can-place-flowers": {
    goal: "a flowerbed and n → true if n more flowers fit with no neighbours",
    steps: [
      ["Copy the bed and start a count.",1,1],
      ["Walk every plot.",2,2],
      ["If it and both neighbours are empty, plant here.",2,2],
      ["Count each new flower.",2,2],
      ["Return true if the count reached n.",3,3]
    ]
  },
  "split-a-string-in-balanced-strings": {
    goal: "a string of L and R → the most balanced pieces",
    steps: [
      ["Keep a balance: L adds 1, R takes 1 away.",0,0],
      ["Walk the string letter by letter.",0,0],
      ["Whenever the balance is 0, a piece can end here.",0,0],
      ["Count those moments.",0,0],
      ["Return the count.",0,0]
    ]
  },
  "maximum-units-on-a-truck": {
    goal: "box types and a truck size → the most units it can carry",
    steps: [
      ["Sort the box types by units per box, most first.",1,1],
      ["Track the space left on the truck.",1,1],
      ["Take as many boxes of each type as will fit.",2,2],
      ["Add their units and use up the space.",2,2],
      ["Return the total units.",3,3]
    ]
  },
  "best-time-to-buy-and-sell-stock-ii": {
    goal: "daily prices → the most profit from many buys and sales",
    steps: [
      ["Start the profit at 0.",0,0],
      ["Look at each day next to the day before.",0,0],
      ["If the price went up, take that rise as profit.",0,0],
      ["Price drops are skipped.",0,0],
      ["Return the total profit.",0,0]
    ]
  },
  "minimum-add-to-make-parentheses-valid": {
    goal: "a string of brackets → the fewest brackets to add to balance it",
    steps: [
      ["Count open brackets waiting and closers that had no partner.",0,0],
      ["An opening bracket adds one waiting.",0,0],
      ["A closer uses up a waiting one, if there is one.",0,0],
      ["Otherwise it needs an added opener.",0,0],
      ["Return the added openers plus the openers still waiting.",0,0]
    ]
  },
  "increasing-triplet-subsequence": {
    goal: "numbers → true if three of them rise in order",
    steps: [
      ["Keep the smallest value seen (a) and the smallest second value (b).",1,1],
      ["Walk through the numbers.",2,2],
      ["Not bigger than a: it becomes the new a.",2,2],
      ["Bigger than a but not b: it becomes the new b.",2,2],
      ["Bigger than both: a rising trio exists, return true.",2,2],
      ["Otherwise return false.",3,3]
    ]
  },
  "hand-of-straights": {
    goal: "cards and a group size → true if they split into runs of that size",
    steps: [
      ["If the count does not divide evenly, return false.",1,1],
      ["Count each card value.",2,2],
      ["Go through the values from smallest.",3,3],
      ["Skip a value whose count is already used up.",4,4],
      ["Each copy starts a run: the next values must have at least as many.",5,5],
      ["Use them up; if one is short, return false.",5,5],
      ["If every run worked, return true.",7,7]
    ]
  },
  "valid-parenthesis-string": {
    goal: "brackets and stars → true if some choice of stars balances it",
    steps: [
      ["Track the lowest and highest number of open brackets possible.",1,1],
      ["Read each character.",2,2],
      ["( raises both, ) lowers both, * lowers lo and raises hi.",3,3],
      ["If even the highest goes below 0, return false.",4,4],
      ["The lowest can never go below 0.",5,5],
      ["Balanced if the lowest can end at 0.",7,7]
    ]
  },
  "task-scheduler": {
    goal: "tasks and a cooldown n → the fewest time units to run them all",
    steps: [
      ["Count each task letter.",1,1],
      ["Find the biggest count, and how many letters share it.",2,2],
      ["The busiest letter needs (top - 1) gaps of n + 1 units.",3,3],
      ["Add one slot for each letter tied for the top.",3,3],
      ["The answer is that, or the task count if it is bigger.",3,3]
    ]
  },
  "candy": {
    goal: "ratings in a line → the fewest candies that obey the rules",
    steps: [
      ["Give every child 1 candy.",1,1],
      ["Left to right: higher than the left neighbour means one more.",2,2],
      ["Right to left: higher than the right neighbour means at least one more.",3,3],
      ["Keep the bigger of the two counts.",3,3],
      ["Add up all the candies.",4,4]
    ]
  },
  "merge-triplets-to-form-target-triplet": {
    goal: "triplets and a target → true if merging some gives the target",
    steps: [
      ["Track which of the three target values have been matched.",1,1],
      ["Skip any triplet with a value over the target; it would spoil it.",2,2],
      ["From the safe triplets, mark every place that equals the target.",2,2],
      ["True if all three places were matched.",3,3]
    ]
  },
  "baseball-game": {
    goal: "score operations → the sum of the final scores",
    steps: [
      ["Keep a stack of scores.",1,1],
      ["\"+\": push the sum of the last two.",3,3],
      ["\"D\": push double the last one.",4,4],
      ["\"C\": remove the last one.",5,5],
      ["A number: push it.",6,6],
      ["Return the sum of the stack.",8,8]
    ]
  },
  "remove-all-adjacent-duplicates-in-string": {
    goal: "a string → it after removing equal neighbour pairs again and again",
    steps: [
      ["Keep a stack of letters.",0,0],
      ["Read each letter.",0,0],
      ["If it equals the top letter, pop the top: the pair is gone.",0,0],
      ["Otherwise push it.",0,0],
      ["Join the stack into the answer.",0,0]
    ]
  },
  "make-the-string-great": {
    goal: "a string → it after removing letter pairs that differ only by case",
    steps: [
      ["Keep a stack of characters.",1,1],
      ["Read each character and look at the top.",2,2],
      ["Same letter in different case: pop the top.",2,2],
      ["Otherwise push the character.",2,2],
      ["Join the stack into the answer.",3,3]
    ]
  },
  "next-greater-element-i": {
    goal: "a subset and a list → each value's next bigger value, or -1",
    steps: [
      ["Map each value to its next bigger value; keep a stack.",1,1],
      ["Walk the big list.",2,2],
      ["While this value beats the top of the stack, that top's answer is it.",2,2],
      ["Push this value.",2,2],
      ["Look up each value of the subset, or -1.",3,3]
    ]
  },
  "implement-queue-using-stacks": {
    goal: "queue calls → each call's answer, using only two stacks",
    steps: [
      ["Keep an in stack and an out stack.",1,1],
      ["push: put the value on the in stack.",3,3],
      ["When out is empty, pour everything from in to out.",2,2],
      ["Pouring flips the order, so the oldest ends on top.",2,2],
      ["pop and peek take or read the top of out.",4,5],
      ["empty: true when both stacks are empty.",6,6]
    ]
  },
  "removing-stars-from-a-string": {
    goal: "a string with stars → it after each star removes a letter",
    steps: [
      ["Keep a stack of letters.",0,0],
      ["Read each character.",0,0],
      ["A star pops the last letter.",0,0],
      ["A letter is pushed.",0,0],
      ["Join the stack into the answer.",0,0]
    ]
  },
  "simplify-path": {
    goal: "a Unix path → its simplest form",
    steps: [
      ["Keep a stack of folder names.",1,1],
      ["Split the path at every slash.",2,2],
      ["\"..\" pops a folder, if there is one.",2,2],
      ["Empty parts and \".\" are skipped.",2,2],
      ["Any other name is pushed.",2,2],
      ["Join the stack with slashes after one leading slash.",3,3]
    ]
  },
  "decode-string": {
    goal: "encoded text like 3[ab] → the decoded string",
    steps: [
      ["Keep a stack, the text being built, and the number being read.",1,1],
      ["A digit adds to the number.",3,3],
      ["[ saves the text and number on the stack and starts fresh.",4,4],
      ["] pops them and adds the inner text repeated that many times.",5,5],
      ["A letter adds to the current text.",6,6],
      ["Return the text.",8,8]
    ]
  },
  "asteroid-collision": {
    goal: "moving asteroids → those left after all collisions",
    steps: [
      ["Keep a stack of survivors.",1,1],
      ["Take each asteroid, alive for now.",2,3],
      ["While it moves left and the top moves right, they crash.",4,4],
      ["A smaller top explodes; a bigger one destroys the newcomer.",6,6],
      ["Equal sizes both explode.",6,6],
      ["If it survives, push it.",8,8],
      ["Return the stack.",10,10]
    ]
  },
  "car-fleet": {
    goal: "target, positions and speeds → how many fleets arrive",
    steps: [
      ["Work out each car's arrival time; sort cars nearest the target first.",1,1],
      ["Track the fleet count and the slowest time ahead.",2,2],
      ["A car that would arrive later than the fleet ahead starts a new fleet.",3,3],
      ["Otherwise it catches up and joins.",3,3],
      ["Return the fleet count.",4,4]
    ]
  },
  "basic-calculator-ii": {
    goal: "an expression with + - * / → its value",
    steps: [
      ["Keep a stack of terms, the number being read and the last operator.",1,1],
      ["Digits build up the number.",4,4],
      ["Spaces are skipped.",5,5],
      ["At an operator or the end, apply the last operator to the number.",6,6],
      ["+ and - push it; * and / combine it with the top.",6,6],
      ["Remember the new operator and reset the number.",7,7],
      ["Add up the stack.",9,9]
    ]
  },
  "longest-valid-parentheses": {
    goal: "brackets → the length of the longest balanced stretch",
    steps: [
      ["Keep a stack of positions, starting with -1 as a base.",1,1],
      ["( pushes its position.",3,3],
      [") pops; if the stack empties, this position becomes the new base.",4,4],
      ["Otherwise the stretch since the top is balanced; keep the longest.",4,4],
      ["Return the longest.",6,6]
    ]
  },
  "online-stock-span": {
    goal: "prices one day at a time → each day's span",
    steps: [
      ["Keep a stack of [price, span] pairs.",1,1],
      ["Today's span starts at 1.",3,3],
      ["Pop every earlier price that is not above today, adding its span.",4,4],
      ["Push today's price and span.",5,5],
      ["Return the span.",6,6]
    ]
  },
  "next-greater-element-ii": {
    goal: "a circular list → each value's next bigger value, or -1",
    steps: [
      ["Fill the answers with -1 and keep a stack of positions.",1,1],
      ["Walk the list twice to cover the wrap around.",2,2],
      ["While this value beats the top position's value, set that answer.",2,2],
      ["Push positions only on the first lap.",2,2],
      ["Return the answers.",3,3]
    ]
  },
  "remove-k-digits": {
    goal: "a number and k → the smallest number after removing k digits",
    steps: [
      ["Keep a stack of digits.",1,1],
      ["For each digit, pop bigger digits before it while k lasts.",2,2],
      ["Push the digit.",2,2],
      ["If removals are left, take them off the end.",3,3],
      ["Strip leading zeros.",4,4],
      ["Return the number, or \"0\" if nothing is left.",5,5]
    ]
  },
  "final-prices-with-a-special-discount-in-a-shop": {
    goal: "prices → what you pay for each item after the discount",
    steps: [
      ["Copy the prices and keep a stack of waiting positions.",1,1],
      ["Walk the prices.",2,2],
      ["While this price is at most the top's price, it is the top's discount.",2,2],
      ["Subtract it and pop.",2,2],
      ["Push this position.",2,2],
      ["Return the prices paid.",3,3]
    ]
  },
  "132-pattern": {
    goal: "numbers → true if some i < j < k has nums[i] < nums[k] < nums[j]",
    steps: [
      ["Keep a stack and the best \"middle\" value (third), starting very low.",1,1],
      ["Walk from the right end to the left.",2,2],
      ["If this number is below third, a pattern exists.",3,3],
      ["Pop smaller values; the last one popped becomes third.",4,4],
      ["Push this number.",5,5],
      ["Return false if nothing was found.",7,7]
    ]
  },
  "sum-of-subarray-minimums": {
    goal: "numbers → the sum of the minimum of every stretch, mod 1e9+7",
    steps: [
      ["For each number, count how far it can reach left and right as minimum.",1,1],
      ["Left pass with a stack: pop bigger values to find the left reach.",2,2],
      ["Right pass with a stack: pop values not smaller to find the right reach.",4,4],
      ["Each number is the minimum of left x right stretches.",6,6],
      ["Add number x left x right, keeping it under the modulus.",6,6],
      ["Return the total.",7,7]
    ]
  },
  "kth-largest-element-in-a-stream": {
    goal: "k, starting scores, then add calls → the k-th largest after each add",
    steps: [
      ["Keep the top k scores, sorted from biggest.",1,1],
      ["To add, find where the new score fits.",3,3],
      ["Insert it there.",4,4],
      ["If there are more than k, drop the smallest.",5,5],
      ["Return the k-th score.",6,6]
    ]
  },
  "the-k-weakest-rows-in-a-matrix": {
    goal: "a soldier grid and k → the k weakest row indexes",
    steps: [
      ["For each row, count its soldiers and keep its index.",1,1],
      ["Sort by soldier count, then by index.",1,1],
      ["Keep the first k rows.",1,1],
      ["Return their indexes.",1,1]
    ]
  },
  "take-gifts-from-the-richest-pile": {
    goal: "gift piles and k seconds → gifts left after k seconds",
    steps: [
      ["Copy the piles.",1,1],
      ["Repeat k times.",2,2],
      ["Find the biggest pile.",2,2],
      ["Leave the square root of it, rounded down.",2,2],
      ["Add up what is left.",3,3]
    ]
  },
  "top-k-frequent-words": {
    goal: "words and k → the k most frequent words",
    steps: [
      ["Count each word.",1,1],
      ["Sort the words by count, biggest first.",2,2],
      ["Break ties in alphabetical order.",2,2],
      ["Return the first k words.",2,2]
    ]
  },
  "sort-characters-by-frequency": {
    goal: "a string → its characters grouped, most frequent first",
    steps: [
      ["Count each character.",1,1],
      ["Sort the characters from most to least frequent.",2,2],
      ["Repeat each character by its count.",2,2],
      ["Join them into the answer.",2,2]
    ]
  },
  "find-median-from-data-stream": {
    goal: "numbers added one by one → the median after each findMedian",
    steps: [
      ["Keep all numbers in a sorted list.",1,1],
      ["addNum: find where the number fits and insert it there.",2,2],
      ["findMedian with an odd count: return the middle number.",3,3],
      ["With an even count: return the mean of the middle two.",3,3]
    ]
  },
  "reorganize-string": {
    goal: "a string → its letters with no equal neighbours, or \"\"",
    steps: [
      ["Count each letter.",1,1],
      ["Order the letters from most to least frequent.",2,2],
      ["If one letter fills more than half, it cannot work.",3,3],
      ["Prepare an empty answer and start at slot 0.",4,4],
      ["Place letters in every other slot: 0, 2, 4, then 1, 3, 5.",5,5],
      ["Join the slots.",6,6]
    ]
  },
  "remove-duplicates-from-sorted-list": {
    goal: "a sorted linked list → it with each value once",
    steps: [
      ["Walk the list from the head.",1,1],
      ["If the next node has the same value, skip over it.",1,1],
      ["Otherwise move on to the next node.",1,1],
      ["Return the head.",2,2]
    ]
  },
  "convert-binary-number-in-a-linked-list-to-integer": {
    goal: "a list of bits → the number they spell",
    steps: [
      ["Start with value 0.",0,0],
      ["Walk the list from the head.",0,0],
      ["Shift left: value x 2, then add this bit.",0,0],
      ["Return the value.",0,0]
    ]
  },
  "remove-linked-list-elements": {
    goal: "a linked list and a value → it without nodes holding that value",
    steps: [
      ["Put a dummy node before the head.",1,1],
      ["Look at the node after the current one.",2,2],
      ["If it holds the value, skip over it.",2,2],
      ["Otherwise move on.",2,2],
      ["Return the node after the dummy.",3,3]
    ]
  },
  "add-two-numbers": {
    goal: "two numbers as reversed digit lists → their sum as a list",
    steps: [
      ["Make a dummy start, a tail and a carry of 0.",1,1],
      ["While either list has digits or there is a carry:",2,2],
      ["Add the two digits and the carry; the new carry is sum / 10.",3,3],
      ["Attach a node with sum mod 10.",4,4],
      ["Move each list on, if it has more.",5,6],
      ["Return the node after the dummy.",8,8]
    ]
  },
  "odd-even-linked-list": {
    goal: "a linked list → its odd-position nodes then its even ones",
    steps: [
      ["An empty list stays empty.",1,1],
      ["Start an odd chain at the head and an even chain at the second.",2,2],
      ["Link each odd node to the next odd one.",3,3],
      ["Link each even node to the next even one.",3,3],
      ["Attach the even chain after the odd chain.",4,4],
      ["Return the head.",5,5]
    ]
  },
  "partition-list": {
    goal: "a linked list and x → nodes below x first, order kept",
    steps: [
      ["Start two chains with dummy heads: low and high.",1,1],
      ["Walk the list.",2,2],
      ["Add each node to the low chain if below x, else to the high one.",2,2],
      ["End the high chain and attach it after the low chain.",3,3],
      ["Return the low chain's first node.",4,4]
    ]
  },
  "sort-list": {
    goal: "a linked list → it sorted, in O(n log n)",
    steps: [
      ["A list of 0 or 1 nodes is already sorted.",2,2],
      ["Find the middle with slow and fast pointers.",3,4],
      ["Cut the list in two halves.",5,5],
      ["Sort each half the same way.",6,6],
      ["Merge the two sorted halves by taking the smaller front.",7,7],
      ["Attach the rest and return the merged list.",8,9]
    ]
  },
  "swap-nodes-in-pairs": {
    goal: "a linked list → it with every two neighbours swapped",
    steps: [
      ["Put a dummy before the head and a pointer on it.",1,1],
      ["While two nodes follow, call them a and b.",2,2],
      ["Point a past b, point b at a, point the pointer at b.",2,2],
      ["Move the pointer onto a, now second.",2,2],
      ["Return the node after the dummy.",3,3]
    ]
  },
  "reverse-linked-list-ii": {
    goal: "a list and positions left, right → it with that part reversed",
    steps: [
      ["Put a dummy before the head.",1,1],
      ["Walk to the node just before position left.",2,2],
      ["The first node of the part will end up last.",3,3],
      ["Again and again, move the node after it to the front of the part.",4,4],
      ["Return the node after the dummy.",5,5]
    ]
  },
  "rotate-list": {
    goal: "a linked list and k → it rotated right by k",
    steps: [
      ["An empty list stays empty.",1,1],
      ["Walk to the tail, counting the nodes.",2,3],
      ["Only k mod length matters; 0 means no change.",4,4],
      ["Walk to the node before the new head.",5,5],
      ["Cut there and link the old tail to the old head.",6,6],
      ["Return the new head.",7,7]
    ]
  },
  "reverse-nodes-in-k-group": {
    goal: "a list and k → it reversed k nodes at a time",
    steps: [
      ["Put a dummy before the head.",1,1],
      ["Check that k more nodes exist.",3,3],
      ["If not, stop: the rest stays as it is.",4,4],
      ["Reverse the group by moving each next node to its front.",6,6],
      ["The old first node is now last; continue after it.",7,7],
      ["Return the node after the dummy.",9,9]
    ]
  },
  "maximum-twin-sum-of-a-linked-list": {
    goal: "a list of even length → the largest sum of a twin pair",
    steps: [
      ["Copy the values into a list.",1,1],
      ["Pair the first with the last, the second with the second last...",2,2],
      ["Add each pair.",2,2],
      ["Keep the biggest sum.",2,2],
      ["Return it.",3,3]
    ]
  },
  "delete-the-middle-node-of-a-linked-list": {
    goal: "a linked list → it without its middle node",
    steps: [
      ["A one-node list becomes empty.",1,1],
      ["Start slow at the head and fast two nodes ahead.",2,2],
      ["Move slow one and fast two until fast runs out.",3,3],
      ["Now slow is just before the middle.",3,3],
      ["Skip over the middle node.",4,4],
      ["Return the head.",5,5]
    ]
  },
  "binary-tree-inorder-traversal": {
    goal: "a binary tree → its values in inorder",
    steps: [
      ["Make an empty answer list.",0,0],
      ["Visit a node: stop at an empty spot.",0,0],
      ["Visit the left subtree first.",0,0],
      ["Then write down the node's value.",0,0],
      ["Then visit the right subtree.",0,0]
    ]
  },
  "binary-tree-preorder-traversal": {
    goal: "a binary tree → its values in preorder",
    steps: [
      ["Make an empty answer list.",0,0],
      ["Visit a node: stop at an empty spot.",0,0],
      ["Write down the node's value first.",0,0],
      ["Then visit the left subtree.",0,0],
      ["Then visit the right subtree.",0,0]
    ]
  },
  "binary-tree-postorder-traversal": {
    goal: "a binary tree → its values in postorder",
    steps: [
      ["Make an empty answer list.",0,0],
      ["Visit a node: stop at an empty spot.",0,0],
      ["Visit the left subtree.",0,0],
      ["Then visit the right subtree.",0,0],
      ["Then write down the node's value last.",0,0]
    ]
  },
  "merge-two-binary-trees": {
    goal: "two binary trees → one tree with values added where they overlap",
    steps: [
      ["If one tree has no node here, use the other one's node.",1,1],
      ["Where both have a node, add the second value into the first.",1,1],
      ["Merge the left children the same way.",1,1],
      ["Merge the right children the same way.",1,1],
      ["Return the merged root.",2,2]
    ]
  },
  "univalued-binary-tree": {
    goal: "a binary tree → true if every node holds the same value",
    steps: [
      ["Remember the root's value.",0,0],
      ["An empty spot is fine.",0,0],
      ["Each node must hold that value.",0,0],
      ["Its left and right subtrees must pass too.",0,0]
    ]
  },
  "symmetric-tree": {
    goal: "a binary tree → true if it mirrors itself",
    steps: [
      ["Compare two nodes that should mirror each other.",1,1],
      ["If either is empty, both must be.",1,1],
      ["Their values must match.",1,1],
      ["Outer children must mirror, and inner children must mirror.",1,1],
      ["Start with the root's left and right children.",2,2]
    ]
  },
  "path-sum": {
    goal: "a tree and a target → true if a root-to-leaf path adds up to it",
    steps: [
      ["An empty spot has no path.",1,1],
      ["Take this node's value off the target.",1,1],
      ["At a leaf, check whether nothing is left.",1,1],
      ["Otherwise ask the left or the right child.",1,1],
      ["Start at the root with the full target.",2,2]
    ]
  },
  "subtree-of-another-tree": {
    goal: "a tree and a small tree → true if the small tree appears inside",
    steps: [
      ["A helper checks if two trees are exactly the same.",1,1],
      ["At each node, check whether the tree from here equals the small one.",2,2],
      ["If not, look in the left subtree, then the right.",2,2],
      ["Start at the root.",3,3]
    ]
  },
  "leaf-similar-trees": {
    goal: "two trees → true if their leaves read the same left to right",
    steps: [
      ["Walk a tree left to right, collecting leaf values.",1,1],
      ["A leaf has no children.",1,1],
      ["Collect the leaves of both trees.",2,2],
      ["Compare the two lists.",2,2]
    ]
  },
  "sum-of-left-leaves": {
    goal: "a binary tree → the sum of its left leaves",
    steps: [
      ["Walk the tree, telling each child if it is a left child.",1,1],
      ["An empty spot adds 0.",1,1],
      ["A leaf adds its value only if it is a left child.",1,1],
      ["Otherwise add up both children's answers.",1,1],
      ["Start at the root, which is not a left child.",2,2]
    ]
  },
  "binary-tree-paths": {
    goal: "a binary tree → every root-to-leaf path as text",
    steps: [
      ["Start an empty list of paths.",1,1],
      ["Walk down, adding each value to the path text with \"->\".",2,2],
      ["At a leaf, save the path.",2,2],
      ["Keep going into both children.",2,2],
      ["Start at the root and return the paths.",3,4]
    ]
  },
  "search-in-a-binary-search-tree": {
    goal: "a search tree and a value → the node holding it, or nothing",
    steps: [
      ["Start at the root.",0,0],
      ["Stop when the node is empty or holds the value.",0,0],
      ["A smaller value is to the left; go left.",0,0],
      ["A bigger value is to the right; go right.",0,0],
      ["Return the node reached.",0,0]
    ]
  },
  "range-sum-of-bst": {
    goal: "a search tree, low and high → the sum of values in the range",
    steps: [
      ["An empty spot adds 0.",1,1],
      ["Below low: only the right side can be in range.",1,1],
      ["Above high: only the left side can be in range.",1,1],
      ["In range: add the value and both sides.",1,1],
      ["Start at the root.",2,2]
    ]
  },
  "minimum-absolute-difference-in-bst": {
    goal: "a search tree → the smallest gap between any two values",
    steps: [
      ["Track the previous value seen and the best gap.",1,1],
      ["Walk the tree in order, so values come sorted.",2,2],
      ["The gap to the previous value is a candidate; keep the smallest.",2,2],
      ["Remember this value as the previous one.",2,2],
      ["Start at the root and return the best gap.",3,4]
    ]
  },
  "path-sum-ii": {
    goal: "a tree and a target → every root-to-leaf path with that sum",
    steps: [
      ["Keep the answer list and the current path.",1,1],
      ["Add this node to the path and take its value off the target.",3,3],
      ["At a leaf with nothing left, save a copy of the path.",4,4],
      ["Explore both children.",5,5],
      ["Take this node back off the path when done.",5,5],
      ["Start at the root and return the paths.",7,8]
    ]
  },
  "sum-root-to-leaf-numbers": {
    goal: "a tree of digits → the sum of the numbers its paths spell",
    steps: [
      ["An empty spot adds 0.",1,1],
      ["Add this digit to the number: number x 10 + digit.",1,1],
      ["At a leaf, the number is complete.",1,1],
      ["Otherwise add up both children's totals.",1,1],
      ["Start at the root with 0.",2,2]
    ]
  },
  "count-good-nodes-in-binary-tree": {
    goal: "a binary tree → how many nodes are the biggest on their path",
    steps: [
      ["Carry the biggest value seen on the way down.",1,1],
      ["An empty spot adds 0.",1,1],
      ["A node at least that big is good.",1,1],
      ["Update the biggest and add up both children.",1,1],
      ["Start at the root with no biggest yet.",2,2]
    ]
  },
  "path-sum-iii": {
    goal: "a tree and a target → how many downward paths add up to it",
    steps: [
      ["Count running sums on the current path; the empty start counts once.",1,1],
      ["Add this node's value to the running sum.",3,3],
      ["Paths ending here: how often sum - target was seen above.",4,4],
      ["Record this running sum before going down.",5,5],
      ["Add the counts from both children.",6,6],
      ["Remove this sum again on the way back up.",7,7],
      ["Start at the root with sum 0.",10,10]
    ]
  },
  "lowest-common-ancestor-of-a-binary-search-tree": {
    goal: "a search tree and two values → their lowest common ancestor",
    steps: [
      ["Start at the root.",1,1],
      ["Both values smaller than the node: go left.",2,2],
      ["Both bigger: go right.",2,2],
      ["Otherwise they split here, so this node is the answer.",2,2],
      ["Return nothing if the tree runs out.",3,3]
    ]
  },
  "lowest-common-ancestor-of-a-binary-tree": {
    goal: "a tree and two values → their lowest common ancestor",
    steps: [
      ["An empty spot or a node holding p or q returns itself.",2,2],
      ["Search the left and the right subtree.",3,3],
      ["Found on both sides: this node is the answer.",4,4],
      ["Otherwise pass up whichever side found something.",4,4],
      ["Start at the root and return the value found.",6,7]
    ]
  },
  "insert-into-a-binary-search-tree": {
    goal: "a search tree and a value → the tree with the value added",
    steps: [
      ["Make the new node.",1,1],
      ["An empty tree becomes just the new node.",2,2],
      ["Walk down from the root.",3,4],
      ["Smaller goes left, bigger goes right.",5,5],
      ["At an empty child spot, attach the new node there.",5,5],
      ["Return the root.",7,7]
    ]
  },
  "flatten-binary-tree-to-linked-list": {
    goal: "a binary tree → it flattened into a right-only chain in preorder",
    steps: [
      ["Walk down the chain of right children.",1,1],
      ["If a node has a left subtree, find its rightmost node.",2,2],
      ["Hang the node's right subtree after that rightmost node.",2,2],
      ["Move the left subtree to the right side.",2,2],
      ["Clear the left child.",2,2]
    ]
  },
  "construct-binary-tree-from-preorder-and-inorder-traversal": {
    goal: "preorder and inorder walks → the tree they came from",
    steps: [
      ["Map each value to its inorder position; read preorder from the start.",1,1],
      ["An empty range has no node.",3,3],
      ["The next preorder value is the root of this range.",4,4],
      ["Its inorder position splits the range in two.",4,4],
      ["Build the left part, then the right part.",5,5],
      ["Return the node.",6,6],
      ["Build the whole range.",8,8]
    ]
  },
  "house-robber-iii": {
    goal: "a tree of houses → the most money without robbing parent and child",
    steps: [
      ["For each node, return two totals: robbing it, and skipping it.",1,1],
      ["An empty spot gives [0, 0].",1,1],
      ["Rob it: its value plus both children skipped.",1,1],
      ["Skip it: the best of each child, whichever choice.",1,1],
      ["Return the better of the root's two totals.",2,2]
    ]
  },
  "binary-tree-maximum-path-sum": {
    goal: "a binary tree → the largest sum along any path",
    steps: [
      ["Keep the best path sum found.",1,1],
      ["From each child, take its best downward gain, or 0 if negative.",2,2],
      ["A path bending here is value + left gain + right gain; keep the best.",2,2],
      ["Pass up value + the bigger single gain.",2,2],
      ["Run it from the root and return the best.",3,4]
    ]
  },
  "convert-sorted-array-to-binary-search-tree": {
    goal: "sorted numbers → a height-balanced search tree",
    steps: [
      ["An empty range has no node.",1,1],
      ["The middle number becomes the node.",1,1],
      ["Build its left side from the numbers before the middle.",1,1],
      ["Build its right side from the numbers after it.",1,1],
      ["Build from the whole list.",2,2]
    ]
  },
  "minimum-depth-of-binary-tree": {
    goal: "a binary tree → the nodes on its shortest root-to-leaf path",
    steps: [
      ["An empty tree has depth 0.",1,1],
      ["Start with the root's level at depth 1.",2,2],
      ["Look at each node of the level; the first leaf ends it.",5,5],
      ["Gather the children for the next level.",5,5],
      ["Move down a level and add 1 to the depth.",6,6]
    ]
  },
  "average-of-levels-in-binary-tree": {
    goal: "a binary tree → the average value on each level",
    steps: [
      ["Start with a level holding the root.",1,1],
      ["While the level has nodes:",2,2],
      ["Add up its values and divide by how many there are.",3,3],
      ["Gather the children for the next level.",4,4],
      ["Move down.",5,5],
      ["Return the averages.",7,7]
    ]
  },
  "binary-tree-zigzag-level-order-traversal": {
    goal: "a binary tree → its levels, switching direction each time",
    steps: [
      ["Start with a level holding the root, if there is one.",1,1],
      ["While the level has nodes, take their values.",2,2],
      ["Reverse every second level.",3,3],
      ["Gather the children for the next level.",4,4],
      ["Move down.",5,5],
      ["Return the levels.",7,7]
    ]
  },
  "maximum-level-sum-of-a-binary-tree": {
    goal: "a binary tree → the level with the biggest sum",
    steps: [
      ["Start at level 1 with the root; track the best sum and its level.",1,1],
      ["Add up the values on this level.",3,3],
      ["If it beats the best, remember the sum and the level.",3,3],
      ["Gather the children for the next level.",4,4],
      ["Move down and add 1 to the level.",5,5],
      ["Return the best level.",7,7]
    ]
  },
  "flood-fill": {
    goal: "an image, a start pixel and a colour → the image after the fill",
    steps: [
      ["Copy the image and note the starting colour.",1,1],
      ["If it is already the new colour, nothing changes.",2,2],
      ["Put the start pixel on a stack.",3,3],
      ["Take a pixel; skip it if off the image or not the old colour.",5,6],
      ["Paint it and push its four neighbours.",7,7],
      ["Return the image.",9,9]
    ]
  },
  "island-perimeter": {
    goal: "a grid with one island → its coastline length",
    steps: [
      ["Start the perimeter at 0.",1,1],
      ["Visit every land cell.",2,2],
      ["Each land cell adds 4 sides.",3,3],
      ["A land cell above shares a side: take 2 off.",4,4],
      ["A land cell to the left shares a side: take 2 off.",5,5],
      ["Return the perimeter.",7,7]
    ]
  },
  "find-if-path-exists-in-graph": {
    goal: "a graph and two vertices → true if a path joins them",
    steps: [
      ["Give every vertex its own group.",1,1],
      ["find follows a vertex to its group leader.",2,2],
      ["For each edge, join the two groups.",3,3],
      ["Joined if source and destination share a leader.",4,4]
    ]
  },
  "keys-and-rooms": {
    goal: "rooms with keys → true if every room can be opened",
    steps: [
      ["Room 0 is open: mark it seen and put it on a stack.",1,1],
      ["Take a room off the stack.",2,2],
      ["For each key inside, open the room if it is new.",2,2],
      ["Mark it seen and add it to the stack.",2,2],
      ["True if every room was seen.",3,3]
    ]
  },
  "number-of-provinces": {
    goal: "a city link table → how many groups of linked cities there are",
    steps: [
      ["Track which cities are seen and a count of provinces.",1,1],
      ["Visiting a city marks it and visits every linked unseen city.",2,2],
      ["Go through the cities in order.",3,3],
      ["An unseen city starts a new province; visit its whole group.",3,3],
      ["Return the count.",4,4]
    ]
  },
  "number-of-closed-islands": {
    goal: "a grid of land (0) and water (1) → islands not touching the edge",
    steps: [
      ["Copy the grid.",1,1],
      ["Sinking a cell turns it to water and sinks its neighbours.",2,2],
      ["Off the grid or water counts as closed.",2,2],
      ["A cell on the edge makes the island open.",2,2],
      ["The island is closed only if every part says closed.",2,2],
      ["Sink from each land cell and count the closed islands.",4,4],
      ["Return the count.",5,5]
    ]
  },
  "number-of-enclaves": {
    goal: "a grid of land and sea → land cells that cannot walk off the grid",
    steps: [
      ["Copy the grid.",1,1],
      ["Sinking a cell turns land to sea and sinks its land neighbours.",2,2],
      ["Sink from every cell on the border.",3,3],
      ["That removes all land that can reach the edge.",3,3],
      ["Count the land cells left.",4,4]
    ]
  },
  "surrounded-regions": {
    goal: "an X and O board → captured O groups turned to X",
    steps: [
      ["Keeping a cell marks an O as safe and spreads to its O neighbours.",2,2],
      ["Start keeping from every cell on the border.",3,3],
      ["Visit every cell again.",4,4],
      ["Safe cells go back to O.",4,4],
      ["Every other cell, including captured Os, becomes X.",4,4]
    ]
  },
  "pacific-atlantic-water-flow": {
    goal: "a height map → cells whose rain reaches both oceans",
    steps: [
      ["A flood starts from a set of cells and marks them seen.",2,4],
      ["Take a cell and look at its four neighbours.",6,7],
      ["Climb to a neighbour that is not lower and not yet seen.",8,9],
      ["The Pacific starts on the top and left edges, the Atlantic on the others.",14,16],
      ["Flood upward from both oceans.",17,17],
      ["Keep cells reached by both floods.",18,18],
      ["Return them.",19,19]
    ]
  },
  "longest-increasing-path-in-a-matrix": {
    goal: "a grid → the length of the longest strictly rising path",
    steps: [
      ["Keep a memo of the best path from each cell.",1,1],
      ["If a cell is already worked out, reuse it.",3,3],
      ["A path is at least the cell itself.",4,4],
      ["Try each bigger neighbour: 1 + its best path.",5,5],
      ["Save the best for this cell.",6,6],
      ["Try every cell as a start and keep the longest.",9,9],
      ["Return it.",10,10]
    ]
  },
  "shortest-path-in-binary-matrix": {
    goal: "a grid of open and blocked cells → the shortest 8-way path length",
    steps: [
      ["If either corner is blocked, there is no path.",2,2],
      ["Mark the start at distance 1 and queue it.",3,3],
      ["Take cells in queue order; the far corner returns its distance.",4,5],
      ["Look at all 8 neighbours.",6,7],
      ["Skip neighbours off the grid, blocked or already reached.",8,8],
      ["Give them distance + 1 and queue them.",9,9],
      ["If the queue empties, return -1.",12,12]
    ]
  },
  "nearest-exit-from-entrance-in-maze": {
    goal: "a maze and an entrance → the fewest steps to an exit",
    steps: [
      ["Track which cells are seen.",1,1],
      ["Queue the entrance at step 0 and mark it seen.",2,2],
      ["Take cells in queue order.",3,4],
      ["An open border cell that is not the entrance is an exit.",5,5],
      ["Look at the four neighbours; skip walls and seen cells.",6,7],
      ["Mark them seen and queue them one step further.",8,8],
      ["If the queue empties, return -1.",11,11]
    ]
  },
  "01-matrix": {
    goal: "a grid of 0s and 1s → each cell's distance to the nearest 0",
    steps: [
      ["Every 0 has distance 0; mark the others unknown.",1,1],
      ["Queue every 0 cell.",2,2],
      ["Take cells in queue order.",3,4],
      ["An unknown neighbour gets this distance + 1.",5,5],
      ["Queue it so it spreads further.",5,5],
      ["Return the distances.",7,7]
    ]
  },
  "open-the-lock": {
    goal: "dead codes and a target → the fewest wheel turns to reach it",
    steps: [
      ["Put the dead codes in a set.",1,1],
      ["If the start is dead, it cannot move.",2,2],
      ["Queue \"0000\" at 0 moves and mark it seen.",3,3],
      ["Take codes in queue order; the target returns its moves.",5,5],
      ["Turn each wheel one step up or down.",6,7],
      ["Queue each new code that is not dead or seen.",8,8],
      ["If the queue empties, return -1.",11,11]
    ]
  },
  "word-ladder": {
    goal: "start word, end word and a list → the shortest change chain length",
    steps: [
      ["Put the list into a set.",1,1],
      ["If the end word is not in the list, there is no chain.",2,2],
      ["Queue the start word at length 1.",3,3],
      ["Take words in queue order; the end word returns its length.",5,5],
      ["Try every letter in every position.",6,7],
      ["Queue each new word that is in the list and not seen.",8,8],
      ["If the queue empties, return 0.",11,11]
    ]
  },
  "subsets-ii": {
    goal: "numbers with repeats → every different subset",
    steps: [
      ["Sort a copy so repeats sit together.",1,1],
      ["Every call saves the current subset.",2,2],
      ["Try adding each later number in turn.",2,2],
      ["Skip a number equal to the one just tried at this level.",2,2],
      ["Add it, go deeper, then take it back off.",2,2],
      ["Start from position 0 and return the subsets.",3,4]
    ]
  },
  "combinations": {
    goal: "n and k → every way to choose k numbers from 1 to n",
    steps: [
      ["Keep the list of picks.",1,1],
      ["When k numbers are picked, save a copy.",2,2],
      ["Otherwise try each number from the next allowed one up to n.",2,2],
      ["Pick it, choose the rest after it, then take it back.",2,2],
      ["Start from 1 and return all picks.",3,4]
    ]
  },
  "combination-sum-iii": {
    goal: "k and n → every set of k digits that adds up to n",
    steps: [
      ["Keep the list of picks.",1,1],
      ["With k digits picked, save them if nothing is left of n.",2,2],
      ["Otherwise try each digit from the next allowed one up to 9.",2,2],
      ["Stop when a digit is bigger than what is left.",2,2],
      ["Pick it, choose the rest, then take it back.",2,2],
      ["Start at 1 with n left and return the sets.",3,4]
    ]
  },
  "permutations-ii": {
    goal: "numbers with repeats → every different ordering",
    steps: [
      ["Sort a copy so repeats sit together; track used positions.",1,1],
      ["A full ordering is saved.",3,3],
      ["Try each position for the next seat.",4,4],
      ["Skip used ones, and a repeat whose twin before it is unused.",5,5],
      ["Use it, fill the rest, then give it back.",6,6],
      ["Start empty and return the orderings.",9,10]
    ]
  },
  "combination-sum-ii": {
    goal: "candidates used once each and a target → every combination for it",
    steps: [
      ["Sort a copy so repeats sit together.",1,1],
      ["If nothing is left, save the combination.",3,3],
      ["Try each later candidate while it still fits.",4,4],
      ["Skip a value equal to the one just tried at this level.",4,4],
      ["Use it, reach for the rest from the next one, then take it back.",4,4],
      ["Start with the whole target and return the combinations.",6,7]
    ]
  },
  "generate-parentheses": {
    goal: "n → every balanced string of n bracket pairs",
    steps: [
      ["Start an empty list of answers.",1,1],
      ["When the string has 2n brackets, save it.",2,2],
      ["Add an opener if fewer than n are used.",2,2],
      ["Add a closer if it has an opener to close.",2,2],
      ["Start with an empty string and return the answers.",3,4]
    ]
  },
  "palindrome-partitioning": {
    goal: "a string → every way to cut it into palindromes",
    steps: [
      ["Keep the list of pieces cut so far.",1,1],
      ["A helper checks if a piece reads the same both ways.",2,2],
      ["Reaching the end saves the current cut.",3,3],
      ["Try every next piece from here.",3,3],
      ["If it is a palindrome, cut it, go on, then undo the cut.",3,3],
      ["Start at the beginning and return every cut.",4,5]
    ]
  },
  "n-queens": {
    goal: "n → every way to place n safe queens, drawn as rows",
    steps: [
      ["Keep the column of the queen in each filled row.",1,1],
      ["With every row filled, draw the board and save it.",3,3],
      ["Try each column in the next row.",4,4],
      ["It is safe if no earlier queen shares its column or diagonal.",4,4],
      ["Place the queen, fill the next rows, then remove it.",4,4],
      ["Start at row 0 and return the boards.",6,7]
    ]
  },
  "n-queens-ii": {
    goal: "n → how many ways to place n safe queens",
    steps: [
      ["Keep a count and the column of each placed queen.",1,1],
      ["With every row filled, add one to the count.",3,3],
      ["Try each column in the next row.",4,4],
      ["It is safe if no earlier queen shares its column or diagonal.",4,4],
      ["Place the queen, fill the next rows, then remove it.",4,4],
      ["Start at row 0 and return the count.",6,7]
    ]
  },
  "find-the-town-judge": {
    goal: "n people and trust pairs → the judge's label, or -1",
    steps: [
      ["Give every person a score of 0.",1,1],
      ["Trusting someone takes 1 off; being trusted adds 1.",2,2],
      ["The judge scores exactly n - 1.",3,3],
      ["Return the first person with that score.",3,3],
      ["Otherwise return -1.",4,4]
    ]
  },
  "find-center-of-star-graph": {
    goal: "star edges → the centre node",
    steps: [
      ["Take the two ends of the first edge.",0,0],
      ["The centre is on every edge.",0,0],
      ["If the first end is also on the second edge, it is the centre.",0,0],
      ["Otherwise the second end is.",0,0]
    ]
  },
  "is-graph-bipartite": {
    goal: "an undirected graph → true if it splits into two sides",
    steps: [
      ["Start every node uncoloured.",1,1],
      ["Visit each uncoloured node as a new start.",2,3],
      ["Colour it 0 and queue it.",4,4],
      ["Give each uncoloured neighbour the other colour and queue it.",5,6],
      ["A neighbour with the same colour means it cannot split.",6,6],
      ["If no clash appears, return true.",9,9]
    ]
  },
  "redundant-connection": {
    goal: "a tree plus one extra edge → the edge to remove",
    steps: [
      ["Give every node its own group.",1,1,"intro"],
      ["find follows a node to its group leader.",2,2,"look"],
      ["Take each edge in order and find both leaders.",3,3,"look"],
      ["Same leader: this edge closes a loop, so return it.",3,3,"cycle"],
      ["Otherwise join the two groups.",3,3,"join"]
    ]
  },
  "number-of-operations-to-make-network-connected": {
    goal: "computers and cables → the fewest moves to connect them all",
    steps: [
      ["With fewer than n - 1 cables, it cannot be done.",1,1],
      ["Give every computer its own group; find gives the leader.",2,3],
      ["Start with n separate parts.",4,4],
      ["Each cable that joins two different groups merges them.",5,5],
      ["One fewer part for each merge.",5,5],
      ["Joining k parts takes k - 1 moves.",6,6]
    ]
  },
  "network-delay-time": {
    goal: "one-way travel times, n and a start → time for all to get the signal",
    steps: [
      ["Every node starts unreachable; the start node is at time 0.",1,1,"intro"],
      ["Repeat n times: try every edge.",2,2,"settle"],
      ["If going through an edge reaches a node sooner, update it.",2,2,"improve"],
      ["The slowest node sets the total time.",3,3,"done"],
      ["If some node was never reached, return -1.",4,4,"stale"]
    ]
  },
  "min-cost-to-connect-all-points": {
    goal: "points → the least total cost to join them all",
    steps: [
      ["Track each point's cheapest link to the joined group; point 0 is free.",1,1],
      ["Join one point per round.",2,2],
      ["Pick the unjoined point with the cheapest link.",3,3],
      ["Join it and add that cost.",4,4],
      ["Update every other point's cheapest link through it.",5,5],
      ["Return the total.",7,7]
    ]
  },
  "cheapest-flights-within-k-stops": {
    goal: "flights, start, end and k → the cheapest price within k stops",
    steps: [
      ["Every city costs infinity except the start at 0.",1,1],
      ["Do k + 1 rounds, one per flight taken.",2,2],
      ["Work on a copy so each round adds only one flight.",3,3],
      ["For each flight, see if it reaches its city cheaper.",4,4],
      ["The copy becomes the new costs.",5,5],
      ["Return the end's cost, or -1.",7,7]
    ]
  },
  "path-with-minimum-effort": {
    goal: "a height grid → the smallest possible effort for a route",
    steps: [
      ["A helper checks if a route exists with steps no higher than a limit.",2,2],
      ["Walk from the top-left; reaching the corner means yes.",3,5],
      ["Step to new neighbours whose height change fits the limit.",6,8],
      ["If the walk ends without the corner, no.",11,11],
      ["The limit is between 0 and a big number.",13,13],
      ["Binary search the smallest limit that works.",14,14],
      ["Return it.",15,15]
    ]
  },
  "longest-common-prefix": {
    goal: "words → the longest start they all share",
    steps: [
      ["Start with the first word as the guess.",1,1],
      ["Check the guess against every word.",2,2],
      ["While a word does not start with it, drop its last letter.",2,2],
      ["Whatever is left is the shared start.",3,3]
    ]
  },
  "design-add-and-search-words-data-structure": {
    goal: "addWord and search calls with \".\" wildcards → each search's answer",
    steps: [
      ["Start with an empty root node.",1,1],
      ["addWord: walk down letter by letter, making nodes, and mark the end.",2,2],
      ["search walks the word and the tree together.",4,4],
      ["At the end of the word, the node must be a word end.",5,5],
      ["A \".\" tries every child letter.",6,6],
      ["A normal letter follows its own child, if it exists.",7,7],
      ["Start at the root and the first letter.",9,9]
    ]
  },
  "replace-words": {
    goal: "roots and a sentence → each word replaced by its shortest root",
    steps: [
      ["Put the roots in a set.",1,1],
      ["Split the sentence into words.",2,2],
      ["For each word, try its starts from shortest to longest.",2,2],
      ["The first start that is a root replaces the word.",2,2],
      ["Join the words back with spaces.",2,2]
    ]
  },
  "search-suggestions-system": {
    goal: "products and a search word → up to three suggestions per letter",
    steps: [
      ["Sort the products alphabetically.",1,1],
      ["For each letter typed, take the start typed so far.",2,2],
      ["Keep the products that begin with it.",2,2],
      ["Take the first three of them.",2,2],
      ["Return the suggestions.",3,3]
    ]
  },
  "map-sum-pairs": {
    goal: "insert and sum calls → each prefix sum",
    steps: [
      ["Keep a map from key to value.",1,1],
      ["insert sets or replaces the key's value.",2,2],
      ["sum walks every key in the map.",3,3],
      ["Add the value of each key that starts with the prefix.",3,3],
      ["Return the total.",3,3]
    ]
  },
  "word-search-ii": {
    goal: "a board and words → the words that can be traced on it",
    steps: [
      ["For each word, check if it is on the board.",2,2],
      ["Every letter matched: found.",4,4],
      ["Stop if off the board or the cell is not the next letter.",5,5],
      ["Mark the cell used.",6,6],
      ["Try the next letter in all four directions.",7,7],
      ["Put the letter back.",8,8],
      ["Try every cell as a start.",10,10],
      ["Keep each different word that was found.",13,13]
    ]
  },
  "maximum-xor-of-two-numbers-in-an-array": {
    goal: "numbers → the largest XOR of any two of them",
    steps: [
      ["Build the answer bit by bit, from the highest bit down.",1,1],
      ["Grow a mask that keeps the top bits seen so far.",3,3],
      ["Collect every number's top bits; hope to set this bit in the answer.",4,4],
      ["Two tops a and b with a XOR b = hoped value make it possible.",5,5],
      ["If so, keep the bit.",5,5],
      ["Return the answer.",7,7]
    ]
  },
  "fibonacci-number": {
    goal: "n → the n-th Fibonacci number",
    steps: [
      ["Start with F(0) = 0 and F(1) = 1.",0,0],
      ["Step forward n times.",0,0],
      ["Each step, the next number is the sum of the last two.",0,0],
      ["Keep only the last two numbers.",0,0],
      ["Return the first one, which is F(n).",0,0]
    ]
  },
  "n-th-tribonacci-number": {
    goal: "n → the n-th Tribonacci number",
    steps: [
      ["Start the list with 0, 1, 1.",0,0],
      ["Go from 3 up to n.",0,0],
      ["Each number is the sum of the three before it.",0,0],
      ["Push it on the list.",0,0],
      ["Return the n-th value.",0,0]
    ]
  },
  "house-robber-ii": {
    goal: "money in houses in a circle → the most you can take",
    steps: [
      ["With one house, take it.",1,1],
      ["A helper solves a straight street: take or skip each house.",2,2],
      ["First and last are neighbours, so never take both.",3,3],
      ["Solve without the first house and without the last house.",3,3],
      ["Return the better answer.",3,3]
    ]
  },
  "delete-and-earn": {
    goal: "numbers → the most points without taking neighbouring values",
    steps: [
      ["Make a slot for every value up to the biggest.",1,1],
      ["Each slot holds the total points that value is worth.",2,2],
      ["Now neighbouring slots cannot both be taken, like houses on a street.",3,3],
      ["For each slot, take it (skip before + it) or skip it.",4,4],
      ["Return the better total.",5,5]
    ]
  },
  "maximum-product-subarray": {
    goal: "numbers → the largest product of an unbroken stretch",
    steps: [
      ["Track the biggest and smallest product ending here, and the best.",1,1],
      ["For each next number, multiply both by it.",2,3],
      ["A negative number can turn the smallest into the biggest.",4,4],
      ["New biggest and smallest: the number alone, or one of the products.",4,4],
      ["Keep the best biggest.",4,4],
      ["Return the best.",6,6]
    ]
  },
  "best-time-to-buy-and-sell-stock-with-cooldown": {
    goal: "daily prices → the most profit with a one-day rest after selling",
    steps: [
      ["Track three states: holding, just sold, and resting.",1,1],
      ["Holding: keep holding, or buy today from resting.",2,2],
      ["Just sold: sell today what you were holding.",2,2],
      ["Resting: rest again, or come out of the cooldown.",2,2],
      ["Return the better of just sold or resting.",3,3]
    ]
  },
  "best-time-to-buy-and-sell-stock-with-transaction-fee": {
    goal: "daily prices and a fee → the most profit",
    steps: [
      ["Track two states: holding a share, and free with no share.",1,1],
      ["Each day, holding: keep it, or buy today from free.",2,2],
      ["Free: stay free, or sell today and pay the fee.",2,2],
      ["Return the free total.",3,3]
    ]
  },
  "minimum-path-sum": {
    goal: "a grid → the smallest sum on a right-and-down path",
    steps: [
      ["Keep one row of best sums; only the start is reachable at first.",1,1],
      ["Visit the cells row by row.",2,2],
      ["Reach a cell from above or from the left, whichever is cheaper.",2,2],
      ["Add the cell's own value.",2,2],
      ["Return the bottom-right best sum.",3,3]
    ]
  },
  "perfect-squares": {
    goal: "n → the fewest perfect squares that add up to it",
    steps: [
      ["Make a table for every number up to n; 0 needs none.",1,1],
      ["For each number, try every square that fits.",2,2],
      ["One square plus the best for what is left.",2,2],
      ["Keep the smallest.",2,2],
      ["Return the answer for n.",3,3]
    ]
  },
  "coin-change-ii": {
    goal: "an amount and coins → how many coin combinations make it",
    steps: [
      ["Make a table of ways; making 0 has one way.",1,1],
      ["Take one coin type at a time.",2,2],
      ["For each amount from that coin up, add the ways for amount - coin.",2,2],
      ["Going coin by coin counts each combination once.",2,2],
      ["Return the ways for the amount.",3,3]
    ]
  },
  "combination-sum-iv": {
    goal: "numbers and a target → how many ordered sequences add up to it",
    steps: [
      ["Make a table of ways; reaching 0 has one way.",1,1],
      ["For each total from 1 up to the target:",2,2],
      ["Try every number as the last one in the sequence.",2,2],
      ["Add the ways to reach total - number.",2,2],
      ["Return the ways for the target.",3,3]
    ]
  },
  "minimum-cost-for-tickets": {
    goal: "travel days and pass prices → the least to cover every day",
    steps: [
      ["Mark the travel days; keep the best cost up to each day.",1,1],
      ["A day you do not travel costs the same as the day before.",2,2],
      ["A travel day: a 1-day pass on top of yesterday's cost,",2,2],
      ["or a 7-day pass from a week ago, or a 30-day pass from a month ago.",2,2],
      ["Keep the cheapest choice.",2,2],
      ["Return the cost for the whole year.",3,3]
    ]
  },
  "best-time-to-buy-and-sell-stock-iii": {
    goal: "daily prices → the most profit from at most two trades",
    steps: [
      ["Track four states: first buy, first sell, second buy, second sell.",1,1],
      ["First buy: the cheapest price paid so far.",2,2],
      ["First sell: the best profit from one trade.",2,2],
      ["Second buy: first profit minus today's price.",2,2],
      ["Second sell: the best profit from two trades.",2,2],
      ["Return the second sell.",3,3]
    ]
  },
  "unique-paths-ii": {
    goal: "a grid with rocks → how many right-and-down routes avoid them",
    steps: [
      ["Keep one row of route counts; the start has 1.",1,1],
      ["Go through the rows and cells.",2,2],
      ["A rock cell has 0 routes.",2,2],
      ["Otherwise routes = from above + from the left.",2,2],
      ["Return the bottom-right count.",3,3]
    ]
  },
  "triangle": {
    goal: "a number triangle → the smallest top-to-bottom path sum",
    steps: [
      ["Start with a copy of the bottom row.",1,1],
      ["Work upward one row at a time.",2,2],
      ["Each cell takes its value plus the smaller of the two below.",2,2],
      ["The top cell holds the answer.",3,3]
    ]
  },
  "maximal-square": {
    goal: "a grid of \"0\" and \"1\" → the area of the biggest all-\"1\" square",
    steps: [
      ["Keep one row of square sizes and the best size.",1,1],
      ["Go row by row, also tracking the size up and to the left.",2,3],
      ["A \"1\" cell's square is 1 + the smallest of up, left and diagonal.",6,6],
      ["A \"0\" cell has size 0.",6,6],
      ["Remember the old value as the next diagonal; keep the best.",7,7],
      ["Return the best size squared.",10,10]
    ]
  },
  "palindromic-substrings": {
    goal: "a string → how many stretches read the same both ways",
    steps: [
      ["Start the count at 0.",1,1],
      ["Try every centre, both odd and even sized.",2,2],
      ["Spread out while both ends match.",2,2],
      ["Every step that matches is one more palindrome.",2,2],
      ["Return the count.",3,3]
    ]
  },
  "longest-palindromic-subsequence": {
    goal: "a string → the longest palindrome you can keep by deleting letters",
    steps: [
      ["Make a table for every range of the string.",1,1],
      ["Go from the last start position back to the first.",2,2],
      ["A single letter is a palindrome of length 1.",2,2],
      ["Matching ends add 2 to the inside range.",2,2],
      ["Otherwise drop one end and keep the better.",2,2],
      ["Return the answer for the whole string.",3,3]
    ]
  },
  "delete-operation-for-two-strings": {
    goal: "two words → the fewest deletions to make them equal",
    steps: [
      ["Make a table for the common subsequence of each pair of prefixes.",1,1],
      ["Same letters: one more than up and to the left.",2,2],
      ["Different: the better of dropping a letter from either word.",2,2],
      ["Keep the common part; delete everything else.",3,3],
      ["Steps = both lengths minus twice the common length.",3,3]
    ]
  },
  "interleaving-string": {
    goal: "s1, s2 and s3 → true if s3 weaves s1 and s2 together",
    steps: [
      ["The lengths must add up.",2,2],
      ["Make a table: can the first i of s1 and j of s2 make the start of s3?",3,3],
      ["Visit every pair of counts.",4,4],
      ["True if the last letter came from s1 and the cell before was true.",5,5],
      ["Or if it came from s2 and the cell before was true.",6,6],
      ["Return the cell for all of both strings.",8,8]
    ]
  },
  "target-sum": {
    goal: "numbers and a target → how many sign choices reach it",
    steps: [
      ["Count the ways to reach each sum; 0 has one way.",1,1],
      ["Take the numbers one at a time.",2,3],
      ["Every sum so far can add or subtract the number.",4,4],
      ["Carry the ways over to the new sums.",4,4],
      ["The new counts replace the old.",5,5],
      ["Return the ways to reach the target.",7,7]
    ]
  },
  "last-stone-weight-ii": {
    goal: "stone weights → the smallest weight that can be left",
    steps: [
      ["Add up the stones; track which weights up to half can be made.",1,1],
      ["For each stone, mark every weight it can complete.",2,2],
      ["Find the biggest makeable weight not above half.",3,3],
      ["Splitting into that and the rest leaves total - 2 x weight.",3,3],
      ["Return it.",4,4]
    ]
  },
  "maximum-length-of-pair-chain": {
    goal: "pairs → the longest chain where each pair starts after the last ends",
    steps: [
      ["Sort the pairs by their end.",1,1],
      ["Track the end of the chain so far.",1,1],
      ["Take a pair if it starts after that end.",2,2],
      ["Its end becomes the chain's new end.",2,2],
      ["Return the chain length.",3,3]
    ]
  },
  "longest-string-chain": {
    goal: "words → the longest chain made by adding one letter at a time",
    steps: [
      ["Sort the words from short to long; keep each word's best chain.",1,1],
      ["For each word, start its chain at 1.",2,3],
      ["Remove each letter in turn to get a shorter word.",4,4],
      ["If that shorter word has a chain, extend it by 1.",4,4],
      ["Save the best for this word and keep the overall best.",5,5],
      ["Return it.",7,7]
    ]
  },
  "number-of-longest-increasing-subsequence": {
    goal: "numbers → how many longest increasing subsequences there are",
    steps: [
      ["For each spot, track the longest length ending there and its count.",1,1],
      ["Look at every earlier smaller number.",2,2],
      ["A longer chain through it replaces the length and count.",3,3],
      ["An equally long chain adds its count.",3,3],
      ["Find the longest length overall.",5,5],
      ["Add the counts of the spots with that length.",6,6]
    ]
  },
  "russian-doll-envelopes": {
    goal: "envelopes → the most that nest inside each other",
    steps: [
      ["Sort by width, and by height from tall to short for equal widths.",1,1],
      ["That stops two equal widths from nesting.",1,1],
      ["Now find the longest rising run of heights.",2,2],
      ["Binary search where each height fits in the tails list.",3,4],
      ["Place it there.",5,5],
      ["The tails list's length is the answer.",7,7]
    ]
  },
  "distinct-subsequences": {
    goal: "s and t → how many ways to delete letters of s to get t",
    steps: [
      ["Count ways to build each prefix of t; the empty prefix has 1.",1,1],
      ["Read s letter by letter.",2,2],
      ["Go through t from the back so each letter is used once.",2,2],
      ["A matching letter adds the ways for the prefix before it.",2,2],
      ["Return the ways for the whole of t.",3,3]
    ]
  },
  "length-of-last-word": {
    goal: "a string of words → the length of the last word",
    steps: [
      ["Trim spaces off both ends.",0,0],
      ["Split it into words at the spaces.",0,0],
      ["Take the last word.",0,0],
      ["Return its length.",0,0]
    ]
  },
  "find-the-index-of-the-first-occurrence-in-a-string": {
    goal: "a haystack and a needle → where the needle first appears, or -1",
    steps: [
      ["Try each start position in the haystack.",0,0],
      ["Compare the needle letter by letter from there.",0,0],
      ["The first full match gives the index.",0,0],
      ["If no start matches, return -1.",0,0]
    ]
  },
  "reverse-words-in-a-string": {
    goal: "a string → its words in reverse order",
    steps: [
      ["Trim spaces off both ends.",0,0],
      ["Split at runs of spaces into words.",0,0],
      ["Reverse the list of words.",0,0],
      ["Join them with single spaces.",0,0]
    ]
  },
  "string-to-integer-atoi": {
    goal: "a string → the number at its start, clamped to 32 bits",
    steps: [
      ["Start at the first character with sign + and value 0.",1,1],
      ["Skip leading spaces.",2,2],
      ["Read an optional + or - sign.",3,3],
      ["Read digits, building the number, until a non-digit.",4,4],
      ["Stop early once it is already too big.",4,4],
      ["Apply the sign and clamp it into range.",5,5]
    ]
  },
  "zigzag-conversion": {
    goal: "a string and a row count → the zigzag rows read in turn",
    steps: [
      ["With one row, nothing changes.",1,1],
      ["Make one empty string per row; start at the top going down.",2,2],
      ["Put each letter on the current row.",3,3],
      ["Turn around at the top and the bottom.",3,3],
      ["Move to the next row.",3,3],
      ["Join the rows.",4,4]
    ]
  },
  "rotate-string": {
    goal: "s and goal → true if some shift of s gives goal",
    steps: [
      ["The lengths must match.",0,0],
      ["Write s twice in a row.",0,0],
      ["Every shift of s appears inside that doubled string.",0,0],
      ["True if goal is inside it.",0,0]
    ]
  },
  "repeated-substring-pattern": {
    goal: "a string → true if it is a shorter piece repeated",
    steps: [
      ["Write the string twice in a row.",0,0],
      ["Cut off the first and the last letter.",0,0],
      ["A repeated string still appears inside what is left.",0,0],
      ["True if it does.",0,0]
    ]
  },
  "fizz-buzz": {
    goal: "n → the numbers 1 to n with Fizz and Buzz",
    steps: [
      ["Go from 1 to n.",0,0],
      ["A multiple of 15 writes FizzBuzz.",0,0],
      ["A multiple of 3 writes Fizz.",0,0],
      ["A multiple of 5 writes Buzz.",0,0],
      ["Anything else writes the number.",0,0]
    ]
  },
  "plus-one": {
    goal: "digits of a number → the digits of that number plus one",
    steps: [
      ["Copy the digits.",1,1],
      ["Start at the last digit.",2,2],
      ["Below 9: add one and return.",2,2],
      ["A 9 becomes 0 and the carry moves left.",2,2],
      ["If every digit was 9, put a 1 in front.",3,3]
    ]
  },
  "roman-to-integer": {
    goal: "a Roman numeral → its value",
    steps: [
      ["Write down the value of each symbol; start at 0.",1,1],
      ["Read the symbols left to right.",2,2],
      ["A symbol smaller than the next one is subtracted.",2,2],
      ["Otherwise it is added.",2,2],
      ["Return the total.",3,3]
    ]
  },
  "integer-to-roman": {
    goal: "a number → its Roman numeral",
    steps: [
      ["List the symbol values from biggest to smallest, with the pairs.",1,1],
      ["Start an empty answer.",2,2],
      ["For each value, while it fits in the number:",3,3],
      ["Add its symbol and subtract the value.",3,3],
      ["Return the answer.",4,4]
    ]
  },
  "reverse-integer": {
    goal: "a whole number → its digits reversed, or 0 if too big",
    steps: [
      ["Take the digits without the sign.",1,1],
      ["Reverse them and turn them back into a number.",1,1],
      ["Put the sign back.",1,1],
      ["If it is outside 32 bits, return 0.",2,2]
    ]
  },
  "excel-sheet-column-number": {
    goal: "a column name → its number",
    steps: [
      ["Start at 0.",0,0],
      ["Read the letters left to right.",0,0],
      ["Multiply by 26 and add the letter's place (A is 1).",0,0],
      ["Return the number.",0,0]
    ]
  },
  "excel-sheet-column-title": {
    goal: "a column number → its name",
    steps: [
      ["Start with an empty name.",1,1],
      ["Take one off so A to Z are 0 to 25.",2,2],
      ["The remainder by 26 gives the last letter.",2,2],
      ["Put it in front and divide by 26.",2,2],
      ["Return the name when nothing is left.",3,3]
    ]
  },
  "count-primes": {
    goal: "n → how many primes are below it",
    steps: [
      ["Below 3 there are none.",1,1],
      ["Keep a mark for every number that is not prime.",2,2],
      ["Walk from 2 up; an unmarked number is prime, so count it.",3,3],
      ["Mark its multiples from its square up as not prime.",3,3],
      ["Return the count.",4,4]
    ]
  },
  "multiply-strings": {
    goal: "two numbers as strings → their product as a string",
    steps: [
      ["Make a list of 0 digits, as long as both numbers together.",1,1],
      ["Multiply every digit of one by every digit of the other.",2,2],
      ["Add each product into its position.",3,3],
      ["Keep one digit there and carry the rest left.",4,4],
      ["Join the digits and strip leading zeros.",6,6],
      ["Return it, or \"0\" if nothing is left.",7,7]
    ]
  },
  "add-digits": {
    goal: "a number → the single digit left after adding its digits again and again",
    steps: [
      ["0 stays 0.",0,0],
      ["Adding digits keeps the same remainder by 9.",0,0],
      ["So the answer is the number's remainder by 9...",0,0],
      ["...counted from 1 to 9 instead of 0 to 8.",0,0]
    ]
  },
  "greatest-common-divisor-of-strings": {
    goal: "two strings → the longest string that divides both",
    steps: [
      ["If a + b differs from b + a, no common piece exists.",1,1],
      ["Find the greatest common divisor of the two lengths.",2,2],
      ["Swap and take remainders until one length is 0.",2,2],
      ["Return that many letters from the start.",3,3]
    ]
  },
  "number-of-1-bits": {
    goal: "a number → how many 1 bits it has",
    steps: [
      ["Start the count at 0.",0,0],
      ["Look at the last bit.",0,0],
      ["If it is 1, count it.",0,0],
      ["Drop the last bit and repeat until nothing is left.",0,0],
      ["Return the count.",0,0]
    ]
  },
  "power-of-two": {
    goal: "a number → true if it is a power of two",
    steps: [
      ["It must be above 0.",0,0],
      ["A power of two has exactly one 1 bit.",0,0],
      ["n - 1 flips that bit and all the bits below it.",0,0],
      ["So n AND (n - 1) is 0 only for powers of two.",0,0]
    ]
  },
  "hamming-distance": {
    goal: "two numbers → how many bits differ",
    steps: [
      ["XOR them: differing bits become 1.",0,0],
      ["Count the 1 bits.",0,0],
      ["Look at the last bit and add it.",0,0],
      ["Shift right and repeat until nothing is left.",0,0],
      ["Return the count.",0,0]
    ]
  },
  "find-the-difference": {
    goal: "s and t with one extra letter → the extra letter",
    steps: [
      ["Start with 0.",0,0],
      ["XOR the code of every letter in both strings.",0,0],
      ["Letters in both cancel out.",0,0],
      ["The code left is the extra letter.",0,0]
    ]
  },
  "reverse-bits": {
    goal: "a 32-bit number → its bits in reverse order",
    steps: [
      ["Start the result at 0.",0,0],
      ["Repeat 32 times.",0,0],
      ["Take the last bit of n.",0,0],
      ["Push it onto the result: result x 2 + bit.",0,0],
      ["Drop that bit from n.",0,0],
      ["Return the result.",0,0]
    ]
  },
  "single-number-ii": {
    goal: "numbers that appear three times except one → the one",
    steps: [
      ["Track bits seen once and bits seen twice.",0,0],
      ["Each number flips its bits in ones, unless they are in twos.",0,0],
      ["Then flips them in twos, unless they are in ones.",0,0],
      ["Bits seen three times clear from both.",0,0],
      ["The bits left in ones are the single number.",0,0]
    ]
  },
  "height-checker": {
    goal: "heights → how many students are out of place",
    steps: [
      ["Sort a copy of the heights.",0,0],
      ["Compare it with the line, spot by spot.",0,0],
      ["Count the spots that differ.",0,0],
      ["Return the count.",0,0]
    ]
  },
  "relative-sort-array": {
    goal: "two lists → the first sorted by the order of the second",
    steps: [
      ["Give each value of the second list its position as a rank.",1,1],
      ["Sort a copy of the first list.",2,2],
      ["Values missing from the second list rank last.",3,3],
      ["Lower rank comes first; equal ranks sort small to large.",4,4],
      ["Return the sorted list.",2,2]
    ]
  },
  "sort-integers-by-the-number-of-1-bits": {
    goal: "numbers → them sorted by how many 1 bits they have",
    steps: [
      ["A helper counts the 1 bits of a number.",1,1],
      ["Sort a copy of the numbers.",2,2],
      ["Fewer 1 bits come first.",2,2],
      ["Ties go from small to large.",2,2]
    ]
  },
  "custom-sort-string": {
    goal: "an order and a string → the string sorted by that order",
    steps: [
      ["A letter's rank is its place in order.",1,1],
      ["Letters not in order get the last rank.",1,1],
      ["Sort the letters of the string by rank.",2,2],
      ["Join them back together.",2,2]
    ]
  },
  "h-index": {
    goal: "citation counts → the h-index",
    steps: [
      ["Sort the counts from most to least.",1,1],
      ["Start h at 0.",1,1],
      ["While the next paper has more than h citations, raise h.",2,2],
      ["Return h.",3,3]
    ]
  },
  "largest-number": {
    goal: "numbers → the biggest number made by joining them",
    steps: [
      ["Turn every number into text.",1,1],
      ["Put a before b when a + b is bigger than b + a.",1,1],
      ["Join them in that order.",1,1],
      ["If it starts with 0, the whole answer is \"0\".",2,2]
    ]
  },
  "sort-an-array": {
    goal: "numbers → them sorted, with merge sort",
    steps: [
      ["A list of 0 or 1 numbers is sorted.",2,2],
      ["Split it in half and sort each half.",3,3],
      ["Merge: keep taking the smaller front of the two halves.",4,5],
      ["Return the merged list.",6,6],
      ["Sort the whole input.",8,8]
    ]
  },
  "design-parking-system": {
    goal: "a car park and addCar calls → whether each car parks",
    steps: [
      ["Keep the spaces left for big, medium and small.",1,1],
      ["To park, look at the spaces left for that size.",2,2],
      ["None left: return false.",2,2],
      ["Otherwise use one space and return true.",2,2]
    ]
  },
  "number-of-recent-calls": {
    goal: "ping times → how many pings in the last 3000 ms",
    steps: [
      ["Keep a queue of ping times.",1,1],
      ["Add the new time at the back.",2,2],
      ["Drop times from the front older than t - 3000.",2,2],
      ["Return how many are left.",2,2]
    ]
  },
  "design-hashmap": {
    goal: "put, get and remove calls → each get's answer",
    steps: [
      ["Keep a plain object as storage.",1,1],
      ["put stores the value under the key.",2,2],
      ["get returns the stored value, or -1.",3,3],
      ["remove deletes the key.",4,4]
    ]
  },
  "design-browser-history": {
    goal: "browser calls → the page after each move",
    steps: [
      ["Keep a list of pages and the current position.",1,1],
      ["visit cuts off forward pages, adds the url and moves to it.",2,2],
      ["back moves left by steps, stopping at the start.",3,3],
      ["forward moves right by steps, stopping at the end.",4,4],
      ["Both return the page you land on.",3,4]
    ]
  },
  "design-circular-queue": {
    goal: "ring buffer calls → each call's answer",
    steps: [
      ["Keep a fixed array, its size k, the head position and a count.",1,1],
      ["enQueue: if full, fail; else write after the last value and count it.",2,2],
      ["deQueue: if empty, fail; else move the head on and count one less.",3,3],
      ["Front reads the head, or -1 when empty.",4,4],
      ["Rear reads the last value, wrapping round, or -1.",5,5],
      ["isEmpty and isFull compare the count with 0 and k.",6,7]
    ]
  },
  "remove-duplicates-from-sorted-array": {
    goal: "sorted numbers → how many different values, moved to the front",
    steps: [
      ["Keep a write spot k at 0.",1,1],
      ["Read each number in order.",2,2],
      ["If it differs from the last written value, write it at k.",2,2],
      ["Move k on after each write.",2,2],
      ["Return k.",3,3]
    ]
  },
  "remove-element": {
    goal: "numbers and a value → how many are left after removing it",
    steps: [
      ["Keep a write spot k at 0.",1,1],
      ["Read each number.",2,2],
      ["If it is not the value, copy it to spot k.",2,2],
      ["Move k on after each copy.",2,2],
      ["Return k.",3,3]
    ]
  },
  "remove-duplicates-from-sorted-array-ii": {
    goal: "sorted numbers → them with at most two copies of each, at the front",
    steps: [
      ["Keep a write spot k at 0.",1,1],
      ["Read each number in order.",2,2],
      ["Keep it if fewer than two are written, or it differs from two back.",2,2],
      ["Write it at k and move k on.",2,2],
      ["Return k.",3,3]
    ]
  },
  "binary-subarrays-with-sum": {
    goal: "0s and 1s and a goal → how many stretches add up to the goal",
    steps: [
      ["Count running sums seen; the empty start counts once.",1,1],
      ["Start the sum and the count at 0.",2,2],
      ["Add each value to the running sum.",3,3],
      ["Stretches ending here: how often sum - goal was seen.",3,3],
      ["Record the current sum.",3,3],
      ["Return the count.",4,4]
    ]
  },
  "count-number-of-nice-subarrays": {
    goal: "numbers and k → how many stretches hold exactly k odd numbers",
    steps: [
      ["Count how often each running odd count was seen; 0 once.",1,1],
      ["Start the odd count and the answer at 0.",2,2],
      ["Add 1 for each odd number.",3,3],
      ["Stretches ending here: how often odd - k was seen.",3,3],
      ["Record the current odd count.",3,3],
      ["Return the answer.",4,4]
    ]
  },
  "number-of-substrings-containing-all-three-characters": {
    goal: "a string of a, b and c → how many substrings hold all three",
    steps: [
      ["Track the last position of each letter, starting at -1.",1,1],
      ["Start the count at 0.",2,2],
      ["For each end position, update that letter's last spot.",3,3],
      ["Any start up to the oldest of the three last spots works.",3,3],
      ["Add that many substrings.",3,3],
      ["Return the count.",4,4]
    ]
  },
  "substring-with-concatenation-of-all-words": {
    goal: "a string and same-length words → starts where all words sit joined",
    steps: [
      ["Note the word length and the total length of all words.",1,1],
      ["Count how many times each word is needed.",2,2],
      ["Try every start position.",3,3],
      ["Cut the next word-sized piece.",6,7],
      ["Count it; stop if it is not needed or used too often.",8,9],
      ["If every piece fitted, record the start.",11,11],
      ["Return the starts.",13,13]
    ]
  },
  "insert-delete-getrandom-o1": {
    goal: "insert, remove and getRandom calls → each call's answer",
    steps: [
      ["Keep a list of values and a map from value to its spot.",1,1],
      ["insert: if new, add to the end and record its spot.",2,2],
      ["remove: find its spot and take the last value off.",4,5],
      ["Move that last value into the gap.",6,6],
      ["Forget the removed value.",7,7],
      ["getRandom picks a random spot in the list.",10,10]
    ]
  },
  "number-of-ways-to-split-array": {
    goal: "numbers → how many cut points leave the left side at least as big",
    steps: [
      ["Add up all the numbers.",1,1],
      ["Keep a left sum and a count.",2,2],
      ["Try each cut that leaves both sides non-empty.",3,3],
      ["Add the next number to the left sum.",3,3],
      ["If left is at least total - left, count the cut.",3,3],
      ["Return the count.",4,4]
    ]
  },
  "xor-queries-of-a-subarray": {
    goal: "numbers and queries → the XOR of each range",
    steps: [
      ["Start a prefix list with 0.",1,1],
      ["Each entry XORs the next number into the one before.",2,2],
      ["A range's XOR is the prefix after it XOR the prefix before it.",3,3],
      ["Answer every query that way.",3,3]
    ]
  },
  "range-sum-query-2d-immutable": {
    goal: "a grid, then sumRegion calls → each rectangle's sum",
    steps: [
      ["Make a table one bigger in each direction, filled with 0.",2,3],
      ["Each cell holds the sum of everything above and left of it.",4,4],
      ["Build it from the cell above, the cell left, minus their overlap.",4,4],
      ["A rectangle is the big corner minus two strips plus the overlap.",6,6]
    ]
  },
  "make-sum-divisible-by-p": {
    goal: "numbers and p → the shortest stretch to remove so the sum divides by p",
    steps: [
      ["Find the remainder of the whole sum by p.",1,2],
      ["If it is 0, nothing needs removing.",3,3],
      ["Note where each prefix remainder was last seen.",4,5],
      ["Walk the list, keeping the running remainder.",7,7],
      ["The stretch to remove starts after a prefix with remainder cur - need.",8,8],
      ["Keep the shortest such stretch.",9,9],
      ["Return it, or -1 if only the whole list works.",12,12]
    ]
  },
  "matrix-block-sum": {
    goal: "a grid and k → each cell's sum over its k-sized block",
    steps: [
      ["Note the grid size.",1,1],
      ["Build a new grid of the same shape.",2,2],
      ["For each cell, add every cell within k rows and k columns.",4,4],
      ["Stay inside the grid edges.",4,4],
      ["Write the sum.",5,5]
    ]
  },
  "number-of-submatrices-that-sum-to-target": {
    goal: "a grid and a target → how many rectangles add up to it",
    steps: [
      ["Pick a top row.",3,3],
      ["Grow a bottom row down, adding each row into column totals.",4,6],
      ["Now the rectangle's columns act like one list of numbers.",7,8],
      ["Count stretches of that list that sum to the target, with running sums.",9,9],
      ["Return the total count.",12,12]
    ]
  },
  "guess-number-higher-or-lower": {
    goal: "n and a guess helper → the hidden number",
    steps: [
      ["Search from 1 to n.",1,1],
      ["Guess the middle.",2,2],
      ["0 means found: return it.",2,2],
      ["Too high: search lower. Too low: search higher.",2,2],
      ["Return -1 if the range empties.",3,3]
    ]
  },
  "first-bad-version": {
    goal: "n and a checker → the first broken build",
    steps: [
      ["Search from 1 to n.",1,1],
      ["Check the middle build.",2,2],
      ["Broken: the first broken one is here or earlier.",2,2],
      ["Fine: it is later.",2,2],
      ["When the range closes, return it.",3,3]
    ]
  },
  "find-k-closest-elements": {
    goal: "sorted numbers, k and x → the k values closest to x",
    steps: [
      ["Search for where a window of k values should start.",1,1],
      ["Compare the distance from x to the window's first value...",2,2],
      ["...with the distance to the value just after the window.",2,2],
      ["If the first is farther, move the window right; else left.",2,2],
      ["Return the k values from that start.",3,3]
    ]
  },
  "find-minimum-in-rotated-sorted-array-ii": {
    goal: "a rotated sorted list with repeats → its smallest value",
    steps: [
      ["Search the whole list.",1,1],
      ["Middle bigger than the end: the minimum is to the right.",2,2],
      ["Middle smaller than the end: it is at the middle or to the left.",2,2],
      ["Equal: you cannot tell, so drop the last value.",2,2],
      ["Return the value where the range closed.",3,3]
    ]
  },
  "find-in-mountain-array": {
    goal: "a target and a mountain list → the first index holding the target",
    steps: [
      ["Binary search for the peak: climb while the next value is bigger.",1,3],
      ["Remember the peak.",4,4],
      ["Binary search the rising side for the target.",5,6],
      ["If not found, binary search the falling side, in reverse.",7,8],
      ["If neither side has it, return -1.",9,9]
    ]
  },
  "determine-whether-matrix-can-be-obtained-by-rotation": {
    goal: "two grids → true if quarter turns make the first equal the second",
    steps: [
      ["Start with the first grid.",1,1],
      ["Try up to four positions.",2,2],
      ["If it equals the target, return true.",3,3],
      ["Turn it a quarter turn.",4,5],
      ["If no turn matches, return false.",7,7]
    ]
  },
  "diagonal-traverse": {
    goal: "a grid → its values along anti-diagonals in zigzag",
    steps: [
      ["Note the size and start an empty answer.",1,1],
      ["Go through each anti-diagonal, where row + column is the same.",2,2],
      ["Collect its cells from top to bottom.",4,4],
      ["Every other diagonal runs the other way: reverse it.",5,5],
      ["Add the cells to the answer.",6,6],
      ["Return the answer.",8,8]
    ]
  },
  "sort-the-matrix-diagonally": {
    goal: "a grid → it with every down-right diagonal sorted",
    steps: [
      ["Copy the grid and keep a group per diagonal.",1,1],
      ["Cells with the same row - column share a diagonal; collect them.",2,2],
      ["Sort each group, biggest first.",3,3],
      ["Fill the grid back, taking the smallest from each group.",4,4],
      ["Return the grid.",5,5]
    ]
  },
  "search-a-2d-matrix-ii": {
    goal: "a grid sorted along rows and columns → true if it holds the target",
    steps: [
      ["Start at the top-right corner.",1,1],
      ["If the value is the target, return true.",2,2],
      ["Too big: move left. Too small: move down.",2,2],
      ["Each step rules out a whole row or column.",2,2],
      ["If you walk off the grid, return false.",3,3]
    ]
  },
  "meeting-rooms": {
    goal: "meetings → true if one person can attend them all",
    steps: [
      ["Sort the meetings by start.",1,1],
      ["Compare each meeting with the one before it.",2,2],
      ["If it starts before the last one ends, they clash.",2,2],
      ["If no clash, return true.",3,3]
    ]
  },
  "meeting-rooms-ii": {
    goal: "meetings → the fewest rooms needed",
    steps: [
      ["Sort the start times and the end times separately.",1,1],
      ["Track rooms in use and the next meeting to end.",2,2],
      ["A start before the earliest end needs another room.",3,3],
      ["Otherwise a room frees up and is reused.",3,3],
      ["Return the most rooms needed.",4,4]
    ]
  },
  "my-calendar-ii": {
    goal: "book calls → true if each booking avoids a triple booking",
    steps: [
      ["Keep single bookings and double-booked stretches.",1,1],
      ["If the new booking overlaps a double stretch, refuse it.",3,3],
      ["Each overlap with a single booking becomes a double stretch.",4,4],
      ["Add the booking to the singles.",5,5],
      ["Return true.",6,6]
    ]
  },
  "maximum-number-of-events-that-can-be-attended": {
    goal: "events with start and end days → the most events you can attend",
    steps: [
      ["Sort the events by start day.",1,1],
      ["Keep a small heap of end days of events you could attend.",2,4],
      ["If nothing is waiting, jump to the next start day.",7,7],
      ["Add every event that has started by today.",8,8],
      ["Drop events that already ended.",9,9],
      ["Attend the one ending soonest, and move to the next day.",10,10],
      ["Return the count.",12,12]
    ]
  },
  "my-calendar-iii": {
    goal: "book calls → the most overlapping bookings after each",
    steps: [
      ["Keep a map of changes at each moment.",1,1],
      ["A booking adds 1 where it starts.",3,3],
      ["And takes 1 away where it ends.",4,4],
      ["Walk the moments in order with a running total.",5,6],
      ["Keep the biggest total.",6,6],
      ["Return it.",7,7]
    ]
  },
  "minimum-interval-to-include-each-query": {
    goal: "intervals and queries → for each query, the smallest interval covering it",
    steps: [
      ["Answer each query on its own.",1,1],
      ["Start with no interval found.",2,2],
      ["Look at every interval that covers the query.",3,3],
      ["Keep the smallest size, r - l + 1.",3,3],
      ["Return it, or -1.",4,4]
    ]
  },
  "maximize-sum-of-array-after-k-negations": {
    goal: "numbers and k flips → the biggest total afterwards",
    steps: [
      ["Sort a copy, smallest first.",1,1],
      ["Flip negative numbers, smallest first, while flips last.",2,2],
      ["Add everything up and find the smallest value.",3,3],
      ["If an odd number of flips is left, flip the smallest one.",4,4],
      ["Return the total.",4,4]
    ]
  },
  "dota2-senate": {
    goal: "a row of R and D senators → the party that wins",
    steps: [
      ["Make two queues of positions, one per party.",1,1],
      ["Fill them from the senate.",2,2],
      ["Compare the next senator of each party.",4,4],
      ["The earlier one bans the other and rejoins for the next round.",4,4],
      ["Both move on in their queues.",4,4],
      ["The party with senators left wins.",5,5]
    ]
  },
  "minimum-number-of-taps-to-open-to-water-a-garden": {
    goal: "a garden length and tap ranges → the fewest taps for all of it",
    steps: [
      ["For each start point, note the farthest a tap can water from there.",1,2],
      ["Track taps, the end of the current cover and the farthest reach.",3,3],
      ["Walk the garden, stretching the farthest reach.",4,5],
      ["At the end of the current cover, open another tap.",6,6],
      ["If the reach cannot move past here, return -1.",6,6],
      ["Return the tap count.",8,8]
    ]
  },
  "minimum-remove-to-make-valid-parentheses": {
    goal: "a string with brackets → it with the fewest brackets removed",
    steps: [
      ["Split into characters; keep a stack of open positions.",1,1],
      ["An opener is pushed.",2,2],
      ["A closer pops a match, or is removed if there is none.",2,2],
      ["Openers left on the stack are removed too.",3,3],
      ["Join what is left.",4,4]
    ]
  },
  "basic-calculator": {
    goal: "an expression with + - and brackets → its value",
    steps: [
      ["Track the result, the current sign and the number being read.",1,1],
      ["Keep a stack for results before each bracket.",2,2],
      ["Digits build the number.",4,4],
      ["+ or - adds the number with its sign and sets the new sign.",5,5],
      ["( saves the result and sign, then starts fresh.",6,6],
      [") finishes the inner result and combines it with the saved one.",7,7],
      ["Add the last number and return.",9,9]
    ]
  },
  "furthest-building-you-can-reach": {
    goal: "heights, bricks and ladders → the furthest building reached",
    steps: [
      ["Keep a list of the climbs so far.",1,1],
      ["Walk building by building; going down or level is free.",2,4],
      ["Add each climb and sort them biggest first.",5,5],
      ["Ladders cover the biggest climbs; bricks pay for the rest.",6,6],
      ["If bricks run short, this building is as far as you get.",7,7],
      ["Otherwise you reach the last building.",9,9]
    ]
  },
  "single-threaded-cpu": {
    goal: "tasks with arrival and run times → the order they run in",
    steps: [
      ["Sort the task indexes by arrival time.",1,1],
      ["Keep a waiting list, the answer and the clock.",2,3],
      ["If nothing waits, jump the clock to the next arrival.",5,5],
      ["Add every task that has arrived.",6,6],
      ["Pick the shortest waiting task, the smaller index on a tie.",7,7],
      ["Run it and move the clock on.",8,9],
      ["Return the order.",11,11]
    ]
  },
  "maximum-subsequence-score": {
    goal: "two lists and k → the best sum times minimum score",
    steps: [
      ["Order the indexes by nums2, biggest first.",1,1],
      ["Keep the chosen nums1 values, their sum and the best score.",2,3],
      ["Add each index in turn; its nums2 is now the smallest.",4,5],
      ["If more than k are chosen, drop the smallest nums1.",6,7],
      ["With exactly k, score = sum x this nums2; keep the best.",8,8],
      ["Return the best.",10,10]
    ]
  },
  "minimum-cost-to-hire-k-workers": {
    goal: "qualities, wages and k → the least total pay for k workers",
    steps: [
      ["Order workers by wage per quality, cheapest first.",1,1],
      ["Keep chosen qualities, their sum and the best cost.",2,3],
      ["Add each worker; their rate now sets the pay rate.",4,5],
      ["If more than k, drop the highest quality.",6,6],
      ["With exactly k, cost = quality sum x rate; keep the cheapest.",7,7],
      ["Return it.",9,9]
    ]
  },
  "ipo": {
    goal: "k, starting capital, profits and costs → the most capital at the end",
    steps: [
      ["Sort projects by the capital they need.",1,1],
      ["Keep a list of projects you can afford.",2,3],
      ["Repeat up to k times.",4,4],
      ["Add every project your capital now covers.",5,5],
      ["If none are affordable, stop.",6,6],
      ["Do the most profitable one and add its profit.",7,8],
      ["Return the capital.",10,10]
    ]
  },
  "minimum-number-of-refueling-stops": {
    goal: "a target, fuel and stations → the fewest stops to arrive",
    steps: [
      ["Keep the stations passed but not used, and a stop count.",1,2],
      ["While the fuel cannot reach the target:",3,3],
      ["Add every station within reach to the passed list.",4,4],
      ["If none are passed, you cannot arrive.",5,5],
      ["Use the biggest passed station and count a stop.",6,7],
      ["Return the stops.",9,9]
    ]
  },
  "sliding-window-median": {
    goal: "numbers and k → the median of each window of k",
    steps: [
      ["Start an empty answer list.",1,1],
      ["Slide the window one step at a time.",2,2],
      ["Sort the values inside the window.",3,3],
      ["Odd k: the middle value. Even k: the mean of the middle two.",4,4],
      ["Return the medians.",6,6]
    ]
  },
  "swapping-nodes-in-a-linked-list": {
    goal: "a list and k → it with the k-th from each end swapped",
    steps: [
      ["Walk k - 1 steps to the k-th node from the front.",1,2],
      ["Start a second pointer at the head and a runner at that node.",3,3],
      ["Move both until the runner reaches the end.",4,4],
      ["Now the second pointer is k-th from the back.",4,4],
      ["Swap their values.",5,5],
      ["Return the head.",6,6]
    ]
  },
  "add-two-numbers-ii": {
    goal: "two numbers as digit lists, biggest digit first → their sum as a list",
    steps: [
      ["Copy each list's digits into a stack.",1,3],
      ["Start with no carry and an empty result.",4,4],
      ["Pop a digit from each and add them with the carry.",5,6],
      ["Keep the carry for the next digit.",7,7],
      ["Put a new node with the last digit at the front.",8,8],
      ["Return the front node.",10,10]
    ]
  },
  "intersection-of-two-linked-lists": {
    goal: "two lists → the first node they share, or nothing",
    steps: [
      ["Start one pointer on each list.",1,1],
      ["Move both one step at a time.",2,2],
      ["A pointer that runs out jumps to the other list's head.",2,2],
      ["Both walk the same total distance, so they meet at the join.",2,2],
      ["Return where they met; nothing if they never join.",3,3]
    ]
  },
  "linked-list-cycle-ii": {
    goal: "a list → the node where its loop begins, or nothing",
    steps: [
      ["Start slow and fast at the head.",1,1],
      ["Move slow one step and fast two.",3,3],
      ["If they meet, start a new pointer at the head.",4,4],
      ["Move it and slow one step at a time; they meet at the loop start.",4,4],
      ["If fast runs out, there is no loop.",6,6]
    ]
  },
  "convert-sorted-list-to-binary-search-tree": {
    goal: "a sorted list → a height-balanced search tree",
    steps: [
      ["Copy the values into a list.",1,2],
      ["An empty range has no node.",5,5],
      ["The middle value becomes the node.",6,6],
      ["Build its left from the values before and its right from those after.",7,7],
      ["Build from the whole list, or nothing for an empty list.",9,9]
    ]
  },
  "circular-array-loop": {
    goal: "jumps on a circle → true if a one-way loop of 2+ spots exists",
    steps: [
      ["A helper gives the next spot, wrapping round.",1,1],
      ["Try each spot as a start, noting its direction.",2,3],
      ["Jump while the direction stays the same and spots are new.",6,6],
      ["A jump onto itself is a loop of one and does not count.",9,9],
      ["If you returned to a seen spot, check the loop.",12,12],
      ["Walk the loop to measure it and check every step's direction.",13,14],
      ["A one-way loop of length 2 or more means true.",15,15]
    ]
  },
  "count-sub-islands": {
    goal: "two grids → islands of the second that are all land in the first",
    steps: [
      ["Copy the second grid and start the count at 0.",1,2],
      ["Visit every land cell of the copy.",3,4],
      ["Start a new island, assume it fits, and sink its first cell.",5,6],
      ["Take a cell; if the first grid has water there, it does not fit.",8,9],
      ["Sink its land neighbours and add them to the stack.",10,10],
      ["If the whole island fitted, count it.",12,12],
      ["Return the count.",14,14]
    ]
  },
  "find-eventual-safe-states": {
    goal: "a directed graph → every node from which no path loops",
    steps: [
      ["Give every node a state: unknown, visiting or safe.",1,1],
      ["A known node answers at once: safe or not.",3,3],
      ["Mark the node as visiting.",4,4],
      ["If any arrow leads to an unsafe node, it is unsafe.",5,5],
      ["Every arrow was safe: mark it safe.",6,6],
      ["Keep the safe nodes in order.",9,9]
    ]
  },
  "evaluate-division": {
    goal: "division facts and queries → each query's answer, or -1",
    steps: [
      ["A helper adds an arrow from a to b with its ratio.",2,2],
      ["Each fact gives an arrow both ways: a / b and b / a.",3,3],
      ["A query with an unknown name gives -1.",5,5],
      ["Walk from c, carrying the product of ratios so far.",6,6],
      ["Reaching d gives the product.",9,9],
      ["Follow arrows to names not yet seen, multiplying the ratio.",10,10],
      ["If d cannot be reached, give -1.",12,12]
    ]
  },
  "populating-next-right-pointers-in-each-node": {
    goal: "a perfect binary tree → it with every next pointer set",
    steps: [
      ["Start at the leftmost node of the top level.",1,1],
      ["While the level has children below it:",2,2],
      ["Walk the level along its next pointers.",3,3],
      ["Link each left child to its right sibling.",3,3],
      ["Link each right child to the next node's left child.",3,3],
      ["Move down to the leftmost node of the next level.",4,4],
      ["Return the root.",6,6]
    ]
  },
  "all-nodes-distance-k-in-binary-tree": {
    goal: "a tree, a target node and k → values of nodes k steps away",
    steps: [
      ["Walk the tree once and remember each node's parent.",1,2],
      ["Start a level holding the target, marked seen.",3,4],
      ["Spread out one step k times.",5,5],
      ["From each node, step to its children and its parent if unseen.",7,7],
      ["Those become the next level.",8,8],
      ["Return the values on the last level.",10,10]
    ]
  },
  "shortest-bridge": {
    goal: "a grid with two islands → the fewest water cells to join them",
    steps: [
      ["Find the first land cell.",4,4],
      ["Mark the whole first island and put all its cells in a queue.",5,6],
      ["Spread out from the island one ring at a time.",9,9],
      ["Look at each neighbour not yet visited.",11,13],
      ["Reaching the other island means d cells were filled.",14,14],
      ["Otherwise mark it visited and add it to the next ring.",15,15],
      ["Return -1 if they never meet.",19,19]
    ]
  },
  "snakes-and-ladders": {
    goal: "a board → the fewest moves to the last square",
    steps: [
      ["Note the board size and the last square.",1,1],
      ["A helper finds a square's cell, with rows switching direction.",2,2],
      ["Start at square 1 with 0 moves, in a queue.",3,3],
      ["Take squares in queue order; the last square returns its moves.",5,6],
      ["Try every die roll from 1 to 6.",7,8],
      ["If the square holds a snake or ladder, jump to its target.",9,10],
      ["Queue each new square one move further.",11,11],
      ["If the queue empties, return -1.",14,14]
    ]
  },
  "shortest-path-in-a-grid-with-obstacles-elimination": {
    goal: "a grid with walls and k breaks → the fewest steps to the corner",
    steps: [
      ["Start at the top-left with k breaks left, in a queue.",2,3],
      ["Spread out one step at a time.",4,4],
      ["Reaching the bottom-right gives the step count.",7,7],
      ["Look at the four neighbours inside the grid.",8,9],
      ["Stepping onto a wall uses one break.",10,10],
      ["Queue each new place with its breaks left, if breaks did not run out.",11,12],
      ["Return -1 if the queue empties.",17,17]
    ]
  },
  "bus-routes": {
    goal: "bus routes, a start and a target → the fewest buses to ride",
    steps: [
      ["If the start is the target, no bus is needed.",1,1],
      ["For each stop, list the buses that pass it.",2,3],
      ["Start at the source stop; track buses used and stops seen.",4,5],
      ["Each round is one more bus ride.",6,6],
      ["From each stop, board every bus not ridden yet.",8,10],
      ["Any stop on that bus: the target ends it; new stops join the next round.",11,11],
      ["Return -1 if no new stops are left.",15,15]
    ]
  },
  "binary-watch": {
    goal: "how many lights are on → every time the watch could show",
    steps: [
      ["A helper counts the 1 bits of a number.",1,1],
      ["Try every hour from 0 to 11.",2,2],
      ["And every minute from 0 to 59.",2,2],
      ["Keep times whose bits add up to the lights on.",2,2],
      ["Write them as h:mm.",2,2],
      ["Return the times.",3,3]
    ]
  },
  "restore-ip-addresses": {
    goal: "digits → every valid address made by adding three dots",
    steps: [
      ["A part is valid if it has 1 to 3 digits, no leading 0, and is up to 255.",1,1],
      ["Try every length from 1 to 3 for the first three parts.",2,2],
      ["The fourth part gets what is left; it must be 1 to 3 long.",3,4],
      ["Cut the four parts.",5,5],
      ["If all four are valid, join them with dots.",6,6],
      ["Return the addresses.",8,8]
    ]
  },
  "maximum-length-of-a-concatenated-string-with-unique-characters": {
    goal: "words → the longest join of some of them with no repeated letter",
    steps: [
      ["Turn each word into a bit mask; skip words that repeat a letter.",2,2],
      ["A helper counts the bits in a mask.",3,3],
      ["Track the best length.",4,4],
      ["At each step, record the letters used so far.",5,5],
      ["Try adding each later word that shares no letter.",5,5],
      ["Start with no words and return the best.",6,7]
    ]
  },
  "matchsticks-to-square": {
    goal: "matchsticks → true if they make a square using all of them",
    steps: [
      ["The total must split into 4 equal sides.",1,2],
      ["Note the side length; try the longest sticks first.",3,3],
      ["If every stick is placed, it works.",5,5],
      ["Try each side where the stick still fits.",6,7],
      ["Skip a side with the same length as one already tried.",8,8],
      ["Place it, go on, and take it back if that fails.",9,11],
      ["If no side works, go back.",13,13]
    ]
  },
  "partition-to-k-equal-sum-subsets": {
    goal: "numbers and k → true if they split into k groups of equal sum",
    steps: [
      ["The total must divide by k.",1,2],
      ["Note the target per group; try big numbers first.",3,3],
      ["A number bigger than the target cannot fit.",4,4],
      ["If every number is placed, it works.",6,6],
      ["Try each group where it fits, skipping groups that look the same.",7,9],
      ["Place it, go on, and take it back if that fails.",10,12],
      ["If no group works, go back.",14,14]
    ]
  },
  "sudoku-solver": {
    goal: "a sudoku board → it filled in so every rule holds",
    steps: [
      ["Keep a set of used digits for each row, column and box.",1,1],
      ["Note the empty cells and fill the sets from the given digits.",3,6],
      ["If every empty cell is filled, it is solved.",9,9],
      ["Take the next empty cell and find its box.",10,10],
      ["Try each digit not used in its row, column or box.",11,13],
      ["Write it in, update the sets and go on.",14,15],
      ["If that fails, take it back out.",16,16],
      ["If no digit works, go back.",18,18]
    ]
  },
  "permutation-sequence": {
    goal: "n and k → the k-th ordering of 1 to n",
    steps: [
      ["List the digits 1 to n.",1,1],
      ["Work out the factorials up to n.",2,2],
      ["Count k from 0.",4,4],
      ["Each first digit covers (n - 1)! orderings: k / that picks it.",5,5],
      ["Take that digit out and keep the remainder of k.",5,5],
      ["Repeat for the next places.",5,5],
      ["Return the digits picked.",6,6]
    ]
  },
  "unique-paths-iii": {
    goal: "a grid with start, end and walls → walks that cover every open cell",
    steps: [
      ["Find the start and count the cells that can be stepped on.",2,3],
      ["Copy the grid.",4,4],
      ["A walk off the grid or into a wall gives 0.",6,6],
      ["At the end, it counts only if every cell was used.",7,7],
      ["Mark the cell as used.",8,9],
      ["Add the walks in all four directions, one fewer cell left.",10,10],
      ["Unmark the cell before going back.",11,11],
      ["Start from the start cell.",14,14]
    ]
  },
  "remove-invalid-parentheses": {
    goal: "a string with brackets → every result after the fewest removals",
    steps: [
      ["A helper checks whether the brackets balance.",1,1],
      ["Start a level holding just the string.",2,2],
      ["If any strings on this level are valid, return them all.",4,5],
      ["Otherwise remove one bracket in every possible way.",7,7],
      ["Those make the next level, with no repeats.",8,8],
      ["If nothing is left, return the empty string.",10,10]
    ]
  },
  "solving-questions-with-brainpower": {
    goal: "questions with points and brainpower → the most points",
    steps: [
      ["Keep the best points from each question to the end.",1,1],
      ["Work backwards from the last question.",2,2],
      ["Skip it: the best from the next question.",2,2],
      ["Solve it: its points plus the best after the skipped ones.",2,2],
      ["Keep the better choice.",2,2],
      ["Return the best from the first question.",3,3]
    ]
  },
  "best-time-to-buy-and-sell-stock-iv": {
    goal: "k and daily prices → the best profit from at most k trades",
    steps: [
      ["For each trade count, track the best while holding and after selling.",1,1],
      ["Go through the prices.",2,2],
      ["Buying for trade j uses the profit after trade j - 1.",2,2],
      ["Selling trade j adds today's price to its buy.",2,2],
      ["Keep the best of each.",2,2],
      ["Return the best after k sales.",3,3]
    ]
  },
  "maximum-profit-in-job-scheduling": {
    goal: "jobs with times and profits → the most profit without overlaps",
    steps: [
      ["Sort the jobs by end time.",1,1],
      ["Keep a list of end times and the best profit up to each.",2,2],
      ["Go through the jobs.",3,3],
      ["Binary search the last end time at or before this job starts.",4,5],
      ["Taking the job adds its profit to that best.",6,6],
      ["If that beats the best so far, record it with this end.",7,7],
      ["Return the best profit.",9,9]
    ]
  },
  "burst-balloons": {
    goal: "balloon numbers → the most coins from bursting them all",
    steps: [
      ["Add a 1 at each end, and a table for every range.",1,1],
      ["Work on ranges from short to long.",2,3],
      ["Pick which balloon in the range bursts last.",4,4],
      ["It earns left end x it x right end, plus both sides.",4,4],
      ["Keep the best choice.",4,4],
      ["Return the answer for the whole row.",6,6]
    ]
  },
  "regular-expression-matching": {
    goal: "a string and a pattern → true if the pattern matches all of it",
    steps: [
      ["Make a table; both ends empty match.",1,2],
      ["Fill from the ends of both strings backwards.",3,3],
      ["Does the next letter match, directly or by \".\"?",4,4],
      ["With a \"*\" next, skip the pair or use it on one more letter.",5,5],
      ["Otherwise the letter must match and the rest too.",5,5],
      ["Return the answer for the full string and pattern.",7,7]
    ]
  },
  "design-linked-list": {
    goal: "linked list calls → each call's answer",
    steps: [
      ["Keep a dummy head node and a size.",1,1],
      ["A helper walks to the node at an index.",2,2],
      ["get returns that node's value, or -1 if out of range.",3,3],
      ["addAtHead and addAtTail are inserts at 0 and at size.",4,5],
      ["addAtIndex links a new node after the one before index.",7,9],
      ["deleteAtIndex skips the node at index.",12,14]
    ]
  },
  "remove-duplicates-from-sorted-list-ii": {
    goal: "a sorted list → it with every repeated value removed",
    steps: [
      ["Put a dummy before the head; prev on it, cur on the head.",1,2],
      ["Walk the list.",3,3],
      ["If cur starts a run of repeats, skip the whole run.",4,4],
      ["Link prev past the run.",4,4],
      ["Otherwise move prev and cur on.",5,5],
      ["Return the node after the dummy.",7,7]
    ]
  },
  "copy-list-with-random-pointer": {
    goal: "a list with random pointers → a deep copy",
    steps: [
      ["An empty list copies to nothing.",1,1],
      ["Make a new node for every old node and map old to new.",2,3],
      ["Walk again, setting each copy's next to the copy of next.",4,4],
      ["Set each copy's random to the copy of random.",4,4],
      ["Return the copy of the head.",5,5]
    ]
  },
  "remove-duplicate-letters": {
    goal: "a string → each letter once, in the smallest possible order",
    steps: [
      ["Note the last position of every letter.",2,2],
      ["Walk the letters, skipping ones already in the answer.",3,5],
      ["While the top letter is bigger and comes again later, pop it.",6,6],
      ["Push this letter and mark it used.",7,7],
      ["Join the stack.",9,9]
    ]
  },
  "longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit": {
    goal: "numbers and a limit → the longest stretch with max - min within it",
    steps: [
      ["Keep one queue for the max and one for the min.",1,1],
      ["Track the left edge and the best length.",2,2],
      ["Move a right edge along.",3,3],
      ["Drop smaller values from the max queue and bigger ones from the min queue.",4,6],
      ["While max - min is too big, move the left edge and drop old fronts.",7,7],
      ["Keep the longest window.",8,8],
      ["Return it.",10,10]
    ]
  },
  "maximal-rectangle": {
    goal: "a grid of \"0\" and \"1\" → the largest all-\"1\" rectangle",
    steps: [
      ["Keep a bar height per column.",1,1],
      ["For each row, grow bars on \"1\" and reset them on \"0\".",3,4],
      ["Treat the bars as a histogram, with a 0 at the end.",5,7],
      ["Pop taller bars; each makes a rectangle back to the bar below.",8,8],
      ["Keep the biggest area.",8,8],
      ["Push this column.",9,9],
      ["Return the biggest area.",12,12]
    ]
  },
  "shortest-subarray-with-sum-at-least-k": {
    goal: "numbers that may be negative and k → the shortest stretch with sum at least k",
    steps: [
      ["Build running sums starting at 0.",1,2],
      ["Keep a queue of start positions and the best length.",3,4],
      ["Go through each running sum.",5,5],
      ["While the front start makes a big enough sum, record and drop it.",6,6],
      ["Drop starts at the back whose sums are not smaller.",7,7],
      ["Add this position.",8,8],
      ["Return the best, or -1.",10,10]
    ]
  },
  "number-of-visible-people-in-a-queue": {
    goal: "heights in a line → how many people each person can see",
    steps: [
      ["Start every count at 0 and keep a stack of heights.",1,1],
      ["Walk from the right end.",2,2],
      ["Pop shorter people; each one is seen.",3,3],
      ["The first taller person is seen too.",4,4],
      ["Push this person.",5,5],
      ["Return the counts.",7,7]
    ]
  },
  "delete-node-in-a-bst": {
    goal: "a search tree and a key → the tree without that key",
    steps: [
      ["An empty spot returns nothing.",2,2],
      ["Go left or right toward the key.",3,4],
      ["Found with one side empty: return the other side.",5,6],
      ["Found with two children: find the smallest value on the right.",7,8],
      ["Copy that value into this node.",9,9],
      ["Delete that smallest node from the right side.",11,12],
      ["Start at the root.",15,15]
    ]
  },
  "binary-search-tree-iterator": {
    goal: "a search tree → its values in order, one at a time",
    steps: [
      ["Keep a stack and fill it from the root.",1,1],
      ["Pushing walks left, pushing every node on the way.",2,2],
      ["next pops the smallest node.",3,3],
      ["Then pushes the left path of its right child.",3,3],
      ["Return the popped value.",3,3],
      ["hasNext is true while the stack has nodes.",4,4]
    ]
  },
  "construct-binary-tree-from-inorder-and-postorder-traversal": {
    goal: "inorder and postorder walks → the tree they came from",
    steps: [
      ["Map each value to its inorder position.",1,1],
      ["Read postorder from the end.",2,2],
      ["An empty range has no node.",4,4],
      ["The next value from the end is this range's root.",5,5],
      ["Build the right part first, then the left part.",6,6],
      ["Return the node.",7,7],
      ["Build the whole range.",9,9]
    ]
  },
  "construct-binary-search-tree-from-preorder-traversal": {
    goal: "a preorder walk of a search tree → the tree",
    steps: [
      ["Read the values from the start.",1,1],
      ["Stop when values run out or the next is above the limit.",3,3],
      ["Take the next value as a node.",4,4],
      ["Its left side holds values below it.",5,5],
      ["Its right side holds values up to the old limit.",5,5],
      ["Build with no limit.",7,7]
    ]
  },
  "longest-zigzag-path-in-a-binary-tree": {
    goal: "a binary tree → its longest zigzag length",
    steps: [
      ["Track the best length.",1,1],
      ["Carry two lengths: arriving from the left and from the right.",2,2],
      ["Keep the best of them.",2,2],
      ["Going left continues a path that came from a right step.",2,2],
      ["Going right continues one that came from a left step.",2,2],
      ["Start at the root and return the best.",3,4]
    ]
  },
  "delete-nodes-and-return-forest": {
    goal: "a tree and values to delete → the roots left",
    steps: [
      ["Put the values to delete in a set.",1,1],
      ["Check if this node is deleted.",4,4],
      ["A kept node with no parent is a new root.",5,5],
      ["Its children become roots if this node is deleted.",6,7],
      ["Return nothing for a deleted node so its parent unlinks it.",8,8],
      ["Start at the root and return the roots.",10,11]
    ]
  },
  "unique-binary-search-trees": {
    goal: "n → how many search tree shapes hold 1 to n",
    steps: [
      ["Zero values make exactly one empty tree.",1,1],
      ["Work out the count for every size from 1 up to n.",2,2],
      ["Try each value as the root.",2,2],
      ["Left side has root - 1 values, right side has the rest.",2,2],
      ["Add left count x right count for every root.",2,2],
      ["Return the count for n.",3,3]
    ]
  },
  "serialize-and-deserialize-binary-tree": {
    goal: "a tree → a string, and the string -> the same tree",
    steps: [
      ["serialize: walk root, left, right.",3,3],
      ["Write each value, and # for an empty spot.",3,3],
      ["Join them with commas.",5,5],
      ["deserialize: split the string and read from the start.",8,9],
      ["A # is an empty spot; a value makes a node.",10,10],
      ["Build its left, then its right, in the same order.",10,10],
      ["Return the root.",11,11]
    ]
  },
  "binary-tree-cameras": {
    goal: "a binary tree → the fewest cameras to watch every node",
    steps: [
      ["Count the cameras.",1,1],
      ["An empty spot counts as watched.",3,3],
      ["Ask both children for their state first.",4,4],
      ["If a child is unwatched, put a camera here.",5,5],
      ["If a child has a camera, this node is watched.",6,6],
      ["Otherwise this node is unwatched and waits for its parent.",6,6],
      ["If the root is still unwatched, add one more camera.",8,8]
    ]
  },
  "vertical-order-traversal-of-a-binary-tree": {
    goal: "a binary tree → its values column by column",
    steps: [
      ["Walk the tree, noting each node's column, row and value.",1,2],
      ["Left children go one column left, right ones one right.",2,2],
      ["Sort by column, then row, then value.",4,4],
      ["Start a new list each time the column changes.",5,7],
      ["Add each value to its column's list.",7,7],
      ["Return the columns.",8,8]
    ]
  },
  "possible-bipartition": {
    goal: "people and dislikes → true if they split into two groups",
    steps: [
      ["Build a list of dislikes both ways.",1,2],
      ["Visit each person not yet placed.",3,4],
      ["Put them in group 1 and walk from them.",5,6],
      ["Put each unplaced neighbour in the other group.",7,7],
      ["A neighbour already in the same group means it fails.",7,7],
      ["If no clash, return true.",9,9]
    ]
  },
  "satisfiability-of-equality-equations": {
    goal: "equations like a==b and a!=b → true if they can all hold",
    steps: [
      ["Give each letter its own group; find gives its leader.",1,2],
      ["A helper turns a letter into a number.",3,3],
      ["First join the groups for every == equation.",4,4],
      ["Then every != equation must have different leaders.",5,5]
    ]
  },
  "accounts-merge": {
    goal: "accounts of names and emails → each person's accounts merged",
    steps: [
      ["Group emails with a leader map; find follows to the leader.",1,2],
      ["Join each email with the first email of its account.",3,3],
      ["Remember the name for each email.",3,3],
      ["Collect emails by leader.",4,5],
      ["Each group becomes [name, its emails sorted].",6,6]
    ]
  },
  "most-stones-removed-with-same-row-or-column": {
    goal: "stone positions → the most stones you can remove",
    steps: [
      ["Make groups; find gives a group's leader.",1,2],
      ["Join each stone's row with its column.",3,3],
      ["Count the different groups among the stones.",4,4],
      ["Each group keeps one stone: remove the rest.",5,5]
    ]
  },
  "minimum-height-trees": {
    goal: "a tree → the nodes that make the shortest root",
    steps: [
      ["A single node is its own answer.",1,1],
      ["Build a set of neighbours for every node.",2,3],
      ["Find the leaves: nodes with one neighbour.",5,5],
      ["While more than 2 nodes are left:",6,6],
      ["Cut off the leaves; neighbours left with one link become new leaves.",7,9],
      ["The new leaves are the next layer.",10,10],
      ["The last one or two nodes are the centres.",12,12]
    ]
  },
  "find-all-possible-recipes-from-given-supplies": {
    goal: "recipes, ingredients and supplies → every recipe you can make",
    steps: [
      ["Start with the supplies as what you have.",1,1],
      ["Keep going while new recipes get made.",3,4],
      ["Make any recipe whose ingredients you all have.",5,5],
      ["Add it to what you have, so it can be used next.",5,5],
      ["Return the recipes made.",7,7]
    ]
  },
  "course-schedule-iv": {
    goal: "prerequisites and queries → whether each course must come before another",
    steps: [
      ["Make a table of which course comes before which.",1,1],
      ["Fill in each direct prerequisite.",2,2],
      ["For every middle course k, i before k and k before j means i before j.",3,3],
      ["Look up each query in the table.",4,4]
    ]
  },
  "path-with-maximum-probability": {
    goal: "edges with chances → the best chance from start to end",
    steps: [
      ["Every node starts at chance 0, the start at 1.",1,2],
      ["Repeat at most n rounds.",3,3],
      ["Look at every edge.",5,6],
      ["If crossing it raises the chance at either end, update it.",7,8],
      ["Stop early when nothing changes.",10,10],
      ["Return the chance at the end node.",12,12]
    ]
  },
  "number-of-ways-to-arrive-at-destination": {
    goal: "roads with times → how many fastest routes reach the last town",
    steps: [
      ["Build the road list both ways.",1,2],
      ["Every town starts far away with 0 ways; town 0 is at 0 with 1 way.",3,4],
      ["Pick the closest town not finished yet.",6,7],
      ["Mark it finished.",9,9],
      ["A shorter route to a neighbour replaces its time and ways.",11,11],
      ["An equally short route adds its ways.",12,12],
      ["Return the ways for the last town.",15,15]
    ]
  },
  "build-a-matrix-with-conditions": {
    goal: "k and row and column rules → a grid placing 1 to k",
    steps: [
      ["A helper builds a graph and counts incoming rules per number.",1,3],
      ["Take numbers with no rules left, one by one, freeing others.",5,6],
      ["If some number never frees up, there is a loop: no order.",7,7],
      ["Find an order for the rows and one for the columns.",9,9],
      ["If either fails, return an empty list.",10,10],
      ["Put each number at its row position and column position.",11,12],
      ["Return the grid.",13,13]
    ]
  },
  "reconstruct-itinerary": {
    goal: "tickets → the trip using every ticket, alphabetically first",
    steps: [
      ["List the flights out of each airport.",1,2],
      ["Sort each list so the smallest name is taken first.",3,3],
      ["From an airport, keep flying the next unused ticket.",5,5],
      ["When stuck, add the airport to the route.",5,5],
      ["Start at HUB.",6,6],
      ["The route was built backwards, so reverse it.",7,7]
    ]
  },
  "swim-in-rising-water": {
    goal: "a height grid → the earliest time to swim corner to corner",
    steps: [
      ["A helper checks if a time t is enough.",2,2],
      ["The start must be at most t.",3,3],
      ["Walk to neighbours no higher than t.",4,8],
      ["Reaching the far corner means yes.",7,7],
      ["The time is between 0 and the highest square.",12,12],
      ["Binary search the earliest time that works.",13,13],
      ["Return it.",14,14]
    ]
  },
  "critical-connections-in-a-network": {
    goal: "servers and links → every link whose removal cuts the network",
    steps: [
      ["Build the link list both ways, with link ids.",1,2],
      ["Track each server's visit time and the lowest time it can reach.",3,4],
      ["Give the server a visit time.",6,6],
      ["Do not walk back along the same link.",8,8],
      ["A visited neighbour can lower the lowest time.",9,9],
      ["Visit a new neighbour; if it cannot reach back above, the link is critical.",10,10],
      ["Start a walk from every unvisited server.",13,13]
    ]
  },
  "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree": {
    goal: "weighted edges → critical and pseudo-critical edge indexes",
    steps: [
      ["Sort the edges by weight.",1,1],
      ["A helper builds the cheapest tree, skipping one edge or forcing one.",2,4],
      ["A forced edge goes in first.",6,6],
      ["Add each cheapest edge that joins two groups.",7,10],
      ["Build the cheapest tree once to know the best cost.",14,14],
      ["Skipping an edge makes it dearer: critical.",15,15],
      ["Forcing an edge keeps the best cost: pseudo-critical.",15,15]
    ]
  },
  "minimum-cost-to-make-at-least-one-valid-path-in-a-grid": {
    goal: "arrow grid → the fewest arrow changes for a path to the corner",
    steps: [
      ["The four arrow directions, in grid order.",1,1],
      ["Every cell starts far away; the start is at cost 0.",2,4],
      ["Take the next cell from the front of a double-ended queue.",6,6],
      ["Try all four directions inside the grid.",7,9],
      ["Following the cell's arrow is free; any other costs 1.",10,10],
      ["Free moves go to the front, paid moves to the back.",11,11],
      ["Return the cost to reach the corner.",14,14]
    ]
  },
  "find-the-length-of-the-longest-common-prefix": {
    goal: "two lists of numbers → the longest shared leading digits",
    steps: [
      ["Store every leading part of every number in the first list.",1,2],
      ["Track the best length.",3,3],
      ["For each number in the second list, try its longer leading parts first.",4,4],
      ["The first one stored gives a new best.",4,4],
      ["Return the best.",5,5]
    ]
  },
  "sum-of-prefix-scores-of-strings": {
    goal: "words → each word's total of prefix scores",
    steps: [
      ["Start a letter tree with a count on every node.",1,1],
      ["Insert each word, adding one to every node on its path.",2,2],
      ["For each word, walk its path again.",3,3],
      ["Add up the counts on the way.",3,3],
      ["That sum is the word's score.",3,3]
    ]
  },
  "prefix-and-suffix-search": {
    goal: "words, then f(pref, suff) calls → the largest matching index",
    steps: [
      ["For each word, make every prefix + # + suffix key.",1,1],
      ["Store the word's index under each key; later words overwrite.",1,1],
      ["f builds the key pref + # + suff.",2,2],
      ["Return its index, or -1.",2,2]
    ]
  },
  "relative-ranks": {
    goal: "scores → each athlete's medal or place",
    steps: [
      ["Sort the athletes from best score to worst.",1,1],
      ["The top three get Gold, Silver and Bronze.",2,2],
      ["Everyone else gets their place as text.",3,3],
      ["Write each label at the athlete's own position.",3,3],
      ["Return the labels.",4,4]
    ]
  },
  "sort-array-by-increasing-frequency": {
    goal: "numbers → them sorted by how often they appear",
    steps: [
      ["Count each value.",1,2],
      ["Sort a copy: rarer values first.",3,3],
      ["Equally common values go from largest to smallest.",3,3],
      ["Return the sorted list.",3,3]
    ]
  },
  "insertion-sort-list": {
    goal: "a linked list → it sorted by insertion",
    steps: [
      ["Start a sorted list with a dummy head.",1,1],
      ["Take nodes one at a time, saving the next one.",3,4],
      ["Walk the sorted list to find where this node belongs.",5,6],
      ["Link it in there.",7,7],
      ["Move on to the saved next node.",8,8],
      ["Return the sorted list.",10,10]
    ]
  },
  "design-hashset": {
    goal: "add, remove and contains calls → each contains answer",
    steps: [
      ["Make 1009 buckets, each a small list.",1,1],
      ["add puts the key in its bucket (key mod 1009) if missing.",2,2],
      ["remove takes it out of its bucket.",3,3],
      ["contains checks its bucket.",4,4]
    ]
  },
  "design-circular-deque": {
    goal: "deque calls → each call's answer",
    steps: [
      ["Keep a fixed ring, its size, the head position and a count.",1,1],
      ["insertFront moves the head back one, wrapping, and writes there.",2,2],
      ["insertLast writes just after the last value.",3,3],
      ["deleteFront moves the head on; deleteLast just counts one less.",4,5],
      ["getFront and getRear read the two ends, or -1.",6,7],
      ["isEmpty and isFull compare the count with 0 and k.",8,9]
    ]
  },
  "snapshot-array": {
    goal: "set, snap and get calls → each get's answer",
    steps: [
      ["Each slot keeps a history of [snap id, value], starting at 0.",1,1],
      ["set updates the last entry for this snap, or adds a new one.",2,2],
      ["snap returns the current id and moves on to the next.",3,3],
      ["get binary searches the slot's history for the last snap at or before.",5,7],
      ["Return that value.",8,8]
    ]
  },
  "design-underground-system": {
    goal: "check-in, check-out and average calls → each average",
    steps: [
      ["Keep riders who are checked in, and totals per trip.",1,1],
      ["checkIn records the station and time.",2,2],
      ["checkOut finds the start, adds the trip time to that route's total.",3,3],
      ["It also counts one more trip for that route.",3,3],
      ["The average is the total time divided by the trip count.",4,4]
    ]
  },
  "design-twitter": {
    goal: "post, feed, follow and unfollow calls → each feed",
    steps: [
      ["Keep every post in order, and who each user follows.",1,1],
      ["postTweet adds a post at the end.",2,2],
      ["getNewsFeed walks the posts from newest.",3,3],
      ["Keep posts by the user or anyone they follow, up to 10.",3,3],
      ["follow adds b to a's set, unless it is a itself.",4,4],
      ["unfollow removes b from a's set.",5,5]
    ]
  },
  "lfu-cache": {
    goal: "get and put calls → each answer, dropping the least used key",
    steps: [
      ["Keep the capacity, a map of entries and a clock.",1,1],
      ["get: missing gives -1; else count a use and stamp the time.",2,2],
      ["put on an existing key updates it and counts a use.",6,6],
      ["A new key when full must make room.",7,7],
      ["Find the key with the fewest uses, the oldest on a tie.",9,9],
      ["Remove it.",10,10],
      ["Add the new key with one use.",12,12]
    ]
  },
  "all-oone-data-structure": {
    goal: "inc, dec and max/min calls → each key asked for",
    steps: [
      ["Keep a count for each key.",1,1],
      ["inc adds one to the key's count.",2,2],
      ["dec takes one away, and forgets the key at 0.",3,3],
      ["getMaxKey finds a key with the highest count.",4,4],
      ["getMinKey finds a key with the lowest count.",5,5]
    ]
  },
  "maximum-frequency-stack": {
    goal: "push and pop calls → each popped value",
    steps: [
      ["Keep each value's count and a stack per count level.",1,1],
      ["push raises the value's count.",2,2],
      ["Then puts it on the stack for that count.",2,2],
      ["pop takes the top of the highest count stack.",3,3],
      ["Drop that level if it empties, and lower the value's count.",3,3]
    ]
  },
  "longest-palindrome-build": {
    goal: "letters → the longest palindrome they can build",
    steps: [
      ["Count each letter.",1,2],
      ["Track the length and whether any count is odd.",3,3],
      ["Use every pair of each letter.",4,4],
      ["Note any letter with one left over.",4,4],
      ["One left-over letter can sit in the middle.",5,5]
    ]
  },
  "defanging-an-ip-address": {
    goal: "an address → it with every dot shown as [.]",
    steps: [
      ["Split the address at every dot.",0,0],
      ["That gives the four numbers.",0,0],
      ["Join them back with [.] between.",0,0],
      ["Return the new text.",0,0]
    ]
  },
  "string-matching-in-an-array": {
    goal: "words → the words found inside another word",
    steps: [
      ["Look at each word.",0,0],
      ["Compare it with every other word.",0,0],
      ["Keep it if some other word contains it.",0,0],
      ["Return the kept words.",0,0]
    ]
  },
  "string-compression": {
    goal: "characters → the length after compressing runs in place",
    steps: [
      ["Keep a write spot and a read spot.",1,1],
      ["Find where the current run of equal characters ends.",3,4],
      ["Write the character.",5,5],
      ["If the run is longer than 1, write each digit of its length.",6,6],
      ["Jump to the next run.",7,7],
      ["Return the write spot.",9,9]
    ]
  },
  "longest-happy-prefix": {
    goal: "a string → its longest prefix that is also a suffix",
    steps: [
      ["Make a table: the longest border ending at each position.",1,1],
      ["For each next letter, start from the border before it.",2,2],
      ["Fall back to shorter borders until the next letter matches.",2,2],
      ["A match makes the border one longer.",2,2],
      ["The border at the end is the answer.",3,3]
    ]
  },
  "shortest-palindrome": {
    goal: "a string → the shortest palindrome made by adding letters in front",
    steps: [
      ["Join the string, a #, and the string reversed.",1,1],
      ["Make a border table for the joined string.",1,1],
      ["Fill it the same way as for a prefix-suffix search.",2,2],
      ["The last border is the longest palindrome at the start.",3,3],
      ["Put the reverse of the rest in front.",3,3]
    ]
  },
  "longest-duplicate-substring": {
    goal: "a string → a longest substring that appears twice",
    steps: [
      ["A helper looks for any repeated piece of a given length.",1,1],
      ["Slide along, storing each piece; a repeat is returned.",1,1],
      ["Search lengths from 1 up to n - 1.",2,2],
      ["If a length has a repeat, keep it and try longer.",3,3],
      ["Otherwise try shorter.",3,3],
      ["Return the best piece found.",4,4]
    ]
  },
  "text-justification": {
    goal: "words and a width → the lines fully justified",
    steps: [
      ["Fit as many words as possible on the next line.",3,5],
      ["Count the gaps between them.",6,6],
      ["The last line, or a one-word line, is left aligned and padded.",7,7],
      ["Otherwise share the spaces evenly between the gaps.",9,9],
      ["The leftmost gaps get the extra spaces.",9,9],
      ["Build the line and add it.",11,12],
      ["Start the next line after these words.",14,14],
      ["Return the lines.",16,16]
    ]
  },
  "pascals-triangle-ii": {
    goal: "a row number → that row of the number triangle",
    steps: [
      ["Start with the row [1].",1,1],
      ["Build each next row in place.",2,2],
      ["Go from right to left, adding the value on the left.",2,2],
      ["Add a 1 at the end.",2,2],
      ["Return the row.",3,3]
    ]
  },
  "minimum-insertion-steps-to-make-a-string-palindrome": {
    goal: "a string → the fewest inserts to make it a palindrome",
    steps: [
      ["Make a table for every range of the string.",1,1],
      ["Work on ranges from short to long.",2,3],
      ["Matching ends cost what the inside costs.",4,4],
      ["Different ends: 1 + the cheaper of dropping either end.",4,4],
      ["Return the answer for the whole string.",6,6]
    ]
  },
  "wildcard-matching": {
    goal: "a string and a pattern with ? and * → true if it matches all",
    steps: [
      ["Make a table; empty matches empty.",1,2],
      ["A pattern of only stars can match an empty string.",3,3],
      ["Fill every cell.",4,4],
      ["A *: match nothing more, or eat one more letter.",5,5],
      ["Otherwise the letters must match, or the pattern has ?.",6,6],
      ["Return the cell for both full strings.",8,8]
    ]
  },
  "dungeon-game": {
    goal: "a dungeon grid → the smallest starting health to get through",
    steps: [
      ["Make a table of the health needed when entering each room.",1,1],
      ["The spot past the goal needs 1 health.",2,2],
      ["Work backwards from the bottom-right.",3,3],
      ["Need the cheaper of going right or down, minus this room's number.",3,3],
      ["Never less than 1.",3,3]
    ]
  },
  "ones-and-zeroes": {
    goal: "binary strings, m and n → the most strings within m zeros and n ones",
    steps: [
      ["Make a table: best count for each budget of zeros and ones.",1,1],
      ["Take the strings one at a time and count their zeros and ones.",2,3],
      ["Go through budgets from large to small so each string is used once.",4,4],
      ["Taking it: 1 + the best for the budget left.",4,4],
      ["Keep the better of taking it or not.",4,4],
      ["Return the best for the full budget.",6,6]
    ]
  },
  "largest-divisible-subset": {
    goal: "different positive numbers → a largest group where each pair divides",
    steps: [
      ["Sort the numbers; each starts a chain of length 1.",1,1],
      ["For each number, look at every smaller one it is a multiple of.",4,4],
      ["Extending that chain by one is better: remember the link.",4,4],
      ["Keep track of the longest chain's end.",5,5],
      ["Follow the links back from that end.",8,8],
      ["Reverse to get the group, smallest first.",9,9]
    ]
  },
  "profitable-schemes": {
    goal: "members, a profit goal, jobs → how many schemes reach the goal",
    steps: [
      ["Table: schemes by members used and profit (capped at the goal); 0, 0 has one.",1,2],
      ["Take the jobs one at a time.",3,3],
      ["Go through member counts from large to small so each job is used once.",4,4],
      ["Adding the job raises the profit, capped at the goal.",5,5],
      ["Add the schemes that can take this job.",6,6],
      ["Add up schemes at the goal for every member count.",10,10]
    ]
  },
  "minimum-score-triangulation-of-polygon": {
    goal: "corner values → the lowest total triangle score",
    steps: [
      ["Make a table for every stretch of corners.",1,1],
      ["Work on stretches from short to long.",2,3],
      ["Pick the corner k that makes a triangle with the two ends.",5,5],
      ["Score = both sides + the product of the three corners.",5,5],
      ["Keep the lowest.",5,5],
      ["Return the answer for the whole polygon.",7,7]
    ]
  },
  "beautiful-arrangement": {
    goal: "n → how many good arrangements of 1 to n there are",
    steps: [
      ["Track which numbers are used.",1,1],
      ["Past the last position, count one arrangement.",3,3],
      ["Try each unused number at position i.",5,5],
      ["It must divide i, or i must divide it.",5,5],
      ["Use it, fill the rest, then free it.",5,5],
      ["Start at position 1.",8,8]
    ]
  },
  "minimum-number-of-work-sessions-to-finish-the-tasks": {
    goal: "task hours and a session length → the fewest sessions",
    steps: [
      ["For every set of tasks (as bits), work out its total hours.",1,2],
      ["Best sessions per set; the empty set needs 0.",3,4],
      ["For each set, try every smaller set that fits in one session.",5,5],
      ["One session + the best for the tasks left.",5,5],
      ["Return the best for all tasks.",6,6]
    ]
  },
  "palindrome-partitioning-ii": {
    goal: "a string → the fewest cuts into palindromes",
    steps: [
      ["Track which stretches are palindromes and the best cuts per end.",1,1],
      ["For each end, the worst case is a cut before every letter.",2,3],
      ["Look at every start where start to end is a palindrome.",4,4],
      ["From the very start, no cut is needed.",4,4],
      ["Otherwise 1 + the best cuts before that start.",4,4],
      ["Return the cuts for the whole string.",6,6]
    ]
  },
  "minimum-cost-to-cut-a-stick": {
    goal: "a stick and cut points → the lowest total cut cost",
    steps: [
      ["Sort the cuts and add both ends, with a table per stretch.",1,1],
      ["Work on stretches between points, short to long.",2,3],
      ["Pick the first cut k inside the stretch.",5,5],
      ["Cost = the stretch's length + both sides.",5,5],
      ["Keep the lowest.",5,5],
      ["Return the answer for the whole stick.",7,7]
    ]
  },
  "strange-printer": {
    goal: "a string → the fewest print runs to make it",
    steps: [
      ["Make a table for every stretch.",1,1],
      ["A single letter takes one run.",2,3],
      ["Worst case: print the last letter on its own.",5,5],
      ["If some earlier letter matches it, one run can cover both.",6,6],
      ["Then add the cost of what sits between them.",6,6],
      ["Return the answer for the whole string.",9,9]
    ]
  },
  "shortest-path-visiting-all-nodes": {
    goal: "a graph → the shortest walk that visits every node",
    steps: [
      ["A state is a node plus the set of nodes visited, as bits.",1,1],
      ["Start from every node at once, each having visited itself.",3,3],
      ["Spread out one step at a time.",4,4],
      ["A state that has visited everything gives the length.",7,7],
      ["Step to each neighbour, adding it to the visited set.",8,8],
      ["Queue states not seen before.",8,8],
      ["Return -1 if nothing is left.",12,12]
    ]
  },
  "binary-number-with-alternating-bits": {
    goal: "a number → true if its bits alternate",
    steps: [
      ["Shift the number right by one.",0,0],
      ["XOR it with the original.",0,0],
      ["Alternating bits give all 1s.",0,0],
      ["All 1s plus 1 has no shared bits with itself.",0,0]
    ]
  },
  "minimum-flips-to-make-a-or-b-equal-to-c": {
    goal: "a, b and c → the fewest bit flips so a OR b equals c",
    steps: [
      ["Start with 0 flips.",1,1],
      ["Look at each bit position.",2,2],
      ["Read that bit of a, b and c.",3,3],
      ["c has 1: one flip if both a and b are 0.",4,4],
      ["c has 0: flip every 1 in a and b.",4,4],
      ["Return the flips.",6,6]
    ]
  },
  "find-the-original-array-of-prefix-xor": {
    goal: "prefix XORs → the hidden list",
    steps: [
      ["The first value is the first prefix.",0,0],
      ["Each later prefix is the one before XOR the new value.",0,0],
      ["So the new value is this prefix XOR the one before.",0,0],
      ["Do that for every position.",0,0]
    ]
  },
  "sum-of-two-integers": {
    goal: "a and b → their sum without + or -",
    steps: [
      ["While there is still a carry:",1,1],
      ["The carry is where both have a 1, shifted left.",1,1],
      ["XOR adds the bits without carrying.",1,1],
      ["Feed the carry back in as b.",1,1],
      ["Return a.",2,2]
    ]
  },
  "single-number-iii": {
    goal: "numbers where two appear once → those two",
    steps: [
      ["XOR everything: the result is a XOR b.",1,1],
      ["Keep its lowest 1 bit; a and b differ there.",1,1],
      ["XOR only the numbers that have that bit.",3,3],
      ["That leaves one of the two.",3,3],
      ["The other is the total XOR that one.",4,4]
    ]
  },
  "bitwise-and-of-numbers-range": {
    goal: "left and right → the AND of every number between",
    steps: [
      ["Count shifts.",1,1],
      ["Shift both right until they are equal.",2,2],
      ["The bits that differ would all become 0.",2,2],
      ["Shift the shared part back left.",3,3]
    ]
  },
  "gray-code": {
    goal: "n → an ordering of 0 to 2^n - 1 changing one bit each step",
    steps: [
      ["Make a list of 2^n positions.",0,0],
      ["For position i, take i XOR (i shifted right by one).",0,0],
      ["Neighbours then differ in exactly one bit.",0,0],
      ["It starts at 0 and wraps round correctly.",0,0]
    ]
  },
  "subtract-the-product-and-sum-of-digits-of-an-integer": {
    goal: "a number → product of digits minus sum of digits",
    steps: [
      ["Split the number into digits.",0,0],
      ["Multiply all the digits.",0,0],
      ["Add all the digits.",0,0],
      ["Return the product minus the sum.",0,0]
    ]
  },
  "ugly-number": {
    goal: "a number → true if its only prime factors are 2, 3 and 5",
    steps: [
      ["Zero and negatives are not ugly.",1,1],
      ["Divide out every 2.",2,2],
      ["Then every 3, then every 5.",2,2],
      ["Ugly if only 1 is left.",3,3]
    ]
  },
  "check-if-it-is-a-straight-line": {
    goal: "points → true if they all lie on one line",
    steps: [
      ["Take the first two points to set the direction.",1,1],
      ["For every point, compare its slope with that direction.",2,2],
      ["Cross-multiply instead of dividing, so upright lines work.",2,2],
      ["True if every point matches.",2,2]
    ]
  },
  "rectangle-overlap": {
    goal: "two rectangles → true if they overlap with area",
    steps: [
      ["Find the overlap's width: the smaller right minus the bigger left.",0,0],
      ["Find its height the same way with top and bottom.",0,0],
      ["Both must be above 0.",0,0],
      ["Touching edges give 0, which does not count.",0,0]
    ]
  },
  "factorial-trailing-zeroes": {
    goal: "n → how many zeros n! ends with",
    steps: [
      ["Each zero needs a 5 (2s are plentiful).",0,0],
      ["Count multiples of 5 up to n.",0,0],
      ["Then multiples of 25, 125 and so on.",0,0],
      ["Keep dividing by 5 and adding.",0,0],
      ["Return the total.",0,0]
    ]
  },
  "ugly-number-ii": {
    goal: "n → the n-th ugly number",
    steps: [
      ["Start the list with 1.",1,1],
      ["Keep one pointer each for x2, x3 and x5.",2,2],
      ["The next number is the smallest of the three candidates.",4,4],
      ["Add it to the list.",5,5],
      ["Move on every pointer that made that number.",6,8],
      ["Return the n-th number.",10,10]
    ]
  },
  "find-the-winner-of-the-circular-game": {
    goal: "n friends and a count k → the friend left at the end",
    steps: [
      ["With one friend, the winner is position 0.",0,0],
      ["Grow the circle one friend at a time.",0,0],
      ["The winner shifts by k each time, wrapping round.",0,0],
      ["Convert the position back to a friend number.",0,0]
    ]
  },
  "rectangle-area": {
    goal: "two rectangles → the total area they cover",
    steps: [
      ["Find the overlap's width and height, at least 0.",1,1],
      ["Add both rectangles' areas.",2,2],
      ["Subtract the overlap so it is counted once.",2,2],
      ["Return the total.",2,2]
    ]
  },
  "valid-square": {
    goal: "four points → true if they form a square",
    steps: [
      ["Work out the squared distance for all six pairs.",1,2],
      ["Sort the distances.",3,3],
      ["The four smallest are the equal sides, and above 0.",4,4],
      ["The two biggest are equal diagonals.",4,4],
      ["A diagonal squared is twice a side squared.",4,4]
    ]
  },
  "max-points-on-a-line": {
    goal: "points → the most on one straight line",
    steps: [
      ["A helper finds the greatest common divisor.",1,1],
      ["Take each point as an anchor.",3,3],
      ["For every later point, reduce the direction by its divisor.",6,8],
      ["Flip it so each direction has one form.",9,9],
      ["Count points sharing a direction from the anchor.",10,11],
      ["Keep the biggest count.",12,12],
      ["Return it.",15,15]
    ]
  },
  "number-of-digit-one": {
    goal: "n → how many 1 digits are written from 0 to n",
    steps: [
      ["Look at each digit place: ones, tens, hundreds...",2,2],
      ["Split n into the part above, this digit, and the part below.",3,3],
      ["The part above gives a full set of 1s for this place each time.",4,4],
      ["This digit above 1 adds a full set; equal to 1 adds the part below + 1.",4,4],
      ["Return the total.",6,6]
    ]
  },
  "erect-the-fence": {
    goal: "tree points → the trees on the fence",
    steps: [
      ["Sort the points by x, then y.",1,1],
      ["With fewer than 3 points, all are on the fence.",2,2],
      ["A cross product tells which way three points turn.",3,3],
      ["Build half the fence, popping points that turn the wrong way.",4,4],
      ["Build the other half from the reversed list.",5,5],
      ["Remove repeats.",6,7],
      ["Return the fence points.",8,8]
    ]
  },
  "range-sum-query-mutable": {
    goal: "a list, then update and sumRange calls → each range sum",
    steps: [
      ["Build a Fenwick tree from the numbers.",1,1],
      ["add walks up the tree, adding a change.",2,2],
      ["pre walks down, adding up a prefix.",3,3],
      ["update adds the difference to the tree.",4,4],
      ["A range sum is two prefix sums subtracted.",5,5]
    ]
  },
  "count-of-smaller-numbers-after-self": {
    goal: "numbers → how many smaller numbers sit to the right of each",
    steps: [
      ["Rank the different values from small to large.",1,1],
      ["Make a Fenwick tree of counts.",2,2],
      ["Walk from the right end.",3,3],
      ["Count how many smaller ranks are in the tree.",6,6],
      ["That is this number's answer.",7,7],
      ["Add this number to the tree.",8,8]
    ]
  },
  "reverse-pairs": {
    goal: "numbers → how many pairs have the left more than twice the right",
    steps: [
      ["Copy the numbers.",1,1],
      ["A piece of one number has no pairs.",3,3],
      ["Split in half and count pairs inside each half.",5,5],
      ["Both halves are sorted: count left values more than twice right ones.",6,6],
      ["Sort the piece for the level above.",7,8],
      ["Return the count for the whole list.",11,11]
    ]
  },
  "create-sorted-array-through-instructions": {
    goal: "values inserted one by one → the total insert cost",
    steps: [
      ["Make a Fenwick tree over the values.",1,1],
      ["A helper counts values up to some number.",2,2],
      ["Count values smaller and values larger than this one.",5,5],
      ["Add the smaller of the two to the cost.",6,6],
      ["Add this value to the tree.",7,7],
      ["Return the cost.",9,9]
    ]
  },
  "the-skyline-problem": {
    goal: "buildings → the outline's key points",
    steps: [
      ["Collect every left and right edge, sorted.",1,1],
      ["Visit each edge position.",2,2],
      ["The height there is the tallest building covering it.",4,4],
      ["Record a point only when the height changes.",5,5],
      ["Return the points.",7,7]
    ]
  },
  "range-module": {
    goal: "add, remove and query range calls → each query's answer",
    steps: [
      ["Keep a sorted list of covered ranges.",1,1],
      ["addRange merges every range it touches into one.",4,4],
      ["Then the list is sorted again.",5,5],
      ["queryRange: true if one range covers it all.",7,7],
      ["removeRange keeps ranges that do not touch it.",11,11],
      ["A range it cuts keeps the parts outside.",12,13]
    ]
  },
  "print-in-order": {
    goal: "three calls in any order → first, second, third printed in order",
    steps: [
      ["Make two promises: one done, two done.",1,1],
      ["first prints, then marks one done.",2,2],
      ["second waits for one done, prints, marks two done.",3,3],
      ["third waits for two done, then prints.",4,4]
    ]
  },
  "print-foobar-alternately": {
    goal: "foo and bar tasks → foobar repeated n times",
    steps: [
      ["foo may go first; bar waits for a signal.",1,1],
      ["foo waits its turn, prints, and lets bar go.",2,2],
      ["It also makes a new gate for its own next turn.",2,2],
      ["bar waits its turn, prints, and lets foo go.",3,3],
      ["Each repeats n times.",3,3]
    ]
  },
  "print-zero-even-odd": {
    goal: "three tasks → 0 1 0 2 ... 0 n printed in order",
    steps: [
      ["Keep a gate for each task; zero starts open.",1,1],
      ["Shutting a gate makes a new promise to wait on.",2,2],
      ["zero waits, shuts itself, prints 0, then opens odd or even.",3,3],
      ["odd waits, shuts itself, prints its number, opens zero.",4,4],
      ["even does the same for even numbers.",5,5]
    ]
  },
  "building-h2o": {
    goal: "hydrogen and oxygen calls → atoms released in water groups",
    steps: [
      ["Keep a line of waiting hydrogens and oxygens.",1,1],
      ["A hydrogen joins its line and tries to bond.",2,2],
      ["An oxygen joins its line and tries to bond.",3,3],
      ["While two hydrogens and one oxygen wait, release all three.",4,4]
    ]
  },
  "fizz-buzz-multithreaded": {
    goal: "four tasks → 1 to n printed as numbers, Fizz, Buzz, FizzBuzz",
    steps: [
      ["Keep the current number and a list of waiting tasks.",1,1],
      ["A helper says which task owns a number.",2,2],
      ["Each task waits until the current number is its own.",5,5],
      ["Past n, it stops.",6,6],
      ["It prints and moves the number on.",7,8],
      ["Then wakes every waiting task to check again.",9,9]
    ]
  },
  "the-dining-philosophers": {
    goal: "meal calls → every meal eaten with no fork clashes",
    steps: [
      ["Keep a chain of turns.",1,1],
      ["Each meal waits for the turn before it.",3,3],
      ["Then picks both forks, eats, and puts them down.",3,3],
      ["The next meal waits for this one, even if it failed.",4,4],
      ["Return the meal's promise.",5,5]
    ]
  },
  "traffic-light-controlled-intersection": {
    goal: "arriving cars → each car crosses safely",
    steps: [
      ["The light starts green for road 1; cars take turns.",1,1],
      ["Each car waits for the car before it.",3,3],
      ["If its road is red, turn it green.",3,3],
      ["Then cross and wait until it is done.",3,3],
      ["The next car waits for this one.",4,4]
    ]
  },
  "design-bounded-blocking-queue": {
    goal: "enqueue and dequeue calls → items passed through in order",
    steps: [
      ["Keep the capacity, the items and lines of waiting tasks.",1,1],
      ["enqueue waits while the queue is full.",2,2],
      ["Then adds the item and wakes a waiting taker.",2,2],
      ["dequeue waits while the queue is empty.",3,3],
      ["Then takes the oldest item and wakes a waiting putter.",3,3],
      ["size returns how many items are in it.",4,4]
    ]
  },
  "web-crawler-multithreaded": {
    goal: "a start page and a parser → every page on the same host",
    steps: [
      ["Find the host name; mark the start page seen.",1,1],
      ["Start a level with just the start page.",2,2],
      ["Fetch every page on the level at the same time.",4,4],
      ["Keep links on the same host that are new.",6,6],
      ["Those make the next level.",7,7],
      ["Return every page seen.",9,9]
    ]
  },
  "recyclable-and-low-fat-products": {
    goal: "the Snacks table → ids of snacks that are low fat and recyclable",
    steps: [
      ["FROM: read every row of Snacks.",1,1],
      ["WHERE: keep rows where is_light is 'Y'.",2,2],
      ["AND: green_pack must be 'Y' as well.",2,2],
      ["SELECT: show only snack_id.",0,0]
    ]
  },
  "find-customer-referee": {
    goal: "the Members table → names of members not invited by member 2",
    steps: [
      ["FROM: read every row of Members.",1,1],
      ["WHERE: keep members with no inviter (IS NULL).",2,2],
      ["OR: keep members whose inviter is not 2.",2,2],
      ["NULL never equals or differs from 2, so test it on its own.",2,2],
      ["SELECT: show the name.",0,0]
    ]
  },
  "big-countries": {
    goal: "the Nations table → name, people and area of every big nation",
    steps: [
      ["FROM: read every row of Nations.",1,1],
      ["WHERE: keep nations with area at least 2000000.",2,2],
      ["OR: keep nations with at least 40000000 people.",2,2],
      ["SELECT: show name, people and area in that order.",0,0]
    ]
  },
  "article-views-i": {
    goal: "the Reads table → each writer who read their own post, once",
    steps: [
      ["FROM: read every row of Reads.",1,1],
      ["WHERE: keep rows where the writer is also the reader.",2,2],
      ["SELECT DISTINCT: one row per writer, named writer.",0,0],
      ["ORDER BY: smallest writer id first.",3,3]
    ]
  },
  "invalid-tweets": {
    goal: "the Notes table → ids of notes longer than 20 characters",
    steps: [
      ["FROM: read every row of Notes.",1,1],
      ["WHERE: measure the body with LENGTH.",2,2],
      ["Keep notes whose length is more than 20.",2,2],
      ["SELECT: show only note_id.",0,0]
    ]
  },
  "combine-two-tables": {
    goal: "People and Homes → every person with their city and region",
    steps: [
      ["FROM: start with every person.",1,1],
      ["LEFT JOIN: attach the home row with the same person_id.",2,2],
      ["A LEFT JOIN keeps people with no home; their columns are NULL.",2,2],
      ["SELECT: first_name, last_name, city and region.",0,0]
    ]
  },
  "replace-employee-id-with-the-unique-identifier": {
    goal: "Staff and Badges → every staff name with their badge number",
    steps: [
      ["FROM: start with every member of staff.",1,1],
      ["LEFT JOIN: attach the badge with the same staff_id.",2,2],
      ["Staff with no badge stay, with a NULL badge_no.",2,2],
      ["SELECT: badge_no, then name.",0,0]
    ]
  },
  "customer-who-visited-but-did-not-make-any-transactions": {
    goal: "visits and payments → per shopper, the visits that had no payment",
    steps: [
      ["FROM: start with every stall visit.",1,1],
      ["LEFT JOIN: attach a payment for the same visit, if any.",2,2],
      ["WHERE: keep visits where no payment matched (payment_id IS NULL).",3,3],
      ["GROUP BY: one group per shopper.",4,4],
      ["SELECT: shopper_id and COUNT(*) as count_no_pay.",0,0]
    ]
  },
  "employees-earning-more-than-their-managers": {
    goal: "the Crew table → names of sailors paid more than their boss",
    steps: [
      ["FROM: take each sailor as c.",1,1],
      ["JOIN: pair them with their boss, a second copy of Crew.",2,2],
      ["WHERE: keep pairs where the sailor's pay beats the boss's.",3,3],
      ["SELECT: the sailor's name, as crew.",0,0]
    ]
  },
  "customers-who-never-order": {
    goal: "Buyers and Purchases → names of buyers with no order",
    steps: [
      ["FROM: read every buyer.",1,1],
      ["Inner query: list every buyer_id that appears in Purchases.",2,2],
      ["WHERE: keep buyers whose id is NOT IN that list.",2,2],
      ["SELECT: the name, as buyer.",0,0]
    ]
  },
  "duplicate-emails": {
    goal: "the Subscribers table → each email signed up more than once",
    steps: [
      ["FROM: read every row of Subscribers.",1,1],
      ["GROUP BY: one group per email.",2,2],
      ["HAVING: keep groups with more than one row.",3,3],
      ["SELECT: show the email of each kept group.",0,0]
    ]
  },
  "rising-temperature": {
    goal: "daily Readings → ids of days warmer than the day before",
    steps: [
      ["FROM: take each reading as the earlier day, a.",1,1],
      ["JOIN: pair it with a reading exactly one day later, b.",2,2],
      ["julianday turns a date into a day count, so the gap must be 1.",2,2],
      ["WHERE: keep pairs where b is warmer than a.",3,3],
      ["SELECT: the later day's reading_id.",0,0]
    ]
  },
  "delete-duplicate-emails": {
    goal: "Subscribers → the same table with one row per email",
    steps: [
      ["Inner query: group rows by email.",1,1],
      ["For each group keep the smallest signup_id.",1,1],
      ["DELETE FROM Subscribers: remove rows from this table.",0,0],
      ["WHERE: delete rows whose id is NOT IN those kept ids.",1,1]
    ]
  },
  "average-selling-price": {
    goal: "price tags and sales → each item's average price, rounded",
    steps: [
      ["FROM: start with every price tag.",1,1],
      ["LEFT JOIN: attach sales of the same item inside the tag's dates.",2,2],
      ["GROUP BY: one group per item.",3,3],
      ["Money taken = SUM(price x units); divide by SUM(units) as a decimal.",0,0],
      ["COALESCE gives 0 for items never sold; ROUND to 2 places.",0,0]
    ]
  },
  "queries-quality-and-percentage": {
    goal: "search results → per term, quality and percent of poor results",
    steps: [
      ["FROM: read every row of Results.",1,1],
      ["GROUP BY: one group per term.",2,2],
      ["quality: average of stars / spot; multiply by 1.0 first.",0,0],
      ["poor_pct: average of 100 for under 3 stars, else 0.",0,0],
      ["SELECT: term with both values rounded to 2 places.",0,0]
    ]
  },
  "patients-with-a-condition": {
    goal: "the Pets table → pets with at least one allergy code",
    steps: [
      ["FROM: read every row of Pets.",1,1],
      ["WHERE: a code starting the text matches 'ALG%'.",2,2],
      ["OR: a code after a space matches '% ALG%'.",2,2],
      ["A code like MALG3 matches neither, so it is left out.",2,2],
      ["SELECT: pet_id, name and tags.",0,0]
    ]
  },
  "second-highest-salary": {
    goal: "the Wages table → the second highest different wage, or NULL",
    steps: [
      ["Inner query: take the different wages with DISTINCT.",0,0],
      ["ORDER BY wage DESC: highest first.",0,0],
      ["LIMIT 1 OFFSET 1: skip the top one and take the next.",0,0],
      ["Wrapping it in an outer SELECT gives NULL when there is none.",0,0]
    ]
  },
  "nth-highest-salary": {
    goal: "Wages and the number n → the n-th highest different wage, or NULL",
    steps: [
      ["Inner query: give each wage a rank, highest first.",1,1],
      ["DENSE_RANK gives equal wages the same rank, with no gaps.",1,1],
      ["WHERE: keep wages whose rank equals n from Pick.",2,2],
      ["SELECT MAX(wage): one row, NULL when nothing is left.",0,0]
    ]
  },
  "rank-scores": {
    goal: "quiz entries → every score with its place",
    steps: [
      ["FROM: read every row of Entries.",1,1],
      ["DENSE_RANK over scores, highest first, gives the place.",0,0],
      ["Equal scores share a place, and the next place has no gap.",0,0],
      ["ORDER BY: highest score first.",2,2]
    ]
  },
  "consecutive-numbers": {
    goal: "rolls in order → each face that came up three times in a row",
    steps: [
      ["Inner query: for each roll, look at the face before and after.",1,1],
      ["LAG gives the previous roll, LEAD gives the next one.",1,1],
      ["WHERE: keep rolls that match both neighbours.",2,2],
      ["SELECT DISTINCT: show each such face once.",0,0]
    ]
  },
  "department-highest-salary": {
    goal: "Members and Teams → the top earners of each team",
    steps: [
      ["FROM: start with every member.",1,1],
      ["JOIN: attach their team's name.",2,2],
      ["Inner query: find the highest pay in this member's team.",3,3],
      ["WHERE: keep members whose pay equals that highest pay.",3,3],
      ["SELECT: team name, member name and pay.",0,0]
    ]
  },
  "managers-with-at-least-5-direct-reports": {
    goal: "the Workers table → names of leads with five or more reports",
    steps: [
      ["Inner query: group workers by lead_id.",2,2],
      ["HAVING: keep leads with at least 5 workers.",2,2],
      ["FROM: take each worker as a possible lead.",1,1],
      ["JOIN: keep workers whose id is one of those leads.",2,2],
      ["SELECT: their name, as lead.",0,0]
    ]
  },
  "confirmation-rate": {
    goal: "accounts and codes → each account's confirmed share, rounded",
    steps: [
      ["FROM: start with every account.",1,1],
      ["LEFT JOIN: attach every code sent to it, if any.",2,2],
      ["GROUP BY: one group per account.",3,3],
      ["Average 1.0 for confirmed codes and 0 for others.",0,0],
      ["COALESCE gives 0 for accounts with no codes; ROUND to 2 places.",0,0]
    ]
  },
  "monthly-transactions-i": {
    goal: "payments → per month and country, counts and totals",
    steps: [
      ["FROM: read every payment.",1,1],
      ["Cut the first 7 characters of the date to get the month.",0,0],
      ["GROUP BY: one group per month and country.",2,2],
      ["Count all rows, and add up state = 'approved' for approved ones.",0,0],
      ["Add up all amounts, and only approved amounts with CASE.",0,0]
    ]
  },
  "game-play-analysis-iv": {
    goal: "daily plays → the share of players back the day after their first",
    steps: [
      ["Inner query: each player's first day, with MIN(day).",1,1],
      ["LEFT JOIN: look for a play by them on the next day.",2,2],
      ["date(first_day, '+1 day') gives that next day.",2,2],
      ["Count the players found, divided by all players.",0,0],
      ["ROUND the share to 2 places.",0,0]
    ]
  },
  "exchange-seats": {
    goal: "numbered chairs → each guest after swapping pairs of chairs",
    steps: [
      ["FROM: read every chair.",1,1],
      ["CASE: an odd chair that is the last one keeps its number.",0,0],
      ["Any other odd chair moves up by one.",0,0],
      ["An even chair moves down by one.",0,0],
      ["ORDER BY: sort by the new chair number.",2,2]
    ]
  },
  "department-top-three-salaries": {
    goal: "Members and Teams → every top-three earner in every team",
    steps: [
      ["Inner query: rank pay inside each team, highest first.",1,1],
      ["DENSE_RANK with PARTITION BY team gives equal pays one rank.",1,1],
      ["JOIN: attach the team's name.",2,2],
      ["WHERE: keep ranks 1 to 3.",3,3],
      ["SELECT: team name, member name and pay.",0,0]
    ]
  },
  "trips-and-users": {
    goal: "rides and people → the cancel rate per day without banned people",
    steps: [
      ["FROM: start with every ride.",1,1],
      ["JOIN: keep rides whose rider is not banned.",2,2],
      ["JOIN: keep rides whose driver is not banned.",3,3],
      ["WHERE: keep the three days asked for.",4,4],
      ["GROUP BY: one group per day.",5,5],
      ["Average 1.0 for cancelled rides, else 0; ROUND to 2 places.",0,0]
    ]
  },
  "human-traffic-of-stadium": {
    goal: "daily visits → rows in runs of 3+ busy days in a row",
    steps: [
      ["WITH busy: keep days with a crowd of 100 or more.",0,0],
      ["visit_id minus its row number is the same along a run.",0,0],
      ["Inner query: group by that run label, keep runs of 3 or more.",3,3],
      ["WHERE: keep busy rows whose run is one of those.",2,3],
      ["SELECT: visit_id, day and crowd.",1,1],
      ["ORDER BY: by day.",4,4]
    ]
  }
};

// The reference solution as the lines the plan's ranges point into.
function dedentLines(lines) {
  const body = lines.slice(1).filter((l) => l.trim());
  const cut = body.length ? Math.min(...body.map((l) => l.match(/^ */)[0].length)) : 0;
  return lines.map((l, i) => (i === 0 ? l : l.slice(Math.min(cut, l.match(/^ */)[0].length))));
}
// A one-line SQL reference, cut before each top-level clause so a plan step can point at its own clause.
function sqlPlanLines(q) {
  const KW = /^(LEFT JOIN|INNER JOIN|JOIN|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT|SELECT|UNION ALL|UNION)\b/i;
  const out = [];
  let cur = '', depth = 0, quote = null;
  for (let i = 0; i < q.length; i++) {
    const c = q[i];
    if (quote) { cur += c; if (c === quote) quote = null; continue; }
    if (c === "'" || c === '"') { quote = c; cur += c; continue; }
    if (c === '(') depth++;
    else if (c === ')') depth--;
    if (depth === 0 && (i === 0 || /\s/.test(q[i - 1]))) {
      const m = q.slice(i).match(KW);
      const glued = m && ((/^FROM/i.test(m[1]) && /\bDELETE\s*$/i.test(cur)) || (/^JOIN/i.test(m[1]) && /\b(LEFT|INNER)\s*$/i.test(cur)));
      if (m && cur.trim() && !glued) { out.push(cur.trim()); cur = ''; }
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
function planRefLines(id, spec) {
  if (!spec) return [];
  if (typeof spec.ref === 'string') return sqlPlanLines(spec.ref);
  return dedentLines(spec.ref.toString().split('\n'));
}
function planFor(id) { return PLANS[id] || null; }
// Comment marker per editor language, for "Insert plan as comments".
const PLAN_COMMENT = { py: '#', js: '//', java: '//', cpp: '//', go: '//', sql: '--' };
function planCommentLines(plan, lang) {
  const c = PLAN_COMMENT[lang] || '//';
  return [c + ' Plan: ' + plan.goal].concat(plan.steps.map((s, i) => c + ' ' + (i + 1) + '. ' + s[0]));
}
// Drop the plan into code as comments: inside the function, right under its first line when that line is found,
// else at the top. Returns the code unchanged when the plan is already there.
function insertPlanComments(code, plan, lang, sigLine) {
  const lines = planCommentLines(plan, lang);
  if (code.indexOf(lines[1]) >= 0) return code;
  const rows = code.split('\n');
  let at = -1;
  const head = (sigLine || '').trim();
  if (head) at = rows.findIndex((r) => r.trim() === head);
  if (at < 0) return lines.join('\n') + '\n' + code;
  const next = rows.slice(at + 1).find((r) => r.trim()) || '';
  const pad = (next.match(/^\s*/) || [''])[0] || (lang === 'js' ? '  ' : '    ');
  rows.splice(at + 1, 0, ...lines.map((l) => pad + l));
  return rows.join('\n');
}
// "Order the steps": a shuffle that is never the plan's own order (fixed per problem, so it does not jump on re-render).
function planShuffle(id, n) {
  let seed = 0;
  for (const ch of String(id)) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; };
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  if (a.every((x, i) => x === i)) a.reverse();
  return a;
}
// order: step indexes in the learner's order. Right only when it is the plan's order (or swaps two steps with the same text).
function planOrderRight(plan, order) {
  if (!plan || !Array.isArray(order) || order.length !== plan.steps.length) return false;
  return order.every((k, i) => k === i || (plan.steps[k] && plan.steps[i] && plan.steps[k][0] === plan.steps[i][0]));
}
// How many steps sit in their right place (for feedback).
function planOrderScore(plan, order) { return order.filter((k, i) => k === i).length; }
// The optional order game is offered to beginners: Starter and Easy problems, and the Start here track when it ships.
function planOffersOrder(id, diff) {
  if (diff === 'Starter' || diff === 'Easy') return true;
  return typeof START_HERE_IDS !== 'undefined' && Array.isArray(START_HERE_IDS) && START_HERE_IDS.indexOf(id) >= 0;
}
// Story pages: the plan step that explains a story step kind (first match), or -1.
function planStepForKind(plan, kind) {
  if (!plan || !kind) return -1;
  return plan.steps.findIndex((s) => (s[3] || '').split('|').indexOf(kind) >= 0);
}
if (typeof module !== 'undefined' && module.exports) module.exports = { PLANS, planFor, planRefLines, sqlPlanLines, dedentLines, planCommentLines, insertPlanComments, planShuffle, planOrderRight, planOrderScore, planOffersOrder, planStepForKind, PLAN_COMMENT };
// @@END-PLANS@@
