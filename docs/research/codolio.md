# Codolio (codolio.com) research

## 1. Method

- Date: 2026-10-24. Source: REA MCP server only (`mcp__rea__capture_browser_scenario`, launching Edge, DOM captured after each step; home page also with network response bodies; stylesheets mined with a token script). No login, no web search.
- 18 pages captured: home, event-tracker, help-center, FAQ article, leaderboard, public profile, profile card, question-tracker (redirects to onboarding), onboarding, Google sheet, Amazon sheet, pricing, timeline, refund-and-cancellation, and 4 help articles (leaderboard, workspace, sheets, key features). See `links/codolio.md`.
- Compliance: no robots.txt fetch was made by this crawl (not checked); no bot check or rate limit was met. Only public pages were loaded.
- Limits: all logged-in screens (workspace, my sheets, notes, profile editor, GitHub tracker) were not seen directly; they are described from the help articles and the JS API names. Sheet tables show only about 7 preview rows to a logged-out visitor. Counts below are as displayed on 2026-10-24.
- Everything here is paraphrased. Problem titles are not reproduced beyond generic category examples.

## 2. Summary and business model

Codolio is a "coding portfolio tracker": one profile that pulls solve counts, ratings, streaks and contests from many practice sites, plus a question tracker (sheets, notes, spaced revision), a contest calendar, a leaderboard and a GitHub/dev tab. It does NOT host problems; it links out to LeetCode, GFG etc.

Business model: freemium. Free: profile, tracker, leaderboard, calendar, popular/topic sheets. Paid: the Company Wise Kit (21 company sheets, recency filters, popularity labels). Plus sponsored promotion slots (a config named `codolio-promotions` drives banners in dashboard, event tracker, profile sidebar and a floating profile slot; the live ones were for a third-party course provider, labelled "Promoted"). Payment via Razorpay; no auto-renew; strict no-refund policy except duplicate/failed charge claims within 7 days.

Pricing as shown (INR, with a public 25% coupon applied, valid to end of 2026):

| Plan | Price now | List | Note |
|---|---|---|---|
| 3 months | 849 | 1099 | about 283/month |
| 6 months | 1299 | 1899 | about 217/month |
| Unlimited ("Most Popular") | 1499 | 2199 | one-time, lifetime |

The pricing page compares itself with free generic sheets (no company targeting, static) and subscription interview sites (stated as 13,500+/year recurring), positioning the one-time price as best value. Claims "100K+ engineers trust" and "150,000+ engineers preparing"; the leaderboard shows 44,421 entries. Weekly sheet updates are claimed.

## 3. Sitemap and URL patterns

Visited (public):
- `/` home; `/event-tracker`; `/leaderboard`; `/timeline`; `/help-center`; `/help-center/article/<slug>`; `/profile/<handle>`; `/profile/<handle>/card`; `/question-tracker` (redirects to `/question-tracker/onboarding`); `/question-tracker/sheet/premium/<company>_all?category=company-wise`; `/question-tracker/sheet/premium/pricing` (also `?sheet=meta`); `/refund-and-cancellation`.
- Unvisited: `/login`, `/login?redirect=<path>`, `/contact-us`, `/support`, `/privacy-policy`, `/terms-and-conditions`, `/question-tracker?tab=explore|workspace|mySheets|notes`, `/profile` (own, login), 14 more help articles, 19 more company sheets, 10 more profile handles from the leaderboard.
- Patterns: login redirect always carries `?redirect=<encoded path>`; company sheet id is `<company>_all`; outbound links carry `?utm=codolio`; help articles are slug-based, in four sections (Getting Started, Profile Tracker, Question Tracker, Event Tracker) plus FAQ sub-pages (Profile and Account, Platform Integration, Codolio Card, Question Tracking and Analytics, Support and General).
- Shell: left sidebar (Home, Profile Tracker > Portfolio, Question Tracker > Company Wise Kit / My Workspace / Explore Sheets / My Sheets / Notes, Event Tracker > Contests, Community > Leaderboard, Support > Help Center / Feedback), top strip with a gold "Company Wise Kit" promo link and Login, footer: FAQ, Contact, Privacy, Timeline, Terms, Refund, social links.

## 4. Features and how they work

**Platform aggregation / portfolio.** The user adds a handle per platform on a setup page, then "verifies" it (verified badge per platform; only verified profiles rank on the leaderboard and unlock the dev card). Supported (help FAQ): LeetCode, GeeksforGeeks, CodeStudio, InterviewBit, CodeChef, Codeforces, AtCoder, HackerRank; the maintenance config also lists a `tuf` key. Stats refresh automatically (timeline: auto refresh since Aug 2024). Fetching reads public profile data, so LeetCode users must make recent-accepted and submission details public (FAQ). The public profile shows: name, handle, bio, location, college, per-platform verified tiles with "visit profile", global rank by C Score, profile views, public/private visibility, totals (questions solved, active days, submissions, max streak, current streak), an activity heatmap by month with expand, contests attended split by platform with a rating chart and last contest, an awards count with skill badges, and a "DSA Topic Analysis" with distributions by category (fundamentals / DSA / competitive programming), by platform, and by difficulty with per-platform sub-counts, plus rating cards per contest site with max rating and title.

**Profile card ("Codolio Card").** `/profile/<handle>/card` is a compact shareable card: name, handle, two headline numbers (questions solved, active days), free-form hashtag chips (languages/skills), a "view profile" button. Tabs for Problem Solving and Development variants. Marketed as shareable on social feeds (the home page mocks a social post).

**Heatmap and streaks.** Backed by `/v1/user/activity` and `/v1/user/streak` (names seen in the bundle). Heatmap spans months with current and max streak; "active days" is a headline metric and a C Score input.

**C Score.** Single score from 500 to 900 combining four areas: DSA practice (total solved and hard count heavy; medium moderate; easy light), development (commits, PRs heavy; stars moderate; language count light), competitive programming (contest rating and contest count heavy; practice solved light), consistency/community (active days heavy; longest streak moderate; profile views barely). Drives the global rank.

**Leaderboard.** `/leaderboard`: podium for top 3 plus a table (name, handle, institution, rank, score), 10 per page (4,443 pages), tabs for four boards (C Score, Total Questions, LeetCode Rating, Codeforces Rating), each with Global/College/Country variants. Logged-out visitors see a "create profile to see your rank" prompt. Only verified users are ranked.

**Question tracker, sheets, workspace.** Four tabs: Explore Sheets, My Sheets, My Workspace, Notes. Explore groups: Popular (well-known community sheets), Mastery (topic-wise), Competitive Programming, Quick Revision, Company Wise (paid). A sheet must be "followed" before marking progress. Smart sync: solving a problem anywhere marks it in every sheet containing it. Custom sheets: create, add by pasting a URL (difficulty/topic auto-fetched), bulk import from CSV/XLSX (required column problem URL, optional topic and sub-topic), nested topic > subtopic > question with drag-reorder, public/private, collaborators by email (edit access; progress stays private). Workspace: one list of every tracked problem with tags, filters and notes; one note can be linked to many problems; standalone notes tab. Add via a floating plus button, via sheets, or via a Chrome extension (one click from the problem page, launched Oct 2024).

**Revision / retention.** Spaced repetition: after solving or revising, rate confidence 1-4 (Struggled, Tough, Got it, Nailed it); next visit ranges from "very soon" to "two weeks or more". A daily queue of up to 5 due questions refreshes at midnight, unlocks after 20 solved, and builds a revision streak. A "Retention Rating" averages per-question memory levels that decay with days since last rating; guidance: above 70% is good, below 50% means slow down. API names: `/v1/revisions/daily`, `/v1/revisions/submit`, `/v1/revisions/regenerate-daily`, `/v1/revisions/entry/<id>`.

**Company-wise kit.** See section 5. Each sheet page: description, "last updated N days ago", recency tabs (All Time Favourite, 45 Days, 6 Months, plus an Interview beta tab), Interview Pattern Distribution and Difficulty Distribution charts, filter chips (Difficulty, Platforms, Topics, Popularity, Favourites), table columns: question, platform, difficulty, popularity badge (Very Hot / Hot / Warm / Cold), revision button, actions. Logged-out users see about 7 rows then an unlock banner.

**Event tracker.** `/event-tracker`: "Contest Calendar" for October 2026 listing 45 contests grouped by day with time ranges, name, and "N users subscribed", a Filters control, subscribe/reminder (login), and an outbound link per contest. Platforms: LeetCode (weekly, biweekly), Codeforces (rounds), CodeChef (Starters, placement-prep weekends, Monday DSA challenge series), AtCoder (ABC, ARC, AGC, AHC, special). Launched Jul 2024.

**Timeline / changelog.** `/timeline`: 11 dated entries Jul 2024 to Dec 2024 (launch, CodeStudio, HackerRank, Event Tracker, Dark theme, Auto refresh, Question Tracker, AtCoder, Profile Verification, Extension, GitHub Tracker); layout and density toggles and a "jump to" control.

**GitHub / dev tracker.** Connect GitHub via SSO, show contribution stats, add project cards (stack, screenshots, demo link) with upvotes.

**API surface (node.codolio.com).** Captured on home: `GET /api/config/v1/get-config/{announcementBar|maintenance|codolio-promotions}`, `GET /api/billing/v1/coupons/user/get`. Seen in bundle: `/v1/plans/get-all`, `/v1/coupons/validate`, `/v1/payments/create-order`, `/v1/payments/order/verify`, `/v1/payments/order/permission`, `/v1/subscription/user/status`, `/v1/user-config`, `/v1/onboarding`, `/v1/notifications`, `/v1/notifications/seen`, `/v1/profile-customization`, `/v1/user/activity`, `/v1/user/streak`, `/v1/revisions/*`. The maintenance config is notable: a JSON switch for global, per-module (profile, question tracker, event tracker, leaderboard) and per-platform maintenance with start/end time and message. Analytics: Microsoft Clarity and a product-analytics SDK (feature flags, surveys, tours).

## 5. Content coverage

- 21 company sheets (listed alphabetically here, not in their order): Adobe, Amazon, Apple, Atlassian, Bloomberg, Flipkart, Google, IBM, Infosys, JPMorgan, LinkedIn, Meta, Microsoft, Nvidia, Oracle, PayPal, Salesforce, TCS, Uber, Visa, Walmart. Curated lists are treated as reference only: this file records sizes, fields and UI mechanics, not their content or ordering. The pricing page says "15+". Links: `https://codolio.com/question-tracker/sheet/premium/<name>_all?category=company-wise` (lowercase name; only Google and Amazon visited).
- Sheet sizes seen: Google 250 questions (28 easy, 168 medium, 54 hard); Amazon 150 (18 / 104 / 28). Both are medium-heavy. Others not visible.
- Previews show only well-known classic problems (about 7 rows each, all marked Very Hot); the same problems recur across the two companies seen. No sample list is reproduced here.
- Named free sheets from help text: a famous SDE sheet, Blind 75, DP and Graph mastery sheets, CP-31, A20J ladders; counts not visible.
- The profile topic analysis in the logged-out view is by difficulty and platform rather than named DSA topics.

## 6. Design language

- Stack: Next.js (App Router, `/_next/static`), Tailwind, dark-mode class. Fonts: Poppins (self-hosted via next/font) for everything; Monoton for a display accent.
- Dark palette: page `#111010`, panels `#18181b`, raised/borders `#27272a`, muted text `#a1a1aa` and `#71717a`. Accent orange `#ff7a00` / `#f57c06` / `#f97316` (buttons, links, highlights); gold for the Company Kit promo.
- Per-platform colour tokens (fill / text / outline, light and dark variants) for CodeChef, AtCoder, Codeforces, LeetCode, GFG, TUF, InterviewBit, LintCode, CodeStudio, HackerRank: soft tinted chips rather than logos.
- Radius: mostly 0.5rem and 6-10px, 0.75rem for cards. Transitions 150ms ease-in-out. Keyframes: border (animated gradient border via an angle variable), marquee (logo/company strip), scroll, plus bounce/ping/pulse/spin.
- Components: left sidebar nav, sticky top strip with promo, stat tiles, heatmap, podium + table, pill filters, difficulty/popularity badges, pricing cards with struck-through list price, comparison table, FAQ accordion, timeline with density toggle.
- Copy tone: friendly, imperative, benefit-led ("Never miss a contest", "Simplify your prep", "10x your selection chances"); emoji in nav and changelog; social-proof counts everywhere; scarcity via coupon labels.

## 7. Adopt for DSAMaxxing (static site, localStorage only)

P0
1. Spaced-repetition revision queue. Why: strongest retention hook and fully client-side. How: per problem store last rating (1-4) and date in localStorage; due date from a fixed interval table (1d, 3d, 7d, 14d+); a "today's 5" card; unlock after N solved; a retention percent from simple exponential decay.
2. Local progress dashboard (solved, active days, current/max streak, heatmap, difficulty and topic split). Why: gives the "portfolio" feel without accounts. How: log a dated entry on each solve/visualise; render heatmap with CSS grid/SVG; JSON export/import for backup.
3. Single progress store ("smart sync"). Why: one mark shows everywhere. How: key by problem id; all lists read the same record.
4. Tags and notes per problem, with one note linkable to many. Why: cheap and differentiating. How: notes map by id in localStorage; tag filter chips.

P1
5. Company/recency tabs and popularity badges on curated lists (our own data and wording, not copied). How: static JSON with company, recency bucket, heat level; filter chips for difficulty, topic, heat.
6. Shareable card (client-rendered PNG, no personal data) with two headline stats and hashtag chips.
7. Composite score (our own formula) from solved depth, consistency, breadth, shown locally; skip global ranking.
8. Contest calendar: static JSON of recurring contests with add-to-calendar links; no subscriber counts.
9. Changelog page with dated entries.

P2
10. Custom lists with CSV paste/import (URL, topic, subtopic) and drag reorder.
11. Per-source colour chips and dark theme with one orange-style accent and tinted tags.
12. Banner driven by a static JSON file (announcements/maintenance).
13. Public-profile share links need a backend; offer an export file instead. Do not copy the paywall/no-refund model; keep DSAMaxxing free or tip-supported.
