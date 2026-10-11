import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Params = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "message-sent",
  });

  return {
    title: t("meta-title"),
    description: t("meta-description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

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
