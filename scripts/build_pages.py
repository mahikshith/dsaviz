"""Sync shared code into every page in pages/.

Each page (pages/*.dc.html) is a self-contained design board. Some blocks are shared
across pages and live in one place; this script copies them back into every page:

  shared/themes_common.js   -> between // @@THEMES@@ ... // @@END-THEMES@@
  shared/catalog.js         -> between // @@CATALOG@@ ... // @@END@@
  shared/sheet.js           -> between // @@SHEET@@ ... // @@END-SHEET@@ (Sheet page)
                               and its row count -> // @@SHEET-COUNT@@ ... // @@END-SHEET-COUNT@@ (Main, Home)
  shared/data.js            -> between // @@DATA@@ ... // @@END-DATA@@ (every page; DS, the data layer)
  shared/drawer.js          -> between // @@DRAWER@@ ... // @@END-DRAWER@@ (every page)
  shared/ui.js              -> between // @@UI@@ ... // @@END-UI@@ (every page; component view models)
  scripts/build_search.js   -> between // @@SEARCH@@ ... // @@END-SEARCH@@ (every page; SITE_INDEX: search items and counts)
  shared/search.js          -> between // @@FIND@@ ... // @@END-FIND@@ (every page; the site search scorer)
  shared/nav.js             -> between // @@NAV@@ ... // @@END-NAV@@ (every page; NAV_PAGES filled from pages/)
  shared/ui/nav.html + shared/drawer.html -> between <!-- PILL NAV --> ... <!-- /PILL NAV -->
  shared/ui/tiles.html, rings.html, medals.html -> <!-- STAT TILES -->, <!-- RINGS -->, <!-- MEDALS --> blocks
  The six script blocks are added after the catalog (or the themes) when a page lacks them.
  shared/pattern_intros.js  -> between // @@INTROS@@ ... // @@END-INTROS@@ (Patterns page), plus SHEET_INDEX built from sheet.js
  shared/tests_spec.js      -> between // @@TESTS-SPEC@@ ... // @@END-TESTS-SPEC@@
  shared/runner.js          -> between // @@RUNNER@@ ... // @@END-RUNNER@@
  shared/code_pane.js       -> between // @@CODE-PANE@@ ... // @@END-CODE-PANE@@
  shared/code_pane.html     -> between <!-- CODE PANE --> ... <!-- /CODE PANE --> (after page bodies)
  src/git/sim.js + lessons.js -> between // @@GITSIM@@ ... // @@END-GITSIM@@ (Git page)
  src/sd/engine.js + lessons.js -> between // @@SDLESSONS@@ ... // @@END-SDLESSONS@@ (SystemDesign, SDLesson)
  src/ai/render.js + lessons.js -> between // @@AILESSONS@@ ... // @@END-AILESSONS@@ (AI & ML pages)
  src/story/*               -> Story.dc.html markup and engine
  src/pages/<name>_body.html + <name>.js -> Revisit, Profile, Welcome
  src/code/code_body.html + code.js       -> Code

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
             ('// @@FIND@@', '// @@END-FIND@@', 'search.js'), ('// @@NAV@@', '// @@END-NAV@@', 'nav.js')]


def ensure_blocks(s):
    prev = '// @@END@@' if '// @@END@@' in s else '// @@END-THEMES@@'
    for start, end, _ in SHARED_JS:
        if start not in s:
            i = s.index(prev) + len(prev)
            s = s[:i] + '\n' + start + '\n' + end + s[i:]
        prev = end
    return s


def sheet_index(sheet):
    """Group -> [[slug, name]] from shared/sheet.js, so pages without the whole sheet can count ticks per group."""
    out, group = {}, None
    for line in sheet.splitlines():
        m = re.match(r'^  "([^"]+)": \[\s*$', line)
        if m:
            group = m.group(1)
            out[group] = []
            continue
        m = re.match(r'^\s*\["([a-z0-9-]+)", \d+, "((?:[^"\\]|\\.)*)"', line)
        if m and group:
            out[group].append([m.group(1), m.group(2)])
    return out


def main():
    themes = read('shared', 'themes_common.js')
    catalog = read('shared', 'catalog.js')
    sheet = read('shared', 'sheet.js')
    sheet_total = len(re.findall(r'^\s*\["[a-z0-9-]+", \d+, ', sheet, re.M))
    sheet_count = ('// @@SHEET-COUNT@@ — generated: how many problems the master sheet holds\n'
                   'const SHEET_TOTAL = %d;\n// @@END-SHEET-COUNT@@' % sheet_total)
    drawer_html = read('shared', 'drawer.html')
    shared_js = {n: read('shared', n) for _, _, n in SHARED_JS if not n.startswith('@')}
    # The search index and the site counts, built by node from the same data the pages use.
    index = subprocess.run(['node', os.path.join(ROOT, 'scripts', 'build_search.js')], cwd=ROOT, check=True,
                           capture_output=True).stdout.decode('utf-8')
    json.loads(index)
    shared_js['@search'] = ('// @@SEARCH@@ — generated by scripts/build_search.js: the site search index and the counts pages show.\n'
                            '// counts: stories, storyPatterns, patterns, catalog, sheet, runnable, git, sd, ai, terms. Items: [type, id, title, sub, keywords].\n'
                            'const SITE_INDEX = ' + index + ';\n// @@END-SEARCH@@')
    built = sorted(f for f in os.listdir(PAGES) if f.endswith('.dc.html'))
    shared_js['data.js'] = shared_js['data.js'].replace('/*@@SHEET-SIZE@@*/216', str(sheet_total))
    shared_js['nav.js'] = shared_js['nav.js'].replace('/*@@PAGES@@*/[]', repr(built).replace("'", '"'))
    drawer_inner = drawer_html.replace('<!-- MENU DRAWER -->', '').replace('<!-- /MENU DRAWER -->', '').strip()
    nav_html = read('shared', 'ui', 'nav.html').replace('DRAWER_HTML', drawer_inner)
    ui_html = {m: read('shared', 'ui', f) for m, f in [('STAT TILES', 'tiles.html'), ('RINGS', 'rings.html'), ('MEDALS', 'medals.html')]}
    intros = read('shared', 'pattern_intros.js').rstrip()
    end = '// @@END-INTROS@@'
    intros = (intros[:-len(end)] + '// SHEET_INDEX: generated by scripts/build_pages.py from shared/sheet.js.\nconst SHEET_INDEX = '
              + json.dumps(sheet_index(sheet), ensure_ascii=False, separators=(',', ':')) + ';\n' + end)
    tests_spec = read('shared', 'tests_spec.js')
    runner = read('shared', 'runner.js')
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
        s = block(s, '// @@RUNNER@@', '// @@END-RUNNER@@', runner)
        s = block(s, '// @@CODE-PANE@@', '// @@END-CODE-PANE@@', pane_js)
        s = block(s, '// @@GITSIM@@', '// @@END-GITSIM@@', git_sim)
        s = block(s, '// @@SDLESSONS@@', '// @@END-SDLESSONS@@', sd_lessons)
        s = block(s, '// @@AILESSONS@@', '// @@END-AILESSONS@@', ai_lessons)
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
        s = block(s, '<!-- PILL NAV -->', '<!-- /PILL NAV -->', nav_html)
        for m, html in ui_html.items():
            s = block(s, "<!-- " + m + " -->", "<!-- /" + m + " -->", html)
        if s != before:
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(s)
            print('updated', f)


if __name__ == '__main__':
    main()
