# HackerRank (hackerrank.com) - platform research

## Method
- Tool: REA `capture_browser_scenario` (launch, Edge, DOM), date 2026-10-24.
- Requests to `/robots.txt`, `/` and `/interview/interview-preparation-kit` all returned an Akamai-style "Access Denied" page (reference error id on errors.edgesuite.net). That is a bot/edge block. The crawl **stopped** after that single scenario. No retry, no workaround, no login.
- Result: **BLOCKED (edge access denied).** robots.txt could not be read. No content was captured.

## Summary and business model
Not captured.

## Sitemap / URL patterns
Not captured. Only the attempted paths are known: `/interview/interview-preparation-kit` (target).

## Features, content coverage, design language, license
Not captured (blocked).

## Adopt for DSAMaxxing
- P2: nothing from this crawl. If a skills-certification or "preparation kit" model is wanted, rely on the other platforms in this bucket (Educative, AlgoExpert assessments) for the pattern.
