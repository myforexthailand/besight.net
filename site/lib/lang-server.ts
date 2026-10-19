import { cookies } from 'next/headers'

import { LANG_COOKIE, type SiteLang } from '@/site/lib/lang-shared'

export async function getServerLang(): Promise<SiteLang> {
  return (await cookies()).get(LANG_COOKIE)?.value === 'en' ? 'en' : 'th'
}
