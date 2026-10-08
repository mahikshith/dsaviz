from collections import deque

def can_finish(num_courses, prerequisites):
    unlocks = [[] for _ in range(num_courses)]
    missing = [0] * num_courses
    for course, before in prerequisites:
        unlocks[before].append(course)
        missing[course] += 1
    ready = deque(c for c in range(num_courses) if missing[c] == 0)
    taken = 0
    while ready:
        course = ready.popleft()
        taken += 1
        for nxt in unlocks[course]:
            missing[nxt] -= 1
            if missing[nxt] == 0:
                ready.append(nxt)
    return taken == num_courses
