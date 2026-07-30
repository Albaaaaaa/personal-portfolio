import { useEffect, useRef, useState } from 'react'
import {
  BG_IMAGE,
  CURSOR_LERP,
  FRONT_VIDEO,
  GRID_LERP,
  GRID_PARALLAX_STRENGTH,
  OVERLAY_IMAGE,
  SPOTLIGHT_RADIUS,
} from '../constants'
import { PROFILE } from '../data/portfolio'
import {
  ArrowDownIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
} from './icons'
import { LiquidButton } from './ui/liquid-glass-button'

/** Feathering profile of the spotlight mask: [stop, alpha]. */
const MASK_STOPS: Array<[number, number]> = [
  [0, 1],
  [0.4, 1],
  [0.6, 0.75],
  [0.75, 0.4],
  [0.88, 0.12],
  [1, 0],
]

/** Movement below this many pixels skips a mask redraw. */
const REDRAW_EPSILON = 0.35

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const revealRef = useRef<HTMLDivElement | null>(null)

  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  // Per-frame state lives in refs to avoid re-rendering on every mouse move.
  const target = useRef({ x: -9999, y: -9999 })
  const smooth = useRef({ x: -9999, y: -9999 })
  const gridTarget = useRef({ x: 0, y: 0 })
  const gridSmooth = useRef({ x: 0, y: 0 })
  const lastDrawn = useRef({ x: Number.NaN, y: Number.NaN })

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sizeCanvas = () => {
      const rect = section.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(rect.width))
      canvas.height = Math.max(1, Math.round(rect.height))
      lastDrawn.current = { x: Number.NaN, y: Number.NaN }
    }

    sizeCanvas()

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Snap on the first sample so the spotlight doesn't sweep in.
      if (smooth.current.x < -9000) smooth.current = { x, y }
      target.current = { x, y }

      gridTarget.current = {
        x: ((x - rect.width / 2) / rect.width) * GRID_PARALLAX_STRENGTH,
        y: ((y - rect.height / 2) / rect.height) * GRID_PARALLAX_STRENGTH,
      }

      setHovering(true)
    }

    const handlePointerLeave = () => setHovering(false)

    const drawMask = (x: number, y: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, SPOTLIGHT_RADIUS)
      for (const [stop, alpha] of MASK_STOPS) {
        gradient.addColorStop(stop, `rgba(255, 255, 255, ${alpha})`)
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, SPOTLIGHT_RADIUS, 0, Math.PI * 2)
      ctx.fill()

      const dataUrl = canvas.toDataURL()
      const reveal = revealRef.current
      if (reveal) {
        reveal.style.webkitMaskImage = `url(${dataUrl})`
        reveal.style.maskImage = `url(${dataUrl})`
      }
    }

    let frame = 0

    const tick = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * CURSOR_LERP
      smooth.current.y += (target.current.y - smooth.current.y) * CURSOR_LERP

      gridSmooth.current.x +=
        (gridTarget.current.x - gridSmooth.current.x) * GRID_LERP
      gridSmooth.current.y +=
        (gridTarget.current.y - gridSmooth.current.y) * GRID_LERP

      const movedEnough =
        Number.isNaN(lastDrawn.current.x) ||
        Math.abs(smooth.current.x - lastDrawn.current.x) > REDRAW_EPSILON ||
        Math.abs(smooth.current.y - lastDrawn.current.y) > REDRAW_EPSILON

      if (movedEnough && smooth.current.x > -9000) {
        drawMask(smooth.current.x, smooth.current.y)
        lastDrawn.current = { x: smooth.current.x, y: smooth.current.y }

        setGridOffset({
          x: Math.round(gridSmooth.current.x * 100) / 100,
          y: Math.round(gridSmooth.current.y * 100) / 100,
        })
      }

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)

    section.addEventListener('pointermove', handlePointerMove)
    section.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('resize', sizeCanvas)

    return () => {
      window.cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', sizeCanvas)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="font-helvetica-neue relative h-screen min-h-[600px] w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Layer 1 — grid background with cursor parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: 0.1,
          transform: `translate3d(${gridOffset.x}px, ${gridOffset.y}px, 0)`,
        }}
        aria-hidden="true"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Layer 2 — background image */}
      <div
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
        aria-hidden="true"
      />

      {/* Edge scrims only — keeps the mid-frame imagery untouched while the
          top heading and bottom copy stay legible. */}
      <div
        className="absolute inset-x-0 top-0 z-[15] h-[45%] bg-gradient-to-b from-black/75 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[15] h-[45%] bg-gradient-to-t from-black/85 to-transparent"
        aria-hidden="true"
      />

      {/* Layer 3 — hero name, anchored near the top per the layout spec */}
      <div className="absolute inset-x-0 top-16 z-20 px-4 text-center sm:top-20 md:top-24">
        <h1 className="animate-hero-rise font-instrument-serif mx-auto max-w-[14ch] text-[2.5rem] uppercase leading-[0.9] text-white xs:text-[3.25rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[9rem]">
          {PROFILE.name}
        </h1>
        <p
          className="animate-hero-rise mt-4 text-sm font-medium tracking-[0.2em] text-white/85 uppercase sm:mt-6 sm:text-base md:text-lg"
          style={{ animationDelay: '160ms' }}
        >
          {PROFILE.role}
        </p>
      </div>

      {/* Layer 4 — atmospheric overlay */}
      {OVERLAY_IMAGE && (
        <img
          src={OVERLAY_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[25] h-full w-full object-cover"
        />
      )}

      {/* Layer 5 — cursor spotlight reveal (video visible in bottom 60%) */}
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        style={{
          opacity: hovering ? 1 : 0,
          transition: 'opacity 400ms ease-out',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      >
        <video
          src={FRONT_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ clipPath: 'inset(40% 0 0 0)' }}
        />
      </div>

      {/* Layer 6 — bottom copy block. Sits above the reveal so the CTAs stay
          clickable and readable while the spotlight plays behind them. */}
      <div className="absolute inset-x-0 bottom-0 z-40 px-5 pb-10 sm:px-8 sm:pb-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div
            className="animate-hero-rise liquid-glass mb-5 flex items-center gap-2 rounded-full px-4 py-2"
            style={{ animationDelay: '240ms' }}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
            <span className="text-xs font-medium text-white/85 sm:text-sm">
              Open to Work — {PROFILE.location}
            </span>
          </div>

          <p
            className="animate-hero-rise max-w-2xl text-xs leading-relaxed text-white/70 sm:text-sm"
            style={{ animationDelay: '320ms' }}
          >
            {PROFILE.tagline}
          </p>

          <div
            className="animate-hero-rise mt-7 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: '400ms' }}
          >
            <LiquidButton
              asChild
              size="lg"
              className="w-full rounded-full bg-accent/80 px-7 py-3.5 text-sm font-semibold text-white sm:w-auto"
            >
              <a href="#portfolio">
                Lihat Portfolio
                <ArrowDownIcon className="h-4 w-4" />
              </a>
            </LiquidButton>
            <LiquidButton
              asChild
              size="lg"
              className="w-full rounded-full px-7 py-3.5 text-sm font-semibold text-white sm:w-auto"
            >
              <a href={PROFILE.cvUrl} download>
                Download CV
                <DownloadIcon className="h-4 w-4" />
              </a>
            </LiquidButton>

            <div className="flex gap-3 sm:ml-1">
              <LiquidButton
                asChild
                size="icon"
                className="h-12 w-12 rounded-full text-white/80 hover:text-white"
              >
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              </LiquidButton>
              <LiquidButton
                asChild
                size="icon"
                className="h-12 w-12 rounded-full text-white/80 hover:text-white"
              >
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </LiquidButton>
            </div>
          </div>
        </div>
      </div>

      {/* Offscreen buffer that generates the mask bitmap. */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </section>
  )
}