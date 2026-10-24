# Source: sound-effects

- Repo: https://github.com/Barty-Bart/motion-graphics
- Path in repo: `skills/sound-effects`
- Commit: `3d83d987d658601d8a1269eb691622bdcd427335`
- Reviewed and installed: 2026-10-24
- License: MIT (code); bundled sfx/*.ogg CC0 1.0 (Kenney, Freesound; see LICENSES.md); Mixkit sounds are NOT bundled (Mixkit Free License, downloaded at runtime)
- Verdict: installed (owner approved 2026-10-24). Ships executable code (scripts/sound_pass.py, scripts/report.py). Nothing has been run.

Every text file read; 109 OGG files are audio data listed in sfx/manifest.json. Network: sound_pass.py may curl Mixkit preview MP3s from assets.mixkit.co (URLs fixed in manifest.json). Minor: it calls Python eval() on ffprobe's frame-rate string. Full breakdown in docs/research/skills.md.
