import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import validator from "validator";

// Allowed origins check
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

export async function POST(req) {
  const origin = req.headers.get("origin");

  // Check if origin is allowed
  if (allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot field
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
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Try to send as the user directly
    let mailOptions = {
      from: `"${sanitizedName}" <${sanitizedEmail}>`,
      to: process.env.EMAIL_TO,
      subject: `New message from ${sanitizedName}`,
      html: `
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong><br/>${sanitizedMessage}</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, data: info });
    } catch (err) {
      console.warn("Direct from user failed, retrying with fallback:", err);

      // Fallback: send from your server mailbox
      mailOptions = {
        from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`,
        replyTo: sanitizedEmail,
        to: process.env.EMAIL_TO,
        subject: `New message from ${sanitizedName}`,
        html: `
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Message:</strong><br/>${sanitizedMessage}</p>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      return NextResponse.json({
        success: true,
        data: info,
        warning: "Direct from user failed, fallback used",
      });
    }
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
