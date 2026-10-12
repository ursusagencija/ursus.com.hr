export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ursus.com.hr"
).replace(/\/$/, "");

export const SITE_TITLE_SUFFIX =
  "Ursus Travel and Accommodation - Split, Croatia";

/** Shared fallback OG image (Split waterfront). */
export const DEFAULT_OG_IMAGE =
  "https://images.prismic.io/ursus/ZjyFlUMTzAJOCpi9_split.jpg?auto=format,compress";
