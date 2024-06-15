import HeroSimple from "@/components/HeroSimple";
import Search from "@/components/Search";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroWithSearch`.
 */
export type HeroWithSearchProps =
  SliceComponentProps<Content.HeroWithSearchSlice>;

/**
 * Component for "HeroWithSearch" Slices.
 */
const HeroWithSearch = ({ slice }: HeroWithSearchProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HeroSimple
        image={slice.primary.image}
        heading={slice.primary.heading}
      >
        <Search />
      </HeroSimple>

    </section>
  );
};

export default HeroWithSearch;
