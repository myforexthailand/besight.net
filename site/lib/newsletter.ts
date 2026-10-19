'use client'

import { useState } from 'react'

import { useT } from '@/site/lib/lang'

export type NewsletterState = 'idle' | 'sending' | 'done' | 'error' | 'invalid'

/** Shared submit logic for the footer and article newsletter forms. Field
 *  names: `email`, optional `name`, and the hidden `website` honeypot. */
export function useNewsletter(source: string) {
  const t = useT()
  const [state, setState] = useState<NewsletterState>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setState('sending')
    try {
      const response = await fetch('/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          name: data.get('name'),
          website: data.get('website'),
          source,
        }),
      })
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (response.ok && payload.ok) {
        setState('done')
        form.reset()
      } else {
        setState(payload.error === 'invalid_email' ? 'invalid' : 'error')
      }
    } catch {
      setState('error')
    }
  }

  const message: Record<NewsletterState, string> = {
    idle: '',
    sending: '',
    done: t('สมัครรับข่าวสารเรียบร้อยแล้ว ขอบคุณครับ', 'You have subscribed successfully. Thank you!'),
    invalid: t('กรุณากรอกอีเมลให้ถูกต้อง', 'Please enter a valid email address.'),
    error: t('สมัครไม่สำเร็จ ลองใหม่อีกครั้ง', 'Subscription failed. Please try again.'),
  }
  return { state, onSubmit, message: message[state] }
}

/** Off-screen field bots fill in and people never see. */
export const HONEYPOT_STYLE: React.CSSProperties = { position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }
