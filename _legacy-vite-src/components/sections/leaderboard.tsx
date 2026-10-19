import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Crown, Medal, Users } from 'lucide-react'

const ACTIVE_TRADERS_COUNT = 3482

const PAGE_SIZE = 5

function avatarUrl(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0B1B3B&color=fff&bold=true&size=128`
}

const leaders = [
  { rank: 1, name: 'สมชาย ต.', country: 'TH', flag: '🇹🇭', volume: '1,240 Lot', rebate: '$18,600' },
  { rank: 2, name: 'Nattapong K.', country: 'TH', flag: '🇹🇭', volume: '980 Lot', rebate: '$14,700' },
  { rank: 3, name: 'วิภาวี ส.', country: 'TH', flag: '🇹🇭', volume: '820 Lot', rebate: '$12,300' },
  { rank: 4, name: 'Chanwit P.', country: 'TH', flag: '🇹🇭', volume: '705 Lot', rebate: '$10,575' },
  { rank: 5, name: 'ปิยะพงษ์ อ.', country: 'VN', flag: '🇻🇳', volume: '640 Lot', rebate: '$9,600' },
  { rank: 6, name: 'Suda R.', country: 'TH', flag: '🇹🇭', volume: '590 Lot', rebate: '$8,850' },
  { rank: 7, name: 'ธนกร ว.', country: 'SG', flag: '🇸🇬', volume: '512 Lot', rebate: '$7,680' },
  { rank: 8, name: 'Kanokwan T.', country: 'MY', flag: '🇲🇾', volume: '470 Lot', rebate: '$7,050' },
]

const previousMonthLeaders = [
  { rank: 1, name: 'อรุณี ค.', country: 'TH', flag: '🇹🇭', volume: '1,410 Lot', rebate: '$21,150' },
  { rank: 2, name: 'Thanawat J.', country: 'TH', flag: '🇹🇭', volume: '1,020 Lot', rebate: '$15,300' },
  { rank: 3, name: 'มนัสวี พ.', country: 'VN', flag: '🇻🇳', volume: '860 Lot', rebate: '$12,900' },
]

const rankStyles: Record<number, string> = {
  1: 'bg-[#F5B700] text-white',
  2: 'bg-zinc-400 text-white',
  3: 'bg-[#C97A3D] text-white',
}

function getPreviousMonthLabel() {
  const date = new Date()
  date.setDate(1)
  date.setMonth(date.getMonth() - 1)
  return new Intl.DateTimeFormat('th-TH', {
    month: 'long',
    year: 'numeric',
    calendar: 'buddhist',
  }).format(date)
}

function getCurrentMonthLabel() {
  return new Intl.DateTimeFormat('th-TH', {
    month: 'long',
    year: 'numeric',
    calendar: 'buddhist',
  }).format(new Date())
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
        rankStyles[rank] ?? 'bg-[#0B1B3B]/8 text-[#0B1B3B]'
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
  const previousMonthLabel = getPreviousMonthLabel()
  const currentMonthLabel = getCurrentMonthLabel()
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMonthEnd)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeUntilMonthEnd()), 1000)
    return () => clearInterval(timer)
  }, [])

  const totalPages = Math.max(1, Math.ceil(leaders.length / PAGE_SIZE))
  const pagedLeaders = leaders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Leaderboard
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            อันดับผู้ได้รับรีเบตสูงสุด
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            จัดอันดับสมาชิก BeSight ที่ได้รับเงินคืนจากการเทรดสูงสุดประจำเดือนนี้
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-[#0B1B3B]/5 px-4 py-2 text-sm font-semibold text-[#0B1B3B]">
              ประจำเดือน {currentMonthLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-4 py-2 text-sm font-semibold text-[#16A34A]">
              <Clock className="h-4 w-4" />
              เหลืออีก {timeLeft.days} วัน {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:
              {pad(timeLeft.seconds)} ก่อนสิ้นเดือน
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1B3B]/5 px-4 py-2 text-sm font-semibold text-[#0B1B3B]">
              <Users className="h-4 w-4" />
              {ACTIVE_TRADERS_COUNT.toLocaleString()} เทรดเดอร์กำลัง Active
            </span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.06)]">
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

              <p className="relative shrink-0 text-base font-bold text-[#0B1B3B] md:text-lg">
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
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-zinc-900/[0.13] px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-900/[0.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              ก่อนหน้า
            </button>

            <p className="text-sm text-muted-foreground">
              หน้า {page} จาก {totalPages}
            </p>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-zinc-900/[0.13] px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-900/[0.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              ถัดไป
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="text-sm font-semibold text-[#0B1B3B]">
            Top 3 เดือนที่แล้ว ({previousMonthLabel})
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {previousMonthLeaders.map((leader) => (
              <div
                key={leader.rank}
                className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-[2px_4px_12px_rgba(0,0,0,0.06)]"
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

                <p className="text-lg font-bold text-[#0B1B3B]">{leader.rebate}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          ข้อมูลใช้เพื่อการนำเสนอเบื้องต้น อัปเดตอันดับจริงจะแสดงเมื่อเชื่อมต่อข้อมูลบัญชีสมาชิก
        </p>
      </div>
    </section>
  )
}
