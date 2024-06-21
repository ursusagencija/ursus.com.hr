import ical from "@/lib/cal-parser";
import {
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  subDays,
} from "date-fns";
import { Content } from "@prismicio/client";

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

export const computePrice = (
  pricing: Content.AccomodationSingleDocumentData["pricing"],
  startDate: Date,
  endDate: Date
) => {
  let total = 0;

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  days.forEach((currentDate) => {
    for (let period of pricing) {
      if (
        isWithinInterval(currentDate, {
          start: period.period_start!,
          end: period.period_end!,
        })
      ) {
        total += period.price as number;
        break;
      }
    }
  });

  return total;
};

export const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};
