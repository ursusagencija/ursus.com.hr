import { PrismicRichText } from "@prismicio/react";

import Reveal from "@/components/Reveal";
import richTextStyling from "@/components/utility/richTextSyling";

export default function ContentBlock({ children }: { children: any }) {
  return (
    <Reveal>
      <div className="rich-text">
        <PrismicRichText field={children} components={richTextStyling} />
      </div>
    </Reveal>
  );
}
