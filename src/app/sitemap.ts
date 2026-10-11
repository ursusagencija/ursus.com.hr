import type { MetadataRoute } from "next";
import type { PrismicDocument } from "@prismicio/client";

import { getPathname, routing } from "@/i18n/routing";
import { createClient } from "@/prismicio";

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ursus.com.hr"
).replace(/\/$/, "");

const STATIC_PATHS = [
  "/",
  "/accommodation",
  "/tours",
  "/transfers",
  "/for-renters",
  "/owners-landing",
  "/about-us",
  "/contact",
  "/terms-and-conditions",
  "/privacy-policy",
] as const;

export const revalidate = 3600;

function absoluteUrl(locale: string, href: string): string {
  return `${SITE_URL}${getPathname({ locale, href })}`;
}

function languageAlternates(urlsByLocale: Record<string, string>) {
  return {
    languages: {
      ...urlsByLocale,
      "x-default": urlsByLocale[routing.defaultLocale],
    },
  };
}

function collectByUid(documents: PrismicDocument[]) {
  const byUid = new Map<string, { locales: string[]; lastModified: Date }>();

  for (const doc of documents) {
    if (!doc.uid) continue;

    const lastModified = new Date(doc.last_publication_date);
    const existing = byUid.get(doc.uid);

    if (!existing) {
      byUid.set(doc.uid, { locales: [doc.lang], lastModified });
      continue;
    }

    if (!existing.locales.includes(doc.lang)) {
      existing.locales.push(doc.lang);
    }
    if (lastModified > existing.lastModified) {
      existing.lastModified = lastModified;
    }
  }

  return byUid;
}

function entriesForUids(
  byUid: Map<string, { locales: string[]; lastModified: Date }>,
  pathPrefix: "/accommodation" | "/tours",
  priority: number
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  Array.from(byUid.entries()).forEach(([uid, { locales, lastModified }]) => {
    const urlsByLocale = Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(locale, `${pathPrefix}/${uid}`)])
    );

    for (const locale of locales) {
      entries.push({
        url: urlsByLocale[locale],
        lastModified,
        changeFrequency: "weekly",
        priority,
        alternates: languageAlternates(urlsByLocale),
      });
    }
  });

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const urlsByLocale = Object.fromEntries(
      routing.locales.map((locale) => [locale, absoluteUrl(locale, path)])
    );

    for (const locale of routing.locales) {
      entries.push({
        url: urlsByLocale[locale],
        lastModified: new Date(),
        changeFrequency: path === "/" ? "daily" : "weekly",
        priority: path === "/" ? 1 : 0.8,
        alternates: languageAlternates(urlsByLocale),
      });
    }
  }

  const [accommodations, tours] = await Promise.all([
    Promise.all(
      routing.locales.map((locale) =>
        client.getAllByType("accomodation_single", { lang: locale })
      )
    ).then((pages) => pages.flat()),
    Promise.all(
      routing.locales.map((locale) =>
        client.getAllByType("tours_single", { lang: locale })
      )
    ).then((pages) => pages.flat()),
  ]);

  entries.push(
    ...entriesForUids(collectByUid(accommodations), "/accommodation", 0.7),
    ...entriesForUids(collectByUid(tours), "/tours", 0.7)
  );

  return entries;
}
