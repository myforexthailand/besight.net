'use client'

import { motion } from 'motion/react'

import { useSiteLang } from '@/site/lib/lang'

const METRICS: { value: string; label: [string[], string[]] }[] = [
  { value: 'REBATE', label: [['เทรดอย่างคุ้มค่า', 'รับสิทธิประโยชน์มากขึ้น'], ['Trade smarter,', 'earn more benefits']] },
  { value: 'TOOLS', label: [['เทคโนโลยีเพื่อ', 'การเทรดที่เหนือกว่า'], ['Technology for', 'a trading edge']] },
  { value: 'CENTER', label: [['ครบทุกบริการ', 'ในบัญชีเดียว'], ['Every service,', 'one account']] },
  { value: 'LEARN', label: [['ความรู้และ', 'ข้อมูลเชิงลึกของตลาด'], ['Knowledge and', 'market insights']] },
]

export function Metrics() {
  const { lang } = useSiteLang()
  return (
    <section className="mx-auto w-full max-w-[1536px] px-3 py-6 md:px-5 md:py-12">
      <div className="rounded-[1.5rem] border border-[rgba(30,50,90,0.05)] bg-[rgba(30,50,90,0.02)] p-6 md:rounded-[2rem] md:p-10 lg:rounded-[3rem] lg:p-16">
        <div className="grid grid-cols-2 divide-x divide-y divide-[rgba(30,50,90,0.1)] md:grid-cols-4 md:divide-y-0">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 px-2 py-4 text-center md:px-3 md:py-5 lg:px-4 lg:py-6"
            >
              <span className="eyebrow text-xs text-steel">
                {metric.value}
              </span>
              <span className="text-base font-semibold text-navy md:text-lg lg:text-2xl">
                {metric.label[lang === 'en' ? 1 : 0].map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
