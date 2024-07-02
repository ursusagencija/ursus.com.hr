import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import HeroSimple from "@/components/HeroSimple";
import ContentBlock from "@/components/ContentBlock";
import Itinerary from "@/components/Itinerary";

export default async function Page({
    params: { lang },
}: {
    params: { lang: string };
}) {
    const client = createClient();
    const page = await client.getSingle("transfers", {
        lang,
    });
    return <>
        <HeroSimple heading={page.data.heading} image={page.data.image} />
        <div className="container">
            <ContentBlock>
                {page.data.content}
            </ContentBlock>
            <Itinerary itinerary={page.data.howtobook} />

            <SliceZone slices={page.data.slices} components={components} />
        </div>
    </>

}

export async function generateMetadata({
    params: { lang },
}: {
    params: { lang: string };
}): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("transfers", { lang });

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}
