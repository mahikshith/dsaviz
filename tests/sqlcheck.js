// Check shared/sql_spec.js on real SQLite (sql.js from node_modules, the same build the page loads from jsDelivr):
// every spec is complete and matches a master sheet SQL row, its CREATE TABLE lines build the tables the schema
// panel shows, the reference query gives the expected rows on every dataset, and the spec's tempting wrong
// query (trap) fails on at least one dataset. Table names must be our own, not the ones common practice sets use.
const fs = require('fs');
const path = require('path');
const { SQL_SPECS, sqlTables, sqlSetup, sqlExec, sqlJudge, sqlShow } = require('../shared/sql_spec.js');

let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };
const DIFFS = ['Easy', 'Medium', 'Hard'];
// The table names common practice sets use for these problems: our schemas use different ones.
const THEIRS = ['world', 'person', 'address', 'employee', 'employees', 'employeeuni', 'customer', 'customers', 'orders', 'weather',
  'activity', 'seat', 'stadium', 'trips', 'users', 'department', 'logs', 'scores', 'products', 'tweets', 'queries', 'views',
  'visits', 'transactions', 'signups', 'confirmations', 'prices', 'unitssold', 'patients', 'salary'];

// The master sheet's SQL rows: id -> name.
const sheetSrc = fs.readFileSync(path.join(__dirname, '..', 'shared', 'sheet.js'), 'utf8');
const sqlBlock = sheetSrc.slice(sheetSrc.indexOf('  "SQL": ['), sheetSrc.indexOf('\n  ],', sheetSrc.indexOf('  "SQL": [')));
const SHEET_SQL = {};
for (const m of sqlBlock.matchAll(/\["([a-z0-9-]+)", "((?:[^"\\]|\\.)*)"/g)) SHEET_SQL[m[1]] = m[2];

require('sql.js')({ locateFile: (f) => path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', f) }).then((SQL) => {
  const ids = Object.keys(SQL_SPECS);
  if (ids.length < 20) fail('SQL_SPECS', 'needs 20 or more problems, has ' + ids.length);
  for (const id of ids) {
    const spec = SQL_SPECS[id];
    if (!SHEET_SQL[id]) fail(id, 'is not a row in the sheet\'s SQL group');
    else if (SHEET_SQL[id] !== spec.title) fail(id, 'title differs from the sheet: ' + SHEET_SQL[id]);
    if (!DIFFS.includes(spec.diff)) fail(id, 'bad difficulty ' + spec.diff);
    if (!spec.ask || spec.ask.length < 40) fail(id, 'no problem statement');
    for (const c of spec.cols || []) if (!spec.ask.includes(c)) fail(id, 'the statement never names the output column ' + c);
    if (!Array.isArray(spec.cols) || !spec.cols.length) fail(id, 'no output columns');
    if (typeof spec.order !== 'boolean') fail(id, 'order must be true or false');
    if (!spec.ref || !spec.trap) { fail(id, 'needs a ref and a trap query'); continue; }
    if (!Array.isArray(spec.sets) || spec.sets.length < 4 || spec.sets.length > 6) { fail(id, 'needs 1 visible and 3 to 5 hidden datasets'); continue; }
    let tables;
    try { tables = sqlTables(spec); } catch (e) { fail(id, e.message); continue; }
    for (const tb of tables) if (THEIRS.includes(tb.name.toLowerCase())) fail(id, 'table ' + tb.name + ' is the common practice-set name; use our own');
    // The schema panel's parse agrees with SQLite's own view of the tables.
    const db = new SQL.Database();
    try {
      db.exec(spec.schema.join(';\n'));
      for (const tb of tables) {
        const info = db.exec('PRAGMA table_info(' + tb.name + ')')[0].values.map((r) => r[1] + ' ' + r[2]);
        if (info.join(',') !== tb.cols.map((c) => c.join(' ')).join(',')) fail(id, 'schema panel reads ' + tb.name + ' wrong: ' + info.join(', '));
      }
    } catch (e) { fail(id, 'schema does not run: ' + e.message); }
    db.close();
    const seen = new Set();
    spec.sets.forEach((set, i) => {
      for (const t of Object.keys(set.rows)) {
        const tb = tables.find((x) => x.name === t);
        if (!tb) fail(id, 'set ' + i + ' fills unknown table ' + t);
        else set.rows[t].forEach((r) => { if (r.length !== tb.cols.length) fail(id, 'set ' + i + ' ' + t + ' row ' + JSON.stringify(r) + ' has ' + r.length + ' values'); });
      }
      for (const tb of tables) if (!set.rows[tb.name]) fail(id, 'set ' + i + ' leaves out table ' + tb.name + ' (write [] for an empty one)');
      const key = JSON.stringify(set.rows);
      if (seen.has(key)) fail(id, 'set ' + i + ' repeats an earlier set');
      seen.add(key);
      if (!Array.isArray(set.want)) fail(id, 'set ' + i + ' has no want');
      else set.want.forEach((r) => { if (r.length !== spec.cols.length) fail(id, 'set ' + i + ' want row ' + JSON.stringify(r) + ' has the wrong width'); });
      const got = sqlExec(SQL, sqlSetup(spec, i), spec.ref, spec.after);
      const v = sqlJudge(spec, i, got);
      if (!v.ok) fail(id, 'reference fails set ' + i + ': ' + v.why + (got.values ? ' got ' + JSON.stringify(got.values.map((r) => r.map(sqlShow))) : ''));
    });
    if (!spec.sets[0].want.length) fail(id, 'the visible set should return at least one row');
    const trapFails = spec.sets.map((s, i) => !sqlJudge(spec, i, sqlExec(SQL, sqlSetup(spec, i), spec.trap, spec.after)).ok);
    if (!trapFails.some(Boolean)) fail(id, 'the trap query passes every set: add a dataset that catches it');
    // A query that has nothing to do with the problem fails too.
    if (sqlJudge(spec, 0, sqlExec(SQL, sqlSetup(spec, 0), 'SELECT 1 AS ' + spec.cols[0], spec.after)).ok && !spec.after) fail(id, 'SELECT 1 passes the visible set');
    console.log('✓', id.padEnd(52), (spec.sets.length - 1) + ' hidden sets, ' + (spec.order ? 'ordered' : 'any order') + ', trap caught by set ' + trapFails.indexOf(true));
  }
  // The runner reports errors and empty scripts in plain words.
  const one = SQL_SPECS[ids[0]];
  if (!sqlExec(SQL, sqlSetup(one, 0), 'SELEC nope').error) { bad++; console.log('  ✗ a syntax error should come back as an error'); }
  if (!/no table/.test(sqlExec(SQL, sqlSetup(one, 0), '-- just a comment').error || '')) { bad++; console.log('  ✗ an empty query should say it returned no table'); }
  const cols = sqlJudge(one, 0, { columns: ['wrong_name'], values: [] });
  if (cols.ok || !cols.cols) { bad++; console.log('  ✗ wrong column names should fail'); }
  console.log('SQL problems: ' + ids.length);
  console.log(bad ? bad + ' problem(s)' : 'all sql specs pass');
  if (bad) process.exitCode = 1;
}, (e) => { console.log('  ✗ sql.js did not load: ' + e.message + ' (run npm install)'); process.exitCode = 1; });
