'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

import TestimonialDataOne from '@/constant/HomeOne/TestimonialDataOne';
import TestimonialCardOne from './ui/TestimonialCardOne';

import { Navigation} from "swiper/modules";


const TestimonialOne = () => {

    const navigation = {
        nextEl: ".testi-next",
        prevEl: ".testi-prev",
    }

    return (
        <div className="testimonial_style__one z-1 lg:pt-30 pt-24 relative">
            <div className="absolute top-[5%] left-[1%] max-w-[9%] z-minus lg:inline-block hidden">
                <img src="./assets/images/illustration/bird-illustration.png" alt="leaf" />
            </div>
            <div className="container relative">
                <div className="text-center lg:pb-[60px] pb-[40px]">
                    <h5 className="section-sub-title-v1">{TestimonialDataOne.sub_title}</h5>
                    <h2 className="section-title-v1">{TestimonialDataOne.Title}</h2>
                </div>

                <Swiper 
                     slidesPerView={1}
                     spaceBetween={30}
                     loop={true}
                     navigation={navigation}
                     modules={[Navigation]}
                >
                    {TestimonialDataOne.testimonials.map((item)=>(
                        <SwiperSlide key={item.id}>
                            <TestimonialCardOne 
                                review_desc={item.review_desc}
                                reviewer={item.reviewer}
                                avater={item.avater}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                 <div className="hidden cursor-pointer testi-prev lg:inline-block absolute max-w-[70px] right-0 top-1/2 -translate-y-1/2 translate-x-full group text-primary-1">
                    <svg width={79} height={50} viewBox="0 0 79 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx={25} cy={25} r="24.25" transform="matrix(1 0 0 -1 29 50)" stroke="currentColor" strokeWidth="1.5" />
                        <path className="group-hover:translate-x-2 duration-200" d="M1 25.75C0.585786 25.75 0.25 25.4142 0.25 25C0.25 24.5858 0.585786 24.25 1 24.25L1 25.75ZM58.5303 24.4697C58.8232 24.7626 58.8232 25.2374 58.5303 25.5303L53.7574 30.3033C53.4645 30.5962 52.9896 30.5962 52.6967 30.3033C52.4038 30.0104 52.4038 29.5355 52.6967 29.2426L56.9393 25L52.6967 20.7574C52.4038 20.4645 52.4038 19.9896 52.6967 19.6967C52.9896 19.4038 53.4645 19.4038 53.7574 19.6967L58.5303 24.4697ZM1 24.25L58 24.25L58 25.75L1 25.75L1 24.25Z" fill="currentColor" />
                    </svg>
                </div>
                <div className="hidden cursor-pointer testi-next lg:inline-block absolute max-w-[70px] text-primary-1 left-0 top-1/2 -translate-y-1/2 -translate-x-full group">
                    <svg width={79} height={50} viewBox="0 0 79 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx={25} cy={25} r="24.25" transform="rotate(-180 25 25)" stroke="currentColor" strokeWidth="1.5" />
                        <path className="group-hover:-translate-x-2 duration-200" d="M78 25.75C78.4142 25.75 78.75 25.4142 78.75 25C78.75 24.5858 78.4142 24.25 78 24.25L78 25.75ZM20.4697 24.4697C20.1768 24.7626 20.1768 25.2374 20.4697 25.5303L25.2426 30.3033C25.5355 30.5962 26.0104 30.5962 26.3033 30.3033C26.5962 30.0104 26.5962 29.5355 26.3033 29.2426L22.0607 25L26.3033 20.7574C26.5962 20.4645 26.5962 19.9896 26.3033 19.6967C26.0104 19.4038 25.5355 19.4038 25.2426 19.6967L20.4697 24.4697ZM78 24.25L21 24.25L21 25.75L78 25.75L78 24.25Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
        </div>

    );
}

export default TestimonialOne;