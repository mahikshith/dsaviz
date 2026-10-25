# The "Watch it run" tracer for the Start here track.
# ds_trace(src, stdin) runs a small program line by line and records, before each line runs:
#   l   the line about to run (None on the last step, when the program has finished)
#   e   the event: 'line', 'call' (a function was just entered), 'return' (a function is handing back a value),
#       'error' (the program stopped with an error) or 'end'
#   s   the call stack, bottom first: [name, line, [[variable, shown value, type name], ...]]
#   o   everything printed so far
#   r   on 'return': the value handed back; on 'error': the error message
#   h   (heap mode only) the objects the names point at: { 'o1': [label, kind, fields, class id, base ids, methods] }
#       kind is list, tuple, dict, set, object, class or function; fields are [[name, shown value, type, object id]]
#       (the id is '' for a plain value). In heap mode a variable that points at an object gets that id as a 4th item.
# The same file runs at build time (scripts/build_pages.py writes src/start/traces.js) and in the browser,
# where Pyodide traces the learner's own code. Keep it plain Python 3.8+, no imports beyond sys and json.
import sys
import json

DS_MAX_STEPS = 400


def ds_repr(v, depth=0):
    # repr() with no memory addresses, so a trace is the same on every run: objects show their class and fields.
    t = type(v).__name__
    if depth > 2:
        return '...'
    if isinstance(v, list):
        return '[' + ', '.join(ds_repr(x, depth + 1) for x in v[:12]) + (', ...' if len(v) > 12 else '') + ']'
    if isinstance(v, tuple):
        return '(' + ', '.join(ds_repr(x, depth + 1) for x in v[:12]) + (',' if len(v) == 1 else '') + ')'
    if isinstance(v, dict):
        return '{' + ', '.join(ds_repr(k, depth + 1) + ': ' + ds_repr(x, depth + 1) for k, x in list(v.items())[:12]) + '}'
    if isinstance(v, (set, frozenset)):
        return ('{' + ', '.join(sorted(ds_repr(x, depth + 1) for x in v)) + '}') if v else t + '()'
    if callable(v) and t in ('function', 'builtin_function_or_method', 'method'):
        return 'function ' + getattr(v, '__name__', '?')
    if isinstance(v, type):
        return 'class ' + v.__name__
    if t in ('int', 'float', 'bool', 'NoneType', 'str', 'range', 'complex'):
        return repr(v)
    if type(v).__repr__ is object.__repr__:
        fields = getattr(v, '__dict__', None)
        if isinstance(fields, dict) and fields:
            return t + '(' + ', '.join(k + '=' + ds_repr(fields[k], depth + 1) for k in list(fields)[:3]) + ')'
        return t + ' object'
    try:
        return repr(v)
    except Exception:
        return t + ' object'


def ds_show(v):
    t = type(v).__name__
    if callable(v) and t in ('function', 'builtin_function_or_method'):
        return 'function ' + getattr(v, '__name__', '?'), 'function'
    if isinstance(v, type):
        return 'class ' + v.__name__, 'class'
    s = ds_repr(v)
    if len(s) > 48:
        s = s[:45] + '...'
    return s, t


DS_PLAIN = (int, float, bool, str, type(None), complex, range)
DS_MAX_OBJECTS = 24
DS_MAX_FIELDS = 8


def ds_user_class(v):
    return isinstance(v, type) and getattr(v, '__module__', '') == '__main__'


def ds_user_function(v):
    code = getattr(v, '__code__', None)
    return code is not None and code.co_filename == '<prog>' and type(v).__name__ == 'function'


def ds_is_object(v):
    if isinstance(v, DS_PLAIN):
        return False
    if isinstance(v, (list, tuple, dict, set, frozenset)):
        return True
    if isinstance(v, type):
        return ds_user_class(v)
    if ds_user_function(v):
        return True
    return ds_user_class(type(v))


class DsHeap:
    # Gives every object a short, stable id (o1, o2...) in the order it is first seen, and describes it.
    def __init__(self):
        self.ids = {}
        self.keep = []

    def ref(self, v):
        k = id(v)
        if k not in self.ids:
            self.ids[k] = 'o' + str(len(self.ids) + 1)
            self.keep.append(v)
        return self.ids[k]

    def field(self, name, v, todo):
        shown, tn = ds_show(v)
        if ds_is_object(v):
            todo.append(v)
            return [name, shown, tn, self.ref(v)]
        return [name, shown, tn, '']

    def describe(self, roots):
        todo = list(roots)
        out = {}
        while todo and len(out) < DS_MAX_OBJECTS:
            v = todo.pop(0)
            oid = self.ref(v)
            if oid in out:
                continue
            fields, cls, bases, methods = [], '', [], []
            if isinstance(v, (list, tuple)):
                kind = label = type(v).__name__
                fields = [self.field(str(i), x, todo) for i, x in enumerate(list(v)[:DS_MAX_FIELDS])]
            elif isinstance(v, dict):
                kind = label = 'dict'
                fields = [self.field(repr(k), x, todo) for k, x in list(v.items())[:DS_MAX_FIELDS]]
            elif isinstance(v, (set, frozenset)):
                kind = label = 'set'
                fields = [self.field('', x, todo) for x in sorted(v, key=repr)[:DS_MAX_FIELDS]]
            elif isinstance(v, type):
                kind, label = 'class', v.__name__
                for k, x in v.__dict__.items():
                    if k.startswith('__') or k.startswith('_abc'):
                        continue
                    if isinstance(x, (staticmethod, classmethod)):
                        x = x.__func__
                    if isinstance(x, property) or ds_user_function(x):
                        methods.append(k)
                    else:
                        fields.append(self.field(k, x, todo))
                for b in v.__bases__:
                    if ds_user_class(b):
                        todo.append(b)
                        bases.append(self.ref(b))
            elif ds_user_function(v):
                kind, label = 'function', v.__name__
                cells = v.__closure__ or ()
                for name, cell in zip(v.__code__.co_freevars, cells):
                    try:
                        fields.append(self.field(name, cell.cell_contents, todo))
                    except ValueError:
                        pass
            else:
                kind, label = 'object', type(v).__name__
                todo.append(type(v))
                cls = self.ref(type(v))
                for k, x in list(getattr(v, '__dict__', {}).items())[:DS_MAX_FIELDS]:
                    fields.append(self.field(k, x, todo))
            out[oid] = [label, kind, fields[:DS_MAX_FIELDS], cls, bases, methods]
        return out


def ds_frame_name(f):
    # Methods show their class: Robot.charge(). The class is the one whose body defined this code.
    name = f.f_code.co_name
    me = f.f_locals.get('self', None)
    if me is not None:
        for k in type(me).__mro__:
            fn = k.__dict__.get(name, None)
            if isinstance(fn, property):
                fn = fn.fget if getattr(fn.fget, '__code__', None) is f.f_code else fn.fset
            if getattr(fn, '__code__', None) is f.f_code:
                return k.__name__ + '.' + name + '()'
    return name + '()'


def ds_trace(src, stdin=None, heap=False):
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

    H = DsHeap() if heap else None

    def stack(frame, roots):
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
                if H is not None and ds_is_object(v):
                    items.append([k, shown, tn, H.ref(v)])
                    roots.append(v)
                else:
                    items.append([k, shown, tn])
            res.append(['main program' if top else ds_frame_name(f), f.f_lineno, items])
        return res

    def snap(frame, extra=None):
        roots = []
        st = stack(frame, roots)
        if H is None:
            return st, None
        if extra is not None and ds_is_object(extra):
            roots.append(extra)
        return st, H.describe(roots)

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
            # A class body runs like a little function. It is not a call the learner made, so it is not traced.
            if frame.f_code.co_name != '<module>' and not (frame.f_code.co_flags & 1):
                return None
            if event == 'return' and frame.f_code.co_name == '<module>':
                return tracer
            st, hp = snap(frame, arg if event == 'return' else None)
            step = {'l': frame.f_lineno, 'e': event, 's': st, 'o': ''.join(out)}
            if hp is not None:
                step['h'] = hp
            if event == 'return':
                step['r'] = ds_show(arg)[0]
                if H is not None and ds_is_object(arg):
                    step['rr'] = H.ref(arg)
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
        step = {'l': line, 'e': 'error', 's': steps[-1]['s'] if steps else [], 'o': ''.join(out), 'r': type(err).__name__ + ': ' + str(err)}
        if H is not None and steps and 'h' in steps[-1]:
            step['h'] = steps[-1]['h']
        steps.append(step)
    elif not cut:
        last = steps[-1]['s'][:1] if steps else []
        if last:
            # the main program's variables as they stand at the end
            items, roots = [], []
            for k, v in g.items():
                if k.startswith('__') or k in skip or type(v).__name__ == 'module':
                    continue
                shown, tn = ds_show(v)
                if H is not None and ds_is_object(v):
                    items.append([k, shown, tn, H.ref(v)])
                    roots.append(v)
                else:
                    items.append([k, shown, tn])
            last = [[last[0][0], None, items]]
        step = {'l': None, 'e': 'end', 's': last, 'o': ''.join(out)}
        if H is not None:
            step['h'] = H.describe(roots) if last else {}
        steps.append(step)
    return {'steps': steps, 'cut': cut}


if __name__ == '__main__':
    req = json.loads(sys.stdin.read())
    print(json.dumps([ds_trace(r['code'], r.get('stdin'), r.get('heap', False)) for r in req]))
