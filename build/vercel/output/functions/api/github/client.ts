import { VercelRequest, VercelResponse } from "@vercel/node";
function tryDecode(str: string) {
    try {
        return str.indexOf('%') !== -1
            ? decodeURIComponent(str)
            : str
    } catch (e) {
        return str;
    }
}
function parse(str: string): { [k: string]: any } {
    var obj = {};
    var index = 0;
    while (index < str.length) {
        var eqIdx = str.indexOf('=', index);
        // no more cookie pairs
        if (eqIdx === -1) {
            break;
        }
        var endIdx = str.indexOf(';', index)
        if (endIdx === -1) {
            endIdx = str.length;
        } else if (endIdx < eqIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(';', eqIdx - 1) + 1;
            continue;
        }
        var key = str.slice(index, eqIdx).trim();
        // only assign once
        if (undefined === obj[key]) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            // quoted values
            if (val.charCodeAt(0) === 0x22) {
                val = val.slice(1, -1);
            }
            obj[key] = tryDecode(val);
        }
        index = endIdx + 1;
    }
    return obj;
}
export function client(fn: (req: VercelRequest, res: VercelResponse, token: string) => Promise<void>) {
    return async (request: VercelRequest, response: VercelResponse) => {
        if (!request.headers.cookie) {
            response.status(501).end();
            return;
        }
        const cookie = parse(request.headers.cookie)
        let token = cookie.github_token;
        return await fn(
            request,
            response,
            token
        )
    }
}