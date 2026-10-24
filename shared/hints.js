// @@HINTS@@ — generated block (from shared/hints.js), used by the Code page and tests/plancheck.js.
// The hint ladder for every coding problem, written for DSAMaxxing, revealed one at a time:
//   hints  exactly three: [nudge, approach, key trick]. The approach is the problem's line on the master sheet.
//   why    one line per example in the spec, in the same order: why that output is right.
const HINTS = {
  "two-sum-ii": {
    hints: ["The list is already sorted. What does that tell you when a sum is too big?","Sum too small? Move the left pointer up. Too big? Move the right pointer down.","A value that is too big even with the smallest partner can never be in the answer, so drop it."],
    why: ["4 + 6 = 10, and they sit at positions 3 and 4.","-3 + 2 = -1: positions 1 and 3.","The only pair is 5 + 5."]
  },
  "valid-palindrome": {
    hints: ["Spaces, commas and case do not count. What is left to compare?","Skip anything that is not a letter or digit, then compare the two ends, ignoring case.","Compare from both ends inward, so you never need a cleaned copy of the string."],
    why: ["Read as \"steponnopets\", it is the same both ways.","\"raceacar\" reversed is \"racaecar\".","Nothing is left after skipping the space, and an empty string reads the same."]
  },
  "container": {
    hints: ["The water is limited by one of the two planks. Which one?","The shorter wall limits the water, so always move the shorter wall inward.","Moving the taller plank can never help: the width shrinks and the height is still capped by the shorter one."],
    why: ["Planks 5 and 3 are 3 apart: 3 x 3 = 9; planks 5 and 8: 5 x 2 = 10, the best.","Two planks of height 1, one apart.","The two 4s are 4 apart: 4 x 4 = 16."]
  },
  "longest-substring": {
    hints: ["Think of a window that only grows on the right and only shrinks on the left.","On a repeat, jump the left edge just past where that letter was last seen.","Store where each character was last seen, so the left edge can jump straight past a repeat."],
    why: ["\"lanter\" has 6 different letters; the next n repeats.","Every stretch longer than 1 repeats z.","An empty string has no stretch at all."]
  },
  "char-replacement": {
    hints: ["Which letters do you repaint in a window? Not the most common one.","Window size minus the most common letter count must stay at or below k.","The window is fine while its size minus its top letter count is at most k."],
    why: ["No repaints: \"AA\" is the longest run.","Repaint the A to get \"BBBB\".","Repaint one letter of any pair, like \"AB\" to \"AA\"."]
  },
  "best-time-stock": {
    hints: ["You must buy before you sell. What is the best day to have bought, for each selling day?","Remember the cheapest price so far. Each day, check what selling today would earn.","You only need the lowest price seen so far, not every earlier day."],
    why: ["Buy at 2, sell at 7: profit 5.","Prices only fall, so you never sell.","One day means no later day to sell on."]
  },
  "contains-duplicate": {
    hints: ["You only need to know if any value shows up a second time.","Drop each number into a set. If it is already there, you found a repeat.","A set keeps one copy of each value, so a repeat makes it smaller than the list."],
    why: ["9 appears twice.","All four values differ.","An empty list has no repeats."]
  },
  "two-sum": {
    hints: ["For each number, you already know exactly which partner it needs.","For each number, look up the partner you need in a map of numbers seen so far.","Look the partner up before storing the number, so a number never pairs with itself."],
    why: ["9 + 2 = 11, at indexes 1 and 3.","4 + 4 = 8, two different positions.","-2 + 3 = 1, at indexes 0 and 2."]
  },
  "valid-anagram": {
    hints: ["Order does not matter, only how many of each letter.","Count letters up for one word and down for the other. Every count must end at zero.","Different lengths can never match, so check that first."],
    why: ["Both use e, i, l, n, s, t once.","\"tile\" has an l, \"tide\" has a d instead.","The lengths differ."]
  },
  "min-window": {
    hints: ["Grow a window until it covers t, then try to make it shorter.","Grow until every needed letter is covered, then squeeze from the left and record the shortest.","Keep one number, missing, so you know in one step when the window covers every letter."],
    why: ["\"worl\" holds o, w and l and nothing shorter does.","d never appears in s.","Both letters are needed, so the whole string."]
  },
  "longest-palindrome": {
    hints: ["Every palindrome has a middle. How many middles can a string have?","Grow outward from every centre, both on a letter and between two letters.","Try both kinds of middle: on a letter (odd length) and between two letters (even length)."],
    why: ["\"racecar\" reads the same both ways.","\"bb\" grows from the gap between the two b's.","A single letter is a palindrome."]
  },
  "3sum": {
    hints: ["Fix one number. Then you need two others that add up to minus that number.","Sort, fix one number, then run Two Sum II on the rest. Skip repeated values.","Sorting first lets you skip repeated values, so no trio shows up twice."],
    why: ["-2 + 0 + 2 = 0 and -2 + 1 + 1 = 0.","All numbers are positive, so no trio reaches 0.","Only one different trio, even with four zeros."]
  },
  "trapping-rain": {
    hints: ["How much water sits on one bar? It depends on the tallest walls on each side.","Water above a bar is the lower of the tallest wall on each side. Walk in from the side with the lower wall.","Walk in from the side with the lower wall: that wall is the limit there, whatever lies beyond."],
    why: ["The walls 3 and 4 hold 3 + 1 + 3 = 7 units.","The heights only rise, so water runs off.","The two 5s hold 4 units over the 1."]
  },
  "move-zeroes": {
    hints: ["You want every non-zero number in order at the front.","A writer pointer marks where the next non-zero goes. A reader walks ahead and hands them over.","Swap each non-zero into the next free front spot; the zeros drift to the back by themselves."],
    why: ["3, 7, 9 move forward and the two zeros end up last.","The 4 moves in front of the 0.","The 1 moves to the front."]
  },
  "product-except-self": {
    hints: ["The answer at a spot is everything to its left times everything to its right.","Multiply the product of everything to the left by the product of everything to the right.","Two passes: store the left products, then multiply in the right products on the way back."],
    why: ["3 x 4 = 12, 2 x 4 = 8, 2 x 3 = 6.","Every product except the zero's own spot includes the zero.","For -1: 2 x -3 x 4 = -24, and so on."]
  },
  "subarray-sum-k": {
    hints: ["A stretch from i to j adds up to (running total at j) minus (running total before i).","Count how often each running total appears. Look up total minus k at every step.","Count how often each running total appeared, and look up total minus k at every step."],
    why: ["1+2, 2+1, 1+2 and 2+1 again: four stretches.","[1,-1], [0] and [1,-1,0] each add up to 0.","The single 5 is the stretch."]
  },
  "binary-search": {
    hints: ["Each look at the middle can rule out half the list.","Look at the middle and throw away the half that cannot hold the target.","Keep searching while lo is not past hi; move past the middle, never onto it."],
    why: ["8 sits at index 3.","5 would sit between 2 and 6, but it is not there.","One number, and it is the target."]
  },
  "search-rotated": {
    hints: ["Cut the list at the middle. At least one half is still in sorted order.","One half is always sorted. Check if the target fits there, else search the other half.","Check if the target fits inside the sorted half; if not, it must be in the other one."],
    why: ["3 is at index 4, in the part after the cut.","8 is not in the list.","One number, and it is the target."]
  },
  "find-min-rotated": {
    hints: ["The smallest value sits right after the drop in the list.","Compare the middle with the right end to tell which side holds the drop.","Compare the middle with the right end: bigger means the drop is to the right."],
    why: ["The drop is from 6 to 1.","Not rotated, so the first value is smallest.","One value."]
  },
  "rotate-image": {
    hints: ["A quarter turn can be built from two simpler moves.","Turning a quarter clockwise is a transpose followed by flipping each row.","Flip over the diagonal (rows become columns), then reverse each row."],
    why: ["The left column 1, 3 becomes the top row 3, 1.","The first column read bottom up becomes the first row: 6, 3, 0.","Same turn with negative numbers."]
  },
  "merge-intervals": {
    hints: ["Meetings that overlap must sit next to each other once they are in order.","Sort by start. Merge whenever the next start is not after the current end.","Sort by start; then each meeting only needs comparing with the last merged one."],
    why: ["[1,4] and [2,6] overlap into [1,6]; [8,9] stays.","They do not overlap; sorted, they stay apart.","Touching at 3 counts, so they merge."]
  },
  "insert-interval": {
    hints: ["The list is already sorted. Split it into before, overlapping and after.","Copy the ones that end before, merge the ones that overlap, then copy the rest.","Widen the new meeting while the next one starts at or before its end."],
    why: ["[3,4] fits between the other two.","[2,5] overlaps [1,3] and [4,6], making [1,6].","An empty list just gets the new meeting."]
  },
  "jump-game": {
    hints: ["You do not need to try every path. What is the farthest you could ever reach?","Track the farthest spot you can reach. If you stand beyond it, you are stuck.","If you are standing past the farthest reach, you are stuck for good."],
    why: ["From 0 jump to 2, then 1 more to the last stone.","Stone 1 has jump 0, and stone 2 is out of reach.","You already stand on the last stone."]
  },
  "subsets": {
    hints: ["Each number is either in a subset or not.","For each number, choose: leave it out or put it in.","Build up: each new number doubles the list by adding itself to every subset so far."],
    why: ["Four subsets for two numbers.","Empty, and just 0.","Eight subsets for three numbers."]
  },
  "permutations": {
    hints: ["Fill the first seat, then the second, and so on.","Fill each position with any unused number, then undo and try the next.","After trying a number in a seat, take it back out so the next one can try."],
    why: ["Two orderings of two numbers.","One number, one ordering.","Six orderings of three numbers."]
  },
  "combination-sum": {
    hints: ["Build a combination one number at a time, never going over the target.","You may reuse a number, so stay on the same index after picking it. Stop when the sum goes over.","Only try candidates from the current one onward, so the same set is not found twice in another order."],
    why: ["4 + 4 and 3 + 5 both make 8.","2 is already bigger than 1.","1 + 1 + 1 = 3."]
  },
  "group-anagrams": {
    hints: ["Words that use the same letters need the same label.","Give every word a key, its sorted letters or letter counts, and group by that key.","Sorting a word's letters gives a key that all its anagrams share."],
    why: ["listen, silent and enlist share the letters e, i, l, n, s, t.","One empty word in one group.","ab and ba match; abc is alone."]
  },
  "longest-consecutive": {
    hints: ["Sorting would work, but can you do it in one pass with a set?","Put all numbers in a set. Only start counting from a number whose smaller neighbour is missing.","Only start counting at a number whose smaller neighbour is missing, so each run is counted once."],
    why: ["1, 2, 3, 4 is the longest run.","No numbers, no run.","5 and 6; the repeat does not add length."]
  },
  "valid-parentheses": {
    hints: ["The most recent opener must be closed first.","Push openers. Each closer must match the opener on top.","A stack keeps the openers in order; a closer must match the one on top."],
    why: ["Every bracket closes in the right order.","] tries to close [ while { is still open on top.","Two openers are never closed."]
  },
  "daily-temperatures": {
    hints: ["Some days are still waiting for a warmer day. Which ones?","Keep a stack of days still waiting for a warmer one. A warm day pops them and sets their wait.","Keep the waiting days on a stack; a warm day pops every cooler one and sets its wait."],
    why: ["30 waits 1 day for 32, 32 waits 2 days for 35.","It only gets colder, so all 0.","The two 20s wait 2 and 1 days for 21."]
  },
  "min-stack": {
    hints: ["After a pop, how do you know the minimum of what is left?","Store the smallest-so-far next to every pushed value.","Store, next to each value, the smallest value up to that point."],
    why: ["The min stays 3 after 7 is pushed and popped; top is 3.","One value is both the top and the min.","After popping 0, the min goes back to 1."]
  },
  "kth-largest": {
    hints: ["You do not need the whole list in order, only the k-th spot.","A min heap of size k, or quickselect for average linear time.","Sort from biggest to smallest and read position k - 1 (a heap of size k is faster)."],
    why: ["Largest is 5, second largest is 4.","Repeats count, so the 2nd largest is still 7.","One number."]
  },
  "top-k-frequent": {
    hints: ["First you need to know how often each value appears.","Count, then keep the k biggest counts in a small heap or in buckets by count.","Count with a map, then sort the values by count and take the first k."],
    why: ["4 appears 3 times and 6 twice.","One value.","3 appears most, three times."]
  },
  "sliding-window-max": {
    hints: ["When a bigger number arrives, the smaller ones before it can never be a window max again.","Keep a deque of indexes with falling values. The front is the window maximum.","Keep a queue of indexes with falling values; drop the front when it leaves the window."],
    why: ["Each window of 3 contains the 5.","With k = 1 each number is its own window.","Each pair's bigger value: 9, 8, 7."]
  },
  "reverse-linked-list": {
    hints: ["Each node needs to point back at the one before it.","Walk the list with prev and current. Point each node back before you move on.","Save the next node before you change the pointer, or you lose the rest of the list."],
    why: ["9 now comes first.","Two nodes swap order.","An empty list stays empty."]
  },
  "linked-list-cycle": {
    hints: ["If the list loops, a runner going around will never reach the end.","If there is a loop, the fast pointer will lap the slow one and they meet.","A fast pointer moving two steps will catch a slow one moving one step inside any loop."],
    why: ["The last node points back to index 1, so it loops.","The list ends.","The one node points to itself."]
  },
  "middle-of-list": {
    hints: ["How do you find the middle without counting the nodes first?","The fast pointer moves two steps for every one. When it stops, the slow one is in the middle.","When the fast pointer has gone twice as far and stops, slow is at the middle."],
    why: ["20 is the middle of three nodes.","With four nodes, the second middle is 3.","One node is its own middle."]
  },
  "merge-two-lists": {
    hints: ["Both lists are sorted, so the smallest node left is always at one of the two fronts.","Keep a dummy head. Always attach the smaller of the two front nodes.","A dummy start node saves you from special-casing the first node."],
    why: ["Take 1, 2, 3, 4, 5 in turn from the two fronts.","The empty list adds nothing.","Equal values may come from either list."]
  },
  "remove-nth": {
    hints: ["Counting from the end is hard on a one-way list. Can two pointers help?","Send one pointer n steps ahead, then move both. When the leader stops, the trailer is just before the target.","Put a dummy before the head so removing the first node works the same way."],
    why: ["30 is second from the end.","Removing the only node leaves nothing.","The last node, 2, is removed."]
  },
  "merge-k-lists": {
    hints: ["It is like merging two lists, but with k fronts to choose from.","Put each list's head in a min heap. Pop the smallest and push its next node.","Collect every node, sort them by value, and relink them in order (a heap does it faster)."],
    why: ["All seven values in sorted order.","No lists, no nodes.","The empty list adds nothing."]
  },
  "invert-tree": {
    hints: ["What does the mirror of a tree look like at the root?","Swap the two children, then do the same for each child.","Swap the two children of a node, then repeat for each child."],
    why: ["3 and 8 swap places, and so do 1 and 4.","1 moves from the left to the right.","An empty tree stays empty."]
  },
  "max-depth": {
    hints: ["The depth of a tree depends on the depth of its two subtrees.","Depth is one plus the deeper of the two children.","An empty spot has depth 0, which makes the rule work at the leaves."],
    why: ["8, 4, 6 is the longest path: 3 nodes.","An empty tree has depth 0.","1 then 2: two nodes."]
  },
  "validate-bst": {
    hints: ["Checking only a node's own children is not enough.","Pass down the allowed low and high limits. Every node must sit inside them.","Pass a low and high limit down the tree; every node must fit inside its limits."],
    why: ["3 is left of 5 and 8 is right of 5.","6 sits in 5's left subtree but is bigger than 5.","Equal values are not strictly smaller."]
  },
  "level-order": {
    hints: ["Visit the tree one floor at a time.","Use a queue. Note its size, then empty exactly that many nodes for one level.","Build each next floor from the children of the floor you just recorded."],
    why: ["Floor by floor: 1, then 2 and 3, then 4.","An empty tree has no floors.","One node, one floor."]
  },
  "right-side-view": {
    hints: ["From the right, which node can you see on each floor?","Go level by level and keep the last node of each level.","Go floor by floor and keep only the last node of each floor."],
    why: ["1, then 3, then 4 on the third floor.","An empty tree shows nothing.","6, then 7 on the right."]
  },
  "number-of-islands": {
    hints: ["Each time you find new land, that is a new island. How do you avoid counting it twice?","Each new land cell starts an island. Sink all the land connected to it.","Sink every land cell of an island as soon as you find it."],
    why: ["Top-left group of three cells, and the single cell bottom-right.","Only water.","Three single cells of land, split by water."]
  },
  "rotting-oranges": {
    hints: ["Rot spreads from every rotten orange at the same time.","Start the queue with every rotten orange at once. Each ring of the queue is one minute.","Start the queue with all rotten oranges; each round of the queue is one minute."],
    why: ["The rot needs 3 minutes to reach the last fresh orange.","No fresh oranges, so 0 minutes.","The fresh orange is cut off by the empty cell."]
  },
  "clone-graph": {
    hints: ["Graphs can loop. How do you avoid copying a node twice?","Map each old node to its copy. Make a copy on first visit, then wire up the neighbours.","Keep a map from each original node to its copy, and check it before making a new one."],
    why: ["Three nodes all joined, copied with the same links.","One node with no neighbours.","An empty graph copies to nothing."]
  },
  "course-schedule": {
    hints: ["Which courses can you take right away?","Take courses with no remaining requirements first. If some never free up, there is a cycle.","Count each course's missing prerequisites; when a count hits 0, it can be taken."],
    why: ["Take 0, then 1, then 2.","0, 1 and 2 each wait for another: a loop.","One course with no rules."]
  },
  "word-search": {
    hints: ["Start from each cell and try to follow the word one letter at a time.","From each cell, follow the next letter in four directions. Mark cells on the way in and clear them on the way out.","Mark a cell while it is in use, and unmark it when you step back."],
    why: ["C, A, then R below the A.","There is no O next to the C.","One cell, one letter."]
  },
  "climbing-stairs": {
    hints: ["To stand on step n, what was your last move?","Ways to reach a step are the ways to reach the step before plus the one two below.","ways(n) = ways(n - 1) + ways(n - 2), so only two numbers need keeping."],
    why: ["1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2.","One step, one way.","The counts grow 1, 2, 3, 5, 8, 13."]
  },
  "house-robber": {
    hints: ["At each house you either take it or skip it.","At each house: skip it, or take it and add the best from two houses back.","Keep two totals as you go: best if you took the last house, and best if you skipped it."],
    why: ["3 + 4 + 5 = 12.","Take only the middle 9.","One house."]
  },
  "max-subarray": {
    hints: ["At each number, is it worth carrying the stretch before it?","Either extend the running sum or start fresh here, whichever is bigger.","If the running sum goes below the current number, start a new stretch here."],
    why: ["3 - 2 + 4 = 5.","All negative: the best single number is -2.","One number."]
  },
  "coin-change": {
    hints: ["Work out the answer for every smaller amount first.","Fewest coins for an amount is one plus the best for that amount minus each coin.","best(a) = 1 + the smallest best(a - coin) over every coin that fits."],
    why: ["4 + 4 = 8 uses 2 coins.","A 3 coin cannot make 2.","Amount 0 needs no coins."]
  },
  "lis": {
    hints: ["For each length, what is the smallest number a run of that length can end with?","Keep the smallest possible tail for each length and binary search where each number goes.","Replacing a tail with a smaller number never hurts, and keeps the tails sorted for binary search."],
    why: ["1, 4, 5, 9 (or 1, 4, 5, 6).","It only falls.","Equal values do not increase."]
  },
  "word-break": {
    hints: ["Can the first i letters be cut into words? Answer that for every i.","A prefix works if some shorter good prefix is followed by a dictionary word.","Position i works if some earlier good position j has a word from j to i."],
    why: ["\"ice\" + \"cream\".","\"hell\" leaves \"o\", which is not a word.","\"dog\" + \"sled\" works."]
  },
  "unique-paths": {
    hints: ["You can only enter a cell from above or from the left.","Paths into a cell are the paths from above plus the paths from the left.","paths(cell) = paths(above) + paths(left), and one row of numbers is enough."],
    why: ["Right-right-down, right-down-right, down-right-right.","A 1 by 1 grid: you are already there.","20 ways across a 4 by 4 grid."]
  },
  "reverse-string": {
    hints: ["Reverse in place: no new list.","Swap the two ends, then step both inward until they meet.","Swap the first and last, then move both ends inward."],
    why: ["h and p swap; o stays in the middle.","The two letters swap.","x and the last y swap."]
  },
  "squares-of-a-sorted-array": {
    hints: ["Negative numbers can have big squares. Where are the biggest squares?","The biggest square is at one of the two ends. Fill the answer from the back.","The biggest square is always at one of the two ends, so fill the answer from the back."],
    why: ["Squares 9, 1, 0, 4 sorted are 0, 1, 4, 9.","Already positive and sorted.","25 and 16 swap order."]
  },
  "merge-sorted-array": {
    hints: ["Filling from the front would overwrite numbers you still need.","Fill from the back of the bigger array so nothing gets overwritten.","Start from the back: the biggest number goes into the last empty slot."],
    why: ["7, 5, 4, 2, 1 are written from the back.","nums1 has no real numbers, so it takes 3.","Nothing to merge in."]
  },
  "sort-colors": {
    hints: ["Only three values. Can you sort with swaps in one pass?","Three pointers: zeros grow from the left, twos from the right, and a middle scanner decides.","Keep 0s growing from the left and 2s from the right; a 2 swapped in must be checked again."],
    why: ["Two 0s, then 1, then 2.","The 2 and 1 swap.","The 1 and 0 swap."]
  },
  "is-subsequence": {
    hints: ["Walk through t once. When does the pointer in s move?","Walk the long string once and move the short pointer only on a match.","Move the pointer in s only on a match; extra letters in t are skipped."],
    why: ["a, c and e appear in order.","e comes after c in t, not before it.","An empty s is always found."]
  },
  "permutation-in-string": {
    hints: ["A reshuffle of s1 has the same length and the same letter counts.","Slide a window the length of the short string and compare letter counts.","Only stretches as long as s1 can match, so slide a fixed-size window."],
    why: ["\"ba\" is a reshuffle of \"ab\".","No two neighbouring letters are a and b.","\"cab\" is a reshuffle of \"abc\"."]
  },
  "minimum-size-subarray-sum": {
    hints: ["All numbers are positive. What happens to the sum when the window grows or shrinks?","Grow until the sum reaches the target, then shrink from the left while it still does.","Once the sum reaches the target, shrink from the left as long as it still does."],
    why: ["4 + 4 = 8 needs only 2 numbers.","Even all numbers add up to only 6.","The single 5 is enough."]
  },
  "find-all-anagrams-in-a-string": {
    hints: ["Every answer is a stretch as long as p.","Same window as Permutation in String, but record every start where the counts match.","Slide a window of p's length and compare its letters with p's."],
    why: ["\"cba\" at 0 and \"abc\" at 4.","\"aa\" starts at 0, 1 and 2.","s is shorter than p."]
  },
  "ransom-note": {
    hints: ["Each magazine letter can be used only once.","Count the magazine letters, then spend them on the note. Running out means no.","Count the magazine's letters first, then spend them as the note needs them."],
    why: ["that has h, a and t.","There is only one o.","An empty note needs nothing."]
  },
  "isomorphic-strings": {
    hints: ["Each letter must always turn into the same letter.","Map letters both ways. A letter may never point to two different partners.","Check both directions: no two letters of s may turn into the same letter of t."],
    why: ["a to c, b to d.","a and b would both turn into x.","a to c, b to a."]
  },
  "lru-cache": {
    hints: ["You need fast lookup and to know which key was used longest ago.","A map for instant lookup plus a linked list kept in order of last use.","A map that remembers insertion order: re-insert a key on each use, so the oldest is first."],
    why: ["Adding 3 drops key 2, the least recently used.","Capacity 1: adding 6 drops 5.","Key 9 was never added."]
  },
  "find-pivot-index": {
    hints: ["If you know the total, you only need the left sum.","Left sum equals total minus left sum minus the current number.","Right sum = total - left sum - the number itself."],
    why: ["1 + 2 = 3 on the left, 3 on the right.","No spot balances.","Both sides are empty and add up to 0."]
  },
  "search-insert-position": {
    hints: ["You want the first spot whose value is at least target.","Find the first index whose value is at least the target.","Search with hi = length, so \"after the last\" is a possible answer."],
    why: ["6 is at index 2.","5 would go before 6, at index 2.","9 goes after everything, at index 4."]
  },
  "koko-eating-bananas": {
    hints: ["The faster she eats, the fewer hours she needs. Can you search on speed?","Search over eating speeds, not the array. Test each speed against the hour limit.","For a speed k, hours = the sum of each pile divided by k, rounded up."],
    why: ["At speed 5: 1 + 2 + 2 = 5 hours.","10 bananas in 2 hours means 5 an hour.","One banana per hour, one pile per hour."]
  },
  "search-a-2d-matrix": {
    hints: ["Read row after row, the grid is one sorted list.","Read the grid as one long sorted list and turn each index into a row and column.","Index i in that list is row i / width and column i mod width."],
    why: ["10 is in the second row.","7 would sit between 6 and 8.","The only value is 5."]
  },
  "spiral-matrix": {
    hints: ["Walk the outer ring, then the next ring in.","Keep four walls. Walk one edge, then pull that wall in.","Keep four borders and pull each one in after you walk its edge."],
    why: ["Top row 1, 2, then down to 4, then back to 3.","One row, read left to right.","One column, read top to bottom."]
  },
  "set-matrix-zeroes": {
    hints: ["If you clear as you go, new zeros will spread too far.","Use the first row and column as notes for which rows and columns to clear.","First note which rows and columns have a 0, then clear in a second pass."],
    why: ["The 0 clears its row and the first column.","The 0 clears the first row and the middle column.","Both rows and both columns have a 0."]
  },
  "non-overlapping-intervals": {
    hints: ["To keep the most, which meeting should you keep first?","Sort by end and keep the one that finishes first. Count the ones you drop.","Keep the meeting that ends earliest; it leaves the most room for the rest."],
    why: ["Drop [2,4]; [1,3] and [3,5] only touch.","Two identical meetings: drop one.","Drop [0,4]; the other two only touch."]
  },
  "jump-game-ii": {
    hints: ["Think of each jump as reaching a range of stones.","Treat each jump as a level. Count a jump when you pass the edge of the current reach.","When you reach the end of the current range, you must jump, and the new range is the farthest seen."],
    why: ["Jump to the 3, then on to the last stone.","Already on the last stone.","One step at a time: two jumps."]
  },
  "gas-station": {
    hints: ["If the total gas is less than the total cost, no start works.","If the tank goes negative, no station up to here can be the start. Begin again after it.","If the tank goes negative at station i, no start up to i works, so try i + 1."],
    why: ["Starting at station 1 the tank never runs dry.","Total gas 4 is less than total cost 5.","One station with more gas than cost."]
  },
  "partition-labels": {
    hints: ["A piece must reach at least as far as the last copy of every letter in it.","Note each letter's last position. Cut when the scan reaches the farthest last position so far.","Track the farthest last position so far; when you reach it, close the piece."],
    why: ["\"aba\", \"c\", \"dd\".","All z's in one piece.","Every letter is its own piece."]
  },
  "evaluate-reverse-polish-notation": {
    hints: ["An operator always works on the two most recent values.","Push numbers. An operator pops two, works them out, and pushes the result.","Pop b first, then a, so a - b and a / b come out the right way round."],
    why: ["(3 + 4) x 2 = 14.","7 / 2 = 3.5, dropped to 3.","-7 / 2 = -3.5, dropped toward zero to -3."]
  },
  "largest-rectangle-in-histogram": {
    hints: ["For each bar, how far can a rectangle of its height stretch?","Keep bars in rising order. When a shorter bar comes, pop and measure each taller bar's widest box.","When a shorter bar arrives, every taller bar on the stack has found its right edge."],
    why: ["Height 3 across the last two bars: 6.","One bar of 5.","Height 1 across all four bars."]
  },
  "last-stone-weight": {
    hints: ["Each round needs the two heaviest stones.","A max heap hands you the two heaviest stones every round.","A max heap gives the two heaviest quickly; sorting each round also works for small lists."],
    why: ["7 and 3 leave 4; 4 and 2 leave 2.","Equal stones both break.","One stone is left as it is."]
  },
  "k-closest-points-to-origin": {
    hints: ["Closeness only needs comparing distances, not their exact value.","A max heap of size k by squared distance. No square roots needed.","Compare x*x + y*y; skipping the square root keeps the same order."],
    why: ["Distances 5, 18 and 1: keep the 1 and the 5.","One point.","Distances 8, 9 and 2: the closest is [1,-1]."]
  },
  "palindrome-linked-list": {
    hints: ["You cannot walk a one-way list backwards.","Find the middle, reverse the second half, then compare the halves.","Copy the values into a list and compare it with its reverse (or reverse half the list)."],
    why: ["4, 5, 4 reads the same both ways.","1, 2 reversed is 2, 1.","One node."]
  },
  "reorder-list": {
    hints: ["The order takes from the front, then the back, then the front again.","Split in the middle, reverse the back half, then zip the two halves together.","Put the nodes in a list so you can reach both ends, then relink them."],
    why: ["10, 50, 20, 40, then 30 in the middle.","5, 7, then 6.","1, 6, 2, 5, 3, 4."]
  },
  "happy-number": {
    hints: ["Either the chain reaches 1 or it starts repeating.","The digit-square sums form a chain. Either it reaches 1 or it loops.","A slow and fast walker on the chain will meet if it loops."],
    why: ["7, 49, 97, 130, 10, 1.","4 falls into a loop: 4, 16, 37, 58, 89, 145, 42, 20, 4.","Already 1."]
  },
  "find-the-duplicate-number": {
    hints: ["Read each value as an arrow to an index. What does a repeat make?","Treat each value as a pointer to an index. The repeat is where the loop begins.","Two arrows into the same index make a loop; its start is the repeat."],
    why: ["4 appears twice.","2 appears three times.","1 appears twice."]
  },
  "same-tree": {
    hints: ["Compare the two trees spot by spot.","Both empty is a match. Otherwise the values and both subtrees must match.","Both empty is a match; only one empty is not."],
    why: ["Same shape and values.","The 2 is a left child in p but a right child in q.","Two empty trees are the same."]
  },
  "max-area-of-island": {
    hints: ["Same as counting islands, but measure each one.","Same sinking walk as Number of Islands, but count the cells as you go.","Each cell you sink adds 1 to the island it belongs to."],
    why: ["The top-left island has 3 cells.","No land.","One cell of land."]
  },
  "course-schedule-ii": {
    hints: ["Take the free courses first, and note the order.","Same idea as Course Schedule, but record the order in which courses are freed.","The order is exactly the order courses leave the queue."],
    why: ["0 first, then 1.","A loop means no order works.","One course."]
  },
  "letter-combinations-of-a-phone-number": {
    hints: ["Each digit adds one letter to every string built so far.","For each digit, try every letter it maps to, then move to the next digit.","Start from one empty string and extend all strings for each digit."],
    why: ["2 is a, b or c.","No digits, no strings.","4 letters for 7 times 4 letters for 9: 16 strings."]
  },
  "min-cost-climbing-stairs": {
    hints: ["Work out the cheapest way to stand on each step, from the bottom up.","Cheapest cost to stand on a step is its cost plus the cheaper of the two steps below.","You only need the costs for the last two steps at any time."],
    why: ["Start on step 1, pay 10, and jump past the top.","Both steps are free.","Pay 2 on step 1 and 1 on step 3: 3."]
  },
  "longest-common-subsequence": {
    hints: ["Compare the two strings one prefix at a time.","Grid of prefixes: matching letters add one to the diagonal, otherwise take the better neighbour.","A table cell needs only its left, upper and upper-left neighbours."],
    why: ["\"ittn\" appears in order in both words.","No letter is shared.","The whole word is shared."]
  },
  "decode-ways": {
    hints: ["The last letter read was either one digit or two digits.","Read one digit or two digits at a time. Zeros only work as part of 10 or 20.","A 0 can never stand alone; it only works as the end of 10 or 20."],
    why: ["\"1 1\" is AA and \"11\" is K.","27 is too big for one letter, so only \"2 7\".","30 is too big and 0 cannot stand alone."]
  },
  "edit-distance": {
    hints: ["Compare prefixes: what does it cost to turn the first i letters into the first j?","Grid of prefixes. Each cell is the cheapest of insert, delete or replace from a neighbour.","When the last letters match, that cell costs the same as the one up and to the left."],
    why: ["Replace k with s, e with i, and insert g.","Insert all three letters.","The words are already equal."]
  },
  "partition-equal-subset-sum": {
    hints: ["Two equal halves means one group adds up to half the total.","Can some numbers reach half the total? Track reachable sums, going downward each round.","Go through the sums from high to low so each number is used only once."],
    why: ["3 + 2 = 1 + 4 = 5.","The total 8 needs a group of 4, which no numbers make.","2 and 2."]
  },
  "diameter-of-binary-tree": {
    hints: ["The longest path bends at some node. What does it pass through there?","At each node, the longest path through it is left height plus right height.","Each call returns a height but also updates the best left + right path."],
    why: ["2, 1, 3, 4 is a path of 3 edges.","One node, no edges.","One edge."]
  },
  "balanced-binary-tree": {
    hints: ["Checking only the root is not enough: every node must be balanced.","Return each height, or a fail signal as soon as two sides differ by more than one.","Return -1 from a subtree as soon as it fails, so you never measure twice."],
    why: ["Both sides of 3 have height 1.","Node 1 has height 2 on the left and 0 on the right.","An empty tree is balanced."]
  },
  "kth-smallest-element-in-a-bst": {
    hints: ["In a search tree, which walk visits the values in sorted order?","An in-order walk visits values in sorted order. Stop at the kth one.","Left, node, right gives the values from smallest to biggest."],
    why: ["In order: 2, 3, 4, so the 3rd is 4.","One node.","In order: 1, 2, 3."]
  },
  "implement-trie-prefix-tree": {
    hints: ["Words that share a start can share the same path of letters.","Each node holds child links by letter and an end-of-word flag.","Mark the node where a word ends, so a prefix is not mistaken for a word."],
    why: ["\"car\" is a prefix of \"cart\" but was never inserted.","The tree is empty.","\"te\" starts \"tea\"; nothing starts with \"tx\"."]
  },
  "single-number": {
    hints: ["Pairs need to cancel out.","XOR everything. Pairs cancel and the lone number is left.","x XOR x is 0 and x XOR 0 is x, so pairs vanish."],
    why: ["The two 4s cancel, leaving 7.","One number.","The 3s and 9s cancel, leaving 5."]
  },
  "missing-number": {
    hints: ["Every number from 0 to n should appear once, and one does not.","XOR every index and every value together. What is left is the missing one.","XOR all indexes and values together; everything present cancels."],
    why: ["0 to 3 is missing 2.","0 to 1 is missing 0.","0 to 3 is missing 3."]
  },
  "counting-bits": {
    hints: ["Can the count for i reuse a count you already have?","Bits in i equal bits in i shifted right by one, plus its last bit.","i has the same bits as i / 2, plus one if i is odd."],
    why: ["0, 1, 10, 11 in binary.","0 has no 1 bits.","4 is 100, 5 is 101, 6 is 110."]
  },
  "palindrome-number": {
    hints: ["Without strings, how do you read the last digit of a number?","Reverse only the back half of the digits and compare it with the front half.","number % 10 is the last digit and floor(number / 10) drops it."],
    why: ["1221 reversed is 1221.","A minus sign never reads the same backwards.","10 reversed is 01."]
  },
  "powx-n": {
    hints: ["Multiplying x by itself n times is too slow for big n.","Square the base and halve the power. Odd powers multiply in one extra base.","x^n = (x^2)^(n/2), with one extra x when n is odd."],
    why: ["2 x 2 x 2 x 2 x 2 = 32.","3 to the power -2 is 1 / 9.","1.5 x 1.5 = 2.25."]
  },
  "reverse-vowels-of-a-string": {
    hints: ["Only the vowels move. Everything else stays put.","Like reversing a string, but each end skips ahead until it stands on a vowel.","Two pointers that each skip non-vowels, then swap."],
    why: ["The a and the e swap places.","There are no vowels.","A and E swap; vowels may be capital."]
  },
  "sort-array-by-parity": {
    hints: ["You only need evens before odds, not a full sort.","A writer marks where the next even number goes. Swap each even you find into it.","Collect the evens, then the odds, and join them."],
    why: ["8 and 2 are even, then 3 and 5.","No even numbers.","0 is even."]
  },
  "merge-strings-alternately": {
    hints: ["Take turns, one letter from each word.","One index per word. Take a letter from each in turn, then add whatever is left.","When one word runs out, add the rest of the other one."],
    why: ["a, x, b, y, then the left over c.","p, q, then the rest r, s.","a, c, b, d."]
  },
  "valid-palindrome-ii": {
    hints: ["Compare from both ends. What do you do at the first mismatch?","On the first mismatch, try skipping the left letter or the right one and check the rest.","At a mismatch you have exactly two choices: skip the left letter or the right one."],
    why: ["Remove the x to get \"racecar\".","Too many letters differ.","Already a palindrome."]
  },
  "backspace-string-compare": {
    hints: ["Type each string into a box and compare the results.","Read both strings from the back, counting backspaces to skip, and compare the letters that survive.","A stack is a text box: push letters, pop on #."],
    why: ["\"xy#z\" types \"xz\".","One types \"b\", the other \"d\".","Backspace on an empty box does nothing."]
  },
  "boats-to-save-people": {
    hints: ["The heaviest person needs a boat now. Who can share it?","Sort. Pair the heaviest person with the lightest when they fit, else send the heavy one alone.","If even the lightest cannot share with the heaviest, nobody can."],
    why: ["1 + 4 and 2 + 3.","Everyone weighs the limit, one boat each.","Both fit in one boat."]
  },
  "3sum-closest": {
    hints: ["Fix one number and look for a pair that brings the sum near the target.","Same walk as 3Sum, but keep the sum nearest the target instead of looking for an exact hit.","Sorted, a sum below target moves left up and above moves right down."],
    why: ["-1 + 0 + 4 = 3 exactly.","The only trio adds up to 3.","-5 + 2 + 7 = 4 is closest to 0."]
  },
  "next-permutation": {
    hints: ["The tail that only falls is already at its largest.","From the right, find the first drop, swap it with the next bigger value after it, then reverse the tail.","Swap the first value before that tail with the smallest bigger value in it, then reverse the tail."],
    why: ["After 1, 3, 2 comes 2, 1, 3.","5, 4, 1 is the largest, so wrap to 1, 4, 5.","After 2, 2, 7 comes 2, 7, 2."]
  },
  "maximum-average-subarray-i": {
    hints: ["Every window has the same size, so the biggest sum gives the biggest average.","Fixed window: add the new number, drop the old one, and track the best sum.","Slide the window: add the new number, take away the one that left."],
    why: ["6 + 2 = 8, so 8 / 2 = 4.","The best single number is -1.","One number."]
  },
  "contains-duplicate-ii": {
    hints: ["You only care about copies that sit close together.","Keep a set of the last k numbers. A repeat inside the set means yes.","Remember the last position of each value; the closest copy is the latest one."],
    why: ["The two 4s are 2 apart.","The two 4s are 2 apart, more than 1.","k = 0 allows no gap at all."]
  },
  "minimum-difference-between-highest-and-lowest-of-k-scores": {
    hints: ["Once sorted, the best group of k is a run of neighbours.","Sort first. Then any k neighbours form a window, and its spread is last minus first.","The gap of a sorted run is its last value minus its first."],
    why: ["8 and 12 are 4 apart.","One score, gap 0.","All three: 100 - 1 = 99."]
  },
  "maximum-number-of-vowels-in-a-substring-of-given-length": {
    hints: ["Every window has the same length; count its vowels as it slides.","Fixed window of size k. Count vowels in and out as it slides.","Add one for a vowel coming in and take one off for a vowel going out."],
    why: ["The only vowels are two e's, never within 3 letters.","\"ae\" has 2 vowels.","No vowels at all."]
  },
  "maximum-points-you-can-obtain-from-cards": {
    hints: ["You take some cards from the left and the rest from the right.","Taking k cards from the ends leaves a middle window of n-k. Find the smallest such window.","Start with all k from the left, then swap one at a time for a card from the right."],
    why: ["5 from the left and 9 from the right.","Take every card.","The 7 on the right beats the 1 on the left."]
  },
  "subarray-product-less-than-k": {
    hints: ["All numbers are positive, so growing a window only grows its product.","Shrink while the product is too big. Each right edge adds window-length new subarrays.","Each time the right edge moves, every window ending there counts: right - left + 1 of them."],
    why: ["[2], [3], [4] and [2, 3].","No product is below 1.","5 is below 6."]
  },
  "max-consecutive-ones-iii": {
    hints: ["Flipping zeros is the same as allowing k zeros in a window.","Let the window hold at most k zeros. Shrink from the left when it holds more.","Shrink from the left only when the window holds more than k zeros."],
    why: ["Flip one 0 to get four 1s in a row.","No flips allowed and no 1s.","Flip both zeros."]
  },
  "longest-subarray-of-1s-after-deleting-one-element": {
    hints: ["Deleting one element is like allowing one zero in the window.","A window that holds at most one zero. Its length minus one is a candidate.","You must delete something, so the answer is the window length minus one."],
    why: ["Delete the 0: 1, 1, 1, 1, 1.","Delete one of the four 1s.","Deleting one 0 still leaves no 1s."]
  },
  "fruit-into-baskets": {
    hints: ["Two baskets means at most two different kinds in a row.","Longest window with at most two different values. Count each value inside.","Count kinds in the window and shrink from the left when a third kind appears."],
    why: ["3, 3, 1, 3 uses two kinds.","One tree.","Any two neighbours."]
  },
  "subarrays-with-k-different-integers": {
    hints: ["Counting \"at most k different\" is easier than \"exactly k\".","Exactly k equals at most k minus at most k-1. Count each with a window.","Exactly k = at most k minus at most k - 1."],
    why: ["[1, 2], [2, 1] and [1, 2, 1].","Every stretch of 4s has one value: 6 stretches.","Only the whole list."]
  },
  "find-the-difference-of-two-arrays": {
    hints: ["Repeats do not matter, only which values are present.","Turn both lists into sets. Keep what each set has that the other lacks.","Turn both lists into sets before comparing."],
    why: ["1 and 6 are missing from the second list; 5 from the first.","Both lists hold only 2.","The second list is empty."]
  },
  "first-unique-character-in-a-string": {
    hints: ["You need to know how often each letter appears before you can decide.","Count every letter in one pass, then find the first letter with a count of one.","Count in one pass, then scan again in order for the first count of 1."],
    why: ["w appears once, at index 1.","Every letter repeats.","One letter."]
  },
  "maximum-number-of-balloons": {
    hints: ["\"balloon\" needs b, a, n once and l, o twice.","Count letters. The answer is the scarcest letter count divided by how often the word needs it.","The letter you run out of first decides the answer."],
    why: ["Every letter is there twice as often as needed.","Only one l and one o.","b, a, two l's, two o's and n."]
  },
  "intersection-of-two-arrays": {
    hints: ["Each shared value is listed once, however often it repeats.","Put one list in a set and keep each value of the other that the set holds, once.","A set of one list answers \"is it in there?\" in one step."],
    why: ["3 and 5 are in both.","Nothing is shared.","7 is shared, listed once."]
  },
  "number-of-good-pairs": {
    hints: ["A value seen c times makes pairs with each earlier copy.","Each new copy of a value pairs with every earlier copy. Add the count seen so far.","Add the count so far before counting the new copy."],
    why: ["The three 2s make 3 pairs.","All different.","Five 4s make 4 + 3 + 2 + 1 = 10 pairs."]
  },
  "unique-number-of-occurrences": {
    hints: ["First count, then look at the counts themselves.","Count each value, then check the counts themselves have no repeats.","A set of the counts is smaller than the number of values when two counts are equal."],
    why: ["Counts 2, 1 and 3 all differ.","1 and 2 both appear once.","One value."]
  },
  "word-pattern": {
    hints: ["Each letter stands for one word, and each word for one letter.","Same two-way mapping as Isomorphic Strings, but letters map to whole words.","Check both directions, and that there are as many words as letters."],
    why: ["x is sun and y is moon.","x would be both sun and star.","x would be both cat and dog."]
  },
  "majority-element": {
    hints: ["The majority value appears more than all others together.","Keep a candidate and a vote. A different value cancels a vote. The majority always survives.","Let each different value cancel one vote; the majority still has votes left."],
    why: ["4 appears twice out of three.","One number.","8 appears three times out of five."]
  },
  "determine-if-two-strings-are-close": {
    hints: ["Swaps change order; trades change which letter has which count.","Both words need the same set of letters and the same multiset of counts.","Both words must use the same letters, and their sorted counts must match."],
    why: ["Same letters; counts 1, 2, 1 against 1, 1, 2.","Different lengths.","y never appears in the second word."]
  },
  "valid-sudoku": {
    hints: ["Each digit may appear once per row, column and box.","One set per row, per column and per 3x3 box. A repeat in any set fails the board.","One set of keys like \"row 3 has 5\" catches every kind of repeat."],
    why: ["No digit repeats anywhere.","The first row has two 1s.","Two 1s share the top-left box."]
  },
  "first-missing-positive": {
    hints: ["The answer is between 1 and n + 1. Where could you keep track without extra space?","Use the array itself as the map: put each value v at index v-1, then find the first gap.","Swap each value v into slot v - 1; then the first slot without its own value is the gap."],
    why: ["1, 2, 3 are all there, so 4.","1 is missing.","2 is missing."]
  },
  "equal-row-and-column-pairs": {
    hints: ["Turn each row and each column into something you can compare quickly.","Count each row as a tuple key, then look up every column's tuple.","Join a row into text like \"1,2\" and count rows by that key."],
    why: ["Row 1 matches column 1 and row 2 matches column 2.","One row, one column, the same.","No row matches a column."]
  },
  "4sum-ii": {
    hints: ["Four nested loops are too slow. Can you split the four lists into two pairs?","Count every sum from the first two lists, then look up the negative of each sum from the last two.","Count all sums of the first pair, then look up the opposite of each sum from the second pair."],
    why: ["Four ways, like 1 + 0 + 1 - 2 = 0.","0 + 0 + 0 + 0 = 0.","1 + 1 + 1 + 1 is never 0."]
  },
  "running-sum-of-1d-array": {
    hints: ["Each answer builds on the one before it.","Each answer is the previous answer plus the current number.","One running total, updated as you go."],
    why: ["3, then 3 + 1, then 4 + 4.","-2, then -2 + 2.","One number."]
  },
  "find-the-highest-altitude": {
    hints: ["The altitude is a running total of the gains.","The altitude is a running total of the gains. Track its peak, starting from zero.","Start the best at 0, because the start counts."],
    why: ["2, then 1, then 4.","The hiker only goes down, so the start is highest.","The hiker stays at 0."]
  },
  "find-the-middle-index-in-array": {
    hints: ["With the total known, the right side follows from the left side.","The same balance check as Find Pivot Index: left total versus everything after this spot.","Right = total - left - the number at this spot."],
    why: ["3 on the left and 1 + 2 = 3 on the right.","2 - 2 = 0 on the left, nothing on the right.","No spot balances."]
  },
  "range-sum-query-immutable": {
    hints: ["Adding up the range on every call is slow. What can you work out once?","Store running totals once. Any range sum is one subtraction.","Running totals make any range one subtraction."],
    why: ["4 - 1 = 3, -1 + 2 + 7 = 8, and 2.","One number.","0 + 0 + 3 - 3 = 0, and 3 - 3 = 0."]
  },
  "contiguous-array": {
    hints: ["Score 1 as +1 and 0 as -1. What does a balanced stretch add up to?","Count 0 as -1. Equal running totals mean the stretch between them is balanced.","The same running total seen twice means the part between is balanced."],
    why: ["The whole list has three 0s and three 1s.","There are no 0s.","1, 0 is balanced."]
  },
  "continuous-subarray-sum": {
    hints: ["A sum that divides by k leaves remainder 0.","Remember the first index of each remainder. A repeat at least two apart means yes.","Two running totals with the same remainder frame a multiple of k."],
    why: ["2 + 4 = 6.","No stretch of two or more adds up to a multiple of 5.","0 + 0 = 0, a multiple of 3."]
  },
  "subarray-sums-divisible-by-k": {
    hints: ["A stretch sum is the difference of two running totals.","Two running totals with the same remainder mod k frame a valid subarray.","Equal remainders give a difference divisible by k; keep remainders non-negative."],
    why: ["[3] and [2, 3, 1].","[5] itself.","-1 + 1 = 0."]
  },
  "corporate-flight-bookings": {
    hints: ["Adding seats to every flight in a range one by one is slow.","Add seats at the first flight and remove them after the last, then take a running sum.","Mark +seats at the start and -seats after the end; a running total fills them in."],
    why: ["Flight 2 gets 5 + 10 = 15.","One flight with 7 seats.","Only flight 2 is booked."]
  },
  "sqrtx": {
    hints: ["The answer is the biggest number whose square fits under x.","Search for the largest m with m times m not above x.","Binary search with the middle rounded up, so the range always shrinks."],
    why: ["3 x 3 = 9 fits, 4 x 4 = 16 does not.","4 x 4 = 16 exactly.","The root of 0 is 0."]
  },
  "find-smallest-letter-greater-than-target": {
    hints: ["The letters are sorted, so you can search.","Find the first letter strictly after the target, wrapping to the start if none is.","If no letter comes after the target, wrap to the first one."],
    why: ["k is the first letter after e.","Nothing comes after z, so wrap to b.","Skip both a's to reach m."]
  },
  "find-first-and-last-position-of-element-in-sorted-array": {
    hints: ["Find where the target first appears, then where the next value would start.","Run two searches: one leans left for the first match, one leans right for the last.","The last copy is one before the first spot of target + 1."],
    why: ["3 runs from index 1 to 3.","5 is not there.","The list is empty."]
  },
  "peak-index-in-a-mountain-array": {
    hints: ["At any spot you can tell whether you are still climbing.","If the slope rises at the middle, the peak is to the right. Otherwise it is here or left.","If the next value is bigger, the peak is to the right."],
    why: ["4 is the top.","9 is the top, at index 3.","7 is the top, at index 1."]
  },
  "find-peak-element": {
    hints: ["Walking uphill must reach a peak sooner or later.","If the next value is higher, a peak lies to the right. Otherwise it lies here or to the left.","Move toward the bigger neighbour; outside the list counts as minus infinity."],
    why: ["5 is bigger than both neighbours.","6 is bigger than its only neighbour.","9 is a peak (8 would be too)."]
  },
  "single-element-in-a-sorted-array": {
    hints: ["Before the single value, pairs start at even positions.","Before the loner, pairs start on even indexes. After it, they start on odd ones.","Look at an even index: if it matches the next value, the single one is further right."],
    why: ["2 and 7 come in pairs; 5 is alone.","One value.","8 is alone at the end."]
  },
  "capacity-to-ship-packages-within-d-days": {
    hints: ["A bigger ship always needs fewer days. Can you search on the size?","Search over ship sizes. A greedy loading pass tells you if a size is enough.","The size is at least the heaviest package and at most the total weight."],
    why: ["Size 6: day one 4 + 2, day two 5 + 1.","One package a day.","One day means the ship carries all 6."]
  },
  "minimum-number-of-days-to-make-m-bouquets": {
    hints: ["The later the day, the more flowers have bloomed.","Search over days. For a given day, count runs of bloomed flowers to see if m bouquets fit.","For one day, count runs of k bloomed neighbours; reset the run at a closed bud."],
    why: ["By day 2, flowers 1 and 2 have bloomed: two bouquets of one.","Neighbours only pair up by day 5.","Two bouquets of 2 need 4 flowers."]
  },
  "time-based-key-value-store": {
    hints: ["Times only grow, so each key's list is already sorted.","Each key keeps its values in time order. Find the latest time not after the query.","Binary search for the last time at or before the asked time."],
    why: ["Nothing at time 1; calm at 4; busy at 9.","x was never set.","a is \"one\" at time 3; b was never set."]
  },
  "split-array-largest-sum": {
    hints: ["The bigger the allowed part sum, the fewer parts you need.","Search over the largest allowed part sum. Count how many parts a greedy cut needs.","Search the cap between the biggest number and the total, cutting greedily."],
    why: ["[3, 1] and [4, 2] both add up to at most 6.","One number per part.","One part holds everything."]
  },
  "median-of-two-sorted-arrays": {
    hints: ["The median splits all numbers into a left half and a right half.","Binary search a cut in the shorter array so both left halves together hold half the items.","Binary search how many numbers the shorter list gives to the left half."],
    why: ["All numbers are 1, 2, 4.","1, 2, 3, 10: the mean of 2 and 3.","Only 7."]
  },
  "transpose-matrix": {
    hints: ["A row of the answer is a column of the input.","Row i, column j moves to row j, column i.","Cell [i][j] moves to [j][i]."],
    why: ["Columns 1, 3 and 2, 4 become rows.","One row becomes three rows of one.","One cell."]
  },
  "reshape-the-matrix": {
    hints: ["Read the values in one long line first.","Read every cell as one long list and pour it into the new shape, row by row.","If r x c does not match the count, return the input as it is."],
    why: ["Four values pour into two rows of two.","3 x 1 = 3 is not 4, so nothing changes.","Six values in one row."]
  },
  "matrix-diagonal-sum": {
    hints: ["Each row gives one cell to each diagonal.","Add both diagonals and do not count the centre twice when the size is odd.","For odd sizes the centre is on both diagonals; count it once."],
    why: ["1 + 4 + 2 + 3 = 10.","One cell.","1 + 5 + 4 + 2 + 3 = 15."]
  },
  "pascals-triangle": {
    hints: ["Each row is built from the row above it.","Each row starts and ends with one. Every inner value is the sum of the two above it.","Each inner value is the two values above it added together."],
    why: ["Just the top row.","The middle 2 is 1 + 1.","3 = 1 + 2 and 3 = 2 + 1."]
  },
  "count-negative-numbers-in-a-sorted-matrix": {
    hints: ["Rows and columns are both sorted from large to small.","Start bottom-left. A negative means the rest of that row is negative too.","Once a value is negative, everything after it in the row is too."],
    why: ["-1, -2 and -5.","No negatives.","One negative."]
  },
  "spiral-matrix-ii": {
    hints: ["Walk the spiral, writing numbers as you go.","Same four walls as Spiral Matrix, but write 1, 2, 3 as you walk.","Pull in the border you just finished before turning."],
    why: ["One cell.","1, 2 along the top, 3 down, 4 back.","The numbers wind inward to 16 in the centre."]
  },
  "game-of-life": {
    hints: ["Every cell must change at the same moment.","Count eight neighbours. Store the next state in spare bits so updates do not leak.","Count neighbours on a copy of the old board, so new values do not leak in."],
    why: ["A row of three turns from upright to flat.","Each cell has three live neighbours and stays alive.","A lonely cell dies."]
  },
  "summary-ranges": {
    hints: ["A range runs while each next number is one more.","Extend a run while the next number is one more. Close it when the chain breaks.","Write \"a\" for a single number and \"a->b\" for a run."],
    why: ["0, 1, 2 is a run; 5 is alone; 7, 8 is a run.","No numbers.","One number."]
  },
  "minimum-number-of-arrows-to-burst-balloons": {
    hints: ["One arrow can burst every balloon covering one point.","Sort by end and shoot at the first end. A new arrow only when a balloon starts after it.","Sort by end and shoot at the end of the first balloon still whole."],
    why: ["One arrow at 4 bursts the first two; another at 8.","An arrow at 2 bursts both.","Three balloons far apart."]
  },
  "interval-list-intersections": {
    hints: ["Two sorted lists: walk them together.","Two pointers. The overlap is the later start to the earlier end. Advance whichever ends first.","After comparing, move on in the list whose interval ends first."],
    why: ["[3,7] overlaps [1,4] at [3,4] and [6,9] at [6,7].","The second list is empty.","They share only the point 5."]
  },
  "car-pooling": {
    hints: ["What matters is how many people are in the car at each point.","Add riders at pickup and remove them at drop-off on a timeline. Check the load never goes over.","Put drop-offs before pick-ups at the same place."],
    why: ["At km 2 there are 2 + 3 = 5 people.","The first two leave at km 3 just as three get on.","One person fits."]
  },
  "my-calendar-i": {
    hints: ["Two half-open events overlap when each starts before the other ends.","A new booking fits if it ends before or starts after every booking it touches.","Check the new event against every booked one before adding it."],
    why: ["[8,12] clashes with [5,10]; [10,15] starts as it ends.","The same slot twice clashes.","[15,25] clashes with both bookings."]
  },
  "remove-covered-intervals": {
    hints: ["If sorted by start, a covered interval comes after the one covering it.","Sort by start, longest first on ties. An interval is covered if it ends inside the farthest end so far.","For equal starts, put the longer one first so it covers the shorter."],
    why: ["[2,4] sits inside [1,5].","[1,3] sits inside [1,6].","Neither covers the other."]
  },
  "assign-cookies": {
    hints: ["Give small cookies to the least greedy children.","Sort both. Give each child the smallest cookie that is big enough.","Sort both lists and walk them together."],
    why: ["The 2 cookie satisfies the child wanting 1.","Both cookies are too small.","Every child gets a cookie big enough."]
  },
  "lemonade-change": {
    hints: ["You only ever need 5s and 10s to give change.","Count your fives and tens. Give change with a ten first when you can.","For a 20, give a 10 and a 5 first; save the 5s."],
    why: ["You always have the right change.","You have no 5 to give back.","By the 20 you hold two 10s and no 5."]
  },
  "can-place-flowers": {
    hints: ["Plant as early as possible; it never hurts.","Plant in any empty plot whose two neighbours are empty, then keep scanning.","A plot is free if it and both neighbours are empty (the ends count as empty)."],
    why: ["Plant at the first plot.","Only two more flowers fit.","The only empty plot touches two flowers."]
  },
  "split-a-string-in-balanced-strings": {
    hints: ["Keep score: L adds one, R takes one away.","Keep a balance of L and R. Cut every time it returns to zero.","Cut every time the score is back to 0."],
    why: ["\"RL\" and \"LR\".","Only the whole string balances.","\"LR\", \"LR\" and \"RL\"."]
  },
  "maximum-units-on-a-truck": {
    hints: ["Every box takes one slot. Which boxes are worth the most?","Load the boxes with the most units first until the truck is full.","Load the boxes with the most units first."],
    why: ["Two boxes of 5 and one of 1: 11.","Only one box exists.","Two boxes of 7 and two of 2: 18."]
  },
  "best-time-to-buy-and-sell-stock-ii": {
    hints: ["You can trade every day. Which days make money?","Collect every rise from one day to the next.","The best profit is every rise from one day to the next added up."],
    why: ["6 - 3 = 3 and 8 - 2 = 6.","Prices only fall.","Three rises of 1."]
  },
  "minimum-add-to-make-parentheses-valid": {
    hints: ["Count openers waiting for a closer.","Track open brackets. A closer with nothing open needs one added. Leftover openers need closers.","A closer with nothing open needs an added opener; leftover openers need closers."],
    why: ["One opener is never closed.","Two closers need openers and two openers need closers.","Already balanced."]
  },
  "increasing-triplet-subsequence": {
    hints: ["Keep the smallest value seen and the smallest value that has something smaller before it.","Keep the smallest first value and smallest second value. Anything above both completes it.","Any value bigger than both of those completes the trio."],
    why: ["1, 2, 7 rise in order.","It only falls.","No value comes after a rising pair and beats it."]
  },
  "hand-of-straights": {
    hints: ["The smallest card must start a group.","Always start a group at the smallest card left and use up the next ones in a row.","Use up groupSize cards in a row from the smallest card left."],
    why: ["1, 2, 3 and 3, 4, 5.","3 is missing for 1, 2, 3.","Groups of one always work."]
  },
  "valid-parenthesis-string": {
    hints: ["A star can be three things. Track a range instead of one count.","Track the lowest and highest possible number of open brackets as you read.","Keep the lowest and highest possible open counts; the lowest never goes below 0."],
    why: ["The star closes the opener.","The last ( is never closed.","The star closes one of the openers."]
  },
  "task-scheduler": {
    hints: ["The most frequent task sets the shape of the schedule.","The most frequent task sets the frame. Fill the gaps between its copies with the others.","(top - 1) x (n + 1) + the number of tasks tied for top, but never less than the task count."],
    why: ["A, B, idle, A.","No task repeats.","A, idle, A, idle, A."]
  },
  "candy": {
    hints: ["Each child must beat the neighbour on each side they outrank.","One pass from the left for rising ratings, one from the right, then take the larger count.","One pass from the left and one from the right, keeping the bigger count."],
    why: ["1, 2, 1 candies.","Equal ratings: one each.","3, 2, 1 candies."]
  },
  "merge-triplets-to-form-target-triplet": {
    hints: ["Merging only ever takes the bigger value.","Ignore any triplet that goes over the target anywhere. Check the rest can reach every target value.","A triplet with any value over the target would spoil it, so ignore it."],
    why: ["[1,2,3] gives the 2 and 3, [3,1,2] gives the first 3.","The 4 is over the target.","[1,5,1] is already the target."]
  },
  "baseball-game": {
    hints: ["Every command looks at the last scores, so keep them in order.","Push scores. The commands read or remove the top entries.","A stack: + reads the top two, D reads the top one, C pops."],
    why: ["4 is removed, leaving 7.","2, 3, 5, 10 add up to 20.","The only score is removed."]
  },
  "remove-all-adjacent-duplicates-in-string": {
    hints: ["Removing a pair can bring two new equal letters together.","Push each letter, but pop instead when it matches the top.","A stack does every round at once: pop when the letter equals the top."],
    why: ["\"bb\" goes, then \"aa\".","\"yy\" goes, then \"xx\", leaving z.","No equal neighbours."]
  },
  "make-the-string-great": {
    hints: ["A pair to delete is one letter in both cases, side by side.","Push letters. Pop instead when the new letter is the same letter in the other case.","Pop when the new letter matches the top in a different case."],
    why: ["\"aA\" goes, leaving b.","\"Xx\" and \"Yy\" go.","a and b are different letters."]
  },
  "next-greater-element-i": {
    hints: ["Work out the next bigger value for every number of nums2 once.","Keep a stack of values waiting for something bigger. A bigger value answers them all.","A stack of numbers still waiting; a bigger one answers all smaller ones on top."],
    why: ["After 2 comes 7; after 5, 7 is the first bigger.","Nothing bigger follows 3.","Nothing bigger follows 4; 4 follows 1."]
  },
  "implement-queue-using-stacks": {
    hints: ["A stack gives back the newest item; a queue gives back the oldest.","Push into an in-stack. When the out-stack is empty, pour the in-stack into it.","Pouring one stack into another flips the order; only pour when the out stack is empty."],
    why: ["7 went in first, so it comes out first.","A new queue is empty.","1, then 2, then 3 come out in order."]
  },
  "removing-stars-from-a-string": {
    hints: ["Each star deletes the closest letter on its left.","Push letters. A star pops the letter on top.","A stack: letters push, stars pop."],
    why: ["The star removes b.","The two stars remove y and x.","Each star removes the letter just before it."]
  },
  "simplify-path": {
    hints: ["Split the path into folder names and handle each one.","Split on slashes. A name is pushed, two dots pops, one dot does nothing.","A stack of names: \"..\" pops, \".\" and empty parts are skipped."],
    why: ["The double slash and the end slash vanish.","\".\" stays put, \"..\" undoes b.","\"..\" at the root stays at the root."]
  },
  "decode-string": {
    hints: ["Brackets can nest, so finish the inner one first.","On an opening bracket, save the count and text so far. On a closing one, repeat and join.","On [ save the text so far and the count; on ] repeat the inner text and join."],
    why: ["\"ab\" twice, then c.","\"x\" + \"yy\", three times.","No brackets."]
  },
  "asteroid-collision": {
    hints: ["Only a left-mover hitting a right-mover can crash.","Only a left-mover hitting a right-mover on top can crash. Resolve crashes until it is safe.","Keep survivors on a stack and keep crashing the newcomer into the top."],
    why: ["-2 hits 4 and explodes.","Equal sizes both explode.","-7 destroys 5 and 2; -3 was already moving away."]
  },
  "car-fleet": {
    hints: ["The car closest to the target decides whether others catch up.","Sort by position. A car that would arrive no later than the car ahead joins its fleet.","Work out each car's arrival time; a car arriving no later than the one ahead joins it."],
    why: ["The car at 0 would arrive at time 5, before the car at 4 (time 6), so it joins.","Same speed, so they never meet.","One car."]
  },
  "basic-calculator-ii": {
    hints: ["* and / happen before + and -.","Push numbers with their sign. Multiply or divide into the top at once, then sum the stack.","Push terms for + and -; for * and / combine with the top right away."],
    why: ["3 x 4 = 12, plus 2.","8 / 3 = 2, minus 1.","10 - 2 - 3."]
  },
  "longest-valid-parentheses": {
    hints: ["A balanced stretch ends where its last closer matches.","Stack indexes with a base marker. After each pop, the gap to the new top is a valid length.","Keep a base position on the stack; the length is this position minus the top."],
    why: ["\"(()())\" is balanced.","Closers with no openers.","\"()\" at the start; \"(()\" is not closed."]
  },
  "online-stock-span": {
    hints: ["Earlier days with lower prices get swallowed by today.","Each stack item keeps a price and its span. Lower prices fold into the new one.","Store [price, span] so a popped day hands its whole span over."],
    why: ["25 covers 20; 40 covers all four days.","First day, span 1.","Equal prices count, so the span grows."]
  },
  "next-greater-element-ii": {
    hints: ["The list wraps, so a value's answer may come from the start.","The array wraps, so walk it twice while keeping the stack of waiting indexes.","Walk the list twice, but only push positions on the first lap."],
    why: ["2 and 1 find 3; nothing beats 3.","4 and 3 wrap round to 5.","One value."]
  },
  "remove-k-digits": {
    hints: ["A smaller digit should come as early as possible.","Keep the digits rising. Pop a bigger digit off the top while you still may remove one.","Pop a bigger digit before a smaller one while removals remain."],
    why: ["Remove 4 and 3.","Remove 1, leaving 0.","Remove every digit."]
  },
  "final-prices-with-a-special-discount-in-a-shop": {
    hints: ["Each item looks for the first later price not above it.","Each price waits on a stack for the first later price that is not higher.","A stack of items waiting for their discount."],
    why: ["5 gets 3 off; 3 and 4 have none.","The first 2 gets 2 off.","Prices only rise, so no discounts."]
  },
  "132-pattern": {
    hints: ["You need a small value, then a big one, then a middle one.","Walk from the right with a falling stack. Popped values are candidates for the middle of the pattern.","Walk from the right; values popped by a bigger one are the best middle candidates."],
    why: ["1, 4, 2.","It only falls.","3, 5, 4."]
  },
  "sum-of-subarray-minimums": {
    hints: ["Instead of each stretch, think of each value: in how many stretches is it the minimum?","For each value, count subarrays where it is the minimum using the nearest smaller on each side.","Find how far it reaches left and right before a smaller value; multiply."],
    why: ["[2], [1] and [2,1] have minimums 2, 1 and 1.","Three stretches, each minimum 3.","1+2+3 for singles, 1+2 for pairs, 1 for all."]
  },
  "kth-largest-element-in-a-stream": {
    hints: ["You only need the top k scores at any time.","Keep a min heap of size k. Its top is the kth largest.","Keep the top k sorted (a min heap of size k is faster); the smallest of them is the answer."],
    why: ["The 2nd largest becomes 3, then 5, then stays 5.","One score is the largest.","The 3rd largest is 1, then 9."]
  },
  "the-k-weakest-rows-in-a-matrix": {
    hints: ["A row's strength is its soldier count.","Count soldiers per row and keep the k smallest by count, then index.","Sort rows by count, then by index on ties."],
    why: ["Row 2 has 0, row 0 has 1.","Both have 2; row 0 has the smaller index.","Rows 1 and 3 have 0, row 0 has 1."]
  },
  "take-gifts-from-the-richest-pile": {
    hints: ["Each second you need the biggest pile.","A max heap hands you the richest pile. Put back its square root each second.","Find the biggest pile, replace it by its square root rounded down, k times."],
    why: ["16 becomes 4: 4 + 4 = 8.","Piles of 1 stay 1.","10 becomes 3, 9 becomes 3: 3 + 3 + 2."]
  },
  "top-k-frequent-words": {
    hints: ["First count each word.","Count words, then rank by count and break ties alphabetically.","Sort by count, biggest first, and alphabetically on ties."],
    why: ["ox 3 times, cat twice.","Both once, so alphabetical.","One word."]
  },
  "sort-characters-by-frequency": {
    hints: ["Count each character first.","Count letters, then pop the most frequent and write it that many times.","Sort characters by count and write each one count times."],
    why: ["b twice, then a.","Tied counts may go in either order.","One character."]
  },
  "find-median-from-data-stream": {
    hints: ["The median needs the middle of everything added so far.","A max heap for the lower half and a min heap for the upper half, kept balanced.","Keep the numbers sorted as they arrive (two heaps make it faster)."],
    why: ["4 alone, then the mean of 4 and 10.","Sorted -1, 3, 5: the middle is 3.","The mean of 1 and 2."]
  },
  "reorganize-string": {
    hints: ["The most common letter is the hardest to keep apart.","Always place the most common letter that is not the one you just placed.","Fill even slots first, starting with the most common letter, then the odd slots."],
    why: ["a, b, a.","Three a's cannot be kept apart in four letters.","Already fine."]
  },
  "remove-duplicates-from-sorted-list": {
    hints: ["Sorted means repeats sit next to each other.","While the next node has the same value, skip it.","Skip the next node while it has the same value; only move on when it differs."],
    why: ["One 1 and one 3 are removed.","Empty stays empty.","Only one 4 stays."]
  },
  "convert-binary-number-in-a-linked-list-to-integer": {
    hints: ["Reading a binary number left to right is like reading digits.","Walk the list and double the total before adding each bit.","For each bit: value = value x 2 + bit."],
    why: ["110 in binary is 6.","0 is 0.","1001 in binary is 9."]
  },
  "remove-linked-list-elements": {
    hints: ["The head itself might need removing.","A dummy head means the first node is no special case. Skip every node with the value.","A dummy node before the head makes every removal the same."],
    why: ["Both 3s are removed.","Empty stays empty.","Every node is removed."]
  },
  "add-two-numbers": {
    hints: ["The digits come ones first, like adding by hand.","Digits come lowest first, so add node by node and carry into the next.","Keep going while either list has digits or a carry is left."],
    why: ["43 + 18 = 61.","0 + 0 = 0.","99 + 1 = 100."]
  },
  "odd-even-linked-list": {
    hints: ["It is about positions, not values.","Build an odd chain and an even chain as you walk, then attach the even chain to the odd tail.","Build two chains as you walk, then hang the even chain after the odd one."],
    why: ["10, 30, 50 then 20, 40.","Empty stays empty.","Already odd then even."]
  },
  "partition-list": {
    hints: ["Keep the order inside each group.","Two dummy heads: one for small values, one for the rest. Join them at the end.","Two dummy-headed chains, joined at the end; end the second chain with nothing."],
    why: ["1, 2 are below 3; 5, 4 keep their order.","1 is below 2.","Nothing is below 0."]
  },
  "sort-list": {
    hints: ["Merge sort works well on linked lists.","Merge sort: split at the middle with fast and slow, sort each half, then merge.","Find the middle with slow and fast pointers, cut there, sort both halves and merge."],
    why: ["3, 1, 2 sorted.","Empty stays empty.","Repeats stay next to each other."]
  },
  "swap-nodes-in-pairs": {
    hints: ["Swap two nodes, then move on two.","With a dummy head, re-link two nodes at a time and step forward by two.","A dummy before the head lets the first pair swap like any other."],
    why: ["1 and 2 swap; 3 has no partner.","Empty stays empty.","6, 7 swap and 8, 9 swap."]
  },
  "reverse-linked-list-ii": {
    hints: ["Find the node just before the part to reverse.","Stop just before the range, then move each next node to the front of the range.","Move the next node to the front of the part, right - left times."],
    why: ["20 and 30 swap.","One node.","The whole list reverses."]
  },
  "rotate-list": {
    hints: ["Rotating by the length changes nothing.","Close the list into a ring, then cut it at the new tail.","Use k mod length, then cut the list before the new head and join the ends."],
    why: ["The last node 4 moves to the front.","5 mod 2 = 1 rotation.","Empty stays empty."]
  },
  "reverse-nodes-in-k-group": {
    hints: ["Before reversing a group, check it has k nodes.","Check that k nodes remain, reverse them, then join the group back to the rest.","Reverse each group in place and continue after its old first node."],
    why: ["1,2,3 and 4,5,6 reverse; 7 is left.","Groups of 1 do not change.","One group of 2."]
  },
  "maximum-twin-sum-of-a-linked-list": {
    hints: ["Twins are the first and last, the second and second last...","Reverse the second half and add the nodes in pairs.","Copy the values to a list so both ends are easy to reach."],
    why: ["1 + 7 = 8.","3 + 6 = 9 beats 1 + 2.","Every pair is 8."]
  },
  "delete-the-middle-node-of-a-linked-list": {
    hints: ["To delete a node you need the one before it.","Give fast a one-step head start so slow stops just before the middle.","Start fast two steps ahead so slow stops just before the middle."],
    why: ["2 is the middle.","One node leaves an empty list.","Index 2, the 3, is the middle."]
  },
  "binary-tree-inorder-traversal": {
    hints: ["Inorder means left, then the node, then right.","Left subtree, then the node, then the right subtree. Try it with an explicit stack too.","A helper that visits the left side before writing the node."],
    why: ["1, then 2, then 3.","Empty tree.","5, then its right subtree 7, 8."]
  },
  "binary-tree-preorder-traversal": {
    hints: ["Preorder means the node first.","Node first, then left, then right. With a stack, push the right child before the left.","Write the node, then visit left, then right."],
    why: ["2, 1, 3.","Empty tree.","4, then 9 and its children 1, 2."]
  },
  "binary-tree-postorder-traversal": {
    hints: ["Postorder means the node last.","Both children before the node. One trick: a reversed node-right-left walk.","Visit left, then right, then write the node."],
    why: ["1, 3, then 2.","One node.","1, 2, then 9, then 4."]
  },
  "merge-two-binary-trees": {
    hints: ["Walk both trees at the same time.","Walk both trees together. Add values where both have a node, else keep the one that exists.","If one side is missing, reuse the other side's node as it is."],
    why: ["1 + 3 = 4 at the root; 2 and 4 come from one tree each.","The first tree is empty.","Every value doubles."]
  },
  "univalued-binary-tree": {
    hints: ["Every node must equal the root.","Every node must match the root value. Check it on the way down.","Remember the root's value and check every node against it."],
    why: ["All 3s.","4 differs.","One node."]
  },
  "symmetric-tree": {
    hints: ["Compare the left side with a mirror of the right side.","Compare the left subtree with a mirror of the right: outside with outside, inside with inside.","Outer children with outer children, inner with inner."],
    why: ["The 1s sit on the two outer edges.","Both 1s are right children, so they do not mirror.","One node."]
  },
  "path-sum": {
    hints: ["Each step down uses up some of the target.","Subtract each value on the way down. A leaf that brings the target to zero is a yes.","Only stop at a leaf; a node with one child is not the end of a path."],
    why: ["3 + 4 + 1 = 8.","The paths add up to 8 and 8.","An empty tree has no path."]
  },
  "subtree-of-another-tree": {
    hints: ["At some node, the whole tree below must match exactly.","At every node, run the Same Tree check against the smaller tree.","At each node, run a full same-tree check."],
    why: ["Node 2 with its child 4 matches.","Node 2 has a child, the small tree does not.","The trees are the same."]
  },
  "leaf-similar-trees": {
    hints: ["Only the leaves matter, in left-to-right order.","Collect the leaves of each tree left to right and compare the two lists.","Collect each tree's leaves and compare the lists."],
    why: ["Both have leaves 2, 3.","2, 3 against 3, 2.","Both have the single leaf 1."]
  },
  "sum-of-left-leaves": {
    hints: ["A leaf counts only if it is a left child.","Tell each child whether it is a left child. Add a leaf only when it is.","Tell each child which side it is on."],
    why: ["4 is the only left leaf.","The root alone is not a left leaf.","2 and 6 are left leaves."]
  },
  "binary-tree-paths": {
    hints: ["Each path ends at a leaf.","Carry the path so far down the tree and save it at each leaf.","Carry the path text down and save it at each leaf."],
    why: ["Two leaves, two paths.","One node.","One path down the right side."]
  },
  "search-in-a-binary-search-tree": {
    hints: ["A search tree tells you which way to go.","Smaller goes left, bigger goes right. Stop on a match or an empty spot.","Smaller go left, bigger go right, until found or empty."],
    why: ["3 and its children 1 and 4.","7 is not in the tree.","The root itself."]
  },
  "range-sum-of-bst": {
    hints: ["The search order can tell you a whole side is out of range.","Add nodes inside the range. Skip a whole side when the BST order says it is out of range.","Below low, skip the left side; above high, skip the right side."],
    why: ["8 + 4 + 6 = 18.","5 is outside 1 to 4.","All three values are in range."]
  },
  "minimum-absolute-difference-in-bst": {
    hints: ["The closest pair of values sits next to each other in sorted order.","An in-order walk gives sorted values. Compare each one with the previous.","Walk in order and compare each value with the one before."],
    why: ["4, 10, 15: the gap 5.","1, 3, 5, 48: the gap 2.","9 and 12."]
  },
  "path-sum-ii": {
    hints: ["Like Path Sum, but keep the path itself.","Path Sum, but keep the path in a list. Add on the way down, remove on the way back.","Add a node on the way down and remove it on the way back up."],
    why: ["3 + 4 + 1 = 8.","Both 2s make a path.","Empty tree."]
  },
  "sum-root-to-leaf-numbers": {
    hints: ["Each step down adds a digit to the right.","Pass down the number so far times ten plus this digit. Add it up at the leaves.","number = number x 10 + digit on the way down."],
    why: ["41 + 42 = 83.","One digit.","105 + 106 = 211."]
  },
  "count-good-nodes-in-binary-tree": {
    hints: ["A node is good if nothing above it is bigger.","Pass down the largest value on the path. A node at least that big is good.","Carry the biggest value on the path down."],
    why: ["2 and 4 are good; 1 is below 2.","The root is always good.","6, 6 and 8 are good; 1 is not."]
  },
  "path-sum-iii": {
    hints: ["Paths can start anywhere. Think of running sums from the root.","Subarray Sum Equals K on the root-to-node path: a map of running sums, undone on the way back.","Like counting stretches with sum k, but undo each running sum on the way back up."],
    why: ["2 + 1 and 3.","No path makes 2.","Each node alone, and root plus each child."]
  },
  "lowest-common-ancestor-of-a-binary-search-tree": {
    hints: ["The answer is where the two values go different ways.","Walk down. The first node that falls between the two values is the answer.","Both smaller: go left; both bigger: go right; otherwise stop."],
    why: ["1 and 4 split at 3.","4 and 7 split at 6.","One value is the node itself."]
  },
  "lowest-common-ancestor-of-a-binary-tree": {
    hints: ["Without the search order you must look on both sides.","If both sides report a find, this node is the answer. Otherwise pass up whichever side found one.","If both sides find something, this node is the answer."],
    why: ["4 and 1 are children of 2.","4 is on the left of 7, 5 on the right.","2 is above 1, and counts as its own ancestor."]
  },
  "insert-into-a-binary-search-tree": {
    hints: ["Walk down as if searching for the value.","Walk down by comparison until you find an empty spot, and put the node there.","The empty spot where the search ends is where it goes."],
    why: ["6 goes left of 8.","An empty tree becomes just 3.","1 goes left of 5."]
  },
  "flatten-binary-tree-to-linked-list": {
    hints: ["Preorder: the node, then its left subtree, then its right.","For each node, hang its right subtree off the far right of its left subtree, then move left to right.","Hang the right subtree after the last node of the left subtree, then move left to right."],
    why: ["1, 2, 3, 4, 5 down the right side.","Empty stays empty.","Already a chain."]
  },
  "construct-binary-tree-from-preorder-and-inorder-traversal": {
    hints: ["Preorder always starts with the root.","Preorder gives the root. Its place in inorder splits the left and right subtrees.","The root's place in inorder splits the left and right subtrees."],
    why: ["Root 2, left 1, right 3.","One node.","Root 1; 4, 2 go left and 3 goes right."]
  },
  "house-robber-iii": {
    hints: ["At each house you either rob it or not.","Each node returns two totals: robbed and not robbed. A robbed node needs its children skipped.","Return both totals from each node: robbed and skipped."],
    why: ["Rob 4 alone.","Rob both children: 5 + 6.","Rob 4 and 3."]
  },
  "binary-tree-maximum-path-sum": {
    hints: ["A path can bend once, at its highest node.","Each node passes up its best single branch, but checks a path that bends through itself.","A branch that adds a negative total is better left out: use 0."],
    why: ["2 + 3 = 5.","One node.","4 + 8 + 1 + 2 = 15."]
  },
  "convert-sorted-array-to-binary-search-tree": {
    hints: ["The middle value keeps both sides the same size.","The middle value is the root. Build each half the same way.","Build the left half and right half the same way."],
    why: ["2 in the middle.","One value.","Either value can be the root."]
  },
  "minimum-depth-of-binary-tree": {
    hints: ["The nearest leaf might be on any side.","Go level by level. The first leaf you meet gives the answer.","Go level by level and stop at the first leaf."],
    why: ["4 is a leaf on level 2.","Empty tree.","A chain of three."]
  },
  "average-of-levels-in-binary-tree": {
    hints: ["Visit the tree one level at a time.","Level order, but sum each level and divide by its size.","Sum each level and divide by how many nodes it has."],
    why: ["4, then (2 + 7) / 2.","One level.","6, then 1, then (2 + 3) / 2."]
  },
  "binary-tree-zigzag-level-order-traversal": {
    hints: ["It is level order with a twist.","Level order as usual, then reverse every other level.","Reverse every second level."],
    why: ["The second level reads 3, 2.","Empty tree.","Each level has one node."]
  },
  "maximum-level-sum-of-a-binary-tree": {
    hints: ["Add up each level.","Level order with a running sum per level. Keep the level with the biggest sum.","On a tie keep the earlier level, so only replace on a strictly bigger sum."],
    why: ["Level 2 sums to 3.","9 beats 1 + 2.","-1 beats -5."]
  },
  "flood-fill": {
    hints: ["Spread from the start through neighbours of the same old colour.","From the start cell, repaint and spread to neighbours of the old colour.","If the new colour equals the old one, nothing changes; stop early."],
    why: ["The three joined 1s turn to 5.","Already that colour.","All four cells are joined."]
  },
  "island-perimeter": {
    hints: ["Each land cell has four sides.","Each land cell adds four edges, minus two for every land neighbour it shares a side with.","Every shared side between two land cells takes 2 off."],
    why: ["One cell, four sides.","Two cells share one side: 8 - 2.","Four cells share three sides: 16 - 6."]
  },
  "find-if-path-exists-in-graph": {
    hints: ["Are the two vertices in the same connected group?","Build the neighbour lists, then explore from the source and see if you touch the target.","Join groups along every edge, then compare their leaders."],
    why: ["0 to 1 to 2.","0 and 3 are in different groups.","Source and destination are the same."]
  },
  "keys-and-rooms": {
    hints: ["Rooms are places, keys are ways to reach them.","Rooms are nodes and keys are edges. Visit from room zero and check you reached them all.","Explore from room 0 and count the rooms you reach."],
    why: ["0 opens 1, 1 opens 2.","No key opens room 1.","Room 0 holds both keys."]
  },
  "number-of-provinces": {
    hints: ["A province is a group of linked cities.","Each unvisited city starts a new group. Visit everyone it connects to.","Each unvisited city starts a province; visit its whole group."],
    why: ["Two cities, not linked.","0 and 2 are linked; 1 is alone.","One city."]
  },
  "number-of-closed-islands": {
    hints: ["An island touching the edge is not closed.","Sink every island touching the border first. Each island left is closed.","While sinking an island, note if any cell touches the edge."],
    why: ["The centre land is surrounded by water.","The land is on the edge.","Two separate land cells inside."]
  },
  "number-of-enclaves": {
    hints: ["Land that can reach the edge does not count.","Sink land that reaches the border, then count the land cells that remain.","Sink everything reachable from the border, then count what is left."],
    why: ["The centre cell is cut off.","The land is on the edge.","Three land cells in the middle."]
  },
  "surrounded-regions": {
    hints: ["An O group is safe if it touches the edge.","Mark every O that can reach the border. Flip the unmarked ones.","Mark everything reachable from edge Os first, then flip the rest."],
    why: ["The single O is surrounded.","The O is on the edge.","The O at row 1 is captured; the others reach the edge."]
  },
  "pacific-atlantic-water-flow": {
    hints: ["Checking where rain flows from every cell is slow.","Walk uphill from each ocean's edge. Keep the cells both oceans reach.","Walk uphill from each ocean instead, and keep cells both oceans reach."],
    why: ["One cell touches both oceans.","The two 2s reach both; the 1s reach only one each.","The low centre traps its rain; the rim reaches both."]
  },
  "longest-increasing-path-in-a-matrix": {
    hints: ["Paths only go up, so they never loop.","DFS from each cell to larger neighbours, and save each cell's best answer.","Save each cell's best path so it is worked out once."],
    why: ["1, 2, 3, 4.","One cell.","No neighbour is bigger."]
  },
  "shortest-path-in-binary-matrix": {
    hints: ["The shortest path in steps calls for spreading out level by level.","BFS over open cells with eight moves. The first time you reach the corner is the shortest.","Diagonal moves count, so check all 8 neighbours."],
    why: ["Start, then a diagonal step.","The start is blocked.","Two diagonal steps through the middle."]
  },
  "nearest-exit-from-entrance-in-maze": {
    hints: ["Spread out from the entrance step by step.","BFS from the entrance. The first border cell you reach, other than the start, is the answer.","The entrance itself is never an exit, even on the border."],
    why: ["The open cell to the left is on the border.","One step to either end.","Walls all round."]
  },
  "01-matrix": {
    hints: ["Searching from every 1 is slow.","Start from all zeros together and spread outward, writing distances as you go.","Start from all 0s at once and spread outward."],
    why: ["The far corner is 2 steps from the 0.","A single 0.","Each 1 sits next to the 0."]
  },
  "open-the-lock": {
    hints: ["Each code has 8 neighbours: each wheel up or down.","Each lock code is a node with eight neighbours. BFS from 0000 and skip the deadends.","Spread out from 0000 and skip codes that are dead or seen."],
    why: ["Turn the last wheel once.","The lock is jammed from the start.","Avoid 0001 and 0009 by going round another wheel: 4 moves."]
  },
  "word-ladder": {
    hints: ["Words are places, one-letter changes are steps.","Words are nodes and one-letter changes are edges. BFS gives the fewest steps.","Spread out from the start word, trying every letter in every position."],
    why: ["cat, cot, cog, dog.","dog is not in the list.","a straight to c."]
  },
  "subsets-ii": {
    hints: ["Repeats would give the same subset twice.","Sort first. At the same depth, skip a value equal to the one you just tried.","Sort, and at each level skip a value equal to the one just tried."],
    why: ["Six different subsets.","Empty and [0].","Empty, one 5, two 5s."]
  },
  "combinations": {
    hints: ["Pick numbers in rising order so each set appears once.","Pick numbers in rising order and stop once you hold k.","Stop and save when you hold k numbers."],
    why: ["Three pairs.","One way.","All four."]
  },
  "combination-sum-iii": {
    hints: ["Digits 1 to 9, each used at most once.","Pick digits in rising order. Stop when you hold k digits or the sum passes n.","Pick digits in rising order and stop when one is bigger than what is left."],
    why: ["1 + 4 and 2 + 3.","1 + 2 + 3.","Four different digits add up to at least 10."]
  },
  "permutations-ii": {
    hints: ["Equal numbers would make the same ordering twice.","Sort, then skip a value equal to the previous one when that previous one is not in use.","Sort, and only use a repeat if its twin before it is already used."],
    why: ["Three different orderings.","One number.","Both 1s give the same ordering."]
  },
  "combination-sum-ii": {
    hints: ["Each number may be used once, and repeats in the list are separate.","Each number once: move to the next index, and skip equal values at the same depth.","Sort, move to the next index after picking, and skip equal values at the same level."],
    why: ["2 + 5 and 2 + 2 + 3.","Two 1s, listed once.","Both numbers are bigger than 3."]
  },
  "generate-parentheses": {
    hints: ["Build the string one bracket at a time.","Add an opener while some are left. Add a closer only while it would still match an opener.","An opener needs some left; a closer needs an opener to close."],
    why: ["Two ways for two pairs.","Fourteen ways for four pairs.","One way."]
  },
  "palindrome-partitioning": {
    hints: ["Cut off a first piece, then deal with the rest.","Cut off a palindrome prefix and solve the rest the same way.","Only cut off pieces that read the same both ways."],
    why: ["Single letters, or the whole word.","Only single letters.","Four ways to cut three z's."]
  },
  "n-queens": {
    hints: ["Every row holds exactly one queen.","Place one queen per row. Track used columns and both diagonals to prune fast.","Place row by row and check only the queens already placed above."],
    why: ["Four boards work for six queens.","Two queens on a 2 by 2 board always attack.","No way works on a 3 by 3 board."]
  },
  "n-queens-ii": {
    hints: ["Same search as placing the queens, but only count.","The same search as N-Queens, but count the boards instead of building them.","A new queen clashes if it shares a column, or the column gap equals the row gap."],
    why: ["Ten boards for five queens.","No way on a 2 by 2 board.","Four boards for six queens."]
  },
  "find-the-town-judge": {
    hints: ["The judge is trusted by everyone else and trusts nobody.","Count trust given and trust received. The judge receives n-1 and gives none.","Score each person: +1 for being trusted, -1 for trusting. The judge scores n - 1."],
    why: ["Everyone else trusts 2, and 2 trusts nobody.","Person 4 does not trust 2.","A single person is the judge."]
  },
  "find-center-of-star-graph": {
    hints: ["The centre is on every edge.","The centre is in every edge, so it is whichever node the first two edges share.","It must be the node the first two edges share."],
    why: ["1 is in every edge.","2 is in both edges.","6 is in every edge."]
  },
  "is-graph-bipartite": {
    hints: ["Try to colour every node in one of two colours.","Colour each part with two colours as you explore. A neighbour with your colour means no.","A neighbour must get the other colour; the same colour means it fails."],
    why: ["One edge, two colours.","A triangle cannot be two-coloured.","Node 0 is alone; 1 and 2 take different colours."]
  },
  "redundant-connection": {
    hints: ["A tree plus one edge has exactly one loop.","Union-find: the first edge that joins two nodes already in one group is the extra one.","The first edge whose two ends are already joined closes the loop."],
    why: ["1 and 3 are already joined through 2.","3 and 4 are already joined through 1.","1 and 3 are already joined through 2."]
  },
  "number-of-operations-to-make-network-connected": {
    hints: ["Joining k groups needs k - 1 cables.","You need n-1 cables at least. Then the answer is the number of groups minus one.","Fewer than n - 1 cables can never be enough."],
    why: ["Already connected.","Four computers need at least three cables.","The spare cable in the triangle joins computer 3."]
  },
  "network-delay-time": {
    hints: ["The time to reach a node is its shortest path from the start.","Dijkstra from the source. The answer is the longest of the shortest times.","The answer is the slowest of the shortest times."],
    why: ["1 to 3 to 2 takes 1 + 2 = 3, faster than 4.","The signal starts at 2 and cannot reach 1.","Only the start node."]
  },
  "min-cost-to-connect-all-points": {
    hints: ["You need a cheapest set of links that joins every point.","Grow a tree by always adding the cheapest edge to a new point.","Grow one group, always adding the unjoined point with the cheapest link."],
    why: ["|0 - 1| + |0 - 1| = 2.","One point needs no links.","2 to join [2,0], then 3 to join [2,3]."]
  },
  "cheapest-flights-within-k-stops": {
    hints: ["Shortest paths, but you may only take so many flights.","Relax all flights once per allowed stop, using a copy of last round's prices.","Do k + 1 rounds and update from a copy, so each round adds one flight."],
    why: ["0 to 1 to 2 with one stop costs 10.","No stops: only the direct flight of 20.","There is no flight from 0."]
  },
  "path-with-minimum-effort": {
    hints: ["A route's effort is its biggest step, not the total.","Dijkstra where a path costs its biggest single step, not the sum.","Binary search the limit and check whether a route stays within it."],
    why: ["1, 3, 8 has steps 2 and 5.","One cell, no steps.","Walk round the 9s on the 1s."]
  },
  "longest-common-prefix": {
    hints: ["Every word must start with the answer.","Compare letter by letter across all words and stop at the first column that disagrees.","Start with the first word and trim it until every word starts with it."],
    why: ["All three start with \"fla\".","a and b share nothing.","Both words are the same."]
  },
  "design-add-and-search-words-data-structure": {
    hints: ["Words that share a start share a path in a letter tree.","A trie, where a dot tries every child at that depth.","A dot tries every child at that depth."],
    why: ["\"ca.\" finds cat, \"c.t\" finds cat, nothing starts with b.","Nothing was added.","\"g\" is only part of \"go\"; \"..\" matches it."]
  },
  "replace-words": {
    hints: ["For each word, look for the shortest root it starts with.","Put roots in a trie. For each word, walk the trie and stop at the first root ending.","Try the word's starts from shortest to longest and stop at the first root."],
    why: ["sunlight becomes sun, moonbeam becomes moon.","a is shorter than ab; bca has no root.","No roots, nothing changes."]
  },
  "search-suggestions-system": {
    hints: ["Sorted products put the smallest matches first.","Sort the products, then for each typed prefix take the first three that match.","For each typed start, keep up to three products that begin with it."],
    why: ["pear, pen and pencil start with p and with pe.","No product starts with c.","The first three that start with a and with ab."]
  },
  "map-sum-pairs": {
    hints: ["insert replaces a key's old value.","Each trie node stores the sum of values below it. Adjust by the difference on an update.","Keep each key's value; sum adds the values of keys starting with the prefix."],
    why: ["tree and trek both start with \"tre\".","The second insert replaces 1 with 5.","Nothing was inserted."]
  },
  "word-search-ii": {
    hints: ["Searching the board once per word repeats a lot of work.","Put all words in a trie and walk the grid along trie paths. Remove words once found.","Check each different word with the word-search walk (a letter tree shares the work)."],
    why: ["All but x can be traced.","\"aa\" would need the one cell twice.","cot and tot would need cells that are not neighbours."]
  },
  "maximum-xor-of-two-numbers-in-an-array": {
    hints: ["XOR is biggest when the high bits differ.","A trie of bits, highest first. For each number, try to go the opposite way at every bit.","Decide the answer bit by bit from the top, keeping a bit only if two numbers can make it."],
    why: ["2 XOR 4 = 6.","One number with itself is 0.","8 XOR 2 = 10."]
  },
  "fibonacci-number": {
    hints: ["Each number is the two before it added.","Keep only the last two values and roll them forward.","Keep only the last two numbers."],
    why: ["0, 1, 1, 2, 3, 5.","F(0) is 0.","The 10th number is 55."]
  },
  "n-th-tribonacci-number": {
    hints: ["Each number is the three before it added.","Like Fibonacci, but keep the last three values.","Build the list up from 0, 1, 1."],
    why: ["0 + 1 + 1 = 2.","T(0) is 0.","0, 1, 1, 2, 4, 7, 13."]
  },
  "house-robber-ii": {
    hints: ["In a circle, the first and last houses are neighbours.","The houses form a circle, so solve once without the first house and once without the last.","Solve the street twice: once without the first house, once without the last."],
    why: ["The first and last 3 cannot both be taken; take 5.","One house.","The two 6s are neighbours, so 6 + 1."]
  },
  "delete-and-earn": {
    hints: ["Taking a value means taking all its copies, and losing its neighbours.","Total the points for each value. Then it is House Robber over the values in order.","Add up the points per value, then it is the house robber street."],
    why: ["2 + 4 = 6.","All three 5s.","Both 2s, or 1 + 3."]
  },
  "maximum-product-subarray": {
    hints: ["A negative number can turn the smallest product into the biggest.","Track both the largest and smallest product, since a negative flips them.","Keep both the biggest and the smallest product ending here."],
    why: ["4 alone beats any stretch with -3.","-2 x -3 = 6.","0 beats -1."]
  },
  "best-time-to-buy-and-sell-stock-with-cooldown": {
    hints: ["After a sale you must rest one day.","Track three states each day: holding, just sold, and resting. Each comes from yesterday's states.","Track three states each day: holding, just sold, resting."],
    why: ["Buy at 1 and sell at 6.","One day, no trade.","Sell at 3, rest, and there is no time for another."]
  },
  "best-time-to-buy-and-sell-stock-with-transaction-fee": {
    hints: ["Each sale costs the fee, so tiny rises are not worth it.","Two states: cash and holding. Pay the fee when you sell.","Track two states: holding a share, and holding cash."],
    why: ["1 to 5 and 2 to 8: 2 + 4 after fees.","The price never rises.","A rise of 9 is eaten by the fee of 9."]
  },
  "minimum-path-sum": {
    hints: ["You can only arrive from above or from the left.","Each cell adds its value to the cheaper of the cell above and the cell to the left.","Each cell's best = its value + the smaller of above and left."],
    why: ["1 + 2 + 4 = 7.","One cell.","1, 1, 1, 1 along the bottom."]
  },
  "perfect-squares": {
    hints: ["Work out the answer for every number up to n.","Fewest squares for n is one plus the best for n minus each square that fits.","best(i) = 1 + the smallest best(i - square) over squares that fit."],
    why: ["4 + 1 + 1 + 1.","16 is a square.","4 + 1."]
  },
  "coin-change-ii": {
    hints: ["Order does not matter: 1 + 2 is the same as 2 + 1.","Loop coins on the outside so each mix is counted once, not once per order.","Loop over coins outside and amounts inside, so each mix is counted once."],
    why: ["1+1+1+1, 1+1+2 and 2+2.","Making 0 has one way: no coins.","2 coins cannot make 3."]
  },
  "combination-sum-iv": {
    hints: ["Here order matters: 1 + 2 and 2 + 1 are different.","Order matters here, so loop amounts on the outside and numbers on the inside.","Loop over totals outside and numbers inside."],
    why: ["1+1+1, 1+2, 2+1.","5 is bigger than 3.","1+1+1+1 only."]
  },
  "minimum-cost-for-tickets": {
    hints: ["On each travel day, which pass ended up covering it?","For each travel day, take the cheapest of the three passes plus the best before it ran out.","Cost by day d = cheapest of yesterday + 1-day, a week ago + 7-day, a month ago + 30-day."],
    why: ["One 7-day pass for 5.","Two 1-day passes.","The 7-day pass is cheaper than the 1-day pass."]
  },
  "best-time-to-buy-and-sell-stock-iii": {
    hints: ["Two trades, one after another.","Four running values: first buy, first sell, second buy, second sell, each built on the one before.","Keep four running bests: first buy, first sell, second buy, second sell."],
    why: ["1 to 4 and 2 to 7: 3 + 5.","Prices only fall.","One trade of 7."]
  },
  "unique-paths-ii": {
    hints: ["Count paths as before, but a rock has none.","Unique Paths, but a blocked cell holds zero ways.","A rock cell is set to 0 paths."],
    why: ["Right-down or down-right.","The rock blocks the top route.","The start is a rock."]
  },
  "triangle": {
    hints: ["Working from the top, choices pile up. What about from the bottom?","Start at the bottom row. Each cell adds the smaller of its two children below.","From the bottom up, each cell adds the smaller of its two children."],
    why: ["1 + 2 = 3.","One number.","1 + 5 + 1 = 7."]
  },
  "maximal-square": {
    hints: ["A square ending at a cell needs squares above, left and diagonal.","A square ending here is one plus the smallest of the three squares above, left and diagonal.","size = 1 + the smallest of those three neighbours."],
    why: ["The whole 2 by 2 grid.","No 1s.","The 2 by 2 square at the bottom right."]
  },
  "palindromic-substrings": {
    hints: ["Every palindrome has a middle.","Grow from every centre and count each palindrome as it widens.","Spread out from every middle and count each match."],
    why: ["a, a and aa.","Three single letters.","a, b, a and aba."]
  },
  "longest-palindromic-subsequence": {
    hints: ["Look at the two ends of the string.","Grid over both ends. Matching ends add two to the inside, else drop one end.","Matching ends add 2 to the answer for the inside; otherwise drop one end."],
    why: ["\"carac\" can be kept.","Any single letter.","The whole string."]
  },
  "delete-operation-for-two-strings": {
    hints: ["What is left after deleting must be common to both words.","Keep the longest common subsequence. Everything else in both words gets deleted.","Keep the longest common subsequence and delete the rest."],
    why: ["Keep \"ea\": delete t from each.","Already equal.","Delete both letters."]
  },
  "interleaving-string": {
    hints: ["Each letter of s3 comes from s1 or s2.","Grid over prefixes of the two parts. Each cell takes the next letter from one or the other.","Track whether the first i of s1 and j of s2 can make the start of s3."],
    why: ["a, c from s2, b, d from s2.","d cannot come before c.","Empty weaves empty."]
  },
  "target-sum": {
    hints: ["Each number goes in the plus group or the minus group.","The plus group must total (sum + target) / 2. Count subsets that reach it.","Count ways to reach each sum as you add numbers one by one."],
    why: ["-1 + 2 = 1.","Any one of the three can be the minus.","3 can only be 3 or -3."]
  },
  "last-stone-weight-ii": {
    hints: ["Smashing works like splitting the stones into two piles.","Split the stones into two piles as equal as possible. Track reachable sums up to half.","Make one pile as close to half the total as possible."],
    why: ["5 - 3 = 2.","Equal stones vanish.","4 against 1 + 2: 1 left."]
  },
  "maximum-length-of-pair-chain": {
    hints: ["To fit the most pairs, end each one as early as possible.","Sort by end and greedily take each pair that starts after the last one taken.","Sort by end and take each pair that starts after the last end."],
    why: ["All three chain.","[2,3] then [4,6].","One pair."]
  },
  "longest-string-chain": {
    hints: ["A word grows a chain from a word one letter shorter.","Sort by length. Each word's chain is one plus the best of the words made by deleting one letter.","Sort by length; each word's chain = 1 + the best chain of any word made by deleting a letter."],
    why: ["a, ab, abc.","Neither word extends the other.","a, ba, bca."]
  },
  "number-of-longest-increasing-subsequence": {
    hints: ["Track two things per spot: the longest length ending there and how many ways.","For each index keep the best length and how many ways reach it.","A longer chain resets the count; an equal one adds to it."],
    why: ["1, 2, 4 and 1, 2, 3.","Two runs of length 1.","One run."]
  },
  "russian-doll-envelopes": {
    hints: ["Sort by width, then look for rising heights.","Sort by width rising and height falling, then run the fast LIS on heights.","For equal widths, put taller first so they cannot nest in each other."],
    why: ["Each fits in the next.","Same width, so they cannot nest.","[2,3], [4,5], [6,7]."]
  },
  "distinct-subsequences": {
    hints: ["Each letter of s can be used for the next letter of t, or skipped.","Grid of prefixes. A match may be used or skipped, a mismatch may only skip.","Count ways for each prefix of t, going backwards so a letter is not used twice."],
    why: ["Either a with the b.","d never appears.","Either x."]
  },
  "length-of-last-word": {
    hints: ["Spaces at the end do not count.","Skip spaces from the end, then count letters until the next space.","Trim the string and take the last word."],
    why: ["\"there\" has 5 letters.","\"moon\" has 4 letters.","One letter."]
  },
  "find-the-index-of-the-first-occurrence-in-a-string": {
    hints: ["Try each place the needle could start.","Try each start and compare. Learn KMP here to skip re-checking letters.","Stop at the first full match; no match means -1."],
    why: ["\"nan\" starts at index 2.","d is not in abc.","The needle is the whole haystack."]
  },
  "reverse-words-in-a-string": {
    hints: ["Extra spaces should vanish.","Split on spaces, drop the empty pieces, and join the words in reverse order.","Split on runs of spaces, reverse the words, join with single spaces."],
    why: ["two, then one.","The extra spaces are dropped.","One word."]
  },
  "string-to-integer-atoi": {
    hints: ["Read in order: spaces, sign, digits.","Skip spaces, read one sign, then digits. Clamp before each step can overflow.","Stop at the first non-digit, and clamp the result to 32 bits."],
    why: ["Read -17, stop at x.","It starts with a letter.","Too big, so clamp to 2147483647."]
  },
  "zigzag-conversion": {
    hints: ["Deal letters onto rows, going down and then up.","Give each row its own list and bounce the row index down and up as you deal letters.","Turn around at the top and bottom rows."],
    why: ["Row one: A, C, E; row two: B, D.","One row keeps the order.","A E / B D F / C G."]
  },
  "rotate-string": {
    hints: ["Every shift of s is a piece of s written twice.","Every rotation of a word sits inside the word written twice.","Check the lengths match and goal is inside s + s."],
    why: ["Two shifts give cdab.","acb is not a shift.","Same single letter."]
  },
  "repeated-substring-pattern": {
    hints: ["A repeated string shows up again inside itself doubled.","Double the string and drop the first and last letter. The original must still appear.","Search s + s without its first and last letter."],
    why: ["\"xy\" twice.","No shorter piece repeats into xyx.","\"z\" four times."]
  },
  "fizz-buzz": {
    hints: ["Check the rules in the right order.","Check divisible by fifteen first, then three, then five.","Check 15 first, then 3, then 5."],
    why: ["3 becomes Fizz.","5 becomes Buzz.","Just 1."]
  },
  "plus-one": {
    hints: ["Adding 1 can carry all the way to the front.","Add from the last digit. Nines become zeros and carry left.","9 becomes 0 and carries; anything else just goes up by one."],
    why: ["19 + 1 = 20.","9 + 1 = 10.","404 + 1 = 405."]
  },
  "roman-to-integer": {
    hints: ["Most symbols add up; a few are subtracted.","Add each symbol, but subtract it when a larger symbol comes right after.","A symbol smaller than the one after it is subtracted."],
    why: ["X + IV = 10 + 4.","CD + XL + IV = 400 + 40 + 4.","MM + XX + VI."]
  },
  "integer-to-roman": {
    hints: ["Use the biggest symbol that still fits, again and again.","List the values with their symbols, the subtractive pairs included, and take the biggest that fits.","Put the pairs like CM, XC and IV in the list too."],
    why: ["X then IV.","CD, XL, IV.","MM, XX, VI."]
  },
  "reverse-integer": {
    hints: ["Reverse the digits and keep the sign.","Pop digits off the end and push them on, checking for overflow before each push.","If the reversed number does not fit in 32 bits, return 0."],
    why: ["305 reversed is 503.","Trailing zeros vanish.","The reverse is bigger than 2147483647."]
  },
  "excel-sheet-column-number": {
    hints: ["Column names count in base 26.","Base 26 with letters for digits: total times 26 plus the letter's value.","value = value x 26 + the letter's place."],
    why: ["C is the 3rd letter.","A x 26 + B = 26 + 2.","26 x 26 + 26 = 702."]
  },
  "excel-sheet-column-title": {
    hints: ["There is no zero letter, so the counting is shifted.","Base 26 with no zero digit, so subtract one before each mod and divide.","Take one off before each remainder and division."],
    why: ["3 is C.","52 is AZ.","702 is ZZ."]
  },
  "count-primes": {
    hints: ["Checking each number on its own is slow.","Sieve: from each prime p, cross out p squared, then every pth number after it.","Cross out the multiples of each prime, starting from its square."],
    why: ["2, 3, 5, 7, 11.","Nothing below 2.","Just 2."]
  },
  "multiply-strings": {
    hints: ["Multiply like on paper, digit by digit.","Digit i times digit j lands at place i plus j. Add into an array, then carry.","Digit i times digit j lands at position i + j + 1, with a carry to i + j."],
    why: ["12 x 34 = 408.","Anything times 0.","99 x 99 = 9801."]
  },
  "add-digits": {
    hints: ["Adding digits never changes the remainder by 9.","The digital root repeats every nine. Use n mod 9, with care for zero and multiples of nine.","The answer is 1 + (num - 1) % 9, and 0 for 0."],
    why: ["4 + 7 = 11, 1 + 1 = 2.","0 stays 0.","9 stays 9."]
  },
  "greatest-common-divisor-of-strings": {
    hints: ["Both strings must be made of the same repeated piece.","If a plus b equals b plus a, the answer is the prefix of gcd of the two lengths.","If a + b equals b + a, the piece has length gcd of the two lengths."],
    why: ["\"xy\" makes both.","ab + ba is not ba + ab.","\"aa\" makes both."]
  },
  "number-of-1-bits": {
    hints: ["Look at the bits one by one.","n AND (n-1) clears the lowest set bit. Count how many times until zero.","n AND (n - 1) removes the lowest 1 bit; count how often."],
    why: ["7 is 111.","8 is 1000.","255 is eight 1s."]
  },
  "power-of-two": {
    hints: ["A power of two has one 1 bit.","A power of two has exactly one set bit, so n AND (n-1) is zero.","It must be above 0 and n AND (n - 1) must be 0."],
    why: ["64 = 2 to the 6.","6 is 110.","0 is not a power of two."]
  },
  "hamming-distance": {
    hints: ["Count the places where the bits differ.","XOR the two numbers and count the ones.","XOR marks those places with 1; count the 1s."],
    why: ["101 against 010.","The same number.","Only the 8 bit differs."]
  },
  "find-the-difference": {
    hints: ["Every letter of s is in t, plus one more.","XOR every letter of both strings. The added letter is all that remains.","XOR all letter codes of both strings; pairs cancel."],
    why: ["c is the extra one.","z is the only letter.","One more a."]
  },
  "reverse-bits": {
    hints: ["Read the bits one at a time from the end.","Thirty-two times: shift the answer left, add the lowest bit of n, shift n right.","Shift the answer left and add n's last bit, 32 times."],
    why: ["The 1 bit moves to the top: 2 to the 31.","0 stays 0.","110 moves to the top end."]
  },
  "single-number-ii": {
    hints: ["Pairs cancel with XOR, but here values repeat three times.","Count each bit position across all numbers. Counts not divisible by three belong to the loner.","Count each bit across all numbers; the counts not divisible by 3 belong to the single one."],
    why: ["Three 5s, one 2.","Three -1s, one 7.","One number."]
  },
  "height-checker": {
    hints: ["Compare the line with the sorted line.","Sort a copy and count the places where it differs from the original.","Sort a copy and count the spots that differ."],
    why: ["Already sorted.","Every spot differs from 1, 2, 3.","The first two spots differ."]
  },
  "relative-sort-array": {
    hints: ["Values in the second list set the order.","Count the values, write them out in the given order, then the leftovers in rising order.","Rank each value by its place in the second list; others go last, small to large."],
    why: ["3s, then 2, then the rest 1, 5, 9.","Only 4s.","7 first, then 6, 8."]
  },
  "sort-integers-by-the-number-of-1-bits": {
    hints: ["Sort by bit count first.","Sort with a key of bit count first and value second.","Break ties by the value itself."],
    why: ["1 and 4 have one bit, 3 has two.","One number.","8 has one bit, 5 two, 7 three."]
  },
  "custom-sort-string": {
    hints: ["Letters in order come first, in that order.","Count the letters, write them in the order string's order, then add the rest.","Sort by each letter's position in order; others go at the end."],
    why: ["z, y, x.","a, b, then c.","No letter is in order."]
  },
  "h-index": {
    hints: ["Sort the papers from most cited to least.","Sort citations falling. The answer is the last position where the count is at least the position.","Count up h while the next paper has more than h citations."],
    why: ["Two papers have at least 2.","No citations.","One paper with 10."]
  },
  "largest-number": {
    hints: ["Which should come first, 5 or 50?","Sort by which order of two numbers glued together reads bigger.","Put a before b when a + b is bigger than b + a."],
    why: ["56, 5, 50.","Leading zeros collapse to \"0\".","12121 beats 12112."]
  },
  "sort-an-array": {
    hints: ["Without the built-in sort, which sort is always n log n?","Write merge sort or heap sort yourself. Both are n log n in every case.","Merge sort: split, sort each half, merge."],
    why: ["-1, 2, 3.","One number.","0 then the three 4s."]
  },
  "design-parking-system": {
    hints: ["Each size has its own spaces.","Keep one counter per car size and decrease it when a car parks.","A counter per size; park only if it is above 0."],
    why: ["One big space: the second big car is turned away.","No medium spaces.","Two medium spaces fill up."]
  },
  "number-of-recent-calls": {
    hints: ["Times only grow, so old pings can be thrown away for good.","Keep a queue of times. Drop times older than the window before counting.","A queue: drop pings older than t - 3000 from the front."],
    why: ["At 3011, the ping at 10 is too old.","One ping.","At 6002, the ping at 3001 is just too old."]
  },
  "design-hashmap": {
    hints: ["Store each key's value somewhere you can find it fast.","The HashSet idea, but each bucket entry holds a key and its value.","Put returns nothing, get returns -1 for a missing key."],
    why: ["Key 4 was never put.","The second put replaces 1 with 9.","The key was removed."]
  },
  "design-browser-history": {
    hints: ["Visiting a new page throws away the forward pages.","A list of pages and a current index. Visiting cuts off everything after the index.","A list and a position: back and forward just move the position within bounds."],
    why: ["Back to a.com, forward to b.com.","You cannot go back past the start.","Visiting q drops p, so forward stays on q."]
  },
  "design-circular-queue": {
    hints: ["A fixed array where the end wraps round to the start.","A fixed array with a head index and a count. Positions wrap around with modulo.","Keep a head position and a count; the tail is (head + count) mod k."],
    why: ["The queue holds two; after one leaves, 4 fits.","A new queue is empty.","The second deQueue finds nothing."]
  },
  "remove-duplicates-from-sorted-array": {
    hints: ["Repeats sit next to each other.","Sorted means repeats sit together. Write a value only when it differs from the last one written.","Write a value only when it differs from the last one written."],
    why: ["1, 2, 5, 8: four different values.","Only -3.","Nothing repeats."]
  },
  "remove-element": {
    hints: ["Keep the values that are not val.","Copy every value you keep to a write pointer. Its final spot is the new length.","Copy each kept value to the next write spot."],
    why: ["1 and 4 are kept.","Every value is 5.","Nothing is 4."]
  },
  "remove-duplicates-from-sorted-array-ii": {
    hints: ["Each value may appear at most twice.","Write a value only if it differs from the one written two places back.","Write a value if it differs from the one written two spots back."],
    why: ["Two 1s, one 2, two 3s.","Two 4s are fine.","Nothing repeats."]
  },
  "binary-subarrays-with-sum": {
    hints: ["A stretch's sum is the difference of two running sums.","Count windows with sum at most goal, minus those with sum at most goal-1.","Count how often each running sum appeared, and look up sum - goal."],
    why: ["Four stretches hold two 1s.","Every stretch of zeros: 6.","Only the whole list holds three 1s."]
  },
  "count-number-of-nice-subarrays": {
    hints: ["Only odd numbers matter; treat them as 1 and the rest as 0.","Treat odd numbers as ones. Then it is Binary Subarrays With Sum in disguise.","Then count stretches with sum k using running sums."],
    why: ["Stretches holding both 1 and 3.","No odd numbers.","Each number alone."]
  },
  "number-of-substrings-containing-all-three-characters": {
    hints: ["Once a stretch holds a, b and c, adding letters on the left keeps it valid.","Once a window holds a, b and c, every longer ending also works. Count them in one go.","For each end, every start up to the oldest of the last a, b and c works."],
    why: ["Only \"abc\".","\"aaacb\", \"aacb\" and \"acb\".","\"bbcca\" and \"bcca\"."]
  },
  "substring-with-concatenation-of-all-words": {
    hints: ["Every word is the same length, so cut the window into word-sized pieces.","Words share a length, so run one word-sized window per starting offset and count words inside.","Count the pieces and stop as soon as one is not needed or used too often."],
    why: ["\"dogcat\" at 0 and \"catdog\" at 6.","\"aaaa\" is \"aa\" twice.","s is too short."]
  },
  "insert-delete-getrandom-o1": {
    hints: ["A list gives random picks; a map gives fast lookups.","An array for random picks plus a map from value to index. Delete by swapping with the last item.","To remove, move the last item into the gap so the list has no holes."],
    why: ["9 is the only value left to pick.","1 was not there to remove.","2 is added once and removed once."]
  },
  "number-of-ways-to-split-array": {
    hints: ["With the total known, the right side follows from the left.","Walk the cut point and compare the running total with what remains.","Walk the cut point with a running left sum."],
    why: ["Cuts after 5 and after 3 work.","1 against 1.","The left side is always smaller."]
  },
  "xor-queries-of-a-subarray": {
    hints: ["XOR undoes itself, just as subtraction undoes addition.","Running XOR works like a running sum: a range is two prefixes XORed together.","Build running XORs once; a range is prefix after it XOR prefix before it."],
    why: ["3^6 = 5, 6^1 = 7, 3^6^1 = 4.","One number.","2^4^8 = 14, and 4 alone."]
  },
  "range-sum-query-2d-immutable": {
    hints: ["Running totals work in two directions too.","Running totals in two directions. A rectangle is one big box minus two strips plus a corner.","A rectangle = big corner - top strip - left strip + the overlap added back."],
    why: ["The whole grid adds to 10; the bottom row to 7.","One cell.","14 for the right two columns, 8 for the middle row, 6 for the corner."]
  },
  "make-sum-divisible-by-p": {
    hints: ["You must remove a stretch whose remainder equals the total's remainder.","Find the shortest stretch whose remainder equals the total's remainder, using a map of last positions.","Track where each running remainder was last seen and look for cur - need."],
    why: ["Remove [6, 2]: 8 has the same remainder 3 as the total 13.","The total 10 already divides by 5.","Removing the only number is not allowed."]
  },
  "matrix-block-sum": {
    hints: ["Each cell adds up the block around it.","Build 2D running totals once, then read each block with four lookups.","Stay inside the grid edges when the block runs off it (2D running totals make it faster)."],
    why: ["Every block covers the whole 2 by 2 grid.","The block is just the cell.","With k = 0 each block is the cell itself."]
  },
  "number-of-submatrices-that-sum-to-target": {
    hints: ["Fix the top and bottom rows; then columns squash into one list.","Fix a top and bottom row, squash the columns into one list, then run Subarray Sum Equals K.","On that list, count stretches with the target sum using running sums."],
    why: ["[2, -2] and the single 0.","The single cell.","[3] and [1, 2]."]
  },
  "guess-number-higher-or-lower": {
    hints: ["Each answer tells you which half to keep.","The guess reply tells you which half to keep. Halve until it says zero.","Guess the middle; -1 means go lower, 1 means go higher."],
    why: ["The hidden number is 6.","Only one choice.","The top of the range."]
  },
  "first-bad-version": {
    hints: ["Builds go fine, fine, then broken from some point on.","The answer is the first true in a run of false then true. Halve toward it.","A broken middle means the answer is there or earlier; keep it in range."],
    why: ["Build 4 is the first broken one.","One build.","Everything is broken from 1."]
  },
  "find-k-closest-elements": {
    hints: ["The answer is k neighbours in the sorted list.","Binary search the left edge of the k window by comparing its two outside neighbours.","Binary search the window's start by comparing the values just outside each end."],
    why: ["5 and 7 are both 1 away from 6.","2, 4, 4 are closest to 4.","2 is closer to 10 than 1."]
  },
  "find-minimum-in-rotated-sorted-array-ii": {
    hints: ["Repeats can hide which side holds the drop.","Same as without repeats, but when middle equals right you can only drop the right end.","When the middle equals the end, you can only drop the end."],
    why: ["The drop is from 5 to 1.","All equal.","The drop is from 2 to 0."]
  },
  "find-in-mountain-array": {
    hints: ["The list rises to one top, then falls.","Find the peak first, then binary search the rising side, then the falling side.","Find the top first, then search each side separately, the rising side first."],
    why: ["3 is at index 1 and again at 4; the first wins.","9 is not there.","1 is at index 0."]
  },
  "determine-whether-matrix-can-be-obtained-by-rotation": {
    hints: ["There are only four possible turns.","Rotate a quarter turn up to four times and compare with the target each time.","Turn a quarter at a time and compare after each."],
    why: ["One quarter turn moves the 1 to the top right.","No turn makes the target.","Some quarter turn gives the target."]
  },
  "diagonal-traverse": {
    hints: ["Cells on one anti-diagonal share row + column.","Cells on one diagonal share row plus column. Walk each diagonal, flipping direction every time.","Collect each diagonal and reverse every other one."],
    why: ["1, then 2 and 3, then 4.","1, then 2, 4, then 5, 3, then 6.","One column."]
  },
  "sort-the-matrix-diagonally": {
    hints: ["Cells on one down-right diagonal share row - column.","Cells on one diagonal share row minus column. Collect, sort and write each group back.","Group by row - column, sort each group, write it back in order."],
    why: ["3 and 1 on the main diagonal swap.","One cell.","Diagonals 5,1 and 4,0 sort."]
  },
  "search-a-2d-matrix-ii": {
    hints: ["Start where one move always rules something out.","Start at the top-right corner. Too big? Go left. Too small? Go down.","From the top-right: too big, go left; too small, go down."],
    why: ["5 is bottom right.","3 is between 2 and 4.","One cell."]
  },
  "meeting-rooms": {
    hints: ["Clashes show up between neighbours once sorted by start.","Sort by start. Any meeting that starts before the previous one ends is a clash.","A meeting that starts before the last one ends clashes."],
    why: ["Back to back is fine.","[2,3] is inside [1,4].","No meetings."]
  },
  "meeting-rooms-ii": {
    hints: ["At any moment, how many meetings are running?","Sort starts and ends separately. A start before the earliest end needs another room.","Sort starts and ends separately; a start before the earliest end needs another room."],
    why: ["[1,5] and [2,6] overlap.","A room is free the moment a meeting ends.","All three overlap."]
  },
  "my-calendar-ii": {
    hints: ["Keep track of where two bookings already overlap.","Keep the bookings and the overlaps apart. A new booking fails if it hits an overlap.","A new booking that touches any double-booked part is refused."],
    why: ["[4,6] would make a triple booking at 4 to 5.","One booking.","[9,11] would triple-book 9 to 10."]
  },
  "maximum-number-of-events-that-can-be-attended": {
    hints: ["On each day, which open event should you go to?","Walk day by day. Push events that opened into a heap by end day and attend the soonest-ending one.","Go to the one that ends soonest; the others can wait."],
    why: ["One event a day.","They all happen on day 1.","[1,1] on day 1, [2,2] on day 2, [1,5] on day 3."]
  },
  "my-calendar-iii": {
    hints: ["Count how many bookings run at each moment.","Add one at every start and remove one at every end. The highest running total is the answer.","+1 at each start and -1 at each end; the highest running total is the answer."],
    why: ["The three bookings all overlap at 5 to 6.","They only touch at 2.","[5,25] overlaps each of the others once."]
  },
  "minimum-interval-to-include-each-query": {
    hints: ["For each query, look at the intervals that cover it.","Sort queries and intervals. Push intervals that started into a heap by size and pop the ones that ended.","Keep the smallest size r - l + 1, or -1 if none covers it."],
    why: ["2 is in [1,3] (size 3), 5 only in [2,8] (size 7).","5 is covered by [5,5]; 4 is not.","4 is in [3,4] (size 2); 1 and 10 only in [1,10]."]
  },
  "maximize-sum-of-array-after-k-negations": {
    hints: ["Flipping a negative number helps the most.","Flip the most negative numbers first. Spend any odd flips left on the smallest value.","Flip the smallest negatives first; spend odd flips left on the smallest value."],
    why: ["Flip -1.","Flip -4 and -3, then the last flip goes on 1.","Flip 2 twice."]
  },
  "dota2-senate": {
    hints: ["Each senator should ban the next opponent in line.","Two queues of turn numbers. The earlier senator bans the other and rejoins at the back.","Two queues of turn numbers; the winner of each meeting rejoins with turn + n."],
    why: ["R bans D first.","D bans one R, but the other R bans D.","The two Ds act first and ban enough Rs."]
  },
  "minimum-number-of-taps-to-open-to-water-a-garden": {
    hints: ["Turn each tap into the stretch it waters.","Turn each tap into a reach, then solve it like Jump Game II.","Then it is jumping: from each start point, how far can you reach?"],
    why: ["Taps 0 and 2 cover 0 to 3.","No tap waters anything.","Tap 2 covers the whole garden."]
  },
  "minimum-remove-to-make-valid-parentheses": {
    hints: ["A closer with no opener must go, and so must openers never closed.","Stack the indexes of open brackets. Drop unmatched closers and whatever openers remain.","A stack of opener positions finds both kinds."],
    why: ["The first ) has no opener.","Nothing matches.","Drop the first opener."]
  },
  "basic-calculator": {
    hints: ["A bracket may be negated, which flips every sign inside.","On an opening bracket, save the running result and sign. On a closing one, fold back in.","On ( save the result and sign; on ) fold the inner result back in with that sign."],
    why: ["2 - 4 = -2.","-(5) = -5.","10 + 20 - 3."]
  },
  "furthest-building-you-can-reach": {
    hints: ["Ladders are best saved for the biggest climbs.","Use ladders on the biggest climbs. Keep climbs in a heap and pay bricks for the smallest one.","Keep climbs sorted; ladders cover the biggest, bricks pay for the rest."],
    why: ["Climb 4 with bricks and 4 with the ladder.","Going down is free.","The climb of 2 needs more than 1 brick."]
  },
  "single-threaded-cpu": {
    hints: ["When the processor is free, which waiting task goes next?","Sort by arrival. Push arrived tasks into a heap by length and run the shortest.","Shortest processing time first, smaller index on a tie; idle until the next arrival if none wait."],
    why: ["Task 0 runs first, then the shorter task 1.","Tasks 1 and 2 are shorter than 0.","Task 1 arrives after 0 has finished."]
  },
  "maximum-subsequence-score": {
    hints: ["The smallest nums2 value sets the multiplier.","Sort by the multiplier, largest first. Keep the k largest sums in a min heap as the minimum falls.","Go through nums2 from big to small; keep the k biggest nums1 values so far."],
    why: ["Indexes 0 and 2: (2 + 3) x 2 = 10.","5 x 7.","(1 + 1 + 1) x 9."]
  },
  "minimum-cost-to-hire-k-workers": {
    hints: ["Everyone is paid at the same rate per quality.","Sort by wage per quality. Keep the k smallest qualities in a heap as the rate rises.","The rate is set by the worker who needs the most per quality; keep the smallest qualities."],
    why: ["Hiring only the second worker costs 40.","Rate 2 with qualities 1 and 2: 6.","Rate 3 for both: 8 x 3 = 24."]
  },
  "ipo": {
    hints: ["Capital only grows, so more projects unlock over time.","Unlock projects you can afford into a max heap by profit, then take the best one.","Each time, do the most profitable project you can afford."],
    why: ["Only the first is affordable: profit 2.","Do 2, then 3: 1 + 2 + 3 = 6.","Nothing is affordable."]
  },
  "minimum-number-of-refueling-stops": {
    hints: ["Drive as far as you can and remember the stations you passed.","Drive as far as you can, remembering passed stations in a heap. When stuck, refuel at the biggest.","When stuck, refuel at the biggest station passed."],
    why: ["Enough fuel already.","The first station is out of reach.","Refuel 25 at the first station."]
  },
  "sliding-window-median": {
    hints: ["Each window needs its middle value.","Two heaps as in the stream median, with lazy removal of numbers that left the window.","Sort each window (two heaps make it faster)."],
    why: ["Means of 1 and 4, then 4 and 2, then 2 and 3.","One window.","Every window is all 2s."]
  },
  "swapping-nodes-in-a-linked-list": {
    hints: ["Find the k-th node from each end.","Find the kth node from the front and from the back with a gap pointer, then swap values.","A runner k steps ahead finds the k-th from the back when it reaches the end."],
    why: ["The first and last swap values.","One node swaps with itself.","6 and 8 swap."]
  },
  "add-two-numbers-ii": {
    hints: ["The digits come biggest first, but adding starts from the ones.","Reverse both lists so the digits line up from the end, add with a carry, and reverse back.","Push both lists' digits onto stacks and pop to add from the end."],
    why: ["99 + 1 = 100.","0 + 0.","342 + 46 = 388."]
  },
  "intersection-of-two-linked-lists": {
    hints: ["The two lists may have different lengths before they join.","When a walker ends, restart it on the other list. Both cover the same distance and meet.","When a walker ends, restart it on the other list; both meet at the join."],
    why: ["They join at the node with value 8, index 2 of A.","They never join.","B joins A at its first node."]
  },
  "linked-list-cycle-ii": {
    hints: ["First find out if there is a loop at all.","After they meet, restart one pointer at the head. Moving one step each, they meet at the loop's entry.","After slow and fast meet, a new walker from the head meets slow at the loop start."],
    why: ["The loop starts at index 2.","The last node points back to index 0.","No loop."]
  },
  "convert-sorted-list-to-binary-search-tree": {
    hints: ["The middle value keeps the tree balanced.","The middle node is the root. Find it with fast and slow, then build each half the same way.","Copy the values into a list so finding the middle is easy."],
    why: ["2 in the middle.","Empty list.","0 in the middle, then -3, 4 and 8."]
  },
  "circular-array-loop": {
    hints: ["Follow the jumps from each start.","Run fast and slow from each start, stopping when direction flips or a loop has length one.","A valid loop keeps one direction and visits more than one index."],
    why: ["0, 1, 2, 0 forward.","One loop flips direction, the other jumps onto itself.","1 and 2 jump to each other."]
  },
  "count-sub-islands": {
    hints: ["Explore each island of the second grid.","Explore each island in the second grid. It counts only if every cell is land in the first grid too.","It counts only if every one of its cells is land in the first grid."],
    why: ["Both single cells are land in the first grid.","One cell of the island is water in the first grid.","No islands."]
  },
  "find-eventual-safe-states": {
    hints: ["A node is unsafe if some path from it loops.","Colour nodes as visiting or safe. A node is unsafe if any path from it runs into a visiting node.","Mark nodes while you visit them; reaching a marked node means a loop."],
    why: ["Every path ends at node 2.","0 and 1 loop.","2 loops to itself, and 1 can reach 2."]
  },
  "evaluate-division": {
    hints: ["Each fact is an arrow with a ratio, both ways.","Each equation is a weighted edge both ways. Multiply weights along a path from top to bottom.","Multiply ratios along any path from c to d."],
    why: ["x/y = 3, so y/x = 1/3; z is unknown.","a/c = 2 x 5; c/a = 1/10; a/a = 1.","q/q = 1; r is unknown."]
  },
  "populating-next-right-pointers-in-each-node": {
    hints: ["Every level is full, so each node has two children.","Use the next links of the level above to wire up the level below.","Use the next links of the level above to link the level below."],
    why: ["2 points to 3.","Empty tree.","Each level is linked left to right."]
  },
  "all-nodes-distance-k-in-binary-tree": {
    hints: ["From the target you can go down, but also up.","Add parent links so the tree becomes a graph, then BFS k rings out from the target.","Record each node's parent, then spread out k steps like a graph."],
    why: ["1 above, 4 and 5 below.","k = 0 is the target itself.","4 to 2 to 1 to 3."]
  },
  "shortest-bridge": {
    hints: ["Start from the whole first island at once.","Mark one island with DFS, then BFS outward from all its cells until you touch the other.","Mark one island, then spread out ring by ring until the other is touched."],
    why: ["One diagonal step needs one cell filled.","Fill the middle 0.","Fill the two 0s."]
  },
  "snakes-and-ladders": {
    hints: ["Each square is a place, each die roll a step.","Each square is a node with up to six moves. Follow any snake or ladder at once, then BFS.","Find a square's cell carefully: rows switch direction."],
    why: ["Roll to 7, then to 9.","Roll straight to 4.","Square 2 has a ladder to 9."]
  },
  "shortest-path-in-a-grid-with-obstacles-elimination": {
    hints: ["Where you are is not enough; how many breaks are left matters too.","The state is cell plus removals left. BFS over those states.","Search over (cell, breaks left) states."],
    why: ["Both routes go through a wall.","Break one wall.","Already at the end."]
  },
  "bus-routes": {
    hints: ["Count buses, not stops.","BFS over buses, not stops. Two buses connect if they share a stop.","Each round, ride every new bus from the stops reached so far."],
    why: ["Bus 0 to stop 3, then bus 1 to stop 4.","Already there.","No bus links the two routes."]
  },
  "binary-watch": {
    hints: ["There are only 12 x 60 times.","Try every hour and minute and keep the times whose bits add up to the count.","Try them all and count the lit bits of the hour and minute."],
    why: ["No lights: midnight.","No valid time uses 9 lights.","One light: one hour bit or one minute bit."]
  },
  "restore-ip-addresses": {
    hints: ["Each part is 1 to 3 digits.","Cut one to three digits at a time. Each part must be 0 to 255 with no leading zero.","A part must be 0 to 255 and not start with 0 unless it is \"0\"."],
    why: ["Only one way.","Two ways to place the dots.","Three digits cannot make four parts."]
  },
  "maximum-length-of-a-concatenated-string-with-unique-characters": {
    hints: ["Choose a subset of words with no shared letters.","Take or skip each word, keeping a set of used letters. Skip words with inner repeats.","Skip any word that repeats a letter itself."],
    why: ["\"ab\" + \"cd\".","\"aa\" repeats a letter.","\"xyz\" + \"w\"."]
  },
  "matchsticks-to-square": {
    hints: ["The total must split into four equal sides.","Sort longest first and drop each stick into one of four sides that still has room.","Place long sticks first and skip a side that looks the same as one already tried."],
    why: ["One stick per side.","7 does not split into four.","Sides 3, 3, 1 + 2, 2 + 1."]
  },
  "partition-to-k-equal-sum-subsets": {
    hints: ["Each group must reach total / k.","Fill one bucket at a time up to the target. Skip a bucket state you already know fails.","Place big numbers first; they fail fastest."],
    why: ["2 + 2 and 4.","11 does not split into two.","One 5 each."]
  },
  "sudoku-solver": {
    hints: ["Fill one empty cell at a time.","Fill the next empty cell with any legal digit, then go deeper. Undo when stuck.","Try each digit not used in its row, column and box; undo when stuck."],
    why: ["The board fills in with every rule kept.","The board fills in with every rule kept.","The board fills in with every rule kept."]
  },
  "permutation-sequence": {
    hints: ["Orderings starting with 1 come first, then those starting with 2...","Each first digit covers (n-1)! permutations. Divide k to pick digits one by one.","Each first digit covers (n - 1)! orderings; divide to choose it."],
    why: ["123, then 132.","One digit.","The last ordering is fully reversed."]
  },
  "unique-paths-iii": {
    hints: ["Every open cell must be stepped on exactly once.","Walk from the start, marking cells. Count arrivals at the end only when every empty cell is used.","Count the cells to cover, and only count a walk that ends with none left."],
    why: ["Straight to the end.","Through the 0 to the end.","The end is reached before both 0s are covered."]
  },
  "remove-invalid-parentheses": {
    hints: ["Remove one bracket at a time and check the results.","First count how many of each bracket must go, then try removals and keep the valid results.","Search level by level; the first level with valid strings is the answer."],
    why: ["Remove one of the last two closers.","Both brackets must go.","No brackets."]
  },
  "solving-questions-with-brainpower": {
    hints: ["Solving a question skips the next few.","Fill from the back: solve this one and jump ahead, or skip to the next.","Work from the back: best(i) = max(skip, points + best after the skipped ones)."],
    why: ["Solve the first and the last: 5 + 4.","One question.","Skip the first and solve the other two."]
  },
  "best-time-to-buy-and-sell-stock-iv": {
    hints: ["Up to k buy-sell pairs.","The same buy and sell chain as III, stretched to k pairs.","Track the best buy and sell value for each trade number."],
    why: ["Buy at 1, sell at 4.","1 to 5 and 2 to 8.","Prices only fall."]
  },
  "maximum-profit-in-job-scheduling": {
    hints: ["Jobs that overlap cannot both be taken.","Sort by end time. Each job adds its profit to the best result before it starts, found by binary search.","Sort by end; each job adds its profit to the best before its start."],
    why: ["They overlap; take the 6.","[1,3] then [3,5].","One job."]
  },
  "burst-balloons": {
    hints: ["Choosing the first balloon to burst is messy. What about the last one?","Pick the balloon that pops last in a range. Its neighbours are then the range edges.","The last balloon in a range bursts next to the range's two edges."],
    why: ["1 x 5 x 1.","Burst 1 first (5), then 5 (5).","Burst 3 first (24), then 2 (8), then 4 (4)."]
  },
  "regular-expression-matching": {
    hints: ["\"*\" means the letter before it zero or more times.","Grid over both strings. A star means use the letter zero times or once more.","With a star, either skip the pair or use it on one more matching letter."],
    why: ["\".\" matches the b.","a* covers all three a's.","There is no c in s."]
  },
  "design-linked-list": {
    hints: ["Index 0 and the end are just special indexes.","Keep a dummy head and a size. Every operation walks to the node just before the index.","A dummy head makes every insert and delete the same."],
    why: ["The list goes 4, 6, 8; after deleting 4 it is 6, 8.","Empty, then 3.","Index 1 is past the end of an empty list."]
  },
  "remove-duplicates-from-sorted-list-ii": {
    hints: ["Values that repeat must vanish completely.","From a dummy head, when a value repeats, skip the whole run before linking on.","When the next value equals this one, skip the whole run."],
    why: ["The 2s go.","Everything repeats.","The 1s go."]
  },
  "copy-list-with-random-pointer": {
    hints: ["Random pointers can point forward to nodes not copied yet.","Map each old node to its copy in one pass, then wire next and random in a second.","First make every copy, then wire next and random from a map."],
    why: ["The second node points back to the first.","Empty list.","Both point to the second node."]
  },
  "remove-duplicate-letters": {
    hints: ["Smaller letters should come first if they can.","Keep letters rising, but only pop a letter if it appears again later.","Pop a bigger letter only if it shows up again later."],
    why: ["The first b can go, since b comes again.","The first z can go; y and x cannot.","One a."]
  },
  "longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit": {
    hints: ["The window needs its max and min quickly.","Two deques track the window's max and min. Shrink from the left when they drift too far.","Two queues: one keeps falling values for the max, one rising for the min."],
    why: ["[1, 3] differ by 2.","All equal.","No two neighbours are equal."]
  },
  "maximal-rectangle": {
    hints: ["Each row turns into a histogram of heights above it.","Each row turns into a histogram of heights. Run the largest-rectangle stack on every row.","Run the largest-rectangle-in-histogram stack on every row."],
    why: ["The whole 2 by 2 grid.","No 1s.","The bottom row of three."]
  },
  "shortest-subarray-with-sum-at-least-k": {
    hints: ["Negative numbers break the usual sliding window.","Keep a deque of rising prefix sums. Pop the front while it makes a valid subarray.","Keep a queue of running sums that only rise."],
    why: ["All three numbers.","1 is less than 2.","5 alone."]
  },
  "number-of-visible-people-in-a-queue": {
    hints: ["Look from the right end.","Walk from the right. Everyone shorter you pop is visible, plus the next taller person.","Pop everyone shorter (they are seen), then one taller person is seen too."],
    why: ["3 sees 1 and 2; 1 sees 2.","Nobody to the right.","Each sees the next person only."]
  },
  "delete-node-in-a-bst": {
    hints: ["Deleting a node with two children needs a stand-in.","Find the node. With two children, copy in the smallest value on the right and delete that one.","Use the smallest value on the right side, then delete that node instead."],
    why: ["3 had no children.","The tree becomes empty.","9 is not there."]
  },
  "binary-search-tree-iterator": {
    hints: ["The smallest value is down the left edge.","Keep a stack of the left path. Each next pops one node and pushes the left path of its right child.","Keep a stack of the left path; after a pop, push the left path of its right child."],
    why: ["2, 5, 8 in order.","One value.","1, 2, 3 in order."]
  },
  "construct-binary-tree-from-inorder-and-postorder-traversal": {
    hints: ["Postorder ends with the root.","Postorder ends with the root. Build the right subtree first as you read it backwards.","Read postorder backwards and build the right side before the left."],
    why: ["Root 1, left 2, right 3.","One node.","Root 1 with right child 2."]
  },
  "construct-binary-search-tree-from-preorder-traversal": {
    hints: ["Preorder gives the root first, then the left side.","Read values in order and pass down an upper limit. A value above the limit belongs higher up.","Pass an upper limit down; a value over the limit belongs higher up."],
    why: ["4 with children 2 and 6.","3 goes right of 1.","A chain down the left."]
  },
  "longest-zigzag-path-in-a-binary-tree": {
    hints: ["At each node, a path may arrive going left or going right.","Each node returns two lengths: one if you arrived going left, one going right.","Carry two lengths and switch them as you step."],
    why: ["One step.","No steps.","Right, left, right."]
  },
  "delete-nodes-and-return-forest": {
    hints: ["A deleted node's children become new roots.","Work bottom up. When a node is deleted, its surviving children become new roots.","Tell each child whether its parent was deleted."],
    why: ["Removing 1 leaves 2 and 3.","Removing 2 leaves 1.","Nothing is left."]
  },
  "unique-binary-search-trees": {
    hints: ["Any value can be the root.","Pick each value as the root. Trees on the left times trees on the right, summed.","Shapes with root r = shapes on the left x shapes on the right."],
    why: ["One node, one shape.","Five shapes.","Fourteen shapes."]
  },
  "serialize-and-deserialize-binary-tree": {
    hints: ["Empty spots must be written down, or the shape is lost.","Write a preorder list with markers for empty spots, then read it back in the same order.","Write preorder with a marker for each empty spot, then read it back the same way."],
    why: ["The tree survives the round trip.","Empty tree.","One node."]
  },
  "binary-tree-cameras": {
    hints: ["Cameras are best placed above the leaves.","Go bottom up with three states: has a camera, covered, or needs cover. Place cameras above leaves.","Return a state from each node: needs cover, has a camera, or covered."],
    why: ["One node needs one camera.","One camera at the root covers both children.","A chain of four needs two."]
  },
  "vertical-order-traversal-of-a-binary-tree": {
    hints: ["Give every node a column and a row.","Record column, row and value for every node, sort them, then group by column.","Sort by column, then row, then value, and group by column."],
    why: ["2 on the left, 1 in the middle, 3 on the right.","One node.","5 and 6 share a spot, so smaller first."]
  },
  "possible-bipartition": {
    hints: ["Dislikes are edges; two groups are two colours.","Dislikes are edges. The question is whether the graph can take two colours.","Colour as you explore; a dislike with the same colour fails."],
    why: ["3 can join either group.","Three people who all dislike each other.","No dislikes."]
  },
  "satisfiability-of-equality-equations": {
    hints: ["Equal letters form groups.","Union all the equal pairs first, then check that no unequal pair shares a group.","Join all == pairs first, then check every != pair is in different groups."],
    why: ["a, b and c are joined, but a != c.","x and y can differ.","q equals itself."]
  },
  "accounts-merge": {
    hints: ["Shared emails join accounts.","Union emails that appear in the same account, then gather each group under one name.","Join emails into groups, then list each group sorted with its name."],
    why: ["The first and third share b@x.","One account.","Both accounts are the same email."]
  },
  "most-stones-removed-with-same-row-or-column": {
    hints: ["Stones linked by rows and columns form groups.","Stones sharing a row or column join one group. Each group can shrink to one stone.","Each group can be removed down to one stone."],
    why: ["One group of three: remove two.","One stone.","Two separate stones."]
  },
  "minimum-height-trees": {
    hints: ["The best roots sit in the middle of the tree.","Peel off leaves layer by layer. The last one or two nodes left are the centres.","Peel off the leaves layer by layer; the last one or two nodes are the answer."],
    why: ["One node.","1 is the middle of a path of three.","1 and 2 are the middle of a path of four."]
  },
  "find-all-possible-recipes-from-given-supplies": {
    hints: ["A recipe can be made once all its ingredients are in hand.","Topological order: a recipe is ready once all its ingredients are ready.","Keep making new recipes until a full pass makes nothing new."],
    why: ["Flour and water are both supplies.","There is no leaf.","a needs b and b needs a: neither can start."]
  },
  "course-schedule-iv": {
    hints: ["\"Before\" carries through chains: 0 before 1 before 2 means 0 before 2.","Walk courses in topological order and pass each course's full set of prerequisites forward.","Fill a table of \"i before j\" and close it through every middle course."],
    why: ["0 comes before 2 through 1; 2 does not come before 0.","No rules at all.","1 and 2 are not linked; 0 comes before 2."]
  },
  "path-with-maximum-probability": {
    hints: ["A path's chance is the product of its edges.","Dijkstra with a max heap, multiplying probabilities instead of adding distances.","Keep the best chance per node and improve it until nothing changes."],
    why: ["0.5 x 0.5 = 0.25.","No path at all.","0.9 x 0.9 = 0.81 beats the direct 0.5."]
  },
  "number-of-ways-to-arrive-at-destination": {
    hints: ["First find the shortest time, then count routes that match it.","Dijkstra that also counts: equal distance adds ways, shorter distance resets them.","A shorter route resets a town's count; an equal one adds to it."],
    why: ["One road, one route.","0-1-2 and 0-2 both take 2 minutes.","Already there."]
  },
  "build-a-matrix-with-conditions": {
    hints: ["Rows and columns are two separate ordering puzzles.","Sort the row rules and column rules each with topological order, then place each number.","Find an order for each with topological sort; a loop means no grid."],
    why: ["1 is above 2, and 2 is left of 1.","1 above 2 above 3 above 1 is a loop.","One number in one cell."]
  },
  "reconstruct-itinerary": {
    hints: ["You must use every ticket exactly once.","Take tickets in name order and add an airport to the route once it has no tickets left. Then reverse.","Fly in name order; an airport joins the route when its tickets run out, then reverse."],
    why: ["HUB to CAT to DOG.","A comes before B, and A leads back to HUB.","One ticket from HUB to itself."]
  },
  "swim-in-rising-water": {
    hints: ["The time needed is the highest square on your route.","Dijkstra where a path costs its highest cell. Always expand the lowest cell you can reach.","Binary search the time and check if a route stays at or below it."],
    why: ["The goal square itself is 3.","Already there.","The goal square is 8."]
  },
  "critical-connections-in-a-network": {
    hints: ["A link on a loop is never critical.","Track when each node is first seen and the earliest node it can reach back to. Bridges fail that check.","A link to v is critical when nothing below v can reach back above it."],
    why: ["The only link.","Every link is on the triangle loop.","2-3 is the only link not on a loop."]
  },
  "find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree": {
    hints: ["Try the tree without an edge, and with it forced in.","Rebuild the tree without each edge, then forced to use it, and compare the totals.","Skipping it costs more: critical. Forcing it costs the same: pseudo-critical."],
    why: ["Any two of the three equal edges work.","The only edge must be used.","The two cheapest edges are needed."]
  },
  "minimum-cost-to-make-at-least-one-valid-path-in-a-grid": {
    hints: ["Following an arrow is free; going another way costs 1.","Following a sign costs zero, changing it costs one. A 0-1 BFS with a deque finds the cheapest.","Use a queue where free moves go to the front and paid moves to the back."],
    why: ["Already at the end.","Right, then down: both arrows already point the way.","Every arrow points left; change two."]
  },
  "find-the-length-of-the-longest-common-prefix": {
    hints: ["Compare the leading digits of numbers from both lists.","Put every number of one list in a trie of digits, then walk it with each number of the other.","Store every leading part of the first list's numbers, then look up the second's."],
    why: ["12 and 123 share \"12\".","5 and 67 share nothing.","1000 and 1001 share \"100\"."]
  },
  "sum-of-prefix-scores-of-strings": {
    hints: ["A prefix's score is how many words start with it.","Each trie node counts how many words pass through it. A word's score sums its path.","Count words through every node of a letter tree, then add up each word's path."],
    why: ["\"a\" scores 2 and \"ab\" scores 1.","One word, one prefix.","Each prefix scores 2."]
  },
  "prefix-and-suffix-search": {
    hints: ["Look up by both ends at once.","Insert every suffix, a separator, then the word, so one trie lookup checks both ends.","Store every prefix#suffix key with the word's index; later words win."],
    why: ["ample at index 1 starts with a and ends with e.","Nothing starts with b.","The later copy, index 1, wins."]
  },
  "relative-ranks": {
    hints: ["Rank the athletes by score.","Sort indexes by score, highest first, then hand out medals and places in that order.","Sort indexes by score, then hand out labels in that order."],
    why: ["30 is gold, 20 silver, 10 bronze.","One athlete.","The highest score, 5, is gold."]
  },
  "sort-array-by-increasing-frequency": {
    hints: ["Count each value first.","Sort by count rising, and by value falling when counts tie.","Rarer first; on a tie, the larger value first."],
    why: ["1 once, 4 twice, 2 three times.","Both once: 3 before 1.","One value."]
  },
  "insertion-sort-list": {
    hints: ["Build a sorted list one node at a time.","Take each node off the list and walk a dummy-headed sorted list to find its spot.","A dummy head makes inserting at the front no special case."],
    why: ["1, 2, 3.","Empty stays empty.","The two -1s first."]
  },
  "design-hashset": {
    hints: ["Store keys where you can find them quickly.","An array of buckets. Hash a key to its bucket and keep a small list there.","Hash each key to a bucket and keep a small list there."],
    why: ["3 is in, 5 is not, then 3 is removed.","Nothing added.","Adding twice and removing once leaves nothing."]
  },
  "design-circular-deque": {
    hints: ["A ring buffer you can grow from both ends.","The circular queue with moves at both ends. Step the head back to add at the front.","Adding at the front steps the head back one, wrapping round."],
    why: ["The third insert finds it full; after deleting 1, the rear is 2.","A new deque is empty.","The second delete finds it empty."]
  },
  "snapshot-array": {
    hints: ["Copying the whole array on every snap is too much.","Each index keeps a list of snap id and value pairs. Binary search the latest at or before a snap.","Each slot keeps only its changes, tagged with the snap id."],
    why: ["Slot 0 was 4 at snap 0; slot 1 was never set.","Never set, so 0.","The last set before snap 0 was 6."]
  },
  "design-underground-system": {
    hints: ["Keep each rider's open trip until they check out.","One map for open trips by rider, one for total time and count per station pair.","Store the total time and trip count per route."],
    why: ["One trip of 7.","Trips of 4 and 5: average 4.5.","X to Y and Y to X are separate routes."]
  },
  "design-twitter": {
    hints: ["The feed only needs the newest 10 posts.","Stamp each tweet with a global time. A feed merges the newest from each followed user with a heap.","Walk posts from newest and keep those by the user or anyone they follow."],
    why: ["User 2 sees both posts, then only their own.","No posts.","Newest first."]
  },
  "lfu-cache": {
    hints: ["Track how often and how recently each key was used.","Group keys by use count, each group in last-use order. Track the lowest count present.","Drop the key with the fewest uses; on a tie, the one used longest ago."],
    why: ["Key 1 was used twice, so key 2 is dropped.","Key 5 was never put.","Capacity 1: key 1 is dropped for key 2."]
  },
  "all-oone-data-structure": {
    hints: ["Keep a count per key.","A linked list of count buckets in order. A key moves to the neighbour bucket on each change.","A key that drops to 0 is forgotten."],
    why: ["b was added twice, a once.","Nothing is counted.","z went to 0 and was forgotten."]
  },
  "maximum-frequency-stack": {
    hints: ["Pop the most frequent value, the newest on a tie.","Keep one stack per frequency. Pop from the stack of the highest frequency.","Keep one stack per frequency level."],
    why: ["1 is pushed twice, so it pops first.","One value.","All tie, so the newest goes first."]
  },
  "longest-palindrome-build": {
    hints: ["A palindrome is pairs around at most one middle letter.","Use every letter in pairs. One odd letter left over can sit in the middle.","Use every pair; one leftover letter may go in the middle."],
    why: ["\"aba\".","One letter in the middle.","Four c's and two d's all pair up."]
  },
  "defanging-an-ip-address": {
    hints: ["Only the dots change.","Build a new string and write each dot as bracketed dot.","Replace each \".\" with \"[.]\"."],
    why: ["Three dots replaced.","Three dots replaced.","Three dots replaced."]
  },
  "string-matching-in-an-array": {
    hints: ["Check each word against all the others.","Check every word against every other word for containment. The list is small.","Keep a word if another word contains it."],
    why: ["cat and at are inside concat.","Neither contains the other.","ab and abc are inside abcd."]
  },
  "string-compression": {
    hints: ["Each run becomes the letter and its length.","Read a run, write its letter and then its length's digits with a write pointer.","Write the length's digits one per slot, and skip the length for a run of 1."],
    why: ["a twice, then b once.","One letter.","Twelve z's: z, 1, 2."]
  },
  "longest-happy-prefix": {
    hints: ["A happy prefix is also a suffix.","This is the KMP failure table. Its last entry is the answer.","Build the KMP border table; its last entry is the answer's length."],
    why: ["\"ab\" starts and ends abab.","No border.","\"aaa\" starts and ends aaaa."]
  },
  "shortest-palindrome": {
    hints: ["Find the longest palindrome at the start of s.","Find the longest palindrome prefix with KMP on the word, a separator and its reverse.","Then put the reverse of the rest in front."],
    why: ["Add b in front.","Empty stays empty.","\"aa\" is a palindrome; add b in front."]
  },
  "longest-duplicate-substring": {
    hints: ["If a length has a repeat, so does every shorter length.","Binary search the length. Check for a repeat of that length with a rolling hash.","Binary search the length and check for any repeated piece."],
    why: ["abc appears twice.","No letter repeats.","\"aaa\" appears twice, overlapping."]
  },
  "text-justification": {
    hints: ["Fit as many words as you can on each line.","Pack words greedily per line, then spread the spare spaces from the left. The last line is plain.","Spread spaces evenly, extra ones to the left gaps; the last line is left aligned."],
    why: ["\"the big\" fills 7 exactly.","One word, padded.","Three words fit, then d alone."]
  },
  "pascals-triangle-ii": {
    hints: ["Build rows in one list.","One row is enough. Update it from the right so you never read a value you just changed.","Update from the right so you never read a value you just changed."],
    why: ["The top row.","1, 3, 3, 1.","1, 5, 10, 10, 5, 1."]
  },
  "minimum-insertion-steps-to-make-a-string-palindrome": {
    hints: ["Letters that already pair up need no help.","Length minus the longest palindromic subsequence: those letters already pair up.","Inserts = length - the longest palindromic subsequence."],
    why: ["Add one letter.","Already a palindrome.","Add three letters."]
  },
  "wildcard-matching": {
    hints: ["\"?\" is any one letter; \"*\" is any run, even empty.","Grid over both strings. A star matches nothing or eats one more letter.","A star either matches nothing more or eats one more letter."],
    why: ["? matches b.","* matches everything.","There is no c."]
  },
  "dungeon-game": {
    hints: ["Working forward, you do not know what lies ahead.","Fill from the princess backwards: the health you need here given the cheaper next step.","Fill from the goal backwards: need here = max(1, cheaper next need - room)."],
    why: ["An empty room still needs 1 health.","Lose 5 and keep 1.","2, -1, 4 never drops low."]
  },
  "ones-and-zeroes": {
    hints: ["Each string costs some zeros and some ones.","A knapsack with two budgets. Loop both downward for each string.","A pick-or-skip table over both budgets, filled from big to small."],
    why: ["\"0\" and \"1\".","\"00\" needs two zeros.","Two of the \"1\"s."]
  },
  "largest-divisible-subset": {
    hints: ["Sorted, each number only needs to divide the next.","Sort. It is LIS where the rule is divides instead of is smaller. Keep parents to rebuild.","Track the longest chain ending at each number and link back to rebuild it."],
    why: ["2 is a multiple of 1.","One number.","Each one doubles."]
  },
  "profitable-schemes": {
    hints: ["Each job uses members and earns profit.","A knapsack over people used and profit made, with profit capped at the minimum needed.","Count schemes by members used and profit, capping profit at the goal."],
    why: ["Job 0 alone, or both jobs.","Only the empty scheme fits.","Both jobs are needed."]
  },
  "minimum-score-triangulation-of-polygon": {
    hints: ["The edge between the first and last corner is in one triangle.","For the edge from i to j, try every middle vertex k and add both sides.","Try each middle corner for that triangle and solve both sides."],
    why: ["One triangle.","Two triangles of 8.","Cut along 1 to 2: 8 + 6."]
  },
  "beautiful-arrangement": {
    hints: ["Fill positions one by one with unused numbers.","The used numbers form a bitmask. Count ways to fill the next position from each mask.","A number fits position i if one divides the other."],
    why: ["One way.","Both orders work.","Three ways."]
  },
  "minimum-number-of-work-sessions-to-finish-the-tasks": {
    hints: ["Group tasks into sessions of at most sessionTime.","For each mask of done tasks, store the fewest sessions and the time used in the last one.","For every set of tasks, try one session's worth and solve the rest."],
    why: ["1 + 2, then 3.","One task, one session.","Two tasks per session."]
  },
  "palindrome-partitioning-ii": {
    hints: ["Know which stretches are palindromes first.","Mark which ranges are palindromes, then fewest cuts for a prefix uses the best earlier cut.","Cuts up to j = 1 + cuts before i, for any palindrome from i to j."],
    why: ["a | b.","Already a palindrome.","aa | b | cc."]
  },
  "minimum-cost-to-cut-a-stick": {
    hints: ["The order of cuts changes the cost.","Add both ends to the cut list and sort. Between two cuts, try each cut inside as the first one.","For a piece, try each cut inside it as the first one."],
    why: ["One cut on a stick of 4.","5 for the first cut, 4 for the second.","Cut at 3 (6), then at 1 (3)."]
  },
  "strange-printer": {
    hints: ["Matching letters can share one print run.","Print the first letter of a range, and let any later copy of it join that same pass.","If a later letter matches the first one, print them in the same pass."],
    why: ["Two different letters.","One run of a.","Print aaa, then b over the middle."]
  },
  "shortest-path-visiting-all-nodes": {
    hints: ["Where you are and what you have visited both matter.","BFS over node plus visited mask, starting from every node at once.","Search over (node, visited set) states from every start at once."],
    why: ["One node, no steps.","One step.","1 to 0 to 2."]
  },
  "binary-number-with-alternating-bits": {
    hints: ["Alternating bits look like 1010.","n XOR (n shifted right) is all ones exactly when bits alternate.","n XOR (n >> 1) is all 1s exactly when the bits alternate."],
    why: ["5 is 101.","6 is 110.","10 is 1010."]
  },
  "minimum-flips-to-make-a-or-b-equal-to-c": {
    hints: ["Look at one bit position at a time.","Check bit by bit. A wanted zero costs one flip per set bit, a wanted one costs one if both are zero.","A wanted 1 costs 1 if both are 0; a wanted 0 costs one flip per 1."],
    why: ["1 OR 2 is already 3.","Flip one bit of a or b.","Turn on one bit."]
  },
  "find-the-original-array-of-prefix-xor": {
    hints: ["XOR undoes itself.","Each original value is the XOR of two neighbouring prefixes.","value i = pref[i] XOR pref[i - 1]."],
    why: ["One value.","1 XOR 3 = 2.","0, 0, then 0 XOR 7."]
  },
  "sum-of-two-integers": {
    hints: ["Adding in binary is XOR plus a carry.","XOR adds without carries, AND shifted left is the carry. Repeat until no carry.","The carry is AND shifted left; repeat until there is none."],
    why: ["2 + 3 = 5.","-4 + 1 = -3.","0 + 0."]
  },
  "single-number-iii": {
    hints: ["XOR of everything gives a XOR b.","XOR all to get a XOR b. Any set bit in it splits the numbers into two groups with one loner each.","Any 1 bit of that splits the numbers into two groups, one single in each."],
    why: ["2 and 3 appear once.","Both appear once.","-1 and 0 appear once."]
  },
  "bitwise-and-of-numbers-range": {
    hints: ["Any bit that changes in the range becomes 0.","Only the shared high bits survive. Shift both ends right until they match.","Shift both ends right until they match, then shift back."],
    why: ["4 to 7 share the bit 100.","Just 0.","6 to 9 cross 8, so nothing is shared."]
  },
  "gray-code": {
    hints: ["Each next number may change one bit only.","The ith code is i XOR (i shifted right by one).","The i-th code is i XOR (i >> 1)."],
    why: ["0, 1.","0, 1, 3, 2.","Eight codes, one bit apart."]
  },
  "subtract-the-product-and-sum-of-digits-of-an-integer": {
    hints: ["Split the number into its digits.","Peel digits off with mod ten, multiplying and adding as you go.","Multiply them, add them, subtract."],
    why: ["6 - 6.","7 - 7.","0 - 9."]
  },
  "ugly-number": {
    hints: ["Ugly means only 2, 3 and 5 as prime factors.","Divide out every two, three and five. An ugly number ends at one.","Divide out 2s, 3s and 5s; ugly if 1 is left."],
    why: ["2 x 3 x 5.","7 is left over.","1 counts as ugly."]
  },
  "check-if-it-is-a-straight-line": {
    hints: ["All points must share one direction.","Compare slopes by cross multiplying with the first two points, so no division is needed.","Cross-multiply with the first two points, so upright lines work."],
    why: ["The line y = x.","The third point bends off.","Two points always make a line."]
  },
  "rectangle-overlap": {
    hints: ["Two boxes overlap when both their x and y ranges overlap.","They overlap when both the x ranges and the y ranges overlap with positive width.","The overlap must be wider and taller than 0."],
    why: ["They share a 1 by 1 square.","They only touch along an edge.","One box is inside the other."]
  },
  "factorial-trailing-zeroes": {
    hints: ["Each zero comes from a 5 times a 2.","Each zero needs a five. Count the fives in n, n/5, n/25 and so on.","Count the 5s: n/5 + n/25 + n/125 + ..."],
    why: ["No 5 below 4.","5 and 10.","25 gives two 5s: 5 + 1 = 6."]
  },
  "ugly-number-ii": {
    hints: ["Every ugly number is a smaller one times 2, 3 or 5.","Three pointers into the list so far, one each for times two, three and five. Take the smallest.","Keep a pointer for each factor and take the smallest next value."],
    why: ["The first is 1.","1, 2, 3, 4, 5, 6, 8.","... 9, 10, 12, 15."]
  },
  "find-the-winner-of-the-circular-game": {
    hints: ["Removing a friend shifts everyone's position.","The Josephus rule: the winner for n comes from the winner for n-1 shifted by k.","The winner for i friends is the winner for i - 1, shifted by k."],
    why: ["One friend.","With k = 1, friends leave in order; 3 is last.","2 leaves, then 4, then 3."]
  },
  "rectangle-area": {
    hints: ["Adding both areas counts the overlap twice.","Add both areas and subtract the overlap, which is the overlap width times overlap height.","Subtract the overlap: width x height, never below 0."],
    why: ["4 + 4 - 1.","No overlap.","The same rectangle twice."]
  },
  "valid-square": {
    hints: ["A square has four equal sides and two equal diagonals.","Of the six pairwise distances, four sides must match and two longer diagonals must match.","Sort the six distances; check sides above 0 and diagonals = 2 x side."],
    why: ["A unit square.","A 2 by 1 rectangle.","All points are the same."]
  },
  "max-points-on-a-line": {
    hints: ["Points on one line through an anchor share a direction.","For each point, group the others by reduced slope. The biggest group plus one is a line.","Reduce each direction by its gcd so equal slopes match exactly."],
    why: ["One point.","The first three lie on y = x.","No three in a line."]
  },
  "number-of-digit-one": {
    hints: ["Count ones place by place.","Count ones place by place, splitting the number into the part above, the digit and the part below.","Split n around each digit: the part above, the digit, the part below."],
    why: ["0 has no ones.","1, 10, 11 (two), 12.","21 ones up to 100."]
  },
  "erect-the-fence": {
    hints: ["The fence is the outline around all trees.","Build the convex hull with a monotone chain, keeping points that lie on an edge.","Build lower and upper halves, keeping points on straight parts too."],
    why: ["The middle tree is inside.","One tree.","All trees are on one line."]
  },
  "range-sum-query-mutable": {
    hints: ["Updates and sums both need to be fast.","A Fenwick tree or segment tree gives both updates and range sums in log time.","A Fenwick tree does both in log time."],
    why: ["2 + 4 + 6 = 12, then 2 + 1 + 6 = 9.","One number.","3 + 0 + 0 - 2 = 1, and 0 in the middle."]
  },
  "count-of-smaller-numbers-after-self": {
    hints: ["Walk from the right and keep what you have seen.","Walk from the right, adding values to a Fenwick tree over ranks. Ask how many are smaller.","Count smaller values seen so far with a Fenwick tree over ranks."],
    why: ["1 and 2 are smaller than 3.","Nothing to the right.","Equal is not smaller."]
  },
  "reverse-pairs": {
    hints: ["Checking every pair is slow.","During merge sort, count pairs across the two sorted halves with a pointer before merging.","During merge sort, count pairs across the two sorted halves."],
    why: ["5 > 2 x 2.","No value is more than twice another.","6 > 2 x 1 and 6 > 2 x 2."]
  },
  "create-sorted-array-through-instructions": {
    hints: ["Each insert asks how many smaller and how many larger are already in.","A Fenwick tree over values counts how many smaller and larger are already in.","A Fenwick tree over values answers both counts."],
    why: ["Each insert is the new largest.","2 sits between 1 and 3: cost 1.","Equal values cost nothing."]
  },
  "the-skyline-problem": {
    hints: ["The outline only changes at building edges.","Sweep the x edges. Keep live heights in a heap and record a point when the top height changes.","At each edge, the height is the tallest building covering it."],
    why: ["One building.","Two equal heights join.","The short building is hidden."]
  },
  "range-module": {
    hints: ["Keep a sorted list of covered ranges.","Keep sorted, non-touching ranges. Add and remove split and merge the ranges that touch.","Adding merges touching ranges; removing may split one."],
    why: ["Removing [7,8) leaves a gap.","Nothing covered.","[1,3) and [3,6) join."]
  },
  "print-in-order": {
    hints: ["second must wait for first, and third for second.","Two signals: the second job waits for the first to finish, the third waits for the second.","Use promises as signals: each job resolves the next one's gate."],
    why: ["Order is restored whatever starts first.","Already in order.","second waits for first to arrive at 8 ms."]
  },
  "print-foobar-alternately": {
    hints: ["Each side must wait for the other's turn.","Two semaphores passed back and forth so each thread prints only on its turn.","Pass the turn back and forth with promises."],
    why: ["foo then bar.","Three turns each, foo first.","bar waits for foo."]
  },
  "print-zero-even-odd": {
    hints: ["Zero always goes between the numbers.","The zero thread decides who goes next: it releases the odd or even thread by the count.","zero opens odd or even next; they open zero again."],
    why: ["0 1 0 2.","0 1 0 2 ... 0 5.","0 1."]
  },
  "building-h2o": {
    hints: ["Atoms leave only in groups of two H and one O.","Let two hydrogens and one oxygen through, then reset with a barrier before the next molecule.","Queue the atoms and release a group whenever two H and one O wait."],
    why: ["One water molecule.","The two O wait for four H.","Two molecules form as atoms arrive."]
  },
  "fizz-buzz-multithreaded": {
    hints: ["Four tasks share one counter.","All four threads share one counter. Each waits until the number is its kind, prints, and moves on.","Each waits until the current number is its kind, prints, then wakes the others."],
    why: ["1, 2, fizz, 4, buzz.","15 is fizzbuzz.","Just 1."]
  },
  "the-dining-philosophers": {
    hints: ["If everyone grabs one fork, nobody eats.","Avoid a deadlock cycle: let at most four reach for forks, or make one pick up the other side first.","Let meals take turns so no two reach for the same fork at once."],
    why: ["Everyone eats once with no clash.","Everyone eats twice with no clash.","Everyone eats once with no clash."]
  },
  "traffic-light-controlled-intersection": {
    hints: ["Cars from the two roads must never cross together.","One lock guards the light. Switch it only when a car from the red road arrives.","Cars take turns; switch the light only when the next car's road is red."],
    why: ["One car per road.","The light turns once for road 2, then back for road 1.","Every car crosses safely."]
  },
  "design-bounded-blocking-queue": {
    hints: ["Producers wait when full, consumers wait when empty.","One lock with two conditions: producers wait while full, consumers wait while empty.","Keep lines of waiting tasks and wake one when space or an item appears."],
    why: ["Each item passes through a queue of one.","Three are taken, one is left.","One item, one take."]
  },
  "web-crawler-multithreaded": {
    hints: ["Fetching pages one by one is slow.","A thread pool fetches pages. A shared visited set under a lock stops repeat visits.","Fetch a whole level of pages at once, and track seen pages."],
    why: ["Both links are on the same host.","The other host is not followed.","The loop back to page 1 is not fetched twice."]
  }
};
function hintsFor(id) { return HINTS[id] || null; }
if (typeof module !== 'undefined' && module.exports) module.exports = { HINTS, hintsFor };
// @@END-HINTS@@
