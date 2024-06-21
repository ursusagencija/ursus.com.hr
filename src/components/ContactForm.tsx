'use client'
import LocalizeText from './utility/LocalizeText'
import { useRouter } from 'next/navigation'

const ContactForm = () => {
    const router = useRouter();
    const handleValidation = (data: any) => {
        const errors = { email: '', name: '', phone: '', message: '' };

        if (!data.name) {
            errors.name = "Name is required";
        }

        if (!data.email) {
            errors.email = "Email is required";
        }

        if (!data.phone) {
            errors.phone = "Phone number is required";
        }

        if (!data.message) {
            errors.message = "Message is required";
        }

        return errors;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value,
        };

        const errors = handleValidation(data);

        if (errors.email === '' && errors.name === '' && errors.phone === '' && errors.message === '') {
            const res = await fetch("/api/sendmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            // console.log(result);
            if (!result.error) {
                router.push("/message-sent");
            }
        } else {
            // Handle validation errors, you can display them here if needed
        }
    };

    return (
        <div className="max-w-[870px] mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-base">
                    <div className="lg:col-span-1 col-span-2">
                        <input type="text" placeholder="Your Name" className="input_style__primary" name="name" required />
                    </div>
                    <div className="lg:col-span-1 col-span-2">
                        <input type="text" placeholder="Your Phone Number" className="input_style__primary" name="phone" required />
                    </div>
                    <div className="col-span-2">
                        <input type="email" placeholder="Your Email" className="input_style__primary" name="email" required />
                    </div>
                    <div className="col-span-2">
                        <textarea cols={30} rows={6} className="input_style__primary" placeholder="Your Message..." defaultValue={""} name="message" required />
                    </div>
                    <div className="col-span-2">
                        <button aria-label="contact submit" type="submit" className="btn_primary__v1" onClick={() => console.log('form submited')}>
                            <LocalizeText croatianText='Pošalji' englishText='Send' />
                            <i className="bi bi-chevron-right" />
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ContactForm