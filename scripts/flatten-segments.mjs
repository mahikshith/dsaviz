/**
 * Next 16 static export writes per-segment prefetch data as nested folders
 * (out/git/__next.git/__PAGE__.txt), but the client router requests flat names
 * (out/git/__next.git.__PAGE__.txt). Every client-side navigation then 404s and
 * falls back to a slow full page load. This copies each nested file to the flat
 * name the router asks for, so any static host serves it.
 * ponytail: workaround for a Next export path mismatch; delete when an upgrade writes flat names itself.
 */
import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('out');
let copied = 0;

/** Walks a `__next.*` folder and copies every file to `<parent>/<segments joined by .>`. */
function flatten(dir, parent, prefix) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const flat = `${prefix}.${name}`;
    if (statSync(full).isDirectory()) flatten(full, parent, flat);
    else {
      const target = path.join(parent, flat);
      if (!existsSync(target)) {
        copyFileSync(full, target);
        copied++;
      }
    }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (!statSync(full).isDirectory() || name === '_next') continue;
    if (name.startsWith('__next.')) flatten(full, dir, name);
    else walk(full);
  }
}

if (!existsSync(root)) {
  console.error('out/ does not exist. Run the build first.');
  process.exit(1);
}
walk(root);
console.log(`Flattened ${copied} segment prefetch files.`);
