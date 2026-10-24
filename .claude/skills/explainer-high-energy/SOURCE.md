# Source: explainer-high-energy

- Repo: https://github.com/Barty-Bart/motion-graphics
- Path in repo: `skills/explainer-high-energy`
- Commit: `3d83d987d658601d8a1269eb691622bdcd427335`
- Reviewed and installed: 2026-10-24
- License: MIT (Bart, 2026)
- Verdict: installed (owner approved 2026-10-24).

Pure markdown, but SKILL.md embeds a full `render.mjs` (Playwright + ffmpeg renderer, identical in all three explainer skills) and tells Claude to `npm i playwright`, `npx playwright install chromium` and run it. See docs/research/skills.md for exactly what it does. Do not run that step without the owner's OK; the story/pacing guidance is what we use. Note: these skills say to synthesise music with WebAudio; the sound-effects skill says never to. Pick one per project.
