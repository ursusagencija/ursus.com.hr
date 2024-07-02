import Image from "next/image"
import LinkBuilderWithLocale from "./utility/LinkBuilderWithLocale"

export default function Services({ data }: any) {
    return (
        <div className="tour_type_style__one lg:pt-30 pt-24 relative z-1 ">

            <div className="container">
                <div className="text-center lg:pb-[60px] pb-[40px]">
                    <h5 className="section-sub-title-v1">{data.heading}</h5>
                    <h2 className="section-title-v1">{data.overtitle}</h2>
                </div>
                <div className="grid md:grid-cols-4 gap-base">


                    <LinkBuilderWithLocale path={data.service1_link.url}>

                        <div className="group/card package-card-style-one wow fadeInUp overflow-hidden">
                            <div className="overflow-hidden relative h-64">
                                <Image
                                    fill


                                    src={data.service1_image.url}
                                    alt={data.service1_heading}
                                    style={{ objectFit: "cover" }}
                                    className="w-full group-hover/card:scale-105 duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        <h4 className="card-title-alpha  mt-2">{data.service1_heading}</h4>
                        {/* <h5 className="font-sans font-medium text-md text-primary-1 mt-1">{item.tour_count} Tours+</h5> */}
                        <p className="regular-text-v1 !text-[17px] mt-1 !leading-1.6">{data.service1_subtitle}</p>
                    </LinkBuilderWithLocale>
                    <LinkBuilderWithLocale path={data.service2_link.url}>

                        <div className="group/card package-card-style-one wow fadeInUp overflow-hidden">
                            <div className="overflow-hidden relative h-64">
                                <Image
                                    fill


                                    src={data.service2_image.url}
                                    alt={data.service2_heading}
                                    style={{ objectFit: "cover" }}
                                    className="w-full group-hover/card:scale-105 duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        <h4 className="card-title-alpha  mt-2">{data.service2_heading}</h4>
                        {/* <h5 className="font-sans font-medium text-md text-primary-1 mt-1">{item.tour_count} Tours+</h5> */}
                        <p className="regular-text-v1 !text-[17px] mt-1 !leading-1.6">{data.service2_subtitle}</p>
                    </LinkBuilderWithLocale>
                    <a href={data.service3_link.url} target="_blank">

                        <div className="group/card package-card-style-one wow fadeInUp overflow-hidden">
                            <div className="overflow-hidden relative h-64">
                                <Image
                                    fill


                                    src={data.service3_image.url}
                                    alt={data.service3_heading}
                                    style={{ objectFit: "cover" }}
                                    className="w-full group-hover/card:scale-105 duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        <h4 className="card-title-alpha  mt-2">{data.service3_heading}</h4>
                        {/* <h5 className="font-sans font-medium text-md text-primary-1 mt-1">{item.tour_count} Tours+</h5> */}
                        <p className="regular-text-v1 !text-[17px] mt-1 !leading-1.6">{data.service3_subtitle}</p>
                    </a>
                    <LinkBuilderWithLocale path={data.service4_link.url}>

                        <div className="group/card package-card-style-one wow fadeInUp overflow-hidden">
                            <div className="overflow-hidden relative h-64">
                                <Image
                                    fill


                                    src={data.service4_image.url}
                                    alt={data.service4_heading}
                                    style={{ objectFit: "cover" }}
                                    className="w-full group-hover/card:scale-105 duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                        <h4 className="card-title-alpha  mt-2">{data.service4_heading}</h4>
                        {/* <h5 className="font-sans font-medium text-md text-primary-1 mt-1">{item.tour_count} Tours+</h5> */}
                        <p className="regular-text-v1 !text-[17px] mt-1 !leading-1.6">{data.service4_subtitle}</p>
                    </LinkBuilderWithLocale>
                </div>


            </div>
        </div>

    )
}
