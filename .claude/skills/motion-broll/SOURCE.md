# Source: motion-broll

- Repo: https://github.com/Barty-Bart/motion-graphics
- Path in repo: `skills/motion-broll`
- Commit: `3d83d987d658601d8a1269eb691622bdcd427335`
- Reviewed and installed: 2026-10-24
- License: MIT (Bart, 2026); Geist fonts SIL OFL 1.1 (engine/fonts/OFL-Geist.txt); icon paths adapted from Lucide (ISC)
- Verdict: installed (owner approved 2026-10-24). Ships executable code (engine/*.js, engine/build.py, scripts/*.py, scripts/setup.sh). Nothing has been run.

Every file read. No credential access, no exfiltration, no instruction overrides. Network: setup.sh runs npm install playwright + Chromium download; templates/*.html load Google Fonts. Full breakdown in docs/research/skills.md.
