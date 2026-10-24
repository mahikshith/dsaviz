# blog.algomaster.io

Status: not crawled. Its robots.txt explicitly disallows (Disallow: /) ClaudeBot, anthropic-ai, Claude-Web and many other AI crawlers (GPTBot, CCBot, Google-Extended, etc.). The generic rule allows posts, and the file declares `Content-Signal: search=yes, ai-input=yes, ai-train=no`. Because this agent is Claude and the operator names Anthropic crawlers as disallowed, we treated the site as off limits rather than fetch it through a generic browser UA. Only robots.txt itself was read.

## Findings
Nothing on the blog read. Note: the separate site algomaster.io was already covered in docs/research/algomaster.md (earlier pass), which already gives its topic order and pricing structure.

## Links seen
| link | what | followed |
|---|---|---|
| blog.algomaster.io/robots.txt | robots | read |
| blog.algomaster.io/sitemap.xml | sitemap listed in robots | no |

## Licence and terms
robots.txt: AI training not allowed (ai-train=no), AI input allowed; Anthropic UAs disallowed. Posts copyright the author. If the owner wants this covered, options: owner exports the post list by hand, or explicitly overrides the robots stance.

## Beginner-friendly -> Start here
n/a (not read; see algomaster.md)

## Problem ideas
n/a
