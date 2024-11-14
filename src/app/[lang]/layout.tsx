import "@/styles/globals.css";
import { Jost, Playfair_Display, Satisfy } from "next/font/google";
import Header from "@/components/Header";
import Script from "next/script";

// Import Swiper styles
import "swiper/css";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import SearchProvider from "@/providers/SearchProvider";

//GTM
const GTM_ID = "G-MYEM5VR86R";

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
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html
      lang={params.lang}
      className={`${jost.variable} ${playfairDisplay.variable} ${satisfy.variable}`}
    >
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <body>
        <SearchProvider>
          <Header variant="transparent" />
          <main className="">{children}</main>
          <Footer />
          <ContactBar number="385912004400" />
        </SearchProvider>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "hr" }];
}
