'use client';
import { useState } from "react"

export default function PartialDiv({ children, className }: any) {
    const [partHidden, setPartHidden] = useState(true)
    const togglePart = () => {
        setPartHidden(!partHidden)
    }
    return (
        <>
            <div className={`${partHidden ? 'line-clamp-4' : ''} ${className}`}>
                {children}

            </div>
            <button onClick={togglePart} className="text-primary-1 underline decoration-dotted">{partHidden ? "Read more" : "Hide"}</button>
        </>
    )
}
