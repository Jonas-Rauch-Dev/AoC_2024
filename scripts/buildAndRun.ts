import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2); // Argumente auslesen
const srcDir = path.resolve(__dirname, '../src'); // Basisverzeichnis der Quellcodes

const isDayArg = args.length === 1 && /^Day_\d{1,2}$/.test(args[0]);

if (isDayArg) {
    // Einen spezifischen Tag ausführen
    const day = args[0];
    const filePath = path.join(srcDir, day, 'index.ts');

    if (!fs.existsSync(filePath)) {
        console.error(`Error: File ${filePath} does not exist.`);
        process.exit(1);
    }

    console.log(`Building and running ${filePath}...`);
    execSync(`ts-node ${filePath}`, { stdio: 'inherit' });
} else {
    // Alle `Day_{1..24}/index.ts` Dateien ausführen
    console.log('Building and running all Day_{1..24}/index.ts files...');
    const directories = fs.readdirSync(srcDir).filter((dir) => /^Day_\d{1,2}$/.test(dir));

    directories.forEach((dir) => {
        const filePath = path.join(srcDir, dir, 'index.ts');
        if (fs.existsSync(filePath)) {
            console.log(`Running ${filePath}...`);
            execSync(`ts-node ${filePath}`, { stdio: 'inherit' });
        } else {
            console.warn(`Warning: Skipping ${filePath}, file does not exist.`);
        }
    });
}
