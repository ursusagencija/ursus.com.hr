import "@/styles/globals.css";
import { Jost, Playfair_Display, Satisfy } from "next/font/google";
import Header from "@/components/Header";

// Import Swiper styles
import "swiper/css";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import SearchProvider from "@/providers/SearchProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

/*Configure Google Fonts*/
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${playfairDisplay.variable} ${satisfy.variable}`}
    >
      <GoogleAnalytics />
      <body>{children}</body>
    </html>
  );
}
