'use client'

import { Link } from '@/site/lib/router'
import { HONEYPOT_STYLE, useNewsletter } from '@/site/lib/newsletter'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'

import { Button } from '@/site/components/ui/button'
import { TickerTape } from '@/site/components/sections/ticker-tape'
import { useT } from '@/site/lib/lang'

const socialLinks: { name: string; href: string; icon: React.ReactNode }[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/besight.official',
    icon: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5">
        <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z" />
      </svg>
    ),
  },
  {
    name: 'LINE',
    href: 'https://lin.ee/Any4CJVD',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .345-.281.63-.63.63h-2.385c-.345 0-.627-.285-.627-.63V8.108c0-.345.282-.63.63-.63h2.382c.348 0 .63.285.63.63 0 .348-.282.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .345-.282.63-.63.63-.345 0-.63-.285-.63-.63V8.108c0-.27.174-.51.432-.596.064-.024.135-.033.199-.033.195 0 .375.09.5.25l2.457 3.317v-2.94c0-.345.283-.63.628-.63.348 0 .63.285.63.63v4.771zm-5.741 0c0 .345-.282.63-.63.63-.345 0-.63-.285-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.771zm-2.466.63H4.917c-.345 0-.63-.285-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .345-.281.63-.629.63M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@besight',
    icon: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5">
        <path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@besightth?_t=8qAcjCeDr9d&_r=1',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M14.5 3h2.6c.2 1.6 1.4 3 3.1 3.3v2.6c-1.2 0-2.3-.4-3.2-1v6.2c0 3-2.4 5.4-5.4 5.4S6.2 17.1 6.2 14.1c0-2.9 2.3-5.3 5.2-5.4v2.7c-1.4.1-2.5 1.3-2.5 2.7 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V3z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/DkKc4P2sw',
    icon: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5">
        <path d="M26.413,6.536c-1.971-.902-4.052-1.543-6.189-1.904-.292,.523-.557,1.061-.793,1.612-2.277-.343-4.592-.343-6.869,0-.236-.551-.5-1.089-.793-1.612-2.139,.365-4.221,1.006-6.194,1.909C1.658,12.336,.596,17.987,1.127,23.558h0c2.294,1.695,4.861,2.984,7.591,3.811,.615-.827,1.158-1.704,1.626-2.622-.888-.332-1.744-.741-2.56-1.222,.215-.156,.425-.316,.628-.472,4.806,2.26,10.37,2.26,15.177,0,.205,.168,.415,.328,.628,.472-.817,.483-1.676,.892-2.565,1.225,.467,.918,1.011,1.794,1.626,2.619,2.732-.824,5.301-2.112,7.596-3.808h0c.623-6.461-1.064-12.06-4.46-17.025Zm-15.396,13.596c-1.479,0-2.702-1.343-2.702-2.994s1.18-3.006,2.697-3.006,2.73,1.354,2.704,3.006-1.192,2.994-2.699,2.994Zm9.967,0c-1.482,0-2.699-1.343-2.699-2.994s1.18-3.006,2.699-3.006,2.723,1.354,2.697,3.006-1.189,2.994-2.697,2.994Z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/+oyW3UGoMffs2MTc1',
    icon: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M16,2c-7.732,0-14,6.268-14,14s6.268,14,14,14,14-6.268,14-14S23.732,2,16,2Zm6.489,9.521c-.211,2.214-1.122,7.586-1.586,10.065-.196,1.049-.583,1.401-.957,1.435-.813,.075-1.43-.537-2.218-1.053-1.232-.808-1.928-1.311-3.124-2.099-1.382-.911-.486-1.412,.302-2.23,.206-.214,3.788-3.472,3.858-3.768,.009-.037,.017-.175-.065-.248-.082-.073-.203-.048-.29-.028-.124,.028-2.092,1.329-5.905,3.903-.559,.384-1.065,.571-1.518,.561-.5-.011-1.461-.283-2.176-.515-.877-.285-1.574-.436-1.513-.92,.032-.252,.379-.51,1.042-.773,4.081-1.778,6.803-2.95,8.164-3.517,3.888-1.617,4.696-1.898,5.222-1.907,.116-.002,.375,.027,.543,.163,.142,.115,.181,.27,.199,.379,.019,.109,.042,.357,.023,.551Z"
        />
      </svg>
    ),
  },
]

const linkColumns = [
  {
    title: 'เมนูทางลัด',
    titleEn: 'Quick Links',
    links: [
      { label: 'ดาวโหลดเครื่องมือ', labelEn: 'Download Tools', href: 'https://app.besight.net/' },
    ],
  },
  {
    title: 'Company',
    titleEn: 'Company',
    links: [{ label: 'เกี่ยวกับเรา', labelEn: 'About Us', href: '/about', internal: true }],
  },
  {
    title: 'Legal',
    titleEn: 'Legal',
    links: [
      { label: 'นโยบายคุกกี้', labelEn: 'Cookie Policy', href: '/cookie-policy', internal: true },
      { label: 'นโยบายความเป็นส่วนบุคคล', labelEn: 'Privacy Policy', href: '/privacy-policy', internal: true },
    ],
  },
]

export function Footer() {
  const newsletter = useNewsletter('footer')
  const t = useT()
  return (
    <footer className="bg-gradient-to-br from-[#002255] to-black pb-24 text-white md:pb-0">
      <TickerTape />
      <div className="container grid items-start gap-8 py-10 lg:grid-cols-2 md:py-14">
        <div>
          <img
            src="/images/besight-logo.png"
            alt="BeSight"
            className="h-7 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-sm text-sm text-zinc-400">
            {t(
              'BeSight มุ่งมั่นเป็นแหล่งแบ่งปันความรู้ด้านการเงินและการลงทุนแก่ผู้ลงทุน โดยไม่คิดค่าใช้จ่ายใดๆ เพื่อสนับสนุนการตัดสินใจอย่างมีข้อมูลและเพิ่มความเข้าใจในโลกการเงิน',
              'BeSight is committed to sharing financial and investment knowledge with investors free of charge, supporting informed decisions and a deeper understanding of the financial world.',
            )}
          </p>
          <form
            className="mt-4 flex max-w-sm flex-col gap-2 sm:flex-row"
            onSubmit={(e) => void newsletter.onSubmit(e)}
          >
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT_STYLE} />
            <input
              name="email"
              type="email"
              required
              aria-label={t('อีเมล', 'Email')}
              placeholder={t('กรอกอีเมลของคุณ', 'Enter your email')}
              className="h-11 w-full min-w-0 shrink-0 rounded-full sm:flex-1 sm:shrink border border-white/15 bg-white/5 px-4 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button type="submit" disabled={newsletter.state === 'sending'} className="w-full shrink-0 bg-white text-zinc-900 hover:bg-white/90 sm:w-auto">
              {t('สมัครรับข่าวสาร', 'Subscribe')}
            </Button>
          </form>
          {newsletter.message && (
            <p role="status" className={`mt-3 max-w-sm text-xs ${newsletter.state === 'done' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {newsletter.message}
            </p>
          )}
          <p className="mt-3 max-w-sm text-xs text-zinc-500">
            {t('เราเคารพความเป็นส่วนตัวของคุณ ยกเลิกรับข่าวสารได้ทุกเมื่อ', 'We respect your privacy. Unsubscribe at any time.')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {linkColumns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{t(col.title, col.titleEn)}</p>
              <div className="mt-2 h-px w-16 bg-white/20" />
              <ul className="mt-4 space-y-3">
                {col.links.map((link) =>
                  'internal' in link && link.internal ? (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {t(link.label, link.labelEn)}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {t(link.label, link.labelEn)}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-6 border-t border-white/10 pb-10 pt-8 md:pb-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              VIP Official XM Partner
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Anniversary 4 Years
            </span>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-zinc-500">
          {t(
            'BeSight เรามุ่งมั่นให้คำปรึกษาและข้อมูลด้านการเงิน การลงทุนอย่างโปร่งใสและเป็นกลาง เพื่อช่วยให้คุณตัดสินใจได้อย่างมีข้อมูล อย่างไรก็ตาม การลงทุนในตลาดการเงินยังคงมีความเสี่ยงสูง ผู้ลงทุนควรพิจารณาข้อมูลทั้งหมดและประเมินความเสี่ยงตามสถานการณ์ของตนเอง แม้เราจะให้ข้อมูลที่เป็นประโยชน์และสนับสนุนการตัดสินใจ แต่ผลการดำเนินงานในอดีตไม่ได้รับประกันผลลัพธ์ในอนาคต คำแนะนำของเรามีลักษณะทั่วไปและไม่ได้เป็นการชี้นำทางการเงินส่วนบุคคล คุณควรปรึกษาผู้เชี่ยวชาญทางการเงินที่มีคุณสมบัติก่อนการตัดสินใจลงทุน',
            'At BeSight, we are committed to providing transparent and impartial financial and investment information to help you make informed decisions. However, investing in financial markets carries a high level of risk, and investors should consider all available information and assess the risks based on their own circumstances. Although we provide useful information to support your decisions, past performance does not guarantee future results. Our guidance is general in nature and does not constitute personalized financial advice. You should consult a qualified financial professional before making any investment decision.',
          )}
        </p>
      </div>
    </footer>
  )
}
