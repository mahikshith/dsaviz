// Bundle the CodeMirror editor (src/code/editor.js) into one minified IIFE: build/editor.iife.js.
// build_site.py runs this, then inlines the file inside a function so it is only parsed lazily.
// Run from the repo root after `npm install`:  node scripts/build_editor.js
const path = require('path');
const esbuild = require('esbuild');

const root = path.join(__dirname, '..');
esbuild.buildSync({
  entryPoints: [path.join(root, 'src', 'code', 'editor.js')],
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'DSEditor',
  target: ['es2019'],
  legalComments: 'none',
  outfile: path.join(root, 'build', 'editor.iife.js'),
  logLevel: 'error'
});
console.log('build/editor.iife.js');
