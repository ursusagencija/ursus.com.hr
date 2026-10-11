import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
          <div className="lg:col-span-5">
            {isFilled.keyText(slice.primary.overtitle) ? (
              <h5 className="section-sub-title-v1 !font-sans !normal-case tracking-[0.16em] uppercase !text-xs !text-primary-1">
                {slice.primary.overtitle}
              </h5>
            ) : null}
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <h2 className="section-title-v1 mt-2 lg:text-[40px]">{children}</h2>
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

          <div className="lg:col-span-7">
            {isFilled.group(slice.primary.items) ? (
              <div className="accordion lg:space-y-5 space-y-4">
                {slice.primary.items.map((item, index) => (
                  <details
                    key={`${item.question}-${index}`}
                    className="single__accordion border border-stock-1 bg-white group"
                    open={index === 0}
                  >
                    <summary className="toggle px-5 py-4 leading-1.5 text-2md text-start w-full text-dark-1 font-serif font-semibold cursor-pointer list-none flex items-center justify-between gap-4">
                      <span>{item.question}</span>
                      <i className="bi bi-plus text-xl text-primary-1 group-open:hidden" />
                      <i className="bi bi-dash text-xl text-primary-1 hidden group-open:inline" />
                    </summary>
                    <div className="px-5 pb-5 regular-text-v1 [&_p]:mt-0">
                      <PrismicRichText
                        field={item.answer}
                        components={{
                          paragraph: ({ children }) => <p>{children}</p>,
                        }}
                      />
                    </div>
                  </details>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
