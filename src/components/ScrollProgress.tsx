import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'

/**
 * Quiet page-position indicator. Uses only a composited scale transform and
 * disappears when the user requests reduced motion.
 */
export default function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.25,
  })

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-white mix-blend-difference"
      style={{ scaleX }}
    />
  )
}