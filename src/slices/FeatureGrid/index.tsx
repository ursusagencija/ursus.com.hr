import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Reveal from "@/components/Reveal";

export type FeatureGridProps = SliceComponentProps<Content.FeatureGridSlice>;

const FeatureGrid = ({ slice }: FeatureGridProps): JSX.Element => {
  return (
    <section
      id="services"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:py-30 py-20 scroll-mt-24"
    >
      <div className="container">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 lg:pb-[60px] pb-10 items-end">
            <div className="lg:col-span-7">
              {isFilled.keyText(slice.primary.overtitle) ? (
                <h5 className="section-sub-title-v1 !font-sans !normal-case tracking-[0.16em] uppercase !text-xs !text-primary-1">
                  {slice.primary.overtitle}
                </h5>
              ) : null}
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="section-title-v1 mt-2 lg:text-[40px]">
                      {children}
                    </h2>
                  ),
                }}
              />
            </div>
            <div className="lg:col-span-5">
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="regular-text-v1 lg:text-right">{children}</p>
                  ),
                }}
              />
            </div>
          </div>
        </Reveal>

        {isFilled.group(slice.primary.items) ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-base">
            {slice.primary.items.map((item, index) => (
              <Reveal key={`${item.title}-${index}`} delay={index * 80}>
                <article className="border border-stock-1 bg-white p-6 min-h-[220px] flex flex-col">
                  <span className="text-sm text-dark-4 tracking-[0.12em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-dark-1 text-xl lg:text-[22px] font-medium leading-1.35 mt-8">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="regular-text-v1 !text-[15px] mt-auto pt-4">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default FeatureGrid;
