import fs from 'node:fs/promises'



// Part 1
export function mul(memory: string): number {
    const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
    const matches = memory.match(regex);

    if (matches) {
        return matches?.map(match => {
            return match
                .match(/([0-9]{1,3}),([0-9]{1,3})/)?.[0]
                .split(",")
                .map(numStr => Number(numStr));
        })
        .reduce((sum, numbers) => {
            return sum += numbers ? numbers[0] * numbers[1] : 0
        }, 0)
    } else {
        return 0;
    }
}

// Part 2
export function doMul(memory: string): number {
    const regex = /(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))/g;
    const matches = memory.match(regex);

    if(!matches) {
        return 0;
    }

    return matches.reduce(({active, sum}, cmd: string) => {
        if (cmd === "don't()") {
            active = false;
        } else if (cmd === "do()") {
            active = true;
        } else if (active) {
            const numbers = cmd.match(/([0-9]+)/g);
            if (numbers) {
                sum += Number(numbers[0]) * Number(numbers[1]);
            }
        }

        return {active, sum}
    }, {active: true, sum: 0}).sum
}

async function readInput(): Promise<string> {
    return await fs.readFile('src/Day_3/input.txt', { encoding: 'utf-8'});
}


async function day3(): Promise<{part1: number, part2: number}> {
    const input = await readInput();
    return {
        part1: mul(input),
        part2: doMul(input)
    }
}

if (require.main === module) {
    day3().catch(err => {
        console.error(`Day 3 execution failed with error: ${err}`);
    }).then((value) => {
            if (value) {
                console.log(`Solution to day 3 part 1: ${value.part1}`);
                console.log(`Solution to day 3 part 2: ${value.part2}`);
            }
    })
}