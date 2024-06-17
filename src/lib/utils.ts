import ical from "@/lib/cal-parser";
import { eachDayOfInterval, subDays } from "date-fns";

export const occupiedDatesFromIcal = async (url: string) => {
  fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const dates: Date[] = [];
      ical(text).forEach((e) => {
        const startDate = e.startDate!;
        const endDate = subDays(e.endDate!, 1);

        const interval = eachDayOfInterval({
          start: startDate,
          end: endDate,
        });

        dates.push(...interval);
      });

      return dates;
    })
    .catch((error) => {
      console.error("Error fetching iCal", error);
    });
};
