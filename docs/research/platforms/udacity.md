# Udacity (udacity.com) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `*` allowed, with blocks on several `/blog/wp-admin/` paths and on query patterns `?price`, `?search`, `?coupon`, `?promo`, `?checkoutType`, `?school`; Applebot-Extended is disallowed. No bot check, no login (Log In and "Join for Free" shown, not used). A cookie preference dialog exists; not touched.
- Pages: `/catalog`, and the Nanodegree page `/course/data-structures-and-algorithms-nanodegree--nd256` (the requested `...--nd256` path redirected to that slug). Stylesheets are Next.js bundles with Chakra UI tokens; not captured.

## Summary and business model
- Project-based "Nanodegree" programs plus short courses and a Master's partnership ("Master's in AI", MBA). Home promo: "Courses that build careers" with a festival sale on all programs and an AI engineering program built with Claude.
- DSA Nanodegree pricing shown (INR): Subscription bundle 5,250/month; Subscription monthly 6,300/month (struck 6,999, 10% off); or Individual Course one-time 35,999.10. "Cancel anytime". Included: unlimited access to hundreds of courses, hands-on projects with expert feedback, career coaching and interview prep, program certificates.
- Business arm: "Udacity for Business" (skills data, cohorts, project-based learning, analytics integrations) and a Government track.

## Sitemap / URL patterns
- `/catalog` (filters: School, Price Free/Paid, Type Course / Nanodegree / Master's, Skill, Level Beginner/Intermediate/Advanced, Duration under 20 / 20-60 / over 60 hours, Sort by Most Popular / Highest Rated / Recently Updated).
- `/course/<slug>` for courses and `/course/<slug>--ndNNN` for Nanodegrees; school pages like programming and development, data science, AI.

## Features and how they work
- **Program page**: header summary (type Nanodegree, level Intermediate, 47 hours, rating 4.7 from 530 reviews, "Updated Aug 11, 2026"), pricing card with Enroll Now, "What you'll build" (four reviewed projects), "Skills you'll learn" (18 skills), Prerequisites (Basic Python, elementary algebra), a Program Outline, Career Impact, Instructors, Reviews (Udacity graduates and Trustpilot).
- **Project-based assessment**: each course ends with a project reviewed by industry professionals; downloadable syllabus.
- **Outline** shows each course with hours and each lesson with a one-line blurb.

## Content coverage (counts)
- DSA Nanodegree: 5 courses, 28 lessons, 4 projects, 47 hours. Course 1 Introduction (4 h), Course 2 Data Structures (16 h: arrays and linked lists, stacks and queues, recursion, trees, maps and hashing), Course 3 Basic Algorithms (13 h: basic algorithms, sorting, divide and conquer); the outline text for courses 4 and 5 was cut off in the capture, though the skills list includes graph algorithms, depth-first search and A* search. Projects: unscramble CS problems, implement core data structures, apply algorithms to problems, A* route planner. Marketing line: practice 100+ algorithm and data structure challenges.

## Design language
- Chakra UI (tokens `--chakra-fonts-heading`, `--chakra-fonts-condensed`), Next.js.
- Components: mega-menu by school, sale banner with link, program cards with level, hours and rating, pricing card with bundle vs monthly tabs, expandable program outline, skills chips with "+13 more", trust band (Trustpilot).
- Palette and motion not captured.

## License / terms
Not captured. Commercial copyrighted content.

## Adopt for DSAMaxxing
**P0**
- Program-page template: what you will build, skills list, prerequisites, outline with hours, projects. Strong for conversion on a paid path.
**P1**
- Four capstone-style projects per path (implement a structure, apply an algorithm, build a route planner) reviewed by auto-tests.
- Catalog filters: level, hours, free/paid.
**P2**
- Bundle vs monthly vs one-time pricing options; business/cohort offering.
