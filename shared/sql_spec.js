// @@SQL-SPEC@@ — generated block (from shared/sql_spec.js), used by the Code page's SQL mode and tests/sqlcheck.js.
// SQL practice that runs in the browser on SQLite (sql.js). Every table, row and sentence here was written for
// DSAMaxxing; the problems share only their name and number with LeetCode's database set.
//   title, n, diff  name, LeetCode number and difficulty (the id is the LeetCode slug, as on the master sheet)
//   ask       the task in plain words, naming the output columns
//   schema    one CREATE TABLE per table, in our own names
//   cols      the output columns, in order (checked without case)
//   order     true when the rows must come in the order asked for; otherwise any order passes
//   after     for a problem that changes a table: this query reads the answer after the learner's statements run
//   sets      datasets: { rows: { Table: [[...], ...] }, want: [[...], ...] }. sets[0] is the visible one (Run);
//             Submit runs every set. The rows become INSERT statements (sqlSetup). want is the expected result.
//   ref       a reference query; tests/sqlcheck.js runs it on every set and checks it gives want
//   trap      a tempting wrong query; tests/sqlcheck.js checks that some set catches it
const SQL_SPECS = {
  'recyclable-and-low-fat-products': {
    title: 'Recyclable and Low Fat Products', n: 1757, diff: 'Easy',
    ask: 'A corner shop tags each snack: is_light is Y when it is low in fat, and green_pack is Y when its wrapper can be recycled. Return the snack_id of every snack that is both. Any order.',
    schema: ['CREATE TABLE Snacks (snack_id INTEGER PRIMARY KEY, is_light TEXT, green_pack TEXT)'],
    cols: ['snack_id'], order: false,
    sets: [
      { rows: { Snacks: [[1, 'Y', 'N'], [2, 'Y', 'Y'], [3, 'N', 'Y'], [4, 'Y', 'Y'], [5, 'N', 'N']] }, want: [[2], [4]] },
      { rows: { Snacks: [[10, 'N', 'N'], [11, 'Y', 'N'], [12, 'N', 'Y']] }, want: [] },
      { rows: { Snacks: [[7, 'Y', 'Y'], [8, 'Y', 'Y'], [9, 'Y', 'Y']] }, want: [[7], [8], [9]] },
      { rows: { Snacks: [[21, 'Y', 'N'], [22, 'N', 'Y'], [23, 'Y', 'Y'], [24, 'N', 'Y'], [25, 'Y', 'N'], [26, 'Y', 'Y']] }, want: [[23], [26]] }
    ],
    ref: "SELECT snack_id FROM Snacks WHERE is_light = 'Y' AND green_pack = 'Y'",
    trap: "SELECT snack_id FROM Snacks WHERE is_light = 'Y' OR green_pack = 'Y'"
  },
  'find-customer-referee': {
    title: 'Find Customer Referee', n: 584, diff: 'Easy',
    ask: 'Each club member was invited by another member (invited_by holds their id) or joined alone (invited_by is NULL). Return the name of every member who was not invited by member 2. People who joined alone count. Any order.',
    schema: ['CREATE TABLE Members (member_id INTEGER PRIMARY KEY, name TEXT, invited_by INTEGER)'],
    cols: ['name'], order: false,
    sets: [
      { rows: { Members: [[1, 'Asha', null], [2, 'Bo', null], [3, 'Cyr', 2], [4, 'Dev', 1], [5, 'Eli', 2], [6, 'Fen', 4]] }, want: [['Asha'], ['Bo'], ['Dev'], ['Fen']] },
      { rows: { Members: [[1, 'Gus', null], [2, 'Hal', 1], [3, 'Ira', 2], [4, 'Jo', 2]] }, want: [['Gus'], ['Hal']] },
      { rows: { Members: [[1, 'Kai', null], [2, 'Lu', null], [3, 'Max', null]] }, want: [['Kai'], ['Lu'], ['Max']] },
      { rows: { Members: [[1, 'Ned', null], [2, 'Oda', 1], [3, 'Pia', 2], [4, 'Quin', 3], [5, 'Rue', 2], [6, 'Sol', null]] }, want: [['Ned'], ['Oda'], ['Quin'], ['Sol']] }
    ],
    ref: 'SELECT name FROM Members WHERE invited_by IS NULL OR invited_by <> 2',
    trap: 'SELECT name FROM Members WHERE invited_by <> 2'
  },
  'big-countries': {
    title: 'Big Countries', n: 595, diff: 'Easy',
    ask: 'A nation is big when its area is at least 2000000 square km or it has at least 40000000 people. Return name, people and area for every big nation. Any order.',
    schema: ['CREATE TABLE Nations (name TEXT PRIMARY KEY, region TEXT, area INTEGER, people INTEGER)'],
    cols: ['name', 'people', 'area'], order: false,
    sets: [
      { rows: { Nations: [['Avalon', 'North', 2500000, 12000000], ['Brisk', 'East', 300000, 61000000], ['Cobble', 'West', 90000, 5000000], ['Dune', 'South', 1999999, 39999999]] }, want: [['Avalon', 12000000, 2500000], ['Brisk', 61000000, 300000]] },
      { rows: { Nations: [['Elm', 'North', 2000000, 1000], ['Fjord', 'North', 10, 40000000], ['Gale', 'East', 50000, 200000]] }, want: [['Elm', 1000, 2000000], ['Fjord', 40000000, 10]] },
      { rows: { Nations: [['Haven', 'West', 1200, 30000], ['Isle', 'South', 700, 9000]] }, want: [] },
      { rows: { Nations: [['Jade', 'East', 9000000, 90000000], ['Kiln', 'West', 4100000, 2000000], ['Loch', 'North', 150000, 45000000], ['Moss', 'South', 160000, 21000000]] }, want: [['Jade', 90000000, 9000000], ['Kiln', 2000000, 4100000], ['Loch', 45000000, 150000]] }
    ],
    ref: 'SELECT name, people, area FROM Nations WHERE area >= 2000000 OR people >= 40000000',
    trap: 'SELECT name, people, area FROM Nations WHERE area > 2000000 OR people > 40000000'
  },
  'article-views-i': {
    title: 'Article Views I', n: 1148, diff: 'Easy',
    ask: 'Each row says a reader opened a post on a day. Return, as writer, the id of every writer who read at least one of their own posts. List each writer once, smallest id first.',
    schema: ['CREATE TABLE Reads (post_id INTEGER, writer_id INTEGER, reader_id INTEGER, seen_on TEXT)'],
    cols: ['writer'], order: true,
    sets: [
      { rows: { Reads: [[1, 3, 5, '2026-01-02'], [1, 3, 3, '2026-01-02'], [2, 7, 7, '2026-01-03'], [2, 7, 4, '2026-01-04'], [3, 4, 4, '2026-01-05'], [3, 4, 4, '2026-01-06']] }, want: [[3], [4], [7]] },
      { rows: { Reads: [[5, 1, 2, '2026-02-01'], [6, 2, 1, '2026-02-01']] }, want: [] },
      { rows: { Reads: [[9, 12, 12, '2026-03-01'], [8, 2, 2, '2026-03-01'], [8, 2, 2, '2026-03-02'], [7, 30, 2, '2026-03-02'], [6, 5, 5, '2026-03-03']] }, want: [[2], [5], [12]] },
      { rows: { Reads: [[4, 9, 9, '2026-04-01']] }, want: [[9]] }
    ],
    ref: 'SELECT DISTINCT writer_id AS writer FROM Reads WHERE writer_id = reader_id ORDER BY writer',
    trap: 'SELECT writer_id AS writer FROM Reads WHERE writer_id = reader_id ORDER BY writer'
  },
  'invalid-tweets': {
    title: 'Invalid Tweets', n: 1683, diff: 'Easy',
    ask: 'A noticeboard only takes notes of 20 characters or fewer. Return the note_id of every note that is too long. Any order.',
    schema: ['CREATE TABLE Notes (note_id INTEGER PRIMARY KEY, body TEXT)'],
    cols: ['note_id'], order: false,
    sets: [
      { rows: { Notes: [[1, 'Bake sale on Friday'], [2, 'Lost cat, orange, answers to Bean'], [3, 'Chess club at six']] }, want: [[2]] },
      { rows: { Notes: [[4, '12345678901234567890'], [5, '123456789012345678901'], [6, '']] }, want: [[5]] },
      { rows: { Notes: [[7, 'Hi'], [8, 'Free plants by the door']] }, want: [[8]] },
      { rows: { Notes: [[9, 'Choir practice moved to Tuesday night'], [10, 'Bikes for sale cheap!'], [11, 'Quiet please']] }, want: [[9], [10]] }
    ],
    ref: 'SELECT note_id FROM Notes WHERE LENGTH(body) > 20',
    trap: 'SELECT note_id FROM Notes WHERE LENGTH(body) >= 20'
  },
  'combine-two-tables': {
    title: 'Combine Two Tables', n: 175, diff: 'Easy',
    ask: 'Return first_name, last_name, city and region for every person. Someone with no row in Homes still appears, with NULL city and region. Each person has at most one home. Any order.',
    schema: ['CREATE TABLE People (person_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT)', 'CREATE TABLE Homes (home_id INTEGER PRIMARY KEY, person_id INTEGER, city TEXT, region TEXT)'],
    cols: ['first_name', 'last_name', 'city', 'region'], order: false,
    sets: [
      { rows: { People: [[1, 'Mina', 'Ross'], [2, 'Tal', 'Okafor'], [3, 'Ren', 'Silva']], Homes: [[10, 2, 'Portwell', 'Coast'], [11, 3, 'Highmoor', 'Hills']] }, want: [['Mina', 'Ross', null, null], ['Tal', 'Okafor', 'Portwell', 'Coast'], ['Ren', 'Silva', 'Highmoor', 'Hills']] },
      { rows: { People: [[1, 'Ada', 'Lin'], [2, 'Bea', 'Moe']], Homes: [] }, want: [['Ada', 'Lin', null, null], ['Bea', 'Moe', null, null]] },
      { rows: { People: [[5, 'Cal', 'Day']], Homes: [[1, 5, 'Fernby', 'Vale'], [2, 9, 'Nowhere', 'Void']] }, want: [['Cal', 'Day', 'Fernby', 'Vale']] },
      { rows: { People: [[1, 'Dot', 'Ash'], [2, 'Eve', 'Ash'], [3, 'Fay', 'Ng'], [4, 'Gil', 'Ng']], Homes: [[1, 4, 'Brook', 'Vale'], [2, 1, 'Cliff', 'Coast']] }, want: [['Dot', 'Ash', 'Cliff', 'Coast'], ['Eve', 'Ash', null, null], ['Fay', 'Ng', null, null], ['Gil', 'Ng', 'Brook', 'Vale']] }
    ],
    ref: 'SELECT p.first_name, p.last_name, h.city, h.region FROM People p LEFT JOIN Homes h ON h.person_id = p.person_id',
    trap: 'SELECT p.first_name, p.last_name, h.city, h.region FROM People p JOIN Homes h ON h.person_id = p.person_id'
  },
  'replace-employee-id-with-the-unique-identifier': {
    title: 'Replace Employee ID With The Unique Identifier', n: 1378, diff: 'Easy',
    ask: 'Some staff have a door badge number in Badges. Return badge_no and name for every member of staff, with NULL badge_no for anyone without a badge. Any order.',
    schema: ['CREATE TABLE Staff (staff_id INTEGER PRIMARY KEY, name TEXT)', 'CREATE TABLE Badges (staff_id INTEGER PRIMARY KEY, badge_no INTEGER)'],
    cols: ['badge_no', 'name'], order: false,
    sets: [
      { rows: { Staff: [[1, 'Iris'], [2, 'Jun'], [3, 'Kofi']], Badges: [[1, 501], [3, 733]] }, want: [[501, 'Iris'], [null, 'Jun'], [733, 'Kofi']] },
      { rows: { Staff: [[4, 'Lea'], [5, 'Mo']], Badges: [] }, want: [[null, 'Lea'], [null, 'Mo']] },
      { rows: { Staff: [[6, 'Nia']], Badges: [[6, 12], [7, 13]] }, want: [[12, 'Nia']] },
      { rows: { Staff: [[1, 'Oz'], [2, 'Pip'], [3, 'Rae'], [4, 'Sam']], Badges: [[2, 90], [4, 91]] }, want: [[null, 'Oz'], [90, 'Pip'], [null, 'Rae'], [91, 'Sam']] }
    ],
    ref: 'SELECT b.badge_no, s.name FROM Staff s LEFT JOIN Badges b ON b.staff_id = s.staff_id',
    trap: 'SELECT b.badge_no, s.name FROM Staff s JOIN Badges b ON b.staff_id = s.staff_id'
  },
  'customer-who-visited-but-did-not-make-any-transactions': {
    title: 'Customer Who Visited but Did Not Make Any Transactions', n: 1581, diff: 'Easy',
    ask: 'Shoppers visit a market stall; some visits end in a payment. For each shopper with at least one visit that had no payment, return shopper_id and count_no_pay, the number of such visits. Any order.',
    schema: ['CREATE TABLE StallVisits (visit_id INTEGER PRIMARY KEY, shopper_id INTEGER)', 'CREATE TABLE Payments (payment_id INTEGER PRIMARY KEY, visit_id INTEGER, amount INTEGER)'],
    cols: ['shopper_id', 'count_no_pay'], order: false,
    sets: [
      { rows: { StallVisits: [[1, 20], [2, 20], [3, 31], [4, 42], [5, 42], [6, 42]], Payments: [[1, 2, 15], [2, 3, 8], [3, 3, 4]] }, want: [[20, 1], [42, 3]] },
      { rows: { StallVisits: [[1, 5], [2, 6]], Payments: [[1, 1, 10], [2, 2, 20]] }, want: [] },
      { rows: { StallVisits: [[1, 7], [2, 7], [3, 7]], Payments: [] }, want: [[7, 3]] },
      { rows: { StallVisits: [[1, 1], [2, 2], [3, 3], [4, 1], [5, 2]], Payments: [[1, 1, 5], [2, 1, 6], [3, 5, 7]] }, want: [[1, 1], [2, 1], [3, 1]] }
    ],
    ref: 'SELECT v.shopper_id, COUNT(*) AS count_no_pay FROM StallVisits v LEFT JOIN Payments p ON p.visit_id = v.visit_id WHERE p.payment_id IS NULL GROUP BY v.shopper_id',
    trap: 'SELECT v.shopper_id, COUNT(*) AS count_no_pay FROM StallVisits v LEFT JOIN Payments p ON p.visit_id = v.visit_id GROUP BY v.shopper_id'
  },
  'employees-earning-more-than-their-managers': {
    title: 'Employees Earning More Than Their Managers', n: 181, diff: 'Easy',
    ask: 'On a ship, boss_id points to the crew member each sailor reports to (NULL for the captain). Return, as crew, the name of everyone paid more than their boss. Any order.',
    schema: ['CREATE TABLE Crew (crew_id INTEGER PRIMARY KEY, name TEXT, pay INTEGER, boss_id INTEGER)'],
    cols: ['crew'], order: false,
    sets: [
      { rows: { Crew: [[1, 'Cap', 900, null], [2, 'Mate', 950, 1], [3, 'Cook', 400, 2], [4, 'Deck', 1000, 2]] }, want: [['Mate'], ['Deck']] },
      { rows: { Crew: [[1, 'Ana', 500, null], [2, 'Ben', 500, 1], [3, 'Cy', 499, 1]] }, want: [] },
      { rows: { Crew: [[1, 'Dax', 100, 3], [2, 'Elo', 300, 1], [3, 'Fin', 200, null]] }, want: [['Elo']] },
      { rows: { Crew: [[1, 'Gia', 10, null], [2, 'Hob', 20, 1], [3, 'Ivo', 30, 2], [4, 'Jem', 40, 3], [5, 'Kit', 5, 4]] }, want: [['Hob'], ['Ivo'], ['Jem']] }
    ],
    ref: 'SELECT c.name AS crew FROM Crew c JOIN Crew b ON b.crew_id = c.boss_id WHERE c.pay > b.pay',
    trap: 'SELECT c.name AS crew FROM Crew c JOIN Crew b ON b.crew_id = c.boss_id WHERE c.pay >= b.pay'
  },
  'customers-who-never-order': {
    title: 'Customers Who Never Order', n: 183, diff: 'Easy',
    ask: 'Return, as buyer, the name of every buyer who has never placed an order. Any order.',
    schema: ['CREATE TABLE Buyers (buyer_id INTEGER PRIMARY KEY, name TEXT)', 'CREATE TABLE Purchases (order_id INTEGER PRIMARY KEY, buyer_id INTEGER)'],
    cols: ['buyer'], order: false,
    sets: [
      { rows: { Buyers: [[1, 'Ola'], [2, 'Per'], [3, 'Qiu'], [4, 'Rio']], Purchases: [[1, 3], [2, 1], [3, 3]] }, want: [['Per'], ['Rio']] },
      { rows: { Buyers: [[1, 'Sia'], [2, 'Teo']], Purchases: [[1, 1], [2, 2]] }, want: [] },
      { rows: { Buyers: [[1, 'Uma'], [2, 'Vic']], Purchases: [] }, want: [['Uma'], ['Vic']] },
      { rows: { Buyers: [[1, 'Wes'], [2, 'Xan'], [3, 'Yui']], Purchases: [[1, 2], [2, 9]] }, want: [['Wes'], ['Yui']] }
    ],
    ref: 'SELECT b.name AS buyer FROM Buyers b WHERE b.buyer_id NOT IN (SELECT buyer_id FROM Purchases)',
    trap: 'SELECT b.name AS buyer FROM Buyers b JOIN Purchases o ON o.buyer_id <> b.buyer_id GROUP BY b.buyer_id'
  },
  'duplicate-emails': {
    title: 'Duplicate Emails', n: 182, diff: 'Easy',
    ask: 'A newsletter list has the same email signed up more than once. Return each email that appears two or more times, once. Any order.',
    schema: ['CREATE TABLE Subscribers (signup_id INTEGER PRIMARY KEY, email TEXT)'],
    cols: ['email'], order: false,
    sets: [
      { rows: { Subscribers: [[1, 'pea@pod.io'], [2, 'kit@box.io'], [3, 'pea@pod.io'], [4, 'yam@bed.io']] }, want: [['pea@pod.io']] },
      { rows: { Subscribers: [[1, 'a@x.io'], [2, 'b@x.io']] }, want: [] },
      { rows: { Subscribers: [[1, 'c@x.io'], [2, 'c@x.io'], [3, 'c@x.io'], [4, 'd@x.io'], [5, 'd@x.io']] }, want: [['c@x.io'], ['d@x.io']] },
      { rows: { Subscribers: [[1, 'e@x.io'], [2, 'f@x.io'], [3, 'g@x.io'], [4, 'f@x.io']] }, want: [['f@x.io']] }
    ],
    ref: 'SELECT email FROM Subscribers GROUP BY email HAVING COUNT(*) > 1',
    trap: 'SELECT DISTINCT email FROM Subscribers'
  },
  'rising-temperature': {
    title: 'Rising Temperature', n: 197, diff: 'Easy',
    ask: 'A weather station logs one reading per day, but some days are missing. Return the reading_id of every day that was warmer than the calendar day right before it. A day after a gap has nothing to compare with. Dates are text like 2026-05-01. Any order.',
    schema: ['CREATE TABLE Readings (reading_id INTEGER PRIMARY KEY, day TEXT, temp INTEGER)'],
    cols: ['reading_id'], order: false,
    sets: [
      { rows: { Readings: [[1, '2026-05-01', 14], [2, '2026-05-02', 17], [3, '2026-05-03', 16], [4, '2026-05-04', 19]] }, want: [[2], [4]] },
      { rows: { Readings: [[1, '2026-06-01', 20], [2, '2026-06-03', 25], [3, '2026-06-04', 24]] }, want: [] },
      { rows: { Readings: [[7, '2026-03-02', 5], [3, '2026-03-01', 4], [9, '2026-03-03', 5]] }, want: [[7]] },
      { rows: { Readings: [[1, '2026-01-30', 1], [2, '2026-01-31', 2], [3, '2026-02-01', 3], [4, '2026-02-02', 1]] }, want: [[2], [3]] }
    ],
    ref: "SELECT b.reading_id FROM Readings a JOIN Readings b ON julianday(b.day) - julianday(a.day) = 1 WHERE b.temp > a.temp",
    trap: 'SELECT b.reading_id FROM Readings a JOIN Readings b ON b.reading_id = a.reading_id + 1 WHERE b.temp > a.temp'
  },
  'delete-duplicate-emails': {
    title: 'Delete Duplicate Emails', n: 196, diff: 'Easy',
    ask: 'Clean up the newsletter list: delete rows from Subscribers so that each email keeps only its row with the smallest signup_id. Write a DELETE, not a SELECT. The checker then reads Subscribers by signup_id.',
    schema: ['CREATE TABLE Subscribers (signup_id INTEGER PRIMARY KEY, email TEXT)'],
    after: 'SELECT signup_id, email FROM Subscribers ORDER BY signup_id',
    cols: ['signup_id', 'email'], order: true,
    sets: [
      { rows: { Subscribers: [[1, 'pea@pod.io'], [2, 'kit@box.io'], [3, 'pea@pod.io']] }, want: [[1, 'pea@pod.io'], [2, 'kit@box.io']] },
      { rows: { Subscribers: [[4, 'a@x.io'], [2, 'a@x.io'], [9, 'a@x.io']] }, want: [[2, 'a@x.io']] },
      { rows: { Subscribers: [[1, 'b@x.io'], [2, 'c@x.io']] }, want: [[1, 'b@x.io'], [2, 'c@x.io']] },
      { rows: { Subscribers: [[5, 'd@x.io'], [3, 'e@x.io'], [8, 'd@x.io'], [1, 'e@x.io'], [6, 'f@x.io']] }, want: [[1, 'e@x.io'], [5, 'd@x.io'], [6, 'f@x.io']] }
    ],
    ref: 'DELETE FROM Subscribers WHERE signup_id NOT IN (SELECT MIN(signup_id) FROM Subscribers GROUP BY email)',
    trap: 'DELETE FROM Subscribers WHERE signup_id NOT IN (SELECT MAX(signup_id) FROM Subscribers GROUP BY email)'
  },
  'average-selling-price': {
    title: 'Average Selling Price', n: 1251, diff: 'Easy',
    ask: 'A bakery changes prices over time; each PriceTags row holds from from_day to to_day, both included. For each item_id in PriceTags, return avg_price: the money taken divided by the units sold, rounded to 2 places. An item that never sold gets 0. Any order.',
    schema: ['CREATE TABLE PriceTags (item_id INTEGER, from_day TEXT, to_day TEXT, price INTEGER)', 'CREATE TABLE Sales (item_id INTEGER, sold_on TEXT, units INTEGER)'],
    cols: ['item_id', 'avg_price'], order: false,
    sets: [
      { rows: { PriceTags: [[1, '2026-01-01', '2026-01-10', 3], [1, '2026-01-11', '2026-01-31', 5], [2, '2026-01-01', '2026-01-31', 8]], Sales: [[1, '2026-01-05', 10], [1, '2026-01-20', 30], [2, '2026-01-15', 4]] }, want: [[1, 4.5], [2, 8]] },
      { rows: { PriceTags: [[3, '2026-02-01', '2026-02-28', 6]], Sales: [] }, want: [[3, 0]] },
      { rows: { PriceTags: [[4, '2026-03-01', '2026-03-05', 2], [4, '2026-03-06', '2026-03-09', 7], [5, '2026-03-01', '2026-03-09', 1]], Sales: [[4, '2026-03-05', 1], [4, '2026-03-06', 2], [5, '2026-03-09', 3]] }, want: [[4, 5.33], [5, 1]] },
      { rows: { PriceTags: [[6, '2026-04-01', '2026-04-30', 10], [7, '2026-04-01', '2026-04-15', 4], [7, '2026-04-16', '2026-04-30', 9]], Sales: [[7, '2026-04-16', 1]] }, want: [[6, 0], [7, 9]] }
    ],
    ref: 'SELECT p.item_id, ROUND(COALESCE(SUM(p.price * s.units) * 1.0 / SUM(s.units), 0), 2) AS avg_price FROM PriceTags p LEFT JOIN Sales s ON s.item_id = p.item_id AND s.sold_on BETWEEN p.from_day AND p.to_day GROUP BY p.item_id',
    trap: 'SELECT p.item_id, ROUND(AVG(p.price), 2) AS avg_price FROM PriceTags p GROUP BY p.item_id'
  },
  'queries-quality-and-percentage': {
    title: 'Queries Quality and Percentage', n: 1211, diff: 'Easy',
    ask: 'A search box logs each result it showed: the term, the link, its spot in the list (1 is the top) and stars from 1 to 5. For each term return quality, the average of stars divided by spot, and poor_pct, the percent of rows with fewer than 3 stars. Round both to 2 places. Watch out: in SQLite 5 / 2 is 2. Any order.',
    schema: ['CREATE TABLE Results (term TEXT, link TEXT, spot INTEGER, stars INTEGER)'],
    cols: ['term', 'quality', 'poor_pct'], order: false,
    sets: [
      { rows: { Results: [['owl', 'a.io', 1, 5], ['owl', 'b.io', 2, 2], ['owl', 'c.io', 4, 1], ['fox', 'd.io', 1, 3], ['fox', 'e.io', 3, 1]] }, want: [['owl', 2.08, 66.67], ['fox', 1.67, 50]] },
      { rows: { Results: [['elk', 'f.io', 2, 5]] }, want: [['elk', 2.5, 0]] },
      { rows: { Results: [['yak', 'g.io', 3, 1], ['yak', 'h.io', 3, 2], ['yak', 'i.io', 3, 2]] }, want: [['yak', 0.56, 100]] },
      { rows: { Results: [['bee', 'j.io', 1, 4], ['bee', 'k.io', 2, 3], ['ant', 'l.io', 5, 5], ['ant', 'm.io', 7, 2], ['ant', 'n.io', 1, 1]] }, want: [['bee', 2.75, 0], ['ant', 0.76, 66.67]] }
    ],
    ref: 'SELECT term, ROUND(AVG(stars * 1.0 / spot), 2) AS quality, ROUND(AVG(CASE WHEN stars < 3 THEN 100.0 ELSE 0 END), 2) AS poor_pct FROM Results GROUP BY term',
    trap: 'SELECT term, ROUND(AVG(stars / spot), 2) AS quality, ROUND(AVG(CASE WHEN stars < 3 THEN 100.0 ELSE 0 END), 2) AS poor_pct FROM Results GROUP BY term'
  },
  'patients-with-a-condition': {
    title: 'Patients With a Condition', n: 1527, diff: 'Easy',
    ask: 'A vet stores each pet\'s health tags as one text of codes split by single spaces, like VAX2 ALG1. Allergy codes start with ALG. Return pet_id, name and tags for every pet with at least one allergy code. A code like MALG3 is not an allergy. Any order.',
    schema: ['CREATE TABLE Pets (pet_id INTEGER PRIMARY KEY, name TEXT, tags TEXT)'],
    cols: ['pet_id', 'name', 'tags'], order: false,
    sets: [
      { rows: { Pets: [[1, 'Biscuit', 'VAX2 ALG1'], [2, 'Pepper', 'VAX1'], [3, 'Mochi', 'ALG4'], [4, 'Olive', '']] }, want: [[1, 'Biscuit', 'VAX2 ALG1'], [3, 'Mochi', 'ALG4']] },
      { rows: { Pets: [[5, 'Rex', 'MALG3'], [6, 'Tofu', 'VAX1 MALG2']] }, want: [] },
      { rows: { Pets: [[7, 'Juno', 'ALG1 ALG2'], [8, 'Kiwi', 'FLEA1 VAX3 ALG9'], [9, 'Nori', 'XALG1 VAX2']] }, want: [[7, 'Juno', 'ALG1 ALG2'], [8, 'Kiwi', 'FLEA1 VAX3 ALG9']] },
      { rows: { Pets: [[10, 'Pip', 'VAX1 FLEA2'], [11, 'Zuzu', 'MALG1 ALG2']] }, want: [[11, 'Zuzu', 'MALG1 ALG2']] }
    ],
    ref: "SELECT pet_id, name, tags FROM Pets WHERE tags LIKE 'ALG%' OR tags LIKE '% ALG%'",
    trap: "SELECT pet_id, name, tags FROM Pets WHERE tags LIKE '%ALG%'"
  },
  'second-highest-salary': {
    title: 'Second Highest Salary', n: 176, diff: 'Medium',
    ask: 'Return second_wage: the second highest different wage in Wages. Equal wages count once. When there is no second wage, return one row holding NULL.',
    schema: ['CREATE TABLE Wages (worker_id INTEGER PRIMARY KEY, wage INTEGER)'],
    cols: ['second_wage'], order: true,
    sets: [
      { rows: { Wages: [[1, 300], [2, 500], [3, 400]] }, want: [[400]] },
      { rows: { Wages: [[1, 700]] }, want: [[null]] },
      { rows: { Wages: [[1, 900], [2, 900], [3, 800]] }, want: [[800]] },
      { rows: { Wages: [[1, 250], [2, 250]] }, want: [[null]] },
      { rows: { Wages: [[1, 10], [2, 40], [3, 30], [4, 40], [5, 20]] }, want: [[30]] }
    ],
    ref: 'SELECT (SELECT DISTINCT wage FROM Wages ORDER BY wage DESC LIMIT 1 OFFSET 1) AS second_wage',
    trap: 'SELECT wage AS second_wage FROM Wages ORDER BY wage DESC LIMIT 1 OFFSET 1'
  },
  'nth-highest-salary': {
    title: 'Nth Highest Salary', n: 177, diff: 'Medium',
    ask: 'The one-row table Pick holds n. Return nth_wage: the n-th highest different wage in Wages, with equal wages counted once. When there are fewer than n different wages, return one row holding NULL.',
    schema: ['CREATE TABLE Wages (worker_id INTEGER PRIMARY KEY, wage INTEGER)', 'CREATE TABLE Pick (n INTEGER)'],
    cols: ['nth_wage'], order: true,
    sets: [
      { rows: { Wages: [[1, 300], [2, 500], [3, 400], [4, 100]], Pick: [[3]] }, want: [[300]] },
      { rows: { Wages: [[1, 300], [2, 500]], Pick: [[3]] }, want: [[null]] },
      { rows: { Wages: [[1, 60], [2, 60], [3, 50], [4, 50], [5, 40]], Pick: [[2]] }, want: [[50]] },
      { rows: { Wages: [[1, 80], [2, 70]], Pick: [[1]] }, want: [[80]] },
      { rows: { Wages: [[1, 9], [2, 9], [3, 9]], Pick: [[2]] }, want: [[null]] }
    ],
    ref: 'SELECT MAX(wage) AS nth_wage FROM (SELECT wage, DENSE_RANK() OVER (ORDER BY wage DESC) AS r FROM Wages) WHERE r = (SELECT n FROM Pick)',
    trap: 'SELECT MAX(wage) AS nth_wage FROM (SELECT wage, ROW_NUMBER() OVER (ORDER BY wage DESC) AS r FROM Wages) WHERE r = (SELECT n FROM Pick)'
  },
  'rank-scores': {
    title: 'Rank Scores', n: 178, diff: 'Medium',
    ask: 'Return score and place for every quiz entry, highest score first. The top score is place 1, equal scores share a place, and the next lower score takes the next whole number with no gaps.',
    schema: ['CREATE TABLE Entries (entry_id INTEGER PRIMARY KEY, score REAL)'],
    cols: ['score', 'place'], order: true,
    sets: [
      { rows: { Entries: [[1, 3.5], [2, 4.0], [3, 3.5], [4, 2.0]] }, want: [[4, 1], [3.5, 2], [3.5, 2], [2, 3]] },
      { rows: { Entries: [[1, 1.5]] }, want: [[1.5, 1]] },
      { rows: { Entries: [[1, 5.0], [2, 5.0], [3, 5.0]] }, want: [[5, 1], [5, 1], [5, 1]] },
      { rows: { Entries: [[1, 2.25], [2, 9.0], [3, 9.0], [4, 7.5], [5, 2.25], [6, 1.0]] }, want: [[9, 1], [9, 1], [7.5, 2], [2.25, 3], [2.25, 3], [1, 4]] }
    ],
    ref: 'SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS place FROM Entries ORDER BY score DESC',
    trap: 'SELECT score, RANK() OVER (ORDER BY score DESC) AS place FROM Entries ORDER BY score DESC'
  },
  'consecutive-numbers': {
    title: 'Consecutive Numbers', n: 180, diff: 'Medium',
    ask: 'A die is rolled again and again; roll_id goes 1, 2, 3 with no gaps. Return each face that came up at least three times in a row, once. Any order.',
    schema: ['CREATE TABLE Rolls (roll_id INTEGER PRIMARY KEY, face INTEGER)'],
    cols: ['face'], order: false,
    sets: [
      { rows: { Rolls: [[1, 4], [2, 4], [3, 4], [4, 2], [5, 4], [6, 2]] }, want: [[4]] },
      { rows: { Rolls: [[1, 1], [2, 1], [3, 2], [4, 1], [5, 1]] }, want: [] },
      { rows: { Rolls: [[1, 6], [2, 6], [3, 6], [4, 6], [5, 3], [6, 3], [7, 3]] }, want: [[6], [3]] },
      { rows: { Rolls: [[1, 5], [2, 2], [3, 5], [4, 5], [5, 5], [6, 2], [7, 2], [8, 5]] }, want: [[5]] }
    ],
    ref: 'SELECT DISTINCT face FROM (SELECT face, LAG(face) OVER (ORDER BY roll_id) AS prev, LEAD(face) OVER (ORDER BY roll_id) AS next FROM Rolls) WHERE face = prev AND face = next',
    trap: 'SELECT face FROM Rolls GROUP BY face HAVING COUNT(*) >= 3'
  },
  'department-highest-salary': {
    title: 'Department Highest Salary', n: 184, diff: 'Medium',
    ask: 'For each team, find the people paid the most in that team (all of them when there is a tie). Return team (the team_name), member (the name) and pay. Any order.',
    schema: ['CREATE TABLE Teams (team_id INTEGER PRIMARY KEY, team_name TEXT)', 'CREATE TABLE Members (member_id INTEGER PRIMARY KEY, name TEXT, pay INTEGER, team_id INTEGER)'],
    cols: ['team', 'member', 'pay'], order: false,
    sets: [
      { rows: { Teams: [[1, 'Kitchen'], [2, 'Garden']], Members: [[1, 'Ava', 700, 1], [2, 'Ben', 900, 1], [3, 'Cleo', 650, 2], [4, 'Dan', 650, 2], [5, 'Edi', 400, 2]] }, want: [['Kitchen', 'Ben', 900], ['Garden', 'Cleo', 650], ['Garden', 'Dan', 650]] },
      { rows: { Teams: [[1, 'Docks']], Members: [[1, 'Fox', 300, 1]] }, want: [['Docks', 'Fox', 300]] },
      { rows: { Teams: [[1, 'Mill'], [2, 'Forge'], [3, 'Empty']], Members: [[1, 'Gail', 200, 2], [2, 'Hugh', 800, 1], [3, 'Ines', 900, 2], [4, 'Jack', 100, 1]] }, want: [['Mill', 'Hugh', 800], ['Forge', 'Ines', 900]] },
      { rows: { Teams: [[1, 'Barn'], [2, 'Loft']], Members: [[1, 'Kim', 500, 1], [2, 'Lou', 500, 2], [3, 'May', 499, 1], [4, 'Ned', 501, 2]] }, want: [['Barn', 'Kim', 500], ['Loft', 'Ned', 501]] }
    ],
    ref: 'SELECT t.team_name AS team, m.name AS member, m.pay FROM Members m JOIN Teams t ON t.team_id = m.team_id WHERE m.pay = (SELECT MAX(pay) FROM Members x WHERE x.team_id = m.team_id)',
    trap: 'SELECT t.team_name AS team, m.name AS member, m.pay FROM Members m JOIN Teams t ON t.team_id = m.team_id WHERE m.pay = (SELECT MAX(pay) FROM Members)'
  },
  'managers-with-at-least-5-direct-reports': {
    title: 'Managers with at Least 5 Direct Reports', n: 570, diff: 'Medium',
    ask: 'lead_id points to the person each worker reports to directly (NULL for nobody). Return, as lead, the name of everyone with five or more direct reports. Any order.',
    schema: ['CREATE TABLE Workers (worker_id INTEGER PRIMARY KEY, name TEXT, lead_id INTEGER)'],
    cols: ['lead'], order: false,
    sets: [
      { rows: { Workers: [[1, 'Rosa', null], [2, 'Sid', 1], [3, 'Tia', 1], [4, 'Ugo', 1], [5, 'Val', 1], [6, 'Wyn', 1], [7, 'Xia', 2]] }, want: [['Rosa']] },
      { rows: { Workers: [[1, 'Ari', null], [2, 'Bex', 1], [3, 'Cas', 1], [4, 'Dee', 1], [5, 'Emo', 1]] }, want: [] },
      { rows: { Workers: [[1, 'Flo', null], [2, 'Guy', 1], [3, 'Hem', 1], [4, 'Ida', 1], [5, 'Jax', 1], [6, 'Kip', 1], [7, 'Lin', 2], [8, 'Mae', 2], [9, 'Nox', 2], [10, 'Ori', 2], [11, 'Pam', 2]] }, want: [['Flo'], ['Guy']] },
      { rows: { Workers: [[2, 'Quo', 9], [3, 'Ray', 9], [4, 'Sue', 9], [5, 'Tom', 9], [6, 'Uri', 9], [7, 'Vin', null]] }, want: [] }
    ],
    ref: 'SELECT w.name AS lead FROM Workers w JOIN (SELECT lead_id FROM Workers GROUP BY lead_id HAVING COUNT(*) >= 5) r ON r.lead_id = w.worker_id',
    trap: 'SELECT w.name AS lead FROM Workers w JOIN (SELECT lead_id FROM Workers GROUP BY lead_id HAVING COUNT(*) > 5) r ON r.lead_id = w.worker_id'
  },
  'confirmation-rate': {
    title: 'Confirmation Rate', n: 1934, diff: 'Medium',
    ask: 'Each account may be sent sign-in codes; a code ends as confirmed or expired. Return account_id and rate for every account: confirmed codes divided by all codes sent, rounded to 2 places. An account that was never sent a code has rate 0. Any order.',
    schema: ['CREATE TABLE Accounts (account_id INTEGER PRIMARY KEY, joined TEXT)', 'CREATE TABLE Codes (account_id INTEGER, sent_at TEXT, status TEXT)'],
    cols: ['account_id', 'rate'], order: false,
    sets: [
      { rows: { Accounts: [[1, '2026-01-01'], [2, '2026-01-02'], [3, '2026-01-03']], Codes: [[1, '2026-02-01 09:00', 'confirmed'], [1, '2026-02-02 09:00', 'expired'], [1, '2026-02-03 09:00', 'confirmed'], [3, '2026-02-01 10:00', 'expired']] }, want: [[1, 0.67], [2, 0], [3, 0]] },
      { rows: { Accounts: [[4, '2026-03-01']], Codes: [[4, '2026-03-02 08:00', 'confirmed']] }, want: [[4, 1]] },
      { rows: { Accounts: [[5, '2026-03-01'], [6, '2026-03-01']], Codes: [] }, want: [[5, 0], [6, 0]] },
      { rows: { Accounts: [[7, '2026-04-01'], [8, '2026-04-02']], Codes: [[7, '2026-04-03 07:00', 'expired'], [7, '2026-04-03 08:00', 'confirmed'], [8, '2026-04-04 09:00', 'confirmed'], [8, '2026-04-04 10:00', 'confirmed'], [8, '2026-04-05 11:00', 'expired']] }, want: [[7, 0.5], [8, 0.67]] }
    ],
    ref: "SELECT a.account_id, ROUND(COALESCE(AVG(CASE WHEN c.status = 'confirmed' THEN 1.0 ELSE 0 END), 0), 2) AS rate FROM Accounts a LEFT JOIN Codes c ON c.account_id = a.account_id GROUP BY a.account_id",
    trap: "SELECT c.account_id, ROUND(AVG(CASE WHEN c.status = 'confirmed' THEN 1.0 ELSE 0 END), 2) AS rate FROM Codes c GROUP BY c.account_id"
  },
  'monthly-transactions-i': {
    title: 'Monthly Transactions I', n: 1193, diff: 'Medium',
    ask: 'For each month (text like 2026-07) and country, return month, country, tx_count (all payments), ok_count (approved ones), tx_total (all amounts) and ok_total (approved amounts). paid_on is text like 2026-07-14. Any order.',
    schema: ['CREATE TABLE Payments (pay_id INTEGER PRIMARY KEY, country TEXT, state TEXT, amount INTEGER, paid_on TEXT)'],
    cols: ['month', 'country', 'tx_count', 'ok_count', 'tx_total', 'ok_total'], order: false,
    sets: [
      { rows: { Payments: [[1, 'NZ', 'approved', 100, '2026-07-02'], [2, 'NZ', 'declined', 40, '2026-07-09'], [3, 'NZ', 'approved', 60, '2026-08-01'], [4, 'PE', 'approved', 25, '2026-07-30']] }, want: [['2026-07', 'NZ', 2, 1, 140, 100], ['2026-08', 'NZ', 1, 1, 60, 60], ['2026-07', 'PE', 1, 1, 25, 25]] },
      { rows: { Payments: [[1, 'KE', 'declined', 10, '2026-01-01'], [2, 'KE', 'declined', 15, '2026-01-31']] }, want: [['2026-01', 'KE', 2, 0, 25, 0]] },
      { rows: { Payments: [[1, 'FI', 'approved', 5, '2025-12-31'], [2, 'FI', 'approved', 7, '2026-01-01']] }, want: [['2025-12', 'FI', 1, 1, 5, 5], ['2026-01', 'FI', 1, 1, 7, 7]] },
      { rows: { Payments: [[1, 'UY', 'approved', 9, '2026-05-05'], [2, 'MN', 'declined', 3, '2026-05-06'], [3, 'UY', 'declined', 4, '2026-05-07'], [4, 'MN', 'approved', 8, '2026-05-08'], [5, 'UY', 'approved', 1, '2026-05-09']] }, want: [['2026-05', 'UY', 3, 2, 14, 10], ['2026-05', 'MN', 2, 1, 11, 8]] }
    ],
    ref: "SELECT substr(paid_on, 1, 7) AS month, country, COUNT(*) AS tx_count, SUM(state = 'approved') AS ok_count, SUM(amount) AS tx_total, SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS ok_total FROM Payments GROUP BY month, country",
    trap: "SELECT substr(paid_on, 1, 7) AS month, country, COUNT(*) AS tx_count, SUM(state = 'approved') AS ok_count, SUM(amount) AS tx_total, SUM(amount) AS ok_total FROM Payments GROUP BY month, country"
  },
  'game-play-analysis-iv': {
    title: 'Game Play Analysis IV', n: 550, diff: 'Medium',
    ask: 'Each row is a player\'s play on one day (one row per player per day). Return fraction: the share of players who played again on the day right after their first day, rounded to 2 places. Days are text like 2026-03-01.',
    schema: ['CREATE TABLE Plays (player_id INTEGER, device_id INTEGER, day TEXT, games INTEGER)'],
    cols: ['fraction'], order: true,
    sets: [
      { rows: { Plays: [[1, 7, '2026-03-01', 4], [1, 7, '2026-03-02', 2], [2, 8, '2026-03-05', 1], [3, 9, '2026-03-01', 3], [3, 9, '2026-03-03', 5]] }, want: [[0.33]] },
      { rows: { Plays: [[1, 1, '2026-01-31', 1], [1, 1, '2026-02-01', 1], [2, 2, '2026-02-10', 1], [2, 2, '2026-02-11', 1]] }, want: [[1]] },
      { rows: { Plays: [[1, 1, '2026-04-01', 2], [1, 1, '2026-04-03', 2], [1, 1, '2026-04-04', 2]] }, want: [[0]] },
      { rows: { Plays: [[4, 3, '2026-05-02', 1], [4, 3, '2026-05-01', 1], [5, 3, '2026-05-01', 1], [6, 3, '2026-05-09', 1], [6, 3, '2026-05-10', 1], [6, 3, '2026-05-08', 1], [7, 3, '2026-05-02', 1]] }, want: [[0.5]] }
    ],
    ref: "SELECT ROUND(COUNT(p.player_id) * 1.0 / (SELECT COUNT(DISTINCT player_id) FROM Plays), 2) AS fraction FROM (SELECT player_id, MIN(day) AS first_day FROM Plays GROUP BY player_id) f LEFT JOIN Plays p ON p.player_id = f.player_id AND p.day = date(f.first_day, '+1 day')",
    trap: "SELECT ROUND(COUNT(DISTINCT a.player_id) * 1.0 / (SELECT COUNT(DISTINCT player_id) FROM Plays), 2) AS fraction FROM Plays a JOIN Plays b ON b.player_id = a.player_id AND b.day = date(a.day, '+1 day')"
  },
  'exchange-seats': {
    title: 'Exchange Seats', n: 626, diff: 'Medium',
    ask: 'Chairs are numbered 1, 2, 3 with no gaps. Swap the guests in each pair of chairs: 1 with 2, 3 with 4, and so on. When the count is odd the last guest stays put. Return chair_id and guest after the swap, by chair_id.',
    schema: ['CREATE TABLE Chairs (chair_id INTEGER PRIMARY KEY, guest TEXT)'],
    cols: ['chair_id', 'guest'], order: true,
    sets: [
      { rows: { Chairs: [[1, 'Ada'], [2, 'Bram'], [3, 'Cora'], [4, 'Dirk'], [5, 'Esme']] }, want: [[1, 'Bram'], [2, 'Ada'], [3, 'Dirk'], [4, 'Cora'], [5, 'Esme']] },
      { rows: { Chairs: [[1, 'Fern']] }, want: [[1, 'Fern']] },
      { rows: { Chairs: [[1, 'Gwen'], [2, 'Hal']] }, want: [[1, 'Hal'], [2, 'Gwen']] },
      { rows: { Chairs: [[1, 'Ivy'], [2, 'Jon'], [3, 'Kay']] }, want: [[1, 'Jon'], [2, 'Ivy'], [3, 'Kay']] }
    ],
    ref: 'SELECT CASE WHEN chair_id % 2 = 1 AND chair_id = (SELECT MAX(chair_id) FROM Chairs) THEN chair_id WHEN chair_id % 2 = 1 THEN chair_id + 1 ELSE chair_id - 1 END AS chair_id, guest FROM Chairs ORDER BY 1',
    trap: 'SELECT CASE WHEN chair_id % 2 = 1 THEN chair_id + 1 ELSE chair_id - 1 END AS chair_id, guest FROM Chairs ORDER BY 1'
  },
  'department-top-three-salaries': {
    title: 'Department Top Three Salaries', n: 185, diff: 'Hard',
    ask: 'A team\'s top earners are the people whose pay is among the three highest different pays in that team. Return team (the team_name), member (the name) and pay for every top earner in every team. Any order.',
    schema: ['CREATE TABLE Teams (team_id INTEGER PRIMARY KEY, team_name TEXT)', 'CREATE TABLE Members (member_id INTEGER PRIMARY KEY, name TEXT, pay INTEGER, team_id INTEGER)'],
    cols: ['team', 'member', 'pay'], order: false,
    sets: [
      { rows: { Teams: [[1, 'Kitchen'], [2, 'Garden']], Members: [[1, 'Ava', 900, 1], [2, 'Ben', 800, 1], [3, 'Cal', 800, 1], [4, 'Dot', 700, 1], [5, 'Eve', 600, 1], [6, 'Fay', 500, 2], [7, 'Gus', 400, 2]] }, want: [['Kitchen', 'Ava', 900], ['Kitchen', 'Ben', 800], ['Kitchen', 'Cal', 800], ['Kitchen', 'Dot', 700], ['Garden', 'Fay', 500], ['Garden', 'Gus', 400]] },
      { rows: { Teams: [[1, 'Docks']], Members: [[1, 'Hob', 50, 1], [2, 'Ira', 50, 1], [3, 'Jem', 50, 1], [4, 'Kip', 50, 1]] }, want: [['Docks', 'Hob', 50], ['Docks', 'Ira', 50], ['Docks', 'Jem', 50], ['Docks', 'Kip', 50]] },
      { rows: { Teams: [[1, 'Mill'], [2, 'Forge']], Members: [[1, 'Lux', 10, 1], [2, 'Moe', 20, 1], [3, 'Nan', 30, 1], [4, 'Oak', 40, 1], [5, 'Pru', 99, 2]] }, want: [['Mill', 'Moe', 20], ['Mill', 'Nan', 30], ['Mill', 'Oak', 40], ['Forge', 'Pru', 99]] },
      { rows: { Teams: [[1, 'Barn'], [2, 'Loft']], Members: [[1, 'Quy', 5, 1], [2, 'Rho', 6, 2], [3, 'Sal', 7, 2], [4, 'Tam', 8, 2], [5, 'Uta', 9, 2], [6, 'Vee', 6, 2]] }, want: [['Barn', 'Quy', 5], ['Loft', 'Sal', 7], ['Loft', 'Tam', 8], ['Loft', 'Uta', 9]] }
    ],
    ref: 'SELECT t.team_name AS team, r.name AS member, r.pay FROM (SELECT name, pay, team_id, DENSE_RANK() OVER (PARTITION BY team_id ORDER BY pay DESC) AS k FROM Members) r JOIN Teams t ON t.team_id = r.team_id WHERE r.k <= 3',
    trap: 'SELECT t.team_name AS team, r.name AS member, r.pay FROM (SELECT name, pay, team_id, ROW_NUMBER() OVER (PARTITION BY team_id ORDER BY pay DESC) AS k FROM Members) r JOIN Teams t ON t.team_id = r.team_id WHERE r.k <= 3'
  },
  'trips-and-users': {
    title: 'Trips and Users', n: 262, diff: 'Hard',
    ask: 'A ride app logs rides: status is done, rider_cancel or driver_cancel. People holds every rider and driver, with banned Y or N. For each day from 2026-06-01 to 2026-06-03, look only at rides where neither the rider nor the driver is banned, and return day and cancel_rate: the share of those rides that were cancelled either way, rounded to 2 places. Leave out days with no such rides. Any order.',
    schema: ['CREATE TABLE Rides (ride_id INTEGER PRIMARY KEY, rider_id INTEGER, driver_id INTEGER, status TEXT, day TEXT)', 'CREATE TABLE People (person_id INTEGER PRIMARY KEY, banned TEXT, role TEXT)'],
    cols: ['day', 'cancel_rate'], order: false,
    sets: [
      { rows: { Rides: [[1, 1, 10, 'done', '2026-06-01'], [2, 2, 11, 'rider_cancel', '2026-06-01'], [3, 3, 10, 'done', '2026-06-01'], [4, 1, 11, 'driver_cancel', '2026-06-02'], [5, 2, 10, 'done', '2026-06-02'], [6, 3, 12, 'rider_cancel', '2026-06-03']], People: [[1, 'N', 'rider'], [2, 'N', 'rider'], [3, 'Y', 'rider'], [10, 'N', 'driver'], [11, 'N', 'driver'], [12, 'N', 'driver']] }, want: [['2026-06-01', 0.5], ['2026-06-02', 0.5]] },
      { rows: { Rides: [[1, 1, 10, 'done', '2026-06-01'], [2, 1, 11, 'done', '2026-06-02'], [3, 1, 10, 'rider_cancel', '2026-06-04']], People: [[1, 'N', 'rider'], [10, 'N', 'driver'], [11, 'Y', 'driver']] }, want: [['2026-06-01', 0]] },
      { rows: { Rides: [[1, 1, 10, 'rider_cancel', '2026-06-03'], [2, 2, 10, 'driver_cancel', '2026-06-03'], [3, 1, 10, 'done', '2026-06-03']], People: [[1, 'N', 'rider'], [2, 'N', 'rider'], [10, 'N', 'driver']] }, want: [['2026-06-03', 0.67]] },
      { rows: { Rides: [[1, 1, 10, 'done', '2026-05-31'], [2, 2, 10, 'rider_cancel', '2026-06-01'], [3, 1, 11, 'done', '2026-06-02'], [4, 2, 11, 'driver_cancel', '2026-06-02']], People: [[1, 'N', 'rider'], [2, 'Y', 'rider'], [10, 'N', 'driver'], [11, 'N', 'driver']] }, want: [['2026-06-02', 0]] }
    ],
    ref: "SELECT r.day, ROUND(AVG(CASE WHEN r.status <> 'done' THEN 1.0 ELSE 0 END), 2) AS cancel_rate FROM Rides r JOIN People a ON a.person_id = r.rider_id AND a.banned = 'N' JOIN People d ON d.person_id = r.driver_id AND d.banned = 'N' WHERE r.day BETWEEN '2026-06-01' AND '2026-06-03' GROUP BY r.day",
    trap: "SELECT r.day, ROUND(AVG(CASE WHEN r.status <> 'done' THEN 1.0 ELSE 0 END), 2) AS cancel_rate FROM Rides r JOIN People a ON a.person_id = r.rider_id AND a.banned = 'N' WHERE r.day BETWEEN '2026-06-01' AND '2026-06-03' GROUP BY r.day"
  },
  'human-traffic-of-stadium': {
    title: 'Human Traffic of Stadium', n: 601, diff: 'Hard',
    ask: 'A fair logs one visit_id per day, in date order with no gaps in the ids. Return visit_id, day and crowd for every row that sits in a run of three or more back-to-back ids where each crowd was 100 or more. Sort by day.',
    schema: ['CREATE TABLE Gates (visit_id INTEGER PRIMARY KEY, day TEXT, crowd INTEGER)'],
    cols: ['visit_id', 'day', 'crowd'], order: true,
    sets: [
      { rows: { Gates: [[1, '2026-08-01', 40], [2, '2026-08-02', 120], [3, '2026-08-03', 180], [4, '2026-08-04', 101], [5, '2026-08-05', 90], [6, '2026-08-06', 300], [7, '2026-08-07', 150]] }, want: [[2, '2026-08-02', 120], [3, '2026-08-03', 180], [4, '2026-08-04', 101]] },
      { rows: { Gates: [[1, '2026-09-01', 100], [2, '2026-09-02', 100], [3, '2026-09-03', 99], [4, '2026-09-04', 100], [5, '2026-09-05', 100]] }, want: [] },
      { rows: { Gates: [[1, '2026-10-01', 500], [2, '2026-10-02', 400], [3, '2026-10-03', 300], [4, '2026-10-04', 200]] }, want: [[1, '2026-10-01', 500], [2, '2026-10-02', 400], [3, '2026-10-03', 300], [4, '2026-10-04', 200]] },
      { rows: { Gates: [[1, '2026-11-01', 110], [2, '2026-11-02', 120], [3, '2026-11-03', 130], [4, '2026-11-04', 5], [5, '2026-11-05', 140], [6, '2026-11-06', 150], [7, '2026-11-07', 160], [8, '2026-11-08', 170]] }, want: [[1, '2026-11-01', 110], [2, '2026-11-02', 120], [3, '2026-11-03', 130], [5, '2026-11-05', 140], [6, '2026-11-06', 150], [7, '2026-11-07', 160], [8, '2026-11-08', 170]] }
    ],
    ref: 'WITH busy AS (SELECT visit_id, day, crowd, visit_id - ROW_NUMBER() OVER (ORDER BY visit_id) AS run FROM Gates WHERE crowd >= 100) SELECT visit_id, day, crowd FROM busy WHERE run IN (SELECT run FROM busy GROUP BY run HAVING COUNT(*) >= 3) ORDER BY day',
    trap: 'SELECT visit_id, day, crowd FROM Gates WHERE crowd >= 100 ORDER BY day'
  }
};

// ---- helpers (shared by the page, the worker and tests/sqlcheck.js) ----
// Tables and columns of a spec, read from its CREATE TABLE lines: [{ name, cols: [[name, type]] }].
function sqlTables(spec) {
  return spec.schema.map((s) => {
    const m = /^CREATE TABLE (\w+) \((.*)\)$/.exec(s.trim());
    if (!m) throw new Error('Cannot read: ' + s);
    return { name: m[1], cols: m[2].split(',').map((c) => { const w = c.trim().split(/\s+/); return [w[0], w[1] || '']; }) };
  });
}
function sqlLit(v) { return v === null || v === undefined ? 'NULL' : typeof v === 'number' ? String(v) : "'" + String(v).replace(/'/g, "''") + "'"; }
// The SQL that builds dataset i: every CREATE TABLE, then one INSERT per table.
function sqlSetup(spec, i) {
  const set = spec.sets[i], out = spec.schema.map((s) => s + ';');
  sqlTables(spec).forEach((tb) => {
    const rows = set.rows[tb.name] || [];
    if (rows.length) out.push('INSERT INTO ' + tb.name + ' VALUES ' + rows.map((r) => '(' + r.map(sqlLit).join(', ') + ')').join(', ') + ';');
  });
  return out.join('\n');
}
// Run setup, then the learner's statements, on a fresh database. SQL is the sql.js module.
// Returns { columns, values } from the last statement that returns columns (or from after), or { error }.
// The worker runs this same function (it is copied in with toString), so keep it ES5-ish and self-contained.
function sqlExec(SQL, setup, query, after) {
  var db = new SQL.Database();
  function runAll(text) {
    var out = null, it = db.iterateStatements(text), step = it.next();
    while (!step.done) {
      var st = step.value, cols = st.getColumnNames(), rows = [];
      while (st.step()) { rows.push(st.get()); if (rows.length > 5000) throw new Error('More than 5000 rows came back. Is a join missing its ON?'); }
      if (cols.length) out = { columns: cols, values: rows };
      step = it.next();
    }
    return out;
  }
  try {
    db.exec(setup);
    var res = runAll(query);
    if (after) res = runAll(after);
    if (!res) return { error: 'Your SQL ran but returned no table. End with a SELECT.' };
    return res;
  } catch (e) {
    return { error: String(e && e.message ? e.message : e) };
  } finally { db.close(); }
}
// Numbers compare to 6 decimal places, so 4.5 and 4.50 are the same; everything else exactly.
function sqlCell(v) { return typeof v === 'number' ? 'n:' + (Math.round(v * 1e6) / 1e6) : v === null || v === undefined ? 'null' : 's:' + String(v); }
function sqlRowKey(r) { return r.map(sqlCell).join('\u0001'); }
function sqlShow(v) { if (v === null || v === undefined) return 'NULL'; if (typeof v === 'number') return String(Math.round(v * 1e6) / 1e6); return String(v); }
// Is got ({ columns, values } or { error }) right for dataset i? Returns { ok, why, missing, extra }.
// missing: wanted rows that did not come back; extra: rows that came back but were not wanted (as multisets).
function sqlJudge(spec, i, got) {
  const want = spec.sets[i].want;
  if (!got || got.error) return { ok: false, why: got ? got.error : 'No result.', missing: [], extra: [] };
  const wc = spec.cols.map((c) => c.toLowerCase()), gc = got.columns.map((c) => String(c).toLowerCase());
  if (wc.join(',') !== gc.join(',')) return { ok: false, why: 'Columns should be ' + spec.cols.join(', ') + ' (got ' + (got.columns.join(', ') || 'none') + ').', missing: [], extra: [], cols: true };
  const left = {};
  want.forEach((r) => { const k = sqlRowKey(r); left[k] = (left[k] || 0) + 1; });
  const extra = [];
  got.values.forEach((r) => { const k = sqlRowKey(r); if (left[k]) left[k]--; else extra.push(r); });
  const missing = [];
  want.forEach((r) => { const k = sqlRowKey(r); if (left[k] > 0) { missing.push(r); left[k]--; } });
  if (missing.length || extra.length) return { ok: false, why: (missing.length ? missing.length + ' row' + (missing.length > 1 ? 's' : '') + ' missing' : '') + (missing.length && extra.length ? ', ' : '') + (extra.length ? extra.length + ' row' + (extra.length > 1 ? 's' : '') + ' not expected' : '') + '.', missing, extra };
  if (spec.order && got.values.map(sqlRowKey).join('\u0002') !== want.map(sqlRowKey).join('\u0002')) return { ok: false, why: 'The right rows, in the wrong order.', missing: [], extra: [], order: true };
  return { ok: true, why: '', missing: [], extra: [] };
}
if (typeof module !== 'undefined' && module.exports) module.exports = { SQL_SPECS, sqlTables, sqlLit, sqlSetup, sqlExec, sqlJudge, sqlShow, sqlRowKey };
// @@END-SQL-SPEC@@
