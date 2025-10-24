import { exec } from "child_process";
import { promisify } from "util";
import crypto from "crypto";

const execPromise = promisify(exec);

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256");
  const event = req.headers.get("x-github-event");

  if (!signature) {
    return new Response(JSON.stringify({ error: "No signature" }), {
      status: 401,
    });
  }

  const hmac = crypto.createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(rawBody).digest("hex")}`;

  if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 401,
    });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
    });
  }

  if (event === "push" && payload.ref === "refs/heads/main") {
    try {
      const { stdout, stderr } = await execPromise("/var/www/nextjs/update.sh");
      console.log("Update script output:", stdout, stderr); // Log for debugging
      return new Response(
        JSON.stringify({ message: "Update triggered successfully" }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Update script error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to trigger update" }),
        { status: 500 }
      );
    }
  }

  return new Response(JSON.stringify({ message: "Event ignored" }), {
    status: 200,
  });
}
