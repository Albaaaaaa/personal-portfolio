import Section, { Reveal, Stagger, StaggerItem } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { ABOUT_POINTS, ABOUT_STATS } from '../data/portfolio'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="Tentang Saya"
      title="Membangun sistem, meneliti data."
      subtitle="Fresh graduate Informatics Engineering yang fokus di Software Engineering dan Artificial Intelligence."
      chapter="01"
      tone="mist"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3" delay={60}>
          <GlowingCard
            className="h-full"
            innerClassName="overflow-hidden !p-0"
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-6 py-4 sm:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Profile notes
              </p>
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/45">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Software × AI
              </div>
            </div>

            <Stagger className="flex-1 px-6 py-7 sm:px-8 sm:py-8">
              <ol className="space-y-1">
                {ABOUT_POINTS.map((point, index) => (
                  <StaggerItem key={point}>
                    <li className="editorial-rule grid grid-cols-[2.25rem_1fr] gap-3 border-b border-ink/8 py-5 pl-4 first:pt-0 last:border-b-0 last:pb-0">
                      <span className="pt-0.5 font-mono text-[10px] font-semibold tracking-wider text-accent/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed text-ink/75 sm:text-base">
                        {point}
                      </p>
                    </li>
                  </StaggerItem>
                ))}
              </ol>
            </Stagger>
          </GlowingCard>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={140}>
          <Stagger>
            <div className="grid h-full grid-cols-2 gap-4">
              {ABOUT_STATS.map((stat, index) => (
                <StaggerItem key={stat.label} className="h-full">
                  <GlowingCard
                    className="h-full"
                    innerClassName="group flex flex-col justify-between overflow-hidden !p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-semibold tracking-[0.16em] text-ink/30">
                        M-{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-6 bg-accent/35 transition-[width] duration-300 group-hover:w-10" />
                    </div>
                    <div className="mt-8">
                      <p className="font-instrument-serif text-4xl leading-none text-ink sm:text-5xl">
                        {stat.value}
                      </p>
                      <p className="mt-2 max-w-[9rem] text-xs leading-snug text-ink/55">
                        {stat.label}
                      </p>
                    </div>
                  </GlowingCard>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Reveal>
      </div>
    </Section>
  )
}