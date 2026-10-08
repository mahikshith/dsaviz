/**
 * Serves the static export in out/ for a local check of the production build.
 * No dependencies. Not meant for hosting: deploy out/ to any static host instead.
 *
 *   npm run build && npm start    # http://localhost:4173
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';

const root = path.resolve('out');
const port = Number(process.env.PORT ?? 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
};

if (!existsSync(root)) {
  console.error('out/ does not exist. Run npm run build first.');
  process.exit(1);
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (!file.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!existsSync(file)) {
    const notFound = path.join(root, '404.html');
    res.writeHead(404, { 'content-type': types['.html'] });
    if (existsSync(notFound)) createReadStream(notFound).pipe(res);
    else res.end('Not found');
    return;
  }
  res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}`));
