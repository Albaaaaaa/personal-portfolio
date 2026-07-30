import { useEffect, useRef, useState, type ReactNode } from 'react'

type SectionProps = {
  id: string
  /** Small uppercase label above the heading. */
  eyebrow?: string
  title: string
  subtitle?: string
  /** Alternates between #FFFFFF and #F5F5F7 for Apple-style banding. */
  tone?: 'white' | 'mist'
  children: ReactNode
}

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = 'white',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 md:py-28 ${
        tone === 'mist' ? 'bg-mist' : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 max-w-3xl md:mb-16">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </p>
            )}
            <h2 className="font-instrument-serif text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
                {subtitle}
              </p>
            )}
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
}

/**
 * Fades and lifts its children into view the first time they intersect
 * the viewport.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Without IntersectionObserver, show content immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

type CardProps = {
  children: ReactNode
  className?: string
}

/** Frosted card used across every light section. */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`liquid-glass-light rounded-3xl p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  )
}