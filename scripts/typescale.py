"""Site type scale: turn literal CSS font sizes into scale tokens.

`font-size: 13px` in page markup, shared/ and src/ becomes `font-size: var(--fs16)`, using the
reading scale below (old size on the 1440px board -> new size). shared/ui/type.html defines each
token as calc(Npx * var(--ts)), and the runtime sets --ts from the Text size setting and the
screen width, so every page grows together. Run once after merging branches that add new literal
sizes; it is idempotent (tokens are left alone). Story scenes and SVG stages keep their own sizes
(tests/site-test.js checks their rendered minimums instead); stage regions in markup only lift labels to
the 14px stage minimum (see STAGE_RE); sizes under 9px are drawings, not text, so they stay as they are.

    python scripts/typescale.py          # rewrite files in place
    python scripts/typescale.py --check  # exit 1 if any literal reading size is left
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# old px -> new px. Chips and tags land on 13, reading text on 15 and up, body copy on 17-18.
SCALE = {9: 13, 10: 13, 11: 13, 12: 15, 13: 16, 14: 17, 15: 18, 16: 18, 17: 19, 18: 20, 19: 22, 20: 22,
         21: 24, 22: 24, 23: 26, 24: 26, 25: 28, 26: 28}

SKIP = ('src/story/scenes_', 'src/story/comp.js', 'shared/ui/type.html')
LIT = re.compile(r'font-size:(\s?)(\d+(?:\.\d+)?)px')


def files():
    out = []
    for base in ('shared', 'src'):
        for d, _, names in os.walk(os.path.join(ROOT, base)):
            out += [os.path.join(d, n) for n in names if n.endswith(('.html', '.js'))]
    pages = os.path.join(ROOT, 'pages')
    out += [os.path.join(pages, n) for n in os.listdir(pages) if n.endswith('.dc.html')]
    return [f for f in out if not any(os.path.relpath(f, ROOT).replace(os.sep, '/').startswith(s) for s in SKIP)]


def token(px):
    v = float(px)
    if v < 9:
        return None
    n = SCALE.get(int(round(v)), int(round(v)))
    return 'var(--fs%d)' % n


# A stage region (<!-- type-scale: stage --> ... <!-- type-scale: end -->) is a picture laid out to its own sizes:
# only labels under the 14px stage minimum grow to 14, everything else keeps its size (still as a token, so the
# Text size setting reaches it).
STAGE_RE = re.compile(r'(<!-- type-scale: stage.*?<!-- type-scale: end -->)', re.S)


def stage_token(px):
    v = float(px)
    if v < 9:
        return None
    return 'var(--fs%d)' % max(14, int(round(v)))


def convert(text):
    parts = STAGE_RE.split(text)
    out, total = [], 0
    for i, part in enumerate(parts):
        new, n = convert_part(part, stage_token if i % 2 else token)
        out.append(new)
        total += n
    return ''.join(out), total


def convert_part(text, tok):
    count = 0

    def sub(m):
        nonlocal count
        t = tok(m.group(2))
        if not t:
            return m.group(0)
        count += 1
        return 'font-size:' + m.group(1) + t
    return LIT.sub(sub, text), count


def main():
    check = '--check' in sys.argv
    left = 0
    for f in files():
        with open(f, encoding='utf-8') as fh:
            s = fh.read()
        new, n = convert(s)
        if not n:
            continue
        left += n
        if check:
            print('%s: %d literal font sizes' % (os.path.relpath(f, ROOT), n))
        else:
            with open(f, 'w', encoding='utf-8', newline='') as fh:
                fh.write(new)
    if check:
        sys.exit(1 if left else 0)
    print('type scale: %d sizes converted' % left)


if __name__ == '__main__':
    main()
