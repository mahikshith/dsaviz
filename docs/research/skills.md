# Skills review (2026-10-24)

Candidate Claude Code skills for motion graphics, explainer storytelling and visual design. Each was cloned with `git clone --depth 1` into `Desktop/skill-review/` and read file by file. Nothing from these repos was run: no scripts, builds, installs or hooks. Installed skills are in `.claude/skills/<name>/`, each with its LICENSE and a SOURCE.md.

The owner approved installing skills that ship code when the review found nothing malicious (no credential access, no hidden exfiltration, no instruction overrides). Those are marked "installed (owner approved 2026-10-24)". Their code is installed but has not been run.

## Summary

| Skill | Source | License | Verdict | Reason |
|---|---|---|---|---|
| motion-design | lottiefiles/motion-design-skill @ f9a8a04 | MIT | installed | Pure markdown. Durations, easing, choreography, Disney principles, reduced motion. |
| design-motion-principles | kylezantos/design-motion-principles @ 4a9ca87 | MIT | installed | Pure markdown + 2 script-free HTML templates. Frequency gate, create/audit workflows. |
| data-storytelling | wshobson/agents @ 0874a27 (plugins/business-analytics) | MIT | installed | Pure markdown. Story arc and progressive reveal. |
| explainer-default | Barty-Bart/motion-graphics @ 3d83d98 | MIT | installed (owner approved 2026-10-24) | Markdown, but embeds `render.mjs` and tells Claude to `npm i playwright`. Pacing rules are the value. |
| explainer-engaging | Barty-Bart/motion-graphics @ 3d83d98 | MIT | installed (owner approved 2026-10-24) | Same embedded renderer. One-take hero-through-stations story; closest match to our story scenes. |
| explainer-high-energy | Barty-Bart/motion-graphics @ 3d83d98 | MIT | installed (owner approved 2026-10-24) | Same embedded renderer. Beat-locked transitions carried by shapes. |
| motion-broll | Barty-Bart/motion-graphics @ 3d83d98 | MIT; Geist OFL 1.1; Lucide ISC | installed (owner approved 2026-10-24) | Ships an engine and scripts (below). Nothing malicious found. |
| sound-effects | Barty-Bart/motion-graphics @ 3d83d98 | MIT code; sfx CC0 1.0; Mixkit not bundled | installed (owner approved 2026-10-24) | Ships Python scripts and 109 CC0 OGG files (below). Downloads Mixkit previews at runtime. |
| object-separation | Barty-Bart/motion-graphics @ 3d83d98 | MIT | held: not installed, off-topic | Nothing malicious, but it rotoscopes video with SAM 2 (pip installs torch, downloads 156-898 MB models). Not a story or motion skill. Add it if the owner wants it. |
| impeccable | pbakaus/impeccable @ 9368675 | Apache-2.0 | rejected | Launcher downloads a platform binary from GitHub releases and execs it; installs post-edit and Stop hooks into the agent; 90 MB repo (Rust engine, CLI, browser extension, 567 KB injected browser script) that cannot be read in full. |
| canvas-design | anthropics/skills @ dbd4588 | Apache-2.0 (fonts OFL) | rejected for this project | Static poster/PDF art, not story scenes. 5.6 MB of fonts. Its "FINAL STEP" puts words in the user's mouth ("The user ALREADY said 'It isn't perfect enough'"), which we don't want steering our agents. |
| frontend-design | anthropics/skills @ dbd4588 | Apache-2.0 | not installed | Already available as a global skill; the owner rule in CLAUDE.md already points to it. |
| theme-factory, algorithmic-art | anthropics/skills @ dbd4588 | Apache-2.0 | not installed, not fully reviewed | Off-topic (slide themes; p5.js generative art). |
| video-storytelling | jkitchin/skillz | not checked | not cloned | awesomeskill.ai lists it with a security score of 0/100 and 2 stars. |
| awesome-claude | webfuse-com/awesome-claude @ a1cce8e | CC0-1.0 (list), MIT (theme) | rejected: not a skill | An awesome list plus a VS Code colour theme (TypeScript build script that only writes theme JSON). Its links were used to find candidates. |

How candidates were found: the awesome-claude README (its skill lists point to travisvn/awesome-claude-skills and BehiSecc/awesome-claude-skills), and awesomeskill.ai searches for "animation", "storytelling" and "diagram", read with the REA browser capture in Edge. The LottieFiles page on awesomeskill.ai links to github.com/lottiefiles/motion-design-skill.

No file in any installed skill tells Claude to ignore instructions, touch credentials or env secrets, send data out, or edit settings or hooks.

## Executable parts of the owner-approved skills

### explainer-default, explainer-engaging, explainer-high-energy

The three SKILL.md files are markdown, but each embeds the same `render.mjs` (byte-identical apart from one example command line) and tells Claude to save and run it.

- **Setup it asks for:** `npm i playwright`, `npx playwright install chromium` (downloads Chromium from the Playwright CDN), ffmpeg on PATH. It also tells Claude to download font woff2 files (Google Fonts or the brand's) and inline them as base64, and to web-fetch the product's site.
- **What render.mjs runs:** launches headless Chromium with `--allow-file-access-from-files`, opens the local `page.html?render`, calls `window.seek(t)` for every sub-frame and screenshots it as JPEG, pipes the frames to `ffmpeg` (libx264, tmix motion blur), then concatenates the worker segments. If the page defines `window.buildAudio`, it renders audio in an `OfflineAudioContext` inside the page, writes a `.pcm` file and muxes it with `ffmpeg -af loudnorm`. `--stills` mode writes a contact-sheet PNG.
- **Network:** none by itself. It reads `HTTPS_PROXY` / `https_proxy` from the environment only to pass to Chromium as a proxy. The page it renders could fetch things if the page's own code does.
- **Reads/writes:** reads the HTML page; writes `<out>.mp4`, `<out>_silent.mp4`, temporary `<out>_segN.mp4`, `<out>_segs.txt`, `<out>.pcm` (deleted afterwards), and for stills a `<out>.frames/` folder (deleted afterwards).

### motion-broll

- **`scripts/setup.sh <dir>`:** creates `<dir>/{clips,dist,out,work}`; checks for node, ffmpeg, python3; if numpy is missing runs `python3 -m pip install --user numpy` (falls back to `--break-system-packages`); writes `{"private":true}` to `<dir>/package.json` and runs `npm install --silent playwright` and `npx playwright install chromium` inside `<dir>`; checks ffmpeg for the `prores_ks` encoder. Network: PyPI, npm registry, Playwright's Chromium download.
- **`engine/build.py <out> clips/*.html`:** pure local file assembly. Reads each clip fragment, pulls out its `<style>`, slots and `<script>`, base64-inlines the two Geist woff2 fonts into `base.css`, and writes a self-contained HTML file per clip. No network, no subprocess.
- **`engine/motion.js`:** browser library injected into each clip page. Closed-form springs, colour tracks, cursor paths, a scene runner that sets DOM styles from `t`, `window.seek` / `window.DURATION`. Preview mode loops with `requestAnimationFrame`. No network, no storage.
- **`engine/render.js <clip.html> <out.mp4|mov> [fps]`:** launches headless Chromium via Playwright, opens the local clip with `?render`, screenshots 4 sub-frames per frame as PNG and pipes them to `ffmpeg` (tmix blur; libx264 MP4, or ProRes 4444 `.mov` with alpha when the clip is transparent). Writes only the output file. No network.
- **`engine/beats.js <clip.html> <sheet.png> t...`:** same Chromium launch; screenshots the given times into a temp dir under the OS temp folder, tiles them with `ffmpeg` into one PNG, deletes the temp dir. No network.
- **`scripts/inspect_video.py <video> <outdir>`:** runs `ffprobe` for specs, `ffmpeg` for a 4x4 contact sheet (`contact.png`) and a 96x54 grayscale frame stream, classifies frames as full / pip / black with numpy, writes `video.json`. No network.
- **`scripts/words.py <srt|vtt>`:** parses subtitles, spreads each cue's time across its words, prints `time:word` lines. Pure text, no network.
- **`scripts/composite.py <plan.json> <out.mp4>`:** builds one `ffmpeg` overlay command from `plan.json` (source video plus each clip at its in-point) and runs it. Writes the preview MP4. No network.
- **`scripts/make_pages.py <plan.json> <preview.mp4>`:** fills `templates/viewer.html` and `templates/compare.html` with the clip list (JSON-escaped), runs `ffprobe`, and for `.mov` clips runs `ffmpeg` to make an on-black MP4 preview. Writes `viewer.html`, `compare.html`, `TIMING.md` next to the preview. Minor: viewer.html puts clip titles from `plan.json` into `innerHTML` unescaped (local file, our own data).
- **`templates/viewer.html`, `templates/compare.html`:** local video players. They load the Geist font from Google Fonts. No other network.
- **`examples/opus-aoe2/*.html`:** six clip fragments using `M.scene`. No network calls.

### sound-effects

- **Setup it asks for:** `python3 -m venv .sound-effects` then `pip install librosa soundfile numpy scipy matplotlib` (PyPI). ffmpeg on PATH. It asks Claude to web-fetch Mixkit, Freesound and Kenney licence pages before export, and the user to download originals from Freesound if needed.
- **`scripts/sound_pass.py --video --cues --music --manifest --out`:** runs `ffprobe` for duration and frame rate (the frame-rate string such as `30000/1001` is passed to Python `eval()`; local tool output, low risk, but `Fraction()` would be safer). Loads the music with librosa, finds the beat grid, low-passes below 120 Hz to check kicks, plots `beatgrid.png`. Picks one sound per cue from `sfx/manifest.json`. For `runtime` entries it runs `curl -fsSL -o <out>/sound-effects-cache/<file> <url>`; the URLs are fixed in the manifest, all `https://assets.mixkit.co/active_storage/sfx/<id>/<id>-preview.mp3` (41 entries). Mixes to `mix_raw.wav`, then loops `ffmpeg` export plus `ebur128` measurement up to 10 times to hit -16 LUFS with true peak below -4 dBFS, writing `after.mp4`. Writes temp files to `/tmp/after_audio.wav` and `/tmp/cueN{a,b}.png` (hard-coded `/tmp`, so it may fail on Windows), plus `checks/cue-NN.png`, `CREDITS.txt`, `SOUND.md`. Then imports `report.py`.
- **`scripts/report.py`:** writes `report.html` (local audio players, links to each sound's source page, a button that saves `swaps.json` from the browser). No network beyond the source links the user may click.
- **`sfx/`:** 109 OGG files (about 2.7 MB) and `manifest.json` (file, category, duration, source URL, licence). All bundled files are listed as CC0 from Kenney and Freesound in `LICENSES.md`.
- **Conflict to know about:** this skill says never to synthesise music or effects in code; the explainer skills synthesise their soundtrack with WebAudio. Pick one approach per project.

## Rejected: impeccable executable parts

- `scripts/impeccable` / `impeccable.cmd`: launcher that looks for a platform binary (`$IMPECCABLE_BIN`, a sibling `bin/`, `~/.impeccable/bin`, a version-pinned cache, PATH) and, failing that, downloads it with curl or wget from `https://github.com/pbakaus/impeccable/releases/download` (overridable by `IMPECCABLE_DOWNLOAD_BASE`), checks a sha256 and execs it.
- `reference/hooks.md`: has Claude install a post-tool-use hook (and a Stop hook) that runs that binary after every UI file edit and pushes reminders into the agent's context.
- `scripts/live-browser*.js`: a 567 KB script injected into the user's page from `http://localhost:PORT/live.js`, posting edits back to a local server with a token.

Downloading and executing a binary, plus installing agent hooks, is a hard reject under our rules regardless of intent.
