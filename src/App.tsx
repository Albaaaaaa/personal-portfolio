import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ScrollProgress from './components/ScrollProgress'
import About from './sections/About'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Portfolio from './sections/Portfolio'
import Publications from './sections/Publications'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import VideoGallery from './sections/VideoGallery'
import { FloatingAiAssistant } from './components/FloatingAiAssistant'
import { SECTIONS } from './data/portfolio'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id)

  // Lock page scroll while the fullscreen menu is open.
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  // Escape closes the menu.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Highlight the nav item for whichever section is nearest the top.
  useEffect(() => {
    const nodes = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0) return

    const update = () => {
      // Anchor point sits just below the sticky nav.
      const anchor = 120
      let current = nodes[0].id

      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= anchor) current = node.id
      }

      setActiveSection(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="relative bg-black">
      <ScrollProgress />
      <Navigation
        menuOpen={menuOpen}
        activeSection={activeSection}
        onOpenMenu={() => setMenuOpen(true)}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Portfolio />
        <Publications />
        <Certifications />
        <VideoGallery />
        <Contact />
      </main>

      <FloatingAiAssistant />
      <Footer />
    </div>
  )
}