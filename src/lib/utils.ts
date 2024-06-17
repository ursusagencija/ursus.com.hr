import ical from "@/lib/cal-parser";
import { eachDayOfInterval, isWithinInterval, subDays } from "date-fns";

export const occupiedDatesFromIcal = async (url: string) => {
  const dates: Date[] = [];

  const res = await fetch(url);
  const text = await res.text();

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
};

export const hasOverlap = (
  range: [Date | null, Date | null],
  excludedDates: Date[]
) => {
  return excludedDates.some((d) =>
    isWithinInterval(d, { start: range[0]!, end: range[1]! })
  );
};
