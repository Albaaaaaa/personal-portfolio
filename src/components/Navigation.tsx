import { SECTIONS } from '../data/portfolio'
import { LiquidMetalButton } from './ui/liquid-metal-button'
import { LiquidMetalContainer } from './ui/liquid-metal-container'
import { CvDownloadButton } from './ui/cv-download-button'

type NavigationProps = {
  onOpenMenu: () => void
  menuOpen: boolean
  /** Section id currently in view, used to highlight the active pill item. */
  activeSection: string
}

export default function Navigation({
  onOpenMenu,
  activeSection,
}: NavigationProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-6 md:px-10">
      <nav className="relative flex items-center justify-center">
        {/* Center pill — desktop nav links */}
        <LiquidMetalContainer className="hidden items-center justify-center gap-1 px-3 py-2 md:flex">
          {SECTIONS.slice(0, 5).map((section) => {
            const active = activeSection === section.id
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-5 py-2 text-sm transition-all duration-300 ${
                  active
                    ? 'bg-[#F5F5F7] text-[#1D1D1F] shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {section.label}
              </a>
            )
          })}
        </LiquidMetalContainer>

        {/* Right — "get started" / Download CV */}
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <div className="hidden sm:flex">
            <CvDownloadButton align="right" />
          </div>

          {/* Hamburger — below md */}
          <div className="md:hidden">
            <LiquidMetalButton
              viewMode="icon"
              onClick={onOpenMenu}
            />
          </div>
        </div>
      </nav>
    </header>
  )
}