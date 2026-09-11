import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../../data/portfolio'
import { LiquidMetalButton } from './liquid-metal-button'

type CvDownloadButtonProps = {
  /** How the dropdown aligns relative to the trigger button. */
  align?: 'left' | 'right'
  /** Optional callback fired after a CV is opened (e.g. to close a menu). */
  onOpen?: () => void
}

/**
 * A single "Download CV" button that reveals a small dropdown letting the
 * visitor pick between the Indonesian and English CV. Replaces the previous
 * pattern of rendering two language-specific buttons side by side.
 */
export function CvDownloadButton({
  align = 'left',
  onOpen,
}: CvDownloadButtonProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close the dropdown when clicking anywhere outside of it.
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Close on Escape key for accessibility.
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const handleSelect = (url: string) => {
    window.open(url, '_blank')
    setOpen(false)
    onOpen?.()
  }

  const alignmentClasses =
    align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'

  return (
    <div ref={containerRef} className="relative inline-block">
      <LiquidMetalButton
        label="Download CV"
        onClick={() => setOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -6 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className={`absolute top-[calc(100%+10px)] z-50 ${alignmentClasses} w-44 overflow-hidden rounded-2xl border border-white/12 bg-black/80 p-1.5 backdrop-blur-xl`}
            role="menu"
            aria-label="Pilih bahasa CV"
          >
            <li>
              <button
                type="button"
                onClick={() => handleSelect(PROFILE.cvUrlId)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
                role="menuitem"
              >
                Indonesia
                <span className="text-[10px] uppercase tracking-wider text-white/40">
                  ID
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelect(PROFILE.cvUrlEn)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
                role="menuitem"
              >
                English
                <span className="text-[10px] uppercase tracking-wider text-white/40">
                  EN
                </span>
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}