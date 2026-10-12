import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { buildPageMetadata, getStaticPageMeta } from "@/lib/metadata";

type Params = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const fallback = getStaticPageMeta("message-sent", params.locale);

  return buildPageMetadata({
    title: fallback.title,
    description: fallback.description,
    locale: params.locale,
    path: "/message-sent",
    noIndex: true,
  });
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
