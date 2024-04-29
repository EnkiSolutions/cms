import { readdirSync, readFileSync, writeFileSync, } from 'fs';
import { join } from 'path';
function copySubfolder(src: string, dest: string) {
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
copySubfolder(join(__dirname, 'vercel'), '.vercel');