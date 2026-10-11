import { PrismicRichText } from "@prismicio/react";

import richTextStyling from "@/components/utility/richTextSyling";

export default function Itinerary({ itinerary }: any) {
  return (
    <div>
      {itinerary.map((item: any, index: number) => (
        <div key={index} className="flex single__count">
          <div className="shrink-0 day__count">
            <div className="lg:w-[52px] lg:h-[52px] w-10 h-10 rounded-full border border-primary-1 flex justify-center items-center lg:text-lg md:2md text-md font-semibold text-primary-1 bg-white">
              {index + 1}
            </div>
          </div>
          <div className="lg:ml-[18px] ml-4 pb-8">
            <h5 className="lg:text-[22px] text-md font-semibold text-dark-1 !lg:mt-[10px] !mt-2">
              {item.heading}
            </h5>
            <div className="rich-text mt-2">
              <PrismicRichText
                field={item.content}
                components={{
                  ...richTextStyling,
                  paragraph: ({ children }) => (
                    <p className="mb-3 font-sans text-sm lg:text-base leading-[1.62] text-dark-3 last:mb-0">
                      {children}
                    </p>
                  ),
                  em: ({ children }) => (
                    <em className="not-italic block lg:text-2md text-md text-dark-2 font-medium leading-[1.5] font-sans">
                      {children}
                    </em>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
