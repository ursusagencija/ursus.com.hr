import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

type RichTextNodeProps = {
    children: React.ReactNode;
    node: any;
};

const richTextStyling: Record<
    string,
    React.ComponentType<RichTextNodeProps>
> = {
    paragraph: ({ children }) => (
        <p className="mb-6 leading-relaxed text-dark-2 text-md">{children}</p>
    ),
    heading1: ({ children }) => (
        <h1 className="mb-6 text-dark-2 font-semibold leading-tight text-4xl">
            {children}
        </h1>
    ),
    heading2: ({ children }) => (
        <h2 className="mb-6 text-dark-2 font-semibold leading-tight text-3xl">
            {children}
        </h2>
    ),
    heading3: ({ children }) => (
        <h3 className="mb-6 text-dark-2 font-semibold leading-tight text-2xl">
            {children}
        </h3>
    ),
    heading4: ({ children }) => (
        <h4 className="mb-6 text-dark-2 font-semibold leading-tight text-xl">
            {children}
        </h4>
    ),
    heading5: ({ children }) => (
        <h5 className="mb-6 text-dark-2 font-semibold leading-tight text-lg">
            {children}
        </h5>
    ),
    heading6: ({ children }) => (
        <h6 className="mb-6 text-dark-2 font-semibold leading-tight text-base">
            {children}
        </h6>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold text-dark-2">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="italic text-dark-2">{children}</em>
    ),
    listItem: ({ children }) => (
        <li className="mb-1 text-dark-2">{children}</li>
    ),
    oListItem: ({ children }) => (
        <li className="mb-1 text-dark-2">{children}</li>
    ),
    list: ({ children }) => (
        <ul className="mb-6 list-disc pl-4 text-dark-2">{children}</ul>
    ),
    oList: ({ children }) => (
        <ol className="mb-6 list-decimal pl-4 text-dark-2">{children}</ol>
    ),
    preformatted: ({ children }) => (
        <pre className="bg-[#f4f4f4] rounded-lg p-4 mb-6 overflow-x-auto text-sm font-mono">
            {children}
        </pre>
    ),
    image: ({ node }: RichTextNodeProps) => (
        <div className="relative w-full aspect-video mb-6 mt-6">
            <PrismicNextImage field={node} />
        </div>
    ),
    embed: ({ node }: RichTextNodeProps) => (
        <div className="relative aspect-video mb-6 mt-6">
            <iframe
                className="absolute w-full h-full top-0 left-0 rounded-lg"
                src={node.oembed.embed_url}
                allowFullScreen
            />
        </div>
    ),
    hyperlink: ({ children, node }: RichTextNodeProps) => (
        <PrismicNextLink
            field={node.data}
            className="text-[#E8604C] hover:text-[#004061] underline"
        >
            {children}
        </PrismicNextLink>
    ),
    quote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-200 pl-4 italic mb-6 text-gray-600">
            {children}
        </blockquote>
    ),
};

export default richTextStyling;