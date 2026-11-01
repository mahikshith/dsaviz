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
  for (const width of [320, 390, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto('http://localhost:' + server.address().port + '/');
    for (const f of pages) {
      await page.evaluate((n) => window.__dsNav(n), f); await page.waitForTimeout(500);
      const r = await page.evaluate(() => {
        const de = document.documentElement, root = document.querySelector('#app > div');
        return { shell: root.hasAttribute('data-shell'), zoom: de.style.zoom, over: de.scrollWidth - de.clientWidth, size: getComputedStyle(root).fontSize };
      });
      if (!r.shell) fail(f + ' did not open');
      if (r.zoom !== '1') fail(f + ' at ' + width + ': zoom ' + r.zoom);
      if (r.over > 0) fail(f + ' at ' + width + ': scrolls sideways by ' + r.over + 'px');
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
      const id = pg + ' (' + want + ') at ' + width;
      if (!r.shell || r.fluid) fail(id + ': not on the shared frame');
      if (r.cur !== want) fail(id + ': current lesson is "' + r.cur + '"');
      if (!r.h1 || r.h1.trim().toLowerCase() !== want.toLowerCase()) fail(id + ': title is "' + r.h1 + '"');
      if (!/^← Back to \S/.test(r.back)) fail(id + ': Back link says "' + r.back + '"');
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
  await browser.close(); server.close();
  console.log(bad ? bad + ' problems' : 'shell clean: ' + pages.length + ' pages and ' + LESSON_PAGES.length + ' lesson tracks at 320, 390, 1024 and 1440');
  process.exit(bad ? 1 : 0);
});
