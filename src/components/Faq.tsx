import AccordionItem from "@/components/AccordionItem";
import Reveal from "@/components/Reveal";

export default function Faq({ faqList }: any) {
  return (
    <Reveal>
      <div className="accordion lg:space-y-6 space-y-5">
        {faqList.map((faq: any, index: number) => (
          <AccordionItem
            key={index}
            title={<span className="pl-1">{faq.question}</span>}
            defaultOpen={index === 0}
            summaryClassName="toggle px-5 py-3 leading-1.5 text-2md text-start w-full text-dark-1 font-serif font-semibold cursor-pointer flex items-center justify-between gap-4"
            panelClassName="px-5 pb-4"
          >
            <p className="text-base font-sans text-dark-3 leading-1.9">
              {faq.answer}
            </p>
          </AccordionItem>
        ))}
      </div>
    </Reveal>
  );
}
