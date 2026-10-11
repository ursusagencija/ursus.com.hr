"use server";

import { format } from "date-fns";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/routing";
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

async function redirectToMessageSent() {
  const locale = await getLocale();
  redirect({ href: "/message-sent", locale });
}

export async function submitBooking(
  dateRange: [Date | null, Date | null],
  people: string,
  url: string,
  price: string,
  formData: FormData
) {
  const email = buildInquiryEmail({
    title: "Accommodation booking request",
    fields: [
      { label: "Name", value: formData.get("name") as string },
      { label: "Email", value: formData.get("email") as string },
      { label: "Phone", value: formData.get("phone") as string },
      { label: "Message", value: formData.get("message") as string },
      {
        label: "Dates",
        value: `${format(dateRange[0]!, "do MMM yyyy")} – ${format(
          dateRange[1]!,
          "do MMM yyyy"
        )}`,
      },
      { label: "People", value: people },
      { label: "Accommodation", value: `https://ursus.com.hr${url}` },
      { label: "Price", value: price },
    ],
  });

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: formData.get("email") as string,
      subject: `${MAIL_FROM_NAME} – Accommodation`,
      text: email.text,
      html: email.html,
    });
  } catch (error: any) {
    console.error(`Message failed to send: ${error.message}`);
    return;
  }

  await redirectToMessageSent();
}

export async function submitTourBooking(
  date: Date | null,
  people: string,
  url: string,
  formData: FormData
) {
  const email = buildInquiryEmail({
    title: "Tour booking request",
    fields: [
      { label: "Name", value: formData.get("name") as string },
      { label: "Email", value: formData.get("email") as string },
      { label: "Phone", value: formData.get("phone") as string },
      { label: "Message", value: formData.get("message") as string },
      { label: "Date", value: format(date!, "do MMM yyyy") },
      { label: "People", value: people },
      { label: "Tour", value: `https://ursus.com.hr${url}` },
    ],
  });

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: formData.get("email") as string,
      subject: `${MAIL_FROM_NAME} – Tour`,
      text: email.text,
      html: email.html,
    });
  } catch (error: any) {
    console.error(`Message failed to send: ${error.message}`);
  }

  await redirectToMessageSent();
}

export async function submitTransferBooking(formData: FormData) {
  const email = buildInquiryEmail({
    title: "Airport transfer request",
    fields: [
      { label: "Name", value: formData.get("name") as string },
      { label: "Email", value: formData.get("email") as string },
      { label: "Phone", value: formData.get("phoneNumber") as string },
      { label: "Message", value: formData.get("additionalInfo") as string },
      {
        label: "Flight",
        value: `#${formData.get("flightNumber")} ${formData.get(
          "flyingFrom"
        )} – ${formData.get("flyingTo")} @ ${formData.get("flightDateTime")}`,
      },
      { label: "Passengers", value: formData.get("passengerCount") as string },
    ],
  });

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: formData.get("email") as string,
      subject: `${MAIL_FROM_NAME} – Airport Transfer`,
      text: email.text,
      html: email.html,
    });
  } catch (error: any) {
    console.error(`Message failed to send: ${error.message}`);
  }

  await redirectToMessageSent();
}

export async function submitTransferBooking2(formData: FormData) {
  const email = buildInquiryEmail({
    title: "Transfer service request",
    fields: [
      { label: "Name", value: formData.get("name") as string },
      { label: "Email", value: formData.get("email") as string },
      { label: "Phone", value: formData.get("phone") as string },
      {
        label: "Departure address",
        value: formData.get("departureAddress") as string,
      },
      {
        label: "Arrival address",
        value: formData.get("arrivalAddress") as string,
      },
      {
        label: "Transfer date & time",
        value: formData.get("transferDateTime") as string,
      },
      {
        label: "Number of passengers",
        value: formData.get("passengerCount") as string,
      },
      {
        label: "Additional information",
        value: formData.get("additionalInfo") as string,
      },
    ],
  });

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: formData.get("email") as string,
      subject: `${MAIL_FROM_NAME} – Transfer Service`,
      text: email.text,
      html: email.html,
    });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    throw error;
  }

  await redirectToMessageSent();
}
