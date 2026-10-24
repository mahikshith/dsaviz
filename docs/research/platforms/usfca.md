# USFCA Data Structure Visualizations (David Galles) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- Host is `www.cs.usfca.edu` (the bare `cs.usfca.edu` host did not resolve from this machine). robots.txt: `https://www.cs.usfca.edu/robots.txt` returns 404, so no stated restrictions. No bot check or rate limit seen.
- Pages captured: `Algorithms.html` (index), `BST.html`, `ComparisonSort.html`, `Dijkstra.html`, `Heap.html`, `about.html`, `faq.html`, `source.html`, and `visualizationPageStyle.css`. Under `https://www.cs.usfca.edu/~galles/visualization/`.
- Caveat: the canvas runs after load; REA captured the static DOM and control markup, so animation colours (drawn in JS) were not observed.

## Summary and business model
- One professor's course tool, free, no ads, no accounts, no tracking (cookies only remember canvas size and speed). Copyright 2011 David Galles, University of San Francisco. History: Java applets, then Flash, now HTML5 canvas + JavaScript.
- Works on phones and tablets by resizing the canvas.

## Sitemap and URL patterns
- Flat: `<Name>.html` per visualizer (`BST.html`, `AVLtree.html`, `Dijkstra.html`, `ComparisonSort.html`). Index at `Algorithms.html`.
- Support pages: `about.html`, `faq.html`, `bugfeature.html`, `source.html`, `contact.html`, `java/visualization.html`, `flash.html`.
- Code layout: `AnimationLibrary/*.js` (engine), `AlgorithmLibrary/<Name>.js` (one file per visualizer), `visualizationPageStyle.css`, `ThirdParty/jquery*`.

## Features and how they work
- Page template is identical for every visualizer: green header bar with title; algorithm-specific control row at top; 1000x500 `<canvas>`; general animation control row at bottom; footer link back to index.
- Algorithm-specific controls (examples): BST has text box + Insert, Delete, Find, Print; Heap has Insert, Remove Smallest, Clear Heap, BuildHeap; Comparison Sorting has Randomize Array, Insertion/Selection/Bubble/Quick/Merge/Shell Sort, Change Size; Dijkstra has start vertex box, Run Dijkstra, New Graph and radio groups (Directed/Undirected, Small/Large, Logical/Adjacency List/Adjacency Matrix view).
- General animation controls: Skip Back, Step Back, Play/Pause toggle, Step Forward, Skip Forward, Animation Speed slider (jQuery UI, stored in a cookie), canvas width/height boxes with Change Canvas Size, Move Controls.
- Semantics (from About): Skip Back undoes the whole current command (or the previous command if idle); Step Back/Forward only active when paused; the history lets you undo back through everything done; Skip Forward jumps to the end of the animation.
- Animation model: each operation emits an array of command strings to an animation manager, which plays them and handles all transport controls; each algorithm also implements an undo handler. So undo/step is command-log based.
- No code panel, no narration panel, no legend; the explanation is the on-canvas labels and the pointer/highlight shapes. No lessons, no quiz, no progress.
- Quirk: comparisons are string-based everywhere (FAQ), so "-2" sorts before "-3".

## Content coverage (about 47 linked pages in 9 groups)
- Basics (4 + 2 Java-only): Stack array and linked list, Queue array and linked list; Lists only in the Java version.
- Recursion (3): Factorial, Reversing a String, N-Queens.
- Indexing (13): Binary and Linear Search, BST, AVL, Red-Black, Splay, Open Hash (closed addressing), Closed Hash (open addressing), Closed Hash with buckets, Trie, Radix Tree, Ternary Search Tree, B Tree, B+ Tree.
- Sorting (4 pages covering 9 algorithms): Comparison Sorting (Bubble, Selection, Insertion, Shell, Merge, Quick), Bucket, Counting, Radix, Heap Sort.
- Heap-like (5): Heaps, Binomial Queues, Fibonacci Heaps, Leftist Heaps, Skew Heaps.
- Graph (9): BFS, DFS, Connected Components, Dijkstra, Prim, Topological Sort (indegree), Topological Sort (DFS), Floyd-Warshall, Kruskal.
- Dynamic Programming (3): Fibonacci, Making Change, Longest Common Subsequence.
- Geometry (5): 2D rotation+scale, 2D rotation+translation, 2D changing coordinates, 3D rotation+scale, 3D changing coordinates.
- Others: Disjoint Sets (Huffman only in Java).

## Design language
- Font: Verdana, Arial, Helvetica, sans-serif at 100%.
- Palette from `visualizationPageStyle.css`: header and footer `#006633` (deep green) with `#ffCC33` (gold) text and links (USF colours); control bars `#DDEEDD` (pale green), bottom bar text `#006600`; content `#FFFFFF`; headings `#006633`.
- Components: HTML tables of inputs and buttons (plain OS-styled), jQuery UI slider, one big canvas. Dated, utilitarian; no responsive CSS.
- Motion: smooth object moves on canvas, speed-slider controlled, highlight circles for the current node.

## Terms / licence (shown on site)
- FAQ: free to use in class; asks people to link, not cache locally. May be used as a base for your own visualizations via the source tarballs (versions 1.1 to 1.5); the source file header states a FreeBSD-style licence, Copyright 2011 David Galles, University of San Francisco.
- The author warns not to learn algorithms from his code because of animation workarounds.
- For us: concept and control layout are fair to learn from; we still write everything originally (no copying of source or images).

## Adopt for DSAMaxxing
**P0**
- Separate "algorithm controls" row (what to do) from "transport controls" row (how to watch). Clean mental model; reuse in each story.
- Command-log transport: skip back / step back / pause / step forward / skip forward, with whole-command undo.
- Per-page speed slider remembered across visits (localStorage).
**P1**
- Directed/undirected, small/large and logical/list/matrix view toggles for graph stories (show the same graph three ways).
- Resizable canvas / fit-to-screen for phones.
- A Randomize / Change size control on array stories.
**P2**
- Big catalogue idea: advanced structures (B-trees, red-black, splay, tries, heap family) as a later content wave.
- Beat them on explanation: add pseudocode, narration and a legend, which USFCA lacks.
