import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import HeroSimple from "@/components/HeroSimple";
import ContactForm from "@/components/ContactForm";
import LocalizeText from "@/components/utility/LocalizeText";


export default async function Page({
    params: { lang },
}: {
    params: { lang: string };
}) {
    const client = createClient();
    const page = await client.getSingle("contact", {
        lang,
    });

    return (
        <>
            <HeroSimple heading={page.data.heading} image={page.data.image} />
            <div className="container py-12">
                <div className="text-center lg:pb-[60px] pb-[40px]">
                    <h5 className="section-sub-title-v1">Get in Touch</h5>
                    <h2 className="section-title-v1">Feel Free to Contact with us</h2>
                </div>
                <ContactForm />
                <div className="text-center lg:pb-[60px] pb-[40px] pt-12">
                    <h5 className="section-sub-title-v1">Our location</h5>
                    <h2 className="section-title-v1">Ursus Office</h2>
                </div>
                <iframe
                    title="Ursus Office"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.8240627009613!2d16.450875787863385!3d43.506005687458114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355f6d5f8af34f%3A0x135181278ed3b1da!2sUrsus%20Travel%20%26%20Accommodation!5e0!3m2!1sen!2shr!4v1718891419254!5m2!1sen!2shr"
                    style={{
                        border: 0,
                        width: "100%",
                        height: "450px",
                    }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="text-center lg:pb-[60px] </h2>pb-[40px] pt-12">
                    <h5 className="section-sub-title-v1"><LocalizeText englishText="Company Info" croatianText="Podaci o firmi" /></h5>
                    <h2 className="section-title-v1">Ursus j.d.o.o.</h2>

                    <p>Address: Dubrovačka 3a, 21000 Split</p>
                    <p>VAT Number: 51330644448</p>
                    <p>Tel: +385 91 200 4400 </p>
                    <p>Email: info@ursus.com.hr</p>
                    <p>CEO: Petar Ursić Glavanović</p>
                </div>
                <SliceZone slices={page.data.slices} components={components} />
            </div>
        </>
    );

}

export async function generateMetadata({
    params: { lang },
}: {
    params: { lang: string };
}): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("contact", { lang });

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}
