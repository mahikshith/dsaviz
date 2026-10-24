# GeeksforGeeks (inbox pass 1): limited by robots.txt, no content pages read

Date: 2026-10-25. Owner's favourite beginner source and top priority, so this needs an owner decision.

## robots.txt (https://www.geeksforgeeks.org/robots.txt), read and respected
- `User-agent: *`: disallows /wp-admin/, /community/, /search/, /wp-content/plugins/, /connect/, /content-override.php. The four requested paths (/explore, /dsa/..., /data-science/..., /machine-learning/...) are not disallowed for generic agents.
- Named blocks with `Disallow: /` (whole site): CCBot, **anthropic-ai**, cohere-ai, Bytespider. Applebot is blocked from /tag/ and /category/.
- ClaudeBot, Claude-Web, GPTBot, ChatGPT-User and PerplexityBot are present only as commented-out lines (inactive).
- Decision: this crawl is run by an Anthropic AI agent, and the site explicitly refuses `anthropic-ai`. Following the brief ("if it disallows AI agents, honour it") and the same call made for blog.algomaster.io, none of the four target pages or any other GfG content page was fetched. Status: **limited by robots.txt**. No bot check, CAPTCHA or rate limit was met (only robots.txt was requested). No archived or alternate copies used.

## Licence and terms
Not read (terms page not fetched). Nothing recorded; assume all rights reserved until checked. Facts-only in any case.

## Findings
None from the site. The topic orders asked about (zero-to-DSA sequence, tutorial sequencing, ML and data-science intro order) are an open gap.

## Links seen
| URL | date | status | note |
|---|---|---|---|
| https://www.geeksforgeeks.org/robots.txt | 2026-10-25 | read | anthropic-ai disallowed site-wide |
| https://www.geeksforgeeks.org/explore | 2026-10-25 | not fetched | robots limit |
| https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/ | 2026-10-25 | not fetched | robots limit |
| https://www.geeksforgeeks.org/data-science/data-science-for-beginners/ | 2026-10-25 | not fetched | robots limit |
| https://www.geeksforgeeks.org/machine-learning/introduction-machine-learning/ | 2026-10-25 | not fetched | robots limit |

## Beginner-friendly: feed "Start here"
Nothing from this pass. Options for the owner:
1. Read the four pages himself and paste the topic order into the inbox (we then write our own pages from it).
2. Explicitly authorise a read using a generic browser agent, accepting that the site's rules name AI agents. We recommend against.
3. Rely on existing coverage already in docs/research (beginners.md, core-programming.md, ml-data-science.md) plus the NeetCode findings (neetcode.md).

## Problem ideas
None from this pass.
