import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE } from '../data/portfolio'
import { LiquidMetalButton } from './ui/liquid-metal-button'
import { CvDownloadButton } from './ui/cv-download-button'

const heroTitle =
  'font-readex-pro text-[clamp(3.15rem,11.5vw,10rem)] font-medium leading-[0.82] tracking-[-0.055em] text-white'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
}

const easeOut = [0.25, 0.1, 0.25, 1] as const

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
}

/** Split name into words for the staggered headline. */
const NAME_WORDS = PROFILE.name.split(' ')

/** Stats from portfolio data, mapped to the three stat blocks. */
const TOP_STAT = { value: '3.95', label: 'GPA / 4.00' }
const BOTTOM_LEFT_STAT = { value: '6+', label: 'Proyek dikerjakan' }
const BOTTOM_RIGHT_STAT = { value: '1', label: 'Publikasi jurnal' }

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={!reduceMotion}
        loop={!reduceMotion}
        muted
        playsInline
        preload={reduceMotion ? 'metadata' : 'auto'}
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Contrast overlays keep the typography readable across every video frame. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-56 bg-gradient-to-b from-transparent to-black/90" />

      {/* Foreground content */}
      <motion.div
        className="relative z-20 h-full w-full"
        variants={containerVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        {/* Name and role share one alignment axis for a cleaner hierarchy. */}
        <div className="absolute left-6 right-6 top-[24%] md:left-10 md:right-10 md:top-[18%]">
          <h1 aria-label={PROFILE.name} className={heroTitle}>
            <motion.span variants={wordVariants} className="block">
              {NAME_WORDS[0]?.toLowerCase()}
            </motion.span>
            <motion.span variants={wordVariants} className="block">
              {NAME_WORDS.slice(1).join(' ').toLowerCase()}
            </motion.span>
          </h1>

          <motion.p
            variants={fadeVariants}
            className="mt-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 md:mt-8 md:text-xs"
          >
            <span aria-hidden="true" className="h-px w-8 bg-white/60" />
            {PROFILE.role}
          </motion.p>

          {/* Primary calls to action — give first-time visitors a direction. */}
          <motion.div
            variants={fadeVariants}
            className="mt-7 flex flex-wrap items-center gap-3 md:mt-9"
          >
            <LiquidMetalButton
              label="Lihat Project"
              onClick={() => {
                document
                  .getElementById('portfolio')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
            <CvDownloadButton />
          </motion.div>
        </div>

        {/* Top-right stat */}
        <motion.div
          variants={fadeVariants}
          className="absolute right-6 top-[12%] md:right-16 md:top-[11%]"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-16 bg-white/40 md:block" />
            <span className="text-3xl font-medium tabular-nums tracking-tight text-white md:text-4xl">
              {TOP_STAT.value}
            </span>
          </div>
          <p className="mt-1 text-right text-[10px] font-medium uppercase tracking-[0.14em] text-white/65 md:text-xs">
            {TOP_STAT.label}
          </p>
        </motion.div>

        {/* Bottom-left stat */}
        <motion.div
          variants={fadeVariants}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl font-medium tabular-nums tracking-tight text-white md:text-4xl">
              {BOTTOM_LEFT_STAT.value}
            </span>
            <span className="hidden h-px w-16 bg-white/40 md:block" />
          </div>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/65 md:text-xs">
            {BOTTOM_LEFT_STAT.label}
          </p>
        </motion.div>

        {/* Bottom-right stat */}
        <motion.div
          variants={fadeVariants}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10"
        >
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-16 bg-white/40 md:block" />
            <span className="text-3xl font-medium tabular-nums tracking-tight text-white md:text-4xl">
              {BOTTOM_RIGHT_STAT.value}
            </span>
          </div>
          <p className="mt-1 text-right text-[10px] font-medium uppercase tracking-[0.14em] text-white/65 md:text-xs">
            {BOTTOM_RIGHT_STAT.label}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}