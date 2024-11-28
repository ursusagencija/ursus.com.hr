import { PrismicNextImage } from '@prismicio/next'
import React from 'react'

export default function HeroSimple({ image, heading, children }: { image: any, heading: any, children?: any }) {
    return (
        <div className="relative">

            <PrismicNextImage
                field={image}
                fill
                priority // High fetch priority for LCP
                sizes="(max-width: 768px) 100vw, 
               (max-width: 1200px) 50vw, 
               33vw" // Responsive sizes
                style={{ objectFit: 'cover' }} // Ensure it covers the container
            />
            <div className="pb-28 lg:pb-24 lg:pt-[260px] pt-28 relative z-3">
                <div className="container">
                    <div className="max-w-[900px] mx-auto text-center text-white pb-20 md:pb-28">
                        <h1 className="xl:text-7xl lg:text-4xl text-3xl font-semibold leading-1.2 "><>{heading}</></h1>
                        <div className="max-w-[700px] mx-auto">
                        </div>
                    </div>
                </div>
                <div>{children}</div>
            </div>
            <div className='absolute inset-0 from-primary-1/40 to-primary-1/30 bg-gradient-to-r' />

        </div>
    )
}
