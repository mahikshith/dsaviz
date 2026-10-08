/**
 * Trusted repository Markdown to HTML. Raw HTML is escaped, links are checked,
 * and glossary references written as [[term]] or [[term|shown text]] become
 * buttons that the page's glossary layer explains in place.
 */
import { Marked } from 'marked';
import { highlight } from './code';

export type MarkdownIssue = { message: string };

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function isSafeHref(href: string) {
  return /^(\/(?!\/)|#|https:\/\/)/.test(href);
}

/** Renders one line of inline Markdown (code, emphasis, links, glossary terms) without a wrapping paragraph. */
export function renderInline(source: string, glossaryIds: ReadonlySet<string>) {
  return renderMarkdown(source, glossaryIds, true);
}

export function renderMarkdown(source: string, glossaryIds: ReadonlySet<string>, inline = false) {
  const issues: MarkdownIssue[] = [];
  const terms: string[] = [];
  const placeholders: string[] = [];
  const prepared = source.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, id: string, text?: string) => {
    if (!glossaryIds.has(id)) issues.push({ message: `unknown glossary term [[${id}]]` });
    terms.push(id);
    const shown = text ?? id.replace(/-/g, ' ');
    placeholders.push(
      `<button type="button" class="term" data-term="${escapeHtml(id)}" aria-expanded="false">${escapeHtml(shown)}</button>`,
    );
    return `GLOSSARYTERM${placeholders.length - 1}END`;
  });

  const marked = new Marked({
    gfm: true,
    renderer: {
      html({ text }) {
        issues.push({ message: 'raw HTML is not allowed in lesson Markdown' });
        return escapeHtml(text);
      },
      link({ href, tokens }) {
        const inner = this.parser.parseInline(tokens);
        if (!isSafeHref(href)) {
          issues.push({ message: `unsafe or unsupported link "${href}"; use /internal paths, #anchors or https:// URLs` });
          return inner;
        }
        const external = href.startsWith('https://');
        return `<a href="${escapeHtml(href)}"${external ? ' rel="noreferrer"' : ''}>${inner}</a>`;
      },
      image() {
        issues.push({ message: 'images are not supported in lesson Markdown yet' });
        return '';
      },
      code({ text, lang }) {
        const language = lang === 'python' || lang === 'typescript' ? lang : null;
        const body = text
          .split('\n')
          .map((line) =>
            language
              ? highlight(line, language)
                  .map((t) => (t.k === 'txt' ? escapeHtml(t.v) : `<span class="tok-${t.k}">${escapeHtml(t.v)}</span>`))
                  .join('')
              : escapeHtml(line),
          )
          .join('\n');
        return `<pre class="code-block"${language ? ` data-language="${language}"` : ''}><code>${body}</code></pre>\n`;
      },
    },
  });

  let html = (inline ? marked.parseInline(prepared, { async: false }) : marked.parse(prepared, { async: false })) as string;
  html = html.replace(/GLOSSARYTERM(\d+)END/g, (_, i: string) => placeholders[Number(i)] ?? '');
  return { html, terms, issues };
}

/** Splits a document into `## Heading` sections. Text before the first heading is ignored. */
export function splitSections(source: string): Map<string, string> {
  const sections = new Map<string, string>();
  let current: string | null = null;
  let buffer: string[] = [];
  const flush = () => {
    if (current !== null) sections.set(current, buffer.join('\n').trim());
  };
  for (const line of source.replace(/\r\n/g, '\n').split('\n')) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      flush();
      current = m[1]!;
      buffer = [];
    } else if (current !== null) {
      buffer.push(line);
    }
  }
  flush();
  return sections;
}
