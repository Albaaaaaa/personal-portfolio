import Section, { Reveal } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { PUBLICATION } from '../data/portfolio'

export default function Publications() {
  return (
    <Section
      id="publikasi"
      eyebrow="Publikasi"
      title="Riset yang diterbitkan."
      tone="mist"
    >
      <Reveal delay={60}>
        <GlowingCard>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
              Journal Article
            </span>
            <span className="text-xs text-ink/50">{PUBLICATION.date}</span>
          </div>

          <h3 className="mt-4 max-w-3xl text-lg font-semibold leading-snug text-ink sm:text-xl">
            {PUBLICATION.title}
          </h3>

          <p className="mt-2 text-sm text-ink/60">{PUBLICATION.journal}</p>

          <ul className="mt-6 space-y-3">
            {PUBLICATION.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-ink/70">{point}</p>
              </li>
            ))}
          </ul>

          <div className="mt-7 border-t border-ink/8 pt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
              Hasil Evaluasi Model
            </p>
            <div className="grid grid-cols-3 gap-3 sm:max-w-md">
              {PUBLICATION.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl bg-white/70 p-4 text-center"
                >
                  <p className="font-instrument-serif text-2xl leading-none text-ink sm:text-3xl">
                    {metric.value}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-ink/50">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GlowingCard>
      </Reveal>
    </Section>
  )
}
