import { NextRequest, NextResponse } from "next/server";

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = req.cookies.get("decap_oauth_state")?.value;

  if (!code) {
    return new NextResponse("Missing code", { status: 400 });
  }
  if (!state || !cookieState || state !== cookieState) {
    return new NextResponse("Invalid state", { status: 400 });
  }

  const clientId = getEnv("GITHUB_CLIENT_ID");
  const clientSecret = getEnv("GITHUB_CLIENT_SECRET");
  const redirectUri = `${url.origin}/api/decap-oauth/callback`;

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    const txt = await tokenRes.text();
    return new NextResponse(`Token exchange failed: ${txt}`, { status: 500 });
  }

  const tokenJson = (await tokenRes.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
    scope?: string;
    token_type?: string;
  };

  if (!tokenJson.access_token) {
    return new NextResponse(
      `No access_token in response: ${JSON.stringify(tokenJson)}`,
      { status: 500 }
    );
  }

  const token = tokenJson.access_token;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Authentication Successful</title>
  </head>
  <body>
    <script>
      (function() {
        function send(msg) {
          if (window.opener) {
            // Use '*' to maximize compatibility with Decap CMS postMessage handling
            window.opener.postMessage(msg, '*');
          }
        }
        // Minimal payload expected by Decap CMS GitHub backend
        send({ token: '${token}' });
        window.close();
      })();
    </script>
    <p>Authentication complete. You can close this window.</p>
  </body>
</html>`;

  const res = new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
  // Clear the state cookie
  res.cookies.set("decap_oauth_state", "", { maxAge: 0, path: "/" });
  return res;
}
