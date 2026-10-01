// Browser test for the built site (dist/index.html): opens every page in every theme,
// clicks visible buttons and reports page errors or unfilled {{holes}}.
// Needs Playwright:  npm install --no-save playwright && npx playwright install chromium
const http = require('http');
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  console.log('Playwright is not installed. Run: npm install --no-save playwright && npx playwright install chromium');
  process.exit(1);
}

const PAGES = ['Main', 'Auth', 'Welcome', 'About', 'Home', 'Revisit', 'Profile', 'Leaderboard', 'Patterns', 'Interview', 'Briefing', 'Story', 'Glossary', 'Basics'];
const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'));
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    // Same spirit as a strict sandbox: no eval, no external scripts.
    'Content-Security-Policy': "script-src 'unsafe-inline'"
  });
  res.end(html);
});

server.listen(0, async () => {
  const url = 'http://localhost:' + server.address().port + '/';
  const browser = await chromium.launch();
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
  await browser.close();
  server.close();
  console.log(problems ? problems + ' problem(s)' : 'all pages render in all themes');
  process.exitCode = problems ? 1 : 0;
});
