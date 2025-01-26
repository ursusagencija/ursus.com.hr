import ical from "@/lib/cal-parser";
import {
  addDays,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  parse,
  subDays,
} from "date-fns";
import { Content } from "@prismicio/client";
import { useTranslations } from "next-intl";

export const occupiedDatesFromIcal = async (url: string) => {
  const dates: Date[] = [];

  const res = await fetch(url);
  const text = await res.text();

  ical(text).forEach((e) => {
    //const startDate = addDays(e.startDate!, 1); // Jedan dan dodajemo jer to moze biti zadnji dan (odlazak)
    const startDate = e.startDate!;
    const endDate = subDays(e.endDate!, 1); // Jedan dan odbijamo, jer se ne racuna u broj nocenja

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
