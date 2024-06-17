import { PrismicRichText } from "@prismicio/react"

export default function ContentBlock({ children }: { children: any }) {
    const components = {
        'paragraph': ({ children }: { children: any }) => <p className="py-2">{children}</p>,
        'heading1': ({ children }: { children: any }) => <h1>{children}</h1>,
        'heading2': ({ children }: { children: any }) => <h2 className="text-dark-1 font-medium leading-[1.43] lg:text-xl md:text-lg text-[22px] mt-[14px]">{children}</h2>,
        'heading3': ({ children }: { children: any }) => <h3 className="text-dark-1 font-medium leading-[1.43] lg:text-lg md:text-base text-[20px] mt-[13px]">{children}</h3>,
        'heading4': ({ children }: { children: any }) => <h4>{children}</h4>,
        'heading5': ({ children }: { children: any }) => <h5>{children}</h5>,
        'heading6': ({ children }: { children: any }) => <h6>{children}</h6>,
        'strong': ({ children }: { children: any }) => <strong className="lg:text-2md text-md text-dark-2 font-medium leading-[1.5] font-sans mb-6">{children}</strong>,
        'em': ({ children }: { children: any }) => <em>{children}</em>,
        'list-item': ({ children }: { children: any }) => <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">{children}</li>,
        'o-list-item': ({ children }: { children: any }) => <li className="flex items-center relative first:pl-0 pl-2 pr-2 before:content-[''] before:absolute before:h-2/3 before:w-[1px] before:bg-dark-2 before:-translate-y-1/2 before:top-1/2 before:left-0 first:before:hidden">{children}</li>,
        'list': ({ children }: { children: any }) => <ul className="flex items-center justify-center lg:text-sm text-xs font-medium text-dark-2 flex-wrap pt-7">{children}</ul>,
        'group-list': ({ children }: { children: any }) => <ul>{children}</ul>,
        'group-o-list': ({ children }: { children: any }) => <ol>{children}</ol>,
    }

    return (
        <div className="blog__details">
            <PrismicRichText field={children} components={components} />
        </div>
    )
}
