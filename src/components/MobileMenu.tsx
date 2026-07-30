import { DownloadIcon } from './icons'
import { PROFILE, SECTIONS } from '../data/portfolio'
import { LiquidButton } from './ui/liquid-glass-button'

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
        <LiquidButton
          type="button"
          size="icon"
          onClick={onClose}
          aria-label="Close menu"
          className="animate-menu-close h-11 w-11 rounded-full"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rotate-45 bg-white" />
            <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 -rotate-45 bg-white" />
          </span>
        </LiquidButton>
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
        className="animate-menu-item flex justify-center px-6 pb-12"
        style={{
          animationDelay: `${BASE_DELAY + SECTIONS.length * STAGGER}ms`,
        }}
      >
        <LiquidButton
          asChild
          size="lg"
          className="rounded-full px-6 py-3.5"
        >
          <a href={PROFILE.cvUrl} download onClick={onClose}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
            <span className="text-sm font-medium text-white">Download CV</span>
            <DownloadIcon className="h-4 w-4 text-white/70" />
          </a>
        </LiquidButton>
      </div>
    </div>
  )
}