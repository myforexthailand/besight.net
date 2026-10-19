import tailwindcssAnimate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  // Scoped to the public landing only — the CRM/dashboard don't use Tailwind.
  content: ['./site/**/*.{ts,tsx}', './app/(site)/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--site-border))',
        input: 'hsl(var(--site-input))',
        ring: 'hsl(var(--site-ring))',
        background: 'hsl(var(--site-background))',
        foreground: 'hsl(var(--site-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--site-primary))',
          foreground: 'hsl(var(--site-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--site-secondary))',
          foreground: 'hsl(var(--site-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--site-destructive))',
          foreground: 'hsl(var(--site-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--site-muted))',
          foreground: 'hsl(var(--site-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--site-accent))',
          foreground: 'hsl(var(--site-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--site-popover))',
          foreground: 'hsl(var(--site-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--site-card))',
          foreground: 'hsl(var(--site-card-foreground))',
        },
        navy: '#0B1B3B',
        steel: '#5E6470',
        positive: '#16A34A',
        negative: '#DC2626',
        gold: '#F5B700',
      },
      boxShadow: {
        soft: '2px 4px 12px rgba(0, 0, 0, 0.06)',
        'soft-lg': '2px 4px 20px rgba(0, 0, 0, 0.06)',
        'soft-hover': '0 8px 30px rgb(0, 0, 0, 0.04)',
      },
      borderRadius: {
        lg: 'var(--site-radius)',
        md: 'calc(var(--site-radius) - 2px)',
        sm: 'calc(var(--site-radius) - 4px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'legion-marquee': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'legion-spin-slow': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.08)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'legion-marquee': 'legion-marquee 25s linear infinite',
        'legion-spin-slow': 'legion-spin-slow 28s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config
