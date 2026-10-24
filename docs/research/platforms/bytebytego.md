# ByteByteGo (bytebytego.com) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24. Calls needed a 90 s timeout; one early multi-page attempt timed out and was retried one page at a time (no bot check shown).
- robots.txt: `User-agent: *` / `Allow: /`, with sitemaps `/sitemap.xml`, `/guides/sitemap-0.xml`, `/courses-sitemap.xml`, `/exercises-sitemap.xml`. Allowed. No Cloudflare/CAPTCHA/rate-limit seen. Not logged in.
- Pages captured: `/`, `/guides` (visual guide index), `/pricing`, `/courses/coding-patterns` (redirected to the free first chapter "Introduction to Two Pointers"), `/courses/system-design-interview` (redirected to free chapter "Scale From Zero To Millions Of Users"), and 4 CSS bundles.
- `terms-of-service` and individual guide articles not fetched (note gap in links file).
- Next.js app; most course chapters are paywalled beyond preview chapters.

## Summary and business model
- Paid interview-prep publisher run by Alex Xu's team ("Written by Amazon bestselling authors"). Claims 1M+ newsletter subscribers, 5M learners, 100,000+ success stories, 4.6/5 over 4,000 book reviews.
- Revenue: courses sold individually or as an all-in-one bundle with 50% launch-sale framing (Lifetime "pay once, own forever" or One-Year access; prices shown in local currency, INR on our capture), book sales, newsletter (Substack) funnel, affiliate and contributor programmes, live courses ("Become an AI Engineer"), "Ask Alex" AI trained on their books. Refunds not available; free chapters and the free Visual Guides are the funnel. Text-based courses with illustrations, not video.

## Sitemap and URL patterns
- `/` home; `/guides` (blog/visual guides index) -> `/guides/<category>/` (15 categories) and `/guides/<article-slug>/`; `/courses/<course-slug>` -> `/courses/<course>/<chapter-group>/<lesson-slug>`; `/pricing`, `/our-team`, `/jobs`, `/be-an-affiliate`, `/become-a-contributor`, `/privacy-policy`, `/terms-of-service`. Sitemaps split into guides, courses, exercises.
- Courses: system-design-interview, coding-patterns, behavioral-interview, object-oriented-design-interview, machine-learning-system-design-interview, mobile-system-design-interview, genai-system-design-interview, tech-resume.
- Open-source companion: GitHub `ByteByteGoHq/system-design-101` (89K+ stars shown on the guides page).

## Features and how they work
- **Visual Guides index**: heading "Engineering Visual Guides - succinct graphical explanations to engineering topics"; Share, Subscribe, Download Bundle buttons; 15 category cards each with an infographic thumbnail and count; a "Recent Guides" grid of 12 cards, each with a title and category tag; "View 400 Guides". Each guide is a single dense infographic with short text.
- **Course reader**: left chapter outline with numbered chapters and completion counter ("0/120 completed", "0/31 completed"), lessons nested under chapters, main column of article text with numbered figures and code tabs (Python / JavaScript / Java / C++), "Chapter outline" at bottom; sticky "Unlock Full Access with 50% off" bar and Login. Free preview chapters, rest locked.
- **Progress tracking**: per-course completed counter for logged-in users.
- **Coding Patterns course**: 19 pattern chapters (120 lessons) each opening with an "Introduction to <pattern>" lesson: Intuition, Strategies, When To Use, Real-world Example, then problem lessons.
- **Search/animation**: no step-through code visualizer observed; visuals are static diagrams and figure sequences in the text, which is the model's strength.

## Content coverage
- Visual guide categories (15, ~404 guides total from the category counts; count appears before the category name on the page): API and Web Development 50, Real World Case Studies 32, AI and Machine Learning 8, Database and Storage 47, Technical Interviews 5, Caching & Performance 29, Payment and Fintech 20, Software Architecture 24, DevTools & Productivity 20, Software Development 28, Cloud & Distributed Systems 49, How it Works 18, DevOps and CI/CD 27, Security 35, Computer Fundamentals 12. Category links: `https://bytebytego.com/guides/<slug>/` (api-web-development, real-world-case-studies, ai-machine-learning, database-and-storage, technical-interviews, caching-performance, payment-and-fintech, software-architecture, devtools-productivity, software-development, cloud-distributed-systems, how-it-works, devops-cicd, security, computer-fundamentals).
- Sample guide links (about 10): [CI/CD pipeline](https://bytebytego.com/guides/cicd-pipeline-explained-in-simple-terms/), [How search engines work](https://bytebytego.com/guides/how-do-search-engines-work/), [OAuth 2.0](https://bytebytego.com/guides/oauth-2-explained-with-siple-terms/), [Learn SQL](https://bytebytego.com/guides/what-is-the-best-way-to-learn-sql/), [Good coding principles](https://bytebytego.com/guides/10-good-coding-principles-to-improve-code-quality/), [Scaling a database](https://bytebytego.com/guides/7-must-know-strategies-to-scale-your-database/), [AWS cheat sheet](https://bytebytego.com/guides/aws-services-cheat-sheet/), [Network protocols](https://bytebytego.com/guides/explaining-8-popular-network-protocols-in-1-diagram/), [How Docker works](https://bytebytego.com/guides/how-does-docker-work/), [How ChatGPT works](https://bytebytego.com/guides/how-does-chatgpt-work/).
- Course structure: System Design Interview 31 entries (foreword, community, then 28 chapters from scale-out basics through designs such as rate limiter, key-value store, URL shortener, chat, YouTube, payment system, stock exchange); Coding Interview Patterns 120 lessons over 19 patterns (Two Pointers, Hash Maps and Sets, Linked Lists, Fast and Slow Pointers, Sliding Windows, Binary Search, Stacks, Heaps, Intervals, Prefix Sums, Trees, Tries, Graphs, Backtracking, Dynamic Programming, Greedy, Sort and Search, Bit Manipulation, Math and Geometry). Other courses: behavioral, OOD, ML system design, mobile system design, GenAI system design, tech resume.

## Design language
- Fonts: system stack (-apple-system, Segoe UI, Helvetica Neue, Arial...), SF Mono/Monaco/Consolas for code; no webfonts loaded.
- Palette from CSS: white `#fff`, ink `#282828`/`#212529`, greys `#e9e9e9`, `#989898`, `#666`; brand green `#149f76` with light `#35cea0`, `#17b386`, mint tint `#e7f9f1`; neon accent `#b4ff00` for promo highlights.
- Components: pill buttons (`100px` radius), 12px/20px rounded cards, category tiles with illustration, top announcement banner (48 px offset var), sticky unlock bar, marquee-style horizontal scrolling testimonials/logos (`scrollit` keyframes).
- Motion: marquee scroll, spinner for access check; mostly static, illustration-led.
- Tone: confident, marketing-heavy ("Ace every stage"), plain explanatory writing in lessons with numbered figures.

## Terms / licence
- Copyright 2022-2026 ByteByteGo Inc. All rights reserved. Terms of Service not fetched. Treat all text and diagrams as protected; reference only for structure.

## Adopt for DSAMaxxing
**P0**
- Chapter outline sidebar with "n/total completed" counter for each pattern track.
- Standard lesson skeleton per pattern: Intuition, Strategies, When to use, Real-world example, then problems (our own wording).
- Free-preview funnel: first story free, deeper content gated.
**P1**
- A "visual guides" style cheat-sheet index (one infographic per pattern, category tiles with counts) to feed SEO and shareable cards.
- Numbered figures that match animation steps ("Figure 3 = step 3").
**P2**
- Newsletter and affiliate loops; launch-sale banner pattern.
- Where they are weak: no stepping visualizer. Our animated pattern stories can differentiate here.
