'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/site/lib/utils'

const REFERRAL_CODE = 'BSIMX'

const GRADIENT =
  'bg-gradient-to-r from-[#84a9fa] via-[#fb6fec] via-[#fba69e] via-[#fdd4a3] via-[#fb6fec] to-[#84a9fa] bg-[length:200%]'

export function CodeBadge({
  className = '',
  innerClassName = '',
}: {
  className?: string
  innerClassName?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <div
      className={cn(
        'group inline-block rounded-full p-[2px]',
        GRADIENT,
        'bg-[position:0%_50%] transition-[background-position] duration-[800ms] ease-out hover:bg-[position:200%_50%]',
        className,
      )}
    >
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'flex h-full w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors',
          innerClassName,
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        Code: {REFERRAL_CODE}
      </button>
    </div>
  )
}
