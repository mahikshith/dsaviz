// Every page on the shared frame (root data-shell): shown with no zoom, no sideways page scroll at 320, 390, 1024 and 1440,
// body text 18px at Normal size, and the keyboard reaches the top bar first. Then one real lesson of each track (Start here, DSA concepts,
// System design, AI & ML, Git) is opened from its sidebar: Back link, Previous and Next, no "Why learn this", no text under 14px, no sideways scroll,
// the sidebar behind a Lessons button on phones, and Back returning to its parent with the scroll kept. Run after a build: node tests/shell-test.js
const http = require('http'); const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const pages = fs.readdirSync(path.join(__dirname, '..', 'pages')).filter((f) => /<div data-shell/.test(fs.readFileSync(path.join(__dirname, '..', 'pages', f), 'utf8')));
const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'));
const server = http.createServer((q, r) => { r.writeHead(200, { 'Content-Type': 'text/html' }); r.end(html); });
server.listen(0, async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  let bad = 0;
  // Each lesson page and the page its Back link goes to when there is no trail.
  const LESSON_PAGES = [['Chapter', 'Start'], ['ConceptLesson', 'Concepts'], ['SDLesson', 'SystemDesign'], ['AILesson', 'AIML'], ['Git', 'Patterns']];
  const fail = (m) => { bad++; console.log('  ✗ ' + m); };
  // Every width in the default (dark) theme, and the phone again in the light one (paper).
  for (const [theme, width] of [['max', 320], ['max', 390], ['max', 1024], ['max', 1440], ['paper', 390]]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
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
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const pg2 = await browser.newPage({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
    await pg2.addInitScript(() => { try { localStorage.setItem('dsaviz-tour-done', '1'); } catch (e) {} });
    await pg2.goto('http://localhost:' + server.address().port + '/'); await pg2.waitForTimeout(500);
    for (const [pg, [st, tx]] of Object.entries(FIT)) {
      await pg2.evaluate((n) => window.__dsNav(n), pg + '.dc.html'); await pg2.waitForTimeout(1200);
      const f = await pg2.evaluate(([a, b]) => { const q = (s) => document.querySelector(s); const rc = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; };
        return { vh: innerHeight, stage: rc(q(a)), text: rc(q(b)), play: rc(q('main button[aria-label^="Play"]')), next: rc(q('main button[data-next], main button[aria-label="Next step"]')) }; }, [st, tx]);
      const id = pg + ' at ' + w + 'x' + h;
      if (!f.stage || !f.text || !f.play || !f.next) { fail(id + ': first screen is missing ' + ['stage', 'text', 'play', 'next'].filter((k) => !f[k]).join(', ')); continue; }
      if (f.stage[0] >= f.vh - 100) fail(id + ': the picture starts at ' + f.stage[0] + ', below the first screen (' + f.vh + ')');
      if (f.text[1] > f.vh) fail(id + ': the first step text ends at ' + f.text[1] + ', below the first screen (' + f.vh + ')');
      if (f.play[1] > f.vh) fail(id + ': Play ends at ' + f.play[1] + ', below the first screen (' + f.vh + ')');
      if (f.next[1] > f.vh) fail(id + ': Next ends at ' + f.next[1] + ', below the first screen (' + f.vh + ')');
    }
    await pg2.close();
  }

  // Back to top (scripts/site-runtime.js): hidden at the top, shown after a screen of scrolling, never over the pager or the step card,
  // and one click returns to the top with the focus on the page title.
  for (const [w, h] of [[1440, 900], [390, 844]]) {
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
  await browser.close(); server.close();
  console.log(bad ? bad + ' problems' : 'shell clean: ' + pages.length + ' pages and ' + LESSON_PAGES.length + ' lesson tracks at 320, 390 (dark and light), 1024 and 1440');
  process.exit(bad ? 1 : 0);
});
