// Offline app check (run after the build): dist/manifest.webmanifest is valid JSON with the fields an
// install needs, every icon it names exists as a PNG of the stated size, sw.js is versioned and caches
// what it should, and index.html links the manifest and registers the worker only over http(s).
const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, '..', 'dist');

let problems = 0;
const check = (cond, msg) => { if (!cond) { problems++; console.log('  ✗', msg); } else console.log('  ✓', msg); };
const read = (f) => { try { return fs.readFileSync(path.join(dist, f)); } catch (e) { return null; } };
// Width, height and colour type from a PNG's IHDR chunk, or null.
function pngInfo(buf) {
  if (!buf || buf.length < 33 || buf.toString('hex', 0, 8) !== '89504e470d0a1a0a' || buf.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: buf[25] };
}

console.log('manifest');
let man = null;
try { man = JSON.parse(read('manifest.webmanifest').toString('utf8')); } catch (e) { /* reported below */ }
check(!!man, 'manifest.webmanifest is valid JSON');
man = man || {};
check(man.name === 'DSAMaxxing' && man.short_name, 'name DSAMaxxing and a short name');
check(man.theme_color === '#0A0A0B' && man.background_color === '#0A0A0B', 'theme and background colour #0A0A0B');
check(man.start_url === './' && man.scope === './' && man.display === 'standalone', 'relative start URL and scope, standalone display');
const icons = man.icons || [];
check(['192x192', '512x512'].every((s) => icons.some((i) => i.sizes === s && i.type === 'image/png' && (i.purpose || 'any').includes('any'))), 'PNG icons at 192 and 512');
icons.forEach((i) => {
  const info = pngInfo(read(i.src));
  const [w, h] = i.sizes.split('x').map(Number);
  check(info && info.w === w && info.h === h, i.src + ' exists and is ' + i.sizes);
});

console.log('icons');
const big = read('icons/icon-512.png');
const zlib = require('zlib');
// The logo tile is lime: sample the centre column of the 512 icon's decoded pixels (filter type 0 rows).
{
  const chunks = [];
  for (let o = 8; o < big.length;) { const len = big.readUInt32BE(o), kind = big.toString('ascii', o + 4, o + 8); if (kind === 'IDAT') chunks.push(big.slice(o + 8, o + 8 + len)); o += 12 + len; }
  const raw = zlib.inflateSync(Buffer.concat(chunks));
  const px = (x, y) => { const at = y * (512 * 4 + 1) + 1 + x * 4; return '#' + raw.slice(at, at + 3).toString('hex').toUpperCase() + raw.slice(at + 3, at + 4).toString('hex'); };
  check(px(60, 256) === '#C5F04Aff', 'icon tile is the lime accent #C5F04A');
  check(px(0, 0).endsWith('00'), 'rounded corners are transparent');
}
const apple = pngInfo(read('icons/apple-touch-icon.png'));
check(apple && apple.w === 180 && apple.h === 180, 'apple-touch-icon is 180x180');

console.log('service worker');
const sw = (read('sw.js') || '').toString('utf8');
check(/const VERSION = 'dsamaxxing-[0-9a-f]{12}';/.test(sw), 'cache name carries the build hash');
const shell = (sw.match(/const SHELL = (\[.*\]);/) || [])[1];
check(shell && JSON.parse(shell).includes('./index.html') && JSON.parse(shell).every((f) => f === './' || read(f.slice(2))), 'precache list holds index.html and only files that exist');
check(/fonts\.googleapis\.com/.test(sw) && /pyodide/.test(sw) && /sql/.test(sw), 'fonts precached; Pyodide and sql.js cached on first use');
try { new Function(sw.replace(/\bself\b/g, '({addEventListener(){}, location: {}})')); check(true, 'sw.js parses'); } catch (e) { check(false, 'sw.js parses: ' + e.message); }

console.log('index.html');
const html = (read('index.html') || '').toString('utf8');
const head = html.slice(0, html.indexOf('<div id="app">'));
check(/<link rel="manifest" href="manifest\.webmanifest">/.test(head), 'head links the manifest');
check(/<link rel="apple-touch-icon" href="icons\/apple-touch-icon\.png">/.test(head), 'head links the apple-touch-icon');
check(/<meta name="theme-color" content="#0A0A0B">/.test(head), 'head sets the theme colour');
check(/\/\^https\?:\$\/\.test\(location\.protocol\) && 'serviceWorker' in navigator/.test(html) && /register\('sw\.js'\)/.test(html), 'sw.js registers only over http(s)');
check(!/<script[^>]+src=/.test(html), 'still one self-contained file (no external scripts)');

console.log(problems ? problems + ' pwa problem(s)' : 'pwa clean');
if (problems) process.exitCode = 1;
