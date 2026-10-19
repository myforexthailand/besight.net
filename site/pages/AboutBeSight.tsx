'use client'

import { SiteLayout } from '@/site/components/sections/site-layout'
import { HealthGuide } from '@/site/components/sections/health-guide'
import { ScienceNature } from '@/site/components/sections/science-nature'
import { ProductCarousel } from '@/site/components/sections/product-carousel'
import { WeightLoss } from '@/site/components/sections/weight-loss'
import { Button } from '@/site/components/ui/button'
import { ProductsGrid } from '@/site/components/sections/products-grid'
import { useT } from '@/site/lib/lang'

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 eyebrow">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-snug tracking-tight text-navy md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug">
        {title}
      </h2>
    </div>
  )
}

export function AboutBeSight() {
  const t = useT()
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-12 md:py-24">
        {/* Fixed-size artwork pinned to the right of a centred 1536px frame, so wide screens don't scale it up. */}
        {/* Mobile: no background artwork; the Be card sits above the heading instead. */}
        <div className="pointer-events-none absolute inset-0 flex justify-center max-md:hidden" aria-hidden>
          <div className="relative h-full w-full max-w-[1536px]">
            <img
              src="/images/about/about-hero-bg.webp"
              alt=""
              className="absolute right-0 top-1/2 h-auto w-[1440px] max-w-none -translate-y-1/2"
            />
          </div>
        </div>
        <div className="container relative">
          <img
            src="/images/about/about-be-card.webp"
            alt="BeSight"
            className="-mx-[10%] -mt-10 -mb-4 aspect-square w-[120%] max-w-none object-contain md:hidden"
          />
          <div className="max-w-[40rem]">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Technology Built Around the Trader.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {t(
              'BeSight คือผู้พัฒนา Trading Technology & Tools ที่มุ่งเปลี่ยนกระบวนการวิเคราะห์ตลาดที่ซับซ้อน ให้กลายเป็นระบบที่ชัดเจน เข้าใจง่าย และนำไปใช้งานได้จริง',
              'BeSight develops Trading Technology & Tools that turn the complex process of market analysis into a system that is clear, easy to understand, and practical to use.',
            )}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-zinc-600">
            {t(
              'เราออกแบบและพัฒนาเครื่องมือสำหรับแต่ละขั้นตอนของการเทรด ตั้งแต่การอ่าน Market Structure, Liquidity และ Price Action การค้นหาจังหวะเข้า ไปจนถึงการกำหนด Entry, Take Profit, Stop Loss และ Risk Management',
              'We design and build tools for every stage of trading, from reading Market Structure, Liquidity and Price Action, to finding entry timing, to defining Entry, Take Profit, Stop Loss and Risk Management.',
            )}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            {t(
              'เป้าหมายของ BeSight ไม่ใช่การสร้างเครื่องมือที่ตัดสินใจแทนเทรดเดอร์ แต่คือการสร้างเทคโนโลยีที่ช่วยให้เทรดเดอร์ เห็นข้อมูลสำคัญได้เร็วขึ้น วางแผนได้เป็นระบบมากขึ้น และตัดสินใจบนหลักเกณฑ์ที่ชัดเจน',
              "BeSight's goal is not to build tools that make decisions for traders, but to build technology that helps traders see key information faster, plan more systematically, and decide on clear criteria.",
            )}
          </p>
          <div className="my-7 h-px w-full bg-black/10" />
          <Button asChild>
            <a href="https://discord.gg/DkKc4P2sw" target="_blank" rel="noopener noreferrer">
              {t('เข้าร่วม Community', 'Join the Community')}
            </a>
          </Button>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <div className="flex w-full items-center justify-center px-6 pb-0 pt-3 md:p-5 md:pb-24">
        <section className="relative flex h-auto min-h-[22rem] w-full max-w-[1536px] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] py-10 md:h-[38rem] md:rounded-[3rem] md:py-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/images/homepage/loopabout.mp4"
            className="cover-fill"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex max-w-2xl flex-col items-center gap-3 px-5 text-center text-white md:gap-6 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 md:text-sm">
              Our Philosophy
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Analyze. Plan. Execute.
            </h2>
            <p className="text-[13px] leading-snug text-white/70 md:text-base md:leading-relaxed">
              {t(
                'เราเชื่อว่าการเทรดที่เป็นระบบไม่ได้เริ่มจากการหาสัญญาณให้ได้มากที่สุด แต่เริ่มจากการเข้าใจว่า ตลาดกำลังทำอะไร จุดไหนควรรอ จุดไหนมีเงื่อนไขสำหรับการเข้า และเรายอมรับความเสี่ยงได้เท่าไร นี่คือแนวคิดที่อยู่เบื้องหลังทุกเครื่องมือของ BeSight',
                'We believe systematic trading does not start with finding as many signals as possible, but with understanding what the market is doing, where to wait, where the conditions for entry are met, and how much risk we can accept. This is the thinking behind every BeSight tool.',
              )}
            </p>
            <p className="text-base font-semibold leading-snug tracking-tight md:text-2xl">
              See the Structure. Build the Plan. Execute with Clarity.
            </p>
          </div>
        </section>
      </div>

      {/* Mobile: photo sits right under the video card, at the same width */}
      <div className="-mt-6 md:mt-0">
        <WeightLoss showButtons={false} />
      </div>

      {/* Built as an Ecosystem */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Built as an Ecosystem"
            title={t('มากกว่า Indicator คือระบบเครื่องมือสำหรับการเทรด', 'More than an indicator: a complete toolset for trading')}
          />

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-zinc-600 md:text-base">
            {t(
              'BeSight พัฒนาเครื่องมือหลายรูปแบบเพื่อรองรับแนวคิดและสไตล์การเทรดที่แตกต่างกัน ไม่ว่าจะเป็น BeSight ONE STR, Power of 3 Execution Model, AMD Cycle, Orca MA และ CRT Execution โดยแต่ละระบบมีหน้าที่แตกต่างกัน แต่ถูกพัฒนาภายใต้แนวคิดเดียวกัน — ลดความซับซ้อน และทำให้ข้อมูลบนกราฟนำไปใช้ตัดสินใจได้ง่ายขึ้น',
              'BeSight builds a range of tools to support different trading approaches and styles, including BeSight ONE STR, Power of 3 Execution Model, AMD Cycle, Orca MA and CRT Execution. Each system serves a different purpose, but all are built on the same idea: reduce complexity and make chart data easier to act on.',
            )}
          </p>

          <ProductsGrid bare />
        </div>
      </section>

      <ScienceNature showButtons={false} />
      <ProductCarousel />
      <HealthGuide />
    </SiteLayout>
  )
}
