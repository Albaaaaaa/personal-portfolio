import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type SectionProps = {
  id: string
  /** Small uppercase label above the heading. */
  eyebrow?: string
  title: string
  subtitle?: string
  /** Optional editorial index used by the four core portfolio chapters. */
  chapter?: string
  /** Alternates between #FFFFFF and #F5F5F7 for Apple-style banding. */
  tone?: 'white' | 'mist'
  children: ReactNode
}

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  chapter,
  tone = 'white',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`editorial-section relative scroll-mt-24 overflow-hidden px-5 py-20 sm:px-8 sm:py-24 md:py-28 ${
        tone === 'mist' ? 'bg-mist' : 'bg-white'
      }`}
    >
      {chapter && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] overflow-hidden"
        >
          <div className="section-drafting-grid absolute -right-24 top-0 h-full w-[46rem] max-w-[90vw]" />
          <span className="section-crosshair absolute right-[8%] top-16 hidden h-5 w-5 md:block" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 border-b border-ink/10 pb-8 md:mb-16 md:pb-10">
            <div className="flex items-end justify-between gap-8">
              <div className="max-w-3xl">
                {eyebrow && (
                  <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
                    {eyebrow}
                  </p>
                )}
                <h2 className="font-instrument-serif text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>

              {chapter && (
                <div className="hidden shrink-0 items-end gap-4 sm:flex">
                  <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/35">
                    Chapter
                  </span>
                  <span className="font-instrument-serif text-7xl leading-[0.72] text-ink/10 md:text-8xl">
                    {chapter}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {children}
      </div>
    </section>
  )
}

type RevealProps = {
  children: ReactNode
  /** Stagger delay in ms. */
  delay?: number
  className?: string
  as?: 'div' | 'span'
}

/**
 * Fades and lifts its children into view using framer-motion spring physics.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-32px 0px' })
  const reduceMotion = useReducedMotion()
  const hidden = { opacity: 0, y: 16 }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : hidden}
      animate={
        reduceMotion || isInView ? { opacity: 1, y: 0 } : hidden
      }
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger children — each child fades in one after another.
 * Usage: wrap children in <Stagger> and each child in <StaggerItem>
 */
export function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-32px 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      animate={reduceMotion || isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: { staggerChildren: reduceMotion ? 0 : 0.055 },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Reusable card styles. */
type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`liquid-glass-light rounded-3xl p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  )
}
