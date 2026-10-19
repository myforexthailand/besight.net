'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/site/components/ui/accordion'
import { useSiteData } from '@/site/lib/site-data'
import { useSiteLang } from '@/site/lib/lang'

export function Faq() {
  const { faqs } = useSiteData().content
  const en = useSiteLang().lang === 'en'
  return (
    <section className="bg-gray-50 py-10 md:py-28">
      <div className="container max-w-3xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-4xl">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="mt-6 space-y-2.5 sm:mt-12 sm:space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={`item-${i}`}
              className="rounded-2xl border-none bg-white px-4 py-3.5 shadow-soft sm:rounded-3xl sm:px-14 sm:py-8"
            >
              <AccordionTrigger className="text-base font-semibold leading-snug max-sm:text-[15px] sm:text-2xl sm:leading-normal [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-6 sm:[&>svg]:w-6">
                {en && faq.questionEn ? faq.questionEn : faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-sm leading-snug text-muted-foreground sm:pt-4 sm:text-lg sm:leading-normal">
                {en && faq.answerEn ? faq.answerEn : faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
