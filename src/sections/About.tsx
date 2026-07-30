import Section, { Reveal } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { ABOUT_POINTS, ABOUT_STATS } from '../data/portfolio'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="Tentang Saya"
      title="Membangun sistem, meneliti data."
      subtitle="Fresh graduate Informatics Engineering yang fokus di Software Engineering dan Artificial Intelligence."
      tone="mist"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3" delay={60}>
          <GlowingCard className="h-full">
            <ul className="space-y-5">
              {ABOUT_POINTS.map((point) => (
                <li key={point} className="flex gap-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-ink/75 sm:text-base">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </GlowingCard>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={140}>
          <div className="grid h-full grid-cols-2 gap-4">
            {ABOUT_STATS.map((stat) => (
              <GlowingCard
                key={stat.label}
                innerClassName="flex flex-col justify-center !p-5 text-center"
              >
                <p className="font-instrument-serif text-3xl leading-none text-ink sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-ink/55">
                  {stat.label}
                </p>
              </GlowingCard>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}