'use client'

import { useT } from '@/site/lib/lang'

const LINK_COLUMNS = [
  {
    title: 'How It Works',
    links: [
      { th: 'เลือกประเภทบัญชี', en: 'Choose your account type' },
      { th: 'เลือกคู่เทรด', en: 'Choose your trading pair' },
      { th: 'ใส่จำนวน Lot', en: 'Enter your Lot size' },
      { th: 'ระบบคำนวณรีเบตโดยประมาณให้ทันที', en: 'Get an instant estimated rebate' },
    ],
  },
  {
    title: 'Supported',
    links: [
      { th: 'Standard', en: 'Standard' },
      { th: 'Micro', en: 'Micro' },
      { th: 'Ultra Low Standard', en: 'Ultra Low Standard' },
      { th: 'Ultra Low Micro', en: 'Ultra Low Micro' },
    ],
  },
  {
    title: 'Important Notes',
    links: [
      { th: 'ตัวเลขที่แสดงเป็นค่าประมาณ', en: 'Figures shown are estimates' },
      {
        th: 'รีเบตจริงอาจแตกต่างตามประเภทบัญชีและคู่เทรด',
        en: 'Actual rebates may vary by account type and trading pair',
      },
      { th: 'เงื่อนไขเป็นไปตามบริษัทกำหนด', en: 'Terms and conditions are set by the broker' },
      {
        th: 'กรุณาเปิดบัญชีผ่านลิงก์ BeSight เพื่อรับสิทธิ์',
        en: 'Please open your account through the BeSight link to qualify',
      },
    ],
  },
]

export function Footer() {
  const t = useT()
  return (
    <div className="mx-auto w-full max-w-[1536px] px-3 pb-10 md:px-5 md:pb-16">
      <div className="grid grid-cols-1 gap-5 rounded-[1.5rem] bg-white p-5 shadow-[0_1px_2px_rgba(11,27,59,0.04)] md:grid-cols-4 md:gap-10 md:rounded-[2rem] md:p-10">
        <div className="md:col-span-1">
          <p className="text-base font-semibold text-navy md:text-lg">BeSight Rebate Calculator</p>
          <p className="mt-2 text-[13px] leading-snug text-steel md:mt-3 md:text-sm md:leading-normal">
            {t(
              'คำนวณรีเบตโดยประมาณจากประเภทบัญชี คู่เทรด และจำนวน Lot ได้ง่าย ๆ ช่วยให้คุณเห็นภาพผลตอบแทนก่อนเริ่มเทรดกับ BeSight',
              'Easily estimate your rebate from account type, trading pair and Lot size. See your potential returns before you start trading with BeSight.',
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:col-span-3 md:gap-8">
          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/70 md:text-xs">
                {col.title}
              </p>
              <div
                className={`mt-2 gap-1.5 md:mt-4 md:flex md:flex-col md:gap-2.5 ${
                  col.title === 'Supported' ? 'grid grid-cols-2 gap-x-3' : 'flex flex-col'
                }`}
              >
                {col.links.map((link, rowIndex) =>
                  col.title === 'How It Works' ? (
                    <span key={link.th} className="text-[13px] leading-snug text-steel md:text-sm md:leading-normal">
                      {rowIndex + 1}. {t(link.th, link.en)}
                    </span>
                  ) : (
                    <span key={link.th} className="text-[13px] leading-snug text-steel md:text-sm md:leading-normal">
                      {t(link.th, link.en)}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
