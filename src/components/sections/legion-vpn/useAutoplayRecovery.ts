import { type RefObject, useEffect } from 'react'

/** Retries `.play()` on the video once immediately, and again on the first user interaction (mobile autoplay policies). */
export function useAutoplayRecovery(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {})

    const retryPlay = () => {
      video.play().catch(() => {})
    }

    window.addEventListener('click', retryPlay, { once: true })
    window.addEventListener('touchstart', retryPlay, { once: true })

    return () => {
      window.removeEventListener('click', retryPlay)
      window.removeEventListener('touchstart', retryPlay)
    }
  }, [videoRef])
}
