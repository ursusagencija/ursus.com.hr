import ical from "@/lib/cal-parser";
import {
  addDays,
  eachDayOfInterval,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  parse,
  subDays,
} from "date-fns";
import { Content } from "@prismicio/client";
import { useTranslations } from "next-intl";
import { DateRange } from "@/types";
import { start } from "repl";

export const occupiedDatesFromIcal = async (url: string) => {
  const dates: Date[] = [];

  try {
    if (!url) return dates;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return dates;

    const text = await res.text();

    ical(text).forEach((e) => {
      const startDate = e.startDate!;
      const endDate = e.endDate!;

      const interval = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });

      dates.push(...interval);
    });
  } catch (error) {}

  return dates;
};

export const occupiedRangesFromIcal = async (url: string) => {
  const dates: DateRange[] = [];

  try {
    if (!url) return dates;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return dates;

    const text = await res.text();

    ical(text).forEach((e) => {
      const startDate = e.startDate!;
      const endDate = e.endDate!;

      dates.push({ startDate, endDate });
    });
  } catch (error) {
    return dates;
  }

  return dates;
};

export const isDateInOccupiedRange = (
  date: Date,
  occupiedRanges: DateRange[]
) => {
  return occupiedRanges.some(({ startDate, endDate }) =>
    isWithinInterval(date, {
      start: startDate!,
      end: subDays(endDate!, 1),
    })
  );
};

export const getApplicablePriceRange = (
  date: Date,
  priceRanges: Content.AccomodationSingleDocumentData["pricing"]
) => {
  return priceRanges.find((range, index, ranges) => {
    const previousRange = ranges[index - 1];

    const inCurrentRange = isWithinInterval(date, {
      start: range.period_start!,
      end: range.period_end!,
    });

    const isTransitionDay = previousRange
      ? isAfter(date, previousRange.period_end!) &&
        isBefore(date, range.period_start!)
      : false;

    return inCurrentRange || isTransitionDay;
  });
};

export const isDateAvailable = (
  date: Date,
  priceRanges: Content.AccomodationSingleDocumentData["pricing"],
  occupiedRanges: DateRange[]
) => {
  const range = getApplicablePriceRange(date, priceRanges);
  if (!range || !range.price) return false;

  return !isDateInOccupiedRange(date, occupiedRanges);
};

export const isEndDateValid = (
  startDate: Date,
  endDate: Date,
  priceRanges: Content.AccomodationSingleDocumentData["pricing"],
  occupiedRanges: DateRange[]
) => {
  const range = getApplicablePriceRange(endDate, priceRanges);

  if (!range) return false;

  return !eachDayOfInterval({ start: startDate, end: endDate }).some((date) =>
    isDateInOccupiedRange(date, occupiedRanges)
  );
};

export const getAvailableEndDates = (
  startDate: Date,
  priceRanges: Content.AccomodationSingleDocumentData["pricing"],
  occupiedRanges: DateRange[]
) => {
  const validEndDates = [];
  for (let days = 1; days <= 30; days++) {
    // Checking for next 30 days (adjust as necessary)
    const potentialEndDate = addDays(startDate, days);
    if (
      isEndDateValid(startDate, potentialEndDate, priceRanges, occupiedRanges)
    ) {
      validEndDates.push(potentialEndDate);
    }
  }
  return validEndDates;
};

export const hasValidEndDates = (
  startDate: Date,
  priceRanges: Content.AccomodationSingleDocumentData["pricing"],
  occupiedRanges: DateRange[]
) => {
  const validEndDates = getAvailableEndDates(
    startDate,
    priceRanges,
    occupiedRanges
  );

  return validEndDates.length > 0;
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

  const days = eachDayOfInterval({
    start: startDate,
    end: subDays(endDate, 1), // Zadnjeg dana nema, gledamo nocenja
  });

  days.forEach((currentDate) => {
    for (let period of pricing) {
      if (
        isWithinInterval(currentDate, {
          start: parse(period.period_start!, "yyyy-MM-dd", new Date()),
          end: parse(period.period_end!, "yyyy-MM-dd", new Date()),
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
  const formatted = formatter.format(amount);

  const t = useTranslations("booking");

  return formatted === "€0" ? t("select-dates-price") : formatted;
};
