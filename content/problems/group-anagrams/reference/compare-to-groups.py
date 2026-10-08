def sort_letters(words):
    groups = []
    for word in words:
        for group in groups:
            if sorted(group[0]) == sorted(word):
                group.append(word)
                break
        else:
            groups.append([word])
    return groups
