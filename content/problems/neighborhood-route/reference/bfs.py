from collections import deque

def fewest_streets(streets, start, goal):  # @anchor signature
    if start == goal:
        return 0, [start]  # @anchor return-same
    neighbours = {}
    for a, b in streets:
        neighbours.setdefault(a, []).append(b)
        neighbours.setdefault(b, []).append(a)
    distance = {start: 0}  # @anchor initialize
    parent = {start: None}  # @anchor initialize
    queue = deque([start])  # @anchor initialize
    while queue:
        corner = queue.popleft()  # @anchor dequeue
        for nxt in neighbours[corner]:
            if nxt in distance:
                continue  # @anchor skip-seen
            distance[nxt] = distance[corner] + 1  # @anchor discover, reach-goal
            parent[nxt] = corner  # @anchor discover, reach-goal
            if nxt == goal:  # @anchor reach-goal
                route = [goal]  # @anchor return-found
                while parent[route[-1]] is not None:  # @anchor return-found
                    route.append(parent[route[-1]])  # @anchor return-found
                return distance[goal], route[::-1]  # @anchor return-found
            queue.append(nxt)  # @anchor discover
    return None  # @anchor return-none
