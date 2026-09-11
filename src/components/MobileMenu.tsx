import { SECTIONS } from '../data/portfolio'
import { LiquidMetalButton } from './ui/liquid-metal-button'
import { CvDownloadButton } from './ui/cv-download-button'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

/** Delay before the first item animates in, in ms. */
const BASE_DELAY = 100
/** Extra delay per subsequent item, in ms. */
const STAGGER = 60

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[55] flex flex-col bg-[#0a0a0a] lg:hidden"
    >
      <div className="flex items-center justify-end px-5 pt-5">
        <LiquidMetalButton viewMode="icon" onClick={onClose} />
      </div>

      <nav
        aria-label="Primary"
        className="flex flex-1 flex-col items-center justify-center gap-4 sm:gap-5"
      >
        {SECTIONS.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onClose}
            className="animate-menu-item text-3xl font-medium text-white/90 transition-opacity hover:opacity-60 sm:text-4xl"
            style={{ animationDelay: `${BASE_DELAY + index * STAGGER}ms` }}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div
        className="animate-menu-item flex flex-wrap justify-center gap-3 px-6 pb-12"
        style={{
          animationDelay: `${BASE_DELAY + SECTIONS.length * STAGGER}ms`,
        }}
      >
        <CvDownloadButton onOpen={onClose} />
      </div>
    </div>
  )
}