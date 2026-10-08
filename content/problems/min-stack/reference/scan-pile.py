class PlatePile:
    def __init__(self):
        self.plates = []

    def push(self, value):
        self.plates.append(value)

    def pop(self):
        self.plates.pop()

    def top(self):
        return self.plates[-1]

    def get_min(self):
        return min(self.plates)
