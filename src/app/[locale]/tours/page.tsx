// ./src/app/[lang]/page.tsx

import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { buildPageMetadata, getStaticPageMeta } from "@/lib/metadata";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("tours", { lang: locale });
  const fallback = getStaticPageMeta("tours", locale);

  return buildPageMetadata({
    title: fallback.title,
    description: fallback.description,
    locale,
    path: "/tours",
    image: page.data.meta_image,
  });
}

export default async function Index({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const client = createClient();
  const home = await client.getSingle("tours", {
    lang: locale,
  });

  return <SliceZone slices={home.data.slices} components={components} />;
}
