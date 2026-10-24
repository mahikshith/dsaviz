# CodeSignal (codesignal.com) research: Learn and skills offering

## 1. Method
- Date: 2026-10-24. Tools: REA MCP `capture_browser_scenario` (launch mode, Edge/Chromium 156), parsed into `rea/codesignal/`.
- robots.txt read first: only `/wp-admin/` and `/wp-content/uploads/` disallowed (admin-ajax allowed); sitemaps `sitemap_index.xml` and `/learn/sitemap.xml`. Respected. The site sets a bot-management cookie (Cloudflare, Akamai named in its cookie table) but no challenge page, CAPTCHA or rate limit appeared. The cookie consent banner was left untouched. No login.
- Pages captured (9 + 1 stylesheet group): home, `/learn`, `/learn/course-paths`, `/learn/course-paths/browse`, two DSA/interview path pages, `/cosmo`, `/skills-development/`. Learn app CSS chunks read for tokens.
- Full URL record: `docs/research/links/codesignal.md`.

## 2. Summary and business model
Two products on one domain. (a) B2B skills platform: technical and non-technical assessments, live interview IDE, AI interviewer agents (role-based personas), skills intelligence and benchmarking, sold to hiring and L&D teams with demo/pricing pages and logos such as Instacart, Brex, Dropbox, Robinhood. (b) **CodeSignal Learn**, a consumer/learner app (web plus iOS/Android "Cosmo" app): "learning paths" made of courses and hands-on practices, guided by Cosmo, an AI tutor. Learn is positioned as free to start (CTAs are "Start learning" and "Log in"); a certificate of achievement is offered per path. Learn claims 1M+ learners. Learner quotes compare it favourably with LeetCode on structure. Pricing for Learn was not shown on the visited pages.

## 3. Sitemap and URL patterns
- Marketing (WordPress/Elementor): `/platform`, `/skills-assessments`, `/ai-interviewer`, `/live-tech-interviews`, `/skills-development/`, `/pricing/`, `/customers/<name>`, `/resources/`, `/blog/`, `/blog/interview-prep/`, `/cosmo`, `/learn-app/`.
- Learn app (Next.js): `/learn` -> `/learn/course-paths` (catalogue) -> `/learn/course-paths/browse?collection=<id>&sortBy=popularity|date` -> `/learn/paths/<slug>` (path) -> course pages ("See details") and practices behind login.
- Filter facets on browse: level, collection (11), job (40), partner (5), tool (161).

## 4. Features and how they work
- **Path = ordered courses = lessons + practices**: each path states course count, practice count, total hours, difficulty badge, skill domain (e.g. Software Engineering), rating with count, learner count and tools used (Python).
- **Course cards inside a path**: numbered, lessons count, practices count, one-paragraph summary, "See details".
- **Verified skills**: path lists skills with levels (Intermediate, Advanced) such as Computer Science Fundamentals, General Programming and Algorithms.
- **Cosmo AI tutor**: context-aware chat that sees your code, gives hints, grounded in verified content, encouraging tone; the marketing page lists "improve learning effectiveness, close gaps faster, ensure mastery".
- **Mastery-based learning**: pitched as learn-by-doing with one-to-one tutoring and validated skills.
- **Certificate**: shareable "Certificate of Achievement" per path.
- **Collections and shelves**: Trending, Recently added, Most popular carousels; collections Generative AI, Business and Leadership, Interview Prep, AI and ML, Learn to Code, Data Science and Engineering.
- **Progress / streak**: not visible logged-out (login required to view); a "Turn screen time into skills time" mobile CTA indicates a habit-oriented mobile app.
- **Problem lists, company tags, topic trees**: the topic tree is the path/course structure; no public company-tag problem list on Learn (company-style prep appears as interview-prep paths).
- **Visual teaching**: not observed; lessons are text plus coding practices.

## 5. Content coverage (counts; names are facts)
- Learn catalog: 12 shown per page with "Load more"; 11 collections, 40 job filters, 161 tool filters, 5 partners (AWS, TED, Maynard, Oakley, Transform).
- DSA and interview paths (links):
  - [Mastering Algorithms and Data Structures in Python](https://codesignal.com/learn/paths/mastering-algorithms-and-data-structures-in-python): intermediate, 5 courses, 112 practices, 16 h, 4.48 from 2,566 ratings, 29,547 learners. Course themes: hashing/dictionaries/sets (7 lessons, 19 practices), sorting and searching (8, 31), linked lists/stacks/queues (7, 21), trees (7, 23), graphs (6, 18).
  - [Fundamental Coding Interview Prep with Python](https://codesignal.com/learn/paths/fundamental-coding-interview-preparation-with-python): 5 courses, 84 practices, 12 h, 4.61 from 5,760, 51,964 learners.
  - Other names: [Advanced Coding Interview Preparation with Python](https://codesignal.com/learn/paths/advanced-coding-interview-preparation-with-python) (5 / 87), Mastering Algorithms and Data Structures in Java (4 / 72), Four-Week Coding Interview Prep in Python (4 / 98), Fundamental Coding Interview Preparation with JavaScript (5 / 82), [Advanced Coding Interview Preparation with Java](https://codesignal.com/learn/paths/advanced-coding-interview-preparation-with-java) (5 / 87), [Introduction to Programming with Python](https://codesignal.com/learn/paths/introduction-to-programming-with-python) (5 / 121), Full-Stack Engineering with JavaScript (6 / 192), Journey into Data Science with Python (7 / 217).

## 6. Design language
- Fonts: Work Sans (body), a "grotesk" display face, JetBrains Mono for code.
- Palette (Learn CSS, RGB triples as CSS variables, dark theme shown): primary blue `#1062fb` family (`#377dff`, `#4888ff`, `#72a3ff`, `#0b53da`), dark navy backgrounds `rgb(25 33 57)` / `rgb(33 42 69)` / `rgb(40 49 77)`, text from `rgb(190 199 223)` to white, sky accent `#3ec8ff`, success `#199e59`/`#1bb267`, warning amber `#ffaa00`. Full light/dark semantic token set (bg, text, icon, stroke, alert) with elevated variants.
- Tokens: radius 0.375 to 1rem (mostly 0.5rem), transitions 0.15s with cubic-bezier(0.4,0,0.2,1), 0.3s secondary.
- Motion: cosmo-ai-rotate, fade-and-bounce, fade-in, ping, pulse, spin.
- Components: path card with difficulty badge, course count and practices count, horizontal scroll shelves with arrow buttons, filter accordion with counts, rating star with count, avatar-led testimonials, sticky log-in/start-learning header.
- Tone: friendly mentor voice ("meets you where you are"), skill-first, uses "practices" not "problems".

## 7. Adopt for DSAMaxxing
- P0: path model: ordered courses, each with lesson and practice counts and total hours; show counts everywhere.
- P0: semantic colour tokens in RGB-channel form with light and dark sets and elevated surfaces.
- P1: Cosmo-like contextual hint tutor that sees the user's code, tone encouraging.
- P1: browse filters with live counts (level, tool/language, collection, job).
- P1: "Trending / Recently added / Most popular" shelves.
- P2: verified-skill chips with level on completion; shareable certificate per path.
- P2: mobile-first "practice anywhere" habit CTA.
- Avoid: marketing-style cookie banners over the learning UI.
