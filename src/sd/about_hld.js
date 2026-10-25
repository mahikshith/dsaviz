// About-this-lesson content for the System design (high-level design) track. Our own writing; facts checked against the sources listed per lesson.
const SD_ABOUT_HLD = {
  scale: {
    what: 'Scaling means making an app cope with more users. You can buy one bigger computer, which is scaling up. Or you can add more ordinary computers, which is scaling out.',
    analogy: 'A small cafe gets busy. You can hire one very fast cook, or hire several normal cooks who share the orders.',
    uses: ['Photo and video apps that grow from a few friends to millions of people', 'Online shops that must stay open during a big sale', 'Ticket sites that get a huge rush the minute tickets go on sale'],
    before: ['What a server is', 'What a database is'],
    words: [
      ['server', 'A computer that waits for requests from users and sends back answers.'],
      ['request', 'One message from a user, such as "show me this page".'],
      ['load balancer', 'A helper in front of the servers that hands each request to one of them.'],
      ['stateless', 'A server that keeps no user data in its own memory, so any server can answer any user.'],
      ['spare', 'An extra server kept ready so the app survives when another one fails.']
    ],
    math: {
      lines: ['\\text{requests per second} = \\frac{U \\times R}{86{,}400}', '\\text{servers} = \\left\\lceil \\frac{Q}{C} \\right\\rceil + 1'],
      symbols: [
        ['U', 'how many users there are'],
        ['R', 'how many requests each user makes in one day'],
        ['86{,}400', 'the number of seconds in one day'],
        ['Q', 'requests per second the whole app receives'],
        ['C', 'requests per second one server can handle'],
        ['\\lceil \\; \\rceil', 'round up to the next whole number'],
        ['+ 1', 'one spare server']
      ],
      example: [
        'Say 100,000 users each make 2,000 requests a day.',
        'That is 100,000 × 2,000 = 200,000,000 requests a day.',
        'Divide by 86,400 seconds. You get about 2,315 requests every second.',
        'One server handles 1,000 a second. 2,315 ÷ 1,000 = 2.3, which rounds up to 3.',
        'Add one spare and you need 4 servers.'
      ]
    },
    steps: [
      'Start with one server and one database. This is simple and enough for a small app.',
      'Count your requests per second and compare it with what one server can handle.',
      'Scale up first if it is cheap: buy a bigger machine. Nothing else changes.',
      'When one machine is not enough, scale out. Run many copies of the same server code.',
      'Put a load balancer in front and keep shared data in the database, not in server memory.'
    ],
    use: ['One machine is near its limit and traffic is still growing.', 'The app must stay up even when one server breaks.'],
    avoid: ['Scaling out a tiny app that one small server handles with ease.', 'Scaling out before the servers are stateless. Users would lose their data when a request lands elsewhere.'],
    mistakes: [
      'Guessing the load instead of counting it. Do the per-second math first.',
      'Keeping user data in server memory. A second server will not know it.',
      'Having no spare. One failure then pushes the other servers past their limit.'
    ],
    cheat: ['up = bigger machine', 'out = more machines', 'requests a day / 86,400 = per second', 'servers keep no state', 'always keep one spare'],
    next: ['lb', 'cache', 'replicas'],
    sources: ['Google Cloud Architecture Framework, Reliability pillar: scalability and redundancy guidance', 'AWS Well-Architected Framework, Reliability and Performance pillars (horizontal scaling)', 'Kleppmann, Designing Data-Intensive Applications, 2017, ch. 1 (describing load)']
  },
  lb: {
    what: 'A load balancer sits in front of your servers. Users only know its address. It sends each request to one healthy server, so no single server gets all the work.',
    analogy: 'Think of the host at a restaurant door. The host points each new group to a table that is free.',
    uses: ['Big websites that run many identical servers', 'Video call and chat apps that spread many connections', 'Online banks that must keep working when a server breaks'],
    before: ['scale'],
    words: [
      ['round robin', 'Send requests to servers in turn: 1, 2, 3, then 1 again.'],
      ['least connections', 'Send the next request to the server with the fewest requests open right now.'],
      ['health check', 'A small test message sent often to see if a server still answers.'],
      ['layer 4', 'Balancing that only looks at addresses and ports, not at what the request says.'],
      ['layer 7', 'Balancing that reads the request itself, such as the page path, before choosing a server.'],
      ['sticky', 'Sending the same user to the same server every time.']
    ],
    math: null,
    steps: [
      'Users send every request to the load balancer address.',
      'The load balancer picks a server using a rule such as round robin or least connections.',
      'It forwards the request and passes the answer back to the user.',
      'Every few seconds it runs a health check on each server.',
      'A server that fails its checks gets no new requests until it passes again.'
    ],
    use: ['You run two or more servers with the same code.', 'You want to remove or add servers without users noticing.'],
    avoid: ['Using sticky routing when you can keep shared data in a database or cache instead.', 'Using round robin when some requests take far longer than others.'],
    mistakes: [
      'Running only one load balancer. If it fails, everything fails. Run at least two.',
      'Skipping health checks, so users keep being sent to a dead server.',
      'Using round robin with very uneven jobs. One server gets stuck while others sit idle.'
    ],
    cheat: ['one address, many servers', 'round robin = take turns', 'least connections = least busy', 'health check = are you alive?', 'run two balancers'],
    next: ['scale', 'hashing', 'cdn'],
    sources: ['AWS Elastic Load Balancing documentation: how load balancers work, health checks, routing algorithms', 'Google Cloud Load Balancing documentation: overview', 'NGINX documentation: HTTP load balancing methods']
  },
  cache: {
    what: 'A cache is a small, fast place that keeps copies of data people ask for again and again. Reading from it is much faster than asking the database. You must keep the copy fresh.',
    analogy: 'You keep a few snacks on your desk. You grab them at once instead of walking to the kitchen each time.',
    uses: ['Social apps that show the same popular profiles to many people', 'Online shops that show the same product pages all day', 'News sites that show the same front page to millions'],
    before: ['What a database is', 'scale'],
    words: [
      ['cache', 'Fast memory that holds copies of data you read often.'],
      ['hit', 'The cache has the answer, so the database is not asked.'],
      ['miss', 'The cache does not have the answer, so the app must ask the database.'],
      ['cache-aside', 'The app checks the cache first and fills it after a miss.'],
      ['TTL (time to live)', 'How long a cached copy may live before it is thrown away.'],
      ['eviction', 'Removing old entries to make room when the cache is full.'],
      ['stale', 'Out of date. The cache still holds the old value.']
    ],
    math: {
      lines: ['T = h \\times T_{\\text{hit}} + (1 - h) \\times T_{\\text{miss}}', 'D = (1 - h) \\times R'],
      symbols: [
        ['T', 'the average time of one read'],
        ['h', 'the hit rate: the share of reads the cache answers, from 0 to 1'],
        ['T_{\\text{hit}}', 'time for a read that hits'],
        ['T_{\\text{miss}}', 'time for a read that misses'],
        ['D', 'reads per second that still reach the database'],
        ['R', 'total reads per second']
      ],
      example: [
        'A hit takes 6 ms. A miss takes 56 ms. The hit rate is 0.9.',
        'T = 0.9 × 6 + 0.1 × 56 = 5.4 + 5.6 = 11 ms on average.',
        'With no cache every read takes 55 ms, so the cache is five times faster.',
        'There are 5,000 reads a second. D = 0.1 × 5,000 = 500.',
        'The database now sees 500 reads a second, not 5,000.'
      ]
    },
    steps: [
      'The app gets a read request and looks in the cache first.',
      'On a hit, it returns the cached value at once.',
      'On a miss, it reads the database and writes the answer into the cache.',
      'When data changes, the app deletes the cached copy so the next read loads fresh data.',
      'Each entry has a TTL, and the cache evicts the least recently used entries when it is full.'
    ],
    use: ['The same data is read many times and changes rarely.', 'The database is the slow or busy part.'],
    avoid: ['Data that must always be exact, such as an account balance, unless you handle updates with great care.', 'Data that is read once and never again. The cache would only waste memory.'],
    mistakes: [
      'Forgetting to delete or update the cache when data changes. Users then see old data.',
      'Setting no TTL, so a missed delete keeps wrong data forever.',
      'Caching everything. Cache only what is read often.',
      'Not planning for a cold cache. After a restart, every read misses at first.'
    ],
    cheat: ['check cache first', 'hit = fast, miss = ask database', 'write = delete cached copy', 'always set a TTL', 'full = evict least recently used'],
    next: ['dcache', 'cdn', 'replicas'],
    sources: ['Redis documentation: client-side caching, key eviction and expiration (EXPIRE, maxmemory policies)', 'AWS Whitepaper, Database Caching Strategies Using Redis: lazy loading (cache-aside) and write-through', 'Memcached documentation: overview and LRU behaviour']
  },
  dcache: {
    what: 'One cache machine can run out of memory or speed. A distributed cache spreads keys over many cache machines. Every app server must agree which machine owns which key.',
    analogy: 'A library gets too big for one room. You split the books over four rooms by the first letter of the title.',
    uses: ['Social networks that keep millions of profiles in memory', 'Shops that cache product and price data for fast pages', 'Games that keep player sessions in fast shared memory'],
    before: ['cache', 'hashing'],
    words: [
      ['node', 'One machine in the group of cache machines.'],
      ['key', 'The name used to find one stored item, such as user:42.'],
      ['replica', 'A second machine that keeps a live copy of a node and takes over if it fails.'],
      ['hot key', 'One key that gets far more reads than the others.'],
      ['hash ring', 'A way to give each key an owner so that adding a node moves few keys.']
    ],
    math: {
      lines: ['\\text{memory per node} = \\frac{K \\times S}{N}', '\\text{reads per node} = \\frac{R}{N}'],
      symbols: [
        ['K', 'how many keys there are'],
        ['S', 'size of one item'],
        ['N', 'how many cache nodes there are'],
        ['R', 'reads per second for the whole cache']
      ],
      example: [
        'There are 100 million keys. Each item is 1 KB. The data is 100 GB in total.',
        'One machine has 64 GB of memory, so it cannot hold it.',
        'With 4 nodes, each holds 100 ÷ 4 = 25 GB. That fits.',
        'Reads are 200,000 a second. Each node answers 200,000 ÷ 4 = 50,000 a second.',
        'One machine could only answer about 100,000, so four nodes now have room to spare.'
      ]
    },
    steps: [
      'Hash each key to choose its owner node. Every app server uses the same rule.',
      'To read, the app asks the owner node. A miss goes to the database.',
      'Give each node a replica that copies its writes. Then a crash does not empty that part of the cache.',
      'Copy very hot keys into each app server\'s own memory for a few seconds.',
      'Use a hash ring when adding nodes, so only a small part of the keys move.'
    ],
    use: ['The hot data no longer fits in one machine.', 'One cache machine cannot answer all the reads.'],
    avoid: ['A small app where one cache machine is enough.', 'Data you cannot rebuild from the database after the cache is lost.'],
    mistakes: [
      'Using plain "hash mod N". Adding a node then makes most keys miss at once.',
      'Having no replica. One crash sends a whole share of reads to the database.',
      'Ignoring hot keys. One famous key can overload a single node.'
    ],
    cheat: ['keys split over nodes', 'same hash rule everywhere', 'replica per node', 'hot key = copy near the app', 'ring for adding nodes'],
    next: ['hashing', 'sharding', 'cdn'],
    sources: ['Redis documentation: Redis Cluster specification (hash slots, replicas, failover)', 'Memcached documentation: clients and server selection', 'Karger et al., Consistent hashing and random trees, STOC 1997', 'Nishtala et al., Scaling Memcache at Facebook, NSDI 2013']
  },
  cdn: {
    what: 'A CDN is a network of servers around the world. They keep copies of your images, scripts and videos near users. A user gets files from a close server, so pages load faster.',
    analogy: 'A book shop keeps one big warehouse far away. A CDN is like a small shelf of popular books in every town.',
    uses: ['Video sites that deliver video from servers near each viewer', 'News and blog sites that serve images and scripts to readers worldwide', 'Online shops that load product photos fast in every country'],
    before: ['cache'],
    words: [
      ['origin', 'Your own server where the real files live.'],
      ['edge', 'A CDN server close to users that holds copies of your files.'],
      ['DNS', 'The system that turns a name like a website address into a computer address.'],
      ['pull CDN', 'The edge fetches a file from the origin the first time someone asks for it.'],
      ['push CDN', 'You upload files to the edges before anyone asks.'],
      ['static file', 'A file that is the same for every user, such as a logo.']
    ],
    math: {
      lines: ['\\text{origin traffic} = L \\times F', '\\text{with a CDN} = E \\times F'],
      symbols: [
        ['L', 'how many times the file is loaded per day'],
        ['F', 'the size of the file'],
        ['E', 'how many edge servers there are']
      ],
      example: [
        'A logo is 200 KB. It is loaded 1,000,000 times a day.',
        'Without a CDN, the origin sends 1,000,000 × 200 KB = 200 GB a day.',
        'With 50 edges, each edge asks the origin once. That is 50 × 200 KB = 10 MB a day.',
        'The origin sends 20,000 times less data.'
      ]
    },
    steps: [
      'The browser asks DNS for the file address. DNS answers with the nearest CDN edge.',
      'The edge checks if it already has the file.',
      'On a miss, the edge fetches the file from the origin and keeps a copy.',
      'Later users near that edge get the file from the copy, quickly.',
      'To ship a new version at once, give the file a new name.'
    ],
    use: ['Files are the same for every user: images, scripts, styles, video.', 'Your users live far from your servers.'],
    avoid: ['Personal pages such as a shopping cart or account page.', 'Files that change every few seconds and need to be exact.'],
    mistakes: [
      'Changing a file but keeping its name. Edges keep serving the old copy until it expires.',
      'Putting personal data in a cached page, so one user sees another user\'s page.',
      'Setting a very long cache time with no way to replace the file early.'
    ],
    cheat: ['copies near the user', 'edge hit = origin untouched', 'pull = fetch on first ask', 'new file name = instant update', 'static files only'],
    next: ['video', 'cache', 'lb'],
    sources: ['Cloudflare Learning Center: What is a CDN? and How does a CDN work?', 'AWS CloudFront Developer Guide: how content is delivered, cache behavior and invalidation', 'Google Cloud CDN documentation: overview and cache modes']
  },
  replicas: {
    what: 'A read replica is a full copy of your database that follows the main one. The main database takes all writes. Reads spread over the copies, so the main one has less work.',
    analogy: 'A teacher writes notes on the board. Several helpers copy them down, and students read from the helpers\' pages.',
    uses: ['Social apps where people read far more than they post', 'News sites with many readers and few editors', 'Reporting tools that run slow queries without disturbing the live app'],
    before: ['What a database is', 'cache'],
    words: [
      ['primary', 'The one database that accepts all writes.'],
      ['replica', 'A copy that applies the primary\'s changes and serves reads.'],
      ['replication lag', 'The short delay before a change reaches a replica.'],
      ['failover', 'Promoting a replica to be the new primary when the old one fails.'],
      ['sync copying', 'The primary waits for a replica to confirm each write. Safer but slower.'],
      ['async copying', 'The primary does not wait. Faster, but a crash can lose the last few writes.']
    ],
    math: {
      lines: ['\\text{reads per replica} = \\frac{R}{N}', '\\text{stale if } t_{\\text{read}} - t_{\\text{write}} < \\text{lag}'],
      symbols: [
        ['R', 'reads per second'],
        ['N', 'how many replicas share the reads'],
        ['t_{\\text{write}}', 'the time a write happened'],
        ['t_{\\text{read}}', 'the time a read arrived at a replica'],
        ['\\text{lag}', 'how long a change takes to reach the replica']
      ],
      example: [
        'An app gets 10,000 reads and 1,000 writes a second. That is 11,000 queries.',
        'Add two replicas. Each takes 10,000 ÷ 2 = 5,000 reads.',
        'The primary now handles only the 1,000 writes.',
        'Say lag is 100 ms. A user writes, then reads from a replica 20 ms later.',
        '20 ms is less than 100 ms, so the read may be stale and miss the write.'
      ]
    },
    steps: [
      'All writes go to the primary, which keeps one clear order of changes.',
      'The primary sends its change log to each replica.',
      'Each replica applies the changes in the same order.',
      'The app sends reads to the replicas. It sends a user\'s reads to the primary for a few seconds after that user writes.',
      'If the primary fails, the system promotes the most up-to-date replica.'
    ],
    use: ['Reads far outnumber writes.', 'You want a standby copy ready if the primary fails.'],
    avoid: ['Write-heavy apps. Replicas do not make writes faster.', 'Reads that must always see the very latest write, unless you route them to the primary.'],
    mistakes: [
      'Reading from a replica right after a write and showing old data.',
      'Thinking replicas fix slow writes. Only sharding spreads writes.',
      'Using async copying and not accepting that a crash may lose the last writes.'
    ],
    cheat: ['one primary takes writes', 'replicas serve reads', 'lag = short delay', 'read own writes from primary', 'failover = promote a replica'],
    next: ['sharding', 'cap', 'sqlnosql'],
    sources: ['PostgreSQL documentation: High Availability, Load Balancing, and Replication (streaming replication, hot standby)', 'MySQL documentation: Replication', 'Amazon RDS User Guide: Working with read replicas', 'Kleppmann, Designing Data-Intensive Applications, 2017, ch. 5 (replication lag)']
  },
  sharding: {
    what: 'Sharding splits one big table over several machines. Each machine, called a shard, holds only some of the rows. A rule on a chosen field says which shard owns each row.',
    analogy: 'A huge phone book is split into three books. Names starting with A to H go in book one, and so on.',
    uses: ['Social networks that store billions of user rows', 'Messaging apps that store chat history for millions of chats', 'Online games that store progress for millions of players'],
    before: ['replicas', 'indexes'],
    words: [
      ['shard', 'One machine that holds part of the data.'],
      ['shard key', 'The field used to decide which shard owns a row, such as the user id.'],
      ['hot shard', 'A shard that gets much more traffic than the others.'],
      ['cross-shard query', 'A question that needs data from several shards at once.'],
      ['resharding', 'Moving data to new shards after adding or removing machines.'],
      ['mod', 'The remainder after dividing. 7 mod 3 is 1.']
    ],
    math: {
      lines: ['\\text{shard} = k \\bmod N', '\\text{moved} = \\frac{N}{N+1} \\text{ (plain mod)}', '\\text{moved} = \\frac{1}{N+1} \\text{ (hash ring)}'],
      symbols: [
        ['k', 'the shard key value, such as the user id'],
        ['N', 'how many shards there are now'],
        ['\\bmod', 'the remainder after division'],
        ['\\text{moved}', 'the share of rows that must move to another machine']
      ],
      example: [
        'There are 3 shards. User 7 gives 7 mod 3 = 1, so the row lives on shard 1.',
        'Now add a fourth shard. User 7 gives 7 mod 4 = 3, so the row must move.',
        'Check users 0 to 11. Only users 0, 1 and 2 stay put. Nine of twelve move.',
        'That is 9 ÷ 12 = 75%, which matches N ÷ (N + 1) = 3 ÷ 4.',
        'A hash ring moves only 1 ÷ 4 = 25% of the rows.'
      ]
    },
    steps: [
      'Pick a shard key that spreads traffic evenly, such as the user id.',
      'Use a rule on the key to choose the shard for every read and write.',
      'A lookup by key touches exactly one shard.',
      'Questions about all rows must ask every shard and merge the answers.',
      'Use consistent hashing when adding shards, so few rows move.'
    ],
    use: ['One machine can no longer hold the data or handle the writes.', 'Caching and replicas are already in place and still not enough.'],
    avoid: ['Small data sets that fit one machine well.', 'Apps that run many queries across all rows, since each costs a trip to every shard.'],
    mistakes: [
      'Picking a shard key that clusters traffic, such as a date. One shard then gets everything.',
      'Using plain mod so that adding a shard moves most of the data.',
      'Sharding too early. It adds a lot of work for routing and moving data.',
      'Forgetting that cross-shard joins and transactions are hard.'
    ],
    cheat: ['shard = a slice of the table', 'shard key picks the slice', 'good key = even load', 'plain mod moves most rows', 'ring moves few'],
    next: ['hashing', 'cap', 'dcache'],
    sources: ['MongoDB documentation: Sharding and Choose a Shard Key', 'Vitess documentation: Sharding and Resharding', 'Citus documentation: Choosing a distribution column', 'DeCandia et al., Dynamo: Amazon\'s Highly Available Key-value Store, SOSP 2007']
  },
  hashing: {
    what: 'Consistent hashing places both servers and keys on a circle. A key belongs to the first server clockwise from it. Adding or removing a server then moves only a small share of keys.',
    analogy: 'People stand around a round table, and each takes the plates on the table in front of them. A new person only takes plates from a neighbour.',
    uses: ['Cache clusters that must grow without everyone missing at once', 'Databases such as Dynamo-style stores that spread data over many machines', 'Content delivery systems that pick which server holds which file'],
    before: ['sharding', 'dcache'],
    words: [
      ['hash', 'A function that turns a key into a random-looking number. The same key always gives the same number.'],
      ['ring', 'The number line bent into a circle, so the end meets the start.'],
      ['clockwise', 'The direction the hands of a clock move.'],
      ['virtual node', 'One of many points on the ring that stand for the same real server.'],
      ['rebalancing', 'Moving keys after the set of servers changes.']
    ],
    math: {
      lines: ['\\text{plain mod: moved} = \\frac{N}{N+1}', '\\text{ring: moved} \\approx \\frac{1}{N+1}', '\\text{points on ring} = N \\times V'],
      symbols: [
        ['N', 'how many servers there were before the change'],
        ['N+1', 'how many servers there are after adding one'],
        ['V', 'how many virtual nodes each server has'],
        ['\\text{moved}', 'the share of keys that change owner']
      ],
      example: [
        'Four cache nodes use hash mod 4. You add a fifth and switch to mod 5.',
        'A key stays only if its hash gives the same remainder in both. In every 20 numbers, 4 do.',
        'So 4 ÷ 20 = 20% stay and 80% move. All of those reads miss at once.',
        'On a ring, the new node takes keys from its neighbour only. About 1 ÷ 5 = 20% move.',
        'With 100 virtual nodes each, 4 servers give 4 × 100 = 400 points, so arcs even out.'
      ]
    },
    steps: [
      'Hash each server name to a point on the ring.',
      'Hash each key to a point on the same ring.',
      'Walk clockwise from the key. The first server you meet owns the key.',
      'When a server joins or leaves, only keys next to it change owner.',
      'Give each server many virtual nodes so load stays even.'
    ],
    use: ['Servers join or leave often, and you want few keys to move.', 'You spread data or cache keys over many machines.'],
    avoid: ['A fixed set of servers that never changes. Plain mod is simpler.', 'Cases where you need exact control over which key goes where.'],
    mistakes: [
      'Using too few points on the ring. Arcs become uneven and one server gets overloaded.',
      'Using a different hash function on different clients, so they disagree about owners.',
      'Forgetting replicas. Copy each key to the next servers clockwise as well.'
    ],
    cheat: ['servers and keys on a ring', 'key walks clockwise', 'join/leave moves few keys', 'virtual nodes even it out', 'copy to next servers for safety'],
    next: ['sharding', 'dcache', 'dlimit'],
    sources: ['Karger, Lehman, Leighton, Panigrahy, Levine, Lewin, Consistent hashing and random trees, STOC 1997', 'DeCandia et al., Dynamo: Amazon\'s Highly Available Key-value Store, SOSP 2007, section 4.2', 'Apache Cassandra documentation: Dynamo (partitioning and virtual nodes)']
  },
  cap: {
    what: 'CAP is a rule about data kept in several places. When the network between them breaks, each copy must choose. It can refuse to answer, or it can answer with possibly old data.',
    analogy: 'Two shops share one price list by phone. The phone line drops. Each shop must either stop selling or sell with its old list.',
    uses: ['Banks, which choose to refuse rather than show a wrong balance', 'Social apps, which choose to keep showing likes and feeds even if slightly old', 'Shops, which keep stock counts exact but let product reviews arrive later'],
    before: ['replicas', 'sharding'],
    words: [
      ['partition', 'A network failure that cuts the machines into groups that cannot talk to each other.'],
      ['consistency', 'Every read sees the latest write.'],
      ['availability', 'Every request gets an answer, even if the data is old.'],
      ['strong consistency', 'Every read sees the newest data, at the cost of waiting.'],
      ['eventual consistency', 'Copies may differ for a while but agree later if no new writes come.'],
      ['read-your-writes', 'You always see the changes you made yourself.']
    ],
    math: null,
    steps: [
      'Keep copies of data in more than one place, so one failure does not stop the app.',
      'A partition cuts the link between the copies. Both copies still run.',
      'Choose consistency: the cut-off copy refuses to answer until the link is back.',
      'Or choose availability: the copy answers with what it has, which may be old.',
      'When the link returns, the copies exchange missed changes and agree again.'
    ],
    use: ['You must decide per feature what to do during a network failure.', 'You explain why a system sometimes shows old data.'],
    avoid: ['Treating CAP as a menu of three free picks. Partitions happen, so the real choice is only consistency or availability during one.', 'Using one choice for the whole app. Balances and likes need different rules.'],
    mistakes: [
      'Saying "pick any two of three". Networks do fail, so partition tolerance is not optional.',
      'Choosing availability for money and showing a balance that is already spent.',
      'Forgetting the trade-off even with no failure: waiting for every copy makes each write slower.'
    ],
    cheat: ['partition = link cut', 'consistent = refuse', 'available = answer maybe old', 'pick per feature', 'eventual = agree later'],
    next: ['replicas', 'sqlnosql', 'payments'],
    sources: ['Brewer, Towards robust distributed systems, PODC keynote, 2000', 'Gilbert and Lynch, Brewer\'s conjecture and the feasibility of consistent, available, partition-tolerant web services, ACM SIGACT News, 2002', 'Kleppmann, Please stop calling databases CP or AP, 2015', 'Vogels, Eventually Consistent, Communications of the ACM, 2009']
  },
  sqlnosql: {
    what: 'SQL databases store data in tables with a fixed shape and link them with joins. NoSQL is a name for stores that use other shapes: documents, key-value pairs and more. Pick by how you read and write.',
    analogy: 'SQL is a set of neat spreadsheets that point at each other. A document store is a folder where each item has its own paper.',
    uses: ['Banks and shops, which use SQL for orders and payments', 'Product catalogues and profiles, which fit documents', 'View counters and sessions, which suit a key-value store'],
    before: ['What a database is', 'replicas'],
    words: [
      ['table', 'Rows and columns of data with a fixed set of columns.'],
      ['join', 'Linking rows from two tables, such as an order and its customer.'],
      ['transaction', 'A group of changes that all happen or none happen.'],
      ['schema', 'The agreed shape of the data.'],
      ['document store', 'A database that saves each item as one nested record.'],
      ['key-value store', 'A database that only gets and sets a value by its key.']
    ],
    math: null,
    steps: [
      'List your kinds of data, such as orders, products and counters.',
      'For each, write how it is read and written.',
      'Linked rows and money rules point to SQL, with joins and transactions.',
      'Whole records of varying shape point to a document store.',
      'Huge simple traffic by key points to a key-value store.'
    ],
    use: ['SQL: data that links together and must stay correct.', 'NoSQL: very large, simple or flexible data that spreads over many machines.'],
    avoid: ['Choosing NoSQL only because it sounds modern.', 'Forcing wildly varying documents into rigid tables.'],
    mistakes: [
      'Thinking NoSQL is always faster. It depends on how you read the data.',
      'Picking NoSQL and later needing joins and transactions you gave up.',
      'Using one kind for everything. Many shops use both side by side.'
    ],
    cheat: ['SQL = tables, joins, transactions', 'document = whole record at once', 'key-value = get/set by key', 'pick by access pattern', 'unsure? start with SQL'],
    next: ['indexes', 'cap', 'sharding'],
    sources: ['PostgreSQL documentation: Transactions tutorial and Data Definition', 'MongoDB documentation: Data modeling introduction', 'Redis documentation: data types and key-value overview', 'DeCandia et al., Dynamo: Amazon\'s Highly Available Key-value Store, SOSP 2007']
  },
  indexes: {
    what: 'An index is a sorted list of one column, where each entry points to its row. With it, the database jumps to the row. Without it, the database reads every row.',
    analogy: 'A book has an index at the back. You look up a word there instead of reading every page.',
    uses: ['Login pages that find a user by email', 'Shops that filter products by category and price', 'Messaging apps that load the latest messages of one chat'],
    before: ['sqlnosql'],
    words: [
      ['index', 'A sorted copy of one or more columns with pointers back to the rows.'],
      ['full scan', 'Reading every row to find the matches.'],
      ['B-tree', 'A wide, shallow tree. Each step down picks one of many branches.'],
      ['composite index', 'An index on two or more columns, sorted by the first and then by the next.'],
      ['query plan', 'The steps the database says it will take to run a query.']
    ],
    math: {
      lines: ['\\text{scan time} = \\frac{R \\times S}{B}', '\\text{levels} = \\lceil \\log_{F}(R) \\rceil'],
      symbols: [
        ['R', 'number of rows'],
        ['S', 'size of one row'],
        ['B', 'how fast the disk reads, in bytes per second'],
        ['F', 'fan-out: how many branches each tree step has'],
        ['\\log_{F}(R)', 'how many times you must divide R by F to reach 1'],
        ['\\lceil \\; \\rceil', 'round up to the next whole number']
      ],
      example: [
        'A table has 100 million rows of 1 KB each. That is 100 GB.',
        'A disk reads 1 GB a second. A full scan takes 100 GB ÷ 1 GB/s = 100 seconds.',
        'Now take a B-tree with 100 branches per step. 100 × 100 × 100 × 100 = 100 million.',
        'So it needs 4 levels, which is 4 page reads, plus one jump to the row.',
        'That takes about 5 ms instead of 100 seconds.'
      ]
    },
    steps: [
      'Find the query that runs often or is slow.',
      'Create an index on the columns in its WHERE part.',
      'The database walks the tree to the matching entry and jumps to the row.',
      'For several columns, put them in the order the query uses them.',
      'Check the plan with EXPLAIN and remove indexes nobody uses.'
    ],
    use: ['A query picks a few rows from a big table.', 'The same lookup runs again and again.'],
    avoid: ['Tiny tables, where a scan is already fast.', 'Columns with almost no variety, such as yes or no.'],
    mistakes: [
      'Adding indexes everywhere. Every insert and update must change each index too.',
      'Putting columns in the wrong order in a composite index. It then cannot help.',
      'Never checking the plan, so you do not know if the index is used.'
    ],
    cheat: ['index = sorted shortcut', 'B-tree = few steps down', 'reads faster, writes slower', 'composite: first column leads', 'EXPLAIN to check'],
    next: ['sharding', 'observability', 'sqlnosql'],
    sources: ['PostgreSQL documentation: Indexes (types, multicolumn indexes, EXPLAIN)', 'MySQL Reference Manual: How MySQL Uses Indexes and Multiple-Column Indexes', 'Bayer and McCreight, Organization and maintenance of large ordered indexes, Acta Informatica, 1972']
  },
  queue: {
    what: 'A message queue is a waiting line for jobs. A web server drops a job in and replies at once. Workers take jobs from the line and do the slow work later.',
    analogy: 'At a bakery you give your order to the cashier and get a ticket. The bakers make it in the back while you wait nearby.',
    uses: ['Video sites that convert uploads into several sizes', 'Shops that send order emails and receipts after checkout', 'Photo apps that make thumbnails after you upload'],
    before: ['scale', 'lb'],
    words: [
      ['queue', 'A line of jobs, taken out in the order they came in.'],
      ['producer', 'The part that adds jobs to the queue.'],
      ['worker', 'A program that takes a job from the queue and does it.'],
      ['retry', 'Trying a failed job again.'],
      ['backlog', 'The jobs waiting in the queue.'],
      ['backpressure', 'Telling senders to slow down because the queue is full.']
    ],
    math: {
      lines: ['W = \\lambda \\times T', 'D = \\lambda \\times S \\times 86{,}400'],
      symbols: [
        ['W', 'how many workers you need at the same moment'],
        ['\\lambda', 'jobs arriving each second'],
        ['T', 'seconds one job takes'],
        ['D', 'bytes of new data per day'],
        ['S', 'size of one job\'s data']
      ],
      example: [
        '172,800 uploads a day is 172,800 ÷ 86,400 = 2 uploads a second.',
        'Each upload takes 120 seconds to process.',
        'Workers needed: W = 2 × 120 = 240.',
        'Each upload is 50 MB. That is 2 × 50 MB = 100 MB a second.',
        'Over a day that is 100 MB × 86,400, about 8.6 TB of new video.'
      ]
    },
    steps: [
      'The web server puts a job in the queue and replies to the user at once.',
      'A worker takes the next job and starts it.',
      'If the worker finishes, it tells the queue the job is done.',
      'If it crashes, the queue sees no "done" and hands the job to another worker.',
      'Add more workers when the line grows, and set a size limit on the queue.'
    ],
    use: ['Work is slow and the user does not need the result right now.', 'Traffic comes in bursts that you want to smooth out.'],
    avoid: ['Answers the user needs at once, such as showing a page.', 'Jobs that cannot safely run twice, unless you add protection.'],
    mistakes: [
      'Writing jobs that are not safe to repeat. A retry may run the same job twice.',
      'Having no size limit. A long backlog can use up all memory.',
      'Forgetting a place for jobs that fail again and again, so they block the line.'
    ],
    cheat: ['reply fast, work later', 'producer adds, worker takes', 'crash = job comes back', 'jobs must be safe to repeat', 'workers = jobs per second x seconds'],
    next: ['idempotency', 'notify', 'video'],
    sources: ['Apache Kafka documentation: Introduction and Design (consumers, delivery guarantees)', 'Amazon SQS Developer Guide: visibility timeout, dead-letter queues', 'RabbitMQ documentation: Consumer Acknowledgements and Publisher Confirms', 'Little, A proof for the queuing formula L = lambda W, Operations Research, 1961']
  },
  idempotency: {
    what: 'An action is idempotent when doing it twice has the same result as doing it once. Networks lose replies, so clients retry. An idempotency key makes a retry safe, so a payment is not charged twice.',
    analogy: 'Pressing the lift button twice does not call two lifts. The second press changes nothing.',
    uses: ['Payment apps that must never charge a customer twice', 'Order systems that must not create the same order twice', 'Email and text services that must not send the same message twice'],
    before: ['queue'],
    words: [
      ['idempotent', 'Safe to repeat. The result is the same however many times you do it.'],
      ['idempotency key', 'A unique code sent with a request, so the server can spot a repeat.'],
      ['retry', 'Sending the same request again after no answer.'],
      ['timeout', 'Giving up because no answer came in time.'],
      ['backoff', 'Waiting longer after each failed try.'],
      ['jitter', 'A small random extra wait so clients do not retry all at once.']
    ],
    math: {
      lines: ['\\text{wait}_n = B \\times 2^{\\,n-1}', '\\text{key storage} = P \\times K'],
      symbols: [
        ['\\text{wait}_n', 'seconds to wait before the n-th retry'],
        ['B', 'the first wait, in seconds'],
        ['n', 'which retry this is: 1, 2, 3 and so on'],
        ['2^{\\,n-1}', 'the number 2 multiplied by itself n minus 1 times'],
        ['P', 'payments per day'],
        ['K', 'bytes stored for one key']
      ],
      example: [
        'The first wait is B = 1 second.',
        'Retry 1 waits 1 second. Retry 2 waits 2. Retry 3 waits 4. Retry 4 waits 8.',
        'After three retries the total wait is 1 + 2 + 4 = 7 seconds.',
        'There are 1,000,000 payments a day and each key takes 200 bytes.',
        'Storage is 1,000,000 × 200 B = 200 MB a day, which is small.'
      ]
    },
    steps: [
      'The client makes one unique key for one action, such as one payment.',
      'It sends the key with every attempt of that same action.',
      'The server checks its key store. If the key is new, it does the work and saves the key with the result.',
      'If the key is already there, the server returns the saved result and does nothing more.',
      'The client waits longer between retries, with a little random extra.'
    ],
    use: ['An action changes money or data and the network may lose replies.', 'Clients, queues or other systems may send the same request twice.'],
    avoid: ['Reads such as GET, which are already safe to repeat.', 'Making a new key for each retry. That defeats the whole idea.'],
    mistakes: [
      'Checking for the key and saving it as two separate steps. Two copies at once can both pass.',
      'Making a fresh key on every retry.',
      'Retrying instantly in a loop and flooding a server that is already struggling.',
      'Keeping keys forever. Keep them as long as retries can happen, such as a day.'
    ],
    cheat: ['same key = same result', 'one key per action', 'save key and work together', 'wait 1, 2, 4, 8 s', 'add jitter'],
    next: ['payments', 'notify', 'ratelimit'],
    sources: ['Stripe API documentation: Idempotent requests', 'Brooker, Timeouts, retries, and backoff with jitter, Amazon Builders\' Library', 'RFC 9110, HTTP Semantics, section 9.2.2 (idempotent methods)', 'IETF draft: The Idempotency-Key HTTP Header Field']
  },
  ratelimit: {
    what: 'A rate limiter caps how many requests one user can send in a given time. Extra requests get a 429 answer. This protects the service from floods and from one user taking everything.',
    analogy: 'A bucket holds tokens. Each request takes one. A new token drips in every second, and no token means you wait.',
    uses: ['Public APIs that stop one script from slowing everyone', 'Login pages that block endless password guesses', 'Messaging services that limit how fast one account can send'],
    before: ['lb', 'cache'],
    words: [
      ['rate limit', 'The most requests allowed in a time span.'],
      ['token bucket', 'A bucket of tokens. A request spends one, and tokens refill at a steady speed.'],
      ['burst', 'Many requests that arrive in a short moment.'],
      ['429', 'The status code for "Too Many Requests".'],
      ['fixed window', 'Counting requests inside set time slots, such as each minute.'],
      ['Retry-After', 'A reply header that tells the client how many seconds to wait.']
    ],
    math: {
      lines: ['t_{\\text{now}} = \\min\\bigl(C,\\; t_{\\text{old}} + r \\times \\Delta\\bigr)', '\\text{allow if } t_{\\text{now}} \\ge 1'],
      symbols: [
        ['t_{\\text{now}}', 'tokens in the bucket after refilling'],
        ['t_{\\text{old}}', 'tokens at the last check'],
        ['C', 'capacity: the most tokens the bucket holds'],
        ['r', 'refill speed, in tokens per second'],
        ['\\Delta', 'seconds since the last check'],
        ['\\min', 'take the smaller of the two numbers']
      ],
      example: [
        'The bucket holds C = 5 tokens and refills at r = 1 token a second. It starts full.',
        'Five requests arrive at once. Each spends one token, so the bucket is at 0.',
        'The sixth request arrives. It finds 0 tokens and gets a 429.',
        'One second later: tokens = min(5, 0 + 1 × 1) = 1. One request may pass.',
        'The long-run average is 1 request a second, with bursts up to 5.'
      ]
    },
    steps: [
      'Give each user a bucket with a capacity and a refill speed.',
      'When a request arrives, first refill the bucket based on the time that has passed.',
      'If there is at least one token, remove it and let the request pass.',
      'If not, answer 429 and say with Retry-After when to try again.',
      'Keep only two numbers per user: tokens left and the time of the last refill.'
    ],
    use: ['You expose an API to many users and must stay fair.', 'You want to allow small bursts but limit the long-run speed.'],
    avoid: ['Limiting by a field a user can change freely, such as a name they type.', 'Strict windows when bursts at a window edge could pass double.'],
    mistakes: [
      'Using a fixed window. A client can send the full limit at 0:59 and again at 1:00.',
      'Giving no Retry-After, so clients retry at once and make things worse.',
      'Counting separately on each server, so the real limit is multiplied.'
    ],
    cheat: ['request = spend a token', 'tokens refill steadily', 'empty bucket = 429', 'capacity = burst size', 'two numbers per user'],
    next: ['dlimit', 'idempotency', 'observability'],
    sources: ['RFC 6585, Additional HTTP Status Codes, section 4 (429 Too Many Requests)', 'RFC 9110, HTTP Semantics, section 10.2.3 (Retry-After)', 'Stripe engineering blog: Scaling your API with rate limiters', 'AWS API Gateway documentation: Throttle requests (token bucket)']
  },
  observability: {
    what: 'Observability means your system tells you what it is doing. It has three kinds of signal: metrics, logs and traces. With them you find the cause of a problem instead of guessing.',
    analogy: 'A car has a dashboard with speed and fuel. It also has a warning light and a service record that show what went wrong.',
    uses: ['Shops that must find why checkout got slow', 'Streaming services that watch error rates during a new release', 'Banks that trace one payment across many services'],
    before: ['indexes', 'queue'],
    words: [
      ['metric', 'A number measured over time, such as requests per second.'],
      ['log', 'A line of text about one event.'],
      ['trace', 'The timed path of one request through all the services it touched.'],
      ['percentile', 'p99 is the time that 99 of every 100 requests beat.'],
      ['alert', 'A message sent to a person when a goal is at risk.'],
      ['SLO', 'A goal for service quality, such as 99% of checkouts under 300 ms.']
    ],
    math: {
      lines: ['\\text{average} = \\frac{\\sum t_i}{n}', 'p99 = \\text{the value at position } 0.99 \\times n \\text{ in sorted order}'],
      symbols: [
        ['t_i', 'the time of request number i'],
        ['n', 'how many requests there are'],
        ['\\sum', 'add up all of them'],
        ['p99', 'the time that 99 percent of requests are faster than or equal to']
      ],
      example: [
        'Take 1,000 requests. 980 take 100 ms and 20 take 2,500 ms.',
        'The sum is 980 × 100 + 20 × 2,500 = 98,000 + 50,000 = 148,000 ms.',
        'The average is 148,000 ÷ 1,000 = 148 ms. That looks fine.',
        'Sort the times. Position 0.99 × 1,000 = 990 holds 2,500 ms.',
        'So p99 is 2,500 ms. The average hides what 20 users felt.'
      ]
    },
    steps: [
      'Record metrics: request rate, error rate and time taken.',
      'Watch percentiles such as p50 and p99, not only the average.',
      'Write logs with a request id on every line, so one request can be followed.',
      'Use traces to see how long each service took for one slow request.',
      'Set alerts on your goals and keep the signals on one dashboard.'
    ],
    use: ['You run more than one service and need to find where time is lost.', 'You want to know about a problem before users complain.'],
    avoid: ['Alerts on every small blip. People then ignore them.', 'Logging private data such as passwords or card numbers.'],
    mistakes: [
      'Looking only at the average. The slowest requests hide inside it.',
      'Logs with no request id, so you cannot join the lines of one request.',
      'Alerting on causes, such as CPU, instead of what users feel, such as slow pages.'
    ],
    cheat: ['metrics = numbers over time', 'logs = event stories', 'traces = one request\'s path', 'use p99, not average', 'alert on user pain'],
    next: ['ratelimit', 'indexes', 'queue'],
    sources: ['Google, Site Reliability Engineering, 2016, ch. 4 (Service Level Objectives) and ch. 6 (Monitoring Distributed Systems)', 'OpenTelemetry documentation: Observability primer (traces, metrics, logs)', 'Sigelman et al., Dapper, a large-scale distributed systems tracing infrastructure, Google, 2010']
  },
  shortener: {
    what: 'A URL shortener turns a long web link into a short code. When someone opens the short link, the service looks up the code. Then it sends them to the long link.',
    analogy: 'A coat check gives you a small ticket number. You hand the ticket back and get your big coat.',
    uses: ['Social posts and texts that have tight space limits', 'Printed posters and QR codes that need short links', 'Marketing tools that count how often each link is clicked'],
    before: ['cache', 'lb', 'replicas'],
    words: [
      ['redirect', 'An answer that tells the browser to go to another address.'],
      ['base 62', 'Writing a number with 62 symbols: a to z, A to Z and 0 to 9.'],
      ['napkin math', 'Quick rough numbers to size a design.'],
      ['unique id', 'A number given to only one link.'],
      ['single point of failure', 'One part whose failure stops the whole service.']
    ],
    math: {
      lines: ['\\text{writes/s} = \\frac{M}{30 \\times 86{,}400}', '\\text{codes} = 62^{L}'],
      symbols: [
        ['M', 'new links created each month'],
        ['30 \\times 86{,}400', 'seconds in a 30-day month'],
        ['L', 'length of the code in characters'],
        ['62^{L}', '62 multiplied by itself L times']
      ],
      example: [
        '100 million new links a month is 100,000,000 ÷ 2,592,000 = about 40 a second.',
        'Clicks are ten times more, so about 400 a second.',
        'Over five years that is 6 billion links. At 500 bytes each, it is about 3 TB.',
        'A 7-character code gives 62^7, which is about 3.5 trillion codes. That is plenty.',
        'Take id 125 in base 62. It equals 2 × 62 + 1, so the digits are 2 and 1: "c" and "b". The code is "cb".'
      ]
    },
    steps: [
      'Ask first: what must it do, and how many links per month and per click?',
      'Sketch one API with two calls: create a link and follow a link.',
      'Give each new link a unique number and write it in base 62 as the code.',
      'Store the code and the long URL in one table, with the code as the key.',
      'Add a cache, several API servers behind a load balancer, and a replica of the database.'
    ],
    use: ['Reads far outnumber writes and links never change.', 'You want a small, clear first system design to practise on.'],
    avoid: ['Guessable sequential codes if links must stay private.', 'Running one database with no copy.'],
    mistakes: [
      'Making codes from random text and not checking for a clash.',
      'Skipping the cache, so every click hits the database.',
      'Running one ID counter that fails and stops all new links.'
    ],
    cheat: ['ask, sketch, zoom in, scale', 'code = id in base 62', '7 characters = 3.5 trillion', 'reads >> writes, so cache', 'copy the database'],
    next: ['hashing', 'sharding', 'chat'],
    sources: ['RFC 9110, HTTP Semantics, section 15.4 (Redirection 3xx, 301 and 302)', 'Redis documentation: INCR (atomic counters)', 'Kleppmann, Designing Data-Intensive Applications, 2017, ch. 1 and ch. 6']
  },
  chat: {
    what: 'A chat app sends messages between people at once. Each phone keeps one open connection to a chat server. The server can then push messages without being asked. Messages also wait in storage for people who are offline.',
    analogy: 'It is like a phone line left open all day. The other side speaks whenever there is news.',
    uses: ['Messaging apps for friends and family', 'Support chat on shopping sites', 'In-game chat between players'],
    before: ['lb', 'queue', 'sharding'],
    words: [
      ['WebSocket', 'A connection that stays open so both sides can send at any time.'],
      ['polling', 'Asking the server again and again if there is news.'],
      ['push', 'The server sends news without being asked.'],
      ['presence', 'Whether a user is online right now.'],
      ['sequence number', 'A counter on each message that fixes the order.'],
      ['fan-out', 'Sending one message to many receivers.']
    ],
    math: {
      lines: ['\\text{messages/s} = \\frac{U \\times M}{86{,}400}', '\\text{storage/day} = U \\times M \\times S'],
      symbols: [
        ['U', 'active users per day'],
        ['M', 'messages each user sends in a day'],
        ['S', 'bytes in one message'],
        ['86{,}400', 'seconds in a day']
      ],
      example: [
        '50 million users each send 40 messages. That is 2 billion messages a day.',
        '2,000,000,000 ÷ 86,400 is about 23,000 messages every second.',
        'At 100 bytes each, storage is 2 billion × 100 B = 200 GB a day.',
        'Over a year that is 200 GB × 365 = 73 TB.'
      ]
    },
    steps: [
      'Each phone opens a WebSocket to a chat server through a load balancer.',
      'A sender\'s message reaches the server, gets a sequence number and is saved.',
      'The server pushes it down the open connection of each receiver who is online.',
      'For an offline user, the message waits in storage and a push service sends a notice.',
      'When the user reconnects, the app asks for everything after the last number it saw.'
    ],
    use: ['People need messages within a fraction of a second.', 'Many users keep a connection open at the same time.'],
    avoid: ['Polling every second for large crowds. It wastes work.', 'Putting every chat on one machine.'],
    mistakes: [
      'Ordering messages by phone clock. Clocks differ. Use per-chat numbers.',
      'Forgetting where each user\'s connection lives, so messages go to the wrong server.',
      'Sending huge group messages one at a time without limits.'
    ],
    cheat: ['one open connection per phone', 'save, then push', 'number messages per chat', 'offline = wait and notify', 'shard by chat id'],
    next: ['notify', 'feed', 'sharding'],
    sources: ['RFC 6455, The WebSocket Protocol', 'MDN Web Docs: WebSockets API', 'Apple Developer documentation: Sending notification requests to APNs', 'Firebase Cloud Messaging documentation: Architectural overview']
  },
  feed: {
    what: 'A news feed shows each reader recent posts from the people they follow. You can build the list when the reader opens the app. Or you can build it earlier, when a post is made. Most big apps mix both.',
    analogy: 'A paper boy can deliver the whole paper to each house in the morning. Or each reader can walk to the shop and pick up the news.',
    uses: ['Social networks with a home timeline', 'Photo-sharing apps with a feed of followed accounts', 'Professional networks that show updates from your contacts'],
    before: ['cache', 'queue', 'sharding'],
    words: [
      ['feed', 'The ordered list of posts a reader sees.'],
      ['fan-out on write', 'When a post is made, add it to every follower\'s feed list at once.'],
      ['fan-out on read', 'When a reader opens the app, collect posts from everyone they follow.'],
      ['follower', 'A person who has chosen to see another person\'s posts.'],
      ['hybrid', 'Using one method for most accounts and another for very big ones.']
    ],
    math: {
      lines: ['\\text{reads/s} = \\frac{U \\times O}{86{,}400}', '\\text{cache} = U \\times L \\times B'],
      symbols: [
        ['U', 'number of readers'],
        ['O', 'how many times each reader opens the feed in a day'],
        ['L', 'how many post ids you keep per reader'],
        ['B', 'bytes per post id']
      ],
      example: [
        '300 million readers open the feed 10 times a day. That is 3 billion reads a day.',
        '3,000,000,000 ÷ 86,400 is about 35,000 reads a second.',
        '50 million posts a day is about 580 writes a second. Reads win by about 60 to 1.',
        'Keep the latest 500 ids per reader, 8 bytes each: 500 × 8 = 4,000 bytes.',
        'For 300 million readers that is 300,000,000 × 4,000 B = 1.2 TB of memory.'
      ]
    },
    steps: [
      'Save each new post in the posts database.',
      'A fan-out worker adds the post id to each follower\'s ready-made feed list.',
      'Opening the feed reads that one list and fetches the posts. This is fast.',
      'For accounts with millions of followers, skip fan-out. Merge their posts in at read time.',
      'Keep only the newest ids in memory, split by user id over many machines.'
    ],
    use: ['Reads vastly outnumber writes.', 'Readers expect a fast, fresh list.'],
    avoid: ['Fan-out on write for huge accounts. One post would cause millions of updates.', 'Building feeds for people who have not logged in for weeks.'],
    mistakes: [
      'Using only fan-out on read. Each open would join many sources and be slow.',
      'Using only fan-out on write and letting a star post flood the workers.',
      'Keeping the whole history in memory instead of only the newest ids.'
    ],
    cheat: ['reads >> writes', 'push work to write time', 'star accounts use pull', 'hybrid = both', 'keep newest 500 ids'],
    next: ['chat', 'notify', 'dcache'],
    sources: ['Twitter engineering talk and blog posts on timeline fan-out (Raffi Krikorian, Timelines at Scale, QCon 2012)', 'Kleppmann, Designing Data-Intensive Applications, 2017, ch. 1 (Twitter case study)', 'Redis documentation: lists and sorted sets']
  },
  ride: {
    what: 'A ride-hailing service matches a rider with a free driver nearby. The hard part is finding nearby drivers quickly while many cars move. The map is cut into cells so the search is small.',
    analogy: 'To find a friend in a big park, you search the nearby squares. You do not check every bench.',
    uses: ['Taxi and ride apps that find the closest car', 'Food delivery apps that find a nearby courier', 'Scooter and bike hire apps that show bikes near you'],
    before: ['cache', 'sharding', 'queue'],
    words: [
      ['location update', 'A message from a driver\'s phone saying where the car is now.'],
      ['grid cell', 'One square of the map, with a name that nearby places share.'],
      ['geohash', 'A short code that names a map square. Close places share the start of the code.'],
      ['matcher', 'The part that offers a trip to a driver.'],
      ['lock', 'A mark that says this driver is taken for now.']
    ],
    math: {
      lines: ['\\text{updates/s} = \\frac{D}{I}', '\\text{memory} = D \\times S'],
      symbols: [
        ['D', 'number of drivers'],
        ['I', 'seconds between two updates from one driver'],
        ['S', 'bytes kept per driver']
      ],
      example: [
        'One million drivers each send a location every 4 seconds.',
        'Updates: 1,000,000 ÷ 4 = 250,000 every second. This is the real load.',
        'Keep only the latest spot, about 100 bytes per driver.',
        'Memory: 1,000,000 × 100 B = 100 MB, which fits easily in one machine.'
      ]
    },
    steps: [
      'Drivers send their location often. The service keeps the latest one per driver.',
      'Each driver is filed under a grid cell of the map.',
      'A ride request searches the pickup cell and its 8 neighbours for free drivers.',
      'The matcher offers the trip to the nearest driver, who has about 10 seconds to accept.',
      'A lock keeps one driver from two trips. Split the index by city to scale.'
    ],
    use: ['You must search many moving points near one spot.', 'Updates are frequent and only the newest value matters.'],
    avoid: ['Scanning every driver for every request.', 'Saving every location update in a slow database as the main path.'],
    mistakes: [
      'Searching only the pickup cell. A driver right across the edge is missed.',
      'Offering one driver to two riders at the same time.',
      'Storing the whole location history in memory instead of the latest point.'
    ],
    cheat: ['cut map into cells', 'search cell + 8 neighbours', 'keep latest spot only', 'lock the driver', 'shard by city'],
    next: ['sharding', 'notify', 'dcache'],
    sources: ['Uber Engineering: H3, Uber\'s Hexagonal Hierarchical Spatial Index', 'Redis documentation: Geospatial indexes (GEOADD, GEOSEARCH)', 'Niemeyer, Geohash, geohash.org specification', 'PostGIS documentation: spatial indexes']
  },
  video: {
    what: 'A video service stores uploads, makes several quality versions, and cuts each into small chunks. The player downloads the chunks one by one. A CDN keeps popular chunks near viewers.',
    analogy: 'A long film is cut into short reels. You can start watching after the first reel. If the road is bumpy, you swap to a lighter reel.',
    uses: ['Streaming sites for films and shows', 'Video-sharing sites for short clips', 'Online lessons and live events'],
    before: ['queue', 'cdn'],
    words: [
      ['encoding', 'Turning a video file into a smaller form of a chosen quality.'],
      ['chunk', 'A few seconds of video saved as its own small file.'],
      ['manifest', 'A small list that tells the player where each chunk is.'],
      ['adaptive bitrate', 'The player switches quality as the network gets faster or slower.'],
      ['long tail', 'The many videos that few people watch.']
    ],
    math: {
      lines: ['\\text{uploads/s} = \\frac{N}{86{,}400}', '\\text{new data/day} = N \\times S'],
      symbols: [
        ['N', 'uploads per day'],
        ['S', 'size of one upload'],
        ['86{,}400', 'seconds in a day']
      ],
      example: [
        '500,000 uploads a day is 500,000 ÷ 86,400, about 6 a second.',
        'Each upload is 300 MB.',
        'New data per day: 500,000 × 300 MB = 150,000,000 MB, which is 150 TB.',
        'Plays are about a billion a day. Sending bytes costs far more than receiving them.'
      ]
    },
    steps: [
      'The creator uploads the raw file. The service stores it and adds a job to a queue.',
      'Encoders take jobs and make versions from 240p to 1080p.',
      'Each version is cut into 4-second chunks, with a manifest.',
      'The player reads the manifest, then fetches chunks, starting after the first two.',
      'A CDN keeps popular chunks near viewers. Rare videos come from storage on demand.'
    ],
    use: ['Files are large and viewers have very different networks.', 'Many viewers watch the same popular videos.'],
    avoid: ['Sending one big file and making the viewer wait for all of it.', 'Doing the encoding inside the upload request.'],
    mistakes: [
      'Skipping lower qualities. Viewers on slow networks then cannot watch.',
      'Serving every play from your own storage instead of a CDN.',
      'Making chunks very long. Switching quality then reacts slowly.'
    ],
    cheat: ['upload, queue, encode', 'many qualities', 'cut into chunks', 'manifest lists chunks', 'CDN near viewers'],
    next: ['cdn', 'queue', 'drive'],
    sources: ['RFC 8216, HTTP Live Streaming (HLS)', 'ISO/IEC 23009-1, MPEG-DASH', 'Netflix Technology Blog: Per-title encode optimization', 'AWS Media Services documentation: video on demand reference architecture']
  },
  payments: {
    what: 'A payment system moves money for a shop. Two rules matter most: never charge twice, and never lose track of money. It uses idempotency keys, fixed states and a ledger that adds to zero.',
    analogy: 'A shop keeps a notebook. Every sale writes one line for money in and one for money out. The page must always balance.',
    uses: ['Online shops taking card payments', 'Ride and food apps charging after each trip', 'Subscription sites that bill every month'],
    before: ['idempotency', 'cap', 'queue'],
    words: [
      ['ledger', 'A permanent list of every money movement, never edited, only added to.'],
      ['double entry', 'Each payment writes a minus on one account and an equal plus on another.'],
      ['authorise', 'Ask the card provider to hold the money.'],
      ['capture', 'Take the held money for real.'],
      ['reconciliation', 'Comparing your records with the provider\'s report to find mismatches.']
    ],
    math: {
      lines: ['\\text{payments/s} = \\frac{P}{86{,}400}', '\\text{ledger/day} = P \\times E \\times S'],
      symbols: [
        ['P', 'payments per day'],
        ['E', 'ledger rows written for each payment'],
        ['S', 'bytes in one ledger row']
      ],
      example: [
        '10 million payments a day is 10,000,000 ÷ 86,400, about 116 a second.',
        'That volume is easy. Correctness is the hard part.',
        'Each payment writes 2 rows of 200 bytes.',
        'Ledger growth: 10,000,000 × 2 × 200 B = 4 GB a day.',
        'A ₹900 sale writes -900 on the shopper side and +900 on the shop side. The sum is 0.'
      ]
    },
    steps: [
      'The shop calls the payment service with an idempotency key.',
      'The service asks the card provider to authorise, then to capture.',
      'The payment moves through fixed states and never goes backwards.',
      'Each change writes balanced ledger rows and publishes an event.',
      'Each night a reconciler compares the ledger with the provider\'s report.'
    ],
    use: ['Money moves and every cent must be traceable.', 'Retries and timeouts could cause a double charge.'],
    avoid: ['Eventually consistent storage for balances.', 'Deleting or editing old ledger rows. Add a correcting row instead.'],
    mistakes: [
      'Retrying blindly after a provider timeout. The charge may already have happened. Ask for the status.',
      'Updating a balance number without a ledger trail.',
      'Skipping reconciliation, so mismatches go unseen for months.'
    ],
    cheat: ['never charge twice', 'idempotency key per payment', 'states only move forward', 'ledger adds to zero', 'reconcile every night'],
    next: ['idempotency', 'cap', 'notify'],
    sources: ['Stripe documentation: Idempotent requests and PaymentIntents lifecycle', 'Square Engineering: Books, an immutable double-entry accounting database service', 'Modern Treasury: Accounting for Developers (ledger concepts)']
  },
  typeahead: {
    what: 'Search suggestions show the most popular searches that start with the letters typed so far. A trie stores phrases letter by letter. Each spot keeps its own top 5, so answers come fast.',
    analogy: 'Think of a dictionary tab on each letter. Each tab has a sticky note listing the five most popular words under it.',
    uses: ['Search engines suggesting queries as you type', 'Shopping apps suggesting product names', 'Map apps suggesting place names'],
    before: ['cache', 'queue'],
    words: [
      ['trie', 'A tree where each step down adds one letter, so a path spells a phrase.'],
      ['prefix', 'The first letters of a phrase, such as "ca" in "cat".'],
      ['top-k', 'The k best items, such as the 5 most popular.'],
      ['aggregator', 'A job that counts how often each phrase was searched.'],
      ['debounce', 'Waiting until typing pauses before asking the server.']
    ],
    math: {
      lines: ['\\text{requests/day} = U \\times Q \\times L', '\\text{memory} = P \\times S'],
      symbols: [
        ['U', 'number of people'],
        ['Q', 'searches per person per day'],
        ['L', 'letters typed per search, each asking for suggestions'],
        ['P', 'number of phrases stored'],
        ['S', 'bytes per phrase']
      ],
      example: [
        '10 million people search 10 times a day and type about 5 letters.',
        'Requests: 10,000,000 × 10 × 5 = 500 million a day.',
        '500,000,000 ÷ 86,400 is about 5,800 a second.',
        'Store 10 million phrases at 50 bytes: 10,000,000 × 50 B = 500 MB.',
        'That fits in the memory of one server.'
      ]
    },
    steps: [
      'Build a trie of popular phrases, one letter per step.',
      'At each node keep a ready list of the 5 most popular phrases below it.',
      'A request walks the typed letters and returns that node\'s list.',
      'Write each search to a log. An hourly job counts phrases and builds a new trie.',
      'Swap in the new trie whole, and filter out unwanted phrases first.'
    ],
    use: ['Answers must appear in a fraction of a second.', 'Popularity changes slowly, so hourly counts are fine.'],
    avoid: ['Scanning all phrases on each key press.', 'Updating the live trie on every single search.'],
    mistakes: [
      'Searching the whole branch under a prefix. Pre-store the top 5 instead.',
      'Counting inside the live trie, so readers wait on writers.',
      'Sending a request on every key press with no pause.'
    ],
    cheat: ['trie = path spells phrase', 'top 5 at every node', 'log, count, rebuild', 'swap whole trie', 'wait for typing pause'],
    next: ['cache', 'sharding', 'crawler'],
    sources: ['Knuth, The Art of Computer Programming, Vol. 3, section 6.3 (digital searching, tries)', 'Elasticsearch documentation: Completion suggester', 'Redis documentation: sorted sets']
  },
  notify: {
    what: 'A notification service lets every part of an app send push messages, emails and texts through one place. It uses one queue per channel, retries failures, and avoids sending the same message twice.',
    analogy: 'It works like a post office. Letters, parcels and telegrams each go to their own counter. A slow counter does not block the others.',
    uses: ['Shops telling you an order has shipped', 'Social apps telling you a friend replied', 'Sports apps sending goal alerts to millions of fans'],
    before: ['queue', 'idempotency'],
    words: [
      ['push notification', 'A short message sent to a phone through Apple or Google.'],
      ['channel', 'One way to reach a user: push, email or text.'],
      ['provider', 'An outside company that actually delivers the message.'],
      ['retry', 'Sending again after a failure.'],
      ['dead letter', 'A message set aside for a person after too many failures.'],
      ['quiet hours', 'The time when a user does not want alerts.']
    ],
    math: null,
    steps: [
      'Other services call one API with a user and a message. The API replies at once.',
      'The API checks the user\'s settings: channels allowed and quiet hours.',
      'It puts the message in the queue for each channel. Each queue has its own workers.',
      'Workers hand the message to a provider and retry with growing waits if it fails.',
      'Every message has an id, and workers skip ids they have already sent.'
    ],
    use: ['Many services need to reach users the same way.', 'Bursts, such as a goal alert to millions, must be absorbed.'],
    avoid: ['Sending from the main request path, where a slow provider would block users.', 'Sending every event with no limit per user.'],
    mistakes: [
      'One shared queue for all channels. A slow email provider then delays push.',
      'Retrying without an id check, so users get duplicates.',
      'Ignoring user settings and quiet hours.'
    ],
    cheat: ['one API, many channels', 'queue per channel', 'retry with backoff', 'message id stops repeats', 'cap alerts per user'],
    next: ['queue', 'idempotency', 'chat'],
    sources: ['Apple Developer documentation: Setting up a remote notification server (APNs)', 'Firebase Cloud Messaging documentation: Architectural overview', 'Amazon SNS Developer Guide: message delivery retries and dead-letter queues']
  },
  crawler: {
    what: 'A web crawler starts from a few links, downloads each page, finds the links inside, and repeats. It must skip pages it has seen and must be polite to each website.',
    analogy: 'Imagine exploring a maze by following every door you find. You mark rooms you visited, and you do not knock on the same door too often.',
    uses: ['Search engines that collect pages to index', 'Price-comparison sites that read many shop pages', 'Research projects that archive public web pages'],
    before: ['queue', 'hashing', 'cache'],
    words: [
      ['frontier', 'The list of links waiting to be downloaded.'],
      ['politeness', 'Waiting between visits so one website is not overloaded.'],
      ['robots.txt', 'A file where a website says which paths crawlers may visit.'],
      ['Bloom filter', 'A small structure that says "seen before" with rare false alarms.'],
      ['fetcher', 'A worker that downloads pages.']
    ],
    math: {
      lines: ['\\text{pages/s} = \\frac{G}{30 \\times 86{,}400}', 'F = \\text{pages/s} \\times T'],
      symbols: [
        ['G', 'pages wanted per month'],
        ['30 \\times 86{,}400', 'seconds in a 30-day month'],
        ['F', 'downloads in flight at the same moment'],
        ['T', 'seconds one download takes']
      ],
      example: [
        '1 billion pages a month is 1,000,000,000 ÷ 2,592,000, about 400 a second.',
        'Each download takes 0.5 seconds.',
        'In flight: F = 400 × 0.5 = 200 downloads at once.',
        'Pages average 100 KB, so a month is 1,000,000,000 × 100 KB = 100 TB.',
        'Ten billion seen URLs at 8 bytes each is 80 GB, which is why a Bloom filter helps.'
      ]
    },
    steps: [
      'Take a link from the frontier and check robots.txt for that site.',
      'Download the page and save it in bulk storage.',
      'A parser pulls out the links in the page.',
      'Skip links already seen, using a set or a Bloom filter. Add new ones to the frontier.',
      'Keep one waiting line per website and pause about a second between visits.'
    ],
    use: ['You need a large copy of public pages.', 'You can follow each site\'s rules.'],
    avoid: ['Ignoring robots.txt or hitting one site hard.', 'Crawling pages behind a login you have no right to.'],
    mistakes: [
      'Not checking for repeats. The crawler loops forever on pages that link to each other.',
      'One shared line for all sites, so one slow site blocks the rest.',
      'Looking up the website address again for every page.'
    ],
    cheat: ['frontier, fetch, parse, repeat', 'skip seen links', 'one line per site', 'obey robots.txt', 'many fetchers'],
    next: ['typeahead', 'queue', 'hashing'],
    sources: ['RFC 9309, Robots Exclusion Protocol', 'Heydon and Najork, Mercator: A scalable, extensible web crawler, World Wide Web, 1999', 'Bloom, Space/time trade-offs in hash coding with allowable errors, Communications of the ACM, 1970', 'Brin and Page, The anatomy of a large-scale hypertextual web search engine, 1998']
  },
  dlimit: {
    what: 'A distributed rate limiter enforces one limit across many servers. Each server must see the same count. So the counters live in one shared fast store, updated with one atomic step.',
    analogy: 'Many shop tills sell tickets with one limit per person. They must share one tally sheet, or one person gets the limit at every till.',
    uses: ['Public APIs behind many gateway servers', 'Login pages that block guessing across all servers', 'Messaging services that cap sends per account'],
    before: ['ratelimit', 'hashing', 'cache'],
    words: [
      ['gateway', 'The front door server that checks every request.'],
      ['shared store', 'One fast memory store that all servers read and write.'],
      ['atomic', 'Done as one step that cannot be interrupted by another.'],
      ['race', 'A bug where two actions overlap and give a wrong result.'],
      ['sliding window', 'Counting requests over the last N seconds, measured from now.'],
      ['fail open', 'Let requests through when the limiter store is down.']
    ],
    math: {
      lines: ['\\text{checks/s} = \\frac{R}{86{,}400}', '\\text{memory} = U \\times S'],
      symbols: [
        ['R', 'requests per day'],
        ['U', 'number of users'],
        ['S', 'bytes of counter data per user']
      ],
      example: [
        '1 billion requests a day is 1,000,000,000 ÷ 86,400, about 11,600 a second.',
        'Each user needs about 100 bytes of counters.',
        'Memory: 10,000,000 users × 100 B = 1 GB.',
        'Race example: two gateways both read 99 and both write 100. Then 101 requests got through.',
        'An atomic add-one returns 100 to one gateway and 101 to the other, so only 100 pass.'
      ]
    },
    steps: [
      'Every gateway asks the shared store for the user\'s count.',
      'The store adds one and returns the new count in one atomic step.',
      'If the count is over the limit, the gateway answers 429 with Retry-After.',
      'Use a sliding window so bursts at a window edge cannot both pass.',
      'Split users over several store nodes by hashing the user id.'
    ],
    use: ['You run several gateways and need one limit per user.', 'The check must add almost no delay.'],
    avoid: ['Counting in each gateway\'s own memory when the limit is global.', 'Slow storage on disk for hot counters.'],
    mistakes: [
      'Reading and writing the count in two steps. That allows a race.',
      'Not deciding what happens when the store is down. Choose fail open or fail closed.',
      'Using fixed minutes only. A client can send double at the edge.'
    ],
    cheat: ['one shared counter', 'atomic add-one', 'sliding window', 'shard by user id', 'decide fail open or closed'],
    next: ['ratelimit', 'hashing', 'dcache'],
    sources: ['Redis documentation: INCR, EXPIRE, Lua scripting and the rate limiter pattern', 'RFC 6585, section 4 (429)', 'Cloudflare blog: How we built rate limiting capable of scaling to millions of domains', 'Kong Gateway documentation: Rate Limiting plugin']
  },
  drive: {
    what: 'A file-sync service keeps your files the same on all your devices. Files are cut into chunks that are saved by their content. Only changed chunks are sent, and a small database tracks names and versions.',
    analogy: 'A big book is stored as separate numbered pages. When you fix one page, only that page is sent to your friends.',
    uses: ['Cloud drives that sync documents and photos', 'Photo apps that back up your pictures', 'Team tools that share files on many laptops'],
    before: ['queue', 'sharding', 'hashing'],
    words: [
      ['chunk', 'A fixed-size piece of a file.'],
      ['metadata', 'Small facts about a file: name, folder, size, version.'],
      ['content hash', 'A short code worked out from the bytes of a chunk.'],
      ['deduplication', 'Storing identical chunks only once.'],
      ['signed link', 'A temporary web address that allows one upload or download.'],
      ['conflict', 'Two devices edit the same file before they sync.']
    ],
    math: {
      lines: ['\\text{uploads/s} = \\frac{U \\times F}{86{,}400}', '\\text{new data/day} = U \\times F \\times S'],
      symbols: [
        ['U', 'number of users'],
        ['F', 'files each user saves in a day'],
        ['S', 'average file size']
      ],
      example: [
        '50 million users save 2 files a day. That is 100 million uploads.',
        '100,000,000 ÷ 86,400 is about 1,200 uploads a second.',
        'Files average 1 MB, so new data is 100,000,000 × 1 MB = 100 TB a day.',
        'A 40 MB file edited in one place sends one 4 MB chunk, not 40 MB.'
      ]
    },
    steps: [
      'Cut each file into 4 MB chunks and name each by the hash of its bytes.',
      'The device uploads chunks straight to block storage with a signed link.',
      'The service saves the metadata: the file name and the list of chunk hashes.',
      'It posts a change to a feed. Other devices see it and pull the new chunks.',
      'If two offline edits clash, the later save becomes a separate copy.'
    ],
    use: ['Files are large and often change a little.', 'Many devices must see the same files.'],
    avoid: ['Sending the whole file again for a small edit.', 'Storing file bytes in the main database.'],
    mistakes: [
      'Sending file bytes through the API servers, which then become the bottleneck.',
      'Overwriting on conflict and losing someone\'s edit.',
      'Keeping the metadata and the bytes in the same store.'
    ],
    cheat: ['file = list of chunks', 'name chunk by its hash', 'send changed chunks only', 'metadata in database', 'bytes in block storage'],
    next: ['video', 'sharding', 'hashing'],
    sources: ['Dropbox Tech Blog: Inside the Magic Pocket and Streaming File Synchronization', 'Amazon S3 User Guide: Sharing objects with presigned URLs', 'Google Drive API documentation: Manage uploads and revisions', 'rsync algorithm: Tridgell and Mackerras, The rsync algorithm, 1996']
  },
  leaderboard: {
    what: 'A leaderboard shows the top players and the rank of each player, live. A sorted set keeps players in score order at all times. Changing a score or asking for a rank takes only a few steps.',
    analogy: 'A race scoreboard where each runner\'s card slides to its right place the moment the time changes.',
    uses: ['Online games that show top players', 'Fitness apps that rank friends by weekly steps', 'Quiz apps that rank scores live'],
    before: ['cache', 'indexes'],
    words: [
      ['sorted set', 'A collection of unique items ordered by a score.'],
      ['skip list', 'A layered list that lets you jump ahead, so lookups take few steps.'],
      ['rank', 'How many players have a higher score, plus one.'],
      ['tie', 'Two players with the same score.'],
      ['archive', 'Saving an old board away when a new period starts.']
    ],
    math: {
      lines: ['\\text{steps} \\approx \\log_{2}(N)', '\\text{memory} = N \\times S'],
      symbols: [
        ['N', 'number of players'],
        ['\\log_{2}(N)', 'how many times you halve N to reach 1'],
        ['S', 'bytes per player']
      ],
      example: [
        '10 million players: halve 10,000,000 again and again until 1.',
        'That takes about 23 halvings, so updates and rank lookups need about 23 steps.',
        'Sorting 10 million rows each time would need millions of steps.',
        'At 100 bytes per player, memory is 10,000,000 × 100 B = 1 GB.',
        '100 million score updates a day is about 1,200 per second, which one set handles easily.'
      ]
    },
    steps: [
      'Keep each player and score in a sorted set in memory.',
      'When a game ends, add points with one call. The set moves the player to the right place.',
      'The top 10 is the first ten members read from the high end.',
      'A rank is found by counting the members above the player as the set is walked.',
      'Also save each update in the database, so the set can be rebuilt after a crash.'
    ],
    use: ['Scores change often and rank must be live.', 'The data fits in memory.'],
    avoid: ['Sorting a whole table on each request.', 'Memory as the only copy of scores.'],
    mistakes: [
      'Computing rank by scanning all players.',
      'Ignoring ties. Add the time into the stored score to break them.',
      'Putting a billion players in one set. Split by region and add up counts.'
    ],
    cheat: ['sorted set = always in order', 'about log N steps', 'top 10 = first ten', 'rank = members above you', 'back up to database'],
    next: ['dcache', 'sharding', 'cache'],
    sources: ['Redis documentation: Sorted sets (ZADD, ZREVRANGE, ZREVRANK) and the leaderboard pattern', 'Pugh, Skip lists: a probabilistic alternative to balanced trees, Communications of the ACM, 1990', 'Redis documentation: Persistence (RDB and AOF)']
  }
};
if (typeof module !== 'undefined') module.exports = { SD_ABOUT_HLD };
