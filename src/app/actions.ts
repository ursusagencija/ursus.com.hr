"use server";

import mail from "@sendgrid/mail";
import { format } from "date-fns";
import { redirect } from "next/navigation";

mail.setApiKey(process.env.SENDGRID_API_KEY || "");

// const toEmail = "officeursus@gmail.com"
const toEmail = "crashaw@gmail.com"

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
// airport transfer
export async function submitTransferBooking(formData: FormData) {
  const message = `
              Name: ${formData.get("name")}\r\n
              Email: ${formData.get("email")}\r\n
              Phone: ${formData.get("phoneNumber")}\r\n        
              Message: ${formData.get("additionalInfo")}\r\n
              Flight: #${formData.get("flightNumber")} ${formData.get("flyingFrom")} - ${formData.get("flyingTo")} @ ${formData.get("flightDateTime")}\r\n
              Passengers: ${formData.get("passengerCount")}`;

  const data = {
    // to: "info@ursus.com.hr",
    to: toEmail,
    from: "ursusagencija@gmail.com",
    replyTo: formData.get("email") as string,
    subject: "Ursus Travel & Accommodation - Airport Transfer",
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

//regular transfer (not airport transfer)
export async function submitTransferBooking2(formData: FormData) {
  console.log("Starting transfer booking submission...");
  
  // Log form data
  console.log("Form data received:", {
    name: formData.get("name"),
    phone: formData.get("phone"),
    departureAddress: formData.get("departureAddress"),
    arrivalAddress: formData.get("arrivalAddress"),
    transferDateTime: formData.get("transferDateTime"),
    passengerCount: formData.get("passengerCount"),
    additionalInfo: formData.get("additionalInfo"),
    email: formData.get("email"),
  });

  const message = `
              Name: ${formData.get("name")}\r\n
              Email: ${formData.get("email")}\r\n
              Phone: ${formData.get("phone")}\r\n        
              Departure Address: ${formData.get("departureAddress")}\r\n
              Arrival Address: ${formData.get("arrivalAddress")}\r\n
              Transfer Date & Time: ${formData.get("transferDateTime")}\r\n
              Number of Passengers: ${formData.get("passengerCount")}\r\n
              Additional Information: ${formData.get("additionalInfo")}\r\n`;

  const data = {
    to: toEmail,
    from: "ursusagencija@gmail.com",
    replyTo: formData.get("email") as string,
    subject: "Ursus Travel & Accommodation - Transfer Service Request",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  console.log("Preparing to send email with data:", data);

  try {
    await mail.send(data);
    console.log("Email sent successfully!");
  } catch (error: any) {
    console.error("Failed to send email:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      response: error.response?.body,
    });
    throw error; // This will prevent the redirect if the email fails
  }

  console.log("Redirecting to message-sent page...");
  redirect("/en/message-sent");
}