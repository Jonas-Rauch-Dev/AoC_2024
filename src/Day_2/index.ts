import fs from 'node:fs/promises'


export function isSafe(report: number[]): boolean {

    if (report.length <= 1) {
        return false;
    }

    let previousDiffSign: number | null = null;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i - 1] - report[i];
        const absDiff = Math.abs(diff);
        const diffSign = Math.sign(diff);

        if (absDiff === 0 || absDiff > 3) {
            return false;
        }

        if (previousDiffSign && previousDiffSign !== diffSign) {
            return false;
        }

        previousDiffSign = diffSign;
    }

    return true;
}

export function safeReports(reports: number[][]): number {
    return reports.reduce((safeCount, report) => {
        return isSafe(report) ? safeCount + 1 : safeCount;
    }, 0);
}

async function parseInputToReports(): Promise<number[][]> {

    const data = await fs.readFile('src/Day_2/input.txt', { encoding: 'utf-8'});

    return data.split("\n").map(reportStr => {
        return reportStr.split(" ").map(levelStr => Number(levelStr))
    });

}

async function day2Part1(): Promise<number> {
    const reports = await parseInputToReports();
    return safeReports(reports);
}

if (require.main === module) {
    day2Part1().catch(error => {
        console.error(`Day 2 execution failed with error: ${error}`);
    }).then(value => {
        console.log(`Solution to day 2 part 1: ${value}`);
    });
}