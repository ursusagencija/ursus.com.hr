import React from 'react'


export default function Faq({ faqList }: any) {
    return (
        <div className="accordion lg:space-y-6 space-y-5">

            {
                faqList.map((faq: any, index: number) => (<details
                    key={index}
                    className="single__accordion border border-stock-1"
                >
                    <summary className="toggle px-5 py-3 leading-1.5 text-2md text-start w-full text-dark-1 font-serif font-semibold cursor-pointer"><span className='pl-1'>{faq.question}</span></summary>
                    <p className="text-base font-sans text-dark-3 leading-1.9  px-5">
                        {faq.answer}
                    </p>
                </details>



                )
                )
            }



        </div>
    )

}
