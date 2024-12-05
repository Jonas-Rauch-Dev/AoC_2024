import { findSimiliarity } from ".";
import { MinHeap } from "./MinHeap";

test('Test Min Heap 1', () => {
    const minHeap = new MinHeap();
    [12, 4, 2, 5, 6, 23, 31, 11].forEach(v => minHeap.insert(v));

    expect(minHeap.popMin()).toBe(2);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(5);
    expect(minHeap.popMin()).toBe(6);
    expect(minHeap.popMin()).toBe(11);
    expect(minHeap.popMin()).toBe(12);
    expect(minHeap.popMin()).toBe(23);
    expect(minHeap.popMin()).toBe(31);
})


test('Test Min Heap 2', () => {
    const minHeap = new MinHeap();
    [12, 4].forEach(v => minHeap.insert(v));

    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(12);
})


test('Test Min Heap 3', () => {
    const minHeap = new MinHeap();
    [4, 4, 4, 4, 4, 1, 2, 3, 4, 4, 4, 4, 4, 1, 2, 3].forEach(v => minHeap.insert(v));

    expect(minHeap.popMin()).toBe(1);
    expect(minHeap.popMin()).toBe(1);
    expect(minHeap.popMin()).toBe(2);
    expect(minHeap.popMin()).toBe(2);
    expect(minHeap.popMin()).toBe(3);
    expect(minHeap.popMin()).toBe(3);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
    expect(minHeap.popMin()).toBe(4);
})


test('Test Day_1 Part 1', () => {
    const input = {
        left: new Map([[3, 3], [1, 1], [2, 1], [4, 1]]),
        right: new Map([[3, 3], [4, 1], [5, 1], [9, 1]]),
    };

    expect(findSimiliarity(input)).toBe(31);
})