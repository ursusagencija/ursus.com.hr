import ContentBlock from "@/components/ContentBlock";
import { Content as PrismicContent } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<PrismicContent.ContentSlice>;

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container py-12 lg:py-20"
    >
      <ContentBlock>{slice.primary.content}</ContentBlock>
    </section>
  );
};

export default Content;
