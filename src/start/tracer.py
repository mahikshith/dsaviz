# The "Watch it run" tracer for the Start here track.
# ds_trace(src, stdin) runs a small program line by line and records, before each line runs:
#   l   the line about to run (None on the last step, when the program has finished)
#   e   the event: 'line', 'call' (a function was just entered), 'return' (a function is handing back a value),
#       'error' (the program stopped with an error) or 'end'
#   s   the call stack, bottom first: [name, line, [[variable, shown value, type name], ...]]
#   o   everything printed so far
#   r   on 'return': the value handed back; on 'error': the error message
# The same file runs at build time (scripts/build_pages.py writes src/start/traces.js) and in the browser,
# where Pyodide traces the learner's own code. Keep it plain Python 3.8+, no imports beyond sys and json.
import sys
import json

DS_MAX_STEPS = 400


def ds_show(v):
    t = type(v).__name__
    if callable(v) and t in ('function', 'builtin_function_or_method'):
        return 'function ' + getattr(v, '__name__', '?'), 'function'
    if isinstance(v, type):
        return 'class ' + v.__name__, 'class'
    if t in ('int', 'float', 'bool', 'NoneType', 'str', 'list', 'dict', 'set', 'tuple', 'frozenset', 'range'):
        s = repr(v)
    elif type(v).__repr__ is object.__repr__:
        s = t + ' object'
        fields = getattr(v, '__dict__', None)
        if isinstance(fields, dict) and fields:
            s = t + '(' + ', '.join(k + '=' + repr(fields[k]) for k in list(fields)[:3]) + ')'
    else:
        s = repr(v)
    if len(s) > 48:
        s = s[:45] + '...'
    return s, t


def ds_trace(src, stdin=None):
    out = []
    steps = []
    feed = list(stdin or [])

    class Out:
        def write(self, s):
            out.append(str(s))
            return len(s)

        def flush(self):
            pass

    def fake_input(prompt=''):
        if not feed:
            raise EOFError('the program asked for more input than it was given')
        v = str(feed.pop(0))
        out.append(str(prompt) + v + '\n')
        return v

    try:
        code = compile(src, '<prog>', 'exec')
    except SyntaxError as err:
        return {'steps': [{'l': err.lineno, 'e': 'error', 's': [], 'o': '', 'r': 'SyntaxError: ' + str(err.msg)}], 'cut': False}

    g = {'__name__': '__main__', 'input': fake_input}
    skip = set(g)

    def stack(frame):
        frames = []
        f = frame
        while f is not None:
            if f.f_code.co_filename == '<prog>':
                frames.append(f)
            f = f.f_back
        frames.reverse()
        res = []
        for f in frames:
            top = f.f_code.co_name == '<module>'
            items = []
            for k, v in list(f.f_locals.items()):
                if k.startswith('__') or (top and k in skip) or type(v).__name__ == 'module':
                    continue
                shown, tn = ds_show(v)
                items.append([k, shown, tn])
            res.append(['main program' if top else f.f_code.co_name + '()', f.f_lineno, items])
        return res

    class Stop(Exception):
        pass

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != '<prog>':
            return None
        if event in ('line', 'call', 'return'):
            if len(steps) >= DS_MAX_STEPS:
                raise Stop()
            if event == 'call' and frame.f_code.co_name == '<module>':
                return tracer
            step = {'l': frame.f_lineno, 'e': event, 's': stack(frame), 'o': ''.join(out)}
            if event == 'return':
                if frame.f_code.co_name == '<module>':
                    return tracer
                step['r'] = ds_show(arg)[0]
            steps.append(step)
        return tracer

    old_out = sys.stdout
    sys.stdout = Out()
    cut = False
    err = None
    try:
        sys.settrace(tracer)
        exec(code, g)
    except Stop:
        cut = True
    except BaseException as e:
        err = e
    finally:
        sys.settrace(None)
        sys.stdout = old_out
    if err is not None:
        tb = err.__traceback__
        line = None
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == '<prog>':
                line = tb.tb_lineno
            tb = tb.tb_next
        steps.append({'l': line, 'e': 'error', 's': steps[-1]['s'] if steps else [], 'o': ''.join(out), 'r': type(err).__name__ + ': ' + str(err)})
    elif not cut:
        last = steps[-1]['s'][:1] if steps else []
        if last:
            # the main program's variables as they stand at the end
            last = [[last[0][0], None, [[k, ds_show(v)[0], ds_show(v)[1]] for k, v in g.items() if not k.startswith('__') and k not in skip and type(v).__name__ != 'module']]]
        steps.append({'l': None, 'e': 'end', 's': last, 'o': ''.join(out)})
    return {'steps': steps, 'cut': cut}


if __name__ == '__main__':
    req = json.loads(sys.stdin.read())
    print(json.dumps([ds_trace(r['code'], r.get('stdin')) for r in req]))
