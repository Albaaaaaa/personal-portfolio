import { useEffect, useState } from 'react'
import Logo from './Logo'
import { DownloadIcon } from './icons'
import { PROFILE, SECTIONS } from '../data/portfolio'
import { LiquidButton } from './ui/liquid-glass-button'

type NavigationProps = {
  onOpenMenu: () => void
  menuOpen: boolean
  /** Section id currently in view, used to highlight the active pill item. */
  activeSection: string
}

export default function Navigation({
  onOpenMenu,
  menuOpen,
  activeSection,
}: NavigationProps) {
  // Past the hero the page turns light, so the nav inverts to dark ink.
  const [onLight, setOnLight] = useState(false)

  useEffect(() => {
    const update = () => setOnLight(window.scrollY > window.innerHeight - 100)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const glass = onLight ? 'liquid-glass-light' : 'liquid-glass'
  const idleText = onLight ? 'text-ink/60' : 'text-white/70'
  const activeText = onLight ? 'text-ink' : 'text-white'
  const hoverText = onLight ? 'hover:text-ink' : 'hover:text-white'
  const lineTone = onLight ? 'bg-ink' : 'bg-white'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Logo — top left. Wrapper owns positioning so .liquid-glass on a
          child can't clash with it. */}
      <div className="absolute left-5 top-5 sm:left-8 sm:top-6">
        <a
          href="#home"
          className="pointer-events-auto block transition-opacity hover:opacity-70"
        >
          <Logo size={32} dark={onLight} />
        </a>
      </div>

      {/* Center pill nav — desktop only */}
      <div className="absolute left-1/2 top-5 hidden -translate-x-1/2 lg:block">
        <nav
          aria-label="Primary"
          className={`${glass} pointer-events-auto flex items-center gap-0.5 rounded-full px-2 py-2`}
        >
          {SECTIONS.map((section) => {
            const active = activeSection === section.id
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? activeText : `${idleText} ${hoverText}`
                }`}
              >
                {section.label}
              </a>
            )
          })}
        </nav>
      </div>

      {/* CTA — desktop only */}
      <div className="absolute right-8 top-5 hidden lg:block">
        <LiquidButton
          asChild
          size="lg"
          className="pointer-events-auto rounded-full px-5 py-3"
        >
          <a href={PROFILE.cvUrl} download>
            <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
            <span
              className={`text-sm font-medium ${onLight ? 'text-ink' : 'text-white'}`}
            >
              Download CV
            </span>
            <DownloadIcon
              className={`h-4 w-4 ${onLight ? 'text-ink/70' : 'text-white/70'}`}
            />
          </a>
        </LiquidButton>
      </div>

      {/* Hamburger — below lg */}
      <div className="absolute right-5 top-5 lg:hidden">
        <LiquidButton
          type="button"
          size="icon"
          onClick={onOpenMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="pointer-events-auto flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full"
        >
          <span className={`h-[1.5px] w-5 ${lineTone}`} />
          <span className={`h-[1.5px] w-3.5 ${lineTone}`} />
        </LiquidButton>
      </div>
    </header>
  )
}