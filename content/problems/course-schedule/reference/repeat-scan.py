def can_finish(num_courses, prerequisites):
    done = set()
    progress = True
    while progress:
        progress = False
        for course in range(num_courses):
            if course not in done and all(b in done for a, b in prerequisites if a == course):
                done.add(course)
                progress = True
    return len(done) == num_courses
