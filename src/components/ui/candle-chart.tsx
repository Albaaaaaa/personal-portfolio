/* CandleChart — standalone component.
 * Integrated into the Publications section to visualise the SVR-GA
 * stock-forecasting research (ANTM.JK data).
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/*── shared────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const
const SANS ='inherit'

const isSnapshot = () =>
  typeof navigator !== 'undefined' && /\bChromatic\b/.test(navigator.userAgent)

/* ── colours ────────────────────────────────────────────────────────────── */

const UP = 'var(--chart-up, #34c28a)'
const DOWN = 'var(--chart-candle-down, #D0625F)'

/* ── candle data ────────────────────────────────────────────────────────── */

interface Candle {
  o: number
  h: number
  l: number
  c: number
  v: number
  t: number
}

function mulberry32(seed: number) {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61| t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const ARC: Array<[number, number]> = [
  [0, 0.24], [0.1, 0.34], [0.22, 0.6], [0.3, 0.88], [0.36, 1],
  [0.44, 0.68], [0.5, 0.45], [0.56, 0.6], [0.62, 0.33], [0.68, 0.26],
  [0.74, 0.42], [0.8, 0.31], [0.86, 0.19], [0.92, 0.29], [1, 0.35],
]

const lerpArc = (f: number) => {
  const hi = ARC.findIndex(([x]) => x >= f)
  if (hi <=0) return ARC[Math.max(0, hi)][1]
  const [x0, y0] = ARC[hi - 1]
  const [x1, y1] = ARC[hi]
  return y0 + ((f - x0) / (x1 - x0)) * (y1 - y0)
}

interface CandleSeries {
  candles: Candle[]
  min: number
  max: number
  maxVolume: number
}

function makeCandles(seed: number, count = 96, ceil = 3000): CandleSeries {
  const rand = mulberry32(seed)
  const floor = ceil *0.12
  const span = ceil - floor
  const start = Date.UTC(2024, 0, 2)
  const step = 6* 36e5

  const candles: Candle[] = []
  let prev = floor + lerpArc(0) * span
  for (let i = 0; i < count; i++) {
    const o = prev
    const base = floor + lerpArc(i / (count - 1)) * span
    const c = Math.max(floor * 0.6, base * (1 + (rand() -0.5) * 0.1))
    const h = Math.max(o, c) * (1 + rand() * 0.03)
    const l = Math.min(o, c) * (1 - rand() * 0.03)
    candles.push({ o, h, l, c, v: Math.abs(c - o) * 0.05 + rand() * 12, t: start + i * step })
    prev = c
  }

  return {
    candles,
    min: Math.min(...candles.map((k) => k.l)),
    max: Math.max(...candles.map((k) => k.h)),
    maxVolume: Math.max(...candles.map((k) => k.v)),
  }
}

const fmtIdr = (v: number) =>
  `Rp ${Math.round(v).toLocaleString('id-ID')}`

const fmtAxis = (v: number) =>
  v === 0 ? 'Rp 0' : `${Math.round(v / 1000)}k`

const fmtDay = (t: number) =>
  new Date(t).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', timeZone: 'UTC' })

const fmtStamp = (t: number) =>
  new Date(t)
    .toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })
    .replace(',', '') + ' UTC'

/* ── balance series helper ───────────────────────────────────────────────── */

const BAL_TIMEFRAMES = ['1H', '24H', '1W', '1M', '1Y', 'All'] as const
type BalTimeframe = (typeof BAL_TIMEFRAMES)[number]
const N =90

function balanceSeries(base: number, tf: BalTimeframe = '24H', changePct?: number, seed?: number): number[] {
  const rand = mulberry32(seed ?? 11+ BAL_TIMEFRAMES.indexOf(tf) * 97)
  const drift = tf === '1W' ? -0.12 : 0.35
  const vals: number[] = []
  let v = base *0.94
  for (let i = 0; i < N; i++) {
    v += (rand() - 0.42) * base * 0.006+ drift * base * 0.0008
    vals.push(v)
  }
  const end = vals[N - 1]
  if (end !== 0) {
    const k = base / end
    for (let i = 0; i < N; i++) vals[i] *= k
  }
  if (changePct !== undefined && vals[0] !== 0) {
    const open = base / (1 + changePct / 100)
    const ramp = open / vals[0]
    for (let i = 0; i < N; i++) vals[i] *= Math.pow(ramp, 1 - i / (N - 1))
  }
  return vals
}

/* ── chart constants ─────────────────────────────────────────────────────── */

const VB_W = 560
const VB_H = 220
const AXIS_W = 46
const VOL_H = 0
const GAP = 0

const MIN_W = 340
const MAX_W = 920
const TIMEFRAMES = ['1D', '5D', '1M', '6M', '1Y'] as const
const TF_COUNT: Record<(typeof TIMEFRAMES)[number], number> = { '1D': 24, '5D': 40, '1M': 60, '6M': 80, '1Y': 96 }
const MIN_VISIBLE = 12
const Y_SCALE_MIN = 0.4
const Y_SCALE_MAX = 1.6

/* ── props ──────────────────────────────────────────────────────────────── */

export type CandleChartProps = {
  seed?: number
  symbol?: string
  className?: string
  exchange?: string | null
  ceil?: number
  mid?: number
  kind?: 'candles' | 'line' | 'bars'
  priceFmt?: (n: number) => string
  axisFmt?: (n: number) => string
  chrome?: boolean
  fill?: boolean
}

/* ── component ──────────────────────────────────────────────────────────── */

export default function CandleChart({
  seed = 51,
  symbol = 'ANTM.JK',
  className,
  exchange = 'IDX',
  ceil = 2200,
  priceFmt = fmtIdr,
  axisFmt = fmtAxis,
  chrome = true,
  mid,
  kind = 'candles',
  fill = false,
}: CandleChartProps) {
  const reduced = useReducedMotion() || isSnapshot()
  const [timeframe, setTimeframe] = useState<(typeof TIMEFRAMES)[number]>('6M')
  const [hover, setHover] = useState<number | null>(null)
  const [zone, setZone] = useState<'price' | 'volume'>('price')
  const svgRef = useRef<SVGSVGElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const [width, setWidth] = useState<number | null>(null)
  const [volH] = useState(VOL_H)
  const widthDrag = useRef<{ startX: number; startW: number; max: number } | null>(null)

  const plotRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<{ w: number; h: number } | null>(null)
  useEffect(() => {
    const el = plotRef.current
    if (!fill || !el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect
      setBox({ w: Math.round(r.width), h: Math.round(r.height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [fill])

  const VW = fill && box ? Math.max(240, box.w) : VB_W
  const VH = fill && box ? Math.max(160, box.h) : VB_H
  const plotH = VH - volH - GAP

  const { candles } = useMemo(() => {
    if (mid == null) return makeCandles(seed, 96, ceil)
    const walk = balanceSeries(mid, '24H')
    let s2 = (seed * 2654435761) >>> 0
    const rnd = () => {
      s2 = (s2 * 1103515245 + 12345) & 0x7fffffff
      return s2 / 0x7fffffff
    }
    const start = Date.UTC(2024, 0, 2)
    const candles: Candle[] = walk.map((c, i) => {
      const o = i === 0 ? c : walk[i - 1]
      const h = Math.max(o, c) * (1 + rnd() * 0.0011)
      const l = Math.min(o, c) * (1 - rnd() * 0.0011)
      return { o, h, l, c, v: Math.abs(c - o) * 0.4 + rnd() * 14, t: start + i * 6 * 36e5 }
    })
    return { candles, maxVolume: Math.max(...candles.map((k) => k.v)) }
  }, [seed, ceil, mid])
  const n = candles.length

  const [visible, setVisible] = useState(TF_COUNT['6M'])
  const [yScale, setYScale] = useState(1)
  const axisZoneRef = useRef<HTMLDivElement>(null)
  const dateAxisRef = useRef<HTMLDivElement>(null)
  const yDrag = useRef<{ startY: number; startS: number } | null>(null)

  const view = useMemo(() => candles.slice(n - Math.min(visible, n)), [candles, n, visible])
  const vn = view.length

  const active: Candle = view[Math.min(hover ?? vn - 1, vn - 1)]
  const change = active.c - active.o
  const changePct = (change / active.o) * 100
  const up = change >= 0
  const totalPct = ((view[vn - 1].c - view[0].o) / view[0].o) * 100
  const totalUp = totalPct >= 0

  const plotW = VW - AXIS_W
  const slot = plotW / vn
  const bodyW = slot * 0.58
  const xMid = (i: number) => i * slot + slot / 2
  const maxHigh = useMemo(() => Math.max(...view.map((k) => k.h)), [view])
  const minLow = useMemo(() => Math.min(...view.map((k) => k.l)), [view])
  const banded = mid != null
  const mid0 = (maxHigh + minLow) / 2
  const half = ((maxHigh - minLow) / 2) * 1.06* (banded ? yScale : 1)
  const effCeil = banded ? mid0 + half : Math.max(ceil * yScale, maxHigh *1.02)
  const effFloor = banded ? mid0 - half : 0
  const yPrice = (v: number) => (1 - (v - effFloor) / (effCeil - effFloor || 1)) * plotH

  const ticks = banded
    ? [effCeil, mid0 + half / 3, mid0 - half / 3, effFloor]
    : [effCeil, (effCeil * 2) / 3, effCeil / 3, 0]
  const dateLabels = useMemo(
    () => Array.from({ length: 6 }, (_, i) => view[Math.min(vn - 1, Math.floor((i * vn) / 6))]),
    [view, vn],
  )

  useEffect(() => {
    const axis = axisZoneRef.current
    const dates = dateAxisRef.current
    const onAxisWheel = (e: WheelEvent) => {
      e.preventDefault()
      setYScale((s) => Math.max(Y_SCALE_MIN, Math.min(Y_SCALE_MAX, s * Math.exp(e.deltaY * 0.0016))))
    }
    const onDateWheel = (e: WheelEvent) => {
      e.preventDefault()
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      setHover(null)
      setVisible((v) => Math.round(Math.max(MIN_VISIBLE, Math.min(96, v + d * 0.12))))
    }
    axis?.addEventListener('wheel', onAxisWheel, { passive: false })
    dates?.addEventListener('wheel', onDateWheel, { passive: false })
    return () => {
      axis?.removeEventListener('wheel', onAxisWheel)
      dates?.removeEventListener('wheel', onDateWheel)
    }
  }, [])

  const onMove = (e: React.PointerEvent) => {
    const el = svgRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * VW
    const py = ((e.clientY - r.top) / r.height) * VH
    setHover(Math.max(0, Math.min(vn - 1, Math.floor(px / slot))))
    setZone(py > plotH + GAP / 2 ? 'volume' : 'price')
  }

  const tipLeft = hover !== null && hover > n / 2

  return (
    <div
      ref={rootRef}
      className={`${fill ? 'flex h-full w-full flex-col' : 'w-full'} ${className ?? ''}`}
      style={!fill && width !== null ? { width, maxWidth: width } : undefined}
    >
      {chrome && (
        <div className="flex shrink-0 items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.1em] text-foreground/40">{symbol}</span>
              {exchange && <span className="text-[9px] uppercase tracking-[0.1em] text-foreground/25">· {exchange}</span>}
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="tabular-nums text-foreground/90" style={{ fontFamily: SANS, fontSize: 22, lineHeight: 1 }}>
                {priceFmt(view[vn - 1].c)}
              </span>
              <span className="tabular-nums text-[12px]" style={{ fontFamily: SANS, color: totalUp ? UP : DOWN }}>
                {totalUp ? '+' : '−'}{Math.abs(totalPct).toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 rounded-full border border-foreground/[0.06] p-0.5">
            {TIMEFRAMES.map((tf) => {
              const on = tf === timeframe
              return (
                <button
                  key={tf}
                  type="button"
                  aria-pressed={on}
                  onClick={() => { setTimeframe(tf); setVisible(TF_COUNT[tf]); setHover(null) }}
                  className={`relative rounded-full px-2.5 py-1 text-[10px] tracking-[0.06em] transition-colors duration-200 ${
                    on ? 'text-foreground' : 'text-foreground/40 hover:text-foreground/70'
                  }`}
                  style={{ fontFamily: SANS }}
                >
                  {on && (
                    <motion.span
                      layoutId={`cc-tf-${seed}`}
                      className="absolute inset-0 rounded-full bg-foreground/[0.08]"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span className="relative">{tf}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div ref={plotRef} className={`relative mt-3 ${fill ? 'min-h-0 flex-1' : ''}`}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VW} ${VH}`}
          className={`touch-none ${fill ? 'h-full w-full' : 'w-full'}`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`${symbol} candlestick chart`}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={0} x2={plotW} y1={yPrice(t)} y2={yPrice(t)} stroke="color-mix(in srgb, var(--foreground) 5%, transparent)" strokeWidth="1" />
              <text
                x={VW - 4}
                y={Math.max(9, Math.min(plotH - 2, yPrice(t) + 3))}
                textAnchor="end"
                fill="color-mix(in srgb, var(--foreground) 28%, transparent)"
                style={{ fontFamily: SANS, fontSize: 8.5 }}
              >
                {axisFmt(t)}
              </text>
            </g>
          ))}<line
            x1={0} x2={plotW}
            y1={yPrice(view[vn - 1].c)} y2={yPrice(view[vn - 1].c)}
            stroke={totalUp ? UP : DOWN}
            strokeOpacity="0.4"
            strokeDasharray="24"
            strokeWidth="1"
          /><motion.g
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          >
            {kind === 'line' ? (
              <>
                <path
                  d={view.map((k, i) => `${i ? 'L' : 'M'}${xMid(i).toFixed(1)} ${yPrice(k.c).toFixed(1)}`).join(' ')}
                  fill="none"
                  stroke={totalUp ? UP : DOWN}
                  strokeWidth={1.6}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={`${view.map((k, i) => `${i ? 'L' : 'M'}${xMid(i).toFixed(1)} ${yPrice(k.c).toFixed(1)}`).join(' ')} L${xMid(vn - 1).toFixed(1)} ${plotH} L${xMid(0).toFixed(1)} ${plotH} Z`}
                  fill={totalUp ? UP : DOWN}
                  opacity={0.07}
                />
              </>
            ) : (
              view.map((k, i) => {
                const color = k.c >= k.o ? UP : DOWN
                const top = yPrice(Math.max(k.o, k.c))
                const bottom = yPrice(Math.min(k.o, k.c))
                const dim = hover !== null && hover !== i

                return (
                  <g key={i} style={{ opacity: dim ? 0.45 : 1 }}>
                    <line
                      x1={xMid(i)} x2={xMid(i)}
                      y1={yPrice(k.h)} y2={yPrice(k.l)}
                      stroke={color} strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    {kind === 'bars' ? (
                      <>
                        <line x1={xMid(i) - bodyW / 2} x2={xMid(i)} y1={yPrice(k.o)} y2={yPrice(k.o)} stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        <line x1={xMid(i)} x2={xMid(i) + bodyW / 2} y1={yPrice(k.c)} y2={yPrice(k.c)} stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      </>
                    ) : (
                      <rect x={xMid(i) - bodyW / 2} y={top} width={bodyW} height={Math.max(1, bottom - top)} fill={color} />
                    )}
                  </g>
                )
              })
            )}
          </motion.g>

          {/* crosshair */}
          {hover !== null && (
            <g pointerEvents="none">
              <line x1={xMid(hover)} x2={xMid(hover)} y1={0} y2={VH} stroke="color-mix(in srgb, var(--foreground) 18%, transparent)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1={0} x2={plotW} y1={yPrice(active.c)} y2={yPrice(active.c)} stroke="color-mix(in srgb, var(--foreground) 14%, transparent)" strokeDasharray="3 3" strokeWidth="1" /><circle cx={xMid(hover)} cy={yPrice(active.c)} r={3} fill={up ? UP : DOWN} stroke="var(--surface)" strokeWidth={1.5} />
              <g transform={`translate(${plotW}, ${Math.max(8, Math.min(plotH - 8, yPrice(active.c))) - 8})`}>
                <rect x={0} y={0} width={AXIS_W - 2} height={16} rx={3} fill="var(--surface)" stroke={up ? UP : DOWN} strokeOpacity={0.7} />
                <text x={4} y={11} fontSize={8.5} fontWeight={600} fill={up ? UP : DOWN} style={{ fontFamily: SANS }} className="tabular-nums">
                  {axisFmt(active.c)}
                </text>
              </g>
            </g>
          )}
        </svg>

        {/* price-axis drag zone */}
        <div
          ref={axisZoneRef}
          aria-hidden
          className="absolute inset-y-0 right-0 z-[5] cursor-ns-resize touch-none select-none"
          style={{ width: `${(AXIS_W / VW) * 100}%` }}
          onPointerDown={(e) => {
            yDrag.current = { startY: e.clientY, startS: yScale }
            e.currentTarget.setPointerCapture?.(e.pointerId)
          }}
          onPointerMove={(e) => {
            const d = yDrag.current
            if (!d) return
            const h = svgRef.current?.getBoundingClientRect().height || 300
            setYScale(Math.max(Y_SCALE_MIN, Math.min(Y_SCALE_MAX, d.startS * Math.exp(((e.clientY - d.startY) / h) * 2.2))))
          }}
          onPointerUp={() => (yDrag.current = null)}
          onPointerCancel={() => (yDrag.current = null)}
        />

        {/* left-edge width handle */}
        {!fill && (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize chart width"
            aria-valuenow={Math.round(width ?? 600)}
            aria-valuemin={MIN_W}
            aria-valuemax={MAX_W}
            tabIndex={0}
            className="group absolute -left-2 inset-y-0 z-10 flex w-3 cursor-ew-resize touch-none select-none items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-foreground/30"
            onPointerDown={(e) => {
              const el = rootRef.current
              widthDrag.current = {
                startX: e.clientX,
                startW: el?.getBoundingClientRect().width ?? 600,
                max: Math.min(MAX_W, el?.parentElement?.clientWidth || MAX_W),
              }
              e.currentTarget.setPointerCapture?.(e.pointerId)
            }}
            onPointerMove={(e) => {
              const d = widthDrag.current
              if (!d) return
              setWidth(Math.round(Math.max(MIN_W, Math.min(d.max, d.startW + (d.startX - e.clientX)))))
            }}
            onPointerUp={() => (widthDrag.current = null)}
            onPointerCancel={() => (widthDrag.current = null)}
            onKeyDown={(e) => {
              const step = e.key === 'ArrowLeft' ? 16 : e.key === 'ArrowRight' ? -16 : 0
              if (!step) return
              e.preventDefault()
              setWidth((w) => {
                const cur = w ?? rootRef.current?.getBoundingClientRect().width ?? 600
                return Math.round(Math.max(MIN_W, Math.min(MAX_W, cur + step)))
              })
            }}
          >
            <span className="h-9 w-[3px] rounded-full bg-foreground/[0.14] transition-colors duration-200 group-hover:bg-foreground/35" />
          </div>
        )}

        {/* crosshair tooltip */}
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-1 z-10 min-w-[148px] rounded-lg border border-foreground/[0.06] px-3 py-2.5"
            style={{
              background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              left: `${(xMid(hover) / VW) * 100}%`,
              transform: tipLeft ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)',
            }}
            role="status"
          >
            <div className="text-[9px]" style={{ fontFamily: SANS, color: 'rgba(0,0,0,0.5)' }}>
              {fmtStamp(active.t)}
            </div>
            {zone === 'volume' ? (
              <div className="mt-1.5 flex items-center justify-between gap-4">
                <span className="text-[9px]" style={{ color: 'rgba(0,0,0,0.45)' }}>Volume</span>
                <span className="tabular-nums text-[11px]" style={{ fontFamily: SANS, color: 'rgba(0,0,0,0.85)' }}>
                  {active.v.toFixed(1)}M
                </span>
              </div>
            ) : (
              <div className="mt-1.5 flex flex-col gap-1">
                {(['o', 'h', 'l', 'c'] as const).map((key, idx) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <span className="text-[9px]" style={{ color: 'rgba(0,0,0,0.45)' }}>{['Open', 'High', 'Low', 'Close'][idx]}</span>
                    <span className="tabular-nums text-[11px]" style={{ fontFamily: SANS, color: 'rgba(0,0,0,0.85)' }}>
                      {priceFmt(active[key])}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px]" style={{ color: 'rgba(0,0,0,0.45)' }}>Chg</span>
                  <span className="tabular-nums text-[11px]" style={{ fontFamily: SANS, color: up ? UP : DOWN }}>
                    {up ? '+' : '−'}{Math.abs(changePct).toFixed(2)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* date axis */}
      <div ref={dateAxisRef} className="mt-2 flex shrink-0 cursor-ew-resize touch-none select-none justify-between border-t border-foreground/[0.06] pr-[46px] pt-2">
        {dateLabels.map((k, i) => (
          <span key={i} className="tabular-nums text-[9px] text-foreground/30" style={{ fontFamily: SANS }}>
            {fmtDay(k.t)}
          </span>
        ))}
      </div>
    </div>
  )
}