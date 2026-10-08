# Content sources

A working document for growing the Pattern Atlas catalogue: where to find more problems, where company tags come from and how far to trust them, and what to add next. Every URL here was checked on 2026-10-08 (see [section 8](#8-sources-checked)). Re-check anything you rely on; lists and repositories change.

Abbreviations used throughout:

| Code | List |
| --- | --- |
| B75 | Blind 75 |
| G75 | Grind 75 (the default 75 of the Grind 169 pool) |
| NC150 | NeetCode 150 |
| NC+ | On neetcode.io but outside the NeetCode 150 (probably the NeetCode 250; the data file does not say which) |
| TI150 | LeetCode Top Interview 150 study plan |
| SP | Sean Prashad's LeetCode Patterns (179 problems) |

---

## 1. How to use this document

**Never copy a problem statement.** LeetCode's terms say its content is its exclusive property and copyrighted, and they forbid crawling or scraping the service. The same applies to statements, examples, constraints and test cases on any other judge. Pattern Atlas writes its own story, statement, examples and explanation for every lesson, and only links out.

The rules, in order:

1. **Pick** a problem from a curated list (section 2 or section 5). The list tells you a problem is worth teaching; it gives you nothing to copy.
2. **Write** an original `story.md`, `statement.md`, examples and `explanation.md` (see `docs/CONTENT_AUTHORING.md`). Invent your own numbers for examples. Do not paraphrase the source statement sentence by sentence.
3. **Link** to the source in `meta.json` → `practiceLink` (for example `{ "label": "LeetCode 54", "url": "https://leetcode.com/problems/spiral-matrix/" }`), and put the well-known name in `aka`. If the problem is LeetCode Premium, say so in the label (for example `"LeetCode 252 (Premium)"`).
4. **Tag companies as "reported by learners"**, not as fact. The schema comment on `companies` already says this: "Companies learners report meeting this problem at, most common first." LeetCode's own tags are user-reported (candidates mark questions they were asked), and every public dataset of them is a scrape of that. Record where each tag came from and the date you checked it (section 7 has a log table for this, because `meta.json` has no field for it).
5. **Respect list licences.** Curated lists are other people's selection work. Use them to choose problems; do not republish a list's order, groupings or notes as a Pattern Atlas page.

---

## 2. Problem lists

Use these to choose problems. Membership in several lists is the best cheap signal that a problem is a classic worth teaching.

| List | URL | Size | Organisation | Machine-readable data | Licence / terms |
| --- | --- | --- | --- | --- | --- |
| Blind 75 | Original post (Dec 30, 2018): https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU ; LeetCode Discuss copy: https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions | 75 (a few are Premium) | 10 categories: Array, Binary, Dynamic Programming, Graph, Interval, Linked List, Matrix, String, Tree, Heap | Yes: `blind75: true` in NeetCode's data file (below), 75 entries | Forum posts; no licence. Link only. |
| Grind 75 / Grind 169 | https://www.techinterviewhandbook.org/grind75/ (about: `/grind75/about`, FAQ: `/grind75/faq`) | 75 by default, from a ranked pool of 169 | By week, topic or difficulty; you set weeks and hours per week. Default 75 are all free; Premium questions are pushed to the end of the 169. | No. The page renders in the browser; no official data file found. Membership below was cross-checked against a third-party mirror (https://github.com/open-minded13/leetcode-grind-75-solutions). | Page footer: "All rights reserved". Link only. |
| Tech Interview Handbook practice questions | https://www.techinterviewhandbook.org/best-practice-questions and https://www.techinterviewhandbook.org/coding-interview-study-plan/ | 50 questions over 5 weeks; study plan has about 75 problems over weeks 5 to 12 | By week and topic, with "optional" extras | No | The handbook repo (https://github.com/yangshun/tech-interview-handbook) is MIT; the website footer says all rights reserved. Treat as link only. |
| NeetCode 150 / 250 | https://neetcode.io/practice ; 250 list: https://neetcode.io/practice/practice/neetcode250 | 150; 250 (60 easy, 155 medium, 35 hard) | 18 topics: Arrays & Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees, Heap / Priority Queue, Backtracking, Tries, Graphs, Advanced Graphs, 1-D DP, 2-D DP, Greedy, Intervals, Math & Geometry, Bit Manipulation | Yes: `.problemSiteData.json` in https://github.com/neetcode-gh/leetcode (450 entries with `neetcode150`, `blind75`, `pattern`, `difficulty`, `code` = LeetCode number + slug). No NeetCode 250 flag. | Repo is MIT. Site terms not checked. |
| LeetCode Top Interview 150 | https://leetcode.com/studyplan/top-interview-150/ | 150 | Topic sections (array/string, two pointers, sliding window, matrix, hashmap, intervals, stack, linked list, binary tree, BST, graphs, trie, backtracking, divide and conquer, Kadane, binary search, heap, bit manipulation, math, 1-D and multidimensional DP) | No official export. Membership below was cross-checked against a third-party mirror (https://github.com/logreg-n-coffee/leetcode-top-interview-150). | LeetCode content; link only. |
| LeetCode 75 | https://leetcode.com/studyplan/leetcode-75/ | 75 | Study plan | No | Link only. Not used in the counts below. |
| LeetCode Top 100 Liked | https://leetcode.com/studyplan/top-100-liked/ | 100 | Study plan | No | Link only. Not used in the counts below. |
| Sean Prashad's LeetCode Patterns | https://seanprashad.com/leetcode-patterns/ ; repo https://github.com/seanprashad/leetcode-patterns (14.1k stars) | 179 | Filter by LeetCode topic tag, difficulty and company; "Helpful Tips" maps clues to approaches | Yes: `src/data/questions.json` (`updated` timestamp, then per question `id`, `title`, `slug`, `pattern` (topic tags), `difficulty`, `premium`, `companies[{name, slug, frequency}]`). Updated weekly; last update 2026-10-04. | **CC BY-NC 4.0** (attribution, non-commercial). If Pattern Atlas is ever commercial, do not use this data without permission. |
| AlgoMaster | https://algomaster.io/ ; link list https://github.com/ashishps1/awesome-leetcode-resources | Site advertises 600+ problems and 60+ (elsewhere 70+) patterns; the "AlgoMaster 300" list is linked from the GitHub README | By pattern | Not checked | Site has premium tiers and its own terms. The GitHub link list is GPL-3.0. Link only. |
| Striver's A2Z DSA Sheet | https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2 | About 400+ practice problems in 19 to 20 modules (the page gives both figures) | A sequenced roadmap from basics to graphs and DP | Not checked | Popular with candidates in India. Terms not checked. Link only. |

Notes:

- The `id` in Sean Prashad's data is LeetCode's internal question id, **not** the problem number. They match for older problems and drift later (Interval List Intersections is problem 986 but `id` 1028). Always match on `slug`.
- NeetCode's `code` field (for example `0217-contains-duplicate`) does carry the real problem number.
- Grind 169 beyond the default 75 could not be verified per problem, so it is not counted in section 5.

---

## 3. Company tag sources

Every public company-tag dataset is derived from LeetCode's Premium company tags, which are themselves reported by users, not by employers. LeetCode's terms forbid scraping, and none of the scraped repositories below declares a licence except the 2022 snapshot (MIT). So:

- Use them as **evidence for a human decision**, not as data to copy. Do not commit their CSVs or JSON into this repository.
- Store only the resulting tag on the lesson, plus the source and date in the log (section 7).
- Expect noise: a company appears after a few reports, tags lag real interviews, and "frequency" means something different in each source, so numbers are not comparable across sources.

### Ratings

Reliability = how close to the original signal and how consistent. Freshness = age of the data on 2026-10-08. Effort = work to ingest for this site.

| Source | URL | Stars | Data date | Licence | Format | Reliability | Freshness | Effort |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sean Prashad `questions.json` | https://github.com/seanprashad/leetcode-patterns/blob/main/src/data/questions.json | 14.1k | 2026-10-04 (weekly GitHub Action, Sundays) | CC BY-NC 4.0 | One JSON file; per problem, companies with a `frequency` = times encountered in LeetCode's 0 to 6 month window | High for the problems it covers: pulled from LeetCode's own per-question stats with counts. Only 179 problems. | High | Low |
| snehasishroy | https://github.com/snehasishroy/leetcode-companywise-interview-questions | 8.3k | Snapshot of 12 July 2026 (committed 2026-08-15) | None declared | One folder per company (about 660), lower-case-hyphen names (`walmart-labs`, `goldman-sachs`). Files: `thirty-days.csv`, `three-months.csv`, `six-months.csv`, `more-than-six-months.csv`, `all.csv`. Columns: `ID, URL, Title, Difficulty, Acceptance %, Frequency %`. | Medium: full company coverage, but a one-off scrape by contributors with Premium logins | High (3 months old) | Low to medium |
| liquidslr | https://github.com/liquidslr/leetcode-company-wise-problems (formerly `interview-company-wise-problems`; GitHub redirects) | 31.3k | README says 1 June 2025, About says 20 June 2025; latest commit "Update Problems [16 Aug]" on 2026-08-16. Check the commit history. | None declared | One folder per company (about 470), display names (`Walmart Labs`, `J.P. Morgan`, `X`). Files: `1. Thirty Days.csv` to `5. All.csv`. Columns: `Difficulty, Title, Frequency, Acceptance Rate, Link, Topics`. | Medium. The `Acceptance Rate` values look malformed (for example 0.0076); ignore that column. | Medium to high (dates conflict) | Low to medium |
| krishnadey30 | https://github.com/krishnadey30/LeetCode-Questions-CompanyWise | 20.3k | Last commit 2023-04-01 | None declared | `company_6months.csv`, `_1year`, `_2year`, `_alltime`; uses `facebook`, not `meta` | Medium | Low | Low, but only useful for history |
| hxu296 (2022) | https://github.com/hxu296/leetcode-company-wise-problems-2022 | 11.4k | May 2022 | MIT | CSV per company | Medium | Low | Low; historical only |
| MysteryVaibhav | https://github.com/MysteryVaibhav/leetcode_company_wise_questions | 7.4k | Last push 2022-03 | None declared | PDFs | Low for ingestion | Low | High; skip |
| xizhang20181005 | https://github.com/xizhang20181005/Leetcode_company_frequency | 6.7k | Last push 2019-12 | None declared | CSV | Low | Very low | Skip |
| LeetCode company pages | https://leetcode.com/company/google/ (pattern: `/company/<slug>/`); Premium described at https://leetcode.com/subscribe/ | n/a | Live | LeetCode terms (no scraping) | Web page; Premium shows frequency and time filters | Highest available (it is the origin), still user-reported | Live | Manual only. Spot-check by hand with a Premium account; never script it. |
| LeetCode Discuss interview experiences | https://leetcode.com/discuss/interview-experience | n/a | Live | LeetCode terms | Free-text posts | Low to medium; anecdotal, but often names the exact problem and round | Live | High (manual reading) |
| GeeksforGeeks Company Interview Corner | https://www.geeksforgeeks.org/interview-experiences/company-interview-corner/ | n/a | Hub page last updated 21 Aug 2025 | GfG terms | Free-text interview write-ups per company; strong coverage of Indian employers and service companies | Low to medium; quality varies, many posts are old | Mixed | High (manual) |
| Glassdoor interview reviews | https://www.glassdoor.com/Interview/index.htm | n/a | Live | Terms forbid automated collection without written consent (per a third-party summary; Glassdoor blocked our fetch) | Free-text reviews | Low for problem names (often paraphrased or vague); useful for behavioural questions | Live | High (manual; never scrape) |

Background on how LeetCode tags are made: candidates mark questions they were asked (Blind thread, Jan 2025: https://www.teamblind.com/post/how-does-leetcode-get-company-tagged-questions-xcdt76kq). Nothing public says they are verified.

### What this means for Pattern Atlas

- **Primary source for refreshing existing tags: Sean Prashad's JSON.** It covers 53 of the site's 58 LeetCode-linked lessons; the five it does not cover are LeetCode 167, 155, 739, 994 and 560. It has counts, a 6-month window, and updates weekly. Mind the non-commercial licence.
- **Secondary source, for those five problems and for new companies: snehasishroy's `six-months.csv`** (and `all.csv` when you need history). Cross-check against liquidslr when the two disagree.
- **Use LeetCode Discuss, GeeksforGeeks and Glassdoor only to confirm a doubtful tag by hand**, never as a bulk source.

A first comparison against Sean Prashad's data (2026-10-04) shows how far the current tags have drifted. Examples, counting companies with 3 or more reports in the last 6 months:

| Lesson | Site tags today | Reported in last 6 months but not tagged | Tagged but not reported in last 6 months |
| --- | --- | --- | --- |
| two-sum | Amazon, Google, Meta, Microsoft | Bloomberg, TCS, Infosys, Apple, Oracle, TikTok, and others | none |
| best-time-stock (121) | Amazon, Goldman Sachs, Flipkart | Google, Meta, Bloomberg, Microsoft, Apple, Nvidia, Atlassian, and others | Goldman Sachs |
| merge-intervals (56) | Google, Meta, Amazon, Bloomberg | Microsoft, Apple, Salesforce, Visa, Walmart Labs, JPMorgan Chase, and others | none |
| char-replacement (424) | Google, Amazon, Uber | Microsoft, Infosys, DE Shaw | Uber |

"Not reported in the last 6 months" does not mean a tag is wrong; it may be older. Do not remove tags automatically (section 7).

---

## 4. Companies to add next

The site tags 12 companies today. These 25 are frequently asked about and are covered by at least two sources. "SP count" is how many of Sean Prashad's 179 classic problems have at least one report for that company in the last 6 months: a rough measure of how much classic pattern material that company's recent reports touch. Folder names are given exactly as they appear, because you will need them when reading the CSVs.

| Company | liquidslr folder | snehasishroy folder | SP count | Notes |
| --- | --- | --- | --- | --- |
| TCS | `tcs` | `tcs` | 52 | Highest count outside the companies already tagged. Display as "TCS". |
| Infosys | `Infosys` | `infosys` | 46 | |
| TikTok | `TikTok` | `tiktok` | 17 | Sources keep TikTok and ByteDance separate; decide whether to merge. |
| ByteDance | `ByteDance` | `bytedance` | 1 | See TikTok. |
| Walmart Global Tech | `Walmart Labs` | `walmart-labs` | 12 | LeetCode still calls it "Walmart Labs"; pick one display name and map the other. |
| IBM | `IBM` | `ibm` | 9 | |
| Nvidia | `Nvidia` | `nvidia` | 8 | |
| Salesforce | `Salesforce` | `salesforce` | 7 | |
| JPMorgan Chase | `J.P. Morgan` | `jpmorgan` | 7 | Three spellings across sources. |
| Oracle | `Oracle` | `oracle` | 6 | |
| Visa | `Visa` | `visa` | 6 | |
| Intuit | `Intuit` | `intuit` | 5 | Do not confuse with `Applied Intuition`, which also exists in both repos. |
| Zoho | `Zoho` | `zoho` | 5 | Also well covered by GeeksforGeeks write-ups. |
| Snowflake | `Snowflake` | `snowflake` | 4 | |
| DE Shaw | `DE Shaw` | `de-shaw` | 4 | |
| Atlassian | `Atlassian` | `atlassian` | 2 | |
| Cisco | `Cisco` | `cisco` | 1 | |
| Qualcomm | `Qualcomm` | `qualcomm` | 1 | |
| Netflix | `Netflix` | `netflix` | 0 | Not in SP's 6-month window, but the all-time CSVs do include classics (snehasishroy's `netflix/all.csv` lists LeetCode 3, 56, 146 and 210). Use the CSVs. |
| Stripe | `Stripe` | `stripe` | 0 | Absent from SP; check the CSVs. Not in krishnadey30. |
| PayPal | `PayPal` | `paypal` | 0 | Absent from SP; check the CSVs. |
| ServiceNow | `ServiceNow` | `servicenow` | 0 | Absent from SP; check the CSVs. |
| DoorDash | `DoorDash` | `doordash` | 0 | Absent from SP; check the CSVs. |
| Databricks | `Databricks` | `databricks` | 0 | Absent from SP; check the CSVs. |
| X (Twitter) | `X` | `twitter` | 0 | Renamed in 2023; sources disagree on the name. |

Also present in both repositories if you want more: VMware (`VMware` / `vmware`; now part of Broadcom, which snehasishroy lists separately as `broadcom`), Accenture, Cognizant, Deloitte, Morgan Stanley, Citadel, Two Sigma, Pinterest, Spotify, eBay, Samsung, Lyft, Robinhood, Coinbase, OpenAI, Anthropic (snehasishroy only), Swiggy, Zomato, Razorpay, PhonePe, Meesho.

A company with a count of 0 above is not a bad choice; it only means its recent reports are not on the 179 classics. Before adding one, make sure at least three lessons on the site would carry the tag, or the company filter on `/practice/` will show a near-empty list.

---

## 5. Problems to add next, by pattern

None of these are on the site today. The check was made against every `practiceLink` in `content/problems/*/meta.json` on 2026-10-08. Note that the existing lesson `longest-palindrome` is LeetCode 5 (Longest Palindromic Substring), not LeetCode 409 (Longest Palindrome), and `busiest-three-days` only points to LeetCode 643 as "similar".

"Lists" counts B75, G75, NC150, TI150 and SP. NC+ is shown for information and not counted. Premium problems are marked; prefer free ones unless the problem is a classic with no free equivalent.

**Start here.** These 15 are in four or five of the lists: 54 Spiral Matrix, 105 Construct Binary Tree from Preorder and Inorder, 208 Implement Trie, 230 Kth Smallest Element in a BST, 295 Find Median from Data Stream, 17 Letter Combinations of a Phone Number, 73 Set Matrix Zeroes, 100 Same Tree, 124 Binary Tree Maximum Path Sum, 190 Reverse Bits, 191 Number of 1 Bits, 211 Design Add and Search Words, 212 Word Search II, 235 Lowest Common Ancestor of a BST, 297 Serialize and Deserialize Binary Tree. Five of them (208, 211, 212, 190, 191) need the new patterns proposed at the end of this section.

### Two pointers (`two-pointers`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 75 | Sort Colors | Medium | G75, SP, NC+ |
| 392 | Is Subsequence | Easy | TI150, SP, NC+ |
| 189 | Rotate Array | Medium | TI150, SP, NC+ |
| 88 | Merge Sorted Array | Easy | TI150, NC+ |
| 26 | Remove Duplicates from Sorted Array | Easy | TI150, NC+ |
| 977 | Squares of a Sorted Array | Easy | SP, NC+ |
| 18 | 4Sum | Medium | NC+ |
| 680 | Valid Palindrome II | Easy | NC+ |

### Fast and slow pointers (`fast-slow-pointers`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 143 | Reorder List | Medium | B75, NC150, SP (also uses in-place reversal: give it two pattern memberships) |
| 287 | Find the Duplicate Number | Medium | NC150, SP |
| 202 | Happy Number | Easy | NC150, TI150 |
| 142 | Linked List Cycle II | Medium | SP |
| 234 | Palindrome Linked List | Easy | SP, NC+ |

### Linked list reversal (`in-place-reversal`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 25 | Reverse Nodes in k-Group | Hard | NC150, TI150, SP |
| 92 | Reverse Linked List II | Medium | TI150, SP, NC+ (fits the existing `sublist` variant) |
| 61 | Rotate List | Medium | TI150, SP, NC+ |
| 24 | Swap Nodes in Pairs | Medium | SP, NC+ |
| 2130 | Maximum Twin Sum of a Linked List | Medium | NC+ |

### Sliding window (`sliding-window`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 567 | Permutation in String | Medium | NC150, SP |
| 209 | Minimum Size Subarray Sum | Medium | TI150, SP, NC+ |
| 30 | Substring with Concatenation of All Words | Hard | TI150, SP |
| 438 | Find All Anagrams in a String | Medium | G75, NC+ |
| 904 | Fruit Into Baskets | Medium | SP, NC+ |
| 219 | Contains Duplicate II | Easy | TI150, NC+ |
| 1004 | Max Consecutive Ones III | Medium | none of the five; a standard variable-window exercise |

### Hash lookup (`hash-map`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 169 | Majority Element | Easy | G75, TI150, SP, NC+ |
| 383 | Ransom Note | Easy | G75, TI150 |
| 205 | Isomorphic Strings | Easy | TI150, NC+ |
| 290 | Word Pattern | Easy | TI150, NC+ |
| 380 | Insert Delete GetRandom O(1) | Medium | TI150, NC+ |
| 41 | First Missing Positive | Hard | SP, NC+ |
| 271 | Encode and Decode Strings | Medium, **Premium** | B75, NC150, SP |

### Prefix sums (`prefix-sums`)

The curated lists barely cover prefix sums, so membership is thin here; these are still the standard teaching set.

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 303 | Range Sum Query - Immutable | Easy | SP, NC+ |
| 724 | Find Pivot Index | Easy | NC+ |
| 304 | Range Sum Query 2D - Immutable | Medium | NC+ |
| 523 | Continuous Subarray Sum | Medium | NC+ |
| 525 | Contiguous Array | Medium | none of the five |
| 974 | Subarray Sums Divisible by K | Medium | none of the five |

### Binary search (`binary-search`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 74 | Search a 2D Matrix | Medium | NC150, TI150, SP |
| 4 | Median of Two Sorted Arrays | Hard | NC150, TI150, SP |
| 981 | Time Based Key-Value Store | Medium | G75, NC150 |
| 162 | Find Peak Element | Medium | TI150, SP, NC+ |
| 34 | Find First and Last Position of Element in Sorted Array | Medium | TI150, NC+ (fits the `boundary` variant) |
| 278 | First Bad Version | Easy | G75 |
| 875 | Koko Eating Bananas | Medium | NC150 (binary search on the answer: a new variant) |
| 1011 | Capacity To Ship Packages Within D Days | Medium | NC+ (same variant as 875) |

### Breadth-first search (`breadth-first-search`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 127 | Word Ladder | Hard | G75, NC150, TI150 |
| 210 | Course Schedule II | Medium | NC150, TI150, SP (fits the existing `topological` variant) |
| 103 | Binary Tree Zigzag Level Order Traversal | Medium | TI150, SP, NC+ |
| 637 | Average of Levels in Binary Tree | Easy | TI150, SP |
| 310 | Minimum Height Trees | Medium | G75, SP |
| 542 | 01 Matrix | Medium | G75 (fits `multi-source`) |
| 909 | Snakes and Ladders | Medium | TI150, NC+ |
| 1091 | Shortest Path in Binary Matrix | Medium | NC+ (fits `shortest-path`; the `bfs-shortest-path-v1` adapter may already cover it) |

### Depth-first search (`depth-first-search`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 105 | Construct Binary Tree from Preorder and Inorder Traversal | Medium | B75, G75, NC150, TI150, SP |
| 230 | Kth Smallest Element in a BST | Medium | B75, G75, NC150, TI150, SP |
| 100 | Same Tree | Easy | B75, NC150, TI150, SP |
| 124 | Binary Tree Maximum Path Sum | Hard | B75, NC150, TI150, SP |
| 235 | Lowest Common Ancestor of a Binary Search Tree | Medium | B75, G75, NC150, SP |
| 572 | Subtree of Another Tree | Easy | B75, NC150, SP |
| 417 | Pacific Atlantic Water Flow | Medium | B75, NC150, SP |
| 543 | Diameter of Binary Tree | Easy | G75, NC150 |

Also strong: 297 Serialize and Deserialize Binary Tree (B75, G75, NC150, SP), 236 Lowest Common Ancestor of a Binary Tree (G75, TI150, SP), 110 Balanced Binary Tree (G75, NC150), 130 Surrounded Regions (NC150, TI150).

### Backtracking (`backtracking`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 17 | Letter Combinations of a Phone Number | Medium | G75, NC150, TI150, SP |
| 22 | Generate Parentheses | Medium | NC150, TI150, SP |
| 40 | Combination Sum II | Medium | NC150, SP |
| 90 | Subsets II | Medium | NC150, SP |
| 131 | Palindrome Partitioning | Medium | NC150, SP |
| 51 | N-Queens | Hard | NC150, SP |
| 77 | Combinations | Medium | TI150, SP, NC+ |
| 47 | Permutations II | Medium | SP, NC+ |

### Dynamic programming (`dynamic-programming`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 213 | House Robber II | Medium | B75, NC150, SP |
| 91 | Decode Ways | Medium | B75, NC150, SP |
| 152 | Maximum Product Subarray | Medium | B75, NC150, SP |
| 647 | Palindromic Substrings | Medium | B75, NC150, SP |
| 1143 | Longest Common Subsequence | Medium | B75, NC150, SP |
| 416 | Partition Equal Subset Sum | Medium | G75, NC150, SP |
| 72 | Edit Distance | Medium | NC150, TI150 |
| 746 | Min Cost Climbing Stairs | Easy | NC150 (an easy bridge from the climbing-stairs lesson) |

### Greedy choice (`greedy`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 134 | Gas Station | Medium | NC150, TI150, SP |
| 45 | Jump Game II | Medium | NC150, TI150 |
| 122 | Best Time to Buy and Sell Stock II | Medium | TI150, NC+ |
| 763 | Partition Labels | Medium | NC150 |
| 846 | Hand of Straights | Medium | NC150 |
| 678 | Valid Parenthesis String | Medium | NC150 |
| 135 | Candy | Hard | TI150, NC+ |

### Heap and top-k (`heap`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 295 | Find Median from Data Stream | Hard | B75, G75, NC150, TI150, SP |
| 973 | K Closest Points to Origin | Medium | G75, NC150, SP |
| 621 | Task Scheduler | Medium | G75, NC150, SP |
| 373 | Find K Pairs with Smallest Sums | Medium | TI150, SP |
| 703 | Kth Largest Element in a Stream | Easy | NC150 |
| 1046 | Last Stone Weight | Easy | NC150 |
| 767 | Reorganize String | Medium | SP, NC+ |
| 502 | IPO | Hard | TI150, NC+ |

### Stack (`stack`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 150 | Evaluate Reverse Polish Notation | Medium | G75, NC150, TI150 |
| 84 | Largest Rectangle in Histogram | Hard | G75, NC150 (fits `monotonic`) |
| 224 | Basic Calculator | Hard | G75, TI150 |
| 232 | Implement Queue using Stacks | Easy | G75 (fits `design`) |
| 71 | Simplify Path | Medium | TI150, NC+ |
| 853 | Car Fleet | Medium | NC150 |
| 394 | Decode String | Medium | NC+ |
| 735 | Asteroid Collision | Medium | NC+ |

### Interval sweep (`intervals`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 435 | Non-overlapping Intervals | Medium | B75, NC150, SP |
| 452 | Minimum Number of Arrows to Burst Balloons | Medium | TI150, SP |
| 252 | Meeting Rooms | Easy, **Premium** | B75, NC150, SP |
| 253 | Meeting Rooms II | Medium, **Premium** | B75, NC150, SP |
| 986 | Interval List Intersections | Medium | SP |
| 228 | Summary Ranges | Easy | TI150 |
| 1288 | Remove Covered Intervals | Medium | NC+ |

### Matrix transforms (`matrix`)

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 54 | Spiral Matrix | Medium | B75, G75, NC150, TI150, SP |
| 73 | Set Matrix Zeroes | Medium | B75, NC150, TI150, SP |
| 36 | Valid Sudoku | Medium | NC150, TI150 (also a hash-map lesson) |
| 289 | Game of Life | Medium | TI150 |
| 240 | Search a 2D Matrix II | Medium | SP |
| 59 | Spiral Matrix II | Medium | NC+ |
| 867 | Transpose Matrix | Easy | none of the five; a warm-up for the existing rotate-image lesson |

### New patterns worth adding

The breadth-first search pattern already has a `topological` variant and the stack pattern already has a `monotonic` variant, so topological sort and monotonic stack fit inside existing patterns (see 210, 310 and 84 above). These three would be new. Each needs a `pattern.json` and `pattern.md`, and probably a new adapter or solver, which needs code review (`docs/CONTENT_AUTHORING.md`, "Adding an algorithm").

**Trie (prefix tree)**

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 208 | Implement Trie (Prefix Tree) | Medium | B75, G75, NC150, TI150, SP |
| 211 | Design Add and Search Words Data Structure | Medium | B75, NC150, TI150, SP |
| 212 | Word Search II | Hard | B75, NC150, TI150, SP (builds on the existing word-search lesson) |
| 1268 | Search Suggestions System | Medium | NC+ |
| 720 | Longest Word in Dictionary | Medium | SP |

**Union-find (disjoint set)**

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 547 | Number of Provinces | Medium | none of the five; the usual first union-find problem |
| 684 | Redundant Connection | Medium | NC150 |
| 721 | Accounts Merge | Medium | G75, NC+ |
| 323 | Number of Connected Components in an Undirected Graph | Medium, **Premium** | B75, NC150, SP |
| 261 | Graph Valid Tree | Medium, **Premium** | B75, NC150, SP |
| 1584 | Min Cost to Connect All Points | Medium | NC150 (Kruskal; links to a later minimum-spanning-tree lesson) |

**Bit manipulation**

| # | Title | Difficulty | Lists |
| --- | --- | --- | --- |
| 191 | Number of 1 Bits | Easy | B75, NC150, TI150, SP |
| 190 | Reverse Bits | Easy | B75, NC150, TI150, SP |
| 136 | Single Number | Easy | NC150, TI150, SP |
| 338 | Counting Bits | Easy | B75, NC150, SP (also a DP lesson) |
| 268 | Missing Number | Easy | B75, NC150, SP |
| 371 | Sum of Two Integers | Medium | B75, NC150, SP |

A fourth candidate for later: weighted shortest paths (Dijkstra), from NeetCode's "Advanced Graphs": 743 Network Delay Time, 787 Cheapest Flights Within K Stops, 778 Swim in Rising Water (all NC150).

---

## 6. Git, ML and behavioural resources

For the `/git/`, `/ml/` and `/resources/` pages. Licences matter here because these pages may quote or adapt more than the problem lessons do. Even where a licence allows reuse, prefer linking and writing your own explanation.

### Git

| Resource | URL | What it is | Licence / terms |
| --- | --- | --- | --- |
| Pro Git, 2nd edition (Chacon and Straub) | https://git-scm.com/book/en/v2 | The standard free Git book | CC BY-NC-SA 3.0. Adapting requires attribution, non-commercial use and the same licence. Link rather than adapt. |
| Git reference | https://git-scm.com/docs | Official command and guide reference (tutorial, everyday Git, glossary, workflows) | Site source is MIT (https://github.com/git/git-scm.com); the man pages themselves come from Git. Link. |
| Learn Git Branching | https://learngitbranching.js.org/ (source https://github.com/pcottle/learnGitBranching, 34k stars) | Interactive branching, rebasing and remote exercises in the browser | MIT |
| GitHub Docs: Git basics | https://docs.github.com/en/get-started/git-basics | Setup, credentials, remotes, ignoring files, cheat sheet | Content CC BY 4.0, code MIT (https://github.com/github/docs) |
| Atlassian Git tutorials | https://www.atlassian.com/git/tutorials | Tutorials on workflows, merging vs rebasing, undoing changes | No licence stated on the page we fetched. Link only. |
| The Missing Semester: Version Control (Git) | https://missing.csail.mit.edu/2020/version-control/ | Lecture notes on Git's data model, then the commands | CC BY-NC-SA 4.0 |
| Dangit, Git!?! | https://dangitgit.com/en (same content with swearing at https://ohshitgit.com/) | Short fixes for common mistakes | Copyright Katie Sylor-Miller; no licence stated. Link only. Use the dangitgit version for a learning site. |

### Machine learning

| Resource | URL | What it is | Licence / terms |
| --- | --- | --- | --- |
| Google Machine Learning Crash Course | https://developers.google.com/machine-learning/crash-course | Modules on linear and logistic regression, classification, data, overfitting, neural networks, embeddings, LLMs, production ML, fairness | developers.google.com default: content CC BY 4.0, code samples Apache 2.0, excluding images and video (https://developers.google.com/site-policies) |
| Google ML Glossary | https://developers.google.com/machine-learning/glossary | Definitions of ML terms | Same as above. Good link target for the site's own glossary entries. |
| scikit-learn User Guide | https://scikit-learn.org/stable/user_guide.html | Reference for supervised and unsupervised learning, model selection, pitfalls, choosing an estimator (version 1.9.1 when checked) | BSD licence |
| Distill | https://distill.pub/ | Interactive research articles. On hiatus since 2 July 2021; the archive stays up. Good entries: "Why Momentum Really Works" (https://distill.pub/2017/momentum/, CC-BY 2.0) and "A Gentle Introduction to Graph Neural Networks" (https://distill.pub/2021/gnn-intro/, CC-BY 4.0) | Per article; figures taken from elsewhere are excluded |
| MLU-Explain (Amazon Machine Learning University) | https://mlu-explain.github.io/ | Visual essays: bias-variance, ROC and AUC, precision and recall, cross-validation, decision trees, random forests, linear and logistic regression, neural networks, double descent | No licence stated. Link only. |
| StatQuest | https://statquest.org/ | Josh Starmer's statistics and ML explainers; links to the YouTube channel | Copyright; no reuse terms stated. Link only. |
| Introduction to Machine Learning Interviews (Chip Huyen) | https://huyenchip.com/ml-interviews-book/ | ML roles and interview process, plus 200+ knowledge questions by difficulty | Copyright 2021; no licence stated on the page. Link only. |
| Dive into Deep Learning | https://github.com/d2l-ai/d2l-en | Free interactive deep learning textbook with code | The website (https://d2l.ai/) returned 503 when checked, so link the repository until it is back. Licence not confirmed (GitHub reports a non-standard licence file). |

### Behavioural interviews

| Resource | URL | What it is | Licence / terms |
| --- | --- | --- | --- |
| Tech Interview Handbook: behavioural preparation | https://www.techinterviewhandbook.org/behavioral-interview/ | STAR format (plus reflection), 3 to 5 key stories, the "big three" questions, researching company values | Site footer: all rights reserved (repo is MIT). Link. |
| Tech Interview Handbook: common behavioural questions | https://www.techinterviewhandbook.org/behavioral-interview-questions/ | 29 general questions plus company sections (Airbnb, Palantir, Amazon, Slack, ByteDance, Stripe, Dropbox, Lyft and others), mostly sourced from Glassdoor | As above |
| Amazon Leadership Principles | https://www.amazon.jobs/content/en/our-workplace/leadership-principles | The 16 principles Amazon interviews against | Amazon content; link and summarise in your own words |
| Amazon: How we hire | https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon | Hiring stages, interview loop, Bar Raiser, links to role-specific prep pages | Amazon content; link |
| Google: How we hire | https://www.google.com/about/careers/applications/how-we-hire/ | Google's official hiring process page | Google content; link. The fetched text did not show the interview criteria, so read it before summarising. |

---

## 7. Ingestion workflow

### Adding a problem

1. **Pick.** Choose from section 5, or from a list in section 2. Prefer problems in several lists, free problems, and problems that fit an existing pattern variant.
2. **Check it is not a duplicate.** Search the source URL and the number:
   ```bash
   grep -rl "leetcode.com/problems/spiral-matrix" content/problems
   grep -rn '"label": "LeetCode 54' content/problems
   ```
   Also check `aka` names, and remember that one site lesson can teach a problem under a different story title.
3. **Check what code it needs.** Read `src/engine/registry/ids.ts`. If an existing adapter covers the algorithm, the lesson is content only. If not, it needs either a new adapter (for a walkthrough) or a reference solver in `src/engine/solvers/` (for a reading lesson). Both are code changes that need review.
4. **Copy the template:** `cp -r content/problems/_template content/problems/<slug>` and keep `"status": "draft"`.
5. **Write original content** (section 1): `story.md`, `statement.md`, `explanation.md`, `narration.json`, `checkpoints.json`, `reference/<approach>.py` and `.ts`, `practice/starter.py` and `.ts`. Invent your own example values.
6. **Fill `meta.json`:** `aka` (the well-known name), `practiceLink` (label `"LeetCode <number>"`, plus `(Premium)` if needed), `patternMemberships` (two if the problem genuinely teaches two patterns, as `right-side-view` does), `provenance.kind: "original"`.
7. **Add company tags** using the refresh rules below, most common first, and add a row to the tag log.
8. **Validate and test:**
   ```bash
   npm run validate
   npm test
   npm run dev   # then open /authoring/ and /problems/<slug>/
   ```
9. **Publish:** set `"status": "published"` and run `npm run build` (it validates first).

### Refreshing company tags

Rules:

- A company is **proposed for adding** when Sean Prashad's data shows 3 or more reports in the last 6 months for that problem, or (for problems that data does not cover) the problem appears in that company's `six-months.csv` in snehasishroy's repository.
- A tag is **never removed automatically.** If a company has no report in the last 6 months, flag it for a person to decide, and check the `all.csv` and `more-than-six-months.csv` files first.
- Order `companies` by report count, most common first, as the schema comment asks.
- Only add a company to the site's set when at least three lessons would carry it.

**A small script, described here and not yet written.** It would live in `scripts/` and be run by hand, perhaps monthly:

1. **Inputs:** Sean Prashad's `questions.json`, fetched fresh from GitHub and not committed; optionally a local, uncommitted clone of snehasishroy's repository for the five uncovered problems and for new companies.
2. **Match** each lesson to the source by the slug in `practiceLink.url` (for example `/problems/two-sum/` gives `two-sum`), never by number.
3. **Normalise names** with one small alias map: `facebook` to `Meta`, `tcs` to `TCS`, `Walmart Labs` and `walmart-labs` to the chosen Walmart name, `J.P. Morgan` and `jpmorgan` to `JPMorgan Chase`, `twitter` and `X` to the chosen X name, `goldman-sachs` to `Goldman Sachs`.
4. **Compare** with each lesson's current `companies`, applying the rules above.
5. **Print a review report** (Markdown) with one row per lesson: proposed additions with counts, tags not seen in 6 months, and the source and its `updated` date. It writes nothing to `content/`.
6. **A person** edits the `meta.json` files they agree with, runs `npm run validate`, and commits. The commit message names the source and date, and a row is added to the log below.

Before relying on the script, decide the licence question. Sean Prashad's data is CC BY-NC 4.0, and the other repositories declare no licence and are scraped from a service that forbids scraping. Using them to inform a yes/no tag, with attribution, is a much smaller step than redistributing them, but it is still the maintainer's call.

### Tag refresh log

| Date | Source (URL and its data date) | Lessons changed | Notes |
| --- | --- | --- | --- |
| (original) | Site's original data, source not recorded | all 58 | Baseline: Amazon 54, Google 26, Microsoft 25, Meta 24, Apple 10, Bloomberg 6, Uber 5, Adobe 4, LinkedIn 4, Goldman Sachs 3, Airbnb 2, Flipkart 1 |

---

## 8. Sources checked

All checked on 2026-10-08. "Fetched" means the page loaded and its content matched the description. "GitHub API" means metadata (stars, licence, last push) or file contents were read through `api.github.com`. Star counts are as of this date.

| URL | Method | Status |
| --- | --- | --- |
| https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU | Fetched | OK, dated Dec 30, 2018 |
| https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions | Fetched | OK |
| https://www.techinterviewhandbook.org/grind75/ | Fetched | OK; list renders in the browser only |
| https://www.techinterviewhandbook.org/grind75/about | Fetched | OK |
| https://www.techinterviewhandbook.org/grind75/faq | Fetched | OK |
| https://www.techinterviewhandbook.org/best-practice-questions | Fetched | OK |
| https://www.techinterviewhandbook.org/coding-interview-study-plan/ | Fetched | OK |
| https://github.com/yangshun/tech-interview-handbook | GitHub API | OK; MIT; 143k stars |
| https://github.com/open-minded13/leetcode-grind-75-solutions | GitHub API (README) | OK; third-party mirror of Grind 75, used to cross-check membership |
| https://neetcode.io/practice | Fetched | OK (page shell only) |
| https://neetcode.io/practice/practice/neetcode250 | Fetched | OK; 250 problems, 18 topics |
| https://github.com/neetcode-gh/leetcode | GitHub API | OK; MIT; last push 2026-10-07 |
| https://github.com/neetcode-gh/leetcode/blob/main/.problemSiteData.json | GitHub API (file) | OK; 450 entries |
| https://leetcode.com/studyplan/top-interview-150/ | Fetched | OK; 150 problems |
| https://github.com/logreg-n-coffee/leetcode-top-interview-150 | GitHub API (README) | OK; third-party mirror of Top Interview 150, used to cross-check membership |
| https://leetcode.com/studyplan/leetcode-75/ | Fetched | OK; 75 problems |
| https://leetcode.com/studyplan/top-100-liked/ | Fetched | OK; 100 problems |
| https://seanprashad.com/leetcode-patterns/ | Fetched | OK; 179 questions |
| https://github.com/seanprashad/leetcode-patterns | GitHub API | OK; CC BY-NC 4.0 (LICENSE file); 14.1k stars; last push 2026-10-04 |
| https://github.com/seanprashad/leetcode-patterns/blob/main/src/data/questions.json | GitHub API (file) | OK; `updated` 2026-10-04 |
| https://algomaster.io/ | Fetched | OK |
| https://github.com/ashishps1/awesome-leetcode-resources | Fetched and GitHub API | OK; GPL-3.0; 18k stars |
| https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2 | Fetched | OK |
| https://github.com/liquidslr/leetcode-company-wise-problems | Fetched and GitHub API | OK; no licence; 31.3k stars; last commit 2026-08-16 |
| https://github.com/snehasishroy/leetcode-companywise-interview-questions | Fetched and GitHub API | OK; no licence; 8.3k stars; snapshot 12 July 2026 |
| https://github.com/krishnadey30/LeetCode-Questions-CompanyWise | GitHub API | OK; no licence; 20.3k stars; last commit 2023-04-01 |
| https://github.com/hxu296/leetcode-company-wise-problems-2022 | GitHub API | OK; MIT; 11.4k stars; data May 2022 |
| https://github.com/MysteryVaibhav/leetcode_company_wise_questions | GitHub API | OK; no licence; 7.4k stars; last push 2022-03-11 |
| https://github.com/xizhang20181005/Leetcode_company_frequency | GitHub API | OK; no licence; 6.7k stars; last push 2019-12-02 |
| https://leetcode.com/company/google/ | Fetched | OK (page title "Google - LeetCode"); Premium gating not visible in fetched text |
| https://leetcode.com/subscribe/ | Fetched | OK; describes company-specific questions with frequency sorting |
| https://leetcode.com/terms/ | Fetched | OK; content is LeetCode's property; scraping prohibited |
| https://leetcode.com/discuss/interview-experience | Fetched | OK (forum shell) |
| https://www.teamblind.com/post/how-does-leetcode-get-company-tagged-questions-xcdt76kq | Fetched | OK; Jan 25, 2025 |
| https://www.geeksforgeeks.org/interview-experiences/company-interview-corner/ | Fetched | OK; last updated 21 Aug 2025 |
| https://www.glassdoor.com/Interview/index.htm | Fetched | **403** to automated fetch. Glassdoor interview review pages confirmed through search results; scraping terms taken from a third-party summary, not the original document. |
| https://git-scm.com/book/en/v2 | Fetched | OK; CC BY-NC-SA 3.0 |
| https://git-scm.com/docs | Fetched | OK |
| https://github.com/git/git-scm.com | GitHub API | OK; MIT |
| https://learngitbranching.js.org/ | Fetched | OK |
| https://github.com/pcottle/learnGitBranching | GitHub API | OK; MIT; 34k stars |
| https://docs.github.com/en/get-started/git-basics | Fetched | OK |
| https://github.com/github/docs | Fetched | OK; content CC BY 4.0, code MIT |
| https://www.atlassian.com/git/tutorials | Fetched | OK; no licence visible |
| https://missing.csail.mit.edu/2020/version-control/ | Fetched | OK; CC BY-NC-SA 4.0 |
| https://ohshitgit.com/ | Fetched | OK |
| https://dangitgit.com/en | Fetched | OK |
| https://developers.google.com/machine-learning/crash-course | Fetched | OK |
| https://developers.google.com/site-policies | Fetched | OK; CC BY 4.0 content, Apache 2.0 code |
| https://developers.google.com/machine-learning/glossary | Fetched | OK |
| https://scikit-learn.org/stable/user_guide.html | Fetched | OK; BSD; version 1.9.1 |
| https://distill.pub/ | Fetched | OK; on hiatus since 2021-07-02 |
| https://distill.pub/2017/momentum/ | Fetched | OK; CC-BY 2.0 |
| https://distill.pub/2021/gnn-intro/ | Fetched | OK; CC-BY 4.0 |
| https://statquest.org/ | Fetched | OK |
| https://mlu-explain.github.io/ | Fetched | OK |
| https://huyenchip.com/ml-interviews-book/ | Fetched | OK |
| https://github.com/d2l-ai/d2l-en | GitHub API | OK; 29.8k stars |
| https://d2l.ai/ | Fetched twice | **503**; listed through the GitHub repository instead |
| https://www.techinterviewhandbook.org/behavioral-interview/ | Fetched | OK |
| https://www.techinterviewhandbook.org/behavioral-interview-questions/ | Fetched | OK |
| https://www.amazon.jobs/content/en/our-workplace/leadership-principles | Fetched | OK; 16 principles |
| https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon | Fetched | OK |
| https://www.google.com/about/careers/applications/how-we-hire/ | Fetched | OK (title only; criteria text not in fetch) |

Checked and **left out**:

| URL | Reason |
| --- | --- |
| https://karpathy.ai/zero-to-hero.html | 503 when fetched |
| https://statquest.org/video-index/ | 503 when fetched (the main site is listed) |
| https://skills.github.com/ | Redirects to GitHub Learn; course list not visible |
| https://www.lintcode.com/problem/920/ and https://neetcode.io/problems/meeting-schedule | Possible free versions of Premium problems, but the fetched pages showed no problem content, so they could not be confirmed |
| Grind 169 per-problem list | No official data file; the page renders in the browser. Not used for membership. |
| NeetCode 250 per-problem membership | The data file has no 250 flag. Shown as NC+ and not counted. |
