import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface QuotePayload {
  name: string;
  email: string;
  phone?: string;
  industry?: string;
  website?: string;
  budget: string;
  projectType: string;
  message: string;
}

function missingEnv(vars: string[]) {
  return vars.filter((key) => !process.env[key]);
}

export async function POST(req: Request) {
  const body = (await req.json()) as QuotePayload;
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO"];
  const missing = missingEnv(required);
  if (missing.length) {
    return NextResponse.json({ error: `Missing env vars: ${missing.join(", ")}` }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const text = [
    "New website reservation request",
    "",
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone || "-"}`,
    `Business industry: ${body.industry || "-"}`,
    `Current website: ${body.website || "-"}`,
    `Budget: ${body.budget || "-"}`,
    `Project type: ${body.projectType || "-"}`,
    "",
    "Project info:",
    body.message
  ].join("\n");

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      replyTo: body.email,
      subject: "New website reservation request",
      text
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to send" }, { status: 500 });
  }
}
