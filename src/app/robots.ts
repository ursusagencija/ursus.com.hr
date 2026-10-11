import type { MetadataRoute } from "next";

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ursus.com.hr"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/slice-simulator",
        "/message-sent",
        "/en/message-sent",
        "/hr/message-sent",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
