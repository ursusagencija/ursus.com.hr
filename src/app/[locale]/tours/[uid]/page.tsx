import { Link } from "@/i18n/routing";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import Faq from "@/components/Faq";
import Itinerary from "@/components/Itinerary";
import PhotoGallery from "@/components/PhotoGallery";
import Services from "@/components/Services";
import TickList from "@/components/TickList";
import TourBookingForm from "@/components/package/TourBookingForm";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string; locale: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("tours_single", params.uid, { lang: params.locale })
    .catch(() => notFound());
  const services = await client.getByType("services", { lang: params.locale });

  const rtfComponents: Record<
    string,
    React.ComponentType<{ children: React.ReactNode }>
  > = {
    // em: ({ children }) => (
    //   <span className="text-md text-dark-2 font-medium leading-[1.5]">
    //     {children}
    //   </span>
    // ),
    // paragraph: ({ children }) => <p className="text-xl leading-[1.5]">{children}</p>,
    // strong: ({ children }) => <span className="text-md ">{children}</span>,
  };
  const includedItems = page.data.price_includes.map((item) => item.included);
  const excludedItems = page.data.price_excludes.map((item) => item.excluded);
  const photos = page.data.gallery.map((photo) => ({
    src: photo.photo?.url || "",
    width: Number(photo.photo.dimensions?.width),
    height: Number(photo.photo.dimensions?.height),
  }));

  const t = await getTranslations("tours");

  return (
    <>
      <div className="relative h-[30vh] md:h-[60vh]">
        <PrismicNextImage
          field={page.data.cover_image}
          priority
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="absolute inset-0"
        />
        <div className="bg-gradient-to-r from-primary-1/30 to-primary-1/50 absolute inset-0" />

        <div className="lg:py-56 py-20 relative overflow-hidden">
          <div className="container relative z-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li>
                  <Link href="/tours">{t("tours")}</Link>
                </li>
                <li className="active_page">{t("details")}</li>
              </ol>
            </nav>

            <h1 className="xl:text-[54px] mt-2 lg:text-4xl md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
              {page.data.heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="md:mb-16">
        <div className="container">
          <div className="flex flex-wrap justify-between pb-8 pt-6 mb-8 border-b border-stock-1">
            <div className="p-2">
              <ul className="flex flex-col md:flex-row gap-2 text-md flex-wrap items-start">
                <li className="flex items-center gap-2 px-2">
                  <i className="bi bi-clock" /> {t("duration")}:{" "}
                  <strong>{page.data.duration}</strong>
                </li>
                <li className="flex items-center gap-2 px-2">
                  {" "}
                  <i className="bi bi-person" />
                  {t("min-age")}: <strong>{page.data.min_age}</strong>
                </li>
                <li className="flex items-center gap-2 px-2">
                  <i className="bi bi-map" />
                  {t("location")}: <strong>{page.data.location}</strong>
                </li>
                <li className="flex items-center gap-2 px-2">
                  <i className="bi bi-coin" />
                  <strong> {page.data.price}€</strong>
                </li>
              </ul>
              {/* <h2 className="font-sans lg:text-[45px] leading-1.2 md:text-xl text-lg font-semibold">
                {page.data.price}€
              </h2> */}
              {/* <div className="text-md font-normal ml-1">per person</div> */}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-base">
            <div className="lg:col-span-8 col-span-12">
              <div className="pack__disc">
                <PrismicRichText
                  field={page.data.description}
                  components={rtfComponents}
                />

                <ul className="mt-base">
                  {includedItems.length > 0 && (
                    <li className="lg:flex lg:pt-6 pt-5 pb-5 lg:pb-6 border-t border-stock-1 last:border-b">
                      <div className="lg:w-1/3 lg:text-2md text-md text-dark-2 font-medium">
                        {t("includes")}
                      </div>
                      <div className="lg:w-2/3 lg:mt-0 mt-4">
                        <TickList itemList={includedItems} />
                      </div>
                    </li>
                  )}
                  <li className="lg:flex lg:pt-6 pt-5 pb-5 lg:pb-6 border-t border-stock-1 last:border-b">
                    <div className="lg:w-1/3 lg:text-2md text-md text-dark-2 font-medium">
                      {t("excludes")}
                    </div>
                    <div className="lg:w-2/3 lg:mt-0 mt-4">
                      <TickList itemList={excludedItems} />
                    </div>
                  </li>
                </ul>

                <div className="lg:pt-10 pt-8">
                  <h3>{t("itinerary")}</h3>

                  <Itinerary itinerary={page.data.itinerary} />
                </div>
                <div className="pt-2">
                  <h3>{t("faq")}</h3>
                  <Faq faqList={page.data.faq} />
                </div>
                <div className="lg:pt-10 pt-8">
                  <h3>{t("gallery")}</h3>

                  <PhotoGallery photos={photos} overtitle="" heading="" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 relative">
              <div className="lg:sticky top-[108px]">
                <TourBookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SliceZone slices={page.data.slices} components={components} />
      <Services data={services.results[0].data} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("tours_single", params.uid, { lang: params.locale })
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("tours_single", { lang: "*" });

  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
