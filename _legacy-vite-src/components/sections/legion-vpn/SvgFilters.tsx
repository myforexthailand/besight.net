export function SvgFilters() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <filter
          id="liquid-glass-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.015"
            numOctaves={3}
            seed={7}
            result="noise"
          />

          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 100 0"
            result="alphaBoost"
          />
          <feGaussianBlur in="alphaBoost" stdDeviation={45} result="heightmap" />
          <feComponentTransfer in="heightmap" result="edgeMask">
            <feFuncA type="linear" slope={-1.3} intercept={1} />
          </feComponentTransfer>

          <feComposite
            in="noise"
            in2="edgeMask"
            operator="arithmetic"
            k1={1}
            k2={0}
            k3={0}
            k4={0}
            result="edgeNoise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="edgeNoise"
            scale={65}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="edgeNoise"
            scale={56}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="edgeNoise"
            scale={47}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispB"
          />

          <feColorMatrix
            in="dispR"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="dispRChannel"
          />
          <feColorMatrix
            in="dispG"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="dispGChannel"
          />
          <feColorMatrix
            in="dispB"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="dispBChannel"
          />

          <feBlend in="dispRChannel" in2="dispGChannel" mode="screen" result="blendRG" />
          <feBlend in="blendRG" in2="dispBChannel" mode="screen" />
        </filter>

        {/* Defined for future use; not applied to any element yet. */}
        <filter
          id="lens-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 100 0"
            result="alphaBoost"
          />
          <feGaussianBlur in="alphaBoost" stdDeviation={40} result="heightmap" />

          <feOffset in="heightmap" dx={2} dy={0} result="hRight" />
          <feOffset in="heightmap" dx={-2} dy={0} result="hLeft" />
          <feComposite
            in="hRight"
            in2="hLeft"
            operator="arithmetic"
            k1={0}
            k2={10}
            k3={-10}
            k4={0.5}
            result="gradX"
          />

          <feOffset in="heightmap" dx={0} dy={2} result="hDown" />
          <feOffset in="heightmap" dx={0} dy={-2} result="hUp" />
          <feComposite
            in="hDown"
            in2="hUp"
            operator="arithmetic"
            k1={0}
            k2={10}
            k3={-10}
            k4={0.5}
            result="gradY"
          />

          <feColorMatrix
            in="gradX"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="gradXRed"
          />
          <feColorMatrix
            in="gradY"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="gradYGreen"
          />
          <feComposite
            in="gradXRed"
            in2="gradYGreen"
            operator="arithmetic"
            k1={0}
            k2={1}
            k3={1}
            k4={0}
            result="lensMap"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="lensMap"
            scale={10}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="lensMap"
            scale={9}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="lensMap"
            scale={8}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispB"
          />

          <feColorMatrix
            in="dispR"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="lensR"
          />
          <feColorMatrix
            in="dispG"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="lensG"
          />
          <feColorMatrix
            in="dispB"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="lensB"
          />

          <feBlend in="lensR" in2="lensG" mode="screen" result="lensRG" />
          <feBlend in="lensRG" in2="lensB" mode="screen" />
        </filter>
      </defs>
    </svg>
  )
}
