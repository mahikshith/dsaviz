def most_requested(nums, k):
    count = {}
    for x in nums:
        count[x] = count.get(x, 0) + 1
    shelves = [[] for _ in range(len(nums) + 1)]
    for song, c in count.items():
        shelves[c].append(song)
    top = []
    for c in range(len(nums), 0, -1):
        for song in shelves[c]:
            top.append(song)
            if len(top) == k:
                return top
    return top
