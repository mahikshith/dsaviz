# Third-party notices

DSAMaxxing uses the open-source components below. Versions come from `package.json` and `package-lock.json`. Licence types come from each package's own `LICENSE` file and `package.json` in `node_modules`. The full licence texts ship with each package, or are at the links given.

## Shipped inside `dist/index.html`

The build inlines these into the single-file site.

| Component | Version | Licence | Copyright | Used for |
| --- | --- | --- | --- | --- |
| [react](https://github.com/facebook/react) | 18.3.1 | MIT | Facebook, Inc. and its affiliates | Page renderer (UMD production build) |
| [react-dom](https://github.com/facebook/react) | 18.3.1 | MIT | Facebook, Inc. and its affiliates | Page renderer (UMD production build) |
| [scheduler](https://github.com/facebook/react) | 0.23.2 | MIT | Facebook, Inc. and its affiliates | Bundled inside react-dom |
| [@codemirror/state](https://github.com/codemirror/state) | 6.4.1 | MIT | Marijn Haverbeke and others | Code editor |
| [@codemirror/view](https://github.com/codemirror/view) | 6.34.1 | MIT | Marijn Haverbeke and others | Code editor |
| [@codemirror/commands](https://github.com/codemirror/commands) | 6.7.1 | MIT | Marijn Haverbeke and others | Code editor keymaps and history |
| [@codemirror/language](https://github.com/codemirror/language) | 6.10.3 | MIT | Marijn Haverbeke and others | Code editor syntax support |
| [@codemirror/autocomplete](https://github.com/codemirror/autocomplete) | 6.18.1 | MIT | Marijn Haverbeke and others | Bracket closing and autocomplete (editor settings) |
| [@codemirror/search](https://github.com/codemirror/search) | 6.5.6 | MIT | Marijn Haverbeke and others | Search support used by the Vim keys (`/` and `n`) |
| [@replit/codemirror-vim](https://github.com/replit/codemirror-vim) | 6.2.1 | MIT | Marijn Haverbeke and others (CodeMirror 5 Vim mode), Replit | Vim keybindings, off unless turned on in the editor settings |
| [@codemirror/lang-python](https://github.com/codemirror/lang-python) | 6.1.6 | MIT | Marijn Haverbeke and others | Python highlighting |
| [@codemirror/lang-javascript](https://github.com/codemirror/lang-javascript) | 6.2.2 | MIT | Marijn Haverbeke and others | JavaScript highlighting |
| [@codemirror/lang-java](https://github.com/codemirror/lang-java) | 6.0.1 | MIT | Marijn Haverbeke and others | Java highlighting |
| [@codemirror/lang-cpp](https://github.com/codemirror/lang-cpp) | 6.0.2 | MIT | Marijn Haverbeke and others | C++ highlighting |
| [@codemirror/lang-go](https://github.com/codemirror/lang-go) | 6.0.1 | MIT | Marijn Haverbeke and others | Go highlighting |
| [@codemirror/lang-sql](https://github.com/codemirror/lang-sql) | 6.8.0 | MIT | Marijn Haverbeke and others | SQL highlighting (SQLite dialect) on the Code page's SQL mode; its grammar is built in, on @lezer/lr |
| [@lezer/common](https://github.com/lezer-parser/common) | 1.5.4 | MIT | Marijn Haverbeke | Parser runtime |
| [@lezer/lr](https://github.com/lezer-parser/lr) | 1.4.11 | MIT | Marijn Haverbeke | Parser runtime |
| [@lezer/highlight](https://github.com/lezer-parser/highlight) | 1.2.1 | MIT | Marijn Haverbeke | Highlight tags |
| [@lezer/python](https://github.com/lezer-parser/python) | 1.1.19 | MIT | Marijn Haverbeke | Python grammar |
| [@lezer/javascript](https://github.com/lezer-parser/javascript) | 1.5.6 | MIT | Marijn Haverbeke | JavaScript grammar |
| [@lezer/java](https://github.com/lezer-parser/java) | 1.1.5 | MIT | Marijn Haverbeke | Java grammar |
| [@lezer/cpp](https://github.com/lezer-parser/cpp) | 1.1.6 | MIT | Marijn Haverbeke | C++ grammar |
| [@lezer/go](https://github.com/lezer-parser/go) | 1.0.1 | MIT | Marijn Haverbeke | Go grammar |
| [@marijn/find-cluster-break](https://github.com/marijnh/find-cluster-break) | 1.0.4 | MIT | Marijn Haverbeke | Text handling in the editor |
| [style-mod](https://github.com/marijnh/style-mod) | 4.1.4 | MIT | Marijn Haverbeke | Editor styles |
| [w3c-keyname](https://github.com/marijnh/w3c-keyname) | 2.2.8 | MIT | Marijn Haverbeke | Editor key handling |
| [crelt](https://github.com/marijnh/crelt) | 1.0.7 | MIT | Marijn Haverbeke | Editor DOM helper |

`@codemirror/lint` 6.9.7 (MIT) is installed as a dependency of `@codemirror/lang-javascript`. The editor does not import it, so esbuild leaves it out of the bundle.

## Loaded from a CDN at run time

| Component | Version | Licence | Where from | Used for |
| --- | --- | --- | --- | --- |
| [Pyodide](https://github.com/pyodide/pyodide) | 0.26.4 | MPL-2.0 | `https://cdn.jsdelivr.net/pyodide/v0.26.4/full/` | Running Python on the Code page. It loads only when a learner runs Python. Pyodide includes CPython, which is under the [PSF License](https://docs.python.org/3/license.html); see Pyodide's own notices for the packages it bundles. |
| [sql.js](https://github.com/sql-js/sql.js) | 1.14.2 | MIT | `https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/` (`sql-wasm.js` and `sql-wasm.wasm`) | Running SQL on the Code page. SQLite compiled to WebAssembly; it loads in a worker only when a learner runs a query. SQLite itself is in the [public domain](https://www.sqlite.org/copyright.html). |
| [Anton](https://fonts.google.com/specimen/Anton) | Google Fonts | SIL Open Font License 1.1 | `fonts.googleapis.com` | Display type (Max theme) |
| [Outfit](https://fonts.google.com/specimen/Outfit) | Google Fonts | SIL Open Font License 1.1 | `fonts.googleapis.com` | Body type (Max theme) |
| [Fraunces](https://fonts.google.com/specimen/Fraunces) | Google Fonts | SIL Open Font License 1.1 | `fonts.googleapis.com` | Display type (light and dark themes) |
| [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) | Google Fonts | SIL Open Font License 1.1 | `fonts.googleapis.com` | Body type (light and dark themes) |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Google Fonts | SIL Open Font License 1.1 | `fonts.googleapis.com` | Code and the terminal theme |

## Build and test tools (not shipped)

| Component | Version | Licence | Used for |
| --- | --- | --- | --- |
| [sql.js](https://github.com/sql-js/sql.js) | 1.14.2 | MIT | `tests/sqlcheck.js`: runs every SQL reference query on every dataset in Node, with the same SQLite build the page loads |
| [esbuild](https://github.com/evanw/esbuild) | 0.24.2 | MIT | Bundling the CodeMirror editor at build time. Its platform binary (`@esbuild/*`, 0.24.2, MIT) is installed alongside it. |
| [KaTeX](https://github.com/KaTeX/KaTeX) | 0.16.22 | MIT | Turns the About tab equations (LaTeX in src/ai/about_*.js) into MathML at build time (scripts/build_about.js). Only that MathML ships; browsers draw it natively, so no KaTeX code, CSS or fonts are in the bundle. |
| [loose-envify](https://github.com/zertosh/loose-envify) | 1.4.0 | MIT | Installed as a dependency of React. The site uses React's prebuilt UMD files, so this is not used. |
| [js-tokens](https://github.com/lydell/js-tokens) | 4.0.0 | MIT | Dependency of loose-envify |
| [Playwright](https://github.com/microsoft/playwright) | not pinned | Apache-2.0 | Optional browser test (`npm run test:browser`), installed with `--no-save` |

## Content

Problems are known by their common titles only, and every problem has its own page on this site. Every problem statement, story, hint, example and test input on the site is written for DSAMaxxing. The SQL problems use our own tables, columns, rows and wording; `tests/sqlcheck.js` fails if a schema uses a table name common practice sets use. No problem text or examples are copied from other sites.

### Lesson material

Every lesson (system design and AI & ML) is 100% our own writing, diagrams, numbers and examples. No lesson text, examples or worded ideas are adapted from any source, permissive or not; research was used only for the shape of the curriculum and general teaching ideas, so no lesson carries a content credit. `tests/sdcheck.js` and `tests/aicheck.js` fail if a lesson gains one.

AI-now lessons list their primary sources (papers and lab posts, with dates) on the lesson page. They are references for facts, cited as sources, not adapted content. Hello Interview, Design Gurus, ByteByteGo, refactoring.guru and Designing Data-Intensive Applications are not used as sources; `tests/sdcheck.js` fails if a lesson names them.
