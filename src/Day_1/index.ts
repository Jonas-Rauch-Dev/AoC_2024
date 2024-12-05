import fs from 'node:fs'
import readline from 'node:readline/promises'
import { MinHeap } from './MinHeap';


type ParsedInputPart1 = {left: MinHeap, right: MinHeap};


export function findDistance({left, right}: ParsedInputPart1): number {
    let length = left.length();

    let sum = 0;

    for (let i = 0; i < length; i++) {
        sum += Math.abs(right.popMin() - left.popMin())
    }

    return sum;
}


async function parseInputsPart1(): Promise<ParsedInputPart1> {
    const readStream = fs.createReadStream('src/Day_1/input.txt', { encoding: 'utf-8'});
    const readInterface = readline.createInterface({input: readStream});

    const left = new MinHeap();
    const right = new MinHeap();

    for await (const line of readInterface) {
        const matches = line.match(/[0-9]+/g);
        if (!matches || matches.length != 2) {
            console.warn(`Read invalid line that did not contain a left and right side! line: ${line}`);
            continue;
        } 

        left.insert(Number(matches[0]));
        right.insert(Number(matches[1]));
    }

    return {left, right};
}


type ParsedInputPart2 = {
    left: Map<number, number>,
    right: Map<number, number>
}

export function findSimiliarity({left, right}: ParsedInputPart2): number {


    let similiarityScore = 0;

    for (const [num, leftOccurences] of left) {

        const rightOccurences = right.get(num);

        if (rightOccurences) {
            similiarityScore += rightOccurences * num * leftOccurences;
        }
    }

    return similiarityScore;
}


async function parseInputsPart2(): Promise<ParsedInputPart2> {
    const readStream = fs.createReadStream('src/Day_1/input.txt', { encoding: 'utf-8'});
    const readInterface = readline.createInterface({input: readStream});

    const left = new Map();
    const right = new Map();

    for await (const line of readInterface) {
        const matches = line.match(/[0-9]+/g);
        if (!matches || matches.length != 2) {
            console.warn(`Read invalid line that did not contain a left and right side! line: ${line}`);
            continue;
        } 

        const leftNum = Number(matches[0]);
        const rightNum = Number(matches[1]);

        const leftCount = left.get(leftNum);
        if (!leftCount) {
            left.set(leftNum, 1);
        } else {
            left.set(leftNum, leftCount + 1);
        }

        const rightCount = right.get(rightNum);
        if (!rightCount) {
            right.set(rightNum, 1);
        } else {
            right.set(rightNum, rightCount + 1);
        }
    }

    return {left, right};
}

async function day1(): Promise<{part1: number, part2: number}> {
    const p1 = async () => {
        const heaps = await parseInputsPart1();
        return findDistance(heaps);
    };

    const p2 = async () => {
        const maps = await parseInputsPart2();
        console.log(JSON.stringify(maps.left))
        console.log(JSON.stringify(maps.right))
        return findSimiliarity(maps);
    };

    const results = await Promise.all([p1(), p2()]);

    return {part1: results[0], part2: results[1]};
}

if (require.main === module) {
    day1().catch(err => {
        console.error(`Day 2 execution failed with error: ${err}`);
    }).then((value) => {
            if (value) {
                console.log(`Solution to day 1 part 1: ${value.part1}`);
                console.log(`Solution to day 1 part 2: ${value.part2}`);
            }
    })
}