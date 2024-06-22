import React from "react";
import LocalizeText from "./utility/LocalizeText";
import Link from "next/link";
import { submitTransferBooking } from "@/app/actions";

export default function TransferContactForm() {
  return (
    <div className="my-8">
      <form
        action={submitTransferBooking}
        autoComplete="off"
        className="lg:px-base px-5 lg:pt-6 lg:pb-base pt-4 pb-5 bg-white border-primary-1 border"
      >
        <h4 className="lg:text-xl text-lg text-dark-1 font-semibold">
          <LocalizeText
            croatianText="Upit za transfer"
            englishText="Transfer Request"
          />
        </h4>

        <div className="grid md:grid-cols-3 gap-x-4">
          <div className="mt-5 lg:mt-6">
            <label htmlFor="name" className="mb-2 text-dark-3 capitalize block">
              <LocalizeText croatianText="Name" englishText="Name" />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input_style__primary"
            />
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="flyingFrom"
              className="mb-2 text-dark-3 capitalize block"
            >
              <LocalizeText
                croatianText="Flying From"
                englishText="Flying From"
              />
            </label>
            <input
              type="text"
              id="flyingFrom"
              name="flyingFrom"
              className="input_style__primary"
            />
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="flyingTo"
              className="mb-2 text-dark-3 capitalize block"
            >
              <LocalizeText croatianText="Flying To" englishText="Flying To" />
            </label>
            <input
              type="text"
              id="flyingTo"
              name="flyingTo"
              className="input_style__primary"
            />
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="flightDateTime"
              className="mb-2 text-dark-3 capitalize block"
            >
              <LocalizeText
                croatianText="Flight Date and Time"
                englishText="Flight Date and Time"
              />
            </label>
            <input
              type="datetime-local"
              id="flightDateTime"
              name="flightDateTime"
              className="input_style__primary"
            />
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="flightNumber"
              className="mb-2 text-dark-3 capitalize block"
            >
              <LocalizeText
                croatianText="Flight Number"
                englishText="Flight Number"
              />
            </label>
            <input
              type="text"
              id="flightNumber"
              name="flightNumber"
              className="input_style__primary"
            />
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="passengerCount"
              className="mb-2 text-dark-3 capitalize block"
            >
              <LocalizeText
                croatianText="Number of Passengers"
                englishText="Number of Passengers"
              />
            </label>
            <input
              type="number"
              id="passengerCount"
              name="passengerCount"
              className="input_style__primary"
            />
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="email"
              className="mb-2 text-dark-3 capitalize block"
            >
              <LocalizeText croatianText="Email" englishText="Email" />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input_style__primary"
            />
          </div>

          <div className="mt-5 lg:mt-6">
            <label
              htmlFor="phoneNumber"
              className="mb-2 text-dark-3 capitalize block"
            >
              <LocalizeText
                croatianText="Phone Number"
                englishText="Phone Number"
              />
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="input_style__primary"
            />
          </div>
        </div>

        <div className="mt-5 lg:mt-6">
          <label
            htmlFor="additionalInfo"
            className="mb-2 text-dark-3 capitalize block"
          >
            <LocalizeText
              croatianText="Additional Information"
              englishText="Additional Information"
            />
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            className="input_style__primary"
          />
        </div>

        {/* <div className="mt-5 lg:mt-6">
                <label htmlFor="tourTime" className="mb-2 text-dark-3 capitalize block"><LocalizeText croatianText='Datum' englishText='Date' /></label>
                <input type="datetime-local" id="tourTime" name="daterange" className="input_style__primary" />
            </div> */}
        {/* <div className="js-form-counters lg:mt-6 mt-5 relative">
                <label htmlFor="tourTime" className="mb-2 text-dark-3 capitalize block"><LocalizeText croatianText='Broj putnika' englishText='Number of Passengers' /></label>
                <button type="button" className="w-full bg-transparent border border-stock-1 lg:h-[54px] h-12 px-5 py-2 text-dark-2 focus:border-primary-1 flex items-center common_dropdown__btn">
                    <div>
                        <span className="js-count-adult">1</span> <LocalizeText croatianText='Odrasli' englishText='Adults' /> -

                        <span className="js-count-child">0</span> <LocalizeText croatianText='Djeca' englishText='Children' />
                    </div>
                </button>

                <div className="common__dropdown person-dropdown space-y-4 opacity-0 absolute w-full left-0 top-full invisible bg-white translate-y-3 duration-200 z-10">

                    <div className="js-counter flex justify-between items-center" data-value-change=".js-count-adult">
                        <p className="text-dark-1">Adult</p>
                        <div className="flex items-center space-x-4">
                            <button aria-label="button disc" type="button" className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                <i className="bi bi-dash-lg" />
                            </button>
                            <div className="js-count text-dark-1 lg:ext-md">2</div>
                            <button aria-label="button disc" type="button" className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                <i className="bi bi-plus-lg" />
                            </button>
                        </div>
                    </div>

                    <div className="js-counter flex justify-between items-center" data-value-change=".js-count-child">
                        <p className="text-dark-1">Children</p>
                        <div className="flex items-center space-x-4">
                            <button aria-label="button disc" type="button" className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                <i className="bi bi-dash-lg" />
                            </button>
                            <div className="js-count text-dark-1 lg:ext-md">0</div>
                            <button aria-label="button disc" type="button" className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                <i className="bi bi-plus-lg" />
                            </button>
                        </div>
                    </div>

                    <div className="js-counter flex justify-between items-center" data-value-change=".js-count-room">
                        <p className="text-dark-1 ">Room</p>
                        <div className="flex items-center space-x-4">
                            <button aria-label="button disc" type="button" className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                <i className="bi bi-dash-lg" />
                            </button>
                            <div className="js-count text-dark-1 lg:ext-md">1</div>
                            <button aria-label="button disc" type="button" className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                <i className="bi bi-plus-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

        {/* 
            <button className="capitalize w-full text-center underline duration-150 mt-4 text-dark-1 font-medium flex items-center justify-center hover:text-primary-1">check availability </button> */}
        <button
          type="submit"
          className="btn_primary__v1 !w-full justify-center mt-5"
        >
          <LocalizeText croatianText="Pošalji upit" englishText="Send" />
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
  );
}
