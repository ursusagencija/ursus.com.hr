"use server";

import mail from "@sendgrid/mail";
import { format } from "date-fns";

mail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function submitBooking(
  dateRange: [Date | null, Date | null],
  people: string,
  url: string,
  price: string,
  formData: FormData
) {
  const message = `
              Name: ${formData.get("name")}\r\n
              Email: ${formData.get("email")}\r\n
              Phone: ${formData.get("phone")}\r\n        
              Message: ${formData.get("message")}\r\n
              Date: ${format(dateRange[0]!, "do MMM yyyy")} - ${format(dateRange[1]!, "do MMM yyyy")}\r\n
              People: ${people}\r\n
              Accommodation: https://ursus.com.hr${url}\r\n
              Price: ${price}`;

  const data = {
    to: "skruzic@gmail.com",
    from: "ursusagencija@gmail.com",
    replyTo: formData.get("email") as string,
    subject: "Ursus Travel & Accommodation - Upit s web stranice",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  try {
    await mail.send(data);
    // response = {
    //   status: "success",
    //   message: "Your message was sent. I'll be in contact shortly.",
    // };
    console.log("Message sent");
  } catch (error) {
    // response = {
    //   status: "error",
    //   message: `Message failed to send with error, ${error}`,
    // };
    console.log("Message failed to send");
  }
}

export async function submitTourBooking(
  date: Date | null,
  people: string,
  url: string,
  price: string,
  formData: FormData
) {
  const message = `
              Name: ${formData.get("name")}\r\n
              Email: ${formData.get("email")}\r\n
              Phone: ${formData.get("phone")}\r\n        
              Message: ${formData.get("message")}\r\n
              Date: ${format(date!, "do MMM yyyy")}\r\n
              People: ${people}\r\n
              Tour: https://ursus.com.hr${url}\r\n
              Price: ${price}`;

  const data = {
    to: "skruzic@gmail.com",
    from: "ursusagencija@gmail.com",
    replyTo: formData.get("email") as string,
    subject: "Ursus Travel & Accommodation - Upit s web stranice za tour",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  try {
    await mail.send(data);
    // response = {
    //   status: "success",
    //   message: "Your message was sent. I'll be in contact shortly.",
    // };
    console.log("Message sent");
  } catch (error) {
    // response = {
    //   status: "error",
    //   message: `Message failed to send with error, ${error}`,
    // };
    console.log("Message failed to send");
  }
}
