# Khan Academy - Computing (khanacademy.org/computing) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt request returned a "Client Challenge" interstitial page (text: a required part of the site could not load; try another browser). That is a JS/bot gate on that one URL, so **robots.txt could not be read**. The two content pages loaded normally with no challenge. Because robots was unreadable, the crawl was limited to 2 content pages: `/computing` and `/computing/computer-science/algorithms`. No login, no retry, no workaround.

## Summary and business model
- Non-profit (stated: 501(c)(3)). Mission line: free, world-class education for anyone, anywhere. Free account for Student, Teacher or Family. Revenue is donations (Donate in header and body). A regional "Explore" menu covers Indian board syllabi (NCERT and state boards) beyond the global content.
- Computing section hosts partner content: Pixar in a Box, Code.org, Hour of Code.

## Sitemap / URL patterns
- `/computing` (subject hub), `/computing/computer-science` (course hub), `/computing/computer-science/<unit>` (unit page, e.g. `algorithms`, `cryptography`, `informationtheory`), then lessons as modal-style links.
- Hierarchy: Subject, Course, Unit, Lesson group (Learn / Practice), Article or Video or Exercise or Challenge.

## Features and how they work
- **Unit page**: a long page with named sections (Intro to algorithms, Binary search, Asymptotic notation, Selection sort, Insertion sort, Recursive algorithms, Towers of Hanoi, Merge sort, Quick sort, Graph representation, Breadth-first search, Further learning). Each section contains a **Learn** list (videos, articles, in-browser coding challenges) and, for many, a **Practice** block with a question count ("5 questions", "4 questions").
- Items open in a modal ("Opens a modal") so you never leave the unit page. Projects included, such as a sorting visualizer project.
- Teacher tools: sign up to assign practice and track progress.
- Content for the algorithms unit was co-created with two Dartmouth computer science professors (named on the unit page).

## Content coverage (counts)
- Computing hub shows 9 courses: Intro to computer science (Python), Computer programming (JavaScript and the web), AP/College CS Principles, Computers and the Internet, Computer science theory, Pixar in a Box, Code.org, Hour of Code, Computational Thinking.
- Computer science theory: 3 units (Algorithms, Cryptography, Information theory). Algorithms unit: 11 content sections with roughly 4 to 8 learning items each and 6 practice sets.

## Design language
- Fonts: Source Sans Pro (body) plus the Wonder Blocks design-system sans (`--wb-font-family-sans`). Assets served from `cdn.kastatic.org`.
- Components: course cards with unit lists, "Learn" and "Practice" blocks with item-type icons, left sidebar of units, accessible skip link, donate banner, teacher banner. Mastery levels (unseen, familiar, proficient, mastered) are Khan's known pattern but were not visible when logged out.
- Colour tokens not extracted.

## License / terms
Not captured on these pages. Khan Academy content is mostly CC BY-NC-SA; verify before reuse. Facts only.

## Adopt for DSAMaxxing
**P0**
- Unit structure of Learn (watch/read/try) then Practice (short question sets with counts) inside each topic.
**P1**
- Small "challenge" coding tasks inline in a lesson (implement swap, implement insert) before the full algorithm.
- Projects at the end of a unit (build your own sorting visualizer).
**P2**
- Teacher/classroom assignment and tracking; mastery levels (familiar to mastered).
