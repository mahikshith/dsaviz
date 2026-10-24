"""Bundle every page in pages/ into one self-contained website: dist/index.html.

The output has no eval and no external scripts (React is inlined from node_modules),
so it opens by double-clicking the file and also works inside strict sandboxes.
The CodeMirror editor is bundled by scripts/build_editor.js (esbuild) and inlined inside a
function, window.DS_EDITOR_LOAD, so the browser only pre-parses it; it runs when the Code page opens.

Run from the repo root after `npm install`:  python3 scripts/build_site.py
"""
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORDER = ['Main', 'Auth', 'Welcome', 'About', 'Home', 'Revisit', 'Profile', 'Leaderboard',
         'Patterns', 'Sheet', 'Interview', 'Briefing', 'Story', 'Code', 'Glossary', 'Basics', 'Git', 'SystemDesign', 'SDLesson']


def read(*parts):
    with open(os.path.join(ROOT, *parts), encoding='utf-8') as f:
        return f.read()


def esc(s):
    return s.replace('</script', '<\\/script').replace('</SCRIPT', '<\\/SCRIPT')


def js(x):
    return json.dumps(x, ensure_ascii=False).replace('</', '<\\/')


def main():
    boards = []
    for n in ORDER:
        s = read('pages', n + '.dc.html')
        inner = s[s.index('<x-dc>') + len('<x-dc>'):s.index('</x-dc>')]
        h = re.search(r'<helmet>([\s\S]*?)</helmet>', inner)
        helmet = h.group(1) if h else ''
        template = inner[:h.start()] + inner[h.end():] if h else inner
        m = re.search(r'<script type="text/x-dc"[^>]*data-props=\'([^\']*)\'[^>]*>([\s\S]*?)</script>', s)
        props, code = json.loads(m.group(1)), m.group(2)
        defaults = {k: v.get('default') for k, v in props.items() if not k.startswith('$') and isinstance(v, dict)}
        boards.append('window.DS_BOARDS[%s] = { template: %s, helmet: %s, defaults: %s, factory: function (DCLogic, StreamableLogic, React) {\n%s\nreturn Component; } };'
                      % (js(n + '.dc.html'), js(template), js(helmet), js(defaults), esc(code)))
    react = read('node_modules', 'react', 'umd', 'react.production.min.js')
    react_dom = read('node_modules', 'react-dom', 'umd', 'react-dom.production.min.js')
    runtime = read('scripts', 'site-runtime.js')
    subprocess.run(['node', os.path.join(ROOT, 'scripts', 'build_editor.js')], cwd=ROOT, check=True)
    editor = read('build', 'editor.iife.js')
    out = '<!doctype html>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>dsaviz</title>\n'
    out += '<style>html,body{margin:0;overflow-x:hidden;background:#0A0A0B}</style>\n<div id="app"></div>\n'
    out += '<script>' + esc(react) + '</script>\n<script>' + esc(react_dom) + '</script>\n'
    out += '<script>\nwindow.DS_BOARDS = {};\n' + '\n'.join(boards) + '\n</script>\n'
    out += '<script>\nwindow.DS_EDITOR_LOAD = function () {\n' + esc(editor) + '\nreturn DSEditor;\n};\n</script>\n'
    out += '<script>' + esc(runtime) + '</script>\n'
    os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
    with open(os.path.join(ROOT, 'dist', 'index.html'), 'w', encoding='utf-8') as f:
        f.write(out)
    print('dist/index.html', round(len(out) / 1024), 'KB')


if __name__ == '__main__':
    main()
