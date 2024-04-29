import { mkdirSync, readdirSync, readFileSync, writeFileSync, } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
function copySubfolder(src: string, dest: string) {
    mkdirSync(dest);
    const entries = readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const source = join(src, entry.name);
        const destination = join(dest, entry.name);
        if (entry.isDirectory())
            copySubfolder(source, destination);
        else {
            const content = readFileSync(source);
            writeFileSync(destination, content);
        }
    }
}
const _dirname = dirname(fileURLToPath(import.meta.url));
copySubfolder(join(_dirname, 'vercel'), '.vercel');