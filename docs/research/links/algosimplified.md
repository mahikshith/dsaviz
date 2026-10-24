# algosimplified.dev: URLs visited and discovered (REA crawl)

## Visited

| URL | 2026-10-24 | status | one line | login |
|---|---|---|---|---|
| https://algosimplified.dev/ | 2026-10-24 | rendered 200 | Home: hero, 2 course cards, 4 practice tracks, 3 latest articles, CTA | n |
| https://algosimplified.dev/dsa-master-sheet/ | 2026-10-24 | rendered 200 | DSA Master Sheet: 207 problems, 19 topics, filters, random picker (page + script body read) | n |
| https://algosimplified.dev/leetcode-150/ | 2026-10-24 | rendered 200 | LeetCode 150 sheet: 150 problems, 24 topics | n |
| https://algosimplified.dev/blind-75/ | 2026-10-24 | rendered 200 | Blind 75 sheet: 75 problems, 12 topics (script body read) | n |
| https://algosimplified.dev/google-sheet | 2026-10-24 | rendered 200 (accessibility tree only) | 2,627 Medium+Hard problems, 73 tags, daily challenge of 25 | n |
| https://algosimplified.dev/top-concurrency/ | 2026-10-24 | rendered 200 | Concurrency sheet: 42 prompts, 7 groups | n |
| https://algosimplified.dev/hld-sheet/ | 2026-10-24 | rendered 200 | HLD sheet: 30 prompts, 7 groups | n |
| https://algosimplified.dev/lld-sheet/ | 2026-10-24 | rendered 200 | LLD sheet: 27 prompts, 6 groups | n |
| https://algosimplified.dev/courses/ | 2026-10-24 | rendered 200 | Course catalogue, 2 courses | n |
| https://algosimplified.dev/courses/kafka-mastery/ | 2026-10-24 | rendered 200 | Kafka course: 10 lessons, 4 modules, 25-30 h | n |
| https://algosimplified.dev/courses/go-database/ | 2026-10-24 | rendered 200 | Go key-value DB course: 15 lessons, 5 modules, 80-100 h | n |
| https://algosimplified.dev/posts/ | 2026-10-24 | rendered 200 | Articles index: 8 posts, featured, categories | n |
| https://algosimplified.dev/posts/kafka-streams-tutorial/ | 2026-10-24 | rendered 200 | Sample article: long prose, tags, ad slot, related posts | n |
| https://algosimplified.dev/search/ | 2026-10-24 | rendered 200 | Search: text box, type chips, tag cloud, ad slot | n |
| https://algosimplified.dev/category/coding | 2026-10-24 | rendered 200 | Identical to home page markup | n |
| https://algosimplified.dev/robots.txt | 2026-10-24 | 200 text | Allow all except /videos; ai-train=no; AI training bots disallowed; sitemap-index | n |
| https://algosimplified.dev/site.webmanifest | 2026-10-24 | 200 json | PWA manifest, theme #0f2742 | n |
| https://algosimplified.dev/_astro/blind-75.Dx9EjP5m.css | 2026-10-24 | 200 css | Site Tailwind stylesheet used for design tokens | n |
| https://algosimplified.dev/_astro/dsa-master-sheet.astro_astro_type_script_index_0_lang.C8xdCJ9f.js | 2026-10-24 | 200 js | DSA sheet data and progress logic | n |
| https://algosimplified.dev/_astro/blind-75.astro_astro_type_script_index_0_lang.c6ZCIVf7.js | 2026-10-24 | 200 js | Blind 75 data and progress logic | n |

No page required login; no bot check, challenge or rate limit was met. `/videos` is disallowed by robots.txt and was not fetched. A click attempt on a sheet checkbox failed on a selector ambiguity and changed nothing.

## Discovered but not visited (internal)

Categories (nav and footer on every page):
- https://algosimplified.dev/category/finance
- https://algosimplified.dev/category/tutorial
- https://algosimplified.dev/category/news

Articles:
- https://algosimplified.dev/posts/kafka-monitoring-best-practices
- https://algosimplified.dev/posts/kafka-production-deployment-guide
- https://algosimplified.dev/posts/kafka-vs-rabbitmq-comparison
- https://algosimplified.dev/posts/kafka-tutorial-for-beginners
- https://algosimplified.dev/posts/algorithmic-trading-basics
- https://algosimplified.dev/posts/getting-started-with-redis
- https://algosimplified.dev/posts/redis-data-structures-deep-dive

Kafka Mastery lessons (`/courses/kafka-mastery/<id>`): 01-fundamentals, 02-producers, 03-consumers, 04-rebalancing, 05-lag-management, 06-storage, 07-streams, 08-schema-registry, 09-security, 10-production.

Go database lessons (`/courses/go-database/<id>`): 01-fundamentals, 02-data-structures, 03-concurrency, 04-wal, 05-sstables, 06-compaction, 07-tcp-server, 08-client-library, 09-transactions, 10-replication, 11-monitoring, 12-optimization, 13-deployment, 14-security, 15-capstone.

Meta and assets:
- https://algosimplified.dev/sitemap-index.xml (named in robots.txt)
- https://algosimplified.dev/og-image.svg
- https://algosimplified.dev/favicon.svg, /android-chrome-192.png, /android-chrome-512.png, /apple-touch-icon.png (manifest icons)
- https://algosimplified.dev/dsa-master-sheet/undefined (broken link on their site, from the empty YouTube field)
- https://algosimplified.dev/videos (disallowed in robots.txt; do not fetch)

External (outbound only, not visited): leetcode.com/problems/<slug>/ links from every sheet row (about 200 distinct slugs on the DSA sheet, one per row on Blind 75 and LeetCode 150, a handful on Concurrency and LLD); placeholder `#` links for Twitter and GitHub in the footer; googletagmanager.com and static.cloudflareinsights.com analytics scripts.
