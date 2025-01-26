import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import HeroSimple from "@/components/HeroSimple";
import ContentBlock from "@/components/ContentBlock";
import Itinerary from "@/components/Itinerary";

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
      <div className="container">
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

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
