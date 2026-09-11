import { liquidMetalFragmentShader, ShaderMount } from '@paper-design/shaders'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

interface LiquidMetalContainerProps {
  children: React.ReactNode
  className?: string
  borderRadius?: string
}

export function LiquidMetalContainer({
  children,
  className = '',
  borderRadius = '100px',
}: LiquidMetalContainerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shaderRef = useRef<HTMLDivElement>(null)
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null)

  useEffect(() => {
    const styleId = 'shader-container-style-nav'
    let style = document.getElementById(styleId) as HTMLStyleElement | null

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    // Always refresh this stylesheet so Vite HMR cannot retain stale mask rules.
    style.textContent = `
      @keyframes liquid-metal-border-flow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .liquid-metal-border-base,
      .shader-container-nav {
        box-sizing: border-box;
        padding: 2px;
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        mask-composite: exclude;
      }

      .liquid-metal-border-base {
        background:
          linear-gradient(
            115deg,
            #7b8490 0%,
            #f8fbff 12%,
            #a9b2be 24%,
            #ffffff 38%,
            #6f7884 52%,
            #dfe8f2 66%,
            #ffffff 80%,
            #8b95a2 100%
          );
        background-size: 300% 300%;
        animation: liquid-metal-border-flow 4s ease-in-out infinite;
      }

      .shader-container-nav {
        overflow: hidden;
      }

      .shader-container-nav canvas {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 0 !important;
      }

      @media (prefers-reduced-motion: reduce) {
        .liquid-metal-border-base {
          animation: none;
        }
      }
    `

    try {
      if (shaderRef.current) {
        shaderMount.current?.destroy?.()

        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6,
        )
      }
    } catch (error) {
      console.error('[v0] Failed to load shader:', error)
    }

    return () => {
      shaderMount.current?.destroy?.()
      shaderMount.current = null
    }
  }, [])

  return (
    <div
      className={`relative isolate ${className}`}
      onMouseEnter={() => {
        setIsHovered(true)
        shaderMount.current?.setSpeed?.(1)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        shaderMount.current?.setSpeed?.(0.6)
      }}
      style={{
        borderRadius,
        background: 'transparent',
        boxShadow: isHovered
          ? '0 0 0 1px rgba(255,255,255,.28), 0 10px 24px rgba(0,0,0,.24)'
          : '0 0 0 1px rgba(255,255,255,.16), 0 8px 18px rgba(0,0,0,.18)',
        transition: 'box-shadow 300ms ease',
      }}
    >
      {/* Continuous metal base keeps the complete outline visible. */}
      <div
        aria-hidden="true"
        className="liquid-metal-border-base pointer-events-none absolute inset-0 z-0"
        style={{ borderRadius }}
      />

      {/* WebGL shader adds moving liquid highlights above the full base. */}
      <div
        ref={shaderRef}
        aria-hidden="true"
        className="shader-container-nav pointer-events-none absolute inset-0 z-[1]"
        style={{
          borderRadius,
          opacity: 0.72,
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative z-[2]">{children}</div>
    </div>
  )
}