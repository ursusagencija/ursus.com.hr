import type { Metadata } from "next";
import type { ImageField } from "@prismicio/client";

import { getPathname } from "@/i18n/routing";
import {
  DEFAULT_OG_IMAGE,
  SITE_TITLE_SUFFIX,
  SITE_URL,
} from "@/lib/site";

type BuildPageMetadataArgs = {
  title: string | null | undefined;
  description: string | null | undefined;
  locale: string;
  path: string;
  image?: ImageField | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  noIndex?: boolean;
};

function stripBrandSuffix(title: string): string {
  return title
    .replace(/\s*[|]\s*Ursus(\s+Travel.*)?$/i, "")
    .replace(/\s*[-–—]\s*Ursus(\s+Travel.*)?$/i, "")
    .trim();
}

export function formatPageTitle(pageTitle: string | null | undefined): string {
  const cleaned = stripBrandSuffix((pageTitle || "").trim());
  if (!cleaned) return SITE_TITLE_SUFFIX;
  if (cleaned === SITE_TITLE_SUFFIX) return SITE_TITLE_SUFFIX;
  return `${cleaned} | ${SITE_TITLE_SUFFIX}`;
}

function normalizeDescription(description: string | null | undefined): string {
  const text = (description || "")
    .replace(/\s+/g, " ")
    .replace(/[–—]/g, "-")
    .trim();
  if (!text) {
    return "Private accommodation, tours and transfers with Ursus Travel and Accommodation in Split, Croatia.";
  }
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).trimEnd()}...`;
}

function resolveImageUrl(
  image?: ImageField | null,
  imageUrl?: string | null
): string {
  if (image && "url" in image && image.url) return image.url;
  if (imageUrl) return imageUrl;
  return DEFAULT_OG_IMAGE;
}

export function buildPageMetadata({
  title,
  description,
  locale,
  path,
  image,
  imageUrl,
  imageAlt,
  noIndex = false,
}: BuildPageMetadataArgs): Metadata {
  const fullTitle = formatPageTitle(title);
  const fullDescription = normalizeDescription(description);
  const ogImageUrl = resolveImageUrl(image, imageUrl);
  const canonicalPath = getPathname({ locale, href: path });
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const languages: Record<string, string> = {
    en: `${SITE_URL}${getPathname({ locale: "en", href: path })}`,
    hr: `${SITE_URL}${getPathname({ locale: "hr", href: path })}`,
    "x-default": `${SITE_URL}${getPathname({ locale: "en", href: path })}`,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "hr" ? "hr_HR" : "en_US",
      url: canonicalUrl,
      siteName: SITE_TITLE_SUFFIX,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: ogImageUrl,
          alt: imageAlt || (image && "alt" in image ? image.alt || title || SITE_TITLE_SUFFIX : title || SITE_TITLE_SUFFIX) || SITE_TITLE_SUFFIX,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** Static page copy used when CMS meta is empty or too thin. */
export const STATIC_PAGE_META: Record<
  string,
  Record<"en" | "hr", { title: string; description: string }>
> = {
  homepage: {
    en: {
      title: "Home",
      description:
        "Book private accommodation, tours and transfers in Split with a local Ursus team.",
    },
    hr: {
      title: "Naslovnica",
      description:
        "Rezervirajte privatni smještaj, ture i transfere u Splitu uz lokalni Ursus tim.",
    },
  },
  accommodation: {
    en: {
      title: "Accommodation",
      description:
        "Browse apartments and holiday homes in Split and nearby, managed by Ursus Travel and Accommodation.",
    },
    hr: {
      title: "Smještaj",
      description:
        "Pregledajte apartmane i kuće za odmor u Splitu i okolici koje vodi Ursus Travel and Accommodation.",
    },
  },
  tours: {
    en: {
      title: "Tours",
      description:
        "Discover Split and Dalmatia with guided tours, island trips and outdoor experiences.",
    },
    hr: {
      title: "Ture",
      description:
        "Otkrijte Split i Dalmaciju kroz vođene ture, otočne izlete i aktivnosti u prirodi.",
    },
  },
  transfers: {
    en: {
      title: "Transfers",
      description:
        "Airport and private transfers in Split with comfortable vehicles and on-time drivers.",
    },
    hr: {
      title: "Transferi",
      description:
        "Aerodromski i privatni transferi u Splitu s udobnim vozilima i točnim dolaskom vozača.",
    },
  },
  "about-us": {
    en: {
      title: "About us",
      description:
        "Meet the Ursus team in Split - local hosts for accommodation, tours and transfers since 2016.",
    },
    hr: {
      title: "O nama",
      description:
        "Upoznajte Ursus tim u Splitu - lokalni domaćini za smještaj, ture i transfere od 2016.",
    },
  },
  contact: {
    en: {
      title: "Contact",
      description:
        "Contact Ursus Travel and Accommodation in Split for bookings, tours, transfers and owner services.",
    },
    hr: {
      title: "Kontakt",
      description:
        "Kontaktirajte Ursus Travel and Accommodation u Splitu za rezervacije, ture, transfere i usluge za iznajmljivače.",
    },
  },
  "for-renters": {
    en: {
      title: "For property owners",
      description:
        "Booking, cleaning, guest reception and administration for apartment and holiday home owners in Split.",
    },
    hr: {
      title: "Za iznajmljivače",
      description:
        "Booking, čišćenje, doček gostiju i administracija za vlasnike apartmana i kuća za odmor u Splitu.",
    },
  },
  "privacy-policy": {
    en: {
      title: "Privacy policy",
      description:
        "Read how Ursus Travel and Accommodation collects and protects personal data.",
    },
    hr: {
      title: "Politika privatnosti",
      description:
        "Saznajte kako Ursus Travel and Accommodation prikuplja i štiti osobne podatke.",
    },
  },
  "terms-and-conditions": {
    en: {
      title: "Terms and conditions",
      description:
        "Terms and conditions for using Ursus Travel and Accommodation services and website.",
    },
    hr: {
      title: "Uvjeti korištenja",
      description:
        "Uvjeti korištenja usluga i web stranice Ursus Travel and Accommodation.",
    },
  },
  "message-sent": {
    en: {
      title: "Message sent",
      description:
        "Your message was sent successfully. We will contact you shortly.",
    },
    hr: {
      title: "Poruka poslana",
      description:
        "Vaša poruka je uspješno poslana. Uskoro ćemo vam se javiti.",
    },
  },
};

export function getStaticPageMeta(
  key: keyof typeof STATIC_PAGE_META,
  locale: string
) {
  const lang = locale === "hr" ? "hr" : "en";
  return STATIC_PAGE_META[key][lang];
}
