'use client'

import { useEffect, useRef } from 'react'

const CONFIG = {
  symbols: [
    { description: '', proName: 'FX:USDJPY' },
    { description: '', proName: 'FX:EURUSD' },
    { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
    { description: '', proName: 'FX:GBPUSD' },
    { description: '', proName: 'PEPPERSTONE:XAUUSD' },
    { description: '', proName: 'COINBASE:BTCUSD' },
  ],
  showSymbolLogo: true,
  isTransparent: true,
  displayMode: 'compact',
  colorTheme: 'dark',
  locale: 'th_TH',
}

export function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || container.querySelector('script')) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.type = 'text/javascript'
    script.async = true
    script.textContent = JSON.stringify(CONFIG)
    container.appendChild(script)
  }, [])

  return (
    <div className="w-full bg-transparent py-3">
      <div ref={containerRef} className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  )
}
