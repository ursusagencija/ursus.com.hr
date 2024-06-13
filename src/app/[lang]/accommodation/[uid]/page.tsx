import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import dynamic from 'next/dynamic';
import PackageBookingForm from '@/components/package/PackageBookingForm';
import LocalizeText from '@/components/utility/LocalizeText';
import { PrismicRichText } from "@prismicio/react";
import PhotoGallery from "@/components/PhotoGallery";

// const DynamicMap = dynamic(() => import('@/components/package/PackageMap'), {
//     ssr: false
// });

type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
        .getByUID("accomodation_single", params.uid, { lang: params.lang })
        .catch(() => notFound());

    const rtfComponents: Record<string, React.ComponentType<{ children: React.ReactNode }>> = {
        'em': ({ children }) => <span className="block lg:text-2md text-md text-dark-2 font-medium leading-[1.5] font-sans">{children}</span>,

        'paragraph': ({ children }) => <p className="">{children}</p>,
        'strong': ({ children }) => <span className="font-medium text-dark-2">{children}</span>,
    }
    const photos = page.data.gallery.map((photo) => ({
        src: photo.photo?.url || "",
        width: Number(photo.photo.dimensions?.width),
        height: Number(photo.photo.dimensions?.height),
    }));


    const lowestPrice = () => {
        const prices = page.data.pricing.map((period) => period.price ?? 0).filter(Boolean);
        return Math.min(...prices);
    };
    return <>
        <div className="relative h-[50vh] md:h-[60vh]">
            <PrismicNextImage
                field={page.data.cover_image}
                priority
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="absolute inset-0"

            />
            <div className="bg-gradient-to-r from-primary-1/30 to-primary-1/50 absolute inset-0" />


            <div className="lg:py-56 py-20 relative overflow-hidden">

                <div className="container relative z-2">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li><Link href="/accommodation"><LocalizeText croatianText="Smještaj" englishText="Accommodation" /></Link></li>
                            <li className="active_page"><LocalizeText croatianText="Detalji" englishText="Details" /></li>
                        </ol>
                    </nav>


                    <h1 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
                        {page.data.heading}
                    </h1>
                </div>
            </div>
        </div>
        <div className="relative z-10 py-4 md:py-12">


            <div className="container bg-white ">
                <div className="grid grid-cols-12 gap-base">
                    <div className="lg:col-span-8 col-span-12">

                        <div className="pack__disc" id="Information">
                            <div className="flex justify-between items-center gap-2 flex-wrap lg:pt-8 pt-4 lg:pb-4">
                                <h2 className="font-sans lg:text-[45px] md:text-xl text-xl font-semibold !pointer-events-none !mt-0 !mb-0 pb-4 md:pb-0">
                                    <LocalizeText croatianText="od" englishText="from" /> {lowestPrice()}€<span className="lg:text-lg text-md font-normal">
                                        {/* <LocalizeText croatianText="po osobi" englishText="per person" /> */}
                                    </span> </h2>

                            </div>
                            <PrismicRichText field={page.data.description} components={rtfComponents} />
                            <ul className="pack__list">
                                <li> <i className="bi bi-person" /><LocalizeText croatianText="Gosti" englishText="Guests" /> {page.data.guests}</li>
                                <li><i className="bi bi-usb-mini" /> <LocalizeText croatianText="Spavaće Sobe" englishText="Bedrooms" /> {page.data.bedrooms}</li>
                                <li><i className="bi bi-tablet-landscape" /><LocalizeText croatianText="Kreveti" englishText="Beds" /> {page.data.beds}</li>
                                <li><i className="bi bi-droplet" /><LocalizeText croatianText="Kreveti" englishText="Bathrooms" /> {page.data.beds}</li>
                            </ul>
                            <ul className="mt-base">
                                <li className="lg:flex lg:pt-6 pt-5 pb-5 lg:pb-6 border-t border-stock-1 last:border-b">
                                    <div className="lg:w-1/3 lg:text-2md text-md text-dark-2 font-medium">
                                        <LocalizeText croatianText="Značajke" englishText="Amenity" />
                                    </div>
                                    <div className="lg:w-2/3 lg:mt-0 mt-4">
                                        <ul className="lg:grid flex flex-wrap grid-cols-2 lg:gap-y-5 gap-y-3 gap-x-3">
                                            {page.data.amenities.map((amenity) => (

                                                <li key={amenity.amenity} className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                                    <div className="text-primary-1 lg:text-md text-base mr-2">
                                                        <i className="bi bi-check2" />
                                                    </div>
                                                    <span>{amenity.amenity}</span>
                                                </li>
                                            ))}


                                        </ul>
                                    </div>
                                </li>

                            </ul>

                            <div className="lg:pt-10 pt-8" id="distances">
                                <h3><LocalizeText croatianText="Udaljenosti" englishText="Distances" />
                                </h3>
                                <PrismicRichText field={page.data.distances} components={rtfComponents} />

                            </div>
                            <div className="lg:pt-10 pt-8" id="rules">
                                <h3><LocalizeText croatianText="Kućna pravila" englishText="House Rules" />
                                </h3>
                                <PrismicRichText field={page.data.house_rules} components={rtfComponents} />

                            </div>



                        </div>
                        {photos && < PhotoGallery overtitle="View photos" heading="Gallery" photos={photos} />}
                    </div>
                    <div className="lg:col-span-4 col-span-12 lg:pt-20 pt-10 relative">
                        <div className="lg:sticky top-[108px]">
                            <PackageBookingForm />
                        </div>
                    </div>
                </div>
            </div>
        </div >



        <SliceZone slices={page.data.slices} components={components} />
    </>
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("accomodation_single", params.uid, { lang: params.lang })
        .catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("accomodation_single", { lang: "*" });

    return pages.map((page) => {
        return { uid: page.uid, lang: page.lang };
    });
}
