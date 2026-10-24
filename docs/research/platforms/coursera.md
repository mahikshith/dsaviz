# Coursera (coursera.org) DSA and algorithms catalog research

## 1. Method
- Date: 2026-10-24. Tools: REA MCP `capture_browser_scenario` (launch mode, Edge/Chromium 156), parsed into `rea/coursera/`.
- robots.txt read first and respected: disallows `/search`, `/api/`, `/account/`, `/learn-perf/`, `/programs/`, `/organizations/`, and paginated `/courses?page=` beyond page 5; AI-crawler groups are additionally blocked from `/lecture/`. I stayed on public catalog pages (`/browse`, `/specializations`, `/learn`) and did not use search or the API. No bot check, CAPTCHA or rate limit met; no login.
- Pages captured (9 + 1 stylesheet): home, `/browse/computer-science`, `/browse/computer-science/algorithms`, three DSA specializations, `/learn/algorithms-part1`, `/learn/algorithmic-toolbox`. Course-level syllabus pages were read only from public module listings.
- Full URL record: `docs/research/links/coursera.md`.

## 2. Summary and business model
Marketplace of university and company courses. Observed money paths: free trial / subscription ("Included with" the Coursera Plus style plan, "Enroll for free" CTA that leads to a trial), paid certificates, Professional Certificates, full online degrees (16 in CS alone), and Coursera for Business (4,700+ companies claimed). Some courses are fully free (badge "Status: Free"; Princeton Algorithms Part I states all features are free and that no certificate is issued). Prices were not shown on the visited pages (region-based and gated). Scale in the CS category: 4,964 courses, 808 credentials, 16 degrees.

## 3. Sitemap and URL patterns
- `/browse` -> `/browse/<category>` (computer-science, data-science, business...) -> `/browse/<category>/<subcategory>` (algorithms, software-development, computer-security-and-networks, mobile-and-web-development, design-and-product).
- `/specializations/<slug>` (multi-course series), `/learn/<slug>` (single course; deep-link `?specialization=<slug>` keeps series context), `/professional-certificates/<slug>`, `/projects/<slug>` (guided projects), `/degrees/<slug>`.
- Sub-pages: `/specializations/<slug>/reviews`.
- Sitemap `/sitemap.xml`; `/llms.txt` allowed.

## 4. Features and how they work
- **Series structure**: a specialization page has tabs About, Outcomes, Courses, Testimonials, Reviews; headline stats (course count, rating from N reviews, level, months at hours per week, enrolled learners, start date such as "Starts Oct 24" for rolling cohorts); shareable certificate for LinkedIn.
- **Per-course rows** in a series: number, hours (UCSD DSA: 41 / 23 / 55 / 19 / 27 / 17), "what you'll learn" bullets, "skills you'll gain" chips.
- **Single course page**: modules listed with duration and an included-items summary (e.g. "1 video, 2 readings, 1 programming assignment"), skills and tools chips, assessment count, "learners liked this" percentage, languages count.
- **Reviews**: star distribution percentages and per-course average.
- **Skills taxonomy**: skill chips link to topic browse pages ("Data Structures And Algorithms", "Optimization", "Automation").
- **Role explorer**: CS category links jobs (e.g. Python Developer) with a median salary figure.
- **Filters**: level (Beginner, Intermediate, Advanced) tabs, "Most popular", plus `/courses` faceted browse (query pages beyond 5 are blocked for bots).
- **Badges on cards**: Free, Free trial, Top AI program, "Build toward a degree", Learner favorite (top 1%).
- **Practice**: auto-graded programming assignments (UCSD), weekly quizzes, a final exam per course (Stanford); guided projects (hands-on, free-badged).
- **Progress, streaks, gamification**: not exposed on public pages; the learner dashboard is behind login.
- **Visual teaching**: video lectures and slides; Princeton ships lecture slides as readings. No interactive visualiser in the catalog layer.
- **Company tags / problem lists**: none (course-based).

## 5. Content coverage (reference only)
- DSA-relevant series observed:
  - [Data Structures and Algorithms Specialization](https://www.coursera.org/specializations/data-structures-algorithms) (UC San Diego + HSE): 6 courses, about 5 months at 10 h/week, 4.6 from 16,777 reviews, 385,961 enrolled. Courses: Algorithmic Toolbox, Data Structures, Algorithms on Graphs, Algorithms on Strings, Advanced Algorithms and Complexity, Genome Assembly Programming Challenge. Claims ~100 programming challenges and 50 phone puzzles, language of your choice.
  - [Algorithms Specialization](https://www.coursera.org/specializations/algorithms) (Stanford, Tim Roughgarden): 4 courses (divide and conquer / sorting / randomized; graph search, shortest paths, data structures; greedy, spanning trees, DP; shortest paths revisited, NP-complete), 4.8 from 6,002 reviews, 134,911 enrolled, labelled Learner favorite.
  - [Foundations of Data Structures and Algorithms](https://www.coursera.org/specializations/boulder-data-structures-algorithms) (CU Boulder): 5 courses (searching/sorting/indexing; trees and graphs; DP and greedy; approximation and LP; advanced structures, RSA, quantum), 36 to 46 h each, 4.7 from 987 reviews, 59,870 enrolled, credit toward a degree.
  - [Algorithms, Part I](https://www.coursera.org/learn/algorithms-part1) (Princeton): 13 modules from union-find through hash tables and symbol-table applications, 1,471,893 enrolled, 4.9 from 12,153 reviews, Java, no certificate. Part II also exists ([link](https://www.coursera.org/learn/algorithms-part2)).
- Other names from the Algorithms hub: [Data Structures and Performance](https://www.coursera.org/learn/data-structures-optimizing-performance), [Merkle Tree and Cryptocurrencies](https://www.coursera.org/learn/merkle-cryptocurrencies), [Approximation Algorithms Part I](https://www.coursera.org/learn/approximation-algorithms-part-1), [Problem Solving Using Computational Thinking](https://www.coursera.org/learn/compthinking), [Algorithms: Divide and Conquer](https://www.coursera.org/learn/algorithms-divide-conquer); guided projects such as Data Structures with C and Pointers and Memory in C.

## 6. Design language
- Fonts: OpenSans (regular/semibold/light), Source Sans Pro, Merriweather for editorial; custom icon font `coursera-iconfont`. The CSS file reachable was a thin front-page bundle, so most colours are inline-tokenised.
- Palette: brand blue `#0056D2` (theme-color meta), white surfaces; card badges use light tinted chips.
- Tokens found: labs motion tokens, 150 / 300 / 500 ms durations with ease-out entrance, ease-in exit, ease-in-out standard; radius 10px on cards; link transitions .1s ease.
- Motion keyframes: labs-fade-in, slide-in-up/down, spin, bounce, shimmer skeleton.
- Components: carousels with slide indicators ("You are currently on slide 1"), sticky tab bar for page sections, stat strip, accordion FAQs, rating histogram, skill chips, university/company logo marks.
- Tone: professional, outcome-led ("job-ready", "career certificate"), calm.

## 7. Adopt for DSAMaxxing
- P0: series page template: course count, level, hours per week, rating, enrolled, a section tab bar.
- P0: per-module "what's included" summary (videos, readings, exercises) with minutes.
- P1: skills-gained chips linking to topic pages; level tabs on the catalog.
- P1: "learners liked this" percentage and a star histogram once reviews exist.
- P1: rolling start-date framing for cohorts/challenges.
- P2: "build toward" credit badges only if certificates/credentials exist.
- P2: skeleton shimmer and 150/300/500 ms motion scale.
- Avoid: paywall ambiguity; DSAMaxxing should say what is free up front.
