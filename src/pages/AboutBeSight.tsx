import { SiteLayout } from '@/components/sections/site-layout'
import { HealthGuide } from '@/components/sections/health-guide'
import { ScienceNature } from '@/components/sections/science-nature'
import { ProductCarousel } from '@/components/sections/product-carousel'
import { WeightLoss } from '@/components/sections/weight-loss'

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-snug tracking-tight text-[#0B1B3B] md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug">
        {title}
      </h2>
    </div>
  )
}

const ECOSYSTEM_TOOLS = ['BeSight ONE.STR', 'Power of 3 Execution Model', 'AMD Cycle', 'Orca MA', 'CRT Execution']

export function AboutBeSight() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container max-w-5xl text-center">
          <img
            src="/images/besight-icon.png"
            alt="BeSight"
            className="mx-auto h-24 w-auto md:h-32"
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            รู้จัก BeSight
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-[#0B1B3B] md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug">
            Technology Built Around the Trader.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
            BeSight คือผู้พัฒนา Trading Technology &amp; Tools ที่มุ่งเปลี่ยนกระบวนการวิเคราะห์ตลาดที่ซับซ้อน
            ให้กลายเป็นระบบที่ชัดเจน เข้าใจง่าย และนำไปใช้งานได้จริง
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
            เราออกแบบและพัฒนาเครื่องมือสำหรับแต่ละขั้นตอนของการเทรด ตั้งแต่การอ่าน Market Structure, Liquidity
            และ Price Action การค้นหาจังหวะเข้า ไปจนถึงการกำหนด Entry, Take Profit, Stop Loss และ Risk
            Management
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
            เป้าหมายของ BeSight ไม่ใช่การสร้างเครื่องมือที่ตัดสินใจแทนเทรดเดอร์ แต่คือการสร้างเทคโนโลยีที่ช่วยให้เทรดเดอร์
            เห็นข้อมูลสำคัญได้เร็วขึ้น วางแผนได้เป็นระบบมากขึ้น และตัดสินใจบนหลักเกณฑ์ที่ชัดเจน
          </p>
        </div>
      </section>

      <WeightLoss showButtons={false} />

      {/* Built as an Ecosystem */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Built as an Ecosystem"
            title="มากกว่า Indicator คือระบบเครื่องมือสำหรับการเทรด"
          />

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-zinc-600 md:text-base">
            BeSight พัฒนาเครื่องมือหลายรูปแบบเพื่อรองรับแนวคิดและสไตล์การเทรดที่แตกต่างกัน ไม่ว่าจะเป็น
            BeSight ONE STR, Power of 3 Execution Model, AMD Cycle, Orca MA และ CRT Execution
            โดยแต่ละระบบมีหน้าที่แตกต่างกัน แต่ถูกพัฒนาภายใต้แนวคิดเดียวกัน — ลดความซับซ้อน
            และทำให้ข้อมูลบนกราฟนำไปใช้ตัดสินใจได้ง่ายขึ้น
          </p>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {ECOSYSTEM_TOOLS.map((tool) => (
              <span
                key={tool}
                className="rounded-full border-2 border-zinc-900/[0.13] px-4 py-2 text-sm font-medium text-zinc-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <div className="flex w-full items-center justify-center p-3 pb-12 md:p-5 md:pb-24">
        <section className="relative flex h-[32rem] w-full max-w-[1536px] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] md:h-[38rem] md:rounded-[3rem]">
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/images/homepage/loopabout.mp4"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6 px-6 text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
              Our Philosophy
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Analyze. Plan. Execute.
            </h2>
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              เราเชื่อว่าการเทรดที่เป็นระบบไม่ได้เริ่มจากการหาสัญญาณให้ได้มากที่สุด แต่เริ่มจากการเข้าใจว่า
              ตลาดกำลังทำอะไร จุดไหนควรรอ จุดไหนมีเงื่อนไขสำหรับการเข้า และเรายอมรับความเสี่ยงได้เท่าไร
              นี่คือแนวคิดที่อยู่เบื้องหลังทุกเครื่องมือของ BeSight
            </p>
            <p className="text-xl font-semibold tracking-tight md:text-2xl">
              See the Structure. Build the Plan. Execute with Clarity.
            </p>
          </div>
        </section>
      </div>

      <ScienceNature showButtons={false} />
      <ProductCarousel />
      <HealthGuide />
    </SiteLayout>
  )
}
