'use client'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";


import PhotoGallery from "@/components/PhotoGallery";




/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery = ({ slice }: GalleryProps): JSX.Element => {
  const photos = slice.items.map((item) => ({
    src: item.image?.url || "",
    width: Number(item.image.dimensions?.width),
    height: Number(item.image.dimensions?.height),
  }));


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="lg:pt-30 pt-24 relative z-1 ">
        <PhotoGallery
          photos={photos}
          overtitle={slice.primary.overtitle || ''}
          heading={slice.primary.heading || ''}
        />
      </div>
    </section>
  );
};

export default Gallery;
