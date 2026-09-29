import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/data/content'

export function Faq() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={`item-${i}`}
              className="rounded-3xl border-none bg-white px-6 py-8 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] sm:px-14"
            >
              <AccordionTrigger className="text-lg font-semibold sm:text-2xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground sm:text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
