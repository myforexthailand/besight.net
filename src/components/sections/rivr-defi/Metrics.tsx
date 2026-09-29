import { motion } from 'motion/react'

const METRICS: { value: string; label: string | string[] }[] = [
  { value: 'REBATE', label: ['เทรดอย่างคุ้มค่า', 'รับสิทธิประโยชน์มากขึ้น'] },
  { value: 'TOOLS', label: ['เทคโนโลยีเพื่อ', 'การเทรดที่เหนือกว่า'] },
  { value: 'CENTER', label: ['ครบทุกบริการ', 'ในบัญชีเดียว'] },
  { value: 'LEARN', label: ['ความรู้และ', 'ข้อมูลเชิงลึกของตลาด'] },
]

export function Metrics() {
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
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5E6470]">
                {metric.value}
              </span>
              <span className="text-base font-semibold text-[#0B1B3B] md:text-lg lg:text-2xl">
                {Array.isArray(metric.label)
                  ? metric.label.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  : metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
