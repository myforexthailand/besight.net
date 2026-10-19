/* Kept apart from news.ts on purpose: news.ts holds all the seed articles
   (~1,500 lines), and browser components that only need topic labels must
   not pull that whole dataset into the page bundle. */

/** Blog topics — the homepage card shows `eyebrow` above the title and
 *  `button` on its link (same labels as the original static cards). */
export const BLOG_TOPICS = [
  { key: 'market-news', eyebrow: 'Market News', button: 'Market News' },
  { key: 'gold-outlook', eyebrow: 'Gold Outlook', button: 'Gold Outlook' },
  { key: 'economic-calendar', eyebrow: 'Economic News', button: 'Economic Calendar' },
  { key: 'besight-update', eyebrow: 'BeSight Update', button: 'BeSight Update' },
] as const

export type BlogTopic = (typeof BLOG_TOPICS)[number]['key']

export function blogTopic(key: string | null | undefined) {
  return BLOG_TOPICS.find((t) => t.key === key) ?? BLOG_TOPICS[0]
}
