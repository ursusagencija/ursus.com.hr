import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Message Sucessfully Sent - Ursus Travel & Accommodation",
  description: "Message successfully sent. We will be in contact shortly.",
  robots: {
    index: false,
    follow: false,
  },
};
export default async function Page() {
  const t = await getTranslations("message-sent");

  return (
    <div className="py-32 min-h-[50vh] container">
      <h1 className="text-center font-semibold text-2xl font-display">
        {t("success")}
      </h1>
      <p className="text-center">{t("contact-soon")}</p>
    </div>
  );
}
