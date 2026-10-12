import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import ContentBlock from "@/components/ContentBlock";
import HeroSimple from "@/components/HeroSimple";
import Itinerary from "@/components/Itinerary";
import { buildPageMetadata, getStaticPageMeta } from "@/lib/metadata";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const client = createClient();
  const page = await client.getSingle("transfers", {
    lang: locale,
  });
  return (
    <>
      <HeroSimple heading={page.data.heading} image={page.data.image} />
      <div className="container mt-6">
        <ContentBlock>{page.data.content}</ContentBlock>
        <Itinerary itinerary={page.data.howtobook} />

        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </>
  );
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("transfers", { lang: locale });
  const fallback = getStaticPageMeta("transfers", locale);

  return buildPageMetadata({
    title: fallback.title,
    description: fallback.description,
    locale,
    path: "/transfers",
    image: page.data.meta_image,
  });
}
