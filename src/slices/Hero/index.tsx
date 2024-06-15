'use client'
import HeroSimple from "@/components/HeroSimple";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  console.log(slice.primary.image)
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HeroSimple image={slice.primary.image} heading={slice.primary.heading} />
    </section>
  );
};

export default Hero;
