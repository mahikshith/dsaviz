// Every page on the shared frame (root data-shell): shown with no zoom, no sideways page scroll at 320, 390, 1024 and 1440,
// body text 18px at Normal size, and the keyboard reaches the top bar first. Then one real lesson of each track (Start here, DSA concepts,
// System design, AI & ML, Git) is opened from its sidebar: Back link, Previous and Next, no "Why learn this", no text under 14px, no sideways scroll,
// the sidebar behind a Lessons button on phones, and Back returning to its parent with the scroll kept. Then the Problem page (Code.dc.html): five sample problems run in
// Python and JavaScript with an empty starter and a correct answer, the Story switch, hints, solution confirm and History, the statement and Run in the first screen at 1440x900
// and 390x844, the 45 / 55 split, and no sideways scroll at 320, 390 (dark and light), 1024 and 1440. Run after a build: node tests/shell-test.js
const http = require('http'); const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const pages = fs.readdirSync(path.join(__dirname, '..', 'pages')).filter((f) => /<div data-shell/.test(fs.readFileSync(path.join(__dirname, '..', 'pages', f), 'utf8')));
const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'));
const server = http.createServer((q, r) => { r.writeHead(200, { 'Content-Type': 'text/html' }); r.end(html); });
server.listen(0, async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  let bad = 0;
  // html and body clip sideways overflow (so sticky works), which hides it from scrollWidth. So also look for what sticks out: an element
  // whose right edge is past the screen and that no scrolling or clipping parent holds in.
  const offenders = () => { const w = document.documentElement.clientWidth; const out = [];
    const held = (e) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { if (getComputedStyle(a).overflowX !== 'visible') return true; } return false; };
    document.querySelectorAll('#app *').forEach((e) => { if (e.closest('svg,[data-drawer]')) return; const r = e.getBoundingClientRect();
      if (r.width && r.right > w + 1 && !held(e)) out.push(e.tagName.toLowerCase() + ' ' + Math.round(r.left) + '..' + Math.round(r.right) + ' ' + (e.textContent || '').trim().slice(0, 24)); });
    return out.slice(0, 4); };
  // Each lesson page and the page its Back link goes to when there is no trail.
  const LESSON_PAGES = [['Chapter', 'Start'], ['ConceptLesson', 'Concepts'], ['SDLesson', 'SystemDesign'], ['AILesson', 'AIML'], ['Git', 'Patterns']];
  const fail = (m) => { bad++; console.log('  ✗ ' + m); };
  // Every width in the default (dark) theme, and the phone again in the light one (paper).
  // DS_ONLY=problem skips the lesson checks and runs only the Problem page checks at the end of this file.
  const ONLY_PROBLEM = process.env.DS_ONLY === 'problem';
  // DS_ONLY=problems runs only the Problems page and search checks (step 4).
  const ONLY_PAGE = process.env.DS_ONLY === 'problems' || process.env.DS_ONLY === 'roadmap';
  // DS_ONLY=roadmap runs only the Roadmap checks (step 5).
  const ONLY_RM = process.env.DS_ONLY === 'roadmap';
  for (const [theme, width] of ONLY_PROBLEM || ONLY_PAGE ? [] : [['max', 320], ['max', 390], ['max', 1024], ['max', 1440], ['paper', 390]]) {
    const page = await browser.newPage({ viewport: { width, height: 800 }, isMobile: width < 760, hasTouch: width < 760 });
    await page.addInitScript((t) => { try { localStorage.setItem('dsaviz-theme', t); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} }, theme);
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto('http://localhost:' + server.address().port + '/');
    for (const f of pages) {
      await page.evaluate((n) => window.__dsNav(n), f); await page.waitForTimeout(500);
      const r = await page.evaluate(() => {
        const de = document.documentElement, root = document.querySelector('#app > div');
        return { shell: root.hasAttribute('data-shell'), zoom: de.style.zoom, over: de.scrollWidth - de.clientWidth, size: getComputedStyle(root).fontSize };
      });
      if (!r.shell) fail(f + ' did not open');
      if (r.zoom !== '1') fail(f + ' at ' + width + ' ' + theme + ': zoom ' + r.zoom);
      if (r.over > 0) fail(f + ' at ' + width + ' ' + theme + ': scrolls sideways by ' + r.over + 'px');
      const off0 = await page.evaluate(offenders); if (off0.length) fail(f + ' at ' + width + ' ' + theme + ': sticks out past the screen: ' + off0.join(' | '));
      if (r.size !== '18px') fail(f + ' at ' + width + ': body text ' + r.size);
      await page.evaluate(() => document.activeElement && document.activeElement.blur());
      await page.keyboard.press('Tab');
      if (!(await page.evaluate(() => !!document.activeElement.closest('[data-pn]')))) fail(f + ' at ' + width + ': Tab does not start in the top bar');
    }
    // One real lesson of each track, opened by choosing a lesson in the sidebar.
    for (const [pg, parent] of LESSON_PAGES) {
      await page.evaluate((n) => window.__dsNav(n), pg + '.dc.html'); await page.waitForTimeout(600);
      const phone = width < 1024;
      if (phone) {
        const hidden = await page.evaluate(() => { const l = document.querySelector('.sh-side-list'); return !!l && getComputedStyle(l).display === 'none'; });
        if (!hidden) fail(pg + ' at ' + width + ': lesson list is not collapsed behind the Lessons button');
        await page.click('.sh-side-btn'); await page.waitForTimeout(200);
      }
      const links = await page.$$('.sh-side-list a');
      if (links.length < 3) { fail(pg + ' at ' + width + ': sidebar lists ' + links.length + ' lessons'); continue; }
      const want = (await links[2].textContent()).replace(/^\s*✓?\s*/, '').trim();
      await links[2].click(); await page.waitForTimeout(700);
      const r = await page.evaluate(() => {
        const de = document.documentElement, main = document.querySelector('main.sh-lesson');
        const cur = document.querySelector('.sh-side-list a[aria-current="page"]');
        const small = []; const w = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        for (let n = w.nextNode(); n; n = w.nextNode()) {
          if (!n.textContent.trim() || n.parentElement.closest('svg, math')) continue;
          const fs = parseFloat(getComputedStyle(n.parentElement).fontSize); if (fs < 13.99) small.push(Math.round(fs) + 'px "' + n.textContent.trim().slice(0, 30) + '"');
        }
        const back = main.querySelector('a.sh-back'), pager = main.querySelector('.sh-pager');
        return { over: de.scrollWidth - de.clientWidth, h1: (main.querySelector('h1') || {}).textContent, cur: cur ? cur.textContent.replace(/^\s*✓?\s*/, '').trim() : '', zoom: de.style.zoom,
          back: back ? back.textContent : '', pager: pager ? pager.querySelectorAll('a').length : 0, why: /Why learn this/i.test(main.textContent), small, shell: !!document.querySelector('#app > [data-shell] .sh-layout'), fluid: !!document.querySelector('#app > [data-fluid]') };
      });
      const id = pg + ' (' + want + ') at ' + width + (theme === 'max' ? '' : ' ' + theme);
      // The "On this page" rail: from 1280px up it lists the page's sections and follows the scroll; below that it is gone.
      if (pg !== 'Git') {
        const rl = await page.evaluate(async () => {
          const rail = document.querySelector('.sh-rail'); if (!rail) return { none: true };
          const shown = getComputedStyle(rail).display !== 'none' && rail.getBoundingClientRect().width > 0;
          const names = [...rail.querySelectorAll('a')].map((a) => a.textContent);
          window.scrollTo(0, document.documentElement.scrollHeight); await new Promise((r) => setTimeout(r, 400));
          const last = rail.querySelector('a[aria-current]'); const lastName = last ? last.textContent : '';
          window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
          const first = rail.querySelector('a[aria-current]');
          const col = rail.getBoundingClientRect(), main = document.querySelector('main.sh-lesson').getBoundingClientRect();
          return { shown, names, lastName, firstName: first ? first.textContent : '', right: col.left >= main.right - 1 };
        });
        if (rl.none) fail(id + ': no rail element');
        else if (width >= 1280) {
          if (!rl.shown) fail(id + ': the On this page rail is not showing');
          else {
            if (!rl.names.includes('Steps') || !rl.names.includes('About')) fail(id + ': rail lists ' + rl.names.join(', '));
            if (rl.firstName !== 'Steps') fail(id + ': at the top the rail marks "' + rl.firstName + '", not Steps');
            if (rl.lastName !== rl.names[rl.names.length - 1]) fail(id + ': at the bottom the rail marks "' + rl.lastName + '"');
            if (!rl.right) fail(id + ': the rail is not to the right of the lesson');
          }
        } else if (rl.shown) fail(id + ': the rail shows below 1280px');
      }
      // The picture of a player page: what shows without scrolling sideways is not blank (phones scroll it, starting at the left).
      if (pg === 'ConceptLesson' || pg === 'AILesson') {
        const seen = await page.evaluate(() => {
          const sec = document.querySelector('main section[aria-label="Animation"]'); if (!sec) return -1;
          const box = sec.getBoundingClientRect(); let n = 0;
          sec.querySelectorAll('svg text, svg circle, svg path, svg rect').forEach((el) => {
            const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
            if (b.width < 2 || b.height < 2 || parseFloat(cs.opacity) === 0 || b.right < box.left + 4 || b.left > box.right - 4) return;
            if (el.tagName === 'text' && !el.textContent.trim()) return;
            n++;
          });
          return n;
        });
        if (seen < 3) fail(pg + ' at ' + width + ': the visible part of the picture is blank (' + seen + ' marks)');
      }
      if (!r.shell || r.fluid) fail(id + ': not on the shared frame');
      if (r.cur !== want) fail(id + ': current lesson is "' + r.cur + '"');
      if (!r.h1 || r.h1.trim().toLowerCase() !== want.toLowerCase()) fail(id + ': title is "' + r.h1 + '"');
      if (!/^← Back to \S/.test(r.back) || /Back to (Lesson|Front page|Home)\s*$/.test(r.back)) fail(id + ': Back link says "' + r.back + '"');
      if (r.pager < 1) fail(id + ': no Previous or Next');
      if (r.why) fail(id + ': shows "Why learn this?"');
      if (r.small.length) fail(id + ': text under 14px: ' + r.small.slice(0, 3).join(', '));
      if (r.over > 0) fail(id + ': scrolls sideways by ' + r.over + 'px');
      const off1 = await page.evaluate(offenders); if (off1.length) fail(id + ': sticks out past the screen: ' + off1.join(' | '));
      if (width < 760) { // a full-page picture of the phone is exactly as wide as the phone
        const png = await page.screenshot({ fullPage: true }); const pw = png.readUInt32BE(16);
        if (pw !== width) fail(id + ': the full-page picture is ' + pw + 'px wide, not ' + width);
      }
      if (pg === 'Chapter' && width < 760) { // every stage of a Start here lesson at phone width
        for (const tab of ['Watch', 'Try it', 'Practice', 'Check']) {
          await page.evaluate((t) => { const b = [...document.querySelectorAll('#app button.sh-tab')].find((x) => x.textContent.replace(/^[\d✓]\s*/, '').trim() === t); if (b) b.click(); }, tab); await page.waitForTimeout(700);
          const o = await page.evaluate(offenders); if (o.length) fail(id + ' stage ' + tab + ': sticks out past the screen: ' + o.join(' | '));
          const sw = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); if (sw > 0) fail(id + ' stage ' + tab + ': scrolls sideways by ' + sw + 'px');
        }
      }
      // Back returns to the page the learner came from, with its scroll kept.
      if (width >= 1024) {
        await page.setViewportSize({ width, height: 360 });
        await page.evaluate((n) => window.__dsNav(n), parent + '.dc.html'); await page.waitForTimeout(600);
        const y = await page.evaluate(() => { const y = Math.min(300, Math.max(0, document.documentElement.scrollHeight - innerHeight - 20)); window.scrollTo(0, y); return Math.round(window.scrollY); });
        await page.evaluate((n) => window.__dsNav(n), pg + '.dc.html'); await page.waitForTimeout(600);
        const label = await page.textContent('a.sh-back');
        await page.click('a.sh-back'); await page.waitForTimeout(900);
        const b = await page.evaluate(() => ({ page: location.hash.slice(1), y: Math.round(window.scrollY) }));
        if (b.page !== parent) fail(pg + ': Back went to ' + b.page + ' (' + label.trim() + '), not ' + parent);
        else if (Math.abs(b.y - y) > 4) fail(pg + ': Back to ' + parent + ' lost the scroll (' + y + ' -> ' + b.y + ')');
        else if (y < 100) fail(pg + ': the parent page ' + parent + ' is too short to test scroll (' + y + ')');
        await page.setViewportSize({ width, height: 800 });
        // Coming from the front page or another lesson, Back still names the track page.
        await page.evaluate(() => window.__dsNav('Main.dc.html')); await page.waitForTimeout(400);
        await page.evaluate((n) => window.__dsNav(n), pg + '.dc.html'); await page.waitForTimeout(600);
        const fl = (await page.textContent('a.sh-back')).trim();
        if (/Front page|Lesson$|Home$/.test(fl)) fail(pg + ': Back from the front page says "' + fl + '"');
        await page.click('a.sh-back'); await page.waitForTimeout(500);
        const fh = await page.evaluate(() => location.hash.slice(1));
        if (fh !== parent) fail(pg + ': Back from the front page went to ' + fh + ', not ' + parent);
        // With no trail (a reload or a bookmark), Back goes to the track's own page.
        await page.evaluate((n) => { sessionStorage.clear(); history.replaceState(null, '', location.pathname + '#' + n); }, pg); await page.reload(); await page.waitForTimeout(1200);
        const lbl = await page.textContent('a.sh-back');
        await page.click('a.sh-back'); await page.waitForTimeout(700);
        const c = await page.evaluate(() => location.hash.slice(1));
        if (c !== parent) fail(pg + ': with no trail Back (' + lbl.trim() + ') went to ' + c + ', not ' + parent);
      }
    }
    if (errs.length) fail('page errors at ' + width + ': ' + errs[0]);
    await page.close();
  }

  // The first screen of a lesson holds the picture, the first step text, Play and Next (the step card pins to the bottom of the screen).
  const FIT = { Chapter: ['svg[data-stage="start"]', '.st-say'], ConceptLesson: ['section[aria-label="Animation"]', '.cs-say'], AILesson: ['section[aria-label="Animation"]', '.ai-say'],
    SDLesson: ['main [data-rail="Steps"] > section', 'main .sh-panel p'], Git: ['main section[aria-label*="raph"]', 'main section[aria-label="Current step"] p'] };
  for (const [w, h] of ONLY_PROBLEM || ONLY_PAGE ? [] : [[1440, 900], [390, 844]]) {
    const pg2 = await browser.newPage({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
    await pg2.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg2.goto('http://localhost:' + server.address().port + '/'); await pg2.waitForTimeout(500);
    for (const [pg, [st, tx]] of Object.entries(FIT)) {
      await pg2.evaluate((n) => window.__dsNav(n), pg + '.dc.html'); await pg2.waitForTimeout(1200);
      const f = await pg2.evaluate(([a, b]) => { const q = (s) => document.querySelector(s); const rc = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; };
        const vis = (sel, re) => [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().height > 0 && (!re || re.test(e.getAttribute('aria-label') || '')));
        return { vh: innerHeight, stage: rc(q(a)), text: rc(q(b)), play: rc(vis('main button[aria-label]', /^(Play|Pause)(?!back)/)), next: rc(vis('main button[data-next], main button[aria-label="Next step"]')) }; }, [st, tx]);
      const id = pg + ' at ' + w + 'x' + h;
      if (!f.stage || !f.text || !f.play || !f.next) { fail(id + ': first screen is missing ' + ['stage', 'text', 'play', 'next'].filter((k) => !f[k]).join(', ')); continue; }
      if (f.stage[0] >= f.vh - 100) fail(id + ': the picture starts at ' + f.stage[0] + ', below the first screen (' + f.vh + ')');
      // Wide: the whole first step text is in the first screen. Phone: it starts above the 56px bar (the bar pins to the bottom, covering the rest); the system design picture is taller, so there it only has to start on screen.
      if (w >= 760 ? f.text[1] > f.vh : f.text[0] > f.vh - (pg === 'SDLesson' ? 8 : 56 + 24)) fail(id + ': the first step text ' + (w >= 760 ? 'ends at ' + f.text[1] : 'starts at ' + f.text[0]) + ', below the first screen (' + f.vh + ')');
      if (f.play[1] > f.vh) fail(id + ': Play ends at ' + f.play[1] + ', below the first screen (' + f.vh + ')');
      if (f.next[1] > f.vh) fail(id + ': Next ends at ' + f.next[1] + ', below the first screen (' + f.vh + ')');
    }
    await pg2.close();
  }

  // Back to top (scripts/site-runtime.js): hidden at the top, shown after a screen of scrolling, never over the pager or the step card,
  // and one click returns to the top with the focus on the page title.
  for (const [w, h] of ONLY_PROBLEM || ONLY_PAGE ? [] : [[1440, 900], [390, 844]]) {
    const pg3 = await browser.newPage({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
    await pg3.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg3.goto('http://localhost:' + server.address().port + '/'); await pg3.waitForTimeout(500);
    await pg3.evaluate(() => window.__dsNav('ConceptLesson.dc.html')); await pg3.waitForTimeout(1200);
    const id = 'Back to top at ' + w + 'x' + h;
    const on = () => pg3.evaluate(() => { const b = document.querySelector('[data-totop]'); return b ? b.getAttribute('data-on') === 'true' && getComputedStyle(b).visibility !== 'hidden' : null; });
    if ((await on()) !== false) fail(id + ': the button is not hidden at the top');
    await pg3.evaluate((vh) => window.scrollTo(0, vh * 2), h); await pg3.waitForTimeout(700);
    if ((await on()) !== true) fail(id + ': the button does not show after scrolling down');
    const geo = await pg3.evaluate(() => { const b = document.querySelector('[data-totop]'), r = b.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), right: Math.round(innerWidth - r.right), label: b.getAttribute('aria-label'), tag: b.tagName }; });
    if (geo.w < 44 || geo.h < 44 || geo.label !== 'Back to top' || geo.tag !== 'BUTTON' || geo.right !== 16) fail(id + ': wrong button ' + JSON.stringify(geo));
    await pg3.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await pg3.waitForTimeout(700);
    const hit = await pg3.evaluate(() => { const b = document.querySelector('[data-totop]').getBoundingClientRect(); const bad = [];
      document.querySelectorAll('.sh-pager a, .sh-pic > .sh-panel, .sh-btn, [data-next]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && r.height && r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top) bad.push(e.textContent.trim().slice(0, 20) || e.className); }); return bad; });
    if (hit.length) fail(id + ': the button covers ' + hit.join(', '));
    await pg3.click('[data-totop]'); await pg3.waitForTimeout(1500);
    const back = await pg3.evaluate(() => ({ y: Math.round(window.scrollY), focus: document.activeElement && document.activeElement.tagName }));
    if (back.y !== 0) fail(id + ': click left the page at ' + back.y);
    if (back.focus !== 'H1') fail(id + ': focus is on ' + back.focus + ', not the page title');
    await pg3.waitForTimeout(400);
    if ((await on()) !== false) fail(id + ': the button is still showing at the top');
    await pg3.close();
  }
  // ---- The Roadmap (Patterns.dc.html, step 5): one page with no tabs or folds, every track in order as a block with its lessons showing, one click opens any
  // lesson, Back names the Roadmap (Start here lessons: "Back to Chapter N" and land on that chapter) and keeps the scroll, one "Start here", equal block heights
  // in each grid row, one block per row on phones, no story words, no sideways scroll. DS_ONLY=roadmap runs just this.
  if ((!ONLY_PROBLEM && !ONLY_PAGE) || ONLY_RM) {
    const TRACKS = ['Start here', 'DSA concepts', 'Patterns', 'Complexity', 'Git', 'System design', 'AI & ML'];
    const closeDaily = (p) => p.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); });
    const counts = {};
    for (const [theme, width] of [['max', 1440], ['max', 1024], ['max', 390], ['paper', 390], ['max', 320]]) {
      const pg = await browser.newPage({ viewport: { width, height: 900 }, isMobile: width < 760, hasTouch: width < 760 });
      await pg.addInitScript((t) => { try { localStorage.setItem('dsaviz-theme', t); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} }, theme);
      pg.errs = []; pg.on('pageerror', (e) => pg.errs.push(e.message));
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Patterns.dc.html')); await pg.waitForTimeout(900); await closeDaily(pg);
      const id = 'Roadmap at ' + width + (theme === 'max' ? '' : ' ' + theme);
      const r = await pg.evaluate(() => {
        const main = document.querySelector('main.sh-main');
        const blocks = [...main.querySelectorAll('.rm-block')];
        const seen = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
        const rows = {}; blocks.forEach((b) => { const k = Math.round(b.getBoundingClientRect().top); (rows[k] = rows[k] || []).push(b); });
        const startHere = [...document.querySelectorAll('#app *')].filter((e) => !e.children.length && e.textContent.trim() === 'Start here' && seen(e)).length;
        const W = document.documentElement.clientWidth;
        return {
          h1: [...main.querySelectorAll('h1')].map((h) => h.textContent.trim()),
          tracks: blocks.map((b) => b.querySelector('h2').textContent.trim()),
          lessons: blocks.map((b) => [...b.querySelectorAll('a.rm-lesson')].filter(seen).length),
          allLinks: blocks.map((b) => b.querySelectorAll('a.rm-lesson').length),
          counts: blocks.map((b) => b.querySelector('.sh-label').textContent.trim()),
          bars: blocks.map((b) => { const p = b.querySelector('[role=progressbar]'); return !!p && seen(p) && p.getBoundingClientRect().height <= 6; }),
          folds: main.querySelectorAll('[role=tab],[role=tablist],details,[aria-expanded],.sh-tab').length,
          rowHeights: Object.values(rows).map((g) => g.map((b) => Math.round(b.getBoundingClientRect().height))),
          rowSizes: Object.values(rows).map((g) => g.length),
          blockSpans: blocks.map((b) => [Math.round(b.getBoundingClientRect().left), Math.round(b.getBoundingClientRect().width)]),
          chapters: [...main.querySelectorAll('h3[id^="ch-"]')].length,
          startHere, W, over: document.documentElement.scrollWidth - W,
          text: main.textContent,
          small: [...main.querySelectorAll('*')].filter((e) => !e.children.length && e.textContent.trim() && parseFloat(getComputedStyle(e).fontSize) < 13.99).length
        };
      });
      if (r.h1.join() !== 'Roadmap') fail(id + ': the title is "' + r.h1.join() + '", not Roadmap');
      if (r.tracks.join('|') !== TRACKS.join('|')) fail(id + ': tracks are ' + r.tracks.join(', ') + ', not ' + TRACKS.join(', '));
      if (r.folds) fail(id + ': ' + r.folds + ' tabs or folds on the page');
      r.lessons.forEach((n, i) => { if (n < 8 || n !== r.allLinks[i]) fail(id + ': ' + TRACKS[i] + ' shows ' + n + ' of ' + r.allLinks[i] + ' lessons'); });
      r.counts.forEach((c, i) => { if (!/^\d+ of \d+ (done|solved|opened)$/.test(c)) fail(id + ': ' + TRACKS[i] + ' count reads "' + c + '"'); });
      r.bars.forEach((ok, i) => { if (!ok) fail(id + ': ' + TRACKS[i] + ' has no thin progress bar'); });
      if (r.startHere !== 1) fail(id + ': "Start here" shows ' + r.startHere + ' times');
      if (r.chapters !== 20) fail(id + ': ' + r.chapters + ' chapter anchors, not 20');
      if (r.over > 0) fail(id + ': scrolls sideways by ' + r.over + 'px');
      if (r.small) fail(id + ': ' + r.small + ' texts under 14px');
      const words = /lantern|treehouse|canteen|tortoise|ripple|why learn this|coming soon/i.exec(r.text);
      if (words) fail(id + ': story words or old copy on the page: ' + words[0]);
      r.rowHeights.forEach((hs) => { if (Math.max(...hs) - Math.min(...hs) > 1) fail(id + ': blocks in one row differ in height: ' + hs.join(', ')); });
      if (width < 760) r.blockSpans.forEach(([l, w], i) => { if (Math.abs(l - 16) > 1 || Math.abs(w - (r.W - 32)) > 1) fail(id + ': ' + TRACKS[i] + ' is not one block per row (' + l + ', ' + w + ')'); });
      else if (width >= 1200 && r.rowSizes.join() !== '1,2,2,1,1') fail(id + ': rows hold ' + r.rowSizes.join('+') + ' blocks, not 1,2,2,1,1');
      if (width === 1440) { counts.rows = r.rowSizes.join('+'); counts.lessons = r.allLinks.join(','); }
      if (pg.errs.length) fail(id + ' page errors: ' + pg.errs[0]);
      await pg.close();
    }
    {
      const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      pg.errs = []; pg.on('pageerror', (e) => pg.errs.push(e.message));
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      const open = async () => { await pg.evaluate(() => window.__dsNav('Patterns.dc.html')); await pg.waitForTimeout(700); await closeDaily(pg); };
      const state = () => pg.evaluate(() => ({ hash: location.hash, y: Math.round(window.scrollY), back: (document.querySelector('a.sh-back') || {}).textContent || '' }));
      // One click opens a lesson of every track (Complexity: a section); Back names the Roadmap and returns with the scroll kept.
      const WANT_HASH = { start: '#Chapter', dsa: '#ConceptLesson', git: '#Git', sd: '#SDLesson', ai: '#AILesson', cplx: '#Complexity' };
      for (const key of ['start', 'dsa', 'git', 'sd', 'ai', 'cplx']) {
        await open();
        const link = pg.locator('[data-track="' + key + '"] a.rm-lesson').nth(key === 'start' ? 3 : 5);
        const title = (await link.locator('span').nth(1).textContent()).trim();
        await link.evaluate((e) => e.scrollIntoView({ block: 'center' })); await pg.waitForTimeout(150);
        const y0 = await pg.evaluate(() => Math.round(window.scrollY));
        await link.click(); await pg.waitForTimeout(900);
        const s = await state();
        if (s.hash !== WANT_HASH[key]) fail('Roadmap: one click on "' + title + '" (' + key + ') opened ' + s.hash + ', not ' + WANT_HASH[key]);
        else if (key !== 'cplx') {
          const wantBack = key === 'start' ? /^(← )?Back to Chapter \d+$/ : /^(← )?Back to Roadmap$/;
          if (!wantBack.test(s.back.trim())) fail('Roadmap: the lesson "' + title + '" (' + key + ') says "' + s.back.trim() + '"');
          await pg.click('a.sh-back'); await pg.waitForTimeout(2300);
          const b = await state();
          if (b.hash !== '#Patterns') fail('Roadmap: Back from "' + title + '" went to ' + b.hash);
          else if (Math.abs(b.y - y0) > 3) fail('Roadmap: Back from "' + title + '" came back at scroll ' + b.y + ', not ' + y0);
        }
      }
      // Back to Chapter N lands on that chapter's anchor, with the scroll kept.
      await open();
      await pg.locator('h3#ch-12').evaluate((e) => e.scrollIntoView({ block: 'start' })); await pg.waitForTimeout(200);
      const y1 = await pg.evaluate(() => Math.round(window.scrollY));
      await pg.locator('.rm-group:has(h3#ch-12) a.rm-lesson').first().click(); await pg.waitForTimeout(900);
      const s12 = await state();
      if (s12.back.replace(/^←\s*/, '').trim() !== 'Back to Chapter 12') fail('Roadmap: a chapter 12 lesson says "' + s12.back.trim() + '", not Back to Chapter 12');
      await pg.click('a.sh-back'); await pg.waitForTimeout(2300);
      const b12 = await pg.evaluate(() => { const h = document.getElementById('ch-12'); const r = h ? h.getBoundingClientRect() : null; return { hash: location.hash, y: Math.round(window.scrollY), top: r ? Math.round(r.top) : -1, bottom: r ? Math.round(r.bottom) : -1, vh: window.innerHeight }; });
      if (b12.hash !== '#Patterns' || b12.bottom <= 52 || b12.top >= b12.vh) fail('Roadmap: Back to Chapter 12 did not land on the chapter (' + JSON.stringify(b12) + ')');
      if (Math.abs(b12.y - y1) > 3) fail('Roadmap: Back to Chapter 12 came back at scroll ' + b12.y + ', not ' + y1);
      // Patterns: each pattern opens the Problems page filtered by that topic, and Back returns here.
      await open();
      await pg.locator('[data-track="patterns"] a.rm-lesson', { hasText: 'Two Pointers' }).click(); await pg.waitForTimeout(900);
      const pr = await pg.evaluate(() => ({ hash: location.hash, search: location.search, sel: (document.querySelector('select.sp-in') || {}).value, topics: [...document.querySelectorAll('.sp-body .sp-topic')].map((e) => e.textContent.trim()) }));
      if (pr.hash !== '#Sheet' || pr.sel !== 'Two Pointers' || !pr.topics.length || pr.topics.some((t) => t !== 'Two Pointers') || !/topic=Two(%20|\+)Pointers/.test(pr.search)) fail('Roadmap: Two Pointers did not open Problems filtered by that topic: ' + JSON.stringify({ h: pr.hash, s: pr.search, sel: pr.sel, n: pr.topics.length }));
      await pg.evaluate(() => window.__dsBack()); await pg.waitForTimeout(900);
      if ((await state()).hash !== '#Patterns') fail('Roadmap: Back from the filtered Problems page did not return to the Roadmap');
      // A pattern found by search opens the filtered Problems page too.
      await pg.evaluate(() => { localStorage.setItem('dsaviz-pattern-focus', 'Heap'); window.__dsNav('Patterns.dc.html'); }); await pg.waitForTimeout(1000);
      const sr = await pg.evaluate(() => ({ hash: location.hash, sel: (document.querySelector('select.sp-in') || {}).value }));
      if (sr.hash !== '#Sheet' || sr.sel !== 'Heap') fail('Roadmap: a pattern search result did not open Problems filtered by Heap: ' + JSON.stringify(sr));
      if (pg.errs.length) fail('Roadmap page errors: ' + pg.errs[0]);
      await pg.close();
    }
    // "Up next" in every track (the first lesson not done, with a check on the ones done) and the jump chips under the title: one per track, they scroll to
    // their block and the chip of the block in view is marked; sticky on phones, normal at 1440. Chapter headings are plain text, 14 to 15px, not links.
    for (const [theme, width] of [['max', 1440], ['paper', 1440], ['max', 390], ['paper', 390]]) {
      const pg = await browser.newPage({ viewport: { width, height: 844 }, isMobile: width < 760, hasTouch: width < 760 });
      await pg.addInitScript((t) => { try { localStorage.setItem('dsaviz-theme', t); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} }, theme);
      pg.errs = []; pg.on('pageerror', (e) => pg.errs.push(e.message));
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Patterns.dc.html')); await pg.waitForTimeout(900); await closeDaily(pg);
      const id = 'Roadmap chips at ' + width + (theme === 'max' ? '' : ' ' + theme);
      const info = await pg.evaluate(() => {
        const blocks = [...document.querySelectorAll('.rm-block')];
        const ups = blocks.map((b) => { const links = [...b.querySelectorAll('a.rm-lesson')]; const ix = links.findIndex((a) => a.querySelector('.rm-up'));
          return { n: b.querySelectorAll('.rm-up').length, ix, firstUndone: links.findIndex((a) => !a.querySelector('.sh-tick').textContent.trim()), label: ix >= 0 ? links[ix].querySelector('.rm-up').textContent.trim() : '' }; });
        const chap = [...document.querySelectorAll('h3[id^="ch-"]')].map((h) => ({ px: parseFloat(getComputedStyle(h).fontSize), link: !!h.closest('a') || !!h.querySelector('a'), col: getComputedStyle(h).color, txt: getComputedStyle(document.querySelector('.rm-lesson')).color }));
        const chips = [...document.querySelectorAll('.rm-chip')].map((c) => c.textContent.trim());
        return { ups, chap, chips };
      });
      info.ups.forEach((u, i) => { if (u.n !== 1 || u.ix !== u.firstUndone || u.label !== 'Up next') fail(id + ': block ' + (i + 1) + ' has ' + u.n + ' "Up next" marks, at ' + u.ix + ' not on the first lesson not done (' + u.firstUndone + ')'); });
      info.chap.forEach((c, i) => { if (c.link || c.px < 14.99 || c.px > 15.01 || c.col !== c.txt) fail(id + ': chapter heading ' + (i + 1) + ' is ' + c.px + 'px' + (c.link ? ', a link' : '') + (c.col !== c.txt ? ', not the normal text colour' : '')); });
      if (info.chips.join('|') !== 'Start|DSA concepts|Patterns|Complexity|Git|System design|AI & ML') fail(id + ': chips are ' + info.chips.join(', '));
      // Tap each chip: its block comes to the top and its chip is the one marked.
      const KEYS = ['start', 'dsa', 'patterns', 'cplx', 'git', 'sd', 'ai'];
      for (let i = 0; i < KEYS.length; i++) {
        await pg.locator('.rm-chip').nth(i).click(); await pg.waitForTimeout(1100);
        const r = await pg.evaluate((k) => { const b = document.getElementById('track-' + k).getBoundingClientRect(); const cur = [...document.querySelectorAll('.rm-chip[aria-current="true"]')].map((c) => c.getAttribute('data-chip'));
          const bar = document.querySelector('.rm-chips').getBoundingClientRect(); return { top: Math.round(b.top), cur, barTop: Math.round(bar.top), barBottom: Math.round(bar.bottom), over: document.documentElement.scrollWidth - document.documentElement.clientWidth }; }, KEYS[i]);
        const atBottom = await pg.evaluate(() => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4);
        if (!atBottom && (r.top < 0 || r.top > 130)) fail(id + ': the ' + KEYS[i] + ' chip left its block at ' + r.top + 'px from the top');
        if (r.cur.join() !== KEYS[i] && !(atBottom && r.cur.join() === 'ai')) fail(id + ': after the ' + KEYS[i] + ' chip the marked chip is "' + r.cur.join() + '"');
        if (r.over > 0) fail(id + ': the chips make the page scroll sideways by ' + r.over + 'px');
        if (width < 760 && !(r.barTop >= 50 && r.barTop <= 54)) fail(id + ': the chip row is not pinned under the top bar after the ' + KEYS[i] + ' chip (top ' + r.barTop + ')');
        if (width >= 760 && i >= 2 && r.barBottom > 0) fail(id + ': the chip row follows the scroll at ' + width + ' (bottom ' + r.barBottom + ')');
      }
      if (pg.errs.length) fail(id + ' page errors: ' + pg.errs[0]);
      await pg.close();
    }
    // A finished lesson gets a check and "Up next" moves to the next one.
    {
      const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); localStorage.setItem('dsaviz-activity-v1', JSON.stringify({ v: 1, days: {}, stories: {}, code: {}, lessons: { 'git:first-commit': Date.now() }, start: {} })); } catch (e) {} });
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Patterns.dc.html')); await pg.waitForTimeout(900); await closeDaily(pg);
      const g = await pg.evaluate(() => [...document.querySelectorAll('[data-track="git"] a.rm-lesson')].slice(0, 2).map((a) => ({ tick: a.querySelector('.sh-tick').textContent.trim(), up: !!a.querySelector('.rm-up') })));
      if (g[0].tick !== '✓' || g[0].up || !g[1].up || g[1].tick) fail('Roadmap: after one Git lesson is done the first has a check and Up next moves on: ' + JSON.stringify(g));
      await pg.close();
    }
    // The phone menu no longer repeats what the Roadmap reaches.
    {
      const pg = await browser.newPage({ viewport: { width: 390, height: 800 }, isMobile: true, hasTouch: true });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Patterns.dc.html')); await pg.waitForTimeout(700); await closeDaily(pg);
      await pg.click('button[aria-label="Open menu"]'); await pg.waitForTimeout(300);
      const site = await pg.evaluate(() => [...document.querySelectorAll('nav[aria-label="Site"] a')].map((a) => a.textContent.trim()));
      const dup = site.filter((t) => /^(Library|DSA concepts|Complexity|Git|System design|AI & ML|Problems)/.test(t));
      if (dup.length) fail('Phone menu repeats what the Roadmap reaches: ' + dup.join(', '));
      await pg.close();
    }
    console.log('  Roadmap: rows ' + counts.rows + ' blocks at 1440, lessons per track ' + counts.lessons + ', one Start here, no tabs or folds, equal heights per row, one per row on phones, one click opens any lesson, Back to Roadmap / Chapter N keeps the scroll and lands on the chapter, Patterns open Problems filtered');
  }
  if (process.env.DS_ONLY === 'roadmap') { await browser.close(); server.close(); console.log(bad ? bad + ' problems' : 'roadmap clean'); process.exit(bad ? 1 : 0); }
  // ---- The top bar: on phones (below 760) only the menu, logo, search and profile; wider: no menu, logo, Roadmap, Problems, search and profile.
  // No two items overlap, none is covered by another element or past the screen edge, and no old Back button is in the bar. On phones the menu holds
  // Roadmap and Problems, with the current page marked.
  if (!ONLY_PROBLEM && !ONLY_PAGE) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const pg = await browser.newPage({ viewport: { width, height: 800 }, isMobile: width < 760, hasTouch: width < 760 });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      // The menu is a phone control (step 5): the Roadmap reaches every track, so wider screens have no menu button.
      const WANT = width < 760 ? ['Open menu', 'DSAMaxxing home', 'Search the site', 'Your profile'] : ['DSAMaxxing home', 'Roadmap', 'Problems', 'Search the site', 'Your profile'];
      // Pages that open straight to a Problem page come with a trail, so the old Back button would show if it were still wired in.
      for (const f of ['Home.dc.html', 'Sheet.dc.html', 'Code.dc.html', 'Story.dc.html', 'Patterns.dc.html', 'Chapter.dc.html', 'Profile.dc.html'].concat(pages.filter((p) => !/^(Home|Sheet|Code|Story|Patterns|Chapter|Profile)\./.test(p)))) {
        await pg.evaluate((n) => window.__dsNav(n), f); await pg.waitForTimeout(350);
        await pg.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); });
        const r = await pg.evaluate(() => {
          const nav = document.querySelector('[data-pn]'), W = document.documentElement.clientWidth;
          const items = [...nav.querySelectorAll('a, button')].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== 'hidden'; })
            .map((e) => ({ e, name: e.getAttribute('aria-label') || e.textContent.trim(), b: e.getBoundingClientRect() }));
          const bad = [];
          items.forEach((a, i) => {
            if (a.b.left < -0.5 || a.b.right > W + 0.5) bad.push(a.name + ' is past the screen edge (' + Math.round(a.b.left) + '..' + Math.round(a.b.right) + ')');
            const top = document.elementFromPoint(a.b.left + a.b.width / 2, a.b.top + a.b.height / 2);
            if (!top || !(top === a.e || a.e.contains(top))) bad.push(a.name + ' is covered by ' + (top ? top.tagName.toLowerCase() + ' ' + (top.getAttribute('aria-label') || top.textContent.trim().slice(0, 16)) : 'nothing'));
            items.slice(i + 1).forEach((c) => { const w = Math.min(a.b.right, c.b.right) - Math.max(a.b.left, c.b.left), h = Math.min(a.b.bottom, c.b.bottom) - Math.max(a.b.top, c.b.top); if (w > 0.5 && h > 0.5) bad.push(a.name + ' overlaps ' + c.name); });
          });
          return { names: items.map((x) => x.name), bad };
        });
        if (r.names.join('|') !== WANT.join('|')) fail('Top bar of ' + f + ' at ' + width + ' holds "' + r.names.join(', ') + '", not "' + WANT.join(', ') + '"');
        r.bad.forEach((m) => fail('Top bar of ' + f + ' at ' + width + ': ' + m));
      }
      if (width < 760) {
        for (const [f, want] of [['Patterns.dc.html', 'Roadmap'], ['Sheet.dc.html', 'Problems']]) {
          await pg.evaluate((n) => window.__dsNav(n), f); await pg.waitForTimeout(400);
          await pg.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); });
          await pg.click('button[aria-label="Open menu"]'); await pg.waitForTimeout(300);
          const m = await pg.evaluate(() => [...document.querySelectorAll('nav[aria-label="Main sections"] a')].map((a) => ({ t: a.textContent.trim(), cur: a.getAttribute('aria-current'), shown: a.getBoundingClientRect().height > 0, bg: getComputedStyle(a).backgroundColor })));
          if (m.map((x) => x.t).join() !== 'Roadmap,Problems' || m.some((x) => !x.shown)) fail('Menu at ' + width + ' on ' + f + ' lists ' + JSON.stringify(m.map((x) => x.t)) + ', not Roadmap and Problems');
          else {
            const on = m.filter((x) => x.cur === 'page');
            if (on.length !== 1 || on[0].t !== want) fail('Menu at ' + width + ' on ' + f + ' marks ' + JSON.stringify(on.map((x) => x.t)) + ', not ' + want);
            if (m.find((x) => x.t === want).bg === m.find((x) => x.t !== want).bg) fail('Menu at ' + width + ' on ' + f + ': the current page is not highlighted');
          }
          await pg.keyboard.press('Escape'); await pg.click('aside[aria-label="Menu"] button[aria-label="Close menu"]').catch(() => {}); await pg.waitForTimeout(200);
        }
      } else {
        const hid = await pg.evaluate(() => { const n = document.querySelector('nav[aria-label="Main sections"]'); return !n || n.getBoundingClientRect().height === 0; });
        if (!hid) fail('The phone-only menu entries show at ' + width);
      }
      await pg.close();
    }

    // Start here on a phone: the first line of step text of lesson 1 is above the pinned bar (the bar is one slim 56px row; the "builds on" note sits in About under "Know these first", not above the picture). The Watch / Your variables / Try it row fades at its
    // right edge only while it really runs past the edge. The Big-O picture draws every row from the first step. The "Swipe" note follows the real width.
    for (const [w, h] of [[390, 844], [320, 700], [1440, 900]]) {
      const pg = await browser.newPage({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Chapter.dc.html')); await pg.waitForTimeout(1000);
      await pg.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); });
      if (w < 760) await pg.click('.sh-side-btn');
      const n = Math.min(6, (await pg.$$('.sh-side-list a')).length);
      for (let k = 0; k < n; k++) {
        if (k > 0 && w < 760) await pg.click('.sh-side-btn').catch(() => {});
        const links = await pg.$$('.sh-side-list a'); const name = ((await links[k].textContent()) || '').replace(/^\s*✓?\s*/, '').trim();
        await links[k].click(); await pg.waitForTimeout(900);
        const f = await pg.evaluate(() => {
          const say = document.querySelector('.st-say'), bar = document.querySelector('.sh-s-ctl'), row = document.querySelector('.sh-tabrow'), wrap = row && row.parentElement;
          if (!say || !bar || !row) return null;
          const rg = document.createRange(); rg.selectNodeContents(say); const first = rg.getClientRects()[0];
          const cue = wrap && getComputedStyle(wrap, '::after');
          const more = row.scrollWidth - row.clientWidth > 1 && row.scrollLeft + row.clientWidth < row.scrollWidth - 1;
          // The first full sentence of step text, and the bar's rows (every shown button on one row), and where the "builds on" note is.
          const tx = say.textContent, m = /^[\s\S]*?[.?!](\s|$)/.exec(tx), end = m ? m[0].trimEnd().length : tx.length; let sentBottom = -1;
          const tw = document.createTreeWalker(say, NodeFilter.SHOW_TEXT); const tn = tw.nextNode(); if (tn) { const r2 = document.createRange(); r2.setStart(tn, 0); r2.setEnd(tn, Math.min(end, tn.length)); const rs = r2.getClientRects(); sentBottom = rs.length ? Math.round(rs[rs.length - 1].bottom) : -1; }
          const bb = bar.getBoundingClientRect(), kids = [...bar.children].filter((x) => getComputedStyle(x).display !== 'none').map((x) => x.getBoundingClientRect());
          const note = [...document.querySelectorAll('p')].filter((x) => /This lesson builds on/.test(x.textContent));
          return { sentBottom, barH: Math.round(bb.height), rows: new Set(kids.map((r) => Math.round(r.top / 8))).size, kidsOut: kids.some((r) => r.top < bb.top - 1 || r.bottom > bb.bottom + 1), noteN: note.length, noteInAbout: note.every((x) => !!x.closest('section[aria-label="Know these first"]') && !!x.querySelector('a[href]')), lineBottom: first ? Math.round(first.bottom) : -1, barTop: Math.round(bar.getBoundingClientRect().top), vh: innerHeight, cue: wrap && wrap.hasAttribute('data-fadecue'), fade: cue ? parseFloat(cue.opacity) : -1, more, over: row.scrollWidth - row.clientWidth };
        });
        const id = 'Start here "' + name + '" at ' + w + 'x' + h;
        if (!f) { fail(id + ': no step text, bar or tab row'); continue; }
        if (w < 760 && (f.lineBottom < 0 || f.lineBottom > f.barTop)) fail(id + ': the first line of step text ends at ' + f.lineBottom + ', under the pinned bar that starts at ' + f.barTop);
        if (w === 390 && (f.sentBottom < 0 || f.sentBottom > f.barTop)) fail(id + ': the first full sentence of step text ends at ' + f.sentBottom + ', under the bar that starts at ' + f.barTop);
        if (w < 760 && (f.barH !== 56 || f.rows !== 1 || f.kidsOut)) fail(id + ': the player bar is ' + f.barH + 'px tall on ' + f.rows + ' row(s); it must be one slim 56px row');
        if (f.noteN > 0 && !f.noteInAbout) fail(id + ': the "This lesson builds on" note is outside About, "Know these first", or has no link');
        if (k > 0 && w === 390 && f.noteN !== 1) fail(id + ': the "This lesson builds on" line is missing from About (found ' + f.noteN + ')');
        if (!f.cue) fail(id + ': the tab row has no fade wrapper');
        else if ((f.fade === 1) !== f.more) fail(id + ': the right-edge fade is ' + (f.fade === 1 ? 'showing' : 'hidden') + ' but the row ' + (f.more ? 'runs past the edge' : 'fits'));
        if (k === 0) console.log('  ' + id + ': first line ends ' + f.lineBottom + ' of bar top ' + f.barTop + ', tab row overflow ' + f.over + 'px, fade ' + f.fade);
      }
      if (w < 760) { // scrolled to the end the fade goes away
        await pg.evaluate(() => { const r = document.querySelector('.sh-tabrow'); r.scrollLeft = r.scrollWidth; }); await pg.waitForTimeout(600);
        const end = await pg.evaluate(() => { const r = document.querySelector('.sh-tabrow'); return r.scrollWidth - r.clientWidth > 1 ? parseFloat(getComputedStyle(r.parentElement, '::after').opacity) : -1; });
        if (end === 1) fail('Start here at ' + w + ': the fade still shows with the tab row scrolled to its end');
      }
      await pg.close();
    }

    // Big-O at 1440: every row has its bar from the first step (O(1) filled, the other five as outlines) and "n = 16" sits inside the picture with padding.
    {
      const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('ConceptLesson.dc.html')); await pg.waitForTimeout(1500);
      const b = await pg.evaluate(() => {
        const sec = document.querySelector('main section[aria-label="Animation"]'), svg = sec.querySelector('svg'), sb = sec.getBoundingClientRect();
        const bars = [...svg.querySelectorAll('rect')].filter((r) => parseFloat(r.getAttribute('width')) > 4 && parseFloat(r.getAttribute('x')) === 230);
        const lab = [...svg.querySelectorAll('text')].find((t) => /^n = \d+$/.test(t.textContent.trim())), lb = lab && lab.getBoundingClientRect();
        const rows = [...svg.querySelectorAll('text')].map((t) => t.textContent.trim()).filter((t) => /^O\(/.test(t));
        return { title: document.querySelector('h1').textContent.trim(), filled: bars.filter((r) => r.getAttribute('fill') !== 'none').length, outlined: bars.filter((r) => r.getAttribute('fill') === 'none' && r.getAttribute('stroke') !== 'none').length,
          padTop: lb ? Math.round(lb.top - sb.top) : -1, padLeft: lb ? Math.round(lb.left - sb.left) : -1, inside: !!lb && lb.top > sb.top && lb.bottom < sb.bottom, rows };
      });
      if (!/Big-O/.test(b.title)) fail('Big-O check opened "' + b.title + '"');
      if (b.filled !== 1 || b.outlined !== 5) fail('Big-O step 1 draws ' + b.filled + ' filled and ' + b.outlined + ' outlined bars, not 1 and 5');
      if (!b.inside || b.padTop < 16) fail('Big-O "n = 16" is ' + b.padTop + 'px from the top of the picture, not at least 16px inside it');
      if (b.rows.join() !== 'O(1),O(log n),O(n),O(n log n),O(n²),O(2ⁿ)') fail('Big-O row labels are ' + b.rows.join());
      console.log('  Big-O at 1440: ' + b.filled + ' filled and ' + b.outlined + ' outlined bars, "n = 16" ' + b.padTop + 'px below the top edge');
      await pg.close();
    }

    // "Swipe to see all of it" shows only while the picture is wider than its box, on load, after a resize and after the width changes by script.
    for (const pgn of ['ConceptLesson', 'AILesson']) {
      const pg = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      await pg.goto('http://localhost:' + server.address().port + '/'); await pg.waitForTimeout(500);
      await pg.evaluate((n) => window.__dsNav(n), pgn + '.dc.html'); await pg.waitForTimeout(1200);
      const state = () => pg.evaluate(() => {
        const s = [...document.querySelectorAll('[data-swipe]')][0], box = document.querySelector('main section[aria-label="Animation"]');
        return { note: !!s && getComputedStyle(s).display !== 'none' && s.getBoundingClientRect().height > 0, wide: !!box && box.scrollWidth - box.clientWidth > 1, exists: !!s };
      });
      const id = pgn + ' "Swipe" note';
      let st = await state();
      if (!st.exists) fail(id + ': not on the page at 390');
      else if (st.note !== st.wide) fail(id + ' at 390: ' + (st.note ? 'shows' : 'is hidden') + ' but the picture ' + (st.wide ? 'is wider than its box' : 'fits'));
      // Make the picture fit by script: the note must go away without a reload.
      await pg.evaluate(() => { const box = document.querySelector('main section[aria-label="Animation"]'); box.__ow = box.style.overflowX; box.style.overflowX = 'hidden'; box.querySelectorAll('svg').forEach((v) => { v.__mw = v.style.minWidth; v.style.minWidth = '0'; v.style.width = '100%'; }); });
      await pg.waitForTimeout(900); st = await state();
      if (st.exists && !st.wide && st.note) fail(id + ': still shows after the picture was made to fit');
      await pg.setViewportSize({ width: 320, height: 700 }); await pg.waitForTimeout(900);
      await pg.evaluate(() => { const box = document.querySelector('main section[aria-label="Animation"]'); box.style.overflowX = ''; box.querySelectorAll('svg').forEach((v) => { v.style.minWidth = ''; v.style.width = ''; }); }); await pg.waitForTimeout(900);
      st = await state();
      if (st.exists && st.note !== st.wide) fail(id + ' at 320 after a resize: ' + (st.note ? 'shows' : 'is hidden') + ' but the picture ' + (st.wide ? 'is wider than its box' : 'fits'));
      console.log('  ' + pgn + ' Swipe note: shows ' + st.note + ' while wider ' + st.wide + ' (320)');
      await pg.close();
    }
  }

  // ---- The Problems page (Sheet.dc.html) and the search box ----
  // A plain table (title, topic, difficulty, done) with a search box and three filters. The filters live in the address, so Back restores them.
  // All 562 problems are reachable (paged, 50 at a time), the filters work alone and together, an empty result is one line and Clear filters,
  // and a problem opens with one click on its title. The search box shows no counts, finds a problem and a lesson by name, and a problem is two clicks from Home.
  if (!ONLY_PROBLEM) {
    const base = 'http://localhost:' + server.address().port + '/';
    const openPage = async (w, h, theme, name) => {
      const pg = await browser.newPage({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
      await pg.addInitScript((t) => { try { localStorage.setItem('dsaviz-theme', t); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} }, theme);
      pg.errs = []; pg.on('pageerror', (e) => pg.errs.push(e.message));
      await pg.goto(base); await pg.waitForTimeout(500);
      await pg.evaluate((n) => window.__dsNav(n), name); await pg.waitForTimeout(900);
      await pg.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); });
      return pg;
    };
    const rowsOf = (pg) => pg.evaluate(() => [...document.querySelectorAll('.sp-body .sp-row')].map((r) => ({ title: r.querySelector('.sp-name').textContent.trim(), topic: r.querySelector('.sp-topic').textContent.trim(), diff: r.querySelector('.sp-diff').textContent.trim(), href: r.querySelector('.sp-name a').getAttribute('href'), done: /✓/.test(r.querySelector('.sp-done').textContent) })));
    const where = (pg) => pg.evaluate(() => ({ hash: location.hash, search: location.search, q: document.querySelector('input[type=search][aria-label="Search problems"]').value }));
    const sel = (pg, label) => pg.locator('label:has(> span:text-is("' + label + '")) select');

    // 1440 and 390, dark, plus 390 light: the page itself.
    for (const [w, h, theme] of [[1440, 900, 'max'], [390, 844, 'max'], [390, 844, 'paper'], [320, 700, 'max']]) {
      const pg = await openPage(w, h, theme, 'Sheet.dc.html');
      const id = 'Problems at ' + w + ' (' + theme + ')';
      const h1 = await pg.textContent('main h1');
      if (h1.trim() !== 'Problems') fail(id + ': h1 is "' + h1 + '"');
      const heads = await pg.evaluate(() => [...document.querySelectorAll('.sp-head [role=columnheader]')].map((x) => x.textContent.trim()));
      if (heads.join('|') !== 'Title|Topic|Difficulty|Done') fail(id + ': columns are ' + heads.join('|'));
      const rows = await rowsOf(pg);
      if (rows.length !== 50) fail(id + ': ' + rows.length + ' rows on the first page, not 50');
      const txt = await pg.evaluate(() => document.querySelector('main').innerText);
      for (const gone of ["Today's 5", 'Random', 'Open all', 'Close all', 'Export', 'Import', 'Starter 50', 'Core 150', 'Company', 'Add a note']) if (txt.includes(gone)) fail(id + ': still shows "' + gone + '"');
      // No story names or summaries: the row text is only title, topic, difficulty and the done tick.
      const cells = await pg.evaluate(() => document.querySelectorAll('.sp-body .sp-row').length ? [...document.querySelector('.sp-body .sp-row').children].length : 0);
      if (cells !== 4) fail(id + ': a row has ' + cells + ' cells, not 4');
      const m = await pg.evaluate(() => {
        const out = { over: document.documentElement.scrollWidth - innerWidth, small: [], bodyFont: 0 };
        document.querySelectorAll('main *').forEach((el) => { if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 14 && !el.closest('.sp-sr')) out.small.push(el.tagName + ' ' + fs + ' ' + el.textContent.trim().slice(0, 20)); } });
        const a = document.querySelector('.sp-name a'); out.titleFont = parseFloat(getComputedStyle(a).fontSize); out.titleH = a.getBoundingClientRect().height;
        const r0 = document.querySelector('.sp-body .sp-row'); const n = r0.querySelector('.sp-name').getBoundingClientRect(), t = r0.querySelector('.sp-topic').getBoundingClientRect(), d = r0.querySelector('.sp-diff').getBoundingClientRect();
        out.stack = { nameBottom: Math.round(n.bottom), topicTop: Math.round(t.top), diffTop: Math.round(d.top), topicLeft: Math.round(t.left), nameLeft: Math.round(n.left) };
        out.diffColor = getComputedStyle(r0.querySelector('.sp-diff')).color;
        out.r = r0.getBoundingClientRect().width;
        return out;
      });
      if (m.over > 0) fail(id + ': page scrolls sideways by ' + m.over + 'px');
      if (m.small.length) fail(id + ': text under 14px: ' + m.small.slice(0, 3).join('; '));
      if (m.titleFont < 18) fail(id + ': a title is ' + m.titleFont + 'px, not 18');
      if (w < 760) {
        if (m.stack.topicTop < m.stack.nameBottom - 1) fail(id + ': on a phone the topic is not under the title');
        if (Math.abs(m.stack.topicTop - m.stack.diffTop) > 2) fail(id + ': on a phone topic and difficulty are not on one line');
        if (m.titleH < 44) fail(id + ': a title link is ' + m.titleH + 'px tall, under 44');
      } else if (m.titleH < 40) fail(id + ': a title link is ' + m.titleH + 'px tall, under 40');
      if (pg.errs.length) fail(id + ': page errors: ' + pg.errs[0]);
      console.log('  ' + id + ': ' + rows.length + ' rows, title ' + m.titleFont + 'px, no sideways scroll, difficulty colour ' + m.diffColor);
      await pg.close();
    }

    // Filters: each alone, together, in the address, and Back restores them.
    {
      const pg = await openPage(1440, 900, 'max', 'Sheet.dc.html');
      await sel(pg, 'Difficulty').selectOption('Hard'); await pg.waitForTimeout(200);
      let rows = await rowsOf(pg);
      if (!rows.length || rows.some((r) => r.diff !== 'Hard')) fail('Problems: difficulty Hard lets other difficulties through');
      await sel(pg, 'Topic').selectOption('Heap'); await pg.waitForTimeout(200);
      rows = await rowsOf(pg);
      if (!rows.length || rows.some((r) => r.diff !== 'Hard' || r.topic !== 'Heap')) fail('Problems: topic Heap with Hard does not combine');
      await sel(pg, 'Done').selectOption('no'); await pg.waitForTimeout(200);
      const notDone = await rowsOf(pg);
      if (notDone.length !== rows.length) fail('Problems: nothing is done yet, so "Not done" should keep ' + rows.length + ' rows, not ' + notDone.length);
      await sel(pg, 'Done').selectOption('yes'); await pg.waitForTimeout(200);
      const doneText = await pg.evaluate(() => document.querySelector('main').innerText);
      if (!/No problems match\./.test(doneText) || !/Clear filters/.test(doneText)) fail('Problems: an empty result should say "No problems match." with Clear filters');
      const emptyLines = await pg.evaluate(() => { const e = document.querySelector('.sp-empty'); return e ? [...e.querySelectorAll('p')].length + ' text, ' + e.querySelectorAll('button').length + ' button' : 'none'; });
      if (emptyLines !== '1 text, 1 button') fail('Problems: the empty state is ' + emptyLines + ', not one line and one button');
      await sel(pg, 'Done').selectOption('no'); await pg.waitForTimeout(200);
      let at = await where(pg);
      if (!/difficulty=Hard/.test(at.search) || !/topic=Heap/.test(at.search) || !/done=no/.test(at.search) || at.hash !== '#Sheet') fail('Problems: the filters are not in the address: ' + at.search + at.hash);
      // One click on a title opens the problem; Back (the browser's) brings the same filters back.
      const first = rows[0];
      await pg.click('.sp-body .sp-row .sp-name a'); await pg.waitForTimeout(1200);
      const opened = await pg.evaluate(() => ({ hash: location.hash, search: location.search, h: (document.querySelector('[data-page="Code"] h1, [data-page="Code"] h2') || {}).textContent }));
      if (opened.hash !== '#Code' || !/problem=/.test(opened.search)) fail('Problems: one click on "' + first.title + '" opened ' + opened.hash + opened.search);
      await pg.goBack(); await pg.waitForTimeout(900);
      at = await where(pg);
      const back = await pg.evaluate(() => ({ topic: document.querySelector('label:has(> span) select').value, selects: [...document.querySelectorAll('.sp-pick select')].map((s) => s.value) }));
      if (at.hash !== '#Sheet' || back.selects.join('|') !== 'Heap|Hard|no') fail('Problems: Back from a problem did not restore the filters (' + at.hash + at.search + ' ' + back.selects.join('|') + ')');
      rows = await rowsOf(pg);
      if (!rows.length || rows.some((r) => r.diff !== 'Hard' || r.topic !== 'Heap')) fail('Problems: after Back the rows do not match the filters');
      // The page's own Back link (the trail) restores them too.
      await pg.click('.sp-body .sp-row .sp-name a'); await pg.waitForTimeout(1200);
      await pg.evaluate(() => { const b = [...document.querySelectorAll('button,a')].find((x) => /^\s*(←\s*)?Back to Problems/.test(x.textContent)); if (b) b.click(); }); await pg.waitForTimeout(900);
      const sel2 = await pg.evaluate(() => [...document.querySelectorAll('.sp-pick select')].map((s) => s.value).join('|'));
      if (sel2 !== 'Heap|Hard|no') fail('Problems: the Back link on the problem did not restore the filters (' + sel2 + ')');
      // Back inside the page undoes a filter change.
      await sel(pg, 'Difficulty').selectOption('Easy'); await pg.waitForTimeout(200);
      await pg.goBack(); await pg.waitForTimeout(500);
      const sel3 = await pg.evaluate(() => [...document.querySelectorAll('.sp-pick select')].map((s) => s.value).join('|'));
      if (sel3 !== 'Heap|Hard|no') fail('Problems: Back after changing a filter gave ' + sel3);
      // Search in the page, then Clear filters.
      await pg.fill('input[aria-label="Search problems"]', 'zzzzqqq'); await pg.waitForTimeout(200);
      if (!(await pg.textContent('main')).includes('No problems match.')) fail('Problems: a search with no match shows no empty message');
      await pg.click('button:has-text("Clear filters")'); await pg.waitForTimeout(300);
      at = await where(pg);
      rows = await rowsOf(pg);
      if (at.search !== '' || at.q !== '' || rows.length !== 50) fail('Problems: Clear filters left ' + at.search + ' with ' + rows.length + ' rows');
      if (pg.errs.length) fail('Problems page errors: ' + pg.errs[0]);
      console.log('  Problems filters: combine, are in the address, Back and the Back link restore them; empty state is one line and Clear filters');
      await pg.close();
    }

    // Due for review: the problems the old Revisit page offered (a problem solved three days ago is due). It combines with the other filters, is
    // in the address, Back undoes it, and with nothing due the page says so in one line. The ⓘ tip is one line.
    {
      const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const doneAgo = Date.now() - 3 * 86400000;
      await pg.addInitScript(([ts]) => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); if (!localStorage.getItem('dsaviz-sheet-v1')) localStorage.setItem('dsaviz-sheet-v1', JSON.stringify({ v: 1, done: { 'two-sum-ii-input-array-is-sorted': ts, 'valid-palindrome': ts }, star: {} })); } catch (e) {} }, [doneAgo]);
      pg.errs = []; pg.on('pageerror', (e) => pg.errs.push(e.message));
      await pg.goto(base); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Sheet.dc.html')); await pg.waitForTimeout(900);
      await pg.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); });
      const chip = pg.locator('button.sp-chip:has-text("Due for review")');
      if ((await chip.getAttribute('aria-pressed')) !== 'false') fail('Problems: Due for review should start off');
      await chip.click(); await pg.waitForTimeout(250);
      let rows = await rowsOf(pg);
      const titles = rows.map((r) => r.title).sort().join('|');
      if (titles !== 'Two Sum II - Input Array Is Sorted|Valid Palindrome') fail('Problems: Due for review lists "' + titles + '", expected the two problems solved three days ago');
      if (rows.some((r) => !r.done)) fail('Problems: a due problem is not ticked as done');
      if (!/due=1/.test((await where(pg)).search)) fail('Problems: Due for review is not in the address');
      await sel(pg, 'Difficulty').selectOption(rows[0].diff === 'Easy' ? 'Hard' : 'Easy'); await pg.waitForTimeout(200);
      rows = await rowsOf(pg);
      if (rows.length > 1) fail('Problems: Due for review does not combine with difficulty (' + rows.length + ' rows)');
      await pg.goBack(); await pg.waitForTimeout(400); await pg.goBack(); await pg.waitForTimeout(400);
      rows = await rowsOf(pg);
      if (rows.length !== 50 || (await chip.getAttribute('aria-pressed')) !== 'false') fail('Problems: Back did not undo Due for review (' + rows.length + ' rows)');
      await pg.click('button[aria-label="About Due for review"]'); await pg.waitForTimeout(150);
      const tip = await pg.evaluate(() => { const t = document.querySelector('.sp-tip'); return t ? t.textContent.trim() + '|' + Math.round(t.getBoundingClientRect().height) : ''; });
      if (!tip || tip.split('|')[0].split(/[.!?]\s/).length > 2 || +tip.split('|')[1] > 60) fail('Problems: the Due for review tip is not one line: ' + tip);
      // Nothing due: a fresh learner sees one line and Clear filters.
      const fresh = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await fresh.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      await fresh.goto(base + '?due=1#Sheet'); await fresh.waitForTimeout(900);
      const emptyTxt = await fresh.evaluate(() => (document.querySelector('.sp-empty') || {}).innerText || '');
      if (!/No problems are due for review\./.test(emptyTxt) || !/Clear filters/.test(emptyTxt)) fail('Problems: with nothing due the page says "' + emptyTxt.replace(/\s+/g, ' ') + '"');
      await fresh.close();
      if (pg.errs.length) fail('Problems page errors: ' + pg.errs[0]);
      console.log('  Due for review: lists the two problems solved three days ago, combines with Difficulty, is in the address, Back undoes it; the tip is one line; nothing due gives one line and Clear filters');
      await pg.close();
    }

    // Timed: off by default, a switch that is remembered, and a countdown on the Problem page that can be paused, resumed and stopped.
    {
      const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
      pg.errs = []; pg.on('pageerror', (e) => pg.errs.push(e.message));
      await pg.goto(base); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Sheet.dc.html')); await pg.waitForTimeout(800);
      await pg.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); });
      await pg.click('.sp-body .sp-row .sp-name a'); await pg.waitForTimeout(1000);
      if (await pg.locator('.pb-clock').count()) fail('Timed: a countdown shows on the Problem page while Timed is off');
      await pg.evaluate(() => window.__dsNav('Sheet.dc.html')); await pg.waitForTimeout(800);
      const sw = pg.locator('button[role=switch]:has-text("Timed")');
      if ((await sw.getAttribute('aria-checked')) !== 'false') fail('Timed: the switch should start off');
      await sw.click(); await pg.waitForTimeout(200);
      if ((await sw.getAttribute('aria-checked')) !== 'true') fail('Timed: the switch does not turn on');
      await pg.reload(); await pg.waitForTimeout(900);
      await pg.evaluate(() => window.__dsNav('Sheet.dc.html')); await pg.waitForTimeout(800);
      if ((await pg.locator('button[role=switch]:has-text("Timed")').getAttribute('aria-checked')) !== 'true') fail('Timed: the switch was not remembered after a reload');
      await pg.click('button[aria-label="About Timed"]'); await pg.waitForTimeout(150);
      const tt = await pg.evaluate(() => (document.querySelector('.sp-tip') || {}).textContent || '');
      if (!/countdown/.test(tt) || !/\d+ minutes/.test(tt)) fail('Timed: the tip does not explain the countdown: "' + tt + '"');
      await pg.click('.sp-body .sp-row .sp-name a'); await pg.waitForTimeout(1000);
      const clock = () => pg.evaluate(() => { const t = document.querySelector('.pb-clock [role=timer]'); return t ? t.textContent.trim() : null; });
      const secs = (s) => { const m = /^(\d+):(\d\d)$/.exec(s || ''); return m ? +m[1] * 60 + +m[2] : -1; };
      const c1 = await clock();
      if (secs(c1) < 0) fail('Timed: no countdown on the Problem page (it reads "' + c1 + '")');
      // The countdown starts from the problem's own "about N min", not a per-difficulty default.
      const est = await pg.evaluate(() => { const m = /about (\d+) min/.exec((document.querySelector('.pb-meta-l') || {}).textContent || ''); return m ? +m[1] : 0; });
      if (est && Math.abs(secs(c1) - est * 60) > 5) fail('Timed: the countdown starts at ' + c1 + ' but the page says about ' + est + ' min');
      await pg.waitForTimeout(2200);
      const c2 = await clock();
      if (!(secs(c2) >= 0 && secs(c2) < secs(c1))) fail('Timed: the countdown does not go down (' + c1 + ' then ' + c2 + ')');
      const btns = await pg.evaluate(() => [...document.querySelectorAll('.pb-clock button')].map((b) => b.textContent.trim()));
      if (btns.join('|') !== 'Pause|Stop timer') fail('Timed: the countdown has the buttons ' + btns.join('|') + ', not Pause and Stop timer');
      await pg.click('.pb-clock button:has-text("Pause")'); await pg.waitForTimeout(300);
      const p1 = await clock(); await pg.waitForTimeout(2200); const p2 = await clock();
      if (p1 !== p2) fail('Timed: Pause does not stop the countdown (' + p1 + ' then ' + p2 + ')');
      await pg.click('.pb-clock button:has-text("Resume")'); await pg.waitForTimeout(2200);
      const r2 = await clock();
      if (!(secs(r2) < secs(p2))) fail('Timed: Resume does not restart the countdown (' + p2 + ' then ' + r2 + ')');
      await pg.click('.pb-clock button:has-text("Stop timer")'); await pg.waitForTimeout(300);
      if (await pg.locator('.pb-clock').count()) fail('Timed: Stop timer leaves the countdown on screen');
      const over = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (over > 0) fail('Timed: the Problem page scrolls sideways by ' + over + 'px');
      // Off again: no countdown on the next problem.
      await pg.evaluate(() => window.__dsNav('Sheet.dc.html')); await pg.waitForTimeout(800);
      await pg.click('button[role=switch]:has-text("Timed")'); await pg.waitForTimeout(200);
      await pg.click('.sp-body .sp-row .sp-name a'); await pg.waitForTimeout(1000);
      if (await pg.locator('.pb-clock').count()) fail('Timed: a countdown shows after the switch is turned off');
      if (pg.errs.length) fail('Timed page errors: ' + pg.errs[0]);
      console.log('  Timed: off by default, remembered, countdown ' + c1 + ' -> ' + c2 + ' on the Problem page, Pause and Resume work, Stop timer removes it, off again shows none');
      await pg.close();
    }

    // Every problem is reachable: page through all of them, and find a sample by typing the title.
    {
      const pg = await openPage(1440, 900, 'max', 'Sheet.dc.html');
      const seen = new Set(); let pages = 0; const t0 = Date.now(); let worst = 0;
      for (;;) {
        (await rowsOf(pg)).forEach((r) => seen.add(r.href)); pages++;
        const next = pg.locator('.sp-pager button:has-text("Next")');
        if (!(await next.count()) || (await next.isDisabled())) break;
        const s0 = Date.now(); await next.click(); await pg.waitForFunction(() => document.querySelector('.sp-body .sp-row'), null, { timeout: 5000 }); worst = Math.max(worst, Date.now() - s0);
      }
      const total = await pg.evaluate(() => 0);
      if (seen.size !== 562) fail('Problems: paging reached ' + seen.size + ' problems, not 562');
      for (const title of ['Two Sum', 'Valid Parentheses', 'LRU Cache', 'Median of Two Sorted Arrays', 'Climbing Stairs', 'Word Break']) {
        await pg.goto(base + '?q=' + encodeURIComponent(title) + '#Sheet'); await pg.waitForTimeout(700);
        const found = await rowsOf(pg);
        if (!found.some((r) => r.title === title)) fail('Problems: searching "' + title + '" does not list it (' + found.slice(0, 3).map((r) => r.title).join(', ') + ')');
      }
      console.log('  Problems: ' + seen.size + ' problems reached over ' + pages + ' pages (50 a page, so at most 50 rows are drawn); slowest page change ' + worst + 'ms');
      if (worst > 700) fail('Problems: a page change took ' + worst + 'ms');
      await pg.close();
    }

    // Search: no counts, plain placeholder, a problem and a lesson by name, no story names, two clicks from Home.
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const pg = await openPage(w, h, 'max', 'Home.dc.html');
      const id = 'Search at ' + w;
      if (w < 760) await pg.click('[data-pn-search-btn]'); else await pg.keyboard.press('/');
      await pg.waitForTimeout(300);
      const ph = await pg.getAttribute('[data-pn-search-input]', 'placeholder');
      if (ph !== 'Search lessons and problems') fail(id + ': placeholder is "' + ph + '"');
      const hint = await pg.evaluate(() => document.querySelector('[data-pn-results]').innerText + ' | ' + (document.querySelector('[data-pn-panel] [role=status]') || {}).textContent);
      if (/\d/.test(hint)) fail(id + ': the empty search shows a number: "' + hint.replace(/\s+/g, ' ') + '"');
      await pg.fill('[data-pn-search-input]', 'two sum'); await pg.waitForTimeout(400);
      const res = await pg.evaluate(() => ({ text: document.querySelector('[data-pn-panel]').innerText, status: document.querySelector('[data-pn-panel] [role=status]').textContent, opts: [...document.querySelectorAll('[role=option]')].map((o) => o.innerText.replace(/\s+/g, ' ')) }));
      if (/\d+\s*(sheet |runnable )?(problems?|results?|matches)/i.test(res.text) || /\d/.test(res.status)) fail(id + ': the results show a count: "' + res.status + '" / ' + res.text.slice(0, 80));
      if (!res.opts.some((o) => /^Two Sum\b/.test(o))) fail(id + ': "two sum" finds no problem called Two Sum: ' + res.opts.slice(0, 3).join(' / '));
      if (res.opts.some((o) => /The [A-Z][a-z]+ [A-Z]|Lantern|Scrabble|Hallway/.test(o))) fail(id + ': a result shows a story name: ' + res.opts.find((o) => /The [A-Z]/.test(o)));
      if (/Stories|Master sheet/.test(res.text)) fail(id + ': a result group is still called Stories or Master sheet');
      // One click opens the problem.
      const clicks = w < 760 ? 1 : 0; // the search button counts as the first click on a phone; on a desktop "/" opens it
      await pg.click('[role=option]:has-text("Two Sum"):not(:has-text("II")) >> nth=0'); await pg.waitForTimeout(1200);
      const at = await pg.evaluate(() => ({ hash: location.hash, pid: (window.localStorage.getItem('dsaviz-problem')), h1: (document.querySelector('[data-page="Code"]') || {}).innerText }));
      if (at.hash !== '#Code') fail(id + ': a problem result opened ' + at.hash);
      console.log('  ' + id + ': "two sum" opens its problem in ' + (clicks + 1) + ' click(s) from Home; no counts in the hint, status or results');
      // A lesson by name.
      await pg.evaluate(() => window.__dsNav('Home.dc.html')); await pg.waitForTimeout(700);
      if (w < 760) await pg.click('[data-pn-search-btn]'); else await pg.keyboard.press('/');
      await pg.waitForTimeout(300);
      await pg.fill('[data-pn-search-input]', 'variables'); await pg.waitForTimeout(400);
      const lessons = await pg.evaluate(() => [...document.querySelectorAll('[role=option]')].map((o) => ({ t: o.innerText.replace(/\s+/g, ' '), g: o.parentElement.querySelector('div').textContent })));
      if (!lessons.some((o) => /Variables/i.test(o.t) && /lessons|concepts|AI|Git|System/i.test(o.g))) fail(id + ': "variables" finds no lesson: ' + lessons.slice(0, 3).map((o) => o.t).join(' / '));
      await pg.click('[role=option]:has-text("Variables") >> nth=0'); await pg.waitForTimeout(1000);
      const lh = await pg.evaluate(() => location.hash);
      if (!/Chapter|ConceptLesson|AILesson|SDLesson|Git/.test(lh)) fail(id + ': a lesson result opened ' + lh);
      if (pg.errs.length) fail(id + ' errors: ' + pg.errs[0]);
      await pg.close();
    }

    // Two clicks at most from Home to a problem: Problems in the top bar, then the title.
    {
      const pg = await openPage(1440, 900, 'max', 'Home.dc.html');
      await pg.click('a[data-pn-item]:has-text("Problems")'); await pg.waitForTimeout(900);
      await pg.click('.sp-body .sp-row .sp-name a'); await pg.waitForTimeout(1200);
      const hash = await pg.evaluate(() => location.hash);
      if (hash !== '#Code') fail('Home to a problem took more than two clicks (ended on ' + hash + ')');
      else console.log('  Home -> Problems -> a problem: two clicks');
      await pg.close();
    }
  }

  if (ONLY_PAGE) { await browser.close(); server.close(); console.log(bad ? bad + ' problems' : 'problems page clean'); process.exit(bad ? 1 : 0); }

  // ---- The Problem page (Code.dc.html): statement left, editor right, tabs, Story switch, hints, solution, tests ----
  const vm = require('vm');
  const ctx = { window: {}, module: { exports: {} }, console }; vm.createContext(ctx);
  for (const f of ['themes_common.js', 'catalog.js', 'sheet.js', 'tests_spec.js', 'hints.js', 'approaches.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'shared', f), 'utf8') + '\n;', ctx, { filename: f });
  const data = vm.runInContext('({ specs: TEST_SPECS, approaches: APPROACHES })', ctx);
  // Five sample problems whose best approach is written in both languages under the function name the starter uses: a correct answer to run.
  const SAMPLES = ['valid-palindrome', 'move-zeroes', 'two-sum-ii', 'container', 'longest-substring', 'best-time-stock', 'valid-anagram', 'product-except-self', 'max-subarray']
    .filter((id) => { const sp = data.specs[id], ap = data.approaches[id]; if (!sp || !ap) return false; const b = ap[ap.length - 1]; return b.js && b.py && b.js.indexOf(sp.fn) >= 0 && b.py.indexOf(sp.fn) >= 0; }).slice(0, 5);
  if (SAMPLES.length < 5) fail('only ' + SAMPLES.length + ' sample problems have a correct answer in both languages');
  const url = 'http://localhost:' + server.address().port + '/';
  const openProblem = async (pg, pid, extra) => { await pg.evaluate(([p, e]) => window.__dsNav('Code.dc.html', '?problem=' + p + (e || '')), [pid, extra]); await pg.waitForTimeout(900); await pg.evaluate(() => { const b = document.querySelector('[data-daily] button[aria-label="Close"]'); if (b) b.click(); }); await pg.waitForTimeout(100); };
  const verdict = (pg) => pg.evaluate(() => { const v = document.querySelector('.pb-tests .pb-verdict'); return v ? v.textContent.trim() : ''; });
  const waitDone = async (pg) => { for (let i = 0; i < 120; i++) { const v = await verdict(pg); if (v && !/^Running/.test(v) && !/^Press Run/.test(v)) return v; await pg.waitForTimeout(500); } return await verdict(pg); };
  const runIt = async (pg) => { await pg.click('.pb-runbar button.sh-btn'); await pg.waitForTimeout(300); return waitDone(pg); };
  for (const lang of ['py', 'js']) {
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const perrs = []; pg.on('pageerror', (e) => perrs.push(e.message));
    await pg.addInitScript(([l]) => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); localStorage.setItem('dsaviz-lang', l); } catch (e) {} }, [lang]);
    await pg.goto(url); await pg.waitForTimeout(500);
    for (const pid of SAMPLES) {
      const id = 'Problem ' + pid + ' in ' + (lang === 'py' ? 'Python' : 'JavaScript');
      // An empty starter: the panel says "Press Run" first, then reports a result with no error.
      await pg.evaluate(() => { localStorage.removeItem('dsaviz-code-v1'); });
      await openProblem(pg, pid);
      const first = await verdict(pg);
      if (first !== 'Press Run to test your code') fail(id + ': before the first run the panel says "' + first + '"');
      const v1 = await runIt(pg);
      const st = await pg.evaluate(() => ({ fail: !!document.querySelector('.pb-fail'), wrong: /Wrong answer/i.test(document.querySelector('.pb-tests').textContent) }));
      if (!/^(Not yet: \d+ of \d+ tests pass|All \d+ tests pass)$/.test(v1)) fail(id + ': empty starter gave "' + v1 + '"');
      if (/^Not yet/.test(v1) && !st.fail) fail(id + ': "Not yet" without the first failing test');
      if (st.wrong) fail(id + ': the panel says "Wrong answer"');
      // A correct answer (the best approach of shared/approaches.js, saved as this problem's code): every test passes.
      const best = data.approaches[pid][data.approaches[pid].length - 1][lang];
      await pg.evaluate(([pidx, l, code]) => { const o = {}; o[pidx] = {}; o[pidx][l] = code; localStorage.setItem('dsaviz-code-v1', JSON.stringify(o)); }, [pid, lang, best]);
      await openProblem(pg, pid);
      const v2 = await runIt(pg);
      if (!/^All \d+ tests pass$/.test(v2)) fail(id + ': a correct answer gave "' + v2 + '"');
      console.log('  ' + id + ': empty starter -> "' + v1 + '", correct answer -> "' + v2 + '"');
    }
    if (perrs.length) fail('page errors running ' + lang + ': ' + perrs[0]);
    await pg.close();
  }

  // SQL: Run on the visible rows reports a result, and the reference query passes every hidden table on Submit.
  {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'shared', 'sql_spec.js'), 'utf8') + ';', ctx, { filename: 'sql_spec.js' });
    const sq = vm.runInContext('SQL_SPECS', ctx), sid = 'recyclable-and-low-fat-products';
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const perrs = []; pg.on('pageerror', (e) => perrs.push(e.message));
    await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg.goto(url); await pg.waitForTimeout(500);
    await openProblem(pg, sid);
    if ((await verdict(pg)) !== 'Press Run to test your code') fail('SQL: before the first run the panel says "' + (await verdict(pg)) + '"');
    const v1 = await runIt(pg);
    if (!/^Not yet: /.test(v1)) fail('SQL: the starter query gave "' + v1 + '"');
    await pg.evaluate(([k, code]) => { const o = {}; o[k] = { sql: code }; localStorage.setItem('dsaviz-code-v1', JSON.stringify(o)); }, [sid, sq[sid].ref]);
    await openProblem(pg, sid);
    await pg.click('.pb-runbar button:has-text("Submit")'); await pg.waitForTimeout(300);
    const v2 = await waitDone(pg);
    if (!/^All \d+ tests pass$/.test(v2)) fail('SQL: the reference query gave "' + v2 + '"');
    console.log('  SQL ' + sid + ': starter -> "' + v1 + '", reference query -> "' + v2 + '"');
    if (perrs.length) fail('page errors on a SQL problem: ' + perrs[0]);
    await pg.close();
  }

  // The first screen: the statement and Run are visible with no scrolling, and the two panes fill the height at 1440.
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const pg = await browser.newPage({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
    await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg.goto(url); await pg.waitForTimeout(500);
    await openProblem(pg, 'two-sum-ii'); await pg.waitForTimeout(500);
    const f = await pg.evaluate(() => {
      const rc = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom), Math.round(r.left), Math.round(r.right)]; };
      const q = (s) => document.querySelector(s);
      const l = q('.pb-left'), r = q('.pb-right'), nav = q('[data-pn]');
      return { vh: innerHeight, ask: rc(q('.pb-ask')), run: rc(q('.pb-runbar .sh-btn')), left: rc(l), right: rc(r), nav: rc(nav), h1: (q('h1') || {}).textContent, tabs: [...document.querySelectorAll('[role=tab]')].map((t) => t.textContent.trim()).join(','),
        pos: (q('.pb-pos') || {}).textContent, back: (q('a.sh-back') || {}).textContent, prev: !!q('.pb-pager button'), scrolls: [...document.querySelectorAll('.pb-panel')].map((e) => getComputedStyle(e).overflowY).join() };
    });
    const id = 'Problem page at ' + w + 'x' + h;
    if (!f.ask || f.ask[1] > f.vh || f.ask[0] < 0) fail(id + ': the statement is not in the first screen ' + JSON.stringify(f.ask));
    if (!f.run || f.run[1] > f.vh || f.run[0] < f.nav[1] - 1) fail(id + ': Run is not in the first screen ' + JSON.stringify(f.run));
    if (f.tabs !== 'Problem,Hints,Solution,History') fail(id + ': tabs are ' + f.tabs);
    if (!/^\d+ of \d+$/.test(f.pos || '')) fail(id + ': position is "' + f.pos + '"');
    if (!/^← Back to \S/.test((f.back || '').trim())) fail(id + ': Back link says "' + f.back + '"');
    if (w >= 1024) {
      const total = f.left[3] - f.left[2] + (f.right[3] - f.right[2]), share = (f.left[3] - f.left[2]) / total;
      if (Math.abs(share - 0.45) > 0.015) fail(id + ': left pane is ' + Math.round(share * 100) + '% of the width, not 45%');
      if (f.left[1] < f.vh - 1 || f.right[1] < f.vh - 1) fail(id + ': the panes stop at ' + f.left[1] + ' / ' + f.right[1] + ', short of the screen bottom ' + f.vh);
      if (f.scrolls !== 'auto') fail(id + ': the left pane does not scroll inside itself (' + f.scrolls + ')');
    }
    await pg.close();
  }

  // Story switch, hints, solution and history, on a problem with a story.
  {
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const perrs = []; pg.on('pageerror', (e) => perrs.push(e.message));
    await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg.goto(url); await pg.waitForTimeout(500);
    await openProblem(pg, 'two-sum-ii');
    const txt = () => pg.evaluate(() => document.querySelector('.pb-left').textContent);
    const q1 = (s) => pg.locator(s).first().isVisible();
    if (/Lantern/.test(await txt())) fail('Story words show on the Problem tab before the Story switch is on');
    if (!/Asked at/.test(await txt()) || !/Constraints/.test(await txt()) || !/Examples/.test(await txt())) fail('the statement is missing Asked at, Examples or Constraints');
    if (/Why learn this/i.test(await txt())) fail('"Why learn this" is on the Problem page');
    await pg.click('.pb-switch'); await pg.waitForTimeout(700);
    if (!(await q1('.pb-story')) || !(await q1('.pb-story [data-play]'))) fail('the Story switch does not show the story and its controls');
    if (!/Lantern/.test(await txt())) fail('the story name is not shown in story mode');
    if (await q1('.pb-ask')) fail('the statement still shows in story mode');
    const s1 = await pg.evaluate(() => document.querySelector('.pb-story').textContent.match(/Step (\d+) of/)[1]);
    await pg.click('.pb-story [data-next]'); await pg.waitForTimeout(500);
    const s2 = await pg.evaluate(() => document.querySelector('.pb-story').textContent.match(/Step (\d+) of/)[1]);
    if (s2 !== String(+s1 + 1)) fail('Next step in the story went from ' + s1 + ' to ' + s2);
    await pg.click('.pb-story [data-play]'); await pg.waitForTimeout(400);
    if (!/pause/i.test(await pg.evaluate(() => document.querySelector('.pb-story [data-play]').getAttribute('aria-label')))) fail('Play did not turn into Pause');
    await pg.click('.pb-story [data-play]'); await pg.waitForTimeout(300);
    for (const tab of ['Hints', 'Solution', 'History']) { await pg.click('[role=tab]:has-text("' + tab + '")'); await pg.waitForTimeout(300); if (/Lantern/.test(await txt())) fail('Story words show on the ' + tab + ' tab'); }
    await pg.click('[role=tab]:has-text("Problem")'); await pg.waitForTimeout(300);
    await pg.click('.pb-switch'); await pg.waitForTimeout(400);
    if (await q1('.pb-story')) fail('the Story switch did not turn the story off');
    // Hints: one at a time, free.
    await pg.click('[role=tab]:has-text("Hints")'); await pg.waitForTimeout(300);
    const cards = () => pg.evaluate(() => document.querySelectorAll('.pb-hints > li').length);
    if ((await cards()) !== 0) fail('hints are open before they are asked for');
    await pg.click('button:has-text("Show the first hint")'); await pg.waitForTimeout(300);
    if ((await cards()) !== 1) fail('the first hint click opened ' + (await cards()) + ' hints');
    await pg.click('button:has-text("Show hint 2")'); await pg.waitForTimeout(300);
    if ((await cards()) !== 2) fail('the second hint click left ' + (await cards()) + ' hints open');
    // Solution: asks once.
    await pg.click('[role=tab]:has-text("Solution")'); await pg.waitForTimeout(300);
    if (await q1('pre.pb-code')) fail('the solution shows without asking');
    if (!(await q1('button:has-text("Show the solution")'))) fail('the Solution tab does not ask first');
    await pg.click('button:has-text("Show the solution")'); await pg.waitForTimeout(400);
    if (!(await q1('pre.pb-code'))) fail('confirming does not show the solution');
    await pg.click('[role=tab]:has-text("Problem")'); await pg.click('[role=tab]:has-text("Solution")'); await pg.waitForTimeout(300);
    if (!(await q1('pre.pb-code')) || (await q1('button:has-text("Show the solution")'))) fail('the Solution tab asks again after it was confirmed');
    // Search: a problem result (found by its title, "Two Sum II") lands on the Problem page. Stories are no longer a search group.
    await pg.evaluate(() => window.__dsNav('Home.dc.html')); await pg.waitForTimeout(600);
    await pg.keyboard.press('/'); await pg.waitForTimeout(300);
    await pg.keyboard.type('Two Sum II'); await pg.waitForTimeout(500);
    const hit = await pg.evaluate(() => { const o = [...document.querySelectorAll('[role=option]')].find((x) => /^Two Sum II/.test(x.innerText) && /Problems/i.test(x.parentElement.textContent)); if (o) { o.click(); return o.textContent.slice(0, 40); } return ''; });
    await pg.waitForTimeout(1200);
    if (!hit) fail('search for "Two Sum II" found no result in the Problems group');
    else {
      const at = await pg.evaluate(() => ({ page: location.hash.slice(1), h: !!document.querySelector('[data-page="Code"]') }));
      if (at.page !== 'Code' || !at.h) fail('a problem search result landed on ' + at.page + ', not the Problem page');
    }
    if (perrs.length) fail('page errors on the Problem page: ' + perrs[0]);
    await pg.close();
  }

  // No sideways scroll, in every pane, with the story on, the solution open and on a no-story problem, at 320, 390 (dark and light), 1024 and 1440.
  for (const [theme, width] of [['max', 320], ['max', 390], ['paper', 390], ['max', 1024], ['max', 1440]]) {
    const pg = await browser.newPage({ viewport: { width, height: 800 }, isMobile: width < 760, hasTouch: width < 760 });
    await pg.addInitScript(([t]) => { try { localStorage.setItem('dsaviz-theme', t); localStorage.setItem('dsaviz-tour-done', '1'); localStorage.setItem('dsaviz-solution-seen:two-sum-ii', '1'); } catch (e) {} }, [theme]);
    await pg.goto(url); await pg.waitForTimeout(500);
    for (const [label, pid, extra, tab] of [['story on', 'two-sum-ii', '&story=1', ''], ['solution', 'two-sum-ii', '', 'Solution'], ['hints', 'valid-palindrome', '', 'Hints'], ['sql', 'recyclable-and-low-fat-products', '', ''], ['plain', 'reverse-string', '', '']]) {
      await openProblem(pg, pid, extra);
      if (tab) { await pg.click('[role=tab]:has-text("' + tab + '")'); await pg.waitForTimeout(300); }
      await pg.waitForTimeout(400);
      const r = await pg.evaluate(() => {
        const de = document.documentElement, bad = [];
        document.querySelectorAll('.pb-panel, .pb-right, .pb-story, .pb-tests').forEach((e) => { if (e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX === 'visible') bad.push(e.className + ' ' + (e.scrollWidth - e.clientWidth)); });
        const small = []; const w = document.createTreeWalker(document.querySelector('.pb-split'), NodeFilter.SHOW_TEXT);
        for (let n = w.nextNode(); n; n = w.nextNode()) { if (!n.textContent.trim() || n.parentElement.closest('svg, .pb-story, .pp-stage')) continue; const fs = parseFloat(getComputedStyle(n.parentElement).fontSize); if (fs < 13.99) small.push(Math.round(fs) + 'px "' + n.textContent.trim().slice(0, 20) + '"'); }
        return { over: de.scrollWidth - de.clientWidth, bad, small, zoom: de.style.zoom };
      });
      const id = 'Problem page (' + label + ') at ' + width + ' ' + theme;
      if (r.over > 0) fail(id + ': scrolls sideways by ' + r.over + 'px');
      if (r.bad.length) fail(id + ': content wider than its pane: ' + r.bad.join(', '));
      if (r.small.length) fail(id + ': text under 14px: ' + r.small.slice(0, 3).join(', '));
      if (r.zoom !== '1') fail(id + ': zoom ' + r.zoom);
    }
    await pg.close();
  }
  // ---- The editor's line numbers line up with the code lines (also with the editor off screen, as at 390 before it is scrolled to), test chips use drawn
  // cross and check icons, Back names a list or lesson (never Home), and Java, C++ and Go are gone from the source ----
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const pg = await browser.newPage({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
    await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); localStorage.setItem('dsaviz-lang', 'py'); } catch (e) {} });
    await pg.goto(url); await pg.waitForTimeout(500);
    await openProblem(pg, 'two-sum-ii'); await pg.waitForTimeout(800);
    const g = await pg.evaluate(() => {
      const nums = [...document.querySelectorAll('.cm-lineNumbers .cm-gutterElement:not(:first-child)')].filter((e) => /^\d+$/.test(e.textContent.trim()));
      const lines = [...document.querySelectorAll('.cm-content .cm-line')];
      return { scrollY: Math.round(scrollY), nums: nums.map((e) => { const r = e.getBoundingClientRect(); return [e.textContent.trim(), r.top, r.height]; }), lines: lines.map((e) => { const r = e.getBoundingClientRect(); return [r.top, r.height]; }) };
    });
    const id = 'Problem editor at ' + w + 'x' + h + ' (not scrolled, page at ' + g.scrollY + ')';
    if (!g.lines.length || g.nums.length !== g.lines.length) fail(id + ': ' + g.nums.length + ' line numbers for ' + g.lines.length + ' code lines');
    else g.nums.forEach((n, i) => {
      if (n[0] !== String(i + 1)) fail(id + ': gutter row ' + (i + 1) + ' reads "' + n[0] + '"');
      else if (Math.abs(n[1] - g.lines[i][0]) > 1 || Math.abs(n[2] - g.lines[i][1]) > 1) fail(id + ': line ' + (i + 1) + ' number is at ' + Math.round(n[1]) + ' (' + Math.round(n[2]) + ' tall), its code line at ' + Math.round(g.lines[i][0]) + ' (' + Math.round(g.lines[i][1]) + ' tall)');
    });
    if (g.nums.length) console.log('  ' + id + ': ' + g.nums.length + ' numbers, first at ' + Math.round(g.nums[0][1]) + ' / ' + Math.round(g.nums[0][2]) + 'px tall, its code line at ' + Math.round(g.lines[0][0]) + ' / ' + Math.round(g.lines[0][1]));
    await pg.close();
  }
  {
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); localStorage.setItem('dsaviz-lang', 'py'); } catch (e) {} });
    await pg.goto(url); await pg.waitForTimeout(500);
    await pg.evaluate(() => { localStorage.removeItem('dsaviz-code-v1'); });
    await openProblem(pg, 'valid-palindrome');
    const chips = () => pg.evaluate(() => [...document.querySelectorAll('.pb-chip')].map((c) => ({ svg: !!c.querySelector('svg path'), sr: (c.querySelector('.pb-vh') || {}).textContent || '', text: [...c.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim(), stroke: (c.querySelector('svg') || { getAttribute: () => '' }).getAttribute('stroke'), d: (c.querySelector('svg path') || { getAttribute: () => '' }).getAttribute('d') })));
    await runIt(pg);
    let c1 = await chips();
    if (!c1.length) fail('no test chips after a run');
    c1.forEach((c, i) => { if (!c.svg) fail('test chip ' + (i + 1) + ' has no drawn icon'); if (/^[✓✗xX×]/.test(c.text)) fail('test chip ' + (i + 1) + ' still starts with a letter or glyph: "' + c.text + '"'); if (!/^(passed|failed): $/.test(c.sr)) fail('test chip ' + (i + 1) + ' hidden status text is "' + c.sr + '"'); });
    const bad1 = c1.filter((c) => /^failed/.test(c.sr)), ok1 = c1.filter((c) => /^passed/.test(c.sr));
    if (!bad1.length) fail('the empty starter gave no failed chip to check');
    const best = data.approaches['valid-palindrome']; const code = best[best.length - 1].py;
    await pg.evaluate(([k, src]) => { const o = {}; o[k] = { py: src }; localStorage.setItem('dsaviz-code-v1', JSON.stringify(o)); }, ['valid-palindrome', code]);
    await openProblem(pg, 'valid-palindrome'); await runIt(pg);
    const c2 = await chips();
    if (!c2.length || c2.some((c) => !/^passed/.test(c.sr))) fail('with a correct answer the chips say ' + c2.map((c) => c.sr).join(''));
    const okStroke = c2.length ? c2[0].stroke : '', okD = c2.length ? c2[0].d : '';
    if (bad1.length && (bad1[0].stroke === okStroke || bad1[0].d === okD)) fail('failed and passed chips use the same colour or the same shape (' + bad1[0].stroke + ' / ' + okStroke + ')');
    console.log('  Test chips: failed icon ' + (bad1[0] ? bad1[0].stroke + ' "' + bad1[0].d + '"' : '-') + ', passed icon ' + okStroke + ' "' + okD + '", hidden text "' + (c2[0] ? c2[0].sr : '') + '"');
    await pg.close();
  }
  // Back on the Problem page: "Back to Problems" unless the learner came from a list or lesson; never Home or the front page.
  {
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-theme', 'max'); localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg.goto(url); await pg.waitForTimeout(500);
    const label = async (from, fromQuery) => {
      await pg.evaluate(([f, q]) => { sessionStorage.clear(); window.__dsNav(f, q || ''); }, [from, fromQuery]); await pg.waitForTimeout(500);
      await pg.evaluate(() => window.__dsNav('Code.dc.html', '?problem=two-sum-ii')); await pg.waitForTimeout(800);
      return (await pg.textContent('a.sh-back')).replace('←', '').trim();
    };
    for (const [from, want] of [['Home.dc.html', 'Back to Problems'], ['Main.dc.html', 'Back to Problems'], ['Profile.dc.html', 'Back to Problems'], ['Glossary.dc.html', 'Back to Problems'], ['Sheet.dc.html', 'Back to Problems'], ['Patterns.dc.html', 'Back to Roadmap'],
      ['Start.dc.html', 'Back to Start here'], ['Concepts.dc.html', 'Back to DSA concepts'], ['ConceptLesson.dc.html', 'Back to the lesson']]) {
      const got = await label(from);
      if (got !== want) fail('Problem page opened from ' + from + ' says "' + got + '", not "' + want + '"');
    }
    await pg.evaluate(() => { sessionStorage.clear(); history.replaceState(null, '', location.pathname + '?problem=two-sum-ii#Code'); }); await pg.reload(); await pg.waitForTimeout(1200);
    const direct = (await pg.textContent('a.sh-back')).replace('←', '').trim();
    if (direct !== 'Back to Problems') fail('Problem page opened directly says "' + direct + '"');
    await pg.close();
  }
  // Java, C++ and Go are gone for good (owner, 2026-11-04): no language list, editor mode, starter or signature in the source,
  // and nothing in the built site offers them as a language. Only Python and JavaScript (and SQL on SQL problems) remain.
  {
    const langs = vm.runInContext('CODE_LANGS.map((x) => x[0])', ctx);
    if (langs.join() !== 'py,js') fail('CODE_LANGS is ' + langs.join() + ', not py,js');
    const gone = ['java', 'cpp', 'go'];
    for (const k of gone) {
      const n = Object.keys(data.specs).filter((id) => { const s = data.specs[id]; return (s.sig && s.sig[k]) || (s.starter && s.starter[k]); }).length;
      if (n) fail(n + ' problem specs still carry a ' + k + ' starter or signature');
    }
    const root = path.join(__dirname, '..');
    const ed = fs.readFileSync(path.join(root, 'src', 'code', 'editor.js'), 'utf8');
    if (/lang-(java|cpp|go)(?![a-z])|\b(java|cpp)\b\s*[,}:]|\bgo\b\s*[,}]/.test(ed.replace(/^\/\/.*$/gm, ''))) fail('the editor source still has a Java, C++ or Go mode');
    const pkg = fs.readFileSync(path.join(root, 'package.json'), 'utf8');
    if (/lang-(java|cpp|go)(?![a-z])/.test(pkg)) fail('package.json still depends on a Java, C++ or Go editor mode');
    const dist = html.toString('utf8');
    const hits = {
      'a java or cpp starter or signature': (dist.match(/(^|[\s,{])(java|cpp)\s*:\s*['"`\[]/gm) || []).length,
      'a go starter or signature': (dist.match(/(^|[\s,{])go\s*:\s*['"`]\s*(func |type |package )/gm) || []).length,
      'C++ or Go boilerplate': (dist.match(/#include <bits\/stdc\+\+\.h>|package main\n|class Solution \{\npublic:/g) || []).length,
      'a language list with Java, C++ or Go': (dist.match(/\[\s*'(java|cpp|go)'\s*,\s*'(Java|C\+\+|Go)'\s*\]/g) || []).length
    };
    for (const [what, n] of Object.entries(hits)) if (n) fail('dist/index.html still has ' + n + ' places with ' + what);
    // The pages themselves: no button, tab, option or label named Java, C++ or Go on any page.
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pg.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg.goto(url); await pg.waitForTimeout(500);
    const named = [];
    for (const f of fs.readdirSync(path.join(root, 'pages')).filter((x) => /.dc.html$/.test(x)).concat(['Code.dc.html?problem=two-sum-ii'])) {
      const [name, query] = f.split('?');
      await pg.evaluate(([n, q]) => window.__dsNav(n, q ? '?' + q : ''), [name, query]); await pg.waitForTimeout(500);
      const found = await pg.evaluate(() => [...document.querySelectorAll('button, [role=tab], option, label, summary, a')].map((e) => (e.textContent || '').trim()).filter((t) => /^(Java|C\+\+|Go|Golang)$/i.test(t)));
      if (found.length) named.push(name + ': ' + found.join(', '));
    }
    if (named.length) fail('a page offers Java, C++ or Go: ' + named.join(' | '));
    await pg.close();
    console.log('  Java, C++ and Go: none in CODE_LANGS (' + langs.join() + '), the specs, the editor, package.json or dist/index.html, and no page offers them');
  }
  await browser.close(); server.close();
  console.log(bad ? bad + ' problems' : 'shell clean: ' + pages.length + ' pages and ' + LESSON_PAGES.length + ' lesson tracks at 320, 390 (dark and light), 1024 and 1440');
  process.exit(bad ? 1 : 0);
});
