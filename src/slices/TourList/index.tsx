import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Card from '@/components/Card';
import LinkBuilderWithLocale from "@/components/utility/LinkBuilderWithLocale";
import LocalizeText from "@/components/utility/LocalizeText";

/**
 * Props for `TourList`.
 */
export type TourListProps = SliceComponentProps<Content.TourListSlice>;

/**
 * Component for "TourList" Slices.
 */
const TourList = async ({ slice }: any) => {
  const client = createClient();
  const tours = await client.getAllByType('tours_single');
  const sortedTours = tours.sort((a, b) => {
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
      className="py-20"
    >
      <div className="container pt-4">
        <div className="text-center lg:pb-[60px] pb-[40px]">
          <h5 className="section-sub-title-v1 variant-1">{slice.primary.overtitle}</h5>
          <h2 className="section-title-v1">{slice.primary.heading}</h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-base ">
          {sortedTours
            .slice(0, slice.primary.limit !== "No limit" ? parseInt(slice.primary.limit) : undefined)
            .map((item) => {
              return (
                <Card
                  key={item.uid}
                  tour={true}
                  title={item.data.heading || "Heading"}
                  img={item.data.cover_image.url || ""}
                  price={item.data.price?.toString()}
                  duration={item.data.duration || ""}
                  location={item.data.location || ""}
                  href={`/tours/${item.uid}`}
                />
              );
            })}
        </div>
        {slice.primary.limit !== "No limit" ? (
          <div className="text-center mt-8">
            <LinkBuilderWithLocale
              path="/tours"
              className="hover:bg-primary-1 hover:text-white transition-colors duration-200 py-2 px-4 text-primary-1 border border-primary-1"
            >
              <LocalizeText croatianText="Prikaži sve" englishText="Show all" />
            </LinkBuilderWithLocale>
          </div>
        ) : null

        }
      </div>
    </section>
  );
};

export default TourList;
