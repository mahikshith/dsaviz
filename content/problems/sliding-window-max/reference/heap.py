import heapq

def tallest_in_window(nums, k):
    heap, out = [], []
    for i, x in enumerate(nums):
        heapq.heappush(heap, (-x, i))
        while heap[0][1] <= i - k:
            heapq.heappop(heap)
        if i >= k - 1:
            out.append(-heap[0][0])
    return out
