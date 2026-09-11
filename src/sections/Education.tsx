import Section, { Reveal, Stagger, StaggerItem } from '../components/Section'
import { GlowingCard } from '../components/ui/glowing-card'
import { CardStack } from '../components/ui/card-stack'
import { EDUCATION } from '../data/portfolio'
import { PinIcon } from '../components/icons'

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Pendidikan."
      subtitle="Fondasi akademik Informatics Engineering dengan predikat Cum Laude."
      chapter="02"
    >
      <Reveal delay={60}>
        <div className="mb-5 flex items-center gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/55">
            Riwayat Pendidikan
          </h3>
          <span className="h-px flex-1 bg-ink/10" />
          <span className="font-mono text-[10px] text-ink/35">
            {String(EDUCATION.length).padStart(2, '0')} entries
          </span>
        </div>
      </Reveal>

      <Stagger>
        <div className="relative mx-auto max-w-3xl space-y-5 pl-8 before:absolute before:bottom-8 before:left-[5px] before:top-8 before:w-px before:bg-gradient-to-b before:from-accent/55 before:via-ink/15 before:to-transparent">
          {EDUCATION.map((school, index) => (
            <StaggerItem key={school.school} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-8 z-20 flex h-3 w-3 items-center justify-center rounded-full border border-accent/40 bg-white shadow-[0_0_0_5px_rgba(0,113,227,0.06)]"
              >
                <span className="h-1 w-1 rounded-full bg-accent" />
              </span>
              <GlowingCard innerClassName="overflow-hidden">
                <div className="mb-5 flex items-center justify-between border-b border-ink/8 pb-3">
                  <span className="font-mono text-[9px] font-semibold tracking-[0.18em] text-accent/65">
                    EDU-{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Academic record
                  </span>
                </div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-ink">
                      {school.school}
                    </h4>
                    <p className="mt-1 text-sm text-accent">{school.program}</p>
                  </div>
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/60">
                    {school.period}
                  </span>
                </div>

                <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-ink/50">
                  <PinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {school.location}
                </p>

                {school.points.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {school.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-ink/70">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {'gallery' in school && school.gallery.length > 0 && (
                  <div className="mt-6 border-t border-ink/8 pt-6">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                      Galeri
                    </p>
                    <CardStack items={[...school.gallery]} />
                  </div>
                )}
              </GlowingCard>
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </Section>
  )
}