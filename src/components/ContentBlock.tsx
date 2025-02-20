import { PrismicRichText } from "@prismicio/react"
import richTextStyling from "../components/utility/richTextSyling"

export default function ContentBlock({ children }: { children: any }) {
    return (
        <div className="blog__details">
            <PrismicRichText field={children} components={richTextStyling} />
        </div>
    )
}
