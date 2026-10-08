def sort_letters(words):
    groups = {}
    for word in words:
        groups.setdefault("".join(sorted(word)), []).append(word)
    return list(groups.values())
