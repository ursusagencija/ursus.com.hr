"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import DatePicker from "react-datepicker";

import { submitTourBooking } from "@/app/actions";
import { usePathname } from "@/i18n/routing";
import { useSearch } from "@/providers/SearchProvider";

import "react-datepicker/dist/react-datepicker.css";

const TourBookingForm = () => {
  const t = useTranslations("booking");
  const path = usePathname();
  const { query } = useSearch();

  const [date, setDate] = useState<Date | undefined>();

  const [activTab, setActiveTab] = useState("booking");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [guest, setGuest] = useState<Guest>({
    adult: query.people,
    child: 0,
  });

  interface Guest {
    adult: number;
    child: number;
  }

  const incrementGuest = (key: keyof Guest) => {
    setGuest((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  const minusGuest = (key: keyof Guest) => {
    if (guest[key] > 0) {
      setGuest((prev) => ({
        ...prev,
        [key]: prev[key] - 1,
      }));
    }
  };

  const handleSubmit = submitTourBooking.bind(
    null,
    date!,
    `${guest.adult} adults, ${guest.child} children`,
    path
  );

  return (
    <div>
      <ul id="tabs-nav" className="booking-tabs flex gap-4 pb-6">
        {/* <li onClick={() => setActiveTab('booking')} className={`tab-link basis-1/2 ${activTab === 'booking' ? 'active' : ''}`} data-tab={3}>Booking</li> */}
        {/* <li onClick={() => setActiveTab('enquiry')} className={`tab-link basis-1/2 ${activTab === 'enquiry' ? 'active' : ''}`} data-tab={4}>Enquiry</li> */}
      </ul>
      <div
        id="tab-3"
        className={`tab-content ${activTab === "booking" ? "active" : ""}`}
      >
        <form
          action={handleSubmit}
          autoComplete="off"
          className="lg:px-base px-2 lg:pt-4 lg:pb-base pt-2 pb-3 bg-white border-primary-1 border"
        >
          <h4 className="lg:text-xl text-lg text-primary-1 font-semibold">
            {" "}
            {t("check-availability")}
          </h4>
          <div className="mt-2">
            <label htmlFor="date" className="mb-1 text-dark-3 capitalize block">
              {t("date")}
            </label>
            <DatePicker
              required
              dateFormat="do MMM yyyy"
              minDate={new Date()}
              selected={date}
              onChange={(d) => setDate(d!)}
              placeholderText={t("select-date")}
              className="search__daterange border border-stock-1 lg:h-[40px] h-12 px-5 py-2 text-dark-2 focus:border-primary-1 w-full placeholder:text-dark-2 outline-none !font-sans text-start z-50"
            />
          </div>
          <div className="js-form-counters mt-2 relative">
            <label
              htmlFor="tourTime"
              className="mb-1 text-dark-3 capitalize block"
            >
              {t("guests")}
            </label>
            <button
              aria-label="count button"
              onClick={() => setDropdownActive(!dropdownActive)}
              type="button"
              className="w-full bg-transparent border border-stock-1 lg:h-[40px] h-12 px-5 py-2 text-dark-2 focus:border-primary-1 flex items-center common_dropdown__btn"
            >
              <div>
                <span className="js-count-adult">{guest.adult}</span>{" "}
                {t("adults")} -
                <span className="js-count-child"> {guest.child}</span>{" "}
                {t("children")}
              </div>
            </button>
            {/* count dropdown */}
            <div
              className={`common__dropdown person-dropdown space-y-4 opacity-0 absolute w-full left-0 top-full invisible bg-white translate-y-3 duration-200 z-10 ${dropdownActive ? "common_dropdown__active" : ""}`}
            >
              {/* adult count */}
              <div
                className="js-counter flex justify-between items-center"
                data-value-change=".js-count-adult"
              >
                <p className="text-dark-1 capitalize">{t("adults")}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => minusGuest("adult")}
                    type="button"
                    className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150"
                  >
                    <i className="bi bi-dash-lg" />
                  </button>
                  <div className="js-count text-dark-1 lg:ext-md">
                    {guest.adult}
                  </div>
                  <button
                    aria-label="count button"
                    onClick={() => incrementGuest("adult")}
                    type="button"
                    className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150"
                  >
                    <i className="bi bi-plus-lg" />
                  </button>
                </div>
              </div>

              {/* children count  */}
              <div
                className="js-counter flex justify-between items-center"
                data-value-change=".js-count-child"
              >
                <p className="text-dark-1 capitalize">{t("children")}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => minusGuest("child")}
                    type="button"
                    className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150"
                  >
                    <i className="bi bi-dash-lg" />
                  </button>
                  <div className="js-count text-dark-1 lg:ext-md">
                    {guest.child}
                  </div>
                  <button
                    aria-label="count button"
                    onClick={() => incrementGuest("child")}
                    type="button"
                    className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150"
                  >
                    <i className="bi bi-plus-lg" />
                  </button>
                </div>
              </div>

              {/* room count */}
              {/* <div className="js-counter flex justify-between items-center" data-value-change=".js-count-room">
                                <p className="text-dark-1 ">Room</p>
                                <div className="flex items-center space-x-4">
                                    <button onClick={() => minusGuest('room')} type="button" className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                        <i className="bi bi-dash-lg" />
                                    </button>
                                    <div className="js-count text-dark-1 lg:ext-md">{guest.room}</div>
                                    <button aria-label="count button" onClick={() => incrementGuest('room')} type="button" className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                        <i className="bi bi-plus-lg" />
                                    </button>
                                </div>
                            </div> */}
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="name" className="mb-1 text-dark-3 capitalize block">
              {t("name")}
            </label>
            <input
              name="name"
              className="border border-stock-1 lg:h-[40px] h-12 px-5 py-2 text-dark-2 focus:border-primary-1 w-full placeholder:text-dark-2 outline-none !font-sans text-start"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-2">
              <label
                htmlFor="email"
                className="mb-1 text-dark-3 capitalize block"
              >
                {t("email")}
              </label>
              <input
                name="email"
                className="border border-stock-1 lg:h-[40px] h-12 px-5 py-2 text-dark-2 focus:border-primary-1 w-full placeholder:text-dark-2 outline-none !font-sans text-start"
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="phone"
                className="mb-1 text-dark-3 capitalize block"
              >
                {t("phone")}
              </label>
              <input
                name="phone"
                className="border border-stock-1 lg:h-[40px] h-12 px-5 py-2 text-dark-2 focus:border-primary-1 w-full placeholder:text-dark-2 outline-none !font-sans text-start"
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="message"
              className="mb-1 text-dark-3 capitalize block"
            >
              {t("message")}
            </label>
            <textarea
              name="message"
              rows={2}
              className="border border-stock-1 h-28 px-5 py-2 text-dark-2 focus:border-primary-1 w-full placeholder:text-dark-2 outline-none !font-sans text-start"
            />
          </div>
          <button
            type="submit"
            className="btn_primary__v1 !w-full justify-center mt-2"
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
    </div>
  );
};

export default TourBookingForm;
