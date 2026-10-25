// ---------- Tries: the filer, who files every word letter by letter ----------
// A trie is drawn with visual: 'tree'. A branch appears the moment the filer adds it, so the tree grows as words go in.

// The Word Cabinet — Implement Trie (Prefix Tree)
function trieScene() {
  const ops = [['insert', 'cat'], ['insert', 'car'], ['insert', 'dog'], ['search', 'car'], ['search', 'ca'], ['startsWith', 'ca'], ['startsWith', 'cow']];
  const idOf = (p) => (p === '' ? 'root' : p);
  const list = [{ id: 'root', label: '•', parent: null }];
  ops.filter(([op]) => op === 'insert').forEach(([, w]) => {
    for (let i = 1; i <= w.length; i++) { const p = w.slice(0, i); if (!list.some((n) => n.id === p)) list.push({ id: p, label: p[i - 1], parent: idOf(p.slice(0, -1)) }); }
  });
  const made = new Set(['root']), ends = new Set(), steps = [], results = [];
  let trail = ['root'], tags = {}, calls = 0;
  const callText = (op, w) => op + '("' + w + '")';
  const snap = (kind, op, w, ch, extra) => {
    const nodes = {}, edge = {};
    made.forEach((id) => { nodes[id] = ends.has(id) ? 'ok' : 'in'; });
    trail.forEach((id, i) => { nodes[id] = i === trail.length - 1 ? 'cur' : 'paint'; if (id !== 'root') edge[id] = 'path'; });
    const at = trail[trail.length - 1];
    return Object.assign({ kind, nodes, edge, tags: Object.assign({}, tags), actorAt: at, call: op ? callText(op, w) : '—', letter: ch || '—', node: at === 'root' ? 'root' : at, calls, results: results.slice(), words: ends.size }, extra);
  };
  steps.push(snap('intro', null, '', '', {
    dialog: [say('narr', 'The filer files words in a cabinet shaped like a tree. Every step down is one letter.'), say('filer', 'Words that start the same share the same first branches.'), say('narr', 'And how do you know a whole word ends somewhere?'), say('filer', 'I put a tick on the last letter.')],
    nar: { kid: 'The filer keeps words in a tree. Each step down the tree is one letter. A tick marks the spot where a whole word ends.', builder: 'The root is empty. Each node maps a letter to a child node and has an end-of-word flag.', expert: 'A trie stores shared beginnings once. insert, search and startsWith each cost O(length of the word), no matter how many words are stored.' } }));
  for (const [op, w] of ops) {
    trail = ['root']; tags = {};
    if (op === 'insert') {
      for (let i = 0; i < w.length; i++) {
        const p = w.slice(0, i + 1), ch = w[i], from = i ? '“' + w[i - 1] + '”' : 'the top';
        if (!made.has(p)) {
          made.add(p); trail.push(p);
          steps.push(snap('grow', op, w, ch, {
            dialog: [say('filer', 'There is no “' + ch + '” under ' + from + ' yet.'), say('narr', 'Then add a new branch for it.')],
            nar: { kid: 'There is no “' + ch + '” branch under ' + from + ' yet, so the filer adds one and steps onto it.', builder: '"' + ch + '" not in node → node["' + ch + '"] = {}; node = node["' + ch + '"].', expert: 'A new node is made only for letters no earlier word shared. Inserting costs O(length), plus one node per new letter.' } }));
        } else {
          trail.push(p);
          steps.push(snap('walk', op, w, ch, {
            dialog: [say('filer', 'The “' + ch + '” branch is already here.'), say('narr', 'Another word made it. Just step down.')],
            nar: { kid: 'The “' + ch + '” branch is already there, because an earlier word starts the same way. The filer just steps down it.', builder: '"' + ch + '" in node → node = node["' + ch + '"]. Nothing new is made.', expert: 'Shared beginnings are stored once. That is why a trie of many similar words stays small.' } }));
        }
      }
      ends.add(w); calls++; results.push('null');
      steps.push(snap('mark', op, w, '', {
        dialog: [say('filer', 'That was the last letter of “' + w + '”.'), say('narr', 'Tick it. A whole word ends here.')],
        nar: { kid: 'That was the last letter of “' + w + '”. The filer puts a tick here, so he knows a whole word ends at this spot.', builder: 'node["$"] = True. insert("' + w + '") is done.', expert: 'The tick matters: “ca” is a path in the tree, but it is not a word until something marks it.' } }));
      continue;
    }
    let missed = false;
    for (let i = 0; i < w.length; i++) {
      const p = w.slice(0, i + 1), ch = w[i];
      if (!made.has(p)) {
        const at = trail[trail.length - 1];
        tags[at] = 'no “' + ch + '”'; calls++; results.push('False');
        const last = calls === ops.length;
        steps.push(snap('miss', op, w, ch, {
          done: last,
          dialog: [say('filer', 'There is no “' + ch + '” branch here.'), say('narr', 'Then no stored word starts with “' + p + '”. ' + (op === 'search' ? 'search' : 'startsWith') + ' gives False.')],
          nar: { kid: 'There is no “' + ch + '” branch under “' + w.slice(0, i) + '”. No word starts with “' + p + '”, so the answer is False.', builder: '"' + ch + '" not in node → _walk returns None → ' + op + '("' + w + '") = False.', expert: 'A missing branch ends the walk at once. It took ' + (i + 1) + ' look' + (i ? 's' : '') + ', whatever the number of stored words.' } }));
        missed = true;
        break;
      }
      trail.push(p);
      steps.push(snap('look', op, w, ch, {
        dialog: [say('filer', op === 'search' ? 'Looking for “' + w + '”. Letter “' + ch + '” is here.' : 'Does any word start with “' + w + '”? Letter “' + ch + '” is here.'), say('narr', 'Step down and check the next letter.')],
        nar: { kid: 'The filer follows the letters of “' + w + '”. The “' + ch + '” branch is there, so he steps down it.', builder: '"' + ch + '" in node → node = node["' + ch + '"].', expert: 'Searching never looks sideways at other words. It only follows one branch per letter.' } }));
    }
    if (missed) continue;
    const at = trail[trail.length - 1];
    calls++;
    if (op === 'search') {
      const ok = ends.has(at);
      results.push(ok ? 'True' : 'False');
      const st = snap('word', op, w, '', {
        dialog: [say('filer', 'I’m at the end of “' + w + '”. ' + (ok ? 'There is a tick here.' : 'There is no tick here.')), say('narr', ok ? 'So “' + w + '” is a stored word. True.' : '“' + w + '” is only the start of a word. False.')],
        nar: { kid: ok ? 'All the letters of “' + w + '” are there, and the last one has a tick. “' + w + '” is a stored word, so the answer is True.' : 'All the letters of “' + w + '” are there, but there is no tick on the last one. It is only the start of other words, so the answer is False.', builder: 'search("' + w + '"): the walk ends on a node; "$" in node is ' + (ok ? 'True' : 'False') + '.', expert: 'search needs the tick; startsWith does not. That one flag is the whole difference between the two calls.' } });
      st.nodes[at] = ok ? 'best' : 'hit';
      steps.push(st);
    } else {
      results.push('True');
      const st = snap('prefix', op, w, '', {
        dialog: [say('filer', 'Every letter of “' + w + '” is in the tree.'), say('narr', 'startsWith only needs the path. True.')],
        nar: { kid: 'Every letter of “' + w + '” is in the tree, so some stored word starts with “' + w + '”. The answer is True. No tick needed.', builder: 'startsWith("' + w + '"): _walk returns a node, not None → True.', expert: 'Words below this node, here ' + listAnd(Array.from(ends).filter((x) => x.startsWith(w)).map((x) => '“' + x + '”')) + ', all share the prefix.' } });
      st.nodes[at] = 'best';
      steps.push(st);
    }
  }
  const T = { intro: ['An empty cabinet', 'plain'], grow: ['No branch for this letter → add one', 'cool'], walk: ['Branch already there → step down', 'cool'], mark: ['Last letter → tick: a word ends here', 'ok'], look: ['Letter found → step down', 'cool'], miss: ['Letter missing → False', 'warn'], word: ['End of the word: is there a tick?', 'warn'], prefix: ['Whole prefix found → True', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'calls answered: ' + st.calls + ' / ' + ops.length, pct: (st.calls / ops.length) * 100, mark: 100, markLabel: 'all ' + ops.length + ' calls' };
    const last = st.results.length ? st.results[st.results.length - 1] : '—';
    st.watch = [['call', st.call, 'left'], ['letter', st.letter === '—' ? '—' : '“' + st.letter + '”', 'left'], ['node', st.node, 'right'], ['words stored', st.words, 'text'], ['answers', '[' + st.results.filter((x) => x !== 'null').join(', ') + ']', 'text'], ['last result', last, st.done ? 'ok' : 'text']];
    ['call', 'letter', 'node', 'calls', 'results', 'words'].forEach((k) => delete st[k]);
  });
  const code = {
    py: [['class Trie:', ''], ['    def __init__(self):', ''], ['        self.root = {}', '  # letter → child; "$" marks a word end', 'intro'], ['    def insert(self, word):', ''], ['        node = self.root', ''], ['        for ch in word:', ''], ['            if ch not in node:', ''], ['                node[ch] = {}', '  # a new branch', 'grow'], ['            node = node[ch]', '', 'walk'], ['        node["$"] = True', '  # a whole word ends here', 'mark'], ['    def _walk(self, text):', ''], ['        node = self.root', ''], ['        for ch in text:', ''], ['            if ch not in node:', ''], ['                return None', '  # no such branch', 'miss'], ['            node = node[ch]', '', 'look'], ['        return node', ''], ['    def search(self, word):', ''], ['        node = self._walk(word)', ''], ['        return node is not None and "$" in node', '', 'word'], ['    def startsWith(self, prefix):', ''], ['        return self._walk(prefix) is not None', '', 'prefix']],
    java: [['class Trie {', ''], ['    Trie[] kids = new Trie[26];', '  // one slot per letter', 'intro'], ['    boolean end;', '  // a whole word ends here'], ['    public void insert(String word) {', ''], ['        Trie node = this;', ''], ['        for (char ch : word.toCharArray()) {', ''], ['            if (node.kids[ch - \'a\'] == null)', ''], ['                node.kids[ch - \'a\'] = new Trie();', '  // a new branch', 'grow'], ['            node = node.kids[ch - \'a\'];', '', 'walk'], ['        }', ''], ['        node.end = true;', '', 'mark'], ['    }', ''], ['    Trie walk(String s) {', ''], ['        Trie node = this;', ''], ['        for (char ch : s.toCharArray()) {', ''], ['            if (node.kids[ch - \'a\'] == null) return null;', '  // no such branch', 'miss'], ['            node = node.kids[ch - \'a\'];', '', 'look'], ['        }', ''], ['        return node;', ''], ['    }', ''], ['    public boolean search(String word) {', ''], ['        Trie node = walk(word);', ''], ['        return node != null && node.end;', '', 'word'], ['    }', ''], ['    public boolean startsWith(String prefix) {', ''], ['        return walk(prefix) != null;', '', 'prefix'], ['    }', ''], ['}', '']],
    cpp: [['class Trie {', ''], ['    Trie* kids[26] = {};', '  // one slot per letter', 'intro'], ['    bool end = false;', '  // a whole word ends here'], ['    Trie* walk(const string& s) {', ''], ['        Trie* node = this;', ''], ['        for (char ch : s) {', ''], ['            if (!node->kids[ch - \'a\']) return nullptr;', '  // no such branch', 'miss'], ['            node = node->kids[ch - \'a\'];', '', 'look'], ['        }', ''], ['        return node;', ''], ['    }', ''], ['public:', ''], ['    void insert(string word) {', ''], ['        Trie* node = this;', ''], ['        for (char ch : word) {', ''], ['            if (!node->kids[ch - \'a\'])', ''], ['                node->kids[ch - \'a\'] = new Trie();', '  // a new branch', 'grow'], ['            node = node->kids[ch - \'a\'];', '', 'walk'], ['        }', ''], ['        node->end = true;', '', 'mark'], ['    }', ''], ['    bool search(string word) {', ''], ['        Trie* node = walk(word);', ''], ['        return node && node->end;', '', 'word'], ['    }', ''], ['    bool startsWith(string prefix) { return walk(prefix) != nullptr; }', '', 'prefix'], ['};', '']],
    js: [['class Trie {', ''], ['  constructor() {', ''], ['    this.root = { kids: {}, end: false };', '  // end: a word ends here', 'intro'], ['  }', ''], ['  insert(word) {', ''], ['    let node = this.root;', ''], ['    for (const ch of word) {', ''], ['      if (!node.kids[ch])', ''], ['        node.kids[ch] = { kids: {}, end: false };', '  // a new branch', 'grow'], ['      node = node.kids[ch];', '', 'walk'], ['    }', ''], ['    node.end = true;', '', 'mark'], ['  }', ''], ['  walk(text) {', ''], ['    let node = this.root;', ''], ['    for (const ch of text) {', ''], ['      if (!node.kids[ch]) return null;', '  // no such branch', 'miss'], ['      node = node.kids[ch];', '', 'look'], ['    }', ''], ['    return node;', ''], ['  }', ''], ['  search(word) {', ''], ['    const node = this.walk(word);', ''], ['    return node !== null && node.end;', '', 'word'], ['  }', ''], ['  startsWith(prefix) {', ''], ['    return this.walk(prefix) !== null;', '', 'prefix'], ['  }', ''], ['}', '']],
    go: [['type Trie struct {', ''], ['    kids [26]*Trie', '  // one slot per letter', 'intro'], ['    end  bool', '  // a whole word ends here'], ['}', ''], ['func Constructor() Trie { return Trie{} }', ''], ['func (t *Trie) Insert(word string) {', ''], ['    node := t', ''], ['    for _, ch := range word {', ''], ['        if node.kids[ch-\'a\'] == nil {', ''], ['            node.kids[ch-\'a\'] = &Trie{}', '  // a new branch', 'grow'], ['        }', ''], ['        node = node.kids[ch-\'a\']', '', 'walk'], ['    }', ''], ['    node.end = true', '', 'mark'], ['}', ''], ['func (t *Trie) walk(s string) *Trie {', ''], ['    node := t', ''], ['    for _, ch := range s {', ''], ['        if node.kids[ch-\'a\'] == nil {', ''], ['            return nil', '  // no such branch', 'miss'], ['        }', ''], ['        node = node.kids[ch-\'a\']', '', 'look'], ['    }', ''], ['    return node', ''], ['}', ''], ['func (t *Trie) Search(word string) bool {', ''], ['    node := t.walk(word)', ''], ['    return node != nil && node.end', '', 'word'], ['}', ''], ['func (t *Trie) StartsWith(prefix string) bool {', ''], ['    return t.walk(prefix) != nil', '', 'prefix'], ['}', '']]
  };
  return {
    id: 'implement-trie-prefix-tree', pattern: 'Tries', cast: 'filer', short: 'Cabinet', visual: 'tree', items: [], tree: list, tags: true,
    treeLabel: 'Word tree', legend: [['in', 'a letter'], ['ok', 'a word ends here'], ['cur', 'The filer is here'], ['path', 'letters followed']],
    goal: 'File words letter by letter, then look them up', status: ['Filing words…', 'All calls answered'],
    lines: tagLines(code), code,
    rules: [['Start with an empty cabinet', 'intro'], ['Inserting, letter missing → add a branch', 'grow'], ['Inserting, letter there → step down', 'walk'], ['Inserting, no letters left → tick the end', 'mark'], ['Looking up, letter there → step down', 'look'], ['Looking up, letter missing → False', 'miss'], ['search done → True only if ticked', 'word'], ['startsWith done → True', 'prefix']],
    predictFull: true,
    complexity: [['O(L)', 'each call follows one branch per letter of its word'], ['O(total letters)', 'one node per new letter ever inserted']],
    quest: ['The filer files three words in his cabinet: cat, car and dog. Then four questions come in.', 'Is “car” a word? Is “ca” a word? Does any word start with “ca”? Does any word start with “cow”?'],
    example: ['insert cat, car, dog; search car, search ca; startsWith ca, startsWith cow', 'answer = [True, False, True, False]'],
    hints: ['“cat and car start the same. Should their first two letters be stored twice?”', '“Make a tree where each step down is one letter. Shared beginnings share branches.”', '“insert: walk the letters, adding branches as needed, then tick the last node. search: walk, then check the tick. startsWith: just walk.”'],
    clues: ['many words that share beginnings', 'lookups by the letters typed so far', 'a whole word versus the start of one'],
    kit: { right: 1, spot: 'Why a letter tree, not a list of words?', ask: 'How should the filer file the words?',
      quiz: [['A list of words', 'Check every stored word against the question'], ['A tree of letters', 'One branch per letter, shared by words that start the same'], ['A set of whole words', 'Store each word once and look it up'], ['Sort the words', 'Keep them in order and halve the list']] },
    quizFb: ['“That reads every word for every question. With a million words it crawls.”', '“Yes! One branch per letter. A lookup follows only the letters you ask about.”', '“A set answers search, but not startsWith: “ca” is not stored as a word.”', '“Sorting helps with prefixes, but each look still costs log n word comparisons.”'],
    steps
  };
}

SCENE_REGISTRY.push(trieScene);
PATTERN_KITS['Tries'] = { right: 1, spot: 'Why a letter tree?', ask: 'How should the filer file the words?',
  quiz: [['A list of words', 'Check every stored word against the question'], ['A tree of letters', 'One branch per letter, shared by words that start the same'], ['A set of whole words', 'Store each word once and look it up'], ['Sort the words', 'Keep them in order and halve the list']] };
STORY_CAST.filer = { name: 'Filer', initial: 'F', color: 'left', radius: '6px' };
