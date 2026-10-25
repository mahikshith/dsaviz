// About-this-lesson content for the DSA concept lessons (part A). Our own writing; facts checked against the sources listed per lesson.
const CONCEPT_ABOUT_A = {
  bigo: {
    what: 'Big-O is a way to describe how much work a program does as its input gets bigger. We count steps, not seconds. A step is one small action, such as reading one item.',
    analogy: 'Think of finding a name in a phone book. Checking every page takes longer as the book grows. Opening the middle and halving the search barely slows down.',
    uses: ['Choosing between two ways to solve the same problem before you write any code', 'Explaining why a program is fast with 100 items but crawls with a million', 'Answering "how fast is it?" in coding interviews'],
    before: ['Loops in Python', 'What a list is'],
    words: [
      ['n', 'The size of the input, such as how many items are in a list.'],
      ['step', 'One small action the computer takes, such as one comparison.'],
      ['Big-O', 'A short label that limits how fast the number of steps grows when n grows. It can describe the best, average or worst case.'],
      ['binary search', 'Open the middle of a sorted list, throw away the half that cannot hold the item, and repeat.'],
      ['log n', 'Short for logarithm. It counts how many times you can halve n before one item is left.'],
      ['space', 'How much memory the program uses.'],
      ['constant time', 'The work stays the same, however big n gets. Written O(1).'],
      ['linear time', 'The work grows in step with n. Double the list and you double the work. Written O(n).'],
      ['quadratic time', 'The work grows with n times n. Double the list and the work grows four times. Written O(n²).'],
      ['worst case', 'The most steps the algorithm could ever need for an input of that size.'],
      ['average case', 'The usual number of steps, over many different inputs of that size.']
    ],
    math: {
      lines: ['O(1)', 'O(\\log n)', 'O(n)', 'O(n \\log n)', 'O(n^2)', 'O(2^n)'],
      symbols: [
        ['O( )', 'Big-O: the label for how fast the step count grows. It ignores small details.'],
        ['n', 'how many items the input has'],
        ['\\log n', 'how many times you can halve n before one item is left'],
        ['n^2', 'n times n'],
        ['2^n', 'two multiplied by itself n times: it doubles with every new item']
      ],
      example: [
        'Take a list of n = 16 items and count the steps for each label.',
        'O(1) is 1 step. O(log n) is 4 steps, because 16 halves to 8, 4, 2, then 1.',
        'O(n) is 16 steps. O(n log n) is 16 × 4 = 64 steps. O(n²) is 16 × 16 = 256 steps.',
        'O(2ⁿ) is 65536 steps. Each new item doubles the work.',
        'Now double the list to n = 32. O(n) becomes 32 steps. O(n²) becomes 1024 steps, which is four times more.'
      ]
    },
    steps: [
      'Pick what to count. Usually it is one basic action, such as comparing two items.',
      'Imagine the input has n items. Work out how many times that action happens.',
      'Keep only the part that grows fastest. For 3n² + 5n + 2 steps, keep n².',
      'Ignore any number that multiplies it. 3n² and n² grow the same way, so both are O(n²).',
      'Use the label to compare. O(n) beats O(n²) once the list is big enough.'
    ],
    use: ['You want to compare two solutions without running them.', 'You need to know if a method will still be fast on a very large input.'],
    avoid: ['Treating Big-O as exact time. Two O(n) programs can differ a lot in real seconds.', 'Judging tiny inputs, where a "slower" method may win.'],
    mistakes: [
      'Mixing up worst case and average case. Say which one you mean.',
      'Forgetting hidden loops. A built-in call such as sum(list) also walks the whole list.',
      'Counting space as zero. The extra memory a program uses also grows with n, and Big-O describes that too.'
    ],
    cheat: ['O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)', 'One loop over n items: O(n)', 'Loop inside a loop: O(n²)', 'Halving each time: O(log n)', 'Keep the biggest term, drop the number in front'],
    next: ['arrays', 'recursion', 'merge'],
    sources: ['Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms (CLRS), 4th ed., ch. 3 Characterizing Running Times', 'Sedgewick and Wayne, Algorithms, 4th ed., section 1.4 Analysis of Algorithms', 'Python wiki, TimeComplexity page']
  },

  arrays: {
    what: 'An array is a row of equal-sized boxes that sit side by side in memory. Each box has a number, called its index, that starts at 0. A Python list is built on an array.',
    analogy: 'Picture a row of lockers, all the same size, numbered from 0. You can walk straight to locker 7 without opening the others.',
    uses: ['Storing scores, prices or pixels that you read by position', 'Holding a grid, such as a game board or an image', 'Keeping a list that mostly grows at the end, like a shopping list'],
    before: ['bigo'],
    words: [
      ['memory', 'The place where the computer keeps data while a program runs.'],
      ['index', 'The number of a box in the array. The first box is index 0.'],
      ['address', 'The exact place of a box in memory, like a house number.'],
      ['byte', 'A small unit of memory. In this lesson each box uses 4 bytes.'],
      ['shift', 'Moving items one box over to make room or close a gap.'],
      ['append', 'Adding a new item at the end of the list.']
    ],
    math: {
      lines: ['\\text{address} = \\text{start} + i \\times s', '\\text{grid cell} = r \\times \\text{width} + c', 'O(1) \\text{ read}', 'O(n) \\text{ insert in the middle}'],
      symbols: [
        ['start', 'the address of box 0'],
        ['i', 'the index you want'],
        ['s', 'the size of one box in bytes (a byte is a small unit of memory)'],
        ['r, c', 'the row number and the column number of a grid cell, both counted from 0'],
        ['width', 'how many cells are in one row of the grid'],
        ['O(1)', 'constant time: the work stays the same, however long the array is'],
        ['O(n)', 'linear time: the work grows in step with n, the number of items']
      ],
      example: [
        'The array starts at address 1000 and each box is 4 bytes. Read index 3.',
        'The address is 1000 + 3 × 4 = 1012. That is one sum, so reading is O(1).',
        'The array holds 5 items. Insert a new item at index 1.',
        'The 4 items from index 1 on must each move one box right. That is 4 moves.',
        'Insert at index 0 and all 5 items move. In general up to n items move, so it is O(n).'
      ]
    },
    steps: [
      'The computer keeps all boxes in one unbroken block, each the same size.',
      'To read box i, it adds i times the box size to the start address. No searching.',
      'To insert in the middle, it moves the later items one box right, starting from the end.',
      'The new item then drops into the gap. Deleting works the other way and closes the hole.',
      'When the block is full, a bigger block is made and everything is copied over. Many languages double the size.'
    ],
    use: ['You read items by index often.', 'You mostly add and remove at the end.'],
    avoid: ['Inserting or deleting near the front of a huge list again and again.', 'You need to keep every item in a fixed place while others come and go.'],
    mistakes: [
      'Starting to count at 1. The first index is 0, and the last index is n − 1.',
      'Reading an index past the end. Python raises an error called IndexError.',
      'Thinking an insert is cheap. Items after the spot all have to move.'
    ],
    cheat: ['a[i] is O(1)', 'a.append(x) is O(1) on average: most appends cost one step, and the rare copy is spread out', 'a.insert(0, x) is O(n)', 'a.pop() from the end is O(1), a.pop(0) is O(n)', 'grid cell in row r, column c sits at r × width + c'],
    next: ['strings', 'linked', 'stackqueue'],
    sources: ['Python wiki, TimeComplexity page (list operations)', 'Sedgewick and Wayne, Algorithms, 4th ed., section 1.3 Bags, Queues, and Stacks (resizing arrays)', 'CLRS, 4th ed., section 10.1 and ch. 16.4 (dynamic tables)']
  },

  strings: {
    what: 'A string is a row of characters, such as letters and digits. It works like an array of characters. In Python you cannot change a string in place. Every edit builds a new string.',
    analogy: 'A string is like a sentence printed in a book. To fix one letter you cannot erase it. You have to print a fresh page.',
    uses: ['Checking whether two words are anagrams', 'Reversing text or checking that it reads the same both ways', 'Building a long message from many small pieces'],
    before: ['arrays'],
    words: [
      ['character', 'One letter, digit or symbol in a string.'],
      ['immutable', 'Cannot be changed after it is made. Python strings are immutable.'],
      ['slice', 'A part of a string, such as s[1:4]. It copies those characters into a new string.'],
      ['byte', 'A small unit of memory. A letter in simple text takes one byte.'],
      ['ASCII', 'A table that gives each common character a number. The letter "r" is 114.'],
      ['Unicode', 'A bigger table that gives a number to characters in every language.']
    ],
    math: {
      lines: ['O(1) \\text{ read } s[i]', 'O(n) \\text{ one edit or slice}', '1 + 2 + \\dots + n = \\frac{n(n+1)}{2}'],
      symbols: [
        ['n', 'how many characters the string has'],
        ['O(1)', 'constant time: the work stays the same, however long the string is'],
        ['O(n)', 'linear time: the work grows in step with the string'],
        ['s[i]', 'the character at index i'],
        ['\\frac{n(n+1)}{2}', 'the total you get by adding 1, then 2, then 3, up to n']
      ],
      example: [
        'Build a 5-letter word by adding one letter at a time with +.',
        'Each add copies the whole word so far: 1, 2, 3, 4, then 5 letters copied.',
        'The total is 1 + 2 + 3 + 4 + 5 = 15 copies for 5 letters.',
        'For n letters that is about n × n ÷ 2 copies. The work grows with n times n.',
        'Collect the letters in a list and join once. Each letter is copied one time, so 5 copies in all.'
      ]
    },
    steps: [
      'Read a letter by index. This is quick, like reading an array.',
      'Each character is stored as a number, so comparing letters means comparing numbers.',
      'To compare two strings, check letter by letter until two letters differ.',
      'To "change" a string, build a new one. Every character is copied.',
      'To build a long string, put the pieces in a list and call "".join(pieces) once.'
    ],
    use: ['You scan text one character at a time.', 'You collect many pieces and join them at the end.'],
    avoid: ['Adding to a string inside a long loop with s = s + piece.', 'Slicing again and again when two position variables, such as i and j, would do.'],
    mistakes: [
      'Writing s[0] = "R". Python raises an error because strings cannot change.',
      'Forgetting that a slice makes a copy. A slice of 1000 characters costs 1000 steps.',
      'Assuming one character is always one byte. Many Unicode characters take more.'
    ],
    cheat: ['s[i] is O(1)', 's[a:b] copies b − a letters', 's + t copies both', '"".join(parts) is O(total length)', 'ord("r") is 114 and chr(114) is "r": ord gives a letter\'s number, chr gives the letter back'],
    next: ['recursion', 'hashing'],
    sources: ['Python documentation, Built-in Types: Text Sequence Type (str)', 'Python documentation, Unicode HOWTO', 'Sedgewick and Wayne, Algorithms, 4th ed., section 5.1 String Sorts (strings and character codes)']
  },

  recursion: {
    what: 'Recursion means a function solves a problem by calling itself on a smaller copy of that problem. A rule called the base case tells it when to stop calling.',
    analogy: 'Picture a pile of plates. Each call puts a plate on top and waits for the plate above it to finish. The top plate finishes first.',
    uses: ['Walking through folders that hold other folders', 'Visiting every node of a tree', 'Trying every choice in puzzles such as mazes and Sudoku'],
    before: ['bigo', 'Writing a Python function'],
    words: [
      ['recursive call', 'A call where a function runs itself again, on a smaller input.'],
      ['base case', 'The smallest input, which has a direct answer. It stops the calls.'],
      ['call stack', 'A pile of waiting calls, drawn as plates. The newest call is on top.'],
      ['space', 'How much memory the program uses. Each waiting call uses some.'],
      ['return', 'Hand an answer back to the caller and finish.'],
      ['factorial', 'n! is n × (n − 1) × (n − 2) and so on, down to 1. For example 4! is 4 × 3 × 2 × 1 = 24.']
    ],
    math: {
      lines: ['n! = n \\times (n-1)!', '1! = 1', 'T(n) = n \\text{ calls}, \\; O(n)'],
      symbols: [
        ['n!', 'the factorial of n: n times every whole number below it, down to 1'],
        ['(n-1)!', 'the factorial of the next smaller number'],
        ['T(n)', 'how many calls the function makes for input n'],
        ['O(n)', 'linear: the work grows in step with n. Twice the n means twice the calls.']
      ],
      example: [
        'Compute fact(4). It calls fact(3), which calls fact(2), which calls fact(1).',
        'That is 4 calls, so 4 plates sit on the call stack at the deepest point.',
        'fact(1) returns 1. Then fact(2) returns 2 × 1 = 2.',
        'Then fact(3) returns 3 × 2 = 6. Then fact(4) returns 4 × 6 = 24.',
        'There were 3 multiplications. Time is O(n) and the stack space, the memory for waiting calls, is also O(n).'
      ]
    },
    steps: [
      'Write the base case first: the smallest input and its direct answer.',
      'Write the recursive case: solve the problem using the same function on a smaller input.',
      'Each call pushes a new plate on the call stack and waits.',
      'The base case answers without calling again. Its plate comes off.',
      'Each waiting call wakes up, uses the answer, and returns its own answer.'
    ],
    use: ['The problem holds smaller copies of itself, such as trees and nested lists.', 'You need to try choices and undo them.'],
    avoid: ['The input is huge and the depth could pass about 1000 calls in Python.', 'A plain loop is equally clear and uses less memory.'],
    mistakes: [
      'Forgetting the base case. The calls never stop and the program crashes with a RecursionError.',
      'Calling with an input that does not get smaller.',
      'Solving the same smaller problem many times. Fibonacci numbers show it: each is the sum of the two before (1, 1, 2, 3, 5). Store answers to avoid it.'
    ],
    cheat: ['def fact(n):', '    if n <= 1: return 1', '    return n * fact(n - 1)', 'base case + smaller call', 'depth of recursion = stack space'],
    next: ['trees', 'merge', 'quick'],
    sources: ['CLRS, 4th ed., ch. 2 and ch. 4 (recursion and divide and conquer)', 'Sedgewick and Wayne, Algorithms, 4th ed., section 1.1 (recursion)', 'Python documentation, sys.getrecursionlimit']
  },

  bubble: {
    what: 'Bubble sort puts a list in order by looking at two neighbours at a time. If they are in the wrong order, it swaps them. After enough passes, the whole list is sorted.',
    analogy: 'Picture children in a row, sorting by height. Each child checks the one beside them and swaps if the taller one is on the left.',
    uses: ['Teaching how sorting works, because it is easy to follow', 'Sorting a very short list where speed does not matter', 'Telling if a list is already sorted: one pass with no swaps proves it'],
    before: ['bigo', 'arrays'],
    words: [
      ['pass', 'One walk from the start of the unsorted part to its end.'],
      ['swap', 'Exchange the places of two items.'],
      ['comparison', 'Checking which of two items is bigger.'],
      ['stable', 'Equal items keep the order they had before sorting. If two cards both show 5, the one that was first stays first.'],
      ['in place', 'The sort uses almost no extra memory beyond the list itself.']
    ],
    math: {
      lines: ['(n-1) + (n-2) + \\dots + 1 = \\frac{n(n-1)}{2}', 'O(n^2) \\text{ worst}, \\; O(n) \\text{ best}'],
      symbols: [
        ['n', 'how many items are in the list'],
        ['\\frac{n(n-1)}{2}', 'the number of comparisons if every pass runs'],
        ['O(n^2)', 'quadratic: the work grows with n times n. Double the list and the work grows four times.'],
        ['O(n)', 'linear: the work grows in step with the list, when one pass finds no swap']
      ],
      example: [
        'Sort [6, 3, 8, 2, 7, 4]. That is 6 items.',
        'Pass 1 makes 5 comparisons and moves 8 to the end. Pass 2 makes 4. Pass 3 makes 3.',
        'Pass 4 makes 2 comparisons and finds no swap, so it stops early.',
        'The total is 5 + 4 + 3 + 2 = 14 comparisons and 8 swaps.',
        'Without the early stop, all passes would give 15 comparisons for n = 6.'
      ]
    },
    steps: [
      'Start at the left. Compare the first two items.',
      'If the left one is bigger, swap them. Then move one place right.',
      'Keep going to the end. The biggest item has now moved to the last place.',
      'Repeat on the list without that last item.',
      'Stop when a full pass makes no swaps. The list is sorted.'
    ],
    use: ['You are learning how sorting works.', 'The list is tiny or almost sorted, and you stop early.'],
    avoid: ['Large lists. The work grows with n times n.', 'Anywhere speed matters. Use the built-in sorted() instead.'],
    mistakes: [
      'Forgetting the early stop. A sorted list then still costs about n times n steps.',
      'Looping one step too far and reading past the end of the list.',
      'Swapping when the items are equal. That breaks stability.'
    ],
    cheat: ['for p in range(n - 1):', '  swapped = False', '  for i in range(n - 1 - p):', '    if a[i] > a[i + 1]: swap them, swapped = True', '  if not swapped: break', 'O(n²) time, O(1) space', 'stable, stops early if no swap'],
    next: ['selection', 'insertion', 'merge'],
    sources: ['Sedgewick and Wayne, Algorithms, 4th ed., ch. 2 Sorting (exercises on elementary sorts)', 'Knuth, TAOCP vol. 3, section 5.2.2 Sorting by Exchanging', 'CLRS, 4th ed., problem 2-2 Correctness of bubblesort']
  },

  selection: {
    what: 'Selection sort finds the smallest item in the unsorted part and swaps it to the front. Then it does the same for the rest, one item at a time.',
    analogy: 'Imagine picking the shortest person from a crowd and asking them to stand first. Then you pick the shortest of those left, and so on.',
    uses: ['Teaching sorting, because each step is easy to say out loud', 'Cases where writing to memory is costly, since it makes few swaps', 'Small lists where simple code matters more than speed'],
    before: ['bigo', 'arrays'],
    words: [
      ['sorted part', 'The front of the list, where items are already in their final places.'],
      ['index', 'The position of an item in the list. The first position is index 0.'],
      ['minimum', 'The smallest item in a group.'],
      ['swap', 'Exchange the places of two items.'],
      ['comparison', 'Checking which of two items is smaller.'],
      ['in place', 'The sort uses almost no extra memory beyond the list itself.']
    ],
    math: {
      lines: ['(n-1) + (n-2) + \\dots + 1 = \\frac{n(n-1)}{2}', 'O(n^2) \\text{ time}, \\; \\le n-1 \\text{ swaps}'],
      symbols: [
        ['n', 'how many items are in the list'],
        ['\\frac{n(n-1)}{2}', 'how many comparisons the scans make in total'],
        ['O(n^2)', 'quadratic: the work grows with n times n. Double the list and the work grows four times.'],
        ['\\le', 'less than or equal to']
      ],
      example: [
        'Sort [6, 3, 8, 2, 7, 4]. That is 6 items.',
        'Pass 1 scans 5 pairs to find the smallest, 2. Pass 2 scans 4. Pass 3 scans 3.',
        'Pass 4 scans 2, and pass 5 scans 1.',
        'The total is 5 + 4 + 3 + 2 + 1 = 15 comparisons. This is always the same, even for a sorted list.',
        'At most 5 swaps can happen, one per pass. Here only 2 happen: in passes 1 and 3. Bubble sort used 8.'
      ]
    },
    steps: [
      'Look at every item in the unsorted part and remember the smallest.',
      'Swap the smallest with the first item of the unsorted part.',
      'That first place is now final. Move the start of the unsorted part one place right.',
      'Repeat until one item is left.',
      'The last item is already in the right place, so the list is sorted.'
    ],
    use: ['Swaps are costly and comparisons are cheap.', 'The list is small and you want the simplest code.'],
    avoid: ['Large lists, because the scans always cost about n times n.', 'You need equal items to keep their order. The swaps can break it.'],
    mistakes: [
      'Do not swap while you are still looking. Find the smallest first, then swap once.',
      'Expecting a speed-up on a sorted list. The scans still run in full.',
      'Assuming it is stable. A long-distance swap can reorder equal items.'
    ],
    cheat: ['for i in range(n - 1):', '  m = index of smallest in a[i:]', '  swap a[i], a[m]', 'always ~n²/2 comparisons', 'at most n − 1 swaps, not stable'],
    next: ['insertion', 'heapsort', 'bubble'],
    sources: ['Sedgewick and Wayne, Algorithms, 4th ed., section 2.1 Elementary Sorts (selection sort)', 'Knuth, TAOCP vol. 3, section 5.2.3 Sorting by Selection', 'CLRS, 4th ed., exercise 2.2-2 (selection sort)']
  },

  insertion: {
    what: 'Insertion sort builds a sorted section at the left. It takes the next item and slides it left past any bigger items until it fits.',
    analogy: 'It is how many people sort playing cards in their hand. You pick up a card and slide it into the right spot among the cards you hold.',
    uses: ['Sorting short lists quickly', 'Finishing a list that is almost sorted', 'Serving as the small-piece step inside larger sorts, such as Python\'s sorted()'],
    before: ['bigo', 'arrays'],
    words: [
      ['sorted part', 'The left side of the list, which is already in order.'],
      ['key', 'The item you picked up and are about to place.'],
      ['slide', 'Move a bigger item one place right to open a gap.'],
      ['stable', 'Equal items keep the order they had before sorting. If two cards both show 5, the one that was first stays first.'],
      ['in place', 'The sort uses almost no extra memory beyond the list itself.']
    ],
    math: {
      lines: ['O(n) \\text{ best}, \\; O(n^2) \\text{ worst}', '1 + 2 + \\dots + (n-1) = \\frac{n(n-1)}{2}'],
      symbols: [
        ['n', 'how many items are in the list'],
        ['O(n)', 'linear: the work grows in step with the list. This happens when the list is already sorted.'],
        ['O(n^2)', 'quadratic: the work grows with n times n. This happens when the list is in reverse.'],
        ['\\frac{n(n-1)}{2}', 'the most slides possible, for a reversed list']
      ],
      example: [
        'Sort [6, 3, 8, 2, 7, 4]. That is 6 items.',
        'Take 3: slide 6, 1 slide. Take 8: no slide. Take 2: slide 3, 6, 8, 3 slides.',
        'Take 7: slide 8, 1 slide. Take 4: slide 6, 7, 8, 3 slides.',
        'The total is 1 + 0 + 3 + 1 + 3 = 8 slides, with 11 comparisons.',
        'A sorted list of 6 needs 0 slides. A reversed list needs 15.'
      ]
    },
    steps: [
      'Treat the first item as a sorted part of size one.',
      'Pick up the next item. Call it the key.',
      'Slide every bigger item in the sorted part one place right.',
      'Drop the key into the gap.',
      'Repeat until every item has been placed.'
    ],
    use: ['The list is short.', 'The list is nearly sorted, or items arrive one by one.'],
    avoid: ['Long lists in a random order, where the work grows with n times n.', 'Long lists stored as an array, where each slide moves many items.'],
    mistakes: [
      'Overwriting the key while sliding. Save it in a variable first.',
      'Sliding items that are equal to the key. That breaks stability.',
      'Going below index 0 while looking left.'
    ],
    cheat: ['key = a[i]; j = i - 1', 'while j >= 0 and a[j] > key:', '    a[j + 1] = a[j]; j -= 1', 'a[j + 1] = key', 'best O(n), worst O(n²), stable'],
    next: ['merge', 'quick', 'selection'],
    sources: ['CLRS, 4th ed., section 2.1 Insertion Sort', 'Sedgewick and Wayne, Algorithms, 4th ed., section 2.1 Elementary Sorts', 'CPython source, Objects/listsort.txt (how list.sort uses binary insertion for short runs)']
  },

  merge: {
    what: 'Merge sort splits a list in half again and again until each piece has one item. A single item is already sorted. Then it merges the pieces back together in order.',
    analogy: 'Two friends each hold a sorted stack of cards. You take whichever top card is smaller, again and again. You end with one sorted stack.',
    uses: ['Sorting big lists with a steady, known speed', 'Sorting linked lists, where you cannot jump straight to the middle', 'Sorting data too big for memory, a piece at a time on disk'],
    before: ['bigo', 'recursion'],
    words: [
      ['divide', 'Split a problem into smaller pieces.'],
      ['merge', 'Combine two sorted lists into one sorted list.'],
      ['recursion', 'A function that calls itself on a smaller piece.'],
      ['stable', 'Equal items keep the order they had before sorting. If two cards both show 5, the one that was first stays first.'],
      ['extra space', 'Memory beyond the list itself. Merge sort needs a spare array.']
    ],
    math: {
      lines: ['\\text{levels} = \\log_2 n', '\\text{work per level} = n', 'O(n \\log n)', 'O(n) \\text{ extra space}'],
      symbols: [
        ['\\log_2 n', 'how many times you can halve n before one item is left. The small 2 means halving. For 8 it is 3.'],
        ['n', 'the cost of one level: merging touches each of the n items once'],
        ['O(n \\log n)', 'the work is about n times log n: n steps on each of the log n levels'],
        ['O(n)', 'linear: the spare list grows in step with the list']
      ],
      example: [
        'Sort 8 items: 5 2 7 1 6 3 8 4. Halving gives 8, 4, 2, 1, so there are 3 levels of splitting.',
        'We write that as log₂ 8 = 3. It asks: how many times can you halve 8? Three.',
        'At each level, merging touches all 8 items. So each level costs about 8 steps.',
        '3 levels × 8 items = 24 steps at most. For this list the merges made 17 comparisons.',
        'Double the list to 16 items. It is now 4 levels × 16 = 64 steps, about two and a half times more than 24.',
        'A slow sort that compares every pair would need up to 120 comparisons for 16 items.'
      ]
    },
    steps: [
      'Split the list into a left half and a right half.',
      'Sort each half the same way. A list of one item needs no sorting.',
      'Compare the front item of each sorted half.',
      'Take the smaller one into a new list. Repeat until both halves are used up.',
      'The new list is the sorted result.'
    ],
    use: ['You need O(n log n) time every time: about n × log n steps, even in the worst case.', 'You need a stable sort or you sort a linked list.'],
    avoid: ['Memory is tight. It needs a spare array as long as the list.', 'The list is tiny. Insertion sort has less overhead.'],
    mistakes: [
      'Forgetting to copy the leftover items when one half runs out first.',
      'Using < instead of <= when comparing fronts. Equal items then lose their order.',
      'Slicing lists at every level without noticing the extra copies.'
    ],
    cheat: ['split, sort halves, merge', 'merge = take the smaller front', 'O(n log n) always', 'O(n) extra space, stable', 'log₂ n levels, n work per level'],
    next: ['quick', 'heapsort', 'countradix'],
    sources: ['CLRS, 4th ed., section 2.3 Designing Algorithms (merge sort) and ch. 4', 'Sedgewick and Wayne, Algorithms, 4th ed., section 2.2 Mergesort', 'Knuth, TAOCP vol. 3, section 5.2.4 Sorting by Merging']
  },

  quick: {
    what: 'Quick sort picks one item, called the pivot. It moves smaller items to the pivot\'s left and bigger items to its right. Then it sorts each side the same way.',
    analogy: 'Say you sort a class by height. Pick one student. Everyone shorter goes to the left, everyone taller to the right. Repeat in each group.',
    uses: ['Sorting large lists fast on average', 'Finding the k-th smallest item without sorting everything (quickselect, below)', 'Many built-in sort functions use ideas from it'],
    before: ['bigo', 'recursion'],
    words: [
      ['pivot', 'The item you compare everything else against.'],
      ['partition', 'Move smaller items left of the pivot and bigger items right of it. One partition puts the pivot in its final place.'],
      ['quickselect', 'To find the k-th smallest item, partition once, then keep working on only the side that holds it.'],
      ['average case', 'How the algorithm behaves on a typical input.'],
      ['worst case', 'The most steps it could ever need for that input size.'],
      ['in place', 'The sort uses almost no extra memory beyond the list itself.']
    ],
    math: {
      lines: ['\\text{good pivot: } O(n \\log n) \\text{ on average}', '\\text{bad pivot every time: } O(n^2) \\text{ worst}'],
      symbols: [
        ['good pivot', 'it splits the list in half each time. That gives about log n levels, and each level compares n items.'],
        ['bad pivot', 'it is the smallest or biggest item, so it removes only one item. That gives n levels.'],
        ['O(n \\log n)', 'the work is about n times log n'],
        ['O(n^2)', 'the work grows with n times n']
      ],
      example: [
        'Sort 5 2 8 1 9 3 7 4 with the last item as the pivot each time.',
        'The partitions compare items with their pivot a total of 16 times.',
        'Here is a different, smaller example. Sort 1 2 3 4 5 6 7, which is already in order. The pivot is always the biggest.',
        'Each partition removes only one item. The comparisons are 6 + 5 + 4 + 3 + 2 + 1 = 21.',
        'That is n(n − 1) ÷ 2 for n = 7. A random pivot makes this bad case very unlikely.'
      ]
    },
    steps: [
      'Pick a pivot, such as the last item or a random one.',
      'Walk the other items. Move each smaller item toward the front.',
      'Place the pivot right after the smaller items. It is now in its final place.',
      'Sort the left part and the right part the same way.',
      'Stop when a part has zero or one item.'
    ],
    use: ['You want fast sorting with little extra memory.', 'You need the k-th smallest item quickly (quickselect).'],
    avoid: ['You need a stable sort. Quick sort can reorder equal items.', 'You need a guaranteed time. A bad pivot costs n times n.'],
    mistakes: [
      'Always picking the first or last item on sorted data. That causes the slow case.',
      'Letting equal items pile on one side, which makes the parts uneven.',
      'Forgetting the stop rule for parts of size 0 or 1, which gives endless calls.'
    ],
    cheat: ['pick pivot, partition, recurse', 'average O(n log n)', 'worst O(n²), so pick the pivot at random', 'in place, not stable', 'quickselect (partition, then follow one side only) finds the k-th item in O(n) on average'],
    next: ['merge', 'heapsort', 'countradix'],
    sources: ['CLRS, 4th ed., ch. 7 Quicksort', 'Sedgewick and Wayne, Algorithms, 4th ed., section 2.3 Quicksort', 'Hoare, Quicksort, The Computer Journal, 1962']
  },

  heapsort: {
    what: 'Heap sort first rearranges the list into a max-heap, where the biggest item is at the top. Then it moves the biggest to the end, fixes the heap, and repeats. A heap is a tree drawn from the list: the Trees lesson comes later, and the words you need are below.',
    analogy: 'Think of a knockout tournament, where the winner is the biggest. Take the winner out, replay a few matches, and a new winner appears.',
    uses: ['Sorting with a guaranteed speed and almost no extra memory', 'Keeping the largest items handy, as a priority queue does (a line where the biggest item is always served first)', 'Systems where worst-case time must be known'],
    before: ['bigo', 'arrays'],
    words: [
      ['tree', 'Items drawn as dots joined by lines. The top dot is the root. A dot has up to two children below it.'],
      ['heap', 'A tree stored in an array where each parent beats its children: bigger in a max-heap, smaller in a min-heap.'],
      ['max-heap', 'A heap with the biggest item at the root.'],
      ['root', 'The top item of the tree, at index 0.'],
      ['sift down', 'Swap an item with its bigger child, again and again, until it fits.'],
      ['child', 'An item directly below another in the tree.']
    ],
    math: {
      lines: ['\\text{children of } i: \\; 2i+1, \\; 2i+2', 'O(n \\log n) \\text{ time}, \\; O(1) \\text{ extra space}'],
      symbols: [
        ['i', 'the index of a parent in the array'],
        ['2i+1, 2i+2', 'the indexes of its left and right children'],
        ['n', 'how many items the list has'],
        ['\\log n', 'how many levels the heap has: the number of times you can halve n. For 8 items it is 3.'],
        ['O(n \\log n)', 'the work grows a little faster than the list']
      ],
      example: [
        'A heap holds 7 items. Index 0 has children at 1 and 2. Index 2 has children at 5 and 6.',
        'The tree has 3 levels, because log₂ 7 is a bit under 3.',
        'Sort 7 items. Each of the 6 removals can sift down at most 2 levels.',
        'That is at most 6 × 2 = 12 sift steps, plus the work to build the heap.',
        'For n items the removals cost at most n × log n steps in all.'
      ]
    },
    steps: [
      'Read the array as a tree. The children of index i are at 2i + 1 and 2i + 2.',
      'Fix each parent from the bottom up by sifting it down. Now the array is a max-heap.',
      'Swap the root, the biggest item, with the last item. The biggest is now in its final place.',
      'Shrink the heap by one and sift the new root down.',
      'Repeat until the heap holds one item. The array is sorted.'
    ],
    use: ['You need O(n log n) in the worst case and no big spare array.', 'You also need a priority queue.'],
    avoid: ['You need a stable sort.', 'You want the best real speed. Quick sort is often faster in practice.'],
    mistakes: [
      'Mixing up the child formulas. They are 2i + 1 and 2i + 2 when counting from 0.',
      'Sifting down inside the whole array instead of the shrunken heap.',
      'Building the heap from the top down instead of the bottom up.'
    ],
    cheat: ['children of i: 2i + 1, 2i + 2', 'parent of i: (i − 1) // 2, where // divides and drops the leftover (7 // 2 is 3)', 'build heap, then pop the root to the end', 'O(n log n) always, in place', 'not stable'],
    next: ['quick', 'merge'],
    sources: ['CLRS, 4th ed., ch. 6 Heapsort', 'Sedgewick and Wayne, Algorithms, 4th ed., section 2.4 Priority Queues (heapsort)', 'Williams, Algorithm 232: Heapsort, Communications of the ACM, 1964']
  },

  countradix: {
    what: 'Counting sort sorts small whole numbers without comparing them. It counts how often each value appears, then writes the values back in order. Radix sort repeats this one digit at a time.',
    analogy: 'Think of a post office sorting letters into numbered pigeonholes. Nobody compares two letters. Each goes straight to its own hole.',
    uses: ['Sorting ages, exam marks or other small whole numbers', 'Sorting long lists of numbers or fixed-length codes by digit', 'Sorting words of equal length, letter by letter'],
    before: ['bigo', 'arrays'],
    words: [
      ['box', 'A counter for one value. Some books call it a bucket. It counts how many times that value shows up.'],
      ['range', 'The span from the smallest to the biggest possible value.'],
      ['digit', 'One position in a number. In 329, the ones digit is 9.'],
      ['stable', 'Equal items keep the order they had before sorting. If two cards both show 5, the one that was first stays first.'],
      ['comparison sort', 'A sort that works by asking which of two items is bigger.']
    ],
    math: {
      lines: ['\\text{counting: } O(n + k)', '\\text{radix: } O(d \\times (n + b))'],
      symbols: [
        ['n', 'how many items there are'],
        ['k', 'the range of values: how many different values are possible'],
        ['d', 'how many digits the biggest number has'],
        ['b', 'the base, such as 10 for ordinary digits. It is also how many boxes each round needs.'],
        ['O( )', 'Big-O: how the number of steps grows. O(n + k) grows in step with n plus k.']
      ],
      example: [
        'Count-sort 8 numbers that are all between 0 and 4. So n = 8 and k = 5 values.',
        'One pass counts them: 8 steps. One pass writes them back: 8 steps plus a walk over 5 boxes.',
        'That is about 8 + 5 + 8 = 21 steps and no comparisons.',
        'Radix-sort 7 numbers with 3 digits, in base 10. That is d = 3 passes.',
        'Each pass costs about n + 10 = 17 steps. The total is about 3 × 17 = 51 steps.'
      ]
    },
    steps: [
      'For counting sort, make one box (a counter) for each possible value.',
      'Walk the list once. Add 1 to the box of each value you see.',
      'Walk the boxes in order and write each value as many times as it was counted.',
      'For radix sort, start with the last digit. Sort the whole list by that digit with counting sort.',
      'Repeat for the next digit left, until the first digit is done. The list is sorted.'
    ],
    use: ['The values are whole numbers in a small range.', 'The numbers have the same number of digits, such as phone codes.'],
    avoid: ['The range is huge, such as 0 to a billion. The boxes waste memory.', 'The items are decimals or arbitrary objects with no digits.'],
    mistakes: [
      'Using an unstable pass in radix sort. Each digit pass must keep the earlier order.',
      'Starting radix with the first digit. Start with the last digit.',
      'Forgetting negative numbers, which have no box unless you shift the range.'
    ],
    cheat: ['count[v] += 1 for each v', 'then write v, count[v] times', 'O(n + k) time, O(k) space', 'radix: last digit first, stable each pass', 'no comparisons made'],
    next: ['merge', 'quick', 'hashing'],
    sources: ['CLRS, 4th ed., ch. 8 Sorting in Linear Time', 'Sedgewick and Wayne, Algorithms, 4th ed., section 5.1 String Sorts (key-indexed counting, LSD radix sort)', 'Knuth, TAOCP vol. 3, section 5.2.5 Sorting by Distribution']
  },

  hashing: {
    what: 'A hash map stores key and value pairs. A hash function turns each key into a number that picks a bucket. Looking up a key then jumps straight to its bucket.',
    analogy: 'A hotel gives each guest a room by a rule on their name. To find a guest, you apply the rule. You never search every room.',
    uses: ['Python dictionaries and sets', 'Counting how often each word appears in a text', 'Checking quickly whether you have seen an item before'],
    before: ['arrays', 'strings'],
    words: [
      ['key', 'The thing you look up, such as a name.'],
      ['hash function', 'A rule that turns a key into a whole number.'],
      ['remainder', 'What is left over after dividing. 15 ÷ 7 is 2 with 1 left over, so the remainder is 1.'],
      ['mod', 'Short for modulo. 15 mod 7 means the remainder of 15 ÷ 7, which is 1.'],
      ['bucket', 'One slot of the table, which holds the keys that landed there.'],
      ['collision', 'Two different keys that land in the same bucket.'],
      ['chaining', 'Keeping a short list inside each bucket for the keys that collided.'],
      ['load factor', 'The number of keys divided by the number of buckets. Many tables grow when it passes about 0.75.']
    ],
    math: {
      lines: ['\\text{bucket} = h(k) \\bmod m', '\\alpha = n / m', 'O(1) \\text{ average}, \\; O(n) \\text{ worst}'],
      symbols: [
        ['h(k)', 'the hash function applied to key k, giving a whole number'],
        ['\\bmod', 'the remainder after dividing. 15 mod 7 is 1.'],
        ['m', 'the number of buckets'],
        ['n', 'the number of keys stored'],
        ['\\alpha', 'the load factor: n divided by m'],
        ['O(1)', 'constant time: the work stays the same however many keys are stored']
      ],
      example: [
        'The table has m = 7 buckets. The hash is the key itself, and key mod 7 picks the bucket.',
        'Key 15: 15 ÷ 7 is 2 with 1 left over, so 15 mod 7 = 1 and it goes in bucket 1. Key 8: 8 mod 7 = 1 too, which is a collision.',
        'Store 8 keys in 7 buckets. The load factor is 8 ÷ 7, about 1.14, so lists average a bit over 1 key.',
        'To find a key, compute one remainder and walk one short list. That is a few steps.',
        'If all 8 keys landed in one bucket, a lookup could walk all 8. That worst case is O(n).'
      ]
    },
    steps: [
      'Apply the hash function to the key and take the remainder after dividing by the number of buckets.',
      'Go to that bucket.',
      'To insert, add the key to the list in that bucket if it is not there.',
      'To look up, walk only that bucket\'s list and compare keys.',
      'If the load factor gets too high, make more buckets and hash every key again.'
    ],
    use: ['You look up items by key very often.', 'You need to count, group or remove duplicates fast.'],
    avoid: ['You need items kept in sorted order.', 'You need the smallest or largest key quickly.'],
    mistakes: [
      'Using a hash function that sends many keys to the same bucket.',
      'Using something that can change, such as a list, as a key. Its hash would change and you would lose it. Python blocks this.',
      'Never growing the table, so the lists get long.'
    ],
    cheat: ['d = {}; d[key] = value', 'key in d is O(1) on average', 'worst case O(n) if all keys collide', 'bucket = hash(key) % m', 'dict and set keep no sorted order of keys'],
    next: ['openaddr', 'linked', 'bst'],
    sources: ['CLRS, 4th ed., ch. 11 Hash Tables', 'Sedgewick and Wayne, Algorithms, 4th ed., section 3.4 Hash Tables', 'Python wiki, TimeComplexity page (dict and set)']
  },

  openaddr: {
    what: 'Open addressing is a way to build a hash table with no lists. Every key lives in the table itself. If its slot is taken, you try the next slot. You go on until you find a free one.',
    analogy: 'Think of a parking lot where your favourite space is full. You drive on to the next space, then the next, until one is free.',
    uses: ['Hash tables that must stay compact in memory', 'Python\'s own dict, which uses open addressing', 'Tables where keys are small and lookups must be quick'],
    before: ['hashing'],
    words: [
      ['slot', 'One place in the table that can hold one key.'],
      ['probe', 'Check a slot to see if it is free or holds your key.'],
      ['linear probing', 'Trying slot after slot in a straight line, and going back to slot 0 after the last slot.'],
      ['cluster', 'A run of filled slots in a row. Clusters make probes longer.'],
      ['tombstone', 'A mark left in a deleted slot so that searches keep walking past it.']
    ],
    math: {
      lines: ['\\text{slot}_j = (h(k) + j) \\bmod m', '\\alpha = n / m \\; < 1'],
      symbols: [
        ['h(k)', 'the hash of key k: its first-choice slot before the remainder'],
        ['j', 'how many slots you have already skipped: 0, 1, 2, ...'],
        ['m', 'the number of slots'],
        ['\\bmod', 'the remainder after dividing (what is left over). It sends the index back to 0 after the last slot.'],
        ['n', 'how many keys are stored'],
        ['\\alpha', 'the load factor: n divided by m. It can never pass 1, because every key needs its own slot. For speed, keep it under about 0.7.']
      ],
      example: [
        'The table has m = 11 slots. Insert 12, 23, 5 and 34.',
        '12 mod 11 = 1: slot 1 is free. 23 mod 11 = 1: slot 1 is taken, so it moves to slot 2.',
        '5 mod 11 = 5: slot 5 is free. 34 mod 11 = 1: slots 1 and 2 are taken, so it lands in slot 3.',
        'Finding 34 takes 3 probes: slots 1, 2 and 3.',
        'The load factor is 4 ÷ 11, about 0.36. At 0.7 or more, probes grow long, so the table grows.'
      ]
    },
    steps: [
      'Hash the key to get a first-choice slot.',
      'If the slot is free, put the key there.',
      'If it is taken, probe the next slot, and go back to slot 0 after the last one.',
      'To find a key, start at its first-choice slot. Probe until you see the key or an empty slot.',
      'To delete a key, leave a tombstone instead of an empty slot.'
    ],
    use: ['You want a compact table with no extra lists.', 'The table stays well below full.'],
    avoid: ['The table is nearly full, since probes get long.', 'Many deletions with no rebuilding, since tombstones pile up.'],
    mistakes: [
      'Emptying a deleted slot. Searches for keys placed after it then stop too early.',
      'Letting the table fill up. At 100 percent full, an insert never finds a free slot.',
      'Using a poor hash. Clusters grow and every operation slows down.'
    ],
    cheat: ['i = hash(k) % m', 'while slot[i] is taken: i = (i + 1) % m', 'delete = leave a tombstone', 'keep load factor under about 0.7', 'clusters slow it down'],
    next: ['hashing', 'linked'],
    sources: ['CLRS, 4th ed., section 11.4 Open Addressing', 'Sedgewick and Wayne, Algorithms, 4th ed., section 3.4 (linear probing)', 'CPython source, Objects/dictobject.c and Objects/dictnotes.txt']
  },

  linked: {
    what: 'A linked list is a chain of nodes. Each node holds a value and a pointer to the next node. The nodes can sit anywhere in memory.',
    analogy: 'Think of a treasure hunt. Each clue holds a prize and tells you where the next clue is. You must follow the clues in order.',
    uses: ['Undo history, where you add and remove at one end', 'Music playlists that you reorder often', 'Building stacks, queues and hash-table chains'],
    before: ['arrays'],
    words: [
      ['node', 'One link of the chain. It holds a value and a pointer.'],
      ['pointer', 'A note that says where another node is stored in memory.'],
      ['head', 'The pointer to the first node.'],
      ['null', 'A pointer to nothing. The last node points to it. In Python it is None.'],
      ['doubly linked', 'Each node also points back to the node before it.']
    ],
    math: {
      lines: ['O(i) \\text{ reach index } i', 'O(1) \\text{ insert or delete after a node you hold}'],
      symbols: [
        ['i', 'the index of the node you want to reach'],
        ['O(i)', 'the work grows in step with i: one pointer to follow per step'],
        ['O(1)', 'constant time: a fixed number of pointer changes, however long the list is']
      ],
      example: [
        'A list has 5 nodes. To reach the third node, start at head and follow 2 pointers.',
        'That is O(i) with i = 2, so 2 steps. An array reaches any index in 1 step.',
        'Insert a new node after a node you already hold: set 2 pointers. That is 2 steps for any length.',
        'Inserting in the middle of an array of 5 moves up to 4 items.',
        'For a list of a million nodes, the insert is still 2 pointer changes.'
      ]
    },
    steps: [
      'Keep a head pointer to the first node.',
      'To read a node, start at head and follow next pointers.',
      'To insert, point the new node at the node that should follow it. Then point the earlier node at the new one.',
      'To delete, make the earlier node skip over the unwanted node.',
      'Stop when a pointer is null.'
    ],
    use: ['You insert and delete often at spots you already hold.', 'You do not need to jump to an index.'],
    avoid: ['You read by index often. An array is much faster.', 'Memory is tight. Every node also stores a pointer.'],
    mistakes: [
      'Changing pointers in the wrong order and losing the rest of the list. Link the new node first.',
      'Forgetting to check for an empty list or for null.',
      'Forgetting that reaching a node takes a walk. Looping inside a loop gets slow.'
    ],
    cheat: ['class Node: self.value = v; self.next = None', 'new.next = prev.next; prev.next = new', 'prev.next = prev.next.next  # delete', 'reach index i: O(i)', 'insert after a held node: O(1)'],
    next: ['stackqueue', 'deque', 'hashing'],
    sources: ['CLRS, 4th ed., section 10.2 Linked Lists', 'Sedgewick and Wayne, Algorithms, 4th ed., section 1.3 (linked lists)', 'Knuth, TAOCP vol. 1, section 2.2 Linear Lists']
  },

  stackqueue: {
    what: 'A stack gives back the item you added last. A queue gives back the item you added first. Both let you add and remove one item at a time.',
    analogy: 'A stack is a pile of plates: you take the top one. A queue is a line at a shop: the person who came first is served first.',
    uses: ['Undo in an editor, which is a stack', 'Checking that brackets match in code', 'Waiting lines for print jobs or tasks, which are queues'],
    before: ['arrays', 'linked'],
    words: [
      ['stack', 'Last in, first out. Add and remove at the same end, called the top.'],
      ['queue', 'First in, first out. Add at the back and remove from the front.'],
      ['push / pop', 'Push adds an item to a stack. Pop removes the top one.'],
      ['enqueue / dequeue', 'Enqueue adds an item to a queue. Dequeue removes the front one.'],
      ['circular queue', 'A queue in an array whose indexes go back to 0 after the last place.']
    ],
    math: {
      lines: ['\\text{push, pop, enqueue, dequeue: } O(1)', '\\text{tail} = (\\text{tail} + 1) \\bmod m'],
      symbols: [
        ['O(1)', 'constant time: the work stays the same, however many items are stored'],
        ['tail', 'the index where the next new item joins the queue'],
        ['m', 'the size of the array'],
        ['\\bmod', 'the remainder after dividing (what is left over). It sends the index back to 0.']
      ],
      example: [
        'Take an array of size m = 6. Enqueue 3, 8, 5. They go to indexes 0, 1, 2, and the tail moves on to 3.',
        'Dequeue takes 3 from the front. The head moves to index 1. No item shifts, so it is 1 step.',
        'Enqueue 1, 4, 6. They go to indexes 3, 4, 5, and the tail becomes (5 + 1) mod 6 = 0.',
        'Enqueue 9. It goes to index 0, where 3 was, and the tail becomes 1. The queue reuses the freed place.',
        'Now head and tail are both 1, so keep a count to tell full from empty. Here the count is 6: full.',
        'If dequeue shifted every item left instead, it would cost up to 5 moves for 6 slots.'
      ]
    },
    steps: [
      'Stack: push writes to the top and adds 1 to the top index.',
      'Stack: pop takes the top item and subtracts 1 from the top index.',
      'Queue: enqueue writes at the tail index and moves the tail on by one.',
      'Queue: dequeue reads at the head index and moves the head on by one.',
      'Send an index back to 0 after the last place. Keep a count to tell full from empty.'
    ],
    use: ['A stack: undo, matching brackets, or searching by going as deep as you can first.', 'A queue: taking turns, or searching level by level.'],
    avoid: ['You need items from the middle. Use a list or another structure.', 'You need both ends. A deque suits that better.'],
    mistakes: [
      'Popping from an empty stack. Check for empty first.',
      'Using list.pop(0) as a queue in Python. It costs O(n); the work grows with the list. Use collections.deque.',
      'Mixing up the order. A stack returns the newest item, a queue the oldest.'
    ],
    cheat: ['stack: s.append(x); s.pop()', 'queue: from collections import deque; q.append(x); q.popleft()', 'stack = last in, first out', 'queue = first in, first out', 'all four operations are O(1)'],
    next: ['deque', 'trees', 'linked'],
    sources: ['CLRS, 4th ed., section 10.1 Simple Array-Based Data Structures: Arrays, Matrices, Stacks, Queues', 'Sedgewick and Wayne, Algorithms, 4th ed., section 1.3 Bags, Queues, and Stacks', 'Python documentation, collections.deque and the Tutorial section on using lists as stacks and queues']
  },

  deque: {
    what: 'A deque, said "deck", is a queue open at both ends. You can add or remove at the front and at the back. Each of those four actions takes the same short time.',
    analogy: 'Picture a train with doors at both ends. Passengers can get on or off at the front or at the back, and the carriages stay put.',
    uses: ['Keeping the biggest value of a moving window of numbers', 'Undo and redo lists, where you drop old items from one end', 'Checking whether a word reads the same both ways, by comparing letters from both ends'],
    before: ['stackqueue'],
    words: [
      ['front', 'One end of the deque. You can add or remove here.'],
      ['back', 'The other end of the deque. You can add or remove here.'],
      ['circular array', 'An array whose indexes go back to 0 after the last place, so freed places get reused.'],
      ['sliding window', 'A group of neighbouring items that moves along a list one step at a time.'],
      ['O(1)', 'Constant time: the work stays the same, however many items are stored.']
    ],
    math: {
      lines: ['\\text{back} = (\\text{back} + 1) \\bmod m', '\\text{front} = (\\text{front} - 1 + m) \\bmod m'],
      symbols: [
        ['front', 'the index of the first item'],
        ['back', 'the index of the last item'],
        ['m', 'the size of the array'],
        ['\\bmod', 'the remainder after dividing (what is left over). It keeps an index inside the array.']
      ],
      example: [
        'The array has m = 8 slots. Push 3 and 5 at the back, so they sit at indexes 0 and 1.',
        'Push 8 at the front. Front was 0, so the new front is (0 − 1 + 8) mod 8 = 7.',
        'Reading from front to back gives 8, 3, 5. No item moved, so each push cost 1 step.',
        'Pop at the back removes 5 in 1 step. Pop at the front removes 8 in 1 step.',
        'A plain list would shift 2 items to push at its front.'
      ]
    },
    steps: [
      'Keep a front index and a back index in a circular array.',
      'Push at the back: move the back one place on, then write there.',
      'Push at the front: move the front one place back (to the other end if needed), then write.',
      'Pop at either end: read that item, then move that index one place inward.',
      'Use the mod formula so indexes stay inside the array.'
    ],
    use: ['You need to add and remove at both ends.', 'You track the maximum of a sliding window.'],
    avoid: ['You need to read from the middle by index often.', 'A plain stack or queue is enough.'],
    mistakes: [
      'Using a Python list and insert(0, x), which moves every item. Use collections.deque.',
      'Forgetting to go back to the other end when the front goes below 0.',
      'Popping from an empty deque. Check first.'
    ],
    cheat: ['from collections import deque', 'd.append(x); d.appendleft(x)', 'd.pop(); d.popleft()', 'each is O(1)', 'a deque can act as a stack or a queue'],
    next: ['stackqueue', 'trees', 'linked'],
    sources: ['Python documentation, collections.deque', 'Python wiki, TimeComplexity page (collections.deque)', 'Sedgewick and Wayne, Algorithms, 4th ed., section 1.3 (resizing arrays and queues)']
  },

  trees: {
    what: 'A tree is a set of nodes joined by lines, with one node at the top. Every other node has exactly one parent above it. In a binary tree, each node has at most two children.',
    analogy: 'A family tree or a folder on your computer. One folder sits at the top, and each folder lives inside exactly one other folder.',
    uses: ['Folders and files on a computer', 'The structure of a web page, where tags sit inside other tags', 'Decision trees that sort items by asking questions'],
    before: ['recursion', 'stackqueue', 'linked'],
    words: [
      ['node', 'One dot of the tree. Nodes are joined by edges, the lines.'],
      ['parent / child', 'A parent is the node directly above another. The node below it is its child.'],
      ['root', 'The node at the top, with no parent.'],
      ['leaf', 'A node with no children.'],
      ['depth', 'How many lines you cross going down from the root to a node.'],
      ['height', 'The depth of the deepest leaf. A tree of height 3 has 4 rows, called levels.'],
      ['traversal', 'A walk that visits every node once.'],
      ['subtree', 'A node together with everything below it.']
    ],
    math: {
      lines: ['\\text{each walk: } O(n) \\text{ time}', '\\text{depth-first walk: } O(h) \\text{ extra space}'],
      symbols: [
        ['n', 'how many nodes the tree has'],
        ['h', 'the height of the tree'],
        ['O(n)', 'linear: the work grows in step with the tree. Each node is visited once.'],
        ['O(h)', 'the extra memory grows in step with the height, for the waiting calls']
      ],
      example: [
        'Take the tree in the lesson: 8 nodes, with root 8 and children 3 and 10.',
        'Any of the four walks visits each node once, so it takes 8 visits.',
        'A depth-first walk keeps one waiting call per node on the path down. The longest path has 4 nodes, so up to 4 calls wait.',
        'Level order uses a queue. It can hold a whole row at once, up to 3 nodes here.',
        'Doubling the tree to 16 nodes doubles the visits to 16.'
      ]
    },
    steps: [
      'Start at the root.',
      'Pre-order: visit the node, then its left subtree, then its right subtree.',
      'In-order: visit the left subtree, then the node, then the right subtree.',
      'Post-order: visit both subtrees first, then the node.',
      'Level order: use a queue and visit the tree row by row from the top.'
    ],
    use: ['Your data has a parent and child shape.', 'You need to visit every node, or add up something over all of them.'],
    avoid: ['The data has loops, where a node can be reached two ways. Use a graph.', 'You need to read by index. Use an array.'],
    mistakes: [
      'Forgetting the base case for an empty child. Check for None first.',
      'Mixing up the three depth-first orders. The name says where the node itself is visited.',
      'Using a queue for the depth-first orders, or a stack for level order.'
    ],
    cheat: ['pre: node, left, right', 'in: left, node, right', 'post: left, right, node', 'level: use a queue', 'every walk is O(n)'],
    next: ['bst', 'heapsort', 'recursion'],
    sources: ['CLRS, 4th ed., section 10.3 Representing Rooted Trees and appendix B.5 Trees', 'Sedgewick and Wayne, Algorithms, 4th ed., section 3.2 Binary Search Trees (traversals)', 'Knuth, TAOCP vol. 1, section 2.3 Trees']
  },

  bst: {
    what: 'A binary search tree keeps one rule at every node. Everything on the left is smaller and everything on the right is bigger. That rule lets you skip half a branch with each look.',
    analogy: 'It works like a guessing game of higher or lower. Each answer cuts away a whole group of numbers that you never need to check.',
    uses: ['Keeping items in sorted order while you add and remove them', 'Finding the next bigger or smaller value quickly', 'Underlying sorted maps and sets in many languages'],
    before: ['trees', 'recursion'],
    words: [
      ['search tree', 'A binary tree where left is smaller and right is bigger at every node.'],
      ['successor', 'The next bigger value. It is the smallest value in the right subtree.'],
      ['height', 'As in the Trees lesson: the depth of the deepest leaf. A tree of height 3 has 4 levels, so a search needs at most 4 looks.'],
      ['balanced', 'A tree whose left and right sides have about the same height.'],
      ['log n', 'How many times you can halve n before one is left. It is about how tall a balanced tree is.'],
      ['rotation', 'A small rearrangement of nodes that keeps the order rule but lowers the height.']
    ],
    math: {
      lines: ['\\text{search, insert, delete: } O(h)', '\\text{balanced: } h \\text{ is about } \\log_2 n, \\quad \\text{a line: } h = n'],
      symbols: [
        ['h', 'the height of the tree: the depth of its deepest leaf'],
        ['n', 'how many nodes the tree has'],
        ['O(h)', 'the work grows in step with the height, since each look goes down one level'],
        ['\\log_2 n', 'how many times you can halve n before one is left. The small 2 means halving.']
      ],
      example: [
        'A balanced tree holds 7 nodes in 3 levels (height 2), so a search needs at most 3 looks.',
        'With 1000 nodes, a balanced tree needs about 10 looks. Two multiplied by itself 10 times is 1024.',
        'Insert 1, 2, 3, 4, 5, 6, 7 in order. Each one goes right of the last, and the tree is a line.',
        'Now there are 7 levels (height 6), so a search needs up to 7 looks. That is O(n).',
        'Balanced trees use rotations to stay near 3 levels for 7 nodes.'
      ]
    },
    steps: [
      'Search: start at the root. Go left if the target is smaller, right if it is bigger.',
      'Stop when you find the value, or when you reach an empty place.',
      'Insert: search for the value. Put a new leaf where the search ended.',
      'Delete a leaf: cut it off. Delete a node with one child: move the child up.',
      'Delete a node with two children: copy in its successor, then delete the successor.'
    ],
    use: ['You need sorted order while items come and go.', 'You need the next bigger or smaller item, or items in a range.'],
    avoid: ['Only exact lookups matter. A hash map is usually faster.', 'Your data arrives already sorted, unless the tree balances itself.'],
    mistakes: [
      'Inserting sorted data into a plain tree. It turns into a line and searches get slow.',
      'Breaking the order rule while deleting a node with two children.',
      'Comparing only a node with its children. The rule covers the whole subtree.'
    ],
    cheat: ['smaller left, bigger right, at every node', 'search/insert/delete: O(h)', 'balanced: height is about log₂ n', 'worst case: a line, height = n − 1', 'in-order walk gives sorted values'],
    next: ['heap', 'hashing', 'trees'],
    sources: ['CLRS, 4th ed., ch. 12 Binary Search Trees', 'Sedgewick and Wayne, Algorithms, 4th ed., section 3.2 Binary Search Trees', 'Knuth, TAOCP vol. 3, section 6.2.2 Binary Tree Searching']
  }
};
if (typeof module !== 'undefined') module.exports = { CONCEPT_ABOUT_A };
