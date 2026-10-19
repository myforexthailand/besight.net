'use client'

import { Link } from '@/site/lib/router'
import { Compass, LineChart, Users } from 'lucide-react'

import { Button } from '@/site/components/ui/button'
import { GradientButton } from '@/site/components/ui/gradient-button'
import { useT } from '@/site/lib/lang'

const bullets = [
  { icon: Users, text: 'ผู้ก่อตั้งและบริหาร BeSight', en: 'Founder and manager of BeSight' },
  { icon: Compass, text: 'ที่ปรึกษาด้านระบบและเครื่องมือการเทรด', en: 'Advisor on trading systems and tools' },
  { icon: LineChart, text: 'พัฒนา Product และ Trading Technology', en: 'Develops Product and Trading Technology' },
]

export function WeightLoss({ showButtons = true }: { showButtons?: boolean }) {
  const t = useT()
  return (
    <section id="weight-loss" className="bg-gray-50 py-10 md:py-28">
      <div className="container grid items-center gap-6 md:gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">
            Behind BeSight
          </p>
          <h2 className="mt-2 text-[2rem] font-semibold leading-[1.05] md:mt-3 md:text-5xl tracking-tight lg:text-6xl">
            Sen Padsakorn C.
          </h2>
          <p className="mt-1 text-base text-muted-foreground md:mt-2 md:text-lg">
            Chief Executive Officer of BeSight
          </p>
          <p className="mt-3 max-w-md text-sm leading-snug text-muted-foreground md:mt-4 md:text-base md:leading-normal">
            {t(
              'ผู้ก่อตั้งและผู้พัฒนาแนวทางของ BeSight ดูแลตั้งแต่การวางระบบ เครื่องมือสำหรับเทรดเดอร์ ไปจนถึงการพัฒนาประสบการณ์ใช้งานของแพลตฟอร์ม',
              "Founder and architect of BeSight's vision, overseeing everything from system design and trader tools to the platform's user experience.",
            )}
          </p>

          <div className="mt-5 flex flex-col gap-2.5 md:mt-8 md:gap-4">
            {bullets.map(({ icon: Icon, text, en }) => (
              <div key={text} className="flex items-center gap-2.5 md:gap-3">
                <Icon className="h-4 w-4 shrink-0 md:h-5 md:w-5" strokeWidth={1.5} />
                <span className="text-[13px] leading-snug text-muted-foreground md:text-base md:leading-normal">{t(text, en)}</span>
              </div>
            ))}
          </div>

          {showButtons && (
            <div className="mt-6 flex flex-wrap gap-3 md:mt-10 md:gap-4">
              <Button size="lg" asChild className="h-10 px-5 text-sm md:h-12 md:px-8 md:text-base">
                <Link to="/about">{t('รู้จัก BeSight', 'About BeSight')}</Link>
              </Button>
              <GradientButton asChild>
                <Link to="/about">{t('ดูวิสัยทัศน์', 'Our Vision')}</Link>
              </GradientButton>
            </div>
          )}
        </div>

        <img
          src="/images/homepage/ceofouder.jpg"
          alt="Sen Padsakorn C. — Chief Executive Officer of BeSight"
          className="order-first aspect-square w-full rounded-2xl object-cover lg:order-none"
        />
      </div>
    </section>
  )
}
