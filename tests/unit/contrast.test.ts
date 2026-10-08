/**
 * Checks the colour pairs the interface actually uses against WCAG 2.2 AA:
 * 4.5:1 for text, 3:1 for control boundaries and meaningful graphics.
 * Tokens are read from globals.css, so the test follows any palette change.
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const css = fs.readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8').replace(/\r\n/g, '\n');

function tokens(block: string) {
  const out: Record<string, string> = {};
  for (const m of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)) out[m[1]!] = m[2]!.toLowerCase();
  return out;
}
/** The declarations of the first rule whose selector starts exactly with `selector`. */
function block(selector: string) {
  const start = css.indexOf(`\n${selector}`);
  if (start < 0) throw new Error(`missing ${selector}`);
  return css.slice(start, css.indexOf('\n}', start));
}
const darkHues = tokens(block(":root[data-theme='dark'],\n:root[data-theme='terminal'] {"));
const light = tokens(block(':root {'));
const dark = { ...tokens(block(":root[data-theme='dark'] {")), ...darkHues };
const terminal = { ...tokens(block(":root[data-theme='terminal'] {")), ...darkHues };

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}
function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

// [foreground, background, minimum]
const TEXT = 4.5;
const UI = 3;
const PAIRS: [string, string, number][] = [
  ['text', 'canvas', TEXT],
  ['text', 'surface', TEXT],
  ['text', 'surface-sunk', TEXT],
  ['muted', 'canvas', TEXT],
  ['muted', 'surface', TEXT],
  ['muted', 'surface-sunk', TEXT],
  ['muted', 'code-bg', TEXT],
  ['primary', 'surface', TEXT],
  ['primary', 'canvas', TEXT],
  ['primary', 'primary-soft', TEXT],
  ['on-primary', 'primary', TEXT],
  ['accent', 'surface', TEXT],
  ['accent', 'canvas', TEXT],
  ['accent', 'surface-sunk', TEXT],
  ['comparison', 'surface', TEXT],
  ['comparison', 'comparison-soft', TEXT],
  ['success', 'surface', TEXT],
  ['success', 'success-soft', TEXT],
  ['danger', 'surface', TEXT],
  ['danger', 'danger-soft', TEXT],
  ['text', 'primary-soft', TEXT],
  ['text', 'comparison-soft', TEXT],
  ['text', 'success-soft', TEXT],
  ['text', 'accent-soft', TEXT],
  ['text', 'danger-soft', TEXT],
  ['text', 'code-active', TEXT],
  ['tok-kw', 'code-bg', TEXT],
  ['tok-str', 'code-bg', TEXT],
  ['tok-num', 'code-bg', TEXT],
  ['tok-com', 'code-bg', TEXT],
  ['tok-fn', 'code-bg', TEXT],
  ['tok-kw', 'code-active', TEXT],
  ['control-border', 'surface', UI],
  ['control-border', 'canvas', UI],
  ['focus', 'canvas', UI],
  ['focus', 'surface', UI],
  ['primary', 'surface', UI],
  ['comparison', 'surface', UI],
  ['success', 'surface', UI],
  ['hatch', 'surface', 1.5],
  ['select-fg', 'select-bg', TEXT],
  ...['indigo', 'teal', 'ocean', 'rose', 'copper', 'moss', 'olive', 'gold', 'violet', 'slate'].flatMap(
    (h): [string, string, number][] => [
      ['on-hue', `hue-${h}`, TEXT],
      [`hue-${h}`, `hue-${h}-soft`, TEXT],
      ['text', `hue-${h}-soft`, TEXT],
      [`hue-${h}`, 'surface', UI],
    ],
  ),
];

describe.each([
  ['light', light],
  ['dark', dark],
  ['terminal', terminal],
])('%s theme contrast', (_, t) => {
  it('defines every token it uses', () => {
    for (const [fg, bg] of PAIRS) {
      expect(t[fg], fg).toBeDefined();
      expect(t[bg], bg).toBeDefined();
    }
  });
  it.each(PAIRS)('%s on %s ≥ %d', (fg, bg, min) => {
    expect(ratio(t[fg]!, t[bg]!)).toBeGreaterThanOrEqual(min);
  });
});
