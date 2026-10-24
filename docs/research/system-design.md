# System design, HLD and LLD - source research and curriculum proposal

Bucket for DSAMaxxing's planned System design section. Captured 2026-10-24. Not committed.
Cross-references only (already covered): ByteByteGo in `docs/research/platforms/bytebytego.md`, donnemartin/system-design-primer in `docs/research/github-en.md`.

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), following the scratchpad recipe. Pages parsed to `scratchpad/rea/sd_*`.
- robots.txt checked first with curl for each host. hellointerview.com: allow all. designgurus.io: allow all except dashboard/admin/course-play/affiliate paths (we touched none). refactoring.guru: only admin/checkout/order paths blocked. highscalability.com: only ghost/admin-type paths blocked. dataintensive.net: only comment lines, no Disallow. github.com: only repo roots and `/topics` fetched (no /tree, /raw, /search).
- No login, no bot check or CAPTCHA appeared on any page. REA sometimes returned "Connection closed" or "Request timed out" on the first try; a retry of the same single page worked. Pages from designgurus.io course/framework/index URLs repeatedly produced responses over REA's 10 MB cap or dropped the connection, so those were NOT captured (recorded as gaps; their terms also forbid copying, so little was lost).
- Pages were captured one per call where heavy. Lists are summarised as sizes, topics, structure and about 10 sample links. All wording below is ours.
- Licenses read from the repo sidebar/README or the site's terms page. Anything without an explicit permissive licence is "facts only".

## Per-source findings

### Hello Interview (hellointerview.com)
- Covers: system design, low-level design, coding, behavioral, ML system design, AI-enabled coding, salary negotiation, plus company guides and a 5,000+ question bank (premium).
- Structure of the System Design track: "In a Hurry" (introduction, how to prepare, a delivery framework, core concepts, key technologies, common patterns, question breakdowns), then Core Concepts (networking essentials, API design, data modeling, caching, sharding, consistent hashing, CAP, DB indexing, numbers to know), Deep Dives (about 15 technologies: Redis, Kafka, Postgres, DynamoDB, Cassandra, Elasticsearch, Flink, ZooKeeper, Temporal, vector DBs, time-series DBs, CDC, API gateway, proximity search, big-data structures), seven Patterns (scaling reads, scaling writes, contention, large blobs, long-running tasks, multi-step processes, real-time updates), "In the Wild" write-ups of real company systems (Discord, Figma, Slack, Shopify, Spotify, Meta), and about 30 question breakdowns (Bitly, Dropbox, Ticketmaster, News Feed, Tinder, WhatsApp, Uber, YouTube, Web Crawler, Rate Limiter, Payment System, Robinhood, Google Docs, Job Scheduler, Top-K, Metrics, Online Chess and more).
- Breakdown format (Bitly page): functional/non-functional requirements, core entities, API, high-level design built one requirement at a time, deep dives each graded as Bad / Good / Great solution, final design, then "what is expected at mid / senior / staff". Very reusable teaching shape.
- LLD track: intro explains LLD vs HLD ("system design is the map, LLD is the blueprint"), regional differences (pseudocode vs real code, patterns asked more directly in India/Asia), a five-point rubric (problem analysis, class design, code quality, extensibility, communication), then delivery framework, OOP concepts, principles, patterns, problem breakdowns (parking lot linked).
- Teaching format: long-form articles with diagrams and code tabs, community comments, guided practice with feedback, live AI mock interviews (premium), peer design library.
- Business model: free learning content with premium upsell. Premium plans 1 month / 1 year / lifetime (INR 3,199 / 6,299 / 21,374 shown), includes 36 videos, 66 guided-practice problems, question bank, AI tutor, one live practice interview; frequent "up to 25% off" banner.
- License: all rights reserved; Terms (Optick Labs Inc.) grant personal non-commercial use only, forbid derivative works, scraping, and "viewing the website with the objective of laying groundwork for a similar or competitive website". FACTS ONLY. We stopped crawling after four pages; nothing is to be reused beyond the high-level curriculum shape (topic names are facts).

### Design Gurus (designgurus.io, Grokking System Design)
- Covers: Grokking the System Design Interview (flagship, "15+ real-world problems" and a repeatable framework), System Design Fundamentals (scalability, load balancing, caching, databases, CAP, quiz per chapter), System Design Interview II, coding-pattern courses (24 patterns, 543 lessons), roadmaps/"paths" (System-Design-Interview-Playbook), problem set, mock interviews, resume reviews. Site also has /system-design-interview with /concepts, /framework, /questions sub-pages (not captured).
- Format: text lessons with diagrams, a quiz in each fundamentals chapter, human mock interviews with ex-FAANG engineers.
- Business model: per-course purchase and subscription, constant discount banner (60% sale shown, India price about $26 for the system design course vs $148 list), learner counts advertised (about 191k and 93k on the two system design courses), affiliate program, mock interview and resume review upsells.
- License: Terms say content is owned by Design Gurus or its authors, personal non-commercial use only, no reproduction, derivative work or screenshots. FACTS ONLY.
- Gap: course landing pages, framework and index pages not captured (REA size limit and connection drops). Home page, terms captured.

### refactoring.guru (design patterns catalog for LLD)
- Covers: 22 classic GoF patterns in three groups. Creational (Factory Method, Abstract Factory, Builder, Prototype, Singleton), Structural (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy), Behavioral (Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor). Also a refactoring catalog: code smells in five groups and about 60 named refactorings.
- Per-pattern page shape (Strategy page): Intent, Problem, Solution, Real-World Analogy, Structure, Pseudocode, Applicability, How to Implement, Pros and Cons, Relations with Other Patterns, then code in Java, C#, C++, Go, PHP, Python, Ruby, Rust, Swift, TypeScript. Extra pages: what is a pattern, history, classification, criticism, why learn patterns. Translated into es, fr, ja, ko, pl and more.
- Teaching format: story-first (a problem told as a short scenario, then the solution), illustrated with cartoon-style structure diagrams; no interactivity. Paywall is an eBook and courses sold in the sidebar ("support our free website").
- Business model: free site funded by eBook, Refactoring course, Git course sales.
- License: no open licence found; Terms mention only an eBook license; treat as all rights reserved. FACTS ONLY. The 22-pattern list and the three-way grouping are historical GoF facts and fine to use; the problem-story/analogy wording and diagrams must be our own.

### High Scalability (highscalability.com)
- Covers: a long-running Ghost blog of architecture write-ups ("Building bigger, faster, more reliable websites") and weekly "Stuff the Internet Says on Scalability" round-ups; posts on how real companies scaled (Uber, AWS S3, Kafka, Presto at Meta, gossip protocol, consistent hashing). Latest listing on the home page ends in 2024, so it looks dormant. Navigation links to a paid System Design Interview course (ByteByteGo affiliate) and an email subscribe form.
- Format: text-only articles with occasional images. Business model: sponsorship posts historically, now newsletter and course referral.
- License: none shown (footer copyright hidden). Many posts are reposts from other authors "approved by the author". FACTS ONLY; useful as a "real systems" reading list.

### Designing Data-Intensive Applications (dataintensive.net)
- Covers: marketing page for Martin Kleppmann's O'Reilly book: reliability, scalability, maintainability, trade-offs across storage and processing systems, theory tied to practice. Tabs: About, Where to Buy, Translations, Poster. Table of contents lives on O'Reilly (not fetched).
- Format: print/ebook; the site has no lesson content. Business model: book sales via retailers. Footer: "(c) 2014-2019 Martin Kleppmann" - all rights reserved.
- Use: curriculum inspiration only (the book's three-part split: foundations of data systems, distributed data, derived data). Cite as recommended reading, never copy. FACTS ONLY.

### Engineering-blog and scalability link lists
- kilimchoi/engineering-blogs: 38.8k stars, 2.1k forks, 1,720 commits, last commit June 2024. One large README of company and individual engineering blogs, grouped alphabetically (companies A-Z, individuals A-Z, products/technologies). No licence shown. FACTS ONLY (a link index of other people's blogs; we can link out, not reproduce the list).
- binhnguyennus/awesome-scalability: 75k stars, 7.2k forks, **MIT**, last commit Jan 2026 ("2026 cleanup"). Sections: Principle, Scalability, Availability, Stability, Performance, Intelligence, Architecture, Interview, Organization, Talk. The Interview section alone has about 20 entries. Sample links worth citing in a "read the real thing" box: Netflix "What happens when you press play", Spotify streaming, Monzo peer-to-peer payments, Jeff Dean's large-scale lessons, Paxos Made Live, distributed locking, SQL transaction isolation, GitHub transit and peering, I/O wait time, "Anatomy of a System Design Interview". PERMISSIVE: the curation and section taxonomy can be adapted with MIT notice kept.
- karanpratapsingh/system-design: 46.6k stars, 6.1k forks. Free course README of about 55 chapters: IP, OSI, TCP/UDP, DNS, load balancing, clustering, caching, CDN, proxy, availability, scalability, storage, SQL/NoSQL, replication, indexes, normalization, ACID/BASE, CAP/PACELC, transactions, sharding, consistent hashing, federation, N-tier, message brokers/queues/pub-sub, microservices, event-driven, event sourcing, CQRS, API gateway, REST/GraphQL/gRPC, WebSockets/SSE, geohashing/quadtrees, circuit breaker, rate limiting, idempotency, service discovery, SLA/SLO/SLI, disaster recovery, VMs/containers, OAuth/SSO/TLS, then case studies URL shortener, WhatsApp, Twitter, Netflix, Uber. Also sold as a Leanpub book. Repo shows a "License" link but the type is not named on the page (custom). Treat as unverified; FACTS ONLY (topic order is useful as a checklist).

### LLD repositories (GitHub)
- ashishps1/awesome-low-level-design: 27.6k stars, 6.6k forks, 362 commits, last commit Aug 2026, **GPL-3.0**, maintained by the AlgoMaster author. Structure: Start Here, OOP fundamentals (classes, enums, interfaces, encapsulation, abstraction, inheritance, polymorphism), class relationships (association, aggregation, composition, dependency), design principles (DRY, YAGNI, KISS, SOLID), the 23 GoF patterns, UML (class, use case, sequence, activity, state machine), concurrency concepts and problems, how to answer an LLD interview, and 40+ problems graded easy/medium/hard (parking lot, vending machine, LRU cache, elevator, tic-tac-toe, pub-sub, splitwise, chess, snake and ladder, ride-sharing, movie ticket booking, stock brokerage, Spotify, Swiggy; concurrency: FooBar, thread-safe cache with TTL, blocking queue). Code in Java, Python, C#, C++, Go, TypeScript. GPL-3 would infect our site if adapted: FACTS ONLY (topic list is fine). Cross-ref: see `docs/research/algomaster.md`.
- prasadgujar/low-level-design-primer: 8k stars, 2.5k forks, 7 contributors. Mostly a question list and TODOs; README License section reads "TODO". No licence. FACTS ONLY.
- tssovi/grokking-the-object-oriented-design-interview: 6.4k stars, 2.8k forks, Python. Extended notes mirroring the paid DesignGurus OOD course: OO basics, UML (use case, class, sequence, activity), 16 case studies (library, parking lot, Amazon, Stack Overflow, movie tickets, ATM, airline, blackjack, hotel, restaurant, chess, brokerage, car rental, LinkedIn, Cricinfo, Facebook), plus PlantUML object diagrams. No licence shown and derived from a paid course. FACTS ONLY; avoid.
- kousiknath/LowLevelDesign: 526 stars, **MIT**, Java, last commit Oct 2024. 29 implemented LLD problems: Kafka-like message broker, Google Calendar, BookMyShow, multithreaded logger, blocking queue, connection pool, parking lot, scheduled thread pool, Uber driver dispatch, chat app, notification system, online judge, elevator, stock broker, tic-tac-toe, file system, snake and ladder, thread pool, inverted index, leaderboard, meeting room scheduler; planned: Splitwise, rate limiter, news feed, YouTube, RedBus. PERMISSIVE: usable to seed our LLD case studies with MIT notice.
- madhank93/learn-system-design: 155 stars, no licence shown. FACTS ONLY.
- GitHub topic `low-level-design`: 560 public repos (ranked list top: ashishps1, prasadgujar, kumaransg/LLD, imkgarg, InterviewReady/Low-Level-Design, kousiknath, naqushab/ScalerAcademy, sbvkrishna, anomaly2104's per-problem repos such as lld-parking-lot and chess-low-level-system-design, armankhondker's resource list). Only the two repos above were opened; others have unchecked licences (gap).

## Cross-references
- ByteByteGo: NC-ND visual guides plus a paid System Design Interview course (28 chapters). Stay away from copying; its strength is the static annotated diagram sequence, which we can beat with animation.
- donnemartin/system-design-primer (CC BY 4.0): the best permissive seed for HLD fundamentals, the 4-step method and back-of-envelope numbers. See `github-en.md` row and recommendation 3.
- Hello Interview, Design Gurus, ByteByteGo, AlgoMaster all follow the same funnel: free fundamentals, paid case studies/mocks. Our differentiator is animated story visuals, which none of them has.

## Proposed DSAMaxxing System design curriculum

Source legend: **SDP** = system-design-primer (CC BY 4.0, Donne Martin), **AS** = awesome-scalability (MIT, binhnguyennus), **KN** = kousiknath/LowLevelDesign (MIT). Anything else listed under "inspiration" is facts-only: we take the idea of the topic, never wording or diagrams. Credit lines go into `ATTRIBUTION.md` and a footer on each adapted lesson.

House-style note for visuals: each lesson gets one short animated "story" scene (a tiny city or kitchen with named characters and packets of requests flowing along roads), step-through with a play/scrub control, matching the gym-buddy visual language in `gym-buddy-visual-language.md`.

### Track A - HLD
Unit 1: Fundamentals
| # | Lesson | Seed | Story visual idea |
|---|---|---|---|
| A1 | Latency, throughput, availability, nines | SDP (performance vs scalability, availability) | A one-lane vs four-lane toll road; cars as requests, a stopwatch counting p50/p99. |
| A2 | Back-of-envelope estimation | SDP (powers of two, latency numbers) | A napkin that fills in: users -> requests/sec -> storage/day, slider changes the users and the arithmetic updates live. |
| A3 | Scaling: vertical vs horizontal | SDP | A food stall that first buys a bigger stove, then opens more stalls behind a doorman. |
| A4 | Load balancers (L4/L7, algorithms) | SDP | Customers at a mall entrance guided by a host; toggle round robin, least-connections, hashing and watch queue lengths. |
| A5 | Caching (aside, write-through, write-back, eviction) | SDP, AS Performance links | A librarian keeping popular books on a desk; stale-book scene for invalidation. |
| A6 | CDN and DNS | SDP | A world map with copies of a poster printed at local shops; a click travels to the nearest shop. |
| A7 | Choosing a database (SQL vs NoSQL, indexes) | SDP; DDIA as recommended reading | A filing cabinet vs a pile of labelled boxes; an index as a tabbed divider shrinking a search. |
| A8 | Replication | SDP | Leader scribe copies the notebook to followers; kill the leader and watch a follower get promoted. |
| A9 | Sharding and consistent hashing | SDP; HI idea (facts) | Ring of lockers; add a locker and see only a few keys move vs modulo hashing where everything moves. |
| A10 | Consistency, CAP/PACELC | SDP | Two bank branches with a cut phone line; pick consistency (refuse) or availability (accept and reconcile). |
| A11 | Queues and async (pub-sub, idempotency) | SDP; AS | A restaurant order ticket rail between waiter and kitchen; duplicate ticket demo for idempotency. |
| A12 | Rate limiting | SDP / AS | Token bucket as a jar refilled by a tap; bursts drain it. |
| A13 | APIs and communication (REST, RPC, WebSockets) | SDP | Letters vs phone calls vs walkie-talkies. |
| A14 | Reliability: timeouts, retries, circuit breaker | AS Stability links | A fuse box tripping to protect the house. |

Unit 2: The 4-step interview method (adapt SDP's approach: requirements and scope, high-level design, core components, scale it). Story visual: a whiteboard that fills in step by step with a progress ribbon. Rubric ideas (requirements, design, depth, communication) from Hello Interview and Design Gurus are facts-only inspiration; write our own levels (junior/mid/senior).

Unit 3: Case studies. Use one repeated template: requirements -> estimates -> API -> data model -> first diagram -> bottleneck -> fix -> final diagram. Add the Hello Interview idea of grading each deep-dive option as bad / good / great in our own words.
| # | Case | Seed | Story visual |
|---|---|---|---|
| C1 | URL shortener | SDP (pastebin/bit.ly solution), AS | Short-code ticket booth; counter vs hash allocation race. |
| C2 | Chat (1:1 and group) | SDP (messaging pointers), AS | Mailboxes and a message-in-flight animation, offline delivery. |
| C3 | News feed / timeline | SDP (twitter timeline solution) | Fan-out on write vs read: postmen delivering vs readers collecting. |
| C4 | Ride sharing (matching, geo index) | AS Architecture links; geohash topic | Map grid with cars as dots; geohash cells lighting up. |
| C5 | Video streaming | AS (Netflix, Spotify reading) | Video chopped into chunks flowing from origin to edge; bitrate switch on bandwidth drop. |
| C6 | Payments | AS; idempotency lesson | Receipt stamp ensuring one charge, ledger double entry. |
| C7 | Web crawler | SDP | Spider on a web of pages with a visited set and politeness timer. |
| C8 | Rate limiter service, distributed cache, notification system, search autocomplete (typeahead), file sync (Dropbox style) | SDP (query cache, search) | Reuse A5, A12 characters. |

Reading box on every case: "How the real company did it" with 2-3 links curated from AS (MIT, credit) rather than copied text.

### Track B - LLD
Unit 1: OOP and SOLID
| # | Lesson | Seed | Story visual |
|---|---|---|---|
| L1 | Classes, objects, encapsulation, abstraction | own words; facts from refactoring.guru/AlgoMaster topic list | Lego bricks with sealed boxes and labelled plugs. |
| L2 | Inheritance vs composition, polymorphism | own words | Vehicle kit: swapping an engine part at runtime. |
| L3 | Class relationships (association, aggregation, composition, dependency) | own words | Diagram arrows animated as "uses", "has", "owns". |
| L4 | SOLID (one scene per principle), DRY, KISS, YAGNI | own words | Each principle shown by a breaking-then-fixed design. |
| L5 | UML basics (class, sequence, state) | own words | Sequence diagram that plays as a conversation. |

Unit 2: Design patterns (22 GoF patterns by category, taxonomy is a historical fact). Teach 10 first: Singleton, Factory Method, Builder, Adapter, Decorator, Facade, Observer, Strategy, State, Command. Our own analogies per pattern, our own diagrams. Story visual: before/after code-smell scene (switch statement jungle -> Strategy plug-ins). Inspiration only from refactoring.guru (problem -> solution -> structure -> when to use); do not copy analogies.

Unit 3: Case studies. Seed starting implementations (Java) from **KN (MIT)** where it has the problem, credit the author; otherwise write fresh, using problem lists (facts) from the GPL/no-licence repos as a checklist.
| # | Case | Seed | Story visual |
|---|---|---|---|
| D1 | Parking lot | KN | Cars arriving at a lot; slot allocation strategy toggle; ticket and fee. |
| D2 | Elevator system | KN | Building cutaway with scheduling policy (SCAN) toggle. |
| D3 | LRU cache | own (DSA overlap: hashmap + doubly linked list; link to the DSA section) | Cards moving to the front of a deck, tail card evicted. |
| D4 | BookMyShow / movie booking | KN | Seat grid with two users racing; lock with timeout. |
| D5 | Splitwise | own (KN lists it as planned) | Debts as arrows simplified into fewer arrows. |
| D6 | Vending machine, ATM, tic-tac-toe, snake and ladder, chess | KN (tic-tac-toe, snake and ladder, file system), own for the rest | State machine lit up step by step. |
| D7 | Concurrency set: thread-safe logger, blocking queue, connection pool, thread pool | KN | Worker bees and a shared tray with lock visuals. |
| D8 | Chat, notification system, pub-sub/message broker, meeting room scheduler | KN | Mail sorting office with topic pigeonholes. |

Each case has a "design it yourself" step (class-box drag-and-drop) before showing the reference class diagram, then a short interactive "extend the requirement" round.

## Licensing summary
| Source | Licence | Use |
|---|---|---|
| binhnguyennus/awesome-scalability | MIT | Adapt taxonomy and curated links with credit |
| kousiknath/LowLevelDesign | MIT | Adapt Java case-study code/problem set with credit |
| donnemartin/system-design-primer | CC BY 4.0 | Adapt with credit (cross-ref) |
| ashishps1/awesome-low-level-design | GPL-3.0 | Facts only |
| karanpratapsingh/system-design | custom "License" file, type not shown | Facts only |
| tssovi/grokking-OOD, prasadgujar LLD primer, kilimchoi/engineering-blogs, madhank93 | none shown | Facts only |
| Hello Interview, Design Gurus, refactoring.guru, High Scalability, dataintensive.net, ByteByteGo | all rights reserved / terms forbid copying | Facts only |

## Gaps and next steps
- designgurus.io course, framework, concepts and questions pages not captured (REA size/connection limits); Terms already forbid reuse, so low value.
- Hello Interview LLD problem pages and pricing FAQ not read beyond the intro; Terms prohibit competitive viewing, so we stopped.
- kousiknath/LowLevelDesign repo contents (/tree) are disallowed by robots; to adapt a specific problem, open the file in the browser by hand or clone it with git (MIT permits it) and read the license text and per-file headers before copying.
- Other GitHub topic repos (kumaransg/LLD, InterviewReady/Low-Level-Design, TharunKumarReddyPolu/LLD-Handbook) not checked for licences.
- dataintensive.net content-signal comments in robots.txt express AI/search reservations; we only recorded public marketing facts.
