// dsaviz site runtime: renders the page templates with React, without eval.
(function () {
  const e = React.createElement;
  const HOLE = /\{\{\s*([\w.$]+)\s*\}\}/g;
  const EVENTS = { onclick: 'onClick', onchange: 'onChange', onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave', ontouchstart: 'onTouchStart', oninput: 'onInput', onkeydown: 'onKeyDown', onsubmit: 'onSubmit', onfocus: 'onFocus', onblur: 'onBlur', ondragstart: 'onDragStart', ondragover: 'onDragOver', ondrop: 'onDrop', ondragend: 'onDragEnd' };
  const HTML_ATTR = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', maxlength: 'maxLength', readonly: 'readOnly', colspan: 'colSpan', rowspan: 'rowSpan', autocomplete: 'autoComplete', spellcheck: 'spellCheck' };
  const BOOL = new Set(['disabled', 'checked', 'selected', 'readonly', 'required', 'multiple', 'hidden']);
  const VOID = new Set(['input', 'img', 'br', 'hr', 'meta', 'link', 'source', 'area', 'col', 'wbr']);
  const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  // ---------- template compile ----------
  function parts(str) {
    const out = []; let last = 0; let m;
    HOLE.lastIndex = 0;
    while ((m = HOLE.exec(str))) { if (m.index > last) out.push(str.slice(last, m.index)); out.push({ path: m[1] }); last = m.index + m[0].length; }
    if (last < str.length) out.push(str.slice(last));
    return out;
  }
  function compile(node) {
    if (node.nodeType === 3) {
      const t = node.nodeValue;
      if (!t.trim() && t.indexOf('\n') >= 0) return null;
      return { k: 'text', parts: parts(t) };
    }
    if (node.nodeType !== 1) return null;
    const tag = node.localName;
    if (tag === 'helmet') return null;
    const kids = [];
    for (const c of node.childNodes) { const d = compile(c); if (d) kids.push(d); }
    if (tag === 'sc-for') return { k: 'for', list: parts(node.getAttribute('list') || ''), as: node.getAttribute('as') || 'item', kids };
    if (tag === 'sc-if') return { k: 'if', value: parts(node.getAttribute('value') || ''), kids };
    const svg = node.namespaceURI === 'http://www.w3.org/2000/svg';
    const attrs = [];
    for (const a of node.attributes) {
      if (a.name.startsWith('hint-')) continue;
      attrs.push({ name: a.name, parts: parts(a.value) });
    }
    return { k: 'el', tag: svg ? node.tagName : tag, svg, attrs, kids };
  }

  // ---------- render ----------
  function look(scope, path) {
    const ps = path.split('.');
    let v = scope[ps[0]];
    for (let i = 1; i < ps.length; i++) { if (v == null) return undefined; v = v[ps[i]]; }
    return v;
  }
  function value(p, scope) {
    if (p.length === 1 && typeof p[0] === 'object') return look(scope, p[0].path);
    let s = '';
    for (const x of p) { if (typeof x === 'string') s += x; else { const v = look(scope, x.path); s += v == null ? '' : String(v); } }
    return s;
  }
  function splitStyle(css) {
    const out = []; let depth = 0, q = null, cur = '';
    for (const ch of css) {
      if (q) { if (ch === q) q = null; cur += ch; continue; }
      if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ';' && depth === 0) { out.push(cur); cur = ''; continue; }
      cur += ch;
    }
    if (cur.trim()) out.push(cur);
    return out;
  }
  function styleObj(css) {
    const o = {};
    for (const decl of splitStyle(css)) {
      const i = decl.indexOf(':'); if (i < 0) continue;
      let prop = decl.slice(0, i).trim(); const val = decl.slice(i + 1).trim();
      if (!prop || !val) continue;
      if (!prop.startsWith('--')) { prop = prop.toLowerCase(); if (prop.startsWith('-webkit-')) prop = 'Webkit' + camel(prop.slice(8)).replace(/^./, (c) => c.toUpperCase()); else if (prop.startsWith('-moz-')) prop = 'Moz' + camel(prop.slice(5)).replace(/^./, (c) => c.toUpperCase()); else prop = camel(prop); }
      o[prop] = val;
    }
    return o;
  }
  const truthy = (v) => !(v === false || v == null || v === '' || v === 0 || v === 'false');
  function renderList(kids, scope) {
    const out = [];
    kids.forEach((k, i) => { const r = render(k, scope, i); if (r !== null && r !== undefined) out.push(r); });
    return out;
  }
  function render(d, scope, key) {
    if (d.k === 'text') { const v = value(d.parts, scope); return v == null ? '' : typeof v === 'object' ? '' : String(v); }
    if (d.k === 'if') return truthy(value(d.value, scope)) ? e(React.Fragment, { key }, ...renderList(d.kids, scope)) : null;
    if (d.k === 'for') {
      const list = value(d.list, scope);
      if (!Array.isArray(list)) return null;
      return e(React.Fragment, { key }, ...list.map((item, i) => { const s = Object.create(scope); s[d.as] = item; s.$index = i; return e(React.Fragment, { key: i }, ...renderList(d.kids, s)); }));
    }
    const props = { key };
    let userClick = null, href = null, hasChange = false, valueAttr;
    for (const a of d.attrs) {
      const n = a.name.toLowerCase();
      if (EVENTS[n]) { const fn = value(a.parts, scope); if (typeof fn === 'function') { if (n === 'onclick') userClick = fn; else { props[EVENTS[n]] = fn; if (n === 'onchange') hasChange = true; } } continue; }
      if (n === 'ref') { const r = value(a.parts, scope); if (typeof r === 'function') props.ref = r; continue; }
      const v = value(a.parts, scope);
      if (n === 'style') { props.style = styleObj(String(v == null ? '' : v)); continue; }
      if (BOOL.has(n)) { props[n === 'readonly' ? 'readOnly' : n] = truthy(v); continue; }
      if (n === 'value' && (d.tag === 'input' || d.tag === 'textarea' || d.tag === 'select')) { valueAttr = v == null ? '' : String(v); continue; }
      if (n === 'href' && d.tag === 'a') { href = v == null ? '' : String(v); continue; }
      if (n.startsWith('aria-') || n.startsWith('data-')) { props[n] = v == null ? '' : String(v); continue; }
      if (d.svg) { props[n === 'viewbox' ? 'viewBox' : n.includes(':') ? n : camel(a.name)] = v; continue; }
      props[HTML_ATTR[n] || n] = v;
    }
    if (valueAttr !== undefined) { if (hasChange) props.value = valueAttr; else props.defaultValue = valueAttr; }
    if (d.tag === 'a' && href !== null) {
      // A board link may carry a query (Code.dc.html?problem=two-sum): it becomes ?problem=two-sum#Code.
      const m = /^([A-Za-z]+\.dc\.html)(\?[^#]*)?$/.exec(href);
      const board = m ? m[1] : null, query = m && m[2] ? m[2] : '';
      if (board) props.href = query + '#' + board.replace('.dc.html', '');
      else { props.href = href; if (/^https?:/i.test(href)) { props.target = '_blank'; props.rel = 'noopener'; } }
      props.onClick = (ev) => {
        if (userClick) userClick(ev);
        if (board) { ev.preventDefault(); window.__dsNav(board, query); }
      };
    } else if (userClick) props.onClick = userClick;
    if (VOID.has(d.tag)) return e(d.tag, props);
    return e(d.tag, props, ...renderList(d.kids, scope));
  }

  // ---------- component host ----------
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; this.__host = null; }
    setState(u, cb) {
      const next = typeof u === 'function' ? u(this.state, this.props) : u;
      if (next) Object.assign(this.state, next);
      if (this.__host && this.__host.__mounted) this.__host.forceUpdate(cb);
    }
    forceUpdate() { if (this.__host && this.__host.__mounted) this.__host.forceUpdate(); }
    componentDidMount() {} componentWillUnmount() {} componentDidUpdate() {}
    renderVals() { return {}; }
  }
  const classes = {};
  function boardClass(name) {
    if (!classes[name]) classes[name] = window.DS_BOARDS[name].factory(DCLogic, DCLogic, React);
    return classes[name];
  }
  const trees = {};
  function boardTree(name) {
    if (!trees[name]) {
      const doc = new DOMParser().parseFromString('<!doctype html><html><body><x-dc>' + window.DS_BOARDS[name].template + '</x-dc></body></html>', 'text/html');
      const root = doc.querySelector('x-dc');
      trees[name] = [];
      for (const c of root.childNodes) { const d = compile(c); if (d) trees[name].push(d); }
    }
    return trees[name];
  }
  class Host extends React.Component {
    constructor(p) {
      super(p);
      const C = boardClass(p.name);
      this.logic = new C(Object.assign({}, window.DS_BOARDS[p.name].defaults));
      this.logic.__host = this;
    }
    componentDidMount() { this.__mounted = true; this.__phone = () => this.forceUpdate(); window.addEventListener('ds-phone', this.__phone); try { this.logic.componentDidMount(); } catch (err) { console.error(err); } }
    componentWillUnmount() { this.__mounted = false; window.removeEventListener('ds-phone', this.__phone); try { this.logic.componentWillUnmount(); } catch (err) { console.error(err); } }
    render() {
      let vals;
      try { vals = this.logic.renderVals(); } catch (err) { console.error(err); return e('pre', { style: { padding: 24 } }, 'This page hit an error: ' + err.message); }
      return e(React.Fragment, null, ...renderList(boardTree(this.props.name), vals || {}));
    }
  }
  function pageFromHash() {
    const h = (location.hash || '').slice(1);
    return window.DS_BOARDS[h + '.dc.html'] ? h + '.dc.html' : null;
  }
  class App extends React.Component {
    constructor(p) { super(p); this.state = { page: pageFromHash() || 'Main.dc.html' }; }
    componentDidMount() {
      window.__dsNav = (name, query) => {
        if (!window.DS_BOARDS[name]) return;
        // Set the URL first so the new page reads its query (?problem=...) when it mounts; a plain link clears it.
        try { history.pushState(null, '', location.pathname + (query || '') + '#' + name.replace('.dc.html', '')); } catch (err) { try { location.hash = name.replace('.dc.html', ''); } catch (e2) {} }
        // A visit counter in the key remounts the page even when a link (or a search result) points at the page
        // already showing, so it re-reads what to open from localStorage.
        this.setState({ page: name, visit: (this.state.visit || 0) + 1 });
        window.scrollTo(0, 0);
      };
      const sync = () => { const p = pageFromHash(); if (p && p !== this.state.page) { this.setState({ page: p }); window.scrollTo(0, 0); } };
      window.addEventListener('hashchange', sync);
      window.addEventListener('popstate', sync);
    }
    render() { return e(Host, { key: this.state.page + ':' + (this.state.visit || 0), name: this.state.page }); }
  }

  // ---------- page chrome: fonts, fit to screen, background ----------
  const seen = new Set();
  for (const name of Object.keys(window.DS_BOARDS)) {
    const tmp = document.createElement('div');
    tmp.innerHTML = window.DS_BOARDS[name].helmet || '';
    for (const el of [...tmp.children]) { const k = el.outerHTML; if (seen.has(k)) continue; seen.add(k); document.head.appendChild(el); }
  }
  // Pages are laid out at 1440px and zoomed to fit. A page can declare another layout width with
  // data-fit on its root (the Git page uses a 420px stacked layout on phones). A page whose root
  // carries data-fluid has its own phone layout below 760px and is shown there at zoom 1: the problem
  // page styles itself, the other pages use the shared rules in shared/ui/phone.html (root data-page).
  function fit() {
    const r = document.querySelector('#app > div');
    const w = (r && Number(r.getAttribute('data-fit'))) || 1440;
    const fluid = r && r.hasAttribute('data-fluid') && window.innerWidth < 760;
    const z = fluid ? 1 : Math.max(0.25, Math.min(1.6, window.innerWidth / w));
    // Runtime phone flag: html[data-phone] while a fluid page shows its phone layout. Pages read it
    // with dsPhone() (shared/ui.js); crossing 760px re-renders the open page.
    const de = document.documentElement;
    if (de.hasAttribute('data-phone') !== !!fluid) { if (fluid) de.setAttribute('data-phone', ''); else de.removeAttribute('data-phone'); window.dispatchEvent(new Event('ds-phone')); }
    if (document.documentElement.style.zoom !== String(z)) document.documentElement.style.zoom = z;
    // The pill nav and the menu read --fit to stay at real size on phones (see shared/ui/nav.html).
    if (document.documentElement.style.getPropertyValue('--fit') !== String(z)) document.documentElement.style.setProperty('--fit', String(z));
    // Text scale (--ts, read by every var(--fsN) size in shared/ui/type.html): the reader's Text size setting,
    // times a lift that undoes up to 15% of the fit zoom, so a 1280px laptop reads the same sizes as 1440px.
    let pick = 1;
    try { pick = { large: 1.15, xl: 1.3 }[window.localStorage.getItem('dsaviz-text-size')] || 1; } catch (e) {}
    const ts = String(Math.round(pick * Math.min(1.15, Math.max(1, 1 / z)) * 1000) / 1000);
    if (de.style.getPropertyValue('--ts') !== ts) de.style.setProperty('--ts', ts);
  }
  function paint() {
    fit();
    const r = document.querySelector('#app > div');
    if (!r) return;
    const bg = getComputedStyle(r).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)') { document.documentElement.style.background = bg; document.body.style.background = bg; }
  }
  // "i" explainers: put a .ds-tip's tooltip just under its button, kept inside the screen (shared/ui/phone.html).
  function placeTip(ev) {
    const tip = ev.target && ev.target.closest ? ev.target.closest('.ds-tip') : null;
    if (!tip) return;
    const note = tip.querySelector('[role="tooltip"]'), btn = tip.querySelector('button');
    if (!note || !btn) return;
    const z = parseFloat(document.documentElement.style.zoom) || 1;
    const r = btn.getBoundingClientRect();
    note.style.display = 'block';
    const w = note.offsetWidth, h = note.offsetHeight;
    note.style.display = '';
    const W = window.innerWidth / z, H = window.innerHeight / z;
    let left = r.left / z - 8, top = r.bottom / z + 6;
    if (left + w > W - 8) left = W - 8 - w;
    if (top + h > H - 8) top = r.top / z - 6 - h;
    note.style.left = Math.max(8, left) + 'px'; note.style.top = Math.max(8, top) + 'px';
  }
  document.addEventListener('mouseover', placeTip); document.addEventListener('focusin', placeTip);
  fit(); window.addEventListener('resize', fit); window.addEventListener('ds-text', fit); setInterval(paint, 400);
  try { new MutationObserver(fit).observe(document.getElementById('app'), { childList: true }); } catch (e) {}
  ReactDOM.createRoot(document.getElementById('app')).render(e(App));
})();
