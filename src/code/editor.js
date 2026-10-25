// CodeMirror 6 editor for the Code page. Bundled by scripts/build_editor.js into one IIFE
// (global DSEditor) that build_site.py wraps in a function, so it is only parsed lazily and
// only runs when the Code page asks for it.
// opts: { doc, lang, theme, label, onChange, onRun, onSubmit, prefs, wrap }. Ctrl/Cmd + ' runs; Ctrl/Cmd + Enter submits (runs when there is no onSubmit).
// prefs (DS.editorPrefs()): { fontSize, tabSize (0 = the language's own), wrap, relative, vim, brackets, autocomplete }
import { EditorState, Compartment, Prec } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, gutter, GutterMarker, highlightActiveLine, highlightActiveLineGutter, drawSelection } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { indentOnInput, bracketMatching, syntaxHighlighting, HighlightStyle, indentUnit } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap, completeAnyWord } from '@codemirror/autocomplete';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { sql, SQLite } from '@codemirror/lang-sql';
import { vim } from '@replit/codemirror-vim';
import { tags } from '@lezer/highlight';

const MODES = { py: python, js: javascript, java, cpp, go, sql: () => sql({ dialect: SQLite }) };
const UNITS = { py: 4, js: 2, java: 4, cpp: 4, go: 4, sql: 2 };
const DEFAULTS = { fontSize: 14, tabSize: 0, wrap: false, relative: false, vim: false, brackets: true, autocomplete: true };

// t: theme tokens from THEMES (codeBg, line, text, muted, accent, right, medFg, ok, hl, mono)
function themeFor(t) {
  const dark = !/^#F|^#E/i.test(t.codeBg || '#000');
  const view = EditorView.theme({
    '&': { backgroundColor: t.codeBg, color: t.text, height: '100%' },
    '.cm-scroller': { fontFamily: t.mono, lineHeight: '1.65', fontVariantLigatures: 'none' },
    '.cm-content': { caretColor: t.accent, padding: '12px 0' },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: t.accent, borderLeftWidth: '2px' },
    '&.cm-focused': { outline: 'none', boxShadow: 'inset 0 0 0 2px ' + t.accent },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: t.hl + ' !important' },
    '.cm-gutters': { backgroundColor: t.codeBg, color: t.muted, border: 'none', borderRight: '1px solid ' + t.line },
    '.cm-lineNumbers .cm-gutterElement': { padding: '0 12px 0 14px' },
    '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,0.03)' },
    '.cm-activeLineGutter': { backgroundColor: 'transparent', color: t.text },
    '&.cm-focused .cm-matchingBracket': { backgroundColor: 'transparent', outline: '1px solid ' + t.accent },
    '.cm-tooltip': { backgroundColor: t.surface || t.codeBg, color: t.text, border: '1px solid ' + t.line, borderRadius: '8px' },
    '.cm-tooltip-autocomplete ul li[aria-selected]': { backgroundColor: t.hl, color: t.text },
    '.cm-vim-panel': { backgroundColor: t.codeBg, color: t.text, fontFamily: t.mono, padding: '2px 12px', borderTop: '1px solid ' + t.line },
    '.cm-vim-panel input': { color: t.text, fontFamily: t.mono },
    '.cm-fat-cursor': { background: t.accent + ' !important', color: t.codeBg + ' !important' },
    '&:not(.cm-focused) .cm-fat-cursor': { background: 'none !important', outline: '1px solid ' + t.accent }
  }, { dark });
  const hl = HighlightStyle.define([
    { tag: [tags.keyword, tags.controlKeyword, tags.definitionKeyword, tags.moduleKeyword, tags.operatorKeyword, tags.modifier], color: t.accent },
    { tag: [tags.string, tags.special(tags.string), tags.character], color: t.right },
    { tag: [tags.number, tags.bool, tags.null, tags.atom], color: t.medFg },
    { tag: [tags.comment, tags.lineComment, tags.blockComment], color: t.muted, fontStyle: 'italic' },
    { tag: [tags.function(tags.variableName), tags.function(tags.propertyName), tags.definition(tags.function(tags.variableName))], color: t.text, fontWeight: '700' },
    { tag: [tags.typeName, tags.className, tags.standard(tags.typeName)], color: t.ok },
    { tag: [tags.variableName, tags.propertyName, tags.operator, tags.punctuation, tags.bracket], color: t.text2 || t.text }
  ]);
  return [view, syntaxHighlighting(hl)];
}

// Relative line numbers: the cursor's line shows its real number, every other line its distance from it.
class NumberMarker extends GutterMarker {
  constructor(text) { super(); this.text = text; }
  eq(other) { return other.text === this.text; }
  toDOM() { return document.createTextNode(this.text); }
}
const relativeNumbers = gutter({
  class: 'cm-lineNumbers',
  lineMarker(view, line) {
    const doc = view.state.doc;
    const n = doc.lineAt(line.from).number, at = doc.lineAt(view.state.selection.main.head).number;
    return new NumberMarker(String(n === at ? n : Math.abs(n - at)));
  },
  lineMarkerChange: (u) => u.selectionSet || u.docChanged || u.viewportChanged,
  initialSpacer: (view) => new NumberMarker(String(Math.max(99, view.state.doc.lines)))
});

function clean(p) {
  const o = Object.assign({}, DEFAULTS, p || {});
  o.fontSize = Math.max(12, Math.min(22, Number(o.fontSize) || DEFAULTS.fontSize));
  o.tabSize = o.tabSize === 2 || o.tabSize === 4 ? o.tabSize : 0;
  return o;
}

function create(parent, opts) {
  const lang = new Compartment(), theme = new Compartment(), unit = new Compartment(), size = new Compartment();
  const wrap = new Compartment(), nums = new Compartment(), modal = new Compartment(), brackets = new Compartment(), complete = new Compartment();
  let quiet = false;
  let code = opts.lang || 'py';
  let prefs = clean(Object.assign({}, opts.prefs, opts.wrap ? { wrap: true } : {}));
  const tabOf = () => prefs.tabSize || UNITS[code] || 4;
  const unitExt = () => [indentUnit.of(' '.repeat(tabOf())), EditorState.tabSize.of(tabOf())];
  const sizeExt = () => EditorView.theme({ '&': { fontSize: prefs.fontSize + 'px' } });
  const bracketExt = () => (prefs.brackets ? [bracketMatching(), closeBrackets(), keymap.of(closeBracketsKeymap)] : []);
  const completeExt = () => (prefs.autocomplete ? [autocompletion({ activateOnTyping: true }), EditorState.languageData.of(() => [{ autocomplete: completeAnyWord }]), keymap.of(completionKeymap)] : []);
  // Run (Ctrl/Cmd + ') and Submit (Ctrl/Cmd + Enter) win over the default keymap, which would add a blank line.
  const keys = Prec.highest(keymap.of([
    { key: "Mod-'", run: () => { if (opts.onRun) opts.onRun(); return !!opts.onRun; } },
    { key: 'Mod-Enter', run: () => { const f = opts.onSubmit || opts.onRun; if (f) f(); return !!f; } }
  ]));
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: opts.doc || '',
      extensions: [
        modal.of(prefs.vim ? vim({ status: true }) : []),
        keys,
        wrap.of(prefs.wrap ? EditorView.lineWrapping : []),
        nums.of(prefs.relative ? relativeNumbers : lineNumbers()),
        highlightActiveLineGutter(), highlightActiveLine(), drawSelection(),
        history(), indentOnInput(),
        brackets.of(bracketExt()),
        complete.of(completeExt()),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        unit.of(unitExt()),
        lang.of((MODES[code] || python)()),
        theme.of(themeFor(opts.theme)),
        size.of(sizeExt()),
        EditorView.contentAttributes.of({ 'aria-label': opts.label || 'Code editor', spellcheck: 'false', autocorrect: 'off', autocapitalize: 'off' }),
        EditorView.updateListener.of((u) => { if (u.docChanged && !quiet && opts.onChange) opts.onChange(u.state.doc.toString()); })
      ]
    })
  });
  return {
    view,
    getDoc: () => view.state.doc.toString(),
    setDoc(text) {
      quiet = true;
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text }, selection: { anchor: 0 } });
      quiet = false;
    },
    setLanguage(k) { code = k; view.dispatch({ effects: [lang.reconfigure((MODES[k] || python)()), unit.reconfigure(unitExt())] }); },
    setTheme(t) { view.dispatch({ effects: theme.reconfigure(themeFor(t)) }); },
    setPrefs(p) {
      const was = prefs;
      prefs = clean(p);
      const fx = [];
      if (was.vim !== prefs.vim) fx.push(modal.reconfigure(prefs.vim ? vim({ status: true }) : []));
      if (was.wrap !== prefs.wrap) fx.push(wrap.reconfigure(prefs.wrap ? EditorView.lineWrapping : []));
      if (was.relative !== prefs.relative) fx.push(nums.reconfigure(prefs.relative ? relativeNumbers : lineNumbers()));
      if (was.brackets !== prefs.brackets) fx.push(brackets.reconfigure(bracketExt()));
      if (was.autocomplete !== prefs.autocomplete) fx.push(complete.reconfigure(completeExt()));
      if (was.tabSize !== prefs.tabSize) fx.push(unit.reconfigure(unitExt()));
      if (was.fontSize !== prefs.fontSize) fx.push(size.reconfigure(sizeExt()));
      if (fx.length) view.dispatch({ effects: fx });
    },
    focus: () => view.focus(),
    destroy: () => view.destroy()
  };
}

export { create };
