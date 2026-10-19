'use client'

import { Link } from '@/site/lib/router'

import { CodeBadge } from '@/site/components/ui/code-badge'
import { useT } from '@/site/lib/lang'

const CARD_1 = {
  eyebrow: 'XM Partner Benefit',
  title: { th: 'รับเงินคืนจากทุกการเทรด', en: 'Get cashback on every trade' },
  description: { th: 'เปิดบัญชีกับ BeSight เพื่อรับรีเบตจากการเทรดของคุณ', en: 'Open an account with BeSight to earn rebates on your trades' },
  stat: 'Up to $18',
  button: { th: 'เปิดบัญชีรับสิทธิ์', en: 'Open an account' },
}

const CARD_2 = {
  eyebrow: 'Trading Tools',
  title: { th: 'BeSight Indicator', en: 'BeSight Indicator' },
  description: {
    th: 'เครื่องมือวิเคราะห์ตลาดที่ช่วยวางแผน Entry, TP/SL และติดตาม Setup ได้ชัดเจนยิ่งขึ้น',
    en: 'Market analysis tools that help you plan Entry, TP/SL and track every Setup with greater clarity',
  },
  button: { th: 'Explore BeSight Indicator', en: 'Explore BeSight Indicator' },
}

const CARD_3 = {
  eyebrow: 'Rewards Program',
  title: { th: 'BeSight Loyalty', en: 'BeSight Loyalty' },
  description: { th: 'ยิ่งเทรด ยิ่งได้รับสิทธิประโยชน์และกิจกรรมพิเศษสำหรับสมาชิก', en: 'The more you trade, the more benefits and exclusive member activities you unlock' },
  button: { th: 'ดูสิทธิประโยชน์', en: 'View benefits' },
}

const CARD_4 = {
  eyebrow: 'Account Center',
  title: { th: 'BeSight Center', en: 'BeSight Center' },
  description: { th: 'จัดการบัญชีและบริการต่าง ๆ ของคุณได้สะดวกในที่เดียว', en: 'Manage your account and services conveniently in one place' },
  button: { th: 'เข้าสู่ระบบ', en: 'Log in' },
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
      ? 'bg-positive text-white hover:bg-[#15803D]'
      : variant === 'light'
        ? 'bg-white text-navy hover:bg-white/90'
        : 'bg-navy text-white hover:bg-navy/90'

  const classes = `w-fit rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-transform md:px-4 md:py-2 md:text-sm hover:scale-[1.02] ${variantClasses} ${className}`

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
  const t = useT()
  return (
    <section className="mx-auto w-full max-w-[1536px] px-3 py-6 md:px-5 md:py-12">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 px-4 md:mb-10 md:gap-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-navy md:text-4xl">
            Everything You Need
            <br />
            Beyond the Trade
          </h2>
          <p className="mt-2 text-sm leading-snug text-steel md:mt-3 md:text-base md:leading-normal">
            {t(
              'ครบทั้งรีเบต เครื่องมือเทรด สิทธิประโยชน์ และระบบจัดการบัญชีใน Ecosystem เดียวของ BeSight',
              'Rebates, trading tools, member benefits and account management, all in one BeSight ecosystem',
            )}
          </p>
        </div>
        <Link
          to="/about"
          className="shrink-0 rounded-full border border-navy/15 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/5"
        >
          Explore BeSight
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
        <div className="group relative overflow-hidden rounded-[1.5rem] bg-white p-5 transition-shadow md:min-h-[28rem] md:p-8 hover:shadow-soft-hover md:row-span-2 md:rounded-[2rem]">
          <img
            src="/images/XM-Logo-Black-RGB.png"
            alt="XM"
            className="absolute left-5 top-5 z-20 h-7 w-auto object-contain md:left-8 md:top-8 md:h-9"
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex flex-1 items-center justify-end">
              <img
                src="/images/homepage/h-rebateimg.png"
                alt=""
                className="w-[90%] max-w-none translate-x-4 object-contain opacity-100 md:w-full md:translate-x-6"
              />
            </div>
            <div className="mt-3">
              <p className="eyebrow-sm">
                {CARD_1.eyebrow}
              </p>
              <h3 className="mt-1.5 max-w-xs text-xl font-semibold text-navy md:mt-2 md:text-2xl">
                {t(CARD_1.title.th, CARD_1.title.en)}
              </h3>
              <p className="mt-2 max-w-xs text-[13px] leading-snug text-steel md:mt-3 md:text-sm md:leading-normal">{t(CARD_1.description.th, CARD_1.description.en)}</p>
              <p className="mt-3 text-3xl font-bold text-navy md:mt-4 md:text-4xl">
                {CARD_1.stat}
                <span className="text-sm font-medium md:text-base"> / Lot</span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-4 md:gap-3">
                <CardButton
                  label={t(CARD_1.button.th, CARD_1.button.en)}
                  variant="green"
                  href="https://affs.click/CHg1N"
                />
                <CodeBadge />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative flex overflow-hidden rounded-[1.5rem] bg-white p-5 transition-shadow md:p-8 hover:shadow-soft-hover md:col-span-2 md:rounded-[2rem]">
          <img
            src="/images/homepage/h-indicator.png"
            alt=""
            className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 md:-right-12 md:h-96 md:w-96 object-contain opacity-5 md:opacity-100"
          />
          <div className="relative z-10 flex h-full w-full flex-col justify-between">
            <div>
              <p className="eyebrow-sm">
                {CARD_2.eyebrow}
              </p>
              <h3 className="mt-1.5 text-xl font-semibold text-navy md:mt-2 md:text-2xl">{t(CARD_2.title.th, CARD_2.title.en)}</h3>
              <p className="mt-2 max-w-md text-[13px] leading-snug text-steel md:mt-3 md:text-sm md:leading-normal">{t(CARD_2.description.th, CARD_2.description.en)}</p>
            </div>
            <CardButton label={t(CARD_2.button.th, CARD_2.button.en)} href="#products" className="mt-3 md:mt-4" />
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[1.5rem] bg-white p-5 transition-shadow hover:shadow-soft-hover md:rounded-[2rem] md:p-8">
          <img
            src="/images/homepage/h-reward.png"
            alt=""
            className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 object-contain opacity-5 md:opacity-100"
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="eyebrow-sm">
                {CARD_3.eyebrow}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-navy md:mt-2 md:text-xl">{t(CARD_3.title.th, CARD_3.title.en)}</h3>
              <p className="mt-1.5 text-[13px] leading-snug text-steel md:mt-2 md:text-sm md:leading-normal">{t(CARD_3.description.th, CARD_3.description.en)}</p>
            </div>
            <CardButton label={t(CARD_3.button.th, CARD_3.button.en)} href="https://app.besight.net/" className="mt-3 md:mt-4" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0d0a2b] bg-[url('/images/homepage/widget-card-bg.webp')] bg-cover bg-center p-5 transition-shadow md:p-8 hover:shadow-soft-hover md:rounded-[2rem]">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {CARD_4.eyebrow}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-white md:mt-2 md:text-xl">{t(CARD_4.title.th, CARD_4.title.en)}</h3>
              <p className="mt-1.5 text-[13px] leading-snug text-white/70 md:mt-2 md:text-sm md:leading-normal">{t(CARD_4.description.th, CARD_4.description.en)}</p>
            </div>
            <CardButton label={t(CARD_4.button.th, CARD_4.button.en)} href="https://app.besight.net/" variant="light" className="mt-3 md:mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
