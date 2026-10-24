# freeCodeCamp (freecodecamp.org/learn) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `User-Agent: *` / `Allow: /`; sitemap at `/news/sitemap.xml`. No bot check, no login ("Sign in to save your progress (it's free)" shown, not used).
- Pages: `/learn` (the curriculum hub). The main stylesheet `/styles.<hash>.css` is inlined in the DOM so palette tokens were readable.

## Summary and business model
- Donor-supported US 501(c)(3) charity: "our mission is to help people learn to code for free" via videos, articles and interactive lessons. No paywall, no premium plans; donations pay for servers and staff. A shop link exists in the footer.
- Programme areas on `/learn`: web certifications, English for developers, professional Spanish and Chinese (beta), interview prep, and a Microsoft-partnered C# certification.

## Sitemap / URL patterns
- `/learn` (hub), certification and block pages below it, `/news` (articles, with sitemap), a forum, radio, a podcast, a catalog, and `/learn/archive`.
- UI is localised into about 11 languages (English, Spanish, Chinese simplified and traditional, Italian, Portuguese, Ukrainian, Japanese, German, Swahili, Korean, Arabic).

## Features and how they work
- **Curriculum hub**: a single list of certifications; sign-in only to save progress (the lesson content is browsable logged out).
- **Daily coding challenge** ("coding challenge of the day") with an archive page.
- **Interview-prep shelf**: "Coding Interview Prep" plus links to The Odin Project remix, Project Euler and Rosetta Code.
- In-browser editor and test runner for lessons (known from the editor font token for Monaco in the CSS; lesson pages not captured).
- Trending Guides grid of topic chips (REST APIs, Clean Code, TypeScript, React, Docker and more).

## Content coverage (counts)
- 7 recommended certification curricula listed (Responsive Web Design, JavaScript, Front-End Libraries, Python, Relational Databases, Back-End and APIs, Certified Full-Stack Developer), plus 2 English, 1 Spanish, 1 Chinese, 1 C# certification. Interview prep: 1 curated section plus 3 external links. About 30 trending-guide chips.

## Design language
- Font: Lato (UI), Noto Sans Arabic (RTL), a Monaco-based monospace token in the editor.
- Palette tokens in `:root` (dark-first): grays `#fff #f5f6f7 #dfdfe2 #d0d0d5 #939393 #858591 #626262 #3b3b4f #2a2a40 #1b1b32 #0a0a23`; purple `#9400d3`/`#5a01a7`; gold `#ffc300`/`#f1be32`; blue `#198eee`/`#002ead`; green `#acd157`/`#00471b`; red `#f82153`/`#850000`. Both a `light-palette` and a `dark-palette` map these to foreground/background semantic tokens.
- Components: fixed header with language menu, Menu, search, Donate; bordered buttons with 1px white border; avatar frames with coloured border (gold, blue, purple) for supporter levels; accordion blocks; "Night Mode" toggle.
- Motion: minimal.

## License / terms
Footer links Academic Honesty, Code of Conduct, Privacy, Terms of Service, Copyright Policy (not read). Open source codebase; read licences per repo before reuse.

## Adopt for DSAMaxxing
**P0**
- Browse everything logged out; "sign in to save progress (it's free)" as the only gate. Pair with local storage progress.
**P1**
- Daily coding challenge with an archive page (retention loop).
- Semantic light/dark token layer (foreground/background primary to quaternary) over a raw gray ramp; dark navy-first palette suits a code-learning site.
**P2**
- Supporter-level avatar borders; multi-language UI.
