import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const client = createClient();
  const page = await client.getSingle("terms_and_conditions", {
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
  const page = await client.getSingle("terms_and_conditions", { lang: locale });

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
