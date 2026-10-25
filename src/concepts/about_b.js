// About-this-lesson content for the DSA concept lessons (heaps, graphs, math, bits, string matching). Our own writing; facts checked against the sources listed per lesson.
const CONCEPT_ABOUT_B = {
  heap: {
    what: 'A heap is a pile of values where the smallest one is always on top. You can add a value or remove the smallest very quickly. A priority queue is this idea used to serve the most urgent item first.',
    analogy: 'Imagine a hospital waiting room. The nurse always calls the most urgent patient next. New patients are slotted in by urgency without sorting the whole room.',
    uses: ['Picking the next road to try in a route finder', 'Running a task list where urgent jobs go first', 'Sorting a list with heap sort'],
    before: ['arrays', 'trees'],
    words: [
      ['min-heap', 'A tree where every parent is smaller than or equal to its children.'],
      ['max-heap', 'The same idea reversed: every parent is bigger than or equal to its children. Heap sort uses one.'],
      ['root', 'The top of the tree. In a min-heap it holds the smallest value.'],
      ['sift up', 'Swap a value with its parent while it is smaller than that parent.'],
      ['sift down', 'Swap a value with its smaller child while a child is smaller than it.'],
      ['priority queue', 'A line where the item with the best priority leaves first.'],
      ['Big-O', 'A rough count of steps as the input grows. O(log n) grows very slowly.']
    ],
    math: {
      lines: ['\\text{parent}(i) = \\lfloor (i - 1) / 2 \\rfloor', '\\text{push, pop} = O(\\log n)'],
      symbols: [
        ['i', 'the index of an item in the array, counting from 0'],
        ['\\lfloor \\; \\rfloor', 'round down to a whole number'],
        ['n', 'how many items are in the heap'],
        ['\\log n', 'how many times you can halve n before reaching 1; for 1,000 items it is about 10'],
        ['O( )', 'Big-O: the number of steps grows no faster than the value inside']
      ],
      example: [
        'Start with the heap [2, 3, 5]. Push 1. It goes at the end: [2, 3, 5, 1].',
        'The item at index 3 has parent (3 − 1) ÷ 2 = 1, which holds 3. Since 1 is smaller, swap: [2, 1, 5, 3].',
        'Now 1 is at index 1. Its parent is (1 − 1) ÷ 2 = 0, which holds 2. Swap again: [1, 2, 5, 3].',
        'Two swaps for four items. The tree has three levels, so it is two steps tall. A push never takes more swaps than that height.'
      ]
    },
    steps: [
      'Store the tree in a plain array, filled from left to right.',
      'To push, place the new value at the end. Then sift it up until its parent is smaller.',
      'To pop, take the root. Move the last value to the root. Then sift it down.',
      'Peeking at the smallest value only reads the root, so it is one step.'
    ],
    use: ['You often need the smallest or most urgent item, and items keep arriving.', 'You need the top few items without sorting everything.'],
    avoid: ['You need to search for any value, since a heap has no order beyond the top.', 'You need all items in sorted order many times. Sort once instead.'],
    mistakes: [
      'Thinking the array is sorted. Only each parent-child pair is in order.',
      'Mixing up min-heap and max-heap. Python heapq is a min-heap; negate numbers for a max-heap.',
      'Sifting down toward the larger child. Always swap with the smaller child in a min-heap.'
    ],
    cheat: ['parent = (i − 1) // 2  (// divides and drops the leftover)', 'children = 2i + 1 and 2i + 2', 'push: add at end, sift up', 'pop: last to root, sift down', 'import heapq; heapq.heappush(h, 5)'],
    next: ['dijkstra', 'prim'],
    sources: ['Cormen, Leiserson, Rivest, Stein (CLRS), Introduction to Algorithms, 4th ed., ch. 6 (heapsort, priority queues)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 2.4 (priority queues)', 'Python documentation, heapq module']
  },
  graphrep: {
    what: 'A graph is a set of dots joined by lines. The dots are called nodes and the lines are called edges. A program must store a graph in memory, and there are two common ways.',
    analogy: 'Think of a map of friends. You can keep a big table of who knows whom. Or you can give each person a short list of friends.',
    uses: ['Road maps, where towns are nodes and roads are edges', 'Social networks, where people are nodes and friendships are edges', 'Course plans, where an arrow shows which course must come first'],
    before: ['arrays', 'trees'],
    words: [
      ['node', 'One dot in the graph. Also called a vertex.'],
      ['edge', 'A line joining two nodes. It may point one way or both ways.'],
      ['weight', 'A number on an edge, such as a distance or a price.'],
      ['neighbour', 'A node that shares an edge with the node you are looking at.'],
      ['degree', 'How many neighbours a node has.'],
      ['adjacency matrix', 'A square grid of 0s and 1s. A 1 means there is an edge.'],
      ['adjacency list', 'For each node, a short list of its neighbours.']
    ],
    math: {
      lines: ['\\text{matrix space} = O(V^2)', '\\text{list space} = O(V + E)'],
      symbols: [
        ['V', 'the number of nodes'],
        ['E', 'the number of edges'],
        ['O( )', 'Big-O: how the memory used grows as the graph grows'],
        ['V^2', 'V times V, the number of cells in the grid']
      ],
      example: [
        'Take 4 nodes and 3 two-way edges. The matrix has 4 × 4 = 16 cells, and 6 of them hold a 1.',
        'The list version holds 4 lists with 6 neighbour entries in total, so 10 items.',
        'With 1,000 nodes and 2,000 edges, the matrix needs 1,000,000 cells. The lists need about 5,000 items.'
      ]
    },
    steps: [
      'Number the nodes from 0 to V − 1.',
      'For a matrix, make a V by V grid. For each edge from a to b, put a 1 at row a, column b.',
      'For lists, make one list per node and add each neighbour to it.',
      'For two-way edges, record the edge in both directions.'
    ],
    use: ['Use lists when the graph has few edges. Most real graphs do.', 'Use a matrix when the graph is small or you must check one edge very fast.'],
    avoid: ['A matrix for a huge graph with few edges. It wastes memory.', 'Lists when you ask "is there an edge between a and b" a million times.'],
    mistakes: [
      'Forgetting to add the edge in both directions for a two-way graph.',
      'Starting nodes at 1 but using a list that starts at 0.',
      'Using a matrix for a graph with a million nodes. The grid will not fit in memory.'
    ],
    cheat: ['matrix[a][b] = 1 means edge', 'adj[a] = list of neighbours', 'matrix space O(V²)', 'list space O(V + E)', 'adj = [[] for _ in range(V)]'],
    next: ['topo', 'dijkstra', 'kruskal'],
    sources: ['CLRS, Introduction to Algorithms, 4th ed., ch. 20.1 (representations of graphs)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 4.1 (undirected graphs)', 'Knuth, The Art of Computer Programming, vol. 1, sec. 2.3.4 (graph terms)']
  },
  topo: {
    what: 'A topological sort puts tasks in a line so every task comes after the tasks it needs. It works on a graph whose arrows mean "do this first". If tasks wait on each other in a circle, no such line exists.',
    analogy: 'Think of getting dressed. Socks go on before shoes. You may put on a hat at any time. Any order that respects the arrows is fine.',
    uses: ['Choosing the order to build programs that depend on each other', 'Planning which course to take before which', 'Running steps of a data job in a safe order'],
    before: ['graphrep'],
    words: [
      ['directed edge', 'An arrow from one node to another. It goes one way only.'],
      ['in-degree', 'How many arrows point into a node. The lesson says "arrows pointing in".'],
      ['dependency', 'A task that must finish before another can start.'],
      ['cycle', 'A loop of arrows that leads back to where it started.'],
      ['queue', 'A line where the first item in is the first item out.']
    ],
    math: {
      lines: ['\\text{time} = O(V + E)'],
      symbols: [
        ['V', 'the number of tasks (nodes)'],
        ['E', 'the number of arrows (edges)'],
        ['O( )', 'Big-O: how the number of steps grows with the input']
      ],
      example: [
        'Here is a different, smaller example. Tasks: wake, dress, eat. Arrows: wake to dress, wake to eat, dress to eat. So V = 3 and E = 3.',
        'In-degrees: wake 0, dress 1, eat 2. Only wake has 0, so take wake first.',
        'Removing wake lowers dress to 0 and eat to 1. Take dress. Then eat drops to 0, so take eat.',
        'Order: wake, dress, eat. Each task and arrow was handled once, so 3 + 3 = 6 small steps.'
      ]
    },
    steps: [
      'Count the arrows pointing into each task.',
      'Put every task with a count of 0 into a queue.',
      'Take a task from the queue and write it in the answer. Lower the count of each task it points to.',
      'Any task whose count reaches 0 goes into the queue. Repeat until the queue is empty.',
      'If the answer is shorter than the task list, there is a cycle.'
    ],
    use: ['Tasks have "must come first" rules.', 'You must also detect circular rules.'],
    avoid: ['The graph has two-way edges. There is no order to find.', 'You need the shortest route. Use a path algorithm instead.'],
    mistakes: [
      'Expecting one unique answer. Many valid orders can exist.',
      'Forgetting to check for a cycle at the end.',
      'Counting arrows in the wrong direction. Count arrows going in, not out.'
    ],
    cheat: ['count arrows in', 'queue = tasks with 0', 'pop, record, lower neighbours', 'short answer = cycle', 'time O(V + E)'],
    next: ['dijkstra', 'kruskal'],
    sources: ['Kahn, Topological sorting of large networks, Communications of the ACM, 1962', 'CLRS, Introduction to Algorithms, 4th ed., ch. 20.4 (topological sort)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 4.2 (directed graphs)']
  },
  dijkstra: {
    what: 'Dijkstra finds the cheapest route from one start node to every other node. It always finishes the cheapest unfinished node next. It needs every edge cost to be zero or more.',
    analogy: 'Imagine water spreading from a tap along pipes. The nearest places fill first. Once a place is full, no later path can reach it faster.',
    uses: ['Finding the quickest driving route in a map app', 'Sending network data along the cheapest path', 'Finding the shortest path in a game map with different terrain costs'],
    before: ['graphrep', 'heap'],
    words: [
      ['weight', 'The cost on an edge, such as minutes of travel.'],
      ['settled', 'A node whose cheapest cost is final.'],
      ['relax', 'Check whether a route through this node is cheaper, and update if so.'],
      ['min-heap', 'A structure that always hands you the smallest value fast.'],
      ['infinity', 'A stand-in for "no route found yet". Any real cost is smaller.']
    ],
    math: {
      lines: ['\\text{new cost}(v) = \\min(\\text{old cost}(v), \\; \\text{cost}(u) + \\text{edge}(u, v))', '\\text{time} = O((V + E) \\log V)'],
      symbols: [
        ['cost(v)', 'the best known cost from the start to node v'],
        ['u', 'the node you settled last'],
        ['edge(u, v)', 'the cost of the edge from u to v'],
        ['\\min', 'take the smaller of the two values. In words: compare the old cost of v with the cost of u plus the edge cost, and keep the smaller.'],
        ['V, E', 'the number of nodes and the number of edges'],
        ['\\log V', 'the cost of one heap step; it grows very slowly as V grows']
      ],
      example: [
        'Edges: A to B costs 2, A to C costs 7, B to C costs 3. Start at A.',
        'Start: A is 0. B and C are unknown (infinity).',
        'Settle A. B becomes 0 + 2 = 2. C becomes 0 + 7 = 7.',
        'Settle B, the cheapest left. Through B, C would cost 2 + 3 = 5. That is below 7, so C becomes 5.',
        'Settle C at 5. The cheapest route to C is A, B, C, not the direct edge.'
      ]
    },
    steps: [
      'Give the start node cost 0 and every other node cost infinity.',
      'Put the start in a min-heap. Take out the node with the smallest cost.',
      'Mark it settled. For each neighbour, relax the edge.',
      'Push any neighbour whose cost fell. Repeat until the heap is empty.',
      'Save which edge improved each node, so you can read the route back.'
    ],
    use: ['Edge costs are all zero or more.', 'You need the cheapest cost from one start to many places.'],
    avoid: ['Any edge has a negative cost. Use Bellman-Ford.', 'All edges cost the same. A plain breadth-first search is simpler.'],
    mistakes: [
      'Using it with a negative edge. The answer can be wrong without any error.',
      'Settling a node twice. A node can sit in the heap more than once with different costs. Skip an entry that costs more than the best known cost.',
      'Forgetting that unreached nodes still hold infinity when you stop.'
    ],
    cheat: ['settle the cheapest node', 'relax its edges', 'cost = old or d[u] + w', 'no negative edges', 'time O((V + E) log V)'],
    next: ['bellman', 'floyd', 'prim'],
    sources: ['Dijkstra, A note on two problems in connexion with graphs, Numerische Mathematik, 1959', 'CLRS, Introduction to Algorithms, 4th ed., ch. 22.3 (Dijkstra)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 4.4 (shortest paths)']
  },
  bellman: {
    what: 'Bellman-Ford also finds the cheapest routes from one start node. It allows edges with negative cost. It checks every edge again and again, and it can tell you when a never-ending saving loop exists.',
    analogy: 'Imagine asking every neighbour "do you know a cheaper way?" over and over. After enough rounds, the news about the best route has reached everyone.',
    uses: ['Finding routes when some steps give a refund or discount', 'Spotting a loop of trades that always gains money, which is a negative cycle', 'Routing in networks where costs can drop'],
    before: ['graphrep', 'dijkstra'],
    words: [
      ['negative edge', 'An edge with a cost below zero, like a refund.'],
      ['relax', 'Check whether a route through an edge is cheaper, and update if so.'],
      ['round', 'One full pass over every edge in the graph.'],
      ['negative cycle', 'A loop whose total cost is below zero. You could go round forever and keep saving.'],
      ['Big-O', 'A rough count of steps as the input grows.']
    ],
    math: {
      lines: ['\\text{rounds} = V - 1', '\\text{time} = O(V \\cdot E)'],
      symbols: [
        ['V', 'the number of nodes'],
        ['E', 'the number of edges'],
        ['\\cdot', 'multiply'],
        ['O( )', 'Big-O: the steps grow no faster than the value inside']
      ],
      example: [
        'Here is a different, smaller example. Edges: S to A costs 2, S to B costs 5, B to A costs −4. There are V = 3 nodes, so 2 rounds are enough.',
        'Start: S is 0. A and B are infinity.',
        'Round 1 (in the order listed): A becomes 2. B becomes 5. Then B to A gives 5 − 4 = 1, so A becomes 1.',
        'Round 2 changes nothing. A is 1, which beats the direct edge of 2.',
        'Two rounds of 3 edges is 6 edge checks, close to V × E.'
      ]
    },
    steps: [
      'Set the start cost to 0 and all others to infinity.',
      'Repeat V − 1 times: go through every edge and relax it.',
      'Run one more round as a test.',
      'If any cost still falls in that last round, a negative cycle exists.',
      'Otherwise the costs are final.'
    ],
    use: ['Some edges have negative cost.', 'You must detect a loop that keeps lowering the cost.'],
    avoid: ['All costs are zero or more. Dijkstra is much faster.', 'The graph is huge. O(V × E) can be too slow.'],
    mistakes: [
      'Running only V − 2 rounds, which can leave some costs too high.',
      'Relaxing from a node that is still infinity. Skip it, or the sums become meaningless.',
      'Reading costs as final when a negative cycle exists. Check the extra round.'
    ],
    cheat: ['repeat V − 1 times', 'for each edge: relax', 'one extra round tests the loop', 'negative edges allowed', 'time O(V × E)'],
    next: ['floyd', 'dijkstra'],
    sources: ['Bellman, On a routing problem, Quarterly of Applied Mathematics, 1958', 'Ford, Network flow theory, RAND report P-923, 1956', 'CLRS, Introduction to Algorithms, 4th ed., ch. 22.1 (Bellman-Ford)']
  },
  floyd: {
    what: 'Floyd-Warshall finds the cheapest route between every pair of nodes. It keeps a table of costs. Each node in turn acts as a stop on the way. After every node has had a turn, the table is final.',
    analogy: 'Think of an airline route chart. You ask: could flying through this city be cheaper for any pair? You ask it for each city in turn.',
    uses: ['Building a table of distances between all cities', 'Checking which nodes can reach which in a network', 'Finding the most central node by total distance'],
    before: ['graphrep', 'bellman'],
    words: [
      ['all pairs', 'Every start node paired with every end node.'],
      ['intermediate node', 'A stop in the middle of a route.'],
      ['table', 'A grid where row a, column b holds the best known cost from a to b.'],
      ['Big-O', 'A rough count of steps as the input grows. O(V³) means V times V times V.']
    ],
    math: {
      lines: ['\\text{new } d[i][j] = \\min(\\text{old } d[i][j], \\; d[i][k] + d[k][j])', '\\text{time} = O(V^3), \\quad \\text{space} = O(V^2)'],
      symbols: [
        ['d[i][j]', 'the best known cost from node i to node j'],
        ['k', 'the node we now allow as a stop'],
        ['\\min', 'take the smaller of the two values. In words: the new cost from i to j is the smaller of the old cost and (cost i to k + cost k to j).'],
        ['V', 'the number of nodes'],
        ['V^3', 'V times V times V, from three loops inside each other']
      ],
      example: [
        'Here is a different, smaller example. Nodes 1, 2, 3. Direct costs: 1 to 2 is 4, 2 to 3 is 1, 1 to 3 is 9.',
        'Allow node 2 as a stop. Check 1 to 3: d[1][2] + d[2][3] = 4 + 1 = 5.',
        '5 is below 9, so the cost from 1 to 3 becomes 5.',
        'For V = 3 the loops make at most 3 × 3 × 3 = 27 checks. For V = 100 it is 1,000,000.'
      ]
    },
    steps: [
      'Fill the table with the direct edge costs. Use infinity where no edge exists. Use 0 where a node goes to itself (the diagonal, top left to bottom right).',
      'Pick each node k in turn as the allowed stop.',
      'For every pair i and j, compare the old cost with the cost through k.',
      'Keep the smaller one.',
      'When all nodes have been used as k, the table is complete.'
    ],
    use: ['You need costs between all pairs, and the graph is small.', 'The graph has negative edges but no negative cycle.'],
    avoid: ['The graph has thousands of nodes. V³ steps is too slow.', 'You need only one start node. Dijkstra is faster.'],
    mistakes: [
      'Putting the k loop inside the i and j loops. The k loop must be the outer one.',
      'In languages with fixed-size numbers, adding two huge stand-ins for infinity can go past the largest number. Check for infinity before adding.',
      'Forgetting to set the cost from a node to itself (the diagonal) to 0.'
    ],
    cheat: ['for k: for i: for j', 'd[i][j] = min(d[i][j], d[i][k] + d[k][j])', 'k is the outer loop', 'time O(V³), space O(V²)', 'all pairs at once'],
    next: ['dijkstra', 'kruskal'],
    sources: ['Floyd, Algorithm 97: Shortest path, Communications of the ACM, 1962', 'Warshall, A theorem on Boolean matrices, Journal of the ACM, 1962', 'CLRS, Introduction to Algorithms, 4th ed., ch. 23.2 (Floyd-Warshall)']
  },
  kruskal: {
    what: 'A spanning tree joins every node of a graph using no loops. Kruskal builds the cheapest one. It takes edges from cheapest to most expensive and skips any edge that would close a loop.',
    analogy: 'Imagine laying cables to connect villages. You start with the cheapest cable. You skip any cable that links two villages already joined.',
    uses: ['Laying the cheapest cable or pipe network between sites', 'Grouping similar items into clusters', 'Building a road plan that connects all towns at least cost'],
    before: ['graphrep', 'bigo'],
    words: [
      ['spanning tree', 'A set of edges joining all nodes with no loop.'],
      ['minimum spanning tree', 'The spanning tree with the smallest total cost.'],
      ['cycle', 'A loop of edges that returns to its starting node.'],
      ['union-find', 'A tool that tracks groups and tells you quickly if two nodes share a group.'],
      ['set', 'A group of nodes already joined together.'],
      ['dense', 'A graph with many edges compared with its nodes.'],
      ['forest', 'Several separate trees. You get one when the graph has parts that are not joined.']
    ],
    math: {
      lines: ['\\text{edges in tree} = V - 1', '\\text{time} = O(E \\log E)'],
      symbols: [
        ['V', 'the number of nodes'],
        ['E', 'the number of edges'],
        ['E \\log E', 'sorting E edges takes about this many steps. log E is how many times you can halve E.'],
        ['O( )', 'Big-O: the steps grow no faster than the value inside']
      ],
      example: [
        'Use the lesson graph: 6 nodes. Sorted edges: AD 1, CE 1, AB 2, DB 3, BE 3, EF 3, then BC 5, CF 6, DE 7.',
        'Take AD (1), CE (1) and AB (2). Each one joins two different groups.',
        'DB (3): D and B are already in one group, {A, B, D}. Skip it: it makes a loop.',
        'Take BE (3), which joins {A, B, D} with {C, E}. Take EF (3), which adds F.',
        'Now there are V − 1 = 5 edges. Total cost 1 + 1 + 2 + 3 + 3 = 10.'
      ]
    },
    steps: [
      'Sort all edges by cost, cheapest first.',
      'Start with every node in a group of its own.',
      'Look at the next edge. If its two ends are in different groups, keep it and merge the groups.',
      'If they are already in one group, skip the edge.',
      'Stop once you have V − 1 edges.'
    ],
    use: ['You need the cheapest way to connect everything.', 'The graph has few edges compared with its nodes.'],
    avoid: ['You need the cheapest route between two nodes. That is a different problem.', 'The graph is dense (E close to V × V). Prim with a plain array can then be faster.'],
    mistakes: [
      'Checking for loops by searching the graph each time. Use union-find instead.',
      'Forgetting that a graph with separate parts gives a forest, not one tree.',
      'Mixing this up with shortest paths. The tree total is not a route cost.'
    ],
    cheat: ['sort edges by cost', 'skip edges that close a loop', 'union-find tells you fast', 'stop at V − 1 edges', 'edges.sort(key=lambda e: e[2])'],
    next: ['prim', 'dijkstra'],
    sources: ['Kruskal, On the shortest spanning subtree of a graph and the traveling salesman problem, Proc. AMS, 1956', 'CLRS, Introduction to Algorithms, 4th ed., ch. 21 and 21.2 (minimum spanning trees, Kruskal)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 4.3']
  },
  prim: {
    what: 'Prim also builds the cheapest tree that joins every node. It grows one tree outward from a start node. At each step it adds the cheapest edge that leaves the tree.',
    analogy: 'Imagine a growing garden. You always plant the cheapest next path that leads from the garden to a new spot.',
    uses: ['Planning a cheap network that reaches every office', 'Building maze layouts in games', 'Connecting sensors with the least wire'],
    before: ['heap', 'kruskal'],
    words: [
      ['minimum spanning tree', 'A set of edges joining all nodes with the smallest total cost and no loop.'],
      ['frontier', 'The edges that leave the tree and lead to nodes not yet in it.'],
      ['min-heap', 'A structure that gives you the smallest value fast.'],
      ['dense', 'A graph with many edges compared with its nodes.']
    ],
    math: {
      lines: ['\\text{time} = O(E \\log V)'],
      symbols: [
        ['E', 'the number of edges'],
        ['V', 'the number of nodes'],
        ['\\log V', 'the cost of one heap step; it grows very slowly'],
        ['O( )', 'Big-O: the steps grow no faster than the value inside']
      ],
      example: [
        'Use the lesson graph, starting at A. Frontier: AB (2) and AD (1). Cheapest is AD. Add D.',
        'Frontier now: AB (2), DB (3) and DE (7). Cheapest is AB. Add B.',
        'Frontier now: BE (3), BC (5) and DE (7). DB is dropped: both ends are in the tree. Cheapest is BE. Add E.',
        'Frontier now: CE (1), EF (3), BC (5). Add C with CE, then F with EF.',
        'Total cost 1 + 2 + 3 + 1 + 3 = 10, the same as Kruskal gets.'
      ]
    },
    steps: [
      'Pick any start node and mark it as in the tree.',
      'Put its edges into a min-heap.',
      'Take the cheapest edge. If it leads to a new node, add the edge and the node.',
      'Push the new node edges into the heap.',
      'Repeat until every node is in the tree.'
    ],
    use: ['You need the cheapest way to connect everything.', 'You already store the graph as neighbour lists.'],
    avoid: ['The graph has two separate parts. One run only reaches one part.', 'The graph is dense and stored as a matrix. A plain-array Prim, about V × V steps, can beat the heap version.'],
    mistakes: [
      'Adding an edge whose far end is already in the tree. Skip it.',
      'Confusing it with Dijkstra. Prim compares edge costs, not costs from the start.',
      'Forgetting the heap and scanning all edges every time, which is slow.'
    ],
    cheat: ['grow one tree', 'take cheapest leaving edge', 'skip edges to nodes already in', 'heap of edges', 'time O(E log V)'],
    next: ['kruskal', 'dijkstra'],
    sources: ['Prim, Shortest connection networks and some generalizations, Bell System Technical Journal, 1957', 'CLRS, Introduction to Algorithms, 4th ed., ch. 21.2 (Prim)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 4.3']
  },
  gcd: {
    what: 'The greatest common divisor of two numbers is the biggest number that divides both with nothing left over. Euclid found a fast way to get it. You keep replacing the pair with the smaller number and a remainder.',
    analogy: 'Imagine tiling a floor with square tiles. You want the biggest square tile that fits both sides exactly, with no cutting.',
    uses: ['Reducing a fraction like 48/18 to its simplest form', 'Finding when two repeating cycles line up again', 'Checking if two numbers share any factor, which matters in secret codes (cryptography)'],
    before: ['bigo'],
    words: [
      ['divisor', 'A number that divides another with nothing left over.'],
      ['remainder', 'What is left after dividing. 17 divided by 5 leaves 2.'],
      ['mod', 'The remainder operator. In Python, 17 % 5 is 2.'],
      ['coprime', 'Two numbers whose only shared divisor is 1.'],
      ['lcm', 'The least common multiple: the smallest number that both numbers divide into. It is a × b ÷ gcd.'],
      ['Big-O', 'A rough count of steps as the input grows.']
    ],
    math: {
      lines: ['\\gcd(a, b) = \\gcd(b, \\; a \\bmod b)', '\\gcd(a, 0) = a', '\\text{steps} = O(\\log \\min(a, b))'],
      symbols: [
        ['a, b', 'the two numbers, with a at least as big as b'],
        ['a \\bmod b', 'the remainder when a is divided by b'],
        ['\\gcd', 'the greatest common divisor'],
        ['\\log', 'how many times you can halve a number; it grows very slowly']
      ],
      example: [
        'Find gcd(48, 18).',
        '48 = 2 × 18 + 12, so the remainder is 12. Now find gcd(18, 12).',
        '18 = 1 × 12 + 6, so the remainder is 6. Now find gcd(12, 6).',
        '12 = 2 × 6 + 0, so the remainder is 0. Stop.',
        'The last non-zero remainder is 6. So gcd(48, 18) = 6.'
      ]
    },
    steps: [
      'Take two numbers a and b.',
      'Divide a by b and keep the remainder.',
      'Replace the pair (a, b) with (b, remainder).',
      'Repeat until the remainder is 0.',
      'The last non-zero number is the answer.'
    ],
    use: ['You need to simplify a fraction.', 'You need the least common multiple (lcm): the smallest number both divide into. It is a × b ÷ gcd.'],
    avoid: ['Checking every number up to the smaller one. That is much slower.', 'Using it for more than two numbers at once. Apply it to pairs in turn.'],
    mistakes: [
      'Stopping when the remainder is 1. Only stop at 0.',
      'Dividing the wrong way round. Divide the bigger by the smaller, or let the first step swap them.',
      'Forgetting gcd(a, 0) = a.'
    ],
    cheat: ['gcd(a, b) = gcd(b, a % b)', 'stop when b is 0', 'lcm = a * b // gcd', 'import math; math.gcd(48, 18)', 'steps O(log n)'],
    next: ['sieve', 'modarith', 'modinv'],
    sources: ['Euclid, Elements, Book VII, propositions 1 and 2', 'Knuth, The Art of Computer Programming, vol. 2, sec. 4.5.2', 'Python documentation, math.gcd']
  },
  sieve: {
    what: 'The sieve finds every prime number up to a limit. A prime is a number above 1 whose only divisors are 1 and itself. You cross out multiples of each prime, and the numbers left standing are prime.',
    analogy: 'Imagine a row of numbered cards. You take a prime and flip every card that is a multiple of it. The cards still face up are prime.',
    uses: ['Making a list of primes for number puzzles', 'Finding the smallest prime factor of many numbers quickly', 'Counting how many primes there are below a limit'],
    before: ['arrays', 'bigo'],
    words: [
      ['prime', 'A number above 1 that only 1 and itself divide.'],
      ['multiple', 'A number you get by multiplying another number by 1, 2, 3 and so on.'],
      ['composite', 'A number above 1 that is not prime.'],
      ['square root', 'A number that gives n when multiplied by itself. The square root of 49 is 7.'],
      ['Big-O', 'A rough count of steps as the input grows.']
    ],
    math: {
      lines: ['\\text{start crossing at } p \\times p', '\\text{stop when } p \\times p > n', '\\text{time: a little more than one pass over the numbers}'],
      symbols: [
        ['p', 'the prime whose multiples you are crossing out'],
        ['n', 'the largest number you want to check']
      ],
      example: [
        'Find primes up to 30. Start with 2 to 30 all marked as prime.',
        'p = 2: cross out 4, 6, 8 and so on up to 30.',
        'p = 3: cross out 9, 12, 15, 18, 21, 24, 27, 30.',
        'p = 5: cross out 25. Next p would be 7, but 7 × 7 = 49 is above 30, so stop.',
        'Left standing: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. That is 10 primes.'
      ]
    },
    steps: [
      'Make a list of true flags for the numbers 2 up to n.',
      'Find the next number still marked true. It is prime.',
      'Mark its multiples as false, starting from its square.',
      'Stop once the prime squared is above n.',
      'Every number still true is prime.'
    ],
    use: ['You need all primes up to a limit, such as one million.', 'You need to test many numbers for primality.'],
    avoid: ['Testing one huge number. Trial division or a primality test fits better.', 'The limit is too large for memory. Use a segmented sieve.'],
    mistakes: [
      'Starting at 2p instead of p × p. It still works but wastes time.',
      'Marking 0 and 1 as prime. They are not.',
      'Making the list one item too short, so n itself is missed.'
    ],
    cheat: ['flags = [True] * (n + 1)', 'for p up to √n', 'cross out p*p, p*p+p, ...', 'true left = prime', 'time: a little more than one pass over the numbers'],
    next: ['gcd', 'modarith'],
    sources: ['Nicomachus, Introduction to Arithmetic (earliest account of the sieve of Eratosthenes)', 'Knuth, The Art of Computer Programming, vol. 2, sec. 4.5.4', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 1.1 (primality sieve exercises)']
  },
  modarith: {
    what: 'Modular arithmetic keeps only the remainder after dividing by a fixed number. The numbers start again at 0 after m, like hours on a clock. It keeps numbers small, which stops them from growing too big.',
    analogy: 'On a 12-hour clock, 10 o\'clock plus 5 hours is 3 o\'clock. You went past 12 and started again. That restart is the mod.',
    uses: ['Keeping answers small, such as "answer mod 1,000,000,007"', 'Making a hash table pick a slot', 'Working out which day of the week a date falls on'],
    before: ['gcd'],
    words: [
      ['remainder', 'What is left after dividing one number by another. 17 ÷ 5 is 3 with 2 left over.'],
      ['mod', 'Short for modulo. a mod m is the remainder of a divided by m. So "mod", "modulo" and "remainder" all point to the same idea.'],
      ['modulus', 'The number m you divide by. All answers land from 0 up to m − 1.']
    ],
    math: {
      lines: ['(a + b) \\bmod m = ((a \\bmod m) + (b \\bmod m)) \\bmod m', '(a \\times b) \\bmod m = ((a \\bmod m) \\times (b \\bmod m)) \\bmod m'],
      symbols: [
        ['a, b', 'the two numbers you add or multiply'],
        ['m', 'the modulus: values start again at 0 after m − 1'],
        ['\\bmod', 'take the remainder after dividing']
      ],
      example: [
        'Let m = 7. Compute (45 × 38) mod 7.',
        '45 mod 7 = 3, because 45 = 6 × 7 + 3. And 38 mod 7 = 3, because 38 = 5 × 7 + 3.',
        'Multiply the small numbers: 3 × 3 = 9. Then 9 mod 7 = 2.',
        'Check the long way: 45 × 38 = 1,710. And 1,710 = 244 × 7 + 2. The remainder is 2 as well.'
      ]
    },
    steps: [
      'Pick a modulus m.',
      'After each add or multiply, replace the result with its remainder mod m.',
      'For subtraction, add m before taking the remainder, so the answer is not negative.',
      'For division, multiply by a modular inverse instead.'
    ],
    use: ['The real answer is huge and a remainder is asked for.', 'You need numbers that start again from 0, such as days of the week.'],
    avoid: ['You need the exact big number. A remainder throws information away.', 'You need plain division. Use the inverse method.'],
    mistakes: [
      'Dividing with a normal slash under a mod. The rule does not hold for division.',
      'Getting a negative answer after subtraction in a language like C. Add m, then take the mod.',
      'Taking the mod only at the end. The middle numbers get huge and slow. In C or Java they can even overflow: pass the largest number the language stores.'
    ],
    cheat: ['a % m', '(a + b) % m = ((a % m) + (b % m)) % m', 'multiply works the same way', 'subtract: (a − b + m) % m', 'divide: use an inverse'],
    next: ['fastpow', 'modinv', 'ncr'],
    sources: ['Gauss, Disquisitiones Arithmeticae, 1801 (congruences)', 'Knuth, The Art of Computer Programming, vol. 2, sec. 4.3.2', 'Python documentation, the % operator and built-in pow']
  },
  fastpow: {
    what: 'Fast power computes a number raised to a large power with very few multiplications. It squares the base again and again. Then it multiplies in the squares that the binary digits of the exponent ask for.',
    analogy: 'To walk 13 steps you can take a 1-step, a 4-step and an 8-step. Fewer big strides beat many small ones.',
    uses: ['Computing huge powers under a mod, as in secret codes (cryptography)', 'Finding a modular inverse with a prime modulus', 'Raising a matrix, a grid of numbers, to a large power. That can find a far-off Fibonacci number fast'],
    before: ['modarith'],
    words: [
      ['exponent', 'The small raised number. In 3^13 the exponent is 13.'],
      ['binary', 'Writing numbers with only 0s and 1s. Each place is worth twice the one on its right, so 13 is 1101: 8 + 4 + 0 + 1.'],
      ['bit', 'One binary digit, a 0 or a 1.'],
      ['shift right', 'Halve a whole number and drop the leftover. 13 shifted right by one bit is 6.'],
      ['mod', 'The remainder after dividing by a fixed number.'],
      ['Big-O', 'A rough count of steps as the input grows.']
    ],
    math: {
      lines: ['a^{13} = a^8 \\cdot a^4 \\cdot a^1 \\quad (13 = 8 + 4 + 1)', '\\text{multiply the squares that match the 1 bits}', '\\text{multiplications} \\le 2 \\log_2 n'],
      symbols: [
        ['a', 'the base number'],
        ['n', 'the exponent'],
        ['\\cdot', 'multiply'],
        ['a^{2^i}', 'a squared i times: a, a², a⁴, a⁸ and so on'],
        ['\\log_2 n', 'how many times you halve n to reach 1; it is about the number of bits in n']
      ],
      example: [
        'Here is a different, smaller example. Compute 3^13 mod 7. In binary 13 is 1101, so 13 = 8 + 4 + 1.',
        'Squares mod 7: 3^1 = 3. 3^2 = 9 mod 7 = 2. 3^4 = 2 × 2 = 4. 3^8 = 4 × 4 = 16 mod 7 = 2.',
        'Pick the squares for the 1 bits: 3^1, 3^4 and 3^8. That is 3, 4 and 2.',
        'Multiply them, taking the mod each time: 3 × 4 = 12 mod 7 = 5. Then 5 × 2 = 10 mod 7 = 3.',
        'So 3^13 mod 7 = 3. We used about 6 multiplications, not 12.'
      ]
    },
    steps: [
      'Start with the result 1 and the base a.',
      'Look at the lowest bit of the exponent. If it is 1, multiply the result by the base.',
      'Square the base. Halve the exponent and drop the leftover (a shift right by one bit).',
      'Repeat until the exponent is 0.',
      'Take the mod after every multiply.'
    ],
    use: ['The exponent is large, such as a billion.', 'You need a power mod a number.'],
    avoid: ['The exponent is tiny. A plain loop is as good.', 'You need all powers 1, 2, 3 and so on. Build them one by one.'],
    mistakes: [
      'Forgetting the mod after squaring, so the base grows huge.',
      'Starting the result at 0 instead of 1.',
      'Using pow(a, n) % m on huge numbers. Use pow(a, n, m), which is fast.'
    ],
    cheat: ['n odd: result *= a', 'a *= a, n >>= 1', 'loop until n is 0', 'mod after each multiply', 'pow(3, 13, 7)'],
    next: ['modinv', 'ncr'],
    sources: ['Knuth, The Art of Computer Programming, vol. 2, sec. 4.6.3 (evaluation of powers)', 'CLRS, Introduction to Algorithms, 4th ed., ch. 31.6 (raising to a power with repeated squaring)', 'Python documentation, built-in pow with three arguments']
  },
  modinv: {
    what: 'A modular inverse lets you divide under a mod. The inverse of a is the number that turns a into 1 when multiplied, with the mod applied. To divide by a, you multiply by its inverse.',
    analogy: 'On a clock with 11 hours, multiplying by 3 and then by 4 brings you back to 1. So 4 undoes 3.',
    uses: ['Dividing in answers that must be given mod a prime', 'Computing nCr mod a prime with factorials', 'Solving equations in simple codes'],
    before: ['gcd', 'modarith', 'fastpow'],
    words: [
      ['inverse', 'The partner number that gives 1 when multiplied by a, mod m.'],
      ['prime', 'A number above 1 that only 1 and itself divide.'],
      ['coprime', 'Two numbers that share no divisor except 1.'],
      ['Fermat\'s little theorem', 'A known rule: for a prime p and a not divisible by p, a^(p−1) mod p equals 1.']
    ],
    math: {
      lines: ['a^{-1} \\equiv a^{p-2} \\pmod p', 'a \\times a^{-1} \\equiv 1 \\pmod p'],
      symbols: [
        ['a', 'the number you want to divide by'],
        ['p', 'a prime modulus'],
        ['a^{-1}', 'the inverse of a'],
        ['\\equiv', 'has the same remainder as'],
        ['\\pmod p', 'all remainders are taken after dividing by p']
      ],
      example: [
        'Find the inverse of 3 mod 11. Use the formula: 3^9 mod 11.',
        '3^2 = 9. 3^4 = 81 mod 11 = 4. 3^8 = 16 mod 11 = 5. And 3^9 = 5 × 3 = 15 mod 11 = 4.',
        'Check: 3 × 4 = 12, and 12 mod 11 = 1. So the inverse is 4.',
        'Now 8 ÷ 3 mod 11 becomes 8 × 4 = 32, and 32 mod 11 = 10.'
      ]
    },
    steps: [
      'Check that a and the modulus share no divisor except 1.',
      'For a prime modulus p, compute a to the power p − 2 with fast power.',
      'This value is the inverse.',
      'To divide x by a, multiply x by the inverse and take the mod.',
      'For a non-prime modulus, use a longer method called extended Euclid (not in this course).'
    ],
    use: ['You must divide under a mod.', 'The modulus is prime, so Fermat\'s method is quick.'],
    avoid: ['The modulus is not prime. Use the longer method called extended Euclid.', 'a is a multiple of the modulus. No inverse exists.'],
    mistakes: [
      'Using the Fermat method with a non-prime modulus. The answer is wrong.',
      'Trying to invert 0 or a multiple of the modulus.',
      'Dividing normally and then taking the mod. That is not the same.'
    ],
    cheat: ['inv = pow(a, p − 2, p)', 'works when p is prime', 'a * inv % p == 1', 'divide: x * inv % p', 'else: a longer method (extended Euclid)'],
    next: ['ncr', 'fastpow'],
    sources: ['Hardy and Wright, An Introduction to the Theory of Numbers, ch. 6 (Fermat\'s little theorem)', 'CLRS, Introduction to Algorithms, 4th ed., ch. 31.4 (solving modular linear equations)', 'Python documentation, pow(base, -1, mod) and pow with three arguments']
  },
  ncr: {
    what: 'nCr counts the ways to choose r items from n items when the order does not matter. Pascal\'s triangle lists all these counts. Each number in it is the sum of the two numbers above it.',
    analogy: 'You pick 2 friends from 4 to go to a film. Choosing Ana then Ben is the same group as Ben then Ana.',
    uses: ['Counting possible teams or hands of cards', 'Finding the chance of events in probability', 'Counting paths on a grid that move only right and down'],
    before: ['arrays', 'modarith'],
    words: [
      ['combination', 'A choice of items where the order does not matter.'],
      ['factorial', 'n! means n × (n − 1) × (n − 2) and so on, down to 1. So 4! is 24.'],
      ['Pascal\'s triangle', 'A triangle of numbers where each is the sum of the two above it.'],
      ['subset', 'Any group of items taken from a bigger group.']
    ],
    math: {
      lines: ['\\text{nCr} = \\frac{n!}{r! \\, (n - r)!}', '\\text{nCr} = \\text{(n−1)C(r−1)} + \\text{(n−1)Cr}'],
      symbols: [
        ['n', 'how many items you choose from'],
        ['r', 'how many items you choose'],
        ['n!', 'n factorial: multiply all whole numbers from 1 up to n'],
        ['nCr', 'the number of ways to choose r items from n items']
      ],
      example: [
        'Find 6C2. The formula gives 6! ÷ (2! × 4!) = 720 ÷ (2 × 24) = 15.',
        'With the triangle: row 5 reads 1, 5, 10, 10, 5, 1. The entry 6C2 is 5 + 10 = 15.',
        'Both ways give 15, so there are 15 ways to pick 2 items from 6.'
      ]
    },
    steps: [
      'Write row 0 as only a 1.',
      'Start each new row with 1.',
      'Make each middle entry the sum of the two entries above it.',
      'End each row with 1.',
      'Entry r in row n counts the ways to choose r from n.'
    ],
    use: ['You count groups where order does not matter.', 'You need a few small values, so a table is fast.'],
    avoid: ['You need one huge nCr mod a prime. Use factorials with modular inverses.', 'Order matters. Then count arrangements, called permutations: there are r! times as many.'],
    mistakes: [
      'Counting arrangements instead of groups, which gives a number too large by r!.',
      'Computing n! directly for large n. The number gets huge, and in C or Java it can overflow. Use the triangle or a mod.',
      'Starting rows and entries from 1 when the formula counts from 0.'
    ],
    cheat: ['nCr = n! / (r! (n − r)!)', 'nCr = nC(n − r)', 'triangle: sum the two above', 'row n sums to 2ⁿ', 'import math; math.comb(6, 2)'],
    next: ['inclexcl', 'modinv'],
    sources: ['Pascal, Traité du triangle arithmétique, 1665', 'Knuth, The Art of Computer Programming, vol. 1, sec. 1.2.6 (binomial coefficients)', 'Python documentation, math.comb']
  },
  inclexcl: {
    what: 'Inclusion-exclusion counts items in the union of several groups without counting overlaps twice. You add the group sizes, then subtract the overlaps. You then add back what you removed too many times, and so on.',
    analogy: 'Two clubs share some members. If you add both member lists, shared members count twice. Subtract the shared ones once to fix it.',
    uses: ['Counting numbers that divide by at least one of several values', 'Counting the ways to arrange items with some forbidden', 'Finding how many numbers up to n share no factor with n'],
    before: ['ncr'],
    words: [
      ['set', 'A group of items.'],
      ['lcm', 'The least common multiple: the smallest number that two numbers both divide into. For 2 and 3 it is 6.'],
      ['union', 'All items that are in at least one of the groups.'],
      ['intersection', 'Items that are in two or more of the groups at once.'],
      ['overlap', 'Items counted twice because they sit in more than one group.']
    ],
    math: {
      lines: ['|A \\cup B| = |A| + |B| - |A \\cap B|', '|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |A \\cap C| - |B \\cap C| + |A \\cap B \\cap C|'],
      symbols: [
        ['A, B, C', 'the groups of items'],
        ['|A|', 'how many items group A holds'],
        ['\\cup', 'union: items in any of the groups'],
        ['\\cap', 'intersection: items in all of the groups named']
      ],
      example: [
        'How many numbers from 1 to 30 divide by 2 or by 3?',
        'Multiples of 2: 30 ÷ 2 = 15. Multiples of 3: 30 ÷ 3 = 10.',
        'Multiples of both are multiples of 6: 30 ÷ 6 = 5.',
        '15 + 10 − 5 = 20. We counted 20 numbers without listing them.'
      ]
    },
    steps: [
      'Count each group alone and add the counts.',
      'Subtract the size of every overlap of two groups.',
      'Add back the size of every overlap of three groups.',
      'Keep alternating the sign as the overlaps get bigger.',
      'The final sum is the size of the union.'
    ],
    use: ['You count items that meet at least one of several rules.', 'Counting the opposite is easier: all items minus the union.'],
    avoid: ['There are too many groups. The overlaps number 2 to the power of the group count.', 'The groups never overlap. Add their sizes directly.'],
    mistakes: [
      'Stopping after subtracting the pairs. The triple overlaps then count too little.',
      'Using the wrong sign. Odd-sized overlaps add and even-sized ones subtract.',
      'Using a × b as the overlap of two multiples. You need the lcm, the smallest number both divide into. For 4 and 6 it is 12, not 24.'
    ],
    cheat: ['add singles', 'subtract pairs', 'add triples', 'signs alternate', 'overlap of multiples = n // lcm (n // k is n ÷ k, dropping the leftover)'],
    next: ['ncr', 'modinv'],
    sources: ['Rosen, Discrete Mathematics and Its Applications, ch. 8.5 (inclusion-exclusion)', 'Knuth, The Art of Computer Programming, vol. 1, sec. 1.3.3', 'CLRS, Introduction to Algorithms, 4th ed., appendix C (counting and probability)']
  },
  bits: {
    what: 'Bit tricks work directly on the 0s and 1s that store a number. A few small operations change or test many bits at once. They are fast and use no extra memory.',
    analogy: 'Think of a row of light switches. Each switch is a bit. You can flip one, turn one off, or check which are on.',
    uses: ['Storing a set of yes-or-no flags in one number', 'Checking if a number is a power of two', 'Counting how many switches are on'],
    before: ['arrays'],
    words: [
      ['bit', 'One binary digit, either 0 or 1. A number is a row of bits, each place worth twice the one on its right.'],
      ['AND (&)', 'Gives 1 only where both bits are 1.'],
      ['OR (|)', 'Gives 1 where at least one bit is 1.'],
      ['XOR (^)', 'Gives 1 where the two bits differ.'],
      ['shift (<<, >>)', 'Slide all bits left or right. Left by one doubles the number.'],
      ['mask', 'A number with chosen bits set, used to pick or change those bits.'],
      ['NOT (~)', 'Flips every bit: each 1 becomes 0 and each 0 becomes 1.'],
      ['bit position', 'Bits are counted from 0 at the right. Bit 4 is the place worth 16.']
    ],
    math: {
      lines: ['x \\,\\&\\, (x - 1) \\text{ clears the lowest 1 bit}', 'x \\,\\&\\, (-x) \\text{ keeps only the lowest 1 bit}'],
      symbols: [
        ['x', 'the number being tested'],
        ['\\&', 'AND, bit by bit'],
        ['x - 1', 'x minus one, which flips the lowest 1 bit and every 0 below it'],
        ['-x', 'x with every bit flipped, plus 1. It shares only the lowest 1 bit with x']
      ],
      example: [
        'Take x = 44. In binary that is 101100.',
        'Then 43 is 101011. AND the two: 101100 & 101011 = 101000, which is 40.',
        'The lowest 1 bit is gone. Repeat on 40, then 32, then 0: three rounds, so 44 has 3 set bits.',
        'The lowest bit alone: 44 & −44 = 4, since 4 is binary 100.'
      ]
    },
    steps: [
      'Write the number in binary to see its bits.',
      'Build a mask with 1 << i to point at bit i.',
      'Use OR to set a bit. Use AND with the NOT of the mask to clear it. Use XOR to flip it.',
      'Use AND with a mask to test a bit.',
      'Use x & (x − 1) to remove the lowest set bit.'
    ],
    use: ['You keep many yes-or-no flags in one number.', 'You need fast power-of-two checks, or to tell odd from even with x & 1.'],
    avoid: ['Clarity matters more than speed. A plain list can read better.', 'Numbers that are not whole. Bit tricks apply to whole numbers.'],
    mistakes: [
      'Mixing up & with and, or | with or. They work on bits, not on true and false.',
      'Forgetting that bit positions count from 0 on the right.',
      'Shifting by more bits than the number holds, in a language such as C or Java where numbers have a fixed size.'
    ],
    cheat: ['set: x | (1 << i)', 'clear: x & ~(1 << i)', 'flip: x ^ (1 << i)', 'test: (x >> i) & 1', 'power of two: x > 0 and x & (x − 1) == 0'],
    next: ['fastpow', 'modarith'],
    sources: ['Warren, Hacker\'s Delight, 2nd ed., ch. 2 (basics) and ch. 5 (counting bits)', 'Knuth, The Art of Computer Programming, vol. 4A, sec. 7.1.3 (bitwise tricks)', 'Python documentation, bitwise operations on integers']
  },
  kmp: {
    what: 'KMP finds a short word, the pattern, inside a long text. It never reads the same letter of the text twice. After a mismatch, it uses a table to know how much of the pattern still matches.',
    analogy: 'You search a book for a word and spot a wrong letter. You do not restart. You remember how far the match had got and carry on.',
    uses: ['Finding a word in a document', 'Searching a DNA string for a short gene', 'Spotting a repeated block inside a long string'],
    before: ['strings'],
    words: [
      ['pattern', 'The short string you want to find.'],
      ['text', 'The long string you search inside.'],
      ['prefix', 'A start of a string. The prefixes of "ABC" are "A", "AB" and "ABC".'],
      ['suffix', 'An end of a string. The suffixes of "ABC" are "C", "BC" and "ABC".'],
      ['proper', 'A prefix or suffix is proper if it is shorter than the whole string. The proper prefixes of "ABC" are "A" and "AB". The whole string is always both a prefix and a suffix of itself, so the table never counts it.'],
      ['prefix table', 'For each place in the pattern, look at the part up to that place. The table holds the length of the longest proper prefix of that part that is also its suffix.'],
      ['j', 'How many letters of the pattern match so far. A mismatch sets j back to table[j − 1].'],
      ['text pointer', 'The place in the text you are reading. It only moves forward.']
    ],
    math: {
      lines: ['\\text{time} = O(n + m)'],
      symbols: [
        ['n', 'the length of the text'],
        ['m', 'the length of the pattern'],
        ['O( )', 'Big-O: the steps grow no faster than the value inside']
      ],
      example: [
        'Pattern ABABC. Build its prefix table one place at a time, using proper prefixes only.',
        'A gives 0. AB gives 0. ABA gives 1, because A starts and ends it. ABAB gives 2, because AB starts and ends it. ABABC gives 0.',
        'So the table is [0, 0, 1, 2, 0]. ABAB does not give 4: the whole string is not a proper prefix.',
        'The 2 at the fourth place means the first two letters AB match the last two of ABAB.',
        'After a mismatch at the fifth letter, go back to place 2 in the pattern. Do not go to the start.',
        'The text pointer only moves forward: at most n moves. Building the table takes at most m moves.'
      ]
    },
    steps: [
      'Build the prefix table for the pattern: for each spot, the longest proper prefix that is also a suffix.',
      'Compare the pattern with the text, one letter at a time.',
      'On a mismatch, move the pattern index back using the table. Do not move the text index back.',
      'If the whole pattern matches, record the spot.',
      'Continue until the text ends.'
    ],
    use: ['The text is long and the pattern may repeat itself.', 'You must guarantee the search is linear in the worst case.'],
    avoid: ['Short texts, where the Python in operator is fine.', 'Looking for many patterns at once. Use a method built for that.'],
    mistakes: [
      'Moving the text index backward after a mismatch.',
      'Building the prefix table off by one place.',
      'Forgetting to keep searching after the first match to find later ones.'
    ],
    cheat: ['prefix table first', 'text pointer never goes back', 'j = how many pattern letters match so far', 'text letter differs: j = table[j − 1]', 'time O(n + m)', 'text.find("ABABC")'],
    next: ['zfunc', 'rollhash'],
    sources: ['Knuth, Morris, Pratt, Fast pattern matching in strings, SIAM Journal on Computing, 1977', 'CLRS, Introduction to Algorithms, 4th ed., ch. 32.4 (Knuth-Morris-Pratt)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 5.3 (substring search)']
  },
  zfunc: {
    what: 'The Z-array holds one number for each place in a string. It says how many letters from there match the string start. It is built in one pass. You can use it to find a pattern inside a text.',
    analogy: 'Hold a copy of a word under itself and slide it right. At each slide, count how many letters line up from the left.',
    uses: ['Finding a pattern in a text', 'Finding the shortest repeating block of a string', 'Checking how much two strings share at their start'],
    before: ['strings', 'kmp'],
    words: [
      ['prefix', 'A start of a string.'],
      ['Z-array', 'A list. Entry i is how long the string matches its own start, beginning at place i.'],
      ['match box', 'The range of the rightmost match found so far, from place l up to, but not including, place r. We write it [l, r).'],
      ['separator', 'A symbol such as $ that does not appear in either string.']
    ],
    math: {
      lines: ['Z[i] = \\text{how many letters from place } i \\text{ match the start}', '\\text{time} = O(n)'],
      symbols: [
        ['s', 'the string'],
        ['i', 'a place in the string, counting from 0'],
        ['Z[i]', 'how many letters, starting at place i, match the start of the string'],
        ['n', 'the length of the string']
      ],
      example: [
        'Take s = "aabxaab", which has 7 letters.',
        'At place 1: "a" matches the start, then "b" meets "a". So Z[1] = 1.',
        'At places 2 and 3: "b" and "x" do not match "a". So Z[2] = 0 and Z[3] = 0.',
        'At place 4: "aab" matches the first three letters, then the string ends. So Z[4] = 3.',
        'Place 5 sits inside the match box of place 4 (places 4 to 6). It mirrors place 1, so Z[5] starts as Z[1] = 1.',
        'Places 5 and 6 give 1 and 0. The array is [–, 1, 0, 0, 3, 1, 0]. Place 0 is skipped (shown as a dash).'
      ]
    },
    steps: [
      'Keep a match box [l, r): places l up to, but not including, r, for the rightmost match found.',
      'For a new place i inside the box, copy a known value as a starting guess.',
      'Extend the match by comparing new letters beyond r.',
      'Update the box if the match now reaches further right.',
      'To search, build Z for pattern + "$" + text. Look for values equal to the pattern length.'
    ],
    use: ['You want a simple linear pattern search.', 'You need to know how a string matches its own start.'],
    avoid: ['You prefer the prefix table of KMP. Both reach the same speed.', 'The strings are short. Plain comparison is fine.'],
    mistakes: [
      'Forgetting the separator, so a match can run from the pattern into the text.',
      'Re-comparing letters inside the match box instead of copying.',
      'Treating Z[0] as a normal value. It is usually left out.'
    ],
    cheat: ['Z[i] = match length at i', 'keep match box [l, r)', 'copy inside, extend outside', 's = pattern + "$" + text', 'time O(n)'],
    next: ['rollhash', 'kmp'],
    sources: ['Gusfield, Algorithms on Strings, Trees, and Sequences, 1997, ch. 1 (Z algorithm)', 'Crochemore and Rytter, Jewels of Stringology, 2002', 'Sedgewick and Wayne, Algorithms, 4th ed., ch. 5']
  },
  rollhash: {
    what: 'A rolling hash turns each window of a text into a number. When the window slides one place, the number updates in one step. You compare numbers instead of letters, and check the letters only when numbers match.',
    analogy: 'Think of a price tag on each shelf slice. When you slide to the next slice, you remove one item\'s price and add the new one.',
    uses: ['Finding a pattern in a long text with Rabin-Karp', 'Finding duplicate blocks inside a big file', 'Checking if a file has changed in part'],
    before: ['strings', 'hashing', 'modarith'],
    words: [
      ['hash', 'A number made from some data. Equal data always gives an equal hash.'],
      ['window', 'A fixed-length slice of the text that slides along.'],
      ['base', 'The number each letter place is multiplied by. Here it is 31.'],
      ['collision', 'Two different strings that give the same hash.'],
      ['mod', 'The remainder after dividing, which keeps the hash small.']
    ],
    math: {
      lines: ['h = (c_1 B^{m-1} + c_2 B^{m-2} + \\dots + c_m) \\bmod M', 'h_{\\text{new}} = ((h - c_{\\text{old}} B^{m-1}) \\cdot B + c_{\\text{new}}) \\bmod M', '\\text{time} = O(n + m) \\text{ on average}'],
      symbols: [
        ['c_1, ..., c_m', 'the letter codes in the window, with a = 1, b = 2 and so on'],
        ['B', 'the base, here 31'],
        ['M', 'the modulus, here 101'],
        ['m', 'the window length'],
        ['n', 'the length of the text']
      ],
      example: [
        'Use B = 31 and M = 101. The window "abr" has codes 1, 2, 18.',
        'Its hash is (1 × 31 × 31 + 2 × 31 + 18) mod 101. That is 1,041 mod 101, which is 31.',
        'Slide to "bra". B^(m−1) = 31 × 31 = 961, and 961 mod 101 = 52.',
        'New hash: ((31 − 1 × 52) × 31 + 1) mod 101. That is (−21 × 31 + 1) mod 101 = −650 mod 101 = 57.',
        'Check directly: "bra" is (2 × 961 + 18 × 31 + 1) mod 101. That is 2,481 mod 101, which is 57. They agree.'
      ]
    },
    steps: [
      'Compute the hash of the pattern.',
      'Compute the hash of the first window of the text.',
      'If the hashes are equal, compare the letters to be sure.',
      'Slide the window one place and update the hash in one step.',
      'Repeat until the window reaches the end of the text.'
    ],
    use: ['You search for one pattern in a long text.', 'You compare many equal-length blocks for repeats.'],
    avoid: ['A match must be certain with no check. Hash equality is not proof.', 'The text is short. A direct search is easy.'],
    mistakes: [
      'Trusting equal hashes without comparing the letters.',
      'Getting a negative hash after subtraction. Add M before the mod.',
      'Using a small modulus, which causes many collisions.'
    ],
    cheat: ['hash = letters as digits in base B', 'slide: remove old, times B, add new', 'equal hash: check letters', 'mod keeps numbers small', 'average time O(n + m)'],
    next: ['kmp', 'zfunc'],
    sources: ['Karp and Rabin, Efficient randomized pattern-matching algorithms, IBM Journal of Research and Development, 1987', 'CLRS, Introduction to Algorithms, 4th ed., ch. 32.2 (Rabin-Karp)', 'Sedgewick and Wayne, Algorithms, 4th ed., sec. 5.3']
  }
};
if (typeof module !== 'undefined') module.exports = { CONCEPT_ABOUT_B };
