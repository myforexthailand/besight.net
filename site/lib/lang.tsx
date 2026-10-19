'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

import { LANG_COOKIE, type SiteLang } from '@/site/lib/lang-shared'

export type { SiteLang }

type LangContextValue = { lang: SiteLang; setLang: (lang: SiteLang) => void }

const LangContext = createContext<LangContextValue>({ lang: 'th', setLang: () => {} })

/** The server reads the same cookie (see app/(site)/layout.tsx) and passes it
 *  as `initialLang`, so the first HTML already matches the visitor's choice. */
export function SiteLangProvider({ initialLang = 'th', children }: { initialLang?: SiteLang; children: ReactNode }) {
  const [lang, setLangState] = useState<SiteLang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: SiteLang) => {
    setLangState(next)
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
  }, [])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useSiteLang() {
  return useContext(LangContext)
}

/** `const t = useT()` then `t('ข้อความไทย', 'English text')`. */
export function useT() {
  const { lang } = useSiteLang()
  return (th: string, en: string) => (lang === 'en' ? en : th)
}
