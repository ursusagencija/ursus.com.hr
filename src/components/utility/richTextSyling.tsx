import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import type { JSXMapSerializer } from "@prismicio/react";

const richTextStyling: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="mb-5 font-sans text-base lg:text-md leading-[1.7] text-dark-3 last:mb-0">
      {children}
    </p>
  ),
  heading1: ({ children }) => (
    <h1 className="mt-10 mb-5 first:mt-0 font-serif font-semibold text-dark-1 text-3xl lg:text-4xl leading-[1.25]">
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mt-10 mb-4 first:mt-0 font-serif font-semibold text-dark-1 text-2xl lg:text-3xl leading-[1.3]">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mt-8 mb-3 first:mt-0 font-serif font-medium text-dark-1 text-xl lg:text-2xl leading-[1.35]">
      {children}
    </h3>
  ),
  heading4: ({ children }) => (
    <h4 className="mt-7 mb-3 first:mt-0 font-serif font-medium text-dark-1 text-lg lg:text-xl leading-[1.4]">
      {children}
    </h4>
  ),
  heading5: ({ children }) => (
    <h5 className="mt-6 mb-2 first:mt-0 font-serif font-medium text-dark-1 text-md lg:text-lg leading-[1.4]">
      {children}
    </h5>
  ),
  heading6: ({ children }) => (
    <h6 className="mt-5 mb-2 first:mt-0 font-serif font-medium text-dark-1 text-base lg:text-md leading-[1.45]">
      {children}
    </h6>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-dark-1">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-dark-3">{children}</em>,
  listItem: ({ children }) => (
    <li className="pl-1 text-dark-3 text-base lg:text-md leading-[1.65]">
      {children}
    </li>
  ),
  oListItem: ({ children }) => (
    <li className="pl-1 text-dark-3 text-base lg:text-md leading-[1.65]">
      {children}
    </li>
  ),
  list: ({ children }) => (
    <ul className="mb-6 ml-1 list-disc space-y-2.5 pl-5 marker:text-primary-1 text-dark-3 last:mb-0">
      {children}
    </ul>
  ),
  oList: ({ children }) => (
    <ol className="mb-6 ml-1 list-decimal space-y-2.5 pl-5 marker:text-primary-1 text-dark-3 last:mb-0">
      {children}
    </ol>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-md bg-dark-6 p-4 font-mono text-sm text-dark-2 last:mb-0">
      {children}
    </pre>
  ),
  image: ({ node }) => (
    <figure className="my-8 w-full last:mb-0">
      <PrismicNextImage field={node} className="h-auto w-full" />
    </figure>
  ),
  embed: ({ node }) => (
    <div className="relative my-8 aspect-video last:mb-0">
      <iframe
        className="absolute left-0 top-0 h-full w-full rounded-md"
        src={node.oembed.embed_url}
        allowFullScreen
        title={node.oembed.title || "Embedded content"}
      />
    </div>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="font-medium text-primary-1 underline underline-offset-2 transition-opacity hover:opacity-80"
    >
      {children}
    </PrismicNextLink>
  ),
  label: ({ children }) => <span>{children}</span>,
  span: ({ text }) => <>{text}</>,
};

export default richTextStyling;
