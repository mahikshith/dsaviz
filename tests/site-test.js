// Browser test for the built site (dist/index.html).
// Desktop pass: opens every page in every theme at 1440px, clicks visible buttons and reports page
// errors or unfilled {{holes}}.
// Mobile pass: every page at 390x844 in the max and paper themes. Fails when the page scrolls
// sideways (document scrollWidth > 390, or any element sticking out past the screen edge outside a
// scroll box), when text in the main content renders under 12px (SVG labels and data-figure
// illustrations aside), or on page errors.
// Needs Playwright:  npm install --no-save playwright && npx playwright install chromium
// Or playwright-core with an installed browser:  npm install --no-save playwright-core
//   then DS_BROWSER=msedge npm run test:browser   (or chrome)
const http = require('http');
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  try { ({ chromium } = require('playwright-core')); } catch (e2) {
    console.log('Playwright is not installed. Run: npm install --no-save playwright && npx playwright install chromium');
    process.exit(1);
  }
}
const CHANNEL = process.env.DS_BROWSER || '';

const PAGES = ['Main', 'Auth', 'Welcome', 'About', 'Home', 'Revisit', 'Profile', 'Leaderboard', 'Patterns', 'Sheet', 'Interview', 'Briefing', 'Story', 'Code', 'Glossary', 'Basics', 'Git', 'SystemDesign', 'SDLesson', 'AIML', 'AILesson'];
const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'));
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    // Same spirit as a strict sandbox: no eval, no external scripts. The Code page's
    // JavaScript runner needs blob: workers.
    'Content-Security-Policy': "script-src 'unsafe-inline'; worker-src blob:"
  });
  res.end(html);
});

server.listen(0, async () => {
  const url = 'http://localhost:' + server.address().port + '/';
  const browser = await chromium.launch(CHANNEL ? { channel: CHANNEL } : {});
  let problems = 0;
  for (const theme of ['paper', 'ink', 'field']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|fonts\.g/.test(m.text())) errors.push(m.text()); });
    await page.addInitScript((t) => { try { localStorage.setItem('dsaviz-theme', t); } catch (e) {} }, theme);
    await page.goto(url);
    await page.waitForTimeout(600);
    for (const name of PAGES) {
      await page.evaluate((n) => window.__dsNav(n + '.dc.html'), name);
      await page.waitForTimeout(300);
      const info = await page.evaluate(() => {
        const root = document.querySelector('#app > div');
        return root ? { text: root.innerText.length, holes: (root.innerText.match(/\{\{/g) || []).length } : null;
      });
      const buttons = await page.$$('#app button');
      for (const b of buttons.slice(0, 30)) {
        const ok = await b.evaluate((el) => !el.disabled && el.getBoundingClientRect().width > 0).catch(() => false);
        if (ok) await b.click({ timeout: 800, force: true }).catch(() => {});
      }
      const bad = !info || info.text < 200 || info.holes > 0;
      if (bad) problems++;
      console.log((bad ? '✗' : '✓'), theme.padEnd(6), name.padEnd(12), JSON.stringify(info));
    }
    if (errors.length) { problems += errors.length; console.log('  errors in', theme + ':', errors.slice(0, 5)); }
    await page.close();
  }
  console.log(problems ? problems + ' problem(s) on desktop' : 'all pages render in all themes');
  const desktopProblems = problems;

  // ---------- mobile pass ----------
  for (const theme of ['max', 'paper']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|fonts\.g/.test(m.text())) errors.push(m.text()); });
    await page.addInitScript((t) => { try { localStorage.setItem('dsaviz-theme', t); } catch (e) {} }, theme);
    await page.goto(url);
    await page.waitForTimeout(600);
    for (const name of PAGES) {
      await page.evaluate((n) => window.__dsNav(n + '.dc.html'), name);
      await page.waitForTimeout(500);
      const info = await page.evaluate(() => {
        const de = document.documentElement, body = document.body, W = window.innerWidth;
        // The bundle hides sideways overflow on html and body; lift that to measure the real width.
        const keep = [de.style.overflowX, body.style.overflowX];
        de.style.overflowX = 'visible'; body.style.overflowX = 'visible';
        const scrollWidth = de.scrollWidth;
        de.style.overflowX = keep[0]; body.style.overflowX = keep[1];
        const root = document.querySelector('#app > div');
        if (!root) return null;
        const inScrollBox = (el) => { for (let p = el.parentElement; p && p !== root.parentElement; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll') return true; } return false; };
        const over = [], small = [];
        for (const el of root.querySelectorAll('*')) {
          if (el.closest('[data-pn-wrap],[data-drawer]')) continue;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.position === 'fixed') continue;
          if ((r.right > W + 1 || r.left < -1) && !inScrollBox(el)) over.push(el.tagName.toLowerCase() + ' ' + Math.round(r.left) + '..' + Math.round(r.right) + ' ' + (el.textContent || '').trim().slice(0, 30));
          const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
          // SVG labels and data-figure illustrations (the story stage, scaled to fit as one picture) are skipped.
          if (hasText && el.closest('svg, [data-figure]') === null) {
            const px = parseFloat(cs.fontSize) * (el.currentCSSZoom || 1);
            if (px < 11.95) small.push(px.toFixed(1) + 'px ' + el.textContent.trim().slice(0, 30));
          }
        }
        return { scrollWidth, over: over.length, small: small.length, overEx: over.slice(0, 3), smallEx: small.slice(0, 3), text: root.innerText.length };
      });
      const bad = !info || info.scrollWidth > 390 || info.over > 0 || info.small > 0 || info.text < 200;
      if (bad) problems++;
      console.log((bad ? '✗' : '✓'), ('m-' + theme).padEnd(8), name.padEnd(12), info ? JSON.stringify(info.over || info.small ? info : { scrollWidth: info.scrollWidth, text: info.text }) : 'no page');
    }
    if (errors.length) { problems += errors.length; console.log('  errors in mobile', theme + ':', errors.slice(0, 5)); }
    await page.close();
  }
  console.log(problems > desktopProblems ? (problems - desktopProblems) + ' problem(s) on phones' : 'all pages fit a 390px phone in max and paper');

  await browser.close();
  server.close();
  console.log(problems ? problems + ' problem(s)' : 'all clear on desktop and phone');
  process.exitCode = problems ? 1 : 0;
});
