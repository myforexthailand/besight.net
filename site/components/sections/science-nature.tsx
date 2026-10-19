'use client'

import { Link } from '@/site/lib/router'
import { BookOpen, DollarSign, Gift, LayoutGrid, LineChart, Users } from 'lucide-react'

import { GradientButton } from '@/site/components/ui/gradient-button'
import { useT } from '@/site/lib/lang'

const features = [
  {
    icon: DollarSign,
    eyebrow: 'Rebate',
    title: 'Trade & Earn Back',
    description: 'รับรีเบตจากการเทรดผ่านบัญชีที่เปิดกับ BeSight',
    en: 'Earn rebates on your trades through accounts opened with BeSight',
  },
  {
    icon: LineChart,
    eyebrow: 'Trading Tools',
    title: 'Smart Trading Tools',
    description: 'เครื่องมือและ Indicator ที่ช่วยวิเคราะห์และวางแผนการเทรด',
    en: 'Tools and indicators that help you analyze and plan your trades',
  },
  {
    icon: LayoutGrid,
    eyebrow: 'BeSight Center',
    title: 'Everything in One Place',
    description: 'จัดการบัญชี สิทธิ์ และบริการต่าง ๆ ผ่านระบบเดียว',
    en: 'Manage your accounts, entitlements, and services through a single system',
  },
  {
    icon: BookOpen,
    eyebrow: 'Learning',
    title: 'Learn & Improve',
    description: 'ความรู้ แนวคิด และเนื้อหาสำหรับพัฒนาการเทรด',
    en: 'Knowledge, concepts, and content to help you improve your trading',
  },
  {
    icon: Users,
    eyebrow: 'Community',
    title: 'Trade Together',
    description: 'พื้นที่พูดคุย แชร์มุมมอง และติดตามข้อมูลร่วมกับสมาชิก',
    en: 'A space to chat, share perspectives, and follow market insights with fellow members',
  },
  {
    icon: Gift,
    eyebrow: 'Member Benefits',
    title: 'More Than Trading',
    description: 'สิทธิประโยชน์ กิจกรรม และ BeSight Loyalty สำหรับสมาชิก',
    en: 'Benefits, events, and BeSight Loyalty for members',
  },
] as const

export function ScienceNature({ showButtons = true }: { showButtons?: boolean }) {
  const t = useT()
  return (
    <section className="bg-gray-50 py-10 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-left md:max-w-5xl md:text-center">
          <p className="mb-3 eyebrow">
            Why BeSight
          </p>
          <h2 className="section-title text-2xl md:text-4xl lg:text-5xl">
            {t('รวมทุกสิ่งที่เทรดเดอร์ต้องการ', 'Everything traders need, in one ecosystem')}
          </h2>
          <p className="mt-3 text-justify text-sm leading-snug text-muted-foreground md:mt-4 md:text-center md:text-base md:leading-normal">
            {t(
              'ตั้งแต่ Rebate, เครื่องมือช่วยเทรด, การเรียนรู้, การสนับสนุน ไปจนถึงสิทธิประโยชน์สำหรับสมาชิก BeSight รวมทุกองค์ประกอบสำคัญไว้ในที่เดียว เพื่อให้การเทรดเป็นเรื่องที่สะดวก เป็นระบบ และต่อเนื่องมากขึ้น',
              'From Rebate, trading tools, learning, and support to member benefits, BeSight brings every key element together in one place, making trading more convenient, structured, and consistent.',
            )}
          </p>
          {showButtons && (
            <div className="mt-5 flex flex-wrap justify-start gap-4 md:mt-8 md:justify-center">
              <GradientButton asChild>
                <Link to="/about">Explore BeSight</Link>
              </GradientButton>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-16 md:gap-4 lg:grid-cols-3">
          {features.map(({ icon: Icon, eyebrow, title, description, en }) => (
            <div
              key={eyebrow}
              className="flex items-start gap-3 surface p-4 md:flex-col md:gap-4 md:p-8"
            >
              <Icon className="h-7 w-7 shrink-0 md:h-10 md:w-10" strokeWidth={1.5} />
              <div>
                <p className="eyebrow text-[11px] md:text-xs">
                  {eyebrow}
                </p>
                <h3 className="mt-1 text-base font-semibold md:mt-2 md:text-xl">{title}</h3>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground md:mt-2 md:text-sm md:leading-normal">{t(description, en)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
