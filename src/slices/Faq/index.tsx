import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import AccordionItem from "@/components/AccordionItem";
import Reveal from "@/components/Reveal";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq = ({ slice }: FaqProps): JSX.Element => {
  return (
    <section
      id="faq"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:py-30 py-20 scroll-mt-24"
    >
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-5">
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
            <div className="mt-4">
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="regular-text-v1">{children}</p>
                  ),
                }}
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            {isFilled.group(slice.primary.items) ? (
              <div className="accordion lg:space-y-5 space-y-4">
                {slice.primary.items.map((item, index) => (
                  <AccordionItem
                    key={`${item.question}-${index}`}
                    title={item.question}
                    defaultOpen={index === 0}
                    panelClassName="px-5 pb-5 regular-text-v1 [&_p]:mt-0"
                  >
                    <PrismicRichText
                      field={item.answer}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                      }}
                    />
                  </AccordionItem>
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Faq;
