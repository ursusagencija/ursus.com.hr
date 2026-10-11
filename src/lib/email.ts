import nodemailer from "nodemailer";

export const MAIL_FROM_NAME = "Ursus Travel & Accommodation";

export function getMailTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || "587", 10),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

export function getMailFrom() {
  const address = process.env.MAIL_USER || "";
  return `"${MAIL_FROM_NAME}" <${address}>`;
}

export function getMailTo() {
  return process.env.MAIL_TO;
}

export type EmailField = {
  label: string;
  value: string | null | undefined;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeFields(fields: EmailField[]) {
  return fields.map((field) => ({
    label: field.label,
    value: String(field.value ?? "").trim() || "—",
  }));
}

export function buildInquiryEmail({
  title,
  fields,
}: {
  title: string;
  fields: EmailField[];
}) {
  const rows = normalizeFields(fields);
  const text = [
    title,
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    `— ${MAIL_FROM_NAME}`,
  ].join("\n");

  const htmlRows = rows
    .map(
      (row, index) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #ebebeb;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#030415;width:34%;vertical-align:top;background:${
          index % 2 === 0 ? "#ffffff" : "#f8f8f8"
        };">
          ${escapeHtml(row.label)}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #ebebeb;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#353535;vertical-align:top;background:${
          index % 2 === 0 ? "#ffffff" : "#f8f8f8"
        };">
          ${escapeHtml(row.value).replace(/\n/g, "<br/>")}
        </td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f3f3f3;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e5e5;">
            <tr>
              <td style="padding:22px 24px;background:#004061;font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.3;color:#ffffff;">
                ${escapeHtml(MAIL_FROM_NAME)}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 8px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:600;color:#030415;">
                ${escapeHtml(title)}
              </td>
            </tr>
            <tr>
              <td style="padding:0 16px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebebeb;">
                  ${htmlRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#7b7b7b;">
                Reply directly to this email to contact the sender.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}
