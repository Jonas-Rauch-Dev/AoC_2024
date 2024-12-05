export class MinHeap {
    public heap: Array<number> = new Array<number>();

    constructor() {}

    public getMin = () => {
        return this.heap[0];
    };

    public length = () => {
        return this.heap.length;
    };

    public insert = (x: number) => {
        this.heap.push(x);
        if (this.heap.length > 1) {
            let currentIndex = this.heap.length - 1;

            while (currentIndex > 0 && this.heap[Math.floor((currentIndex - 1) / 2)] > this.heap[currentIndex]) {
                this.swapIndex(Math.floor((currentIndex - 1) / 2), currentIndex);
                currentIndex = Math.floor((currentIndex - 1) / 2);
            }
        }
    };

    public remove = (): void => {
        if (this.heap.length === 0) {
            return; // Heap is empty, nothing to remove
        }

        if (this.heap.length === 1) {
            this.heap.pop(); // Only one element, just remove it
            return;
        }

        // Replace the root with the last element
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop(); // Remove the last element

        // Restore the min-heap property by "heapifying down"
        let parent = 0;

        while (true) {
            let leftChildIndex = 2 * parent + 1;
            let rightChildIndex = 2 * parent + 2;
            let smallest = parent;

            // Check left child
            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
                smallest = leftChildIndex;
            }

            // Check right child
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
                smallest = rightChildIndex;
            }

            // If the smallest element is still the parent, the heap property is satisfied
            if (smallest === parent) {
                break;
            }

            // Swap and continue heapifying down
            this.swapIndex(parent, smallest);
            parent = smallest;
        }
    };

    private swapIndex = (a: number, b: number) => {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    };

    public popMin = () => {
        const min = this.getMin();
        this.remove();
        return min;
    };
}
