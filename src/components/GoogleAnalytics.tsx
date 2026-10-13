import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17817545140";

const GoogleAnalytics = () => {
  const primaryId = GA_ID || ADS_ID;
  if (!primaryId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });` : ""}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
