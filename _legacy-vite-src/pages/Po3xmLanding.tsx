import type { ReactNode } from 'react'
import {
  ArrowRight,
  Bell,
  Check,
  CircleCheck,
  Crosshair,
  Cpu,
  Download,
  FileClock,
  FileText,
  Gauge,
  History,
  Info,
  LineChart,
  ListChecks,
  RefreshCw,
  Shield,
  Target,
  Wallet,
} from 'lucide-react'

import { SiteLayout } from '@/components/sections/site-layout'
import { BottomRightCorner } from '@/components/sections/rivr-defi/BottomRightCorner'
import { GradientButton } from '@/components/ui/gradient-button'

function SectionHeader({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow: string
  title: string
  description?: string
  light?: boolean
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`mb-3 text-sm font-semibold uppercase tracking-widest ${
          light ? 'text-white/60' : 'text-muted-foreground'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-semibold leading-snug tracking-tight md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug ${
          light ? 'text-white' : 'text-[#0B1B3B]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base ${light ? 'text-white/70' : 'text-muted-foreground'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </div>
  )
}

function IconBadge({
  icon: Icon,
  colorClass = 'bg-[#0B1B3B]/10 text-[#0B1B3B]',
}: {
  icon: typeof Target
  colorClass?: string
}) {
  return (
    <span className={`flex h-11 w-11 items-center justify-center rounded-full ${colorClass}`}>
      <Icon className="h-5 w-5" />
    </span>
  )
}

export function Po3xmLanding() {
  return (
    <SiteLayout>
      {/* Hero + Intro — combined into one two-column section */}
      <section id="hero" className="bg-gray-50 py-10 md:py-16">
        <div className="container grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <img
              src="/images/indicator/sigle-logo.png"
              alt="BeSight PO3XM"
              className="h-16 w-auto md:h-24"
            />
            <p className="mt-6 text-sm leading-relaxed text-zinc-600 md:text-base">
              BeSight PO3XM คือ Indicator ที่พัฒนาขึ้นจากแนวคิด Power of 3 / AMD — Accumulation,
              Manipulation และ Distribution ระบบไม่ได้มองเพียงว่าราคาขึ้นหรือลง
              แต่ติดตามลำดับพฤติกรรมของราคา ตั้งแต่ช่วงสะสมราคา การกวาด Liquidity
              การกลับเข้าสู่กรอบ ไปจนถึงการยืนยัน Directional Move ก่อนสร้าง Trade Plan
              เมื่อเงื่อนไขครบ ระบบจะช่วยค้นหา Key Level ที่เหมาะสม พร้อมแสดง Entry, Stop Loss,
              Take Profit 1, Take Profit 2, Risk และ Lot Size บนกราฟ
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {[
                { icon: Cpu, label: 'แพลตฟอร์ม MetaTrader 5' },
                { icon: FileText, label: 'ประเภทไฟล์ Indicator' },
                { icon: History, label: 'เวอร์ชันปัจจุบัน BeSight PO3XM 1.0' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className="h-4 w-4 shrink-0 text-zinc-500" />
                  <p className="text-sm font-medium text-[#0B1B3B]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <GradientButton innerClassName="bg-[#0B1B3B] text-white hover:bg-[#0B1B3B]/90">
                <Download className="h-4 w-4" />
                ดาวน์โหลด Indicator สำหรับ MT5
              </GradientButton>
              <GradientButton className="w-fit">
                <LineChart className="h-4 w-4" />
                ดาวน์โหลด Indicator สำหรับ TradingView
              </GradientButton>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-zinc-500">
              <a href="#" className="underline-offset-4 hover:text-[#0B1B3B] hover:underline">
                คู่มือการติดตั้ง
              </a>
              <a href="#" className="underline-offset-4 hover:text-[#0B1B3B] hover:underline">
                คู่มือตั้งค่า Indicator
              </a>
            </div>
          </div>

          <div className="group relative order-1 h-[26rem] w-full overflow-hidden rounded-[1.5rem] sm:h-[32rem] lg:order-2 lg:h-[40rem] lg:rounded-[3rem]">
            <video
              autoPlay
              muted
              playsInline
              src="/images/Firefly-bear.mp4"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-tr from-white from-15% to-transparent to-40%" />

            <BottomRightCorner bgColor="#F9FAFB" />
          </div>
        </div>
      </section>

      {/* Understand the Market Cycle */}
      <section className="bg-gradient-to-b from-[#F9FAFB] to-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Understand the Market Cycle"
            title="มองตลาดเป็น 3 Phase ด้วย AMD"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                letter: 'A',
                icon: '/images/indicator/acc-icon.jpg',
                title: 'Accumulation',
                description:
                  'ระบบตรวจจับช่วงที่ราคากำลังสร้างกรอบสะสม และบันทึก High / Low ของ Range เพื่อใช้เป็น Liquidity Reference สำหรับขั้นตอนถัดไป',
              },
              {
                letter: 'M',
                icon: '/images/indicator/mani-icon.jpg',
                title: 'Manipulation',
                description:
                  'หลังจากกรอบ Accumulation สมบูรณ์ ระบบจะติดตามการ Sweep Liquidity เหนือหรือใต้กรอบ การทะลุกรอบเพียงอย่างเดียวยังไม่ถือเป็นสัญญาณ ระบบจะรอให้ราคากลับเข้ามาภายใน Range และตรวจสอบโครงสร้างเพิ่มเติม เพื่อลดการตีความ Breakout เป็น Manipulation โดยอัตโนมัติ',
              },
              {
                letter: 'D',
                icon: '/images/indicator/dis-icon.jpg',
                title: 'Distribution',
                description:
                  'เมื่อเกิด Liquidity Sweep และราคากลับเข้าสู่ Range ระบบจะตรวจสอบ Market Structure Shift และ Displacement เพื่อยืนยันการเข้าสู่ Distribution Phase เมื่อเงื่อนไขของระบบครบ จึงเริ่มค้นหาโอกาสสำหรับ Trade Setup',
              },
            ].map((phase) => (
              <Card key={phase.letter} className="flex flex-col overflow-hidden !p-0">
                <img
                  src={phase.icon}
                  alt={phase.title}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-lg font-semibold text-[#0B1B3B]">{phase.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{phase.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium text-[#0B1B3B]">
            ไม่ใช่แค่เห็น Sweep แล้วเข้า — แต่รอให้โครงสร้างยืนยันก่อนสร้างแผน
          </p>
        </div>
      </section>

      {/* Screenshot */}
      <section className="bg-white pt-16 md:pt-24">
        <div className="container">
          <img
            src="/images/indicator/po3xm-screen.png"
            alt="BeSight PO3XM"
            className="mx-auto w-full max-w-7xl"
          />
        </div>
      </section>

      {/* Smart Key Level Detection */}
      <section className="bg-white pb-16 pt-0 md:pb-24 md:pt-2">
        <div className="container">
          <SectionHeader
            eyebrow="Smart Key Level Detection"
            title="หาจุดเข้าจากคีย์สำคัญที่มีนัยยะ"
            description="หลังจากตรวจพบ AMD Structure ระบบจะค้นหา Key Level ที่เกี่ยวข้องกับรอบนั้นโดยอัตโนมัติ เช่น"
          />

          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              {
                image: '/images/indicator/technical/fvg.png',
                title: 'Fair Value Gap (FVG)',
                description: 'ตรวจจับ Imbalance ที่เกิดขึ้นระหว่างการเคลื่อนที่ของราคา',
              },
              {
                image: '/images/indicator/technical/ob.png',
                title: 'Order Block (OB)',
                description: 'ค้นหา Demand / Supply Order Block จากโครงสร้างและ Displacement',
              },
              {
                image: '/images/indicator/technical/swing.png',
                title: 'Swing High / Swing Low',
                description: 'ใช้ Swing Structure เป็นอีกหนึ่ง Reference สำหรับ Entry',
              },
              {
                image: '/images/indicator/technical/Liquidity.png',
                title: 'Liquidity Sweep Level',
                description:
                  'บันทึกบริเวณที่ Liquidity ถูกกวาด เพื่อใช้ประกอบการวิเคราะห์โครงสร้างของ Setup',
              },
            ].map((item) => (
              <Card key={item.title} className="overflow-hidden !p-0">
                <img src={item.image} alt={item.title} className="w-full" />
                <div className="p-6">
                  <p className="text-base font-semibold text-[#0B1B3B]">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            ระบบจึงไม่ได้ใช้ Entry รูปแบบเดียวกับทุกสถานการณ์ แต่เลือกจาก Key Level
            ที่เกิดขึ้นภายในโครงสร้าง AMD ของรอบนั้น
          </p>
        </div>
      </section>

      {/* Key Level Quality */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Key Level Quality
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#0B1B3B] md:text-3xl">
                ไม่ใช่ทุก Zone จะมีความสำคัญเท่ากัน
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-700">
                PO3XM มีระบบประเมิน Key Level Strength เพื่อช่วยคัดระดับราคาที่จะนำมาใช้สร้าง
                Trade Plan ระบบพิจารณาข้อมูลหลายส่วน จากนั้นระบบจะสร้าง Quality Score
                สำหรับใช้ในการคัดเลือก Level
              </p>
            </div>

            <Card>
              <ul className="space-y-3">
                {[
                  'Relative Volume',
                  'Impulse / Candle Body เทียบกับ ATR',
                  'การยืนยัน Distribution',
                  'Level เคยถูก Test หรือยัง',
                  'Level ถูก Break หรือ Invalid ไปแล้วหรือไม่',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                      <CircleCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-zinc-900/10 pt-4 text-xs leading-relaxed text-muted-foreground">
                Quality Score เป็นคะแนนเชิงกฎของระบบ (Heuristic) สำหรับเปรียบเทียบคุณภาพของ Level
                ไม่ใช่เปอร์เซ็นต์ความน่าจะเป็นที่จะชนะ
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Automatic Trade Plan */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Automatic Trade Plan"
            title="เมื่อ Setup พร้อม แผนการเทรดจะถูกสร้างให้บนกราฟ"
            description="เมื่อ AMD Structure และ Key Level ผ่านเงื่อนไข ระบบสามารถสร้าง Trade Plan พร้อมข้อมูลสำคัญ ได้แก่"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: Crosshair,
                title: 'BUY / SELL Entry',
                description: 'ระดับราคาที่ระบบเลือกสำหรับรอเข้า',
                color: 'bg-[#0B1B3B]/10 text-[#0B1B3B]',
              },
              {
                icon: Shield,
                title: 'Stop Loss',
                description: 'คำนวณจาก Structure พร้อม SL Buffer',
                color: 'bg-red-500/10 text-red-600',
              },
              {
                icon: Target,
                title: 'Take Profit 1',
                description: 'เป้าหมายกำไรแรกตาม Risk Multiple',
                color: 'bg-[#16A34A]/10 text-[#16A34A]',
              },
              {
                icon: Target,
                title: 'Take Profit 2',
                description: 'เป้าหมายถัดไปสำหรับ Setup ที่สามารถเคลื่อนที่ต่อได้',
                color: 'bg-[#16A34A]/10 text-[#16A34A]',
              },
              {
                icon: Gauge,
                title: 'Risk : Reward',
                description: 'แสดงเป้าหมายในรูปแบบ R เพื่อให้เห็น Risk/Reward ของ Setup ได้ชัดเจน',
                color: 'bg-[#F5B700]/15 text-[#B87E00]',
              },
            ].map((item) => (
              <Card key={item.title}>
                <IconBadge icon={item.icon} colorClass={item.color} />
                <p className="mt-4 text-sm font-semibold text-[#0B1B3B]">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">{item.description}</p>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            ทุกระดับถูกแสดงบนกราฟ ทำให้ผู้ใช้งานเห็นแผนก่อนที่ราคาจะเข้าสู่ Entry
          </p>
        </div>
      </section>

      {/* Structure-Based Stop Loss */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Structure-Based Stop Loss"
            title="Stop Loss อิงจากโครงสร้าง ไม่ใช่ระยะสุ่ม"
            description="PO3XM วาง Stop Loss จากโครงสร้างของ Manipulation และ Sweep ที่ตรวจพบ ระบบสามารถเพิ่ม Buffer ออกไปจาก Structure ตามค่าที่กำหนด เพื่อให้ตำแหน่ง SL สอดคล้องกับโครงสร้างของ Setup"
          />

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-zinc-600">
            สำหรับ Re-entry ผู้ใช้งานยังสามารถเลือกรูปแบบ SL Anchor ได้ระหว่าง
          </p>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            <Card>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0B1B3B]">
                M Structure
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                อ้างอิงโครงสร้าง Manipulation เดิม
              </p>
            </Card>
            <Card>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0B1B3B]">
                D Structure
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                อ้างอิงโครงสร้าง Distribution สำหรับ Stop ที่กระชับขึ้น
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Built-in Money Management */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Built-in Money Management"
            title="รู้ Lot Size ก่อนตัดสินใจเข้า Trade"
          />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm leading-relaxed text-zinc-700">
                เพียงกำหนด <span className="font-semibold text-[#0B1B3B]">Account Capital</span>{' '}
                เงินทุนที่ต้องการใช้เป็นฐานคำนวณ และ{' '}
                <span className="font-semibold text-[#0B1B3B]">Risk per Trade</span>{' '}
                เลือกได้ทั้ง % ของเงินทุน หรือจำนวนเงินคงที่ ระบบจะคำนวณ Position Size
                จากระยะระหว่าง Entry และ Stop Loss ให้อัตโนมัติ
              </p>

              <p className="mt-6 text-sm font-semibold text-[#0B1B3B]">
                รองรับ Preset สำหรับ
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['XAUUSD', 'XAGUSD', 'Forex', 'NAS100', 'Bitcoin', 'SOLUSDT'].map((sym) => (
                  <span
                    key={sym}
                    className="rounded-full border-2 border-zinc-900/[0.13] px-3 py-1 text-xs font-medium text-zinc-700"
                  >
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#0B1B3B] p-6 text-white">
              <div className="flex items-center gap-2 text-white/70">
                <Wallet className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-wide">ตัวอย่างแนวคิด</p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Capital</span>
                  <span className="font-semibold">$1,000</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70">Risk</span>
                  <span className="font-semibold">1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Risk Budget</span>
                  <span className="font-semibold text-[#A3E635]">$10</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/60">
                จากนั้นคำนวณ Lot Size ให้สัมพันธ์กับระยะ SL ของ Setup นั้น โดยมีการปัดขนาดลงตาม
                Lot Step เพื่อไม่ให้ความเสี่ยงจำลองเกิน Risk Budget ที่ตั้งไว้
              </p>
            </div>
          </div>

          {/* Estimated P/L */}
          <div className="mt-16 border-t border-zinc-900/10 pt-16">
            <SectionHeader
              eyebrow="Estimated P/L"
              title="เห็น Risk และผลลัพธ์จำลองบนกราฟ"
              description="นอกจาก Lot Size แล้ว ระบบยังสามารถแสดง Estimated P/L สำหรับระดับต่าง ๆ ของ Trade Plan จึงสามารถเห็นได้ตั้งแต่ก่อนเข้า Trade ว่า"
            />

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-600">SL</p>
                <p className="mt-2 text-sm text-zinc-600">ขาดทุนเท่าไร</p>
              </Card>
              <Card className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
                  TP1
                </p>
                <p className="mt-2 text-sm text-zinc-600">ผลลัพธ์เท่าไร</p>
              </Card>
              <Card className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
                  TP2
                </p>
                <p className="mt-2 text-sm text-zinc-600">ผลลัพธ์เท่าไร</p>
              </Card>
            </div>

            <p className="mx-auto mt-6 max-w-xl text-center text-sm text-zinc-600">
              ช่วยให้การตัดสินใจไม่ได้อิงเพียงจำนวน "จุด" แต่เชื่อมโยงกลับมาที่ Capital และ Risk
              ของบัญชี
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-xs text-muted-foreground">
              ตัวเลขเป็นการคำนวณจำลองจากข้อมูลที่ตั้งค่าไว้ ไม่รวม Spread, Commission, Swap,
              Slippage และ Margin Check
            </p>
          </div>
        </div>
      </section>

      {/* Adaptive Take Profit */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Adaptive Take Profit"
            title="ตลาดเปลี่ยน แผน Take Profit สามารถปรับตามพฤติกรรมราคา"
            description='หนึ่งในระบบสำคัญของ PO3XM คือ Adaptive TP หาก Entry ทำงานแล้ว แต่ราคาเคลื่อนออกจาก Entry Zone และกลับมา Retest ซ้ำหลายครั้งก่อนถึง TP1 ระบบสามารถปรับเป้าหมายลงมาเป็น TP ที่ใกล้ขึ้นตามค่าที่กำหนด'
          />

          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <Card className="w-full sm:w-64">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Original
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-zinc-700">
                  TP1 = <span className="font-semibold text-[#0B1B3B]">10R</span>
                </p>
                <p className="text-zinc-700">
                  TP2 = <span className="font-semibold text-[#0B1B3B]">15R</span>
                </p>
              </div>
            </Card>

            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <RefreshCw className="h-5 w-5" />
              <p className="text-center text-xs">เมื่อเกิด Retest ตามเงื่อนไข</p>
            </div>

            <Card className="w-full sm:w-64">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
                Adaptive
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-zinc-700">
                  TP1 = <span className="font-semibold text-[#0B1B3B]">1R</span>
                </p>
                <p className="text-zinc-700">
                  TP2 = <span className="font-semibold text-[#0B1B3B]">5R</span>
                </p>
              </div>
            </Card>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-zinc-600">
            Stop Loss ยังคงเดิม แนวคิดคือให้ Trade Plan สามารถตอบสนองต่อพฤติกรรมราคาหลัง Entry
            แทนที่จะใช้ Target เดิมแบบตายตัวทุกสถานการณ์
          </p>
        </div>
      </section>

      {/* A 50% Re-entry */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="A 50% Re-entry"
            title="พลาด Entry แรก ระบบยังสามารถค้นหาโอกาสใหม่"
            description="หลังเข้าสู่ Distribution หากราคาย้อนกลับมาถึง 50% ของ Accumulation Range ระบบสามารถเปิดกระบวนการค้นหา Re-entry Setup ได้อีกครั้ง PO3XM จะค้นหา Key Level ที่เกิดขึ้นใน D Phase ก่อนราคามาถึงบริเวณ 50% เช่น"
          />

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {['D-FVG', 'D-Order Block', 'D-Swing'].map((item) => (
              <Card key={item} className="text-center">
                <p className="text-sm font-semibold text-[#0B1B3B]">{item}</p>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-zinc-600">
            หาก Level ผ่านเงื่อนไข ระบบสามารถสร้าง Trade Plan ใหม่สำหรับ Re-entry ระบบจำกัด
            Re-entry ตาม Cycle และจะไม่ใช้ Re-entry เพื่อแทนที่ Position ที่เข้าแล้ว
          </p>
        </div>
      </section>

      {/* Adaptive Entry Logic */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Adaptive Entry Logic
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0B1B3B] md:text-4xl">
                ระบบคัดจุดเข้าด้วย Key Levels ที่สำคัญ
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base">
                เมื่อมี Key Level หลายตำแหน่งเกิดขึ้นพร้อมกัน PO3XM จะประเมิน Candidate
                ที่สามารถใช้เป็น Entry ได้ โดยตรวจสอบทั้ง
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'ประเภทของ Level — FVG / Order Block / Swing',
                  'Quality Score',
                  'ตำแหน่งเทียบกับ Stop Loss',
                  'ทิศทางของ Retest',
                  'สถานะของ Level — Active / Tested / Broken / Swept / Expired',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1B3B]" />
                    <span className="text-sm leading-relaxed text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted-foreground">
                ก่อนเลือก Level ที่ตรงตามกฎของระบบมาสร้าง Trade Plan
              </p>
            </div>

            <img
              src="/images/indicator/technical/adaptive-entry.png"
              alt="Adaptive Entry Logic"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* AI Demand / Supply Zones */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="AI Demand / Supply Zones"
            title="เพิ่มบริบทจาก Gold Futures"
            description="PO3XM มีระบบ AI Demand Supply Zone Optimize แยกจาก AMD Engine ระบบอ้างอิง Pivot ที่ยืนยันแล้วจาก COMEX — Gold Futures Timeframe H1 และแบ่ง Demand / Supply ออกเป็นหลายระดับ"
          />

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-6">
            <Card>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#16A34A]">
                Demand
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>Lower Demand</li>
                <li>Medium Demand</li>
                <li>Max Demand</li>
              </ul>
            </Card>
            <Card>
              <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                Supply
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>Lower Supply</li>
                <li>Medium Supply</li>
                <li>Max Supply</li>
              </ul>
            </Card>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            Zone จะถูกสร้างใหม่ตามวัน เพื่อใช้เป็นบริบทเพิ่มเติมสำหรับการวิเคราะห์ระดับราคาสำคัญของทองคำ
          </p>
        </div>
      </section>

      {/* Monthly Performance Dashboard */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Monthly Performance Dashboard"
            title="ไม่ต้องนั่งไล่นับ Setup ด้วยตัวเอง"
            description="Dashboard ภายใน PO3XM สรุปผลของ Trade Plan สำหรับเดือนปัจจุบัน เช่น"
          />

          <img
            src="/images/indicator/technical/monthly-dashboard.png"
            alt="Monthly Performance Dashboard"
            className="mx-auto mt-10 w-full max-w-3xl rounded-2xl"
          />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Win Rate', desc: 'เปอร์เซ็นต์ Setup ที่ปิดผลเป็น Win' },
              { label: 'W / L', desc: 'จำนวน Win และ Loss' },
              { label: 'Net R', desc: 'ผลรวมในหน่วย Risk Multiple' },
              { label: 'Net Points', desc: 'จำนวน Points สุทธิ' },
            ].map((stat) => (
              <Card key={stat.label}>
                <p className="text-sm font-semibold text-[#0B1B3B]">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{stat.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:mx-auto sm:max-w-[calc(75%-0.25rem)] sm:grid-cols-3">
            {[
              { label: 'Plans', desc: 'จำนวนแผนที่ระบบสร้าง' },
              { label: 'Entered', desc: 'จำนวนแผนที่ราคามาถึง Entry' },
              { label: 'Net P/L', desc: 'ผลลัพธ์ทางการเงินจำลอง' },
            ].map((stat) => (
              <Card key={stat.label}>
                <p className="text-sm font-semibold text-[#0B1B3B]">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{stat.desc}</p>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            Dashboard จึงช่วยให้ผู้ใช้สามารถตรวจสอบพฤติกรรมของระบบจากข้อมูลที่เกิดขึ้นบนกราฟ
            แทนการดูเฉพาะ Setup ล่าสุด
          </p>
        </div>
      </section>

      {/* Trade History */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Trade History"
            title="ดูผลของ Setup ย้อนหลังได้โดยตรงบนกราฟ"
            description="เมื่อ Trade จบ ระบบสามารถเก็บ Closed Trade บนกราฟ พร้อมแสดงพื้นที่ Risk / Reward และผลลัพธ์ เช่น"
          />

          <img
            src="/images/indicator/technical/trade-history.webp"
            alt="Trade History"
            className="mx-auto mt-10 w-full max-w-5xl"
          />

          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#16A34A]/10 px-4 py-2 text-sm font-semibold text-[#16A34A]">
              <FileClock className="h-4 w-4" />
              WIN TP1
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#16A34A]/10 px-4 py-2 text-sm font-semibold text-[#16A34A]">
              <FileClock className="h-4 w-4" />
              WIN TP2
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600">
              <FileClock className="h-4 w-4" />
              LOSS -1R
            </span>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-foreground">
            ทำให้สามารถย้อนดูได้ว่าแต่ละ Setup เกิดขึ้นบริเวณใด และจบอย่างไร
          </p>
        </div>
      </section>

      {/* Discord Real-time Alerts */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Discord Real-time Alerts"
            title="การแจ้งเตือนอัตโนมัติ"
            description="PO3XM รองรับการส่งข้อความผ่าน TradingView Webhook ไปยัง Discord สามารถแจ้งเหตุการณ์สำคัญของระบบได้ เช่น"
          />

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3">
            {[
              { title: 'Accumulation Started', desc: 'ตรวจพบการเริ่มต้นของ A Phase' },
              { title: 'New Setup', desc: 'มี Trade Plan ใหม่ พร้อม Entry / SL / TP1 / TP2' },
              { title: 'Entry Active', desc: 'ราคามาถึง Entry' },
              { title: 'TP1 Reached', desc: 'ถึงเป้าหมายแรก' },
              { title: 'TP2 Completed', desc: 'ถึง Final Target' },
              { title: 'Stop Loss', desc: 'Setup Cancelled' },
              { title: 'Targets Updated', desc: 'Adaptive TP ทำงาน' },
              { title: '50% Re-entry', desc: 'ตรวจพบ Trade Plan ใหม่หลังราคากลับมาที่ A 50%' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-[2px_4px_12px_rgba(0,0,0,0.05)]"
              >
                <Bell className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1B3B]" />
                <div>
                  <p className="text-sm font-semibold text-[#0B1B3B]">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            จึงสามารถเชื่อม Signal จาก Indicator เข้ากับ Community หรือ Private Trading Room
            ได้โดยไม่ต้องเฝ้าหน้าจอตลอดเวลา
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Built for Rule-Based Execution"
            title="จาก Market Structure สู่แผนการเทรดที่ชัดเจน"
            description="BeSight PO3XM รวมกระบวนการสำคัญไว้ใน Workflow เดียว"
          />

          <div className="mx-auto mt-12 max-w-xl">
            {[
              { step: '01', title: 'Detect Accumulation', desc: 'ค้นหา Range ที่ใช้เป็นฐานของ Cycle' },
              { step: '02', title: 'Track Liquidity Sweep', desc: 'ตรวจสอบการกวาด Liquidity เหนือหรือใต้ Range' },
              { step: '03', title: 'Confirm Manipulation', desc: 'รอราคากลับเข้าสู่กรอบ' },
              { step: '04', title: 'Confirm Distribution', desc: 'ตรวจสอบ Market Structure Shift และ Displacement' },
              { step: '05', title: 'Find Key Levels', desc: 'ค้นหา FVG / Order Block / Swing' },
              { step: '06', title: 'Score & Select Entry', desc: 'ประเมินและเลือก Level ที่ผ่านเงื่อนไข' },
              { step: '07', title: 'Build Trade Plan', desc: 'สร้าง Entry / SL / TP1 / TP2' },
              { step: '08', title: 'Calculate Position Size', desc: 'คำนวณ Lot Size ตาม Capital และ Risk' },
              { step: '09', title: 'Manage the Setup', desc: 'ติดตาม TP, SL, Retest, Adaptive TP และ Re-entry' },
              { step: '10', title: 'Record the Result', desc: 'สรุปผลลง Dashboard และ Trade History' },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B1B3B] text-xs font-bold text-white">
                    {item.step}
                  </span>
                  {i !== arr.length - 1 && <span className="w-px flex-1 bg-zinc-900/10" />}
                </div>
                <div className="pb-8">
                  <p className="pt-1.5 text-base font-semibold text-[#0B1B3B]">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backtest Report */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Backtest Report"
            title="ผลย้อนหลังที่ตรวจสอบได้จริง"
            description="สรุปผลการทำงานของ PO3XM จาก Strategy Tester บน TradingView ทั้งระยะสั้นและระยะยาว"
          />

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <img
                src="/images/indicator/technical/backtest-30d.webp"
                alt="PO3XM Backtest Report — Last 30 days"
                className="w-full"
              />
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                ผลย้อนหลัง 30 วัน
              </p>
            </div>
            <div>
              <img
                src="/images/indicator/technical/backtest-365d.webp"
                alt="PO3XM Backtest Report — Last 365 days"
                className="w-full"
              />
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                ผลย้อนหลัง 1 ปี
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                One System. From Structure to Execution.
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[#0B1B3B] md:text-3xl">
                Analyze the Structure. Wait for Confirmation. Execute the Plan.
              </p>
            </div>
            <GradientButton asChild className="shrink-0">
              <a href="#hero">
                Get Access
                <ArrowRight className="h-4 w-4" />
              </a>
            </GradientButton>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
            <Card className="lg:row-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Rule-Based Execution
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-zinc-600">
                {[
                  'ไม่ต้องตีกรอบ AMD เอง',
                  'ไม่ต้องค้นหา Key Level ทีละจุด',
                  'ไม่ต้องคำนวณ Risk และ Lot Size ใหม่ทุก Setup',
                  'ไม่ต้องไล่นับสถิติย้อนหลังด้วยตัวเอง',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1B3B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                About PO3XM
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                BeSight PO3XM ถูกออกแบบมาเพื่อเปลี่ยนแนวคิด Power of 3 ให้กลายเป็น Rule-Based
                Execution Model ที่สามารถติดตามและตรวจสอบได้บนกราฟ
              </p>
            </Card>

            <Card className="flex items-center justify-center">
              <img src="/images/indicator/sigle-logo.png" alt="BeSight PO3XM" className="w-4/5" />
            </Card>

            <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#6D28D9] to-[#1D4ED8] p-8">
              <p className="text-sm font-semibold text-white">
                พร้อมเปลี่ยนแนวคิด Power of 3 ให้กลายเป็นระบบ Execution ของคุณแล้วหรือยัง?
              </p>
              <GradientButton asChild className="mt-6 w-fit">
                <a href="#hero">
                  Get Access
                  <ArrowRight className="h-4 w-4" />
                </a>
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

    </SiteLayout>
  )
}
