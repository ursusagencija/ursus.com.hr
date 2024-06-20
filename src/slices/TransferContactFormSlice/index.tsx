import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import TransferContactForm from "@/components/TransferContactForm";
/**
 * Props for `TransferContactFormSlice`.
 */
export type TransferContactFormSliceProps =
  SliceComponentProps<Content.TransferContactFormSliceSlice>;

/**
 * Component for "TransferContactFormSlice" Slices.
 */
const TransferContactFormSlice = ({
  slice,
}: TransferContactFormSliceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <TransferContactForm />
    </section>
  );
};

export default TransferContactFormSlice;
