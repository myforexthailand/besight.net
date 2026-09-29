import { Link } from 'react-router-dom'
import { BookOpen, DollarSign, Gift, LayoutGrid, LineChart, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/gradient-button'

const features = [
  {
    icon: DollarSign,
    eyebrow: 'Rebate',
    title: 'Trade & Earn Back',
    description: 'รับรีเบตจากการเทรดผ่านบัญชีที่เปิดกับ BeSight',
  },
  {
    icon: LineChart,
    eyebrow: 'Trading Tools',
    title: 'Smart Trading Tools',
    description: 'เครื่องมือและ Indicator ที่ช่วยวิเคราะห์และวางแผนการเทรด',
  },
  {
    icon: LayoutGrid,
    eyebrow: 'BeSight Center',
    title: 'Everything in One Place',
    description: 'จัดการบัญชี สิทธิ์ และบริการต่าง ๆ ผ่านระบบเดียว',
  },
  {
    icon: BookOpen,
    eyebrow: 'Learning',
    title: 'Learn & Improve',
    description: 'ความรู้ แนวคิด และเนื้อหาสำหรับพัฒนาการเทรด',
  },
  {
    icon: Users,
    eyebrow: 'Community',
    title: 'Trade Together',
    description: 'พื้นที่พูดคุย แชร์มุมมอง และติดตามข้อมูลร่วมกับสมาชิก',
  },
  {
    icon: Gift,
    eyebrow: 'Member Benefits',
    title: 'More Than Trading',
    description: 'สิทธิประโยชน์ กิจกรรม และ BeSight Loyalty สำหรับสมาชิก',
  },
] as const

export function ScienceNature({ showButtons = true }: { showButtons?: boolean }) {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Why BeSight
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Everything Traders Need, Built Into One Ecosystem.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            From rebate and trading tools to learning, support, and member
            benefits - BeSight brings everything together in one place.
          </p>
          {showButtons && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <GradientButton asChild>
                <Link to="/about">Explore BeSight</Link>
              </GradientButton>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, eyebrow, title, description }) => (
            <div
              key={eyebrow}
              className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-[2px_4px_12px_rgba(0,0,0,0.08)]"
            >
              <Icon className="h-10 w-10" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
