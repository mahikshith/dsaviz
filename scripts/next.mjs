/**
 * Runs the Next.js CLI. If the native compiler for this platform could not be
 * installed (some networks block its download), it falls back to the
 * WebAssembly compiler and the webpack bundler, which do not need it.
 *
 *   node scripts/next.mjs dev | build
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1' };

const native = {
  'win32-x64': '@next/swc-win32-x64-msvc',
  'win32-arm64': '@next/swc-win32-arm64-msvc',
  'darwin-x64': '@next/swc-darwin-x64',
  'darwin-arm64': '@next/swc-darwin-arm64',
  'linux-x64': ['@next/swc-linux-x64-gnu', '@next/swc-linux-x64-musl'],
  'linux-arm64': ['@next/swc-linux-arm64-gnu', '@next/swc-linux-arm64-musl'],
}[`${process.platform}-${process.arch}`];

const resolves = (name) => {
  try {
    require.resolve(`${name}/package.json`);
    return true;
  } catch {
    return false;
  }
};

const hasNative = [native].flat().filter(Boolean).some(resolves);
if (!hasNative && resolves('@next/swc-wasm-nodejs')) {
  env.NEXT_TEST_WASM_DIR = path.dirname(require.resolve('@next/swc-wasm-nodejs/package.json'));
  if (!args.includes('--webpack')) args.push('--webpack');
  console.log('Native Next.js compiler not installed; using the WebAssembly compiler with webpack (slower).');
}

const bin = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [bin, ...args], { stdio: 'inherit', env });
child.on('exit', (code) => process.exit(code ?? 1));
