import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { eachDayOfInterval, subDays } from "date-fns";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { Calendar } from "@/components/Calendar";
import PackageBookingForm from "@/components/package/PackageBookingForm";
import PartialDiv from "@/components/PartialDiv";
import PhotoGallery from "@/components/PhotoGallery";
import Services from "@/components/Services";
import { Link } from "@/i18n/routing";
import ical from "@/lib/cal-parser";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import richTextStyling from "@/components/utility/richTextSyling";
import Faq from "@/components/Faq";
import { occupiedDatesFromIcal, occupiedRangesFromIcal } from "@/lib/utils";

// const DynamicMap = dynamic(() => import('@/components/package/PackageMap'), {
//     ssr: false
// });

type Params = { uid: string; locale: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("accomodation_single", params.uid, { lang: params.locale })
    .catch(() => notFound());

  const services = await client.getByType("services", { lang: params.locale });

  const photos = page.data.gallery.map((photo) => ({
    src: photo.photo?.url || "",
    width: Number(photo.photo.dimensions?.width),
    height: Number(photo.photo.dimensions?.height),
  }));

  const lowestPrice = () => {
    const prices = page.data.pricing
      .map((period) => period.price ?? 0)
      .filter(Boolean);
    return Math.min(...prices);
  };

  /*let dates: Date[] = [];

  const res = await fetch(page.data.ical as string, { cache: "no-store" });
  const text = await res.text();

  ical(text).forEach((event) => {
    //const startDate = addDays(event.startDate!, 1);
    const startDate = event.startDate!;
    const endDate = subDays(event.endDate!, 1);

    const interval = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    dates = [...dates, ...interval];
  });*/
  const occupiedDates = await occupiedDatesFromIcal(page.data.ical!);
  const occupiedRanges = await occupiedRangesFromIcal(page.data.ical!);

  const t = await getTranslations("accommodation");

  return (
    <>
      <div className="relative h-[50vh] md:h-[60vh] flex justify-center flex-col">
        <PrismicNextImage
          field={page.data.cover_image}
          priority
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="absolute inset-0"
        />
        <div className="bg-gradient-to-r from-primary-1/30 to-primary-1/50 absolute inset-0" />

        <div className=" relative overflow-hidden">
          <div className="container relative z-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li>
                  <Link href="/accommodation">{t("accommodation")}</Link>
                </li>
                <li className="active_page">{t("details")}</li>
              </ol>
            </nav>

            <h1 className=" mt-2 2xl:text-4xl lg:text-3xl  md:text-2xl text-[30px] text-white leading-[1.3] font-medium max-w-[640px]">
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
                <div className="flex justify-between items-center gap-2 flex-wrap lg:pt-8 pt-4 pb-4">
                  <ul className="pack__list">
                    <li>
                      {" "}
                      <i className="bi bi-person" />
                      {t("guests")} {page.data.guests}
                    </li>
                    <li>
                      <i className="bi bi-usb-mini" /> {t("bedrooms")}{" "}
                      {page.data.bedrooms}
                    </li>
                    <li>
                      <i className="bi bi-tablet-landscape" />
                      {t("beds")} {page.data.beds}
                    </li>
                    <li>
                      <i className="bi bi-droplet" />
                      {t("bathrooms")} {page.data.bathrooms}
                    </li>
                    <li>
                      <i className="bi bi-coin" />
                      {t("price-from")} {lowestPrice()}€
                    </li>
                  </ul>
                </div>
                <PrismicRichText
                  field={page.data.description}
                  components={richTextStyling}
                />

                <ul className="mt-base">
                  <li className="lg:flex lg:pt-6 pt-5 pb-5 lg:pb-6 border-t border-stock-1 last:border-b">
                    <div className="lg:w-1/3 lg:text-2md text-md text-dark-2 font-medium">
                      {t("amenities")}
                    </div>
                    <div className="lg:w-2/3 lg:mt-0 mt-4">
                      <ul className="lg:grid flex flex-wrap grid-cols-2 lg:gap-y-5 gap-y-3 gap-x-3">
                        {page.data.amenities.map((amenity) => (
                          <li
                            key={amenity.amenity}
                            className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center"
                          >
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
                  <h3>{t("distances")}</h3>
                  <PrismicRichText
                    field={page.data.distances}
                    components={richTextStyling}
                  />
                </div>
                {photos && (
                  <PhotoGallery
                    overtitle="View photos"
                    heading="Gallery"
                    photos={photos}
                  />
                )}
                <Calendar excludeDates={occupiedDates} />
                <div className="lg:pt-10 pt-8" id="rules">
                  <h3>{t("house-rules")}</h3>

                  <PartialDiv>
                    <PrismicRichText
                      field={page.data.house_rules}
                      components={richTextStyling}
                    />
                  </PartialDiv>
                </div>
                <div className="lg:pt-10 pt-8" id="important-information">
                  <h3>{t("important-information")}</h3>

                  <PartialDiv>
                    <PrismicRichText
                      field={page.data.important_information}
                      components={richTextStyling}
                    />
                  </PartialDiv>
                </div>
                {/* faq list */}
                <div className="lg:pt-10 pt-8" id="faq">
                  <h3>FAQ</h3>
                  <Faq faqList={page.data.faq} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:pt-20 pt-10 relative">
              <div className="lg:sticky top-[108px]">
                <PackageBookingForm
                  excludeDates={occupiedDates}
                  occupiedRanges={occupiedRanges}
                  pricing={page.data.pricing}
                />
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
    .getByUID("accomodation_single", params.uid, { lang: params.locale })
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
