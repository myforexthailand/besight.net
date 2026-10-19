/* Shape of a tool's details page (/indicators/<handle>), edited in CRM →
   Website → Tools → "Details page". Kept free of data so client code can
   import it cheaply; the built-in PO3XM page lives in lib/server/toolPages.ts. */

export const TOOL_ICONS = [
  'target', 'shield', 'crosshair', 'gauge', 'bell', 'check', 'list', 'cpu', 'file',
  'history', 'download', 'chart', 'info', 'refresh', 'wallet', 'clock',
] as const
export type ToolIcon = (typeof TOOL_ICONS)[number]

export const TOOL_TONES = ['default', 'green', 'red', 'amber'] as const
export type ToolTone = (typeof TOOL_TONES)[number]

export type ToolLink = { label: string; url: string }
export type ToolFact = { icon?: ToolIcon; label: string }
export type ToolItem = { title: string; text?: string; image?: string; icon?: ToolIcon; tone?: ToolTone }
export type ToolImage = { url: string; caption?: string }
export type ToolRow = { label: string; value: string }

export type ToolHero = {
  /** Logo image above the intro; without one the page title is shown as text. */
  logo?: string
  intro: string
  facts: ToolFact[]
  /** First one is the solid (primary) button. */
  buttons: ToolLink[]
  links: ToolLink[]
  /** Image or video (.mp4 / .webm) on the right. */
  media?: string
}

type BlockBase = {
  background: 'white' | 'gray'
  eyebrow?: string
  title?: string
  description?: string
  /** Small centred text under the block. */
  note?: string
}

export const CARD_VARIANTS = ['card', 'center', 'alert'] as const
export type CardVariant = (typeof CARD_VARIANTS)[number]

export type ToolBlock =
  | (BlockBase & {
      type: 'cards'
      columns: 2 | 3 | 4 | 5
      variant: CardVariant
      items: ToolItem[]
      /** 'split': heading text on the left, the cards stacked on the right (single column below lg). */
      layout?: 'split'
      /** With layout 'split': shown on the right instead of the cards. */
      image?: string
      /** With layout 'split': cards/image on the left, text on the right (large screens only). */
      flip?: boolean
    })
  | (BlockBase & { type: 'images'; images: ToolImage[]; badges: ToolItem[] })
  | (BlockBase & {
      type: 'split'
      bullets: string[]
      bulletIcon: ToolIcon
      tags: string[]
      /** Right-hand side: an image, a card holding the bullets, or a dark panel of rows. */
      side: 'image' | 'bullets' | 'panel' | 'none'
      /** Put the side content on the left and the text on the right (large screens; stacked order is unchanged). */
      flip?: boolean
      image?: string
      panelTitle?: string
      rows: ToolRow[]
      panelText?: string
    })
  | (BlockBase & { type: 'steps'; items: ToolItem[] })
  | (BlockBase & {
      type: 'cta'
      button: ToolLink
      listTitle?: string
      bullets: string[]
      aboutTitle?: string
      aboutText?: string
      logo?: string
      /** Dark card background for a light/transparent logo (default: white card). */
      logoDark?: boolean
      promo?: string
    })

export type ToolBlockType = ToolBlock['type']
export const TOOL_BLOCK_TYPES: ToolBlockType[] = ['cards', 'images', 'split', 'steps', 'cta']

export type ToolPage = { hero: ToolHero; blocks: ToolBlock[] }

export function emptyBlock(type: ToolBlockType): ToolBlock {
  const base = { background: 'white' as const, eyebrow: '', title: '', description: '', note: '' }
  switch (type) {
    case 'cards':
      return { ...base, type, columns: 3, variant: 'card', items: [{ title: '', text: '' }] }
    case 'images':
      return { ...base, type, images: [{ url: '', caption: '' }], badges: [] }
    case 'split':
      return { ...base, type, bullets: [], bulletIcon: 'check', tags: [], side: 'image', image: '', rows: [] }
    case 'steps':
      return { ...base, type, items: [{ title: '', text: '' }] }
    case 'cta':
      return { ...base, type, button: { label: 'Get Access', url: '#hero' }, bullets: [] }
  }
}
