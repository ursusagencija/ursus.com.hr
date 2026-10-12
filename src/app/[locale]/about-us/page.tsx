import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { buildPageMetadata, getStaticPageMeta } from "@/lib/metadata";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const client = createClient();
  const page = await client.getSingle("about_us", {
    lang: locale,
  });

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("about_us", { lang: locale });
  const fallback = getStaticPageMeta("about-us", locale);

  return buildPageMetadata({
    title: fallback.title,
    description: fallback.description,
    locale,
    path: "/about-us",
    image: page.data.meta_image,
  });
}
