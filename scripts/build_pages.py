"""Sync shared code into every page in pages/.

Each page (pages/*.dc.html) is a self-contained design board. Some blocks are shared
across pages and live in one place; this script copies them back into every page:

  shared/themes_common.js   -> between // @@THEMES@@ ... // @@END-THEMES@@
  shared/catalog.js         -> between // @@CATALOG@@ ... // @@END@@
  shared/sheet.js           -> between // @@SHEET@@ ... // @@END-SHEET@@ (Sheet page)
  shared/drawer.js          -> between // @@DRAWER@@ ... // @@END-DRAWER@@
  shared/drawer.html        -> between <!-- MENU DRAWER --> ... <!-- /MENU DRAWER -->
  shared/tests_spec.js      -> between // @@TESTS-SPEC@@ ... // @@END-TESTS-SPEC@@
  shared/runner.js          -> between // @@RUNNER@@ ... // @@END-RUNNER@@
  shared/code_pane.js       -> between // @@CODE-PANE@@ ... // @@END-CODE-PANE@@
  shared/code_pane.html     -> between <!-- CODE PANE --> ... <!-- /CODE PANE --> (after page bodies)
  src/story/*               -> Story.dc.html markup and engine
  src/pages/<name>_body.html + <name>.js -> Revisit, Profile, Welcome
  src/code/code_body.html + code.js       -> Code

Run from the repo root:  python3 scripts/build_pages.py
"""
import os

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


def main():
    themes = read('shared', 'themes_common.js')
    catalog = read('shared', 'catalog.js')
    sheet = read('shared', 'sheet.js')
    drawer_js = read('shared', 'drawer.js')
    drawer_html = read('shared', 'drawer.html')
    tests_spec = read('shared', 'tests_spec.js')
    runner = read('shared', 'runner.js')
    pane_js = read('shared', 'code_pane.js')
    pane_html = read('shared', 'code_pane.html')
    bodies = {'Story': ('src', 'story', 'story_body.html')}
    scripts = {}
    for name in ['Revisit', 'Profile', 'Welcome']:
        bodies[name] = ('src', 'pages', name.lower() + '_body.html')
        scripts[name] = ('src', 'pages', name.lower() + '.js')
    bodies['Code'] = ('src', 'code', 'code_body.html')
    scripts['Code'] = ('src', 'code', 'code.js')
    # The three original scene files first (scenes_tp.js opens the engine), then any newer scenes_*.js in name order.
    first = ['scenes_tp.js', 'scenes_sw.js', 'scenes_hm.js']
    more = sorted(f for f in os.listdir(os.path.join(ROOT, 'src', 'story')) if f.startswith('scenes_') and f.endswith('.js') and f not in first)
    story_engine = ''.join(read('src', 'story', f) for f in first + more + ['tail.js', 'comp.js'])

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
        s = block(s, '// @@DRAWER@@', '// @@END-DRAWER@@', drawer_js)
        s = block(s, '<!-- MENU DRAWER -->', '<!-- /MENU DRAWER -->', drawer_html)
        s = block(s, '// @@TESTS-SPEC@@', '// @@END-TESTS-SPEC@@', tests_spec)
        s = block(s, '// @@RUNNER@@', '// @@END-RUNNER@@', runner)
        s = block(s, '// @@CODE-PANE@@', '// @@END-CODE-PANE@@', pane_js)
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
        if s != before:
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(s)
            print('updated', f)


if __name__ == '__main__':
    main()
