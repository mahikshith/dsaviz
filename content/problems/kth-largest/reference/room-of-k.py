import heapq

def kth_best(nums, k):
    room = []
    for score in nums:
        heapq.heappush(room, score)
        if len(room) > k:
            heapq.heappop(room)
    return room[0]
