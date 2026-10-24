# prachub.com extract

REA's launched browser (capture_browser_scenario, 2026-10-24) got a Cloudflare bot check (title 'Just a moment...') on two attempts, including a 15-second wait. Our rule is that a bot check means no automated crawling, so nothing past the challenge page was collected. Data gathered earlier through a separately opened browser was deleted and is not used.

The only facts captured: the site sits behind Cloudflare's managed challenge with Turnstile, and the challenge page carries a robots noindex,nofollow meta tag.
