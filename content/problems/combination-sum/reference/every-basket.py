def exact_baskets(candidates, target):
    found = set()
    def grow(basket, total):
        if total == target:
            found.add(tuple(sorted(basket)))
        if total >= target:
            return
        for item in candidates:
            grow(basket + [item], total + item)
    grow([], 0)
    return [list(b) for b in found]
