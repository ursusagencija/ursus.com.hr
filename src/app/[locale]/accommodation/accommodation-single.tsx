"use client";

import { useTranslations } from "next-intl";

import Card from "@/components/Card";
import { hasOverlap } from "@/lib/utils";
import { useSearch } from "@/providers/SearchProvider";
import { Content } from "@prismicio/client";

type Props = {
  showAll: boolean;
  accommodations: (Content.AccomodationSingleDocument<string> & {
    occupiedDates: Date[];
  })[];
};

export const AccommodationSingle = ({ showAll, accommodations }: Props) => {
  const t = useTranslations("accommodation");

  const {
    query: { dateRange, people },
  } = useSearch();
  if (!showAll) {
    const filteredByPeople = accommodations.filter(
      (item) => (item.data.guests ? item.data.guests >= (people ?? 1) : true) // ako nema podatka o krevetima, uvijek true
    );

    const filteredByDate = filteredByPeople.filter((item) => {
      return !hasOverlap(dateRange, item.occupiedDates);
    });

    if (filteredByDate.length === 0) {
      return (
        <div className="text-lg col-span-3 flex font-medium justify-center text-center text-primary-1 rounded-md p-2 bg-gray-100">
          {t("no-available")}
        </div>
      );
    }

    return filteredByDate.map((item) => {
      const lowestPrice = () => {
        const prices = item.data.pricing
          .map((period) => period.price ?? 0)
          .filter(Boolean);
        return Math.min(...prices);
      };

      return (
        <Card
          key={item.uid}
          tour={false}
          title={item.data.heading || "Heading"}
          img={item.data.cover_image.url || ""}
          price={lowestPrice().toString()}
          bedrooms={item.data.bedrooms || 0}
          people={item.data.guests || 0}
          href={`/accommodation/${item.uid}`}
        />
      );
    });
  } else {
    // Ako je homepage, prikazujemo sve
    return accommodations.map((item) => {
      const lowestPrice = () => {
        const prices = item.data.pricing
          .map((period) => period.price ?? 0)
          .filter(Boolean);
        return Math.min(...prices);
      };

      return (
        <Card
          key={item.uid}
          tour={false}
          title={item.data.heading || "Heading"}
          img={item.data.cover_image.url || ""}
          price={lowestPrice().toString()}
          bedrooms={item.data.bedrooms || 0}
          people={item.data.guests || 0}
          href={`/accommodation/${item.uid}`}
        />
      );
    });
  }
};
