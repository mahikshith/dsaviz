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
// Graph geometry, shared by the page and tests/scenecheck.js. S.graph.nodes carry hand-placed x, y in a unit box (0 to 1);
// the box is scaled into the stage. On a phone (S.phone, from phoneScene) the box takes the stage's real width and grows
// taller, so nodes stay apart, with labels and notes at 12px or more.
function graphBox(S, phone) {
  const r = phone ? 17 : 18, font = phone ? 14 : 14, tagFont = 12, wFont = 12;
  const W = phone ? (S.AV || 348) - 8 : S.graphW || (S.board ? 400 : 560), H = phone ? 232 : 186;
  const mx = r + 10, mt = r + 12, mb = r + tagFont + 8;
  const pos = {};
  S.graph.nodes.forEach((n) => { pos[n.id] = [Math.round(mx + n.x * (W - 2 * mx)), Math.round(mt + n.y * (H - mt - mb))]; });
  return { r, font, tagFont, wFont, W, H, pos, arrow: 9, actor: phone ? 22 : 20 };
}
function graphEdgeKey(e) { return e.id || e.from + '-' + e.to; }
// Nodes spread evenly round an ellipse, for custom input (up to 8 nodes stay apart in both sizes).
function ringGraph(ids, labels) {
  const n = ids.length;
  return ids.map((id, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { id, label: labels ? labels[i] : String(id), x: +(0.5 + 0.5 * Math.cos(a)).toFixed(3), y: +(0.5 + 0.5 * Math.sin(a)).toFixed(3) };
  });
}
// Motion: one curve family for the whole storyboard. The helmet CSS swaps these for fades under reduced motion.
const MOVE = 'transform 420ms cubic-bezier(.45,.05,.2,1)';   // on-screen moves: actors, the window frame, the line marker
const SETTLE = 'transform 320ms cubic-bezier(.2,.8,.2,1), opacity 320ms cubic-bezier(.2,.8,.2,1)'; // tiles lift, dim and land
const CODE_LINE = 24;
// The story's key rule for Revisit: the guide's answer to the right quiz pick, without the speaker and the "Yes!".
function storyKeyRule(id) {
  const S = SCENES[id];
  if (!S || !S.quizFb) return '';
  const kit = Object.assign({}, KIT[S.pattern], S.kit || {});
  const fb = S.quizFb[kit.right] || '';
  return fb.replace(/^[^:“"]*:\s*/, '').replace(/^[“"]|[”"]$/g, '').replace(/^(Yes|Right|Exactly)[!.,]?\s*(—\s*)?/i, '').trim();
}

// ---- Phones: the storyboard at real size ----
// Below 760px the stage is laid out again for the screen instead of being shrunk as one picture: a row of up to
// 9 tiles fits the width (35px tiles or more at 390px), grids and trees size to the width with 12px labels, the
// notebook and the legend sit under the picture, and actors whose labels would collide stack on two lines.
// Desktop never calls these, so its layout stays as it was.
function stageWidth() {
  const w = typeof window !== 'undefined' && window.innerWidth ? Math.min(window.innerWidth, 759) : 390;
  return Math.max(256, w - 32 - 2 - 8);   // page gutters, the stage border, 4px inside each edge
}
function phoneScene(S0) {
  const AV = stageWidth();
  const S = Object.assign({}, S0, { phone: true, AV });
  if (S0.visual === 'grid' || S0.visual === 'tree' || S0.visual === 'graph') return S;
  const n = Math.max(S0.items.length, (S0.items2 || []).length);
  const pitch = Math.min(S0.pitch, Math.floor((AV + 4) / n));
  const tile = S0.visual === 'planks' ? Math.max(12, Math.round(S0.tile * pitch / S0.pitch))
    : pitch - Math.min(S0.pitch - S0.tile, Math.max(4, Math.round(pitch * 0.1)));
  const k = tile / S0.tile;
  Object.assign(S, { pitch, tile, width: (n - 1) * pitch + tile });
  if (S0.tileH) S.tileH = Math.max(tile, Math.round(S0.tileH * Math.max(k, 0.7)));
  if (S0.font) {
    const longest = Math.max.apply(null, S0.items.concat(S0.items2 || []).map((x) => String(x).length));
    S.font = Math.max(14, Math.min(Math.round(S0.font * Math.max(k, 0.65)), Math.floor((tile - 8) / (0.55 * longest))));
  }
  return S;
}
// The notebook under a phone stage: as many columns as its longest line allows, and room for its fullest step,
// so the picture above it holds still. Read by the phone CSS; desktop ignores the variables.
function boardVars(S) {
  if (!S.phone || !S.board) return '';
  const rows = S.steps.map((x) => x.board || []);
  const chars = Math.max.apply(null, [6].concat(...rows.map((r) => r.map(([k, v]) => String(k).length + String(v).length + 1))));
  const cols = Math.max(1, Math.min(3, Math.floor((S.AV - 16 + 6) / (chars * 8 + 16 + 6))));
  const most = Math.max.apply(null, [1].concat(rows.map((r) => r.length)));
  return '--pp-bcols: ' + cols + '; --pp-bh: ' + (18 + 4 + Math.ceil(most / cols) * 28) + 'px';
}
// Actor labels on a phone row: keep each label inside the stage, and drop an actor to a second line when its
// label or body would touch the one before it. Returns true when any actor was dropped.
function phoneCast(list, S) {
  const slack = (S.AV - S.width) / 2;
  let lastRight = -Infinity, lastMid = -Infinity, stacked = false;
  list.map((a, i) => ({ a, i })).sort((p, q) => p.a.x - q.a.x || p.i - q.i).forEach(({ a }) => {
    a.x = Math.max(-slack, Math.min(S.width + slack - 28, a.x));   // the 28px box, half-steps (±0.5) included, stays on stage
    const w = Math.round(a.label.length * 7) + 4, mid = a.x + 14;
    const left = Math.max(-slack, Math.min(S.width + slack - w, mid - w / 2));
    a.shift = 'translateX(' + Math.round(left - (mid - w / 2)) + 'px)';
    const drop = left < lastRight + 4 || mid - lastMid < 32;
    a.y = drop ? 46 : 0;
    if (drop) stacked = true; else { lastRight = left + w; lastMid = mid; }
  });
  return stacked;
}

class Component extends DCLogic {
  constructor(props) {
    super(props);
    const scene = sceneIdFor(loadProblem());
    // Opened from a problem page (Story.dc.html?from=code): a link back to it, and the story starts at step 1.
    let fromCode = false;
    try { fromCode = new URLSearchParams(window.location.search).get('from') === 'code'; } catch (e) {}
    this.fromCode = fromCode;
    // The solution code stays folded until asked for: the story, hints and plan come first.
    this.state = { theme: loadTheme(), scene, step: 0, playing: false, played: false, tab: 'solution', codeOpened: false, solOpen: false,
      hints: 0, pick: null, deeper: false, showHints: false, why: false, rated: null, notesOpen: false, note: DS.note(scene), noteSaved: false,
      // your own input: run is the re-simulated scene (null = the story's own example); predict: the toggle, the open question and the last feedback
      customOpen: false, run: null, runText: '', runMsg: '', runBad: false, predict: false, ask: null, fb: null, lastAsk: -9 };
    this.runner = new CodeRunner(this, scene, { starter: storyStarter, hideLangs: true, hideClock: true });
    this.approaches = new ApproachPane(this, scene, { lang: () => this.runner.s.lang });
  }
  componentDidMount() {
    listenTheme(this);
    this.runner.mount();
    // On a phone the stage is laid out for the screen width, so a resize (or turning the phone) lays it out again.
    this.onResize = () => { if (dsPhone() && window.innerWidth !== this.vw) { this.vw = window.innerWidth; this.setState({}); } };
    if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('resize', this.onResize);
    // Space and the arrow keys drive the player when nothing else has focus (the story section handles its own keys).
    this.onPageKey = (e) => {
      const tgt = e && e.target;
      if (!tgt || (tgt !== document.body && tgt !== document.documentElement) || this.state.drawer) return;
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') this.key(e);
    };
    if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('keydown', this.onPageKey);
  }
  componentWillUnmount() {
    clearTimeout(this.timer); this.runner.unmount(); unlistenTheme(this);
    if (typeof window !== 'undefined' && window.removeEventListener) { window.removeEventListener('resize', this.onResize); window.removeEventListener('keydown', this.onPageKey); }
  }
  // The scene on stage: a custom run when the learner applied their own input, else the story.
  scene() { return this.state.run || SCENES[this.state.scene]; }
  steps() { return this.scene().steps; }
  go(i) {
    const n = this.steps().length;
    const step = Math.max(0, Math.min(n - 1, i));
    this.setState({ step });
    if (step === n - 1) { this.stop(); DS.finishStory(this.state.scene); DS.addCard(this.state.scene, { rule: storyKeyRule(this.state.scene) }); }
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
      if (this.askBefore(this.state.step + 1, true)) return;
      this.go(this.state.step + 1);
      if (this.state.playing) this.tick();
    }, paced(this.pace()));
  }
  play() {
    if (this.state.step === this.steps().length - 1) this.setState({ step: 0 });
    this.setState({ playing: true, played: true });
    this.tick();
  }
  togglePlay() { if (this.state.ask) return; if (this.state.playing) this.stop(); else this.play(); }
  // ---- predict the next step: before some steps the player pauses and asks which rule fires next ----
  // Asks at most every other step, only when the toggle is on. resume: play on after the pick.
  askBefore(j, resume) {
    if (!this.state.predict || j - this.state.lastAsk < 2) return false;
    const q = predictQuestion(this.scene(), j);
    if (!q) return false;
    clearTimeout(this.timer); this.timer = null;
    this.setState({ ask: Object.assign({ resume }, q), playing: false, fb: null, lastAsk: j });
    this.showAsk();
    return true;
  }
  // Bring the question box fully into view in the left column: smooth, or instant under reduced motion.
  showAsk() {
    if (typeof document === 'undefined') return;
    setTimeout(() => {
      try {
        const el = document.getElementById('pp-ask');
        const box = el && el.closest('[aria-live]');
        if (box) box.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
      } catch (e) {}
    }, 30);
  }
  answer(i) {
    const q = this.state.ask;
    if (!q || !q.choices[i]) return;
    const ok = q.choices[i].right;
    const p = DS.logPredict(ok);
    const fb = { ok, at: q.at, text: ok ? 'Right: ' + q.answer + '. ' + (p.streak > 1 ? p.streak + ' in a row.' : 'Nice.') : 'Not quite. It was: ' + q.answer + '.' };
    this.setState({ ask: null, fb });
    this.go(q.at);
    if (q.resume && q.at < this.steps().length - 1) { this.setState({ playing: true }); this.tick(); }
  }
  // Skip the question: show the step, score nothing.
  skipAsk() { const q = this.state.ask; if (!q) return; this.setState({ ask: null, fb: null }); this.go(q.at); }
  stepNext() {
    this.stop();
    if (this.state.ask) { this.skipAsk(); return; }
    if (this.askBefore(this.state.step + 1, false)) return;
    this.setState({ fb: null });
    this.go(this.state.step + 1);
  }
  togglePredict() { this.setState({ predict: !this.state.predict, ask: null, fb: null, lastAsk: -9 }); }
  key(e) {
    const k = e && e.key;
    const tag = e && e.target && e.target.tagName;
    if ((k === ' ' || k === 'Enter') && (tag === 'BUTTON' || tag === 'INPUT' || tag === 'A')) return;   // let the focused control act
    if (this.state.ask && /^[1-3]$/.test(k || '')) { this.answer(Number(k) - 1); if (e.preventDefault) e.preventDefault(); return; }
    if (k === 'ArrowRight') this.stepNext();
    else if (k === 'ArrowLeft') { this.stop(); this.setState({ ask: null, fb: null }); this.go(this.state.step - 1); }
    else if (k === ' ' || k === 'k') this.togglePlay();
    else return;
    if (e.preventDefault) e.preventDefault();
  }
  switchScene(id) {
    if (!SCENES[id]) return;
    this.stop();
    saveProblem(id);
    this.runner.setProblem(id);
    this.approaches.setProblem(id);
    this.setState({ scene: id, step: 0, played: false, hints: 0, pick: null, rated: null, note: DS.note(id), noteSaved: false,
      run: null, runText: '', runMsg: '', runBad: false, ask: null, fb: null, lastAsk: -9 });
  }
  // ---- try your own input: parse, check, re-run the simulation, restart the storyboard ----
  applyRun(text) {
    const res = runFromText(this.state.scene, text);
    if (res.error) { this.setState({ runText: text, runMsg: res.error, runBad: true }); return; }
    this.stop();
    this.setState({ run: res.scene, runText: text, runMsg: 'Running your input: ' + res.scene.steps.length + ' steps. Answer: ' + res.scene.example[1].replace(/^(answer|after)\s*=\s*/, '') + '.', runBad: false,
      step: 0, ask: null, fb: null, lastAsk: -9, played: false });
    this.play();
  }
  usePreset(i) {
    const spec = SCENE_INPUT[this.state.scene];
    const p = spec && spec.presets[i];
    if (!p) return;
    if (i === 0) { this.resetRun(spec.show(p[1]())); return; }
    this.applyRun(spec.show(p[1]()));
  }
  resetRun(text) {
    this.stop();
    this.setState({ run: null, runText: text || '', runMsg: text ? 'Back to the story example.' : '', runBad: false, step: 0, ask: null, fb: null, lastAsk: -9, played: false });
  }
  openCode() { this.stop(); this.setState({ tab: 'code', codeOpened: true }); }
  // Rating a finished story schedules its Revisit card (DS.review). Changing your mind re-rates it from the same starting point.
  rate(grade) {
    DS.review(this.state.scene, grade, { redo: !!this.state.rated });
    this.setState({ rated: grade });
  }
  setNote(text) {
    DS.setNote(this.state.scene, text);
    this.setState({ note: text, noteSaved: true });
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
        const g = v * (S.glow || 1);   // a custom run with bright lanterns scales the glow so the ink stays readable
        return {
          v, pos: i + 1,
          fill: out ? t.dead : 'hsl(' + t.hue + ',' + t.sat + '%,' + +(95 - g * 2.8).toFixed(1) + '%)',
          ink: out ? t.deadInk : '#1D1B18',
          glow: out ? 'none' : '0 0 ' + Math.round(8 + g * 3) + 'px hsla(' + t.hue + ',95%,60%,' + (0.18 + g * 0.045).toFixed(2) + ')',
          ring: found && (isL || isR) ? t.ok : isL ? t.left : isR ? t.right : 'transparent',
          op: out ? 0.55 : 1, strike: out ? 'line-through' : 'none'
        };
      });
    } else if (S.visual === 'letters' && st.cells) {
      tiles = S.items.map((c, i) => {
        const look = cellLook(st.cells[i]);
        return { v: st.vals ? st.vals[i] : c, fill: look.fill, ink: look.ink, ring: look.ring, glow: look.glow || 'none', lift: look.lift || 'none', op: look.op || 1, mark: look.mark || String(i), idxColor: look.markColor || t.sceneMuted };
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
    const maxW = (S.phone ? S.AV - 8 : S.board ? 380 : 470) - padL, maxH = (S.phone ? 300 : 214) - padT;
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
      const a = S.phone ? 24 : Math.max(18, Math.min(22, Math.round(size * 0.5)));
      const who = STORY_CAST[S.cast] || { initial: '?', color: 'left' };
      grid.actor = { move: 'translate(' + (padL + st.actorAt[1] * gp - a * 0.55) + 'px, ' + (padT + st.actorAt[0] * gp - a * 0.55) + 'px)', size: a, op: 1, initial: who.initial, color: t[who.color] || who.color, font: (S.phone ? 12 : Math.round(a * 0.5)) + 'px' };
    }
    grid.legend = (S.legend || []).map(([state, label]) => {
      if (state === 'path') return { label, fill: 'transparent', ring: t.path, mark: '' };
      const look = this.cellLook(state, t);
      return { label, fill: look.fill, ring: look.ring === 'transparent' ? 'rgba(255,255,255,0.18)' : look.ring, mark: look.mark && look.mark.length <= 2 ? look.mark : '' };
    });
    grid.hasLegend = grid.legend.length > 0;
    return grid;
  }

  // The tree: S.tree (or st.tree, for a step that reshapes it) is [{ id, label, parent, side }]; st.nodes maps id → state.
  // A node missing from st.nodes is hidden, so a decision tree grows as it is explored. Everything moves by transform.
  treeAt(S, st, t) {
    const list = st.tree || S.tree, byId = {}, kids = {};
    list.forEach((n) => { byId[n.id] = n; if (n.parent != null) (kids[n.parent] = kids[n.parent] || []).push(n.id); });
    const nameOf = (id) => String(st.vals && st.vals[id] != null ? st.vals[id] : byId[id].label);
    // tidy layout: leaves take the next free column, a parent sits over the middle of its children;
    // a lone child marked side 'L' or 'R' keeps an empty column for its missing sibling, so binary trees read true
    const depth = {}, col = {};
    let next = 0, maxD = 0;
    const place = (id, d) => {
      depth[id] = d; maxD = Math.max(maxD, d);
      let ch = (kids[id] || []).slice().sort((a, b) => (byId[a].side === 'R') - (byId[b].side === 'R'));
      if (ch.length === 1 && byId[ch[0]].side) ch = byId[ch[0]].side === 'L' ? [ch[0], null] : [null, ch[0]];
      if (!ch.length) { col[id] = next++; return; }
      const xs = ch.map((c) => { if (c === null) return next++; place(c, d + 1); return col[c]; });
      col[id] = (xs[0] + xs[xs.length - 1]) / 2;
    };
    list.filter((n) => n.parent == null).forEach((n) => place(n.id, 0));
    const nh = 30, fontPx = 13;
    // phones: slimmer pills (the label still sets at 13px) and tags measured at their 12px phone size
    const wOf = (id) => Math.max(nh + 4, Math.round(nameOf(id).length * fontPx * 0.62 + (S.phone ? 12 : 18)));
    // a tag (the short note beside a node) widens its footprint, so leave room for the longest one any step shows
    const tagW = S.tags ? Math.max.apply(null, [0].concat(S.steps.map((x) => Math.max.apply(null, [0].concat(Object.values(x.tags || {}).map((v) => String(v).length)))))) * (S.phone ? 7.5 : 7) + 8 : 0;
    // phones put the tag under its node (there is no room beside it), so a node takes the wider of the two
    const widest = S.phone ? Math.max.apply(null, list.map((n) => Math.max(wOf(n.id), tagW))) : Math.max.apply(null, list.map((n) => wOf(n.id))) + 2 * tagW;
    const W = S.phone ? S.AV - 8 : S.treeW || (S.board ? 430 : 560), H = S.phone ? nh + 56 * Math.max(1, maxD) : S.treeH || 162;
    const slot = Math.min(110, (W - widest) / Math.max(1, next - 1));
    const dy = maxD ? Math.min(66, (H - nh) / maxD) : 0;
    const cx = (id) => widest / 2 + col[id] * slot, cy = (id) => depth[id] * dy + nh / 2;
    const tree = { w: Math.round(widest + (next - 1) * slot), h: Math.round(maxD * dy + nh + (S.phone && tagW ? 18 : 0)) };
    const shown = (id) => !!(st.nodes && st.nodes[id]);
    tree.edges = list.filter((n) => n.parent != null && byId[n.parent]).map((n) => {
      const x1 = cx(n.parent), y1 = cy(n.parent) + nh / 2, x2 = cx(n.id), y2 = cy(n.id) - nh / 2;
      const len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      const es = (st.edge && st.edge[n.id]) || '';
      const thick = es === 'path' ? 5 : 2;
      return { id: n.id, thick, color: es === 'path' ? t.path : t.treeEdge, op: shown(n.id) && shown(n.parent) ? (es === 'out' ? 0.35 : 1) : 0,
        move: 'translate(' + x1.toFixed(1) + 'px, ' + (y1 - thick / 2).toFixed(1) + 'px) rotate(' + ang.toFixed(2) + 'deg) scaleX(' + (len / 100).toFixed(4) + ')' };   // drawn 100px wide, then scaled: page zoom would round a 1px base
    });
    tree.nodes = list.map((n) => {
      const state = st.nodes && st.nodes[n.id];
      const look = Object.assign({}, this.cellLook(state || 'in', t));
      if (state === 'out') { look.ink = t.sceneMuted; look.op = 1; look.mark = '✗'; look.markColor = t.sceneMuted; }
      // explored and left behind: solid and readable (not faded), set apart from 'out' by a visible ring
      if (state === 'future') { look.fill = t.dead; look.ink = t.sceneText; look.ring = t.treeEdge; look.op = 1; }
      if (state === 'buy') look.ring = t.sceneText;   // waiting in line: a light dashed ring reads in every theme
      const w = wOf(n.id), mark = look.mark && look.mark.length <= 2 && look.mark !== '✎' ? look.mark : '';   // the trail line already shows chosen nodes
      const tag = st.tags && st.tags[n.id] != null ? String(st.tags[n.id]) : '';
      const x = Math.round(cx(n.id) - w / 2), y = Math.round(cy(n.id) - nh / 2);
      return { id: n.id, v: nameOf(n.id), x, y, w, h: nh, fill: look.fill, ink: look.ink, ring: look.ring, glow: look.glow || 'none', op: state ? look.op || 1 : 0,
        grow: state ? 1 : 0.6, mark, markColor: look.markColor || t.sceneMuted, markOp: mark ? 1 : 0, tag, tagOp: tag ? 1 : 0,
        ringStyle: state === 'buy' ? 'dashed' : 'solid', font: fontPx + 'px' };
    });
    const count = list.filter((n) => shown(n.id)).length;
    const castName = (STORY_CAST[S.cast] || {}).name || 'The guide';
    const trailIds = list.filter((n) => st.edge && st.edge[n.id] === 'path').map((n) => n.id);
    const trailText = trailIds.length ? '. Highlighted: ' + trailIds.map((id) => (byId[id].parent != null ? nameOf(byId[id].parent) + ' to ' : '') + nameOf(id)).join(', ') : '';
    tree.label = (S.treeLabel || 'Tree') + ', ' + count + (count === 1 ? ' node' : ' nodes') + ' shown. ' + st.verdict.replace(/[.!?]$/, '') + trailText + (st.actorAt != null && byId[st.actorAt] ? '. ' + castName + ' is at ' + nameOf(st.actorAt) : '') + '.';
    tree.actor = { move: 'translate(0px, 0px)', size: 0, op: 0, initial: '', color: 'transparent', font: '10px' };
    if (st.actorAt != null && byId[st.actorAt]) {
      const a = S.phone ? 22 : 20, who = STORY_CAST[S.cast] || { initial: '?', color: 'left' };
      tree.actor = { move: 'translate(' + Math.round(cx(st.actorAt) - wOf(st.actorAt) / 2 - a * 0.55) + 'px, ' + Math.round(cy(st.actorAt) - nh / 2 - a * 0.55) + 'px)', size: a, op: 1, initial: who.initial, color: t[who.color] || who.color, font: S.phone ? '12px' : '10px' };
    }
    tree.legend = (S.legend || []).map(([state, label]) => {
      if (state === 'path') return { label, fill: 'transparent', ring: t.path, mark: '', ringStyle: 'solid' };
      const look = this.cellLook(state, t);
      const item = { label, fill: look.fill, ring: look.ring === 'transparent' ? 'rgba(255,255,255,0.18)' : look.ring, mark: look.mark && look.mark.length <= 2 && look.mark !== '✎' ? look.mark : '', ringStyle: 'solid' };
      if (state === 'future') Object.assign(item, { fill: t.dead, ring: t.treeEdge });
      if (state === 'out') Object.assign(item, { fill: t.dead, mark: '' });
      if (state === 'buy') Object.assign(item, { ring: t.sceneText, ringStyle: 'dashed' });
      return item;
    });
    tree.hasLegend = tree.legend.length > 0;
    return tree;
  }

  // The graph: S.graph = { nodes: [{ id, label, x, y }], edges: [{ from, to, w, directed }] }. Per step: st.nodes (id → state; a node
  // missing from the map is hidden), st.edges (edge key "from-to" → 'path', 'active', 'out' or 'hide'), st.vals (id → a short note
  // under the node: a distance, an in-degree, a parent) and st.actorAt (a node id). Nodes and the actor move by transform only.
  graphAt(S, st, t) {
    const phone = !!S.phone, B = graphBox(S, phone), byId = {};
    S.graph.nodes.forEach((n) => { byId[n.id] = n; });
    const shown = (id) => !!(st.nodes && st.nodes[id]);
    const es = st.edges || {};
    const keys = new Set(S.graph.edges.map(graphEdgeKey));
    const edges = [], weights = [], arrows = [];
    S.graph.edges.forEach((e) => {
      const key = graphEdgeKey(e), state = es[key] || '';
      const [x1, y1] = B.pos[e.from], [x2, y2] = B.pos[e.to];
      const len = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      // two one-way links between the same pair are drawn side by side
      const off = e.directed && keys.has(e.to + '-' + e.from) ? 6 : 0;
      const nx = -uy * off, ny = ux * off;
      const head = e.directed ? B.arrow : 0;
      const ax = x1 + ux * B.r + nx, ay = y1 + uy * B.r + ny, bx = x2 - ux * (B.r + head * 0.7) + nx, by = y2 - uy * (B.r + head * 0.7) + ny;
      const L = Math.max(1, Math.hypot(bx - ax, by - ay)), ang = Math.atan2(uy, ux) * 180 / Math.PI;
      const thick = state === 'path' ? 5 : state === 'active' ? 4 : 2;
      const color = state === 'path' ? t.path : state === 'active' ? t.left : t.treeEdge;
      const op = !shown(e.from) || !shown(e.to) || state === 'hide' ? 0 : state === 'out' ? 0.3 : 1;
      edges.push({ key, thick, color, op, move: 'translate(' + ax.toFixed(1) + 'px, ' + (ay - thick / 2).toFixed(1) + 'px) rotate(' + ang.toFixed(2) + 'deg) scaleX(' + (L / 100).toFixed(4) + ')' });
      if (head) {
        const tx = x2 - ux * B.r + nx, ty = y2 - uy * B.r + ny;
        arrows.push({ size: head, color, op, move: 'translate(' + (tx - head).toFixed(1) + 'px, ' + (ty - head / 2).toFixed(1) + 'px) rotate(' + ang.toFixed(2) + 'deg)' });
      }
      if (e.w != null) {
        const side = off ? 2.4 : 1;
        const wx = (x1 + x2) / 2 + nx * side - uy * B.wFont * 0.85, wy = (y1 + y2) / 2 + ny * side + ux * B.wFont * 0.85;
        weights.push({ v: String(e.w), font: B.wFont + 'px', op: op ? (state === 'out' ? 0.5 : 1) : 0, ink: state === 'active' ? t.left : t.sceneText,
          move: 'translate(' + wx.toFixed(1) + 'px, ' + wy.toFixed(1) + 'px) translate(-50%, -50%)' });
      }
    });
    const nodes = S.graph.nodes.map((n) => {
      const state = st.nodes && st.nodes[n.id];
      const look = Object.assign({}, this.cellLook(state || 'in', t));
      if (state === 'out') { look.ink = t.sceneMuted; look.op = 1; look.mark = '✗'; look.markColor = t.sceneMuted; }
      if (state === 'future') { look.fill = t.dead; look.ink = t.sceneText; look.ring = t.treeEdge; look.op = 1; }
      if (state === 'buy') look.ring = t.sceneText;
      const mark = look.mark && look.mark.length <= 2 && look.mark !== '✎' ? look.mark : '';
      const tag = st.vals && st.vals[n.id] != null ? String(st.vals[n.id]) : '';
      const [x, y] = B.pos[n.id];
      return { id: n.id, v: String(n.label), x: x - B.r, y: y - B.r, d: B.r * 2, fill: look.fill, ink: look.ink, ring: look.ring, glow: look.glow || 'none', op: state ? look.op || 1 : 0,
        grow: state ? 1 : 0.6, mark, markColor: look.markColor || t.sceneMuted, markOp: mark ? 1 : 0, tag, tagOp: tag ? 1 : 0, ringStyle: state === 'buy' ? 'dashed' : 'solid',
        font: B.font + 'px', tagFont: B.tagFont + 'px', markFont: (phone ? 12 : 10) + 'px', markSize: phone ? 16 : 14 };
    });
    const graph = { w: B.W, h: B.H, nodes, edges, arrows, weights };
    const castName = (STORY_CAST[S.cast] || {}).name || 'The guide';
    const nameOf = (id) => String(byId[id].label);
    const count = S.graph.nodes.filter((n) => shown(n.id)).length;
    const lit = S.graph.edges.filter((e) => ['path', 'active'].includes(es[graphEdgeKey(e)]) && shown(e.from) && shown(e.to));
    graph.label = (S.graphLabel || 'Graph') + ', ' + count + (count === 1 ? ' node' : ' nodes') + ' shown. ' + st.verdict.replace(/[.!?]$/, '') +
      (lit.length ? '. Highlighted: ' + lit.map((e) => nameOf(e.from) + (e.directed ? ' to ' : ' and ') + nameOf(e.to)).join(', ') : '') +
      (st.actorAt != null && byId[st.actorAt] ? '. ' + castName + ' is at ' + nameOf(st.actorAt) : '') +
      (st.vals && Object.keys(st.vals).some(shown) ? '. Notes: ' + S.graph.nodes.filter((n) => shown(n.id) && st.vals[n.id] != null).map((n) => nameOf(n.id) + ' ' + st.vals[n.id]).join(', ') : '') + '.';
    graph.actor = { move: 'translate(0px, 0px)', size: 0, op: 0, initial: '', color: 'transparent', font: '10px' };
    if (st.actorAt != null && byId[st.actorAt]) {
      const a = B.actor, who = STORY_CAST[S.cast] || { initial: '?', color: 'left' }, [x, y] = B.pos[st.actorAt];
      graph.actor = { move: 'translate(' + Math.round(x - B.r - a * 0.45) + 'px, ' + Math.round(y - B.r - a * 0.45) + 'px)', size: a, op: 1, initial: who.initial, color: t[who.color] || who.color, font: Math.max(12, Math.round(a * 0.5)) + 'px' };
    }
    graph.legend = (S.legend || []).map(([state, label]) => {
      if (state === 'path' || state === 'active') return { label, fill: state === 'path' ? t.path : t.left, ring: state === 'path' ? t.path : t.left, mark: '', ringStyle: 'solid', radius: '3px', h: '6px' };
      const look = this.cellLook(state, t);
      const item = { label, fill: look.fill, ring: look.ring === 'transparent' ? 'rgba(255,255,255,0.18)' : look.ring, mark: look.mark && look.mark.length <= 2 && look.mark !== '✎' ? look.mark : '', ringStyle: 'solid', radius: '999px', h: '14px' };
      if (state === 'future') Object.assign(item, { fill: t.dead, ring: t.treeEdge });
      if (state === 'out') Object.assign(item, { fill: t.dead, mark: '' });
      if (state === 'buy') Object.assign(item, { ring: t.sceneText, ringStyle: 'dashed' });
      return item;
    });
    graph.hasLegend = graph.legend.length > 0;
    graph.legendFont = '12px';
    graph.swatch = '14px';
    return graph;
  }

  // The actors under a row of tiles for one step (none for grids and trees).
  castAt(S, st, t) {
    const pitch = S.pitch || 0, tileW = S.tile || 0, found = st.done, boxed = S.visual === 'grid' || S.visual === 'tree' || S.visual === 'graph';
    const half = S.phone ? 14 : 28;   // half the actor box: 56px on desktop, 28px on phones (labels overflow it, centred)
    const mouthSmile = 'M20 35 Q28 41 36 35', mouthFlat = 'M21 36 L35 36';
    const actorAt = (idx, o) => Object.assign({ x: idx * pitch + tileW / 2 - half, eye: 3.2, mouth: mouthSmile, extra: '', extraFill: 'transparent', size: 40 }, o);
    let actors;
    if (boxed) {
      actors = [];
    } else if (S.cast === 'tp') {
      actors = [actorAt(st.L, { label: 'Left marker · L', color: t.left, rx: 25 }), actorAt(st.R, { label: 'Right marker · R', color: t.right, rx: 14, mouth: found ? mouthSmile : mouthFlat })];
    } else if (S.cast === 'sw') {
      const lx = st.L === st.R ? (S.phone ? -12 : -18) : 0;
      actors = [
        Object.assign(actorAt(st.L, { label: S.actorLabels[0], color: t.right, rx: 8, eye: 0, mouth: '', size: 26 }), { x: st.L * pitch + tileW / 2 - half + lx }),
        actorAt(st.R, { label: S.actorLabels[1], color: t.left, rx: 25, extra: 'M50 24 L58 28 L50 32 Z M10 30 Q2 22 8 16 Q14 22 14 30 Z', extraFill: t.sceneText })
      ];
    } else if (S.actorLabels.length > 1) {
      actors = [actorAt(st.L, { label: S.actorLabels[0], color: t.left, rx: 25 }), actorAt(st.R, { label: S.actorLabels[1], color: t.right, rx: 14, mouth: found ? mouthSmile : mouthFlat })];
    } else {
      actors = [actorAt(st.L, { label: S.actorLabels[0], color: t.left, rx: 18, extra: 'M12 14 L44 14 L40 2 L16 2 Z', extraFill: t.sceneText })];
    }
    // phones: smaller bodies, so two of them fit side by side on a 39px pitch
    if (S.phone) actors.forEach((a) => { a.size = Math.round(a.size * 0.7); });
    return actors.map((a) => Object.assign(a, { move: 'translateX(' + a.x + 'px)', shift: 'none', y: 0 }));
  }

  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = Object.assign({}, THEMES[themeKey] || THEMES.max, STORY_EXTRA[themeKey] || STORY_EXTRA.paper);
    const S = dsPhone() ? phoneScene(this.scene()) : this.scene();   // phones: the stage laid out for the screen
    const P = PROBLEMS.find((p) => p.id === S.id);
    const spec = SCENE_INPUT[S.id];
    const ask = this.state.ask, fb = this.state.fb && this.state.fb.at === this.state.step ? this.state.fb : null;
    const streak = this.state.predict ? DS.predict().streak : 0;
    const kit = Object.assign({}, KIT[S.pattern], S.kit || {});   // a story can bring its own quiz when the pattern's default is about another problem
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
    const isGrid = S.visual === 'grid', isTree = S.visual === 'tree', isGraph = S.visual === 'graph', boxed = isGrid || isTree || isGraph;
    const now = boxed ? { tiles: [], tiles2: [] } : this.tilesAt(S, st, t);
    const before = prevSt && !boxed ? this.tilesAt(S, prevSt, t) : null;
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
    const tree = isTree ? this.treeAt(S, st, t) : { w: 0, h: 0, nodes: [], edges: [], label: '', legend: [], hasLegend: false, actor: blank.actor };
    if (isTree) {
      // one focus per beat, as for tiles: nodes whose look changed grow a touch, shown nodes that did not change step back
      const old = prevSt ? this.treeAt(S, prevSt, t).nodes : null;
      const same = (a, b) => a.fill === b.fill && a.ring === b.ring && a.mark === b.mark && a.op === b.op && a.v === b.v && a.x === b.x && a.y === b.y && a.tag === b.tag;
      const changed = tree.nodes.map((x, i) => !old || !same(x, old[i]));
      const dim = !!old && changed.some(Boolean) && !changed.every(Boolean);
      tree.nodes = tree.nodes.map((x, i) => {
        const focus = dim && changed[i] && x.op > 0, back = dim && !changed[i] && x.op > 0;
        return Object.assign(x, { op: back ? Math.max(0.35, +(x.op * 0.65).toFixed(2)) : x.op, glow: back ? 'none' : x.glow,
          move: 'translate(' + x.x + 'px, ' + x.y + 'px) scale(' + (focus ? 1.06 : x.grow) + ')' });
      });
    }
    const graph = isGraph ? this.graphAt(S, st, t) : { w: 0, h: 0, nodes: [], edges: [], arrows: [], weights: [], label: '', legend: [], hasLegend: false, legendFont: '12px', swatch: '14px', actor: blank.actor };
    if (isGraph) {
      // one focus per beat: nodes whose look or note changed grow a touch, the rest step back
      const old = prevSt ? this.graphAt(S, prevSt, t).nodes : null;
      const same = (a, b) => a.fill === b.fill && a.ring === b.ring && a.mark === b.mark && a.op === b.op && a.tag === b.tag;
      const changed = graph.nodes.map((x, i) => !old || !same(x, old[i]));
      const dim = !!old && changed.some(Boolean) && !changed.every(Boolean);
      graph.nodes = graph.nodes.map((x, i) => {
        const focus = dim && changed[i] && x.op > 0, back = dim && !changed[i] && x.op > 0;
        return Object.assign(x, { op: back ? Math.max(0.4, +(x.op * 0.7).toFixed(2)) : x.op, glow: back ? 'none' : x.glow,
          move: 'translate(' + x.x + 'px, ' + x.y + 'px) scale(' + (focus ? 1.08 : x.grow) + ')' });
      });
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
      op: showFrame ? 1 : 0, vis: S.cast === 'sw' ? 'visible' : 'hidden',   // stories without a window never show it, even sliding off stage
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
    let actors = this.castAt(S, st, t), actorRowH = 60;
    if (S.phone && actors.length) {
      // the row keeps one height for the whole story, so the picture does not jump between steps
      const twoLines = steps.some((x) => phoneCast(this.castAt(S, x, t), S));
      phoneCast(actors, S);
      actors.forEach((a) => { a.move = 'translate(' + a.x + 'px, ' + a.y + 'px)'; });
      actorRowH = twoLines ? 92 : 46;
    }

    // The guide's lines have no speaker: a clear badge keeps their text lined up with the speakers' lines.
    const who = { narr: { name: '', initial: '', color: 'transparent', radius: '0' } };
    Object.keys(STORY_CAST).forEach((k) => { const c = STORY_CAST[k]; who[k] = Object.assign({}, c, { color: t[c.color] || c.color }); });
    const toneBg = { plain: t.sunk, warn: t.warnBg, cool: t.coolBg, ok: t.okBg };
    const toneBar = { plain: t.muted, warn: t.left, cool: t.right, ok: t.ok };
    const activeLine = lines[st.kind] || 0;
    // "Plan it first" above the code: the plan line for this story step is lit while the animation plays it.
    const plan = typeof planFor === 'function' ? planFor(S.id) : null;
    const planAt = plan ? planStepForKind(plan, st.kind) : -1;
    const more = PROBLEMS.filter((p) => p.pattern === S.pattern && p.id !== S.id).sort((a, b) => (!!SCENES[b.id] - !!SCENES[a.id]) || a.added - b.added).slice(0, 4);
    const quizRight = this.state.pick === kit.right;
    const ratePreview = DS.reviewPreview(S.id, { redo: !!this.state.rated });
    const pct = Math.max(0, Math.min(100, st.meter.pct));
    // One primary action at a time: Play until the story has been watched, then "Write it yourself", then Run (in the code pane).
    const tryPrimary = !onCode && atEnd && this.state.played;
    const playPrimary = !onCode && !tryPrimary;
    const btn = (primary) => ({ bg: primary ? t.accent : 'transparent', fg: primary ? t.onAccent : t.text, border: primary ? t.accent : t.line2 });

    return {
      t, ...navVals(this, t, themeKey, 'Story'), S, P, cr,
      backHref: this.fromCode ? 'Code.dc.html?problem=' + encodeURIComponent(S.id) : 'Patterns.dc.html',
      backLabel: this.fromCode ? 'Back to the problem' : 'Library',
      hasPlan: !!plan, planGoal: plan ? plan.goal : '',
      planNote: planAt >= 0 ? 'Now on plan step ' + (planAt + 1) : 'Steps light up as the story plays',
      planSteps: plan ? plan.steps.map(([text], i) => {
        const on = i === planAt;
        return { n: i + 1, text, current: on ? 'step' : 'false', bg: on ? t.hl : 'transparent', border: on ? t.accent : 'transparent', fg: on ? t.text : t.text2, num: on ? t.accent : t.muted };
      }) : [],
      solOpen: this.state.solOpen, solX: this.state.solOpen ? 'true' : 'false',
      solLabel: this.state.solOpen ? 'Hide solution' : 'Show solution', toggleSol: () => this.setState({ solOpen: !this.state.solOpen }),
      diffBg: t.diff[P.diff][1], diffFg: t.diff[P.diff][2], patternName: S.pattern,
      clock: cr.clock, clockLabel: cr.clockLabel,
      // the problem
      task: STORY_TASKS[S.id] || S.quest.join(' '),
      exampleIn: SCENES[S.id].example[0], exampleOut: SCENES[S.id].example[1].replace(/^(answer|after)\s*=\s*/, ''),
      // storyboard
      storyName: P.story, goal: S.goal,
      isLanterns: S.visual === 'lanterns', isLetters: S.visual === 'letters', isPlanks: S.visual === 'planks', isGrid, isTree, isGraph, showActors: !boxed, grid, tree, graph,
      hasRow2: !!S.items2, rowLabels: S.rowLabels || ['', ''],
      tiles, tiles2, water, frame, showFrame, frameBottom: S.visual === 'planks' ? '0' : '3px', frameBar2: S.visual === 'planks' ? 0 : 1,
      tileW, tileH: S.tileH || 84, tileGap: pitch - tileW, tileFont: (S.font || 34) + 'px',
      lanternH: Math.round(tileW * 104 / 88), lanternFont: Math.round(tileW * 38 / 88) + 'px',
      hasBoard: !!S.board, boardTitle: S.boardTitle || '', board, boardEmpty: board.length === 0,
      boardPad: S.board && !S.phone ? 170 : 0, boardVars: boardVars(S),
      actors, actorRowH, actorBoxW: S.phone ? 28 : 56, move: MOVE, settle: SETTLE,
      statusText: found ? S.status[1] : S.status[0],
      statusColor: found ? t.ok : t.sceneMuted,
      meter: { text: st.meter.text, scale: 'scaleX(' + (pct / 100).toFixed(3) + ')', markAt: Math.max(0, Math.min(100, st.meter.mark)) + '%', markLabel: st.meter.markLabel, markShift: 'translateX(-' + Math.round(Math.max(0, Math.min(100, st.meter.mark))) + '%)' },
      meterColor: toneBar[st.tone], verdict: st.verdict, verdictBg: toneBg[st.tone],
      caption: st.nar.kid,
      dialog: st.dialog.map(([k, text]) => { const w = who[k] || who.narr; return Object.assign({}, w, { text, label: w.name ? w.name + ': ' : '' }); }),
      stepLabel: 'Step ' + (si + 1) + ' of ' + steps.length,
      lastStep: steps.length - 1, stepNow: si,
      scrub: (e) => { const v = Number(e && e.target ? e.target.value : 0); this.stop(); this.go(isNaN(v) ? 0 : v); },
      onKey: (e) => this.key(e),
      atStart: si === 0, atEnd,
      prev: () => { this.stop(); this.go(si - 1); },
      next: () => this.stepNext(),
      nextOff: atEnd && !ask,
      playing: this.state.playing, paused: !this.state.playing,
      // predict the next step (off by default)
      predictOn: this.state.predict, predictX: this.state.predict ? 'true' : 'false', togglePredict: () => this.togglePredict(),
      predictLabel: this.state.predict && streak > 0 ? 'Predict · ' + streak + ' in a row' : 'Predict',
      predictBtn: { bg: this.state.predict ? t.hl : 'transparent', border: this.state.predict ? t.accent : t.line2 },
      asking: !!ask, notAsking: !ask,
      askCue: ask ? 'Next: ' + ask.cue.replace(/[.!?]$/, '') + '. What happens?' : '',
      askChoices: ask ? ask.choices.map((c, i) => ({ label: c.label, key: String(i + 1), pick: () => this.answer(i) })) : [],
      skipAsk: () => this.skipAsk(),
      hasFeedback: !!fb, feedback: fb ? fb.text : '', feedbackBg: fb && fb.ok ? t.okBg : t.warnBg,
      // try your own input (folded by default; hidden when the story has no make(input))
      hasCustom: !!spec, customOpen: !!spec && this.state.customOpen, customX: this.state.customOpen ? 'true' : 'false',
      toggleCustom: () => this.setState({ customOpen: !this.state.customOpen, runText: this.state.runText || (spec ? spec.example : '') }),
      customSummary: this.state.run ? 'running your input' : 'presets or your own values',
      customHint: spec ? spec.hint + ', like ' + spec.example : '',
      customText: this.state.runText, onCustomText: (e) => this.setState({ runText: e && e.target ? e.target.value : '', runBad: false }),
      onCustomKey: (e) => { if (e && e.key === 'Enter') { if (e.preventDefault) e.preventDefault(); this.applyRun(this.state.runText); } },
      applyCustom: () => this.applyRun(this.state.runText),
      customPresets: spec ? spec.presets.map(([label], i) => ({ label, pick: () => this.usePreset(i) })) : [],
      customMsg: this.state.runMsg, customBad: this.state.runBad ? 'true' : 'false', customMsgColor: this.state.runBad ? t.text : t.muted, customMsgBg: this.state.runBad ? t.warnBg : 'transparent', customMsgPad: this.state.runBad ? '8px 12px' : '0',
      customActive: !!this.state.run, resetCustom: () => this.resetRun(spec ? spec.example : ''),
      runTag: this.state.run ? ' · your input' : '',
      playLabel: this.state.playing ? 'Pause' : atEnd && this.state.played ? 'Replay' : 'Play',
      // Phones show the story (and its controls) first, then the problem; desktop keeps the problem on top.
      leftParts: phoneOrder(['problem', 'watch'], ['watch', 'problem']),
      spd: speedVals(this), togglePlay: () => this.togglePlay(),
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
      rates: ratePreview.map(({ grade, label, when }) => {
        const on = this.state.rated === grade;
        return { label, when, on, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.text, border: on ? t.text : t.line2, pick: () => this.rate(grade) };
      }),
      ratedMsg: this.state.rated ? 'In your Revisit queue. It comes back ' + ratePreview[this.state.rated - 1].when + '.' : 'How well do you know it now? Revisit brings it back at the right time.',
      // my notes (folded by default)
      notesOpen: this.state.notesOpen, notesX: this.state.notesOpen ? 'true' : 'false', toggleNotes: () => this.setState({ notesOpen: !this.state.notesOpen }),
      noteText: this.state.note,
      noteSummary: this.state.note.trim() ? 'saved in this browser' : 'empty',
      noteStatus: this.state.noteSaved ? (this.state.note.trim() ? 'Saved' : 'Note cleared') : 'Only you see this. It is included in the sheet backup file.',
      onNote: (e) => this.setNote(e && e.target ? e.target.value : ''),
      // right pane
      tabs: [['solution', 'Solution'], ['approaches', 'Approaches'], ['code', 'Your code']].map(([k, label]) => {
        const on = this.state.tab === k;
        return { label, on, tabId: 'pp-tab-' + k, panel: 'pp-panel-' + k, sel: on ? 'true' : 'false', bar: on ? t.accent : 'transparent', fg: on ? t.text : t.muted, pick: () => (k === 'code' ? this.openCode() : this.setState({ tab: k })) };
      }),
      onSolution: this.state.tab === 'solution', onApproaches: this.state.tab === 'approaches', onCode,
      fx: factsVals(t, S.id, !dsPhone()), ap: this.approaches.vals(t), noApproaches: !(typeof APPROACHES !== 'undefined' && APPROACHES[S.id]), codeOpened: this.state.codeOpened, codeDisplay: onCode ? 'flex' : 'none',
      langs: CODE_LANGS.map(([k, label]) => {
        const on = lang === k;
        return { label: label === 'JavaScript' ? 'JS' : label, on, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.muted, pick: () => this.runner.setLang(k) };
      }),
      code: code.map(([c, cm], i) => ({ n: i + 1, code: c, comment: cm, numColor: i + 1 === activeLine ? t.accent : t.muted })),
      codeH: code.length * CODE_LINE + 'px',
      lineMark: 'translateY(' + Math.max(0, activeLine - 1) * CODE_LINE + 'px)', lineMarkOp: activeLine ? 1 : 0,
      lineNote: activeLine && this.state.solOpen ? 'Line ' + activeLine + ' runs in this step' : '',
      watch: st.watch.map(([k, v, c], i) => {
        const was = prevSt && prevSt.watch[i] ? prevSt.watch[i][1] : v;
        const changed = String(was) !== String(v);
        return { k, v, c: t[c] || t.text, border: changed ? t.accent : t.line, bg: changed ? t.hl : 'transparent' };
      }),
      cx: { time: S.complexity[0][0], timeWhy: S.complexity[0][1], space: S.complexity[1][0], spaceWhy: S.complexity[1][1] }
    };
  }
}
