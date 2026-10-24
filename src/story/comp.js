// ---- Problem page: one screen per problem ----
// Left: the problem in plain words, one example, the animated storyboard, and three folds
// (go deeper, hints, why this pattern). Right: the solution with the current line lit, and
// "Your code" (the shared CodeRunner pane). Story.dc.html keeps its name so old links still work.
function sceneIdFor(p) { return p && SCENES[p.id] ? p.id : 'two-sum-ii'; }
// Problems with no test spec yet still get an editor, seeded with the story's own signature.
function storyStarter(pid, lang) {
  const S = SCENES[pid];
  const first = S && (S.code[lang] || S.code.py)[0][0];
  return starterCode({ sig: { [lang]: first || '' } }, lang);
}
// Code lines may carry a third element naming the step kinds they serve ('fill|edge'); this builds the lines map from those tags.
function tagLines(code) {
  const out = {};
  Object.keys(code).forEach((lang) => { out[lang] = {}; code[lang].forEach(([, , tag], i) => { (tag || '').split('|').filter(Boolean).forEach((k) => { if (!out[lang][k]) out[lang][k] = i + 1; }); }); });
  return out;
}
// Motion: one curve family for the whole storyboard. The helmet CSS swaps these for fades under reduced motion.
const MOVE = 'transform 420ms cubic-bezier(.45,.05,.2,1)';   // on-screen moves: actors, the window frame, the line marker
const SETTLE = 'transform 320ms cubic-bezier(.2,.8,.2,1), opacity 320ms cubic-bezier(.2,.8,.2,1)'; // tiles lift, dim and land
const CODE_LINE = 24;

class Component extends DCLogic {
  constructor(props) {
    super(props);
    const scene = sceneIdFor(loadProblem());
    this.state = { theme: loadTheme(), scene, step: 0, playing: false, played: false, tab: 'solution', codeOpened: false,
      hints: 0, pick: null, deeper: false, showHints: false, why: false, rated: null };
    this.runner = new CodeRunner(this, scene, { starter: storyStarter, hideLangs: true, hideClock: true });
  }
  componentDidMount() {
    listenTheme(this);
    this.runner.mount();
  }
  componentWillUnmount() { clearTimeout(this.timer); this.runner.unmount(); unlistenTheme(this); }
  steps() { return SCENES[this.state.scene].steps; }
  go(i) {
    const n = this.steps().length;
    const step = Math.max(0, Math.min(n - 1, i));
    this.setState({ step });
    if (step === n - 1) { this.stop(); DS.finishStory(this.state.scene); }
  }
  stop() { clearTimeout(this.timer); this.timer = null; if (this.state.playing) this.setState({ playing: false }); }
  // Autoplay: each beat holds long enough to read its caption (1.8 to 2.2 s), then moves on. It never loops.
  pace() {
    const st = this.steps()[this.state.step];
    return Math.max(1800, Math.min(2200, 1500 + st.nar.kid.length * 5));
  }
  tick() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.state.playing) return;
      if (this.state.step >= this.steps().length - 1) { this.stop(); return; }
      this.go(this.state.step + 1);
      if (this.state.playing) this.tick();
    }, this.pace());
  }
  play() {
    if (this.state.step === this.steps().length - 1) this.setState({ step: 0 });
    this.setState({ playing: true, played: true });
    this.tick();
  }
  togglePlay() { if (this.state.playing) this.stop(); else this.play(); }
  key(e) {
    const k = e && e.key;
    if (k === 'ArrowRight') { this.stop(); this.go(this.state.step + 1); }
    else if (k === 'ArrowLeft') { this.stop(); this.go(this.state.step - 1); }
    else if (k === ' ' || k === 'k') this.togglePlay();
    else return;
    if (e.preventDefault) e.preventDefault();
  }
  switchScene(id) {
    if (!SCENES[id]) return;
    this.stop();
    saveProblem(id);
    this.runner.setProblem(id);
    this.setState({ scene: id, step: 0, played: false, hints: 0, pick: null, rated: null });
  }
  openCode() { this.stop(); this.setState({ tab: 'code', codeOpened: true }); }
  rate(label, days) {
    const deck = loadDeck();
    deck[this.state.scene] = { due: days, rated: label };
    storeDeck(deck);
    if (!this.state.rated) DS.rateCard(this.state.scene);
    this.setState({ rated: label });
  }

  cellLook(state, t) {
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
}

  // The look of every tile for one step. Kept apart so the page can compare a step with the one before it.
  tilesAt(S, st, t) {
    const pitch = S.pitch || 0, found = st.done;
    const cellLook = (state) => this.cellLook(state, t);
    let tiles;
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
        const done = i < st.L || i > st.R || found;
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
    const base = { v: '', pos: 0, fill: 'transparent', ink: t.text, glow: 'none', ring: 'transparent', op: 1, strike: 'none', lift: 'none', mark: '', idxColor: t.sceneMuted, x: 0, h: 0 };
    tiles = tiles.map((x) => Object.assign({}, base, x));
    const tiles2 = (S.items2 || []).map((c, i) => {
      const look = cellLook((st.cells2 || [])[i]);
      return Object.assign({}, base, { v: c, fill: look.fill, ink: look.ink, ring: look.ring, op: look.op || 1, mark: look.mark || String(i), idxColor: look.markColor || t.sceneMuted });
    });
    return { tiles, tiles2 };
  }

  // The 2D grid: S.items (or st.vals) is rows of values, st.cells the matching rows of states.
  gridAt(S, st, t) {
    const vals = st.vals || S.items, R = vals.length, C = vals[0].length;
    const gap = 6, padL = S.rowHeads ? 52 : 20, padT = 18;
    const maxW = (S.board ? 380 : 470) - padL, maxH = 214 - padT;
    const gp = Math.floor(Math.min(S.maxTile || 58, maxH / R, maxW / C)), size = gp - gap;
    const at = (r, c) => [padL + c * gp + size / 2, padT + r * gp + size / 2];
    const onPath = new Set((st.path || []).map(([r, c]) => r + ',' + c));
    const grid = { w: padL + C * gp - gap, h: padT + R * gp - gap, tiles: [] };
    grid.label = (S.gridLabel || 'Grid') + ', ' + R + ' rows by ' + C + ' columns. ' + st.verdict + (st.actorAt ? '. ' + ((STORY_CAST[S.cast] || {}).name || 'The guide') + ' is at row ' + st.actorAt[0] + ', column ' + st.actorAt[1] : '') + '.';
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      const look = Object.assign({}, this.cellLook(st.cells[r][c], t));
      if (st.cells[r][c] === 'out') { look.ink = t.sceneMuted; look.op = 1; }
      const v = vals[r][c] == null ? '' : String(vals[r][c]);
      const mark = look.mark && look.mark.length <= 2 ? look.mark : '';
      const ring = onPath.has(r + ',' + c) && look.ring === 'transparent' ? t.path : look.ring;
      grid.tiles.push({ v, left: padL + c * gp, top: padT + r * gp, size, fill: look.fill, ink: look.ink, ring, op: look.op || 1, glow: look.glow || 'none', lift: 'none',
        font: Math.max(12, Math.min(22, Math.round(size * (v.length > 2 ? 0.34 : 0.44)))) + 'px', mark, markColor: look.markColor || t.sceneMuted });
    }
    const heads = (list, n) => Array.from({ length: n }, (_, i) => (list ? String(list[i]) : String(i)));
    grid.cols = heads(S.colHeads, C).map((label, c) => ({ label, x: padL + c * gp, w: size }));
    grid.rows = heads(S.rowHeads, R).map((label, r) => ({ label, y: padT + r * gp, h: size, w: padL - 8 }));
    grid.line = (st.path || []).map(([r, c]) => at(r, c).join(',')).join(' ');
    grid.lineOp = (st.path || []).length > 1 ? 0.9 : 0;
    grid.actor = { move: 'translate(0px, 0px)', size: 0, op: 0, initial: '', color: 'transparent', font: '10px' };
    if (st.actorAt) {
      const a = Math.max(18, Math.min(22, Math.round(size * 0.5)));
      const who = STORY_CAST[S.cast] || { initial: '?', color: 'left' };
      grid.actor = { move: 'translate(' + (padL + st.actorAt[1] * gp - a * 0.55) + 'px, ' + (padT + st.actorAt[0] * gp - a * 0.55) + 'px)', size: a, op: 1, initial: who.initial, color: t[who.color] || who.color, font: Math.round(a * 0.5) + 'px' };
    }
    grid.legend = (S.legend || []).map(([state, label]) => {
      if (state === 'path') return { label, fill: 'transparent', ring: t.path, mark: '' };
      const look = this.cellLook(state, t);
      return { label, fill: look.fill, ring: look.ring === 'transparent' ? 'rgba(255,255,255,0.18)' : look.ring, mark: look.mark && look.mark.length <= 2 ? look.mark : '' };
    });
    grid.hasLegend = grid.legend.length > 0;
    return grid;
  }

  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = Object.assign({}, THEMES[themeKey] || THEMES.max, STORY_EXTRA[themeKey] || STORY_EXTRA.paper);
    const S = SCENES[this.state.scene];
    const P = PROBLEMS.find((p) => p.id === S.id);
    const kit = KIT[S.pattern];
    const steps = S.steps;
    const si = Math.min(this.state.step, steps.length - 1);
    const st = steps[si];
    const prevSt = si > 0 ? steps[si - 1] : null;
    const cr = this.runner.vals(t);
    const lang = this.runner.s.lang;
    const lines = S.lines[lang] || S.lines.py;
    const code = S.code[lang] || S.code.py;
    const found = st.done;
    const pitch = S.pitch || 0, tileW = S.tile || 0;
    const onCode = this.state.tab === 'code';
    const atEnd = si === steps.length - 1;

    // ---- one focus per beat: what changed since the step before is lifted, the rest steps back ----
    const isGrid = S.visual === 'grid';
    const now = isGrid ? { tiles: [], tiles2: [] } : this.tilesAt(S, st, t);
    const before = prevSt && !isGrid ? this.tilesAt(S, prevSt, t) : null;
    const sameLook = (a, b) => a.fill === b.fill && a.ring === b.ring && a.mark === b.mark && a.op === b.op && a.v === b.v;
    const focusOn = (list, old, actorsHere) => {
      if (!old) return list;
      const changed = list.map((x, i) => !sameLook(x, old[i]) || actorsHere.includes(i));
      if (!changed.some(Boolean) || changed.every(Boolean)) return list;
      return list.map((x, i) => (changed[i]
        ? Object.assign({}, x, { lift: x.lift !== 'none' ? x.lift : S.visual === 'planks' ? 'none' : 'translateY(-4px)' })
        : Object.assign({}, x, { op: Math.max(0.35, +(x.op * 0.65).toFixed(2)), glow: 'none' })));
    };
    const here = S.visual === 'lanterns' || !st.cells ? [st.L, st.R] : [];
    const tiles = focusOn(now.tiles, before && before.tiles, here);
    const tiles2 = focusOn(now.tiles2, before && before.tiles2, []);
    const blank = { w: 0, h: 0, tiles: [], cols: [], rows: [], line: '', lineOp: 0, label: '', legend: [], hasLegend: false, actor: { move: 'none', size: 0, op: 0, initial: '', color: 'transparent', font: '10px' } };
    const grid = isGrid ? this.gridAt(S, st, t) : blank;
    if (isGrid && prevSt && (!st.vals || !prevSt.vals || st.vals.length === prevSt.vals.length)) {
      const old = this.gridAt(S, prevSt, t).tiles;
      grid.tiles = focusOn(grid.tiles, old.length === grid.tiles.length ? old : null, []).map((x) => Object.assign(x, { lift: x.lift === 'translateY(-4px)' ? 'scale(1.06)' : 'none' }));
    }

    // ---- planks: water and the window frame, drawn with transforms only ----
    const W = S.width || 1;
    const wet = !!S.water && !found;
    const waterW = wet ? (st.R - st.L) * pitch : 0;
    const waterH = wet ? Math.min(S.items[st.L], S.items[st.R]) * S.unit : 0;
    const waterX = wet ? st.L * pitch + tileW / 2 : 0;
    const water = {
      fill: 'translateX(' + waterX + 'px) scale(' + (waterW / W).toFixed(4) + ', ' + (waterH / 162).toFixed(4) + ')',
      top: 'translate(' + waterX + 'px, ' + (-waterH) + 'px) scaleX(' + (waterW / W).toFixed(4) + ')',
      op: waterW > 0 ? 1 : 0
    };
    const fr = (st.frameAt || [st.L, st.R]).map((x) => (typeof x === 'number' ? x : 0));
    const showFrame = S.cast === 'sw' && !st.noFrame;
    const fLeft = fr[0] * pitch - 7, fWidth = (fr[1] - fr[0]) * pitch + tileW + 14;
    const frame = {
      op: showFrame ? 1 : 0,
      left: 'translateX(' + fLeft + 'px)',
      right: 'translateX(' + (fLeft + fWidth - 16) + 'px)',
      bar: 'translateX(' + (fLeft + 16) + 'px) scaleX(' + Math.max(0, fWidth - 32) + ')',
      fill: 'translateX(' + fLeft + 'px) scaleX(' + fWidth + ')'
    };
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
    if (isGrid) {
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
    actors = actors.map((a) => Object.assign(a, { move: 'translateX(' + a.x + 'px)' }));

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
    const activeLine = lines[st.kind] || 0;
    const more = PROBLEMS.filter((p) => p.pattern === S.pattern && p.id !== S.id).sort((a, b) => (!!SCENES[b.id] - !!SCENES[a.id]) || a.added - b.added).slice(0, 4);
    const quizRight = this.state.pick === kit.right;
    const RATES = [['Again', 'tomorrow', 1], ['Hard', 'in 3 days', 3], ['Good', 'in a week', 7], ['Easy', 'in 3 weeks', 21]];
    const pct = Math.max(0, Math.min(100, st.meter.pct));
    // One primary action at a time: Play until the story has been watched, then "Write it yourself", then Run (in the code pane).
    const tryPrimary = !onCode && atEnd && this.state.played;
    const playPrimary = !onCode && !tryPrimary;
    const btn = (primary) => ({ bg: primary ? t.accent : 'transparent', fg: primary ? t.onAccent : t.text, border: primary ? t.accent : t.line2 });

    return {
      t, ...navVals(this, t, themeKey, 'Story'), S, P, cr,
      diffBg: t.diff[P.diff][1], diffFg: t.diff[P.diff][2], patternName: S.pattern,
      clock: cr.clock, clockLabel: cr.clockLabel,
      // the problem
      task: STORY_TASKS[S.id] || S.quest.join(' '),
      exampleIn: S.example[0], exampleOut: S.example[1].replace(/^(answer|after)\s*=\s*/, ''),
      // storyboard
      storyName: P.story, goal: S.goal,
      isLanterns: S.visual === 'lanterns', isLetters: S.visual === 'letters', isPlanks: S.visual === 'planks', isGrid, showActors: !isGrid, grid,
      hasRow2: !!S.items2, rowLabels: S.rowLabels || ['', ''],
      tiles, tiles2, water, frame, showFrame, frameBottom: S.visual === 'planks' ? '0' : '3px', frameBar2: S.visual === 'planks' ? 0 : 1,
      tileW, tileH: S.tileH || 84, tileGap: pitch - tileW, tileFont: (S.font || 34) + 'px',
      hasBoard: !!S.board, boardTitle: S.boardTitle || '', board, boardEmpty: board.length === 0,
      boardPad: S.board ? 170 : 0,
      actors, move: MOVE, settle: SETTLE,
      statusText: found ? S.status[1] : S.status[0],
      statusColor: found ? t.ok : t.sceneMuted,
      meter: { text: st.meter.text, scale: 'scaleX(' + (pct / 100).toFixed(3) + ')', markAt: Math.max(0, Math.min(100, st.meter.mark)) + '%', markLabel: st.meter.markLabel, markShift: st.meter.mark > 85 ? 'translateX(-100%)' : st.meter.mark < 15 ? 'none' : 'translateX(-50%)' },
      meterColor: toneBar[st.tone], verdict: st.verdict, verdictBg: toneBg[st.tone],
      caption: st.nar.kid,
      dialog: st.dialog.map(([k, text]) => Object.assign({ text }, who[k])),
      stepLabel: 'Step ' + (si + 1) + ' of ' + steps.length,
      lastStep: steps.length - 1, stepNow: si,
      scrub: (e) => { const v = Number(e && e.target ? e.target.value : 0); this.stop(); this.go(isNaN(v) ? 0 : v); },
      onKey: (e) => this.key(e),
      atStart: si === 0, atEnd,
      prev: () => { this.stop(); this.go(si - 1); },
      next: () => { this.stop(); this.go(si + 1); },
      playing: this.state.playing, paused: !this.state.playing,
      playLabel: this.state.playing ? 'Pause' : atEnd && this.state.played ? 'Replay' : 'Play',
      togglePlay: () => this.togglePlay(),
      playBtn: btn(playPrimary),
      // after the last step, the next move is to write it
      finished: atEnd && found, showTryIt: atEnd && !onCode,
      tryIt: () => this.openCode(), tryBtn: btn(tryPrimary),
      // folds
      deeperOpen: this.state.deeper, deeperX: this.state.deeper ? 'true' : 'false', toggleDeeper: () => this.setState({ deeper: !this.state.deeper }),
      expert: st.nar.expert,
      hintsOpen: this.state.showHints, hintsX: this.state.showHints ? 'true' : 'false', toggleHints: () => this.setState({ showHints: !this.state.showHints }),
      hintCount: this.state.hints + ' of ' + S.hints.length + ' shown',
      shownHints: S.hints.slice(0, this.state.hints).map((h, i) => ({ n: 'Hint ' + (i + 1), text: h })),
      moreHints: this.state.hints < S.hints.length,
      nextHintLabel: 'Show hint ' + (this.state.hints + 1),
      revealHint: () => this.setState({ hints: Math.min(S.hints.length, this.state.hints + 1) }),
      whyOpen: this.state.why, whyX: this.state.why ? 'true' : 'false', toggleWhy: () => this.setState({ why: !this.state.why }),
      spotAsk: kit.ask,
      clues: S.clues,
      quiz: (kit.quiz || QUIZ).map(([title, story], i) => {
        const on = this.state.pick === i, right = i === kit.right;
        return { title, story, on, border: on ? (right ? t.ok : t.accent) : t.line, bg: on ? (right ? t.okBg : t.warnBg) : t.surface, mark: on ? (right ? '✓ ' : '✗ ') : '', pick: () => this.setState({ pick: i }) };
      }),
      quizAnswered: this.state.pick !== null, quizRight,
      quizFeedback: this.state.pick !== null ? S.quizFb[this.state.pick] : '',
      quizFbBg: quizRight ? t.okBg : t.sunk,
      // more stories like this (the old side quests)
      hasMore: more.length > 0,
      moreStories: more.map((p) => ({ story: p.story, title: p.title, animated: !!SCENES[p.id], notAnimated: !SCENES[p.id], play: () => this.switchScene(p.id), go: () => saveProblem(p.id) })),
      rates: RATES.map(([label, when, days]) => {
        const on = this.state.rated === label;
        return { label, when, on, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.text, border: on ? t.text : t.line2, pick: () => this.rate(label, days) };
      }),
      ratedMsg: this.state.rated ? 'Added to Revisit. It comes back ' + RATES.find(([l]) => l === this.state.rated)[1] + '.' : 'When should this one come back for review?',
      // right pane
      tabs: [['solution', 'Solution'], ['code', 'Your code']].map(([k, label]) => {
        const on = this.state.tab === k;
        return { label, on, tabId: 'pp-tab-' + k, panel: 'pp-panel-' + k, sel: on ? 'true' : 'false', bar: on ? t.accent : 'transparent', fg: on ? t.text : t.muted, pick: () => (k === 'code' ? this.openCode() : this.setState({ tab: k })) };
      }),
      onSolution: !onCode, onCode, codeOpened: this.state.codeOpened, codeDisplay: onCode ? 'flex' : 'none',
      langs: CODE_LANGS.map(([k, label]) => {
        const on = lang === k;
        return { label: label === 'JavaScript' ? 'JS' : label, on, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.muted, pick: () => this.runner.setLang(k) };
      }),
      code: code.map(([c, cm], i) => ({ n: i + 1, code: c, comment: cm, numColor: i + 1 === activeLine ? t.accent : t.muted })),
      codeH: code.length * CODE_LINE + 'px',
      lineMark: 'translateY(' + Math.max(0, activeLine - 1) * CODE_LINE + 'px)', lineMarkOp: activeLine ? 1 : 0,
      lineNote: activeLine ? 'Line ' + activeLine + ' runs in this step' : '',
      watch: st.watch.map(([k, v, c], i) => {
        const was = prevSt && prevSt.watch[i] ? prevSt.watch[i][1] : v;
        const changed = String(was) !== String(v);
        return { k, v, c: t[c] || t.text, border: changed ? t.accent : t.line, bg: changed ? t.hl : 'transparent' };
      }),
      cx: { time: S.complexity[0][0], timeWhy: S.complexity[0][1], space: S.complexity[1][0], spaceWhy: S.complexity[1][1] }
    };
  }
}
