'use client'

import { useEffect, useState } from 'react'
import { useSiteData } from '@/site/lib/site-data'
import { useSiteLang, useT } from '@/site/lib/lang'
import { ChevronLeft, ChevronRight, Clock, Crown, Medal, Users } from 'lucide-react'


const PAGE_SIZE = 5

// Initials avatar drawn locally (same look as the ui-avatars.com image the
// design used) so visitors' browsers don't send member names to a third party.
function avatarUrl(name: string) {
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || '?'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="#0B1B3B"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="52" fill="#fff">${initials.replace(/[<&>"']/g, '')}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}



const rankStyles: Record<number, string> = {
  1: 'bg-gold text-white',
  2: 'bg-zinc-400 text-white',
  3: 'bg-[#C97A3D] text-white',
}

function formatMonth(date: Date, en: boolean) {
  return en
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
    : new Intl.DateTimeFormat('th-TH', {
        month: 'long',
        year: 'numeric',
        calendar: 'buddhist',
      }).format(date)
}

function getPreviousMonthLabel(en: boolean) {
  const date = new Date()
  date.setDate(1)
  date.setMonth(date.getMonth() - 1)
  return formatMonth(date, en)
}

function getCurrentMonthLabel(en: boolean) {
  return formatMonth(new Date(), en)
}

function getTimeUntilMonthEnd() {
  const now = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const msLeft = Math.max(0, endOfMonth.getTime() - now.getTime())

  const days = Math.floor(msLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((msLeft / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((msLeft / (1000 * 60)) % 60)
  const seconds = Math.floor((msLeft / 1000) % 60)

  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
        rankStyles[rank] ?? 'bg-navy/8 text-navy'
      }`}
    >
      {rank <= 3 ? (
        rank === 1 ? (
          <Crown className="h-4 w-4" />
        ) : (
          <Medal className="h-4 w-4" />
        )
      ) : (
        rank
      )}
    </div>
  )
}

export function Leaderboard() {
  // Real monthly lot board (CRM trade ledger) — see lib/server/site.ts.
  const {
    current: leaders,
    previous: previousMonthLeaders,
    activeTraders: ACTIVE_TRADERS_COUNT,
  } = useSiteData().leaderboard
  const t = useT()
  const en = useSiteLang().lang === 'en'
  const previousMonthLabel = getPreviousMonthLabel(en)
  const currentMonthLabel = getCurrentMonthLabel(en)
  // Starts empty and fills in after mount: the server's clock and the
  // visitor's differ by seconds, which would mismatch on hydration.
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeUntilMonthEnd> | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeUntilMonthEnd())
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const totalPages = Math.max(1, Math.ceil(leaders.length / PAGE_SIZE))
  const pagedLeaders = leaders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 eyebrow">
            Leaderboard
          </p>
          <h2 className="section-title">
            {t('อันดับผู้ได้รับรีเบตสูงสุด', 'Top Rebate Earners')}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {t(
              'จัดอันดับสมาชิก BeSight ที่ได้รับเงินคืนจากการเทรดสูงสุดประจำเดือนนี้',
              'Ranking BeSight members who earned the most cashback from trading this month',
            )}
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-navy/5 px-4 py-2 text-sm font-semibold text-navy">
              {t('ประจำเดือน', 'For')} {currentMonthLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-positive/10 px-4 py-2 text-sm font-semibold text-positive">
              <Clock className="h-4 w-4" />
              {t('เหลืออีก', '')} {timeLeft ? timeLeft.days : '--'} {t('วัน', 'days')} {timeLeft ? pad(timeLeft.hours) : '--'}:
              {timeLeft ? pad(timeLeft.minutes) : '--'}:{timeLeft ? pad(timeLeft.seconds) : '--'} {t('ก่อนสิ้นเดือน', 'left until month end')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-4 py-2 text-sm font-semibold text-navy">
              <Users className="h-4 w-4" />
              {ACTIVE_TRADERS_COUNT.toLocaleString()} {t('เทรดเดอร์กำลัง Active', 'active traders')}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden surface-lg">
          {pagedLeaders.map((leader, i) => (
            <div
              key={leader.rank}
              className={`relative flex items-center gap-4 overflow-hidden px-5 py-4 md:px-8 ${
                i !== pagedLeaders.length - 1 ? 'border-b border-zinc-900/5' : ''
              }`}
            >
              {leader.rank <= 3 && (
                <img
                  src="/images/homepage/reward.png"
                  alt=""
                  className={`pointer-events-none absolute right-16 top-1/2 z-0 h-20 w-auto -translate-y-1/2 object-contain opacity-[0.15] md:right-28 md:h-20 md:opacity-25 ${
                    leader.rank === 2
                      ? 'grayscale'
                      : leader.rank === 3
                        ? 'hue-rotate-[-25deg] saturate-[180%]'
                        : ''
                  }`}
                />
              )}

              <RankBadge rank={leader.rank} />

              <img
                src={avatarUrl(leader.name)}
                alt={leader.name}
                className="relative z-10 h-11 w-11 shrink-0 rounded-full object-cover"
              />

              <div className="relative z-10 min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate text-sm font-semibold md:text-base">
                  <span className="truncate">{leader.name}</span>
                  <span aria-label={leader.country}>{leader.flag}</span>
                </p>
                <p className="text-xs text-muted-foreground">{leader.volume}</p>
              </div>

              <p className="relative shrink-0 text-base font-bold text-navy md:text-lg">
                {leader.rebate}
              </p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mx-auto mt-6 flex max-w-3xl items-center justify-between">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="pill-outline text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('ก่อนหน้า', 'Previous')}
            </button>

            <p className="text-sm text-muted-foreground">
              {t(`หน้า ${page} จาก ${totalPages}`, `Page ${page} of ${totalPages}`)}
            </p>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="pill-outline text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              {t('ถัดไป', 'Next')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="text-sm font-semibold text-navy">
            {t('Top 3 เดือนที่แล้ว', 'Top 3 last month')} ({previousMonthLabel})
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {previousMonthLeaders.map((leader) => (
              <div
                key={leader.rank}
                className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <RankBadge rank={leader.rank} />
                  <img
                    src={avatarUrl(leader.name)}
                    alt={leader.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                </div>

                <div>
                  <p className="flex items-center justify-center gap-1.5 text-sm font-semibold">
                    <span>{leader.name}</span>
                    <span aria-label={leader.country}>{leader.flag}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{leader.volume}</p>
                </div>

                <p className="text-lg font-bold text-navy">{leader.rebate}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          {t(
            'ข้อมูลใช้เพื่อการนำเสนอเบื้องต้น อัปเดตอันดับจริงจะแสดงเมื่อเชื่อมต่อข้อมูลบัญชีสมาชิก',
            'Data is shown for preliminary illustration only. Actual rankings will appear once member account data is connected.',
          )}
        </p>
      </div>
    </section>
  )
}
