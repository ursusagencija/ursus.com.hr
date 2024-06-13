'use client'
import { usePathname } from "next/navigation"
export default function LocalizeText({ englishText, croatianText }: { englishText: string, croatianText: string }) {
    const locale = usePathname().split('/')[1]
    return (
        <>{locale === 'hr' ? croatianText : englishText}</>

    )
}


