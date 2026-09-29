import { type RefObject, useState } from 'react'

import { HELMET_POSTER_SRC, HERO_VIDEO_SRC } from './constants'
import { useAutoplayRecovery } from './useAutoplayRecovery'

export function BackgroundVideo({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>
}) {
  const [ready, setReady] = useState(false)

  useAutoplayRecovery(videoRef)

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <img
        src={HELMET_POSTER_SRC}
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.01] object-cover"
      />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={HELMET_POSTER_SRC}
        src={HERO_VIDEO_SRC}
        onPlaying={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        className={`absolute inset-0 h-full w-full scale-[1.01] object-cover transition-opacity duration-[1500ms] ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
