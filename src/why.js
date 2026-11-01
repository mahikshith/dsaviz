// "Why learn this?" text, our own writing. One fold on every lesson, pattern and track hub (markup: shared/ui/why.html,
// helpers: shared/about.js). Each entry is [what it lets you do, where it shows up in real apps, where it shows up in interviews].
// Lessons with About data do not appear here: their fold is built from the About fields `what` and `uses` (whyFromAbout).
// Rules: sentences of 18 words or fewer, everyday words, no "just" or "simply", no story names, no idioms (tests/readcheck.js).
const WHY = {
  patterns: {
    'Two Pointers': ['Walk two markers through a list to find pairs without checking every combination.', 'Text tools use it to compare a word from both ends, as in a palindrome check.', 'Interviews often ask for a pair in a sorted list, and this gives a fast answer.'],
    'Sliding Window': ['Slide a small frame along a list to track one section without starting over.', 'Network monitors use it to count the requests made in the last minute.', 'Questions about the longest or best stretch of items usually use it.'],
    'Hash Map': ['Look up any saved item at once, instead of searching the whole list.', 'Apps use it to find a user by name or to count how often a word appears.', 'It is one of the most used tools in interview answers.'],
    'Prefix Sum': ['Add the numbers once, then answer any range total with one subtraction.', 'Dashboards use it to show the total for any range of days you pick.', 'Interviews use it for questions that ask for many range totals quickly.'],
    'Binary Search': ['Find an item in sorted data by cutting the search area in half each time.', 'Databases use it to find one name among millions of entries.', 'It is a classic interview topic, and it also finds the best possible value.'],
    'Matrix': ['Work with grids of numbers, such as images, game boards and tables.', 'Photo editors, games and spreadsheets store their data in grids.', 'Interviews ask you to rotate, spiral through or mark a grid without extra space.'],
    'Intervals': ['Combine and compare ranges of time or numbers that overlap.', 'Calendar apps use it to merge meetings and find free time.', 'Meeting room and schedule questions are common in interviews.'],
    'Greedy': ['Pick the best choice at each step to reach a good answer quickly.', 'Route and scheduling tools use it when they need a good plan fast.', 'Interviewers check whether you can tell when this shortcut is safe to use.'],
    'Stack': ['Keep items in a pile where the last one added is the first one removed.', 'The undo button and the back button in a browser both work this way.', 'Questions about brackets, nested text and undo history use it.'],
    'Heap': ['Get the smallest or largest item quickly while the data keeps changing.', 'Task schedulers and game leaderboards use it to find what comes first.', 'Questions that ask for the top few items use it.'],
    'In-place Reversal': ['Turn the links of a list around without making a copy.', 'Programs that reverse a playlist or a chain of records use it to save memory.', 'Linked list questions often ask you to reverse part of a list.'],
    'Fast & Slow Pointers': ['Send one walker fast and one slow to find loops and middles.', 'Tools use it to spot a chain of records that points back to itself.', 'Interviews ask you to find a loop or the middle of a list with no extra memory.'],
    'Depth-First Search': ['Follow one path as deep as it goes before trying another.', 'Maze solvers, file searches and link checkers explore this way.', 'Questions about trees, grids and connected areas often use it.'],
    'Breadth-First Search': ['Explore a map one ring at a time to find the route with the fewest steps.', 'Social apps use it to count how many friend links connect two people.', 'Interviews ask for the fewest steps through a maze, a grid or a word puzzle.'],
    'Backtracking': ['Try each choice, undo it if it fails, and then try the next one.', 'Sudoku solvers and puzzle games search for answers this way.', 'Questions that list every valid arrangement or combination use it.'],
    'Dynamic Programming': ['Break a big problem into smaller ones and save each answer so you never repeat work.', 'Spell checkers, route planners and text comparison tools save time this way.', 'It appears often in harder interviews, and it builds strong problem-solving skills.'],
    'Linked Lists': ['Store items in a chain where each item points to the next one.', 'Music queues and browser history use chains like this.', 'Linked list questions test how carefully you follow and change links.'],
    'Monotonic Stack & Queue': ['Keep a pile in sorted order to find the next bigger or smaller value.', 'Stock charts use it to find the next day the price goes higher.', 'Questions about the next greater item or the largest area use it.'],
    'Trees': ['Store data in branches, where each item has smaller items below it.', 'Folders on your computer, web pages and menus are all trees.', 'Trees are one of the most common topics in interviews.'],
    'Graphs': ['Describe things and the links between them, such as people and friendships.', 'Maps, social networks and recommendations all run on graphs.', 'Graph questions show up often and test how you break a problem down.'],
    'Tries': ['Store words so that all words with the same start share one path.', 'Search boxes use it to suggest words as you type.', 'Questions about word starts and autocomplete use it.'],
    'Sorting': ['Put items in order so that searching and comparing them gets easy.', 'Shops sort products by price, and mail apps sort messages by date.', 'Interviewers expect you to know how sorting works and when to use it.'],
    'Design': ['Combine simple tools to build a small working part, such as a cache.', 'Every app has parts like this, such as a cache that remembers recent results.', 'Design questions ask you to build a small class that works fast.'],
    'String Algorithms': ['Search, compare and match text quickly, even in very long documents.', 'Search bars, find and replace, and spam filters all work with text this way.', 'String questions are common because every program handles text.'],
    'DP on Grids & Strings': ['Fill in a table step by step to compare two texts or cross a grid.', 'Tools that show the difference between two versions of a file use this idea.', 'Questions about the best path or the closest match between words use it.'],
    'Knapsack & LIS': ['Choose items under a limit, or find the longest rising run in a list.', 'Packing tools and budget planners pick the best items that fit a limit.', 'These are well known questions that test whether you can build on smaller answers.'],
    'Interval & Bitmask DP': ['Track which items are used with a short row of on and off switches.', 'Planning tools use it to try every group of tasks or stops.', 'It shows up in hard questions that ask for the best order or group.'],
    'Bit Manipulation': ['Work with the on and off switches that store every number in a computer.', 'Permissions, game boards and file compression all store data as bits.', 'Questions about hidden duplicates and fast checks use bits and need little memory.'],
    'Math & Geometry': ['Use number rules and shapes to solve problems without trying every case.', 'Maps, games and graphics use it to find distances and overlaps.', 'Interviews ask about primes, powers and points on a plane.'],
    'Segment Tree & BIT': ['Answer range questions quickly even while the numbers keep changing.', 'Live scoreboards and analytics use it to update and total ranges fast.', 'It appears in advanced interviews and contests that ask for many range updates.'],
    'SQL': ['Ask a database questions to find, group and combine stored records.', 'Almost every app with accounts, orders or posts keeps them in a database.', 'Many roles test SQL, and the questions are often about joining and counting rows.'],
    'Concurrency': ['Let several tasks run at the same time without breaking each other.', 'Web servers help thousands of users at once and must share data safely.', 'Interviews for server roles ask about locks, queues and shared data.']
  },
  hubs: {
    start: ['Learn to program from zero by running tiny programs and seeing what each line does.', 'Every app, game and website you use is built from the same few building blocks.', 'Jobs and interviews start from these basics, so a strong start saves time later.'],
    concepts: ['Learn the small ideas inside every pattern, one short lesson at a time.', 'These ideas run inside maps, search boxes, feeds and games.', 'Interview answers are built from these ideas, so knowing them makes patterns easier.'],
    sd: ['Learn how large apps are built from servers, databases and queues.', 'Chat, video and shopping apps serve millions of people with designs like these.', 'Many interviews ask you to sketch how you would build a big app.'],
    ai: ['Learn how machines learn from examples, one step you can watch at a time.', 'Photo tagging, voice assistants and recommendations use these ideas.', 'More roles now ask about AI and ML, so knowing the basics helps.'],
    patterns: ['Learn the small set of repeatable methods behind most coding problems.', 'The same methods power search, maps, feeds and schedulers.', 'Interviewers pick problems that fit these methods, so you can spot them quickly.'],
    git: ['Learn to save, share and undo changes to your code.', 'Almost every software team uses Git to work on the same code together.', 'Employers expect you to know Git, and it protects your own work.']
  }
};
