import { VercelRequest, VercelResponse } from "@vercel/node";
const serialize = (name: string, val: string, maxAge: number) =>
    name + '=' + encodeURIComponent(val)
    + '; Max-Age=' + Math.floor(maxAge)
    + '; Path=/; HttpOnly; Secure; SameSite=None';
export default async (request: VercelRequest, response: VercelResponse) => {
    const body = JSON.stringify(Object.assign(
        {
            client_id: process.env.VITE_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
        },
        (request.body as string).startsWith("ghr")
            ?
            {
                grant_type: "refresh_token",
                refresh_token: request.body
            }
            :
            {
                code: request.body
            }
    ));
    const req = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body,
    });
    const json = await req.json()
    const { access_token, refresh_token } = json;
    response
        .setHeader('Set-Cookie', [
            serialize(
                'github_token',
                access_token,
                28800
            ),
            serialize(
                'github_refresh_token',
                refresh_token,
                15811200
            ),
        ])
        .send({
            access_token,
            refresh_token
        });
}