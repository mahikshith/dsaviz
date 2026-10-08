def merge_yard(lists):
    merged = None
    for train in lists:
        merged = zip_trains(merged, train)  # the two-train merge from the zipper lesson
    return merged
