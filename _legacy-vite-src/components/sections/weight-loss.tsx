import { Link } from 'react-router-dom'
import { Compass, LineChart, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/gradient-button'

const bullets = [
  { icon: Users, text: 'ผู้ก่อตั้งและบริหาร BeSight' },
  { icon: Compass, text: 'ที่ปรึกษาด้านระบบและเครื่องมือการเทรด' },
  { icon: LineChart, text: 'พัฒนา Product และ Trading Technology' },
]

export function WeightLoss({ showButtons = true }: { showButtons?: boolean }) {
  return (
    <section id="weight-loss" className="bg-gray-50 py-20 md:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Behind BeSight
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Sen Padsakorn C.
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Chief Executive Officer of BeSight
          </p>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            ผู้ก่อตั้งและผู้พัฒนาแนวทางของ BeSight ดูแลตั้งแต่การวางระบบ
            เครื่องมือสำหรับเทรดเดอร์ ไปจนถึงการพัฒนาประสบการณ์ใช้งานของแพลตฟอร์ม
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {bullets.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                <span className="text-base text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>

          {showButtons && (
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/about">รู้จัก BeSight</Link>
              </Button>
              <GradientButton asChild>
                <Link to="/about">ดูวิสัยทัศน์</Link>
              </GradientButton>
            </div>
          )}
        </div>

        <img
          src="/images/homepage/ceofouder.jpg"
          alt="Sen Padsakorn C. — Chief Executive Officer of BeSight"
          className="aspect-square w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  )
}
