// @@UI@@ — generated block (from shared/ui.js): view models for the shared components.
// Markup lives in shared/ui/*.html; the build copies it between the STAT TILES, RINGS and MEDALS comment markers.
// Every builder takes the theme tokens `t` first, so all four themes work.
const ICONS = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  learn: 'M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z',
  sheet: 'M10 6h10M10 12h10M10 18h10M3.5 6l1.5 1.5 2.5-3M3.5 12l1.5 1.5 2.5-3M3.5 18l1.5 1.5 2.5-3',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
  git: 'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9',
  design: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  ai: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  flame: 'M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-3 1.8-4.6 2.4-7.2C11 7.3 12 9 12 11c1-1.4 1-5 0-9z',
  check: 'M5 12l5 5L20 7',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  story: 'M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z',
  lock: 'M7 11h10v9H7zM9 11V8a3 3 0 0 1 6 0v3',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0'
};
// Filled icons; the rest are stroked.
const ICON_FILLED = { flame: 1, bolt: 1 };
// Medal metals (light, mid, shadow) from the Gym Buddy spec. Theme-independent, like real metal.
const METALS = { bronze: ['#F2BE95', '#B97A4E', '#6E3F22'], silver: ['#F7F8FA', '#B8BCC6', '#62666F'], gold: ['#FFEAA8', '#E0B04A', '#8E6618'] };
const TIER_NAME = { bronze: 'Bronze', silver: 'Silver', gold: 'Gold' };
// True while the page shows its phone layout (below 760px; the runtime sets html[data-phone] and
// re-renders the page when it flips). Use it only for content changes; layout belongs in CSS.
function dsPhone() { try { return typeof document !== 'undefined' && document.documentElement.hasAttribute('data-phone'); } catch (e) { return false; } }
function tint(c, a) { return /^#[0-9a-f]{6}$/i.test(c) ? c + a : c; }
function iconVals(name, color) {
  const filled = !!ICON_FILLED[name];
  return { d: ICONS[name] || '', fill: filled ? color : 'none', stroke: filled ? 'none' : color };
}
// Reduced motion is read once; the CSS also turns animation off, this only drops the stagger delay.
function reducedMotion() { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }

// Stat tiles: icon box, big number, small unit, short label, optional 4px progress bar.
// items: [{ icon, color, value, unit, label, pct }] (pct 0-100 or null)
function statTiles(t, items) {
  const still = reducedMotion();
  return {
    cols: items.length,
    list: items.map((it, i) => Object.assign(iconVals(it.icon, it.color), {
      value: String(it.value), unit: it.unit || '', label: it.label, fg: it.color, box: tint(it.color, '22'),
      bar: it.pct != null, pct: Math.max(0, Math.min(100, Math.round(it.pct || 0))) + '%',
      delay: still ? '0ms' : i * 50 + 'ms'
    }))
  };
}

// Concentric progress rings, outermost first, a stroke/3 gap between them. A ring at zero hides its cap.
// rings: [{ label, value, pct, color }]
function ringSet(t, rings, size, stroke) {
  size = size || 152; stroke = stroke || 12;
  const c = size / 2;
  const gap = stroke / 3;
  const arcs = rings.map((r, i) => {
    const radius = c - stroke / 2 - i * (stroke + gap);
    const len = 2 * Math.PI * radius;
    const pct = Math.max(0, Math.min(100, r.pct || 0));
    return { r: radius.toFixed(2), len: len.toFixed(2), offset: (len * (1 - pct / 100)).toFixed(2), color: r.color, op: pct > 0 ? 1 : 0 };
  });
  return {
    size, c, stroke, arcs,
    legend: rings.map((r) => ({ label: r.label, value: r.value, color: r.color })),
    aria: rings.map((r) => r.label + ' ' + r.value).join(', '),
    empty: rings.every((r) => !r.pct)
  };
}

// Medal shelf: earned medals in metal, the next one outlined with an accent progress line, the rest locked.
// medals: DS.medals(...) output. fresh: keys that should shine once.
function medalShelf(t, medals, slots, fresh) {
  slots = slots || 8;
  const rank = { gold: 3, silver: 2, bronze: 1 };
  const open = medals.filter((m) => m.next).sort((a, b) => b.next.pct - a.next.pct || b.done - a.done);
  const next = open[0] || null;
  // The next medal sits on its own slot: when it upgrades an earned one, it shows that metal plus the progress line.
  const earned = medals.filter((m) => m.tier && m !== next).sort((a, b) => rank[b.tier] - rank[a.tier] || b.done - a.done);
  const locked = medals.filter((m) => !m.tier && m !== next);
  const total = medals.length * 3;
  const got = medals.reduce((s, m) => s + (m.tier ? rank[m.tier] : 0), 0);
  const freshSet = fresh || {};
  const items = [];
  const base = (m, i) => ({ gid: 'dsm-g' + i, cid: 'dsm-c' + i, mark: m.mark, label: m.pattern, pathLen: 100, progress: '0 100', showProgress: false, fresh: false, lock: false, showMark: true, sw: '1.5', dash: 'none', op: 1 });
  earned.forEach((m) => {
    if (items.length >= slots) return;
    const [c1, c2, c3] = METALS[m.tier];
    const fr = !!freshSet[m.key];
    items.push(Object.assign(base(m, items.length), { c1, c2, c3, fill: 'url(#dsm-g' + items.length + ')', stroke: c3, ink: '#2A1A0A',
      sub: TIER_NAME[m.tier], subFg: t.text2, fresh: fr, aria: m.pattern + ': ' + TIER_NAME[m.tier] + ' medal' + (fr ? ', just earned' : '') }));
  });
  if (next && items.length < slots) {
    const metal = next.tier ? METALS[next.tier] : null;
    items.push(Object.assign(base(next, items.length), { c1: metal ? metal[0] : t.sunk, c2: metal ? metal[1] : t.sunk, c3: metal ? metal[2] : t.sunk,
      fill: metal ? 'url(#dsm-g' + items.length + ')' : t.sunk, stroke: metal ? metal[2] : t.line2, ink: metal ? '#2A1A0A' : t.text,
      showProgress: true, progress: Math.max(2, next.next.pct) + ' 100', sub: next.next.have + ' of ' + next.next.need, subFg: t.accent,
      label: next.pattern, aria: (next.tier ? TIER_NAME[next.tier] + ' earned. ' : '') + 'Next: ' + TIER_NAME[next.next.tier] + ' in ' + next.pattern + ', ' + next.next.have + ' of ' + next.next.need + ' ' + next.next.unit }));
  }
  locked.forEach((m) => {
    if (items.length >= slots) return;
    items.push(Object.assign(base(m, items.length), { c1: t.bg, c2: t.bg, c3: t.bg, fill: 'transparent', stroke: t.line2, ink: t.faint, dash: '3 3',
      showMark: false, lock: true, sub: 'Locked', subFg: t.muted, aria: m.pattern + ': locked' }));
  });
  return {
    items, got, total, empty: got === 0,
    caption: got + ' of ' + total,
    nextLine: next ? TIER_NAME[next.next.tier] + ' · ' + next.pattern + ' · ' + next.next.have + ' of ' + next.next.need + ' ' + next.next.unit : 'Every medal earned'
  };
}
// @@END-UI@@
