import { PrismicRichText } from "@prismicio/react"


export default function Itinerary({ itinerary }: any



) {
    const rtfComponents: Record<string, React.ComponentType<{ children: React.ReactNode }>> = {
        'em': ({ children }) => <span className="block lg:text-2md text-md text-dark-2 font-medium leading-[1.5] font-sans">{children}</span>,

        'paragraph': ({ children }) => <p className="">{children}</p>,
        'strong': ({ children }) => <span className="">{children}</span>,

    }

    return (
        <div>
            {itinerary.map((item: any, index: number) => (
                <div key={index} className="flex single__count">
                    <div className="shrink-0 day__count">
                        <div className="lg:w-[52px] lg:h-[52px] w-10 h-10 rounded-full border border-primary-1 flex justify-center items-center lg:text-lg md:2md text-md font-semibold text-primary-1 bg-white">
                            {index + 1}</div>
                    </div>
                    <div className="lg:ml-[18px] ml-4 pb-8">
                        <h5 className="lg:text-[22px] text-md font-semibold text-dark-1 !lg:mt-[10px] !mt-2">
                            {item.heading}</h5>
                        <PrismicRichText field={item.content} components={rtfComponents} />
                        {/* <ul>
                            {item.details.map((detail: string, index: number) => (
                                <li key={index}><i className="bi bi-check-circle" /> {detail}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            ))}

        </div>
    )
}
