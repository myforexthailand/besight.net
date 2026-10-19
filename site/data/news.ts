// Article shapes for the public site's news/blog and events. The articles
// themselves live in the database (NewsArticle), managed in CRM → News and
// CRM → BeSight Events.

/** "Single Block" content model: an article body is an ordered array of
 *  typed blocks that the article page renders in sequence. */
export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'image'; src: string; alt?: string }

export type ArticleCategory = 'News' | 'Promotion' | 'Tools'

/** Which homepage section an article belongs to: the blog ("News &
 *  Insights") or BeSight Events. Both also appear on /news. */
export type ArticleSection = 'blog' | 'event'

export { BLOG_TOPICS, blogTopic, type BlogTopic } from './blogTopics'
import type { BlogTopic } from './blogTopics'

export interface Article {
  slug: string
  title: string
  category: ArticleCategory
  date: string
  excerpt: string
  heroImage: string
  sourceUrl: string
  content: ContentBlock[]
  /** Pinned in CRM → News: shown first in its homepage section. */
  pinned?: boolean
  section?: ArticleSection
  topic?: BlogTopic | null
}
