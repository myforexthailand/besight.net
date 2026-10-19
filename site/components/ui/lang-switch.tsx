'use client'

import { useState } from 'react'

import { useSiteLang } from '@/site/lib/lang'

function ThaiFlag() {
  return (
    <svg viewBox="0 0 36 36" className="h-full w-full" aria-hidden>
      <rect width="36" height="36" fill="#ED1C24" />
      <rect y="6" width="36" height="24" fill="#F4F5F8" />
      <rect y="12" width="36" height="12" fill="#2D2A8F" />
    </svg>
  )
}

function UsFlag() {
  return (
    <svg viewBox="0 0 36 36" className="h-full w-full" aria-hidden>
      <rect width="36" height="36" fill="#F4F5F8" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * 36 / 13} width="36" height={36 / 13} fill="#D80027" />
      ))}
      <rect width="18" height={7 * 36 / 13} fill="#2D4DA2" />
      {[
        [4, 4], [9, 4], [14, 4], [6.5, 8], [11.5, 8], [4, 12], [9, 12], [14, 12],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#F4F5F8" />
      ))}
    </svg>
  )
}

/** One-button language toggle: shows the current language's flag; press to switch TH ⇄ EN. */
export function LangSwitch() {
  const { lang, setLang } = useSiteLang()
  const isEn = lang === 'en'
  const [played, setPlayed] = useState(false)

  return (
    <button
      type="button"
      aria-label={isEn ? 'Language: English. Switch to Thai' : 'ภาษา: ไทย — เปลี่ยนเป็นอังกฤษ'}
      title={isEn ? 'English' : 'ไทย'}
      onClick={() => {
        setPlayed(true)
        setLang(isEn ? 'th' : 'en')
      }}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-zinc-900/[0.08] bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-75 max-[375px]:h-9 max-[375px]:w-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {played && (
        <span key={`ring-${lang}`} aria-hidden className="lang-ring pointer-events-none absolute inset-0 rounded-full border-2 border-[#2D4DA2]/40" />
      )}
      <span
        key={lang}
        className={`block h-[70%] w-[70%] overflow-hidden rounded-full ${played ? 'lang-flip' : ''}`}
      >
        {isEn ? <UsFlag /> : <ThaiFlag />}
      </span>
    </button>
  )
}
