// CodeMirror 6 editor for the Code page. Bundled by scripts/build_editor.js into one IIFE
// (global DSEditor) that build_site.py wraps in a function, so it is only parsed lazily and
// only runs when the Code page asks for it.
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, drawSelection } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { indentOnInput, bracketMatching, syntaxHighlighting, HighlightStyle, indentUnit } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { tags } from '@lezer/highlight';

const MODES = { py: python, js: javascript, java, cpp, go };
const UNITS = { py: '    ', js: '  ', java: '    ', cpp: '    ', go: '    ' };

// t: theme tokens from THEMES (codeBg, line, text, muted, accent, right, medFg, ok, hl, mono)
function themeFor(t) {
  const dark = !/^#F|^#E/i.test(t.codeBg || '#000');
  const view = EditorView.theme({
    '&': { backgroundColor: t.codeBg, color: t.text, height: '100%', fontSize: '14px' },
    '.cm-scroller': { fontFamily: t.mono, lineHeight: '1.65', fontVariantLigatures: 'none' },
    '.cm-content': { caretColor: t.accent, padding: '12px 0' },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: t.accent, borderLeftWidth: '2px' },
    '&.cm-focused': { outline: 'none', boxShadow: 'inset 0 0 0 2px ' + t.accent },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: t.hl + ' !important' },
    '.cm-gutters': { backgroundColor: t.codeBg, color: t.muted, border: 'none', borderRight: '1px solid ' + t.line },
    '.cm-lineNumbers .cm-gutterElement': { padding: '0 12px 0 14px' },
    '.cm-activeLine': { backgroundColor: 'rgba(255,255,255,0.03)' },
    '.cm-activeLineGutter': { backgroundColor: 'transparent', color: t.text },
    '&.cm-focused .cm-matchingBracket': { backgroundColor: 'transparent', outline: '1px solid ' + t.accent }
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

function create(parent, opts) {
  const lang = new Compartment(), theme = new Compartment(), unit = new Compartment();
  let quiet = false;
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: opts.doc || '',
      extensions: [
        lineNumbers(), highlightActiveLineGutter(), highlightActiveLine(), drawSelection(),
        history(), indentOnInput(), bracketMatching(), closeBrackets(),
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, indentWithTab]),
        EditorState.tabSize.of(4),
        unit.of(indentUnit.of(UNITS[opts.lang] || '    ')),
        lang.of((MODES[opts.lang] || python)()),
        theme.of(themeFor(opts.theme)),
        EditorView.contentAttributes.of({ 'aria-label': 'Code editor', spellcheck: 'false', autocorrect: 'off', autocapitalize: 'off' }),
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
    setLanguage(k) { view.dispatch({ effects: [lang.reconfigure((MODES[k] || python)()), unit.reconfigure(indentUnit.of(UNITS[k] || '    '))] }); },
    setTheme(t) { view.dispatch({ effects: theme.reconfigure(themeFor(t)) }); },
    focus: () => view.focus(),
    destroy: () => view.destroy()
  };
}

export { create };
