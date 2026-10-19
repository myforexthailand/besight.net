import { ArrowRight, DollarSign, Users, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CodeBadge } from '@/components/ui/code-badge'
import { GlassyOrb } from '@/components/sections/taskly-hero/GlassyOrb'

const features = [
  { icon: Zap, text: 'เครื่องมือวิเคราะห์สำหรับการเทรด' },
  { icon: DollarSign, text: 'รับสิทธิประโยชน์และเงินคืนจากการเทรด' },
  { icon: Users, text: 'Community และข้อมูลสำหรับสมาชิก' },
]

export function Hero() {
  return (
    <section className="container py-12 md:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-[2px_4px_12px_rgba(0,0,0,0.08)]">
            <span
              className="material-symbols-outlined text-3xl text-green-500"
              aria-hidden="true"
            >
              check_circle
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Trader Ecosystem</span>
              <span className="text-xs text-muted-foreground">
                Tools &bull; Rebate &bull; Community
              </span>
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Trade Smarter.
            <br />
            See Beyond.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            เครื่องมือสำหรับเทรดเดอร์ พร้อมสิทธิประโยชน์เงินคืน
            <br />
            และ Community ที่ช่วยให้คุณเห็นตลาดชัดขึ้น
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
                <span className="text-base text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>

          <div className="my-8 h-px w-full bg-border" />

          <div className="flex flex-wrap items-center gap-3 xl:gap-6">
            <div className="shrink-0">
              <span className="text-3xl font-bold">
                $18.00<span className="text-base font-medium">/Lot</span>
              </span>
              <p className="text-sm text-muted-foreground">รับรีเบตเงินคืนสูงสุด</p>
            </div>
            <Button
              size="lg"
              asChild
              className="h-11 whitespace-nowrap px-5 text-sm xl:h-14 xl:px-8 xl:text-base"
            >
              <a href="https://affs.click/CHg1N" target="_blank" rel="noopener noreferrer">
                เปิดบัญชีเทรด XM
              </a>
            </Button>
            <CodeBadge innerClassName="h-11 whitespace-nowrap px-5 text-sm xl:h-14 xl:px-8 xl:text-base" />
          </div>

          <a
            href="#products"
            className="mt-8 flex items-center gap-4 rounded-3xl bg-white p-4 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-lg"
          >
            <img
              src="/images/xm-squre.jpg"
              alt=""
              className="h-16 w-16 shrink-0 rounded-2xl object-cover"
            />
            <span className="flex-1 leading-tight">
              <span className="block text-base font-medium">
                มีบัญชี XM อยู่แล้ว?
              </span>
              <span className="block text-sm text-muted-foreground">
                เชื่อมบัญชีกับ BeSight เพื่อรับสิทธิประโยชน์
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0" />
          </a>
        </div>

        <div className="relative hidden h-[640px] overflow-hidden rounded-2xl lg:block">
          <GlassyOrb />

          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}
