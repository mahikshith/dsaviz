# LeetCode (leetcode.com) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt was readable. `User-agent: *` blocks `/submissions`, `/api/`, `/problems/random-one-question`, `/accounts`, `/contest/*/problems`, `/playground`, `/subscription`, `/list`, `/notes`, `/session`. Nothing there blocks `/` or `/explore`.
- Pages tried: `/` and `/explore/`. Both returned the Cloudflare interstitial ("Just a moment...", "Performing security verification"). Per the guardrails the crawl **stopped here**. No retry, no workaround, no login.
- Result: **BLOCKED by bot check.** No content, design or pricing facts were captured from the live site. Nothing below is claimed beyond that.

## Summary and business model
Not captured. (Gap: needs a manual look in a normal browser by a human, or a licensed data source, before any claims are made.)

## Sitemap / URL patterns
Only what robots.txt reveals: private or dynamic areas are `/accounts`, `/subscription`, `/list`, `/notes`, `/session`, `/playground`, and `/api/`. Public structure (explore, study plans) not verified.

## Features, content coverage, design language
Not captured (blocked).

## License / terms
Not captured (blocked).

## Adopt for DSAMaxxing
- P2: Nothing adopted from this crawl. Revisit with a human-driven review if LeetCode-style features (study plans, explore cards) are wanted. Other buckets (NeetCode, etc.) already cover the pattern-list idea.
