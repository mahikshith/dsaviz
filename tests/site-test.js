// Browser test for the built site (dist/index.html).
// Desktop pass: opens every page in every theme at 1440px, clicks visible buttons and reports page
// errors or unfilled {{holes}}.
// Mobile pass: every page at 390x844 in the max and paper themes. Fails when the page scrolls
// sideways (document scrollWidth > 390, or any element sticking out past the screen edge outside a
// scroll box), when text in the main content renders under 12px (SVG labels aside), or on page errors.
// Every story is measured the same way at three steps (first, middle, last), stage included.
// Focus order: on pages whose phone layout reorders content (Sheet, Auth, Briefing), tabbing from the
// top reaches the first five controls of the page (the bottom pill nav aside) in top-to-bottom order.
// Player controls pass: one lesson of each player (AI & ML, AI now, system design, DSA concept, Start here levels 1-3,
// story, Git) at 1440x900, 1280x720 and 390x844 in the max theme. The Play button's whole box must be in the
// first screen without scrolling and not covered (by the phone pill nav, say); clicking it must turn it into
// Pause and move the step counter on within 3 s; clicking again must pause (label back to Play, counter still);
// and Space with nothing focused must start and stop it the same way. Each player also has a Speed button in the
// first screen that steps 1x to 1.5x and saves it.
// Readability pass: the main pages at 1440x900 and 1280x800 in the max theme at Normal text size. Reading text
// (more than 24 characters) must render at 15px or more, short labels and chips at 13px, stage labels (svg[data-stage])
// at 14px; and no pane (a bordered or filled box at least 280x240 that does not scroll) may be 40% or more empty
// below or above its content (a box that scrolls counts only when its content does not overflow it). DS_PASS=read runs only this pass.
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
// DS_PASS=controls runs only the player controls pass.
const ONLY_CONTROLS = process.env.DS_PASS === 'controls';
const ONLY_READ = process.env.DS_PASS === 'read';
const SKIP_MAIN = ONLY_CONTROLS || ONLY_READ;

const PAGES = ['Main', 'Auth', 'Welcome', 'About', 'Home', 'Revisit', 'Profile', 'Leaderboard', 'Patterns', 'Sheet', 'Interview', 'Briefing', 'Story', 'Code', 'Glossary', 'Start', 'Chapter', 'Basics', 'Git', 'SystemDesign', 'SDLesson', 'AIML', 'AILesson', 'Concepts', 'ConceptLesson', 'Contests'];
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

// Readability pass pages: [label, page, localStorage, tabs]. tabs: a pattern for buttons to click in turn, measuring after each.
const READ_PAGES = [['Main', 'Main', {}], ['Home', 'Home', {}], ['Start here', 'Start', {}], ['Start lesson', 'Chapter', {}, '^(Watch it run|Your variables|Try it|Practice|Check)$'],
  ['AI & ML lesson', 'AILesson', { 'dsaviz-ai-lesson': 'gradient' }], ['AI now lesson', 'AILesson', { 'dsaviz-ai-lesson': 'attention' }],
  ['Concept', 'ConceptLesson', {}], ['System design', 'SDLesson', {}], ['Problem', 'Code', {}], ['Story', 'Story', {}], ['Sheet', 'Sheet', {}], ['Git', 'Git', {}]];
// Runs in the page: text rendered under the readability minimums, small stage labels, and panes 40% or more empty.
const readable = () => {
  const root = document.querySelector('#app > div');
  if (!root) return null;
  const small = [], stage = [], empty = [];
  let min = 99;
  const shown = (el, r) => { if (!r.width || !r.height) return false; const cs = getComputedStyle(el); return cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.05; };
  for (const el of root.querySelectorAll('*')) {
    if (el.closest('[data-drawer],[aria-hidden="true"]')) continue;
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').trim();
    if (!own) continue;
    const r = el.getBoundingClientRect();
    if (!shown(el, r)) continue;
    const cs = getComputedStyle(el);
    const svg = el.closest('svg');
    if (svg) {
      const m = el.getScreenCTM && el.getScreenCTM();
      const px = parseFloat(cs.fontSize) * (m ? Math.hypot(m.a, m.b) : 1);
      if (svg.hasAttribute('data-stage') && px < 13.95) stage.push(px.toFixed(1) + 'px ' + own.slice(0, 24));
      continue;
    }
    const px = parseFloat(cs.fontSize) * (el.currentCSSZoom || 1);
    min = Math.min(min, Math.round(px * 10) / 10);
    if (px < (own.length > 24 ? 14.95 : 12.95)) small.push(px.toFixed(1) + 'px ' + own.slice(0, 30));
  }
  // Panes: bordered or filled boxes that do not scroll. Content is every visible text, svg, image, control or canvas inside.
  const bg = (el) => getComputedStyle(el).backgroundColor;
  for (const el of root.querySelectorAll('div,section,article,aside,main')) {
    if (el.closest('[data-pn-wrap],[data-drawer]') || el.closest('svg')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 280 || r.height < 240 || !shown(el, r)) continue;
    const cs = getComputedStyle(el);
    if (/auto|scroll/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 4) continue; // a box that really scrolls is full
    if (el.querySelector('.cm-editor,textarea')) continue; // an editor's blank lines are room to type
    const boxed = parseFloat(cs.borderTopWidth) >= 1 && parseFloat(cs.borderBottomWidth) >= 1;
    const filled = bg(el) !== 'rgba(0, 0, 0, 0)' && el.parentElement && bg(el) !== bg(el.parentElement);
    if (!boxed && !filled) continue;
    let top = Infinity, bottom = -Infinity;
    for (const c of el.querySelectorAll('*')) {
      const tag = c.tagName.toLowerCase();
      const leaf = tag === 'svg' || tag === 'img' || tag === 'canvas' || tag === 'input' || tag === 'textarea' || tag === 'button' || tag === 'select' || [...c.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
      if (!leaf || c.closest('svg') !== c && c.closest('svg')) continue;
      const q = c.getBoundingClientRect();
      if (!shown(c, q)) continue;
      top = Math.min(top, q.top); bottom = Math.max(bottom, q.bottom);
    }
    if (bottom < top) continue;
    const inner = r.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - parseFloat(cs.borderTopWidth) - parseFloat(cs.borderBottomWidth);
    const gap = inner - (bottom - top);
    if (inner > 0 && gap / inner >= 0.4 && gap >= 96) empty.push(Math.round(r.width) + 'x' + Math.round(r.height) + ' ' + Math.round(gap / inner * 100) + '% empty: ' + (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 40));
  }
  return { small, stage, empty, min };
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

// Player controls pass: [name, page, localStorage that opens the lesson]
const PLAYERS = [['AI & ML', 'AILesson', { 'dsaviz-ai-lesson': 'gradient' }], ['AI now', 'AILesson', { 'dsaviz-ai-lesson': 'attention' }],
  ['System', 'SDLesson', {}], ['Concept', 'ConceptLesson', {}], ['Start here', 'Chapter', {}], ['Start L2', 'Chapter', { 'dsaviz-start-lesson': 'call-stack' }], ['Start L3', 'Chapter', { 'dsaviz-start-lesson': 'objects' }], ['Story', 'Story', {}], ['Git', 'Git', {}]];
// Runs in the page: the player's step counter ("Step 3 of 12", "step 3/12", "beat 3 of 9"), the first one on the page.
const STEP_RE = '\\b(?:step|beat)\\s+(\\d+)\\s*(?:of|\\/)\\s*\\d+';
const readStep = (re) => {
  const m = (document.querySelector('#app > div') || document.body).innerText.match(new RegExp(re || STEP_RE, 'i'));
  return m ? Number(m[1]) : -1;
};
// Runs in the page: the first visible Play button, marked for clicking, and whether it is wholly in the first screen and on top.
const findPlay = () => {
  const b = [...document.querySelectorAll('#app button')].find((el) => /^(play|replay)\b/i.test((el.getAttribute('aria-label') || el.textContent || '').trim()) && el.getBoundingClientRect().width > 0);
  if (!b) return null;
  document.querySelectorAll('[data-test-play]').forEach((el) => el.removeAttribute('data-test-play'));
  b.setAttribute('data-test-play', '');
  const r = b.getBoundingClientRect();
  const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  return { top: Math.round(r.top), bottom: Math.round(r.bottom), inView: r.top >= 0 && r.left >= 0 && r.bottom <= window.innerHeight && r.right <= window.innerWidth,
    onTop: !!hit && (hit === b || b.contains(hit)), scrolled: window.scrollY > 0 };
};
// Polls the marked Play button's label and the step counter until ok(), or until ms run out.
async function waitFor(page, ok, before, ms) {
  let last = null;
  for (let t = 0; t <= ms; t += 150) {
    last = await page.evaluate(([b, re]) => {
      const el = document.querySelector('[data-test-play]');
      const m = (document.querySelector('#app > div') || document.body).innerText.match(new RegExp(re, 'i'));
      return { label: el ? (el.getAttribute('aria-label') || el.textContent || '').trim() : '', step: m ? Number(m[1]) : -1, before: b };
    }, [before, STEP_RE]);
    if (ok(last)) return { ok: true, last };
    await page.waitForTimeout(150);
  }
  return { ok: false, last };
}

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
  for (const theme of SKIP_MAIN ? [] : ['paper', 'ink', 'field']) {
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
  for (const theme of SKIP_MAIN ? [] : ['max', 'paper']) {
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
  const phoneProblems = problems;

  // ---------- readability pass ----------
  for (const [w, h] of ONLY_CONTROLS ? [] : [[1440, 900], [1280, 800]]) {
    for (const [label, name, store, tabs] of READ_PAGES) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.addInitScript((st) => { try { localStorage.setItem('dsaviz-theme', 'max'); for (const k in st) localStorage.setItem(k, st[k]); } catch (e) {} }, store);
      await page.goto(url);
      await page.waitForTimeout(500);
      await page.evaluate((n) => { window.__dsNav(n + '.dc.html'); }, name);
      await page.waitForTimeout(900);
      const views = [[label, null]];
      if (tabs) {
        const names = await page.evaluate((re) => [...document.querySelectorAll('#app button')].map((b) => b.textContent.trim().replace(/^\d+\s*/, '')).filter((t) => new RegExp(re).test(t)), tabs);
        names.forEach((n) => views.push([label + ' · ' + n, n]));
      }
      for (const [vl, tab] of views) {
        if (tab) {
          await page.evaluate((n) => { const b = [...document.querySelectorAll('#app button')].find((x) => x.textContent.trim().replace(/^\d+\s*/, '') === n); if (b) b.click(); }, tab);
          await page.waitForTimeout(700);
        }
        const r = await page.evaluate(readable);
        const bad = !r || r.small.length || r.stage.length || r.empty.length;
        if (bad) problems++;
        console.log((bad ? '✗' : '✓'), ('r-' + w).padEnd(8), vl.padEnd(14), !r ? 'no page' : bad ? JSON.stringify({ small: r.small.slice(0, 4), stage: r.stage.slice(0, 3), empty: r.empty.slice(0, 3), counts: [r.small.length, r.stage.length, r.empty.length] }) : 'text ' + r.min + 'px and up, panes filled');
      }
      await page.close();
    }
  }
  console.log(problems > phoneProblems ? (problems - phoneProblems) + ' problem(s) with text size or empty panes' : 'all text readable and no empty panes');
  const readProblems = problems;

  // ---------- player controls pass ----------
  for (const [w, h] of ONLY_READ ? [] : [[1440, 900], [1280, 720], [390, 844]]) {
    const phone = w < 760;
    for (const [label, name, store] of PLAYERS) {
      // a fresh page per player: nothing saved from an earlier lesson, scrolled to the top
      const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: phone, hasTouch: phone });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.addInitScript((st) => { try { localStorage.setItem('dsaviz-theme', 'max'); for (const k in st) localStorage.setItem(k, st[k]); } catch (e) {} }, store);
      await page.goto(url);
      await page.waitForTimeout(500);
      await page.evaluate((n) => { window.__dsNav(n + '.dc.html'); }, name);
      await page.waitForTimeout(700);
      // Lessons open on their About tab the first time; the player is under Watch it.
      await page.evaluate(() => { const b = [...document.querySelectorAll('#app button')].find((x) => x.textContent.trim() === 'Watch it'); if (b) b.click(); });
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 0));
      const fails = [];
      const box = await page.evaluate(findPlay);
      if (!box) fails.push('no Play button');
      else {
        if (!box.inView) fails.push('Play at ' + box.top + '..' + box.bottom + ' of ' + h + 'px');
        if (!box.onTop) fails.push('Play is covered');
        if (box.scrolled) fails.push('page opened scrolled');
      }
      if (box) {
        const before = await page.evaluate(readStep, STEP_RE);
        await page.click('[data-test-play]');
        const played = await waitFor(page, (b) => /pause/i.test(b.label) && b.step > b.before, before, 3000);
        if (!played.ok) fails.push('Play did not start (' + played.last.label + ', step ' + before + ' to ' + played.last.step + ')');
        await page.click('[data-test-play]');
        const paused = await waitFor(page, (b) => /^(play|replay)\b/i.test(b.label), before, 1000);
        if (!paused.ok) fails.push('second click did not pause (' + paused.last.label + ')');
        const held = await page.evaluate(readStep, STEP_RE);
        await page.waitForTimeout(1500);
        if (await page.evaluate(readStep, STEP_RE) !== held) fails.push('steps kept moving after pause');
        // Space with nothing focused starts and stops it too
        const blur = () => { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); };
        await page.evaluate(blur);
        await page.keyboard.press('Space');
        const spaced = await waitFor(page, (b) => /pause/i.test(b.label), before, 1000);
        await page.evaluate(blur);
        await page.keyboard.press('Space');
        const unspaced = await waitFor(page, (b) => /^(play|replay)\b/i.test(b.label), before, 1000);
        if (!spaced.ok || !unspaced.ok) fails.push('Space does not toggle play');
      }
      // the Speed button sits with the controls, steps 1x -> 1.5x and is remembered
      const spd = await page.evaluate(() => {
        const b = [...document.querySelectorAll('#app [data-speed]')].find((el) => el.getBoundingClientRect().width > 0);
        if (!b) return null;
        const r = b.getBoundingClientRect();
        const before = b.textContent.trim(); b.click();
        return { before, inView: r.top >= 0 && r.bottom <= window.innerHeight };
      });
      if (!spd) fails.push('no Speed button');
      else {
        await page.waitForTimeout(200);
        const after = await page.evaluate(() => ({ label: ([...document.querySelectorAll('#app [data-speed]')].find((el) => el.getBoundingClientRect().width > 0) || {}).textContent, saved: localStorage.getItem('dsaviz-speed') }));
        if (spd.before !== '1×' || (after.label || '').trim() !== '1.5×' || after.saved !== '1.5') fails.push('Speed button did not step 1× to 1.5× (' + spd.before + ' → ' + after.label + ', saved ' + after.saved + ')');
        if (!spd.inView) fails.push('Speed button out of view');
      }
      if (errors.length) fails.push('errors: ' + errors.slice(0, 2).join(' | '));
      if (fails.length) problems++;
      console.log((fails.length ? '✗' : '✓'), ('p-' + w + 'x' + h).padEnd(12), label.padEnd(10), fails.length ? fails.join('; ') : 'Play at ' + box.top + 'px, plays and pauses');
      await page.close();
    }
  }
  console.log(problems > readProblems ? (problems - readProblems) + ' problem(s) with player controls' : 'player controls in view and working in every player');

  await browser.close();
  server.close();
  console.log(problems ? problems + ' problem(s)' : 'all clear on desktop and phone');
  process.exitCode = problems ? 1 : 0;
});
