import fs from 'node:fs/promises'


export function isSafe(report: number[], dampener: boolean): boolean {

    if (report.length <= 1) {
        return false;
    }

    let previousDiffSign: number | null = null;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i - 1] - report[i];
        const absDiff = Math.abs(diff);
        const diffSign = Math.sign(diff);

        const unsafe = (absDiff === 0 || absDiff > 3) || (previousDiffSign && previousDiffSign !== diffSign);

        if (unsafe) {
            return dampener
                && (isSafe(report.slice(1), false)
                || isSafe(report.slice(0, i).concat(report.slice(i+1)), false)
                || isSafe(report.slice(0, i-1).concat(report.slice(i)), false))
        }

        previousDiffSign = diffSign;
    }

    return true;
}

export function safeReports(reports: number[][], dampener: boolean): number {
    return reports.reduce((safeCount, report) => {
        return isSafe(report, dampener) ? safeCount + 1 : safeCount;
    }, 0);
}

async function parseInputToReports(): Promise<number[][]> {

    const data = await fs.readFile('src/Day_2/input.txt', { encoding: 'utf-8'});

    return data.split("\n").map(reportStr => {
        return reportStr.split(" ").map(levelStr => Number(levelStr))
    });

}

async function day2(): Promise<{part1: number, part2: number}> {
    const reports = await parseInputToReports();
    const part1 = safeReports(reports, false);
    const part2 = safeReports(reports, true);
    return {part1, part2};
}

if (require.main === module) {
    day2().catch(error => {
        console.error(`Day 2 execution failed with error: ${error}`);
    }).then(value => {
        if (value) {
            console.log(`Solution to day 2 part 1: ${value.part1}`);
            console.log(`Solution to day 2 part 2: ${value.part2}`);
        }
    });
}