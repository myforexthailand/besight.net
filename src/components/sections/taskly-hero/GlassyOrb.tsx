import { ORB_VIDEO_SRC } from './constants'

export function GlassyOrb() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible">
      <video
        autoPlay
        loop
        muted
        playsInline
        src={ORB_VIDEO_SRC}
        className="scale-125"
        style={{
          filter: 'hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)',
        }}
      />
    </div>
  )
}
