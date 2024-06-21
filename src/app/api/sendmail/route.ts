import { NextResponse } from "next/server";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(req: any) {
    const body = await req.json();

    const message = `
              Name: ${body.name}\r\n
              Email: ${body.email}\r\n
              Phone: ${body.phone}\r\n        
              Message: ${body.message}`;
    const data = {
        to: "crashaw@gmail.com",
        from: "ursusagencija@gmail.com",
        replyTo: body.email,
        subject: "Ursus Travel & Accommodation - Upit s web stranice",
        text: message,
        html: message.replace(/\r\n/g, "<br>"),
    };

    let response;
    try {
        await mail.send(data);
        response = {
            status: "success",
            message: "Your message was sent. I'll be in contact shortly.",
        };
        console.log("Message sent");
    } catch (error) {
        response = {
            status: "error",
            message: `Message failed to send with error, ${error}`,
        };
        console.log("Message failed to send");
    }

    return NextResponse.json(response);
}