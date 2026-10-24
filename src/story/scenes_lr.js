// ---------- Hash Map with a line: LRU Cache, Cleo's coat rack with three hooks ----------
// The tiles are the line of keys from newest (left) to oldest (right); the side board is the map from key to value.

// The Three-Hook Coat Rack — LRU Cache
function lruScene() {
  const cap = 3;
  const ops = [['put', 1, 10], ['put', 2, 20], ['put', 3, 30], ['get', 1], ['put', 4, 40], ['get', 2], ['get', 3], ['put', 5, 50]];
  const line = [], map = new Map(), steps = [], out = [];
  let calls = 0;
  const callText = (o) => o[0] + '(' + o.slice(1).join(', ') + ')';
  const snap = (kind, o, L, mark, extra) => {
    const vals = Array.from({ length: cap }, (_, i) => (i < line.length ? line[i] + ':' + map.get(line[i]) : '—'));
    const board = Array.from(map.entries()).map(([k, v]) => ['key ' + k, String(v), mark && mark.key === k ? mark.flag : '']);
    return Object.assign({ kind, L, vals, board, used: line.length, call: o ? callText(o) : '—', key: o ? o[1] : '—', calls, outs: out.slice(), oldest: line.length ? line[line.length - 1] : '—' }, extra);
  };
  steps.push(snap('intro', null, 0, null, {
    dialog: [say('hoot', 'Cleo’s rack has three hooks. When it is full, the coat nobody touched for longest goes to storage.'), say('cleo', 'My ticket book finds any coat at once. The rack keeps them in order of use.'), say('hoot', 'So you need both?'), say('cleo', 'The book is fast to look up. The order says who goes first.')],
    nar: { kid: 'Cleo’s rack holds three coats. The newest is on the left. Her ticket book (the box on the right) finds any coat at once.', builder: 'A map from key to value gives O(1) lookups. A line kept in order of use gives the oldest key in O(1).', expert: 'An LRU cache pairs a hash map with a doubly linked list. Moving a node to the front and dropping the back are both O(1).' } }));
  for (const o of ops) {
    const [op, key, val] = o;
    if (op === 'get') {
      if (!map.has(key)) {
        calls++; out.push(-1);
        steps.push(snap('miss', o, 0, null, {
          dialog: [say('cleo', 'Ticket ' + key + '? It is not in my book.'), say('hoot', 'Then get gives -1. Nothing moves.')],
          nar: { kid: 'Someone asks for coat ' + key + ', but it is not in Cleo’s book. The answer is -1, and the rack stays as it is.', builder: 'key ' + key + ' not in map → return -1.', expert: 'A miss changes nothing. Only keys that are used move to the front.' } }));
        continue;
      }
      const at = line.indexOf(key);
      line.splice(at, 1); line.unshift(key);
      calls++; out.push(map.get(key));
      steps.push(snap('hit', o, 0, { key, flag: 'hit' }, {
        dialog: [say('cleo', 'Ticket ' + key + ' is in my book: ' + map.get(key) + '.'), say('hoot', 'It was just used, so move it to the newest hook.')],
        nar: { kid: 'Coat ' + key + ' is in the book, so Cleo hands back ' + map.get(key) + '. It was just used, so it moves to the newest hook on the left.', builder: 'key ' + key + ' in map → move it to the front, return ' + map.get(key) + '.', expert: 'With a linked list, moving a node is O(1): unhook it from its neighbours and hook it at the front. The map points straight to the node.' } }));
      continue;
    }
    if (map.has(key)) {
      line.splice(line.indexOf(key), 1);
    } else if (line.length === cap) {
      const old = line[line.length - 1];
      steps.push(snap('evict', o, cap - 1, { key: old, flag: 'zero' }, {
        dialog: [say('cleo', 'The rack is full and coat ' + key + ' is coming.'), say('hoot', 'Coat ' + old + ' was touched longest ago. It goes to storage.')],
        nar: { kid: 'The rack is full. Coat ' + old + ', on the right, has gone longest without being used, so Cleo takes it off and crosses it out of her book.', builder: 'len == capacity → drop the oldest key, ' + old + ', from the line and from the map.', expert: 'The back of the line is always the least recently used key, so finding it costs O(1). No search is needed.' } }));
      line.pop(); map.delete(old);
    }
    line.unshift(key); map.set(key, val);
    calls++; out.push(null);
    steps.push(snap('put', o, 0, { key, flag: 'fresh' }, {
      done: calls === ops.length,
      dialog: [say('cleo', 'Coat ' + key + ' goes on the newest hook, with value ' + val + '.'), say('hoot', 'And into the book, so you can find it later.')],
      nar: { kid: 'Coat ' + key + ' goes on the newest hook, on the left, and into Cleo’s book with value ' + val + '. ' + (line.length === cap ? 'The rack is full now.' : 'There ' + (cap - line.length === 1 ? 'is 1 free hook.' : 'are ' + (cap - line.length) + ' free hooks.')), builder: 'map[' + key + '] = ' + val + ', and key ' + key + ' goes to the front of the line.', expert: 'Every put and get touches a constant number of links and one map entry, so both run in O(1).' } }));
  }
  const T = { intro: ['Three empty hooks', 'plain'], put: ['New coat → newest hook', 'cool'], hit: ['Found → hand it back, move to newest', 'ok'], miss: ['Not in the book → -1', 'warn'], evict: ['Rack full → oldest coat leaves', 'warn'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.cells = st.vals.map((v, i) => {
      if (v === '—') return 'future';
      if (st.kind === 'evict' && i === cap - 1) return 'hit';
      if (st.kind !== 'intro' && st.kind !== 'miss' && i === 0) return st.kind === 'hit' ? 'ok' : 'cur';
      return 'in';
    });
    st.meter = { text: 'calls answered: ' + st.calls + ' / ' + ops.length, pct: (st.calls / ops.length) * 100, mark: 100, markLabel: 'all ' + ops.length + ' calls' };
    const last = st.outs.length ? st.outs[st.outs.length - 1] : '—';
    st.watch = [['call', st.call, 'left'], ['key', st.key, 'left'], ['hooks used', st.used + ' / ' + cap, 'right'], ['oldest', st.oldest, 'right'], ['answers', '[' + st.outs.map((x) => (x == null ? 'null' : x)).join(', ') + ']', 'text'], ['returned', last == null ? 'null' : last, st.done ? 'ok' : 'text']];
    ['used', 'call', 'key', 'calls', 'outs', 'oldest'].forEach((k) => delete st[k]);
  });
  const code = {
    py: [['class LRUCache:', ''], ['    def __init__(self, capacity):', ''], ['        self.cap = capacity', ''], ['        self.order = OrderedDict()', '  # key → value, oldest first', 'intro'], ['    def get(self, key):', ''], ['        if key not in self.order:', ''], ['            return -1', '  # not in the book', 'miss'], ['        self.order.move_to_end(key)', '  # just used: newest', 'hit'], ['        return self.order[key]', ''], ['    def put(self, key, value):', ''], ['        if key in self.order:', ''], ['            self.order.move_to_end(key)', ''], ['        elif len(self.order) == self.cap:', ''], ['            self.order.popitem(last=False)', '  # drop the oldest', 'evict'], ['        self.order[key] = value', '  # newest', 'put']],
    java: [['class LRUCache {', ''], ['    int cap;', ''], ['    LinkedHashMap<Integer, Integer> order = new LinkedHashMap<>();', '  // oldest first', 'intro'], ['    LRUCache(int capacity) { cap = capacity; }', ''], ['    int get(int key) {', ''], ['        if (!order.containsKey(key)) return -1;', '  // not in the book', 'miss'], ['        int v = order.remove(key);', ''], ['        order.put(key, v);', '  // just used: newest', 'hit'], ['        return v;', ''], ['    }', ''], ['    void put(int key, int value) {', ''], ['        if (order.containsKey(key)) order.remove(key);', ''], ['        else if (order.size() == cap)', ''], ['            order.remove(order.keySet().iterator().next());', '  // drop the oldest', 'evict'], ['        order.put(key, value);', '  // newest', 'put'], ['    }', ''], ['}', '']],
    cpp: [['class LRUCache {', ''], ['    int cap;', ''], ['    list<pair<int, int>> order;', '  // newest at the front', 'intro'], ['    unordered_map<int, list<pair<int, int>>::iterator> where;', ''], ['public:', ''], ['    LRUCache(int capacity) : cap(capacity) {}', ''], ['    int get(int key) {', ''], ['        if (!where.count(key)) return -1;', '  // not in the book', 'miss'], ['        order.splice(order.begin(), order, where[key]);', '  // just used: newest', 'hit'], ['        return where[key]->second;', ''], ['    }', ''], ['    void put(int key, int value) {', ''], ['        if (where.count(key)) order.erase(where[key]);', ''], ['        else if ((int)order.size() == cap) {', ''], ['            where.erase(order.back().first);', '  // drop the oldest', 'evict'], ['            order.pop_back();', ''], ['        }', ''], ['        order.push_front({key, value});', '  // newest', 'put'], ['        where[key] = order.begin();', ''], ['    }', ''], ['};', '']],
    js: [['class LRUCache {', ''], ['  constructor(capacity) {', ''], ['    this.cap = capacity;', ''], ['    this.order = new Map();', '  // keeps insertion order: oldest first', 'intro'], ['  }', ''], ['  get(key) {', ''], ['    if (!this.order.has(key)) return -1;', '  // not in the book', 'miss'], ['    const v = this.order.get(key);', ''], ['    this.order.delete(key);', ''], ['    this.order.set(key, v);', '  // just used: newest', 'hit'], ['    return v;', ''], ['  }', ''], ['  put(key, value) {', ''], ['    if (this.order.has(key)) this.order.delete(key);', ''], ['    else if (this.order.size === this.cap)', ''], ['      this.order.delete(this.order.keys().next().value);', '  // drop the oldest', 'evict'], ['    this.order.set(key, value);', '  // newest', 'put'], ['  }', ''], ['}', '']],
    go: [['type pair struct{ key, val int }', ''], ['type LRUCache struct {', ''], ['    cap   int', ''], ['    order *list.List', '  // newest at the front', 'intro'], ['    where map[int]*list.Element', ''], ['}', ''], ['func Constructor(capacity int) LRUCache {', ''], ['    return LRUCache{capacity, list.New(), map[int]*list.Element{}}', ''], ['}', ''], ['func (c *LRUCache) Get(key int) int {', ''], ['    e, ok := c.where[key]', ''], ['    if !ok {', ''], ['        return -1', '  // not in the book', 'miss'], ['    }', ''], ['    c.order.MoveToFront(e)', '  // just used: newest', 'hit'], ['    return e.Value.(pair).val', ''], ['}', ''], ['func (c *LRUCache) Put(key, value int) {', ''], ['    if e, ok := c.where[key]; ok {', ''], ['        c.order.Remove(e)', ''], ['    } else if c.order.Len() == c.cap {', ''], ['        old := c.order.Back()', ''], ['        delete(c.where, old.Value.(pair).key)', '  // drop the oldest', 'evict'], ['        c.order.Remove(old)', ''], ['    }', ''], ['    c.where[key] = c.order.PushFront(pair{key, value})', '  // newest', 'put'], ['}', '']]
  };
  return {
    id: 'lru-cache', pattern: 'Hash Map', cast: 'hm', short: 'Coat rack', visual: 'letters', items: ['—', '—', '—'], pitch: 104, tile: 88, tileH: 64, gap: 16, font: 24, width: 296,
    board: true, boardTitle: 'Cleo’s book',
    actorLabels: ['Cleo'],
    goal: 'Keep the three most recently used coats', status: ['Serving guests…', 'All calls answered'],
    lines: tagLines(code), code,
    rules: [['Start with three empty hooks', 'intro'], ['put, new key → hang it on the newest hook', 'put'], ['put on a full rack → the oldest coat leaves first', 'evict'], ['get, key in the book → hand it back and make it newest', 'hit'], ['get, key not in the book → -1', 'miss']],
    predictFull: true,
    complexity: [['O(1)', 'per get or put: one map lookup and a few links'], ['O(capacity)', 'one map entry and one list node per key']],
    quest: ['Cleo’s coat rack has three hooks. Guests call put(key, value) to hang a coat and get(key) to ask for one back.', 'When the rack is full, the coat that went longest without being used goes to storage. Calls: put 1, put 2, put 3, get 1, put 4, get 2, get 3, put 5.'],
    example: ['capacity = 3; put(1,10), put(2,20), put(3,30), get(1), put(4,40), get(2), get(3), put(5,50)', 'answer = [null, null, null, 10, null, -1, 30, null]'],
    hints: ['Old Hoot: “Two questions keep coming: where is coat 3, and which coat is oldest? Can one tool answer both fast?”', '“A map answers ‘where is it’ in one step. A line in order of use answers ‘which is oldest’ in one step.”', '“get: if the key is in the map, move it to the front and return it. put: if the rack is full, drop the back; then add the key at the front.”'],
    clues: ['both calls must be O(1)', 'the least recently used key leaves first', 'a get counts as a use'],
    kit: { right: 3, spot: 'Why a map and a line together?', ask: 'How should Cleo run the rack?',
      quiz: [['A plain list', 'Keep coats in a list and search it on every call'], ['A map alone', 'Keys to values, nothing else'], ['A timestamp on each coat', 'Write the time of last use, and look for the oldest when full'], ['A map plus a line in order of use', 'The map finds a coat, the line knows the oldest']] },
    quizFb: ['Old Hoot: “Searching a list costs O(n) per call. The problem asks for O(1).”', 'Old Hoot: “A map finds coats fast, but it cannot tell you which one is oldest.”', 'Old Hoot: “Finding the oldest timestamp means checking every coat: O(n) on a full rack.”', 'Old Hoot: “Yes! The map finds any coat in one step, and the line’s back is always the oldest.”'],
    steps
  };
}

SCENE_REGISTRY.push(lruScene);
