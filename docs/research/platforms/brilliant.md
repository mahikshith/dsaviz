# Brilliant (brilliant.org) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: per-bot sections (Googlebot, Slurp, Yandex, msnbot) disallow `/profile/*/followers`, `/profile/*/following`, `/account/*`, `/classroom/`, `/testing/*`. No bot check, no login (Sign in seen, not used). A privacy-preference dialog was present; not interacted with.
- Pages: `/` and `/courses/` (the `/courses/computer-science/` request landed on the Topics hub). Pricing page not fetched. Stylesheets identified (`/_next/static/chunks/*.css`) but not captured.

## Summary and business model
- Now positioned as "your personal tutor for math and coding": AI-guided tutoring layered on interactive lessons. Claims: 10M+ learners, 100,000+ five-star app reviews, accredited by ACS WASC, COPPA certified, built by "top learning experts from MIT and Harvard". Two audiences: "I'm a learner" and "I'm a parent or teacher" (school deals).
- Subscription model: links to `/subscribe/` and `/gift-premium/`, an educators area and a homeschool start page. Prices are on pages that were not fetched.

## Sitemap / URL patterns
- `/` home, `/courses/` (Topics hub with category tabs: Math, Basic Algebra, Algebra, Adv Algebra, Adv Math, Logic, Everyday Math, Math Fun, CS, Python, Technology, Data, Science), `/coding-skills/`, `/practice/`, `/assessments/`, `/subscribe/`, `/gift-premium/`, `/educators/`, `/start/homeschool/`, `/welcome/`, `/about/`, `/help/`, `/terms-of-use/`, `/privacy/`.

## Features and how they work
- **Visual, interactive tutoring**: it "sees your work and notices when you are off track", asks guiding questions and explains with interactive visuals.
- **Help on demand**: photo of schoolwork can be shared for review.
- **Comprehensive skill mastery**: sequenced concepts and targeted practice until you can solve independently.
- **Adaptive learning plan**: a diagnostic places you, then the plan adapts as you progress.
- **Progress tracking**: dashboard of what is mastered and what is next.
- Home groups each subject as expandable lists of "Covered topics" (with "N additional topics").

## Content coverage (counts)
- Math tracks: Foundations, Algebra, Probability and Statistics, Calculus, Mind-Bending Math. Coding tracks: Python, Computer Science, Technology, AI.
- Computer Science track shows 24 named topics plus 16 more. Named topics include Pseudocode, Greedy algorithms, Proving correctness, Arrays, Binary search, Sorting algorithms, Big-O notation, Graphs and graph search. Python track shows 25 topics plus 17 more (e.g. Recursion, The call stack, Linked lists, Binary search trees, Hidden runtime costs). Topic hub cards carry a grade or level tag (Foundational, Intermediate, Advanced) and a New badge.

## Design language
- Next.js app; system UI font stack for the marketing pages. Inline CSS custom fonts not extracted.
- Components: hero with audience toggle, accordion topic lists with chip rows, a research-backed section, three-up feature cards, review wall, level tags on course cards. The lesson screens themselves were not captured; the home copy only describes them as visual and interactive.
- Palette and motion not captured.

## License / terms
Not captured. Commercial content; facts only.

## Adopt for DSAMaxxing
**P0**
- Bite-size interactive questions between visual steps (predict the next pointer move, pick the next state) - active recall instead of passive watching.
**P1**
- Diagnostic quiz at signup that places the learner on the path and builds a plan.
- Level tags (foundational, intermediate, advanced) on every topic card and "covered topics" chip lists with a "+N more".
**P2**
- AI tutor that sees the learner's current step and asks a guiding question; school/teacher channel.
