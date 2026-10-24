# AlgoExpert (algoexpert.io) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge), date 2026-10-24. DOM capture for `/product` (the `/` request landed on the same page); accessibility-tree capture for `/purchase`.
- robots.txt: `*` allowed except `/partners/dashboard`, `/affiliate`, `/affiliate-dashboard`. No bot check, no login. Two later attempts to fetch `/questions` timed out in REA and were dropped.
- A page meta field held a session-style token; it was ignored and not recorded.

## Summary and business model
- One-time-access interview prep product by one founder voice (video explainers, "Clement" in testimonials). Claims 200 hand-picked questions in 15 categories, 100+ hours of video, 9 solution languages, 200,000+ users.
- Pricing page: a permanent-looking flash sale ("7 products for over 80% off") with a live countdown. "All Access" = USD 59 (struck USD 343), 1 year of access, bundles 7 products: AlgoExpert, SystemsExpert, FrontendExpert, MLExpert, InfraExpert, iOSExpert, BlockchainExpert. Login (Google, GitHub, Facebook or LinkedIn) required before purchase.
- Revenue = annual access sold through bundles; heavy testimonial wall; comparison table against "Cracking the Coding Interview" and LeetCode.

## Sitemap / URL patterns
- `/product` (landing), `/purchase`, `/questions`, `/questions/<slug>` (sample: validate-subsequence), `/data-structures`, `/content`, `/reviews`, `/team`, `/jobs`, `/blog`, `/help`, `/legal`, `/privacy`, `/swe-project-contests`, `/recruiting/profile`.

## Features and how they work
- **Hero demo**: an embedded mini workspace (prompt, tests, Run, Submit, output) so visitors see the product before buying.
- **Two-part video per question**: a conceptual overview (approach, optimisation, complexity) then a code walkthrough in Python.
- **Data Structures crash course** video series (memory, complexity, structures).
- **Workspace**: in-browser editor with test cases, 9 languages (JavaScript, TypeScript, Python, Swift, Kotlin, C++, Java and others), space-time analysis on every solution.
- **4 curated timed assessments** that mimic a day of interviews; **mock interviews** with other users on a shared workspace; a **certificate** and recruiting profile that referrals can use.
- **15 category tiles** with one-line jokes as captions (Arrays, Graphs, Tries, Linked Lists, Binary Trees, Strings, DP, Searching, Sorting, Greedy, Recursion, Famous Algorithms, Heaps, BSTs, Stacks) - playful brand voice.
- Big-O explainer section ("Big O Notation Made Easy") with time and space tabs.

## Content coverage (counts)
- 200 questions, 15 categories, 100+ video hours, 4 assessments, 9 languages. Sibling products: SystemsExpert 13 questions, FrontendExpert 50, plus MLExpert, InfraExpert, iOSExpert, BlockchainExpert. Reference only.

## Design language
- Fonts in CSS: Ubuntu, Open Sans, Lato, Source Code Pro (code). Assets served from `assets.algoexpert.io` as hashed CSS bundles (not captured).
- Structure seen in the DOM (no visual render captured, so colours and layout are unverified): feature grid of titled blocks, testimonial carousel with previous/next arrows and company logos, a comparison checklist table, category tiles, an embedded sample-problem workspace in the hero.
- Motion: sale countdown ticker; carousel arrows. Palette not extracted.

## License / terms
`/legal` and `/privacy` exist (not read). Footer: Copyright 2017-2026 AlgoExpert LLC.

## Adopt for DSAMaxxing
**P0**
- Embedded live mini-demo in the landing hero (for us: a running animation of one algorithm) before any signup.
**P1**
- Short "overview then code walkthrough" structure inside each story: see the idea first, then the code.
- Category tiles with a short witty caption per topic for brand voice.
- Timed assessment bundles built from solved patterns.
**P2**
- Single-purchase annual "All Access" bundle price anchor (USD 59 against a high list price) as a test for later; recruiter profile and certificate.
