import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Reveal from "@/components/Reveal";

export type ProcessStepsProps =
  SliceComponentProps<Content.ProcessStepsSlice>;

const ProcessSteps = ({ slice }: ProcessStepsProps): JSX.Element => {
  return (
    <section
      id="how-we-work"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:py-30 py-20 bg-dark-6 scroll-mt-24"
    >
      <div className="container">
        <Reveal>
          <div className="max-w-3xl mb-12 lg:mb-16">
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
          </div>
        </Reveal>

        {isFilled.group(slice.primary.steps) ? (
          <ol className="grid md:grid-cols-3 gap-base">
            {slice.primary.steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className="list-none">
                <Reveal delay={index * 90}>
                  <div className="bg-white border border-stock-1 p-7 lg:p-8 relative h-full">
                    <span className="inline-flex h-10 w-10 items-center justify-center border border-primary-1 text-primary-1 text-sm font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-dark-1 text-xl font-medium mt-6 leading-1.35">
                      {step.title}
                    </h3>
                    {step.description ? (
                      <p className="regular-text-v1 !text-[15px] mt-3">
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
};

export default ProcessSteps;
