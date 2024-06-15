import LinkBuilderWithLocale from "@/components/utility/LinkBuilderWithLocale";
import Image from "next/image";
import Link from "next/link";

const Card = (
    { img, title = "Heading", discount, bedrooms = 0, price, people, href = "", duration, tour, location }:
        {
            img: string,
            title: string,
            discount?: string,
            bedrooms?: number,
            price?: string,
            people?: string | number,
            href?: string,
            duration?: string
            tour?: boolean
            location?: string
        }

) => {
    return (

        <LinkBuilderWithLocale path={href}>
            <div className="group/card package-card-style-one wow fadeInUp overflow-hidden">
                <div className="overflow-hidden relative h-64">
                    <Image
                        fill
                        // width={400}
                        // height={300}

                        src={img}
                        alt={title}
                        style={{ objectFit: "cover" }}
                        className="w-full group-hover/card:scale-105 duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    {discount && <span className="absolute inline-block top-5 right-5 text-sm text-white rounded-full bg-[#219FFF] py-1 px-3">{discount}%
                        off</span>}
                </div>
                <h3 className="card-title-alpha group-hover/card:text-primary-1 lg:mt-6 mt-5">
                    {title}
                </h3>
                <ul className="flex flex-wrap text-[13px] font-medium text-dark-2 mt-4 package-feature">

                    {!tour && (<> <li>
                        <span className="text-primary-1">
                            <i className="bi bi-people" />
                        </span>
                        <span>{people} People</span>
                    </li>
                        <li>
                            <span className="text-primary-1">
                                <i className="bi bi-usb-mini" />
                            </span>
                            <span>{bedrooms == 0 ? "Studio Apartment" : bedrooms + " Bedrooms"}</span>
                        </li>
                    </>)}

                    {tour && (
                        <>
                            <li>

                                <span className="text-primary-1">
                                    <i className="bi bi-pin" />
                                </span>
                                <span>{location}</span>
                            </li>
                            <li>
                                <span className="text-primary-1">
                                    <i className="bi bi-clock" />
                                </span>
                                <span>{duration}</span>
                            </li>
                        </>)}


                    <li>
                        <span className="text-primary-1">
                            <i className="bi bi-coin" />
                        </span>
                        <span>From <span className="text-primary-1 font-bold">€{price}</span></span>
                    </li>
                </ul>
                {/* <Link href="/package-details" className="package-explore-btn group/btn">
                    <span className="mr-2">Explore Now</span>
                    <svg className="group-hover/btn:translate-x-2 duration-200 " width={27} height={14} viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.217443 6.25H18.4827C18.6276 6.25 18.7001 6.30263 18.7001 6.40789V7.59211C18.7001 7.69737 18.6276 7.75 18.4827 7.75H0.217443C0.0724811 7.75 0 7.69737 0 7.59211V6.40789C0 6.30263 0.0724811 6.25 0.217443 6.25Z" fill="currentColor" />
                        <path d="M20.7001 12.28L25.0467 7.9333C25.5601 7.41997 25.5601 6.57997 25.0467 6.06664L20.7001 1.71997" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link> */}
            </div>
        </LinkBuilderWithLocale >
    );
}

export default Card;