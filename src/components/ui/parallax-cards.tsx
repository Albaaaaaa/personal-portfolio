"use client"

import * as React from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

import { cn } from "../../lib/utils"

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])

  return reduced
}

const springConfig = { stiffness: 220, damping: 34, bounce: 0 }

/**
 * Scroll-triggered fade-up wrapper for grid sections.
 * No horizontal drift or 3D tilt — grid stays perfectly aligned.
 */
export function ParallaxCards({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [30, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [0.3, 1]),
    springConfig
  )

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref}>
      <motion.div style={{ translateY, opacity }} className={className}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Single card inside `ParallaxCards`. Slight hover lift.
 */
export function ParallaxCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}
