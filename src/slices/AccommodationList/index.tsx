import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Card from "@/components/Card";
import { occupiedDatesFromIcal } from "@/lib/utils";
import { AccommodationSingle } from "@/app/[lang]/accommodation/accommodation-single";

/**
 * Props for `AccomodationList`.
 */
export type AccomodationListProps =
  SliceComponentProps<Content.AccomodationListSlice>;

/**
 * Component for "AccomodationList" Slices.
 */
const AccomodationList = async ({
  slice,
}: AccomodationListProps): Promise<JSX.Element> => {
  const client = createClient();
  const accommodations = await client.getAllByType("accomodation_single");

  const accommodationsWithCalendar = await Promise.all(
    accommodations.map(async (a) => ({
      ...a,
      occupiedDates: await occupiedDatesFromIcal(a.data.ical as string),
    }))
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20"
    >
      <div className="container pt-4">
        <div className="text-center lg:pb-[60px] pb-[40px]">
          <h5 className="section-sub-title-v1 variant-1">
            {slice.primary.overtitle}
          </h5>
          <h2 className="section-title-v1">{slice.primary.heading}</h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base ">
          <AccommodationSingle accommodations={accommodationsWithCalendar} />
          {/* {accommodations.map((item) => {
            const lowestPrice = () => {
              const prices = item.data.pricing
                .map((period) => period.price ?? 0)
                .filter(Boolean);
              return Math.min(...prices);
            };

            return (
              <Card
                key={item.uid}
                tour={false}
                title={item.data.heading || "Heading"}
                img={item.data.cover_image.url || ""}
                price={lowestPrice().toString()}
                bedrooms={item.data.bedrooms || 0}
                people={item.data.guests || 0}
                href={`/accommodation/${item.uid}`}
              />
            );
          })} */}
        </div>
      </div>
    </section>
  );
};

export default AccomodationList;
