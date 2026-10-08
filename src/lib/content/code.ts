/**
 * Reference code with semantic anchors. A line ending in `# @anchor compare`
 * (Python) or `// @anchor compare, move-left` (TypeScript) is tagged with those
 * anchors; the marker comment is removed before display. Anchors name
 * operations, so each language maps them to its own lines.
 */
import type { Language } from './schema';

export type TokenKind = 'kw' | 'str' | 'com' | 'num' | 'fn' | 'txt';
export type Token = { k: TokenKind; v: string };
export type CodeListing = {
  language: Language;
  lines: Token[][];
  plain: string[];
  /** Anchor name to 1-based line numbers. */
  anchors: Record<string, number[]>;
};

const MARKER = /\s*(?:#|\/\/)\s*@anchor\s+([a-z0-9-]+(?:\s*,\s*[a-z0-9-]+)*)\s*$/;

export function parseReference(source: string, language: Language): CodeListing {
  const raw = source.replace(/\r\n/g, '\n').replace(/\n+$/, '').split('\n');
  const anchors: Record<string, number[]> = {};
  const plain = raw.map((line, i) => {
    const m = MARKER.exec(line);
    if (!m) return line.replace(/\s+$/, '');
    for (const name of m[1]!.split(',').map((s) => s.trim())) (anchors[name] ??= []).push(i + 1);
    return line.slice(0, m.index).replace(/\s+$/, '');
  });
  return { language, plain, anchors, lines: plain.map((l) => highlight(l, language)) };
}

const KEYWORDS: Record<Language, Set<string>> = {
  python: new Set(
    'def return if elif else while for in not and or is None True False import from as class pass break continue lambda with yield'.split(' '),
  ),
  typescript: new Set(
    'function return if else while for of in const let var new null undefined true false import from export type class break continue typeof interface as'.split(
      ' ',
    ),
  ),
};

/** A small static highlighter: enough to read reference code, no runtime cost. */
export function highlight(line: string, language: Language): Token[] {
  const tokens: Token[] = [];
  const comment = language === 'python' ? '#' : '//';
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|(.)/g;
  let i = 0;
  while (i < line.length) {
    if (line.startsWith(comment, i)) {
      tokens.push({ k: 'com', v: line.slice(i) });
      break;
    }
    re.lastIndex = i;
    const m = re.exec(line);
    if (!m) break;
    const [text, str, num, word] = m;
    if (str) tokens.push({ k: 'str', v: text });
    else if (num) tokens.push({ k: 'num', v: text });
    else if (word) {
      const isCall = line[i + text.length] === '(';
      tokens.push({ k: KEYWORDS[language].has(text) ? 'kw' : isCall ? 'fn' : 'txt', v: text });
    } else tokens.push({ k: 'txt', v: text });
    i += text.length;
  }
  // Merge neighbouring plain tokens to keep the markup small.
  return tokens.reduce<Token[]>((acc, t) => {
    const last = acc[acc.length - 1];
    if (last && last.k === 'txt' && t.k === 'txt') last.v += t.v;
    else acc.push({ ...t });
    return acc;
  }, []);
}
