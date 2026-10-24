# System design bucket links (REA crawl, 2026-10-24)

Format: URL | date | status | one line | login
robots.txt read via curl for each host first; REA used for page captures.

## Visited with REA
https://www.hellointerview.com/ | 2026-10-24 | 200 | home: tracks, premium pricing teaser | n
https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction | 2026-10-24 | 200 | SD course intro, full sidebar of concepts, deep dives, patterns, ~30 breakdowns | n
https://www.hellointerview.com/pricing | 2026-10-24 | 200 | 1 month / 1 year / lifetime Premium | n
https://www.hellointerview.com/learn/system-design/problem-breakdowns/bitly | 2026-10-24 | 200 | free breakdown: requirements, API, deep dives graded bad/good/great | n
https://www.hellointerview.com/learn/low-level-design/in-a-hurry/introduction | 2026-10-24 | 200 | LLD intro, LLD vs HLD, interview rubric | n
https://www.hellointerview.com/terms | 2026-10-24 | 200 | terms: personal non-commercial, no scraping or competitive viewing | n
https://www.designgurus.io/ | 2026-10-24 | 200 | home: courses, learner counts, sale banner | n
https://www.designgurus.io/terms | 2026-10-24 | 200 | terms: content owned, personal non-commercial only | n
https://highscalability.com/ | 2026-10-24 | 200 | Ghost blog home, latest posts to 2024, course link | n
https://dataintensive.net/ | 2026-10-24 | 200 | DDIA book marketing page, (c) Kleppmann | n
https://refactoring.guru/design-patterns/catalog | 2026-10-24 | 200 | 22 GoF patterns + refactoring catalog | n
https://refactoring.guru/design-patterns/strategy | 2026-10-24 | 200 | per-pattern page shape (Intent..Code Examples) | n
https://refactoring.guru/terms | 2026-10-24 | 200 | terms; only eBook license mentioned, no open licence | n
https://github.com/ashishps1/awesome-low-level-design | 2026-10-24 | 200 | 27.6k stars, GPL-3.0, LLD topics and 40+ problems | n
https://github.com/prasadgujar/low-level-design-primer | 2026-10-24 | 200 | 8k stars, question list, license TODO | n
https://github.com/tssovi/grokking-the-object-oriented-design-interview | 2026-10-24 | 200 | 6.4k stars, 16 OOD case studies in Python, no licence shown | n
https://github.com/kilimchoi/engineering-blogs | 2026-10-24 | 200 | 38.8k stars, engineering blog index, no licence shown | n
https://github.com/karanpratapsingh/system-design | 2026-10-24 | 200 | 46.6k stars, ~55-chapter course README, custom licence | n
https://github.com/binhnguyennus/awesome-scalability | 2026-10-24 | 200 | 75k stars, MIT, scalability reading list | n
https://github.com/topics/low-level-design | 2026-10-24 | 200 | topic page: 560 public repos | n
https://github.com/kousiknath/LowLevelDesign | 2026-10-24 | 200 | 526 stars, MIT, 29 LLD problems in Java | n
https://github.com/madhank93/learn-system-design | 2026-10-24 | 200 | 155 stars, no licence shown | n

## robots.txt (curl)
https://www.hellointerview.com/robots.txt | 2026-10-24 | 200 | Allow / | n
https://designgurus.io/robots.txt | 2026-10-24 | 200 | allow except admin/dashboard/course-play/aff paths | n
https://refactoring.guru/robots.txt | 2026-10-24 | 200 | blocks admin, checkout, order paths only | n
https://highscalability.com/robots.txt | 2026-10-24 | 200 | blocks ghost/members api paths only | n
https://dataintensive.net/robots.txt | 2026-10-24 | 200 | comments only, no Disallow | n
https://github.com/robots.txt | 2026-10-24 | 200 | repo roots and /topics allowed; tree/raw/search not touched | n

## Attempted, not captured
https://www.designgurus.io/course/grokking-the-system-design-interview | 2026-10-24 | gap | REA connection closed / timeout / over 10 MB cap on repeated tries | n
https://www.designgurus.io/course/grokking-the-object-oriented-design-interview | 2026-10-24 | gap | not captured (same cause) | n
https://www.designgurus.io/system-design-interview | 2026-10-24 | gap | response over 10 MB budget | n
https://www.designgurus.io/system-design-interview/framework | 2026-10-24 | gap | connection closed twice | n
https://www.designgurus.io/pricing | 2026-10-24 | gap | not captured (connection closed in a batch, not retried) | n

## Discovered, not visited
Hello Interview: /learn/low-level-design, /learn/low-level-design/problem-breakdowns/parking-lot, /learn/system-design/core-concepts/{caching,sharding,cap-theorem,consistent-hashing,numbers-to-know}, /learn/system-design/patterns/*, /learn/system-design/in-the-wild/*, /learn/system-design/deep-dives/*, /blog/staff-level-system-design (login-free but not opened)
Design Gurus: /course/grokking-system-design-fundamentals, /course/grokking-system-design-interview-ii, /path/System-Design-Interview-Playbook, /system-design-interview/concepts, /system-design-interview/questions, /problemset, /courses
refactoring.guru: /design-patterns/{singleton,observer,factory-method,...} (22 pattern pages), /design-patterns/{what-is-pattern,history,classification,criticism}, /refactoring/catalog
dataintensive.net: /buy.html, /translations.html, /poster.html; O'Reilly TOC page
GitHub: InterviewReady/Low-Level-Design, kumaransg/LLD, TharunKumarReddyPolu/LLD-Handbook-for-Coding-Interviews, naqushab/ScalerAcademy, anomaly2104/lld-parking-lot
