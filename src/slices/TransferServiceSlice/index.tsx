import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useTranslations } from 'next-intl';

import ContentBlock from "@/components/ContentBlock";
import Itinerary from "@/components/Itinerary";
import { submitTransferBooking2 } from "@/app/actions";

/**
 * Props for `TransferServiceSlice`.
 */
export type TransferServiceSliceProps =
  SliceComponentProps<Content.TransferServiceSliceSlice>;

/**
 * Component for "TransferServiceSlice" Slices.
 */
const TransferServiceSlice = ({
  slice,
}: TransferServiceSliceProps): JSX.Element => {
  const t = useTranslations('transfer-service');

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ContentBlock>{slice.primary.content}</ContentBlock>
      <Itinerary itinerary={slice.primary.howtobook} />
      <div className="my-8">
        <form
          action={submitTransferBooking2}
          autoComplete="off"
          className="lg:px-base px-5 lg:pt-6 lg:pb-base pt-4 pb-5 bg-white border-primary-1 border"
        >
          <h4 className="lg:text-xl text-lg text-dark-1 font-semibold">
            {t("request")}
          </h4>

          <div className="grid md:grid-cols-2 gap-x-4">
            <div className="mt-5 lg:mt-6">
              <label htmlFor="name" className="mb-2 text-dark-3 capitalize block">
                {t("name")}*
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="input_style__primary"
              />
            </div>

            <div className="mt-5 lg:mt-6">
              <label htmlFor="phone" className="mb-2 text-dark-3 capitalize block">
                {t("phone")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input_style__primary"
              />
            </div>

            <div className="mt-5 lg:mt-6">
              <label
                htmlFor="departureAddress"
                className="mb-2 text-dark-3 capitalize block"
              >
                {t("departure-address")}*
              </label>
              <input
                required
                type="text"
                id="departureAddress"
                name="departureAddress"
                className="input_style__primary"
              />
            </div>

            <div className="mt-5 lg:mt-6">
              <label
                htmlFor="arrivalAddress"
                className="mb-2 text-dark-3 capitalize block"
              >
                {t("arrival-address")}*
              </label>
              <input
                required
                type="text"
                id="arrivalAddress"
                name="arrivalAddress"
                className="input_style__primary"
              />
            </div>

            <div className="mt-5 lg:mt-6">
              <label
                htmlFor="transferDate"
                className="mb-2 text-dark-3 capitalize block"
              >
                {t("transfer-date")}*
              </label>
              <input
                required
                type="date"
                id="transferDate"
                name="transferDate"
                className="input_style__primary"
              />
            </div>

            <div className="mt-5 lg:mt-6">
              <label
                htmlFor="transferTime"
                className="mb-2 text-dark-3 capitalize block"
              >
                {t("transfer-time")}*
              </label>
              <input
                required
                type="time"
                id="transferTime"
                name="transferTime"
                className="input_style__primary"
              />
            </div>

            <div className="mt-5 lg:mt-6">
              <label
                htmlFor="passengerCount"
                className="mb-2 text-dark-3 capitalize block"
              >
                {t("number-of-passengers")}*
              </label>
              <input
                required
                type="number"
                min="1"
                id="passengerCount"
                name="passengerCount"
                className="input_style__primary"
              />
            </div>
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="additionalInfo"
              className="mb-2 text-dark-3 capitalize block"
            >
              {t("additional-info")}
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              className="input_style__primary"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="btn_primary__v1 !w-full justify-center mt-5"
          >
            {t("submit")}
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.42505 16.5999L12.8584 11.1666C13.5 10.5249 13.5 9.4749 12.8584 8.83324L7.42505 3.3999"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default TransferServiceSlice;
