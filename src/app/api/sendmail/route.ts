import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const toEmail = process.env.MAIL_TO;
const fromEmail = process.env.MAIL_USER;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = `
              Name: ${body.name}\r\n
              Email: ${body.email}\r\n
              Phone: ${body.phone}\r\n        
              Message: ${body.message}`;

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: body.email,
      subject:
        body.subject || "Ursus Travel & Accommodation - Upit s web stranice",
      text: message,
      html: message.replace(/\r\n/g, "<br>"),
    });

    return NextResponse.json({
      status: "success",
      message: "Your message was sent. I'll be in contact shortly.",
    });
  } catch (error) {
    console.error("Message failed to send:", error);
    return NextResponse.json(
      {
        status: "error",
        message: `Message failed to send with error, ${error}`,
      },
      { status: 500 }
    );
  }
}
