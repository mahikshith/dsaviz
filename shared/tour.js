// First-visit guided tour. Runs once for the whole site (scripts/build_site.py adds it after the runtime, with the card
// markup from shared/ui/tour.html as window.DS_TOUR_HTML). Five steps over five pages; each one lights a single real
// element (marked data-tour="..." in its page) and says one short sentence of 18 words or fewer.
// Shown once on the first visit to Home (localStorage dsaviz-tour-done); the menu's "Take the tour" opens it again.
(function () {
  if (window.__dsTour) return;
  const KEY = 'dsaviz-tour-done';
  const STEPS = [
    { page: 'Home', sel: '[data-tour="today"]', text: 'Today lists three small steps. Do them and your streak grows.' },
    { page: 'Home', sel: '[data-tour="path"]', text: 'New to code? Start here teaches programming from zero, one short lesson at a time.' },
    { page: 'ConceptLesson', sel: '[data-tour="controls"]', text: 'Press Play to watch a lesson run. Next steps through it at your own pace.' },
    { page: 'Sheet', sel: '[data-tour="filter"]', text: 'Filter the sheet by level, status, pattern or company to find a problem.' },
    { page: 'Snapshot', sel: '[data-tour="snapshot"]', text: 'Snapshot recaps every lesson on one page. Complexity, linked here, explains the cost tables.' }
  ];
  // surface, text, muted, line, accent, text on accent (the same values as THEMES in shared/themes_common.js)
  const PALETTE = {
    max: ['#151518', '#F5F5F7', '#8E8E93', '#34343C', '#C5F04A', '#0A0A0A'],
    paper: ['#FFFDF8', '#1D1B18', '#6B645A', '#D8CDB9', '#C2521F', '#FFFDF8'],
    ink: ['#181B21', '#ECE9E2', '#9A9EA8', '#3A3F4A', '#F5A06E', '#111317'],
    field: ['#111910', '#C9EBB4', '#7F9C70', '#2E4228', '#9FE870', '#0C110B']
  };
  let root = null, spot, card, txt, count, bSkip, bBack, bNext;
  let active = false, idx = 0, token = 0, timer = 0, opener = null;

  // Storage may be blocked: then read as "done", so the tour never nags on every visit.
  const read = (k) => { try { return window.localStorage.getItem(k); } catch (e) { return '1'; } };
  const write = (k, v) => { try { window.localStorage.setItem(k, v); } catch (e) {} };
  const pageName = () => (location.hash || '#Main').slice(1) || 'Main';

  function build() {
    if (root) return;
    const host = document.createElement('div');
    host.innerHTML = window.DS_TOUR_HTML || '';
    for (const el of [...host.children]) document.body.appendChild(el);
    root = document.querySelector('[data-tour-root]');
    spot = root.querySelector('[data-tour-spot]'); card = root.querySelector('[data-tour-card]');
    txt = root.querySelector('[data-tour-text]'); count = root.querySelector('[data-tour-count]');
    bSkip = root.querySelector('[data-tour-skip]'); bBack = root.querySelector('[data-tour-back]'); bNext = root.querySelector('[data-tour-next]');
    bSkip.addEventListener('click', () => finish());
    bBack.addEventListener('click', () => { if (idx > 0) go(idx - 1); });
    bNext.addEventListener('click', () => { if (idx < STEPS.length - 1) go(idx + 1); else finish(); });
    document.addEventListener('keydown', (ev) => {
      if (active && ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); finish(); }
    }, true);
    window.addEventListener('resize', () => { if (active) place(); });
    window.addEventListener('scroll', () => { if (active) place(); }, true);
  }

  // The reader's theme colours and font, so the card belongs to the page.
  function theme() {
    const key = read('dsaviz-theme') || 'max';
    const p = PALETTE[key] || PALETTE.max;
    const s = root.style;
    s.setProperty('--tour-surface', p[0]); s.setProperty('--tour-text', p[1]); s.setProperty('--tour-muted', p[2]);
    s.setProperty('--tour-line', p[3]); s.setProperty('--tour-accent', p[4]); s.setProperty('--tour-on', p[5]);
    s.setProperty('--tour-ring', p[4]);
    s.setProperty('--tour-dim', key === 'paper' ? 'rgba(29,27,24,.55)' : 'rgba(0,0,0,.62)');
    const r = document.querySelector('#app > div');
    if (r) s.setProperty('--tour-font', getComputedStyle(r).fontFamily);
  }

  function target() {
    const el = document.querySelector(STEPS[idx].sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.width && r.height ? { el, r } : null;
  }

  // Put the spotlight round the element and the card where it does not cover it.
  function place() {
    if (!root || root.hidden) return;
    const W = window.innerWidth, H = window.innerHeight, phone = W < 760;
    root.style.width = W + 'px'; root.style.height = H + 'px';
    const cw = Math.min(340, W - 32);
    card.style.width = cw + 'px';
    const ch = card.getBoundingClientRect().height;
    const topM = phone ? 16 : 84, botM = phone ? 88 : 16;
    const t = STEPS[idx].page === pageName() ? target() : null;
    let top, left = (W - cw) / 2;
    if (!t) {
      spot.setAttribute('data-none', '');
      top = H - botM - ch;
    } else {
      const pad = 8, gap = 16;
      const sl = Math.max(4, t.r.left - pad), st = Math.max(4, t.r.top - pad);
      const sr = Math.min(W - 4, t.r.right + pad), sb = Math.min(H - 4, t.r.bottom + pad);
      spot.style.left = sl + 'px'; spot.style.top = st + 'px'; spot.style.width = (sr - sl) + 'px'; spot.style.height = (sb - st) + 'px';
      spot.removeAttribute('data-none');
      const below = sb + gap, above = st - gap - ch;
      if (below + ch <= H - botM) top = below;
      else if (above >= topM) top = above;
      else {
        // A tall target: park the card at the screen edge that covers less of it.
        const atTop = topM, atBot = H - botM - ch;
        const cover = (y) => Math.max(0, Math.min(sb, y + ch) - Math.max(st, y));
        top = cover(atTop) <= cover(atBot) ? atTop : atBot;
      }
      if (!phone) left = Math.max(16, Math.min(sl, W - cw - 16));
    }
    card.style.left = Math.round(left) + 'px'; card.style.top = Math.round(Math.max(8, top)) + 'px';
  }

  function show() {
    const s = STEPS[idx];
    const t = s.page === pageName() ? target() : null;
    if (t) { try { t.el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' }); } catch (e) {} }
    place();
    try { bNext.focus({ preventScroll: true }); } catch (e) {}
  }

  // Go to a step: move to its page if needed, wait for its element, then light it.
  function go(i) {
    idx = i;
    const my = ++token, s = STEPS[i];
    root.hidden = false;
    txt.textContent = s.text;
    count.textContent = 'Step ' + (i + 1) + ' of ' + STEPS.length;
    bBack.hidden = i === 0;
    bNext.textContent = i === STEPS.length - 1 ? 'Done' : 'Next';
    spot.setAttribute('data-none', '');
    if (pageName() !== s.page && typeof window.__dsNav === 'function') window.__dsNav(s.page + '.dc.html');
    let tries = 0;
    const wait = () => {
      if (my !== token || !active) return;
      if ((pageName() === s.page && target()) || ++tries > 40) { show(); return; }
      setTimeout(wait, 100);
    };
    place();
    wait();
  }

  function start() {
    build();
    if (active) return;
    active = true;
    opener = document.activeElement;
    write(KEY, '1');
    theme();
    go(0);
    clearInterval(timer);
    timer = setInterval(() => { if (active) place(); }, 300);
  }

  function finish() {
    if (!active) return;
    active = false; token++; clearInterval(timer);
    write(KEY, '1');
    root.hidden = true;
    try { if (opener && opener.isConnected && opener !== document.body) opener.focus({ preventScroll: true }); } catch (e) {}
    opener = null;
  }

  window.__dsTour = { start, finish, steps: STEPS.length };

  // First visit: wait for Home to be on screen with no menu or streak dialog over it, then begin.
  if (!read(KEY)) {
    const watch = setInterval(() => {
      if (read(KEY)) { clearInterval(watch); return; }
      if (pageName() !== 'Home' || document.querySelector('[data-daily],[data-drawer]') || !document.querySelector(STEPS[0].sel)) return;
      clearInterval(watch);
      start();
    }, 500);
  }
})();
