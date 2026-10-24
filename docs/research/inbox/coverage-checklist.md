# Full DSA and basics coverage checklist (open-source stand-in for GeeksforGeeks)

Purpose: a topic-only checklist built from open sources, so DSAMaxxing can see what a beginner expects to meet and where we have nothing yet. GeeksforGeeks was NOT visited (its robots.txt bans Anthropic agents). Structure and topic names only; no text copied. All site writing stays ours.

Checked against `origin/claude/gracious-edison-tx7t62` (default branch): `shared/sheet.js` (32 groups, 553 rows), `shared/catalog.js` (8 stage keys, 16 patterns, story problems), `src/ai/lessons.js` (30 lessons), `src/sd/lessons.js` (41 lessons), `src/story/*`, `src/git/lessons.js`.
Note: there is NO `src/start` folder on the default branch or on any remote branch, so there are no "Start here" levels yet. Every language-basics row is therefore `missing`, and "Start here" is the suggested home for them.

Coverage key: covered = a story or lesson already teaches it; partial = sheet problems or a neighbouring story touch it but nothing teaches the idea itself; missing = nothing. Track: Start = Start here levels, Sheet = DSA sheet group, Story = a story (problem story or new concept story), AI = AI & ML lesson.

## Top 30 gaps, prioritized for beginners

Order = what a first-time learner hits first, then what unlocks the most later topics.

1. Start here: variables, types, operators, input/output (Start)
2. Start here: conditionals and loops, traced step by step (Start)
3. Start here: functions, parameters, scope and the call stack (Start)
4. Big-O and complexity: counting steps, time vs space, best/average/worst (Start or Story; nothing teaches it)
5. Arrays as memory: index, insert/delete cost, dynamic array growth, 2D arrays (Start)
6. Strings as arrays: immutability, slicing, Unicode vs ASCII, common string ops (Start)
7. Lists, dicts, sets and tuples in the language itself (Start)
8. Recursion from zero: base case, call stack drawing, factorial and Fibonacci traces (Start, feeds trees)
9. The simple sorts one by one: bubble, selection, insertion (Story; Sorting group has problems only)
10. Merge sort and quick sort as animated lessons, then heap, counting and radix sort (Story)
11. Linear vs binary search as a concept pair, plus the "search the answer" idea (Story; only problem stories exist)
12. Hashing explained: hash function, collisions, chaining vs open addressing, load factor (Story)
13. Linked list structure: singly, doubly, circular, insert/delete at head, middle, tail (Story)
14. Stack and queue implemented (array and linked), deque, circular queue, with real uses (Story)
15. Tree vocabulary and the three depth-first traversals plus level order as a concept (Story)
16. BST insert, search and delete, and why balance matters (Story)
17. Heap and priority queue internals: sift up/down, heapify, heap sort (Story)
18. Graph representations (adjacency list vs matrix) and graph vocabulary before BFS/DFS (Story)
19. Topological sort as its own idea (Kahn and DFS order), not only via Course Schedule (Story)
20. Shortest paths ladder: BFS on unweighted, Dijkstra, Bellman-Ford, Floyd-Warshall (Story)
21. Spanning trees: Kruskal and Prim, and union-find as the engine (Story)
22. Number theory basics: divisibility, gcd/Euclid, primes, sieve (Sheet + Story)
23. Modular arithmetic, fast power, modular inverse (Story)
24. Combinatorics basics: counting rules, permutations vs combinations, nCr and Pascal, inclusion-exclusion (Story)
25. Probability and statistics for data science: mean/median/variance, distributions, conditional probability and Bayes (AI)
26. pandas and SQL for data: tables, filter, group by, joins (AI lesson; SQL sheet group has problems only)
27. The ML workflow end to end: data, clean, features, split, train, evaluate, ship (AI)
28. Bit magic as a taught topic: AND/OR/XOR/shift, masks, tricks (Story; sheet has 16 problems only)
29. String matching algorithms taught: KMP, Z, Rabin-Karp rolling hash (Story)
30. OOP basics (class, object, inheritance, polymorphism, encapsulation) and async basics (callbacks, promises, event loop) (Start; the LLD lessons assume OOP already)

Just under the cut: AVL/red-black intro, segment tree and Fenwick as lessons, divide and conquer as a named pattern, amortized analysis, SCC/bridges/articulation points, network flow intro, geometry basics (cross product, convex hull), randomized algorithms (quickselect, reservoir sampling, skip lists), regression metrics (MSE, R-squared), neural-network basics beyond one neuron.

---

## 1. Language basics (Start here)

Sources: Python Tutorial contents; Java Tutorials "Learning the Java Language" and "Essential Java Classes" trails; MDN JavaScript Guide chapters. Pick one teaching language first (suggest Python), then mirror.

| topic | coverage | evidence | track |
|---|---|---|---|
| Hello world, running code | missing | code runner exists (src/code) but no lesson | Start |
| Variables and data types (int, float, bool, str, none/null) | missing | none | Start |
| Operators and expressions; integer vs float division; overflow | missing | none | Start |
| Input and output, formatting | missing | none | Start |
| Conditionals (if/elif/else, switch/match) | missing | none | Start |
| Loops (for, while, break, continue, range) | missing | none | Start |
| Functions, parameters, return values, default/keyword args | missing | none | Start |
| Scope, closures, call stack | missing | none | Start |
| Lists / arrays and slicing | partial | arrays stage in catalog, sheet problems | Start |
| Strings and string methods | partial | strings stage problems only | Start |
| Dictionaries / maps / sets | partial | hash stage problems and stories | Start |
| Tuples, enums, constants | missing | none | Start |
| Comprehensions, lambdas, higher-order (map/filter/reduce) | missing | none | Start |
| Errors and exceptions (try/catch/finally, custom errors) | missing | none | Start |
| Files and JSON | missing | none | Start |
| Modules, imports, packages | missing | none | Start |
| Regular expressions | missing | none | Start |
| Classes and objects, constructors, `this`/`self` | missing | LLD lessons assume it | Start |
| Inheritance, interfaces, abstract classes, polymorphism | partial | sd lessons solid, strategy, factory use them | Start |
| Encapsulation, access control, immutability | missing | none | Start |
| Generics / templates and typing | missing | none | Start |
| Iterators and generators | missing | none | Start |
| Date and time, number formatting | missing | none | Start |
| Memory model: stack vs heap, references vs values, garbage collection | missing | none | Start |
| Concurrency basics: threads, locks, race conditions | partial | Concurrency sheet group (9 problems), no story | Story |
| Async: callbacks, promises, async/await, event loop | missing | none | Start |
| Standard library worth knowing (collections, heapq, bisect, itertools) | missing | none | Start |
| Git basics | covered | src/git lessons | n/a |
| Terminal and command line | missing | none | Start |
| Testing and debugging (print, debugger, unit tests) | missing | none | Start |
| SQL basics (SELECT, WHERE, JOIN, GROUP BY) | partial | SQL sheet group, 29 problems, no lesson | AI/Story |

## 2. DSA tutorial range

Sources: Wikipedia "List of algorithms", "List of data structures", "Outline of computer science" (headings only); Open Data Structures (chapters 1-14); Jeff Erickson, Algorithms (chapter list); OpenDSA (home page only).

### 2.1 Complexity and analysis
| topic | coverage | evidence | track |
|---|---|---|---|
| What an algorithm is, steps and correctness | missing | none | Start |
| Time complexity, counting operations | missing | none | Story |
| Big-O, Omega, Theta; growth order table | missing | none | Story |
| Space complexity, auxiliary space | missing | none | Story |
| Best/average/worst case | missing | none | Story |
| Amortized analysis (dynamic array, union-find) | missing | none | Story |
| Solving recurrences, master theorem intro | missing | none | Story |
| Reading constraints to pick an approach (n up to 1e5 means n log n) | missing | none | Story |

### 2.2 Arrays, strings, matrix
| topic | coverage | evidence | track |
|---|---|---|---|
| Array basics, insert/delete/shift | partial | arrays stage, stories | Start |
| Dynamic arrays and resizing | missing | none | Story |
| Two pointers | covered | stories valid-palindrome, two-sum-ii, 3sum, container, trapping-rain | Sheet+Story |
| Sliding window (fixed and variable) | covered | stories longest-substring, min-window, sliding-window-max | Sheet+Story |
| Prefix sums and difference arrays | covered | stories product-except-self, subarray-sum-k | Sheet+Story |
| Kadane (max subarray) | covered | story max-subarray | Story |
| In-place tricks (Dutch flag, partition, rotate array) | partial | Sort Colors on sheet, no story | Sheet |
| String basics: reverse, compare, palindrome, anagram, case | covered | stories valid-palindrome, valid-anagram | Story |
| Matrix traversals: row/column, spiral, diagonal, rotate | partial | story rotate-image; Spiral on sheet | Sheet+Story |
| Grid as graph (flood fill, islands) | covered | stories number-of-islands, rotting-oranges | Story |
| 2D prefix sums | partial | sheet only (Range Sum Query 2D) | Sheet |

### 2.3 Searching
| topic | coverage | evidence | track |
|---|---|---|---|
| Linear search | missing | none | Story |
| Binary search on sorted array | covered | story binary-search | Story |
| Binary search variants (lower/upper bound, rotated, peak) | covered | stories find-min-rotated, search-rotated | Story |
| Binary search on the answer | partial | Koko, Capacity To Ship on sheet, no story | Sheet |
| Ternary search, exponential/jump/interpolation search | missing | none | Story |

### 2.4 Sorting (each algorithm)
| topic | coverage | evidence | track |
|---|---|---|---|
| Bubble sort | missing | Sorting group has problems, no sort-teaching content | Story |
| Selection sort | missing | none | Story |
| Insertion sort | partial | Insertion Sort List problem only | Story |
| Merge sort | partial | Sort List / Sort an Array problems, no teaching | Story |
| Quick sort and partitioning (Lomuto/Hoare) | missing | none | Story |
| Heap sort | missing | none | Story |
| Counting sort | missing | none | Story |
| Radix sort, bucket sort | missing | none | Story |
| Shell sort, tim sort overview | missing | none | Story |
| Stable vs unstable, in-place, comparison lower bound | missing | none | Story |
| Quickselect / kth element | partial | Kth Largest on sheet via heap, story kth-largest | Story |
| Custom comparators and sorting by key | partial | Largest Number, Custom Sort String on sheet | Sheet |

### 2.5 Hashing
| topic | coverage | evidence | track |
|---|---|---|---|
| Hash map / set as a tool | covered | stories two-sum, group-anagrams, contains-duplicate, longest-consecutive | Story |
| How hashing works: hash function, buckets, collisions | missing | none | Story |
| Chaining vs open addressing (linear, quadratic, double) | missing | none | Story |
| Load factor and rehash | missing | none | Story |
| Frequency counting, anagram hashing | covered | stories valid-anagram, group-anagrams | Story |
| Bloom filter, consistent hashing | partial | sd lesson hashing (consistent hashing) | Story |
| Design HashMap / HashSet | partial | sheet Design group, no story | Sheet |

### 2.6 Recursion, backtracking, divide and conquer, greedy
| topic | coverage | evidence | track |
|---|---|---|---|
| Recursion basics, call stack, base case | partial | tree stories show it, no standalone lesson | Start |
| Recursion trees and tail recursion | missing | none | Story |
| Backtracking template | covered | stories subsets, permutations, combination-sum, word-search | Story |
| N-Queens, Sudoku, constraint search | partial | sheet only | Sheet |
| Divide and conquer as a pattern (merge sort, closest pair, fast pow) | missing | none | Story |
| Greedy basics | partial | story jump-game, 21 sheet rows | Story |
| Classic greedy: activity selection, fractional knapsack, Huffman coding | missing | none | Story |
| Interval scheduling and merging | covered | stories merge-intervals, insert-interval | Story |

### 2.7 Dynamic programming families
| topic | coverage | evidence | track |
|---|---|---|---|
| Memoization vs tabulation idea | partial | stories climbing-stairs, house-robber | Story |
| 1D DP (stairs, rob, decode ways) | covered | stories climbing-stairs, house-robber | Story |
| Grid DP | covered | story unique-paths; DP on Grids & Strings group has 12 rows | Story |
| Unbounded knapsack / coin change | covered | story coin-change | Story |
| 0/1 knapsack, subset sum | partial | Partition Equal Subset Sum, Target Sum on sheet | Story |
| String DP: LCS, edit distance | partial | sheet only | Story |
| LIS | covered | story lis | Story |
| DP on subsequences / palindromes | partial | sheet only | Sheet |
| Interval DP (burst balloons, matrix chain) | partial | group has 7 rows, no story | Sheet |
| Bitmask DP, TSP | partial | sheet only | Sheet |
| DP on trees | partial | House Robber III on sheet | Sheet |
| State DP (stock series), digit DP | partial | stock problems on sheet | Sheet |
| DP optimizations (convex hull trick, divide-and-conquer DP) | missing | none | Sheet |

### 2.8 Linked lists
| topic | coverage | evidence | track |
|---|---|---|---|
| Singly linked list ops (insert, delete, search) | partial | sheet Linked Lists, stories reverse/merge/remove-nth | Story |
| Doubly and circular lists | missing | Design Linked List problem only | Story |
| Reverse a list | covered | story reverse-linked-list | Story |
| Fast/slow pointers (middle, cycle) | covered | stories middle-of-list, linked-list-cycle | Story |
| Merge two sorted lists | covered | story merge-two-lists | Story |
| Dummy head, k-group reversal | partial | sheet only | Sheet |
| Skip lists | missing | none | Story |

### 2.9 Stacks and queues
| topic | coverage | evidence | track |
|---|---|---|---|
| Stack concept and implementation | partial | stories valid-parentheses, min-stack | Story |
| Queue, deque, circular queue | missing | design problems on sheet only | Story |
| Expression parsing, RPN, infix to postfix | partial | sheet problems | Sheet |
| Monotonic stack | covered | stories daily-temperatures, largest-rectangle-in-histogram | Story |
| Monotonic queue / sliding window max | covered | story sliding-window-max | Story |
| Priority queue as queue variant | covered | see heaps | Story |

### 2.10 Trees
| topic | coverage | evidence | track |
|---|---|---|---|
| Tree vocabulary (root, leaf, height, depth, level) | missing | none | Story |
| Binary tree traversals: pre/in/post (recursive and iterative) | partial | sheet rows only; stories invert-tree, max-depth | Story |
| Level order / BFS on a tree | covered | stories level-order, right-side-view | Story |
| BST: search, insert, delete, validate | partial | story validate-bst; sheet rows | Story |
| Tree construction from traversals | partial | sheet only | Sheet |
| LCA, diameter, path sums | partial | sheet only | Sheet |
| Tree serialization | partial | sheet only | Sheet |
| AVL tree and rotations (intro) | missing | none | Story |
| Red-black tree (intro), 2-3 / B-trees | missing | none | Story |
| Splay, scapegoat, treap (Open Data Structures ch. 7-9) | missing | none | Story |
| Heap (binary heap, heapify) | partial | stories kth-largest, top-k-frequent, merge-k-lists use heaps | Story |
| Segment tree (point update, range query, lazy) | partial | Segment Tree & BIT group, 6 rows, no story | Story |
| Fenwick tree / BIT | partial | same group | Story |
| Trie | covered | story implement-trie-prefix-tree | Story |
| Sparse table, sqrt decomposition | missing | none | Story |
| K-d tree, quadtree | missing | none | Story |

### 2.11 Graphs
| topic | coverage | evidence | track |
|---|---|---|---|
| Graph vocabulary and representations | missing | none | Story |
| DFS | covered | stories number-of-islands, clone-graph | Story |
| BFS and shortest path in unweighted graphs | covered | stories rotting-oranges, level-order | Story |
| Connected components, bipartite check | partial | sheet only | Sheet |
| Cycle detection (directed and undirected) | partial | story course-schedule | Story |
| Topological sort | partial | story course-schedule only | Story |
| Union-find (DSU) | covered | story redundant-connection | Story |
| Dijkstra | partial | story network-delay-time | Story |
| Bellman-Ford, Floyd-Warshall, 0-1 BFS, A* | missing | none | Story |
| MST: Kruskal, Prim | partial | Min Cost to Connect All Points on sheet, no story | Story |
| SCC (Kosaraju, Tarjan) | missing | none | Story |
| Bridges and articulation points | partial | Critical Connections on sheet | Story |
| Eulerian and Hamiltonian paths | partial | Reconstruct Itinerary on sheet | Sheet |
| Network flow intro (Ford-Fulkerson, max-flow min-cut) | missing | none | Story |
| Bipartite matching | missing | none | Story |
| Graph colouring, TSP overview | missing | none | Story |

### 2.12 Bit magic
| topic | coverage | evidence | track |
|---|---|---|---|
| Binary numbers, AND/OR/XOR/NOT/shifts | missing | taught nowhere | Story |
| Count set bits, power of two, parity | partial | sheet rows | Sheet |
| XOR tricks (single number, swap) | partial | sheet rows | Sheet |
| Masks, subset enumeration | partial | sheet, Bitmask DP | Sheet |
| Two's complement and overflow | missing | none | Start |

### 2.13 Mathematics and number theory
| topic | coverage | evidence | track |
|---|---|---|---|
| Digits, palindromes, base conversion | partial | sheet Math group | Sheet |
| GCD / LCM (Euclid) | missing | only GCD of Strings | Story |
| Primes, primality test | missing | Count Primes on sheet | Story |
| Sieve of Eratosthenes | missing | same | Story |
| Prime factorization, divisors | missing | none | Story |
| Modular arithmetic | missing | none | Story |
| Fast power / binary exponentiation | partial | Pow(x, n) on sheet | Story |
| Modular inverse, Fermat, extended Euclid | missing | none | Story |
| Chinese remainder theorem | missing | none | Story |
| Matrix exponentiation | missing | none | Story |
| Fibonacci closed forms and fast doubling | missing | none | Story |
| Euler totient | missing | none | Story |
| Expected value and probability puzzles in code | missing | none | Story |

### 2.14 Combinatorics
| topic | coverage | evidence | track |
|---|---|---|---|
| Counting rules (sum, product) | missing | none | Story |
| Permutations and combinations, nCr | partial | backtracking stories enumerate, no counting | Story |
| Pascal's triangle and binomial | partial | sheet rows | Sheet |
| Inclusion-exclusion | missing | none | Story |
| Catalan numbers | missing | none | Story |
| Stars and bars, derangements | missing | none | Story |
| Generating permutations/combinations (next permutation) | partial | sheet rows | Sheet |
| Pigeonhole, parity arguments | missing | none | Story |

### 2.15 Geometry basics
| topic | coverage | evidence | track |
|---|---|---|---|
| Points, distance, slope | partial | sheet: Straight Line, Valid Square | Sheet |
| Cross product, orientation | missing | none | Story |
| Line intersection, rectangle overlap | partial | sheet Rectangle Overlap | Sheet |
| Convex hull (Graham, Andrew) | partial | Erect the Fence on sheet | Story |
| Sweep line (skyline, closest pair) | partial | The Skyline Problem on sheet | Story |
| Polygon area, point in polygon | missing | none | Story |

### 2.16 String algorithms
| topic | coverage | evidence | track |
|---|---|---|---|
| Naive pattern search | partial | strStr on sheet | Sheet |
| KMP and prefix function | partial | Longest Happy Prefix on sheet | Story |
| Z algorithm | missing | none | Story |
| Rabin-Karp / rolling hash | partial | Longest Duplicate Substring on sheet | Story |
| Manacher, palindromic tricks | missing | expand-around-center appears in the longest-palindrome story only | Story |
| Suffix array / suffix tree (intro) | missing | none | Story |
| Trie-based problems | covered | story implement-trie-prefix-tree | Story |
| Aho-Corasick | missing | none | Story |
| Parsing and simulation strings | partial | sheet rows | Sheet |

### 2.17 Randomized, probabilistic, advanced
| topic | coverage | evidence | track |
|---|---|---|---|
| Randomized quicksort / quickselect | missing | none | Story |
| Reservoir sampling, shuffle (Fisher-Yates) | missing | none | Story |
| Monte Carlo vs Las Vegas | missing | none | Story |
| Skip lists, treaps | missing | none | Story |
| Bloom filters, count-min sketch | missing | none | Story |
| NP-hardness vocabulary, approximations | missing | none | Story |
| Linear programming, FFT (Erickson advanced notes) | missing | none | Story (later) |

### 2.18 Design with data structures
| topic | coverage | evidence | track |
|---|---|---|---|
| LRU cache | covered | story lru-cache; sd lesson lru | Story |
| LFU, snapshot array, browser history | partial | sheet Design group | Sheet |
| System design lessons | covered | 41 sd lessons | n/a |

## 3. Data science and ML intro order

Suggested order for a beginner path; coverage from src/ai/lessons.js (ml track: gradient, knn, tree, overfit, backprop, embeddings, logistic, confusion, kmeans, pca, biasvar, gboost, regular, crossval, nbayes, svm).

| step | topic | coverage | evidence | track |
|---|---|---|---|---|
| 1 | Descriptive stats: mean, median, mode, spread, variance, std | missing | none | AI |
| 2 | Distributions: normal, uniform, binomial; sampling | missing | none | AI |
| 3 | Probability: events, conditional, independence, Bayes | partial | nbayes lesson assumes it | AI |
| 4 | Correlation vs causation, outliers | missing | none | AI |
| 5 | Hypothesis tests and confidence intervals (intro) | missing | none | AI |
| 6 | Linear algebra for ML: vectors, dot product, matrices | partial | embeddings lesson uses cosine | AI |
| 7 | pandas: DataFrame, filter, groupby, merge, missing values | missing | AI_NEXT lists it as planned | AI |
| 8 | SQL for analysis: select, group by, joins, windows | partial | SQL sheet group, no lesson | AI |
| 9 | Plotting and EDA | missing | none | AI |
| 10 | ML workflow: problem framing, data split, features, baseline, iterate | partial | overfit, crossval touch it | AI |
| 11 | Feature engineering: scaling, one-hot, encoding, missing data | missing | none | AI |
| 12 | Linear regression | covered | gradient | AI |
| 13 | Logistic regression | covered | logistic | AI |
| 14 | k-NN | covered | knn | AI |
| 15 | Decision tree, random forest | partial | tree lesson; forests planned | AI |
| 16 | Naive Bayes, SVM | covered | nbayes, svm | AI |
| 17 | Gradient boosting | covered | gboost | AI |
| 18 | k-means, hierarchical clustering | partial | kmeans only | AI |
| 19 | PCA and dimensionality reduction | covered | pca | AI |
| 20 | Evaluation: accuracy, precision, recall, F1, ROC-AUC | partial | confusion; ROC-AUC and regression metrics missing | AI |
| 21 | Overfitting, bias-variance, regularization, cross-validation | covered | overfit, biasvar, regular, crossval | AI |
| 22 | Neural network basics, backprop, optimizers | partial | backprop; optimizers (momentum, Adam) planned | AI |
| 23 | NLP and embeddings | partial | embeddings, tokens | AI |
| 24 | Deep learning and modern AI (attention, diffusion, RAG, agents) | covered | AI now track, 14 lessons | AI |
| 25 | Time series, recommender, anomaly detection | missing | none | AI |
| 26 | Model deployment and monitoring (MLOps intro) | missing | none | AI |
| 27 | Reinforcement learning intro | missing | none | AI |

## Sources used (all open, topic structure only)
Python docs tutorial and library pages; Java Tutorials "Really Big Index" (trail list); MDN JavaScript Guide chapters; Wikipedia list/outline pages (CC BY-SA, reference only); Open Data Structures by Pat Morin (CC BY, TOC); Algorithms by Jeff Erickson (CC BY 4.0, TOC); OpenDSA home. Details in `links/coverage.md`.
