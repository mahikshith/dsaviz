// Browser test for the built site (dist/index.html).
// Desktop pass: opens every page in every theme at 1440px, clicks visible buttons and reports page
// errors or unfilled {{holes}}.
// Mobile pass: every page at 390x844 in the max and paper themes. Fails when the page scrolls
// sideways (document scrollWidth > 390, or any element sticking out past the screen edge outside a
// scroll box), when text in the main content renders under 12px (SVG labels aside), or on page errors.
// Every story is measured the same way at three steps (first, middle, last), stage included.
// Focus order: on pages whose phone layout reorders content (Sheet, Auth, Briefing), tabbing from the
// top reaches the first five controls of the page (the bottom pill nav aside) in top-to-bottom order.
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

const PAGES = ['Main', 'Auth', 'Welcome', 'About', 'Home', 'Revisit', 'Profile', 'Leaderboard', 'Patterns', 'Sheet', 'Interview', 'Briefing', 'Story', 'Code', 'Glossary', 'Basics', 'Git', 'SystemDesign', 'SDLesson', 'AIML', 'AILesson', 'Contests'];
// Runs in the page: sideways overflow and text under 12px inside the page root.
const measure = () => {
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
    // SVG labels are skipped; the story stage is laid out at real size on phones, so it is measured too.
    if (hasText && el.closest('svg') === null) {
      const px = parseFloat(cs.fontSize) * (el.currentCSSZoom || 1);
      if (px < 11.95) small.push(px.toFixed(1) + 'px ' + el.textContent.trim().slice(0, 30));
    }
  }
  return { scrollWidth, over: over.length, small: small.length, overEx: over.slice(0, 3), smallEx: small.slice(0, 3), text: root.innerText.length };
};

// Story ids and step counts, read from the built Story page the way tests/scenecheck.js does.
const STORIES = (() => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'pages', 'Story.dc.html'), 'utf8');
  const script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  const store = {};
  const f = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } }, addEventListener(){}, removeEventListener(){} };
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, o); } }
${script}; return { SCENES, SCENE_ORDER };`);
  const { SCENES, SCENE_ORDER } = f(store);
  return SCENE_ORDER.map((id) => ({ id, steps: SCENES[id].steps.length }));
})();
const REORDERED = ['Sheet', 'Auth', 'Briefing'];

const dist = path.join(__dirname, '..', 'dist');
const html = fs.readFileSync(path.join(dist, 'index.html'));
// The offline app files sit next to index.html; any other path gets the page.
const FILES = { '/sw.js': 'text/javascript', '/manifest.webmanifest': 'application/manifest+json', '/icons/icon-192.png': 'image/png',
  '/icons/icon-512.png': 'image/png', '/icons/icon-maskable-512.png': 'image/png', '/icons/apple-touch-icon.png': 'image/png' };
const server = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  if (FILES[p]) { res.writeHead(200, { 'Content-Type': FILES[p] }); res.end(fs.readFileSync(path.join(dist, p.slice(1)))); return; }
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    // Same spirit as a strict sandbox: no eval, no external scripts. The Code page's
    // JavaScript runner needs blob: workers; the offline app needs its own sw.js.
    'Content-Security-Policy': "script-src 'unsafe-inline'; worker-src 'self' blob:"
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
      const info = await page.evaluate(measure);
      const bad = !info || info.scrollWidth > 390 || info.over > 0 || info.small > 0 || info.text < 200;
      if (bad) problems++;
      console.log((bad ? '✗' : '✓'), ('m-' + theme).padEnd(8), name.padEnd(12), info ? JSON.stringify(info.over || info.small ? info : { scrollWidth: info.scrollWidth, text: info.text }) : 'no page');
    }
    // Every story at its first, middle and last step: the stage must fit and keep its labels at 12px or more.
    let storyBad = 0;
    for (const { id, steps } of STORIES) {
      await page.evaluate((pid) => { localStorage.setItem('dsaviz-problem', pid); window.__dsNav('Story.dc.html'); }, id);
      await page.waitForTimeout(350);
      const fails = [];
      for (const k of [...new Set([0, Math.floor((steps - 1) / 2), steps - 1])]) {
        // the step slider is a React-controlled range input: set its value the native way, then fire input
        await page.evaluate((v) => {
          const r = document.querySelector('.pp-controls input[type=range]');
          Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(r, String(v));
          r.dispatchEvent(new Event('input', { bubbles: true }));
        }, k);
        await page.waitForTimeout(450);
        const info = await page.evaluate(measure);
        const at = await page.evaluate(() => (document.querySelector('#pp-watch') || {}).parentElement.textContent.match(/Step (\d+) of/));
        const wrongStep = !at || Number(at[1]) !== k + 1;
        if (!info || wrongStep || info.scrollWidth > 390 || info.over > 0 || info.small > 0) fails.push({ step: k + 1, wrongStep, ...(info || {}) });
      }
      if (fails.length) { storyBad++; problems++; console.log('✗', ('m-' + theme).padEnd(8), 'story', id, JSON.stringify(fails[0])); }
    }
    console.log(storyBad ? '✗ ' + storyBad + ' stories' : '✓', ('m-' + theme).padEnd(8), 'all ' + STORIES.length + ' stories at 3 steps' + (storyBad ? ' (see above)' : ' fit at 390 with 12px labels'));
    // Focus order on the reordered pages: tab from the top; the first five controls (the bottom pill nav aside)
    // must follow the order they are seen in, top to bottom and left to right within a row.
    for (const name of REORDERED) {
      await page.evaluate((n) => window.__dsNav(n + '.dc.html'), name);
      await page.waitForTimeout(500);
      await page.evaluate(() => { if (document.activeElement) document.activeElement.blur(); window.scrollTo(0, 0); });
      const seen = [];
      for (let i = 0; i < 60 && seen.length < 5; i++) {
        await page.keyboard.press('Tab');
        const f = await page.evaluate(() => {
          const a = document.activeElement;
          if (!a || a === document.body) return null;
          if (a.closest('[data-pn-wrap],[data-drawer]')) return { skip: true };
          const r = a.getBoundingClientRect();
          return { cy: Math.round(r.top + r.height / 2 + window.scrollY), x: Math.round(r.left), h: Math.round(r.height), label: (a.getAttribute('aria-label') || a.textContent || a.tagName).trim().replace(/\s+/g, ' ').slice(0, 24) };
        });
        if (f && !f.skip) seen.push(f);
      }
      const outOfOrder = seen.findIndex((f, i) => {
        if (!i) return false;
        const p = seen[i - 1], sameRow = Math.abs(f.cy - p.cy) <= Math.max(f.h, p.h) / 2;
        return sameRow ? f.x < p.x : f.cy < p.cy;
      });
      const bad = seen.length < 5 || outOfOrder > 0;
      if (bad) problems++;
      console.log((bad ? '✗' : '✓'), ('m-' + theme).padEnd(8), (name + ' tab').padEnd(12), seen.map((f) => f.label).join(' → ') + (outOfOrder > 0 ? '  (out of order at ' + (outOfOrder + 1) + ')' : ''));
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
