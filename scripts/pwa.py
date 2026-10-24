"""Offline web app files for dist/: the manifest, the service worker and the app icons.

Called by scripts/build_site.py after it writes dist/index.html:

  dist/manifest.webmanifest   name, colours, start URL and icons
  dist/sw.js                  cache-first service worker. The site cache is named after a hash of this
                              build, so a new build replaces it. Pyodide, sql.js and font files go into a
                              second cache the first time the page uses them.
  dist/icons/*.png            the lime "M" logo (shared/ui/nav.html), drawn here without image libraries:
                              icon-192 and icon-512 (rounded), icon-maskable-512 and apple-touch-icon
                              (full bleed, so launchers can crop them).

index.html links the manifest and icons in its head and registers sw.js only when served over http(s).
Opened from disk (file://) it works exactly as before.
"""
import hashlib
import json
import math
import os
import struct
import zlib

BG = '#0A0A0B'      # max theme background (theme colour)
ACCENT = '#C5F04A'  # volt lime: the logo tile
INK = '#0A0A0A'     # the M stroke (onAccent)

HEAD = ('<meta name="theme-color" content="%s">\n'
        '<link rel="manifest" href="manifest.webmanifest">\n'
        '<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">\n'
        '<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n') % BG

REGISTER = ('<script>\n'
            '// Offline app: the service worker only runs when the site is served over http(s). Opened as a file, nothing changes.\n'
            "if (/^https?:$/.test(location.protocol) && 'serviceWorker' in navigator) {\n"
            "  window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });\n"
            '}\n'
            '</script>\n')

ICONS = [('icon-192.png', 192, False), ('icon-512.png', 512, False), ('icon-maskable-512.png', 512, True), ('apple-touch-icon.png', 180, True)]

# The logo in its 30x30 viewBox: a rounded tile (1..29, radius 9) and an M polyline, stroke 3, round caps.
M = [(7.5, 20.5), (11.5, 10), (15, 17), (18.5, 10), (22.5, 20.5)]


def rgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def seg_dist(px, py, a, b):
    ax, ay = a
    bx, by = b
    dx, dy = bx - ax, by - ay
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - ax - t * dx, py - ay - t * dy)


def rrect_dist(px, py, x0, y0, x1, y1, r):
    """Signed distance to a rounded rectangle (negative inside)."""
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    hx, hy = (x1 - x0) / 2 - r, (y1 - y0) / 2 - r
    qx, qy = abs(px - cx) - hx, abs(py - cy) - hy
    return math.hypot(max(qx, 0), max(qy, 0)) + min(max(qx, qy), 0) - r


def draw(size, bleed):
    """RGBA rows for the logo at size x size, anti-aliased from signed distances."""
    # A full-bleed icon fills the square with lime and shrinks the M into the 80% safe zone (maskable icons).
    scale = size / 30.0
    m = [((x - 15) * 0.78 + 15, (y - 15.25) * 0.78 + 15) for x, y in M] if bleed else M
    half = (3 * (0.78 if bleed else 1)) / 2
    lime, ink = rgb(ACCENT), rgb(INK)
    rows = []
    for j in range(size):
        row = bytearray()
        y = (j + 0.5) / scale
        for i in range(size):
            x = (i + 0.5) / scale
            tile = 1.0 if bleed else max(0.0, min(1.0, 0.5 - rrect_dist(x, y, 1, 1, 29, 29, 9) * scale))
            if tile <= 0:
                row += b'\x00\x00\x00\x00'
                continue
            d = min(seg_dist(x, y, m[k], m[k + 1]) for k in range(len(m) - 1))
            s = max(0.0, min(1.0, 0.5 - (d - half) * scale))
            c = [round(lime[k] * (1 - s) + ink[k] * s) for k in range(3)]
            row += bytes(c + [round(255 * tile)])
        rows.append(bytes(row))
    return rows


def png(rows, size):
    raw = b''.join(b'\x00' + r for r in rows)

    def chunk(kind, data):
        return struct.pack('>I', len(data)) + kind + data + struct.pack('>I', zlib.crc32(kind + data) & 0xffffffff)
    return (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b''))


def manifest():
    return {
        'name': 'DSAMaxxing',
        'short_name': 'DSAMaxxing',
        'description': 'Data structures and algorithms, taught as animated stories.',
        'id': './',
        'start_url': './',
        'scope': './',
        'display': 'standalone',
        'background_color': BG,
        'theme_color': BG,
        'icons': [
            {'src': 'icons/icon-192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'any'},
            {'src': 'icons/icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'},
            {'src': 'icons/icon-maskable-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'}
        ]
    }


SW = r'''// DSAMaxxing service worker. Generated by scripts/build_site.py (scripts/pwa.py): do not edit.
// Cache-first. The site cache is named after this build's hash, so a new build installs a fresh copy and
// removes the old one. Pyodide, sql.js and web-font files go into a runtime cache the first time they load.
const VERSION = 'dsamaxxing-@@HASH@@';
const RUNTIME = 'dsamaxxing-runtime-v1';
const SHELL = @@SHELL@@;
const FONT_CSS = @@FONTS@@;
const LAZY = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\/|^https:\/\/(cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|unpkg\.com)\/.*(pyodide|sql\.js|sql-wasm)/i;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(SHELL);
    // Fonts: the stylesheet plus its Latin files, so text keeps its faces offline. Best effort.
    await Promise.all(FONT_CSS.map(async (href) => {
      try {
        const res = await fetch(href, { mode: 'cors' });
        if (!res.ok) return;
        const css = await res.clone().text();
        await cache.put(href, res);
        const files = [];
        css.replace(/\/\*\s*latin\s*\*\/[^}]*?url\((https:[^)]+)\)/g, (m, u) => { files.push(u); return m; });
        await Promise.all(files.map((u) => fetch(u, { mode: 'cors' }).then((r) => (r.ok ? cache.put(u, r) : null)).catch(() => null)));
      } catch (e) { /* offline during install: fonts load later */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('dsamaxxing-') && k !== VERSION && k !== RUNTIME).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function fromCache(request, cacheName, key) {
  const hit = await caches.match(key || request, { ignoreSearch: !!key });
  if (hit) return hit;
  const res = await fetch(request);
  if (cacheName && (res.ok || res.type === 'opaque')) {
    const cache = await caches.open(cacheName);
    cache.put(request, res.clone());
  }
  return res;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    // Every page of the site is index.html (pages live in the #hash, problems in ?problem=).
    const shell = req.mode === 'navigate' ? new URL('index.html', self.registration.scope).href : null;
    event.respondWith(fromCache(req, null, shell).catch(() => caches.match(new URL('index.html', self.registration.scope).href)));
    return;
  }
  if (LAZY.test(req.url)) event.respondWith(fromCache(req, RUNTIME));
});
'''


def write(dist, index_html, fonts):
    """Writes the manifest, icons and sw.js into dist/. Returns a one-line summary."""
    os.makedirs(os.path.join(dist, 'icons'), exist_ok=True)
    for name, size, bleed in ICONS:
        with open(os.path.join(dist, 'icons', name), 'wb') as f:
            f.write(png(draw(size, bleed), size))
    man = json.dumps(manifest(), indent=2) + '\n'
    with open(os.path.join(dist, 'manifest.webmanifest'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(man)
    shell = ['./', './index.html', './manifest.webmanifest'] + ['./icons/' + n for n, _, _ in ICONS]
    h = hashlib.sha256((index_html + man + json.dumps(fonts)).encode('utf-8')).hexdigest()[:12]
    sw = SW.replace('@@HASH@@', h).replace('@@SHELL@@', json.dumps(shell)).replace('@@FONTS@@', json.dumps(fonts))
    with open(os.path.join(dist, 'sw.js'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(sw)
    return 'dist/sw.js cache dsamaxxing-%s, manifest.webmanifest, %d icons' % (h, len(ICONS))
