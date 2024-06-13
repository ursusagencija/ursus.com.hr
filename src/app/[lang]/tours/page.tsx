// ./src/app/[lang]/page.tsx

import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import Link from 'next/link';

export async function generateMetadata({
    params: { lang },
}: {
    params: { lang: string };
}): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle('tours', { lang });


    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}

export default async function Index({
    params: { lang },
}: {
    params: { lang: string };
}) {
    const client = createClient();
    const home = await client.getSingle('tours', {
        lang,

    });



    return <SliceZone slices={home.data.slices} components={components} />;
}