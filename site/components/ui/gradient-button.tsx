'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/site/lib/utils'

const GRADIENT =
  'bg-gradient-to-r from-[#84a9fa] via-[#fb6fec] via-[#fba69e] via-[#fdd4a3] via-[#fb6fec] to-[#84a9fa] bg-[length:200%]'

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  /** Classes for the inner button itself (padding, text size, etc). `className` targets the outer gradient-border wrapper (margin, width, display). */
  innerClassName?: string
  /** Attention animation: flowing gradient border, soft glow, light sweep and a wiggling icon (used for the navbar Login). */
  cta?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, innerClassName, cta = false, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <div
        className={cn(
          'group inline-block rounded-full p-[2px]',
          GRADIENT,
          'bg-[position:0%_50%] transition-[background-position] duration-[800ms] ease-out hover:bg-[position:200%_50%]',
          cta && 'cta-login',
          className,
        )}
      >
        <Comp
          ref={ref}
          className={cn(
            'flex h-full w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors',
            innerClassName,
          )}
          {...props}
        >
          {children}
        </Comp>
      </div>
    )
  },
)
GradientButton.displayName = 'GradientButton'

export { GradientButton }
