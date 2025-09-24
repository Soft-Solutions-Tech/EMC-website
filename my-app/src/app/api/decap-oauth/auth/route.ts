import { NextRequest, NextResponse } from "next/server";

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const clientId = getEnv("GITHUB_CLIENT_ID");
  // Minimal scope: use 'public_repo' for public repositories
  const scope = url.searchParams.get("scope") || "public_repo";
  const state = crypto.randomUUID();
  const debug = url.searchParams.get("debug") === "1";
  const redirectUri = `${url.origin}/api/decap-oauth/callback${debug ? "?debug=1" : ""}`;

  // Persist state in a cookie to validate on callback
  const res = NextResponse.redirect(
    `${GITHUB_AUTHORIZE_URL}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`
  );
  res.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });
  return res;
}
