"use server";

import mail from "@sendgrid/mail";
import { format } from "date-fns";
import { redirect } from "next/navigation";

mail.setApiKey(process.env.SENDGRID_API_KEY || "");

const toEmail = "officeursus@gmail.com"

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
    // to: "info@ursus.com.hr",
    to: toEmail,
    from: "ursusagencija@gmail.com",
    replyTo: formData.get("email") as string,
    subject: "Ursus Travel & Accommodation - Accommodation",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };



  try {
    await mail.send(data);
  } catch (error: any) {
    console.error(`Message failed to send: ${error.message}`);
    return;
  }

  redirect("/en/message-sent");
}

export async function submitTourBooking(
  date: Date | null,
  people: string,
  url: string,
  formData: FormData
) {
  const message = `
              Name: ${formData.get("name")}\r\n
              Email: ${formData.get("email")}\r\n
              Phone: ${formData.get("phone")}\r\n        
              Message: ${formData.get("message")}\r\n
              Date: ${format(date!, "do MMM yyyy")}\r\n
              People: ${people}\r\n
              Tour: https://ursus.com.hr${url}`;

  const data = {
    // to: "info@ursus.com.hr",
    to: toEmail,
    from: "ursusagencija@gmail.com",
    replyTo: formData.get("email") as string,
    subject: "Ursus Travel & Accommodation - Tour",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  try {
    await mail.send(data);
    console.log("Message sent");
  } catch (error: any) {
    console.error(`Message failed to send: ${error.message}`);
  }

  redirect("/en/message-sent");
}

export async function submitTransferBooking(formData: FormData) {
  const message = `
              Name: ${formData.get("name")}\r\n
              Email: ${formData.get("email")}\r\n
              Phone: ${formData.get("phone")}\r\n        
              Message: ${formData.get("additionalInfo")}\r\n
              Flight: #${formData.get("flightNumber")} ${formData.get("flyingFrom")} - ${formData.get("flyingTo")} @ ${formData.get("flightDateTime")}\r\n
              Passengers: ${formData.get("passengerCount")}`;

  const data = {
    // to: "info@ursus.com.hr",
    to: toEmail,
    from: "ursusagencija@gmail.com",
    replyTo: formData.get("email") as string,
    subject: "Ursus Travel & Accommodation - Transfer",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  try {
    await mail.send(data);
    console.log("Message sent");
  } catch (error: any) {
    console.error(`Message failed to send: ${error.message}`);
  }

  redirect("/en/message-sent");
}
