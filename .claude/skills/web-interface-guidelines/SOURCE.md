# Source: web-interface-guidelines

- Repo: https://github.com/vercel-labs/web-interface-guidelines
- Path in repo: command.md (rules) and AGENTS.md (kept as RULES-MUST-SHOULD.md)
- Commit: 434b7f91364665f2f733b310ec54809bf8f37937
- Licence: MIT (repo-root LICENSE, copied here; Vercel Labs 2025)
- Reviewed and installed: 2026-11-01 (security review in docs/research/skills-2026-11.md)
- Contents: instruction files only (markdown). No scripts, hooks, settings, MCP config, binaries or network calls.

Notes: SKILL.md is command.md with our own frontmatter (name, description) added and CRLF line endings removed; the body is unchanged. install.sh (curl downloads into several agent folders) and the sibling vercel-labs/agent-skills 'web-design-guidelines' skill (fetches command.md from GitHub at use time) were NOT installed.
