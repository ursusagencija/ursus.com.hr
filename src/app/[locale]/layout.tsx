import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import ContactBar from "@/components/ContactBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { routing } from "@/i18n/routing";
import SearchProvider from "@/providers/SearchProvider";

import "@/styles/globals.css";
import "swiper/css";

export default async function LangLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SearchProvider>
        <Header variant="transparent" />
        <main className="">{children}</main>
        <Footer />
        <ContactBar number="385912004400" />
      </SearchProvider>
    </NextIntlClientProvider>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "hr" }];
}
