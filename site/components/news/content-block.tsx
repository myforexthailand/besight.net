'use client'

import type { ContentBlock as ContentBlockType } from '@/site/data/news'

export function ContentBlockView({ block }: { block: ContentBlockType }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="legal-heading first:mt-0 md:text-3xl">
          {block.text}
        </h2>
      )
    case 'subheading':
      return (
        <h3 className="mt-8 text-lg font-semibold text-navy md:text-xl">
          {block.text}
        </h3>
      )
    case 'paragraph':
      return (
        <p className="legal-text">{block.text}</p>
      )
    case 'list':
      return block.ordered ? (
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-zinc-700">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-zinc-700">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'image':
      return (
        <img
          src={block.src}
          alt={block.alt ?? ''}
          loading="lazy"
          className="mt-6 w-full rounded-3xl object-cover"
        />
      )
    default:
      return null
  }
}
