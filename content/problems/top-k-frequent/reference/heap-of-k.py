import heapq

def most_requested(nums, k):
    count = {}
    for x in nums:
        count[x] = count.get(x, 0) + 1
    room = []
    for song, c in count.items():
        heapq.heappush(room, (c, song))
        if len(room) > k:
            heapq.heappop(room)
    return [song for _, song in room]
