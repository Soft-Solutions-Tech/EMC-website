import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import validator from "validator";

// Redis backend for Upstash
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1m"),
  analytics: true,
});

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  const origin = req.headers.get("origin");

  // Allow only your frontend
  if (!origin || !origin.includes(process.env.ALLOWED_ORIGIN)) {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 }
    );
  }

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    if (website) {
      return NextResponse.json(
        { success: false, error: "Bot detected" },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    if (
      !validator.isLength(name, { min: 1, max: 100 }) ||
      !validator.isEmail(email) ||
      !validator.isLength(message, { min: 1, max: 1000 })
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const sanitizedName = validator.escape(name);
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedMessage = validator.escape(message);

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: true },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    const mailOptions = {
      from: `"Info EMC" <${process.env.EMAIL_USER}>`,
      to: "softsolutions.tech.eg@gmail.com",
      replyTo: sanitizedEmail,
      subject: `New message from ${sanitizedName}`,
      html: `
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong><br/>${sanitizedMessage}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, data: info });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
