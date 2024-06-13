'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative">

        <PrismicNextImage
          field={slice.primary.image}
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
        <div className="pb-28 lg:pb-24 lg:pt-[260px] pt-28 relative z-3">
          <div className="container">
            <div className="max-w-[900px] mx-auto text-center text-white pb-20 md:pb-28">
              <h1 className="xl:text-7xl lg:text-4xl text-3xl font-semibold leading-1.2 "><>{slice.primary.heading}</></h1>
              <div className="max-w-[700px] mx-auto">
              </div>
            </div>
          </div>
        </div>
        <div className='absolute inset-0 from-primary-1/40 to-primary-1/30 bg-gradient-to-r' />
      </div>
    </section>
  );
};

export default Hero;
