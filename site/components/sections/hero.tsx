'use client'

import { ArrowRight, DollarSign, Users, Zap } from 'lucide-react'

import { Button } from '@/site/components/ui/button'
import { CodeBadge } from '@/site/components/ui/code-badge'
import { useT } from '@/site/lib/lang'

const features = [
  { icon: Zap, th: 'เครื่องมือวิเคราะห์สำหรับการเทรด', en: 'Analysis tools for trading' },
  { icon: DollarSign, th: 'รับสิทธิประโยชน์และเงินคืนจากการเทรด', en: 'Earn benefits and cashback from your trades' },
  { icon: Users, th: 'Community และข้อมูลสำหรับสมาชิก', en: 'Community and member-only insights' },
]

export function Hero({
  id = 'hero',
  fade = 'f0',
  bgImage,
}: { id?: string; fade?: 'f0' | 'gray50'; bgImage?: string } = {}) {
  const t = useT()
  return (
    <section id={id} className="relative scroll-mt-24 overflow-hidden">
      {bgImage ? (
        // A still image replaces the video (its own white fade already suits the text side).
        <img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-right max-md:hidden"
        />
      ) : (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/homepage/hero-bg.webp"
            src="/images/homepage/hero-bg.mp4"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-right max-md:hidden"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent lg:via-transparent max-md:hidden" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent max-md:hidden" />
        </>
      )}
      <div
        className={`pointer-events-none absolute inset-x-0 -bottom-px h-56 max-md:hidden bg-gradient-to-t from-5% to-transparent ${
          fade === 'gray50' ? 'from-gray-50 via-gray-50/70' : 'from-[#F0F0F0] via-[#F0F0F0]/70'
        }`}
      />
      <div className="container relative py-10 md:py-20">
        <div className="max-w-xl lg:max-w-[40rem]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-soft">
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

          <h1 className="text-[2.75rem] font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Trade Smarter.
            <br />
            See Beyond.
          </h1>

          <p className="mt-5 max-w-xl text-[0.9375rem] leading-snug text-muted-foreground md:mt-6 md:text-lg md:leading-normal">
            {t('เครื่องมือสำหรับเทรดเดอร์ พร้อมสิทธิประโยชน์เงินคืน', 'Tools for traders, with cashback benefits')}
            <br />
            {t('และ Community ที่ช่วยให้คุณเห็นตลาดชัดขึ้น', 'and a community that helps you see the market clearly')}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 md:mt-8 md:gap-4">
            {features.map(({ icon: Icon, th, en }) => (
              <div key={en} className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-foreground md:h-5 md:w-5" strokeWidth={1.5} />
                <span className="text-sm text-muted-foreground md:text-base">{t(th, en)}</span>
              </div>
            ))}
          </div>

          <div className="my-8 h-px w-full bg-border" />

          <div className="flex flex-wrap items-center gap-3 xl:gap-6">
            <div className="w-full shrink-0 md:w-auto">
              <span className="text-3xl font-bold">
                $18.00<span className="text-base font-medium">/Lot</span>
              </span>
              <p className="text-sm text-muted-foreground">{t('รับรีเบตเงินคืนสูงสุด', 'Maximum rebate cashback')}</p>
            </div>
            <Button
              size="lg"
              asChild
              className="h-11 flex-1 whitespace-nowrap px-3 text-sm md:flex-none md:px-5 xl:h-14 xl:px-8 xl:text-base"
            >
              <a href="https://affs.click/CHg1N" target="_blank" rel="noopener noreferrer">
                {t('เปิดบัญชีเทรด XM', 'Open XM Account')}
              </a>
            </Button>
            <CodeBadge
              className="flex-1 md:flex-none"
              innerClassName="h-11 whitespace-nowrap px-3 text-sm md:px-5 xl:h-14 xl:px-8 xl:text-base"
            />
          </div>

          <a
            href="https://affs.click/CHg1N"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center gap-4 rounded-3xl bg-white p-4 shadow-soft transition-shadow hover:shadow-lg"
          >
            <img
              src="/images/xm-squre.jpg"
              alt=""
              className="h-16 w-16 shrink-0 rounded-2xl object-cover"
            />
            <span className="flex-1 leading-tight">
              <span className="block text-base font-medium">
                {t('มีบัญชี XM อยู่แล้ว?', 'Already have an XM account?')}
              </span>
              <span className="block text-sm text-muted-foreground">
                {t('เชื่อมบัญชีกับ BeSight เพื่อรับสิทธิประโยชน์', 'Link your account with BeSight to get benefits')}
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  )
}
