const LANG_KEY = 'dsaviz-lang';
function sceneIdFor(p) { return p && SCENES[p.id] ? p.id : 'two-sum-ii'; }
// Deterministic shuffle so the "build it" puzzle is the same for everyone on the same story.
function shuffled(arr, seed) {
  const a = arr.slice();
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  for (let i = a.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  if (a.every((x, i) => x === arr[i]) && a.length > 1) [a[0], a[1]] = [a[1], a[0]];
  return a;
}
// Code lines may carry a third element naming the step kinds they serve ('fill|edge'); this builds the lines map from those tags.
function tagLines(code) {
  const out = {};
  Object.keys(code).forEach((lang) => { out[lang] = {}; code[lang].forEach(([, , tag], i) => { (tag || '').split('|').filter(Boolean).forEach((k) => { if (!out[lang][k]) out[lang][k] = i + 1; }); }); });
  return out;
}
const isBrace = (c) => /^[\s})\]]*$/.test(c) || /^\s*}\s*(else\s*{)?\s*$/.test(c);

class Component extends DCLogic {
  constructor(props) {
    super(props);
    let lang = 'py';
    try { const l = window.localStorage.getItem(LANG_KEY); if (LANGS.some(([k]) => k === l)) lang = l; } catch (e) {}
    const scene = sceneIdFor(loadProblem());
    this.state = { theme: loadTheme(), scene, step: 0, playing: false, lang, hints: 1, elapsed: 0, level: null, chapter: 2, pick: null, focus: null,
      predict: false, ask: false, guess: null, pRight: 0, pTotal: 0, spellMode: 'match', built: [], checked: null, saved: loadSaved().includes(scene), rated: null };
  }
  componentDidMount() {
    this.clock = setInterval(() => this.setState({ elapsed: this.state.elapsed + 1 }), 1000);
    listenTheme(this);
  }
  componentWillUnmount() { clearInterval(this.clock); clearInterval(this.timer); unlistenTheme(this); }
  steps() { return SCENES[this.state.scene].steps; }
  go(i) {
    const n = this.steps().length;
    const step = Math.max(0, Math.min(n - 1, i));
    this.setState({ step, ask: false, guess: null });
    if (step === n - 1) this.stop();
  }
  stop() { clearInterval(this.timer); this.timer = null; this.setState({ playing: false }); }
  play() {
    if (this.state.step === this.steps().length - 1) this.setState({ step: 0 });
    this.setState({ playing: true, ask: false, guess: null });
    clearInterval(this.timer);
    this.timer = setInterval(() => this.go(this.state.step + 1), 2400);
  }
  next() {
    this.stop();
    const n = this.steps().length;
    if (this.state.step >= n - 1) return;
    if (this.state.predict && !this.state.ask) { this.setState({ ask: true, guess: null }); return; }
    this.go(this.state.step + 1);
  }
  guessMove(key) {
    if (this.state.guess) return;
    const S = SCENES[this.state.scene];
    const nextKind = this.steps()[this.state.step + 1].kind;
    const want = (S.predictAlias && S.predictAlias[nextKind]) || nextKind;
    const right = key === want;
    this.setState({ guess: key, pRight: this.state.pRight + (right ? 1 : 0), pTotal: this.state.pTotal + 1 });
  }
  switchScene(id) {
    if (!SCENES[id]) return;
    this.stop();
    saveProblem(id);
    this.setState({ scene: id, step: 0, hints: 1, pick: null, focus: null, chapter: 2, elapsed: 0, ask: false, guess: null, built: [], checked: null, saved: loadSaved().includes(id), rated: null });
  }
  setLang(k) { try { window.localStorage.setItem(LANG_KEY, k); } catch (e) {} this.setState({ lang: k, built: [], checked: null }); }
  toggleSave() {
    const id = this.state.scene;
    const list = loadSaved().filter((x) => x !== id);
    if (!this.state.saved) list.push(id);
    storeSaved(list);
    this.setState({ saved: !this.state.saved });
  }
  rate(label, days) {
    const deck = loadDeck();
    deck[this.state.scene] = { due: days, rated: label };
    storeDeck(deck);
    this.setState({ rated: label });
  }
  spellLines() {
    const S = SCENES[this.state.scene];
    const code = S.code[this.state.lang] || S.code.py;
    return code.slice(1).map(([c]) => c).filter((c) => c.trim() && !isBrace(c));
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'paper';
    const t = Object.assign({}, THEMES[themeKey] || THEMES.paper, STORY_EXTRA[themeKey] || STORY_EXTRA.paper);
    const level = this.state.level || this.props.level || 'kid';
    const S = SCENES[this.state.scene];
    const P = PROBLEMS.find((p) => p.id === S.id);
    const kit = KIT[S.pattern];
    const steps = S.steps;
    const st = steps[Math.min(this.state.step, steps.length - 1)];
    const ch = this.state.chapter;
    const lines = S.lines[this.state.lang] || S.lines.py;
    const found = st.done;
    const pitch = S.pitch || 0, tileW = S.tile || 0;

    // ---- the row of things the cast walks along ----
    const cellLook = (state) => {
      const warm = 'hsl(' + t.hue + ',' + t.sat + '%,93%)';
      const L = {
        in: { fill: warm, ink: '#1D1B18', ring: 'transparent' },
        out: { fill: t.dead, ink: t.deadInk, ring: 'transparent', op: 0.6 },
        future: { fill: 'hsl(' + t.hue + ',20%,72%)', ink: '#1D1B18', ring: 'transparent', op: 0.5 },
        cur: { fill: warm, ink: '#1D1B18', ring: t.left, glow: '0 0 22px hsla(' + t.hue + ',95%,60%,0.45)', lift: 'translateY(-6px)' },
        hit: { fill: '#F9C9B6', ink: '#1D1B18', ring: t.left, glow: '0 0 22px rgba(240,122,95,0.55)', lift: 'translateY(-6px)', mark: '!', markColor: '#F5A06E' },
        dup: { fill: '#F9C9B6', ink: '#1D1B18', ring: t.left, op: 0.8, mark: 'seen', markColor: '#F5A06E' },
        ok: { fill: 'hsl(' + t.hue + ',60%,86%)', ink: '#1D1B18', ring: t.ok, mark: '✓', markColor: '#8EDDAE' },
        paint: { fill: warm, ink: '#1D1B18', ring: t.logoR, mark: '✎', markColor: t.logoR },
        stored: { fill: 'hsl(' + t.hue + ',45%,82%)', ink: '#1D1B18', ring: 'transparent', op: 0.75, mark: '✓', markColor: t.sceneMuted },
        buy: { fill: 'hsl(' + t.hue + ',40%,64%)', ink: '#1D1B18', ring: t.right },
        best: { fill: 'hsl(' + t.hue + ',40%,64%)', ink: '#1D1B18', ring: t.ok }
      };
      return L[state] || L.in;
    };
    let tiles = [];
    if (S.visual === 'lanterns') {
      tiles = S.items.map((v, i) => {
        const out = i < st.L || i > st.R, isL = i === st.L, isR = i === st.R;
        return {
          v, pos: i + 1,
          fill: out ? t.dead : 'hsl(' + t.hue + ',' + t.sat + '%,' + (95 - v * 2.8) + '%)',
          ink: out ? t.deadInk : '#1D1B18',
          glow: out ? 'none' : '0 0 ' + (8 + v * 3) + 'px hsla(' + t.hue + ',95%,60%,' + (0.18 + v * 0.045).toFixed(2) + ')',
          ring: found && (isL || isR) ? t.ok : isL ? t.left : isR ? t.right : 'transparent',
          op: out ? 0.55 : 1, strike: out ? 'line-through' : 'none'
        };
      });
    } else if (S.visual === 'letters' && st.cells) {
      tiles = S.items.map((c, i) => {
        const look = cellLook(st.cells[i]);
        return { v: c, fill: look.fill, ink: look.ink, ring: look.ring, glow: look.glow || 'none', lift: look.lift || 'none', op: look.op || 1, mark: look.mark || String(i), idxColor: look.markColor || t.sceneMuted };
      });
    } else if (S.visual === 'letters') {
      tiles = S.items.map((c, i) => {
        const done = i < st.L || i > st.R || (found);
        const isL = i === st.L, isR = i === st.R;
        const space = c === ' ';
        return {
          v: space ? '␣' : c,
          fill: space ? t.dead : done ? 'hsl(' + t.hue + ',60%,86%)' : 'hsl(' + t.hue + ',' + t.sat + '%,93%)',
          ink: space ? t.deadInk : '#1D1B18',
          ring: done && !space ? t.ok : isL ? t.left : isR ? t.right : 'transparent',
          glow: (isL || isR) && !found ? '0 0 22px hsla(' + t.hue + ',95%,60%,0.45)' : 'none',
          lift: (isL || isR) && !found ? 'translateY(-6px)' : 'none',
          mark: done && !space ? '✓' : String(i), idxColor: done && !space ? t.ok : t.sceneMuted
        };
      });
    } else {
      tiles = S.items.map((h, i) => {
        if (st.cells) {
          const look = cellLook(st.cells[i]);
          return { v: h, x: i * pitch, h: h * S.unit, fill: look.fill, ink: look.ink, ring: look.ring, op: look.op || 1 };
        }
        const out = i < st.L || i > st.R, isL = i === st.L, isR = i === st.R;
        return {
          v: h, x: i * pitch, h: h * S.unit,
          fill: out ? t.dead : 'hsl(' + t.hue + ',40%,' + (70 - h * 2) + '%)',
          ink: out ? t.deadInk : '#1D1B18',
          ring: found && (isL || isR) ? t.ok : isL ? t.left : isR ? t.right : 'transparent',
          op: out ? 0.5 : 1
        };
      });
    }
    // ---- the 2D grid: S.items (or st.vals) is rows of values, st.cells the matching rows of states ----
    let grid = { tiles: [], cols: [], rows: [], w: 0, h: 0, line: '', lineOp: 0, label: '', legend: [], hasLegend: false,
      actor: { left: 0, top: 0, size: 0, op: 0, initial: '', color: 'transparent', font: '10px' } };
    if (S.visual === 'grid') {
      const vals = st.vals || S.items, R = vals.length, C = vals[0].length;
      const gap = 6, padL = S.rowHeads ? 52 : 20, padT = 18;
      const maxW = (S.board ? 380 : 470) - padL, maxH = 214 - padT;
      const gp = Math.floor(Math.min(S.maxTile || 58, maxH / R, maxW / C)), size = gp - gap;
      const at = (r, c) => [padL + c * gp + size / 2, padT + r * gp + size / 2];
      const onPath = new Set((st.path || []).map(([r, c]) => r + ',' + c));
      grid.w = padL + C * gp - gap; grid.h = padT + R * gp - gap;
      grid.label = (S.gridLabel || 'Grid') + ', ' + R + ' rows by ' + C + ' columns. ' + st.verdict + (st.actorAt ? '. ' + ((STORY_CAST[S.cast] || {}).name || 'The guide') + ' is at row ' + st.actorAt[0] + ', column ' + st.actorAt[1] : '') + '.';
      grid.tiles = [];
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
        const look = Object.assign({}, cellLook(st.cells[r][c]));
        if (st.cells[r][c] === 'out') { look.ink = t.sceneMuted; look.op = 1; }
        const v = vals[r][c] == null ? '' : String(vals[r][c]);
        const mark = look.mark && look.mark.length <= 2 ? look.mark : '';
        const ring = onPath.has(r + ',' + c) && look.ring === 'transparent' ? t.path : look.ring;
        grid.tiles.push({ v, left: padL + c * gp, top: padT + r * gp, size, fill: look.fill, ink: look.ink, ring, op: look.op || 1, glow: look.glow || 'none',
          font: Math.max(12, Math.min(22, Math.round(size * (v.length > 2 ? 0.34 : 0.44)))) + 'px', mark, markColor: look.markColor || t.sceneMuted });
      }
      const heads = (list, n) => Array.from({ length: n }, (_, i) => (list ? String(list[i]) : String(i)));
      grid.cols = heads(S.colHeads, C).map((label, c) => ({ label, x: padL + c * gp, w: size }));
      grid.rows = heads(S.rowHeads, R).map((label, r) => ({ label, y: padT + r * gp, h: size, w: padL - 8 }));
      grid.line = (st.path || []).map(([r, c]) => at(r, c).join(',')).join(' ');
      grid.lineOp = (st.path || []).length > 1 ? 0.9 : 0;
      if (st.actorAt) {
        const a = Math.max(18, Math.min(22, Math.round(size * 0.5)));
        const who = STORY_CAST[S.cast] || { initial: '?', color: 'left' };
        grid.actor = { left: padL + st.actorAt[1] * gp - a * 0.55, top: padT + st.actorAt[0] * gp - a * 0.55, size: a, op: 1, initial: who.initial, color: t[who.color] || who.color, font: Math.round(a * 0.5) + 'px' };
      }
      grid.legend = (S.legend || []).map(([state, label]) => {
        if (state === 'path') return { label, fill: 'transparent', ring: t.path, mark: '' };
        const look = cellLook(state);
        return { label, fill: look.fill, ring: look.ring === 'transparent' ? 'rgba(255,255,255,0.18)' : look.ring, mark: look.mark && look.mark.length <= 2 ? look.mark : '' };
      });
      grid.hasLegend = grid.legend.length > 0;
    }
    const base = { v: '', pos: 0, fill: 'transparent', ink: t.text, glow: 'none', ring: 'transparent', op: 1, strike: 'none', lift: 'none', mark: '', idxColor: t.sceneMuted, x: 0, h: 0 };
    tiles = tiles.map((x) => Object.assign({}, base, x));
    const tiles2 = (S.items2 || []).map((c, i) => {
      const look = cellLook((st.cells2 || [])[i]);
      return Object.assign({}, base, { v: c, fill: look.fill, ink: look.ink, ring: look.ring, op: look.op || 1, mark: look.mark || String(i), idxColor: look.markColor || t.sceneMuted });
    });
    const water = S.water && !found
      ? { left: st.L * pitch + tileW / 2, width: (st.R - st.L) * pitch, height: Math.min(S.items[st.L], S.items[st.R]) * S.unit }
      : { left: 0, width: 0, height: 0 };
    // Wren's window frame
    const fr = st.frameAt || [st.L, st.R];
    const showFrame = S.cast === 'sw' && !st.noFrame;
    const frame = showFrame ? { left: fr[0] * pitch - 7, width: (fr[1] - fr[0]) * pitch + tileW + 14, op: 1 } : { left: 0, width: 0, op: 0 };
    // the ticket book / tally
    const board = (st.board || []).map(([k, v, flag]) => ({
      k, v,
      bg: flag === 'hit' ? 'rgba(111,207,151,0.18)' : flag === 'fresh' ? 'rgba(245,160,110,0.2)' : 'transparent',
      fg: flag === 'hit' ? '#8EDDAE' : flag === 'zero' ? t.sceneMuted : t.sceneText,
      border: flag === 'hit' ? '#6FCF97' : flag === 'fresh' ? '#F5A06E' : 'transparent'
    }));

    // ---- the cast ----
    const mouthSmile = 'M20 35 Q28 41 36 35', mouthFlat = 'M21 36 L35 36';
    const actorAt = (idx, o) => Object.assign({ x: idx * pitch + tileW / 2 - 28, eye: 3.2, mouth: mouthSmile, extra: '', extraFill: 'transparent', size: 40 }, o);
    let actors;
    if (S.visual === 'grid') {
      actors = [];
    } else if (S.cast === 'tp') {
      actors = [actorAt(st.L, { label: 'Lumi · L', color: t.left, rx: 25 }), actorAt(st.R, { label: 'Roo · R', color: t.right, rx: 14, mouth: found ? mouthSmile : mouthFlat })];
    } else if (S.cast === 'sw') {
      const lx = st.L === st.R ? -18 : 0;
      actors = [
        Object.assign(actorAt(st.L, { label: S.actorLabels[0], color: t.right, rx: 8, eye: 0, mouth: '', size: 26 }), { x: st.L * pitch + tileW / 2 - 28 + lx }),
        actorAt(st.R, { label: S.actorLabels[1], color: t.left, rx: 25, extra: 'M50 24 L58 28 L50 32 Z M10 30 Q2 22 8 16 Q14 22 14 30 Z', extraFill: t.sceneText })
      ];
    } else if (S.actorLabels.length > 1) {
      actors = [actorAt(st.L, { label: S.actorLabels[0], color: t.left, rx: 25 }), actorAt(st.R, { label: S.actorLabels[1], color: t.right, rx: 14, mouth: found ? mouthSmile : mouthFlat })];
    } else {
      actors = [actorAt(st.L, { label: S.actorLabels[0], color: t.left, rx: 18, extra: 'M12 14 L44 14 L40 2 L16 2 Z', extraFill: t.sceneText })];
    }

    const who = {
      lumi: { name: 'Lumi', initial: 'L', color: t.left, radius: '999px' },
      roo: { name: 'Roo', initial: 'R', color: t.right, radius: '9px' },
      wren: { name: 'Wren', initial: 'W', color: t.left, radius: '999px' },
      cleo: { name: 'Cleo', initial: 'C', color: t.left, radius: '10px' },
      hoot: { name: 'Old Hoot', initial: 'H', color: t.muted, radius: '6px' }
    };
    Object.keys(STORY_CAST).forEach((k) => { const c = STORY_CAST[k]; who[k] = Object.assign({}, c, { color: t[c.color] || c.color }); });
    const toneBg = { plain: t.sunk, warn: t.warnBg, cool: t.coolBg, ok: t.okBg };
    const toneBar = { plain: t.muted, warn: t.left, cool: t.right, ok: t.ok };
    const activeLine = ch === 2 ? lines[st.kind] || 0 : ch === 3 && this.state.focus ? lines[this.state.focus] || 0 : 0;
    const pill = (on) => ({ bg: on ? t.activeBg : 'transparent', fg: on ? t.activeFg : t.muted });
    const mm = String(Math.floor(this.state.elapsed / 60)).padStart(2, '0');
    const ss = String(this.state.elapsed % 60).padStart(2, '0');
    const family = SCENE_ORDER.filter((id) => SCENES[id].pattern === S.pattern);
    const nextId = family[(family.indexOf(S.id) + 1) % family.length];
    const others = PROBLEMS.filter((p) => p.pattern === S.pattern && p.id !== S.id).sort((a, b) => (!!SCENES[b.id] - !!SCENES[a.id]) || a.added - b.added).slice(0, 3);
    const quizRight = this.state.pick === kit.right;

    // ---- predict the next move ----
    const nextSt = steps[this.state.step + 1];
    const wanted = nextSt ? ((S.predictAlias && S.predictAlias[nextSt.kind]) || nextSt.kind) : '';
    const guessRight = this.state.guess === wanted;
    const predictOpts = S.rules.filter(([, k]) => k !== 'intro').map(([story, key]) => {
      const picked = this.state.guess === key, isAns = this.state.guess && key === wanted;
      return { story, key, bg: isAns ? t.okBg : picked ? t.warnBg : t.surface, border: isAns ? t.ok : picked ? t.accent : t.line, pick: () => this.guessMove(key) };
    });
    const wantedText = (S.rules.find(([, k]) => k === wanted) || [''])[0];

    // ---- build the spell (Parsons puzzle) ----
    const answer = this.spellLines();
    const pool = shuffled(answer.map((c, i) => i), S.id + this.state.lang).filter((i) => !this.state.built.includes(i));
    const checked = this.state.checked;
    const builtRows = this.state.built.map((i, pos) => {
      const bad = checked && checked.firstBad === pos;
      const good = checked && (checked.firstBad < 0 || pos < checked.firstBad);
      return { code: answer[i], n: pos + 2, bg: good ? t.okBg : bad ? t.warnBg : t.surface, border: good ? t.ok : bad ? t.accent : t.line, pick: () => this.setState({ built: this.state.built.filter((x) => x !== i), checked: null }) };
    });
    const poolRows = pool.map((i) => ({ code: answer[i].trim(), pick: () => this.setState({ built: this.state.built.concat([i]), checked: null }) }));
    const sig = (S.code[this.state.lang] || S.code.py)[0][0];

    const RATES = [['Again', 'tomorrow', 1], ['Hard', 'in 3 days', 3], ['Good', 'in a week', 7], ['Easy', 'in 3 weeks', 21]];

    return {
      t, themeBtns: themeButtons(this, themeKey, t),
      S, P, diffBg: t.diff[P.diff][1], diffFg: t.diff[P.diff][2],
      patternName: S.pattern,
      levels: LEVELS.map(([k, label]) => Object.assign({ label, on: level === k, pick: () => this.setState({ level: k }) }, pill(level === k))),
      langs: LANGS.map(([k, label]) => Object.assign({ label, on: this.state.lang === k, pick: () => this.setLang(k) }, pill(this.state.lang === k))),
      langName: LANGS.find(([k]) => k === this.state.lang)[1].replace('JS', 'JavaScript'),
      clock: mm + ':' + ss,
      saveLabel: this.state.saved ? 'Saved' : 'Save', saveIcon: this.state.saved ? '★' : '☆', saved: this.state.saved,
      toggleSave: () => this.toggleSave(),
      sceneTabs: family.map((id) => {
        const on = id === S.id;
        return { label: SCENES[id].short, on, border: on ? t.text : t.line2, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.text, pick: () => this.switchScene(id) };
      }),
      patternTabs: Object.keys(KIT).map((name) => {
        const on = name === S.pattern;
        const first = SCENE_ORDER.find((id) => SCENES[id].pattern === name);
        return { label: name, on, bg: on ? t.sunk : 'transparent', fg: on ? t.text : t.muted, pick: () => { if (!on) this.switchScene(first); } };
      }),
      chapters: CHAPTERS.map(([title, sub], i) => {
        const s2 = i < ch ? 'done' : i === ch ? 'now' : 'todo';
        return { title, sub: i === 1 ? kit.spot : sub, cur: i === ch ? 'step' : 'false', mark: s2 === 'done' ? '✓' : String(i + 1), bg: s2 === 'now' ? t.sunk : 'transparent', dotBg: s2 === 'done' ? t.ok : s2 === 'now' ? t.accent : t.sunk, dotFg: s2 === 'todo' ? t.muted : t.bg, pick: () => { this.stop(); this.setState({ chapter: i, ask: false }); } };
      }),
      chapterLabel: 'Chapter ' + (ch + 1) + ' · ' + CHAPTERS[ch][0],
      isQuest: ch === 0, isSpot: ch === 1, isWalk: ch === 2, isSpell: ch === 3, isSide: ch === 4,
      goCh2: () => this.setState({ chapter: 1 }), goCh3: () => this.setState({ chapter: 2 }), goCh5: () => this.setState({ chapter: 4 }),
      keepProblem: () => saveProblem(S.id),
      shownHints: S.hints.slice(0, this.state.hints), hintCount: this.state.hints, moreHints: this.state.hints < S.hints.length,
      revealHint: () => this.setState({ hints: Math.min(S.hints.length, this.state.hints + 1) }),
      isLanterns: S.visual === 'lanterns', isLetters: S.visual === 'letters', isPlanks: S.visual === 'planks', isGrid: S.visual === 'grid', showActors: S.visual !== 'grid', grid, sceneJustify: S.visual === 'grid' ? 'center' : 'flex-end',
      hasRow2: !!S.items2, rowLabels: S.rowLabels || ['', ''],
      tiles, tiles2, water, frame, showFrame,
      rowWidth: S.items.length * pitch - (pitch - tileW),
      tileW, tileH: S.tileH || 84, tileGap: pitch - tileW, tileFont: (S.font || 34) + 'px',
      hasBoard: !!S.board, boardTitle: S.boardTitle || '', board, boardEmpty: board.length === 0,
      boardPad: S.board ? 170 : 0,
      actors,
      statusText: found ? S.status[1] : S.status[0],
      statusColor: found ? t.ok : t.sceneMuted,
      meter: { text: st.meter.text, width: Math.max(0, Math.min(100, st.meter.pct)) + '%', markAt: Math.max(0, Math.min(100, st.meter.mark)) + '%', markLabel: st.meter.markLabel },
      meterColor: toneBar[st.tone], verdict: st.verdict, verdictBg: toneBg[st.tone],
      dialog: st.dialog.map(([k, text]) => Object.assign({ text }, who[k])),
      levelName: LEVELS.find(([k]) => k === level)[1],
      narration: st.nar[level],
      narFont: level === 'expert' ? t.mono : t.display,
      narSize: level === 'kid' ? '19px' : level === 'builder' ? '17px' : '14px',
      stepLabel: 'step ' + (this.state.step + 1) + ' / ' + steps.length,
      dots: steps.map((_, i) => ({ label: 'Go to step ' + (i + 1), bg: i <= this.state.step ? t.accent : t.sunk, pick: () => { this.stop(); this.go(i); } })),
      atStart: this.state.step === 0, atEnd: this.state.step === steps.length - 1,
      prev: () => { this.stop(); this.go(this.state.step - 1); },
      next: () => this.next(),
      restart: () => { this.stop(); this.go(0); },
      playing: this.state.playing, paused: !this.state.playing,
      playLabel: this.state.playing ? 'Pause' : 'Play',
      togglePlay: () => (this.state.playing ? this.stop() : this.play()),
      // predict mode
      predictOn: this.state.predict,
      predictBg: this.state.predict ? t.accent : 'transparent', predictFg: this.state.predict ? t.onAccent : t.text, predictBorder: this.state.predict ? t.accent : t.line,
      predictLabel: this.state.predict ? 'Predicting · ' + (this.state.pTotal ? this.state.pRight + '/' + this.state.pTotal : 'on') : 'Predict mode',
      togglePredict: () => this.setState({ predict: !this.state.predict, ask: false, guess: null }),
      predictScore: this.state.pTotal ? this.state.pRight + ' / ' + this.state.pTotal + ' right' : 'guess before each step',
      asking: this.state.ask && !!nextSt, notAsking: !(this.state.ask && nextSt),
      predictOpts, guessed: !!this.state.guess, guessRight,
      guessFeedback: !this.state.guess ? '' : guessRight ? 'Old Hoot: “Spot on. You’re thinking like the algorithm now.”' : 'Old Hoot: “Not this time. Next comes: ' + wantedText + '.”',
      guessBg: guessRight ? t.okBg : t.warnBg,
      reveal: () => this.go(this.state.step + 1),
      askTitle: 'What happens next?',
      // quest / spot
      exampleIn: S.example[0], exampleOut: S.example[1],
      clues: S.clues.map((c, i) => 'Clue ' + (i + 1) + ' · ' + c),
      spotAsk: kit.ask,
      quiz: (kit.quiz || QUIZ).map(([title, story], i) => {
        const on = this.state.pick === i, right = i === kit.right;
        return { title, story, on, border: on ? (right ? t.ok : t.accent) : t.line, bg: on ? (right ? t.okBg : t.warnBg) : t.surface, pick: () => this.setState({ pick: i }) };
      }),
      quizAnswered: this.state.pick !== null, quizRight,
      quizFeedback: this.state.pick !== null ? S.quizFb[this.state.pick] : '',
      quizFbBg: quizRight ? t.okBg : t.sunk,
      // spell: match rules or build it
      spellMatch: this.state.spellMode === 'match', spellBuild: this.state.spellMode === 'build',
      spellTabs: [['match', 'Match rules to code'], ['build', 'Build it yourself']].map(([k, label]) => Object.assign({ label, pick: () => this.setState({ spellMode: k, checked: null }) }, pill(this.state.spellMode === k))),
      rules: S.rules.map(([story, key]) => {
        const on = this.state.focus === key;
        const ln = lines[key] || 1;
        return { story, on, code: (S.code[this.state.lang] || S.code.py)[ln - 1][0].trim(), bg: on ? t.hl : t.surface, border: on ? t.accent : t.line, pick: () => this.setState({ focus: key }) };
      }),
      sig, builtRows, poolRows, builtEmpty: builtRows.length === 0, poolEmpty: poolRows.length === 0,
      spellCount: builtRows.length + ' / ' + answer.length + ' lines',
      canCheck: builtRows.length === answer.length, cantCheck: builtRows.length !== answer.length,
      checkSpell: () => {
        const got = this.state.built.map((i) => answer[i]);
        const firstBad = got.findIndex((c, i) => c !== answer[i]);
        this.setState({ checked: { firstBad } });
      },
      resetSpell: () => this.setState({ built: [], checked: null }),
      showSpell: () => this.setState({ built: answer.map((_, i) => i), checked: { firstBad: -1 } }),
      spellChecked: !!checked,
      spellOk: !!checked && checked.firstBad < 0,
      spellMsg: !checked ? '' : checked.firstBad < 0 ? 'Every line in the right order. That’s the whole spell, from memory. +20 XP' : 'Lines 1–' + (checked.firstBad + 1) + ' hold. Line ' + (checked.firstBad + 2) + ' is out of place — Old Hoot asks: “What has to happen before that?”',
      spellMsgBg: checked && checked.firstBad < 0 ? t.okBg : t.warnBg,
      // side quests
      sideQuests: others.map((p) => ({ story: p.story, title: p.title, diff: p.diff, time: p.time, synopsis: p.synopsis, animated: !!SCENES[p.id], play: () => { if (SCENES[p.id]) this.switchScene(p.id); }, go: () => saveProblem(p.id) })),
      code: (S.code[this.state.lang] || S.code.py).map(([c, cm], i) => {
        const on = i + 1 === activeLine;
        return { n: i + 1, code: c, comment: cm, bg: on ? t.hl : 'transparent', bar: on ? t.accent : 'transparent' };
      }),
      codeNote: activeLine ? 'line ' + activeLine + ' is lit' : 'walk the story to light lines',
      watch: st.watch.map(([k, v, c]) => ({ k, v, c: t[c] || t.text })),
      cx: { time: S.complexity[0][0], timeWhy: S.complexity[0][1], space: S.complexity[1][0], spaceWhy: S.complexity[1][1] },
      // finish + spaced repetition
      finished: found, notFinished: !found, nextTop: found ? '0' : 'auto',
      rates: RATES.map(([label, when, days]) => {
        const on = this.state.rated === label;
        return { label, when, on, bg: on ? t.text : t.surface, fg: on ? t.bg : t.text, border: on ? t.text : t.line, pick: () => this.rate(label, days) };
      }),
      ratedMsg: this.state.rated ? 'Added to Revisit. Old Hoot will bring it back ' + RATES.find(([l]) => l === this.state.rated)[1] + '.' : 'When should Old Hoot bring this story back?',
      nextLabel: 'Next ' + S.pattern + ' story',
      nextScene: PROBLEMS.find((p) => p.id === nextId).story,
      playNextScene: () => this.switchScene(nextId)
    };
  }
}
