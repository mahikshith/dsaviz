// Logic back-test: runs each page script headlessly, clicks every handler, checks every {{hole}} and link.
const fs = require('fs');
const dir = process.argv[2] || require('path').join(__dirname, '..', 'pages');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.dc.html'));
let problems = 0;
const report = (f, msg) => { problems++; console.log('  ✗', f, msg); };
for (const f of files) {
  const src = fs.readFileSync(dir + '/' + f, 'utf8');
  const script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  const markup = src.slice(src.indexOf('<x-dc>'), src.indexOf('</x-dc>'));
  const store = {};
  const listeners = [];
  const sandbox = `
    const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } },
      addEventListener: (n, fn) => listeners.push(fn), removeEventListener: () => {} };
    const timers = []; const setInterval = (fn) => { timers.push(fn); return timers.length; }; const clearInterval = () => {};
    class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, typeof o === 'function' ? o(this.state) : o); } forceUpdate() {} }
    ${script}
    return { Component, timers };`;
  let C, timers;
  try { ({ Component: C, timers } = new Function('store', 'listeners', sandbox)(store, listeners)); } catch (e) { report(f, 'script error: ' + e.message); continue; }
  const c = new C({});
  c.componentDidMount && c.componentDidMount();
  let vals = c.renderVals();
  // 1. click every handler reachable from renderVals, repeatedly, re-rendering between clicks
  let clicks = 0;
  const walk = (v, path, out) => {
    if (typeof v === 'function') out.push([path, v]);
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, path + '[' + i + ']', out));
    else if (v && typeof v === 'object') Object.keys(v).forEach((k) => walk(v[k], path + '.' + k, out));
  };
  for (let round = 0; round < 3; round++) {
    const fns = []; walk(vals, '', fns);
    for (const [path, fn] of fns) {
      try { fn({ target: { value: '' } }); clicks++; vals = c.renderVals(); }
      catch (e) { report(f, 'handler ' + path + ' threw: ' + e.message); }
    }
    timers.forEach((fn) => { try { fn(); vals = c.renderVals(); } catch (e) { report(f, 'timer threw: ' + e.message); } });
  }
  // theme sync: another board writes the theme
  listeners.forEach((fn) => fn({ key: 'dsaviz-theme', newValue: 'field' }));
  vals = c.renderVals();
  if (listeners.length && vals.t && JSON.stringify(vals.t).indexOf('JetBrains') < 0) report(f, 'did not follow theme change');
  // 2. every hole resolves (render once per theme so all branches are checked)
  const aliases = {};
  const forRe = /<sc-for list="\{\{\s*([\w.$]+)\s*\}\}" as="(\w+)"/g; let m;
  const resolve = (path) => {
    const parts = path.split('.');
    let v = parts[0] in aliases ? aliases[parts[0]] : vals[parts[0]];
    for (const p of parts.slice(1)) { if (v == null) return undefined; v = v[p]; }
    return v;
  };
  while ((m = forRe.exec(markup))) {
    const list = resolve(m[1]);
    if (!Array.isArray(list)) { report(f, 'sc-for list not an array: ' + m[1]); continue; }
    aliases[m[2]] = list[0] !== undefined ? list[0] : {};
  }
  const holes = new Set([...markup.matchAll(/\{\{\s*([\w.$]+)\s*\}\}/g)].map((x) => x[1]));
  for (const h of holes) {
    if (['true', 'false', '$index'].includes(h)) continue;
    const root = h.split('.')[0];
    if (root in aliases && Object.keys(aliases[root]).length === 0) continue; // empty list: nothing to check
    if (resolve(h) === undefined) report(f, 'unresolved hole {{' + h + '}}');
  }
  // 3. every button has a handler; every link goes somewhere real
  const buttons = [...markup.matchAll(/<button\b[^>]*>/g)].map((x) => x[0]);
  buttons.forEach((b) => { if (!/onClick=/.test(b)) report(f, 'button without onClick: ' + b.slice(0, 90)); });
  const links = [...markup.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((x) => x[1]);
  links.forEach((h) => {
    if (h.startsWith('{{')) return;
    if (h === '#') report(f, 'placeholder link href="#"');
    else if (h.endsWith('.dc.html') && !files.includes(h)) report(f, 'link to missing board ' + h);
    else if (h.startsWith('#') && h.length > 1 && !markup.includes('id="' + h.slice(1) + '"')) report(f, 'anchor missing ' + h);
  });
  console.log(`✓ ${f}: ${buttons.length} buttons, ${links.length} links, ${clicks} handler clicks, ${holes.size} holes`);
}
console.log(problems ? problems + ' problem(s)' : 'all clear');
if (problems) process.exitCode = 1;
