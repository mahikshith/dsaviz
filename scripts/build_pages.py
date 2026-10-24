"""Sync shared code into every page in pages/.

Each page (pages/*.dc.html) is a self-contained design board. Some blocks are shared
across pages and live in one place; this script copies them back into every page:

  shared/themes_common.js   -> between // @@THEMES@@ ... // @@END-THEMES@@
  shared/catalog.js         -> between // @@CATALOG@@ ... // @@END@@
  shared/sheet.js           -> between // @@SHEET@@ ... // @@END-SHEET@@ (Sheet and Code pages)
                               and its row count -> // @@SHEET-COUNT@@ ... // @@END-SHEET-COUNT@@ (Main, Home)
  scripts/build_sheet.js    -> between // @@SOLVE@@ ... // @@END-SOLVE@@ (every page; SOLVE_IDS: sheet row id -> problem page id where they differ)
  shared/data.js            -> between // @@DATA@@ ... // @@END-DATA@@ (every page; DS, the data layer)
  shared/drawer.js          -> between // @@DRAWER@@ ... // @@END-DRAWER@@ (every page)
  shared/ui.js              -> between // @@UI@@ ... // @@END-UI@@ (every page; component view models)
  scripts/build_search.js   -> between // @@SEARCH@@ ... // @@END-SEARCH@@ (every page; SITE_INDEX: search items and counts)
  shared/search.js          -> between // @@FIND@@ ... // @@END-FIND@@ (every page; the site search scorer)
  shared/nav.js             -> between // @@NAV@@ ... // @@END-NAV@@ (every page; NAV_PAGES filled from pages/)
  shared/ui/nav.html + shared/drawer.html -> between <!-- PILL NAV --> ... <!-- /PILL NAV -->
  shared/ui/tiles.html, rings.html, medals.html -> <!-- STAT TILES -->, <!-- RINGS -->, <!-- MEDALS --> blocks
  shared/ui/phone.html      -> <!-- PHONE CSS --> in the helmet of every page with a phone layout (data-page root)
  The seven script blocks are added after the catalog (or the themes) when a page lacks them.
  shared/pattern_intros.js  -> between // @@INTROS@@ ... // @@END-INTROS@@ (Patterns page), plus SHEET_INDEX built from sheet.js
  shared/tests_spec.js      -> between // @@TESTS-SPEC@@ ... // @@END-TESTS-SPEC@@
  shared/plans.js           -> between // @@PLANS@@ ... // @@END-PLANS@@ (Code and Story: "Plan it first")
  shared/hints.js           -> between // @@HINTS@@ ... // @@END-HINTS@@ (Code: the hint ladder and example notes)
  shared/sheet.js hints     -> between // @@MOCK-HINTS@@ ... // @@END-MOCK-HINTS@@ (Interview: the sheet's one-line hint per runnable problem)
  shared/runner.js          -> between // @@RUNNER@@ ... // @@END-RUNNER@@
  shared/code_pane.js       -> between // @@CODE-PANE@@ ... // @@END-CODE-PANE@@
  shared/code_pane.html     -> between <!-- CODE PANE --> ... <!-- /CODE PANE --> (after page bodies)
  shared/sql_spec.js        -> between // @@SQL-SPEC@@ ... // @@END-SQL-SPEC@@ (Code page; its ids also join SHEET_RUN)
  shared/sql_pane.js        -> between // @@SQL-PANE@@ ... // @@END-SQL-PANE@@ (Code page)
  shared/sql_pane.html      -> between <!-- SQL PANE --> ... <!-- /SQL PANE --> (Code page body)
  src/git/sim.js + lessons.js -> between // @@GITSIM@@ ... // @@END-GITSIM@@ (Git page)
  src/sd/engine.js + lessons.js -> between // @@SDLESSONS@@ ... // @@END-SDLESSONS@@ (SystemDesign, SDLesson)
  src/ai/render.js + lessons.js -> between // @@AILESSONS@@ ... // @@END-AILESSONS@@ (AI & ML pages)
  src/ai/render.js + src/concepts/lessons.js -> between // @@CONCEPTS@@ ... // @@END-CONCEPTS@@ (Concepts, ConceptLesson),
                               plus CONCEPT_ROWS (titles of the "Now try" problems) from scripts/build_concepts.js
  scripts/build_concepts.js -> between // @@CONCEPT-MAP@@ ... // @@END-CONCEPT-MAP@@ (Patterns: lesson links per map node)
  src/concepts/hub.js, player.js -> the page scripts of Concepts and ConceptLesson
  src/start/*.js + tracer.py -> between // @@START@@ ... // @@END-START@@ (Start, Chapter: the Start here track),
                               and the lessons alone between // @@START-LITE@@ ... // @@END-START-LITE@@ (Home).
                               First it traces every chapter's "Watch it run" program into src/start/traces.js.
  shared/contests.js        -> between // @@CONTESTS@@ ... // @@END-CONTESTS@@ (Contests page)
  src/story/*               -> Story.dc.html markup and engine
  src/pages/<name>_body.html + <name>.js -> Revisit, Profile, Welcome
  src/code/code_body.html + code.js       -> Code
  scripts/build_registry.js -> data/problem-registry.json and docs/problems/REGISTRY.md (the problem registry)

Run from the repo root:  python3 scripts/build_pages.py
"""
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = os.path.join(ROOT, 'pages')


def read(*parts):
    with open(os.path.join(ROOT, *parts), encoding='utf-8') as f:
        return f.read()


def block(src, start, end, new):
    i = src.find(start)
    if i < 0:
        return src
    j = src.index(end, i) + len(end)
    return src[:i] + new.strip() + src[j:]


# Script blocks every page gets, in this order, right after the catalog (or the themes on pages without one).
SHARED_JS = [('// @@DATA@@', '// @@END-DATA@@', 'data.js'), ('// @@DRAWER@@', '// @@END-DRAWER@@', 'drawer.js'),
             ('// @@UI@@', '// @@END-UI@@', 'ui.js'), ('// @@SEARCH@@', '// @@END-SEARCH@@', '@search'),
             ('// @@FIND@@', '// @@END-FIND@@', 'search.js'), ('// @@NAV@@', '// @@END-NAV@@', 'nav.js'),
             ('// @@SOLVE@@', '// @@END-SOLVE@@', '@solve')]


def ensure_blocks(s):
    prev = '// @@END@@' if '// @@END@@' in s else '// @@END-THEMES@@'
    for start, end, _ in SHARED_JS:
        if start not in s:
            i = s.index(prev) + len(prev)
            s = s[:i] + '\n' + start + '\n' + end + s[i:]
        prev = end
    return s


def phone_pads(files):
    """Phone rules for the big paddings the 1440px boards use (shared/ui/phone.html, /*@@PADS@@*/).
    Matches each padding as the browser serializes it: wide side padding drops to the 16px gutter,
    tall section padding to 40px, and 22 to 32px card padding to 16px."""
    seen = set()
    for s in files:
        for m in re.finditer(r'padding: ([0-9px ]+)[;"]', s):
            seen.add(m.group(1).strip())
    rules = {}
    for v in sorted(seen):
        px = [int(x[:-2]) if x.endswith('px') else int(x) for x in v.split()]
        t, r, b, l = (px * 4)[:4] if len(px) == 1 else (px[0], px[1], px[0], px[1]) if len(px) == 2 else (px[0], px[1], px[2], px[1]) if len(px) == 3 else px
        out = []
        if r >= 36 and l >= 36:
            out.append('padding-left:16px!important;padding-right:16px!important')
        elif 22 <= r <= 32 and 22 <= l <= 32 and 16 <= t <= 32 and 16 <= b <= 32:
            out.append('padding:16px!important')
        if max(t, b) >= 48:
            out.append('padding-top:%dpx!important;padding-bottom:%dpx!important' % (min(t, 40), min(b, 40)))
        if out:
            key = ';'.join(out)
            # The browser writes the shortest form: 'padding: 80px 80px' comes back as 'padding: 80px'.
            short = [t] if t == r == b == l else [t, r] if t == b and r == l else [t, r, b] if r == l else [t, r, b, l]
            css = 'padding: ' + ' '.join('%dpx' % x for x in short) + ';'
            sel = '[data-page] [style*="%s"]' % css
            if sel not in rules.setdefault(key, []):
                rules[key].append(sel)
    # Wide board gaps (40px and up) close to 24px.
    gaps = set()
    for s in files:
        gaps.update(int(g) for g in re.findall(r'[;" ]gap: (\d+)px[;"]', s))
    big = ['[data-page] [style*="gap: %dpx;"]' % g for g in sorted(gaps) if g >= 40]
    if big:
        rules['gap:24px!important'] = big
    return '\n'.join(','.join(sel) + '{' + key + '}' for key, sel in sorted(rules.items()))


START_DATA = {}


def start_block():
    """Trace each ready chapter's watch program (src/start/tracer.py), write src/start/traces.js, return the block."""
    import importlib.util
    req = json.loads(subprocess.run(['node', os.path.join(ROOT, 'scripts', 'build_start.js')], cwd=ROOT, check=True,
                                    capture_output=True).stdout.decode('utf-8'))
    spec = importlib.util.spec_from_file_location('ds_tracer', os.path.join(ROOT, 'src', 'start', 'tracer.py'))
    tracer = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(tracer)
    START_DATA['medals'] = req['medals']
    traces = {r['id']: tracer.ds_trace(r['code'], r['stdin']) for r in req['watch']}
    out = ('// Generated by scripts/build_pages.py (scripts/build_start.js and src/start/tracer.py). Do not edit.\n'
           '// START_TRACES: each lesson\'s "Watch it run" trace. START_PROBLEMS: title and group of each problem in needs.js.\n'
           'const START_TRACES = ' + json.dumps(traces, ensure_ascii=False, separators=(',', ':')) + ';\n'
           'const START_PROBLEMS = ' + json.dumps(req['problems'], ensure_ascii=False, separators=(',', ':')) + ';\n')
    path = os.path.join(ROOT, 'src', 'start', 'traces.js')
    old = open(path, encoding='utf-8').read() if os.path.exists(path) else ''
    if old != out:
        with open(path, 'w', encoding='utf-8', newline='\n') as fh:
            fh.write(out)
    lessons = sorted(x for x in os.listdir(os.path.join(ROOT, 'src', 'start')) if x.startswith('lessons_') and x.endswith('.js'))
    START_DATA['lite'] = ('// @@START-LITE@@ — generated from src/start (lessons and progress, no traces); edit those, then build.\n'
                          + ''.join(read('src', 'start', f) + '\n' for f in ['engine.js', 'chapters.js'] + lessons + ['exercises.js', 'needs.js']) + '// @@END-START-LITE@@')
    tracer_py = read('src', 'start', 'tracer.py')
    body = ''.join(read('src', 'start', f) + '\n' for f in ['engine.js', 'chapters.js'] + sorted(x for x in os.listdir(os.path.join(ROOT, 'src', 'start')) if x.startswith('lessons_') and x.endswith('.js')) + ['exercises.js', 'needs.js', 'traces.js'])
    return ('// @@START@@ — generated from src/ai/render.js (easing and painting) and src/start/*; edit those, then build.\n'
            + read('src', 'ai', 'render.js') + '\n' + body
            + '// The tracer behind "Watch it run", for tracing the learner\'s own code in the browser (Pyodide).\n'
            + 'const START_TRACER_PY = ' + json.dumps(tracer_py) + ';\n// @@END-START@@')


def main():
    themes = read('shared', 'themes_common.js')
    catalog = read('shared', 'catalog.js')
    sheet = read('shared', 'sheet.js')
    # The sheet as the pages read it: its size, SHEET_INDEX and each row's problem-page id and hint.
    sheet_data = json.loads(subprocess.run(['node', os.path.join(ROOT, 'scripts', 'build_sheet.js')], cwd=ROOT, check=True,
                                           capture_output=True).stdout.decode('utf-8'))
    sheet_total = sheet_data['total']
    sheet_count = ('// @@SHEET-COUNT@@ — generated: how many problems the master sheet holds\n'
                   'const SHEET_TOTAL = %d;\n// @@END-SHEET-COUNT@@' % sheet_total)
    drawer_html = read('shared', 'drawer.html')
    shared_js = {n: read('shared', n) for _, _, n in SHARED_JS if not n.startswith('@')}
    # The search index and the site counts, built by node from the same data the pages use.
    index = subprocess.run(['node', os.path.join(ROOT, 'scripts', 'build_search.js')], cwd=ROOT, check=True,
                           capture_output=True).stdout.decode('utf-8')
    json.loads(index)
    shared_js['@search'] = ('// @@SEARCH@@ — generated by scripts/build_search.js: the site search index and the counts pages show.\n'
                            '// counts: stories, storyPatterns, patterns, catalog, sheet, runnable, sql, git, sd, ai, dsa, terms. Items: [type, id, title, sub, keywords].\n'
                            'const SITE_INDEX = ' + index + ';\n// @@END-SEARCH@@')
    solve = {rid: pid for rid, pid, _ in sheet_data['rows'] if rid != pid}
    shared_js['@solve'] = ('// @@SOLVE@@ — generated from shared/sheet.js: the id our problem page knows a sheet row by, where it differs from the row id.\n'
                           'const SOLVE_IDS = ' + json.dumps(solve, separators=(',', ':')) + ';\n'
                           'function solveId(id) { return SOLVE_IDS[id] || id; }\n'
                           "function solveHref(id) { return 'Code.dc.html?problem=' + encodeURIComponent(solveId(id)); }\n// @@END-SOLVE@@")
    built = sorted(f for f in os.listdir(PAGES) if f.endswith('.dc.html'))
    shared_js['data.js'] = shared_js['data.js'].replace('/*@@SHEET-SIZE@@*/216', str(sheet_total))
    start_js = start_block()
    shared_js['data.js'] = shared_js['data.js'].replace('/*@@START-MEDALS@@*/[]', json.dumps(START_DATA['medals'], separators=(',', ':')))
    shared_js['nav.js'] = shared_js['nav.js'].replace('/*@@PAGES@@*/[]', repr(built).replace("'", '"'))
    drawer_inner = drawer_html.replace('<!-- MENU DRAWER -->', '').replace('<!-- /MENU DRAWER -->', '').strip()
    nav_html = read('shared', 'ui', 'nav.html').replace('DRAWER_HTML', drawer_inner)
    ui_html = {m: read('shared', 'ui', f) for m, f in [('STAT TILES', 'tiles.html'), ('RINGS', 'rings.html'), ('MEDALS', 'medals.html'), ('PHONE CSS', 'phone.html')]}
    intros = read('shared', 'pattern_intros.js').rstrip()
    end = '// @@END-INTROS@@'
    intros = (intros[:-len(end)] + '// SHEET_INDEX: generated by scripts/build_pages.py from shared/sheet.js.\nconst SHEET_INDEX = '
              + json.dumps(sheet_data['index'],ensure_ascii=False, separators=(',', ':')) + ';\n' + end)
    phone_pages = [read('pages', f) for f in built if 'data-page=' in read('pages', f)]
    phone_pages += [read(*p) for p in [('src', 'code', 'code_body.html'), ('src', 'pages', 'profile_body.html'), ('src', 'pages', 'welcome_body.html')]]
    ui_html['PHONE CSS'] = ui_html['PHONE CSS'].replace('/*@@PADS@@*/', phone_pads(phone_pages))
    tests_spec = read('shared', 'tests_spec.js')
    # Ids of every problem with a spec (the mock interview's hints cover these).
    spec_block = tests_spec[tests_spec.index('const TEST_SPECS = {'):]
    spec_block = spec_block[:spec_block.index('\n};')]
    spec_ids = re.findall(r"^  '?([a-z0-9-]+)'?: \{\s*$", spec_block, re.M)
    sql_spec = read('shared', 'sql_spec.js')
    sql_block = sql_spec[sql_spec.index('const SQL_SPECS = {'):]
    sql_block = sql_block[:sql_block.index('\n};')]
    spec_ids += re.findall(r"^  '([a-z0-9-]+)': \{\s*$", sql_block, re.M)
    hints = ('// @@MOCK-HINTS@@ — generated from shared/sheet.js: the sheet hint for each runnable problem (the last mock interview hint)\n'
             'const MOCK_HINTS = ' + json.dumps({pid: hint for _, pid, hint in sheet_data['rows'] if pid in spec_ids}, ensure_ascii=False, separators=(',', ':')) + ';\n// @@END-MOCK-HINTS@@')
    runner = read('shared', 'runner.js')
    contests = read('shared', 'contests.js')
    pane_js = read('shared', 'code_pane.js')
    pane_html = read('shared', 'code_pane.html')
    bodies = {'Story': ('src', 'story', 'story_body.html')}
    scripts = {}
    for name in ['Revisit', 'Profile', 'Welcome']:
        bodies[name] = ('src', 'pages', name.lower() + '_body.html')
        scripts[name] = ('src', 'pages', name.lower() + '.js')
    git_sim = ('// @@GITSIM@@ — generated from src/git/sim.js and src/git/lessons.js; edit those, then build.\n'
               + read('src', 'git', 'sim.js') + '\n' + read('src', 'git', 'lessons.js') + '// @@END-GITSIM@@')
    sd_lessons = ('// @@SDLESSONS@@ — generated from src/sd/engine.js and src/sd/lessons.js; edit those, then build.\n'
                  + read('src', 'sd', 'engine.js') + '\n' + read('src', 'sd', 'lessons.js') + '// @@END-SDLESSONS@@')
    ai_lessons = ('// @@AILESSONS@@ — generated from src/ai/render.js and src/ai/lessons.js; edit those, then build.\n'
                  + read('src', 'ai', 'render.js') + '\n' + read('src', 'ai', 'lessons.js') + '// @@END-AILESSONS@@')
    concept_data = json.loads(subprocess.run(['node', os.path.join(ROOT, 'scripts', 'build_concepts.js')], cwd=ROOT, check=True,
                                             capture_output=True).stdout.decode('utf-8'))
    concepts = ('// @@CONCEPTS@@ — generated from src/ai/render.js and src/concepts/lessons.js; edit those, then build.\n'
                + read('src', 'ai', 'render.js') + '\n' + read('src', 'concepts', 'lessons.js')
                + '// CONCEPT_ROWS: generated by scripts/build_concepts.js from shared/sheet.js (title, difficulty, group of each "Now try" problem).\n'
                + 'const CONCEPT_ROWS = ' + json.dumps(concept_data['rows'], ensure_ascii=False, separators=(',', ':')) + ';\n// @@END-CONCEPTS@@')
    concept_map = ('// @@CONCEPT-MAP@@ — generated by scripts/build_concepts.js: DSA concept lessons per sheet group, for the pattern map.\n'
                   'const CONCEPT_MAP = ' + json.dumps(concept_data['map'], ensure_ascii=False, separators=(',', ':')) + ';\n// @@END-CONCEPT-MAP@@')
    scripts['Concepts'] = ('src', 'concepts', 'hub.js')
    scripts['ConceptLesson'] = ('src', 'concepts', 'player.js')
    bodies['Code'] = ('src', 'code', 'code_body.html')
    scripts['Code'] = ('src', 'code', 'code.js')
    # The three original scene files first (scenes_tp.js opens the engine), then any newer scenes_*.js in name order,
    # then practice.js (custom input and predict helpers), the registry (tail.js), the tasks and the page.
    first = ['scenes_tp.js', 'scenes_sw.js', 'scenes_hm.js']
    more = sorted(f for f in os.listdir(os.path.join(ROOT, 'src', 'story')) if f.startswith('scenes_') and f.endswith('.js') and f not in first)
    story_engine = ''.join(read('src', 'story', f) for f in first + more + ['practice.js', 'tail.js', 'tasks.js', 'comp.js'])

    for f in sorted(os.listdir(PAGES)):
        if not f.endswith('.dc.html'):
            continue
        path = os.path.join(PAGES, f)
        with open(path, encoding='utf-8') as fh:
            s = fh.read()
        before = s
        s = block(s, '// @@THEMES@@', '// @@END-THEMES@@', themes)
        s = block(s, '// @@CATALOG@@', '// @@END@@', catalog)
        s = block(s, '// @@SHEET@@', '// @@END-SHEET@@', sheet)
        s = block(s, '// @@SHEET-COUNT@@', '// @@END-SHEET-COUNT@@', sheet_count)
        s = ensure_blocks(s)
        for start, end, n in SHARED_JS:
            s = block(s, start, end, shared_js[n])
        s = block(s, '<!-- MENU DRAWER -->', '<!-- /MENU DRAWER -->', drawer_html)
        s = block(s, '// @@INTROS@@', '// @@END-INTROS@@', intros)
        s = block(s, '// @@TESTS-SPEC@@', '// @@END-TESTS-SPEC@@', tests_spec)
        s = block(s, '// @@PLANS@@', '// @@END-PLANS@@', read('shared', 'plans.js'))
        s = block(s, '// @@HINTS@@', '// @@END-HINTS@@', read('shared', 'hints.js'))
        s = block(s, '// @@RUNNER@@', '// @@END-RUNNER@@', runner)
        s = block(s, '// @@MOCK-HINTS@@', '// @@END-MOCK-HINTS@@', hints)
        s = block(s, '// @@CODE-PANE@@', '// @@END-CODE-PANE@@', pane_js)
        s = block(s, '// @@SQL-SPEC@@', '// @@END-SQL-SPEC@@', sql_spec)
        s = block(s, '// @@SQL-PANE@@', '// @@END-SQL-PANE@@', read('shared', 'sql_pane.js'))
        s = block(s, '// @@GITSIM@@', '// @@END-GITSIM@@', git_sim)
        s = block(s, '// @@SDLESSONS@@', '// @@END-SDLESSONS@@', sd_lessons)
        s = block(s, '// @@AILESSONS@@', '// @@END-AILESSONS@@', ai_lessons)
        s = block(s, '// @@CONCEPTS@@', '// @@END-CONCEPTS@@', concepts)
        s = block(s, '// @@CONCEPT-MAP@@', '// @@END-CONCEPT-MAP@@', concept_map)
        s = block(s, '// @@CONTESTS@@', '// @@END-CONTESTS@@', contests)
        s = block(s, "// @@START@@", "// @@END-START@@", start_js)
        s = block(s, "// @@START-LITE@@", "// @@END-START-LITE@@", START_DATA['lite'])
        name = f[:-len('.dc.html')]
        if name in bodies:
            body = read(*bodies[name])
            a = s.index('</helmet>\n') + len('</helmet>\n')
            b = s.index('\n</x-dc>')
            s = s[:a] + body.rstrip('\n') + s[b:]
        if name == 'Story':
            a = s.index('// ---- ')
            b = s.index('\n</script>')
            s = s[:a] + story_engine.rstrip('\n') + '\n' + s[b:]
        if name in scripts:
            a = s.index('// ---- page ----')
            b = s.index('\n</script>')
            s = s[:a] + read(*scripts[name]).rstrip('\n') + '\n' + s[b:]
        s = block(s, '<!-- CODE PANE -->', '<!-- /CODE PANE -->', pane_html)
        s = block(s, '<!-- SQL PANE -->', '<!-- /SQL PANE -->', read('shared', 'sql_pane.html'))
        s = block(s, '<!-- PILL NAV -->', '<!-- /PILL NAV -->', nav_html)
        for m, html in ui_html.items():
            s = block(s, "<!-- " + m + " -->", "<!-- /" + m + " -->", html)
        if s != before:
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(s)
            print('updated', f)


if __name__ == '__main__':
    main()
    # The problem registry (data/problem-registry.json, docs/problems/REGISTRY.md), from the same data.
    subprocess.run(['node', os.path.join(ROOT, 'scripts', 'build_registry.js')], cwd=ROOT, check=True)
