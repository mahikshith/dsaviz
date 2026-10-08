/**
 * Content publication gate. Fails on any error in content/:
 * missing story sections, unknown adapters or patterns, duplicate ids,
 * malformed examples, wrong outputs, missing code anchors, bad checkpoints,
 * unsafe links, and narration templates that use fields an event lacks.
 *
 *   npm run validate
 */
import path from 'node:path';
import { loadContent, publishedOnly } from '../src/lib/content/load';

const root = process.argv[2] ? path.resolve(process.argv[2]) : path.join(process.cwd(), 'content');
const { content, issues } = loadContent(root);
const errors = issues.filter((i) => i.level === 'error');
const warnings = issues.filter((i) => i.level === 'warning');
const published = publishedOnly(content);

for (const w of warnings) console.warn(`warning  ${w.where}: ${w.message}`);
for (const e of errors) console.error(`error    ${e.where}: ${e.message}`);

const drafts = content.problems.length - published.problems.length + content.patterns.length - published.patterns.length;
console.log(
  `\n${published.patterns.length} published patterns, ${published.problems.length} published problems, ${published.paths.length} paths` +
    (drafts ? `, ${drafts} draft record(s) excluded from the site` : '') +
    `.\n${errors.length} error(s), ${warnings.length} warning(s).`,
);
if (errors.length) process.exit(1);
