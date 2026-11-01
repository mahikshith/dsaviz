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
  // Each lesson page and the page its Back link goes to when there is no trail.
  const LESSON_PAGES = [['Chapter', 'Start'], ['ConceptLesson', 'Concepts'], ['SDLesson', 'SystemDesign'], ['AILesson', 'AIML'], ['Git', 'Patterns']];
  const fail = (m) => { bad++; console.log('  ✗ ' + m); };
  // Every width in the default (dark) theme, and the phone again in the light one (paper).
  // DS_ONLY=problem skips the lesson checks and runs only the Problem page checks at the end of this file.
  const ONLY_PROBLEM = process.env.DS_ONLY === 'problem';
  for (const [theme, width] of ONLY_PROBLEM ? [] : [['max', 320], ['max', 390], ['max', 1024], ['max', 1440], ['paper', 390]]) {
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
  for (const [w, h] of ONLY_PROBLEM ? [] : [[1440, 900], [390, 844]]) {
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
  for (const [w, h] of ONLY_PROBLEM ? [] : [[1440, 900], [390, 844]]) {
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
    // Search: a story result lands on the Problem page with Story on.
    await pg.evaluate(() => window.__dsNav('Home.dc.html')); await pg.waitForTimeout(600);
    await pg.keyboard.press('/'); await pg.waitForTimeout(300);
    await pg.keyboard.type('Lantern Bridge'); await pg.waitForTimeout(500);
    const hit = await pg.evaluate(() => { const o = [...document.querySelectorAll('[role=option]')].find((x) => /Lantern Bridge|Two Sum II/.test(x.textContent) && /story|Stories/i.test(x.parentElement.parentElement.textContent)); if (o) { o.click(); return o.textContent.slice(0, 40); } return ''; });
    await pg.waitForTimeout(1200);
    if (!hit) fail('search for the story found no Stories result');
    else {
      const at = await pg.evaluate(() => ({ page: location.hash.slice(1), story: !!document.querySelector('.pb-story'), data: !!document.querySelector('[data-page="Code"]') }));
      if (at.page !== 'Code' || !at.story) fail('a story search result landed on ' + at.page + ' (story ' + at.story + '), not the Problem page with Story on');
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
  await browser.close(); server.close();
  console.log(bad ? bad + ' problems' : 'shell clean: ' + pages.length + ' pages and ' + LESSON_PAGES.length + ' lesson tracks at 320, 390 (dark and light), 1024 and 1440');
  process.exit(bad ? 1 : 0);
});
