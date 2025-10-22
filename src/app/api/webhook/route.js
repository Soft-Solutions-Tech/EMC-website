import crypto from "crypto";
import { exec } from "child_process";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sigHeader = req.headers["x-hub-signature-256"];
  const payload = JSON.stringify(req.body);
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!sigHeader || !secret) {
    return res.status(401).json({ error: "Missing signature or secret" });
  }

  // Verify signature
  const hmac = crypto.createHmac("sha256", secret);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;
  if (crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(sigHeader))) {
    // Check if push to main
    if (req.body.ref === "refs/heads/main") {
      // Run update async (don't block response)
      exec("/var/www/nextjs/update.sh", (error, stdout, stderr) => {
        if (error) {
          console.error(`Update error: ${error.message}`);
          return;
        }
        console.log(`Update stdout: ${stdout}`);
        console.error(`Update stderr: ${stderr}`);
      });

      return res.status(200).json({ message: "Update triggered" });
    } else {
      return res.status(200).json({ message: "Ignored: Not main branch" });
    }
  } else {
    return res.status(401).json({ error: "Invalid signature" });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
