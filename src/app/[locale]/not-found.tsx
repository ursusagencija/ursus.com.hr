import { getTranslations } from "next-intl/server";

import NotFoundView from "@/components/NotFoundView";

export default async function NotFound() {
  const t = await getTranslations("not-found");

  return (
    <NotFoundView
      code={t("code")}
      title={t("title")}
      description={t("description")}
      backHome={t("back-home")}
    />
  );
}
