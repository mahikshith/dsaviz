// @@APPROACH-PANE@@ — generated block (from shared/approach_pane.js): the facts block and the approaches pane.
// Markup: shared/ui/facts.html (holes under {{fx.*}}) and shared/ui/approaches.html (holes under {{ap.*}}).
// A page uses them like this:
//   constructor:   this.approaches = new ApproachPane(this, problemId, { lang: () => this.runner.s.lang });
//   renderVals:    fx: factsVals(t, problemId), ap: this.approaches.vals(t)
//   new problem:   this.approaches.setProblem(id)
// The pane starts folded (the solutions are spoilers). It shows the approach in the language the page's
// code pane uses when that is JavaScript or Python, and in JavaScript otherwise.
// Needs the @@FACTS@@ and @@APPROACHES@@ blocks.

// The facts block: input, output, constraints and the target, for any problem with facts.
// wide: two pairs side by side (input and constraints, then output and target), for a wide column.
function factsVals(t, id, wide) {
  const f = typeof problemFacts === 'function' ? problemFacts(id) : null;
  const cols = wide ? '64px minmax(0, 1fr) 96px minmax(0, 1fr)' : '96px minmax(0, 1fr)';
  const areas = wide ? '"il iv cl cv" "ol ov al av"' : '"il iv" "ol ov" "cl cv" "al av"';
  if (!f) return { has: false, cols, areas, hasCons: false, hasAim: false, input: '', output: '', cons: [], aim: '', aimLabel: '', note: '', hasNote: false };
  const aim = f.aim.replace(/^Aim for /, '');
  return {
    has: true, cols, areas, input: f.input, output: f.output,
    hasCons: f.cons.length > 0, cons: f.cons.map((c) => ({ c })),
    hasAim: !!f.aim, aim, aimLabel: f.aim, note: f.note, hasNote: !!f.note
  };
}

const APPROACH_KEY = 'dsaviz-approach-open';
class ApproachPane {
  constructor(host, pid, opts) {
    this.host = host;
    this.opts = opts || {};
    this.pid = pid;
    this.s = { open: false, tier: 0, copied: false };
    try { this.s.open = window.localStorage.getItem(APPROACH_KEY + ':' + pid) === '1'; } catch (e) {}
  }
  set(patch) { Object.assign(this.s, patch); this.host.setState({}); }
  setProblem(pid) {
    this.pid = pid;
    let open = false;
    try { open = window.localStorage.getItem(APPROACH_KEY + ':' + pid) === '1'; } catch (e) {}
    this.set({ open, tier: 0, copied: false });
  }
  list() { return (typeof APPROACHES !== 'undefined' && APPROACHES[this.pid]) || null; }
  toggle() {
    const open = !this.s.open;
    try { if (open) window.localStorage.setItem(APPROACH_KEY + ':' + this.pid, '1'); else window.localStorage.removeItem(APPROACH_KEY + ':' + this.pid); } catch (e) {}
    this.set({ open });
    // Bring the opened pane into view: on the Code page it sits low in a scrolling column.
    if (open) setTimeout(() => {
      try {
        const el = document.getElementById('ap-head');
        const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start', behavior: calm ? 'auto' : 'smooth' });
      } catch (e) {}
    }, 0);
  }
  pick(i) { this.set({ tier: i, copied: false }); }
  // Arrow keys move between the tier tabs, as tabs should.
  key(e) {
    const list = this.list();
    if (!list || !e) return;
    const n = list.length;
    let i = this.s.tier;
    if (e.key === 'ArrowRight') i = (i + 1) % n;
    else if (e.key === 'ArrowLeft') i = (i + n - 1) % n;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = n - 1;
    else return;
    if (e.preventDefault) e.preventDefault();
    this.pick(i);
    setTimeout(() => { try { const el = document.getElementById('ap-tab-' + i); if (el) el.focus(); } catch (er) {} }, 0);
  }
  shownLang(a) {
    const lang = this.opts.lang ? this.opts.lang() : 'js';
    return lang === 'py' && a.py ? 'py' : 'js';
  }
  copy(text) {
    try { if (navigator.clipboard) navigator.clipboard.writeText(text); } catch (e) {}
    this.set({ copied: true });
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.set({ copied: false }), 1500);
  }
  vals(t) {
    const list = this.list();
    if (!list) return { has: false, open: false, closed: false, tabs: [], count: '' };
    const tiers = approachTiers(list.length);
    const k = Math.min(this.s.tier, list.length - 1), a = list[k];
    const shown = this.shownLang(a);
    const lang = this.opts.lang ? this.opts.lang() : 'js';
    const code = shown === 'py' ? a.py : a.js;
    return {
      has: true, open: this.s.open, closed: !this.s.open, openX: this.s.open ? 'true' : 'false',
      toggle: () => this.toggle(), toggleLabel: this.s.open ? 'Hide approaches' : 'Show approaches',
      count: list.length + ' ways, slow to fast',
      tabs: list.map((x, i) => {
        const on = i === k;
        return {
          label: tiers[i], n: String(i + 1), on, sel: on ? 'true' : 'false', tabId: 'ap-tab-' + i, tabIndex: on ? '0' : '-1',
          bar: on ? t.accent : 'transparent', fg: on ? t.text : t.muted, pick: () => this.pick(i)
        };
      }),
      onKey: (e) => this.key(e),
      tier: tiers[k], panelLabel: 'ap-tab-' + k,
      name: a.name, idea: a.idea, time: a.time, space: a.space, why: a.why,
      slow: !!a.slow, best: k === list.length - 1,
      code, codeLang: shown === 'py' ? 'Python' : 'JavaScript',
      codeNote: lang !== 'js' && lang !== 'py' ? 'Shown in JavaScript. Approaches are written in JavaScript and Python.' : lang === 'py' && !a.py ? 'Shown in JavaScript: this one has no Python version yet.' : '',
      hasCodeNote: (lang !== 'js' && lang !== 'py') || (lang === 'py' && !a.py),
      pitfalls: a.pitfalls.map((p) => ({ p })),
      copy: () => this.copy(code), copyLabel: this.s.copied ? 'Copied' : 'Copy code',
      tagBg: a.slow ? t.warnBg : t.okBg, tagFg: t.text
    };
  }
}
// @@END-APPROACH-PANE@@
