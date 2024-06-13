'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { PrismicNextImage } from '@prismicio/next';
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';



/**
 * Props for `ImageSlider`.
 */
export type ImageSliderProps = SliceComponentProps<Content.ImageSliderSlice>;

/**
 * Component for "ImageSlider" Slices.
 */
const ImageSlider = ({ slice }: ImageSliderProps): JSX.Element => {
  const navigation = {
    nextEl: ".pd-next",
    prevEl: ".pd-prev"
  };
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-24"
    >
      <div className="swiper product_details__slider relative group">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          speed={500}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2
            },
            992: {
              slidesPerView: 3
            },
            1200: {
              slidesPerView: 4
            }
          }}
          navigation={navigation}
          modules={[Navigation]}
        >
          {/* <img src="./assets/images/packages/s1.webp" alt="" /> */}
          {slice.items?.map((item, i) => (
            <SwiperSlide key={i + 1}>
              <div className="swiper-slide relative">
                <PrismicNextImage height={787} width={800} field={item.image} className="w-full" />
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
        <div className="pd-next cursor-pointer md:h-14 md:w-14 md:inline-flex hidden rounded-full lg:text-lg justify-center items-center bg-white text-dark-1 hover:bg-primary-1 hover:text-white group-hover:-translate-x-8 group-hover:opacity-100 opacity-0 duration-300 right-0 top-1/2 -translate-y-1/2 z-10 absolute">
          <i className="bi bi-arrow-right" />
        </div>
        <div className="pd-prev cursor-pointer md:h-14 md:w-14 md:inline-flex hidden rounded-full lg:text-lg justify-center items-center bg-white text-dark-1 hover:bg-primary-1 hover:text-white group-hover:translate-x-8 group-hover:opacity-100 opacity-0 duration-300 left-0 top-1/2 -translate-y-1/2 z-10 absolute">
          <i className="bi bi-arrow-left" />
        </div>
      </div>

    </section>
  );
};


export default ImageSlider;

