import { Link } from 'react-router-dom'

import { CodeBadge } from '@/components/ui/code-badge'

const CARD_1 = {
  eyebrow: 'XM Partner Benefit',
  title: 'รับเงินคืนจากทุกการเทรด',
  description: 'เปิดบัญชีกับ BeSight เพื่อรับรีเบตจากการเทรดของคุณ',
  stat: 'Up to $18',
  button: 'เปิดบัญชีรับสิทธิ์',
}

const CARD_2 = {
  eyebrow: 'Trading Tools',
  title: 'BeSight Indicator',
  description:
    'เครื่องมือวิเคราะห์ตลาดที่ช่วยวางแผน Entry, TP/SL และติดตาม Setup ได้ชัดเจนยิ่งขึ้น',
  button: 'Explore BeSight Indicator',
}

const CARD_3 = {
  eyebrow: 'Rewards Program',
  title: 'BeSight Loyalty',
  description: 'ยิ่งเทรด ยิ่งได้รับสิทธิประโยชน์และกิจกรรมพิเศษสำหรับสมาชิก',
  button: 'ดูสิทธิประโยชน์',
}

const CARD_4 = {
  eyebrow: 'Account Center',
  title: 'BeSight Center',
  description: 'จัดการบัญชีและบริการต่าง ๆ ของคุณได้สะดวกในที่เดียว',
  button: 'เข้าสู่ระบบ',
}

function CardButton({
  label,
  variant = 'dark',
  className = '',
  href,
}: {
  label: string
  variant?: 'dark' | 'green' | 'light'
  className?: string
  href?: string
}) {
  const variantClasses =
    variant === 'green'
      ? 'bg-[#16A34A] text-white hover:bg-[#15803D]'
      : variant === 'light'
        ? 'bg-white text-[#0B1B3B] hover:bg-white/90'
        : 'bg-[#0B1B3B] text-white hover:bg-[#0B1B3B]/90'

  const classes = `w-fit rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] ${variantClasses} ${className}`

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label}
      </a>
    )
  }

  return (
    <button type="button" className={classes}>
      {label}
    </button>
  )
}

export function Features() {
  return (
    <section className="mx-auto w-full max-w-[1536px] px-3 py-6 md:px-5 md:py-12">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-6 px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-[#0B1B3B] md:text-4xl">
            Everything You Need
            <br />
            Beyond the Trade
          </h2>
          <p className="mt-3 text-base text-[#5E6470]">
            ครบทั้งรีเบต เครื่องมือเทรด สิทธิประโยชน์ และระบบจัดการบัญชีใน
            Ecosystem เดียวของ BeSight
          </p>
        </div>
        <Link
          to="/about"
          className="shrink-0 rounded-full border border-[#0B1B3B]/15 px-5 py-2.5 text-sm font-medium text-[#0B1B3B] transition-colors hover:bg-[#0B1B3B]/5"
        >
          Explore BeSight
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        <div className="group relative min-h-[28rem] overflow-hidden rounded-[1.5rem] bg-white p-8 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:row-span-2 md:rounded-[2rem]">
          <img
            src="/images/XM-Logo-Black-RGB.png"
            alt="XM"
            className="absolute left-8 top-8 z-20 h-9 w-auto object-contain"
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex flex-1 items-center justify-end">
              <img
                src="/images/homepage/h-rebateimg.png"
                alt=""
                className="w-full max-w-none translate-x-6 object-contain opacity-100"
              />
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
                {CARD_1.eyebrow}
              </p>
              <h3 className="mt-2 max-w-xs text-2xl font-semibold text-[#0B1B3B]">
                {CARD_1.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm text-[#5E6470]">{CARD_1.description}</p>
              <p className="mt-4 text-4xl font-bold text-[#0B1B3B]">
                {CARD_1.stat}
                <span className="text-base font-medium"> / Lot</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <CardButton
                  label={CARD_1.button}
                  variant="green"
                  href="https://affs.click/CHg1N"
                />
                <CodeBadge />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative flex overflow-hidden rounded-[1.5rem] bg-white p-8 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-2 md:rounded-[2rem]">
          <img
            src="/images/homepage/h-indicator.png"
            alt=""
            className="pointer-events-none absolute -bottom-20 -right-12 h-96 w-96 object-contain opacity-100"
          />
          <div className="relative z-10 flex h-full w-full flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
                {CARD_2.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#0B1B3B]">{CARD_2.title}</h3>
              <p className="mt-3 max-w-md text-sm text-[#5E6470]">{CARD_2.description}</p>
            </div>
            <CardButton label={CARD_2.button} href="#products" className="mt-4" />
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[1.5rem] bg-white p-8 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:rounded-[2rem]">
          <img
            src="/images/homepage/h-reward.png"
            alt=""
            className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 object-contain opacity-100"
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5E6470]">
                {CARD_3.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[#0B1B3B]">{CARD_3.title}</h3>
              <p className="mt-2 text-sm text-[#5E6470]">{CARD_3.description}</p>
            </div>
            <CardButton label={CARD_3.button} className="mt-4" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0d0a2b] bg-[url('/images/homepage/widget-card-bg.webp')] bg-cover bg-center p-8 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:rounded-[2rem]">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {CARD_4.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{CARD_4.title}</h3>
              <p className="mt-2 text-sm text-white/70">{CARD_4.description}</p>
            </div>
            <CardButton label={CARD_4.button} variant="light" className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
