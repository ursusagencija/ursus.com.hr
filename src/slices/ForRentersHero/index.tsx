"use client";

import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import RenterInquiryForm from "@/components/RenterInquiryForm";
import Reveal from "@/components/Reveal";

export type ForRentersHeroProps =
  SliceComponentProps<Content.ForRentersHeroSlice>;

const ForRentersHero = ({ slice }: ForRentersHeroProps): JSX.Element => {
  const serviceOptions = slice.primary.service_options
    .map((item) => item.label)
    .filter((label): label is string => Boolean(label));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-gradient-to-b from-dark-6 to-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,64,97,0.08),transparent_55%)]" />
      <div className="container relative z-1 lg:pt-36 pt-28 lg:pb-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal className="lg:col-span-6">
            {isFilled.keyText(slice.primary.eyebrow) ? (
              <p className="inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase font-medium text-primary-1 mb-5">
                <span className="block h-px w-8 bg-primary-1" />
                {slice.primary.eyebrow}
              </p>
            ) : null}

            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <h1 className="font-serif font-semibold text-dark-1 xl:text-5xl lg:text-4xl text-3xl leading-[1.15]">
                    {children}
                  </h1>
                ),
              }}
            />

            <div className="mt-5 space-y-4 max-w-xl">
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="regular-text-v1 !text-[17px]">{children}</p>
                  ),
                }}
              />
              <PrismicRichText
                field={slice.primary.supporting_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="regular-text-v1 !text-[17px]">{children}</p>
                  ),
                }}
              />
            </div>

            {isFilled.group(slice.primary.highlights) ? (
              <dl className="mt-10 grid sm:grid-cols-3 gap-6 border-t border-stock-1 pt-8">
                {slice.primary.highlights.map((item, index) => (
                  <div key={`${item.label}-${index}`}>
                    <dt className="text-xs tracking-[0.16em] text-dark-4 font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </dt>
                    <dd className="mt-2 text-sm text-dark-2 leading-1.6">
                      {item.label}
                      {item.emphasis ? (
                        <>
                          <br />
                          <span className="font-semibold text-dark-1">
                            {item.emphasis}
                          </span>
                        </>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {isFilled.link(slice.primary.cta) ? (
              <div className="mt-8">
                {(() => {
                  const cta = slice.primary.cta;
                  const href = "url" in cta ? cta.url : undefined;
                  const label = "text" in cta ? cta.text : undefined;

                  if (href?.startsWith("#")) {
                    return (
                      <a
                        href={href}
                        className="btn_primary__v1 outlined"
                        onClick={(event) => {
                          const id = href.slice(1);
                          const target = document.getElementById(id);
                          if (!target) return;
                          event.preventDefault();
                          target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          window.history.replaceState(null, "", href);
                        }}
                      >
                        {label}
                        <i className="bi bi-chevron-right" />
                      </a>
                    );
                  }

                  return (
                    <PrismicNextLink
                      field={cta}
                      className="btn_primary__v1 outlined"
                    >
                      {label}
                      <i className="bi bi-chevron-right" />
                    </PrismicNextLink>
                  );
                })()}
              </div>
            ) : null}
          </Reveal>

          <Reveal
            id="inquiry"
            className="lg:col-span-6 lg:col-start-7 scroll-mt-28"
            delay={120}
          >
            <div className="bg-white border border-stock-1 shadow-[0_20px_60px_rgba(3,4,21,0.06)]">
              <div className="h-1.5 bg-primary-1" />
              <div className="p-6 sm:p-8">
                {isFilled.keyText(slice.primary.form_eyebrow) ? (
                  <p className="text-xs tracking-[0.18em] uppercase font-medium text-primary-1 mb-3">
                    {slice.primary.form_eyebrow}
                  </p>
                ) : null}

                <PrismicRichText
                  field={slice.primary.form_heading}
                  components={{
                    heading2: ({ children }) => (
                      <h2 className="font-serif font-semibold text-dark-1 text-2xl lg:text-[28px] leading-1.3">
                        {children}
                      </h2>
                    ),
                  }}
                />

                <div className="mt-3 mb-6">
                  <PrismicRichText
                    field={slice.primary.form_description}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="regular-text-v1 !text-sm">{children}</p>
                      ),
                    }}
                  />
                </div>

                <RenterInquiryForm
                  serviceOptions={serviceOptions}
                  submitLabel={
                    slice.primary.form_submit_label || "Submit"
                  }
                />

                <div className="mt-4 text-xs text-dark-4 leading-1.7 [&_a]:text-primary-1 [&_a]:underline">
                  <PrismicRichText
                    field={slice.primary.form_privacy_note}
                    components={{
                      paragraph: ({ children }) => <p>{children}</p>,
                    }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ForRentersHero;
