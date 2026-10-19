'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import type { ContentBlock } from '@/site/data/news'
import { useT } from '@/site/lib/lang'

type ImageBlock = Extract<ContentBlock, { type: 'image' }>

export type ContentGroup = ContentBlock | { type: 'gallery'; images: ImageBlock[] }

export function groupContentBlocks(content: ContentBlock[]): ContentGroup[] {
  const groups: ContentGroup[] = []
  let buffer: ImageBlock[] = []

  const flush = () => {
    if (buffer.length) {
      groups.push({ type: 'gallery', images: buffer })
      buffer = []
    }
  }

  for (const block of content) {
    if (block.type === 'image') {
      buffer.push(block)
    } else {
      flush()
      groups.push(block)
    }
  }
  flush()

  return groups
}

interface GalleryImage {
  src: string
  alt?: string
}

const AUTOPLAY_MS = 4000

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const t = useT()
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [paused, setPaused] = useState(false)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  const goTo = (i: number) => setIndex(((i % images.length) + images.length) % images.length)
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useEffect(() => {
    if (images.length <= 1 || paused || expanded) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [images.length, paused, expanded])

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  useEffect(() => {
    if (!expanded) return

    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, index])

  if (images.length === 1) {
    return (
      <img
        src={images[0].src}
        alt={images[0].alt ?? ''}
        loading="lazy"
        className="mt-6 w-full rounded-3xl object-cover"
      />
    )
  }

  return (
    <div
      className="mt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex justify-center overflow-hidden rounded-3xl bg-zinc-100">
        <div className="relative">
          <img
            src={images[index].src}
            alt={images[index].alt ?? ''}
            onClick={() => setExpanded(true)}
            className="h-auto w-auto max-h-[min(70vh,560px)] max-w-full cursor-zoom-in object-contain"
          />

          <button
            type="button"
            onClick={prev}
            aria-label={t('ภาพก่อนหน้า', 'Previous image')}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={t('ภาพถัดไป', 'Next image')}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
            {index + 1} / {images.length}
          </span>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((image, i) => (
          <button
            key={image.src}
            ref={(el) => {
              thumbRefs.current[i] = el
            }}
            type="button"
            onClick={() => goTo(i)}
            className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-opacity ${
              i === index ? 'opacity-100 ring-2 ring-navy' : 'opacity-50 hover:opacity-80'
            }`}
          >
            <img src={image.src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label={t('ปิด', 'Close')}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label={t('ภาพก่อนหน้า', 'Previous image')}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <img
            src={images[index].src}
            alt={images[index].alt ?? ''}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label={t('ภาพถัดไป', 'Next image')}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  )
}
