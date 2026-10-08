/**
 * Content for the Resources page: an interview preparation guide. Plain data so
 * the page renders it and the unit tests can check every id and link.
 */

/** Inline text: plain, a link (internal paths start with a slash), or inline code. */
export type Inline = string | { text: string; href: string } | { code: string };
export type Rich = Inline | Inline[];

export type Term = { term: string; text: Rich; say?: string };

export type Block =
  | { kind: 'p'; text: Rich }
  | { kind: 'h3'; text: string }
  | { kind: 'list'; ordered?: boolean; items: Rich[] }
  /** A definition list. Quiet lists show plain terms with muted descriptions. */
  | { kind: 'terms'; quiet?: boolean; items: Term[] }
  /** Numbered steps, each with an optional example of what to say. */
  | { kind: 'steps'; items: Term[] }
  /** The first cell of each row is its row header. Captions are read by screen readers. */
  | { kind: 'table'; caption: string; head: string[]; rows: Rich[][] }
  /** External or offline resources; items without href are books. */
  | { kind: 'links'; items: { label: string; href?: string; note: string }[] };

export type Section = { id: string; title: string; /** Shorter side panel label. */ nav?: string; blocks: Block[] };
export type Group = { title: string; sections: Section[] };

const pattern = (id: string, text: string): Inline => ({ text, href: `/patterns/${id}/` });
const code = (c: string): Inline => ({ code: c });

export const GROUPS: Group[] = [
  {
    title: 'Plan',
    sections: [
      {
        id: 'roadmap',
        title: 'Study roadmap',
        blocks: [
          {
            kind: 'p',
            text: 'Eight weeks at about an hour a day, five or six days a week. Each week adds new patterns and starts with a short review of the previous week. With less time, merge weeks 1 and 2 and shorten week 8, but keep the review days.',
          },
          {
            kind: 'table',
            caption: 'Eight-week study plan',
            head: ['Week', 'Focus', 'What to practise'],
            rows: [
              [
                '1',
                [pattern('two-pointers', 'Two pointers'), ', ', pattern('sliding-window', 'Sliding window')],
                'Pairs in a sorted array, palindromes, longest substring without repeats, smallest window containing a set of characters. By the end of the week, write the window loop from memory.',
              ],
              [
                '2',
                [pattern('hash-map', 'Hash lookup'), ', ', pattern('prefix-sums', 'Prefix sums')],
                'Two sum, group anagrams, first unique character, range sums, count subarrays that sum to k. Say the time and space cost of every map you add.',
              ],
              [
                '3',
                [pattern('binary-search', 'Binary search'), ', ', pattern('stack', 'Stack')],
                'Search a sorted array, then search on the answer (the smallest capacity that ships everything in d days). Valid parentheses, next greater element with a monotonic stack.',
              ],
              [
                '4',
                [
                  pattern('in-place-reversal', 'Linked list reversal'),
                  ', ',
                  pattern('fast-slow-pointers', 'Fast and slow pointers'),
                  ', ',
                  pattern('heap', 'Heap and top-k'),
                ],
                'Reverse a list and a sublist, detect a cycle, find the middle node. Kth largest element, top k frequent, merge k sorted lists.',
              ],
              [
                '5',
                [
                  pattern('breadth-first-search', 'Breadth-first search'),
                  ', ',
                  pattern('depth-first-search', 'Depth-first search'),
                  ', ',
                  pattern('matrix', 'Matrix transforms'),
                ],
                'Level-order traversal, number of islands, shortest path in a grid, tree depth and path sums. Rotate a matrix and read it in spiral order. Draw the visited set each time.',
              ],
              [
                '6',
                [pattern('backtracking', 'Backtracking'), ', ', pattern('greedy', 'Greedy choice'), ', ', pattern('intervals', 'Interval sweep')],
                'Subsets, permutations, combination sum. Merge intervals, meeting rooms, jump game. For every greedy solution, say why the local choice is safe.',
              ],
              [
                '7',
                [pattern('dynamic-programming', 'Dynamic programming')],
                'Climbing stairs, house robber, coin change, longest common subsequence, edit distance. Write the recurrence and the base cases before any code.',
              ],
              [
                '8',
                'Mixed review and mock interviews',
                'Two timed problems a day without knowing the pattern in advance. Two or three mock interviews with a friend. Re-solve every problem you marked as shaky.',
              ],
            ],
          },
        ],
      },
      {
        id: 'practise',
        title: 'How to practise',
        blocks: [
          {
            kind: 'terms',
            items: [
              {
                term: 'Brute force first, then optimise',
                text: 'Write down the simplest correct approach and its complexity before looking for a better one. It gives you a fallback answer, and it usually shows which repeated work to remove.',
              },
              {
                term: 'Timebox new problems',
                text: 'Give a new problem 25 to 30 minutes. If you are still stuck, read the approach but not the code, close it, and write the solution yourself. Mark the problem for review.',
              },
              {
                term: 'Spaced repetition',
                text: 'Re-solve each problem about 1 day, 1 week and 3 weeks after you first see it. You know a problem when you can solve it cold within the time limit, not when you recognise the answer.',
              },
              {
                term: 'Explain out loud',
                text: 'Talk through your approach as if an interviewer were listening, or record yourself. Interviewers grade communication, and long silences are the most common feedback candidates get.',
              },
              {
                term: 'Keep a log',
                text: 'One line per problem: the pattern, the key insight and the mistake you made. Read the log once a week.',
              },
              {
                term: 'Depth over count',
                text: 'Fifty problems you can re-derive are worth more than three hundred you have seen once.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Coding interviews',
    sections: [
      {
        id: 'framework',
        title: 'A framework for every problem',
        blocks: [
          {
            kind: 'p',
            text: 'A 45-minute round usually fits one medium problem or two easier ones. A rough split: 5 minutes to understand, 10 to plan, 20 to code and 5 to 10 to test. Keep talking at every step.',
          },
          {
            kind: 'steps',
            items: [
              {
                term: 'Clarify',
                text: 'Restate the problem in your own words. Ask about input size, value ranges, duplicates, negative numbers, empty input, whether the input is sorted, and what to return when there is no answer.',
                say: 'Before I start, can the array be empty, and can the values be negative?',
              },
              {
                term: 'Work through examples',
                text: 'Solve one normal example by hand, then write one or two edge cases. Doing it by hand often shows you the algorithm.',
                say: 'Let me try [2, 7, 11, 15] with target 9 by hand, then a case where no pair exists.',
              },
              {
                term: 'State the brute force',
                text: 'Describe the simplest correct approach and its complexity. Do not code it unless the interviewer asks.',
                say: 'The straightforward way checks every pair, which is O(n²) time and O(1) space. I think we can do better.',
              },
              {
                term: 'Optimise',
                text: 'Name the repeated work and the structure that removes it: a hash map for lookups, sorting plus two pointers, a window instead of recomputing. Agree on the approach before you write code.',
                say: 'If I store each value in a hash map, I can find the complement in O(1), so the whole thing is O(n). Shall I code that?',
              },
              {
                term: 'Code',
                text: 'Write clean code with clear names, and use small helper functions for separate steps. Keep narrating briefly what each block does.',
                say: 'I loop once. For each number I check whether its complement is already in the map, then add the number.',
              },
              {
                term: 'Test',
                text: 'Trace the code line by line with the small example, then run the edge cases. When you find a bug, say what was wrong and fix it calmly.',
                say: 'Tracing [3, 3] with target 6: the first pass stores 3, the second finds it. That works.',
              },
              {
                term: 'State the complexity',
                text: 'Give the final time and space and what dominates each. Mention trade-offs or follow-ups you would consider.',
                say: 'O(n) time for the single pass and O(n) extra space for the map in the worst case.',
              },
            ],
          },
        ],
      },
      {
        id: 'big-o',
        title: 'Big-O cheat sheet',
        blocks: [
          { kind: 'h3', text: 'Data structures' },
          {
            kind: 'table',
            caption: 'Time complexity of common data structure operations',
            head: ['Structure', 'Access', 'Search', 'Insert', 'Delete'],
            rows: [
              ['Dynamic array', 'O(1)', 'O(n)', 'O(1) at end, O(n) elsewhere', 'O(1) at end, O(n) elsewhere'],
              ['Sorted array', 'O(1)', 'O(log n)', 'O(n)', 'O(n)'],
              ['Linked list', 'O(n)', 'O(n)', 'O(1) at a known node', 'O(1) at a known node'],
              ['Stack, queue, deque', 'O(1) at the ends', 'O(n)', 'O(1)', 'O(1)'],
              ['Hash map or set', 'n/a', 'O(1) average', 'O(1) average', 'O(1) average'],
              ['Binary heap', 'O(1) min or max', 'O(n)', 'O(log n)', 'O(log n) to pop'],
              ['Balanced BST', 'O(log n)', 'O(log n)', 'O(log n)', 'O(log n)'],
              ['Unbalanced BST', 'O(n) worst', 'O(n) worst', 'O(n) worst', 'O(n) worst'],
            ],
          },
          {
            kind: 'list',
            items: [
              'Appending to a dynamic array is O(1) amortised: an occasional resize copies everything, but it averages out.',
              'Hash map operations are O(1) on average and O(n) in the worst case when many keys collide. Interviewers accept O(1) unless they ask.',
              'Building a heap from n items at once (heapify) is O(n); pushing them one by one is O(n log n).',
              'Slicing an array or concatenating strings in a loop copies data, which can quietly turn O(n) into O(n²).',
            ],
          },
          { kind: 'h3', text: 'Sorting' },
          {
            kind: 'table',
            caption: 'Sorting algorithms compared',
            head: ['Algorithm', 'Average', 'Worst', 'Extra space', 'Stable'],
            rows: [
              ['Merge sort', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
              ['Quicksort', 'O(n log n)', 'O(n²)', 'O(log n)', 'No'],
              ['Heapsort', 'O(n log n)', 'O(n log n)', 'O(1)', 'No'],
              ['Timsort (Python, Java objects)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
              ['Insertion sort', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
              ['Counting sort (values in 0..k)', 'O(n + k)', 'O(n + k)', 'O(n + k)', 'Yes'],
            ],
          },
          { kind: 'h3', text: 'Graphs and searches' },
          {
            kind: 'table',
            caption: 'Graph traversal and search algorithm complexity',
            head: ['Algorithm', 'Time', 'Space', 'Use it for'],
            rows: [
              ['Breadth-first search', 'O(V + E)', 'O(V)', 'Shortest path when every edge has the same cost'],
              ['Depth-first search', 'O(V + E)', 'O(V)', 'Connected components, cycles, all paths'],
              ['BFS or DFS on a grid', 'O(rows × cols)', 'O(rows × cols)', 'Islands, flood fill, shortest steps'],
              ['Topological sort', 'O(V + E)', 'O(V)', 'Ordering tasks with dependencies'],
              ['Dijkstra with a binary heap', 'O((V + E) log V)', 'O(V)', 'Shortest path with non-negative weights'],
              ['Binary search', 'O(log n)', 'O(1)', 'Sorted data, or a yes/no condition that flips once'],
              ['Backtracking over subsets', 'O(n · 2ⁿ)', 'O(n)', 'Generating every subset'],
              ['Backtracking over permutations', 'O(n · n!)', 'O(n)', 'Generating every ordering'],
            ],
          },
        ],
      },
      {
        id: 'clues',
        title: 'Pattern recognition clues',
        blocks: [
          {
            kind: 'p',
            text: 'Words in the problem statement often point to a pattern. Treat these as first guesses to test against the constraints, not rules.',
          },
          {
            kind: 'table',
            caption: 'Signals in a problem and the pattern to try',
            head: ['Signal in the problem', 'Pattern to try'],
            rows: [
              ['Sorted array; find a pair or triplet with a target sum; compare from both ends', [pattern('two-pointers', 'Two pointers')]],
              ['Longest or shortest contiguous subarray or substring that meets a condition', [pattern('sliding-window', 'Sliding window')]],
              ['Many range-sum queries; count subarrays that sum to k', [pattern('prefix-sums', 'Prefix sums')]],
              ['Sorted input; “the smallest value such that” a condition holds', [pattern('binary-search', 'Binary search')]],
              ['“Have I seen this before?”; counting frequencies; finding a complement in one pass', [pattern('hash-map', 'Hash lookup')]],
              ['Matching brackets; undo; next greater or smaller element; evaluating expressions', [pattern('stack', 'Stack')]],
              ['k largest, k smallest or k most frequent; merge k sorted lists; running median', [pattern('heap', 'Heap and top-k')]],
              ['Reverse a list or part of one in place; reorder nodes with O(1) extra space', [pattern('in-place-reversal', 'Linked list reversal')]],
              ['Detect a cycle; find the middle; kth node from the end', [pattern('fast-slow-pointers', 'Fast and slow pointers')]],
              ['Fewest steps; shortest path in an unweighted graph or grid; level by level', [pattern('breadth-first-search', 'Breadth-first search')]],
              ['Explore every path; connected components; tree depth or path sums', [pattern('depth-first-search', 'Depth-first search')]],
              ['“Return all” combinations, permutations or subsets; constraint puzzles', [pattern('backtracking', 'Backtracking')]],
              ['A locally best choice that you can argue is always safe: scheduling, furthest reach', [pattern('greedy', 'Greedy choice')]],
              ['“Number of ways”, “minimum cost” or “longest” with overlapping subproblems', [pattern('dynamic-programming', 'Dynamic programming')]],
              ['Overlapping ranges; meeting rooms; merge or insert intervals', [pattern('intervals', 'Interval sweep')]],
              ['Rotate, transpose or spiral through a 2D grid; set rows and columns in place', [pattern('matrix', 'Matrix transforms')]],
            ],
          },
          {
            kind: 'p',
            text: [
              'Constraints help too. With n up to about 20, exponential backtracking is fine; up to 10⁵ or 10⁶ you need O(n log n) or better. Browse ',
              { text: 'all patterns', href: '/patterns/' },
              ' for the full list.',
            ],
          },
        ],
      },
      {
        id: 'mistakes',
        title: 'Common mistakes',
        blocks: [
          {
            kind: 'list',
            items: [
              'Coding before the interviewer agrees with the approach. Get a nod first, or you may build the wrong thing well.',
              'Going quiet for minutes. Say what you are trying, even when you are unsure it will work.',
              'Skipping clarifying questions and missing a constraint. A sliding window over sums, for example, only works when the numbers are non-negative.',
              '“Testing” by re-reading the code. Trace real values through it instead.',
              'Off-by-one errors in loop bounds and binary search. Decide whether each bound is inclusive or exclusive before you write the loop.',
              'Forgetting edge cases: empty input, a single element, all duplicates, very large values that overflow fixed-width integers.',
              'Getting the complexity wrong by forgetting the cost of sorting, of copying slices or strings, or of the recursion stack.',
              'Reciting a memorised solution. Interviewers ask follow-ups, and a solution you cannot explain does not score.',
              'Treating hints as failure. Taking a hint and running with it scores far better than staying stuck.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Behavioural interviews',
    sections: [
      {
        id: 'star',
        title: 'The STAR method',
        blocks: [
          {
            kind: 'p',
            text: 'STAR gives every story the same shape so the interviewer can follow it. Aim for about two minutes per answer, and spend most of it on what you did.',
          },
          {
            kind: 'table',
            caption: 'The four parts of a STAR answer',
            head: ['Part', 'What to cover', 'Share of the answer'],
            rows: [
              ['Situation', 'The context: the team, the project and what was at stake. Just enough to follow the story.', 'About 15%'],
              ['Task', 'Your responsibility or the goal you were given.', 'About 10%'],
              ['Action', 'What you did and why, step by step. Say “I”, not “we”.', 'About 60%'],
              ['Result', 'The outcome, with numbers if you have them, and what you learned.', 'About 15%'],
            ],
          },
          { kind: 'h3', text: 'A worked example' },
          { kind: 'p', text: 'Question: “Tell me about a time you disagreed with a teammate about a technical decision.”' },
          {
            kind: 'terms',
            items: [
              {
                term: 'Situation',
                text: 'In my final-year project, four of us built a web app for booking study rooms at the university library. Three weeks before the demo, the booking page took about six seconds to load.',
              },
              {
                term: 'Task',
                text: 'I owned the backend. A teammate wanted to rewrite the frontend in a different framework because he believed it was the cause. I thought a rewrite was too risky with three weeks left, but neither of us had evidence yet.',
              },
              {
                term: 'Action',
                text: 'Instead of arguing, I suggested we spend one afternoon measuring before deciding. I profiled the page and found it made one API call per room, about 120 calls, each running its own database query. I showed the team the numbers and proposed a single endpoint that returned all rooms with one query. I also offered to pair with my teammate on the frontend change so we could check his concern about rendering at the same time, and we agreed to revisit the rewrite if the page was still slow.',
              },
              {
                term: 'Result',
                text: 'Load time dropped from about six seconds to under one second, and we did not need the rewrite. We finished two days early and used the time for testing. I learned to bring measurements to a disagreement early, because it turns a clash of opinions into a shared problem.',
              },
            ],
          },
          {
            kind: 'list',
            items: [
              'The situation and task take under 30 seconds.',
              'The action is in the first person and shows judgement, not just effort.',
              'The disagreement is handled with evidence and respect; nobody is blamed.',
              'The result has a number and a lesson.',
            ],
          },
        ],
      },
      {
        id: 'questions',
        title: 'Questions to prepare',
        blocks: [
          {
            kind: 'p',
            text: 'Most behavioural questions are variations on a few themes. Prepare one or two stories for each theme and adapt them to the exact wording. Under each question is what the interviewer is really checking for.',
          },
          { kind: 'h3', text: 'Conflict' },
          {
            kind: 'terms',
            quiet: true,
            items: [
              { term: 'Tell me about a time you disagreed with a teammate or your manager.', text: 'Whether you disagree with reasons and respect, and commit once a decision is made.' },
              { term: 'Describe a time you worked with someone who was difficult to work with.', text: 'Empathy, and whether you look for the cause instead of assigning blame.' },
              { term: 'Tell me about a time you received critical feedback.', text: 'Whether you listen without getting defensive and actually change something.' },
            ],
          },
          { kind: 'h3', text: 'Failure' },
          {
            kind: 'terms',
            quiet: true,
            items: [
              { term: 'Tell me about a time you failed.', text: 'Ownership and honesty. Pick a real failure with real consequences and show what you changed afterwards.' },
              { term: 'Describe a mistake you made that affected other people.', text: 'Whether you raised it quickly and fixed the process, not just the one instance.' },
              { term: 'Tell me about a deadline you missed or nearly missed.', text: 'Planning, early communication, and how you trade scope against time.' },
            ],
          },
          { kind: 'h3', text: 'Leadership' },
          {
            kind: 'terms',
            quiet: true,
            items: [
              { term: 'Tell me about a time you led without formal authority.', text: 'Influence: persuading with reasons and helping others succeed.' },
              { term: 'Describe a time you helped a teammate grow or get unblocked.', text: 'Whether you make the team better, not only yourself.' },
              { term: 'Tell me about a time you took ownership of something outside your role.', text: 'Initiative, and judgement about when to step in.' },
            ],
          },
          { kind: 'h3', text: 'Ambiguity' },
          {
            kind: 'terms',
            quiet: true,
            items: [
              { term: 'Tell me about a time the requirements were unclear.', text: 'Whether you ask questions, make reasonable assumptions and check them early.' },
              { term: 'Describe a time you had to learn something new quickly.', text: 'How you learn: which sources, small experiments, and when you ask for help.' },
              { term: 'Tell me about a time priorities changed in the middle of a project.', text: 'Adaptability, and whether you explain the impact of the change to others.' },
            ],
          },
          { kind: 'h3', text: 'Impact' },
          {
            kind: 'terms',
            quiet: true,
            items: [
              { term: 'What project are you most proud of?', text: 'Your specific contribution, and whether you can explain technical depth simply.' },
              { term: 'Tell me about a time you improved a process or a system.', text: 'Whether you notice problems unprompted and measure the improvement.' },
              { term: 'Describe a time you went beyond what was asked.', text: 'Motivation and judgement: the extra effort should have mattered to someone.' },
            ],
          },
        ],
      },
      {
        id: 'story-bank',
        title: 'Build a story bank',
        blocks: [
          {
            kind: 'p',
            text: 'Write six to eight stories once, then map them to questions. One strong story usually answers three or four different questions. Copy the columns below into a document and fill in your own rows.',
          },
          {
            kind: 'table',
            caption: 'Story bank template with example rows',
            head: ['Story', 'Situation', 'Your action', 'Result with numbers', 'Answers questions about'],
            rows: [
              [
                'Booking page speed-up',
                'Final-year project; the booking page took six seconds to load three weeks before the demo',
                'Profiled the page, found 120 API calls, proposed one batched endpoint, paired with the teammate who disagreed',
                'Load time from 6 s to under 1 s; finished two days early',
                'Conflict, technical decisions, impact',
              ],
              [
                'Migration bug',
                'Internship; my data migration script skipped rows with empty email fields',
                'Caught it in a staging check, told my mentor the same day, fixed it and added a test for empty fields',
                '2,300 rows restored before release; empty-field checks added to the review checklist',
                'Failure, mistakes, ownership',
              ],
              [
                'Setup guide',
                'New joiners took about three days to get the development environment running',
                'Wrote a setup script and a one-page guide, then asked two new joiners to try it and fixed what confused them',
                'Setup time down to half a day; the team adopted the guide',
                'Impact, initiative, going beyond what was asked',
              ],
            ],
          },
          {
            kind: 'list',
            items: [
              'Use numbers: time saved, users affected, error rates, money, or counts. An estimate is fine if you say it is one.',
              'Draw on projects, internships, open source, part-time jobs and clubs. Non-technical stories work well for conflict and leadership.',
              'Keep each story as bullet points, not a script, and rehearse it aloud.',
            ],
          },
        ],
      },
      {
        id: 'ask-them',
        title: 'Questions to ask them',
        blocks: [
          {
            kind: 'p',
            text: 'Have two or three ready, and ask ones whose answers you actually want to know. Your questions show what you care about.',
          },
          { kind: 'h3', text: 'About the work' },
          {
            kind: 'list',
            items: [
              'What does a typical week look like for someone in this role?',
              'What would you expect a new engineer to have done after three months? After six?',
              'What is the team working on now, and what is the hardest part of it?',
            ],
          },
          { kind: 'h3', text: 'About the team' },
          {
            kind: 'list',
            items: [
              'How are code reviews and technical decisions handled on the team?',
              'How does the team support new engineers: onboarding, mentoring, pairing?',
              'How do you handle on-call and production incidents?',
            ],
          },
          { kind: 'h3', text: 'About the interviewer' },
          {
            kind: 'list',
            items: ['What do you enjoy most about working here?', 'What has changed most since you joined?'],
          },
          {
            kind: 'p',
            text: 'Avoid questions the careers page already answers. Leave salary and benefits for the recruiter unless the interviewer brings them up.',
          },
        ],
      },
    ],
  },
  {
    title: 'System design',
    sections: [
      {
        id: 'design-framework',
        title: 'A system design framework',
        nav: 'A framework',
        blocks: [
          {
            kind: 'p',
            text: 'Junior and new-graduate rounds rarely expect a perfect design. They check that you structure the conversation, ask about requirements and can explain trade-offs. This split fits a 45-minute round.',
          },
          {
            kind: 'steps',
            items: [
              {
                term: 'Requirements (5 minutes)',
                text: 'Functional: what users can do, such as shorten a URL and follow a short link. Non-functional: scale, latency, availability and consistency. Agree on what is out of scope.',
              },
              {
                term: 'Estimates (5 minutes)',
                text: 'Rough numbers for users, requests per second, the read-to-write ratio and storage per year. A day has about 86,400 seconds, so a million requests a day is about 12 per second on average. Round freely.',
              },
              {
                term: 'API (5 minutes)',
                text: [
                  'List the main operations with their inputs and outputs, for example ',
                  code('POST /urls {longUrl} → {code}'),
                  ' and ',
                  code('GET /{code} → redirect'),
                  '.',
                ],
              },
              {
                term: 'Data model (5 minutes)',
                text: 'The entities, their key fields and how they are queried. The access patterns decide the database, not the other way round.',
              },
              {
                term: 'High-level design (10 minutes)',
                text: 'Draw clients, load balancer, services, databases, caches and queues. Walk one request from end to end.',
              },
              {
                term: 'Deep dives (10 minutes)',
                text: 'Pick the one or two hardest parts, or ask the interviewer which interests them: generating unique short codes, hot keys, fan-out, consistency.',
              },
              {
                term: 'Trade-offs (the remaining time)',
                text: 'Say what you chose and what you gave up: SQL or NoSQL, fresh data or cache hits, synchronous or queued work. Name the bottlenecks and what you would monitor.',
              },
            ],
          },
        ],
      },
      {
        id: 'building-blocks',
        title: 'Building blocks',
        blocks: [
          {
            kind: 'terms',
            items: [
              { term: 'Load balancer', text: 'Spreads requests across identical servers and stops sending traffic to unhealthy ones. Reach for it as soon as you have more than one app server.' },
              { term: 'Cache', text: 'An in-memory store such as Redis for read-heavy data that can be slightly stale. It cuts latency and database load; decide how entries expire and are invalidated.' },
              { term: 'Relational database', text: 'PostgreSQL or MySQL. The default choice: structured data, joins, transactions and strong consistency.' },
              { term: 'Key-value or document store', text: 'DynamoDB, Cassandra or MongoDB. For simple lookups by key at very high scale or flexible schemas, at the cost of joins and multi-row transactions.' },
              { term: 'Message queue', text: 'Kafka, RabbitMQ or SQS. Decouples producers from consumers, absorbs traffic spikes, and moves slow work such as emails or video processing off the request path.' },
              { term: 'CDN', text: 'Serves images, video and static files from locations close to users, so they never reach your servers.' },
              { term: 'Object storage', text: 'S3-style storage for large files and uploads. Keep the file there and only its key in the database.' },
              { term: 'Replication', text: 'Copies of the database for read scaling and failover. Replicas can lag behind the primary, so a read may briefly return old data.' },
              { term: 'Sharding', text: 'Splitting data across machines by a key when one machine cannot hold the data or the write load. Choose a key that spreads load evenly; queries across shards get expensive.' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Machine learning',
    sections: [
      {
        id: 'ml-topics',
        title: 'What machine learning interviews ask',
        nav: 'What gets asked',
        blocks: [
          {
            kind: 'p',
            text: [
              'Expect concept questions before any modelling. The ',
              { text: 'machine learning page', href: '/ml/' },
              ' has step-by-step visual walkthroughs of many of the algorithms below.',
            ],
          },
          {
            kind: 'terms',
            items: [
              {
                term: 'Bias and variance',
                text: 'High bias means the model is too simple and underfits: error is high on both training and validation data. High variance means it fits noise and overfits: training error is low but validation error is high. More data helps variance, not bias.',
              },
              {
                term: 'Overfitting and regularisation',
                text: 'Spot it as a gap between training and validation error. Reduce it with more data, a simpler model, L2 regularisation (shrinks weights), L1 (pushes some weights to exactly zero), dropout or early stopping.',
              },
              {
                term: 'Train, validation and test sets',
                text: 'Fit parameters on the training set, choose models and hyperparameters on the validation set, and use the test set once at the end. Use k-fold cross-validation on small datasets, split by time for time series, and fit preprocessing such as scaling on training data only to avoid leakage.',
              },
              {
                term: 'Precision, recall and F1',
                text: 'Precision = TP / (TP + FP): of the items you flagged, how many were right. Recall = TP / (TP + FN): of the real positives, how many you found. F1 is their harmonic mean. Favour recall when misses are costly, such as disease screening, and precision when false alarms are costly, such as spam filtering.',
              },
              {
                term: 'ROC-AUC',
                text: 'The ROC curve plots the true positive rate against the false positive rate across all thresholds. AUC is the chance that a random positive scores higher than a random negative; 0.5 is guessing. With heavy class imbalance, precision-recall curves say more, and plain accuracy misleads: predicting “negative” every time scores 99% when 99% of examples are negative.',
              },
              {
                term: 'Gradient descent',
                text: 'Repeatedly move the parameters a small step against the gradient of the loss. The learning rate sets the step: too large diverges, too small crawls. Batch, stochastic and mini-batch versions differ in how many examples each step uses. Scaled features converge faster.',
              },
            ],
          },
          { kind: 'h3', text: 'Common models' },
          {
            kind: 'table',
            caption: 'Common models with one strength and one weakness each',
            head: ['Model', 'Strength', 'Weakness'],
            rows: [
              ['Linear regression', 'Fast, interpretable, a good baseline', 'Assumes a linear relationship; sensitive to outliers'],
              ['Logistic regression', 'Outputs probabilities; coefficients are easy to explain', 'Linear decision boundary unless you engineer features'],
              ['Decision tree', 'Handles non-linear patterns and mixed feature types', 'Overfits easily; small data changes can change the tree'],
              ['Random forest', 'Averaging many trees reduces variance; strong default', 'Larger, slower and harder to interpret'],
              ['Gradient boosting', 'Often the most accurate on tabular data', 'Many hyperparameters; trains sequentially; can overfit'],
              ['k-nearest neighbours', 'No training step; simple to explain', 'Slow predictions on large data; needs scaled features'],
              ['k-means', 'Simple, fast clustering without labels', 'You must choose k; assumes compact, similarly sized clusters'],
              ['Neural network', 'Learns features from images, text and audio', 'Needs a lot of data and compute; hard to interpret'],
            ],
          },
        ],
      },
      {
        id: 'ml-design',
        title: 'ML system design checklist',
        blocks: [
          {
            kind: 'steps',
            items: [
              { term: 'Frame the problem', text: 'Turn the business goal into an ML task (classification, ranking, regression) and define the label. Ask whether a simple rule would do.' },
              { term: 'Data', text: 'Where it comes from, how labels are collected, volume, class balance, freshness and privacy. Check for leakage: features that will not exist at prediction time.' },
              { term: 'Features', text: 'Which signals predict the label, and how each is computed for training and for serving. Differences between the two cause training-serving skew.' },
              { term: 'Baseline, then model', text: 'Start with a heuristic or logistic regression, and justify anything more complex by how much it beats the baseline.' },
              { term: 'Offline evaluation', text: 'A metric that matches the goal (recall for fraud, precision at k for ranking), a split that mirrors real use (by time or by user), and error analysis on important slices.' },
              { term: 'Serving', text: 'Batch or real-time predictions, the latency budget, model size, and how features are fetched at request time.' },
              { term: 'Online evaluation', text: 'An A/B test on a business metric, with guardrail metrics that must not get worse.' },
              { term: 'Monitoring and retraining', text: 'Watch input drift and the prediction distribution, plan for delayed labels, set a retraining schedule and keep a way to roll back.' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Git',
    sections: [
      {
        id: 'git',
        title: 'Git commands you will be asked about',
        nav: 'Commands you will be asked about',
        blocks: [
          {
            kind: 'p',
            text: [
              'Interviewers rarely test exact syntax, but they do ask how you would recover from common situations. The ',
              { text: 'Git page', href: '/git/' },
              ' shows what each command does to the commit graph.',
            ],
          },
          {
            kind: 'table',
            caption: 'Common Git situations and the command for each',
            head: ['Situation', 'Command', 'What it does'],
            rows: [
              ['Start a feature', [code('git switch -c feature-x')], 'Creates a branch at the current commit and switches to it.'],
              ['See what changed', [code('git status'), ', ', code('git diff'), ', ', code('git diff --staged')], 'Status lists changed files; diff shows unstaged changes; diff --staged shows what the next commit will contain.'],
              ['Commit part of your work', [code('git add -p'), ', ', code('git commit')], 'Stages chosen pieces of a file, then records a snapshot.'],
              ['Combine branches', [code('git merge main')], 'Joins two histories with a merge commit; history stays as it happened.'],
              ['Keep history linear', [code('git rebase main')], 'Replays your commits on top of main as new commits. Do not rebase commits others have pulled.'],
              ['Undo a pushed commit', [code('git revert <commit>')], 'Adds a new commit that reverses it, without rewriting history.'],
              ['Undo local commits', [code('git reset --soft HEAD~1')], 'Moves the branch back one commit. --soft keeps the changes staged; --hard discards them.'],
              ['Put work aside', [code('git stash'), ', ', code('git stash pop')], 'Shelves uncommitted changes and brings them back later.'],
              ['Copy one commit to another branch', [code('git cherry-pick <commit>')], 'Applies that commit’s change as a new commit on the current branch.'],
              ['Recover a lost commit', [code('git reflog')], 'Lists where HEAD has been, so you can branch or reset back to a commit that seems lost.'],
              ['Find the commit that broke something', [code('git bisect')], 'Binary search through history: you mark commits good or bad until one is left.'],
              ['Get remote changes', [code('git fetch'), ', ', code('git pull')], 'Fetch downloads commits without touching your branch; pull is a fetch followed by a merge or rebase.'],
            ],
          },
          { kind: 'h3', text: 'Questions that come up' },
          {
            kind: 'terms',
            items: [
              { term: 'Merge or rebase?', text: 'Merge keeps the true history and is safe on shared branches. Rebase gives a cleaner, linear history but rewrites commits, so use it on branches only you work on.' },
              { term: 'Reset or revert?', text: 'Reset moves a branch back and rewrites history, so keep it to local commits. Revert adds a commit that undoes another and is safe after pushing.' },
              { term: 'How do you resolve a merge conflict?', text: 'Open each conflicted file, choose or combine the changes between the conflict markers, run the tests, then stage the files and continue the merge or rebase.' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'The day itself',
    sections: [
      {
        id: 'the-day',
        title: 'Before, during and after the interview',
        nav: 'Before, during, after',
        blocks: [
          { kind: 'h3', text: 'Before' },
          {
            kind: 'list',
            items: [
              'Check your setup the day before: camera, microphone, internet, screen sharing and the coding tool they will use. Turn off notifications.',
              'Know the format: how many rounds, who you will meet, which languages are allowed and whether you can run code.',
              'Warm up with an easy problem you have solved before, not a new hard one.',
              'Have water, paper and a pen nearby, and sleep properly rather than cramming one more problem.',
            ],
          },
          { kind: 'h3', text: 'During' },
          {
            kind: 'list',
            items: [
              'Think aloud: say what you are considering, including approaches you reject and why.',
              'Ask clarifying questions before coding, and confirm the approach before you write it.',
              'If you are stuck, say exactly where, for example “I am not sure how to avoid recomputing the window sum.” After a few minutes, ask for a hint.',
              'Watch the time. If it is running out, describe the remaining steps instead of leaving half-written code unexplained.',
              'Test your code before you say you are done.',
            ],
          },
          { kind: 'h3', text: 'After' },
          {
            kind: 'list',
            items: [
              'Send a short thank-you note to the recruiter within a day. Mention one specific thing you discussed and keep it to a few lines.',
              'Write down the questions you were asked and where you struggled while you still remember, and add them to your review log.',
              'If nobody told you the timeline, ask the recruiter. Do not judge the result by how it felt; candidates often misread their own performance.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Further reading',
    sections: [
      {
        id: 'reading',
        title: 'Further reading',
        nav: 'Curated links',
        blocks: [
          { kind: 'h3', text: 'Coding practice' },
          {
            kind: 'links',
            items: [
              { label: 'LeetCode', href: 'https://leetcode.com/', note: 'The largest problem bank; most interview questions or close variants are here, tagged by topic.' },
              { label: 'NeetCode', href: 'https://neetcode.io/', note: 'Curated problem lists grouped by pattern, each with a video explanation.' },
              { label: 'Tech Interview Handbook', href: 'https://www.techinterviewhandbook.org/', note: 'A free guide to the whole process: resumes, coding rounds, behavioural questions and negotiation.' },
              { label: 'Grind 75', href: 'https://www.techinterviewhandbook.org/grind75', note: 'A study schedule that adjusts to the weeks and hours you have; an updated take on Blind 75.' },
              { label: 'Blind 75', note: 'The original list of 75 LeetCode problems covering the core patterns. Search for it on the LeetCode discussion forum.' },
              { label: 'Big-O Cheat Sheet', href: 'https://www.bigocheatsheet.com/', note: 'Complexities of common data structures and sorting algorithms on one page.' },
            ],
          },
          { kind: 'h3', text: 'System design' },
          {
            kind: 'links',
            items: [
              { label: 'System Design Primer', href: 'https://github.com/donnemartin/system-design-primer', note: 'A free, thorough guide with diagrams, building blocks and worked examples.' },
              { label: 'Designing Data-Intensive Applications, Martin Kleppmann', note: 'Book. How databases, replication, partitioning and stream processing work; the best long-form background for design rounds.' },
            ],
          },
          { kind: 'h3', text: 'Git' },
          {
            kind: 'links',
            items: [
              { label: 'Pro Git', href: 'https://git-scm.com/book', note: 'The free official book. Chapters 2 and 3 cover nearly everything interviews ask.' },
              { label: 'Learn Git Branching', href: 'https://learngitbranching.js.org/', note: 'Interactive browser exercises for branching, merging and rebasing.' },
            ],
          },
          { kind: 'h3', text: 'Machine learning' },
          {
            kind: 'links',
            items: [
              { label: 'Machine Learning Specialization, Andrew Ng', href: 'https://www.coursera.org/specializations/machine-learning-introduction', note: 'A beginner-friendly course covering regression, classification, trees and unsupervised learning.' },
              { label: 'StatQuest', href: 'https://www.youtube.com/@statquest', note: 'Short, clear videos on statistics and machine learning concepts, from p-values to gradient boosting.' },
              { label: 'scikit-learn user guide', href: 'https://scikit-learn.org/stable/user_guide.html', note: 'Practical explanations of each model and of evaluation metrics, with code.' },
            ],
          },
          { kind: 'h3', text: 'Books' },
          {
            kind: 'links',
            items: [
              { label: 'Cracking the Coding Interview, Gayle Laakmann McDowell', note: 'Book. Problems by topic, plus chapters on the interview process and behavioural questions.' },
            ],
          },
        ],
      },
    ],
  },
];

/** Side panel groups, one item per section. */
export const NAV = GROUPS.map((g) => ({
  title: g.title,
  items: g.sections.map((s) => ({ id: s.id, label: s.nav ?? s.title })),
}));
