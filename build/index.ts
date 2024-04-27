import { writeFileSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
function copySubfolder(sourceDir: string) {
    const entries = readdirSync(sourceDir, { withFileTypes: true });
    for (const entry of entries) {
        const sourcePath = join(sourceDir, entry.name);

        if (entry.isDirectory()) {
            copySubfolder(sourcePath);
        } else {
            const content = readFileSync(sourcePath);
            writeFileSync(sourcePath, content);
        }
    }
}
copySubfolder('.vercel');