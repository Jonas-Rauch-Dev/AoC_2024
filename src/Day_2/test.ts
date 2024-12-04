import { safeReports } from "."



test('Part 1 should work for sample input', () => {
    expect(safeReports(
        [
            [7, 6, 4, 2, 1],
            [1, 2, 7, 8, 9],
            [9, 7, 6, 2, 1],
            [1, 3, 2, 4, 5],
            [8, 6, 4, 4, 1],
            [1, 3, 6, 7, 9],
        ], false
    )).toBe(2)
})

test('Part 2 should work for sample input', () => {
    expect(safeReports(
        [
            [7, 6, 4, 2, 1],
            [1, 2, 7, 8, 9],
            [9, 7, 6, 2, 1],
            [1, 3, 2, 4, 5],
            [8, 6, 4, 4, 1],
            [1, 3, 6, 7, 9],
            [3, 1, 2, 3, 4]
        ], true
    )).toBe(5)
})