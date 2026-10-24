# Codeforces (codeforces.com) - platform research

## Method
- Tool: REA `capture_browser_scenario` (launch, Edge, DOM), date 2026-10-24.
- robots.txt was readable. Notable rules: an explicit "AI and LLM crawlers" section disallows `/` for GPTBot, ChatGPT-User, `anthropic-ai`, `Claude-Web`, Google-Extended, PerplexityBot, CCBot and others. The general `*` rules disallow `/contest`, `/submissions`, `/problemset/status`, `/problemset/submit`, `/problemset/standings`, `/ratings`, `/user`, `/users`, `/search`, `/settings`, and more.
- Pages tried: `/` and `/problemset`. Both returned the Cloudflare interstitial ("Just a moment..."). The crawl **stopped**. No retry, no workaround, no login.
- Result: **BLOCKED (Cloudflare check) and robots.txt expressly bars AI crawlers.** Nothing was captured beyond robots.txt.

## Summary and business model, features, coverage, design, license
Not captured. Respect the site's AI-crawler disallow: do not mine this site further without a human-approved route.

## Adopt for DSAMaxxing
- P2 (idea only, not from crawl): rated problem tiers and contest-style practice are a common competitive-programming pattern. Source from CSES and AtCoder notes in this bucket instead.
