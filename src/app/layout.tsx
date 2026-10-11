import "@/styles/globals.css";
import { Jost, Playfair_Display, Satisfy } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { getLocale } from "next-intl/server";

import "swiper/css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { repositoryName } from "@/prismicio";

const jost = Jost({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jost",
});
const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
});
const satisfy = Satisfy({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-satisfy",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let locale = "en";
  try {
    locale = await getLocale();
  } catch {
    // Non-localized routes (API, sitemap, etc.)
  }

  return (
    <html
      lang={locale}
      className={`${jost.variable} ${playfairDisplay.variable} ${satisfy.variable}`}
    >
      <body>
        <GoogleAnalytics />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
