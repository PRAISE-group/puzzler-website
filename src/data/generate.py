import os
import sys
import json

if __name__ == "__main__":
    puzzleListString = "const puzzleNumberList = [ "
    for x in range(10):
        puzzleListString += f"'Puzzle-{x + 1}',"
    puzzleListString += " ];"

    print(puzzleListString)
