import LocalizeText from "@/components/utility/LocalizeText";

export const metadata = {
    title: "Message Sucessfully Sent - Ursus Travel & Accommodation",
    description: "Message successfully sent. We will be in contact shortly.",
    robots: {
        index: false,
        follow: false,
    },
};
export default function page() {
    return (

        <div className="py-32 min-h-[50vh] container">
            <h1 className="text-center font-semibold text-2xl font-display">
                <LocalizeText croatianText="Poruka uspješno poslana" englishText="Message Successfully Sent" />
            </h1>
            <p className="text-center">
                <LocalizeText croatianText="Uskoro ćemo vam se javiti." englishText="We will be in contact shortly." />
            </p>
        </div>

    );
}