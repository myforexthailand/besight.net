'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'

import { useSiteLang, useT } from '@/site/lib/lang'

declare global {
  interface Window {
    FB?: { XFBML: { parse: (node?: HTMLElement) => void } }
  }
}

interface MemberComment {
  id: string
  name: string
  message: string
  date: string
}

function FacebookComments({ articleUrl }: { articleUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { lang } = useSiteLang()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const parse = () => window.FB?.XFBML.parse(container)

    if (window.FB) {
      parse()
      return
    }

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = `https://connect.facebook.net/${lang === 'en' ? 'en_US' : 'th_TH'}/sdk.js#xfbml=1&version=v21.0`
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.onload = parse
      document.body.appendChild(script)
    } else {
      document.getElementById('facebook-jssdk')?.addEventListener('load', parse)
    }
  }, [articleUrl, lang])

  return (
    <div ref={containerRef}>
      <div id="fb-root" />
      <div
        className="fb-comments"
        data-href={articleUrl}
        data-width="100%"
        data-numposts="5"
      />
    </div>
  )
}

function formatDateTime(iso: string, lang: 'th' | 'en') {
  return new Date(iso).toLocaleString(lang === 'en' ? 'en-US' : 'th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MemberComments({ slug }: { slug: string }) {
  const t = useT()
  const { lang } = useSiteLang()
  const storageKey = `besight-comments-${slug}`
  const [comments, setComments] = useState<MemberComment[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only initial sync from localStorage
      setComments(raw ? (JSON.parse(raw) as MemberComment[]) : [])
    } catch {
      setComments([])
    }
  }, [storageKey])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const next: MemberComment[] = [
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        message: message.trim(),
        date: new Date().toISOString(),
      },
      ...comments,
    ]
    setComments(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
    setMessage('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('ชื่อของคุณ', 'Your name')}
          className="w-full rounded-[10px] border border-zinc-900/[0.13] px-3 py-2 text-sm outline-none transition-colors focus:border-navy"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('แสดงความคิดเห็นของคุณ...', 'Share your thoughts...')}
          rows={3}
          className="w-full resize-none rounded-[10px] border border-zinc-900/[0.13] px-3 py-2 text-sm outline-none transition-colors focus:border-navy"
        />
        <button
          type="submit"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
        >
          {t('โพสต์ความคิดเห็น', 'Post comment')}
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>

      <div className="mt-8 space-y-6">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">{t('ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!', 'No comments yet. Be the first to comment!')}</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
              {c.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">{formatDateTime(c.date, lang)}</p>
              <p className="mt-1.5 text-sm text-zinc-700">{c.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CommentsSection({ slug, articleUrl }: { slug: string; articleUrl: string }) {
  const t = useT()
  const [tab, setTab] = useState<'facebook' | 'member'>('facebook')

  return (
    <div className="mt-16 border-t border-zinc-900/10 pt-10">
      <p className="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <MessageCircle className="h-5 w-5" />
        {t('แสดงความคิดเห็น', 'Comments')}
      </p>

      <div className="mt-5 inline-flex rounded-full border-2 border-zinc-900/[0.13] p-1">
        <button
          type="button"
          onClick={() => setTab('facebook')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === 'facebook' ? 'bg-navy text-white' : 'text-zinc-600 hover:text-navy'
          }`}
        >
          Facebook
        </button>
        <button
          type="button"
          onClick={() => setTab('member')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === 'member' ? 'bg-navy text-white' : 'text-zinc-600 hover:text-navy'
          }`}
        >
          {t('สมาชิกเว็บ BeSight', 'BeSight Members')}
        </button>
      </div>

      <div className="mt-6">
        {tab === 'facebook' ? (
          <FacebookComments articleUrl={articleUrl} />
        ) : (
          <MemberComments slug={slug} />
        )}
      </div>
    </div>
  )
}
