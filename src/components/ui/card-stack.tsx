import { useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type CardStackItem = {
  src: string
  alt: string
  title?: string
  description?: string
}

type CardStackProps = {
  items: CardStackItem[]
  /** Compact height, defaults to aspect-video. */
  className?: string
}

/**
 * Draggable stacked-card image gallery.
 * Drag the front card up/down or use the arrow buttons to cycle.
 * Themed to match the site's light editorial style (ink/accent tokens).
 */
export function CardStack({ items, className = '' }: CardStackProps) {
  const [cards, setCards] = useState<CardStackItem[]>(items)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)

  const dragY = useMotionValue(0)
  const rotateX = useTransform(dragY, [-200, 0, 200], [12, 0, -12])

  const offset = 8
  const scaleStep = 0.06
  const dimStep = 0.15
  const borderRadius = 12
  const swipeThreshold = 50

  const spring = { type: 'spring' as const, stiffness: 170, damping: 26 }

  const moveToEnd = () => {
    setCards((prev) => [...prev.slice(1), prev[0]])
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const moveToStart = () => {
    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)])
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    const velocity = info.velocity.y
    const offsetY = info.offset.y

    if (Math.abs(offsetY) > swipeThreshold || Math.abs(velocity) > 500) {
      if (offsetY < 0 || velocity < 0) {
        moveToEnd()
      } else {
        moveToStart()
      }
    }
    dragY.set(0)
  }

  if (items.length === 0) return null

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative mx-auto w-full max-w-md aspect-video overflow-visible">
        <ul className="relative m-0 h-full w-full p-0">
          <AnimatePresence>
            {cards.map(({ src, alt, title, description }, i) => {
              const isFront = i === 0
              const brightness = Math.max(0.35, 1 - i * dimStep)
              const baseZ = cards.length - i

              return (
                <motion.li
                  key={src}
                  className="absolute h-full w-full list-none overflow-hidden border border-ink/10 bg-white"
                  style={{
                    borderRadius: `${borderRadius}px`,
                    cursor: isFront ? 'grab' : 'auto',
                    touchAction: 'none',
                    boxShadow: isFront
                      ? '0 20px 40px rgba(0, 0, 0, 0.18)'
                      : '0 10px 24px rgba(0, 0, 0, 0.08)',
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000,
                  }}
                  animate={{
                    top: `${i * -offset}%`,
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: baseZ,
                  }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                  transition={spring}
                  drag={isFront ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) dragY.set(info.offset.y)
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={
                    isFront
                      ? { zIndex: cards.length + 1, cursor: 'grabbing', scale: 1.04 }
                      : {}
                  }
                  onHoverStart={() => isFront && setShowInfo(true)}
                  onHoverEnd={() => setShowInfo(false)}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="pointer-events-none h-full w-full select-none object-cover"
                    draggable={false}
                    loading="lazy"
                  />

                  {(title || description) && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{
                        opacity: isFront && showInfo ? 1 : 0,
                        y: isFront && showInfo ? 0 : 16,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {title && (
                        <h4 className="text-sm font-semibold text-white">{title}</h4>
                      )}
                      {description && (
                        <p className="text-xs text-white/80">{description}</p>
                      )}
                    </motion.div>
                  )}
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={moveToStart}
          aria-label="Foto sebelumnya"
          className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-ink/10 bg-white/90 p-2 text-ink shadow-md backdrop-blur-sm transition-colors hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={moveToEnd}
          aria-label="Foto berikutnya"
          className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-ink/10 bg-white/90 p-2 text-ink shadow-md backdrop-blur-sm transition-colors hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 bg-accent' : 'w-1.5 bg-ink/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}