// Every page on the shared frame (root data-shell): shown with no zoom, no sideways page scroll at 320, 390, 1024 and 1440,
// body text 18px at Normal size, and the keyboard reaches the top bar first. Run after a build: node tests/shell-test.js
const http = require('http'); const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright-core');
const pages = fs.readdirSync(path.join(__dirname, '..', 'pages')).filter((f) => /<div data-shell/.test(fs.readFileSync(path.join(__dirname, '..', 'pages', f), 'utf8')));
const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'));
const server = http.createServer((q, r) => { r.writeHead(200, { 'Content-Type': 'text/html' }); r.end(html); });
server.listen(0, async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  let bad = 0;
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
    if (errs.length) fail('page errors at ' + width + ': ' + errs[0]);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(bad ? bad + ' problems' : 'shell clean: ' + pages.length + ' pages at 320, 390, 1024 and 1440');
  process.exit(bad ? 1 : 0);
});
