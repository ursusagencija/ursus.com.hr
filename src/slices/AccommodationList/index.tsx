import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Card from "@/components/Card";
import LinkBuilderWithLocale from "@/components/utility/LinkBuilderWithLocale";
import LocalizeText from "@/components/utility/LocalizeText";
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

  const sortedAccommodations = accommodationsWithCalendar.sort((a, b) => {
    if (a.data.isFeatured && !b.data.isFeatured) {
      return -1;
    } else if (!a.data.isFeatured && b.data.isFeatured) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-12 lg:my-20"
    >
      <div className="container pt-4">
        <div className="text-center lg:pb-[60px] pb-[40px]">
          <h5 className="section-sub-title-v1 variant-1">
            {slice.primary.overtitle}
          </h5>
          <h2 className="section-title-v1">{slice.primary.heading}</h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base ">
          <AccommodationSingle
            accommodations={sortedAccommodations.slice(
              0,
              slice.primary.limit !== "No limit"
                ? parseInt(slice.primary.limit)
                : undefined
            )}
          />
          {/* {sortedAccommodations
            .slice(
              0,
              slice.primary.limit !== "No limit"
                ? parseInt(slice.primary.limit)
                : undefined
            )
            .map((item) => {
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
        {slice.primary.limit !== "No limit" ? (
          <div className="text-center mt-8">
            <LinkBuilderWithLocale
              path="/accommodation"
              className="hover:bg-primary-1 hover:text-white transition-colors duration-200 py-2 px-4 text-primary-1 border border-primary-1"
            >
              <LocalizeText croatianText="Prikaži sve" englishText="Show all" />
            </LinkBuilderWithLocale>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AccomodationList;
