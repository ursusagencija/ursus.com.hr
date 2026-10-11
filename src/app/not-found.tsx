import { getLocale, getTranslations } from "next-intl/server";

import NotFoundView from "@/components/NotFoundView";

export default async function RootNotFound() {
  let locale = "en";
  try {
    locale = await getLocale();
  } catch {
    // fall back to English copy
  }

  const t = await getTranslations({ locale, namespace: "not-found" });

  return (
    <NotFoundView
      code={t("code")}
      title={t("title")}
      description={t("description")}
      backHome={t("back-home")}
      homeHref={locale === "hr" ? "/hr" : "/"}
    />
  );
}
