import Image from "next/image";

import Reveal from "@/components/Reveal";
import LinkBuilderWithLocale from "./utility/LinkBuilderWithLocale";

export default function Services({ data }: any) {
  const items = [
    {
      key: "1",
      href: data.service1_link.url,
      external: false,
      image: data.service1_image.url,
      heading: data.service1_heading,
      subtitle: data.service1_subtitle,
    },
    {
      key: "2",
      href: data.service2_link.url,
      external: false,
      image: data.service2_image.url,
      heading: data.service2_heading,
      subtitle: data.service2_subtitle,
    },
    {
      key: "3",
      href: data.service3_link.url,
      external: true,
      image: data.service3_image.url,
      heading: data.service3_heading,
      subtitle: data.service3_subtitle,
    },
    {
      key: "4",
      href: data.service4_link.url,
      external: false,
      image: data.service4_image.url,
      heading: data.service4_heading,
      subtitle: data.service4_subtitle,
    },
  ];

  return (
    <div className="tour_type_style__one lg:pt-30 pt-24 relative z-1 ">
      <div className="container">
        <Reveal>
          <div className="text-center lg:pb-[60px] pb-[40px]">
            <h5 className="section-sub-title-v1">{data.heading}</h5>
            <h2 className="section-title-v1">{data.overtitle}</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-base">
          {items.map((item, index) => {
            const body = (
              <>
                <div className="group/card package-card-style-one overflow-hidden">
                  <div className="overflow-hidden relative h-64">
                    <Image
                      fill
                      src={item.image}
                      alt={item.heading}
                      style={{ objectFit: "cover" }}
                      className="w-full group-hover/card:scale-105 duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <h4 className="card-title-alpha mt-2">{item.heading}</h4>
                <p className="regular-text-v1 !text-[17px] mt-1 !leading-1.6">
                  {item.subtitle}
                </p>
              </>
            );

            return (
              <Reveal key={item.key} delay={index * 80}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {body}
                  </a>
                ) : (
                  <LinkBuilderWithLocale path={item.href}>
                    {body}
                  </LinkBuilderWithLocale>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
