import { doMul, mul } from "."

test('Part 1 should work for sample test case', () => {
    expect(mul("xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))")).toBe(161)
});

test('Part 2 should work for sample test case', () => {
    expect(doMul("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")).toBe(48)
});