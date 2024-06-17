"use client";

import DatePicker from "react-datepicker";

type Props = {
  excludeDates: Date[];
};

export const Calendar = ({ excludeDates }: Props) => {
  return (
    <div className="mt-8">
      <div className="text-center lg:pb-[60px] pb-[40px]">
        <h5 className="section-sub-title-v1">Calendar</h5>
        <h2 className="section-title-v1">Availability</h2>
      </div>
      <div className="flex justify-center">
        <DatePicker
          disabled
          onChange={() => {}}
          inline
          excludeDates={excludeDates}
        />
      </div>
    </div>
  );
};
