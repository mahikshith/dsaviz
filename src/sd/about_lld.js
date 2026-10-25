// About-this-lesson content for the low-level design track (classes and design patterns). Our own writing; facts checked against the sources listed per lesson.
const GOF = 'Gamma, Helm, Johnson, Vlissides, Design Patterns: Elements of Reusable Object-Oriented Software, 1994';
const SD_ABOUT_LLD = {
  solid: {
    what: 'SOLID is a set of five habits for writing classes. A class is a blueprint that bundles data with the actions that use it. The habits keep code easy to change and easy to test.',
    analogy: 'Think of a kitchen. One cook chops, one cooks, one plates. You can swap the plating cook without touching the others.',
    uses: ['Payment code that can add a new card type without rewriting checkout', 'Web frameworks that let you plug in your own database', 'Test suites that swap a real email sender for a fake one'],
    before: ['Classes and objects', 'Functions'],
    words: [
      ['class', 'A blueprint for making objects. It lists the data and the actions they have.'],
      ['object', 'One thing made from a class, such as one particular invoice.'],
      ['method', 'An action that belongs to a class, like print() on a printer.'],
      ['interface', 'A list of method names a class promises to offer. It says what, not how.'],
      ['inheritance', 'A class reuses another class and adds to it, like class Car(Vehicle).'],
      ['dependency', 'Something a class needs in order to work, such as a database.']
    ],
    math: null,
    steps: [
      'S, single responsibility: each class has one reason to change. Split totals, printing and saving into separate classes.',
      'O, open and closed: you add new behaviour by writing a new class. You do not edit old, working code.',
      'L, substitution: any class that fits an interface must work wherever that interface is expected.',
      'I, small interfaces: a class should not be forced to offer methods it never uses.',
      'D, depend on ideas: a class asks for an interface, and start-up code hands in the real part.'
    ],
    use: ['A class has grown big and does many unrelated jobs.', 'You expect new kinds of one thing, such as new printers or stores.'],
    avoid: ['A tiny script that you will throw away soon.', 'Splitting every class into many pieces before any change is needed.'],
    mistakes: [
      'Making one interface for everything. Small interfaces are easier to fill and to fake.',
      'Writing a subclass that throws "not supported". It breaks the promise of the interface.',
      'Creating helpers inside a class with new. The class then cannot accept a fake in tests.',
      'Treating the five letters as strict laws. They are guides, so weigh the cost of each split.'
    ],
    cheat: ['S: one reason to change', 'O: add classes, not edits', 'L: swap without surprise', 'I: small interfaces', 'D: ask for the idea, not the detail'],
    next: ['strategy', 'factory', 'observer'],
    sources: ['Robert C. Martin, Design Principles and Design Patterns, 2000', 'Robert C. Martin, Agile Software Development: Principles, Patterns, and Practices, 2002', 'Barbara Liskov and Jeannette Wing, A behavioral notion of subtyping, 1994', 'Python documentation, Classes tutorial and the abc module']
  },
  strategy: {
    what: 'The Strategy pattern puts each way of doing one job into its own class. All of them share one interface. A holder object picks one and calls it, and you can swap it while the program runs.',
    analogy: 'Think of a map app. You pick walking, cycling or driving. The app is the same, but the way it plans the route changes.',
    uses: ['Sorting with a custom rule, such as sorted(items, key=...) in Python', 'Java Comparator objects that tell a sort how to order things', 'Shipping cost rules that change by courier'],
    before: ['solid'],
    words: [
      ['strategy', 'One way of doing a job, written as its own class.'],
      ['interface', 'The shared list of methods every strategy offers.'],
      ['context', 'The object that holds a strategy and calls it. In the lesson, the Navigator.'],
      ['runtime', 'The time when the program is running, as opposed to when you write it.'],
      ['if-else chain', 'A long run of checks that picks what to do. Strategy replaces it.']
    ],
    math: null,
    steps: [
      'Find a long if-else chain where each branch does the same job in a different way.',
      'Write an interface with one method that all the ways can answer.',
      'Move each branch into its own class that fits the interface.',
      'Give the holder object a field for the current strategy.',
      'Let the screen or settings hand a strategy to the holder, and call it when needed.'
    ],
    use: ['There are several ways to do one job, and users choose between them.', 'A new way is likely to arrive soon, such as a new travel mode.'],
    avoid: ['There are only two simple branches that never change.', 'The ways differ in tiny details. A plain parameter is simpler.'],
    mistakes: [
      'Putting the choice back inside the holder with an if-else. Then nothing is gained.',
      'Making strategies that share hidden state. Each one should work alone.',
      'Adding the pattern for one branch only. Wait until a second way appears.'
    ],
    cheat: ['one job, many ways', 'interface RouteStrategy', 'holder.setStrategy(s)', 'new way = new class', 'no if-else in the holder'],
    next: ['parking', 'elevator', 'splitter'],
    sources: [GOF + ', Strategy, ch. 5', 'Robert C. Martin, Design Principles and Design Patterns, 2000', 'Python documentation, sorted() and the key argument', 'Java documentation, java.util.Comparator']
  },
  parking: {
    what: 'This lesson designs a parking lot step by step. First you list the nouns in the problem. Each noun becomes a class. Then you follow one car through the classes to check the design works.',
    analogy: 'It is like planning a school play. You list the roles first, then walk through one scene to see who says what.',
    uses: ['Booking systems that model rooms, guests and reservations', 'Library software with books, members and loans', 'Airport and train station tools that hand out limited slots'],
    before: ['solid', 'strategy'],
    words: [
      ['requirement', 'A sentence that says what the system must do.'],
      ['noun', 'A thing word in the requirements, such as vehicle or ticket. It often becomes a class.'],
      ['entity', 'A class that stands for a real thing, like Spot or Ticket.'],
      ['owner', 'The class that holds and manages others. The lot owns its spots.'],
      ['lock', 'A tool that lets only one task use something at a time.'],
      ['rule class', 'A class that holds one rule, like how much to charge.']
    ],
    math: null,
    steps: [
      'Write the requirements in plain sentences and circle the nouns.',
      'Turn the useful nouns into classes: ParkingLot, Spot, Ticket, gates.',
      'Give each class one job. The lot finds spots. The ticket records spot and time.',
      'Put the part that may change, the fee, behind an interface so you can swap it.',
      'Walk one car through entry and exit. Then try odd cases: full lot, two cars at once.'
    ],
    use: ['You are given a vague problem and must turn it into classes.', 'You want a checklist for design questions in interviews.'],
    avoid: ['Modelling every noun. Skip words that hold no data or action.', 'Adding features nobody asked for, such as valet service.'],
    mistakes: [
      'Starting to code before listing requirements. You may build the wrong thing.',
      'Making a Vehicle class for each car brand. Size is the only thing the lot needs.',
      'Forgetting the full lot. Always ask what happens when nothing is free.',
      'Letting two gates take one spot. Lock the spot while you check and claim it.'
    ],
    cheat: ['nouns become classes', 'verbs become methods', 'the owner holds the parts', 'put changing rules behind an interface', 'walk one request end to end'],
    next: ['elevator', 'movies', 'vending'],
    sources: [GOF + ', introduction on designing with objects', 'Craig Larman, Applying UML and Patterns, 3rd ed., 2004, ch. on domain models', 'Python documentation, threading.Lock']
  },
  observer: {
    what: 'The Observer pattern lets one object tell many others when it changes. The object keeps a list of listeners. When something happens, it calls each listener. It does not need to know what they do.',
    analogy: 'Think of a school bell. It rings once. Every class decides on its own what to do next.',
    uses: ['Button clicks in web pages, with addEventListener in the browser', 'Phone apps that refresh several screens when data changes', 'Message feeds where many readers follow one topic'],
    before: ['solid'],
    words: [
      ['subject', 'The object that changes and announces it. In the lesson, the StockTicker.'],
      ['listener', 'An object that wants to hear about changes. Also called an observer.'],
      ['subscribe', 'Join the list so you get told about changes.'],
      ['unsubscribe', 'Leave the list so you stop getting told.'],
      ['notify', 'Walk the list and call each listener.'],
      ['callback', 'A method that gets called later, when something happens.']
    ],
    math: null,
    steps: [
      'Give the subject an empty list of listeners.',
      'Write a small interface for listeners, with one method such as update(price).',
      'Let each listener call subscribe() to join the list.',
      'When the subject changes, it calls notify(). That walks the list and calls update() on each one.',
      'Let listeners call unsubscribe() when they are done, such as when a screen closes.'
    ],
    use: ['One change must reach many parts of the program.', 'The parts come and go while the program runs.'],
    avoid: ['Only one part cares. Call it directly.', 'Order of updates matters a lot. Listener order is easy to get wrong.'],
    mistakes: [
      'Forgetting to unsubscribe. The subject keeps calling something that no longer exists.',
      'Letting a slow listener block the rest. Keep update() short.',
      'Changing the list while notify() walks it. Walk over a copy.',
      'Making chains where one update triggers another subject. They can loop forever.'
    ],
    cheat: ['subject keeps a list', 'subscribe / unsubscribe', 'notify() calls update()', 'subject does not know the listeners', 'always unsubscribe'],
    next: ['strategy', 'command', 'decorator'],
    sources: [GOF + ', Observer, ch. 5', 'MDN Web Docs, EventTarget.addEventListener', 'Java documentation, java.util.Observer (deprecated since Java 9)', 'Python documentation, the logging module handlers']
  },
  factory: {
    what: 'A factory is one place in the code that builds objects for you. You ask it for a kind by name, and it returns the right object. The caller never names the exact class it gets.',
    analogy: 'Think of ordering a drink at a counter. You say "tea", and the staff pick the cup and the recipe.',
    uses: ['Java Calendar.getInstance, which returns a calendar suited to your region', 'Database tools that build the right connection from a settings word', 'Game engines that create enemies from a level file'],
    before: ['solid', 'strategy'],
    words: [
      ['factory', 'A class or function whose job is to create objects.'],
      ['product', 'The kind of object the factory makes, like a Notifier.'],
      ['concrete class', 'A real class you can make objects from, like SmsNotifier.'],
      ['constructor', 'The method that creates a new object, often written new Name().'],
      ['coupling', 'How tightly one piece of code depends on another.']
    ],
    math: null,
    steps: [
      'Write an interface that all products follow, such as Notifier with send().',
      'Write one class for each product: Email, SMS and so on.',
      'Write a factory with a create(name) method that picks and builds the right class.',
      'Let screens call factory.create() and use the result only through the interface.',
      'To add a product, write its class and add one line to the factory.'
    ],
    use: ['The right class depends on input, settings or a user choice.', 'Callers should not care which exact class they get.'],
    avoid: ['Only one class exists and none are planned.', 'Callers truly need to know the exact class.'],
    mistakes: [
      'Letting the factory grow into a giant if-else. Use a lookup table of names to classes.',
      'Returning the concrete class instead of the interface. Callers then depend on it again.',
      'Not handling an unknown name. Raise a clear error.',
      'Making the factory do more than build, such as sending messages.'
    ],
    cheat: ['factory.create("sms")', 'returns the interface type', 'one place to choose a class', 'new product = new class + one line', 'tests can pass a fake factory'],
    next: ['singleton', 'decorator', 'observer'],
    sources: [GOF + ', Factory Method and Abstract Factory, ch. 3', 'Java documentation, java.util.Calendar.getInstance', 'Python documentation, dictionaries and first-class functions']
  },
  singleton: {
    what: 'A Singleton is a class that allows only one object. A static method hands out that one object to everyone. It fits a few things, but it has costs you must know.',
    analogy: 'Think of the school principal\'s office. There is one, and everyone knows where it is. If it gets messy, everyone feels it.',
    uses: ['Java Runtime.getRuntime, which gives the one runtime of the program', 'App settings read once from a file at start-up', 'A shared logger that all parts write to'],
    before: ['factory'],
    words: [
      ['singleton', 'A class with exactly one object.'],
      ['static method', 'A method you call on the class itself, not on an object.'],
      ['global state', 'Data that any part of the program can read or change.'],
      ['thread', 'One line of work that runs at the same time as others.'],
      ['race condition', 'A bug that appears when two threads act at the same moment.'],
      ['dependency injection', 'Passing the objects a class needs into it, instead of it fetching them.']
    ],
    math: null,
    steps: [
      'Hide the constructor so no one outside can make a new object.',
      'Add a static get() method. The first call makes the object. Later calls return the same one.',
      'Let every class call get() and share that single object.',
      'Guard against two threads calling get() together. Make it at start-up, or use a lock.',
      'Consider passing the object in from main instead. It stays single, and the need is visible.'
    ],
    use: ['The thing is truly single and mostly read-only, such as settings.', 'Making two would cause real harm, like two writers on one file.'],
    avoid: ['The object holds data that tests change. Tests then affect each other.', 'You want to avoid passing an argument. That hides needs.'],
    mistakes: [
      'Creating the object lazily with no lock. Two threads can build two objects.',
      'Calling get() deep inside a class. Its constructor no longer shows what it needs.',
      'Storing changeable data in it. One test then leaks into the next.',
      'Using a Singleton as a handy global bucket for anything.'
    ],
    cheat: ['private constructor', 'static get()', 'create at start-up or lock', 'hidden needs hurt tests', 'prefer passing it in'],
    next: ['decorator', 'lru', 'movies'],
    sources: [GOF + ', Singleton, ch. 3', 'Java documentation, java.lang.Runtime.getRuntime', 'Python documentation, threading module and import system (modules load once)', 'Joshua Bloch, Effective Java, 3rd ed., 2018, item 3']
  },
  lru: {
    what: 'An LRU cache keeps a fixed number of items in fast memory. When it is full, it drops the item you used least recently. It uses a hash map plus a linked list so every step is quick.',
    analogy: 'Think of a small desk. You keep the papers you used today on top. When the desk is full, the oldest pile goes back to the shelf.',
    uses: ['Web browsers keeping recent pages and images', 'Databases keeping recently read rows in memory', 'Python functools.lru_cache, which remembers recent function results'],
    before: ['Hash maps (dictionaries)', 'Linked lists'],
    words: [
      ['cache', 'A small, fast store that keeps copies of data you may need again.'],
      ['hash map', 'A table that finds a value from its key in one step.'],
      ['linked list', 'A chain of nodes. Each node points to the next and the previous one.'],
      ['node', 'One link in the chain. It holds a key, a value and two pointers.'],
      ['evict', 'Remove an item to make room.'],
      ['hit and miss', 'A hit finds the item in the cache. A miss does not.']
    ],
    math: {
      lines: ['O(1)', 'O(n)'],
      symbols: [
        ['O(1)', 'the work stays the same size, however many items the cache holds'],
        ['O(n)', 'the work grows in step with n'],
        ['n', 'how many items are stored']
      ],
      example: [
        'Say the cache holds n = 1,000 items and you want to find one.',
        'Scanning a plain list may check up to 1,000 items. That is O(n).',
        'The hash map jumps to the right node in one step. That is O(1).',
        'Moving a node needs about four pointer changes. That is also O(1), whatever n is.'
      ]
    },
    steps: [
      'Keep a hash map from each key to its node, so lookups take one step.',
      'Keep the nodes in a linked list ordered by use. The newest sits at the head.',
      'On get(key), find the node in the map and move it to the head.',
      'On put(key) when full, remove the tail node. Remove its key from the map too.',
      'Add the new node at the head and add its key to the map.'
    ],
    use: ['Reading is slow and the same items are often read again.', 'Memory is limited, so you must choose what to forget.'],
    avoid: ['Items are read once and never again. A cache gives no gain.', 'Every item must stay. Evicting would lose data.'],
    mistakes: [
      'Removing a node from the list but leaving its key in the map. The two must agree.',
      'Forgetting to move a node on get(). It then looks old and is dropped early.',
      'Handling an empty list with special cases. Use dummy nodes at both ends.',
      'Sharing the cache between threads with no lock.'
    ],
    cheat: ['map: key to node', 'list: newest to oldest', 'get = move to head', 'put when full = drop the tail', 'get and put are O(1)'],
    next: ['movies', 'singleton', 'command'],
    sources: ['Python documentation, functools.lru_cache and collections.OrderedDict.move_to_end', 'Java documentation, java.util.LinkedHashMap (access order and removeEldestEntry)', 'Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., 2022, ch. 10 and 11']
  },
  elevator: {
    what: 'This lesson designs a two-elevator system for a building. Buttons make requests. A scheduler decides which car answers each one. Each car follows a simple rule for which floors to visit and in what order.',
    analogy: 'Think of a school bus on a fixed road. It picks up everyone on the way up the road, then everyone on the way back.',
    uses: ['Building elevators in offices and flats', 'Disk drives that order reads so the head sweeps in one direction', 'Delivery apps that assign orders to the nearest rider'],
    before: ['strategy', 'parking'],
    words: [
      ['request', 'A call for an elevator, with a floor and a direction.'],
      ['scheduler', 'The part that picks which car answers a request.'],
      ['state', 'What a car is doing now: its floor, direction and stops.'],
      ['stop', 'A floor the car has promised to visit.'],
      ['SCAN', 'A rule: serve every stop in one direction, then turn around.'],
      ['policy', 'A rule you may want to change later.']
    ],
    math: null,
    steps: [
      'Make classes for Button, Request, Elevator and the system that ties them together.',
      'Keep each elevator\'s floor, direction and list of stops inside the Elevator class.',
      'Put the "which car answers" rule behind a Scheduler interface.',
      'When a button is pressed, build a Request and ask the scheduler to pick a car.',
      'Each car visits stops in its current direction, then turns. It removes each stop once served.'
    ],
    use: ['Several workers share a stream of requests and need a fair rule.', 'The assignment rule may change, such as for rush hour.'],
    avoid: ['A single elevator. A simple queue may be enough.', 'Anything that needs exact real-time safety. Real lifts have hardware controls.'],
    mistakes: [
      'Sending a car the wrong way to reach a new stop. Prefer cars already heading there.',
      'Mixing the scheduler rule into the Elevator class. It becomes hard to change.',
      'Forgetting to remove a stop after serving it. The car loops forever.',
      'Ignoring the idle case, when a car has no stops at all.'
    ],
    cheat: ['Button makes Request', 'Scheduler.pick(cars, request)', 'Elevator keeps floor, direction, stops', 'SCAN: sweep one way, then turn', 'new policy = new Scheduler class'],
    next: ['vending', 'movies', 'splitter'],
    sources: [GOF + ', Strategy and State, ch. 5', 'Craig Larman, Applying UML and Patterns, 3rd ed., 2004', 'Silberschatz, Galvin, Gagne, Operating System Concepts, disk scheduling chapter (SCAN, the elevator algorithm)']
  },
  movies: {
    what: 'This lesson designs a movie ticket system. Its hard part is that two people may tap the same seat at once. A temporary hold on each seat makes sure only one person wins.',
    analogy: 'Think of a cinema counter. The clerk puts a reserved card on a seat while you pay. If you leave, the card goes away.',
    uses: ['Cinema and concert booking sites', 'Flight and train seat selection', 'Online shops that hold a stock item in your basket for a short time'],
    before: ['parking', 'Threads and locks'],
    words: [
      ['show', 'One screening of a movie at one time.'],
      ['seat hold', 'A short lock on a seat for one user, with an end time.'],
      ['race', 'A bug where the result depends on which of two requests is first.'],
      ['atomic', 'Done in one step that cannot be cut in half by another request.'],
      ['expire', 'End on its own when the time runs out.'],
      ['payment gateway', 'The outside service that takes the payment.']
    ],
    math: null,
    steps: [
      'Model Show, Seat and Booking. A booking ties paid seats to a user.',
      'When a user taps a seat, try to create a SeatLock with a user and an end time.',
      'Make taking the lock one atomic step, so only one request can succeed.',
      'Tell the second user at once that the seat is gone, before they pay.',
      'On payment success, turn the hold into a Booking. If time runs out, free the seat.'
    ],
    use: ['Limited items are sold to many people at the same time.', 'Users need time to pay without losing their choice.'],
    avoid: ['Items are unlimited, such as a download.', 'Holds are never released. Seats would stay blocked.'],
    mistakes: [
      'Checking if a seat is free and then taking it as two steps. Another request can slip in between.',
      'Keeping holds only in one server\'s memory. Use a shared place, such as a database row.',
      'Never expiring holds. An abandoned app would block the seat forever.',
      'Paying before the seat is held. A user could pay for a seat that is gone.'
    ],
    cheat: ['Show has Seats', 'SeatLock: seat, user, end time', 'take the lock atomically', 'pay, then confirm', 'holds expire on their own'],
    next: ['vending', 'splitter', 'lru'],
    sources: ['Martin Kleppmann, Designing Data-Intensive Applications, 2017, ch. 7 (transactions and race conditions)', 'Python documentation, threading.Lock', 'PostgreSQL documentation, SELECT ... FOR UPDATE and explicit locking']
  },
  vending: {
    what: 'The State pattern gives each situation of an object its own class. A vending machine has states such as idle, has money and sold out. Each state decides what a button press does.',
    analogy: 'Think of a traffic light. Pressing the crossing button does different things on red, green and amber.',
    uses: ['Media players that act differently when playing, paused or stopped', 'Orders that move through placed, paid, shipped and delivered', 'Network connections that are open, closing or closed'],
    before: ['solid', 'strategy'],
    words: [
      ['state', 'The situation an object is in now, such as Idle or SoldOut.'],
      ['transition', 'A move from one state to another.'],
      ['current state', 'The one state object the machine holds right now.'],
      ['delegate', 'Pass a call on to another object to handle it.'],
      ['event', 'Something that happens, like inserting a coin.']
    ],
    math: null,
    steps: [
      'List the situations the machine can be in: Idle, HasMoney, Dispensing, SoldOut.',
      'Write a State interface with the actions: insertCoin, select, dispense.',
      'Write one class per state. Each answers every action in its own way.',
      'Let the machine hold the current state and pass each call on to it.',
      'Let a state set the machine\'s next state when something changes, such as taking a coin.'
    ],
    use: ['What an action does depends on what happened before.', 'You see the same if-else on the situation in many methods.'],
    avoid: ['Only two states with one small difference. A flag may be clearer.', 'The states barely differ in behaviour.'],
    mistakes: [
      'Missing a transition, so the machine gets stuck in one state.',
      'Letting every state know every other state. Keep the links few.',
      'Allowing an action in the wrong state, such as dispensing with no payment. Reject it.',
      'Forgetting rare states, like a coin jam or an empty machine.'
    ],
    cheat: ['one class per situation', 'machine holds current state', 'machine passes calls to it', 'state sets the next state', 'new situation = new class'],
    next: ['decorator', 'command', 'elevator'],
    sources: [GOF + ', State, ch. 5', 'Robert C. Martin, Agile Software Development, 2002, ch. on finite state machines', 'Python documentation, enum module']
  },
  decorator: {
    what: 'A decorator is an object that wraps another object with the same interface. It adds behaviour before or after passing the call on. You can stack wrappers to mix features without writing a class for each mix.',
    analogy: 'Think of a gift. The gift stays the same, and you add paper, then a ribbon, then a card. Each layer is optional.',
    uses: ['Java BufferedReader wrapped around a FileReader to add buffering', 'Web servers that add logging, login checks and caching around a handler', 'HTTP clients that add retries and logging'],
    before: ['solid', 'strategy'],
    words: [
      ['decorator', 'A wrapper object that adds one feature and then calls the object inside.'],
      ['wrap', 'Hold another object and forward calls to it.'],
      ['layer', 'One wrapper in a stack of wrappers.'],
      ['inner and outer', 'The inner object is wrapped. The outer one is what your code calls.'],
      ['cache', 'A place that remembers answers so repeat calls are fast.'],
      ['retry', 'Try a failed call again.']
    ],
    math: null,
    steps: [
      'Write a small interface, such as HttpClient with get(url).',
      'Write the plain class that does the real work.',
      'Write each extra as a class that fits the interface and holds another one inside.',
      'In each wrapper, do the extra step and call the inner object.',
      'Stack the layers at start-up, and give the outer layer to the rest of the program.'
    ],
    use: ['You want optional extras in many combinations.', 'You cannot or should not edit the original class.'],
    avoid: ['The extra needs to reach into private details of the inner object.', 'Many thin layers would make errors hard to trace.'],
    mistakes: [
      'Stacking layers in the wrong order. A cache on the outside hides calls from the layers inside.',
      'Forgetting to call the inner object, so nothing real happens.',
      'Mixing up with Python\'s @decorator syntax. It is related, but it is not this pattern.',
      'Making a wrapper that changes the meaning of the call.'
    ],
    cheat: ['same interface in and out', 'wrapper holds an inner object', 'do extra, then call inner', 'order of layers matters', 'build the stack at start-up'],
    next: ['command', 'vending', 'singleton'],
    sources: [GOF + ', Decorator, ch. 4', 'Java documentation, java.io.BufferedReader and java.io.FilterInputStream', 'Python documentation, the Decorators glossary entry and PEP 318']
  },
  command: {
    what: 'The Command pattern turns an action into an object. The object knows how to do the action and how to undo it. A history list of these objects gives you undo and redo.',
    analogy: 'Think of a recipe card. The card says what to do, and you can keep it, repeat it, or follow it backward.',
    uses: ['Undo and redo in text and image editors', 'Job queues that store tasks to run later', 'Macro recorders that save actions and replay them'],
    before: ['solid', 'Stacks'],
    words: [
      ['command', 'An object that stands for one action.'],
      ['do and undo', 'The two methods every command has. One makes the change, one reverses it.'],
      ['stack', 'A pile where you add and remove at the top only.'],
      ['history', 'The done stack that remembers commands already run.'],
      ['redo stack', 'The pile of undone commands that you may run again.']
    ],
    math: null,
    steps: [
      'Write a Command interface with do() and undo().',
      'Write a class for each action. It saves what it needs to reverse itself, such as the old style.',
      'When the user acts, build the command and run its do().',
      'Push the command onto the done stack.',
      'On undo, pop the top command, call its undo(), and push it on the redo stack. A new action clears redo.'
    ],
    use: ['Users need undo and redo.', 'Actions must be queued, saved or replayed.'],
    avoid: ['Actions that cannot be reversed, like sending an email.', 'A tiny tool where undo is not needed.'],
    mistakes: [
      'Not saving the old value inside the command. Then undo has nothing to restore.',
      'Forgetting to clear the redo stack after a new action.',
      'Writing undo that does not exactly reverse do.',
      'Keeping the history forever. Cap its size.'
    ],
    cheat: ['action = object', 'do() / undo()', 'done stack for undo', 'redo stack for redo', 'new action clears redo'],
    next: ['decorator', 'vending', 'observer'],
    sources: [GOF + ', Command, ch. 5', 'Java documentation, javax.swing.undo.UndoManager', 'Python documentation, list as a stack (append and pop)']
  },
  splitter: {
    what: 'This lesson designs an expense splitter for a group of friends. Each expense records who paid and how to split it. A running balance per person shows the net debt, which lets you settle with few payments.',
    analogy: 'Think of a trip with friends. Instead of everyone paying everyone, you each find your net figure and settle with one or two people.',
    uses: ['Apps that split bills among friends and flatmates', 'Accounting tools that match what is owed and what is paid', 'Payment systems that net many small transfers into fewer ones'],
    before: ['strategy', 'parking'],
    words: [
      ['expense', 'One cost, with who paid and how it is shared.'],
      ['split rule', 'A rule for sharing a cost, such as equal shares or exact amounts.'],
      ['balance', 'What a person paid minus their share. Positive means they are owed money.'],
      ['creditor', 'Someone who is owed money.'],
      ['debtor', 'Someone who owes money.'],
      ['settle', 'Pay what is owed so the balance becomes zero.'],
      ['greedy', 'A way of solving that always takes the biggest option first.']
    ],
    math: {
      lines: ['b_p = \\text{paid}_p - \\text{share}_p', '\\sum_p b_p = 0'],
      symbols: [
        ['b_p', 'the balance of person p'],
        ['\\text{paid}_p', 'the total person p paid out'],
        ['\\text{share}_p', 'the total of person p\'s shares of all costs'],
        ['\\sum_p', 'add up the value for every person']
      ],
      example: [
        'Take four friends. Asha paid 1,200 for a hotel. Ben paid 800 for dinner. Chen paid 400 for a taxi.',
        'Hotel and dinner are split equally: 300 and 200 each. The taxi is split Ben 100, Chen 100, Dev 200.',
        'Asha: paid 1,200, share 300 + 200 = 500. Her balance is 700.',
        'Ben: paid 800, share 300 + 200 + 100 = 600. His balance is 200.',
        'Chen: paid 400, share 600. Dev: paid 0, share 700. Their balances are -200 and -700.',
        'The four balances add up to zero: 700 + 200 - 200 - 700 = 0.'
      ]
    },
    steps: [
      'Make an Expense class with the payer, the amount and a split rule.',
      'Put the split rule behind an interface, with equal and exact versions.',
      'For each expense, add the payer\'s credit and subtract each person\'s share in a Balances class.',
      'Check that all balances add up to zero.',
      'Match the biggest debtor with the biggest creditor, pay the smaller amount, and repeat.'
    ],
    use: ['A group shares costs and wants to settle in few payments.', 'You need a record of who owes what from many small items.'],
    avoid: ['Exact money handling with floats. Use whole cents or paise.', 'Cases that need the provably fewest payments. Greedy is close, not perfect.'],
    mistakes: [
      'Storing money as decimal numbers. Rounding errors add up. Use whole units.',
      'Leaving a leftover cent when dividing. Give it to one person so totals match.',
      'Settling each expense one by one. That creates many needless payments.',
      'Skipping the zero-sum check. It catches most bugs.'
    ],
    cheat: ['balance = paid - share', 'all balances add to 0', 'SplitRule: equal or exact', 'biggest debtor pays biggest creditor', 'store money as whole units'],
    next: ['movies', 'vending', 'lru'],
    sources: ['Python documentation, decimal module and integer arithmetic', 'Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., 2022, ch. 15 (greedy algorithms)', 'Martin Fowler, Patterns of Enterprise Application Architecture, 2002, Money pattern']
  }
};
if (typeof module !== 'undefined') module.exports = { SD_ABOUT_LLD };
