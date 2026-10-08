def tidy_shelf(nums):
    books = [x for x in nums if x != 0]
    return books + [0] * (len(nums) - len(books))
