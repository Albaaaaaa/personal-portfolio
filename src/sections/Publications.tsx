import Section, { Reveal, Stagger, StaggerItem } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import CandleChart from '../components/ui/candle-chart'
import { ExternalLink } from 'lucide-react'
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
          <a
            href={PUBLICATION.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buka artikel: ${PUBLICATION.title}`}
            className="absolute inset-0 z-10 cursor-pointer rounded-xl"
          />
          <div className="relative z-20 pointer-events-none flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
              Journal Article
            </span>
            <span className="text-xs text-ink/50">{PUBLICATION.date}</span>
            <span className="pointer-events-auto ml-auto flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold text-accent transition-colors hover:bg-accent/15">
              Baca Artikel
              <ExternalLink size={12} />
            </span>
          </div>

          <h3 className="pointer-events-none relative z-20 mt-4 max-w-3xl text-lg font-semibold leading-snug text-ink sm:text-xl">
            {PUBLICATION.title}
          </h3>

          <p className="pointer-events-none relative z-20 mt-2 text-sm text-ink/60">{PUBLICATION.journal}</p>

          <Stagger>
            <ul className="mt-6 space-y-3">
              {PUBLICATION.points.map((point) => (
                <StaggerItem key={point}>
                  <li className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-relaxed text-ink/70">{point}</p>
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </Stagger>

          <div className="mt-7 border-t border-ink/8 pt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
              Visualisasi Data ANTM.JK
            </p>
            <div className="rounded-2xl bg-ink/[0.02] p-4">
              <CandleChart seed={42} chrome={false} />
            </div>
          </div>

          <div className="mt-6 border-t border-ink/8 pt-6">
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