import { NextResponse } from "next/server";

import {
  buildInquiryEmail,
  getMailFrom,
  getMailTo,
  getMailTransporter,
  MAIL_FROM_NAME,
} from "@/lib/email";

const transporter = getMailTransporter();
const toEmail = getMailTo();
const fromEmail = getMailFrom();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = buildInquiryEmail({
      title: "Website inquiry",
      fields: [
        { label: "Name", value: body.name },
        { label: "Email", value: body.email },
        { label: "Phone", value: body.phone },
        { label: "Message", value: body.message },
      ],
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: body.email,
      subject: body.subject || `${MAIL_FROM_NAME} – Website inquiry`,
      text: email.text,
      html: email.html,
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
        message: "Message failed to send.",
      },
      { status: 500 }
    );
  }
}
