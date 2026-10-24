# GeeksforGeeks (geeksforgeeks.org) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt read first. `*` disallows `/wp-admin/`, `/community/`, `/search/`, `/wp-content/plugins/`, `/connect/`, `/content-override.php`. It also lists named AI crawlers as disallowed (CCBot, `anthropic-ai`, cohere-ai, Bytespider); the ClaudeBot and Claude-Web lines are commented out. To stay on the cautious side the crawl was kept to **2 pages only**: `/` and `/dsa/dsa-tutorial-learn-data-structures-and-algorithms/`. No bot check, no login.
- Stylesheet files (`assets.geeksforgeeks.org/gfg-assets/_next/static/css/*.css`) were identified but not captured.

## Summary and business model
- Huge article-and-practice portal that presents itself as an "all-in-one learning portal". Top nav: Courses, Tutorials, Practice, Jobs, dark-mode switch, Sign In. Quick links: DSA, Practice Problems, C, C++, Java, Python, JavaScript, Data Science, Machine Learning.
- Free articles; monetised by paid courses and partner promos. Visible course cards: "DSA & System Design Course - SDE Interview Prep" (rating 4.9, 492k+ "interested"), plus AI Engineering, DevOps and Cloud, Java Backend, MERN Full Stack and System Design (ratings 4.6-5.0). Sponsored industry tie-ins (cloud, IDE, database vendors) appear as carousel banners with an "Enroll Now" button. A "Placement 360" course is promoted from the DSA page nav. Prices were not on the captured pages.

## Sitemap / URL patterns
- Tutorials: `/dsa/<slug>/` (the DSA tutorial hub), subject hubs such as `/aptitude/...` and `/ai-ml-ds/`.
- Sitemap index declared in robots.txt (`sitemap_index_new.xml`). Home links include `/about/`, `/about/contact-us/`, `/advertise-with-us/`.
- DSA nav groups: Interview Questions, Quizzes, Must Do, Advanced DSA, System Design, Aptitude, Puzzles, Interview Corner, plus Practice entries (POTD = problem of the day, "GFG 160").

## Features and how they work
- **DSA Tutorial hub** ("Step by Step Learning"): one very long page that acts as a map of the subject. Sections are grouped by topic, and inside a topic the rows are labelled by level (for example easy / medium / hard under Maths and Pattern), each row being a run of inline links to articles. A note advises skipping the hard rows on a first pass.
- **Daily practice**: POTD and the "GFG 160" curated set linked from nav.
- **Dark mode toggle** on every page; sign in to save progress.
- Course marketplace and live workshops on the home page; a "Need help with Learning Roadmaps?" block.

## Content coverage (counts)
- The DSA page has 25 step-by-step sections: Fundamentals; Maths, Pattern and Recursion; Array and String; Searching; Sorting; Bit Manipulation; Hashing; Two-Pointer; Sliding Window; Prefix Sum; Backtracking; Linked-list; Stack; Queue; Deque; Binary Tree; Binary Search Tree; Heap; Graph; Greedy; Dynamic Programming; Number Theory; Trie; String Matching; Range Query. Last-updated stamp on the page: 1 Sep 2026. About 2,000 text nodes (hundreds of article links).
- Nav separates Data Structures (Array, String, Hashing, Linked List, Stack, Queue, Tree, Graph), Algorithms (Searching, Sorting, Recursion, Greedy, Graph, DP, Bitwise) and Advanced (Segment Tree, Binary Indexed Tree, Trie, Sqrt Decomposition).

## Design language
- Fonts in CSS: Source Sans 3 (body) and Nunito (accents); Google Sans on a few widgets.
- Palette: brand green `#308D46` (theme-color meta), white and grey surfaces; toast colours standard (success `#07bc0c`, info `#3498db`, warning `#f1c40f`).
- Components: sticky top nav with mega-menus, horizontal carousels of promo cards, dense link grids, rating badges, light and dark themes. Next.js app with NextUI tokens.
- Motion: carousel slides and hover states; nothing bespoke seen.

## License / terms
Not captured. Treat all article text as copyrighted; we take structure ideas only.

## Adopt for DSAMaxxing
**P0**
- A single "map of everything" topic hub page listing every pattern and section with progress marks. Cheap to build, strong for search traffic.
**P1**
- Problem-of-the-day entry in the nav.
- Per-section difficulty bands (easy, medium, hard) shown inline, with a "skip hard on first pass" hint.
**P2**
- Sponsored or partner banners are a revenue idea but off-brand for a learning product; park as a later option.
